import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const webRoot = join(root, "web");
const contractPath = join(root, "scripts", "course-v3-contract.json");
const contract = JSON.parse(readFileSync(contractPath, "utf8"));
const anchorManifest = JSON.parse(readFileSync(join(root, "scripts", "course-v3-section-anchor-assets.json"), "utf8"));
const section2Sample = JSON.parse(readFileSync(join(root, "scripts", "course-v3-section2-sample-contract.json"), "utf8"));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const hasRootRelativeAsset = (html) => /\b(?:src|href)="\/assets\//.test(html);

function imageDimensions(path) {
  const data = readFileSync(path);
  if (data.subarray(1, 4).toString("ascii") === "PNG") return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
  if (data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < data.length) {
      if (data[offset] !== 0xff) { offset += 1; continue; }
      const marker = data[offset + 1];
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) return { height: data.readUInt16BE(offset + 5), width: data.readUInt16BE(offset + 7) };
      if (marker === 0xd8 || marker === 0xd9) { offset += 2; continue; }
      const length = data.readUInt16BE(offset + 2);
      if (!length) break;
      offset += 2 + length;
    }
  }
  return null;
}

check(courseV3Meta.lessonCount === 93, `Expected 93 lessons, found ${courseV3Meta.lessonCount}`);
check(courseV3Meta.teachingLessonCount === 91, `Expected 91 teaching lessons, found ${courseV3Meta.teachingLessonCount}`);
check(courseV3Meta.reviewLessonCount === 2, `Expected two review lessons, found ${courseV3Meta.reviewLessonCount}`);
check(Object.keys(sectionMeta).length === 12, "Expected Sections 1–12");
check(contract.lessons.length === 93, `Contract contains ${contract.lessons.length} lessons`);

const officialOrder = Object.keys(officialAsMapping);
const firstOccurrence = [];
const seenRequirements = new Set();
for (const lesson of courseV3Lessons.filter((item) => item.kind === "teaching")) for (const id of lesson.syllabusIds) if (!seenRequirements.has(id)) { seenRequirements.add(id); firstOccurrence.push(id); }
check(seenRequirements.size === 121, `Expected 121 unique official requirements, found ${seenRequirements.size}`);
check(JSON.stringify(firstOccurrence) === JSON.stringify(officialOrder), "First teaching occurrence does not follow the official S1.01–S12.09 order");
check(JSON.stringify(contract.syllabusOrder) === JSON.stringify(officialOrder), "Generated contract syllabus order differs from official mapping");

const stageNames = ["1-guiding-question", "2-knowledge-explanation", "3-practice", "4-past-paper-analysis", "5-summary"];
for (const lesson of courseV3Lessons) {
  const label = `L${String(lesson.sequenceIndex).padStart(3, "0")} ${lesson.lessonKey}`;
  const htmlPath = join(root, "web", "course-v3", lesson.route, "index.html");
  check(existsSync(htmlPath), `${label}: missing rendered page`);
  if (!existsSync(htmlPath)) continue;
  const html = readFileSync(htmlPath, "utf8");
  let priorIndex = -1;
  for (const stage of stageNames) {
    const index = html.indexOf(`data-stage="${stage}"`);
    check(index > priorIndex, `${label}: missing or out-of-order ${stage}`);
    priorIndex = index;
  }
  check(!/Quick route|Full route|Deep route|Teaching-depth menu/i.test(html), `${label}: obsolete route menu returned`);
  check(!/Version 2|V2 Notes|generated wording/i.test(html), `${label}: internal generation/editorial wording is student-visible`);
  check(!hasRootRelativeAsset(html), `${label}: root-relative /assets URL breaks on project-based GitHub Pages`);
  check((html.match(/class="knowledge-unit"/g) ?? []).length === lesson.units.length, `${label}: rendered knowledge-unit count differs from contract`);
  check((html.match(/class="practice-question"/g) ?? []).length === lesson.practice.length, `${label}: rendered practice count differs from contract`);
  check(html.includes("class=\"past-paper\""), `${label}: past-paper analysis is missing`);
  check(lesson.practice.length >= 3, `${label}: fewer than three practice tasks`);
  check(lesson.pastPaper.task && lesson.pastPaper.build.length && lesson.pastPaper.markLogic.length && lesson.pastPaper.commonLosses.length, `${label}: incomplete past-paper analysis`);
  if (lesson.kind === "teaching" && lesson.section !== 2) for (const syllabusId of lesson.syllabusIds) check(lesson.summary.some(([heading]) => heading.startsWith(syllabusId)), `${label}: summary does not contain a ${syllabusId}-specific card`);
  for (const unit of lesson.units) {
    check(unit.explanation.length >= 2, `${label} ${unit.syllabusId}: fewer than two default-visible explanation paragraphs`);
    check(unit.materials.length >= 2 || lesson.kind === "review" || lesson.section === 2, `${label} ${unit.syllabusId ?? lesson.syllabusIds.join("+")}: insufficient teaching materials`);
    check(unit.materials.some((material) => material.type === "worked-example") || lesson.kind === "review" || lesson.section === 2, `${label} ${unit.syllabusId ?? lesson.syllabusIds.join("+")}: complete worked example missing`);
    check(unit.misconceptions.length >= 1, `${label} ${unit.syllabusId}: misconception guidance missing`);
    for (const material of unit.materials) {
      check(material.objectiveIds.length > 0 || lesson.kind === "review", `${label} ${unit.syllabusId}: material ${material.title} has no objective mapping`);
      if (material.type === "table") check(material.headers.length >= 2 && material.rows.length >= 1, `${label} ${unit.syllabusId}: empty comparison/decision table`);
      if (material.type === "flow") check(material.steps.length >= 3, `${label} ${unit.syllabusId}: process has fewer than three explicit steps`);
      if (material.type === "worked-example") {
        check(material.steps.length >= 2, `${label} ${unit.syllabusId}: worked example has fewer than two steps`);
        check(!material.steps.some(([, text]) => text.endsWith("…")), `${label} ${unit.syllabusId}: worked example is visibly truncated`);
      }
      if (material.type === "reviewed-visual") {
        check(material.review.includes("approved"), `${label} ${unit.syllabusId}: visual lacks human approval state`);
        check(material.alt.length >= 40 && material.facts.length >= 2, `${label} ${unit.syllabusId}: visual lacks precise alt/fact evidence`);
      }
      if (material.type === "analogy") check(material.boundary.length >= 50, `${label} ${unit.syllabusId}: analogy boundary is missing or too short`);
    }
  }
  if (lesson.kind === "teaching") for (const [objectiveId, description] of lesson.objectives) {
    const explanationUnits = lesson.units.filter((unit) => unit.objectiveIds.includes(objectiveId));
    const materialTitles = lesson.units.flatMap((unit) => unit.materials.filter((material) => material.objectiveIds.includes(objectiveId)).map((material) => material.title));
    const questionIds = lesson.practice.filter((question) => question.objectiveIds.includes(objectiveId)).map((question) => question.id);
    check(description.length >= 20, `${label} ${objectiveId}: objective is not teachable prose`);
    check(explanationUnits.length >= 1, `${label} ${objectiveId}: no default-visible explanation mapping`);
    check(materialTitles.length >= 1, `${label} ${objectiveId}: no teaching-material mapping`);
    check(questionIds.length >= 1, `${label} ${objectiveId}: no practice mapping`);
  }
}

for (const asset of contract.assets) {
  const path = join(root, asset.path);
  check(existsSync(path), `Missing asset ${asset.path}`);
  if (!existsSync(path)) continue;
  check(statSync(path).size > 20_000, `Asset ${asset.path} is suspiciously small or blank`);
  check(sha256(path) === asset.sha256, `Asset hash changed without regenerating contract: ${asset.path}`);
  const dimensions = imageDimensions(path);
  check(dimensions && dimensions.width >= 1000 && dimensions.height >= 500, `Asset ${asset.path} has insufficient or unreadable dimensions`);
}
for (const reference of section2Sample.authority.referenceBooks) {
  const path = join(root, reference.path);
  check(existsSync(path), `Protected reference book is missing: ${reference.path}`);
  if (existsSync(path)) check(sha256(path) === reference.sha256, `Protected reference book changed: ${reference.path}`);
}
check(anchorManifest.assets.length === 11, `Expected 11 academic section anchors, found ${anchorManifest.assets.length}`);
for (const asset of anchorManifest.assets) {
  const path = join(root, asset.path);
  check(asset.review === "approved", `Section ${asset.section} anchor is not approved`);
  check(existsSync(path), `Missing section-anchor asset ${asset.path}`);
  if (existsSync(path)) check(sha256(path) === asset.sha256, `Section ${asset.section} anchor differs from reviewed manifest`);
  check(contract.assets.some((entry) => entry.path === asset.path), `Section ${asset.section} anchor is not used by the V3 course`);
  check(asset.reviewNotes.length >= 50, `Section ${asset.section} anchor lacks a substantive human review note`);
}
for (const rejected of anchorManifest.rejectedCandidates) check(!contract.assets.some((entry) => entry.path.includes(rejected.source.split("/").at(-1))), `Rejected candidate is referenced by the course: ${rejected.source}`);

const lessonText = (syllabusId) => courseV3Lessons.filter((lesson) => lesson.kind === "teaching" && lesson.syllabusIds.includes(syllabusId)).map((lesson) => lesson.units.filter((unit) => unit.syllabusId === syllabusId).map((unit) => `${unit.explanation.join(" ")} ${unit.materials.map((material) => JSON.stringify(material)).join(" ")}`).join(" ")).join(" ");
const practiceText = (syllabusId) => courseV3Lessons.filter((lesson) => lesson.kind === "teaching" && lesson.syllabusIds.includes(syllabusId)).flatMap((lesson) => lesson.practice.filter((question) => question.objectiveIds.some((id) => id.startsWith(`${syllabusId}.`))).map((question) => `${question.prompt} ${question.answerPoints.join(" ")}`)).join(" ");
const s110 = lessonText("S1.10");
check(!/vector file/i.test(s110), "Regression: vector-compression content polluted S1.10 sound sampling");
for (const term of ["analogue", "sample", "quantis", "sampling rate", "sampling resolution", "file size"]) check(s110.toLowerCase().includes(term), `S1.10 missing ${term}`);
const s111 = `${lessonText("S1.11")} ${practiceText("S1.11")}`.toLowerCase();
for (const term of ["lossless", "lossy", "rle", "count", "decode", "text", "bitmap", "vector", "sound"]) check(s111.includes(term), `S1.11 missing ${term}`);
const s303 = `${lessonText("S3.03")} ${practiceText("S3.03")}`.toLowerCase();
for (const term of ["laser printer", "3d printer", "microphone", "speaker", "magnetic hard", "flash", "optical disc", "touchscreen", "virtual-reality"]) check(s303.includes(term), `S3.03 missing ${term}`);
const s310 = `${lessonText("S3.10")} ${practiceText("S3.10")}`.toLowerCase();
for (const term of ["not", "and", "or", "nand", "nor", "xor", "truth table", "logic circuit", "logic expression", "problem statement"]) check(s310.includes(term), `S3.10 missing ${term}`);
const s811 = practiceText("S8.11").toUpperCase();
for (const term of ["INSERT INTO", "UPDATE", "DELETE FROM", "WHERE"]) check(s811.includes(term), `S8.11 practice missing ${term}`);
const s1107 = `${lessonText("S11.07")} ${practiceText("S11.07")}`;
for (const term of ["FUNCTION", "RETURNS", "RETURN", "Price * 0.20", "expression"]) check(s1107.includes(term), `S11.07 missing ${term}`);
check(!/returns Price 0\.20/.test(s1107), "Regression: multiplication operator was removed from function example");
const s1102 = `${lessonText("S11.02")} ${practiceText("S11.02")}`;
for (const term of ["Tax <- Price * TaxRate", "Total <- Price * Quantity", "Age >= 18", "<-", "*", "DIV", "MOD"]) check(s1102.includes(term), `S11.02 declaration/expression teaching missing ${term}`);
check(s1102.includes("Correct the incomplete pseudocode statement Tax <- Price TaxRate") && s1102.includes("Tax <- Price * TaxRate"), "S11.02 correction task does not expose and repair the missing multiplication operator");
const s909 = `${lessonText("S9.09")} ${practiceText("S9.09")}`;
for (const term of ["<>", "<=", ">=", "AND", "OR", "NOT"]) check(s909.includes(term), `S9.09 logic-statement teaching missing ${term}`);
check(!/<=,\s*,\s*=\s*or\s*</.test(s909), "Regression: comparison operators were stripped from the S9.09 answer");
const s1204 = `${lessonText("S12.04")} ${practiceText("S12.04")}`;
check(s1204.includes("Mark < 50") && s1204.includes("Mark >= 50"), "S12.04 boundary comparison operators are missing");
const unitSurface = (syllabusId) => courseV3Lessons.filter((lesson) => lesson.kind === "teaching" && lesson.syllabusIds.includes(syllabusId)).flatMap((lesson) => lesson.units.filter((unit) => unit.syllabusId === syllabusId).map((unit) => `${unit.misconceptions.join(" ")} ${lesson.summary.filter(([heading]) => heading.startsWith(syllabusId)).flat().join(" ")}`)).join(" ");
check(!/register earns its name/i.test(unitSurface("S4.09")), "Regression: assembler summary inherited a CPU-register misconception");
check(!/lifecycle as a fixed checklist/i.test(unitSurface("S12.05")), "Regression: testing summary inherited a lifecycle misconception");
check(!/interpreters are 'bad compilers'/i.test(unitSurface("S5.01")), "Regression: operating-system summary inherited a translator misconception");
check(!/choose names as primary keys/i.test(unitSurface("S8.07")), "Regression: DDL/DML summary inherited a key-selection misconception");
check(!/working Java automatically/i.test(unitSurface("S11.06")), "Regression: procedures summary inherited a generic Java misconception");

const css = readFileSync(join(root, "web", "course-v3", "course.css"), "utf8");
check(css.includes("@media (max-width: 520px)"), "390px/mobile CSS breakpoint is missing");
check(css.includes("overflow-x:auto") || css.includes("overflow-x: auto"), "Responsive internal material scrolling is missing");
check(existsSync(join(root, "web", "course-v3", "index.html")), "Whole-course index is missing");
for (const section of Object.keys(sectionMeta)) check(existsSync(join(root, "web", "course-v3", `section-${section}`, "index.html")), `Section ${section} index is missing`);

if (process.argv.includes("--self-test")) {
  const completeStages = stageNames.map((stage) => `data-stage="${stage}"`).join(" ");
  const mutations = [
    !stageNames.every((stage) => completeStages.replace('data-stage="2-knowledge-explanation"', "").includes(`data-stage="${stage}"`)),
    !["lossless", "lossy", "text", "bitmap", "vector", "sound", "rle"].every((term) => s111.replace(/rle/gi, "").includes(term)),
    !["laser printer", "3d printer", "microphone", "speaker", "magnetic hard", "flash", "optical disc", "touchscreen", "virtual-reality"].every((term) => s303.replace(/touchscreen/gi, "").includes(term)),
    !["nand", "nor", "xor"].every((term) => s310.replace(/xor/gi, "").includes(term)),
    !["INSERT INTO", "UPDATE", "DELETE FROM"].every((term) => s811.replace(/DELETE FROM/g, "").includes(term)),
    !["FUNCTION", "RETURN", "Price * 0.20"].every((term) => s1107.replaceAll("Price * 0.20", "Price 0.20").includes(term)),
    !("Comparison content without table".includes('data-material-type="table"')),
    !("Process content without steps".includes('data-material-type="flow"')),
    hasRootRelativeAsset('<img src="/assets/broken-on-project-pages.png" alt="test">'),
  ];
  check(mutations.every(Boolean), "Verifier negative-regression self-test did not reject every mutation");
  if (mutations.every(Boolean)) console.log(`Course V3 verifier self-test: ${mutations.length} negative mutations rejected.`);
}

if (errors.length) {
  console.error(`Course V3 verification failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Course V3 verified: ${courseV3Meta.lessonCount} lessons, ${seenRequirements.size} requirements, ${contract.lessons.reduce((count, lesson) => count + lesson.objectives.length, 0)} objective instances, ${contract.assets.length} reviewed assets.`);
