import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pageDefinitions, pageHash, read, root } from "./stage6-qa-utils.mjs";

const expect = (condition, message) => { if (!condition) throw new Error(message); };
const occurrences = (source, token) => source.split(token).length - 1;
expect(pageDefinitions.length === 154, "Stage 7 must inventory 151 lessons and three hub pages");
for (const definition of pageDefinitions) {
  const html = read(definition.html);
  const prefix = definition.page === "index" ? "./" : "../";
  expect(occurrences(html, '<a class="skip-link" href="#main-content">Skip to main content</a>') === 1, `${definition.page}: skip link count is not one`);
  expect(/<main\b(?=[^>]*\bid="main-content")(?=[^>]*\btabindex="-1")[^>]*>/i.test(html), `${definition.page}: main is not a focus target`);
  expect(occurrences(html, `<link rel="stylesheet" href="${prefix}stage7-accessibility.css?v=3"`) === 1, `${definition.page}: accessibility stylesheet count is not one`);
  expect(occurrences(html, `<script src="${prefix}stage7-accessibility.js?v=4"></script>`) === 1, `${definition.page}: accessibility script count is not one`);
  expect(!/\btabindex="[1-9]\d*"/i.test(html), `${definition.page}: positive tabindex found`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  expect(new Set(ids).size === ids.length, `${definition.page}: duplicate static IDs found`);
  for (const image of html.matchAll(/<img\b[^>]*>/gi)) expect(/\balt="[^"]*"/i.test(image[0]), `${definition.page}: image is missing alt text`);
}
const css = read("web/stage7-accessibility.css");
for (const marker of [":focus-visible", "prefers-reduced-motion: reduce", "forced-colors: active", ".skip-link"]) expect(css.includes(marker), `Stage 7 CSS marker missing: ${marker}`);
const runtime = read("web/stage7-accessibility.js");
for (const marker of ["aria-expanded", "aria-controls", "aria-hidden", 'role", "tab"', "aria-selected", "ArrowRight", "aria-labelledby", "aria-live", "aria-pressed", "zh-CN"]) expect(runtime.includes(marker), `Stage 7 runtime marker missing: ${marker}`);
execFileSync(process.execPath, ["--check", path.join(root, "web", "stage7-accessibility.js")], { stdio: "pipe" });

const browser = JSON.parse(read("audits/remediation-v2-stage7-browser-evidence.json"));
expect(browser.sourceApprovalImported === false && browser.oldApprovedRowsUsedForDecision === false, "Stage 7 inherited an old browser approval");
expect(browser.records.length === 308 && browser.failedRecords === 0, "Stage 7 current-browser matrix is incomplete");
expect(browser.keyboard?.status === "PassedSystemKeyboard" && browser.keyboard.checks.length === 8 && browser.keyboard.checks.every(({ status }) => status === "Pass"), "Stage 7 real keyboard evidence is incomplete");
const evidenceByKey = new Map(browser.records.map((row) => [`${row.page}/${row.viewport}`, row]));
const lines = read("audits/stage7-accessibility-register.csv").trim().split("\n");
expect(lines.shift() === "page,semantics,keyboard,contrast,language,status,content_hash,reviewer,review_round,evidence", "Stage 7 register header is invalid");
expect(lines.length === 154, "Stage 7 register count is invalid");
for (const line of lines) {
  const cells = line.split(",");
  expect(cells.length === 10, `Invalid Stage 7 register row: ${line}`);
  const definition = pageDefinitions.find(({ page }) => page === cells[0]);
  expect(definition, `${cells[0]}: unknown register page`);
  const currentHash = pageHash(definition);
  expect(cells.slice(1, 5).every((cell) => cell === "Pass") && cells[5] === "ReviewedCurrentBrowser", `${cells[0]}: page review is incomplete`);
  expect(cells[6] === currentHash && cells[7] === "Codex independent final gate" && cells[8] === "remediation-v2-stage7-r1", `${cells[0]}: review provenance or hash is stale`);
  for (const viewport of ["1440x900", "390x844"]) expect(evidenceByKey.get(`${cells[0]}/${viewport}`)?.sourceHash === currentHash, `${cells[0]}/${viewport}: browser evidence is stale`);
}
expect(fs.existsSync(path.join(root, "audits", "stage7-accessibility-report.md")), "Stage 7 report is missing");
console.log("Stage 7 accessibility verification passed: 154 current-hash pages, 308 live viewport records and 8 real system-keyboard flows.");
