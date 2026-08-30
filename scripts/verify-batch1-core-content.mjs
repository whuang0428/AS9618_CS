import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const questions = new Map(loadAllQuestions().map((question) => [question.id, question]));

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function lessonMarkdown(lesson) {
  const prefix = `${String(lesson).padStart(3, "0")}-`;
  const matches = fs.readdirSync(path.join(root, "lessons")).filter((name) => name.startsWith(prefix) && name.endsWith(".md"));
  if (matches.length !== 1) throw new Error(`Lesson ${lesson}: expected one current Markdown file, found ${matches.length}`);
  return read(`lessons/${matches[0]}`);
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function includesAll(text, terms, label) {
  const source = text.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&").toLowerCase();
  for (const term of terms) check(source.includes(term.toLowerCase()), `${label}: missing ${term}`);
}

function questionText(id) {
  const question = questions.get(id);
  check(Boolean(question), `missing assessment question ${id}`);
  return question ? [question.prompt, question.answer, ...question.points.flat(), ...question.guidance].join(" ") : "";
}

function stage2Core(html) {
  return html.match(/<!-- stage2-completion:start -->([\s\S]*?)<section class="panel stage2-practice-block"/)?.[1] ?? "";
}

function sectionTag(html, id) {
  return html.match(new RegExp(`<section\\b[^>]*\\bid="${id}"[^>]*>`, "i"))?.[0] ?? "";
}

const compressionMd = lessonMarkdown(13);
const compressionHtml = read("web/lesson-013/index.html");
const compressionTerms = ["text", "bitmap", "vector", "sound", "run-length encoding", "dictionary", "adjacent pixels", "perceptual", "lossless", "lossy"];
includesAll(compressionMd, compressionTerms, "L013 Markdown");
includesAll(stage2Core(compressionHtml), compressionTerms, "L013 CORE HTML");
includesAll(questionText("L013-Q5"), ["text", "bitmap", "vector", "sound", "RLE", "dictionary", "perceptual"], "L013-Q5");

const cycleMd = lessonMarkdown(44);
const cycleHtml = read("web/lesson-044/index.html");
const transfers = ["MAR <- PC", "MDR <- Memory[MAR]", "CIR <- MDR", "PC <- PC + 1", "ACC <- ACC + MDR"];
includesAll(cycleMd, transfers, "L044 Markdown");
includesAll(stage2Core(cycleHtml), transfers, "L044 CORE HTML");
includesAll(questionText("AQ046-Q2"), ["MAR <- PC", "CIR <- MDR"], "AQ046-Q2");

const assemblyMd = lessonMarkdown(47);
const assemblyHtml = read("web/lesson-047/index.html");
const assemblyCore = stage2Core(assemblyHtml);
const instructionGroups = ["data movement", "input/output", "arithmetic", "unconditional branch", "conditional branch", "compare"];
const opcodes = ["LDM", "LDD", "LDI", "LDX", "LDR", "MOV", "STO", "ADD", "SUB", "INC", "DEC", "JMP", "CMP", "CMI", "JPE", "JPN", "IN", "OUT", "END"];
includesAll(assemblyMd, [...instructionGroups, ...opcodes], "L047 Markdown");
includesAll(assemblyCore, [...instructionGroups, ...opcodes], "L047 CORE HTML");
includesAll(questionText("L047-Q1"), instructionGroups, "L047-Q1");
includesAll(questionText("L047-Q2"), ["LDM", "LDD", "LDI", "LDX", "LDR", "MOV", "STO"], "L047-Q2");
includesAll(questionText("L047-Q4"), ["CMP", "CMI", "JPE", "JPN", "IN", "OUT", "END"], "L047-Q4");

const semanticCheckpoint = questionText("AR052-Q1");
includesAll(semanticCheckpoint, ["LDR loads immediate n into IX", "CMI compares ACC", "indirect addressing", "JPE jumps after a comparison produces True", "JPN jumps after a comparison produces False"], "AR052-Q1");
const semanticSources = [assemblyMd, lessonMarkdown(48), lessonMarkdown(52), semanticCheckpoint].join("\n");
for (const [label, pattern] of [
  ["relative LDR", /\bLDR\s+(?:is|means|uses)\s+relative\b/i],
  ["immediate CMI", /\bCMI\s+(?:is|means|uses)\s+immediate\b/i],
  ["equal JPE", /\bJPE\s+(?:is|means)\s+(?:equal|zero)\b/i],
  ["negative JPN", /\bJPN\s+(?:is|means)\s+negative\b/i],
]) check(!pattern.test(semanticSources), `forbidden old assembly meaning remains: ${label}`);

const bitMd = lessonMarkdown(51);
const bitHtml = read("web/lesson-051/index.html");
includesAll(bitMd, ["AND mask", "OR mask", "XOR mask", "LSL #n", "LSR #n", "logical", "arithmetic", "cyclic", "monitoring", "control"], "L051 Markdown");
includesAll(bitHtml, ["LSL #n", "LSR #n", "AND mask", "OR mask", "XOR mask", "logical", "arithmetic", "cyclic"], "L051 HTML");
for (const id of ["overview", "masks", "shifts", "device-bits", "core-practice", "tool", "examples", "practice", "debug", "exam"]) check(/data-delivery-role="CORE"/.test(sectionTag(bitHtml, id)), `L051 #${id} is not CORE`);
for (const id of ["pipeline-extension", "concept", "compare", "timing", "hazards", "stalls"]) check(/data-delivery-role="OPTIONAL"/.test(sectionTag(bitHtml, id)), `L051 #${id} is not OPTIONAL`);
for (let index = 1; index <= 5; index += 1) {
  const text = questionText(`L051-Q${index}`);
  check(!/pipeline|throughput|latency|hazard|stall|flush/i.test(text), `L051-Q${index} still assesses pipelining`);
}
includesAll(questionText("L051-Q1"), ["LSL #n", "LSR #n", "ACC", "zeros"], "L051-Q1");
includesAll(questionText("L051-Q3"), ["monitor", "AND mask", "status", "sensor"], "L051-Q3");
includesAll(questionText("AQ051-Q4"), ["arithmetic right shift", "cyclic right shift"], "AQ051-Q4");
includesAll(questionText("AQ051-Q5"), ["OR", "mask", "set"], "AQ051-Q5");

if (failures.length) {
  console.error(`Batch 1 core-content verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 1 core-content verification passed: S1.11, S4.07, S4.12, S4.13 and S4.15 teaching/assessment assertions are satisfied.");
