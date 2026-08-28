# Lesson 045: Assembly language and machine code

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Assembly language and machine code

### Direct explanation

- Machine code is the binary instruction form executed directly by a processor. Each bit pattern is interpreted according to that processor's instruction set, so machine code is processor dependent.
- Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions. Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used. An assembler translates assembly source into the corresponding machine code; assembly is not executed directly as text.
- The relationship is close but not based on English spelling: a mnemonic maps to an opcode defined by the target instruction set, and an operand must be encoded in the form required by that instruction. Labels are resolved to addresses during assembly.

### Worked example

**Translate one symbolic instruction:** For a target instruction set, ADD #3 is assembly source: ADD is the mnemonic and #3 is an immediate operand. The assembler selects that processor's binary ADD opcode and encodes the operand. A different processor type may use a different opcode or instruction format, so the same machine-code bit pattern is not portable by assumption.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which language form does the processor execute directly?
   **Answer:** Machine code: binary instructions defined by its instruction set.
2. Why is assembly language easier for people to use than machine code?
   **Answer:** It uses symbolic mnemonics, operands and labels instead of raw binary bit patterns.
3. What translates assembly language into machine code?
   **Answer:** An assembler.
4. Why are both forms processor specific?
   **Answer:** Their operations, opcodes and instruction formats are defined by the target processor's instruction set.

### Exam-style question and MS

**Question (6 marks):** Explain the relationship between assembly language and machine code and why an assembler and a target instruction set are required.

| Answer | Guidance | Marks |
|---|---|---:|
| machine code consists of binary instructions executed directly by the processor | Do not accept that assembly source is executed directly or that one machine-code instruction has a universal meaning across processors. | 1 |
| assembly uses mnemonics/operands/labels as a symbolic low-level form |  | 1 |
| assembler translates assembly source to machine code |  | 1 |
| mnemonic maps to an opcode and operands are encoded |  | 1 |
| instruction meanings/formats are defined by the processor instruction set |  | 1 |
| therefore code for one processor may not execute correctly on another |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **Instruction sets and machine code**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **Instruction sets and machine code** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Instruction sets and machine code: what changes, what improves, and what limitation remains?

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
- Answer one 4-mark question about **Instruction sets and machine code**. Follow its command word and apply each point to the stated context.

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

### Instruction sets and compatibility

- **Explains:** `compatibility`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-compatibility.jpg`

1. Same ISA
2. A program compiled to one instruction set can run on compatible processors that implement that instruction set.
3. Different ISA
4. Machine code for one architecture may not run correctly on another architecture.
5. Translation needed
6. Source code may need to be recompiled, interpreted, emulated or translated for a different processor.
7. Exam wording
8. Say "the CPU cannot recognise/execute those opcodes" rather than simply "the CPU does not like it".

### What is an instruction set?

- **Explains:** `instruction-set`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-instruction-set.jpg`

1. Definition
2. The set of instructions that a particular processor can recognise and execute.
3. Includes operations
4. Examples include load, store, add, subtract, compare, jump and input/output instructions.
5. Processor-specific
6. Different processor families can have different instruction sets and instruction formats.
7. Defines meaning
8. The instruction set tells the CPU what each opcode means and how operands are interpreted.

### Machine code is binary instructions for the CPU

- **Explains:** `machine-code`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-machine-code.jpg`

1. Lowest-level executable form
2. Machine code consists of binary instructions that can be executed directly by the processor.
3. Not friendly for humans
4. Binary instructions are difficult for people to read and write accurately, but they are the form the processor executes directly.
5. Stored in memory
6. Machine-code instructions are stored in memory and fetched by the CPU during the fetch-decode-execute cycle.
7. CPU-specific meaning
8. The same bit pattern can have different meanings on different architectures because opcodes are defined by the instruction set.

### Opcode and operand

- **Explains:** `opcode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-045-opcode.jpg`

1. Opcode tells the CPU which operation to perform. Operand gives the data, register, address or value used by the operation.
2. Operation
3. Example with operand
4. Load value from memory into ACC.
5. 0001 01011010 = LOAD address 90
6. Store ACC value into memory.
7. 0010 01011010 = STORE address 90
8. Add value from memory to ACC.
9. 0011 01011010 = ADD value at address 90
10. Jump to a different instruction address.
11. 0100 00001100 = jump to address 12
12. Common error
<!-- stage10-explanations:end -->
