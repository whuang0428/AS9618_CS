import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nodeChecks = [
  "generate-course-v2-coverage.mjs",
  "verify-course-v2.mjs",
];

for (const script of nodeChecks) {
  console.log(`\n[verify-all] ${script}`);
  execFileSync(process.execPath, [path.join(root, "scripts", script)], { cwd: root, stdio: "inherit" });
}

const python = process.env.PYTHON ?? "python3";
for (const script of ["build-course-v2-release.py", "verify-course-v2-release.py"]) {
  console.log(`\n[verify-all] ${script}`);
  execFileSync(python, [path.join(root, "scripts", script)], { cwd: root, stdio: "inherit" });
}

console.log("\nAll active 90-lesson course checks and the V2 release build passed.");
