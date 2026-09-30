import { section4Journey, section4Sessions, section4PaperObjectives } from './course-v3-section4-journey.mjs';
import labMarkup from './course-v3-section4-labs.js';
import { section4ExtraPapers } from './course-v3-section4-extra-papers.mjs';

export { section4PaperObjectives };
const esc = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const assetUrl = path => path.startsWith('/') ? `../..${path}` : path;
const phaseNames = { observe: 'Observe', explain: 'Explain', worked: 'Work together', experiment: 'Experiment', check: 'Check', papers: 'Past paper', recap: 'Connect' };

export const paperIdsForGroup = group => group.papers ?? [];

export function groupObjectives(group, lesson) {
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown Section 4 unit ${key}`);
  if (!group.objectiveIds?.length) throw new Error(`Section 4 group ${group.id} needs explicit objectives`);
  const available = new Set(lesson.objectives.map(([id]) => id));
  for (const id of group.objectiveIds) if (!available.has(id)) throw new Error(`Unknown Section 4 objective ${id} in ${group.id}`);
  return [...new Set(group.objectiveIds)];
}

export function section4PapersForLesson(lesson, paperPool = lesson.pastPaperPool ?? lesson.pastPaperQuestions) {
  const ids = [...new Set(section4Journey[lesson.sequenceIndex].groups.flatMap(paperIdsForGroup))];
  const pool = [...paperPool, ...section4ExtraPapers];
  return ids.map(id => {
    const question = pool.find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 4 past paper ${id} for ${lesson.route}`);
    return { ...question, objectiveIds: section4PaperObjectives[id] ?? question.objectiveIds };
  });
}

function tableMarkup(table) {
  return `<div class="s4-table-scroll" tabindex="0" role="region" aria-label="${esc(table.title ?? 'Worked values')}"><table>${table.title ? `<caption>${esc(table.title)}</caption>` : ''}<thead><tr>${table.headers.map(cell => `<th scope="col">${esc(cell)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map((cell, index) => index ? `<td>${esc(cell)}</td>` : `<th scope="row">${esc(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function stepContent(step) {
  const code = typeof step.code === 'object' ? step.code.text : step.code;
  return `${step.body ? `<p>${esc(step.body)}</p>` : ''}${step.table ? tableMarkup(step.table) : ''}${code ? `<pre class="s4-code" tabindex="0" aria-label="${esc(step.codeLabel ?? 'Assembly example')}"><code>${esc(code)}</code></pre>` : ''}`;
}

function figure(group, lesson) {
  if (['memory-addresses', 'stored-instructions'].includes(group.id) && group.steps?.[0]?.table) return `<div class="s4-starting-example">${tableMarkup(group.steps[0].table)}</div>`;
  if (['readable-instructions', 'label-addresses'].includes(group.id)) {
    const example = group.steps.find(step => group.id === 'readable-instructions' ? step.table : step.code);
    return `<div class="s4-starting-example">${stepContent({ table: example.table, code: example.code })}</div>`;
  }
  const source = lesson.units.find(unit => group.unitKeys.includes(unit.unitKey))?.leadVisual;
  const requested = typeof group.image === 'string' ? { asset: group.image, alt: group.imageAlt ?? group.title, caption: group.imageCaption } : group.image;
  if (requested?.asset) return `<figure class="s4-figure"><img src="${assetUrl(requested.asset)}" alt="${esc(requested.alt ?? group.title)}" loading="eager" decoding="async">${requested.asset.endsWith('usb-hdmi-vga.png') ? '<div class="s4-port-labels"><span>USB Type-A</span><span>HDMI Type-A</span><span>VGA · 15 pins</span></div>' : ''}${requested.caption ? `<figcaption>${esc(requested.caption)}</figcaption>` : ''}</figure>`;
  if (group.lab) return `<figure class="s4-figure s4-schematic">${labMarkup.initialVisual(group.lab, group.labConfig)}<figcaption>${esc(group.visualCaption ?? 'Locate the starting values and connections. Use the experiment to change one condition and follow the result.')}</figcaption></figure>`;
  if (source?.asset) return `<figure class="s4-figure"><img src="${assetUrl(source.asset)}" alt="${esc(source.alt ?? group.title)}" loading="eager" decoding="async">${source.caption ? `<figcaption>${esc(source.caption)}</figcaption>` : ''}</figure>`;
  const example = group.steps?.find(step => step.table || step.code);
  if (example) return `<div class="s4-starting-example">${stepContent({ table: example.table, code: example.code })}</div>`;
  return '';
}

function renderSteps(group, kind, steps, media = '') {
  const sequence = `<ol class="s4-step-map" aria-label="${kind === 'worked' ? 'Worked example' : 'Explanation'} steps">${steps.map((step, index) => `<li><button type="button" data-s4-step="${index}" aria-label="Step ${index + 1}: ${esc(step.title)}"><span>${index + 1}</span>${esc(step.title)}</button></li>`).join('')}</ol>`;
  return `<div class="s4-explanation${media ? ' s4-has-media' : ''}">${media ? `<div class="s4-explanation-media">${media}${sequence}</div>` : ''}<div class="s4-step-stack">${steps.map((step, index) => `<section class="s4-step" id="${group.id}--${kind}-${index + 1}" data-s4-step-panel="${index}"><p class="s4-eyebrow">${kind === 'worked' ? 'Work together' : 'Explanation'} · ${index + 1} / ${steps.length}</p><h3 tabindex="-1">${esc(step.title)}</h3>${stepContent(step)}</section>`).join('')}${!media ? sequence : ''}</div></div>`;
}

function renderGroup(group, index, lesson, helpers, claimed) {
  const objectives = groupObjectives(group, lesson);
  const media = figure(group, lesson);
  const anchors = group.unitKeys.flatMap(key => {
    const unitIndex = lesson.units.findIndex(unit => unit.unitKey === key) + 1;
    if (claimed.units.has(unitIndex)) return [];
    claimed.units.add(unitIndex);
    return [`<span id="unit-${unitIndex}" class="s4-anchor"></span>`];
  }).join('');
  const papers = paperIdsForGroup(group).map(id => {
    if (claimed.papers.has(id)) throw new Error(`Duplicate Section 4 paper ${id} on ${lesson.route}`);
    claimed.papers.add(id);
    const question = [...(helpers.paperPool ?? lesson.pastPaperPool ?? lesson.pastPaperQuestions), ...section4ExtraPapers].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 4 past paper ${id}`);
    return { ...question, objectiveIds: section4PaperObjectives[id] ?? question.objectiveIds };
  });
  const practices = (group.practiceIds ?? []).map(id => {
    if (claimed.practices.has(id)) throw new Error(`Duplicate Section 4 practice ${id}`);
    claimed.practices.add(id);
    const question = [...lesson.practice, ...lesson.optionalPractice].find(item => item.id === id);
    if (!question) throw new Error(`Missing Section 4 authored task ${id}`);
    return question;
  });
  const phase = (name, body) => `<section class="s4-phase" id="${group.id}--${name}" data-s4-phase="${name}" aria-label="${phaseNames[name]}"><p class="s4-phase-label">${phaseNames[name]}</p>${body}</section>`;
  let paperAnchors = '';
  if (papers.length && !claimed.paperAnchor) {
    claimed.paperAnchor = true;
    paperAnchors = '<span id="past-paper-questions" class="s4-anchor"></span><span id="original-exam-style-question" class="s4-anchor"></span>';
  }
  return `<article class="s4-group" id="${group.id}" data-s4-group data-objectives="${objectives.join(' ')}" data-unit-keys="${group.unitKeys.join(' ')}">${anchors}<header class="s4-group-heading"><p class="s4-eyebrow">Processor fundamentals · Concept ${String(index + 1).padStart(2, '0')}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>
    ${phase('observe', `<div class="s4-observe-grid${media ? ' s4-has-media' : ''}">${media}<div class="s4-observe-copy"><p class="s4-eyebrow">Start with a question</p><h3>${esc(group.question)}</h3><p>${esc(group.observe)}</p></div></div>`)}
    ${group.steps?.length ? phase('explain', renderSteps(group, 'explain', group.steps, media)) : ''}
    ${group.worked?.steps?.length ? phase('worked', `<header class="s4-worked-intro"><h3>${esc(group.worked.title)}</h3>${group.worked.setup ? `<p>${esc(group.worked.setup)}</p>` : ''}</header>${renderSteps(group, 'worked', group.worked.steps)}${group.worked.conclusion ? `<p class="s4-worked-conclusion" data-s4-worked-conclusion>${esc(group.worked.conclusion)}</p>` : ''}`) : ''}
    ${group.lab ? phase('experiment', `<p class="s4-predict">${esc(group.experimentPrompt ?? 'Predict the result. Change one condition, run the model, then explain what changed.')}</p><div class="s4-lab" data-s4-lab="${group.lab}" data-s4-config="${esc(JSON.stringify(group.labConfig ?? {}))}"${group.labControls ? ` data-s4-controls="${esc(JSON.stringify(group.labControls))}"` : ''}>${labMarkup.initialMarkup(group.lab, group.labConfig, group.labControls)}<noscript><p class="s4-lab-note">Starting state shown. Enable JavaScript to change settings and run this experiment.</p></noscript></div>`) : ''}
    ${group.check ? phase('check', `<div class="s4-check"><p class="s4-eyebrow">Explain it yourself · Teacher-written</p><h3>${esc(group.check.prompt)}</h3><details class="s4-answer"><summary>Check your reasoning</summary><p>${esc(group.check.answer)}</p></details></div>${practices.length ? `<details class="s4-extra-practice"><summary>Apply the idea · Teacher-written practice</summary>${practices.map((question, i) => helpers.renderPractice(question, i, 4)).join('')}</details>` : ''}`) : ''}
    ${papers.length ? phase('papers', `${paperAnchors}<details class="s4-paper-set" data-s4-question-fold><summary>Attempt the past-paper questions · ${papers.reduce((total, question) => total + question.marks, 0)} marks</summary>${helpers.renderPastPaperQuestions({ ...lesson, pastPaperQuestions: papers, examTiming: [Math.max(3, papers.reduce((total, q) => total + q.marks, 0)), Math.max(5, papers.reduce((total, q) => total + q.marks, 0) * 2)] }).replaceAll('loading="lazy"', 'loading="eager"').replaceAll('Reading the question — teacher guidance', 'Hint — reading the question').replaceAll('Solution / model answer — teacher-written', 'Reasoning and model answer — teacher-written')}</details>`) : ''}
    ${phase('recap', `<div class="s4-connection"><p class="s4-eyebrow">Keep this idea</p><h3>${esc(group.takeaway)}</h3>${group.bridge ? `<p>${esc(group.bridge)}</p>` : ''}</div>${group.trap ? `<details class="s4-misconception"><summary>Check a common misunderstanding</summary><p>${esc(group.trap)}</p></details>` : ''}<details class="s4-objectives"><summary>Learning goals</summary><ul>${lesson.objectives.filter(([id]) => objectives.includes(id)).map(([, text]) => `<li>${esc(text)}</li>`).join('')}</ul></details>`)}
  </article>`;
}

export function renderSection4Classroom(lesson, helpers) {
  const journey = section4Journey[lesson.sequenceIndex];
  if (!journey) throw new Error(`Missing Section 4 journey for ${lesson.sequenceIndex}`);
  const groups = journey.groups;
  const claimed = { units: new Set(), papers: new Set(), practices: new Set(), paperAnchor: false };
  const content = groups.map((group, index) => renderGroup(group, index, lesson, helpers, claimed)).join('');
  if (claimed.units.size !== lesson.units.length) throw new Error(`Section 4 classroom does not cover every legacy unit on ${lesson.route}`);
  const extra = [...lesson.practice, ...lesson.optionalPractice].filter(question => !claimed.practices.has(question.id));
  return `<main class="s4-classroom" data-s4-classroom data-mode="reading"><header class="s4-titlebar"><div><a class="s4-back" href="../section-4/">← Processor fundamentals</a><h1>${esc(journey.title)}</h1></div><div class="s4-mode-switch" aria-label="Page mode" hidden><button type="button" data-s4-mode="classroom" aria-pressed="true">Classroom</button><button type="button" data-s4-mode="reading" aria-pressed="false">Full reading</button></div></header>
    <p class="s4-intro">${esc(journey.intro)}</p><p class="s4-resource-status" data-s4-resources role="status" hidden>Loading this page’s images…</p><span id="visual-and-core" class="s4-anchor"></span><div data-s4-scroll-anchor></div><div class="s4-toolbar"><nav class="s4-phases" aria-label="Teaching stages" hidden></nav><details class="s4-directory" id="lesson-contents"><summary>Choose a concept</summary><ol>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a></li>`).join('')}</ol></details></div>
    <div class="s4-content">${content}</div>
    <nav class="s4-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s4-prev>← Previous</button><span class="s4-position" role="status" aria-live="polite"></span><button type="button" data-s4-reset>Restart concept</button><button type="button" data-s4-next>Next →</button></nav>
    ${extra.length ? `<details class="s4-reference" id="practice"><summary>More practice for this topic</summary><p>Teacher-written consolidation. Attempt these tasks after studying this topic’s concepts.</p>${extra.map((question, index) => helpers.renderPractice(question, index, 4)).join('')}</details>` : '<span id="practice" class="s4-anchor"></span>'}
    <details class="s4-reference" id="summary"><summary>Topic recap</summary><ul>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a><p>${esc(group.takeaway)}</p></li>`).join('')}</ul></details>
    ${!claimed.paperAnchor ? '<span id="past-paper-questions" class="s4-anchor"></span><span id="original-exam-style-question" class="s4-anchor"></span>' : ''}
    <noscript><p>All explanations and worked steps are available in reading order. Experiments show their starting state; enable JavaScript to operate them. Answers remain folded until you open them.</p></noscript>
    ${helpers.navigation ?? ''}</main><footer><p>Cambridge AS Computer Science 9618 · Processor fundamentals</p></footer>`.replace(/^[\t ]+$/gm, '');
}

export function renderSection4Overview(lessons) {
  const allGroups = lessons.flatMap(lesson => section4Journey[lesson.sequenceIndex].groups.map(group => ({ ...group, route: lesson.route })));
  return `<main class="s4-overview"><header><p class="s4-eyebrow">Section 4 · Processor fundamentals</p><h1>Follow one instruction.<br>Understand the processor.</h1><p>A stored program turns a calculation into a sequence of small actions. Start with addresses and values, follow the CPU as it works, and then change the program to explain a new result.</p><a class="s4-start" href="../${lessons[0].route}/">Start the processor journey →</a></header><section><h2>A connected route through the processor</h2><div class="s4-topic-grid">${lessons.map((lesson, index) => { const topic = section4Journey[lesson.sequenceIndex]; return `<a href="../${lesson.route}/"><span>${String(index + 1).padStart(2, '0')}</span><h3>${esc(topic.title)}</h3><p>${esc(topic.intro)}</p></a>`; }).join('')}</div></section><section class="s4-session-plan"><h2>Learn in manageable sessions</h2><p>Each suggested session provides a 45-minute stopping point. Take more time for prediction, discussion and practice when needed. Classroom mode shows one teaching step; Full reading keeps every explanation available for review.</p><ol>${section4Sessions.map((session, index) => `<li><div><span class="s4-eyebrow">Session ${index + 1} · 45 minutes</span><h3>${esc(session.title)}</h3>${session.focus ? `<p>${esc(session.focus)}</p>` : ''}</div><ul>${session.groups.map(id => { const group = allGroups.find(item => item.id === id); if (!group) throw new Error(`Unknown Section 4 session group ${id}`); return `<li><a href="../${group.route}/#${id}">${esc(group.title)} →</a></li>`; }).join('')}</ul></li>`).join('')}</ol></section></main><footer><p>Cambridge AS Computer Science 9618 · Section 4</p></footer>`;
}
