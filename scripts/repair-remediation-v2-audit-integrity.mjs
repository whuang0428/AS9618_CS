import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const inventoryPath = path.join(root, "audits", "remediation-v2-official-as-source-inventory.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const bySourceId = new Map(inventory.items.map((item) => [item.sourceId, item]));
const hash = (value) => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");

const addedBindings = new Map([
  ["S4.15", Array.from({ length: 10 }, (_, index) => `P22-N${String(index + 5).padStart(3, "0")}`)],
  ["S6.07", ["P24-C007"]],
]);

for (const requirement of contract.requirements) {
  const mapping = officialAsMapping[requirement.id];
  if (!mapping) throw new Error(`No official mapping row for ${requirement.id}`);
  const reference = requirement.officialReference;
  reference.candidateStatements = [...mapping.candidateStatements];
  reference.adjacentNotesAndGuidance = [...mapping.adjacentNotesAndGuidance];
  reference.sourceUnitIds = [...new Set([
    ...(reference.sourceUnitIds ?? []),
    ...(addedBindings.get(requirement.id) ?? []),
  ])];
  const bound = reference.sourceUnitIds.map((sourceId) => {
    const source = bySourceId.get(sourceId);
    if (!source) throw new Error(`${requirement.id} references missing official source unit ${sourceId}`);
    return source;
  });
  reference.pages = [...new Set(bound.map(({ page }) => page))].sort((a, b) => a - b);
  reference.sourceInventoryHash = inventory.inventoryHash;
  const { evidenceHash: _oldEvidenceHash, ...referenceBasis } = reference;
  reference.evidenceHash = hash(referenceBasis);
}

const validation = contract.requirements.find(({ id }) => id === "S6.07");
validation.requirement = "Describe how data validation and data verification help protect the integrity of data; describe and use methods of data validation.";
validation.notes = "Validation and verification reduce input, copying and transfer errors and therefore help protect data integrity. Validation methods include range, format, length, presence, existence and limit checks, plus a check digit.";
for (const group of [["verification"], ["integrity", "data integrity"]]) {
  if (!validation.requiredGroups.some((candidate) => JSON.stringify(candidate) === JSON.stringify(group))) validation.requiredGroups.push(group);
  if (!validation.firstTeachingEvidence.conceptGroups.some((candidate) => JSON.stringify(candidate) === JSON.stringify(group))) validation.firstTeachingEvidence.conceptGroups.push(group);
}
validation.practiceEvidence[0].conceptGroups = [["targeted practice"], ["integrity", "data integrity"]];
if (!validation.assessmentEvidence.some(({ questionId }) => questionId === "L069-Q1")) {
  validation.assessmentEvidence.unshift({
    questionId: "L069-Q1",
    conceptGroups: [["validation"], ["verification"], ["integrity", "data integrity"]],
  });
}

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Reconciled ${contract.requirements.length} requirements with ${inventory.items.length} locked official source atoms.`);
