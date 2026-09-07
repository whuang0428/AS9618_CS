import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { section10Assessments } from "./course-v3-section10-content.mjs";
import { section10Programs } from "./course-v3-section10-programs.mjs";
import { section10Diagrams, section10DiagramFiles } from "./course-v3-section10-diagrams.mjs";
import { validateSection10Presentation, validateSection10Diagrams, validateSection10Html } from "./course-v3-section10-checks.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bank = JSON.parse(readFileSync(join(root, "scripts/assessment-bank-contract.json"), "utf8"));
const readHtml = l => readFileSync(join(root, "web/course-v3", l.route, "index.html"), "utf8");
const errors = [...validateSection10Presentation(courseV3Lessons, bank), ...validateSection10Diagrams(), ...validateSection10Html(courseV3Lessons, readHtml)];
for (const [name, svg] of Object.entries(section10DiagramFiles())) if (readFileSync(join(root, "web/assets/course-v3/section-10", name), "utf8") !== svg) errors.push(`S10 SVG differs from its verified source: ${name}`);
assert.deepEqual(errors, [], "S10 content, ownership or rendered checks failed");

const section = courseV3Lessons.filter(l => l.section === 10);
const inlinePrograms = [...new Set([...section.flatMap(l => [...l.practice, ...l.examStyleQuestions]), ...section10Assessments]
  .filter(q => q.answerCode && !q.answerProgramKey).map(q => q.answerCode))];
const typeExample = section[0].units[0].workedExample;
inlinePrograms.push(typeExample.steps.filter(([, text]) => text.includes("\n")).map(([, text]) => text).join("\n"));
const execution = JSON.parse(execFileSync("python3", [join(root, "scripts/verify-course-v3-section10-programs.py")], {
  input: JSON.stringify({ programs: section10Programs, inlinePrograms }), encoding: "utf8",
}));
console.log(`S10 verified: 14 lessons, 29 units, 25 objectives, 44 practice + 42 exam questions; ${execution.program_cases} executed program cases, ${execution.negative_cases} program fault checks.`);

if (process.argv.includes("--self-test")) {
  let count = 0;
  const rejectLesson = mutation => {
    const copy = structuredClone(courseV3Lessons); mutation(copy.filter(l => l.section === 10));
    assert(validateSection10Presentation(copy, bank).length > 0, "Accepted an invalid S10 lesson"); count++;
  };
  rejectLesson(ls => { ls[6].units[0].method.title = "Linear search procedure"; });
  rejectLesson(ls => { ls[9].units[0].leadVisual.asset = ls[10].units[1].leadVisual.asset; });
  rejectLesson(ls => { ls[9].units[0].objectiveIds = ["S10.09.A02"]; });
  rejectLesson(ls => { ls[10].examStyleQuestions[0].markLogic = ["A stack removes the newest patient first."]; });
  rejectLesson(ls => { ls[1].units[1].workedExample.steps[1][1] = "Define a record here."; });
  rejectLesson(ls => { ls[7].units[2].supportingMaterials = []; });
  rejectLesson(ls => { ls[4].units[0].coreExplanation[0] = ls[3].units[0].coreExplanation[0]; });
  rejectLesson(ls => { ls[5].examStyleQuestions[0].task = ls[5].practice[0].prompt; });
  rejectLesson(ls => { ls[0].practice.pop(); });
  rejectLesson(ls => { ls[12].diagnostic = null; });
  rejectLesson(ls => { ls[0].examStyleQuestions[0].sourceRef = "Cambridge syllabus 3.1"; });
  for (const mutation of [
    d => d.bubble.rows[1].push(4),
    d => { d.bubble.rows[2][1] = 8; },
    d => { d.matrix.rows[1] = ["Row 2", "6 · visit 4", "1 · visit 5", "8 · visit 6"]; },
    d => { d.stack.rows.at(-1)[0] = "POP returns A"; },
    d => { d.queue.rows.at(-1)[4] = "1 / 1 / 3"; },
    d => { d.linked.rows[1][2] = 2; },
  ]) {
    const diagrams = structuredClone(section10Diagrams); mutation(diagrams);
    assert(validateSection10Diagrams(diagrams).length > 0, "Accepted an invalid numeric diagram"); count++;
  }
  const badBank = structuredClone(bank); badBank.sets.find(s => s.id === "SECTION-10-CHECK").questions[0].prompt = "Correct a plausible student error.";
  assert(validateSection10Presentation(courseV3Lessons, badBank).length > 0); count++;
  assert(validateSection10Html(courseV3Lessons, l => readHtml(l).replaceAll('<details class="paper-marking-points">', '<details class="paper-marking-points" open>')).length > 0); count++;
  console.log(`S10 negative content/diagram/HTML checks passed: ${count} deliberate regressions rejected.`);
}
