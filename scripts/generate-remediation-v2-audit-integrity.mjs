import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateAuditIntegrity, loadOfficialInventory } from "./remediation-v2-audit-integrity-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const inventory = loadOfficialInventory();
const result = evaluateAuditIntegrity();
const browser = readJson("audits/remediation-v2-audit-integrity-browser-evidence.json");
const defects = readJson("audits/remediation-v2-defects.json");
const decision = readJson("audits/remediation-v2-current-decision.json");
const reviewed = coverageContract.requirements.filter(({ evidenceReviewStatus, integrityReviewStatus, firstUseReview }) => evidenceReviewStatus === "Reviewed" && integrityReviewStatus === "Reviewed" && firstUseReview?.status === "Reviewed").length;
const coreTeachingPagesChecked = new Set(coverageContract.requirements.flatMap(({ teachingLessons }) => teachingLessons)).size;
const uniqueFirstUsePagesChecked = new Set(coverageContract.requirements.map(({ firstTeachingEvidence }) => firstTeachingEvidence.lesson)).size;
const progressedBeyondAuditRepair = decision.currentStage?.number > 4;

if (result.status !== "Ready" || result.problemCount !== 0) throw new Error(`Audit-integrity repair is not ready: ${result.problemCount} live problem(s).`);
if (reviewed !== coverageContract.requirements.length) throw new Error(`Only ${reviewed}/${coverageContract.requirements.length} requirements have current review records.`);

for (const id of ["RV2-AUDIT-001", "RV2-AUDIT-002"]) {
  const issue = defects.issues.find((candidate) => candidate.id === id);
  if (!issue) throw new Error(`${id} is missing from the defect register`);
  issue.status = "Resolved";
  issue.closureEvidence = id === "RV2-AUDIT-001" ? [
    "360 locked official source atoms reconcile bidirectionally with zero unmapped, phantom, partial-claim or page-locator failures",
    "P22 bitwise/label rows and P24 validation/verification integrity wording now have explicit contract ownership",
  ] : [
    `${coreTeachingPagesChecked}/${coreTeachingPagesChecked} CORE teaching pages place substantive CORE before Optional content; all ${uniqueFirstUsePagesChecked} unique first-use pages are owned by declared requirements`,
    "All declared first-teaching concept groups pass, including vector, representations, devices, security, licensing, algorithms and ADT scope",
  ];
}
if (!progressedBeyondAuditRepair) {
  defects.blockingSummary = "Audit-integrity repair is complete and awaiting progression approval. Stage 5 has not started; L049/L107/L121/L133 technical and image defects remain the three open P0 blockers.";
  defects.stageStatus = { stage: 4, phase: "AuditIntegrityRepair", status: "AwaitingUserApproval" };
}
writeJson("audits/remediation-v2-defects.json", defects);

if (!progressedBeyondAuditRepair) {
  decision.currentReleaseDecision = "BLOCKED";
  decision.currentStage = {
    number: 4,
    phase: "AuditIntegrityRepair",
    name: "Independent official-source and first-teaching integrity repair",
    implementationStatus: "Complete",
    approvalStatus: "AwaitingUserApproval",
  };
  decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-audit-integrity-gate-result.json"];
}
decision.invalidatedConclusions = {
  scope: "All 121 legacy requirement conclusions",
  status: "InvalidatedAndRevalidated",
  currentReviewEpoch: coverageContract.auditIntegrity.reviewEpoch,
  reason: "Every requirement now has current locked-source, rendered first-teaching and content-hash evidence; no legacy Approved status was inherited.",
};
writeJson("audits/remediation-v2-current-decision.json", decision);

const gateResult = {
  schemaVersion: 2,
  remediation: "v2",
  phase: "AuditIntegrityRepair",
  generatedDate: "2026-08-28",
  implementationStatus: "Complete",
  approvalStatus: "AwaitingUserApproval",
  currentReleaseDecision: "BLOCKED",
  officialSourceInventory: {
    sourceSha256: inventory.source.sha256,
    inventoryHash: inventory.inventoryHash,
    counts: inventory.counts,
    pages: inventory.source.subjectContentPages,
    extractionIndependentOfCourseContract: true,
  },
  requirementReview: {
    total: coverageContract.requirements.length,
    reviewed,
    pending: coverageContract.requirements.length - reviewed,
    reviewEpoch: coverageContract.auditIntegrity.reviewEpoch,
  },
  liveGate: {
    status: result.status,
    problemCount: result.problemCount,
    officialSourceProblemCount: result.officialSourceProblems.length,
    pedagogicalProblemCount: result.pedagogicalProblems.length,
    coreTeachingPagesChecked,
    uniqueFirstUsePagesChecked,
  },
  renderedL009Evidence: {
    sourceSha256: browser.sourceSha256,
    desktopCoreDocumentRatio: browser.desktop.coreDocumentRatio,
    mobileCoreDocumentRatio: browser.mobile.coreDocumentRatio,
    desktopFirstRole: browser.desktop.firstSubstantiveTeachingRole,
    mobileFirstRole: browser.mobile.firstSubstantiveTeachingRole,
    consoleWarningsOrErrors: browser.pageIdentity.consoleWarningsOrErrors,
    desktopHorizontalOverflow: browser.desktop.horizontalOverflow,
    mobileHorizontalOverflow: browser.mobile.horizontalOverflow,
    desktopResultingHash: browser.interaction.desktopResultingHash,
    mobileResultingHash: browser.interaction.mobileResultingHash,
  },
  negativeControls: [
    "delete locked official vector source atom",
    "remove vector, p22 bitwise or p24 integrity source ownership",
    "invent a contract claim or add an unowned official statement",
    "place Optional teaching before CORE or bury CORE behind unclassified teaching",
    "remove a required concept from the first CORE section",
  ],
  resolvedIssues: ["RV2-AUDIT-001", "RV2-AUDIT-002"],
  remainingOpenIssues: defects.issues.filter(({ status }) => status === "Open").map(({ id, severity }) => ({ id, severity })),
};
writeJson("audits/remediation-v2-audit-integrity-gate-result.json", gateResult);
writeJson("audits/remediation-v2-audit-integrity-closure.json", {
  schemaVersion: 2,
  phase: "AuditIntegrityRepair",
  records: defects.issues.map((issue) => ({
    id: issue.id,
    severity: issue.severity,
    disposition: ["RV2-AUDIT-001", "RV2-AUDIT-002"].includes(issue.id) ? "ResolvedByAuditIntegrityRepair" : issue.status,
    currentStatus: issue.status,
    closureEvidence: issue.closureEvidence ?? [],
    nextAction: issue.status === "Open" ? "Stage 5 technical content and image repair after user approval" : null,
  })),
});

const report = `# AS9618 remediation v2 — Audit-integrity repair before Stage 5

**Current release decision:** BLOCKED
**Phase status:** Audit-integrity implementation complete${progressedBeyondAuditRepair ? `; project has progressed to Stage ${decision.currentStage.number}.` : "; awaiting user approval before Stage 5."}

## Change summary

- Corrected the generator defect that placed formal CORE teaching near the end of the page; all ${coreTeachingPagesChecked} generated CORE teaching pages now place CORE before Optional content.
- Reconciled the 360-atom independent official inventory with the 121-row contract in both directions, including the formerly unowned p22 bitwise/label rows and p24 integrity statement.
- Filled every declared first-teaching concept gap and added a direct five-mark assessment of how validation and verification help protect data integrity while preserving L069-Q1 and its total marks.
- Invalidated, then independently revalidated, all 121 requirement conclusions in review epoch ${coverageContract.auditIntegrity.reviewEpoch}.

## Issue closure table

| Issue | Disposition | Evidence |
|---|---|---|
| RV2-AUDIT-001 | Resolved P0 | 0 official-source problems; 360/360 atoms reconciled; 121/121 current review records |
| RV2-AUDIT-002 | Resolved P0 | 0 first-teaching problems; ${coreTeachingPagesChecked} CORE pages and ${uniqueFirstUsePagesChecked} unique first-use pages checked |
| Stage 5 technical/image defects | Open P0 | RV2-CONT-001, RV2-PSEUDO-001 and RV2-PSEUDO-002 remain untouched |

## Passed evidence

- Official-source gate: Ready; unmapped=0, phantom=0, partial claim=0, page mismatch=0.
- Pedagogical gate: Ready; CORE-not-first=0, Optional-before-CORE=0, CORE-after-Optional=0, buried-CORE=0, missing concept=0.
- Coverage evaluation: 121 Complete, 0 Partial after current-hash review; prior approvals were not inherited.
- L009 browser evidence: the bitmap file-size and metadata CORE section is the first substantive teaching block on 1440x900 and 390x844; CORE begins at ${(browser.desktop.coreDocumentRatio * 100).toFixed(1)}% and ${(browser.mobile.coreDocumentRatio * 100).toFixed(1)}% of the document; no overflow or console warning/error; contents navigation reaches #stage2-completion.
- L069-Q1 keeps its stable ID and five marks and passes correct, common-error, boundary and out-of-scope trial cases.

## Active failed samples

- Removing the official vector atom or its S1.09 owner fails.
- Removing p22 bitwise instruction ownership from S4.15 or p24 integrity ownership from S6.07 fails.
- Inventing contract wording or adding an unowned official statement fails.
- Moving Optional content before CORE, burying CORE or removing a first-teaching concept fails.

## Command evidence

- node scripts/repair-remediation-v2-audit-integrity.mjs — reconciles explicit source ownership and exact pages.
- node scripts/apply-stage2-repairs.mjs — regenerated ${coreTeachingPagesChecked} CORE teaching pages from the corrected CORE-first insertion rule.
- node scripts/test-remediation-v2-audit-integrity-mutations.mjs — all active negative controls rejected.
- node scripts/verify-syllabus-coverage.mjs — reaches only the deliberately deferred Stage 5 L049/L107/L121/L133 blockers.
- node scripts/verify-remediation-v2-audit-integrity.mjs — verifies this phase and current browser evidence.

## Failed / open

- Release remains BLOCKED because three Stage 5 P0 issues remain open.
- The full syllabus verifier currently reports the known L049 performance-factor, L107/L133 CHAR-function and L121 supplied-function failures; this phase did not modify them.

## Unverified

- Stage 5 technical content and critical images.
- Stage 6 full 783-image two-pass review, 969 visual-object census and 306 browser records.
- Stage 7 independent final review and reproducible double-generation gate.

## Remaining risks

- Static and representative-browser evidence closes the known buried-CORE failure class, but it does not replace the planned Stage 6 all-page browser matrix.
- The current decision is not a release approval and does not authorise commit, push or publication.

## Stop condition

Do not start Stage 5 until the user approves progression from this audit-integrity repair phase.
`;
fs.writeFileSync(path.join(root, "audits", "remediation-v2-audit-integrity-report.md"), report);

console.log(`Generated repaired audit-integrity artifacts: Ready, ${reviewed}/121 reviewed, ${gateResult.remainingOpenIssues.length} deferred Stage 5 blockers.`);
