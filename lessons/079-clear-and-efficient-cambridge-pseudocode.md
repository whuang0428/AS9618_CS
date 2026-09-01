# Lesson 079: Clear and efficient Cambridge pseudocode

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.09<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 078: Functions, interfaces and return values.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Clear and efficient Cambridge pseudocode (S11.09)

**Atomic learning targets**

- **S11.09.A01:** clear
- **S11.09.A02:** efficient
- **S11.09.A03:** Cambridge
- **S11.09.A04:** pseudocode

**Core explanation**

- Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced. A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.
- Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule. For example, total and count can be updated during one traversal instead of scanning the same array twice when both results are needed.
- Clear Cambridge pseudocode uses meaningful identifiers, consistent indentation, complete Cambridge constructs and a traceable control path. Efficient pseudocode avoids unnecessary repeated work while preserving correctness.
- At AS Level, justify an improvement from the actual algorithm, such as fewer repeated passes or stopping a search once the target is found. Do not claim that shorter text alone proves a more efficient algorithm.

**Mechanism or method**

1. **Set up the required data and conditions** — Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced.
2. **Carry out the complete method** — A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.
3. **Trace or test the result** — Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule.

#### Worked example: Clear and efficient Cambridge pseudocode: complete worked route

1. **Set up the required data and conditions**

Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced.

2. **Carry out the complete method**

A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.

3. **Trace or test the result**

Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule.

4. **Complete example**

This preserves clear control flow while avoiding a second full traversal. The Cambridge pseudocode remains clear because initialisation, loop bounds, selection and outputs are explicit.

**Misconceptions to correct**

- Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

#### Mastery check (MC-L079-S11.09)

Complete a fresh example that demonstrates every target: clear; efficient; Cambridge; pseudocode. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced. A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.
- Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule. For example, total and count can be updated during one traversal instead of scanning the same array twice when both results are needed.
- Clear Cambridge pseudocode uses meaningful identifiers, consistent indentation, complete Cambridge constructs and a traceable control path. Efficient pseudocode avoids unnecessary repeated work while preserving correctness.
- At AS Level, justify an improvement from the actual algorithm, such as fewer repeated passes or stopping a search once the target is found. Do not claim that shorter text alone proves a more efficient algorithm.

</details>

**Supplementary concept map**

- **Identifiers:** Names reveal purpose
- **Indentation:** Shows nested control structure
- **Efficiency:** Avoids unnecessary repeated work
- **Clarity:** Steps are easy to trace
- **Correctness:** Optimisation must preserve results
- **clear:** Clear and efficient Cambridge pseudocode.

**Supplementary three-step recap**

1. **Translate the stated design** — Clear and efficient Cambridge pseudocode.
2. **Apply one complete operation** — Clear Cambridge pseudocode uses meaningful identifiers, consistent indentation, complete Cambridge constructs and a traceable control path.
3. **Trace state and boundaries** — Efficient pseudocode.

**Java methods can model modularity, but Cambridge pseudocode…:** Java support only Cambridge-style pseudocode

#### Java methods can model modularity, but Cambridge pseudocode remains the exam format

![Java methods can model modularity, but Cambridge pseudocode remains the exam format](../web/assets/diagrams/stage10-infographics/stage10-lesson-140-java.jpg)

<details><summary>Text transcript</summary>

- Java support only
- Cambridge-style pseudocode
- FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
- RETURN Mark = 0 AND Mark <= 100
- ENDFUNCTION
- Java support example only
- static boolean isValidMark(int mark) {
- return mark = 0 && mark <= 100;
- Use Java to practise running code, but use Cambridge-style pseudocode when the exam asks for algorithm design.

</details>

<details><summary>Precise syllabus wording</summary>

Write clear and efficient Cambridge pseudocode.

Write efficient pseudocode.

</details>

### Lesson technical reference

- Write efficient pseudocode.
- Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule. For example, total and count can be updated during one traversal instead of scanning the same array twice when both results are needed.
- Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced. A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.
- At AS Level, justify an improvement from the actual algorithm, such as fewer repeated passes or stopping a search once the target is found. Do not claim that shorter text alone proves a more efficient algorithm.
- Clear Cambridge pseudocode uses meaningful identifiers, consistent indentation, complete Cambridge constructs and a traceable control path. Efficient pseudocode avoids unnecessary repeated work while preserving correctness.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - write - 8 marks

Write an algorithm that first totals Marks[1:30] and then makes a second pass to count passes, using one clear traversal. Explain the efficiency improvement. Write two full traversals as one clear and efficient Cambridge pseudocode traversal and justify the change.

**Answer:** initialises Total and PassCount once before the loop; uses one loop over valid indexes 1 to 30; updates Total and conditionally updates PassCount inside that loop; outputs both results after the loop; explains that the rewrite removes a redundant second traversal without changing the result; clear Cambridge pseudocode; one correct traversal; avoids repeated work; valid efficiency justification

**Marking guidance:** Do not award an efficiency claim based only on fewer written lines; the revised pseudocode must perform less repeated work and remain correct. Do not credit an efficiency claim based only on line count.

**Common error:** For the command word write, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why is one combined traversal more efficient than two separate full traversals here?

**Answer:** The same 30 elements are read once while both required results are updated, avoiding a redundant second pass.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

Does shorter code always mean more efficient code?

**Answer:** No; the amount of work and correctness matter.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

## 4. Summary and exam reminders

### Summary

- S11.09: explain clear, efficient, Cambridge, pseudocode.
- S11.09 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For clear and efficient cambridge pseudocode, use the exact technical term before applying it to the scenario.
