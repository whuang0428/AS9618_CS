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
  return question ? [question.prompt, question.answer, ...(question.points ?? []).flat(), ...(question.guidance ?? [])].join(" ") : "";
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

const scopedRequirements = Array.from({ length: 9 }, (_, index) => `S12.${String(index + 1).padStart(2, "0")}`);
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
  ["142", ["waterfall", "iterative", "RAD", "rapid prototyping", "time-box", "user involvement"]],
  ["143", ["structure chart", "parameters", "derive equivalent pseudocode", "state-transition diagram", "persistent states", "event-driven changes"]],
  ["144", ["syntax error", "logic error", "run-time error", "exposed", "locate", "correct"]],
  ["145", [
    "dry run", "walkthrough", "white-box", "black-box", "integration", "alpha", "beta", "acceptance", "stub", "test strategy", "test plan",
    "maintenance continues", "corrective", "adaptive", "perfective", "regression", "analyse", "existing program", "amend", "enhances functionality", "MeritCount",
  ]],
];
for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  expect(Boolean(markdownName), `L${lesson}: Markdown lesson is missing`);
  if (!markdownName) continue;
  includesAll(read(`lessons/${markdownName}`), terms, `L${lesson} Markdown`);
  includesAll(read(`web/lesson-${lesson}/index.html`), terms, `L${lesson} visible HTML`);
}

const assessmentChecks = [
  ["L144-Q1", ["structure chart", "derive", "pseudocode", "state-transition"]],
  ["AQ145-Q4", ["structure chart", "header", "call", "state-transition"]],
  ["L059-Q1", ["syntax", "logic", "runtime"]],
  ["AQ150-Q5", ["initialisation", "correction"]],
  ["L145-Q1", ["dry run", "walkthrough", "white-box", "black-box", "integration", "stub"]],
  ["AR146-Q1", ["alpha", "beta", "acceptance"]],
  ["L145-Q2", ["test strategy", "test-plan", "expected", "actual", "pass/fail"]],
  ["AR146-Q2", ["test-plan", "regression", "corrective maintenance"]],
  ["L145-Q4", ["corrective", "adaptive", "perfective"]],
  ["L138-Q1", ["existing program", "analyse", "amendment", "MeritCount", "regression"]],
  ["AQ145-Q1", ["existing program", "analysis", "amending", "regression"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 12 assessment`);

const acceptedSection12 = [...questions.values()].filter(({ id }) => /^(?:L(?:059|137|138|142|144|145|146)-Q|AQ145-Q|AQ150-Q5|AR146-Q)/.test(id))
  .map((question) => [question.prompt, question.answer, ...(question.points ?? []).flat(), ...(question.guidance ?? [])].join(" ")).join("\n");
for (const [pattern, label] of [
  [/a structure chart is (?:the same as|a type of) flowchart/i, "structure chart is falsely equated with a flowchart"],
  [/state-transition diagrams? show(?:s)? every program instruction/i, "state-transition diagram is falsely defined as instruction sequence"],
  [/walkthrough means? (?:running|executing) (?:the )?code automatically/i, "walkthrough is falsely defined as automatic execution"],
  [/black-box (?:uses|is based on) source-code paths/i, "black-box testing is falsely based on source paths"],
  [/white-box (?:ignores|does not use) source code/i, "white-box testing is falsely detached from source structure"],
  [/beta testing is (?:only )?internal/i, "beta testing is falsely restricted to internal staff"],
  [/a stub is (?:the )?finished called module/i, "stub is falsely defined as the finished module"],
  [/perfective maintenance (?:only )?fixes faults/i, "perfective maintenance is falsely reduced to fault correction"],
  [/amend(?:ing|ment)? means? rewrit(?:e|ing) from scratch/i, "program amendment is falsely defined as a full rewrite"],
]) expect(!pattern.test(acceptedSection12), `forbidden Section 12 assessment semantics: ${label}`);

const visualKeys = ["138/bug", "144/algorithms", "145/changeover"];
const semanticRows = parseCsv(read("audits/stage10-semantic-review-register.csv"));
const targetRows = parseCsv(read("audits/stage10-explanation-target-register.csv"));
const visualFacts = read("scripts/stage10-visual-repair-facts.json");
for (const key of visualKeys) {
  const [lesson, targetId] = key.split("/");
  const visualPath = `web/assets/diagrams/stage10-infographics/stage10-lesson-${lesson}-${targetId}.jpg`;
  const dimensions = jpegDimensions(visualPath);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${visualPath}: expected 1536x1024 JPEG`);
  const visualHash = sha256(fs.readFileSync(path.join(root, visualPath)));
  const semanticRow = semanticRows.find((row) => row.lesson === lesson && row.target_id === targetId);
  expect(semanticRow?.sha256 === visualHash, `${key}: semantic review hash does not match the current image`);
  expect(semanticRow?.pass1 === "Reviewed" && semanticRow?.pass2 === "Reviewed" && semanticRow?.status === "Approved", `${key}: visual lacks two approved semantic review passes`);
  const deliveryLesson = visualDeliveryLesson(lesson, targetId);
  const deliveryTarget = visualDeliveryTarget(lesson, targetId);
  const targetRow = targetRows.find((row) => row.lesson === deliveryLesson && row.target_id === deliveryTarget);
  expect(targetRow?.delivery_role === "CORE" && targetRow?.classroom_activity === "TEACH", `${key}: visual is not CORE/TEACH`);
}
includesAll(visualFacts, ["Analyse the existing program", "Amend declarations", "structure chart shows module hierarchy", "Derive pseudocode", "state-transition diagram", "test strategy states", "test plan records"], "Section 12 visual facts");
includesAll(read("web/stage10-explanations.css"), [".explanation-panel > .explanation-infographic", ".explanation-panel > .explanation-sr-only", "display: none", "position: static", "white-space: normal"], "global mobile visual fallback");

const mutationPatterns = [
  ["S12.01", /waterfall|iterative|RAD|rapid prototyping|time-box|user involvement/gi],
  ["S12.02", /structure chart|parameters|derive|pseudocode/gi],
  ["S12.03", /state-transition|start state|event-labelled/gi],
  ["S12.04", /syntax|logic|run-time|runtime|expos|locate|correct/gi],
  ["S12.05", /dry run|walkthrough|white-box|black-box|integration|alpha|beta|acceptance|stub/gi],
  ["S12.06", /test strategy|test plan|expected result|actual result|pass\/fail/gi],
  ["S12.07", /normal|abnormal|extreme|boundary/gi],
  ["S12.08", /corrective|adaptive|perfective|maintenance/gi],
  ["S12.09", /analyse|analyze|analysis|amend|existing|program|enhance/gi],
];
for (const [id, pattern] of mutationPatterns) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({ markdown: markdown.replaceAll(pattern, "removed concept"), html: html.replaceAll(pattern, "removed concept") }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

for (const [requirementId, questionIds, pattern] of [
  ["S12.02", ["L144-Q1", "AQ145-Q4"], /structure|parameter|derive|pseudocode/gi],
  ["S12.05", ["L145-Q1", "AR146-Q1", "AQ145-Q5"], /dry run|walkthrough|white-box|black-box|integration|alpha|beta|acceptance|stub|testing/gi],
  ["S12.09", ["L146-Q5"], /analyse|analysis|amend|existing|program|enhance/gi],
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

const outputDir = "/tmp/as9618-batch17-render";
const rendered = execFileSync("python3", [path.join(root, "scripts", "render-stage10-critical-repairs.py"), "--keys", visualKeys.join(","), "--output-dir", outputDir], { cwd: root });
expect(rendered.toString().includes("Rendered 3"), "Section 12 deterministic visual renderer did not render all three assets");
for (const key of visualKeys) {
  const [lesson, targetId] = key.split("/");
  const filename = `stage10-lesson-${lesson}-${targetId}.jpg`;
  expect(sha256(fs.readFileSync(path.join(outputDir, filename))) === sha256(fs.readFileSync(path.join(root, "web/assets/diagrams/stage10-infographics", filename))), `${key}: deterministic renderer output differs from the applied asset`);
}

const ledger = JSON.parse(read("audits/repair-batch-17-section12-software-development.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 13, "Batch 17 ledger must resolve nine requirements and four cross-cutting defects");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 17 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 17 Section 12 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 17 verification passed: nine Section 12 requirements are Complete, eleven assessment checks pass, three visuals have two approved reviews, and twelve mutations are rejected.");
