import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection3Presentation } from "./course-v3-section3-checks.mjs";

const bank = JSON.parse(readFileSync(new URL("./assessment-bank-contract.json", import.meta.url), "utf8"));
const errors = validateSection3Presentation(courseV3Lessons, bank);
if (errors.length) throw new Error(errors.join("\n"));
const circuit = readFileSync(new URL("../web/assets/course-v3/section-3/question-circuit-d.svg", import.meta.url), "utf8");
assert.deepEqual([...circuit.matchAll(/data-node="([^"]+)" data-gate="([^"]+)"/g)].map((match) => match.slice(1)), [["G1", "AND"], ["G2", "OR"], ["G3", "NOT"]]);
assert.deepEqual([...circuit.matchAll(/data-from="([^"]+)" data-to="([^"]+)"/g)].map((match) => match.slice(1)), [["A", "G1"], ["B", "G1"], ["G1", "G2"], ["C", "G2"], ["G2", "G3"], ["G3", "Q"]]);
const logicLesson = courseV3Lessons.find((lesson) => lesson.lessonKey === "S3-L06");
const html = readFileSync(new URL(`../web/course-v3/${logicLesson.route}/index.html`, import.meta.url), "utf8");
for (const question of [...logicLesson.practice, ...logicLesson.examStyleQuestions].filter((q) => q.diagram || q.table)) {
  const start = html.indexOf(`data-question-id="${question.id}"`);
  const stimulus = html.slice(start, html.indexOf("<details", start));
  assert(start >= 0, `${question.id}: rendered question missing`);
  if (question.diagram) assert(stimulus.includes(`<img src="../../${question.diagram.slice(1)}"`) && stimulus.includes("Open full-size diagram"), `${question.id}: diagram missing before answer`);
  if (question.table) assert(stimulus.includes("<table>") && stimulus.includes("Supplied truth table"), `${question.id}: supplied table missing before answer`);
}
if (process.argv.includes("--self-test")) {
  const mutations = [
    (ls) => { ls.find((l) => l.lessonKey === "S3-L05").practice[0].objectiveIds = ["S3.10.A10"]; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L06").practice[0].answerPoints[4] = "L outputs are 0, 0, 0, 0, 0, 0, 0, 0."; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L03").units[0].supportingMaterials.find(m => m.type === "table").rows[3][2] = "P3"; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L03").units[2].leadVisual.asset = "/assets/diagrams/course-v3-imagegen/sram-dram.png"; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L02").summary[2][1] = "A microphone digitises sound."; },
    (ls) => { const l = ls.find((l) => l.lessonKey === "S3-L06"); l.examStyleQuestions[1].diagram = undefined; },
    (ls) => { delete ls.find((l) => l.lessonKey === "S3-L06").practice[2].diagram; },
    (ls) => { delete ls.find((l) => l.lessonKey === "S3-L06").practice[3].table; },
    (ls) => { delete ls.find((l) => l.lessonKey === "S3-L06").examStyleQuestions[2].table; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L06").examStyleQuestions[2].table.rows[1][2] = 1; },
    (ls) => { const l = ls.find((l) => l.lessonKey === "S3-L04"); l.examStyleQuestions[0].task = l.practice[0].prompt; },
    (_, b) => { b.sets.find((s) => s.id === "SECTION-3-CHECK").questions[3].objectiveIds = ["S3.04.A01"]; },
  ];
  for (const [index, mutate] of mutations.entries()) {
    const lessons = structuredClone(courseV3Lessons), assessment = structuredClone(bank);
    mutate(lessons, assessment);
    if (!validateSection3Presentation(lessons, assessment).length) throw new Error(`S3 negative mutation ${index + 1} was not detected`);
  }
  console.log(`S3 self-test: ${mutations.length} negative mutations rejected.`);
}
console.log("S3 verified: six lessons, 42 distinct objectives, 29 practice questions, 24 independent exam tasks; section check 20 marks and Paper 1 mock 75 marks.");
