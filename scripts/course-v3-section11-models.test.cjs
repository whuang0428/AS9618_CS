const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section11-models.js');
const last = run => run.frames.at(-1);
const at = (run, text) => run.frames.filter(frame => frame.line && run.code[frame.line - 1].trim() === text);

test('assignment copies the current value and later updates only the destination', () => {
  for (const [seats, increment] of [[3, 1], [0, 0], [20, 10]]) {
    const run = M.prepare('assignment', { seats, increment });
    assert.deepEqual(last(run).variables, { Seats: seats + increment, SavedSeats: seats });
    assert.deepEqual(last(run).output, [`${seats + increment}, ${seats}`]);
    assert.equal(run.frames[0].variables.Seats, null);
  }
});

test('arithmetic preserves DIV and MOD identity at unit boundaries', () => {
  for (const minutes of [0, 1, 59, 60, 61, 125, 600]) {
    const run = M.prepare('arithmetic', { seats: 3, price: 12.5, minutes }), state = last(run).variables;
    assert.equal(state.Charge, 37.5);
    assert.equal(state.Hours * 60 + state.Remainder, minutes);
    assert.ok(state.Remainder >= 0 && state.Remainder < 60);
    assert.equal(last(run).consumed, 3);
  }
});

test('logic distinguishes validity, confirmation and attention for every Boolean case', () => {
  for (const seats of [0, 1, 4, 5]) for (const paid of ['TRUE', 'FALSE']) {
    const state = last(M.prepare('logic', { seats, available: 4, paid })).variables;
    const valid = seats === 1 || seats === 4;
    assert.equal(state.Valid, valid);
    assert.equal(state.Confirm, valid && paid === 'TRUE');
    assert.equal(state.Attention, !state.Confirm);
  }
});

test('selection chooses exactly one message and skips an unreachable nested test', () => {
  for (const [seats, message] of [[-1, 'Invalid request'], [0, 'Invalid request'], [1, 'Booking accepted'], [4, 'Booking accepted'], [5, 'Not enough seats']]) {
    const run = M.prepare('selection', { seats, available: 4 });
    assert.deepEqual(last(run).output, [message]);
    assert.equal(at(run, 'IF Seats <= Available THEN').length, seats < 1 ? 0 : 1);
  }
});

test('FOR includes endpoints, respects negative and non-unit steps, and allows zero visits', () => {
  for (const [start, end, step, expected] of [[1, 3, 1, [1, 2, 3]], [3, 1, -1, [3, 2, 1]], [3, 1, 1, []], [1, 3, -1, []], [-3, 3, 2, [-3, -1, 1, 3]], [1, 6, 2, [1, 3, 5]], [2, 2, -2, [2]]]) {
    const run = M.prepare('for', { start, end, step });
    assert.deepEqual(last(run).output, [...expected.map(String), String(expected.length)]);
    assert.equal(last(run).variables.Visits, expected.length);
    assert.equal(at(run, 'Visits ← Visits + 1').length, expected.length);
  }
  assert.throws(() => M.prepare('for', { step: 0 }), /STEP/);
});

test('WHILE excludes the sentinel, supports zero-first, and leaves trailing input unread', () => {
  for (const [requests, total, consumed] of [['0, 4', 0, 1], ['3, 2, 4, 0', 9, 4], ['6, 0, 2', 6, 2]]) {
    const run = M.prepare('while', { requests });
    assert.equal(last(run).variables.Total, total);
    assert.equal(last(run).consumed, consumed);
    assert.equal(at(run, 'Total ← Total + Seats').length, consumed - 1);
  }
  assert.throws(() => M.prepare('while', { requests: '1, 2' }), /Include 0/);
});

test('REPEAT reads before its first test and exits on first valid attempt', () => {
  for (const [attempts, accepted, consumed] of [['1', 1, 1], ['6', 6, 1], ['0, 7, 3, 5', 3, 3], ['-2, 0, 99, 1', 1, 4]]) {
    const run = M.prepare('repeat', { attempts });
    assert.deepEqual(last(run).output, [String(accepted)]);
    assert.equal(last(run).consumed, consumed);
    assert.ok(run.frames.findIndex(frame => frame.line === 3) < run.frames.findIndex(frame => frame.line === 4));
  }
  assert.throws(() => M.prepare('repeat', { attempts: '0, 7' }), /accepted value/);
});

test('nested loops reset the inner index and visit each coordinate once in row order', () => {
  for (const [rows, cols] of [[1, 1], [2, 3], [4, 2]]) {
    const run = M.prepare('nested', { rows, cols });
    const expected = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => `${r + 1}, ${c + 1}`)).flat();
    assert.deepEqual(last(run).output, [...expected, String(rows * cols)]);
    assert.equal(last(run).variables.Count, rows * cols);
    assert.equal(new Set(expected).size, rows * cols);
    assert.equal(at(run, `FOR Column ← 1 TO ${cols}`).filter(frame => frame.variables.Column === 1).length, rows);
  }
});

test('supplied string interfaces use 1-based positions and preserve leading zeros and original text', () => {
  const run = M.prepare('strings', { code: 'art0072', start: 4, length: 4 });
  assert.deepEqual(last(run).variables, { Code: 'art0072', Size: 7, Part: '0072', UpperCode: 'ART0072' });
  assert.equal(last(M.prepare('strings', { code: 'a B', start: 3, length: 1 })).variables.Part, 'B');
  assert.ok(run.code.some(line => line.includes('TO_UPPER(Code)')));
  assert.ok(!run.code.some(line => line.includes('UCASE(Code)')));
  assert.throws(() => M.prepare('strings', { code: 'ABC', start: 3, length: 2 }), /fit inside/);
});

test('procedure executes only at CALL, outputs locally and resumes in the caller', () => {
  const run = M.prepare('procedure', { seats: 4 });
  assert.deepEqual(last(run).output, ['Seats: 4', 'Ready for next booking']);
  const lineOrder = run.frames.filter(frame => frame.line).map(frame => frame.line);
  assert.deepEqual(lineOrder, [4, 5, 6, 1, 2, 3, 7]);
  assert.ok(!Object.keys(last(run).variables).some(key => key.startsWith('local.')));
});

test('BYREF aliases caller storage immediately; BYVAL changes only the local copy', () => {
  for (const mode of ['BYREF', 'BYVAL']) {
    const run = M.prepare('reference', { total: 5, seats: 3, mode });
    const changed = at(run, 'RunningTotal ← RunningTotal + Quantity')[0];
    assert.equal(changed.variables['local.RunningTotal'], 8);
    assert.equal(changed.variables.Total, mode === 'BYREF' ? 8 : 5);
    assert.equal(changed.variables.Seats, 3);
    assert.deepEqual(last(run).output, [mode === 'BYREF' ? '8' : '5']);
    assert.ok(!Object.keys(last(run).variables).some(key => key.startsWith('local.')));
  }
});

test('RETURN produces a value before caller assignment and does not output it', () => {
  for (const [seats, price] of [[3, 12.5], [0, 12.5], [6, 0]]) {
    const run = M.prepare('function', { seats, price });
    const returned = at(run, 'RETURN Quantity * PriceEach')[0];
    assert.equal(returned.returnValue, seats * price);
    assert.equal(returned.variables.Total, null);
    assert.deepEqual(returned.output, []);
    assert.equal(last(run).variables.Total, seats * price);
    assert.deepEqual(last(run).output, [M.shown(seats * price)]);
  }
});

test('moving invariant receipt multiplication preserves every output and zero-copy work', () => {
  for (const copies of [0, 1, 3, 8]) {
    const run = M.prepare('efficiency', { seats: 3, copies, price: 12.5 }), final = last(run);
    assert.deepEqual(final.output, Array(copies * 2).fill('37.5'));
    assert.equal(final.metrics['Original multiplications'], copies);
    assert.equal(final.metrics['Improved multiplications'], copies > 0 ? 1 : 0);
    assert.equal(at(run, 'OriginalCost ← Seats * Price').length, copies);
    assert.equal(at(run, 'Cost ← Seats * Price').length, copies > 0 ? 1 : 0);
    assert.equal(at(run, 'OUTPUT OriginalCost').length, copies);
    assert.equal(at(run, 'OUTPUT Cost').length, copies);
    if (copies === 0) { assert.equal(final.variables.OriginalCost, null); assert.equal(final.variables.Cost, null); }
  }
});

test('integrated booking validates through a function and updates caller totals only after acceptance', () => {
  const run = M.prepare('booking', { count: 3, attempts: '0, 3, 7, 2, 4, 6' });
  assert.equal(last(run).variables.Total, 9);
  assert.equal(last(run).variables.Groups, 2);
  assert.equal(last(run).consumed, 5);
  assert.deepEqual(last(run).output, ['9, 2']);
  const inputs = at(run, 'INPUT Seats');
  assert.deepEqual(inputs.map(frame => frame.variables.Index), [1, 1, 2, 2, 3]);
  assert.deepEqual(inputs.map(frame => frame.variables.Total), [0, 0, 3, 3, 5]);
  assert.deepEqual(inputs.map(frame => frame.variables.Groups), [0, 0, 1, 1, 1]);
  const returned = at(run, 'RETURN (Quantity >= 1) AND (Quantity <= 6)');
  assert.deepEqual(returned.map(frame => frame.returnValue), [false, true, false, true, true]);
  assert.ok(returned.every(frame => frame.output.length === 0));
  const totalUpdates = at(run, 'RunningTotal ← RunningTotal + Quantity');
  assert.deepEqual(totalUpdates.map(frame => frame.variables.Total), [3, 5, 9]);
  assert.ok(totalUpdates.every(frame => frame.variables.Total === frame.variables['local.RunningTotal']));
  const groupUpdates = at(run, 'GroupCount ← GroupCount + 1');
  assert.deepEqual(groupUpdates.map(frame => frame.variables.Groups), [1, 2]);
  assert.ok(groupUpdates.every(frame => frame.variables.Groups === frame.variables['local.GroupCount']));
  assert.throws(() => M.prepare('booking', { count: 3, attempts: '1, 0, 7, 6' }), /at least 3/);
  for (const [attempts, total, groups] of [['1, 1, 1', 3, 0], ['6, 6, 6', 18, 3], ['0, 1, 7, 6, 3', 10, 2]]) {
    const state = last(M.prepare('booking', { attempts })).variables;
    assert.equal(state.Total, total); assert.equal(state.Groups, groups);
  }
});

test('reject non-finite, fractional, blank, overlong or non-terminating input before building a trace', () => {
  for (const seats of ['', ' ', NaN, Infinity, -1, 2.5, 1e12, true, [], {}, '4; alert(1)']) assert.throws(() => M.prepare('assignment', { seats }), RangeError);
  for (const attempts of ['', '1,,2', '1, 2.5', 'NaN, 3', Array(17).fill(2)]) assert.throws(() => M.prepare('repeat', { attempts }), RangeError);
  for (const code of ['', 'A\nB', 'A"B', 'A\\B', '<x>'.repeat(20), '中文']) assert.throws(() => M.prepare('strings', { code, start: 1, length: 1 }), RangeError);
  assert.throws(() => M.prepare('__proto__'), RangeError);
  assert.throws(() => M.prepare('logic', { paid: 'true' }), RangeError);
  assert.throws(() => M.prepare('reference', { mode: 'POINTER' }), RangeError);
});

test('every frame highlights a real line and previous snapshots remain independent', () => {
  for (const key of Object.keys(M.definitions)) {
    const a = M.prepare(key), b = M.prepare(key);
    assert.equal(a.frames[0].complete, false);
    assert.equal(last(a).complete, true);
    assert.ok(a.frames.length < 400);
    assert.ok(a.frames.every(frame => frame.line === null || (Number.isInteger(frame.line) && frame.line >= 1 && frame.line <= a.code.length)));
    assert.ok(a.frames.every(frame => frame.consumed <= a.inputStream.length));
    const original = JSON.stringify(b);
    last(a).variables.__test = 1; last(a).output.push('mutation');
    assert.equal(JSON.stringify(b), original, `${key} runs share no mutable state`);
    assert.equal(a.frames[0].variables.__test, undefined);
    assert.deepEqual(a.frames[0].output, []);
  }
});

test('bounded maximum cases terminate below the teaching trace limit', () => {
  for (const [key, raw] of [['for', { start: -5, end: 8, step: 1 }], ['nested', { rows: 4, cols: 4 }], ['while', { requests: [...Array(15).fill(6), 0] }], ['repeat', { attempts: [...Array(15).fill(0), 6] }], ['booking', { count: 5, attempts: [...Array(11).fill(0), ...Array(5).fill(6)] }]]) {
    const run = M.prepare(key, raw);
    assert.ok(last(run).complete);
    assert.ok(run.frames.length < 400);
  }
});

test('generated markup escapes editable values and keeps every control inside its own lab', async () => {
  const { renderLab, labMarkup } = await import('./course-v3-section11-labs.mjs');
  const html = renderLab('strings', { code: '<img src=x>', start: 1, length: 1 });
  assert.ok(!html.includes('<img src=x>'));
  assert.ok(html.includes('&lt;img src=x&gt;'));
  assert.equal(Object.keys(labMarkup).length, Object.keys(M.definitions).length);
  for (const markup of Object.values(labMarkup)) {
    assert.ok(markup.includes('data-s11-action="prepare"'));
    assert.ok(markup.includes('role="status" aria-live="polite"'));
    assert.ok(markup.includes('Complete pseudocode'));
  }
});

test('every frame change agrees with the highlighted statement, including exact OUTPUT text', () => {
  const cases = Object.keys(M.definitions).map(key => [key, {}]);
  cases.push(['efficiency', { copies: 0 }], ['booking', { attempts: '1, 1, 1' }], ['reference', { mode: 'BYVAL' }], ['selection', { seats: 0 }], ['selection', { seats: 8 }], ['for', { start: 3, end: 1, step: -1 }], ['for', { start: 3, end: 1, step: 1 }], ['while', { requests: '0, 6' }], ['strings', { code: 'a b007', start: 4, length: 3 }]);
  for (const [key, inputs] of cases) {
    const run = M.prepare(key, inputs);
    for (let index = 1; index < run.frames.length; index++) {
      const previous = run.frames[index - 1], frame = run.frames[index];
      const line = frame.line ? run.code[frame.line - 1].trim() : '';
      const context = `${key}, trace step ${index}, ${line}`;
      assert.equal(frame.consumed - previous.consumed, line.startsWith('INPUT ') ? 1 : 0, context);
      if (line.startsWith('INPUT ')) assert.equal(frame.variables[line.slice(6)], run.inputStream[previous.consumed], context);
      if (line.startsWith('OUTPUT ')) {
        const operands = line.slice(7).match(/"[^"]*"|[A-Za-z]\w*/g);
        const expected = operands.map(operand => operand.startsWith('"') ? operand.slice(1, -1) : M.shown(Object.prototype.hasOwnProperty.call(frame.variables, operand) ? frame.variables[operand] : frame.variables[`local.${operand}`])).join('');
        assert.deepEqual(frame.output, [...previous.output, expected], context);
      } else assert.deepEqual(frame.output, previous.output, context);
      const target = line.match(/^(\w+)\s*←/)?.[1] ?? line.match(/^(?:INPUT|FOR|NEXT|CONSTANT)\s+(\w+)/)?.[1];
      for (const name of new Set([...Object.keys(previous.variables), ...Object.keys(frame.variables)])) {
        if (previous.variables[name] === frame.variables[name]) continue;
        const parameterEntry = name.startsWith('local.') && /^(PROCEDURE|FUNCTION) /.test(line);
        const parameterExit = name.startsWith('local.') && !Object.prototype.hasOwnProperty.call(frame.variables, name) && (line === 'ENDPROCEDURE' || (previous.line && run.code[previous.line - 1].trim().startsWith('RETURN ')));
        const assignment = name === target || name === `local.${target}`;
        const aliasWrite = (key === 'reference' && run.inputs.mode === 'BYREF' && name === 'Total' && target === 'RunningTotal') || (key === 'booking' && ((name === 'Total' && target === 'RunningTotal') || (name === 'Groups' && target === 'GroupCount')));
        assert.ok(parameterEntry || parameterExit || assignment || aliasWrite, `${context}: unexpected change to ${name}`);
      }
    }
  }
});
