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

const scopedRequirements = Array.from({ length: 6 }, (_, index) => `S7.${String(index + 1).padStart(2, "0")}`);
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
  ["073", ["professional ethics", "purpose", "joining", "British Computer Society", "BCS", "Institute of Electrical and Electronics Engineers", "IEEE", "ethical", "unethical", "impact"]],
  ["075", ["copyright legislation", "needed", "software", "Free Software Foundation", "FSF", "Open Source Initiative", "OSI", "licence"]],
  ["076", ["shareware", "commercial", "licence", "scenario"]],
  ["077", ["AI applications", "social impacts", "economic impacts", "environmental impacts", "Evaluation"]],
  ["078", ["professional ethics", "British Computer Society", "IEEE", "copyright legislation", "Free Software Foundation", "OSI", "shareware", "commercial software", "Artificial intelligence", "social, economic and environmental impacts"]],
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
  ["AQ076-Q1", ["professional", "code of conduct", "public interest"]],
  ["AR078-Q1", ["professional codes of conduct", "public interest"]],
  ["L073-Q5", ["ethical implications", "stakeholder", "impact"]],
  ["AR078-Q2", ["AI", "facial recognition", "privacy", "bias", "recommendation"]],
  ["L075-Q3", ["copyright", "licence", "software"]],
  ["AQ076-Q4", ["FSF", "OSI", "licences"]],
  ["AQ076-Q5", ["shareware", "commercial"]],
  ["AM081-Q5", ["licence", "copyright", "recommends"]],
  ["L077-Q5", ["AI application", "social", "economic", "environmental", "judges whether"]],
  ["AQ081-Q1", ["AI", "social"]],
  ["AQ081-Q2", ["AI", "environmental"]],
  ["AM081-Q3", ["AI", "ethical", "consequence", "control"]],
  ["L078-Q5", ["AI", "facial recognition", "biometric templates", "privacy", "bias"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 7 assessment`);

const acceptedAssessment = assessmentChecks.map(([id]) => questionText(id, false)).join("\n");
for (const [label, pattern] of [
  ["copyright protects every idea", /copyright.{0,60}protects? (?:every|all) ideas?/is],
  ["open source has no copyright", /open[- ]source.{0,80}(?:has|means).{0,20}no copyright/is],
  ["open source is public domain", /open[- ]source.{0,80}(?:is|means).{0,20}public domain/is],
  ["paid software transfers copyright", /(?:paying|paid|purchase).{0,80}(?:transfers?|owns?).{0,30}copyright/is],
  ["AI is automatically ethical", /AI.{0,80}automatically ethical/is],
  ["AI is unbiased", /AI.{0,60}(?:is|always).{0,20}unbiased/is],
]) expect(!pattern.test(acceptedAssessment), `accepted assessment semantics still contain ${label}`);

for (const [file, label] of [
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-073-ethics.jpg", "L073 ethics visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-073-stakeholders.jpg", "L073 stakeholder visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-075-copyright.jpg", "L075 copyright visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-075-licensing.jpg", "L075 licensing visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-076-tradeoffs.jpg", "L076 licence trade-off visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-077-environment.jpg", "L077 environmental visual"],
  ["web/assets/diagrams/stage10-infographics/stage10-lesson-077-social.jpg", "L077 social visual"],
]) {
  const dimensions = jpegDimensions(file);
  expect(dimensions?.width === 1536 && dimensions?.height === 1024, `${label}: expected 1536x1024 JPEG`);
}

const mutations = [
  ["S7.01", /purpose/gi],
  ["S7.02", /joining/gi],
  ["S7.03", /unethical/gi],
  ["S7.04", /legislation/gi],
  ["S7.05", /shareware/gi],
  ["S7.06", /economic/gi],
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
  ["S7.05", ["AQ076-Q4", "AQ076-Q5", "L076-Q1", "AM081-Q5"], /licen[cs]e|FSF|OSI|shareware|commercial|open-source|proprietary/gi, "licence assessment"],
  ["S7.06", ["L077-Q5", "AQ081-Q1", "AQ081-Q2", "AM081-Q3"], /AI|social|economic|environmental/gi, "AI impact assessment"],
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

const ledger = JSON.parse(read("audits/repair-batch-12-section7-ethics-ownership.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 8, "Batch 12 ledger must resolve six requirements, the L077-Q5 assessment defect and the L078 review gap");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 12 ledger contains an unresolved or non-high-confidence record");

if (failures.length) {
  console.error(`Batch 12 Section 7 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 12 verification passed: six Section 7 requirements are Complete, thirteen assessment checks and seven visual assets pass, and eight mutations are rejected.");
