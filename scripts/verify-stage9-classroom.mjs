import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { commandWords } from "./assessment-filter-utils.mjs";
import { pageDefinitions, root } from "./stage6-qa-utils.mjs";

const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

function count(text, marker) {
  return text.split(marker).length - 1;
}

function attr(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "";
}

function decodeHtml(value) {
  return String(value)
    .replace(/<[^>]+>/g, "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/\s+/g, " ")
    .trim();
}

function directSectionTags(source) {
  const sections = [];
  const stack = [];
  const tags = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  let match;
  while ((match = tags.exec(source))) {
    const tag = match[0];
    const name = match[1].toLowerCase();
    if (tag.startsWith("</")) {
      while (stack.length) {
        if (stack.pop().name === name) break;
      }
      continue;
    }
    const parent = stack.at(-1);
    const isLessonContent = name === "div" && /\bclass="[^"]*\blesson-content\b/.test(tag);
    if (name === "section" && parent?.isLessonContent) sections.push(tag);
    if (!voidTags.has(name) && !tag.endsWith("/>")) stack.push({ name, isLessonContent });
  }
  return sections;
}

const catalogContext = {};
vm.createContext(catalogContext);
vm.runInContext(read("web/course-catalog.js"), catalogContext);
const catalog = catalogContext.AS9618CourseCatalog;
expect(Array.isArray(catalog) && catalog.length === 150, "Course catalog must contain exactly 150 lessons");

const lessons = pageDefinitions.filter(({ kind }) => kind === "lesson");
const roles = new Set(["CORE", "OPTIONAL", "AFTER_CLASS"]);
const activities = new Set(["TEACH", "ASK", "THINK", "PAIR", "PRACTISE", "CHECK", "EXAM", "HOMEWORK"]);
let sectionCount = 0;

for (const [index, definition] of lessons.entries()) {
  const id = String(index + 1).padStart(3, "0");
  const html = read(definition.html);
  const entry = catalog[index];
  const h1 = decodeHtml(html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1] ?? "");
  expect(entry?.number === index + 1 && entry?.id === id, `${definition.page}: catalog order or id is incorrect`);
  expect(entry?.title === h1, `${definition.page}: catalog title does not match h1`);
  expect(["Paper 1", "Paper 2"].includes(entry?.paper), `${definition.page}: catalog paper is invalid`);
  expect(/^Section \d+$|^Review$/.test(entry?.section ?? ""), `${definition.page}: catalog section is invalid`);
  expect(count(html, 'href="../classroom-mode.css?v=1"') === 1, `${definition.page}: classroom stylesheet must appear once`);
  expect(count(html, 'src="../course-catalog.js?v=1"') === 1, `${definition.page}: course catalog script must appear once`);
  expect(count(html, 'src="../classroom-mode.js?v=1"') === 1, `${definition.page}: classroom script must appear once`);
  expect(!/<details\b[^>]*\bopen\b/i.test(html), `${definition.page}: a details answer is open by default`);

  const sections = directSectionTags(html);
  sectionCount += sections.length;
  const ids = new Set();
  let hasCore = false;
  let hasHomework = false;
  for (const tag of sections) {
    const sectionId = attr(tag, "id");
    const role = attr(tag, "data-delivery-role");
    const activity = attr(tag, "data-classroom-activity");
    const group = attr(tag, "data-delivery-group");
    expect(Boolean(sectionId), `${definition.page}: direct section is missing an id`);
    expect(!ids.has(sectionId), `${definition.page}: duplicate direct section id ${sectionId}`);
    ids.add(sectionId);
    expect(roles.has(role), `${definition.page}/${sectionId}: invalid delivery role ${role}`);
    expect(activities.has(activity), `${definition.page}/${sectionId}: invalid classroom activity ${activity}`);
    expect(Boolean(group), `${definition.page}/${sectionId}: missing delivery group`);
    if (role === "CORE") hasCore = true;
    if (sectionId === "homework" && role === "AFTER_CLASS" && activity === "HOMEWORK") hasHomework = true;
  }
  expect(hasCore, `${definition.page}: no CORE delivery content`);
  expect(hasHomework, `${definition.page}: homework is not classified as AFTER_CLASS/HOMEWORK`);
}

const registerRows = read("audits/stage9-classroom-delivery-register.csv").trim().split("\n").slice(1);
expect(registerRows.length === sectionCount, `Stage 9 register has ${registerRows.length} rows; expected ${sectionCount}`);

const homeHtml = read("web/index.html");
const homeJs = read("web/index.js");
expect(homeHtml.indexOf("course-catalog.js") < homeHtml.indexOf("index.js"), "Homepage must load the course catalog before index.js");
expect(!/\bfetch\s*\(/.test(homeJs), "Homepage must not fetch lesson pages at runtime");
expect(homeHtml.includes("Classroom Teaching &amp; Revision"), "Homepage teacher-led positioning is missing");
expect(homeHtml.includes("./assessments/") && homeHtml.includes("./resources/"), "Homepage teaching shortcuts are incomplete");

const classroomJs = read("web/classroom-mode.js");
const classroomCss = read("web/classroom-mode.css");
for (const marker of ["teacher-toolbar__previous", "teacher-toolbar__next", "teacher-toolbar__mode", "teacher-toolbar__optional", "teacher-toolbar__fullscreen", "Assessment Bank", "aria-live", "ArrowLeft", "ArrowRight"]) {
  expect(classroomJs.includes(marker), `Classroom toolbar marker is missing: ${marker}`);
}
for (const marker of [".teacher-toolbar", "body.classroom-mode", ".classroom-active", "@media (max-width: 760px)", "padding-bottom"]) {
  expect(classroomCss.includes(marker), `Classroom stylesheet marker is missing: ${marker}`);
}

const assessmentHtml = read("web/assessments/index.html");
const assessmentTags = [...assessmentHtml.matchAll(/<article class="assessment"[^>]*>/g)].map((match) => match[0]);
const questionTags = [...assessmentHtml.matchAll(/<article class="question"[^>]*>/g)].map((match) => match[0]);
expect(assessmentTags.length === 51, `Expected 51 assessment metadata records; found ${assessmentTags.length}`);
expect(questionTags.length === 213, `Expected 213 question metadata records; found ${questionTags.length}`);
for (const tag of assessmentTags) {
  expect(/^(?:quiz|monthly|review)$/.test(attr(tag, "data-type")), "Assessment type metadata is invalid");
  expect(attr(tag, "data-paper").split(",").every((paper) => /^[12]$/.test(paper)), "Assessment paper metadata is invalid");
  expect(attr(tag, "data-sections").split(",").every((section) => Number(section) >= 1 && Number(section) <= 12), "Assessment section metadata is invalid");
  expect(attr(tag, "data-aos").split(",").every((ao) => /^AO[123]$/.test(ao)), "Assessment AO coverage metadata is invalid");
}
for (const tag of questionTags) {
  expect(commandWords.includes(attr(tag, "data-command")), `Unknown command metadata: ${attr(tag, "data-command")}`);
  expect(Number.isInteger(Number(attr(tag, "data-marks"))) && Number(attr(tag, "data-marks")) > 0, "Question mark metadata is invalid");
}
for (const id of ["paperFilter", "sectionFilter", "aoFilter", "commandFilter", "minMarks", "maxMarks", "resetBtn", "resultCount", "emptyState"]) {
  expect(assessmentHtml.includes(`id="${id}"`), `Assessment filter control is missing: ${id}`);
}
expect(!/<details\b[^>]*\bopen\b/i.test(assessmentHtml), "Assessment answers or mark schemes must be closed by default");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Stage 9 classroom verification passed: 150 catalogued lessons, ${sectionCount} classified sections, 51 assessments and 213 filterable exam questions.`);
