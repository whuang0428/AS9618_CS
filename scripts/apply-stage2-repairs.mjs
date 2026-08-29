import fs from "node:fs";
import path from "node:path";
import { stage3CoreRepairs as repairs } from "./remediation-v2-stage3-sequence-plan.mjs";
import { normaliseQuestionPrompt } from "./cie-command-words.mjs";

const root = path.resolve(import.meta.dirname, "..");
const htmlMarker = "Core syllabus content";
const markdownMarker = "Core syllabus content";
const htmlStart = "<!-- stage2-completion:start -->";
const htmlEnd = "<!-- stage2-completion:end -->";
const markdownStart = "<!-- stage2-completion:start -->";
const markdownEnd = "<!-- stage2-completion:end -->";

// These sentences close concepts that the audit-integrity gate found absent from
// the exact first-teaching section.  Keep them here, beside the generator, so a
// regeneration cannot silently recreate the omissions.
const firstTeachingSupplements = new Map([
  ["S1.02", [
    "Representation overview: the required integer representations are binary, denary, hexadecimal, BCD, one's-complement and two's-complement. Conversion means preserving the integer value while changing its base or signed representation.",
  ]],
  ["S1.04", [
    "Binary subtraction applies to each positive or negative binary integer as well as binary addition; use the stated fixed width and signed representation when interpreting the result.",
  ]],
  ["S3.03", [
    "Required device overview: a laser printer uses an electrostatic drum, laser, toner and fuser; a 3D printer builds successive layers; a speaker converts an electrical signal into sound. An HDD or magnetic hard disk uses rotating magnetic platters, flash memory stores charge electronically, and an optical reader/writer uses a laser.",
  ]],
  ["S6.03", [
    "Each security measure has a distinct mechanism: a user account identifies a user; a password authenticates knowledge; a digital signature supports integrity and origin checks; a biometric compares a captured feature; a firewall filters traffic; anti-virus and anti-spyware detect known malicious software; encryption protects readable data. The threats include a virus, spyware, a hacker, phishing and pharming; each threat must be matched to a control whose mechanism reduces that risk.",
  ]],
  ["S6.07", [
    "Data validation and data verification help protect data integrity by detecting or preventing many input, copying and transfer errors before inaccurate or corrupted data are accepted. They reduce these risks but do not prove that the original source is true or replace access control and backup.",
  ]],
  ["S7.05", [
    "The required licence categories include FSF and OSI open-source licences, shareware and commercial software. A justified licence choice links its permissions, restrictions and cost to the stated situation.",
  ]],
  ["S10.06", [
    "Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm.",
  ]],
  ["S10.10", [
    "Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.",
  ]],
  ["S12.04", [
    "Program errors can be exposed by suitable test data and expected results, located with trace output or breakpoints, and corrected before the same tests are repeated to confirm the fix.",
  ]],
]);

const supplementsFor = (repair) => [...firstTeachingSupplements.entries()]
  .filter(([requirementId]) => repair.rows.includes(requirementId))
  .flatMap(([, supplements]) => supplements);

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function htmlFor(repair) {
  const explanation = [...repair.explanation, ...supplementsFor(repair)];
  const paragraphs = explanation.map((item) => `            <p>${escapeHtml(item)}</p>`).join("\n");
  const practice = repair.practice.map((item, index) => `
            <article class="stage2-question">
              <p><strong>${index + 1}.</strong> ${escapeHtml(normaliseQuestionPrompt(item.q))}</p>
              <details><summary>Show answer</summary><p>${escapeHtml(item.a)}</p></details>
            </article>`).join("");
  const marks = repair.marks.map((item, index) => `                  <tr><td>${escapeHtml(item[1])}</td><td>${index === 0 ? escapeHtml(repair.strict) : ""}</td><td>1</td></tr>`).join("\n");

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
            <p>${escapeHtml(normaliseQuestionPrompt(repair.exam))}</p>
            <details>
              <summary>Show MS</summary>
              <table class="mark-scheme-table">
                <thead><tr><th>Answer</th><th>Guidance</th><th>Marks</th></tr></thead>
                <tbody>
${marks}
                </tbody>
              </table>
            </details>
          </article>
        </section>
        ${htmlEnd}
`;
}

function markdownFor(repair) {
  const explanation = [...repair.explanation, ...supplementsFor(repair)]
    .map((item) => `- ${item}`).join("\n");
  const practice = repair.practice.map((item, index) => `${index + 1}. ${normaliseQuestionPrompt(item.q)}\n   **Answer:** ${item.a}`).join("\n");
  const marks = repair.marks.map((item, index) => `| ${item[1].replaceAll("|", "\\|")} | ${index === 0 ? repair.strict.replaceAll("|", "\\|") : ""} | 1 |`).join("\n");
  return `
${markdownStart}
## ${markdownMarker}

**Focus:** ${repair.title}

### Direct explanation

${explanation}

### Worked example

**${repair.exampleTitle}:** ${repair.example}

<!-- stage2-practice:start -->
### Targeted practice and answers

${practice}

### Exam-style question and MS

**Question (${repair.marks.length} marks):** ${normaliseQuestionPrompt(repair.exam)}

| Answer | Guidance | Marks |
|---|---|---:|
${marks}
<!-- stage2-practice:end -->
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
.stage2-completion .mark-scheme-table { width: 100%; border-collapse: collapse; }
.stage2-completion .mark-scheme-table :where(th, td) { border: 1px solid var(--line, #d7ddd9); padding: 8px; text-align: left; vertical-align: top; }
.stage2-completion .mark-scheme-table :where(th, td):last-child { width: 5rem; text-align: center; }
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

  const lessonContentStart = html.indexOf('<div class="lesson-content">');
  if (lessonContentStart < 0) throw new Error(`Lesson content anchor missing in lesson ${number}`);
  const firstSectionOffset = html.slice(lessonContentStart).search(/\n\s*<section\b/);
  if (firstSectionOffset < 0) throw new Error(`First teaching section anchor missing in lesson ${number}`);
  const firstSectionIndex = lessonContentStart + firstSectionOffset;
  const prefix = html.slice(0, firstSectionIndex).replace(/\s*$/, "");
  const suffix = html.slice(firstSectionIndex).replace(/^\s*/, "");
  html = `${prefix}\n\n${htmlFor(repair).trim()}\n\n${suffix}`;
  html = html.replace(
    /(<aside class="lesson-nav"[^>]*>[\s\S]*?)(\s*<\/aside>)/,
    `$1\n        <a href="#stage2-completion">Core syllabus content</a>$2`,
  );
  styles = `${styles.trimEnd()}\n\n${css.trim()}\n`;
  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(cssPath, styles);
  const scopeEnd = "<!-- remediation-v2-stage3-scope:end -->";
  const scopeIndex = markdown.indexOf(scopeEnd);
  if (scopeIndex >= 0) {
    const insertionIndex = scopeIndex + scopeEnd.length;
    markdown = `${markdown.slice(0, insertionIndex)}\n${markdownFor(repair)}\n${markdown.slice(insertionIndex).trimStart()}`;
  } else {
    const headingEnd = markdown.indexOf("\n", markdown.indexOf("# "));
    if (headingEnd < 0) throw new Error(`Markdown heading anchor missing in lesson ${number}`);
    markdown = `${markdown.slice(0, headingEnd)}\n${markdownFor(repair)}\n${markdown.slice(headingEnd + 1)}`;
  }
  markdown = markdown.replace(/[ \t]+$/gm, "");
  fs.writeFileSync(markdownPath, markdown);
}

console.log(`Applied ${repairs.length} lesson-specific Stage 2 repairs.`);
