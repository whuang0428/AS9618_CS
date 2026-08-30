import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const pad = (value) => String(value).padStart(3, "0");
const shift = (value) => Number(value) >= 10 && Number(value) <= 150 ? pad(Number(value) + 1) : pad(value);
const marker = "// syllabus-order-151 identity refresh applied";
const statePath = path.join(root, "scripts", "stage10-151-identity-refresh.json");

if (fs.existsSync(statePath)) {
  console.log("Stage 10 identities already match the 151-lesson order.");
  process.exit(0);
}

function updateText(relative, transform) {
  const file = path.join(root, relative);
  const source = fs.readFileSync(file, "utf8");
  if (source.includes(marker)) return;
  fs.writeFileSync(file, `${marker}\n${transform(source)}`);
}

function shiftSlashKeys(source) {
  return source.replace(/"(\d{3})\//g, (match, lesson) => `"${shift(lesson)}/`);
}

const jobsPath = path.join(root, "scripts", "stage10-rollout-jobs.json");
const jobs = JSON.parse(fs.readFileSync(jobsPath, "utf8"));
for (const job of jobs) {
  const assetLesson = job.filename.match(/^stage10-lesson-(\d{3})-/)?.[1];
  if (!assetLesson) throw new Error(`Stage 10 job has an invalid filename: ${job.filename}`);
  job.lesson = assetLesson;
}
fs.writeFileSync(jobsPath, `${JSON.stringify(jobs, null, 2)}\n`);

updateText("scripts/stage10-explanations-data.mjs", (source) => {
  source = shiftSlashKeys(source);
  const start = source.indexOf("export const pilotExplanations");
  const end = source.indexOf("]);", start);
  if (start < 0 || end < 0) throw new Error("Pilot explanation block not found");
  const before = source.slice(0, start);
  const block = source.slice(start, end + 3).replace(/explanation\("(\d{3})"/g, (match, lesson) => `explanation("${shift(lesson)}"`);
  const after = source.slice(end + 3).replace(
    /const additionalOptionalExplanationLessons = new Set\(\[(.*?)\]\);/s,
    (match, values) => `const additionalOptionalExplanationLessons = new Set([${values.replace(/"(\d{3})"/g, (item, lesson) => `"${shift(lesson)}"`)}]);`,
  );
  return before + block + after;
});

for (const relative of [
  "scripts/stage10-semantic-source-overrides.mjs",
  "scripts/stage10-semantic-calculations.mjs",
]) updateText(relative, shiftSlashKeys);

updateText("scripts/stage10-semantic-audit-data.mjs", (source) => shiftSlashKeys(source)
  .replace(/S10-(\d{3})-/g, (match, lesson) => `S10-${shift(lesson)}-`)
  .replace(/Lesson (\d{3})/g, (match, lesson) => `Lesson ${shift(lesson)}`));

for (const relative of [
  "scripts/stage10-technical-visual-contract.json",
  "scripts/stage10-visual-repair-facts.json",
]) {
  const file = path.join(root, relative);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const shifted = Object.fromEntries(Object.entries(data).map(([key, value]) => {
    const match = key.match(/^(\d{3})(\/.*)$/);
    return match ? [`${shift(match[1])}${match[2]}`, value] : [key, value];
  }));
  fs.writeFileSync(file, `${JSON.stringify(shifted, null, 2)}\n`);
}

const deliveryPath = path.join(root, "scripts", "remediation-v2-visual-delivery-map.json");
const delivery = JSON.parse(fs.readFileSync(deliveryPath, "utf8"));
const shiftedDelivery = Object.fromEntries(Object.entries(delivery).map(([key, value]) => {
  const [lesson, target] = key.split("/");
  return [`${shift(lesson)}/${target}`, { ...value, lesson: shift(value.lesson) }];
}));
fs.writeFileSync(deliveryPath, `${JSON.stringify(shiftedDelivery, null, 2)}\n`);

fs.writeFileSync(statePath, `${JSON.stringify({ schemaVersion: 1, lessonCount: 151, refreshed: true }, null, 2)}\n`);

console.log(`Refreshed ${jobs.length} Stage 10 jobs and supporting semantic identities for the 151-lesson order.`);
