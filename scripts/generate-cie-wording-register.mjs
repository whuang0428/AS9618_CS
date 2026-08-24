import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const approved = process.argv.includes("--approve");
const status = approved ? "Approved" : "Pending";
const rows = [];

const hash = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const csv = (value) => /[",\n]/.test(String(value)) ? `"${String(value).replaceAll('"', '""')}"` : String(value);

for (let lesson = 1; lesson <= 150; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const markdownName = fs.readdirSync(path.join(root, "lessons"))
    .find((name) => name.startsWith(`${id}-`) && name.endsWith(".md"));
  for (const [surface, relativePath] of [
    ["lesson-markdown", `lessons/${markdownName}`],
    ["lesson-html", `web/lesson-${id}/index.html`],
  ]) {
    const text = fs.readFileSync(path.join(root, relativePath), "utf8");
    rows.push([surface, `L${id}`, relativePath, status, hash(text), "CIE register and terminology review"]);
  }
}

for (const question of loadAllQuestions()) {
  rows.push(["question", question.id, question.sourceKey, status, question.hash, "Command word, scope and mark-scheme review"]);
}

for (const item of explanations) {
  const key = `${item.lesson}/${item.targetId}`;
  const text = [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");
  rows.push(["infographic", key, item.visual.src, status, hash(text), "Maintained text and visible-image wording review"]);
}

const header = ["surface", "id", "source", "status", "content_hash", "review_note"];
const output = [header, ...rows].map((row) => row.map(csv).join(",")).join("\n");
fs.writeFileSync(path.join(root, "audits", "cie-wording-review-register.csv"), `${output}\n`);
console.log(`Generated CIE wording register: ${rows.length} records, status ${status}.`);
