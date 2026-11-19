// Static rendering and browser updates use the same panel layout.
(function (makeInterface) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = makeInterface(require('./course-v3-section5-translator-models.js'));
  } else if (!window.Section5Translators) {
    const ui = window.Section5Translators = makeInterface(window.Section5TranslatorModels);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => ui.mount(document), { once: true });
    else ui.mount(document);
    document.addEventListener('s5:reset', event => ui.reset(event.target));
  }
})(function (M) {
  'use strict';
  const mounted = new WeakMap();
  const selector = '[data-s5-translator]';
  const escape = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const section = (title, content) => '<div class="s5t-pane"><h4>' + escape(title) + '</h4>' + content + '</div>';
  const hint = text => '<p class="s5t-hint">' + escape(text) + '</p>';
  const row = (number, text, active) => '<li' + (active ? ' class="s5t-active" aria-current="step"' : '') + '><span class="s5t-number">' + escape(number) + '</span><code>' + escape(text) + '</code></li>';
  function listing(rows, active, offset = 1) {
    return '<ol class="s5t-lines">' + rows.map((text, index) => row(index + offset, text, index === active)).join('') + '</ol>';
  }
  function measurements(values) {
    return '<dl class="s5t-values">' + values.map(([name, value]) => '<div><dt>' + escape(name) + '</dt><dd>' + escape(value) + '</dd></div>').join('') + '</dl>';
  }
  const memoryValues = machine => measurements([
    ['Count', machine.count ?? '—'], ['Total', machine.total ?? '—'], ['Output', machine.output.length ? machine.output.join(', ') : '—'],
  ]);
  function panels(state) {
    if (state.kind === 'assembler') {
      const frame = M.assemblyView(state);
      const source = frame.source.map(([label, op, operand]) => (label ? (label + ':').padEnd(8) : '        ') + op + (operand === '' ? '' : ' ' + operand));
      const sourcePanel = section('Assembly source', listing(source, frame.row, frame.origin)
        + hint('Left column: memory address. Coloured row: line being assembled.'));
      const symbols = Object.entries(frame.symbols);
      const table = symbols.length ? measurements(symbols) : hint('Pass 1 records each label and its address here.');
      const words = frame.output.map(word => word.word.slice(0, 8) + ' ' + word.word.slice(8));
      const wordPanel = section('Machine code and data', words.length ? listing(words, words.length - 1, frame.origin)
        : hint('Pass 2 produces machine code using the symbol table. This teaching model stores one instruction or data value per 16-bit location. Each instruction has an 8-bit opcode and an 8-bit operand.'));
      return '<div class="s5t-grid"><div>' + sourcePanel + section('Symbol table', table) + '</div>' + wordPanel + '</div>';
    }
    const source = M.program(state.config).map(line => line.text);
    const interpreting = state.kind === 'interpreter';
    const current = interpreting ? state.machine.last : state.activity === 'execute' ? -1 : state.build.last;
    const sourcePanel = section('High-level source', listing(source, current)
      + hint('Count and Total are integers. The coloured row is the last source statement processed.'));
    if (interpreting) {
      const m = state.machine;
      const position = m.error ? 'Stopped at line ' + (m.last + 1) + ' · ' + m.error : m.stopped ? 'Finished after OUTPUT.' : 'Next statement: line ' + (m.pc + 1) + '.';
      const path = m.path.length ? '<div class="s5t-path" aria-label="Visited source lines">' + m.path.map(line => '<span>' + line + '</span>').join('<b aria-hidden="true"> → </b>') + '</div>' : hint('Line numbers appear here in execution order.');
      return '<div class="s5t-grid">' + sourcePanel + '<div>' + section('Program state', memoryValues(m) + hint(position))
        + section('Execution path', path) + '</div></div>';
    }
    const b = state.build;
    const showDraft = state.activity === 'build' && !b.complete;
    const words = showDraft ? b.words : state.executable?.words ?? [];
    const currentWord = showDraft ? words.length - 1 : state.machine.last;
    const targetHeading = showDraft ? 'Draft target instructions' : 'Saved executable';
    const version = showDraft ? (b.error ? 'Incomplete draft. It cannot run.' : 'The build is in progress. @?? marks an unresolved branch.') : state.executable ? 'Built version: ' + state.executable.name + '.' : 'Compile the whole source program to produce an executable file for the model CPU. Its instruction names and encodings illustrate compilation; they are not the Cambridge assembly-language instruction set.';
    const target = words.length ? listing(words.map(M.describeWord), currentWord, 0) : '';
    const bytes = words.length ? '<details class="s5t-bytes"><summary>Show instruction bytes (hex)</summary><pre>' + words.map((w, i) => M.address(i) + '   ' + w.map(M.hex).join(' ')).join('\n') + '</pre></details>' : '';
    return '<div class="s5t-grid">' + sourcePanel + section(targetHeading, hint(version) + target + bytes) + '</div>'
      + section('Model CPU', memoryValues(state.machine) + hint(state.executable ? 'Run uses the saved instruction bytes for ' + state.executable.name + '.' : 'The CPU starts after a successful build.'));
  }

  function notice(state) {
    if (state.kind !== 'assembler') return state.notice;
    const frame = M.assemblyView(state);
    return frame.title + ' · ' + frame.message;
  }
  function select(name, label, entries, current) {
    const options = entries.map(([value, text]) => '<option value="' + escape(value) + '"' + (value === current ? ' selected' : '') + '>' + escape(text) + '</option>').join('');
    return '<label>' + escape(label) + '<select data-s5t-setting="' + name + '">' + options + '</select></label>';
  }
  function controls(kind) {
    const numberOptions = values => values.map(v => [v, v]);
    const fields = kind === 'assembler' ? [
      select('origin', 'Start address', numberOptions([0, 10, 20]), 0),
      select('pair', 'FIRST and SECOND', [[0, '18 and 24'], [1, '7 and 9'], [2, '8 and 8'], [3, '18 and 7']], 0),
    ] : [
      select('increment', 'Amount to add', numberOptions([1, 2, 4]), 2),
      select('limit', 'Loop limit', numberOptions([0, 1, 3]), 3),
      select('fault', 'Loop body', [['none', 'Add to Total'], ['syntax', 'Missing operand'], ['division', 'Divide by zero']], 'none'),
    ];
    const choices = {
      assembler: [['step', 'Next line'], ['pass', 'Finish pass'], ['back', 'Previous line'], ['reset', 'Reset']],
      compiler: [['step-build', 'Next compilation step'], ['build', 'Compile whole program'], ['step-run', 'Run one instruction'], ['run', 'Run executable'], ['reset', 'Reset']],
      interpreter: [['step', 'Interpret one statement'], ['run', 'Run to end'], ['restart', 'Restart program'], ['reset', 'Reset']],
    };
    return '<div class="s5t-fields" data-s5t-controls hidden>' + fields.join('') + '</div><div class="s5t-buttons" data-s5t-controls hidden>'
      + choices[kind].map(([action, text]) => '<button type="button" data-s5t-action="' + action + '">' + text + '</button>').join('') + '</div>';
  }
  function draw(lab, state) {
    mounted.set(lab, state);
    const panel = lab.querySelector('[data-s5t-panels]');
    const bytesOpen = panel.querySelector('.s5t-bytes')?.open;
    panel.innerHTML = panels(state);
    if (bytesOpen && panel.querySelector('.s5t-bytes')) panel.querySelector('.s5t-bytes').open = true;
    const message = lab.querySelector('[data-s5t-notice]');
    message.textContent = notice(state);
    message.classList.toggle('s5t-error', Boolean(state.machine?.error || (state.build?.error && state.activity === 'build')));
    const settings = state.kind === 'assembler' ? state.lab.config : state.config;
    for (const input of lab.querySelectorAll('[data-s5t-setting]')) {
      input.value = String(settings[input.dataset.s5tSetting]);
      input.disabled = input.dataset.s5tSetting === 'increment' && settings.fault !== 'none';
    }
    const frame = state.kind === 'assembler' ? M.assemblyView(state) : null;
    const disabled = frame ? { back: frame.step === 0, step: frame.complete, pass: frame.complete } : state.kind === 'compiler'
      ? { 'step-build': state.build.complete || state.build.error, build: state.build.complete || state.build.error, 'step-run': !state.executable, run: !state.executable }
      : { step: state.machine.stopped, run: state.machine.stopped, restart: !state.machine.steps };
    for (const button of lab.querySelectorAll('[data-s5t-action]')) button.disabled = Boolean(disabled[button.dataset.s5tAction]);
  }
  function labsWithin(root) {
    return [...(root.matches?.(selector) ? [root] : []), ...root.querySelectorAll(selector)];
  }
  function mount(root) {
    for (const lab of labsWithin(root)) {
      if (mounted.has(lab)) continue;
      const initial = M.create(lab.dataset.s5Translator);
      draw(lab, initial);
      lab.querySelectorAll('[data-s5t-controls]').forEach(el => { el.hidden = false; });
      lab.addEventListener('change', event => {
        const input = event.target.closest('[data-s5t-setting]');
        if (input) draw(lab, M.action(mounted.get(lab), input.dataset.s5tSetting, input.value));
      });
      lab.addEventListener('click', event => {
        const button = event.target.closest('[data-s5t-action]');
        if (button && !button.disabled) draw(lab, M.action(mounted.get(lab), button.dataset.s5tAction));
      });
    }
  }
  function reset(root) {
    for (const lab of labsWithin(root)) if (mounted.has(lab)) draw(lab, M.create(lab.dataset.s5Translator));
  }
  return { controls, panels, notice, escape, mount, reset };
});
