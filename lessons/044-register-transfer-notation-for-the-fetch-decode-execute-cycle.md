# Lesson 044: Register-transfer notation for the fetch-decode-execute cycle

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Register-transfer notation for the fetch-decode-execute cycle

### Direct explanation

- Register-transfer notation describes a data transfer or register update. The arrow <- means 'is loaded with' or 'receives'; it is not an equality sign. Memory[MAR] means the contents of the memory location whose address is currently held in MAR.
- A coherent fetch sequence is MAR <- PC; MDR <- Memory[MAR]; CIR <- MDR; and PC <- PC + 1 at an appropriate point before the next fetch. The control unit then decodes the opcode and operand in CIR and sends control signals for execution.
- During execution, notation such as ACC <- ACC + MDR records an arithmetic result in ACC, while Memory[MAR] <- MDR records a memory write. Read every statement from right to left: obtain the source value, then replace the destination contents.
- The exact timing of PC increment may vary between coherent processor descriptions, but MAR must receive the current instruction address before that address is replaced. Register-transfer notation describes movement and updates; it does not imply that two registers permanently contain the same value.

### Worked example

**Trace one instruction fetch:** Start with PC = 120 and Memory[120] = LDD 500. MAR <- PC puts 120 in MAR. MDR <- Memory[MAR] puts LDD 500 in MDR. CIR <- MDR copies the instruction into CIR. PC <- PC + 1 makes PC 121, ready to address the next instruction. The control unit then decodes LDD and executes it.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What does MAR <- PC mean?
   **Answer:** Copy the address currently in PC into MAR; PC is not changed by that transfer.
2. What does MDR <- Memory[MAR] mean?
   **Answer:** Read the contents of the memory location addressed by MAR into MDR.
3. Why is CIR <- MDR needed during fetch?
   **Answer:** It places the fetched instruction in CIR so the control unit can decode its opcode and operand.
4. Write register-transfer notation for adding the value in MDR to ACC.
   **Answer:** ACC <- ACC + MDR.

### Exam-style question and MS

**Question (6 marks):** Using register-transfer notation, describe the fetch of one instruction and explain the meaning of Memory[MAR].

| Answer | Guidance | Marks |
|---|---|---:|
| MAR <- PC | Do not accept PC <- MAR as the first transfer or treat Memory[MAR] as the address value itself. | 1 |
| MDR <- Memory[MAR] |  | 1 |
| CIR <- MDR |  | 1 |
| PC <- PC + 1 at a coherent point |  | 1 |
| Memory[MAR] means the contents at the memory address held in MAR |  | 1 |
| CIR is decoded and control signals initiate execution |  | 1 |
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

### The seven named register roles

- **Explains:** `main-registers`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-main-registers.jpg`

1. PC holds the address of the next instruction to be fetched.
2. CIR holds the instruction currently being decoded or executed.
3. MAR holds the address of the memory location being accessed.
4. MDR holds data or an instruction being transferred to or from memory.
5. ACC holds an intermediate or final ALU result.
6. IX holds an offset used in indexed addressing.
7. The status register holds flags about a result or processor state.
8. A general-purpose register can hold varied working values; a special-purpose register has a defined processor role.
9. Cambridge assembly questions assume ACC is the available general-purpose working register.

### Registers and buses: the FDE cycle vocabulary

- **Explains:** `processor`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-092-processor.jpg`

1. Processor review
2. PC Stores the address of the next instruction to be fetched.
3. MAR / MDR MAR stores an address; MDR stores data/instruction being transferred.
4. CIR / ACC CIR stores current instruction; ACC stores intermediate arithmetic/logic results.

### Why registers exist

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-044-purpose.jpg`

1. Inside the CPU
2. Registers are located inside the processor, so they can be accessed very quickly.
3. Small capacity
4. They hold only a small amount of data, usually one value, address, instruction or set of flags.
5. Temporary role
6. They hold values needed immediately during fetch, decode or execute.
7. Specific jobs
8. Different registers are designed for different temporary values.
<!-- stage10-explanations:end -->
