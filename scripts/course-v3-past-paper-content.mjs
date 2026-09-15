import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import s1 from './past-paper-teaching/section-1.mjs';
import s2 from './past-paper-teaching/section-2.mjs';
import s3 from './past-paper-teaching/section-3.mjs';
import s4 from './past-paper-teaching/section-4.mjs';
import s5 from './past-paper-teaching/section-5.mjs';
import s6 from './past-paper-teaching/section-6.mjs';
import s7 from './past-paper-teaching/section-7.mjs';
import s8 from './past-paper-teaching/section-8.mjs';
import s9 from './past-paper-teaching/section-9.mjs';
import s10 from './past-paper-teaching/section-10.mjs';
import s11 from './past-paper-teaching/section-11.mjs';
import s12 from './past-paper-teaching/section-12.mjs';
import r1 from './past-paper-teaching/review-1.mjs';
import r2 from './past-paper-teaching/review-2.mjs';

const read = file => JSON.parse(readFileSync(new URL(file, import.meta.url),'utf8'));
const approved = read('../docs/practice-past-paper-review-20260915/selection-registry.json');
const manifest = read('./past-paper-source-manifest.json');
const cropSpecs = read('./past-paper-extracts.json');
const digest = value => createHash('sha256').update(value).digest('hex');
function checkSource(source, approvedSelection) {
  if (source.sourceType !== 'past-paper') throw new Error(`Unregistered source type: ${source.id}`);
  const spec = cropSpecs[source.id];
  const geometry = Object.fromEntries(['insert','ms','qp'].filter(key => key in spec).map(key => [key,spec[key]]));
  if (source.extractReview?.status !== 'verified' || source.extractReview.cropSpecSha256 !== digest(JSON.stringify(geometry))) throw new Error(`Past-paper extract needs visual review: ${source.id}`);
  for (const key of ['lesson','syllabusCode','year','series','component','parts','marks','syllabusMapping']) {
    if (JSON.stringify(source[key]) !== JSON.stringify(approvedSelection[key])) throw new Error(`Past-paper identity differs from approved selection: ${source.id} ${key}`);
  }
  for (const kind of ['qp','ms']) {
    if (source[kind]?.extracts.length !== spec[kind].length || !source[kind].extracts.length || source[kind].filename !== approvedSelection[kind].filename || source[kind].sha256 !== approvedSelection[kind].sha256) throw new Error(`Missing or changed official source: ${source.id} ${kind}`);
  }
  if (source.inserts.length !== (spec.insert ?? []).length) throw new Error(`Missing insert material: ${source.id}`);
  for (const extract of [...source.qp.extracts,...source.ms.extracts,...source.inserts]) {
    if (digest(readFileSync(new URL('../web'+extract.asset,import.meta.url))) !== extract.sha256) throw new Error(`Official extract changed: ${extract.asset}`);
  }
}
export const pastPaperTeaching = Object.freeze({...s1,...s2,...s3,...s4,...s5,...s6,...s7,...s8,...s9,...s10,...s11,...s12,...r1,...r2});
const connections = {
  45: {text:'Use Practice to distinguish changes to a database structure from changes to its data. Apply that distinction in the original SQL questions in the next two lessons.',lessons:[46,47]},
  52: {text:'Use Practice to connect input, processing and output in a complete small program. Revisit those decisions when refining an algorithm and when storing and reversing an input sequence.',lessons:[55,61]},
  63: {text:'Use Practice to trace a complete search, including a missing item. Apply the search method to finding the first unused loan record after learning functions and record updates.',lessons:[82]},
  64: {text:'Use Practice to trace comparisons, swaps and early termination. The integrated review applies these steps to two-dimensional data whose paired values must remain together.',lessons:[93]},
  66: {text:'Use Practice to distinguish an abstract data type from its representation. The following lessons use original questions to trace stack, queue and linked-list operations.',lessons:[67,68,69,70,71]}
};
const exactObjectives = {
 E062:['S8.10.A01','S8.10.A04','S8.10.A05','S8.10.A06'],
 E063:['S8.11.A03']
};
export function applyPastPaperTeaching(lessons) {
  if (approved.length !== manifest.questions.length || approved.some(e=>!pastPaperTeaching[e.id] || !manifest.questions.some(q=>q.id===e.id))) throw new Error('Past-paper sources and teacher answers must cover the approved selection.');
  return lessons.map(lesson => {
    const {examStyleQuestions, pastPaper, ...base} = lesson;
    const pastPaperQuestions = approved.filter(e=>e.lesson===lesson.sequenceIndex).map(e=>{
      const source=manifest.questions.find(q=>q.id===e.id);
      checkSource(source,e);
      const teacher=pastPaperTeaching[e.id];
      const objectiveIds=exactObjectives[e.id] ?? lesson.objectives.map(([id])=>id).filter(id=>e.syllabusMapping.some(s=>id===s || id.startsWith(s+'.')));
      if (!objectiveIds.length || objectiveIds.some(id=>!lesson.objectives.some(([known])=>known===id))) throw new Error(`Invalid past-paper objective mapping: ${e.id}`);
      for(const key of ['reading','solution','marking','mistakes']) if(!teacher[key]?.length) throw new Error(`Missing ${key} for ${e.id}`);
      return {...source,...teacher,objectiveIds,sourceRef:`Cambridge ${e.syllabusCode}/${e.component} · ${e.series === 'Oct/Nov' ? 'October/November' : e.series} ${e.year} · ${e.parts.map(p=>p.part).join(', ')}`,accessUrl:'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/past-papers/'};
    });
    return {...base,pastPaperQuestions,examConnection:connections[lesson.sequenceIndex]??null,
      sources:[...base.sources.filter(s=>!/(Original teacher-authored|not reproduced|original exam-style|equivalent tasks)/i.test(s)), 'Selected Cambridge past-paper questions and official mark schemes are reproduced faithfully from verified source pages. Teacher explanations and Practice answers are identified separately.']};
  });
}
