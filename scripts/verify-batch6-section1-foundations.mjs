import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

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

function questionText(id) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
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

const scopedRequirements = ["S1.01", "S1.02", "S1.03", "S1.04", "S1.05", "S1.06", "S1.07", "S1.08", "S1.09"];
for (const id of scopedRequirements) {
  const requirement = requirements.get(id);
  expect(Boolean(requirement), `${id}: contract row is missing`);
  if (!requirement) continue;
  const evaluation = evaluateRequirement(requirement);
  expect(evaluation.status === "Complete", `${id}: ${evaluation.messages.join("; ")}`);
  expect(requirement.evidenceReviewStatus === "Reviewed", `${id}: evidence mapping is not independently reviewed`);
}

const checks = [
  ["001", ["kibi", "kilo", "mebi", "mega", "gibi", "giga", "tebi", "tera", "powers of 1024", "powers of 1000"]],
  ["002", ["integer conversion", "binary is base 2", "denary is base 10"]],
  ["003", ["hexadecimal is base 16", "binary", "denary", "integer", "bcd", "digital clocks", "memory addresses"]],
  ["004", ["binary addition", "fixed-width overflow", "representable"]],
  ["005", ["one's-complement representation", "two's-complement representation", "binary subtraction", "negative"]],
  ["007", ["ascii", "extended ascii", "unicode", "stored internally in binary", "not expected to memorise"]],
  ["009", ["bitmap", "width in pixels", "height in pixels", "colour depth", "divide by 8", "metadata", "file header", "only when"]],
  ["012", ["vector encoding", "drawing list", "drawing objects", "properties", "given application", "bitmap"]],
];
for (const [lesson, terms] of checks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = read(`lessons/${markdownName}`);
  const html = read(`web/lesson-${lesson}/index.html`);
  includesAll(markdown, terms, `L${lesson} Markdown`);
  includesAll(sectionHtml(html, "stage2-completion"), terms, `L${lesson} visible CORE teaching`);
  const practice = sectionHtml(html, "stage2-practice");
  expect(/data-delivery-role="CORE"/i.test(practice) && /data-classroom-activity="PRACTISE"/i.test(practice), `L${lesson}: Stage 2 practice is not CORE/PRACTISE`);
  expect(/Show answer|Show MS/i.test(practice), `L${lesson}: Stage 2 practice has no visible answer/MS disclosure`);
}

includesAll(questionText("L001-Q2"), ["MB", "MiB", "different prefix systems"], "L001-Q2 prefix assessment");
includesAll(questionText("L005-Q5"), ["18 - 27", "complement", "11110111", "-9"], "L005-Q5 subtraction assessment");
includesAll(questionText("AQ010-Q1"), ["BCD", "digital clock", "four-bit"], "Quiz 10 BCD application assessment");
includesAll(questionText("AQ010-Q2"), ["Unicode", "ASCII", "worldwide messaging"], "Quiz 10 character-set assessment");
includesAll(questionText("AQ010-Q3"), ["bitmap", "colour depth", "bytes", "file header", "metadata"], "Quiz 10 bitmap pixel-data assessment");
includesAll(questionText("AQ010-Q4"), ["pixel data", "54-byte header", "20,054 bytes", "metadata"], "Quiz 10 bitmap metadata assessment");
includesAll(questionText("L009-Q5"), ["bitmap", "metadata", "17 KiB"], "L009 bitmap total-size assessment");
includesAll(questionText("AQ015-Q4"), ["bitmap", "vector", "school logo", "without pixelation"], "Quiz 15 vector application assessment");

const mutations = [
  ["S1.01", /\b(?:tebi|TiB)\b/gi],
  ["S1.02", /\bBCD\b/gi],
  ["S1.03", /\bintegers?\b/gi],
  ["S1.04", /\bbinary subtraction\b/gi],
  ["S1.05", /\boverflow\b/gi],
  ["S1.06", /\bdigital clocks?\b/gi],
  ["S1.07", /\bextended ASCII\b/gi],
  ["S1.08", /\b(?:metadata|file header)\b/gi],
  ["S1.09", /\bdrawing list\b/gi],
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

const assessmentMutation = evaluateRequirement(requirements.get("S1.06"), {
  questionTransform: (question) => question.id === "AQ010-Q1"
    ? {
        ...question,
        prompt: question.prompt.replace(/digital clock/gi, "device"),
        answer: question.answer.replace(/displayed denary digit/gi, "value"),
        points: question.points.map(([code, text]) => [code, text.replace(/displayed denary digit/gi, "value").replace(/digital clock/gi, "device")]),
      }
    : question,
});
expect(assessmentMutation.status === "Partial", "mutation escaped: removing the BCD application from AQ010-Q1 must fail S1.06");

const ledger = JSON.parse(read("audits/repair-batch-6-section1-foundations.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 8, "Batch 6 ledger must resolve exactly eight requirement records");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 6 ledger contains an unresolved or low-confidence record");

if (failures.length) {
  console.error(`Batch 6 Section 1 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 6 verification passed: nine Section 1 requirements are Complete, bitmap/metadata and vector teaching are on their correct lesson identities, direct assessments are aligned and ten mutations are rejected.");
