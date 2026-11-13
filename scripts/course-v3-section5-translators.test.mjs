import test from 'node:test';
import assert from 'node:assert/strict';
import M from './course-v3-section5-translator-models.js';
import { translatorMaterials } from './course-v3-section5-translators.mjs';

const edit = (state, updates) => Object.entries(updates).reduce((prev, [name, value]) => M.action(prev, name, value), state);
const buildAndRun = state => M.action(M.action(state, 'build'), 'run');

test('pass one resolves labels and pass two emits instruction and data words at either origin', () => {
  for (const origin of [0, 10, 20]) {
    const initial = M.create('assembler');
    const start = edit(initial, { origin, pair: 1 });
    const passOne = M.action(start, 'pass');
    assert.deepEqual(M.assemblyView(passOne).symbols, { START: origin, FIRST: origin + 4, SECOND: origin + 5, TOTAL: origin + 6 });
    assert.deepEqual(M.assemblyView(passOne).output, []);
    const firstWord = M.action(passOne, 'step');
    const view = M.assemblyView(firstWord);
    assert.equal(view.row, 0);
    assert.equal(view.output[0].word, '00000001' + (origin + 4).toString(2).padStart(8, '0'));
    assert.deepEqual(M.action(firstWord, 'back'), passOne);
    const finished = M.assemblyView(M.action(firstWord, 'pass'));
    assert.equal(finished.output.length, 7);
    assert.deepEqual(finished.output.slice(4).map(word => parseInt(word.word, 2)), [7, 9, 0]);
    assert.deepEqual(M.action(firstWord, 'reset'), initial);
  }
});

test('stepping a compilation emits a draft, fixes both jumps and publishes a complete executable atomically', () => {
  let s = M.create('compiler');
  for (let i = 0; i < 3; i++) s = M.action(s, 'step-build');
  assert.equal(s.executable, null);
  assert.equal(M.describeWord(s.build.words[2]), 'JGE Count, 3, @??');
  const savedDraft = s;
  for (let i = 0; i < 3; i++) s = M.action(s, 'step-build');
  assert.equal(s.build.words[2][3], 6);
  assert.equal(M.describeWord(s.build.words[5]), 'JUMP @02');
  assert.equal(savedDraft.build.words[2][3], null);
  assert.equal(s.executable, null);
  s = M.action(s, 'step-build');
  assert.ok(s.executable.words.every(word => word.length === 4 && word.every(Number.isInteger)));
  assert.deepEqual(s.machine.output, []);
  s = M.action(s, 'step-run');
  assert.equal(s.machine.count, 0);
  assert.equal(s.machine.total, null);
  assert.deepEqual(M.action(s, 'run').machine.output, [6]);
});

test('the model CPU runs emitted instruction bytes independently of current source and prior drafts', () => {
  let s = M.action(M.create('compiler'), 'build');
  const original = s.executable;
  s = edit(s, { increment: 4 });
  assert.equal(s.executable, original);
  assert.deepEqual(M.action(s, 'run').machine.output, [6]);
  assert.deepEqual(buildAndRun(s).machine.output, [12]);
  const changed = original.words.map(word => [...word]);
  changed[3][2] = 7;
  let cpu = s.machine;
  do { cpu = M.executeWord(cpu, changed); } while (!cpu.stopped);
  assert.deepEqual(cpu.output, [21]);
});

test('a malformed source fails compilation without replacing the saved build or executing partial code', () => {
  const baseline = M.action(M.create('compiler'), 'build');
  const broken = M.action(edit(baseline, { fault: 'syntax', limit: 0 }), 'build');
  assert.match(broken.build.error, /operand/);
  assert.equal(broken.build.last, 3);
  assert.equal(broken.executable, baseline.executable);
  assert.deepEqual(M.action(broken, 'run').machine.output, [6]);
  assert.deepEqual(buildAndRun(edit(broken, { fault: 'none' })).machine.output, [0]);
  const empty = M.action(edit(M.create('compiler'), { fault: 'syntax' }), 'build');
  assert.equal(empty.executable, null);
  assert.equal(M.action(empty, 'run'), empty);
});

test('shared source reaches identical results for each permitted edit with zero and nonzero iterations', () => {
  for (const limit of [0, 1, 3]) for (const increment of [1, 2, 4]) {
    const compiled = edit(M.create('compiler'), { limit, increment });
    const interpreted = edit(M.create('interpreter'), { limit, increment });
    assert.deepEqual(M.program(compiled.config), M.program(interpreted.config));
    const c = buildAndRun(compiled).machine;
    const i = M.action(interpreted, 'run').machine;
    assert.deepEqual(c.output, [limit * increment]);
    assert.deepEqual(i.output, c.output);
    assert.equal(i.path.filter(line => line === 3).length, limit + 1);
    assert.equal(i.path.filter(line => line === 4).length, limit);
  }
});

test('stepping interpretation executes one source statement and a restart clears the trace', () => {
  const s = M.create('interpreter');
  const step = M.action(s, 'step');
  assert.equal(step.machine.count, 0);
  assert.equal(step.machine.total, null);
  assert.deepEqual(step.machine.path, [1]);
  assert.deepEqual(s.machine.path, []);
  const run = M.action(step, 'run');
  assert.equal(run.machine.steps, 16);
  assert.deepEqual(run.machine.output, [6]);
  assert.equal(M.action(run, 'step'), run);
  assert.deepEqual(M.action(run, 'restart').machine, s.machine);
});

test('a runtime error is legal to compile and faults only if execution reaches its instruction', () => {
  for (const kind of ['compiler', 'interpreter']) {
    const s = edit(M.create(kind), { fault: 'division' });
    const run = kind === 'compiler' ? buildAndRun : state => M.action(state, 'run');
    const failed = run(s);
    assert.match(failed.machine.error, /Division by zero/);
    assert.equal(failed.machine.last, 3);
    assert.deepEqual(failed.machine.output, []);
    assert.equal(M.action(failed, 'reset').config.fault, 'none');
    const skipped = run(edit(s, { limit: 0 }));
    assert.equal(skipped.machine.error, null);
    assert.deepEqual(skipped.machine.output, [0]);
  }
});

test('each standalone panel includes an initial example, a printable no-script walkthrough and its own controls', () => {
  assert.deepEqual(translatorMaterials.map(x => x.id), ['assembler', 'compiler', 'interpreter']);
  for (const { html, id } of translatorMaterials) {
    assert.ok(html.includes('data-s5-translator="' + id + '"'));
    assert.ok(html.includes('data-s5t-action="reset"'));
    assert.ok(html.includes('data-s5t-controls hidden'));
    assert.ok(html.includes('<noscript><p'));
    assert.ok(html.includes('role="status"'));
  }
});
