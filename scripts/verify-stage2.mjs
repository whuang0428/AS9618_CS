import fs from "node:fs";
import path from "node:path";
import { stage3CoreRepairs as repairs } from "./remediation-v2-stage3-sequence-plan.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const occurrence = (text, needle) => text.split(needle).length - 1;

const repairLessons = new Set(repairs.map((item) => item.lesson));
const repairedRows = new Set(repairs.flatMap((item) => item.rows));
expect(repairs.length === repairLessons.size, "repair lesson numbers must be unique");
expect(repairedRows.size > 0, "repair data must map to at least one coverage contract row");

for (let lesson = 1; lesson <= 150; lesson += 1) {
  const number = String(lesson).padStart(3, "0");
  const webDir = path.join(root, "web", `lesson-${number}`);
  const html = fs.readFileSync(path.join(webDir, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(webDir, "styles.css"), "utf8");
  const markdownNames = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  expect(markdownNames.length === 1, `L${number}: expected one Markdown lesson, found ${markdownNames.length}`);
  if (markdownNames.length !== 1) continue;
  const markdown = fs.readFileSync(path.join(root, "lessons", markdownNames[0]), "utf8");
  const expected = repairLessons.has(lesson);
  expect(occurrence(html, 'id="stage2-completion"') === (expected ? 1 : 0), `L${number}: ${expected ? "missing or duplicate" : "orphan"} HTML completion module`);
  expect(occurrence(html, 'href="#stage2-completion"') === (expected ? 1 : 0), `L${number}: ${expected ? "missing or duplicate" : "orphan"} completion navigation link`);
  expect(occurrence(css, "/* Stage 2 syllabus completion:start */") === (expected ? 1 : 0), `L${number}: ${expected ? "missing or duplicate" : "orphan"} completion CSS block`);
  expect(occurrence(markdown, "<!-- stage2-completion:start -->") === (expected ? 1 : 0), `L${number}: ${expected ? "missing or duplicate" : "orphan"} Markdown completion module`);
}

for (const repair of repairs) {
  const number = String(repair.lesson).padStart(3, "0");
  const webDir = path.join(root, "web", `lesson-${number}`);
  const html = fs.readFileSync(path.join(webDir, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(webDir, "styles.css"), "utf8");
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  const markdown = fs.readFileSync(path.join(root, "lessons", markdownName), "utf8");

  expect(repair.explanation.length >= 2, `L${number}: fewer than two explanation paragraphs`);
  expect(repair.practice.length >= 2, `L${number}: fewer than two targeted practice items`);
  expect(repair.marks.length >= 2, `L${number}: fewer than two marking points`);
  expect(repair.strict.startsWith("Do not"), `L${number}: strict note must begin Do not`);
  expect(occurrence(html, ">Core syllabus content<") >= 1, `L${number}: student-facing core-content label missing`);
  expect(!html.includes("Official audit rows:"), `L${number}: internal audit rows are visible in HTML`);
  expect(occurrence(html, 'id="stage2-completion"') === 1, `L${number}: HTML completion id count is not one`);
  expect(html.includes("<summary>Show MS</summary>"), `L${number}: expandable MS missing`);
  expect(html.includes("<summary>Show answer</summary>"), `L${number}: expandable answers missing`);
  expect(occurrence(css, "/* Stage 2 syllabus completion:start */") === 1, `L${number}: CSS completion block count is not one`);
  expect(occurrence(markdown, "## Core syllabus content") === 1, `L${number}: Markdown completion module count is not one`);
}

const contract = JSON.parse(fs.readFileSync(path.join(root, "scripts", "syllabus-coverage-contract.json"), "utf8"));
const contractIds = new Set(contract.requirements.map((item) => item.id));
expect(contract.requirements.length === 121, `coverage contract should contain 121 rows, found ${contract.requirements.length}`);
for (const row of repairedRows) expect(contractIds.has(row), `repair row ${row} is missing from the coverage contract`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Stage 2 verification passed: ${repairs.length} lessons, ${repairedRows.size} mapped contract rows, ${contract.requirements.length} total contract rows.`);
