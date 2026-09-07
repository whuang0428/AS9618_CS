import { codeFor12, structureCode } from './course-v3-section12-programs.mjs';
import { diagramPath12, stateVisual12 } from './course-v3-section12-diagrams.mjs';
import { classifyCommand } from './cie-command-words.mjs';
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const normalise = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const ids = (r, ...ns) => ns.map(n => `S12.${String(r).padStart(2, '0')}.A${String(n).padStart(2, '0')}`);
const ownership = {
  'LIFECYCLE-STAGES':ids(1,1,2), WATERFALL:ids(1,3), ITERATIVE:ids(1,4), RAD:ids(1,5,6),
  'STRUCTURE-HIERARCHY':ids(2,1,2,3), 'STRUCTURE-PARAMETERS':ids(2,1), 'STRUCTURE-CODE':ids(2,3,4),
  'STATES-MEANING':ids(3,1), 'STATES-TRACE':ids(3,1),
  'ERROR-TYPES':ids(4,1,2,3,4), 'ERROR-LOCATE':ids(4,5), 'ERROR-CORRECT':ids(4,6),
  'TEST-MANUAL':ids(5,1,2), 'TEST-BOX':ids(5,3,4), 'TEST-INTEGRATION':ids(5,5), 'TEST-USERS':ids(5,6,7,8,9),
  STRATEGY:ids(6,1), 'TEST-PLAN':ids(6,1), 'DATA-CATEGORIES':ids(7,1,2), 'DATA-SELECT':ids(7,1,2),
  'MAINTENANCE-NEED':ids(8,1), 'MAINTENANCE-TYPES':ids(8,2,3,4),
  'AMEND-ANALYSE':ids(9,1), 'AMEND-CHANGE':ids(9,1), 'AMEND-VERIFY':ids(9,1),
};
const placeholder = /fresh context|plausible student error|candidates are not required to produce|complete documentation and test plan|Explain (?:apply|use)|main method from/i;
const materials = u => [u.leadVisual,u.method,u.workedExample,...(u.supportingMaterials??[])].filter(Boolean);
export function validateSection12Presentation(lessons, bank) {
  const errors=[], check=(ok, why)=>{if(!ok)errors.push(why);};
  const ls=lessons.filter(l=>l.section===12), paragraphs=new Set(), prompts=new Set(), units=new Map(), questions=new Map();
  check(same(ls.map(l=>l.lessonKey),Array.from({length:9},(_,i)=>`S12-L0${i+1}`)), 'S12 lesson order changed');
  check(same(ls.flatMap(l=>l.syllabusIds),Array.from({length:9},(_,i)=>`S12.0${i+1}`)), 'S12 syllabus introduction order changed');
  const inspectQuestion=q=>{
    const prompt=q.prompt??q.task, points=q.answerPoints??q.markLogic;
    check(!questions.has(q.id),`${q.id}: duplicate ID`);questions.set(q.id,q);
    check(!prompts.has(normalise(prompt)),`${q.id}: duplicate question`);prompts.add(normalise(prompt));
    check(points?.length===q.marks && q.marks>0,`${q.id}: marks do not match explicit scoring points`);
    check(!placeholder.test(prompt+points?.join(' ')),`${q.id}: generic or unsupported wording`);
    const classification=classifyCommand(prompt,q.objectiveIds[0].replace(/\.A\d+$/,''));
    check(classification.status==='Approved' && classification.word===q.commandWord?.toLowerCase(),`${q.id}: invalid primary command`);
    if(q.programKey)check(q.code===codeFor12(q.programKey),`${q.id}: supplied code differs from executed fixture`);
    if(q.answerProgramKey)check(q.answerCode===codeFor12(q.answerProgramKey),`${q.id}: answer code differs from executed fixture`);
    if(q.commandWord?.toLowerCase()==='draw')check(q.answerDiagram,`${q.id}: drawing task lacks a model diagram`);
  };
  for(const l of ls){
    const objectiveIds=l.objectives.map(([id])=>id);
    check(same([...new Set(l.units.flatMap(u=>u.objectiveIds))],objectiveIds),`${l.lessonKey}: objective teaching order/coverage changed`);
    check(l.diagnostic?.prompt && l.diagnostic?.answer,`${l.lessonKey}: missing diagnostic`);
    check(l.summaryMode==='authored' && l.summary.every(([,text])=>text.length>30),`${l.lessonKey}: summary lacks usable conclusions`);
    for(const id of objectiveIds)check(l.practice.some(q=>q.objectiveIds.includes(id)),`${id}: no practice`);
    for(const u of l.units){
      units.set(u.unitKey,u);
      check(same(u.objectiveIds,ownership[u.unitKey?.replace(/^S12-/,'')]),`${u.unitKey}: wrong knowledge-point ownership`);
      check(u.coreExplanation.length>=2,`${u.unitKey}: insufficient explanation`);
      check(u.checkpoint?.prompt && u.checkpoint?.answer,`${u.unitKey}: missing formative check`);
      for(const p of u.coreExplanation){const signature=normalise(p);check(!paragraphs.has(signature),`${u.unitKey}: repeated core paragraph`);paragraphs.add(signature);}
      for(const m of materials(u)){
        check(same(m.objectiveIds,u.objectiveIds),`${u.unitKey}: material mapped to another objective`);
        if(m.programKey)check(m.steps.some(([,text])=>text===codeFor12(m.programKey)),`${u.unitKey}: displayed example differs from executed code`);
      }
    }
    for(const q of [...l.practice,...l.examStyleQuestions]){
      inspectQuestion(q);check(q.objectiveIds.every(id=>objectiveIds.includes(id)),`${q.id}: foreign objective mapping`);
      if(q.task){
        const clause=l.lessonKey.endsWith('01')?'12.1':['02','03'].some(x=>l.lessonKey.endsWith(x))?'12.2':'12.3';
        check(q.sourceRef.includes(clause),`${q.id}: wrong official clause`);
        for(const p of l.practice){const copied=q.markLogic.filter(x=>p.answerPoints.some(y=>normalise(x)===normalise(y))).length;check(copied<Math.ceil(q.marks/2),`${q.id}: recycled practice answer`);}
      }
    }
  }
  check(units.size===25 && paragraphs.size===50,'S12 requires 25 distinct units and 50 distinct core paragraphs');
  check(ls.flatMap(l=>l.objectives).length===34,'S12 atomic objective coverage changed');
  check(units.get('S12-STRUCTURE-HIERARCHY')?.leadVisual.asset===diagramPath12('order'),'Structure chart replaced by unrelated visual');
  check(same(units.get('S12-STATES-MEANING')?.leadVisual.facts,stateVisual12.facts),'State diagram transcript mismatch');
  check(questions.get('S12-L02-EXAM-2')?.answerCode===structureCode('journey'),'Chart-to-pseudocode answer incomplete');
  check(units.get('S12-STRUCTURE-CODE')?.workedExample?.steps.some(([,text])=>text===structureCode('order')),'Missing complete structure-chart implementation');
  check(questions.get('S12-L02-EXAM-3')?.commandWord==='Explain','Arithmetic in chart premise misclassified as Calculate');
  for(const id of ['S12-L03-EXAM-1','S12-L03-EXAM-2','S12-L03-EXAM-3','S12-L04-EXAM-3'])check(questions.get(id)?.commandWord==='Explain',`${id}: descriptive noun/adjective misclassified as command`);
  const dataAnswer=questions.get('S12-L07-EXAM-1')?.markLogic.join(' ')??'';
  check(/1 is rejected/.test(dataAnswer)&&/2 is accepted/.test(dataAnswer)&&/8 is accepted/.test(dataAnswer)&&/9 is rejected/.test(dataAnswer),'Boundary task lacks its boundary answer');
  const review=lessons.find(l=>l.lessonKey==='REV-P2'), lane=review?.units.find(u=>u.syllabusId==='REVIEW-2-4');
  check(same(lane?.objectiveIds,Array.from({length:9},(_,i)=>`S12.0${i+1}.R`)),'S12 review lane incomplete or misplaced');
  for(let i=1;i<=9;i++)check(review?.practice.some(q=>q.id.startsWith('REV-P2-S12-')&&q.objectiveIds.includes(`S12.0${i}.R`)),`S12.0${i}: missing review practice`);
  for(const q of review?.practice.filter(q=>q.id.startsWith('REV-P2-S12-'))??[])inspectQuestion(q);
  check(review?.summary.some(([heading,text])=>heading.startsWith('Section 12:')&&!/Key focus:/.test(text)&&text.includes('amended program')),'S12 review summary is truncated');
  const set=bank.sets.find(s=>s.id==='SECTION-12-CHECK'), mock=bank.sets.find(s=>s.id==='PAPER-2-MOCK');
  check(set?.questions.reduce((n,q)=>n+q.marks,0)===20 && set.totalMarks===20,'S12 check must total 20 marks');
  check(mock?.questions.reduce((n,q)=>n+q.marks,0)===75,'Paper 2 mock must total 75 marks');
  for(const q of [...(set?.questions??[]),...(mock?.questions.filter(q=>q.section===12)??[])]){
    inspectQuestion(q);check(q.syllabusIds?.length && q.syllabusIds.every(id=>/^S12\.0[1-9]$/.test(id)),`${q.id}: invalid assessment mapping`);
  }
  for(let i=1;i<=9;i++)check(set?.questions.some(q=>q.syllabusIds.includes(`S12.0${i}`)),`S12.0${i}: missing cumulative assessment coverage`);
  return errors;
}
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
export function validateSection12Html(lessons,readHtml){
  const errors=[],check=(ok,message)=>{if(!ok)errors.push(message);};
  for(const l of lessons.filter(l=>l.section===12)){
    const html=readHtml(l);
    check(html.includes('class="lesson-toc"')&&html.includes('class="diagnostic"'),`${l.lessonKey}: navigation or diagnostic missing`);
    check((html.match(/class="unit-checkpoint"/g)??[]).length===l.units.length,`${l.lessonKey}: formative checks missing`);
    check((html.match(/<details class="paper-marking-points">/g)??[]).length===3,`${l.lessonKey}: exam answers must start collapsed`);
    check(!/Logic circuit|One valid SQL answer|Supplied assembly program/.test(html),`${l.lessonKey}: unrelated accessibility label`);
    for(let i=1;i<=l.units.length;i++)check(html.includes(`href="#unit-${i}"`)&&html.includes(`id="unit-${i}"`),`${l.lessonKey}: broken contents link`);
    for(const q of [...l.practice,...l.examStyleQuestions]){
      for(const key of ['code','answerCode'])if(q[key])check(html.includes(escape(q[key])),`${q.id}: ${key} not rendered`);
      for(const key of ['diagram','answerDiagram'])if(q[key])check(html.includes(`src="../..${q[key]}"`),`${q.id}: ${key} not rendered`);
    }
    for(const u of l.units.filter(u=>u.leadVisual.asset)){
      check(html.includes(`src="../..${u.leadVisual.asset}" width="`),`${u.unitKey}: image dimensions missing`);
      check(html.includes(`href="../..${u.leadVisual.asset}" target="_blank"`),`${u.unitKey}: full-size link missing`);
      check(html.includes('class="visual-scroll" tabindex="0" role="region"'),`${u.unitKey}: keyboard diagram scrolling missing`);
    }
  }
  return errors;
}
