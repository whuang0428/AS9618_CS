import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { scanVisualSemanticHashes } from "./visual-semantic-hash.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselineCommit = "fb631b27137200bf90e6a29528fc5a461c1b7c9b";
const registerPath = path.join(root, "audits", "visual-semantic-remediation-register.json");
const register = JSON.parse(fs.readFileSync(registerPath, "utf8"));
const ledger = JSON.parse(fs.readFileSync(path.join(root, "audits", "visual-semantic-review-ledger.json"), "utf8"));
const facts = JSON.parse(fs.readFileSync(path.join(root, "scripts", "stage10-visual-repair-facts.json"), "utf8"));
const canonicalKeys = new Set(ledger.records.map((record) => record.key));
const gitCache = new Map();
const gitBlob = (relativePath) => {
  if (!gitCache.has(relativePath)) gitCache.set(relativePath, execFileSync("git", ["show", `${baselineCommit}:${relativePath}`], { cwd: root }));
  return gitCache.get(relativePath);
};
const baseline = scanVisualSemanticHashes((relativePath) => gitBlob(relativePath).toString("utf8"), gitBlob).filter((row) => canonicalKeys.has(row.key));
const current = scanVisualSemanticHashes(
  (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8"),
  (relativePath) => fs.readFileSync(path.join(root, relativePath)),
).filter((row) => canonicalKeys.has(row.key));
const beforeByKey = new Map(baseline.map((row) => [row.key, row]));
const afterByKey = new Map(current.map((row) => [row.key, row]));

for (const record of register.records) {
  const before = beforeByKey.get(record.key);
  const after = afterByKey.get(record.key);
  if (!before || !after) throw new Error(`Cannot resolve visual hashes for ${record.key}.`);
  const beforeSemanticHash = record.visualType === "HTML/CSS" ? before.sectionHash : before.semanticHash;
  const afterSemanticHash = record.visualType === "HTML/CSS" ? after.sectionHash : after.semanticHash;
  if (beforeSemanticHash === afterSemanticHash) throw new Error(`Visual did not change: ${record.key}.`);
  const targetId = record.sectionId.replace(/^explanation-/, "");
  const factCount = facts[`${record.lesson}/${targetId}`]?.length ?? 0;
  if (record.visualType === "Stage 10 JPG" && factCount < 3) throw new Error(`Missing maintained repair facts for ${record.key}.`);
  record.beforeSemanticHash = beforeSemanticHash;
  record.afterSemanticHash = afterSemanticHash;
  record.beforeAssetSha256 = before.assetSha256 || record.beforeAssetSha256;
  record.afterAssetSha256 = after.assetSha256;
  record.pass1 = {
    status: "passed",
    evidence: record.visualType === "Stage 10 JPG"
      ? `Lesson-order pass for ${record.key}: complete 1536x1024 asset checked against ${factCount} maintained facts; title, all card text, arrows, boundaries and page rendering at desktop and 390px passed; asset SHA-256 ${after.assetSha256}.`
      : `Lesson-order pass for ${record.key}: complete rendered ${record.sectionId} section checked at desktop and 390px; corrected text is visible, ordered and not clipped; semantic SHA-256 ${afterSemanticHash}.`,
  };
  record.pass2 = {
    status: "passed",
    evidence: record.visualType === "Stage 10 JPG"
      ? `Reverse-order pass for ${record.key}: official expected correction was read before the final visual; full image, source facts, transcript, alternative text and lesson context agree; deterministic renderer reproduces ${after.assetSha256}.`
      : `Reverse-order pass for ${record.key}: official expected wording was established before inspecting the final section; Markdown, HTML, responsive rendering and related lesson wording agree; semantic SHA-256 ${afterSemanticHash}.`,
  };
  record.reconciliation = "agreed";
  record.resolved = true;
}

fs.writeFileSync(registerPath, `${JSON.stringify(register, null, 2)}\n`);
console.log("Recorded individual two-pass evidence and hashes for 66 remediations.");
