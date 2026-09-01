# Lesson 083: State-transition diagrams

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 12: Software development<br>
**Syllabus requirements:** S12.03<br>
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

### 1. The purpose of state-transition diagrams to document an algorithm (S12.03)

**Atomic learning targets**

- **S12.03.A01:** state-transition
- **S12.03.A02:** diagrams

**Core explanation**

- A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them. Its syllabus requirement is to understand that purpose; constructing a state-transition diagram is retained only as Optional enrichment.
- The purpose of state-transition diagrams to document an algorithm.
- A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them.

**Mechanism or method**

1. **Establish the exact components or states** — A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them.
2. **Trace the relationship or change** — Its syllabus requirement is to understand that purpose;
3. **Use the explanation in a concrete case** — constructing a state-transition diagram is retained only as Optional enrichment.

#### Worked example: The purpose of state-transition diagrams to document an algorithm: complete worked route

1. **Establish the exact components or states**

A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them.

2. **Trace the relationship or change**

Its syllabus requirement is to understand that purpose;

3. **Use the explanation in a concrete case**

constructing a state-transition diagram is retained only as Optional enrichment.

4. **Complete example**

A provided state-transition diagram with Locked and Unlocked states serves a different purpose: it documents event-driven changes rather than module hierarchy or processing sequence.

**Misconceptions to correct**

- Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

#### Mastery check (MC-L083-S12.03)

Show the following targets in one connected answer, using a concrete example for each: state-transition; diagrams.

<details><summary>Answer criteria</summary>

- A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them. Its syllabus requirement is to understand that purpose; constructing a state-transition diagram is retained only as Optional enrichment.
- The purpose of state-transition diagrams to document an algorithm.
- A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them.

</details>

**Supplementary concept map**

- **State:** Persistent condition of the system
- **Transition:** Change from one state
- **Event:** Label that triggers change
- **Purpose:** Document state-based behaviour
- **state-transition:** The purpose of state-transition diagrams to document an…
- **diagrams:** A state-transition diagram documents an algorithm by showing…

**Supplementary three-step recap**

1. **Translate the stated design** — The purpose of state-transition diagrams to document an algorithm.
2. **Apply one complete operation** — A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them.
3. **Trace state and boundaries** — No need to construct a state-transition diagram.

**Concrete case: State:** The purpose of state-transition diagrams to document an algorithm.



<details><summary>Precise syllabus wording</summary>

Show understanding of the purpose of state-transition diagrams to document an algorithm.

The syllabus requires understanding the purpose; it does not require candidates to construct a state-transition diagram.

</details>

### Lesson technical reference

- The syllabus requires understanding the purpose; it does not require candidates to construct a state-transition diagram.
- A structure chart documents decomposition into modules, procedures and functions. Boxes name modules; hierarchy lines show which module calls another; labelled arrows show data or control parameters passed between them. Its purpose is to communicate modular structure and interfaces before coding.
- To construct a structure chart, place the controlling module at the top, split the problem into one-responsibility subtasks, connect each caller to its called modules, and label every value passed. To derive equivalent pseudocode, turn each box into a complete PROCEDURE or FUNCTION header with corresponding parameters, add calls in the parent body with matching arguments, and preserve the shown hierarchy.
- A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them. Its syllabus requirement is to understand that purpose; constructing a state-transition diagram is retained only as Optional enrichment.

Beyond syllabus / 延伸知识（不要求背诵）: modern teams often use continuous integration to repeat building and testing whenever a program changes.
## 3. Practice by question type

### Question 1 - foundation - state - 2 marks

What does a state-transition diagram document?

**Answer:** The persistent states of an algorithm/system and the event-driven changes between them.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word state, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

How does a walkthrough differ from a dry run?

**Answer:** A walkthrough is a structured peer review of the algorithm or code; a dry run manually traces values and control flow for selected data.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State two precise facts about state-transition diagrams.

**Answer:** The syllabus requires understanding the purpose; it does not require candidates to construct a state-transition diagram. A structure chart documents decomposition into modules, procedures and functions. Boxes name modules; hierarchy lines show which module calls another; labelled arrows show data or control parameters passed between them. Its purpose is to communicate modular structure and interfaces before coding.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/W/25 Q7(a) | 5 | complete | recall |
| 9618/23/W/25 Q7(a) | 5 | complete | recall |
| 9618/22/S/25 Q5(a) | 4 | complete | recall |
| 9618/21/W/23 Q7 | 5 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S12.03: explain state-transition, diagrams.
- S12.03 method: Establish the exact components or states → Trace the relationship or change → Use the explanation in a concrete case.
- Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Common error to correct

Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For state-transition diagrams, use the exact technical term before applying it to the scenario.
