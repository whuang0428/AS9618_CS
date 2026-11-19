// Real PostgreSQL executes all statements. The UI is a local teaching interface,
// not an authentication boundary or a network database server.
const identifier = value => `"${String(value).replaceAll('"', '""')}"`;
const failure = error => ({ message: error.message || String(error), code: error.code || '', detail: error.detail || '', hint: error.hint || '' });
export function createDbmsSession(PGlite, config) {
  let db;
  let database = config.defaultDatabase;
  let user = 'postgres';
  async function replace(snapshot) {
    if (db) await db.close();
    db = null;
    database = snapshot?.database || config.defaultDatabase;
    user = snapshot?.user || 'postgres';
    if (snapshot?.dump) db = await PGlite.create({ loadDataDir: snapshot.dump, database });
    else {
      db = await PGlite.create();
      await db.exec(`CREATE DATABASE ${identifier(database)};`);
      const dump = await db.dumpDataDir('none');
      await db.close();
      db = await PGlite.create({ loadDataDir: dump, database });
      await db.exec(config.setup);
      await db.exec(config.roles);
    }
  }
  async function admin() { await db.exec('RESET ROLE;'); }
  async function inspect() {
    await admin();
    const names = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name LIMIT 30;");
    const tables = [];
    for (const { table_name: name } of names.rows) {
      const columns = await db.query("SELECT column_name, data_type, is_nullable, character_maximum_length, column_default FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position;", [name]);
      const constraints = await db.query("SELECT c.conname AS name, c.contype AS type, pg_get_constraintdef(c.oid) AS definition FROM pg_constraint c JOIN pg_class t ON t.oid = c.conrelid JOIN pg_namespace n ON n.oid = t.relnamespace WHERE n.nspname = 'public' AND t.relname = $1 ORDER BY c.contype, c.conname;", [name]);
      const references = await db.query("SELECT a.attname AS column_name, rt.relname AS target_table, ra.attname AS target_column, c.conname AS constraint_name FROM pg_constraint c JOIN pg_class t ON t.oid = c.conrelid JOIN pg_namespace n ON n.oid = t.relnamespace JOIN pg_class rt ON rt.oid = c.confrelid CROSS JOIN LATERAL unnest(c.conkey, c.confkey) AS k(source_num, target_num) JOIN pg_attribute a ON a.attrelid = t.oid AND a.attnum = k.source_num JOIN pg_attribute ra ON ra.attrelid = rt.oid AND ra.attnum = k.target_num WHERE c.contype = 'f' AND n.nspname = 'public' AND t.relname = $1 ORDER BY c.conname, a.attnum;", [name]);
      const indexes = await db.query("SELECT indexname, indexdef FROM pg_indexes WHERE schemaname = 'public' AND tablename = $1 ORDER BY indexname;", [name]);
      const permission = await db.query("SELECT has_table_privilege($1, $2, 'SELECT') AS allowed;", [user, `public.${identifier(name)}`]);
      let records = { rows: [], fields: columns.rows.map(column => ({ name: column.column_name })) }, denied = !permission.rows[0].allowed;
      if (!denied) {
        try {
          await db.exec(`SET ROLE ${identifier(user)};`);
          records = await db.query(`SELECT * FROM public.${identifier(name)} ORDER BY 1 LIMIT 51;`, [], { rowMode: 'array' });
        } catch (error) { if (error.code === '42501') denied = true; else throw error; }
        finally { await admin(); }
      }
      tables.push({ name, columns: columns.rows, constraints: constraints.rows, references: references.rows, indexes: indexes.rows, fields: records.fields.map(({ name: fieldName }) => fieldName), rows: records.rows.slice(0, 50), truncated: records.rows.length > 50, denied });
    }
    const databases = await db.query('SELECT datname FROM pg_database WHERE NOT datistemplate ORDER BY datname;');
    const roles = await db.query("SELECT rolname, rolsuper FROM pg_roles WHERE rolname !~ '^pg_' ORDER BY rolname;");
    const memberships = await db.query('SELECT member.rolname AS member, parent.rolname AS group_name FROM pg_auth_members m JOIN pg_roles member ON member.oid = m.member JOIN pg_roles parent ON parent.oid = m.roleid ORDER BY member.rolname, parent.rolname;');
    const grants = await db.query("SELECT grantee, table_name, privilege_type FROM information_schema.role_table_grants WHERE table_schema = 'public' AND grantee <> 'postgres' ORDER BY grantee, table_name, privilege_type;");
    return { database, user, databases: databases.rows.map(row => row.datname), tables, roles: roles.rows, memberships: memberships.rows.filter(row => !row.member.startsWith('pg_')), grants: grants.rows };
  }
  async function connect(target) {
    await admin();
    const exists = await db.query('SELECT 1 FROM pg_database WHERE datname = $1 AND NOT datistemplate;', [target]);
    if (!exists.rows.length) throw new Error('That database does not exist. Create it before connecting.');
    const previous = { dump: await db.dumpDataDir('none'), database, user };
    try { await replace({ ...previous, database: target }); }
    catch (error) { await replace(previous); throw error; }
  }
  async function snapshot() {
    if (db.isInTransaction()) throw new Error('Finish or roll back the transaction before saving.');
    await admin();
    return { dump: await db.dumpDataDir('gzip'), database, user };
  }
  async function handle(request) {
    if (!db) await replace(request.snapshot);
    let results = [], plan = null, error = null;
    try {
      if (request.action === 'restore') {
        if (!request.snapshot?.dump) throw new Error('There is no saved backup to restore.');
        const previous = await snapshot();
        try { await replace(request.snapshot); } catch (restoreError) { await replace(previous); throw restoreError; }
      } else if (request.action === 'reset') await replace();
      else if (request.action === 'connect') await connect(request.database);
      else if (request.action === 'user') {
        if (!config.users.some(item => item.id === request.user)) throw new Error('Choose one of the classroom users.');
        await admin();
        await db.exec(`SET ROLE ${identifier(request.user)};`);
        user = request.user;
      } else if (request.action === 'run' || request.action === 'plan') {
        const sql = String(request.sql || '').trim();
        if (!sql) throw new Error('Write a SQL statement first.');
        await admin();
        await db.exec(`SET ROLE ${identifier(user)};`);
        if (request.action === 'plan') {
          // The extended query protocol accepts one statement. No ANALYZE:
          // explaining maintenance SQL must never perform the maintenance.
          const response = await db.query(`EXPLAIN (FORMAT JSON) ${sql}`, []);
          plan = response.rows[0]?.['QUERY PLAN'] || [];
        } else {
          results = (await db.exec(sql, { rowMode: 'array' })).map(result => ({ command: result.command || '', fields: result.fields.map(field => field.name), rows: result.rows.slice(0, 100), rowCount: result.rows.length, affectedRows: result.affectedRows ?? 0 }));
        }
        if (db.isInTransaction()) {
          await db.exec('ROLLBACK;');
          throw new Error('An explicit transaction was left open and has been rolled back. Complete BEGIN … COMMIT within one Run.');
        }
      }
    } catch (caught) {
      error = failure(caught);
      if (db?.isInTransaction()) await db.exec('ROLLBACK;');
    }
    return { ok: !error, error, state: await inspect(), results, plan, snapshot: await snapshot() };
  }
  return { handle, snapshot, close: async () => { if (db) await db.close(); db = null; } };
}

if (typeof self !== 'undefined' && typeof self.postMessage === 'function') {
  let engine, queue = Promise.resolve();
  self.onmessage = ({ data }) => {
    queue = queue.then(async () => {
      try {
        if (!engine) {
          const { PGlite } = await import(new URL('../assets/vendor/pglite/index.js', import.meta.url).href);
          engine = createDbmsSession(PGlite, data.config);
        }
        self.postMessage({ requestId: data.requestId, value: await engine.handle(data) });
      } catch (error) {
        self.postMessage({ requestId: data.requestId, fatal: failure(error) });
      }
    });
  };
}
