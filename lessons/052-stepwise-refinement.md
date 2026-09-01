# Lesson 052: Stepwise refinement

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 9: Algorithm design and problem-solving<br>
**Syllabus requirements:** S9.08<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S9.02, S9.03 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility.
- Use decomposition and express a problem as modules.
- An algorithm is a solution to a problem expressed as a sequence of defined steps; the definition requires both the problem-solving purpose and the defined sequence.
- Understand what an algorithm is.


## 2. Knowledge explanation

### 1. Stepwise refinement to develop an algorithm: Stepwise refinement (S9.08)

**Atomic learning targets**

- **S9.08.A01:** stepwise
- **S9.08.A02:** refinement
- **S9.08.A03:** algorithm
- **S9.08.A04:** implement

**Core explanation**

- Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values. Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.
- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.

**Mechanism or method**

1. **Set up the required data and conditions** — Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values.
2. **Carry out the complete method** — Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.
3. **Trace or test the result** — Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;

#### Worked example: Stepwise refinement to develop an algorithm: Stepwise refinement: complete worked route

1. **Set up the required data and conditions**

Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values.

2. **Carry out the complete method**

Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.

3. **Trace or test the result**

Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;

4. **Complete example**

Refine an order-processing algorithm: Level 1: InputOrder;

**Misconceptions to correct**

- Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.

#### Mastery check (MC-L052-S9.08)

Complete a fresh example that demonstrates every target: stepwise; refinement; algorithm; implement. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values. Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.
- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.

</details>

**Supplementary concept map**

- **stepwise:** Stepwise refinement to develop an algorithm.
- **refinement:** Stepwise refinement to develop an algorithm from a…
- **algorithm:** Stepwise refinement starts with a high-level algorithm and…
- **implement:** Refinement stops when every step is precise enough…
- **develop:** Stepwise refinement until steps are programmable, and construct…

**Supplementary three-step recap**

1. **Translate the stated design** — Stepwise refinement to develop an algorithm.
2. **Apply one complete operation** — Stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a…
3. **Trace state and boundaries** — Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of…

**Concrete case: stepwise:** Stepwise refinement to develop an algorithm.



<details><summary>Precise syllabus wording</summary>

Use stepwise refinement to develop an algorithm.

Use stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a program can be written; each level must preserve the parent purpose.

</details>

### Lesson technical reference

- Use stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a program can be written; each level must preserve the parent purpose.
- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.
- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.
- Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values. Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.

Beyond syllabus / 延伸知识（不要求背诵）: the same algorithm can be expressed in many programming languages; its logic should remain independent of syntax.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What is the starting point of stepwise refinement?

**Answer:** A high-level algorithm or task.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - apply - 5 marks

Apply two levels of stepwise refinement to 'register a new library member', showing module inputs/outputs and identifying one procedure or function.

**Answer:** Level 1 separates capture, validation, storage and confirmation responsibilities; Level 2 replaces at least one complex step with smaller ordered substeps; module inputs and outputs are clear; procedure or function choice matches action versus returned value; refined steps collectively implement the original task

**Marking guidance:** Do not award unrelated features, repeated high-level labels or a level that does not reduce ambiguity.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how stepwise refinement would be applied in a suitable computing context.

**Answer:** Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear. At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values. Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/23/W/25 Q2(a) | 6 | describe | explain |
| 9618/22/S/25 Q2(a) | 2 | calculate | calculate |
| 9618/22/S/25 Q2(ii) | 2 | calculate | calculate |
| 9618/22/S/25 Q2(iii) | 2 | calculate | calculate |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S9.08: explain stepwise, refinement, algorithm, implement.
- S9.08 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.

### Common error to correct

Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For stepwise refinement, use the exact technical term before applying it to the scenario.
