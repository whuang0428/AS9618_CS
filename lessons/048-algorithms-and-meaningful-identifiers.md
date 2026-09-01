# Lesson 048: Algorithms and meaningful identifiers

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 9: Algorithm design and problem-solving<br>
**Syllabus requirements:** S9.03, S9.04<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 047: Decomposition and modular problem solving.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. What an algorithm is (S9.03)

**Atomic learning targets**

- **S9.03.A01:** algorithm
- **S9.03.A02:** solution
- **S9.03.A03:** sequence
- **S9.03.A04:** defined steps

**Core explanation**

- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.

**Mechanism or method**

1. **Identify the relevant condition or input** — Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;
2. **Trace how the process works** — use abstraction to retain essential details in an abstract model;
3. **Connect the mechanism to its result** — use decomposition to express the problem as connected modules;

#### Worked example: What an algorithm is: complete worked route

1. **Identify the relevant condition or input**

Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;

2. **Trace how the process works**

use abstraction to retain essential details in an abstract model;

3. **Connect the mechanism to its result**

use decomposition to express the problem as connected modules;

4. **Complete example**

Define and plan a ticket algorithm: Problem: input TicketCount and TicketPrice, then output TotalCost. The algorithm is the defined sequence INPUT TicketCount;

**Misconceptions to correct**

- Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

#### Mastery check (MC-L048-S9.03)

Explain the following targets in one connected answer, using a concrete example for each: algorithm; solution; sequence; defined steps.

<details><summary>Answer criteria</summary>

- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.

</details>

**Supplementary concept map**

- **defined steps:** Define an algorithm as a solution expressed as…
- **algorithm:** An algorithm is a solution to a problem…
- **solution:** Its entries must match the pseudocode solution.
- **sequence:** Design with input-process-output, use sequence, selection and iteration,…
- **what:** What an algorithm is.

**Supplementary three-step recap**

1. **Translate the stated design** — Define an algorithm as a solution expressed as a sequence of defined steps
2. **Apply one complete operation** — An algorithm is a solution to a problem expressed as a sequence of defined steps.
3. **Trace state and boundaries** — Design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or…

**An algorithm is a solution expressed as defined…:** An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out.

#### An algorithm is a solution expressed as defined steps

![An algorithm is a solution expressed as defined steps](../web/assets/diagrams/stage10-infographics/stage10-lesson-099-concept.jpg)

<details><summary>Text transcript</summary>

- An algorithm is a solution to a problem expressed as a sequence of defined steps.
- Each step must be unambiguous, ordered where order matters and capable of being carried out.
- Identify what data is supplied, state the required transformation and state the exact result.
- Record limits, quantity requirements and supported assumptions.
- Check that every requirement maps to an input, process, output, constraint or assumption.

</details>

<details><summary>Precise syllabus wording</summary>

Understand what an algorithm is.

An algorithm is a solution to a problem expressed as a sequence of defined steps; the definition requires both the problem-solving purpose and the defined sequence.

</details>

### 2. Choose meaningful identifier names and construct an identifier table (S9.04)

**Atomic learning targets**

- **S9.04.A01:** meaningful
- **S9.04.A02:** identifier
- **S9.04.A03:** names
- **S9.04.A04:** table

**Core explanation**

- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Choose meaningful identifier names that describe each value's role. An identifier table records at least the identifier name, data type and purpose; its entries must match the pseudocode solution.
- And choose meaningful identifiers recorded in an identifier table.

**Mechanism or method**

1. **Identify the relevant condition or input** — Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;
2. **Trace how the process works** — use abstraction to retain essential details in an abstract model;
3. **Connect the mechanism to its result** — use decomposition to express the problem as connected modules;

#### Worked example: Choose meaningful identifier names and construct an identifier table: complete worked route

1. **Identify the relevant condition or input**

Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;

2. **Trace how the process works**

use abstraction to retain essential details in an abstract model;

3. **Connect the mechanism to its result**

use decomposition to express the problem as connected modules;

4. **Complete example**

The identifier table records TicketCount: INTEGER, number requested;

**Misconceptions to correct**

- Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

#### Mastery check (MC-L048-S9.04)

Explain the following targets in one connected answer, using a concrete example for each: meaningful; identifier; names; table.

<details><summary>Answer criteria</summary>

- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Choose meaningful identifier names that describe each value's role. An identifier table records at least the identifier name, data type and purpose; its entries must match the pseudocode solution.
- And choose meaningful identifiers recorded in an identifier table.

</details>

**Supplementary concept map**

- **meaningful:** Choose suitable meaningful identifier names and construct an…
- **identifier:** Choose meaningful identifier names and construct an identifier…
- **names:** Choose meaningful identifier names that describe each value's…
- **table:** And choose meaningful identifiers recorded in an identifier…
- **choose:** An identifier table records at least the identifier…

**Supplementary three-step recap**

1. **Translate the stated design** — Choose suitable meaningful identifier names and construct an identifier table that records each identifier's name, data type and…
2. **Apply one complete operation** — Choose meaningful identifier names and construct an identifier table.
3. **Trace state and boundaries** — And choose meaningful identifiers recorded in an identifier table.

**Readable notation earns marks more easily:** Notation rules One entry Flowcharts should have a clear start and a clear direction of travel.

#### Readable notation earns marks more easily

![Readable notation earns marks more easily](../web/assets/diagrams/stage10-infographics/stage10-lesson-102-notation.jpg)

<details><summary>Text transcript</summary>

- Notation rules
- One entry Flowcharts should have a clear start and a clear direction of travel.
- Decision labels Decision outputs should be labelled, usually Yes/No or True/False.
- Indentation Indented pseudocode shows which statements belong inside a branch or loop.
- Matching endings Use ENDIF, NEXT, ENDWHILE or equivalent to close a structure clearly.
- Meaningful names Use Mark, Total, Count, Found instead of X1 unless the question gives X1.
- No mixed syntax Do not mix Java braces with Cambridge pseudocode keywords in the same answer.

</details>

<details><summary>Precise syllabus wording</summary>

Choose meaningful identifier names and construct an identifier table.

Students must choose suitable meaningful identifier names and construct an identifier table that records each identifier's name, data type and purpose for the designed algorithm.

</details>

### Lesson technical reference

- An algorithm is a solution to a problem expressed as a sequence of defined steps; the definition requires both the problem-solving purpose and the defined sequence.
- Students must choose suitable meaningful identifier names and construct an identifier table that records each identifier's name, data type and purpose for the designed algorithm.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.
- Choose meaningful identifier names that describe each value's role. An identifier table records at least the identifier name, data type and purpose; its entries must match the pseudocode solution.
- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.
- Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values. Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.

Beyond syllabus / 延伸知识（不要求背诵）: the same algorithm can be expressed in many programming languages; its logic should remain independent of syntax.
## 3. Practice by question type

### Question 1 - foundation - complete - 6 marks

Complete an identifier table and an input-process-output pseudocode solution that inputs a student's name and three marks, then outputs the calculated mean.

**Answer:** meaningful STRING identifier and purpose for the student's name; three clearly identified numeric mark inputs or a clearly bounded mark collection; meaningful REAL identifier and purpose for the mean; pseudocode inputs the required values; processing calculates the total and mean in a defined sequence; outputs the calculated mean and matches the identifier table

**Marking guidance:** Do not award an identifier list without types and purposes, or IPO headings without a complete sequence of defined steps.

**Common error:** For the command word complete, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - state - 2 marks

State the official-style definition of an algorithm.

**Answer:** A solution to a problem expressed as a sequence of defined steps.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

What is an algorithm?

**Answer:** A solution to a problem expressed as a sequence of defined steps.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/S/24 Q2(b) | 2 | complete | recall |
| 9618/22/W/23 Q2(a) | 5 | draw | diagram |
| 9618/22/W/23 Q1(a) | 4 | complete | recall |
| 9618/22/W/23 Q1(b) | 4 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S9.03: explain algorithm, solution, sequence, defined steps.
- S9.03 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S9.04: explain meaningful, identifier, names, table.
- S9.04 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

### Common error to correct

Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For algorithms and meaningful identifiers, use the exact technical term before applying it to the scenario.
