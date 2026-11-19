import { section6Journey, section6Route } from './course-v3-section6-journey.mjs';
import { section6ExtraPapers } from './course-v3-section6-extra-papers.mjs';
import { renderPastPaperQuestion } from './course-v3-past-paper-render.mjs';
import { escapeGuidedHtml as esc } from './course-v3-section5-classroom.mjs';

const ids = (r, ...ns) => ns.map(n => `S6.${String(r).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
export const section6PaperObjectives = {
  E045: ids(1, 1), E046: ids(3, 4), E047: ids(4, 2, 4), E048: ids(6, 1),
  E049: ids(8, 1, 3, 4), E050: ids(8, 3, 4),
  ...Object.fromEntries(section6ExtraPapers.map(p => [p.id, p.objectiveIds])),
};
export const section6PaperCoverageNotes = {
  E045: 'Definitions of privacy and integrity; security needs a separate explanation.',
  E046: 'Explicitly excludes authentication. Tests another measure and how it protects the server; the taught response is a firewall.',
  E047: 'Describes phishing and spyware, with two marks available for each.',
  E048: 'Names and explains protection during transmission. The taught response is encryption.',
  E049: 'Classifies entry and transfer verification; the grouped marking rule is not one mark per line.',
  E050: 'Names and explains two transmission verification methods; this does not assess every possible method.',
  ...Object.fromEntries(section6ExtraPapers.map(p => [p.id, [...(p.assessmentFocus ?? []), ...(p.coverageNotes ?? [])].join(' ')])),
};
const additional = { 33: [], 34: ['E046'], 35: ['E047'], 36: ['E048'], 37: ['E050'] };
const lessonUrl = page => `../lesson-${String(page).padStart(3, '0')}/`;
const anchor = id => `<span class="s6-anchor" id="${esc(id)}"></span>`;

export function section6GroupObjectives(group, lesson) {
  const owned = new Set(lesson.objectives.map(([id]) => id));
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown S6 unit ${key}`);
  for (const id of group.objectiveIds) if (!owned.has(id)) throw new Error(`Unknown S6 objective ${id}`);
  return [...new Set(group.objectiveIds)];
}

export function section6PapersForLesson(lesson, paperPool) {
  const selected = [...section6Route(lesson.sequenceIndex).flatMap(g => g.papers ?? []), ...additional[lesson.sequenceIndex]];
  const pool = [...paperPool, ...section6ExtraPapers];
  return [...new Set(selected)].map(id => {
    const paper = pool.find(p => p.id === id);
    if (!paper) throw new Error(`Missing S6 question ${id}`);
    return { ...paper, objectiveIds: section6PaperObjectives[id] };
  });
}

export function renderSection6Classroom(lesson, helpers) {
  const page = lesson.sequenceIndex, journey = section6Journey[page], route = section6Route(page);
  const seen = new Set(route.flatMap(g => [g.id, ...(g.materials ?? []).map(m => m.id)]));
  const alias = id => { if (seen.has(id)) return ''; seen.add(id); return anchor(id); };
  const label = group => `${group.number ? group.number + ' · ' : ''}${group.title}`;
  const contents = route.map(group => `<li><a href="#${group.id}">${esc(label(group))}</a></li>`).join('');
  const question = (id, index) => {
    const paper = lesson.pastPaperQuestions.find(p => p.id === id);
    if (!paper) throw new Error(`Missing published S6 question ${id}`);
    return alias(id) + renderPastPaperQuestion(paper, index, { ...lesson, separateExamGuidance: true, collapsibleQuestion: true });
  };
  const groups = route.map(group => {
    const checkpoint = Boolean(group.checkpoint);
    const cards = checkpoint ? [{ id: `${group.id}-start`, title: group.title,
      html: `<div class="s6-boundary-intro"><p class="s6-eyebrow">Pause · retrieve · apply</p><h3>${group.id.includes('security') ? 'Data Security complete' : 'Data Integrity complete'}</h3><p>Use what you have learned to answer ${group.papers.length} original question groups. Read each command word and mark allocation. Keep the solutions and official mark schemes closed until you have attempted the questions.</p><p class="s6-checkpoint-total">${group.papers.reduce((n, id) => n + lesson.pastPaperQuestions.find(p => p.id === id).marks, 0)} marks</p></div>` },
      ...group.papers.map((id, i) => ({ id: `attempt-${id.toLowerCase()}`, title: lesson.pastPaperQuestions.find(p => p.id === id).title, html: question(id, i) }))] : group.materials;
    return `<article class="s6-group${checkpoint ? ' s6-boundary' : ''}" data-s6-topic id="${group.id}" data-label="${esc(label(group))}"><header class="s6-group-heading">${group.number ? `<p class="s6-eyebrow">${group.number}</p>` : ''}<h2 tabindex="-1">${esc(group.title)}</h2></header>${cards.map(card => {
      const oldUnit = lesson.units.findIndex(unit => unit.unitKey === card.unitKey);
      const objectives = card.objectiveIds ?? [];
      const aliases = [...(card.aliases ?? []), ...(oldUnit >= 0 ? [`unit-${oldUnit + 1}`, lesson.units[oldUnit].syllabusId] : []), ...objectives];
      return `<section class="s6-material" id="${esc(card.id)}" data-s6-card data-label="${esc(card.title)}" data-objectives="${objectives.join(' ')}">${aliases.map(alias).join('')}${checkpoint ? '' : `<header class="s6-card-heading"><h3 tabindex="-1">${esc(card.title)}</h3></header>`}${card.html}</section>`;
    }).join('')}</article>`;
  }).join('');
  const moved = page === 33 ? ['e045', 'E045'].map(id => `<a class="s6-moved" id="${id}" data-s6-moved href="${lessonUrl(36)}#e045">Continue to this question in the Data Security checkpoint →</a>`).join('') : '';
  const papersEntry = page === 33 ? `<a id="past-paper-questions" class="s6-moved" data-s6-moved href="${lessonUrl(36)}#s6-security-checkpoint">Open the Data Security checkpoint →</a>` : alias('past-paper-questions');
  return `<main class="s6-classroom" data-s6-classroom data-mode="reading" data-prev-page="${page > 33 ? lessonUrl(page - 1) + '#last-material' : ''}" data-next-page="${page < 37 ? lessonUrl(page + 1) : ''}">
    <header class="s6-titlebar"><div><a href="../section-6/" class="s6-back">← Security, privacy and data integrity</a><h1>${esc(journey.title)}</h1></div></header>
    <div class="s6-toolbar"><details class="s6-directory" id="lesson-contents"><summary>Lesson contents</summary><ol>${contents}</ol></details><span class="s6-position" data-s6-position role="status" aria-live="polite" hidden></span><div class="s6-mode-switch" aria-label="Reading mode" hidden><button type="button" data-s6-mode="classroom">Classroom</button><button type="button" data-s6-mode="reading">Full reading</button></div></div>
    ${alias('classroom-unit')}<div id="visual-and-core">${groups}</div>
    <nav class="s6-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s6-prev>← Previous</button><button type="button" data-s6-hide>Hide answers</button><button type="button" data-s6-next>Next →</button></nav>
    <div class="s6-print-controls" hidden><button type="button" data-s6-print="questions">Print Practice and exam questions</button><button type="button" data-s6-print="answers">Print with answers</button></div>
    ${papersEntry}${alias('original-exam-style-question')}<details class="s6-reference" id="additional-papers"><summary>Additional past-paper practice</summary>${additional[page].length ? additional[page].map(question).join('') : `<p>Complete the <a href="${lessonUrl(36)}#s6-security-checkpoint">Data Security checkpoint</a> after 6.1.6.</p>`}</details>
    <details class="s6-reference" id="practice"><summary>Teacher-written practice</summary>${[...lesson.practice, ...lesson.optionalPractice].map((q, i) => alias(q.id) + helpers.renderPractice(q, i, 6)).join('')}</details>
    <details class="s6-reference" id="summary"><summary>Lesson outline and scope</summary><ol>${contents}</ol><p>Cambridge 9618 · 2027–2029 syllabus, Version 3 · Section 6. Teaching diagrams and explanations are teacher-written; official questions and schemes are labelled separately.</p></details>${moved}${helpers.navigation ?? ''}</main><footer><p>Cambridge AS Computer Science 9618 · Section 6</p></footer>`;
}

export function renderSection6Overview(lessons) {
  return `<main class="s6-overview"><header><p class="s6-eyebrow">Section 6 · Cambridge AS Computer Science</p><h1>Security, privacy and data integrity</h1><p>Protect systems and their data. Then examine how checks help preserve accurate records.</p></header><nav aria-label="Chapter contents">${[['6.1', 'Data Security', [33, 34, 35, 36]], ['6.2', 'Data Integrity', [37]]].map(([number, title, pages]) => `<section class="s6-outline"><h2>${number} · ${title}</h2><ul>${pages.flatMap(page => section6Route(page).map(group => `<li${group.checkpoint ? ' class="s6-exam-link"' : ''}><a href="../${lessons.find(l => l.sequenceIndex === page).route}/#${group.id}">${group.number ? `<span>${group.number}</span>` : ''}${esc(group.title)}</a></li>`)).join('')}</ul></section>`).join('')}</nav></main><footer><p>Cambridge AS Computer Science 9618 · Section 6</p></footer>`;
}
