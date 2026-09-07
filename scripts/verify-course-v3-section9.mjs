import { readFileSync } from "node:fs";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { section9Programs } from "./course-v3-section9-programs.mjs";
import { section9Flowcharts, section9DiagramFiles } from "./course-v3-section9-diagrams.mjs";
import { validateSection9Presentation, validateSection9Html } from "./course-v3-section9-checks.mjs";
import { validateSection9Execution } from "./course-v3-section9-execution.mjs";

const read=path=>readFileSync(new URL(path,import.meta.url),"utf8");
const bank=JSON.parse(read("./assessment-bank-contract.json"));
const readHtml=l=>read(`../web/course-v3/${l.route}/index.html`);
const execution=validateSection9Execution(section9Programs,section9Flowcharts);
const errors=[...validateSection9Presentation(courseV3Lessons,bank),...validateSection9Html(courseV3Lessons,readHtml),...execution.errors];
for(const [name,svg] of Object.entries(section9DiagramFiles()))if(read(`../web/assets/course-v3/section-9/${name}`)!==svg)errors.push(`Stale S9 diagram: ${name}`);
const legacy=JSON.parse(read("./question-bank-contract.json")).questions.find(q=>q.id==="Q-L051-01");
if(!legacy.answer.includes('Age >= 18') || !legacy.answer.includes('"Adult"') || legacy.commandWord!=="write")errors.push("Original age conversion source regression");
if(errors.length)throw new Error(errors.join("\n"));
let count=0;
if(process.argv.includes("--self-test")) {
  const lesson=(ls,n)=>ls.find(l=>l.lessonKey===`S9-L0${n}`);
  const mutations=[
    ["lesson order",ls=>{const a=ls.findIndex(l=>l.lessonKey==="S9-L01");[ls[a],ls[a+1]]=[ls[a+1],ls[a]];}],
    ["unit ownership",ls=>{lesson(ls,3).units[1].objectiveIds=["S9.03.A01"];}],
    ["duplicate core",ls=>{lesson(ls,2).units[0].coreExplanation[0]=lesson(ls,1).units[0].coreExplanation[0];}],
    ["missing checkpoint",ls=>{delete lesson(ls,5).units[0].checkpoint;}],
    ["missing worked example",ls=>{lesson(ls,7).units.forEach(u=>delete u.workedExample);}],
    ["question duplicate",ls=>{lesson(ls,3).practice[2].prompt=lesson(ls,3).practice[1].prompt;}],
    ["identifier mismatch",ls=>{lesson(ls,3).practice[1].objectiveIds=["S9.03.A01"];}],
    ["missing table",ls=>{delete lesson(ls,3).practice[1].table;}],
    ["wrong age answer",ls=>{const q=lesson(ls,5).practice[0];q.answerCode=q.answerCode.replace(">= 18","= 18");}],
    ["copied exam answer",ls=>{const l=lesson(ls,1);l.examStyleQuestions[0].markLogic=[...l.practice[0].answerPoints];}],
    ["missing flowchart stimulus",ls=>{delete lesson(ls,6).practice[1].diagram;}],
    ["missing drawing solution",ls=>{delete lesson(ls,6).practice[2].answerDiagram;}],
    ["missing conversion direction",ls=>{delete lesson(ls,6).practice[3].conversion;}],
    ["wrong diagram placement",ls=>{lesson(ls,5).units[1].leadVisual.asset="/assets/course-v3/section-9/countdown.svg";}],
    ["wrong diagram transcript",ls=>{lesson(ls,5).units[1].leadVisual.facts=["Yes and No both pass."];}],
    ["wrong subtotal",ls=>{lesson(ls,9).units[1].leadVisual.rows[0][2]="Subtotal = 45.00";}],
    ["wrong official clause",ls=>{lesson(ls,6).examStyleQuestions[0].sourceRef="Cambridge syllabus 3.1";}],
    ["review lane mismatch",ls=>{ls.find(l=>l.lessonKey==="REV-P2").units[1].objectiveIds.push("S9.01.R");}],
    ["review gap",ls=>{const r=ls.find(l=>l.lessonKey==="REV-P2");r.practice=r.practice.filter(q=>q.id!=="REV-P2-S9-Q4");}],
    ["placeholder bank",(_,b)=>{b.sets.find(s=>s.id==="SECTION-9-CHECK").questions[0].prompt="Connect two syllabus ideas in a fresh context.";}],
    ["missing scoring",(_,b)=>{b.sets.find(s=>s.id==="SECTION-9-CHECK").questions[0].answerPoints=[];}],
  ];
  for(const [name,mutate] of mutations){const ls=structuredClone(courseV3Lessons),b=structuredClone(bank);mutate(ls,b);if(!validateSection9Presentation(ls,b).length)throw new Error(`Uncaught S9 mutation: ${name}`);count++;}
  const htmlMutations=[
    h=>h.replaceAll('<details class="paper-marking-points">','<details class="paper-marking-points" open>'),
    h=>h.replace('id="unit-1"','id="wrong-unit-1"'),
    h=>h.replaceAll('class="unit-checkpoint"','class="lost-checkpoint"'),
    h=>h.replaceAll('target="_blank"','target="_self"'),
    h=>h.replaceAll('class="visual-scroll" tabindex="0"','class="visual-scroll"'),
    h=>h.replaceAll('One valid pseudocode solution','SQL answer'),
  ];
  for(const mutate of htmlMutations){if(!validateSection9Html(courseV3Lessons,l=>mutate(readHtml(l))).length)throw new Error("Uncaught S9 HTML mutation");count++;}
  const executionMutations=[
    p=>{p.age.code=p.age.code.replace(">= 18","= 18");},
    p=>{p.ticket.code=p.ticket.code.replace("Subtotal * 0.90","Subtotal * Quantity");},
    p=>{p.sumFour.code=p.sumFour.code.replace("TO 4","TO 5");},
    p=>{p.mock.code=p.mock.code.replace("AcceptedCount > 0","AcceptedCount >= 0");},
    p=>{p.countdown.code=p.countdown.code.replace("Count - 1","Count + 1");},
    (_,g)=>{g.age.nodes.find(n=>n.id==="no").text='OUTPUT "Adult"';},
    (_,g)=>{g.sumFour.nodes.find(n=>n.id==="test").no="end";},
    (_,g)=>{g.countdown.nodes.find(n=>n.id==="decrement").next="end";},
  ];
  for(const mutate of executionMutations){const p=structuredClone(section9Programs),g=structuredClone(section9Flowcharts);mutate(p,g);if(!validateSection9Execution(p,g).errors.length)throw new Error("Uncaught S9 algorithm mutation");count++;}
  console.log(`S9 regression self-test: ${count} negative mutations rejected.`);
}
console.log(`S9 verified: 9 lessons, 24 units, 15 objectives, 28 practice tasks, 27 independent exam tasks, 4 review tasks; section check 20 marks; Paper 2 S9 tasks 8 and 9 marks.`);
console.log(`S9 execution: ${execution.cases} pseudocode cases, ${execution.graphCases} flowchart cases with every edge exercised; 8 reproducible SVG files.`);
