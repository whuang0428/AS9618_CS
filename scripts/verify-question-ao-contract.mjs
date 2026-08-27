import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "question-ao-contract.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const current = loadAllQuestions();
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

function validate(candidate) {
  const problems = [];
  const rows = candidate.questions ?? [];
  const byId = new Map(rows.map((row) => [row.questionId, row]));
  if (rows.length !== 963) problems.push(`expected 963 rows, found ${rows.length}`);
  if (byId.size !== rows.length) problems.push("question IDs are not unique");
  for (const question of current) {
    const row = byId.get(question.id);
    if (!row) { problems.push(`${question.id}: AO mapping missing`); continue; }
    if (row.contentHash !== question.hash) problems.push(`${question.id}: content hash is stale`);
    if (row.reviewStatus !== "Reviewed") problems.push(`${question.id}: mapping is not Reviewed`);
    if (!Array.isArray(row.assessmentObjectives) || row.assessmentObjectives.length === 0) problems.push(`${question.id}: AO is empty`);
    if (row.assessmentObjectives?.some((ao) => !["AO1", "AO2", "AO3"].includes(ao))) problems.push(`${question.id}: invalid AO`);
    if (question.lesson <= 97 && row.assessmentObjectives?.some((ao) => ao === "AO3")) problems.push(`${question.id}: Paper 1 cannot carry AO3`);
    if (question.lesson >= 98 && row.assessmentObjectives?.some((ao) => ao === "AO1")) problems.push(`${question.id}: Paper 2 cannot carry AO1`);
    if (row.paper !== (question.lesson <= 97 ? "Paper 1" : "Paper 2")) problems.push(`${question.id}: paper identity is wrong`);
    if (!row.rationale || !row.classificationMethod) problems.push(`${question.id}: classification evidence is incomplete`);
  }
  return problems;
}

for (const [ao, definition] of Object.entries(contract.officialDefinitions ?? {})) {
  expect(["AO1", "AO2", "AO3"].includes(ao) && typeof definition === "string" && definition.length > 40, `${ao}: official definition is missing`);
}
expect(contract.paperConstraints?.["Paper 1"]?.AO3 === 0, "Paper 1 AO3 weighting must be zero");
expect(contract.paperConstraints?.["Paper 2"]?.AO1 === 0, "Paper 2 AO1 weighting must be zero");
failures.push(...validate(contract));

const mutated = structuredClone(contract);
mutated.questions[0].assessmentObjectives = [];
expect(validate(mutated).some((message) => message.includes("AO is empty")), "mutation escaped: an empty AO mapping was accepted");
const stale = structuredClone(contract);
stale.questions[1].contentHash = "0".repeat(64);
expect(validate(stale).some((message) => message.includes("content hash is stale")), "mutation escaped: a stale question hash was accepted");

const lessonCount = contract.questions.filter(({ source }) => source === "lesson").length;
const bankCount = contract.questions.filter(({ source }) => source === "assessment").length;
expect(lessonCount === 750, `expected 750 lesson questions, found ${lessonCount}`);
expect(bankCount === 213, `expected 213 assessment-bank questions, found ${bankCount}`);

if (failures.length) {
  console.error(`Question AO verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const counts = Object.fromEntries(["AO1", "AO2", "AO3"].map((ao) => [ao, contract.questions.filter((row) => row.assessmentObjectives.includes(ao)).length]));
console.log(`Question AO contract verified: 963 unique current hashes; lesson 750, bank 213; AO1 ${counts.AO1}, AO2 ${counts.AO2}, AO3 ${counts.AO3}; two mutations rejected.`);
