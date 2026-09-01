import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");
const readJson = (relativePath) => JSON.parse(read(relativePath));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }
  assert(!quoted, `Unclosed CSV quote: ${line.slice(0, 80)}`);
  values.push(value);
  return values;
}

function parseLedger(source) {
  const lines = source.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines.shift());
  return lines.map((line) => {
    const values = parseCsvLine(line);
    assert(values.length === headers.length, `Ledger column mismatch: ${line.slice(0, 80)}`);
    return Object.fromEntries(headers.map((header, index) => [header, values[index]]));
  });
}

function stripDetails(html) {
  let previous;
  let visible = html;
  do {
    previous = visible;
    visible = visible.replace(/<details\b[^>]*>[\s\S]*?<\/details>/gi, " ");
  } while (visible !== previous);
  return visible;
}

function plainText(html) {
  return stripDetails(html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replace(/\s+/g, " ")
    .trim();
}

function normalise(value) {
  return String(value ?? "")
    .toLowerCase()
    .replaceAll("’", "'")
    .replace(/[^a-z0-9+#' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function knowledgeSection(html, syllabusId) {
  const marker = `id="knowledge-${syllabusId.toLowerCase().replace(".", "-")}"`;
  const start = html.indexOf(marker);
  if (start < 0) return "";
  const next = html.indexOf('<section class="v2-knowledge-point"', start + marker.length);
  return html.slice(start, next < 0 ? html.length : next);
}

function completeRleTeaching(html) {
  const visible = plainText(knowledgeSection(html, "S1.11"));
  const encoding = /(?:encode|encoding)/i.test(visible)
    && /(?:run|consecutive|repeated)/i.test(visible)
    && /(?:count|pair)/i.test(visible);
  const decoding = /(?:decode|decoding|reconstruct|expand).{0,180}(?:count|repeat|original)/i.test(visible);
  const effectiveRuns = /(?:long runs?|repetition).{0,180}(?:effective|smaller|suitable)/i.test(visible)
    || /(?:effective|smaller|suitable).{0,180}(?:long runs?|repetition)/i.test(visible);
  const ineffectiveRuns = /(?:short runs?|photograph|noise|overhead|larger).{0,180}(?:ineffective|worse|unsuitable|increase)/i.test(visible)
    || /(?:ineffective|worse|unsuitable|increase).{0,180}(?:short runs?|photograph|noise|overhead|larger)/i.test(visible);
  const limitation = effectiveRuns && ineffectiveRuns;
  return /run[- ]length|\bRLE\b/i.test(visible) && encoding && decoding && limitation;
}

function completeCompressionApplications(html) {
  const section = knowledgeSection(html, "S1.11");
  const visible = plainText(section);
  const hasAllTypes = ["text", "bitmap", "vector", "sound"].every((term) => new RegExp(`\\b${term}\\b`, "i").test(visible));
  const textBoundary = /text.{0,180}lossless|lossless.{0,180}text/i.test(visible);
  const bitmapTradeoff = /bitmap.{0,220}(?:lossy|discard|quality)|(?:lossy|discard|quality).{0,220}bitmap/i.test(visible);
  const soundTradeoff = /sound.{0,220}(?:lossy|discard|quality)|(?:lossy|discard|quality).{0,220}sound/i.test(visible);
  const example = section.match(/<article class="v2-example"[\s\S]*?<\/article>/i)?.[0] ?? "";
  return hasAllTypes && textBoundary && bitmapTradeoff && soundTradeoff && !/…|\.\.\./.test(example);
}

function ipSectionIsClean(html) {
  const visible = plainText(knowledgeSection(html, "S2.15"));
  return !/\bURL\b|\bPSTN\b|path or store|web address/i.test(visible);
}

function questionsCover(questionBank, lesson, requiredTerms) {
  const promptText = questionBank.questions
    .filter((question) => question.lesson === lesson)
    .map((question) => question.prompt)
    .join(" ");
  return requiredTerms.every((term) => term.test(promptText));
}

function truncatedWorkedExamples(content) {
  const defects = [];
  for (const lesson of content.lessons) {
    const html = read(`web/lesson-${lesson.id}/index.html`);
    const examples = html.match(/<article class="v2-example"[\s\S]*?<\/article>/gi) ?? [];
    if (examples.some((example) => /…|\.\.\./.test(example))) defects.push(lesson.id);
  }
  return defects;
}

function courseGateDefects(content, questionBank, syllabus) {
  const defects = [];
  const requirementById = new Map(syllabus.requirements.map((requirement) => [requirement.id, requirement]));
  for (const lesson of content.lessons) {
    if (lesson.focus === "integrated-review") {
      if (!lesson.reviewMaterials?.every((lane) => lane.retrievalPrompt && lane.correctionPrompt && lane.transferPrompt)) defects.push(`L${lesson.id}: review lanes lack retrieval, correction or transfer prompts`);
      continue;
    }
    const html = read(`web/lesson-${lesson.id}/index.html`);
    for (const point of lesson.knowledgePoints ?? []) {
      const key = `L${lesson.id}:${point.id}`;
      const requirement = requirementById.get(point.id);
      if (!requirement || point.atomicObjectives?.length !== requirement.requiredGroups.length) defects.push(`${key}: atomic-objective mapping is incomplete`);
      if (!point.explanations?.length || !point.mechanismSteps?.length || !point.workedExamples?.length) defects.push(`${key}: structured teaching unit is incomplete`);
      const syllabusRestatements = new Set([normalise(requirement?.requirement), normalise(requirement?.notes)]);
      if (point.explanations?.some((explanation) => syllabusRestatements.has(normalise(explanation)))) defects.push(`${key}: a core explanation only restates the syllabus requirement`);
      if (!point.workedExamples?.every((example) => example.steps?.length >= 2) || /…|\.\.\./.test(JSON.stringify(point.workedExamples ?? []))) defects.push(`${key}: worked example is incomplete or truncated`);
      if (!point.misconceptions?.length) defects.push(`${key}: misconception correction is missing`);
      if (!point.masteryCheck?.id || point.masteryCheck.objectiveIds?.length !== point.atomicObjectives?.length || !point.questionIds?.includes(point.masteryCheck.id)) defects.push(`${key}: mastery question is not mapped to every atomic objective`);
      const authoredTeaching = normalise([
        ...(point.explanations ?? []),
        ...(point.mechanismSteps ?? []).flatMap((step) => [step.title, step.detail]),
        ...(point.workedExamples ?? []).flatMap((example) => [example.title, ...example.steps.flatMap((step) => [step.label, step.text])]),
      ].join(" "));
      for (const objective of point.atomicObjectives ?? []) {
        if (!(objective.terms ?? []).some((term) => authoredTeaching.includes(normalise(term)))) defects.push(`${key}: ${objective.id} has no explicit authored explanation, mechanism or example evidence`);
      }
      const visible = plainText(knowledgeSection(html, point.id));
      if (!point.explanations?.every((explanation) => visible.includes(explanation))) defects.push(`${key}: core explanation is not default-visible in rendered HTML`);
      if (!/Atomic learning targets|Core explanation|Mastery check/.test(visible)) defects.push(`${key}: rendered teaching loop is missing a required visible stage`);
    }
  }
  const lesson006 = read("web/lesson-006/index.html");
  const lesson012 = read("web/lesson-012/index.html");
  if (!completeRleTeaching(lesson006)) defects.push("L006: RLE lacks a complete default-visible encode/decode method and suitability boundary");
  if (!completeCompressionApplications(lesson006)) defects.push("L006: text/bitmap/vector/sound compression choices and quality trade-offs are incomplete or truncated");
  if (!ipSectionIsClean(lesson012)) defects.push("L012 S2.15: IP-address teaching is contaminated by URL/PSTN content");
  if (!questionsCover(questionBank, 44, [/\bINSERT\b/i, /\bDELETE\b/i, /\bUPDATE\b/i])) defects.push("L044 S8.11: question prompts do not cover INSERT, DELETE and UPDATE");
  if (!questionsCover(questionBank, 80, [/\bFUNCTION\b/i, /\bRETURN(?:S|ED|ING)?\b/i, /\bEXPRESSION\b/i])) defects.push("L080 S11.07: question prompts do not use a function return value in an expression");
  const truncated = truncatedWorkedExamples(content);
  if (truncated.length) defects.push(`Worked examples contain visible truncation: ${truncated.join(", ")}`);
  return defects;
}

function runSelfTests() {
  const wrap = (id, body) => `<section class="v2-knowledge-point" id="knowledge-${id}">${body}</section>`;
  const completeRle = wrap("s1-11", "RLE encoding: find each consecutive repeated run, count it and output a symbol-count pair. Decoding expands each pair by repeating the symbol count times to reconstruct the original. It is effective and smaller for long runs of repetition, but short runs or photograph noise add overhead and may increase the file size.");
  assert(completeRleTeaching(completeRle), "Self-test fixture should accept complete RLE teaching");
  assert(!completeRleTeaching(wrap("s1-11", "RLE is a lossless method.")), "Self-test must reject definition-only RLE");

  const cleanIp = wrap("s2-15", "An IP address identifies a device interface. IPv4 uses 32 bits and IPv6 uses 128 bits; static addresses stay assigned while dynamic addresses can change.");
  assert(ipSectionIsClean(cleanIp), "Self-test fixture should accept clean IP teaching");
  assert(!ipSectionIsClean(wrap("s2-15", "An IPv6 address is 128-bit. PSTN provides a dedicated line and a URL stores a path.")), "Self-test must reject IP/URL/PSTN contamination");

  const fixtureBank = { questions: [{ lesson: 44, prompt: "Write INSERT, DELETE and UPDATE statements." }, { lesson: 80, prompt: "Define a FUNCTION that RETURNs a value and use it in an EXPRESSION." }] };
  assert(questionsCover(fixtureBank, 44, [/\bINSERT\b/i, /\bDELETE\b/i, /\bUPDATE\b/i]), "Self-test fixture should accept complete DML practice");
  assert(!questionsCover(fixtureBank, 44, [/\bINSERT\b/i, /\bSELECT\b/i]), "Self-test must reject a missing DML operation");
  assert(questionsCover(fixtureBank, 80, [/\bFUNCTION\b/i, /\bRETURN(?:S|ED|ING)?\b/i, /\bEXPRESSION\b/i]), "Self-test fixture should accept function-return practice");
  assert(!questionsCover({ questions: [{ lesson: 80, prompt: "Write a procedure." }] }, 80, [/\bFUNCTION\b/i, /\bRETURN\b/i]), "Self-test must reject procedure-only practice");
}

const content = readJson("scripts/course-v2-content.json");
const questionBank = readJson("scripts/question-bank-contract.json");
const syllabus = readJson("scripts/syllabus-coverage-contract.json");
const report = read("audits/course-v2-teaching-depth-audit.md");
const ledger = parseLedger(read("audits/course-v2-teaching-depth-ledger.csv"));
const requiredColumns = ["lesson", "section", "syllabus_id", "severity", "confidence", "atomic_objectives", "visible_evidence", "hidden_evidence", "worked_example", "practice_coverage", "rendered_risk", "finding", "remediation"];

assert(content.lessons.length === 90, "Course contract must contain 90 lessons");
assert(ledger.length === 144, `Ledger must contain 144 conclusions, found ${ledger.length}`);
assert(ledger.filter((row) => row.syllabus_id === "REVIEW").length === 2, "Ledger must contain the two integrated-review lessons");
assert(ledger.filter((row) => row.syllabus_id !== "REVIEW").length === 142, "Ledger must contain 142 teaching knowledge-point instances");

const expectedKeys = new Set();
for (const lesson of content.lessons) {
  if (lesson.focus === "integrated-review") expectedKeys.add(`${lesson.id}:REVIEW`);
  else for (const point of lesson.knowledgePoints) expectedKeys.add(`${lesson.id}:${point.id}`);
}
const actualKeys = new Set();
for (const row of ledger) {
  const key = `${row.lesson}:${row.syllabus_id}`;
  assert(!actualKeys.has(key), `Duplicate ledger conclusion: ${key}`);
  actualKeys.add(key);
  assert(expectedKeys.has(key), `Unexpected ledger conclusion: ${key}`);
  assert(requiredColumns.every((column) => row[column]?.trim()), `Ledger conclusion ${key} has an empty required field`);
  assert(["P0", "P1", "P2", "Pass"].includes(row.severity), `Invalid severity for ${key}: ${row.severity}`);
  assert(["high", "medium", "low"].includes(row.confidence), `Invalid confidence for ${key}: ${row.confidence}`);
}
for (const key of expectedKeys) assert(actualKeys.has(key), `Unreviewed course item: ${key}`);

const counts = Object.fromEntries(["P0", "P1", "P2", "Pass"].map((severity) => [severity, ledger.filter((row) => row.severity === severity).length]));
assert(JSON.stringify(counts) === JSON.stringify({ P0: 11, P1: 66, P2: 65, Pass: 2 }), `Unexpected severity totals: ${JSON.stringify(counts)}`);
for (const key of ["006:S1.11", "011:S2.14", "012:S2.15", "012:S2.16", "014:S3.03", "018:S3.10", "024:S4.13", "044:S8.11", "060:S10.06", "061:S10.06", "080:S11.07"]) {
  assert(ledger.find((row) => `${row.lesson}:${row.syllabus_id}` === key)?.severity === "P0", `Known blocker is not P0: ${key}`);
}
for (const lesson of content.lessons) assert(new RegExp(`^\\| ${lesson.id} \\|`, "m").test(report), `Human-readable report is missing Lesson ${lesson.id}`);
assert(!/\bunreviewed\b/i.test(`${report}\n${JSON.stringify(ledger)}`), "Audit artifacts must not contain unreviewed items");
const severityRank = { Pass: 0, P2: 1, P1: 2, P0: 3 };
const lessonResults = new Map();
for (const row of ledger) {
  const current = lessonResults.get(row.lesson);
  if (!current || severityRank[row.severity] > severityRank[current]) lessonResults.set(row.lesson, row.severity);
}
const lessonCounts = Object.fromEntries(["P0", "P1", "P2", "Pass"].map((severity) => [severity, [...lessonResults.values()].filter((value) => value === severity).length]));
assert(JSON.stringify(lessonCounts) === JSON.stringify({ P0: 10, P1: 48, P2: 32, Pass: 0 }), `Unexpected lesson-level totals: ${JSON.stringify(lessonCounts)}`);

runSelfTests();

if (process.argv.includes("--course-gate")) {
  const defects = courseGateDefects(content, questionBank, syllabus);
  if (defects.length) {
    console.error(JSON.stringify({ status: "FAIL", defects }, null, 2));
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify({ status: "PASS", courseTeachingDepthGate: true }, null, 2));
  }
} else {
  console.log(JSON.stringify({ status: "PASS", ledgerRows: ledger.length, teachingInstances: 142, reviewLessons: 2, severity: counts, lessonSeverity: lessonCounts, selfTests: "PASS", courseGateRun: false }, null, 2));
}
