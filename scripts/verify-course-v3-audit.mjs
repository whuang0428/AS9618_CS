import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const evidenceRoot = join(root, "audits", "course-v3-visual-evidence");
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const pngSize = (path) => {
  const data = readFileSync(path);
  if (data.subarray(1, 4).toString("ascii") !== "PNG") return null;
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
};

const qaPath = join(evidenceRoot, "browser-qa.json");
check(existsSync(qaPath), "Browser QA record is missing");
const qa = existsSync(qaPath) ? JSON.parse(readFileSync(qaPath, "utf8")) : { results: [], indexResults: [], summary: {} };
check(qa.summary.lessonViewportReviews === courseV3Meta.lessonCount * 2, `Expected ${courseV3Meta.lessonCount * 2} lesson viewport reviews`);
check(qa.summary.lessonFailures === 0 && qa.summary.lessonPasses === courseV3Meta.lessonCount * 2, "Not every lesson viewport passed");
check(qa.summary.indexViewportReviews === 26 && qa.summary.indexFailures === 0, "Course/section index viewport reviews are incomplete or failing");

for (const lesson of courseV3Lessons) {
  const id = String(lesson.sequenceIndex).padStart(3, "0");
  for (const [viewport, width] of [["desktop", 1440], ["mobile-390", 390]]) {
    const path = join(evidenceRoot, "full-pages", viewport, `lesson-${id}.png`);
    check(existsSync(path), `Missing ${viewport} screenshot for L${id}`);
    if (!existsSync(path)) continue;
    check(statSync(path).size > 30_000, `Screenshot is suspiciously small: ${path.slice(root.length + 1)}`);
    const dimensions = pngSize(path);
    check(dimensions?.width === width && dimensions.height > 1000, `Screenshot dimensions are incomplete for L${id} ${viewport}`);
    const record = qa.results.find((result) => result.lesson === id && result.viewport === viewport);
    check(record?.status === "PASS", `QA record is not PASS for L${id} ${viewport}`);
    check(record?.metrics?.pageOverflow === 0, `Page overflow remains for L${id} ${viewport}`);
    check(record?.metrics?.brokenImages?.length === 0, `Broken image remains for L${id} ${viewport}`);
    check(record?.sourceSha256 === sha256(join(root, "web", "course-v3", lesson.route, "index.html")), `Visual evidence is stale for L${id} ${viewport}`);
    check(JSON.stringify(record?.metrics?.stageOrder) === JSON.stringify(["guiding-question", "knowledge-explanation", "practice", "past-paper-analysis", "summary"]), `Stage order failed for L${id} ${viewport}`);
  }
}

for (const section of Object.keys(sectionMeta)) for (const viewport of ["desktop", "mobile-390"]) {
  const path = join(evidenceRoot, "contact-sheets", `section-${section}-${viewport}.png`);
  check(existsSync(path), `Missing Section ${section} ${viewport} contact sheet`);
  if (existsSync(path)) {
    const dimensions = pngSize(path);
    check(statSync(path).size > 30_000 && dimensions?.width === 1440 && dimensions.height >= 1000, `Section ${section} ${viewport} contact sheet is incomplete`);
  }
}
for (const record of qa.indexResults) {
  const sourcePath = record.page === "course" ? join(root, "web", "course-v3", "index.html") : join(root, "web", "course-v3", record.page, "index.html");
  check(record.sourceSha256 === sha256(sourcePath), `Visual evidence is stale for ${record.page} ${record.viewport}`);
}

const ledgerPath = join(root, "audits", "course-v3-objective-material-ledger.csv");
check(existsSync(ledgerPath), "Atomic objective ledger is missing");
if (existsSync(ledgerPath)) {
  const lines = readFileSync(ledgerPath, "utf8").trim().split("\n");
  check(lines.length === 590, `Expected 589 ledger data rows; found ${lines.length - 1}`);
  check(lines.slice(1).every((line) => line.includes('"reviewed"') && line.includes('"high"')), "Ledger contains an unreviewed or low-confidence row");
}

for (const relative of ["audits/course-v3-whole-course-visual-audit.md", "audits/course-v3-visual-evidence/index.html", "course-v3-map.md"]) check(existsSync(join(root, relative)), `Missing audit artifact ${relative}`);
const report = existsSync(join(root, "audits/course-v3-whole-course-visual-audit.md")) ? readFileSync(join(root, "audits/course-v3-whole-course-visual-audit.md"), "utf8") : "";
check(report.includes("186/186 desktop/mobile page reviews recorded") && report.includes("0 failing viewport reviews"), "Audit report does not record the final passing visual result");
check(!/capture pending|FAIL L\d/.test(report), "Audit report still contains pending or failing review state");

if (errors.length) {
  console.error(`Course V3 visual-audit verification failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Course V3 visual audit verified: 186 lesson screenshots, 26 index reviews, 24 contact sheets and 589 reviewed objective rows.");
