import fs from "node:fs";
import path from "node:path";
import { repairs } from "./stage2-repairs-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const marker = "Stage 2 syllabus completion";

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
        <section class="panel stage2-completion" id="stage2-completion">
          <div class="section-title">
            <p class="eyebrow">${marker}</p>
            <h2>${escapeHtml(repair.title)}</h2>
            <p>Official audit rows: ${escapeHtml(repair.rows.join(", "))}</p>
          </div>
          <div class="stage2-explanation">
${paragraphs}
          </div>
          <article class="stage2-example">
            <h3>Worked example: ${escapeHtml(repair.exampleTitle)}</h3>
            <p>${escapeHtml(repair.example)}</p>
          </article>
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
              <p><strong>Strict note:</strong> ${escapeHtml(repair.strict)}</p>
            </details>
          </article>
        </section>
`;
}

function markdownFor(repair) {
  const explanation = repair.explanation.map((item) => `- ${item}`).join("\n");
  const practice = repair.practice.map((item, index) => `${index + 1}. ${item.q}\n   **Answer:** ${item.a}`).join("\n");
  const marks = repair.marks.map((item) => `- **${item[0]}** ${item[1]}`).join("\n");
  return `
## ${marker}

**Official audit rows:** ${repair.rows.join(", ")}
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
`;
}

const css = `
/* Stage 2 syllabus completion */
.stage2-completion { border-top: 4px solid var(--accent, #176b5b); }
.stage2-explanation, .stage2-practice { display: grid; gap: 10px; }
.stage2-example, .stage2-exam, .stage2-question { border: 1px solid var(--line, #d7ddd9); padding: 16px; background: #fff; }
.stage2-question + .stage2-question { margin-top: 10px; }
.stage2-completion details { margin-top: 10px; }
.stage2-completion summary { cursor: pointer; color: var(--accent-dark, #124d43); font-weight: 750; min-height: 40px; padding: 8px 0; }
.stage2-completion .mark-list { display: grid; gap: 8px; }
`;

for (const repair of repairs) {
  const number = String(repair.lesson).padStart(3, "0");
  const webDir = path.join(root, "web", `lesson-${number}`);
  const htmlPath = path.join(webDir, "index.html");
  const cssPath = path.join(webDir, "styles.css");
  const markdownMatches = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));

  if (markdownMatches.length !== 1) throw new Error(`Expected one Markdown lesson for ${number}`);
  let html = fs.readFileSync(htmlPath, "utf8");
  let styles = fs.readFileSync(cssPath, "utf8");
  const markdownPath = path.join(root, "lessons", markdownMatches[0]);
  let markdown = fs.readFileSync(markdownPath, "utf8");

  if (!html.includes(marker)) {
    const summaryMatch = html.match(/        <section class="[^"]+" id="summary">/);
    if (!summaryMatch) throw new Error(`Summary anchor missing in lesson ${number}`);
    html = html.replace(summaryMatch[0], `${htmlFor(repair)}\n${summaryMatch[0]}`);
    html = html.replace('<a href="#summary">', '<a href="#stage2-completion">Syllabus completion</a>\n        <a href="#summary">');
    fs.writeFileSync(htmlPath, html);
  }
  const cssMarker = "/* Stage 2 syllabus completion */";
  const cssBase = styles.includes(cssMarker) ? styles.slice(0, styles.indexOf(cssMarker)).trimEnd() : styles.trimEnd();
  styles = `${cssBase}\n\n${css.trim()}\n`;
  fs.writeFileSync(cssPath, styles);
  if (!markdown.includes(`## ${marker}`)) {
    markdown += markdownFor(repair);
  }
  markdown = markdown.replace(/[ \t]+$/gm, "");
  fs.writeFileSync(markdownPath, markdown);
}

const rowLessons = new Map();
for (const repair of repairs) {
  for (const row of repair.rows) {
    const values = rowLessons.get(row) ?? [];
    values.push(String(repair.lesson).padStart(3, "0"));
    rowLessons.set(row, values);
  }
}

const auditPath = path.join(root, "syllabus-audit.md");
let audit = fs.readFileSync(auditPath, "utf8");
audit = audit.split("\n").map((line) => {
  const match = line.match(/^\| (S\d+\.\d+) \|/);
  if (!match || !rowLessons.has(match[1])) return line;
  const cells = line.split("|");
  const lessons = rowLessons.get(match[1]);
  const webRefs = lessons.map((number) => `W${number}`).join(", ");
  const markdownRefs = lessons.map((number) => `M${number}`).join(", ");
  cells[3] = ` ${webRefs} Stage 2 completion; ${markdownRefs} specific completion module. `;
  cells[4] = ` ${webRefs} worked example, three targeted items and expandable exam-style MS. `;
  cells[5] = " Complete ";
  cells[6] = " - ";
  return cells.join("|");
}).join("\n");
fs.writeFileSync(auditPath, audit);

console.log(`Applied ${repairs.length} lesson-specific Stage 2 repairs.`);
