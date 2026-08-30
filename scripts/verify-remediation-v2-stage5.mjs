import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";
import { parseCsv } from "./remediation-v2-review-gate.mjs";
import { evaluateRemediationV2SemanticGate } from "./remediation-v2-semantic-gate.mjs";
import { evaluateStage5TechnicalControls, stage5VisualKeys, stage5VisualSnapshot } from "./remediation-v2-stage5-gate.mjs";
import { pageDefinitions, pageHash } from "./stage6-qa-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const audits = path.join(root, "audits");
const readJson = (name) => JSON.parse(fs.readFileSync(path.join(audits, name), "utf8"));
const digest = (value) => crypto.createHash("sha256").update(value).digest("hex");
const problems = [];
const expect = (condition, detail) => { if (!condition) problems.push(detail); };
const required = [
  "remediation-v2-stage5-question-review.json",
  "remediation-v2-stage5-visual-review.json",
  "remediation-v2-stage5-browser-evidence.json",
  "remediation-v2-stage5-gate-result.json",
  "remediation-v2-stage5-closure.json",
  "remediation-v2-stage5-report.md",
];
for (const name of required) expect(fs.existsSync(path.join(audits, name)), `${name} is missing`);

const technical = evaluateStage5TechnicalControls();
expect(technical.status === "Ready" && technical.problems.length === 0, `live technical gate has ${technical.problems.length} failure(s)`);
const semanticGate = evaluateRemediationV2SemanticGate();
expect(semanticGate.status === "Ready" && semanticGate.problems.length === 0, `full semantic gate has ${semanticGate.problems.length} failure(s)`);

const questions = loadAllQuestions();
const byId = new Map(questions.map((question) => [question.id, question]));
const review = readJson("remediation-v2-stage5-question-review.json");
expect(review.questionCount === 17 && review.entries.length === 17, "targeted question review count is not 17");
expect(review.stableIdCount === 17 && review.stableMarksCount === 17, "stable question ID/mark count is stale");
expect(review.trialCount === 68 && review.failedTrials === 0, "question trial summary is stale or blocked");
for (const entry of review.entries) {
  const question = byId.get(entry.questionId);
  expect(Boolean(question), `${entry.questionId}: current question missing`);
  if (!question) continue;
  expect(entry.contentHash === question.hash, `${entry.questionId}: review hash is stale`);
  expect(entry.marks === question.marks && entry.allowedAnswerBoundary.creditworthyPoints.length === question.marks, `${entry.questionId}: marks/answer boundary mismatch`);
  for (const key of ["correctAnswer", "commonError", "boundaryAnswer", "outOfScopeAnswer"]) {
    const trial = entry.trialCases[key];
    expect(trial?.result === "Pass" && trial.expectedMarks === trial.observedMarks, `${entry.questionId}:${key} trial failed`);
  }
}

const visualReview = readJson("remediation-v2-stage5-visual-review.json");
expect(visualReview.entries.length === 8 && visualReview.pending === 0 && visualReview.disagreements === 0, "critical visual review is incomplete");
expect(visualReview.firstPassOrder.join() === stage5VisualKeys.join(), "critical visual first-pass order is stale");
expect(visualReview.secondPassOrder.join() === [...stage5VisualKeys].reverse().join(), "critical visual reverse-pass order is stale");
const liveVisualByKey = new Map(stage5VisualSnapshot().map((entry) => [entry.key, entry]));
for (const entry of visualReview.entries) {
  const live = liveVisualByKey.get(entry.key);
  expect(Boolean(live), `${entry.key}: live visual is missing`);
  if (!live) continue;
  expect(entry.sha256 === live.sha256 && entry.sourceFactsHash === live.sourceFactsHash, `${entry.key}: visual review hash is stale`);
  expect(entry.dimensions.width === 1536 && entry.dimensions.height === 1024, `${entry.key}: dimensions are stale`);
  expect(entry.firstPass === "Reviewed" && entry.secondPass === "Reviewed" && entry.semanticStatus === "Approved", `${entry.key}: review status is incomplete`);
}

const semantic = parseCsv(fs.readFileSync(path.join(audits, "stage10-semantic-review-register.csv"), "utf8"));
const semanticByKey = new Map(semantic.rows.map((row) => [`${row.lesson}/${row.target_id}`, row]));
for (const key of stage5VisualKeys) {
  const row = semanticByKey.get(key);
  const live = liveVisualByKey.get(key);
  expect(row?.sha256 === live.sha256 && row?.source_facts_hash === live.sourceFactsHash, `${key}: semantic register is stale`);
  expect(row?.pass1 === "Reviewed" && row?.pass2 === "Reviewed" && row?.status === "Approved", `${key}: semantic register status is incomplete`);
}

const browser = readJson("remediation-v2-stage5-browser-evidence.json");
expect(browser.desktop.lessons.length === 4 && browser.desktop.horizontalOverflowFailures === 0 && browser.desktop.answerExpansionFailures === 0, "desktop browser evidence is blocked");
expect(browser.mobile.records === 4 && browser.mobile.horizontalOverflowFailures === 0 && browser.mobile.answerExpansionFailures === 0, "mobile browser evidence is blocked");
expect(browser.criticalImages.expected === 8 && browser.criticalImages.loaded === 8 && browser.criticalImages.failures === 0, "critical browser images did not all load");
expect(browser.interactions.status === "Passed" && /exactly one CHAR/.test(browser.interactions.l133InvalidCharInput) && /UCASE\('a'\)/.test(browser.interactions.l133ValidCharInput), "L134 CHAR interaction evidence is stale");
expect(browser.consoleWarningsOrErrors === 0, "browser console has warnings/errors");
const decision = readJson("remediation-v2-current-decision.json");
const progressedBeyondStage5 = decision.currentStage?.number > 5;
const stage6Browser = progressedBeyondStage5 ? readJson("remediation-v2-stage6-browser-evidence.json") : null;
const pageByName = new Map(pageDefinitions.map((definition) => [definition.page, definition]));
for (const lesson of ["049", "107", "121", "133"]) {
  const html = fs.readFileSync(path.join(root, "web", `lesson-${lesson}`, "index.html"));
  if (!progressedBeyondStage5) expect(browser.sourceSha256?.[lesson] === digest(html), `L${lesson} browser evidence source hash is stale`);
  else {
    const definition = pageByName.get(`lesson-${lesson}`);
    const rows = stage6Browser.records.filter(({ page }) => page === `lesson-${lesson}`);
    expect(rows.length === 2 && rows.every(({ status, sourceHash }) => status === "Pass" && sourceHash === pageHash(definition)), `L${lesson} current Stage 6 browser evidence is missing or stale`);
  }
}

const renderRoot = fs.mkdtempSync(path.join(os.tmpdir(), "as9618-stage5-render-"));
const renderA = path.join(renderRoot, "a");
const renderB = path.join(renderRoot, "b");
const keyArgument = stage5VisualKeys.join(",");
for (const destination of [renderA, renderB]) {
  execFileSync("python3", [path.join(root, "scripts/render-stage10-critical-repairs.py"), "--output-dir", destination, "--keys", keyArgument], { cwd: root, stdio: "pipe" });
}
for (const key of stage5VisualKeys) {
  const [lesson, target] = key.split("/");
  const name = `stage10-lesson-${lesson}-${target}.jpg`;
  const hashA = digest(fs.readFileSync(path.join(renderA, name)));
  const hashB = digest(fs.readFileSync(path.join(renderB, name)));
  const applied = liveVisualByKey.get(key).sha256;
  expect(hashA === hashB, `${key}: two deterministic renders differ`);
  expect(hashA === applied, `${key}: applied pixels differ from deterministic renderer output`);
}

const gate = readJson("remediation-v2-stage5-gate-result.json");
const defects = readJson("remediation-v2-defects.json");
expect(gate.technicalControls.status === "Ready" && gate.criticalVisuals.reviewed === 8 && gate.targetedQuestionReview.trials === 68, "Stage 5 gate-result summary is stale");
expect(gate.coverageVisualIntegrity?.requiredEvidenceRows === 79 && gate.coverageVisualIntegrity?.uniqueCorePanels === 75 && gate.coverageVisualIntegrity?.semanticGate === "Ready", "Stage 5 visual-integrity summary is stale");
for (const id of ["RV2-AUDIT-003", "RV2-CONT-001", "RV2-PSEUDO-001", "RV2-PSEUDO-002"]) expect(defects.issues.find((issue) => issue.id === id)?.status === "Resolved", `${id} is not Resolved`);
expect(defects.issues.filter(({ status, severity }) => status !== "Resolved" && ["P0", "P1"].includes(severity)).length === 0, "an open P0/P1 defect remains");
expect(decision.currentReleaseDecision === (decision.currentStage?.number >= 7 ? "RELEASE_CANDIDATE" : "BLOCKED"), "current decision is inconsistent with final-stage progression");
if (!progressedBeyondStage5) expect(decision.currentStage.number === 5 && decision.currentStage.approvalStatus === "AwaitingUserApproval", "current decision is not Stage 5 AwaitingUserApproval / BLOCKED");
else expect(decision.historicalDecisions.some(({ stage, progressionApproval, current }) => stage === 5 && progressionApproval === "ApprovedForProgression" && current === false), "Stage 5 progression approval is missing from history");
expect(decision.historicalDecisions.some(({ stage, progressionApproval }) => stage === 4 && progressionApproval === "ApprovedForProgression"), "Stage 4 progression approval is missing from history");

const report = fs.readFileSync(path.join(audits, "remediation-v2-stage5-report.md"), "utf8");
for (const heading of ["## Issue closure table", "## Passed evidence", "## Active failed samples", "## Command evidence", "## Failed / open", "## Optional enrichment", "## Unverified", "## Remaining risks", "## Stop condition"]) expect(report.includes(heading), `Stage 5 report is missing ${heading}`);

try {
  execFileSync(process.execPath, [path.join(root, "scripts/test-remediation-v2-stage5-mutations.mjs")], { cwd: root, stdio: "pipe" });
} catch (error) {
  problems.push(`active mutation suite failed: ${error.stdout?.toString() ?? ""}${error.stderr?.toString() ?? ""}`.trim());
}

if (problems.length) {
  console.error(`Remediation v2 Stage 5 verification failed (${problems.length}):`);
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}
console.log("Remediation v2 Stage 5 verification passed: 17 current-hash questions with 68 trials, 8 deterministic two-pass images, 8 targeted browser records and zero open P0/P1 defects; release remains BLOCKED pending Stages 6-7.");
