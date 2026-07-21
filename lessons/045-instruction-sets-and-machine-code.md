# Lesson 045: Instruction sets and machine code

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Instruction sets and machine code** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **Instruction sets and machine code** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Instruction sets and machine code: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **Instruction sets and machine code**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: instruction or interrupt scenario. Middle: CPU/register/bus sequence. Right: performance or tracing notes.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **Instruction sets and machine code**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **Instruction sets and machine code** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Instruction sets and machine code**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Instruction sets and machine code** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Instruction sets and machine code** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **instruction sets and machine code**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S4.12
**Focus:** Assembly instruction groups

### Direct explanation

- Data movement instructions transfer values between memory/registers; input/output instructions communicate with devices; arithmetic instructions change numeric values; compare instructions set status information; branch instructions change the next instruction address.
- A conditional branch depends on a comparison/status condition, while an unconditional jump always changes the PC. Classifying by effect helps trace code before considering a specific mnemonic.

### Worked example

**Classify a loop:** LDD COUNT is data movement, CMP LIMIT is comparison, JPE DONE is conditional branch, INC COUNT is arithmetic, JMP LOOP is unconditional branch and OUT is output.

### Targeted practice and answers

1. Which group does STO belong to?
   **Answer:** Data movement/storage.
2. Why is JPE conditional?
   **Answer:** It branches only when the equality condition/status is satisfied.
3. Which group changes a numeric accumulator value?
   **Answer:** Arithmetic.

### Exam-style question and MS

**Question (4 marks):** Explain the difference between a compare instruction, a conditional branch and an unconditional branch.

- **B1** compare tests values / sets status without itself selecting normal data output
- **B1** conditional branch changes flow only when a condition/status is met
- **B1** unconditional branch always changes the next instruction/PC
- **B1** uses a coherent example or sequence

**Strict note:** Do not accept that CMP itself necessarily jumps to another instruction.
