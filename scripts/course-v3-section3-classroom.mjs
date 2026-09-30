import { section3Journey, section3Sessions } from './course-v3-section3-journey.mjs';
import { section3ExtraPapers } from './course-v3-section3-extra-papers.mjs';
import labMarkup from './course-v3-section3-labs.js';

const esc = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const assetUrl = path => `../..${path}`;
const imageOverrides = {
  'S3.03-MAGNETIC-HARD-DISK': { asset: '/assets/course-v3/section-3/hdd-anatomy.png', alt: 'An open magnetic hard disk: a circular platter rotates around its spindle; a pivoting arm positions the small head above the recording surface.', caption: 'Identify the circular platter, its central spindle, and the arm carrying the head. The head stays just above the surface.' },
};

function anatomy(kind) {
  const disk = kind === 'disk';
  const asset = disk ? 'hdd-anatomy.png' : 'speaker-cutaway.png';
  const labels = disk ? [
    { text:'Platter', x:1240, y:90, path:'M1260 110 L1220 250', dot:[1220,250] },
    { text:'Spindle', x:830, y:70, path:'M950 90 L955 385', dot:[955,385] },
    { text:'Actuator arm', x:50, y:125, path:'M230 145 L320 260 L555 500', dot:[555,500] },
    { text:'Read/write head', x:950, y:940, path:'M1120 892 L1020 810 L820 580', dot:[820,580] },
  ] : [
    { text:'Cone', x:90, y:85, path:'M180 110 L640 480', dot:[640,480] },
    { text:'Voice coil', x:1030, y:120, path:'M1160 145 L1270 190 L1270 650 L944 530', dot:[944,530] },
    { text:'Fixed magnet', x:970, y:930, path:'M1120 875 L1130 690', dot:[1130,690] },
  ];
  return `<svg class="s3-anatomy" viewBox="0 0 1536 1024" role="img" aria-label="${disk ? 'Hard disk platter, spindle, actuator arm and read/write head' : 'Speaker cone joined to a voice coil beside a fixed magnet'}"><image href="../../assets/course-v3/section-3/${asset}" width="1536" height="1024"/>${labels.map(l=>`<path d="${l.path}" fill="none" stroke="#12645b" stroke-width="6"/><circle cx="${l.dot[0]}" cy="${l.dot[1]}" r="9" fill="#12645b"/><text x="${l.x}" y="${l.y}" font-family="system-ui,sans-serif" font-size="44" font-weight="700" fill="#17313b" stroke="white" stroke-width="12" paint-order="stroke">${l.text}</text>`).join('')}</svg>`;
}

export const section3PaperObjectives = {
  E021: ['S3.02.A01', 'S3.02.A03'], E022: ['S3.03.A09'], E023: ['S3.03.A08'],
  E024: ['S3.04.A01', 'S3.06.A02', 'S3.06.A03'],
  E025: ['S3.08.A01', 'S3.08.A02', 'S3.08.A03', 'S3.09.A01', 'S3.09.A02'],
  E026: ['S3.08.A01', 'S3.08.A02', 'S3.08.A03', 'S3.09.A02'],
  E027: ['S3.10.A03', 'S3.10.A04', 'S3.10.A05', 'S3.10.A06'],
  E028: ['S3.10.A08', 'S3.10.A09'],
};

const extraPlacement = { 'three-dimensional-printing': 'E3D01', 'magnetic-storage': 'E3D02', 'rom-updates': 'E3D04' };
export function paperIdsForGroup(group) {
  const extra = extraPlacement[group.id] ? [extraPlacement[group.id]] : [];
  // Optical reading/writing has been taught in the preceding topic; buffer now completes its prerequisites.
  if (group.papers.includes('E024')) extra.push('E3D03');
  return [...group.papers, ...extra];
}
export function section3PapersForLesson(lesson) {
  const ids = new Set(section3Journey[lesson.sequenceIndex].groups.flatMap(paperIdsForGroup));
  return [...lesson.pastPaperQuestions, ...section3ExtraPapers.filter(q => ids.has(q.id))].map(q => ({...q, objectiveIds: section3PaperObjectives[q.id] ?? q.objectiveIds}));
}

export function groupObjectives(group, lesson) {
  return [...new Set(group.unitKeys.flatMap(key => {
    const unit = lesson.units.find(item => item.unitKey === key);
    if (!unit) throw new Error(`Unknown Section 3 unit ${key}`);
    return unit.objectiveIds;
  }))];
}

function figure(group, lesson) {
  if (['circuit', 'gates', 'laser', 'printing3d'].includes(group.lab)) return `<figure class="s3-figure s3-schematic">${labMarkup.initialVisual(group.lab)}<figcaption>${group.lab === 'circuit' ? 'A = manual request; B = automatic request; C = fault. Q = (A OR B) AND NOT C. Trace the intermediate signals X and Y.' : group.lab === 'laser' ? 'Locate the charging stage, laser, drum, toner supply, paper and fuser. Follow their roles one step at a time.' : group.lab === 'printing3d' ? 'The three slices specify the shape at each height. Build them in order during the experiment.' : 'Identify the input connections, gate outline and output. Change the gate and test its rule in the experiment.'}</figcaption></figure>`;
  const source = lesson.units.find(unit => group.unitKeys.includes(unit.unitKey))?.leadVisual;
  const override = group.unitKeys.map(key => imageOverrides[key]).find(Boolean);
  const asset = override?.asset ?? group.image ?? (group.lab === 'circuit' ? null : source?.asset);
  if (!asset) return `<ol class="s3-process-map">${group.steps.map((step, i) => `<li><span>${i + 1}</span>${esc(step.title)}</li>`).join('')}</ol>`;
  const alt = override?.alt ?? (asset === source?.asset ? source.alt : group.title);
  const caption = override?.caption ?? (asset === source?.asset ? source.caption : 'Follow the labelled parts and connections.');
  return `<figure class="s3-figure"><a href="${assetUrl(asset)}" target="_blank" rel="noopener" aria-label="Open diagram: ${esc(group.title)}">${override ? anatomy('disk') : `<img src="${assetUrl(asset)}" alt="${esc(alt)}" loading="lazy">`}</a><figcaption>${esc(caption)}</figcaption></figure>`;
}

function renderGroup(group, index, lesson, helpers, claimedLegacyUnits) {
  const objectives = groupObjectives(group, lesson);
  const media = figure(group, lesson);
  const anchors = group.unitKeys.flatMap(key => {
    const unitIndex = lesson.units.findIndex(unit => unit.unitKey === key) + 1;
    if (claimedLegacyUnits.has(unitIndex)) return [];
    claimedLegacyUnits.add(unitIndex);
    return [`<span id="unit-${unitIndex}" class="s3-anchor"></span>`];
  }).join('');
  const papers = paperIdsForGroup(group).map(id => {
    const paper = lesson.pastPaperQuestions.find(q => q.id === id);
    if (!paper) throw new Error(`Missing Section 3 past paper ${id}`);
    return { ...paper, objectiveIds: section3PaperObjectives[id] ?? paper.objectiveIds };
  });
  const practices = (group.practiceIds ?? []).map(id => {
    const task = [...lesson.practice, ...lesson.optionalPractice].find(q => q.id === id);
    if (!task) throw new Error(`Missing Section 3 authored task ${id}`);
    return task;
  });
  const phase = (name, label, body) => `<section class="s3-phase" data-s3-phase="${name}" aria-label="${label}">${body}</section>`;
  return `<article class="s3-group" id="${group.id}" data-s3-group data-objectives="${objectives.join(' ')}" data-unit-keys="${group.unitKeys.join(' ')}">${anchors}<header class="s3-group-heading"><p class="s3-eyebrow">Hardware / ${String(index + 1).padStart(2, '0')}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>
    ${phase('observe', 'Observe', `<div class="s3-observe-grid">${media}<div class="s3-observe-copy"><p class="s3-eyebrow">Look closely</p><h3>${esc(group.question)}</h3><p>${esc(group.observe)}</p></div></div>`)}
    ${phase('explain', 'Explain', `<div class="s3-explanation"><div class="s3-explanation-media">${group.id === 'sound-path' ? `<div data-s3-media="0">${media}</div><figure class="s3-figure" data-s3-media="4">${anatomy('speaker')}<figcaption>Current in the coil produces motion. The coil moves the attached cone; the magnet stays fixed.</figcaption></figure>` : media}<ol class="s3-step-map" aria-label="Explanation steps">${group.steps.map((step, i) => `<li><button type="button" data-s3-step="${i}" aria-label="Explanation step ${i + 1}: ${esc(step.title)}"><span>${i + 1}</span>${esc(step.title)}</button></li>`).join('')}</ol></div><div class="s3-step-stack">${group.steps.map((step, i) => `<section class="s3-step" data-s3-step-panel="${i}"><p class="s3-eyebrow">Step ${i + 1} / ${group.steps.length}</p><h3>${esc(step.title)}</h3><p>${esc(step.body)}</p>${step.table ? `<div class="s3-lab-table"><table><thead><tr>${step.table.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${step.table.rows.map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : ''}</section>`).join('')}</div></div>`)}
    ${group.lab ? phase('explore', 'Explore', `<p class="s3-predict">Predict a result, change one condition, then explain what happened.</p><div data-s3-lab="${group.lab}"></div>`) : ''}
    ${phase('check', 'Check understanding', `<div class="s3-check"><p class="s3-eyebrow">Explain it yourself · Teacher-written check</p><h3>${esc(group.check.prompt)}</h3><details><summary>Check your reasoning</summary><p>${esc(group.check.answer)}</p></details></div>${practices.length ? `<details class="s3-extra-practice"><summary>Apply the idea · Teacher-written practice</summary>${practices.map((q, i) => helpers.renderPractice(q, i, 3)).join('')}</details>` : ''}`)}
    ${papers.length ? phase('exam', 'Past-paper practice', helpers.renderPastPaperQuestions({ ...lesson, pastPaperQuestions: papers, examTiming: [Math.max(3, papers.reduce((n,q) => n + q.marks, 0)), Math.max(5, papers.reduce((n,q) => n + q.marks, 0) * 2)] }).replaceAll('Reading the question — teacher guidance', 'Hint — reading the question').replaceAll('Solution / model answer — teacher-written', 'Reasoning and model answer — teacher-written')) : ''}
    ${phase('connect', 'Keep and connect', `<div class="s3-connection"><p class="s3-eyebrow">Keep this idea</p><h3>${esc(group.takeaway)}</h3><p>${esc(group.bridge)}</p></div><details class="s3-objectives"><summary>Learning goals</summary><ul>${lesson.objectives.filter(([id]) => objectives.includes(id)).map(([,text]) => `<li>${esc(text)}</li>`).join('')}</ul></details>`)}
  </article>`.replace(/[\t ]+$/gm, '');
}

export function renderSection3Classroom(lesson, helpers) {
  const journey = section3Journey[lesson.sequenceIndex];
  const claimed = new Set();
  const groups = journey.groups;
  const assignedPractice = new Set(groups.flatMap(g => g.practiceIds ?? []));
  const extra = [...lesson.practice, ...lesson.optionalPractice].filter(q => !assignedPractice.has(q.id));
  return `<main class="s3-classroom" data-s3-classroom><header class="s3-titlebar"><div><a class="s3-back" href="../section-3/">← Hardware journey</a><h1>${esc(journey.title)}</h1></div></header>
    <p class="s3-intro">${esc(journey.intro)}</p><div data-s3-scroll-anchor></div><div class="s3-toolbar"><nav class="s3-phases" aria-label="Teaching stages" hidden></nav><details class="s3-directory" id="lesson-contents"><summary>Choose a concept</summary><ol>${groups.map(group => `<li><a href="#${group.id}">${esc(group.title)}</a></li>`).join('')}</ol></details></div>
    <div class="s3-content">${groups.map((group, i) => renderGroup(group, i, lesson, helpers, claimed)).join('')}</div>
    <nav class="s3-navigation" aria-label="Concept navigation" hidden><button type="button" data-s3-prev>← Previous</button><span class="s3-position" role="status" aria-live="polite"></span><button type="button" data-s3-reset>Restart concept</button><button type="button" data-s3-next>Next →</button></nav>
    <details class="s3-reference" id="practice"><summary>More practice for this topic</summary><p>Teacher-written consolidation. Choose a task after studying its related concepts.</p>${extra.map((q, i) => helpers.renderPractice(q, i, 3)).join('')}</details>
    <details class="s3-reference" id="summary"><summary>Topic recap and preparation</summary><p>Recall the binary and sound representation ideas from Section 1. Use basic charge, current and magnetic-field ideas to explain the devices here.</p><ul>${groups.map(g => `<li><a href="#${g.id}">${esc(g.title)}</a>: ${esc(g.takeaway)}</li>`).join('')}</ul></details>
    <noscript><p>All teaching steps are shown below their illustrations. Interactive experiments require JavaScript; the explanations and questions remain available.</p></noscript>
    ${helpers.navigation}</main><footer><p>Cambridge AS Computer Science 9618 · Hardware</p></footer>`;
}

export function renderSection3Overview(lessons) {
  const allGroups = lessons.flatMap(lesson => section3Journey[lesson.sequenceIndex].groups.map(group => ({ ...group, route: lesson.route })));
  return `<main class="s3-overview"><header><p class="s3-eyebrow">Section 3 / Hardware</p><h1>Follow the data.<br>Understand the machine.</h1><p>Start with a familiar system. Look inside its devices, follow changes in memory, then use feedback and logic to explain its decisions.</p><a class="s3-start" href="../lesson-015/">Start the hardware journey →</a></header><section><h2>A route through hardware</h2><div class="s3-topic-grid">${lessons.map(lesson => {const topic=section3Journey[lesson.sequenceIndex];return `<a href="../${lesson.route}/"><span>${String(lesson.sequenceIndex - 14).padStart(2,'0')}</span><h3>${esc(topic.title)}</h3><p>${esc(topic.intro)}</p></a>`;}).join('')}</div></section><section class="s3-session-plan"><h2>Learn in manageable sessions</h2><p>Each suggested session allows 45 minutes for observation, explanation, exploration, practice and a recap. Take more time when a concept needs it.</p><ol>${section3Sessions.map((session,i) => `<li><div><span class="s3-eyebrow">Session ${i+1} · 45 minutes</span><h3>${esc(session.title)}</h3></div><ul>${session.groups.map(id => {const g=allGroups.find(g=>g.id===id);if(!g)throw new Error(`Unknown S3 session group ${id}`);return `<li><a href="../${g.route}/#${id}">${esc(g.title)} →</a></li>`;}).join('')}</ul></li>`).join('')}</ol></section></main><footer><p>Cambridge AS Computer Science 9618 · Section 3</p></footer>`;
}
