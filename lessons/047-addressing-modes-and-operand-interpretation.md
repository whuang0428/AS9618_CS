# Lesson 047: Addressing modes and address-sensitive instructions

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Addressing modes and address-sensitive instructions

### Direct explanation

- Immediate addressing uses the operand as the value itself. Direct addressing uses the operand as the address of the value. Indirect addressing treats the operand as the address of a location that holds the effective address. Indexed addressing forms an effective address by adding IX to the address operand. Relative addressing forms a target/effective address by adding an offset to the current or next instruction address held in PC.
- LDI follows the address stored at the operand location; LDX adds IX to the address operand; LDR #n loads the immediate value n into IX. CMI <address> uses indirect addressing: the contents of <address> give the address of the value compared with ACC.
- After CMP or CMI, JPE <address> jumps when the comparison result is True and JPN <address> jumps when it is False. Relative addressing is a required addressing-mode concept, but LDR is not a relative-load instruction in the Version 2 instruction set.

### Worked example

**Compare five operand interpretations:** With operand 20, immediate uses value 20; direct uses Memory[20]; indirect follows Memory[20] as another address; indexed uses address 20 + IX; relative uses PC plus a signed or stated offset. Separately, if CMI POINTER produces True, JPE MATCH branches to MATCH; a False comparison allows JPN DIFFERENT to branch.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which load follows a pointer in memory?
   **Answer:** LDI.
2. Which load combines its operand with IX?
   **Answer:** LDX.
3. What does LDR #4 do?
   **Answer:** It loads 4 into IX; it does not use relative addressing.
4. When does JPE branch?
   **Answer:** When the preceding comparison result is True.
5. How is a relative address formed?
   **Answer:** By adding an offset to the current or next instruction address represented by PC, according to the stated model.

### Exam-style question and MS

**Question (6 marks):** Compare immediate, direct, indirect, indexed and relative addressing, then state the effects of LDR #n, CMI <address>, JPE <address> and JPN <address>.

| Answer | Guidance | Marks |
|---|---|---:|
| immediate uses operand as value; direct uses operand as address | Do not award relative LDR, immediate CMI, equal/zero JPE or negative-status JPN. | 1 |
| indirect follows an address stored at the operand address |  | 1 |
| indexed adds IX to the address operand |  | 1 |
| relative adds an offset to the PC/current or next instruction address |  | 1 |
| LDR loads immediate n to IX and CMI compares through indirect addressing |  | 1 |
| JPE follows True and JPN follows False |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 4
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the processor components or operations involved in **Addressing modes and operand interpretation**.
2. Describe the sequence of data, address and control transfers.
3. Explain the effect of the relevant architecture or performance factor.

## Key Vocabulary
English first, Chinese support:

- register 寄存器, bus 总线, fetch-decode-execute 取指-译码-执行, interrupt 中断

## Warm-Up Hook
Give students the roles of named registers and ask them to pass an instruction through the fetch stage in the correct order. Use any incorrect transfer to clarify each register's function.

Focus question: Which feature distinguishes **Addressing modes and operand interpretation** from the most closely related syllabus concept?

## Guided Explanation
Follow one instruction through the processor. Identify each register or bus only when it does work in the story. Then connect the mechanism to Addressing modes and operand interpretation: what changes, what improves, and what limitation remains?

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
- Answer one 4-mark question about **Addressing modes and operand interpretation**. Follow its command word and apply each point to the stated context.

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

### Indexed addressing and arrays

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-arrays.jpg`

1. Base address
2. The start address of a block of related values, such as an array.
3. Index register
4. A register holding an offset from the base address.
5. Effective address
6. Calculated as base address + index/offset.
7. Why useful
8. Changing the index can access different array elements without changing the instruction's base address.
9. Common error
10. Indexed addressing does not mean "convert the operand into an index number". It calculates an effective address using a base and an offset.

### Addressing mode means operand interpretation

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-concept.jpg`

1. The part of an instruction that supplies data, an address, a register or another reference.
2. Addressing mode
3. The rule used to interpret the operand and locate the data needed by the instruction.
4. Effective address
5. The actual memory address used after applying the addressing mode.
6. Fetched value
7. The final data value obtained or used by the instruction after interpretation.

### Official LDR, CMI, JPE and JPN semantics

- **Explains:** `effective`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-effective.jpg`

1. LDR #n loads the immediate value n into the index register IX.
2. CMI <address> compares ACC with a value reached using indirect addressing.
3. JPE <address> jumps when the preceding comparison result is True.
4. JPN <address> jumps when the preceding comparison result is False.
5. Do not reinterpret these instructions as relative load, immediate compare, equal/zero branch or negative-status branch.

### Five addressing modes

- **Explains:** `modes`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-modes.jpg`

1. Immediate addressing uses the operand field as the value itself.
2. Direct addressing uses the operand field as the address of the value.
3. Indirect addressing follows an address stored at the operand address to reach the value.
4. Indexed addressing adds an index value to a base address to form the effective address.
5. Relative addressing adds an offset to a PC-based instruction address to form the target or effective address.
6. LDR #n loads the immediate value n into IX; it is not relative addressing.
<!-- stage10-explanations:end -->
