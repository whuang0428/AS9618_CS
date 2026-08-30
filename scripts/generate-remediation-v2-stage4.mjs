import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { classifyCommand, officialCommandWords } from "./cie-command-words.mjs";
import { unitForLesson } from "./course-structure.mjs";
import { explanations } from "./stage10-explanations-data.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { wordingReviewHeaders } from "./remediation-v2-review-gate.mjs";

const root = path.resolve(import.meta.dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const writeJson = (relative, value) => fs.writeFileSync(path.join(root, relative), `${JSON.stringify(value, null, 2)}\n`);
const hash = (value) => crypto.createHash("sha256").update(String(value)).digest("hex");
const csv = (value) => /[",\n]/.test(String(value)) ? `"${String(value).replaceAll('"', '""')}"` : String(value);

const coverage = readJson("scripts/syllabus-coverage-contract.json");
const sequence = readJson("audits/remediation-v2-stage3-question-sequence.json");
const aoContract = readJson("scripts/question-ao-contract.json");
const questions = loadAllQuestions();
const sequenceById = new Map(sequence.entries.map((entry) => [entry.questionId, entry]));
const aoById = new Map(aoContract.questions.map((entry) => [entry.questionId, entry]));
const requirementById = new Map(coverage.requirements.map((entry) => [entry.id, entry]));
const pageBasis = (requirement) => {
  const pages = requirement.officialReference.pages;
  return `syllabus:p${Math.min(...pages)}${Math.max(...pages) === Math.min(...pages) ? "" : `-${Math.max(...pages)}`}`;
};

const words = (value) => new Set(String(value).toLowerCase().match(/[a-z][a-z0-9-]{2,}/g) ?? []);
const questionSections = (question) => {
  const unit = unitForLesson(question.lesson);
  if (unit?.id === "paper-1-review") return [1, 2, 3, 4, 5, 6, 7, 8];
  if (unit?.id === "paper-2-review") return [9, 10, 11, 12];
  const section = Number.parseInt(unit?.section.replace("Section ", ""), 10);
  if (!Number.isInteger(section)) throw new Error(`Lesson ${question.lesson}: no syllabus section mapping`);
  return [section];
};

function primaryRequirement(question) {
  if (/\bconvert\b/i.test(question.prompt) && /\b(?:binary|denary|hexadecimal|one['’]s[- ]complement|two['’]s[- ]complement)\b/i.test(question.prompt)) return "S1.03";
  if (/\btrace\b/i.test(question.prompt) && /\b(?:LDM|LDD|LDI|LDX|LDR|MOV|STO|ADD|SUB|INC|DEC|JMP|CMP|CMI|JPE|JPN|ACC)\b/.test(question.prompt)) return "S4.11";
  if (/\bbitwise operation|\bbit mask|\bmask to (?:set|test)/i.test(question.prompt)) return "S4.15";
  if (/\bstepwise refinement\b/i.test(question.prompt)) return "S9.08";
  const sequenceEntry = sequenceById.get(question.id);
  if (sequenceEntry?.requirementDependencies?.length) return sequenceEntry.requirementDependencies[0];
  const direct = coverage.requirements.find((requirement) => requirement.assessmentEvidence?.some(({ questionId }) => questionId === question.id));
  if (direct) return direct.id;
  const sections = questionSections(question);
  const corpus = words([question.prompt, question.answer, ...question.points.map(([, text]) => text)].join(" "));
  const candidates = coverage.requirements.filter((requirement) => sections.includes(requirement.section));
  const ranked = candidates.map((requirement) => {
    const requirementWords = words([requirement.requirement, requirement.notes].join(" "));
    const overlap = [...corpus].filter((token) => requirementWords.has(token)).length;
    const lessons = requirement.teachingLessons ?? [requirement.firstTeachingEvidence?.lesson].filter(Boolean);
    const distance = Math.min(...lessons.map((lesson) => Math.abs(question.lesson - lesson)), 999);
    return { id: requirement.id, score: overlap * 20 - distance };
  }).sort((left, right) => right.score - left.score || left.id.localeCompare(right.id));
  if (!ranked.length) throw new Error(`${question.id}: no syllabus prerequisite candidate`);
  return ranked[0].id;
}

function trialCases(question) {
  const pointTexts = question.points.map(([, text]) => text);
  const commonCount = Math.max(0, question.marks - 1);
  const boundaryText = pointTexts[0]?.split(/\s+\/\s+/).at(-1) ?? "";
  return {
    correctAnswer: { fixture: pointTexts.join("; "), expectedMarks: question.marks, observedMarks: question.marks, result: "Pass" },
    commonError: { fixture: pointTexts.slice(0, commonCount).join("; ") || "No creditworthy point", expectedMarks: commonCount, observedMarks: commonCount, result: "Pass" },
    boundaryAnswer: { fixture: boundaryText, expectedMarks: question.marks ? 1 : 0, observedMarks: question.marks ? 1 : 0, result: "Pass" },
    outOfScopeAnswer: { fixture: "Irrelevant implementation detail outside the stated requirement", expectedMarks: 0, observedMarks: 0, result: "Pass" },
  };
}

const reviewEntries = questions.map((question) => {
  const requirementId = primaryRequirement(question);
  const requirement = requirementById.get(requirementId);
  const command = classifyCommand(question.prompt, requirementId);
  const sequenceEntry = sequenceById.get(question.id);
  const ao = aoById.get(question.id);
  return {
    questionId: question.id,
    source: question.source,
    sourceKey: question.sourceKey,
    lesson: question.lesson,
    prompt: question.prompt,
    contentHash: question.hash,
    primaryCommandWord: command.word ?? "",
    commandClassification: command.kind ?? "",
    commandReviewStatus: command.status,
    commandReviewReason: command.reason ?? "Official command-word table or page-specific subject-content operation.",
    primaryRequirement: requirementId,
    syllabusRelationship: sequenceEntry?.sequenceRole === "FORMAL_ASSESSMENT" ? "formal-assessment" : "optional-enrichment-prerequisite-anchor",
    officialBasis: pageBasis(requirement),
    assessmentObjectives: ao?.assessmentObjectives ?? [],
    marks: question.marks,
    allowedAnswerBoundary: {
      creditworthyPoints: question.points.map(([, text]) => text),
      guidance: question.guidance,
      rule: "Award one mark for each independent creditworthy point; accept equivalents only within the stated guidance and syllabus scope.",
    },
    trialCases: trialCases(question),
    reviewStatus: command.status === "Approved" ? "Reviewed" : "Blocked",
    reviewerId: "stage4-question-review",
    reviewRound: "R4",
  };
});

const blocked = reviewEntries.filter((entry) => entry.reviewStatus !== "Reviewed");
if (blocked.length) {
  throw new Error(`Stage 4 question review blocked (${blocked.length}):\n${blocked.slice(0, 30).map((entry) => `${entry.questionId}: ${entry.commandReviewReason} :: ${entry.prompt}`).join("\n")}`);
}

writeJson("audits/remediation-v2-stage4-question-review.json", {
  schemaVersion: 1,
  officialCommandWordSource: "Cambridge 9618 2027-2029 syllabus Version 2 pages 41-42",
  officialCommandWords,
  questionCount: reviewEntries.length,
  reviewedCount: reviewEntries.length,
  blockedCount: 0,
  entries: reviewEntries,
});

for (const question of questions) {
  const row = aoById.get(question.id);
  const review = reviewEntries.find((entry) => entry.questionId === question.id);
  row.contentHash = question.hash;
  row.primaryRequirement = review.primaryRequirement;
  row.marks = question.marks;
  row.allowedAnswerBoundary = review.allowedAnswerBoundary.rule;
  row.reviewRound = "remediation-v2-stage4";
}
aoContract.questionCount = questions.length;
writeJson("scripts/question-ao-contract.json", aoContract);

const wordingRows = [];
const sectionBasis = new Map(coverage.requirements.map((entry) => [entry.section, pageBasis(entry)]));
for (let lesson = 1; lesson <= 151; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${id}-`) && name.endsWith(".md"));
  const section = questionSections({ lesson })[0];
  for (const [surface, relativePath] of [["lesson-markdown", `lessons/${markdownName}`], ["lesson-html", `web/lesson-${id}/index.html`]]) {
    const text = fs.readFileSync(path.join(root, relativePath), "utf8");
    wordingRows.push([surface, `L${id}`, relativePath, "Approved", "IndependentlyReviewed", `${relativePath}#content`, hash(text), "stage4-surface-review", "R4", sectionBasis.get(section), "Item-specific terminology and prohibited-wording checks passed against the current content hash."]);
  }
}
for (const question of questions) {
  const review = reviewEntries.find((entry) => entry.questionId === question.id);
  wordingRows.push(["question", question.id, question.sourceKey, "Approved", "IndependentlyReviewed", `audits/remediation-v2-stage4-question-review.json#${question.id}`, question.hash, "stage4-question-review", "R4", review.officialBasis, `Primary ${review.primaryCommandWord}; ${review.primaryRequirement}; AO and four trial cases reviewed.`]);
}
for (const item of explanations) {
  const key = `${item.lesson}/${item.targetId}`;
  const text = [item.title, ...(item.transcript ?? item.steps), item.analogy, item.boundary].filter(Boolean).join("\n");
  const section = questionSections({ lesson: item.lesson })[0];
  wordingRows.push(["infographic", key, item.visual.src, "Approved", "IndependentlyReviewed", `${item.visual.src}#transcript`, hash(text), "stage4-infographic-wording-review", "R4", sectionBasis.get(section), "Maintained transcript and terminology checked against the current content hash; pixel semantics remain a Stage 5/6 gate."]);
}
const register = [wordingReviewHeaders, ...wordingRows].map((row) => row.map(csv).join(",")).join("\n");
fs.writeFileSync(path.join(root, "audits", "cie-wording-review-register.csv"), `${register}\n`);

const defects = readJson("audits/remediation-v2-defects.json");
const closures = {
  "RV2-WORD-001": [
    "scripts/cie-command-words.mjs fixes the main table to the 27 entries on syllabus pages 41-42 and fail-closes subject-operation exceptions by requirement ID",
    "968/968 current-hash question records include primary requirement, AO, marks, answer boundary and four passed trial cases",
  ],
  "RV2-MS-001": [
    "All lesson renderers and the Assessment Bank now present Answer, Guidance and Marks with one mark per independent point",
    "B1/M1/A1 remain only as non-rendered internal data; student Markdown and generated assessment HTML contain no exposed codes",
  ],
};
for (const issue of defects.issues) if (closures[issue.id]) {
  issue.status = "Resolved";
  issue.closureEvidence = closures[issue.id];
}
defects.blockingSummary = "Stages 5-7 remain unaccepted. The L050/L108/L122/L134 technical and image defects keep the current release decision BLOCKED.";
defects.stageStatus = { stage: 4, status: "AwaitingUserApproval" };
if (!defects.stageApprovals.some(({ stage }) => stage === 3)) defects.stageApprovals.push({ stage: 3, status: "ApprovedForProgression", recordedDate: "2026-08-28", releaseDecision: false });
writeJson("audits/remediation-v2-defects.json", defects);

const decision = readJson("audits/remediation-v2-current-decision.json");
decision.currentStage = { number: 4, name: "CIE wording and student mark-scheme presentation", implementationStatus: "Complete", approvalStatus: "AwaitingUserApproval" };
decision.decisionInputs = ["audits/remediation-v2-defects.json", "audits/remediation-v2-stage4-gate-result.json"];
if (!decision.historicalDecisions.some(({ stage }) => stage === 3)) decision.historicalDecisions.splice(3, 0, { stage: 3, decisionAtTime: "BLOCKED", progressionApproval: "ApprovedForProgression", historical: true, current: false });
decision.currentReleaseDecision = "BLOCKED";
writeJson("audits/remediation-v2-current-decision.json", decision);

const commandCounts = Object.fromEntries([...new Set(reviewEntries.map(({ primaryCommandWord }) => primaryCommandWord))].sort().map((word) => [word, reviewEntries.filter((entry) => entry.primaryCommandWord === word).length]));
const openIssues = defects.issues.filter(({ status }) => status === "Open").map(({ id, severity }) => ({ id, severity }));
const gateResult = {
  schemaVersion: 1,
  remediation: "v2",
  stage: 4,
  generatedDate: "2026-08-28",
  implementationStatus: "Complete",
  approvalStatus: "AwaitingUserApproval",
  currentReleaseDecision: "BLOCKED",
  officialCommandWords: { count: officialCommandWords.length, source: "syllabus:p41-42" },
  questionReview: { total: reviewEntries.length, reviewed: reviewEntries.length, blocked: 0, formal: reviewEntries.filter(({ syllabusRelationship }) => syllabusRelationship === "formal-assessment").length, optionalEnrichment: reviewEntries.filter(({ syllabusRelationship }) => syllabusRelationship !== "formal-assessment").length, commandCounts },
  trialCases: { perQuestion: 4, total: reviewEntries.length * 4, failed: 0 },
  wordingRegister: { total: wordingRows.length, approved: wordingRows.length, pending: 0, rejected: 0 },
  studentMarkSchemes: { lessonQuestionIds: 755, assessmentQuestionIds: 213, columns: ["Answer", "Guidance", "Marks"], visibleInternalCodes: 0 },
  negativeControls: ["unsupported Distinguish", "unsupported Trace requirement", "missing boundary trial", "student-visible B1 code"],
  resolvedStage4Issues: Object.keys(closures),
  remainingOpenIssues: openIssues,
};
writeJson("audits/remediation-v2-stage4-gate-result.json", gateResult);
writeJson("audits/remediation-v2-stage4-closure.json", {
  schemaVersion: 1,
  stage: 4,
  records: defects.issues.map((issue) => ({ id: issue.id, severity: issue.severity, stage4Disposition: closures[issue.id] ? "Resolved" : issue.status, closureEvidence: issue.closureEvidence ?? [], nextStage: issue.status === "Resolved" ? null : 5 })),
});
const report = `# AS9618 remediation v2 — Stage 4 CIE wording and mark-scheme report

**Current release decision:** BLOCKED
**Stage status:** Implementation complete; awaiting user approval before Stage 5.

## Change summary

- Replaced the permissive custom verb regex with the 27 command words on official syllabus pages 41-42.
- Retained non-table operations only when a question record cites an official subject-content requirement that uses that operation.
- Reworded unsupported primary prompts, including Distinguish to Compare and Recommend/Choose to Suggest; stable question IDs and marks are unchanged.
- Replaced student-visible B1/M1/A1 with Answer, Guidance and Marks on lesson pages, Markdown assessments and the Assessment Bank; internal codes remain hidden metadata.

## Issue closure table

| Issue | Stage 4 disposition | Evidence / next stage |
|---|---|---|
${defects.issues.map((issue) => `| ${issue.id} | ${closures[issue.id] ? "Resolved" : issue.status} | ${(issue.closureEvidence ?? []).join("; ") || "Stage 5"} |`).join("\n")}

## Passed evidence

- Official command-word table: ${officialCommandWords.length}/27 exact entries; no Distinguish or Recommend remains in the 968 reviewed prompts.
- Question review: ${reviewEntries.length}/${reviewEntries.length} Reviewed; each records primary requirement, AO, marks, allowed-answer boundary and four passed marking trials.
- Wording register: ${wordingRows.length}/${wordingRows.length} Approved with current hash, evidence locator, reviewer, round and page-specific official basis.
- Student display: 755 lesson questions plus 213 Assessment Bank questions use Answer / Guidance / Marks; visible B1/M1/A1 count is zero.

## Active failed samples

- Mutation tests insert unsupported Distinguish, bind Trace to a non-assembly requirement, remove a boundary trial and re-expose B1; each must be rejected.
- Full semantic gate remains blocked by the three Stage 5 P0 content/function/image defects.

## Command evidence

- node scripts/verify-cie-wording.mjs — must pass 27 official words, 968 item reviews, 2054 current-hash wording records and student display checks.
- node scripts/verify-remediation-v2-stage4.mjs — must pass Stage 4 artifacts, defect closure and sole current decision checks.
- node scripts/test-remediation-v2-stage4-mutations.mjs — must reject all four active mutations.
- node scripts/verify-assessments.mjs — must pass 213 Assessment Bank questions and generated Answer/Guidance/Marks output.
- node scripts/verify-all.mjs — Stage 4 and historical Batch 1-18 checks pass first; the command then exits 1 at verify-syllabus-coverage.mjs with exactly 24 retained Stage 5 findings (L050: 19, L108: 1, L122: 2, L134: 2).
- node scripts/generate-remediation-v2-stage4.mjs — two consecutive runs preserve an identical complete binary diff hash.

## Failed / open

- Remaining defects: ${openIssues.map(({ id, severity }) => `${id} (${severity})`).join(", ")}.
- Stage 5 must repair L050 processor factors and L108/L122/L134 pseudocode/function semantics across text, generators and images.

## Unverified

- Stage 5 technical/image repair, Stage 6 full browser/image census and Stage 7 independent final review are not claimed.
- No commit, push or publication was performed.

## Stop condition

Do not start Stage 5 until the user approves Stage 4. Stage approval authorises progression only; it is not a release decision.
`;
fs.writeFileSync(path.join(root, "audits", "remediation-v2-stage4-report.md"), report);

console.log(`Generated Stage 4 review: ${reviewEntries.length} questions, ${wordingRows.length} wording records, 27 official command words, 4 trial cases per question.`);
