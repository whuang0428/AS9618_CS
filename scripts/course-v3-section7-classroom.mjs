import { section7Journey, section7LegacyGroups, section7PaperObjectives } from './course-v3-section7-journey.mjs';
import { section7PaperPool } from './course-v3-section7-paper-selections.mjs';
import { renderPastPaperQuestion } from './course-v3-past-paper-render.mjs';
import { escapeGuidedHtml as esc } from './course-v3-section5-classroom.mjs';

const lessonUrl = page => `../lesson-${String(page).padStart(3, '0')}/`;
const anchor = id => `<span class="s7-anchor" id="${esc(id)}"></span>`;
const label = group => `${group.number} · ${group.title}`;

export function section7GroupObjectives(group, lesson) {
  const owned = new Set(lesson.objectives.map(([id]) => id));
  if (!group.objectiveIds.length) throw new Error(`Missing S7 objectives for ${group.id}`);
  for (const key of group.unitKeys) if (!lesson.units.some(unit => unit.unitKey === key)) throw new Error(`Unknown S7 unit ${key}`);
  for (const id of group.objectiveIds) if (!owned.has(id)) throw new Error(`Unknown S7 objective ${id} on ${lesson.route}`);
  return [...new Set(group.objectiveIds)];
}

export function section7PapersForLesson(lesson, pool = lesson.pastPaperQuestions) {
  const selected = section7Journey[lesson.sequenceIndex].groups.flatMap(group => group.papers);
  if (new Set(selected).size !== selected.length) throw new Error(`Repeated S7 paper on ${lesson.route}`);
  const papers = section7PaperPool(pool);
  return selected.map(id => {
    const paper = papers.find(item => item.id === id);
    if (!paper) throw new Error(`Missing S7 paper ${id}`);
    return { ...paper, objectiveIds: section7PaperObjectives[id] };
  });
}

export function renderSection7Classroom(lesson, helpers) {
  const page = lesson.sequenceIndex, journey = section7Journey[page], groups = journey.groups;
  const materials = groups.flatMap(group => group.materials);
  const seen = new Set([
    ...groups.map(group => group.id), ...materials.map(material => material.id),
    ...lesson.pastPaperQuestions.map(paper => paper.id.toLowerCase()),
    ...materials.flatMap(material => [...(material.html ?? '').matchAll(/\sid="([^"]+)"/g)].map(match => match[1])),
  ]);
  const alias = id => { if (seen.has(id)) return ''; seen.add(id); return anchor(id); };
  const explicitAliases = new Set(materials.flatMap(material => material.aliases ?? []));
  const firstPaper = materials.find(material => material.paperId)?.id;
  const oldAliases = material => Object.entries(section7LegacyGroups[page]).filter(([id, key]) =>
    !explicitAliases.has(id) && materials.find(item => !item.paperId && item.unitKeys.includes(key)) === material,
  ).map(([id]) => id);
  const contents = Object.entries(section7Journey).flatMap(([number, data]) => data.groups.map(group =>
    `<li><a href="${Number(number) === page ? '' : lessonUrl(Number(number))}#${group.id}">${esc(label(group))}</a></li>`,
  )).join('');
  let paperIndex = 0;
  const body = groups.map(group => {
    section7GroupObjectives(group, lesson);
    return `<article class="s7-group" data-s7-topic id="${group.id}" data-label="${esc(label(group))}"><header class="s7-group-heading"><p class="s7-eyebrow">${group.number}</p><h2 tabindex="-1">${esc(group.title)}</h2></header>${group.materials.map(material => {
      const unitAliases = material.unitKeys.flatMap(key => {
        const index = lesson.units.findIndex(unit => unit.unitKey === key);
        return index < 0 ? [] : [`unit-${index + 1}`, lesson.units[index].syllabusId];
      });
      const aliases = [...(material.aliases ?? []), ...oldAliases(material), ...unitAliases, ...material.objectiveIds];
      if (material.id === firstPaper) aliases.push('past-paper-questions', 'original-exam-style-question');
      let html = material.html ?? '';
      if (material.paperId) {
        const paper = lesson.pastPaperQuestions.find(item => item.id === material.paperId);
        if (!paper) throw new Error(`Missing published S7 question ${material.paperId}`);
        aliases.push(paper.id);
        if (paper.id === 'E054A') aliases.push('E054', 'e054');
        if (paper.id === 'E7D03C') aliases.push('E7D03', 'e7d03');
        html += renderPastPaperQuestion(paper, paperIndex++, { ...lesson, separateExamGuidance: true, collapsibleQuestion: true })
          .replaceAll('loading="lazy"', 'loading="eager"');
        if (paper.id === 'E7D03C') html += `<p class="s7-related-paper">The school-network ethics part of this original question is taught in <a href="${lessonUrl(39)}#e7d03b">7.1.2 · Q8(b)</a>.</p>`;
        if (paper.id === 'E054A') html += '<p class="s7-related-paper">The copyright part of this original question is taught in <a href="#e054b">7.1.3 · Q5(b)(ii)</a>.</p>';
      }
      if (!html) throw new Error(`Empty S7 material ${material.id}`);
      return `<section class="s7-material${material.paperId ? ' s7-paper-material' : ''}" id="${esc(material.id)}" data-s7-card data-label="${esc(material.title)}" data-objectives="${material.objectiveIds.join(' ')}" data-unit-keys="${material.unitKeys.join(' ')}">${aliases.map(alias).join('')}<header class="s7-card-heading"><h3 tabindex="-1">${esc(material.title)}</h3></header>${html}</section>`;
    }).join('')}</article>`;
  }).join('');
  return `<main class="s7-classroom" data-s7-classroom data-mode="reading" data-prev-page="${page > 38 ? lessonUrl(page - 1) + '#last-material' : ''}" data-next-page="${page < 41 ? lessonUrl(page + 1) : ''}">
    <header class="s7-titlebar"><div><a href="../section-7/" class="s7-back">← Ethics and ownership</a><h1>${esc(journey.title)}</h1></div></header>
    <p class="s7-intro">${esc(journey.intro)}</p>
    <div class="s7-toolbar"><details class="s7-directory" id="lesson-contents"><summary>Chapter contents</summary><ol>${contents}</ol></details><span class="s7-position" data-s7-position role="status" aria-live="polite" hidden></span><div class="s7-mode-switch" aria-label="Reading mode" hidden><button type="button" data-s7-mode="classroom">Classroom</button><button type="button" data-s7-mode="reading">Full reading</button></div></div>
    ${alias('classroom-unit')}<div id="visual-and-core">${body}</div>
    <nav class="s7-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s7-prev>← Previous</button><button type="button" data-s7-hide>Hide answers</button><button type="button" data-s7-next>Next →</button></nav>
    <div class="s7-print-controls" hidden><button type="button" data-s7-print="questions">Print Practice and exam questions</button><button type="button" data-s7-print="answers">Print with answers</button></div>
    <details class="s7-reference" id="practice"><summary>Teacher-written practice</summary>${[...lesson.practice, ...lesson.optionalPractice].map((question, index) => alias(question.id) + helpers.renderPractice(question, index, 7)).join('')}</details>
    <details class="s7-reference" id="summary"><summary>Learning goals and chapter outline</summary><ul>${lesson.objectives.map(([, text]) => `<li>${esc(text)}</li>`).join('')}</ul><ol>${contents}</ol><p>Cambridge 9618 · 2027–2029 syllabus, Version 3 · Section 7. The five subsection numbers organise this course. Teaching diagrams and explanations are teacher-written; official questions and mark schemes are labelled separately.</p></details>
    <noscript><p>The full reading view is available without JavaScript. Enable JavaScript for classroom navigation, enlargement and optional experiments.</p></noscript>${helpers.navigation ?? ''}
  </main><footer><p>Cambridge AS Computer Science 9618 · Ethics and ownership</p></footer>`;
}

export function renderSection7Overview(lessons) {
  return `<main class="s7-overview"><header><p class="s7-eyebrow">Section 7 · Cambridge AS Computer Science</p><h1>Ethics and Ownership</h1><p>Understand professional responsibilities, software ownership and the effects of AI. Start with the diagrams, then connect each explanation to the relevant original question and mark scheme.</p></header><nav aria-label="Chapter contents"><ol class="s7-outline">${lessons.flatMap(lesson => section7Journey[lesson.sequenceIndex].groups.map(group => `<li><a href="../${lesson.route}/#${group.id}"><span>${group.number}</span><strong>${esc(group.title)}</strong></a><p>${esc(group.number === '7.1.3' ? 'Why software ownership needs legal protection.' : group.number === '7.1.4' ? 'Four software diagrams, a comparison table and choices justified from licence terms.' : section7Journey[lesson.sequenceIndex].intro)}</p></li>`)).join('')}</ol></nav><aside class="s7-overview-modes"><h2>Choose how to read</h2><p><strong>Classroom</strong> presents one diagram, table, explanation or question at a time and continues across lesson pages. <strong>Full reading</strong> keeps the same complete content together. Answers and official schemes open separately.</p><a class="s7-start" href="../${lessons[0].route}/#s7-1-1">Start 7.1.1 →</a></aside></main><footer><p>Cambridge AS Computer Science 9618 · Section 7</p></footer>`;
}
