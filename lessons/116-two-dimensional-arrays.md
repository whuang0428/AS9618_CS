# Lesson 116: Two-dimensional arrays

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Two-dimensional arrays** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Two-dimensional arrays** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Two-dimensional arrays, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Two-dimensional arrays**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Two-dimensional arrays**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```


## Student Task
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Two-dimensional arrays** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Two-dimensional arrays**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Two-dimensional arrays** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Two-dimensional arrays** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **two-dimensional arrays**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A cell needs row and column

- **Explains:** `access`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-access.jpg`

1. Access and update
2. Read one cell
3. OUTPUT Marks[2, 3]
4. Outputs the value in row 2, column 3.
5. Update one cell
6. Marks[2, 3] <- Marks[2, 3] + 1
7. Only that cell changes; other rows and columns are untouched.

### Two dimensions need two ranges

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-declare.jpg`

1. Declare 2D arrays
2. Cambridge-style pseudocode
3. Valid cells
4. 3 by 4 mark table
5. DECLARE Marks : ARRAY[1:3, 1:4] OF INTEGER
6. 3 rows, 4 columns, 12 cells
7. 5 by 7 temperatures
8. DECLARE Temp : ARRAY[1:5, 1:7] OF REAL
9. 5 rows, 7 columns, 35 cells
10. 10 by 10 grid
11. DECLARE Grid : ARRAY[1:10, 1:10] OF BOOLEAN
12. 100 Boolean cells

### Read Marks[Row, Column]

- **Explains:** `lookup`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-lookup.jpg`

1. Interactive cell lookup
2. Array: Marks[1:3, 1:4]. Choose a row and column.

### Rows and columns create coordinates

- **Explains:** `model`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-model.jpg`

1. 2D model
2. Same identifier
3. The whole grid has one array name.
4. Two indexes
5. The first index usually selects the row; the second index selects the column.
6. Marks[Row, Column]
7. Same type
8. Each cell stores the same data type.
9. ARRAY[1:3, 1:4] OF INTEGER

### Outer row loop, inner column loop

- **Explains:** `nested`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-nested.jpg`

1. Nested loops
2. Input every cell
3. FOR Row <- 1 TO 3
4. FOR Column <- 1 TO 4
5. INPUT Marks[Row, Column]
6. NEXT Column
7. NEXT Row
8. Total every cell
9. Total <- 0
10. Total <- Total + Marks[Row, Column]
11. OUTPUT Total
12. For a 3 by 4 array, the inner statement runs 3 * 4 = 12 times.

### Do not import Java indexing into Cambridge answers

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. DECLARE Marks : ARRAY[1:3, 1:4] OF INTEGER
4. FOR Row <- 1 TO 3
5. FOR Column <- 1 TO 4
6. OUTPUT Marks[Row, Column]
7. NEXT Column
8. NEXT Row
9. Java support only
10. int[][] marks = new int[3][4];
11. for (int row = 0; row < 3; row++) {
12. for (int column = 0; column < 4; column++) {
<!-- stage10-explanations:end -->
