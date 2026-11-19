import { createSnapshotStore, compatibleSnapshot, SnapshotConflict } from './section8-dbms-store.js';

const launcher = document.querySelector('[data-s8-dbms]');
if (launcher) startWorkbench(launcher);

function startWorkbench(host) {
  const config = JSON.parse(host.querySelector('[data-dbms-config]').textContent);
  const dialog = host.querySelector('[data-dbms-dialog]');
  document.body.append(dialog); // Never owned or hidden by a classroom card.
  const field = name => dialog.querySelector(`[data-dbms-field="${name}"]`);
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const identifier = value => `"${String(value).replaceAll('"', '""')}"`;
  const literal = value => `'${String(value).replaceAll("'", "''")}'`;
  const store = createSnapshotStore();
  // A new fixture/engine version gets a new key; older student work is retained.
  const storeId = `${config.id}:${config.engineVersion}:${config.seedVersion}:${config.formatVersion}`;
  let saved = null, currentSnapshot = null, teachingBackup = null, state = null;
  let worker = null, requestId = 0, waiting = null, busy = false, ready = false;
  let temporary = false, incompatible = false, outage = false, mode = 'guided', activePanel = 'data', storageReason = '';
  let lastTrigger;
  const aliases = { model: 'schema', security: 'users', developer: 'sql' };

  function table(headers, rows, label) {
    const value = cell => cell === null ? '<span class="s8-dbms-null">NULL</span>' : escape(typeof cell === 'boolean' ? String(cell).toUpperCase() : cell instanceof Date ? cell.toISOString().slice(0, 10) : cell);
    return `<div class="s8-dbms-table" tabindex="0" role="region" aria-label="${escape(label)}"><table><thead><tr>${headers.map(header => `<th scope="col">${escape(header)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(cell => `<td>${value(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${rows.length ? '' : '<p>No records.</p>'}`;
  }
  function status(message, error = false) {
    field('status').textContent = message;
    field('status').dataset.error = String(error);
  }
  function storageStatus() {
    field('storage').dataset.temporary = String(temporary);
    field('storage').textContent = temporary
      ? `Temporary mode: changes remain on this page but are not saved across lessons or reloads. ${storageReason} Retry browser save when storage is available.`
      : saved ? `Saved in this browser · revision ${saved.revision} · ${new Date(saved.savedAt).toLocaleString()}. The same library opens in the next lesson.` : 'Loading browser storage…';
  }
  function setBusy(value) {
    busy = value;
    dialog.setAttribute('aria-busy', String(value));
    if (value) document.documentElement.dataset.s8DbmsBusy = 'true';
    else delete document.documentElement.dataset.s8DbmsBusy;
    dialog.querySelectorAll('button, select, input').forEach(control => { control.disabled = value && control.dataset.dbmsAction !== 'close'; });
    field('editor').readOnly = value || mode === 'guided';
  }
  function stopWorker(message) {
    worker?.terminate(); worker = null;
    if (waiting) { clearTimeout(waiting.timer); waiting.reject(new Error(message)); waiting = null; }
  }
  function request(action, options = {}) {
    if (!worker) {
      worker = new Worker(new URL('./section8-dbms-worker.js', import.meta.url), { type: 'module' });
      worker.onmessage = ({ data }) => {
        if (!waiting || data.requestId !== waiting.id) return;
        const pending = waiting; waiting = null; clearTimeout(pending.timer);
        if (data.fatal) { worker.terminate(); worker = null; pending.reject(new Error(data.fatal.message)); } else pending.resolve(data.value);
      };
      worker.onerror = () => stopWorker('The local SQL engine stopped. The last completed snapshot is preserved. Open a panel or run again to recover.');
    }
    return new Promise((resolve, reject) => {
      const id = ++requestId;
      const timer = setTimeout(() => stopWorker('The SQL operation took too long and was stopped. Its unfinished changes were discarded; the last completed snapshot will be restored.'), ready && action === 'run' ? 20000 : 45000);
      waiting = { id, timer, resolve, reject };
      worker.postMessage({ requestId: id, config, snapshot: currentSnapshot, action, ...options });
    });
  }
  function selectPanel(name, focus = false) {
    activePanel = aliases[name] || name;
    if (!dialog.querySelector(`[data-dbms-view="${activePanel}"]`)) activePanel = 'data';
    dialog.querySelectorAll('[data-dbms-view]').forEach(panel => { panel.hidden = panel.dataset.dbmsView !== activePanel; });
    dialog.querySelectorAll('[data-dbms-panel]').forEach(tab => {
      const selected = tab.dataset.dbmsPanel === activePanel;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
  }
  function chooseExample(id, goToSql = false) {
    const item = config.examples[id];
    if (!item) return;
    field('example').value = id === 'dictionary-add-email' ? 'dictionary-add-note' : id;
    field('editor').value = item.sql;
    field('example-note').textContent = item.note || 'The worked examples use the initial library data. Predict the result from the current records before running the statement.';
    setMode('guided');
    if (goToSql) selectPanel('sql');
  }
  function setMode(value) {
    mode = value;
    field('editor').readOnly = busy || value === 'guided';
    dialog.querySelectorAll('[data-dbms-action="guided"], [data-dbms-action="free"]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.dbmsAction === value)));
    if (value === 'free') field('editor').focus({ preventScroll: true });
  }
  function renderRecords() {
    if (!state) return;
    const selected = state.tables.find(item => item.name === field('table').value);
    field('records').innerHTML = outage ? '<p class="s8-dbms-no-records">Simulated outage: live data are unavailable. Restore the teaching backup to continue.</p>' : selected
      ? selected.denied ? '<p class="s8-dbms-no-records">Access denied: this user has no SELECT access right for this table. Its records are not displayed.</p>' : table(selected.fields, selected.rows, `${selected.name} current records`) + (selected.truncated ? '<p>Showing the first 50 records.</p>' : '')
      : '<p>No user tables in this database. Create a table in Developer & SQL.</p>';
  }
  function render(value) {
    state = value;
    field('connected').textContent = `Connected: ${state.database} · user: ${state.user}`;
    field('database').innerHTML = state.databases.map(name => `<option value="${escape(name)}"${name === state.database ? ' selected' : ''}>${escape(name)}</option>`).join('');
    field('user').value = state.user;
    const options = state.tables.map(item => `<option value="${escape(item.name)}">${escape(item.name)}</option>`).join('');
    for (const selector of [field('table'), ...dialog.querySelectorAll('[data-dbms-table-options]')]) {
      const selected = selector.value; selector.innerHTML = options;
      if (state.tables.some(item => item.name === selected)) selector.value = selected;
    }
    renderRecords();
    const constraints = state.tables.flatMap(item => item.constraints.map(constraint => [item.name, constraint.type === 'p' ? 'Primary key' : constraint.type === 'f' ? 'Foreign key' : constraint.type === 'u' ? 'Unique' : constraint.type === 'c' ? 'Check' : constraint.type === 'n' ? 'Not null' : constraint.type, constraint.definition]));
    field('constraints').innerHTML = table(['Table', 'Rule', 'Definition enforced by PostgreSQL'], constraints, 'Declared integrity constraints');
    const cards = state.tables.map(item => `<article><h4>${escape(item.name)}</h4><ul>${item.columns.map(column => `<li><code>${escape(column.column_name)}</code> ${escape(column.data_type)}${column.character_maximum_length ? `(${column.character_maximum_length})` : ''}</li>`).join('')}</ul></article>`).join('');
    const relationships = state.tables.flatMap(item => item.references.map(reference => `<li><code>${escape(item.name)}.${escape(reference.column_name)}</code> → <code>${escape(reference.target_table)}.${escape(reference.target_column)}</code> (foreign key)</li>`));
    field('schema').innerHTML = `<div class="s8-dbms-schema">${cards || '<p>The schema has no user tables yet.</p>'}</div><h4>Foreign-key relationships</h4><ul class="s8-dbms-relations">${relationships.join('') || '<li>No declared foreign keys.</li>'}</ul><p>The initial model has Member 1:M Loan, Copy 1:M Loan and Book 1:M Copy. The many-to-many relationship between Member and Copy over the borrowing history is implemented using Loan and two one-to-many relationships. MemberCard.MemberID is both primary key and foreign key, so each member has at most one current card. Requiring every member to have a card is an additional business rule.</p>`;
    const dictionary = state.tables.flatMap(item => item.columns.map(column => [item.name, column.column_name, column.data_type, column.character_maximum_length ?? '—', column.is_nullable, column.column_default ?? '—']));
    field('dictionary').innerHTML = table(['Table', 'Attribute', 'Data type', 'Maximum characters', 'NULL allowed', 'Default'], dictionary, 'Live data dictionary') + '<h4>Key constraints and validation rules</h4>' + table(['Table', 'Rule', 'Definition'], constraints, 'Dictionary constraints') + '<h4>Indexes</h4>' + table(['Table', 'Index', 'Definition'], state.tables.flatMap(item => item.indexes.map(index => [item.name, index.indexname, index.indexdef])), 'Declared indexes');
    field('permissions').innerHTML = table(['User / role', 'Member of group'], state.memberships.map(item => [item.member, item.group_name]), 'Role membership') + '<details><summary>Access rights assigned to users and groups</summary>' + table(['User or group', 'Table', 'Access right'], state.grants.map(grant => [grant.grantee, grant.table_name, grant.privilege_type]), 'Database grants') + '</details><p>Administrator is the database owner. A user receives access rights assigned directly to that user and rights inherited from their groups.</p>';
    field('backup-label').textContent = teachingBackup ? `Teaching backup: ${new Date(teachingBackup.createdAt).toLocaleString()} · connected database ${teachingBackup.snapshot.database}. ${outage ? 'Live data are currently unavailable.' : ''}` : 'No teaching backup has been made.';
    storageStatus();
  }
  function renderResults(response) {
    field('results').innerHTML = response.error ? '<p>The database rejected the operation. Inspect the error above and the current data before trying again.</p>' : response.results.map((result, index) => result.fields.length
      ? `<h4>${response.results.length > 1 ? `Statement ${index + 1} · ` : ''}${result.rowCount} result rows</h4>${table(result.fields, result.rows, 'SQL result')}${result.rowCount > 100 ? '<p>Showing the first 100 result rows.</p>' : ''}`
      : `<p>${escape(result.command)} completed${['INSERT', 'UPDATE', 'DELETE'].includes(result.command) ? ` · ${result.affectedRows} records affected` : ''}.</p>`).join('') || '<p>Operation completed. Inspect the current structure and records.</p>';
    if (response.plan) {
      const walk = (node, depth = 0) => [{ depth, text: [node['Node Type'], node['Relation Name'] ? `on ${node['Relation Name']}` : '', node['Index Name'] ? `using ${node['Index Name']}` : '', node['Filter'] ? `filter: ${node['Filter']}` : '', node['Plan Rows'] !== undefined ? `estimated rows: ${node['Plan Rows']}` : ''].filter(Boolean).join(' · ') }, ...(node.Plans || []).flatMap(child => walk(child, depth + 1))];
      const steps = response.plan.flatMap(item => item.Plan ? walk(item.Plan) : []);
      field('plan').innerHTML = `<div class="s8-dbms-plan"><ol>${steps.map(item => `<li style="margin-left:${item.depth}rem">${escape(item.text)}</li>`).join('')}</ol><details><summary>PostgreSQL plan JSON</summary><pre>${escape(JSON.stringify(response.plan, null, 2))}</pre></details></div>`;
      field('plan-details').open = true;
    } else field('plan').innerHTML = '<p>Select Explain query plan for the current statement.</p>';
  }
  const explainError = error => {
    const messages = { '23505': 'A primary or unique key already has that value.', '23503': 'This would break a declared foreign-key reference.', '23502': 'A NOT NULL attribute is missing.', '23514': 'The value violates a CHECK rule.', '42501': 'This user does not have the required access right.', '42P07': 'The table already exists in the connected database.', '42P04': 'That database already exists. Select it and Connect.', '42701': 'The attribute already exists.', '42P01': 'The table is not present in the connected database.', '42601': 'PostgreSQL could not parse this SQL.', '22001': 'Text exceeds the declared maximum length.' };
    return [messages[error.code], error.message, error.detail, error.hint].filter(Boolean).join(' ');
  };
  function adoptRecord(record) {
    saved = record;
    teachingBackup = record?.teachingBackup || null;
    outage = record?.outage || false;
    currentSnapshot = record?.snapshot || null;
  }
  async function persist() {
    if (temporary || incompatible) { storageStatus(); return; }
    const record = { formatVersion: config.formatVersion, seedVersion: config.seedVersion, engineVersion: config.engineVersion, snapshot: currentSnapshot, teachingBackup, outage };
    try { saved = await store.commit(storeId, saved?.revision ?? 0, record); storageStatus(); }
    catch (error) {
      if (error instanceof SnapshotConflict || error.name === 'SnapshotConflict') {
        const latest = await store.read(storeId);
        adoptRecord(latest);
        const restored = await request('restore', { snapshot: currentSnapshot });
        currentSnapshot = restored.snapshot; render(restored.state);
        field('results').innerHTML = '<p>The conflicting operation was not saved. The latest shared library has been restored. Your SQL remains in the editor.</p>';
        throw error;
      }
      temporary = true; storageReason = error.message; storageStatus();
      status(`The SQL operation completed, but browser storage failed: ${error.message}. Current changes remain on this page.`, true);
    }
  }
  async function initialise() {
    if (ready) return;
    if (location.protocol === 'file:') throw new Error('Open this course through its website or a local HTTP server to run the DBMS. Reading examples remain available.');
    try {
      const record = await store.read(storeId);
      if (!compatibleSnapshot(record, config)) { incompatible = true; temporary = true; throw new Error('The saved workspace has an incompatible version. It has been preserved; this page uses a temporary library.'); }
      adoptRecord(record);
    } catch (error) { temporary = true; storageReason = error.message; storageStatus(); }
    let response;
    try { response = await request('init'); }
    catch (error) {
      stopWorker('The saved workspace could not be opened.');
      if (!currentSnapshot) throw error;
      incompatible = true; temporary = true;
      throw new Error(`The saved workspace could not be opened and has been preserved. Select Restore starting library to use a temporary copy. ${error.message}`);
    }
    currentSnapshot = response.snapshot; ready = true; render(response.state);
    if (!saved) await persist();
  }
  async function run(action, options = {}) {
    if (busy) return;
    setBusy(true); status(ready ? 'Working locally and saving the workspace…' : 'Starting the local database…');
    try {
      if (action === 'reset' && incompatible) { currentSnapshot = null; ready = true; }
      else await initialise();
      if (!temporary) {
        try {
          const latest = await store.read(storeId);
          if (latest && latest.revision !== saved?.revision) {
            adoptRecord(latest);
            const latestState = await request('restore', { snapshot: currentSnapshot });
            currentSnapshot = latestState.snapshot; render(latestState.state);
          }
        } catch (error) { temporary = true; storageReason = error.message; storageStatus(); }
      }
      if (action === 'init') { status('Ready. Predict a result before making a change.'); return; }
      if (action === 'retry-save') {
        if (incompatible) throw new Error('The old saved workspace is incompatible and has been preserved. This temporary copy will not overwrite it.');
        temporary = false; await persist();
        if (!temporary) status('The current workspace is saved in this browser.');
        return;
      }
      if (outage && !['restore', 'reset', 'user'].includes(action)) throw new Error('This is a simulated outage. Restore the teaching backup or restore the starting library to make data available.');
      if (['backup', 'restore', 'outage'].includes(action) && state?.user !== 'postgres') throw new Error('Select Administrator to carry out this backup or recovery procedure.');
      if (action === 'restore' && !teachingBackup) throw new Error('No teaching backup exists. Restore the starting library if needed.');
      const engineAction = ['backup', 'outage'].includes(action) ? 'inspect' : action;
      const response = await request(engineAction, action === 'restore' ? { snapshot: teachingBackup.snapshot } : options);
      currentSnapshot = response.snapshot;
      if (response.ok) {
        if (action === 'backup') teachingBackup = { snapshot: currentSnapshot, createdAt: new Date().toISOString() };
        if (action === 'outage') outage = true;
        if (action === 'restore') outage = false;
        if (action === 'reset') { outage = false; teachingBackup = null; }
      }
      render(response.state);
      if (['run', 'plan'].includes(action)) renderResults(response);
      await persist();
      if (response.error) status(explainError(response.error), true);
      else if (!temporary) status(action === 'backup' ? 'Teaching backup created. Make a later change, then restore to compare.' : action === 'restore' ? 'Teaching backup restored. Changes made after its time are absent.' : action === 'outage' ? 'Simulated outage: the live data are unavailable. Restore your teaching backup.' : action === 'reset' ? 'The shared library and its roles are back to the starting state.' : action === 'connect' ? `Connected to ${response.state.database}. Its tables are shown in Data and Schema.` : action === 'plan' ? 'PostgreSQL returned its plan. EXPLAIN did not execute the statement.' : 'Completed and saved. Compare the current data and schema with your prediction.');
      else if (response.ok) status('Completed in temporary mode. Current changes remain on this page; browser saving is unavailable.');
    } catch (error) {
      if (waiting) stopWorker(error.message);
      status(error.message, true);
    } finally { setBusy(false); storageStatus(); }
  }

  async function open(trigger, panel, example) {
    lastTrigger = trigger;
    selectPanel(panel || host.dataset.initialPanel);
    if (example) chooseExample(example);
    if (!dialog.open) dialog.showModal();
    await run('init');
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-s8-open-dbms], [data-dbms-open]');
    if (!trigger) return;
    event.preventDefault();
    open(trigger, trigger.dataset.panel || host.dataset.initialPanel, trigger.dataset.example || host.dataset.initialExample);
  });
  dialog.addEventListener('click', event => {
    const tab = event.target.closest('[data-dbms-panel]');
    if (tab) { selectPanel(tab.dataset.dbmsPanel); return; }
    const example = event.target.closest('[data-dbms-example]');
    if (example) { chooseExample(example.dataset.dbmsExample, true); return; }
    const button = event.target.closest('[data-dbms-action]');
    if (!button) return;
    const action = button.dataset.dbmsAction;
    if (action === 'close') { dialog.close(); return; }
    if (action === 'guided' || action === 'free') { setMode(action); return; }
    if (action === 'reset' && !window.confirm('Restore the starting library? This replaces the shared chapter’s changes and removes its teaching backup.')) return;
    if (action === 'restore' && teachingBackup && !window.confirm('Restore the teaching backup? Changes after its time will be removed from the shared library.')) return;
    if (action === 'backup' && teachingBackup && !window.confirm('Replace the existing teaching backup with the current state?')) return;
    run(action, action === 'connect' ? { database: field('database').value } : action === 'user' ? { user: field('user').value } : ['run', 'plan'].includes(action) ? { sql: field('editor').value } : {});
  });
  dialog.addEventListener('change', event => {
    if (event.target === field('example')) chooseExample(event.target.value);
    if (event.target === field('table')) renderRecords();
  });
  dialog.addEventListener('submit', event => {
    const form = event.target.closest('[data-dbms-form]');
    if (!form) return;
    event.preventDefault();
    const values = new FormData(form);
    let sql;
    if (form.dataset.dbmsForm === 'member') {
      const id = Number(values.get('memberid'));
      if (!Number.isSafeInteger(id) || id < 1) { status('Use a positive whole-number MemberID for this form.', true); return; }
      sql = `INSERT INTO Member (MemberID, MemberName, SchoolEmail, TutorGroup, Active) VALUES (${id}, ${literal(values.get('membername'))}, ${literal(values.get('email'))}, ${literal(values.get('tutorgroup'))}, TRUE);`;
    } else if (form.dataset.dbmsForm === 'column') {
      const type = values.get('type');
      if (!['VARCHAR(80)', 'CHARACTER(1)', 'BOOLEAN', 'INTEGER', 'REAL', 'DATE', 'TIME'].includes(type)) return;
      sql = `ALTER TABLE ${identifier(values.get('table'))} ADD ${identifier(values.get('column'))} ${type};`;
    } else if (form.dataset.dbmsForm === 'grant') {
      const operation = values.get('operation'), privilege = values.get('privilege');
      if (!['GRANT', 'REVOKE'].includes(operation) || !['SELECT', 'INSERT', 'UPDATE', 'DELETE'].includes(privilege)) return;
      sql = `${operation} ${privilege} ON ${identifier(values.get('table'))} ${operation === 'GRANT' ? 'TO' : 'FROM'} ${identifier(values.get('subject'))};`;
    }
    if (sql) { field('editor').value = sql; setMode('free'); run('run', { sql }); }
  });
  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (event.target === field('editor') && (event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); run('run', { sql: field('editor').value }); }
    const tab = event.target.closest('[data-dbms-panel]');
    if (tab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const tabs = [...dialog.querySelectorAll('[data-dbms-panel]')], index = tabs.indexOf(tab);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectPanel(tabs[next].dataset.dbmsPanel, true);
    }
  });
  dialog.addEventListener('close', () => lastTrigger?.focus({ preventScroll: true }));
  window.addEventListener('beforeunload', event => { if (busy) { event.preventDefault(); event.returnValue = ''; } });
  selectPanel(host.dataset.initialPanel);
  chooseExample(host.dataset.initialExample || 'default');
}
