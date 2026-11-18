import { section4Journey, section4LegacyPaperGroups, section4MovedBookmarks, section4PaperObjectives, section4Route } from './course-v3-section4-journey.mjs';
import { section4ExtraPapers } from './course-v3-section4-extra-papers.mjs';
import { renderPastPaperQuestion } from './course-v3-past-paper-render.mjs';
import labs from './course-v3-section4-labs.js';

const esc = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const pageLink = sequence => `../lesson-${String(sequence).padStart(3, '0')}/`;
const label = item => item.number ? `${item.number} · ${item.title}` :
  item.kind === 'checkpoint' ? `Past paper · ${item.title}` : item.title;
const anchor = id => `<span class="s4-anchor" id="${esc(id)}"></span>`;

export function section4PapersForLesson(lesson, pool = lesson.pastPaperQuestions) {
  const paperIds = section4Route(lesson.sequenceIndex).flatMap(item => item.papers ?? []);
  if (lesson.sequenceIndex === 27) paperIds.push('E4D03');
  return paperIds.map(id => {
    const paper = [...pool, ...section4ExtraPapers].find(candidate => candidate.id === id);
    if (!paper || !section4PaperObjectives[id]) throw new Error(`Missing Section 4 paper or mapping: ${id}`);
    return { ...paper, objectiveIds: section4PaperObjectives[id] };
  });
}

function tableMarkup(material) {
  const photos = material.socketPhotos
    ? `<tr><th scope="row">Socket appearance</th>${material.socketPhotos.map(photo => `<td><img class="s4-socket-thumbnail" src="../..${esc(photo.asset)}" alt="${esc(photo.alt)}" decoding="async"></td>`).join('')}</tr>`
    : '';
  return `<div class="s4-table-scroll" role="region" aria-label="${esc(material.title)}" tabindex="0"><table><thead><tr>${material.headers.map(cell => `<th scope="col">${esc(cell)}</th>`).join('')}</tr></thead><tbody>${photos}${material.rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${esc(cell)}</td>` : `<th scope="row">${esc(cell)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

function materialMarkup(material, heading = 'h3') {
  const { type, title, caption, body, code, sources } = material;
  let visual = '';
  if (type === 'figure' || type === 'diagram') {
    const picture = type === 'figure' ? `<img src="../..${esc(material.asset)}" alt="${esc(material.alt)}" decoding="async">` : material.svg;
    const marks = material.annotations ?? [];
    const annotated = marks.length ? `<div class="s4-photo">${picture}${marks.map((mark, i) =>
      `<span aria-hidden="true" style="left:${Number(mark.x)}%;top:${Number(mark.y)}%">${i + 1}</span>`).join('')}</div>` : picture;
    const key = marks.length ? `<ol class="s4-photo-key">${marks.map(mark =>
      `<li><strong>${esc(mark.label)}.</strong> ${esc(mark.detail)}</li>`).join('')}</ol>` : '';
    visual = `<figure class="s4-figure"><div class="s4-illustration" tabindex="0" role="region" aria-label="${esc(title)}">${annotated}</div>${caption || key ? `<figcaption>${esc(caption)}${key}</figcaption>` : ''}</figure>`;
  } else if (type === 'table') visual = tableMarkup(material);
  else if (type === 'lab') {
    const config = material.config ?? {};
    const markup = labs.initialMarkup(material.lab, config, material.controls);
    if (!markup) throw new Error(`Unknown Section 4 animation: ${material.lab}`);
    visual = `<div class="s4-lab" data-s4-lab="${esc(material.lab)}" data-s4-config="${esc(JSON.stringify(config))}"${material.controls ? ` data-s4-controls="${esc(JSON.stringify(material.controls))}"` : ''}>${markup}</div>`;
  } else if (type !== 'text') throw new Error(`Unsupported Section 4 material: ${type}`);
  const references = sources?.length ? `<p class="s4-sources">${sources.map(s => `<a href="${esc(s.url)}">${esc(s.label)}</a>`).join(' · ')}</p>` : '';
  return `<${heading} tabindex="-1">${esc(title)}</${heading}>${visual}${body ? `<p class="s4-body">${esc(body)}</p>` : ''}${code ? `<pre class="s4-code" tabindex="0"><code>${esc(code)}</code></pre>` : ''}${references}`;
}

function paperMarkup(lesson, id, index) {
  const paper = lesson.pastPaperQuestions.find(p => p.id === id);
  if (!paper) throw new Error(`Missing published ${id} on ${lesson.route}`);
  const formerGroup = section4LegacyPaperGroups[id];
  return (formerGroup ? anchor(formerGroup + '--papers') : '') +
    renderPastPaperQuestion(paper, index, lesson).replaceAll('loading="lazy"', 'loading="eager"');
}

function renderGroup(item, lesson, firstPaperGroup) {
  const review = item.kind === 'review';
  const aliases = [...(item.aliases ?? [])];
  if (item.id === firstPaperGroup) aliases.push('past-paper-questions', 'original-exam-style-question');
  const cards = [];
  if (review) {
    cards.push({ title: 'One instruction boundary', html: '<h3 tabindex="-1">Where does one cycle finish?</h3><ol class="s4-review-steps"><li><strong>Fetch.</strong> Copy the next instruction address to MAR. Advance PC and fetch the instruction through MDR into CIR.</li><li><strong>Decode.</strong> CU interprets the opcode and operand in CIR.</li><li><strong>Execute.</strong> For ADD 5, read address 5, add its value to ACC and retain the result. For STO 6, send that result to memory.</li><li><strong>At the boundary.</strong> Check for a pending interrupt before fetching the next instruction.</li></ol>' });
  }
  if (item.papers) {
    item.papers.forEach((id, index) => {
      const paper = lesson.pastPaperQuestions.find(p => p.id === id);
      cards.push({ title: paper.title, html: paperMarkup(lesson, id, index) });
    });
  } else item.materials.forEach(material => {
    const companion = material.companion ? materialMarkup(material.companion, 'h4') : '';
    cards.push({ title: material.title, html: materialMarkup(material) + companion });
  });
  const marks = item.papers?.reduce((sum, id) => sum + lesson.pastPaperQuestions.find(q => q.id === id).marks, 0);
  const kicker = item.number ?? (review ? 'Cycle review' : `Past-paper checkpoint · ${item.papers.length} parts · ${marks} marks`);
  return `<article class="s4-group${item.kind ? ' s4-boundary' : ''}" id="${item.id}" data-s4-group${item.kind ? ` data-s4-kind="${item.kind}"` : ''} data-label="${esc(label(item))}">${aliases.map(anchor).join('')}<header class="s4-group-heading"><p class="s4-eyebrow">${esc(kicker)}</p><h2 tabindex="-1">${esc(item.title)}</h2></header>${cards.map((card, i) => `<section class="s4-phase" id="${item.id}--${i + 1}" data-s4-card data-label="${esc(card.title)}">${card.html}</section>`).join('')}</article>`;
}

export function renderSection4Classroom(lesson, helpers) {
  const page = lesson.sequenceIndex, topic = section4Journey[page], route = section4Route(page);
  const links = route.map(item => `<li><a href="#${item.id}">${esc(label(item))}</a></li>`).join('');
  const moved = Object.entries(section4MovedBookmarks[page] ?? {}).map(([id, url]) =>
    `<a class="s4-moved" id="${id}" href="${url}" data-s4-moved>Continue to ${id === 'e035' || page === 25 ? 'the assembly checkpoint' : 'system buses'} →</a>`
  ).join('');
  const practice = [...lesson.practice, ...lesson.optionalPractice];
  const extraPaper = page === 27 ? `<details class="s4-reference"><summary>Additional past-paper question · Logical shifts</summary><div class="s4-phase">${paperMarkup(lesson, 'E4D03', 0)}</div></details>` : '';
  const firstPaperGroup = route.find(item => item.papers)?.id;
  return `<main class="s4-classroom" data-s4-classroom data-mode="reading" data-prev-page="${page > 21 ? pageLink(page - 1) + '#s4-last' : ''}" data-next-page="${page < 27 ? pageLink(page + 1) : ''}">
    <header class="s4-titlebar"><div><a class="s4-back" href="../section-4/">← Processor fundamentals</a><h1>${esc(topic.title)}</h1></div><div class="s4-mode-switch" aria-label="Reading mode" hidden><button type="button" data-s4-mode="classroom">Classroom</button><button type="button" data-s4-mode="reading">Full reading</button></div></header>
    <div class="s4-toolbar"><details class="s4-directory" id="lesson-contents"><summary>Lesson contents</summary><ol>${links}</ol></details><span data-s4-position role="status" aria-live="polite" hidden></span></div>
    <div id="visual-and-core" class="s4-content">${route.map(item => renderGroup(item, lesson, firstPaperGroup)).join('')}</div>
    <nav class="s4-navigation" aria-label="Teaching navigation" hidden><button type="button" data-s4-prev>← Previous</button><button type="button" data-s4-next>Next →</button></nav>
    <details class="s4-reference" id="practice"><summary>Additional teacher-written practice</summary>${practice.map((q, index) => helpers.renderPractice(q, index, 4)).join('')}</details>
    ${extraPaper}<details class="s4-reference" id="summary"><summary>Lesson outline</summary><ol>${links}</ol></details>${moved}${helpers.navigation}</main><footer><p>Cambridge AS Computer Science 9618 · Processor fundamentals</p></footer>`;
}

export function renderSection4Overview(lessons) {
  return `<main class="s4-overview"><header><p class="s4-eyebrow">Section 4 · Cambridge AS Computer Science</p><h1>Processor fundamentals</h1><p>Follow an instruction from its place in memory to its result. Then write, translate and trace the program that controls the machine.</p><a class="s4-start" href="${pageLink(21)}">Begin with CPU architecture →</a></header><nav aria-label="Chapter contents">${lessons.map(lesson => {
    const page = lesson.sequenceIndex;
    return `<section class="s4-outline"><header><p class="s4-eyebrow">Lesson ${String(page).padStart(3, '0')}</p><h2><a href="${pageLink(page)}">${esc(section4Journey[page].title)}</a></h2></header><ol>${section4Route(page).map(item => `<li${item.kind ? ' class="s4-outline-check"' : ''}><a href="${pageLink(page)}#${item.id}">${item.number ? `<span>${item.number}</span> ` : ''}${item.kind === 'checkpoint' ? 'Past paper · ' : ''}${esc(item.title)}</a></li>`).join('')}</ol></section>`;
  }).join('')}</nav></main><footer><p>Cambridge AS Computer Science 9618 · Section 4</p></footer>`;
}
