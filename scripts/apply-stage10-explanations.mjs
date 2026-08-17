import fs from "node:fs";
import path from "node:path";
import { explanations } from "./stage10-explanations-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const stylesheet = '    <link rel="stylesheet" href="../stage10-explanations.css?v=1" />';
const htmlBlock = /\n?\s*<!-- stage10-explanation:start [^ ]+ -->[\s\S]*?<!-- stage10-explanation:end [^ ]+ -->\n?/g;
const markdownBlock = /\n?<!-- stage10-explanations:start -->[\s\S]*?<!-- stage10-explanations:end -->\n?/g;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] ?? "";
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
    if (full.startsWith("</")) {
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
    const isLessonContent = name === "div" && /\bclass="[^"]*\blesson-content\b/.test(full);
    let section = null;
    if (name === "section" && parent?.isLessonContent) {
      section = { start: match.index, tagEnd: tags.lastIndex, tag: full };
      sections.push(section);
    }
    if (!voidTags.has(name) && !full.endsWith("/>")) stack.push({ name, isLessonContent, section });
  }
  return sections;
}

function htmlFor(item) {
  const id = `explanation-${item.targetId}`;
  const paragraphs = item.paragraphs.map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`).join("\n");
  return `

        <!-- stage10-explanation:start ${item.targetId} -->
        <section class="panel explanation-panel" id="${id}" data-explains="${item.targetId}" data-explanation-kind="${item.kind}" data-delivery-role="CORE" data-classroom-activity="TEACH" data-delivery-group="${item.targetId}">
          <div class="section-title">
            <p class="eyebrow">Explanation</p>
            <h2>${escapeHtml(item.title)}</h2>
          </div>
          <div class="explanation-body">
${paragraphs}
          </div>
        </section>
        <!-- stage10-explanation:end ${item.targetId} -->`;
}

function markdownFor(items) {
  const sections = items.map((item) => {
    const paragraphs = item.paragraphs.join("\n\n");
    return `### ${item.title}\n\n- **Explains:** \`${item.targetId}\`\n- **Explanation type:** ${item.kind}\n\n${paragraphs}`;
  }).join("\n\n");
  return `

<!-- stage10-explanations:start -->
## Stage 10 causal explanations

${sections}
<!-- stage10-explanations:end -->
`;
}

const byLesson = new Map();
for (const item of explanations) {
  const values = byLesson.get(item.lesson) ?? [];
  values.push(item);
  byLesson.set(item.lesson, values);
}

let changedPages = 0;
let changedMarkdown = 0;
for (let number = 1; number <= 150; number += 1) {
  const lesson = String(number).padStart(3, "0");
  const htmlPath = path.join(root, "web", `lesson-${lesson}`, "index.html");
  const original = fs.readFileSync(htmlPath, "utf8");
  let html = original.replace(htmlBlock, "\n");
  html = html.replace(/^\s*<link rel="stylesheet" href="\.\.\/stage10-explanations\.css\?v=\d+" \/>\n?/m, "");
  const assetAnchor = '    <link rel="stylesheet" href="../stage7-accessibility.css?v=3" />';
  if (!html.includes(assetAnchor)) throw new Error(`Lesson ${lesson}: Stage 7 stylesheet anchor is missing`);
  html = html.replace(assetAnchor, `${assetAnchor}\n${stylesheet}`);

  const items = byLesson.get(lesson) ?? [];
  const sections = directSections(html);
  const sectionById = new Map(sections.map((section) => [attribute(section.tag, "id"), section]));
  const edits = [];
  for (const item of items) {
    const target = sectionById.get(item.targetId);
    if (!target) throw new Error(`Lesson ${lesson}: explanation target ${item.targetId} is missing`);
    edits.push({ position: target.end, value: htmlFor(item) });
  }
  for (const edit of edits.sort((a, b) => b.position - a.position)) {
    html = html.slice(0, edit.position) + edit.value + html.slice(edit.position);
  }
  if (html !== original) {
    fs.writeFileSync(htmlPath, html);
    changedPages += 1;
  }

  if (!items.length) continue;

  const markdownMatches = fs.readdirSync(path.join(root, "lessons"))
    .filter((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  if (markdownMatches.length !== 1) throw new Error(`Expected one Markdown lesson for ${lesson}`);
  const markdownPath = path.join(root, "lessons", markdownMatches[0]);
  const markdownOriginal = fs.readFileSync(markdownPath, "utf8");
  const markdownBase = markdownOriginal.replace(markdownBlock, "\n").trimEnd();
  const markdown = `${markdownBase}${markdownFor(items)}`;
  if (markdown !== markdownOriginal) {
    fs.writeFileSync(markdownPath, markdown);
    changedMarkdown += 1;
  }
}

console.log(`Stage 10 explanations applied: ${explanations.length} pilot panels; ${changedPages} HTML and ${changedMarkdown} Markdown files changed.`);
