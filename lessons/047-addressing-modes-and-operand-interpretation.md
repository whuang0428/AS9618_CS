# Lesson 047: Addressing modes and operand interpretation

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

## Stage 2 syllabus completion

**Official audit rows:** S4.13
**Focus:** Address-sensitive load, compare and branch instructions

### Direct explanation

- LDI follows the address stored at the operand location; LDX adds IX to the operand; LDR uses an address relative to the current instruction/PC. CMI compares with an immediate value, while CMP compares using the instruction-set operand definition.
- JPE branches when the equality result/zero condition is set. JPN branches when the result is negative. Correct traces update PC according to the condition and must distinguish an address from the value stored there.

### Worked example

**Trace a conditional:** After CMI #0, JPN NEG branches only if the accumulator compares as negative. Otherwise execution continues with the next sequential instruction.

### Targeted practice and answers

1. Which load follows a pointer in memory?
   **Answer:** LDI.
2. Which load combines its operand with IX?
   **Answer:** LDX.
3. When does JPE branch?
   **Answer:** When the comparison indicates equal / zero condition is set.

### Exam-style question and MS

**Question (4 marks):** Describe the difference between direct and indirect loading, and state how JPN affects execution.

- **B1** direct uses the operand as the address of the value
- **B1** indirect uses the contents of the operand address as another address
- **B1** JPN tests the negative condition/status
- **B1** PC changes to the branch target only when that condition is true

**Strict note:** Do not accept that indirect addressing simply loads the operand as a literal value.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Indexed addressing and arrays

- **Explains:** `arrays`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-concept.jpg`

1. The part of an instruction that supplies data, an address, a register or another reference.
2. Addressing mode
3. The rule used to interpret the operand and locate the data needed by the instruction.
4. Effective address
5. The actual memory address used after applying the addressing mode.
6. Fetched value
7. The final data value obtained or used by the instruction after interpretation.

### Effective address: where the CPU actually reads

- **Explains:** `effective`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-effective.jpg`

1. Stored value
2. Can be a data value or pointer, depending on mode.
3. Used by indirect example.
4. Start of an array-like block.
5. Used when base 100 and IX = 3.
6. LOAD #20 Use value 20 directly. No memory lookup for the operand value.
7. LOAD 20 Read memory[20], so the value loaded is 70.
8. LOAD (20) Read memory[20] to get address 70, then read memory[70] to get 999.
9. LOAD 100, IX=3 Effective address = 100 + 3 = 103, so value loaded is memory[103] = 44.

### Four common addressing modes

- **Explains:** `modes`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-047-modes.jpg`

1. Immediate addressing uses the operand field as the value itself.
2. Direct addressing uses the operand field as the address of the value.
3. Indirect addressing follows an address stored at the operand address to reach the value.
4. Indexed addressing adds an index value to a base address to form the effective address.
<!-- stage10-explanations:end -->
