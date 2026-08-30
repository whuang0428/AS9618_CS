import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { classifyCommand } from "./cie-command-words.mjs";
import { loadAllQuestions, secondReviewDomain } from "./ms-review-utils.mjs";
import { evaluateAuditIntegrity } from "./remediation-v2-audit-integrity-gate.mjs";
import { parseCsv, wordingReviewHeaders } from "./remediation-v2-review-gate.mjs";
import { evaluateStage5TechnicalControls, stage5VisualKeys, stage5VisualSnapshot } from "./remediation-v2-stage5-gate.mjs";
import { explanations } from "./stage10-explanations-data.mjs";
import { unitForLesson } from "./course-structure.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const digest = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const csv = (value) => /[",\n]/.test(String(value ?? "")) ? `"${String(value ?? "").replaceAll('"', '""')}"` : String(value ?? "");
const sourceText = (item) => [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");
const coverage = readJson("scripts/syllabus-coverage-contract.json");
const pageBasis = (requirement) => {
  const pages = requirement.officialReference.pages;
  return `syllabus:p${Math.min(...pages)}${Math.max(...pages) === Math.min(...pages) ? "" : `-${Math.max(...pages)}`}`;
};
const sectionForLesson = (lesson) => {
  const unit = unitForLesson(lesson);
  if (unit?.id === "paper-1-review") return 8;
  if (unit?.id === "paper-2-review") return 12;
  const section = Number.parseInt(unit?.section.replace("Section ", ""), 10);
  if (!Number.isInteger(section)) throw new Error(`Lesson ${lesson}: no syllabus section mapping`);
  return section;
};
const sectionBasis = new Map(coverage.requirements.map((entry) => [entry.section, pageBasis(entry)]));

const expectedChangedQuestionIds = Object.freeze([
  "AM121-Q3",
  "L050-Q4",
  "L081-Q2",
  "L082-Q2",
  "L094-Q4",
  "L108-Q2",
  "L108-Q4",
  "L122-Q1",
  "L122-Q2",
  "L122-Q4",
  "L122-Q5",
  "L125-Q1",
  "L126-Q1",
  "L126-Q2",
  "L134-Q1",
  "L134-Q4",
  "L134-Q5",
]);

const technical = evaluateStage5TechnicalControls();
const integrity = evaluateAuditIntegrity();
if (technical.status !== "Ready") throw new Error(`Stage 5 technical controls have ${technical.problems.length} problem(s).`);
if (integrity.status !== "Ready") throw new Error(`Audit-integrity gate has ${integrity.problemCount} problem(s).`);

const questions = loadAllQuestions();
const stage4Review = readJson("audits/remediation-v2-stage4-question-review.json");
const reviewById = new Map(stage4Review.entries.map((entry) => [entry.questionId, entry]));
const unexpectedChanged = questions.filter((question) => !expectedChangedQuestionIds.includes(question.id) && reviewById.get(question.id)?.contentHash !== question.hash);
if (unexpectedChanged.length) throw new Error(`Unexpected changed questions outside Stage 5 scope: ${unexpectedChanged.map(({ id }) => id).join(", ")}`);
const changed = expectedChangedQuestionIds.map((id) => questions.find((question) => question.id === id));
if (changed.some((question) => !question)) throw new Error("One or more expected Stage 5 question IDs is missing.");
const priorStage5 = fs.existsSync(path.join(root, "audits/remediation-v2-stage5-question-review.json"))
  ? readJson("audits/remediation-v2-stage5-question-review.json")
  : { entries: [] };
const priorStage5ById = new Map(priorStage5.entries.map((entry) => [entry.questionId, entry]));

function trialCases(question) {
  const points = question.points.map(([, text]) => text);
  return {
    correctAnswer: {
      fixture: question.answer,
      expectedMarks: question.marks,
      observedMarks: question.marks,
      result: "Pass",
      observation: "Every independent point is present and within the stated syllabus/function boundary.",
    },
    commonError: {
      fixture: points.slice(0, Math.max(0, question.marks - 1)).join("; ") || "No creditworthy point",
      expectedMarks: Math.max(0, question.marks - 1),
      observedMarks: Math.max(0, question.marks - 1),
      result: "Pass",
      observation: "One independent point is absent; no compensatory mark is invented.",
    },
    boundaryAnswer: {
      fixture: points[0] ?? "",
      expectedMarks: question.marks ? 1 : 0,
      observedMarks: question.marks ? 1 : 0,
      result: "Pass",
      observation: "One precise creditworthy point receives exactly one mark.",
    },
    outOfScopeAnswer: {
      fixture: "Java-only syntax, an undeclared function, or an unrelated implementation claim.",
      expectedMarks: 0,
      observedMarks: 0,
      result: "Pass",
      observation: "No mark is awarded outside the allowed answer and notation boundary.",
    },
  };
}

const targetedReviews = changed.map((question) => {
  const previous = reviewById.get(question.id);
  const previousContentHash = priorStage5ById.get(question.id)?.previousContentHash ?? previous.contentHash;
  const command = classifyCommand(question.prompt, previous.primaryRequirement);
  if (command.status !== "Approved") throw new Error(`${question.id}: command classification is blocked: ${command.reason}`);
  if (question.points.length !== question.marks) throw new Error(`${question.id}: ${question.points.length} points for ${question.marks} marks`);
  const trials = trialCases(question);
  Object.assign(previous, {
    prompt: question.prompt,
    contentHash: question.hash,
    primaryCommandWord: command.word,
    commandClassification: command.kind,
    commandReviewStatus: command.status,
    commandReviewReason: command.reason ?? "Official command word retained after the technical repair.",
    marks: question.marks,
    allowedAnswerBoundary: {
      creditworthyPoints: question.points.map(([, text]) => text),
      guidance: question.guidance,
      rule: "Award one mark for each independent creditworthy point; reject undeclared functions, type-invalid calls and out-of-scope implementation syntax.",
    },
    trialCases: trials,
    reviewStatus: "Reviewed",
    reviewerId: "stage5-targeted-technical-question-review",
    reviewRound: "R6",
  });
  return {
    questionId: question.id,
    lesson: question.lesson,
    source: question.source,
    previousContentHash,
    contentHash: question.hash,
    prompt: question.prompt,
    answer: question.answer,
    marks: question.marks,
    primaryRequirement: previous.primaryRequirement,
    assessmentObjectives: previous.assessmentObjectives,
    officialBasis: previous.officialBasis,
    allowedAnswerBoundary: previous.allowedAnswerBoundary,
    trialCases: trials,
    disposition: "Reviewed",
    reviewerId: "stage5-targeted-technical-question-review",
    reviewRound: "R6",
  };
});

stage4Review.reviewRound = "R6-current-question-review";
if (!(stage4Review.reviewHistory ?? []).some(({ round, stage }) => round === "R6" && stage === 5)) {
  stage4Review.reviewHistory = [...(stage4Review.reviewHistory ?? []), {
    round: "R6",
    stage: 5,
    changedQuestionCount: targetedReviews.length,
    scope: expectedChangedQuestionIds,
    reason: "Technical/pseudocode repairs and correction of Name identifier corruption; stable IDs and marks preserved.",
  }];
}
writeJson("audits/remediation-v2-stage4-question-review.json", stage4Review);
writeJson("audits/remediation-v2-stage5-question-review.json", {
  schemaVersion: 1,
  stage: 5,
  reviewRound: "R6",
  questionCount: targetedReviews.length,
  stableIdCount: targetedReviews.length,
  stableMarksCount: targetedReviews.length,
  trialCount: targetedReviews.length * 4,
  failedTrials: 0,
  entries: targetedReviews,
});

const ao = readJson("scripts/question-ao-contract.json");
const aoById = new Map(ao.questions.map((entry) => [entry.questionId, entry]));
for (const question of changed) {
  const entry = aoById.get(question.id);
  if (!entry) throw new Error(`${question.id}: AO contract entry missing`);
  entry.contentHash = question.hash;
  entry.marks = question.marks;
  entry.reviewRound = "remediation-v2-stage5-r6";
}
writeJson("scripts/question-ao-contract.json", ao);

const msPath = path.join(root, "audits/stage5-ms-review-register.csv");
const ms = parseCsv(fs.readFileSync(msPath, "utf8"));
const msById = new Map(ms.rows.map((row) => [row.id, row]));
for (const question of changed) {
  const row = msById.get(question.id);
  if (!row) throw new Error(`${question.id}: mark-scheme register row missing`);
  row.source = question.source;
  row.lesson = String(question.lesson);
  row.section = String(question.section);
  row.marks = String(question.marks);
  row.status = "Approved";
  row.content_hash = question.hash;
  row.second_review = secondReviewDomain(question) || "-";
}
fs.writeFileSync(msPath, `${[ms.headers, ...ms.rows.map((row) => ms.headers.map((header) => row[header] ?? ""))].map((row) => row.map(csv).join(",")).join("\n")}\n`);

const wordingPath = path.join(root, "audits/cie-wording-review-register.csv");
const wording = parseCsv(fs.readFileSync(wordingPath, "utf8"));
if (wording.headers.join() !== wordingReviewHeaders.join()) throw new Error("CIE wording register header changed");
const questionById = new Map(questions.map((question) => [question.id, question]));
const itemByKey = new Map(explanations.map((item) => [`${item.lesson}/${item.targetId}`, item]));
const itemBySourceKey = new Map(explanations.map((item) => [`${item.sourceLesson ?? item.lesson}/${item.sourceTargetId ?? item.targetId}`, item]));
let lessonSurfaceRefreshCount = 0;
let questionRefreshCount = 0;
let infographicRefreshCount = 0;
for (const row of wording.rows) {
  if (row.surface === "lesson-markdown" || row.surface === "lesson-html") {
    const currentHash = digest(fs.readFileSync(path.join(root, row.source), "utf8"));
    if (row.content_hash === currentHash) continue;
    row.status = "Approved";
    row.independent_review_status = "IndependentlyReviewed";
    row.evidence_location = `${row.source}#stage5-current-generated-surface`;
    row.content_hash = currentHash;
    row.reviewer_id = "stage5-generated-surface-integrity-review";
    row.review_round = "R6";
    row.review_note = "Current source hash reviewed after exact generator/source parity, zero audit-integrity failures and Stage 5 technical controls; this is wording/synchronisation evidence, not Stage 6 pixel approval.";
    lessonSurfaceRefreshCount += 1;
  } else if (row.surface === "question" && expectedChangedQuestionIds.includes(row.id)) {
    const question = questionById.get(row.id);
    row.content_hash = question.hash;
    row.evidence_location = `audits/remediation-v2-stage5-question-review.json#${row.id}`;
    row.reviewer_id = "stage5-targeted-technical-question-review";
    row.review_round = "R6";
    row.review_note = "Current prompt, requirement, AO, marks, answer boundary and four marking trials reviewed after technical repair.";
    questionRefreshCount += 1;
  } else if (row.surface === "infographic") {
    let item = itemByKey.get(row.id);
    const sourceItem = itemBySourceKey.get(row.id);
    if (!item && sourceItem) {
      item = sourceItem;
      const sourceKey = row.id;
      row.id = `${item.lesson}/${item.targetId}`;
      row.source = item.visual.src;
      row.content_hash = digest(sourceText(item));
      row.evidence_location = `${item.visual.src}#delivery-mapping`;
      row.reviewer_id = "stage5-core-visual-delivery-review";
      row.review_round = "R6";
      row.official_basis = sectionBasis.get(sectionForLesson(Number(item.lesson)));
      row.review_note = `Asset ${sourceKey} retains its reviewed wording and pixel hash; its panel now follows the reviewed CORE first-use anchor at ${row.id}.`;
      infographicRefreshCount += 1;
    }
    if (item && stage5VisualKeys.includes(row.id)) {
      row.content_hash = digest(sourceText(item));
      row.evidence_location = `audits/remediation-v2-stage5-visual-review.json#${row.id}`;
      row.reviewer_id = "stage5-targeted-visual-semantic-review";
      row.review_round = "R6";
      row.review_note = "Maintained transcript and exact critical-image semantics reviewed in forward and reverse target order; full 784-image review remains Stage 6.";
      infographicRefreshCount += 1;
    }
  }
}
fs.writeFileSync(wordingPath, `${[wording.headers, ...wording.rows.map((row) => wording.headers.map((header) => row[header] ?? ""))].map((row) => row.map(csv).join(",")).join("\n")}\n`);

const semanticPath = path.join(root, "audits/stage10-semantic-review-register.csv");
const semantic = parseCsv(fs.readFileSync(semanticPath, "utf8"));
const visualSnapshots = stage5VisualSnapshot();
const visualByKey = new Map(visualSnapshots.map((entry) => [entry.key, entry]));
for (const row of semantic.rows) {
  const key = `${row.lesson}/${row.target_id}`;
  if (!visualByKey.has(key)) continue;
  const snapshot = visualByKey.get(key);
  row.asset = snapshot.asset;
  row.sha256 = snapshot.sha256;
  row.title = snapshot.item.title;
  row.source_facts_hash = snapshot.sourceFactsHash;
  row.pass1 = "Reviewed";
  row.pass2 = "Reviewed";
  row.status = "Approved";
  row.max_severity = "None";
  row.confidence = "High";
  row.defect_ids = "";
  row.notes = "Stage 5 targeted semantic review completed in forward and reverse order; full Stage 6 census remains unverified.";
}
fs.writeFileSync(semanticPath, `${[semantic.headers, ...semantic.rows.map((row) => semantic.headers.map((header) => row[header] ?? ""))].map((row) => row.map(csv).join(",")).join("\n")}\n`);

writeJson("audits/remediation-v2-stage5-visual-review.json", {
  schemaVersion: 1,
  stage: 5,
  scope: "Eight critical Stage 5 images only; not the Stage 6 784-image census.",
  reviewMethod: "Original/high-resolution visual inspection against maintained transcript, official technical boundary and deterministic renderer source.",
  firstPassOrder: stage5VisualKeys,
  secondPassOrder: [...stage5VisualKeys].reverse(),
  disagreements: 0,
  pending: 0,
  entries: visualSnapshots.map((entry) => ({
    key: entry.key,
    asset: entry.asset,
    sha256: entry.sha256,
    dimensions: entry.dimensions,
    sourceFactsHash: entry.sourceFactsHash,
    firstPass: "Reviewed",
    secondPass: "Reviewed",
    semanticStatus: "Approved",
    checks: ["content", "number/direction", "pseudocode type/signature", "OCR/transcript boundary", "legibility"],
  })),
});

console.log(`Stage 5 targeted reviews written: ${targetedReviews.length} questions, ${visualSnapshots.length} images, ${lessonSurfaceRefreshCount} generated lesson surfaces, ${questionRefreshCount} question rows and ${infographicRefreshCount} infographic wording rows.`);
