/* All activity state belongs to its own container; no network or code evaluation. */
(() => {
  'use strict';
  const M = window.Section9Models;
  const labs = [...document.querySelectorAll('[data-s9-lab]')];
  if (!M || !labs.length) return;
  const initial = new Map(labs.map(lab => [lab, lab.innerHTML]));
  const states = new WeakMap();
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const find = (lab, role) => lab.querySelector(`[data-s9-role="${role}"]`);
  const value = (lab, role) => find(lab, role)?.value;
  const checked = (lab, role) => Boolean(find(lab, role)?.checked);
  const numeric = (lab, role) => {
    const raw = value(lab, role);
    if (typeof raw !== 'string' || !raw.trim()) throw new RangeError('Complete the number fields before stepping.');
    return Number(raw);
  };
  const state = lab => states.get(lab);
  const status = (lab, text) => { find(lab, 'status').textContent = text; };
  const table = (caption, headings, rows) => `<div class="s9-lab-table" tabindex="0" role="region" aria-label="${esc(caption)}"><table><caption>${esc(caption)}</caption><thead><tr>${headings.map(heading => `<th scope="col">${esc(heading)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => index ? `<td>${esc(cell)}</td>` : `<th scope="row">${esc(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  function hide(lab) {
    const output = find(lab, 'output');
    output.hidden = true;
    output.innerHTML = '';
    states.set(lab, { step: -1, run: null });
    lab.querySelectorAll('[data-s9-action="previous"]').forEach(button => { button.disabled = true; });
    lab.querySelectorAll('[data-s9-action="next"]').forEach(button => { button.disabled = false; });
  }
  function show(lab, html) {
    const output = find(lab, 'output');
    output.innerHTML = html;
    output.hidden = false;
  }
  const loopInputs = { for: '2, 3, 1', conditional: '2, -1, 3', while: '2, 3, 0', repeat: '0, -2, 3' };
  const allowedVariants = {
    abstraction: ['availability', 'charge', 'poster'], trace: ['ipo', 'assignment', 'selection'], conditions: ['quantity', 'logic'], loops: ['for', 'conditional', 'while', 'repeat'],
    representations: ['selection', 'quantity', 'sequence', 'loop', 'two-stage'], modules: ['return', 'display'], refinement: ['charge', 'payment', 'points'], ticket: ['complete']
  };
  function configure(lab, first = false) {
    const kind = lab.dataset.s9Lab;
    if (first && lab.dataset.variant && !allowedVariants[kind]?.includes(lab.dataset.variant)) throw new RangeError(`Unknown ${kind} activity variant: ${lab.dataset.variant}.`);
    const variant = find(lab, 'variant');
    if (first && variant && [...variant.options].some(option => option.value === lab.dataset.variant)) variant.value = lab.dataset.variant;
    if (kind === 'trace') lab.querySelector('[data-s9-option="student"]').hidden = value(lab, 'variant') !== 'selection';
    if (kind === 'loops') {
      const current = value(lab, 'variant');
      if (first) {
        if (lab.dataset.mode && !['positive', 'sentinel'].includes(lab.dataset.mode)) throw new RangeError('Unknown REPEAT task.');
        if (lab.dataset.mode) find(lab, 'repeatMode').value = lab.dataset.mode;
        find(lab, 'values').value = lab.dataset.values ?? loopInputs[current];
      }
      lab.querySelector('[data-s9-option="reverse"]').hidden = !['while', 'repeat'].includes(current);
      lab.querySelector('[data-s9-option="reset-inside"]').hidden = !['for', 'conditional'].includes(current);
      lab.querySelector('[data-s9-option="repeat-mode"]').hidden = current !== 'repeat';
      const positive = current === 'repeat' && value(lab, 'repeatMode') === 'positive';
      find(lab, 'loop-intro').textContent = positive ? 'Try a sequence of whole-number attempts. Follow each input and the test that accepts the first positive quantity.' : 'Supply a short input sequence. Follow the loop control, the current input and the running total.';
      find(lab, 'loop-predict').textContent = positive ? 'Predict: How many attempts will be made? Which quantity will be accepted?' : 'Predict: How often will the body execute? Which values contribute to Total?';
      find(lab, 'loop-note').textContent = ['for', 'conditional'].includes(current)
        ? 'The number of supplied inputs sets the FOR limit. Use 1–8 whole numbers. Compare a zero, a positive value and a negative value.'
        : positive ? 'Use whole-number attempts, ending with a positive quantity. UNTIL Quantity > 0 tests after input and stops on TRUE. Reversing it produces a different result.' : 'Use non-negative quantities and a final 0. WHILE tests before its body; REPEAT tests after its body. A missing next input pauses this model.';
    }
    if (kind === 'representations') {
      const variantName = value(lab, 'variant');
      find(lab, 'quantity').closest('label').hidden = ['loop', 'two-stage'].includes(variantName);
      find(lab, 'places').closest('label').hidden = variantName !== 'quantity';
      lab.querySelector('[data-s9-option="student"]').hidden = variantName !== 'selection';
      find(lab, 'values').closest('label').hidden = !['loop', 'two-stage'].includes(variantName);
      if (first) find(lab, 'values').value = lab.dataset.values ?? (variantName === 'two-stage' ? '0, 5, 27, 4, 27, 0' : '2, 3, 1');
    }
    if (kind === 'abstraction' && first && Object.hasOwn(M.purposes, lab.dataset.variant)) find(lab, 'purpose').value = lab.dataset.variant;
    if (kind === 'modules' && first && ['return', 'display'].includes(lab.dataset.variant)) find(lab, 'mode').value = lab.dataset.variant;
    if (kind === 'refinement') {
      const task = value(lab, 'variant');
      if (first) find(lab, 'detail').value = 'outline';
      lab.querySelector('[data-s9-option="charge-fields"]').hidden = task === 'points';
      lab.querySelector('[data-s9-option="student"]').hidden = task !== 'charge';
      lab.querySelector('[data-s9-option="payment-fields"]').hidden = task !== 'payment';
      lab.querySelector('[data-s9-option="points-fields"]').hidden = task !== 'points';
    }
  }
  function reset(lab) {
    lab.innerHTML = initial.get(lab);
    configure(lab, true);
    hide(lab);
    status(lab, 'Experiment restarted. Predict before revealing a step.');
  }
  function buildRun(lab) {
    const kind = lab.dataset.s9Lab;
    if (kind === 'trace') return M.trace({ quantity: numeric(lab, 'quantity'), student: checked(lab, 'student'), variant: value(lab, 'variant'), earlyOutput: checked(lab, 'earlyOutput') });
    if (kind === 'conditions') return M.condition({ quantity: numeric(lab, 'quantity'), places: numeric(lab, 'places'), operator: value(lab, 'operator'), inclusive: value(lab, 'boundary') === 'inclusive' });
    if (kind === 'loops') return M.loop({ values: value(lab, 'values'), variant: value(lab, 'variant'), reversed: checked(lab, 'reversed'), resetInside: checked(lab, 'resetInside'), mode: value(lab, 'repeatMode') });
    if (kind === 'representations') {
      const variant = value(lab, 'variant');
      if (variant === 'quantity') return M.selection({ quantity: numeric(lab, 'quantity'), places: numeric(lab, 'places') });
      if (variant === 'selection') return M.trace({ quantity: numeric(lab, 'quantity'), student: checked(lab, 'student'), variant: 'selection' });
      if (variant === 'sequence') return M.trace({ quantity: numeric(lab, 'quantity') });
      if (variant === 'two-stage') return M.twoStage({ values: value(lab, 'values') });
      if (variant === 'loop') return M.flowLoop({ values: value(lab, 'values') });
      throw new RangeError('Unknown representation algorithm.');
    }
    if (kind === 'modules') return M.modules({ quantity: numeric(lab, 'quantity'), unitPrice: value(lab, 'price'), student: checked(lab, 'student'), mode: value(lab, 'mode') });
    if (kind === 'ticket') return M.ticket({ quantity: numeric(lab, 'quantity'), places: numeric(lab, 'places'), student: checked(lab, 'student'), paid: value(lab, 'paid') });
    throw new RangeError('This activity uses its Check button.');
  }
  function codeMarkup(run, current) {
    return `<div class="s9-lab-code" tabindex="0" role="region" aria-label="Algorithm statements"><pre>${run.code.map(line => `<span class="s9-code-line" data-current="${line.id === current}"${line.id === current ? ' aria-current="step"' : ''}>${esc(line.text)}</span>`).join('\n')}</pre></div>`;
  }
  function graph(lab, run, current) {
    const variant = value(lab, 'variant');
    const marker = `s9-arrow-${labs.indexOf(lab)}`;
    // ENDIF describes a join: no operation node is current until OUTPUT executes.
    const active = ({ waiting: 'first', collectEnd: 'collectTest' })[current] ?? current;
    const node = (id, x, y, lines, shape = 'box', width = 300, height = 66) => {
      const outline = shape === 'diamond' ? `<polygon points="${x},${y - height / 2} ${x + width / 2},${y} ${x},${y + height / 2} ${x - width / 2},${y}"/>`
        : shape === 'io' ? `<polygon points="${x - width / 2 + 20},${y - height / 2} ${x + width / 2},${y - height / 2} ${x + width / 2 - 20},${y + height / 2} ${x - width / 2},${y + height / 2}"/>`
        : `<rect x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" rx="${['start', 'end', 'finish'].includes(id) ? 28 : 3}"/>`;
      return `<g class="s9-flow-node" data-current="${id === active}" fill="${id === active ? '#fff2bf' : '#edf5f7'}" stroke="${id === active ? '#865700' : '#345b70'}" stroke-width="${id === active ? 4 : 2}">${outline}<text text-anchor="middle" fill="#153047" stroke="none" font-family="Arial, sans-serif" font-size="21">${lines.map((line, index) => `<tspan x="${x}" y="${y + 7 + (index - (lines.length - 1) / 2) * 26}">${esc(line)}</tspan>`).join('')}</text></g>`;
    };
    const edge = (path, label = '', x = 0, y = 0) => `<path d="${path}" fill="none" stroke="#345b70" stroke-width="3" marker-end="url(#${marker})"/>${label ? `<text x="${x}" y="${y}" fill="#153047" font-size="22" font-family="Arial, sans-serif">${label}</text>` : ''}`;
    let elements;
    if (variant === 'two-stage') elements = [
      edge('M260 60V107'), edge('M260 173V215'), edge('M90 270H40V140H110', 'No', 43, 247), edge('M430 270H580V100H700', 'Yes', 478, 250),
      edge('M840 133V187'), edge('M840 253V300'), edge('M840 410V437', 'Yes', 860, 432), edge('M840 503V552'), edge('M840 618H600V355H670'), edge('M1010 355H1110V437', 'No', 1053, 338), edge('M1110 503V590'),
      node('start', 260, 40, ['START'], 'box', 180, 40), node('first', 260, 140, ['INPUT Value'], 'io'), node('gate', 260, 270, ['Value = 27?'], 'diamond', 340, 110),
      node('init', 840, 100, ['Total ← 0'], 'box', 280), node('collectInput', 840, 220, ['INPUT Value'], 'io', 280), node('collectTest', 840, 355, ['Value <> 0?'], 'diamond', 340, 110), node('add', 840, 470, ['Total ←', 'Total + Value'], 'box', 240), node('more', 840, 585, ['INPUT Value'], 'io', 280), node('output', 1110, 470, ['OUTPUT', 'Total'], 'io', 160), node('finish', 1110, 610, ['END'], 'box', 160, 40)
    ].join('');
    else if (variant === 'selection') elements = [
      edge('M430 50V80'), edge('M430 130V160'), edge('M430 210V240'), edge('M430 290V315'), edge('M290 365H200V445', 'Yes', 221, 346), edge('M570 365H685V590H580', 'No', 607, 347), edge('M200 505V590H280'), edge('M430 620V660'),
      node('start', 430, 30, ['START'], 'box', 180, 40), node('input', 430, 105, ['INPUT Quantity'], 'io', 300, 50), node('cost', 430, 185, ['Total ← Quantity * 25.00'], 'box', 390, 50), node('student', 430, 265, ['INPUT Student'], 'io', 300, 50), node('test', 430, 365, ['Student?'], 'diamond', 280, 100), node('discount', 200, 475, ['Total ← Total * 0.90'], 'box', 340, 60), node('output', 430, 590, ['OUTPUT Total'], 'io', 300, 60), node('finish', 430, 680, ['END'], 'box', 180, 40)
    ].join('');
    else if (variant === 'quantity') elements = [
      edge('M430 55V107'), edge('M430 173V220'), edge('M210 285H185V427', 'Yes', 137, 376), edge('M650 285H675V427', 'No', 696, 376), edge('M185 493V600H280'), edge('M675 493V600H580'),
      node('start', 430, 35, ['START'], 'box', 180, 40), node('input', 430, 140, ['INPUT Quantity'], 'io'), node('test', 430, 285, ['Quantity >= 1 AND', 'Quantity <= PlacesLeft'], 'diamond', 440, 130), node('yes', 185, 460, ['OUTPUT "Accepted"'], 'io'), node('no', 675, 460, ['OUTPUT "Rejected"'], 'io'), node('end', 430, 600, ['END'])
    ].join('');
    else if (variant === 'sequence') elements = [
      edge('M430 55V117'), edge('M430 183V257'), edge('M430 323V397'), edge('M430 463V540'), node('start', 430, 35, ['START'], 'box', 180, 40), node('input', 430, 150, ['INPUT Quantity'], 'io'), node('cost', 430, 290, ['Total ← Quantity * 25.00'], 'box', 400), node('output', 430, 430, ['OUTPUT Total'], 'io'), node('finish', 430, 560, ['END'], 'box', 180, 40)
    ].join('');
    else elements = [
      edge('M300 55V82'), edge('M300 148V182'), edge('M300 248V285'), edge('M300 405V442', 'Yes', 322, 429), edge('M300 508V552'), edge('M300 618V652'), edge('M150 685H45V345H120'), edge('M480 345H685V442', 'No', 577, 330), edge('M685 508V580'),
      node('start', 300, 35, ['START'], 'box', 180, 40), node('init', 300, 115, ['Total ← 0']), node('index', 300, 215, ['Index ← 1']), node('test', 300, 345, [`Index <= ${run.inputsRead}?`], 'diamond', 360, 120), node('input', 300, 475, ['INPUT Quantity'], 'io'), node('add', 300, 585, ['Total ← Total + Quantity'], 'box', 380), node('next', 300, 685, ['Index ← Index + 1']), node('output', 685, 475, ['OUTPUT Total'], 'io'), node('finish', 685, 600, ['END'], 'box', 180, 40)
    ].join('');
    return `<div class="s9-lab-flow" tabindex="0" role="region" aria-label="Flowchart; use horizontal scrolling on a narrow display"><svg viewBox="0 0 ${variant === 'two-stage' ? '1200 700' : '860 750'}"${variant === 'two-stage' ? ' class="s9-flow-wide"' : ''} role="img" aria-label="The same algorithm as a flowchart; the current operation is highlighted"><defs><marker id="${marker}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#345b70"/></marker></defs>${elements}</svg></div>`;
  }
  function english(lab, run, current) {
    const variant = value(lab, 'variant');
    const descriptions = variant === 'two-stage' ? { waiting: 'Repeat input until the start signal appears.', first: 'Read a value without adding it.', gate: 'Stop waiting only when the value is 27.', init: 'After the waiting loop, set the total to zero.', collectInput: 'Read a new value after the first 27.', collectTest: 'While this value is not zero, process it.', add: 'Add the value to the total; a later 27 is ordinary data.', more: 'Read the next value.', collectEnd: 'Return to the condition that checks for zero.', output: 'Display the final total.' } : variant === 'quantity' ? {
      input: 'Read the number of tickets requested.', test: 'Check that the quantity is at least one and no more than the available places.', yes: 'If it fits both limits, display Accepted.', else: 'Otherwise, take the alternative path.', no: 'If it does not fit both limits, display Rejected.', end: 'Continue after the decision.'
    } : ['sequence', 'selection'].includes(variant) ? { input: 'Read the requested quantity.', cost: 'Multiply the quantity by the ticket price of 25.00 and store the total.', student: 'Read whether the student discount applies.', test: 'If Student is true, apply the discount.', discount: 'Replace Total with 90% of its current value.', endif: 'Continue after the decision.', output: 'Display the total.' }
      : { init: 'Set the running total to zero.', index: 'Set the input index to one.', test: `While the index is no more than ${run.inputsRead}, execute the body.`, input: 'Read the next quantity.', add: 'Add that quantity to the running total.', next: 'Increase the index by one.', endwhile: 'Return to the condition.', output: 'Display the final total after the loop finishes.' };
    return `<ol class="s9-english-steps">${run.code.map(line => `<li class="s9-code-line" data-current="${line.id === current}">${esc(descriptions[line.id] ?? line.text)}</li>`).join('')}</ol>`;
  }
  function draw(lab, followCurrent = false) {
    const current = state(lab);
    const { step, run } = current;
    current.scroll ??= {};
    for (const [name, selector] of [['flow', '.s9-lab-flow'], ['code', '.s9-lab-code']]) {
      const panel = find(lab, 'output').querySelector(selector);
      if (panel) current.scroll[name] = { left: panel.scrollLeft, top: panel.scrollTop };
    }
    lab.querySelector('[data-s9-action="previous"]').disabled = step < 0;
    lab.querySelector('[data-s9-action="next"]').disabled = step >= run.frames.length - 1;
    if (step < 0) { find(lab, 'output').hidden = true; status(lab, 'Back at the prediction. No result is revealed.'); return; }
    const frame = run.frames[step];
    const variables = Object.entries(frame.variables).map(([key, currentValue]) => [key, currentValue === null ? 'Not assigned' : run.moneyKeys?.includes(key) ? Number(currentValue).toFixed(2) : M.formatValue(currentValue)]);
    const representation = lab.dataset.s9Lab === 'representations';
    const view = representation ? value(lab, 'view') : 'code';
    const display = representation
      ? `<div class="s9-lab-grid s9-representation-grid" data-view="${view}">${['both', 'code'].includes(view) ? codeMarkup(run, frame.node) : ''}${['both', 'flow'].includes(view) ? graph(lab, run, frame.node) : ''}${view === 'english' ? english(lab, run, frame.node) : ''}</div>`
      : `<p class="s9-current-statement"><strong>Current statement</strong></p><pre class="s9-lab-code">${esc(frame.statement)}</pre>`;
    let summary = '';
    if (step === run.frames.length - 1 && lab.dataset.s9Lab === 'conditions') summary = `<p class="s9-lab-note"><strong>${run.result === run.correct ? 'This input agrees with the availability rule.' : 'Counterexample: this expression disagrees with the availability rule.'}</strong> The actual request should be ${run.correct ? 'accepted' : 'rejected'}. ${value(lab, 'operator') === 'NOT' ? 'The negated expression answers “Is this request invalid?”; it is not an acceptance condition.' : 'One agreeing example does not establish that an expression works for every input.'}</p>`;
    if (step === run.frames.length - 1 && ['loops', 'representations'].includes(lab.dataset.s9Lab) && run.iterations !== undefined) summary += `<p class="s9-lab-note">${run.iterations} body ${run.iterations === 1 ? 'entry' : 'entries'}; ${run.inputsRead} ${run.inputsRead === 1 ? 'input' : 'inputs'} read. ${run.waiting ? 'Paused: another input is required.' : 'Execution finished.'}</p>`;
    show(lab, `${display}<p class="s9-step-reason">${esc(frame.explanation)}</p><div class="s9-lab-grid">${table('Values after this step', ['Identifier', 'Stored value'], variables)}<section class="s9-output-console"><h4>Output so far</h4>${frame.output.length ? `<ol>${frame.output.map(item => `<li>${esc(item)}</li>`).join('')}</ol>` : '<p>No output yet.</p>'}</section></div>${summary}`);
    status(lab, `Step ${step + 1} of ${run.frames.length}. ${frame.statement}`);
    if (!representation) return;
    const renderToken = (current.renderToken ?? 0) + 1;
    current.renderToken = renderToken;
    requestAnimationFrame(() => {
      if (state(lab) !== current || current.renderToken !== renderToken || find(lab, 'output').hidden) return;
      for (const [name, selector] of [['flow', '.s9-lab-flow'], ['code', '.s9-lab-code']]) {
        const panel = find(lab, 'output').querySelector(selector);
        const saved = current.scroll[name];
        if (panel && saved) panel.scrollTo({ ...saved, behavior: 'instant' });
      }
      // A representation switch preserves its position. Only an executed step follows a node.
      if (!followCurrent) return;
      const target = find(lab, 'output').querySelector('.s9-flow-node[data-current="true"]')
        ?? find(lab, 'output').querySelector('.s9-code-line[data-current="true"]');
      if (!target) return; // ENDIF is a structural join, not an output operation.
      const panel = target.closest('.s9-lab-flow, .s9-lab-code');
      if (panel) {
        const item = target.getBoundingClientRect();
        const box = panel.getBoundingClientRect();
        panel.scrollTo({ left: panel.scrollLeft + item.left + item.width / 2 - box.left - panel.clientWidth / 2, top: panel.scrollTop + item.top + item.height / 2 - box.top - panel.clientHeight / 2, behavior: 'instant' });
      }
      // Keep the current operation in the classroom viewport while both navigation bars stay usable.
      const classroom = lab.closest('[data-s9-classroom]');
      const toolbarHeight = classroom?.querySelector('.s5-toolbar')?.getBoundingClientRect().height ?? 0;
      const stepHeight = lab.querySelector('.s9-step-controls')?.getBoundingClientRect().height ?? 0;
      const footerHeight = classroom?.querySelector('.s5-navigation')?.getBoundingClientRect().height ?? 0;
      const top = toolbarHeight + stepHeight + 24;
      const bottom = window.innerHeight - footerHeight - 24;
      const item = target.getBoundingClientRect();
      if (bottom > top && (item.top < top || item.bottom > bottom)) {
        window.scrollBy({ top: item.top + item.height / 2 - (top + bottom) / 2, behavior: 'instant' });
      }
    });
  }
  function reveal(lab) {
    if (lab.dataset.s9Lab === 'abstraction') {
      const result = M.abstraction({ purpose: value(lab, 'purpose'), selected: [...lab.querySelectorAll('[data-s9-fact]:checked')].map(input => input.dataset.s9Fact) });
      show(lab, `${result.rows.length ? table('Your selected model', ['Information', 'Value', 'Role'], result.rows) : '<p>No information has been selected.</p>'}<p><strong>${esc(result.result)}</strong></p><p>${esc(result.explanation)}</p><p>${result.extra.length ? `Unnecessary for this purpose: ${result.extra.map(key => esc(M.facts[key].label)).join(', ')}. Removing these makes the model smaller without losing its required answer.` : 'No selected item is unnecessary for this purpose.'}</p>`);
      status(lab, result.sufficient ? 'The model keeps enough information for this purpose. Try changing its purpose.' : 'Essential information is missing. Add it and check again.');
    } else if (lab.dataset.s9Lab === 'refinement') {
      const variant = value(lab, 'variant');
      const result = M.refinement({ variant, quantity: variant === 'points' ? 2 : numeric(lab, 'quantity'), student: checked(lab, 'student'), detail: value(lab, 'detail'), missing: value(lab, 'missing'), places: variant === 'payment' ? numeric(lab, 'places') : 8, total: value(lab, 'total'), paid: value(lab, 'paid'), amount: value(lab, 'amount'), truncateFirst: checked(lab, 'truncateFirst') });
      const comparison = result.ready && variant === 'points' && checked(lab, 'truncateFirst') ? `<p>The stated rules give <strong>${result.run.correctPoints}</strong> points. ${result.run.correctPoints === result.run.calculatedPoints ? 'This example does not expose the changed order; try 100.50.' : 'The changed order selects the wrong band for this amount.'}</p>` : '';
      show(lab, `<h4>Current leaves of the solution</h4><ol>${result.leaves.map(leaf => `<li><code>${esc(leaf)}</code></li>`).join('')}</ol><p><strong>${result.ready ? 'Each operation is now defined.' : 'More refinement is needed.'}</strong></p>${result.unresolved.map(text => `<p>${esc(text)}</p>`).join('')}${result.ready ? `<p>Result for these inputs: <strong>${esc(result.run.frames.at(-1).output.at(-1))}</strong>.</p>${comparison}<details><summary>Follow the calculation</summary><ol>${result.run.frames.map(frame => `<li><code>${esc(frame.statement)}</code><p>${esc(frame.explanation)}</p></li>`).join('')}</ol></details>` : '<p>A result is not computed while a rule remains unspecified.</p>'}`);
      status(lab, result.ready ? 'This refinement can be implemented using the stated rules.' : 'Inspect the unresolved operation before adding detail.');
    }
  }
  function changed(lab, target) {
    if (target === find(lab, 'view') && state(lab)?.run && state(lab).step >= 0) { draw(lab); return; }
    if (lab.dataset.s9Lab === 'loops' && target === find(lab, 'variant')) find(lab, 'values').value = loopInputs[value(lab, 'variant')];
    if (lab.dataset.s9Lab === 'loops' && target === find(lab, 'repeatMode')) find(lab, 'values').value = value(lab, 'repeatMode') === 'positive' ? '0, -2, 3' : '2, 3, 0';
    if (lab.dataset.s9Lab === 'representations' && target === find(lab, 'variant')) find(lab, 'values').value = value(lab, 'variant') === 'two-stage' ? '0, 5, 27, 4, 27, 0' : '2, 3, 1';
    hide(lab);
    configure(lab);
    status(lab, 'Inputs changed. The earlier result is cleared. Predict again.');
  }
  labs.forEach(lab => {
    try { configure(lab, true); } catch (error) {
      hide(lab);
      status(lab, error.message);
      lab.querySelectorAll('button').forEach(button => { button.disabled = true; });
      return;
    }
    hide(lab);
    lab.addEventListener('input', event => { if (event.target.matches('input, select')) changed(lab, event.target); });
    lab.addEventListener('change', event => { if (event.target.matches('input, select')) changed(lab, event.target); });
    lab.addEventListener('click', event => {
      const button = event.target.closest('[data-s9-action]');
      if (!button || !lab.contains(button)) return;
      const action = button.dataset.s9Action;
      try {
        if (action === 'reset') { reset(lab); return; }
        if (action.startsWith('case-')) {
          const places = numeric(lab, 'places');
          M.integer(places, 'Places left', 0, 100);
          find(lab, 'quantity').value = action === 'case-zero' ? 0 : action === 'case-last' ? places : places + 1;
          changed(lab, find(lab, 'quantity')); return;
        }
        if (action.startsWith('payment-')) {
          const quantity = numeric(lab, 'quantity');
          M.integer(quantity, 'Quantity', 1, 100);
          const amount = quantity * (checked(lab, 'student') ? 2250 : 2500);
          find(lab, 'paid').value = M.money(action === 'payment-less' ? amount - 1 : amount);
          changed(lab, find(lab, 'paid')); return;
        }
        if (action === 'reveal') { reveal(lab); return; }
        if (['next', 'previous'].includes(action)) {
          const current = state(lab);
          if (!current.run) current.run = buildRun(lab);
          current.step = M.moveStep(current.step, action, current.run.frames.length);
          draw(lab, true);
        }
      } catch (error) {
        hide(lab);
        status(lab, error instanceof Error ? error.message : 'Check the inputs and try again.');
      }
    });
  });
  const within = (event, action) => labs.forEach(lab => {
    if (event.target === lab || event.target.contains?.(lab)) action(lab);
  });
  document.addEventListener('s9:reset', event => within(event, reset));
  document.addEventListener('s9:hide', event => within(event, lab => { hide(lab); status(lab, 'Results hidden. Predict before stepping again.'); }));
})();
