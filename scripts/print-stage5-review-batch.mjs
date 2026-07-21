import { loadAllQuestions } from "./ms-review-utils.mjs";

const [scope = "lesson", startText = "1", endText = startText] = process.argv.slice(2);
const start = Number(startText);
const end = Number(endText);

if (!Number.isInteger(start) || !Number.isInteger(end) || start > end) {
  throw new Error("Usage: node scripts/print-stage5-review-batch.mjs <lesson|assessment> <start> <end>");
}

const questions = loadAllQuestions().filter((question) => {
  if (scope === "lesson") return question.source === "lesson" && question.lesson >= start && question.lesson <= end;
  if (scope === "assessment") return question.source !== "lesson" && question.lesson >= start && question.lesson <= end;
  throw new Error(`Unknown scope: ${scope}`);
});

for (const question of questions) {
  console.log(`\n## ${question.id} | ${question.marks} marks | Section ${question.section}`);
  console.log(`Prompt: ${question.prompt}`);
  console.log(`Answer: ${question.answer}`);
  console.log("Marking points:");
  question.points.forEach(([code, text]) => console.log(`- ${code}: ${text}`));
  console.log("Guidance:");
  question.guidance.forEach((note) => console.log(`- ${note}`));
}

console.log(`\nPrinted ${questions.length} questions.`);
