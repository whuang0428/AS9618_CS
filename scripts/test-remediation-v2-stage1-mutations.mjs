import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { evaluateCurrentDecision } from "./remediation-v2-decision-gate.mjs";
import { evaluateWordingReviewRegister, wordingReviewHeaders } from "./remediation-v2-review-gate.mjs";
import { evaluateCriticalSemanticControls } from "./remediation-v2-semantic-gate.mjs";

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const csv = (values) => values.join(",");

const factors = "processor type; number of cores; bus width; clock speed; cache";
const passingFixture = {
  onesComplement: {
    teaching: "Convert an integer to one's complement.",
    workedExample: "Worked example: convert integer 5 to one's complement 1010.",
    practice: "Practice: convert 6 to one's complement.",
    assessment: "Convert this integer to one's complement.",
  },
  performance: {
    title: factors,
    teaching: factors,
    practice: factors,
    assessment: factors,
    visual: factors,
  },
  l107: "DECLARE Character : CHAR\nCharacter <- LCASE(Character)",
  l121: [
    "Question-provided functions; returned arrays are 1-based.",
    "FUNCTION SPLIT(Line : STRING, Delimiter : CHAR) RETURNS ARRAY OF STRING",
    "FUNCTION STRING_TO_INTEGER(Value : STRING) RETURNS INTEGER",
    "Fields <- SPLIT(Line, ',')",
    "Mark <- STRING_TO_INTEGER(Fields[1])",
  ].join("\n"),
  l133: [
    "Question-provided function; positions are 1-based.",
    "FUNCTION LEFT(Text : STRING, Count : INTEGER) RETURNS STRING",
    "DECLARE Character : CHAR",
    "Character <- UCASE(Character)",
    "Prefix <- LEFT('DATA', 2)",
  ].join("\n"),
};

expect(evaluateCriticalSemanticControls(passingFixture).length === 0, "control fixture must pass before mutation");

const semanticMutations = [
  ["one's-complement conversion", { ...passingFixture, onesComplement: { ...passingFixture.onesComplement, practice: "Practice: unrelated conversion." } }, "CRIT-S1.03-ONES-COMPLEMENT"],
  ["processor type", { ...passingFixture, performance: Object.fromEntries(Object.entries(passingFixture.performance).map(([key, value]) => [key, value.replace("processor type; ", "")])) }, "CRIT-L049-PERFORMANCE-FACTORS"],
  ["bus width", { ...passingFixture, performance: Object.fromEntries(Object.entries(passingFixture.performance).map(([key, value]) => [key, value.replace("bus width; ", "")])) }, "CRIT-L049-PERFORMANCE-FACTORS"],
  ["provided function signature", { ...passingFixture, l121: passingFixture.l121.replace(/FUNCTION SPLIT[^\n]+\n/, "") }, "CRIT-L121-PROVIDED-FUNCTIONS"],
  ["CHAR function type", { ...passingFixture, l107: "Character <- LCASE(MID(Text, 1, 1))" }, "CRIT-L107-CHAR-FUNCTION-TYPE"],
];
for (const [label, fixture, expectedId] of semanticMutations) {
  expect(evaluateCriticalSemanticControls(fixture).some(({ id }) => id === expectedId), `${label} mutation escaped`);
}

const orderedContract = {
  requirements: [
    { id: "S1.01", section: 1, teachingLessons: [1], prerequisites: [], riskLevel: "Low", assessmentEvidence: [] },
    { id: "S1.02", section: 1, teachingLessons: [2], prerequisites: [], riskLevel: "Low", assessmentEvidence: [] },
  ],
};
expect(buildCurriculumSequenceModel(orderedContract, []).problems.length === 0, "ordered first-use fixture must pass");
const invertedContract = structuredClone(orderedContract);
invertedContract.requirements[0].teachingLessons = [3];
const invertedModel = buildCurriculumSequenceModel(invertedContract, []);
expect(invertedModel.officialOrderInversions.some(({ prerequisite, dependent }) => prerequisite === "S1.01" && dependent === "S1.02"), "official-order diagnostic inversion escaped");
expect(!invertedModel.problems.some(({ type }) => type === "OFFICIAL_FIRST_USE_INVERSION"), "official taxonomy order was incorrectly treated as a pedagogical prerequisite");
invertedContract.requirements[1].prerequisites = ["S1.01"];
expect(buildCurriculumSequenceModel(invertedContract, []).problems.some(({ type }) => type === "PREREQUISITE_AFTER_DEPENDENT"), "declared prerequisite inversion escaped");

const expectedHashes = new Map([["question:Q1", "a".repeat(64)]]);
const approvedRow = ["question", "Q1", "lesson-001", "Approved", "IndependentlyReviewed", "audits/evidence.md:12", "a".repeat(64), "reviewer-2", "R1", "syllabus:page44;command-word table", "reviewed"];
const validRegister = `${csv(wordingReviewHeaders)}\n${csv(approvedRow)}\n`;
expect(evaluateWordingReviewRegister(validRegister, expectedHashes).status === "Ready", "fully evidenced independent approval fixture must pass");
for (const index of [4, 5, 7, 8, 9]) {
  const mutation = approvedRow.slice();
  mutation[index] = "";
  expect(evaluateWordingReviewRegister(`${csv(wordingReviewHeaders)}\n${csv(mutation)}\n`, expectedHashes).status === "Blocked", `approval metadata deletion at column ${index} escaped`);
}

const decision = {
  schemaVersion: 1,
  remediation: "v2",
  decisionAuthority: "audits/remediation-v2-current-decision.json",
  currentReleaseDecision: "BLOCKED",
  currentStage: { number: 1, approvalStatus: "AwaitingUserApproval" },
  historicalDecisions: [{ historical: true, current: false }],
  excludedLegacyDecisionArtifacts: [
    "audits/scientific-audit-report.md", "audits/scientific-final-audit-report.md",
    "audits/scientific-defects.json", "audits/scientific-final-defects.json",
  ],
};
const openDefects = { issues: [{ severity: "P0", status: "Open" }] };
const blockedGate = { status: "Blocked" };
expect(evaluateCurrentDecision(decision, openDefects, blockedGate).status === "Valid", "BLOCKED decision fixture must be valid");
expect(evaluateCurrentDecision({ ...decision, currentReleaseDecision: "RELEASE_CANDIDATE" }, openDefects, blockedGate).status === "Invalid", "premature release-candidate mutation escaped");

if (failures.length) {
  console.error(`Remediation v2 Stage 1 mutation tests failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("Remediation v2 Stage 1 mutation tests passed: approval metadata and critical semantics were rejected when corrupted; official-order diagnostics remained non-blocking while declared prerequisite inversions were rejected.");
