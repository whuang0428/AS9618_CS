import fs from "node:fs";
import path from "node:path";
import { repairs } from "./stage2-repairs-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const occurrence = (text, needle) => text.split(needle).length - 1;

expect(repairs.length === 46, `expected 46 repaired lessons, found ${repairs.length}`);
expect(new Set(repairs.map((item) => item.lesson)).size === 46, "repair lesson numbers must be unique");
expect(new Set(repairs.flatMap((item) => item.rows)).size === 53, "expected 53 unique repaired audit rows");

for (const repair of repairs) {
  const number = String(repair.lesson).padStart(3, "0");
  const webDir = path.join(root, "web", `lesson-${number}`);
  const html = fs.readFileSync(path.join(webDir, "index.html"), "utf8");
  const css = fs.readFileSync(path.join(webDir, "styles.css"), "utf8");
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  const markdown = fs.readFileSync(path.join(root, "lessons", markdownName), "utf8");

  expect(repair.explanation.length >= 2, `L${number}: fewer than two explanation paragraphs`);
  expect(repair.practice.length >= 3, `L${number}: fewer than three targeted practice items`);
  expect(repair.marks.length >= 4, `L${number}: fewer than four marking points`);
  expect(repair.strict.startsWith("Do not"), `L${number}: strict note must begin Do not`);
  expect(occurrence(html, "Stage 2 syllabus completion") === 1, `L${number}: HTML completion module count is not one`);
  expect(occurrence(html, 'id="stage2-completion"') === 1, `L${number}: HTML completion id count is not one`);
  expect(html.includes("<summary>Show MS</summary>"), `L${number}: expandable MS missing`);
  expect(html.includes("<summary>Show answer</summary>"), `L${number}: expandable answers missing`);
  expect(occurrence(css, "/* Stage 2 syllabus completion */") === 1, `L${number}: CSS completion block count is not one`);
  expect(occurrence(markdown, "## Stage 2 syllabus completion") === 1, `L${number}: Markdown completion module count is not one`);
  for (const row of repair.rows) {
    expect(html.includes(row), `L${number}: audit row ${row} missing from HTML`);
    expect(markdown.includes(row), `L${number}: audit row ${row} missing from Markdown`);
  }
}

const audit = fs.readFileSync(path.join(root, "syllabus-audit.md"), "utf8");
const auditRows = audit.split("\n").filter((line) => /^\| S\d+\.\d+ \|/.test(line));
expect(auditRows.length === 121, `audit should contain 121 rows, found ${auditRows.length}`);
expect(auditRows.every((line) => line.split("|")[5].trim() === "Complete"), "all audit rows must be Complete");
expect(auditRows.every((line) => line.split("|")[6].trim() === "-"), "all audit actions must be closed");
expect(!audit.includes("53 rows require repair"), "audit still claims rows require repair");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Stage 2 verification passed: 46 lessons, 53 repaired rows, 121 complete audit rows.");
