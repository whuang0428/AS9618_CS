import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { evaluateCurrentDecision } from "./remediation-v2-decision-gate.mjs";
import { parseCsv, wordingReviewHeaders } from "./remediation-v2-review-gate.mjs";
import { evaluateRemediationV2SemanticGate } from "./remediation-v2-semantic-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const read = (name) => fs.readFileSync(path.join(audits, name), "utf8");
const readJson = (name) => JSON.parse(read(name));
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

const defects = readJson("remediation-v2-defects.json");
const decision = readJson("remediation-v2-current-decision.json");
const gateResult = readJson("remediation-v2-stage1-gate-result.json");
const closure = readJson("remediation-v2-stage1-closure.json");
const report = read("remediation-v2-stage1-report.md");
const semanticGate = evaluateRemediationV2SemanticGate();
const decisionEvaluation = evaluateCurrentDecision(decision, defects, semanticGate);
const progressed = decision.currentStage.number > 1;

expect(decisionEvaluation.status === "Valid", `current decision invalid: ${decisionEvaluation.problems.join("; ")}`);
expect(decision.currentReleaseDecision === "BLOCKED", "Stage 1 current release decision must be BLOCKED");
if (!progressed) expect(decision.currentStage.number === 1 && decision.currentStage.approvalStatus === "AwaitingUserApproval", "Stage 1 must await user approval");
else expect(decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 1 && progressionApproval === "ApprovedForProgression"), "Stage 1 progression approval is missing from history");
expect(semanticGate.status === "Blocked", "current known defects must block the Stage 1 semantic gate");
expect(semanticGate.sequence.officialOrderEdgeCount === 109, `expected 109 official-order edges, found ${semanticGate.sequence.officialOrderEdgeCount}`);
if (!progressed) {
  expect(semanticGate.sequence.problems.length > 0, "current sequence defects escaped the gate");
  expect(semanticGate.problems.some(({ id }) => id === "GATE-FIRST-USE-EVIDENCE"), "missing exact first-use evidence did not block the gate");
}
for (const id of [
  "CRIT-S1.03-ONES-COMPLEMENT", "CRIT-L050-PERFORMANCE-FACTORS", "CRIT-L108-CHAR-FUNCTION-TYPE",
  "CRIT-L122-PROVIDED-FUNCTIONS", "CRIT-L134-CHAR-FUNCTION-TYPE", "CRIT-L134-PROVIDED-FUNCTION",
]) if (!progressed || id !== "CRIT-S1.03-ONES-COMPLEMENT") expect(semanticGate.problems.some((problem) => problem.id === id), `${id}: current error escaped the semantic gate`);

const resolved = new Set(defects.issues.filter(({ status }) => status === "Resolved").map(({ id }) => id));
expect(resolved.has("RV2-GATE-001") && resolved.has("RV2-GATE-002"), "Stage 1 gate defects are not still Resolved");
if (!progressed) {
  expect(resolved.size === 2, "Stage 1 must resolve exactly the two gate defects");
  expect(defects.issues.filter(({ status }) => status === "Open").length === 11, "Stage 1 must retain eleven content/scope/order/wording defects as Open");
}
expect(closure.records.length === defects.issues.length, "closure table does not reconcile every defect");

const registerText = read("cie-wording-review-register.csv");
const register = parseCsv(registerText);
expect(register.headers.join(",") === wordingReviewHeaders.join(","), "wording register is not using the remediation-v2 review schema");
expect(register.rows.length === 2046, `expected 2046 review records, found ${register.rows.length}`);
if (decision.currentStage.number < 4) expect(register.rows.every(({ status, independent_review_status }) => status === "Pending" && independent_review_status === "Unreviewed"), "old semantic approval was inherited into the new review register");
else expect(register.rows.every(({ status, independent_review_status }) => status === "Approved" && independent_review_status === "IndependentlyReviewed"), "Stage 4 item-level reviews are incomplete");

const prohibitedRun = spawnSync(process.execPath, [path.join(root, "scripts", "generate-cie-wording-register.mjs"), "--approve"], { cwd: root, encoding: "utf8" });
expect(prohibitedRun.status !== 0 && `${prohibitedRun.stdout}${prohibitedRun.stderr}`.includes("Bulk approval is prohibited"), "--approve no longer fails closed");
expect(read("cie-wording-review-register.csv") === registerText, "--approve changed the review register before failing");

if (!progressed) {
  expect(gateResult.semanticGate.problemCount === semanticGate.problems.length, "Stage 1 gate-result problem count is stale");
  expect(gateResult.semanticGate.sequenceProblemCount === semanticGate.sequence.problems.length, "Stage 1 sequence problem count is stale");
}
expect(gateResult.decisionGate.status === "Valid" && gateResult.currentReleaseDecision === "BLOCKED", "Stage 1 recorded decision is stale");
for (const phrase of ["**Current release decision:** BLOCKED", "## Issue closure table", "## Passed evidence", "## Active failed samples", "## Command evidence", "## Failed / open", "## Unverified", "## Remaining risks", "## Stop condition"]) {
  expect(report.includes(phrase), `Stage 1 report is missing ${phrase}`);
}

if (failures.length) {
  console.error(`Remediation v2 Stage 1 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Remediation v2 Stage 1 verified${progressed ? " as approved history" : ""}: gate defects remain resolved, ${semanticGate.problems.length} current blockers detected, decision BLOCKED.`);
console.log("Active negative control passed: --approve rejected before write; mutation suite is required separately.");
