const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section8-models.js');

async function seed() {
  const { section8Databases } = await import('./course-v3-section8-sql.mjs');
  const example = await import('./course-v3-section8-examples.mjs');
  return { members: section8Databases.library.tables[0].rows, loans: section8Databases.library.tables[1].rows, ...example };
}
const frozen = state => {
  for (const value of Object.values(state)) if (value && typeof value === 'object') frozen(value);
  return Object.freeze(state);
};

test('the library model receives the actual shared SQL fixture without inventing different records', async () => {
  const source = await seed(); const state = M.createLibrary(source);
  assert.deepEqual(state.members.map(row => [row.MemberID, row.MemberName, row.Active ? 'TRUE' : 'FALSE']), source.members);
  assert.deepEqual(state.loans.map(row => [row.LoanID, row.MemberID, row.Fee, row.Returned ? 'TRUE' : 'FALSE']), source.loans);
});

test('copy edits produce inconsistencies, while one shared edit changes every reading view', async () => {
  const original = frozen(M.createRecords(await seed()));
  const changed = M.changeRecordName(original, 'copies', 'Asha Patel', 0);
  assert.equal(changed.consistent, false);
  assert.deepEqual(changed.names, ['Asha Patel', 'Asha', 'Asha']);
  assert.equal(original.copies[0].name, 'Asha');
  const shared = M.changeRecordName(changed.state, 'shared', 'Asha Patel');
  assert.equal(shared.consistent, true);
  assert.deepEqual(shared.names, ['Asha Patel', 'Asha Patel', 'Asha Patel']);
  assert.deepEqual(shared.state.copies, changed.state.copies, 'a shared edit must not silently repair separate files');
  assert.equal(M.changeRecordName(original, 'copies', '').ok, false);
});

test('primary, foreign and delete constraints use the current data and preserve rejected state', async () => {
  const state = frozen(M.createLibrary(await seed()));
  for (const [action, values, code] of [
    ['addMember', { MemberID: 1, MemberName: 'Other' }, 'primary-duplicate'],
    ['addMember', { MemberID: NaN, MemberName: 'Other' }, 'primary-null'],
    ['addLoan', { LoanID: 201, MemberID: 4, Fee: 1 }, 'primary-duplicate'],
    ['addLoan', { LoanID: 206, MemberID: 99, Fee: 1 }, 'foreign-missing'],
    ['addLoan', { LoanID: 206, MemberID: 4, Fee: -1 }, 'domain'],
    ['deleteMember', { MemberID: 1 }, 'foreign-referenced']
  ]) {
    const change = M.changeLibrary(state, action, values);
    assert.equal(change.ok, false); assert.equal(change.code, code); assert.deepEqual(change.state, state);
  }
  const added = M.changeLibrary(state, 'addMember', { MemberID: 5, MemberName: 'Elena' });
  assert.equal(added.ok, true);
  const loan = M.changeLibrary(added.state, 'addLoan', { LoanID: 206, MemberID: 5, Fee: 1.5 });
  assert.equal(loan.ok, true); assert.equal(loan.state.loans.at(-1).Fee, 1.5);
  assert.equal(M.changeLibrary(loan.state, 'deleteMember', { MemberID: 5 }).code, 'foreign-referenced');
  const deleted = M.changeLibrary(state, 'deleteMember', { MemberID: 4 });
  assert.equal(deleted.ok, true);
  assert.equal(M.changeLibrary(deleted.state, 'addLoan', { LoanID: 206, MemberID: 4, Fee: 1 }).code, 'foreign-missing');
});

test('relationship answers respect both directions and historical versus current scope', () => {
  for (const [key, item] of Object.entries(M.relationships)) {
    assert.equal(M.checkRelationship(key, item.answer).correct, true);
    for (const wrong of ['1:1', '1:M', 'M:1', 'M:N'].filter(value => value !== item.answer)) assert.equal(M.checkRelationship(key, wrong).correct, false);
    assert.ok(item.leftRule && item.rightRule && item.link);
  }
  assert.match(M.relationships.copyLoan.example, /active.*separate/);
  assert.match(M.relationships.memberCard.example, /current cards only/);
  assert.match(M.relationships.memberCopy.link, /Loan/);
});

test('normalisation rejects missing fields, constructs all stages and reproduces every original line', async () => {
  const source = await seed(); let state = M.createNormalisation(source);
  for (const task of M.normalisationTasks) {
    const before = M.clone(state);
    const wrong = M.chooseNormalisation(frozen(state), task.expected.slice(1));
    assert.equal(wrong.ok, false); assert.deepEqual(wrong.state, before);
    const correct = M.chooseNormalisation(state, task.expected.slice().reverse());
    assert.equal(correct.ok, true); state = correct.state;
  }
  assert.equal(state.stage, 5);
  const relations = M.normalisedRelations(state);
  assert.deepEqual(relations, source.orderRelations, 'relations must agree with the retained authored example');
  assert.deepEqual(M.reconstructOrders(relations), source.order1NF);
  assert.equal(M.normalisationBack(state).stage, 4);
  const changed = M.clone(relations); changed.OrderLine.rows[0][2] = 7;
  assert.equal(M.reconstructOrders(changed)[0][6], 7, 'reconstruction must join live relations, not return a hard-coded answer');
  changed.Customer.rows = [];
  assert.throws(() => M.reconstructOrders(changed), /Missing relation/);
});

test('metadata changes update schema and dictionary while record edits do not', async () => {
  const state = frozen(M.createMetadata(await seed()));
  const renamed = M.changeMetadata(state, 'rename', 'Asha Patel');
  assert.equal(renamed.ok, true); assert.deepEqual(renamed.state.fields, state.fields);
  const rejected = M.changeMetadata(renamed.state, 'shorten');
  assert.equal(rejected.ok, false); assert.deepEqual(rejected.state, renamed.state);
  const short = M.changeMetadata(state, 'shorten');
  assert.equal(short.ok, true); assert.equal(M.changeMetadata(short.state, 'rename', 'Asha Patel').ok, false);
  const email = M.changeMetadata(state, 'email');
  assert.equal(email.state.fields.length, 4); assert.ok(email.state.rows.every(row => row.Email === null));
  assert.equal(M.changeMetadata(email.state, 'email').ok, false);
});

test('one normalised customer-name update reaches both orders without changing line quantities', async () => {
  const source = await seed(); let state = M.createNormalisation(source);
  assert.equal(M.renameNormalisedCustomer(state, 'C7', 'Amina Patel').ok, false);
  for (const task of M.normalisationTasks) state = M.chooseNormalisation(state, task.expected).state;
  const changed = M.renameNormalisedCustomer(frozen(state), 'C7', 'Amina Patel');
  assert.equal(changed.ok, true);
  const relations = M.normalisedRelations(changed.state);
  assert.deepEqual(relations.Customer.rows, [['C7', 'Amina Patel']]);
  assert.deepEqual(relations.OrderLine, source.orderRelations.OrderLine);
  assert.deepEqual(relations.SalesOrder, source.orderRelations.SalesOrder);
  const rebuilt = M.reconstructOrders(relations);
  assert.ok(rebuilt.every(row => row[2] === 'Amina Patel'));
  assert.deepEqual(rebuilt.map(row => row[6]), source.order1NF.map(row => row[6]));
  assert.deepEqual(M.normalisedRelations(M.normalisationBack(changed.state)).Customer.rows, [['C7', 'Amina']]);
});

test('permissions are checked before data rules; an authorised role still cannot break constraints', async () => {
  const state = frozen(M.createLibrary(await seed()));
  const bad = { LoanID: 201, MemberID: 99, Fee: -2 };
  assert.equal(M.authorisedChange(state, 'reader', 'addLoan', bad).code, 'permission');
  assert.equal(M.authorisedChange(state, 'librarian', 'addLoan', bad).code, 'primary-duplicate');
  const good = { LoanID: 206, MemberID: 4, Fee: 1 };
  assert.equal(M.authorisedChange(state, 'reader', 'addLoan', good).ok, false);
  const success = M.authorisedChange(state, 'librarian', 'addLoan', good);
  assert.equal(success.ok, true);
  assert.equal(M.authorisedChange(success.state, 'librarian', 'addLoan', good).code, 'primary-duplicate');
});

test('backup snapshots stay independent and recovery loses changes after the chosen snapshot', async () => {
  const initial = M.createBackup(await seed());
  assert.equal(M.changeBackup(initial, 'restore').code, 'no-backup');
  let state = M.changeBackup(initial, 'snapshot').state;
  assert.equal(state.backupAt, 1);
  const saved = M.clone(state.backup);
  state = M.changeBackup(state, 'return').state;
  state = M.changeBackup(state, 'add').state;
  assert.deepEqual(state.backup, saved);
  assert.equal(state.live.loans.find(row => row.LoanID === 203).Returned, true);
  state = M.changeBackup(state, 'fail').state;
  assert.equal(state.live, null);
  assert.equal(M.changeBackup(state, 'snapshot').ok, false);
  assert.equal(M.changeBackup(state, 'add').ok, false);
  const restored = M.changeBackup(state, 'restore');
  assert.deepEqual(restored.state.live, saved); assert.equal(restored.state.lost.length, 2);
  assert.match(restored.message, /203/); assert.match(restored.message, /206/);
  assert.equal(restored.state.backupAt, 1);
  let later = M.changeBackup(restored.state, 'return').state;
  later = M.changeBackup(later, 'snapshot').state;
  later = M.changeBackup(later, 'fail').state;
  later = M.changeBackup(later, 'restore').state;
  assert.equal(later.live.loans.find(row => row.LoanID === 203).Returned, true);
  assert.deepEqual(later.lost, []);
});

test('scan and index yield the same rows with honest separate counts and no read on an index miss', async () => {
  const state = frozen(M.createIndex(await seed()));
  for (const key of [201, 203, 205, 999]) {
    const scan = M.lookupIndex(state, key, 'scan'); const indexed = M.lookupIndex(state, key, 'index');
    assert.deepEqual(scan.row, indexed.row);
    assert.equal(scan.rowReads, scan.trace.length);
    assert.equal(indexed.indexComparisons, indexed.trace.filter(step => step.kind === 'index').length);
    assert.equal(indexed.rowReads, key === 999 ? 0 : 1);
  }
  assert.equal(M.lookupIndex(state, 201, 'scan').rowReads, 5);
  const changed = M.updateIndex(state, 205, 209);
  assert.equal(changed.ok, true); assert.equal(M.lookupIndex(changed.state, 205, 'index').row, null);
  assert.equal(M.lookupIndex(changed.state, 209, 'index').row.LoanID, 209);
  assert.equal(M.updateIndex(state, 205, 201).ok, false);
  assert.equal(M.updateIndex(state, 999, 209).ok, false);
  assert.deepEqual(state.entries.map(entry => entry.key), [201, 202, 203, 204, 205]);
});

test('every activity supplies shared fixtures, prediction, reset and live feedback without exposed answers', async () => {
  const { labMarkup } = await import('./course-v3-section8-labs.mjs');
  assert.deepEqual(Object.keys(labMarkup), ['records', 'keys', 'relationships', 'normalisation', 'metadata', 'integrity', 'backup', 'index']);
  for (const [key, html] of Object.entries(labMarkup)) {
    assert.ok(html.includes(`data-s8-lab="${key}"`));
    assert.ok(html.includes('data-s8-action="reset"'));
    assert.ok(html.includes('aria-live="polite"'));
    assert.ok(html.includes('Predict:') || key === 'normalisation');
    assert.ok(html.includes('data-s8-seed'));
    assert.doesNotMatch(html, /<details\b[^>]*\sopen(?:\s|>)/);
  }
});
