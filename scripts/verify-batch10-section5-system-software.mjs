import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
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

const scopedRequirements = Array.from({ length: 7 }, (_, index) => `S5.${String(index + 1).padStart(2, "0")}`);
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
  ["052", ["operating system", "memory management", "file management", "security management", "hardware management", "process management"]],
  ["055", ["disk formatter", "virus checker", "defragmenter", "disk contents analysis", "repair", "compression", "backup"]],
  ["058", ["software under development", "existing code", "program libraries", "developer", "dynamically linked library", "DLL"]],
  ["056", ["assembler", "assembly-language", "compiler", "interpreter", "advantages", "disadvantages"]],
  ["060", ["Java in console mode", "partly compiled", "partly interpreted", "bytecode", "JVM", "context-sensitive prompts", "dynamic syntax", "prettyprint", "expand or collapse", "single stepping", "breakpoints", "variable", "expressions", "report window"]],
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

const assessmentChecks = [
  ["L053-Q5", ["operating system", "process management", "memory management", "file management", "security management", "hardware management"]],
  ["AQ055-Q5", ["disk formatter", "analysis/repair", "repairs recoverable faults"]],
  ["L056-Q4", ["compiler", "interpreter", "whole program", "statement by statement", "development", "deployment"]],
  ["L056-Q5", ["compiler", "interpreter", "assembler", "assembly language", "machine code"]],
  ["L058-Q3", ["libraries", "reusable", "development time", "linked"]],
  ["AQ060-Q3", ["dynamically linked library", "missing/incompatible library"]],
  ["L060-Q4", ["Java", "bytecode", "JVM", "partly compiled", "partly interpreted", "IDE", "prettyprint", "breakpoint"]],
  ["AQ060-Q2", ["IDE", "prettyprint", "expand/collapse", "breakpoint", "single-step", "variable/expression/report"]],
  ["AQ060-Q5", ["Java", "compiler", "bytecode", "JVM", "interprets"]],
  ["AM060-Q4", ["Java", "IDE", "DLL", "breakpoint", "single-step", "variable inspection"]],
  ["AR061-Q1", ["advantages", "disadvantages", "interpreter", "feedback", "slower"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 5 assessment`);

const acceptedAssessment = assessmentChecks.map(([id]) => questionText(id, false)).join("\n");
for (const [label, pattern] of [
  ["Java directly to universal machine code", /Java(?: source| program)? (?:is )?compiled directly (?:into|to) universal machine code/is],
  ["interpreter permanent executable", /interpreter.{0,80}(?:produces|creates).{0,30}(?:permanent|standalone).{0,20}(?:object|executable) code/is],
  ["assembler always executable", /assembler.{0,100}(?:always|immediately).{0,30}executable/is],
]) expect(!pattern.test(acceptedAssessment), `accepted assessment semantics still contain ${label}`);

const assemblerVisualFacts = sourceFactOverrides["056/assembler"].join(" ");
includesAll(assemblerVisualFacts, ["assembly-language", "machine code", "object-code module", "linker", "before an executable", "does not translate high-level"], "L056 assembler maintained visual facts");
const comparisonVisualFacts = sourceFactOverrides["056/compare"].join(" ");
includesAll(comparisonVisualFacts, ["compiler", "interpreter", "assembler", "object modules", "linker", "no separate permanent object-code", "not claim that every assembler output is immediately executable"], "L056 comparison maintained visual facts");
for (const [file, label] of [
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-056-assembler.jpg", "L056 assembler visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-056-compare.jpg", "L056 translator comparison visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-058-libraries.jpg", "L058 libraries visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-058-static-dynamic.jpg", "L058 static/dynamic visual"],
]) {
  const dimensions = jpegDimensions(file);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${label}: expected 1536x1024 JPEG`);
}

const mutations = [
  ["S5.01", /process management/gi],
  ["S5.02", /disk formatter/gi],
  ["S5.03", /software under development/gi],
  ["S5.04", /assembler/gi],
  ["S5.05", /disadvantages|drawbacks/gi],
  ["S5.06", /partly interpreted/gi],
  ["S5.07", /prettyprint/gi],
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

const assessmentMutation = evaluateRequirement(requirements.get("S5.06"), {
  questionTransform: (question) => ["L060-Q4", "AQ060-Q5"].includes(question.id)
    ? {
        ...question,
        prompt: question.prompt.replace(/Java|compiled|interpreted|bytecode|JVM/gi, "removed concept"),
        answer: question.answer.replace(/Java|compiled|interpreted|bytecode|JVM/gi, "removed concept"),
        points: question.points.map(([code, text]) => [code, text.replace(/Java|compiled|interpreted|bytecode|JVM/gi, "removed concept")]),
        guidance: question.guidance.map((text) => text.replace(/Java|compiled|interpreted|bytecode|JVM/gi, "removed concept")),
      }
    : question,
});
expect(assessmentMutation.status === "Partial", "mutation escaped: removing Java translation from both assessment forms must fail S5.06");

const ledger = JSON.parse(read("audits/repair-batch-10-section5-system-software.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 9, "Batch 10 ledger must resolve seven requirements and two visual defects");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 10 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 10 Section 5 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 10 verification passed: seven Section 5 requirements are Complete, eleven assessment checks and four technical visuals pass, and eight mutations are rejected.");
