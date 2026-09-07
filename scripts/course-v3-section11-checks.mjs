import { codeFor } from "./course-v3-section11-programs.mjs";
import { countDiagram } from "./course-v3-section11-diagrams.mjs";
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const normalise=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const ownership={
  TRANSLATE:["S11.01.A01"],
  DECLARE:["S11.02.A01","S11.02.A02"],"ASSIGN-IO":["S11.02.A03","S11.02.A05"],
  ARITHMETIC:["S11.02.A03","S11.02.A04"],LOGICAL:["S11.02.A04"],
  "NUMERIC-FUNCTIONS":["S11.03.A01"],"STRING-FUNCTIONS":["S11.03.A01","S11.03.A02","S11.03.A03"],
  "IF-NESTED":["S11.04.A01"],CASE:["S11.04.A02"],FOR:["S11.04.A03"],
  REPEAT:["S11.04.A05"],WHILE:["S11.04.A04"],"LOOP-CONDITIONS":["S11.04.A04","S11.04.A05"],
  "LOOP-CHOICE":["S11.05.A01"],"LOOP-BOUNDED":["S11.05.A01"],
  "PROCEDURE-CALL":["S11.06.A01","S11.06.A02","S11.06.A03"],"BYVAL-BYREF":["S11.06.A04","S11.06.A05"],
  "FUNCTION-RETURN":["S11.07.A01","S11.07.A02","S11.07.A03","S11.07.A04"],
  INTERFACE:["S11.08.A01","S11.08.A02","S11.08.A03","S11.08.A04"],EFFICIENCY:["S11.09.A01"],
  "INTEGRATED-DESIGN":["S11.01.A01"],"INTEGRATED-CONTROL":["S11.04.A01","S11.04.A03","S11.04.A05"],
  "INTEGRATED-INTERFACES":["S11.06.A01","S11.06.A02","S11.06.A03","S11.06.A04","S11.06.A05","S11.07.A01","S11.07.A02","S11.07.A03","S11.07.A04"],
};
const placeholders=/fresh context|plausible student error|two alternatives from Section|main method from|Explain (?:translate|may|does)|Identify statement|Key focus:/i;
export function validateSection11Presentation(lessons,bank) {
  const errors=[],check=(ok,why)=>{if(!ok)errors.push(why);};
  const ls=lessons.filter(l=>l.section===11),paragraphs=new Set(),prompts=new Set(),units=new Map();
  check(ls.length===12 && same(ls.map(l=>l.originalLesson),Array.from({length:12},(_,i)=>69+i)),"S11 lesson order changed");
  check(same([...new Set(ls.flatMap(l=>l.syllabusIds))],Array.from({length:9},(_,i)=>`S11.0${i+1}`)),"S11 syllabus first-occurrence order changed");
  const checkQuestion=(q,allowed)=>{
    const prompt=q.prompt??q.task,points=q.answerPoints??q.markLogic;
    check(!prompts.has(normalise(prompt)),`${q.id}: duplicate question`);prompts.add(normalise(prompt));
    check(!placeholders.test(prompt),`${q.id}: malformed or placeholder prompt`);
    check(q.marks>0&&q.marks===points?.length,`${q.id}: marks do not match scoring points`);
    check(q.objectiveIds?.length&&q.objectiveIds.every(id=>allowed.includes(id)),`${q.id}: foreign objective mapping`);
    if(q.programKey)check(q.code===codeFor(q.programKey),`${q.id}: supplied program differs from executed source`);
    if(q.answerProgramKey)check(q.answerCode===codeFor(q.answerProgramKey),`${q.id}: solution differs from executed source`);
  };
  for(const l of ls){
    const allowed=l.objectives.map(([id])=>id);
    check(l.diagnostic?.prompt&&l.diagnostic.answer,`${l.lessonKey}: diagnostic missing`);
    check(l.summary.length>=3 && !placeholders.test(JSON.stringify(l.summary)),`${l.lessonKey}: meaningful summary missing`);
    check(!/Lesson 0\d\d/i.test(l.guidingQuestion),`${l.lessonKey}: fragile numeric cross-reference`);
    check(l.practice.length===3&&l.examStyleQuestions.length===3,`${l.lessonKey}: independent task counts changed`);
    check(l.units.some(u=>u.workedExample?.programKey),`${l.lessonKey}: executed worked example missing`);
    for(const u of l.units){
      check(!units.has(u.unitKey),`${u.unitKey}: duplicate unit`);units.set(u.unitKey,u);
      const key=u.unitKey.slice(4),family=key.startsWith("TRANSLATE-")?"TRANSLATE":key.startsWith("FOR-")?"FOR":key.startsWith("EFFICIENCY-")?"EFFICIENCY":key;
      check(same(u.objectiveIds,ownership[family]),`${u.unitKey}: content/objective mismatch`);
      check(u.coreExplanation.length===2,`${u.unitKey}: missing core explanation`);
      check(u.checkpoint?.prompt&&u.checkpoint.answer,`${u.unitKey}: formative check missing`);
      for(const p of u.coreExplanation){check(!paragraphs.has(normalise(p)),`${u.unitKey}: duplicate explanation`);paragraphs.add(normalise(p));}
      if(u.workedExample?.programKey)check(u.workedExample.steps.some(([,text])=>text===codeFor(u.workedExample.programKey)),`${u.unitKey}: worked example differs from executed code`);
    }
    for(const id of allowed){check(l.units.some(u=>u.objectiveIds.includes(id)),`${id}: objective has no teaching`);check(l.practice.some(q=>q.objectiveIds.includes(id)),`${l.lessonKey} ${id}: objective has no practice`);}
    for(const q of [...l.practice,...l.examStyleQuestions])checkQuestion(q,allowed);
    for(const exam of l.examStyleQuestions){
      const clauses=[...new Set(exam.objectiveIds.map(id=>Number(id.slice(4,6))<=3?"11.1":Number(id.slice(4,6))<=5?"11.2":"11.3"))];
      check(clauses.every(c=>exam.sourceRef.includes(c)),`${exam.id}: wrong official syllabus clause`);
      for(const practice of l.practice){const overlap=exam.markLogic.filter(x=>practice.answerPoints.some(y=>normalise(x)===normalise(y))).length;check(overlap<Math.ceil(exam.markLogic.length/2),`${exam.id}: recycled practice scoring points`);}
    }
  }
  check(units.size===26&&paragraphs.size===52,"S11 distinct teaching content is incomplete");
  check(new Set(ls.flatMap(l=>l.objectives.map(([id])=>id))).size===29,"S11 atomic objective coverage changed");
  check(same(ls[6]?.units.map(u=>u.unitKey),["S11-REPEAT","S11-WHILE","S11-LOOP-CONDITIONS"]),"Teach post-condition before pre-condition in official order");
  check(same(ls[6]?.objectives.map(([id])=>id),["S11.04.A05","S11.04.A04"]),"The objective ledger must follow the taught conditional-loop order");
  check(units.get("S11-TRANSLATE-FLOWCHART")?.leadVisual.asset===countDiagram.asset,"Flowchart placed under wrong knowledge point");
  check(same(units.get("S11-TRANSLATE-FLOWCHART")?.leadVisual.facts,countDiagram.facts),"Flowchart transcript drift");
  check(ls[0]?.practice[1].diagram===countDiagram.asset&&ls[0]?.practice[1].answerCode===codeFor("countPositive"),"Flowchart conversion lacks matching stimulus or solution");
  const allText=JSON.stringify(ls);
  check(!/design-to-code\.png|selection\.png|stage10-lesson128-case\.jpg/.test(allText),"Obsolete incorrect graphic still used in S11");
  for(const term of ["INT(RAND(6)) + 1","Minutes DIV 60","Minutes MOD 60","CASE OF Choice","STEP -2","BYREF","RETURNS BOOLEAN"])check(allText.includes(term),`S11 missing ${term}`);
  const review=lessons.find(l=>l.lessonKey==="REV-P2"),ru=review?.units.find(u=>u.heading.startsWith("Section 11:"));
  check(ru?.objectiveIds.every(id=>id.startsWith("S11.")),"S11 review unit has foreign objectives");
  for(let n=1;n<=9;n++)check(review?.practice.some(q=>q.id.startsWith("REV-P2-S11-")&&q.objectiveIds.includes(`S11.0${n}.R`)),`S11.0${n}: review practice gap`);
  for(const q of review?.practice.filter(q=>q.id.startsWith("REV-P2-S11-"))??[])checkQuestion(q,review.objectives.map(([id])=>id));
  const set=bank.sets.find(s=>s.id==="SECTION-11-CHECK"),mock=bank.sets.find(s=>s.id==="PAPER-2-MOCK");
  check(set?.questions.reduce((n,q)=>n+q.marks,0)===20,"S11 section check must total 20 marks");
  check(mock?.questions.reduce((n,q)=>n+q.marks,0)===75,"Paper 2 mock must total 75 marks");
  check(same(mock?.questions.filter(q=>q.section===11).map(q=>q.marks),[9,10]),"S11 mock allocation changed");
  for(const q of [...(set?.questions??[]),...(mock?.questions.filter(q=>q.section===11)??[])]){
    check(q.prompt.length>100&&!placeholders.test(q.prompt),`${q.id}: assessment premise missing`);
    check(q.answerPoints?.length===q.marks,`${q.id}: assessment scoring incomplete`);
    check(q.syllabusIds?.length&&q.syllabusIds.every(id=>/^S11\.0[1-9]$/.test(id)),`${q.id}: assessment mapping invalid`);
    if(q.programKey)check(q.code===codeFor(q.programKey),`${q.id}: bank stimulus drift`);
    if(q.answerProgramKey)check(q.answerCode===codeFor(q.answerProgramKey),`${q.id}: bank solution drift`);
  }
  return errors;
}
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
export function validateSection11Html(lessons,readHtml) {
  const errors=[],check=(ok,why)=>{if(!ok)errors.push(why);};
  for(const l of lessons.filter(l=>l.section===11)){
    const html=readHtml(l);
    check(html.includes('class="lesson-toc"')&&html.includes('class="diagnostic"'),`${l.lessonKey}: classroom navigation missing`);
    check((html.match(/class="unit-checkpoint"/g)??[]).length===l.units.length,`${l.lessonKey}: unit checks not rendered`);
    check((html.match(/<details class="paper-marking-points">/g)??[]).length===3,`${l.lessonKey}: exam answers must initially be collapsed`);
    check(!/SQL answer|Supplied assembly program|Logic circuit/.test(html),`${l.lessonKey}: incorrect material label`);
    for(let n=1;n<=l.units.length;n++)check(html.includes(`id="unit-${n}"`)&&html.includes(`href="#unit-${n}"`),`${l.lessonKey}: broken unit navigation`);
    for(const u of l.units)if(u.workedExample?.programKey)check(html.includes(esc(codeFor(u.workedExample.programKey))),`${u.unitKey}: worked code missing`);
    for(const q of [...l.practice,...l.examStyleQuestions])for(const field of ["code","answerCode"])if(q[field])check(html.includes(esc(q[field])),`${q.id}: ${field} lost in renderer`);
    if(l===lessons.find(x=>x.section===11)){
      check(html.includes(`src="../..${countDiagram.asset}"`)&&html.includes(`href="../..${countDiagram.asset}" target="_blank"`),"S11 flowchart missing or full-size access absent");
      check(html.includes('class="visual-scroll" tabindex="0" role="region"'),"S11 diagram keyboard scrolling unavailable");
    }
  }
  return errors;
}
