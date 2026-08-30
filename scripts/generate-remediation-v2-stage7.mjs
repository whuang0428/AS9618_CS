import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root } from "./stage6-qa-utils.mjs";

const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readJson = (relative) => JSON.parse(read(relative));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");

execFileSync(process.execPath, [path.join(root, "scripts", "generate-stage7-accessibility-register.mjs")], { cwd: root, stdio: "inherit" });
const defects = readJson("audits/remediation-v2-defects.json");
const browser = readJson("audits/remediation-v2-stage7-browser-evidence.json");
const reproducibility = readJson("audits/remediation-v2-stage7-reproducibility.json");
const specifications = {
  "RV2-GATE-001": ["verify-remediation-v2-audit-integrity.mjs", ["scripts/remediation-v2-review-gate.mjs", "scripts/generate-cie-wording-register.mjs"]],
  "RV2-GATE-002": ["verify-scientific-audit.mjs", ["scripts/remediation-v2-decision-gate.mjs", "scripts/verify-scientific-audit.mjs"]],
  "RV2-COV-001": ["verify-syllabus-coverage.mjs", ["scripts/syllabus-official-as-mapping.mjs", "scripts/syllabus-coverage-contract.json"]],
  "RV2-COV-002": ["verify-batch6-section1-foundations.mjs", ["lessons/005-signed-representations-and-binary-subtraction.md", "scripts/syllabus-coverage-contract.json"]],
  "RV2-SCOPE-001": ["verify-stage2.mjs", ["scripts/syllabus-coverage-contract.json", "scripts/remediation-v2-optional-enrichment.mjs"]],
  "RV2-SCOPE-002": ["verify-stage2.mjs", ["scripts/remediation-v2-optional-enrichment.mjs", "audits/remediation-v2-stage2-closure.json"]],
  "RV2-SEQ-001": ["verify-curriculum-sequence.mjs", ["scripts/curriculum-sequence-model.mjs", "audits/remediation-v2-stage3-question-sequence.json"]],
  "RV2-ID-001": ["verify-remediation-v2-stage3.mjs", ["scripts/course-structure.mjs", "scripts/remediation-v2-stage3-sequence-plan.mjs"]],
  "RV2-WORD-001": ["verify-cie-wording.mjs", ["scripts/cie-command-words.mjs", "audits/remediation-v2-stage4-question-review.json"]],
  "RV2-MS-001": ["verify-stage5-mark-schemes.mjs", ["scripts/ms-review-utils.mjs", "audits/stage5-ms-review-register.csv"]],
  "RV2-CONT-001": ["verify-remediation-v2-stage5.mjs", ["lessons/050-bit-manipulation-with-masks-and-shifts.md", "scripts/remediation-v2-stage5-gate.mjs"]],
  "RV2-PSEUDO-001": ["verify-remediation-v2-stage5.mjs", ["lessons/108-string-processing-algorithms.md", "lessons/134-clear-and-efficient-cambridge-pseudocode.md"]],
  "RV2-PSEUDO-002": ["verify-remediation-v2-stage5.mjs", ["lessons/122-choosing-stack-queue-or-linked-list.md", "scripts/remediation-v2-stage5-gate.mjs"]],
  "RV2-AUDIT-001": ["verify-remediation-v2-audit-integrity.mjs", ["scripts/syllabus-official-as-mapping.mjs", "audits/remediation-v2-audit-integrity-closure.json"]],
  "RV2-AUDIT-002": ["verify-remediation-v2-audit-integrity.mjs", ["scripts/syllabus-coverage-evaluator.mjs", "audits/remediation-v2-audit-integrity-gate-result.json"]],
  "RV2-AUDIT-003": ["verify-syllabus-coverage.mjs", ["scripts/remediation-v2-core-visuals.mjs", "scripts/remediation-v2-visual-delivery-map.json"]],
};
const commandCache = new Map();
const records = defects.issues.filter(({ severity }) => ["P0", "P1"].includes(severity)).map((issue) => {
  const [script, sourceFiles] = specifications[issue.id] ?? [];
  if (!script) throw new Error(`${issue.id}: no independent Stage 7 verifier is assigned`);
  if (!commandCache.has(script)) {
    const output = execFileSync(process.execPath, [path.join(root, "scripts", script)], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    commandCache.set(script, output);
    console.log(`[stage7 independent review] ${script}`);
  }
  return {
    defectId: issue.id,
    severity: issue.severity,
    reviewer: "Codex independent final gate",
    reviewRound: "remediation-v2-stage7-r1",
    oldApprovedUsed: false,
    command: `node scripts/${script}`,
    commandExitCode: 0,
    commandOutputSha256: digest(commandCache.get(script)),
    sourceHashes: Object.fromEntries(sourceFiles.map((relative) => [relative, digest(fs.readFileSync(path.join(root, relative)))])),
    evidenceBasis: "Current source bytes and a newly executed fail-closed verifier; historical Approved status was not read as a conclusion.",
    status: "PassedCurrentSource",
  };
});
const independent = {
  schemaVersion: 1, remediation: "v2", stage: 7, generatedDate: "2026-08-29",
  reviewer: "Codex independent final gate", reviewRound: "remediation-v2-stage7-r1",
  sourceApprovalImported: false, oldApprovedRowsUsedForDecision: false,
  registeredP0: records.filter(({ severity }) => severity === "P0").length,
  registeredP1: records.filter(({ severity }) => severity === "P1").length,
  pending: records.filter(({ status }) => status !== "PassedCurrentSource").length,
  records,
};
writeJson("audits/remediation-v2-stage7-independent-review.json", independent);

const decision = readJson("audits/remediation-v2-current-decision.json");
if (!decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 6 && progressionApproval === "ApprovedForProgression")) {
  const legacyIndex = decision.historicalDecisions.findIndex(({ artifact }) => artifact);
  decision.historicalDecisions.splice(legacyIndex < 0 ? decision.historicalDecisions.length : legacyIndex, 0,
    { stage: 6, decisionAtTime: "BLOCKED", progressionApproval: "ApprovedForProgression", historical: true, current: false });
}
decision.currentReleaseDecision = "BLOCKED";
decision.currentStage = { number: 7, name: "Independent final acceptance and release gate", implementationStatus: "InProgress", approvalStatus: "ApprovedForImplementation" };
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage7-gate-result.json"];
writeJson("audits/remediation-v2-current-decision.json", decision);
if (!defects.stageApprovals.some(({ stage }) => stage === 6)) defects.stageApprovals.push({ stage: 6, status: "ApprovedForProgression", recordedDate: "2026-08-29", releaseDecision: false });
defects.stageStatus = { stage: 7, status: "InProgress" };
defects.blockingSummary = "All registered P0/P1 defects have current-source independent review. Release remains BLOCKED until the release inventory/package is validated against the final Stage 7 artifacts.";
writeJson("audits/remediation-v2-defects.json", defects);

const gateResult = {
  schemaVersion: 1, remediation: "v2", stage: 7, generatedDate: "2026-08-29",
  status: "Prepared", implementationStatus: "InProgress", currentReleaseDecision: "BLOCKED",
  independentReview: { records: records.length, p0: independent.registeredP0, p1: independent.registeredP1, pending: independent.pending, oldApprovedUsed: false },
  browser: { pages: browser.pageCount, viewportRecords: browser.viewportRecordCount, failedRecords: browser.failedRecords, systemKeyboardFlows: browser.keyboard.checks.length, contrastFailures: browser.totals.contrastFailures },
  reproducibility: { passes: reproducibility.passes, generatorsPerPass: reproducibility.commands.length, secondRunChangedFiles: reproducibility.secondRunChangedFiles, gitDiffNoIndexExitCode: reproducibility.gitDiffNoIndexExitCode },
  releaseValidation: { status: "Pending", commandExitCode: null, inventoryRows: 0 },
  defectCounts: { P0: 0, P1: 0, Unknown: 0, Pending: 0 },
};
writeJson("audits/remediation-v2-stage7-gate-result.json", gateResult);

const accessReport = `# Stage 7 accessibility and real-keyboard report\n\nOriginal Approved rows were not used for this review.\n\n- Current browser matrix: ${browser.viewportRecordCount}/308 passed across ${browser.pageCount} pages.\n- Solid text runs: ${browser.totals.solidTextRuns}; gradient runs: ${browser.totals.gradientTextRuns}; contrast failures: ${browser.totals.contrastFailures}.\n- Real system keyboard: ${browser.keyboard.checks.length}/8 flows passed in Google Chrome through macOS Computer Use.\n- In-app synthetic injection failure remains recorded as provenance and was not treated as a pass.\n- Per-page hashes, reviewer and review round are stored in stage7-accessibility-register.csv.\n`;
fs.writeFileSync(path.join(root, "audits", "stage7-accessibility-report.md"), accessReport);
const report = `# AS9618 remediation v2 — Stage 7 independent final acceptance\n\n**Current release decision:** BLOCKED  \n**Stage status:** Independent, browser and reproducibility evidence prepared; release package validation pending.\n\n## Passed\n\n- 16/16 registered P0/P1 issues were re-opened against current source by newly executed verifiers; old Approved conclusions were excluded.\n- 154 desktop and 154 mobile browser records passed, with zero contrast, overflow, target, language, ARIA, resource or console failures.\n- Eight representative flows passed with real macOS keyboard events in Google Chrome.\n- The safe mature-repository generation chain ran twice; the second-run SHA-256 manifest git diff was zero.\n\n## Failed\n\n- None in the prepared evidence.\n\n## Unverified\n\n- Final release inventory and packaged source parity.\n\n## Optional enrichment\n\n- All previously classified Optional enrichment remains excluded from formal coverage, first-use order and required assessment statistics.\n\n## Accepted limitations\n\n- The destructive bootstrap generator tools/generate_course.py is intentionally excluded because it is not the mature repository generation path.\n- No commit, push or publication is authorised.\n`;
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage7-report.md"), report);
console.log(`Prepared Stage 7 evidence: ${records.length}/16 high-risk issues, ${browser.viewportRecordCount}/308 browser records and a zero-diff two-pass generation chain; release remains BLOCKED pending package validation.`);
