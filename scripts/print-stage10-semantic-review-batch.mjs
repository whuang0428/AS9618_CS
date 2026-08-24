import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";

const pass = process.argv[2] ?? "pass1";
const start = Number.parseInt(process.argv[3] ?? "0", 10);
const count = Number.parseInt(process.argv[4] ?? "8", 10);
const root = path.resolve(import.meta.dirname, "..");

function sourceText(item) {
  return [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join(" ");
}

function riskScore(item) {
  const text = sourceText(item);
  let score = 0;
  if (/\b[01]{4,}\b/.test(text)) score += 100;
  if (/[=+×÷<>]|\b(?:bit|byte|KiB|MiB|Hz|pixel|address|register|opcode|operand)\b/i.test(text)) score += 40;
  if (/\b\d+(?:\.\d+)?\b/.test(text)) score += 20;
  if (/\b(?:step|stage|cycle|flow|sequence|then|before|after|input|output|route|pipeline|trace)\b/i.test(text)) score += 10;
  return score;
}

const ordered = [...explanations].sort((left, right) => {
  if (pass === "pass2") return right.lesson.localeCompare(left.lesson) || right.targetId.localeCompare(left.targetId);
  return riskScore(right) - riskScore(left) || left.lesson.localeCompare(right.lesson) || left.targetId.localeCompare(right.targetId);
});

const batch = ordered.slice(start, start + count).map((item, offset) => ({
  index: start + offset,
  key: `${item.lesson}/${item.targetId}`,
  title: item.title,
  asset: path.join(root, "web", "assets", "diagrams", "stage10-infographics", path.basename(item.visual.src)),
  sourceFacts: item.transcript ?? [...item.steps, item.analogy, item.boundary].filter(Boolean),
  riskScore: riskScore(item),
}));

console.log(JSON.stringify(batch, null, 2));
