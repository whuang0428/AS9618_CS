import fs from "node:fs";
import path from "node:path";

import { coverageContract } from "./syllabus-coverage-contract.mjs";
import { buildCurriculumSequenceModel } from "./curriculum-sequence-model.mjs";
import { evaluateRequirement, root } from "./syllabus-coverage-evaluator.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";
import { parseCsv } from "./remediation-v2-review-gate.mjs";
import { evaluateAuditIntegrity } from "./remediation-v2-audit-integrity-gate.mjs";

const normalise = (value) => String(value).replace(/[’`]/g, "'").replace(/\s+/g, " ").trim().toLowerCase();
const includes = (text, term) => normalise(text).includes(normalise(term));
const questionText = (question) => [question.prompt, question.answer, ...(question.points ?? []).flat(), ...(question.guidance ?? [])].join(" ");

function markdownLesson(number) {
  const prefix = `${String(number).padStart(3, "0")}-`;
  const name = fs.readdirSync(path.join(root, "lessons")).find((candidate) => candidate.startsWith(prefix) && candidate.endsWith(".md"));
  return name ? fs.readFileSync(path.join(root, "lessons", name), "utf8") : "";
}

function webLessonFile(number, name) {
  const id = String(number).padStart(3, "0");
  return fs.readFileSync(path.join(root, "web", `lesson-${id}`, name), "utf8");
}

function markedRegion(markdown, id) {
  const start = markdown.indexOf(`<!-- ${id}:start -->`);
  const end = markdown.indexOf(`<!-- ${id}:end -->`);
  return start >= 0 && end > start ? markdown.slice(start, end) : "";
}

function visualFacts(lesson, sectionId) {
  const register = fs.readFileSync(path.join(root, "audits", "stage10-concept-visual-register.csv"), "utf8");
  const { rows } = parseCsv(register);
  return rows.filter((row) => Number(row.lesson) === lesson && row.section_id === sectionId)
    .map((row) => `${row.topic} ${row.required_facts}`).join(" ");
}

function ocrFacts(filename) {
  const register = fs.readFileSync(path.join(root, "audits", "stage10-ocr-wording.csv"), "utf8");
  return parseCsv(register).rows.find((row) => row.file === filename)?.ocr_text ?? "";
}

export function actualCriticalFixture() {
  const questions = loadAllQuestions();
  const questionsForLesson = (lesson) => questions.filter((question) => question.lesson === lesson).map(questionText).join(" ");
  const l005 = markdownLesson(5);
  const l049 = markdownLesson(49);
  const l107 = markdownLesson(107);
  const l121 = markdownLesson(121);
  const l133 = markdownLesson(133);
  const l049Html = webLessonFile(49, "index.html");
  const l049App = webLessonFile(49, "app.js");
  const l107Html = webLessonFile(107, "index.html");
  const l107App = webLessonFile(107, "app.js");
  const l121Html = webLessonFile(121, "index.html");
  const l121App = webLessonFile(121, "app.js");
  const l133Html = webLessonFile(133, "index.html");
  const l133App = webLessonFile(133, "app.js");
  return {
    onesComplement: {
      teaching: markedRegion(l005, "stage2-completion"),
      workedExample: markedRegion(l005, "stage2-completion"),
      practice: markedRegion(l005, "stage2-practice"),
      assessment: `${questionsForLesson(5)} ${questionsForLesson(10)}`,
    },
    performance: {
      title: `${l049.match(/^## Optional enrichment:.*$/m)?.[0] ?? ""} ${l049Html.match(/<section[^>]+id="concept"[\s\S]*?<h2>([\s\S]*?)<\/h2>/i)?.[1] ?? ""}`,
      teaching: `${l049} ${l049Html}`,
      practice: l049App,
      assessment: questionsForLesson(49),
      visual: `${visualFacts(49, "explanation-concept")} ${ocrFacts("stage10-lesson-049-concept.jpg")}`,
    },
    l107: `${l107} ${l107Html} ${l107App} ${visualFacts(107, "explanation-pseudocode")} ${ocrFacts("stage10-lesson-107-pseudocode.jpg")}`,
    l121: `${l121} ${l121Html} ${l121App} ${visualFacts(121, "explanation-parse")} ${visualFacts(121, "explanation-pseudocode")} ${visualFacts(121, "explanation-types")} ${ocrFacts("stage10-lesson-121-parse.jpg")} ${ocrFacts("stage10-lesson-121-pseudocode.jpg")} ${ocrFacts("stage10-lesson-121-types.jpg")}`,
    l133: `${l133} ${l133Html} ${l133App} ${visualFacts(133, "explanation-case")} ${visualFacts(133, "explanation-concat")} ${visualFacts(133, "explanation-java")} ${visualFacts(133, "explanation-position")} ${ocrFacts("stage10-lesson-133-case.jpg")} ${ocrFacts("stage10-lesson-133-concat.jpg")} ${ocrFacts("stage10-lesson-133-java.jpg")}`,
  };
}

function pushMissingSurface(problems, id, label, surfaces, term) {
  for (const [surface, text] of Object.entries(surfaces)) {
    if (!includes(text, term)) problems.push({ id, type: "CRITICAL_SEMANTIC_CONTROL", location: surface, detail: `${label}: ${surface} is missing ${term}` });
  }
}

function suppliedSignature(text, name, signaturePattern, conventionPattern = null) {
  return !new RegExp(`\\b${name}\\s*\\(`, "i").test(text)
    || (signaturePattern.test(text) && (!conventionPattern || conventionPattern.test(text)));
}

function unexpectedUppercaseCalls(text, allowed) {
  const declared = [...text.matchAll(/\b(?:FUNCTION|PROCEDURE)\s+([A-Z][A-Z0-9_]*)\s*\(/g)].map((match) => match[1]);
  const permitted = new Set([...allowed, ...declared]);
  const calls = [...text.matchAll(/\b([A-Z][A-Z0-9_]*)\s*\(/g)].map((match) => match[1]);
  return [...new Set(calls.filter((name) => !permitted.has(name)))].sort();
}

export function evaluateCriticalSemanticControls(fixture = actualCriticalFixture()) {
  const problems = [];
  const oneSurfaces = fixture.onesComplement;
  pushMissingSurface(problems, "CRIT-S1.03-ONES-COMPLEMENT", "one's-complement conversion", oneSurfaces, "one's complement");
  if (!/(convert|conversion)[\s\S]{0,120}one['’]s complement|one['’]s complement[\s\S]{0,120}(convert|conversion)/i.test(oneSurfaces.workedExample)) {
    problems.push({ id: "CRIT-S1.03-ONES-COMPLEMENT", type: "CRITICAL_SEMANTIC_CONTROL", location: "workedExample", detail: "one's-complement worked evidence does not perform a conversion" });
  }

  const performanceSurfaces = fixture.performance;
  for (const term of ["processor type", "number of cores", "bus width", "clock speed", "cache"]) {
    pushMissingSurface(problems, "CRIT-L049-PERFORMANCE-FACTORS", "official processor performance list", performanceSurfaces, term);
  }
  for (const surface of ["title", "visual"]) {
    if (includes(performanceSurfaces[surface], "word length")) {
      problems.push({ id: "CRIT-L049-PERFORMANCE-FACTORS", type: "CRITICAL_SEMANTIC_CONTROL", location: surface, detail: `${surface} substitutes word length into the official performance-factor list` });
    }
  }

  if (/\b(?:LCASE|UCASE)\s*\(\s*MID\s*\(/i.test(fixture.l107)) {
    problems.push({ id: "CRIT-L107-CHAR-FUNCTION-TYPE", type: "CRITICAL_SEMANTIC_CONTROL", location: "L107", detail: "MID returns STRING and is passed directly to CHAR-only LCASE/UCASE" });
  }

  const splitSignature = /FUNCTION\s+SPLIT\s*\(\s*\w+\s*:\s*STRING\s*,\s*\w+\s*:\s*CHAR\s*\)\s+RETURNS\s+ARRAY\s+OF\s+STRING/i;
  const stringToIntegerSignature = /FUNCTION\s+STRING_TO_INTEGER\s*\(\s*\w+\s*:\s*STRING\s*\)\s+RETURNS\s+INTEGER/i;
  const oneBasedConvention = /(?:first|starting|starts)\s+(?:element\s+)?(?:at|with|is)\s+(?:index\s+)?1|1[- ]based/i;
  if (!suppliedSignature(fixture.l121, "SPLIT", splitSignature, oneBasedConvention)) {
    problems.push({ id: "CRIT-L121-PROVIDED-FUNCTIONS", type: "CRITICAL_SEMANTIC_CONTROL", location: "L121", detail: "SPLIT is used without a complete supplied signature and indexing convention" });
  }
  if (!suppliedSignature(fixture.l121, "STRING_TO_INTEGER", stringToIntegerSignature)) {
    problems.push({ id: "CRIT-L121-PROVIDED-FUNCTIONS", type: "CRITICAL_SEMANTIC_CONTROL", location: "L121", detail: "STRING_TO_INTEGER is used without a complete supplied signature and indexing convention" });
  }

  const isNumericSignature = /FUNCTION\s+IS_NUMERIC\s*\(\s*\w+\s*:\s*STRING\s*\)\s+RETURNS\s+BOOLEAN/i;
  const fieldCountSignature = /FUNCTION\s+FIELD_COUNT\s*\(\s*\w+\s*:\s*ARRAY\s+OF\s+STRING\s*\)\s+RETURNS\s+INTEGER/i;
  if (!suppliedSignature(fixture.l121, "IS_NUMERIC", isNumericSignature)) problems.push({ id: "CRIT-L121-PROVIDED-FUNCTIONS", type: "CRITICAL_SEMANTIC_CONTROL", location: "L121", detail: "IS_NUMERIC is used without a complete supplied signature" });
  if (!suppliedSignature(fixture.l121, "FIELD_COUNT", fieldCountSignature)) problems.push({ id: "CRIT-L121-PROVIDED-FUNCTIONS", type: "CRITICAL_SEMANTIC_CONTROL", location: "L121", detail: "FIELD_COUNT is used without a complete supplied signature" });

  if (/\b(?:LCASE|UCASE)\s*\(\s*(?:MID\s*\(|Text\b|Name\b|FirstName\b|Word\b)/i.test(fixture.l133)) {
    problems.push({ id: "CRIT-L133-CHAR-FUNCTION-TYPE", type: "CRITICAL_SEMANTIC_CONTROL", location: "L133", detail: "CHAR-only LCASE/UCASE is applied to a STRING expression" });
  }
  if (/\b(?:LCASE|UCASE)\s*\(\s*Answer\s*\)/i.test(fixture.l133) && !/DECLARE\s+Answer\s*:\s*CHAR/i.test(fixture.l133)) {
    problems.push({ id: "CRIT-L133-CHAR-FUNCTION-TYPE", type: "CRITICAL_SEMANTIC_CONTROL", location: "L133", detail: "Answer is passed to LCASE/UCASE without an explicit CHAR declaration" });
  }
  const leftSignature = /FUNCTION\s+LEFT\s*\(\s*\w+\s*:\s*STRING\s*,\s*\w+\s*:\s*INTEGER\s*\)\s+RETURNS\s+STRING/i;
  if (!suppliedSignature(fixture.l133, "LEFT", leftSignature, oneBasedConvention)) {
    problems.push({ id: "CRIT-L133-PROVIDED-FUNCTION", type: "CRITICAL_SEMANTIC_CONTROL", location: "L133", detail: "LEFT is used without a complete question-provided signature and position convention" });
  }
  if (/\b(?:LCASE|UCASE)\s*\(\s*"/i.test(fixture.l133)) problems.push({ id: "CRIT-L133-CHAR-LITERAL", type: "CRITICAL_SEMANTIC_CONTROL", location: "L133", detail: "CHAR-only LCASE/UCASE receives a double-quoted STRING literal" });
  const allowedCalls = new Set(["BOOLEAN", "CHAR", "DATE", "EOF", "FIELD_COUNT", "INTEGER", "IS_NUMERIC", "LCASE", "LENGTH", "MID", "REAL", "RIGHT", "SPLIT", "STRING", "STRING_TO_INTEGER", "UCASE"]);
  for (const [lesson, text] of [[107, fixture.l107], [121, fixture.l121], [133, fixture.l133]]) {
    const unexpected = unexpectedUppercaseCalls(text, allowedCalls);
    if (unexpected.length) problems.push({ id: `CRIT-L${lesson}-UNDECLARED-FUNCTION`, type: "CRITICAL_SEMANTIC_CONTROL", location: `L${lesson}`, detail: `unexpected uppercase function calls: ${unexpected.join(", ")}` });
  }
  return problems;
}

export function evaluateRemediationV2SemanticGate(contract = coverageContract) {
  const problems = [];
  for (const requirement of contract.requirements) {
    const evaluation = evaluateRequirement(requirement);
    for (const detail of evaluation.messages) problems.push({ id: requirement.id, type: "REQUIREMENT_COVERAGE", location: requirement.id, detail });
  }
  const missingFirstUse = contract.requirements.filter((requirement) => !requirement.firstTeachingEvidence);
  if (missingFirstUse.length) {
    problems.push({
      id: "GATE-FIRST-USE-EVIDENCE",
      type: "FIRST_USE_SCHEMA",
      location: "scripts/syllabus-coverage-contract.json",
      detail: `${missingFirstUse.length}/${contract.requirements.length} requirements lack an exact CORE firstTeachingEvidence anchor`,
    });
  }
  const sequence = buildCurriculumSequenceModel(contract);
  problems.push(...sequence.problems.map((problem) => ({ ...problem, location: "scripts/syllabus-coverage-contract.json" })));
  problems.push(...evaluateCriticalSemanticControls());
  const auditIntegrity = evaluateAuditIntegrity(contract);
  problems.push(...auditIntegrity.officialSourceProblems.map((problem) => ({ ...problem, type: "OFFICIAL_SOURCE_INTEGRITY" })));
  problems.push(...auditIntegrity.pedagogicalProblems.map((problem) => ({ ...problem, type: "FIRST_TEACHING_INTEGRITY" })));
  return {
    schemaVersion: 1,
    status: problems.length ? "Blocked" : "Ready",
    requirementCount: contract.requirements.length,
    sequence,
    auditIntegrity,
    problems,
  };
}
