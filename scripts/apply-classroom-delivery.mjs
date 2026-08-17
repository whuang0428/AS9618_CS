import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { deliveryOverrides } from "./stage9-delivery-overrides.mjs";
import { explanationByKey } from "./stage10-explanations-data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stylesheet = '    <link rel="stylesheet" href="../lesson-toolbar.css?v=2" />';
const scripts = [
  '    <script src="../course-catalog.js?v=1"></script>',
  '    <script src="../lesson-toolbar.js?v=2"></script>',
];
const optionalIds = new Set([
  "tool", "builder", "simulator", "converter", "checker", "classifier", "chooser", "runner",
  "stage2-completion",
]);

function decodeHtml(value) {
  return String(value)
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/\s+/g, " ")
    .trim();
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "";
}

function classSet(tag) {
  return new Set(attribute(tag, "class").split(/\s+/).filter(Boolean));
}

function directSections(source) {
  const sections = [];
  const stack = [];
  const tags = /<\/?([a-z][a-z0-9-]*)\b[^>]*>/gi;
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  let match;

  while ((match = tags.exec(source))) {
    const full = match[0];
    const name = match[1].toLowerCase();
    const closing = full.startsWith("</");

    if (closing) {
      let item;
      while (stack.length) {
        item = stack.pop();
        if (item.name === name) break;
      }
      if (item?.section) {
        item.section.closeStart = match.index;
        item.section.end = tags.lastIndex;
      }
      continue;
    }

    const parent = stack.at(-1);
    const isLessonContent = name === "div" && classSet(full).has("lesson-content");
    let section = null;
    if (name === "section" && parent?.isLessonContent) {
      section = { start: match.index, tagEnd: tags.lastIndex, tag: full };
      sections.push(section);
    }

    if (!voidTags.has(name) && !full.endsWith("/>")) {
      stack.push({ name, isLessonContent, section });
    }
  }

  if (sections.some(({ closeStart }) => closeStart === undefined)) {
    throw new Error("Unable to resolve one or more direct lesson sections");
  }
  return sections;
}

function inferRole(sectionId, classes) {
  if (sectionId === "homework" || classes.has("homework-support")) return "AFTER_CLASS";
  if (classes.has("interactive") || classes.has("stage2-completion") || optionalIds.has(sectionId)) return "OPTIONAL";
  return "CORE";
}

function inferActivity(sectionId, classes, content) {
  const text = decodeHtml(content).toLowerCase();
  if (sectionId === "homework" || classes.has("homework-support")) return "HOMEWORK";
  if (sectionId === "hook") return "ASK";
  if (sectionId === "practice" || sectionId === "stage2-completion") return "PRACTISE";
  if (sectionId === "exam") return "EXAM";
  if (sectionId === "summary" || sectionId === "debug" || classes.has("mistake-panel")) return "CHECK";
  if (/think[- ]pair[- ]share|discuss with a partner|pair discussion/.test(text)) return "PAIR";
  if (/\bthink about\b|\bindividual thinking\b/.test(text)) return "THINK";
  if (classes.has("interactive")) return "PRACTISE";
  return "TEACH";
}

function updateStartTag(tag, metadata) {
  let updated = tag
    .replace(/\sdata-delivery-role="[^"]*"/g, "")
    .replace(/\sdata-classroom-activity="[^"]*"/g, "")
    .replace(/\sdata-delivery-group="[^"]*"/g, "")
    .replace(/\sdata-delivery-minutes="[^"]*"/g, "");
  if (!attribute(updated, "id")) updated = updated.replace(/^<section\b/, `<section id="${metadata.id}"`);
  const attributes = [
    `data-delivery-role="${metadata.role}"`,
    `data-classroom-activity="${metadata.activity}"`,
    `data-delivery-group="${metadata.group}"`,
  ];
  if (metadata.minutes) attributes.push(`data-delivery-minutes="${metadata.minutes}"`);
  return updated.replace(/>$/, ` ${attributes.join(" ")}>`);
}

function injectAssets(source) {
  let updated = source
    .replace(/^\s*<link rel="stylesheet" href="\.\.\/classroom-mode\.css\?v=\d+" \/>\n?/m, "")
    .replace(/^\s*<link rel="stylesheet" href="\.\.\/lesson-toolbar\.css\?v=\d+" \/>\n?/m, "")
    .replace(/^\s*<script src="\.\.\/course-catalog\.js\?v=\d+"><\/script>\n?/m, "")
    .replace(/^\s*<script src="\.\.\/classroom-mode\.js\?v=\d+"><\/script>\n?/m, "")
    .replace(/^\s*<script src="\.\.\/lesson-toolbar\.js\?v=\d+"><\/script>\n?/m, "");

  const stage7Anchor = '    <link rel="stylesheet" href="../stage7-accessibility.css?v=3" />';
  const stage10Anchor = '    <link rel="stylesheet" href="../stage10-explanations.css?v=5" />';
  const cssAnchor = updated.includes(stage10Anchor) ? stage10Anchor : stage7Anchor;
  const jsAnchor = '    <script src="../stage7-accessibility.js?v=4"></script>';
  if (!updated.includes(stage7Anchor) || !updated.includes(jsAnchor)) {
    throw new Error("Shared Stage 7 asset anchors are missing");
  }
  updated = updated.replace(cssAnchor, `${cssAnchor}\n${stylesheet}`);
  updated = updated.replace(jsAnchor, `${scripts.join("\n")}\n${jsAnchor}`);
  return updated;
}

const register = [];
let changed = 0;

for (let number = 1; number <= 150; number += 1) {
  const lessonId = String(number).padStart(3, "0");
  const file = path.join(root, "web", `lesson-${lessonId}`, "index.html");
  const original = fs.readFileSync(file, "utf8");
  let source = injectAssets(original);
  const sections = directSections(source);
  const usedIds = new Set();
  let previousGroup = "";
  let previousMetadata = null;

  const edits = sections.map((section, index) => {
    const classes = classSet(section.tag);
    const generatedId = `delivery-${String(index + 1).padStart(2, "0")}`;
    const sectionId = attribute(section.tag, "id") || generatedId;
    if (usedIds.has(sectionId)) throw new Error(`Lesson ${lessonId}: duplicate direct section id ${sectionId}`);
    usedIds.add(sectionId);

    const content = source.slice(section.tagEnd, section.closeStart);
    const support = classes.has("guidance-grid") || classes.has("homework-support");
    const defaultGroup = support && previousGroup ? previousGroup : sectionId;
    const key = `lesson-${lessonId}/${sectionId}`;
    const explanationTarget = sectionId.startsWith("explanation-") ? sectionId.slice("explanation-".length) : "";
    const reviewedExplanation = explanationTarget ? explanationByKey[`${lessonId}/${explanationTarget}`] : null;
    const override = deliveryOverrides[key] ?? (reviewedExplanation ? { role: "CORE", activity: "TEACH", group: explanationTarget } : {});
    const metadata = {
      id: sectionId,
      role: override.role ?? (support && previousMetadata ? previousMetadata.role : inferRole(sectionId, classes)),
      activity: override.activity ?? (support && previousMetadata ? previousMetadata.activity : inferActivity(sectionId, classes, content)),
      group: override.group ?? defaultGroup,
      minutes: override.minutes ?? "",
    };
    if (!support) {
      previousGroup = metadata.group;
      previousMetadata = metadata;
    }

    const heading = content.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/i)?.[1] || attribute(section.tag, "aria-label") || sectionId;
    register.push({
      lesson: lessonId,
      order: index + 1,
      ...metadata,
      title: decodeHtml(heading),
      status: "Classified",
      contentHash: crypto.createHash("sha256").update(decodeHtml(content)).digest("hex"),
    });
    return { start: section.start, end: section.tagEnd, replacement: updateStartTag(section.tag, metadata) };
  });

  for (const edit of edits.reverse()) {
    source = source.slice(0, edit.start) + edit.replacement + source.slice(edit.end);
  }
  if (source !== original) {
    fs.writeFileSync(file, source);
    changed += 1;
  }
}

const header = ["lesson", "section_order", "section_id", "delivery_group", "delivery_role", "classroom_activity", "minutes", "title", "status", "content_hash"];
const rows = register.map((entry) => [
  entry.lesson, entry.order, entry.id, entry.group, entry.role, entry.activity, entry.minutes,
  entry.title, entry.status, entry.contentHash,
].map(csv).join(","));
fs.writeFileSync(path.join(root, "audits", "stage9-classroom-delivery-register.csv"), `${header.join(",")}\n${rows.join("\n")}\n`);

console.log(`Stage 9 teacher tools applied: ${changed} lesson pages changed; ${register.length} sections classified.`);
