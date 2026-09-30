/* Each lab owns its prepared trace. Input edits never silently change a running example. */
(() => {
  'use strict';
  const Models = window.Section11Models;
  if (!Models) return;
  const sessions = new WeakMap();
  const original = new WeakMap();
  const find = (lab, role) => lab.querySelector(`[data-s11-role="${role}"]`);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const display = value => value === null ? 'not assigned' : typeof value === 'string' ? `"${value}"` : Models.shown(value);
  function tell(lab, message, error = false) { const status = find(lab, 'status'); status.textContent = message; status.dataset.error = String(error); }
  function read(lab) { return Object.fromEntries([...lab.querySelectorAll('[data-s11-input]')].map(input => [input.dataset.s11Input, input.value])); }
  function controls(lab, session) {
    lab.querySelector('[data-s11-action="back"]').disabled = !session || session.pending || session.index === 0;
    lab.querySelector('[data-s11-action="next"]').disabled = !session || session.pending || session.index >= session.run.frames.length - 1;
  }
  function draw(lab) {
    const session = sessions.get(lab), frame = session.run.frames[session.index];
    const code = find(lab, 'code');
    if (session.codeDrawn !== session.run.code) { code.innerHTML = `<ol>${session.run.code.map((line, index) => `<li data-s11-line="${index + 1}"><code>${esc(line) || ' '}</code></li>`).join('')}</ol>`; session.codeDrawn = session.run.code; }
    code.querySelectorAll('[data-s11-line]').forEach(row => { const active = Number(row.dataset.s11Line) === frame.line; row.classList.toggle('is-current', active); if (active) row.setAttribute('aria-current', 'step'); else row.removeAttribute('aria-current'); });
    const active = code.querySelector('.is-current');
    if (active && code.clientHeight) { const top = active.getBoundingClientRect().top - code.getBoundingClientRect().top + code.scrollTop, bottom = top + active.offsetHeight; if (top < code.scrollTop) code.scrollTop = Math.max(0, top - 12); else if (bottom > code.scrollTop + code.clientHeight) code.scrollTop = bottom - code.clientHeight + 12; }
    find(lab, 'variables').innerHTML = `<table><thead><tr><th scope="col">Variable</th><th scope="col">Value after this step</th></tr></thead><tbody>${Object.entries(frame.variables).map(([name, value]) => `<tr><th scope="row"><code>${esc(name)}</code></th><td>${esc(display(value))}</td></tr>`).join('')}</tbody></table>`;
    if (session.run.key === 'efficiency') {
      const copies = session.run.inputs.copies;
      const group = (title, values) => `<li class="s11-lab-output-group"><strong>${title}</strong><ol>${values.length ? values.map(value => `<li>${esc(value)}</li>`).join('') : `<li class="s11-lab-empty">${frame.complete ? 'No output.' : 'No output yet.'}</li>`}</ol></li>`;
      find(lab, 'output').innerHTML = group('Original version', frame.output.slice(0, copies)) + group('Improved version', frame.output.slice(copies));
    } else {
      find(lab, 'output').innerHTML = frame.output.length ? frame.output.map(value => `<li>${esc(value)}</li>`).join('') : '<li class="s11-lab-empty">No output yet.</li>';
    }
    find(lab, 'stream').innerHTML = session.run.inputStream.length ? `<h4>Prepared input stream</h4><p class="s11-lab-stream">${session.run.inputStream.map((value, index) => `<span class="${index < frame.consumed ? 'is-read' : index === frame.consumed ? 'is-next' : ''}">${esc(display(value))}<small>${index < frame.consumed ? 'read' : index === frame.consumed ? 'next' : 'waiting'}</small></span>`).join('')}</p>` : '';
    find(lab, 'return').innerHTML = frame.returnValue !== null ? `<p class="s11-lab-return">Most recent function return: <strong>${esc(display(frame.returnValue))}</strong></p>` : '';
    find(lab, 'metrics').innerHTML = Object.keys(frame.metrics).length ? `<h4>Teaching counters</h4><p>${Object.entries(frame.metrics).map(([label, value]) => `${esc(label)}: <strong>${esc(value)}</strong>`).join('<br>')}</p>` : '';
    find(lab, 'progress').textContent = frame.complete ? `Complete · ${session.index} trace steps` : session.index === 0 ? 'Prepared · no statement executed' : `Trace step ${session.index} / ${session.run.frames.length - 1}${frame.line ? ` · line ${frame.line}` : ''}`;
    find(lab, 'prediction').innerHTML = `<strong>Predict:</strong> ${esc(frame.predict)}`;
    tell(lab, frame.explanation);
    controls(lab, session);
  }
  function prepare(lab) {
    const run = Models.prepare(lab.dataset.s11Lab, read(lab));
    sessions.set(lab, { run, index: 0, pending: false, codeDrawn: null });
    find(lab, 'prediction-note').value = '';
    draw(lab);
  }
  function reset(lab) {
    const values = original.get(lab);
    if (!values) return;
    lab.querySelectorAll('[data-s11-input]').forEach(input => { input.value = values[input.dataset.s11Input]; });
    prepare(lab);
  }
  document.querySelectorAll('.s11-lab').forEach(lab => {
    // A content unit can override defaults using field-name data attributes.
    Models.definitions[lab.dataset.s11Lab]?.fields.forEach(field => { if (Object.prototype.hasOwnProperty.call(lab.dataset, field.name)) lab.querySelector(`[data-s11-input="${field.name}"]`).value = lab.dataset[field.name]; });
    original.set(lab, read(lab));
    try { prepare(lab); } catch (error) { tell(lab, error.message, true); controls(lab); }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('.s11-lab [data-s11-action]');
    if (!button || button.disabled) return;
    const lab = button.closest('.s11-lab'), action = button.dataset.s11Action;
    try {
      if (action === 'prepare') { prepare(lab); return; }
      if (action === 'reset') { reset(lab); return; }
      const session = sessions.get(lab);
      if (!session || session.pending) { tell(lab, 'Prepare the edited example before continuing.', true); return; }
      if (action === 'next' || action === 'back') { session.index = Math.max(0, Math.min(session.run.frames.length - 1, session.index + (action === 'next' ? 1 : -1))); draw(lab); }
    } catch (error) { tell(lab, error.message, true); }
  });
  function edited(event) {
    const input = event.target.closest('.s11-lab [data-s11-input]');
    if (!input) return;
    const lab = input.closest('.s11-lab'), session = sessions.get(lab);
    if (session) session.pending = true;
    controls(lab, session);
    tell(lab, 'Inputs changed. The program and memory still show the previous prepared example. Select Prepare example to validate and use the new inputs.');
  }
  document.addEventListener('input', edited);
  document.addEventListener('change', edited);
  document.addEventListener('s11:reset', event => {
    if (event.target.matches?.('.s11-lab')) reset(event.target);
    else event.target.querySelectorAll?.('.s11-lab').forEach(reset);
  });
})();
