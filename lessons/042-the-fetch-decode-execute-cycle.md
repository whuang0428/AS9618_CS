# Lesson 042: The fetch-decode-execute cycle

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **The fetch-decode-execute cycle**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **The fetch-decode-execute cycle** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to The fetch-decode-execute cycle: what changes, what improves, and what limitation remains?

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
**Problem:** Trace one instruction through PC, MAR, MDR and CIR during the fetch stage.

**Worked answer / marking focus:** PC holds the address; address is copied to MAR; memory returns instruction to MDR; instruction is copied to CIR; PC is incremented. Credit sequence.



## Student Task
Students annotate a CPU diagram with numbered arrows for each fetch step.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **The fetch-decode-execute cycle**. Follow its command word and apply each point to the stated context.

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

### The cycle in one clean sentence

- **Explains:** `cycle`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-042-cycle.jpg`

1. The CPU gets the next instruction from main memory using the address stored in the PC.
2. The CU interprets the instruction in the CIR and identifies the operation and any operands needed.
3. The CPU carries out the instruction, for example using the ALU, accessing memory, or changing the PC.

### Trace one instruction through the fetch stage

- **Explains:** `cycle-visual`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-042-cycle-visual.jpg`

1. Copy the next-instruction address from PC to MAR and read the instruction from memory into MDR.
2. Move the fetched instruction from MDR to CIR.
3. Increment PC independently so that PC points to the next instruction.
4. PC does not feed CIR; only the instruction held in MDR is transferred to CIR.

### Decode and execute are not filler words

- **Explains:** `decode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-042-decode.jpg`

1. The control unit interprets the instruction in the CIR. It identifies the opcode, decides what operation is required, and identifies any operands or addresses needed.
2. Execute: arithmetic or logic
3. If the instruction is arithmetic or logical, the ALU performs the operation and a result may be stored in a register.
4. Execute: memory access
5. If the instruction needs data from memory, the CPU uses buses and registers to read from or write to the required memory address.
6. Execute: branch
7. If the instruction is a branch/jump, the PC may be changed to a different address rather than just continuing with the next instruction.
8. Common error
9. "Execute" does not always mean "ALU does maths". Some instructions move data, access memory or change the PC.

### Fetch stage: the register sequence

- **Explains:** `fetch`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-042-fetch.jpg`

1. This is the part students must be able to trace precisely.
2. Register / bus focus
3. Exam-safe wording
4. Address copied from PC to MAR.
5. PC -> MAR
6. The PC contains the address of the next instruction; this address is copied to the MAR.
7. Address sent to memory.
8. Address bus
9. The address in the MAR is placed on the address bus.
10. Memory read signal is sent.
11. Control bus
12. The CU sends a read signal on the control bus.

### The four fetch-stage names you cannot blur together

- **Explains:** `registers`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-042-registers.jpg`

1. Register roles
2. PC Program Counter: stores the address of the next instruction to be fetched.
3. MAR Memory Address Register: stores the address of the memory location being accessed.
4. MDR Memory Data Register: stores data or an instruction being transferred to or from memory.
5. CIR Current Instruction Register: stores the instruction currently being decoded/executed.
<!-- stage10-explanations:end -->
