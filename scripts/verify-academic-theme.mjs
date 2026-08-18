import fs from "node:fs";
import path from "node:path";
import { pageDefinitions, read, root } from "./stage6-qa-utils.mjs";

function fail(message) {
  throw new Error(message);
}

function expect(condition, message) {
  if (!condition) fail(message);
}

function occurrences(source, token) {
  return source.split(token).length - 1;
}

expect(pageDefinitions.length === 153, "Academic theme must cover 150 lessons and three hub pages");

const themePath = path.join(root, "web", "academic-theme.css");
expect(fs.existsSync(themePath), "Academic theme stylesheet is missing");
const theme = fs.readFileSync(themePath, "utf8");

for (const marker of [
  "AS9618 academic editorial theme",
  "--academic-paper: #ffffff",
  "--academic-ink:",
  "--academic-blue:",
  "--academic-green:",
  "--academic-amber:",
  "--academic-serif: Georgia",
  "--academic-sans: ui-sans-serif",
  "--academic-mono:",
  ".stats-grid svg",
  ".lesson-content > .hero",
  ".assessment-list",
  ".resource-content table",
  "@media (max-width: 700px)",
  "flex-direction: column !important",
  ".topbar .action-panel .lesson-contents-toggle",
]) {
  expect(theme.includes(marker), `Academic theme marker is missing: ${marker}`);
}

expect(!/url\s*\(/i.test(theme), "Academic theme must not depend on external font or image URLs");
expect(!/@import\b/i.test(theme), "Academic theme must not import external stylesheets");

for (const definition of pageDefinitions) {
  const html = read(definition.html);
  const prefix = definition.page === "index" ? "./" : "../";
  const themeHref = `${prefix}academic-theme.css?v=5`;
  expect(occurrences(html, `href="${themeHref}"`) === 1,
    `${definition.page}: academic theme link count is not one`);

  const stylesheets = [...html.matchAll(/<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/gi)]
    .map((match) => match[1]);
  expect(stylesheets.at(-1) === themeHref,
    `${definition.page}: academic theme must load after existing page styles`);

  const accessibilityHref = `${prefix}stage7-accessibility.css?v=3`;
  expect(html.indexOf(accessibilityHref) < html.indexOf(themeHref),
    `${definition.page}: academic theme must follow the accessibility stylesheet`);

  if (definition.kind === "lesson") {
    expect(html.indexOf("../lesson-toolbar.css?v=2") < html.indexOf(themeHref),
      `${definition.page}: academic theme must follow the lesson toolbar stylesheet`);
  }
}

const home = read("web/index.html");
expect(occurrences(home, '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">') === 4,
  "Course home must contain four decorative academic course-fact icons");
for (const text of ["150", "lesson pages", "12", "syllabus sections", "2", "AS papers", "45", "minutes per lesson"]) {
  expect(home.includes(text), `Course home fact text is missing: ${text}`);
}

const classroomGenerator = read("scripts/apply-classroom-delivery.mjs");
expect(classroomGenerator.includes("academicThemeStylesheet"),
  "Classroom delivery generator does not preserve the academic theme");
for (const generator of ["scripts/generate-assessments.mjs", "scripts/generate-resource-hub.mjs"]) {
  expect(read(generator).includes('../academic-theme.css?v=5'),
    `${generator}: generated hub output does not preserve the academic theme`);
}

console.log("Academic theme verification passed: 153 pages, offline design tokens, generator persistence and mobile header safeguards.");
