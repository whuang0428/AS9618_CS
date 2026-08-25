import fs from "node:fs";
import path from "node:path";

import { explanations } from "./stage10-explanations-data.mjs";
import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const failures = [];
const fail = (message) => failures.push(message);

const lessonMarkdown = fs.readdirSync(path.join(root, "lessons"))
  .filter((name) => name.endsWith(".md"))
  .map((name) => fs.readFileSync(path.join(root, "lessons", name), "utf8"));
const lessonHtml = Array.from({ length: 150 }, (_, index) => fs.readFileSync(
  path.join(root, "web", `lesson-${String(index + 1).padStart(3, "0")}`, "index.html"), "utf8",
));
const learnerCorpus = [...lessonMarkdown, ...lessonHtml].join("\n");

const prohibited = [
  /Describe the purpose of \*\*/,
  /must explicitly use \*\*/i,
  /must include the phrase \*\*/i,
  /uses "therefore"/i,
  /Show the mechanism, not just the label/i,
  /dramatic|paperweight|keyboard heroics|goldfish|mental toolbox|organised chaos|\bvibes\b|revision fog|expensive shrug/i,
  /CIE-style/,
];
for (const pattern of prohibited) if (pattern.test(learnerCorpus)) fail(`Prohibited wording remains: ${pattern}`);

if (lessonMarkdown.length !== 150) fail(`Expected 150 Markdown lessons; found ${lessonMarkdown.length}`);
if (lessonHtml.length !== 150) fail(`Expected 150 lesson webpages; found ${lessonHtml.length}`);
if (explanations.length !== 779) fail(`Expected 779 maintained infographic explanations after retiring three obsolete targets; found ${explanations.length}`);

const questions = loadAllQuestions();
if (questions.length !== 963) fail(`Expected 963 questions; found ${questions.length}`);
const commandWords = /\b(?:analyse|assess|calculate|choose|classify|comment|compare|complete|consider|construct|contrast|convert|correct|create|decode|declare|define|describe|design|determine|discuss|distinguish|draw|encode|evaluate|examine|explain|give|identify|improve|interpret|justify|match|name|outline|produce|recommend|refine|rewrite|select|show|state|suggest|trace|use|write)\b/i;
for (const question of questions) {
  if (!commandWords.test(question.prompt)) fail(`${question.id}: no recognised command word`);
  if (question.points.length !== question.marks) fail(`${question.id}: mark-point count mismatch`);
}

const register = fs.readFileSync(path.join(root, "audits", "cie-wording-review-register.csv"), "utf8");
const expectedRows = 1 + 300 + questions.length + explanations.length;
if (register.trimEnd().split("\n").length !== expectedRows) fail("CIE wording register row count is incorrect");
if (/,(?:Pending),/.test(register)) fail("CIE wording register contains pending records");

const ocrRegister = fs.readFileSync(path.join(root, "audits", "stage10-ocr-wording.csv"), "utf8");
if (ocrRegister.trimEnd().split("\n").length !== 780) fail("Stage 10 OCR wording register row count is incorrect");
if (/,(?:Review needed|OCR failed),/.test(ocrRegister)) fail("Stage 10 OCR wording register contains unresolved records");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`CIE wording verification passed: 150 lesson pairs, ${questions.length} questions and ${explanations.length} infographic records.`);
