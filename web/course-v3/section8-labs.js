/* Click-operated experiments backed by S8Models and generated shared fixtures. */
(() => {
  'use strict';
  const M = globalThis.S8Models;
  if (!M) return;
  const labs = [...document.querySelectorAll('[data-s8-lab]')];
  const states = new WeakMap();
  const initial = new Map(labs.map(lab => [lab, lab.innerHTML]));
  const seeds = new WeakMap(labs.map(lab => [lab, JSON.parse(lab.querySelector('[data-s8-seed]').textContent)]));
  const find = (lab, role) => lab.querySelector(`[data-s8-role="${role}"]`);
  const val = (lab, role) => find(lab, role).value;
  const num = (lab, role) => val(lab, role).trim() === '' ? NaN : Number(val(lab, role));
  const esc = value => String(value === null ? 'NULL' : typeof value === 'boolean' ? value ? 'TRUE' : 'FALSE' : value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function table(title, headers, rows, highlighted = null) {
    return `<div class="s8-table-wrap" tabindex="0" role="region" aria-label="${esc(title)}"><table><caption>${esc(title)}</caption><thead><tr>${headers.map(header => `<th scope="col">${esc(header)}</th>`).join('')}</tr></thead><tbody>${rows.map((row, index) => `<tr${highlighted === index ? ' class="is-current" aria-current="true"' : ''}>${row.map((cell, i) => i ? `<td>${esc(cell)}</td>` : `<th scope="row">${esc(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table>${!rows.length ? '<p>No records.</p>' : ''}</div>`;
  }
  const memberTable = state => table('Member', ['MemberID (PK)', 'MemberName', 'Active'], state.members.map(row => [row.MemberID, row.MemberName, row.Active]));
  const loanTable = (state, title = 'Loan') => table(title, ['LoanID (PK)', 'MemberID (FK)', 'Fee', 'Returned'], state.loans.map(row => [row.LoanID, row.MemberID, row.Fee, row.Returned]));
  const say = (lab, message, ok = null) => {
    const status = find(lab, 'status'); status.textContent = message;
    if (ok === null) delete status.dataset.result;
    else status.dataset.result = ok ? 'accepted' : 'rejected';
  };
  const output = (lab, html) => { find(lab, 'display').innerHTML = html; };
  function initialise(lab) {
    const seed = seeds.get(lab); const kind = lab.dataset.s8Lab;
    const create = { records: M.createRecords, keys: M.createLibrary, normalisation: M.createNormalisation, metadata: M.createMetadata, integrity: M.createLibrary, backup: M.createBackup, index: M.createIndex }[kind];
    states.set(lab, create ? create(seed) : {});
    draw(lab);
  }
  function reset(lab) {
    lab.innerHTML = initial.get(lab); initialise(lab); say(lab, 'Initial data and controls restored. Predict the next result.');
  }
  function draw(lab) {
    const state = states.get(lab); const kind = lab.dataset.s8Lab;
    if (kind === 'keys' || kind === 'integrity') output(lab, `<div class="s8-lab-grid">${memberTable(state)}${loanTable(state)}</div>`);
    if (kind === 'keys') for (const operation of ['member', 'loan', 'delete']) find(lab, `key-${operation}-fields`).hidden = val(lab, 'key-operation') !== operation;
    if (kind === 'records') {
      output(lab, `<div class="s8-lab-grid">${table('Three separately stored copies', ['Place', 'MemberID', 'Stored MemberName'], state.copies.map(row => [row.place, state.memberID, row.name]))}${table('Three views of one shared Member record', ['View', 'MemberID reference', 'Read MemberName'], state.copies.map(row => [row.place, state.memberID, state.sharedName]))}</div>`);
      find(lab, 'copy').disabled = val(lab, 'storage') === 'shared';
    }
    if (kind === 'relationships') {
      const item = M.relationships[val(lab, 'relationship')];
      find(lab, 'rules').innerHTML = `<div class="s8-lab-grid"><div class="s8-card"><h4>One ${esc(item.left)} → how many ${esc(item.right)}?</h4><p>${esc(item.leftRule)}</p></div><div class="s8-card"><h4>One ${esc(item.right)} → how many ${esc(item.left)}?</h4><p>${esc(item.rightRule)}</p></div></div>`;
    }
    if (kind === 'normalisation') drawNormalisation(lab);
    if (kind === 'metadata') {
      const fields = state.fields.map(field => field.name);
      output(lab, `<p><strong>Table structure:</strong> Member(${state.fields.map(field => `${esc(field.name)} ${esc(field.type)}${field.length ? `(${field.length})` : ''}`).join(', ')})</p><div class="s8-lab-grid">${table('Stored Member records', fields, state.rows.map(row => fields.map(field => row[field])))}${table('Data dictionary: definitions about Member', ['Field', 'Type', 'Maximum characters', 'Rule'], state.fields.map(field => [field.name, field.type, field.length ?? 'Not a text length', field.constraint]))}</div>`);
    }
    if (kind === 'backup') {
      output(lab, `<p><strong>Current event:</strong> T${state.time}. <strong>Saved snapshot:</strong> ${state.backup ? `T${state.backupAt}` : 'none'}.</p><div class="s8-lab-grid">${state.failed ? '<div class="s8-card"><h4>Live database</h4><p>Unavailable after the simulated failure.</p></div>' : loanTable(state.live, 'Live Loan records')}${state.backup ? loanTable(state.backup, `Backup Loan records saved at T${state.backupAt}`) : '<div class="s8-card"><h4>Backup</h4><p>No snapshot has been created.</p></div>'}</div><details class="s8-history"><summary>Events so far</summary><ol>${state.history.map(item => `<li>${esc(item)}</li>`).join('')}</ol></details>`);
      for (const action of ['snapshot', 'return', 'add', 'fail']) lab.querySelector(`[data-s8-action="backup-${action}"]`).disabled = state.failed;
    }
    if (kind === 'index') drawIndex(lab);
  }
  function drawNormalisation(lab) {
    const state = states.get(lab); const stage = state.stage; const task = M.normalisationTasks[stage];
    find(lab, 'normal-task').innerHTML = task ? `<p class="s8-step-label">Decision ${stage + 1} of ${M.normalisationTasks.length}</p><h4>${esc(task.title)}</h4><p><strong>Predict:</strong> ${esc(task.prompt)}</p>` : '<h4>3NF: check that every original fact remains available</h4><p>Follow OrderLine → SalesOrder → Customer and OrderLine → Product. Predict how many full order lines will be reconstructed.</p>';
    find(lab, 'fields').hidden = !task;
    find(lab, 'normal-review').hidden = Boolean(task);
    lab.querySelector('[data-s8-action="normal-submit"]').hidden = !task;
    lab.querySelector('[data-s8-action="normal-reconstruct"]').hidden = Boolean(task);
    lab.querySelector('[data-s8-action="normal-previous"]').disabled = stage === 0;
    const original = table('Original UNF orders', ['OrderID', 'CustomerID', 'CustomerName', 'Products: repeated (ID, name, price, quantity)'], state.unf);
    const relations = M.normalisedRelations(state);
    const relationTable = name => table(name === 'SalesOrder2NF' ? 'SalesOrder (2NF)' : name, relations[name].headers, relations[name].rows);
    let view = original;
    if (stage > 0) {
      view = `<details><summary>Keep the original orders in view</summary>${original}</details>`;
      if (stage <= 2) view += table(stage === 1 ? '1NF: one product occurrence per row' : '1NF: (OrderID, ProductID) is the composite key', state.headers.map(field => stage === 2 && ['OrderID', 'ProductID'].includes(field) ? `${field} (PK)` : field), state.rows);
      if (stage === 3) view += relationTable('Product') + table('Remaining order lines: an order dependency still remains', ['OrderID (PK)', 'CustomerID', 'CustomerName', 'ProductID (PK, FK)', 'Quantity'], state.rows.map(row => [row[0], row[1], row[2], row[3], row[6]]));
      if (stage === 4) view += `<div class="s8-lab-grid">${['SalesOrder2NF', 'Product', 'OrderLine'].map(relationTable).join('')}</div><p><strong>Remaining dependency:</strong> OrderID → CustomerID → CustomerName. CustomerName still depends on another non-key field in SalesOrder.</p>`;
      if (stage === 5) view += `<div class="s8-lab-grid">${['Customer', 'SalesOrder', 'Product', 'OrderLine'].map(relationTable).join('')}</div><p><strong>Links retained:</strong> SalesOrder.CustomerID → Customer; OrderLine.OrderID → SalesOrder; OrderLine.ProductID → Product. Both OrderLine identifiers together form its primary key.</p>`;
    }
    output(lab, view);
  }
  function drawIndex(lab) {
    const state = states.get(lab); const current = state.search?.trace[state.revealed - 1];
    output(lab, `<div class="s8-lab-grid">${table('Physical record slots', ['Slot', 'LoanID', 'MemberID', 'Fee', 'Returned'], state.rows.map(row => [row.slot, row.LoanID, row.MemberID, row.Fee, row.Returned]), current?.kind === 'record' ? state.rows.findIndex(row => row.slot === current.slot) : null)}${table('Sorted LoanID index', ['Key', 'Pointer to slot'], state.entries.map(entry => [entry.key, entry.slot]), current?.kind === 'index' ? state.entries.findIndex(entry => entry.key === current.key) : null)}</div>`);
    const trace = find(lab, 'index-trace');
    if (!state.search) { trace.innerHTML = ''; lab.querySelector('[data-s8-action="index-step"]').disabled = true; return; }
    trace.hidden = false;
    const revealed = state.search.trace.slice(0, state.revealed);
    const complete = state.revealed === state.search.trace.length;
    trace.innerHTML = `${revealed.length ? `<p><strong>Access ${revealed.length}:</strong> ${esc(revealed.at(-1).text)}</p>` : ''}${revealed.length > 1 ? `<details><summary>Review earlier accesses</summary><ol>${revealed.slice(0, -1).map(access => `<li>${esc(access.text)}</li>`).join('')}</ol></details>` : ''}${complete ? `<p><strong>${state.search.row ? `Found Loan ${state.search.row.LoanID}.` : 'No matching record.'}</strong> ${state.search.indexComparisons} index-key comparisons; ${state.search.rowReads} logical record reads.${state.lookupMode === 'scan' ? ` The scan compared ${state.search.keyComparisons} record keys.` : ''}</p>` : '<p>Predict the next access before revealing it.</p>'}`;
    lab.querySelector('[data-s8-action="index-step"]').disabled = complete;
  }
  function apply(lab, change) {
    states.set(lab, change.state); draw(lab); say(lab, change.message, change.ok);
  }
  const integrityRequests = {
    valid: ['addLoan', { LoanID: 206, MemberID: 4, Fee: 1 }],
    duplicate: ['addLoan', { LoanID: 201, MemberID: 4, Fee: 1 }],
    missing: ['addLoan', { LoanID: 207, MemberID: 99, Fee: 1 }],
    negative: ['addLoan', { LoanID: 208, MemberID: 4, Fee: -2 }],
    return: ['returnLoan', { LoanID: 203 }]
  };
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-s8-action]');
    const lab = button?.closest('[data-s8-lab]');
    if (!initial.has(lab)) return;
    const action = button.dataset.s8Action; const state = states.get(lab);
    if (action === 'reset') { reset(lab); return; }
    if (action === 'write-name') apply(lab, M.changeRecordName(state, val(lab, 'storage'), val(lab, 'name'), num(lab, 'copy')));
    if (action === 'add-member') apply(lab, M.changeLibrary(state, 'addMember', { MemberID: num(lab, 'member-id'), MemberName: val(lab, 'member-name') }));
    if (action === 'add-loan') apply(lab, M.changeLibrary(state, 'addLoan', { LoanID: num(lab, 'loan-id'), MemberID: num(lab, 'loan-member'), Fee: num(lab, 'fee') }));
    if (action === 'delete-member') apply(lab, M.changeLibrary(state, 'deleteMember', { MemberID: num(lab, 'delete-member') }));
    if (action === 'relationship-answer') {
      const result = M.checkRelationship(val(lab, 'relationship'), button.dataset.choice);
      lab.querySelectorAll('[data-s8-action="relationship-answer"]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      const display = find(lab, 'relationship-result'); display.hidden = false;
      display.innerHTML = `<p><strong>${esc(result.left)} ${esc(result.answer)} ${esc(result.right)}</strong></p><p>${esc(result.link)}</p><p>${esc(result.example)}</p>`;
      say(lab, result.message, result.correct);
    }
    if (action === 'normal-submit') {
      const fields = [...lab.querySelectorAll('[data-s8-field]:checked')].map(item => item.value);
      const result = M.chooseNormalisation(state, fields); apply(lab, result);
      if (result.ok) lab.querySelectorAll('[data-s8-field]').forEach(item => { item.checked = false; });
    }
    if (action === 'normal-previous') {
      states.set(lab, M.normalisationBack(state)); draw(lab);
      find(lab, 'reconstruction').hidden = true;
      lab.querySelectorAll('[data-s8-field]').forEach(item => { item.checked = false; });
      say(lab, 'Returned one decision. The tables now show that earlier state.');
    }
    if (action === 'normal-reconstruct') {
      const rows = M.reconstructOrders(M.normalisedRelations(state));
      const original = state.rows.map(row => { const expected = [...row]; expected[2] = state.customerNames?.[row[1]] ?? row[2]; return JSON.stringify(expected); }).sort();
      const rebuilt = rows.map(row => JSON.stringify(row)).sort();
      const match = JSON.stringify(original) === JSON.stringify(rebuilt);
      const display = find(lab, 'reconstruction'); display.hidden = false;
      display.innerHTML = table('Reconstructed rows, joined from the four 3NF relations', state.headers, rows);
      say(lab, match ? `All ${rows.length} original order lines were reconstructed${state.customerNames ? ', with the explicitly updated customer name' : ' with every value unchanged'}. The links preserve the associations without repeating customer and product descriptions in OrderLine.` : 'The reconstructed values differ from the expected lines. Inspect the links before continuing.', match);
    }
    if (action === 'normal-inspect') {
      const [orderID, productID] = val(lab, 'normal-line').split('|');
      const rows = M.reconstructOrders(M.normalisedRelations(state));
      const row = rows.find(item => String(item[0]) === orderID && item[3] === productID);
      const display = find(lab, 'reconstruction'); display.hidden = false;
      display.innerHTML = `<p>OrderLine (${esc(orderID)}, ${esc(productID)}) → SalesOrder ${esc(orderID)} → Customer ${esc(row[1])}; ProductID ${esc(productID)} → Product.</p>${table('One reconstructed order line', state.headers, [row])}`;
      say(lab, `Order ${orderID}, product ${productID}: recovered customer ${row[2]}, product ${row[4]}, unit price ${row[5]} and quantity ${row[6]} by following the stored references.`);
    }
    if (action === 'normal-rename') {
      const changed = M.renameNormalisedCustomer(state, 'C7', val(lab, 'normal-name'));
      apply(lab, changed); find(lab, 'reconstruction').hidden = true;
    }
    if (action === 'metadata-name') apply(lab, M.changeMetadata(state, 'rename', val(lab, 'new-name')));
    if (action === 'metadata-email') apply(lab, M.changeMetadata(state, 'email'));
    if (action === 'metadata-length') apply(lab, M.changeMetadata(state, 'shorten'));
    if (action === 'integrity-apply') {
      const [operation, values] = integrityRequests[val(lab, 'request')];
      apply(lab, M.authorisedChange(state, val(lab, 'role'), operation, values));
    }
    if (action.startsWith('backup-')) apply(lab, M.changeBackup(state, action.slice(7)));
    if (action === 'index-start') {
      const target = num(lab, 'target-key');
      if (!Number.isSafeInteger(target)) { say(lab, 'Enter a whole-number LoanID before preparing the search.', false); return; }
      state.lookupMode = val(lab, 'lookup'); state.search = M.lookupIndex(state, target, state.lookupMode); state.revealed = 0;
      drawIndex(lab); say(lab, 'Search prepared. Predict which key or record will be inspected first.');
    }
    if (action === 'index-step' && state.search) {
      state.revealed = Math.min(state.search.trace.length, state.revealed + 1); drawIndex(lab);
      say(lab, state.search.trace[state.revealed - 1].text);
    }
    if (action === 'index-update') {
      const result = M.updateIndex(state, num(lab, 'old-key'), num(lab, 'new-key'));
      if (result.ok) { delete result.state.search; delete result.state.revealed; }
      apply(lab, result);
    }
  });
  document.addEventListener('change', event => {
    const lab = event.target.closest('[data-s8-lab]');
    if (!initial.has(lab)) return;
    if (lab.dataset.s8Lab === 'relationships') {
      draw(lab); find(lab, 'relationship-result').hidden = true;
      lab.querySelectorAll('[data-s8-action="relationship-answer"]').forEach(button => button.setAttribute('aria-pressed', 'false'));
    }
    if (lab.dataset.s8Lab === 'records' || lab.dataset.s8Lab === 'keys') draw(lab);
    if (lab.dataset.s8Lab === 'index' && ['target-key', 'lookup'].includes(event.target.dataset.s8Role)) {
      delete states.get(lab).search; drawIndex(lab);
    }
    say(lab, 'Conditions changed. Predict the result, then use an action to test it.');
  });
  function resetWithin(event) {
    for (const lab of labs) if (event.target === lab || event.target.contains?.(lab)) reset(lab);
  }
  document.addEventListener('s8:reset', resetWithin);
  document.addEventListener('s5:reset', resetWithin);
  function hideFeedback() {
    for (const lab of labs) {
      for (const role of ['relationship-result', 'reconstruction']) {
        const result = find(lab, role); if (result) result.hidden = true;
      }
      if (lab.dataset.s8Lab === 'index') { delete states.get(lab).search; drawIndex(lab); }
      say(lab, 'Inspect the current data and predict the next result. Reset experiment restores the starting data.');
    }
  }
  document.addEventListener('s8:hide', hideFeedback);
  document.addEventListener('s5:leave', hideFeedback);
  labs.forEach(initialise);
})();
