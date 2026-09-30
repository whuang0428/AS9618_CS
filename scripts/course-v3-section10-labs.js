/* Section 10 experiments: manual stepping, editable examples and reversible local histories. */
(() => {
  'use strict';
  const M = window.S10Models;
  if (!M) return;
  const labs = [...document.querySelectorAll('.s10-lab')];
  const initial = new Map(labs.map(lab => [lab, lab.innerHTML]));
  const sessions = new WeakMap();
  const traces = new Set(['traverse', 'matrix', 'search', 'sort']);
  const find = (lab, role) => lab.querySelector(`[data-s10-role="${role}"]`);
  const value = (lab, role) => find(lab, role).value;
  const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shown = item => item === null || item === undefined ? '—' : typeof item === 'boolean' ? String(item).toUpperCase() : String(item);
  const metrics = entries => `<div class="s10-metrics">${Object.entries(entries).map(([label, item]) => `<span>${esc(label)} = <strong>${esc(shown(item))}</strong></span>`).join('')}</div>`;
  const table = (headers, rows) => `<table><thead><tr>${headers.map(label => `<th scope="col">${esc(label)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map(item => `<td>${esc(shown(item))}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  function cells(values, options = {}) {
    const { lower = 0, focus = [], active, sortedFrom = values.length, labels = {}, visited = [] } = options;
    return `<div class="s10-cells">${values.map((item, index) => {
      const stale = active && !active.includes(index);
      const note = [labels[index], focus.includes(index) ? 'current' : index >= sortedFrom ? 'settled' : stale ? item === null ? 'free' : 'stale / free' : visited.includes(index) ? 'visited' : active ? 'active' : ''].filter(Boolean).join(' · ');
      return `<div class="s10-cell ${focus.includes(index) ? 'is-focus' : index >= sortedFrom ? 'is-settled' : stale ? 'is-stale' : ''}"><small>Index ${index + lower}</small><b>${esc(shown(item))}</b><em>${esc(note || ' ')}</em></div>`;
    }).join('')}</div>`;
  }
  function numeric(lab, role) {
    const text = value(lab, role).trim();
    if (!text || !Number.isFinite(Number(text))) throw new RangeError('Enter a finite number in every numeric input used by this operation.');
    return Number(text);
  }
  function itemValue(lab, role = 'item') {
    const text = value(lab, role).trim();
    if (!text || text.length > 16 || /[\u0000-\u001f\u007f]/u.test(text)) throw new RangeError('Use an item containing 1–16 printable characters.');
    return text;
  }
  function tell(lab, text, rejected = false) {
    const target = find(lab, 'status'); target.textContent = text; target.dataset.rejected = String(rejected);
  }
  const introductions = {
    records: ['TYPE BookingRecord', 'The declared field types describe a record structure. The displayed record contains the current field values.'],
    array: ['DECLARE Values : ARRAY[LowerBound:UpperBound] OF REAL', 'Read and write use the same bounds. A read returns the stored value; a write replaces it.'],
    files: ['No file handle is open', 'The stored file exists. Open it in an appropriate mode before an operation.'],
    stack: ['Top ← −1', 'The stack starts empty. The first push increases Top to 0 before storing an item.'],
    queue: ['Front ← 0; Rear ← −1; Count ← 0', 'The queue starts empty. The first insertion increases Rear to 0.'],
    linked: ['Head → active chain; FreeHead → unused chain', 'Logical order follows Next links. The active and free chains together cover every physical slot.'],
    booking: ['Seats: ARRAY[1:4]; Waiting: QUEUE; Undo: STACK', 'Two seats are occupied. Select a seat and predict whether a request changes the array, waiting queue or both.']
  };
  function prepare(lab) {
    const type = lab.dataset.s10Lab;
    let data;
    if (type === 'traverse') data = M.traversalTrace(value(lab, 'values'), value(lab, 'operation'), value(lab, 'direction'));
    if (type === 'matrix') data = M.matrixTrace(value(lab, 'matrix').split(';'));
    if (type === 'search') data = M.searchTrace(value(lab, 'values'), numeric(lab, 'target'));
    if (type === 'sort') data = M.sortTrace(value(lab, 'values'), value(lab, 'order'));
    if (type === 'records') data = M.createRecord();
    if (type === 'array') data = M.createArray(value(lab, 'values'), numeric(lab, 'lower'));
    if (type === 'files') data = M.createFile(value(lab, 'lines') === '' ? [] : value(lab, 'lines').replace(/\r/g, '').split('\n'));
    if (type === 'stack') data = M.createStack(numeric(lab, 'capacity'));
    if (type === 'queue') data = M.createQueue(numeric(lab, 'capacity'));
    if (type === 'linked') {
      const names = value(lab, 'names').trim() ? value(lab, 'names').split(',').map(name => name.trim()) : [];
      if (names.some(name => !name || name.length > 16)) throw new RangeError('Use 1–16 characters per item; separate items with commas.');
      data = M.createLinked(names, numeric(lab, 'capacity'));
    }
    if (type === 'booking') data = M.createBooking();
    const session = traces.has(type) ? { trace: data, index: 0, pending: false } : { history: M.createHistory({ state: data, line: introductions[type][0], message: introductions[type][1] }), pending: false };
    sessions.set(lab, session);
    lab.querySelectorAll('[data-s10-operation-disabled]').forEach(button => { button.disabled = false; delete button.dataset.s10OperationDisabled; });
    draw(lab);
  }
  function current(lab) {
    const session = sessions.get(lab);
    return session.trace ? session.trace[session.index] : session.history.present.state;
  }
  function prediction(lab, state) {
    const type = lab.dataset.s10Lab;
    if (traces.has(type)) return state.predict;
    if (type === 'records') return 'Which field will change? Does the new value match its declared data type?';
    if (type === 'array') return 'Is the selected index in bounds? What value will be read or overwritten?';
    if (type === 'files') return state.mode === 'READ' ? 'Is another line available? A blank line and end-of-file are different.' : state.mode ? 'Will writing preserve the current lines? What remains after CLOSEFILE?' : 'What will each open mode do to the stored file and its position?';
    if (type === 'stack') return `Top is ${state.top}. Which slot would PUSH use, and which value would POP return?`;
    if (type === 'queue') return `Count is ${state.count}. What will Front or Rear become after MOD ${state.slots.length}?`;
    if (type === 'linked') return 'Which links must change? Which free slot can an insertion use without losing the rest of the free chain?';
    return 'Which structure changes? Will this request succeed, and should it add an undo entry?';
  }
  function draw(lab) {
    const type = lab.dataset.s10Lab, session = sessions.get(lab), state = current(lab), display = find(lab, 'display');
    const frame = session.trace ? state : session.history.present;
    find(lab, 'line').textContent = frame.line;
    tell(lab, frame.why ?? frame.message);
    find(lab, 'prediction').innerHTML = `<strong>Predict:</strong> ${esc(prediction(lab, state))}`;
    if (session.trace) {
      find(lab, 'progress').textContent = `Step ${session.index + 1} of ${session.trace.length}${state.done ? ' · complete' : ''}`;
      lab.querySelector('[data-s10-action="back"]').disabled = session.index === 0 || session.pending;
      lab.querySelector('[data-s10-action="next"]').disabled = session.index === session.trace.length - 1 || session.pending;
    } else {
      find(lab, 'progress').textContent = `Operations shown: ${session.history.past.length}${session.history.future.length ? ` · ${session.history.future.length} available to replay` : ''}`;
      lab.querySelector('[data-s10-action="back"]').disabled = !session.history.past.length || session.pending;
      lab.querySelector('[data-s10-action="next"]').disabled = !session.history.future.length || session.pending;
    }
    if (state.values) display.innerHTML = cells(state.values, { lower: state.lower, focus: state.focus, sortedFrom: state.sortedFrom, visited: state.visited }) + metrics(state.variables ?? { LowerBound: state.lower, UpperBound: state.upper, 'Elements': state.values.length, 'Read result': state.output });
    if (type === 'records') display.innerHTML = table(['Booking field', 'Declared type', 'Current value'], Object.entries(M.fieldTypes).map(([field, dataType]) => [`Booking.${field}`, dataType, typeof state[field] === 'string' ? dataType === 'CHAR' ? `'${state[field]}'` : `"${state[field]}"` : dataType === 'REAL' && Number.isInteger(state[field]) ? state[field].toFixed(1) : shown(state[field])])) + '<p>Dot notation selects a field inside this one record.</p>';
    if (type === 'matrix') {
      display.innerHTML = `<table><thead><tr><th scope="col">Row / Column</th>${state.matrix[0].map((_, c) => `<th scope="col">Column ${c + 1}</th>`).join('')}<th scope="col">Row total</th></tr></thead><tbody>${state.matrix.map((row, r) => `<tr><th scope="row">Row ${r + 1}</th>${row.map((cell, c) => `<td${state.focus[0] === r && state.focus[1] === c ? ' class="is-focus"' : ''}>${esc(cell)}</td>`).join('')}<td>${state.rowTotals[r]}</td></tr>`).join('')}<tr><th scope="row">Column total</th>${state.columnTotals.map(total => `<td>${total}</td>`).join('')}<td><strong>${state.grand}</strong></td></tr></tbody></table>${metrics({ ...state.variables, GrandTotal: state.grand })}`;
    }
    if (type === 'files') {
      display.innerHTML = `<div class="s10-columns"><section><h4>Stored file: Names.txt</h4>${state.stored.length ? `<ol class="s10-lines">${state.stored.map((line, i) => `<li${state.mode === 'READ' && i === state.pointer ? ' class="is-focus"' : ''}>${line === '' ? '<em>"" · blank line</em>' : esc(line)}${state.mode === 'READ' && i === state.pointer ? ' ← next read' : ''}</li>`).join('')}</ol>` : '<p>Empty file · zero lines</p>'}</section><section><h4>Handle and working memory</h4>${metrics({ Mode: state.mode ?? 'closed', 'Next line': state.pointer === null ? '—' : state.pointer + 1, 'EOF result': state.eof })}<p><strong>Name =</strong> ${state.variable === null ? 'not assigned yet' : `"${esc(state.variable)}"${state.variable === '' ? ' (empty string)' : ''}`}</p></section></div>`;
    }
    if (type === 'stack') display.innerHTML = cells(state.slots, { active: state.slots.map((_, i) => i).filter(i => i <= state.top), labels: state.top >= 0 ? { [state.top]: 'Top' } : {} }) + metrics({ Top: state.top, Count: state.top + 1, Capacity: state.slots.length, 'Last returned': state.output });
    if (type === 'queue') {
      const active = M.queueIndices(state), labels = {};
      labels[state.front] = 'Front';
      if (state.rear >= 0) labels[state.rear] = `${labels[state.rear] ? `${labels[state.rear]} / ` : ''}Rear`;
      display.innerHTML = cells(state.slots, { active, labels }) + metrics({ Front: state.front, Rear: state.rear, Count: state.count, Capacity: state.slots.length, 'Last returned': state.output }) + `<p class="s10-chain">Removal order: ${active.length ? active.map(i => esc(state.slots[i])).join(' → ') : 'empty'}</p>`;
    }
    if (type === 'linked') {
      const active = M.chain(state), free = M.chain(state, state.freeHead);
      const chainText = (indices, data) => indices.length ? `${indices.map(i => `${i}${data ? ` [${esc(state.slots[i].data)}]` : ''}`).join(' → ')} → −1` : '−1 (empty)';
      display.innerHTML = `<p class="s10-chain"><strong>Head:</strong> ${chainText(active, true)}</p><p class="s10-chain"><strong>FreeHead:</strong> ${chainText(free, false)}</p>${table(['Physical index', 'Data', 'Next', 'Membership'], state.slots.map((node, i) => [i, node.data, node.next, active.includes(i) ? `active · position ${active.indexOf(i) + 1}` : 'free (data may be stale)']))}${metrics({ Head: state.head, FreeHead: state.freeHead, 'Active nodes': active.length, 'Free nodes': free.length })}`;
    }
    if (type === 'booking') display.innerHTML = `<h4>Seat array · null means free</h4>${cells(state.seats.map(name => name ?? 'free'), { lower: 1 })}<p class="s10-chain"><strong>Waiting (front first):</strong> ${state.waiting.length ? state.waiting.map(esc).join(' → ') : 'empty'}</p>${metrics({ 'Queue count': state.waiting.length, 'Undo stack depth': state.undo.length })}<p>${esc(state.output ?? 'No operation has run yet.')}</p>`;
  }
  function apply(lab, action) {
    const session = sessions.get(lab), state = current(lab), type = lab.dataset.s10Lab;
    let result;
    if (type === 'records') result = M.assignField(state, value(lab, 'field'), value(lab, 'field-value'));
    if (type === 'array') result = M.arrayAction(state, action, numeric(lab, 'index'), action === 'write' ? numeric(lab, 'item') : undefined);
    if (type === 'files') result = M.fileAction(state, action === 'open' ? value(lab, 'mode') : action, action === 'write' ? value(lab, 'line-value') : undefined);
    if (type === 'stack') result = M.stackAction(state, action, action === 'push' ? itemValue(lab) : undefined);
    if (type === 'queue') result = M.queueAction(state, action, action === 'enqueue' ? itemValue(lab) : undefined);
    if (type === 'linked') result = M.linkedAction(state, action, numeric(lab, 'position'), action !== 'delete' ? itemValue(lab) : undefined);
    if (type === 'booking') result = M.bookingAction(state, action, action !== 'undo' ? numeric(lab, 'seat') : undefined, action === 'book' ? itemValue(lab, 'name') : undefined);
    if (!result) return;
    if (result.ok) { session.history = M.recordHistory(session.history, { state: result.state, line: result.line, message: result.message }); draw(lab); }
    else { find(lab, 'line').textContent = result.line; tell(lab, result.message, true); }
  }
  function reset(lab) { lab.innerHTML = initial.get(lab); prepare(lab); }
  labs.forEach(lab => {
    try { prepare(lab); } catch (error) { tell(lab, error.message, true); }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.s10-lab [data-s10-action]');
    if (!button || button.disabled) return;
    const lab = button.closest('.s10-lab'), action = button.dataset.s10Action;
    try {
      if (action === 'reset') { reset(lab); return; }
      if (action === 'prepare') { prepare(lab); lab.querySelectorAll('.s10-setup').forEach(details => { details.open = false; }); return; }
      const session = sessions.get(lab);
      if (!session || session.pending) { tell(lab, 'Prepare the edited example before continuing.', true); return; }
      if (action === 'back' || action === 'next') {
        if (session.trace) session.index = Math.max(0, Math.min(session.trace.length - 1, session.index + (action === 'back' ? -1 : 1)));
        else session.history = M.moveHistory(session.history, action);
        draw(lab); return;
      }
      apply(lab, action);
    } catch (error) { tell(lab, error.message, true); }
  });
  document.addEventListener('input', event => {
    const lab = event.target.closest('.s10-lab');
    if (!lab) return;
    if (event.target.closest('.s10-setup')) {
      const session = sessions.get(lab); if (session) session.pending = true;
      lab.querySelectorAll('[data-s10-action]').forEach(button => {
        if (!['prepare', 'reset'].includes(button.dataset.s10Action)) {
          if (!button.disabled) button.dataset.s10OperationDisabled = 'true';
          button.disabled = true;
        }
      });
      tell(lab, 'Example edited. The diagram still shows the prepared data. Select Prepare new example to start a fresh trace.');
    } else {
      tell(lab, 'Request edited; no operation has executed. Predict the result, then select the operation.');
    }
  });
  document.addEventListener('s5:reset', event => {
    if (event.target.matches?.('.s10-lab')) reset(event.target);
    else event.target.querySelectorAll?.('.s10-lab').forEach(reset);
  });
})();
