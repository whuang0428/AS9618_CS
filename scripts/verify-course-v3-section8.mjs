import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { courseV3Lessons } from "./course-v3-content.mjs";
import { validateSection8Presentation, validateSection8Html } from "./course-v3-section8-checks.mjs";
import { section8Databases, section8SqlCases, section8Ddl } from "./course-v3-section8-sql.mjs";
import { officialAsMapping } from "./syllabus-official-as-mapping.mjs";
import { section8VisualPlacements } from "./course-v3-section8-visuals.mjs";
import { section8DiagramFiles } from "./course-v3-section8-diagrams.mjs";

const bank=JSON.parse(readFileSync(new URL("./assessment-bank-contract.json",import.meta.url),"utf8"));
const readHtml=(l)=>readFileSync(new URL(`../web/course-v3/${l.route}/index.html`,import.meta.url),"utf8");
const errors=[...validateSection8Presentation(courseV3Lessons,bank),...validateSection8Html(courseV3Lessons,readHtml)];
if (!JSON.stringify(officialAsMapping["S8.08"]).includes("Understand a given SQL statement") || JSON.stringify(officialAsMapping["S8.08"]).includes("SQL (DDL)")) errors.push("S8.08 must be general SQL interpretation, separate from S8.09 DDL");
if(errors.length) throw new Error(errors.join("\n"));
const imageManifest=JSON.parse(readFileSync(new URL("./course-v3-section8-imagegen-assets.json",import.meta.url),"utf8"));
const exactDiagrams=section8DiagramFiles();
if(section8VisualPlacements.length !== 37 || new Set(section8VisualPlacements.map(v=>v.file)).size !== 37 || new Set(section8VisualPlacements.map(v=>v.unitKey)).size !== 37 || Object.keys(exactDiagrams).length !== 30 || imageManifest.tool !== "image_gen.imagegen" || imageManifest.entries.length !== 7) throw new Error("S8 requires 37 distinct diagrams: 30 exact SVGs and 7 recorded ImageGen illustrations");
for(const {file,unitKey} of section8VisualPlacements) {
  const bytes=readFileSync(new URL(`../web/assets/course-v3/section-8/${file}`,import.meta.url));
  if(file.endsWith(".svg")) {
    if(bytes.toString("utf8") !== exactDiagrams[file]) throw new Error(`S8 generated diagram is stale: ${file}`);
  } else {
    const entry=imageManifest.entries.find(e=>e.file===file && e.unitKey===unitKey);
    if(!entry?.prompt?.length || createHash("sha256").update(bytes).digest("hex") !== entry.sha256 || bytes.subarray(1,4).toString("ascii") !== "PNG" || bytes.readUInt32BE(16) < 1024) throw new Error(`S8 diagram provenance, file integrity or resolution failed: ${file}`);
  }
}
console.log("S8 visuals: 37 unique placements, 30 reproducible SVGs, 7 reviewed ImageGen PNGs with verified provenance.");
const l5=courseV3Lessons.find((l)=>l.lessonKey === "S8-L05");
const payload={databases:section8Databases,cases:section8SqlCases,ddl:section8Ddl,readPractice:l5.practice[0].code,createDatabaseAnswer:l5.practice[1].answerCode};
const verifySql=(p)=>execFileSync("python3",[new URL("./verify-course-v3-section8-sql.py",import.meta.url).pathname],{input:JSON.stringify(p),encoding:"utf8",stdio:["pipe","pipe","pipe"]});
process.stdout.write(verifySql(payload));
if(process.argv.includes("--self-test")) {
  const lesson=(ls,n)=>ls.find((l)=>l.lessonKey === `S8-L0${n}`);
  const mutations=[
    ["copied core",ls=>{lesson(ls,2).units[0].coreExplanation[0]=lesson(ls,1).units[0].coreExplanation[0];}],
    ["wrong unit mapping",ls=>{lesson(ls,1).units[3].objectiveIds=["S8.02.A02"];}],
    ["wrong practice mapping",ls=>{lesson(ls,6).practice[4].objectiveIds=["S8.10.A01"];}],
    ["duplicate question",ls=>{lesson(ls,6).practice[0].prompt=lesson(ls,5).practice[0].prompt;}],
    ["missing query",ls=>{delete lesson(ls,5).practice[0].code;}],
    ["missing join input",ls=>{lesson(ls,6).practice[4].tables.pop();}],
    ["wrong SQL result",ls=>{lesson(ls,6).practice[5].answerTable.rows=[[5,12,6]];}],
    ["unrelated 1NF answer",ls=>{lesson(ls,2).examStyleQuestions[1].markLogic=["A many-to-many relationship.","Use a linking entity.","Identify the keys."];}],
    ["borrowed practice solution",ls=>{const l=lesson(ls,1);l.examStyleQuestions[0].markLogic=[...l.practice[0].answerPoints];}],
    ["missing checkpoint",ls=>{delete lesson(ls,4).units[0].checkpoint;}],
    ["misplaced diagram",ls=>{lesson(ls,1).units[0].leadVisual.asset="/assets/course-v3/section-8/query-processor.png";}],
    ["missing diagram transcript",ls=>{lesson(ls,2).units[1].leadVisual.facts=[];}],
    ["incorrect official clause",ls=>{lesson(ls,5).examStyleQuestions[0].sourceRef="Cambridge syllabus 3.1";}],
    ["review gap",ls=>{const r=ls.find((l)=>l.lessonKey === "REV-P1");r.practice=r.practice.filter((q)=>q.id !== "REV-P1-S8-Q4");}],
    ["placeholder assessment",(_,b)=>{b.sets.find((s)=>s.id === "SECTION-8-CHECK").questions[0].prompt="Connect two ideas in a fresh context.";}],
    ["assessment marks",(_,b)=>{b.sets.find((s)=>s.id === "SECTION-8-CHECK").questions[0].answerPoints=[];}],
  ];
  for(const [name,mutate] of mutations){const ls=structuredClone(courseV3Lessons),b=structuredClone(bank);mutate(ls,b);if(!validateSection8Presentation(ls,b).length)throw new Error(`Uncaught S8 mutation: ${name}`);}
  const htmlMutations=[
    html=>html.replaceAll('<details class="paper-marking-points">','<details class="paper-marking-points" open>'),
    html=>html.replace('id="unit-1"','id="wrong-unit-1"'),
    html=>html.replace('class="unit-checkpoint"','class="lost-checkpoint"'),
    html=>html.replaceAll('target="_blank"','target="_self"'),
    html=>html.replace('class="visual-scroll" tabindex="0"','class="visual-scroll"'),
  ];
  for(const mutate of htmlMutations)if(!validateSection8Html(courseV3Lessons,l=>mutate(readHtml(l))).length)throw new Error("Uncaught S8 HTML mutation");
  const sqlMutations=[p=>{p.cases.filter.sql=p.cases.filter.sql.replace("AND","OR");},p=>{p.cases.qUpdate.sql="UPDATE Stock SET Quantity = 8;";},p=>{p.cases.nullAggregate.expectedRows=[[3,3,6,2]];},p=>{p.ddl.tables=p.ddl.tables.replace("REFERENCES Tutor(TutorID)","REFERENCES Tutor(TutorName)");}];
  for(const mutate of sqlMutations){const p=structuredClone(payload);mutate(p);let caught=false;try{verifySql(p);}catch{caught=true;}if(!caught)throw new Error("Uncaught S8 SQL mutation");}
  console.log(`S8 self-test: ${mutations.length + htmlMutations.length + sqlMutations.length} negative mutations rejected.`);
}
console.log("S8 verified: 6 lessons, 37 units, 40 objectives, 37 practice questions, 18 independent exam tasks, 4 review tasks; section check 20 marks, Paper 1 S8 question 10 marks.");
