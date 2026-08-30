import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { visualDeliveryLesson, visualDeliveryTarget } from "./remediation-v2-core-visuals.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));

function includesAll(text, terms, label) {
  const source = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").toLowerCase();
  for (const term of terms) expect(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
}

function questionText(id) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(field); field = ""; }
    else if (character === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += character;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  const [headers, ...body] = rows.filter((values) => values.some(Boolean));
  return body.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function jpegDimensions(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

const scopedRequirements = Array.from({ length: 10 }, (_, index) => `S10.${String(index + 1).padStart(2, "0")}`);
for (const id of scopedRequirements) {
  const requirement = requirements.get(id);
  expect(Boolean(requirement), `${id}: contract row is missing`);
  if (!requirement) continue;
  const evaluation = evaluateRequirement(requirement);
  expect(evaluation.status === "Complete", `${id}: ${evaluation.messages.join("; ")}`);
  expect(requirement.evidenceReviewStatus === "Reviewed", `${id}: evidence mapping is not independently reviewed`);
  expect(!/^The contract wording integrates/.test(requirement.notes), `${id}: placeholder Notes text remains`);
}

const lessonChecks = [
  ["114", ["INTEGER", "REAL", "CHAR", "STRING", "BOOLEAN", "DATE", "ARRAY", "FILE"]],
  ["115", ["different data types", "one identifier", "TYPE", "ENDTYPE", "Student1.Mark", "save", "read"]],
  ["116", ["index", "lower bound", "upper bound", "one-dimensional", "two-dimensional", "DECLARE"]],
  ["117", ["two-dimensional array", "DECLARE", "FOR", "row", "column"]],
  ["119", ["linear search", "bubble sort", "repeated passes", "swap", "ARRAY"]],
  ["120", ["persistent", "OPENFILE", "READFILE", "WRITEFILE", "EOF", "CLOSEFILE"]],
  ["121", ["collection of data and a set of operations", "stack", "queue", "linked list", "add", "edit", "delete", "array", "does not require pseudocode"]],
  ["122", ["linked list", "justify"]],
  ["123", ["LIFO", "FIFO"]],
  ["126", ["Section 10", "record", "array", "file", "stack", "queue"]],
];
for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  expect(Boolean(markdownName), `L${lesson}: Markdown lesson is missing`);
  if (!markdownName) continue;
  includesAll(read(`lessons/${markdownName}`), terms, `L${lesson} Markdown`);
  includesAll(read(`web/lesson-${lesson}/index.html`), terms, `L${lesson} visible HTML`);
}

const assessmentChecks = [
  ["AQ116-Q3", ["CHAR", "DATE", "middle initial", "date of birth"]],
  ["AQ121-Q1", ["one-dimensional", "two-dimensional", "30", "4", "DECLARE"]],
  ["AQ121-Q3", ["Student1.Mark", "save", "read"]],
  ["AM121-Q2", ["bubble sort", "ascending", "pseudocode", "swap"]],
  ["AQ126-Q3", ["linked-list", "Data", "Next", "edit"]],
  ["AR126-Q2", ["stack", "queue", "linked-list", "add", "edit", "delete", "array", "pseudocode"]],
  ["L106-Q5", ["bubble sort", "pseudocode", "swap"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 10 assessment`);

const acceptedSection10 = [...questions.values()].filter(({ id }) => /^(?:L(?:105|106|114|115|116|117|118|119|120|121|122|123|124|125|126)-Q|AQ(?:115|120|125)-Q|AM121-Q|AR126-Q)/.test(id))
  .map((question) => [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ")).join("\n");
for (const [pattern, label] of [
  [/array (?:indexes|indices) are always zero-based/i, "arrays are falsely required to be zero-based"],
  [/record fields? (?:use|are accessed by) numeric index/i, "record fields are falsely described as numeric indexes"],
  [/trace (?:alone )?is sufficient instead of (?:writing )?bubble sort/i, "a trace is accepted instead of the required bubble-sort algorithm"],
  [/ADT (?:is|means) only an array/i, "ADT is falsely defined as an array implementation"],
  [/candidates? must write pseudocode for (?:a )?(?:stack|queue|linked list)/i, "ADT pseudocode is falsely required"],
]) expect(!pattern.test(acceptedSection10), `forbidden Section 10 assessment semantics: ${label}`);

const visualKeys = ["114/pseudocode", "119/declare", "123/concept", "123/implementation"];
const semanticRows = parseCsv(read("audits/stage10-semantic-review-register.csv"));
const targetRows = parseCsv(read("audits/stage10-explanation-target-register.csv"));
const visualFacts = read("scripts/stage10-visual-repair-facts.json");
for (const key of visualKeys) {
  const [lesson, targetId] = key.split("/");
  const visualPath = `web/assets/diagrams/stage10-infographics/stage10-lesson-${lesson}-${targetId}.jpg`;
  const dimensions = jpegDimensions(visualPath);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${visualPath}: expected 1536x1024 JPEG`);
  const visualFile = path.join(root, visualPath);
  const visualHash = fs.existsSync(visualFile) ? sha256(fs.readFileSync(visualFile)) : "";
  const semanticRow = semanticRows.find((row) => row.asset === path.basename(visualPath));
  expect(semanticRow?.sha256 === visualHash, `${key}: semantic review hash does not match the current image`);
  expect(semanticRow?.pass1 === "Reviewed" && semanticRow?.pass2 === "Reviewed" && semanticRow?.status === "Approved", `${key}: visual lacks two approved semantic review passes`);
  const deliveryLesson = visualDeliveryLesson(lesson, targetId);
  const deliveryTarget = visualDeliveryTarget(lesson, targetId);
  const targetRow = targetRows.find((row) => row.lesson === deliveryLesson && row.target_id === deliveryTarget);
  expect(targetRow?.delivery_role === "CORE" && targetRow?.classroom_activity === "TEACH", `${key}: visual is not CORE/TEACH`);
}
includesAll(visualFacts, ["ARRAY and FILE", "TYPE and ENDTYPE", "collection of data and a set of operations", "not required to write pseudocode"], "Section 10 visual facts");

const mutationPatterns = [
  ["S10.01", /INTEGER|REAL|CHAR|STRING|BOOLEAN|DATE|ARRAY|FILE/gi],
  ["S10.02", /different data types|one identifier|record/gi],
  ["S10.03", /lower bound|upper bound|index/gi],
  ["S10.04", /one-dimensional|two-dimensional|1D|2D/gi],
  ["S10.05", /DECLARE|ARRAY|FOR|row|column/gi],
  ["S10.06", /linear search|bubble sort|swapped/gi],
  ["S10.07", /persistent|OPENFILE|READFILE|WRITEFILE|EOF|CLOSEFILE/gi],
  ["S10.08", /collection of data and a set of operations|abstract data type/gi],
  ["S10.09", /LIFO|FIFO|linked list/gi],
  ["S10.10", /add|edit|delete|array implementation|not required to write pseudocode/gi],
];
for (const [id, pattern] of mutationPatterns) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({ markdown: markdown.replaceAll(pattern, "removed concept"), html: html.replaceAll(pattern, "removed concept") }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

for (const [requirementId, questionIds, pattern] of [
  ["S10.01", ["AQ116-Q3"], /CHAR|DATE|middle initial|date of birth/gi],
  ["S10.06", ["L106-Q5", "AM121-Q2"], /bubble sort|ascending|pseudocode|swap/gi],
  ["S10.10", ["AQ126-Q3", "AR126-Q2"], /stack|queue|linked list|add|edit|delete|array|Data|Next/gi],
]) {
  const mutation = evaluateRequirement(requirements.get(requirementId), {
    questionTransform: (question) => questionIds.includes(question.id) ? {
      ...question,
      prompt: question.prompt.replaceAll(pattern, "removed concept"),
      answer: question.answer.replaceAll(pattern, "removed concept"),
      points: question.points.map(([code, text]) => [code, text.replaceAll(pattern, "removed concept")]),
      guidance: question.guidance.map((text) => text.replaceAll(pattern, "removed concept")),
    } : question,
  });
  expect(mutation.status === "Partial", `mutation escaped: removing direct assessment evidence must fail ${requirementId}`);
}

const rendered = execFileSync("python3", [path.join(root, "scripts", "render-stage10-critical-repairs.py"), "--keys", visualKeys.join(","), "--output-dir", "/tmp/as9618-batch15-render"], { cwd: root });
expect(rendered.toString().includes("Rendered 4"), "Section 10 deterministic visual renderer did not render all four assets");
for (const key of visualKeys) {
  const [lesson, targetId] = key.split("/");
  const filename = `stage10-lesson-${lesson}-${targetId}.jpg`;
  expect(sha256(fs.readFileSync(path.join("/tmp/as9618-batch15-render", filename))) === sha256(fs.readFileSync(path.join(root, "web/assets/diagrams/stage10-infographics", filename))), `${key}: deterministic renderer output differs from the applied asset`);
}

const ledger = JSON.parse(read("audits/repair-batch-15-section10-data-structures.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 14, "Batch 15 ledger must resolve ten requirements and four cross-cutting defects");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 15 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 15 Section 10 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 15 verification passed: ten Section 10 requirements are Complete, seven assessment checks pass, four visuals have two approved reviews, and thirteen mutations are rejected.");
