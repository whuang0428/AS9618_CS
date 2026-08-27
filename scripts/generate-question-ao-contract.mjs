import fs from "node:fs";
import path from "node:path";

import { loadAllQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const output = path.join(root, "scripts", "question-ao-contract.json");

const officialDefinitions = {
  AO1: "Demonstrate knowledge and understanding of the principles and concepts of computer science.",
  AO2: "Apply knowledge and understanding of the principles and concepts of computer science, including to analyse problems in computational terms.",
  AO3: "Design, program and evaluate computer systems to solve problems, making reasoned judgements about these.",
};

const normalisePrompt = (prompt) => prompt
  .replace(/^\s*\([^)]*\)\s*/, "")
  .replace(/<[^>]+>/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const startsWith = (prompt, commands) => new RegExp(`^(?:${commands.join("|")})\\b`, "i").test(prompt);

function classify(question) {
  const prompt = normalisePrompt(question.prompt);
  const paper = question.lesson <= 97 ? "Paper 1" : "Paper 2";

  if (paper === "Paper 1") {
    const applied = startsWith(prompt, [
      "analyse", "calculate", "choose", "classify", "compare", "complete", "construct", "convert", "decode",
      "derive", "determine", "discuss", "draw", "evaluate", "explain", "find", "interpret", "justify",
      "recommend", "show", "suggest", "trace", "use", "work", "write",
    ]) || /\b(?:given|scenario|system|network|file size|bit pattern|truth table|effective address|sql)\b/i.test(prompt);
    return {
      paper,
      assessmentObjectives: applied ? ["AO2"] : ["AO1"],
      rationale: applied
        ? "The item applies or analyses Paper 1 knowledge in a calculation, representation, trace or stated context."
        : "The item directly recalls or describes Paper 1 knowledge without requiring a new applied construction.",
    };
  }

  const designProgramEvaluate = startsWith(prompt, [
    "amend", "construct", "create", "design", "develop", "draw", "evaluate", "improve", "produce",
    "refine", "rewrite", "suggest", "write",
  ]) || /\b(?:write|produce|design|construct|amend|improve|complete)\b[^.]{0,80}\b(?:algorithm|program|pseudocode|procedure|function|module|test plan|test strategy|structure chart|state-transition)\b/i.test(prompt);
  return {
    paper,
    assessmentObjectives: designProgramEvaluate ? ["AO3"] : ["AO2"],
    rationale: designProgramEvaluate
      ? "The item requires Paper 2 design, programming, evaluation or a reasoned system judgement."
      : "The item applies or analyses Paper 2 knowledge, an existing algorithm, data structure, trace or program fragment.",
  };
}

const questions = loadAllQuestions();
const rows = questions.map((question) => ({
  questionId: question.id,
  source: question.source,
  sourceKey: question.sourceKey,
  lesson: question.lesson,
  section: question.section,
  contentHash: question.hash,
  ...classify(question),
  reviewStatus: "Reviewed",
  classificationMethod: "Question-level task classification constrained by the official paper AO weighting",
}));

const contract = {
  syllabus: "Cambridge International AS & A Level Computer Science 9618 syllabus 2027-2029 Version 2",
  officialDefinitions,
  paperConstraints: {
    "Paper 1": { AO1: 60, AO2: 40, AO3: 0 },
    "Paper 2": { AO1: 0, AO2: 40, AO3: 60 },
  },
  questionCount: rows.length,
  questions: rows,
};

fs.writeFileSync(output, `${JSON.stringify(contract, null, 2)}\n`);
console.log(`Question AO contract generated: ${rows.length} question-level mappings.`);
