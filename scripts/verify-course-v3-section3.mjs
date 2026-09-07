import { readFileSync } from "node:fs";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection3Presentation } from "./course-v3-section3-checks.mjs";

const bank = JSON.parse(readFileSync(new URL("./assessment-bank-contract.json", import.meta.url), "utf8"));
const errors = validateSection3Presentation(courseV3Lessons, bank);
if (errors.length) throw new Error(errors.join("\n"));
if (process.argv.includes("--self-test")) {
  const mutations = [
    (ls) => { ls.find((l) => l.lessonKey === "S3-L05").practice[0].objectiveIds = ["S3.10.A10"]; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L06").practice[0].answerPoints[4] = "L outputs are 0, 0, 0, 0, 0, 0, 0, 0."; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L03").units[0].supportingMaterials.find(m => m.type === "table").rows[3][2] = "P3"; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L03").units[2].leadVisual.asset = "/assets/diagrams/course-v3-imagegen/sram-dram.png"; },
    (ls) => { ls.find((l) => l.lessonKey === "S3-L02").summary[2][1] = "A microphone digitises sound."; },
    (ls) => { const l = ls.find((l) => l.lessonKey === "S3-L06"); l.examStyleQuestions[1].diagram = undefined; },
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
