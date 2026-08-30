import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

import { stage3RequirementFirstUse } from "./remediation-v2-stage3-sequence-plan.mjs";

const root = path.resolve(import.meta.dirname, "..");
const pad = (value) => String(value).padStart(3, "0");
const shift = (value) => Number(value) >= 10 ? Number(value) + 1 : Number(value);
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const baseline = JSON.parse(execFileSync(
  "git",
  ["show", "aba418d^:scripts/syllabus-coverage-contract.json"],
  { cwd: root, encoding: "utf8" },
));

// A few historical coverage rows used a legacy target name. Keep the original
// source lesson and normalise only that target identity before delivery.
const actualSourceRepairs = new Map(Object.entries({
  "044/explanation-width": [44, "explanation-width"],
  "031/explanation-sensors": [34, "explanation-sensors"],
  "032/explanation-gate-visual": [35, "explanation-gate-visual"],
  "043/explanation-processor": [91, "explanation-processor"],
  "091/explanation-processor": [91, "explanation-processor"],
  "049/explanation-shifts": [50, "explanation-shifts"],
  "054/explanation-libraries": [58, "explanation-libraries"],
  "066/explanation-controls": [62, "explanation-controls"],
  "062/explanation-controls": [62, "explanation-controls"],
  "080/explanation-dbms": [78, "explanation-dbms"],
  "079/explanation-referential": [81, "explanation-referential"],
  "085/explanation-join": [86, "explanation-join"],
  "099/explanation-concept": [98, "explanation-concept"],
  "103/explanation-equivalence": [101, "explanation-equivalence"],
  "117/explanation-linear": [104, "explanation-linear"],
  "118/explanation-bubble": [105, "explanation-bubble"],
  "099/explanation-ipoc": [111, "explanation-ipoc"],
  "102/explanation-analyser": [111, "explanation-analyser"],
  "127/explanation-pseudocode": [114, "explanation-pseudocode"],
  "120/explanation-adt-concept": [122, "explanation-concept"],
  "122/explanation-adt-concept": [122, "explanation-concept"],
  "122/explanation-concept": [122, "explanation-concept"],
  "120/explanation-stack": [122, "explanation-stack"],
  "120/explanation-queue": [122, "explanation-queue"],
  "120/explanation-implementation": [122, "explanation-implementation"],
  "129/explanation-case": [127, "explanation-case"],
  "129/explanation-for": [128, "explanation-for"],
  "126/explanation-standard": [140, "explanation-standard"],
  "130/explanation-byref-compare": [131, "explanation-compare", "explanation-byref-compare"],
  "131/explanation-compare": [131, "explanation-compare", "explanation-byref-compare"],
  "133/explanation-robust-java": [139, "explanation-java"],
  "139/explanation-robust-java": [139, "explanation-java"],
  "139/explanation-java": [139, "explanation-java"],
  "144/explanation-logic": [59, "explanation-logic"],
  "145/explanation-boundary": [137, "explanation-boundary"],
  "145/explanation-bug": [138, "explanation-bug"],
}));

const baselineById = new Map(baseline.requirements.map((requirement) => [requirement.id, requirement]));
const delivery = {};
const destinations = new Map();
const rolloutJobs = JSON.parse(fs.readFileSync(path.join(root, "scripts", "stage10-rollout-jobs.json"), "utf8"));
for (const job of rolloutJobs) destinations.set(`${job.lesson}/${job.targetId}`, `${job.lesson}/${job.targetId}`);
const explanationSource = fs.readFileSync(path.join(root, "scripts", "stage10-explanations-data.mjs"), "utf8");
const pilotBlock = explanationSource.match(/export const pilotExplanations[\s\S]*?\n\]\);/)?.[0] ?? "";
for (const match of pilotBlock.matchAll(/explanation\("(\d{3})",\s*"([^"]+)"/g)) {
  destinations.set(`${match[1]}/${match[2]}`, `${match[1]}/${match[2]}`);
}

for (const requirement of contract.requirements) {
  const baselineRequirement = baselineById.get(requirement.id);
  if (!baselineRequirement) throw new Error(`${requirement.id}: no baseline coverage row`);
  const firstUse = stage3RequirementFirstUse[requirement.id];
  requirement.visualEvidence = (baselineRequirement.visualEvidence ?? []).map((visual) => {
    const repair = actualSourceRepairs.get(`${pad(visual.lesson)}/${visual.sectionId}`);
    const sourceLesson = shift(repair?.[0] ?? visual.lesson);
    const sourceSectionId = repair?.[1] ?? visual.sectionId;
    const destinationSectionId = repair?.[2] ?? sourceSectionId;
    const sourceTargetId = sourceSectionId.replace(/^explanation-/, "");
    const sourceKey = `${pad(sourceLesson)}/${sourceTargetId}`;
    const targetLesson = visual.required ? firstUse : sourceLesson;
    let targetId = destinationSectionId.replace(/^explanation-/, "");
    let destinationKey = `${pad(targetLesson)}/${targetId}`;
    const previous = destinations.get(destinationKey);
    if (previous && previous !== sourceKey) {
      targetId = `${sourceTargetId}-${pad(sourceLesson)}`;
      destinationKey = `${pad(targetLesson)}/${targetId}`;
    }
    if (destinations.has(destinationKey) && destinations.get(destinationKey) !== sourceKey) throw new Error(`${destinationKey}: unresolved visual-source collision`);
    destinations.set(destinationKey, sourceKey);
    if (sourceLesson !== targetLesson || targetId !== sourceTargetId) delivery[sourceKey] = { lesson: pad(targetLesson), targetId };
    return {
      ...visual,
      lesson: targetLesson,
      sectionId: `explanation-${targetId}`,
      visualId: `explanation-${targetId}-img-1`,
    };
  });
  if (requirement.id === "S1.09") requirement.visualEvidence = [{
    lesson: 10,
    visualId: "explanation-drawing-list-img-1",
    sectionId: "explanation-drawing-list",
    required: true,
    conceptGroups: [["drawing list"], ["drawing objects"], ["properties"], ["redraw"]],
  }];
}

contract.sequenceReview = {
  ...(contract.sequenceReview ?? {}),
  visualEvidenceMigration: "syllabus-order-151-r1",
  requiredVisualDeliveryPolicy: "Required visuals are delivered at the reviewed first formal CORE lesson.",
};
fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
fs.writeFileSync(
  path.join(root, "scripts", "remediation-v2-visual-delivery-map.json"),
  `${JSON.stringify(delivery, null, 2)}\n`,
);

console.log(`Rebuilt required visual evidence for ${contract.requirements.length} syllabus rows; ${Object.keys(delivery).length} source panels are delivered at reviewed first use.`);
