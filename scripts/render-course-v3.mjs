import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";
import { unitMaterials } from "./course-v3-presentation.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = join(root, "web", "course-v3");
const reviewedAssetRoot = join(root, "web");
const sourceCss = readFileSync(join(root, "web", "course-v3", "section-2", "course.css"), "utf8");
const sourceJs = readFileSync(join(root, "web", "course-v3", "section-2", "course.js"), "utf8");
const legacyMigration = JSON.parse(readFileSync(join(root, "scripts", "course-v2-migration.json"), "utf8"));
const assessmentBank = JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"));

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const write = (path, contents) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, contents); };
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

function renderFlow(material) {
  return `<section class="teaching-material material-flow" data-material-type="flow" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><ol class="process-list">${material.steps.map(([heading, body]) => `<li><div><strong>${escapeHtml(heading.replace(/^\d+\s*·\s*/, ""))}</strong><span>${escapeHtml(body)}</span></div></li>`).join("")}</ol></section>`;
}

function renderAnalogy(material, section) {
  return `<figure class="teaching-material material-analogy" data-material-type="analogy" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><img src="${escapeHtml(lessonAssetSource(material.asset, section))}" alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async"><figcaption>${escapeHtml(material.caption)}</figcaption><aside class="analogy-boundary"><strong>Analogy boundary</strong><p>${escapeHtml(material.boundary)}</p></aside></figure>`;
}

function renderWorkedExample(material) {
  return `<section class="teaching-material worked-example" data-material-type="worked-example" data-objectives="${material.objectiveIds.join(" ")}"><h4>Worked example · ${escapeHtml(material.title)}</h4><ol class="worked-steps">${material.steps.map(([label, text]) => `<li><strong>${escapeHtml(label)}</strong>${text.includes("\n") ? `<pre><code>${escapeHtml(text)}</code></pre>` : `<p>${escapeHtml(text)}</p>`}</li>`).join("")}</ol></section>`;
}

function renderReviewedVisual(material, section) {
  return `<figure class="teaching-material reviewed-visual" data-material-type="reviewed-visual" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="visual-scroll"><img src="${escapeHtml(lessonAssetSource(material.asset, section))}" alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async"></div><figcaption>${escapeHtml(material.caption)}</figcaption><details class="visual-transcript"><summary>Visual transcript</summary><ul>${material.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul></details></figure>`;
}

function renderTopologyGallery(material, section) {
  return `<section class="teaching-material topology-gallery" data-material-type="topology-gallery" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="topology-grid">${material.entries.map(([name, asset, alt, steps]) => `<article class="topology-plate"><h5>${escapeHtml(name)}</h5><img src="${escapeHtml(lessonAssetSource(asset, section))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"><ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></article>`).join("")}</div><aside class="precision-note"><strong>Technical reading rule</strong><p>The reviewed image establishes the link pattern. The numbered path is authoritative: count each physical segment and name every forwarding device.</p></aside></section>`;
}

function renderReservoir(material, section) {
  return `<figure class="teaching-material material-reservoir" data-material-type="reservoir" data-objectives="${material.objectiveIds.join(" ")}"><h4>${escapeHtml(material.title)}</h4><div class="reservoir-stage"><img src="${escapeHtml(lessonAssetSource(material.asset, section))}" alt="A reservoir with an inlet, stored water and an outlet, used only as an analogy for a streaming buffer." loading="lazy" decoding="async"><span class="reservoir-label label-in">arrival rate</span><span class="reservoir-label label-level">buffer level</span><span class="reservoir-label label-out">playback bit rate</span></div><figcaption>Data arriving from the network fills the buffer; playback drains it at the media bit rate.</figcaption><aside class="analogy-boundary"><strong>Critical limit</strong><p>If the long-term arrival rate is lower than the playback bit rate, any finite buffer eventually empties. A larger buffer delays the pause; it cannot repair sustained insufficient input.</p></aside></figure>`;
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
  if (material.type === "reviewed-visual") return renderReviewedVisual(material, section);
  if (material.type === "topology-gallery") return renderTopologyGallery(material, section);
  if (material.type === "reservoir") return renderReservoir(material, section);
  if (material.type === "address-demo") return renderAddressDemo(material);
  if (material.type === "url-demo") return renderUrlDemo(material);
  throw new Error(`Unsupported material type: ${material.type}`);
}

function renderUnit(unit, unitIndex, lesson) {
  return `<article class="knowledge-unit" data-unit-index="${unitIndex + 1}" data-syllabus-id="${escapeHtml(unit.syllabusId)}" data-objectives="${unit.objectiveIds.join(" ")}"><header class="unit-heading"><span class="section-number">${String(unitIndex + 1).padStart(2, "0")}</span><div><h3>${escapeHtml(unit.heading)}</h3><div class="objective-row">${objectiveBadges(unit.objectiveIds)}</div></div></header><div class="lead-visual" data-role="lead-visual"><p class="unit-stage-label">Visual overview</p>${renderMaterial(unit.leadVisual, lesson.section)}</div><section class="explanation-copy core-explanation" data-role="core-explanation"><h4>Core explanation</h4>${unit.coreExplanation.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</section>${unit.method ? `<div class="unit-method" data-role="method">${renderMaterial(unit.method, lesson.section)}</div>` : ""}${unit.workedExample ? `<div class="unit-worked-example" data-role="worked-example">${renderMaterial(unit.workedExample, lesson.section)}</div>` : ""}<aside class="misconception"><strong>Common misconception</strong>${unit.misconceptions.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</aside></article>`;
}

function renderPractice(question) {
  return `<article class="practice-question" data-question-id="${escapeHtml(question.id)}" data-command-word="${escapeHtml(question.commandWord)}" data-objectives="${question.objectiveIds.join(" ")}"><header><span>Command word: ${escapeHtml(question.commandWord)}</span><strong>${question.marks} marks</strong></header><p class="question-prompt">${escapeHtml(question.prompt)}</p><div class="objective-row">${objectiveBadges(question.objectiveIds)}</div><details><summary>Answer and marking points</summary><ol>${question.answerPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol><p class="common-error"><strong>Common error:</strong> ${escapeHtml(question.commonError)}</p></details></article>`;
}

function renderPastPaper(pastPaper) {
  return `<article class="past-paper" data-source-ref="${escapeHtml(pastPaper.sourceRef)}" data-command-word="${escapeHtml(pastPaper.commandWord)}" data-objectives="${pastPaper.objectiveIds.join(" ")}"><div class="paper-source"><div><span>Source index</span><strong>${escapeHtml(pastPaper.sourceRef)}</strong></div><a href="${escapeHtml(pastPaper.accessUrl)}" target="_blank" rel="noreferrer">Official Cambridge access page ↗</a></div><p class="copyright-note">This is an original exam-style task. It does not reproduce Cambridge question or mark-scheme wording.</p><h3>Command word: ${escapeHtml(pastPaper.commandWord)}</h3><p class="paper-task">${escapeHtml(pastPaper.task)}</p><section class="paper-marking-points"><h4>Marking points</h4><ul>${pastPaper.markLogic.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section></article>`;
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
  return pageShell({ title: `${lesson.lessonKey} ${lesson.title}`, description: lesson.subtitle, body: `${renderHeader(lesson)}<main><section class="lesson-hero"><p class="eyebrow">Lesson ${String(lesson.sequenceIndex).padStart(3, "0")} · ${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h1>${escapeHtml(lesson.title)}</h1><p class="lead">${escapeHtml(lesson.subtitle)}</p><div class="objective-ledger"><h2>Learning objectives</h2><ul>${lesson.objectives.map(([id, text]) => `<li data-objective-id="${id}"><span>${id}</span>${escapeHtml(text)}</li>`).join("")}</ul></div></section>
  <section class="lesson-stage" id="visual-and-core" data-stage="1-visual-and-core"><header class="stage-heading"><span>01</span><div><p>Concept teaching</p><h2>Visual overview and core explanation</h2></div></header>${lesson.units.map((unit, unitIndex) => renderUnit(unit, unitIndex, lesson)).join("")}</section>
  <section class="lesson-stage" id="practice" data-stage="2-practice"><header class="stage-heading"><span>02</span><div><p>Cambridge command words</p><h2>Practice questions</h2></div></header><div class="practice-stack">${lesson.practice.map(renderPractice).join("")}</div></section>
  <section class="lesson-stage" id="original-exam-style-question" data-stage="3-original-exam-style-question"><header class="stage-heading"><span>03</span><div><p>Exam response</p><h2>Original exam-style question and marking points</h2></div></header>${renderPastPaper(lesson.pastPaper)}</section>
  <section class="lesson-stage" id="summary" data-stage="4-summary"><header class="stage-heading"><span>04</span><div><p>Lesson review</p><h2>Summary</h2></div></header><div class="summary-grid">${lesson.summary.map(([heading, body]) => `<article><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}</div><details class="source-note"><summary>Syllabus scope and sources</summary><ul>${lesson.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul></details></section></main><nav class="lesson-pagination" aria-label="Lesson navigation">${navLink(previous, "Previous")}${navLink(next, "Next")}</nav><footer><p>Cambridge International AS Level Computer Science 9618 · 2027–2029</p></footer>` });
}

function renderCourseIndex() {
  const teachingCount = courseV3Lessons.filter((lesson) => lesson.kind === "teaching").length;
  return pageShell({ title: "AS 9618 visual teaching course", description: "Complete AS Sections 1–12 in official order with visual materials, practice and exam-style questions.", depth: "root", body: `<header class="site-header"><a class="brand" href="./"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Visual course</strong></a></header><main><section class="course-hero"><p class="eyebrow">2027–2029 syllabus · AS Sections 1–12</p><h1>Teach every requirement.</h1><p class="lead">Each knowledge unit begins with a visual overview, followed by its core explanation, any required method or worked example, practice questions and a concise summary.</p><div class="coverage-band"><strong>121/121 requirements</strong><span>${teachingCount} teaching lessons</span><span>2 integrated reviews</span><span>official order</span></div></section><section class="course-sequence"><header><p>Course sequence</p><h2>Paper 1 foundations · Paper 2 problem-solving</h2></header><div class="section-grid">${Object.entries(sectionMeta).map(([section, meta]) => { const lessons = courseV3Lessons.filter((lesson) => lesson.section === Number(section)); return `<article><p>Paper ${meta.paper} · Section ${section}</p><h3>${escapeHtml(meta.title)}</h3><span>${lessons.length} lessons · ${lessons.flatMap((lesson) => lesson.syllabusIds).length} requirements</span><a href="section-${section}/">Open section →</a></article>`; }).join("")}</div><h2 class="all-lessons-heading">Complete numbered sequence</h2><ol>${courseV3Lessons.map((lesson) => `<li><a href="${lesson.route}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(3, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section></main><footer><p>Cambridge International AS Level Computer Science 9618 · 2027–2029</p></footer>` });
}

function renderSectionIndex(section) {
  const meta = sectionMeta[section];
  const lessons = courseV3Lessons.filter((lesson) => lesson.section === section);
  return pageShell({ title: `Section ${section} ${meta.title}`, description: `Section ${section} lessons in official syllabus order.`, body: `${renderHeader({ section })}<main><section class="course-hero"><p class="eyebrow">Paper ${meta.paper} · Section ${section}</p><h1>${escapeHtml(meta.title)}</h1><p class="lead">${lessons.length} continuous teaching units. Every knowledge unit presents its visual overview before the core explanation and maps practice to explicit objectives.</p><div class="coverage-band"><strong>${lessons.length} lessons</strong><span>${lessons.flatMap((lesson) => lesson.syllabusIds).length} requirements</span><span>default-visible teaching</span><span>responsive materials</span></div></section><section class="course-sequence"><header><p>Official sequence</p><h2>Teach the section in order</h2></header><ol>${lessons.map((lesson) => `<li><a href="../${lesson.route}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(3, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section></main><footer><p>AS 9618 · Section ${section} ${escapeHtml(meta.title)}</p></footer>` });
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
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AS 9618 Assessment Bank</title><link rel="icon" href="data:"><link rel="stylesheet" href="../academic-theme.css?v=7"><link rel="stylesheet" href="../course-v2.css?v=3"></head><body><header class="v2-topbar"><div><p class="v2-eyebrow">Cambridge International AS Level</p><h1>Assessment Bank</h1></div><nav class="v2-actions"><a href="../">Course home</a></nav></header><main class="v2-content" style="width:min(1100px,100%);margin:0 auto;padding:24px 14px 56px"><section class="v2-hero"><div><p class="v2-eyebrow">14 original cumulative sets</p><h2>Section checks and paper-level practice</h2><p>Each question begins with a Cambridge command word. Answers are separated into guidance and marking points.</p></div><div class="v2-time-grid"><div><strong>12</strong><span>section checks</span></div><div><strong>2</strong><span>paper mocks</span></div></div></section>${assessmentBank.sets.map((set) => `<section class="v2-panel"><div class="v2-heading"><p class="v2-eyebrow">${set.totalMarks} marks</p><h2>${escapeHtml(set.title)}</h2></div>${set.questions.map((question, index) => { const prompt = assessmentPrompt(question); const commandWord = prompt.match(/^(Explain|Compare|Describe|State|Identify|Suggest|Justify|Evaluate|Write|Calculate|Draw|Give)\b/i)?.[1] ?? "Explain"; return `<article class="v2-question"><div class="v2-question-head"><span class="v2-badge">Command word: ${escapeHtml(sentenceCase(commandWord))}</span><span class="v2-badge">${question.marks} marks</span></div><p><strong>${index + 1}.</strong> ${escapeHtml(prompt)}</p><details><summary>Answer and marking guidance</summary><div class="v2-answer-grid"><p>${escapeHtml(assessmentAnswer(question.answer))}</p><p>${escapeHtml(question.guidance)}</p></div></details></article>`; }).join("")}</section>`).join("")}</main></body></html>`;
}

function sentenceCase(value) {
  const text = String(value ?? "");
  return text ? `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}` : text;
}

const globalCss = `${sourceCss}\n\n/* Whole-course additions */\n.lead,.stage-heading>*:last-child,.unit-heading>*:last-child,.course-sequence a>*,.worked-steps li{min-width:0}.lead,.unit-heading h3,.teaching-material>h4,.course-sequence h3,.course-sequence div>span{overflow-wrap:anywhere}.lesson-hero .objective-ledger{margin-top:34px}.lead-visual{margin-top:30px;padding:18px;border:1px solid var(--line-dark);background:#f8fbfc}.unit-stage-label{margin:0 0 12px;color:var(--teal);font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.core-explanation{margin-top:18px;padding:22px;border-left:4px solid var(--navy);background:white}.core-explanation h4{margin:0 0 10px;color:var(--navy-dark)}.unit-method,.unit-worked-example{margin-top:18px}.reviewed-visual .visual-scroll{max-width:100%;overflow-x:auto;border:1px solid var(--line);background:#fff}.reviewed-visual img{width:100%;min-width:720px;height:auto;object-fit:contain}.visual-transcript{margin-top:14px;padding:12px 14px;border-left:4px solid var(--teal);background:var(--teal-pale)}.visual-transcript summary{cursor:pointer;color:var(--navy-dark);font-weight:800}.visual-transcript ul{margin:8px 0 0;padding-left:20px;font-size:.88rem}.worked-steps{display:grid;min-width:0;gap:12px;margin:0;padding:0;list-style:none;counter-reset:worked}.worked-steps li{max-width:100%;padding:16px 18px;overflow:hidden;border-left:3px solid var(--teal);background:var(--blue-pale)}.worked-steps strong{display:block;color:var(--teal);font-size:.76rem;letter-spacing:.05em;text-transform:uppercase}.worked-steps p{margin:6px 0 0}.worked-steps pre{width:100%;min-width:0;max-width:100%;margin:9px 0 0;padding:15px;overflow-x:auto;background:#101c2c;color:#eef5f7;font:700 .82rem/1.55 ui-monospace,SFMono-Regular,Menlo,monospace;white-space:pre}.section-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;border:1px solid var(--line-dark);background:var(--line-dark)}.section-grid article{display:flex;min-width:0;min-height:220px;flex-direction:column;padding:24px;background:white}.section-grid p{margin:0;color:var(--teal);font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}.section-grid h3{margin:8px 0;font-size:1.4rem;overflow-wrap:anywhere}.section-grid span{color:var(--ink-soft);font-size:.86rem;overflow-wrap:anywhere}.section-grid a{margin-top:auto;padding-top:22px;color:var(--teal);font-weight:800}.gateway-sequence{padding-top:0}.gateway-grid article{min-height:260px}.migration-notice{max-width:900px;margin:72px auto}.migration-link{display:inline-flex;margin-top:20px;padding:13px 18px;background:var(--teal);color:white;font-weight:800}.migration-options{display:grid;gap:12px;margin:30px 0;padding:0;list-style:none}.migration-options a{display:flex;justify-content:space-between;gap:18px;padding:18px;border:1px solid var(--line-dark);background:white}.migration-options span{color:var(--ink-soft)}.all-lessons-heading{margin:72px 0 26px}.course-sequence>ol{border-top:1px solid var(--line-dark)}@media(max-width:820px){.section-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:520px){.course-hero h1{font-size:3rem;overflow-wrap:anywhere}.section-grid{grid-template-columns:1fr}.reviewed-visual img{min-width:680px}.visual-scroll::after{content:'Swipe horizontally to inspect the full visual →';display:block;padding:8px;color:var(--teal);font-size:.72rem;font-weight:700}.migration-options a{align-items:flex-start;flex-direction:column}}`;

mkdirSync(outRoot, { recursive: true });
write(join(outRoot, "course.css"), globalCss);
write(join(outRoot, "course.js"), sourceJs);
write(join(outRoot, "index.html"), renderCourseIndex());
for (const [index, lesson] of courseV3Lessons.entries()) write(join(outRoot, lesson.route, "index.html"), renderLesson(lesson, index));
for (const section of Object.keys(sectionMeta).map(Number)) write(join(outRoot, `section-${section}`, "index.html"), renderSectionIndex(section));
write(join(root, "web", "index.html"), renderGateway());
write(join(root, "web", "assessments", "index.html"), renderAssessmentBank());
for (let oldLesson = 1; oldLesson <= legacyMigration.sourceLessonCount; oldLesson += 1) {
  write(join(root, "web", `lesson-${String(oldLesson).padStart(3, "0")}`, "index.html"), renderLegacyEntry(oldLesson));
}

const requirementOwners = new Map();
for (const lesson of courseV3Lessons.filter((item) => item.kind === "teaching")) for (const id of lesson.syllabusIds) {
  const owners = requirementOwners.get(id) ?? [];
  owners.push(lesson.route);
  requirementOwners.set(id, owners);
}
const assets = [...new Set(courseV3Lessons.flatMap((lesson) => lesson.units.flatMap((unit) => unitMaterials(unit).flatMap((material) => {
  if (material.type === "topology-gallery") return material.entries.map((entry) => webAssetPath(entry[1], lesson.section));
  return material.asset ? [webAssetPath(material.asset, lesson.section)] : [];
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
      materialTitles: lesson.units.flatMap((unit) => unitMaterials(unit).filter((material) => material.objectiveIds.includes(id)).map((material) => material.title)),
      questionIds: lesson.practice.filter((question) => question.objectiveIds.includes(id)).map((question) => question.id),
      pastPaperAnalysis: lesson.pastPaper.objectiveIds.includes(id) ? lesson.pastPaper.sourceRef : null,
    })),
    knowledgeUnits: lesson.units.map((unit) => ({
      syllabusId: unit.syllabusId,
      heading: unit.heading,
      objectiveIds: unit.objectiveIds,
      leadVisual: { type: unit.leadVisual.type, title: unit.leadVisual.title },
      coreExplanation: unit.coreExplanation,
      method: unit.method ? { type: unit.method.type, title: unit.method.title } : null,
      workedExample: unit.workedExample ? { type: unit.workedExample.type, title: unit.workedExample.title } : null,
    })),
    practice: lesson.practice.map((question) => ({
      id: question.id,
      commandWord: question.commandWord,
      marks: question.marks,
      objectiveIds: question.objectiveIds,
    })),
  })),
  assets: assets.map((asset) => ({ path: `web${asset}`, sha256: sha256(join(reviewedAssetRoot, asset.replace(/^\//, ""))) })),
};
write(join(root, "scripts", "course-v3-contract.json"), `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Rendered ${courseV3Meta.lessonCount} course pages, ${Object.keys(sectionMeta).length} sections, ${legacyMigration.sourceLessonCount} compatibility entries and ${assets.length} assets.`);
