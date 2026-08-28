import crypto from "node:crypto";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import {
  evaluateOfficialSourceContract,
  evaluatePedagogicalIntegrity,
  loadOfficialInventory,
} from "./remediation-v2-audit-integrity-gate.mjs";

const clone = (value) => structuredClone(value);
const failures = [];
const expectProblem = (label, problems, id, detail = "") => {
  if (!problems.some((problem) => problem.id === id && (!detail || problem.detail.includes(detail)))) failures.push(`${label}: ${id}${detail ? ` (${detail})` : ""} was not rejected`);
};

{
  const inventory = clone(loadOfficialInventory());
  inventory.items = inventory.items.filter(({ sourceId }) => sourceId !== "P15-C004");
  expectProblem("delete official vector source atom", evaluateOfficialSourceContract(coverageContract, inventory), "AUDIT-SOURCE-INTERNAL-HASH");
}

{
  const contract = clone(coverageContract);
  const vector = contract.requirements.find(({ id }) => id === "S1.09");
  vector.officialReference.sourceUnitIds = vector.officialReference.sourceUnitIds.filter((id) => id !== "P15-C004");
  expectProblem("unmap official vector statement", evaluateOfficialSourceContract(contract), "AUDIT-SOURCE-UNMAPPED", "P15-C004");
}

for (const [label, requirementId, sourceId] of [
  ["unmap official bitwise instruction row", "S4.15", "P22-N005"],
  ["unmap validation/verification integrity statement", "S6.07", "P24-C007"],
]) {
  const contract = clone(coverageContract);
  const requirement = contract.requirements.find(({ id }) => id === requirementId);
  requirement.officialReference.sourceUnitIds = requirement.officialReference.sourceUnitIds.filter((id) => id !== sourceId);
  expectProblem(label, evaluateOfficialSourceContract(contract), "AUDIT-SOURCE-UNMAPPED", sourceId);
}

{
  const contract = clone(coverageContract);
  const vector = contract.requirements.find(({ id }) => id === "S1.09");
  vector.officialReference.candidateStatements[0] = "Show understanding of an invented vector storage requirement";
  expectProblem("invent contract wording", evaluateOfficialSourceContract(contract), "AUDIT-CONTRACT-PHANTOM-CLAIM", "S1.09");
}

{
  const inventory = clone(loadOfficialInventory());
  const added = {
    sourceId: "P15-C999",
    page: 15,
    section: 1,
    kind: "candidate",
    coverageRole: "claim",
    column: "left",
    top: "799.0",
    text: "A newly extracted official candidate statement",
    normalisedHash: crypto.createHash("sha256").update("a newly extracted official candidate statement").digest("hex"),
  };
  inventory.items.push(added);
  expectProblem("new official statement without owner", evaluateOfficialSourceContract(coverageContract, inventory), "AUDIT-SOURCE-UNMAPPED", "P15-C999");
}

const minimalContract = {
  requirements: [{
    id: "S1.09",
    firstTeachingEvidence: {
      lesson: 9,
      sectionId: "vector-core",
      conceptGroups: [["vector encoding"], ["drawing object"], ["property"], ["drawing list"], ["bitmap"], ["given application"]],
    },
  }],
};
const core = `<section id="vector-core" data-delivery-role="CORE" data-classroom-activity="TEACH"><h2>Vector encoding</h2><p>A drawing object has a property in a drawing list. Compare bitmap use for a given application.</p></section>`;
const optional = `<section id="bitmap-extra" data-delivery-role="OPTIONAL" data-classroom-activity="EXTEND"><h2>Optional bitmap calculation</h2><p>This optional enrichment contains enough substantive words to count as a real teaching block before the formal lesson material.</p></section>`;
const goodHtml = `<main>${core}${optional}</main>`;
if (evaluatePedagogicalIntegrity(minimalContract, () => goodHtml).length) failures.push("known-good CORE-first lesson was rejected");

{
  const problems = evaluatePedagogicalIntegrity(minimalContract, () => `<main>${optional}${core}</main>`);
  expectProblem("Optional before CORE", problems, "AUDIT-LESSON-OPTIONAL-BEFORE-CORE");
  expectProblem("CORE after Optional", problems, "AUDIT-LESSON-CORE-AFTER-OPTIONAL");
}

{
  const filler = `<section id="wrong-topic"><h2>Bitmap calculations</h2><p>${"unrelated bitmap file size teaching ".repeat(30)}</p></section>`;
  const problems = evaluatePedagogicalIntegrity(minimalContract, () => `<main>${filler}${core}</main>`);
  expectProblem("unclassified lesson body before CORE", problems, "AUDIT-LESSON-CORE-NOT-FIRST");
}

{
  const wrongCore = core.replace("drawing list", "unrelated metadata");
  const problems = evaluatePedagogicalIntegrity(minimalContract, () => `<main>${wrongCore}${optional}</main>`);
  expectProblem("first CORE omits required concept", problems, "AUDIT-FIRST-TEACHING-CONCEPT", "drawing list");
}

if (failures.length) {
  console.error(`Audit-integrity mutation tests failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Audit-integrity mutation tests passed: deleted/unmapped/new official statements, phantom wording, Optional-before-CORE, buried/unclassified content and missing first-teaching concepts were rejected.");
