# Lesson 101: Trace tables and dry runs

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Trace tables and dry runs** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Trace tables and dry runs** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Trace tables and dry runs, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Trace tables and dry runs**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Trace tables and dry runs**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Trace tables and dry runs** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Trace tables and dry runs**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Trace tables and dry runs** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Trace tables and dry runs** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **trace tables and dry runs**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Dry run: execute the algorithm by hand

- **Explains:** `dry-run`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-dry-run.jpg`

1. 1 Copy the variable names into table columns.
2. 2 Write initial values before the loop starts.
3. 3 Use each input value in order.
4. 4 Update variables exactly when pseudocode updates them.
5. 5 Record output only when an OUTPUT statement is executed.

### Loops make trace tables useful and slightly unforgiving

- **Explains:** `loops`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-loops.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-predictor.jpg`

1. Interactive output predictor
2. Input set
3. The pseudocode totals three input numbers and outputs Total.

### Trace Cambridge pseudocode in the exam; Java is only a support view

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. Total <- 0
4. FOR Count <- 1 TO 3
5. INPUT Number
6. Total <- Total + Number
7. NEXT Count
8. OUTPUT Total
9. Java support only
10. int total = 0;
11. for (int count = 1; count <= 3; count++) {
12. int number = input.nextInt();

### A trace table records variables after each change

- **Explains:** `trace-table`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-trace-table.jpg`

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
