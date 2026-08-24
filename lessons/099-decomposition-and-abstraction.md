# Lesson 099: Decomposition and abstraction

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Decomposition and abstraction**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Decomposition and abstraction** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Decomposition and abstraction, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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
- Answer one 4-mark question about **Decomposition and abstraction**. Follow its command word and apply each point to the stated context.

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

### Abstraction: keep the details that affect the algorithm

- **Explains:** `abstraction`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-abstraction.jpg`

1. Knowledge explanation
2. Keep inputs, ranges, counts, limits, required outputs and stopping conditions.
3. Ignore visual style, real-world decoration and details that do not change the logic.
4. Name use meaningful identifiers such as Mark, TotalCost, PlacesLeft and IsValid.
5. Model represent the real situation using variables, constants, arrays and records when needed.
6. Check ask whether removing a detail would change the algorithm's result.
7. Explain state why a detail is relevant or irrelevant, not just that it is "important".

### Decomposition: split the problem into sub-problems

- **Explains:** `decomposition`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-decomposition.jpg`

1. Knowledge explanation
2. Possible sub-problems
3. Why this helps
4. Calculate class average
5. Input marks, validate marks, total marks, calculate average, output average
6. Each part has a clear variable and test case
7. Login check
8. Input username/password, check blank input, compare stored details, output access decision
9. Selection and validation are easier to locate
10. Process ticket sales
11. Input ticket type, validate type, calculate price, update places, output confirmation
12. Business rules are separated from input/output

### Keep or ignore details

- **Explains:** `filter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-filter.jpg`

1. Interactive abstraction filter

### From scenario to algorithm plan

- **Explains:** `pattern`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-pattern.jpg`

1. Design pattern
2. 1 Read the scenario and underline the required output.
3. 2 List inputs and constraints.
4. 3 Decompose into sub-problems with verb-based names.
5. 4 Abstract away details that do not affect logic.
6. 5 Write Cambridge-style pseudocode for each part.

### Modules can be planned in pseudocode without Java syntax

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-pseudocode.jpg`

1. A procedure may contain an IF...THEN...ELSE selection.
2. Close the selection with ENDIF before closing the surrounding procedure with ENDPROCEDURE.
3. For mark validation, output Valid only for values from 0 to 100 inclusive.
4. Java braces may support understanding but are not Cambridge pseudocode.

### Classify the design move

- **Explains:** `sorter`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-sorter.jpg`

1. Interactive task sorter
2. Design statement
3. Choose a statement to see whether it demonstrates decomposition, abstraction or an error.
<!-- stage10-explanations:end -->
