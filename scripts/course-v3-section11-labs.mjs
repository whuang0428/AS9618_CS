// Shared markup and field definitions keep each prepared program and its controls aligned.
import Models from './course-v3-section11-models.js';
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const button = (action, label, extra = '') => `<button type="button" data-s11-action="${action}" ${extra}>${label}</button>`;
function fieldMarkup(field, value) {
  const control = field.type === 'select'
    ? `<select data-s11-input="${field.name}">${field.options.map(option => `<option${String(value) === option ? ' selected' : ''}>${esc(option)}</option>`).join('')}</select>`
    : `<input data-s11-input="${field.name}" type="${field.type}" value="${esc(value)}" ${field.type === 'number' ? `min="${field.min}" max="${field.max}" step="${field.step}"` : `maxlength="${field.maxlength}"`} autocomplete="off">`;
  return `<label>${esc(field.label)}${control}</label>`;
}
export function renderLab(key, config = {}) {
  const definition = Models.definitions[key];
  if (!definition) throw new RangeError(`Unknown Section 11 lab: ${key}`);
  const values = Object.fromEntries(definition.fields.map(field => [field.name, config[field.name] ?? field.value]));
  const prepared = Models.prepare(key, values);
  return `<div class="s11-lab" data-s11-lab="${key}"><h3>${esc(definition.title)}</h3>
<p class="s11-lab-note">${esc(definition.note)}</p>
<details class="s11-lab-setup"><summary>Change inputs / prepared constants</summary><div class="s11-lab-fields">${definition.fields.map(field => fieldMarkup(field, values[field.name])).join('')}${button('prepare', 'Prepare example')}</div><p>Changing a field does not execute code. Prepare validates the fields and starts a new trace. Reset restores the original example.</p></details>
<p class="s11-lab-prediction" data-s11-role="prediction"><strong>Predict:</strong> What will change first?</p>
<details class="s11-lab-notes"><summary>Write a prediction (optional)</summary><label>Your prediction<textarea data-s11-role="prediction-note" rows="2" maxlength="300" placeholder="Say or write your prediction before selecting Next step."></textarea></label><p>These notes stay in this page session. They are not marked automatically.</p></details>
<div class="s11-lab-console"><div class="s11-lab-controls">${button('back', 'Previous step', 'disabled')}${button('next', 'Next step')}${button('reset', 'Reset example')}<span data-s11-role="progress">Prepared · no statement executed</span></div>
<p class="s11-lab-status" data-s11-role="status" role="status" aria-live="polite">Prepared. No program statement has executed.</p></div>
<div class="s11-lab-grid"><section class="s11-lab-program"><h4>Complete pseudocode <small>highlight = current execution step</small></h4><div class="s11-lab-code" data-s11-role="code" tabindex="0" role="region" aria-label="Complete pseudocode, scroll to inspect every line"><ol>${prepared.code.map(line => `<li><code>${esc(line) || ' '}</code></li>`).join('')}</ol></div></section>
<section class="s11-lab-state"><h4>Working memory</h4><div data-s11-role="variables"><p>No value has been assigned.</p></div><div data-s11-role="stream"></div><div data-s11-role="return"></div><div data-s11-role="metrics"></div><h4>Output so far</h4><ol class="s11-lab-output" data-s11-role="output"><li>No output yet.</li></ol></section></div>
<p class="s11-lab-note">This is a guided model of the complete program shown above. It accepts the bounded inputs in this panel; it does not run arbitrary pseudocode.</p><noscript><p>Enable JavaScript to step through the program. The complete pseudocode remains readable above.</p></noscript></div>`;
}
export const labMarkup = Object.fromEntries(Object.keys(Models.definitions).map(key => [key, renderLab(key)]));
