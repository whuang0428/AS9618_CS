# Lesson 043: Registers: PC, CIR, MAR, MDR, ACC, IX and status register

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** General-purpose and special-purpose registers

### Direct explanation

- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.

### Worked example

**Follow registers through fetch and indexed execute:** PC = 300 is copied to MAR; the instruction read from memory enters MDR and then CIR. If that instruction is LDX 500 while IX = 3, the effective address is 503 and the value at that address is loaded into ACC. A resulting condition can update a flag in the status register.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare a general-purpose register from a special-purpose register.
   **Answer:** A general-purpose register can hold values for varied operations; a special-purpose register has a defined processor role.
2. State the roles of PC, MAR, MDR and CIR.
   **Answer:** PC holds the next-instruction address; MAR the accessed address; MDR transferred data/instruction; CIR the current instruction.
3. State the roles of ACC, IX and the status register.
   **Answer:** ACC holds ALU results; IX an indexed-address offset; the status register holds flags about results or CPU state.
4. Which general-purpose working register is assumed in Cambridge assembly questions?
   **Answer:** The accumulator, ACC.
5. Base 120 plus IX 7 gives which indexed effective address?
   **Answer:** 127.

### Exam-style question and MS

**Question (6 marks):** Compare general-purpose and special-purpose registers, then state the roles of PC, MAR, MDR, CIR, ACC, IX and the status register.

| Answer | Guidance | Marks |
|---|---|---:|
| general-purpose register can hold values for varied operations; special-purpose register has a defined role | Do not swap MAR with MDR, PC with CIR, or claim that the status register stores the calculation result. | 1 |
| PC next-instruction address and CIR current instruction |  | 1 |
| MAR accessed address and MDR transferred data/instruction |  | 1 |
| ACC intermediate/final ALU result |  | 1 |
| IX offset used in indexed addressing |  | 1 |
| status register stores flags about a result or processor state |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### ACC and status register: execute-stage evidence

- **Explains:** `acc-status`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
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

### The seven named register roles

- **Explains:** `main-registers`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-043-main-registers.jpg`

1. PC holds the address of the next instruction to be fetched.
2. CIR holds the instruction currently being decoded or executed.
3. MAR holds the address of the memory location being accessed.
4. MDR holds data or an instruction being transferred to or from memory.
5. ACC holds an intermediate or final ALU result.
6. IX holds an offset used in indexed addressing.
7. The status register holds flags about a result or processor state.
8. A general-purpose register can hold varied working values; a special-purpose register has a defined processor role.
9. Cambridge assembly questions assume ACC is the available general-purpose working register.

### Why registers exist

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
