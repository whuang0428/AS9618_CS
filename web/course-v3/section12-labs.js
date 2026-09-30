/* Input edits invalidate the current trace. Every panel owns independent state. */
(() => {
  'use strict';
  const Models = window.Section12Models;
  if (!Models) return;
  const sessions = new WeakMap(), original = new WeakMap();
  const find = (lab, role) => lab.querySelector(`[data-s12-role="${role}"]`);
  const esc = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const read = lab => Object.fromEntries([...lab.querySelectorAll('[data-s12-input]')].map(input => [input.dataset.s12Input, input.value]));
  function tell(lab, message, error = false) { const status = find(lab, 'status'); status.textContent = message; status.dataset.error = String(error); }
  function controls(lab, session) {
    lab.querySelector('[data-s12-action="back"]').disabled = !session || session.pending || session.index === 0;
    lab.querySelector('[data-s12-action="next"]').disabled = !session || session.pending || session.index === session.run.frames.length - 1;
  }
  function fields(lab) {
    const values = read(lab);
    Models.definitions[lab.dataset.s12Lab].fields.forEach(field => {
      const wrapper = lab.querySelector(`[data-s12-field="${field.name}"]`);
      if (wrapper) wrapper.hidden = Boolean(field.when && Object.entries(field.when).some(([name, options]) => !options.includes(values[name])));
    });
  }
  function visual(run, frame) {
    const box = (node, index) => `<span class="s12-lab-node${frame.focus === node ? ' is-current' : ''}"${frame.focus === node ? ' aria-current="step"' : ''}><small>${run.key === 'structure' ? index ? 'Child module' : 'Main module' : 'Stage / state'}</small>${esc(node)}</span>`;
    if (run.key === 'structure') return `<div class="s12-lab-tree"><div>${box(run.nodes[0], 0)}</div><svg class="s12-lab-tree-branches" viewBox="0 0 900 60" aria-hidden="true"><path d="M450 0V18M150 18H750M150 18V52M450 18V52M750 18V52M143 44L150 52L157 44M443 44L450 52L457 44M743 44L750 52L757 44" fill="none" stroke="currentColor" stroke-width="3"/></svg><div class="s12-lab-children">${run.nodes.slice(1).map((node, index) => box(node, index + 1)).join('')}</div><p class="s12-lab-tree-links">The main module calls a child. The child returns control to the main module.</p></div>`;
    if (run.key === 'states') return `<div class="s12-lab-states">${run.nodes.map((node, index) => `${index ? `<span class="s12-lab-edge"><strong>${index === 1 ? 'submit' : 'pay'}</strong>→<small>${index === 1 ? 'valid request' : 'payment'}</small></span>` : ''}${box(node, index)}`).join('')}</div><p class="s12-lab-state-key">cancel: Pending / Confirmed → Draft. An invalid submit in Draft, or any other unlisted event, stays in the same state.</p>`;
    return `<div class="s12-lab-stages">${run.nodes.map(box).join('')}</div>`;
  }
  function tableMarkup(table) {
    if (!table) return '';
    return `<div class="s12-lab-table" tabindex="0" role="region" aria-label="Evidence table, scroll if needed"><table><thead><tr>${table.headers.map(header => `<th scope="col">${esc(header)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(value => `<td${value === 'FAIL' || value === 'STALE' ? ' class="s12-lab-fail"' : value === 'PASS' ? ' class="s12-lab-pass"' : ''}>${esc(Models.shown(value))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function draw(lab) {
    const session = sessions.get(lab), frame = session.run.frames[session.index];
    find(lab, 'visual').innerHTML = visual(session.run, frame);
    find(lab, 'flow').textContent = frame.flow; find(lab, 'flow').hidden = !frame.flow;
    find(lab, 'title').textContent = frame.title;
    find(lab, 'artifact').textContent = frame.artifact; find(lab, 'artifact').hidden = !frame.artifact;
    find(lab, 'variables').innerHTML = `<table><thead><tr><th scope="col">Name</th><th scope="col">Value</th></tr></thead><tbody>${Object.entries(frame.variables).map(([name, value]) => `<tr><th scope="row">${esc(name)}</th><td>${esc(Models.shown(value))}</td></tr>`).join('')}</tbody></table>`;
    find(lab, 'table').innerHTML = tableMarkup(frame.table);
    find(lab, 'output').innerHTML = frame.output.length ? `<h4>Output so far</h4><ol class="s12-lab-output">${frame.output.map(value => `<li>${esc(value)}</li>`).join('')}</ol>` : '';
    const code = find(lab, 'code');
    find(lab, 'source').hidden = !frame.code.length;
    const sourceText = frame.code.join('\n');
    if (session.sourceText !== sourceText) { code.innerHTML = `<ol>${frame.code.map((line, index) => `<li data-s12-line="${index + 1}"><code>${esc(line) || ' '}</code></li>`).join('')}</ol>`; session.sourceText = sourceText; }
    code.querySelectorAll('[data-s12-line]').forEach(row => { const active = frame.lines.includes(Number(row.dataset.s12Line)); row.classList.toggle('is-current', active); if (active) row.setAttribute('aria-current', 'step'); else row.removeAttribute('aria-current'); });
    const active = code.querySelector('.is-current');
    if (active && code.clientHeight) { const top = active.getBoundingClientRect().top - code.getBoundingClientRect().top + code.scrollTop, bottom = top + active.offsetHeight; if (top < code.scrollTop) code.scrollTop = Math.max(0, top - 12); else if (bottom > code.scrollTop + code.clientHeight) code.scrollTop = bottom - code.clientHeight + 12; }
    find(lab, 'prediction').innerHTML = `<strong>Predict:</strong> ${esc(frame.predict)}`;
    find(lab, 'progress').textContent = session.index === 0 ? 'Ready · no result revealed' : `${frame.complete ? 'Complete' : 'Step'} ${session.index} / ${session.run.frames.length - 1}`;
    tell(lab, frame.explanation); controls(lab, session);
  }
  function prepare(lab) {
    const run = Models.prepare(lab.dataset.s12Lab, read(lab));
    sessions.set(lab, { run, index: 0, pending: false, sourceText: null });
    find(lab, 'prediction-note').value = '';
    fields(lab); draw(lab);
  }
  function reset(lab) {
    const values = original.get(lab);
    if (!values) return;
    lab.querySelectorAll('[data-s12-input]').forEach(input => { input.value = values[input.dataset.s12Input]; });
    find(lab, 'source').open = false;
    prepare(lab);
  }
  document.querySelectorAll('.s12-lab').forEach(lab => {
    original.set(lab, read(lab));
    try { prepare(lab); } catch (error) { tell(lab, error.message, true); controls(lab); }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.s12-lab [data-s12-action]');
    if (!button || button.disabled) return;
    const lab = button.closest('.s12-lab'), action = button.dataset.s12Action;
    try {
      if (action === 'prepare') { prepare(lab); return; }
      if (action === 'reset') { reset(lab); return; }
      const session = sessions.get(lab);
      if (!session || session.pending) { tell(lab, 'Prepare the changed inputs before continuing.', true); return; }
      if (action === 'next' || action === 'back') { session.index = Math.max(0, Math.min(session.run.frames.length - 1, session.index + (action === 'next' ? 1 : -1))); draw(lab); }
    } catch (error) { tell(lab, error.message, true); }
  });
  function edited(event) {
    const input = event.target.closest('.s12-lab [data-s12-input]');
    if (!input) return;
    const lab = input.closest('.s12-lab'), session = sessions.get(lab);
    if (session) session.pending = true;
    fields(lab); controls(lab, session);
    tell(lab, 'Inputs changed. The evidence still belongs to the previous prepared example. Select Prepare example to validate and use the new inputs.');
  }
  document.addEventListener('input', edited);
  document.addEventListener('change', edited);
  document.addEventListener('s12:reset', event => {
    if (event.target.matches?.('.s12-lab')) reset(event.target);
    else event.target.querySelectorAll?.('.s12-lab').forEach(reset);
  });
  document.addEventListener('s12:hide', event => {
    const labs = event.target.matches?.('.s12-lab') ? [event.target] : event.target.querySelectorAll?.('.s12-lab') || [];
    labs.forEach(lab => { find(lab, 'source').open = false; find(lab, 'prediction-note').closest('details').open = false; });
  });
})();
