import { fileURLToPath } from "node:url";

export function evaluateStage7Artifacts({ browserEvidence, independentReview, reproducibility, releaseValidation, defects }) {
  const failures = [];
  const require = (condition, message) => { if (!condition) failures.push(message); };

  require(browserEvidence?.sourceApprovalImported === false, "browser evidence must reject inherited approvals");
  require(browserEvidence?.oldApprovedRowsUsedForDecision === false, "old Approved rows must not contribute to Stage 7");
  require(browserEvidence?.pageCount === 154, "browser evidence must cover 154 pages");
  require(browserEvidence?.viewportRecordCount === 308 && browserEvidence?.records?.length === 308, "browser evidence must contain 308 records");
  require(browserEvidence?.failedRecords === 0, "browser evidence contains failed records");
  const keys = new Set();
  for (const row of browserEvidence?.records ?? []) {
    keys.add(`${row.page}/${row.viewport}`);
    require(row.status === "PassedCurrentBrowser", `${row.page}/${row.viewport}: browser review failed`);
    require(row.sourceHash?.length === 64, `${row.page}/${row.viewport}: current page hash is missing`);
    require(row.semantics?.skipFirst && row.semantics?.mainTarget && row.semantics?.duplicateIds === 0,
      `${row.page}/${row.viewport}: bypass or identity semantics failed`);
    require(row.semantics?.positiveTabindex === 0 && row.semantics?.unnamedControls === 0 && row.semantics?.brokenAria === 0,
      `${row.page}/${row.viewport}: keyboard or ARIA semantics failed`);
    require(row.semantics?.unmarkedHan === 0, `${row.page}/${row.viewport}: unmarked language change found`);
    require(row.layout?.documentOverflow === false && row.layout?.targetFailures === 0,
      `${row.page}/${row.viewport}: overflow or target-size failure found`);
    require(row.media?.brokenImages === 0 && row.media?.emptyVisibleAlt === 0,
      `${row.page}/${row.viewport}: image delivery or alternative text failed`);
    require(row.runtime?.consoleWarningErrorCount === 0 && row.runtime?.frameworkOverlay === false,
      `${row.page}/${row.viewport}: console or framework failure found`);
    require(row.contrast?.failures === 0, `${row.page}/${row.viewport}: contrast failure found`);
  }
  require(keys.size === 308, "browser evidence has duplicate or missing page/viewport keys");
  require(browserEvidence?.keyboard?.status === "PassedSystemKeyboard", "real system keyboard review did not pass");
  require(browserEvidence?.keyboard?.browser === "Google Chrome" && browserEvidence?.keyboard?.driver === "macOS Computer Use",
    "system keyboard provenance is incomplete");
  for (const id of ["skip-link", "course-map", "lesson-contents", "worked-example-tabs", "answer-toggle", "assessment-filter", "assessment-mark-scheme", "resource-disclosure"]) {
    require(browserEvidence?.keyboard?.checks?.some(({ id: checkId, status }) => checkId === id && status === "Pass"), `keyboard check is missing or failed: ${id}`);
  }

  require(independentReview?.sourceApprovalImported === false && independentReview?.oldApprovedRowsUsedForDecision === false,
    "independent review imported an old conclusion");
  require(independentReview?.records?.length === 16, "independent review must re-open all 16 registered P0/P1 issues");
  require(new Set((independentReview?.records ?? []).map(({ defectId }) => defectId)).size === 16, "independent review has duplicate defect IDs");
  for (const row of independentReview?.records ?? []) {
    require(row.status === "PassedCurrentSource", `${row.defectId}: independent current-source review failed`);
    require(row.reviewer === "Codex independent final gate" && row.reviewRound === "remediation-v2-stage7-r1", `${row.defectId}: reviewer or round is invalid`);
    require(row.commandExitCode === 0 && row.commandOutputSha256?.length === 64, `${row.defectId}: live command evidence is missing`);
    require(row.sourceHashes && Object.values(row.sourceHashes).every((hash) => hash.length === 64), `${row.defectId}: current source hashes are missing`);
  }

  require(reproducibility?.destructiveBootstrapGeneratorExcluded === true, "destructive bootstrap generator was not explicitly excluded");
  require(reproducibility?.passes === 2 && reproducibility?.secondRunChangedFiles === 0, "two-pass generation did not produce a zero incremental diff");
  require(reproducibility?.pass1ManifestSha256 === reproducibility?.pass2ManifestSha256, "generation manifests differ");
  require(reproducibility?.gitDiffNoIndexExitCode === 0, "git diff of the two full manifests was non-zero");
  require(reproducibility?.commands?.length >= 18 && !(reproducibility?.commands ?? []).some((command) => command.includes("tools/generate_course.py")),
    "safe complete generation chain is incomplete");

  require(releaseValidation?.status === "PassedCurrentSource", "release inventory/package validation did not pass");
  require(releaseValidation?.inventoryRows > 0 && releaseValidation?.commandExitCode === 0, "release validation evidence is incomplete");
  const open = (defects?.issues ?? []).filter(({ severity, status }) => ["P0", "P1"].includes(severity) && status !== "Resolved");
  require(open.length === 0, "registered P0/P1 defects remain open");
  require((defects?.issues ?? []).every(({ status }) => !["Unknown", "Pending"].includes(status)), "defect register contains Unknown or Pending status");

  return { status: failures.length ? "Blocked" : "Ready", failures };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log("Stage 7 gate module loaded. Use verify-remediation-v2-stage7.mjs for current artifacts.");
}
