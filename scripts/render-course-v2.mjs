import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = JSON.parse(fs.readFileSync(path.join(root, "scripts", "course-v2-content.json"), "utf8"));
const questionBank = JSON.parse(fs.readFileSync(path.join(root, "scripts", "question-bank-contract.json"), "utf8"));
const migration = JSON.parse(fs.readFileSync(path.join(root, "scripts", "course-v2-migration.json"), "utf8"));
const frequency = JSON.parse(fs.readFileSync(path.join(root, "scripts", "past-paper-frequency-contract.json"), "utf8"));
const questionById = new Map(questionBank.questions.map((question) => [question.id, question]));

if (content.lessonCount !== 90 || content.lessons.length !== 90) throw new Error("Course V2 must contain exactly 90 lessons");
if (questionBank.questionCount !== 272) throw new Error("Course V2 question bank must contain 272 lesson questions");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function markdownEscape(value) {
  return String(value ?? "").replaceAll("|", "\\|");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 88);
}

function shorten(value, maximumWords = 30) {
  const words = String(value ?? "").split(/\s+/).filter(Boolean);
  return words.length <= maximumWords ? words.join(" ") : `${words.slice(0, maximumWords).join(" ")}…`;
}

function displaySteps(value, maximumSteps = 6) {
  const fragments = String(value ?? "")
    .split(/(?<=[.!?])\s+|\s+\/\s+|:\s+/)
    .map((fragment) => fragment.trim())
    .filter((fragment) => fragment.split(/\s+/).length >= 3);
  return (fragments.length ? fragments : [value]).slice(0, maximumSteps).map((fragment) => shorten(fragment, 32));
}

function lessonFilename(lesson) {
  return `${lesson.id}-${slugify(lesson.title)}.md`;
}

function paperLabel(lesson) {
  return `Paper ${lesson.paper}`;
}

function sectionLabel(lesson) {
  return lesson.section === "Review" ? lesson.sectionTitle : `Section ${lesson.section}: ${lesson.sectionTitle}`;
}

function renderMarkdown(lesson) {
  const questions = lesson.questionIds.map((id) => questionById.get(id));
  const knowledgeMaterial = lesson.knowledgePoints.map((point, pointIndex) => `### ${pointIndex + 1}. ${markdownEscape(point.displayTitle)} (${point.id})

**Concept map:** ${point.keyTerms.map(markdownEscape).join(" → ")}

**Three-part explanation:**

${point.explanationSteps.map((step, index) => `${index + 1}. ${markdownEscape(step)}`).join("\n")}

**Concrete cue:** ${markdownEscape(point.cue)}

${point.visuals.map((visual) => `#### ${markdownEscape(visual.title)}

![${markdownEscape(visual.title)}](../web/${visual.path})

<details><summary>Text transcript</summary>

${visual.altFacts.map((fact) => `- ${markdownEscape(fact)}`).join("\n")}

</details>`).join("\n\n")}

<details><summary>Precise syllabus wording</summary>

${markdownEscape(point.title)}

${markdownEscape(point.notes)}

</details>`).join("\n\n");
  const supportingMaterial = lesson.supportingVisuals.length
    ? `\n### Supporting diagram library\n\n${lesson.supportingVisuals.map((visual) => `#### ${markdownEscape(visual.title)}\n\n![${markdownEscape(visual.title)}](../web/${visual.path})\n\n<details><summary>Text transcript</summary>\n\n${visual.altFacts.map((fact) => `- ${markdownEscape(fact)}`).join("\n")}\n\n</details>`).join("\n\n")}\n`
    : "";
  const references = lesson.pastPaperRefs.length
    ? `\n### Related past-paper indexes\n\n| Reference | Marks | Command word | Question type |\n|---|---:|---|---|\n${lesson.pastPaperRefs.map((reference) => `| ${markdownEscape(reference.sourceRef)} | ${reference.marks} | ${reference.commandWord} | ${reference.questionType} |`).join("\n")}\n\nThese are indexes only. Cambridge question and mark-scheme wording is not reproduced.\n`
    : "";
  return `# Lesson ${lesson.id}: ${lesson.title}

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** ${paperLabel(lesson)}<br>
**Syllabus:** ${sectionLabel(lesson)}<br>
**Syllabus requirements:** ${lesson.syllabusIds.join(", ")}<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** ${lesson.teachingRoutes.quick}
- **Full route:** ${lesson.teachingRoutes.full}
- **Deep route:** ${lesson.teachingRoutes.deep}

## 1. Prerequisite knowledge and quick diagnostic

${lesson.prerequisitePrompt}

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

${lesson.prerequisiteKnowledge.length ? `### Optional prerequisite refresher\n\n${lesson.prerequisiteKnowledge.map((fact) => `- ${fact}`).join("\n")}\n` : ""}

## 2. Knowledge explanation

${knowledgeMaterial}
${supportingMaterial}
<details><summary>Open precise terminology and exam facts</summary>

${lesson.coreFacts.map((fact) => `- ${fact}`).join("\n")}

</details>

### Worked example

${displaySteps(lesson.workedExample).map((step, index) => `${index + 1}. ${step}`).join("\n")}

${lesson.extension}
## 3. Practice by question type

${questions.map((question, index) => `### Question ${index + 1} - ${question.difficulty} - ${question.commandWord} - ${question.marks} marks

${question.prompt}

**Answer:** ${question.answer}

**Marking guidance:** ${question.guidance}

**Common error:** ${question.commonError}`).join("\n\n")}
${references}
## 4. Summary and exam reminders

### Summary

${lesson.summaryPoints.map((point) => `- ${point}`).join("\n")}

### Common error to correct

${lesson.commonError}

### Exam technique

${lesson.examTips.map((tip) => `- ${tip}`).join("\n")}

${lesson.focus === "integrated-review" ? "**Optional extra practice:** Correct one answer from a timed attempt and record the exact reason each lost mark was lost.\n" : ""}`.trimEnd() + "\n";
}

const materialKindLabels = {
  analogy: "Analogy / use",
  comparison: "Comparison",
  diagram: "Diagram",
  example: "Concrete example",
  process: "Process",
};

function renderVisualFigure(visual, index, total) {
  const altFacts = visual.altFacts.length ? visual.altFacts : [`Visual summary of ${visual.title}`];
  return `<figure class="v2-visual" data-material-kind="${escapeHtml(visual.kind ?? "diagram")}">
            <div class="v2-visual-heading"><span>${String(index + 1).padStart(2, "0")}</span><div><p>${escapeHtml(materialKindLabels[visual.kind] ?? "Diagram")} · ${index + 1} of ${total}</p><h4>${escapeHtml(visual.title)}</h4></div></div>
            <div class="v2-visual-media" tabindex="0" aria-label="Scrollable infographic: ${escapeHtml(visual.title)}"><img src="../${escapeHtml(visual.path)}" alt="${escapeHtml(visual.title)}" loading="lazy" /></div>
            <details class="v2-visual-transcript"><summary>Open text transcript</summary><ul>${altFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul></details>
          </figure>`;
}

function renderVisualRail(visuals, label, railId) {
  if (!visuals.length) return "";
  const controls = visuals.length > 1
    ? `<div class="v2-material-controls">
        <button type="button" data-material-prev aria-controls="${railId}" aria-label="Previous diagram"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg></button>
        <span data-material-position>1 / ${visuals.length}</span>
        <button type="button" data-material-next aria-controls="${railId}" aria-label="Next diagram"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></button>
      </div>`
    : "";
  return `<section class="v2-material-library" aria-label="${escapeHtml(label)}">
    <div class="v2-material-library-head"><h3>${escapeHtml(label)}</h3>${controls}</div>
    <div class="v2-material-rail" id="${railId}" data-material-rail>${visuals.map((visual, index) => renderVisualFigure(visual, index, visuals.length)).join("")}</div>
  </section>`;
}

function renderConceptMap(point) {
  return `<div class="v2-concept-map" aria-label="Concept map for ${escapeHtml(point.id)}">${point.keyTerms.map((term, index) => `<span class="v2-concept-node" data-node-index="${index + 1}">${escapeHtml(term)}</span>`).join("")}</div>`;
}

function renderKnowledgePoints(lesson) {
  const index = `<nav class="v2-knowledge-index" aria-label="Knowledge points in this lesson">${lesson.knowledgePoints.map((point, pointIndex) => `<a href="#knowledge-${slugify(point.id)}"><span>${String(pointIndex + 1).padStart(2, "0")}</span>${escapeHtml(point.id)}</a>`).join("")}</nav>`;
  const points = lesson.knowledgePoints.map((point, pointIndex) => {
    const labels = {
      comparison: ["Contrast", "Evidence", "Decision"],
      concept: ["Meaning", "Mechanism", "Consequence"],
      decision: ["Evidence", "Choice", "Reason"],
      process: ["Start", "Change", "Check"],
      structure: ["Parts", "Connections", "Purpose"],
    }[point.visualMode] ?? ["Meaning", "Mechanism", "Consequence"];
    return `<section class="v2-knowledge-point" id="knowledge-${slugify(point.id)}" data-syllabus-id="${escapeHtml(point.id)}" data-visual-mode="${escapeHtml(point.visualMode)}" data-material-count="${point.materialCount}">
      <header class="v2-knowledge-point-head"><span>${String(pointIndex + 1).padStart(2, "0")}</span><div><p>${escapeHtml(point.id)} · ${escapeHtml(point.visualMode)}</p><h3>${escapeHtml(point.displayTitle)}</h3></div></header>
      <div class="v2-material-triad">
        <article class="v2-native-material v2-native-material--map"><h4>Concept map</h4>${renderConceptMap(point)}</article>
        <article class="v2-native-material v2-native-material--story"><h4>See how it works</h4><ol>${point.explanationSteps.map((step, index) => `<li><span>${escapeHtml(labels[index])}</span><strong>${escapeHtml(step)}</strong></li>`).join("")}</ol></article>
        <aside class="v2-native-material v2-native-material--cue"><h4>Concrete cue</h4><p>${escapeHtml(point.cue)}</p></aside>
      </div>
      ${renderVisualRail(point.visuals, `${point.id} diagrams`, `materials-${lesson.id}-${slugify(point.id)}`)}
      <details class="v2-point-precision"><summary>Open precise syllabus wording</summary><p><strong>${escapeHtml(point.title)}</strong></p><p>${escapeHtml(point.notes)}</p></details>
    </section>`;
  }).join("");
  return `${index}<div class="v2-knowledge-point-list">${points}</div>`;
}

function renderLessonHtml(lesson) {
  const questions = lesson.questionIds.map((id) => questionById.get(id));
  const previous = lesson.previousLesson ? `../lesson-${lesson.previousLesson}/` : "../";
  const next = lesson.nextLesson ? `../lesson-${lesson.nextLesson}/` : "../";
  const paperReferences = lesson.pastPaperRefs.length
    ? `<div class="v2-paper-refs">
          <h3>Related past-paper indexes</h3>
          <table><thead><tr><th>Reference</th><th>Marks</th><th>Command word</th><th>Question type</th></tr></thead>
          <tbody>${lesson.pastPaperRefs.map((reference) => `<tr><td>${escapeHtml(reference.sourceRef)}</td><td>${reference.marks}</td><td>${escapeHtml(reference.commandWord)}</td><td>${escapeHtml(reference.questionType)}</td></tr>`).join("")}</tbody></table>
          <p class="v2-copyright-note">Index only: Cambridge question and mark-scheme wording is not reproduced on this public course page.</p>
        </div>`
    : "";
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <title>AS9618 Lesson ${lesson.id} | ${escapeHtml(lesson.title)}</title>
    <link rel="icon" href="data:" />
    <link rel="stylesheet" href="../stage7-accessibility.css?v=3" />
    <link rel="stylesheet" href="../academic-theme.css?v=7" />
    <link rel="stylesheet" href="../course-v2.css?v=6" />
  </head>
  <body data-course-version="2" data-lesson-id="${lesson.id}" data-syllabus-ids="${escapeHtml(lesson.syllabusIds.join(","))}">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <header class="v2-topbar">
      <div><p class="v2-eyebrow">Cambridge AS9618 | ${paperLabel(lesson)} | ${escapeHtml(sectionLabel(lesson))}</p><h1>${escapeHtml(lesson.title)}</h1></div>
      <nav class="v2-actions" aria-label="Lesson actions"><a href="../">Course home</a><a href="../assessments/">Assessment bank</a><button type="button" id="printLesson">Print</button></nav>
    </header>
    <main class="v2-shell" id="main-content" tabindex="-1">
      <nav class="v2-jump-nav" aria-label="Lesson contents"><strong>Lesson ${lesson.id}</strong><a href="#overview">Overview</a><a href="#prerequisite">Prerequisite</a><a href="#explanation">Explanation</a><a href="#practice">Practice</a><a href="#summary">Summary</a></nav>
      <div class="v2-content">
        <section class="v2-overview" id="overview">
          <div><p class="v2-eyebrow">Flexible-depth lesson</p><p class="v2-overview-copy">${escapeHtml(lesson.syllabusIds.join(", "))} | Learn from the diagrams, test the method, then choose the practice you need.</p></div>
          <details class="v2-route-menu"><summary>Choose a Quick, Full or Deep route</summary><div class="v2-route-grid"><article><h3>Quick route</h3><p>${escapeHtml(lesson.teachingRoutes.quick)}</p></article><article><h3>Full route</h3><p>${escapeHtml(lesson.teachingRoutes.full)}</p></article><article><h3>Deep route</h3><p>${escapeHtml(lesson.teachingRoutes.deep)}</p></article></div></details>
        </section>

        <section class="v2-panel" id="prerequisite">
          <div class="v2-heading"><p class="v2-eyebrow">Part 1 | optional depth</p><h2>Prerequisite knowledge and quick diagnostic</h2></div>
          <div class="v2-diagnostic"><p>${escapeHtml(lesson.prerequisitePrompt)}</p></div>
          <p>Give one accurate definition or method step before continuing. If it is missing, revisit only that prerequisite.</p>
          ${lesson.prerequisiteKnowledge.length ? `<details class="v2-prerequisite-detail"><summary>Open optional prerequisite refresher</summary><ul>${lesson.prerequisiteKnowledge.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul></details>` : ""}
        </section>

        <section class="v2-panel" id="explanation">
          <div class="v2-heading v2-heading--wide"><p class="v2-eyebrow">Part 2 | knowledge-point material sets</p><h2>Learn each point through visuals</h2><p>Follow the map, the three-part explanation and the concrete cue. Open precise wording only after the idea is clear.</p></div>
          <details class="v2-concept-menu"><summary>Open the concept checklist and choose what to teach</summary><ul>${lesson.conceptChecklist.map((concept) => `<li>${escapeHtml(concept)}</li>`).join("")}</ul></details>
          ${renderKnowledgePoints(lesson)}
          ${renderVisualRail(lesson.supportingVisuals, "Supporting diagram library", `materials-${lesson.id}-supporting`)}
          <article class="v2-example"><div><p class="v2-eyebrow">Apply the idea</p><h3>Worked method</h3></div><ol class="v2-worked-flow">${displaySteps(lesson.workedExample).map((step, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(step)}</strong></li>`).join("")}</ol></article>
          <details class="v2-core-facts"><summary>Open precise terminology and exam facts</summary><ul class="v2-facts">${lesson.coreFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul></details>
          <details class="v2-extension"><summary>Beyond syllabus / 延伸知识（不要求背诵）</summary><p>${escapeHtml(lesson.extension.replace(/^Beyond syllabus \/ 延伸知识（不要求背诵）:\s*/, ""))}</p></details>
        </section>

        <section class="v2-panel" id="practice">
          <div class="v2-heading"><p class="v2-eyebrow">Part 3 | select by learner need</p><h2>Practice by question type</h2></div>
          <div class="v2-question-list">${questions.map((question, index) => `<article class="v2-question" data-question-id="${question.id}" data-semantic-fingerprint="${escapeHtml(Object.values(question.semanticFingerprint).join("|"))}">
              <div class="v2-question-head"><span class="v2-badge">${escapeHtml(question.commandWord)}</span><span class="v2-badge">${escapeHtml(question.questionType)}</span><span class="v2-badge difficulty">${escapeHtml(question.difficulty)}</span><span class="v2-badge">${question.marks} marks</span></div>
              <p><strong>Question ${index + 1}.</strong> ${escapeHtml(question.prompt)}</p>
              <details><summary>Show answer and marking guidance</summary><div class="v2-answer-grid"><p><strong>Answer:</strong> ${escapeHtml(question.answer)}</p><p><strong>Marking guidance:</strong> ${escapeHtml(question.guidance)}</p><p><strong>Common error:</strong> ${escapeHtml(question.commonError)}</p></div></details>
            </article>`).join("")}</div>
          ${paperReferences}
        </section>

        <section class="v2-panel" id="summary">
          <div class="v2-heading"><p class="v2-eyebrow">Part 4 | close when ready</p><h2>Summary and exam reminders</h2></div>
          <div class="v2-summary-grid"><div><h3>Summary</h3><ul class="v2-summary-list">${lesson.summaryPoints.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul></div><div class="v2-error"><h3>Common error to correct</h3><p>${escapeHtml(lesson.commonError)}</p></div></div>
          <div class="v2-tip-box"><h3>Exam technique</h3><ul>${lesson.examTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join("")}</ul></div>
        </section>

        <nav class="v2-bottom-nav" aria-label="Previous and next lesson"><a href="${previous}" ${lesson.previousLesson ? "" : 'aria-disabled="true"'}>Previous lesson</a><a href="${next}" ${lesson.nextLesson ? "" : 'aria-disabled="true"'}>Next lesson</a></nav>
      </div>
    </main>
    <script src="../course-v2.js?v=2"></script>
  </body>
</html>\n`;
}

function renderRedirect(oldId, targetId, targetTitle) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /><meta http-equiv="refresh" content="0; url=../lesson-${targetId}/" /><link rel="canonical" href="../lesson-${targetId}/" /><title>Lesson moved | AS9618</title><link rel="stylesheet" href="../academic-theme.css?v=7" /></head><body><main style="max-width:760px;margin:10vh auto;padding:24px"><h1>Lesson ${oldId} has moved</h1><p>The 151-lesson course has been consolidated. Continue to <a href="../lesson-${targetId}/">Lesson ${targetId}: ${escapeHtml(targetTitle)}</a>.</p></main></body></html>\n`;
}

const identityContract = {
  schemaVersion: 3,
  source: "90-lesson syllabus-order curriculum identity contract",
  lessons: content.lessons.map((lesson) => ({ lesson: lesson.lesson, id: lesson.id, title: lesson.title, markdownFile: lessonFilename(lesson) })),
};

const lessonDirectory = path.join(root, "lessons");
for (const filename of fs.readdirSync(lessonDirectory).filter((filename) => /^\d{3}-.*\.md$/.test(filename))) {
  fs.unlinkSync(path.join(lessonDirectory, filename));
}
for (const lesson of content.lessons) {
  fs.writeFileSync(
    path.join(lessonDirectory, lessonFilename(lesson)),
    `${renderMarkdown(lesson).replace(/[ \t]+$/gm, "").trimEnd()}\n`,
  );
  const webDirectory = path.join(root, "web", `lesson-${lesson.id}`);
  fs.mkdirSync(webDirectory, { recursive: true });
  fs.writeFileSync(path.join(webDirectory, "index.html"), renderLessonHtml(lesson).replace(/[ \t]+$/gm, ""));
}

for (let oldLesson = 91; oldLesson <= 151; oldLesson += 1) {
  const row = migration.rows.find((item) => item.oldLesson === oldLesson);
  if (!row) throw new Error(`Missing migration row for old lesson ${oldLesson}`);
  const target = content.lessons[row.primaryNewLesson - 1];
  const oldId = String(oldLesson).padStart(3, "0");
  const webDirectory = path.join(root, "web", `lesson-${oldId}`);
  fs.mkdirSync(webDirectory, { recursive: true });
  fs.writeFileSync(path.join(webDirectory, "index.html"), renderRedirect(oldId, target.id, target.title));
}

fs.writeFileSync(path.join(root, "scripts", "lesson-identity-contract.json"), `${JSON.stringify(identityContract, null, 2)}\n`);

const catalogue = content.lessons.map((lesson) => ({
  number: lesson.lesson,
  id: lesson.id,
  title: lesson.title,
  paper: `Paper ${lesson.paper}`,
  section: lesson.section === "Review" ? "Review" : `Section ${lesson.section}`,
  unitId: lesson.section === "Review" ? `paper-${lesson.paper}-review` : `section-${lesson.section}`,
  unitTitle: lesson.sectionTitle,
}));
fs.writeFileSync(path.join(root, "web", "course-catalog.js"), `/* Generated by scripts/render-course-v2.mjs. */\n(function () {\n  "use strict";\n  const lessons = ${JSON.stringify(catalogue, null, 2)};\n  for (const lesson of lessons) Object.freeze(lesson);\n  globalThis.AS9618CourseCatalog = Object.freeze(lessons);\n}());\n`);

function assessmentQuestion(section, index, lesson) {
  const prompts = [
    `Connect two syllabus ideas from Section ${section} and explain why the connection matters in a new scenario.`,
    `Correct a plausible student error about ${lesson.title.toLowerCase()} and justify the corrected answer.`,
    `Apply the main method from ${lesson.title.toLowerCase()} to a different context from the lesson.`,
    `Compare two alternatives from Section ${section}, then recommend one for a stated purpose.`,
  ];
  return {
    id: `A-S${section}-${index + 1}`,
    sourceType: "original",
    section,
    marks: 5,
    commandWord: index === 0 ? "explain" : index === 1 ? "correct" : index === 2 ? "apply" : "compare",
    prompt: prompts[index],
    answer: lesson.summaryPoints.slice(0, 3).join(" "),
    guidance: "Award up to five independent marks for accurate, connected points applied to the new context.",
    semanticFingerprint: `assessment|S${section}|${index + 1}|transfer`,
  };
}

const sectionChecks = [];
for (let section = 1; section <= 12; section += 1) {
  const sectionLessons = content.lessons.filter((lesson) => lesson.section === section);
  sectionChecks.push({
    id: `SECTION-${section}-CHECK`,
    title: `Section ${section}: ${sectionLessons[0].sectionTitle} - cumulative check`,
    paper: section <= 8 ? 1 : 2,
    section,
    totalMarks: 20,
    questions: Array.from({ length: 4 }, (_, index) => assessmentQuestion(section, index, sectionLessons[index % sectionLessons.length])),
  });
}

function buildMock(paper) {
  const sections = paper === 1 ? [1, 2, 3, 4, 5, 6, 7, 8] : [9, 10, 11, 12, 9, 10, 11, 12];
  const marks = [8, 9, 9, 10, 9, 10, 10, 10];
  return {
    id: `PAPER-${paper}-MOCK`,
    title: `Paper ${paper} original cumulative mock`,
    paper,
    totalMarks: 75,
    questions: sections.map((section, index) => {
      const lesson = content.lessons.filter((item) => item.section === section)[index % content.lessons.filter((item) => item.section === section).length];
      return {
        id: `A-P${paper}-${index + 1}`,
        sourceType: "original",
        section,
        marks: marks[index],
        commandWord: index % 3 === 0 ? "explain" : index % 3 === 1 ? "apply" : "justify",
        prompt: `Use a fresh context to demonstrate and connect the key ideas from ${lesson.title.toLowerCase()}.`,
        answer: lesson.summaryPoints.join(" "),
        guidance: `Award up to ${marks[index]} marks for a complete, technically accurate response that follows the command word and stays in context.`,
        semanticFingerprint: `assessment|P${paper}|S${section}|${index + 1}|cumulative`,
      };
    }),
  };
}

const assessmentContract = {
  schemaVersion: 1,
  source: "Fourteen original cumulative assessments; no lesson prompt or Cambridge wording is reused.",
  setCount: 14,
  sets: [...sectionChecks, buildMock(1), buildMock(2)],
};
fs.writeFileSync(path.join(root, "scripts", "assessment-bank-contract.json"), `${JSON.stringify(assessmentContract, null, 2)}\n`);

const assessmentMarkdown = `# AS9618 Assessment Bank - 90-lesson course\n\nThe active bank contains 12 section checks and two original 75-mark paper mocks. Questions test transfer and are not copied from lesson practice or Cambridge papers.\n\n${assessmentContract.sets.map((set) => `## ${set.title} (${set.totalMarks} marks)\n\n${set.questions.map((question, index) => `### ${index + 1}. ${question.commandWord} - ${question.marks} marks\n\n${question.prompt}\n\n**Answer and guidance:** ${question.answer} ${question.guidance}`).join("\n\n")}`).join("\n\n")}\n`;
for (const filename of ["quizzes.md", "monthly-assessments.md", "stage-reviews.md"]) {
  const target = path.join(root, "assessments", filename);
  if (fs.existsSync(target)) fs.unlinkSync(target);
}
fs.writeFileSync(path.join(root, "assessments", "assessment-bank.md"), assessmentMarkdown);

const assessmentHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>AS9618 Assessment Bank</title><link rel="stylesheet" href="../academic-theme.css?v=7" /><link rel="stylesheet" href="../course-v2.css?v=1" /></head><body><header class="v2-topbar"><div><p class="v2-eyebrow">90-lesson course</p><h1>Assessment Bank</h1></div><nav class="v2-actions"><a href="../">Course home</a></nav></header><main class="v2-content" style="width:min(1100px,100%);margin:0 auto;padding:24px 14px 56px"><section class="v2-hero"><div><p class="v2-eyebrow">14 original cumulative sets</p><h2>Less repetition, more transfer</h2><p>12 section checks and two 75-mark paper mocks. No Cambridge wording is reproduced.</p></div><div class="v2-time-grid"><div><strong>12</strong><span>section checks</span></div><div><strong>2</strong><span>paper mocks</span></div></div></section>${assessmentContract.sets.map((set) => `<section class="v2-panel"><div class="v2-heading"><p class="v2-eyebrow">${set.totalMarks} marks</p><h2>${escapeHtml(set.title)}</h2></div>${set.questions.map((question, index) => `<article class="v2-question"><div class="v2-question-head"><span class="v2-badge">${escapeHtml(question.commandWord)}</span><span class="v2-badge">${question.marks} marks</span></div><p><strong>${index + 1}.</strong> ${escapeHtml(question.prompt)}</p><details><summary>Show answer and guidance</summary><div class="v2-answer-grid"><p>${escapeHtml(question.answer)}</p><p>${escapeHtml(question.guidance)}</p></div></details></article>`).join("")}</section>`).join("")}</main></body></html>\n`;
fs.writeFileSync(
  path.join(root, "web", "assessments", "index.html"),
  assessmentHtml
    .replace('<meta name="viewport" content="width=device-width, initial-scale=1" />', '<meta name="viewport" content="width=device-width, initial-scale=1" /><meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />')
    .replace("<title>AS9618 Assessment Bank</title>", '<link rel="icon" href="data:" /><title>AS9618 Assessment Bank</title>')
    .replace(/\.\.\/course-v2\.css\?v=\d+/, "../course-v2.css?v=5"),
);

const sectionRows = Object.entries(frequency.sectionStatistics).map(([section, stats]) => {
  const firstLesson = content.lessons.find((lesson) => lesson.section === Number(section));
  const lastLesson = [...content.lessons].reverse().find((lesson) => lesson.section === Number(section));
  return `| ${section} | ${stats.marks} | ${stats.paperAppearances} | ${frequency.lessonAllocation.sections[section]} | L${firstLesson.id}-L${lastLesson.id} |`;
}).join("\n");
const courseMap = `# AS9618 90-lesson course map\n\nThe course follows Cambridge 9618 2027-2029 Version 2 Sections 1-12. Paper 1 and Paper 2 each receive 44 teaching lessons plus one integrated review lesson.\n\n## Allocation evidence\n\n| Section | 2023-2025 marks | Distinct-paper appearances | Lessons | Range |\n|---:|---:|---:|---:|---|\n${sectionRows}\n\nAllocation formula: minimum two lessons per section, then 50% syllabus breadth, 25% distinct-paper appearances and 25% marks, rounded by largest remainder in official section order.\n\n## Lesson sequence\n\n${content.lessons.map((lesson) => `- **L${lesson.id}** ${lesson.title} - ${paperLabel(lesson)}, ${sectionLabel(lesson)} - ${lesson.syllabusIds.join(", ")}`).join("\n")}\n`;
fs.writeFileSync(path.join(root, "course-map.md"), courseMap);

const duplicateLists = {
  high: "001, 002, 003, 004, 005, 006, 007, 010, 012, 013, 017, 021, 028, 031, 065, 069, 070, 083, 088, 101, 104, 114, 117, 143, 146",
  method: "008, 009, 011, 043, 048, 063, 064, 077, 090, 102, 105, 106, 110, 116",
  homework: "004, 005, 006, 008, 009, 011, 012, 013, 014, 020, 026, 034, 037, 038, 040, 046, 047, 048, 049, 050, 053, 123, 125, 135, 137, 139, 144, 147, 148",
  worked: "002, 003, 005, 006, 009, 011, 012, 014, 036, 037, 038, 041, 048, 085, 091, 097, 103, 106, 107, 134",
  visuals: "001, 002, 004, 007, 008, 010, 011, 013, 032, 033, 042, 043, 044, 046, 047, 048, 050, 053, 054, 055, 067, 070, 073, 075, 077, 079, 080, 081, 084, 085, 086, 100, 102, 103, 104, 114, 115, 116, 118, 120, 121, 127, 128, 129, 130, 131, 134, 143, 144, 145, 146",
};
const report = `# Course redundancy audit and 151-to-90 migration report\n\n## Plain-language conclusion\n\nThe old course repeated the same idea in several places: first as targeted practice, again as exam-style practice, and often again as homework. Some worked examples also reappeared as questions. Knowledge infographics frequently repeated the paragraph immediately above or below them. The new course has one explanation flow, one practice-by-type block and one summary/error block per lesson.\n\n## Confirmed old locations\n\n- Exact or near-exact exercise repetition: ${duplicateLists.high}.\n- Same method with only numbers or context changed: ${duplicateLists.method}.\n- Homework repeated earlier practice: ${duplicateLists.homework}.\n- Worked examples repeated later questions: ${duplicateLists.worked}.\n- Priority visual/text overlap review: ${duplicateLists.visuals}.\n\n## What changed\n\n- 151 active lessons became 90 syllabus-order lessons.\n- Targeted Practice, Exam-style and fixed Homework were replaced by one practice-by-question-type block.\n- 272 lesson questions are tracked in one bank with semantic fingerprints.\n- 784 old explanation panels were not carried forward as a quota; ${content.lessons.reduce((sum, lesson) => sum + (lesson.visuals?.length ?? (lesson.visual ? 1 : 0)), 0)} relevant visuals are now grouped by lesson, with optional text transcripts and readable mobile scrolling.\n- 51 old assessment sets became 12 section checks and two paper mocks.\n- Past-paper PDFs remained outside the repository. The tracked contract stores 915 question-part references and statistics, not question wording.\n\n## Migration register\n\n| Old lesson | Old title | New lesson | New title | Reason |\n|---|---|---|---|---|\n${migration.rows.map((row) => `| L${String(row.oldLesson).padStart(3, "0")} | ${markdownEscape(row.oldTitle)} | L${String(row.primaryNewLesson).padStart(3, "0")} | ${markdownEscape(row.newTitle)} | ${markdownEscape(row.reason)} |`).join("\n")}\n`;
fs.writeFileSync(path.join(root, "audits", "course-v2-redundancy-and-migration-report.md"), report);
fs.writeFileSync(path.join(root, "audits", "course-v2-migration-register.csv"), `old_lesson,old_title,new_lesson,new_title,reason\n${migration.rows.map((row) => [row.oldLesson, row.oldTitle, row.primaryNewLesson, row.newTitle, row.reason].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n")}\n`);

const indexPath = path.join(root, "web", "index.html");
let indexSource = fs.readFileSync(indexPath, "utf8")
  .replaceAll("151 lessons", "90 lessons")
  .replaceAll("<strong>151</strong><span>lesson pages</span>", "<strong>90</strong><span>lesson pages</span>")
  .replaceAll("90 lessons | 45 minutes each", "90 flexible-depth lessons")
  .replaceAll("<strong>45</strong><span>minutes per lesson</span>", "<strong>3</strong><span>teaching-depth routes</span>")
  .replaceAll("course-catalog.js?v=3", "course-catalog.js?v=4")
  .replaceAll("index.js?v=2", "index.js?v=3")
  .replace("Teach the course, project each lesson, or revise independently.", "Study each idea once, then practise it in genuinely different ways.")
  .replace("This is the classroom teaching and revision version of the AS9618 course pack. Teachers can use the fixed lesson\n            toolbar for quick navigation; students can use the same complete page for preview and revision.", "This 90-lesson course follows the official syllabus order. Each lesson combines prerequisite support, a rich explanation that can be taught at different depths, varied practice and an exam-focused summary.")
  .replace("Each lesson combines prerequisite support, one clear explanation, varied practice and an exam-focused summary.", "Each lesson combines prerequisite support, a rich explanation that can be taught at different depths, varied practice and an exam-focused summary.");
fs.writeFileSync(indexPath, indexSource);

console.log(JSON.stringify({
  lessonsRendered: content.lessons.length,
  redirectsRendered: 61,
  lessonQuestions: questionBank.questionCount,
  assessmentSets: assessmentContract.setCount,
  markdownLessons: fs.readdirSync(lessonDirectory).filter((filename) => /^\d{3}-.*\.md$/.test(filename)).length,
}, null, 2));
