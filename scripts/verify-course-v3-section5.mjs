import { readFileSync } from "node:fs";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection5Presentation } from "./course-v3-section5-checks.mjs";

const bank = JSON.parse(readFileSync(new URL("./assessment-bank-contract.json", import.meta.url), "utf8"));
const errors = validateSection5Presentation(courseV3Lessons, bank);
for (const lesson of courseV3Lessons.filter((l) => l.section === 5)) {
  const html = readFileSync(new URL(`../web/course-v3/${lesson.route}/index.html`, import.meta.url), "utf8");
  if ((html.match(/<details class="paper-marking-points">/g) ?? []).length !== lesson.examStyleQuestions.length) errors.push(`${lesson.lessonKey}: exam answers must start collapsed`);
  if ((html.match(/class="unit-checkpoint"/g) ?? []).length !== lesson.units.length) errors.push(`${lesson.lessonKey}: checkpoints missing in HTML`);
  if (!html.includes('id="lesson-contents"') || lesson.units.some((_, i) => !html.includes(`href="#unit-${i + 1}"`))) errors.push(`${lesson.lessonKey}: knowledge-point navigation is incomplete`);
}
if (errors.length) throw new Error(errors.join("\n"));
if (process.argv.includes("--self-test")) {
  const mutations = [
    ["report window taught before presentation features", (ls) => { ls.find((l) => l.lessonKey === "S5-L05").units[1].objectiveIds.push("S5.07.A08"); }],
    ["RAM mapped to process management", (ls) => { ls.find((l) => l.lessonKey === "S5-L01").practice[1].objectiveIds = ["S5.01.A06"]; }],
    ["wrong process-management answer", (ls) => { ls.find((l) => l.lessonKey === "S5-L01").examStyleQuestions[0].markLogic = ["Allocate memory", "Manage files", "Check permissions", "Install a driver"]; }],
    ["Java answered with IDE features", (ls) => { ls.find((l) => l.lessonKey === "S5-L04").examStyleQuestions[2].markLogic = ["Use a breakpoint", "Pretty-print source", "Fold code", "Inspect variables"]; }],
    ["copied practice with appended filler", (ls) => { const l = ls.find((l) => l.lessonKey === "S5-L02"); l.examStyleQuestions[2].markLogic = [...l.practice[6].answerPoints, "Add one further distinction."]; }],
    ["wrong debugger result", (ls) => { ls.find((l) => l.lessonKey === "S5-L05").units[3].leadVisual.rows[1][1] = "16"; }],
    ["unrelated paper attribution", (ls) => { ls.find((l) => l.lessonKey === "S5-L01").examStyleQuestions[0].sourceRef = "9618/w25/11 Q5(a)(i)"; }],
    ["repeated core paragraph", (ls) => { const l = ls.filter((l) => l.section === 5); l[3].units[0].coreExplanation[0] = l[2].units[0].coreExplanation[0]; }],
    ["misplaced review tag", (ls) => { ls.find((l) => l.lessonKey === "REV-P1").units[0].objectiveIds.push("S5.01.R"); }],
    ["unscored bank task", (_, b) => { b.sets.find((s) => s.id === "SECTION-5-CHECK").questions[0].answerPoints = []; }],
    ["missing classroom checkpoint", (ls) => { delete ls.find((l) => l.lessonKey === "S5-L02").units[0].checkpoint; }],
    ["faulty mock trace", (_, b) => { b.sets.find((s) => s.id === "PAPER-1-MOCK").questions.find((q) => q.id === "A-P1-5").answerPoints[4] = "Total is now 15."; }],
    ["lost assembly source", (ls) => { ls.find((l) => l.lessonKey === "S5-L03").units[0].workedExample.steps.shift(); }],
  ];
  for (const [name, mutate] of mutations) {
    const lessons = structuredClone(courseV3Lessons), assessment = structuredClone(bank);
    mutate(lessons, assessment);
    if (!validateSection5Presentation(lessons, assessment).length) throw new Error(`S5 negative mutation not detected: ${name}`);
  }
  console.log(`S5 self-test: ${mutations.length} negative mutations rejected.`);
}
const section = courseV3Lessons.filter((l) => l.section === 5);
console.log(`S5 verified: ${section.length} lessons, ${section.flatMap((l) => l.units).length} units, ${section.flatMap((l) => l.objectives).length} objectives, ${section.flatMap((l) => l.practice).length} practice questions and ${section.flatMap((l) => l.examStyleQuestions).length} independent exam tasks; review mapping, bank scoring and rendered answer controls checked.`);
