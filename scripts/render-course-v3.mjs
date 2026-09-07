import { mechanismDiagramFiles } from "./course-v3-mechanism-diagrams.mjs";
import { imageDimensions } from "./image-dimensions.mjs";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";
import { unitMaterials } from "./course-v3-presentation.mjs";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";
import { section1DiagramFiles } from "./course-v3-section1-diagrams.mjs";
import { section4DiagramFiles } from "./course-v3-section4-diagrams.mjs";
import { section8DiagramFiles } from "./course-v3-section8-diagrams.mjs";
import { section11Assessments } from "./course-v3-section11-assessments.mjs";
import { section11DiagramFiles } from "./course-v3-section11-diagrams.mjs";
import { section9DiagramFiles } from "./course-v3-section9-diagrams.mjs";
import { section10DiagramFiles } from "./course-v3-section10-diagrams.mjs";
import { section12DiagramFiles } from "./course-v3-section12-diagrams.mjs";
import { section12Assessment, section12MockQuestions } from "./course-v3-section12-assessments.mjs";
import { section10Assessments } from "./course-v3-section10-content.mjs";
import { section6DiagramFiles } from "./course-v3-section6-diagrams.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = join(root, "web", "course-v3");
const reviewedAssetRoot = join(root, "web");
const sourceCss = readFileSync(join(root, "web", "course-v3", "section-2", "course.css"), "utf8");
const sourceJs = readFileSync(join(root, "web", "course-v3", "section-2", "course.js"), "utf8");
const legacyMigration = JSON.parse(readFileSync(join(root, "scripts", "course-v2-migration.json"), "utf8"));
const assessmentBank = JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"));
assessmentBank.sets = assessmentBank.sets.map(set => set.id === section12Assessment.id ? section12Assessment : set);
for (const replacement of [...section10Assessments, ...section11Assessments, ...section12MockQuestions]) {
  let matches = 0;
  for (const set of assessmentBank.sets) set.questions = set.questions.map(question => {
    if (question.id !== replacement.id) return question;
    matches += 1;
    return replacement;
  });
  if (matches !== 1) throw new Error(`Expected one assessment slot for ${replacement.id}, found ${matches}`);
}

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const write = (path, contents) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, contents); };
const requirementCount = (lessons) => [3, 9, 10, 11].includes(lessons[0]?.section)
  ? new Set(lessons.flatMap((lesson) => lesson.syllabusIds)).size
  : lessons.flatMap((lesson) => lesson.syllabusIds).length;
const objectiveBadges = (ids) => ids.map((id) => `<span class="objective-badge">${escapeHtml(id)}</span>`).join("");
const webAssetPath = (asset, section) => asset.startsWith("/") ? asset : `/assets/course-v3/section-${section}/${asset}`;
const lessonAssetSource = (asset, section) => `../../${webAssetPath(asset, section).replace(/^\//, "")}`;

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

function renderList(material) {
  const items = material.items.length ? material.items : [["Required item", "Read the adjacent core explanation."]];
  return `<section class="teaching-material material-list" data-material-type="list" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><ul>${items.map(([heading, body]) => `<li><strong>${escapeHtml(heading)}</strong><span>${escapeHtml(body)}</span></li>`).join("")}</ul></section>`;
}

function renderFlow(material) {
  return `<section class="teaching-material material-flow" data-material-type="flow" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><ol class="process-list">${material.steps.map(([heading, body]) => `<li><div><strong>${escapeHtml(heading.replace(/^\d+\s*·\s*/, ""))}</strong><span>${escapeHtml(body)}</span></div></li>`).join("")}</ol></section>`;
}

function renderAnalogy(material, section) {
  return `<figure class="teaching-material material-analogy" data-material-type="analogy" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><img src="${escapeHtml(lessonAssetSource(material.asset, section))}"${imageSizeAttributes(material, section)} alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(material.caption)}</figcaption><aside class="analogy-boundary"><strong>${escapeHtml(material.boundaryLabel ?? "Analogy boundary")}</strong><p>${escapeHtml(material.boundary)}</p></aside></figure>`;
}

function renderWorkedExample(material) {
  return `<section class="teaching-material worked-example" data-material-type="worked-example" data-objectives="${material.objectiveIds.join(" ")}"><h4>Worked example · ${escapeHtml(material.title)}</h4><ol class="worked-steps">${material.steps.map(([label, text]) => `<li><strong>${escapeHtml(label)}</strong>${text.includes("\n") ? `<pre${material.objectiveIds.some(id=>/^S(?:9|10|11|12)\./.test(id)) ? ` tabindex="0" aria-label="${escapeHtml(label)}"` : ""}><code>${escapeHtml(text)}</code></pre>` : `<p>${escapeHtml(text)}</p>`}</li>`).join("")}</ol></section>`;
}

function imageSizeAttributes(material, section) {
  if (material.layout !== "mechanism" && ![1, 4, 7, 8, 9, 10, 11, 12].includes(section)) return "";
  const dimensions = imageDimensions(join(reviewedAssetRoot, webAssetPath(material.asset, section).replace(/^\//, "")));
  if (!dimensions) throw new Error(`Missing intrinsic dimensions for S${section} image ${material.asset}`);
  return ` width="${dimensions.width}" height="${dimensions.height}"`;
}

function renderReviewedVisual(material, section) {
  const source = escapeHtml(lessonAssetSource(material.asset, section));
  const region = (material.layout === "mechanism" || [7, 8, 9, 10, 11, 12].includes(section)) ? ` tabindex="0" role="region" aria-label="${escapeHtml(material.title)}"` : "";
  const fullSize = (material.layout === "mechanism" || [7, 8, 9, 10, 11, 12].includes(section)) ? ` <a class="diagram-full-size" href="${source}" target="_blank" rel="noopener">Open full-size diagram ↗</a>` : "";
  return `<figure class="teaching-material reviewed-visual${material.layout === "mechanism" ? " mechanism-visual" : ""}" data-material-type="reviewed-visual" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="visual-scroll"${region}><img src="${source}"${imageSizeAttributes(material, section)} alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async"></div><figcaption>${escapeHtml(material.caption)}${fullSize}</figcaption><details class="visual-transcript"><summary>Visual transcript</summary><ul>${material.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul></details></figure>`;
}

function renderTopologyGallery(material, section) {
  return `<section class="teaching-material topology-gallery" data-material-type="topology-gallery" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="topology-grid">${material.entries.map(([name, asset, alt, steps]) => `<article class="topology-plate${asset.endsWith(".svg") ? " topology-precise" : ""}"><h5>${escapeHtml(name)}</h5>${asset.endsWith(".svg") ? `<div class="visual-scroll" tabindex="0" role="region" aria-label="Hybrid topology diagram"><img src="${escapeHtml(lessonAssetSource(asset, section))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"></div>` : `<img src="${escapeHtml(lessonAssetSource(asset, section))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`}<ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("")}</div><aside class="precision-note"><strong>Technical reading rule</strong><p>The reviewed image establishes the link pattern. The numbered path is authoritative: count each physical segment and name every forwarding device.</p></aside></section>`;
}

function renderReservoir(material, section) {
  return `<figure class="teaching-material material-reservoir" data-material-type="reservoir" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="reservoir-stage"><img src="${escapeHtml(lessonAssetSource(material.asset, section))}"${imageSizeAttributes(material, section)} alt="A reservoir with an inlet, stored water and an outlet, used only as an analogy for a streaming buffer." loading="lazy" decoding="async"><span class="reservoir-label label-in">arrival rate</span><span class="reservoir-label label-level">buffer level</span><span class="reservoir-label label-out">playback bit rate</span></div><figcaption>Data arriving from the network fills the buffer; playback drains it at the media bit rate.</figcaption><aside class="analogy-boundary"><strong>Critical limit</strong><p>If the long-term arrival rate is lower than the playback bit rate, any finite buffer eventually empties. A larger buffer delays the pause; it cannot repair sustained insufficient input.</p></aside></figure>`;
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
  if (material.type === "list") return renderList(material);
  if (material.type === "flow") return renderFlow(material);
  if (material.type === "analogy") return renderAnalogy(material, section);
  if (material.type === "worked-example") return renderWorkedExample(material);
  if (material.type === "reviewed-visual") return renderReviewedVisual(material, section);
  if (material.type === "topology-gallery") return renderTopologyGallery(material, section);
  if (material.type === "reservoir") return renderReservoir(material, section);
  if (material.type === "address-demo") return renderAddressDemo(material);
  if (material.type === "url-demo") return renderUrlDemo(material);
  throw new Error(`Unsupported material type: ${material.type}`);
}

function renderLessonContents(lesson) {
  if (![1, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(lesson.section)) return "";
  return `<nav class="lesson-toc" id="lesson-contents" aria-label="In this lesson"><h2>In this lesson</h2><ol>${lesson.units.map((unit, index) => `<li><a href="#unit-${index + 1}">${escapeHtml(unit.heading)}</a></li>`).join("")}</ol><p><a href="#practice">Practice questions</a> · <a href="#original-exam-style-question">Exam-style questions</a> · <a href="#summary">Summary</a></p></nav>`;
}

function renderUnitCheckpoint(unit) {
  if (!unit.checkpoint) return "";
  return `<aside class="unit-checkpoint"><h4>Check your understanding</h4><p>${escapeHtml(unit.checkpoint.prompt)}</p><details><summary>Check your answer</summary><p>${escapeHtml(unit.checkpoint.answer)}</p></details>${["REVIEW-2-3", "REVIEW-2-4"].includes(unit.syllabusId) ? "" : `<a class="back-to-contents" href="#lesson-contents">Back to lesson contents</a>`}</aside>`;
}

function renderCoreBlock(block) {
  const title = block.title ? `<h5>${escapeHtml(block.title)}</h5>` : "";
  if (block.type === "paragraph") return `<div class="core-block" data-core-type="paragraph">${title}<p>${escapeHtml(block.text)}</p></div>`;
  if (block.type === "list" || block.type === "steps") {
    const tag = block.type === "steps" ? "ol" : "ul";
    return `<div class="core-block" data-core-type="${block.type}">${title}<${tag}>${block.items.map(([label, text]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(text)}</li>`).join("")}</${tag}></div>`;
  }
  if (block.type === "table") return `<div class="core-block" data-core-type="table">${title}<div class="table-scroll" role="region" aria-label="${escapeHtml(block.title)}" tabindex="0"><table${block.headers.length === 2 ? ' class="core-pair-table"' : ""}><thead><tr>${block.headers.map(cell => `<th scope="col">${escapeHtml(cell)}</th>`).join("")}</tr></thead><tbody>${block.rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${escapeHtml(cell)}</td>` : `<th scope="row">${escapeHtml(cell)}</th>`).join("")}</tr>`).join("")}</tbody></table></div><p class="swipe-cue" aria-hidden="true">Swipe horizontally to compare every column →</p></div>`;
  throw new Error(`Unsupported core block: ${block.type}`);
}

function renderUnit(unit, unitIndex, lesson) {
  const supporting = (unit.supportingMaterials ?? []).map((material) => `<div class="unit-comparison" data-role="supporting-material">${renderMaterial(material, lesson.section)}</div>`).join("");
  return `<article class="knowledge-unit"${[1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(lesson.section) ? ` id="unit-${unitIndex + 1}"` : ""} data-unit-index="${unitIndex + 1}" data-syllabus-id="${escapeHtml(unit.syllabusId)}" data-objectives="${unit.objectiveIds.join(" ")}"><header class="unit-heading"><span class="section-number">${String(unitIndex + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(unit.heading)}</h3><div class="objective-row">${objectiveBadges(unit.objectiveIds)}</div></div></header><div class="lead-visual" data-role="lead-visual"><p class="unit-stage-label">Visual overview</p>${renderMaterial(unit.leadVisual, lesson.section)}</div><section class="explanation-copy core-explanation" data-role="core-explanation"><h4>Core explanation</h4>${unit.coreBlocks ? unit.coreBlocks.map(renderCoreBlock).join("") : unit.coreExplanation.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>${lesson.section === 1 ? "" : supporting}${unit.method ? `<div class="unit-method" data-role="method">${renderMaterial(unit.method, lesson.section)}</div>` : ""}${unit.workedExample ? `<div class="unit-worked-example" data-role="worked-example">${renderMaterial(unit.workedExample, lesson.section)}</div>` : ""}${lesson.section === 1 ? supporting : ""}<aside class="misconception"><strong>Common misconception</strong>${unit.misconceptions.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</aside>${([1, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(lesson.section) || ["REVIEW-2-3", "REVIEW-2-4"].includes(unit.syllabusId)) ? renderUnitCheckpoint(unit) : ""}</article>`;
}

function renderQuestionDiagram(question) {
  if (!question.diagram) return "";
  const diagramSection = Number(question.diagram.match(/\/section-(9|11|12)\//)?.[1]);
  const flowchart = Boolean(diagramSection);
  return `<figure class="reviewed-visual question-diagram"><div class="visual-scroll" tabindex="0" role="region" aria-label="${escapeHtml(question.diagramLabel ?? "Logic circuit")}"><img src="${escapeHtml(lessonAssetSource(question.diagram, 3))}" alt="${escapeHtml(question.diagramAlt)}"${flowchart ? imageSizeAttributes({asset:question.diagram},diagramSection) : ""} loading="lazy"></div>${flowchart ? `<figcaption><a class="diagram-full-size" href="${escapeHtml(lessonAssetSource(question.diagram,9))}" target="_blank" rel="noopener">Open full-size ${diagramSection === 12 ? "diagram" : "flowchart"} ↗</a></figcaption>` : ""}</figure>`;
}

function renderQuestionStimulus(question) {
  return `${question.code ? `<section class="question-code"><p>${escapeHtml(question.codeCaption)}</p><pre tabindex="0" aria-label="${escapeHtml(question.codeLabel ?? "Supplied assembly program")}"><code>${escapeHtml(question.code)}</code></pre></section>` : ""}${question.table ? renderTable({ ...question.table, objectiveIds: question.objectiveIds ?? [] }) : ""}${(question.tables ?? []).map((table) => renderTable({ ...table, objectiveIds: question.objectiveIds ?? [] })).join("")}`;
}

function renderQuestionAnswerTable(question) {
  return `${question.answerCode ? `<section class="question-code"><p>${escapeHtml(question.answerCodeLabel ?? "One valid SQL answer")}</p><pre tabindex="0" aria-label="${escapeHtml(question.answerCodeLabel ?? "SQL answer")}"><code>${escapeHtml(question.answerCode)}</code></pre></section>` : ""}${question.answerTable ? renderTable({ ...question.answerTable, objectiveIds: question.objectiveIds ?? [] }) : ""}${question.answerDiagram ? renderQuestionDiagram({diagram:question.answerDiagram,diagramAlt:question.answerDiagramAlt,diagramLabel:question.answerDiagramLabel ?? (question.answerDiagram.includes("section-12/") ? "One valid structure chart" : "One valid flowchart solution")}) : ""}`;
}

function renderPractice(question, index, section) {
  return `<article class="practice-question" data-question-id="${escapeHtml(question.id)}" data-command-word="${escapeHtml(question.commandWord)}" data-objectives="${question.objectiveIds.join(" ")}"><header><span>${[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(section) ? `Question ${index + 1} · ` : ""}Command word: ${escapeHtml(question.commandWord)}</span><strong>${question.marks} marks</strong></header><p class="question-prompt">${escapeHtml(question.prompt)}</p>${renderQuestionDiagram(question)}${renderQuestionStimulus(question)}<div class="objective-row">${objectiveBadges(question.objectiveIds)}</div><details><summary>Answer and marking points</summary>${renderQuestionAnswerTable(question)}<ol>${question.answerPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol><p class="common-error"><strong>Common error:</strong> ${escapeHtml(question.commonError)}</p></details></article>`;
}

function renderExamStyleQuestions(questions, section) {
  return `<article class="past-paper" data-question-count="${questions.length}"><p class="copyright-note">These are original exam-style tasks. They do not reproduce Cambridge question or mark-scheme wording.</p>${questions.map((question, index) => `<section class="exam-question" data-question-id="${escapeHtml(question.id)}" data-source-ref="${escapeHtml(question.sourceRef)}" data-command-word="${escapeHtml(question.commandWord)}" data-objectives="${question.objectiveIds.join(" ")}"><div class="paper-source"><div><span>Syllabus/source focus</span><strong>${escapeHtml(question.sourceRef)}</strong></div><a href="${escapeHtml(question.accessUrl)}" target="_blank" rel="noreferrer">Official Cambridge access page ↗</a></div><h3>Question ${index + 1} · Command word: ${escapeHtml(question.commandWord)} · ${question.marks} marks</h3><p class="paper-task">${escapeHtml(question.task)}</p>${renderQuestionDiagram(question)}${renderQuestionStimulus(question)}${([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(section) || question.objectiveIds.some(id=>/^S(?:9|10|11|12)\./.test(id))) ? `<details class="paper-marking-points"><summary>Answer and marking points</summary>${renderQuestionAnswerTable(question)}<ul>${question.markLogic.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul><p class="common-error"><strong>Common error:</strong> ${escapeHtml(question.commonLosses.join(" "))}</p></details>` : `<section class="paper-marking-points"><h4>Marking points</h4><ul>${question.markLogic.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section>`}</section>`).join("")}</article>`;
}

function pageShell({ title, description, body, depth = "lesson", assetVersion = "20260901g" }) {
  const prefix = depth === "root" ? "" : "../";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${escapeHtml(description)}"><title>${escapeHtml(title)} · AS 9618</title><link rel="icon" href="data:"><link rel="stylesheet" href="${prefix}course.css?v=20260907concepts"><script src="${prefix}course.js?v=20260901g" defer></script></head><body>${body}</body></html>`;
}

function renderHeader(currentLesson) {
  const currentSection = currentLesson?.section;
  return `<header class="site-header"><a class="brand" href="../"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Visual course</strong></a><button class="menu-button" aria-expanded="false" aria-controls="lesson-menu">Sections</button><nav id="lesson-menu">${Object.entries(sectionMeta).map(([section, meta]) => `<a ${String(currentSection) === section ? 'aria-current="page"' : ""} href="../section-${section}/">S${section}</a>`).join("")}</nav></header>`;
}

function renderLesson(lesson, index) {
  const previous = courseV3Lessons[index - 1];
  const next = courseV3Lessons[index + 1];
  const navLink = (target, label) => target ? `<a href="../${target.route}/"><span>${label}</span><strong>${escapeHtml(target.lessonKey)} · ${escapeHtml(target.title)}</strong></a>` : `<a href="../"><span>${label}</span><strong>Course overview</strong></a>`;
  return pageShell({ title: `${lesson.lessonKey} ${lesson.title}`, assetVersion: lesson.section === 4 ? "20260906s4" : lesson.section === 1 ? "20260906s1" : lesson.section === 6 ? "20260906s6" : lesson.section === 7 ? "20260906s7" : lesson.section === 8 ? "20260906s8" : lesson.section === 11 ? "20260907s11" : lesson.section === 9 ? "20260907s9" : lesson.section === 10 ? "20260907s10" : lesson.section === 12 ? "20260907s12" : "20260901g", description: lesson.subtitle, body: `${renderHeader(lesson)}<main><section class="lesson-hero"><p class="eyebrow">Lesson ${String(lesson.sequenceIndex).padStart(3, "0")} · ${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h1>${escapeHtml(lesson.title)}</h1><p class="lead">${escapeHtml(lesson.subtitle)}</p>${[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(lesson.section) ? `<p class="guiding-question">${escapeHtml(lesson.guidingQuestion)}</p><details class="diagnostic"><summary>Before you start</summary><p>${escapeHtml(lesson.diagnostic.prompt)}</p><details><summary>Check your answer</summary><p>${escapeHtml(lesson.diagnostic.answer)}</p></details></details>${lesson.teachingCheckpoints ? `<details class="diagnostic"><summary>Teaching checkpoints</summary><ul>${lesson.teachingCheckpoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></details>` : ""}` : ""}${lesson.section === 3 ? `<details class="diagnostic"><summary>Jump to a knowledge point</summary><ol>${lesson.units.map((unit, index) => `<li><a href="#unit-${index + 1}">${escapeHtml(unit.heading)}</a></li>`).join("")}</ol></details>` : ""}<div class="objective-ledger"><h2>Learning objectives</h2><ul>${lesson.objectives.map(([id, text]) => `<li data-objective-id="${id}"><span>${id}</span>${escapeHtml(text)}</li>`).join("")}</ul></div>${renderLessonContents(lesson)}</section>
  <section class="lesson-stage" id="visual-and-core" data-stage="1-visual-and-core"><header class="stage-heading"><span>01</span><div><p>Concept teaching</p><h2>Visual overview and core explanation</h2></div></header>${lesson.units.map((unit, unitIndex) => renderUnit(unit, unitIndex, lesson)).join("")}</section>
  <section class="lesson-stage" id="practice" data-stage="2-practice"><header class="stage-heading"><span>02</span><div><p>Cambridge command words</p><h2>Practice questions</h2></div></header><div class="practice-stack">${lesson.practice.map((question, index) => renderPractice(question, index, lesson.section)).join("")}</div></section>
  <section class="lesson-stage" id="original-exam-style-question" data-stage="3-original-exam-style-question"><header class="stage-heading"><span>03</span><div><p>Exam response</p><h2>Original exam-style questions and marking points</h2></div></header>${renderExamStyleQuestions(lesson.examStyleQuestions, lesson.section)}</section>
  <section class="lesson-stage" id="summary" data-stage="4-summary"><header class="stage-heading"><span>04</span><div><p>Lesson review</p><h2>Summary</h2></div></header><div class="summary-grid">${lesson.summary.map(([heading, body]) => `<article><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}</div><details class="source-note"><summary>Syllabus scope and sources</summary><ul>${lesson.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul></details></section></main><nav class="lesson-pagination" aria-label="Lesson navigation">${navLink(previous, "Previous")}${navLink(next, "Next")}</nav><footer><p>Cambridge International AS Level Computer Science 9618 · 2027–2029</p></footer>` });
}

function renderCourseIndex() {
  const teachingCount = courseV3Lessons.filter((lesson) => lesson.kind === "teaching").length;
  return pageShell({ title: "AS 9618 visual teaching course", description: "Complete AS Sections 1–12 in official order with visual materials, practice and exam-style questions.", depth: "root", body: `<header class="site-header"><a class="brand" href="./"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Visual course</strong></a></header><main><section class="course-hero"><p class="eyebrow">2027–2029 syllabus · AS Sections 1–12</p><h1>Teach every requirement.</h1><p class="lead">Each knowledge unit begins with a visual overview, followed by its core explanation, any required method or worked example, practice questions and a concise summary.</p><div class="coverage-band"><strong>121/121 requirements</strong><span>${teachingCount} teaching lessons</span><span>2 integrated reviews</span><span>official order</span></div></section><section class="course-sequence"><header><p>Course sequence</p><h2>Paper 1 foundations · Paper 2 problem-solving</h2></header><div class="section-grid">${Object.entries(sectionMeta).map(([section, meta]) => { const lessons = courseV3Lessons.filter((lesson) => lesson.section === Number(section)); return `<article><p>Paper ${meta.paper} · Section ${section}</p><h3>${escapeHtml(meta.title)}</h3><span>${lessons.length} lessons · ${requirementCount(lessons)} requirements</span><a href="section-${section}/">Open section →</a></article>`; }).join("")}</div><h2 class="all-lessons-heading">Complete numbered sequence</h2><ol>${courseV3Lessons.map((lesson) => `<li><a href="${lesson.route}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(3, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section></main><footer><p>Cambridge International AS Level Computer Science 9618 · 2027–2029</p></footer>` });
}

function renderSectionIndex(section) {
  const meta = sectionMeta[section];
  const lessons = courseV3Lessons.filter((lesson) => lesson.section === section);
  return pageShell({ title: `Section ${section} ${meta.title}`, description: `Section ${section} lessons in official syllabus order.`, body: `${renderHeader({ section })}<main><section class="course-hero"><p class="eyebrow">Paper ${meta.paper} · Section ${section}</p><h1>${escapeHtml(meta.title)}</h1><p class="lead">${lessons.length} ${[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(section) ? "lessons" : "continuous teaching units"}. Every knowledge unit presents its visual overview before the core explanation and maps practice to explicit objectives.</p><div class="coverage-band"><strong>${lessons.length} lessons</strong><span>${requirementCount(lessons)} requirements</span><span>default-visible teaching</span><span>responsive materials</span></div></section><section class="course-sequence"><header><p>Official sequence</p><h2>Teach the section in order</h2></header><ol>${lessons.map((lesson) => `<li><a href="../${lesson.route}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(3, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section></main><footer><p>AS 9618 · Section ${section} ${escapeHtml(meta.title)}</p></footer>` });
}

function renderGateway() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Cambridge International AS Level Computer Science 9618 course, assessment bank and resources."><title>AS 9618 Computer Science</title><link rel="icon" href="data:"><link rel="stylesheet" href="./course-v3/course.css?v=20260901h"></head><body><header class="site-header"><a class="brand" href="./"><span>Cambridge International AS Level</span><strong>9618 Computer Science</strong></a></header><main><section class="course-hero"><p class="eyebrow">2027–2029 syllabus · AS Sections 1–12</p><h1>Course, assessment and resources.</h1><p class="lead">Use the visual course as the single lesson sequence. Assessment and reference materials remain available as separate supporting collections.</p><div class="coverage-band"><strong>121/121 requirements</strong><span>93 course pages</span><span>12 syllabus sections</span><span>2 AS papers</span></div></section><section class="course-sequence gateway-sequence"><header><p>Student access</p><h2>Choose one destination</h2></header><div class="section-grid gateway-grid"><article><p>Course</p><h3>Visual teaching course</h3><span>Visual overview first, then core explanation, practice and marking points.</span><a href="./course-v3/">Open course →</a></article><article><p>Assessment</p><h3>Assessment Bank</h3><span>Section checks and paper-level practice.</span><a href="./assessments/">Open Assessment Bank →</a></article><article><p>Reference</p><h3>Resources</h3><span>Course references and supporting material.</span><a href="./resources/">Open resources →</a></article></div></section></main><footer><p>Cambridge International AS Level Computer Science 9618 · 2027–2029</p></footer></body></html>`;
}

function v2LessonSuccessors(v2Lesson) {
  if (v2Lesson >= 1 && v2Lesson <= 6) return [v2Lesson];
  const section2 = { 7: [7], 8: [8], 9: [9, 10], 10: [11], 11: [12, 13], 12: [14] };
  if (section2[v2Lesson]) return section2[v2Lesson];
  if (v2Lesson >= 13 && v2Lesson <= 30) return [v2Lesson + 2];
  if (v2Lesson === 31) return [33];
  if (v2Lesson === 32) return [35];
  if (v2Lesson === 33) return [34, 36];
  if (v2Lesson === 34) return [37];
  if (v2Lesson >= 35 && v2Lesson <= 42) return [v2Lesson + 3];
  if (v2Lesson === 43 || v2Lesson === 44) return [46, 47];
  if (v2Lesson === 45) return [48];
  if (v2Lesson >= 46 && v2Lesson <= 90) return [v2Lesson + 3];
  throw new Error(`No successor mapping for archived lesson ${v2Lesson}`);
}

function legacySuccessors(oldLesson) {
  const v2Lesson = oldLesson <= 90
    ? oldLesson
    : legacyMigration.rows.find((row) => row.oldLesson === oldLesson)?.primaryNewLesson;
  if (!v2Lesson) throw new Error(`No migration row for legacy lesson ${oldLesson}`);
  return v2LessonSuccessors(v2Lesson).map((sequence) => {
    const lesson = courseV3Lessons.find((candidate) => candidate.sequenceIndex === sequence);
    if (!lesson) throw new Error(`No course page for successor ${sequence}`);
    return lesson;
  });
}

function renderLegacyEntry(oldLesson) {
  const successors = legacySuccessors(oldLesson);
  const pageTitle = `Lesson ${String(oldLesson).padStart(3, "0")} has moved`;
  const commonHead = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,follow"><title>${pageTitle} · AS 9618</title><link rel="icon" href="data:"><link rel="stylesheet" href="../course-v3/course.css?v=20260901h">`;
  if (successors.length === 1) {
    const successor = successors[0];
    const href = `../course-v3/${successor.route}/`;
    return `<!doctype html><html lang="en"><head>${commonHead}<link rel="canonical" href="${href}"><meta http-equiv="refresh" content="0; url=${href}"></head><body><main><section class="course-hero migration-notice"><p class="eyebrow">Course link updated</p><h1>This lesson has moved.</h1><p class="lead">Continue with ${escapeHtml(successor.lessonKey)} · ${escapeHtml(successor.title)}.</p><p><a class="migration-link" href="${href}">Open the current lesson →</a></p></section></main></body></html>`;
  }
  return `<!doctype html><html lang="en"><head>${commonHead}</head><body><main><section class="course-hero migration-notice"><p class="eyebrow">Course link updated</p><h1>This lesson now has more than one successor.</h1><p class="lead">Choose the current lesson that matches the topic you need.</p><ul class="migration-options">${successors.map((successor) => `<li><a href="../course-v3/${successor.route}/"><strong>${escapeHtml(successor.lessonKey)} · ${escapeHtml(successor.title)}</strong><span>${escapeHtml(successor.syllabusIds.join("–"))}</span></a></li>`).join("")}</ul><p><a class="migration-link" href="../course-v3/">Open the complete course →</a></p></section></main></body></html>`;
}

function assessmentPrompt(question) {
  return question.prompt
    .replace(/^Connect two syllabus ideas from (Section \d+) and explain why the connection matters in a new scenario\.$/i, "Explain one technical relationship between two syllabus ideas from $1 in a new scenario.")
    .replace(/^Correct a plausible student error about (.+?) and justify the corrected answer\.$/i, "Explain the error in a response about $1, then write and justify a corrected answer.")
    .replace(/^Apply the main method from (.+?) to a different context from the lesson\.$/i, "Explain how $1 operates in a different stated context.")
    .replace(/then recommend/gi, "then suggest")
    .replace(/^Use a fresh context to demonstrate and connect the key ideas from (.+?)\.$/i, "Explain the key ideas from $1 in a fresh context and link each idea to its consequence.");
}

function assessmentAnswer(answer) {
  return answer
    .replace(/\s*S(?:[1-9]|1[0-2])\.\d{2}\s+method:\s*[^.]+(?:\.\s*|$)/gi, " ")
    .replace(/Correction to remember:\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function renderAssessmentBank() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AS 9618 Assessment Bank</title><style>.question-code{min-width:0;max-width:100%}.question-code pre{max-width:100%;overflow-x:auto;padding:16px;background:#101c2c;color:#eef5f7;white-space:pre;font:600 .9rem/1.6 ui-monospace,monospace;box-sizing:border-box}.v2-question .material-table{min-width:0;margin:22px 0}.v2-question .table-scroll{max-width:100%;overflow-x:auto}.v2-question .material-table table{width:100%;border-collapse:collapse}.v2-question .material-table th,.v2-question .material-table td{padding:10px 12px;border:1px solid #ccd8e4;text-align:left;white-space:nowrap}.v2-question .material-table thead{background:#102e4f;color:#fff}.v2-question .material-table tbody th{font-weight:500}.v2-question .swipe-cue{font-size:.8rem;color:#176b75}</style><link rel="icon" href="data:"><link rel="stylesheet" href="../academic-theme.css?v=7"><link rel="stylesheet" href="../course-v2.css?v=3"></head><body><header class="v2-topbar"><div><p class="v2-eyebrow">Cambridge International AS Level</p><h1>Assessment Bank</h1></div><nav class="v2-actions"><a href="../">Course home</a></nav></header><main class="v2-content" style="width:min(1100px,100%);margin:0 auto;padding:24px 14px 56px"><section class="v2-hero"><div><p class="v2-eyebrow">14 original cumulative sets</p><h2>Section checks and paper-level practice</h2><p>Each question states a Cambridge command word. Answers are separated into guidance and marking points.</p></div><div class="v2-time-grid"><div><strong>12</strong><span>section checks</span></div><div><strong>2</strong><span>paper mocks</span></div></div></section>${assessmentBank.sets.map((set) => `<section class="v2-panel"><div class="v2-heading"><p class="v2-eyebrow">${set.totalMarks} marks</p><h2>${escapeHtml(set.title)}</h2></div>${set.questions.map((question, index) => { const prompt = assessmentPrompt(question); const commandWord = question.answerPoints ? question.commandWord : prompt.match(/^(Explain|Compare|Describe|State|Identify|Suggest|Justify|Evaluate|Write|Calculate|Draw|Give|Construct|Complete)\b/i)?.[1] ?? "Explain"; return `<article class="v2-question"><div class="v2-question-head"><span class="v2-badge">Command word: ${escapeHtml(sentenceCase(commandWord))}</span><span class="v2-badge">${question.marks} marks</span></div><p><strong>${index + 1}.</strong> ${escapeHtml(prompt)}</p>${renderQuestionStimulus(question)}<details><summary>Answer and marking guidance</summary><div class="v2-answer-grid">${renderQuestionAnswerTable(question)}${question.answerPoints ? `<ol>${question.answerPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol>` : `<p>${escapeHtml(assessmentAnswer(question.answer))}</p>`}<p>${escapeHtml(question.guidance)}</p></div></details></article>`; }).join("")}</section>`).join("")}</main></body></html>`;
}

function sentenceCase(value) {
  const text = String(value ?? "");
  return text ? `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}` : text;
}

const globalCss = `${sourceCss}\n.question-code{min-width:0;max-width:100%;margin:20px 0}.question-code pre{box-sizing:border-box;max-width:100%;overflow-x:auto;padding:18px;background:#101c2c;color:#eef5f7;font:600 .9rem/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre}.question-code p{overflow-wrap:anywhere}\n/* S1 classroom navigation and formative checks */\nhtml:has(.lesson-toc){scroll-behavior:auto}.lesson-toc{margin-top:32px;padding:24px;background:var(--blue-pale);border:1px solid var(--line)}.lesson-toc h2{font-size:1.35rem;margin:0 0 16px}.lesson-toc ol{columns:2;column-gap:32px;margin:0;padding-left:24px}.lesson-toc li{break-inside:avoid;padding:4px 0}.lesson-toc p{margin-bottom:0}.unit-checkpoint{margin-top:24px;padding:20px;border-left:4px solid var(--teal);background:var(--teal-pale)}.unit-checkpoint h4{margin-top:0}.unit-checkpoint details{margin:12px 0}.back-to-contents{display:inline-block;font-size:.85rem}.knowledge-unit[data-syllabus-id^="S1."],.lesson-toc[id]{scroll-margin-top:110px}@media(max-width:680px){.lesson-toc ol{columns:1}.lesson-toc{padding:18px}.unit-checkpoint{padding:16px}}\n\n/* S8 SQL used during classroom explanation */\n.knowledge-unit[data-syllabus-id^="S8."] .worked-steps pre,[data-question-id^="S8-"] .question-code pre{font-size:.95rem;font-weight:500;line-height:1.6}.knowledge-unit[data-syllabus-id^="S8."] .worked-steps pre code,[data-question-id^="S8-"] .question-code pre code{font:inherit}\n\n/* S9 pseudocode legibility */\n.knowledge-unit[data-syllabus-id^="S9."] .worked-steps pre,.knowledge-unit[data-syllabus-id="REVIEW-2-1"] .worked-steps pre,[data-question-id^="S9-"] .question-code pre{font-size:.95rem;font-weight:500;line-height:1.6}.knowledge-unit[data-syllabus-id^="S9."] .worked-steps pre code,.knowledge-unit[data-syllabus-id="REVIEW-2-1"] .worked-steps pre code,[data-question-id^="S9-"] .question-code pre code{font:inherit}\n\n/* S10 pseudocode legibility */\n@media(max-width:680px){.knowledge-unit[data-syllabus-id^="S10."] .worked-steps li:has(pre)::after{content:"Scroll horizontally to read each complete statement →";display:block;margin-top:8px;font-size:.75rem;color:var(--teal)}}\nbody:has(.lesson-hero [data-objective-id^="S10."]) .source-note{overflow-wrap:anywhere}\n.knowledge-unit[data-syllabus-id^="S10."] .reviewed-visual img{min-width:960px}\n.knowledge-unit[data-syllabus-id^="S10."] .worked-steps pre,.knowledge-unit[data-syllabus-id="REVIEW-2-2"] .worked-steps pre,[data-question-id^="S10-"] .question-code pre{font-size:.95rem;font-weight:500;line-height:1.6}.knowledge-unit[data-syllabus-id^="S10."] .worked-steps pre code,[data-question-id^="S10-"] .question-code pre code{font:inherit}\n\n/* S11 pseudocode legibility */\n.knowledge-unit[data-syllabus-id^="S11."] .worked-steps pre,.knowledge-unit[data-syllabus-id="REVIEW-2-3"] .worked-steps pre,[data-question-id^="S11-"] .question-code pre{font-size:.95rem;font-weight:500;line-height:1.6}.knowledge-unit[data-syllabus-id^="S11."] .worked-steps pre code,[data-question-id^="S11-"] .question-code pre code{font:inherit}\n\n/* S12 diagram and pseudocode legibility */\n.knowledge-unit[data-syllabus-id^="S12."] .reviewed-visual img,[data-question-id^="S12-"] .reviewed-visual img{min-width:1050px}\n.knowledge-unit[data-syllabus-id^="S12."] .worked-steps pre,[data-question-id^="S12-"] .question-code pre{font-size:.95rem;font-weight:500;line-height:1.6}.knowledge-unit[data-syllabus-id^="S12."] .worked-steps pre code,[data-question-id^="S12-"] .question-code pre code{font:inherit}\n\n/* Whole-course additions */\n.knowledge-unit[id^="unit-"]{scroll-margin-top:100px}.question-diagram{margin:18px 0}\n.lead,.stage-heading>*:last-child,.unit-heading>*:last-child,.course-sequence a>*,.worked-steps li{min-width:0}.lead,.unit-heading h3,.teaching-material>h4,.course-sequence h3,.course-sequence div>span{overflow-wrap:anywhere}.lesson-hero .objective-ledger{margin-top:34px}.lead-visual{margin-top:30px;padding:18px;border:1px solid var(--line-dark);background:#f8fbfc}.unit-stage-label{margin:0 0 12px;color:var(--teal);font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.core-explanation{margin-top:18px;padding:22px;border-left:4px solid var(--navy);background:white}.core-explanation h4{margin:0 0 10px;color:var(--navy-dark)}.unit-method,.unit-worked-example{margin-top:18px}.material-list ul{display:grid;gap:12px;margin:0;padding:0;list-style:none}.material-list li{display:grid;grid-template-columns:minmax(150px,.42fr) minmax(0,1fr);gap:18px;padding:16px 18px;border-left:4px solid var(--teal);background:#fff}.material-list li strong{color:var(--navy-dark)}.material-list li span{color:var(--ink-soft)}.reviewed-visual .visual-scroll{max-width:100%;overflow-x:auto;border:1px solid var(--line);background:#fff}.reviewed-visual img{width:100%;min-width:720px;height:auto;object-fit:contain}.visual-transcript{margin-top:14px;padding:12px 14px;border-left:4px solid var(--teal);background:var(--teal-pale)}.visual-transcript summary{cursor:pointer;color:var(--navy-dark);font-weight:800}.visual-transcript ul{margin:8px 0 0;padding-left:20px;font-size:.88rem}.worked-steps{display:grid;min-width:0;gap:12px;margin:0;padding:0;list-style:none;counter-reset:worked}.worked-steps li{max-width:100%;padding:16px 18px;overflow:hidden;border-left:3px solid var(--teal);background:var(--blue-pale)}.worked-steps strong{display:block;color:var(--teal);font-size:.76rem;letter-spacing:.05em;text-transform:uppercase}.worked-steps p{margin:6px 0 0}.worked-steps pre{width:100%;min-width:0;max-width:100%;margin:9px 0 0;padding:15px;overflow-x:auto;background:#101c2c;color:#eef5f7;font:700 .82rem/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre}.exam-question+.exam-question{margin-top:34px;padding-top:34px;border-top:2px solid var(--line-dark)}.exam-question h3{color:var(--navy-dark)}.section-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;border:1px solid var(--line-dark);background:var(--line-dark)}.section-grid article{display:flex;min-width:0;min-height:220px;flex-direction:column;padding:24px;background:white}.section-grid p{margin:0;color:var(--teal);font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.section-grid h3{margin:8px 0;font-size:1.4rem;overflow-wrap:anywhere}.section-grid span{color:var(--ink-soft);font-size:.86rem;overflow-wrap:anywhere}.section-grid a{margin-top:auto;padding-top:22px;color:var(--teal);font-weight:800}.gateway-sequence{padding-top:0}.gateway-grid article{min-height:260px}.migration-notice{max-width:900px;margin:72px auto}.migration-link{display:inline-flex;margin-top:20px;padding:13px 18px;background:var(--teal);color:white;font-weight:800}.migration-options{display:grid;gap:12px;margin:30px 0;padding:0;list-style:none}.migration-options a{display:flex;justify-content:space-between;gap:18px;padding:18px;border:1px solid var(--line-dark);background:white}.migration-options span{color:var(--ink-soft)}.topology-precise{grid-column:1/-1;min-width:0}.topology-precise .visual-scroll{max-width:100%;overflow-x:auto}.topology-precise img{min-width:720px}.all-lessons-heading{margin:72px 0 26px}.course-sequence>ol{border-top:1px solid var(--line-dark)}@media(max-width:820px){.section-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.course-hero h1{font-size:3rem;overflow-wrap:anywhere}.section-grid{grid-template-columns:1fr}.material-list li{grid-template-columns:1fr;gap:6px}.reviewed-visual img{min-width:680px}.visual-scroll::after{content:'Swipe horizontally to inspect the full visual →';display:block;padding:8px;color:var(--teal);font-size:.72rem;font-weight:700}.migration-options a{align-items:flex-start;flex-direction:column}}`;

mkdirSync(outRoot, { recursive: true });
for (const [name, svg] of Object.entries(mechanismDiagramFiles())) write(join(root, "web/assets/course-v3/mechanisms", name), svg);
for (const [name, svg] of Object.entries(section4DiagramFiles)) write(join(root, "web/assets/course-v3/section-4", name), svg);
for (const [name, svg] of Object.entries(section1DiagramFiles())) write(join(root, "web/assets/course-v3/section-1", name), svg);
for (const [name, svg] of Object.entries(section8DiagramFiles())) write(join(root, "web/assets/course-v3/section-8", name), svg);
for (const [name, svg] of Object.entries(section11DiagramFiles())) write(join(root, "web/assets/course-v3/section-11", name), svg);
for (const [name, svg] of Object.entries(section9DiagramFiles())) write(join(root, "web/assets/course-v3/section-9", name), svg);
for (const [name, svg] of Object.entries(section12DiagramFiles())) write(join(root, "web/assets/course-v3/section-12", name), svg);
for (const [name, svg] of Object.entries(section10DiagramFiles())) write(join(root, "web/assets/course-v3/section-10", name), svg);
for (const [name, svg] of Object.entries(section6DiagramFiles())) write(join(root, "web/assets/course-v3/section-6", name), svg);
write(join(outRoot, "course.css"), globalCss + `
/* Authored core explanations and mechanism diagrams */
.core-block + .core-block{margin-top:20px}.core-block h5{margin:0 0 8px;font:700 1rem/1.4 system-ui,sans-serif;color:var(--navy-dark)}
.core-block ul,.core-block ol{margin:0;padding-left:1.4em}.core-block li{padding-left:.2em;margin-bottom:10px;line-height:1.65}.core-block li:last-child{margin-bottom:0}.core-block li strong{color:var(--navy-dark)}
.core-block table{width:100%;min-width:600px;border-collapse:collapse;font-size:.93rem;line-height:1.5}.core-block th,.core-block td{padding:12px;text-align:left;vertical-align:top;border:1px solid var(--line-dark)}.core-block thead{background:var(--navy);color:white}.core-block tbody th{background:var(--blue-pale)}
.knowledge-unit .mechanism-visual img{width:100%;min-width:760px;max-width:100%;height:auto}.mechanism-visual .visual-scroll{background:white}.mechanism-visual figcaption{max-width:85ch}
@media(max-width:520px){.core-block th,.core-block td{padding:10px}.core-block li{line-height:1.58}
.core-block .core-pair-table,.core-pair-table tbody,.core-pair-table tr{display:block;min-width:0;width:100%}.core-pair-table thead{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}.core-pair-table tbody th,.core-pair-table td{display:block;width:100%}.core-pair-table tbody th{border-bottom:0}.core-pair-table td{border-top:0}.core-pair-table tr+tr{margin-top:12px}.core-block:has(.core-pair-table) .swipe-cue{display:none}}
`);
write(join(outRoot, "course.js"), sourceJs);
write(join(outRoot, "index.html"), renderCourseIndex());
for (const [index, lesson] of courseV3Lessons.entries()) write(join(outRoot, lesson.route, "index.html"), renderLesson(lesson, index));
for (const section of Object.keys(sectionMeta).map(Number)) write(join(outRoot, `section-${section}`, "index.html"), renderSectionIndex(section));
write(join(root, "web", "index.html"), renderGateway());
write(join(root, "web", "assessments", "index.html"), renderAssessmentBank());
const assessmentMarkdownPath = join(root, "assessments", "assessment-bank.md");
let assessmentMarkdown = readFileSync(assessmentMarkdownPath, "utf8");
const assessmentTableMarkdown = (t) => `${t.title}\n\n| ${t.headers.join(" | ")} |\n| ${t.headers.map(() => "---").join(" | ")} |\n${t.rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}\n\n`;
const renderAssessmentQuestionMarkdown = (question, index) => `### ${index + 1}. ${question.commandWord} - ${question.marks} marks\n\n${question.prompt}\n\n${question.code ? `${question.codeCaption}\n\n\`\`\`text\n${question.code}\n\`\`\`\n\n` : ""}${[...(question.table ? [question.table] : []), ...(question.tables ?? [])].map(assessmentTableMarkdown).join("")}**Answer and guidance:**\n\n${question.answerCode ? `\`\`\`${question.answerLanguage ?? "sql"}\n${question.answerCode}\n\`\`\`\n\n` : ""}${question.answerTable ? assessmentTableMarkdown(question.answerTable) : ""}${question.answerPoints.map((point) => `- ${point}`).join("\n")}\n\n${question.guidance}\n`;
for (const section of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
  const check = assessmentBank.sets.find((set) => set.id === `SECTION-${section}-CHECK`);
  const pattern = new RegExp(`^## Section ${section}:[\\s\\S]*?(?=^## ${section === 12 ? "Paper 1" : `Section ${section + 1}:`})`, "m");
  if (!pattern.test(assessmentMarkdown)) throw new Error(`S${section} Assessment Bank Markdown section is missing`);
  const markdown = `## ${check.title} (${check.totalMarks} marks)\n\n${check.questions.map(renderAssessmentQuestionMarkdown).join("\n")}\n`;
  assessmentMarkdown = assessmentMarkdown.replace(pattern, () => markdown);
}
const paper1S3 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-3");
const paper1Start = assessmentMarkdown.indexOf("## Paper 1 original cumulative mock");
if (paper1Start < 0) throw new Error("Paper 1 Assessment Bank Markdown section is missing");
const paper1Prefix = assessmentMarkdown.slice(0, paper1Start);
const paper1Markdown = assessmentMarkdown.slice(paper1Start);
if (!/^### 3\.[\s\S]*?(?=^### 4\.)/m.test(paper1Markdown)) throw new Error("Paper 1 S3 question is missing");
assessmentMarkdown = paper1Prefix + paper1Markdown.replace(/^### 3\.[\s\S]*?(?=^### 4\.)/m, () => renderAssessmentQuestionMarkdown(paper1S3, 2) + "\n");
const paper1S1 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-1");
assessmentMarkdown = assessmentMarkdown.replace(/(^## Paper 1[^\n]*\n\n)### 1\.[\s\S]*?(?=^### 2\.)/m, (_, heading) => `${heading}${renderAssessmentQuestionMarkdown(paper1S1, 0)}\n`);
const paper1S5 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-5");
const paper1S5Start = assessmentMarkdown.indexOf("## Paper 1 original cumulative mock");
const paper1S5Body = assessmentMarkdown.slice(paper1S5Start);
if (!/^### 5\.[\s\S]*?(?=^### 6\.)/m.test(paper1S5Body)) throw new Error("Paper 1 S5 question is missing");
assessmentMarkdown = assessmentMarkdown.slice(0, paper1S5Start) + paper1S5Body.replace(/^### 5\.[\s\S]*?(?=^### 6\.)/m, () => renderAssessmentQuestionMarkdown(paper1S5, 4) + "\n");
const paper1S6 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-6");
const paper1S6Start = assessmentMarkdown.indexOf("## Paper 1 original cumulative mock");
const paper1S6Body = assessmentMarkdown.slice(paper1S6Start);
if (!/^### 6\.[\s\S]*?(?=^### 7\.)/m.test(paper1S6Body)) throw new Error("Paper 1 S6 question is missing");
assessmentMarkdown = assessmentMarkdown.slice(0, paper1S6Start) + paper1S6Body.replace(/^### 6\.[\s\S]*?(?=^### 7\.)/m, () => renderAssessmentQuestionMarkdown(paper1S6, 5) + "\n");
const paper1S7 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-7");
const paper1S7Start = assessmentMarkdown.indexOf("## Paper 1 original cumulative mock");
const paper1S7Body = assessmentMarkdown.slice(paper1S7Start);
if (!/^### 7\.[\s\S]*?(?=^### 8\.)/m.test(paper1S7Body)) throw new Error("Paper 1 S7 question is missing");
assessmentMarkdown = assessmentMarkdown.slice(0, paper1S7Start) + paper1S7Body.replace(/^### 7\.[\s\S]*?(?=^### 8\.)/m, () => renderAssessmentQuestionMarkdown(paper1S7, 6) + "\n");
const paper1S4 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-4");
const paper1OffsetS4 = assessmentMarkdown.indexOf("## Paper 1 original cumulative mock");
const paper1TailS4 = assessmentMarkdown.slice(paper1OffsetS4);
if (!/^### 4\.[\s\S]*?(?=^### 5\.)/m.test(paper1TailS4)) throw new Error("Paper 1 S4 question is missing");
assessmentMarkdown = assessmentMarkdown.slice(0, paper1OffsetS4) + paper1TailS4.replace(/^### 4\.[\s\S]*?(?=^### 5\.)/m, () => renderAssessmentQuestionMarkdown(paper1S4, 3) + "\n");
const paper1S8 = assessmentBank.sets.find((set) => set.id === "PAPER-1-MOCK").questions.find((question) => question.id === "A-P1-8");
const paper1S8Start = assessmentMarkdown.indexOf("## Paper 1 original cumulative mock");
const paper1S8Body = assessmentMarkdown.slice(paper1S8Start);
if (!/^### 8\.[\s\S]*?(?=^## Paper 2)/m.test(paper1S8Body)) throw new Error("S8 mock Markdown question is missing");
assessmentMarkdown = assessmentMarkdown.slice(0, paper1S8Start) + paper1S8Body.replace(/^### 8\.[\s\S]*?(?=^## Paper 2)/m, () => renderAssessmentQuestionMarkdown(paper1S8, 7) + "\n");
for (const number of [1, 2, 3, 4, 5, 6, 7, 8]) {
  const question = assessmentBank.sets.find(set=>set.id === "PAPER-2-MOCK").questions.find(q=>q.id === `A-P2-${number}`);
  const start = assessmentMarkdown.indexOf("## Paper 2 original cumulative mock");
  if (start < 0) throw new Error("Paper 2 Assessment Bank Markdown section is missing");
  const body = assessmentMarkdown.slice(start);
  const pattern = new RegExp(`^### ${number}\\.[\\s\\S]*?${number === 8 ? "$(?![\\s\\S])" : `(?=^### ${number + 1}\\.)`}`, "m");
  if (!pattern.test(body)) throw new Error(`Paper 2 question ${number} is missing`);
  assessmentMarkdown = assessmentMarkdown.slice(0, start) + body.replace(pattern,()=>renderAssessmentQuestionMarkdown(question,number-1)+"\n");
}
write(assessmentMarkdownPath, `${assessmentMarkdown.trimEnd()}\n`);
write(join(root, "scripts", "assessment-bank-contract.json"), `${JSON.stringify(assessmentBank, null, 2)}\n`);

// Keep old S2 bookmarks on the same authored content as the active course.
for (const lesson of courseV3Lessons.filter((item) => item.section === 2)) {
  const unitNumber = lesson.lessonKey.match(/L(\d+)$/)[1];
  const href = `../../${lesson.route}/`;
  write(join(outRoot, "section-2", `unit-${unitNumber}`, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(lesson.title)} · AS 9618</title><link rel="icon" href="data:"><link rel="canonical" href="${href}"><meta http-equiv="refresh" content="0; url=${href}"></head><body><main><h1>This lesson has moved.</h1><p><a href="${href}">Open the current lesson: ${escapeHtml(lesson.title)}</a></p></main></body></html>`);
}

for (let oldLesson = 1; oldLesson <= legacyMigration.sourceLessonCount; oldLesson += 1) {
  write(join(root, "web", `lesson-${String(oldLesson).padStart(3, "0")}`, "index.html"), renderLegacyEntry(oldLesson));
}

const requirementOwners = new Map();
for (const lesson of courseV3Lessons.filter((item) => item.kind === "teaching")) for (const id of lesson.syllabusIds) {
  const owners = requirementOwners.get(id) ?? [];
  owners.push(lesson.route);
  requirementOwners.set(id, owners);
}
const unitAssets = courseV3Lessons.flatMap((lesson) => lesson.units.flatMap((unit) => unitMaterials(unit).flatMap((material) => {
  if (material.type === "topology-gallery") return material.entries.map((entry) => webAssetPath(entry[1], lesson.section));
  return material.asset ? [webAssetPath(material.asset, lesson.section)] : [];
})));
const questionAssets = courseV3Lessons.flatMap((lesson) => [...lesson.practice, ...lesson.examStyleQuestions].flatMap((question) => [question.diagram, question.answerDiagram].filter(Boolean).map(asset=>webAssetPath(asset, lesson.section))));
const assets = [...new Set([...unitAssets, ...questionAssets])];
for (const asset of assets) if (!existsSync(join(reviewedAssetRoot, asset.replace(/^\//, "")))) throw new Error(`Missing V3 asset ${asset}`);

const contract = {
  ...courseV3Meta,
  generatedAt: "deterministic",
  syllabusOrder: Object.keys(officialAsMapping),
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
      materialTitles: lesson.units.flatMap((unit) => unitMaterials(unit).filter((material) => material.objectiveIds.includes(id)).map((material) => material.title)),
      questionIds: lesson.practice.filter((question) => question.objectiveIds.includes(id)).map((question) => question.id),
      pastPaperAnalysis: lesson.examStyleQuestions.filter((question) => question.objectiveIds.includes(id)).map((question) => question.sourceRef),
    })),
    knowledgeUnits: lesson.units.map((unit) => ({
      syllabusId: unit.syllabusId,
      heading: unit.heading,
      objectiveIds: unit.objectiveIds,
      leadVisual: { type: unit.leadVisual.type, title: unit.leadVisual.title },
      coreExplanation: unit.coreExplanation,
      ...(unit.coreBlocks ? { coreBlocks: unit.coreBlocks } : {}),
      method: unit.method ? { type: unit.method.type, title: unit.method.title } : null,
      workedExample: unit.workedExample ? { type: unit.workedExample.type, title: unit.workedExample.title } : null,
    })),
    practice: lesson.practice.map((question) => ({
      id: question.id,
      commandWord: question.commandWord,
      marks: question.marks,
      objectiveIds: question.objectiveIds,
    })),
    examStyleQuestions: lesson.examStyleQuestions.map((question) => ({
      id: question.id,
      sourceRef: question.sourceRef,
      commandWord: question.commandWord,
      marks: question.marks,
      objectiveIds: question.objectiveIds,
    })),
  })),
  assets: assets.map((asset) => ({ path: `web${asset}`, sha256: sha256(join(reviewedAssetRoot, asset.replace(/^\//, ""))) })),
};
write(join(root, "scripts", "course-v3-contract.json"), `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Rendered ${courseV3Meta.lessonCount} course pages, ${Object.keys(sectionMeta).length} sections, ${legacyMigration.sourceLessonCount} compatibility entries and ${assets.length} assets.`);
