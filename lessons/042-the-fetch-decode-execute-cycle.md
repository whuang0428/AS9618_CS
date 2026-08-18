# Lesson 042: The fetch-decode-execute cycle

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 4  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **The fetch-decode-execute cycle** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **The fetch-decode-execute cycle** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to The fetch-decode-execute cycle: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **The fetch-decode-execute cycle**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace one instruction through PC, MAR, MDR and CIR during the fetch stage. The worked example must explicitly use **The fetch-decode-execute cycle**, not a generic example from the wider unit.

**Worked answer / marking focus:** PC holds the address; address is copied to MAR; memory returns instruction to MDR; instruction is copied to CIR; PC is incremented. Credit sequence.



## Student Task
Students annotate a CPU diagram with numbered arrows for each fetch step. Their final answer must include the phrase **The fetch-decode-execute cycle** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **The fetch-decode-execute cycle**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **The fetch-decode-execute cycle** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **The fetch-decode-execute cycle** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **the fetch-decode-execute cycle**.  
Correction prompt: "Show the mechanism, not just the label."

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

1. Visual explanation
2. Read left to right. The labels name what is held or transferred, so the register names are tied to a job rather than memorised as a list.
3. 1. PC → MAR Copy the address of the next instruction into the MAR.
4. 2. Memory read Send the address and a read signal; return the instruction to the MDR.
5. 3. MDR → CIR Move the fetched instruction into the CIR and increment the PC.
6. 4. Decode, execute, repeat The CU decodes; the CPU performs the instruction; the cycle starts again.
7. Check the diagram: why is the instruction copied to the CIR before decoding?
8. The CIR holds the current instruction so the control unit can decode its opcode and identify any operands or addresses needed for execution.

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
8. Common trap
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
