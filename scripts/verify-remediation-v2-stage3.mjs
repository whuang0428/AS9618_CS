import fs from "node:fs";
import path from "node:path";
import { evaluateStage3Repository } from "./remediation-v2-stage3-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const { problems, questionRegister } = evaluateStage3Repository();
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
for (const name of ["remediation-v2-stage3-gate-result.json", "remediation-v2-stage3-closure.json", "remediation-v2-stage3-report.md", "remediation-v2-stage3-question-sequence.json"]) if (!fs.existsSync(path.join(audits, name))) problems.push({ id: "STAGE3-ARTIFACT", detail: `${name} is missing` });
if (fs.existsSync(path.join(audits, "remediation-v2-stage3-gate-result.json"))) {
  const gate = readJson("remediation-v2-stage3-gate-result.json");
  const defects = readJson("remediation-v2-defects.json");
  const decision = readJson("remediation-v2-current-decision.json");
  const register = readJson("remediation-v2-stage3-question-sequence.json");
  const progressed = decision.currentStage.number > 3;
  if (gate.sequence.blockingProblems !== 0 || gate.coverage.completeRequirements !== 121 || gate.questionDependencies.beforeCoreViolations !== 0) problems.push({ id: "STAGE3-GATE-RESULT", detail: "Stage 3 gate-result summary is stale or blocked" });
  if (register.questionCount !== questionRegister.questionCount || register.violationCount !== 0 || JSON.stringify(register) !== JSON.stringify(questionRegister)) problems.push({ id: "STAGE3-QUESTION-REGISTER", detail: "question sequence register is stale or has violations" });
  for (const id of ["RV2-SEQ-001", "RV2-ID-001"]) if (defects.issues.find((issue) => issue.id === id)?.status !== "Resolved") problems.push({ id: "STAGE3-DEFECT", detail: `${id} is not Resolved` });
  if (!progressed && defects.issues.filter(({ status }) => status === "Open").length !== 5) problems.push({ id: "STAGE3-DEFECT", detail: "Stage 3 must retain exactly five later-stage defects as Open" });
  if (!progressed && (decision.currentReleaseDecision !== "BLOCKED" || decision.currentStage.number !== 3 || decision.currentStage.approvalStatus !== "AwaitingUserApproval")) problems.push({ id: "STAGE3-DECISION", detail: "current decision is not Stage 3 AwaitingUserApproval / BLOCKED" });
  if (progressed && !decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 3 && progressionApproval === "ApprovedForProgression")) problems.push({ id: "STAGE3-DECISION", detail: "Stage 3 progression approval is missing from history" });
}
if (problems.length) {
  console.error(`Remediation v2 Stage 3 verification failed (${problems.length}):`);
  for (const problem of problems) console.error(`- ${problem.id}: ${problem.detail}`);
  process.exit(1);
}
console.log(`Remediation v2 Stage 3 verification passed: 121 Complete requirements, 109 official-order edges, 150 stable lesson identities and ${questionRegister.questionCount} dependency-classified questions with zero before-CORE violations.`);
