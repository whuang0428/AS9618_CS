import fs from "node:fs";
import path from "node:path";
import { evaluateStage7Artifacts } from "./remediation-v2-stage7-gate.mjs";
import { root } from "./stage6-qa-utils.mjs";

const json = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const baseline = {
  browserEvidence: json("audits/remediation-v2-stage7-browser-evidence.json"),
  independentReview: json("audits/remediation-v2-stage7-independent-review.json"),
  reproducibility: json("audits/remediation-v2-stage7-reproducibility.json"),
  releaseValidation: json("audits/remediation-v2-stage7-gate-result.json").releaseValidation,
  defects: json("audits/remediation-v2-defects.json"),
};
const mutations = [
  ["import inherited approval", (data) => { data.independentReview.sourceApprovalImported = true; }],
  ["remove high-risk defect review", (data) => { data.independentReview.records.pop(); }],
  ["stale page hash", (data) => { data.browserEvidence.records[0].sourceHash = ""; }],
  ["block real keyboard", (data) => { data.browserEvidence.keyboard.status = "BlockedByBrowserInjection"; }],
  ["remove keyboard flow", (data) => { data.browserEvidence.keyboard.checks.pop(); }],
  ["inject contrast failure", (data) => { data.browserEvidence.records[0].contrast.failures = 1; }],
  ["inject target failure", (data) => { data.browserEvidence.records[0].layout.targetFailures = 1; }],
  ["inject unmarked Han", (data) => { data.browserEvidence.records[0].semantics.unmarkedHan = 1; }],
  ["make second generation differ", (data) => { data.reproducibility.secondRunChangedFiles = 1; data.reproducibility.changedFiles = ["web/index.html"]; }],
  ["fail release inventory", (data) => { data.releaseValidation.status = "Failed"; data.releaseValidation.commandExitCode = 1; }],
  ["open a P1 defect", (data) => { data.defects.issues.find(({ severity }) => severity === "P1").status = "Pending"; }],
];
const ready = evaluateStage7Artifacts(baseline);
if (ready.status !== "Ready") throw new Error(`Stage 7 mutation baseline is blocked:\n${ready.failures.join("\n")}`);
for (const [name, mutate] of mutations) {
  const data = structuredClone(baseline);
  mutate(data);
  const result = evaluateStage7Artifacts(data);
  if (result.status !== "Blocked") throw new Error(`Mutation unexpectedly passed: ${name}`);
  console.log(`Expected failure: ${name}`);
}
console.log(`Remediation v2 Stage 7 mutation suite passed: ${mutations.length}/${mutations.length} negative controls failed closed.`);
