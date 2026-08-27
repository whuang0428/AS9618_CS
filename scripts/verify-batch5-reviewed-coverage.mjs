import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { sourceFactOverrides } from "./stage10-semantic-source-overrides.mjs";
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

const scopedRequirements = ["S1.08", "S1.10", "S3.09", "S5.02", "S8.10", "S9.01", "S11.08", "S12.01"];
for (const id of scopedRequirements) {
  const requirement = requirements.get(id);
  expect(Boolean(requirement), `${id}: contract row is missing`);
  if (!requirement) continue;
  const evaluation = evaluateRequirement(requirement);
  expect(evaluation.status === "Complete", `${id}: ${evaluation.messages.join("; ")}`);
}

const soundMarkdown = read("lessons/010-digital-sound-sampling-rate-sample-resolution-and-duration.md");
const soundHtml = read("web/lesson-010/index.html");
const soundCore = sectionHtml(soundHtml, "stage2-completion");
includesAll(soundMarkdown, ["sampling resolution", "official syllabus term", "analogue-to-digital sampling", "file size in bits", "accuracy"], "L010 Markdown");
includesAll(soundCore, ["sampling resolution", "sample resolution", "common synonym", "analogue-to-digital sampling", "size in bits"], "L010 visible CORE teaching");
includesAll(questionText("AQ010-Q5"), ["sampling rate", "sampling resolution", "bits/levels"], "Quiz 10 terminology");
expect(!/\bsample resolution\b/i.test(questionText("AQ010-Q5")), "Quiz 10 still uses the non-primary term sample resolution");

const l137Html = read("web/lesson-137/index.html");
const l137Transcript = sectionHtml(l137Html, "explanation-java");
includesAll(l137Transcript, ["Infographic text alternative", "ELSE", "ENDIF"], "L137 Java visual transcript");
includesAll((sourceFactOverrides["137/java"] ?? []).join(" "), ["ELSE", "ENDIF"], "L137 maintained source facts");

includesAll((sourceFactOverrides["034/sensors"] ?? []).join(" "), ["temperature", "pressure", "infra-red", "sound sensor"], "sensor visual facts");
includesAll((sourceFactOverrides["055/compare"] ?? []).join(" "), ["disk formatter", "virus checker", "defragmenter", "disk contents analysis/repair", "compression", "backup"], "utility visual facts");
includesAll((sourceFactOverrides["130/parameters"] ?? []).join(" "), ["interface", "header", "parameter", "argument", "return value"], "subprogram visual facts");

for (const [id, term] of [
  ["S1.10", "sampling resolution"],
  ["S3.09", "infra-red"],
  ["S5.02", "disk formatter"],
  ["S8.10", "INNER JOIN"],
  ["S9.01", "abstract model"],
  ["S11.08", "procedure header"],
  ["S12.01", "RAD"],
]) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const teachingLessons = new Set(requirements.get(id).teachingLessons);
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ lesson: current, markdown, html }) => teachingLessons.has(current)
      ? {
          markdown: markdown.replaceAll(new RegExp(escaped, "gi"), "removed concept"),
          html: html.replaceAll(new RegExp(escaped, "gi"), "removed concept"),
        }
      : { markdown, html },
  });
  expect(mutation.status === "Partial", `mutation escaped: removing ${term} must fail ${id}`);
}

const ledger = JSON.parse(read("audits/repair-batch-5-reviewed-coverage.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 10, "Batch 5 ledger must resolve exactly ten scoped records");

if (failures.length) {
  console.error(`Batch 5 reviewed-coverage verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 5 verification passed: eight coverage rows are Complete, official sound terminology is primary, the L137 transcript is complete and seven mutations are rejected.");
