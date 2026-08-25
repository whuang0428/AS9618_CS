import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { repairs } from "./stage2-repairs-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function lessonMarkdown(lesson) {
  const filename = fs.readdirSync(path.join(root, "lessons"))
    .find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  expect(Boolean(filename), `Lesson ${lesson}: Markdown file is missing`);
  return filename ? read(`lessons/${filename}`) : "";
}

function studentSources(lesson, includeApp = true) {
  const sources = [read(`web/lesson-${lesson}/index.html`), lessonMarkdown(lesson)];
  const appPath = path.join(root, "web", `lesson-${lesson}`, "app.js");
  if (includeApp && fs.existsSync(appPath)) sources.push(fs.readFileSync(appPath, "utf8"));
  return sources.join("\n");
}

function expectNoMatch(source, pattern, message) {
  expect(!pattern.test(source), message);
}

const expectedRepairOwners = new Map([
  ["S1.04", [5]],
  ["S2.05", [18]],
  ["S4.12", [46]],
  ["S9.07", [101]],
]);

for (const [row, expectedLessons] of expectedRepairOwners) {
  const actual = repairs.filter((repair) => repair.rows.includes(row)).map((repair) => repair.lesson);
  expect(JSON.stringify(actual) === JSON.stringify(expectedLessons), `${row}: expected Stage 2 owner ${expectedLessons.join(", ")}; found ${actual.join(", ") || "none"}`);
}

for (const lesson of [4, 16, 45, 100]) {
  expect(!repairs.some((repair) => repair.lesson === lesson), `Lesson ${lesson}: obsolete Stage 2 repair still exists`);
}

const expectedTitles = new Map([
  ["100", "Sequence, selection, and iteration"],
  ["101", "Flowcharts and pseudocode notation"],
  ["102", "Trace tables and dry runs"],
]);
for (const [lesson, title] of expectedTitles) {
  const html = read(`web/lesson-${lesson}/index.html`);
  expect(html.includes(`<h1>${title}</h1>`), `Lesson ${lesson}: expected title "${title}"`);
  expect(lessonMarkdown(lesson).startsWith(`# Lesson ${lesson}: ${title}`), `Lesson ${lesson}: Markdown title or filename does not match the new order`);
}

expectNoMatch(studentSources("004"), /two['’]?s complement|\bsigned\b/i, "Lesson 004: signed/two's-complement content appears before Lesson 005");
expectNoMatch(studentSources("016"), /\bpacket(?:s)?\b|\bframe(?:s)?\b|\brouting\b/i, "Lesson 016: packet-movement teaching remains before Lesson 018");
expectNoMatch(studentSources("033"), /\bsensors?\b|\bactuators?\b|\bthresholds?\b|control loop/i, "Lesson 033: control-system teaching remains before Lesson 034");
expectNoMatch(studentSources("045"), /\bassembly\b|\bmnemonics?\b|\bassembler\b/i, "Lesson 045: assembly mnemonic teaching remains before Lesson 046");

for (const lesson of ["098", "099"]) {
  const source = studentSources(lesson);
  expectNoMatch(source, /\bpseudocode\b|trace table|dry run|\bsentinel\b/i, `Lesson ${lesson}: formal notation or tracing appears before Lessons 100-102`);
  const visible = `${read(`web/lesson-${lesson}/index.html`)}\n${lessonMarkdown(lesson)}`;
  expectNoMatch(visible, /\b(?:IF|FOR|WHILE|PROCEDURE|CALL)\b/, `Lesson ${lesson}: a formal control keyword appears in visible teaching content`);
}

const movedAssets = [
  "stage10-lesson-100-sequence.jpg",
  "stage10-lesson-100-selection.jpg",
  "stage10-lesson-100-iteration.jpg",
  "stage10-lesson-100-combining.jpg",
  "stage10-lesson-101-flowcharts.jpg",
  "stage10-lesson-101-notation.jpg",
  "stage10-lesson-101-equivalence.jpg",
  "stage10-lesson-101-symbol-tool.jpg",
  "stage10-lesson-101-structure-tool.jpg",
  "stage10-lesson-102-trace-table.jpg",
  "stage10-lesson-102-dry-run.jpg",
  "stage10-lesson-102-loops.jpg",
  "stage10-lesson-102-predictor.jpg",
];
for (const filename of movedAssets) {
  expect(fs.existsSync(path.join(root, "web", "assets", "diagrams", "stage10-infographics", filename)), `${filename}: moved Stage 10 asset is missing`);
}

for (const filename of [
  "stage10-lesson-033-loop.jpg",
  "stage10-lesson-098-pseudocode.jpg",
  "stage10-lesson-099-pseudocode.jpg",
]) {
  expect(!fs.existsSync(path.join(root, "web", "assets", "diagrams", "stage10-infographics", filename)), `${filename}: obsolete asset still exists`);
}

const audit = read("syllabus-audit.md");
const expectedEvidence = new Map([
  ["S1.02", "W002, W003, W005, W006"],
  ["S1.03", "W002, W003, W005, W006"],
  ["S1.04", "W004, W005"],
  ["S2.05", "W016, W018"],
  ["S4.12", "W046"],
  ["S4.13", "W046, W047"],
  ["S9.06", "W100"],
  ["S9.07", "W101"],
]);
for (const [row, evidence] of expectedEvidence) {
  const line = audit.split("\n").find((candidate) => candidate.startsWith(`| ${row} |`)) ?? "";
  expect(line.includes(evidence), `${row}: syllabus audit evidence must map to ${evidence}`);
}

if (failures.length) {
  console.error(`Curriculum sequence verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Curriculum sequence verification passed: six dependency repairs, Paper 2 ordering and obsolete assets are consistent.");
