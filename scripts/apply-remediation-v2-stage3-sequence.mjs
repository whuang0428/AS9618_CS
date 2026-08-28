import fs from "node:fs";
import path from "node:path";

import { stage3OptionalBaseLessons, stage3TitleByLesson } from "./remediation-v2-stage3-sequence-plan.mjs";

const root = path.resolve(import.meta.dirname, "..");
const lessonsRoot = path.join(root, "lessons");
const start = "<!-- remediation-v2-stage3-scope:start -->";
const end = "<!-- remediation-v2-stage3-scope:end -->";

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

for (const lesson of stage3OptionalBaseLessons) {
  const number = String(lesson).padStart(3, "0");
  const title = stage3TitleByLesson[lesson] ?? `Optional enrichment and review for Lesson ${number}`;
  const htmlPath = path.join(root, "web", `lesson-${number}`, "index.html");
  const markdownNames = fs.readdirSync(lessonsRoot).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  if (markdownNames.length !== 1) throw new Error(`Expected one Markdown lesson for ${number}`);
  const markdownPath = path.join(lessonsRoot, markdownNames[0]);

  let html = fs.readFileSync(htmlPath, "utf8")
    .replace(new RegExp(`\\s*${start}[\\s\\S]*?${end}\\s*`, "g"), "\n");
  if (stage3TitleByLesson[lesson]) {
    html = html.replace(/<title>([\s\S]*?)<\/title>/, `<title>AS9618 Lesson ${number} | ${escapeHtml(title)}</title>`);
    html = html.replace(/<h1>([\s\S]*?)<\/h1>/, `<h1>${escapeHtml(title)}</h1>`);
  }
  const hasCore = html.includes('id="stage2-completion"');
  const noticeText = hasCore
    ? "The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use."
    : "This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.";
  const notice = `\n        ${start}\n        <aside class="optional-enrichment-notice stage3-sequence-notice" aria-label="Lesson sequence scope"><strong>Lesson sequence scope</strong><p>${noticeText}</p></aside>\n        ${end}\n`;
  if (!html.includes('<div class="lesson-content">')) throw new Error(`Lesson ${number}: lesson-content anchor missing`);
  html = html.replace('<div class="lesson-content">', `<div class="lesson-content">${notice}`);
  fs.writeFileSync(htmlPath, html);

  let markdown = fs.readFileSync(markdownPath, "utf8")
    .replace(new RegExp(`\\n?${start}[\\s\\S]*?${end}\\n?`, "g"), "\n");
  if (stage3TitleByLesson[lesson]) markdown = markdown.replace(/^# Lesson \d{3}: .*$/m, `# Lesson ${number}: ${title}`);
  const markdownNotice = `${start}\n> **Lesson sequence scope:** ${noticeText}\n${end}\n`;
  const headingEnd = markdown.indexOf("\n", markdown.indexOf("# "));
  markdown = `${markdown.slice(0, headingEnd + 1)}\n${markdownNotice}${markdown.slice(headingEnd + 1).replace(/^\n+/, "\n")}`;
  fs.writeFileSync(markdownPath, markdown);
}

for (let lesson = 1; lesson <= 150; lesson += 1) {
  const number = String(lesson).padStart(3, "0");
  const htmlPath = path.join(root, "web", `lesson-${number}`, "index.html");
  const markdownNames = fs.readdirSync(lessonsRoot).filter((name) => name.startsWith(`${number}-`) && name.endsWith(".md"));
  if (markdownNames.length !== 1) throw new Error(`Expected one Markdown lesson for ${number}`);
  const markdownPath = path.join(lessonsRoot, markdownNames[0]);
  let html = fs.readFileSync(htmlPath, "utf8");
  if ([137, 138].includes(lesson)) {
    html = html
      .replace(/Cambridge AS9618 Computer Science \| Paper 2 Section 12\.3/g, "Cambridge AS9618 Computer Science | Paper 2 Section 11 | Optional enrichment preview of Section 12.3")
      .replace(/Lesson (137|138) \| 45 minutes \| Paper 2 Section 12\.3/g, "Lesson $1 | 45 minutes | Paper 2 Section 11 | Optional enrichment preview of Section 12.3");
    fs.writeFileSync(htmlPath, html);
  }
  const h1 = html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1]
    .replace(/<[^>]+>/g, " ").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'").replace(/\s+/g, " ").trim();
  if (!h1) throw new Error(`Lesson ${number}: h1 missing`);
  let markdown = fs.readFileSync(markdownPath, "utf8")
    .replace(/^# Lesson \d{3}: .*$/m, `# Lesson ${number}: ${h1}`)
    .replace(/\n{3,}/g, "\n\n");
  if ([137, 138].includes(lesson)) {
    const sequenceReference = "**Syllabus reference:** Course sequence Section 11; Optional enrichment preview of Section 12.3";
    if (/^\*\*Syllabus reference:\*\*.*$/m.test(markdown)) {
      markdown = markdown.replace(/^\*\*Syllabus reference:\*\*.*$/m, sequenceReference);
    } else {
      markdown = markdown.replace(/^(\*\*Paper:\*\*.*)$/m, `$1\n${sequenceReference}`);
    }
  }
  fs.writeFileSync(markdownPath, markdown);
}

// L050's mature HTML already contains the complete S4.15 lesson and labels its
// pipelining extension Optional. The historical teacher Markdown pre-dated that
// HTML repair, so keep the two maintained surfaces semantically aligned here.
{
  const markdownName = fs.readdirSync(lessonsRoot).find((name) => name.startsWith("050-") && name.endsWith(".md"));
  if (!markdownName) throw new Error("Lesson 050 Markdown is missing");
  const markdownPath = path.join(lessonsRoot, markdownName);
  const coreStart = "<!-- remediation-v2-stage3-l050-core:start -->";
  const coreEnd = "<!-- remediation-v2-stage3-l050-core:end -->";
  const core = `${coreStart}
> **Lesson sequence scope:** The CORE block below is assessed S4.15 teaching. The historical pipelining and processor-tracing lesson body that follows is Optional enrichment and does not establish syllabus first use.

## Core syllabus content

### Direct explanation

- An AND mask can test or clear selected bits, an OR mask can set selected bits, and an XOR mask can toggle selected bits. These operations support monitoring and control without changing unrelated flags.
- \`LSL #n\` is a logical left shift and \`LSR #n\` is a logical right shift; both insert zero bits. An arithmetic right shift preserves the sign bit, while a cyclic shift wraps the departing bit to the other end.

### Worked example

For \`Status = 10110100\`, use an AND mask to test a named status flag, an OR mask to set a control flag and an XOR mask to toggle one selected flag. Apply \`LSL #n\` or \`LSR #n\` to ACC and discard bits that move beyond the fixed width.

### Core syllabus practice

1. State how an AND mask is used for monitoring.
   **Answer:** AND the status value with a one-bit mask; a non-zero result shows that the selected flag is set.
2. State how to set and toggle one control bit.
   **Answer:** Use an OR mask to set it and an XOR mask to toggle it.
3. Distinguish logical, arithmetic and cyclic right shifts.
   **Answer:** Logical inserts zero, arithmetic preserves the sign bit, and cyclic wraps the departing bit.

### Exam-style question and mark scheme

**Question (6 marks):** Explain how AND, OR and XOR masks test, clear, set and toggle control flags, then apply one \`LSL #n\` and one \`LSR #n\` operation.

| Answer | Guidance | Marks |
|---|---|---:|
| AND mask tests or clears a selected bit | Apply the point to a named status or control flag. | 1 |
| OR mask sets a selected bit |  | 1 |
| XOR mask toggles a selected bit |  | 1 |
| correct logical left shift with zero fill |  | 1 |
| correct logical right shift with zero fill |  | 1 |
| distinguishes logical from arithmetic or cyclic shifting |  | 1 |
${coreEnd}`;
  const current = fs.readFileSync(markdownPath, "utf8");
  const visualBlock = current.match(/<!-- stage10-explanations:start -->[\s\S]*?<!-- stage10-explanations:end -->/)?.[0] ?? "";
  if (!visualBlock) throw new Error("Lesson 050 maintained visual block is missing");
  const markdown = `# Lesson 050: Bit manipulation: masks and binary shifts

${core}

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Section 4.15 Bit manipulation
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz

## Teaching sequence

1. Model one AND mask against a named status bit.
2. Compare OR and XOR masks before students trace each result.
3. Demonstrate \`LSL #n\` and \`LSR #n\`, then contrast them with arithmetic and cyclic shifts.
4. Use the CORE practice and exam-style question before any extension.

## Visual explanations and extension boundary

Use panels labelled \`CORE / TEACH\` as assessed support. Panels labelled \`OPTIONAL / EXTEND\`, including pipelining, hazards, stalls and throughput, are enrichment and do not contribute to syllabus coverage or first-use statistics.

${visualBlock}
`;
  fs.writeFileSync(markdownPath, markdown);
}

console.log(`Applied Stage 3 titles and sequence-scope notices to ${stage3OptionalBaseLessons.length} lessons.`);
