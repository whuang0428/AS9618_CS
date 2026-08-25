# Lesson 108: Nested loops and table-style problems

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Nested loops and table-style problems**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Nested loops and table-style problems** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Nested loops and table-style problems, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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

```text
// Cambridge-style pseudocode
FOR Row ← 1 TO NumberOfRows
    FOR Column ← 1 TO NumberOfColumns
        OUTPUT Table[Row, Column]
    NEXT Column
NEXT Row
```

```java
// Java support example only, not exam pseudocode
for (int row = 0; row < table.length; row++) {
    for (int column = 0; column < table[row].length; column++) {
        System.out.println(table[row][column]);
    }
}
```

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
- Answer one 4-mark question about **Nested loops and table-style problems**. Follow its command word and apply each point to the stated context.

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

1. Choose nested-loop order from the required traversal and grouping, not from which range is wider.
2. The outer-loop value changes less frequently.
3. The inner loop completes its full traversal for every outer-loop value.
4. In row-major traversal, hold one row while visiting every column, then advance the row.

### Indentation is evidence in nested loops

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-108-pseudocode.jpg`

1. Use an outer loop for three rows and an inner loop for four columns.
2. Calculate Product from the current Row and Column inside the inner loop.
3. Output Product during every inner-loop iteration.
4. A corresponding Java support version must also output each product.

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
