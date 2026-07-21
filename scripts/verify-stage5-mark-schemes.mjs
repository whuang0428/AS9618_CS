import fs from "node:fs";
import path from "node:path";

import { dependencyQuestion, loadAllQuestions, secondReviewDomain } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const registerPath = path.join(root, "audits", "stage5-ms-review-register.csv");
const historyPath = path.join(root, "audits", "stage5-ms-review-history.csv");
const reportPath = path.join(root, "audits", "stage5-ms-review-report.md");
const questions = loadAllQuestions();
const failures = [];
const fail = (message) => failures.push(message);

const vaguePattern = /\b(good answer|clear explanation|appropriate answer|reasonable answer|valid point|relevant point|other sensible answer|balanced judgement|balanced recommendation|coherent justification|clear comparison|clear corrected wording)\b/i;
const genericFtPattern = /\bFT\b.*\b(where appropriate|where possible|if clear|if consistent|award each|mark each)\b/i;
const preciseFtPattern = /\b(FT|follow[- ]through)\b.*\b(candidate(?:'s)?|their)\b.*\b(earlier|previous|calculated|derived|intermediate|value|result|answer|output|column|row|total|bounds|condition)\b/i;

if (questions.length !== 963) fail(`Expected 963 reviewed questions; found ${questions.length}`);
if (new Set(questions.map((question) => question.id)).size !== questions.length) fail("Question review IDs must be unique");
if (new Set(questions.map((question) => question.prompt)).size !== questions.length) fail("Question prompts must be unique across the Stage 5 corpus");

for (const question of questions) {
  if (question.points.length !== question.marks) fail(`${question.id}: marking points do not match ${question.marks} marks`);
  if (!question.points.every(([code, text]) => /^(B1|M1|A1)$/.test(code) && String(text).trim())) fail(`${question.id}: invalid marking point`);
  if (question.points.some(([, text]) => vaguePattern.test(text))) fail(`${question.id}: vague, non-operational marking language`);
  if (!question.guidance.length || question.guidance.some((note) => !String(note).trim())) fail(`${question.id}: missing marking guidance`);
  if (new Set(question.points.map(([, text]) => text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim())).size !== question.points.length) {
    fail(`${question.id}: repeats the same marking point`);
  }

  const ftNotes = question.guidance.filter((note) => /\bFT\b|follow[- ]through/i.test(note));
  for (const note of ftNotes) {
    if (!dependencyQuestion(question.prompt)) fail(`${question.id}: FT is attached to a non-dependent theory question`);
    if (genericFtPattern.test(note) || !preciseFtPattern.test(note)) fail(`${question.id}: FT does not identify a precise earlier candidate result`);
  }

  if (!dependencyQuestion(question.prompt) && question.points.some(([code]) => code !== "B1")) {
    fail(`${question.id}: independent theory points must use B1 rather than mechanical M1/A1`);
  }
}

function parseCsvLine(line) {
  const fields = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      fields.push(field);
      field = "";
    } else {
      field += character;
    }
  }
  fields.push(field);
  return fields;
}

if (!fs.existsSync(registerPath)) {
  fail("Stage 5 review register is missing");
} else {
  const lines = fs.readFileSync(registerPath, "utf8").trim().split("\n");
  const header = lines.shift();
  if (header !== "id,source,lesson,section,marks,status,content_hash,second_review") fail("Stage 5 register header is invalid");
  const rows = new Map(lines.map((line) => {
    const fields = parseCsvLine(line);
    return [fields[0], fields];
  }));
  if (rows.size !== questions.length) fail(`Review register must contain ${questions.length} unique rows; found ${rows.size}`);
  for (const question of questions) {
    const row = rows.get(question.id);
    if (!row) {
      fail(`${question.id}: missing from review register`);
      continue;
    }
    const [, source, lesson, section, marks, status, hash, secondReview] = row;
    if (source !== question.source || Number(lesson) !== question.lesson || section !== String(question.section) || Number(marks) !== question.marks) fail(`${question.id}: register metadata mismatch`);
    if (status !== "Approved") fail(`${question.id}: status is ${status || "missing"}, expected Approved`);
    if (hash !== question.hash) fail(`${question.id}: approved content changed after review`);
    const domain = secondReviewDomain(question);
    if (domain && secondReview !== domain) fail(`${question.id}: missing ${domain} second review`);
    if (!domain && secondReview !== "-") fail(`${question.id}: unexpected second-review label`);
  }
}

if (!fs.existsSync(historyPath)) {
  fail("Stage 5 status history is missing");
} else {
  const lines = fs.readFileSync(historyPath, "utf8").trim().split("\n");
  const header = lines.shift();
  if (header !== "id,Draft,Checked,Revised,Approved,review_route") fail("Stage 5 status history header is invalid");
  const rows = new Map(lines.map((line) => {
    const fields = parseCsvLine(line);
    return [fields[0], fields];
  }));
  if (rows.size !== questions.length) fail(`Status history must contain ${questions.length} unique rows; found ${rows.size}`);
  for (const question of questions) {
    const row = rows.get(question.id);
    if (!row) {
      fail(`${question.id}: missing from status history`);
      continue;
    }
    const [, draft, checked, revised, approved, route] = row;
    if ([draft, checked, revised, approved].some((status) => status !== "Complete")) fail(`${question.id}: incomplete review status history`);
    const expectedRoute = secondReviewDomain(question) ? `Specialist: ${secondReviewDomain(question)}` : "Standard";
    if (route !== expectedRoute) fail(`${question.id}: status history route mismatch`);
  }
}

if (!fs.existsSync(reportPath)) fail("Stage 5 review report is missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

const lessonCount = questions.filter((question) => question.source === "lesson").length;
const assessmentCount = questions.length - lessonCount;
const secondReviewCount = questions.filter(secondReviewDomain).length;
console.log(`Stage 5 MS verification passed: ${lessonCount} lesson questions + ${assessmentCount} assessment questions = ${questions.length} Approved; ${secondReviewCount} received specialist second review.`);
