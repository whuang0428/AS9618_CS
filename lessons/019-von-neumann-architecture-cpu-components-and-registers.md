# Lesson 019: Von Neumann architecture, CPU components and registers

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 4: Processor fundamentals<br>
**Syllabus requirements:** S4.01, S4.02, S4.03<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S4.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.
- Understand Von Neumann architecture and the stored-program concept.


## 2. Knowledge explanation

### Learning objectives

- Understand Von Neumann architecture and the stored-program concept.
- Understand general- and special-purpose registers: PC, MDR, MAR, ACC, IX, CIR and status register.
- Understand ALU, CU, clock and immediate access store (IAS).

### Concept checklist for teacher choice

- Von
- Neumann
- architecture
- stored-program
- concept
- general-purpose
- special-purpose
- registers
- PC
- MDR
- MAR
- ACC
- IX
- CIR
- status
- register
- ALU
- CU
- clock
- immediate
- access
- store
- IAS

### Detailed explanation

- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.
- Distinguish general-purpose and special-purpose registers and explain PC, MDR, MAR, ACC, IX, CIR and status-register roles. Cambridge assembly questions assume ACC is the available general-purpose working register.
- Show understanding of the purpose and roles of the ALU, CU, system clock and Immediate Access Store (IAS). IAS is directly accessible memory for current instructions and data, not a register or cache.
- The basic Von Neumann architecture uses one immediate access store for the instructions and data currently required. This is the stored-program concept: program instructions are stored in memory as binary values alongside data, and the processor fetches instructions from memory rather than being physically rewired for each program.
- The control unit (CU) fetches and decodes instructions and sends control signals. The arithmetic and logic unit (ALU) performs arithmetic and logical operations. Registers provide small, fast temporary storage, buses carry addresses, data and control signals, and the system clock supplies regular timing pulses that synchronise state changes.
- The immediate access store (IAS) is processor-accessible main memory, not a register, cache or secondary-storage device. A program held on secondary storage must be loaded into IAS before its instructions can be fetched and executed normally.
- A general-purpose register can temporarily hold data or intermediate results for a range of operations. A special-purpose register has a defined processor role. In the CPU-architecture requirement, the named roles are PC, MDR, MAR, ACC, IX, CIR and the status register. In Cambridge assembly-language questions, ACC is the only available general-purpose working register; this question convention does not remove the defined roles of the other named registers.
- PC holds the address of the next instruction; MAR holds the address currently being accessed; MDR holds data or an instruction being transferred to or from memory; CIR holds the current instruction while it is decoded or executed.
- ACC holds an intermediate or final ALU result. IX holds an offset used to form an indexed effective address. The status register holds flags about an operation or processor state, such as zero, carry or overflow; it does not hold the arithmetic result itself.

### Worked example

Run one stored program / Follow registers through fetch and indexed execute: A program and its input data are copied from SSD into IAS. The PC supplies the address of the next instruction; the instruction is fetched through MDR into CIR, the CU decodes it, and the ALU or another component carries out the operation. The same memory can hold an instruction at one address and data at another because their use is determined by the fetch and instruction semantics. PC = 300 is copied to MAR; the instruction read from memory enters MDR and then CIR. If that instruction is LDX 500 while IX = 3, the effective address is 503 and the value at that address is loaded into ACC. A resulting condition can update a flag in the status register.

Beyond syllabus / 延伸知识（不要求背诵）: modern processors add pipelining and several cache levels, but exam answers should begin with the syllabus processor model.

### Retained visual explanation

![ACC and status register: execute-stage evidence](../web/assets/diagrams/stage10-infographics/stage10-lesson-044-acc-status.jpg)

_ACC and status register: execute-stage evidence. The image and mobile text alternative come from one maintained fact source._

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

- Define von neumann architecture, cpu components and registers with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For von neumann architecture, cpu components and registers, use the exact technical term before applying it to the scenario.
