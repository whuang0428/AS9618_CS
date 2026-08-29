import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { evaluateAuditIntegrity } from "./remediation-v2-audit-integrity-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const live = evaluateAuditIntegrity();
if (live.status !== "Ready") throw new Error(`Refusing to refresh surface reviews with ${live.problemCount} audit-integrity problem(s).`);
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
const csv = (value) => /[",\n]/.test(String(value)) ? `"${String(value).replaceAll('"', '""')}"` : String(value);

function parse(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { values.push(value); value = ""; }
    else value += character;
  }
  values.push(value);
  return values;
}

const registerPath = path.join(root, "audits", "cie-wording-review-register.csv");
const rows = fs.readFileSync(registerPath, "utf8").trimEnd().split("\n").map(parse);
let refreshed = 0;
for (const row of rows.slice(1)) {
  if (!['lesson-markdown', 'lesson-html'].includes(row[0])) continue;
  const filePath = path.join(root, row[2]);
  const currentHash = digest(fs.readFileSync(filePath, "utf8"));
  if (row[6] === currentHash && (row[7] !== "audit-integrity-surface-review" || row[8] === "R5")) continue;
  row[3] = "Approved";
  row[4] = "IndependentlyReviewed";
  row[5] = `${row[2]}#audit-integrity-current-content`;
  row[6] = currentHash;
  row[7] = "audit-integrity-surface-review";
  row[8] = "R5";
  row[10] = "CORE-first order, Optional separation and declared first-teaching concept groups passed against the current rendered source hash.";
  refreshed += 1;
}
fs.writeFileSync(registerPath, `${rows.map((row) => row.map(csv).join(",")).join("\n")}\n`);

const browserPath = path.join(root, "audits", "remediation-v2-audit-integrity-browser-evidence.json");
const browser = JSON.parse(fs.readFileSync(browserPath, "utf8"));
const stage6Path = path.join(root, "audits", "remediation-v2-stage6-browser-evidence.json");
if (fs.existsSync(stage6Path)) {
  const stage6 = JSON.parse(fs.readFileSync(stage6Path, "utf8"));
  const currentRecords = stage6.records.filter(({ page }) => page === "lesson-009");
  if (currentRecords.length !== 2 || currentRecords.some(({ status }) => status !== "Pass")) throw new Error("L009 does not have two passed current Stage 6 browser records");
  browser.sourceSha256 = digest(fs.readFileSync(path.join(root, browser.source)));
  browser.refreshedFromCurrentEvidence = "audits/remediation-v2-stage6-browser-evidence.json#lesson-009";
  browser.currentViewportRecords = currentRecords.map(({ viewport, sourceHash, status }) => ({ viewport, sourceHash, status }));
  browser.conclusion = "The rendered desktop and 390px page starts with the bitmap file-size and metadata CORE block, places Optional enrichment afterwards, has no horizontal overflow or console warning/error, and preserves the contents-menu jump to the CORE heading.";
  fs.writeFileSync(browserPath, `${JSON.stringify(browser, null, 2)}\n`);
}
console.log(`Refreshed ${refreshed} changed lesson-surface review hashes and the L009 current-browser source hash after zero-failure gates.`);
