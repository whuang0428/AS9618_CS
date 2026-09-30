/* Exact classroom models. SQL execution is provided separately by the real SQL engine. */
const S8Models = (() => {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const sameSet = (a, b) => a.length === b.length && new Set(a).size === a.length && a.every(value => b.includes(value));
  const whole = value => Number.isSafeInteger(value) && value > 0;
  const result = (state, ok, code, message) => ({ state, ok, code, message });
  const bool = value => value === true || value === 'TRUE' || value === 1;

  function createLibrary(seed) {
    return {
      members: seed.members.map(([MemberID, MemberName, Active]) => ({ MemberID, MemberName, Active: bool(Active) })),
      loans: seed.loans.map(([LoanID, MemberID, Fee, Returned]) => ({ LoanID, MemberID, Fee, Returned: bool(Returned) }))
    };
  }
  function changeLibrary(state, action, values) {
    const next = clone(state);
    const reject = (code, message) => result(state, false, code, `${message} No records changed.`);
    if (action === 'addMember') {
      const { MemberID, MemberName } = values;
      if (!whole(MemberID)) return reject('primary-null', 'MemberID must be a positive whole number in this example.');
      if (next.members.some(row => row.MemberID === MemberID)) return reject('primary-duplicate', `MemberID ${MemberID} already identifies a member. A primary key must be unique.`);
      if (typeof MemberName !== 'string' || !MemberName.trim() || MemberName.length > 40) return reject('name', 'MemberName must contain 1–40 characters in this example.');
      next.members.push({ MemberID, MemberName: MemberName.trim(), Active: true });
      return result(next, true, 'inserted', `Member ${MemberID} added. The new primary key is unique and present.`);
    }
    if (action === 'addLoan') {
      const { LoanID, MemberID, Fee } = values;
      if (!whole(LoanID)) return reject('primary-null', 'LoanID must be a positive whole number in this example.');
      if (next.loans.some(row => row.LoanID === LoanID)) return reject('primary-duplicate', `LoanID ${LoanID} already exists. This would duplicate the primary key.`);
      if (!next.members.some(row => row.MemberID === MemberID)) return reject('foreign-missing', `MemberID ${MemberID} has no matching Member record. This loan would break referential integrity.`);
      if (!Number.isFinite(Fee) || Fee < 0) return reject('domain', 'The stated fee rule requires a non-negative number.');
      next.loans.push({ LoanID, MemberID, Fee, Returned: false });
      return result(next, true, 'inserted', `Loan ${LoanID} added: its key is new, Member ${MemberID} exists and the fee meets the rule.`);
    }
    if (action === 'deleteMember') {
      const references = next.loans.filter(row => row.MemberID === values.MemberID);
      if (references.length) return reject('foreign-referenced', `Cannot delete Member ${values.MemberID}: ${references.length} loan record${references.length === 1 ? '' : 's'} still refer to this member. This example uses a restrict-delete rule.`);
      const before = next.members.length;
      next.members = next.members.filter(row => row.MemberID !== values.MemberID);
      if (next.members.length === before) return reject('not-found', `Member ${values.MemberID} does not exist.`);
      return result(next, true, 'deleted', `Member ${values.MemberID} deleted. No Loan record referred to this key.`);
    }
    if (action === 'returnLoan') {
      const loan = next.loans.find(row => row.LoanID === values.LoanID);
      if (!loan) return reject('not-found', `Loan ${values.LoanID} does not exist.`);
      if (loan.Returned) return reject('unchanged', `Loan ${values.LoanID} is already returned.`);
      loan.Returned = true;
      return result(next, true, 'updated', `Loan ${values.LoanID} is now returned. Its MemberID and the other loans are unchanged.`);
    }
    throw new RangeError(`Unknown library operation: ${action}`);
  }

  function createRecords(seed) {
    const member = seed.members[0];
    return { memberID: member[0], copies: ['Borrowing desk', 'Membership office', 'Reminder list'].map(place => ({ place, name: member[1] })), sharedName: member[1] };
  }
  function changeRecordName(state, mode, name, copyIndex = 0) {
    if (!name.trim() || name.length > 40) return result(state, false, 'name', 'Enter a name containing 1–40 characters.');
    if (!['copies', 'shared'].includes(mode)) throw new RangeError('Unknown storage model.');
    const next = clone(state);
    if (mode === 'copies') {
      if (!next.copies[copyIndex]) throw new RangeError('Unknown copy.');
      next.copies[copyIndex].name = name.trim();
    } else next.sharedName = name.trim();
    const names = mode === 'copies' ? next.copies.map(row => row.name) : next.copies.map(() => next.sharedName);
    const consistent = new Set(names).size === 1;
    return { state: next, ok: true, consistent, names, message: mode === 'shared'
      ? `One stored MemberName changed. All three views now read “${next.sharedName}” through MemberID ${next.memberID}.`
      : consistent ? 'The three separately stored names agree. Each copy still needs its own update when the name changes.' : 'The same member now has conflicting stored names. Updating one copy did not update the other copies.' };
  }

  const relationships = {
    memberLoan: { left: 'Member', right: 'Loan', answer: '1:M', leftRule: 'A member may have zero, one or many loan records over time.', rightRule: 'Each loan record belongs to exactly one member.', example: 'Asha appears once in Member but has Loans 201 and 202. MemberID is stored in each Loan record.', link: 'Member.MemberID (PK) → Loan.MemberID (FK)' },
    bookCopy: { left: 'Book', right: 'BookCopy', answer: '1:M', leftRule: 'A catalogue book title may have zero, one or many physical copies.', rightRule: 'Each physical copy belongs to exactly one catalogue book title.', example: 'Book B1, Atlas, has copies C11 and C12. Each copy has its own barcode.', link: 'Book.BookID (PK) → BookCopy.BookID (FK)' },
    copyLoan: { left: 'BookCopy', right: 'Loan', answer: '1:M', leftRule: 'One copy can appear in many different loan records over time.', rightRule: 'Each loan record describes exactly one physical copy.', example: 'Copy C11 can be borrowed, returned and borrowed again. At most one loan for that copy may be active at once; that rule is separate from its historical one-to-many relationship.', link: 'BookCopy.CopyID (PK) → Loan.CopyID (FK)' },
    memberCard: { left: 'Member', right: 'MemberCard', answer: '1:1', leftRule: 'Each enrolled member has exactly one current membership card.', rightRule: 'Each current membership card is assigned to exactly one member.', example: 'This model stores current cards only. A lost card is replaced, so the old card is removed from this current-card relation.', link: 'MemberCard.MemberID is both FK and UNIQUE; the stated rule also requires a card for every enrolled member.' },
    memberCopy: { left: 'Member', right: 'BookCopy', answer: 'M:N', leftRule: 'A member can borrow many different copies over time.', rightRule: 'A copy can be borrowed by many different members over time.', example: 'Loan is the linking entity. Every Loan records one MemberID and one CopyID, so the many-to-many history becomes two one-to-many links.', link: 'Member 1 → many Loan; BookCopy 1 → many Loan' }
  };
  function checkRelationship(key, choice) {
    const item = relationships[key];
    if (!item || !['1:1', '1:M', 'M:1', 'M:N'].includes(choice)) throw new RangeError('Unknown relationship or choice.');
    return { ...item, correct: choice === item.answer, message: choice === item.answer
      ? `${choice} is correct for ${item.left} → ${item.right}. ${item.example}`
      : `${choice} does not fit both stated directions. Read how many ${item.right} records one ${item.left} can have, then reverse the question. The relationship is ${item.answer}. ${item.example}` };
  }

  const orderFields = ['OrderID', 'CustomerID', 'CustomerName', 'ProductID', 'ProductName', 'UnitPrice', 'Quantity'];
  const normalisationTasks = [
    { title: 'UNF → 1NF: expand the repeating group', prompt: 'Select every field inside one repeated product group. Keep the order and customer facts on each new line.', expected: ['ProductID', 'ProductName', 'UnitPrice', 'Quantity'], why: 'Each product occurrence becomes its own row. Quantity belongs to that occurrence; splitting only the product name would lose which quantity belongs to which product.' },
    { title: 'Identify the whole key', prompt: 'Select the smallest combination that identifies an order line. Business rule: a product appears at most once in an order, but can appear in other orders.', expected: ['OrderID', 'ProductID'], why: 'OrderID alone repeats for the products in order 501. ProductID alone repeats in different orders. The pair identifies one line under the stated rule.' },
    { title: '1NF → 2NF: move product facts', prompt: 'Select the fields for Product: its identifier and the facts that depend on ProductID alone. The stated model uses one fixed current price per product.', expected: ['ProductID', 'ProductName', 'UnitPrice'], why: 'ProductName and UnitPrice depend on ProductID alone, part of the composite order-line key. Keep ProductID in OrderLine as a foreign key.' },
    { title: 'Complete 2NF: move order facts', prompt: 'Select the fields for SalesOrder: its identifier and the customer facts that depend on OrderID alone. Keep the whole order-line key and Quantity in OrderLine.', expected: ['OrderID', 'CustomerID', 'CustomerName'], why: 'CustomerID and CustomerName depend on OrderID alone. OrderLine now contains (OrderID, ProductID, Quantity); Quantity depends on the whole pair.' },
    { title: '2NF → 3NF: separate customer facts', prompt: 'Select the Customer fields. Keep CustomerID in SalesOrder so each order can still identify its customer.', expected: ['CustomerID', 'CustomerName'], why: 'OrderID determines CustomerID, which determines CustomerName. Moving the customer name removes this transitive dependency from SalesOrder.' }
  ];
  function createNormalisation(seed) {
    return { stage: 0, headers: clone(seed.orderHeaders), rows: clone(seed.order1NF), unf: clone(seed.unnormalisedOrders) };
  }
  function chooseNormalisation(state, fields) {
    const task = normalisationTasks[state.stage];
    if (!task) return result(state, false, 'complete', 'The relations are in 3NF. Reconstruct the original lines to check that the facts remain available.');
    if (!sameSet(fields, task.expected)) return result(state, false, 'selection', `That field selection does not satisfy this step. ${task.why} Try again; no tables changed.`);
    return result({ ...clone(state), stage: state.stage + 1 }, true, 'advanced', task.why);
  }
  function normalisationBack(state) {
    const previous = { ...clone(state), stage: Math.max(0, state.stage - 1) };
    delete previous.customerNames;
    return previous;
  }
  function renameNormalisedCustomer(state, customerID, name) {
    if (state.stage !== 5) return result(state, false, 'stage', 'Complete the Customer relation before changing its stored name.');
    if (!state.rows.some(row => row[1] === customerID)) return result(state, false, 'customer', 'That customer does not exist. No data changed.');
    if (!name.trim() || name.length > 40) return result(state, false, 'name', 'Enter a name containing 1–40 characters.');
    const next = clone(state); next.customerNames = { ...(next.customerNames ?? {}), [customerID]: name.trim() };
    const affected = new Set(state.rows.filter(row => row[1] === customerID).map(row => row[0])).size;
    return result(next, true, 'renamed', `Changed Customer ${customerID} once. Its ${affected} order${affected === 1 ? '' : 's'} still use the same CustomerID. Reconstruct a line from each order to read the updated name.`);
  }
  function project(rows, columns) {
    const seen = new Set();
    return rows.map(row => columns.map(column => row[column])).filter(row => {
      const key = JSON.stringify(row);
      if (seen.has(key)) return false;
      seen.add(key); return true;
    });
  }
  function normalisedRelations(state) {
    return {
      Product: { headers: ['ProductID (PK)', 'ProductName', 'UnitPrice'], rows: project(state.rows, [3, 4, 5]) },
      SalesOrder2NF: { headers: ['OrderID (PK)', 'CustomerID', 'CustomerName'], rows: project(state.rows, [0, 1, 2]) },
      OrderLine: { headers: ['OrderID (PK, FK)', 'ProductID (PK, FK)', 'Quantity'], rows: project(state.rows, [0, 3, 6]) },
      SalesOrder: { headers: ['OrderID (PK)', 'CustomerID (FK)'], rows: project(state.rows, [0, 1]) },
      Customer: { headers: ['CustomerID (PK)', 'CustomerName'], rows: project(state.rows, [1, 2]).map(([id, name]) => [id, state.customerNames?.[id] ?? name]) }
    };
  }
  function reconstructOrders(relations) {
    return relations.OrderLine.rows.map(([orderID, productID, quantity]) => {
      const order = relations.SalesOrder.rows.find(row => row[0] === orderID);
      const product = relations.Product.rows.find(row => row[0] === productID);
      const customer = order && relations.Customer.rows.find(row => row[0] === order[1]);
      if (!order || !product || !customer) throw new RangeError(`Missing relation for order ${orderID}, product ${productID}.`);
      return [orderID, customer[0], customer[1], productID, product[1], product[2], quantity];
    });
  }

  function createMetadata(seed) {
    return { fields: [
      { name: 'MemberID', type: 'INTEGER', length: null, constraint: 'PRIMARY KEY; positive in this example' },
      { name: 'MemberName', type: 'VARCHAR', length: 40, constraint: 'Required in this example' },
      { name: 'Active', type: 'BOOLEAN', length: null, constraint: 'TRUE or FALSE' }
    ], rows: createLibrary(seed).members };
  }
  function changeMetadata(state, action, value) {
    const next = clone(state);
    if (action === 'rename') {
      const max = next.fields.find(field => field.name === 'MemberName').length;
      if (!value.trim() || value.length > max) return result(state, false, 'length', `The current MemberName definition allows 1–${max} characters. No record changed.`);
      next.rows[0].MemberName = value.trim();
      return result(next, true, 'data', 'A stored name changed. Field names, types and length rules in the dictionary did not change.');
    }
    if (action === 'email') {
      if (next.fields.some(field => field.name === 'Email')) return result(state, false, 'exists', 'Email is already defined. No extra column was added.');
      next.fields.push({ name: 'Email', type: 'VARCHAR', length: 80, constraint: 'Optional' });
      next.rows.forEach(row => { row.Email = null; });
      return result(next, true, 'structure', 'Email was added to the table definition and dictionary. Existing records have NULL for Email until a value is supplied.');
    }
    if (action === 'shorten') {
      if (next.rows.some(row => row.MemberName.length > 4)) return result(state, false, 'existing-data', 'The proposed length 4 would reject an existing stored name. This model rejects the structure change; the data and dictionary are unchanged.');
      next.fields.find(field => field.name === 'MemberName').length = 4;
      return result(next, true, 'structure', 'The allowed MemberName length is now 4. Existing values fit. Try entering a longer name next.');
    }
    throw new RangeError('Unknown metadata operation.');
  }
  function authorisedChange(state, role, action, values) {
    if (!['reader', 'librarian'].includes(role)) throw new RangeError('Unknown role.');
    if (role === 'reader') return result(state, false, 'permission', 'Access denied: a reader can view records but cannot change them. No write or integrity check was performed.');
    return changeLibrary(state, action, values);
  }

  function createBackup(seed) { return { live: createLibrary(seed), backup: null, time: 0, backupAt: null, failed: false, beforeFailure: null, history: ['T0: initial library records'], lost: [] }; }
  function changeBackup(state, action) {
    const next = clone(state);
    if (action === 'snapshot') {
      if (next.failed) return result(state, false, 'failed', 'The live data are unavailable. Restore the existing backup before making another snapshot.');
      next.time += 1; next.backup = clone(next.live); next.backupAt = next.time;
      next.history.push(`T${next.time}: copied the live records into the backup`);
      return result(next, true, 'snapshot', `Backup created at T${next.backupAt}. Later changes will not update this snapshot automatically.`);
    }
    if (action === 'fail') {
      if (next.failed) return result(state, false, 'failed', 'The live data are already unavailable.');
      next.time += 1; next.beforeFailure = clone(next.live); next.live = null; next.failed = true;
      next.history.push(`T${next.time}: simulated failure; live records unavailable`);
      return result(next, true, 'failed', 'The live records are unavailable. Predict which earlier state the saved snapshot can restore.');
    }
    if (action === 'restore') {
      if (!next.backup) return result(state, false, 'no-backup', 'There is no saved snapshot. This model has no backup from which to restore the live records.');
      const latest = next.failed ? next.beforeFailure : next.live;
      next.lost = [];
      for (const loan of latest.loans) {
        const saved = next.backup.loans.find(row => row.LoanID === loan.LoanID);
        if (!saved) next.lost.push(`Loan ${loan.LoanID}, added after the snapshot, is absent.`);
        else if (saved.Returned !== loan.Returned) next.lost.push(`Loan ${loan.LoanID}: Returned reverts from ${loan.Returned ? 'TRUE' : 'FALSE'} to ${saved.Returned ? 'TRUE' : 'FALSE'}.`);
      }
      next.time += 1; next.live = clone(next.backup); next.failed = false;
      next.history.push(`T${next.time}: restored the snapshot from T${next.backupAt}`);
      return result(next, true, 'restored', `Restored the records saved at T${next.backupAt}. ${next.lost.length ? next.lost.join(' ') : 'No later record changes were lost.'} No transaction log is available in this model.`);
    }
    if (next.failed) return result(state, false, 'failed', 'The live data are unavailable. A write cannot proceed.');
    const operation = action === 'return' ? changeLibrary(next.live, 'returnLoan', { LoanID: 203 })
      : action === 'add' ? changeLibrary(next.live, 'addLoan', { LoanID: 206, MemberID: 4, Fee: 1 }) : null;
    if (!operation) throw new RangeError('Unknown backup operation.');
    if (!operation.ok) return result(state, false, operation.code, operation.message);
    next.live = operation.state; next.time += 1;
    next.history.push(`T${next.time}: ${operation.message}`);
    return result(next, true, 'changed', `${operation.message} The backup ${next.backup ? `still contains its T${next.backupAt} state` : 'has not been created'}.`);
  }

  function createIndex(seed) {
    const source = createLibrary(seed).loans;
    // Reordering physical slots changes no Loan facts; it makes access paths visible.
    const rows = [...source.slice().reverse()].map((loan, index) => ({ ...loan, slot: index + 1 }));
    return { rows, entries: rows.map(row => ({ key: row.LoanID, slot: row.slot })).sort((a, b) => a.key - b.key) };
  }
  function lookupIndex(state, target, mode) {
    if (!Number.isSafeInteger(target)) throw new RangeError('Use a whole-number LoanID.');
    const trace = [];
    if (mode === 'scan') {
      let row = null;
      for (const candidate of state.rows) {
        trace.push({ kind: 'record', slot: candidate.slot, key: candidate.LoanID, text: `Read record slot ${candidate.slot}: LoanID ${candidate.LoanID}${candidate.LoanID === target ? ' matches.' : ' does not match.'}` });
        if (candidate.LoanID === target) { row = candidate; break; }
      }
      return { row: row ? clone(row) : null, trace, keyComparisons: trace.length, rowReads: trace.length, indexComparisons: 0 };
    }
    if (mode !== 'index') throw new RangeError('Unknown lookup mode.');
    let low = 0; let high = state.entries.length - 1; let found = null;
    while (low <= high) {
      const middle = Math.floor((low + high) / 2); const entry = state.entries[middle];
      trace.push({ kind: 'index', key: entry.key, slot: entry.slot, text: `Compare index key ${entry.key} with ${target}: ${entry.key === target ? 'match; follow its record pointer.' : entry.key < target ? 'search the higher half.' : 'search the lower half.'}` });
      if (entry.key === target) { found = entry; break; }
      if (entry.key < target) low = middle + 1; else high = middle - 1;
    }
    const indexComparisons = trace.length;
    const row = found ? state.rows.find(candidate => candidate.slot === found.slot) : null;
    if (row) trace.push({ kind: 'record', key: row.LoanID, slot: row.slot, text: `Read record slot ${row.slot} using the index pointer. LoanID is ${row.LoanID}.` });
    return { row: row ? clone(row) : null, trace, keyComparisons: indexComparisons, rowReads: row ? 1 : 0, indexComparisons };
  }
  function updateIndex(state, oldKey, newKey) {
    if (!whole(newKey)) return result(state, false, 'key', 'The new key must be a positive whole number.');
    if (state.rows.some(row => row.LoanID === newKey)) return result(state, false, 'duplicate', `LoanID ${newKey} already exists. Both the table and index remain unchanged.`);
    const next = clone(state); const row = next.rows.find(candidate => candidate.LoanID === oldKey);
    if (!row) return result(state, false, 'missing', `LoanID ${oldKey} was not found. Both the table and index remain unchanged.`);
    row.LoanID = newKey;
    next.entries = next.entries.filter(entry => entry.key !== oldKey);
    next.entries.push({ key: newKey, slot: row.slot }); next.entries.sort((a, b) => a.key - b.key);
    return result(next, true, 'maintained', `Changed one record in slot ${row.slot}. Removed index key ${oldKey} and inserted key ${newKey} with the same pointer. The model shows 1 record write and 2 index-entry changes; it does not measure sorting cost, disk operations or time.`);
  }
  return { clone, createLibrary, changeLibrary, createRecords, changeRecordName, relationships, checkRelationship, orderFields, normalisationTasks, createNormalisation, chooseNormalisation, normalisationBack, renameNormalisedCustomer, normalisedRelations, reconstructOrders, createMetadata, changeMetadata, authorisedChange, createBackup, changeBackup, createIndex, lookupIndex, updateIndex };
})();
if (typeof globalThis !== 'undefined') globalThis.S8Models = S8Models;
if (typeof module !== 'undefined' && module.exports) module.exports = S8Models;
