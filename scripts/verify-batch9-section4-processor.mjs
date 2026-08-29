import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { evaluateSemanticCalculation, semanticCalculations } from "./stage10-semantic-calculations.mjs";
import { sourceFactOverrides } from "./stage10-semantic-source-overrides.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function includesAll(text, terms, label) {
  const source = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").toLowerCase();
  for (const term of terms) expect(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
}

function questionText(id, includeGuidance = true) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...(includeGuidance ? question.guidance : [])].join(" ") : "";
}

function sectionHtml(html, id) {
  const opening = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>`, "i").exec(html);
  if (!opening) return "";
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  tokens.lastIndex = opening.index;
  let depth = 0;
  let match;
  while ((match = tokens.exec(html))) {
    if (match[0].startsWith("<section")) depth += 1;
    else if (--depth === 0) return html.slice(opening.index, tokens.lastIndex);
  }
  return "";
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

const scopedRequirements = Array.from({ length: 15 }, (_, index) => `S4.${String(index + 1).padStart(2, "0")}`);
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
  ["041", [
    "Von Neumann architecture", "stored-program concept", "Immediate Access Store", "IAS", "ALU", "CU", "system clock",
  ]],
  ["042", ["fetch-decode-execute cycle", "register-transfer notation", "MAR <- PC", "MDR <- Memory[MAR]", "CIR <- MDR"]],
  ["043", ["general-purpose", "special-purpose", "PC", "MDR", "MAR", "ACC", "IX", "CIR", "status register"]],
  ["044", ["address bus", "data bus", "control bus", "USB", "HDMI", "VGA"]],
  ["045", ["assembly language", "machine code", "assembler", "instruction set"]],
  ["046", ["Pass 1", "Pass 2", "symbol table", "Trace", "data movement", "input/output", "arithmetic", "conditional branch", "unconditional branch", "compare"]],
  ["047", ["immediate", "direct", "indirect", "indexed", "relative addressing", "LDR #n", "CMI <address>", "JPE <address>", "JPN <address>"]],
  ["048", ["causes", "applications", "detects", "interrupt service routine", "saved state", "restores"]],
  ["049", ["processor type", "number of cores", "bus width", "clock speed", "cache memory"]],
  ["050", ["AND mask", "OR mask", "XOR mask", "logical left shift", "logical right shift", "test", "set", "clear", "toggle", "monitor", "control"]],
];

for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = read(`lessons/${markdownName}`);
  const html = read(`web/lesson-${lesson}/index.html`);
  includesAll(markdown, terms, `L${lesson} Markdown`);
  includesAll(sectionHtml(html, "stage2-completion"), terms, `L${lesson} visible CORE teaching`);
  const practice = sectionHtml(html, "stage2-practice");
  expect(/data-delivery-role="CORE"/i.test(practice) && /data-classroom-activity="PRACTISE"/i.test(practice), `L${lesson}: Stage 2 practice is not CORE/PRACTISE`);
  expect(/Show answer|Show MS/i.test(practice), `L${lesson}: Stage 2 practice has no visible answer/MS disclosure`);
}

const l050 = read("web/lesson-050/index.html");
expect(/data-delivery-role="CORE"/i.test(sectionHtml(l050, "stage2-completion")), "L050#stage2-completion: required bit manipulation is not CORE");
expect(/data-delivery-role="CORE"/i.test(sectionHtml(l050, "explanation-shifts")), "L050#explanation-shifts: first-use bit-manipulation visual is not CORE");
for (const id of ["masks", "shifts", "device-bits", "core-practice", "tool", "examples", "practice", "exam", "pipeline-extension", "concept", "explanation-concept", "compare", "explanation-compare", "timing", "explanation-timing", "hazards", "explanation-hazards", "stalls", "explanation-stalls"]) {
  const section = sectionHtml(l050, id);
  expect(/data-delivery-role="OPTIONAL"/i.test(section) && /data-classroom-activity="EXTEND"/i.test(section), `L050#${id}: pipelining is not OPTIONAL/EXTEND`);
}
includesAll(l050, ["AND mask", "OR mask", "XOR mask", "logical left", "logical right", "arithmetic left", "arithmetic right", "cyclic left", "cyclic right", "test", "set", "clear", "toggle", "monitor", "control"], "L050 visible bit-manipulation teaching");

const assessmentChecks = [
  ["L041-Q4", ["stored-program", "Von Neumann", "binary", "MDR", "CIR"]],
  ["L043-Q5", ["general-purpose", "special-purpose", "ACC", "PC", "MAR", "MDR", "IX"]],
  ["L047-Q5", ["immediate", "direct", "indirect", "indexed", "relative"]],
  ["AQ045-Q3", ["stored-program", "Von Neumann", "alongside data"]],
  ["AQ045-Q4", ["USB", "HDMI", "VGA"]],
  ["AQ050-Q1", ["pass 1", "symbol table", "pass 2", "resolved labels"]],
  ["AQ050-Q2", ["LDX", "500", "IX", "507", "ACC", "42"]],
  ["AQ050-Q3", ["input/output", "arithmetic", "unconditional", "conditional"]],
  ["AQ050-Q4", ["8-bit", "arithmetic right shift", "cyclic right shift"]],
  ["AQ050-Q5", ["OR", "00000100", "set"]],
  ["AR051-Q1", ["LDR", "IX", "CMI", "indirect", "JPE", "True", "JPN", "False"]],
  ["AR051-Q2", ["current instruction completes", "state", "ISR", "restored", "resumes"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 4 assessment`);

const acceptedAssessment = assessmentChecks.map(([id]) => questionText(id, false)).join("\n");
for (const [label, pattern] of [
  ["relative LDR", /LDR(?:\s+#?n)?\s+(?:is|means|uses)\s+(?:a\s+)?relative/i],
  ["immediate CMI", /CMI(?:\s+<address>)?\s+(?:is|means|uses)\s+(?:an?\s+)?immediate/i],
  ["equality JPE", /JPE(?:\s+<address>)?\s+(?:means|is|jumps?)\s+(?:if|when|on)?\s*(?:equal|zero)/i],
  ["negative JPN", /JPN(?:\s+<address>)?\s+(?:means|is|jumps?)\s+(?:if|when|on)?\s*(?:negative|minus)/i],
]) expect(!pattern.test(acceptedAssessment), `accepted assessment semantics still contain ${label}`);

const registerVisual = sourceFactOverrides["043/main-registers"].join(" ");
includesAll(registerVisual, ["PC", "CIR", "MAR", "MDR", "ACC", "IX", "status register", "general-purpose", "special-purpose"], "L043 maintained visual facts");
const modesVisual = sourceFactOverrides["047/modes"].join(" ");
includesAll(modesVisual, ["Immediate", "Direct", "Indirect", "Indexed", "Relative", "PC-based", "LDR #n", "IX", "not relative"], "L047 maintained visual facts");
for (const [file, label] of [
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-043-main-registers.jpg", "L043 register visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-047-modes.jpg", "L047 modes visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-050-shifts.jpg", "L050 shifts visual"],
]) {
  const dimensions = jpegDimensions(file);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${label}: expected 1536x1024 JPEG`);
}
const shiftCalculation = semanticCalculations.find(({ id }) => id === "CALC-074-BINARY-SHIFTS");
expect(Boolean(shiftCalculation) && evaluateSemanticCalculation(shiftCalculation), "L050 fixed-width shift calculation failed");
expect(shiftCalculation?.width === 8 && shiftCalculation?.examples.every(({ result }) => /^[01]{8}$/.test(result)), "L050 shift results are not all exactly eight bits");

const mutations = [
  ["S4.01", /stored-program/gi],
  ["S4.02", /general-purpose/gi],
  ["S4.03", /\bIAS\b/gi],
  ["S4.04", /\bcontrol\b/gi],
  ["S4.05", /processor type/gi],
  ["S4.06", /\bVGA\b/gi],
  ["S4.07", /register[- ]transfer notation/gi],
  ["S4.08", /\bISR\b/gi],
  ["S4.09", /machine code/gi],
  ["S4.10", /two-pass/gi],
  ["S4.11", /\bTrace\b/gi],
  ["S4.12", /conditional branch/gi],
  ["S4.13", /\bJPN\b/gi],
  ["S4.14", /relative/gi],
  ["S4.15", /cyclic/gi],
];
for (const [id, pattern] of mutations) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({
      markdown: markdown.replaceAll(pattern, "removed concept"),
      html: html.replaceAll(pattern, "removed concept"),
    }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

const assessmentMutation = evaluateRequirement(requirements.get("S4.13"), {
  questionTransform: (question) => ["L046-Q2", "L046-Q4", "AR051-Q1"].includes(question.id)
    ? {
        ...question,
        prompt: question.prompt.replace(/LDR|CMI|JPE|JPN/gi, "instruction"),
        answer: question.answer.replace(/LDR|CMI|JPE|JPN/gi, "instruction"),
        points: question.points.map(([code, text]) => [code, text.replace(/LDR|CMI|JPE|JPN/gi, "instruction")]),
        guidance: question.guidance.map((text) => text.replace(/LDR|CMI|JPE|JPN/gi, "instruction")),
      }
    : question,
});
expect(assessmentMutation.status === "Partial", "mutation escaped: removing the four high-risk opcodes from assessment evidence must fail S4.13");

const visualMutation = { ...shiftCalculation, examples: shiftCalculation.examples.map((example, index) => index === 0 ? { ...example, result: example.result.slice(1) } : example) };
expect(!evaluateSemanticCalculation(visualMutation), "mutation escaped: a seven-bit shift result must fail the semantic calculation");

const ledger = JSON.parse(read("audits/repair-batch-9-section4-processor.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 15, "Batch 9 ledger must resolve exactly fifteen requirement records");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 9 ledger contains an unresolved or low-confidence record");

if (failures.length) {
  console.error(`Batch 9 Section 4 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 9 verification passed: fifteen Section 4 requirements are Complete, twelve direct assessment checks pass, three technical visuals pass and seventeen mutations are rejected.");
