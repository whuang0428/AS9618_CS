import { imageDimensions } from "./image-dimensions.mjs";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { validateSection2Presentation } from "./course-v3-section2-checks.mjs";
import { validateSection1Presentation, section1PresentationSelfTest } from "./course-v3-section1-checks.mjs";
import { validateSection3Presentation } from "./course-v3-section3-checks.mjs";
import { validateSection4Presentation } from "./course-v3-section4-checks.mjs";
import { validateSection6Presentation } from "./course-v3-section6-checks.mjs";
import { validateSection5Presentation } from "./course-v3-section5-checks.mjs";
import { validateSection8Presentation, validateSection8Html } from "./course-v3-section8-checks.mjs";
import { validateSection11Presentation, validateSection11Html } from "./course-v3-section11-checks.mjs";
import { validateSection9Presentation, validateSection9Html } from "./course-v3-section9-checks.mjs";
import { validateSection12Presentation, validateSection12Html } from "./course-v3-section12-checks.mjs";
import { validateSection10Presentation, validateSection10Diagrams, validateSection10Html } from "./course-v3-section10-checks.mjs";
import { validateSection7Presentation, validateSection7Html } from "./course-v3-section7-checks.mjs";
import { classifyCommand } from "./cie-command-words.mjs";
import { courseV3Lessons, courseV3Meta, sectionMeta } from "./course-v3-content.mjs";
import { normalisePresentationText, unitMaterials, visibleRoleTexts } from "./course-v3-presentation.mjs";
import { courseV3KnowledgeDiagramRecords } from "./course-v3-knowledge-diagrams.mjs";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const webRoot = join(root, "web");
const contract = JSON.parse(readFileSync(join(root, "scripts", "course-v3-contract.json"), "utf8"));
const anchorManifest = JSON.parse(readFileSync(join(root, "scripts", "course-v3-section-anchor-assets.json"), "utf8"));
const migration = JSON.parse(readFileSync(join(root, "scripts", "course-v2-migration.json"), "utf8"));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
errors.push(...validateSection3Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection6Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection5Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection4Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection7Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection7Html(courseV3Lessons, (lesson) => readFileSync(join(webRoot, "course-v3", lesson.route, "index.html"), "utf8")));
errors.push(...validateSection8Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection8Html(courseV3Lessons, (lesson) => readFileSync(join(webRoot, "course-v3", lesson.route, "index.html"), "utf8")));
errors.push(...validateSection11Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection11Html(courseV3Lessons, (lesson) => readFileSync(join(webRoot, "course-v3", lesson.route, "index.html"), "utf8")));
errors.push(...validateSection9Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection9Html(courseV3Lessons, (lesson) => readFileSync(join(webRoot, "course-v3", lesson.route, "index.html"), "utf8")));
errors.push(...validateSection12Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection12Html(courseV3Lessons, (lesson) => readFileSync(join(webRoot, "course-v3", lesson.route, "index.html"), "utf8")));
errors.push(...validateSection10Presentation(courseV3Lessons, JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8"))));
errors.push(...validateSection10Diagrams());
errors.push(...validateSection10Html(courseV3Lessons, (lesson) => readFileSync(join(webRoot, "course-v3", lesson.route, "index.html"), "utf8")));
const sha256 = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");
const hasRootRelativeAsset = (html) => /\b(?:src|href)="\/assets\//.test(html);
const words = (value) => normalisePresentationText(value).split(" ").filter(Boolean);
const markingPointSignature = (values) => values.map(normalisePresentationText).sort().join("|");


function tokenSimilarity(left, right) {
  const a = words(left);
  const b = words(right);
  if (!a.length || !b.length) return 0;
  const counts = (tokens) => tokens.reduce((map, token) => map.set(token, (map.get(token) ?? 0) + 1), new Map());
  const leftCounts = counts(a);
  const rightCounts = counts(b);
  let overlap = 0;
  for (const [token, count] of leftCounts) overlap += Math.min(count, rightCounts.get(token) ?? 0);
  return (2 * overlap) / (a.length + b.length);
}

function duplicateReason(left, right) {
  const a = normalisePresentationText(left);
  const b = normalisePresentationText(right);
  if (Math.min(words(a).length, words(b).length) < 8) return null;
  if (a === b) return "exact";
  if (a.includes(b) || b.includes(a)) return "containment";
  return tokenSimilarity(a, b) >= 0.82 ? "similarity" : null;
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|lt|gt|quot|#039);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function renderedQuestionBlock(html, className, questionId) {
  const marker = `class="${className}" data-question-id="${questionId}"`;
  const markerIndex = html.indexOf(marker);
  if (markerIndex < 0) return "";
  const tagStart = html.lastIndexOf("<", markerIndex);
  const nextMarker = html.indexOf(`class="${className}" data-question-id=`, markerIndex + marker.length);
  const nextTag = nextMarker < 0 ? -1 : html.lastIndexOf("<", nextMarker);
  const nextStageName = className === "practice-question" ? "3-original-exam-style-question" : "4-summary";
  const nextStageMarker = html.indexOf(`data-stage="${nextStageName}"`, markerIndex + marker.length);
  const nextStageTag = nextStageMarker < 0 ? -1 : html.lastIndexOf("<section", nextStageMarker);
  const endCandidates = [nextTag, nextStageTag].filter((index) => index > tagStart);
  return html.slice(tagStart, endCandidates.length ? Math.min(...endCandidates) : html.length);
}

function renderedListItemCount(block) {
  return (block.match(/<li>/g) ?? []).length;
}

function requirementForQuestion(question, lesson) {
  return question.objectiveIds.map((id) => id.match(/^S(?:[1-9]|1[0-2])\.\d{2}/)?.[0]).find(Boolean) ?? lesson.syllabusIds[0];
}

check(courseV3Meta.schemaVersion === 5, `Expected schema version 5, found ${courseV3Meta.schemaVersion}`);
check(courseV3Meta.lessonCount === 93, `Expected 93 pages, found ${courseV3Meta.lessonCount}`);
check(courseV3Meta.teachingLessonCount === 91, `Expected 91 teaching lessons, found ${courseV3Meta.teachingLessonCount}`);
check(courseV3Meta.reviewLessonCount === 2, `Expected two review lessons, found ${courseV3Meta.reviewLessonCount}`);
check(Object.keys(sectionMeta).length === 12, "Expected Sections 1–12");
check(contract.schemaVersion === 5 && contract.lessons.length === 93, "Generated contract must use schema version 5 and contain 93 pages");
check(courseV3Lessons.filter((lesson) => lesson.kind === "teaching").every((lesson) => lesson.units.length > 0), "Every teaching lesson must contain at least one knowledge unit");
const practiceQuestionCount = courseV3Lessons.flatMap((lesson) => lesson.practice).length;
check(courseV3Lessons.every((lesson) => lesson.practice.length >= 3), "Every lesson must contain at least three practice questions");
check(courseV3Meta.examStyleQuestionCount === 285, `Expected 285 exam-style questions, found ${courseV3Meta.examStyleQuestionCount}`);
check(courseV3KnowledgeDiagramRecords.length > 0, "Knowledge-diagram registry is empty");

const officialOrder = Object.keys(officialAsMapping);
const firstOccurrence = [];
const seenRequirements = new Set();
for (const lesson of courseV3Lessons.filter((item) => item.kind === "teaching")) for (const id of lesson.syllabusIds) if (!seenRequirements.has(id)) { seenRequirements.add(id); firstOccurrence.push(id); }
check(seenRequirements.size === 121, `Expected 121 unique official requirements, found ${seenRequirements.size}`);
const expectedTeachingOrder = officialOrder.filter((id) => id !== "S1.06");
expectedTeachingOrder.splice(expectedTeachingOrder.indexOf("S1.03") + 1, 0, "S1.06");
check(JSON.stringify(firstOccurrence) === JSON.stringify(expectedTeachingOrder), "First teaching occurrence does not follow the approved sequence with S1.06 integrated into lesson 002");
check(JSON.stringify(contract.syllabusOrder) === JSON.stringify(officialOrder), "Generated contract syllabus order differs from official mapping");

const stageNames = ["1-visual-and-core", "2-practice", "3-original-exam-style-question", "4-summary"];
const forbiddenStudentLabels = /Mechanism or method|Mastery check|Knowledge check|Supplementary visual recap|Method recap|Lesson technical reference|Identify\s*(?:\/|→)\s*Connect\s*(?:\/|→)\s*Apply|Cause\s*(?:\/|→)\s*Mechanism\s*(?:\/|→)\s*Consequence|Stage\s*\d+[^.]{0,60}(?:approved|review)|approved assets|Teaching-depth menu/i;
const forbiddenExamPhrasing = /show understanding|diagnose and connect|in an integrated response|(?:explain|describe)\s+(?:understand|analyse)|why the statement|how why|how choose|describe why|(?:explain|describe)\s+how how|(?:explain|describe)\s+(?:give|complete)|how put|how whether|the required the|when (?:suggest|recommend|write|explain|describe)|(?:explain|describe) apply|explain type adds/i;
const forbiddenExamMarkingPoint = /database design review:|each named item remains core|do not revise each term in isolation|correct one plausible error about|^transfer\.?$|apply one section \d+ method|and limitation\.?$|\bcandidates?\s+(?:must|should|are required|need)|not required by the syllabus|the syllabus says|will always be given|syllabus list above|non-required task|^(?:yes|no)\.?$/i;
const requiredPracticeAnswerTerms = Object.freeze({
  "V3-006-S1.11-WHY-COMPRESS-CHECK": ["storage space", "transmitted bits", "transfer time", "bandwidth"],
  "V3-006-S1.11-RLE-CHECK": ["count-then-value", "repeats each value", "exact original", "count overhead"],
  "V3-024-S4.13-CHECK": ["ldm", "ldd", "ldi", "ldx", "ldr", "mov", "sto", "add", "sub", "inc", "dec", "jmp", "cmp", "cmi", "jpe", "jpn", "in", "out", "end"],
  "V3-025-S4.15-CHECK": ["and", "or", "xor", "lsl", "lsr", "arithmetic", "cyclic", "test", "set", "clear", "toggle", "monitor", "control"],
  "V3-043-S8.09-CHECK": ["create database", "create table", "character", "varchar", "boolean", "integer", "real", "date", "time", "alter table", "primary key", "foreign key", "references"],
  "V3-043-S8.10-CHECK": ["select", "from", "where", "order by", "group by", "inner join", "on", "sum", "count", "avg", "two tables"],
  "V3-073-S11.04-CHECK": ["if", "else", "nested", "case", "for loop", "while loop", "repeat loop", "pre-condition", "post-condition"],
  "V3-078-S11.08-CHECK": ["procedure header", "function header", "parameter", "argument", "return", "interface"],
  "V3-085-S12.05-CHECK": ["dry run", "walkthrough", "white-box", "black-box", "integration", "alpha", "beta", "acceptance", "stub"],
});
const containsNormalisedTerm = (value, term) => ` ${normalisePresentationText(value)} `.includes(` ${normalisePresentationText(term)} `);
let commandWordCount = 0;
let examStyleQuestionCount = 0;
for (const lesson of courseV3Lessons) {
  const label = `L${String(lesson.sequenceIndex).padStart(3, "0")} ${lesson.lessonKey}`;
  const htmlPath = join(webRoot, "course-v3", lesson.route, "index.html");
  check(existsSync(htmlPath), `${label}: missing rendered page`);
  if (!existsSync(htmlPath)) continue;
  const html = readFileSync(htmlPath, "utf8");
  const studentText = visibleText(html);
  let priorIndex = -1;
  for (const stage of stageNames) {
    const index = html.indexOf(`data-stage="${stage}"`);
    check(index > priorIndex, `${label}: missing or out-of-order ${stage}`);
    priorIndex = index;
  }
  for (const heading of ["Visual overview and core explanation", "Practice questions", "Original exam-style questions and marking points", "Summary"]) check(studentText.includes(heading), `${label}: missing fixed heading ${heading}`);
  check(!forbiddenStudentLabels.test(studentText), `${label}: retired or internal teaching label remains visible`);
  check(!/<header><span>(?:Retrieval|Application|Mastery)<\/span>/i.test(html), `${label}: internal question classification remains visible`);
  check(!hasRootRelativeAsset(html), `${label}: root-relative /assets URL breaks on project-based GitHub Pages`);
  check((html.match(/class="knowledge-unit"/g) ?? []).length === lesson.units.length, `${label}: rendered knowledge-unit count differs from source`);
  check((html.match(/class="practice-question"/g) ?? []).length === lesson.practice.length, `${label}: rendered practice count differs from source`);
  check((html.match(/data-role="lead-visual"/g) ?? []).length === lesson.units.length, `${label}: every unit must render exactly one lead visual`);
  check((html.match(/data-role="core-explanation"/g) ?? []).length === lesson.units.length, `${label}: every unit must render exactly one core explanation`);
  check(html.includes("class=\"past-paper\""), `${label}: original exam-style question is missing`);
  check((html.match(/class="exam-question"/g) ?? []).length === lesson.examStyleQuestions.length, `${label}: rendered exam-style question count differs from source`);
  check(lesson.practice.length >= 3, `${label}: fewer than three practice questions`);
  check(lesson.examStyleQuestions.length >= 3, `${label}: fewer than three exam-style questions`);

  for (const [unitIndex, unit] of lesson.units.entries()) {
    const unitLabel = `${label} ${unit.syllabusId ?? unit.heading}`;
    check(unit.leadVisual && unit.coreExplanation?.length >= 1, `${unitLabel}: leadVisual or coreExplanation missing`);
    check(!(Object.hasOwn(unit, "explanation") && unit.explanation !== undefined), `${unitLabel}: retired explanation field remains`);
    check(!(Object.hasOwn(unit, "materials") && unit.materials !== undefined), `${unitLabel}: retired materials field remains`);
    check(unit.misconceptions?.length >= 1, `${unitLabel}: misconception guidance missing`);
    for (let left = 0; left < unit.coreExplanation.length; left += 1) for (let right = left + 1; right < unit.coreExplanation.length; right += 1) {
      check(!duplicateReason(unit.coreExplanation[left], unit.coreExplanation[right]), `${unitLabel}: core explanation repeats itself`);
    }
    const unitStart = html.indexOf(`data-unit-index="${unitIndex + 1}"`);
    const nextUnit = unitIndex + 1 < lesson.units.length ? html.indexOf(`data-unit-index="${unitIndex + 2}"`, unitStart + 1) : html.length;
    const visualIndex = html.indexOf("data-role=\"lead-visual\"", unitStart);
    const coreIndex = html.indexOf("data-role=\"core-explanation\"", unitStart);
    check(unitStart >= 0 && visualIndex > unitStart && coreIndex > visualIndex && coreIndex < nextUnit, `${unitLabel}: lead visual does not precede core explanation in the DOM`);

    for (const material of unitMaterials(unit)) {
      check(material.objectiveIds?.length > 0 || lesson.kind === "review", `${unitLabel}: ${material.title} has no objective mapping`);
      if (material.type === "table") check(material.headers.length >= 2 && material.rows.length >= 1, `${unitLabel}: empty comparison table`);
      if (material.type === "list") check(material.items.length >= 2 && material.items.every((item) => item.length === 2), `${unitLabel}: structured list is empty or malformed`);
      if (material.type === "flow") check(material.steps.length >= 2, `${unitLabel}: method has fewer than two steps`);
      if (material.type === "worked-example") {
        check(material.steps.length >= 2, `${unitLabel}: worked example has fewer than two steps`);
        check(!material.steps.some(([, text]) => /…|\.\.\.$/.test(text)), `${unitLabel}: worked example is visibly truncated`);
      }
      if (material.type === "reviewed-visual") check(material.alt.length >= 40 && material.facts.length >= 2, `${unitLabel}: visual lacks precise alternative text`);
      if (material.type === "analogy") check(material.boundary.length >= 50, `${unitLabel}: analogy boundary is missing or too short`);
    }

    const roles = visibleRoleTexts(unit);
    const roleNames = Object.keys(roles);
    for (let left = 0; left < roleNames.length; left += 1) for (let right = left + 1; right < roleNames.length; right += 1) {
      for (const leftText of roles[roleNames[left]]) for (const rightText of roles[roleNames[right]]) {
        const reason = duplicateReason(leftText, rightText);
        check(!reason, `${unitLabel}: ${reason} duplicate between ${roleNames[left]} and ${roleNames[right]}`);
      }
    }
  }

  const coreParagraphs = new Set(lesson.units.flatMap((unit) => unit.coreExplanation).map(normalisePresentationText));
  for (const question of lesson.practice) {
    commandWordCount += 1;
    const classification = classifyCommand(question.prompt, requirementForQuestion(question, lesson));
    check(classification.status === "Approved", `${label} ${question.id}: Cambridge command classification is blocked`);
    check(question.commandWord?.toLowerCase() === classification.word, `${label} ${question.id}: commandWord does not match the prompt`);
    check(html.includes(`Command word: ${question.commandWord}`), `${label} ${question.id}: command word is not rendered`);
    check(question.answerPoints.length >= 1, `${label} ${question.id}: practice marking points are missing`);
    if (/-CHECK$/i.test(question.id)) check(question.marks === question.answerPoints.length, `${label} ${question.id}: coverage-check marks do not match the complete marking-point count`);
    for (const term of requiredPracticeAnswerTerms[question.id] ?? []) check(containsNormalisedTerm(question.answerPoints.join(" "), term), `${label} ${question.id}: complete practice answer is missing ${term}`);
    const renderedBlock = renderedQuestionBlock(html, "practice-question", question.id);
    check(Boolean(renderedBlock), `${label} ${question.id}: practice question is not rendered`);
    check(renderedListItemCount(renderedBlock) === question.answerPoints.length, `${label} ${question.id}: rendered practice answer has ${renderedListItemCount(renderedBlock)} points but source has ${question.answerPoints.length}`);
    for (const point of question.answerPoints) check(!(words(point).length >= 8 && coreParagraphs.has(normalisePresentationText(point))), `${label} ${question.id}: marking point copies a full core paragraph`);
  }
  const practiceMarkingPointSignatures = new Map(lesson.practice.map((question) => [
    markingPointSignature(question.answerPoints),
    question.id,
  ]));
  const examMarkingPointSignatures = new Set();
  for (const question of lesson.examStyleQuestions) {
    examStyleQuestionCount += 1;
    const classification = classifyCommand(question.task, requirementForQuestion(question, lesson));
    check(classification.status === "Approved", `${label} ${question.id}: exam-style Cambridge command classification is blocked`);
    check(question.commandWord?.toLowerCase() === classification.word, `${label} ${question.id}: exam-style commandWord does not match the task`);
    check(question.markLogic.length >= 1, `${label} ${question.id}: exam-style marking points are missing`);
    check(question.marks === question.markLogic.length, `${label} ${question.id}: exam-style marks do not match the number of marking points`);
    check(!forbiddenExamPhrasing.test(question.task), `${label} ${question.id}: exam-style task contains internal or ungrammatical objective wording`);
    check(!question.markLogic.some((point) => forbiddenExamMarkingPoint.test(point)), `${label} ${question.id}: exam-style marking points contain internal or incomplete review wording`);
    check(html.includes(`data-question-id="${question.id}"`), `${label} ${question.id}: exam-style question is not rendered`);
    const renderedBlock = renderedQuestionBlock(html, "exam-question", question.id);
    check(renderedListItemCount(renderedBlock) === question.markLogic.length, `${label} ${question.id}: rendered exam-style answer has ${renderedListItemCount(renderedBlock)} points but source has ${question.markLogic.length}`);
    for (const practiceQuestion of lesson.practice) {
      check(!duplicateReason(question.task, practiceQuestion.prompt), `${label} ${question.id}: exam-style task repeats Practice question ${practiceQuestion.id}`);
      if ([1, 2].includes(lesson.section)) {
        const sharedMarkingPoints = question.markLogic.filter((examPoint) => practiceQuestion.answerPoints.some(
          (practicePoint) => normalisePresentationText(examPoint) === normalisePresentationText(practicePoint),
        ));
        check(sharedMarkingPoints.length === 0, `${label} ${question.id}: reuses ${sharedMarkingPoints.length} Practice marking point(s) from ${practiceQuestion.id}`);
        check(tokenSimilarity(question.task, practiceQuestion.prompt) < 0.55, `${label} ${question.id}: remains too similar to Practice question ${practiceQuestion.id}`);
      }
    }
    for (const point of question.markLogic) check(!(words(point).length >= 8 && coreParagraphs.has(normalisePresentationText(point))), `${label} ${question.id}: exam-style marking point copies a full core paragraph`);
    const answerSignature = markingPointSignature(question.markLogic);
    check(!practiceMarkingPointSignatures.has(answerSignature), `${label} ${question.id}: marking points repeat Practice answer ${practiceMarkingPointSignatures.get(answerSignature)}`);
    examMarkingPointSignatures.add(answerSignature);
  }
  check(examMarkingPointSignatures.size === lesson.examStyleQuestions.length, `${label}: exam-style questions repeat the same marking-point set`);
  for (const [, body] of lesson.summary) for (const paragraph of lesson.units.flatMap((unit) => unit.coreExplanation)) {
    check(!duplicateReason(body, paragraph), `${label}: summary repeats the core explanation`);
  }

  if (lesson.kind === "teaching") for (const [objectiveId, description] of lesson.objectives) {
    const units = lesson.units.filter((unit) => unit.objectiveIds.includes(objectiveId));
    const materials = units.flatMap((unit) => unitMaterials(unit).filter((material) => material.objectiveIds.includes(objectiveId)));
    const questions = lesson.practice.filter((question) => question.objectiveIds.includes(objectiveId));
    check(description.length >= 20, `${label} ${objectiveId}: objective is not teachable prose`);
    check(units.length >= 1, `${label} ${objectiveId}: no core explanation mapping`);
    check(materials.length >= 1, `${label} ${objectiveId}: no teaching-material mapping`);
    check(questions.length >= 1, `${label} ${objectiveId}: no practice mapping`);
  }
}
check(commandWordCount === practiceQuestionCount, `Expected ${practiceQuestionCount} classified questions, found ${commandWordCount}`);
check(examStyleQuestionCount === 285, `Expected 285 classified exam-style questions, found ${examStyleQuestionCount}`);

const missingLeadVisuals = courseV3Lessons.filter((lesson) => lesson.kind === "teaching").flatMap((lesson) => lesson.units.filter((unit) => !unit.leadVisual).map((unit) => `${lesson.lessonKey}:${unit.heading}`));
check(missingLeadVisuals.length === 0, `Teaching units lack a lead visual: ${missingLeadVisuals.join(" | ")}`);

const lesson002 = courseV3Lessons.find((lesson) => lesson.sequenceIndex === 2);
const lesson002Headings = ["Binary", "Denary", "Hexadecimal", "Binary Coded Decimal (BCD)", "One's complement", "Two's complement", "Conversion between number systems and representations"];
check(JSON.stringify(lesson002?.units.map((unit) => unit.heading)) === JSON.stringify(lesson002Headings), "L002 must render seven independent knowledge units in the required order");
check(/binary place values/i.test(lesson002?.units[0]?.leadVisual?.title ?? ""), "L002 must begin with the binary place-value visual rather than a complement visual");
const lesson002Core = lesson002?.units.map((unit) => unit.coreExplanation.join(" ")) ?? [];
check(!/(?:denary|hexadecimal|BCD|complement)/i.test(lesson002Core[0] ?? ""), "L002 Binary core explanation contains a later concept");
check(!/(?:binary|hexadecimal|BCD|complement)/i.test(lesson002Core[1] ?? ""), "L002 Denary core explanation contains a different concept");
check(!/(?:denary|BCD|complement)/i.test(lesson002Core[2] ?? ""), "L002 Hexadecimal core explanation contains a different concept");
check(!/(?:hexadecimal|complement)/i.test(lesson002Core[3] ?? ""), "L002 BCD core explanation contains a later concept");
check(!/(?:two's complement|BCD|hexadecimal)/i.test(lesson002Core[4] ?? ""), "L002 One's-complement core explanation contains a later concept");
check(!/(?:one's complement|BCD|hexadecimal)/i.test(lesson002Core[5] ?? ""), "L002 Two's-complement core explanation contains a different representation");

const lesson003 = courseV3Lessons.find((lesson) => lesson.sequenceIndex === 3);
const lesson003Html = readFileSync(join(webRoot, "course-v3", "lesson-003", "index.html"), "utf8");
const lesson003Terms = ["Unsigned binary addition and subtraction", "Overflow in fixed-width arithmetic", "Signed binary addition and subtraction"];
let lesson003PriorIndex = -1;
for (const term of lesson003Terms) {
  const index = lesson003Html.indexOf(term);
  check(index > lesson003PriorIndex, `L003 teaching order is missing or out of sequence at ${term}`);
  lesson003PriorIndex = index;
}
check(/binary addition, subtraction and overflow/i.test(lesson003?.title ?? ""), "L003 title must include the required arithmetic and overflow");

const lesson004 = courseV3Lessons.find((lesson) => lesson.sequenceIndex === 4);
const lesson004Headings = ["Character sets and internal binary representation", "ASCII", "Extended ASCII", "Unicode"];
check(JSON.stringify(lesson004?.units.map((unit) => unit.heading)) === JSON.stringify(lesson004Headings), "L004 must render four independent character-encoding units in the required order");
const lesson004VisibleContent = JSON.stringify({ title: lesson004?.title, units: lesson004?.units, practice: lesson004?.practice, exam: lesson004?.examStyleQuestions, summary: lesson004?.summary });
check(!/\bBCD\b|hexadecimal/i.test(lesson004VisibleContent), "L004 still contains BCD or hexadecimal content after moving S1.06 to lesson 002");

const unitCovers = (unit, syllabusId) => unit?.syllabusId === syllabusId || unit?.objectiveIds?.some((id) => id.startsWith(`${syllabusId}.`));

const checkUnitAssetSequence = (sequenceIndex, expectedAssets) => {
  const lesson = courseV3Lessons.find((item) => item.sequenceIndex === sequenceIndex);
  check(lesson?.units.length === expectedAssets.length, `L${String(sequenceIndex).padStart(3, "0")} must contain ${expectedAssets.length} independently illustrated knowledge units`);
  for (const [unitIndex, assetName] of expectedAssets.entries()) {
    if (!assetName) continue;
    check(lesson?.units[unitIndex]?.leadVisual?.asset?.endsWith(`/${assetName}`), `L${String(sequenceIndex).padStart(3, "0")} unit ${unitIndex + 1} must use ${assetName}`);
  }
  return lesson;
};

const lesson008 = courseV3Lessons.find((lesson) => lesson.sequenceIndex === 8);
check(lesson008?.units[1]?.leadVisual?.asset?.endsWith("/topology-consequences.png"), "L008 topology consequences must use a topology visual");
check(!/client[- ]server|peer[- ]to[- ]peer/i.test(JSON.stringify({ leadVisual: lesson008?.units[1]?.leadVisual, coreExplanation: lesson008?.units[1]?.coreExplanation })), "L008 topology consequences still mixes network-model content into the topology unit");

checkUnitAssetSequence(9, ["cloud-request.png", "public-cloud.png", "private-cloud.png", "cloud-tradeoffs.png"]);
checkUnitAssetSequence(11, ["lan-devices.png", "bridge.png", "repeater.png", "router-boundary.png", "csma-cd.png"]);
const lesson013 = checkUnitAssetSequence(13, ["internet-www.png", "modem.png", "pstn.png", "dedicated-line.png", "cell-phone-network.png"]);
check(!/lossless|lossy|compression/i.test(JSON.stringify(lesson013?.units[0])), "L013 Internet/WWW unit still contains the former compression mismatch");
const pstnUnitText = JSON.stringify({ leadVisual: lesson013?.units[2]?.leadVisual, coreExplanation: lesson013?.units[2]?.coreExplanation, method: lesson013?.units[2]?.method });
for (const term of ["fixed telephone line", "telephone exchange"]) check(pstnUnitText.toLowerCase().includes(term), `L013 PSTN teaching is missing ${term}`);
check(!/ip router|router mesh|server rack/i.test(pstnUnitText), "L013 PSTN teaching incorrectly presents an IP data network");

const lesson014 = checkUnitAssetSequence(14, [null, "subnetting.png", "public-private-ip.png", "static-dynamic-ip.png", "url-dns.png"]);
const urlDnsUnitText = JSON.stringify({ leadVisual: lesson014?.units[4]?.leadVisual, coreExplanation: lesson014?.units[4]?.coreExplanation, method: lesson014?.units[4]?.method });
for (const term of ["protocol", "domain name", "web page or file name", "domain name service", "dns"]) check(urlDnsUnitText.toLowerCase().includes(term), `L014 URL/DNS teaching is missing ${term}`);
check(!/\bscheme\b|query parameter|fragment identifier/i.test(urlDnsUnitText), "L014 URL teaching still uses terminology outside the selected Cambridge wording");

const lesson015 = checkUnitAssetSequence(15, ["stage10-lesson-028-components.jpg", "embedded-system-structure.png", null]);
const lesson015RolesCore = lesson015?.units[0]?.coreExplanation.join(" ") ?? "";
check(!/embedded system|microcontroller|control system/i.test(lesson015RolesCore), "L015 component-role core still contains embedded, microcontroller or control-system teaching");
check(lesson015?.units[2]?.leadVisual?.type === "table" && lesson015.units[2].leadVisual.rows.length >= 4, "L015 embedded benefits and drawbacks must use a structured comparison table");
check(lesson015?.units[2]?.coreExplanation.every((paragraph) => words(paragraph).length <= 45), "L015 embedded trade-off core explanation is still an oversized prose block");

const lesson016 = checkUnitAssetSequence(16, ["laser-printer-operation.png", "3d-printer-operation.png", "microphone-operation.png", "speakers-operation.png", "magnetic-hard-disk-operation.png", "solid-state-flash-memory-operation.png", "optical-disc-reader-writer-operation.png", "capacitive-touchscreen-operation.png", "virtual-reality-headset-operation.png"]);
check(lesson016?.practice.length === 9, "L016 must contain one independently mapped practice question for each hardware device");
check(lesson016?.examStyleQuestions.length === 9, "L016 must contain one independently mapped exam-style question for each hardware device");
const lesson016FlashQuestion = lesson016?.examStyleQuestions.find((question) => question.id === "S3-L02-EXAM-6");
check(lesson016FlashQuestion?.commandWord === "Describe" && /^Describe\b/.test(lesson016FlashQuestion?.task ?? ""), "L016 flash-memory exam task must begin with and render the command word Describe");
for (let index = 0; index < 9; index += 1) {
  const objectiveId = `S3.03.A${String(index + 1).padStart(2, "0")}`;
  check(JSON.stringify(lesson016?.units[index]?.objectiveIds) === JSON.stringify([objectiveId]), `L016 unit ${index + 1} must map only to ${objectiveId}`);
  check(lesson016?.practice.some((question) => question.objectiveIds.length === 1 && question.objectiveIds[0] === objectiveId), `L016 practice is missing an independent ${objectiveId} question`);
  check(lesson016?.examStyleQuestions.some((question) => question.objectiveIds.length === 1 && question.objectiveIds[0] === objectiveId), `L016 exam-style questions are missing independent coverage of ${objectiveId}`);
}
check(!/device-principles\.png/.test(JSON.stringify(lesson016)), "L016 still uses the rejected all-devices-in-one visual");

const lesson017 = checkUnitAssetSequence(17, [null, "stage10-lesson-031-ram-rom.jpg", "sram-dram-storage.svg", "prom-eprom-eeprom.png"]);
const driverBufferCore = lesson017?.units[0]?.coreExplanation.join(" ") ?? "";
check(driverBufferCore.startsWith("A buffer") && /capacity is finite/i.test(driverBufferCore), "L017 must teach the purpose and finite capacity of a buffer before distinguishing driver/queue roles");
check(!/SRAM|DRAM|flip-flop|capacitor/i.test(lesson017?.units[1]?.coreExplanation.join(" ") ?? ""), "L017 RAM/ROM core still contains SRAM/DRAM teaching");
check(/SRAM.*DRAM|DRAM.*SRAM/i.test(lesson017?.units[2]?.coreExplanation.join(" ") ?? ""), "L017 SRAM/DRAM comparison is missing from its own unit");

const lesson018 = checkUnitAssetSequence(18, ["monitoring-control-comparison.png", null, "control-system-feedback.png", null]);
check(lesson018?.units[1]?.leadVisual?.type === "list", "L018 named sensors must render as a structured list");
check(JSON.stringify(lesson018?.units[1]?.leadVisual?.items.map(([name]) => name)) === JSON.stringify(["Temperature sensor", "Pressure sensor", "Infra-red sensor", "Sound sensor"]), "L018 sensor list must contain exactly the four sensor types named by the official syllabus");
check(!/light[- ]intensity sensor/i.test(JSON.stringify(lesson018)), "L018 still includes the out-of-scope light-intensity sensor");
check(/monitoring system/i.test(lesson018?.units[0]?.coreExplanation.join(" ") ?? "") && /control system/i.test(lesson018?.units[0]?.coreExplanation.join(" ") ?? ""), "L018 monitoring/control comparison is incomplete");
check(/new sensor reading/i.test(lesson018?.units[3]?.coreExplanation.join(" ") ?? "") && /adjust or stop/i.test(lesson018?.units[3]?.coreExplanation.join(" ") ?? ""), "L018 importance-of-feedback teaching is incomplete");
check(!/State feedback|Identify named sensor detects/i.test(JSON.stringify({ practice: lesson018?.practice, exam: lesson018?.examStyleQuestions })), "L018 still contains malformed question wording");

const s109Lessons = courseV3Lessons.filter((lesson) => lesson.syllabusIds.includes("S1.09"));
const s109 = s109Lessons.flatMap((lesson) => lesson.units).find((unit) => unitCovers(unit, "S1.09"));
check(s109?.leadVisual?.type === "reviewed-visual" && /vector-drawing-list\.png$/.test(s109.leadVisual.asset ?? ""), "S1.09 must start with the vector drawing-list visual");
check(s109?.coreExplanation.join(" ").match(/drawing list/gi)?.length === 1, "S1.09 core explanation must state the drawing-list definition once");
const s109WorkedExample = JSON.stringify(s109?.workedExample ?? {});
check(/blue rectangle.*\(10, 10\).*width 40.*height 20/i.test(s109WorkedExample) && /black line.*\(10, 30\).*\(50, 30\)/i.test(s109WorkedExample) && !/bitmap file-size calculation/i.test(s109WorkedExample), "S1.09 worked example must render concrete vector instructions");
check(s109Lessons.every((lesson) => lesson.practice.every((question) => question.commandWord && question.answerPoints.length)), "S1.09 practice must expose command words and marking points");

for (const asset of contract.assets) {
  const path = join(root, asset.path);
  check(existsSync(path), `Missing asset ${asset.path}`);
  if (!existsSync(path)) continue;
  check(statSync(path).size > (path.endsWith(".svg") ? 200 : 20_000), `Asset ${asset.path} is suspiciously small or blank`);
  check(sha256(path) === asset.sha256, `Asset hash changed without regenerating contract: ${asset.path}`);
  const dimensions = imageDimensions(path);
  check(dimensions && dimensions.width >= 1000 && dimensions.height >= 500, `Asset ${asset.path} has insufficient or unreadable dimensions`);
}
check(anchorManifest.assets.length === 11, `Expected 11 academic section anchors, found ${anchorManifest.assets.length}`);
for (const asset of anchorManifest.assets) {
  const path = join(root, asset.path);
  check(existsSync(path), `Missing section-anchor asset ${asset.path}`);
  if (existsSync(path)) check(sha256(path) === asset.sha256, `Section ${asset.section} anchor differs from reviewed manifest`);
}
for (const rejected of anchorManifest.rejectedCandidates) check(!contract.assets.some((entry) => entry.path.includes(rejected.source.split("/").at(-1))), `Rejected candidate is referenced by the course: ${rejected.source}`);

const lessonText = (syllabusId) => courseV3Lessons.filter((lesson) => lesson.kind === "teaching" && lesson.syllabusIds.includes(syllabusId)).map((lesson) => lesson.units.filter((unit) => unitCovers(unit, syllabusId)).map((unit) => `${unit.coreExplanation.join(" ")} ${unitMaterials(unit).map((material) => JSON.stringify(material)).join(" ")}`).join(" ")).join(" ");
const practiceText = (syllabusId) => courseV3Lessons.filter((lesson) => lesson.kind === "teaching" && lesson.syllabusIds.includes(syllabusId)).flatMap((lesson) => lesson.practice.filter((question) => question.objectiveIds.some((id) => id.startsWith(`${syllabusId}.`))).map((question) => `${question.prompt} ${question.answerPoints.join(" ")}`)).join(" ");
const s110 = lessonText("S1.10");
check(!/vector file/i.test(s110), "Regression: vector-compression content polluted S1.10 sound sampling");
for (const term of ["analogue", "sample", "quantis", "sampling rate", "sampling resolution", "file size"]) check(s110.toLowerCase().includes(term), `S1.10 missing ${term}`);
const s111 = `${lessonText("S1.11")} ${practiceText("S1.11")}`.toLowerCase();
for (const term of ["storage space", "transmit", "lossless", "lossy", "rle", "adjacent", "count", "value", "decode", "text", "bitmap", "vector", "sound"]) check(s111.includes(term), `S1.11 missing ${term}`);
const s111Units = courseV3Lessons.filter((lesson) => lesson.kind === "teaching" && lesson.syllabusIds.includes("S1.11")).flatMap((lesson) => lesson.units).filter((unit) => unitCovers(unit, "S1.11"));
check(s111Units.length === 5, `S1.11 must contain five independently taught compression units, found ${s111Units.length}`);
check(/compression-need\.png$/.test(s111Units[0]?.leadVisual?.asset ?? ""), "S1.11 must begin with the reason-for-compression visual");
check(/lossless.*lossy/i.test(s111Units[3]?.leadVisual?.title ?? "") && s111Units[3]?.leadVisual?.type === "table", "S1.11 must include a separate lossless/lossy comparison visual");
const s111WhyCheck = courseV3Lessons.flatMap((lesson) => lesson.practice).find((question) => question.id === "S1-L06-Q7");
check(s111WhyCheck?.marks === 2 && s111WhyCheck?.answerPoints.length === 2, "S1.11 compression-benefits question must have two distinct marking points");
const s111RleCheck = courseV3Lessons.flatMap((lesson) => lesson.practice).find((question) => question.id === "S1-L06-Q8");
check(s111RleCheck?.marks === 4 && s111RleCheck?.answerPoints.length === 4, "S1.11 RLE check must display four marking points");
const s303 = `${lessonText("S3.03")} ${practiceText("S3.03")}`.toLowerCase();
for (const term of ["laser printer", "3d printer", "microphone", "speaker", "magnetic hard", "flash", "optical disc", "touchscreen", "virtual-reality"]) check(s303.includes(term), `S3.03 missing ${term}`);
const s310 = `${lessonText("S3.10")} ${practiceText("S3.10")}`.toLowerCase();
for (const term of ["not", "and", "or", "nand", "nor", "xor", "truth table", "logic circuit", "logic expression", "problem statement"]) check(s310.includes(term), `S3.10 missing ${term}`);
const s811 = practiceText("S8.11").toUpperCase();
for (const term of ["INSERT INTO", "UPDATE", "DELETE FROM", "WHERE"]) check(s811.includes(term), `S8.11 practice missing ${term}`);
const s1107 = `${lessonText("S11.07")} ${practiceText("S11.07")}`;
for (const term of ["FUNCTION", "RETURNS", "RETURN", "Price * 0.20", "expression"]) check(s1107.includes(term), `S11.07 missing ${term}`);
const s1102 = `${lessonText("S11.02")} ${practiceText("S11.02")}`;
for (const term of ["Tax <- Price * TaxRate", "Total <- Price * Quantity", "Age >= 18", "<-", "*", "DIV", "MOD"]) check(s1102.includes(term), `S11.02 declaration/expression teaching missing ${term}`);
const s909 = `${lessonText("S9.09")} ${practiceText("S9.09")}`;
for (const term of ["<>", "<=", ">=", "AND", "OR", "NOT"]) check(s909.includes(term), `S9.09 logic-statement teaching missing ${term}`);
const s1204 = `${lessonText("S12.04")} ${practiceText("S12.04")}`;
check(s1204.includes("Mark < 50") && s1204.includes("Mark >= 50"), "S12.04 boundary comparison operators are missing");

const rootIndex = readFileSync(join(webRoot, "index.html"), "utf8");
check(rootIndex.includes('./course-v3/') && rootIndex.includes('./assessments/') && rootIndex.includes('./resources/'), "Root gateway must expose course, Assessment Bank and Resources");
check(!/\.\/lesson-\d{3}\//.test(rootIndex) && !/course-catalog\.js|index\.js/.test(rootIndex), "Root gateway still exposes the archived lesson catalogue");
const assessmentHtml = readFileSync(join(webRoot, "assessments", "index.html"), "utf8");
const assessmentQuestionCount = JSON.parse(readFileSync(join(root, "scripts", "assessment-bank-contract.json"), "utf8")).sets.reduce((count, set) => count + set.questions.length, 0);
check((assessmentHtml.match(/Command word:/g) ?? []).length === assessmentQuestionCount, `Assessment Bank must display a Cambridge command word for all ${assessmentQuestionCount} questions`);
check(!/Identify the relevant|Connect the mechanism|Establish the exact|Trace the relationship|Use the explanation|Apply the main method|Use a fresh context to demonstrate and connect/i.test(visibleText(assessmentHtml)), "Assessment Bank still exposes a generic teaching template");
check(migration.sourceLessonCount === 151, "Legacy migration register must contain 151 source lessons");
for (let oldLesson = 1; oldLesson <= 151; oldLesson += 1) {
  const id = String(oldLesson).padStart(3, "0");
  const path = join(webRoot, `lesson-${id}`, "index.html");
  check(existsSync(path), `Missing legacy compatibility entry lesson-${id}`);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  check(/Course link updated/.test(html) && !/knowledge-unit|practice-question|Core explanation/.test(html), `lesson-${id} still exposes archived teaching content`);
  check(/course-v3\/lesson-\d{3}|course-v3\//.test(html), `lesson-${id} has no current-course successor`);
  if (/http-equiv="refresh"/.test(html)) check(/rel="canonical"/.test(html) && /Open the current lesson/.test(html), `lesson-${id} redirect lacks canonical or fallback link`);
  else check(/migration-options/.test(html) && /more than one successor/.test(html), `lesson-${id} must redirect or list all successors`);
}

const css = readFileSync(join(webRoot, "course-v3", "course.css"), "utf8");
check(css.includes("@media (max-width: 520px)"), "390px/mobile CSS breakpoint is missing");
check(css.includes("overflow-x:auto") || css.includes("overflow-x: auto"), "Responsive internal material scrolling is missing");
check(existsSync(join(webRoot, "course-v3", "index.html")), "Whole-course index is missing");
for (const section of Object.keys(sectionMeta)) check(existsSync(join(webRoot, "course-v3", `section-${section}`, "index.html")), `Section ${section} index is missing`);

try {
  const section1 = courseV3Lessons.filter((lesson) => lesson.section === 1);
  const bank = JSON.parse(readFileSync(join(root, "scripts/assessment-bank-contract.json"), "utf8"));
  validateSection1Presentation(section1, { checkFiles: true, bank });
  if (process.argv.includes("--self-test")) console.log(`S1 regression self-test: ${section1PresentationSelfTest(section1, bank)} negative mutations rejected.`);
} catch (error) { check(false, error.message); }

try {
  validateSection2Presentation(courseV3Lessons.filter((lesson) => lesson.section === 2), { checkFiles: true });
} catch (error) { check(false, error.message); }

if (process.argv.includes("--self-test")) {
  const mutations = [
    duplicateReason("a repeated sentence contains more than eight separate words here", "a repeated sentence contains more than eight separate words here") === "exact",
    duplicateReason("a repeated sentence contains more than eight separate words here", "prefix a repeated sentence contains more than eight separate words here suffix") === "containment",
    !stageNames.every((stage) => stageNames.filter((candidate) => candidate !== "2-practice").includes(stage)),
    forbiddenStudentLabels.test("Supplementary visual recap"),
    hasRootRelativeAsset('<img src="/assets/broken-on-project-pages.png" alt="test">'),
    markingPointSignature(["same marking point"]) === markingPointSignature(["same marking point"]),
  ];
  check(mutations.every(Boolean), "Verifier negative-regression self-test did not reject every mutation");
  if (mutations.every(Boolean)) console.log(`Course presentation verifier self-test: ${mutations.length} negative mutations rejected.`);
}

if (errors.length) {
  console.error(`Course verification failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Course verified: ${courseV3Meta.lessonCount} pages, ${courseV3Lessons.filter((lesson) => lesson.kind === "teaching").flatMap((lesson) => lesson.units).length} teaching units, ${seenRequirements.size} requirements, ${commandWordCount} classified questions, ${contract.lessons.reduce((count, lesson) => count + lesson.objectives.length, 0)} objective instances and 151 compatibility entries.`);
