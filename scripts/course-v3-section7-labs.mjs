// Markup and browser behaviour use the same invented classroom data.
import models from './course-v3-section7-models.js';
const escape = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const options = (items, label = 'label') => Object.entries(items).map(([key, value]) => `<option value="${escape(key)}">${escape(value[label])}</option>`).join('');
const button = (action, label, extra = '') => `<button type="button" data-s7-action="${action}" ${extra}>${label}</button>`;
const controls = content => `<div class="s7-lab-controls">${content}</div>`;
const select = (role, label, choices) => `<label>${label}<select data-s7-role="${role}">${choices}</select></label>`;
const checkbox = (role, label, checked = false) => `<label><input type="checkbox" data-s7-role="${role}" ${checked ? 'checked' : ''}> ${label}</label>`;
const steps = labels => `<ol class="s7-lab-steps" aria-label="Demonstration steps">${labels.map(label => `<li>${label}</li>`).join('')}</ol>`;
const wrap = (key, html) => `<div class="s7-lab" data-s7-lab="${key}">${html}<div class="s7-lab-output" data-s7-role="output" hidden></div><p class="s7-lab-status" data-s7-role="status" role="status" aria-live="polite">Make a prediction before revealing the explanation.</p>${controls(button('reset', 'Reset demonstration'))}</div>`;
const sequence = () => controls(button('previous', 'Previous step', 'disabled') + button('next', 'Reveal next step'));
export const labMarkup = {
  ethics: wrap('ethics', `
    <p>Choose a situation and propose an action. Identify the people affected before tracing the consequences.</p>
    ${controls(select('scenario', 'Situation', options(models.ethicsCases)))}
    <div class="s7-lab-card" data-s7-role="stimulus"></div>
    <fieldset><legend>Compare the conditions and your proposed action</legend>
      ${controls(select('safeguards', 'Safeguards', '<option value="available">The stated safeguards are available</option><option value="missing">The stated safeguards are missing</option>'))}
      <p data-s7-role="safeguard"></p>
      ${controls(select('choice', 'Proposed action', '<option value="pause">Report concerns and pause the affected use</option><option value="limited">Run a limited evaluation with safeguards</option><option value="proceed">Proceed unchanged without reporting concerns</option>'))}
    </fieldset>
    <p><strong>Predict:</strong> Who gains or loses from your choice? Which conditions must hold for it to be justified?</p>
    ${steps(['People', 'Responsibilities', 'Consequences', 'Judgement'])}${sequence()}`),
  licence: wrap('licence', `
    <p>The school needs the software for a complete school year. These fictional offers separate permissions, price and support. Read the chosen terms before judging the offer.</p>
    ${controls(select('offer', 'Offer to inspect', options(models.licenceOffers, 'name')))}
    <div class="s7-lab-card" data-s7-role="stimulus"></div>
    <fieldset><legend>Required activities and budget</legend>
      ${controls(checkbox('modify', 'Modify the source', true) + checkbox('distribute', 'Share a changed version with another school', true) + checkbox('support', 'Support response within four operating hours'))}
      ${controls(select('budget', 'Maximum annual package charge (currency units)', '<option value="0">0</option><option value="300">300</option><option value="400">400</option>'))}
    </fieldset>
    <p><strong>Predict:</strong> Does this offer meet every requirement? Identify the term that supports each part of your answer.</p>
    ${controls(button('reveal', 'Compare the requirements'))}`),
  pipeline: wrap('pipeline', `
    <p>A school reading aid photographs a French sign and reads its meaning in English. The original sign says <strong lang="fr">Sortie</strong> (exit).</p>
    ${controls(select('condition', 'Photograph', '<option value="clear">Clear image</option><option value="blurred">Blurred image: OCR misses one letter</option>'))}
    <div class="s7-lab-card" data-s7-role="stimulus"><strong lang="fr">Sortie</strong><p>This is the original sign. Predict which representation passes to each stage.</p></div>
    ${steps(['Camera', 'OCR', 'Language processing', 'Translation', 'Speech'])}
    <p><strong>Predict:</strong> Can a later stage produce a clear result from incorrect recognised text?</p>
    ${sequence()}${controls(button('correct', 'Check and correct the OCR text', 'disabled'))}`),
  fairness: wrap('fairness', `
    <p>Invented caption tests: a complete caption counts as correct only when it matches its checked reference. These groups are test samples, not claims about accents.</p>
    ${controls(select('case', 'Test conditions', options(models.fairnessCases)))}
    <div class="s7-lab-grid" data-s7-role="stimulus"></div>
    <p><strong>Predict:</strong> Calculate each group’s success rate and the overall rate. Does the overall result describe both groups equally well?</p>
    ${controls(button('reveal', 'Calculate and compare'))}`),
  costs: wrap('costs', `
    <p>Invented costs for the same volume of reading-support work each month, measured in currency units. All figures below are included; other unchanged costs are excluded equally.</p>
    ${controls(select('case', 'Operating conditions', options(models.costCases)) + select('months', 'Comparison period', '<option value="1">1 month</option><option value="6">6 months</option><option value="12">12 months</option>'))}
    <div data-s7-role="stimulus"></div>
    <p><strong>Predict:</strong> Include service, review, maintenance, rework and initial integration. Is the AI-assisted method cheaper over the selected period?</p>
    ${controls(button('reveal', 'Compare total costs'))}`),
  environment: wrap('environment', `
    <p>Invented irrigation example: both methods meet the same watering need under comparable conditions over <strong>12 months</strong>. Electricity is measured in kWh.</p>
    ${controls(select('case', 'Additional AI and cooling electricity', options(models.environmentCases)) + select('lifetime', 'Assumed lifetime for allocating new-device manufacture', '<option value="60">60 months</option><option value="12">12 months</option>'))}
    <div data-s7-role="stimulus"></div>
    <p><strong>Predict:</strong> Compare operating electricity first. Then include the allocated manufacturing electricity. Does your conclusion change?</p>
    ${controls(button('reveal', 'Compare electricity within this boundary'))}`)
};
