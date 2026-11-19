import { courseV3Lessons } from './course-v3-content.mjs';
import { section8Journey, section8Checkpoints, section8LegacyGroups, section8PaperObjectives } from './course-v3-section8-journey.mjs';
import { section8ExtraPapers } from './course-v3-section8-extra-papers.mjs';
import { section8NewPapers } from './course-v3-section8-new-papers.mjs';
import { renderPastPaperQuestion } from './course-v3-past-paper-render.mjs';
import { renderDbmsWorkbench } from './course-v3-section8-dbms.mjs';
import { escapeGuidedHtml as esc } from './course-v3-section5-classroom.mjs';

const originals = courseV3Lessons.filter(l => l.section === 8).map(l => ({ page: l.sequenceIndex, units: [...l.units], objectives: [...l.objectives] }));
const objectiveText = new Map(originals.flatMap(l => l.objectives));
const unitKeys = new Set(originals.flatMap(l => l.units.map(u => u.unitKey)));
const allMaterials = Object.entries(section8Journey).flatMap(([page, topic]) => topic.groups.flatMap(g => g.materials.map(m => ({ ...m, page: Number(page) }))));
const url = page => `../lesson-${String(page).padStart(3, '0')}/`;
const label = group => `${group.number} · ${group.title}`;
const checkpointPage = page => page <= 43 ? 43 : page === 44 ? 44 : 47;

export function section8GroupObjectives(group) {
  if (!group.objectiveIds?.length) throw new Error(`Missing S8 objectives: ${group.id}`);
  for (const id of group.objectiveIds) if (!objectiveText.has(id)) throw new Error(`Unknown S8 objective ${id}`);
  for (const key of group.unitKeys) if (!unitKeys.has(key)) throw new Error(`Unknown S8 unit ${key}`);
  return [...new Set(group.objectiveIds)];
}

// Keep authoring identities and incoming bookmarks; active ownership follows the new route.
export function prepareSection8Lesson(lesson) {
  const ids = [...new Set(section8Journey[lesson.sequenceIndex].groups.flatMap(section8GroupObjectives))];
  return { ...lesson, objectives: ids.map(id => [id, objectiveText.get(id)]), syllabusIds: [...new Set(ids.map(id => id.replace(/\.A\d+$/, '')))] };
}

export function section8PapersForLesson(lesson, pool = lesson.pastPaperQuestions) {
  const cp = section8Checkpoints[lesson.sequenceIndex];
  if (!cp) return [];
  const selected = [...cp.papers, ...cp.extensionPapers];
  if (new Set(selected).size !== selected.length) throw new Error(`Repeated S8 paper on ${lesson.route}`);
  return selected.map(id => {
    const paper = [...pool, ...section8ExtraPapers, ...section8NewPapers].find(p => p.id === id);
    if (!paper) throw new Error(`Missing S8 paper ${id}`);
    return { ...paper, objectiveIds: section8PaperObjectives[id] ?? paper.objectiveIds,
      solution: id === 'E063' ? paper.solution.map(item => typeof item === 'object' && item.type === 'code' ? { ...item, text: item.text.replaceAll('"0002"', "'0002'") } : item) : paper.solution };
  });
}

export function section8BookmarkTargets(page) {
  const targets = { ...(section8LegacyGroups[page] ?? {}) }, original = originals.find(l => l.page === page);
  for (const [index, unit] of original.units.entries()) {
    const m = allMaterials.find(item => item.unitKeys.includes(unit.unitKey));
    if (!m) throw new Error(`No replacement for ${unit.unitKey}`);
    for (const id of [`unit-${index + 1}`, unit.syllabusId]) targets[id] ??= { page: m.page, target: m.id };
  }
  for (const [id] of original.objectives) {
    const m = allMaterials.find(item => item.objectiveIds.includes(id));
    if (m) targets[id] ??= { page: m.page, target: m.id };
  }
  const old = { 42: ['E056', 'E8D01', 'E8D02'], 43: ['E057', 'E058', 'E065A'], 44: ['E059', 'E060', 'E065D'], 45: [], 46: ['E061', 'E061B', 'E061C', 'E065B'], 47: ['E062', 'E063', 'E065C'] };
  for (const id of old[page]) for (const alias of [id, id.toLowerCase()]) targets[alias] = { page: checkpointPage(page), target: (id === 'E061' ? 'E061B' : id).toLowerCase() };
  const end = checkpointPage(page);
  for (const id of ['past-paper-questions', 'original-exam-style-question']) targets[id] = { page: end, target: section8Checkpoints[end].id };
  return targets;
}

export function renderSection8Classroom(source, helpers) {
  const lesson = prepareSection8Lesson(source), page = lesson.sequenceIndex, journey = section8Journey[page], cp = section8Checkpoints[page];
  const targets = section8BookmarkTargets(page);
  const seen = new Set([...journey.groups.flatMap(g => [g.id, ...g.materials.map(m => m.id)]), ...lesson.pastPaperQuestions.map(p => p.id.toLowerCase()), ...(cp ? [cp.id] : [])]);
  const anchor = id => { if (!id || seen.has(id)) return ''; seen.add(id); return `<span class="s8-anchor" id="${esc(id)}"></span>`; };
  const aliases = id => Object.entries(targets).filter(([, v]) => v.page === page && v.target === id).map(([key]) => anchor(key)).join('');
  const directory = Object.entries(section8Journey).map(([owner, topic]) => topic.groups.map(g => `<li><a href="${Number(owner) === page ? '' : url(owner)}#${g.id}">${esc(label(g))}</a></li>`).join('') + (section8Checkpoints[owner] ? `<li class="s8-directory-check"><a href="${Number(owner) === page ? '' : url(owner)}#${section8Checkpoints[owner].id}">${esc(section8Checkpoints[owner].title)}</a></li>` : '')).join('');
  const body = journey.groups.map(g => `<article class="s8-group" data-s8-topic id="${g.id}" data-label="${esc(label(g))}"><header class="s8-group-heading"><p class="s8-eyebrow">${g.number}</p><h2 tabindex="-1">${esc(g.title)}</h2></header>${g.materials.map(m => `<section class="s8-material" id="${m.id}" data-s8-card data-label="${esc(m.title)}" data-objectives="${m.objectiveIds.join(' ')}" data-unit-keys="${m.unitKeys.join(' ')}">${aliases(m.id)}${(m.aliases ?? []).map(anchor).join('')}<header class="s8-card-heading"><h3 tabindex="-1">${esc(m.title)}</h3></header>${m.html}</section>`).join('')}</article>`).join('');
  const question = (id, i) => {
    const q = lesson.pastPaperQuestions.find(p => p.id === id);
    if (!q) throw new Error(`Missing displayed S8 paper ${id}`);
    return aliases(id.toLowerCase()) + anchor(id) + renderPastPaperQuestion(q, i, { ...lesson, separateExamGuidance: true, collapsibleQuestion: true }).replaceAll('loading="lazy"', 'loading="eager"');
  };
  const marks = cp ? cp.papers.reduce((sum, id) => sum + lesson.pastPaperQuestions.find(q => q.id === id).marks, 0) : 0;
  const nextStage = page === 43 ? `${url(44)}#s8-2-1` : page === 44 ? `${url(45)}#s8-3-1` : '../section-8/';
  const boundary = cp ? `<article class="s8-group s8-boundary" data-s8-topic id="${cp.id}" data-label="${esc(cp.title)}">${aliases(cp.id)}<header class="s8-group-heading"><p class="s8-eyebrow">End-of-topic questions</p><h2 tabindex="-1">${esc(cp.title)}</h2></header><section class="s8-material s8-boundary-intro" data-s8-card id="${cp.id}-start" data-label="Stage review"><h3 tabindex="-1">Learning objectives</h3><ul>${cp.summary.map(text => `<li>${esc(text)}</li>`).join('')}</ul><p><strong>${cp.papers.length} past-paper question parts · ${marks} marks</strong></p><p>Attempt each question before opening hints, teacher reasoning or the official mark scheme. Use the command word and available marks to decide how much detail to give.</p></section>${cp.papers.map((id, i) => `<section class="s8-material s8-paper-material" data-s8-card id="attempt-${id.toLowerCase()}" data-label="${esc(lesson.pastPaperQuestions.find(q => q.id === id).sourceRef)}">${question(id, i)}</section>`).join('')}<section class="s8-material" data-s8-card id="${cp.id}-finish" data-label="Review and continue"><h3 tabindex="-1">Review and further practice</h3><p>Review the relevant explanations for any incorrect answers. Use the additional questions for further practice.</p><details class="s8-extension"><summary>Additional past-paper questions · ${cp.extensionPapers.length} parts</summary>${cp.extensionPapers.map((id, i) => question(id, cp.papers.length + i)).join('')}</details><p><a class="s8-stage-next" href="${nextStage}">${page === 43 ? 'Continue to 8.2 · DBMS' : page === 44 ? 'Continue to 8.3 · DDL and DML' : 'Review the complete chapter'}</a></p></section></article>` : '';
  const moved = Object.entries(targets).filter(([id, v]) => v.page !== page && !seen.has(id)).map(([id, v]) => { seen.add(id); return `<a class="s8-moved" id="${esc(id)}" data-s8-moved href="${url(v.page)}#${esc(v.target)}">Continue to the relocated explanation or question</a>`; }).join('');
  return `<main class="s8-classroom" data-s8-classroom data-mode="reading" data-prev-page="${page > 42 ? url(page - 1) + '#last-material' : ''}" data-next-page="${page < 47 ? url(page + 1) : ''}">
  <header class="s8-titlebar"><div><a href="../section-8/" class="s8-back">Databases · Chapter contents</a><h1>${esc(journey.title)}</h1></div></header><p class="s8-intro">${esc(journey.intro)}</p>
  <div class="s8-toolbar"><details class="s8-directory" id="lesson-contents"><summary>Chapter contents</summary><ol>${directory}</ol></details><span class="s8-position" data-s8-position role="status" aria-live="polite" hidden></span><button type="button" data-s8-open-dbms data-panel="data">Library DBMS</button><div class="s8-mode-switch" aria-label="Reading mode" hidden><button type="button" data-s8-mode="classroom">Classroom</button><button type="button" data-s8-mode="reading">Full reading</button></div></div>
  ${anchor('classroom-unit')}<div id="visual-and-core">${body}${boundary}</div>
  <nav class="s8-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s8-prev>Previous</button><button type="button" data-s8-hide>Hide answers</button><button type="button" data-s8-next>Next</button></nav>
  <div class="s8-print-controls" hidden><button type="button" data-s8-print="questions">Print practice and exam questions</button><button type="button" data-s8-print="answers">Print with answers</button></div>
  <details class="s8-reference" id="practice"><summary>Teacher-written practice</summary>${[...lesson.practice, ...lesson.optionalPractice].map((q, i) => anchor(q.id) + helpers.renderPractice(q, i, 8)).join('')}</details>
  <details class="s8-reference" id="summary"><summary>Learning objectives and chapter outline</summary><ul>${lesson.objectives.map(([, description]) => `<li>${esc(description)}</li>`).join('')}</ul><ol>${directory}</ol><p>The eleven subsection numbers organise this course. Teaching explanations and diagrams are teacher-written; original questions and official schemes are labelled separately.</p></details>
  ${moved ? `<details class="s8-reference"><summary>Previous bookmarks</summary>${moved}</details>` : ''}<noscript><p>The complete reading view, SQL and worked results remain available without JavaScript. Enable JavaScript and use HTTP to operate the Library DBMS.</p></noscript>${renderDbmsWorkbench({ panel: 'data' })}
  </main><footer><p>Cambridge AS Computer Science 9618 · Databases</p></footer>`;
}

export function renderSection8Overview() {
  const stages = [['8.1', 'Database concepts', [42, 43], 43], ['8.2', 'Database Management Systems', [44], 44], ['8.3', 'DDL and DML', [45, 46, 47], 47]];
  return `<main class="s8-overview"><header><p class="s8-eyebrow">Section 8 · Cambridge AS Computer Science</p><h1>Databases</h1><p>Study database concepts, database management systems, and DDL and DML using a library database.</p><a class="s8-start" href="${url(42)}#s8-1-1">Start 8.1.1</a></header><nav aria-label="Chapter contents">${stages.map(([number, title, pages, end]) => `<section class="s8-stage-outline"><h2>${number} · ${title}</h2><ol class="s8-outline">${pages.flatMap(page => section8Journey[page].groups.map(g => `<li><a href="${url(page)}#${g.id}"><span>${g.number}</span><strong>${esc(g.title)}</strong></a></li>`)).join('')}<li class="s8-exam-link"><a href="${url(end)}#${section8Checkpoints[end].id}"><strong>End-of-topic past-paper questions</strong></a></li></ol></section>`).join('')}</nav><aside class="s8-overview-modes"><h2>Using this chapter</h2><p><strong>Classroom</strong> shows one teaching material or question at a time. <strong>Full reading</strong> presents the same complete content. Hints, answers and official schemes open separately.</p><p>The Library DBMS runs real SQL locally in your browser. It keeps one chapter workspace across lessons when browser storage is available. Open the Library DBMS to execute and modify the example SQL statements.</p><p>Each topic includes worked examples and practice questions. Past-paper questions follow each of the three sections.</p></aside></main><footer><p>Cambridge AS Computer Science 9618 · Section 8</p></footer>`;
}
