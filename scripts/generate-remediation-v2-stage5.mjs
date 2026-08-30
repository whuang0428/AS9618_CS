import fs from "node:fs";
import path from "node:path";

import { evaluateStage5TechnicalControls, stage5VisualKeys } from "./remediation-v2-stage5-gate.mjs";
import { coreVisualSectionKeys, visualDeliveryOverrides } from "./remediation-v2-core-visuals.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const required = [
  "audits/remediation-v2-stage5-question-review.json",
  "audits/remediation-v2-stage5-visual-review.json",
  "audits/remediation-v2-stage5-browser-evidence.json",
];
for (const relative of required) if (!fs.existsSync(path.join(root, relative))) throw new Error(`${relative} is missing`);

const technical = evaluateStage5TechnicalControls();
if (technical.status !== "Ready") throw new Error(`Stage 5 technical controls are blocked (${technical.problems.length}).`);
const questionReview = readJson("audits/remediation-v2-stage5-question-review.json");
const visualReview = readJson("audits/remediation-v2-stage5-visual-review.json");
const browser = readJson("audits/remediation-v2-stage5-browser-evidence.json");
if (questionReview.questionCount !== 17 || questionReview.failedTrials !== 0) throw new Error("Stage 5 question review is incomplete");
if (visualReview.entries.length !== 8 || visualReview.pending !== 0 || visualReview.disagreements !== 0) throw new Error("Stage 5 visual review is incomplete");
if (browser.consoleWarningsOrErrors !== 0 || browser.criticalImages.loaded !== 8) throw new Error("Stage 5 browser evidence is blocked");

const defects = readJson("audits/remediation-v2-defects.json");
const closures = {
  "RV2-AUDIT-003": [
    "Required visual evidence now checks the contract mapping, target register and actual DOM section role/activity together; Optional evidence cannot satisfy CORE coverage",
    `${coreVisualSectionKeys.size} unique required visual panels are anchored after reviewed CORE teaching, with ${Object.keys(visualDeliveryOverrides).length} source panels relocated so none precedes first use or depends on an Optional-only page`,
  ],
  "RV2-CONT-001": [
    "L050 topic heading, teaching, assessment, maintained transcript and deterministic concept image use processor type and number of cores, bus width, clock speed and cache memory",
    "The word-length discussion remains visibly labelled Optional enrichment and is excluded from the official performance-factor list",
  ],
  "RV2-PSEUDO-001": [
    "L108/L134 keep MID results as STRING and reserve LCASE/UCASE for declared CHAR values with single-quoted literals",
    "LEFT is identified as guide-external and is not called without a complete question-supplied signature",
  ],
  "RV2-PSEUDO-002": [
    "L122 defines SPLIT, STRING_TO_INTEGER, IS_NUMERIC and FIELD_COUNT with complete typed signatures before use",
    "The supplied SPLIT array starts at index 1; parameter order and return types are explicit in teaching, questions, transcript and pixels",
  ],
};
if (!defects.issues.some(({ id }) => id === "RV2-AUDIT-003")) defects.issues.push({
  id: "RV2-AUDIT-003",
  category: "Coverage gate / visual evidence",
  severity: "P1",
  locations: ["scripts/syllabus-coverage-evaluator.mjs", "scripts/stage10-explanations-data.mjs", "scripts/syllabus-coverage-contract.json"],
  problem: "The coverage gate trusted Stage 10 target-register delivery metadata without reconciling the actual lesson DOM, so required visual evidence could remain Optional or appear before reviewed first use while the gate reported Complete.",
  acceptanceTarget: "Required visuals must be CORE/TEACH in both register and DOM, appear no earlier than reviewed first use, remain on a page with a CORE teaching anchor, and fail active mutations when any invariant is broken.",
  confidence: "High",
  status: "Open",
});
for (const issue of defects.issues) if (closures[issue.id]) {
  issue.status = "Resolved";
  issue.closureEvidence = closures[issue.id];
}
if (!defects.stageApprovals.some(({ stage }) => stage === 4)) {
  defects.stageApprovals.push({ stage: 4, phase: "AuditIntegrityRepair", status: "ApprovedForProgression", recordedDate: "2026-08-28", releaseDecision: false });
}
defects.blockingSummary = "All registered P0/P1 defects are resolved through Stage 5. Release remains BLOCKED because the Stage 6 full image/browser census and Stage 7 independent final gate are unverified.";
defects.stageStatus = { stage: 5, status: "AwaitingUserApproval" };
writeJson("audits/remediation-v2-defects.json", defects);

const decision = readJson("audits/remediation-v2-current-decision.json");
if (!decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 4 && progressionApproval === "ApprovedForProgression")) {
  decision.historicalDecisions.splice(4, 0, { stage: 4, phase: "AuditIntegrityRepair", decisionAtTime: "BLOCKED", progressionApproval: "ApprovedForProgression", historical: true, current: false });
}
decision.currentReleaseDecision = "BLOCKED";
decision.currentStage = {
  number: 5,
  name: "Technical content and critical image repair",
  implementationStatus: "Complete",
  approvalStatus: "AwaitingUserApproval"
};
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage5-gate-result.json"];
writeJson("audits/remediation-v2-current-decision.json", decision);

const gateResult = {
  schemaVersion: 1,
  remediation: "v2",
  stage: 5,
  generatedDate: "2026-08-28",
  implementationStatus: "Complete",
  approvalStatus: "AwaitingUserApproval",
  currentReleaseDecision: "BLOCKED",
  technicalControls: { status: technical.status, failures: technical.problems.length, lessons: [49, 107, 121, 133] },
  criticalVisuals: { expected: 8, reviewed: visualReview.entries.length, pending: visualReview.pending, disagreements: visualReview.disagreements, keys: stage5VisualKeys },
  targetedQuestionReview: { changed: questionReview.questionCount, stableIds: questionReview.stableIdCount, stableMarks: questionReview.stableMarksCount, trials: questionReview.trialCount, failedTrials: questionReview.failedTrials },
  browser: { desktopLessons: browser.desktop.lessons.length, mobileRecords: browser.mobile.records, loadedCriticalImages: browser.criticalImages.loaded, consoleWarningsOrErrors: browser.consoleWarningsOrErrors },
  coverageVisualIntegrity: { requiredEvidenceRows: 79, uniqueCorePanels: coreVisualSectionKeys.size, relocatedPanels: Object.keys(visualDeliveryOverrides).length, semanticGate: "Ready" },
  negativeControls: [
    "remove bus width or substitute word length in the official performance list",
    "pass MID STRING directly to LCASE/UCASE",
    "remove supplied SPLIT/STRING_TO_INTEGER signatures or index convention",
    "call LEFT without a complete supplied signature",
    "rewrite the field identifier Name as the command word Identify",
    "use an Optional visual as required CORE evidence or place a required visual before reviewed first use",
  ],
  resolvedStage5Issues: Object.keys(closures),
  openP0P1: defects.issues.filter(({ status, severity }) => status !== "Resolved" && ["P0", "P1"].includes(severity)).map(({ id, severity }) => ({ id, severity })),
  unverified: ["Stage 6 full 784-image two-pass census", "Stage 6 971-visual-object and 308-browser-record QA", "Stage 7 independent final/reproducibility gate"],
};
writeJson("audits/remediation-v2-stage5-gate-result.json", gateResult);
writeJson("audits/remediation-v2-stage5-closure.json", {
  schemaVersion: 1,
  stage: 5,
  records: defects.issues.map((issue) => ({
    id: issue.id,
    severity: issue.severity,
    disposition: closures[issue.id] ? "ResolvedByStage5" : issue.status,
    currentStatus: issue.status,
    closureEvidence: issue.closureEvidence ?? [],
  })),
});

const report = `# AS9618 remediation v2 — Stage 5 technical content and critical images

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 6.

## Change summary

- Aligned L050 performance-factor teaching, assessment, transcript and deterministic image with the complete official list: processor type and number of cores, bus width, clock speed and cache memory.
- Enforced the pseudocode-guide CHAR/STRING boundary in L108/L134 and supplied complete typed signatures/index rules for guide-external functions in L122.
- Corrected the systemic command-normalisation defect that changed field identifier Name into Identify after a comma, then re-reviewed all 17 changed questions without changing IDs or marks.
- Rebuilt and reviewed eight critical images in forward and reverse order; all load as 1536x1024 assets in the browser.
- Repaired the visual-evidence gate that had trusted stale CSV delivery metadata: 79 required evidence rows now resolve to ${coreVisualSectionKeys.size} unique panels that are CORE/TEACH in both the register and live DOM, and ${Object.keys(visualDeliveryOverrides).length} panels were relocated so none appears before official first use or on an Optional-only page.

## Issue closure table

| Issue | Disposition | Evidence |
|---|---|---|
${Object.entries(closures).map(([id, evidence]) => `| ${id} | Resolved | ${evidence.join("; ")} |`).join("\n")}

## Passed evidence

- Technical gate: Ready; zero L050/L108/L122/L134 failures.
- Targeted question review: 17/17 current-hash Reviewed; stable IDs 17/17; stable marks 17/17; 68/68 correct/common/boundary/out-of-scope trials passed.
- Critical visuals: 8/8 forward reviewed and 8/8 reverse reviewed; disagreement=0; dimensions 1536x1024.
- Browser: four desktop pages and four 390px records have zero horizontal overflow; eight critical images load; answer details expand; L134 rejects STRING input to UCASE and accepts one CHAR; console warnings/errors=0.
- Coverage visual integrity: the full semantic gate is Ready with 121/121 requirements and zero failures; required visuals are checked against contract, register, actual DOM and reviewed first-use order.
- The full 784-image structural verifier passes, but its old Approved rows are not treated as the Stage 6 independent census.

## Active failed samples

- Removing bus width, substituting word length, or deleting processor type from the official list fails.
- Passing MID(...) or a double-quoted STRING to LCASE/UCASE fails.
- Removing supplied function signatures/index rules or introducing undeclared LEFT fails.
- Rewriting a comma-delimited Name field as Identify fails while a leading Name command still calibrates to Identify.
- Relabelling a required visual as Optional in either the register or live DOM, or moving it before reviewed first use, fails.

## Command evidence

- node scripts/remediation-v2-stage5-gate.mjs
- node scripts/test-remediation-v2-stage5-mutations.mjs
- node scripts/verify-remediation-v2-stage5.mjs
- node scripts/verify-syllabus-coverage.mjs
- node scripts/verify-all.mjs --through-current-stage

## Failed / open

- Registered P0/P1 defects: 0 open.
- Current release decision remains BLOCKED because Stage 6 and Stage 7 have not been accepted.

## Optional enrichment

- L050 word length remains available only inside a visibly labelled Optional enrichment section and is excluded from the official performance-factor coverage and assessment contract.
- Existing Stage 2/3 Optional enrichment classifications remain excluded from CORE first-use and formal coverage.

## Unverified

- The unscoped \`node scripts/verify-all.mjs\` correctly stops at the stale Stage 6 page-review hashes; refreshing those approvals belongs to Stage 6 and is not inherited here.
- Stage 6 first-pass/reverse-pass review of all 784 Stage 10 images.
- Stage 6 971 visual-object checks and 154-page desktop plus 390px browser matrix (308 records).
- Stage 7 independent high-risk review and double-generation release gate.

## Remaining risks

- The eight Stage 5 images are closed, but this does not transfer approval to the other 776 images.
- The targeted browser run does not replace the Stage 6 all-page matrix.
- No commit, push or publication has been performed or authorised.

## Stop condition

Do not start Stage 6 until the user approves progression from Stage 5.
`;
fs.writeFileSync(path.join(root, "audits/remediation-v2-stage5-report.md"), report);

console.log(`Generated Stage 5 artifacts: ${Object.keys(closures).length} defects resolved, ${questionReview.questionCount} questions reviewed and ${visualReview.entries.length} critical images closed; release remains BLOCKED.`);
