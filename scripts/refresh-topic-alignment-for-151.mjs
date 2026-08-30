import fs from "node:fs";
import { stage3CoreRepairs } from "./remediation-v2-stage3-sequence-plan.mjs";

const output = {
  schemaVersion: 2,
  source: "Independently reviewed 151-lesson first-Core placement after official syllabus-order migration.",
  lessons: stage3CoreRepairs.map(({ lesson, rows }) => ({ lesson, requirementIds: rows })),
};

fs.writeFileSync(new URL("./lesson-topic-alignment-contract.json", import.meta.url), `${JSON.stringify(output, null, 2)}\n`);
console.log(`Recorded ${output.lessons.length} reviewed first-Core lesson placements.`);
