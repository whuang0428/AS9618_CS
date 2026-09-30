(() => {
  const course = document.querySelector('.s5-course');
  if (!course) return;
  const blocks = [...course.querySelectorAll('.s5-block')];
  const phases = ['think', 'learn', 'apply', 'distill'];
  const blockSelect = course.querySelector('[data-role="block-select"]');
  const progress = course.querySelector('.s5-progress');
  const initialLabs = new Map([...course.querySelectorAll('.s5-lab')].map(lab => [lab, lab.innerHTML]));
  const labState = new WeakMap();
  let current = 0, step = 0, revealAll = false;
  const result = lab => lab.querySelector('.s5-result');
  const stateArea = lab => lab.querySelector('[data-role="state"]');
  function updateView() {
    const revision = course.dataset.mode === 'revision';
    course.querySelector('.s5-teaching').hidden = revision;
    course.querySelector('.s5-revision').hidden = !revision;
    course.querySelector('.s5-teacher-controls').hidden = revision;
    blocks.forEach((block, i) => {
      block.hidden = !revealAll && i !== current;
      block.querySelectorAll('.s5-phase').forEach((phase, j) => phase.hidden = !revealAll && j > step);
    });
    blockSelect.value = String(current);
    progress.textContent = `${current + 1} / ${blocks.length} knowledge blocks`;
    course.querySelectorAll('[data-mode-button]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.modeButton === course.dataset.mode)));
  }
  function resetLab(lab) {
    if (!lab) return;
    lab.innerHTML = initialLabs.get(lab);
    labState.delete(lab);
    initialiseLab(lab);
  }
  function initialiseLab(lab) {
    if (lab.dataset.lab === 'os-manager') drawOsManager(lab);
    if (lab.dataset.lab === 'compiler') drawCompiler(lab);
    if (lab.dataset.lab === 'java') drawJava(lab);
    if (lab.dataset.lab === 'ide-author') drawIdeAuthor(lab);
    if (lab.dataset.lab === 'debugger') drawDebugger(lab);
    if (lab.dataset.lab === 'utility') { drawUtilityScene(lab); result(lab).textContent = 'Choose a tool to see its consequence and limits.'; }
  }
  course.querySelectorAll('[data-mode-button]').forEach(button => button.addEventListener('click', () => {
    course.dataset.mode = button.dataset.modeButton;
    revealAll = false;
    updateView();
  }));
  blockSelect.addEventListener('change', () => { current = Number(blockSelect.value); step = 0; revealAll = false; updateView(); blocks[current].scrollIntoView({ block: 'start' }); });
  course.querySelector('.s5-teacher-controls').addEventListener('click', event => {
    const button = event.target.closest('[data-teach]');
    if (!button) return;
    const action = button.dataset.teach;
    if (action === 'previous') { if (step > 0) step--; else if (current > 0) { current--; step = 3; } revealAll = false; }
    if (action === 'next') { if (step < 3) step++; else if (current < blocks.length - 1) { current++; step = 0; } revealAll = false; }
    if (action === 'explanation') step = Math.max(step, 1);
    if (action === 'answer') { step = Math.max(step, 2); blocks[current].querySelectorAll('details[data-answer], .practice-question details').forEach(d => d.open = true); }
    if (action === 'hide') course.querySelectorAll('.s5-course details[data-answer], .practice-question details, .exam-reveal').forEach(d => d.open = false);
    if (action === 'all') { revealAll = true; step = 3; }
    if (action === 'activity') {
      const block = blocks[current];
      resetLab(block.querySelector('.s5-lab'));
      block.querySelectorAll('textarea').forEach(input => input.value = '');
      block.querySelectorAll('details').forEach(d => d.open = false);
    }
    if (action === 'lesson') {
      current = 0; step = 0; revealAll = false; course.dataset.mode = 'teaching';
      course.querySelectorAll('textarea').forEach(input => input.value = '');
      course.querySelectorAll('details').forEach(d => d.open = false);
      course.querySelectorAll('.s5-lab').forEach(resetLab);
    }
    updateView();
  });
  course.addEventListener('change', event => {
    const lab = event.target.closest('.s5-lab');
    if (!lab) return;
    if (lab.dataset.lab === 'os-manager') drawOsManager(lab);
    if (lab.dataset.lab === 'utility') { drawUtilityScene(lab); result(lab).textContent = 'Choose a tool to see its consequence and limits.'; }
    if (lab.dataset.lab === 'debugger') { labState.delete(lab); drawDebugger(lab); }
  });
  course.addEventListener('click', event => {
    const button = event.target.closest('.s5-lab [data-action]');
    if (!button) return;
    const lab = button.closest('.s5-lab');
    const action = button.dataset.action;
    const type = lab.dataset.lab;
    if (type === 'os-hub') {
      const flows = {
        save: 'Editor → OS checks write permission → file service locates the path → storage service writes the file → success returns.',
        ram: 'Browser → OS checks available RAM → memory region allocated and protected → browser can use its working space.',
        protected: 'Guest → OS checks identity and write right → denied → protected file remains unchanged.',
        audio: 'Music app → OS device service and suitable driver → buffered audio data reaches the output device.',
      };
      result(lab).textContent = flows[action];
    }
    if (type === 'os-manager') actOsManager(lab, action);
    if (type === 'process') {
      const timeline = lab.querySelector('[data-role="timeline"]');
      const state = labState.get(lab) ?? { waiting: false };
      const hadWait = state.waiting;
      if (action === 'reset') { state.waiting = false; timeline.innerHTML = '<li>A running on CPU</li>'; }
      else if (action === 'wait') { state.waiting = true; timeline.innerHTML = '<li>A running</li><li>A waits for I/O; its execution context is kept</li><li>B ready and selected for the single CPU core</li>'; }
      else if (state.waiting) { state.waiting = false; timeline.innerHTML = '<li>A waits; B runs</li><li>I/O completion makes A ready</li><li>OS may later select A and resume it</li>'; }
      labState.set(lab, state);
      result(lab).textContent = action === 'reset' ? 'One core executes one selected process at a time.' : action === 'complete' && !hadWait ? 'A has not requested I/O in this run. Start with A requests I/O.' : 'The OS coordinates CPU time; this timeline shows no simultaneous instructions on one core.';
    }
    if (type === 'utility') {
      const problem = lab.querySelector('[data-role="problem"]').value;
      if (action === 'restore-separate' || action === 'restore-same') {
        const restored = section5Models.restoreBackup({ location: action === 'restore-same' ? 'same-device' : 'separate' });
        stateArea(lab).textContent = restored.available ? `Restored file: ${restored.version}\nWorking V2 was never included in the surviving backup.` : 'Restore failed: no surviving backup is available.';
        result(lab).textContent = restored.explanation;
        return;
      }
      if (action === 'decompress') {
        stateArea(lab).textContent = 'Conceptual archive: perhaps 62 units → decompress → original 100-unit data restored identically.';
        result(lab).textContent = 'Lossless decompression restores the original bytes. The 62-unit example is not a universal compression ratio.';
        return;
      }
      const choice = section5Models.chooseUtility(problem, action);
      result(lab).textContent = `${choice.correct ? 'Suitable tool. ' : 'Different job. '}${choice.feedback}`;
      result(lab).dataset.correct = String(choice.correct);
      drawUtilityScene(lab, choice.correct);
    }
    if (type === 'library') {
      if (action === 'compare') result(lab).textContent = 'Build from scratch: implement → test → fix → integrate. Reuse: understand documented interface → call → test integration. Reuse may save effort, but it does not eliminate caller testing.';
      else {
        const n = Number(lab.querySelector('[data-role="argument"]').value);
        result(lab).textContent = Number.isFinite(n) && n >= 0 ? `Application calls SQRT(${n}) → library returns ${Math.sqrt(n)} → caller uses that result. The caller must test the integration.` : 'Precondition failed: SQRT in this example accepts a non-negative number. The caller must handle this input before calling it.';
      }
    }
    if (type === 'dll') {
      result(lab).textContent = section5Models.dllResult({ installed: action }).explanation;
      lab.querySelector('.s5-flow').innerHTML = action === 'copies' ? '<span>App A copy</span><span>App B copy</span><span>App C copy</span>' : '<span>App A · App B · App C</span><span>Label.dll</span><span>Routine result</span>';
    }
    if (type === 'translation') {
      const source = lab.querySelector('[data-role="source"]').value;
      const valid = source === 'assembly' ? action === 'assembler' : action !== 'assembler';
      const explanation = { assembler: 'Assembler translates target assembly mnemonics into target machine or object code. Execution occurs later.', compiler: 'Compiler translates high-level source before the built code runs; linking may be required.', interpreter: 'Interpreter translates and executes high-level source along the selected runtime path.' };
      result(lab).textContent = `${valid ? 'Suitable source type. ' : 'Source mismatch. '}${explanation[action]}`;
    }
    if (type === 'compiler') {
      const prior = labState.get(lab) ?? section5Models.compilerAction();
      const next = section5Models.compilerAction(prior, action, 'B');
      labState.set(lab, next); drawCompiler(lab);
      result(lab).textContent = action === 'edit' ? 'Source B is saved. The last executable is unchanged until Build succeeds.' : action === 'build' ? `Build ${next.source} succeeded. The executable now contains version ${next.built}.` : next.output === null ? 'No executable has been built yet.' : `Run executed version ${next.built} and printed ${next.output}.`;
    }
    if (type === 'interpreter') {
      const trace = section5Models.interpretProgram({ branch: lab.querySelector('[data-role="branch"]').value === 'true', limit: Number(lab.querySelector('[data-role="limit"]').value) });
      lab.querySelector('[data-role="trace"]').replaceChildren(...trace.visited.map(s => { const li = document.createElement('li'); li.textContent = s; return li; }));
      result(lab).textContent = `${trace.bodyRuns} body runs; ${trace.conditionChecks} condition checks; output ${trace.output}. No permanent native executable was produced by this model.`;
    }
    if (type === 'decision') {
      const requirement = lab.querySelector('[data-role="requirement"]').value;
      const choice = lab.querySelector('[data-role="choice"]').value;
      const reason = lab.querySelector('[data-role="reason"]').value.trim();
      const models = { edit: ['interpreter', 'Frequent edits and prompt test feedback can favour interpretation; a suitable interpreter environment is needed.'], ship: ['compiler', 'A compatible native executable can be reused for repeated runs without distributing source or retranslating it each time.'], port: ['java', 'A Java class contains bytecode; each destination needs a compatible JVM, not identical native CPU instructions.'] };
      result(lab).textContent = `${reason ? 'Your justification is recorded for comparison. ' : 'Write a justification first. '}${choice === models[requirement][0] ? 'This choice fits the stated requirement. ' : 'This choice needs a stronger scenario-based reason. '}${models[requirement][1]}`;
    }
    if (type === 'java') {
      const prior = labState.get(lab) ?? section5Models.javaAction();
      const next = section5Models.javaAction(prior, action, lab.querySelector('[data-role="platform"]').value);
      labState.set(lab, next); drawJava(lab);
      result(lab).textContent = action === 'edit' ? 'Source changed; existing bytecode remains old until javac succeeds.' : action === 'compile' ? 'javac produced Hello.class bytecode from the current source.' : next.output ? `The compatible JVM executed the class and printed ${next.output}.` : 'No compatible runnable class and JVM combination is available.';
    }
    if (type === 'ide-author') {
      const state = labState.get(lab) ?? { identifier: 'Delivery', missingEnd: false, pretty: false, folded: false };
      if (action === 'suggest') result(lab).textContent = 'Prompt: UnitPrice and Delivery are both available names. Choose based on the required calculation, not grammar alone.';
      if (action === 'accept') { state.identifier = lab.querySelector('[data-role="identifier"]').value; result(lab).textContent = `Inserted ${state.identifier}. The IDE suggested a valid name; the programmer is responsible for choosing the intended one.`; }
      if (action === 'keyword') { state.missingEnd = !state.missingEnd; result(lab).textContent = state.missingEnd ? 'ENDIF has been removed. Check syntax to see the diagnostic.' : 'ENDIF restored. Check syntax again.'; }
      if (action === 'syntax') result(lab).textContent = state.missingEnd ? 'Dynamic syntax check: missing ENDIF for the IF block. Add the closing keyword before running.' : `No syntax error detected. Quantity * ${state.identifier} is grammatically valid; check whether it meets the requirement.`;
      if (action === 'pretty') { state.pretty = !state.pretty; result(lab).textContent = 'Prettyprint changed indentation and spacing only; it did not change the algorithm.'; }
      if (action === 'fold') { state.folded = !state.folded; result(lab).textContent = state.folded ? 'The inner source is hidden in the editor; it still executes when selected.' : 'The source is visible again; execution behaviour is unchanged.'; }
      if (action === 'execute') result(lab).textContent = state.missingEnd ? 'The missing ENDIF prevents this program from running in the model.' : `Program output: ${state.identifier === 'UnitPrice' ? 12 : 6}. Folding and prettyprint do not change this result.`;
      labState.set(lab, state); drawIdeAuthor(lab);
    }
    if (type === 'debugger') actDebugger(lab, action);
  });
  function drawOsManager(lab) {
    const scenario = lab.querySelector('[data-role="scenario"]').value;
    labState.delete(lab);
    const actions = { memory: [['start','Start new process'],['terminate','Terminate process A'],['protect','B accesses A’s region']], file: [['create','Create Notes/Revision.txt'],['open','Open'],['read','Read'],['write','Write'],['rename','Rename'],['delete','Delete']], security: [['login','Log in as User B'],['read','Read SharedFile'],['write','Write SharedFile']], printer: [['submit','Submit next job'],['print','Print next job']] };
    lab.querySelector('[data-role="actions"]').innerHTML = actions[scenario].map(([a,t])=>`<button type="button" data-action="${a}">${t}</button>`).join('');
    const state = { memory: 'RAM: A A A | B B B | Free Free', file: 'School/\n├── homework.txt\n├── timetable.txt\n└── Notes/', security: 'User B: not signed in. SharedFile: read allowed, write denied.', printer: 'Queue: empty\nBuffer: empty\nDriver: ready\nDevice: idle' };
    stateArea(lab).textContent = state[scenario];
    result(lab).textContent = 'Choose an operation and observe the state.';
  }
  function actOsManager(lab, action) {
    const scenario = lab.querySelector('[data-role="scenario"]').value;
    const prior = labState.get(lab) ?? {};
    if (scenario === 'memory') {
      const next = section5Models.allocateMemory(prior, action);
      labState.set(lab,next);
      stateArea(lab).textContent = `RAM: A ${next.A} | B ${next.B} | New ${next.New} | Free ${next.free} of 8 units`;
      result(lab).textContent = action === 'protect' ? (next.denied ? 'Access denied. B cannot overwrite A’s protected region.' : 'A has terminated; its former region is free, so there is no A allocation to access.') : action === 'terminate' ? 'A’s allocation is released for reuse; its saved files are a separate matter.' : 'The OS allocated available working memory to the new process.';
    }
    if (scenario === 'file') {
      const next = { ...prior };
      if (action === 'create') { next.exists = true; next.open = false; next.renamed = false; next.content = ''; }
      if (action === 'open' && next.exists) next.open = true;
      if (action === 'write' && next.exists && next.open) next.content = 'Binary revision';
      if (action === 'rename' && next.exists) next.renamed = true;
      const existed = Boolean(next.exists);
      if (action === 'delete') { next.exists = false; next.open = false; }
      labState.set(lab,next);
      stateArea(lab).textContent = `School/Notes/${next.renamed ? 'Study.txt' : 'Revision.txt'}: ${next.exists ? (next.content ?? 'empty') : 'not present'}`;
      result(lab).textContent = action === 'read' ? (next.exists && next.open ? `Read returns ${next.content || 'empty contents'} from the logical path.` : 'Read fails: open an existing file first.') : action === 'open' ? (next.exists ? 'The path resolves to the stored file; an open-file reference is available.' : 'Open fails: create the file first.') : action === 'write' ? (next.exists && next.open ? 'Write completed; stored contents are now Binary revision.' : 'Write fails: create and open the file first.') : !next.exists && action === 'rename' ? 'Rename fails: the target file is absent.' : action === 'delete' && !existed ? 'Delete fails: the target file is absent.' : `${action[0].toUpperCase()+action.slice(1)} updates the logical file or directory state; a path is not a RAM address.`;
    }
    if (scenario === 'security') {
      const next = { ...prior, loggedIn: action === 'login' || prior.loggedIn };
      labState.set(lab,next);
      stateArea(lab).textContent = `User B: ${next.loggedIn ? 'authenticated' : 'not authenticated'}\nSharedFile: read allowed, write denied`;
      result(lab).textContent = action === 'login' ? 'Authentication succeeds: identity is established. Permissions are checked separately.' : !next.loggedIn ? 'Authenticate before requesting file access.' : action === 'read' ? 'Read permitted; the stored file is supplied.' : 'Write denied by permission check; stored file remains unchanged.';
    }
    if (scenario === 'printer') {
      const next = { submitted: prior.submitted ?? 0, printed: prior.printed ?? 0 };
      if (action === 'submit') next.submitted = Math.min(3,next.submitted+1);
      if (action === 'print' && next.printed < next.submitted) next.printed++;
      labState.set(lab,next);
      const waiting = Array.from({length:next.submitted-next.printed},(_,i)=>`Job ${String.fromCharCode(65+next.printed+i)}`);
      stateArea(lab).textContent = `Queue: ${waiting.join(', ') || 'empty'}\nBuffer: ${action === 'print' && next.printed ? 'temporary data for printed job' : 'empty'}\nDriver: device-specific commands\nDevice: ${next.printed ? `completed ${next.printed}` : 'idle'}`;
      result(lab).textContent = 'Queue = waiting jobs; buffer = temporary transferred data; driver = device-specific communication.';
    }
  }
  function drawUtilityScene(lab, chosen = false) {
    const problem = lab.querySelector('[data-role="problem"]').value;
    const scenes = { format: chosen ? 'Known-empty volume → file-system structure created → ready to organise files.' : 'Known-empty volume: no file-system structure yet.', virus: chosen ? 'Files/activity → scan → suspicious item → quarantine. A clean scan is not a proof of no malware.' : 'A suspicious item may be present. Choose a tool to investigate.', defrag: `HDD before: A1 | B1 | Free | A2 | C | A3\n${chosen ? 'HDD after: A1 | A2 | A3 | B1 | C | Free' : 'Choose a tool to change placement.'}\nFile bits unchanged; SSDs have no mechanical read head.`, repair: chosen ? 'Inspect → report inconsistent file-system record → supported repair attempt. Physical recovery is not guaranteed.' : 'Report: file-system records are inconsistent.', compress: chosen ? 'Conceptual input: 100 units → archive: perhaps 62 units. Now decompress to verify identity.' : 'Original data: 100 units. The achievable size is not known until compression.', backup: '09:00 V1 backed up → 09:30 working V2 → disk fails before next backup. Choose a restore location.' };
    stateArea(lab).textContent = scenes[problem];
    lab.querySelector('[data-role="subactions"]').innerHTML = chosen && problem === 'backup' ? '<button type="button" data-action="restore-separate">Restore from separate device</button><button type="button" data-action="restore-same">Restore from failed device</button>' : chosen && problem === 'compress' ? '<button type="button" data-action="decompress">Decompress archive</button>' : '';
  }
  function drawCompiler(lab) {
    const state = labState.get(lab) ?? section5Models.compilerAction();
    stateArea(lab).textContent = `Saved source: ${state.source} (${state.source === 'A' ? 'adds 2; expected 6' : 'adds 4; expected 12'})\nLast built executable: ${state.built ?? 'none'}\nLast run output: ${state.output ?? 'none'}`;
  }
  function drawJava(lab) {
    const state = labState.get(lab) ?? section5Models.javaAction();
    stateArea(lab).textContent = `Hello.java: ${state.source}\nHello.class bytecode represents: ${state.bytecode ?? 'not built'}\nJVM output: ${state.output ?? 'none'}`;
  }
  function drawIdeAuthor(lab) {
    const state = labState.get(lab) ?? { identifier: 'Delivery', missingEnd: false, pretty: false, folded: false };
    const indent = state.pretty ? '  ' : '';
    const middle = state.folded ? `${indent}… 2 statements folded` : `${indent}Cost <- Quantity * ${state.identifier}\n${indent}OUTPUT Cost`;
    lab.querySelector('[data-role="code"] code').textContent = `IF Quantity > 0 THEN\n${middle}${state.missingEnd ? '' : '\nENDIF'}`;
  }
  function drawDebugger(lab) {
    const state = labState.get(lab) ?? { program: lab.querySelector('[data-role="program"]').value, corrected: false, line: 0, variables: {}, output: null, breakpoint: false };
    const program = section5Models.debugPrograms[state.program];
    lab.querySelector('[data-role="code"] code').textContent = program.lines.map((line,i)=>`${i === state.line ? '▶ ' : '  '}${i+1}. ${state.corrected && i === 3 ? program.fixed : line}`).join('\n');
    lab.querySelector('[data-role="variables"]').textContent = state.inspected && Object.keys(state.variables).length ? Object.entries(state.variables).map(([k,v])=>`${k} = ${v}`).join(' · ') : 'Select Inspect variables while paused.';
    lab.querySelector('[data-role="output"]').textContent = state.output === null ? 'No output yet.' : `Program output: ${state.output}; required output: 12.`;
  }
  function actDebugger(lab, action) {
    const state = labState.get(lab) ?? { program: lab.querySelector('[data-role="program"]').value, corrected: false, line: 0, variables: {}, output: null, breakpoint: false };
    if (action === 'breakpoint') { state.breakpoint = true; if (state.line >= 5) { state.line = 0; state.variables = {}; state.output = null; state.inspected = false; } result(lab).textContent = 'Breakpoint set before line 4. It has not executed yet in this run.'; }
    if (action === 'run') {
      while (state.line < (state.breakpoint ? 3 : 5)) Object.assign(state,section5Models.debuggerStep(state));
      result(lab).textContent = state.breakpoint ? 'Paused before line 4: Quantity=3, UnitPrice=4, Delivery=2. Predict Cost before stepping.' : `Program finished. Output ${state.output}; expected 12. Choose evidence to investigate.`;
    }
    if (action === 'step') { Object.assign(state,section5Models.debuggerStep(state)); result(lab).textContent = state.line === 4 ? `The calculation executed. Cost is now ${state.variables.Cost}; compare with 12.` : state.line === 5 ? `OUTPUT executed: ${state.output}.` : `Line ${state.line} has executed. Inspect the updated state.`; }
    if (action === 'inspect') { state.inspected = true; result(lab).textContent = `Variable inspection: ${Object.entries(state.variables).map(([k,v])=>`${k}=${v}`).join(', ') || 'run or step first'}. Inspection does not modify values.`; }
    if (action === 'watch') result(lab).textContent = `Watch Quantity * UnitPrice = ${section5Models.inspectExpression(state,'Quantity * UnitPrice')}. Cost remains ${section5Models.inspectExpression(state,'Cost')}.`;
    if (action === 'correct') { state.corrected = true; state.line = 0; state.variables = {}; state.output = null; state.inspected = false; result(lab).textContent = 'Corrected the calculation; execution restarted. Run or step again to verify output 12.'; }
    labState.set(lab,state); drawDebugger(lab);
  }
  course.querySelectorAll('.s5-lab').forEach(initialiseLab);
  updateView();
})();
