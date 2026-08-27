# Lesson 046: Assembly language basics and mnemonics

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **Assembly language basics and mnemonics**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **Assembly language basics and mnemonics** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Assembly language basics and mnemonics: what changes, what improves, and what limitation remains?

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
- Answer one 4-mark question about **Assembly language basics and mnemonics**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Two-pass assembly, program tracing and the instruction set

### Direct explanation

- The two-pass assembler stages are Pass 1 and Pass 2. Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- The source form <label>: <opcode> <operand> labels an instruction, while <label>: <data> assigns a symbolic address to a memory location containing data. Pass 1 records both kinds of label in the symbol table.
- The five instruction groups are data movement (LDM, LDD, LDI, LDX, LDR, MOV, STO), input/output (IN, OUT), arithmetic (ADD, SUB, INC, DEC), unconditional branch and conditional branch. JMP is the unconditional branch instruction; CMP, CMI, JPE and JPN form the compare and conditional branch group. END returns control to the operating system.
- Data movement: LDM #n loads immediate n into ACC; LDD <address> loads the directly addressed contents into ACC; LDI <address> follows the address stored at <address>; LDX <address> loads from <address> + IX; LDR #n loads n into IX; MOV <register> moves ACC to IX; STO <address> stores ACC at the address.
- Arithmetic: ADD <address> or ADD #n/Bn/&n adds a memory value or immediate denary/binary/hexadecimal value to ACC; SUB has the corresponding forms; INC <register> and DEC <register> change ACC or IX by one.
- Control, comparison and I/O: JMP <address> is unconditional. CMP <address> or CMP #n compares ACC directly or with an immediate value. CMI <address> compares using indirect addressing. JPE jumps after a True comparison and JPN after a False comparison. IN inputs one ASCII character code to ACC; OUT outputs the character whose ASCII code is in ACC; END returns control to the operating system.
- ACC is the accumulator and IX is the index register. An address can be absolute or symbolic. Prefix # gives immediate denary, B immediate binary and & immediate hexadecimal data. These prefixes and operand forms are part of the instruction semantics, not optional decoration.
- To trace a simple assembly-language program, make a table with one row per executed instruction and columns for the current instruction/address, ACC, IX, relevant memory or output, and branch result. Update only the state changed by that instruction, then use the updated PC or branch target to choose the next row; do not trace source lines that a taken jump skips.

### Worked example

**Assemble, classify and trace a short program:** For LDM #5; ADD #3; CMP #8; JPE MATCH; LDM #0; MATCH: OUT; END, the trace gives ACC 5, then 8, then a True comparison. JPE transfers control to MATCH, so LDM #0 is skipped; OUT outputs the character whose ASCII code is 8, and END returns control to the operating system. In LOOP: ADD ONE, LOOP labels an instruction; ONE: 1 labels the data location containing 1.

### Targeted practice and answers

1. Which pass builds the symbol table?
   **Answer:** Pass 1.
2. What does Pass 2 do?
   **Answer:** Pass 2 translates mnemonics and operands into machine code using the completed symbol table.
3. What is the difference between LDM #5 and LDD 5?
   **Answer:** LDM loads literal 5; LDD loads the contents of memory address 5.
4. What does LDR #7 do?
   **Answer:** It loads the immediate value 7 into the index register IX.
5. Classify IN, SUB, JMP and JPN.
   **Answer:** IN is input/output; SUB is arithmetic; JMP is unconditional; JPN is conditional/compare.
6. Distinguish CMP #4 from CMI 40.
   **Answer:** CMP #4 compares ACC with immediate value 4; CMI 40 follows the address stored at memory location 40 and compares ACC with the indirectly addressed value.
7. What do MOV IX, STO TOTAL, OUT and END do?
   **Answer:** MOV IX copies ACC to IX; STO TOTAL stores ACC at the symbolic address TOTAL; OUT outputs the ASCII character whose code is in ACC; END returns control to the operating system.
8. Trace LDM #2; ADD #3; STO TOTAL. What changes?
   **Answer:** ACC becomes 2, then 5; memory at symbolic address TOTAL becomes 5.

### Exam-style question and MS

**Question (6 marks):** Trace the supplied program and classify the instructions, showing each change to ACC, IX, memory, output and control flow.

- **M1** uses one row per executed instruction in the correct control-flow order
- **A1** updates ACC and IX correctly for data movement/arithmetic
- **A1** updates memory or output correctly for STO/OUT
- **M1** records compare result before evaluating JPE or JPN
- **A1** follows the correct taken/not-taken branch and skips non-executed lines
- **B1** classifies used instructions in the official data movement, input/output, arithmetic, unconditional/conditional and compare groups

**Strict note:** Do not accept relative LDR, immediate CMI, equality/zero JPE, negative JPN, or a trace that executes a line skipped by a taken branch.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Instruction groups: data movement, I/O, arithmetic, control and compare

- **Explains:** `assembler`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-046-assembler.jpg`

1. The five groups are data movement, input/output, arithmetic, unconditional/conditional instructions and compare.
2. Data movement uses LDM, LDD, LDI, LDX, LDR, MOV and STO; LDR #n loads the immediate value n into IX.
3. Input/output uses IN and OUT; arithmetic uses ADD, SUB, INC and DEC.
4. JMP is unconditional; CMP and CMI compare; JPE jumps after True and JPN jumps after False.
5. END returns control to the operating system.

### What assembly language is

- **Explains:** `assembly`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-046-assembly.jpg`

1. Low-level language
2. Assembly language is close to machine code and closely linked to a processor's instruction set.
3. Uses mnemonics
4. Human-readable abbreviations represent machine-code operations.
5. Processor-specific
6. Assembly syntax and available instructions depend on the target architecture.
7. Needs translation
8. An assembler converts assembly language into machine code.

### Mnemonics represent operations

- **Explains:** `mnemonics`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-046-mnemonics.jpg`

1. Mnemonic
2. Likely operation
3. Exam-safe wording
4. Load a value into a register/ACC.
5. LOAD count
6. LOAD is a mnemonic for a machine-code load instruction.
7. Store a register/ACC value in memory.
8. STORE total
9. STORE represents an operation that writes a value to memory.
10. Add a value to a register/ACC.
11. ADD value
12. ADD is easier to read than a binary opcode for addition.

### Instruction labels and symbolic data addresses

- **Explains:** `structure`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-046-structure.jpg`

1. <label>: <opcode> <operand> gives a symbolic address to an instruction.
2. <label>: <data> gives a symbolic address to a memory location containing data.
3. Pass 1 records both instruction and data labels in the symbol table.
4. Pass 2 replaces a label reference with its resolved address while translating.
<!-- stage10-explanations:end -->
