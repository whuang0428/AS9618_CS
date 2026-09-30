import { section10Journey, section10Sessions, section10Modules, section10PaperObjectives } from './course-v3-section10-journey.mjs';
import { labMarkup } from './course-v3-section10-labs.mjs';
import { section10ExtraPapers } from './course-v3-section10-extra-papers.mjs';
import { escapeGuidedHtml as esc, renderGuidedFigure, renderGuidedSteps } from './course-v3-section5-classroom.mjs';

const phaseNames = { observe: 'Observe', prepare: 'Recall', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };
const groupsInRoute = () => {
  const locations = Object.entries(section10Journey).flatMap(([lesson, journey]) => journey.groups.map(group => ({ ...group, route: `lesson-${String(lesson).padStart(3, '0')}` })));
  const order = section10Modules.flatMap(module => module.groups);
  if (order.length !== locations.length) throw new Error('Section 10 sessions must include every concept');
  return order.map(id => {
    const group = locations.find(item => item.id === id);
    if (!group) throw new Error(`Unknown Section 10 session concept ${id}`);
    return group;
  });
};
const conceptLink = (group, phase = 'observe') => `../${group.route}/#${group.id}--${phase}`;

export function section10GroupObjectives(group, lesson) {
  const available = new Set(lesson.objectives.map(([id]) => id));
  if (!group.objectiveIds?.length) throw new Error(`Missing Section 10 objectives: ${group.id}`);
  for (const id of group.objectiveIds) if (!available.has(id)) throw new Error(`Unknown Section 10 objective ${id} in ${group.id}`);
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown Section 10 unit ${key}`);
  return [...new Set(group.objectiveIds)];
}

export function section10PapersForLesson(lesson, pool = lesson.pastPaperPool ?? lesson.pastPaperQuestions) {
  const ids = section10Journey[lesson.sequenceIndex].groups.flatMap(group => group.papers ?? []);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate Section 10 paper on ${lesson.route}`);
  return ids.map(id => {
    const question = [...pool, ...section10ExtraPapers].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 10 paper ${id}`);
    if (!section10PaperObjectives[id]?.length) throw new Error(`Missing precise Section 10 paper objectives: ${id}`);
    return { ...question, objectiveIds: [...section10PaperObjectives[id]] };
  });
}

function stimulusMarkup(group) {
  const material = group.stimulus;
  if (!material?.title || (!material.items?.length && !material.table)) throw new Error(`Missing concrete opening material: ${group.id}`);
  const table = material.table;
  return `<section class="s10-stimulus" aria-label="Opening material"><h3>${esc(material.title)}</h3>${table ? `<div class="s5-table-scroll" role="region" tabindex="0" aria-label="${esc(table.title ?? material.title)}"><table><thead><tr>${table.headers.map(text => `<th scope="col">${esc(text)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(text => `<td>${esc(text)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${material.items?.length ? `<ul>${material.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`;
}
function activityMarkup(group) {
  if (!group.lab) return '';
  const markup = labMarkup[group.lab];
  if (!markup) throw new Error(`Unknown Section 10 activity ${group.lab}`);
  const config = Object.entries(group.labConfig ?? {}).map(([key, value]) => {
    const name = key.replace(/[A-Z]/g, letter => '-' + letter.toLowerCase());
    if (!/^[a-z][a-z0-9-]*$/.test(name)) throw new Error(`Invalid Section 10 activity configuration: ${key}`);
    return ` data-${name}="${esc(value)}"`;
  }).join('');
  return markup.replace(/(<[a-z][^>]*\bdata-s10-lab="[^"]*")/, match => match + config);
}
function answerMarkup(text) {
  const value = String(text ?? '');
  return /\n/.test(value) && /\b(?:DECLARE|INPUT|OUTPUT|FOR|WHILE|REPEAT|IF|ENDIF|NEXT)\b/.test(value)
    ? `<pre class="s5-code" tabindex="0" aria-label="One valid pseudocode answer"><code>${esc(value)}</code></pre>`
    : `<p>${esc(value)}</p>`;
}
function challengeMarkup(challenge) {
  if (!challenge) return '';
  return `<details class="s10-challenge"><summary>${esc(challenge.title ?? 'Take it further · Optional challenge')}</summary><p>${esc(challenge.prompt ?? challenge.body)}</p>${challenge.answer ? `<details class="s5-answer"><summary>Check the challenge</summary>${answerMarkup(challenge.answer)}</details>` : ''}</details>`;
}

function renderGroup(group, lesson, helpers, claimed, route) {
  const objectives = section10GroupObjectives(group, lesson);
  const index = route.findIndex(item => item.id === group.id);
  const previous = route[index - 1];
  const next = route[index + 1];
  const anchors = group.unitKeys.flatMap(key => {
    const number = lesson.units.findIndex(unit => unit.unitKey === key) + 1;
    if (claimed.units.has(number)) return [];
    claimed.units.add(number);
    return [`<span id="unit-${number}" class="s5-anchor"></span>`];
  }).join('');
  const phase = (name, body) => `<section class="s5-phase" id="${group.id}--${name}" data-s5-phase="${name}" aria-label="${phaseNames[name]}"><p class="s5-phase-label">${phaseNames[name]}</p>${body}</section>`;
  const papers = (group.papers ?? []).map(id => {
    const question = lesson.pastPaperQuestions.find(item => item.id === id);
    if (!question) throw new Error(`Paper ${id} is not allocated to ${lesson.route}`);
    return question;
  });
  let paperAnchors = '';
  if (papers.length && !claimed.paperAnchor) {
    claimed.paperAnchor = true;
    paperAnchors = '<span id="past-paper-questions" class="s5-anchor"></span><span id="original-exam-style-question" class="s5-anchor"></span>';
  }
  // An illustration accompanies the concrete opening only. Never expose later code as a fallback visual.
  const image = group.image ? renderGuidedFigure({ ...group, steps: [] }) : '';
  const marks = papers.reduce((sum, question) => sum + question.marks, 0);
  return `<article class="s5-group" id="${group.id}" data-s5-group data-s10-group data-s10-order="${index + 1}" data-s10-total="${route.length}" data-s10-prev="${previous ? conceptLink(previous, 'recap') : ''}" data-s10-next="${next ? conceptLink(next) : ''}" data-objectives="${objectives.join(' ')}" data-unit-keys="${group.unitKeys.join(' ')}">${anchors}
    <header class="s5-group-heading"><p class="s5-eyebrow">Build a booking system · Concept ${String(index + 1).padStart(2, '0')}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>
    ${phase('observe', `<div class="s10-opening${image ? ' s10-opening-with-image' : ''}">${image}<div>${stimulusMarkup(group)}<div class="s5-observe-copy"><p class="s5-eyebrow">Look, then discuss</p><h3>${esc(group.question)}</h3><p>${esc(group.observe)}</p></div></div></div>`)}
    ${group.prerequisite ? phase('prepare', `<div class="s5-prerequisite"><h3>${esc(group.prerequisite.title)}</h3><p>${esc(group.prerequisite.body)}</p></div>`) : ''}
    ${phase('explain', renderGuidedSteps(group, 'explain', group.steps))}
    ${phase('worked', `<header class="s5-worked-intro"><h3>${esc(group.worked.title)}</h3><p>${esc(group.worked.setup)}</p></header>${renderGuidedSteps(group, 'worked', group.worked.steps)}${group.worked.conclusion ? `<p class="s5-worked-conclusion" data-s5-worked-conclusion>${esc(group.worked.conclusion)}</p>` : ''}`)}
    ${group.lab ? phase('experiment', `<p class="s5-predict">${esc(group.experimentPrompt)}</p>${activityMarkup(group)}<noscript><p>Enable JavaScript to operate this activity. The complete worked example remains available above.</p></noscript>`) : ''}
    ${phase('check', `<div class="s5-check"><p class="s5-eyebrow">Try it yourself · Teacher-written</p><h3>${esc(group.check.prompt)}</h3>${group.check.code ? `<pre class="s5-code" tabindex="0" aria-label="Pseudocode for this check"><code>${esc(group.check.code)}</code></pre>` : ''}<details class="s5-answer"><summary>Check your reasoning</summary>${answerMarkup(group.check.answer)}</details></div>${challengeMarkup(group.challenge)}`)}
    ${papers.length ? phase('papers', `${paperAnchors}<details class="s5-paper-set" data-s5-question-fold><summary>Attempt the past-paper questions · ${marks} marks</summary>${helpers.renderPastPaperQuestions({ ...lesson, pastPaperQuestions: papers, separateExamGuidance: true, examTiming: [Math.max(3, marks), Math.max(5, marks * 2)] }).replaceAll('loading="lazy"', 'loading="eager"').replaceAll('Reading the question — teacher guidance', 'Hint — reading the question').replaceAll('Solution / model answer — teacher-written', 'Reasoning and model answer — teacher-written')}</details>`) : ''}
    ${phase('recap', `<div class="s5-connection"><p class="s5-eyebrow">Keep this idea</p><h3>${esc(group.takeaway)}</h3><p>${esc(group.bridge)}</p>${next ? `<a class="s10-continue" href="${conceptLink(next)}">Continue: ${esc(next.title)} →</a>` : '<p>You have completed the booking-system journey. Use More practice to try a different situation.</p>'}</div>${group.trap ? `<details class="s5-misconception"><summary>Check a common misunderstanding</summary><p>${esc(group.trap)}</p></details>` : ''}<details class="s5-objectives"><summary>Learning goals</summary><ul>${lesson.objectives.filter(([id]) => objectives.includes(id)).map(([, text]) => `<li>${esc(text)}</li>`).join('')}</ul></details>`)}
  </article>`;
}

export function renderSection10Classroom(lesson, helpers) {
  const journey = section10Journey[lesson.sequenceIndex];
  const route = groupsInRoute();
  const claimed = { units: new Set(), paperAnchor: false };
  const groups = journey.groups;
  const contents = groups.map(group => renderGroup(group, lesson, helpers, claimed, route)).join('');
  if (claimed.units.size !== lesson.units.length) throw new Error(`Unmapped Section 10 units on ${lesson.route}`);
  const practice = [...lesson.practice, ...(lesson.optionalPractice ?? [])];
  return `<main class="s5-classroom s10-classroom" data-s5-classroom data-s10-classroom data-mode="reading">
    <header class="s5-titlebar"><div><a class="s5-back" href="../section-10/">← Data types and structures</a><h1>${esc(journey.title)}</h1></div><div class="s5-mode-switch" aria-label="Page mode" hidden><button type="button" data-s5-mode="classroom" aria-pressed="true">Classroom</button><button type="button" data-s5-mode="reading" aria-pressed="false">Full reading</button></div></header>
    <p class="s5-intro">${esc(journey.intro)}</p><p class="s5-resource-status" data-s5-resources role="status" hidden>Loading teaching materials…</p>
    <span id="visual-and-core" class="s5-anchor"></span><div data-s5-scroll-anchor></div>
    <div class="s5-toolbar"><nav class="s5-phases" aria-label="Teaching stages" hidden></nav><details class="s5-directory" id="lesson-contents"><summary>Choose a concept</summary><ol>${route.map(group => `<li><a href="${group.route === lesson.route ? `#${group.id}` : conceptLink(group)}">${esc(group.title)}</a></li>`).join('')}</ol></details></div>
    <div class="s5-content">${contents}</div>
    <nav class="s5-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s5-prev>← Previous</button><span class="s5-position" role="status" aria-live="polite"></span><button type="button" data-s5-hide>Hide answers</button><button type="button" data-s5-reset>Restart concept</button><button type="button" data-s5-next>Next →</button></nav>
    ${!claimed.paperAnchor ? '<details class="s5-reference" id="past-paper-questions"><summary>Connect this idea to past papers</summary><span id="original-exam-style-question" class="s5-anchor"></span><p>Complete the checks on this page. The connected learning route introduces the remaining ideas before their past-paper tasks.</p></details>' : ''}
    ${lesson.sequenceIndex === 60 ? '<details class="s5-reference" id="e077"><summary>Array bounds past paper</summary><p>This question also uses two dimensions. <a href="../lesson-062/#e077">Attempt it after learning two-dimensional declarations →</a></p></details>' : ''}
    ${lesson.sequenceIndex === 69 ? '<details class="s5-reference" id="e083"><summary>Linked-list insertion past paper</summary><p>This question also uses a free list. <a href="../lesson-070/#e083">Attempt it after learning to allocate a free node →</a></p></details>' : ''}
    <details class="s5-reference" id="practice"><summary>More practice for this topic</summary><p>Teacher-written consolidation. Explain your reasoning before opening an answer.</p>${practice.map((question, index) => helpers.renderPractice(question, index, 10)).join('')}</details>
    <details class="s5-reference" id="summary"><summary>Topic recap</summary><ul>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a><p>${esc(group.takeaway)}</p></li>`).join('')}</ul></details>
    ${helpers.learningRoute ? `<details class="s5-reference"><summary>Prerequisites and related learning</summary>${helpers.learningRoute}</details>` : ''}
    <details class="s5-reference"><summary>Using this page</summary><p>Classroom shows one step at a time. Full reading keeps the same complete explanations together. Choose Teach from this point to resume. Next concept follows the booking-system learning route across pages. Click an illustration to enlarge it.</p></details>
    <noscript><p>The full reading view is available without JavaScript. Enable JavaScript for classroom navigation and interactive experiments.</p></noscript>
    <dialog class="s5-zoom" aria-label="Enlarged teaching image"><form method="dialog"><button autofocus>Close image</button></form><img alt=""></dialog>
  </main><footer><p>Cambridge AS Computer Science 9618 · Data types and structures</p></footer>`;
}

export function renderSection10Overview(lessons) {
  const route = groupsInRoute();
  const start = route[0];
  return `<main class="s5-overview s10-overview"><header><p class="s5-eyebrow">Section 10 · Data types and structures</p><h1>Give every booking a place.</h1><p>Begin with one booking. Choose how to store its details, process a whole collection and save it for tomorrow. Then control which item is added, changed or removed next.</p><a class="s5-start" href="${conceptLink(start)}">Start with one booking →</a></header>
    <section class="s10-route"><h2>Follow the ideas</h2><ol>${section10Modules.map(module => `<li><h3>${esc(module.title)}</h3><p>${esc(module.focus)}</p><a href="${conceptLink(route.find(group => group.id === module.groups[0]))}">Begin this part →</a></li>`).join('')}</ol></section>
    <section class="s5-session-plan"><h2>Suggested 45-minute sessions</h2><p>Allow time for explanation, prediction, experiments and paper practice. Repeat or extend a session whenever a check shows that an idea needs another example. A session can include more than one page.</p><ol>${section10Sessions.map((session, index) => `<li><div><span class="s5-eyebrow">Session ${index + 1} · 45 minutes suggested</span><h3>${esc(session.title)}</h3><p>${esc(session.focus)}</p></div><ul>${session.groups.map(id => {
    const group = route.find(item => item.id === id);
    return `<li><a href="${conceptLink(group)}">${esc(group.title)} →</a></li>`;
  }).join('')}</ul></li>`).join('')}</ol></section>
    <details class="s10-topic-directory"><summary>Browse by topic</summary><div class="s5-topic-grid">${lessons.map(lesson => `<a href="../${lesson.route}/"><h3>${esc(section10Journey[lesson.sequenceIndex].title)}</h3><p>${esc(section10Journey[lesson.sequenceIndex].intro)}</p></a>`).join('')}</div></details></main><footer><p>Cambridge AS Computer Science 9618 · Section 10</p></footer>`;
}
