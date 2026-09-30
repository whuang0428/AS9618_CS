/* Deterministic teaching models shared by the browser labs and Node tests. */
const section5Models = (() => {
  const utilityCases = {
    format: { tool: 'formatter', result: 'A file-system structure is created on the known-empty volume; it is ready to organise files.', wrong: 'Formatting prepares storage organisation. It is not a recovery, malware removal or ordinary repair operation.' },
    virus: { tool: 'virus', result: 'The suspicious item is isolated from normal use. Previously damaged data still needs a recoverable copy.', wrong: 'A virus checker scans for suspicious code and can quarantine it; another utility cannot establish that this item is safe.' },
    defrag: { tool: 'defrag', result: 'HDD blocks change from A1 | B1 | Free | A2 | C | A3 to A1 | A2 | A3 | B1 | C | Free. File contents and size stay the same.', wrong: 'Defragmentation changes HDD block placement. It does not compress data or repair inconsistent file-system records.' },
    analyse: { tool: 'repair', result: 'Contents analysis reports 70 GB of documents, 25 GB of media and 5 GB free. It identifies space use; a nearly full disk does not by itself establish corruption.', wrong: 'Contents analysis reports what uses capacity. Repair is only appropriate when there is evidence of a fault.' },
    repair: { tool: 'repair', result: 'The tool inspects the inconsistent file-system record, reports it and attempts a supported correction. Recovery is not guaranteed.', wrong: 'Disk checking and repair addresses inconsistent records. Defragmenting or formatting is not a substitute for investigating the fault.' },
    compress: { tool: 'compress', result: 'A lossless archive may use fewer bits; extraction restores the original bytes. The actual size depends on the input.', wrong: 'Compression changes the data representation. It is not an independent backup, encryption or defragmentation.' },
    backup: { tool: 'backup', result: 'An available earlier copy can be restored. Changes made after the last successful backup are absent.', wrong: 'Backup software creates a recoverable copy; compression or repair cannot reconstruct a version that was never saved elsewhere.' },
  };
  const utilityWrong = {
    formatter: 'A formatter prepares a volume for file organisation; it does not recover files, remove malware or repair ordinary corruption.',
    virus: 'A virus checker detects and can quarantine suspicious code; it does not restore a file or reorganise HDD blocks.',
    defrag: 'Defragmentation reorders HDD file blocks; it does not change the file contents, compress them or repair file-system records.',
    repair: 'Disk checking and repair investigates reported faults; it does not make an independent copy or guarantee physical recovery.',
    compress: 'Compression changes representation to reduce size when possible; it is not a backup or an HDD placement tool.',
    backup: 'Backup can restore only a version actually present on an available copy; it does not diagnose malware or fix file-system records.',
  };
  function chooseUtility(problem, tool) {
    const scenario = utilityCases[problem];
    if (!scenario) throw new Error(`Unknown utility problem: ${problem}`);
    return tool === scenario.tool
      ? { correct: true, feedback: scenario.result }
      : { correct: false, feedback: `${utilityWrong[tool] ?? 'Choose a listed utility.'} ${scenario.wrong}` };
  }
  function restoreBackup({ version = 'V1', location = 'separate' } = {}) {
    return location === 'same-device'
      ? { available: false, version: null, explanation: 'The only backup was on the failed physical device, so no saved copy is available.' }
      : { available: true, version, explanation: `The surviving backup contains ${version}; the later unbacked change V2 cannot be reconstructed from it.` };
  }
  function dllResult({ installed = 'v1', interfaceName = 'MakeLabel' } = {}) {
    if (installed === 'copies') return { works: true, explanation: 'Each application contains its own copy. No shared DLL is needed, but a correction must be integrated and tested in each caller.' };
    if (installed === 'missing') return { works: false, explanation: 'Label.dll is missing. The applications cannot use the required routine.' };
    if (installed === 'incompatible' || interfaceName !== 'MakeLabel') return { works: false, explanation: 'The replacement no longer supplies the expected MakeLabel interface. The same filename is not enough.' };
    return { works: true, explanation: installed === 'v2' ? 'Compatible v2 corrects the routine; each application must load it and still needs integration testing.' : 'All three applications can call the available MakeLabel routine.' };
  }
  function compilerAction(state = {}, action, source) {
    const next = { source: state.source ?? 'A', built: state.built ?? null, output: state.output ?? null };
    if (action === 'edit') next.source = source === 'B' ? 'B' : 'A';
    if (action === 'build') next.built = next.source;
    if (action === 'run') next.output = next.built ? (next.built === 'A' ? 6 : 12) : null;
    return next;
  }
  function interpretProgram({ branch = true, limit = 3 } = {}) {
    if (!Number.isInteger(limit) || limit < 0 || limit > 100) throw new RangeError('Loop limit must be an integer from 0 to 100.');
    const visited = ['initialise Count and Total'];
    let count = 0, total = 0;
    if (branch) {
      visited.push('IF condition true', 'selected branch', 'OUTPUT "Branch selected"');
    } else visited.push('IF condition false', 'skip selected branch');
    while (count < limit) {
      visited.push(`WHILE test ${count} < ${limit}: true`, `Total ← ${total} + 2 = ${total + 2}`, `Count ← ${count} + 1 = ${count + 1}`);
      total += 2; count += 1;
    }
    visited.push(`WHILE test ${count} < ${limit}: false`, `OUTPUT ${total}`);
    return { visited, output: total, bodyRuns: count, conditionChecks: count + 1 };
  }
  function javaAction(state = {}, action, platform = 'compatible') {
    const next = { source: state.source ?? 'Hello, World!', bytecode: state.bytecode ?? null, output: state.output ?? null, platform };
    if (action === 'edit') next.source = 'Hello, Class!';
    if (action === 'compile') next.bytecode = next.source;
    if (action === 'run') next.output = next.bytecode && platform === 'compatible' ? next.bytecode : null;
    return next;
  }
  const debugPrograms = {
    wrongVariable: { label: 'Wrong variable', lines: ['Quantity <- 3', 'UnitPrice <- 4', 'Delivery <- 2', 'Cost <- Quantity * Delivery', 'OUTPUT Cost'], faulty: 3, fixed: 'Cost <- Quantity * UnitPrice' },
    wrongOperator: { label: 'Wrong operator', lines: ['Quantity <- 3', 'UnitPrice <- 4', 'Delivery <- 2', 'Cost <- Quantity + UnitPrice', 'OUTPUT Cost'], faulty: 3, fixed: 'Cost <- Quantity * UnitPrice' },
  };
  function debuggerStep(state = {}) {
    const program = debugPrograms[state.program] ?? debugPrograms.wrongVariable;
    const next = { program: state.program ?? 'wrongVariable', corrected: Boolean(state.corrected), line: state.line ?? 0, variables: { ...(state.variables ?? {}) }, output: state.output ?? null, paused: true };
    const i = next.line;
    if (i === 0) next.variables.Quantity = 3;
    if (i === 1) next.variables.UnitPrice = 4;
    if (i === 2) next.variables.Delivery = 2;
    if (i === 3) next.variables.Cost = next.corrected ? 12 : next.program === 'wrongOperator' ? 7 : 6;
    if (i === 4) next.output = next.variables.Cost;
    next.line = Math.min(i + 1, program.lines.length);
    return next;
  }
  function inspectExpression(state, expression) {
    const v = state.variables ?? {};
    if (expression === 'Quantity * UnitPrice') return v.Quantity === undefined || v.UnitPrice === undefined ? 'not available yet' : v.Quantity * v.UnitPrice;
    if (expression === 'Cost') return v.Cost ?? 'not available yet';
    return 'Choose a listed expression';
  }
  function allocateMemory(state = {}, action) {
    const next = { A: state.A ?? 3, B: state.B ?? 3, New: state.New ?? 0, denied: false };
    if (action === 'start') next.New = next.New || (8 - next.A - next.B >= 2 ? 2 : 0);
    if (action === 'terminate') next.A = 0;
    if (action === 'protect') next.denied = next.A > 0;
    next.free = 8 - next.A - next.B - next.New;
    return next;
  }
  function fileAction(state = {}, action) {
    const next = { exists: state.exists ?? false, open: state.open ?? false, name: state.name ?? 'Revision.txt', content: state.content ?? '', feedback: 'Create a file, open it, write, close and read it back.' };
    if (action === 'create') {
      if (next.exists) next.feedback = 'Create refused: the file already exists. Its stored contents are preserved.';
      else { next.exists = true; next.name = 'Revision.txt'; next.content = ''; next.open = false; next.feedback = 'An empty file now exists. Open it before reading or writing.'; }
    }
    if (action === 'open') { next.open = next.exists; next.feedback = next.exists ? 'The path resolves to the stored file; an open-file reference is available.' : 'Open fails: the file is absent.'; }
    if (action === 'close') { next.feedback = next.open ? 'Open-file resources released. Stored contents remain available.' : 'There is no open-file reference to close.'; next.open = false; }
    if (action === 'write') { if (next.exists && next.open) { next.content = 'Binary revision'; next.feedback = 'Write completed: Binary revision is stored in the file.'; } else next.feedback = 'Write fails: open an existing file first.'; }
    if (action === 'read') next.feedback = next.exists && next.open ? `Read returns ${next.content || 'empty contents'} to working memory; the stored file is unchanged.` : 'Read fails: open an existing file first.';
    if (action === 'rename') { next.feedback = next.exists ? 'The logical name changed; the stored contents did not.' : 'Rename fails: the file is absent.'; if (next.exists) next.name = 'Study.txt'; }
    if (action === 'delete') { next.feedback = next.exists ? 'The file is removed from ordinary file-system access. This simulation does not model secure erasure.' : 'Delete fails: the file is absent.'; next.exists = false; next.open = false; }
    return next;
  }
  function printerAction(state = {}, action) {
    const next = { queue: [...(state.queue ?? [])], active: state.active ?? null, nextJob: state.nextJob ?? 1, completed: state.completed ?? 0, feedback: 'Submit a job to the waiting queue.' };
    if (action === 'submit') { const job = `Job ${next.nextJob++}`; next.queue.push(job); next.feedback = `${job} joins the waiting queue. Its data has not yet entered the transfer buffer.`; }
    if (action === 'transfer') {
      if (next.active) next.feedback = 'The printer is busy. Complete the active job before transferring the next one.';
      else if (!next.queue.length) next.feedback = 'No job is waiting. Submit one first.';
      else { next.active = next.queue.shift(); next.feedback = `${next.active} leaves the queue. The driver sends device-specific commands and its data passes through a temporary buffer.`; }
    }
    if (action === 'complete') {
      if (!next.active) next.feedback = 'No job is printing. Transfer a waiting job first.';
      else { next.feedback = `${next.active} completes. Its temporary transfer buffer is released; waiting jobs remain queued.`; next.active = null; next.completed++; }
    }
    return next;
  }
  function debuggerAction(state = {}, action) {
    let next = { ...state, program: state.program ?? 'wrongVariable', corrected: Boolean(state.corrected), line: state.line ?? 0, variables: { ...(state.variables ?? {}) }, output: state.output ?? null, breakpoint: Boolean(state.breakpoint) };
    const length = debugPrograms[next.program].lines.length;
    if (action === 'breakpoint') { next.breakpoint = !next.breakpoint; next.feedback = next.breakpoint ? 'Breakpoint set before line 4. Restart if this run has already passed it.' : 'Breakpoint removed. Run continues to the end.'; }
    if (action === 'restart' || action === 'correct') { if (action === 'correct') next.corrected = true; next.line = 0; next.variables = {}; next.output = null; next.inspected = false; next.feedback = action === 'correct' ? 'Calculation corrected. Start again and verify output 12.' : 'Execution restarted; source and breakpoint are retained.'; }
    if (action === 'run') {
      const stop = next.breakpoint && next.line < 3 ? 3 : length;
      while (next.line < stop) next = { ...next, ...debuggerStep(next) };
      next.feedback = next.line === 3 ? 'Paused before line 4. The operands are ready; Cost has not been assigned.' : `Program finished. Output ${next.output}; required output 12.`;
    }
    if (action === 'step') {
      if (next.line >= length) next.feedback = 'The program has finished. Restart before stepping again.';
      else { const executed = next.line + 1; next = { ...next, ...debuggerStep(next) }; next.feedback = `Line ${executed} executed. ${next.line === 4 ? `Cost is now ${next.variables.Cost}.` : next.line === 5 ? `Output is ${next.output}.` : 'Inspect the changed variables.'}`; }
    }
    if (action === 'inspect') { next.inspected = true; next.feedback = `Variable inspection: ${Object.entries(next.variables).map(([key, value]) => `${key}=${value}`).join(', ') || 'no assignments executed yet'}. Inspection does not modify values.`; }
    if (action === 'watch') next.feedback = `Watch Quantity * UnitPrice = ${inspectExpression(next, 'Quantity * UnitPrice')}. Cost remains ${inspectExpression(next, 'Cost')}. A watch does not assign a value.`;
    return next;
  }
  return { utilityCases, chooseUtility, restoreBackup, dllResult, compilerAction, interpretProgram, javaAction, debugPrograms, debuggerStep, debuggerAction, inspectExpression, allocateMemory, fileAction, printerAction };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = section5Models;
