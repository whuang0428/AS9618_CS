# Lesson 050: Pipelining and why faster is not always simpler

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Pipelining and why faster is not always simpler** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Ask students to act as registers passing one instruction around the room. If the Program Counter forgets its job, the whole class becomes a very expensive paperweight.

Lesson-specific focus question: What would go wrong if a student confused **Pipelining and why faster is not always simpler** with a neighbouring syllabus idea?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Pipelining and why faster is not always simpler: what changes, what improves, and what limitation remains?

Topic-specific teaching move: keep the explanation anchored to **Pipelining and why faster is not always simpler**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace one fetch-decode-execute cycle and name the role of two registers. The worked example must explicitly use **Pipelining and why faster is not always simpler**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct sequence: address from PC to MAR, instruction/data via memory and MDR, instruction held in CIR, PC updated as appropriate.



## Student Task
Students annotate a CPU diagram with arrows for one instruction, then explain the path in four precise sentences. Their final answer must include the phrase **Pipelining and why faster is not always simpler** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Pipelining and why faster is not always simpler**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Pipelining and why faster is not always simpler** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Pipelining and why faster is not always simpler** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds. For this lesson, make students contrast that mistake with the exact idea of **pipelining and why faster is not always simpler**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S4.15
**Focus:** Bit masks and logical shifts

### Direct explanation

- AND with a mask tests/clears bits: mask 1 preserves a bit and mask 0 clears it. OR sets selected bits because OR with 1 gives 1. XOR toggles selected bits because XOR with 1 reverses the bit.
- LSL moves bits left, inserts 0 on the right and discards the leftmost bit; without overflow this multiplies an unsigned value by 2. LSR moves bits right, inserts 0 on the left and discards the rightmost bit; for unsigned values this divides by 2 using integer truncation.

### Worked example

**Test bit 3:** For value 10110100 and mask 00001000, AND gives 00000000, so that bit is 0. OR with the same mask would set it; XOR would toggle it.

### Targeted practice and answers

1. Which operation sets selected bits without clearing others?
   **Answer:** OR with a mask containing 1 at each bit to set.
2. Calculate 00110110 LSL 1 in eight bits.
   **Answer:** 01101100.
3. Calculate 00110111 LSR 1.
   **Answer:** 00011011; the discarded 1 gives integer truncation.

### Exam-style question and MS

**Question (4 marks):** The byte 10100100 is ANDed with mask 00000100. State the result and explain what the operation tests.

- **M1** performs bitwise AND
- **A1** result 00000100
- **B1** mask isolates the selected bit / clears all other positions
- **B1** non-zero result shows the selected bit was set

**Strict note:** Do not accept a Boolean whole-value AND; the operation is applied independently to corresponding bits.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Without and with pipelining

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-compare.jpg`

1. Without pipelining
2. Instruction 1 completes fetch, decode and execute before instruction 2 begins.
3. I1: F D E
4. I2: F D E
5. I3: F D E
6. Three instructions with three stages each may take nine stage slots.
7. With pipelining
8. Instruction 2 can be fetched while instruction 1 is decoded; instruction 3 can be fetched while instruction 1 executes.
9. C2: F2 D1
10. C3: F3 D2 E1
11. C4: D3 E2
12. After the pipeline fills, one instruction can complete per cycle in the ideal case.

### Pipelining overlaps instruction-cycle stages

- **Explains:** `concept`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-concept.jpg`

1. Pipeline
2. A processor technique where multiple instructions are at different stages of execution at the same time.
3. The next instruction is fetched from memory using the program counter and memory registers.
4. The control unit interprets the instruction and prepares required operands/control signals.
5. The instruction is carried out, such as arithmetic, memory access or a branch.

### Pipeline hazards: why faster is not always simpler

- **Explains:** `hazards`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-hazards.jpg`

1. Consequence
2. Data hazard
3. An instruction needs a result that a previous instruction has not produced yet.
4. The pipeline may stall until the needed value is available.
5. Control hazard
6. A branch or jump changes which instruction should be fetched next.
7. Incorrectly fetched instructions may need to be discarded or the pipeline may wait.
8. Resource hazard
9. Two stages need the same hardware resource in the same cycle.
10. One stage may wait, reducing the ideal performance gain.

### Stalls and flushes reduce the ideal gain

- **Explains:** `stalls`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-stalls.jpg`

1. The pipeline pauses one or more stages because an instruction cannot safely continue yet.
2. Incorrect or unwanted instructions are removed from the pipeline, often after a branch decision.
3. Dependency
4. One instruction depends on the result or effect of an earlier instruction.
5. Ideal case
6. Pipeline is full, stages are balanced, no hazards occur and instructions complete regularly.

### Throughput improves, but latency still exists

- **Explains:** `timing`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-timing.jpg`

1. Latency The time for one instruction to pass from fetch through decode to execute.
2. Throughput The number of instructions completed per unit time once the pipeline is full.
3. Fill The early cycles before every pipeline stage is occupied.
4. Drain The final cycles when no new instructions enter but existing ones finish.
5. Why this matters
6. Exam wording may ask "why performance can improve" rather than "why every instruction is faster". Answer with throughput.
<!-- stage10-explanations:end -->
