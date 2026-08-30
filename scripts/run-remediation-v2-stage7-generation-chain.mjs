import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root } from "./stage6-qa-utils.mjs";

const commands = [
  "apply-stage2-repairs.mjs",
  "apply-remediation-v2-optional-enrichment.mjs",
  "apply-remediation-v2-stage3-sequence.mjs",
  "apply-remediation-v2-stage3-question-repairs.mjs",
  "generate-assessments.mjs",
  "normalise-stage5-lesson-ms.mjs",
  "apply-cie-wording.mjs",
  "generate-remediation-v2-stage3-question-sequence.mjs",
  "generate-cie-wording-register.mjs",
  "apply-student-navigation.mjs",
  "apply-stage10-explanations.mjs",
  "apply-classroom-delivery.mjs",
  "generate-course-catalog.mjs",
  "generate-resource-hub.mjs",
  "generate-stage10-audits.mjs",
  "generate-syllabus-audit.mjs",
  "generate-curriculum-sequence-audit.mjs",
  "generate-question-ao-contract.mjs",
  "repair-remediation-v2-audit-integrity.mjs",
  "finalise-remediation-v2-audit-integrity-review.mjs",
  "generate-remediation-v2-audit-integrity.mjs",
  "refresh-remediation-v2-audit-integrity-surface-reviews.mjs",
  "generate-remediation-v2-stage4.mjs",
  "generate-stage6-page-review-register.mjs",
  "generate-remediation-v2-stage6.mjs",
];
const excludedDirectoryNames = new Set([".git", "dist", "__pycache__"]);
const excludedFiles = new Set(["audits/remediation-v2-stage7-reproducibility.json"]);
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");

function filesUnder(directory) {
  const output = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excludedDirectoryNames.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    const relative = path.relative(root, absolute).split(path.sep).join("/");
    if (excludedFiles.has(relative)) continue;
    if (entry.isDirectory()) output.push(...filesUnder(absolute));
    else if (entry.isFile()) output.push(relative);
  }
  return output;
}

function manifest() {
  return filesUnder(root).sort().map((relative) => `${digest(fs.readFileSync(path.join(root, relative)))}  ${relative}`).join("\n") + "\n";
}

function runPass(number) {
  const outputs = [];
  for (const script of commands) {
    const stdout = execFileSync(process.execPath, [path.join(root, "scripts", script)], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    outputs.push({ command: `node scripts/${script}`, outputSha256: digest(stdout) });
    console.log(`[stage7 generation pass ${number}] ${script}`);
  }
  return outputs;
}

const pass1Outputs = runPass(1);
const pass1 = manifest();
const pass2Outputs = runPass(2);
const pass2 = manifest();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "as9618-stage7-generation-"));
const pass1Path = path.join(temp, "pass1.sha256");
const pass2Path = path.join(temp, "pass2.sha256");
fs.writeFileSync(pass1Path, pass1);
fs.writeFileSync(pass2Path, pass2);
let gitDiffNoIndexExitCode = 0;
try {
  execFileSync("git", ["diff", "--no-index", "--exit-code", pass1Path, pass2Path], { cwd: root, stdio: "pipe" });
} catch (error) {
  gitDiffNoIndexExitCode = error.status ?? 1;
}
const first = new Map(pass1.trim().split("\n").map((line) => [line.slice(66), line.slice(0, 64)]));
const second = new Map(pass2.trim().split("\n").map((line) => [line.slice(66), line.slice(0, 64)]));
const changed = [...new Set([...first.keys(), ...second.keys()])].filter((name) => first.get(name) !== second.get(name)).sort();
const result = {
  schemaVersion: 1, remediation: "v2", stage: 7, generatedDate: "2026-08-29",
  scope: "Two consecutive runs of the complete safe mature-repository generation chain; all repository files except .git, dist, __pycache__ and this self-referential result are hashed.",
  destructiveBootstrapGeneratorExcluded: true,
  excludedGenerator: "python3 tools/generate_course.py",
  exclusionReason: "The bootstrap generator deletes mature lesson Markdown and overwrites reviewed root artifacts; it is not a valid regeneration path for this repository.",
  passes: 2,
  commands: commands.map((script) => `node scripts/${script}`),
  pass1CommandOutputs: pass1Outputs,
  pass2CommandOutputs: pass2Outputs,
  pass1ManifestSha256: digest(pass1),
  pass2ManifestSha256: digest(pass2),
  manifestFileCount: first.size,
  secondRunChangedFiles: changed.length,
  changedFiles: changed,
  gitDiffCommand: "git diff --no-index --exit-code <pass1 SHA-256 manifest> <pass2 SHA-256 manifest>",
  gitDiffNoIndexExitCode,
};
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage7-reproducibility.json"), `${JSON.stringify(result, null, 2)}\n`);
if (changed.length || gitDiffNoIndexExitCode !== 0) throw new Error(`Second generation run changed ${changed.length} files: ${changed.slice(0, 20).join(", ")}`);
console.log(`Stage 7 reproducibility passed: ${commands.length} generators x 2, ${first.size} files, second-run git diff zero.`);
