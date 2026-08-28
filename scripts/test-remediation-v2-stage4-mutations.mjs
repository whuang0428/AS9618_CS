import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { evaluateStage4QuestionPolicy, evaluateStudentMarkSchemeSurface } from "./remediation-v2-stage4-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const review = JSON.parse(fs.readFileSync(path.join(root, "audits", "remediation-v2-stage4-question-review.json"), "utf8"));
const questions = loadAllQuestions();
const failures = [];
const rejected = (label, mutateReview = () => {}, mutateQuestions = () => {}) => {
  const candidateReview = structuredClone(review);
  const candidateQuestions = structuredClone(questions);
  mutateReview(candidateReview); mutateQuestions(candidateQuestions);
  if (!evaluateStage4QuestionPolicy(candidateReview, candidateQuestions).length) failures.push(`${label} mutation escaped`);
};
rejected("unsupported Distinguish", () => {}, (candidate) => { candidate[0].prompt = "Distinguish a bit from a byte."; candidate[0].hash = "mutated"; });
rejected("unsupported Trace requirement", (candidate) => { const row = candidate.entries.find(({ questionId }) => questionId === "AQ050-Q2"); row.primaryRequirement = "S4.01"; });
rejected("missing boundary trial", (candidate) => { delete candidate.entries[0].trialCases.boundaryAnswer; });
if (!evaluateStudentMarkSchemeSurface("Answer Guidance Marks **B1** exposed").length) failures.push("student-visible B1 mutation escaped");
if (failures.length) {
  console.error(`Stage 4 mutation tests failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Stage 4 mutation tests passed: unsupported wording, wrong operation basis, missing trial and visible-code mutations were rejected.");
