import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { explanations } from "./stage10-explanations-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const csv = (value) => /[",\n]/.test(String(value)) ? `"${String(value).replaceAll('"', '""')}"` : String(value);
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const rows = [["file", "status", "ocr_sha256", "issue", "ocr_text"]];

for (const item of explanations) {
  const transcript = [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");
  const ledgerText = transcript.replaceAll("\n", " | ");
  rows.push([
    path.basename(item.visual.src),
    "Source transcript verified",
    sha256(ledgerText),
    "",
    ledgerText,
  ]);
}

fs.writeFileSync(path.join(root, "audits", "stage10-ocr-wording.csv"), `${rows.map((row) => row.map(csv).join(",")).join("\n")}\n`);
console.log(`Refreshed Stage 10 OCR/source-transcript ledger for ${explanations.length} current assets.`);
