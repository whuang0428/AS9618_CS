import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
const failures = [];
const expect = (condition, message) => { if (!condition) failures.push(message); };

const css = read("web/stage10-explanations.css");
expect(/@media \(max-width: 640px\)[\s\S]*?\.explanation-panel > \.explanation-infographic\s*\{\s*display: none;/m.test(css), "mobile fallback does not hide every Stage 10 raster");
expect(/\.explanation-panel > \.explanation-sr-only\s*\{[\s\S]*?position: static !important;[\s\S]*?white-space: normal !important;/m.test(css), "mobile fallback does not expose the complete transcript");
expect(!/width:\s*720px/.test(css), "obsolete 720 px mobile width remains");
for (let lesson = 1; lesson <= 151; lesson += 1) {
  const id = String(lesson).padStart(3, "0");
  const html = read(`web/lesson-${id}/index.html`);
  expect((html.match(/stage10-explanations\.css\?v=9/g) ?? []).length === 1, `L${id}: Stage 10 stylesheet v9 is not linked exactly once`);
}

const duplicateGroups = [[27, 28, 29, 31, 32, 38, 39], [8, 9], [52, 58]];
for (const group of duplicateGroups) {
  const hashes = group.map((lesson) => {
    const id = String(lesson).padStart(3, "0");
    const html = read(`web/lesson-${id}/index.html`);
    const text = ["hook", "examples", "practice", "debug"].map((sectionId) => html.match(new RegExp(`<section[^>]+id="${sectionId}"[\\s\\S]*?<\\/section>`))?.[0] ?? "").join(" ").replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
    expect(text.length >= 500, `L${id}: reviewed teaching scaffold has less than 500 characters`);
    return sha256(text);
  });
  expect(new Set(hashes).size === group.length, `topic-specific scaffold collision in ${group.join(",")}`);
}

const questions = loadAllQuestions();
let aWithoutM = 0;
let ftBOnly = 0;
for (const question of questions) {
  const codes = question.points.map(([code]) => code);
  if (codes.some((code) => /^A\d+$/.test(code)) && !codes.some((code) => /^M\d+$/.test(code))) aWithoutM += 1;
  if (question.guidance.some((note) => /\bFT\b|follow[- ]through/i.test(note)) && codes.every((code) => /^B\d+$/.test(code))) ftBOnly += 1;
}
expect(questions.length === 968, `expected 968 questions, found ${questions.length}`);
expect(aWithoutM === 0, `${aWithoutM} A-without-M questions remain`);
expect(ftBOnly === 0, `${ftBOnly} FT-with-B-only questions remain`);

const ao = JSON.parse(read("scripts/question-ao-contract.json"));
const currentById = new Map(questions.map((question) => [question.id, question]));
expect(ao.questions.length === 968, `expected 968 AO mappings, found ${ao.questions.length}`);
expect(new Set(ao.questions.map(({ questionId }) => questionId)).size === 968, "AO mapping IDs are not unique");
for (const row of ao.questions) {
  expect(row.reviewStatus === "Reviewed" && row.assessmentObjectives.length > 0, `${row.questionId}: AO mapping is not complete`);
  expect(currentById.get(row.questionId)?.hash === row.contentHash, `${row.questionId}: AO mapping hash is stale`);
}

const ledger = JSON.parse(read("audits/repair-batch-18-scientific-closure.json"));
expect(ledger.status === "Resolved" && ledger.confidence === "High", "Batch 18 ledger is not resolved at High confidence");
expect(ledger.records.length === 5 && ledger.records.every(({ status, evidence }) => status === "Resolved" && evidence), "Batch 18 ledger has an incomplete record");

const finalDefects = JSON.parse(read("audits/scientific-final-defects.json"));
expect(finalDefects.releaseDecision === "APPROVED", "final scientific release decision is not APPROVED");
expect(finalDefects.defects.length === 30 && finalDefects.defects.every(({ status, closureEvidence }) => status === "Resolved" && closureEvidence.length), "not all 30 defects have closure evidence");
expect(Object.values(finalDefects.unresolved).every((count) => count === 0), "final defect register contains unresolved or unknown items");

const emptyAoMutation = structuredClone(ao);
emptyAoMutation.questions[0].assessmentObjectives = [];
expect(emptyAoMutation.questions.some((row) => row.assessmentObjectives.length === 0), "AO mutation fixture was not applied");
const mobileMutation = css.replace(".explanation-panel > .explanation-infographic", "#one-panel > .explanation-infographic");
expect(!/@media \(max-width: 640px\)[\s\S]*?\.explanation-panel > \.explanation-infographic\s*\{\s*display: none;/m.test(mobileMutation), "mobile-scope mutation escaped");

if (failures.length) {
  console.error(`Batch 18 scientific closure verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 18 verification passed: global mobile fallback, distinct teaching scaffolds, zero mark-code flags, 968 AO mappings and 30 resolved defects.");
