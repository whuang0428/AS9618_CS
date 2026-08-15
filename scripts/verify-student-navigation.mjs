import { pageDefinitions, read } from "./stage6-qa-utils.mjs";

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const lessons = pageDefinitions.filter(({ kind }) => kind === "lesson");
expect(lessons.length === 150, "Expected exactly 150 lesson pages");

const exactLink = '<a class="course-home-link" href="../">Course home</a>';

for (const definition of lessons) {
  const html = read(definition.html);
  const linkCount = html.split('class="course-home-link"').length - 1;
  expect(linkCount === 1, `${definition.page}: expected exactly one course home link`);
  expect(html.includes(exactLink), `${definition.page}: course home link text or target is incorrect`);
  expect(
    /<div class="action-panel" aria-label="Page controls">\s*<a class="course-home-link" href="\.\.\/">Course home<\/a>/m.test(html),
    `${definition.page}: course home link must be the first page control`,
  );
}

for (const hub of pageDefinitions.filter(({ page }) => ["assessments", "resources"].includes(page))) {
  expect(/<a href="\.\.\/">Course index<\/a>/.test(read(hub.html)), `${hub.page}: course index link is missing`);
}

const css = read("web/stage6-qa.css");
for (const marker of [".course-home-link", "min-height: 44px", ".topbar .action-panel"]) {
  expect(css.includes(marker), `Shared navigation CSS marker is missing: ${marker}`);
}

console.log("Student navigation verification passed: 150 lesson pages have one keyboard-accessible course home link.");
