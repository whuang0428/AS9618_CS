import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(readFileSync(join(root, "scripts", name), "utf8"));
const identity = readJson("lesson-identity-contract.json");
const content = readJson("course-v2-content.json");
const coverage = readJson("course-v2-coverage-contract.json");
const questions = readJson("question-bank-contract.json");
const migration = readJson("course-v2-migration.json");
const fail = (condition, message) => { if (!condition) throw new Error(message); };

fail(identity.schemaVersion === 3 && identity.lessons.length === 90, "Archived identity contract must retain 90 lessons");
fail(content.lessonCount === 90 && content.lessons.length === 90, "Archived content contract must retain 90 lessons");
fail(coverage.requirementCount === 121 && coverage.coveredForTeaching === 121 && coverage.coveredForPractice === 121, "Archived coverage contract must retain 121 complete requirements");
fail(questions.questionCount === 272 && questions.questions.length === 272, "Archived question bank must retain 272 questions");
fail(migration.sourceLessonCount === 151 && migration.targetLessonCount === 90 && migration.rows.length === 151, "Archived migration register must retain all 151-to-90 rows");

const markdown = readdirSync(join(root, "lessons")).filter((name) => /^\d{3}-.*\.md$/.test(name));
fail(markdown.length === 90, `Archived Markdown set must retain 90 lessons, found ${markdown.length}`);
fail(identity.lessons.every((lesson) => markdown.includes(lesson.markdownFile)), "Archived identity contract references a missing Markdown lesson");

for (const path of [
  "audits/course-v2-redundancy-and-migration-report.md",
  "audits/course-v2-migration-register.csv",
  "scripts/course-v2-content.json",
  "scripts/course-v2-migration.json",
]) fail(existsSync(join(root, path)), `Missing archived course artifact ${path}`);

for (let lesson = 1; lesson <= 151; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const html = readFileSync(join(root, "web", `lesson-${id}`, "index.html"), "utf8");
  fail(/Course link updated/.test(html), `lesson-${id} is not a compatibility entry`);
  fail(!/v2-question|v2-point|Mechanism or method|Mastery check/.test(html), `lesson-${id} exposes archived teaching content`);
}

console.log("Archived course verified: 90 Markdown/content records and 151 migration rows retained; no archived lesson remains student-facing.");
