import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { wordingReviewHeaders } from "./remediation-v2-review-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
if (process.argv.length > 2) {
  throw new Error("Bulk approval is prohibited. The generator only creates Pending records; each approval requires independent evidence.");
}
const rows = [];

const hash = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const csv = (value) => /[",\n]/.test(String(value)) ? `"${String(value).replaceAll('"', '""')}"` : String(value);

for (let lesson = 1; lesson <= 151; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const markdownName = fs.readdirSync(path.join(root, "lessons"))
    .find((name) => name.startsWith(`${id}-`) && name.endsWith(".md"));
  for (const [surface, relativePath] of [
    ["lesson-markdown", `lessons/${markdownName}`],
    ["lesson-html", `web/lesson-${id}/index.html`],
  ]) {
    const text = fs.readFileSync(path.join(root, relativePath), "utf8");
    rows.push([surface, `L${id}`, relativePath, "Pending", "Unreviewed", "", hash(text), "", "", "", "CIE register and terminology review"]);
  }
}

for (const question of loadAllQuestions()) {
  rows.push(["question", question.id, question.sourceKey, "Pending", "Unreviewed", "", question.hash, "", "", "", "Command word, scope and mark-scheme review"]);
}

for (const item of explanations) {
  const key = `${item.lesson}/${item.targetId}`;
  const text = [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");
  rows.push(["infographic", key, item.visual.src, "Pending", "Unreviewed", "", hash(text), "", "", "", "Maintained text and visible-image wording review"]);
}

const output = [wordingReviewHeaders, ...rows].map((row) => row.map(csv).join(",")).join("\n");
fs.writeFileSync(path.join(root, "audits", "cie-wording-review-register.csv"), `${output}\n`);
console.log(`Generated CIE wording register: ${rows.length} Pending records; bulk approval disabled.`);
