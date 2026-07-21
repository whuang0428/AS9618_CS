import fs from "node:fs";
import path from "node:path";
import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const sum = (questions) => questions.reduce((total, question) => total + question.marks, 0);
const allQuestions = [...quizzes, ...monthlyAssessments, ...stageReviews].flatMap((entry) => entry.questions);
const coveredSections = new Set();
for (const entry of [...quizzes, ...monthlyAssessments, ...stageReviews]) {
  for (const reference of entry.sections) {
    const range = String(reference).match(/^(\d+)-(\d+)$/);
    if (range) {
      for (let section = Number(range[1]); section <= Number(range[2]); section += 1) coveredSections.add(section);
    } else {
      coveredSections.add(Number.parseInt(reference, 10));
    }
  }
}

check(quizzes.length === 30, "There must be 30 quizzes");
check(monthlyAssessments.length === 7, "There must be 7 monthly assessments");
check(stageReviews.length === 14, "There must be 14 stage reviews");
check(new Set(quizzes.map((entry) => entry.lesson)).size === 30, "Quiz lesson numbers must be unique");
check(new Set(monthlyAssessments.map((entry) => entry.lesson)).size === 7, "Monthly lesson numbers must be unique");
check(new Set(stageReviews.map((entry) => entry.lesson)).size === 14, "Review lesson numbers must be unique");
for (let section = 1; section <= 12; section += 1) {
  check(coveredSections.has(section), `Syllabus Section ${section} is missing from the assessment bank`);
}

for (const entry of quizzes) check(sum(entry.questions) === 10, `Quiz L${entry.lesson} must total 10 marks`);
for (const entry of monthlyAssessments) check(sum(entry.questions) === 24, `Monthly L${entry.lesson} must total 24 marks`);
for (const entry of stageReviews) {
  check(sum(entry.questions) === 10, `Review L${entry.lesson} must total 10 exam marks`);
  check(entry.retrieval.length === 6, `Review L${entry.lesson} must have six retrieval items`);
  check(entry.errors.length === 2, `Review L${entry.lesson} must have two corrections`);
}
for (const question of allQuestions) {
  check(question.points.length === question.marks, `MS point count does not match [${question.marks}]: ${question.prompt}`);
  check(question.points.every(([code, text]) => /^(B1|M1|A1)$/.test(code) && typeof text === "string" && text.trim().length >= 2), `Invalid mark point: ${question.prompt}`);
  check(question.note.length >= 15, `Guidance is too short: ${question.prompt}`);
}
check(new Set(allQuestions.map((question) => question.prompt)).size === allQuestions.length, "Assessment question prompts must be unique");

const quizMd = fs.readFileSync(path.join(root, "assessments", "quizzes.md"), "utf8");
const monthlyMd = fs.readFileSync(path.join(root, "assessments", "monthly-assessments.md"), "utf8");
const reviewMd = fs.readFileSync(path.join(root, "assessments", "stage-reviews.md"), "utf8");
const web = fs.readFileSync(path.join(root, "web", "assessments", "index.html"), "utf8");

check((quizMd.match(/^## Quiz after Lesson/gm) ?? []).length === 30, "Generated quiz heading count is incorrect");
check((monthlyMd.match(/^## Checkpoint at Lesson/gm) ?? []).length === 7, "Generated monthly heading count is incorrect");
check((reviewMd.match(/^## Lesson/gm) ?? []).length === 14, "Generated review heading count is incorrect");
check((web.match(/class="assessment"/g) ?? []).length === 51, "Assessment hub must contain 51 assessment cards");
check(web.includes("Show MS") && web.includes("Show answers") && web.includes("Show corrections"), "Assessment hub expandable answers/MS are incomplete");
for (const text of [quizMd, monthlyMd, reviewMd]) {
  check(!text.includes("Define one key term from Syllabus Section"), "Generic quiz placeholder remains");
  check(!text.includes("Apply one calculation, trace, diagram"), "Generic monthly placeholder remains");
  check(!text.includes("Retrieval grid: 6 quick prompts"), "Generic review placeholder remains");
  check(text.includes("official Cambridge 9618 past-papers"), "Official calibration source link is missing");
}

const promptCorpus = allQuestions.map((question) => question.prompt).join(" ").toLowerCase();
for (const command of ["state", "describe", "explain", "calculate", "write", "compare", "distinguish", "justify", "evaluate", "convert", "trace", "construct", "design", "recommend"]) {
  check(promptCorpus.includes(command), `Command-word variety missing: ${command}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Assessment verification passed: 30 quizzes, 7 monthly assessments, 14 stage reviews, ${allQuestions.length} unique exam questions.`);
