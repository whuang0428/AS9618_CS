import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nodeChecks = [
  "verify-student-navigation.mjs",
  "verify-educational-visuals.mjs",
  "verify-stage2.mjs",
  "verify-assessments.mjs",
  "verify-lesson-mark-schemes.mjs",
  "verify-stage5-mark-schemes.mjs",
  "verify-stage6-qa.mjs",
  "verify-stage7-accessibility.mjs",
];

for (const script of nodeChecks) {
  console.log(`\n[verify-all] ${script}`);
  execFileSync(process.execPath, [path.join(root, "scripts", script)], { cwd: root, stdio: "inherit" });
}

console.log("\n[verify-all] build-stage8-release.py");
execFileSync("python3", [path.join(root, "scripts", "build-stage8-release.py")], { cwd: root, stdio: "inherit" });

console.log("\n[verify-all] verify-stage8-release.mjs");
execFileSync(process.execPath, [path.join(root, "scripts", "verify-stage8-release.mjs")], { cwd: root, stdio: "inherit" });

console.log("\nAll Stage 2-8 verification and final release checks passed.");
