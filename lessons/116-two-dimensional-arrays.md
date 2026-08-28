# Lesson 116: Select and write two-dimensional arrays

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Select and write two-dimensional arrays

### Direct explanation

- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.
- Select 2D when the scenario has two independent position dimensions, such as Student and Test, Row and Column, or Day and Period. A simple list, sequence or one category of positions remains 1D even when it contains many elements.
- Two-dimensional pseudocode declares both ranges, accesses one cell as Marks[Student, Test] and normally uses nested loops: one loop traverses rows and the inner loop traverses every column for the current row.

### Worked example

**Input a student-by-test table:** DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER. Use FOR Student <- 1 TO 30 and inside it FOR Test <- 1 TO 4; INPUT Marks[Student, Test]; NEXT Test; NEXT Student. Every one of the 120 cells is visited exactly once.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why is a seating grid normally 2D?
   **Answer:** Each seat is identified by two independent positions: row and column.
2. How many cells are in ARRAY[1:3, 1:4]?
   **Answer:** 12 cells because 3 row indexes are paired with 4 column indexes.
3. What is wrong with Marks[Row] for a 2D array?
   **Answer:** It supplies only one index and therefore does not identify a column or one complete cell.

### Exam-style question and MS

**Question (6 marks):** Write Cambridge pseudocode to declare a 5 by 7 REAL temperature table and calculate the total of every cell.

| Answer | Guidance | Marks |
|---|---|---:|
| declares ARRAY[1:5, 1:7] OF REAL or equivalent explicit five-by-seven bounds | Do not reverse the declared bounds in the traversal or access a 2D cell with only one index. | 1 |
| initialises Total |  | 1 |
| outer loop covers all five rows |  | 1 |
| inner loop covers all seven columns |  | 1 |
| adds Temperature[Row, Column] inside the inner loop |  | 1 |
| closes both loops and outputs Total after traversal |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Two-dimensional arrays**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Two-dimensional arrays** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Two-dimensional arrays, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

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
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Two-dimensional arrays**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A cell needs row and column

- **Explains:** `access`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-lookup.jpg`

1. Interactive cell lookup
2. Array: Marks[1:3, 1:4]. Choose a row and column.

### Rows and columns create coordinates

- **Explains:** `model`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
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
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-116-pseudocode.jpg`

1. Traverse a 3 by 4 array with nested loops.
2. Output the current cell inside the inner loop.
3. A corresponding Java support version must also output every current cell.
4. The two versions use explicitly stated indexing conventions.
<!-- stage10-explanations:end -->
