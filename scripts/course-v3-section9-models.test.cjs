const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section9-models.js');
const last = run => run.frames.at(-1);

test('amount parsing uses cents and rejects malformed, negative and over-precise inputs', () => {
  assert.equal(M.cents('44.99'), 4499);
  assert.equal(M.cents('45'), 4500);
  assert.equal(M.cents('0.01'), 1);
  assert.equal(M.cents(0.1), 10);
  assert.equal(M.money(4499), '44.99');
  for (const amount of ['', null, undefined, '1.001', '-1', 'NaN', Infinity, '1e3', '100000.01']) assert.throws(() => M.cents(amount), RangeError);
});

test('IPO stores a total; later assignment does not retroactively change it', () => {
  const simple = M.trace({ quantity: 3 });
  assert.deepEqual(last(simple).output, ['75.00']);
  assert.deepEqual(simple.frames.map(frame => frame.node), ['input', 'cost', 'output']);
  assert.equal(simple.frames[0].variables.Total, null);
  const assigned = M.trace({ quantity: 2, variant: 'assignment' });
  assert.equal(last(assigned).variables.Quantity, 3);
  assert.equal(last(assigned).variables.Total, 50);
  assert.equal(assigned.frames[1].variables.Quantity, 2, 'earlier snapshots retain the old value');
  assert.deepEqual(last(assigned).output, ['3, 50.00']);
});

test('selection executes only its chosen pricing branch', () => {
  const student = M.trace({ quantity: 2, student: true, variant: 'selection' });
  const regular = M.trace({ quantity: 2, student: false, variant: 'selection' });
  assert.equal(last(student).variables.Total, 45);
  assert.equal(last(regular).variables.Total, 50);
  assert.equal(student.frames.filter(frame => frame.node === 'discount').length, 1);
  assert.equal(regular.frames.filter(frame => frame.node === 'discount').length, 0);
  assert.deepEqual(last(M.trace({ quantity: 0 })).output, ['0.00']);
  assert.throws(() => M.trace({ quantity: 1.5 }), RangeError);
  assert.throws(() => M.trace({ student: 'TRUE' }), TypeError);
});

test('availability preserves both inclusive boundaries and exposes OR and strict-boundary counterexamples', () => {
  for (const [quantity, expected] of [[-1, false], [0, false], [1, true], [8, true], [9, false]]) {
    const result = M.condition({ quantity, places: 8 });
    assert.equal(result.result, expected);
    assert.equal(result.correct, expected);
    assert.equal(M.condition({ quantity, places: 8, operator: 'NOT' }).result, !expected);
  }
  for (const quantity of [0, 9]) {
    const wrong = M.condition({ quantity, places: 8, operator: 'OR' });
    assert.equal(wrong.result, true);
    assert.equal(wrong.correct, false);
  }
  assert.equal(M.condition({ quantity: 8, inclusive: false }).result, false);
  assert.equal(M.condition({ quantity: 1, places: 0 }).result, false);
  assert.throws(() => M.condition({ places: -1 }), RangeError);
  assert.throws(() => M.condition({ operator: 'XOR' }), RangeError);
});

test('selection trace and logical model agree for every local quantity boundary', () => {
  for (const places of [0, 1, 8]) for (const quantity of [-1, 0, 1, 2, 8, 9]) {
    const run = M.selection({ quantity, places });
    assert.equal(run.accepted, M.condition({ quantity, places }).result);
    assert.deepEqual(last(run).output, [run.accepted ? 'Accepted' : 'Rejected']);
    assert.equal(last(run).variables.PlacesLeft, places, 'availability alone does not take payment or reduce stock');
    assert.equal(run.frames.filter(frame => ['yes', 'no'].includes(frame.node)).length, 1);
  }
});

test('FOR processes every supplied value once, then outputs once', () => {
  const run = M.loop({ values: [2, 3, 1] });
  assert.equal(run.iterations, 3);
  assert.equal(run.inputsRead, 3);
  assert.deepEqual(run.frames.filter(frame => frame.node === 'add').map(frame => frame.variables.Total), [2, 5, 6]);
  assert.deepEqual(last(run).output, [6]);
  assert.equal(run.frames.filter(frame => frame.node === 'output').length, 1);
  assert.ok(run.frames.slice(0, -1).every(frame => frame.output.length === 0));
  assert.deepEqual(last(M.loop({ values: [-2, 2, 0, 7] })).output, [7]);
});

test('a conditional loop skips a negative or zero value but still completes every iteration', () => {
  const run = M.loop({ values: [2, -1, 3], variant: 'conditional' });
  assert.equal(run.iterations, 3);
  assert.equal(run.total, 5);
  assert.deepEqual(run.frames.filter(frame => frame.node === 'add').map(frame => frame.variables.Total), [2, 5]);
  const other = M.loop({ values: [0, -1, 3, 4], variant: 'conditional' });
  assert.equal(other.iterations, 4);
  assert.equal(other.total, 7);
  assert.match(other.code.find(line => line.id === 'test').text, /TO 4$/);
});

test('WHILE has zero body entries when the first value is the sentinel', () => {
  const zero = M.loop({ values: [0], variant: 'while' });
  assert.equal(zero.iterations, 0);
  assert.equal(zero.inputsRead, 1, 'the initial input occurs before the body');
  assert.deepEqual(last(zero).output, [0]);
  const regular = M.loop({ values: [2, 3, 0, 99], variant: 'while' });
  assert.equal(regular.iterations, 2);
  assert.equal(regular.inputsRead, 3);
  assert.equal(regular.total, 5);
  assert.ok(!regular.frames.some(frame => frame.variables.Quantity === 99));
});

test('REPEAT enters its body at least once and uses the opposite condition to WHILE', () => {
  const zero = M.loop({ values: [0], variant: 'repeat' });
  assert.equal(zero.iterations, 1);
  assert.equal(zero.inputsRead, 1);
  assert.equal(zero.frames.filter(frame => frame.node === 'add').length, 0);
  for (const values of [[0], [2, 3, 0], [8, 0]]) {
    const before = M.loop({ values, variant: 'while' });
    const after = M.loop({ values, variant: 'repeat' });
    assert.equal(before.total, after.total);
    assert.equal(before.inputsRead, after.inputsRead);
    assert.equal(after.iterations, before.iterations + 1);
  }
  const wrongWhile = M.loop({ values: [2, 3, 0], variant: 'while', reversed: true });
  assert.equal(wrongWhile.total, 0);
  assert.equal(wrongWhile.iterations, 0);
  const wrongRepeat = M.loop({ values: [2, 3, 0], variant: 'repeat', reversed: true });
  assert.equal(wrongRepeat.total, 2);
  assert.equal(wrongRepeat.iterations, 1);
});

test('a sequence that needs another input pauses without inventing data or output', () => {
  for (const variant of ['while', 'repeat']) {
    const run = M.loop({ values: [2, 3], variant });
    assert.equal(run.waiting, true);
    assert.equal(run.stopped, false);
    assert.equal(run.total, 5);
    assert.deepEqual(last(run).output, []);
    assert.match(last(run).explanation, /needs another input/);
  }
  assert.equal(M.loop({ values: [0], variant: 'while', reversed: true }).waiting, true);
});

test('loop input validation rejects missing, oversized, non-numeric and unsupported input', () => {
  assert.deepEqual(M.inputList('2, -1, 3'), [2, -1, 3]);
  for (const values of ['', [], '2,,3', '2,3.5', '2,Infinity', '2,NaN', '2,alert(1)', Array(9).fill(1)]) assert.throws(() => M.loop({ values }), RangeError);
  assert.throws(() => M.loop({ values: [2, -1, 0], variant: 'while' }), RangeError);
  assert.throws(() => M.loop({ variant: 'until' }), RangeError);
});

test('abstraction depends on its purpose and reports specific missing information', () => {
  assert.equal(M.abstraction().sufficient, true);
  const noCapacity = M.abstraction({ selected: ['Quantity'] });
  assert.deepEqual(noCapacity.missing, ['Performance', 'PlacesLeft']);
  assert.match(noCapacity.result, /places left/);
  const changed = M.abstraction({ purpose: 'charge', selected: ['Quantity', 'PlacesLeft'] });
  assert.deepEqual(changed.missing, ['TicketPrice']);
  assert.deepEqual(changed.extra, ['PlacesLeft']);
  const poster = M.abstraction({ purpose: 'poster', selected: ['EventName', 'PosterColour', 'TicketPrice'] });
  assert.equal(poster.sufficient, true);
  assert.deepEqual(poster.extra, []);
  assert.throws(() => M.abstraction({ selected: ['MadeUp'] }), RangeError);
  assert.throws(() => M.abstraction({ selected: ['Quantity', 'Quantity'] }), TypeError);
});

test('returning a number supplies the caller; displaying it does not', () => {
  const returned = M.modules({ quantity: 3, unitPrice: '7.50', student: false, mode: 'return' });
  const printed = M.modules({ quantity: 3, unitPrice: '7.50', student: false, mode: 'display' });
  assert.equal(last(returned).variables.Charge, 22.5);
  assert.deepEqual(last(returned).output, []);
  assert.equal(last(printed).variables.Charge, null);
  assert.deepEqual(last(printed).output, ['22.50']);
  assert.equal(printed.validInterface, false);
  assert.throws(() => M.modules({ quantity: 0 }), RangeError);
  assert.equal(last(M.modules()).variables.Charge, 45, 'the ticket example passes the student status to the module');
});

test('refinement refuses to invent a rule and executes only complete operations', () => {
  for (const detail of ['goal', 'outline']) {
    const result = M.refinement({ detail });
    assert.equal(result.ready, false);
    assert.equal(result.run, null);
  }
  for (const missing of ['price', 'discount', 'output']) {
    const result = M.refinement({ detail: 'operations', missing });
    assert.equal(result.ready, false);
    assert.equal(result.run, null);
    assert.equal(result.unresolved.length, 1);
  }
  const complete = M.refinement({ detail: 'operations', quantity: 3, student: true });
  assert.equal(complete.ready, true);
  assert.deepEqual(last(complete.run).output, ['67.50']);
});

test('a successful purchase calculates the discount, change and stock in the required order', () => {
  const run = M.ticket();
  assert.equal(run.outcome, 'confirmed');
  assert.equal(run.totalCents, 4500);
  assert.equal(run.changeCents, 500);
  assert.equal(run.placesLeft, 6);
  assert.deepEqual(last(run).output, ['45.00', 'Confirmed; change 5.00; places left 6']);
  const stockFrame = run.frames.findIndex(frame => frame.node === 'stock');
  assert.ok(stockFrame > run.frames.findIndex(frame => frame.node === 'payment'));
  assert.ok(run.frames.slice(2, stockFrame).every(frame => frame.variables.PlacesLeft === 8));
  assert.equal(run.frames.filter(frame => frame.node === 'regular').length, 0);
});

test('payment one cent below fails without reducing stock; exact payment succeeds', () => {
  for (const [paid, outcome, places, change] of [['44.99', 'unpaid', 8, null], ['45.00', 'confirmed', 6, 0], ['50.00', 'confirmed', 6, 500]]) {
    const run = M.ticket({ paid });
    assert.equal(run.outcome, outcome);
    assert.equal(run.placesLeft, places);
    assert.equal(run.changeCents, change);
    if (outcome === 'unpaid') assert.equal(run.frames.filter(frame => frame.node === 'stock').length, 0);
  }
  const lastPlace = M.ticket({ quantity: 1, places: 1, student: false, paid: '25.00' });
  assert.equal(lastPlace.placesLeft, 0);
  assert.equal(lastPlace.totalCents, 2500);
});

test('unavailable quantity prevents charging, payment input and stock changes', () => {
  for (const [quantity, places] of [[0, 8], [-1, 8], [9, 8], [1, 0]]) {
    const run = M.ticket({ quantity, places });
    assert.equal(run.outcome, 'unavailable');
    assert.equal(run.placesLeft, places);
    assert.equal(last(run).variables.Paid, null);
    assert.equal(last(run).variables.Total, null);
    assert.deepEqual(last(run).output, ['Unavailable']);
  }
  assert.throws(() => M.ticket({ quantity: 1.1 }), RangeError);
  assert.throws(() => M.ticket({ places: -1 }), RangeError);
  assert.throws(() => M.ticket({ paid: '44.999' }), RangeError);
});

test('step movement uses immutable snapshots, respects boundaries and restarts at prediction', () => {
  const run = M.ticket();
  let step = -1;
  step = M.moveStep(step, 'next', run.frames.length);
  assert.equal(step, 0);
  assert.equal(M.moveStep(step, 'previous', run.frames.length), -1);
  assert.equal(M.moveStep(-1, 'previous', run.frames.length), -1);
  assert.equal(M.moveStep(run.frames.length - 1, 'next', run.frames.length), run.frames.length - 1);
  const before = JSON.stringify(run.frames);
  const back = M.moveStep(8, 'previous', run.frames.length);
  assert.equal(M.moveStep(back, 'next', run.frames.length), 8);
  assert.equal(JSON.stringify(run.frames), before);
  assert.ok(Object.isFrozen(run.frames));
  assert.ok(run.frames.every(frame => Object.isFrozen(frame) && Object.isFrozen(frame.variables) && Object.isFrozen(frame.output)));
  assert.equal(M.moveStep(8, 'reset', run.frames.length), -1);
  assert.throws(() => M.moveStep(-2, 'next', run.frames.length), RangeError);
});

test('every executed frame names a declared statement and owns separate variable/output snapshots', () => {
  const runs = [M.trace(), M.trace({ variant: 'selection' }), M.condition(), M.selection(), M.loop(), M.loop({ variant: 'while', values: [0] }), M.loop({ variant: 'repeat', values: [0] }), M.modules(), M.ticket()];
  for (const run of runs) {
    const names = new Set(run.code.map(line => line.id));
    assert.equal(names.size, run.code.length);
    for (const frame of run.frames) {
      assert.ok(names.has(frame.node));
      assert.ok(frame.explanation.trim());
    }
    assert.equal(new Set(run.frames.map(frame => frame.variables)).size, run.frames.length);
    assert.equal(new Set(run.frames.map(frame => frame.output)).size, run.frames.length);
  }
});

test('moving OUTPUT before its input dependency exposes an unassigned value', () => {
  const run = M.trace({ earlyOutput: true, quantity: 3 });
  assert.equal(run.error, 'unassigned-output');
  assert.equal(last(run).variables.Total, null);
  assert.deepEqual(last(run).output, []);
  assert.deepEqual(run.frames.map(frame => frame.node), ['input', 'early']);
});

test('initialising inside a counted loop discards earlier contributions', () => {
  const values = [2, 1, 3, 2];
  const correct = M.loop({ values });
  const wrong = M.loop({ values, resetInside: true });
  assert.equal(correct.total, 8);
  assert.equal(wrong.total, 2);
  assert.equal(wrong.frames.filter(frame => frame.node === 'init').length, 4);
  assert.equal(correct.frames.filter(frame => frame.node === 'test').length, 5, 'include the final failed loop test');
});

test('positive-quantity REPEAT rejects 0 and negative attempts and stops on its first positive input', () => {
  for (const [values, attempts, accepted] of [[[3], 1, 3], [[0, -2, 3], 3, 3], [[1, 99], 1, 1]]) {
    const run = M.loop({ values, variant: 'repeat', mode: 'positive' });
    assert.equal(run.iterations, attempts);
    assert.equal(run.inputsRead, attempts);
    assert.equal(last(run).variables.Quantity, accepted);
    assert.equal(last(run).output.at(-1), accepted);
    assert.equal(run.accepted, true);
  }
  const waiting = M.loop({ values: [0, -2], variant: 'repeat', mode: 'positive' });
  assert.equal(waiting.waiting, true);
  assert.equal(waiting.frames.filter(frame => frame.node === 'output').length, 0);
  const wrong = M.loop({ values: [0, -2, 3], variant: 'repeat', mode: 'positive', reversed: true });
  assert.equal(wrong.iterations, 1);
  assert.equal(wrong.accepted, false);
});

test('an expanded loop makes index initialisation, increment and final false condition explicit', () => {
  const run = M.flowLoop({ values: [2, 1, 3] });
  assert.equal(run.frames.find(frame => frame.node === 'index').variables.Index, 1);
  assert.deepEqual(run.frames.filter(frame => frame.node === 'next').map(frame => frame.variables.Index), [2, 3, 4]);
  assert.equal(run.frames.filter(frame => frame.node === 'test').length, 4);
  assert.match(run.frames.at(-2).explanation, /4 <= 3 is FALSE/);
  assert.deepEqual(last(run).output, [6]);
  assert.equal(run.total, M.loop({ values: [2, 1, 3] }).total);
});

test('the first 27 starts collection; earlier zero is ignored and a later 27 is added', () => {
  for (const [values, total] of [[[0, 5, 27, 4, 27, 0], 31], [[27, 0], 0], [[0, 27, 27, 0], 27]]) {
    const run = M.twoStage({ values });
    assert.equal(run.total, total);
    assert.deepEqual(last(run).output, [total]);
    assert.equal(run.stopped, true);
    const initialise = run.frames.findIndex(frame => frame.node === 'init');
    assert.ok(run.frames.slice(0, initialise).every(frame => frame.variables.Total === null));
    assert.ok(run.frames.slice(0, initialise).some(frame => frame.node === 'gate' && frame.variables.Value === 27));
    assert.ok(run.frames.slice(0, initialise).every(frame => frame.node !== 'add'));
  }
  for (const values of [[0, 5], [27], [27, 4]]) {
    const run = M.twoStage({ values });
    assert.equal(run.waiting, true);
    assert.deepEqual(last(run).output, []);
  }
});

test('points use the original amount for the band and whole dollars for the multiplier', () => {
  for (const [amount, points] of [['0.00', 0], ['9.99', 45], ['10.00', 70], ['10.01', 70], ['99.77', 693], ['100.00', 700], ['100.01', 1000], ['100.50', 1000]]) {
    const run = M.points({ amount });
    assert.equal(run.calculatedPoints, points);
    assert.deepEqual(last(run).output, [points]);
  }
  const wrong = M.points({ amount: '100.50', truncateFirst: true });
  assert.equal(wrong.calculatedPoints, 700);
  assert.equal(wrong.correctPoints, 1000);
  const refined = M.refinement({ variant: 'points', detail: 'operations', amount: '99.77' });
  assert.equal(refined.run.calculatedPoints, 693);
  assert.equal(M.refinement({ variant: 'points', detail: 'operations', missing: 'price' }).run, null);
  assert.throws(() => M.points({ amount: '-1' }), RangeError);
  assert.throws(() => M.refinement({ variant: 'made-up' }), RangeError);
});

test('payment refinement exposes success calculations and keeps stock on failure', () => {
  for (const [paid, outcome, remaining] of [['44.99', 'unpaid', 8], ['45.00', 'confirmed', 6], ['50.00', 'confirmed', 6]]) {
    const result = M.refinement({ variant: 'payment', detail: 'operations', paid });
    assert.equal(result.run.outcome, outcome);
    assert.equal(last(result.run).variables.PlacesLeft, remaining);
  }
  assert.equal(M.refinement({ variant: 'payment', detail: 'outline' }).run, null);
  assert.equal(M.refinement({ variant: 'payment', detail: 'operations', missing: 'discount' }).run, null);
});

test('all eight activity fragments expose isolated controls and initially hidden outputs', async () => {
  const { labMarkup } = await import('./course-v3-section9-labs.mjs');
  assert.deepEqual(Object.keys(labMarkup).sort(), ['abstraction', 'trace', 'conditions', 'loops', 'representations', 'modules', 'refinement', 'ticket'].sort());
  for (const [key, markup] of Object.entries(labMarkup)) {
    assert.ok(markup.includes(`data-s9-lab="${key}"`));
    assert.match(markup, /data-s9-role="output" hidden/);
    assert.ok(markup.includes('data-s9-action="reset"'));
    assert.equal((markup.match(/data-s9-role="quantity"/g) ?? []).length <= 1, true);
  }
  assert.ok(labMarkup.trace.includes('data-s9-role="earlyOutput"'));
  assert.ok(labMarkup.loops.includes('data-s9-role="resetInside"'));
  assert.ok(labMarkup.modules.includes('data-s9-role="student"'));
  assert.ok(labMarkup.refinement.includes('value="payment"'));
  assert.ok(labMarkup.refinement.includes('value="points"'));
  for (const key of ['trace', 'conditions', 'loops', 'representations', 'modules', 'ticket']) assert.ok(labMarkup[key].includes('class="s9-step-controls"'), key);
  assert.match(labMarkup.representations, /data-s9-role="view"><option value="flow">Flowchart<\/option>/);
});
