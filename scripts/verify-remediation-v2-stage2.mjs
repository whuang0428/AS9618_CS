import { evaluateStage2Repository } from "./remediation-v2-stage2-gate.mjs";
import fs from "node:fs";
import path from "node:path";

const problems = evaluateStage2Repository();
const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const read = (name) => fs.readFileSync(path.join(audits, name), "utf8");
const readJson = (name) => JSON.parse(read(name));
for (const name of ["remediation-v2-stage2-gate-result.json", "remediation-v2-stage2-closure.json", "remediation-v2-stage2-report.md"]) {
  if (!fs.existsSync(path.join(audits, name))) problems.push({ id: "STAGE2-ARTIFACT", detail: `${name} is missing` });
}
if (fs.existsSync(path.join(audits, "remediation-v2-stage2-gate-result.json"))) {
  const defects = readJson("remediation-v2-defects.json");
  const decision = readJson("remediation-v2-current-decision.json");
  const gate = readJson("remediation-v2-stage2-gate-result.json");
  const closure = readJson("remediation-v2-stage2-closure.json");
  const progressed = decision.currentStage.number > 2;
  const resolved = new Set(defects.issues.filter(({ status }) => status === "Resolved").map(({ id }) => id));
  for (const id of ["RV2-GATE-001", "RV2-GATE-002", "RV2-COV-001", "RV2-COV-002", "RV2-SCOPE-001", "RV2-SCOPE-002"]) if (!resolved.has(id)) problems.push({ id: "STAGE2-DEFECT", detail: `${id} is not Resolved` });
  if (!progressed && defects.issues.filter(({ status }) => status === "Open").length !== 7) problems.push({ id: "STAGE2-DEFECT", detail: "Stage 2 must retain exactly seven later-stage defects as Open" });
  if (!progressed && (decision.currentReleaseDecision !== "BLOCKED" || decision.currentStage.number !== 2 || decision.currentStage.approvalStatus !== "AwaitingUserApproval")) problems.push({ id: "STAGE2-DECISION", detail: "current decision is not Stage 2 AwaitingUserApproval / BLOCKED" });
  if (progressed && !decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 2 && progressionApproval === "ApprovedForProgression")) problems.push({ id: "STAGE2-DECISION", detail: "Stage 2 progression approval is missing from history" });
  if (gate.officialContract.stage2Problems !== 0 || gate.resolvedStage2Issues.length !== 4) problems.push({ id: "STAGE2-GATE-RESULT", detail: "Stage 2 gate-result summary is stale" });
  if (!progressed && closure.records.length !== defects.issues.length) problems.push({ id: "STAGE2-CLOSURE", detail: "closure table does not reconcile every defect" });
  if (progressed && closure.records.some(({ id }) => !defects.issues.some((issue) => issue.id === id))) problems.push({ id: "STAGE2-CLOSURE", detail: "historical closure table references an unknown defect" });
  const report = read("remediation-v2-stage2-report.md");
  for (const phrase of ["**Current release decision:** BLOCKED", "## Issue closure table", "## Passed evidence", "## Active failed samples", "## Command evidence", "## Failed / open", "## Unverified", "## Remaining risks", "## Stop condition"]) if (!report.includes(phrase)) problems.push({ id: "STAGE2-REPORT", detail: `report is missing ${phrase}` });
}
if (problems.length) {
  console.error(`Remediation v2 Stage 2 verification failed (${problems.length}):`);
  for (const problem of problems) console.error(`- ${problem.id}: ${problem.detail}`);
  process.exit(1);
}
console.log("Remediation v2 Stage 2 verification passed: 121 official mappings, all 12 AS sections, one's-complement direct evidence, scope corrections and 13 Optional enrichment dispositions are present.");
