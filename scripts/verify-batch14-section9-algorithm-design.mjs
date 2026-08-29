import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { loadAllQuestions } from "./ms-review-utils.mjs";
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
  const buffer = fs.readFileSync(path.join(root, relativePath));
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

const scopedRequirements = Array.from({ length: 9 }, (_, index) => `S9.${String(index + 1).padStart(2, "0")}`);
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
  ["098", ["solution to a problem expressed as a sequence of defined steps", "input-process-output", "meaningful identifier", "identifier table", "pseudocode solution"]],
  ["099", ["abstraction", "abstract model", "decomposition", "program modules", "procedure", "function"]],
  ["100", ["sequence", "selection", "iteration", "count-controlled", "condition-controlled", "A logic statement defines", "AND", "OR", "NOT", "inclusive"]],
  ["101", ["structured English", "flowchart", "pseudocode", "convert"]],
  ["111", ["Stepwise refinement", "high-level algorithm", "input-process-output", "program modules", "implement"]],
  ["112", ["Section 9 required-content checkpoint", "sequence of defined steps", "abstract model", "structured English", "logic statements"]],
];
for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  includesAll(read(`lessons/${markdownName}`), terms, `L${lesson} Markdown`);
  includesAll(read(`web/lesson-${lesson}/index.html`), terms, `L${lesson} visible HTML`);
}

const assessmentChecks = [
  ["L098-Q5", ["solution to a problem", "sequence of defined steps", "unambiguous"]],
  ["AQ100-Q3", ["solution to a problem", "sequence of defined steps", "meaningful identifier"]],
  ["AQ100-Q4", ["essential detail", "omit", "abstract model"]],
  ["L099-Q3", ["decomposition", "modules", "sub-problems"]],
  ["AR112-Q2", ["Develop", "modular algorithm", "substeps"]],
  ["L100-Q1", ["sequence", "selection", "iteration"]],
  ["AQ105-Q1", ["flowchart", "pseudocode", "IF"]],
  ["L101-Q2", ["AND", "IF", "Age >= 11", "Age <= 18"]],
  ["AQ105-Q3", ["condition", "AND", "0", "100"]],
  ["AM100-Q3", ["stepwise refinement", "modules/input-process-output", "algorithm"]],
  ["AQ150-Q1", ["stepwise refinement", "high-level task", "subproblems"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 9 assessment`);

const acceptedSection9 = [...questions.values()].filter(({ id }) => /^(?:L(?:098|099|100|101|102|111|112)-Q|AQ(?:100|105|150)-Q|AM100-Q|AR112-Q)/.test(id))
  .map((question) => [question.prompt, question.answer, ...question.points.flat()].join(" ")).join("\n");
expect(!/algorithm\s+(?:is|means)\s+(?:only\s+)?(?:code|a program)/i.test(acceptedSection9), "accepted assessment semantics define an algorithm as code/program only");
expect(!/range[^\n]{0,120}\bOR\b[^\n]{0,120}(?:valid|accept)/i.test(acceptedSection9), "accepted assessment semantics use OR to accept a two-bound range");

const visualPath = "web/assets/diagrams/stage10-infographics/stage10-lesson-111-analyser.jpg";
const dimensions = jpegDimensions(visualPath);
expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${visualPath}: expected 1536x1024 JPEG`);
const visualHash = sha256(fs.readFileSync(path.join(root, visualPath)));
const semanticRow = parseCsv(read("audits/stage10-semantic-review-register.csv")).find((row) => row.lesson === "111" && row.target_id === "analyser");
expect(semanticRow?.sha256 === visualHash, "L111 semantic review register hash does not match the current image");
expect(semanticRow?.pass1 === "Reviewed" && semanticRow?.pass2 === "Reviewed" && semanticRow?.status === "Approved", "L111 visual lacks two approved semantic review passes");
const targetRow = parseCsv(read("audits/stage10-explanation-target-register.csv")).find((row) => row.lesson === "111" && row.target_id === "analyser");
expect(targetRow?.delivery_role === "CORE" && targetRow?.classroom_activity === "TEACH", "L111 refinement visual is not CORE/TEACH");
includesAll(`${targetRow?.title ?? ""} ${read("scripts/stage10-visual-repair-facts.json")}`, ["stepwise refinement", "high-level algorithm", "program modules", "procedures", "functions"], "L111 delivery and source visual facts");

for (const [id, pattern] of [
  ["S9.01", /abstract model/gi], ["S9.02", /modules/gi], ["S9.03", /defined steps/gi],
  ["S9.04", /identifier table/gi], ["S9.05", /input-process-output/gi], ["S9.06", /selection/gi],
  ["S9.07", /structured English/gi], ["S9.08", /stepwise refinement/gi], ["S9.09", /logic statement/gi],
]) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({ markdown: markdown.replaceAll(pattern, "removed concept"), html: html.replaceAll(pattern, "removed concept") }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

for (const [requirementId, questionIds, pattern] of [
  ["S9.03", ["L098-Q5", "AQ100-Q3"], /algorithm|solution|sequence|defined|unambiguous/gi],
  ["S9.09", ["L101-Q2", "AQ105-Q3"], /condition|AND|IF|Age|Mark|0|100/gi],
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
  expect(mutation.status === "Partial", `mutation escaped: removing both direct assessment forms must fail ${requirementId}`);
}

const rendered = execFileSync("python3", [path.join(root, "scripts", "render-stage10-critical-repairs.py"), "--keys", "111/analyser", "--output-dir", "/tmp/as9618-batch14-render"], { cwd: root });
expect(rendered.toString().includes("Rendered 1"), "L111 deterministic visual renderer did not run");
expect(sha256(fs.readFileSync("/tmp/as9618-batch14-render/stage10-lesson-111-analyser.jpg")) === visualHash, "L111 deterministic renderer output differs from the applied asset");

const ledger = JSON.parse(read("audits/repair-batch-14-section9-algorithm-design.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 13, "Batch 14 ledger must resolve nine requirements and four cross-cutting defects");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 14 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 14 Section 9 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 14 verification passed: nine Section 9 requirements are Complete, twelve assessment checks pass, the refinement visual has two approved reviews, and eleven mutations are rejected.");
