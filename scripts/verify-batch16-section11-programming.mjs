import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { visualDeliveryLesson, visualDeliveryTarget } from "./remediation-v2-core-visuals.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { containsGroup, evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";

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

const scopedRequirements = Array.from({ length: 9 }, (_, index) => `S11.${String(index + 1).padStart(2, "0")}`);
for (const id of scopedRequirements) {
  const requirement = requirements.get(id);
  expect(Boolean(requirement), `${id}: contract row is missing`);
  if (!requirement) continue;
  const evaluation = evaluateRequirement(requirement);
  expect(evaluation.status === "Complete", `${id}: ${evaluation.messages.join("; ")}`);
  expect(requirement.evidenceReviewStatus === "Reviewed", `${id}: evidence mapping is not independently reviewed`);
  expect(!/^The contract wording integrates/.test(requirement.notes), `${id}: placeholder Notes text remains`);
}

expect(containsGroup("Total <- 0. A procedure header declares an interface and each call supplies an argument.", ["procedure header"]), "coverage normalisation swallowed text after a Markdown assignment arrow");
expect(containsGroup("Total <- 0. A procedure header declares an interface and each call supplies an argument.", ["interface"]), "coverage normalisation lost interface text after a Markdown assignment arrow");
expect(containsGroup("Total <- 0. A procedure header declares an interface and each call supplies an argument.", ["argument"]), "coverage normalisation lost argument text after a Markdown assignment arrow");

const lessonChecks = [
  ["126", ["flowchart", "structured English", "pseudocode", "every branch", "Dry-run"]],
  ["127", ["CONSTANT", "DECLARE", "assignment", "arithmetic", "logical", "INPUT", "OUTPUT"]],
  ["128", ["built-in", "library routines", "provided", "string manipulation functions", "supplied", "position convention"]],
  ["129", [
    "IF", "ELSE", "nested", "CASE", "OTHERWISE", "ENDCASE", "count-controlled", "FOR", "TO", "NEXT",
    "pre-condition", "post-condition", "WHILE", "REPEAT", "UNTIL", "justify",
  ]],
  ["130", ["procedure", "function", "BYREF", "BYVAL", "expression", "procedure header", "function header", "interface", "parameter", "argument", "return value"]],
  ["133", ["clear", "efficient", "Cambridge", "pseudocode"]],
];
for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  expect(Boolean(markdownName), `L${lesson}: Markdown lesson is missing`);
  if (!markdownName) continue;
  includesAll(read(`lessons/${markdownName}`), terms, `L${lesson} Markdown`);
  includesAll(read(`web/lesson-${lesson}/index.html`), terms, `L${lesson} visible HTML`);
}

const assessmentChecks = [
  ["L114-Q5", ["constant", "declares", "inputs", "outputs"]],
  ["L127-Q1", ["IF", "ELSE", "ENDIF"]],
  ["L127-Q2", ["CASE", "OTHERWISE", "ENDCASE"]],
  ["L128-Q4", ["FOR loop", "known", "not known"]],
  ["AQ130-Q4", ["REPEAT...UNTIL", "post-condition", "at least once"]],
  ["L131-Q2", ["BYREF", "reference", "caller"]],
  ["AM140-Q2", ["procedure", "BYREF", "caller"]],
  ["L130-Q3", ["procedure", "function", "returns a value"]],
  ["AQ130-Q5", ["function header/interface", "parameters", "arguments", "return"]],
  ["L133-Q2", ["question states", "LENGTH", "characters"]],
  ["AQ135-Q3", ["defines FIRST", "supplied library-routine definition"]],
  ["L140-Q1", ["flowchart", "INPUT Mark", "both flowchart branches"]],
  ["AQ140-Q5", ["Structured English", "Cambridge pseudocode"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 11 assessment`);

const acceptedSection11 = [...questions.values()].filter(({ id }) => /^(?:L1(?:1[4-9]|2[6-9]|3[0-9]|40|41)-Q|AQ1(?:30|35|40)-Q|AM140-Q|AR141-Q)/.test(id))
  .map((question) => [question.prompt, question.answer, ...(question.points ?? []).flat(), ...(question.guidance ?? [])].join(" ")).join("\n");
for (const [pattern, label] of [
  [/string functions? must be memorised/i, "string routines are falsely required from memory"],
  [/Cambridge strings? (?:are|use) always zero-based/i, "Cambridge strings are falsely fixed to zero-based positions"],
  [/a function (?:need not|does not have to) return a value/i, "functions are falsely allowed to omit a return value"],
  [/BYVAL changes the caller(?:'s)? variable/i, "BYVAL is falsely said to change the caller variable"],
  [/WHILE always (?:runs|executes) at least once/i, "WHILE is falsely said to execute at least once"],
  [/CASE is (?:used|required) for every range/i, "CASE is falsely required for every range"],
]) expect(!pattern.test(acceptedSection11), `forbidden Section 11 assessment semantics: ${label}`);

const visualKeys = ["133/substring", "140/standard"];
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
includesAll(visualFacts, ["String manipulation functions are supplied in the question", "Do not import Java's zero-based substring convention", "Follow a flowchart from Start", "From structured English", "matching paths and outputs confirm equivalence"], "Section 11 visual facts");

const mutationPatterns = [
  ["S11.01", /flowchart|structured English|pseudocode/gi],
  ["S11.02", /CONSTANT|DECLARE|assignment|arithmetic|logical|INPUT|OUTPUT/gi],
  ["S11.03", /built-in|library|provided|supplied|string/gi],
  ["S11.04", /IF|ELSE|nested|CASE|count-controlled|pre-condition|post-condition/gi],
  ["S11.05", /loop|structure|justify/gi],
  ["S11.06", /procedure|parameter|BYREF|BYVAL|reference|value/gi],
  ["S11.07", /function|return|expression/gi],
  ["S11.08", /procedure header|function header|interface|parameter|argument|return value/gi],
  ["S11.09", /clear|efficient|Cambridge|pseudocode/gi],
];
for (const [id, pattern] of mutationPatterns) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({ markdown: markdown.replaceAll(pattern, "removed concept"), html: html.replaceAll(pattern, "removed concept") }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

for (const [requirementId, questionIds, pattern] of [
  ["S11.01", ["L140-Q1", "AQ140-Q5"], /flowchart|structured English|pseudocode/gi],
  ["S11.03", ["L133-Q2", "AQ135-Q3"], /string|LENGTH|FIRST|supplied|function/gi],
  ["S11.08", ["AQ130-Q5", "AR141-Q2"], /header|interface|parameter|argument|return value|BYREF|BYVAL/gi],
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

const outputDir = "/tmp/as9618-batch16-render";
const rendered = execFileSync("python3", [path.join(root, "scripts", "render-stage10-critical-repairs.py"), "--keys", visualKeys.join(","), "--output-dir", outputDir], { cwd: root });
expect(rendered.toString().includes("Rendered 2"), "Section 11 deterministic visual renderer did not render both assets");
for (const key of visualKeys) {
  const [lesson, targetId] = key.split("/");
  const filename = `stage10-lesson-${lesson}-${targetId}.jpg`;
  expect(sha256(fs.readFileSync(path.join(outputDir, filename))) === sha256(fs.readFileSync(path.join(root, "web/assets/diagrams/stage10-infographics", filename))), `${key}: deterministic renderer output differs from the applied asset`);
}

const ledger = JSON.parse(read("audits/repair-batch-16-section11-programming.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 13, "Batch 16 ledger must resolve nine requirements and four cross-cutting defects");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 16 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 16 Section 11 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 16 verification passed: nine Section 11 requirements are Complete, thirteen assessment checks pass, two visuals have two approved reviews, and twelve mutations are rejected.");
