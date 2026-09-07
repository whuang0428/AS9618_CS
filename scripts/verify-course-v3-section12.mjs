import { readFileSync } from 'node:fs';
import { courseV3Lessons } from './course-v3-content.mjs';
import { section12Programs, section12Structures, section12States, structureCode } from './course-v3-section12-programs.mjs';
import { section12DiagramFiles } from './course-v3-section12-diagrams.mjs';
import { validateSection12Presentation, validateSection12Html } from './course-v3-section12-checks.mjs';
import { validateSection12Execution } from './course-v3-section12-execution.mjs';
const read = p => readFileSync(new URL(p, import.meta.url), 'utf8');
const bank = JSON.parse(read('./assessment-bank-contract.json'));
const readHtml = l => read(`../web/course-v3/${l.route}/index.html`);
const execution = validateSection12Execution(section12Programs, section12Structures, section12States);
const errors = [...validateSection12Presentation(courseV3Lessons, bank), ...validateSection12Html(courseV3Lessons, readHtml), ...execution.errors];
for (const [name, svg] of Object.entries(section12DiagramFiles())) if (read(`../web/assets/course-v3/section-12/${name}`) !== svg) errors.push(`Stale S12 SVG: ${name}`);
const legacy = JSON.parse(read('./question-bank-contract.json')).questions.find(q => q.id === 'Q-L084-02');
if (!legacy?.prompt.includes('IF Mark > 50 THEN Result <- \"Pass\" ELSE Result <- \"Fail\" ENDIF') || !legacy.answer.includes('Mark >= 50') || legacy.marks !== 9) errors.push('Legacy S12 error question has incomplete branches, a wrong correction or wrong marks');
if (errors.length) throw new Error(errors.join('\n'));
let count = 0;
if (process.argv.includes('--self-test')) {
  const lesson = (ls, n) => ls.find(l => l.lessonKey === `S12-L0${n}`);
  const mutations = [
    ['order', ls => {const i=ls.findIndex(l=>l.section===12);[ls[i],ls[i+1]]=[ls[i+1],ls[i]];}],
    ['misplaced content', ls => {lesson(ls,5).units[2].objectiveIds=['S12.06.A01'];}],
    ['duplicate paragraph', ls => {lesson(ls,2).units[0].coreExplanation[0]=lesson(ls,1).units[0].coreExplanation[0];}],
    ['missing checkpoint', ls => {delete lesson(ls,8).units[0].checkpoint;}],
    ['missing code', ls => {delete lesson(ls,2).units[2].workedExample;}],
    ['duplicate prompt', ls => {lesson(ls,5).practice[1].prompt=lesson(ls,5).practice[0].prompt;}],
    ['wrong marks', ls => {lesson(ls,5).practice[1].marks=8;}],
    ['recycled exam answer', ls => {const l=lesson(ls,1);l.examStyleQuestions[0].markLogic=[...l.practice[0].answerPoints];l.examStyleQuestions[0].marks=l.practice[0].marks;}],
    ['missing drawing answer', ls => {delete lesson(ls,2).practice[1].answerDiagram;}],
    ['wrong chart code', ls => {lesson(ls,2).examStyleQuestions[1].answerCode=structureCode('order');}],
    ['wrong error correction', ls => {lesson(ls,4).practice[2].answerCode=section12Programs.boundaryFault.code;}],
    ['unrelated test-data answer', ls => {lesson(ls,7).examStyleQuestions[0].markLogic=['Alpha','Beta','Acceptance'];}],
    ['wrong amendment', ls => {lesson(ls,9).practice[1].answerCode=section12Programs.passOriginal.code;}],
    ['wrong official clause', ls => {lesson(ls,3).examStyleQuestions[0].sourceRef='Cambridge syllabus 3.1';}],
    ['misclassified adjective', ls => {lesson(ls,4).examStyleQuestions[2].commandWord='Complete';}],
    ['review gap', ls => {const r=ls.find(l=>l.lessonKey==='REV-P2');r.practice=r.practice.filter(q=>q.id!=='REV-P2-S12-Q1');}],
    ['bank placeholder', (_,b) => {b.sets.find(s=>s.id==='SECTION-12-CHECK').questions[0].prompt='Connect ideas in a fresh context.';}],
    ['bank scoring gap', (_,b) => {b.sets.find(s=>s.id==='SECTION-12-CHECK').questions[0].answerPoints=[];}],
  ];
  for (const [name, mutate] of mutations) {
    const ls=structuredClone(courseV3Lessons), b=structuredClone(bank); mutate(ls,b);
    if (!validateSection12Presentation(ls,b).length) throw new Error(`Uncaught S12 content mutation: ${name}`); count++;
  }
  const htmlMutations = [
    h=>h.replaceAll('<details class="paper-marking-points">','<details class="paper-marking-points" open>'),
    h=>h.replace('id="unit-1"','id="wrong-unit-1"'),
    h=>h.replaceAll('class="unit-checkpoint"','class="lost-checkpoint"'),
    h=>h.replaceAll('target="_blank"','target="_self"'),
    h=>h.replaceAll('class="visual-scroll" tabindex="0"','class="visual-scroll"'),
    h=>h.replaceAll('One valid pseudocode solution','One valid SQL answer'),
  ];
  for (const mutate of htmlMutations) {if (!validateSection12Html(courseV3Lessons,l=>mutate(readHtml(l))).length) throw new Error('Uncaught S12 HTML mutation'); count++;}
  const executableMutations = [
    (p)=>{p.boundaryFixed.code=p.boundaryFixed.code.replace('>= 50','> 50');},
    (p)=>{p.failBranch.code=p.failBranch.code.replace('< 50','>= 50');},
    (p)=>{p.average.code=p.average.code.replace('Count > 0','Count >= 0');},
    (p)=>{p.passEnhanced.code=p.passEnhanced.code.replace('TO 4','TO 3');},
    (p)=>{p.passEnhanced.code=p.passEnhanced.code.replace('INPUT Mark','INPUT Mark\n    MeritCount <- 0');},
    (p)=>{p.rainEnhanced.code=p.rainEnhanced.code.replace('Rain > 0.0','Rain >= 0.0');},
    (p)=>{p.parcelEnhanced.code=p.parcelEnhanced.code.replace('Mass <= 5.0','Mass < 5.0');},
    (p)=>{p.salesEnhanced.code=p.salesEnhanced.code.replace('Price >= 100.0','Price > 100.0');},
    (_,s)=>{s.transitions[0].to='Locked';},
    (_,s)=>{s.transitions.push({...s.transitions[0]});},
    (_,__,c)=>{c.order=c.order.replaceAll('BYREF','BYVAL');},
    (_,__,c)=>{c.journey=c.journey.replace('RETURN Distance / Speed','RETURN Distance * Speed');},
    (_,__,c)=>{c.order=c.order.replace('CALL DisplayCost(Cost)','CALL DisplayCost(Quantity)');},
  ];
  for (const mutate of executableMutations) {
    const p=structuredClone(section12Programs), s=structuredClone(section12States), c=Object.fromEntries(Object.keys(section12Structures).map(k=>[k,structureCode(k)])); mutate(p,s,c);
    if (!validateSection12Execution(p,section12Structures,s,c).errors.length) throw new Error('Uncaught S12 execution mutation'); count++;
  }
  console.log(`S12 regression self-test: ${count} negative mutations rejected.`);
}
console.log('S12 verified: 9 lessons, 25 units, 34 objectives, 34 practice tasks, 27 independent exam tasks and 4 review tasks; 20-mark section check; two 10-mark Paper 2 tasks.');
console.log(`S12 execution: ${execution.cases} scalar cases, ${execution.structureCases} chart-program cases, ${execution.stateCases} state traces covering ${execution.stateEdges} transitions, ${execution.regressionCases} original/amended output comparisons; 4 reproducible SVGs.`);
