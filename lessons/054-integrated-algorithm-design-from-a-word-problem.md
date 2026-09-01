# Lesson 054: Integrated algorithm design from a word problem

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 9: Algorithm design and problem-solving<br>
**Syllabus requirements:** S9.02, S9.05, S9.08<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S9.01, S9.03, S9.04, S9.02 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Abstraction is required both as a concept and as a practical modelling skill: explain its need and benefits, then produce an abstract model containing only details essential to the problem.
- Understand abstraction, its purpose/benefits and creation of an abstract model.
- An algorithm is a solution to a problem expressed as a sequence of defined steps; the definition requires both the problem-solving purpose and the defined sequence.
- Understand what an algorithm is.
- Students must choose suitable meaningful identifier names and construct an identifier table that records each identifier's name, data type and purpose for the designed algorithm.
- Choose meaningful identifier names and construct an identifier table.


## 2. Knowledge explanation

### 1. Decomposition and express a problem as modules: Integrated algorithm design from a word problem (S9.02)

**Atomic learning targets**

- **S9.02.A01:** decomposition
- **S9.02.A02:** problem
- **S9.02.A03:** modules
- **S9.02.A04:** procedure
- **S9.02.A05:** function

**Core explanation**

- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Use input, process and output as the design structure for a complete pseudocode solution; the three parts must connect, use meaningful identifiers and satisfy the stated problem.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.

**Mechanism or method**

1. **Set up the required data and conditions** — Decomposition breaks a problem into smaller sub-problems with distinct responsibilities.
2. **Carry out the complete method** — Express the resulting design as program modules with clear inputs, processing and outputs;
3. **Trace or test the result** — a module may later be implemented as a procedure that performs an action or a function that returns a value.

#### Worked example: Decomposition and express a problem as modules: Integrated algorithm design from a word problem: complete worked route

1. **Set up the required data and conditions**

Decomposition breaks a problem into smaller sub-problems with distinct responsibilities.

2. **Carry out the complete method**

Express the resulting design as program modules with clear inputs, processing and outputs;

3. **Trace or test the result**

a module may later be implemented as a procedure that performs an action or a function that returns a value.

4. **Complete example**

Design a result-processing solution: Keep only student ID and required marks, decompose the task into InputResults, ValidateResult, CalculateMean and OutputReport, record meaningful identifiers and IPO, refine CalculateMean into defined steps, use a range logic statement, and represent the final control flow in Cambridge pseudocode or a matching flowchart.

**Misconceptions to correct**

- Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

#### Mastery check (MC-L054-S9.02)

Complete a fresh example that demonstrates every target: decomposition; problem; modules; procedure; function. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Use input, process and output as the design structure for a complete pseudocode solution; the three parts must connect, use meaningful identifiers and satisfy the stated problem.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.

</details>

**Supplementary concept map**

- **sub-problem:** Decomposition must break a problem into sub-problems and…
- **module:** Decomposition and express a problem as modules.
- **problem:** Decomposition decides how the retained problem is divided.
- **modules:** Express the resulting design as program modules with…
- **responsibility:** Refinement supports review, implementation and testing because each…
- **interface:** A module may later be implemented as a…

**Supplementary three-step recap**

1. **Translate the stated design** — Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as…
2. **Apply one complete operation** — Decomposition and express a problem as modules.
3. **Trace state and boundaries** — A module may later be implemented as a procedure that performs an action or a function that returns…

**Concrete case: sub-problem:** Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility.



<details><summary>Precise syllabus wording</summary>

Use decomposition and express a problem as modules.

Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility.

</details>

### 2. Input-process-output to design pseudocode solutions: Integrated algorithm design from a word problem (S9.05)

**Atomic learning targets**

- **S9.05.A01:** input-process-output
- **S9.05.A02:** design
- **S9.05.A03:** pseudocode
- **S9.05.A04:** solution

**Core explanation**

- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.

**Mechanism or method**

1. **Set up the required data and conditions** — At each level, preserve the parent step's purpose and input-process-output relationship.
2. **Carry out the complete method** — Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
3. **Trace or test the result** — Decomposition breaks a problem into smaller sub-problems with distinct responsibilities.

#### Worked example: Input-process-output to design pseudocode solutions: Integrated algorithm design from a word problem: complete worked route

1. **Set up the required data and conditions**

At each level, preserve the parent step's purpose and input-process-output relationship.

2. **Carry out the complete method**

Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.

3. **Trace or test the result**

Decomposition breaks a problem into smaller sub-problems with distinct responsibilities.

4. **Complete example**

Design a result-processing solution: Keep only student ID and required marks, decompose the task into InputResults, ValidateResult, CalculateMean and OutputReport, record meaningful identifiers and IPO, refine CalculateMean into defined steps, use a range logic statement, and represent the final control flow in Cambridge pseudocode or a matching flowchart.

**Misconceptions to correct**

- Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

#### Mastery check (MC-L054-S9.05)

Complete a fresh example that demonstrates every target: input-process-output; design; pseudocode; solution. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.

</details>

**Supplementary concept map**

- **input-process-output:** Input-process-output to design pseudocode solutions.
- **solution:** Input, process and output as the design structure…
- **design:** This input-process-output design must describe a complete solution…
- **pseudocode:** Before writing pseudocode, identify the input data, the…
- **input:** At each level, preserve the parent step's purpose…

**Supplementary three-step recap**

1. **Translate the stated design** — Input, process and output as the design structure for a complete pseudocode solution
2. **Apply one complete operation** — Input-process-output to design pseudocode solutions.
3. **Trace state and boundaries** — This input-process-output design must describe a complete solution rather than three unrelated lists.

**Concrete case: input-process-output:** Input, process and output as the design structure for a complete pseudocode solution



<details><summary>Precise syllabus wording</summary>

Use input-process-output to design pseudocode solutions.

Use input, process and output as the design structure for a complete pseudocode solution; the three parts must connect, use meaningful identifiers and satisfy the stated problem.

</details>

### 3. Stepwise refinement to develop an algorithm: Integrated algorithm design from a word problem (S9.08)

**Atomic learning targets**

- **S9.08.A01:** stepwise
- **S9.08.A02:** refinement
- **S9.08.A03:** algorithm
- **S9.08.A04:** implement

**Core explanation**

- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.

**Mechanism or method**

1. **Set up the required data and conditions** — Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps.
2. **Carry out the complete method** — Refinement stops when every step is precise enough to implement and its input and output are clear.
3. **Trace or test the result** — An algorithm is a solution to a problem expressed as a sequence of defined steps.

#### Worked example: Stepwise refinement to develop an algorithm: Integrated algorithm design from a word problem: complete worked route

1. **Set up the required data and conditions**

Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps.

2. **Carry out the complete method**

Refinement stops when every step is precise enough to implement and its input and output are clear.

3. **Trace or test the result**

An algorithm is a solution to a problem expressed as a sequence of defined steps.

4. **Complete example**

Design a result-processing solution: Keep only student ID and required marks, decompose the task into InputResults, ValidateResult, CalculateMean and OutputReport, record meaningful identifiers and IPO, refine CalculateMean into defined steps, use a range logic statement, and represent the final control flow in Cambridge pseudocode or a matching flowchart.

**Misconceptions to correct**

- Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

#### Mastery check (MC-L054-S9.08)

Complete a fresh example that demonstrates every target: stepwise; refinement; algorithm; implement. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.

</details>

**Supplementary concept map**

- **stepwise:** Stepwise refinement to develop an algorithm from a…
- **refinement:** Stepwise refinement to develop an algorithm.
- **algorithm:** Stepwise refinement starts with a high-level algorithm and…
- **implement:** Refinement stops when every step is precise enough…
- **develop:** Refinement supports review, implementation and testing because each…

**Supplementary three-step recap**

1. **Translate the stated design** — Stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a…
2. **Apply one complete operation** — Stepwise refinement to develop an algorithm.
3. **Trace state and boundaries** — Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of…

**Stepwise refinement turns a high-level algorithm into implementable…:** Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and…

#### Stepwise refinement turns a high-level algorithm into implementable modules

![Stepwise refinement turns a high-level algorithm into implementable modules](../web/assets/diagrams/stage10-infographics/stage10-lesson-112-analyser.jpg)

<details><summary>Text transcript</summary>

- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps.
- Refinement stops when every step is precise enough to implement and its input and output are clear.
- At each level, preserve the parent step's purpose and input-process-output relationship.
- Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Every level must reduce ambiguity and collectively remain a complete solution.

</details>

<details><summary>Precise syllabus wording</summary>

Use stepwise refinement to develop an algorithm.

Use stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a program can be written; each level must preserve the parent purpose.

</details>

### Lesson technical reference

- Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility.
- Use input, process and output as the design structure for a complete pseudocode solution; the three parts must connect, use meaningful identifiers and satisfy the stated problem.
- Use stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a program can be written; each level must preserve the parent purpose.
- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction decides what belongs in the model; decomposition decides how the retained problem is divided. The modules must connect into one complete solution and must not omit a requirement.
- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.
- Choose meaningful identifier names that describe each value's role. An identifier table records at least the identifier name, data type and purpose; its entries must match the pseudocode solution.
- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.

Beyond syllabus / 延伸知识（不要求背诵）: the same algorithm can be expressed in many programming languages; its logic should remain independent of syntax.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What does decomposition produce here?

**Answer:** Smaller sub-problems expressed as connected program modules with clear responsibilities.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - state - 2 marks

State two precise facts about integrated algorithm design from a word problem.

**Answer:** Decomposition must break a problem into sub-problems and lead to a program module, identified at design level as a procedure or function with a distinct responsibility. Use input, process and output as the design structure for a complete pseudocode solution; the three parts must connect, use meaningful identifiers and satisfy the stated problem.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how integrated algorithm design from a word problem would be applied in a suitable computing context.

**Answer:** Use input, process and output as the design structure for a complete pseudocode solution; the three parts must connect, use meaningful identifiers and satisfy the stated problem. Use stepwise refinement to develop an algorithm from a high-level solution to a level of detail from which a program can be written; each level must preserve the parent purpose. Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/23/W/25 Q2(a) | 6 | describe | explain |
| 9618/22/S/25 Q2(a) | 2 | calculate | calculate |
| 9618/22/S/25 Q2(i) | 2 | calculate | calculate |
| 9618/22/S/25 Q2(ii) | 2 | calculate | calculate |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S9.02: explain decomposition, problem, modules, procedure, function.
- S9.02 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- S9.05: explain input-process-output, design, pseudocode, solution.
- S9.05 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- S9.08: explain stepwise, refinement, algorithm, implement.

### Common error to correct

Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For integrated algorithm design from a word problem, use the exact technical term before applying it to the scenario.
