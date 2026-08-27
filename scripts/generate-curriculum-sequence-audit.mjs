import fs from "node:fs";
import path from "node:path";

import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";

const root = path.resolve(import.meta.dirname, "..");
const outputPath = path.join(root, "audits", "syllabus-prerequisite-graph.json");
const model = buildCurriculumSequenceModel();
fs.writeFileSync(outputPath, `${JSON.stringify(model, null, 2)}\n`);
console.log(`Generated syllabus prerequisite graph: ${model.nodeCount} nodes, ${model.edgeCount} edges, ${model.problems.length} blocking sequence problem(s).`);
