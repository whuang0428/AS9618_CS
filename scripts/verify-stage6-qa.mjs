import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pageAssets, pageDefinitions, pageHash, read, root } from "./stage6-qa-utils.mjs";

function fail(message) {
  throw new Error(message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function occurrences(source, token) {
  return source.split(token).length - 1;
}

function parseCsv(source) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (quoted && character === '"' && source[index + 1] === '"') { cell += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { row.push(cell); cell = ""; }
    else if (character === "\n" && !quoted) { row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; }
    else if (character !== "\r") cell += character;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function resolveLocalTarget(htmlPath, reference) {
  const clean = reference.split(/[?#]/, 1)[0];
  if (!clean) return null;
  const resolved = path.normalize(path.join(path.dirname(htmlPath), clean));
  const absolute = path.join(root, resolved);
  if (fs.existsSync(absolute) && fs.statSync(absolute).isDirectory()) return path.join(absolute, "index.html");
  return absolute;
}

expect(pageDefinitions.length === 154, "Stage 6 must inventory 151 lessons and three hub pages");

for (const definition of pageDefinitions) {
  const html = read(definition.html);
  expect(/<!doctype html>/i.test(html), `${definition.page}: missing HTML doctype`);
  expect(/<html\b[^>]*\blang="en"/i.test(html), `${definition.page}: missing English document language`);
  expect(/<meta\b[^>]*\bname="viewport"/i.test(html), `${definition.page}: missing viewport meta tag`);
  expect(/<title>[^<]+<\/title>/i.test(html), `${definition.page}: missing page title`);
  expect(occurrences(html, "<h1") === 1, `${definition.page}: expected exactly one h1`);
  expect(occurrences(html, "<main") === 1, `${definition.page}: expected exactly one main element`);
  expect(!html.includes("Student/Teacher mode split"), `${definition.page}: internal audience split is visible`);
  expect(!html.includes("Teacher Rule"), `${definition.page}: teacher-facing rule is visible`);
  expect(!html.includes("<strong>Guidance:</strong>"), `${definition.page}: marker-only guidance is visible`);
  expect(!html.includes("<strong>Marking:</strong>"), `${definition.page}: marker-only instructions are visible`);

  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
    expect(ids.has(match[1]), `${definition.page}: fragment #${match[1]} has no target`);
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:[a-z]+:|#|\/\/)/i.test(reference)) continue;
    const target = resolveLocalTarget(definition.html, reference);
    expect(target && fs.existsSync(target), `${definition.page}: local reference does not resolve: ${reference}`);
  }

  for (const asset of pageAssets(definition)) {
    expect(fs.existsSync(path.join(root, asset)), `${definition.page}: missing page asset ${asset}`);
  }

  if (definition.kind === "lesson") {
    expect(occurrences(html, '<link rel="stylesheet" href="../stage6-qa.css?v=10" />') === 1,
      `${definition.page}: Stage 6 responsive stylesheet link count is not one`);
    expect(!html.includes('class="teaching-cue"'), `${definition.page}: teacher-facing cue is visible`);
    expect(!/<p class="eyebrow">(?:Syllabus coverage audit|Coverage audit)<\/p>/.test(html),
      `${definition.page}: internal coverage audit is visible`);
    expect(!html.includes("Official audit rows:"), `${definition.page}: internal audit row identifiers are visible`);

    const appPath = path.join(path.dirname(definition.html), "app.js");
    expect(!/\b(?:question|item)\.strict\.map\(/.test(read(appPath)),
      `${definition.page}: marker-only strict notes are rendered`);
  }
}

const stage6Css = read("web/stage6-qa.css");
expect(stage6Css.includes("Stage 6 full-page visual QA fixes"), "Stage 6 stylesheet marker is missing");
expect(stage6Css.includes(".lesson-content *"), "Stage 6 stylesheet must keep nested lesson content shrinkable");
expect(stage6Css.includes("overflow-x: auto"), "Stage 6 stylesheet must contain long pseudocode horizontally");
expect(stage6Css.includes("repeat(auto-fit"), "Stage 6 stylesheet must let reduced guidance grids fill available width");
expect(stage6Css.includes(".hero > :not(.hero-copy)"), "Stage 6 stylesheet must remove oversized hero-visual minimum heights");
expect(stage6Css.includes("table.mark-scheme-table") && stage6Css.includes("table-layout: fixed"), "Stage 6 stylesheet must contain real mark-scheme tables on narrow screens");
expect(stage6Css.includes(".explanation-sr-only") && stage6Css.includes("word-break: break-word"), "Stage 6 stylesheet must wrap long accessible transcript tokens");

const scripts = [
  "web/index.js",
  "web/assessments/app.js",
  ...Array.from({ length: 151 }, (_, index) => `web/lesson-${String(index + 1).padStart(3, "0")}/app.js`),
];
for (const script of scripts) {
  execFileSync(process.execPath, ["--check", path.join(root, script)], { stdio: "pipe" });
}

const registerPath = path.join(root, "audits", "stage6-page-review-register.csv");
expect(fs.existsSync(registerPath), "Stage 6 page review register is missing");
const registerRows = parseCsv(fs.readFileSync(registerPath, "utf8"));
const header = registerRows.shift();
expect(header?.join(",") === "page,kind,desktop_1440,mobile_390,console,status,content_hash,reviewer,review_round,evidence,approval_source", "Stage 6 register header is invalid");
expect(registerRows.length === pageDefinitions.length, "Stage 6 register page count is invalid");
const register = new Map(registerRows.map((cells) => {
  expect(cells.length === 11, `Stage 6 register row is invalid: ${cells.join("|")}`);
  return [cells[0], cells];
}));
expect(register.size === pageDefinitions.length, "Stage 6 register contains duplicate pages");

for (const definition of pageDefinitions) {
  const row = register.get(definition.page);
  expect(row, `${definition.page}: missing from Stage 6 register`);
  expect(row[1] === definition.kind, `${definition.page}: incorrect page kind in register`);
  expect(row[2] === "Pass" && row[3] === "Pass" && row[4] === "Pass" && row[5] === "ApprovedCurrentBrowser",
    `${definition.page}: Stage 6 approvals are incomplete`);
  expect(row[6] === pageHash(definition), `${definition.page}: reviewed content hash has changed`);
  expect(row[7] && row[8] === "stage6-browser-r1" && row[9].includes("remediation-v2-stage6-browser-evidence.json") && row[10].includes("no legacy approval imported"), `${definition.page}: independent review metadata is incomplete`);
}

const browserEvidence = JSON.parse(read("audits/remediation-v2-stage6-browser-evidence.json"));
expect(browserEvidence.sourceApprovalImported === false && browserEvidence.pageCount === 154 && browserEvidence.viewportRecordCount === 308 && browserEvidence.failedRecords === 0, "Fresh Stage 6 browser evidence is incomplete");
expect(fs.existsSync(path.join(root, "audits", "remediation-v2-stage6-report.md")), "Current Stage 6 QA report is missing");
expect(read("README.md").includes("node scripts/verify-stage6-qa.mjs"), "README is missing the Stage 6 verifier command");

console.log("Stage 6 QA verification passed: 154 current-hash pages, 308 fresh viewport records, 153 JavaScript files, complete local links and no inherited approvals.");
