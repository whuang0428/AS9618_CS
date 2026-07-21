import fs from "node:fs";
import path from "node:path";
import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const officialPastPapers = "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/";
const officialSyllabus = "https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf";

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function totalMarks(questions) {
  return questions.reduce((sum, question) => sum + question.marks, 0);
}

function validate() {
  const failures = [];
  if (quizzes.length !== 30) failures.push(`Expected 30 quizzes; found ${quizzes.length}`);
  if (monthlyAssessments.length !== 7) failures.push(`Expected 7 monthly assessments; found ${monthlyAssessments.length}`);
  if (stageReviews.length !== 14) failures.push(`Expected 14 stage reviews; found ${stageReviews.length}`);
  for (const assessment of [...quizzes, ...monthlyAssessments]) {
    const expected = quizzes.includes(assessment) ? 10 : 24;
    if (totalMarks(assessment.questions) !== expected) failures.push(`L${assessment.lesson} total is not ${expected}`);
    for (const question of assessment.questions) {
      if (question.points.length !== question.marks) failures.push(`L${assessment.lesson} question has ${question.points.length} points for ${question.marks} marks`);
      if (!question.note.startsWith("Do not") && !question.note.startsWith("Allow") && !question.note.startsWith("FT") && !question.note.startsWith("Award") && !question.note.startsWith("Credit") && !question.note.startsWith("Each") && !question.note.startsWith("Both") && !question.note.startsWith("Examples") && !question.note.startsWith("Answers") && !question.note.startsWith("Ignore") && !question.note.startsWith("Maximum") && !question.note.startsWith("No mark") && !question.note.startsWith("One mark") && !question.note.startsWith("Use") && !question.note.startsWith("Discussion") && !question.note.startsWith("Keys") && !question.note.startsWith("Test") && !question.note.startsWith("Case") && !question.note.startsWith("A matched") && !question.note.startsWith("The output") && !question.note.startsWith("Two passwords") && !question.note.startsWith("Neither") && !question.note.startsWith("Examples") && !question.note.startsWith("Names") && !question.note.startsWith("Foreign") && !question.note.startsWith("One complete") && !question.note.startsWith("Follow") && !question.note.startsWith("Max") && !question.note.startsWith("A mirror") && !question.note.startsWith("No Java") && !question.note.startsWith("Both difference") && !question.note.startsWith("Examples")) failures.push(`L${assessment.lesson} note lacks explicit marking instruction: ${question.note}`);
    }
  }
  for (const review of stageReviews) {
    if (review.retrieval.length !== 6) failures.push(`L${review.lesson} review does not have six retrieval items`);
    if (review.errors.length !== 2) failures.push(`L${review.lesson} review does not have two error corrections`);
    if (totalMarks(review.questions) !== 10) failures.push(`L${review.lesson} review exam total is not 10`);
    for (const question of review.questions) if (question.points.length !== question.marks) failures.push(`L${review.lesson} review MS mismatch`);
  }
  if (failures.length) throw new Error(failures.join("\n"));
}

const intro = (title, usage) => `# ${title}

${usage}

All questions are original Cambridge-style practice, not copied past-paper questions. Wording and marking guidance are calibrated against the [official Cambridge 9618 past-papers and mark-schemes page](${officialPastPapers}) and the [2027-2029 syllabus](${officialSyllabus}).

## Marking conventions

- **B1**: independent knowledge, identification or explanation point.
- **M1**: method/process point; award when the stated method is shown.
- **A1**: accurate answer or conclusion, normally dependent on the relevant method where indicated.
- **FT**: follow through a candidate's earlier value only where the note explicitly permits it.
- Text separated by a forward slash gives acceptable alternatives for the same mark, not extra marks.
- Credit clear equivalent wording unless a specific syllabus term or representation is required.
- Do not award repeated, self-contradictory or vague statements as separate points.
`;

function questionMarkdown(question, index) {
  return `${index + 1}. ${question.prompt} **[${question.marks}]**`;
}

function msMarkdown(question, index) {
  return `#### Q${index + 1} [${question.marks}]

${question.points.map(([code, text]) => `- **${code}** ${text}`).join("\n")}

**Guidance:** ${question.note}`;
}

function renderQuizzes() {
  return `${intro("Short Quizzes", "Use one quiz every 4-5 lessons. Each quiz is designed for 8-10 minutes and carries 10 marks.")}
${quizzes.map((entry) => `## Quiz after Lesson ${String(entry.lesson).padStart(3, "0")}: ${entry.title}

**Syllabus:** Sections ${entry.sections.join(", ")}

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

${entry.questions.map(questionMarkdown).join("\n")}

### Answer Key / Mark Scheme

${entry.questions.map(msMarkdown).join("\n\n")}`).join("\n\n---\n\n")}
`;
}

function renderMonthly() {
  return `${intro("Monthly Assessments", "Use these 24-mark checkpoints roughly every 18-20 lessons. Allow 35-45 minutes plus correction time.")}
${monthlyAssessments.map((entry) => `## Checkpoint at Lesson ${String(entry.lesson).padStart(3, "0")}: ${entry.title}

**Syllabus:** Sections ${entry.sections.join(", ")}

**Time:** 35-45 minutes

**Total:** 24 marks

### Questions

${entry.questions.map(questionMarkdown).join("\n")}

### Answer Key / Mark Scheme

${entry.questions.map(msMarkdown).join("\n\n")}`).join("\n\n---\n\n")}
`;
}

function renderReviews() {
  return `${intro("Stage Reviews", "Each stage review combines retrieval, error correction and 10 marks of timed exam-style practice.")}
${stageReviews.map((entry) => `## Lesson ${String(entry.lesson).padStart(3, "0")}: ${entry.title}

**Syllabus:** Sections ${entry.sections.join(", ")}

### Retrieval Grid

${entry.retrieval.map((entry, index) => `${index + 1}. ${entry.prompt}`).join("\n")}

<details>
<summary>Retrieval answers</summary>

${entry.retrieval.map((entry, index) => `${index + 1}. ${entry.answer}`).join("\n")}

</details>

### Error Clinic

${entry.errors.map((entry, index) => `${index + 1}. Correct this claim: “${entry.claim}”`).join("\n")}

<details>
<summary>Corrections</summary>

${entry.errors.map((entry, index) => `${index + 1}. ${entry.correction}`).join("\n")}

</details>

### Timed Exam Practice [10]

${entry.questions.map(questionMarkdown).join("\n")}

### Answer Key / Mark Scheme

${entry.questions.map(msMarkdown).join("\n\n")}`).join("\n\n---\n\n")}
`;
}

function assessmentHtml(entry, type, index) {
  const questions = entry.questions.map((question, qIndex) => `<article class="question"><p><strong>Q${qIndex + 1}.</strong> ${escapeHtml(question.prompt)} <span>[${question.marks}]</span></p><details><summary>Show MS</summary><ul>${question.points.map(([code, text]) => `<li><strong>${code}</strong> ${escapeHtml(text)}</li>`).join("")}</ul><p><strong>Guidance:</strong> ${escapeHtml(question.note)}</p></details></article>`).join("");
  const review = type === "review" ? `<div class="review-grid"><section><h4>Retrieval grid</h4><ol>${entry.retrieval.map((item) => `<li>${escapeHtml(item.prompt)}</li>`).join("")}</ol><details><summary>Show answers</summary><ol>${entry.retrieval.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join("")}</ol></details></section><section><h4>Error clinic</h4><ol>${entry.errors.map((item) => `<li>${escapeHtml(item.claim)}</li>`).join("")}</ol><details><summary>Show corrections</summary><ol>${entry.errors.map((item) => `<li>${escapeHtml(item.correction)}</li>`).join("")}</ol></details></section></div>` : "";
  const total = type === "quiz" ? 10 : type === "monthly" ? 24 : 10;
  return `<article class="assessment" data-type="${type}" data-number="${index}"><header><div><p class="eyebrow">${type === "quiz" ? "Short quiz" : type === "monthly" ? "Monthly checkpoint" : "Stage review"}</p><h3>Lesson ${String(entry.lesson).padStart(3, "0")}: ${escapeHtml(entry.title)}</h3></div><span>${total} marks</span></header><p>Sections ${escapeHtml(entry.sections.join(", "))}</p>${review}<div class="questions">${questions}</div></article>`;
}

function renderWeb() {
  const cards = [
    ...quizzes.map((entry, index) => assessmentHtml(entry, "quiz", index)),
    ...monthlyAssessments.map((entry, index) => assessmentHtml(entry, "monthly", index)),
    ...stageReviews.map((entry, index) => assessmentHtml(entry, "review", index)),
  ].join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AS9618 Assessment Bank</title><link rel="icon" href="data:"><link rel="stylesheet" href="./styles.css"></head>
<body><header class="topbar"><div><p class="eyebrow">Cambridge AS9618 Computer Science</p><h1>Assessment bank</h1></div><a href="../">Course index</a></header>
<main><section class="intro"><h2>51 ready-to-use assessments</h2><p>Thirty short quizzes, seven monthly checkpoints and fourteen stage reviews. Attempt each question before opening its mark scheme.</p><p>Original practice calibrated against <a href="${officialPastPapers}">Cambridge's official 9618 past-paper resources</a>; not official Cambridge examination material.</p></section>
<nav class="filters" aria-label="Assessment filters"><button class="active" data-filter="all">All <span>51</span></button><button data-filter="quiz">Quizzes <span>30</span></button><button data-filter="monthly">Monthly <span>7</span></button><button data-filter="review">Stage reviews <span>14</span></button><button id="printBtn">Print</button></nav>
<section class="assessment-list" id="assessmentList">${cards}</section></main><script src="./app.js"></script></body></html>`;
}

const styles = `:root{--bg:#f5f7f8;--panel:#fff;--ink:#172126;--muted:#59666d;--line:#d7dfe2;--accent:#0f766e;--soft:#e7f6f2}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Arial,Helvetica,sans-serif;line-height:1.55}.topbar{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px clamp(16px,4vw,48px);background:#fff;border-bottom:1px solid var(--line)}.topbar h1,.intro h2{margin:4px 0}.topbar a{color:var(--accent);font-weight:700}.eyebrow{margin:0;color:var(--accent);font-size:.78rem;font-weight:800;text-transform:uppercase}main{width:min(1100px,100%);margin:auto;padding:28px clamp(12px,3vw,32px) 64px}.intro{margin-bottom:20px}.filters{position:sticky;top:0;z-index:5;display:flex;gap:8px;flex-wrap:wrap;padding:12px 0;background:var(--bg)}button{border:1px solid var(--line);background:#fff;border-radius:6px;padding:10px 14px;font:inherit;font-weight:700;cursor:pointer}button.active{background:var(--accent);color:#fff;border-color:var(--accent)}button span{font-weight:400}.assessment-list{display:grid;gap:18px}.assessment{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:clamp(16px,3vw,28px)}.assessment>header{display:flex;justify-content:space-between;gap:16px;align-items:start}.assessment h3{margin:4px 0}.assessment>header>span,.question>p>span{color:var(--accent);font-weight:800}.questions,.review-grid{display:grid;gap:12px}.review-grid{grid-template-columns:1fr 1fr;margin:16px 0}.review-grid section,.question{border:1px solid var(--line);padding:14px;background:#fff}.question p{margin:0}.question details{margin-top:10px;padding-top:8px;border-top:1px dashed var(--line)}summary{cursor:pointer;color:var(--accent);font-weight:800;min-height:40px;padding:8px 0}.hidden{display:none}@media(max-width:680px){.topbar,.assessment>header{align-items:flex-start;flex-direction:column}.review-grid{grid-template-columns:1fr}.filters{position:static}.assessment{min-width:0;overflow-wrap:anywhere}}@media print{.topbar,.filters{display:none}.hidden{display:block}.assessment{break-inside:avoid}details:not([open])>*:not(summary){display:none}}`;
const app = `const buttons=[...document.querySelectorAll("[data-filter]")];const cards=[...document.querySelectorAll(".assessment")];for(const button of buttons){button.addEventListener("click",()=>{for(const item of buttons)item.classList.remove("active");button.classList.add("active");for(const card of cards)card.classList.toggle("hidden",button.dataset.filter!=="all"&&card.dataset.type!==button.dataset.filter);});}document.querySelector("#printBtn").addEventListener("click",()=>window.print());`;

validate();
fs.writeFileSync(path.join(root, "assessments", "quizzes.md"), renderQuizzes());
fs.writeFileSync(path.join(root, "assessments", "monthly-assessments.md"), renderMonthly());
fs.writeFileSync(path.join(root, "assessments", "stage-reviews.md"), renderReviews());
const webDir = path.join(root, "web", "assessments");
fs.mkdirSync(webDir, { recursive: true });
fs.writeFileSync(path.join(webDir, "index.html"), renderWeb());
fs.writeFileSync(path.join(webDir, "styles.css"), `${styles}\n`);
fs.writeFileSync(path.join(webDir, "app.js"), `${app}\n`);
console.log("Generated 30 quizzes, 7 monthly assessments, 14 stage reviews and the assessment hub.");
