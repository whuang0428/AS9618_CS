# Lesson 046: Assembly language basics and mnemonics

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Assembly language basics and mnemonics** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **Assembly language basics and mnemonics** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Assembly language basics and mnemonics: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **Assembly language basics and mnemonics**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: instruction or interrupt scenario. Middle: CPU/register/bus sequence. Right: performance or tracing notes.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **Assembly language basics and mnemonics**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **Assembly language basics and mnemonics** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Assembly language basics and mnemonics**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Assembly language basics and mnemonics** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Assembly language basics and mnemonics** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **assembly language basics and mnemonics**.
Correction prompt: "Show the mechanism, not just the label."

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
