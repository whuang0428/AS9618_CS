import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import { monthlyAssessments, quizzes, stageReviews } from "./stage3-assessments-data.mjs";
import { normaliseQuestionPrompt } from "./cie-command-words.mjs";

const root = path.resolve(import.meta.dirname, "..");
const webRoot = path.join(root, "web");

const lessonSection = (lesson) => {
  if (lesson <= 16) return "1";
  if (lesson <= 27) return "2";
  if (lesson <= 41) return "3";
  if (lesson <= 52) return "4";
  if (lesson <= 62) return "5";
  if (lesson <= 72) return "6";
  if (lesson <= 78) return "7";
  if (lesson <= 90) return "8";
  if (lesson <= 98) return "1-8";
  if (lesson <= 113) return "9";
  if (lesson <= 126) return "10";
  if (lesson <= 142) return "11";
  if (lesson <= 147) return "12";
  return "9-12";
};

export const evaluateLessonQuestions = (directory, source) => {
  const declarationStart = source.indexOf("const examQuestions =");
  const declarationEnd = source.indexOf("\n];", declarationStart);
  if (declarationStart < 0 || declarationEnd < 0) {
    throw new Error(`${directory}: examQuestions array could not be parsed`);
  }

  const dataPrefix = source
    .slice(0, declarationEnd + 3)
    .replace("const examQuestions =", "globalThis.examQuestions =");
  const helperStubs = Object.create(null);

  for (let attempt = 0; attempt < 10; attempt += 1) {
    try {
      const sandbox = Object.assign(Object.create(null), helperStubs);
      vm.runInNewContext(dataPrefix, sandbox, { timeout: 1000 });
      return sandbox.examQuestions;
    } catch (error) {
      const missingHelper = error.message.match(/^([A-Za-z_$][\w$]*) is not defined$/)?.[1];
      if (!missingHelper) throw error;
      helperStubs[missingHelper] = () => 0;
    }
  }

  throw new Error(`${directory}: examQuestions dependencies could not be resolved`);
};

export const contentHash = (question) => crypto
  .createHash("sha256")
  .update(JSON.stringify({
    prompt: question.prompt,
    answer: question.answer,
    marks: question.marks,
    points: question.points,
    guidance: question.guidance,
  }))
  .digest("hex");

export function loadLessonQuestions() {
  return fs.readdirSync(webRoot)
    .filter((name) => /^lesson-\d{3}$/.test(name))
    .sort()
    .flatMap((directory) => {
      const lesson = Number(directory.slice(-3));
      const file = path.join(webRoot, directory, "app.js");
      const questions = evaluateLessonQuestions(directory, fs.readFileSync(file, "utf8"));
      return questions.map((question, index) => ({
        id: `L${String(lesson).padStart(3, "0")}-Q${index + 1}`,
        source: "lesson",
        sourceKey: directory,
        lesson,
        section: lessonSection(lesson),
        prompt: normaliseQuestionPrompt(question.prompt),
        answer: question.answer,
        marks: Number.parseInt(question.marks, 10),
        points: question.marking.map(({ mark, text }) => [mark, text]),
        guidance: question.strict,
      }));
    });
}

const assessmentRows = (entries, prefix, type) => entries.flatMap((entry) => entry.questions.map((question, index) => ({
  id: `${prefix}${String(entry.lesson).padStart(3, "0")}-Q${index + 1}`,
  source: "assessment",
  sourceKey: type,
  lesson: entry.lesson,
  section: entry.sections.join(","),
  prompt: normaliseQuestionPrompt(question.prompt),
  answer: question.points.map(([, text]) => text).join("; "),
  marks: question.marks,
  points: question.points,
  guidance: [question.note],
})));

export function loadAssessmentQuestions() {
  return [
    ...assessmentRows(quizzes, "AQ", "quiz"),
    ...assessmentRows(monthlyAssessments, "AM", "monthly"),
    ...assessmentRows(stageReviews, "AR", "review"),
  ];
}

export function loadAllQuestions() {
  return [...loadLessonQuestions(), ...loadAssessmentQuestions()].map((question) => ({
    ...question,
    hash: contentHash(question),
  }));
}

export const dependencyQuestion = (prompt) => /\b(calculate|convert|add|subtract|trace|complete|construct|write|produce|create|draw|decode|determine|derive|find Q|show the working|pseudocode|sql|truth table|boolean expression|binary|hexadecimal|bcd|encode|bubble-sort pass|effective address)\b/i.test(prompt);

export const secondReviewDomain = (question) => {
  const sections = String(question.section).split(/[^0-9]+/).filter(Boolean).map(Number);
  if (question.source === "lesson") {
    if (question.lesson >= 53 && question.lesson <= 62) return "System Software";
    if (question.lesson >= 63 && question.lesson <= 72) return "Security";
    if (question.lesson >= 73 && question.lesson <= 78) return "Ethics";
    if (question.lesson >= 79 && question.lesson <= 90) return "Databases";
  }
  if (sections.includes(5)) return "System Software";
  if (sections.includes(6)) return "Security";
  if (sections.includes(7)) return "Ethics";
  if (sections.includes(8)) return "Databases";
  return "";
};
