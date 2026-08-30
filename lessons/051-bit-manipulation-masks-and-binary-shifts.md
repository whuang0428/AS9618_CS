# Lesson 051: Bit manipulation: masks and binary shifts

<!-- remediation-v2-stage3-l050-core:start -->
> **Lesson sequence scope:** The CORE block below is assessed S4.15 teaching. The historical pipelining and processor-tracing lesson body that follows is Optional enrichment and does not establish syllabus first use.

## Core syllabus content

### Direct explanation

- An AND mask can test or clear selected bits, an OR mask can set selected bits, and an XOR mask can toggle selected bits. These operations support monitoring and control without changing unrelated flags.
- `LSL #n` is a logical left shift and `LSR #n` is a logical right shift; both insert zero bits. An arithmetic right shift preserves the sign bit, while a cyclic shift wraps the departing bit to the other end.

### Worked example

For `Status = 10110100`, use an AND mask to test a named status flag, an OR mask to set a control flag and an XOR mask to toggle one selected flag. Apply `LSL #n` or `LSR #n` to ACC and discard bits that move beyond the fixed width.

### Core syllabus practice

1. State how an AND mask is used for monitoring.
   **Answer:** AND the status value with a one-bit mask; a non-zero result shows that the selected flag is set.
2. State how to set and toggle one control bit.
   **Answer:** Use an OR mask to set it and an XOR mask to toggle it.
3. Distinguish logical, arithmetic and cyclic right shifts.
   **Answer:** Logical inserts zero, arithmetic preserves the sign bit, and cyclic wraps the departing bit.

### Exam-style question and mark scheme

**Question (6 marks):** Explain how AND, OR and XOR masks test, clear, set and toggle control flags, then apply one `LSL #n` and one `LSR #n` operation.

| Answer | Guidance | Marks |
|---|---|---:|
| AND mask tests or clears a selected bit | Apply the point to a named status or control flag. | 1 |
| OR mask sets a selected bit |  | 1 |
| XOR mask toggles a selected bit |  | 1 |
| correct logical left shift with zero fill |  | 1 |
| correct logical right shift with zero fill |  | 1 |
| distinguishes logical from arithmetic or cyclic shifting |  | 1 |
<!-- remediation-v2-stage3-l050-core:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Section 4.15 Bit manipulation
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz

## Teaching sequence

1. Model one AND mask against a named status bit.
2. Compare OR and XOR masks before students trace each result.
3. Demonstrate `LSL #n` and `LSR #n`, then contrast them with arithmetic and cyclic shifts.
4. Use the CORE practice and exam-style question before any extension.

## Visual explanations and extension boundary

Use panels labelled `CORE / TEACH` as assessed support. Panels labelled `OPTIONAL / EXTEND`, including pipelining, hazards, stalls and throughput, are enrichment and do not contribute to syllabus coverage or first-use statistics.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Without and with pipelining

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-compare.jpg`

1. Without pipelining, each instruction completes fetch, decode and execute before the next starts.
2. In an ideal three-stage pipeline, instruction 1 completes in cycle 3, instruction 2 in cycle 4 and instruction 3 in cycle 5.
3. Instruction 3 must execute in cycle 5; it is not complete after decode in cycle 4.

### Pipelining overlaps instruction-cycle stages

- **Explains:** `concept`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-concept.jpg`

1. Pipeline
2. A processor technique where multiple instructions are at different stages of execution at the same time.
3. The next instruction is fetched from memory using the program counter and memory registers.
4. The control unit interprets the instruction and prepares required operands/control signals.
5. The instruction is carried out, such as arithmetic, memory access or a branch.

### Monitor and control a device register

- **Explains:** `device-bits`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-device-bits.jpg`

1. AND a status byte with a one-bit mask to test a named device flag.
2. OR a control byte with a one-bit mask to set the selected output flag.
3. AND with an inverted mask clears a flag; XOR with a one-bit mask toggles it.
- **Analogy:** A control panel changes one labelled switch without disturbing the others.
- **Boundary:** The processor applies the rule; a sensor supplies input and an actuator performs output.

### Pipeline hazards: why faster is not always simpler

- **Explains:** `hazards`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-hazards.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-masks.jpg`

1. AND with a 1 preserves or tests a bit, while AND with a 0 clears it.
2. OR with a 1 sets a bit without clearing unrelated positions.
3. XOR with a 1 toggles a bit while XOR with a 0 preserves it.
- **Analogy:** A stencil exposes only the positions that one operation may affect.
- **Boundary:** Apply the operation independently to corresponding bit positions.

### Stalls and flushes reduce the ideal gain

- **Explains:** `stalls`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-stalls.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-051-timing.jpg`

1. A three-stage pipeline processes each instruction through fetch, decode and execute exactly once.
2. For four instructions, cycles 1 and 2 fill the pipeline.
3. In cycles 3 and 4, different instructions occupy fetch, decode and execute concurrently.
4. Cycle 5 completes instruction 3 and decodes instruction 4; cycle 6 executes instruction 4.
5. Pipelining improves throughput after fill but does not remove the latency of one instruction.
<!-- stage10-explanations:end -->
