import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { optionalEnrichment } from "./remediation-v2-optional-enrichment.mjs";
import { evaluateStage2Policy } from "./remediation-v2-stage2-gate.mjs";

const clone = (value) => structuredClone(value);
const failures = [];
function expectRejected(label, contractMutation, optionalMutation = (entries) => entries) {
  const contract = clone(coverageContract);
  contractMutation(contract);
  const entries = optionalMutation(clone(optionalEnrichment));
  if (evaluateStage2Policy(contract, entries).length === 0) failures.push(`${label} mutation escaped`);
}

expectRejected("mismatched Notes/official row", (contract) => { contract.requirements.find((item) => item.id === "S1.08").officialReference.candidateStatements = ["Explain the difference between security, privacy and integrity"] });
expectRejected("sound file-size overclaim", (contract) => { contract.requirements.find((item) => item.id === "S1.10").requirement += " Perform a sound file-size calculation."; });
expectRejected("state-transition construction overclaim", (contract) => { contract.requirements.find((item) => item.id === "S12.03").requirement += " Construct the diagram."; });
expectRejected("test-plan production overclaim", (contract) => { contract.requirements.find((item) => item.id === "S12.06").requirement += " Produce the plan."; });
expectRejected("one's-complement direct assessment removal", (contract) => { const row = contract.requirements.find((item) => item.id === "S1.03"); row.assessmentEvidence = row.assessmentEvidence.filter((item) => item.questionId !== "L005-Q1"); });
expectRejected("Optional exclusion removal", () => {}, (entries) => entries.map((item) => item.lesson === 11 ? { ...item, excludedFromCoverage: false } : item));
expectRejected("Optional-only lesson leak", (contract) => { contract.requirements.find((item) => item.id === "S1.10").teachingLessons.push(11); });

if (failures.length) {
  console.error(`Remediation v2 Stage 2 mutation tests failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Remediation v2 Stage 2 mutation tests passed: official-row drift, three scope overclaims, one's-complement assessment loss and Optional leakage were rejected.");
