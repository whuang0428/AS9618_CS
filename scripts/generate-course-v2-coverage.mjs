import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const syllabus = JSON.parse(fs.readFileSync(path.join(root, "scripts", "syllabus-coverage-contract.json"), "utf8"));
const content = JSON.parse(fs.readFileSync(path.join(root, "scripts", "course-v2-content.json"), "utf8"));
const questions = JSON.parse(fs.readFileSync(path.join(root, "scripts", "question-bank-contract.json"), "utf8"));

const rows = syllabus.requirements.map((requirement) => {
  const teachingLessons = content.lessons
    .filter((lesson) => lesson.syllabusIds.includes(requirement.id))
    .map((lesson) => lesson.lesson);
  const practiceQuestions = questions.questions
    .filter((question) => question.syllabusIds.includes(requirement.id))
    .map((question) => question.id);
  return {
    id: requirement.id,
    section: requirement.section,
    requirement: requirement.requirement,
    teachingLessons,
    practiceQuestions,
    directTeachingCovered: teachingLessons.length > 0,
    practiceCovered: practiceQuestions.length > 0,
  };
});

const contract = {
  schemaVersion: 1,
  syllabus: syllabus.syllabus,
  requirementCount: rows.length,
  coveredForTeaching: rows.filter((row) => row.directTeachingCovered).length,
  coveredForPractice: rows.filter((row) => row.practiceCovered).length,
  source: "Active evidence map for the 90-lesson course. The former 151-lesson contract remains historical input only.",
  requirements: rows,
};

fs.writeFileSync(path.join(root, "scripts", "course-v2-coverage-contract.json"), `${JSON.stringify(contract, null, 2)}\n`);
console.log(JSON.stringify({
  requirements: contract.requirementCount,
  teachingCovered: contract.coveredForTeaching,
  practiceCovered: contract.coveredForPractice,
}, null, 2));
