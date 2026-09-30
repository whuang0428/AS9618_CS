/* Section 5 classroom experiments: deterministic, local and manually controlled. */
(() => {
  'use strict';
  const course = document.querySelector('[data-s5-classroom]');
  if (!course || typeof section5Models === 'undefined') return;
  const M = section5Models;
  const initial = new Map([...course.querySelectorAll('.s5-lab')].map(lab => [lab, lab.innerHTML]));
  const states = new WeakMap();
  const find = (lab, role) => lab.querySelector(`[data-role="${role}"]`);
  const value = (lab, role) => find(lab, role).value;
  const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const say = (lab, text) => { const result = lab.querySelector('.s5-result'); result.textContent = text; delete result.dataset.correct; };
  const show = (lab, text) => { find(lab, 'state').textContent = text; };
  const actions = items => items.map(([action, label]) => `<button type="button" data-action="${action}">${label}</button>`).join('');
  const cells = (label, items) => `<div class="s5-memory-map"><strong>${label}</strong><div class="s5-flow">${items.map(item => `<span data-memory="${escape(item)}">${escape(item)}</span>`).join('')}</div></div>`;
  const code = (lab, text) => { find(lab, 'code').querySelector('code').textContent = text; };

  function reset(lab) {
    lab.innerHTML = initial.get(lab);
    states.delete(lab);
    initialise(lab);
  }
  function initialise(lab) {
    // A journey may set a relevant starting scenario without removing the alternatives.
    if (lab.dataset.scenario && find(lab, 'scenario')) find(lab, 'scenario').value = lab.dataset.scenario;
    if (lab.dataset.problem && find(lab, 'problem')) find(lab, 'problem').value = lab.dataset.problem;
    if (lab.dataset.lab === 'os-manager') drawOs(lab, true);
    if (lab.dataset.lab === 'utility') drawUtility(lab);
    if (lab.dataset.lab === 'compiler') drawCompiler(lab);
    if (lab.dataset.lab === 'interpreter') drawInterpreter(lab);
    if (lab.dataset.lab === 'java') drawJava(lab);
    if (lab.dataset.lab === 'ide-author') drawIde(lab);
    if (lab.dataset.lab === 'debugger') drawDebugger(lab);
  }
  course.addEventListener('s5:reset', event => {
    const target = event.target;
    if (target.matches('.s5-lab')) reset(target);
    else target.querySelectorAll('.s5-lab').forEach(reset);
  }, true);
  course.addEventListener('input', event => {
    const lab = event.target.closest('.s5-lab');
    if (!lab) return;
    if (lab.dataset.lab === 'library') say(lab, 'Argument changed. Predict the result, then call SQRT again.');
    if (lab.dataset.lab === 'decision') say(lab, 'Your reasoning has changed. Compare again when it is ready.');
  });
  course.addEventListener('change', event => {
    const lab = event.target.closest('.s5-lab');
    if (!lab) return;
    const type = lab.dataset.lab;
    if (type === 'os-manager') { states.delete(lab); drawOs(lab, true); }
    if (type === 'utility') { states.delete(lab); drawUtility(lab); say(lab, 'New problem. Choose a suitable tool and observe its effect.'); }
    if (type === 'debugger') { states.delete(lab); drawDebugger(lab); say(lab, 'New program at its initial state. Predict the output before running.'); }
    if (type === 'translation') say(lab, 'Source changed. Choose a translator for this source type.');
    if (type === 'library') say(lab, 'Argument changed. Predict the result, then call SQRT again.');
    if (type === 'interpreter') { states.delete(lab); drawInterpreter(lab); say(lab, 'Conditions changed; the trace is reset. Predict the path, then step or run.'); }
    if (type === 'decision') say(lab, 'Requirement or choice changed. Update your reason before comparing.');
    if (type === 'java') { states.set(lab, { ...(states.get(lab) ?? M.javaAction()), platform: value(lab, 'platform'), output: null }); drawJava(lab); say(lab, 'Destination changed; source and bytecode are retained. Run to test this destination.'); }
    if (type === 'ide-author') say(lab, `Selected suggestion: ${value(lab, 'identifier')}. Accept it to change the source; selecting alone does not insert it.`);
  });
  course.addEventListener('click', event => {
    const button = event.target.closest('.s5-lab [data-action]');
    if (!button || !course.contains(button)) return;
    const lab = button.closest('.s5-lab'), action = button.dataset.action, type = lab.dataset.lab;
    if (action === 'reset-lab') { reset(lab); return; }
    if (type === 'os-hub') {
      const flows = {
        save: 'Before: stored file says Room 4. Editor asks to save Room 7 → OS checks write permission → file service finds the path → storage service writes. After: stored file says Room 7; success returns.',
        ram: 'Before: browser needs working space. Browser requests RAM → OS locates available memory → protects the assigned region. After: browser may use that region; no file has been saved.',
        protected: 'Before: protected file says Room 4. Guest requests a write → OS checks identity and write right → permission denied. After: stored file still says Room 4.',
        audio: 'Before: the music application has audio data. It requests output → OS device service uses a suitable driver → data passes through a temporary buffer. After: the output device receives audio data.',
      };
      say(lab, flows[action]);
    }
    if (type === 'os-manager') actOs(lab, action);
    if (type === 'process') actProcess(lab, action);
    if (type === 'utility') actUtility(lab, action);
    if (type === 'library') {
      if (action === 'compare') say(lab, 'From scratch: implement → test → fix → integrate. Reuse: read the interface → call the routine → test integration. Reuse can save implementation and testing effort; the caller still needs testing.');
      else {
        const raw = value(lab, 'argument').trim(), n = Number(raw);
        say(lab, raw && Number.isFinite(n) && n >= 0 ? `Before: argument ${n}. Call SQRT(${n}) → routine returns ${Math.sqrt(n)}. After: the caller receives this value and must use it. Returning a value does not print it automatically.` : 'No call was made. Enter a non-negative number; an empty value or a negative number does not meet this routine’s precondition.');
      }
    }
    if (type === 'dll') {
      const answer = M.dllResult({ installed: action });
      say(lab, answer.explanation);
      lab.querySelector('.s5-flow').innerHTML = action === 'copies' ? '<span>App A + local copy</span><span>App B + local copy</span><span>App C + local copy</span>' : `<span>App A · App B · App C</span><span>${action === 'missing' ? 'Label.dll absent' : `Label.dll · ${action}`}</span><span>${answer.works ? 'MakeLabel call can complete' : 'Required call cannot complete'}</span>`;
    }
    if (type === 'translation') {
      const source = value(lab, 'source'), valid = source === 'assembly' ? action === 'assembler' : action !== 'assembler';
      const descriptions = { assembler: 'Assembly mnemonics → assembler → target machine/object code. The calculation happens when the translated instructions execute.', compiler: 'High-level source → compiler → built target code (linking may be needed) → later execution.', interpreter: 'High-level source → interpreter translates and executes the selected path. Branches may skip source and loops may revisit it.' };
      say(lab, `${valid ? 'This source type is suitable. ' : 'Source mismatch in this teaching model. '}${descriptions[action]}`);
    }
    if (type === 'compiler') {
      const state = M.compilerAction(states.get(lab), action, 'B'); states.set(lab, state); drawCompiler(lab);
      say(lab, action === 'edit' ? 'Source B is now saved. The executable and last-run record remain unchanged.' : action === 'build' ? `Source ${state.source} has been built. The executable is now ${state.built}; it has not automatically run.` : state.output === null ? 'Run cannot start: build an executable first.' : `Executable ${state.built} ran and printed ${state.output}. Compare its version with the saved source.`);
    }
    if (type === 'interpreter') {
      const trace = M.interpretProgram({ branch: value(lab, 'branch') === 'true', limit: Number(value(lab, 'limit')) });
      const progress = states.get(lab)?.progress ?? 0;
      const next = action === 'run' ? trace.visited.length : Math.min(progress + 1, trace.visited.length);
      states.set(lab, { progress: next }); drawInterpreter(lab);
      say(lab, next === trace.visited.length ? `Finished: ${trace.bodyRuns} loop-body runs, ${trace.conditionChecks} condition checks, final numeric output ${trace.output}. The IF message appears only when its branch is selected.` : `Executed step ${next} of ${trace.visited.length}. Predict the next executed operation.`);
    }
    if (type === 'decision') {
      const requirement = value(lab, 'requirement'), choice = value(lab, 'choice'), reason = value(lab, 'reason').trim();
      const examples = { edit: ['interpreter', 'A suitable interpreter can provide prompt test feedback while source is repeatedly changed.'], ship: ['compiler', 'A compatible native executable can be reused without supplying source or retranslating it for each run.'], port: ['java', 'The same bytecode needs a compatible JVM on each host. It is not universal native CPU code.'] };
      say(lab, `${reason ? 'Compare your reason with the model. ' : 'State a reason based on the requirement. '}${choice === examples[requirement][0] ? 'The selected route fits this scenario. ' : 'The selected route needs a different scenario-based justification. '}${examples[requirement][1]} This comparison does not automatically mark your written explanation.`);
    }
    if (type === 'java') {
      const state = M.javaAction(states.get(lab), action, value(lab, 'platform')); states.set(lab, state); drawJava(lab);
      say(lab, action === 'edit' ? 'Only Hello.java changed. Existing Hello.class bytecode is unchanged.' : action === 'compile' ? 'javac has compiled the current source to Hello.class. Compilation does not execute the class.' : state.output ? `The compatible JVM executed the available bytecode and printed ${state.output}.` : !state.bytecode ? 'Run fails: Hello.class has not been compiled yet.' : 'Run fails: this destination has no compatible JVM. The existing bytecode remains unchanged.');
    }
    if (type === 'ide-author') actIde(lab, action);
    if (type === 'debugger') { const state = M.debuggerAction(states.get(lab) ?? { program: value(lab, 'program') }, action); states.set(lab, state); drawDebugger(lab); say(lab, state.feedback); }
  });

  function drawOs(lab, initialView = false) {
    const scenario = value(lab, 'scenario');
    const choices = {
      memory: [['start', 'Start a new process'], ['terminate', 'Terminate process A'], ['protect', 'B tries to access A’s region']],
      file: [['create', 'Create file'], ['open', 'Open'], ['write', 'Write'], ['close', 'Close'], ['read', 'Read'], ['rename', 'Rename'], ['delete', 'Delete in this model']],
      security: [['login', 'Log in as User B'], ['read', 'Read SharedFile'], ['write', 'Write SharedFile']],
      printer: [['submit', 'Submit job'], ['transfer', 'Transfer next job'], ['complete', 'Complete printing']],
    };
    find(lab, 'actions').innerHTML = actions(choices[scenario]);
    const state = states.get(lab) ?? {};
    if (scenario === 'memory') {
      const memory = M.allocateMemory(state);
      const contents = [...Array(memory.A).fill('A'), ...Array(memory.B).fill('B'), ...Array(memory.New).fill('New'), ...Array(memory.free).fill('Free')];
      find(lab, 'state').innerHTML = `${cells('Eight units available to applications (OS allocation excluded)', contents)}<p>A: ${memory.A} · B: ${memory.B} · New: ${memory.New} · Free: ${memory.free}</p>`;
    }
    if (scenario === 'file') { const file = M.fileAction(state); show(lab, `Path: School/Notes/${file.name}\nStored file: ${file.exists ? (file.content || '(empty)') : 'not present'}\nOpen-file reference: ${file.open ? 'available' : 'none'}`); }
    if (scenario === 'security') show(lab, `User B: ${state.loggedIn ? 'authenticated' : 'not authenticated'}\nRights: read allowed; write denied\nSharedFile stored content: Room 4`);
    if (scenario === 'printer') { const printer = M.printerAction(state); show(lab, `Queue: ${printer.queue.join(', ') || 'empty'}\nTransfer buffer: ${printer.active ? `temporary data for ${printer.active}` : 'empty'}\nDriver: ready to send device-specific commands\nPrinter: ${printer.active ? `printing ${printer.active}` : 'idle'}\nCompleted jobs: ${printer.completed}`); }
    if (initialView) say(lab, 'Initial state. Predict what one operation will change, then try it.');
  }
  function actOs(lab, action) {
    const scenario = value(lab, 'scenario'), before = states.get(lab) ?? {};
    if (scenario === 'memory') {
      const state = M.allocateMemory(before, action); states.set(lab, state);
      say(lab, action === 'protect' ? (state.denied ? 'Access denied. B cannot write into A’s protected allocation.' : 'A has exited; this model has no remaining A allocation to access.') : action === 'terminate' ? 'A has exited and its RAM is available for reuse. Saving files is a separate operation.' : before.New ? 'The new process already has its two units; no second allocation was made.' : 'Two free RAM units are allocated to the new process.');
    }
    if (scenario === 'file') { const state = M.fileAction(before, action); states.set(lab, state); say(lab, state.feedback); }
    if (scenario === 'security') {
      const state = { loggedIn: action === 'login' || Boolean(before.loggedIn) }; states.set(lab, state);
      say(lab, action === 'login' ? 'Authentication succeeds. User B is identified; the read and write permissions remain unchanged.' : !state.loggedIn ? 'No file operation occurs. Authenticate first.' : action === 'read' ? 'Read allowed. Room 4 is supplied to working memory; the stored content is unchanged.' : 'Write denied. User B is authenticated but lacks permission; stored content remains Room 4.');
    }
    if (scenario === 'printer') { const state = M.printerAction(before, action); states.set(lab, state); say(lab, state.feedback); }
    drawOs(lab);
  }
  function actProcess(lab, action) {
    const before = states.get(lab) ?? { waiting: false };
    const timeline = find(lab, 'timeline');
    if (action === 'reset') { states.delete(lab); timeline.innerHTML = '<li>A running on the single CPU core; B ready</li>'; say(lab, 'Initial state restored. One selected process uses the core at a time.'); return; }
    if (action === 'wait') {
      if (before.waiting) { say(lab, 'A is already waiting. Complete its I/O before asking it to continue.'); return; }
      states.set(lab, { waiting: true }); timeline.innerHTML = '<li>Before: A running; B ready</li><li>A requests slow I/O; its execution context is preserved</li><li>After: A waiting; B selected to use the CPU</li>';
      say(lab, 'The CPU can work on B while A waits. The two processes do not execute simultaneously on this one core.');
    } else if (before.waiting) {
      states.set(lab, { waiting: false }); timeline.innerHTML = '<li>Before: A waiting; B running</li><li>I/O completes: A becomes ready</li><li>Later: the OS selects A and resumes its saved context</li>';
      say(lab, 'Ready means able to run. A runs only when the OS selects it; completion does not itself guarantee immediate CPU time.');
    } else say(lab, 'There is no outstanding I/O for A. Start with A requests I/O.');
  }
  function drawUtility(lab, changed = false) {
    const problem = value(lab, 'problem');
    const scenes = {
      format: changed ? 'Before: known-empty volume, no file system.\nAfter: file-system structure created; ready to organise files.' : 'Initial state: known-empty volume with no file-system structure.',
      virus: changed ? 'Before: suspicious file detected.\nAfter: scanning leads to quarantine in this example. Earlier damage remains; no scan proves every threat absent.' : 'Initial state: a suspicious executable is present. No scan has been performed.',
      analyse: changed ? 'Documents: 70 GB\nMedia: 25 GB\nFree: 5 GB\nTotal: 100 GB. Analysis reports capacity use; it does not prove damage or delete files.' : 'A 100 GB disk has little free space. Identify which data occupies it before choosing an action.',
      repair: changed ? 'Before: inconsistent file-system records.\nAfter: reported inconsistency and a supported correction attempt. Recovery is not guaranteed.' : 'Initial report: file-system records are inconsistent. This is different from merely having little free space.',
      compress: changed ? 'Before: 100 units of original data.\nAfter: a conceptual lossless archive uses 62 units. This illustrative size is not a fixed ratio. Decompress to check identity.' : 'Original data: 100 units. Compression size depends on the data and archive overhead.',
      backup: '09:00: V1 backed up\n09:30: working file edited to V2\n09:40: working physical disk fails before the next backup. The restore result depends on which copy survived.',
    };
    if (problem === 'defrag') find(lab, 'state').innerHTML = `${cells('HDD before', ['A1', 'B1', 'Free', 'A2', 'C', 'A3'])}${changed ? cells('HDD after', ['A1', 'A2', 'A3', 'B1', 'C', 'Free']) : '<p>File A occupies separated blocks. Predict how rearranging them affects mechanical seeking.</p>'}<p>The file contents and number of blocks stay the same. SSDs have no mechanical read head.</p>`;
    else show(lab, scenes[problem]);
    find(lab, 'subactions').innerHTML = problem === 'defrag' ? actions(changed ? [['read-before', 'Read file A before'], ['read-after', 'Read file A after']] : [['read-before', 'Read file A before']]) : changed && problem === 'backup' ? actions([['restore-separate', 'Restore from surviving separate device'], ['restore-same', 'Try copy on failed device']]) : changed && problem === 'compress' ? actions([['decompress', 'Decompress and compare']]) : '';
  }
  function actUtility(lab, action) {
    if (action === 'read-before' || action === 'read-after') {
      const path = action === 'read-before' ? 'A1 at position 1 → A2 at position 4 → A3 at position 6' : 'A1 at position 1 → A2 at position 2 → A3 at position 3';
      say(lab, `Read file A in content order: ${path}. ${action === 'read-before' ? 'The head must reach separated locations.' : 'The blocks are adjacent, so extra seeking between separated file fragments is reduced.'} This flat placement diagram illustrates the principle; it is not a physical disk geometry or a timing measurement.`); return;
    }
    if (action.startsWith('restore-')) {
      const restored = M.restoreBackup({ location: action === 'restore-same' ? 'same-device' : 'separate' });
      show(lab, restored.available ? 'Before: working disk failed.\nAfter: V1 restored from the surviving backup. V2 was never backed up.' : 'Before: working disk and its only backup copy are on the failed device.\nAfter: no surviving copy is available to restore.');
      say(lab, restored.explanation); return;
    }
    if (action === 'decompress') { show(lab, 'Original: 100 units → conceptual archive: 62 units → restored: 100 identical units.\nLossless reconstruction preserves the original bytes.'); say(lab, 'The original contents are restored. Small or already compressed inputs may not become smaller.'); return; }
    const choice = M.chooseUtility(value(lab, 'problem'), action); drawUtility(lab, choice.correct);
    say(lab, `${choice.correct ? 'Suitable tool. ' : 'This tool performs a different job; the initial scenario is shown. '}${choice.feedback}`);
    lab.querySelector('.s5-result').dataset.correct = String(choice.correct);
  }
  function drawCompiler(lab) {
    const state = states.get(lab) ?? M.compilerAction();
    code(lab, `DECLARE Count, Total : INTEGER\nCount ← 0\nTotal ← 0\nWHILE Count < 3\n  Total ← Total + ${state.source === 'A' ? 2 : 4}\n  Count ← Count + 1\nENDWHILE\nOUTPUT Total`);
    show(lab, `Saved source: ${state.source}\nLast successful executable: ${state.built ?? 'none'}\nHistorical last-run output: ${state.output ?? 'no run yet'}\nBuild and Run are separate operations.`);
  }
  function drawInterpreter(lab) {
    const trace = M.interpretProgram({ branch: value(lab, 'branch') === 'true', limit: Number(value(lab, 'limit')) });
    const progress = states.get(lab)?.progress ?? 0;
    code(lab, `DECLARE Count, Total, Limit : INTEGER\nDECLARE Condition : BOOLEAN\nLimit ← ${value(lab, 'limit')}\nCondition ← ${value(lab, 'branch') === 'true' ? 'TRUE' : 'FALSE'}\nCount ← 0\nTotal ← 0\nIF Condition THEN\n  OUTPUT "Branch selected"\nENDIF\nWHILE Count < Limit\n  Total ← Total + 2\n  Count ← Count + 1\nENDWHILE\nOUTPUT Total`);
    find(lab, 'trace').replaceChildren(...(progress ? trace.visited.slice(0, progress) : ['Initial state: no program statements have executed.']).map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  }
  function drawJava(lab) {
    const state = states.get(lab) ?? M.javaAction();
    show(lab, `Hello.java source message: ${state.source}\nHello.class bytecode message: ${state.bytecode ?? 'not compiled'}\nDestination runtime: ${value(lab, 'platform') === 'compatible' ? 'compatible JVM' : 'no compatible JVM'}\nHistorical last-run output: ${state.output ?? 'none for this destination'}\nThe compiler javac is available on the development computer in this model.`);
  }
  const initialIde = () => ({ identifier: 'Delivery', missingEnd: false, pretty: false, folded: false });
  function drawIde(lab) {
    const state = states.get(lab) ?? initialIde(), indent = state.pretty ? '  ' : '';
    const body = state.folded ? `${indent}… 2 statements folded` : `${indent}Cost ← Quantity * ${state.identifier}\n${indent}OUTPUT Cost`;
    code(lab, `DECLARE Quantity, UnitPrice, Delivery, Cost : INTEGER\nQuantity ← 3\nUnitPrice ← 4\nDelivery ← 2\nIF Quantity > 0 THEN\n${body}${state.missingEnd ? '' : '\nENDIF'}`);
  }
  function actIde(lab, action) {
    const state = states.get(lab) ?? initialIde();
    if (action === 'suggest') say(lab, 'Both UnitPrice and Delivery are available integer names. The required cost is Quantity × UnitPrice; choose by meaning.');
    if (action === 'accept') { state.identifier = value(lab, 'identifier'); say(lab, `Inserted ${state.identifier}. It is a valid identifier; run the calculation to check its meaning.`); }
    if (action === 'keyword') { state.missingEnd = !state.missingEnd; say(lab, state.missingEnd ? 'ENDIF removed. The dynamic syntax checker reports an unclosed IF block.' : 'ENDIF restored. That syntax error is gone; the arithmetic still needs checking.'); }
    if (action === 'syntax') say(lab, state.missingEnd ? 'Syntax diagnostic: IF has no matching ENDIF. Restore it before this model can run.' : `No syntax error detected. Quantity * ${state.identifier} is grammatically valid, which does not establish that it is the required calculation.`);
    if (action === 'pretty') { state.pretty = !state.pretty; say(lab, 'Indentation changes how the structure is displayed. The selected operations are unchanged.'); }
    if (action === 'fold') { state.folded = !state.folded; say(lab, state.folded ? 'The IF body is hidden in the editor, but both statements remain in the program.' : 'The IF body is visible again. No statement was added.'); }
    if (action === 'execute') say(lab, state.missingEnd ? 'Run blocked: the missing ENDIF must be restored.' : `Actual output: ${state.identifier === 'UnitPrice' ? 12 : 6}. Required output: 12. Formatting and folding do not change the executed calculation.`);
    states.set(lab, state); drawIde(lab);
  }
  function drawDebugger(lab) {
    const state = states.get(lab) ?? { program: value(lab, 'program'), corrected: false, line: 0, variables: {}, output: null, breakpoint: false };
    const program = M.debugPrograms[state.program];
    code(lab, program.lines.map((text, index) => `${index === state.line ? '▶' : ' '} ${state.breakpoint && index === 3 ? '●' : ' '} ${index + 1}. ${state.corrected && index === 3 ? program.fixed : text}`).join('\n'));
    find(lab, 'variables').textContent = state.inspected ? (Object.entries(state.variables).map(([key, v]) => `${key} = ${v}`).join(' · ') || 'No assignments executed yet.') : 'Values are not yet revealed. Pause or step, then Inspect variables.';
    find(lab, 'output').textContent = state.output === null ? 'No OUTPUT statement has executed.' : `Actual output: ${state.output} · Required output: 12`;
    const breakpoint = lab.querySelector('[data-action="breakpoint"]'); breakpoint.setAttribute('aria-pressed', String(state.breakpoint)); breakpoint.textContent = state.breakpoint ? 'Remove breakpoint' : 'Set breakpoint';
  }
  course.querySelectorAll('.s5-lab').forEach(initialise);
})();
