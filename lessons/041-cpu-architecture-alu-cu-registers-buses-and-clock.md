# Lesson 041: Von Neumann architecture, CPU components and registers

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Von Neumann architecture, CPU components and registers

### Direct explanation

- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.
- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.

### Worked example

**Run one stored program / Follow registers through fetch and indexed execute:** A program and its input data are copied from SSD into IAS. The PC supplies the address of the next instruction; the instruction is fetched through MDR into CIR, the CU decodes it, and the ALU or another component carries out the operation. The same memory can hold an instruction at one address and data at another because their use is determined by the fetch and instruction semantics. PC = 300 is copied to MAR; the instruction read from memory enters MDR and then CIR. If that instruction is LDX 500 while IX = 3, the effective address is 503 and the value at that address is loaded into ACC. A resulting condition can update a flag in the status register.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What is the stored-program concept?
   **Answer:** Program instructions are stored in memory in binary form alongside data and are fetched by the processor for execution.
2. Why is this a Von Neumann model?
   **Answer:** The basic model uses the same directly accessible memory for instructions and data.
3. Compare the ALU from the CU.
   **Answer:** The ALU performs arithmetic and logical operations; the CU decodes instructions and coordinates components using control signals.
4. What does the system clock do?
   **Answer:** It supplies regular timing pulses that synchronise processor operations and state changes.
5. Why is IAS not a CPU register?
   **Answer:** IAS is processor-accessible main memory for current instructions and data; registers are smaller temporary locations inside the CPU.
6. Compare a general-purpose register from a special-purpose register.
   **Answer:** A general-purpose register can hold values for varied operations; a special-purpose register has a defined processor role.
7. State the roles of PC, MAR, MDR and CIR.
   **Answer:** PC holds the next-instruction address; MAR the accessed address; MDR transferred data/instruction; CIR the current instruction.
8. State the roles of ACC, IX and the status register.
   **Answer:** ACC holds ALU results; IX an indexed-address offset; the status register holds flags about results or CPU state.
9. Which general-purpose working register is assumed in Cambridge assembly questions?
   **Answer:** The accumulator, ACC.
10. Base 120 plus IX 7 gives which indexed effective address?
   **Answer:** 127.

### Exam-style question and MS

**Question (12 marks):** Explain how the Von Neumann stored-program concept, IAS, CU, ALU and system clock cooperate when a program runs. Compare general-purpose and special-purpose registers, then state the roles of PC, MAR, MDR, CIR, ACC, IX and the status register.

| Answer | Guidance | Marks |
|---|---|---:|
| instructions and data are stored together in IAS/main memory | Do not accept that instructions are permanently built into the CU, that IAS is cache, or that the ALU decodes instructions. Do not swap MAR with MDR, PC with CIR, or claim that the status register stores the calculation result. | 1 |
| program instructions are represented in binary and fetched from memory |  | 1 |
| CU fetches/decodes and sends control signals |  | 1 |
| ALU performs arithmetic or logical operations |  | 1 |
| clock supplies regular timing pulses to synchronise operations |  | 1 |
| IAS is directly accessible memory rather than a register or secondary storage |  | 1 |
| general-purpose register can hold values for varied operations; special-purpose register has a defined role |  | 1 |
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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why control and calculation are separate

- **Explains:** `alu-cu`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-alu-cu.jpg`

1. The control unit decodes what the instruction demands.
2. It sends signals that select data movement and an ALU operation.
3. The ALU returns a result and status information.
- **Analogy:** A coordinator chooses the operation; a specialist instrument performs it.
- **Boundary:** The control unit coordinates calculation but does not replace the ALU.

### Why a CPU divides specialised work

- **Explains:** `architecture`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-architecture.jpg`

1. The control unit interprets the current instruction.
2. The ALU performs the required arithmetic or logical operation.
3. Registers and buses hold and move the immediate values.
- **Analogy:** A laboratory separates coordination, processing, temporary trays and transport lanes.
- **Boundary:** The components form one system; none executes a program alone.

### Inside the CPU, outside the CPU, and what connects them

- **Explains:** `cpu-map`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-cpu-map.jpg`

1. The address bus normally carries addresses from the CPU to memory or I/O.
2. The data bus is bidirectional and carries data or instructions.
3. The control bus is bidirectional overall: the CPU sends read/write signals and devices or controllers can send interrupts and status signals back.

### How registers, buses and clock stay aligned

- **Explains:** `registers`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-041-registers.jpg`

1. Registers expose small values needed immediately.
2. Buses carry values, addresses and control signals on distinct paths.
3. Clock events determine when components may capture a new state.
- **Analogy:** Timed transfer gates stop items arriving halfway through an operation.
- **Boundary:** A faster clock helps only when the rest of the architecture can keep up.
<!-- stage10-explanations:end -->
