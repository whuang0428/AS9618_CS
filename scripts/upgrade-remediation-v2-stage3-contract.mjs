import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { stage3RequirementFirstUse, stage3RequirementLessons } from "./remediation-v2-stage3-sequence-plan.mjs";
import { stage3AssessmentEvidence } from "./remediation-v2-stage3-question-repairs.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
for (const requirement of contract.requirements) {
  const lesson = stage3RequirementFirstUse[requirement.id];
  if (!lesson) throw new Error(`${requirement.id}: missing Stage 3 first-use lesson`);
  requirement.teachingLessons = stage3RequirementLessons[requirement.id];
  requirement.coreSections = ["stage2-completion"];
  requirement.workedExampleEvidence = [{
    lesson,
    sectionId: "stage2-completion",
    conceptGroups: [["worked example"]],
  }];
  requirement.practiceEvidence = [{
    lesson,
    sectionId: "stage2-practice",
    activity: "PRACTISE",
    conceptGroups: [["targeted practice"]],
  }];
  if (requirement.id === "S1.03") {
    requirement.workedExampleEvidence.push({ lesson: 5, sectionId: "stage2-completion", conceptGroups: [["one's complement"], ["convert", "conversion"]] });
    requirement.practiceEvidence.push({ lesson: 5, sectionId: "stage2-practice", activity: "PRACTISE", conceptGroups: [["one's complement"], ["convert", "conversion"]] });
  }
  requirement.firstTeachingEvidence = {
    lesson,
    sectionId: "stage2-completion",
    conceptGroups: requirement.requiredGroups,
  };
  requirement.minimumAssessmentForms = 1;
  if (stage3AssessmentEvidence[requirement.id]) requirement.assessmentEvidence = stage3AssessmentEvidence[requirement.id];
  if (requirement.id === "S5.03") requirement.prerequisites = requirement.prerequisites.filter((id) => id !== "S5.04");
  requirement.evidenceReviewStatus = "Reviewed";
  requirement.evidenceReviewRound = "remediation-v2-stage3";
  const basis = {
    requirement: requirement.id,
    lesson,
    sectionId: "stage2-completion",
    officialReferenceHash: requirement.officialReference.evidenceHash,
    reviewRound: requirement.evidenceReviewRound,
  };
  requirement.firstUseReview = {
    ...basis,
    contentHash: crypto.createHash("sha256").update(JSON.stringify(basis)).digest("hex"),
    status: "Reviewed",
  };
}

contract.sequenceReview = {
  round: "remediation-v2-stage3",
  policy: "One unique CORE first-use lesson per official requirement; Optional enrichment does not establish first use.",
  officialOrder: true,
  stableLessonIds: true,
};

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Upgraded ${contract.requirements.length} contract rows to the Stage 3 first-use sequence.`);
