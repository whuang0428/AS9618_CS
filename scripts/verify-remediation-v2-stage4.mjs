import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { evaluateStage4QuestionPolicy, evaluateStudentMarkSchemeSurface } from "./remediation-v2-stage4-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
const problems = [];
for (const name of ["remediation-v2-stage4-question-review.json", "remediation-v2-stage4-gate-result.json", "remediation-v2-stage4-closure.json", "remediation-v2-stage4-report.md"]) if (!fs.existsSync(path.join(audits, name))) problems.push({ id: "STAGE4-ARTIFACT", detail: `${name} missing` });
const review = readJson("remediation-v2-stage4-question-review.json");
problems.push(...evaluateStage4QuestionPolicy(review, loadAllQuestions()));
for (const name of ["quizzes.md", "monthly-assessments.md", "stage-reviews.md"]) problems.push(...evaluateStudentMarkSchemeSurface(fs.readFileSync(path.join(root, "assessments", name), "utf8")));
problems.push(...evaluateStudentMarkSchemeSurface(fs.readFileSync(path.join(root, "web", "assessments", "index.html"), "utf8")));
const gate = readJson("remediation-v2-stage4-gate-result.json");
const defects = readJson("remediation-v2-defects.json");
const decision = readJson("remediation-v2-current-decision.json");
const progressedBeyondStage4 = decision.currentStage?.number > 4;
const auditIntegrityRepair = decision.currentStage?.phase === "AuditIntegrityRepair";
if (gate.questionReview.reviewed !== 968 || gate.questionReview.blocked !== 0 || gate.wordingRegister.approved !== 2054 || gate.trialCases.total !== 3872 || gate.trialCases.failed !== 0) problems.push({ id: "STAGE4-GATE-RESULT", detail: "summary is stale or blocked" });
for (const id of ["RV2-WORD-001", "RV2-MS-001"]) if (defects.issues.find((issue) => issue.id === id)?.status !== "Resolved") problems.push({ id: "STAGE4-DEFECT", detail: `${id} not Resolved` });
if (!progressedBeyondStage4 && !auditIntegrityRepair && defects.issues.filter(({ status }) => status === "Open").length !== 3) problems.push({ id: "STAGE4-DEFECT", detail: "exactly three Stage 5 defects must remain Open before an audit-integrity repair is opened" });
if (!progressedBeyondStage4 && (decision.currentReleaseDecision !== "BLOCKED" || decision.currentStage.number !== 4 || decision.currentStage.approvalStatus !== "AwaitingUserApproval")) problems.push({ id: "STAGE4-DECISION", detail: "current decision is not Stage 4 AwaitingUserApproval / BLOCKED" });
if (progressedBeyondStage4 && !decision.historicalDecisions?.some(({ stage, progressionApproval }) => stage === 4 && progressionApproval === "ApprovedForProgression")) problems.push({ id: "STAGE4-HISTORY", detail: "Stage 4 progression approval is missing from decision history" });
if (auditIntegrityRepair && !["RV2-AUDIT-001", "RV2-AUDIT-002"].every((id) => defects.issues.some((issue) => issue.id === id))) problems.push({ id: "STAGE4-AUDIT-INTEGRITY", detail: "the superseding audit-integrity defect records are missing" });
if (problems.length) {
  console.error(`Remediation v2 Stage 4 verification failed (${problems.length}):`);
  for (const problem of problems) console.error(`- ${problem.id}: ${problem.detail}`);
  process.exit(1);
}
console.log(`Remediation v2 Stage 4 artifact verification passed: 968 reviewed questions, 3872 trial cases, 2054 current-hash wording approvals and Cambridge student display${progressedBeyondStage4 ? "; progression is recorded in history" : auditIntegrityRepair ? "; audit-integrity repair remains current" : ""}.`);
