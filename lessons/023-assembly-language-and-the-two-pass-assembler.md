# Lesson 023: Assembly language and the two-pass assembler

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 4: Processor fundamentals<br>
**Syllabus requirements:** S4.09, S4.10<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S4.01, S4.09 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.
- Understand Von Neumann architecture and the stored-program concept.
- Show the relationship between assembly language and machine code: assembly is a processor-specific symbolic low-level form translated by an assembler into binary instructions defined by the target instruction set.
- Distinguish assembly language and machine code.


## 2. Knowledge explanation

### 1. Assembly language and machine code (S4.09)

**Atomic learning targets**

- **S4.09.A01:** assembly
- **S4.09.A02:** language
- **S4.09.A03:** machine
- **S4.09.A04:** code

**Core explanation**

- Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions. Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used. An assembler translates assembly source into the corresponding machine code; assembly is not executed directly as text.
- Control, comparison and I/O: JMP <address is unconditional. CMP <address or CMP n compares ACC directly or with an immediate value. CMI <address compares using indirect addressing. JPE jumps after a True comparison and JPN after a False comparison. IN inputs one ASCII character code to ACC; OUT outputs the character whose ASCII code is in ACC; END returns control to the operating system.
- The two-pass assembler stages are Pass 1 and Pass 2. Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- The relationship is close but not based on English spelling: a mnemonic maps to an opcode defined by the target instruction set, and an operand must be encoded in the form required by that instruction. Labels are resolved to addresses during assembly.

**Mechanism or method**

1. **Identify the relevant condition or input** — Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions.
2. **Trace how the process works** — Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used.
3. **Connect the mechanism to its result** — An assembler translates assembly source into the corresponding machine code;

#### Worked example: Assembly language and machine code: complete worked route

1. **Identify the relevant condition or input**

Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions.

2. **Trace how the process works**

Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used.

3. **Connect the mechanism to its result**

An assembler translates assembly source into the corresponding machine code;

4. **Complete example**

Translate one symbolic instruction: For a target instruction set, ADD 3 is assembly source: ADD is the mnemonic and 3 is an immediate operand. The assembler selects that processor's binary ADD opcode and encodes the operand. A different processor type may use a different opcode or instruction format, so the same machine-code bit pattern is not portable by assumption.

**Misconceptions to correct**

- Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

#### Mastery check (MC-L023-S4.09)

Distinguish the following targets in one connected answer, using a concrete example for each: assembly; language; machine; code.

<details><summary>Answer criteria</summary>

- Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions. Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used. An assembler translates assembly source into the corresponding machine code; assembly is not executed directly as text.
- Control, comparison and I/O: JMP <address is unconditional. CMP <address or CMP n compares ACC directly or with an immediate value. CMI <address compares using indirect addressing. JPE jumps after a True comparison and JPN after a False comparison. IN inputs one ASCII character code to ACC; OUT outputs the character whose ASCII code is in ACC; END returns control to the operating system.
- The two-pass assembler stages are Pass 1 and Pass 2. Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- The relationship is close but not based on English spelling: a mnemonic maps to an opcode defined by the target instruction set, and an operand must be encoded in the form required by that instruction. Labels are resolved to addresses during assembly.

</details>

**Supplementary concept map**

- **assembly:** Assembly language and machine code.
- **language:** Show the relationship between assembly language and machine…
- **machine:** Assembly language is a low-level, processor-specific symbolic representation…
- **code:** An assembler translates assembly source into the corresponding…
- **distinguish:** Pass 2 translates mnemonics/operands using the completed table…

**Supplementary three-step recap**

1. **Name both alternatives precisely** — Assembly language and machine code.
2. **Connect structure to consequence** — Show the relationship between assembly language and machine code
3. **Justify against the scenario** — Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions.

**Machine code is binary instructions for the CPU:** Lowest-level executable form Machine code consists of binary instructions that can be executed directly by the processor.

#### Machine code is binary instructions for the CPU

![Machine code is binary instructions for the CPU](../web/assets/diagrams/stage10-infographics/stage10-lesson-046-machine-code.jpg)

<details><summary>Text transcript</summary>

- Lowest-level executable form
- Machine code consists of binary instructions that can be executed directly by the processor.
- Not friendly for humans
- Binary instructions are difficult for people to read and write accurately, but they are the form the processor executes directly.
- Stored in memory
- Machine-code instructions are stored in memory and fetched by the CPU during the fetch-decode-execute cycle.
- CPU-specific meaning
- The same bit pattern can have different meanings on different architectures because opcodes are defined by the instruction set.

</details>

<details><summary>Precise syllabus wording</summary>

Distinguish assembly language and machine code.

Show the relationship between assembly language and machine code: assembly is a processor-specific symbolic low-level form translated by an assembler into binary instructions defined by the target instruction set.

</details>

### 2. And apply the stages of a two-pass assembler (S4.10)

**Atomic learning targets**

- **S4.10.A01:** stages
- **S4.10.A02:** two-pass
- **S4.10.A03:** assembler

**Core explanation**

- The two-pass assembler stages are Pass 1 and Pass 2. Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions. Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used. An assembler translates assembly source into the corresponding machine code; assembly is not executed directly as text.
- Show the relationship between assembly language and machine code: assembly is a processor-specific symbolic low-level form translated by an assembler into binary instructions defined by the target instruction set.

**Mechanism or method**

1. **Establish the exact components or states** — The two-pass assembler stages are Pass 1 and Pass 2.
2. **Trace the relationship or change** — Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references.
3. **Use the explanation in a concrete case** — Pass 2 translates mnemonics/operands using the completed table and produces machine code;

#### Worked example: And apply the stages of a two-pass assembler: complete worked route

1. **Establish the exact components or states**

The two-pass assembler stages are Pass 1 and Pass 2.

2. **Trace the relationship or change**

Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references.

3. **Use the explanation in a concrete case**

Pass 2 translates mnemonics/operands using the completed table and produces machine code;

4. **Complete example**

The assembler selects that processor's binary ADD opcode and encodes the operand.

**Misconceptions to correct**

- Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

#### Mastery check (MC-L023-S4.10)

Describe the following targets in one connected answer, using a concrete example for each: stages; two-pass; assembler.

<details><summary>Answer criteria</summary>

- The two-pass assembler stages are Pass 1 and Pass 2. Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions. Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used. An assembler translates assembly source into the corresponding machine code; assembly is not executed directly as text.
- Show the relationship between assembly language and machine code: assembly is a processor-specific symbolic low-level form translated by an assembler into binary instructions defined by the target instruction set.

</details>

**Supplementary concept map**

- **Pass 1:** Assign addresses and record labels
- **Symbol table:** Maps labels to addresses
- **Pass 2:** Translate using resolved symbols
- **Error:** Report an undefined label
- **stages:** And apply the stages of a two-pass assembler.
- **two-pass:** The different stages of a two-pass assembler and…

**Supplementary three-step recap**

1. **Name the exact concept** — And apply the stages of a two-pass assembler.
2. **Explain how its parts connect** — The different stages of a two-pass assembler and apply the process to a simple program
3. **Use it in a concrete context** — The two-pass assembler stages are Pass 1 and Pass 2.

**Concrete case: Pass 1:** And apply the stages of a two-pass assembler.



<details><summary>Precise syllabus wording</summary>

Describe and apply the stages of a two-pass assembler.

Describe the different stages of a two-pass assembler and apply the process to a simple program: pass 1 assigns addresses/builds the symbol table and pass 2 translates with resolved symbols.

</details>

### Lesson technical reference

- Show the relationship between assembly language and machine code: assembly is a processor-specific symbolic low-level form translated by an assembler into binary instructions defined by the target instruction set.
- Describe the different stages of a two-pass assembler and apply the process to a simple program: pass 1 assigns addresses/builds the symbol table and pass 2 translates with resolved symbols.
- Machine code is the binary instruction form executed directly by a processor. Each bit pattern is interpreted according to that processor's instruction set, so machine code is processor dependent.
- Assembly language is a low-level, processor-specific symbolic representation of machine-code instructions. Mnemonics such as ADD make operations easier for a human to read and write, while operands name the value, register or address used. An assembler translates assembly source into the corresponding machine code; assembly is not executed directly as text.
- The relationship is close but not based on English spelling: a mnemonic maps to an opcode defined by the target instruction set, and an operand must be encoded in the form required by that instruction. Labels are resolved to addresses during assembly.
- The two-pass assembler stages are Pass 1 and Pass 2. Pass 1 scans source, assigns addresses and builds a symbol table for labels, allowing forward references. Pass 2 translates mnemonics/operands using the completed table and produces machine code; invalid mnemonics or unresolved symbols are reported.
- The source form <label: <opcode <operand labels an instruction, while <label: <data assigns a symbolic address to a memory location containing data. Pass 1 records both kinds of label in the symbol table.
- The five instruction groups are data movement (LDM, LDD, LDI, LDX, LDR, MOV, STO), input/output (IN, OUT), arithmetic (ADD, SUB, INC, DEC), unconditional branch and conditional branch. JMP is the unconditional branch instruction; CMP, CMI, JPE and JPN form the compare and conditional branch group. END returns control to the operating system.
- Data movement: LDM n loads immediate n into ACC; LDD <address loads the directly addressed contents into ACC; LDI <address follows the address stored at <address; LDX <address loads from <address + IX; LDR n loads n into IX; MOV <register moves ACC to IX; STO <address stores ACC at the address.
- Arithmetic: ADD <address or ADD n/Bn/&n adds a memory value or immediate denary/binary/hexadecimal value to ACC; SUB has the corresponding forms; INC <register and DEC <register change ACC or IX by one.
- Control, comparison and I/O: JMP <address is unconditional. CMP <address or CMP n compares ACC directly or with an immediate value. CMI <address compares using indirect addressing. JPE jumps after a True comparison and JPN after a False comparison. IN inputs one ASCII character code to ACC; OUT outputs the character whose ASCII code is in ACC; END returns control to the operating system.
- ACC is the accumulator and IX is the index register. An address can be absolute or symbolic. Prefix gives immediate denary, B immediate binary and & immediate hexadecimal data. These prefixes and operand forms are part of the instruction semantics, not optional decoration.

Beyond syllabus / 延伸知识（不要求背诵）: modern processors add pipelining and several cache levels, but exam answers should begin with the syllabus processor model.
## 3. Practice by question type

### Question 1 - foundation - explain - 6 marks

Explain the relationship between assembly language and machine code and why an assembler and a target instruction set are required.

**Answer:** machine code consists of binary instructions executed directly by the processor; assembly uses mnemonics/operands/labels as a symbolic low-level form; assembler translates assembly source to machine code; mnemonic maps to an opcode and operands are encoded; instruction meanings/formats are defined by the processor instruction set; therefore code for one processor may not execute correctly on another

**Marking guidance:** Do not accept that assembly source is executed directly or that one machine-code instruction has a universal meaning across processors.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - apply - 2 marks

What translates assembly language into machine code?

**Answer:** An assembler.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

Why is assembly language easier for people to use than machine code?

**Answer:** It uses symbolic mnemonics, operands and labels instead of raw binary bit patterns.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/13/W/25 Q6(c) | 3 | complete | recall |
| 9618/12/S/23 Q3(a) | 3 | draw | calculate |
| 9618/12/S/23 Q3(b) | 3 | complete | calculate |
| 9618/11/W/23 Q8(a) | 1 | identify | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S4.09: explain assembly, language, machine, code.
- S4.09 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S4.10: explain stages, two-pass, assembler.
- S4.10 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case.
- Correction to remember: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

### Common error to correct

Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For assembly language and the two-pass assembler, use the exact technical term before applying it to the scenario.
