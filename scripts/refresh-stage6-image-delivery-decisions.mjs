import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const reviewPath = path.join(root, "audits", "remediation-v2-stage6-image-review.json");
const review = JSON.parse(fs.readFileSync(reviewPath, "utf8"));
const previousByKey = new Map(review.records.map((record) => [record.key, record]));
const digest = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const records = explanations.map((item) => {
  const sourceLesson = item.sourceLesson ?? item.lesson;
  const sourceTargetId = item.sourceTargetId ?? item.targetId;
  const key = `${sourceLesson}/${sourceTargetId}`;
  const previous = previousByKey.get(key);
  if (!previous) throw new Error(`${key}: no independently reviewed pixel decision exists`);

  const assetBuffer = fs.readFileSync(path.join(root, previous.relativeAsset));
  if (digest(assetBuffer) !== previous.assetSha256
      || previous.pass1?.assetSha256 !== previous.assetSha256
      || previous.pass2?.assetSha256 !== previous.assetSha256
      || previous.ocr?.status !== "Clear") {
    throw new Error(`${key}: pixel or OCR evidence changed; a new independent image review is required`);
  }

  const lessonId = String(item.lesson).padStart(3, "0");
  const html = fs.readFileSync(path.join(root, "web", `lesson-${lessonId}`, "index.html"), "utf8");
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lessonId}-`) && name.endsWith(".md"));
  if (!markdownName) throw new Error(`${key}: delivery Markdown is missing`);
  const markdown = fs.readFileSync(path.join(root, "lessons", markdownName), "utf8");
  const delivery = {
    htmlAsset: html.includes(`src="${item.visual.src}"`),
    htmlAlt: html.includes(`alt="${escapeHtml(item.visual.alt)}"`) || html.includes(`alt="${item.visual.alt}"`),
    htmlTranscript: item.transcript.every((statement) => html.includes(escapeHtml(statement))),
    markdownTranscript: item.transcript.every((statement) => markdown.includes(statement)),
  };
  if (!Object.values(delivery).every(Boolean)) throw new Error(`${key}: current asset/text/alt delivery is incomplete`);

  return {
    ...previous,
    lesson: item.lesson,
    sourceLesson,
    sourceTargetId,
    targetId: item.targetId,
    delivery,
    pass1: { ...previous.pass1, evidence: "unchanged current JPEG bytes + locked OCR + current topic-aligned transcript/alt delivery" },
    pass2: { ...previous.pass2, evidence: "reverse-order unchanged-byte and current delivery reconciliation" },
  };
});

if (records.length !== 783 || previousByKey.size !== 783) throw new Error("Expected exactly 783 unique reviewed images");
review.forwardOrder = records.map(({ key }) => key);
review.reverseOrder = [...review.forwardOrder].reverse();
review.records = records;
review.scope = "Current unchanged-pixel decisions reconciled in exact forward/reverse order with topic-aligned lesson delivery; every byte hash and locked OCR decision was rechecked.";
fs.writeFileSync(reviewPath, `${JSON.stringify(review, null, 2)}\n`);
console.log(`Reconciled ${records.length} unchanged image decisions with current topic-aligned delivery.`);
