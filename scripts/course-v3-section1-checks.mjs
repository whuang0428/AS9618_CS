import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyCommand } from "./cie-command-words.mjs";
import { section1Practice, section1ExamQuestions } from "./course-v3-section1-content.mjs";
import { bitmapExample, depthPanels, section1DiagramFiles } from "./course-v3-section1-diagrams.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = (value, message) => assert.ok(value, `S1: ${message}`);
const normalise = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
const materialText = (unit) => JSON.stringify([unit.workedExample, ...(unit.supportingMaterials ?? [])]);

export function validateSection1Diagrams(files = section1DiagramFiles()) {
  const svg = files["bitmap-composition.svg"];
  const readGrid = (role) => {
    const group = svg.match(new RegExp(`<g data-grid="${role}">([\\s\\S]*?)</g>`))?.[1];
    check(group, `missing bitmap ${role} grid`);
    return [...group.matchAll(/<rect data-pixel="(\d+),(\d+)" data-value="(\d+)"[^>]*fill="([^"]+)"/g)]
      .map(([, x, y, value, fill]) => ({ x: Number(x), y: Number(y), value: Number(value), fill }));
  };
  const encoded = readGrid("encoded");
  const decoded = readGrid("decoded");
  check(encoded.length === 60 && decoded.length === 60, "bitmap must retain all 10 × 6 pixels");
  for (const [index, cell] of encoded.entries()) {
    const output = decoded[index];
    assert.deepEqual([cell.x, cell.y], [index % 10, Math.floor(index / 10)], "pixel order must stay row-major");
    assert.deepEqual([output.x, output.y, output.value], [cell.x, cell.y, cell.value], "decoding must preserve positions and values");
    check(cell.value === bitmapExample.pixels[cell.y][cell.x], "stored bitmap code differs from source data");
    check(output.fill === bitmapExample.palette[cell.value], "decoded colour differs from palette");
  }
  for (const panel of depthPanels) {
    const group = files["colour-depth.svg"].match(new RegExp(`<g data-depth="${panel.bits}">([\\s\\S]*?)</g>`))?.[1];
    check(group, `missing ${panel.bits}-bit depth panel`);
    const cells = [...group.matchAll(/<rect data-pixel="(\d+),(\d+)" data-value="(\d+)"[^>]*fill="([^"]+)"/g)];
    check(cells.length === 64, "depth comparison must keep each 8 × 8 grid");
    check(new Set(cells.map((cell) => cell[4])).size === 2 ** panel.bits, "depth panel has the wrong colour count");
    for (const [, x, y, value, fill] of cells) {
      check(Number(value) === panel.pixels[Number(y)][Number(x)], "depth panel has changed spatial data");
      check(fill === panel.palette[Number(value)], "depth code is not using its palette");
    }
  }
}

export function validateSection1Presentation(lessons, { checkFiles = false, bank } = {}) {
  check(lessons.length === 6, "six lessons are required");
  const prompts = [];
  const allQuestions = new Map();
  for (const lesson of lessons) {
    const key = String(lesson.originalLesson).padStart(3, "0");
    const expected = [...section1Practice[key], ...section1ExamQuestions[key]];
    const questions = [...lesson.practice, ...lesson.examStyleQuestions];
    check(questions.length === expected.length, `${lesson.lessonKey}: authored question was lost`);
    for (const question of questions) {
      allQuestions.set(question.id, question);
      const authored = expected.find((item) => item.id === question.id);
      check(authored, `${question.id}: unexpected inferred question`);
      const prompt = question.prompt ?? question.task;
      prompts.push(normalise(prompt));
      check(prompt === authored.prompt, `${question.id}: authored wording was rewritten`);
      assert.deepEqual(question.objectiveIds, authored.objectiveIds, `${question.id}: authored objectives were changed`);
      assert.deepEqual(question.answerPoints ?? question.markLogic, authored.answerPoints, `${question.id}: authored marking points were changed`);
      check(question.marks === authored.answerPoints.length, `${question.id}: marks do not match independent points`);
      check(question.objectiveIds.length && question.objectiveIds.every((id) => lesson.objectives.some(([candidate]) => candidate === id)), `${question.id}: missing or foreign objective`);
    }
    for (const [id] of lesson.objectives) check(lesson.practice.some((q) => q.objectiveIds.includes(id)), `${id}: missing practice`);
    for (const q of lesson.examStyleQuestions) {
      assert.deepEqual([...new Set(q.sourceRef.match(/S1\.\d{2}/g))].sort(), [...new Set(q.objectiveIds.map((id) => id.replace(/\.A\d+$/, "")))].sort(), `${q.id}: incorrect source focus`);
      check(/syllabus 1\.[123]/.test(q.sourceRef) && /course mapping/.test(q.sourceRef), `${q.id}: distinguish official clauses from course IDs`);
    }
    check(!/signed extension|Extension: signed/i.test(JSON.stringify([lesson.title, lesson.summary, lesson.units.map((u) => u.heading)])), "signed arithmetic cannot be labelled optional extension");
    check(!/Key focus:/.test(JSON.stringify(lesson.summary)), "summary must retain useful relationships");
    for (const unit of lesson.units) {
      check(unit.checkpoint?.prompt && unit.checkpoint?.answer, `${unit.heading}: missing formative check`);
      prompts.push(normalise(unit.checkpoint.prompt));
    }
    if (checkFiles) {
      const html = readFileSync(join(root, "web/course-v3", lesson.route, "index.html"), "utf8");
      check((html.match(/<details class="paper-marking-points">/g) ?? []).length === 3, `${lesson.lessonKey}: examination answers must start collapsed`);
      check((html.match(/class="unit-checkpoint"/g) ?? []).length === lesson.units.length, `${lesson.lessonKey}: missing rendered formative checks`);
      check(html.includes('id="lesson-contents"'), `${lesson.lessonKey}: missing lesson contents`);
      for (const [img] of html.matchAll(/<img\b[^>]*>/g)) check(/width="\d+"/.test(img) && /height="\d+"/.test(img), `${lesson.lessonKey}: image can shift anchor positions while loading`);
      lesson.units.forEach((unit, index) => check(html.includes(`href="#unit-${index + 1}"`) && html.includes(`id="unit-${index + 1}"`), `${unit.heading}: broken navigation anchor`));
    }
  }
  check(new Set(prompts).size === prompts.length, "duplicate question or checkpoint prompts");
  // These are semantic guardrails for the actual mismatches found in S1, not a word-overlap score.
  assert.deepEqual(allQuestions.get("V3-Q-L005-03").objectiveIds, ["S1.09.A01"], "vector properties must not claim bitmap coverage");
  assert.deepEqual(allQuestions.get("V3-Q-L002-01").objectiveIds, ["S1.03.A01", "S1.03.A02", "S1.03.A03"], "binary/hex conversion must not claim BCD coverage");
  check(!allQuestions.get("V3-Q-L006-03").objectiveIds.includes("S1.11.A05"), "sound compression must not claim bitmap coverage");
  check(!allQuestions.get("S1-L03-EXAM-2").objectiveIds.includes("S1.04.A02"), "unsigned-only task must not claim signed arithmetic");
  const arithmetic = lessons[2];
  const signed = arithmetic.units.find((u) => u.unitKey === "S1.04-SIGNED");
  check(signed && !/unsigned/i.test(signed.method?.title ?? ""), "signed method has an unsigned heading");
  check(/borrow.*zero/i.test(materialText(arithmetic.units[0])), "missing worked borrowing example");
  check(/11111011/.test(materialText(signed)) && /10010110/.test(materialText(signed)), "missing worked signed subtraction or overflow");
  const subtract = allQuestions.get("S1-L03-Q4");
  const result = ((-12 - 9) & 255).toString(2).padStart(8, "0");
  check(subtract.prompt.includes("−12 − 9") && subtract.answerPoints.some((point) => point.includes(result)), "signed subtraction has an incorrect result");
  const overflow = allQuestions.get("V3-Q-L003-02");
  check(overflow.answerPoints.some((point) => point.includes(String(76 + 61))) && overflow.answerPoints.some((point) => point.includes("−119")), "signed overflow result is incorrect");
  const sound = allQuestions.get("S1-L06-EXAM-1");
  check(/analogue sound is recorded twice/.test(sound.task) && !/resampled/.test(sound.task), "recording and resampling are conflated");
  check(sound.markLogic.some((point) => /twice.*sample-data size/i.test(point)), "doubling capture rate must double uncompressed sample data");
  check(/cannot recover information/.test(lessons[5].units[1].coreExplanation.join(" ")), "upsampling limit is missing");
  const lossless = lessons[5].units.find((u) => u.unitKey === "S1.11-LOSSLESS-FILES");
  check(/RED RED BLUE RED/.test(materialText(lossless)) && /Share a repeated vector object/.test(materialText(lossless)), "missing dictionary or vector compression worked examples");
  check(lessons[0].units[0].workedExample?.steps.some(([, body]) => body.includes("4.194304 MB")), "prefix conversion example is missing");
  if (bank) {
    const section = bank.sets.find((set) => set.id === "SECTION-1-CHECK");
    const mock = bank.sets.flatMap((set) => set.questions).find((q) => q.id === "A-P1-1");
    check(section.questions.reduce((total, q) => total + q.marks, 0) === 20 && mock.marks === 8, "S1 assessment mark totals changed");
    for (const q of [...section.questions, mock]) {
      const command = classifyCommand(q.prompt, q.objectiveIds[0].replace(/\.A\d+$/, ""));
      check(command.status === "Approved" && command.word === q.commandWord, `${q.id}: assessment command label does not match its task`);
      check(!/new scenario|fresh context|plausible student error|two alternatives from Section|different stated context/.test(q.prompt), `${q.id}: unfinished assessment template`);
      check(q.answerPoints?.length === q.marks, `${q.id}: missing allocated scoring points`);
      check((q.prompt.match(/\[\d+\]/g) ?? []).reduce((total, part) => total + Number(part.slice(1, -1)), 0) === q.marks, `${q.id}: part marks do not add up`);
    }
    check(mock.answer !== section.questions[0].answer, "mock reuses the section-check answer");
    check(section.questions.some((q) => /bitmap/.test(q.prompt)) && section.questions.some((q) => /mono sound/.test(q.prompt)), "cumulative check omits image or sound representation");
  }
  const files = checkFiles ? Object.fromEntries(Object.keys(section1DiagramFiles()).map((name) => [name, readFileSync(join(root, "web/assets/course-v3/section-1", name), "utf8")])) : section1DiagramFiles();
  validateSection1Diagrams(files);
  return true;
}

export function section1PresentationSelfTest(lessons, bank) {
  const mutations = [
    ["wrong objective", (copy) => copy[4].practice[2].objectiveIds.push("S1.08.A03")],
    ["wrong source focus", (copy) => { copy[4].examStyleQuestions[1].sourceRef = "Cambridge 9618 syllabus 1.2 · S1.08 (course mapping)"; }],
    ["optional signed arithmetic", (copy) => { copy[2].title = "Unsigned arithmetic and signed extension"; }],
    ["unsigned method title", (copy) => { copy[2].units[2].method.title = "Unsigned binary addition"; }],
    ["missing borrowing", (copy) => { copy[2].units[0].supportingMaterials = []; }],
    ["missing signed subtraction", (copy) => { copy[2].units[2].supportingMaterials = []; }],
    ["changed command grammar", (copy) => { copy[1].practice[0].prompt = "Calculate 159 denary to hexadecimal."; }],
    ["resampling claim", (copy) => { copy[5].examStyleQuestions[0].task = "An existing recording is resampled at twice the rate."; }],
    ["wrong signed result", (copy) => { copy[2].practice[3].answerPoints[2] = "The result is 00010101."; }],
    ["missing compression example", (copy) => { copy[5].units[5].workedExample = null; }],
    ["empty summary", (copy) => { copy[0].summary = [["Prefixes", "Key focus: binary decimal prefixes."]]; }],
    ["missing checkpoint", (copy) => { copy[0].units[0].checkpoint = null; }],
  ];
  for (const [name, mutate] of mutations) {
    const copy = structuredClone(lessons);
    mutate(copy);
    assert.throws(() => validateSection1Presentation(copy, { bank }), undefined, `S1 verifier accepted ${name}`);
  }
  const missingPixel = section1DiagramFiles();
  missingPixel["bitmap-composition.svg"] = missingPixel["bitmap-composition.svg"].replace(/<rect data-pixel="9,5"[^>]+\/>/, "");
  assert.throws(() => validateSection1Diagrams(missingPixel), undefined, "S1 verifier accepted a missing bitmap pixel");
  const extraColour = section1DiagramFiles();
  extraColour["colour-depth.svg"] = extraColour["colour-depth.svg"].replace(/(<g data-depth="2">[\s\S]*?fill=")[^"]+/, "$1#0088ff");
  assert.throws(() => validateSection1Diagrams(extraColour), undefined, "S1 verifier accepted an extra two-bit colour");
  const incomplete = structuredClone(bank);
  incomplete.sets.find((set) => set.id === "SECTION-1-CHECK").questions[1].prompt = "Correct a plausible student error.";
  assert.throws(() => validateSection1Presentation(lessons, { bank: incomplete }), undefined, "S1 verifier accepted an incomplete assessment");
  const wrongCommand = structuredClone(bank);
  wrongCommand.sets.find((set) => set.id === "SECTION-1-CHECK").questions[3].commandWord = "calculate";
  assert.throws(() => validateSection1Presentation(lessons, { bank: wrongCommand }), undefined, "S1 verifier accepted an incorrect command label");
  return mutations.length + 4;
}
