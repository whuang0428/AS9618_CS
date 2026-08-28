import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { evaluateStage3Policy } from "./remediation-v2-stage3-gate.mjs";
import { stage3CoreRepairs } from "./remediation-v2-stage3-sequence-plan.mjs";

const clone = (value) => structuredClone(value);
const failures = [];
const expectRejected = (label, mutateContract = () => {}, mutateRepairs = () => {}, mutateQuestions = () => {}) => {
  const contract = clone(coverageContract);
  const repairs = clone(stage3CoreRepairs);
  const questions = clone(loadAllQuestions());
  mutateContract(contract); mutateRepairs(repairs); mutateQuestions(questions);
  if (evaluateStage3Policy(contract, repairs, questions).length === 0) failures.push(`${label} mutation escaped`);
};

expectRejected("official first-use inversion", (contract) => { contract.requirements.find(({ id }) => id === "S2.04").teachingLessons = [15]; });
expectRejected("intra-lesson official-row inversion", () => {}, (repairs) => { const repair = repairs.find(({ lesson }) => lesson === 20); [repair.rows[0], repair.rows[1]] = [repair.rows[1], repair.rows[0]]; });
expectRejected("assessment before CORE", () => {}, () => {}, (questions) => { questions.find(({ id }) => id === "L026-Q4").lesson = 15; });
expectRejected("first-use review hash loss", (contract) => { contract.requirements.find(({ id }) => id === "S10.01").firstUseReview.contentHash = "0".repeat(64); });

if (failures.length) {
  console.error(`Remediation v2 Stage 3 mutation tests failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Remediation v2 Stage 3 mutation tests passed: official-order, intra-lesson order, assessment-before-CORE and first-use hash mutations were rejected.");
