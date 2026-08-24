# Lesson 041: CPU architecture: ALU, CU, registers, buses, and clock

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **CPU architecture: ALU, CU, registers, buses, and clock**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **CPU architecture: ALU, CU, registers, buses, and clock** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to CPU architecture: ALU, CU, registers, buses, and clock: what changes, what improves, and what limitation remains?

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
- Answer one 4-mark question about **CPU architecture: ALU, CU, registers, buses, and clock**. Follow its command word and apply each point to the stated context.

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

**Official audit rows:** S4.03
**Focus:** Immediate access store (IAS)

### Direct explanation

- The immediate access store is memory directly accessible by the processor for instructions and data currently required. In the stored-program model, instructions and data share this memory and are distinguished by how they are used.
- IAS is not the same as a CPU register or secondary storage. Registers are smaller locations inside the CPU; secondary storage must supply programs/data to main memory before normal execution.

### Worked example

**Run a stored program:** Instructions and working data are loaded from SSD into the IAS/main memory. The CPU fetches an instruction from that memory into the MDR/CIR, then executes it using registers and the ALU.

### Targeted practice and answers

1. What two kinds of item are held in IAS?
   **Answer:** Instructions and data currently required.
2. Is IAS a CPU register?
   **Answer:** No; it is processor-accessible main memory.
3. Why must a program on secondary storage be loaded into IAS?
   **Answer:** The processor fetches executable instructions from directly accessible main memory.

### Exam-style question and MS

**Question (4 marks):** Explain the role of the immediate access store in a stored-program computer.

- **B1** stores instructions currently required
- **B1** stores data currently required
- **B1** processor can directly access/fetch from it
- **B1** instructions and data share memory in Von Neumann architecture

**Strict note:** Do not accept 'IAS is cache' or 'IAS is a register'.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why control and calculation are separate

- **Explains:** `alu-cu`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-alu-cu.jpg`

1. The control unit decodes what the instruction demands.
2. It sends signals that select data movement and an ALU operation.
3. The ALU returns a result and status information.
- **Analogy:** A coordinator chooses the operation; a specialist instrument performs it.
- **Boundary:** The control unit coordinates calculation but does not replace the ALU.

### Why a CPU divides specialised work

- **Explains:** `architecture`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-architecture.jpg`

1. The control unit interprets the current instruction.
2. The ALU performs the required arithmetic or logical operation.
3. Registers and buses hold and move the immediate values.
- **Analogy:** A laboratory separates coordination, processing, temporary trays and transport lanes.
- **Boundary:** The components form one system; none executes a program alone.

### Inside the CPU, outside the CPU, and what connects them

- **Explains:** `cpu-map`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-cpu-map.jpg`

1. Visual explanation
2. The ALU, CU and registers are processor components. Main memory is outside the CPU; buses carry addresses, data and control signals between them.
3. CU Coordinates the fetch-decode-execute cycle and sends control signals.
4. ALU Performs arithmetic operations, comparisons and Boolean logic.
5. Registers + clock Registers hold immediate working values; clock pulses coordinate timing.
6. Buses + memory Buses connect the CPU to memory without making memory part of the CPU.
7. Check the diagram: is main memory a register inside the CPU?
8. No. Registers are small, fast storage locations inside the CPU. Main memory is a separate component connected to the CPU by buses.

### How registers, buses and clock stay aligned

- **Explains:** `registers`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-registers.jpg`

1. Registers expose small values needed immediately.
2. Buses carry values, addresses and control signals on distinct paths.
3. Clock events determine when components may capture a new state.
- **Analogy:** Timed transfer gates stop items arriving halfway through an operation.
- **Boundary:** A faster clock helps only when the rest of the architecture can keep up.
<!-- stage10-explanations:end -->
