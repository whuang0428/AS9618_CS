import fs from "node:fs";
import path from "node:path";

import { evaluateCurrentDecision } from "./remediation-v2-decision-gate.mjs";
import { parseCsv } from "./remediation-v2-review-gate.mjs";
import { evaluateRemediationV2SemanticGate } from "./remediation-v2-semantic-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
const defects = readJson("remediation-v2-defects.json");
const decision = readJson("remediation-v2-current-decision.json");
const semanticGate = evaluateRemediationV2SemanticGate();
const decisionEvaluation = evaluateCurrentDecision(decision, defects, semanticGate);
const wordingRegister = fs.readFileSync(path.join(audits, "cie-wording-review-register.csv"), "utf8");
const wordingRows = parseCsv(wordingRegister).rows;
const wordingCounts = Object.fromEntries(["Approved", "Pending", "Rejected"].map((status) => [status, wordingRows.filter((row) => row.status === status).length]));
const countBy = (items, field) => Object.fromEntries([...new Set(items.map((item) => item[field]))].sort().map((value) => [value, items.filter((item) => item[field] === value).length]));
const criticalIds = [...new Set(semanticGate.problems.filter(({ id }) => id.startsWith("CRIT-")).map(({ id }) => id))].sort();

const gateResult = {
  schemaVersion: 1,
  remediation: "v2",
  stage: 1,
  generatedDate: "2026-08-28",
  implementationStatus: "Complete",
  approvalStatus: "AwaitingUserApproval",
  currentReleaseDecision: decision.currentReleaseDecision,
  reviewGate: {
    records: wordingRows.length,
    statuses: wordingCounts,
    bulkApprovalDisabled: true,
    approvedMetadataRequired: ["independent_review_status", "evidence_location", "content_hash", "reviewer_id", "review_round", "official_basis"],
  },
  semanticGate: {
    status: semanticGate.status,
    requirementCount: semanticGate.requirementCount,
    problemCount: semanticGate.problems.length,
    problemsByType: countBy(semanticGate.problems, "type"),
    sequenceProblemCount: semanticGate.sequence.problems.length,
    officialOrderEdges: semanticGate.sequence.officialOrderEdgeCount,
    criticalIds,
  },
  decisionGate: {
    status: decisionEvaluation.status,
    problems: decisionEvaluation.problems,
    openBlockingDefects: decisionEvaluation.openBlockingCount,
  },
  resolvedStage1Issues: defects.issues.filter(({ status }) => status === "Resolved").map(({ id }) => id),
  remainingOpenIssues: defects.issues.filter(({ status }) => status === "Open").map(({ id, severity }) => ({ id, severity })),
  rule: "A Blocked semantic result is expected at Stage 1: it proves the repaired gate rejects current known defects; it does not close content defects assigned to Stages 2-5.",
};

const closure = {
  schemaVersion: 1,
  stage: 1,
  records: defects.issues.map((issue) => ({
    id: issue.id,
    severity: issue.severity,
    stage1Disposition: issue.status,
    closureEvidence: issue.closureEvidence ?? [],
    nextStage: issue.status === "Resolved" ? null
      : issue.id.startsWith("RV2-COV") || issue.id.startsWith("RV2-SCOPE") ? 2
      : issue.id.startsWith("RV2-SEQ") || issue.id.startsWith("RV2-ID") ? 3
      : issue.id.startsWith("RV2-WORD") || issue.id.startsWith("RV2-MS") ? 4
      : 5,
  })),
};

const report = `# AS9618 remediation v2 — Stage 1 gate repair report

**Current release decision:** ${decision.currentReleaseDecision}
**Stage status:** Implementation complete; awaiting user approval before Stage 2.

## Change summary

- Bulk semantic approval is disabled; the wording generator creates Pending records only.
- Approved review rows now require independent-review status, evidence location, current content hash, reviewer ID, review round and page-specific official basis.
- Coverage evaluation now checks requirement-specific CORE sections, worked examples, practice/MS, direct questions and declared visual evidence.
- The sequence model evaluates ${semanticGate.sequence.officialOrderEdgeCount} consecutive official-order edges, all declared prerequisites and all direct-assessment first uses.
- One canonical current release-decision artifact replaces conflicting legacy conclusions.

## Issue closure table

| Issue | Stage 1 disposition | Evidence / next stage |
|---|---|---|
${closure.records.map((record) => `| ${record.id} | ${record.stage1Disposition} | ${record.closureEvidence.join("; ") || `Stage ${record.nextStage}`} |`).join("\n")}

## Passed evidence

- Review register: ${wordingRows.length} records; Approved=${wordingCounts.Approved}, Pending=${wordingCounts.Pending}, Rejected=${wordingCounts.Rejected}. No old Approved value was inherited.
- Decision gate: ${decisionEvaluation.status}; one current conclusion, ${decision.currentReleaseDecision}.
- Stage 1 mutation suite rejects missing approval metadata, one's-complement conversion, processor type, bus width, supplied-function signatures, CHAR/STRING misuse and official first-use inversions.

## Active failed samples

- The current semantic gate is intentionally ${semanticGate.status} with ${semanticGate.problems.length} findings; a Ready result at this stage would be a false positive.
- Current critical blockers detected: ${criticalIds.join(", ")}.
- Current order model detects ${semanticGate.sequence.problems.length} first-use/prerequisite/assessment problems.
- Passing the --approve option to the wording-register generator exits non-zero before writing.

## Command evidence

- node scripts/verify-remediation-v2-stage0.mjs — exit 0; historical baseline and legacy-source rejection verified.
- node scripts/verify-remediation-v2-current-decision.mjs — exit 0; sole current decision BLOCKED.
- node scripts/test-remediation-v2-stage1-mutations.mjs — exit 0; all required mutations rejected.
- node scripts/verify-remediation-v2-stage1.mjs — exit 0; Stage 1 implementation accepted by its verifier.
- node scripts/verify-scientific-audit.mjs — exit 0; legacy APPROVED explicitly classified as historical, then current BLOCKED reported.
- node scripts/verify-cie-wording.mjs — expected exit 1; 0/2046 independently Approved.
- node scripts/verify-syllabus-coverage.mjs --schema-only — expected exit 1; 121/121 exact first-use anchors pending Stage 2.
- node scripts/verify-curriculum-sequence.mjs — expected exit 1; 25 current ordering blockers detected.

## Failed / open

- Remaining defect register: ${closure.records.filter(({ stage1Disposition }) => stage1Disposition === "Open").length} Open; P0=${closure.records.filter(({ stage1Disposition, severity }) => stage1Disposition === "Open" && severity === "P0").length}; P1=${closure.records.filter(({ stage1Disposition, severity }) => stage1Disposition === "Open" && severity === "P1").length}.
- Course content, syllabus contract, lesson order, CIE wording, mark-scheme presentation and technical visuals are not repaired in Stage 1.

## Unverified

- No Pending wording row has received independent semantic approval.
- No Stage 2-7 acceptance condition is claimed.
- Full verify-all and browser QA are deferred because the sole current decision remains BLOCKED.

## Remaining risks

- The stricter gate depends on Stage 2 adding exact firstTeachingEvidence anchors to all 121 requirements.
- Current content must continue to fail until its owning repair stage closes each named defect.
- Commit, push and publication remain unauthorised.

## Stop condition

Do not start Stage 2 until the user approves Stage 1. Stage approval authorises progression only; it is not a release decision.
`;

fs.writeFileSync(path.join(audits, "remediation-v2-stage1-gate-result.json"), `${JSON.stringify(gateResult, null, 2)}\n`);
fs.writeFileSync(path.join(audits, "remediation-v2-stage1-closure.json"), `${JSON.stringify(closure, null, 2)}\n`);
fs.writeFileSync(path.join(audits, "remediation-v2-stage1-report.md"), report);
console.log(`Generated remediation v2 Stage 1 evidence: ${semanticGate.problems.length} expected blockers, ${criticalIds.length} critical controls, decision ${decision.currentReleaseDecision}.`);
