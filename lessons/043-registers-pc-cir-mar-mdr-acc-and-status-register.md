# Lesson 043: Registers: PC, CIR, MAR, MDR, ACC, and status register

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **Registers: PC, CIR, MAR, MDR, ACC, and status register**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **Registers: PC, CIR, MAR, MDR, ACC, and status register** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Registers: PC, CIR, MAR, MDR, ACC, and status register: what changes, what improves, and what limitation remains?

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: instruction or interrupt scenario. Middle: CPU/register/bus sequence. Right: performance or tracing notes.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Registers: PC, CIR, MAR, MDR, ACC, and status register**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### ACC and status register: execute-stage evidence

- **Explains:** `acc-status`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-acc-status.jpg`

1. Accumulator (ACC)
2. The accumulator commonly holds intermediate results from the ALU. For example, after adding two values, the result may be stored in the ACC.
3. Status register
4. The status register holds flags that describe the outcome of an operation or the processor state.
5. Zero flag
6. Can be set when an operation result is zero. Useful after comparisons or subtraction.
7. Carry / overflow flags
8. Can indicate a carry out or arithmetic overflow. Exact flag names vary by architecture, but the exam idea is that flags record result conditions.
9. Common error
10. The status register does not store the calculation result itself. It stores flags about the result.

### The six register roles

- **Explains:** `main-registers`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-main-registers.jpg`

1. Register
2. Full name
3. What it holds
4. Exam-safe sentence
5. Program Counter
6. Address of the next instruction to be fetched.
7. The PC is updated so the CPU knows where to fetch the next instruction.
8. Current Instruction Register
9. Instruction currently being decoded/executed.
10. The CIR holds the fetched instruction while the CU decodes it.
11. Memory Address Register
12. Address of a memory location being accessed.

### Why registers exist

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-purpose.jpg`

1. Inside the CPU
2. Registers are located inside the processor, so they can be accessed very quickly.
3. Small capacity
4. They hold only a small amount of data, usually one value, address, instruction or set of flags.
5. Temporary role
6. They hold values needed immediately during fetch, decode or execute.
7. Specific jobs
8. Different registers are designed for different temporary values.
<!-- stage10-explanations:end -->
