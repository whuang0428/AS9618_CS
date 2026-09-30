import models from './course-v3-section9-models.js';

const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const options = entries => entries.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
const button = (action, label, extra = '') => `<button type="button" data-s9-action="${action}" ${extra}>${label}</button>`;
const controls = html => `<div class="s9-lab-controls">${html}</div>`;
const select = (role, label, entries) => `<label>${label}<select data-s9-role="${role}">${options(entries)}</select></label>`;
const number = (role, label, value, min = 0, max = 100, step = 1) => `<label>${label}<input type="number" data-s9-role="${role}" value="${value}" min="${min}" max="${max}" step="${step}" inputmode="${step === 1 ? 'numeric' : 'decimal'}"></label>`;
const checkbox = (role, label, checked = false) => `<label><input type="checkbox" data-s9-role="${role}" ${checked ? 'checked' : ''}> ${label}</label>`;
const student = () => checkbox('student', 'Student discount applies', true);
const quantity = () => number('quantity', 'Requested quantity', 2, -1);
const sequence = () => `<div class="s9-step-controls">${controls(button('previous', 'Previous step', 'disabled') + button('next', 'Next step'))}</div>`;
const wrap = (key, html, stepping = true) => `<div class="s9-lab" data-s9-lab="${key}">
  ${html}
  ${stepping ? sequence() : controls(button('reveal', 'Check the model'))}
  <div class="s9-lab-output" data-s9-role="output" hidden></div>
  <p class="s9-lab-status" data-s9-role="status" role="status" aria-live="polite">Predict the result before revealing a step.</p>
  ${controls(button('reset', 'Restart experiment'))}
</div>`;

export const labMarkup = {
  abstraction: wrap('abstraction', `
    <p>The same event can need different models. Select the facts needed for the chosen purpose.</p>
    ${controls(select('purpose', 'Purpose', Object.entries(models.purposes).map(([key, value]) => [key, value.label])))}
    <fieldset><legend>Information to keep</legend><div class="s9-lab-controls">${Object.entries(models.facts).map(([key, value]) => `<label><input type="checkbox" data-s9-fact="${key}" ${['Quantity', 'Performance', 'PlacesLeft'].includes(key) ? 'checked' : ''}> ${esc(value.label)}: <strong>${esc(value.value)}</strong></label>`).join('')}</div></fieldset>
    <p class="s9-lab-prediction"><strong>Predict:</strong> Can your model answer the chosen question? Is any selected detail unnecessary?</p>`, false),
  trace: wrap('trace', `
    <p>A ticket costs 25.00. Trace one statement at a time and watch which values change.</p>
    ${controls(select('variant', 'Algorithm', [['ipo', 'Input → calculation → output'], ['assignment', 'Change a stored value'], ['selection', 'Choose a discount branch']]) + number('quantity', 'Requested quantity', 2) + `<span data-s9-option="student">${student()}</span>`)}
    ${controls(checkbox('earlyOutput', 'Move OUTPUT before the calculation'))}
    <p class="s9-lab-prediction"><strong>Predict:</strong> What will the next statement read, change or display?</p>`),
  conditions: wrap('conditions', `
    <p>Accept a request only when its quantity is at least 1 and no more than the places left. Compare that requirement with an expression.</p>
    ${controls(quantity() + number('places', 'Places left', 8) + select('operator', 'Combine comparisons', [['AND', 'AND'], ['OR', 'OR'], ['NOT', 'NOT (the whole AND condition)']]) + select('boundary', 'Upper comparison', [['inclusive', 'Quantity <= PlacesLeft'], ['strict', 'Quantity < PlacesLeft']]))}
    ${controls(button('case-zero', 'Try quantity 0') + button('case-last', 'Try the exact capacity') + button('case-over', 'Try one too many'))}
    <p class="s9-lab-prediction"><strong>Predict:</strong> Will this expression match the rule? Try each boundary.</p>`),
  loops: wrap('loops', `
    <p data-s9-role="loop-intro">Supply a short input sequence. Follow the loop control, the current input and the running total.</p>
    ${controls(select('variant', 'Loop', [['for', 'FOR: add a fixed number of values'], ['conditional', 'FOR: add only positive values'], ['while', 'WHILE: stop at sentinel 0'], ['repeat', 'REPEAT: test after the body']]))}
    ${controls('<label>Inputs in order, separated by commas<input type="text" data-s9-role="values" value="2, 3, 1" inputmode="text" autocomplete="off" spellcheck="false"></label>' + `<span data-s9-option="reverse">${checkbox('reversed', 'Reverse the stopping comparison')}</span>` + `<span data-s9-option="reset-inside">${checkbox('resetInside', 'Move Total ← 0 inside the loop')}</span>` + `<span data-s9-option="repeat-mode">${select('repeatMode', 'REPEAT task', [['positive', 'Ask until the quantity is positive'], ['sentinel', 'Collect until sentinel 0']])}</span>`)}
    <p class="s9-lab-note" data-s9-role="loop-note"></p>
    <p class="s9-lab-prediction" data-s9-role="loop-predict"><strong>Predict:</strong> How often will the body execute? Which values contribute to Total?</p>`),
  representations: wrap('representations', `
    <p>These views describe the same algorithm. Each step highlights the corresponding statement and flowchart node.</p>
    ${controls(select('variant', 'Algorithm', [['selection', 'Choose a student discount'], ['quantity', 'Check the quantity limits'], ['sequence', 'Calculate a ticket charge'], ['loop', 'Add the supplied quantities'], ['two-stage', 'Wait for 27, then add until 0']]) + number('quantity', 'Requested quantity', 2, -1) + number('places', 'Places left', 8) + `<span data-s9-option="student">${student()}</span>`)}
    ${controls('<label hidden>Inputs in order, separated by commas<input type="text" data-s9-role="values" value="2, 3, 1" autocomplete="off" spellcheck="false"></label>' + select('view', 'Representation to inspect', [['flow', 'Flowchart'], ['both', 'Pseudocode and flowchart'], ['code', 'Pseudocode'], ['english', 'Structured English']]))}
    <p class="s9-lab-prediction"><strong>Predict:</strong> Which operation comes next in each representation?</p>`),
  modules: wrap('modules', `
    <p>The caller needs an amount for payment and the receipt. Compare returning that amount with only displaying it.</p>
    ${controls(number('quantity', 'Requested quantity', 2, 1) + number('price', 'Price per ticket', '25.00', 0, 100000, 0.01) + student() + select('mode', 'Calculation module', [['return', 'Return the calculated amount'], ['display', 'Only display the calculated amount']]))}
    <p class="s9-lab-prediction"><strong>Predict:</strong> Will the caller receive a numeric Charge?</p>`),
  refinement: wrap('refinement', `
    <p>Choose a task and refine each unfinished operation. The final version must state its comparisons, calculations and outputs.</p>
    ${controls(select('variant', 'Task to refine', [['charge', 'Calculate the ticket charge'], ['payment', 'Complete the payment'], ['points', 'Award shop reward points']]) + select('detail', 'Detail level', [['goal', 'Goal only'], ['outline', 'Outline the tasks'], ['operations', 'Programmable operations']]) + select('missing', 'Omit one rule', [['none', 'Keep every rule'], ['price', 'Hide the first calculation or condition'], ['discount', 'Hide a required calculation or update'], ['output', 'Hide the output rule']]))}
    <div data-s9-option="charge-fields">${controls(number('quantity', 'Requested quantity', 2, 1) + `<span data-s9-option="student">${student()}</span>`)}</div>
    <div data-s9-option="payment-fields">${controls(number('places', 'Places left', 8) + number('total', 'Known amount due', '45.00', 0, 100000, 0.01) + number('paid', 'Amount paid', '50.00', 0, 100000, 0.01))}</div>
    <div data-s9-option="points-fields">${controls(number('amount', 'Original amount spent', '99.77', 0, 100000, 0.01) + checkbox('truncateFirst', 'Try choosing the band after discarding the fraction'))}<p>Below 10: 5 points per whole dollar. From 10 through 100: 7. Above 100: 10. The original amount determines the band.</p></div>
    <p class="s9-lab-prediction"><strong>Predict:</strong> Could a programmer implement every leaf without inventing a rule?</p>`, false),
  ticket: wrap('ticket', `
    <p>Each ticket costs 25.00. A student gets 10% off the subtotal. Confirm and reduce the places only after sufficient payment.</p>
    ${controls(quantity() + number('places', 'Places left', 8) + student() + number('paid', 'Amount paid', '50.00', 0, 100000, 0.01))}
    ${controls(button('payment-less', 'Try 0.01 below the amount due') + button('payment-exact', 'Try exact payment'))}
    <p class="s9-lab-prediction"><strong>Predict:</strong> What should happen to the available places on this path?</p>`)
};
