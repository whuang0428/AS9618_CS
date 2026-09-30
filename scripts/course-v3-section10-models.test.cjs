const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section10-models.js');

test('record assignments preserve unrelated fields and enforce types', () => {
  const original = M.createRecord();
  const changed = M.assignField(original, 'Name', 'Mina');
  assert.equal(changed.state.Name, 'Mina');
  assert.equal(original.Name, 'Asha');
  assert.deepEqual({ ...changed.state, Name: original.Name }, original);
  assert.equal(M.assignField(original, 'Seats', '2.5').ok, false);
  assert.equal(M.assignField(original, 'Category', 'ST').ok, false);
  assert.equal(M.assignField(original, 'Paid', '1').ok, false);
  assert.equal(M.assignField(original, 'Paid', 'TRUE').state.Paid, true);
  assert.equal(M.assignField(original, 'Price', '7.25').state.Price, 7.25);
  assert.equal(M.assignField(original, 'Price', '20').line, 'Booking.Price ← 20.0');
  assert.equal(M.assignField(original, 'Category', 'T').line, "Booking.Category ← 'T'");
  assert.equal(M.assignField(original, 'Name', 'A\nB').ok, false);
  assert.equal(M.assignField(original, 'Name', 'A"B').ok, false);
  assert.equal(M.assignField(original, 'Category', "'").ok, false);
});

test('array bounds distinguish stored values from indices for both lower bounds', () => {
  for (const lower of [0, 1]) {
    const original = M.createArray([12, 41, 9], lower);
    assert.equal(original.upper, lower + 2);
    assert.equal(M.arrayAction(original, 'read', lower + 1).state.output, 41);
    for (const invalid of [lower - 1, lower + 3, 1.5, NaN]) {
      const result = M.arrayAction(original, 'write', invalid, 99);
      assert.equal(result.ok, false);
      assert.deepEqual(result.state, original);
    }
    assert.deepEqual(M.arrayAction(original, 'write', lower + 2, -4).state.values, [12, 41, -4]);
    assert.deepEqual(original.values, [12, 41, 9]);
  }
  assert.throws(() => M.numbers('2,,3'));
});

test('traversal sum, qualifying count and maximum work in either direction, including all negatives', () => {
  for (const values of [[-9, -4, -7], [0], [-4, 7, 0, -2, 5], [2, 2, 2]]) {
    for (const direction of ['forward', 'reverse']) {
      for (const [operation, variable, expected] of [['sum', 'Total', values.reduce((a, b) => a + b, 0)], ['count', 'Count', values.filter(v => v > 0).length], ['max', 'Maximum', Math.max(...values)]]) {
        const trace = M.traversalTrace(values, operation, direction);
        assert.equal(trace.at(-1).variables[variable], expected);
        assert.equal(trace.at(-1).done, true);
        assert.deepEqual([...trace.at(-1).visited].sort(), values.map((_, i) => i));
        assert.equal(trace[0].variables[variable], null);
        assert.equal(trace[0].done, false);
        if (operation === 'max') {
          const first = direction === 'forward' ? 0 : values.length - 1;
          assert.deepEqual(trace[1].visited, [first]);
          const comparisons = trace.filter(frame => frame.line.startsWith('Index ←')).map(frame => frame.focus[0]);
          assert.equal(comparisons.length, values.length - 1);
          assert.ok(!comparisons.includes(first), 'the initial element is not compared with itself');
        }
      }
    }
  }
});

test('rectangular matrix visits each coordinate once and keeps independent totals', () => {
  const trace = M.matrixTrace([[2, -1, 7], [3, 0, 4]]), final = trace.at(-1);
  assert.deepEqual(final.rowTotals, [8, 7]);
  assert.deepEqual(final.columnTotals, [5, -1, 11]);
  assert.equal(final.grand, 15);
  const visits = trace.filter(frame => frame.line.startsWith('Row ←')).map(frame => frame.focus.join(','));
  assert.deepEqual(visits, ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2']);
  assert.deepEqual(trace[0].rowTotals, [0, 0]);
  assert.throws(() => M.matrixTrace([[1, 2], [3]]));
});

test('linear search stops at the first duplicate and never reads outside the array', () => {
  for (const [values, target, position] of [[[7, 3, 7], 7, 1], [[7, 3, 9], 9, 3], [[7, 3, 9], 8, -1], [[4], 4, 1], [[4], 9, -1]]) {
    const trace = M.searchTrace(values, target), final = trace.at(-1);
    assert.equal(final.variables.Position, position);
    assert.equal(final.variables.Found, position !== -1);
    assert.ok(trace.every(frame => frame.focus.every(i => i >= 0 && i < values.length)));
    assert.equal(final.visited.length, position === -1 ? values.length : position);
    assert.equal(trace[0].variables.Found, false);
  }
});

test('bubble sort gives correct orders and exposes all three swap assignments without losing Temp', () => {
  for (const values of [[8, 3, 6, 1, 3], [-2, -5, 0], [1], [3, 2, 1], [1, 2, 3], [2, 2, 2]]) {
    for (const order of ['ascending', 'descending']) {
      const trace = M.sortTrace(values, order);
      const expected = [...values].sort((a, b) => order === 'ascending' ? a - b : b - a);
      assert.deepEqual(trace.at(-1).values, expected);
      assert.deepEqual(trace[0].values, values);
      trace.forEach((frame, index) => {
        if (frame.line === 'Temp ← Values[Index]') {
          const [left, right] = frame.focus;
          assert.equal(frame.variables.Temp, frame.values[left]);
          assert.equal(trace[index + 1].values[left], frame.values[right]);
          assert.equal(trace[index + 1].variables.Temp, frame.values[left]);
          assert.equal(trace[index + 2].values[right], frame.values[left]);
          assert.deepEqual([...trace[index + 2].values].sort(), [...values].sort());
        }
      });
    }
  }
  assert.equal(M.sortTrace([1, 2, 3]).at(-1).variables.Pass, 1);
});

test('file lifecycle distinguishes blank line, EOF, overwrite and append', () => {
  let state = M.createFile(['Asha', '', 'Ben']);
  const seed = M.clone(state);
  assert.equal(M.fileAction(state, 'read').ok, false);
  state = M.fileAction(state, 'READ').state;
  const pointer = state.pointer;
  assert.equal(M.fileAction(state, 'eof').state.pointer, pointer);
  assert.equal(M.fileAction(state, 'WRITE').ok, false);
  const results = [];
  for (let i = 0; i < 3; i++) { state = M.fileAction(state, 'read').state; results.push(state.variable); }
  assert.deepEqual(results, ['Asha', '', 'Ben']);
  assert.equal(M.fileAction(state, 'eof').state.eof, true);
  assert.equal(M.fileAction(state, 'read').ok, false);
  assert.deepEqual(state.stored, seed.stored);
  state = M.fileAction(state, 'close').state;
  state = M.fileAction(state, 'APPEND').state;
  assert.equal(state.variable, 'Ben', 'opening another mode does not assign the working variable');
  state = M.fileAction(state, 'write', 'Chen').state;
  assert.deepEqual(state.stored, ['Asha', '', 'Ben', 'Chen']);
  state = M.fileAction(state, 'close').state;
  state = M.fileAction(state, 'WRITE').state;
  assert.deepEqual(state.stored, []);
  assert.equal(state.variable, 'Ben', 'truncating the file does not erase the working variable');
  state = M.fileAction(state, 'write', 'Mina').state;
  state = M.fileAction(state, 'close').state;
  state = M.fileAction(state, 'READ').state;
  state = M.fileAction(state, 'read').state;
  assert.equal(state.variable, 'Mina');
  assert.deepEqual(seed.stored, ['Asha', '', 'Ben']);
  const empty = M.fileAction(M.createFile([]), 'READ').state;
  assert.equal(M.fileAction(empty, 'eof').state.eof, true);
  const writing = M.fileAction(M.createFile([]), 'WRITE').state;
  const quoted = M.fileAction(writing, 'write', 'A"B');
  assert.equal(quoted.ok, true);
  assert.equal(quoted.line, 'WRITEFILE "Names.txt", Line');
  assert.deepEqual(quoted.state.stored, ['A"B']);
  assert.equal(M.fileAction(writing, 'write', 'A\nB').ok, false);
});

test('stack is LIFO, rejects overflow/underflow and ignores stale storage', () => {
  let state = M.createStack(3);
  assert.equal(M.stackAction(state, 'pop').ok, false);
  for (const item of ['A', 'B', 'C']) state = M.stackAction(state, 'push', item).state;
  assert.equal(M.stackAction(state, 'push', 'D').ok, false);
  const popped = [];
  for (let i = 0; i < 3; i++) { state = M.stackAction(state, 'pop').state; popped.push(state.output); }
  assert.deepEqual(popped, ['C', 'B', 'A']);
  assert.equal(state.top, -1);
  assert.deepEqual(state.slots, ['A', 'B', 'C']);
  assert.equal(M.stackAction(state, 'pop').ok, false);
  state = M.stackAction(state, 'push', 'New').state;
  assert.equal(state.slots[0], 'New');
});

test('circular queue remains FIFO through wrap-around, full/empty boundaries and capacity one', () => {
  for (const capacity of [1, 3, 5]) {
    let state = M.createQueue(capacity), reference = [];
    let seed = 71;
    for (let i = 0; i < 180; i++) {
      seed = (seed * 48271) % 2147483647;
      const enqueue = seed % 3 !== 0;
      const original = M.clone(state);
      const result = M.queueAction(state, enqueue ? 'enqueue' : 'dequeue', `V${i}`);
      assert.deepEqual(state, original, 'model must not mutate its input');
      assert.equal(result.ok, enqueue ? reference.length < capacity : reference.length > 0);
      if (result.ok) {
        if (enqueue) reference.push(`V${i}`); else assert.equal(result.state.output, reference.shift());
        state = result.state;
      }
      assert.equal(state.count, reference.length);
      assert.deepEqual(M.queueIndices(state).map(index => state.slots[index]), reference);
    }
  }
});

function verifyLinked(state, reference) {
  const active = M.chain(state), free = M.chain(state, state.freeHead);
  assert.deepEqual(active.map(i => state.slots[i].data), reference);
  assert.equal(new Set([...active, ...free]).size, state.slots.length);
  assert.equal(active.length + free.length, state.slots.length);
}
test('linked list preserves active/free chains through head, tail, empty and reused slots', () => {
  for (const initial of [[], ['A'], ['A', 'B', 'C']]) {
    let state = M.createLinked(initial, 6), reference = [...initial];
    let seed = 107;
    verifyLinked(state, reference);
    for (let i = 0; i < 150; i++) {
      seed = (seed * 48271) % 2147483647;
      const action = ['insert', 'delete', 'update'][seed % 3];
      const position = action === 'insert' ? seed % (reference.length + 1) + 1 : reference.length ? seed % reference.length + 1 : 1;
      const original = M.clone(state);
      const result = M.linkedAction(state, action, position, `V${i}`);
      assert.deepEqual(state, original);
      const accepted = action === 'insert' ? reference.length < 6 : reference.length > 0;
      assert.equal(result.ok, accepted);
      if (result.ok) {
        if (action === 'insert') reference.splice(position - 1, 0, `V${i}`);
        if (action === 'delete') reference.splice(position - 1, 1);
        if (action === 'update') reference[position - 1] = `V${i}`;
        state = result.state;
      }
      verifyLinked(state, reference);
    }
    while (reference.length) { state = M.linkedAction(state, 'delete', 1).state; reference.shift(); verifyLinked(state, reference); }
    assert.equal(state.head, -1);
    state = M.linkedAction(state, 'insert', 1, 'Reused').state;
    verifyLinked(state, ['Reused']);
  }
});

test('booking combines FIFO promotion and LIFO undo; rejection adds no undo record', () => {
  let state = M.createBooking();
  const original = M.clone(state);
  state = M.bookingAction(state, 'book', 1, 'Chen').state;
  state = M.bookingAction(state, 'book', 1, 'Dara').state;
  const beforeCancel = M.clone(state);
  state = M.bookingAction(state, 'cancel', 1).state;
  assert.equal(state.seats[0], 'Chen');
  assert.deepEqual(state.waiting, ['Dara']);
  const rejected = M.bookingAction(state, 'book', 2, 'Chen');
  assert.equal(rejected.ok, false);
  assert.deepEqual(rejected.state, state);
  state = M.bookingAction(state, 'undo').state;
  assert.deepEqual(state.seats, beforeCancel.seats);
  assert.deepEqual(state.waiting, beforeCancel.waiting);
  state = M.bookingAction(state, 'undo').state;
  state = M.bookingAction(state, 'undo').state;
  assert.deepEqual(state.seats, original.seats);
  assert.deepEqual(state.waiting, original.waiting);
  assert.equal(M.bookingAction(state, 'undo').ok, false);
  assert.equal(M.bookingAction(state, 'cancel', 2).ok, false);
});

test('history rewinds/replays full snapshots and a branched change discards only the replay future', () => {
  const initial = M.createQueue(3);
  let history = M.createHistory(initial);
  const first = M.queueAction(initial, 'enqueue', 'A').state;
  history = M.recordHistory(history, first);
  const second = M.queueAction(first, 'enqueue', 'B').state;
  history = M.recordHistory(history, second);
  history = M.moveHistory(history, 'back');
  assert.deepEqual(history.present, first);
  history = M.moveHistory(history, 'next');
  assert.deepEqual(history.present, second);
  history = M.moveHistory(history, 'back');
  const branched = M.queueAction(history.present, 'dequeue').state;
  history = M.recordHistory(history, branched);
  assert.deepEqual(history.future, []);
  history = M.moveHistory(M.moveHistory(history, 'back'), 'back');
  assert.deepEqual(history.present, initial);
  assert.equal(first.count, 1);
});
