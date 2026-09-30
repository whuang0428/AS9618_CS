// Original, editable teaching figures. Each diagram states its conceptual limits.
// These files are generated from SVG primitives; no raster illustration is edited.
const W = 1440;
const H = 900;
const ink = '#20272d';
const muted = '#535d66';
const rule = '#b8c1c7';
const navy = '#24485d';
const teal = '#537d7a';

const escape = value => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function text(x, y, value, options = {}) {
  const { size = 29, weight = 400, fill = ink, anchor = 'start' } = options;
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${escape(value)}</text>`;
}

function lines(x, y, values, options = {}) {
  const { leading = 39, ...font } = options;
  return values.map((value, index) => text(x, y + index * leading, value, font)).join('');
}

function line(x1, y1, x2, y2, colour = rule, width = 1.6) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${colour}" stroke-width="${width}"/>`;
}

function rect(x, y, width, height, fill = 'white', stroke = rule) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>`;
}

function arrow(from, to, path, colour = navy) {
  return `<path data-from="${escape(from)}" data-to="${escape(to)}" d="${path}" fill="none" stroke="${colour}" stroke-width="2.2" marker-end="url(#arrow)"/>`;
}

function diagram(title, description, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title description">
<title id="title">${escape(title)}</title>
<desc id="description">${escape(description)}</desc>
<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9" fill="none" stroke="${navy}" stroke-width="1.5"/></marker></defs>
<style>text{font-family:Arial,Helvetica,sans-serif}path,line,rect{vector-effect:non-scaling-stroke}</style>
<rect width="${W}" height="${H}" fill="white"/>
${text(70, 70, title, { size: 38, weight: 600 })}
${line(70, 135, 1370, 135)}
${body}
</svg>`;
}

function professionalResponsibility() {
  const title = 'Professional knowledge and responsibility';
  const description = 'Specialist knowledge lets a professional identify a hidden fault. An honest explanation gives the customer evidence for an informed decision. A code of conduct, peer guidance and continuing professional development support the professional’s judgement; they do not replace personal responsibility or product testing.';
  const stageY = 225;
  const stageH = 210;
  const stageW = 390;
  const positions = [70, 525, 980];
  const titles = ['Specialist knowledge', 'Professional duty', 'Informed decision'];
  const statements = [
    ['Identify a hidden fault', 'that the customer cannot', 'independently assess.'],
    ['Disclose the evidence.', 'Explain the likely risk', 'and its limits.'],
    ['The customer can decide', 'how to use, postpone or', 'reject the system.'],
  ];
  const mainStages = positions.map((x, index) =>
    rect(x, stageY, stageW, stageH) +
    text(x + 25, stageY + 47, titles[index], { size: 30, weight: 600 }) +
    lines(x + 25, stageY + 102, statements[index], { size: 28 })
  ).join('');

  return diagram(title, description,
    text(70, 111, 'Responsibility follows from the effects of specialist decisions on other people.', { size: 28, fill: muted }) +
    mainStages +
    arrow('specialist-knowledge', 'professional-duty', 'M460 330H515') +
    arrow('professional-duty', 'informed-decision', 'M915 330H970') +
    arrow('professional-support', 'professional-duty', 'M720 592V449') +
    text(752, 511, 'supports judgement', { size: 27, fill: muted }) +
    line(265, 592, 1175, 592, navy, 2) +
    line(265, 592, 265, 623, navy, 2) +
    line(720, 592, 720, 623, navy, 2) +
    line(1175, 592, 1175, 623, navy, 2) +
    text(70, 549, 'Professional-body support', { size: 28, weight: 600 }) +
    text(70, 665, 'Code of conduct', { size: 30, weight: 600 }) +
    lines(70, 711, ['States expected conduct', 'and supports accountability.'], { size: 28 }) +
    text(525, 665, 'Peer guidance', { size: 30, weight: 600 }) +
    lines(525, 711, ['Offers advice when applying', 'standards to a difficult case.'], { size: 28 }) +
    text(980, 665, 'Continuing development', { size: 29, weight: 600 }) +
    lines(980, 711, ['Maintains relevant knowledge', 'and professional competence.'], { size: 28 }) +
    line(70, 805, 1370, 805) +
    text(70, 851, 'Professional support does not replace personal responsibility or product testing.', { size: 29 })
  );
}

function ethicalDecisionPaths() {
  const title = 'Compare the consequences of alternative actions';
  const description = 'The shared fault is a route incorrectly labelled wheelchair-accessible even though it includes steps. In one branch the developer reports the fault and the operator corrects the information, so travellers can avoid the steps although launch may be delayed. In the alternative branch the developer conceals the fault and publishes the route, leaving inaccurate information that may lead travellers to steps and create a need for assistance. Each branch has its own consequences; neither branch causes the other.';
  const left = 70;
  const right = 760;
  const columnW = 610;
  const centres = [375, 1065];
  return diagram(title, description,
    text(70, 111, 'Shared evidence, separate courses of action, consequences for named people.', { size: 28, fill: muted }) +
    rect(350, 167, 740, 105) +
    text(720, 208, 'Known accessibility fault', { size: 31, weight: 600, anchor: 'middle' }) +
    text(720, 248, 'A route labelled accessible includes steps.', { size: 29, anchor: 'middle' }) +
    arrow('known-fault', 'report-and-correct', `M720 272V306H${centres[0]}V342`) +
    arrow('known-fault', 'conceal-and-publish', `M720 272V306H${centres[1]}V342`) +
    rect(left, 351, columnW, 99) +
    text(left + 27, 392, 'Report and correct', { size: 31, weight: 600 }) +
    text(left + 27, 431, 'Developer discloses the fault.', { size: 29 }) +
    rect(right, 351, columnW, 99) +
    text(right + 27, 392, 'Conceal and publish', { size: 31, weight: 600 }) +
    text(right + 27, 431, 'Developer withholds the fault report.', { size: 29 }) +
    arrow('report-and-correct', 'corrected-information', `M${centres[0]} 450V495`) +
    arrow('conceal-and-publish', 'incorrect-information', `M${centres[1]} 450V495`) +
    rect(left, 504, columnW, 103) +
    lines(left + 27, 547, ['Operator corrects the route information', 'before releasing the service.'], { size: 28 }) +
    rect(right, 504, columnW, 103) +
    lines(right + 27, 547, ['The incorrect accessibility label', 'remains available to users.'], { size: 28 }) +
    arrow('corrected-information', 'report-consequences', `M${centres[0]} 607V651`) +
    arrow('incorrect-information', 'conceal-consequences', `M${centres[1]} 607V651`) +
    text(left + 27, 697, 'Travellers can avoid the steps.', { size: 29, weight: 600 }) +
    text(left + 27, 740, 'The operator’s launch may be delayed.', { size: 28 }) +
    text(right + 27, 697, 'Travellers may reach the steps.', { size: 29, weight: 600 }) +
    text(right + 27, 740, 'Assistance and complaints may follow.', { size: 28 }) +
    line(70, 805, 1370, 805) +
    text(70, 851, 'For each branch, explain how the action changes the situation for a stakeholder.', { size: 29 })
  );
}

function copyrightPermissions() {
  const title = 'Copyright ownership and licence permissions';
  const description = 'A copyright holder grants permissions through a licence. Separate licence branches lead to running, modifying and redistributing the software, each only if the terms permit that activity. Conditions may continue to apply to copies. Publishing source does not itself remove copyright or authorise every activity.';
  const columns = [70, 525, 980];
  const centres = [265, 720, 1175];
  const activities = [
    ['Run', 'Use the software for', 'an authorised purpose.'],
    ['Modify', 'Change source code', 'where terms allow it.'],
    ['Redistribute', 'Supply copies under', 'the applicable conditions.'],
  ];
  return diagram(title, description,
    text(70, 111, 'Ownership of copyright and permission to perform an activity are different.', { size: 28, fill: muted }) +
    rect(490, 171, 460, 88) +
    text(720, 225, 'Copyright holder', { size: 31, weight: 600, anchor: 'middle' }) +
    arrow('copyright-holder', 'licence', 'M720 259V339') +
    text(754, 308, 'grants permissions through', { size: 28, fill: muted }) +
    rect(430, 349, 580, 112) +
    text(720, 392, 'Licence', { size: 31, weight: 600, anchor: 'middle' }) +
    text(720, 434, 'Permitted activities and their conditions', { size: 28, anchor: 'middle' }) +
    arrow('licence', 'run', `M720 461V507H${centres[0]}V598`) +
    arrow('licence', 'modify', 'M720 461V598') +
    arrow('licence', 'redistribute', `M720 461V507H${centres[2]}V598`) +
    centres.map(x => text(x + 20, 562, 'if permitted', { size: 27, fill: muted })).join('') +
    columns.map((x, index) =>
      rect(x, 608, 390, 153) +
      text(x + 25, 652, activities[index][0], { size: 31, weight: 600 }) +
      lines(x + 25, 698, activities[index].slice(1), { size: 28 })
    ).join('') +
    text(70, 808, 'Conditions, such as retaining notices, can continue to apply to redistributed copies.', { size: 28 }) +
    line(70, 831, 1370, 831) +
    text(70, 871, 'Publishing source does not itself remove copyright.', { size: 29 })
  );
}

function aiFairness() {
  const title = 'An overall score can conceal unequal performance';
  const description = 'Illustrative speech-to-text data: group A has 90 correct captions in 90 tests, an accuracy of 100 per cent. Group B has 5 correct captions in 10 tests, an accuracy of 50 per cent. Together there are 95 correct captions out of 100 tests, an overall accuracy of 95 per cent. Group A supplies 90 per cent of the tests, so the combined score is weighted towards its result. The difference is system performance for the tested groups and does not establish differences in the ability or value of users.';
  const x = 330;
  const chartW = 840;
  const sampleY = 738;
  const grid = [0, 25, 50, 75, 100].map(value => {
    const tickX = x + chartW * value / 100;
    return line(tickX, 237, tickX, 501, '#d8dee2', 1) +
      text(tickX, 547, `${value}`, { size: 27, fill: muted, anchor: 'middle' });
  }).join('');
  return diagram(title, description,
    text(70, 111, 'Illustrative data · Two user groups tested with the same speech-to-text system', { size: 28, fill: muted }) +
    text(x, 204, 'Correct captions (%)', { size: 29, weight: 600 }) +
    grid +
    line(x, 501, x + chartW, 501, muted, 1.8) +
    text(70, 312, 'Group A', { size: 30, weight: 600 }) +
    text(70, 354, '90 / 90 correct', { size: 28, fill: muted }) +
    `<rect x="${x}" y="276" width="${chartW}" height="60" fill="${navy}"/>` +
    text(x + chartW + 22, 317, '100%', { size: 31, weight: 600 }) +
    text(70, 442, 'Group B', { size: 30, weight: 600 }) +
    text(70, 484, '5 / 10 correct', { size: 28, fill: muted }) +
    `<rect x="${x}" y="406" width="${chartW / 2}" height="60" fill="${navy}"/>` +
    text(x + chartW / 2 + 22, 447, '50%', { size: 31, weight: 600 }) +
    line(70, 594, 1370, 594) +
    text(70, 647, 'Overall accuracy', { size: 30, weight: 600 }) +
    text(440, 647, '(90 + 5) / (90 + 10) = 95%', { size: 33, weight: 600 }) +
    text(70, 708, 'Test composition', { size: 29 }) +
    text(440, 708, 'The larger group contributes more to the overall score.', { size: 28 }) +
    `<rect x="440" y="${sampleY}" width="756" height="32" fill="${navy}"/>` +
    `<rect x="1196" y="${sampleY}" width="84" height="32" fill="${teal}"/>` +
    text(440, 810, 'Group A: 90 of 100 tests', { size: 27, fill: muted }) +
    text(1280, 810, 'Group B: 10', { size: 27, fill: muted, anchor: 'end' }) +
    text(70, 871, 'Report group results and test conditions; the overall score hides this gap.', { size: 28 })
  );
}

export function renderSection7AcademicConceptFigures() {
  return [
    { asset: 'assets/course-v3/section-7/professional-responsibility-academic.svg', svg: professionalResponsibility() },
    { asset: 'assets/course-v3/section-7/ethical-decision-paths-academic.svg', svg: ethicalDecisionPaths() },
    { asset: 'assets/course-v3/section-7/copyright-permissions-academic.svg', svg: copyrightPermissions() },
    { asset: 'assets/course-v3/section-7/ai-fairness-academic.svg', svg: aiFairness() },
  ];
}
