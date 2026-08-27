import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const read = (name) => fs.readFileSync(path.join(audits, name), "utf8");

function parseCsv(name) {
  const text = read(name);
  const records = [];
  let record = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { record.push(field); field = ""; }
    else if (character === "\n") {
      record.push(field.replace(/\r$/, ""));
      records.push(record);
      record = [];
      field = "";
    } else field += character;
  }
  if (quoted) throw new Error(`${name}: unterminated quoted field`);
  if (field || record.length) {
    record.push(field.replace(/\r$/, ""));
    records.push(record);
  }
  return records.filter((values) => values.some((value) => value !== ""));
}
const expected = new Map([
  ["scientific-syllabus-matrix.csv", 121],
  ["scientific-lesson-review.csv", 150],
  ["scientific-assessment-matrix.csv", 963],
  ["scientific-visual-review.csv", 969],
  ["scientific-browser-qa.csv", 306],
]);

for (const [file, count] of expected) {
  if (!fs.existsSync(path.join(audits, file))) throw new Error(`Missing ${file}`);
  const records = parseCsv(file);
  const [headers, ...body] = records;
  const actual = body.length;
  if (actual !== count) throw new Error(`${file}: expected ${count} rows, found ${actual}`);
  if (body.some((row) => row.length !== headers.length)) throw new Error(`${file}: one or more records have the wrong column count`);
}

const visualRecords = parseCsv("scientific-visual-review.csv");
const [visualHeaders, ...visualBody] = visualRecords;
const lessonIndex = visualHeaders.indexOf("lesson");
const visualIdIndex = visualHeaders.indexOf("visual_id");
const visualKeys = visualBody.map((row) => `${row[lessonIndex]}/${row[visualIdIndex]}`);
if (lessonIndex < 0 || visualIdIndex < 0 || new Set(visualKeys).size !== visualKeys.length) throw new Error("scientific-visual-review.csv: lesson/visual_id keys must be present and unique");

const defects = JSON.parse(read("scientific-defects.json"));
if (defects.releaseDecision !== "BLOCKED") throw new Error("Audit must remain BLOCKED while defects and pending reviews exist");
if (!defects.defects.length || defects.defects.some((entry) => entry.status !== "Open")) throw new Error("Every first-round defect must be Open");
for (const entry of defects.defects) {
  for (const field of ["id", "category", "severity", "confidence", "locations", "current", "evidence", "officialBasis", "impact", "suggestedFix", "regressionTest", "status"]) {
    if (entry[field] == null || entry[field] === "" || (Array.isArray(entry[field]) && entry[field].length === 0)) throw new Error(`${entry.id}: missing ${field}`);
  }
}

const baseline = JSON.parse(read("scientific-audit-baseline.json"));
for (const [key, value] of Object.entries({ lessons: 150, pages: 153, pageViews: 306, questions: 963, assessmentSets: 51, stage10Images: 783, visualObjects: 969, syllabusRequirements: 121 })) {
  if (baseline.scope[key] !== value) throw new Error(`Baseline ${key}: expected ${value}, found ${baseline.scope[key]}`);
}
const ocr = JSON.parse(read("scientific-stage10-ocr-summary.json"));
if (ocr.images !== 783 || ocr.nonEmptyTranscripts !== 783 || ocr.semanticApproval !== false) throw new Error("Pixel OCR summary is inconsistent");
if (ocr.targetedEvidence.l050ShiftBinaryTokenLengths.some((length) => length !== 8)) throw new Error("L050 OCR contains a non-eight-bit fixed-width token");
if (!ocr.targetedEvidence.l137ImageTokens.includes("ELSE") || !ocr.targetedEvidence.l137ImageTokens.includes("ENDIF")) throw new Error("L137 OCR evidence is incomplete");

const report = read("scientific-audit-report.md");
for (const phrase of ["**Decision:** BLOCKED", "## What passed", "## Confirmed failures", "## Not yet verified", "## Repair order"]) {
  if (!report.includes(phrase)) throw new Error(`Report missing ${phrase}`);
}
if (!read("scientific-repair-plan.md").includes("## Batch 6 — independent re-audit and release gate")) throw new Error("Repair plan is incomplete");
if (!read("scientific-syllabus-matrix.csv").includes("PendingIndependentSemanticReview")) throw new Error("Syllabus matrix must expose pending review");
if (!read("scientific-visual-review.csv").includes("PendingBlindReverseReview")) throw new Error("Visual matrix must expose pending second pass");

console.log(`Scientific audit verified: ${expected.size} matrices, ${defects.defects.length} open defects, decision BLOCKED.`);

const finalExpected = new Map([
  ["scientific-final-syllabus-matrix.csv", 121],
  ["scientific-final-lesson-review.csv", 150],
  ["scientific-final-assessment-matrix.csv", 963],
  ["scientific-final-visual-review.csv", 969],
  ["scientific-final-browser-qa.csv", 306],
]);
for (const [file, count] of finalExpected) {
  if (!fs.existsSync(path.join(audits, file))) throw new Error(`Missing ${file}`);
  const [headers, ...body] = parseCsv(file);
  if (body.length !== count) throw new Error(`${file}: expected ${count} rows, found ${body.length}`);
  if (body.some((row) => row.length !== headers.length)) throw new Error(`${file}: one or more records have the wrong column count`);
  if (body.some((row) => row.some((cell) => /Unknown|Pending|NotReady|Blocked|Fail/.test(cell)))) throw new Error(`${file}: unresolved state remains`);
}

const finalDefects = JSON.parse(read("scientific-final-defects.json"));
if (finalDefects.releaseDecision !== "APPROVED") throw new Error("Final scientific audit is not APPROVED");
if (finalDefects.defects.length !== defects.defects.length || finalDefects.defects.some((entry) => entry.status !== "Resolved" || !entry.closureEvidence?.length)) throw new Error("Final scientific defect reconciliation is incomplete");
if (Object.values(finalDefects.unresolved).some((count) => count !== 0)) throw new Error("Final scientific audit contains an unresolved count");
const finalReport = read("scientific-final-audit-report.md");
for (const phrase of ["**Decision:** APPROVED", "## Passed", "## Failed", "None.", "## Unverified", "Unknown=0"]) {
  if (!finalReport.includes(phrase)) throw new Error(`Final report missing ${phrase}`);
}

console.log(`Scientific final closure verified: ${finalExpected.size} matrices, ${finalDefects.defects.length} resolved defects, decision APPROVED.`);
