import fs from "node:fs";
import path from "node:path";

import { evaluateCurrentDecision } from "./remediation-v2-decision-gate.mjs";
import { evaluateRemediationV2SemanticGate } from "./remediation-v2-semantic-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const decision = readJson("audits/remediation-v2-current-decision.json");
const defects = readJson("audits/remediation-v2-defects.json");
const semanticGate = evaluateRemediationV2SemanticGate();
const evaluation = evaluateCurrentDecision(decision, defects, semanticGate);
if (evaluation.problems.length) {
  console.error(`Current-decision verification failed (${evaluation.problems.length}):`);
  for (const problem of evaluation.problems) console.error(`- ${problem}`);
  process.exit(1);
}
console.log(`Current decision verified: ${decision.currentReleaseDecision}; Stage ${decision.currentStage.number} ${decision.currentStage.approvalStatus}; ${evaluation.openBlockingCount} open P0/P1 defects; semantic gate ${semanticGate.status}.`);
