import fs from "node:fs";
import path from "node:path";

import { evaluateStage6Artifacts } from "./remediation-v2-stage6-gate.mjs";
import { root } from "./stage6-qa-utils.mjs";

const baseline = {
  imageReview: JSON.parse(fs.readFileSync(path.join(root, "audits", "remediation-v2-stage6-image-review.json"), "utf8")),
  visualReview: JSON.parse(fs.readFileSync(path.join(root, "audits", "remediation-v2-stage6-visual-object-review.json"), "utf8")),
  browserEvidence: JSON.parse(fs.readFileSync(path.join(root, "audits", "remediation-v2-stage6-browser-evidence.json"), "utf8")),
};
const clone = () => structuredClone(baseline);
const mutations = [
  ["remove one current-pixel image", (data) => { data.imageReview.records.pop(); }],
  ["replace reverse pass with forward order", (data) => { data.imageReview.reverseOrder = [...data.imageReview.forwardOrder]; }],
  ["create an unresolved image-pass disagreement", (data) => { data.imageReview.records[0].pass2.status = "Failed"; data.imageReview.records[0].disagreement = true; data.imageReview.disagreements = 1; }],
  ["remove fresh OCR evidence", (data) => { data.imageReview.records[0].ocr.status = "Missing"; }],
  ["import an inherited image approval", (data) => { data.imageReview.sourceApprovalImported = true; }],
  ["reapprove changed pixels without a new visual review", (data) => {
    const row = data.imageReview.records[0];
    row.assetSha256 = "0".repeat(64);
    row.pass1.assetSha256 = row.assetSha256;
    row.pass2.assetSha256 = row.assetSha256;
  }],
  ["remove raster alt text", (data) => { const row = data.visualReview.records.find(({ tagName }) => tagName === "img"); row.accessibility.altPresent = false; }],
  ["remove one current visual object", (data) => { data.visualReview.records.pop(); }],
  ["break a high-risk assertion", (data) => { const row = data.visualReview.records.find(({ risk }) => risk === "High"); row.dedicatedAssertion = "Failed"; }],
  ["delete a current page hash", (data) => { data.browserEvidence.records[0].sourceHash = ""; }],
  ["inject mobile document overflow", (data) => { const row = data.browserEvidence.records.find(({ viewport }) => viewport === "390x844"); row.documentOverflow = true; }],
  ["inject table overflow", (data) => { data.browserEvidence.records.find(({ viewport }) => viewport === "390x844").tableOverflowCount = 1; }],
  ["inject a console error", (data) => { data.browserEvidence.records[0].consoleWarningErrorCount = 1; }],
];

const baselineResult = evaluateStage6Artifacts(baseline);
if (baselineResult.status !== "Ready") throw new Error(`Stage 6 mutation baseline is blocked:\n${baselineResult.failures.join("\n")}`);
for (const [name, mutate] of mutations) {
  const data = clone();
  mutate(data);
  const result = evaluateStage6Artifacts(data);
  if (result.status !== "Blocked") throw new Error(`Mutation unexpectedly passed: ${name}`);
  console.log(`Expected failure: ${name}`);
}
console.log(`Remediation v2 Stage 6 mutation suite passed: ${mutations.length}/${mutations.length} negative controls failed closed.`);
