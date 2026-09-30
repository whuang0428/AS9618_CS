/* Teacher-operated Section 7 examples: no live AI, timers, network or paid services. */
(() => {
  'use strict';
  if (typeof section7Models === 'undefined') return;
  const labs = [...document.querySelectorAll('[data-s7-lab]')];
  if (!labs.length) return;
  const M = section7Models;
  const initial = new Map(labs.map(lab => [lab, lab.innerHTML]));
  const states = new WeakMap();
  const find = (lab, role) => lab.querySelector(`[data-s7-role="${role}"]`);
  const value = (lab, role) => find(lab, role).value;
  const checked = (lab, role) => find(lab, role).checked;
  const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const number = value => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format(value);
  const card = (title, content) => `<div class="s7-lab-card"><strong>${escape(title)}</strong><p>${escape(content)}</p></div>`;
  const table = (caption, headings, rows) => `<div class="s7-lab-table"><table><caption>${escape(caption)}</caption><thead><tr>${headings.map(cell => `<th scope="col">${escape(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, index) => index ? `<td>${escape(cell)}</td>` : `<th scope="row">${escape(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const say = (lab, text) => { find(lab, 'status').textContent = text; };
  function state(lab) {
    if (!states.has(lab)) states.set(lab, { step: -1, corrected: false });
    return states.get(lab);
  }
  function hide(lab) {
    const output = find(lab, 'output');
    output.hidden = true;
    output.innerHTML = '';
  }
  function show(lab, html) {
    const output = find(lab, 'output');
    output.innerHTML = html;
    output.hidden = false;
  }
  function reset(lab) {
    lab.innerHTML = initial.get(lab);
    states.delete(lab);
    initialise(lab);
  }
  function drawStimulus(lab) {
    const kind = lab.dataset.s7Lab;
    const stimulus = find(lab, 'stimulus');
    if (kind === 'ethics') {
      const scenario = M.ethicsCases[value(lab, 'scenario')];
      stimulus.textContent = scenario.situation;
      find(lab, 'safeguard').textContent = `${value(lab, 'safeguards') === 'available' ? 'Available' : 'Missing'} safeguard: ${scenario.safeguard}`;
    }
    if (kind === 'licence') stimulus.textContent = M.licenceOffers[value(lab, 'offer')].terms;
    if (kind === 'fairness') stimulus.innerHTML = M.fairnessCases[value(lab, 'case')].groups.map(group => card(group.name, `${group.correct} correct captions out of ${group.total} tested`)).join('');
    if (kind === 'costs') {
      const data = M.costCases[value(lab, 'case')];
      stimulus.innerHTML = table('Given costs (currency units)', ['Item', 'Manual method', 'AI-assisted method'], [
        ['Routine work, per month', number(data.manual), 'Included in the service below'],
        ['Service, per month', '—', number(data.service)], ['Human review, per month', '—', number(data.review)],
        ['Maintenance, per month', '—', number(data.maintenance)], ['Expected rework, per month', '—', number(data.rework)],
        ['Initial integration, paid once', '0', number(data.setup)]
      ]);
    }
    if (kind === 'environment') {
      const data = M.environmentCases[value(lab, 'case')];
      stimulus.innerHTML = table('Given electricity figures', ['Item', 'Previous method', 'AI-assisted method'], [
        ['Pump operation each month', '1,000 kWh', `${number(data.pump)} kWh`],
        ['Additional AI and cooling each month', '0 kWh', `${number(data.computing)} kWh`],
        ['Manufacturing electricity of additional devices', 'No additional devices', '1,200 kWh'],
        ['Assumed allocation lifetime', 'Not applicable', `${value(lab, 'lifetime')} months`]
      ]) + '<p>Shared equipment manufacture and other unchanged loads are excluded equally. Only the additional devices are allocated here. This simplified allocation spreads manufacturing electricity across their assumed useful life; it does not mean manufacture happens again each month.</p>';
    }
    if (kind === 'pipeline') {
      const correct = lab.querySelector('[data-s7-action="correct"]');
      correct.disabled = value(lab, 'condition') !== 'blurred' || state(lab).corrected;
      stimulus.innerHTML = '<strong lang="fr">Sortie</strong><p>' + (state(lab).corrected ? 'The recognised text has been checked and corrected. Trace the stages again to see the effect.' : value(lab, 'condition') === 'blurred' ? 'The original word remains “Sortie”. In this blurred-image example, OCR will recognise “Sorte”. Predict the later results before stepping.' : 'The original label is clear. Trace how its image becomes recognised text, translated text and sound.') + '</p>';
    }
  }
  function trace(lab) {
    return lab.dataset.s7Lab === 'ethics'
      ? M.ethicsTrace({ scenario: value(lab, 'scenario'), action: value(lab, 'choice'), safeguards: value(lab, 'safeguards') === 'available' })
      : M.readingPipeline({ blurred: value(lab, 'condition') === 'blurred', corrected: state(lab).corrected });
  }
  function drawSequence(lab) {
    const current = state(lab).step;
    const frames = trace(lab);
    lab.querySelectorAll('.s7-lab-steps li').forEach((element, index) => {
      if (index === current) element.setAttribute('aria-current', 'step');
      else element.removeAttribute('aria-current');
      element.dataset.s7Visited = String(index < current);
    });
    lab.querySelector('[data-s7-action="previous"]').disabled = current < 0;
    lab.querySelector('[data-s7-action="next"]').disabled = current === frames.length - 1;
    if (current < 0) { hide(lab); return; }
    const frame = frames[current];
    show(lab, `<h4>${escape(frame.title)}</h4>${frame.output ? `<p class="s7-lab-value">${escape(frame.output)}</p>` : ''}<p>${escape(frame.text || frame.explanation)}</p>`);
    say(lab, `Step ${current + 1} of ${frames.length}. ${frame.title}.`);
  }
  function initialise(lab) {
    state(lab);
    drawStimulus(lab);
    if (['ethics', 'pipeline'].includes(lab.dataset.s7Lab)) drawSequence(lab);
  }
  function reveal(lab) {
    const kind = lab.dataset.s7Lab;
    if (kind === 'licence') {
      const data = M.compareLicence(value(lab, 'offer'), { modify: checked(lab, 'modify'), distribute: checked(lab, 'distribute'), support: checked(lab, 'support'), maxAnnualFee: Number(value(lab, 'budget')) });
      show(lab, `<h4>${data.fits ? 'The offer meets the stated requirements' : 'At least one requirement is not met or confirmed'}</h4>` + table('Check each requirement against the terms', ['Requirement', 'Result', 'Reason'], data.checks.map(check => [check.requirement, check.meets ? 'Meets / not required' : 'Not met or confirmed', check.explanation])) + `<p><strong>Continuing obligation:</strong> ${escape(data.obligation)}</p><p>Price, permissions and support answer different questions. A paid open-source package can supply both modification rights and support. A no-charge trial does not grant continued use or source modification.</p>`);
    }
    if (kind === 'fairness') {
      const data = M.fairnessSummary(value(lab, 'case'));
      show(lab, table('Success rates within this invented test', ['Group', 'Correct / tested', 'Success rate'], [...data.groups.map(group => [group.name, `${group.correct} / ${group.total}`, `${number(group.rate)}%`]), ['Overall', `${data.correct} / ${data.total}`, `${number(data.rate)}%`]]) + `<p>${escape(data.explanation)}</p><p>The gap is ${number(data.gap)} percentage points. The results identify a difference to investigate; they do not establish its cause. Check representative examples, recording conditions and usable correction routes before wider deployment.</p>`);
    }
    if (kind === 'costs') {
      const data = M.costSummary(value(lab, 'case'), Number(value(lab, 'months')));
      show(lab, `<h4>Compare the same ${data.months}-month period</h4>` + table('Cost calculation (currency units)', ['Method', 'Calculation', 'Total'], [
        ['Manual method', `${data.months} × ${data.manual}`, number(data.baselineTotal)],
        ['AI-assisted recurring cost', `${data.service} + ${data.review} + ${data.maintenance} + ${data.rework}`, `${number(data.recurring)} each month`],
        ['AI-assisted period total', `${data.months} × ${data.recurring} + ${data.setup}`, number(data.aiTotal)]
      ]) + `<p><strong>${data.saving === 0 ? 'The two totals are equal.' : `The AI-assisted method costs ${number(Math.abs(data.saving))} ${data.saving > 0 ? 'less' : 'more'} over this period.`}</strong></p><p>${data.breakEvenMonths === null ? 'Its recurring cost is not lower than the baseline, so the initial cost is not recovered under these fixed assumptions.' : `With these fixed monthly costs, the initial outlay is recovered after ${data.breakEvenMonths} complete months. A shorter comparison can reach a different conclusion.`}</p><p>This calculation values the stated work and expenses. It does not establish that staffing expenditure will fall: released time may be used for other tasks. Real savings depend on workload, contracts, errors and how staff time is used.</p>`);
    }
    if (kind === 'environment') {
      const data = M.environmentSummary(value(lab, 'case'), Number(value(lab, 'lifetime')));
      show(lab, table('12-month electricity comparison (kWh)', ['Boundary', 'Calculation', 'Total'], [
        ['Previous operating method', '12 × 1,000', number(data.baselineTotal)],
        ['AI-assisted operation', `12 × (${data.pump} + ${data.computing})`, number(data.operatingTotal)],
        ['Allocated additional manufacturing', `1,200 × 12 / ${data.lifetimeMonths}`, number(data.manufacturingAllocation)],
        ['AI-assisted operation + allocation', `${number(data.operatingTotal)} + ${number(data.manufacturingAllocation)}`, number(data.comparisonTotal)]
      ]) + `<p>Operating electricity is <strong>${number(Math.abs(data.operatingSaving))} kWh ${data.operatingSaving >= 0 ? 'lower' : 'higher'}</strong>. Including the stated manufacturing allocation, the comparison is <strong>${number(Math.abs(data.comparisonSaving))} kWh ${data.comparisonSaving >= 0 ? 'lower' : 'higher'}</strong> than the previous method.</p><p>This supports a conclusion about electricity within the stated boundary. It does not establish total environmental impact: emissions depend on electricity sources, and materials, cooling water, disposal and other manufacturing impacts still need evidence. Water saved cannot be subtracted from electricity used.</p>`);
    }
    say(lab, 'Comparison revealed. Change a condition, predict again and compare the new result.');
  }
  document.addEventListener('change', event => {
    const lab = event.target.closest('[data-s7-lab]');
    if (!initial.has(lab)) return;
    states.set(lab, { step: -1, corrected: false });
    hide(lab);
    drawStimulus(lab);
    if (['ethics', 'pipeline'].includes(lab.dataset.s7Lab)) drawSequence(lab);
    say(lab, 'Conditions changed. Predict the new result before revealing it.');
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-s7-action]');
    const lab = button?.closest('[data-s7-lab]');
    if (!initial.has(lab)) return;
    const action = button.dataset.s7Action;
    if (action === 'reset') { reset(lab); return; }
    if (action === 'reveal') { reveal(lab); return; }
    if (action === 'correct') {
      if (value(lab, 'condition') !== 'blurred') return;
      states.set(lab, { step: -1, corrected: true });
      hide(lab); drawStimulus(lab); drawSequence(lab);
      say(lab, 'OCR text checked and corrected from “Sorte” to “Sortie”. Trace the stages again.');
      return;
    }
    if (action === 'next' || action === 'previous') {
      const current = state(lab);
      if (current.step === -1) current.step = action === 'next' ? 0 : -1;
      else if (action === 'previous' && current.step === 0) current.step = -1;
      else current.step = M.moveStep(current.step, action, trace(lab).length);
      drawSequence(lab);
      if (current.step < 0) say(lab, 'Back at the prediction. No explanation is revealed.');
    }
  });
  function resetWithin(event) {
    const target = event.target;
    for (const lab of labs) if (target === lab || target.contains(lab)) reset(lab);
  }
  document.addEventListener('s7:reset', resetWithin);
  document.addEventListener('s7:hide', resetWithin);
  labs.forEach(initialise);
})();
