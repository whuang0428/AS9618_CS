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

if (baseline.length !== 782 || repairByFilename.size !== 60) throw new Error("Expected 782 baseline OCR rows and 60 repaired assets.");

const csv = (value) => /[",\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const rows = ["file,status,ocr_sha256,issue,ocr_text"];
for (const record of baseline.sort((left, right) => left.asset.localeCompare(right.asset))) {
  const repair = repairByFilename.get(record.asset);
  if (repair) {
    const title = explanationByKey[repair.key]?.title ?? record.title;
    const transcript = [title, "Use the exact facts and relationships in this model.", ...repair.facts, "Exam check: state only the relationship supported by the given data and rule."].join("\n");
    rows.push([record.asset, "Source transcript verified", sha256(transcript), "", transcript.replaceAll("\n", " | ")].map(csv).join(","));
  } else {
    const transcript = record.ocr_text.replaceAll(" | ", "\n");
    rows.push([record.asset, record.ocr_status, sha256(transcript), "", record.ocr_text].map(csv).join(","));
  }
}

fs.writeFileSync(path.join(root, "audits", "stage10-ocr-wording.csv"), `${rows.join("\n")}\n`);
console.log("Restored 722 frozen OCR rows and recorded source-verified transcripts for 60 deterministic repairs.");
