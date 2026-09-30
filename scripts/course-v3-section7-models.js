/* Deterministic classroom examples. These data are invented, not measured product results. */
const section7Models = (() => {
  'use strict';
  function item(collection, key, label) {
    if (!Object.prototype.hasOwnProperty.call(collection, key)) throw new RangeError(`Unknown ${label}: ${key}`);
    return collection[key];
  }
  function positive(value, label, allowZero = true) {
    if (!Number.isFinite(value) || value < 0 || (!allowZero && value === 0)) throw new RangeError(`${label} must be ${allowZero ? 'non-negative' : 'positive'} and finite.`);
    return value;
  }
  function moveStep(step, action, count) {
    if (!Number.isInteger(step) || !Number.isInteger(count) || count < 1 || step < 0 || step >= count) throw new RangeError('Invalid step boundary.');
    if (action === 'next') return Math.min(count - 1, step + 1);
    if (action === 'previous') return Math.max(0, step - 1);
    if (action === 'reset') return 0;
    throw new RangeError(`Unknown step action: ${action}`);
  }

  const ethicsCases = {
    error: {
      label: 'A colleague reports incorrect reading output',
      situation: 'A colleague shows that the school reading app sometimes changes a warning into an incorrect instruction. The release is tomorrow. The evidence has been checked.',
      people: 'Pupils may act on an incorrect instruction. Teachers need reliable information. The school must decide whether to release. The colleague deserves credit for reporting the defect.',
      duty: 'Report the known limitation honestly, protect users from avoidable harm and investigate the evidence fairly. A deadline does not remove these responsibilities.',
      safeguard: 'A trained teacher can check every output against the original before a pupil acts on it, and a checked alternative is available.'
    },
    purpose: {
      label: 'Reading recordings proposed for a new purpose',
      situation: 'Recordings were collected to provide reading assistance. A manager now wants to use them to rank pupils for admissions. The original explanation did not include that use.',
      people: 'Pupils and families supplied recordings for reading help. Staff may make admission decisions from them. The school must account for the change of purpose and the risk of inappropriate judgements.',
      duty: 'Respect privacy, explain the proposed use truthfully and question whether the data are suitable. Access to a recording does not by itself justify every new use.',
      safeguard: 'Affected families receive a clear explanation and a genuine choice, the proposed assessment is independently checked for suitability, and a human appeal route is available.'
    }
  };
  function ethicsTrace({ scenario = 'error', action = 'pause', safeguards = true } = {}) {
    const context = item(ethicsCases, scenario, 'ethics scenario');
    item({ pause: true, limited: true, proceed: true }, action, 'ethics action');
    let outcome;
    if (action === 'pause') outcome = scenario === 'error'
      ? (safeguards
        ? 'Report the evidence and pause release while the fault is investigated. Pupils use the available checked alternative. This can delay access to the new tool and cost staff time, but avoids knowingly relying on the faulty output. Agree tests and a review date before reconsidering release.'
        : 'Report the evidence and pause the affected function while the fault is investigated. No reliable alternative or qualified reviewer is currently available, so arrange suitable reading materials and support urgently. Pupils may temporarily lose access to reading assistance. Acknowledge that cost while avoiding reliance on the faulty output, and agree tests and a review date before reconsidering release.')
      : 'Pause the new use, explain the concerns and check whether a suitable, justified approach can be agreed. Reading assistance can continue under its existing purpose. Pausing has a cost, but keeping the data does not authorise the proposed ranking.';
    if (action === 'limited') outcome = safeguards
      ? (scenario === 'error'
        ? 'A small, supervised pilot may be justified if every output is checked before use, pupils have a reliable alternative and errors are recorded. This may preserve access while collecting evidence. Stop the pilot if checking capacity or safety cannot be maintained.'
        : 'A limited, clearly agreed evaluation may be justified after suitability and privacy checks, with a genuine choice and an accessible appeal route. It still needs monitoring: agreement alone does not establish that the ranking is accurate or fair.')
      : (scenario === 'error'
        ? 'The proposed pilot lacks the reviewer and reliable alternative it depends on. Calling it a pilot does not stop pupils relying on incorrect output. Pause or provide those safeguards before continuing.'
        : 'The proposed evaluation lacks informed agreement, suitability evidence and an appeal route. Calling it a pilot does not resolve the changed purpose. Pause and address these requirements before proceeding.');
    if (action === 'proceed') outcome = scenario === 'error'
      ? 'Keeping the release unchanged without reporting the fault leaves users and decision makers uninformed. Some pupils may act on incorrect instructions; complaints, rework or loss of trust may follow. None of these outcomes is certain, but the known evidence must not be concealed.'
      : 'Using the recordings for ranking without explaining the change prevents an informed choice. Pupils may receive unsuitable decisions and families may lose trust. A potentially useful result does not remove the responsibility to address privacy, suitability and accountability.';
    return [
      { title: 'Who is affected?', text: context.people },
      { title: 'Which responsibilities apply?', text: context.duty },
      { title: 'What follows from this choice?', text: outcome },
      { title: 'A conditional judgement', text: action === 'proceed'
        ? 'Revise the action so the evidence is reported and affected people have an appropriate safeguard. State who will check, what they will check and when the decision will be reviewed.'
        : action === 'limited' && !safeguards
          ? 'The proposed limited use is not justified under the current conditions because its required safeguards are missing. Pause the affected use or put those safeguards in place and verify that they work. Then compare the actions that can be defended under the revised conditions.'
        : 'More than one responsible action can be defended. Explain why your choice fits the actual conditions, acknowledge its costs and identify evidence that would change your judgement.' }
    ];
  }

  const licenceOffers = {
    community: { name: 'A · Community edition', source: true, modify: true, distribute: true, support: false, annualFee: 0, trialDays: null, terms: 'Source is supplied. Use for any purpose, modification and redistribution (including modified copies) are permitted with copyright notices retained. No licence charge; community help has no promised response time.', obligation: 'Retain copyright notices and allocate maintenance time.' },
    supported: { name: 'B · Supported open-source edition', source: true, modify: true, distribute: true, support: true, annualFee: 400, trialDays: null, terms: 'The same source and permissions as A are supplied. The chosen service package costs 400 currency units per year and includes a support response within four operating hours. Response time is not a guaranteed repair time.', obligation: 'Retain notices, pay for the service package and check its operating hours and scope.' },
    restricted: { name: 'C · Proprietary school edition', source: false, modify: false, distribute: false, support: true, annualFee: 300, trialDays: null, terms: 'One school may use the unmodified executable for one year for 300 currency units. Source is not supplied; modification and redistribution are forbidden. A support response within four operating hours is included.', obligation: 'Keep within the school, time and use restrictions; renew permission when necessary.' },
    trial: { name: 'D · Evaluation trial', source: false, modify: false, distribute: false, support: false, annualFee: 0, trialDays: 30, terms: 'The executable may be evaluated without charge for 30 days. Source, modification, redistribution and a contracted support response are not included. Continued use requires a separate agreement; its price is not provided.', obligation: 'Obtain suitable continued-use terms after the trial or stop the use that is no longer permitted.' }
  };
  function compareLicence(offerKey, requirements = {}) {
    const offer = item(licenceOffers, offerKey, 'licence offer');
    const needs = { modify: true, distribute: true, support: false, maxAnnualFee: 0, ...requirements };
    positive(needs.maxAnnualFee, 'Annual budget');
    const checks = [
      { requirement: 'Use for the whole school year', meets: offer.trialDays === null, explanation: offer.trialDays ? 'Only 30 days are covered. Continued-use terms and their price are unknown.' : 'The stated offer permits the planned year of use.' },
      { requirement: 'Modify the source', meets: !needs.modify || (offer.source && offer.modify), explanation: !needs.modify ? 'Modification is not required in this comparison.' : offer.source && offer.modify ? 'Both source access and permission are supplied.' : 'Source access and permission to modify are both needed.' },
      { requirement: 'Share the changed version with another school', meets: !needs.distribute || offer.distribute, explanation: !needs.distribute ? 'Redistribution is not required in this comparison.' : offer.distribute ? 'Redistribution is permitted under the stated conditions.' : 'The stated offer does not grant this redistribution permission.' },
      { requirement: 'Support response within four operating hours', meets: !needs.support || offer.support, explanation: !needs.support ? 'A contracted response is not required in this comparison.' : offer.support ? 'The stated package includes this response commitment; check the scope.' : 'Community help or trial access is not a contracted response commitment.' },
      { requirement: `Annual package budget: ${needs.maxAnnualFee} currency units`, meets: offer.trialDays === null && offer.annualFee <= needs.maxAnnualFee, explanation: offer.trialDays ? 'No full-year price is stated, so the budget requirement cannot be confirmed.' : `The selected offer costs ${offer.annualFee} currency units per year; staff maintenance time is additional.` }
    ];
    return { offer: offer.name, checks, fits: checks.every(check => check.meets), obligation: offer.obligation };
  }

  function readingPipeline({ blurred = false, corrected = false } = {}) {
    const mistaken = blurred && !corrected;
    const recognised = mistaken ? 'Sorte' : 'Sortie';
    const translated = mistaken ? 'Type' : 'Exit';
    return [
      { title: 'Camera: capture pixels', output: 'Photograph of the French sign “Sortie”', explanation: blurred ? 'The photograph is blurred. The original sign still says “Sortie”; the camera supplies image data, not a checked word.' : 'The camera captures a clear image of the sign. An image is a pattern of pixels; recognising letters is a separate task.' },
      { title: 'OCR: recognise characters', output: recognised, explanation: mistaken ? 'The illustrative OCR result misses the letter i and produces “Sorte”. The result is plausible text but does not match the sign.' : corrected ? 'A person compares the recognised text with a checked reading and corrects it to “Sortie”. This intervention repairs the OCR result before later stages use it.' : 'Optical character recognition locates the characters and converts their visual patterns into the text “Sortie”.' },
      { title: 'Language processing: interpret in context', output: mistaken ? 'Interprets “Sorte” as a French word meaning a kind or type' : 'Interprets “Sortie” as the label on an exit', explanation: mistaken ? 'In this example, the available context is insufficient to detect the missing letter. Language processing is not guaranteed to recover the original word.' : 'The application uses the language and sign context to interpret the recognised word. A plausible interpretation still needs a correct input.' },
      { title: 'Translation: produce English text', output: translated, explanation: mistaken ? '“Type” is the assumed translation of the mistaken input in this example. A fluent translation can carry an earlier recognition error forward.' : 'Translation produces the English text “Exit”. This text is not an audio waveform.' },
      { title: 'Text-to-speech and speaker: produce sound', output: `Spoken output: “${translated}”`, explanation: mistaken ? 'The speech stage can clearly speak the wrong result. Turning up the volume will not correct the OCR error. Check the recognised text or retake the image, then trace the changed result.' : 'Text-to-speech generates a waveform for “Exit”; the speaker produces sound. The panel shows the word that would be spoken.' }
    ];
  }

  const fairnessCases = {
    uneven: { label: 'Uneven test sample', groups: [{ name: 'Accent A', correct: 90, total: 90 }, { name: 'Accent B', correct: 5, total: 10 }], explanation: 'Group A supplies most examples, so it dominates the overall result. An overall 95% does not show equal access: B has only 50% correct captions.' },
    balanced: { label: 'Equal sample sizes; same group success rates', groups: [{ name: 'Accent A', correct: 10, total: 10 }, { name: 'Accent B', correct: 5, total: 10 }], explanation: 'The overall result changes to 75% although each group has the same success rate as before. Changing the sample mixture changes the average; it has not improved group B.' },
    improved: { label: 'An illustrative improved result for B', groups: [{ name: 'Accent A', correct: 90, total: 90 }, { name: 'Accent B', correct: 9, total: 10 }], explanation: 'B now has 90% correct captions and the overall result is 99%. The gap is smaller, but this small invented test cannot establish future performance or equal access for all users.' }
  };
  function summariseGroups(groups) {
    if (!Array.isArray(groups) || groups.length === 0) throw new RangeError('At least one test group is required.');
    const rows = groups.map(group => {
      if (!Number.isInteger(group.correct) || !Number.isInteger(group.total) || group.correct < 0 || group.total <= 0 || group.correct > group.total) throw new RangeError('Correct counts must be whole numbers between zero and a positive total.');
      return { ...group, rate: 100 * group.correct / group.total };
    });
    const correct = rows.reduce((sum, group) => sum + group.correct, 0);
    const total = rows.reduce((sum, group) => sum + group.total, 0);
    return { groups: rows, correct, total, rate: 100 * correct / total, gap: Math.max(...rows.map(group => group.rate)) - Math.min(...rows.map(group => group.rate)) };
  }
  function fairnessSummary(key = 'uneven') {
    const scenario = item(fairnessCases, key, 'fairness case');
    return { ...summariseGroups(scenario.groups), explanation: scenario.explanation };
  }

  const costCases = {
    planned: { label: 'Planned review workload', manual: 1200, service: 500, review: 400, maintenance: 100, rework: 100, setup: 600 },
    highReview: { label: 'More review and correction needed', manual: 1200, service: 500, review: 700, maintenance: 100, rework: 250, setup: 600 },
    lowerFee: { label: 'Lower service fee; same review', manual: 1200, service: 300, review: 400, maintenance: 100, rework: 100, setup: 600 }
  };
  function compareCosts({ manual, service, review, maintenance, rework, setup, months = 1 }) {
    for (const [label, amount] of Object.entries({ manual, service, review, maintenance, rework, setup })) positive(amount, label);
    if (!Number.isInteger(months) || months < 1) throw new RangeError('The comparison needs a positive whole number of months.');
    const recurring = service + review + maintenance + rework;
    const baselineTotal = manual * months;
    const aiTotal = recurring * months + setup;
    return { months, recurring, baselineTotal, aiTotal, saving: baselineTotal - aiTotal, monthlySaving: manual - recurring, breakEvenMonths: manual > recurring ? Math.ceil(setup / (manual - recurring)) : null };
  }
  function costSummary(key = 'planned', months = 1) {
    const scenario = item(costCases, key, 'cost case');
    return { ...scenario, ...compareCosts({ ...scenario, months }) };
  }

  const environmentCases = {
    efficient: { label: 'AI adds 80 kWh per month', pump: 850, computing: 80 },
    intensive: { label: 'AI adds 180 kWh per month', pump: 850, computing: 180 }
  };
  function compareElectricity({ baseline = 1000, pump = 850, computing = 80, manufacturingElectricity = 1200, lifetimeMonths = 60, months = 12 } = {}) {
    for (const [label, amount] of Object.entries({ baseline, pump, computing, manufacturingElectricity })) positive(amount, label);
    positive(lifetimeMonths, 'Allocation lifetime', false);
    positive(months, 'Comparison period', false);
    if (months > lifetimeMonths) throw new RangeError('The comparison period cannot exceed the assumed device lifetime.');
    const baselineTotal = baseline * months;
    const operatingTotal = (pump + computing) * months;
    const manufacturingAllocation = manufacturingElectricity * months / lifetimeMonths;
    const comparisonTotal = operatingTotal + manufacturingAllocation;
    return { months, baselineTotal, operatingTotal, manufacturingAllocation, comparisonTotal, operatingSaving: baselineTotal - operatingTotal, comparisonSaving: baselineTotal - comparisonTotal };
  }
  function environmentSummary(key = 'efficient', lifetimeMonths = 60) {
    const scenario = item(environmentCases, key, 'electricity case');
    return { ...scenario, lifetimeMonths, ...compareElectricity({ ...scenario, lifetimeMonths }) };
  }
  return { moveStep, ethicsCases, ethicsTrace, licenceOffers, compareLicence, readingPipeline, fairnessCases, summariseGroups, fairnessSummary, costCases, compareCosts, costSummary, environmentCases, compareElectricity, environmentSummary };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = section7Models;
