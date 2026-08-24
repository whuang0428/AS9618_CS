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

## Stage 2 syllabus completion

**Official audit rows:** S4.10, S4.13
**Focus:** Two-pass assembler and core instruction semantics

### Direct explanation

- Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- Core mnemonics must be read by effect: LDM immediate; LDD direct; LDI indirect; LDX indexed; LDR relative; MOV register transfer; STO memory store; ADD/SUB/INC/DEC arithmetic; JMP branch; CMP/CMI compare; JPE/JPN conditional branches; IN/OUT I/O; END stops.

### Worked example

**Forward label:** JMP FINISH appears before FINISH. Pass 1 records FINISH's eventual address in the symbol table; pass 2 substitutes that address when translating JMP.

### Targeted practice and answers

1. Which pass builds the symbol table?
   **Answer:** Pass 1.
2. What is the difference between LDM #5 and LDD 5?
   **Answer:** LDM loads literal 5; LDD loads the contents of memory address 5.
3. Which instruction terminates execution?
   **Answer:** END.

### Exam-style question and MS

**Question (4 marks):** Explain why an assembler commonly uses two passes when a program contains a forward reference.

- **B1** label is used before its address is known
- **B1** pass 1 assigns addresses/builds the symbol table
- **B1** the forward label address is then available
- **B1** pass 2 translates the instruction/substitutes the address into machine code

**Strict note:** Do not accept that pass 1 executes the program; both passes translate source.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Assembler: text to machine code

- **Explains:** `assembler`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-046-assembler.jpg`

1. 1. Read source Assembly source contains mnemonics, labels, operands, comments and directives.
2. 2. Resolve labels Labels are replaced with actual addresses or offsets.
3. 3. Translate mnemonics Mnemonics are converted to binary opcodes and operands are encoded.
4. 4. Output object/machine code The generated machine code can be loaded and executed by the processor.
5. Common error
6. An assembler translates assembly to machine code. A compiler usually translates high-level language to lower-level code.

### What assembly language is

- **Explains:** `assembly`
- **Explanation type:** mechanism
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

### Structure of a simple assembly line

- **Explains:** `structure`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-046-structure.jpg`

1. LOOP: ADD value ; add next item
2. LOOP: label
3. ADD mnemonic
4. value operand
5. ; add next item comment
6. A symbolic name for an address or line, often used by jump/branch instructions.
7. The value, address, register or label used by the instruction.
8. Text for human readers. Comments are ignored by the assembler.
9. Directive
10. An instruction to the assembler, not a CPU instruction. It may reserve storage or define constants.
<!-- stage10-explanations:end -->
