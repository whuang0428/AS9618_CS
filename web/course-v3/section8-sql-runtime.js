const labs = [...document.querySelectorAll('[data-s8-sql]')];
const states = new WeakMap();
const pending = new Map();
let worker = null;
let requestNumber = 0;
let serial = Promise.resolve();

const field = (lab, name) => lab.querySelector(`[data-s8-role="${name}"]`);
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const showValue = (value) => value === null ? '<span class="s8-sql-null">NULL</span>' : escape(value instanceof Date ? value.toISOString().slice(0, 10) : typeof value === 'boolean' ? String(value).toUpperCase() : value);
const visible = (lab) => lab.getClientRects().length > 0 && !lab.closest('[hidden]');

function table(headers, rows, label) {
  return `<div class="table-wrap" tabindex="0" aria-label="${escape(label)}"><table><thead><tr>${headers.map((name) => `<th scope="col">${escape(name)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((value) => `<td>${showValue(value)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function renderState(lab, result) {
  if (!result) return;
  const relevantNames = states.get(lab).config.tables.map((item) => item.title.toLowerCase());
  const renderTable = (item) => {
    const headers = item.fields.map((column) => column.name);
    const labelledHeaders = headers.map((name) => {
      const keys = item.columns.find((column) => column.column_name === name)?.keys;
      return keys?.length ? `${name} (${keys.join(', ')})` : name;
    });
    const structure = item.columns.map((column) => `<li><code>${escape(column.column_name)}</code>: ${escape(column.data_type)}${column.character_maximum_length ? `(${column.character_maximum_length})` : ''}${column.is_nullable === 'NO' ? ' · NOT NULL' : ''}${column.keys.length ? ` · ${escape(column.keys.join(', '))}` : ''}</li>`).join('');
    return `<section><h5>${escape(item.name)}${item.rows.length === 0 ? ' · empty table' : ''}</h5>${table(labelledHeaders, item.rows.map((row) => headers.map((name) => row[name])), `${item.name} current records`)}${item.truncated ? '<p>Showing the first 30 records.</p>' : ''}<details><summary>Column definitions and keys</summary><ul>${structure}</ul></details></section>`;
  };
  const relevant = result.tables.filter((item) => !relevantNames.length || relevantNames.includes(item.name));
  const additional = result.tables.filter((item) => relevantNames.length && !relevantNames.includes(item.name));
  field(lab, 'tables').innerHTML = result.tables.length
    ? relevant.map(renderTable).join('') + (additional.length ? `<details class="s8-sql-other-tables"><summary>Other tables in this practice database</summary>${additional.map(renderTable).join('')}</details>` : '')
    : '<p>No user tables in this database yet. Run CREATE TABLE to define a table.</p>';
  const selector = field(lab, 'database');
  selector.innerHTML = result.databases.map((name) => `<option value="${escape(name)}"${name === result.database ? ' selected' : ''}>${escape(name)}</option>`).join('');
  field(lab, 'connected').textContent = `Connected to ${result.database}`;
  if (result.databases.length > 1) field(lab, 'connection').hidden = false;
}

function renderResults(lab, results) {
  field(lab, 'results').innerHTML = results.map((result, index) => {
    const headers = result.fields.map((column) => column.name);
    const prefix = results.length > 1 ? `Statement ${index + 1}: ` : '';
    if (headers.length) return `<section><h5>${prefix}Result · ${result.rowCount} ${result.rowCount === 1 ? 'row' : 'rows'}</h5>${table(headers, result.rows, 'Query result')}${result.rowCount === 0 ? '<p>No records match this query.</p>' : ''}${result.rowCount > 100 ? '<p>Showing the first 100 result rows.</p>' : ''}</section>`;
    const changed = ['INSERT', 'UPDATE', 'DELETE'].includes(result.command);
    return `<p>${prefix}${escape(result.command || 'Statement')} completed.${changed ? ` ${result.affectedRows} ${result.affectedRows === 1 ? 'record' : 'records'} affected.` : ''}</p>`;
  }).join('') || '<p>The statement completed. Inspect the current source tables.</p>';
}

function readableError(error) {
  const explanations = {
    '23505': 'A value that must be unique already exists. Check the primary key.',
    '23503': 'This operation would break a foreign-key reference. Check the member and loan records.',
    '23502': 'A required field is missing. NOT NULL is a separate rule from a foreign key.',
    '42P07': 'That table already exists. Choose the next step, use a different name, or reset the experiment.',
    '42P04': 'That database already exists. Choose it below and select Connect.',
    '42701': 'That column already exists. Reset if you want to repeat the ALTER statement.',
    '42P01': 'The named table does not exist in the current database. Check the spelling and current connection.',
    '42601': 'PostgreSQL could not parse the statement. Check keywords, commas, quotes and parentheses.',
    '22001': 'A text value is longer than the length allowed by this column.',
  };
  return `${explanations[error.code] || 'The database rejected this statement.'} ${error.message}${error.detail ? ` ${error.detail}` : ''}${error.hint ? ` ${error.hint}` : ''}`;
}

function loseWorker(message) {
  worker?.terminate();
  worker = null;
  for (const request of pending.values()) { clearTimeout(request.timer); request.reject(new Error(message)); }
  pending.clear();
  labs.forEach((lab) => {
    const state = states.get(lab);
    state.ready = false;
    field(lab, 'status').textContent = message;
    field(lab, 'results').innerHTML = '<p>The previous database state is no longer available. Select Run SQL or Reset to start again from the initial data.</p>';
    field(lab, 'tables').innerHTML = '<p>Waiting to restore the initial source tables.</p>';
  });
}

function request(message) {
  if (!worker) {
    worker = new Worker(new URL('./section8-sql-worker.js', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data }) => {
      const waiting = pending.get(data.requestId);
      if (!waiting) return;
      clearTimeout(waiting.timer);
      pending.delete(data.requestId);
      waiting.resolve(data);
    };
    worker.onerror = () => loseWorker('The SQL engine stopped. Temporary changes in all experiments on this page were lost. Reset to start again.');
  }
  const requestId = ++requestNumber;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => loseWorker('The SQL operation took too long and was stopped. Temporary changes in all experiments on this page were lost. Reset to restore the initial data.'), message.action === 'run' ? 20000 : 45000);
    pending.set(requestId, { resolve, reject, timer });
    worker.postMessage({ ...message, requestId });
  });
}

function setBusy(lab, busy) {
  lab.setAttribute('aria-busy', String(busy));
  lab.querySelectorAll('button, select').forEach((control) => { control.disabled = busy; });
}

function perform(lab, action, options = {}) {
  const state = states.get(lab);
  if (location.protocol === 'file:') {
    field(lab, 'status').textContent = 'To run SQL, open this lesson through the course website or a local HTTP server. The source tables and explanations remain available for reading.';
    return Promise.resolve();
  }
  if (state.busy) return Promise.resolve();
  state.busy = true;
  setBusy(lab, true);
  field(lab, 'status').textContent = state.ready ? 'Running locally…' : 'Starting the local SQL engine. The first load may take a moment…';
  const operation = serial.then(async () => {
    try {
      const response = await request({ id: state.id, config: state.config, action, ...options });
      renderState(lab, response.ok ? response.value : response.state);
      state.ready = true;
      if (!response.ok) {
        field(lab, 'status').textContent = readableError(response.error);
        field(lab, 'results').innerHTML = '<p>The statement did not complete successfully. Inspect the current tables, correct it, and try again. Any open transaction was rolled back.</p>';
        return;
      }
      if (action === 'run') {
        renderResults(lab, response.value.results);
        field(lab, 'status').textContent = 'SQL executed. Compare the result and current tables with your prediction.';
      } else if (action === 'reset') {
        field(lab, 'results').innerHTML = '<p>Initial data restored. Predict the output before running the statement.</p>';
        field(lab, 'status').textContent = 'Reset complete. All tables, constraints and records are back to this experiment’s starting state.';
      } else if (action === 'connect') {
        field(lab, 'results').innerHTML = `<p>Connected to ${escape(response.value.database)}. Its current tables appear below.</p>`;
        field(lab, 'status').textContent = `Connected to ${response.value.database}. Table statements now use this database.`;
      } else field(lab, 'status').textContent = 'Ready. Predict the result, then run the statement.';
    } catch (error) {
      state.ready = false;
      field(lab, 'status').textContent = error.message;
    } finally {
      state.busy = false;
      setBusy(lab, false);
    }
  });
  serial = operation.catch(() => {});
  return operation;
}

function mode(lab, name) {
  const state = states.get(lab);
  const editor = field(lab, 'editor');
  if (state.mode !== 'guided') state.drafts[state.mode] = editor.value;
  state.mode = name;
  lab.querySelectorAll('[data-s8-action="mode"]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.mode === name)));
  field(lab, 'guided-controls').hidden = name !== 'guided';
  field(lab, 'challenge').hidden = name !== 'independent';
  editor.readOnly = name === 'guided';
  if (name === 'guided') editor.value = state.config.choices[Number(field(lab, 'choice').value)].sql;
  else if (name === 'independent') editor.value = state.drafts.independent ?? '';
  else editor.value = state.drafts.amend ?? editor.value;
  field(lab, 'notice').textContent = name === 'guided' ? state.config.choices[Number(field(lab, 'choice').value)].notice || 'Predict the result before selecting Run SQL.' : name === 'amend' ? 'Change the statement, predict what will differ, then run it. The database keeps earlier changes until Reset.' : 'Write a statement for the task below. You can return to Guided for a worked example.';
  if (name !== 'guided') editor.focus({ preventScroll: true });
}

labs.forEach((lab, index) => {
  const config = JSON.parse(lab.querySelector('[data-s8-sql-config]').textContent);
  states.set(lab, { id: `${config.key}-${index}`, config, ready: false, busy: false, mode: 'guided', drafts: {} });
  lab.addEventListener('change', (event) => {
    if (event.target !== field(lab, 'choice')) return;
    const selected = config.choices[Number(event.target.value)];
    field(lab, 'editor').value = selected.sql;
    field(lab, 'notice').textContent = selected.notice || 'Predict the result, then select Run SQL. Choosing a statement does not change the data.';
  });
  lab.addEventListener('click', (event) => {
    const button = event.target.closest('[data-s8-action]');
    if (!button || !lab.contains(button)) return;
    if (button.dataset.s8Action === 'mode') mode(lab, button.dataset.mode);
    if (button.dataset.s8Action === 'run') perform(lab, 'run', { sql: field(lab, 'editor').value });
    if (button.dataset.s8Action === 'reset') perform(lab, 'reset');
    if (button.dataset.s8Action === 'connect') perform(lab, 'connect', { database: field(lab, 'database').value });
  });
  lab.addEventListener('keydown', (event) => {
    if (event.target !== field(lab, 'editor')) return;
    event.stopPropagation();
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      perform(lab, 'run', { sql: event.target.value });
    }
  });
  if (location.protocol === 'file:') field(lab, 'status').textContent = 'SQL experiments need the course website or a local HTTP server. These tables and explanations can still be read offline.';
});

if (location.protocol !== 'file:' && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
    const state = states.get(target);
    if (isIntersecting && visible(target) && !state.ready && !state.busy) perform(target, 'init');
  }), { threshold: 0.01 });
  labs.forEach((lab) => observer.observe(lab));
}

// Restart concept is explicit; switching teaching stages or view modes is not a reset.
document.addEventListener('s5:reset', (event) => {
  const container = event.target;
  if (!(container instanceof Element)) return;
  container.querySelectorAll('[data-s8-sql]').forEach((lab) => {
    if (states.has(lab) && states.get(lab).ready) perform(lab, 'reset');
  });
});
