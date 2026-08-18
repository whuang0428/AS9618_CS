# Lesson 108: Nested loops and table-style problems

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Nested loops and table-style problems** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Nested loops and table-style problems** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Nested loops and table-style problems, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Nested loops and table-style problems**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Nested loops and table-style problems**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Nested loops and table-style problems** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Nested loops and table-style problems**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Nested loops and table-style problems** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Nested loops and table-style problems** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **nested loops and table-style problems**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Total visits = outer repetitions x inner repetitions

- **Explains:** `counting`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-108-counting.jpg`

1. Counting steps
2. FOR Row <- 1 TO 2
3. FOR Column <- 1 TO 3
4. OUTPUT "*"
5. NEXT Column
6. NEXT Row
7. Count it
8. The OUTPUT "*" statement runs 2 x 3 = 6 times. The inner loop runs fully for Row 1, then fully again for Row 2.
9. Do not add 2 + 3. Nested loop visits multiply when every inner loop runs for every outer loop value.

### Outer loop first, inner loop second

- **Explains:** `model`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-108-model.jpg`

1. Knowledge explanation
2. Core structure
3. FOR Row <- 1 TO 3
4. FOR Column <- 1 TO 4
5. OUTPUT Row, Column
6. NEXT Column
7. NEXT Row
8. The inner loop completes all columns for one row before the outer loop moves to the next row.
9. Trace idea
10. Column sequence
11. 1, 2, 3, 4

### Indentation is evidence in nested loops

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-108-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. FOR Row <- 1 TO 3
4. FOR Column <- 1 TO 4
5. Product <- Row * Column
6. OUTPUT Product
7. NEXT Column
8. NEXT Row
9. Java support only
10. for (int row = 1; row <= 3; row++) {
11. for (int column = 1; column <= 4; column++) {
12. int product = row * column;

### Put row-level variables inside the outer loop

- **Explains:** `reset`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-108-reset.jpg`

1. Reset rules
2. Correct: row total resets for each row
3. GrandTotal <- 0
4. FOR Row <- 1 TO 3
5. RowTotal <- 0
6. FOR Column <- 1 TO 4
7. INPUT Mark
8. RowTotal <- RowTotal + Mark
9. NEXT Column
10. OUTPUT RowTotal
11. GrandTotal <- GrandTotal + RowTotal
12. NEXT Row

### Table-style problems usually scan row by row

- **Explains:** `table`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-108-table.jpg`

1. Table traversal
2. Problem type
3. Outer loop
4. Inner loop
5. Typical output
6. Grid / table
7. cell coordinates or cell values
8. Class marks
9. students
10. subjects/tests
11. row total or average per student
12. Multiplication table
<!-- stage10-explanations:end -->
