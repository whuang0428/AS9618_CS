import { section5Journey, section5Checkpoint, section5Route, movedBookmarks, oldPaperStages, section5PaperObjectives } from './course-v3-section5-journey.mjs';
import { renderPastPaperQuestion } from './course-v3-past-paper-render.mjs';
import { section5ExtraPapers } from './course-v3-section5-extra-papers.mjs';

export { section5PaperObjectives };
const esc = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const assetUrl = path => path.startsWith('/') ? `../..${path}` : path;

// Other chapters import these presentation helpers.
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
  const ids = [...new Set(section5Route(lesson.sequenceIndex).flatMap(paperIdsForGroup))];
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

const lessonUrl = page => `../lesson-${String(page).padStart(3, '0')}/`;
const anchor = id => `<span class="s5-anchor" id="${esc(id)}"></span>`;
const sectionLabel = group => group.number ? `${group.number} · ${group.title}` : group.title;
const paperEntryAnchors = () => anchor('past-paper-questions') + anchor('original-exam-style-question');

function questionHtml(id, index, lesson, checkpoint = false) {
  const paper = lesson.pastPaperQuestions.find(q => q.id === id);
  if (!paper) throw new Error(`Missing published ${id} on ${lesson.route}`);
  const oldAnchors = Object.entries(oldPaperStages).filter(([, ref]) => ref === id.toLowerCase()).map(([old]) => anchor(old)).join('');
  return oldAnchors + renderPastPaperQuestion(paper, index, {
    ...lesson, separateExamGuidance: true, collapsibleQuestion: checkpoint,
  });
}

function renderGroup(group, lesson) {
  const checkpoint = group === section5Checkpoint;
  const cards = checkpoint ? group.papers.map((id, i) => ({
    id: 'attempt-' + id.toLowerCase(), title: lesson.pastPaperQuestions.find(p => p.id === id).title,
    html: questionHtml(id, i, lesson, true),
  })) : group.materials;
  const intro = checkpoint ? '<p>Attempt all three original questions before opening the solutions or mark schemes.</p>' : '';
  return `<article class="s5-group${checkpoint ? ' s5-boundary' : ''}" data-s5-topic id="${group.id}" data-label="${esc(sectionLabel(group))}">${checkpoint ? paperEntryAnchors() : ''}
    <header class="s5-group-heading">${group.number ? `<p class="s5-eyebrow">${group.number}</p>` : ''}<h2 tabindex="-1">${esc(group.title)}</h2>${intro}</header>
    ${cards.map(card => `<section class="s5-material" id="${esc(card.id)}" data-s5-card data-label="${esc(card.title)}"${card.objectiveIds ? ` data-objectives="${card.objectiveIds.join(' ')}"` : ''}>
    ${(card.aliases ?? []).map(anchor).join('')}${checkpoint ? '' : `<header class="s5-card-heading"><h3 tabindex="-1">${esc(card.title)}</h3></header>`}${card.html}</section>`).join('')}</article>`;
}

export function renderSection5Classroom(lesson, helpers) {
  const page = lesson.sequenceIndex, journey = section5Journey[page], route = section5Route(page);
  const links = route.map(group => `<li><a href="#${group.id}">${esc(sectionLabel(group))}</a></li>`).join('');
  const exercises = [...lesson.practice, ...lesson.optionalPractice];
  const optionalPapers = journey.groups.flatMap(paperIdsForGroup);
  const moved = Object.entries(movedBookmarks[page] ?? {}).map(([id, url]) =>
    `<a class="s5-moved" id="${id}" href="${url}" data-s5-moved>Continue to the relocated past-paper question →</a>`).join('');
  return `<main class="s5-classroom s5-pages" data-s5-classroom data-mode="reading" data-prev-page="${page > 28 ? lessonUrl(page - 1) + '#last-material' : ''}" data-next-page="${page < 32 ? lessonUrl(page + 1) : ''}">
    <header class="s5-titlebar"><div><a class="s5-back" href="../section-5/">← System software</a><h1>${esc(journey.title)}</h1></div>
    <div class="s5-mode-switch" aria-label="Reading mode" hidden><button type="button" data-s5-mode="classroom">Classroom</button><button type="button" data-s5-mode="reading">Full reading</button></div></header>
    <div class="s5-toolbar"><details class="s5-directory" id="lesson-contents"><summary>Lesson contents</summary><ol>${links}</ol></details><span class="s5-position" data-s5-position role="status" aria-live="polite" hidden></span></div>
    <div id="visual-and-core">${route.map(group => renderGroup(group, lesson)).join('')}</div>
    <nav class="s5-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s5-prev>← Previous</button><button type="button" data-s5-hide>Hide answers</button><button type="button" data-s5-next>Next →</button></nav>
    <details class="s5-reference" id="additional-papers"><summary>Additional past-paper practice</summary>${page === 29 ? '' : paperEntryAnchors()}${optionalPapers.map((id, i) => questionHtml(id, i, lesson)).join('')}</details>
    <details class="s5-reference" id="practice"><summary>Teacher-written practice</summary>${exercises.map((q, index) => helpers.renderPractice(q, index, 5)).join('')}</details>
    <details class="s5-reference" id="summary"><summary>Lesson outline</summary><ol>${links}</ol></details>${moved}${helpers.navigation ?? ''}</main><footer><p>Cambridge AS Computer Science 9618 · System software</p></footer>`;
}

export function renderSection5Overview(lessons) {
  const sections = [
    ['5.1', 'Operating systems', 'Follow the work shared by applications, the tools that maintain a system and the code developers reuse.', [28, 29]],
    ['5.2', 'Language translators', 'Build and run a program, choose a translation route and trace an error in an IDE.', [30, 31, 32]],
  ];
  const byPage = new Map(lessons.map(lesson => [lesson.sequenceIndex, lesson.route]));
  return `<main class="s5-overview s5-index"><header><p class="s5-eyebrow">Section 5 · Cambridge AS Computer Science</p><h1>System software</h1></header>
  <nav aria-label="Chapter contents">${sections.map(([number, title, intro, pages]) => `<section class="s5-outline"><h2>${number} · ${title}</h2><p>${intro}</p><ul>${pages.flatMap(page => section5Route(page).map(group => `<li${group === section5Checkpoint ? ' class="s5-exam-link"' : ''}><a href="../${byPage.get(page)}/#${group.id}">${group.number ? `<span>${group.number}</span> ` : ''}${esc(group.title)}</a></li>`)).join('')}</ul></section>`).join('')}</nav></main><footer><p>Cambridge AS Computer Science 9618 · Section 5</p></footer>`;
}
