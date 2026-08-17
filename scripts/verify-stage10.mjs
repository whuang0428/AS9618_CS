import fs from "node:fs";
import path from "node:path";
import { explanations } from "./stage10-explanations-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function count(source, marker) {
  return source.split(marker).length - 1;
}

function wordCount(value) {
  return String(value).trim().split(/\s+/).filter(Boolean).length;
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

const pilotLessons = new Set(["016", "030", "041", "053", "067", "083", "091", "105", "122", "142"]);
expect(explanations.length === 45, `Expected 45 pilot explanations; found ${explanations.length}`);
expect(new Set(explanations.map((item) => item.lesson)).size === 10, "Stage 10 pilot must cover exactly ten lessons");
expect([...pilotLessons].every((lesson) => explanations.some((item) => item.lesson === lesson)), "One or more named pilot lessons are missing");
expect(new Set(explanations.map((item) => `${item.lesson}/${item.targetId}`)).size === explanations.length, "Duplicate explanation target keys found");

const prose = new Set();
for (const item of explanations) {
  const words = wordCount([...item.steps, item.analogy, item.boundary].join(" "));
  expect(words >= 35 && words <= 90, `${item.lesson}/${item.targetId}: visual explanation has ${words} words; expected 35-90`);
  expect(["mechanism", "tradeoff", "process", "comparison", "synthesis"].includes(item.kind), `${item.lesson}/${item.targetId}: invalid explanation kind`);
  expect(item.steps.length === 3, `${item.lesson}/${item.targetId}: expected exactly three cause-and-effect steps`);
  for (const statement of [...item.steps, item.analogy, item.boundary]) {
    expect(wordCount(statement) <= 20, `${item.lesson}/${item.targetId}: statement is too long for projected teaching`);
    expect(!prose.has(statement), `${item.lesson}/${item.targetId}: duplicate explanation statement`);
    prose.add(statement);
  }
  if (item.visual) {
    const assetPath = path.join(root, "web", item.visual.src.replace(/^\.\.\//, ""));
    expect(fs.existsSync(assetPath), `${item.lesson}/${item.targetId}: visual asset is missing`);
    if (fs.existsSync(assetPath)) expect(fs.statSync(assetPath).size <= 400_000, `${item.lesson}/${item.targetId}: visual exceeds 400 KB budget`);
    expect(wordCount(item.visual.alt) >= 8, `${item.lesson}/${item.targetId}: visual alternative text is too weak`);
  }
}
expect(explanations.filter((item) => item.visual).length === 5, "Expected five selected academic illustration assets in the pilot");

for (let number = 1; number <= 150; number += 1) {
  const lesson = String(number).padStart(3, "0");
  const html = read(`web/lesson-${lesson}/index.html`);
  expect(count(html, 'href="../stage10-explanations.css?v=5"') === 1, `Lesson ${lesson}: Stage 10 stylesheet must appear once at v5`);
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
    expect(html.includes(`<h2>${item.title.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")}</h2>`), `Lesson ${lesson}: ${explanationId} title mismatch`);

    const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
    const markdown = read(`lessons/${markdownName}`);
    expect(markdown.includes(`**Explains:** \`${item.targetId}\``), `Lesson ${lesson}: Markdown target ${item.targetId} is missing`);
    for (const statement of [...item.steps, item.analogy, item.boundary]) expect(markdown.includes(statement), `Lesson ${lesson}/${item.targetId}: Markdown explanation is out of sync`);
    expect(html.includes('class="explanation-chain"'), `Lesson ${lesson}/${item.targetId}: visual cause chain is missing`);
    if (item.visual) {
      expect(html.includes(`src="${item.visual.src}"`) && html.includes('loading="lazy"'), `Lesson ${lesson}/${item.targetId}: responsive visual is missing or not lazy-loaded`);
    }
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
expect(targetRows.filter((row) => row[targetStatusIndex] === "ImplementedPilot").length === explanations.length, "Stage 10 target register implemented count mismatch");

const visualRows = parseCsv(read("audits/stage10-concept-visual-register.csv"));
const visualHeader = visualRows.shift();
const visualLessonIndex = visualHeader.indexOf("lesson");
const visualStatusIndex = visualHeader.indexOf("status");
expect(visualRows.length >= 25, "Stage 10 visual register is unexpectedly small");
expect(visualRows.some((row) => row[visualLessonIndex] === "016" && row[visualStatusIndex] === "PilotReview"), "Lesson 016 corrected topology visuals are not registered for pilot review");

const report = read("audits/stage10-concept-explanation-report.md");
expect(report.includes("pilot only") && report.includes("requires human approval"), "Stage 10 report does not preserve the human approval gate");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Stage 10 verification passed: ${explanations.length} structured visual explanations, five academic illustration assets, 150-lesson target coverage and ${visualRows.length} visual audit records.`);
