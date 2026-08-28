import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateAuditIntegrity, loadOfficialInventory, LOCKED_OFFICIAL_INVENTORY_HASH } from "./remediation-v2-audit-integrity-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
const problems = [];
const expect = (condition, detail) => { if (!condition) problems.push(detail); };
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
const requiredArtifacts = [
  "remediation-v2-official-as-source-inventory.json",
  "remediation-v2-audit-integrity-gate-result.json",
  "remediation-v2-audit-integrity-closure.json",
  "remediation-v2-audit-integrity-report.md",
  "remediation-v2-audit-integrity-browser-evidence.json",
];
for (const name of requiredArtifacts) expect(fs.existsSync(path.join(audits, name)), `${name} is missing`);

const inventory = loadOfficialInventory();
const live = evaluateAuditIntegrity();
const gate = readJson("remediation-v2-audit-integrity-gate-result.json");
const defects = readJson("remediation-v2-defects.json");
const decision = readJson("remediation-v2-current-decision.json");
const closure = readJson("remediation-v2-audit-integrity-closure.json");
const browser = readJson("remediation-v2-audit-integrity-browser-evidence.json");
const progressedBeyondAuditRepair = decision.currentStage?.number > 4;

expect(inventory.inventoryHash === LOCKED_OFFICIAL_INVENTORY_HASH, "official source inventory is not on the reviewed lock hash");
expect(inventory.counts.total === 360 && inventory.counts.total === inventory.items.length, "official source inventory count is stale");
for (let section = 1; section <= 12; section += 1) expect(inventory.items.some((item) => item.section === section && item.coverageRole === "claim"), `Section ${section} has no claim-bearing official source unit`);
const extractor = fs.readFileSync(path.join(root, "scripts", "extract-official-as-source.py"), "utf8");
expect(!/syllabus-coverage-contract|syllabus-official-as-mapping/.test(extractor), "official source extractor depends on the course contract or hand-authored mapping");

expect(coverageContract.schemaVersion === 4 && coverageContract.requirements.length === 121, "stable 121-row schemaVersion 4 contract changed");
expect(coverageContract.auditIntegrity?.reviewEpoch === "remediation-v2-audit-integrity-r2", "current audit-integrity review epoch is missing");
expect(coverageContract.auditIntegrity?.priorCompleteStatuses === "InvalidatedAndRevalidated", "legacy conclusions were not invalidated and freshly revalidated");
expect(coverageContract.requirements.every(({ evidenceReviewStatus, integrityReviewStatus, evidenceReviewRound, firstUseReview }) => evidenceReviewStatus === "Reviewed" && integrityReviewStatus === "Reviewed" && evidenceReviewRound === "remediation-v2-audit-integrity-r2" && firstUseReview?.status === "Reviewed"), "not all 121 requirements have current reviewed evidence");
for (const requirement of coverageContract.requirements) {
  const reference = requirement.officialReference;
  const { evidenceHash, ...basis } = reference;
  expect(evidenceHash === digest(JSON.stringify(basis)), `${requirement.id} official reference hash is stale`);
  expect(reference.sourceInventoryHash === LOCKED_OFFICIAL_INVENTORY_HASH && reference.sourceUnitIds.length > 0, `${requirement.id} lacks explicit locked source ownership`);
  const review = requirement.integrityReview;
  expect(review?.reviewEpoch === "remediation-v2-audit-integrity-r2" && review.officialSourceStatus === "Reviewed" && review.firstTeachingPageStatus === "Reviewed", `${requirement.id} integrity review is incomplete`);
  expect(review?.officialReferenceHash === evidenceHash && /^[a-f0-9]{64}$/.test(review?.firstTeachingContentHash ?? ""), `${requirement.id} current evidence hashes are missing`);
}

expect(live.status === "Ready" && live.problemCount === 0, `live audit-integrity gate has ${live.problemCount} problem(s)`);
expect(gate.liveGate.status === "Ready" && gate.liveGate.problemCount === 0 && gate.liveGate.officialSourceProblemCount === 0 && gate.liveGate.pedagogicalProblemCount === 0, "gate-result does not record a zero-failure live gate");
expect(gate.liveGate.coreTeachingPagesChecked === 83 && gate.liveGate.uniqueFirstUsePagesChecked === 70, "CORE teaching / first-use page counts are stale");
expect(gate.requirementReview.reviewed === 121 && gate.requirementReview.pending === 0, "requirement review summary is stale");

const l009Source = fs.readFileSync(path.join(root, browser.source));
expect(digest(l009Source) === browser.sourceSha256, "L009 browser evidence is stale for the current HTML");
for (const surface of [browser.desktop, browser.mobile]) {
  expect(surface.firstSubstantiveTeachingId === "stage2-completion" && surface.firstSubstantiveTeachingRole === "CORE", "L009 does not start with the formal vector CORE block");
  expect(surface.coreVisibleInInitialViewport && surface.coreDocumentRatio < 0.1, "L009 CORE remains buried outside the initial learning path");
  expect(surface.optionalTeachingAfterCore && surface.horizontalOverflow === 0, "L009 Optional order or horizontal layout is wrong");
}
expect(browser.pageIdentity.consoleWarningsOrErrors === 0, "L009 browser run has console warnings/errors");
expect(browser.interaction.desktopResultingHash === "#stage2-completion" && browser.interaction.mobileResultingHash === "#stage2-completion", "L009 contents navigation did not reach CORE on both viewports");

for (const id of ["RV2-AUDIT-001", "RV2-AUDIT-002"]) expect(defects.issues.find((issue) => issue.id === id)?.status === "Resolved", `${id} is not Resolved`);
const open = defects.issues.filter(({ status }) => status === "Open").map(({ id }) => id).sort();
if (!progressedBeyondAuditRepair) expect(JSON.stringify(open) === JSON.stringify(["RV2-CONT-001", "RV2-PSEUDO-001", "RV2-PSEUDO-002"]), `unexpected remaining open defects: ${open.join(", ")}`);
else for (const id of ["RV2-CONT-001", "RV2-PSEUDO-001", "RV2-PSEUDO-002"]) expect(defects.issues.find((issue) => issue.id === id)?.status === "Resolved", `${id} is not Resolved after Stage 5 progression`);
expect(decision.currentReleaseDecision === (decision.currentStage?.number >= 7 ? "RELEASE_CANDIDATE" : "BLOCKED"), "current release decision is inconsistent with final-stage progression");
if (!progressedBeyondAuditRepair) expect(decision.currentStage?.phase === "AuditIntegrityRepair" && decision.currentStage?.approvalStatus === "AwaitingUserApproval", "current phase is not repaired and awaiting approval");
else expect(decision.historicalDecisions?.some(({ stage, progressionApproval }) => stage === 4 && progressionApproval === "ApprovedForProgression"), "audit-integrity repair progression approval is missing from history");
expect(decision.invalidatedConclusions?.status === "InvalidatedAndRevalidated", "decision does not record fresh revalidation");
expect(closure.records.every(({ id }) => defects.issues.some((issue) => issue.id === id)) && closure.records.filter(({ disposition }) => disposition === "ResolvedByAuditIntegrityRepair").length === 2, "historical closure table does not reconcile its repaired audit issues");

const report = fs.readFileSync(path.join(audits, "remediation-v2-audit-integrity-report.md"), "utf8");
for (const phrase of ["**Current release decision:** BLOCKED", "## Issue closure table", "## Passed evidence", "## Active failed samples", "## Command evidence", "## Failed / open", "## Unverified", "## Remaining risks", "## Stop condition"]) expect(report.includes(phrase), `audit-integrity report is missing ${phrase}`);

try {
  execFileSync(process.execPath, [path.join(root, "scripts", "test-remediation-v2-audit-integrity-mutations.mjs")], { cwd: root, stdio: "pipe" });
} catch (error) {
  problems.push(`active mutation suite failed: ${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`.trim());
}

if (problems.length) {
  console.error(`Remediation v2 audit-integrity verification failed (${problems.length}):`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}
console.log("Remediation v2 audit-integrity verification passed: 360 official atoms, 83 CORE pages, 70 first-use pages and 121 current requirement reviews reconcile with zero live failures; all negative mutations were rejected.");
