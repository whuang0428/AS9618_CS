import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const webRoot = path.join(root, "web");
const lessonDirectories = fs.readdirSync(webRoot)
  .filter((name) => /^lesson-\d{3}$/.test(name))
  .sort();
const failures = [];
const prompts = [];
let questionCount = 0;
let markingPointCount = 0;
let followThroughCount = 0;

const fail = (message) => failures.push(message);

if (lessonDirectories.length !== 150) {
  fail(`Expected 150 lesson directories; found ${lessonDirectories.length}`);
}

for (const directory of lessonDirectories) {
  const file = path.join(webRoot, directory, "app.js");
  if (!fs.existsSync(file)) {
    fail(`${directory}: app.js is missing`);
    continue;
  }

  const source = fs.readFileSync(file, "utf8");
  const declarationStart = source.indexOf("const examQuestions =");
  const declarationEnd = source.indexOf("\n];", declarationStart);
  if (declarationStart < 0 || declarationEnd < 0) {
    fail(`${directory}: examQuestions array could not be parsed`);
    continue;
  }

  let questions;
  const dataPrefix = source
    .slice(0, declarationEnd + 3)
    .replace("const examQuestions =", "globalThis.examQuestions =");
  const helperStubs = Object.create(null);
  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      const sandbox = Object.assign(Object.create(null), helperStubs);
      vm.runInNewContext(dataPrefix, sandbox, { timeout: 1000 });
      questions = sandbox.examQuestions;
      break;
    } catch (error) {
      const missingHelper = error.message.match(/^([A-Za-z_$][\w$]*) is not defined$/)?.[1];
      if (!missingHelper) {
        fail(`${directory}: examQuestions is not a plain data array (${error.message})`);
        break;
      }
      helperStubs[missingHelper] = () => 0;
    }
  }
  if (!questions) {
    if (!failures.some((message) => message.startsWith(`${directory}:`))) {
      fail(`${directory}: examQuestions dependencies could not be resolved`);
    }
    continue;
  }

  if (!Array.isArray(questions) || questions.length < 5) {
    fail(`${directory}: expected at least five exam-style questions`);
    continue;
  }

  for (const [index, question] of questions.entries()) {
    const label = `${directory} Q${index + 1}`;
    const statedMarks = Number.parseInt(question.marks, 10);
    prompts.push(question.prompt);
    questionCount += 1;

    if (!question.prompt || question.prompt.trim().length < 12) fail(`${label}: prompt is too short`);
    if (!Number.isInteger(statedMarks) || statedMarks < 1) fail(`${label}: invalid marks label`);
    if (!Array.isArray(question.marking) || question.marking.length !== statedMarks) {
      fail(`${label}: ${question.marking?.length ?? 0} marking points do not match ${statedMarks} marks`);
    }

    for (const point of question.marking ?? []) {
      markingPointCount += 1;
      if (!/^(B1|M1|A1)$/.test(point.mark)) fail(`${label}: invalid mark code ${point.mark}`);
      if (!point.text || point.text.trim().length < 1) fail(`${label}: empty marking point`);
    }

    if (!Array.isArray(question.strict)) {
      fail(`${label}: strict marking guidance must be an array`);
    } else if (question.strict.some((note) => /\bFT\b|follow through/i.test(note))) {
      followThroughCount += 1;
    }
  }
}

const duplicatePrompts = [...new Set(prompts.filter((prompt, index) => prompts.indexOf(prompt) !== index))];
if (duplicatePrompts.length) fail(`Exam-style prompts must be unique across all lesson pages: ${duplicatePrompts.join(" | ")}`);

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Lesson MS verification passed: ${lessonDirectories.length} lessons, ${questionCount} questions, ${markingPointCount} marking points, ${followThroughCount} questions with explicit FT guidance.`);
