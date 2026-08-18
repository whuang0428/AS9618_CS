# Lesson 051: Section 4 review: tracing processor behaviour

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 4  
**Duration:** 45 minutes  
**Assessment rhythm:** stage review
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Section 4 review: tracing processor behaviour** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Put three deliberately mixed questions on the board and ask students to identify the topic before answering. The first skill in a review lesson is knowing which mental toolbox to open.

Lesson-specific focus question: What would go wrong if a student confused **Section 4 review: tracing processor behaviour** with a neighbouring syllabus idea?

## Guided Explanation
Use Section 4 review: tracing processor behaviour to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Topic-specific teaching move: keep the explanation anchored to **Section 4 review: tracing processor behaviour**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks. The worked example must explicitly use **Section 4 review: tracing processor behaviour**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.



## Student Task
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version. Their final answer must include the phrase **Section 4 review: tracing processor behaviour** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Section 4 review: tracing processor behaviour**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Section 4 review: tracing processor behaviour** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Section 4 review: tracing processor behaviour** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction. For this lesson, make students contrast that mistake with the exact idea of **section 4 review: tracing processor behaviour**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Turn vague into mark-worthy

- **Explains:** `clinic`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-clinic.jpg`

1. Answer clinic
2. Weak answer: "The CPU uses registers and buses to get instructions. It is faster because of cache and pipelining."
3. Diagnosis: This names several topics but does not answer any one of them precisely.
4. Fix pattern: Topic → mechanism → exact role/sequence → consequence.

### Common compare traps

- **Explains:** `compare`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-compare.jpg`

1. MAR vs MDR
2. MAR holds an address. MDR holds the data or instruction being transferred. One points where; the other carries what.
3. Direct vs indirect
4. Direct uses the operand as the address of the value. Indirect uses the operand as the address of a pointer to the value.
5. Clock speed vs throughput
6. Clock speed is cycles per second. Throughput is completed work per unit time. They are related, not identical.
7. Interrupt vs polling
8. An interrupt lets a device signal the CPU. Polling means the CPU repeatedly checks the device/status flag.

### The Section 4 mental toolbox

- **Explains:** `map`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-map.jpg`

1. Section map
2. CPU components ALU, CU, registers, buses and clock coordinate instruction processing.
3. FDE cycle PC, MAR, MDR and CIR move address, instruction and data through fetch-decode-execute.
4. Instruction set Machine code depends on a processor's instruction set; assembly uses mnemonics and labels.
5. Addressing modes Immediate, direct, indirect and indexed modes change operand interpretation.
6. Interrupts The CPU saves state, runs an ISR, then restores state and resumes.
7. Performance Clock speed, cores, cache, word length and pipelining affect performance with limits.

### Retrieval grid: say the role, not just the name

- **Explains:** `retrieval`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-retrieval.jpg`

1. PC Holds address of the next instruction to fetch.
2. MAR Holds the memory address being accessed.
3. MDR Holds data/instruction transferred to or from memory.
4. CIR Holds the current instruction while it is decoded/executed.
5. Control bus Carries control/timing signals such as read, write and interrupt.
6. Cache Small fast memory storing frequently/recently used items.
7. ISR Routine that handles a specific interrupt.
8. Pipeline stall Pause because an instruction cannot safely continue.

### 8-minute mixed Section 4 response

- **Explains:** `timed`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-timed.jpg`

1. Timed task
2. Choose one question, write the answer, then compare with the expandable MS in the exam section.
3. Question A Trace the fetch stage and name the role of PC, MAR and MDR.
4. Question B Explain why an interrupt service routine must save and restore processor state.
5. Question C Discuss why pipelining may improve CPU performance but not always reach ideal speed-up.
<!-- stage10-explanations:end -->
