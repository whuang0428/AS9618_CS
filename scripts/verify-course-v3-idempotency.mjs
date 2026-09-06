import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const targets = [
  join(root, "web", "assets", "course-v3", "section-4"),
  join(root, "web", "course-v3"),
  join(root, "web", "assets", "course-v3", "section-6"),
  join(root, "web", "index.html"),
  join(root, "web", "assessments", "index.html"),
  join(root, "assessments", "assessment-bank.md"),
  ...Array.from({ length: 151 }, (_, index) => join(root, "web", `lesson-${String(index + 1).padStart(3, "0")}`)),
  join(root, "scripts", "course-v3-contract.json"),
];

function files(path) {
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => files(join(path, entry.name)));
}

function digest() {
  const hash = createHash("sha256");
  for (const path of targets.flatMap(files).sort()) {
    hash.update(relative(root, path));
    hash.update("\0");
    hash.update(readFileSync(path));
    hash.update("\0");
  }
  return hash.digest("hex");
}

const before = digest();
execFileSync(process.execPath, [join(root, "scripts", "render-course-v3.mjs")], { cwd: root, stdio: "inherit" });
const after = digest();
if (before !== after) {
  console.error(`Course V3 generation is not idempotent:\n- before ${before}\n- after  ${after}`);
  process.exit(1);
}
console.log(`Course V3 generation idempotency verified: ${after}`);
