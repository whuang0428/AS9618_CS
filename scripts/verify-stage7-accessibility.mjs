import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pageDefinitions, pageHash, read, root } from "./stage6-qa-utils.mjs";

function fail(message) {
  throw new Error(message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function occurrences(source, token) {
  return source.split(token).length - 1;
}

expect(pageDefinitions.length === 153, "Stage 7 must inventory 150 lessons and three hub pages");

for (const definition of pageDefinitions) {
  const html = read(definition.html);
  const prefix = definition.page === "index" ? "./" : "../";
  const stylesheet = `<link rel="stylesheet" href="${prefix}stage7-accessibility.css?v=3"`;
  const script = `<script src="${prefix}stage7-accessibility.js?v=4"></script>`;

  expect(occurrences(html, '<a class="skip-link" href="#main-content">Skip to main content</a>') === 1,
    `${definition.page}: expected exactly one main-content skip link`);
  expect(/<main\b(?=[^>]*\bid="main-content")(?=[^>]*\btabindex="-1")[^>]*>/i.test(html),
    `${definition.page}: main content is not an explicit focus target`);
  expect(occurrences(html, stylesheet) === 1,
    `${definition.page}: Stage 7 accessibility stylesheet link count is not one`);
  expect(occurrences(html, script) === 1,
    `${definition.page}: Stage 7 accessibility script link count is not one`);
  expect(!/\btabindex="[1-9]\d*"/i.test(html), `${definition.page}: positive tabindex is not allowed`);
  expect(!/\bautoplay\b/i.test(html), `${definition.page}: autoplay media is not allowed`);

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  expect(new Set(ids).size === ids.length, `${definition.page}: duplicate static IDs found`);

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    expect(/\balt="[^"]*"/i.test(image[0]), `${definition.page}: image is missing alt text`);
  }
}

const css = read("web/stage7-accessibility.css");
expect(css.includes("Stage 7 keyboard and assistive-technology delivery fixes"), "Stage 7 CSS marker is missing");
expect(css.includes(":focus-visible"), "Stage 7 must provide a visible keyboard focus indicator");
expect(css.includes("prefers-reduced-motion: reduce"), "Stage 7 must respect reduced-motion preferences");
expect(css.includes("forced-colors: active"), "Stage 7 must preserve focus in forced-colour mode");
expect(css.includes(".skip-link"), "Stage 7 skip-link styling is missing");

const accessibilityScript = read("web/stage7-accessibility.js");
for (const marker of [
  'aria-expanded',
  'aria-controls',
  'aria-hidden',
  'role", "tab"',
  'aria-selected',
  'ArrowRight',
  'aria-labelledby',
  'aria-live',
  'aria-pressed',
  'zh-CN',
]) {
  expect(accessibilityScript.includes(marker), `Stage 7 accessibility runtime marker is missing: ${marker}`);
}
execFileSync(process.execPath, ["--check", path.join(root, "web", "stage7-accessibility.js")], { stdio: "pipe" });

const registerPath = path.join(root, "audits", "stage7-accessibility-register.csv");
expect(fs.existsSync(registerPath), "Stage 7 accessibility register is missing");
const registerLines = fs.readFileSync(registerPath, "utf8").trim().split("\n");
expect(registerLines.shift() === "page,semantics,keyboard,contrast,language,status,content_hash",
  "Stage 7 register header is invalid");
expect(registerLines.length === pageDefinitions.length, "Stage 7 register page count is invalid");

const register = new Map(registerLines.map((line) => {
  const cells = line.split(",");
  expect(cells.length === 7, `Stage 7 register row is invalid: ${line}`);
  return [cells[0], cells];
}));
expect(register.size === pageDefinitions.length, "Stage 7 register contains duplicate pages");

for (const definition of pageDefinitions) {
  const row = register.get(definition.page);
  expect(row, `${definition.page}: missing from Stage 7 register`);
  expect(row.slice(1, 6).every((cell, index) => cell === (index === 4 ? "Approved" : "Pass")),
    `${definition.page}: Stage 7 approvals are incomplete`);
  expect(row[6] === pageHash(definition), `${definition.page}: approved accessibility content hash has changed`);
}

expect(fs.existsSync(path.join(root, "audits", "stage7-accessibility-report.md")), "Stage 7 report is missing");
expect(read("README.md").includes("node scripts/verify-stage7-accessibility.mjs"),
  "README is missing the Stage 7 verifier command");

console.log("Stage 7 accessibility verification passed: 153 approved pages with keyboard, semantic, contrast and language safeguards plus stable content hashes.");
