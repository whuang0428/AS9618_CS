import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { section2Lessons, section2Meta } from "./course-v3-section2-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outRoot = join(root, "web", "course-v3", "section-2");
const assetRoot = join(root, "web", "assets", "course-v3", "section-2");

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const write = (path, contents) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
};

const objectiveBadges = (ids) => ids.map((id) => `<span class="objective-badge">${escapeHtml(id)}</span>`).join("");

function renderTable(material) {
  return `<section class="teaching-material material-table" data-material-type="table" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <div class="table-scroll" role="region" aria-label="${escapeHtml(material.title)}" tabindex="0">
      <table>
        <thead><tr>${material.headers.map((cell) => `<th scope="col">${escapeHtml(cell)}</th>`).join("")}</tr></thead>
        <tbody>${material.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
    <p class="swipe-cue" aria-hidden="true">Swipe horizontally to compare every column →</p>
  </section>`;
}

function renderCards(material) {
  return `<section class="teaching-material material-cards" data-material-type="cards" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <div class="concept-grid">${material.items.map(([heading, body]) => `<article><h5>${escapeHtml(heading)}</h5><p>${escapeHtml(body)}</p></article>`).join("")}</div>
  </section>`;
}

function renderFlow(material) {
  return `<section class="teaching-material material-flow" data-material-type="flow" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <ol class="process-list">${material.steps.map(([heading, body]) => `<li><div><strong>${escapeHtml(heading.replace(/^\d+\s*·\s*/, ""))}</strong><span>${escapeHtml(body)}</span></div></li>`).join("")}</ol>
  </section>`;
}

function renderAnalogy(material) {
  return `<figure class="teaching-material material-analogy" data-material-type="analogy" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <img src="../../../assets/course-v3/section-2/${escapeHtml(material.asset)}" alt="${escapeHtml(material.alt)}" loading="lazy" decoding="async">
    <figcaption>${escapeHtml(material.caption)}</figcaption>
    <aside class="analogy-boundary"><strong>Analogy boundary</strong><p>${escapeHtml(material.boundary)}</p></aside>
  </figure>`;
}

function renderTopologyGallery(material) {
  return `<section class="teaching-material topology-gallery" data-material-type="topology-gallery" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <div class="topology-grid">${material.entries.map(([name, asset, alt, steps]) => `<article class="topology-plate">
      <h5>${escapeHtml(name)}</h5>
      <img src="../../../assets/course-v3/section-2/${escapeHtml(asset)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">
      <ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    </article>`).join("")}</div>
    <aside class="precision-note"><strong>Technical reading rule</strong><p>The image establishes the link pattern. The numbered path below it is authoritative: count each physical segment and name every forwarding device.</p></aside>
  </section>`;
}

function renderReservoir(material) {
  return `<figure class="teaching-material material-reservoir" data-material-type="reservoir" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <div class="reservoir-stage">
      <img src="../../../assets/course-v3/section-2/${escapeHtml(material.asset)}" alt="A reservoir with an inlet pipe, stored water and an outlet pipe, used only as an analogy for a streaming buffer." loading="lazy" decoding="async">
      <span class="reservoir-label label-in">arrival rate</span>
      <span class="reservoir-label label-level">buffer level</span>
      <span class="reservoir-label label-out">playback bit rate</span>
    </div>
    <figcaption>Data arriving from the network fills the buffer; playback drains it at the media bit rate.</figcaption>
    <aside class="analogy-boundary"><strong>Critical limit</strong><p>If the long-term arrival rate is lower than the playback bit rate, any finite buffer eventually empties. A larger buffer delays the pause; it cannot repair sustained insufficient input.</p></aside>
  </figure>`;
}

function renderAddressDemo(material) {
  const entries = [
    { label: "IPv4", bits: "32 bits · four decimal octets", example: material.ipv4.join("."), note: "Each octet represents 8 bits and is written from 0 to 255." },
    { label: "IPv6", bits: "128 bits · eight hexadecimal groups", example: material.ipv6.join(":"), note: "Each full group represents 16 bits; hexadecimal digits compact the notation." },
  ];
  return `<section class="teaching-material address-demo" data-material-type="address-demo" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <div class="address-plates">${entries.map((entry) => `<article>
      <header><strong>${escapeHtml(entry.label)}</strong><span>${escapeHtml(entry.bits)}</span></header>
      <code>${escapeHtml(entry.example)}</code>
      <p>${escapeHtml(entry.note)}</p>
    </article>`).join("")}</div>
  </section>`;
}

function renderUrlDemo(material) {
  const parts = [
    ["Scheme", `${material.scheme}://`],
    ["Domain", material.domain],
    ["Path", material.path],
    ["Query", material.query],
    ["Fragment", material.fragment],
  ];
  return `<section class="teaching-material url-demo" data-material-type="url-demo" data-objectives="${material.objectiveIds.join(" ")}">
    <h4>${escapeHtml(material.title)}</h4>
    <div class="url-strip" aria-label="URL split into scheme, domain, path, query and fragment">${parts.map(([label, value]) => `<span><small>${label}</small><code>${escapeHtml(value)}</code></span>`).join("")}</div>
    <p class="precision-note"><strong>DNS reads the domain:</strong> ${escapeHtml(material.domain)}. The browser, not DNS, uses the remaining URL parts.</p>
  </section>`;
}

function renderMaterial(material) {
  if (material.type === "table") return renderTable(material);
  if (material.type === "cards") return renderCards(material);
  if (material.type === "flow") return renderFlow(material);
  if (material.type === "analogy") return renderAnalogy(material);
  if (material.type === "topology-gallery") return renderTopologyGallery(material);
  if (material.type === "reservoir") return renderReservoir(material);
  if (material.type === "address-demo") return renderAddressDemo(material);
  if (material.type === "url-demo") return renderUrlDemo(material);
  throw new Error(`Unsupported material type: ${material.type}`);
}

function renderUnit(unit, unitIndex) {
  return `<article class="knowledge-unit" data-unit-index="${unitIndex + 1}" data-objectives="${unit.objectiveIds.join(" ")}">
    <header class="unit-heading">
      <span class="section-number">${String(unitIndex + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(unit.heading)}</h3><div class="objective-row">${objectiveBadges(unit.objectiveIds)}</div></div>
    </header>
    <div class="explanation-copy">${unit.explanation.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
    <div class="materials-stack">${unit.materials.map(renderMaterial).join("")}</div>
    <aside class="misconception"><strong>Common misconception</strong>${unit.misconceptions.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</aside>
    <details class="teacher-note"><summary>教师讲法 / 易错点</summary><p lang="zh-Hans">${escapeHtml(unit.teacherNote)}</p></details>
  </article>`;
}

function renderPractice(question) {
  return `<article class="practice-question" data-question-id="${question.id}" data-objectives="${question.objectiveIds.join(" ")}">
    <header><span>${escapeHtml(question.type)}</span><strong>${question.marks} marks</strong></header>
    <p class="question-prompt">${escapeHtml(question.prompt)}</p>
    <div class="objective-row">${objectiveBadges(question.objectiveIds)}</div>
    <details><summary>Answer and marking points</summary><ol>${question.answerPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol><p class="common-error"><strong>Common error:</strong> ${escapeHtml(question.commonError)}</p></details>
  </article>`;
}

function renderPastPaper(pastPaper) {
  return `<article class="past-paper" data-source-ref="${escapeHtml(pastPaper.sourceRef)}" data-objectives="${pastPaper.objectiveIds.join(" ")}">
    <div class="paper-source"><div><span>Source index</span><strong>${escapeHtml(pastPaper.sourceRef)}</strong></div><a href="${escapeHtml(pastPaper.accessUrl)}" target="_blank" rel="noreferrer">Official Cambridge access page ↗</a></div>
    <p class="copyright-note">This is an original, structurally equivalent task. It does not reproduce Cambridge question or mark-scheme wording.</p>
    <h3>Original equivalent task</h3><p class="paper-task">${escapeHtml(pastPaper.task)}</p>
    <div class="analysis-columns">
      <section><h4>Build the answer</h4><ol>${pastPaper.build.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol></section>
      <section><h4>How marks are earned</h4><ul>${pastPaper.markLogic.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section>
      <section><h4>Common losses</h4><ul>${pastPaper.commonLosses.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></section>
    </div>
  </article>`;
}

function pageShell({ title, description, body, depth = "unit" }) {
  const prefix = depth === "unit" ? "../" : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHtml(description)}">
  <title>${escapeHtml(title)} · AS 9618 Communication</title>
  <link rel="stylesheet" href="${prefix}course.css?v=20260901c">
  <script src="${prefix}course.js?v=20260901c" defer></script>
</head>
<body>
${body}
</body>
</html>`;
}

function renderLesson(lesson, index) {
  const previous = section2Lessons[index - 1];
  const next = section2Lessons[index + 1];
  const navLink = (target, label) => target ? `<a href="../unit-${String(target.sequenceIndex).padStart(2, "0")}/"><span>${label}</span><strong>${escapeHtml(target.lessonKey)} · ${escapeHtml(target.title)}</strong></a>` : `<a href="../"><span>${label}</span><strong>Section 2 overview</strong></a>`;
  return pageShell({
    title: `${lesson.lessonKey} ${lesson.title}`,
    description: lesson.subtitle,
    body: `<header class="site-header"><a class="brand" href="../"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Section 2</strong></a><button class="menu-button" aria-expanded="false" aria-controls="lesson-menu">Contents</button><nav id="lesson-menu">${section2Lessons.map((item) => `<a ${item.lessonKey === lesson.lessonKey ? 'aria-current="page"' : ""} href="../unit-${String(item.sequenceIndex).padStart(2, "0")}/">${item.lessonKey}</a>`).join("")}</nav></header>
<main>
  <section class="lesson-hero">
    <p class="eyebrow">${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p>
    <h1>${escapeHtml(lesson.title)}</h1>
    <p class="lead">${escapeHtml(lesson.subtitle)}</p>
  </section>
  <section class="lesson-stage stage-guide" id="guiding-question" data-stage="1-guiding-question">
    <header class="stage-heading"><span>01</span><div><p>Knowledge-point guiding question</p><h2>Start with the design problem</h2></div></header>
    <blockquote>${escapeHtml(lesson.guidingQuestion)}</blockquote>
    <details class="diagnostic"><summary>Prior-knowledge diagnostic</summary><p><strong>Prompt:</strong> ${escapeHtml(lesson.diagnostic.prompt)}</p><p><strong>Check:</strong> ${escapeHtml(lesson.diagnostic.answer)}</p></details>
    <div class="objective-ledger"><h3>By the end, you can</h3><ul>${lesson.objectives.map(([id, text]) => `<li data-objective-id="${id}"><span>${id}</span>${escapeHtml(text)}</li>`).join("")}</ul></div>
  </section>
  <section class="lesson-stage" id="knowledge-explanation" data-stage="2-knowledge-explanation">
    <header class="stage-heading"><span>02</span><div><p>Knowledge explanation</p><h2>Explain, model and compare</h2></div></header>
    ${lesson.units.map(renderUnit).join("")}
  </section>
  <section class="lesson-stage" id="practice" data-stage="3-practice">
    <header class="stage-heading"><span>03</span><div><p>Practice</p><h2>Retrieve, apply, then answer like an exam</h2></div></header>
    <div class="practice-stack">${lesson.practice.map(renderPractice).join("")}</div>
  </section>
  <section class="lesson-stage" id="past-paper-analysis" data-stage="4-past-paper-analysis">
    <header class="stage-heading"><span>04</span><div><p>Past-paper analysis</p><h2>Build an answer from the mark logic</h2></div></header>
    ${renderPastPaper(lesson.pastPaper)}
  </section>
  <section class="lesson-stage" id="summary" data-stage="5-summary">
    <header class="stage-heading"><span>05</span><div><p>Summary</p><h2>The decision frame for this lesson</h2></div></header>
    <div class="summary-grid">${lesson.summary.map(([heading, body]) => `<article><h3>${escapeHtml(heading)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}</div>
    <details class="source-note"><summary>Scope and fact-check sources</summary><ul>${lesson.sources.map((source) => `<li>${escapeHtml(source)}</li>`).join("")}</ul></details>
  </section>
</main>
<nav class="lesson-pagination" aria-label="Lesson navigation">${navLink(previous, "Previous")}${navLink(next, "Next")}</nav>
<footer><p>AS 9618 · Section 2 Communication · student text in English; teacher notes in Chinese</p></footer>`,
  });
}

function renderIndex() {
  return pageShell({
    title: "Section 2 Communication",
    description: "Eight visual teaching units covering S2.01 to S2.16 in official syllabus order.",
    depth: "index",
    body: `<header class="site-header"><a class="brand" href="./"><span>Cambridge International AS Level</span><strong>9618 Computer Science · Section 2</strong></a></header>
<main>
  <section class="course-hero"><p class="eyebrow">2027–2029 syllabus · S2.01–S2.16</p><h1>Communication</h1><p class="lead">Eight continuous, visually supported teaching units in official syllabus order. Each lesson moves from a guiding question to explanation, practice, past-paper analysis and a lesson-specific summary.</p><div class="coverage-band"><strong>16/16 requirements</strong><span>8 teaching units</span><span>default-visible explanations</span><span>desktop + mobile teaching flow</span></div></section>
  <section class="course-sequence"><header><p>Official sequence</p><h2>Teach the section from scope to addressing</h2></header><ol>${section2Lessons.map((lesson) => `<li><a href="unit-${String(lesson.sequenceIndex).padStart(2, "0")}/"><span class="course-number">${String(lesson.sequenceIndex).padStart(2, "0")}</span><div><p>${lesson.lessonKey} · ${lesson.syllabusIds.join("–")}</p><h3>${escapeHtml(lesson.title)}</h3><span>${escapeHtml(lesson.guidingQuestion)}</span></div><b aria-hidden="true">→</b></a></li>`).join("")}</ol></section>
</main>
<footer><p>Cambridge International AS Level Computer Science 9618 · Section 2 Communication</p></footer>`,
  });
}

mkdirSync(outRoot, { recursive: true });
write(join(outRoot, "index.html"), renderIndex());
for (const [index, lesson] of section2Lessons.entries()) {
  write(join(outRoot, `unit-${String(lesson.sequenceIndex).padStart(2, "0")}`, "index.html"), renderLesson(lesson, index));
}

const assetNames = [...new Set(section2Lessons.flatMap((lesson) => lesson.units.flatMap((unit) => unit.materials.flatMap((material) => {
  if (material.asset) return [material.asset];
  if (material.entries && material.type === "topology-gallery") return material.entries.map((entry) => entry[1]);
  return [];
}))))];

const contract = {
  schemaVersion: 1,
  generatedAt: "deterministic",
  section: section2Meta,
  lessons: section2Lessons.map((lesson) => ({
    lessonKey: lesson.lessonKey,
    sequenceIndex: lesson.sequenceIndex,
    route: `web/course-v3/section-2/unit-${String(lesson.sequenceIndex).padStart(2, "0")}/index.html`,
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
  assets: assetNames.map((name) => ({ name, path: `web/assets/course-v3/section-2/${name}`, sha256: sha256(join(assetRoot, name)) })),
};

write(join(root, "scripts", "course-v3-section2-contract.json"), `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Rendered ${section2Lessons.length} Section 2 lessons and ${contract.assets.length} reviewed assets.`);
