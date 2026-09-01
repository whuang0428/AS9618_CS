# Lesson 047: Decomposition and modular problem solving

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 9: Algorithm design and problem-solving<br>
**Syllabus requirements:** S9.02<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S9.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Abstraction is required both as a concept and as a practical modelling skill: explain its need and benefits, then produce an abstract model containing only details essential to the problem.
- Understand abstraction, its purpose/benefits and creation of an abstract model.


## 2. Knowledge explanation

### 1. Decomposition and express a problem as modules: Decomposition and modular problem solving (S9.02)

**Atomic learning targets**

- **S9.02.A01:** decomposition
- **S9.02.A02:** problem
- **S9.02.A03:** modules
- **S9.02.A04:** procedure
- **S9.02.A05:** function

**Core explanation**

- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Abstraction decides what belongs in the model; decomposition decides how the retained problem is divided. The modules must connect into one complete solution and must not omit a requirement.

**Mechanism or method**

1. **Set up the required data and conditions** — Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;
2. **Carry out the complete method** — use abstraction to retain essential details in an abstract model;
3. **Trace or test the result** — use decomposition to express the problem as connected modules;

#### Worked example: Decomposition and express a problem as modules: Decomposition and modular problem solving: complete worked route

1. **Set up the required data and conditions**

Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps;

2. **Carry out the complete method**

use abstraction to retain essential details in an abstract model;

3. **Trace or test the result**

use decomposition to express the problem as connected modules;

4. **Complete example**

Express the solution as modules InputTimes, CalculateDuration, CalculateCharge and OutputCharge. CalculateCharge can become a function returning the charge, while OutputCharge can become a procedure that displays it.

**Misconceptions to correct**

- Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.

#### Mastery check (MC-L047-S9.02)

Complete a fresh example that demonstrates every target: decomposition; problem; modules; procedure; function. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Abstraction decides what belongs in the model; decomposition decides how the retained problem is divided. The modules must connect into one complete solution and must not omit a requirement.

</details>

**Supplementary concept map**

- **module:** Decomposition must break a problem into sub-problems and…
- **modules:** Decomposition and express a problem as modules.
- **decomposition:** Decomposition to express the problem as connected modules
- **procedure:** A module may become a procedure that performs…
- **function:** A module may later be implemented as a…
- **problem:** Decomposition decides how the retained problem is divided.

**Supplementary three-step recap**

1. **Translate the stated design** — Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as…
2. **Apply one complete operation** — Decomposition and express a problem as modules.
3. **Trace state and boundaries** — Decomposition to express the problem as connected modules

**Decomposition: split the problem into sub-problems:** Split the whole task into meaningful sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs.

#### Decomposition: split the problem into sub-problems

![Decomposition: split the problem into sub-problems](../web/assets/diagrams/stage10-infographics/stage10-lesson-100-decomposition.jpg)

<details><summary>Text transcript</summary>

- Split the whole task into meaningful sub-problems with distinct responsibilities.
- Express the resulting design as program modules with clear inputs, processing and outputs.
- A module may become a procedure that performs an action or a function that returns a value.
- Confirm that all modules connect into one complete solution.

</details>

<details><summary>Precise syllabus wording</summary>

Use decomposition and express a problem as modules.

Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility.

</details>

### Lesson technical reference

- Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility.
- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction decides what belongs in the model; decomposition decides how the retained problem is divided. The modules must connect into one complete solution and must not omit a requirement.
- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.
- Algorithm design review: define an algorithm as a solution expressed as a sequence of defined steps; use abstraction to retain essential details in an abstract model; use decomposition to express the problem as connected modules; and choose meaningful identifiers recorded in an identifier table.
- Solution review: design with input-process-output, use sequence, selection and iteration, document the same algorithm in structured English, a flowchart or pseudocode, and convert between the specified representations without changing its control flow.
- Development review: use stepwise refinement until steps are programmable, and construct and interpret logic statements that define decisions, loop conditions or Boolean values. Core answers must not replace these requirements with tracing, Java syntax or vague planning advice.

Beyond syllabus / 延伸知识（不要求背诵）: the same algorithm can be expressed in many programming languages; its logic should remain independent of syntax.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What is the difference between abstraction and decomposition?

**Answer:** Abstraction selects essential details for the model; decomposition splits the retained problem into sub-problems/modules.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - compare - 2 marks

Compare a procedure module from a function module at this design stage.

**Answer:** A procedure performs an action; a function returns a value to its caller.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

How does IPO help one refinement level?

**Answer:** It checks that each module receives the data it needs, performs defined processing and supplies the required output.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q2(i) | 2 | calculate | calculate |
| 9618/22/S/24 Q7(i) | 5 | complete | recall |
| 9618/23/W/24 Q7(b) | 4 | calculate | calculate |
| 9618/22/S/24 Q7(a) | 3 | describe | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S9.02: explain decomposition, problem, modules, procedure, function.
- S9.02 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.

### Common error to correct

Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For decomposition and modular problem solving, use the exact technical term before applying it to the scenario.
