import { section8Journey, section8Sessions, section8Modules, section8PaperObjectives } from './course-v3-section8-journey.mjs';
import { section8ExtraPapers } from './course-v3-section8-extra-papers.mjs';
import { labMarkup as modelLabs } from './course-v3-section8-labs.mjs';
import { sqlLabMarkup } from './course-v3-section8-sql-labs.mjs';
const labMarkup = { ...modelLabs, ...sqlLabMarkup };
import { escapeGuidedHtml as esc, renderGuidedFigure, renderGuidedSteps } from './course-v3-section5-classroom.mjs';

// Reuse the existing guided-page classes and data-s5-* controller contract.
// Content, models, lesson mapping and additional styles remain scoped to S8.
const allGroups = Object.entries(section8Journey).flatMap(([sequence, topic]) => topic.groups.map(group => ({ ...group, route: `lesson-${String(sequence).padStart(3, '0')}` })));
const routeOrder = section8Modules.flatMap(module => module.groups);
function routeAttributes(id) {
  const index = routeOrder.indexOf(id);
  const href = target => { const group = allGroups.find(g => g.id === target); return group ? `../${group.route}/#${group.id}` : ''; };
  return `data-s8-prev-href="${href(routeOrder[index - 1])}" data-s8-next-href="${href(routeOrder[index + 1])}"`;
}
const phases = { observe: 'Observe', prepare: 'Recall', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };

export function section8GroupObjectives(group, lesson) {
  const available = new Set(lesson.objectives.map(([id]) => id));
  if (!group.objectiveIds?.length) throw new Error(`Missing objectives: ${group.id}`);
  for (const id of group.objectiveIds) if (!available.has(id)) throw new Error(`Unknown Section 8 objective ${id} in ${group.id}`);
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown Section 8 unit ${key}`);
  return [...new Set(group.objectiveIds)];
}

export function section8PapersForLesson(lesson, pool = lesson.pastPaperQuestions) {
  const ids = section8Journey[lesson.sequenceIndex].groups.flatMap(group => group.papers ?? []);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate Section 8 paper in ${lesson.route}`);
  return ids.map(id => {
    const question = [...pool, ...section8ExtraPapers].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 8 paper ${id}`);
    const solution = question.id === 'E063' ? question.solution.map(item => typeof item === 'object' && item.type === 'code' ? { ...item, text: item.text.replaceAll('\"0002\"', "'0002'") } : item) : question.solution;
    return { ...question, solution, objectiveIds: section8PaperObjectives[id] ?? question.objectiveIds };
  });
}

function renderGroup(group, index, lesson, helpers, claimed) {
  const objectives = section8GroupObjectives(group, lesson);
  const academicFigure = group.image?.asset?.endsWith('-academic.svg');
  const media = academicFigure
    ? renderGuidedFigure(group).replace('<figure class="s5-figure">', '<figure class="s5-figure" tabindex="0" role="region" aria-label="Teaching diagram; scroll horizontally on a narrow screen">')
    : renderGuidedFigure(group);
  const anchor = group.unitKeys.flatMap(key => {
    const number = lesson.units.findIndex(unit => unit.unitKey === key) + 1;
    if (claimed.has(number)) return [];
    claimed.add(number);
    return [`<span id="unit-${number}" class="s5-anchor"></span>`];
  }).join('');
  const phase = (name, body) => `<section class="s5-phase" id="${group.id}--${name}" data-s5-phase="${name}" aria-label="${phases[name]}"><p class="s5-phase-label">${phases[name]}</p>${body}</section>`;
  const papers = (group.papers ?? []).map(id => {
    const paper = lesson.pastPaperQuestions.find(question => question.id === id);
    if (!paper) throw new Error(`Paper ${id} is not allocated to ${lesson.route}`);
    return paper;
  });
  const paperAnchors = group === section8Journey[lesson.sequenceIndex].groups.find(item => item.papers?.length)
    ? '<span id="past-paper-questions" class="s5-anchor"></span><span id="original-exam-style-question" class="s5-anchor"></span>' : '';
  if (group.lab && !labMarkup[group.lab]) throw new Error(`Unknown Section 8 activity ${group.lab}`);
  const practice = (group.practiceIds ?? []).map(id => {
    const item = [...lesson.practice, ...lesson.optionalPractice].find(question => question.id === id);
    if (!item) throw new Error(`Missing Section 8 practice ${id}`);
    return item;
  });
  return `<article class="s5-group${academicFigure ? ' s8-academic-figure' : ''}" id="${group.id}" data-s5-group data-s8-group ${routeAttributes(group.id)} data-objectives="${objectives.join(' ')}" data-unit-keys="${group.unitKeys.join(' ')}">${anchor}
    <header class="s5-group-heading"><p class="s5-eyebrow">Databases · Concept ${String(index + 1).padStart(2, '0')}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>
    ${phase('observe', `<div class="s5-observe-grid${media ? ' s5-has-media' : ''}">${media}<div class="s5-observe-copy"><p class="s5-eyebrow">Look, then discuss</p><h3>${esc(group.question)}</h3><p>${esc(group.observe)}</p></div></div>`)}
    ${group.prerequisite ? phase('prepare', `<div class="s5-prerequisite"><h3>${esc(group.prerequisite.title)}</h3><p>${esc(group.prerequisite.body)}</p></div>`) : ''}
    ${phase('explain', `${!group.image && media ? `<details class="s8-source-context"><summary>Keep the starting data in view</summary>${media}</details>` : ''}${renderGuidedSteps(group, 'explain', group.steps, group.image ? media : '')}`)}
    ${phase('worked', `<header class="s5-worked-intro"><h3>${esc(group.worked.title)}</h3><p>${esc(group.worked.setup)}</p></header>${renderGuidedSteps(group, 'worked', group.worked.steps)}${group.worked.conclusion ? `<p class="s5-worked-conclusion" data-s5-worked-conclusion>${esc(group.worked.conclusion)}</p>` : ''}`)}
    ${group.lab ? phase('experiment', `<p class="s5-predict">${esc(group.experimentPrompt)}</p>${labMarkup[group.lab]}<noscript><p>Enable JavaScript to operate this activity. The complete worked example remains available above.</p></noscript>`) : ''}
    ${phase('check', `<div class="s5-check"><p class="s5-eyebrow">Explain it yourself · Teacher-written</p><h3>${esc(group.check.prompt)}</h3><details class="s5-answer"><summary>Check your reasoning</summary><p>${esc(group.check.answer)}</p></details></div>${practice.length ? `<details class="s5-extra-practice"><summary>Apply the idea · Teacher-written practice</summary>${practice.map((question, i) => helpers.renderPractice(question, i, 8)).join('')}</details>` : ''}`)}
    ${papers.length ? phase('papers', `${paperAnchors}${papers.some(p => p.id === 'E061B') ? '<span id="e061" class="s5-anchor"></span>' : ''}<details class="s5-paper-set" data-s5-question-fold><summary>Attempt the past-paper questions · ${papers.reduce((sum, q) => sum + q.marks, 0)} marks</summary>${helpers.renderPastPaperQuestions({ ...lesson, pastPaperQuestions: papers, separateExamGuidance: true, examTiming: [Math.max(3, papers.reduce((sum, q) => sum + q.marks, 0)), Math.max(5, papers.reduce((sum, q) => sum + q.marks, 0) * 2)] }).replaceAll('loading="lazy"', 'loading="eager"').replaceAll('Reading the question — teacher guidance', 'Hint — reading the question').replaceAll('Solution / model answer — teacher-written', 'Reasoning and model answer — teacher-written')}</details>`) : ''}
    ${phase('recap', `<div class="s5-connection"><p class="s5-eyebrow">Keep this idea</p><h3>${esc(group.takeaway)}</h3><p>${esc(group.bridge)}</p></div>${group.trap ? `<details class="s5-misconception"><summary>Check a common misunderstanding</summary><p>${esc(group.trap)}</p></details>` : ''}<details class="s5-objectives"><summary>Learning goals</summary><ul>${lesson.objectives.filter(([id]) => objectives.includes(id)).map(([, description]) => `<li>${esc(description)}</li>`).join('')}</ul></details>`)}
  </article>`;
}

export function renderSection8Classroom(lesson, helpers) {
  const journey = section8Journey[lesson.sequenceIndex];
  const claimed = new Set();
  const groups = journey.groups;
  const contents = groups.map((group, index) => renderGroup(group, index, lesson, helpers, claimed)).join('');
  if (claimed.size !== lesson.units.length) throw new Error(`Unmapped Section 8 units on ${lesson.route}`);
  const placed = new Set(groups.flatMap(group => group.practiceIds ?? []));
  const extra = [...lesson.practice, ...lesson.optionalPractice].filter(question => !placed.has(question.id));
  return `<main class="s5-classroom s8-classroom" data-s5-classroom data-s8-classroom data-mode="reading">
    <header class="s5-titlebar"><div><a class="s5-back" href="../section-8/">← Databases</a><h1>${esc(journey.title)}</h1></div><div class="s5-mode-switch" aria-label="Page mode" hidden><button type="button" data-s5-mode="classroom" aria-pressed="true">Classroom</button><button type="button" data-s5-mode="reading" aria-pressed="false">Full reading</button></div></header>
    <p class="s5-intro">${esc(journey.intro)}</p><p class="s5-resource-status" data-s5-resources role="status" hidden>Loading teaching materials…</p>
    <span id="visual-and-core" class="s5-anchor"></span><div data-s5-scroll-anchor></div>
    <div class="s5-toolbar"><nav class="s5-phases" aria-label="Teaching stages" hidden></nav><details class="s5-directory" id="lesson-contents"><summary>Choose a concept</summary><ol>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a></li>`).join('')}</ol></details></div>
    <div class="s5-content">${contents}</div>
    <nav class="s5-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s5-prev>← Previous</button><span class="s5-position" role="status" aria-live="polite"></span><button type="button" data-s5-hide>Hide answers</button><button type="button" data-s5-reset>Restart concept</button><button type="button" data-s5-next>Next →</button></nav>
    <details class="s5-reference" id="practice"><summary>More practice for this topic</summary><p>Teacher-written consolidation. Explain your reasoning before opening an answer.</p>${extra.map((question, index) => helpers.renderPractice(question, index, 8)).join('')}</details>
    ${!groups.some(group => group.papers?.length) ? '<span id="past-paper-questions" class="s5-anchor"></span><span id="original-exam-style-question" class="s5-anchor"></span><aside class="s8-paper-link">Apply these ideas after learning to read and write SQL. <a href="../section-8/">Follow the SQL learning modules →</a></aside>' : ''}<details class="s5-reference" id="summary"><summary>Topic recap</summary><ul>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a><p>${esc(group.takeaway)}</p></li>`).join('')}</ul></details>
    ${helpers.learningRoute ? `<details class="s5-reference"><summary>Prerequisites and related learning</summary>${helpers.learningRoute}</details>` : ''}
    <details class="s5-reference"><summary>Using this page</summary><p>Classroom shows one step at a time. Predict or discuss before revealing a result. Full reading keeps the complete explanations together. Use Teach from this point to resume a classroom explanation. Click an illustration to enlarge it.</p></details>
    <noscript><p>The complete reading view is available without JavaScript. Enable JavaScript for classroom navigation and interactive experiments.</p></noscript>
    <dialog class="s5-zoom" aria-label="Enlarged teaching image"><form method="dialog"><button autofocus>Close image</button></form><img alt=""></dialog><nav class="s8-route-footer"><a href="../section-8/">All modules and sessions →</a></nav>
  </main><footer><p>Cambridge AS Computer Science 9618 · Databases</p></footer>`.replace(/[ \t]+\n/g, '\n');
}

export function renderSection8Overview(lessons) {
  const groups = lessons.flatMap(lesson => section8Journey[lesson.sequenceIndex].groups.map(group => ({ ...group, route: lesson.route })));
  const link = id => { const g = groups.find(group => group.id === id); if (!g) throw new Error(`Unknown Section 8 route ${id}`); return `<a href="../${g.route}/#${g.id}">${esc(g.title)} →</a>`; };
  return `<main class="s5-overview s8-overview"><header><p class="s5-eyebrow">Section 8 · Databases</p><h1>Build a library that remembers.</h1><p>Start with one borrowing record. Discover how related tables keep facts organised, then build and query a database yourself.</p><a class="s5-start" href="../lesson-042/">Begin with a borrowing record →</a></header>
  <section><h2>Follow the learning route</h2><p>Follow these modules in order. Some modules revisit a familiar topic with a new question. Keep time for prediction, discussion and practice.</p><div class="s8-module-grid">${section8Modules.map((module, index) => `<article><p class="s5-eyebrow">Module ${index + 1}</p><h3>${esc(module.title)}</h3><p>${esc(module.focus ?? module.description ?? '')}</p><ol>${module.groups.map(id => `<li>${link(id)}</li>`).join('')}</ol></article>`).join('')}</div></section>
  <section class="s5-session-plan"><h2>Suggested 45-minute sessions</h2><p>These stopping points include explanations, experiments and practice. Take more time when a check shows that an idea needs another example.</p><ol>${section8Sessions.map((session,index) => `<li><div><span class="s5-eyebrow">Session ${index+1} · 45 minutes suggested</span><h3>${esc(session.title)}</h3><p>${esc(session.focus)}</p></div><ul>${session.groups.map(id => `<li>${link(id)}</li>`).join('')}</ul></li>`).join('')}</ol></section>
  <details class="s5-reference"><summary>Browse the original topic pages</summary><ul>${lessons.map(lesson => `<li><a href="../${lesson.route}/">${esc(section8Journey[lesson.sequenceIndex].title)}</a></li>`).join('')}</ul></details></main><footer><p>Cambridge AS Computer Science 9618 · Databases</p></footer>`;
}
