const normalise = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const requirement = (id) => id.replace(/\.(?:A\d+|R)$/, "");

// Independent acceptance criteria for the S5 audit defects: ownership, scoring,
// copy-through, missing teaching steps and observable execution state.
export function validateSection5Presentation(lessons, assessmentBank) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const section = lessons.filter((l) => l.section === 5);
  const expectedOrder = Array.from({ length: 7 }, (_, i) => `S5.${String(i + 1).padStart(2, "0")}`);
  check(same(section.map((l) => l.lessonKey), ["S5-L01", "S5-L02", "S5-L03", "S5-L04", "S5-L05"]), "S5 must retain five lessons in order");
  check(same([...new Set(section.flatMap((l) => l.syllabusIds))], expectedOrder), "S5 syllabus order is incorrect");
  const questions = new Map(), prompts = new Map(), paragraphs = new Map();
  const allObjectives = new Set(section.flatMap((l) => l.objectives.map(([id]) => id)));
  for (const lesson of section) {
    const ownObjectives = new Set(lesson.objectives.map(([id]) => id));
    check(same([...new Set(lesson.units.flatMap((u) => u.objectiveIds))], [...ownObjectives]), `${lesson.lessonKey}: teaching units do not introduce objectives in syllabus order`);
    check(lesson.units.some((u) => u.workedExample?.steps.length >= 3), `${lesson.lessonKey}: no substantial worked example`);
    check(lesson.summaryMode === "authored" && !/Key focus:/.test(JSON.stringify(lesson.summary)), `${lesson.lessonKey}: summary is a keyword list`);
    check(lesson.diagnostic?.prompt && lesson.diagnostic?.answer, `${lesson.lessonKey}: missing prior-knowledge check`);
    for (const id of ownObjectives) {
      check(lesson.units.some((u) => u.objectiveIds.includes(id)), `${id}: no owning knowledge unit`);
      check(lesson.practice.some((q) => q.objectiveIds.includes(id)), `${id}: no matching practice`);
    }
    for (const u of lesson.units) {
      check(u.objectiveIds.length > 0 && u.objectiveIds.every((id) => ownObjectives.has(id)), `${u.unitKey}: invalid ownership`);
      check(same(u.leadVisual.objectiveIds, u.objectiveIds), `${u.unitKey}: visual and knowledge point are misaligned`);
      check(u.checkpoint?.prompt && u.checkpoint?.answer, `${u.unitKey}: no formative check`);
      check(u.coreExplanation.length >= 2, `${u.unitKey}: insufficient explanation`);
      check(["flow", "table"].includes(u.leadVisual.type), `${u.unitKey}: expected an authored diagram/table`);
      for (const p of u.coreExplanation) {
        const key = normalise(p);
        for (const [other, owner] of paragraphs) check(!(key === other || (Math.min(key.length, other.length) > 100 && (key.includes(other) || other.includes(key)))), `${u.unitKey}: core repeats ${owner}`);
        paragraphs.set(key, u.unitKey);
      }
    }
    for (const q of [...lesson.practice, ...lesson.examStyleQuestions]) {
      check(!questions.has(q.id), `${q.id}: duplicate question ID`);
      questions.set(q.id, q);
      check(q.objectiveIds.length > 0 && q.objectiveIds.every((id) => ownObjectives.has(id)), `${q.id}: absent/foreign objective`);
      const key = normalise(q.prompt ?? q.task);
      check(!prompts.has(key), `${q.id}: duplicate prompt from ${prompts.get(key)}`);
      prompts.set(key, q.id);
      check(!/fresh context|technical ideas represented|development team preparing software|^Compare [^.?!]+ from|main method from/i.test(q.prompt ?? q.task), `${q.id}: generic or malformed task`);
      const points = q.answerPoints ?? q.markLogic;
      check(q.marks === points.length && points.every((p) => p.trim().length > 8), `${q.id}: incomplete or incorrectly scored answer`);
    }
    for (const exam of lesson.examStyleQuestions) {
      const clause = lesson.lessonKey < "S5-L03" ? "5.1" : "5.2";
      check(exam.sourceRef.startsWith(`Cambridge 9618 syllabus ${clause} · `) && !/Q\d|9618\//.test(exam.sourceRef), `${exam.id}: wrong syllabus/paper attribution`);
    }
  }
  const practice = section.flatMap((l) => l.practice);
  for (const exam of section.flatMap((l) => l.examStyleQuestions)) for (const q of practice) {
    const practicePoints = new Set(q.answerPoints.map(normalise));
    check(!exam.markLogic.some((p) => practicePoints.has(normalise(p))), `${exam.id}: copies a scoring point from ${q.id}`);
  }
  const mapped = (id, expected) => check(same(questions.get(id)?.objectiveIds, expected), `${id}: wrong explicit knowledge-point mapping`);
  for (let n = 1; n <= 6; n++) mapped(`S5-L01-Q${n}`, [`S5.01.A0${n}`]);
  for (let n = 1; n <= 6; n++) mapped(`S5-L02-Q${n}`, [`S5.02.A0${n}`]);
  mapped("S5-L02-Q7", ["S5.03.A01", "S5.03.A02"]);
  mapped("S5-L02-Q8", ["S5.03.A03"]);
  for (let n = 1; n <= 3; n++) mapped(`S5-L03-Q${n}`, [`S5.04.A0${n}`]);
  mapped("S5-L04-Q1", ["S5.05.A01"]); mapped("S5-L04-Q2", ["S5.05.A02"]); mapped("S5-L04-Q3", ["S5.06.A01"]);
  mapped("S5-L05-Q1", ["S5.07.A01"]); mapped("S5-L05-Q2", ["S5.07.A02", "S5.07.A08"]);
  mapped("S5-L05-Q3", ["S5.07.A03", "S5.07.A04"]); mapped("S5-L05-Q4", ["S5.07.A05", "S5.07.A06", "S5.07.A07"]);
  mapped("S5-L01-EXAM-1", ["S5.01.A06"]);
  mapped("S5-L04-EXAM-3", ["S5.06.A01"]);
  mapped("S5-L05-EXAM-1", ["S5.07.A01", "S5.07.A02", "S5.07.A07"]);
  const answer = (id) => JSON.stringify(questions.get(id)?.markLogic ?? questions.get(id)?.answerPoints ?? []);
  check(/schedul/i.test(answer("S5-L01-EXAM-1")) && /execution.*preserv/i.test(answer("S5-L01-EXAM-1")) && /switch/i.test(answer("S5-L01-EXAM-1")), "S5 process-management answer does not explain scheduling, saved state and switching");
  check(/virus/i.test(answer("S5-L02-EXAM-2")) && /repair/i.test(answer("S5-L02-EXAM-2")) && /defragment/i.test(answer("S5-L02-EXAM-2")) && !/DLL/.test(answer("S5-L02-EXAM-2")), "S5 utility answer is mismatched");
  check(/compatible JVM/i.test(answer("S5-L04-EXAM-3")) && /bytecode/i.test(answer("S5-L04-EXAM-3")) && !/breakpoint|pretty.print/i.test(answer("S5-L04-EXAM-3")), "S5 Java answer is mismatched");
  check(/identifier/i.test(answer("S5-L05-EXAM-1")) && /language rules/i.test(answer("S5-L05-EXAM-1")) && /expected/i.test(answer("S5-L05-EXAM-1")), "S5 context-sensitive prompt answer misses the valid-but-wrong identifier");
  const units = section.flatMap((l) => l.units);
  const getUnit = (key) => units.find((u) => u.unitKey === key);
  const debug = getUnit("S5.07-DEBUG");
  check(same(debug?.leadVisual.rows.map((r) => r.slice(1).map(Number)), [[12, 4, 12 + 4], [12 - 4, 4, (12 - 4) + 4]]), "S5 debugger table has incorrect before/after or expression values");
  check(/Total <- Total - Increment/.test(JSON.stringify(debug?.workedExample)) && /output should be 16/.test(JSON.stringify(debug?.workedExample)), "S5 debugger needs its faulty assignment and verified correction");
  check(/Amount is then 14\./.test(answer("S5-L05-Q4")) && /as 15/.test(answer("S5-L05-Q4")), "S5 stepping exercise gives incorrect post-assignment/expression values");
  check(/Count is 5 before/.test(answer("S5-L05-EXAM-3")) && /changes Count to 7/.test(answer("S5-L05-EXAM-3")) && /OUTPUT has not yet run/.test(answer("S5-L05-EXAM-3")), "S5 exam confuses the pause with completed execution");
  check(getUnit("S5.04-ASSEMBLER")?.workedExample?.steps.some(([, s]) => /LDM #6\nADD #4\nSTO 200\nEND/.test(s)), "S5 assembly example lost its complete valid source");
  check(/compatible/.test(JSON.stringify(getUnit("S5.03-DLL"))) && /restart|reload/.test(JSON.stringify(getUnit("S5.03-DLL"))), "S5 DLL update omits compatibility or reload conditions");
  const java = JSON.stringify(getUnit("S5.06-JAVA"));
  check(/public static void main/.test(java) && /javac Hello.java/.test(java) && /bytecode/.test(java) && /compatible JVM/.test(java), "S5 Java needs a complete program, build command and execution dependency");
  check(!/stage10-lesson-05[34]|aload_0|END IF|\bSTA 200\b/.test(JSON.stringify(section)), "S5 retains a rejected illustration or erroneous notation");

  const review = lessons.find((l) => l.lessonKey === "REV-P1");
  const reviewUnit = review?.units.find((u) => /^Section 5:/.test(u.heading));
  check(same(reviewUnit?.objectiveIds, expectedOrder.map((id) => `${id}.R`)), "Paper 1 S5 review does not own all seven S5 requirements");
  check(review?.units.filter((u) => u !== reviewUnit).every((u) => u.objectiveIds.every((id) => !id.startsWith("S5."))), "S5 review objectives are attached to another section");
  const reviewPractice = review?.practice.filter((q) => q.id.startsWith("REV-P1-S5-")) ?? [];
  check(reviewPractice.length === 3 && same([...new Set(reviewPractice.flatMap((q) => q.objectiveIds.map(requirement)))], expectedOrder), "Paper 1 review lacks targeted S5 retrieval practice");
  for (const q of reviewPractice) check(q.marks === q.answerPoints.length && q.objectiveIds.every((id) => reviewUnit?.objectiveIds.includes(id)), `${q.id}: review scoring or ownership is wrong`);

  const sectionCheck = assessmentBank.sets.find((s) => s.id === "SECTION-5-CHECK");
  const mock = assessmentBank.sets.find((s) => s.id === "PAPER-1-MOCK");
  check(sectionCheck?.totalMarks === 20 && sectionCheck.questions.reduce((n, q) => n + q.marks, 0) === 20, "S5 cumulative check must total 20 marks");
  check(mock?.totalMarks === 75 && mock.questions.reduce((n, q) => n + q.marks, 0) === 75, "Paper 1 mock must total 75 marks");
  const bankQuestions = [...(sectionCheck?.questions ?? []), ...(mock?.questions.filter((q) => q.section === 5) ?? [])];
  for (const q of bankQuestions) {
    check(q.answerPoints?.length === q.marks && q.objectiveIds?.length && q.objectiveIds.every((id) => allObjectives.has(id)), `${q.id}: bank scoring or mapping is incomplete`);
    check(!/fresh context|plausible student error|different context from the lesson|syllabus ideas from|Key focus:/i.test(q.prompt + q.answer), `${q.id}: placeholder remains`);
  }
  check(same([...new Set(sectionCheck?.questions.flatMap((q) => (q.objectiveIds ?? []).map(requirement)))].sort(), expectedOrder), "S5 cumulative check does not span all seven requirements");
  const mockAnswer = JSON.stringify(bankQuestions.find((q) => q.id === "A-P1-5")?.answerPoints);
  check(/still 9/.test(mockAnswer) && /equal to 3/.test(mockAnswer) && /evaluates to 9/.test(mockAnswer) && /output 15/.test(mockAnswer), "Paper 1 S5 mock has incorrect trace/expression/corrected values");
  return errors;
}
