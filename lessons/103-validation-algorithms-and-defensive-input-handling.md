# Lesson 103: Logic statements define parts of an algorithm

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Logic statements define parts of an algorithm

### Direct explanation

- A logic statement defines a decision, repetition condition or Boolean assignment in an algorithm solution. It combines comparisons such as =, <, <=, >, >= or <> with AND, OR or NOT when more than one condition is needed.
- Construct a statement from the rule before choosing its branch: a valid mark from 0 to 100 inclusive is Mark >= 0 AND Mark <= 100. Interpret it by checking both comparisons; using OR would accept values outside the range.
- Logic statements must preserve boundaries and intended truth conditions. Trace representative true, false and boundary values to expose reversed operators or incorrect connectors.

### Worked example

**Define a valid-age condition:** For an accepted age from 11 to 18 inclusive, use Age >= 11 AND Age <= 18. At Age = 11 and Age = 18 the statement is TRUE; at Age = 10 or 19 it is FALSE. NOT(Age >= 11 AND Age <= 18) describes the invalid case.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Complete the valid-mark statement for 0 to 100 inclusive.
   **Answer:** Mark >= 0 AND Mark <= 100.
2. Give the denary value of Found = FALSE OR Index <= UpperBound.
   **Answer:** The statement is true when the target has not been found, or the index is still within the upper bound, or both.
3. Why is Mark >= 0 OR Mark <= 100 incorrect for validation?
   **Answer:** Every number satisfies at least one side, so out-of-range values can be accepted.

### Exam-style question and MS

**Question (5 marks):** Write and explain a logic statement that accepts an integer Temperature from -20 to 50 inclusive, then state its value for -21, -20, 50 and 51.

| Answer | Guidance | Marks |
|---|---|---:|
| uses Temperature >= -20 | Do not accept OR for a two-bound inclusive range or award outputs without a correctly constructed statement. | 1 |
| uses AND Temperature <= 50 |  | 1 |
| states FALSE for -21 |  | 1 |
| states TRUE for -20 and 50 |  | 1 |
| states FALSE for 51 |  | 1 |
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
1. Apply the algorithmic technique involved in **Validation algorithms and defensive input handling**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Validation algorithms and defensive input handling** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Validation algorithms and defensive input handling, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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
- Answer one 4-mark question about **Validation algorithms and defensive input handling**. Follow its command word and apply each point to the stated context.

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

### Match the rule to the risk

- **Explains:** `checks`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-checks.jpg`

1. LENGTH(Postcode) <= 8 is a maximum-length check.
2. The rule accepts no more than eight characters and prevents input that is too long.
3. It does not require exactly eight characters.
4. Use equality or bounded limits only when an exact or minimum-and-maximum length is intended.

### Reject bad input, then ask again

- **Explains:** `defensive`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-defensive.jpg`

1. Defensive input handling
2. 1 Input the value.
3. 2 Test the validation condition.
4. 3 If invalid, output a helpful message.
5. 4 Repeat input until valid.
6. 5 Process only the accepted value.

### A diamond becomes IF...THEN...ELSE

- **Explains:** `equivalence`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-equivalence.jpg`

1. A flowchart decision diamond becomes an IF condition in pseudocode.
2. The labelled Yes and No branches become THEN and ELSE branches.
3. Close the selection with ENDIF after the two branches rejoin.
4. Input Age before testing whether it is between 11 and 18 inclusive.

### Use Cambridge-style validation loops in the exam

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-pseudocode.jpg`

1. A post-condition validation loop starts with REPEAT and ends with UNTIL.
2. Input Mark inside the loop so every retry obtains a replacement value.
3. Close the invalid-mark selection with ENDIF before UNTIL.
4. A Java do-while support version must begin with do and close its blocks correctly.

### Test a mark against 0-100

- **Explains:** `tester`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-tester.jpg`

1. Interactive input tester
2. Enter a mark and test whether it is valid.

### Validation checks whether input follows a rule

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-validation.jpg`

1. Knowledge explanation
2. What validation does
3. Validation rejects unacceptable input before processing. It can check range, presence, length, type, format, existence or check digit rules.
4. What validation does not do
5. Validation does not prove input is true. It checks whether input is reasonable or follows the expected pattern.
6. Example: age 15 passes a school-age range check, but it might still be a lie.
<!-- stage10-explanations:end -->
