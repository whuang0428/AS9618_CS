// Three local teaching machines. Node and the browser use the same state transitions.
(function (makeModels) {
  if (typeof module !== 'undefined' && module.exports) module.exports = makeModels(require('./course-v3-section4-models.js'));
  else window.Section5TranslatorModels = makeModels(window.Section4Models);
})(function (assemblyModel) {
  'use strict';
  const defaults = { increment: 2, limit: 3, fault: 'none' };
  const initialMemory = () => ({ count: null, total: null, pc: 0, output: [], steps: 0, last: -1, stopped: false, error: null, path: [] });
  const initialBuild = () => ({ pc: 0, last: -1, words: [], loop: null, complete: false, error: null });
  const options = { increment: [1, 2, 4], limit: [0, 1, 3], fault: ['none', 'syntax', 'division'] };

  function create(kind) {
    if (kind === 'assembler') return { kind, lab: assemblyModel.createLab('assembler') };
    if (!['compiler', 'interpreter'].includes(kind)) throw new RangeError('Unknown translator');
    return { kind, config: { ...defaults }, build: initialBuild(), executable: null, machine: initialMemory(),
      notice: kind === 'compiler' ? 'The source is ready. Step through compilation to see which target instructions it produces.' : 'No statement has executed. Step into line 1 and watch Count change.' };
  }

  // Both routes consume these statements. Variables Count and Total are declared integers.
  function program({ increment, limit, fault }) {
    const body = fault === 'syntax'
      ? { kind: 'invalid', text: '    Total ← Total +' }
      : fault === 'division'
        ? { kind: 'divide', variable: 'total', value: 0, text: '    Total ← Total DIV 0' }
        : { kind: 'add', variable: 'total', value: increment, text: '    Total ← Total + ' + increment };
    return [
      { kind: 'set', variable: 'count', value: 0, text: 'Count ← 0' },
      { kind: 'set', variable: 'total', value: 0, text: 'Total ← 0' },
      { kind: 'while', variable: 'count', value: limit, text: 'WHILE Count < ' + limit },
      body,
      { kind: 'add', variable: 'count', value: 1, text: '    Count ← Count + 1' },
      { kind: 'end', text: 'ENDWHILE' },
      { kind: 'output', variable: 'total', text: 'OUTPUT Total' },
    ];
  }

  const registers = ['count', 'total'];
  const names = { count: 'Count', total: 'Total' };
  const opcode = { SET: 16, ADD: 32, DIV: 33, JGE: 48, JUMP: 49, OUT: 64, HALT: 255 };
  const hex = value => value === null ? '??' : value.toString(16).toUpperCase().padStart(2, '0');
  const address = value => String(value).padStart(2, '0');

  // Each target instruction is four bytes: opcode plus three operand fields.
  // JGE's forward target is patched once the compiler reaches ENDWHILE.
  function describeWord([op, slot, value, target]) {
    const name = names[registers[slot]];
    switch (op) {
      case opcode.SET: return 'SET ' + name + ', ' + value;
      case opcode.ADD: return 'ADD ' + name + ', ' + value;
      case opcode.DIV: return 'DIV ' + name + ', ' + value;
      case opcode.JGE: return 'JGE ' + name + ', ' + value + ', @' + (target === null ? '??' : address(target));
      case opcode.JUMP: return 'JUMP @' + address(target);
      case opcode.OUT: return 'OUT ' + name;
      case opcode.HALT: return 'HALT';
      default: throw new Error('Unknown target instruction');
    }
  }

  function exampleName({ increment, limit, fault }) {
    const operation = fault === 'division' ? 'divide by zero' : fault === 'syntax' ? 'missing operand' : 'add ' + increment;
    return operation + ', limit ' + limit;
  }

  function compileStep(state) {
    const source = program(state.config);
    const old = state.build;
    if (old.error || old.complete) return state;
    const line = source[old.pc];
    const build = { ...old, words: old.words.map(word => [...word]), last: old.pc, pc: old.pc + 1 };
    const slot = registers.indexOf(line.variable);
    const message = 'Line ' + (old.pc + 1) + ' · ';
    let explanation;
    switch (line.kind) {
      case 'invalid': {
        build.error = 'Expected an operand after +.';
        return { ...state, build, activity: 'build', notice: message + build.error + (state.executable ? ' The previous executable is still available.' : ' There is no executable to run.') };
      }
      case 'while':
        build.loop = build.words.length;
        build.words.push([opcode.JGE, slot, line.value, null]);
        explanation = 'Produce a branch instruction that leaves the loop when Count reaches the limit. Its exit address is pending.';
        break;
      case 'end':
        build.words.push([opcode.JUMP, 0, 0, build.loop]);
        build.words[build.loop][3] = build.words.length;
        explanation = 'Produce the jump instruction back to the test. Fill in the forward branch with the address after the loop.';
        break;
      case 'output':
        build.words.push([opcode.OUT, slot, 0, 0], [opcode.HALT, 0, 0, 0]);
        build.complete = true;
        return { ...state, build, activity: 'build', executable: { name: exampleName(state.config), words: build.words.map(word => [...word]) },
          machine: initialMemory(), notice: 'Compilation complete. The executable ends with OUT and HALT for this teaching CPU. Run it to produce output.' };
      default: {
        const op = { set: opcode.SET, add: opcode.ADD, divide: opcode.DIV }[line.kind];
        build.words.push([op, slot, line.value, 0]);
        explanation = 'Produce instruction ' + describeWord(build.words.at(-1)) + '.';
      }
    }
    return { ...state, build, activity: 'build', notice: message + explanation };
  }

  // Decode the saved executable. Execution has no access to its original source or current editor settings.
  function executeWord(machine, words) {
    if (machine.stopped) return machine;
    const [op, slot, value, target] = words[machine.pc];
    const key = registers[slot];
    const next = { ...machine, last: machine.pc, pc: machine.pc + 1, steps: machine.steps + 1 };
    switch (op) {
      case opcode.SET: next[key] = value; break;
      case opcode.ADD: next[key] += value; break;
      case opcode.DIV:
        if (value === 0) { next.stopped = true; next.error = 'Division by zero'; break; }
        next[key] = Math.trunc(next[key] / value); break;
      case opcode.JGE: if (next[key] >= value) next.pc = target; break;
      case opcode.JUMP: next.pc = target; break;
      case opcode.OUT: next.output = [...next.output, next[key]]; break;
      case opcode.HALT: next.stopped = true; break;
      default: throw new Error('Unknown target instruction');
    }
    return next;
  }

  function interpretStep(state) {
    const previous = state.machine;
    if (previous.stopped) return state;
    const source = program(state.config);
    const index = previous.pc;
    const line = source[index];
    const machine = { ...previous, last: index, pc: index + 1, steps: previous.steps + 1, path: [...previous.path, index + 1] };
    let notice;
    switch (line.kind) {
      case 'set':
        machine[line.variable] = line.value;
        notice = names[line.variable] + ' becomes ' + line.value + '.'; break;
      case 'add':
        machine[line.variable] += line.value;
        notice = names[line.variable] + ' changes from ' + previous[line.variable] + ' to ' + machine[line.variable] + '.'; break;
      case 'while': {
        const enter = previous[line.variable] < line.value;
        if (!enter) machine.pc = source.findIndex(row => row.kind === 'end') + 1;
        notice = previous[line.variable] + ' < ' + line.value + (enter ? ' is true. Enter the body.' : ' is false. Skip the body and go to OUTPUT.'); break;
      }
      case 'end':
        machine.pc = source.findIndex(row => row.kind === 'while');
        notice = 'Return to the WHILE test with the current values.'; break;
      case 'output':
        machine.output = [...previous.output, previous[line.variable]];
        machine.stopped = true;
        notice = 'Display ' + previous[line.variable] + '. The program has finished.'; break;
      case 'divide':
      case 'invalid':
        machine.stopped = true;
        machine.error = line.kind === 'divide' ? 'Division by zero' : 'Expected an operand after +';
        notice = machine.error + '. Execution stops here.'; break;
    }
    return { ...state, machine, notice: 'Line ' + (index + 1) + ' · ' + notice };
  }

  function action(state, type, value) {
    if (type === 'reset') return create(state.kind);
    if (state.kind === 'assembler') {
      const s = state.lab;
      if (type === 'assemble' || type === 'pass') {
        const frames = assemblyModel.frames(s);
        const firstPassEnd = frames.findIndex(frame => frame.pass === 2) - 1;
        const step = type === 'pass' && s.step < firstPassEnd ? firstPassEnd : frames.length - 1;
        return { ...state, lab: { ...s, step } };
      }
      return { ...state, lab: assemblyModel.labAction(s, type, value) };
    }
    if (Object.hasOwn(options, type)) {
      const option = type === 'fault' ? value : Number(value);
      if (!options[type].includes(option)) throw new RangeError('Unsupported ' + type);
      return { ...state, config: { ...state.config, [type]: option }, activity: 'edit', build: initialBuild(), machine: initialMemory(),
        notice: state.kind === 'compiler' ? 'Source edited.' + (state.executable ? ' Run the saved executable or compile the edit to replace it.' : ' Compile this version to create an executable.') : 'Source edited. Step or run from line 1 with fresh variables.' };
    }
    if (state.kind === 'interpreter') {
      if (type === 'restart') return { ...state, machine: initialMemory(), notice: 'Ready at line 1. The source is unchanged.' };
      if (type === 'step') return interpretStep(state);
      if (type === 'run') {
        let next = state;
        while (!next.machine.stopped) next = interpretStep(next);
        return next;
      }
    }
    if (state.kind === 'compiler') {
      if (type === 'step-build') return compileStep(state);
      if (type === 'build') {
        let next = state;
        while (!next.build.complete && !next.build.error) next = compileStep(next);
        return next;
      }
      if ((type === 'run' || type === 'step-run') && state.executable) {
        const words = state.executable.words;
        let machine = state.machine.stopped ? initialMemory() : state.machine;
        do { machine = executeWord(machine, words); } while (type === 'run' && !machine.stopped);
        const location = '@' + address(machine.last) + ' ' + describeWord(words[machine.last]);
        const effect = machine.error || (machine.stopped ? 'Finished. Output: ' + machine.output.join(', ') : 'Next instruction: @' + address(machine.pc));
        return { ...state, machine, activity: 'execute', notice: location + ' · ' + effect + '. Executable: ' + state.executable.name + '.' };
      }
    }
    return state;
  }
  return { create, action, program, describeWord, exampleName, hex, address, assemblyView: state => assemblyModel.view(state.lab), executeWord };
});
