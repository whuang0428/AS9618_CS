const normalise = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Semantic invariants from the syllabus and the concrete tasks, kept separate
// from the content authoring helpers so wrong mappings/answers can fail a check.
export function validateSection3Presentation(lessons, assessmentBank) {
  const errors = [];
  const check = (condition, message) => { if (!condition) errors.push(message); };
  const section = lessons.filter((lesson) => lesson.section === 3);
  check(section.length === 6, "S3 must retain six lessons");
  const expectedOrder = Array.from({ length: 10 }, (_, i) => `S3.${String(i + 1).padStart(2, "0")}`);
  check(JSON.stringify([...new Set(section.flatMap((l) => l.syllabusIds))]) === JSON.stringify(expectedOrder), "S3 syllabus order has changed");
  const questionById = new Map();
  const prompts = new Map();
  const paragraphs = new Map();
  for (const lesson of section) {
    const objectives = new Set(lesson.objectives.map(([id]) => id));
    const allQuestions = [...lesson.practice, ...lesson.examStyleQuestions];
    for (const id of objectives) {
      check(lesson.units.some((u) => u.objectiveIds.includes(id)), `${lesson.lessonKey}: ${id} has no teaching unit`);
      check(lesson.practice.some((q) => q.objectiveIds.includes(id)), `${lesson.lessonKey}: ${id} has no practice`);
    }
    for (const u of lesson.units) {
      for (const id of u.objectiveIds) check(objectives.has(id), `${lesson.lessonKey}: unit maps to absent objective ${id}`);
      for (const paragraph of u.coreExplanation) {
        const key = normalise(paragraph);
        check(!paragraphs.has(key), `${lesson.lessonKey}: core paragraph repeats ${paragraphs.get(key)}`);
        paragraphs.set(key, lesson.lessonKey);
      }
    }
    for (const q of allQuestions) {
      check(!questionById.has(q.id), `S3 duplicate question ID ${q.id}`);
      questionById.set(q.id, q);
      check(q.objectiveIds.length > 0 && q.objectiveIds.every((id) => objectives.has(id)), `${q.id}: incorrect objective mapping`);
      const prompt = q.prompt ?? q.task;
      const key = normalise(prompt);
      check(!prompts.has(key), `${q.id}: repeats ${prompts.get(key)}`);
      prompts.set(key, q.id);
      check(!/fresh context|technical ideas represented|one limiting case|Compare .+ from|number of inputs does/i.test(prompt), `${q.id}: generic or malformed task`);
      const points = q.answerPoints ?? q.markLogic;
      check(q.marks === points.length, `${q.id}: marks and marking points differ`);
      check(points.every((p) => p.trim().length > 8), `${q.id}: incomplete marking point`);
    }
    for (const exam of lesson.examStyleQuestions) for (const practice of lesson.practice) {
      const a = exam.markLogic.map(normalise).sort().join("|");
      const b = practice.answerPoints.map(normalise).sort().join("|");
      check(a !== b, `${exam.id}: duplicates a complete practice answer`);
    }
    check(lesson.summaryMode === "authored" && !/Key focus:/.test(JSON.stringify(lesson.summary)), `${lesson.lessonKey}: summary is a keyword list`);
  }
  const byKey = (key) => section.find((l) => l.lessonKey === key);
  const gates = byKey("S3-L05");
  const conversions = byKey("S3-L06");
  check(gates?.objectives.length === 7 && gates.objectives.every(([id]) => /A0[1-7]$/.test(id)), "S3-L05 must own gate symbols/functions and single-gate tables only");
  check(conversions?.objectives.length === 3 && conversions.objectives.every(([id]) => /A(?:08|09|10)$/.test(id)), "S3-L06 must own construction objectives only");
  check(conversions?.units.length >= 3 && conversions.units.every((u) => u.workedExample?.steps.length >= 3), "S3-L06 needs worked conversions from statement, circuit and table");
  const memory = byKey("S3-L03");
  const buffer = memory?.units[0];
  const transferTable = [buffer?.leadVisual, ...(buffer?.supportingMaterials ?? [])].find(m => m?.type === "table");
  check(Boolean(transferTable), "S3 buffer must retain its explicit transfer table");
  check(JSON.stringify(transferTable?.rows?.map((row) => row[2])) === JSON.stringify(["P1, P2, P3", "P2, P3", "P3", "Empty"]), "S3 buffer table loses or retains a removed block");
  check(/^A buffer/.test(buffer?.coreExplanation[0]), "S3.04 must begin with buffering rather than driver/queue teaching");
  const memoryText = JSON.stringify(memory?.units);
  check(!/stage10-lesson-054-device\.jpg|\/sram-dram\.png/.test(memoryText), "S3 still references a rejected buffer or SRAM diagram");
  check(/sram-dram-storage\.svg/.test(memoryText), "S3 memory comparison is missing its corrected visual");
  for (const device of ["Desktop computer", "Printer", "Embedded data logger"]) check(memoryText.includes(device), `S3 RAM/ROM range missing ${device}`);
  const hardware = byKey("S3-L02");
  check(!/microphone digitises|does not print one complete solid layer/i.test(JSON.stringify(hardware)), "S3 hardware retains an incorrect microphone/3D-printer claim");
  check(hardware?.practice.length === 9 && hardware.examStyleQuestions.length === 9, "S3 devices need independent practice and exam tasks");
  for (let i = 1; i <= 9; i++) {
    const id = `S3.03.A${String(i).padStart(2, "0")}`;
    check(hardware?.examStyleQuestions.some((q) => q.objectiveIds.length === 1 && q.objectiveIds[0] === id), `S3 missing independently assessed device ${id}`);
  }

  const rows = Array.from({ length: 8 }, (_, n) => [n >> 2, (n >> 1) & 1, n & 1]);
  const vector = (fn) => rows.map(([a,b,c]) => Number(fn(a,b,c))).join(",");
  const truthCases = [
    ["S3-L06-Q1", vector((s,u,v) => s && !u && !v)],
    ["S3-L06-Q2", vector((a,b,c) => Number(!(a || b)) !== c)],
    ["S3-L06-Q3", vector((a,b,c) => !((a && b) || c))],
    ["S3-L06-EXAM-2", vector((a,b,c) => !((a || b) && c))],
  ];
  for (const [id, expected] of truthCases) {
    const q = questionById.get(id);
    const answer = (q?.answerPoints ?? q?.markLogic ?? []).join(" ").replace(/\s/g, "");
    check(answer.includes(expected), `${id}: final truth-table output differs from independently evaluated function`);
  }
  const nand = questionById.get("S3-L05-EXAM-1");
  check(nand?.objectiveIds.join() === "S3.10.A04" && /both inputs are 1/.test(nand.markLogic.join(" ")) && !/XOR|NOR|OR includes/.test(nand.markLogic.join(" ")), "S3 NAND task has a foreign answer or mapping");
  const circuitQuestion = questionById.get("S3-L06-EXAM-2");
  check(circuitQuestion?.diagram?.endsWith("/circuit-c.svg"), "S3 given-circuit exam question is missing its diagram");
  const practiceCircuit = questionById.get("S3-L06-Q3");
  check(practiceCircuit?.diagram?.endsWith("/question-circuit-d.svg") && practiceCircuit.diagramAlt && practiceCircuit.diagramLabel, "S3 given-circuit practice needs its accessible diagram");
  const binaryPairs = [[0,0], [0,1], [1,0], [1,1]];
  for (const [id, output] of [["S3-L06-Q4", (a,b) => a !== b], ["S3-L06-EXAM-3", (a,b) => a || !b]]) {
    const table = questionById.get(id)?.table;
    check(table?.type === "table" && JSON.stringify(table.headers) === JSON.stringify(["A", "B", "Q"]), `${id}: supplied truth table needs labelled columns`);
    check(JSON.stringify(table?.rows) === JSON.stringify(binaryPairs.map(([a,b]) => [a,b,Number(output(a,b))])), `${id}: supplied truth-table rows differ from the question's function`);
  }
  if (assessmentBank) {
    const checkSet = assessmentBank.sets.find((s) => s.id === "SECTION-3-CHECK");
    const mock = assessmentBank.sets.find((s) => s.id === "PAPER-1-MOCK");
    const questions = [...(checkSet?.questions ?? []), ...(mock?.questions.filter((q) => q.id === "A-P1-3") ?? [])];
    check(checkSet?.totalMarks === 20 && checkSet.questions.reduce((sum,q) => sum + q.marks, 0) === 20, "S3 check must total 20 marks");
    check(checkSet?.questions.some((q) => q.objectiveIds?.includes("S3.10.A08") && /Construct/.test(q.prompt)), "S3 check is missing genuine circuit construction");
    check(mock?.questions.reduce((sum,q) => sum + q.marks, 0) === 75, "Paper 1 mock total changed");
    for (const q of questions) {
      check(q.answerPoints?.length === q.marks && q.objectiveIds?.length > 0, `${q.id}: incomplete assessment marking or mapping`);
      check(!/fresh context|key ideas|main method|two alternatives from Section/i.test(q.prompt), `${q.id}: assessment lacks a specified task`);
    }
  }
  return errors;
}
