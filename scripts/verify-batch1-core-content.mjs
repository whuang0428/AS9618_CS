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

const compressionMd = read("lessons/012-compression-lossless-vs-lossy.md");
const compressionHtml = read("web/lesson-012/index.html");
const compressionTerms = ["text", "bitmap", "vector", "sound", "run-length encoding", "dictionary", "adjacent pixels", "perceptual", "lossless", "lossy"];
includesAll(compressionMd, compressionTerms, "L012 Markdown");
includesAll(stage2Core(compressionHtml), compressionTerms, "L012 CORE HTML");
includesAll(questionText("L012-Q5"), ["text", "bitmap", "vector", "sound", "RLE", "dictionary", "perceptual"], "L012-Q5");

const cycleMd = read("lessons/043-registers-pc-cir-mar-mdr-acc-and-status-register.md");
const cycleHtml = read("web/lesson-043/index.html");
const transfers = ["MAR <- PC", "MDR <- Memory[MAR]", "CIR <- MDR", "PC <- PC + 1", "ACC <- ACC + MDR"];
includesAll(cycleMd, transfers, "L043 Markdown");
includesAll(stage2Core(cycleHtml), transfers, "L043 CORE HTML");
includesAll(questionText("AQ045-Q2"), ["MAR <- PC", "CIR <- MDR"], "AQ045-Q2");

const assemblyMd = read("lessons/046-assembly-language-basics-and-mnemonics.md");
const assemblyHtml = read("web/lesson-046/index.html");
const assemblyCore = stage2Core(assemblyHtml);
const instructionGroups = ["data movement", "input/output", "arithmetic", "unconditional branch", "conditional branch", "compare"];
const opcodes = ["LDM", "LDD", "LDI", "LDX", "LDR", "MOV", "STO", "ADD", "SUB", "INC", "DEC", "JMP", "CMP", "CMI", "JPE", "JPN", "IN", "OUT", "END"];
includesAll(assemblyMd, [...instructionGroups, ...opcodes], "L046 Markdown");
includesAll(assemblyCore, [...instructionGroups, ...opcodes], "L046 CORE HTML");
includesAll(questionText("L046-Q1"), instructionGroups, "L046-Q1");
includesAll(questionText("L046-Q2"), ["LDM", "LDD", "LDI", "LDX", "LDR", "MOV", "STO"], "L046-Q2");
includesAll(questionText("L046-Q4"), ["CMP", "CMI", "JPE", "JPN", "IN", "OUT", "END"], "L046-Q4");

const semanticCheckpoint = questionText("AR051-Q1");
includesAll(semanticCheckpoint, ["LDR loads immediate n into IX", "CMI compares ACC", "indirect addressing", "JPE jumps after a comparison produces True", "JPN jumps after a comparison produces False"], "AR051-Q1");
const semanticSources = [assemblyMd, read("lessons/047-addressing-modes-and-operand-interpretation.md"), read("lessons/051-section-4-review-tracing-processor-behaviour.md"), semanticCheckpoint].join("\n");
for (const [label, pattern] of [
  ["relative LDR", /\bLDR\s+(?:is|means|uses)\s+relative\b/i],
  ["immediate CMI", /\bCMI\s+(?:is|means|uses)\s+immediate\b/i],
  ["equal JPE", /\bJPE\s+(?:is|means)\s+(?:equal|zero)\b/i],
  ["negative JPN", /\bJPN\s+(?:is|means)\s+negative\b/i],
]) check(!pattern.test(semanticSources), `forbidden old assembly meaning remains: ${label}`);

const bitMd = lessonMarkdown(50);
const bitHtml = read("web/lesson-050/index.html");
includesAll(bitMd, ["AND mask", "OR mask", "XOR mask", "LSL #n", "LSR #n", "logical", "arithmetic", "cyclic", "monitoring", "control"], "L050 Markdown");
includesAll(bitHtml, ["LSL #n", "LSR #n", "AND mask", "OR mask", "XOR mask", "logical", "arithmetic", "cyclic"], "L050 HTML");
for (const id of ["tool", "examples", "practice", "debug", "exam"]) check(/data-delivery-role="CORE"/.test(sectionTag(bitHtml, id)), `L050 #${id} is not CORE`);
for (const id of ["pipeline-extension", "concept", "compare", "timing", "hazards", "stalls"]) check(/data-delivery-role="OPTIONAL"/.test(sectionTag(bitHtml, id)), `L050 #${id} is not OPTIONAL`);
for (let index = 1; index <= 5; index += 1) {
  const text = questionText(`L050-Q${index}`);
  check(!/pipeline|throughput|latency|hazard|stall|flush/i.test(text), `L050-Q${index} still assesses pipelining`);
}
includesAll(questionText("L050-Q1"), ["LSL #n", "LSR #n", "ACC", "zeros"], "L050-Q1");
includesAll(questionText("L050-Q3"), ["monitor", "AND mask", "status", "sensor"], "L050-Q3");
includesAll(questionText("AQ050-Q4"), ["arithmetic right shift", "cyclic right shift"], "AQ050-Q4");
includesAll(questionText("AQ050-Q5"), ["OR", "mask", "set"], "AQ050-Q5");

if (failures.length) {
  console.error(`Batch 1 core-content verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Batch 1 core-content verification passed: S1.11, S4.07, S4.12, S4.13 and S4.15 teaching/assessment assertions are satisfied.");
