import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { classifyCommand, officialCommandWords } from "./cie-command-words.mjs";
import { explanations } from "./stage10-explanations-data.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { evaluateWordingReviewRegister } from "./remediation-v2-review-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const fail = (message) => failures.push(message);
const hash = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const review = JSON.parse(fs.readFileSync(path.join(root, "audits", "remediation-v2-stage4-question-review.json"), "utf8"));
const reviewById = new Map(review.entries.map((entry) => [entry.questionId, entry]));

if (officialCommandWords.length !== 27 || new Set(officialCommandWords).size !== 27) fail("Official command-word table must contain exactly 27 unique syllabus entries");
if (review.officialCommandWords.join() !== officialCommandWords.join()) fail("Stage 4 review command-word table is stale");

const lessonMarkdown = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.endsWith(".md")).map((name) => fs.readFileSync(path.join(root, "lessons", name), "utf8"));
const lessonHtml = Array.from({ length: 150 }, (_, index) => fs.readFileSync(path.join(root, "web", `lesson-${String(index + 1).padStart(3, "0")}`, "index.html"), "utf8"));
const learnerCorpus = [...lessonMarkdown, ...lessonHtml].join("\n");
for (const pattern of [/Describe the purpose of \*\*/, /must explicitly use \*\*/i, /CIE-style/, /dramatic|paperweight|keyboard heroics|goldfish|\bvibes\b/i]) if (pattern.test(learnerCorpus)) fail(`Prohibited wording remains: ${pattern}`);

const questions = loadAllQuestions();
if (questions.length !== 963 || review.entries.length !== 963) fail(`Expected 963 current questions and reviews; found ${questions.length}/${review.entries.length}`);
for (const question of questions) {
  const row = reviewById.get(question.id);
  if (!row) { fail(`${question.id}: Stage 4 review missing`); continue; }
  if (row.contentHash !== question.hash) fail(`${question.id}: Stage 4 review hash is stale`);
  if (row.marks !== question.marks || question.points.length !== question.marks) fail(`${question.id}: marks and independent points disagree`);
  if (!row.primaryRequirement || !/^S(?:[1-9]|1[0-2])\.\d{2}$/.test(row.primaryRequirement)) fail(`${question.id}: primary requirement missing`);
  const result = classifyCommand(question.prompt, row.primaryRequirement);
  if (result.status !== "Approved" || result.word !== row.primaryCommandWord || result.kind !== row.commandClassification) fail(`${question.id}: primary command classification is not reproducible`);
  if (/\b(?:distinguish|recommend)\b/i.test(question.prompt)) fail(`${question.id}: unsupported legacy command wording remains`);
  if (!Array.isArray(row.assessmentObjectives) || !row.assessmentObjectives.length) fail(`${question.id}: AO missing`);
  for (const key of ["correctAnswer", "commonError", "boundaryAnswer", "outOfScopeAnswer"]) {
    const trial = row.trialCases?.[key];
    if (!trial || trial.result !== "Pass" || trial.expectedMarks !== trial.observedMarks) fail(`${question.id}: ${key} trial did not pass`);
  }
  if (row.trialCases?.correctAnswer?.observedMarks !== question.marks || row.trialCases?.outOfScopeAnswer?.observedMarks !== 0) fail(`${question.id}: trial score boundary is wrong`);
}

const assessmentMarkdown = ["quizzes.md", "monthly-assessments.md", "stage-reviews.md"].map((name) => fs.readFileSync(path.join(root, "assessments", name), "utf8")).join("\n");
const assessmentHtml = fs.readFileSync(path.join(root, "web", "assessments", "index.html"), "utf8");
if (/\*\*(?:B1|M1|A1)\*\*/.test(assessmentMarkdown) || /<strong>(?:B1|M1|A1)<\/strong>/.test(assessmentHtml)) fail("Assessment Bank exposes internal B1/M1/A1 codes");
if ((assessmentHtml.match(/<th>Answer<\/th><th>Guidance<\/th><th>Marks<\/th>/g) ?? []).length !== 213) fail("Assessment Bank does not render 213 Answer/Guidance/Marks tables");
for (let lesson = 1; lesson <= 150; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const app = fs.readFileSync(path.join(root, "web", `lesson-${id}`, "app.js"), "utf8");
  if (!app.includes("function renderStudentMarkPoints(question)")) fail(`L${id}: student mark-scheme renderer missing`);
  if (!app.includes('role="columnheader">Answer') || !app.includes('role="columnheader">Guidance') || !app.includes('role="columnheader">Marks')) fail(`L${id}: Answer/Guidance/Marks headings missing`);
  if (/marking\.map\([\s\S]{0,180}\.(?:mark)\}/.test(app)) fail(`L${id}: renderer still exposes internal mark codes`);
}

const expectedHashes = new Map();
for (let lesson = 1; lesson <= 150; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${id}-`) && name.endsWith(".md"));
  expectedHashes.set(`lesson-markdown:L${id}`, hash(fs.readFileSync(path.join(root, "lessons", markdownName), "utf8")));
  expectedHashes.set(`lesson-html:L${id}`, hash(fs.readFileSync(path.join(root, "web", `lesson-${id}`, "index.html"), "utf8")));
}
for (const question of questions) expectedHashes.set(`question:${question.id}`, question.hash);
for (const item of explanations) expectedHashes.set(`infographic:${item.lesson}/${item.targetId}`, hash([item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n")));
const register = fs.readFileSync(path.join(root, "audits", "cie-wording-review-register.csv"), "utf8");
const evaluation = evaluateWordingReviewRegister(register, expectedHashes, { requireAllApproved: true });
for (const problem of evaluation.problems) fail(`CIE review gate: ${problem}`);

if (failures.length) {
  console.error(`CIE wording verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`CIE wording verification passed: 27 official command words, 963 item-level reviews with four trials each, ${evaluation.counts.approved} current-hash approvals and no student-visible B1/M1/A1 codes.`);
