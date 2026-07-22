import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { root } from "./stage6-qa-utils.mjs";

function fail(message) {
  throw new Error(message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

const metadataPath = path.join(root, "release", "stage8-release.json");
expect(fs.existsSync(metadataPath), "Stage 8 release metadata is missing");
const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
expect(metadata.version === "1.0.0", "Stage 8 release version must be 1.0.0");
expect(metadata.stage === 8 && metadata.status === "final", "Stage 8 metadata is not final");
expect(metadata.counts.lessons === 150 && metadata.counts.webPages === 153 && metadata.counts.assessments === 51,
  "Stage 8 release counts are invalid");

const archivePath = path.join(root, "dist", metadata.archiveName);
expect(fs.existsSync(archivePath), `Stage 8 archive is missing: ${metadata.archiveName}`);
expect(fs.existsSync(`${archivePath}.sha256`), "Stage 8 archive checksum is missing");
expect(fs.existsSync(path.join(root, "audits", "stage8-release-inventory.csv")), "Stage 8 inventory is missing");
expect(fs.existsSync(path.join(root, "audits", "stage8-release-report.md")), "Stage 8 report is missing");
expect(fs.readFileSync(path.join(root, ".gitignore"), "utf8").split("\n").includes("dist/"),
  "Generated release archives must remain ignored");

execFileSync("python3", [
  path.join(root, "scripts", "verify-stage8-package.py"),
  archivePath,
  "--source-root",
  root,
], { stdio: "inherit" });

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
expect(readme.includes("node scripts/verify-all.mjs"), "README is missing the unified verifier command");
expect(readme.includes(metadata.archiveName), "README is missing the final archive name");

console.log(`Stage 8 release verification passed: ${metadata.archiveName} is complete, deterministic, checksummed and source-matched.`);
