import fs from "node:fs";
import path from "node:path";

import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";

const root = path.resolve(import.meta.dirname, "..");
const auditPath = path.join(root, "audits", "syllabus-prerequisite-graph.json");
const model = buildCurriculumSequenceModel();
const failures = [];

if (model.nodeCount !== 121) failures.push(`expected 121 requirement nodes, found ${model.nodeCount}`);
if (new Set(model.nodes.map(({ id }) => id)).size !== model.nodeCount) failures.push("requirement graph node IDs are not unique");
if (model.edgeCount === 0) failures.push("prerequisite graph has no dependency edges");
if (model.officialOrderEdgeCount !== 109) failures.push(`expected 109 official-order first-use edges, found ${model.officialOrderEdgeCount}`);
if (model.assessmentEvidenceCount < model.nodeCount) failures.push(`only ${model.assessmentEvidenceCount}/${model.nodeCount} requirements have direct assessment first-use evidence`);

if (!fs.existsSync(auditPath)) failures.push("audits/syllabus-prerequisite-graph.json is missing");
else {
  const expected = `${JSON.stringify(model, null, 2)}\n`;
  const actual = fs.readFileSync(auditPath, "utf8");
  if (actual !== expected) failures.push("syllabus prerequisite graph is stale; run node scripts/generate-curriculum-sequence-audit.mjs");
}

for (const problem of model.problems) failures.push(`${problem.type} ${problem.id}: ${problem.detail}`);

if (failures.length) {
  console.error(`Curriculum sequence verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Curriculum sequence verification passed: ${model.nodeCount} requirement nodes, ${model.officialOrderEdgeCount} official-order edges, ${model.edgeCount} prerequisite edges and ${model.assessmentEvidenceCount} direct assessment first-use checks.`);
