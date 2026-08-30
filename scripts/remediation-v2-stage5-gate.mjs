import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";
import { actualCriticalFixture, evaluateCriticalSemanticControls } from "./remediation-v2-semantic-gate.mjs";
import { normaliseQuestionPrompt } from "./cie-command-words.mjs";

export const stage5VisualKeys = Object.freeze([
  "050/concept",
  "108/pseudocode",
  "122/parse",
  "122/pseudocode",
  "122/types",
  "134/case",
  "134/concat",
  "134/java",
]);

const root = path.resolve(import.meta.dirname, "..");
const assetDirectory = path.join(root, "web/assets/diagrams/stage10-infographics");
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
const sourceText = (item) => [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");

function jpegDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { width: buffer.readUInt16BE(offset + 7), height: buffer.readUInt16BE(offset + 5) };
    }
    if (!Number.isFinite(length) || length < 2) break;
    offset += length + 2;
  }
  return null;
}

export function stage5VisualSnapshot() {
  return stage5VisualKeys.map((key) => {
    const [lesson, targetId] = key.split("/");
    const item = explanations.find((candidate) => `${candidate.lesson}/${candidate.targetId}` === key);
    const asset = `stage10-lesson-${lesson}-${targetId}.jpg`;
    const assetPath = path.join(assetDirectory, asset);
    return {
      key,
      lesson,
      targetId,
      item,
      asset,
      assetPath,
      exists: fs.existsSync(assetPath),
      sha256: fs.existsSync(assetPath) ? digest(fs.readFileSync(assetPath)) : "",
      dimensions: fs.existsSync(assetPath) ? jpegDimensions(assetPath) : null,
      sourceFactsHash: item ? digest(sourceText(item)) : "",
    };
  });
}

export function evaluateStage5TechnicalControls(fixture = actualCriticalFixture()) {
  const problems = evaluateCriticalSemanticControls(fixture)
    .filter(({ id }) => /CRIT-L(?:049|107|121|133)-/.test(id));

  for (const entry of stage5VisualSnapshot()) {
    if (!entry.item) problems.push({ id: "STAGE5-VISUAL-SOURCE", location: entry.key, detail: "maintained explanation source is missing" });
    if (!entry.exists) problems.push({ id: "STAGE5-VISUAL-ASSET", location: entry.key, detail: "critical image is missing" });
    if (entry.exists && (entry.dimensions?.width !== 1536 || entry.dimensions?.height !== 1024)) {
      problems.push({ id: "STAGE5-VISUAL-DIMENSIONS", location: entry.key, detail: "critical image is not 1536 x 1024" });
    }
  }

  const nameFixture = "Write pseudocode to assign StudentID, Name and Mark.";
  if (normaliseQuestionPrompt(nameFixture) !== nameFixture) {
    problems.push({ id: "STAGE5-COMMAND-BOUNDARY", location: "scripts/cie-command-words.mjs", detail: "field identifier Name is still rewritten as a command word" });
  }
  if (normaliseQuestionPrompt("Name one suitable factor.") !== "Identify one suitable factor.") {
    problems.push({ id: "STAGE5-COMMAND-BOUNDARY", location: "scripts/cie-command-words.mjs", detail: "leading Name command is no longer calibrated" });
  }

  return { status: problems.length ? "Blocked" : "Ready", problems, visuals: stage5VisualSnapshot() };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = evaluateStage5TechnicalControls();
  if (result.problems.length) {
    console.error(`Remediation v2 Stage 5 technical gate failed (${result.problems.length}):`);
    for (const problem of result.problems) console.error(`- ${problem.id} ${problem.location}: ${problem.detail}`);
    process.exit(1);
  }
  console.log(`Remediation v2 Stage 5 technical gate passed: four lesson controls and ${result.visuals.length} critical image assets are current.`);
}
