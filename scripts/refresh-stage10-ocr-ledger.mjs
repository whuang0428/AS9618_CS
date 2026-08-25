import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { explanationByKey } from "./stage10-explanations-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argument = process.argv.find((value) => value.startsWith("--baseline-ledger="));
if (!argument) throw new Error("Pass --baseline-ledger=/tmp/.../ledger.json.");
const baselinePath = argument.slice("--baseline-ledger=".length);
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8")).filter((record) => record.stage10);
const repairFacts = JSON.parse(fs.readFileSync(path.join(root, "scripts", "stage10-visual-repair-facts.json"), "utf8"));
const repairByFilename = new Map(Object.entries(repairFacts).map(([key, facts]) => {
  const [lesson, target] = key.split("/");
  return [`stage10-lesson-${lesson}-${target}.jpg`, { key, facts }];
}));

const filenameMigrations = new Map([
  ["stage10-lesson-100-equivalence.jpg", "stage10-lesson-101-equivalence.jpg"],
  ["stage10-lesson-100-flowcharts.jpg", "stage10-lesson-101-flowcharts.jpg"],
  ["stage10-lesson-100-notation.jpg", "stage10-lesson-101-notation.jpg"],
  ["stage10-lesson-100-pseudocode.jpg", "stage10-lesson-101-pseudocode.jpg"],
  ["stage10-lesson-100-structure-tool.jpg", "stage10-lesson-101-structure-tool.jpg"],
  ["stage10-lesson-100-symbol-tool.jpg", "stage10-lesson-101-symbol-tool.jpg"],
  ["stage10-lesson-101-dry-run.jpg", "stage10-lesson-102-dry-run.jpg"],
  ["stage10-lesson-101-loops.jpg", "stage10-lesson-102-loops.jpg"],
  ["stage10-lesson-101-predictor.jpg", "stage10-lesson-102-predictor.jpg"],
  ["stage10-lesson-101-pseudocode.jpg", "stage10-lesson-102-pseudocode.jpg"],
  ["stage10-lesson-101-trace-table.jpg", "stage10-lesson-102-trace-table.jpg"],
  ["stage10-lesson-102-combining.jpg", "stage10-lesson-100-combining.jpg"],
  ["stage10-lesson-102-iteration.jpg", "stage10-lesson-100-iteration.jpg"],
  ["stage10-lesson-102-pseudocode.jpg", "stage10-lesson-100-pseudocode.jpg"],
  ["stage10-lesson-102-selection.jpg", "stage10-lesson-100-selection.jpg"],
  ["stage10-lesson-102-sequence.jpg", "stage10-lesson-100-sequence.jpg"],
]);
const removedAssets = new Set([
  "stage10-lesson-033-loop.jpg",
  "stage10-lesson-098-pseudocode.jpg",
  "stage10-lesson-099-pseudocode.jpg",
]);

if (baseline.length !== 782 || repairByFilename.size !== 60) throw new Error("Expected 782 baseline OCR rows and 60 repaired assets.");

const csv = (value) => /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const rows = ["file,status,ocr_sha256,issue,ocr_text"];
for (const record of baseline.sort((left, right) => left.asset.localeCompare(right.asset))) {
  if (removedAssets.has(record.asset)) continue;
  const migratedAsset = filenameMigrations.get(record.asset) ?? record.asset;
  const repair = repairByFilename.get(migratedAsset);
  if (repair) {
    const title = explanationByKey[repair.key]?.title ?? record.title;
    const transcript = [title, "Use the exact facts and relationships in this model.", ...repair.facts, "Exam check: state only the relationship supported by the given data and rule."].join("\n");
    rows.push([migratedAsset, "Source transcript verified", sha256(transcript), "", transcript.replaceAll("\n", " | ")].map(csv).join(","));
  } else {
    const transcript = record.ocr_text.replaceAll(" | ", "\n");
    rows.push([migratedAsset, record.ocr_status, sha256(transcript), "", record.ocr_text].map(csv).join(","));
  }
}

fs.writeFileSync(path.join(root, "audits", "stage10-ocr-wording.csv"), `${rows.join("\n")}\n`);
console.log("Restored the current 779 OCR rows, including the Lesson 100-102 filename migration and three retired assets.");
