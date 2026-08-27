import fs from "node:fs";
import path from "node:path";
import { repairs } from "./stage2-repairs-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const htmlMarker = "Core syllabus content";
const markdownMarker = "Core syllabus content";
const htmlStart = "<!-- stage2-completion:start -->";
const htmlEnd = "<!-- stage2-completion:end -->";
const markdownStart = "<!-- stage2-completion:start -->";
const markdownEnd = "<!-- stage2-completion:end -->";

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlFor(repair) {
  const paragraphs = repair.explanation.map((item) => `            <p>${escapeHtml(item)}</p>`).join("\n");
  const practice = repair.practice.map((item, index) => `
            <article class="stage2-question">
              <p><strong>${index + 1}.</strong> ${escapeHtml(item.q)}</p>
              <details><summary>Show answer</summary><p>${escapeHtml(item.a)}</p></details>
            </article>`).join("");
  const marks = repair.marks.map((item) => `                <li><strong>${escapeHtml(item[0])}</strong> ${escapeHtml(item[1])}</li>`).join("\n");

  return `
        ${htmlStart}
        <section class="panel stage2-completion" id="stage2-completion" data-delivery-role="CORE" data-classroom-activity="TEACH" data-delivery-group="stage2-completion">
          <div class="section-title">
            <p class="eyebrow">${htmlMarker}</p>
            <h2>${escapeHtml(repair.title)}</h2>
          </div>
          <div class="stage2-explanation">
${paragraphs}
          </div>
          <article class="stage2-example">
            <h3>Worked example: ${escapeHtml(repair.exampleTitle)}</h3>
            <p>${escapeHtml(repair.example)}</p>
          </article>
        </section>
        <section class="panel stage2-practice-block" id="stage2-practice" data-delivery-role="CORE" data-classroom-activity="PRACTISE" data-delivery-group="stage2-completion">
          <div class="section-title">
            <p class="eyebrow">Core syllabus practice</p>
            <h2>${escapeHtml(repair.title)}: apply and assess</h2>
          </div>
          <div class="stage2-practice">
            <h3>Targeted practice</h3>${practice}
          </div>
          <article class="stage2-exam">
            <div class="exam-head"><h3>Exam-style question</h3><span>${repair.marks.length} marks</span></div>
            <p>${escapeHtml(repair.exam)}</p>
            <details>
              <summary>Show MS</summary>
              <ol class="mark-list">
${marks}
              </ol>
            </details>
          </article>
        </section>
        ${htmlEnd}
`;
}

function markdownFor(repair) {
  const explanation = repair.explanation.map((item) => `- ${item}`).join("\n");
  const practice = repair.practice.map((item, index) => `${index + 1}. ${item.q}\n   **Answer:** ${item.a}`).join("\n");
  const marks = repair.marks.map((item) => `- **${item[0]}** ${item[1]}`).join("\n");
  return `
${markdownStart}
## ${markdownMarker}

**Focus:** ${repair.title}

### Direct explanation

${explanation}

### Worked example

**${repair.exampleTitle}:** ${repair.example}

### Targeted practice and answers

${practice}

### Exam-style question and MS

**Question (${repair.marks.length} marks):** ${repair.exam}

${marks}

**Strict note:** ${repair.strict}
${markdownEnd}
`;
}

const css = `
/* Stage 2 syllabus completion:start */
.stage2-completion { border-top: 4px solid var(--accent, #176b5b); }
.stage2-practice-block { border-top: 2px solid var(--accent, #176b5b); }
.stage2-explanation, .stage2-practice { display: grid; gap: 10px; }
.stage2-example, .stage2-exam, .stage2-question { border: 1px solid var(--line, #d7ddd9); padding: 16px; background: #fff; }
.stage2-question + .stage2-question { margin-top: 10px; }
.stage2-completion details { margin-top: 10px; }
.stage2-completion summary { cursor: pointer; color: var(--accent-dark, #124d43); font-weight: 750; min-height: 40px; padding: 8px 0; }
.stage2-completion .mark-list { display: grid; gap: 8px; }
/* Stage 2 syllabus completion:end */
`;

const lessonDir = path.join(root, "lessons");
const webLessonDirs = fs.readdirSync(path.join(root, "web")).filter((name) => /^lesson-\d{3}$/.test(name));

for (const webLessonDir of webLessonDirs) {
  const number = webLessonDir.slice(-3);
  const webDir = path.join(root, "web", webLessonDir);
  const htmlPath = path.join(webDir, "index.html");
  const cssPath = path.join(webDir, "styles.css");
  const markdownMatches = fs.readdirSync(lessonDir).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  if (markdownMatches.length !== 1) throw new Error(`Expected one Markdown lesson for ${number}`);

  let html = fs.readFileSync(htmlPath, "utf8");
  let styles = fs.readFileSync(cssPath, "utf8");
  const markdownPath = path.join(lessonDir, markdownMatches[0]);
  let markdown = fs.readFileSync(markdownPath, "utf8");

  html = html
    .replace(/\n?\s*<!-- stage2-completion:start -->[\s\S]*?<!-- stage2-completion:end -->\n?/g, "\n")
    .replace(/\n?\s*<section class="panel stage2-completion" id="stage2-completion"[^>]*>[\s\S]*?<\/section>\n?/g, "\n")
    .replace(/^\s*<a href="#stage2-completion">(?:Extra practice|Core syllabus content)<\/a>\s*\n/gm, "");
  styles = styles
    .replace(/\n?\/\* Stage 2 syllabus completion:start \*\/[\s\S]*?\/\* Stage 2 syllabus completion:end \*\/\n?/g, "\n")
    .replace(/\n?\/\* Stage 2 syllabus completion \*\/[\s\S]*$/g, "\n")
    .trimEnd() + "\n";
  markdown = markdown
    .replace(/\n?<!-- stage2-completion:start -->[\s\S]*?<!-- stage2-completion:end -->\n?/g, "\n")
    .replace(/\n## (?:Stage 2 syllabus completion|Core syllabus content)[\s\S]*?(?=\n<!-- stage10-explanations:start -->|\s*$)/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .trimEnd() + "\n";

  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(cssPath, styles);
  fs.writeFileSync(markdownPath, markdown);
}

for (const repair of repairs) {
  const number = String(repair.lesson).padStart(3, "0");
  const webDir = path.join(root, "web", `lesson-${number}`);
  const htmlPath = path.join(webDir, "index.html");
  const cssPath = path.join(webDir, "styles.css");
  const markdownMatches = fs.readdirSync(lessonDir).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));

  if (markdownMatches.length !== 1) throw new Error(`Expected one Markdown lesson for ${number}`);
  let html = fs.readFileSync(htmlPath, "utf8");
  let styles = fs.readFileSync(cssPath, "utf8");
  const markdownPath = path.join(lessonDir, markdownMatches[0]);
  let markdown = fs.readFileSync(markdownPath, "utf8");

  const summaryMatch = html.match(/        <section class="[^"]+" id="summary"/);
  if (!summaryMatch) throw new Error(`Summary anchor missing in lesson ${number}`);
  html = html.replace(summaryMatch[0], `${htmlFor(repair)}\n${summaryMatch[0]}`);
  html = html.replace(
    /(<aside class="lesson-nav"[^>]*>[\s\S]*?)(\s*<\/aside>)/,
    `$1\n        <a href="#stage2-completion">Core syllabus content</a>$2`,
  );
  styles = `${styles.trimEnd()}\n\n${css.trim()}\n`;
  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(cssPath, styles);
  const stage10Index = markdown.indexOf("\n<!-- stage10-explanations:start -->");
  if (stage10Index >= 0) markdown = `${markdown.slice(0, stage10Index).trimEnd()}\n${markdownFor(repair)}\n${markdown.slice(stage10Index + 1)}`;
  else markdown = `${markdown.trimEnd()}\n${markdownFor(repair)}`;
  markdown = markdown.replace(/[ \t]+$/gm, "");
  fs.writeFileSync(markdownPath, markdown);
}

console.log(`Applied ${repairs.length} lesson-specific Stage 2 repairs.`);
