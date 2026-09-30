const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('./course-v3-section7-models.js');

test('sequential traces stop at both boundaries and reset to their first step', () => {
  assert.equal(M.moveStep(0, 'previous', 5), 0);
  assert.equal(M.moveStep(4, 'next', 5), 4);
  assert.equal(M.moveStep(M.moveStep(2, 'next', 5), 'previous', 5), 2);
  assert.equal(M.moveStep(4, 'reset', 5), 0);
  assert.throws(() => M.moveStep(-1, 'next', 5), RangeError);
  assert.throws(() => M.moveStep(0, 'next', 0), RangeError);
});

test('a supervised ethics pilot depends on real safeguards; naming it a pilot is insufficient', () => {
  const supported = M.ethicsTrace({ action: 'limited', safeguards: true });
  const unsupported = M.ethicsTrace({ action: 'limited', safeguards: false });
  assert.equal(supported[0].text, unsupported[0].text, 'affected people do not change when safeguard capacity changes');
  assert.match(supported[2].text, /may be justified/);
  assert.match(unsupported[2].text, /Pause or provide those safeguards/);
  assert.match(supported.at(-1).text, /More than one responsible action/);
  for (const scenario of ['error', 'purpose']) {
    const judgement = M.ethicsTrace({ scenario, action: 'limited', safeguards: false }).at(-1).text;
    assert.match(judgement, /limited use is not justified under the current conditions/);
    assert.match(judgement, /Pause the affected use or put those safeguards in place/);
    assert.doesNotMatch(judgement, /More than one responsible action/);
  }
});

test('pausing a faulty function does not invent an unavailable checked alternative', () => {
  const supported = M.ethicsTrace({ scenario: 'error', action: 'pause', safeguards: true });
  const unsupported = M.ethicsTrace({ scenario: 'error', action: 'pause', safeguards: false });
  assert.equal(supported[0].text, unsupported[0].text, 'the people affected stay the same');
  assert.match(supported[2].text, /use the available checked alternative/);
  assert.match(unsupported[2].text, /No reliable alternative or qualified reviewer is currently available/);
  assert.match(unsupported[2].text, /arrange suitable reading materials and support urgently/);
  assert.match(unsupported[2].text, /may temporarily lose access/);
  assert.doesNotMatch(unsupported[2].text, /Pupils use (?:the available |a )checked alternative/);
});

test('changed-purpose reasoning requires suitability as well as agreement', () => {
  const result = M.ethicsTrace({ scenario: 'purpose', action: 'limited', safeguards: true });
  assert.match(result[2].text, /agreement alone does not establish/);
  assert.match(M.ethicsTrace({ scenario: 'purpose', action: 'proceed' })[2].text, /without explaining the change/);
  assert.throws(() => M.ethicsTrace({ scenario: 'not-a-case' }), RangeError);
});

test('modification and redistribution permissions are distinct from fees and commercial support', () => {
  const charity = { modify: true, distribute: true, support: false, maxAnnualFee: 0 };
  assert.equal(M.compareLicence('community', charity).fits, true);
  assert.equal(M.compareLicence('restricted', { ...charity, maxAnnualFee: 400 }).fits, false);
  const supported = { ...charity, support: true, maxAnnualFee: 400 };
  assert.equal(M.compareLicence('supported', supported).fits, true, 'charging for the package does not remove its modification and redistribution rights');
  assert.equal(M.compareLicence('community', supported).fits, false, 'community help has no contracted response');
});

test('a limited school licence can fit unmodified supported use, but a trial does not cover a year', () => {
  const needs = { modify: false, distribute: false, support: true, maxAnnualFee: 300 };
  assert.equal(M.compareLicence('restricted', needs).fits, true);
  assert.equal(M.compareLicence('supported', needs).fits, false, 'the selected package exceeds this budget');
  const trial = M.compareLicence('trial', { ...needs, support: false, maxAnnualFee: 400 });
  assert.equal(trial.fits, false);
  assert.equal(trial.checks[0].meets, false);
  assert.equal(trial.checks.at(-1).meets, false, 'an unstated continued-use fee cannot be assumed affordable');
  assert.throws(() => M.compareLicence('community', { maxAnnualFee: -1 }), RangeError);
});

test('recognition errors propagate to fluent output until the recognised text is corrected', () => {
  const clear = M.readingPipeline();
  const wrong = M.readingPipeline({ blurred: true });
  const corrected = M.readingPipeline({ blurred: true, corrected: true });
  assert.equal(clear[0].output, wrong[0].output, 'the original sign has not changed');
  assert.equal(wrong[1].output, 'Sorte');
  assert.equal(wrong.at(-1).output, 'Spoken output: “Type”');
  assert.equal(corrected[1].output, 'Sortie');
  assert.equal(corrected.at(-1).output, clear.at(-1).output);
  assert.match(wrong[2].explanation, /not guaranteed/);
});

test('overall accuracy uses counts rather than the unweighted mean of group percentages', () => {
  const summary = M.fairnessSummary();
  assert.equal(summary.correct, 95);
  assert.equal(summary.total, 100);
  assert.equal(summary.rate, 95);
  assert.equal(summary.groups[1].rate, 50);
  assert.equal(summary.gap, 50);
  const balanced = M.fairnessSummary('balanced');
  assert.deepEqual(balanced.groups.map(group => group.rate), summary.groups.map(group => group.rate));
  assert.equal(balanced.rate, 75, 'sample composition changes the total without changing either group rate');
});

test('empty groups and impossible correct counts cannot silently produce misleading rates', () => {
  for (const groups of [[], [{ correct: 1, total: 0 }], [{ correct: 11, total: 10 }], [{ correct: -1, total: 10 }], [{ correct: 1.5, total: 10 }]]) {
    assert.throws(() => M.summariseGroups(groups), RangeError);
  }
  const groups = [{ name: 'A', correct: 0, total: 1 }];
  const summary = M.summariseGroups(groups);
  assert.equal(summary.rate, 0);
  assert.equal(summary.gap, 0);
  assert.equal(groups[0].rate, undefined, 'calculations preserve the original observations');
});

test('recurring savings do not cancel first-period integration cost', () => {
  const first = M.costSummary('planned', 1);
  assert.equal(first.monthlySaving, 100);
  assert.equal(first.aiTotal, 1700);
  assert.equal(first.saving, -500);
  assert.equal(M.costSummary('planned', 6).saving, 0);
  assert.equal(M.costSummary('planned', 12).saving, 600);
  assert.equal(first.breakEvenMonths, 6);
});

test('more oversight and correction can remove the financial saving', () => {
  const high = M.costSummary('highReview', 12);
  assert.ok(high.aiTotal > high.baselineTotal);
  assert.ok(high.monthlySaving < 0);
  assert.equal(high.breakEvenMonths, null);
  assert.ok(M.costSummary('lowerFee', 12).saving > M.costSummary('planned', 12).saving);
  assert.throws(() => M.costSummary('planned', 0), RangeError);
  assert.throws(() => M.compareCosts({ ...M.costCases.planned, review: NaN }), RangeError);
});

test('the manufacturing allocation can reverse a lower operating-electricity result', () => {
  const longLife = M.environmentSummary('efficient', 60);
  assert.equal(longLife.operatingSaving, 840);
  assert.equal(longLife.manufacturingAllocation, 240);
  assert.equal(longLife.comparisonSaving, 600);
  const shortLife = M.environmentSummary('efficient', 12);
  assert.equal(shortLife.operatingSaving, longLife.operatingSaving);
  assert.equal(shortLife.manufacturingAllocation, 1200);
  assert.equal(shortLife.comparisonSaving, -360);
});

test('additional computing can outweigh pump savings even before manufacture', () => {
  const result = M.environmentSummary('intensive', 60);
  assert.equal(result.baselineTotal, 12000);
  assert.equal(result.operatingTotal, 12360);
  assert.equal(result.comparisonSaving, -600);
  assert.throws(() => M.compareElectricity({ lifetimeMonths: 0 }), RangeError);
  assert.throws(() => M.compareElectricity({ lifetimeMonths: 6, months: 12 }), RangeError);
  assert.throws(() => M.compareElectricity({ manufacturingElectricity: -1 }), RangeError);
});

test('changing the period scales both methods and the same manufacturing allocation', () => {
  const year = M.compareElectricity({ months: 12 });
  const month = M.compareElectricity({ months: 1 });
  assert.equal(year.baselineTotal, 12 * month.baselineTotal);
  assert.equal(year.comparisonTotal, 12 * month.comparisonTotal);
  assert.equal(year.manufacturingAllocation, 12 * month.manufacturingAllocation);
});
