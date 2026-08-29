import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const questionText = (id) => {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
};
const includesAll = (text, terms, label) => {
  const source = text.toLowerCase();
  for (const term of terms) expect(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
};

for (const id of ["S4.05", "S5.01", "S6.07", "S12.07"]) {
  const evaluation = evaluateRequirement(requirements.get(id));
  expect(evaluation.messages.length === 0, `${id}: ${evaluation.messages.join("; ")}`);
}

includesAll(questionText("L049-Q5"), ["processor type", "cores", "bus width", "clock speed", "cache"], "L049-Q5");
includesAll(questionText("AQ045-Q5"), ["machine code", "processor dependent", "instruction set", "assembler", "mnemonic", "opcode"], "AQ045-Q5");
includesAll(questionText("L053-Q5"), ["operating system", "process management", "memory management", "file management", "security management", "hardware management"], "L053-Q5");
includesAll(questionText("L069-Q2"), ["range check", "limit check", "lower", "upper", "maximum", "length check", "format check", "presence check", "existence check"], "L069-Q2");
includesAll(questionText("L069-Q4"), ["check digit", "calculated", "recalculates", "compares"], "L069-Q4");
includesAll(questionText("L137-Q1"), ["normal", "abnormal", "extreme/boundary", "valid", "invalid"], "L137-Q1");

const l137Markdown = read("lessons/137-testing-with-normal-boundary-and-erroneous-data.md");
const l137Html = read("web/lesson-137/index.html");
const l137App = read("web/lesson-137/app.js");
const courseCatalog = read("web/course-catalog.js");
includesAll(l137Markdown, ["Course sequence Section 11", "Optional enrichment preview of Section 12.3", "normal", "abnormal", "extreme/boundary"], "L137 Markdown identity and categories");
includesAll(l137Html, ["Paper 2 Section 11", "Optional enrichment preview of Section 12.3", "normal", "abnormal", "extreme/boundary", "Show answer"], "L137 visible teaching");
expect(!/testing proves whether the check works/i.test(l137Html), "L137 still claims finite testing proves the validation rule works");
expect(!/which values prove/i.test(l137Html), "L137 still says selected test values prove the validation rule works");
expect(!/\["(?:0|100)",\s*"Boundary"/.test(l137App), "L137 dynamic examples still display Boundary as a replacement category");
expect(/"id": "137"[\s\S]{0,260}"section": "Section 11"/.test(courseCatalog), "L137 toolbar/catalogue identity is not Section 11");

const forbiddenReplacement = /normal[,/ ]+(?:boundary|extreme)[,/ ]+erroneous/gi;
for (const relativePath of [
  "lessons/137-testing-with-normal-boundary-and-erroneous-data.md",
  "web/lesson-137/index.html",
  "web/lesson-137/app.js",
  "web/lesson-139/app.js",
  "scripts/stage10-visual-repair-facts.json",
  "scripts/stage10-rollout-jobs.json",
]) {
  expect(!forbiddenReplacement.test(read(relativePath)), `${relativePath}: old erroneous-as-category sequence remains`);
  forbiddenReplacement.lastIndex = 0;
}

const imageDirectory = path.join(root, "web", "assets", "diagrams", "stage10-infographics");
for (const target of ["purpose", "boundary", "erroneous", "table", "validation"]) {
  const file = path.join(imageDirectory, `stage10-lesson-137-${target}.jpg`);
  expect(fs.existsSync(file) && fs.statSync(file).size > 100_000, `L137 ${target} replacement image is missing or implausibly small`);
  const digest = fs.existsSync(file) ? crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex") : "";
  expect(/^[a-f0-9]{64}$/.test(digest), `L137 ${target} replacement image hash is invalid`);
}

const toolbarCss = read("web/lesson-toolbar.css");
const academicThemeCss = read("web/academic-theme.css");
expect(/padding-bottom:\s*calc\(150px \+ env\(safe-area-inset-bottom\)\)/.test(toolbarCss), "mobile toolbar does not reserve sufficient bottom space");
expect(/scroll-padding-bottom:\s*calc\(150px \+ env\(safe-area-inset-bottom\)\)/.test(toolbarCss), "mobile toolbar does not reserve anchor/focus scroll space");
expect(/bottom:\s*max\(12px, env\(safe-area-inset-bottom\)\)/.test(toolbarCss), "mobile toolbar does not account for the safe-area inset");
expect(/padding-bottom:\s*calc\(150px \+ env\(safe-area-inset-bottom\)\)/.test(academicThemeCss), "final academic-theme cascade overrides the mobile toolbar reserve");
expect(/scroll-padding-bottom:\s*calc\(150px \+ env\(safe-area-inset-bottom\)\)/.test(academicThemeCss), "final academic-theme cascade overrides mobile anchor/focus spacing");
expect(/bottom:\s*max\(12px, env\(safe-area-inset-bottom\)\)/.test(academicThemeCss), "final academic-theme cascade overrides the mobile safe-area inset");
for (let lesson = 1; lesson <= 150; lesson += 1) {
  const number = String(lesson).padStart(3, "0");
  expect(read(`web/lesson-${number}/index.html`).includes('../lesson-toolbar.css?v=3'), `L${number}: toolbar stylesheet version is stale`);
}

const processorMutation = evaluateRequirement(requirements.get("S4.05"), {
  lessonTransform: ({ lesson, markdown, html }) => lesson === 49
    ? { markdown: markdown.replaceAll(/processor type/gi, "processor category"), html: html.replaceAll(/processor type/gi, "processor category") }
    : { markdown, html },
});
expect(processorMutation.messages.some((message) => message.includes("processor type")), "mutation escaped: deleting processor type must fail S4.05");

const securityMutation = evaluateRequirement(requirements.get("S5.01"), {
  lessonTransform: ({ lesson, markdown, html }) => [52, 53].includes(lesson)
    ? { markdown: markdown.replaceAll(/security management/gi, "account checks"), html: html.replaceAll(/security management/gi, "account checks") }
    : { markdown, html },
});
expect(securityMutation.messages.some((message) => message.includes("security management")), "mutation escaped: deleting OS security management must fail S5.01");

const limitMutation = evaluateRequirement(requirements.get("S6.07"), {
  lessonTransform: ({ markdown, html }) => ({ markdown: markdown.replaceAll(/limit check/gi, "single-bound check"), html: html.replaceAll(/limit check/gi, "single-bound check") }),
});
expect(limitMutation.messages.some((message) => message.includes("limit check")), "mutation escaped: deleting limit check must fail S6.07");
expect(forbiddenReplacement.test("normal, boundary, erroneous"), "mutation escaped: old test-data category sequence must be forbidden");

const ledger = JSON.parse(read("audits/repair-batch-4-core-completeness.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 8, "Batch 4 ledger must resolve exactly eight scoped defects");

if (failures.length) {
  console.error(`Batch 4 core-completeness verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 4 core-completeness verification passed: four syllabus requirements, five replacement visuals, L137 identity and mobile toolbar spacing are verified; four mutations are rejected.");
