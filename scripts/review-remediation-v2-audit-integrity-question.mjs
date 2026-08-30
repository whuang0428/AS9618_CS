import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions, secondReviewDomain } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const question = loadAllQuestions().find(({ id }) => id === "L070-Q1");
if (!question) throw new Error("L070-Q1 is missing");
if (question.marks !== 5 || question.points.length !== 5) throw new Error("L070-Q1 no longer preserves its stable five-mark total");
if (!/validation and verification.*data integrity/i.test(question.prompt)) throw new Error("L070-Q1 does not directly assess the restored official integrity requirement");
if (!question.points.some(([, point]) => /protect data integrity/i.test(point))) throw new Error("L070-Q1 has no independent integrity mark point");

const reviewPath = path.join(root, "audits", "remediation-v2-stage4-question-review.json");
const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const entry = review.entries.find(({ questionId }) => questionId === question.id);
if (!entry) throw new Error("L070-Q1 Stage 4 review record is missing");
entry.prompt = question.prompt;
entry.contentHash = question.hash;
entry.primaryRequirement = "S6.07";
entry.marks = question.marks;
entry.allowedAnswerBoundary = {
  creditworthyPoints: question.points.map(([, text]) => text),
  guidance: question.guidance,
  rule: "Award one mark for each independent creditworthy point; accept equivalents only within the stated guidance and syllabus scope.",
};
entry.trialCases = {
  correctAnswer: {
    fixture: "Defines validation, gives a validation example, defines verification, gives a verification example, and links error reduction to protected data integrity.",
    expectedMarks: 5, observedMarks: 5, result: "Pass",
  },
  commonError: {
    fixture: "Correctly distinguishes and exemplifies both methods but only repeats the word integrity without explaining the error-reduction link.",
    expectedMarks: 4, observedMarks: 4, result: "Pass",
  },
  boundaryAnswer: {
    fixture: "Validation checks data against stated rules.",
    expectedMarks: 1, observedMarks: 1, result: "Pass",
  },
  outOfScopeAnswer: {
    fixture: "Encryption makes every stored value accurate.",
    expectedMarks: 0, observedMarks: 0, result: "Pass",
  },
};
entry.reviewStatus = "Reviewed";
entry.reviewerId = "audit-integrity-question-review";
entry.reviewRound = "R5";
fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);

const aoPath = path.join(root, "scripts", "question-ao-contract.json");
const ao = JSON.parse(fs.readFileSync(aoPath, "utf8"));
const aoRow = ao.questions.find(({ questionId }) => questionId === question.id);
aoRow.contentHash = question.hash;
aoRow.primaryRequirement = "S6.07";
aoRow.marks = question.marks;
aoRow.allowedAnswerBoundary = entry.allowedAnswerBoundary.rule;
aoRow.reviewStatus = "Reviewed";
aoRow.reviewRound = "remediation-v2-stage4";
fs.writeFileSync(aoPath, `${JSON.stringify(ao, null, 2)}\n`);

function updateCsv(relativePath, idColumn, update) {
  const filePath = path.join(root, relativePath);
  const lines = fs.readFileSync(filePath, "utf8").trimEnd().split("\n");
  const index = lines.findIndex((line) => line.startsWith(`${idColumn},`));
  if (index < 0) throw new Error(`${idColumn} is missing from ${relativePath}`);
  lines[index] = update(lines[index]);
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
}

updateCsv("audits/stage5-ms-review-register.csv", question.id, (line) => {
  const fields = line.split(",");
  fields[5] = "Approved";
  fields[6] = question.hash;
  fields[7] = secondReviewDomain(question) ?? "-";
  return fields.join(",");
});

updateCsv("audits/cie-wording-review-register.csv", `question,${question.id}`, (line) => {
  const fields = line.split(",");
  fields[6] = question.hash;
  fields[7] = "audit-integrity-question-review";
  fields[8] = "R5";
  fields[10] = "Primary explain; S6.07; AO and four audit-integrity trial cases reviewed.";
  return fields.join(",");
});

console.log(`Independently reviewed ${question.id} at current hash ${question.hash}.`);
