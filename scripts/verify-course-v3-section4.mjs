import { readFileSync } from 'node:fs';
import { courseV3Lessons } from './course-v3-content.mjs';
import { validateSection4Presentation, executeSection4Program } from './course-v3-section4-checks.mjs';
import { section4Programs } from './course-v3-section4-programs.mjs';
import { section4DiagramFiles } from './course-v3-section4-diagrams.mjs';

const bank = JSON.parse(readFileSync(new URL('./assessment-bank-contract.json',import.meta.url),'utf8'));
const errors = validateSection4Presentation(courseV3Lessons,bank);
for (const [key,program] of Object.entries(section4Programs)) {
  try { executeSection4Program(program); } catch (error) { errors.push(`${key}: ${error.message}`); }
}
for (const [name,svg] of Object.entries(section4DiagramFiles)) {
  if (readFileSync(new URL(`../web/assets/course-v3/section-4/${name}`,import.meta.url),'utf8')!==svg) errors.push(`${name}: rendered SVG differs from source`);
}
const fetchSvg=section4DiagramFiles['fetch-transfers.svg'];
for (const [from,to] of [['PC','MAR'],['MAR','Memory'],['Memory','MDR'],['MDR','CIR']]) if (!fetchSvg.includes(`data-from="${from}" data-to="${to}"`)) errors.push(`Missing fetch transfer ${from} → ${to}`);
if (/data-from="MDR" data-to="PC"|data-from="Memory" data-to="CIR"/.test(fetchSvg)) errors.push('Incorrect fetch transfer');
if(errors.length) throw new Error(errors.join('\n'));
if(process.argv.includes('--self-test')) {
  const find=(ls,id)=>ls.flatMap(l=>[...l.practice,...l.examStyleQuestions]).find(q=>q.id===id);
  const mutations=[
    ls=>{find(ls,'S4-L06-Q2').expectedTrace[1][1]=302;},
    ls=>{find(ls,'S4-L06-Q5').expectedTrace[4][3]=226;},
    ls=>{find(ls,'S4-L06-EXAM-1').finalMemory={};},
    ls=>{find(ls,'S4-L06-EXAM-2').answerTable.rows[8][4]='90';},
    ls=>{find(ls,'S4-L07-EXAM-2').code=find(ls,'S4-L07-EXAM-2').code.replace('AND 601','AND #00001111');},
    ls=>{find(ls,'S4-L07-Q2').objectiveIds=['S4.15.A01'];},
    ls=>{find(ls,'S4-L05-Q2').answerPoints[0]='BEGIN=10, LEFT=7, RIGHT=9, RESULT=0.';},
    ls=>{find(ls,'S4-L06-EXAM-1').code=undefined;},
    ls=>{find(ls,'S4-L07-EXAM-3').markLogic[3]='The left result is 00000000.';},
    ls=>{find(ls,'S4-L01-EXAM-1').markLogic[0]=find(ls,'S4-L01-Q1').answerPoints[0];},
    (ls,b)=>{b.sets.find(s=>s.id==='SECTION-4-CHECK').questions[1].objectiveIds=['S4.09.A01'];},
    ls=>{ls.find(l=>l.section===4).units[0].checkpoint=undefined;},
  ];
  for(const [index,mutate] of mutations.entries()) {
    const lessons=structuredClone(courseV3Lessons),assessment=structuredClone(bank);
    mutate(lessons,assessment);
    if(!validateSection4Presentation(lessons,assessment).length) throw new Error(`S4 negative mutation ${index+1} was not detected`);
  }
  console.log(`S4 self-test: ${mutations.length} negative mutations rejected.`);
}
console.log(`S4 verified: seven lessons, 61 objective mappings, 22 worked units, 28 practice questions, 21 independent exam tasks, ${Object.keys(section4Programs).length} executable program fixtures, section check 20 marks and Paper 1 mock 75 marks.`);
