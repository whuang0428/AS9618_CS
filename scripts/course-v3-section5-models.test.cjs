const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('./course-v3-section5-models.js');

for (const [problem, tool] of Object.entries({ format: 'formatter', virus: 'virus', defrag: 'defrag', repair: 'repair', compress: 'compress', backup: 'backup' })) {
  test(`utility triage selects ${tool} for ${problem}`, () => {
    assert.equal(model.chooseUtility(problem, tool).correct, true);
    const wrong = model.chooseUtility(problem, tool === 'defrag' ? 'compress' : 'defrag');
    assert.equal(wrong.correct, false);
    assert.ok(wrong.feedback.length > 70);
  });
}
test('backup restores only a surviving saved version', () => {
  assert.equal(model.restoreBackup().version, 'V1');
  assert.equal(model.restoreBackup({ location: 'same-device' }).available, false);
});
test('shared library checks availability and interface compatibility', () => {
  assert.equal(model.dllResult({ installed: 'v2' }).works, true);
  assert.equal(model.dllResult({ installed: 'copies' }).works, true);
  assert.equal(model.dllResult({ installed: 'missing' }).works, false);
  assert.equal(model.dllResult({ installed: 'incompatible' }).works, false);
  assert.equal(model.dllResult({ installed: 'v2', interfaceName: 'Other' }).works, false);
});
test('compiled source edits do not change the last executable', () => {
  let state = model.compilerAction(undefined, 'build');
  assert.equal(model.compilerAction(state, 'run').output, 6);
  state = model.compilerAction(state, 'edit', 'B');
  assert.equal(model.compilerAction(state, 'run').output, 6);
  state = model.compilerAction(state, 'build');
  assert.equal(model.compilerAction(state, 'run').output, 12);
});
test('interpreter skips a branch and revisits a loop condition', () => {
  const trace = model.interpretProgram({ branch: false, limit: 3 });
  assert.equal(trace.bodyRuns, 3);
  assert.equal(trace.conditionChecks, 4);
  assert.equal(trace.output, 6);
  assert.ok(trace.visited.includes('skip selected branch'));
  assert.equal(model.interpretProgram({ limit: 0 }).bodyRuns, 0);
});
test('Java source, bytecode and JVM runtime remain separate', () => {
  let state = model.javaAction(undefined, 'compile');
  state = model.javaAction(state, 'edit');
  assert.equal(model.javaAction(state, 'run').output, 'Hello, World!');
  assert.equal(model.javaAction(state, 'run', 'missing').output, null);
  state = model.javaAction(state, 'compile');
  assert.equal(model.javaAction(state, 'run').output, 'Hello, Class!');
});
test('debugger pauses before the calculation and inspection does not assign', () => {
  let state = { program: 'wrongVariable', line: 0, variables: {}, output: null };
  for (let i = 0; i < 3; i++) state = model.debuggerStep(state);
  assert.equal(state.line, 3);
  assert.equal(state.variables.Cost, undefined);
  assert.equal(model.inspectExpression(state, 'Quantity * UnitPrice'), 12);
  assert.equal(state.variables.Cost, undefined);
  state = model.debuggerStep(state);
  assert.equal(state.variables.Cost, 6);
  state = model.debuggerStep(state);
  assert.equal(state.output, 6);
  state = { program: 'wrongVariable', corrected: true, line: 0, variables: {}, output: null };
  for (let i = 0; i < 5; i++) state = model.debuggerStep(state);
  assert.equal(state.output, 12);
});
test('memory model allocates, protects and releases working space', () => {
  let state = model.allocateMemory();
  assert.equal(state.free, 2);
  state = model.allocateMemory(state, 'protect');
  assert.equal(state.denied, true);
  state = model.allocateMemory(state, 'start');
  assert.equal(state.free, 0);
  state = model.allocateMemory(state, 'terminate');
  assert.equal(state.free, 3);
});

test('file operations preserve saved data across close, reopen and duplicate create', () => {
  let state = model.fileAction();
  assert.match(model.fileAction(state, 'read').feedback, /fails/);
  for (const action of ['create', 'open', 'write', 'close']) state = model.fileAction(state, action);
  assert.equal(state.content, 'Binary revision');
  assert.equal(state.open, false);
  assert.match(model.fileAction(state, 'read').feedback, /fails/);
  state = model.fileAction(state, 'create');
  assert.equal(state.content, 'Binary revision', 'creating an existing file must not silently erase it');
  state = model.fileAction(state, 'open');
  assert.match(model.fileAction(state, 'read').feedback, /Binary revision/);
  state = model.fileAction(state, 'rename');
  assert.equal(state.content, 'Binary revision');
  assert.equal(state.name, 'Study.txt');
});

test('printer queue, active transfer and completed work remain distinct', () => {
  let state = model.printerAction();
  state = model.printerAction(state, 'complete');
  assert.equal(state.completed, 0);
  state = model.printerAction(state, 'submit');
  state = model.printerAction(state, 'submit');
  assert.equal(state.active, null);
  assert.deepEqual(state.queue, ['Job 1', 'Job 2']);
  state = model.printerAction(state, 'transfer');
  assert.equal(state.active, 'Job 1');
  assert.deepEqual(state.queue, ['Job 2']);
  assert.deepEqual(model.printerAction(state, 'transfer').queue, ['Job 2'], 'a busy printer must retain the waiting job');
  state = model.printerAction(state, 'complete');
  assert.equal(state.active, null, 'the completed job no longer occupies the transfer buffer');
  assert.equal(state.completed, 1);
  assert.deepEqual(state.queue, ['Job 2']);
});

test('debugger run stops before a breakpoint, then continues beyond it without lying about the pause', () => {
  let state = model.debuggerAction({}, 'breakpoint');
  state = model.debuggerAction(state, 'run');
  assert.equal(state.line, 3);
  assert.equal(state.variables.Cost, undefined);
  state = model.debuggerAction(state, 'step');
  assert.equal(state.variables.Cost, 6);
  state = model.debuggerAction(state, 'run');
  assert.equal(state.line, 5);
  assert.equal(state.output, 6);
  assert.match(state.feedback, /finished/);
  assert.match(model.debuggerAction(state, 'step').feedback, /finished/);
  state = model.debuggerAction(state, 'correct');
  assert.equal(state.output, null);
  assert.deepEqual(state.variables, {});
  state = model.debuggerAction(state, 'run');
  assert.equal(state.line, 3, 'correction retains the breakpoint for a fresh verification');
  state = model.debuggerAction(state, 'run');
  assert.equal(state.output, 12);
});

test('debugger restart clears prior output while preserving the chosen source and breakpoint', () => {
  let state = model.debuggerAction({ program: 'wrongOperator' }, 'run');
  assert.equal(state.output, 7);
  state = model.debuggerAction(state, 'breakpoint');
  state = model.debuggerAction(state, 'restart');
  assert.equal(state.program, 'wrongOperator');
  assert.equal(state.breakpoint, true);
  assert.equal(state.line, 0);
  assert.equal(state.output, null);
  assert.deepEqual(state.variables, {});
});

test('interpreted branch controls an observable message and invalid loop limits cannot hang a class', () => {
  assert.ok(model.interpretProgram({ branch: true }).visited.includes('OUTPUT "Branch selected"'));
  assert.ok(!model.interpretProgram({ branch: false }).visited.includes('OUTPUT "Branch selected"'));
  for (const limit of [-1, 2.5, Infinity, NaN, 101]) assert.throws(() => model.interpretProgram({ limit }), RangeError);
});

test('contents analysis reports capacity without implying corruption', () => {
  const result = model.chooseUtility('analyse', 'repair');
  assert.equal(result.correct, true);
  assert.match(result.feedback, /70 GB/);
  assert.match(result.feedback, /does not by itself establish corruption/);
});
