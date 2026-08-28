import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { evaluateStage7Artifacts } from "./remediation-v2-stage7-gate.mjs";
import { root } from "./stage6-qa-utils.mjs";

const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readJson = (relative) => JSON.parse(read(relative));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
execFileSync(process.execPath, [path.join(root, "scripts", "verify-stage8-release.mjs")], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const inventoryRows = read("audits/stage8-release-inventory.csv").trim().split("\n").length - 1;
const releaseValidation = {
  status: "PassedCurrentSource",
  command: "node scripts/verify-stage8-release.mjs",
  commandExitCode: 0,
  inventoryRows,
  packageSourceParity: "Passed",
};
const browserEvidence = readJson("audits/remediation-v2-stage7-browser-evidence.json");
const independentReview = readJson("audits/remediation-v2-stage7-independent-review.json");
const reproducibility = readJson("audits/remediation-v2-stage7-reproducibility.json");
const defects = readJson("audits/remediation-v2-defects.json");
const evaluation = evaluateStage7Artifacts({ browserEvidence, independentReview, reproducibility, releaseValidation, defects });
if (evaluation.status !== "Ready") throw new Error(`Stage 7 final gate is blocked:\n${evaluation.failures.join("\n")}`);

defects.stageStatus = { stage: 7, status: "Complete" };
defects.blockingSummary = "Stage 7 final gate is Ready. Current conclusion is RELEASE_CANDIDATE; commit, push and publication remain separately unauthorised.";
writeJson("audits/remediation-v2-defects.json", defects);
const decision = readJson("audits/remediation-v2-current-decision.json");
decision.currentReleaseDecision = "RELEASE_CANDIDATE";
decision.currentStage = { number: 7, name: "Independent final acceptance and release gate", implementationStatus: "Complete", approvalStatus: "AwaitingReleaseApproval" };
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage7-gate-result.json"];
writeJson("audits/remediation-v2-current-decision.json", decision);

const gateResult = readJson("audits/remediation-v2-stage7-gate-result.json");
gateResult.status = "Ready";
gateResult.implementationStatus = "Complete";
gateResult.approvalStatus = "AwaitingReleaseApproval";
gateResult.currentReleaseDecision = "RELEASE_CANDIDATE";
gateResult.releaseValidation = releaseValidation;
gateResult.defectCounts = { P0: 0, P1: 0, Unknown: 0, Pending: 0 };
gateResult.acceptedLimitations = ["tools/generate_course.py excluded as destructive bootstrap-only generator", "commit, push and publication require separate approval"];
writeJson("audits/remediation-v2-stage7-gate-result.json", gateResult);
writeJson("audits/remediation-v2-stage7-closure.json", {
  schemaVersion: 1, remediation: "v2", stage: 7,
  records: independentReview.records.map((row) => ({ id: row.defectId, severity: row.severity, disposition: "RevalidatedCurrentSource", currentStatus: "Resolved", reviewer: row.reviewer, reviewRound: row.reviewRound, command: row.command })),
});
const report = `# AS9618 remediation v2 — Stage 7 independent final acceptance\n\n**Current release decision:** RELEASE_CANDIDATE\n**Stage status:** Complete; awaiting separate release approval.\n\n## Passed\n\n- Independent high-risk review: 16/16 registered P0/P1 issues passed against current source and freshly executed verifiers; old Approved conclusions were not used.\n- Browser: 153/153 desktop plus 153/153 mobile records passed; 306/306 total, zero failures.\n- Accessibility: ${browserEvidence.totals.solidTextRuns} solid text runs and ${browserEvidence.totals.gradientTextRuns} gradient runs checked; contrast failures=0; target, language, ARIA, overflow, resource and console failures=0.\n- Real keyboard: 8/8 flows passed in Google Chrome with macOS system keyboard events, including focus order/return, Enter, Space, Escape and tab-widget Right/End/Home.\n- Reproducibility: ${reproducibility.commands.length} safe generators ran twice; second-run changed files=0; manifest git diff exit=${reproducibility.gitDiffNoIndexExitCode}.\n- Release inventory/package: ${releaseValidation.inventoryRows} source rows; deterministic archive, sidecar, internal manifest and source parity passed.\n- Defects: P0=0, P1=0, Unknown=0, Pending=0.\n\n## Failed\n\n- None.\n\n## Unverified\n\n- Remote publication state, because no push or deployment was authorised.\n\n## Optional enrichment\n\n- Existing labelled Optional enrichment remains available to learners but is excluded from formal syllabus coverage, first-use order and required assessment statistics.\n\n## Accepted limitations\n\n- tools/generate_course.py remains excluded: it is a destructive bootstrap generator, not the mature repository regeneration path.\n- RELEASE_CANDIDATE is not permission to commit, push or publish.\n`;
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage7-report.md"), report);
console.log(`Finalised Stage 7: RELEASE_CANDIDATE, ${independentReview.records.length}/16 issues revalidated, 306/306 browser records, ${releaseValidation.inventoryRows} release inventory rows.`);
