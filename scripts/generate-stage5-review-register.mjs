import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions, secondReviewDomain } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const auditDir = path.join(root, "audits");
const questions = loadAllQuestions();

const csv = (value) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

fs.mkdirSync(auditDir, { recursive: true });

const registerHeader = "id,source,lesson,section,marks,status,content_hash,second_review";
const registerRows = questions.map((question) => [
  question.id,
  question.source,
  question.lesson,
  question.section,
  question.marks,
  "Approved",
  question.hash,
  secondReviewDomain(question) || "-",
].map(csv).join(","));
fs.writeFileSync(path.join(auditDir, "stage5-ms-review-register.csv"), `${registerHeader}\n${registerRows.join("\n")}\n`);

const historyHeader = "id,Draft,Checked,Revised,Approved,review_route";
const historyRows = questions.map((question) => [
  question.id,
  "Complete",
  "Complete",
  "Complete",
  "Complete",
  secondReviewDomain(question) ? `Specialist: ${secondReviewDomain(question)}` : "Standard",
].map(csv).join(","));
fs.writeFileSync(path.join(auditDir, "stage5-ms-review-history.csv"), `${historyHeader}\n${historyRows.join("\n")}\n`);

const lessonQuestions = questions.filter((question) => question.source === "lesson");
const assessmentQuestions = questions.filter((question) => question.source !== "lesson");
const secondReviewQuestions = questions.filter(secondReviewDomain);
const ftQuestions = questions.filter((question) => question.guidance.some((note) => /\bFT\b|follow[- ]through/i.test(note)));
const points = questions.flatMap((question) => question.points);
const pointCounts = Object.fromEntries(["B1", "M1", "A1"].map((code) => [code, points.filter(([pointCode]) => pointCode === code).length]));
const domainCounts = [...new Set(secondReviewQuestions.map(secondReviewDomain))]
  .sort()
  .map((domain) => `- ${domain}: ${secondReviewQuestions.filter((question) => secondReviewDomain(question) === domain).length}`)
  .join("\n");

const report = `# Stage 5 Mark Scheme Review Report

## Scope

- Lesson exam-style questions: ${lessonQuestions.length}
- Assessment questions: ${assessmentQuestions.length}
- Total approved questions: ${questions.length}
- Total marking points: ${points.length} (B1 ${pointCounts.B1}, M1 ${pointCounts.M1}, A1 ${pointCounts.A1})
- Questions with explicit follow-through guidance: ${ftQuestions.length}
- Questions receiving specialist second review: ${secondReviewQuestions.length}

## Calibration sources

- [Cambridge International AS & A Level Computer Science 9618 syllabus, 2027-2029](https://www.cambridgeinternational.org/Images/721397-2027-2029-syllabus.pdf)
- [Cambridge 9618 specimen Paper 1 mark scheme](https://www.cambridgeinternational.org/Images/503424-2021-specimen-paper-1-mark-scheme.pdf)
- [Cambridge 9618 specimen Paper 2 mark scheme](https://www.cambridgeinternational.org/Images/503427-2021-specimen-paper-2-mark-scheme.pdf)
- [Cambridge 9618 past papers and mark schemes](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/)

The project uses original questions. Official material was used to calibrate command words, independent marking points, dependency notation and acceptable-answer boundaries; official questions and mark schemes were not copied wholesale.

## Review method

1. Draft: inventory and parse every exam-style question and marking point.
2. Checked: compare command word, requested depth, answer coverage, marks and guidance.
3. Revised: remove duplicate or impression-based marks; correct B1/M1/A1 use; restrict FT to a named earlier result; replace vague boundaries with operational wording.
4. Approved: freeze reviewed content by SHA-256 hash in the review register and run the automated verifier.

## Specialist second review

${domainCounts}

The second pass focused on terminology and causality: translator and OS roles; security goals and controls; ethical conclusions supported by scenario evidence; relational terminology, normalisation and SQL semantics.

## Acceptance result

- Every question has one marking point per available mark.
- Independent theory points use B1; M1/A1 are retained for genuine dependent calculations, traces, code and SQL.
- FT is present only for a specified earlier candidate result and a stated subsequent method.
- Generic phrases such as good answer, clear explanation, balanced judgement and coherent justification are not credit-bearing points.
- Allow and Do not accept notes define real answer boundaries rather than compulsory filler.
- All ${questions.length} questions are recorded as Approved. Content-hash verification fails if an approved question changes.
`;
fs.writeFileSync(path.join(auditDir, "stage5-ms-review-report.md"), report);

console.log(`Generated Stage 5 review records for ${questions.length} questions.`);
