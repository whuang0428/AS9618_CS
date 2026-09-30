import { section2Journey, section2Sessions, section2PaperObjectives, section2Route, section2Modules } from './course-v3-section2-journey.mjs';
import { section2ExtraPapers } from './course-v3-section2-extra-papers.mjs';
import { labFor } from './course-v3-section2-labs.mjs';
import { escapeGuidedHtml as esc, renderGuidedFigure, renderGuidedSteps as sharedSteps } from './course-v3-section5-classroom.mjs';

function renderGuidedSteps(group, kind, steps) {
  let html = sharedSteps(group, kind, steps);
  for (let index = 0; index < steps.length; index++) {
    if (!steps[index].image) continue;
    const marker = `id="${group.id}--${kind}-${index + 1}"`;
    const start = html.indexOf(marker);
    if (start < 0) throw new Error(`Missing guided step ${group.id}: ${kind} ${index + 1}`);
    const end = html.indexOf('</section>', start);
    html = html.slice(0, end) + renderGuidedFigure({ ...group, image: steps[index].image, steps: [] }) + html.slice(end);
  }
  return html;
}

const phaseNames = { observe: 'Observe', prepare: 'Recall', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };
const groupsInRoute = () => {
  const locations = Object.entries(section2Journey).flatMap(([lesson, journey]) => journey.groups.map(group => ({ ...group, route: `lesson-${String(lesson).padStart(3, '0')}` })));
  const byId = new Map(locations.map(group => [group.id, group]));
  if (byId.size !== locations.length || section2Route.length !== locations.length || new Set(section2Route).size !== locations.length) throw new Error('Invalid Section 2 learning route');
  return section2Route.map(id => { if (!byId.has(id)) throw new Error(`Unknown Section 2 route concept ${id}`); return byId.get(id); });
};
const conceptLink = (group, phase = 'observe') => `../${group.route}/#${group.id}--${phase}`;

export function section2GroupObjectives(group, lesson) {
  const available = new Set(lesson.objectives.map(([id]) => id));
  if (!group.objectiveIds?.length) throw new Error(`Missing Section 2 objectives: ${group.id}`);
  for (const id of group.objectiveIds) if (!available.has(id)) throw new Error(`Unknown Section 2 objective ${id} in ${group.id}`);
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown Section 2 unit ${key}`);
  return [...new Set(group.objectiveIds)];
}

export function section2PapersForLesson(lesson, pool = lesson.pastPaperPool ?? lesson.pastPaperQuestions) {
  const ids = section2Journey[lesson.sequenceIndex].groups.flatMap(group => group.papers ?? []);
  if (new Set(ids).size !== ids.length) throw new Error(`Duplicate Section 2 paper on ${lesson.route}`);
  return ids.map(id => {
    const question = [...pool, ...section2ExtraPapers].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 2 paper ${id}`);
    if (!section2PaperObjectives[id]?.length) throw new Error(`Missing precise Section 2 paper objectives: ${id}`);
    return { ...question, objectiveIds: [...section2PaperObjectives[id]] };
  });
}

function stimulusMarkup(group) {
  const material = group.stimulus;
  if (!material?.title || (!material.items?.length && !material.table)) throw new Error(`Missing concrete opening material: ${group.id}`);
  const table = material.table;
  return `<section class="s2-stimulus" aria-label="Opening material"><h3>${esc(material.title)}</h3>${table ? `<div class="s5-table-scroll" role="region" tabindex="0" aria-label="${esc(table.title ?? material.title)}"><table><thead><tr>${table.headers.map(text => `<th scope="col">${esc(text)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(text => `<td>${esc(text)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}${material.items?.length ? `<ul>${material.items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>` : ''}</section>`;
}
function activityMarkup(group) {
  return group.lab ? labFor(group.lab, group.labConfig ?? {}) : '';
}

function answerMarkup(text) {
  const value = String(text ?? '');
  return /\n/.test(value) && /\b(?:DECLARE|INPUT|OUTPUT|FOR|WHILE|REPEAT|IF|ENDIF|NEXT)\b/.test(value)
    ? `<pre class="s5-code" tabindex="0" aria-label="One valid pseudocode answer"><code>${esc(value)}</code></pre>`
    : `<p>${esc(value)}</p>`;
}
function challengeMarkup(challenge) {
  if (!challenge) return '';
  return `<details class="s2-challenge"><summary>${esc(challenge.title ?? 'Take it further · Optional challenge')}</summary><p>${esc(challenge.prompt ?? challenge.body)}</p>${challenge.answer ? `<details class="s5-answer"><summary>Check the challenge</summary>${answerMarkup(challenge.answer)}</details>` : ''}</details>`;
}

function renderGroup(group, lesson, helpers, claimed, route) {
  const objectives = section2GroupObjectives(group, lesson);
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
  return `<article class="s5-group" id="${group.id}" data-s5-group data-s2-group data-s2-order="${index + 1}" data-s2-total="${route.length}" data-s2-prev="${previous ? conceptLink(previous, 'recap') : ''}" data-s2-next="${next ? conceptLink(next) : ''}" data-objectives="${objectives.join(' ')}" data-unit-keys="${group.unitKeys.join(' ')}">${anchors}
    <header class="s5-group-heading"><p class="s5-eyebrow">Communicate data · Concept ${String(index + 1).padStart(2, '0')}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>
    ${phase('observe', `<div class="s2-opening${image ? ' s2-opening-with-image' : ''}">${image}<div>${stimulusMarkup(group)}<div class="s5-observe-copy"><p class="s5-eyebrow">Look, then discuss</p><h3>${esc(group.question)}</h3><details class="s5-answer s2-observation"><summary>Discuss the observation</summary><p>${esc(group.observe)}</p></details></div></div></div>`)}
    ${group.prerequisite ? phase('prepare', `<div class="s5-prerequisite"><h3>${esc(group.prerequisite.title)}</h3><p>${esc(group.prerequisite.body)}</p>${group.requires?.length ? `<p class="s2-revisit">Revisit: ${group.requires.map(id => { const earlier = route.find(item => item.id === id); if (!earlier) throw new Error(`Unknown prerequisite ${id}`); return `<a href="${conceptLink(earlier)}">${esc(earlier.title)}</a>`; }).join(' · ')}</p>` : ''}</div>`) : ''}
    ${phase('explain', renderGuidedSteps(group, 'explain', group.steps))}
    ${phase('worked', `<header class="s5-worked-intro"><h3>${esc(group.worked.title)}</h3><p>${esc(group.worked.setup)}</p></header>${renderGuidedSteps(group, 'worked', group.worked.steps)}${group.worked.conclusion ? `<p class="s5-worked-conclusion" data-s5-worked-conclusion>${esc(group.worked.conclusion)}</p>` : ''}`)}
    ${group.lab ? phase('experiment', `<p class="s5-predict">${esc(group.experimentPrompt)}</p>${activityMarkup(group)}<noscript><p>Enable JavaScript to operate this activity. The complete worked example remains available above.</p></noscript>`) : ''}
    ${phase('check', `<div class="s5-check"><p class="s5-eyebrow">Try it yourself · Teacher-written</p><h3>${esc(group.check.prompt)}</h3>${group.check.code ? `<pre class="s5-code" tabindex="0" aria-label="Pseudocode for this check"><code>${esc(group.check.code)}</code></pre>` : ''}<details class="s5-answer"><summary>Check your reasoning</summary>${answerMarkup(group.check.answer)}</details></div>${challengeMarkup(group.challenge)}`)}
    ${papers.length ? phase('papers', `${paperAnchors}<details class="s5-paper-set" data-s5-question-fold open><summary>Attempt the past-paper questions · ${marks} marks</summary>${helpers.renderPastPaperQuestions({ ...lesson, pastPaperQuestions: papers, separateExamGuidance: true, examTiming: [Math.max(3, marks), Math.max(5, marks * 2)] }).replaceAll('loading="lazy"', 'loading="eager"').replaceAll('Reading the question — teacher guidance', 'Hint — reading the question').replaceAll('Solution / model answer — teacher-written', 'Reasoning and model answer — teacher-written')}</details>`) : ''}
    ${phase('recap', `<div class="s5-connection"><p class="s5-eyebrow">Keep this idea</p><h3>${esc(group.takeaway)}</h3><p>${esc(group.bridge)}</p>${next ? `<a class="s2-continue" href="${conceptLink(next)}">Continue: ${esc(next.title)} →</a>` : '<p>You have completed the communication journey. Use More practice to try a different situation.</p><a class="s2-continue" href="../section-3/">Next section: Hardware →</a>'}</div>${group.trap ? `<details class="s5-misconception"><summary>Check a common misunderstanding</summary><p>${esc(group.trap)}</p></details>` : ''}<details class="s5-objectives"><summary>Learning goals</summary><ul>${lesson.objectives.filter(([id]) => objectives.includes(id)).map(([, text]) => `<li>${esc(text)}</li>`).join('')}</ul></details>`)}
  </article>`;
}

export function renderSection2Classroom(lesson, helpers) {
  const journey = section2Journey[lesson.sequenceIndex];
  const route = groupsInRoute();
  const claimed = { units: new Set(), paperAnchor: false };
  const groups = journey.groups;
  const contents = groups.map(group => renderGroup(group, lesson, helpers, claimed, route)).join('');
  if (claimed.units.size !== lesson.units.length) throw new Error(`Unmapped Section 2 units on ${lesson.route}`);
  const practice = [...lesson.practice, ...(lesson.optionalPractice ?? [])];
  return `<main class="s5-classroom s2-classroom" data-s5-classroom data-s2-classroom data-mode="reading">
    <header class="s5-titlebar"><div><a class="s5-back" href="../section-2/">← Communication</a><h1>${esc(journey.title)}</h1></div><div class="s5-mode-switch" aria-label="Page mode" hidden><button type="button" data-s5-mode="classroom" aria-pressed="true">Classroom</button><button type="button" data-s5-mode="reading" aria-pressed="false">Full reading</button></div></header>
    <p class="s5-intro">${esc(journey.intro)}</p><p class="s5-resource-status" data-s5-resources role="status" hidden>Loading teaching materials…</p>
    <span id="visual-and-core" class="s5-anchor"></span><div data-s5-scroll-anchor></div>
    <div class="s5-toolbar"><nav class="s5-phases" aria-label="Teaching stages" hidden></nav><details class="s5-directory" id="lesson-contents"><summary>Choose a concept</summary><ol>${route.map(group => `<li><a href="${group.route === lesson.route ? `#${group.id}` : conceptLink(group)}">${esc(group.title)}</a></li>`).join('')}</ol></details></div>
    <div class="s5-content">${contents}</div>
    <nav class="s5-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s5-prev>← Previous</button><span class="s5-position" role="status" aria-live="polite"></span><button type="button" data-s5-hide>Hide answers</button><button type="button" data-s5-reset>Restart concept</button><button type="button" data-s5-next>Next →</button></nav>
    ${!claimed.paperAnchor ? '<details class="s5-reference" id="past-paper-questions"><summary>Connect this idea to past papers</summary><span id="original-exam-style-question" class="s5-anchor"></span><p>Complete the checks on this page. The connected learning route introduces the remaining ideas before their past-paper tasks.</p></details>' : ''}
    <details class="s5-reference" id="practice"><summary>More practice for this topic</summary><p>Teacher-written consolidation. Explain your reasoning before opening an answer.</p>${practice.map((question, index) => helpers.renderPractice(question, index, 2)).join('')}</details>
    <details class="s5-reference" id="summary"><summary>Topic recap</summary><ul>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a><p>${esc(group.takeaway)}</p></li>`).join('')}</ul></details>
    ${helpers.learningRoute ? `<details class="s5-reference"><summary>Prerequisites and related learning</summary>${helpers.learningRoute}</details>` : ''}
    <details class="s5-reference"><summary>Using this page</summary><p>Classroom shows one step at a time. Full reading keeps the same complete explanations together. Choose Teach from this point to resume. Next concept follows the learning route across pages. Click an illustration to enlarge it.</p></details>
    <noscript><p>The full reading view is available without JavaScript. Enable JavaScript for classroom navigation and interactive experiments.</p></noscript>
    <dialog class="s5-zoom" aria-label="Enlarged teaching image"><form method="dialog"><button autofocus>Close image</button></form><img alt=""></dialog>
  </main><footer><p>Cambridge AS Computer Science 9618 · Communication</p></footer>`;
}

export function renderSection2Overview(lessons) {
  const route = groupsInRoute();
  const byId = new Map(route.map(group => [group.id, group]));
  const start = route[0];
  return `<main class="s5-overview s2-overview"><header><p class="s5-eyebrow">Section 2 · Communication</p><h1>How does a school share files, reach a website and play a video?</h1><p>Begin with familiar devices and shared resources. Follow signals, connections and addresses to explain how data reaches its destination. Recall the basics where you need them, then use what you understand in a new situation.</p><a class="s5-start" href="${conceptLink(start)}">Start with a shared resource →</a></header>
    <section class="s2-route"><h2>Follow the ideas</h2><ol>${section2Modules.map(module => `<li><h3>${esc(module.title)}</h3><p>${esc(module.description)}</p><a href="${conceptLink(byId.get(module.groups[0]))}">Begin this part →</a><details><summary>Concepts in this part</summary><ul>${module.groups.map(id => `<li><a href="${conceptLink(byId.get(id))}">${esc(byId.get(id).title)}</a></li>`).join('')}</ul></details></li>`).join('')}</ol></section>
    <section class="s5-session-plan"><h2>Suggested 45-minute sessions</h2><p>Allow time for explanation, prediction, experiments and paper practice. Repeat or extend a session whenever a check shows that an idea needs another example. Follow the links in this learning route: a session may visit more than one topic page.</p><ol>${section2Sessions.map((session, index) => `<li><div><span class="s5-eyebrow">Session ${index + 1} · 45 minutes suggested</span><h3>${esc(session.title)}</h3><p>${esc(session.focus)}</p></div><ul>${session.groups.map(id => `<li><a href="${conceptLink(byId.get(id))}">${esc(byId.get(id).title)} →</a></li>`).join('')}</ul></li>`).join('')}</ol></section>
    <details class="s2-topic-directory"><summary>Browse by topic</summary><div class="s5-topic-grid">${lessons.map(lesson => `<a href="../${lesson.route}/"><h3>${esc(section2Journey[lesson.sequenceIndex].title)}</h3><p>${esc(section2Journey[lesson.sequenceIndex].intro)}</p></a>`).join('')}</div></details></main><footer><p>Cambridge AS Computer Science 9618 · Section 2</p></footer>`;
}
