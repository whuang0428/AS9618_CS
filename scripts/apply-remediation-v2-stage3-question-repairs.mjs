import fs from "node:fs";
import path from "node:path";

import { stage3QuestionRepairs } from "./remediation-v2-stage3-question-repairs.mjs";

const root = path.resolve(import.meta.dirname, "..");
const renderString = (value) => JSON.stringify(value);
const renderQuestion = (question) => `  {\n    title: ${renderString(question.title)},\n    marks: ${renderString(question.marks)},\n    prompt: ${renderString(question.prompt)},\n    answer: ${renderString(question.answer)},\n    marking: [\n${question.marking.map((item) => `      { mark: ${renderString(item.mark)}, text: ${renderString(item.text)} },`).join("\n")}\n    ],\n    strict: [\n${question.strict.map((item) => `      ${renderString(item)},`).join("\n")}\n    ],\n  },`;

for (const [id, question] of Object.entries(stage3QuestionRepairs)) {
  const match = id.match(/^L(\d{3})-Q(\d+)$/);
  if (!match) throw new Error(`Invalid lesson question ID ${id}`);
  const [, lesson, questionNumber] = match;
  const file = path.join(root, "web", `lesson-${lesson}`, "app.js");
  let source = fs.readFileSync(file, "utf8");
  const pattern = new RegExp(`  \\{\\n    title: ["']Question ${questionNumber}["'],[\\s\\S]*?\\n  \\},(?=\\n  \\{|\\n\\];)`);
  if (!pattern.test(source)) throw new Error(`${id}: question object not found`);
  source = source.replace(pattern, renderQuestion(question));
  fs.writeFileSync(file, source);
}

console.log(`Applied ${Object.keys(stage3QuestionRepairs).length} Stage 3 dependency-safe lesson-question repairs.`);
