import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { scanVisualSemanticHashes, sha256 } from "./visual-semantic-hash.mjs";
import { semanticDefects } from "./stage10-semantic-audit-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baselineCommit = "fb631b27137200bf90e6a29528fc5a461c1b7c9b";
const ledger = JSON.parse(fs.readFileSync(path.join(root, "audits", "visual-semantic-review-ledger.json"), "utf8"));
const remediation = JSON.parse(fs.readFileSync(path.join(root, "audits", "visual-semantic-remediation-register.json"), "utf8"));
const repairFacts = JSON.parse(fs.readFileSync(path.join(root, "scripts", "stage10-visual-repair-facts.json"), "utf8"));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const removedKeys = new Set(["033/explanation-loop-img-1", "098/explanation-pseudocode-img-1", "099/explanation-pseudocode-img-1"]);
const keyMigrations = new Map([
  ["100/explanation-equivalence-img-1", "101/explanation-equivalence-img-1"],
  ["100/explanation-flowcharts-img-1", "101/explanation-flowcharts-img-1"],
  ["100/explanation-notation-img-1", "101/explanation-notation-img-1"],
  ["100/explanation-pseudocode-img-1", "101/explanation-pseudocode-img-1"],
  ["100/explanation-structure-tool-img-1", "101/explanation-structure-tool-img-1"],
  ["100/explanation-symbol-tool-img-1", "101/explanation-symbol-tool-img-1"],
  ["101/explanation-dry-run-img-1", "102/explanation-dry-run-img-1"],
  ["101/explanation-loops-img-1", "102/explanation-loops-img-1"],
  ["101/explanation-predictor-img-1", "102/explanation-predictor-img-1"],
  ["101/explanation-pseudocode-img-1", "102/explanation-pseudocode-img-1"],
  ["101/explanation-trace-table-img-1", "102/explanation-trace-table-img-1"],
  ["102/explanation-combining-img-1", "100/explanation-combining-img-1"],
  ["102/explanation-iteration-img-1", "100/explanation-iteration-img-1"],
  ["102/explanation-pseudocode-img-1", "100/explanation-pseudocode-img-1"],
  ["102/explanation-selection-img-1", "100/explanation-selection-img-1"],
  ["102/explanation-sequence-img-1", "100/explanation-sequence-img-1"],
]);
const curriculumChangeKeys = new Set([
  "004/explanation-method-img-1",
  "033/explanation-embedded-img-1",
  "098/explanation-concept-img-1",
  "098/explanation-model-img-1",
  "098/explanation-constraints-img-1",
  "099/explanation-decomposition-img-1",
  "099/explanation-abstraction-img-1",
  "099/explanation-pattern-img-1",
  "100/overview-div-1",
  "101/overview-div-1",
  "102/overview-div-1",
]);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  const [headers, ...data] = rows;
  return data.filter((values) => values.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

const gitCache = new Map();
function gitBlob(relativePath) {
  if (!gitCache.has(relativePath)) {
    gitCache.set(relativePath, execFileSync("git", ["show", `${baselineCommit}:${relativePath}`], { cwd: root }));
  }
  return gitCache.get(relativePath);
}

const canonicalKeys = new Set(ledger.records.map((record) => record.key));
const rawBaselineRows = scanVisualSemanticHashes(
  (relativePath) => gitBlob(relativePath).toString("utf8"),
  (relativePath) => gitBlob(relativePath),
);
const baselineRows = rawBaselineRows
  .filter((record) => !removedKeys.has(record.key))
  .map((record) => ({ ...record, key: keyMigrations.get(record.key) ?? record.key }))
  .filter((record) => canonicalKeys.has(record.key));
const currentRows = scanVisualSemanticHashes(
  (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8"),
  (relativePath) => fs.readFileSync(path.join(root, relativePath)),
).filter((record) => canonicalKeys.has(record.key));
const baselineByKey = new Map(baselineRows.map((row) => [row.key, row]));
const currentByKey = new Map(currentRows.map((row) => [row.key, row]));
const remediationKeys = new Set(remediation.records.map((record) => record.key));
const htmlRemediationKeys = new Set(remediation.records.filter((record) => record.visualType === "HTML/CSS").map((record) => record.key));
const effectiveHash = (record) => htmlRemediationKeys.has(record.key) ? record.sectionHash : record.semanticHash;

assert(ledger.records.length === 965, `Review ledger count is ${ledger.records.length}, expected 965.`);
assert(baselineRows.length === 965, `Migrated baseline scan count is ${baselineRows.length}, expected 965.`);
assert(currentRows.length === 965, `Current scan count is ${currentRows.length}, expected 965.`);
assert(remediation.records.length === 66, `Remediation count is ${remediation.records.length}, expected 66.`);
assert(Object.keys(repairFacts).length === 60, `Stage 10 repair-fact count is ${Object.keys(repairFacts).length}, expected 60.`);
assert(remediation.records.filter((record) => record.visualType === "Stage 10 JPG").length === 60, "Expected 60 Stage 10 JPG remediations.");
assert(remediation.records.filter((record) => record.visualType === "HTML/CSS").length === 6, "Expected 6 HTML/CSS remediations.");

const currentDefects = semanticDefects.filter((defect) => defect.id.startsWith("S10-2026-"));
const historicalDefects = semanticDefects.filter((defect) => !defect.id.startsWith("S10-2026-"));
assert(currentDefects.length === 60, `Current Stage 10 defect count is ${currentDefects.length}, expected 60.`);
assert(historicalDefects.length === 78, `Historical Stage 10 defect count is ${historicalDefects.length}, expected 78.`);
assert(currentDefects.every((defect) => defect.resolved === true), "A current Stage 10 semantic defect is not resolved.");
assert(historicalDefects.every((defect) => defect.resolved === true), "A historical Stage 10 semantic defect has regressed.");

const methods = ledger.records.reduce((counts, record) => {
  const key = record.stage10 ? "stage10Jpg" : record.method === "HTML/CSS" || record.method === "Canvas" || record.method === "CSS pseudo-element" ? "htmlCss" : record.method === "Inline SVG" ? "inlineSvg" : "otherRaster";
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
for (const [name, expected] of Object.entries({ stage10Jpg: 779, htmlCss: 170, inlineSvg: 13, otherRaster: 3 })) {
  assert(methods[name] === expected, `${name} count is ${methods[name]}, expected ${expected}.`);
}

let changed = 0;
let unchanged = 0;
let moved = 0;
const movedKeys = new Set(keyMigrations.values());
for (const baseline of baselineRows) {
  const current = currentByKey.get(baseline.key);
  assert(Boolean(current), `Missing current visual ${baseline.key}.`);
  if (!current) continue;
  const didChange = effectiveHash(current) !== effectiveHash(baseline);
  if (movedKeys.has(baseline.key)) {
    moved += 1;
    assert(current.assetSha256 === baseline.assetSha256, `Moved visual asset bytes changed unexpectedly: ${baseline.key}.`);
  } else if (remediationKeys.has(baseline.key) || curriculumChangeKeys.has(baseline.key)) {
    changed += didChange ? 1 : 0;
    assert(didChange, `Approved visual correction did not change: ${baseline.key}.`);
  } else {
    unchanged += didChange ? 0 : 1;
    assert(!didChange, `Unapproved visual drift: ${baseline.key}.`);
  }
}
assert(changed === 77, `Changed approved visuals: ${changed}, expected 77.`);
assert(moved === 16, `Moved Stage 10 visuals: ${moved}, expected 16.`);
assert(unchanged === 872, `Unchanged visual hashes: ${unchanged}, expected 872.`);

for (const record of remediation.records) {
  const before = baselineByKey.get(record.key);
  const after = currentByKey.get(record.key);
  assert(record.resolved === true, `Unresolved remediation: ${record.key}.`);
  assert(record.pass1?.status === "passed" && record.pass1.evidence, `Missing pass 1 evidence: ${record.key}.`);
  assert(record.pass2?.status === "passed" && record.pass2.evidence, `Missing pass 2 evidence: ${record.key}.`);
  assert(record.reconciliation === "agreed", `Unreconciled remediation: ${record.key}.`);
  assert(record.beforeSemanticHash === (before ? effectiveHash(before) : ""), `Before semantic hash mismatch: ${record.key}.`);
  assert(record.afterSemanticHash === (after ? effectiveHash(after) : ""), `After semantic hash mismatch: ${record.key}.`);
  if (record.visualType === "Stage 10 JPG") {
    assert(record.beforeAssetSha256 === before?.assetSha256, `Before asset hash mismatch: ${record.key}.`);
    assert(record.afterAssetSha256 === after?.assetSha256, `After asset hash mismatch: ${record.key}.`);
  }
}

const normalize = (value) => String(value).replace(/\s+/g, " ").trim();
const htmlText = (value) => normalize(String(value).replace(/<[^>]+>/g, " ").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&amp;", "&"));
for (const [key, facts] of Object.entries(repairFacts)) {
  const [lesson] = key.split("/");
  const html = htmlText(fs.readFileSync(path.join(root, `web/lesson-${lesson}/index.html`), "utf8"));
  const markdownPath = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = normalize(fs.readFileSync(path.join(root, "lessons", markdownPath), "utf8"));
  for (const fact of facts) {
    assert(html.includes(normalize(fact)), `HTML source fact missing for ${key}: ${fact}`);
    assert(markdown.includes(normalize(fact)), `Markdown source fact missing for ${key}: ${fact}`);
  }
}

const ocrRows = parseCsv(fs.readFileSync(path.join(root, "audits", "stage10-ocr-wording.csv"), "utf8"));
const repairFilenames = new Set(Object.keys(repairFacts).map((key) => {
  const [lesson, target] = key.split("/");
  return `stage10-lesson-${lesson}-${target}.jpg`;
}));
assert(ocrRows.length === 779, `OCR ledger count is ${ocrRows.length}, expected 779.`);
assert(ocrRows.filter((row) => row.status === "Clear").length === 719, "Expected 719 unchanged OCR rows with Clear status.");
assert(ocrRows.filter((row) => row.status === "Source transcript verified").length === 60, "Expected 60 repaired OCR rows with source-transcript verification.");
assert(ocrRows.every((row) => row.status === "Clear" || row.status === "Source transcript verified"), "OCR ledger contains a failed or unresolved status.");
assert(new Set(ocrRows.map((row) => row.file)).size === 779, "OCR ledger contains duplicate filenames.");
for (const row of ocrRows.filter((entry) => entry.status === "Source transcript verified")) {
  assert(repairFilenames.has(row.file), `Unexpected source-transcript OCR row: ${row.file}.`);
  assert(row.ocr_sha256 === sha256(row.ocr_text.replaceAll(" | ", "\n")), `OCR ledger transcript hash mismatch: ${row.file}.`);
  assert(Boolean(row.ocr_text.trim()), `OCR ledger transcript is empty: ${row.file}.`);
}

// Independently recomputable facts that previously failed semantic review.
const fullAdderExpected = new Map([
  ["000", "00"], ["001", "10"], ["010", "10"], ["011", "01"],
  ["100", "10"], ["101", "01"], ["110", "01"], ["111", "11"],
]);
for (let a = 0; a <= 1; a += 1) {
  for (let b = 0; b <= 1; b += 1) {
    for (let carryIn = 0; carryIn <= 1; carryIn += 1) {
      const total = a + b + carryIn;
      const key = `${a}${b}${carryIn}`;
      assert(fullAdderExpected.get(key) === `${total % 2}${Math.floor(total / 2)}`, `Full-adder assertion failed for ${key}.`);
    }
  }
}
const binaryFraction = (bits) => [...bits].reduce((sum, bit, index) => sum + Number(bit) * 2 ** -(index + 1), 0);
assert(binaryFraction("1010") === 0.625, "0.1010 binary recomputation failed.");
assert(binaryFraction("1100") === 0.75, "0.1100 binary recomputation failed.");
const bubbleInput = [1, 4, 2, 5, 8];
let bubbleSwaps = 0;
for (let index = 0; index < bubbleInput.length - 1; index += 1) {
  if (bubbleInput[index] > bubbleInput[index + 1]) {
    [bubbleInput[index], bubbleInput[index + 1]] = [bubbleInput[index + 1], bubbleInput[index]];
    bubbleSwaps += 1;
  }
}
assert(bubbleSwaps === 1 && bubbleInput.join(",") === "1,2,4,5,8", "Bubble-sort pass recomputation failed.");
assert(repairFacts["104/binary"].join("\n").includes("DIV 2"), "Binary-search midpoint does not use DIV.");

for (const key of ["113/user-defined", "118/declare", "118/pseudocode", "119/declare", "123/pseudocode", "123/record", "125/declare", "125/files"]) {
  const facts = repairFacts[key].join("\n");
  assert(facts.includes("TYPE ") && facts.includes("ENDTYPE"), `Record declaration is not closed in ${key}.`);
}
for (const key of ["117/update", "137/purpose", "138/purpose"]) {
  assert(repairFacts[key].join("\n").includes("ENDIF"), `Selection is not closed in ${key}.`);
}
assert(repairFacts["123/array"].join("\n").includes("Total <- 0") && repairFacts["123/array"].join("\n").includes("NEXT Index"), "Accumulator initialisation or loop termination is missing.");
assert(repairFacts["085/aggregates"].join("\n").includes("COUNT(*) counts all rows") && repairFacts["085/aggregates"].join("\n").includes("COUNT(column) counts only non-null"), "SQL COUNT semantics are incomplete.");

const oldStringChecks = [
  ["web/lesson-060/index.html", "High-level source to object/executable code"],
  ["web/lesson-107/index.html", "A string is a queue of characters"],
  ["web/lesson-142/index.html", "analysis, design, implementation, testing, evaluation and maintenance"],
];
for (const [relativePath, oldString] of oldStringChecks) {
  assert(!fs.readFileSync(path.join(root, relativePath), "utf8").includes(oldString), `Old error string remains in ${relativePath}: ${oldString}`);
}

const renderDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "as9618-semantic-render-"));
try {
  const keys = Object.keys(repairFacts).join(",");
  execFileSync("python3", [path.join(root, "scripts", "render-stage10-critical-repairs.py"), "--keys", keys, "--output-dir", renderDirectory], { cwd: root, stdio: "pipe" });
  for (const key of Object.keys(repairFacts)) {
    const [lesson, target] = key.split("/");
    const filename = `stage10-lesson-${lesson}-${target}.jpg`;
    const rendered = fs.readFileSync(path.join(renderDirectory, filename));
    const applied = fs.readFileSync(path.join(root, "web", "assets", "diagrams", "stage10-infographics", filename));
    assert(sha256(rendered) === sha256(applied), `Renderer output differs from applied asset: ${key}.`);
  }
} finally {
  fs.rmSync(renderDirectory, { recursive: true, force: true });
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Visual semantic remediation verified: 965 current records, 77 approved changes, 16 content-preserving moves, 872 unchanged visuals, 78 historical defects clear and 779 OCR rows aligned.");
