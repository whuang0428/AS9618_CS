import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { explanations } from "./stage10-explanations-data.mjs";
import { evaluateSemanticCalculation, semanticCalculations } from "./stage10-semantic-calculations.mjs";

const root = path.resolve(import.meta.dirname, "..");
const auditOnly = process.argv.includes("--audit-only");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function count(source, marker) {
  return source.split(marker).length - 1;
}

function wordCount(value) {
  return String(value).trim().split(/\s+/).filter(Boolean).length;
}

function jpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    if (!Number.isFinite(length) || length < 2) break;
    offset += length + 2;
  }
  return null;
}

function parseCsv(source) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (quoted) {
      if (char === '"' && source[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") cell += char;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function directSectionIds(source) {
  const ids = [];
  const stack = [];
  const tags = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  let match;
  while ((match = tags.exec(source))) {
    const tag = match[0];
    const name = match[1].toLowerCase();
    if (tag.startsWith("</")) {
      while (stack.length) if (stack.pop().name === name) break;
      continue;
    }
    const parent = stack.at(-1);
    const isLessonContent = name === "div" && /\bclass="[^"]*\blesson-content\b/.test(tag);
    if (name === "section" && parent?.isLessonContent) ids.push(tag.match(/\bid="([^"]+)"/)?.[1] ?? "");
    if (!voidTags.has(name) && !tag.endsWith("/>")) stack.push({ name, isLessonContent });
  }
  return ids;
}

expect(explanations.length === 779, `Expected 779 full-rollout explanations after retiring three obsolete targets; found ${explanations.length}`);
expect(new Set(explanations.map((item) => item.lesson)).size === 150, "Stage 10 rollout must cover all 150 lessons");
expect(new Set(explanations.map((item) => `${item.lesson}/${item.targetId}`)).size === explanations.length, "Duplicate explanation target keys found");

const prose = new Set();
for (const item of explanations) {
  expect(["mechanism", "tradeoff", "process", "comparison", "synthesis"].includes(item.kind), `${item.lesson}/${item.targetId}: invalid explanation kind`);
  const transcript = item.transcript ?? item.steps;
  expect(transcript.length >= 1, `${item.lesson}/${item.targetId}: accessible transcript is empty`);
  for (const statement of transcript) {
    expect(wordCount(statement) <= 30, `${item.lesson}/${item.targetId}: transcript statement is too long for projected teaching`);
    if (!item.sourceGrounded) {
      expect(!prose.has(statement), `${item.lesson}/${item.targetId}: duplicate pilot explanation statement`);
      prose.add(statement);
    }
  }
  if (!item.sourceGrounded) {
    const words = wordCount([...item.steps, item.analogy, item.boundary].join(" "));
    expect(words >= 35 && words <= 90, `${item.lesson}/${item.targetId}: pilot visual explanation has ${words} words; expected 35-90`);
    expect(item.steps.length === 3, `${item.lesson}/${item.targetId}: expected exactly three cause-and-effect steps`);
    for (const statement of [item.analogy, item.boundary]) {
      expect(wordCount(statement) <= 20, `${item.lesson}/${item.targetId}: pilot supporting statement is too long for projected teaching`);
      expect(!prose.has(statement), `${item.lesson}/${item.targetId}: duplicate pilot supporting statement`);
      prose.add(statement);
    }
  }
  if (item.visual) {
    const assetPath = path.join(root, "web", item.visual.src.replace(/^\.\.\//, ""));
    expect(fs.existsSync(assetPath), `${item.lesson}/${item.targetId}: visual asset is missing`);
    if (fs.existsSync(assetPath)) {
      expect(fs.statSync(assetPath).size <= 550_000, `${item.lesson}/${item.targetId}: infographic exceeds 550 KB budget`);
      const dimensions = jpegDimensions(assetPath);
      expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${item.lesson}/${item.targetId}: infographic must be 1536 x 1024`);
    }
    expect(wordCount(item.visual.alt) >= 8, `${item.lesson}/${item.targetId}: visual alternative text is too weak`);
  }
}
expect(explanations.filter((item) => item.visual).length === explanations.length, "Every explanation must use one academic infographic");

for (let number = 1; number <= 150; number += 1) {
  const lesson = String(number).padStart(3, "0");
  const html = read(`web/lesson-${lesson}/index.html`);
  expect(count(html, 'href="../stage10-explanations.css?v=7"') === 1, `Lesson ${lesson}: Stage 10 stylesheet must appear once at v7`);
  const sectionIds = directSectionIds(html);
  const lessonItems = explanations.filter((item) => item.lesson === lesson);
  expect(count(html, 'class="panel explanation-panel"') === lessonItems.length, `Lesson ${lesson}: explanation panel count mismatch`);
  expect(!/<a href="#explanation-[^"]+">/.test(html), `Lesson ${lesson}: explanation panels must not expand lesson navigation`);

  for (const item of lessonItems) {
    const explanationId = `explanation-${item.targetId}`;
    const targetIndex = sectionIds.indexOf(item.targetId);
    const explanationIndex = sectionIds.indexOf(explanationId);
    expect(targetIndex >= 0, `Lesson ${lesson}: target ${item.targetId} is missing`);
    expect(explanationIndex === targetIndex + 1, `Lesson ${lesson}: ${explanationId} must immediately follow its target section`);
    const startTag = html.match(new RegExp(`<section class="panel explanation-panel" id="${explanationId}"[^>]*>`))?.[0] ?? "";
    expect(startTag.includes(`data-explains="${item.targetId}"`), `Lesson ${lesson}: ${explanationId} data-explains mismatch`);
    expect(startTag.includes(`data-explanation-kind="${item.kind}"`), `Lesson ${lesson}: ${explanationId} explanation kind mismatch`);
    expect(startTag.includes(`data-delivery-group="${item.targetId}"`), `Lesson ${lesson}: ${explanationId} delivery group mismatch`);
    expect(html.includes(`id="${explanationId}-title">${item.title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")}</h2>`), `Lesson ${lesson}: ${explanationId} title mismatch`);

    const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
    const markdown = read(`lessons/${markdownName}`);
    expect(markdown.includes(`**Explains:** \`${item.targetId}\``), `Lesson ${lesson}: Markdown target ${item.targetId} is missing`);
    for (const statement of (item.transcript ?? [...item.steps, item.analogy, item.boundary])) expect(markdown.includes(statement), `Lesson ${lesson}/${item.targetId}: Markdown explanation is out of sync`);
    expect(html.includes('class="explanation-infographic"'), `Lesson ${lesson}/${item.targetId}: infographic wrapper is missing`);
    expect(html.includes(`src="${item.visual.src}"`) && html.includes('loading="lazy"'), `Lesson ${lesson}/${item.targetId}: responsive infographic is missing or not lazy-loaded`);
    expect(html.includes('aria-label="Infographic text alternative"'), `Lesson ${lesson}/${item.targetId}: accessible transcript is missing`);
    expect(!html.includes('class="explanation-chain"') && !html.includes('class="explanation-notes"'), `Lesson ${lesson}/${item.targetId}: rejected visible prose cards remain`);
  }
}

const lesson016 = read("web/lesson-016/index.html");
const topologySection = lesson016.match(/<section class="panel" id="topologies"[\s\S]*?<\/section>/)?.[0] ?? "";
expect(count(topologySection, '<svg class="topology-svg"') === 4, "Lesson 016: expected four accessible topology SVGs");
expect(count(topologySection, "<title id=") === 4 && count(topologySection, "<desc id=") === 4, "Lesson 016: every topology SVG needs title and description");
expect(topologySection.includes("Full mesh topology example") && count(topologySection.match(/topology-mesh-title[\s\S]*?<\/svg>/)?.[0] ?? "", '<line class="topology-link"') === 6, "Lesson 016: full mesh must show six links among four nodes");
expect(topologySection.includes("Two star segments are connected together") && topologySection.includes("<h3>Hybrid</h3>"), "Lesson 016: hybrid topology is missing");
expect(!topologySection.includes("<h3>Ring</h3>"), "Lesson 016: ring remains in the core topology set");
expect(lesson016.includes("bus, star, mesh and hybrid topology choices") && lesson016.includes("bus, star, mesh and hybrid topology"), "Lesson 016: objective or homework still uses the wrong topology set");

const targetRows = parseCsv(read("audits/stage10-explanation-target-register.csv"));
const targetHeader = targetRows.shift();
const targetLessonIndex = targetHeader.indexOf("lesson");
const targetStatusIndex = targetHeader.indexOf("status");
expect(new Set(targetRows.map((row) => row[targetLessonIndex])).size === 150, "Stage 10 target register must cover all 150 lessons");
expect(targetRows.length === explanations.length, "Stage 10 target register count mismatch");
expect(targetRows.filter((row) => row[targetStatusIndex] === "Implemented").length === explanations.length, "Stage 10 target register implemented count mismatch");

const visualRows = parseCsv(read("audits/stage10-concept-visual-register.csv"));
const visualHeader = visualRows.shift();
const visualLessonIndex = visualHeader.indexOf("lesson");
const visualStatusIndex = visualHeader.indexOf("status");
expect(visualRows.length >= 25, "Stage 10 visual register is unexpectedly small");
expect(visualRows.some((row) => row[visualLessonIndex] === "016" && row[visualStatusIndex] === "PilotReview"), "Lesson 016 corrected topology visuals are not registered for pilot review");

const report = read("audits/stage10-concept-explanation-report.md");
expect(report.includes("complete across all 150 lessons") && report.includes("Human semantic review status comes from"), "Stage 10 report does not describe the completed rollout and human semantic-review gate");

const semanticRows = parseCsv(read("audits/stage10-semantic-review-register.csv"));
const semanticHeader = semanticRows.shift();
const semanticIndex = Object.fromEntries(semanticHeader.map((value, index) => [value, index]));
const requiredSemanticColumns = ["lesson", "target_id", "asset", "sha256", "pass1", "pass2", "status", "max_severity", "defect_ids", "automated_checks", "automated_check_status"];
for (const column of requiredSemanticColumns) expect(Number.isInteger(semanticIndex[column]), `Semantic review register is missing ${column}`);
expect(semanticRows.length === explanations.length, `Expected ${explanations.length} semantic review rows; found ${semanticRows.length}`);
expect(new Set(semanticRows.map((row) => `${row[semanticIndex.lesson]}/${row[semanticIndex.target_id]}`)).size === explanations.length, "Semantic review register contains duplicate or missing keys");
expect(new Set(semanticRows.map((row) => row[semanticIndex.asset])).size === explanations.length, "Semantic review register contains duplicate or missing assets");
const currentAssets = fs.readdirSync(path.join(root, "web", "assets", "diagrams", "stage10-infographics")).filter((name) => name.endsWith(".jpg"));
expect(currentAssets.length === explanations.length, `Expected exactly ${explanations.length} current Stage 10 JPG assets; found ${currentAssets.length}`);
expect(new Set(currentAssets).size === explanations.length, "Current Stage 10 asset directory contains duplicate filenames");
const registeredAssets = new Set(semanticRows.map((row) => row[semanticIndex.asset]));
for (const asset of currentAssets) expect(registeredAssets.has(asset), `${asset}: current Stage 10 asset is missing from the semantic register`);

const semanticByKey = new Map();
for (const row of semanticRows) {
  const key = `${row[semanticIndex.lesson]}/${row[semanticIndex.target_id]}`;
  semanticByKey.set(key, row);
  const item = explanations.find((candidate) => `${candidate.lesson}/${candidate.targetId}` === key);
  expect(Boolean(item), `${key}: semantic review row has no maintained explanation`);
  const expectedAsset = item ? path.basename(item.visual.src) : "";
  expect(row[semanticIndex.asset] === expectedAsset, `${key}: semantic review asset path mismatch`);
  const assetPath = path.join(root, "web", "assets", "diagrams", "stage10-infographics", row[semanticIndex.asset]);
  if (fs.existsSync(assetPath)) {
    const digest = crypto.createHash("sha256").update(fs.readFileSync(assetPath)).digest("hex");
    expect(row[semanticIndex.sha256] === digest, `${key}: semantic review is stale because the asset hash changed`);
  }
  expect(row[semanticIndex.pass1] === "Reviewed" && row[semanticIndex.pass2] === "Reviewed", `${key}: both semantic review passes must be complete`);
  expect(row[semanticIndex.status] !== "Pending", `${key}: semantic review remains pending`);
}

const defectRows = parseCsv(read("audits/stage10-semantic-defects.csv"));
const defectHeader = defectRows.shift();
const defectIndex = Object.fromEntries(defectHeader.map((value, index) => [value, index]));
for (const column of ["defect_id", "lesson", "target_id", "severity", "blocks_release", "resolved"]) expect(Number.isInteger(defectIndex[column]), `Semantic defect register is missing ${column}`);
const defectIds = new Set(defectRows.map((row) => row[defectIndex.defect_id]));
expect(defectIds.size === defectRows.length, "Semantic defect register contains duplicate IDs");
for (const row of defectRows) {
  const key = `${row[defectIndex.lesson]}/${row[defectIndex.target_id]}`;
  expect(semanticByKey.has(key), `${row[defectIndex.defect_id]}: defect key ${key} has no semantic review row`);
  if (["Critical", "Major"].includes(row[defectIndex.severity]) && row[defectIndex.resolved] !== "true") {
    expect(row[defectIndex.blocks_release] === "true", `${row[defectIndex.defect_id]}: unresolved ${row[defectIndex.severity]} defect must block release`);
  }
}
for (const row of semanticRows) {
  for (const id of row[semanticIndex.defect_ids].split(";").filter(Boolean)) expect(defectIds.has(id), `${id}: semantic review row references a missing defect`);
}

const calculationIds = new Set();
for (const check of semanticCalculations) {
  expect(!calculationIds.has(check.id), `${check.id}: duplicate automated semantic-calculation ID`);
  calculationIds.add(check.id);
  const row = semanticByKey.get(check.key);
  expect(Boolean(row), `${check.id}: calculation key ${check.key} has no semantic review row`);
  const passed = evaluateSemanticCalculation(check);
  const linkedDefects = check.defectIds ?? [];
  if (!passed) {
    expect(linkedDefects.length > 0, `${check.id}: failed calculation is not linked to a registered defect`);
    for (const defectId of linkedDefects) expect(defectIds.has(defectId), `${check.id}: linked defect ${defectId} is missing`);
  }
  if (row) {
    const registeredChecks = row[semanticIndex.automated_checks].split(";").filter(Boolean);
    expect(registeredChecks.includes(check.id), `${check.id}: calculation is missing from ${check.key} register row`);
    const expectedStatus = passed ? "Passed" : "KnownDefect";
    expect(row[semanticIndex.automated_check_status] === expectedStatus, `${check.key}: automated check status should be ${expectedStatus}`);
  }
}

const systemsRow = semanticByKey.get("005/systems");
expect(Boolean(systemsRow), "Lesson 005 systems semantic seed is missing");
if (systemsRow) {
  const systemsDefects = defectRows.filter((row) => row[defectIndex.lesson] === "005" && row[defectIndex.target_id] === "systems");
  expect(systemsDefects.length >= 6, `Lesson 005 systems must preserve at least six seed-defect records; found ${systemsDefects.length}`);
  expect(systemsDefects.every((row) => row[defectIndex.resolved] === "true"), "Lesson 005 systems seed defects must be resolved after the deterministic repair");
  expect(systemsRow[semanticIndex.status] === "Approved", "Repaired Lesson 005 systems asset must pass semantic review");
}
expect(semanticByKey.get("004/overflow")?.[semanticIndex.status] === "Approved", "Corrected Lesson 004 overflow asset must pass semantic review");

const blockers = semanticRows.filter((row) => ["DefectCritical", "DefectMajor"].includes(row[semanticIndex.status]));
if (!auditOnly) expect(blockers.length === 0, `Stage 10 release blocked by ${blockers.length} asset(s) with unresolved Critical or Major semantic defects`);

const defectCounts = Object.fromEntries(["Critical", "Major", "Minor"].map((severity) => [severity, defectRows.filter((row) => row[defectIndex.severity] === severity && row[defectIndex.resolved] !== "true").length]));

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Stage 10 ${auditOnly ? "audit-only " : ""}verification passed: ${explanations.length} unique academic infographics, ${semanticRows.length} two-pass semantic reviews, ${defectRows.length} recorded defects (${defectCounts.Critical} Critical, ${defectCounts.Major} Major, ${defectCounts.Minor} Minor) and ${blockers.length} blocking assets.`);
