import path from "node:path";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const throughCurrentStage = process.argv.includes("--through-current-stage");
const currentDecision = JSON.parse(fs.readFileSync(path.join(root, "audits", "remediation-v2-current-decision.json"), "utf8"));
const currentStage = currentDecision.currentStage?.number ?? 0;
const nodeChecks = [
  "verify-remediation-v2-current-decision.mjs",
  "verify-remediation-v2-audit-integrity.mjs",
  "test-remediation-v2-stage1-mutations.mjs",
  "verify-remediation-v2-stage2.mjs",
  "test-remediation-v2-stage2-mutations.mjs",
  "verify-remediation-v2-stage3.mjs",
  "test-remediation-v2-stage3-mutations.mjs",
  "verify-remediation-v2-stage4.mjs",
  "test-remediation-v2-stage4-mutations.mjs",
  "verify-remediation-v2-stage5.mjs",
  "test-remediation-v2-stage5-mutations.mjs",
  "verify-remediation-v2-stage6.mjs",
  "test-remediation-v2-stage6-mutations.mjs",
  "verify-remediation-v2-stage7.mjs",
  "test-remediation-v2-stage7-mutations.mjs",
  "verify-cie-wording.mjs",
  "verify-academic-theme.mjs",
  "verify-student-navigation.mjs",
  "verify-educational-visuals.mjs",
  "verify-visual-semantic-remediation.mjs",
  "verify-stage2.mjs",
  "verify-batch1-core-content.mjs",
  "verify-batch2-technical-visuals.mjs",
  "verify-batch3-curriculum-sequence.mjs",
  "verify-batch4-core-completeness.mjs",
  "verify-batch5-reviewed-coverage.mjs",
  "verify-batch6-section1-foundations.mjs",
  "verify-batch7-section2-communication.mjs",
  "verify-batch8-section3-hardware.mjs",
  "verify-batch9-section4-processor.mjs",
  "verify-batch10-section5-system-software.mjs",
  "verify-batch11-section6-security-data-integrity.mjs",
  "verify-batch12-section7-ethics-ownership.mjs",
  "verify-batch13-section8-databases.mjs",
  "verify-batch14-section9-algorithm-design.mjs",
  "verify-batch15-section10-data-structures.mjs",
  "verify-batch16-section11-programming.mjs",
  "verify-batch17-section12-software-development.mjs",
  "verify-batch18-scientific-closure.mjs",
  "verify-question-ao-contract.mjs",
  "verify-scientific-audit.mjs",
  "verify-syllabus-coverage.mjs",
  "test-syllabus-gate-mutations.mjs",
  "verify-curriculum-sequence.mjs",
  "verify-assessments.mjs",
  "verify-lesson-mark-schemes.mjs",
  "verify-stage5-mark-schemes.mjs",
  "verify-stage6-qa.mjs",
  "verify-stage7-accessibility.mjs",
  "verify-stage9-classroom.mjs",
  "verify-stage10.mjs",
];

for (const script of nodeChecks) {
  if (throughCurrentStage && ["verify-remediation-v2-stage6.mjs", "test-remediation-v2-stage6-mutations.mjs"].includes(script) && currentStage < 6) {
    console.log(`\n[verify-all] ${script} — skipped until remediation Stage 6`);
    continue;
  }
  if (throughCurrentStage && script === "verify-stage6-qa.mjs" && currentStage < 6) {
    console.log(`\n[verify-all] ${script} — skipped until remediation Stage 6`);
    continue;
  }
  if (throughCurrentStage && script === "verify-stage7-accessibility.mjs" && currentStage < 7) {
    console.log(`\n[verify-all] ${script} — skipped until remediation Stage 7`);
    continue;
  }
  if (throughCurrentStage && ["verify-remediation-v2-stage7.mjs", "test-remediation-v2-stage7-mutations.mjs"].includes(script) && currentStage < 7) {
    console.log(`\n[verify-all] ${script} — skipped until remediation Stage 7`);
    continue;
  }
  console.log(`\n[verify-all] ${script}`);
  execFileSync(process.execPath, [path.join(root, "scripts", script)], { cwd: root, stdio: "inherit" });
}

if (!throughCurrentStage || currentStage >= 7) {
  console.log("\n[verify-all] build-stage8-release.py");
  execFileSync("python3", [path.join(root, "scripts", "build-stage8-release.py")], { cwd: root, stdio: "inherit" });

  console.log("\n[verify-all] verify-stage8-release.mjs");
  execFileSync(process.execPath, [path.join(root, "scripts", "verify-stage8-release.mjs")], { cwd: root, stdio: "inherit" });
} else {
  console.log("\n[verify-all] Stage 8 release inventory — skipped until remediation Stage 7");
}

const finalStageReached = currentDecision.currentStage?.number >= 7;
if (finalStageReached && currentDecision.currentReleaseDecision !== "RELEASE_CANDIDATE") throw new Error(`Stage 7 or later is current, but the sole release decision is ${currentDecision.currentReleaseDecision}.`);
if (!finalStageReached && currentDecision.currentReleaseDecision !== "BLOCKED") throw new Error(`Stage ${currentDecision.currentStage?.number ?? "unknown"} is current, but the sole release decision is not BLOCKED.`);
console.log(`\nAll executable checks passed; the current staged decision is ${currentDecision.currentReleaseDecision} at Stage ${currentDecision.currentStage?.number}.`);
