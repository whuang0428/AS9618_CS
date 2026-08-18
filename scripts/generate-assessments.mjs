import fs from "node:fs";
import path from "node:path";
import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";
import { commandWord, commandWords, expandedSections, paperFor, paperLabel } from "./assessment-filter-utils.mjs";

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
    const expected = quizzes.includes(assessment) ? 10 : 30;
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

**Assessment objectives:** ${entry.assessmentObjectives.join(", ")}

**Coverage:** Lessons ${String(entry.coveredLessons[0]).padStart(3, "0")}-${String(entry.coveredLessons.at(-1)).padStart(3, "0")}

**Time:** 8-10 minutes

**Total:** 10 marks

### Questions

${entry.questions.map(questionMarkdown).join("\n")}

### Answer Key / Mark Scheme

${entry.questions.map(msMarkdown).join("\n\n")}`).join("\n\n---\n\n")}
`;
}

function renderMonthly() {
  return `${intro("Monthly Assessments", "Use these 30-mark checkpoints roughly every 18-20 lessons. Allow 40 minutes plus correction time.")}
${monthlyAssessments.map((entry) => `## Checkpoint at Lesson ${String(entry.lesson).padStart(3, "0")}: ${entry.title}

**Syllabus:** Sections ${entry.sections.join(", ")}

**Assessment objectives:** ${entry.assessmentObjectives.join(", ")}

**Time:** 40 minutes

**Total:** 30 marks

### Questions

${entry.questions.map(questionMarkdown).join("\n")}

### Answer Key / Mark Scheme

${entry.questions.map(msMarkdown).join("\n\n")}`).join("\n\n---\n\n")}
`;
}

function renderReviews() {
  return `${intro("Stage Reviews", "Each 20-mark stage review combines retrieval, error correction and timed exam-style practice.")}
${stageReviews.map((entry) => `## Lesson ${String(entry.lesson).padStart(3, "0")}: ${entry.title}

**Syllabus:** Sections ${entry.sections.join(", ")}

**Assessment objectives:** ${entry.assessmentObjectives.join(", ")}

**Time:** 30-35 minutes

**Total:** 20 marks

### Retrieval Grid [6]

${entry.retrieval.map((entry, index) => `${index + 1}. ${entry.prompt}`).join("\n")}

<details>
<summary>Retrieval answers</summary>

${entry.retrieval.map((entry, index) => `${index + 1}. ${entry.answer}`).join("\n")}

**Marking:** Award 1 mark for each accurate answer. Credit a precise equivalent syllabus term.

</details>

### Error Clinic [4]

${entry.errors.map((entry, index) => `${index + 1}. Correct this claim: “${entry.claim}”`).join("\n")}

<details>
<summary>Corrections</summary>

${entry.errors.map((entry, index) => `${index + 1}. ${entry.correction}\n   - **B1** identifies the technical error.\n   - **B1** supplies the accurate correction.`).join("\n")}

</details>

### Timed Exam Practice [10]

${entry.questions.map(questionMarkdown).join("\n")}

### Answer Key / Mark Scheme

${entry.questions.map(msMarkdown).join("\n\n")}`).join("\n\n---\n\n")}
`;
}

function assessmentHtml(entry, type, index) {
  const questions = entry.questions.map((question, qIndex) => `<article class="question" data-marks="${question.marks}" data-command="${commandWord(question.prompt)}"><p><strong>Q${qIndex + 1}.</strong> ${escapeHtml(question.prompt)} <span>[${question.marks}]</span></p><details><summary>Show mark scheme</summary><ul>${question.points.map(([code, text]) => `<li><strong>${code}</strong> ${escapeHtml(text)}</li>`).join("")}</ul></details></article>`).join("");
  const review = type === "review" ? `<div class="review-grid review-only"><section><h4>Retrieval grid <span>[6]</span></h4><ol>${entry.retrieval.map((item) => `<li>${escapeHtml(item.prompt)}</li>`).join("")}</ol><details><summary>Show answers</summary><ol>${entry.retrieval.map((item) => `<li>${escapeHtml(item.answer)}</li>`).join("")}</ol></details></section><section><h4>Error clinic <span>[4]</span></h4><ol>${entry.errors.map((item) => `<li>${escapeHtml(item.claim)}</li>`).join("")}</ol><details><summary>Show corrections</summary><ol>${entry.errors.map((item) => `<li>${escapeHtml(item.correction)} <strong>[2]</strong></li>`).join("")}</ol></details></section></div><h4 class="review-only">Timed exam practice <span>[10]</span></h4>` : "";
  const total = type === "quiz" ? 10 : type === "monthly" ? 30 : 20;
  const timing = type === "quiz" ? "8-10 minutes" : type === "monthly" ? "40 minutes" : "30-35 minutes";
  const coverage = type === "quiz" ? ` | Lessons ${String(entry.coveredLessons[0]).padStart(3, "0")}-${String(entry.coveredLessons.at(-1)).padStart(3, "0")}` : "";
  return `<article class="assessment" data-type="${type}" data-number="${index}" data-paper="${paperFor(entry)}" data-sections="${expandedSections(entry.sections).join(",")}" data-aos="${entry.assessmentObjectives.join(",")}"><header><div><p class="eyebrow">${type === "quiz" ? "Short quiz" : type === "monthly" ? "Monthly checkpoint" : "Stage review"}</p><h3>Lesson ${String(entry.lesson).padStart(3, "0")}: ${escapeHtml(entry.title)}</h3></div><span>${total} marks</span></header><p>${paperLabel(entry)} | Sections ${escapeHtml(entry.sections.join(", "))} | AO coverage: ${entry.assessmentObjectives.join(", ")} | ${timing}${coverage}</p>${review}<div class="questions">${questions}</div></article>`;
}

function renderWeb() {
  const cards = [
    ...quizzes.map((entry, index) => assessmentHtml(entry, "quiz", index)),
    ...monthlyAssessments.map((entry, index) => assessmentHtml(entry, "monthly", index)),
    ...stageReviews.map((entry, index) => assessmentHtml(entry, "review", index)),
  ].join("\n");
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>AS9618 Assessment Bank</title><link rel="icon" href="data:"><link rel="stylesheet" href="./styles.css"><link rel="stylesheet" href="../stage7-accessibility.css?v=3"><link rel="stylesheet" href="../academic-theme.css?v=5"></head>
<body><a class="skip-link" href="#main-content">Skip to main content</a><header class="topbar"><div><p class="eyebrow">Cambridge AS9618 Computer Science</p><h1>Assessment bank</h1></div><a href="../">Course index</a></header>
<main id="main-content" tabindex="-1"><section class="intro"><h2>51 ready-to-use assessments</h2><p>Thirty short quizzes, seven monthly checkpoints and fourteen stage reviews. Attempt each question before opening its mark scheme.</p><p>Original practice calibrated against <a href="${officialPastPapers}">Cambridge's official 9618 past-paper resources</a>; not official Cambridge examination material.</p></section>
<section class="filters" aria-label="Assessment filters"><div class="type-filters" role="group" aria-label="Assessment type"><button class="active" data-filter="all">All <span>51</span></button><button data-filter="quiz">Quizzes <span>30</span></button><button data-filter="monthly">Monthly <span>7</span></button><button data-filter="review">Stage reviews <span>14</span></button></div><div class="filter-grid"><label>Paper<select id="paperFilter"><option value="all">All papers</option><option value="1">Paper 1</option><option value="2">Paper 2</option></select></label><label>Section<select id="sectionFilter"><option value="all">All sections</option>${Array.from({ length: 12 }, (_, index) => `<option value="${index + 1}">Section ${index + 1}</option>`).join("")}</select></label><label>AO coverage<select id="aoFilter"><option value="all">All AOs</option><option value="AO1">AO1</option><option value="AO2">AO2</option><option value="AO3">AO3</option></select></label><label>Command word<select id="commandFilter"><option value="all">All command words</option>${commandWords.map((word) => `<option value="${word}">${word[0].toUpperCase()}${word.slice(1)}</option>`).join("")}</select></label><label>Minimum marks<input id="minMarks" type="number" min="1" inputmode="numeric" placeholder="Any"></label><label>Maximum marks<input id="maxMarks" type="number" min="1" inputmode="numeric" placeholder="Any"></label></div><div class="filter-actions"><button type="button" id="resetBtn">Reset filters</button><button type="button" id="printBtn">Print</button><p id="resultCount" role="status" aria-live="polite"></p></div></section>
<div class="empty-state hidden" id="emptyState">No assessments match these filters. Reset the filters or widen the question criteria.</div><section class="assessment-list" id="assessmentList">${cards}</section></main><script src="./app.js"></script><script src="../stage7-accessibility.js?v=4"></script></body></html>`;
}

const styles = `:root{--bg:#f5f7f8;--panel:#fff;--ink:#172126;--muted:#59666d;--line:#d7dfe2;--accent:#0f766e;--soft:#e7f6f2}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:Arial,Helvetica,sans-serif;line-height:1.55}.topbar{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:18px clamp(16px,4vw,48px);background:#fff;border-bottom:1px solid var(--line)}.topbar h1,.intro h2{margin:4px 0}.topbar a{color:var(--accent);font-weight:700}.eyebrow{margin:0;color:var(--accent);font-size:.78rem;font-weight:800;text-transform:uppercase}main{width:min(1100px,100%);margin:auto;padding:28px clamp(12px,3vw,32px) 64px}.intro{margin-bottom:20px}.filters{position:sticky;top:0;z-index:5;display:grid;gap:12px;padding:12px;border:1px solid var(--line);border-radius:8px;background:rgba(245,247,248,.97);box-shadow:0 8px 24px rgba(23,33,38,.08)}.type-filters,.filter-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.filter-grid{display:grid;grid-template-columns:repeat(6,minmax(120px,1fr));gap:10px}.filter-grid label{display:grid;gap:4px;color:var(--muted);font-size:.78rem;font-weight:800}.filter-grid :where(select,input){width:100%;min-height:42px;border:1px solid var(--line);border-radius:6px;background:#fff;color:var(--ink);font:inherit;padding:8px}button{border:1px solid var(--line);background:#fff;border-radius:6px;padding:10px 14px;font:inherit;font-weight:700;cursor:pointer}button.active{background:var(--accent);color:#fff;border-color:var(--accent)}button span{font-weight:400}.filter-actions p{margin:0 0 0 auto;color:var(--muted);font-weight:800}.empty-state{margin:18px 0;padding:22px;border:1px solid var(--line);border-radius:8px;background:#fff;color:var(--muted);font-weight:800}.assessment-list{display:grid;gap:18px;margin-top:18px}.assessment{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:clamp(16px,3vw,28px)}.assessment>header{display:flex;justify-content:space-between;gap:16px;align-items:start}.assessment h3{margin:4px 0}.assessment>header>span,.question>p>span{color:var(--accent);font-weight:800}.questions,.review-grid{display:grid;gap:12px}.review-grid{grid-template-columns:1fr 1fr;margin:16px 0}.review-grid section,.question{border:1px solid var(--line);padding:14px;background:#fff}.question p{margin:0}.question details{margin-top:10px;padding-top:8px;border-top:1px dashed var(--line)}summary{cursor:pointer;color:var(--accent);font-weight:800;min-height:40px;padding:8px 0}.hidden{display:none!important}@media(max-width:900px){.filter-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.filters{position:static}}@media(max-width:680px){.topbar,.assessment>header{align-items:flex-start;flex-direction:column}.review-grid,.filter-grid{grid-template-columns:1fr}.assessment{min-width:0;overflow-wrap:anywhere}.filter-actions p{width:100%;margin-left:0}}@media print{.topbar,.filters,.empty-state{display:none!important}.assessment.hidden,.question.hidden,.review-only.hidden{display:none!important}.assessment{break-inside:avoid}details:not([open])>*:not(summary){display:none}}`;
const app = `const typeButtons=[...document.querySelectorAll("[data-filter]")];const cards=[...document.querySelectorAll(".assessment")];const controls={paper:document.querySelector("#paperFilter"),section:document.querySelector("#sectionFilter"),ao:document.querySelector("#aoFilter"),command:document.querySelector("#commandFilter"),min:document.querySelector("#minMarks"),max:document.querySelector("#maxMarks")};let type="all";function includesToken(value,token){return value.split(",").includes(token);}function applyFilters(){const min=controls.min.value===""?null:Number(controls.min.value);const max=controls.max.value===""?null:Number(controls.max.value);const questionFilter=controls.command.value!=="all"||min!==null||max!==null;let visibleCards=0;let visibleQuestions=0;for(const card of cards){const assessmentMatch=(type==="all"||card.dataset.type===type)&&(controls.paper.value==="all"||includesToken(card.dataset.paper,controls.paper.value))&&(controls.section.value==="all"||includesToken(card.dataset.sections,controls.section.value))&&(controls.ao.value==="all"||includesToken(card.dataset.aos,controls.ao.value));let matchingQuestions=0;for(const question of card.querySelectorAll(".question")){const marks=Number(question.dataset.marks);const match=(controls.command.value==="all"||question.dataset.command===controls.command.value)&&(min===null||marks>=min)&&(max===null||marks<=max);question.classList.toggle("hidden",questionFilter&&!match);if(!questionFilter||match)matchingQuestions+=1;}card.querySelectorAll(".review-only").forEach(item=>item.classList.toggle("hidden",questionFilter));const visible=assessmentMatch&&(!questionFilter||matchingQuestions>0);card.classList.toggle("hidden",!visible);if(visible){visibleCards+=1;visibleQuestions+=matchingQuestions;}}document.querySelector("#resultCount").textContent=questionFilter?visibleCards+" assessments · "+visibleQuestions+" exam questions":visibleCards+" assessments";document.querySelector("#emptyState").classList.toggle("hidden",visibleCards>0);}for(const button of typeButtons){button.addEventListener("click",()=>{type=button.dataset.filter;for(const item of typeButtons){item.classList.toggle("active",item===button);item.setAttribute("aria-pressed",String(item===button));}applyFilters();});}for(const control of Object.values(controls)){control.addEventListener(control.matches("input")?"input":"change",applyFilters);}document.querySelector("#resetBtn").addEventListener("click",()=>{type="all";for(const button of typeButtons){const active=button.dataset.filter==="all";button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));}for(const control of Object.values(controls))control.value=control.matches("input")?"":"all";applyFilters();});document.querySelector("#printBtn").addEventListener("click",()=>window.print());applyFilters();`;

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
