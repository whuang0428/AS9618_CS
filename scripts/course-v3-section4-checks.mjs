import { section4Programs, programListing } from "./course-v3-section4-programs.mjs";
import { section4WorkedTrace } from "./course-v3-section4-content.mjs";
import { normaliseQuestionPrompt } from "./cie-command-words.mjs";

// Independent interpreter for the supplied CIE-model programs. It evaluates
// instruction semantics, not strings copied from the teaching answer key.
export function executeSection4Program(program) {
  const memory = { ...program.memory }, labels = {}, instructions = new Map();
  program.lines.forEach((line, index) => {
    const match = /^(?:([A-Z]+):\s*)?(.*)$/.exec(line);
    const address = program.origin + index;
    if (match[1]) labels[match[1]] = address;
    if (/^\d+$/.test(match[2])) memory[address] = Number(match[2]);
    else instructions.set(address, match[2]);
  });
  const address = (operand) => {
    if (operand in labels) return labels[operand];
    if (!/^\d+$/.test(operand)) throw new Error(`Invalid address ${operand}`);
    return Number(operand);
  };
  const read = (a) => {
    if (!Object.hasOwn(memory, a)) throw new Error(`Read of unspecified data at ${a}`);
    return memory[a];
  };
  const operandValue = (operand) => {
    if (/^#\d+$/.test(operand)) return Number(operand.slice(1));
    if (/^B[01]+$/.test(operand)) return parseInt(operand.slice(1), 2);
    if (/^&[0-9A-F]+$/.test(operand)) return parseInt(operand.slice(1), 16);
    return read(address(operand));
  };
  let pc = program.origin, acc = program.acc, ix = program.ix, comparison;
  const input = [...program.input], trace = [], stores = {}, comparisons = [];
  for (let count = 0; count < 100 && pc !== null; count++) {
    const current = pc, source = instructions.get(pc);
    if (!source) throw new Error(`Execution reached non-instruction ${pc}`);
    const [op, operand] = source.split(/\s+/);
    let output;
    pc++;
    switch (op) {
      case 'LDM': acc = operandValue(operand); break;
      case 'LDD': acc = read(address(operand)); break;
      case 'LDI': acc = read(read(address(operand))); break;
      case 'LDX': acc = read(address(operand) + ix); break;
      case 'LDR': ix = operandValue(operand); break;
      case 'MOV': if (operand !== 'IX') throw new Error('MOV requires IX'); ix = acc; break;
      case 'STO': memory[address(operand)] = acc; stores[address(operand)] = acc; break;
      case 'ADD': acc += operandValue(operand); break;
      case 'SUB': acc -= operandValue(operand); break;
      case 'INC': if (operand === 'ACC') acc++; else if (operand === 'IX') ix++; else throw new Error('INC register'); break;
      case 'DEC': if (operand === 'ACC') acc--; else if (operand === 'IX') ix--; else throw new Error('DEC register'); break;
      case 'CMP': comparison = acc === operandValue(operand); comparisons.push([current, comparison]); break;
      case 'CMI': comparison = acc === read(read(address(operand))); comparisons.push([current, comparison]); break;
      case 'JMP': pc = address(operand); break;
      case 'JPE': case 'JPN':
        if (comparison === undefined) throw new Error('Conditional jump without comparison');
        if (comparison === (op === 'JPE')) pc = address(operand);
        break;
      case 'IN': if (!input.length) throw new Error('Missing input character'); acc = input.shift().charCodeAt(0); break;
      case 'OUT': output = String.fromCharCode(acc); break;
      case 'AND': acc &= operandValue(operand); break;
      case 'OR': acc |= operandValue(operand); break;
      case 'XOR': acc ^= operandValue(operand); break;
      case 'END': pc = null; break;
      default: throw new Error(`Unsupported opcode ${op}`);
    }
    trace.push(output === undefined ? [current, acc, ix, pc] : [current, acc, ix, pc, output]);
  }
  if (pc !== null) throw new Error('Program did not terminate');
  return { trace, memory, stores, labels, comparisons };
}
const norm = (text) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const binary = (n) => (n & 255).toString(2).padStart(8, '0');

export function validateSection4Presentation(lessons, bank) {
  const errors = [], check = (condition, message) => { if (!condition) errors.push(message); };
  const section = lessons.filter((l) => l.section === 4), byId = new Map();
  check(section.length === 7, 'S4 must retain seven lessons');
  check(equal([...new Set(section.flatMap(l => l.syllabusIds))], Array.from({length:15},(_,i)=>`S4.${String(i+1).padStart(2,'0')}`)), 'S4 requirement order changed');
  check(section.flatMap(l=>l.objectives).length === 61, 'S4 must cover all 61 mapped objectives');
  const paragraphs = new Set(), prompts = new Set();
  for (const lesson of section) {
    const objectives = lesson.objectives.map(([id])=>id);
    for (const id of objectives) {
      check(lesson.units.some(u=>u.objectiveIds.includes(id)), `${id}: missing teaching`);
      check(lesson.practice.some(q=>q.objectiveIds.includes(id)), `${id}: missing practice`);
    }
    check(lesson.summaryMode === 'authored' && lesson.summary.every(([,s])=>s.length>35), `${lesson.lessonKey}: incomplete summary`);
    check(lesson.diagnostic?.answer && lesson.guidingQuestion, `${lesson.lessonKey}: missing entry check`);
    for (const unit of lesson.units) {
      check(unit.checkpoint?.prompt && unit.checkpoint?.answer, `${unit.unitKey}: missing formative check`);
      check(unit.workedExample?.steps.length>=3, `${unit.unitKey}: no complete worked example`);
      check(unit.objectiveIds.every(id=>objectives.includes(id)), `${unit.unitKey}: foreign mapping`);
      for (const p of unit.coreExplanation) {
        check(!paragraphs.has(norm(p)), `${unit.unitKey}: repeated core paragraph`); paragraphs.add(norm(p));
      }
    }
    const all = [...lesson.practice, ...lesson.examStyleQuestions];
    for (const question of all) {
      check(!byId.has(question.id), `${question.id}: duplicate ID`); byId.set(question.id, question);
      const prompt = question.prompt ?? question.task, points = question.answerPoints ?? question.markLogic;
      const signature = norm(prompt + (question.code ?? ''));
      check(!prompts.has(signature), `${question.id}: duplicate task and stimulus`); prompts.add(signature);
      check(question.objectiveIds.length && question.objectiveIds.every(id=>objectives.includes(id)), `${question.id}: foreign objective mapping`);
      check(points.length === question.marks && points.every(p=>p.length>12), `${question.id}: incomplete marking`);
      check(!/fresh context|one limiting case|technical ideas represented|AND #00001111|\bR1\b|BGE|HALT/.test(prompt+(question.code??'')), `${question.id}: generic task or non-CIE instruction`);
      if (question.programKey) {
        const program = section4Programs[question.programKey];
        check(program && question.code === programListing(program) && question.codeCaption?.includes('Initial ACC='), `${question.id}: missing/changed program or initial state`);
        if (!program) continue;
        const actual = executeSection4Program(program);
        if (question.expectedTrace) {
          check(equal(question.expectedTrace, actual.trace), `${question.id}: trace disagrees with executed instructions`);
          check(question.table?.rows.length === actual.trace.length, `${question.id}: wrong number of trace rows`);
          check(equal(question.answerTable?.rows, actual.trace.map(([a,acc,ix,pc,out='—'])=>[String(a),String(acc),String(ix),pc===null?'Return to OS':String(pc),out])), `${question.id}: displayed trace table disagrees with execution`);
          for (const [a,acc,ix,pc,out] of actual.trace) check(points.some(p=>p.includes(`Address ${a}: ACC=${acc}, IX=${ix}, next PC=${pc===null?'Return to OS':pc}`) && (!out || p.includes(`character ${out}`))), `${question.id}: marking key omits an executed state`);
          check(equal(question.finalMemory, actual.stores), `${question.id}: final memory writes omitted or incorrect`);
          for (const [a,v] of Object.entries(actual.stores)) check(points.some(p=>p.includes(`Memory[${a}]`) && p.includes(String(v))), `${question.id}: STO result missing from answer`);
        }
        if (question.expectedAcc) check(equal(question.expectedAcc, actual.trace.map(row=>row[1])), `${question.id}: incorrect intermediate ACC value`);
        for (const [a,v] of Object.entries(question.finalMemory??{})) check(actual.memory[a]===v, `${question.id}: final memory differs from execution`);
      }
    }
    for (const exam of lesson.examStyleQuestions) {
      check(exam.sourceRef.includes(lesson.originalLesson <= 22 ? '4.1' : lesson.originalLesson <= 24 ? '4.2' : '4.3'), `${exam.id}: wrong official syllabus clause`);
      for (const practice of lesson.practice) {
        check(norm(exam.task) !== norm(practice.prompt), `${exam.id}: same prompt as practice`);
        check(!exam.markLogic.some(p=>practice.answerPoints.some(a=>norm(a)===norm(p))), `${exam.id}: reused practice marking point`);
      }
    }
  }
  const answer = (id) => (byId.get(id)?.answerPoints ?? byId.get(id)?.markLogic ?? []).join(' ');
  const mapping = (id) => byId.get(id)?.objectiveIds.join(',') ?? '';
  check(mapping('S4-L07-Q2') === [5,7,8,9,10,11,12].map(n=>`S4.15.A${String(n).padStart(2,'0')}`).join(','), 'S4 bitwise six-form question is mapped to wrong operations');
  check(mapping('S4-L05-Q2') === 'S4.10.A01,S4.10.A02' && /BEGIN=10, LEFT=14, RIGHT=15, RESULT=16/.test(answer('S4-L05-Q2')), 'Two-pass application needs the correct symbol table');
  check(/LDD 63/.test(answer('S4-L05-EXAM-1')) && /STO 64/.test(answer('S4-L05-EXAM-1')), 'Assembler exam resolves a label to data rather than address');
  for (const [id, results] of [
    ['S4-L07-Q1', [178<<1,178>>>1,178>>1|128,178<<1|178>>>7,178>>>1|((178&1)<<7)]],
    ['S4-L07-Q2', [172&15,172|15,172^15]],
    ['S4-L07-Q4', [44<<2,(44<<2&255)>>>3]],
    ['S4-L07-EXAM-2', [214,214&15,(214&15)|128,((214&15)|128)^2]],
    ['S4-L07-EXAM-3', [105>>>1,105>>>1|((105&1)<<7),105<<1]],
  ]) for (const value of results) check(answer(id).includes(binary(value)), `${id}: bit operation result ${binary(value)} missing/incorrect`);
  check(answer('S4-L07-Q1').includes('−156') && answer('S4-L07-EXAM-3').includes('210'), 'Signed left-shift overflow explanation missing');
  check(answer('S4-L06-Q6').includes('84') && answer('S4-L06-EXAM-3').includes('294'), 'Relative target calculation missing');
  const traceUnit = section.flatMap(l=>l.units).find(u=>u.unitKey==='s4-complete-trace');
  const actualWorked = executeSection4Program(section4Programs.workedTrace);
  check(equal(section4WorkedTrace.expectedTrace, actualWorked.trace), 'Worked loop trace disagrees with program execution');
  check(equal(traceUnit?.leadVisual.rows, section4WorkedTrace.answerTable.rows), 'Displayed worked loop trace differs from verified result');
  const dataUnit = section.flatMap(l=>l.units).find(u=>u.unitKey==='s4-data-movement');
  check(dataUnit?.leadVisual.rows.some(r=>r[0]==='LDX <address>' && r[1]==='ACC ← Memory[address + IX]'), 'LDX must load contents at the indexed address');
  const unitText = JSON.stringify(section.flatMap(l=>l.units));
  check(!/assembly-trace\.png|stage10-lesson-092-processor\.jpg/.test(unitText), 'Rejected S4 diagram is still used');
  check(/<label>: <opcode> <operand>/.test(unitText) && /<label>: <data>/.test(unitText), 'Both label forms must remain visible');
  const lastUnits = section.find(l=>l.originalLesson===24)?.units;
  check(lastUnits?.at(-1).unitKey==='s4-addressing', 'Addressing modes must follow the instruction-set teaching');
  const assemblyWorked = section.flatMap(l=>l.units).find(u=>u.unitKey==='s4-two-pass')?.workedExample.steps.find(([label])=>label==='Pass two: emit')?.[1];
  const words = [0x0104,0x0205,0x0306,0xff00,18,24,0].map((n,i)=>`${i}  ${n.toString(2).padStart(16,'0').replace(/(.{8})(.{8})/,'$1 $2')}`).join('\n');
  check(assemblyWorked===words, 'Worked assembler emitted words disagree with supplied encoding');
  const opcodes = 'Identify the groups for STO, ADD, SUB and MOV IX.';
  check(normaliseQuestionPrompt(opcodes)===opcodes, 'Command normalisation corrupts ADD opcode');
  check(normaliseQuestionPrompt('Add 7 and 8.')==='Calculate the sum of 7 and 8.', 'English Add command no longer normalises');
  if (bank) {
    const set = bank.sets.find(s=>s.id==='SECTION-4-CHECK'), mock = bank.sets.find(s=>s.id==='PAPER-1-MOCK');
    check(set?.totalMarks===20 && set.questions.reduce((a,q)=>a+q.marks,0)===20, 'S4 assessment total must be 20');
    check(mock?.questions.reduce((a,q)=>a+q.marks,0)===75, 'Paper 1 total must remain 75');
    for (const q of [...(set?.questions??[]), ...(mock?.questions.filter(q=>q.id==='A-P1-4')??[])]) {
      check(q.answerPoints?.length===q.marks && q.objectiveIds?.length, `${q.id}: incomplete assessment`);
      check(!/fresh context|main method|plausible student error|two alternatives from/.test(q.prompt), `${q.id}: generic assessment`);
      if (q.programKey) check(q.code===programListing(section4Programs[q.programKey]) && q.codeCaption, `${q.id}: incomplete assessment program`);
    }
    check(set?.questions.some(q=>q.objectiveIds?.includes('S4.10.A02')), 'S4 assessment omits assembler application');
    check(set?.questions.some(q=>q.objectiveIds?.includes('S4.13.A01')), 'S4 assessment omits instruction trace');
    check(set?.questions.some(q=>q.objectiveIds?.includes('S4.15.A06')), 'S4 assessment omits bit masking');
    const assessmentResult = executeSection4Program(section4Programs.assessmentTrace);
    check(assessmentResult.trace.some(row=>row[4]==='H') && set.questions[2].answerPoints.some(p=>p.includes('prints H')), 'Assessment output is not H');
    const mockResult = executeSection4Program(section4Programs.mockTrace);
    check(mockResult.memory[302]===3 && mock.questions.find(q=>q.id==='A-P1-4').answerPoints.some(p=>p.includes('value 3 into Memory[302]')), 'Paper 1 store result incorrect');
  }
  return errors;
}
