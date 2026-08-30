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

function questionText(id) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
}

function acceptedQuestionText(id) {
  const question = questions.get(id);
  expect(Boolean(question), `${id}: assessment question is missing`);
  return question ? [question.prompt, question.answer, ...question.points.flat()].join(". ") : "";
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

const scopedRequirements = Array.from({ length: 10 }, (_, index) => `S3.${String(index + 1).padStart(2, "0")}`);
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
  ["028", ["input is needed", "output is needed", "primary memory", "secondary storage", "removable storage"]],
  ["029", ["embedded system", "dedicated task", "benefit", "drawback", "limited processing"]],
  ["030", ["microphone", "analogue electrical signal", "adc", "capacitive touchscreen", "vr headset", "orientation sensors"]],
  ["031", ["laser printer", "charges a drum", "toner", "3d printer", "speaker", "output buffer", "temporarily", "magnetic platters", "floating-gate cells", "optical drive", "reflected-light", "higher-power laser", "ram is volatile", "rom is non-volatile", "sram", "dram", "prom", "eprom", "eeprom", "ultraviolet", "electrically"]],
  ["032", ["monitoring system", "control system", "sensor", "actuator", "feedback", "temperature", "pressure", "infra-red", "sound sensor"]],
  ["033", ["not, and, or, nand, nor and xor", "not has one input", "two inputs", "problem statement", "logic expression", "logic circuit", "truth table"]],
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
  ["AQ031-Q1", ["primary memory", "removable secondary storage"]],
  ["AQ031-Q2", ["laser printer", "charged drum", "toner", "heat/pressure"]],
  ["AQ031-Q3", ["buffer", "temporarily"]],
  ["AQ031-Q5", ["sram", "dram", "cache", "main memory"]],
  ["AQ036-Q1", ["flash memory", "floating-gate cells", "no moving parts"]],
  ["AQ036-Q3", ["benefit", "drawback", "embedded controller"]],
  ["AQ036-Q4", ["infra-red sensor", "sound sensor"]],
  ["AQ041-Q2", ["truth table", "boolean expression", "gate sequence"]],
  ["AQ041-Q5", ["monitoring", "control"]],
  ["L029-Q5", ["microphone", "capacitive touchscreen", "vr headset"]],
  ["L030-Q1", ["buffer", "temporarily", "different rates"]],
  ["L030-Q2", ["laser printer", "3d printer", "speaker"]],
  ["L031-Q4", ["prom", "eprom", "eeprom", "ultraviolet", "electrically"]],
  ["L032-Q4", ["magnetic hard disk", "flash memory", "optical disc reader/writer"]],
  ["L034-Q4", ["embedded system", "benefit", "drawback"]],
];
for (const [id, terms] of assessmentChecks) includesAll(questionText(id), terms, `${id} Section 3 assessment`);

const forbiddenChecks = [
  ["L030-Q1", /buffer (?:is|provides) permanent|buffer makes the printer faster/i, "buffer misconception"],
  ["L032-Q4", /hard disk[^.]{0,80}laser|flash[^.]{0,80}magnetic/i, "storage-mechanism confusion"],
  ["L031-Q4", /\beprom\b[^.]{0,80}electrically|\beeprom\b[^.]{0,80}ultraviolet/i, "ROM erasure confusion"],
  ["AQ041-Q2", /\bxor\b(?![^.]{0,100}do not accept)/i, "incorrect XOR construction"],
];
for (const [id, pattern, label] of forbiddenChecks) expect(!pattern.test(acceptedQuestionText(id)), `${id}: ${label} remains in accepted assessment semantics`);

const mutations = [
  ["S3.01", /removable storage/gi],
  ["S3.02", /drawback/gi],
  ["S3.03", /3D printer/gi],
  ["S3.04", /temporar(?:y|ily)/gi],
  ["S3.05", /\bRAM\b/gi],
  ["S3.06", /\bSRAM\b/gi],
  ["S3.07", /\bEEPROM\b/gi],
  ["S3.08", /\bmonitoring\b/gi],
  ["S3.09", /infra-red/gi],
  ["S3.10", /problem statement/gi],
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

const assessmentMutation = evaluateRequirement(requirements.get("S3.03"), {
  questionTransform: (question) => ["L029-Q5", "L030-Q2", "L032-Q4", "AQ031-Q2", "AQ036-Q1"].includes(question.id)
    ? {
        ...question,
        prompt: question.prompt.replace(/microphone|touchscreen|VR headset|laser printer|3D printer|speaker|magnetic hard disk|flash memory|optical disc reader\/writer/gi, "device"),
        answer: question.answer.replace(/microphone|touchscreen|VR headset|laser printer|3D printer|speaker|magnetic hard disk|flash memory|optical disc reader\/writer/gi, "device"),
        points: question.points.map(([code, text]) => [code, text.replace(/microphone|touchscreen|VR headset|laser printer|3D printer|speaker|magnetic hard disk|flash memory|optical disc reader\/writer/gi, "device")]),
      }
    : question,
});
expect(assessmentMutation.status === "Partial", "mutation escaped: removing named hardware from assessment evidence must fail S3.03");

const ledger = JSON.parse(read("audits/repair-batch-8-section3-hardware.json"));
expect(ledger.status === "Resolved" && ledger.records.length === 10, "Batch 8 ledger must resolve exactly ten requirement records");
expect(ledger.records.every(({ status, confidence }) => status === "Resolved" && confidence === "High"), "Batch 8 ledger contains an unresolved or low-confidence record");

if (failures.length) {
  console.error(`Batch 8 Section 3 verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 8 verification passed: ten Section 3 requirements are Complete, fifteen direct assessment checks pass and eleven mutations are rejected.");
