import { readFileSync } from 'node:fs';
const allocation = JSON.parse(readFileSync(new URL('./course-v3-practice-allocation.json', import.meta.url), 'utf8'));

// Targeted changes to retained teacher questions; original Cambridge content is never edited here.
const repairs = {
  'S2-L03-Q3': {
    prompt: 'A clinic considers moving patient records to cloud storage. The provider can restrict access to named staff, encode stored data so it needs a key to read, and keep separate recoverable copies. These are available services, not automatic guarantees. Give a balanced recommendation covering control, shared access, availability and cost.',
    answerPoints: ['A private cloud is a suitable option when control of the patient-record service is a priority.', 'Dedicated resources allow the clinic greater control over configuration and access policies.', 'Authorised staff at different sites can use the same records, with access limited to the intended staff.', 'A failed internet connection or an unavailable provider can stop staff reaching records.', 'Dedicated resources and specialist administration can cost more than shared public-cloud services.', 'The clinic must confirm which of the stated protective and recovery services are included; private tenancy alone does not guarantee them.']
  },
  'V3-014-S3.03-LASER': {
    prompt: 'A laser printer produces the correct page pattern, but the toner can be rubbed off the paper. Identify the failed stage and explain why the drum, laser and toner-transfer stages can still be working. Explain how the printer normally makes the toner permanent.',
    commandWord: 'Explain', type: 'Application',
    answerPoints: ['The fusing stage is failing.', 'The correct pattern shows that the laser can create the required charge pattern on the drum.', 'Toner can still be attracted to the patterned drum and transferred to the paper.', 'Heated pressure rollers normally fuse the transferred toner to the paper.', 'Repairing only the laser would not provide the missing heat/pressure needed to fix the toner permanently.'],
    commonError: 'A correct image pattern does not prove that the later fusing stage works.'
  },
  'S4-L03-Q4': {
    prompt: 'The supplied calculation starts with Memory[6]=0. Describe the operand transfers for ADD 5 and the write transfers for STO 6, then state the final memory and ACC values. Predict the incorrect Memory[6] if STO 6 instead copies its operand address into MDR before the write.',
    answerPoints: ['After fetching ADD 5, MAR=5 and a read gives MDR=24.', 'The ALU combines ACC=18 with 24 and ACC becomes 42.', 'STO 6 sets MAR=6 and MDR=42 and uses a memory-write signal.', 'Correct execution gives Memory[6]=42 and ACC=42; the stated fault writes 6 to Memory[6] instead. Memory[4]=18 and Memory[5]=24 are unchanged.']
  },
  'S5-L05-Q4': { commonError: 'A syntactically valid multiplication can still implement the wrong rule. Step and inspect the actual value to diagnose a logic error; expression inspection itself does not assign a new Amount.' },
  'S6-L04-Q4': { answerPoints: ['Grant read but deny modify and delete on the controlled invoice records.', 'Read permission permits access to the contents and does not prevent every external copy. An outsider can read an unencrypted separate copy without consulting the original system’s permission checks.'] },
  'S7-L02-Q5': { answerPoints: ['The claim does not identify whose efficiency improves or how an attendance action causes that improvement.', 'Continuous location collection affects students’ privacy even outside the attendance decision, and its necessity has not been established.', 'Record arrival at the classroom instead: this still establishes attendance while collecting less information about students’ movements.'] },
  'S8-L05-Q3': {
    prompt: 'Write CREATE TABLE for Event with EventID (whole number), Code (one character), EventName (up to 30 characters), Confirmed (true/false), Duration (fractional hours), EventDate (calendar date) and StartTime (time of day). Use the seven syllabus data types. Then check whether Code = "AB" and Duration = 1.5 match your chosen field definitions, explaining both decisions.',
    answerPoints: ['EventID uses INTEGER in the Event table definition.', 'Code uses CHARACTER(1); "AB" exceeds the declared length.', 'EventName uses VARCHAR(30).', 'Confirmed uses BOOLEAN.', 'Duration uses REAL and can represent the supplied fractional value 1.5.', 'EventDate uses DATE.', 'StartTime uses TIME, with valid comma-separated field definitions inside CREATE TABLE brackets.']
  },
  'S8-L06-Q7': {
    prompt: "Stock(StockID INTEGER PRIMARY KEY, ItemName VARCHAR(30), Quantity INTEGER) starts with (30, 'Cable', 6) and (31, 'Adapter', 2). Write an INSERT adding (32, 'Stand', 4), using an explicit field list. State the rows after this operation.",
    answerPoints: ['INSERT INTO names Stock and the fields StockID, ItemName and Quantity in that order.', "VALUES supplies 32, 'Stand', 4; rows 30 and 31 remain and the new row 32 is added."]
  },
  'S8-L06-Q8': {
    prompt: "Continue the Stock sequence. It now contains (30, 'Cable', 6), (31, 'Adapter', 2) and (32, 'Stand', 4). Write SQL to remove only StockID 31. State the remaining rows and explain the effect of omitting WHERE.",
    answerPoints: ["DELETE FROM Stock WHERE StockID = 31; leaves (30, 'Cable', 6) and (32, 'Stand', 4).", 'Without WHERE, all three records in this supplied starting state would be deleted.']
  },
  'S8-L06-Q9': {
    prompt: "Continue the Stock sequence. It now contains (30, 'Cable', 6) and (32, 'Stand', 4). Write SQL to change the quantity of StockID 30 to 8. State both resulting rows and explain which data remains unchanged.",
    answerPoints: ['UPDATE Stock SET Quantity = 8 WHERE StockID = 30;', "The rows become (30, 'Cable', 8) and (32, 'Stand', 4); only record 30’s Quantity changes."]
  }
};

export function applyPracticePlan(lessons) {
  const byId = new Map(lessons.flatMap(l => l.practice.map(q => [q.id, q])));
  const result = lessons.map(lesson => {
    const plan = allocation.find(p => p.lesson === lesson.sequenceIndex);
    if (!plan) throw new Error(`Missing Practice allocation for ${lesson.route}`);
    const assigned = [...plan.required, ...plan.optional, ...plan.removed];
    if (new Set(assigned).size !== assigned.length || lesson.practice.some(q => !assigned.includes(q.id))) throw new Error(`Unreviewed Practice in ${lesson.route}`);
    const get = id => {
      const q = byId.get(id);
      if (!q || !lesson.practice.some(p => p.id === id)) throw new Error(`Unknown Practice ${id} in ${lesson.route}`);
      return {...q, ...repairs[id]};
    };
    return {...lesson, practice: plan.required.map(get), optionalPractice: plan.optional.map(get), practiceTiming: plan.practiceMinutes, examTiming: plan.examMinutes, reviewMenu: plan.reviewMenu};
  });
  // Move questions whose prerequisites occur later; keep them optional as approved.
  for (const [from, to, id, objectiveIds] of [
    [19,20,'S3-L05-APPLY-1',result[19].objectives.map(([id])=>id)],
    [21,23,'S4-L01-Q5',result[22].objectives.map(([id])=>id)],
    [46,47,'S8-L05-Q1',['S8.10.A01','S8.10.A02']]
  ]) {
    const question = result[from-1].optionalPractice.find(q=>q.id===id);
    if (!question) throw new Error(`Missing approved optional transfer ${id}`);
    result[from-1].optionalPractice = result[from-1].optionalPractice.filter(q=>q.id!==id);
    const available = new Set(result[to-1].objectives.map(([id])=>id));
    const mapped = objectiveIds.filter(id=>available.has(id));
    if (!mapped.length) throw new Error(`Optional transfer has no objective mapping: ${id}`);
    result[to-1].optionalPractice.push({...question, objectiveIds:mapped, previousLesson:from});
  }
  const recovery = result[8].optionalPractice.find(q=>q.id==='S2-L03-Q4');
  if (recovery) recovery.afterLesson = 37;
  const arrays = result[61];
  arrays.units = arrays.units.map((u,i)=> i ? u : {...u, teachingBlocks:[...(u.teachingBlocks??[]), {type:'paragraph', title:'Remainder: the MOD operator', text:'For integer operands, MOD gives the remainder after division. For example, 17 MOD 5 is 2 because 17 = 3 × 5 + 2. This operator is available when checking a condition on an array index. It returns the remainder, not the whole-number quotient. Lesson 074 develops arithmetic operators further.'}]});
  return result;
}
