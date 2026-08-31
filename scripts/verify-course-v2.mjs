import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(root, "scripts", name), "utf8"));
const identity = readJson("lesson-identity-contract.json");
const content = readJson("course-v2-content.json");
const questions = readJson("question-bank-contract.json");
const coverage = readJson("course-v2-coverage-contract.json");
const frequency = readJson("past-paper-frequency-contract.json");
const migration = readJson("course-v2-migration.json");
const assessments = readJson("assessment-bank-contract.json");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function normalise(value) {
  return String(value ?? "")
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/\d+(?:\.\d+)?/g, " number ")
    .replace(/[^a-z0-9+#' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const stopwords = new Set("a an and are as at be by for from how in is it of on or that the this to use used using when which with".split(" "));
function similarity(left, right) {
  const tokens = (value) => new Set(normalise(value).split(" ").filter((token) => token.length > 2 && !stopwords.has(token)));
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  let overlap = 0;
  for (const token of a) if (b.has(token)) overlap += 1;
  return overlap / new Set([...a, ...b]).size;
}

assert(identity.schemaVersion === 3 && identity.lessons.length === 90, "Identity contract must be schema-v3 with 90 lessons");
assert(content.lessonCount === 90 && content.lessons.length === 90, "Content contract must contain 90 lessons");
assert(questions.questionCount === 272 && questions.questions.length === 272, "Question bank must contain 272 questions");
assert(migration.sourceLessonCount === 151 && migration.targetLessonCount === 90 && migration.rows.length === 151, "Migration register must map all 151 former lessons into 90 lessons");

const activeMarkdown = fs.readdirSync(path.join(root, "lessons")).filter((name) => /^\d{3}-.*\.md$/.test(name));
assert(activeMarkdown.length === 90, `Expected 90 active Markdown lessons, found ${activeMarkdown.length}`);
assert(identity.lessons.every((lesson, index) => lesson.lesson === index + 1 && lesson.id === String(index + 1).padStart(3, "0") && activeMarkdown.includes(lesson.markdownFile)), "Lesson identities or Markdown filenames are not canonical 001-090");

const paper1 = content.lessons.filter((lesson) => lesson.paper === 1);
const paper2 = content.lessons.filter((lesson) => lesson.paper === 2);
assert(paper1.length === 45 && paper2.length === 45, "Paper 1 and Paper 2 must each contain 45 lessons");
assert(content.lessons[44].focus === "integrated-review" && content.lessons[89].focus === "integrated-review", "Lessons 045 and 090 must be integrated review lessons");
const firstSectionOrder = [];
for (const lesson of content.lessons) {
  if (typeof lesson.section === "number" && !firstSectionOrder.includes(lesson.section)) firstSectionOrder.push(lesson.section);
}
assert(JSON.stringify(firstSectionOrder) === JSON.stringify(Array.from({ length: 12 }, (_, index) => index + 1)), "First section appearances must follow official Section 1-12 order");

for (let section = 1; section <= 12; section += 1) {
  const actual = content.lessons.filter((lesson) => lesson.section === section).length;
  assert(actual === frequency.lessonAllocation.sections[String(section)], `Section ${section} lesson allocation mismatch: ${actual}`);
}

assert(coverage.requirementCount === 121 && coverage.requirements.length === 121, "Coverage contract must contain 121 syllabus requirements");
assert(coverage.coveredForTeaching === 121 && coverage.coveredForPractice === 121, "Every syllabus requirement needs direct teaching and practice evidence");
for (const requirement of coverage.requirements) {
  assert(requirement.teachingLessons.length > 0, `${requirement.id} has no teaching lesson`);
  assert(requirement.practiceQuestions.length > 0, `${requirement.id} has no practice question`);
}

assert(frequency.sourceManifest.filter((item) => item.kind === "question-paper").length === 36, "Frequency contract must register 36 question papers");
assert(frequency.sourceManifest.filter((item) => item.kind === "mark-scheme").length === 36, "Frequency contract must register 36 mark schemes");
assert(frequency.paperTotals.length === 36 && frequency.paperTotals.every((paper) => paper.marks === 75), "All 36 papers must reconcile to 75 marks");
assert(frequency.totals.paper1Marks === 1350 && frequency.totals.paper2Marks === 1350 && frequency.totals.totalMarks === 2700, "Past-paper totals must be 1350/1350/2700");
assert(frequency.totals.questionParts === 915 && frequency.entries.length === 915, "Frequency contract must contain 915 question-part metadata rows");
assert(!/"(?:prompt|answer|questionText|markSchemeText)"\s*:/.test(JSON.stringify(frequency)), "Frequency contract must not store question or mark-scheme wording");
for (const entry of frequency.entries) {
  assert(/^9618\/(?:1[1-3]|2[1-3])\/[SW]\/\d{2} Q\d+(?:\([A-Za-z0-9]+\))*$/.test(entry.sourceRef), `Invalid past-paper index: ${entry.sourceRef}`);
  assert(entry.primaryRequirement && Number.isInteger(entry.marks) && entry.marks > 0, `Incomplete frequency row: ${entry.id}`);
}

const trackedPdfs = execFileSync("git", ["ls-files", "*.pdf", "*.PDF"], { cwd: root, encoding: "utf8" })
  .trim().split("\n").filter(Boolean);
assert(!trackedPdfs.some((name) => /past.?papers|(?:^|[/_-])(?:qp|ms)(?:[/_.-]|$)/i.test(name)), `Tracked past-paper PDF found: ${trackedPdfs.join(", ")}`);

const questionIds = new Set();
const exactPrompts = new Map();
const semanticFingerprints = new Map();
for (const question of questions.questions) {
  assert(!questionIds.has(question.id), `Duplicate question ID: ${question.id}`);
  questionIds.add(question.id);
  assert(question.sourceType === "original", `${question.id} is not labelled original`);
  assert(question.marks > 0 && question.commandWord && question.questionType && question.answer && question.guidance && question.commonError, `${question.id} is missing required marking metadata`);
  const exact = normalise(question.prompt);
  assert(!exactPrompts.has(exact), `Exact or number-only question duplicate: ${exactPrompts.get(exact)} and ${question.id}`);
  exactPrompts.set(exact, question.id);
  const semantic = Object.values(question.semanticFingerprint).join("|");
  assert(!semanticFingerprints.has(semantic), `Duplicate semantic fingerprint: ${semanticFingerprints.get(semantic)} and ${question.id}`);
  semanticFingerprints.set(semantic, question.id);
}

for (const lesson of content.lessons) {
  const lessonQuestions = questions.questions.filter((question) => question.lesson === lesson.lesson);
  const expectedCount = lesson.focus === "integrated-review" ? 4 : 3;
  assert(lessonQuestions.length === expectedCount, `L${lesson.id} must contain ${expectedCount} questions`);
  assert(new Set(lessonQuestions.map((question) => question.questionType)).size >= 2, `L${lesson.id} needs at least two materially different question types`);
  for (let left = 0; left < lessonQuestions.length; left += 1) {
    for (let right = left + 1; right < lessonQuestions.length; right += 1) {
      assert(similarity(lessonQuestions[left].prompt, lessonQuestions[right].prompt) < 0.58, `L${lesson.id} contains near-duplicate questions ${lessonQuestions[left].id} and ${lessonQuestions[right].id}`);
    }
  }
  assert(lesson.pacing === "flexible" && lesson.teachingChoice.join(",") === "quick,full,deep", `L${lesson.id} must use flexible teaching depth`);
  assert(lesson.coreFacts.length >= 4, `L${lesson.id} needs at least four detailed explanation points`);
  assert(lesson.conceptChecklist.length > 0 && lesson.summaryPoints.length >= 3 && lesson.summaryPoints.length <= 5, `L${lesson.id} is missing its explanation checklist or summary`);
  for (let index = 0; index < lesson.coreFacts.length; index += 1) {
    for (let other = index + 1; other < lesson.coreFacts.length; other += 1) {
      assert(normalise(lesson.coreFacts[index]) !== normalise(lesson.coreFacts[other]), `L${lesson.id} repeats a detailed explanation fact`);
    }
    assert(!lesson.summaryPoints.some((point) => normalise(point) === normalise(lesson.coreFacts[index])), `L${lesson.id} repeats a full explanation fact in the summary`);
    assert(!lesson.visual?.altFacts.some((point) => similarity(point, lesson.coreFacts[index]) >= 0.62), `L${lesson.id} repeats an explanation fact in the retained visual transcript`);
  }

  const markdown = fs.readFileSync(path.join(root, "lessons", identity.lessons[lesson.lesson - 1].markdownFile), "utf8");
  const htmlPath = path.join(root, "web", `lesson-${lesson.id}`, "index.html");
  assert(fs.existsSync(htmlPath), `Missing active HTML for L${lesson.id}`);
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const source of [markdown, html]) {
    assert(!/Targeted practice|Exam-style question|## Homework|45-minute|45 minutes|\| \d+ minutes/i.test(source), `L${lesson.id} contains an obsolete column or fixed-duration promise`);
  }
  assert(/Quick route/.test(html) && /Full route/.test(html) && /Deep route/.test(html), `L${lesson.id} does not expose flexible teaching depth`);
  assert(/class="v2-jump-nav"/.test(html) && !/class="v2-toc"/.test(html), `L${lesson.id} must use the full-width jump navigation without a sidebar`);
  assert(!/Version 2|Detailed explanation|Question triage|Supporting diagram library|approved material|pending material|pilot-complete/i.test(`${markdown}\n${html}`), `L${lesson.id} exposes retired editorial or rollout wording`);
  if (lesson.focus === "integrated-review") {
    assert(lesson.materialStatus === "review-complete" && /data-material-status="review-complete"/.test(html), `L${lesson.id} must be a complete integrated-review lesson`);
    assert(Array.isArray(lesson.reviewMaterials) && lesson.reviewMaterials.length > 0 && /class="v2-review-grid"/.test(html), `L${lesson.id} is missing its connected review materials`);
  } else {
    assert(lesson.materialStatus === "complete" && /data-material-status="complete"/.test(html), `L${lesson.id} must have complete point-level materials`);
    assert(Array.isArray(lesson.knowledgePoints) && lesson.knowledgePoints.length === lesson.syllabusIds.length, `L${lesson.id} has incomplete knowledge-point materials`);
  }
  assert((html.match(/class="v2-question"/g) ?? []).length === expectedCount, `L${lesson.id} rendered question count mismatch`);
  if (lesson.visual) assert(fs.existsSync(path.join(root, "web", lesson.visual.path)), `L${lesson.id} visual file is missing`);
}

assert(assessments.setCount === 14 && assessments.sets.length === 14, "Assessment Bank must contain 14 sets");
assert(assessments.sets.filter((set) => /^SECTION-\d+-CHECK$/.test(set.id)).length === 12, "Assessment Bank needs 12 section checks");
for (const paper of [1, 2]) {
  const mock = assessments.sets.find((set) => set.id === `PAPER-${paper}-MOCK`);
  assert(mock?.totalMarks === 75 && mock.questions.reduce((sum, question) => sum + question.marks, 0) === 75, `Paper ${paper} mock must total 75 marks`);
}
for (const set of assessments.sets) {
  assert(set.questions.every((question) => question.sourceType === "original"), `${set.id} contains a non-original question`);
  for (const question of set.questions) assert(!exactPrompts.has(normalise(question.prompt)), `${set.id} reuses a lesson prompt`);
}

for (let oldLesson = 91; oldLesson <= 151; oldLesson += 1) {
  const id = String(oldLesson).padStart(3, "0");
  const source = fs.readFileSync(path.join(root, "web", `lesson-${id}`, "index.html"), "utf8");
  const target = Number(source.match(/url=\.\.\/lesson-(\d{3})\//)?.[1]);
  assert(target >= 1 && target <= 90, `Old route lesson-${id} is not a valid redirect`);
  assert(!/v2-question|Knowledge explanation/.test(source), `Old route lesson-${id} still carries active lesson content`);
}

for (const requiredPath of [
  "course-map.md",
  "assessments/assessment-bank.md",
  "audits/course-v2-redundancy-and-migration-report.md",
  "audits/course-v2-migration-register.csv",
  "web/assessments/index.html",
]) assert(fs.existsSync(path.join(root, requiredPath)), `Missing V2 artifact: ${requiredPath}`);

const indexSource = fs.readFileSync(path.join(root, "web", "index.html"), "utf8");
const indexScript = fs.readFileSync(path.join(root, "web", "index.js"), "utf8");
assert(/90 (?:flexible-depth )?lessons/.test(indexSource) && !/151 lessons/.test(indexSource) && /lessons\.length !== 90/.test(indexScript), "Course index is not bound to the 90-lesson contract");

console.log(JSON.stringify({
  status: "PASS",
  lessons: 90,
  paper1Lessons: paper1.length,
  paper2Lessons: paper2.length,
  requirementsCovered: coverage.requirementCount,
  lessonQuestions: questions.questionCount,
  assessmentSets: assessments.setCount,
  pastPaperMarks: frequency.totals,
  flexibleDepth: true,
  materialRollout: {
    completedTeachingLessons: content.lessons.filter((lesson) => lesson.materialStatus === "complete").length,
    completedReviewLessons: content.lessons.filter((lesson) => lesson.materialStatus === "review-complete").length,
    pendingLessons: content.lessons.filter((lesson) => lesson.materialStatus === "pending").length,
  },
}, null, 2));
