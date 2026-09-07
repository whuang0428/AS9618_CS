import { section8VisualPlacements } from "./course-v3-section8-visuals.mjs";
import { section8SqlCases } from "./course-v3-section8-sql.mjs";

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const normalise = (text) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const ids = (r, ...ns) => ns.map((n) => `S8.${String(r).padStart(2, "0")}.A${String(n).padStart(2, "0")}`);
const ownership = {
  "S8.01-FILES":ids(1,1,2), "S8.02-TERMS":ids(2,1), "S8.02-KEYS":ids(2,2), "S8.02-RELATIONSHIPS":ids(2,3), "S8.02-REFERENTIAL":ids(2,4), "S8.02-INDEX":ids(2,5),
  "S8.03-ER":ids(3,1), "S8.04-1NF":ids(4,1), "S8.04-2NF":ids(4,2), "S8.04-3NF":ids(4,3), "S8.04-DESIGN":ids(4,4,5),
  "S8.05-DICTIONARY":ids(5,1), "S8.05-MODELLING":ids(5,2), "S8.05-SCHEMA":ids(5,3), "S8.05-INTEGRITY":ids(5,4), "S8.05-SECURITY":ids(5,5), "S8.05-BACKUP":ids(5,6), "S8.06-DEVELOPER":ids(6,1), "S8.06-PROCESSOR":ids(6,2),
  "S8.07-DDL":ids(7,1), "S8.07-DML":ids(7,2), "S8.07-SQL":ids(7,3),
  "S8.08-READ":ids(8,1,2), "S8.09-DATABASE":ids(9,1), "S8.09-TYPES":ids(9,2), "S8.09-ALTER":ids(9,3), "S8.09-PRIMARY":ids(9,4), "S8.09-FOREIGN":ids(9,5),
  "S8.10-SELECT":ids(10,1), "S8.10-WHERE":ids(10,2), "S8.10-ORDER":ids(10,3), "S8.10-GROUP":ids(10,4), "S8.10-JOIN":ids(10,5), "S8.10-AGGREGATES":ids(10,6), "S8.11-INSERT":ids(11,1), "S8.11-DELETE":ids(11,2), "S8.11-UPDATE":ids(11,3),
};
const placeholder = /fresh context|two alternatives from Section|plausible student error|main method from|explain entity, table|Explain understand|TutorGroup.*12A/i;

export function validateSection8Presentation(lessons, bank) {
  const errors = [], check = (ok, why) => { if (!ok) errors.push(why); };
  const section = lessons.filter((l) => l.section === 8);
  check(same(section.map((l) => l.lessonKey), ["S8-L01","S8-L02","S8-L03","S8-L04","S8-L05","S8-L06"]), "S8 lesson sequence changed");
  check(same(section.flatMap((l) => l.syllabusIds), Array.from({length:11},(_,i)=>`S8.${String(i+1).padStart(2,"0")}`)), "S8 requirement order changed");
  const paragraphs = new Set(), prompts = new Set(), questionIds = new Set(), units = new Map(), questions = new Map();
  const allObjectives = new Set(section.flatMap((l)=>l.objectives.map(([id])=>id)));
  for (const lesson of section) {
    const objectiveIds = lesson.objectives.map(([id])=>id);
    check(same([...new Set(lesson.units.flatMap((u)=>u.objectiveIds))],objectiveIds), `${lesson.lessonKey}: objective introduction order differs from teaching`);
    check(lesson.diagnostic?.prompt && lesson.diagnostic?.answer, `${lesson.lessonKey}: missing diagnostic`);
    for (const id of objectiveIds) check(lesson.practice.some((q)=>q.objectiveIds.includes(id)), `${id}: no relevant practice`);
    for (const u of lesson.units) {
      check(!units.has(u.unitKey), `${u.unitKey}: duplicate unit`); units.set(u.unitKey,u);
      check(same(u.objectiveIds,ownership[u.unitKey]), `${u.unitKey}: wrong knowledge-point mapping`);
      check(same(u.leadVisual.objectiveIds,u.objectiveIds), `${u.unitKey}: visual objective mismatch`);
      check(u.checkpoint?.prompt && u.checkpoint?.answer, `${u.unitKey}: missing formative check`);
      check(u.coreExplanation.length >= 2, `${u.unitKey}: incomplete explanation`);
      const placement = section8VisualPlacements.find((v) => v.unitKey === u.unitKey);
      check(placement && u.leadVisual.type === "reviewed-visual" && u.leadVisual.asset === `/assets/course-v3/section-8/${placement.file}`, `${u.unitKey}: missing or misplaced knowledge diagram`);
      check(u.leadVisual.alt?.length >= 40 && u.leadVisual.facts?.length >= 2, `${u.unitKey}: diagram text equivalent missing`);
      if (placement?.facts) check(same(u.leadVisual.facts, placement.facts), `${u.unitKey}: diagram transcript belongs to another visual`);
      for (const p of u.coreExplanation) { const sig=normalise(p); check(!paragraphs.has(sig),`${u.unitKey}: duplicated core paragraph`); paragraphs.add(sig); }
    }
    for (const [i,q] of lesson.practice.entries()) {
      const expected = lesson.lessonKey === "S8-L04" && i === 2 ? ids(7,1,2,3) : ownership[lesson.units[i]?.unitKey];
      check(same(q.objectiveIds,expected),`${q.id}: practice mapped to another knowledge point`);
    }
    for (const q of [...lesson.practice,...lesson.examStyleQuestions]) {
      const prompt=q.prompt ?? q.task, points=q.answerPoints ?? q.markLogic;
      check(!questionIds.has(q.id),`${q.id}: duplicate question identifier`); questionIds.add(q.id); questions.set(q.id,q);
      check(!prompts.has(normalise(prompt)),`${q.id}: duplicate question prompt`); prompts.add(normalise(prompt));
      check(q.objectiveIds?.length && q.objectiveIds.every((id)=>objectiveIds.includes(id)),`${q.id}: invalid objective mapping`);
      check(q.marks === points?.length && q.marks > 0,`${q.id}: marking points do not match marks`);
      check(!placeholder.test(prompt + points?.join(" ")),`${q.id}: generic or mismatched task/answer`);
      if (q.task) {
        const clauses=[...new Set(q.objectiveIds.map((id)=>Number(id.slice(3,5))<=4 ? "8.1" : Number(id.slice(3,5))<=6 ? "8.2" : "8.3"))];
        check(clauses.every((c)=>q.sourceRef.includes(c)),`${q.id}: wrong official syllabus attribution`);
        for (const p of lesson.practice) {
          const overlap=points.filter((point)=>p.answerPoints.some((answer)=>normalise(answer)===normalise(point))).length;
          check(overlap < Math.ceil(points.length * .75),`${q.id}: practice answer recycled as exam answer`);
        }
      }
      if (q.sqlCase) {
        const ref=section8SqlCases[q.sqlCase];
        check(ref && q.answerCode === ref.sql,`${q.id}: SQL answer differs from executed case`);
        if (ref?.headers) check(same(q.answerTable?.headers,ref.headers) && same(q.answerTable?.rows,ref.expectedRows),`${q.id}: SQL result table differs from executed case`);
      }
    }
  }
  check(units.size === 37 && allObjectives.size === 40,"S8 requires 37 taught units covering 40 objectives");
  const points=(id)=>(questions.get(id)?.answerPoints ?? questions.get(id)?.markLogic ?? []).join(" ");
  check(/repeating group|atomic/i.test(points("S8-L02-EXAM-2")) && /Membership/.test(points("S8-L02-EXAM-2")),"1NF exam has an unrelated answer");
  check(/OrderItem/.test(points("S8-L02-Q2")) && /70, P4, 2/.test(points("S8-L02-Q2")),"1NF practice lost its actual rows");
  check(/Book/.test(points("S8-L02-Q1")) && /Copy/.test(points("S8-L02-Q1")) && /Loan/.test(points("S8-L02-Q1")),"E-R answer does not use the library scenario");
  check(questions.get("S8-L05-Q1")?.code && questions.get("S8-L05-Q1")?.table?.rows.length,"SQL reading task lacks its statement or data");
  for (const id of ["S8-L06-Q5","S8-L06-EXAM-1"]) check(questions.get(id)?.tables?.length === 2,`${id}: join task lacks both input tables`);
  const readUnit=units.get("S8.08-READ"), types=units.get("S8.09-TYPES"), aggregate=units.get("S8.10-AGGREGATES");
  check(readUnit?.workedExample?.steps.some(([,t])=>t.includes("SELECT Title, Price")),"SQL interpretation teaching lacks actual SQL");
  for (const term of ["CHARACTER(1)","VARCHAR(40)","BOOLEAN","INTEGER","REAL","DATE","TIME","PRIMARY KEY","FOREIGN KEY"]) check(JSON.stringify(types).includes(term),`DDL teaching lacks ${term}`);
  check(/COUNT\(\*\)/.test(aggregate?.coreExplanation.join(" ")) && /ignore null/i.test(aggregate?.coreExplanation.join(" ")),"Aggregate explanation conflates null with zero");
  const review=lessons.find((l)=>l.lessonKey === "REV-P1");
  for (let n=1;n<=11;n++) check(review?.practice.some((q)=>q.id.startsWith("REV-P1-S8-") && q.objectiveIds.includes(`S8.${String(n).padStart(2,"0")}.R`)),`S8.${n}: review practice gap`);
  check(!review?.practice.some((q)=>q.id === "V3-Q-L045-02"),"Unmapped legacy review question returned");
  const set=bank.sets.find((s)=>s.id === "SECTION-8-CHECK"), mock=bank.sets.find((s)=>s.id === "PAPER-1-MOCK");
  check(set?.questions.reduce((n,q)=>n+q.marks,0) === 20,"S8 section check must total 20 marks");
  check(mock?.questions.reduce((n,q)=>n+q.marks,0) === 75,"Paper 1 mock total changed");
  const assessment=[...(set?.questions ?? []),...(mock?.questions.filter((q)=>q.section === 8) ?? [])];
  for (const q of assessment) {
    check(!placeholder.test(q.prompt),`${q.id}: unspecified assessment premise`);
    check(q.answerPoints?.length === q.marks && q.marks > 0,`${q.id}: incomplete assessment marking`);
    check(q.objectiveIds?.length && q.objectiveIds.every((id)=>allObjectives.has(id)),`${q.id}: invalid assessment mapping`);
    if (q.sqlCase) check(q.answerCode === section8SqlCases[q.sqlCase]?.sql,`${q.id}: assessment SQL differs from executed case`);
  }
  check(assessment.find((q)=>q.id === "A-S8-5")?.tables?.length === 2,"Section check query has no input tables");
  check(assessment.find((q)=>q.id === "A-P1-8")?.tables?.length === 2,"Paper 1 S8 query has no input tables");
  return errors;
}

export function validateSection8Html(lessons, readHtml) {
  const errors=[], check=(ok,why)=>{if(!ok)errors.push(why);};
  for (const l of lessons.filter((l)=>l.section === 8)) {
    const html=readHtml(l);
    check(html.includes('class="lesson-toc"'),`${l.lessonKey}: missing teaching contents`);
    check((html.match(/class="unit-checkpoint"/g)??[]).length === l.units.length,`${l.lessonKey}: formative checks not rendered`);
    for (let i=1;i<=l.units.length;i++) check(html.includes(`href="#unit-${i}"`) && html.includes(`id="unit-${i}"`),`${l.lessonKey}: broken unit-${i} anchor`);
    for (const [i,u] of l.units.entries()) {
      const start=html.indexOf(`<article class="knowledge-unit" id="unit-${i+1}"`), end=html.indexOf('</article>',start);
      const unitHtml=html.slice(start,end), lead=unitHtml.split('data-role="core-explanation"')[0];
      const path=`../../assets/course-v3/section-8/${section8VisualPlacements.find(v=>v.unitKey===u.unitKey).file}`;
      check(lead.includes(`src="${path}" width="`) && lead.includes(`href="${path}" target="_blank"`) && lead.includes('class="visual-scroll" tabindex="0" role="region"') && lead.includes('class="visual-transcript"'), `${u.unitKey}: diagram placement, dimensions, keyboard scrolling or full-size access missing`);
    }
    check((html.match(/<details class="paper-marking-points">/g)??[]).length === 3,`${l.lessonKey}: exam answers not initially collapsed`);
    check(!html.includes('aria-label="Supplied assembly program"'),`${l.lessonKey}: SQL incorrectly labelled assembly`);
    for (const q of [...l.practice,...l.examStyleQuestions].filter((q)=>q.answerCode)) check(html.includes(q.answerCode.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")),`${q.id}: SQL answer omitted from HTML`);
  }
  return errors;
}
