import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = join(root, "web", "course-v3");
const reviewedAssetRoot = join(root, "web");
const sourceCss = readFileSync(join(root, "web", "course-v3", "section-2", "course.css"), "utf8");
const sourceJs = readFileSync(join(root, "web", "course-v3", "section-2", "course.js"), "utf8");

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const write = (path, contents) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, contents); };
const objectiveBadges = (ids) => ids.map((id) => `<span class="objective-badge">${escapeHtml(id)}</span>`).join("");
const assetSource = (asset, section) => asset.startsWith("/") ? asset : `/assets/course-v3/section-${section}/${asset}`;

function renderTable(material) {
  const rows = material.rows.length ? material.rows : [["Read the exact explanation", "This topic is taught through the adjacent definition, worked example and practice rather than an invented comparison."]];
  return `<section class="teaching-material material-table" data-material-type="table" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4><div class="table-scroll" role="region" aria-label="${escapeHtml(material.title)}" tabindex="0"><table>
      <thead><tr>${material.headers.map((cell) => `<th scope="col">${escapeHtml(cell)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table></div><p class="swipe-cue" aria-hidden="true">Swipe horizontally to compare every column →</p></section>`;
}

function renderCards(material) {
  const items = material.items.length ? material.items : [["Technical explanation", "Use the adjacent default-visible explanation and complete worked example."]];
  return `<section class="teaching-material material-cards" data-material-type="cards" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="concept-grid">${items.map(([heading, body]) => `<article><h5>${escapeHtml(heading)}</h5><p>${escapeHtml(body)}</p></article>`).join("")}</div></section>`;
}

function renderFlow(material) {
  return `<section class="teaching-material material-flow" data-material-type="flow" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><ol class="process-list">${material.steps.map(([heading, body]) => `<li><div><strong>${escapeHtml(heading.replace(/^\d+\s*·\s*/, ""))}</strong><span>${escapeHtml(body)}</span></div></li>`).join("")}</ol></section>`;
}

function renderAnalogy(material, section) {
  return `<figure class="teaching-material material-analogy" data-material-type="analogy" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><img src="${escapeHtml(assetSource(material.asset, section))}" alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(material.caption)}</figcaption><aside class="analogy-boundary"><strong>Analogy boundary</strong><p>${escapeHtml(material.boundary)}</p></aside></figure>`;
}

function renderWorkedExample(material) {
  return `<section class="teaching-material worked-example" data-material-type="worked-example" data-objectives="${material.objectiveIds.join(" ")}"><h4>Worked example · ${escapeHtml(material.title)}</h4><ol class="worked-steps">${material.steps.map(([label, text]) => `<li><strong>${escapeHtml(label)}</strong>${text.includes("\n") ? `<pre><code>${escapeHtml(text)}</code></pre>` : `<p>${escapeHtml(text)}</p>`}</li>`).join("")}</ol></section>`;
}

function renderReviewedVisual(material) {
  return `<figure class="teaching-material reviewed-visual" data-material-type="reviewed-visual" data-objectives="${material.objectiveIds.join(" ")}" data-review-state="approved"><h4>${escapeHtml(material.title)}</h4><div class="visual-scroll"><img src="${escapeHtml(material.asset)}" alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async"></div><figcaption>${escapeHtml(material.review)}</figcaption><div class="figure-facts"><strong>Exact facts represented</strong><ul>${material.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul></div></figure>`;
}

function renderTopologyGallery(material, section) {
  return `<section class="teaching-material topology-gallery" data-material-type="topology-gallery" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="topology-grid">${material.entries.map(([name, asset, alt, steps]) => `<article class="topology-plate"><h5>${escapeHtml(name)}</h5><img src="${escapeHtml(assetSource(asset, section))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"><ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("")}</div><aside class="precision-note"><strong>Technical reading rule</strong><p>The reviewed image establishes the link pattern. The numbered path is authoritative: count each physical segment and name every forwarding device.</p></aside></section>`;
}

function renderReservoir(material, section) {
  return `<figure class="teaching-material material-reservoir" data-material-type="reservoir" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="reservoir-stage"><img src="${escapeHtml(assetSource(material.asset, section))}" alt="A reservoir with an inlet, stored water and an outlet, used only as an analogy for a streaming buffer." loading="lazy" decoding="async"><span class="reservoir-label label-in">arrival rate</span><span class="reservoir-label label-level">buffer level</span><span class="reservoir-label label-out">playback bit rate</span></div><figcaption>Data arriving from the network fills the buffer; playback drains it at the media bit rate.</figcaption><aside class="analogy-boundary"><strong>Critical limit</strong><p>If the long-term arrival rate is lower than the playback bit rate, any finite buffer eventually empties. A larger buffer delays the pause; it cannot repair sustained insufficient input.</p></aside></figure>`;
}

function renderAddressDemo(material) {
  const entries = [["IPv4", "32 bits · four decimal octets", material.ipv4.join("."), "Each octet represents 8 bits and is written from 0 to 255."], ["IPv6", "128 bits · eight hexadecimal groups", material.ipv6.join(":"), "Each full group represents 16 bits; hexadecimal digits compact the notation."]];
  return `<section class="teaching-material address-demo" data-material-type="address-demo" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="address-plates">${entries.map(([label, bits, example, note]) => `<article><header><strong>${label}</strong><span>${bits}</span></header><code>${escapeHtml(example)}</code><p>${note}</p></article>`).join("")}</div></section>`;
}

function renderUrlDemo(material) {
  const parts = [["Scheme", `${material.scheme}://`], ["Domain", material.domain], ["Path", material.path], ["Query", material.query], ["Fragment", material.fragment]];
  return `<section class="teaching-material url-demo" data-material-type="url-demo" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="url-strip" aria-label="URL split into components">${parts.map(([label, value]) => `<span><small>${label}</small><code>${escapeHtml(value)}</code></span>`).join("")}</div><p class="precision-note"><strong>DNS reads the domain:</strong> ${escapeHtml(material.domain)}. The browser, not DNS, uses the remaining URL parts.</p></section>`;
}

function renderMaterial(material, section) {
  if (material.type === "table") return renderTable(material);
  if (material.type === "cards") return renderCards(material);
  if (material.type === "flow") return renderFlow(material);
  if (material.type === "analogy") return renderAnalogy(material, section);
  if (material.type === "worked-example") return renderWorkedExample(material);
  if (material.type === "reviewed-visual") return renderReviewedVisual(material);
  if (material.type === "topology-gallery") return renderTopologyGallery(material, section);
  if (material.type === "reservoir") return renderReservoir(material, section);
  if (material.type === "address-demo") return renderAddressDemo(material);
  if (material.type === "url-demo") return renderUrlDemo(material);
  throw new Error(`Unsupported material type: ${material.type}`);
}

function renderUnit(unit, unitIndex, lesson) {
  return `<article class="knowledge-unit" data-unit-index="${unitIndex + 1}" data-syllabus-id="${escapeHtml(unit.syllabusId)}" data-objectives="${unit.objectiveIds.join(" ")}"><header class="unit-heading"><span class="section-number">${String(unitIndex + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(unit.heading)}</h3><div class="objective-row">${objectiveBadges(unit.objectiveIds)}</div></div></header><div class="explanation-copy">${unit.explanation.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div><div class="materials-stack">${unit.materials.map((material) => renderMaterial(material, lesson.section)).join("")}</div><aside class="misconception"><strong>Common misconception</strong>${unit.misconceptions.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</aside><details class="teacher-note"><summary>教师讲法 / 易错点</summary><p lang="zh-Hans">${escapeHtml(unit.teacherNote)}</p></details></article>`;
}

function renderPractice(question) {
  return `<article class="practice-question" data-question-id="${escapeHtml(question.id)}" data-objectives="${question.objectiveIds.join(" ")}"><header><span>${escapeHtml(question.type)}</span><strong>${question.marks} marks</strong></header><p class="question-prompt">${escapeHtml(question.prompt)}</p><div class="objective-row">${objectiveBadges(question.objectiveIds)}</div><details><summary>Answer and marking points</summary><ol>${question.answerPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol><p class="common-error"><strong>Common error:</strong> ${escapeHtml(question.commonError)}</p></details></article>`;
}

function renderPastPaper(pastPaper) {
  return `<article class="past-paper" data-source-ref="${escapeHtml(pastPaper.sourceRef)}" data-objectives="${pastPaper.objectiveIds.join(" ")}"><div class="paper-source"><div><span>Source index</span><strong>${escapeHtml(pastPaper.sourceRef)}</strong></div><a href="${escapeHtml(pastPaper.accessUrl)}" target="_blank" rel="noreferrer">Official Cambridge access page ↗</a></div><p class="copyright-note">This is an original, structurally equivalent task. It does not reproduce Cambridge question or mark-scheme wording.</p><h3>Original equivalent task</h3><p class="paper-task">${escapeHtml(pastPaper.task)}</p><div class="analysis-columns"><section><h4>Build the answer</h4><ol>${pastPaper.build.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol></section><section><h4>How marks are earned</h4><ul>${pastPaper.markLogic.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section><section><h4>Common losses</h4><ul>${pastPaper.commonLosses.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section></div></article>`;
}

function pageShell({ title, description, body, depth = "lesson" }) {
  const prefix = depth === "root" ? "" : "../";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escapeHtml(description)}"><title>${escapeHtml(title)} · AS 9618</title><link rel="icon" href="data:"><link rel="stylesheet" href="${prefix}course.css?v=20260901g"><script src="${prefix}course.js?v=20260901g" defer></script></head><body>${body}</body></html>`;
}

function renderHeader(currentLesson) {
  const currentSection = currentLesson?.section;
  return `<header class="site-header"><a class="brand" href="../"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Visual course</strong></a><button class="menu-button" aria-expanded="false" aria-controls="lesson-menu">Sections</button><nav id="lesson-menu">${Object.entries(sectionMeta).map(([section, meta]) => `<a ${String(currentSection) === section ? 'aria-current="page"' : ""} href="../section-${section}/">S${section}</a>`).join("")}</nav></header>`;
}

function renderLesson(lesson, index) {
  const previous = courseV3Lessons[index - 1];
  const next = courseV3Lessons[index + 1];
  const navLink = (target, label) => target ? `<a href="../${target.route}/"><span>${label}</span><strong>${escapeHtml(target.lessonKey)} · ${escapeHtml(target.title)}</strong></a>` : `<a href="../"><span>${label}</span><strong>Course overview</strong></a>`;
  return pageShell({ title: `${lesson.lessonKey} ${lesson.title}`, description: lesson.subtitle, body: `${renderHeader(lesson)}<main><section class="lesson-hero"><p class="eyebrow">Lesson ${String(lesson.sequenceIndex).padStart(3, "0")} · ${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h1>${escapeHtml(lesson.title)}</h1><p class="lead">${escapeHtml(lesson.subtitle)}</p></section>
  <section class="lesson-stage stage-guide" id="guiding-question" data-stage="1-guiding-question"><header class="stage-heading"><span>01</span><div><p>Knowledge-point guiding question</p><h2>Start with the problem</h2></div></header><blockquote>${escapeHtml(lesson.guidingQuestion)}</blockquote><details class="diagnostic"><summary>Prior-knowledge diagnostic</summary><p><strong>Prompt:</strong> ${escapeHtml(lesson.diagnostic.prompt)}</p><p><strong>Check:</strong> ${escapeHtml(lesson.diagnostic.answer)}</p></details><div class="objective-ledger"><h3>By the end, you can</h3><ul>${lesson.objectives.map(([id, text]) => `<li data-objective-id="${id}"><span>${id}</span>${escapeHtml(text)}</li>`).join("")}</ul></div></section>
  <section class="lesson-stage" id="knowledge-explanation" data-stage="2-knowledge-explanation"><header class="stage-heading"><span>02</span><div><p>Knowledge explanation</p><h2>Explain, model and apply</h2></div></header>${lesson.units.map((unit, unitIndex) => renderUnit(unit, unitIndex, lesson)).join("")}</section>
  <section class="lesson-stage" id="practice" data-stage="3-practice"><header class="stage-heading"><span>03</span><div><p>Practice</p><h2>Retrieve, apply, then answer like an exam</h2></div></header><div class="practice-stack">${lesson.practice.map(renderPractice).join("")}</div></section>
  <section class="lesson-stage" id="past-paper-analysis" data-stage="4-past-paper-analysis"><header class="stage-heading"><span>04</span><div><p>Past-paper analysis</p><h2>Build an answer from the mark logic</h2></div></header>${renderPastPaper(lesson.pastPaper)}</section>
  <section class="lesson-stage" id="summary" data-stage="5-summary"><header class="stage-heading"><span>05</span><div><p>Summary</p><h2>${lesson.kind === "review" ? "Connect the paper" : "The decision frame for this lesson"}</h2></div></header><div class="summary-grid">${lesson.summary.map(([heading, body]) => `<article><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}</div><details class="source-note"><summary>Scope and fact-check sources</summary><ul>${lesson.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul></details></section></main><nav class="lesson-pagination" aria-label="Lesson navigation">${navLink(previous, "Previous")}${navLink(next, "Next")}</nav><footer><p>Cambridge International AS Level Computer Science 9618 · English student text · 中文教师提示</p></footer>` });
}

function renderCourseIndex() {
  const teachingCount = courseV3Lessons.filter((lesson) => lesson.kind === "teaching").length;
  return pageShell({ title: "AS 9618 visual teaching course", description: "Complete AS Sections 1–12 in official order with visual materials, practice and exam-task analysis.", depth: "root", body: `<header class="site-header"><a class="brand" href="./"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Visual course</strong></a></header><main><section class="course-hero"><p class="eyebrow">2027–2029 syllabus · AS Sections 1–12</p><h1>Teach every requirement.</h1><p class="lead">A continuous course for classroom explanation and independent study: guiding question, visible knowledge teaching, structured materials, practice, exam-task analysis and a lesson-specific summary.</p><div class="coverage-band"><strong>121/121 requirements</strong><span>${teachingCount} teaching lessons</span><span>2 integrated reviews</span><span>official order</span></div></section><section class="course-sequence"><header><p>Course sequence</p><h2>Paper 1 foundations · Paper 2 problem-solving</h2></header><div class="section-grid">${Object.entries(sectionMeta).map(([section, meta]) => { const lessons = courseV3Lessons.filter((lesson) => lesson.section === Number(section)); return `<article><p>Paper ${meta.paper} · Section ${section}</p><h3>${escapeHtml(meta.title)}</h3><span>${lessons.length} lessons · ${lessons.flatMap((lesson) => lesson.syllabusIds).length} requirements</span><a href="section-${section}/">Open section →</a></article>`; }).join("")}</div><h2 class="all-lessons-heading">Complete numbered sequence</h2><ol>${courseV3Lessons.map((lesson) => `<li><a href="${lesson.route}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(3, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section></main><footer><p>Cambridge International AS Level Computer Science 9618 · 2027–2029</p></footer>` });
}

function renderSectionIndex(section) {
  const meta = sectionMeta[section];
  const lessons = courseV3Lessons.filter((lesson) => lesson.section === section);
  return pageShell({ title: `Section ${section} ${meta.title}`, description: `Section ${section} lessons in official syllabus order.`, body: `${renderHeader({ section })}<main><section class="course-hero"><p class="eyebrow">Paper ${meta.paper} · Section ${section}</p><h1>${escapeHtml(meta.title)}</h1><p class="lead">${lessons.length} continuous teaching units. Every page uses the same five-stage lesson flow and maps materials and practice to its objectives.</p><div class="coverage-band"><strong>${lessons.length} lessons</strong><span>${lessons.flatMap((lesson) => lesson.syllabusIds).length} requirements</span><span>default-visible teaching</span><span>responsive materials</span></div></section><section class="course-sequence"><header><p>Official sequence</p><h2>Teach the section in order</h2></header><ol>${lessons.map((lesson) => `<li><a href="../${lesson.route}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(3, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section></main><footer><p>AS 9618 · Section ${section} ${escapeHtml(meta.title)}</p></footer>` });
}

const globalCss = `${sourceCss}\n\n/* Whole-course V3 additions */\n.lead,.stage-heading>*:last-child,.unit-heading>*:last-child,.course-sequence a>*,.worked-steps li{min-width:0}.lead,.unit-heading h3,.teaching-material>h4,.course-sequence h3,.course-sequence div>span{overflow-wrap:anywhere}.reviewed-visual .visual-scroll{max-width:100%;overflow-x:auto;border:1px solid var(--line);background:#fff}.reviewed-visual img{width:100%;min-width:720px;height:auto;object-fit:contain}.figure-facts{margin-top:16px;padding:14px 16px;border-left:4px solid var(--teal);background:var(--teal-pale)}.figure-facts>strong{color:var(--navy-dark);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase}.figure-facts ul{margin:6px 0 0;padding-left:20px;font-size:.88rem}.worked-steps{display:grid;min-width:0;gap:12px;margin:0;padding:0;list-style:none;counter-reset:worked}.worked-steps li{max-width:100%;padding:16px 18px;overflow:hidden;border-left:3px solid var(--teal);background:var(--blue-pale)}.worked-steps strong{display:block;color:var(--teal);font-size:.76rem;letter-spacing:.05em;text-transform:uppercase}.worked-steps p{margin:6px 0 0}.worked-steps pre{width:100%;min-width:0;max-width:100%;margin:9px 0 0;padding:15px;overflow-x:auto;background:#101c2c;color:#eef5f7;font:700 .82rem/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre}.section-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;border:1px solid var(--line-dark);background:var(--line-dark)}.section-grid article{display:flex;min-width:0;min-height:220px;flex-direction:column;padding:24px;background:white}.section-grid p{margin:0;color:var(--teal);font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.section-grid h3{margin:8px 0;font-size:1.4rem;overflow-wrap:anywhere}.section-grid span{color:var(--ink-soft);font-size:.86rem;overflow-wrap:anywhere}.section-grid a{margin-top:auto;padding-top:22px;color:var(--teal);font-weight:800}.all-lessons-heading{margin:72px 0 26px}.course-sequence>ol{border-top:1px solid var(--line-dark)}@media(max-width:820px){.section-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.course-hero h1{font-size:3rem;overflow-wrap:anywhere}.section-grid{grid-template-columns:1fr}.reviewed-visual img{min-width:680px}.visual-scroll::after{content:'Swipe horizontally to inspect the full reviewed visual →';display:block;padding:8px;color:var(--teal);font-size:.72rem;font-weight:700}}`;

mkdirSync(outRoot, { recursive: true });
write(join(outRoot, "course.css"), globalCss);
write(join(outRoot, "course.js"), sourceJs);
write(join(outRoot, "index.html"), renderCourseIndex());
for (const [index, lesson] of courseV3Lessons.entries()) write(join(outRoot, lesson.route, "index.html"), renderLesson(lesson, index));
for (const section of Object.keys(sectionMeta).map(Number)) write(join(outRoot, `section-${section}`, "index.html"), renderSectionIndex(section));

const requirementOwners = new Map();
for (const lesson of courseV3Lessons.filter((item) => item.kind === "teaching")) for (const id of lesson.syllabusIds) {
  const owners = requirementOwners.get(id) ?? [];
  owners.push(lesson.route);
  requirementOwners.set(id, owners);
}
const assets = [...new Set(courseV3Lessons.flatMap((lesson) => lesson.units.flatMap((unit) => unit.materials.flatMap((material) => {
  if (material.type === "topology-gallery") return material.entries.map((entry) => assetSource(entry[1], lesson.section));
  return material.asset ? [assetSource(material.asset, lesson.section)] : [];
}))))];
for (const asset of assets) if (!existsSync(join(reviewedAssetRoot, asset.replace(/^\//, "")))) throw new Error(`Missing V3 asset ${asset}`);

const contract = {
  ...courseV3Meta,
  generatedAt: "deterministic",
  syllabusOrder: [...requirementOwners.keys()],
  requirementOwners: Object.fromEntries(requirementOwners),
  lessons: courseV3Lessons.map((lesson) => ({
    sequenceIndex: lesson.sequenceIndex,
    lessonKey: lesson.lessonKey,
    kind: lesson.kind,
    route: `web/course-v3/${lesson.route}/index.html`,
    section: lesson.section,
    syllabusIds: lesson.syllabusIds,
    objectives: lesson.objectives.map(([id, description]) => ({
      id,
      description,
      explanationUnits: lesson.units.filter((unit) => unit.objectiveIds.includes(id)).map((unit) => unit.heading),
      materialTitles: lesson.units.flatMap((unit) => unit.materials.filter((material) => material.objectiveIds.includes(id)).map((material) => material.title)),
      questionIds: lesson.practice.filter((question) => question.objectiveIds.includes(id)).map((question) => question.id),
      pastPaperAnalysis: lesson.pastPaper.objectiveIds.includes(id) ? lesson.pastPaper.sourceRef : null,
    })),
  })),
  assets: assets.map((asset) => ({ path: `web${asset}`, sha256: sha256(join(reviewedAssetRoot, asset.replace(/^\//, ""))) })),
};
write(join(root, "scripts", "course-v3-contract.json"), `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Rendered ${courseV3Meta.lessonCount} V3 lessons, ${Object.keys(sectionMeta).length} sections and ${assets.length} reviewed assets.`);
