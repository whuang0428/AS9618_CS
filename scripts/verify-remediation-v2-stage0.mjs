import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readText = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(readText(relativePath));
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

const baseline = readJson("audits/remediation-v2-stage0-baseline.json");
const defects = readJson("audits/remediation-v2-defects.json");
const currentDecision = readJson("audits/remediation-v2-current-decision.json");
const report = readText("audits/remediation-v2-stage0-report.md");
const manifestText = readText("audits/remediation-v2-stage0-manifest.csv");
const progressedBeyondStage0 = currentDecision.currentStage.number > 0;

const officialHashes = {
  syllabus: "c8a4c6d033c07c6d8025689abed5ef481d581c28bae640986d275303ed6c08bc",
  update: "7a6d305a3370f8aa006eac43bc21be298e1d77bcabfcc57aa677016cb33b869e",
  pseudocodeGuide: "04f42cc247cc49e069543aef242dbc6d1d89d4f3539c23148683386cebb2c4b7",
};

expect(baseline.schemaVersion === 1 && baseline.remediation === "v2" && baseline.stage === 0, "Baseline identity is invalid");
for (const [key, expectedHash] of Object.entries(officialHashes)) {
  expect(baseline.official[key]?.sha256 === expectedHash, `${key}: official SHA-256 is incorrect`);
}
expect(sha256(manifestText) === baseline.manifest.sha256, "Manifest SHA-256 does not match the frozen baseline");

const expectedCounts = {
  lessons: 150,
  pages: 153,
  pageViewsPlanned: 306,
  questions: 963,
  assessmentSets: 51,
  stage10Images: 783,
  visualObjects: 969,
  syllabusRequirements: 121,
};
for (const [key, value] of Object.entries(expectedCounts)) {
  expect(baseline.inventory[key] === value, `${key}: expected ${value}, found ${baseline.inventory[key]}`);
}
expect(baseline.inventory.generators > 0, "Generator inventory is empty");
expect(baseline.inventory.manifestEntries === manifestText.trimEnd().split("\n").length - 1, "Manifest entry count is inconsistent");

const requiredIssueIds = new Set([
  "RV2-GATE-001", "RV2-GATE-002", "RV2-COV-001", "RV2-COV-002", "RV2-SCOPE-001", "RV2-SCOPE-002",
  "RV2-SEQ-001", "RV2-ID-001", "RV2-WORD-001", "RV2-MS-001", "RV2-CONT-001", "RV2-PSEUDO-001", "RV2-PSEUDO-002",
]);
expect(currentDecision.currentReleaseDecision === "BLOCKED", "Current remediation decision must remain BLOCKED while later stages are open");
expect(defects.stageApprovals?.some((entry) => entry.stage === 0 && entry.status === "ApprovedForProgression" && entry.releaseDecision === false), "Stage 0 progression approval is not recorded separately from release decision");
expect(defects.legacyReportsPolicy?.classification === "HistoricalEvidenceOnly", "Legacy reports are not classified as historical evidence only");
expect(defects.issues.length === requiredIssueIds.size, "Reopened issue count is incorrect");
for (const issue of defects.issues) {
  expect(requiredIssueIds.delete(issue.id), `${issue.id}: duplicate or unexpected issue`);
  const expectedStatus = ["RV2-GATE-001", "RV2-GATE-002"].includes(issue.id) ? "Resolved" : "Open";
  if (!progressedBeyondStage0) expect(issue.status === expectedStatus, `${issue.id}: expected current status ${expectedStatus}`);
  else expect(["Open", "Resolved"].includes(issue.status), `${issue.id}: invalid progressed status ${issue.status}`);
  expect(["P0", "P1"].includes(issue.severity), `${issue.id}: invalid blocking severity`);
  for (const field of ["category", "confidence", "locations", "problem", "acceptanceTarget"]) {
    expect(Boolean(issue[field]?.length), `${issue.id}: missing ${field}`);
  }
}
expect(requiredIssueIds.size === 0, `Missing issue IDs: ${[...requiredIssueIds].join(", ")}`);

for (const legacy of baseline.legacyAuditArtifacts) {
  expect(sha256(fs.readFileSync(path.join(root, legacy.path))) === legacy.sha256, `${legacy.path}: legacy audit artifact changed after the Stage 0 freeze`);
  expect(defects.legacyReportsPolicy.excludedFromCurrentDecision.includes(legacy.path), `${legacy.path}: legacy artifact is not excluded from the current decision`);
}

for (const protectedPath of baseline.workingTreePolicy.protectedPreExistingUntracked) {
  expect(fs.existsSync(path.join(root, protectedPath)), `${protectedPath}: protected pre-existing untracked path is missing`);
  expect(!manifestText.includes(`,${protectedPath},`), `${protectedPath}: protected untracked path leaked into the remediation manifest`);
}

for (const phrase of ["**Current decision:** BLOCKED", "## Passed", "## Failed / open", "## Unverified", "awaiting user approval"]) {
  expect(report.includes(phrase), `Stage 0 report is missing: ${phrase}`);
}

const validateDecision = (candidate) => {
  if (candidate.currentReleaseDecision !== "BLOCKED") throw new Error("Current remediation cannot be Approved");
  if (candidate.legacyReportsPolicy?.currentDecisionSource) throw new Error("Legacy report cannot be the current decision source");
  return true;
};
let negativeDecisionRejected = false;
try { validateDecision({ ...currentDecision, currentReleaseDecision: "APPROVED" }); } catch { negativeDecisionRejected = true; }
expect(negativeDecisionRejected, "Negative control failed: an APPROVED Stage 0 mutation was accepted");
let legacySourceRejected = false;
try {
  validateDecision({
    ...currentDecision,
    legacyReportsPolicy: { currentDecisionSource: "audits/scientific-final-audit-report.md" },
  });
} catch { legacySourceRejected = true; }
expect(legacySourceRejected, "Negative control failed: a legacy current-decision source was accepted");

if (process.argv.includes("--current-parity")) {
  const rows = manifestText.trimEnd().split("\n").slice(1).map((line) => {
    const fields = [];
    let field = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (quoted && character === '"' && line[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = !quoted;
      else if (character === "," && !quoted) { fields.push(field); field = ""; }
      else field += character;
    }
    fields.push(field);
    return { kind: fields[0], id: fields[1], path: fields[2], sha256: fields[3] };
  });
  const currentQuestions = new Map(loadAllQuestions().map((question) => [question.id, question.hash]));
  const currentAssessments = new Map([
    ...quizzes.map((entry) => [`quiz:${String(entry.lesson).padStart(3, "0")}`, sha256(JSON.stringify(entry))]),
    ...monthlyAssessments.map((entry) => [`monthly:${String(entry.lesson).padStart(3, "0")}`, sha256(JSON.stringify(entry))]),
    ...stageReviews.map((entry) => [`review:${String(entry.lesson).padStart(3, "0")}`, sha256(JSON.stringify(entry))]),
  ]);
  for (const row of rows) {
    if (row.kind === "question") expect(currentQuestions.get(row.id) === row.sha256, `${row.id}: question differs from the frozen baseline`);
    else if (row.kind === "assessment-set") expect(currentAssessments.get(row.id) === row.sha256, `${row.id}: assessment set differs from the frozen baseline`);
    else {
      const absolutePath = path.join(root, row.path);
      expect(fs.existsSync(absolutePath), `${row.path}: frozen file is missing`);
      if (fs.existsSync(absolutePath)) expect(sha256(fs.readFileSync(absolutePath)) === row.sha256, `${row.path}: file differs from the frozen baseline`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Remediation v2 Stage 0 historical baseline verified: ${baseline.inventory.manifestEntries} frozen entries, ${defects.issues.length} reopened issue identities, current decision BLOCKED.`);
console.log("Negative controls passed: APPROVED mutation rejected; legacy current-decision source rejected.");
