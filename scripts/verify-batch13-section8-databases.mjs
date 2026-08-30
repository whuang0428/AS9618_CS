import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");

function includesAll(text, terms, label) {
  const source = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").toLowerCase();
  for (const term of terms) expect(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
}

function questionText(id, includeGuidance = true) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...(includeGuidance ? question.guidance : [])].join(" ") : "";
}

function sectionHtml(html, id) {
  const opening = new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>`, "i").exec(html);
  if (!opening) return "";
  const tokens = /<section\b[^>]*>|<\/section>/gi;
  tokens.lastIndex = opening.index;
  let depth = 0;
  let match;
  while ((match = tokens.exec(html))) {
    if (match[0].startsWith("<section")) depth += 1;
    else if (--depth === 0) return html.slice(opening.index, tokens.lastIndex);
  }
  return "";
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else field += character;
    } else if (character === '"') quoted = true;
    else if (character === ",") { row.push(field); field = ""; }
    else if (character === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += character;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  const [headers, ...body] = rows.filter((values) => values.some(Boolean));
  return body.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function jpegDimensions(relativePath) {
  const filePath = path.join(root, relativePath);
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) { offset += 1; continue; }
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

const scopedRequirements = Array.from({ length: 11 }, (_, index) => `S8.${String(index + 1).padStart(2, "0")}`);
for (const id of scopedRequirements) {
  const requirement = requirements.get(id);
  expect(Boolean(requirement), `${id}: contract row is missing`);
  if (!requirement) continue;
  const evaluation = evaluateRequirement(requirement);
  expect(evaluation.status === "Complete", `${id}: ${evaluation.messages.join("; ")}`);
  expect(requirement.evidenceReviewStatus === "Reviewed", `${id}: evidence mapping is not independently reviewed`);
  expect(!/^The contract wording integrates/.test(requirement.notes), `${id}: placeholder Notes text remains`);
}

const lessonChecks = [
  ["079", ["file-based limitations", "file-based approach", "redundancy", "inconsistency", "data isolation", "linked tables", "relational database"]],
  ["081", ["data dictionary", "data modelling", "logical schema", "data security", "backup procedures", "access rights", "developer interface", "query processor"]],
  ["080", [
    "entity", "table", "record", "tuple", "field", "attribute", "candidate key", "primary key", "secondary key", "need not be unique", "foreign key", "index",
    "one-to-one", "one-to-many", "many-to-many", "linking table", "referential integrity",
  ]],
  ["081", ["E-R diagram", "cardinality", "linking entity", "entity", "attribute"]],
  ["081", ["1NF", "2NF", "3NF", "partial dependenc", "transitive dependenc", "normalised 3NF design"]],
  ["084", ["industry-standard", "DDL", "DML"]],
  ["085", ["SELECT", "FROM", "WHERE", "operators", "literal values"]],
  ["086", [
    "ORDER BY", "GROUP BY", "SUM", "COUNT", "AVG", "at most two tables", "INNER JOIN", "ON", "WHERE",
  ]],
  ["086", [
    "CREATE DATABASE", "CREATE TABLE", "ALTER TABLE", "CHARACTER", "VARCHAR", "BOOLEAN", "INTEGER", "REAL", "DATE", "TIME", "PRIMARY KEY", "FOREIGN KEY", "REFERENCES",
  ]],
  ["088", ["INSERT", "UPDATE", "DELETE", "WHERE"]],
  ["090", ["candidate, primary, secondary and foreign keys", "1NF, 2NF and 3NF", "developer interface", "query processor", "at most two tables", "INNER JOIN ... ON"]],
];
for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = read(`lessons/${markdownName}`);
  const html = read(`web/lesson-${lesson}/index.html`);
  includesAll(markdown, terms, `L${lesson} Markdown`);
  includesAll(html, terms, `L${lesson} student-visible HTML`);
  if (sectionHtml(html, "stage2-completion")) {
    const practice = sectionHtml(html, "stage2-practice");
    expect(/data-delivery-role="CORE"/i.test(practice) && /data-classroom-activity="PRACTISE"/i.test(practice), `L${lesson}: Stage 2 practice is not CORE/PRACTISE`);
    expect(/Show answer|Show MS/i.test(practice), `L${lesson}: Stage 2 practice has no visible answer/MS disclosure`);
  }
}

const assessmentChecks = [
  ["L080-Q4", ["flat-file", "problems"]],
  ["AM081-Q4", ["flat file", "related tables", "query processor"]],
  ["AQ081-Q5", ["candidate key", "secondary key", "need not be unique"]],
  ["AQ086-Q1", ["primary key", "foreign key"]],
  ["AQ086-Q2", ["one-to-many", "foreign key"]],
  ["L082-Q5", ["referential integrity"]],
  ["L083-Q3", ["cardinality", "one-to-many"]],
  ["AR090-Q1", ["2NF", "partial dependency"]],
  ["AQ086-Q3", ["third normal form", "non-key attribute"]],
  ["L084-Q3", ["normalised design", "linking table", "foreign keys"]],
  ["L079-Q3", ["data dictionary", "developer interface", "query processor"]],
  ["AQ081-Q3", ["developer interface", "query processor"]],
  ["AQ091-Q2", ["ALTER TABLE", "VARCHAR(80)"]],
  ["L085-Q5", ["SELECT Title, DaysOverdue", "Borrower = 'Leo'"]],
  ["AQ086-Q5", ["Employee", "Department", "INNER JOIN", "ON"]],
  ["AR090-Q2", ["DepartmentName", "COUNT(*)", "INNER JOIN", "GROUP BY", "ORDER BY"]],
  ["L090-Q3", ["Student", "Loan", "INNER JOIN", "ON Student.StudentID = Loan.StudentID", "WHERE Loan.Returned = FALSE"]],
  ["L088-Q1", ["INSERT INTO"]],
  ["L088-Q2", ["UPDATE", "WHERE"]],
  ["L088-Q3", ["DELETE FROM", "WHERE"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 8 assessment`);

const acceptedSection8 = [
  ...Array.from(questions.values()).filter(({ id }) => /^(?:L0(?:79|80|81|82|83|84|85|86|87|88|89|90)-Q|AQ0(?:80|85|90)-Q|AR090-Q|AM0(?:80|100)-Q)/.test(id)),
].map((question) => [question.prompt, question.answer, ...question.points.flat()].join(" ")).join("\n");
for (const [label, pattern] of [
  ["secondary key as alternate candidate key", /secondary key\s+(?:is|means)\s+(?:an\s+)?alternate candidate key/is],
  ["secondary/alternate key equivalence", /secondary\/alternate key/is],
  ["three-table comma join", /FROM\s+\w+\s*,\s*\w+\s*,\s*\w+/is],
  ["Access hash-delimited date", /#[12][0-9]{3}-[01][0-9]-[0-3][0-9]#/],
]) expect(!pattern.test(acceptedSection8), `accepted Section 8 semantics still contain ${label}`);

const l089q3 = questionText("L090-Q3");
expect(!/\bBook\b/i.test(l089q3), "L090-Q3 must not reintroduce a third Book table");
expect(!/FROM\s+Student\s*,\s*Loan/i.test(l089q3), "L090-Q3 must not accept a comma-style join");
expect(/Do not accept a three-table or comma-style join/i.test(l089q3), "L090-Q3 mark scheme must reject three-table and comma-style joins");
expect(!/#\d{4}-\d{2}-\d{2}#/.test(read("web/lesson-087/index.html")), "L087 still contains an Access-specific #date# literal");

const visualFiles = [
  ["079", "dbms"], ["080", "compare"], ["081", "terms"], ["082", "relationships"], ["082", "referential"],
  ["083", "cardinality"], ["084", "normal-forms"], ["085", "clauses"], ["086", "aggregates"], ["087", "join"], ["088", "dml"],
].map(([lesson, target]) => `web/assets/diagrams/stage10-infographics/stage10-lesson-${lesson}-${target}.jpg`);
for (const file of visualFiles) {
  const dimensions = jpegDimensions(file);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${file}: expected 1536x1024 JPEG`);
}

const repairFacts = JSON.parse(read("scripts/stage10-visual-repair-facts.json"));
includesAll((repairFacts["084/normal-forms"] ?? []).join(" "), ["1NF", "2NF", "3NF", "partial dependency", "transitive dependency", "retains every original fact"], "L084 visual repair facts");
const visualPath = "web/assets/diagrams/stage10-infographics/stage10-lesson-084-normal-forms.jpg";
const visualHash = sha256(fs.readFileSync(path.join(root, visualPath)));
const semanticRow = parseCsv(read("audits/stage10-semantic-review-register.csv")).find((row) => row.asset === "stage10-lesson-084-normal-forms.jpg" && row.target_id === "normal-forms");
expect(semanticRow?.sha256 === visualHash, "L084 semantic review register hash does not match the current image");
const remediation = JSON.parse(read("audits/visual-semantic-remediation-register.json")).records.find((record) => record.key === "083/explanation-normal-forms-img-1");
expect(remediation?.afterAssetSha256 === visualHash, "L084 remediation register hash does not match the current image");
expect(remediation?.resolved === true && remediation?.pass1?.status === "passed" && remediation?.pass2?.status === "passed", "L084 visual does not have two resolved semantic review passes");

const mutations = [
  ["S8.01", /file-based/gi],
  ["S8.02", /secondary key/gi],
  ["S8.03", /entity-relationship/gi],
  ["S8.04", /3NF/gi],
  ["S8.05", /data dictionary/gi],
  ["S8.06", /query processor/gi],
  ["S8.07", /industry-standard/gi],
  ["S8.08", /SELECT/gi],
  ["S8.09", /CHARACTER/gi],
  ["S8.10", /INNER JOIN/gi],
  ["S8.11", /DELETE/gi],
];
for (const [id, pattern] of mutations) {
  const mutation = evaluateRequirement(requirements.get(id), {
    lessonTransform: ({ markdown, html }) => ({
      markdown: markdown.replaceAll(pattern, "removed concept"),
      html: html.replaceAll(pattern, "removed concept"),
    }),
  });
  expect(mutation.status === "Partial", `mutation escaped: ${id} remained Complete after required teaching was removed`);
}

for (const [requirementId, questionIds, pattern, label] of [
  ["S8.02", ["AQ081-Q5", "AQ086-Q1", "L082-Q5"], /candidate key|secondary key|primary key|foreign key|referential|integrity/gi, "key assessment"],
  ["S8.10", ["AQ086-Q5", "AR090-Q2"], /INNER JOIN|\bON\b|Employee|Department|COUNT|GROUP BY|ORDER BY/gi, "two-table join assessment"],
]) {
  const mutation = evaluateRequirement(requirements.get(requirementId), {
    questionTransform: (question) => questionIds.includes(question.id)
      ? {
          ...question,
          prompt: question.prompt.replaceAll(pattern, "removed concept"),
          answer: question.answer.replaceAll(pattern, "removed concept"),
          points: question.points.map(([code, text]) => [code, text.replaceAll(pattern, "removed concept")]),
          guidance: question.guidance.map((text) => text.replaceAll(pattern, "removed concept")),
        }
      : question,
  });
  expect(mutation.status === "Partial", `mutation escaped: removing ${label} from every declared form must fail ${requirementId}`);
}

const ledger = JSON.parse(read("audits/repair-batch-13-section8-databases.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 15, "Batch 13 ledger must resolve eleven requirements and four cross-cutting content/assessment/visual defects");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 13 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 13 Section 8 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 13 verification passed: eleven Section 8 requirements are Complete, twenty assessment checks and eleven visual assets pass, and thirteen mutations are rejected.");
