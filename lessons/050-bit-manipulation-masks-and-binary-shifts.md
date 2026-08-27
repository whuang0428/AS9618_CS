# Lesson 050: Bit manipulation: masks and binary shifts

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply AND, OR and XOR masks to test, clear, set and toggle selected bits.
2. Perform logical, arithmetic and cyclic left and right shifts.
3. Use bit fields in a device register for monitoring and control.

## Key Vocabulary
English first, Chinese support:

- bit mask 位掩码, logical shift 逻辑移位, arithmetic shift 算术移位, cyclic shift 循环移位

## Warm-Up Hook
Show the byte 10100000 and ask how to set bit 2 without changing any other bit. Compare AND, OR, XOR and shifting before revealing the mask 00000100.

Focus question: Which operation changes only the required bit positions?

## Guided Explanation
Model AND, OR and XOR column by column. Then compare the fill rule for logical, arithmetic and cyclic shifts in both directions. Finish with a device status/control byte so every operation has a practical purpose.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: value and mask. Middle: bitwise result or shifted pattern. Right: device effect and discarded-bit/sign-bit note.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A status byte is 10100000. Test bit 7 and set motor-enable bit 2 without changing any other bits.

**Worked answer / marking focus:** AND with 10000000 gives 10000000, so bit 7 is set. OR with 00000100 gives 10100100, setting bit 2 while preserving all other positions.



## Student Task
Students calculate one left and one right example for logical, arithmetic and cyclic shifting, then design masks to test, set, clear and toggle one named device bit.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **bit manipulation and binary shifts**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 4.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often call every right shift logical. Correction: logical, arithmetic and cyclic shifts use different fill or rotation rules.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

## Core explanation

### Bit masks

- An AND mask with a 1 preserves/tests the corresponding bit; AND with a 0 clears it.
- An OR mask with a 1 sets the corresponding bit; OR with a 0 preserves it.
- An XOR mask with a 1 toggles the corresponding bit; XOR with a 0 preserves it.

### Binary shifts

- `LSL #n` shifts all bits in ACC logically left by `n` places, inserts zeros from the right and discards bits beyond the fixed width.
- `LSR #n` shifts all bits in ACC logically right by `n` places, inserts zeros from the left and discards bits beyond the fixed width.
- A logical shift moves every bit, inserts 0 into each empty position and discards the bit shifted out.
- An arithmetic shift treats the pattern as signed. An arithmetic right shift repeats the sign bit; an arithmetic left shift can overflow the fixed signed range.
- A cyclic shift rotates the discarded bit into the empty position at the opposite end.
- Logical, arithmetic and cyclic shifts can be performed to the left or right. Always state the fixed width and operation.

### Monitoring and control

If bit 3 of a status register means door-open, `Status AND 00001000` tests it. For a control register, OR sets a selected output bit, AND with an inverted mask clears it, and XOR toggles it without changing unrelated bits.

## Core practice and answers

1. `00110110` logical shift left by one place.
   **Answer:** `01101100`.
2. `10110110` arithmetic shift right by one place.
   **Answer:** `11011011`; the sign bit remains 1.
3. `00110111` cyclic shift right by one place.
   **Answer:** `10011011`; the discarded 1 rotates to the left.
4. Set bit 2 of `10100000`.
   **Answer:** `10100000 OR 00000100 = 10100100`.

## Extension: not an explicit AS 2027-2029 requirement

Pipelining overlaps fetch, decode and execute stages from different instructions. It can improve throughput, but fill/drain time, hazards, stalls and flushes reduce the ideal gain. Treat the Stage 10 pipelining material below as optional enrichment after the required Section 4.3 content.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Without and with pipelining

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-compare.jpg`

1. Without pipelining, each instruction completes fetch, decode and execute before the next starts.
2. In an ideal three-stage pipeline, instruction 1 completes in cycle 3, instruction 2 in cycle 4 and instruction 3 in cycle 5.
3. Instruction 3 must execute in cycle 5; it is not complete after decode in cycle 4.

### Pipelining overlaps instruction-cycle stages

- **Explains:** `concept`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-concept.jpg`

1. Pipeline
2. A processor technique where multiple instructions are at different stages of execution at the same time.
3. The next instruction is fetched from memory using the program counter and memory registers.
4. The control unit interprets the instruction and prepares required operands/control signals.
5. The instruction is carried out, such as arithmetic, memory access or a branch.

### Monitor and control a device register

- **Explains:** `device-bits`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-device-bits.jpg`

1. AND a status byte with a one-bit mask to test a named device flag.
2. OR a control byte with a one-bit mask to set the selected output flag.
3. AND with an inverted mask clears a flag; XOR with a one-bit mask toggles it.
- **Analogy:** A control panel changes one labelled switch without disturbing the others.
- **Boundary:** The processor applies the rule; a sensor supplies input and an actuator performs output.

### Pipeline hazards: why faster is not always simpler

- **Explains:** `hazards`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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

### Bit masks target selected positions

- **Explains:** `masks`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-masks.jpg`

1. AND with a 1 preserves or tests a bit, while AND with a 0 clears it.
2. OR with a 1 sets a bit without clearing unrelated positions.
3. XOR with a 1 toggles a bit while XOR with a 0 preserves it.
- **Analogy:** A stencil exposes only the positions that one operation may affect.
- **Boundary:** Apply the operation independently to corresponding bit positions.

### Binary shifts: logical, arithmetic, cyclic

- **Explains:** `shifts`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-shifts.jpg`

1. Every shown input and stored result contains exactly eight bits.
2. Logical shifts insert zero; logical left 10110011 becomes 01100110 and logical right becomes 01011001.
3. Arithmetic left 10110011 becomes 01100110; arithmetic right copies sign bit 1 and becomes 11011001.
4. Cyclic left rotates the outgoing bit to give 01100111; cyclic right gives 11011001.
5. Unsigned logical-left overflow and signed arithmetic-left overflow both occur here; rotations do not use an overflow label.
- **Analogy:** Three conveyor rules move the same row but handle the end position differently.
- **Boundary:** State the fixed width, direction and shift type before calculating.

### Stalls and flushes reduce the ideal gain

- **Explains:** `stalls`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-050-timing.jpg`

1. A three-stage pipeline processes each instruction through fetch, decode and execute exactly once.
2. For four instructions, cycles 1 and 2 fill the pipeline.
3. In cycles 3 and 4, different instructions occupy fetch, decode and execute concurrently.
4. Cycle 5 completes instruction 3 and decodes instruction 4; cycle 6 executes instruction 4.
5. Pipelining improves throughput after fill but does not remove the latency of one instruction.
<!-- stage10-explanations:end -->
