export function evaluateCurrentDecision(candidate, defects, semanticGate) {
  const problems = [];
  const openBlocking = defects.issues.filter((issue) => ["P0", "P1"].includes(issue.severity) && issue.status !== "Resolved");
  if (candidate.schemaVersion !== 1 || candidate.remediation !== "v2") problems.push("invalid current-decision schema identity");
  if (candidate.decisionAuthority !== "audits/remediation-v2-current-decision.json") problems.push("current-decision artifact does not name itself as sole authority");
  if (!Number.isInteger(candidate.currentStage?.number) || !candidate.currentStage?.approvalStatus) problems.push("current stage and approval status must be separate from release decision");
  if (!['BLOCKED', 'RELEASE_CANDIDATE'].includes(candidate.currentReleaseDecision)) problems.push("invalid current release decision");
  if ((openBlocking.length > 0 || semanticGate.status !== "Ready") && candidate.currentReleaseDecision !== "BLOCKED") {
    problems.push("release decision is not BLOCKED despite open P0/P1 defects or a blocked semantic gate");
  }
  if (candidate.currentStage?.number >= 5 && candidate.currentStage?.implementationStatus === "Complete" && semanticGate.status !== "Ready") {
    problems.push("Stage 5 or later cannot be implementation-complete while the full semantic gate is blocked");
  }
  if (candidate.currentReleaseDecision === "RELEASE_CANDIDATE" && candidate.currentStage.number < 7) problems.push("release candidate declared before Stage 7");
  if (!Array.isArray(candidate.historicalDecisions) || candidate.historicalDecisions.some((entry) => !entry.historical || entry.current === true)) {
    problems.push("historical decisions are not isolated from the current decision");
  }
  const legacyPaths = new Set(candidate.excludedLegacyDecisionArtifacts ?? []);
  for (const required of [
    "audits/scientific-audit-report.md",
    "audits/scientific-final-audit-report.md",
    "audits/scientific-defects.json",
    "audits/scientific-final-defects.json",
  ]) if (!legacyPaths.has(required)) problems.push(`${required}: legacy decision artifact is not excluded`);
  return { status: problems.length ? "Invalid" : "Valid", problems, openBlockingCount: openBlocking.length };
}
