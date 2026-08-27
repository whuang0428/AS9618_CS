# Lesson 102: Trace tables and dry runs

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

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Logic statements define parts of an algorithm

### Direct explanation

- A logic statement defines a decision, repetition condition or Boolean assignment in an algorithm solution. It combines comparisons such as =, <, <=, >, >= or <> with AND, OR or NOT when more than one condition is needed.
- Construct a statement from the rule before choosing its branch: a valid mark from 0 to 100 inclusive is Mark >= 0 AND Mark <= 100. Interpret it by checking both comparisons; using OR would accept values outside the range.
- Logic statements must preserve boundaries and intended truth conditions. Trace representative true, false and boundary values to expose reversed operators or incorrect connectors.

### Worked example

**Define a valid-age condition:** For an accepted age from 11 to 18 inclusive, use Age >= 11 AND Age <= 18. At Age = 11 and Age = 18 the statement is TRUE; at Age = 10 or 19 it is FALSE. NOT(Age >= 11 AND Age <= 18) describes the invalid case.

### Targeted practice and answers

1. Construct the valid-mark statement for 0 to 100 inclusive.
   **Answer:** Mark >= 0 AND Mark <= 100.
2. Interpret Found = FALSE OR Index <= UpperBound.
   **Answer:** The statement is true when the target has not been found, or the index is still within the upper bound, or both.
3. Why is Mark >= 0 OR Mark <= 100 incorrect for validation?
   **Answer:** Every number satisfies at least one side, so out-of-range values can be accepted.

### Exam-style question and MS

**Question (5 marks):** Write and explain a logic statement that accepts an integer Temperature from -20 to 50 inclusive, then state its value for -21, -20, 50 and 51.

- **B1** uses Temperature >= -20
- **B1** uses AND Temperature <= 50
- **B1** states FALSE for -21
- **B1** states TRUE for -20 and 50
- **B1** states FALSE for 51

**Strict note:** Do not accept OR for a two-bound inclusive range or award outputs without a correctly constructed statement.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Dry run: execute the algorithm by hand

- **Explains:** `dry-run`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-dry-run.jpg`

1. 1 Copy the variable names into table columns.
2. 2 Write initial values before the loop starts.
3. 3 Use each input value in order.
4. 4 Update variables exactly when pseudocode updates them.
5. 5 Record output only when an OUTPUT statement is executed.

### Loops make trace tables useful and slightly unforgiving

- **Explains:** `loops`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-loops.jpg`

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
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-predictor.jpg`

1. Interactive output predictor
2. Input set
3. The pseudocode totals three input numbers and outputs Total.

### Trace Cambridge pseudocode in the exam; Java is only a support view

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-pseudocode.jpg`

1. Initialise Total to zero before a three-iteration loop.
2. Input one Number and add it to Total during each iteration.
3. Output Total once after the loop has processed all three numbers.
4. A Java support version must preserve the same input, accumulation and final output.

### A trace table records variables after each change

- **Explains:** `trace-table`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-trace-table.jpg`

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
