const normalise = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const objectiveIds = (r, ns) => ns.map((n) => `S6.${String(r).padStart(2, "0")}.A${String(n).padStart(2, "0")}`);
const ownership = {
  CONCEPTS: [1,[1]], SYSTEM: [2,[1]], ACCOUNTS: [3,[1]], SIGNATURE: [3,[2]], BIOMETRIC: [3,[3]],
  FIREWALL: [3,[4]], ANTIVIRUS: [3,[5]], ANTISPYWARE: [3,[6]], LAYERS: [3,[7,8]],
  VIRUS: [4,[1]], SPYWARE: [4,[2]], HACKING: [4,[3]], PHISHING: [4,[4]], PHARMING: [4,[5]], RISK: [5,[1]],
  ENCRYPTION: [6,[1]], RIGHTS: [6,[2]], VALIDATION: [7,[1,9]], BOUNDS: [7,[2,7]], PATTERNS: [7,[3,4]],
  PRESENCE: [7,[5,6]], "CHECK-DIGIT": [7,[8]], ENTRY: [8,[1,2]], "BYTE-PARITY": [8,[3,5]],
  "BLOCK-PARITY": [8,[3,5]], CHECKSUM: [8,[4,5]],
};
const ones = (bits) => [...bits].filter((b) => b === "1").length;
const parityRow = (rows) => Array.from({ length: rows[0].length }, (_, c) => rows.reduce((n, row) => n ^ Number(row[c]), 0)).join("");
const checksum = (values) => values.reduce((a,b) => a+b, 0) % 256;

// Checks are independent of the authoring helpers. Numerical answers are recalculated
// from question data; mapping assertions protect against the previous cross-topic errors.
export function validateSection6Presentation(lessons, bank) {
  const errors = [], check = (condition, message) => { if (!condition) errors.push(message); };
  const section = lessons.filter((l) => l.section === 6);
  check(section.length === 5, "S6 must retain five lessons");
  check(JSON.stringify([...new Set(section.flatMap((l) => l.syllabusIds))]) === JSON.stringify(Array.from({length:8},(_,i)=>`S6.0${i+1}`)), "S6 syllabus order changed");
  const paragraphs = new Map(), prompts = new Map(), questions = new Map(), units = new Map();
  for (const lesson of section) {
    const objectives = new Set(lesson.objectives.map(([id]) => id));
    for (const id of objectives) {
      check(lesson.units.some((u) => u.objectiveIds.includes(id)), `${id}: missing instruction`);
      check(lesson.practice.some((q) => q.objectiveIds.includes(id)), `${id}: missing independent practice`);
    }
    for (const u of lesson.units) {
      units.set(u.unitKey, u);
      const target = ownership[u.unitKey.replace(/^S6-/, "")];
      check(target && u.objectiveIds.join() === objectiveIds(...target).join(), `${u.unitKey}: teaching is mapped to the wrong knowledge point`);
      check(u.checkpoint?.prompt && u.checkpoint?.answer, `${u.unitKey}: missing formative check`);
      check(u.leadVisual && u.coreExplanation.length >= 2, `${u.unitKey}: incomplete explanation`);
      for (const p of u.coreExplanation) {
        const key = normalise(p);
        check(!paragraphs.has(key), `${u.unitKey}: repeated core paragraph from ${paragraphs.get(key)}`);
        paragraphs.set(key, u.unitKey);
      }
    }
    for (const q of [...lesson.practice, ...lesson.examStyleQuestions]) {
      check(q.objectiveIds.length && q.objectiveIds.every((id) => objectives.has(id)), `${q.id}: objective is outside its lesson`);
      check(!questions.has(q.id), `${q.id}: duplicate question ID`);
      questions.set(q.id, q);
      const prompt = q.prompt ?? q.task, key = normalise(prompt);
      check(!prompts.has(key), `${q.id}: repeats ${prompts.get(key)}`); prompts.set(key, q.id);
      check(!/explain why must|explain can|explain does|describe show appreciation|fresh context|technical ideas represented/i.test(prompt), `${q.id}: malformed or unspecified task`);
      const points = q.answerPoints ?? q.markLogic;
      check(points.length === q.marks && new Set(points.map(normalise)).size === points.length, `${q.id}: duplicate or missing marking points`);
      if (q.sourceRef) check(/syllabus 6\.[12]/.test(q.sourceRef) && !/\b20\d\d.*[QP]\d/i.test(q.sourceRef), `${q.id}: false past-paper attribution`);
    }
  }
  check(units.size === 26, "S6 should have 26 distinct teaching units");
  check(section.flatMap((l)=>l.practice).length === 31 && section.flatMap((l)=>l.examStyleQuestions).length === 15, "S6 independent task count changed");
  for (const key of ["SIGNATURE", "ENCRYPTION", "CHECK-DIGIT", "BYTE-PARITY", "BLOCK-PARITY", "CHECKSUM"]) {
    const u = units.get(`S6-${key}`);
    check(u?.leadVisual.type === "reviewed-visual" && u.workedExample?.steps.length >= 3, `${key}: needs a matched diagram and worked example`);
  }
  const textOf = (key) => units.get(`S6-${key}`)?.coreExplanation.join(" ") ?? "";
  check(/hash algorithm.*private key/.test(textOf("SIGNATURE")) && /public key.*decrypting.*digest/.test(textOf("SIGNATURE")) && /same algorithm.*compares/.test(textOf("SIGNATURE")), "Digital signature lacks sender/receiver stages");
  check(/algorithm and key to plaintext.*ciphertext/.test(textOf("ENCRYPTION")), "Encryption explanation has reverted to account authentication");
  const firewall = questions.get("S6-L02-Q4");
  check(firewall?.objectiveIds.join() === "S6.03.A04" && !/signature|biometric/.test(firewall.answerPoints.join(" ")), "Firewall answer or objective belongs to another control");
  const rights = questions.get("S6-L04-EXAM-2");
  check(rights?.objectiveIds.join() === "S6.06.A02" && /modify only their own/.test(rights.markLogic.join(" ")), "Access-rights task has an unrelated answer");

  if (bank) {
    const set = bank.sets.find((s) => s.id === "SECTION-6-CHECK"), mock = bank.sets.find((s) => s.id === "PAPER-1-MOCK");
    check(set?.questions.reduce((n,q)=>n+q.marks,0) === 20, "S6 section assessment must total 20");
    check(mock?.questions.reduce((n,q)=>n+q.marks,0) === 75, "Paper 1 total must remain 75");
    const bankQuestions = [...(set?.questions ?? []), ...(mock?.questions.filter((q)=>q.id==="A-P1-6") ?? [])];
    const allObjectives = new Set(section.flatMap((l)=>l.objectives.map(([id])=>id)));
    for (const q of bankQuestions) {
      questions.set(q.id,q);
      check(q.answerPoints?.length === q.marks && q.objectiveIds?.every((id)=>allObjectives.has(id)), `${q.id}: assessment lacks marking or valid objectives`);
      check(!/fresh context|main method|two alternatives from|plausible student error/i.test(q.prompt), `${q.id}: assessment context remains unspecified`);
      check(!prompts.has(normalise(q.prompt)), `${q.id}: repeats a lesson question`); prompts.set(normalise(q.prompt),q.id);
    }
  }
  const answer = (id) => { const q = questions.get(id); return (q?.answerPoints ?? q?.markLogic ?? []).join(" "); };
  for (const id of ["S6-L05-Q5", "S6-L05-EXAM-2", ...(bank ? ["A-S6-4"] : [])]) {
    const q = questions.get(id), prompt = q?.prompt ?? q?.task ?? "";
    const digits = prompt.match(/data digits (\d+)/)?.[1];
    const weights = prompt.match(/weights ([\d,]+)/)?.[1].split(",").map(Number);
    const sum = digits && weights ? [...digits].reduce((n,d,i)=>n+Number(d)*weights[i],0) : NaN;
    const expected = (10 - sum % 10) % 10;
    const supplied = Number(answer(id).match(/check digit is (\d)/)?.[1]);
    check(supplied === expected, `${id}: incorrect check digit for the supplied digits and weights`);
  }
  const parityQuestion = questions.get("S6-L05-Q7"), data = parityQuestion?.prompt.match(/data bits ([01]+)/)?.[1] ?? "";
  const even = ones(data) % 2, odd = 1 - even;
  check(answer("S6-L05-Q7").includes(`even-parity bit is ${even}`) && answer("S6-L05-Q7").includes(`odd-parity bit is ${odd}`), "Byte parity answer disagrees with the given data");
  const blockQ = questions.get("S6-L05-Q8"), rows = blockQ?.prompt.match(/\b[01]{8}\b/g) ?? [];
  check(rows.length === 4 && answer("S6-L05-Q8").includes(parityRow(rows.slice(0,3))), "Block parity row is incorrect");
  const changed = rows.length === 4 ? [...rows[1]].flatMap((v,i)=>v!==rows[3][i]?[i+1]:[]) : [];
  check(changed.join() === "5" && /row 2.*Column 5/s.test(answer("S6-L05-Q8")), "Block parity error location is incorrect");
  const checksumQ = questions.get("S6-L05-Q9"), values = checksumQ?.prompt.match(/\b\d+,\d+,\d+\b/g) ?? [];
  const sums = values.map((v)=>checksum(v.split(",").map(Number)));
  check(sums.length === 2 && sums.every((v)=>answer("S6-L05-Q9").includes(`checksum ${v}`)), "Checksum practice arithmetic is incorrect");
  check(checksum([40,50,60]) === checksum([41,49,60]) && /checksum 150/.test(answer("S6-L05-EXAM-3")), "Checksum cancellation example is incorrect");
  if (bank) check(answer("A-P1-6").includes(`checksum is ${checksum([90,80,100])}`), "Paper 1 S6 checksum is incorrect");
  return errors;
}

export function validateSection6Diagrams(diagrams) {
  const errors = [], check = (condition, message) => { if (!condition) errors.push(message); };
  // Read the visible binary cells, grouped by their actual SVG baseline.
  const bitRows = (svg) => {
    const rows = new Map();
    for (const m of svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([01])<\/text>/g)) {
      const row = rows.get(Number(m[2])) ?? []; row.push([Number(m[1]),m[3]]); rows.set(Number(m[2]),row);
    }
    return [...rows].sort((a,b)=>a[0]-b[0]).filter(([,cells])=>cells.length===8).map(([,cells])=>cells.sort((a,b)=>a[0]-b[0]).map(([,bit])=>bit).join(""));
  };
  const byte = bitRows(diagrams["byte-parity.svg"] ?? "");
  check(byte.join() === "10110010,10100010" && ones(byte[0] ?? "") % 2 === 0 && ones(byte[1] ?? "") % 2 === 1, "Byte diagram cell data or parity is incorrect");
  const block = bitRows(diagrams["block-parity.svg"] ?? "");
  check(block.length === 4 && block.map((r)=>ones(r)%2).join() === "0,1,0,0" && parityRow(block) === "00001000", "Block diagram must fail at row 2 and column 5 only");
  const corrected = [...block]; if (corrected[1]) corrected[1] = corrected[1].slice(0,4)+"0"+corrected[1].slice(5);
  check(corrected.length === 4 && parityRow(corrected) === "00000000", "Corrected diagram does not satisfy column parity");
  check(/31 \+ 9 = 40/.test(diagrams["check-digit.svg"] ?? "") && /47269/.test(diagrams["check-digit.svg"] ?? ""), "Check-digit diagram has an incorrect sum or code");
  check(/282 mod 256 = 26/.test(diagrams["checksum.svg"] ?? "") && /281 mod 256 = 25/.test(diagrams["checksum.svg"] ?? ""), "Checksum diagram arithmetic is incorrect");
  return errors;
}
