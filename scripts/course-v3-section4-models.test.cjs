const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section4-models.js');
const L = require('./course-v3-section4-labs.js');
const freeze = object => { Object.freeze(object); for (const value of Object.values(object)) if (value && typeof value === 'object' && !Object.isFrozen(value)) freeze(value); return object; };
const set = (state, settings) => Object.entries(settings).reduce((s, [key, value]) => M.labAction(s, key, value), state);
const finish = state => { let next = state; for (let i = 0; i < 100 && !M.view(next).complete; i += 1) next = M.labAction(next, 'step'); assert.ok(M.view(next).complete); return next; };
const advance = (state, count) => { for (let i = 0; i < count; i += 1) state = M.labAction(state, 'step'); return state; };

test('each lab has bounded manual progress, immutable state, reversible steps and local markup', () => {
  for (const type of M.kinds) {
    const initial = freeze(M.createLab(type)), before = JSON.stringify(initial);
    const next = M.labAction(initial, 'step');
    assert.equal(JSON.stringify(initial), before, type);
    assert.deepEqual(M.labAction(next, 'back'), initial, type);
    assert.deepEqual(M.labAction(next, 'reset'), initial, type);
    const done = finish(next);
    assert.deepEqual(M.labAction(done, 'step'), done, type);
    assert.match(L.initialMarkup(type), /data-s4-action="step"/);
    assert.match(L.initialVisual(type), /^<svg/);
    assert.doesNotMatch(L.initialVisual(type), /<(button|select|input)\b|\bid=/);
    assert.doesNotMatch(L.initialMarkup(type), /(?:src|href)="https?:/);
  }
});

test('reading distinguishes instruction address, operand address and contents', () => {
  const state = set(M.createLab('memory'), { address: 0 });
  const read = M.view(finish(state));
  assert.equal(read.mar, 0); assert.equal(read.mdr, 'LDD 4'); assert.equal(read.memory[4], 18);
  const write = M.view(finish(set(state, { access: 'write' })));
  assert.equal(write.mar, 6); assert.equal(write.memory[6], 42); assert.equal(write.acc, 42);
  assert.deepEqual(M.view(state).memory, M.programMemory());
  assert.doesNotMatch(L.initialVisual('memory'), /MAR|MDR|CIR|IX/);
});

test('fetch executes the shared stored program with isolated registers and correct bus direction', () => {
  const frames = M.frames(M.createLab('fetch'));
  const instructionRead = frames.find(f => f.title.startsWith('Fetch 2'));
  assert.equal(instructionRead.mar, 0); assert.equal(instructionRead.mdr, 'LDD 4');
  assert.equal(instructionRead.acc, 0); assert.equal(instructionRead.pc, 0);
  const operandRead = frames.find(f => f.title.startsWith('Execute 2') && f.current === 0);
  assert.equal(operandRead.mar, 4); assert.equal(operandRead.mdr, 18); assert.equal(operandRead.cir, 'LDD 4');
  assert.match(operandRead.bus, /memory → CPU/);
  const store = frames.find(f => f.title === 'Execute 3 · write the answer');
  assert.equal(store.mar, 6); assert.equal(store.mdr, 42); assert.match(store.bus, /CPU → memory/);
  const end = frames.at(-1);
  assert.equal(end.memory[6], 42); assert.equal(end.acc, 42); assert.equal(end.pc, 4); assert.ok(end.halted);
  assert.equal(end.memory[4], 18); assert.equal(end.memory[5], 24);
  assert.notStrictEqual(frames[0].memory, end.memory);
  assert.equal(frames[0].memory[6], 0);
});

test('fetch restarts cleanly for changed data or subtraction, including zero and negative results', () => {
  for (const [pair, operation, expected] of [[1, 'ADD', 16], [0, 'SUB', -6], [2, 'SUB', 0]]) {
    const state = set(M.createLab('fetch'), { pair, operation });
    const end = M.view(finish(state));
    assert.equal(end.acc, expected); assert.equal(end.memory[6], expected);
    assert.equal(end.flags.zero, expected === 0);
    assert.equal(M.view(state).memory[6], 0);
  }
  const changed = M.labAction(finish(M.createLab('fetch')), 'pair', '1');
  assert.equal(changed.step, 0); assert.equal(M.view(changed).acc, 0);
});

test('interrupt waits for an instruction boundary, restores PC ACC and flags, and preserves the answer', () => {
  let state = advance(M.createLab('interrupt'), 1);
  state = M.labAction(state, 'request');
  assert.equal(M.view(state).pending, true); assert.equal(M.view(state).accepted, false);
  state = advance(state, 2);
  assert.equal(M.view(state).acc, 42); assert.equal(M.view(state).accepted, false);
  state = M.labAction(state, 'step');
  assert.deepEqual(M.view(state).saved, { pc: 2, acc: 42, flags: { zero: false } });
  state = advance(state, 2);
  assert.equal(M.view(state).acc, 0); assert.equal(M.view(state).flags.zero, true);
  assert.deepEqual(M.view(state).saved, { pc: 2, acc: 42, flags: { zero: false } });
  state = M.labAction(state, 'step');
  assert.equal(M.view(state).pc, 2); assert.equal(M.view(state).acc, 42); assert.equal(M.view(state).flags.zero, false);
  assert.equal(M.view(state).saved, null);
  assert.equal(M.view(finish(state)).memory[6], 42);
  assert.equal(M.view(finish(M.createLab('interrupt'))).memory[6], 42);
});

test('a later interrupt request does not appear in earlier teaching frames', () => {
  let state = M.labAction(advance(M.createLab('interrupt'), 3), 'request');
  assert.equal(M.view(state).pending, true);
  assert.equal(M.view(M.labAction(state, 'back')).pending, false);
  assert.equal(M.view(advance(state, 1)).accepted, true);
  state = M.labAction(state, 'reset');
  assert.equal(state.requested, false); assert.equal(state.requestAt, null);
  const tooLate = advance(state, 4);
  assert.equal(M.labAction(tooLate, 'request').requested, false);
});

test('two-pass assembly resolves forward labels and relocation without conflating labels and data', () => {
  for (const origin of [0, 20]) {
    const state = set(M.createLab('assembler'), { origin, pair: 1 });
    const firstLine = M.view(advance(state, 1));
    assert.deepEqual(firstLine.symbols, { START: origin }); assert.equal(firstLine.output.length, 0);
    const pass1 = M.view(advance(state, 7));
    assert.deepEqual(pass1.symbols, { START: origin, FIRST: origin + 4, SECOND: origin + 5, TOTAL: origin + 6 });
    assert.equal(pass1.output.length, 0);
    const end = M.view(finish(state));
    assert.equal(end.output[0].resolved, `LDD ${origin + 4}`);
    assert.equal(end.output[0].word, '00000001' + M.binary(origin + 4, 8));
    assert.equal(end.output[4].word, M.binary(7, 16));
    assert.equal(end.output[5].word, M.binary(9, 16));
    assert.equal(end.output[6].word, '0000000000000000');
    assert.ok(end.output.every(o => /^[01]{16}$/.test(o.word)));
  }
});

test('five addressing modes keep value, pointer, effective address and relative target distinct', () => {
  const end = (mode, variant) => M.view(finish(set(M.createLab('addressing'), { mode, variant })));
  for (let variant = 0; variant < 3; variant += 1) {
    const expected = [18, 24, 42][variant];
    for (const mode of ['immediate', 'direct', 'indirect', 'indexed']) assert.equal(end(mode, variant).acc, expected, `${mode} ${variant}`);
    assert.equal(end('immediate', variant).effective, null);
    assert.equal(end('direct', variant).effective, 300 + variant);
    assert.equal(end('indirect', variant).pointer, 300 + variant);
    assert.equal(end('indexed', variant).effective, 300 + variant);
  }
  for (const [variant, pc] of [[0, 97], [1, 101], [2, 104]]) {
    const relative = end('relative', variant);
    assert.equal(relative.pc, pc); assert.equal(relative.effective, pc); assert.equal(relative.acc, null);
  }
});

test('trace follows taken loop branches, leaves ACC unchanged on compare and outputs a character', () => {
  for (let count = 1; count <= 4; count += 1) {
    const state = set(M.createLab('trace'), { program: 'loop', count });
    const result = M.view(finish(state)), branches = result.rows.filter(r => r.instruction === 'JPN 21');
    assert.equal(branches.length, count);
    assert.equal(branches.filter(r => r.pc === 21).length, count - 1);
    assert.equal(branches.at(-1).pc, 24);
    assert.equal(result.output, 'C'); assert.equal(result.rows.at(-1).pc, 'END');
    result.rows.forEach((r, i) => { if (r.instruction.startsWith('CMP')) assert.equal(r.acc, result.rows[i - 1].acc); });
  }
  assert.equal(M.view(finish(M.createLab('trace'))).memory[6], 42);
});

test('all 8-bit shifts and rotations match independent arithmetic references at every input and shift width', () => {
  for (let value = 0; value <= 255; value += 1) for (let n = 0; n <= 8; n += 1) {
    const signed = value > 127 ? value - 256 : value;
    assert.equal(M.bitResult(value, 'LSL', n).result, value * 2 ** n % 256);
    assert.equal(M.bitResult(value, 'LSR', n).result, Math.floor(value / 2 ** n));
    assert.equal(M.bitResult(value, 'ASR', n).signedAfter, Math.floor(signed / 2 ** n));
    const left = M.bitResult(value, 'ASL', n);
    assert.equal(left.result, value * 2 ** n % 256);
    assert.equal(left.overflow, signed * 2 ** n < -128 || signed * 2 ** n > 127);
    const chars = M.binary(value), shift = n % 8;
    assert.equal(M.bitResult(value, 'ROL', n).bits, chars.slice(shift) + chars.slice(0, shift));
    assert.equal(M.bitResult(value, 'ROR', n).bits, chars.slice(8 - shift) + chars.slice(0, 8 - shift));
  }
  assert.equal(M.bitResult(151, 'ASR', 1).signedAfter, -53);
  assert.equal(M.bitResult(128, 'ASL', 1).overflow, true);
  assert.equal(M.bitResult(255, 'ASR', 8).bits, '11111111');
});

test('bit masks independently test, set, clear and toggle without unwanted bit changes', () => {
  assert.equal(M.bitResult(17, 'AND', 1, 16).result, 16);
  assert.equal(M.bitResult(17, 'OR', 1, 4).result, 21);
  assert.equal(M.bitResult(21, 'AND', 1, 251).result, 17);
  assert.equal(M.bitResult(17, 'XOR', 1, 4).result, 21);
  assert.equal(M.bitResult(21, 'XOR', 1, 4).result, 17);
  for (let value = 0; value <= 255; value += 1) {
    assert.equal(M.bitResult(value, 'AND', 1, 1).result, value % 2);
    assert.equal(M.bitResult(value, 'XOR', 1, 255).result, 255 - value);
    assert.equal(M.bitResult(value, 'AND', 1, 0).result, 0);
    assert.equal(M.bitResult(value, 'OR', 1, 0).result, value);
  }
});

test('performance model exposes sequential limits, transfer counts and useful cache hits', () => {
  const base = M.defaults.performance;
  assert.equal(M.performanceResult({ ...base, parallel: 0, cores: 4 }).compute, 100);
  assert.equal(M.performanceResult({ ...base, parallel: 100, cores: 4 }).compute, 25);
  assert.equal(M.performanceResult({ ...base, parallel: 75, cores: 4 }).compute, 43.75);
  assert.equal(M.performanceResult({ ...base, width: 64 }).transfers, 4);
  assert.equal(M.performanceResult({ ...base, width: 16 }).transfers, 16);
  assert.equal(M.performanceResult({ ...base, cache: 100 }).memoryWait, 8);
  assert.equal(M.performanceResult({ ...base, cache: 0 }).memoryWait, 40);
  assert.ok(M.performanceResult({ ...base, clock: 2 }).total > M.performanceResult(base).total / 2);
});

test('connection tasks check required signals rather than accepting every physical interface', () => {
  for (const [task, expected] of [['display', 'HDMI'], ['keyboard', 'USB'], ['legacy', 'VGA']]) {
    for (const choice of ['USB', 'HDMI', 'VGA']) {
      const result = M.view(finish(set(M.createLab('ports'), { task, choice })));
      assert.equal(result.correct, choice === expected);
    }
  }
});

test('settings reject invalid types/ranges and experiment changes reset progress', () => {
  assert.throws(() => M.createLab('unknown'));
  assert.throws(() => M.bitResult(256, 'LSL', 1));
  assert.throws(() => M.bitResult(1, 'LSR', 9));
  assert.throws(() => M.labAction(M.createLab('fetch'), 'pair', 4));
  assert.throws(() => M.labAction(M.createLab('fetch'), 'operation', 'MUL'));
  assert.throws(() => M.labAction(M.createLab('addressing'), 'mode', 'invented'));
  assert.throws(() => M.labAction(M.createLab('performance'), 'width', 48));
  assert.throws(() => M.labAction(M.createLab('trace'), 'count', 0));
  const changed = M.labAction(finish(M.createLab('bits')), 'operation', 'AND');
  assert.equal(changed.step, 0); assert.equal(M.view(changed).visible, false);
});


test('trace character and conditional programs follow both input paths', () => {
  for (const [program, input, output] of [['character', 'A', 'B'], ['character', 'B', 'C'], ['branch', 'A', 'B'], ['branch', 'B', '?']]) {
    const result = M.view(finish(set(M.createLab('trace'), { program, input })));
    assert.equal(result.output, output, `${program} ${input}`);
    assert.equal(result.rows.filter(r => r.output).length, 1, 'Only OUT emits a character');
    if (program === 'branch') {
      assert.deepEqual(result.memory, { 340: 341, 341: 65 });
      assert.equal(result.rows[1].instruction, 'CMI 340');
      assert.equal(result.rows[1].comparison, input === 'A');
      assert.equal(result.rows.some(r => r.address === 183), input === 'A');
      assert.equal(result.rows.some(r => r.address === 186), input === 'B');
      assert.equal(result.rows.at(-1).address, 188);
    }
  }
});

test('per-concept configuration gives matching starting values and limits unrelated controls', () => {
  const bits = L.initialMarkup('bits', { value: 166, operation: 'AND', mask: 15 }, ['value', 'mask']);
  assert.match(bits, /value="166" selected/); assert.match(bits, /value="15" selected/);
  assert.doesNotMatch(bits, /data-s4-setting="operation"/);
  assert.match(bits, /data-s4-action="step"/); assert.match(bits, /data-s4-action="reset"/);
  const memory = L.initialMarkup('memory', { showInstructions: false });
  assert.doesNotMatch(memory, /LDD 4|ADD 5|STO 6|<option value="0"/);
  const cache = L.initialMarkup('performance', {}, ['cache']);
  assert.equal((cache.match(/data-s4-setting=/g) || []).length, 1);
  assert.match(cache, /data-s4-setting="cache"/);
  const character = L.initialMarkup('trace', { program: 'character', input: 'B' }, ['input']);
  assert.match(character, /value="B" selected/); assert.doesNotMatch(character, /data-s4-setting="program"/);
  assert.equal(M.view(finish(set(M.createLab('fetch'), { pair: 3 }))).memory[6], 25);
});


test('component introduction hides register acronyms until their teaching group', () => {
  let state = set(M.createLab('cpu'), { showRegisters: false });
  for (let i = 0; i <= M.view(state).total; i += 1) {
    assert.doesNotMatch(L.render(state), /\b(?:PC|MAR|MDR|CIR|IX|SR)\b/);
    state = M.labAction(state, 'step');
  }
  assert.equal(M.view(state).acc, 42);
  assert.match(L.initialMarkup('cpu', { showRegisters: true }), /MAR/);
});
