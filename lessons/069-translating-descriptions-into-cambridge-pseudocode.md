# Lesson 069: Translating descriptions into Cambridge pseudocode

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.01<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S9.07 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Document an algorithm using structured English, a flowchart or pseudocode; write pseudocode from structured English or a flowchart, and draw a flowchart from structured English or pseudocode while preserving the same algorithm.
- Use structured English, flowcharts and pseudocode; convert between representations.


## 2. Knowledge explanation

### 1. Pseudocode from a flowchart or structured-English description: Translating descriptions into Cambridge pseudocode (S11.01)

**Atomic learning targets**

- **S11.01.A01:** pseudocode
- **S11.01.A02:** flowchart
- **S11.01.A03:** structured-English / structured English
- **S11.01.A04:** description / descriptions / design

**Core explanation**

- Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path. From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.
- To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection. To translate structured English, identify its controlled verbs and indentation before selecting Cambridge constructs.
- For translating descriptions into cambridge pseudocode, identify the required concept before describing its mechanism or consequence.
- From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.

**Mechanism or method**

1. **Set up the required data and conditions** — Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path.
2. **Carry out the complete method** — From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.
3. **Trace or test the result** — To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection.

#### Worked example: Pseudocode from a flowchart or structured-English description: Translating descriptions into Cambridge pseudocode: complete worked route

1. **Set up the required data and conditions**

Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path.

2. **Carry out the complete method**

From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.

3. **Trace or test the result**

To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection.

4. **Complete example**

Flowchart sum loop: A flowchart sets Total to 0 and repeats input/add until Value = -1.

**Misconceptions to correct**

- Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

#### Mastery check (MC-L069-S11.01)

Complete a fresh example that demonstrates every target: pseudocode; flowchart; structured-English / structured English; description / descriptions / design. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path. From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.
- To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection. To translate structured English, identify its controlled verbs and indentation before selecting Cambridge constructs.
- For translating descriptions into cambridge pseudocode, identify the required concept before describing its mechanism or consequence.
- From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.

</details>

**Supplementary concept map**

- **structured English:** Pseudocode from a flowchart or structured-English description.
- **flowchart:** Implement and write pseudocode from a given design…
- **pseudocode:** From structured English, preserve the controlled verbs, conditions…
- **design:** For translating descriptions into cambridge pseudocode, identify the…
- **preserve logic:** To translate structured English, identify its controlled verbs…

**Supplementary three-step recap**

1. **Translate the stated design** — Pseudocode from a flowchart or structured-English description.
2. **Apply one complete operation** — Implement and write pseudocode from a given design presented as either a flowchart or structured English.
3. **Trace state and boundaries** — From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.

**Translate a flowchart or structured English into pseudocode:** Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path. From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.

#### Translate a flowchart or structured English into pseudocode

![Translate a flowchart or structured English into pseudocode](../web/assets/diagrams/stage10-infographics/stage10-lesson-141-standard.jpg)

<details><summary>Text transcript</summary>

- Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path.
- From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.
- Dry-run the source description and pseudocode with the same data; matching paths and outputs confirm equivalence.

</details>

<details><summary>Precise syllabus wording</summary>

Write pseudocode from a flowchart or structured-English description.

Implement and write pseudocode from a given design presented as either a flowchart or structured English.

</details>

### Lesson technical reference

- Implement and write pseudocode from a given design presented as either a flowchart or structured English.
- To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection. To translate structured English, identify its controlled verbs and indentation before selecting Cambridge constructs.
- The answer must be Cambridge pseudocode, not Java: use assignment arrow, THEN/ENDIF, FOR...NEXT, WHILE...ENDWHILE or REPEAT...UNTIL as appropriate. Trace both versions with the same data to confirm equivalence.
- For translating descriptions into cambridge pseudocode, identify the required concept before describing its mechanism or consequence.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - design - 4 marks

Translate this structured-English design into Cambridge pseudocode: input five temperatures; count those below zero; output the count.

**Answer:** initialises count to 0; uses a five-iteration count-controlled loop with INPUT; tests Temperature < 0 and increments count; outputs count after the loop with coherent Cambridge syntax

**Marking guidance:** Do not accept Java syntax such as int, braces or System.out as Cambridge pseudocode.

**Common error:** For the command word design, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

How is a flowchart decision normally translated?

**Answer:** As a selection or loop condition, depending on where arrows reconnect.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State two precise facts about translating descriptions into cambridge pseudocode.

**Answer:** Implement and write pseudocode from a given design presented as either a flowchart or structured English. To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection. To translate structured English, identify its controlled verbs and indentation before selecting Cambridge constructs.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q10(a) | 8 | complete | trace |
| 9618/21/S/25 Q7(a) | 6 | write | write |
| 9618/23/S/25 Q7(a)(i) | 5 | write | write |
| 9618/21/S/25 Q1(c) | 3 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S11.01: explain pseudocode, flowchart, structured-English / structured English, description / descriptions / design.
- S11.01 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For translating descriptions into cambridge pseudocode, use the exact technical term before applying it to the scenario.
