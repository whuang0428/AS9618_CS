import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { evaluateStage6Artifacts } from "./remediation-v2-stage6-gate.mjs";
import { pageDefinitions, pageHash, root } from "./stage6-qa-utils.mjs";
import { scanVisualSemanticHashes } from "./visual-semantic-hash.mjs";

const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const json = (relative) => JSON.parse(read(relative));
const digest = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const expect = (condition, message) => { if (!condition) throw new Error(message); };

const imageReview = json("audits/remediation-v2-stage6-image-review.json");
const visualReview = json("audits/remediation-v2-stage6-visual-object-review.json");
const browserEvidence = json("audits/remediation-v2-stage6-browser-evidence.json");
const gate = evaluateStage6Artifacts({ imageReview, visualReview, browserEvidence });
expect(gate.status === "Ready", gate.failures.join("\n"));

for (const row of imageReview.records) {
  const buffer = fs.readFileSync(path.join(root, row.relativeAsset));
  expect(digest(buffer) === row.assetSha256, `${row.key}: current pixel hash changed`);
  expect(row.pass1.assetSha256 === row.assetSha256 && row.pass2.assetSha256 === row.assetSha256, `${row.key}: pass hashes do not match the current pixel`);
}

const currentVisuals = scanVisualSemanticHashes((relative) => read(relative), (relative) => fs.readFileSync(path.join(root, relative)));
expect(currentVisuals.length === 971, `current visual census changed to ${currentVisuals.length}`);
const currentByKey = new Map(currentVisuals.map((row) => [row.key, row]));
for (const reviewed of visualReview.records) {
  const current = currentByKey.get(reviewed.key);
  expect(current, `${reviewed.key}: reviewed visual object no longer exists`);
  expect(current.semanticHash === reviewed.semanticHash && current.sectionHash === reviewed.sectionHash, `${reviewed.key}: current visual semantics changed`);
  expect(current.assetSha256 === reviewed.assetSha256, `${reviewed.key}: current raster hash changed`);
}

const pages = new Map(pageDefinitions.map((definition) => [definition.page, definition]));
for (const row of browserEvidence.records) {
  const definition = pages.get(row.page);
  expect(definition, `${row.page}: browser page definition is missing`);
  expect(row.sourceHash === pageHash(definition), `${row.page}/${row.viewport}: browser evidence is stale`);
}

const decision = json("audits/remediation-v2-current-decision.json");
if (decision.currentStage?.number > 6) {
  expect(decision.currentReleaseDecision === "RELEASE_CANDIDATE", "Stage 7 progression must produce only RELEASE_CANDIDATE");
  expect(decision.historicalDecisions.some(({ stage, progressionApproval, current }) => stage === 6 && progressionApproval === "ApprovedForProgression" && current === false), "Stage 6 progression approval is not historical");
} else {
  expect(decision.currentReleaseDecision === "BLOCKED", "Stage 6 must remain BLOCKED pending Stage 7");
  expect(decision.currentStage?.number === 6 && decision.currentStage?.approvalStatus === "AwaitingUserApproval", "current Stage 6 decision state is invalid");
}
expect(decision.historicalDecisions.some(({ stage, progressionApproval, current }) => stage === 5 && progressionApproval === "ApprovedForProgression" && current === false), "Stage 5 progression approval is not historical");

const gateResult = json("audits/remediation-v2-stage6-gate-result.json");
expect(gateResult.images?.reviewed === 784 && gateResult.visualObjects?.reviewed === 971 && gateResult.browser?.viewportRecords === 308, "Stage 6 gate-result counts are invalid");
expect(gateResult.openP0P1?.length === 0, "Stage 6 gate result still has open P0/P1 defects");
expect(fs.existsSync(path.join(root, "audits", "remediation-v2-stage6-closure.json")), "Stage 6 closure is missing");
const report = read("audits/remediation-v2-stage6-report.md");
expect(report.includes("784/784") && report.includes("971/971") && report.includes("308/308") && report.includes("Do not start Stage 7"), "Stage 6 report is incomplete");

console.log("Remediation v2 Stage 6 verification passed: current pixels, current visual semantics, current page hashes and BLOCKED decision all reconcile.");
