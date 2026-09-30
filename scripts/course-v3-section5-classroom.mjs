import { section5Journey, section5Sessions, section5PaperObjectives } from './course-v3-section5-journey.mjs';
import { labMarkup } from './course-v3-section5-labs.mjs';
import { section5ExtraPapers } from './course-v3-section5-extra-papers.mjs';

export { section5PaperObjectives };
const esc = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const assetUrl = path => path.startsWith('/') ? `../..${path}` : path;
const phaseNames = { observe: 'Observe', prepare: 'Recall', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };

// Section 7 shares this established presentation contract and controller.
// Exporting the pure helpers does not change Section 5's generated output.
export { esc as escapeGuidedHtml, figure as renderGuidedFigure, renderSteps as renderGuidedSteps };

export const paperIdsForGroup = group => group.papers ?? [];

export function groupObjectives(group, lesson) {
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown Section 5 unit ${key}`);
  if (!group.objectiveIds?.length) throw new Error(`Section 5 group ${group.id} needs explicit objectives`);
  const available = new Set(lesson.objectives.map(([id]) => id));
  for (const id of group.objectiveIds) if (!available.has(id)) throw new Error(`Unknown Section 5 objective ${id} in ${group.id}`);
  return [...new Set(group.objectiveIds)];
}

export function section5PapersForLesson(lesson, paperPool = lesson.pastPaperPool ?? lesson.pastPaperQuestions) {
  const ids = [...new Set(section5Journey[lesson.sequenceIndex].groups.flatMap(paperIdsForGroup))];
  const pool = [...paperPool, ...section5ExtraPapers];
  return ids.map(id => {
    const question = pool.find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 5 past paper ${id} for ${lesson.route}`);
    return { ...question, objectiveIds: section5PaperObjectives[id] ?? question.objectiveIds };
  });
}

function tableMarkup(table) {
  return `<div class="s5-table-scroll" tabindex="0" role="region" aria-label="${esc(table.title ?? 'Worked values')}"><table>${table.title ? `<caption>${esc(table.title)}</caption>` : ''}<thead><tr>${table.headers.map(cell => `<th scope="col">${esc(cell)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map((cell, index) => index ? `<td>${esc(cell)}</td>` : `<th scope="row">${esc(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function stepContent(step) {
  const code = typeof step.code === 'object' ? step.code.text : step.code;
  return `${step.body ? `<p>${esc(step.body)}</p>` : ''}${step.table ? tableMarkup(step.table) : ''}${code ? `<pre class="s5-code" tabindex="0" aria-label="${esc(step.codeLabel ?? 'Complete teaching example')}"><code>${esc(code)}</code></pre>` : ''}`;
}

function figure(group) {
  const source = typeof group.image === 'string' ? { asset: group.image, alt: group.imageAlt ?? group.title, caption: group.imageCaption } : group.image;
  if (source?.asset) return `<figure class="s5-figure"><button type="button" class="s5-image-button" data-s5-zoom aria-label="Enlarge ${esc(source.alt ?? group.title)}"><img src="${assetUrl(source.asset)}" alt="${esc(source.alt ?? group.title)}" loading="eager" decoding="async"></button>${source.caption ? `<figcaption>${esc(source.caption)} <span>Click image to enlarge.</span></figcaption>` : ''}</figure>`;
  const example = group.steps?.find(step => step.table || step.code);
  return example ? `<div class="s5-starting-example">${stepContent({ table: example.table, code: example.code })}</div>` : '';
}

function renderSteps(group, kind, steps, media = '') {
  const sequence = `<ol class="s5-step-map" aria-label="${kind === 'worked' ? 'Worked example' : 'Explanation'} steps">${steps.map((step, index) => `<li><button type="button" data-s5-step="${index}" aria-label="Step ${index + 1}: ${esc(step.title)}"><span>${index + 1}</span>${esc(step.title)}</button></li>`).join('')}</ol>`;
  return `<div class="s5-explanation${media ? ' s5-has-media' : ''}">${media ? `<div class="s5-explanation-media">${media}${sequence}</div>` : ''}<div class="s5-step-stack">${steps.map((step, index) => `<section class="s5-step" id="${group.id}--${kind}-${index + 1}" data-s5-step-panel="${index}"><p class="s5-eyebrow">${kind === 'worked' ? 'Work together' : 'Explanation'} · ${index + 1} / ${steps.length}</p><h3 tabindex="-1">${esc(step.title)}</h3>${stepContent(step)}</section>`).join('')}${!media ? sequence : ''}</div></div>`;
}

// Preserve the previous interactive unit bookmarks when concepts are split.
const legacyUnitGroups = {
  28: ['os-common-services', 'ram-allocation', 'process-turns', 'files-and-permissions', 'device-service', 'process-turns'],
  29: ['prepare-and-check-storage', 'library-routine', 'dll-sharing', 'prepare-and-check-storage', 'compression-and-tool-choice', 'detect-and-recover', 'library-routine', 'dll-sharing'],
  32: ['editor-feedback', 'debug-with-evidence', 'format-and-fold', 'debug-with-evidence'],
};

function renderGroup(group, index, lesson, helpers, claimed) {
  const objectives = groupObjectives(group, lesson);
  const media = figure(group);
  const experiment = group.lab ? (labMarkup[group.lab] ?? '').replace('class="s5-lab', `${group.labConfig?.scenario ? `data-scenario="${esc(group.labConfig.scenario)}" ` : ''}${group.labConfig?.problem ? `data-problem="${esc(group.labConfig.problem)}" ` : ''}class="s5-lab`) : '';
  if (group.lab && !experiment) throw new Error(`Unknown Section 5 lab ${group.lab}`);
  const anchors = group.unitKeys.flatMap(key => {
    const unitIndex = lesson.units.findIndex(unit => unit.unitKey === key) + 1;
    if (claimed.units.has(unitIndex)) return [];
    claimed.units.add(unitIndex);
    return legacyUnitGroups[lesson.sequenceIndex] ? [] : [`<span id="unit-${unitIndex}" class="s5-anchor"></span>`];
  }).join('') + (legacyUnitGroups[lesson.sequenceIndex] ?? []).flatMap((id, index) => id === group.id ? [`<span id="unit-${index + 1}" class="s5-anchor"></span>`] : []).join('');
  const papers = paperIdsForGroup(group).map(id => {
    if (claimed.papers.has(id)) throw new Error(`Duplicate Section 5 paper ${id} on ${lesson.route}`);
    claimed.papers.add(id);
    const question = [...(helpers.paperPool ?? lesson.pastPaperPool ?? lesson.pastPaperQuestions), ...section5ExtraPapers].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 5 past paper ${id}`);
    return { ...question, objectiveIds: section5PaperObjectives[id] ?? question.objectiveIds };
  });
  const practices = (group.practiceIds ?? []).map(id => {
    if (claimed.practices.has(id)) throw new Error(`Duplicate Section 5 practice ${id}`);
    claimed.practices.add(id);
    const question = [...lesson.practice, ...lesson.optionalPractice].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 5 authored task ${id}`);
    return question;
  });
  const phase = (name, body) => `<section class="s5-phase" id="${group.id}--${name}" data-s5-phase="${name}" aria-label="${phaseNames[name]}"><p class="s5-phase-label">${phaseNames[name]}</p>${body}</section>`;
  let paperAnchors = '';
  if (papers.length && !claimed.paperAnchor) {
    claimed.paperAnchor = true;
    paperAnchors = '<span id="past-paper-questions" class="s5-anchor"></span><span id="original-exam-style-question" class="s5-anchor"></span>';
  }
  return `<article class="s5-group" id="${group.id}" data-s5-group data-objectives="${objectives.join(' ')}" data-unit-keys="${group.unitKeys.join(' ')}">${anchors}<header class="s5-group-heading"><p class="s5-eyebrow">System software · Concept ${String(index + 1).padStart(2, '0')}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>
    ${phase('observe', `<div class="s5-observe-grid${media ? ' s5-has-media' : ''}">${media}<div class="s5-observe-copy"><p class="s5-eyebrow">Start with a question</p><h3>${esc(group.question)}</h3><p>${esc(group.observe)}</p></div></div>`)}
    ${group.prerequisite ? phase('prepare', `<div class="s5-prerequisite"><p class="s5-eyebrow">Use what you already know</p><h3>${esc(group.prerequisite.title)}</h3><p>${esc(group.prerequisite.body)}</p></div>`) : ''}
    ${group.steps?.length ? phase('explain', renderSteps(group, 'explain', group.steps, group.image ? media : '')) : ''}
    ${group.worked?.steps?.length ? phase('worked', `<header class="s5-worked-intro"><h3>${esc(group.worked.title)}</h3>${group.worked.setup ? `<p>${esc(group.worked.setup)}</p>` : ''}</header>${renderSteps(group, 'worked', group.worked.steps)}${group.worked.conclusion ? `<p class="s5-worked-conclusion" data-s5-worked-conclusion>${esc(group.worked.conclusion)}</p>` : ''}`) : ''}
    ${group.lab ? phase('experiment', `<p class="s5-predict">${esc(group.experimentPrompt ?? 'Predict the result. Change one condition, run the model, then explain what changed.')}</p>${experiment}<noscript><p>Enable JavaScript to operate this model. The explanations and worked examples remain available below.</p></noscript>`) : ''}
    ${group.check ? phase('check', `<div class="s5-check"><p class="s5-eyebrow">Explain it yourself · Teacher-written</p><h3>${esc(group.check.prompt)}</h3><details class="s5-answer"><summary>Check your reasoning</summary><p>${esc(group.check.answer)}</p></details></div>${practices.length ? `<details class="s5-extra-practice"><summary>Apply the idea · Teacher-written practice</summary>${practices.map((question, i) => helpers.renderPractice(question, i, 5)).join('')}</details>` : ''}`) : ''}
    ${papers.length ? phase('papers', `${paperAnchors}<details class="s5-paper-set" data-s5-question-fold><summary>Attempt the past-paper questions · ${papers.reduce((total, question) => total + question.marks, 0)} marks</summary>${helpers.renderPastPaperQuestions({ ...lesson, pastPaperQuestions: papers, examTiming: [Math.max(3, papers.reduce((total, q) => total + q.marks, 0)), Math.max(5, papers.reduce((total, q) => total + q.marks, 0) * 2)] }).replaceAll('loading="lazy"', 'loading="eager"').replaceAll('Reading the question — teacher guidance', 'Hint — reading the question').replaceAll('Solution / model answer — teacher-written', 'Reasoning and model answer — teacher-written')}</details>`) : ''}
    ${phase('recap', `<div class="s5-connection"><p class="s5-eyebrow">Keep this idea</p><h3>${esc(group.takeaway)}</h3>${group.bridge ? `<p>${esc(group.bridge)}</p>` : ''}</div>${group.trap ? `<details class="s5-misconception"><summary>Check a common misunderstanding</summary><p>${esc(group.trap)}</p></details>` : ''}<details class="s5-objectives"><summary>Learning goals</summary><ul>${lesson.objectives.filter(([id]) => objectives.includes(id)).map(([, text]) => `<li>${esc(text)}</li>`).join('')}</ul></details>`)}
  </article>`;
}

export function renderSection5Classroom(lesson, helpers) {
  const journey = section5Journey[lesson.sequenceIndex];
  if (!journey) throw new Error(`Missing Section 5 journey for ${lesson.sequenceIndex}`);
  const groups = journey.groups;
  const claimed = { units: new Set(), papers: new Set(), practices: new Set(), paperAnchor: false };
  const content = groups.map((group, index) => renderGroup(group, index, lesson, helpers, claimed)).join('');
  if (claimed.units.size !== lesson.units.length) throw new Error(`Section 5 classroom does not cover every legacy unit on ${lesson.route}`);
  const extra = [...lesson.practice, ...lesson.optionalPractice].filter(question => !claimed.practices.has(question.id));
  return `<main class="s5-classroom" data-s5-classroom data-mode="reading"><header class="s5-titlebar"><div><a class="s5-back" href="../section-5/">← System software</a><h1>${esc(journey.title)}</h1></div><div class="s5-mode-switch" aria-label="Page mode" hidden><button type="button" data-s5-mode="classroom" aria-pressed="true">Classroom</button><button type="button" data-s5-mode="reading" aria-pressed="false">Full reading</button></div></header>
    <p class="s5-intro">${esc(journey.intro)}</p><p class="s5-resource-status" data-s5-resources role="status" hidden>Loading this page’s images…</p><span id="visual-and-core" class="s5-anchor"></span><div data-s5-scroll-anchor></div><div class="s5-toolbar"><nav class="s5-phases" aria-label="Teaching stages" hidden></nav><details class="s5-directory" id="lesson-contents"><summary>Choose a concept</summary><ol>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a></li>`).join('')}</ol></details></div>
    <div class="s5-content">${content}</div>
    <nav class="s5-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s5-prev>← Previous</button><span class="s5-position" role="status" aria-live="polite"></span><button type="button" data-s5-hide>Hide answers</button><button type="button" data-s5-reset>Restart concept</button><button type="button" data-s5-next>Next →</button></nav>
    ${extra.length ? `<details class="s5-reference" id="practice"><summary>More practice for this topic</summary><p>Teacher-written consolidation. Attempt these tasks after studying this topic’s concepts.</p>${extra.map((question, index) => helpers.renderPractice(question, index, 5)).join('')}</details>` : '<span id="practice" class="s5-anchor"></span>'}
    <details class="s5-reference" id="summary"><summary>Topic recap</summary><ul>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a><p>${esc(group.takeaway)}</p></li>`).join('')}</ul></details>
    ${!claimed.paperAnchor ? '<span id="past-paper-questions" class="s5-anchor"></span><span id="original-exam-style-question" class="s5-anchor"></span>' : ''}
    <noscript><p>All explanations and worked steps are available in reading order. Experiments show their starting state; enable JavaScript to operate them. Answers remain folded until you open them.</p></noscript>
    <details class="s5-reference"><summary>Classroom controls</summary><p>Use the left and right arrow keys to move between teaching steps. Choose a concept to jump directly to it. Full reading shows all explanations. Click an illustration to enlarge it; press Escape to close it.</p></details><dialog class="s5-zoom" aria-label="Enlarged teaching image"><form method="dialog"><button autofocus>Close image</button></form><img alt=""></dialog>${helpers.navigation ?? ''}</main><footer><p>Cambridge AS Computer Science 9618 · System software</p></footer>`.replace(/^[\t ]+$/gm, '');
}

export function renderSection5Overview(lessons) {
  const allGroups = lessons.flatMap(lesson => section5Journey[lesson.sequenceIndex].groups.map(group => ({ ...group, route: lesson.route })));
  return `<main class="s5-overview"><header><p class="s5-eyebrow">Section 5 · System software</p><h1>Understand system software</h1><p>Open a file, change it, save it and print it. Follow the software that makes these familiar actions possible. Then follow a small program from readable source to execution and debugging.</p><a class="s5-start" href="../${lessons[0].route}/">Start the software journey →</a></header><section><h2>A connected route through system software</h2><div class="s5-topic-grid">${lessons.map((lesson, index) => { const topic = section5Journey[lesson.sequenceIndex]; return `<a href="../${lesson.route}/"><span>${String(index + 1).padStart(2, '0')}</span><h3>${esc(topic.title)}</h3><p>${esc(topic.intro)}</p></a>`; }).join('')}</div></section><section class="s5-session-plan"><h2>Learn in manageable sections</h2><p>Take time to predict, observe and explain. The suggested times include discussion and short practice; use the stopping points when you need a break. Classroom shows one teaching step. Full reading keeps the explanations together for review.</p><ol>${section5Sessions.map((session, index) => `<li><div><span class="s5-eyebrow">Part ${index + 1} · ${esc(Array.isArray(session.minutes) ? session.minutes.join('–') : session.minutes ?? '30–45')} minutes suggested</span><h3>${esc(session.title)}</h3>${session.focus ? `<p>${esc(session.focus)}</p>` : ''}</div><ul>${session.groups.map(id => { const group = allGroups.find(item => item.id === id); if (!group) throw new Error(`Unknown Section 5 session group ${id}`); return `<li><a href="../${group.route}/#${id}">${esc(group.title)} →</a></li>`; }).join('')}</ul></li>`).join('')}</ol></section></main><footer><p>Cambridge AS Computer Science 9618 · Section 5</p></footer>`;
}
