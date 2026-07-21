# Lesson 043: Registers: PC, CIR, MAR, MDR, ACC, and status register

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Registers: PC, CIR, MAR, MDR, ACC, and status register** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **Registers: PC, CIR, MAR, MDR, ACC, and status register** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Registers: PC, CIR, MAR, MDR, ACC, and status register: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **Registers: PC, CIR, MAR, MDR, ACC, and status register**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **Registers: PC, CIR, MAR, MDR, ACC, and status register**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **Registers: PC, CIR, MAR, MDR, ACC, and status register** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Registers: PC, CIR, MAR, MDR, ACC, and status register**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Registers: PC, CIR, MAR, MDR, ACC, and status register** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Registers: PC, CIR, MAR, MDR, ACC, and status register** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **registers: pc, cir, mar, mdr, acc, and status register**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S4.02
**Focus:** Index register (IX)

### Direct explanation

- The index register stores an offset used to modify an address in an indexed instruction. The effective address is formed by adding the instruction's address operand to the IX value.
- Indexed addressing is useful for arrays because the base address stays fixed while IX changes for successive elements. IX stores the offset/index contribution, not necessarily the array data itself.

### Worked example

**Access ARRAY[3]:** If the base address is 500 and IX contains 3, LDX 500 accesses effective address 503 (assuming one address per element). Incrementing IX moves to the next element.

### Targeted practice and answers

1. What does IX normally store?
   **Answer:** An offset/index used in effective-address calculation.
2. Base 120 plus IX 7 gives which effective address?
   **Answer:** 127.
3. Why is IX useful for arrays?
   **Answer:** The same instruction/base can access successive elements by changing the offset.

### Exam-style question and MS

**Question (4 marks):** An instruction uses indexed addressing with address operand 240 and IX = 6. State the effective address and explain the role of IX.

- **B1** effective address is 246
- **B1** IX stores an offset/index
- **B1** offset is added to the instruction/base address
- **B1** allows repeated access to array/list elements

**Strict note:** Do not accept 240 as the effective address when IX is non-zero.
