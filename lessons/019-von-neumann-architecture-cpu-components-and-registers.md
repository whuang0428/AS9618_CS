# Lesson 019: Von Neumann architecture, CPU components and registers

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 4: Processor fundamentals<br>
**Syllabus requirements:** S4.01, S4.02, S4.03<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S4.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.
- Understand Von Neumann architecture and the stored-program concept.


## 2. Knowledge explanation

### 1. Von Neumann architecture and the stored-program concept (S4.01)

**Atomic learning targets**

- **S4.01.A01:** Von
- **S4.01.A02:** Neumann
- **S4.01.A03:** architecture
- **S4.01.A04:** stored-program
- **S4.01.A05:** concept

**Core explanation**

- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.
- The basic Von Neumann model and the stored-program concept
- Von Neumann architecture and the stored-program concept.

**Mechanism or method**

1. **Identify the relevant condition or input** — The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.
2. **Trace how the process works** — This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
3. **Connect the mechanism to its result** — A general-purpose register can temporarily hold data or intermediate results for a range of operations.

#### Worked example: Von Neumann architecture and the stored-program concept: complete worked route

1. **Identify the relevant condition or input**

The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.

2. **Trace how the process works**

This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.

3. **Connect the mechanism to its result**

A general-purpose register can temporarily hold data or intermediate results for a range of operations.

4. **Complete example**

Run one stored program / Follow registers through fetch and indexed execute: A program and its input data are copied from SSD into IAS.

**Misconceptions to correct**

- Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

#### Mastery check (MC-L019-S4.01)

Explain the following targets in one connected answer, using a concrete example for each: Von; Neumann; architecture; stored-program; concept.

<details><summary>Answer criteria</summary>

- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.
- The basic Von Neumann model and the stored-program concept
- Von Neumann architecture and the stored-program concept.

</details>

**Supplementary concept map**

- **stored-program:** Von Neumann architecture and the stored-program concept.
- **Von:** The basic Von Neumann model and the stored-program…
- **Neumann:** The basic Von Neumann architecture uses one immediate…
- **architecture:** In the CPU-architecture requirement, the named roles are…
- **concept:** This is the stored-program concept

**Supplementary three-step recap**

1. **Name the exact concept** — Von Neumann architecture and the stored-program concept.
2. **Explain how its parts connect** — The basic Von Neumann model and the stored-program concept
3. **Use it in a concrete context** — The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.

**Why a CPU divides specialised work:** The control unit interprets the current instruction. The ALU performs the required arithmetic or logical operation.

#### Why a CPU divides specialised work

![Why a CPU divides specialised work](../web/assets/diagrams/stage10-infographics/stage10-lesson-042-architecture.jpg)

<details><summary>Text transcript</summary>

- The control unit interprets the current instruction.
- The ALU performs the required arithmetic or logical operation.
- Registers and buses hold and move the immediate values.

</details>

<details><summary>Precise syllabus wording</summary>

Understand Von Neumann architecture and the stored-program concept.

Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.

</details>

### 2. General- and special-purpose registers: PC, MDR, MAR, ACC, IX, CIR and status register (S4.02)

**Atomic learning targets**

- **S4.02.A01:** general-purpose
- **S4.02.A02:** special-purpose
- **S4.02.A03:** registers
- **S4.02.A04:** PC
- **S4.02.A05:** MDR
- **S4.02.A06:** MAR
- **S4.02.A07:** ACC
- **S4.02.A08:** IX
- **S4.02.A09:** CIR
- **S4.02.A10:** status
- **S4.02.A11:** register

**Core explanation**

- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.

**Mechanism or method**

1. **Identify the relevant condition or input** — A general-purpose register can temporarily hold data or intermediate results for a range of operations.
2. **Trace how the process works** — A special-purpose register has a defined processor role.
3. **Connect the mechanism to its result** — In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register.

#### Worked example: General- and special-purpose registers: PC, MDR, MAR, ACC, IX, CIR and status register: complete worked route

1. **Identify the relevant condition or input**

A general-purpose register can temporarily hold data or intermediate results for a range of operations.

2. **Trace how the process works**

A special-purpose register has a defined processor role.

3. **Connect the mechanism to its result**

In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register.

4. **Complete example**

Run one stored program / Follow registers through fetch and indexed execute: A program and its input data are copied from SSD into IAS. The PC supplies the address of the next instruction; the instruction is fetched through MDR into CIR, the CU decodes it, and the ALU or another component carries out the operation. PC = 300 is copied to MAR; the instruction read from memory enters MDR and then CIR. If that instruction is LDX 500 while IX = 3, the effective address is 503 and the value at that address is loaded into ACC. A resulting condition can update a flag in the status register.

**Misconceptions to correct**

- Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

#### Mastery check (MC-L019-S4.02)

Explain the following targets in one connected answer, using a concrete example for each: general-purpose; special-purpose; registers; PC; MDR; MAR; ACC; IX; CIR; status; register.

<details><summary>Answer criteria</summary>

- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.

</details>

**Supplementary concept map**

- **general-purpose:** General-purpose and special-purpose registers and explain PC, MDR,…
- **special-purpose:** General- and special-purpose registers
- **registers:** Registers provide small, fast temporary storage, buses carry…
- **register:** In the CPU-architecture requirement, the named roles are…
- **MDR:** PC, MDR, MAR, ACC, IX, CIR and status…
- **MAR:** MAR holds the address currently being accessed

**Supplementary three-step recap**

1. **Name both alternatives precisely** — General-purpose and special-purpose registers and explain PC, MDR, MAR, ACC, IX, CIR and status-register roles.
2. **Connect structure to consequence** — In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register.
3. **Justify against the scenario** — PC, MDR, MAR, ACC, IX, CIR and status register.

**ACC and status register: execute-stage evidence:** Accumulator (ACC) The accumulator commonly holds intermediate results from the ALU. For example, after adding two values, the result may be stored in the ACC.

#### ACC and status register: execute-stage evidence

![ACC and status register: execute-stage evidence](../web/assets/diagrams/stage10-infographics/stage10-lesson-044-acc-status.jpg)

<details><summary>Text transcript</summary>

- Accumulator (ACC)
- The accumulator commonly holds intermediate results from the ALU. For example, after adding two values, the result may be stored in the ACC.
- Status register
- The status register holds flags that describe the outcome of an operation or the processor state.
- Zero flag
- Can be set when an operation result is zero. Useful after comparisons or subtraction.
- Carry / overflow flags
- Can indicate a carry out or arithmetic overflow. Exact flag names vary by architecture, but the exam idea is that flags record result conditions.
- Common error
- The status register does not store the calculation result itself. It stores flags about the result.

</details>

<details><summary>Precise syllabus wording</summary>

Understand general- and special-purpose registers: PC, MDR, MAR, ACC, IX, CIR and status register.

Distinguish general-purpose and special-purpose registers and explain PC, MDR, MAR, ACC, IX, CIR and status-register roles. Cambridge assembly questions assume ACC is the available general-purpose working register.

</details>

### 3. ALU, CU, clock and immediate access store (IAS) (S4.03)

**Atomic learning targets**

- **S4.03.A01:** ALU
- **S4.03.A02:** CU
- **S4.03.A03:** clock
- **S4.03.A04:** immediate
- **S4.03.A05:** access
- **S4.03.A06:** store
- **S4.03.A07:** IAS

**Core explanation**

- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.
- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.

**Mechanism or method**

1. **Identify the relevant condition or input** — The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.
2. **Trace how the process works** — This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
3. **Connect the mechanism to its result** — The control unit (CU) fetches and decodes instructions and sends control signals.

#### Worked example: ALU, CU, clock and immediate access store (IAS): complete worked route

1. **Identify the relevant condition or input**

The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required.

2. **Trace how the process works**

This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.

3. **Connect the mechanism to its result**

The control unit (CU) fetches and decodes instructions and sends control signals.

4. **Complete example**

Run one stored program / Follow registers through fetch and indexed execute: A program and its input data are copied from SSD into IAS. the instruction is fetched through MDR into CIR, the CU decodes it, and the ALU or another component carries out the operation. If that instruction is LDX 500 while IX = 3, the effective address is 503 and the value at that address is loaded into ACC.

**Misconceptions to correct**

- Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

#### Mastery check (MC-L019-S4.03)

Explain the following targets in one connected answer, using a concrete example for each: ALU; CU; clock; immediate; access; store; IAS.

<details><summary>Answer criteria</summary>

- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.
- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.

</details>

**Supplementary concept map**

- **ALU:** The purpose and roles of the ALU, CU,…
- **clock:** ALU, CU, clock and immediate access store (IAS).
- **immediate:** The immediate access store (IAS) is processor-accessible main…
- **access:** The basic Von Neumann architecture uses one immediate…
- **store:** Program instructions are stored in memory as binary…
- **IAS:** IAS is directly accessible memory for current instructions…

**Supplementary three-step recap**

1. **Identify incoming data or signal** — The purpose and roles of the ALU, CU, system clock and Immediate Access Store (IAS).
2. **Follow the physical or logical path** — ALU, CU, clock and immediate access store (IAS).
3. **Connect output to its use** — The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device.

**How registers, buses and clock stay aligned:** Registers expose small values needed immediately. Buses carry values, addresses and control signals on distinct paths.

#### How registers, buses and clock stay aligned

![How registers, buses and clock stay aligned](../web/assets/diagrams/stage10-infographics/stage10-lesson-042-registers.jpg)

<details><summary>Text transcript</summary>

- Registers expose small values needed immediately.
- Buses carry values, addresses and control signals on distinct paths.
- Clock events determine when components may capture a new state.

</details>

<details><summary>Precise syllabus wording</summary>

Understand ALU, CU, clock and immediate access store (IAS).

Show understanding of the purpose and roles of the ALU, CU, system clock and Immediate Access Store (IAS). IAS is directly accessible memory for current instructions and data, not a register or cache.

</details>

### Lesson technical reference

- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.
- Distinguish general-purpose and special-purpose registers and explain PC, MDR, MAR, ACC, IX, CIR and status-register roles. Cambridge assembly questions assume ACC is the available general-purpose working register.
- Show understanding of the purpose and roles of the ALU, CU, system clock and Immediate Access Store (IAS). IAS is directly accessible memory for current instructions and data, not a register or cache.
- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.
- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.

Beyond syllabus / 延伸知识（不要求背诵）: modern processors add pipelining and several cache levels, but exam answers should begin with the syllabus processor model.
## 3. Practice by question type

### Question 1 - foundation - explain - 8 marks

Explain how the Von Neumann stored-program concept, IAS, CU, ALU and system clock cooperate when a program runs. Compare general-purpose and special-purpose registers, then state the roles of PC, MAR, MDR, CIR, ACC, IX and the status register.

**Answer:** instructions and data are stored together in IAS/main memory; program instructions are represented in binary and fetched from memory; CU fetches/decodes and sends control signals; ALU performs arithmetic or logical operations; clock supplies regular timing pulses to synchronise operations; IAS is directly accessible memory rather than a register or secondary storage; general-purpose register can hold values for varied operations; special-purpose register has a defined role; PC next-instruction address and CIR current instruction; MAR accessed address and MDR transferred data/instruction; ACC intermediate/final ALU result; IX offset used in indexed addressing; status register stores flags about a result or processor state

**Marking guidance:** Do not accept that instructions are permanently built into the CU, that IAS is cache, or that the ALU decodes instructions. Do not swap MAR with MDR, PC with CIR, or claim that the status register stores the calculation result.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - compare - 2 marks

Compare the ALU from the CU.

**Answer:** The ALU performs arithmetic and logical operations; the CU decodes instructions and coordinates components using control signals.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State the roles of ACC, IX and the status register.

**Answer:** ACC holds ALU results; IX an indexed-address offset; the status register holds flags about results or CPU state.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/S/25 Q1(c) | 4 | complete | recall |
| 9618/13/W/25 Q6(b) | 4 | describe | explain |
| 9618/11/W/25 Q6(c) | 3 | complete | recall |
| 9618/12/S/25 Q1(a) | 3 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S4.01: explain Von, Neumann, architecture, stored-program, concept.
- S4.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S4.02: explain general-purpose, special-purpose, registers, PC, MDR, MAR, ACC, IX, CIR, status, register.
- S4.02 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S4.03: explain ALU, CU, clock, immediate, access, store, IAS.

### Common error to correct

Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For von neumann architecture, cpu components and registers, use the exact technical term before applying it to the scenario.
