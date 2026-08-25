import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ledgerPath = path.join(root, "audits", "visual-semantic-review-ledger.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

const removedKeys = new Set([
  "033/explanation-loop-img-1",
  "098/explanation-pseudocode-img-1",
  "099/explanation-pseudocode-img-1",
]);

const moves = new Map([
  ["100/equivalence", "101/equivalence"],
  ["100/flowcharts", "101/flowcharts"],
  ["100/notation", "101/notation"],
  ["100/pseudocode", "101/pseudocode"],
  ["100/structure-tool", "101/structure-tool"],
  ["100/symbol-tool", "101/symbol-tool"],
  ["101/dry-run", "102/dry-run"],
  ["101/loops", "102/loops"],
  ["101/predictor", "102/predictor"],
  ["101/pseudocode", "102/pseudocode"],
  ["101/trace-table", "102/trace-table"],
  ["102/combining", "100/combining"],
  ["102/iteration", "100/iteration"],
  ["102/pseudocode", "100/pseudocode"],
  ["102/selection", "100/selection"],
  ["102/sequence", "100/sequence"],
]);

function migratedRecord(record) {
  if (removedKeys.has(record.key)) return null;
  if (!record.stage10) return record;
  const oldTarget = record.targetId || record.visualId.match(/^explanation-(.+)-img-\d+$/)?.[1];
  const destination = moves.get(`${record.lesson}/${oldTarget}`);
  if (!destination) return record;
  const [lesson, target] = destination.split("/");
  const oldLesson = record.lesson;
  const filename = `stage10-lesson-${lesson}-${target}.jpg`;
  const replaceLesson = (value) => String(value ?? "")
    .replaceAll(`lesson-${oldLesson}`, `lesson-${lesson}`)
    .replaceAll(`Lesson ${oldLesson}`, `Lesson ${lesson}`)
    .replaceAll(`/lesson-${oldLesson}/`, `/lesson-${lesson}/`);
  return {
    ...record,
    key: `${lesson}/explanation-${target}-img-1`,
    lesson,
    route: `/lesson-${lesson}/`,
    visualId: `explanation-${target}-img-1`,
    sectionId: `explanation-${target}`,
    targetId: target,
    asset: `web/assets/diagrams/stage10-infographics/${filename}`,
    pass1Evidence: replaceLesson(record.pass1Evidence),
    pass2Evidence: replaceLesson(record.pass2Evidence),
  };
}

ledger.records = ledger.records.map(migratedRecord).filter(Boolean)
  .sort((left, right) => left.lesson.localeCompare(right.lesson) || left.key.localeCompare(right.key))
  .map((record, index) => ({ ...record, ordinal: index + 1 }));
ledger.counts = { total: 965, stage10Jpg: 779, htmlCss: 170, inlineSvg: 13, otherRaster: 3 };
ledger.curriculumSequenceMigration = {
  retired: [...removedKeys],
  moved: Object.fromEntries(moves),
  review: "Original-resolution assets and their new lesson contexts reviewed after the Lesson 100-102 reorder.",
};

if (ledger.records.length !== 965 || new Set(ledger.records.map((record) => record.key)).size !== 965) {
  throw new Error("Curriculum visual-ledger migration did not produce 965 unique records.");
}

fs.writeFileSync(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`);
console.log("Migrated visual semantic ledger: 965 current records, 779 Stage 10 assets, 16 lesson moves and 3 retired targets.");
