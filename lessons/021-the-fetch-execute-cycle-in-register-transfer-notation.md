# Lesson 021: The fetch-execute cycle in register-transfer notation

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 4: Processor fundamentals<br>
**Syllabus requirements:** S4.07<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S4.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Show understanding of the basic Von Neumann model and the stored-program concept: instructions are stored in binary in the same directly accessible memory as data and are fetched for execution.
- Understand Von Neumann architecture and the stored-program concept.


## 2. Knowledge explanation

### 1. The fetch-execute cycle using register transfer notation (S4.07)

**Concept relationships**

- **PC:** Address of next instruction
- **MAR:** Address currently accessed
- **MDR:** Word transferred to or from memory
- **CIR:** Current instruction being decoded
- **fetch-execute cycle:** The fetch-execute cycle using register transfer notation.
- **register transfer notation:** The stages of the Fetch-Execute cycle and use…

**Mechanism**

1. **Identify incoming data or signal** — The fetch-execute cycle using register transfer notation.
2. **Follow the physical or logical path** — The stages of the Fetch-Execute cycle and use register-transfer notation, including MAR <- PC, MDR <- Memory[MAR], CIR…
3. **Connect output to its use** — Register-transfer notation describes movement and updates

**Registers and buses: the FDE cycle vocabulary:** Processor review PC Stores the address of the next instruction to be fetched.

#### Registers and buses: the FDE cycle vocabulary

![Registers and buses: the FDE cycle vocabulary](../web/assets/diagrams/stage10-infographics/stage10-lesson-092-processor.jpg)

<details><summary>Text transcript</summary>

- Processor review
- PC Stores the address of the next instruction to be fetched.
- MAR / MDR MAR stores an address; MDR stores data/instruction being transferred.
- CIR / ACC CIR stores current instruction; ACC stores intermediate arithmetic/logic results.

</details>

<details><summary>Precise syllabus wording</summary>

Describe the fetch-execute cycle using register transfer notation.

Describe the stages of the Fetch-Execute cycle and use register-transfer notation, including MAR <- PC, MDR <- Memory[MAR], CIR <- MDR and a coherent PC update.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Describe the stages of the Fetch-Execute cycle and use register-transfer notation, including MAR <- PC, MDR <- Memory[MAR], CIR <- MDR and a coherent PC update.
- Register-transfer notation describes a data transfer or register update. The arrow <- means 'is loaded with' or 'receives'; it is not an equality sign. Memory[MAR] means the contents of the memory location whose address is currently held in MAR.
- A coherent fetch sequence is MAR <- PC; MDR <- Memory[MAR]; CIR <- MDR; and PC <- PC + 1 at an appropriate point before the next fetch. The control unit then decodes the opcode and operand in CIR and sends control signals for execution.
- During execution, notation such as ACC <- ACC + MDR records an arithmetic result in ACC, while Memory[MAR] <- MDR records a memory write. Read every statement from right to left: obtain the source value, then replace the destination contents.
- The exact timing of PC increment may vary between coherent processor descriptions, but MAR must receive the current instruction address before that address is replaced. Register-transfer notation describes movement and updates; it does not imply that two registers permanently contain the same value.

</details>

### Worked method

1. Trace one instruction fetch
2. Start with PC = 120 and Memory[120] = LDD 500.
3. MAR <- PC puts 120 in MAR.
4. MDR <- Memory[MAR] puts LDD 500 in MDR.
5. CIR <- MDR copies the instruction into CIR.

Beyond syllabus / 延伸知识（不要求背诵）: modern processors add pipelining and several cache levels, but exam answers should begin with the syllabus processor model.
## 3. Practice by question type

### Question 1 - foundation - describe - 6 marks

Using register-transfer notation, describe the fetch of one instruction and explain the meaning of Memory[MAR].

**Answer:** MAR <- PC; MDR <- Memory[MAR]; CIR <- MDR; PC <- PC + 1 at a coherent point; Memory[MAR] means the contents at the memory address held in MAR; CIR is decoded and control signals initiate execution

**Marking guidance:** Do not accept PC <- MAR as the first transfer or treat Memory[MAR] as the address value itself.

**Common error:** For the command word describe, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - write - 2 marks

Write register-transfer notation for adding the value in MDR to ACC.

**Answer:** ACC <- ACC + MDR.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

What does MAR <- PC mean?

**Answer:** Copy the address currently in PC into MAR; PC is not changed by that transfer.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/13/S/25 Q2(ii) | 4 | explain | explain |
| 9618/13/S/25 Q2(b) | 2 | describe | explain |
| 9618/13/W/23 Q9(b) | 4 | complete | recall |
| 9618/13/S/23 Q7(c) | 2 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define the fetch-execute cycle in register-transfer notation with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often memorise register names without roles. Correction: a register earns its name by what it temporarily holds.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For the fetch-execute cycle in register-transfer notation, use the exact technical term before applying it to the scenario.
