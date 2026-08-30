# Lesson 103: Stepwise refinement from IPO design to modules

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Stepwise refinement from IPO design to modules

### Direct explanation

- Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps. Refinement stops when every step is precise enough to implement and its input and output are clear.
- At each level, preserve the parent step's purpose and input-process-output relationship. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
- Refinement supports review, implementation and testing because each module has a limited responsibility. It is not merely adding prose: every level must reduce ambiguity and collectively remain a complete solution.

### Worked example

**Refine an order-processing algorithm:** Level 1: InputOrder; ValidateOrder; CalculateTotal; ProduceReceipt. Refine CalculateTotal into Set Total to 0; for each item validate Quantity; add Price * Quantity; apply Discount; return Total. CalculateTotal can be a function returning Total, while ProduceReceipt can be a procedure receiving the completed total.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What is the starting point of stepwise refinement?
   **Answer:** A high-level algorithm or task.
2. When should refinement stop?
   **Answer:** When each step is a defined, implementable action with clear inputs and outputs.
3. How does IPO help one refinement level?
   **Answer:** It checks that each module receives the data it needs, performs defined processing and supplies the required output.

### Exam-style question and MS

**Question (5 marks):** Apply two levels of stepwise refinement to 'register a new library member', showing module inputs/outputs and identifying one procedure or function.

| Answer | Guidance | Marks |
|---|---|---:|
| Level 1 separates capture, validation, storage and confirmation responsibilities | Do not award unrelated features, repeated high-level labels or a level that does not reduce ambiguity. | 1 |
| Level 2 replaces at least one complex step with smaller ordered substeps |  | 1 |
| module inputs and outputs are clear |  | 1 |
| procedure or function choice matches action versus returned value |  | 1 |
| refined steps collectively implement the original task |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Trace tables and dry runs**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Trace tables and dry runs** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Trace tables and dry runs, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.

## Student Task
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Trace tables and dry runs**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Stepwise refinement turns a high-level algorithm into implementable modules

- **Explains:** `analyser`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-analyser.jpg`

1. Stepwise refinement starts with a high-level algorithm and repeatedly replaces each complex step with a smaller sequence of defined substeps.
2. Refinement stops when every step is precise enough to implement and its input and output are clear.
3. At each level, preserve the parent step's purpose and input-process-output relationship.
4. Related substeps can be expressed as program modules, including procedures that perform actions and functions that return calculated values.
5. Every level must reduce ambiguity and collectively remain a complete solution.

### Dry run: execute the algorithm by hand

- **Explains:** `dry-run`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-dry-run.jpg`

1. 1 Copy the variable names into table columns.
2. 2 Write initial values before the loop starts.
3. 3 Use each input value in order.
4. 4 Update variables exactly when pseudocode updates them.
5. 5 Record output only when an OUTPUT statement is executed.

### Loops make trace tables useful and slightly unforgiving

- **Explains:** `loops`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-loops.jpg`

1. Loop tracing
2. Initialisation Variables such as Total and Count usually need a starting value before the loop.
3. Update Record new values after assignment, not before.
4. Condition For WHILE loops, check the condition before each iteration.
5. Sentinel A sentinel value stops input and should usually not be processed as data.
6. Output timing If OUTPUT is after the loop, output appears once at the end.
7. Boundary Check whether loops run 5 times, 6 times, or one time too many.

### Predict the final output

- **Explains:** `predictor`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-predictor.jpg`

1. Interactive output predictor
2. Input set
3. The pseudocode totals three input numbers and outputs Total.

### Trace Cambridge pseudocode in the exam; Java is only a support view

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-pseudocode.jpg`

1. Initialise Total to zero before a three-iteration loop.
2. Input one Number and add it to Total during each iteration.
3. Output Total once after the loop has processed all three numbers.
4. A Java support version must preserve the same input, accumulation and final output.

### A trace table records variables after each change

- **Explains:** `trace-table`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-trace-table.jpg`

1. Knowledge explanation
2. What it records
3. Exam note
4. Line / step
5. which statement is being executed
6. optional, but useful for debugging
7. Input value
8. the test data read by INPUT
9. do not invent values not given by the question
10. Variable columns
11. current values of Count, Total, Mark, Found, etc.
12. write changed values clearly
<!-- stage10-explanations:end -->
