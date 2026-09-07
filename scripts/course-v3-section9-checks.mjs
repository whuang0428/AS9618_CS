import { codeFor } from "./course-v3-section9-programs.mjs";
import { diagramFor, diagramPath } from "./course-v3-section9-diagrams.mjs";

const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const normalise=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
const ids=(r,...ns)=>ns.map(n=>`S9.${String(r).padStart(2,"0")}.A${String(n).padStart(2,"0")}`);
const ownership={
  "ABSTRACTION-PURPOSE":ids(1,1,2,3),"ABSTRACTION-MODEL":ids(1,4),"DECOMPOSITION-PARTS":ids(2,1),"DECOMPOSITION-MODULES":ids(2,2),
  "ALGORITHM-STEPS":ids(3,1),"IDENTIFIER-TABLE":ids(4,1),"IPO-CONTRACT":ids(5,1),"IPO-STATEMENTS":ids(5,1),
  "CONSTRUCTS-SEQUENCE":ids(6,1),"CONSTRUCTS-SELECTION":ids(6,1),"CONSTRUCTS-ITERATION":ids(6,1),"CONSTRUCTS-COMBINE":ids(6,1),
  "REPRESENTATIONS-ENGLISH":ids(7,1),"REPRESENTATIONS-SYMBOLS":ids(7,1),"REPRESENTATIONS-TO-CODE":ids(7,2),"REPRESENTATIONS-TO-FLOW":ids(7,3),
  "REFINEMENT-LEVELS":ids(8,1),"REFINEMENT-ENDPOINT":ids(8,1),"LOGIC-COMPARISONS":ids(9,1),"LOGIC-COMBINE":ids(9,1),"LOGIC-CHECK":ids(9,1),
  "INTEGRATED-MODULES":ids(2,1,2),"INTEGRATED-IPO":ids(5,1),"INTEGRATED-REFINEMENT":ids(8,1),
};
const visualOwnership={"CONSTRUCTS-SELECTION":"passDecision","REPRESENTATIONS-SYMBOLS":"symbols","REPRESENTATIONS-TO-CODE":"countdown","REPRESENTATIONS-TO-FLOW":"sumFour"};
const placeholder=/fresh context|two alternatives from Section|plausible student error|main method from|Explain (?:apply|use)|Identify construct|Algorithm design review|Solution review/i;
export function validateSection9Presentation(lessons,bank) {
  const errors=[], check=(ok,why)=>{if(!ok)errors.push(why);};
  const ls=lessons.filter(l=>l.section===9), paragraphs=new Set(), prompts=new Set(), questions=new Map(), units=new Map();
  check(same(ls.map(l=>l.lessonKey),Array.from({length:9},(_,i)=>`S9-L0${i+1}`)),"S9 lesson sequence changed");
  check(same([...new Set(ls.flatMap(l=>l.syllabusIds))],Array.from({length:9},(_,i)=>`S9.0${i+1}`)),"S9 official requirement introduction order changed");
  for(const l of ls) {
    const objectiveIds=l.objectives.map(([id])=>id);
    check(same([...new Set(l.units.flatMap(u=>u.objectiveIds))],objectiveIds),`${l.lessonKey}: objectives taught out of order`);
    check(l.diagnostic?.prompt && l.diagnostic?.answer,`${l.lessonKey}: missing diagnostic`);
    check(l.summaryMode==="authored" && l.summary.every(([,body])=>body.split(" ").length>=7),`${l.lessonKey}: summary lacks usable conclusions`);
    check(l.units.some(u=>u.workedExample),`${l.lessonKey}: missing worked example`);
    for(const id of objectiveIds)check(l.practice.some(q=>q.objectiveIds.includes(id)),`${id}: no practice coverage`);
    for(const u of l.units) {
      units.set(u.unitKey,u);const key=u.unitKey?.replace(/^S9-/,"");
      check(same(u.objectiveIds,ownership[key]),`${u.unitKey}: wrong knowledge-point ownership`);
      check(same(u.leadVisual.objectiveIds,u.objectiveIds),`${u.unitKey}: misplaced visual objectives`);
      check(u.coreExplanation.length>=2 && !placeholder.test(u.coreExplanation.join(" ")),`${u.unitKey}: insufficient or generic explanation`);
      check(u.checkpoint?.prompt && u.checkpoint?.answer,`${u.unitKey}: missing unit check`);
      for(const p of u.coreExplanation){const sig=normalise(p);check(!paragraphs.has(sig),`${u.unitKey}: duplicated core paragraph`);paragraphs.add(sig);}
      if(visualOwnership[key]) {
        const graph=visualOwnership[key];
        check(u.leadVisual.asset===diagramPath(graph),`${u.unitKey}: wrong diagram`);
        check(u.leadVisual.alt?.length>40 && u.leadVisual.facts?.length>=2,`${u.unitKey}: missing text equivalent`);
        if(graph!=="symbols")check(same(u.leadVisual.facts,diagramFor(graph).facts),`${u.unitKey}: diagram transcript drift`);
      }
      if(u.workedExample?.programKey)check(u.workedExample.steps.some(([,text])=>text===codeFor(u.workedExample.programKey)),`${u.unitKey}: example differs from executed pseudocode`);
    }
    for(const q of [...l.practice,...l.examStyleQuestions]) {
      const prompt=q.prompt ?? q.task, points=q.answerPoints ?? q.markLogic;
      check(!questions.has(q.id),`${q.id}: duplicate ID`);questions.set(q.id,q);
      check(!prompts.has(normalise(prompt)),`${q.id}: duplicate question`);prompts.add(normalise(prompt));
      check(q.objectiveIds?.length && q.objectiveIds.every(id=>objectiveIds.includes(id)),`${q.id}: foreign objective mapping`);
      check(q.marks===points?.length && q.marks>0,`${q.id}: incomplete scoring points`);
      check(!placeholder.test(prompt+points?.join(" ")),`${q.id}: placeholder or malformed wording`);
      if(q.programKey)check(q.code===codeFor(q.programKey),`${q.id}: supplied program differs from executed program`);
      if(q.answerProgramKey)check(q.answerCode===codeFor(q.answerProgramKey),`${q.id}: answer differs from executed program`);
      if(q.conversion==="flowchart-to-pseudocode")check(q.diagram && q.answerCode,`${q.id}: conversion missing stimulus or solution`);
      if(q.conversion?.endsWith("to-flowchart"))check(q.answerDiagram && (q.conversion!=="pseudocode-to-flowchart" || q.code),`${q.id}: drawing task missing source or model diagram`);
      if(q.task) {
        const clauses=[...new Set(q.objectiveIds.map(id=>Number(id.slice(3,5))<=2 ? "9.1" : "9.2"))];
        check(clauses.every(c=>q.sourceRef.includes(c)),`${q.id}: incorrect official clause`);
        for(const p of l.practice) {
          const overlap=points.filter(pt=>p.answerPoints.some(ap=>normalise(ap)===normalise(pt))).length;
          check(overlap<Math.ceil(points.length/2),`${q.id}: recycled practice scoring points`);
        }
      }
    }
  }
  check(units.size===24 && paragraphs.size===48,"S9 requires 24 distinct units and 48 distinct explanation paragraphs");
  check(new Set(ls.flatMap(l=>l.objectives.map(([id])=>id))).size===15,"S9 atomic objective coverage changed");
  check(same(questions.get("S9-L03-Q2")?.objectiveIds,ids(4,1)),"Identifier-table practice mapped to another concept");
  check(questions.get("S9-L03-Q2")?.table?.rows.length===3,"Identifier-table task lacks its table");
  const conversions=new Set(ls[5]?.practice.map(q=>q.conversion));
  for(const kind of ["english-to-pseudocode","flowchart-to-pseudocode","english-to-flowchart","pseudocode-to-flowchart"])check(conversions.has(kind),`S9.07 missing ${kind}`);
  const ticket=units.get("S9-INTEGRATED-IPO");
  check(JSON.stringify(ticket?.leadVisual.rows).includes("Subtotal = 50.00") && JSON.stringify(ticket?.leadVisual.rows).includes("Total = 45.00"),"Integrated IPO table contradicts the 2-ticket discounted calculation");
  check(units.get("S9-IPO-STATEMENTS")?.coreExplanation.some(p=>/literal, a variable or an expression/.test(p)),"IPO explanation incorrectly excludes literal output");
  const review=lessons.find(l=>l.lessonKey==="REV-P2");
  for(const u of review?.units ?? []) {
    const section=Number(u.heading.match(/^Section (\d+):/)?.[1]);
    check(u.objectiveIds.every(id=>id.startsWith(`S${section}.`)),`${u.heading}: review objective belongs to another section`);
  }
  for(let i=1;i<=9;i++)check(review?.practice.some(q=>q.id.startsWith("REV-P2-S9-") && q.objectiveIds.includes(`S9.0${i}.R`)),`S9.0${i}: missing review practice`);
  const set=bank.sets.find(s=>s.id==="SECTION-9-CHECK"), mock=bank.sets.find(s=>s.id==="PAPER-2-MOCK");
  check(set?.questions.reduce((n,q)=>n+q.marks,0)===20,"S9 section check must total 20 marks");
  check(mock?.questions.reduce((n,q)=>n+q.marks,0)===75,"Paper 2 mock must total 75 marks");
  check(same(mock?.questions.filter(q=>q.section===9).map(q=>q.marks),[8,9]),"S9 Paper 2 question allocations changed");
  for(const q of [...set.questions,...mock.questions.filter(q=>q.section===9)]) {
    check(!placeholder.test(q.prompt) && q.prompt.length>100,`${q.id}: unspecified assessment premise`);
    check(q.answerPoints?.length===q.marks,`${q.id}: assessment lacks scoring points`);
    check(q.syllabusIds?.length && q.syllabusIds.every(id=>/^S9\.0[1-9]$/.test(id)),`${q.id}: invalid bank mapping`);
    if(q.answerProgramKey)check(q.answerCode===codeFor(q.answerProgramKey),`${q.id}: assessment answer differs from executed case`);
  }
  return errors;
}
const htmlEscape=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
export function validateSection9Html(lessons,readHtml) {
  const errors=[], check=(ok,why)=>{if(!ok)errors.push(why);};
  for(const l of lessons.filter(l=>l.section===9)) {
    const html=readHtml(l);
    check(html.includes('class="lesson-toc"') && html.includes('class="diagnostic"'),`${l.lessonKey}: classroom navigation or diagnostic missing`);
    check((html.match(/class="unit-checkpoint"/g)??[]).length===l.units.length,`${l.lessonKey}: formative checks missing`);
    for(let i=1;i<=l.units.length;i++)check(html.includes(`href="#unit-${i}"`) && html.includes(`id="unit-${i}"`),`${l.lessonKey}: unit link ${i} broken`);
    check((html.match(/<details class="paper-marking-points">/g)??[]).length===3,`${l.lessonKey}: exam answers must be collapsed initially`);
    check(!/SQL answer|Supplied assembly program|Logic circuit/.test(html),`${l.lessonKey}: wrong code or diagram accessibility label`);
    for(const q of [...l.practice,...l.examStyleQuestions]) {
      for(const key of ["code","answerCode"])if(q[key])check(html.includes(htmlEscape(q[key])),`${q.id}: ${key} lost during rendering`);
      for(const key of ["diagram","answerDiagram"])if(q[key])check(html.includes(`src="../..${q[key]}"`),`${q.id}: ${key} not rendered`);
    }
    for(const u of l.units.filter(u=>u.leadVisual.asset)) {
      check(html.includes(`src="../..${u.leadVisual.asset}" width="`) && html.includes(`href="../..${u.leadVisual.asset}" target="_blank"`),`${u.unitKey}: missing image dimensions or full-size access`);
      check(html.includes('class="visual-scroll" tabindex="0" role="region"'),`${u.unitKey}: keyboard scroll access missing`);
    }
  }
  return errors;
}
