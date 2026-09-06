import { readFileSync } from "node:fs";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection6Presentation, validateSection6Diagrams } from "./course-v3-section6-checks.mjs";

const bank = JSON.parse(readFileSync(new URL("./assessment-bank-contract.json", import.meta.url), "utf8"));
const diagrams = Object.fromEntries(["check-digit.svg", "byte-parity.svg", "block-parity.svg", "checksum.svg"].map((name)=>[name,readFileSync(new URL(`../web/assets/course-v3/section-6/${name}`, import.meta.url), "utf8")]));
const errors = [...validateSection6Presentation(courseV3Lessons, bank), ...validateSection6Diagrams(diagrams)];
for (const lesson of courseV3Lessons.filter((l)=>l.section===6)) {
  const html = readFileSync(new URL(`../web/course-v3/${lesson.route}/index.html`, import.meta.url), "utf8");
  if ((html.match(/class="unit-checkpoint"/g)??[]).length !== lesson.units.length) errors.push(`${lesson.lessonKey}: missing rendered formative checks`);
  if ((html.match(/<details class="paper-marking-points">/g)??[]).length !== lesson.examStyleQuestions.length) errors.push(`${lesson.lessonKey}: exam answers must start collapsed`);
  if (!html.includes('id="lesson-contents"')) errors.push(`${lesson.lessonKey}: missing lesson contents`);
  for (let i=1;i<=lesson.units.length;i++) if (!html.includes(`href="#unit-${i}"`) || !html.includes(`id="unit-${i}"`)) errors.push(`${lesson.lessonKey}: broken contents link ${i}`);
}
if (errors.length) throw new Error(errors.join("\n"));
if (process.argv.includes("--self-test")) {
  const mutations = [
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L02").units[3].objectiveIds=["S6.03.A02"]; },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L02").practice[3].answerPoints[0]="A signature verifies a biometric."; },
    (ls) => { const l=ls.find((l)=>l.lessonKey==="S6-L04"); l.practice[0]=structuredClone(ls.find((l)=>l.lessonKey==="S6-L02").practice[0]); },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L05").practice[4].answerPoints[1]="Their total is 36, so the check digit is 6."; },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L05").practice[6].answerPoints[0]="The even-parity bit is 1."; },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L05").practice[7].answerPoints[0]="The parity row is 00000000."; },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L05").practice[8].answerPoints[1]="The received checksum is 19."; },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L02").examStyleQuestions[0].sourceRef="9618 2023 Q6(a)"; },
    (ls) => { ls.find((l)=>l.lessonKey==="S6-L05").units[4].workedExample=null; },
    (_,b) => { b.sets.find((s)=>s.id==="SECTION-6-CHECK").questions[3].prompt="Compare two alternatives from Section 6."; },
    (_,b) => { b.sets.find((s)=>s.id==="PAPER-1-MOCK").questions.find((q)=>q.id==="A-P1-6").answerPoints[8]="The checksum is 270."; },
  ];
  for (const [i, mutate] of mutations.entries()) {
    const ls=structuredClone(courseV3Lessons), b=structuredClone(bank); mutate(ls,b);
    if (!validateSection6Presentation(ls,b).length) throw new Error(`S6 mutation ${i+1} was not detected`);
  }
  const broken=structuredClone(diagrams);
  broken["block-parity.svg"]=broken["block-parity.svg"].replace(/(<text x="700" y="293"[^>]*>)1<\/text>/, "$10</text>");
  if (!validateSection6Diagrams(broken).length) throw new Error("S6 incorrect block diagram was not detected");
  console.log(`S6 self-test: ${mutations.length + 1} negative mutations rejected.`);
}
const s6=courseV3Lessons.filter((l)=>l.section===6);
console.log(`S6 verified: ${s6.length} lessons, ${s6.flatMap((l)=>l.units).length} units, ${s6.flatMap((l)=>l.objectives).length} objectives, 31 practice and 15 independent exam tasks; 4 exact diagrams; section check 20 marks, Paper 1 mock 75 marks.`);
