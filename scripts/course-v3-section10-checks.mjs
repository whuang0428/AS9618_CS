import { section10Assessments } from "./course-v3-section10-content.mjs";
import { codeFor } from "./course-v3-section10-programs.mjs";
import { diagramFor, section10Diagrams } from "./course-v3-section10-diagrams.mjs";
import { validateCoreBlocks } from "./course-v3-core-blocks.mjs";
import { mechanismVisual } from "./course-v3-mechanism-diagrams.mjs";

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const ids = (r, ...ns) => ns.map(n => `S10.${String(r).padStart(2, "0")}.A${String(n).padStart(2, "0")}`);
const ownership = {
  "TYPES-VALUES": ids(1, 1, 2, 3, 4, 5), "TYPES-COLLECTIONS": ids(1, 6), "RECORD-DEFINITION": ids(2, 1, 2), "RECORD-ACCESS": ids(2, 3),
  "ARRAY-TERMS": ids(3, 1), "ARRAY-BOUNDS": ids(3, 2), "ONE-DIMENSION-CHOICE": ids(4, 1), "ONE-DIMENSION-CODE": ids(5, 1),
  "TWO-DIMENSION-CHOICE": ids(4, 1), "TWO-DIMENSION-CODE": ids(5, 1), "LINEAR-METHOD": ids(6, 1), "LINEAR-CODE": ids(6, 1),
  "BUBBLE-PASSES": ids(6, 2), "BUBBLE-CODE": ids(6, 2), "FILE-PERSISTENCE": ids(7, 1), "FILE-READ": ids(7, 2), "FILE-WRITE": ids(7, 2),
  "ADT-CONTRACT": ids(8, 1), "ADT-REPRESENTATION": ids(8, 1), "STACK-BEHAVIOUR": ids(9, 1), "STACK-ARRAY": ids(10, 1, 4),
  "QUEUE-BEHAVIOUR": ids(9, 2), "QUEUE-ARRAY": ids(10, 2, 4), "LINKED-FEATURES": ids(9, 3), "LINKED-OPERATIONS": ids(10, 3, 4),
  "IMPLEMENT-BOUNDS": ids(10, 1, 2, 4), "IMPLEMENT-FREE-LIST": ids(10, 3, 4), "COMBINE-INDEXED": ids(4, 1), "COMBINE-ACCESS": ids(9, 1, 2, 3),
};
const visualOwnership = { "TWO-DIMENSION-CHOICE": "matrix", "BUBBLE-PASSES": "bubble", "STACK-BEHAVIOUR": "stack", "QUEUE-ARRAY": "queue", "LINKED-FEATURES": "linked", "COMBINE-INDEXED": "choice" };
const placeholder = /fresh context|plausible student error|main method from|two alternatives from Section|Key focus:|Explain (?:apply|use)|Without notes, explain how the/i;
export function validateSection10Presentation(lessons, bank) {
  const errors = [], check = (ok, text) => { if (!ok) errors.push(text); };
  const section = lessons.filter(l => l.section === 10), paragraphs = new Set(), prompts = new Set(), units = new Map();
  check(same(section.map(l => l.lessonKey), Array.from({ length: 14 }, (_, i) => `S10-L${String(i + 1).padStart(2, "0")}`)), "S10 lesson order changed");
  check(same([...new Set(section.flatMap(l => l.syllabusIds))], Array.from({ length: 10 }, (_, i) => `S10.${String(i + 1).padStart(2, "0")}`)), "S10 official requirement introduction order changed");
  check(new Set(section.flatMap(l => l.objectives.map(([id]) => id))).size === 25, "S10 requires all 25 atomic objectives");
  for (const l of section) {
    const objectives = l.objectives.map(([id]) => id);
    check(same([...new Set(l.units.flatMap(u => u.objectiveIds))], objectives), `${l.lessonKey}: unit objectives out of order`);
    check(l.diagnostic?.prompt && l.diagnostic?.answer, `${l.lessonKey}: missing diagnostic`);
    check(l.summaryMode === "authored" && l.summary.every(([, body]) => body.split(" ").length >= 7), `${l.lessonKey}: inadequate summary`);
    check(l.units.some(u => u.workedExample), `${l.lessonKey}: missing worked example`);
    for (const id of objectives) check(l.practice.some(q => q.objectiveIds.includes(id)), `${id}: missing practice coverage`);
    for (const u of l.units) {
      const key = u.unitKey?.replace(/^S10-/, ""); units.set(key, u);
      check(same(u.objectiveIds, ownership[key]), `${u.unitKey}: wrong knowledge-point ownership`);
      check(same(u.leadVisual.objectiveIds, u.objectiveIds), `${u.unitKey}: visual objective mismatch`);
      check(u.coreExplanation.length >= 2 && !placeholder.test(u.coreExplanation.join(" ")), `${u.unitKey}: generic or incomplete explanation`);
      errors.push(...validateCoreBlocks(u));
      check(u.checkpoint?.prompt && u.checkpoint?.answer, `${u.unitKey}: missing formative check`);
      for (const p of u.coreExplanation) { const sig = norm(p); check(!paragraphs.has(sig), `${u.unitKey}: duplicated core paragraph`); paragraphs.add(sig); }
      const graph = visualOwnership[key];
      if (graph) {
        const expectedVisual = key === "QUEUE-ARRAY" ? mechanismVisual("queue-state") : diagramFor(graph);
        check(u.leadVisual.asset === expectedVisual.asset, `${u.unitKey}: wrong diagram`);
        check(same(u.leadVisual.facts, expectedVisual.facts), `${u.unitKey}: visual transcript drift`);
      }
      for (const m of [u.workedExample, ...(u.supportingMaterials ?? [])].filter(Boolean)) {
        if (m.programKey) check(m.steps.some(([, text]) => text === codeFor(m.programKey)), `${u.unitKey}: published code differs from executed program`);
      }
    }
    for (const q of [...l.practice, ...l.examStyleQuestions]) {
      const prompt = q.prompt ?? q.task, points = q.answerPoints ?? q.markLogic, sig = norm(prompt);
      check(!prompts.has(sig), `${q.id}: duplicated question`); prompts.add(sig);
      check(!placeholder.test(prompt), `${q.id}: placeholder or malformed question`);
      check(q.objectiveIds.length && q.objectiveIds.every(id => objectives.includes(id)), `${q.id}: foreign objective`);
      check(q.marks === points.length && new Set(points.map(norm)).size === points.length, `${q.id}: invalid or duplicated scoring points`);
      if (q.programKey) check(q.code === codeFor(q.programKey), `${q.id}: supplied code drift`);
      if (q.answerProgramKey) check(q.answerCode === codeFor(q.answerProgramKey), `${q.id}: answer code drift`);
      if (q.task) {
        const clauses = [...new Set(q.objectiveIds.map(id => { const r = Number(id.slice(4, 6)); return r <= 2 ? "10.1" : r <= 6 ? "10.2" : r === 7 ? "10.3" : "10.4"; }))];
        check(clauses.every(c => q.sourceRef.includes(c)), `${q.id}: incorrect official source clause`);
        for (const p of l.practice) {
          const overlap = points.filter(pt => p.answerPoints.some(ap => norm(ap) === norm(pt))).length;
          check(overlap < Math.ceil(points.length / 2), `${q.id}: recycled practice marking points`);
        }
      }
    }
  }
  check(units.size === 29, "S10 requires 29 distinct units with complete core explanations");
  check(units.get("BUBBLE-PASSES")?.method?.title === "Bubble sort procedure", "Bubble sort labelled as linear search");
  const fileMaterials = [units.get("FILE-WRITE")?.workedExample, ...(units.get("FILE-WRITE")?.supportingMaterials ?? [])];
  check(fileMaterials.some(m => m?.programKey === "writeFile") && fileMaterials.some(m => m?.programKey === "appendFile"), "Missing complete WRITE or APPEND worked example");
  const queueAnswer = section[10]?.examStyleQuestions[0]?.markLogic.join(" ") ?? "";
  check(/Lee, Mo and Pat/.test(queueAnswer) && /queue/i.test(queueAnswer) && !/stack/i.test(queueAnswer), "Queue question has a mismatched stack answer");
  const review = lessons.find(l => l.lessonKey === "REV-P2");
  for (let n = 1; n <= 10; n++) check(review?.practice.some(q => q.id.startsWith("REV-P2-S10-") && q.objectiveIds.includes(`S10.${String(n).padStart(2, "0")}.R`)), `S10.${n}: missing integrated review practice`);
  check(review?.units.find(u => u.unitKey === "S10-REVIEW")?.objectiveIds.every(id => id.startsWith("S10.")), "S10 review has foreign objectives");
  for (const authored of section10Assessments) {
    const actual = bank.sets.flatMap(s => s.questions).find(q => q.id === authored.id);
    check(same(actual, authored), `${authored.id}: assessment content drift`);
    check(authored.answerPoints.length === authored.marks, `${authored.id}: incorrect mark total`);
  }
  check(bank.sets.find(s => s.id === "SECTION-10-CHECK")?.questions.reduce((n, q) => n + q.marks, 0) === 20, "S10 check must total 20 marks");
  check(bank.sets.find(s => s.id === "PAPER-2-MOCK")?.questions.reduce((n, q) => n + q.marks, 0) === 75, "Paper 2 mock must remain 75 marks");
  return errors;
}
export function validateSection10Diagrams(diagrams = section10Diagrams) {
  const errors = [], check = (ok, text) => { if (!ok) errors.push(text); };
  const bubble = diagrams.bubble.rows.map(row => row.slice(1));
  check(bubble.every(row => row.length === 7 && same([...row].sort((a, b) => a - b), [1, 2, 3, 4, 5, 7, 8])), "Bubble diagram loses, adds or changes an element");
  let values = [5, 1, 4, 2, 8, 3, 7];
  check(same(bubble[0], values), "Bubble diagram input changed");
  for (let pass = 1; pass <= 4; pass++) {
    for (let index = 0; index < 7 - pass; index++) if (values[index] > values[index + 1]) [values[index], values[index + 1]] = [values[index + 1], values[index]];
    check(same(bubble[pass], values), `Bubble diagram pass ${pass} incorrect`);
  }
  check(same(diagrams.matrix.rows, [["Row 1", "4 · visit 1", "7 · visit 2", "2 · visit 3"], ["Row 2", "8 · visit 4", "1 · visit 5", "6 · visit 6"]]), "Matrix values or ascending traversal incorrect");
  check(same(diagrams.stack.rows.at(-1), ["POP returns C", "A", "B", "unused", 2]), "Stack diagram violates LIFO or Top state");
  check(same(diagrams.queue.rows.at(-1), ["ENQUEUE D: wrap", "D", "B", "C", "2 / 1 / 3"]), "Queue wrap diagram has wrong data or state");
  const nodes = new Map(diagrams.linked.rows.map(row => [row[0], row]));
  let pointer = 2; const output = [], seen = new Set();
  while (pointer !== 0 && !seen.has(pointer) && nodes.has(pointer)) { seen.add(pointer); const node = nodes.get(pointer); output.push(node[1]); pointer = node[2]; }
  check(pointer === 0 && same(output, ["A", "B", "C"]), "Linked-list diagram has an invalid chain");
  check(diagrams.choice.rows.every(row => /[12]D array/.test(row[1]) && !/\]\[/.test(row[2])), "Array-choice diagram has foreign content or non-Cambridge indexing");
  return errors;
}
export function validateSection10Html(lessons, readHtml) {
  const errors = [], check = (ok, text) => { if (!ok) errors.push(text); };
  for (const l of lessons.filter(l => l.section === 10)) {
    const html = readHtml(l);
    check(html.includes('class="lesson-toc"') && html.includes('class="diagnostic"'), `${l.lessonKey}: missing navigation or diagnostic`);
    check((html.match(/class="unit-checkpoint"/g) ?? []).length === l.units.length, `${l.lessonKey}: missing unit checks`);
    for (let i = 1; i <= l.units.length; i++) check(html.includes(`href="#unit-${i}"`) && html.includes(`id="unit-${i}"`), `${l.lessonKey}: broken unit link ${i}`);
    check((html.match(/<details class="paper-marking-points">/g) ?? []).length === 3, `${l.lessonKey}: exam answers must start collapsed`);
    check(!/<details class="paper-marking-points"[^>]*\bopen/.test(html), `${l.lessonKey}: exam answer exposed initially`);
    for (const image of html.matchAll(/<div class="visual-scroll"([^>]*)>/g)) check(image[1].includes('tabindex="0"'), `${l.lessonKey}: visual is not keyboard-scrollable`);
    check((html.match(/class="diagram-full-size"/g) ?? []).length === l.units.filter(u => u.leadVisual.type === "reviewed-visual").length, `${l.lessonKey}: missing full-size diagram access`);
    check(!/search-sort\.png|array-pseudocode\.png|data-structure-choice\.png/.test(html), `${l.lessonKey}: defective legacy image still rendered`);
  }
  return errors;
}
