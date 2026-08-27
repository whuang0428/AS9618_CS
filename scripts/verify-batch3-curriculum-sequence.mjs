import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { coverageContract } from "./syllabus-coverage-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const questionText = (id) => {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
};
const assessedText = (id) => {
  const question = questions.get(id);
  return question ? [question.prompt, question.answer, ...question.points.flat()].join(" ") : "";
};
const includesAll = (text, terms, label) => {
  const source = text.toLowerCase();
  for (const term of terms) expect(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
};

const model = buildCurriculumSequenceModel();
expect(model.problems.length === 0, `current sequence model has ${model.problems.length} blocking problem(s)`);

includesAll(questionText("L001-Q1"), ["storage block", "16 KiB", "bits"], "L001-Q1");
expect(!/file header/i.test(questionText("L001-Q1")), "L001-Q1 still assesses a bitmap file header before L008");
includesAll(questionText("L008-Q1"), ["pixel data", "file header", "ignored"], "L008-Q1");

includesAll(questionText("AM080-Q4"), ["flat file", "relational database", "DBMS", "duplication", "candidate/primary key", "query processor"], "AM080-Q4");
expect(!/\b(?:INNER JOIN|SELECT\b|WHERE\b|referential integrity)\b/i.test(questionText("AM080-Q4")), "AM080-Q4 still requires post-L080 SQL or referential integrity");
includesAll(questionText("AQ100-Q5"), ["selection", "iteration"], "AQ100-Q5");
expect(!/flowchart/i.test(questionText("AQ100-Q5")), "AQ100-Q5 still assesses L101 flowcharts");
includesAll(questionText("AQ105-Q1"), ["flowchart", "pseudocode", "IF Score", "ELSE", "ENDIF"], "AQ105-Q1");
includesAll(questionText("AR112-Q1"), ["StudentName", "STRING", "Count", "INTEGER"], "AR112-Q1");
expect(!/ARRAY\s*\[/i.test(questionText("AR112-Q1")), "AR112-Q1 still requires an array declaration before the Section 10 review");
includesAll(questionText("AM120-Q3"), ["array of records", "StudentID", "lower and upper bounds", "field access"], "AM120-Q3");
expect(!/\b(?:stack|queue|linked list|linked-list)\b/i.test(assessedText("AM120-Q3")), "AM120-Q3 still assesses ADTs before L122");
includesAll(questionText("AM140-Q4"), ["interfaces", "parameters", "scope", "validation", "file handling", "debugging"], "AM140-Q4");
expect(!/\b(?:waterfall|iterative|RAD|rapid application)\b/i.test(questionText("AM140-Q4")), "AM140-Q4 still assesses lifecycle models before L142");
includesAll(questionText("L142-Q2"), ["waterfall", "iterative", "RAD", "rapid prototyping", "time-boxing"], "L142-Q2");

const arrayRequirement = requirements.get("S10.03");
expect(arrayRequirement.teachingLessons[0] === 104, "S10.03 must be formally introduced before search and sort at L104");
expect(arrayRequirement.prerequisites.length === 0, "S10.03 must not depend on the later complete S10.01 type catalogue");
const l104Markdown = fs.readFileSync(path.join(root, "lessons", "104-linear-search-and-binary-search.md"), "utf8");
const l104Html = fs.readFileSync(path.join(root, "web", "lesson-104", "index.html"), "utf8");
includesAll(l104Markdown, ["Array model required by search algorithms", "lower bound", "upper bound", "DECLARE Names : ARRAY[1:4] OF STRING"], "L104 Markdown prerequisite bridge");
const l104CoreTag = l104Html.match(/<section\b[^>]*id="stage2-completion"[^>]*>/i)?.[0] ?? "";
expect(/data-delivery-role="CORE"/i.test(l104CoreTag) && /data-classroom-activity="TEACH"/i.test(l104CoreTag), "L104 array prerequisite bridge is not visible CORE/TEACH");

const transferRequirement = requirements.get("S4.07");
expect(transferRequirement.prerequisites.join() === "S4.01", "S4.07 should depend on L041 architecture, not completion of all later register/bus requirements");

const evidenceIds = (id) => requirements.get(id).assessmentEvidence.map(({ questionId }) => questionId);
expect(evidenceIds("S1.08").includes("L008-Q1") && !evidenceIds("S1.08").includes("L001-Q1"), "S1.08 assessment mapping is not post-teaching");
expect(evidenceIds("S8.10").every((id) => !id.startsWith("AM080")), "S8.10 still maps a pre-SQL monthly question");
expect(evidenceIds("S9.07").includes("AQ105-Q1") && !evidenceIds("S9.07").includes("AQ100-Q5"), "S9.07 assessment mapping is not post-teaching");
expect(evidenceIds("S10.03").includes("AQ115-Q5") && !evidenceIds("S10.03").includes("AR112-Q1"), "S10.03 assessment mapping is not post-teaching");
expect(evidenceIds("S10.09").some((id) => id.startsWith("AQ125")) && !evidenceIds("S10.09").includes("AM120-Q3"), "S10.09 assessment mapping is not post-teaching");
expect(evidenceIds("S12.01").includes("L142-Q2") && !evidenceIds("S12.01").includes("AM140-Q4"), "S12.01 assessment mapping is not post-teaching");

const earlyAssessmentMutation = structuredClone(coverageContract);
earlyAssessmentMutation.requirements.find(({ id }) => id === "S9.07").assessmentEvidence.push({ questionId: "AQ100-Q5", conceptGroups: [["selection"]] });
expect(buildCurriculumSequenceModel(earlyAssessmentMutation).problems.some(({ id }) => id === "AQ100-Q5->S9.07"), "mutation escaped: reintroducing the early Quiz 100 mapping must fail");

const lateArrayMutation = structuredClone(coverageContract);
lateArrayMutation.requirements.find(({ id }) => id === "S10.03").teachingLessons = [115, 116];
expect(buildCurriculumSequenceModel(lateArrayMutation).problems.some(({ id }) => id === "S10.03->S10.06"), "mutation escaped: removing the L104 array bridge must fail");

const broadPrerequisiteMutation = structuredClone(coverageContract);
broadPrerequisiteMutation.requirements.find(({ id }) => id === "S4.07").prerequisites = ["S4.01", "S4.02", "S4.04"];
const broadProblems = buildCurriculumSequenceModel(broadPrerequisiteMutation).problems.map(({ id }) => id);
expect(broadProblems.includes("S4.02->S4.07") && broadProblems.includes("S4.04->S4.07"), "mutation escaped: reintroducing later full-register/full-bus prerequisites must fail");

const ledger = JSON.parse(fs.readFileSync(path.join(root, "audits", "repair-batch-3-curriculum-sequence.json"), "utf8"));
expect(ledger.status === "Resolved" && ledger.records.length === 9, "Batch 3 remediation ledger must resolve exactly nine original blockers");

if (failures.length) {
  console.error(`Batch 3 curriculum-sequence verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 3 curriculum-sequence verification passed: nine original blockers are resolved and three sequence mutations are rejected.");
