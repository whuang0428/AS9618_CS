import {readFileSync} from "node:fs";
import {courseV3Lessons} from "./course-v3-content.mjs";
import {section11Programs} from "./course-v3-section11-programs.mjs";
import {countGraph,section11DiagramFiles} from "./course-v3-section11-diagrams.mjs";
import {validateSection11Execution,executeSection11} from "./course-v3-section11-execution.mjs";
import {validateSection11Presentation,validateSection11Html} from "./course-v3-section11-checks.mjs";
const read=p=>readFileSync(new URL(p,import.meta.url),"utf8");
const bank=JSON.parse(read("./assessment-bank-contract.json")),html=l=>read(`../web/course-v3/${l.route}/index.html`);
const execution=validateSection11Execution(section11Programs,countGraph);
const errors=[...execution.errors,...validateSection11Presentation(courseV3Lessons,bank),...validateSection11Html(courseV3Lessons,html)];
for(const [name,svg] of Object.entries(section11DiagramFiles()))if(read(`../web/assets/course-v3/section-11/${name}`)!==svg)errors.push(`Stale S11 diagram ${name}`);
if(!JSON.parse(read("./question-bank-contract.json")).questions.find(q=>q.id==="Q-L076-03").answer.includes("Age >= 18"))errors.push("Legacy adult threshold regression");
if(/RETURN Mark = 0 AND Mark <= 100|return mark = 0 && mark <= 100/.test(read("./course-v2-content.json")))errors.push("Legacy validity transcript regression");
if(errors.length)throw Error(errors.join("\n"));
let mutations=0;
if(process.argv.includes("--self-test")){
  const lesson=(ls,n)=>ls.find(l=>l.originalLesson===68+n&&l.section===11);
  for(const mutate of [
    ls=>{const l=lesson(ls,7);[l.units[0],l.units[1]]=[l.units[1],l.units[0]];},
    ls=>{lesson(ls,6).units[0].objectiveIds=["S11.04.A01"];},
    ls=>{lesson(ls,3).units[0].coreExplanation[0]=lesson(ls,2).units[0].coreExplanation[0];},
    ls=>{delete lesson(ls,9).units[0].checkpoint;},
    ls=>{lesson(ls,8).practice[1].prompt=lesson(ls,8).practice[0].prompt;},
    ls=>{lesson(ls,5).practice[1].objectiveIds=["S11.05.A01"];},
    ls=>{delete lesson(ls,1).practice[1].diagram;},
    ls=>{lesson(ls,1).units[1].leadVisual.facts=["End continues into the loop."];},
    ls=>{lesson(ls,10).examStyleQuestions[0].sourceRef="Cambridge syllabus 3.1";},
    ls=>{const l=lesson(ls,4);l.examStyleQuestions[0].markLogic=[...l.practice[0].answerPoints];},
    ls=>{lesson(ls,12).units[2].workedExample.steps[0][1]="RETURN Mark = 0";},
    ls=>{const r=ls.find(l=>l.lessonKey==="REV-P2");r.practice=r.practice.filter(q=>q.id!=="REV-P2-S11-Q3");},
  ]){const ls=structuredClone(courseV3Lessons);mutate(ls);if(!validateSection11Presentation(ls,bank).length)throw Error("Uncaught S11 content mutation");mutations++;}
  for(const mutate of [b=>{b.sets.find(s=>s.id==="SECTION-11-CHECK").questions[0].prompt="Connect two ideas in a fresh context.";},b=>{b.sets.find(s=>s.id==="PAPER-2-MOCK").questions.find(q=>q.id==="A-P2-7").answerPoints=[];}]){const b=structuredClone(bank);mutate(b);if(!validateSection11Presentation(courseV3Lessons,b).length)throw Error("Uncaught S11 bank mutation");mutations++;}
  for(const mutate of [h=>h.replaceAll('<details class="paper-marking-points">','<details class="paper-marking-points" open>'),h=>h.replace('id="unit-1"','id="absent"'),h=>h.replaceAll('class="unit-checkpoint"','class="absent"'),h=>h.replaceAll('tabindex="0" role="region"','role="region"')]){if(!validateSection11Html(courseV3Lessons,l=>mutate(html(l))).length)throw Error("Uncaught S11 HTML mutation");mutations++;}
  for(const [key,from,to] of [["selection",">= 18","= 18"],["step","STEP -2","STEP 2"],["validMark",">= 0","= 0"],["passing","BYREF Value","BYVAL Value"],["validation",">= 0","> 0"],["login","Attempts + 1","Attempts + 0"],["library","MID(Word, 2, 3)","MID(Word, 3, 3)"],["mockExpression",">= 24","> 24"]]){
    const ps=structuredClone(section11Programs);ps[key].code=ps[key].code.replace(from,to);if(!validateSection11Execution(ps,countGraph).errors.length)throw Error(`Uncaught ${key} execution mutation`);mutations++;
  }
  const g=structuredClone(countGraph);g.nodes.find(n=>n.id==="advance").next="end";if(!validateSection11Execution(section11Programs,g).errors.length)throw Error("Uncaught flowchart-edge mutation");mutations++;
  // Invalid interfaces and missing initialisation must be rejected, not guessed.
  for(const [bad,input] of [[section11Programs.passing.code.replace("CALL ChangeOriginal(Number)","CALL ChangeOriginal(5)"),[]],[section11Programs.login.code.replace('Password <- ""\n',""),["open"]],[section11Programs.validMark.code.replace("RETURN (Mark >= 0) AND (Mark <= 100)","OUTPUT (Mark >= 0) AND (Mark <= 100)"),[50]]]){
    let rejected=false;try{executeSection11(bad,input);}catch{rejected=true;}if(!rejected)throw Error("Invalid program was accepted");mutations++;
  }
  console.log(`S11 self-test: ${mutations} negative mutations rejected.`);
}
console.log(`S11 verified: 12 lessons, 26 distinct units, 29 objectives, 36 practice and 36 independent exam tasks, 3 review tasks, section check 20 marks; mock allocations 9 + 10 marks.`);
console.log(`S11 execution: ${execution.cases} program cases, all ${execution.edges} flowchart edges; refactoring preserves results and reduces comparisons from 2 to 1.`);
