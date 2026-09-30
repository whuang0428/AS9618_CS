const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section12-models.js');
const last = run => run.frames.at(-1);
const titled = (run, title) => run.frames.find(frame => frame.title === title);

test('every activity starts without output and produces independent, navigable frame snapshots', () => {
  for (const key of Object.keys(M.definitions)) {
    const run = M.prepare(key);
    assert.deepEqual(run.frames[0].output, [], key);
    assert.equal(run.frames[0].complete, false, key);
    assert.equal(last(run).complete, true, key);
    assert.ok(run.frames.length > 4, key);
    for (const frame of run.frames) {
      assert.ok(frame.explanation.length > 15, `${key}: explanation`);
      assert.ok(frame.predict.length > 10, `${key}: prediction`);
      assert.ok(!frame.focus || run.nodes.includes(frame.focus), `${key}: focus`);
      for (const line of frame.lines) assert.ok(line > 0 && line <= frame.code.length, `${key}: source line ${line}`);
    }
    run.frames[1].variables.changedByTest = 1;
    assert.ok(!Object.hasOwn(run.frames[0].variables, 'changedByTest'), key);
    assert.ok(!Object.hasOwn(last(run).variables, 'changedByTest'), key);
  }
});

test('lifecycle distinguishes prototype feedback, increments and post-release change', () => {
  for (const model of ['Waterfall', 'Iterative', 'RAD']) for (const newLimit of [7, 8, 12]) {
    const run = M.prepare('lifecycle', { model, newLimit });
    assert.equal(last(run).variables.AgreedLimit, newLimit);
    assert.equal(last(run).variables.ImplementedLimit, newLimit);
    assert.equal(Boolean(titled(run, 'Build a prototype for user feedback')), model === 'RAD');
    assert.equal(Boolean(titled(run, 'A released version receives a change request')), model === 'Waterfall');
    assert.equal(Boolean(titled(run, 'Review an increment and choose the next improvement')), model === 'Iterative');
    const firstCode = run.frames.find(frame => frame.title === 'Development implements the agreed rule');
    assert.equal(firstCode.variables.ImplementedLimit, model === 'RAD' ? newLimit : 6);
    const finalTests = run.frames.filter(frame => frame.table).at(-1).table.rows;
    assert.ok(finalTests.some(row => row[0] === newLimit && row[1] === 'Accepted'));
    assert.ok(finalTests.some(row => row[0] === newLimit + 1 && row[1] === 'Rejected'));
    assert.ok(finalTests.every(row => row[1] === row[2]));
  }
});

test('structure preserves caller values, BYREF input, function return order and repeated calls', () => {
  for (const seats of [1, 3, 6]) for (const price of [0, 0.1, 12.5, 100]) for (const copies of [0, 1, 3]) {
    const run = M.prepare('structure', { seats, price, copies });
    const inputSeats = titled(run, 'Input through a reference');
    assert.equal(inputSeats.variables.Seats, seats);
    assert.equal(inputSeats.variables.Price, null);
    const inputPrice = titled(run, 'Read the price');
    assert.equal(inputPrice.variables.Price, price);
    const returned = titled(run, 'Return a value');
    assert.equal(returned.variables.Total, null, 'RETURN precedes caller assignment');
    assert.equal(returned.variables['Returned value'], seats * price);
    assert.deepEqual(returned.output, [], 'RETURN does not print');
    assert.equal(titled(run, 'Store the function result').variables.Total, seats * price);
    assert.deepEqual(last(run).output, Array(copies).fill(M.shown(seats * price)));
    assert.deepEqual(last(run).variables, { Seats: seats, Price: price, Total: seats * price, Copy: copies + 1 });
    assert.equal(run.frames.filter(frame => frame.title === 'Display this copy').length, copies);
    assert.equal(run.frames.filter(frame => frame.title === 'Call the function with copies').length, 1);
    assert.ok(!Object.keys(last(run).variables).some(name => name.startsWith('local.')));
  }
});

test('booking transitions apply guards only to submit from Draft and preserve every self-loop', () => {
  for (const available of [1, 6, 8]) for (const seats of [-1, 0, 1, available, available + 1]) {
    for (const state of ['Draft', 'Pending', 'Confirmed']) for (const event of ['submit', 'pay', 'cancel']) {
      let expected = state;
      if (state === 'Draft' && event === 'submit' && seats >= 1 && seats <= available) expected = 'Pending';
      if (state === 'Pending' && event === 'pay') expected = 'Confirmed';
      if (state !== 'Draft' && event === 'cancel') expected = 'Draft';
      const actual = M.bookingTransition(state, event, seats, available);
      assert.equal(actual.state, expected, `${state}/${event}/${seats}/${available}`);
      assert.equal(actual.guard, state === 'Draft' && event === 'submit' ? seats >= 1 && seats <= available : null);
    }
  }
  assert.equal(M.bookingTransition('Draft', 'submit', 2.5, 6).state, 'Draft');
  assert.equal(last(M.prepare('states', { seats: 6, events: 'submit, pay, pay, cancel, pay, submit' })).variables.State, 'Pending');
  const invalid = M.prepare('states', { seats: 7, available: 6, events: 'submit, pay, cancel' });
  assert.ok(invalid.frames.every(frame => frame.variables.State === 'Draft'));
  assert.ok(invalid.frames.every(frame => frame.variables.Available === 6));
  assert.throws(() => M.prepare('states', { events: 'submit, refund' }), /Event/);
  assert.throws(() => M.prepare('states', { events: '' }), /Event/);
});

test('syntax failure executes no statements and the repair changes grammar without changing the rule', () => {
  for (const seats of [0, 1, 6, 7]) {
    const run = M.prepare('debug', { kind: 'Syntax', seats, available: 6 });
    const fault = titled(run, 'Observe the faulty version');
    assert.deepEqual(fault.output, []);
    assert.match(fault.variables.Actual, /no statements execute/);
    assert.ok(!fault.code[3].endsWith('THEN'));
    assert.ok(titled(run, 'Reveal the repair').code[3].endsWith('THEN'));
    assert.deepEqual(last(run).output, [seats >= 1 && seats <= 6 ? 'Accepted' : 'Rejected']);
  }
});

test('logic fault is observable exactly at the inclusive upper endpoint', () => {
  for (const available of [1, 6, 8]) for (let seats = -1; seats <= 9; seats++) {
    const run = M.prepare('debug', { kind: 'Logic', seats, available });
    const fault = titled(run, 'Observe the faulty version');
    assert.equal(fault.variables.Actual !== fault.variables.Expected, seats === available);
    assert.ok(fault.code[3].includes('Seats < Available'));
    assert.ok(titled(run, 'Reveal the repair').code[3].includes('Seats <= Available'));
    assert.equal(titled(run, 'Rerun the same input').variables.Match, true);
    assert.deepEqual(last(run).output, [seats >= 1 && seats <= available ? 'Accepted' : 'Rejected']);
  }
});

test('division by zero stops before output; guarded repair covers empty and non-empty data', () => {
  for (const [total, groups] of [[0, 0], [10, 0], [24, 3], [0, 2], [60, 10]]) {
    const run = M.prepare('debug', { kind: 'Runtime', total, groups });
    const fault = titled(run, 'Observe the faulty version');
    if (groups === 0) { assert.deepEqual(fault.output, []); assert.match(fault.variables.Actual, /division by zero/); }
    else assert.deepEqual(fault.output, [M.shown(total / groups)]);
    assert.deepEqual(last(run).output, [groups === 0 ? 'No data' : M.shown(total / groups)]);
    assert.ok(titled(run, 'Reveal the repair').code[3].includes('Groups > 0'));
  }
});

test('stub exposes its limited behaviour; real validation gives expected outputs and both caller paths', () => {
  for (const view of ['Black-box', 'White-box']) {
    const stub = M.prepare('testing', { implementation: 'Stub', view, requests: '0, 1, 6, 7' });
    const real = M.prepare('testing', { implementation: 'Real module', view, requests: '0, 1, 6, 7' });
    assert.equal(last(stub).variables.Failures, 2);
    assert.equal(last(stub).variables['Caller IF outcomes visited'], '1 of 2');
    assert.equal(last(real).variables.Failures, 0);
    assert.equal(last(real).variables['Caller IF outcomes visited'], '2 of 2');
    assert.deepEqual(last(stub).table.rows.map(row => row[2]), ['Accepted', 'Accepted', 'Accepted', 'Accepted']);
    assert.deepEqual(last(real).table.rows.map(row => row[2]), ['Rejected', 'Accepted', 'Accepted', 'Rejected']);
    assert.equal(real.code.length > 0, view === 'White-box');
    assert.equal(stub.code.length > 0, view === 'White-box');
    const beforeFirst = titled(real, 'Prepare test 1');
    assert.equal(beforeFirst.table.rows[0][2], 'Not run');
    assert.deepEqual(beforeFirst.output, []);
  }
  assert.equal(last(M.prepare('testing', { implementation: 'Real module', requests: '2, 3, 4' })).variables['Caller IF outcomes visited'], '1 of 2');
  const falseStub = M.prepare('testing', { implementation: 'Stub', stubResult: 'FALSE', view: 'White-box', requests: '0, 1, 6, 7' });
  assert.ok(falseStub.code[1].includes('RETURN FALSE'));
  assert.deepEqual(last(falseStub).output, ['Test 1: Rejected', 'Test 2: Rejected', 'Test 3: Rejected', 'Test 4: Rejected']);
  assert.equal(last(falseStub).variables.Failures, 2);
  assert.equal(last(falseStub).variables['Caller IF outcomes visited'], '1 of 2');
  assert.ok(falseStub.frames.filter(frame => frame.title.startsWith('Run and compare')).every(frame => frame.lines.includes(9)));
});

test('boundary generator tests both sides, deduplicates adjacent endpoints and reveals only upper fault', () => {
  for (let lower = 0; lower < 20; lower++) for (let upper = lower + 1; upper <= 20; upper++) {
    for (const implementation of ['Faulty upper boundary', 'Correct inclusive rule']) {
      const run = M.prepare('boundary', { lower, upper, probe: 3, implementation });
      const rows = last(run).table.rows;
      const values = rows.map(row => row[0]);
      assert.equal(values.length, new Set(values).size);
      for (const required of [lower - 1, lower, lower + 1, upper - 1, upper, upper + 1, 3]) assert.ok(values.includes(required));
      const failedValues = rows.filter(row => row[4] === 'FAIL').map(row => row[0]);
      assert.deepEqual(failedValues, implementation === 'Faulty upper boundary' ? [upper] : []);
      assert.equal(last(run).variables.Failures, implementation === 'Faulty upper boundary' ? 1 : 0);
    }
  }
  assert.throws(() => M.prepare('boundary', { lower: 6, upper: 6 }), /smaller/);
  assert.throws(() => M.prepare('boundary', { lower: 7, upper: 6 }), /smaller/);
});

test('maintenance detects stale green tests and incomplete changes, including passing integration examples', () => {
  for (const newLimit of [7, 8, 12]) for (const seats of [0, 1, 6, 7, newLimit, newLimit + 1]) {
    for (const patch of ['Form only', 'Form and code', 'Form, code and tests']) {
      const run = M.prepare('maintenance', { newLimit, seats, patch }), end = last(run);
      const codeChanged = patch !== 'Form only', testsChanged = patch === 'Form, code and tests';
      assert.equal(end.variables.FormLimit, newLimit);
      assert.equal(end.variables.CodeLimit, codeChanged ? newLimit : 6);
      assert.equal(end.variables.TestExpectedLimit, testsChanged ? newLimit : 6);
      assert.equal(end.variables['System accepts'], seats >= 1 && seats <= (codeChanged ? newLimit : 6));
      assert.equal(end.variables['New requirement expects'], seats >= 1 && seats <= newLimit);
      assert.equal(end.variables['All artifacts aligned'], testsChanged);
      const stale = end.table.rows.filter(row => row[4] === 'STALE');
      assert.equal(stale.length > 0, !testsChanged);
      if (patch === 'Form only') assert.equal(end.variables.Failures, 0, 'old code can pass stale tests');
      if (patch === 'Form and code') assert.ok(end.variables.Failures > 0, 'new code conflicts with old expected values');
      if (testsChanged) assert.equal(end.variables.Failures, 0);
      assert.equal(run.frames[0].variables.RequiredLimit, 6, 'later changes do not mutate earlier frames');
    }
  }
});

test('invalid input fails explicitly instead of producing a misleading trace', () => {
  assert.throws(() => M.prepare('unknown'), /Unknown/);
  assert.throws(() => M.prepare('__proto__'), /Unknown/);
  for (const value of ['', ' ', 'abc', Infinity, null, false, 1.5, -1, 7]) {
    // null selects the documented default; it is not accepted as a numeric input.
    if (value === null) continue;
    assert.throws(() => M.prepare('structure', { seats: value }), /whole number/);
  }
  assert.throws(() => M.prepare('lifecycle', { model: 'Agile' }), /choose/);
  assert.throws(() => M.prepare('testing', { requests: '1,,3' }), /whole number/);
  assert.throws(() => M.prepare('testing', { requests: '1,2,3,4,5,6,7,8,9' }), /1–8/);
  assert.throws(() => M.prepare('debug', { kind: 'Runtime', groups: -1 }), /whole number/);
  assert.throws(() => M.prepare('maintenance', { newLimit: 6 }), /whole number/);
});

test('server-rendered markup supports every model and starts with results concealed', async () => {
  const { labMarkup, renderLab } = await import('./course-v3-section12-labs.mjs');
  assert.deepEqual(Object.keys(labMarkup), Object.keys(M.definitions));
  for (const [key, markup] of Object.entries(labMarkup)) {
    assert.ok(markup.includes(`data-s12-lab="${key}"`));
    assert.ok(markup.includes('data-s12-action="back" disabled'));
    assert.ok(markup.includes('Reveal next step'));
    assert.ok(markup.includes('data-s12-role="prediction"'));
    assert.ok(!markup.includes('>FAIL<'));
    assert.ok(!markup.includes('>PASS<'));
  }
  assert.ok(renderLab('structure', { copies: 0 }).includes('1 TO 0'));
  assert.throws(() => renderLab('unknown'), /Unknown/);
});
