import fs from "node:fs";
import path from "node:path";

import { dependencyQuestion, evaluateLessonQuestions } from "./ms-review-utils.mjs";

const root = path.resolve(import.meta.dirname, "..");
const webRoot = path.join(root, "web");
const directories = fs.readdirSync(webRoot).filter((name) => /^lesson-\d{3}$/.test(name)).sort();
let changedFiles = 0;
let theoryCodesChanged = 0;
let invalidFtRemoved = 0;
let consistencyNotesRewritten = 0;

const answerReplacements = new Map(Object.entries({
  "L001-Q1": "16 KiB = 16 x 1024 = 16 384 bytes. 16 384 x 8 = 131 072 bits.",
  "L001-Q3": "2400 x 2 MiB = 4800 MiB. 4800 / 1024 = 4.6875 GiB, approximately 4.69 GiB.",
  "L002-Q1": "Using 128, 64, 32, 16, 8, 4, 2, 1: 10110110₂ = 128 + 32 + 16 + 4 + 2 = 182₁₀.",
  "L002-Q2": "77 = 64 + 8 + 4 + 1, so the 64, 8, 4 and 1 columns are 1. In eight bits the result is 01001101₂.",
  "L002-Q3": "For an unsigned 8-bit value, the minimum is 00000000₂ = 0 and the maximum is 11111111₂ = 255, so the range is 0 to 255.",
  "L003-Q1": "Group from the right: 1101 0110. 1101₂ = D₁₆ and 0110₂ = 6₁₆, so the result is D6₁₆.",
  "L003-Q2": "Convert each hexadecimal digit to four bits: A₁₆ = 1010₂ and 7₁₆ = 0111₂. Therefore A7₁₆ = 1010 0111₂.",
  "L003-Q3": "Group from the right and pad the left group: 101101₂ -> 0010 1101₂. 0010₂ = 2₁₆ and 1101₂ = D₁₆, so the result is 2D₁₆.",
  "L004-Q1": "Align all eight bits and add with carries: 00110101₂ + 00010110₂ = 01001011₂. The denary check is 53 + 22 = 75.",
  "L004-Q2": "11110000₂ + 00010000₂ = 1 00000000₂. The stored 8-bit result is 00000000₂ with carry-out 1, so unsigned overflow occurs.",
  "L004-Q4": "11001010₂ + 01110101₂ = 1 00111111₂. The stored 8-bit result is 00111111₂ with carry-out 1, so unsigned overflow occurs.",
  "L005-Q1": "+23 = 00010111₂. Invert all bits to obtain 11101000₂, then add 1: 11101001₂. Therefore -23 is 11101001₂ in 8-bit two's complement.",
  "L005-Q2": "The leading bit is 1, so the value is negative. Invert 11101001₂ to 00010110₂ and add 1 to obtain 00010111₂ = 23. Therefore the value is -23.",
  "L005-Q3": "An 8-bit two's-complement value has range -2^7 to 2^7 - 1, which is -128 to +127.",
  "L006-Q1": "10.101₂ = 2 + 1/2 + 1/8 = 2 + 0.5 + 0.125 = 2.625₁₀.",
  "L006-Q2": "0.625 = 1/2 + 1/8. The 1/2 and 1/8 columns are 1 and the 1/4 column is 0, so the result is 0.101₂.",
  "L008-Q1": "100 x 80 = 8000 pixels. 8000 x 8 = 64 000 bits. 64 000 / 8 = 8000 bytes.",
  "L008-Q5": "320 x 240 = 76 800 pixels. 76 800 x 4 = 307 200 bits.",
  "L009-Q1": "100 x 80 = 8000 pixels. 8000 x 8 = 64 000 bits. 64 000 / 8 = 8000 bytes.",
  "L009-Q2": "Use the 8000-byte pixel data from Question 1 and add the 512-byte metadata: 8000 + 512 = 8512 bytes.",
  "L009-Q5": "128 x 128 x 8 = 131 072 bits. 131 072 / 8 = 16 384 bytes of pixel data. Add 1024 bytes of metadata to obtain 17 408 bytes. 17 408 / 1024 = 17 KiB.",
  "L010-Q1": "8000 x 16 x 10 x 1 = 1 280 000 bits. 1 280 000 / 8 = 160 000 bytes.",
  "L010-Q4": "4000 x 8 x 5 x 1 = 160 000 bits. 160 000 / 8 = 20 000 bytes.",
  "L011-Q1": "8000 x 16 x 10 x 2 = 2 560 000 bits. 2 560 000 / 8 = 320 000 bytes.",
  "L011-Q2": "1 KiB = 1024 bytes, so 160 000 / 1024 = 156.25 KiB.",
  "L011-Q4": "44 100 x 16 x 60 x 2 = 84 672 000 bits. Divide by 8 to obtain 10 584 000 bytes, then divide by 1 048 576 to obtain approximately 10.09 MiB.",
  "L012-Q3": "The compression ratio is 2400:600 = 4:1. The amount saved is 2400 - 600 = 1800 KB, so the percentage saved is 1800 / 2400 x 100 = 75%.",
  "L013-Q1": "The data contains runs of six A characters, four B characters and eight C characters. Using count-symbol pairs gives 6A4B8C.",
  "L013-Q2": "Expand each count-symbol pair: 3A -> AAA, 2B -> BB and 1C -> C. The decoded data is AAABBC.",
  "L001-Q4": "MB uses decimal powers of 1000, while MiB uses binary powers of 1024. The same byte count is therefore expressed using different numerical scales, so the operating system's number in MiB is lower even though no data has disappeared.",
  "L002-Q4": "Both values equal 10 because leading zeros contribute no value: the active columns are 8 and 2 in each representation. However, 00001010₂ explicitly uses eight bit positions, whereas 1010₂ uses four.",
  "L005-Q5": "Two's complement has one representation of zero, 00000000₂. In 8-bit two's complement, 10000000₂ represents -128. A separate negative-zero representation occurs in sign-and-magnitude or one's-complement systems, not in two's complement.",
}));

const ftGuidanceById = new Map(Object.entries({
  "L001-Q1": "Allow FT from the candidate's earlier byte total only when that total is subsequently multiplied by 8 to obtain bits.",
  "L001-Q3": "Allow FT from the candidate's earlier total in MiB only when it is subsequently divided by 1024 to obtain GiB.",
  "L008-Q1": "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
  "L008-Q5": "Allow FT from the candidate's earlier pixel total only when it is subsequently multiplied by the 4-bit colour depth.",
  "L009-Q1": "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
  "L009-Q2": "Allow FT from the candidate's answer to Question 1 only when 512 bytes of metadata is subsequently added.",
  "L009-Q5": "Allow FT from the candidate's earlier pixel-data total only when metadata is added and the resulting bytes are subsequently converted to KiB.",
  "L010-Q4": "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
  "L011-Q4": "Allow FT from the candidate's earlier byte total only when it is subsequently divided by 1 048 576 to obtain MiB.",
  "L012-Q3": "Allow FT for the percentage saved from the candidate's earlier compressed-size value only when the percentage method is otherwise correct.",
  "L015-Q1": "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
  "L090-Q1": "Allow FT from the candidate's earlier bit total only when the subsequent conversions to bytes and KiB are correct.",
  "L094-Q1": "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
  "L095-Q1": "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
}));

const removeFtIds = new Set(["L015-Q2", "L116-Q4", "L135-Q5"]);

const genuineFtQuestion = (prompt) => /\b(calculate|trace|truth table|find Q|using your answer|question 1|compression ratio|percentage saved)\b/i.test(prompt);
const genuineFtNote = (note) => /\b(value|total|result|output|row|column|intermediate|percentage|byte|bit|pixel|arithmetic|calculation)\b/i.test(note);

const normaliseCodeReferences = (note, marking) => {
  const codes = new Set(marking.map((point) => point.mark));
  let updated = note;
  if (!codes.has("A1")) updated = updated.replace(/final A1/gi, "final answer mark").replace(/\bA1\b/g, "answer mark");
  if (!codes.has("M1")) updated = updated.replace(/\bM1\b/g, "method mark");
  if (!codes.has("B1")) updated = updated.replace(/\bB1\b/g, "independent mark");
  return updated;
};

const normaliseGuidance = (prompt, notes, marking) => notes.flatMap((originalNote) => {
  const original = normaliseCodeReferences(originalNote, marking);
  if (original === "Do not award a mark for a vague answer that does not identify the required technical point.") return [];
  if (!/\bFT\b|follow[- ]through/i.test(original)) return [original];

  if (/row order|each row|individual row|independently/i.test(original)) {
    consistencyNotesRewritten += 1;
    return [original
      .replace(/^FT:\s*/i, "")
      .replace(/Allow FT:\s*/i, "Allow ")
      .replace(/follow[- ]through/gi, "credit")
      .replace(/^award/i, "Award")
      .replace(/^mark/i, "Mark")];
  }

  if (genuineFtQuestion(prompt) && genuineFtNote(original) && !/award method marks|method marks can/i.test(original)) {
    if (/trace/i.test(prompt)) return ["Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly."];
    if (/truth table|find Q/i.test(prompt)) return ["Allow FT from the candidate's earlier intermediate logic value only when the final operation is applied correctly."];
    return ["Allow FT from the candidate's earlier intermediate numerical value only when the subsequent calculation and required unit conversion are correct."];
  }

  const equivalent = original.match(/(?:candidate(?:'s)?|their) (?:equivalent|own) ([a-z -]+?)(?: if| where| when| name|$)/i);
  if (equivalent) {
    consistencyNotesRewritten += 1;
    return [`Allow an equivalent ${equivalent[1].trim()} if it is used consistently.`];
  }

  if (/award each .* independently|mark each .* independently/i.test(original)) {
    consistencyNotesRewritten += 1;
    return [original.replace(/^FT:\s*/i, "").replace(/^award/i, "Award").replace(/^mark/i, "Mark")];
  }

  invalidFtRemoved += 1;
  return [];
});

const renderQuestion = (question, index, id) => {
  const theoretical = !dependencyQuestion(question.prompt);
  const marking = question.marking.map((point) => {
    const mark = theoretical && point.mark !== "B1" ? "B1" : point.mark;
    if (mark !== point.mark) theoryCodesChanged += 1;
    return { mark, text: point.text };
  });
  let strict = normaliseGuidance(question.prompt, question.strict, marking);
  if (ftGuidanceById.has(id) || removeFtIds.has(id)) {
    strict = strict.filter((note) => !/\bFT\b|follow[- ]through/i.test(note));
    if (ftGuidanceById.has(id)) strict.push(ftGuidanceById.get(id));
  }
  return [
    "  {",
    `    title: ${JSON.stringify(question.title ?? `Question ${index + 1}`)},`,
    `    marks: ${JSON.stringify(question.marks)},`,
    `    prompt: ${JSON.stringify(question.prompt)},`,
    `    answer: ${JSON.stringify(answerReplacements.get(id) ?? question.answer)},`,
    "    marking: [",
    ...marking.map((point) => `      { mark: ${JSON.stringify(point.mark)}, text: ${JSON.stringify(point.text)} },`),
    "    ],",
    "    strict: [",
    ...strict.map((note) => `      ${JSON.stringify(note)},`),
    "    ],",
    "  },",
  ].join("\n");
};

for (const directory of directories) {
  const file = path.join(webRoot, directory, "app.js");
  const source = fs.readFileSync(file, "utf8");
  const start = source.indexOf("const examQuestions =");
  const end = source.indexOf("\n];", start);
  const questions = evaluateLessonQuestions(directory, source);
  const lesson = directory.slice(-3);
  const replacement = `const examQuestions = [\n${questions.map((question, index) => renderQuestion(question, index, `L${lesson}-Q${index + 1}`)).join("\n")}\n];`;
  const updated = source.slice(0, start) + replacement + source.slice(end + 3);
  if (updated !== source) {
    fs.writeFileSync(file, updated);
    changedFiles += 1;
  }
}

console.log(`Normalised ${changedFiles} lesson files: ${theoryCodesChanged} theory mark codes changed to B1, ${invalidFtRemoved} invalid FT notes removed, ${consistencyNotesRewritten} FT labels rewritten as consistency guidance.`);
