import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { stage3RequirementFirstUse, stage3RequirementLessons } from "./remediation-v2-stage3-sequence-plan.mjs";
import { stage3AssessmentEvidence } from "./remediation-v2-stage3-question-repairs.mjs";

const root = path.resolve(import.meta.dirname, "..");
const contractPath = path.join(root, "scripts", "syllabus-coverage-contract.json");
const contract = JSON.parse(fs.readFileSync(contractPath, "utf8"));
const legacyVisualIdentityRepairs = new Map(Object.entries({
  "044/explanation-width": [49, "explanation-width"],
  "031/explanation-sensors": [34, "explanation-sensors"],
  "032/explanation-gate-visual": [35, "explanation-gate-visual"],
  "043/explanation-processor": [42, "explanation-processor"],
  "091/explanation-processor": [42, "explanation-processor"],
  "049/explanation-shifts": [50, "explanation-shifts"],
  "054/explanation-libraries": [58, "explanation-libraries"],
  "066/explanation-controls": [66, "explanation-controls"],
  "062/explanation-controls": [66, "explanation-controls"],
  "080/explanation-dbms": [78, "explanation-dbms"],
  "079/explanation-referential": [81, "explanation-referential"],
  "085/explanation-join": [86, "explanation-join"],
  "099/explanation-concept": [98, "explanation-concept"],
  "103/explanation-equivalence": [101, "explanation-equivalence"],
  "117/explanation-linear": [104, "explanation-linear"],
  "118/explanation-bubble": [105, "explanation-bubble"],
  "099/explanation-ipoc": [111, "explanation-ipoc"],
  "102/explanation-analyser": [111, "explanation-analyser"],
  "127/explanation-pseudocode": [126, "explanation-pseudocode"],
  "120/explanation-adt-concept": [122, "explanation-concept"],
  "122/explanation-adt-concept": [122, "explanation-concept"],
  "122/explanation-concept": [122, "explanation-concept"],
  "120/explanation-stack": [122, "explanation-stack"],
  "120/explanation-queue": [122, "explanation-queue"],
  "120/explanation-implementation": [122, "explanation-implementation"],
  "129/explanation-case": [127, "explanation-case"],
  "129/explanation-for": [128, "explanation-for"],
  "126/explanation-standard": [140, "explanation-standard"],
  "130/explanation-byref-compare": [130, "explanation-byref-compare"],
  "131/explanation-compare": [130, "explanation-byref-compare"],
  "133/explanation-robust-java": [139, "explanation-java"],
  "139/explanation-robust-java": [139, "explanation-java"],
  "139/explanation-java": [139, "explanation-java"],
  "144/explanation-logic": [138, "explanation-logic"],
  "145/explanation-boundary": [137, "explanation-boundary"],
  "145/explanation-bug": [138, "explanation-bug"],
}));
const shiftLesson = (lesson) => lesson >= 10 ? lesson + 1 : lesson;
const identityMigrationApplied = contract.sequenceReview?.identityMigration === "syllabus-order-151-r1";
const visualEvidenceMigrationApplied = contract.sequenceReview?.visualEvidenceMigration === "syllabus-order-151-r1";
const visualIdentityRepairs = new Map([...legacyVisualIdentityRepairs].map(([key, [lesson, sectionId]]) => {
  const [sourceLesson, sourceSection] = key.split("/");
  return [`${String(shiftLesson(Number(sourceLesson))).padStart(3, "0")}/${sourceSection}`, [shiftLesson(lesson), sectionId]];
}));
for (const requirement of contract.requirements) {
  const lesson = stage3RequirementFirstUse[requirement.id];
  if (!lesson) throw new Error(`${requirement.id}: missing Stage 3 first-use lesson`);
  requirement.teachingLessons = stage3RequirementLessons[requirement.id];
  requirement.visualEvidence = (requirement.visualEvidence ?? []).map((visual) => {
    if (visualEvidenceMigrationApplied) return visual;
    const migrated = identityMigrationApplied ? visual : { ...visual, lesson: shiftLesson(visual.lesson) };
    const repaired = visualIdentityRepairs.get(`${String(migrated.lesson).padStart(3, "0")}/${migrated.sectionId}`);
    return repaired ? { ...migrated, lesson: repaired[0], sectionId: repaired[1], visualId: `${repaired[1]}-img-1` } : migrated;
  });
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
  if (!identityMigrationApplied) requirement.assessmentEvidence = (requirement.assessmentEvidence ?? []).map((evidence) => ({
    ...evidence,
    questionId: evidence.questionId.replace(/^AR(\d{3})-/, (match, lessonId) => `AR${String(shiftLesson(Number(lessonId))).padStart(3, "0")}-`),
  }));
  if (stage3AssessmentEvidence[requirement.id]) requirement.assessmentEvidence = stage3AssessmentEvidence[requirement.id];
  if (requirement.id === "S1.09") requirement.assessmentEvidence = [
    { questionId: "L010-Q1", conceptGroups: [["drawing list"], ["drawing objects"], ["properties"]] },
    { questionId: "L010-Q5", conceptGroups: [["drawing list"], ["properties"], ["resizes without pixelation"]] },
  ];
  if (requirement.id === "S4.05") requirement.assessmentEvidence = requirement.assessmentEvidence.filter(({ questionId }) => questionId !== "AQ046-Q5");
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
  round: "syllabus-order-151-r1",
  policy: "First formal CORE teaching is monotonic in official syllabus row order within every section; Optional and later review do not establish first use.",
  officialOrder: true,
  officialRowOrderIsBlocking: true,
  canonicalLessonCount: 151,
  identityMigration: "syllabus-order-151-r1",
  visualEvidenceMigration: contract.sequenceReview?.visualEvidenceMigration,
  requiredVisualDeliveryPolicy: contract.sequenceReview?.requiredVisualDeliveryPolicy,
};

fs.writeFileSync(contractPath, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Upgraded ${contract.requirements.length} contract rows to the Stage 3 first-use sequence.`);
