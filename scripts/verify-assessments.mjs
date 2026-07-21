import fs from "node:fs";
import path from "node:path";
import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const sum = (questions) => questions.reduce((total, question) => total + question.marks, 0);
const allQuestions = [...quizzes, ...monthlyAssessments, ...stageReviews].flatMap((entry) => entry.questions);
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
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
for (const entry of quizzes) {
  check(entry.questions.length === 5, `Quiz L${entry.lesson} must contain five lesson-linked questions`);
  check(entry.questions.every((question) => question.marks === 2), `Quiz L${entry.lesson} questions must each carry two marks`);
  check(entry.coveredLessons.length === 5, `Quiz L${entry.lesson} must map five source lessons`);
  check(entry.questions.every((question, index) => question.sourceLesson === entry.coveredLessons[index]), `Quiz L${entry.lesson} source-lesson mapping is inconsistent`);
  const expectedObjectives = entry.lesson <= 95 ? ["AO1", "AO2"] : entry.lesson === 100 ? ["AO1", "AO2", "AO3"] : ["AO2", "AO3"];
  check(entry.assessmentObjectives.join() === expectedObjectives.join(), `Quiz L${entry.lesson} has incorrect assessment objectives`);
}
const quizLessonCoverage = quizzes.flatMap((entry) => entry.coveredLessons);
check(quizLessonCoverage.length === 150, "Quiz mapping must contain 150 lesson references");
check(new Set(quizLessonCoverage).size === 150, "Each lesson must map to exactly one quiz question");
check(quizLessonCoverage.every((lesson, index) => lesson === index + 1), "Quiz lesson mapping must cover Lessons 001-150 in order");
for (const entry of monthlyAssessments) check(sum(entry.questions) === 30, `Monthly L${entry.lesson} must total 30 marks`);
for (const entry of monthlyAssessments) {
  check(entry.questions.length === 5, `Monthly L${entry.lesson} must contain five questions`);
  const expectedObjectives = entry.lesson < 100 ? ["AO1", "AO2"] : entry.lesson === 100 ? ["AO1", "AO2", "AO3"] : ["AO2", "AO3"];
  check(entry.assessmentObjectives.join() === expectedObjectives.join(), `Monthly L${entry.lesson} has incorrect assessment objectives`);
}
for (const entry of stageReviews) {
  check(sum(entry.questions) === 10, `Review L${entry.lesson} must total 10 exam marks`);
  check(entry.retrieval.length === 6, `Review L${entry.lesson} must have six retrieval items`);
  check(entry.errors.length === 2, `Review L${entry.lesson} must have two corrections`);
  check(sum(entry.questions) + entry.retrieval.length + (entry.errors.length * 2) === 20, `Review L${entry.lesson} must total 20 marks`);
  const expectedObjectives = entry.lesson <= 97 ? ["AO1", "AO2"] : ["AO2", "AO3"];
  check(entry.assessmentObjectives.join() === expectedObjectives.join(), `Review L${entry.lesson} has incorrect assessment objectives`);
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
const home = fs.readFileSync(path.join(root, "web", "index.html"), "utf8");
const resourceWeb = fs.readFileSync(path.join(root, "web", "resources", "index.html"), "utf8");

check((quizMd.match(/^## Quiz after Lesson/gm) ?? []).length === 30, "Generated quiz heading count is incorrect");
check((monthlyMd.match(/^## Checkpoint at Lesson/gm) ?? []).length === 7, "Generated monthly heading count is incorrect");
check((reviewMd.match(/^## Lesson/gm) ?? []).length === 14, "Generated review heading count is incorrect");
check((quizMd.match(/^\*\*Coverage:\*\* Lessons/gm) ?? []).length === 30, "Every quiz must show its five-lesson coverage range");
check((monthlyMd.match(/^\*\*Total:\*\* 30 marks/gm) ?? []).length === 7, "Every monthly assessment must show 30 marks");
check((reviewMd.match(/^\*\*Total:\*\* 20 marks/gm) ?? []).length === 14, "Every stage review must show 20 marks");
check((reviewMd.match(/^### Retrieval Grid \[6\]/gm) ?? []).length === 14, "Every stage review must allocate six retrieval marks");
check((reviewMd.match(/^### Error Clinic \[4\]/gm) ?? []).length === 14, "Every stage review must allocate four correction marks");
check((quizMd.match(/^\*\*Assessment objectives:\*\*/gm) ?? []).length === 30, "Every quiz must show assessment objectives");
check((monthlyMd.match(/^\*\*Assessment objectives:\*\*/gm) ?? []).length === 7, "Every monthly assessment must show assessment objectives");
check((reviewMd.match(/^\*\*Assessment objectives:\*\*/gm) ?? []).length === 14, "Every stage review must show assessment objectives");
check((web.match(/class="assessment"/g) ?? []).length === 51, "Assessment hub must contain 51 assessment cards");
check(web.includes("Show MS") && web.includes("Show answers") && web.includes("Show corrections"), "Assessment hub expandable answers/MS are incomplete");
check((web.match(/>30 marks</g) ?? []).length === 7, "Assessment hub monthly totals must be 30 marks");
check((web.match(/>20 marks</g) ?? []).length === 14, "Assessment hub stage-review totals must be 20 marks");
check((web.match(/>10 marks</g) ?? []).length === 30, "Assessment hub quiz totals must be 10 marks");
check(home.includes('href="./assessments/"'), "Course index must link to the assessment bank");
check(home.includes('href="./resources/"'), "Course index must link to the resource centre");
check((resourceWeb.match(/class="resource-card"/g) ?? []).length === 4, "Resource centre must expose all four resource files");
for (const label of ["Glossary", "Pseudocode and Java", "Common misconceptions", "Marking conventions"]) {
  check(resourceWeb.includes(label), `Resource centre is missing ${label}`);
}
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

for (const entry of quizzes) {
  for (const question of entry.questions) {
    check(quizMd.includes(question.prompt), `Quiz Markdown is missing L${question.sourceLesson} question text`);
    check(web.includes(escapeHtml(question.prompt)), `Assessment webpage is missing L${question.sourceLesson} quiz text`);
    for (const [code, point] of question.points) {
      check(quizMd.includes(`**${code}** ${point}`), `Quiz Markdown is missing an MS point for L${question.sourceLesson}`);
      check(web.includes(`<strong>${code}</strong> ${escapeHtml(point)}`), `Assessment webpage is missing an MS point for L${question.sourceLesson}`);
    }
  }
}
for (const [entries, markdown, label] of [[monthlyAssessments, monthlyMd, "monthly"], [stageReviews, reviewMd, "review"]]) {
  for (const entry of entries) {
    for (const question of entry.questions) {
      check(markdown.includes(question.prompt), `${label} Markdown is missing a question at L${entry.lesson}`);
      check(web.includes(escapeHtml(question.prompt)), `${label} webpage is missing a question at L${entry.lesson}`);
      for (const [code, point] of question.points) {
        check(markdown.includes(`**${code}** ${point}`), `${label} Markdown is missing an MS point at L${entry.lesson}`);
        check(web.includes(`<strong>${code}</strong> ${escapeHtml(point)}`), `${label} webpage is missing an MS point at L${entry.lesson}`);
      }
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Stage 4 assessment verification passed: 30 quizzes covering Lessons 001-150, 7 x 30-mark monthly assessments, 14 x 20-mark stage reviews, ${allQuestions.length} unique exam questions, and matching Markdown/web MS content.`);
