import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { evaluateRequirement } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { sourceFactOverrides } from "./stage10-semantic-source-overrides.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const requirements = new Map(coverageContract.requirements.map((requirement) => [requirement.id, requirement]));
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));
const expect = (condition, message) => { if (!condition) failures.push(message); };
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");

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

function jpegDimensions(relativePath) {
  const buffer = fs.readFileSync(path.join(root, relativePath));
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

const scopedRequirements = Array.from({ length: 8 }, (_, index) => `S6.${String(index + 1).padStart(2, "0")}`);
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
  ["063", ["data security", "privacy", "integrity", "computer-system security"]],
  ["064", ["virus", "spyware", "anti-virus", "anti-spyware"]],
  ["065", ["hacker", "phishing", "pharming", "restrict", "risk"]],
  ["066", ["user account", "password", "biometric", "authentication", "authorisation"]],
  ["067", ["access rights", "encryption", "plaintext", "ciphertext"]],
  ["068", ["digital signature", "private key", "public key", "encryption"]],
  ["069", ["firewall", "stand-alone PC", "network firewall"]],
  ["070", ["range check", "format check", "length check", "presence check", "existence check", "limit check", "check digit", "visual check", "double entry", "byte parity", "block parity", "checksum"]],
];
for (const [lesson, terms] of lessonChecks) {
  const markdownName = fs.readdirSync(path.join(root, "lessons")).find((name) => name.startsWith(`${lesson}-`) && name.endsWith(".md"));
  const markdown = read(`lessons/${markdownName}`);
  const html = read(`web/lesson-${lesson}/index.html`);
  includesAll(markdown, terms, `L${lesson} Markdown`);
  includesAll(sectionHtml(html, "stage2-completion"), terms, `L${lesson} visible CORE teaching`);
  const practice = sectionHtml(html, "stage2-practice");
  expect(/data-delivery-role="CORE"/i.test(practice) && /data-classroom-activity="PRACTISE"/i.test(practice), `L${lesson}: Stage 2 practice is not CORE/PRACTISE`);
  expect(/Show answer|Show MS/i.test(practice), `L${lesson}: Stage 2 practice has no visible answer/MS disclosure`);
}

const assessmentChecks = [
  ["L063-Q2", ["data", "computer system", "security"]],
  ["L064-Q5", ["anti-virus", "anti-spyware"]],
  ["L066-Q1", ["user account", "authentication", "authorisation"]],
  ["L070-Q5", ["parity", "byte", "block parity", "checksum"]],
  ["AQ066-Q2", ["virus", "spyware"]],
  ["AQ066-Q5", ["phishing", "pharming"]],
  ["AQ071-Q4", ["range check", "limit check", "lower", "upper"]],
  ["AQ071-Q5", ["parity", "byte", "block parity"]],
  ["AR072-Q1", ["visual check", "double entry", "byte parity", "block parity", "checksum"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 6 assessment`);

const acceptedAssessment = assessmentChecks.map(([id]) => questionText(id, false)).join("\n");
for (const [label, pattern] of [
  ["access rights detect data changes", /access rights?.{0,80}detect(?:s|ed)? whether data (?:has )?changed/is],
  ["biometric match grants authorisation", /biometric (?:match|comparison).{0,100}(?:authorises|grants permission|decides access)/is],
  ["validation proves truth", /validation.{0,80}prove(?:s|d)? (?:that )?(?:the )?data (?:is|are) true/is],
  ["verification automatically corrects errors", /verification.{0,80}(?:automatically )?corrects? (?:all |the )?errors?/is],
]) expect(!pattern.test(acceptedAssessment), `accepted assessment semantics still contain ${label}`);

for (const [key, terms, label] of [
  ["063/controls", ["access rights", "prevent unauthorised", "do not detect whether data changed", "hash/checksum", "encryption"], "L063 controls maintained visual facts"],
  ["066/biometrics", ["authenticates", "authorisation is a separate", "false reject", "false accept"], "L066 biometrics maintained visual facts"],
  ["070/checks", ["range", "format", "length", "presence", "existence", "limit", "check digit", "does not prove"], "L070 validation maintained visual facts"],
  ["070/verification", ["visual checking", "double entry", "parity check on a byte", "block parity", "checksum", "do not prove truth"], "L070 verification maintained visual facts"],
]) includesAll(sourceFactOverrides[key].join(" "), terms, label);

for (const [file, label] of [
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-063-controls.jpg", "L063 controls visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-066-biometrics.jpg", "L066 biometrics visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-070-checks.jpg", "L070 validation visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-070-verification.jpg", "L070 verification visual"],
]) {
  const dimensions = jpegDimensions(file);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${label}: expected 1536x1024 JPEG`);
}

const mutations = [
  ["S6.01", /privacy/gi],
  ["S6.02", /computer-system|computer system/gi],
  ["S6.03", /anti-virus|antivirus/gi],
  ["S6.04", /pharming/gi],
  ["S6.05", /restrict/gi],
  ["S6.06", /encryption/gi],
  ["S6.07", /limit check/gi],
  ["S6.08", /block parity/gi],
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
  ["S6.07", ["L070-Q2", "AQ071-Q4"], /limit|lower|upper/gi, "range/limit assessment"],
  ["S6.08", ["L070-Q5", "AQ071-Q5", "AR072-Q1"], /checksum|block parity|byte parity|parity check on (?:one |a )?byte/gi, "transfer verification assessment"],
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
  expect(mutation.status === "Partial", `mutation escaped: removing ${label} from all assessment forms must fail ${requirementId}`);
}

const register = JSON.parse(read("audits/visual-semantic-remediation-register.json"));
for (const key of ["062/explanation-controls-img-1", "065/explanation-biometrics-img-1", "069/explanation-checks-img-1", "069/explanation-verification-img-1"]) {
  const record = register.records.find((item) => item.key === key);
  expect(Boolean(record), `${key}: visual semantic remediation record is missing`);
  expect(record?.resolved === true && record?.reconciliation === "agreed", `${key}: visual semantic remediation is not resolved`);
  expect(record?.pass1?.status === "passed" && /maintained facts/i.test(record?.pass1?.evidence ?? ""), `${key}: maintained source facts were not confirmed`);
}

const lesson069Css = read("web/lesson-070/styles.css");
expect(/\.lesson-content\s*>\s*\.hero\s+\.data-card\s+p\s*\{[^}]*color:\s*#fff(?:fff)?/is.test(lesson069Css), "L070 hero explanation does not retain a high-specificity white text rule");

const ledger = JSON.parse(read("audits/repair-batch-11-section6-security-data-integrity.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 13, "Batch 11 ledger must resolve eight requirements, four semantic visual defects and one rendered contrast defect");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 11 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 11 Section 6 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 11 verification passed: eight Section 6 requirements are Complete, nine assessment checks, four repaired visuals and the L070 contrast regression pass, and ten mutations are rejected.");
