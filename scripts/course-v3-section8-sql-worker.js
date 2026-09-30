// One active PostgreSQL instance keeps memory bounded while each lab retains an
// independent in-memory snapshot. Nothing is written to browser storage.
export function createSqlSession(PGlite) {
  const snapshots = new Map();
  let db = null;
  let active = null;
  let database = 'postgres';
  let activeConfig = null;

  async function open(snapshot, targetDatabase = 'postgres') {
    return PGlite.create({ ...(snapshot ? { loadDataDir: snapshot } : {}), database: targetDatabase });
  }

  async function activate(id, config, reset = false) {
    if (active === id && db && !reset) return;
    if (db) {
      if (active !== id || !reset) snapshots.set(active, { dump: await db.dumpDataDir('none'), database });
      await db.close();
      db = null;
    }
    if (reset) snapshots.delete(id);
    const saved = snapshots.get(id);
    database = saved?.database || 'postgres';
    db = await open(saved?.dump, database);
    if (!saved && config.setup) await db.exec(config.setup);
    active = id;
    activeConfig = config;
  }

  const identifier = (value) => `"${String(value).replaceAll('"', '""')}"`;
  const limitedResult = (result) => ({
    fields: result.fields.map(({ name, dataTypeID }) => ({ name, dataTypeID })),
    rows: result.rows.slice(0, 100),
    rowCount: result.rows.length,
    command: result.command || '',
    affectedRows: result.affectedRows ?? 0,
  });

  async function inspect() {
    const names = await db.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name LIMIT 20;");
    const tables = [];
    for (const table of names.rows) {
      const name = table.table_name;
      const columns = await db.query("SELECT column_name, data_type, is_nullable, character_maximum_length FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position;", [name]);
      const keys = await db.query("SELECT kcu.column_name, tc.constraint_type FROM information_schema.table_constraints tc JOIN information_schema.key_column_usage kcu ON tc.constraint_catalog = kcu.constraint_catalog AND tc.constraint_schema = kcu.constraint_schema AND tc.constraint_name = kcu.constraint_name AND tc.table_name = kcu.table_name WHERE tc.table_schema = 'public' AND tc.table_name = $1 AND tc.constraint_type IN ('PRIMARY KEY', 'FOREIGN KEY');", [name]);
      const keyMap = new Map();
      for (const key of keys.rows) keyMap.set(key.column_name, [...(keyMap.get(key.column_name) || []), key.constraint_type === 'PRIMARY KEY' ? 'PK' : 'FK']);
      const result = await db.query(`SELECT * FROM public.${identifier(name)} ORDER BY 1 LIMIT 31;`);
      tables.push({ name, columns: columns.rows.map((column) => ({ ...column, keys: keyMap.get(column.column_name) || [] })), fields: result.fields, rows: result.rows.slice(0, 30), truncated: result.rows.length > 30 });
    }
    const databases = await db.query('SELECT datname FROM pg_database WHERE NOT datistemplate ORDER BY datname;');
    return { tables, database, databases: databases.rows.map((row) => row.datname) };
  }

  async function connect(name) {
    const available = await db.query('SELECT datname FROM pg_database WHERE datname = $1 AND NOT datistemplate;', [name]);
    if (available.rows.length !== 1) throw new Error('That database does not exist. Run CREATE DATABASE first.');
    const dump = await db.dumpDataDir('none');
    await db.close();
    db = null;
    try {
      db = await open(dump, name);
      database = name;
    } catch (error) {
      // A rejected connection must not silently discard the current database.
      db = await open(dump, database);
      throw error;
    }
  }

  async function handle(request) {
    const { id, config, action } = request;
    await activate(id, config, action === 'reset');
    let results = [];
    if (action === 'run') {
      if (!String(request.sql || '').trim()) throw new Error('Write a SQL statement before selecting Run SQL.');
      // PostgreSQL parses and executes the original SQL; no answer matching or
      // silent syntax rewriting is used. A main-thread watchdog can terminate
      // this worker if synchronous WASM execution runs for too long.
      results = (await db.exec(request.sql, { rowMode: 'array' })).map(limitedResult);
    } else if (action === 'connect') {
      await connect(request.database);
    }
    return { ...await inspect(), results };
  }

  async function recoverState() {
    if (!db || !activeConfig) return null;
    try {
      // User-entered BEGIN followed by an error can leave a transaction aborted.
      // Roll it back explicitly so the next independent attempt can run.
      await db.exec('ROLLBACK;');
      return await inspect();
    } catch { return null; }
  }

  return { handle, recoverState, close: async () => { if (db) await db.close(); db = null; snapshots.clear(); } };
}

// The exported session is also exercised directly by the Node contract tests.
if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  let sessionPromise;
  let queue = Promise.resolve();
  const session = () => sessionPromise ||= import(new URL('../assets/vendor/pglite/index.js', import.meta.url).href).then(({ PGlite }) => createSqlSession(PGlite));
  self.onmessage = ({ data }) => {
    queue = queue.then(async () => {
      try {
        const engine = await session();
        self.postMessage({ requestId: data.requestId, ok: true, value: await engine.handle(data) });
      } catch (error) {
        const engine = await sessionPromise?.catch(() => null);
        const state = engine ? await engine.recoverState() : null;
        self.postMessage({ requestId: data.requestId, ok: false, error: { message: error.message || String(error), code: error.code || '', detail: error.detail || '', hint: error.hint || '' }, state });
      }
    });
  };
}
