import Models from './course-v3-section12-models.js';
const esc = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const button = (action, label, extra = '') => `<button type="button" data-s12-action="${action}" ${extra}>${label}</button>`;
function fieldMarkup(field, value, values) {
  const hidden = field.when && Object.entries(field.when).some(([name, options]) => !options.includes(values[name]));
  const control = field.type === 'select'
    ? `<select data-s12-input="${field.name}">${field.options.map(option => `<option${String(value) === option ? ' selected' : ''}>${esc(option)}</option>`).join('')}</select>`
    : `<input data-s12-input="${field.name}" type="${field.type}" value="${esc(value)}" ${field.type === 'number' ? `min="${field.min}" max="${field.max}" step="${field.step}"` : `maxlength="${field.maxlength}"`} autocomplete="off">`;
  return `<label data-s12-field="${field.name}"${hidden ? ' hidden' : ''}>${esc(field.label)}${control}</label>`;
}
export function renderLab(key, config = {}) {
  const definition = Models.definitions[key];
  if (!definition) throw new RangeError(`Unknown Section 12 lab: ${key}`);
  const values = Object.fromEntries(definition.fields.map(field => [field.name, config[field.name] ?? field.value]));
  const run = Models.prepare(key, values), frame = run.frames[0];
  return `<div class="s12-lab" data-s12-lab="${key}">
<h3>${esc(definition.title)}</h3><p class="s12-lab-note">${esc(definition.note)}</p>
<details class="s12-lab-setup"><summary>Change the example</summary><div class="s12-lab-fields">${definition.fields.map(field => fieldMarkup(field, values[field.name], values)).join('')}${button('prepare', 'Prepare example')}</div><p>After changing a field, select Prepare example. Previous / Next review the prepared example. Reset restores the original inputs.</p></details>
<p class="s12-lab-prediction" data-s12-role="prediction"><strong>Predict:</strong> ${esc(frame.predict)}</p>
<details class="s12-lab-notes"><summary>Write a prediction (optional)</summary><label>Your prediction<textarea data-s12-role="prediction-note" rows="2" maxlength="300" placeholder="Say or write a prediction before revealing the next step."></textarea></label><p>Your notes stay in this page session and are not marked automatically.</p></details>
<div class="s12-lab-console"><div class="s12-lab-controls">${button('back', 'Previous step', 'disabled')}${button('next', 'Reveal next step')}${button('reset', 'Reset example')}<span data-s12-role="progress">Ready · no result revealed</span></div><p class="s12-lab-status" data-s12-role="status" role="status" aria-live="polite">${esc(frame.explanation)}</p></div>
<div class="s12-lab-visual" data-s12-role="visual" aria-label="Activity progress">${run.nodes.map(node => `<span>${esc(node)}</span>`).join('')}</div>
<p class="s12-lab-flow" data-s12-role="flow" hidden></p>
<h4 class="s12-lab-step-title" data-s12-role="title">${esc(frame.title)}</h4>
<div class="s12-lab-grid"><section><h4>Current evidence</h4><p class="s12-lab-artifact" data-s12-role="artifact">${esc(frame.artifact)}</p><div data-s12-role="table"></div><div data-s12-role="output"></div></section><section><h4>Current values</h4><div data-s12-role="variables"><table><tbody>${Object.entries(frame.variables).map(([name, value]) => `<tr><th scope="row">${esc(name)}</th><td>${esc(Models.shown(value))}</td></tr>`).join('')}</tbody></table></div></section></div>
<details class="s12-lab-source" data-s12-role="source"${run.code.length ? '' : ' hidden'}><summary>Inspect the complete prepared pseudocode</summary><p>Highlighted lines belong to the current step. One teaching step can cover a call or a test, so it may highlight several lines.</p><div class="s12-lab-code" data-s12-role="code" tabindex="0" role="region" aria-label="Prepared pseudocode"><ol>${run.code.map(line => `<li><code>${esc(line) || ' '}</code></li>`).join('')}</ol></div></details>
<p class="s12-lab-note">This activity follows the stated rules and input limits. Each result is revealed only when you move to its step.</p><noscript><p>Enable JavaScript to change inputs and reveal the activity steps. The starting example remains readable above.</p></noscript></div>`;
}
export const labMarkup = Object.fromEntries(Object.keys(Models.definitions).map(key => [key, renderLab(key)]));
