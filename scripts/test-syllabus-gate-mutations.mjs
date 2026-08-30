import { coverageContract, forbiddenSemanticPatterns } from "./syllabus-coverage-contract.mjs";
import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";

const failures = [];
const impossible = "__coverage_mutation_required_concept__";

for (const requirement of coverageContract.requirements) {
  const mutated = { ...requirement, requiredGroups: [...requirement.requiredGroups, [impossible]] };
  const messages = evaluateRequirement(mutated).messages;
  if (!messages.some((message) => message === `Markdown missing required concept group: ${impossible}`)) failures.push(`${requirement.id}: Markdown concept deletion mutation escaped`);
  if (!messages.some((message) => message === `visible CORE HTML missing required concept group: ${impossible}`)) failures.push(`${requirement.id}: CORE HTML concept deletion mutation escaped`);
}

const bitManipulation = coverageContract.requirements.find(({ id }) => id === "S4.15");
const optionalMutation = evaluateRequirement(bitManipulation, {
  lessonTransform: ({ markdown, html }) => ({ markdown, html: html.replaceAll('data-delivery-role="CORE"', 'data-delivery-role="OPTIONAL"') }),
});
if (!optionalMutation.messages.some((message) => message.startsWith("visible CORE HTML missing required concept group"))) failures.push("S4.15: CORE-to-OPTIONAL mutation escaped");

const assessmentMutation = evaluateRequirement(bitManipulation, {
  questionTransform: (question) => question.id === "AQ051-Q4"
    ? JSON.parse(JSON.stringify(question).replaceAll(/arithmetic right shift|cyclic right shift/gi, "unrelated operation"))
    : question,
});
if (!assessmentMutation.messages.some((message) => message.startsWith("assessment AQ051-Q4 missing concept group"))) failures.push("S4.15: direct assessment concept mutation escaped");

const sequenceMutation = structuredClone(coverageContract);
sequenceMutation.requirements.find(({ id }) => id === "S1.01").teachingLessons = [9];
const sequenceModel = buildCurriculumSequenceModel(sequenceMutation);
if (!sequenceModel.problems.some(({ id }) => id === "S1.01->S1.08")) failures.push("prerequisite-after-dependent mutation escaped");

const forbiddenSamples = new Map([
  ["ASM_LDR_RELATIVE", "LDR is relative"],
  ["ASM_CMI_IMMEDIATE", "CMI means immediate"],
  ["ASM_JPE_EQUAL", "JPE is jump if equal"],
  ["ASM_JPN_NEGATIVE", "JPN means jump when negative"],
  ["TEST_ERRONEOUS_REPLACES_ABNORMAL", "normal, boundary, erroneous"],
  ["DB_SECONDARY_ALTERNATE", "secondary key is an alternate candidate key"],
]);
for (const rule of forbiddenSemanticPatterns) {
  rule.pattern.lastIndex = 0;
  if (!rule.pattern.test(forbiddenSamples.get(rule.id) ?? "")) failures.push(`${rule.id}: forbidden-semantics mutation escaped`);
}

if (failures.length) {
  console.error(`Syllabus gate mutation tests failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Syllabus gate mutation tests passed: all ${coverageContract.requirements.length} requirements reject a missing Markdown/CORE concept; CORE-to-OPTIONAL, direct-assessment, prerequisite-order and ${forbiddenSemanticPatterns.length} forbidden-semantics mutations were detected.`);
