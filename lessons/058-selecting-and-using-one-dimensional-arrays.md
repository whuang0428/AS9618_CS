# Lesson 058: Selecting and using one-dimensional arrays

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.04, S10.05<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.03 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.
- Understand array, index, lower bound and upper bound terminology.


## 2. Knowledge explanation

### 1. Select one- or two-dimensional arrays for a scenario: Selecting and using one-dimensional arrays (S10.04)

**Atomic learning targets**

- **S10.04.A01:** one-dimensional / 1D
- **S10.04.A02:** two-dimensional / 2D
- **S10.04.A03:** select / suitable

**Core explanation**

- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.

**Mechanism or method**

1. **Extract the constraints from the scenario** — Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.
2. **Match mechanisms to those constraints** — Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests.
3. **Link the choice to a consequence** — Do not choose 2D merely because there are many values.

#### Worked example: Select one- or two-dimensional arrays for a scenario: Selecting and using one-dimensional arrays: complete worked route

1. **Extract the constraints from the scenario**

Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.

2. **Match mechanisms to those constraints**

Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests.

3. **Link the choice to a consequence**

Do not choose 2D merely because there are many values.

4. **Complete example**

Choose and declare the dimension: Twenty daily temperatures need one position per day, so DECLARE Temperature : ARRAY[1:20] OF REAL is suitable and valid indexes are 1 to 20. Marks for 30 students in 4 tests need row and column positions, so a 2D array is suitable instead.

**Misconceptions to correct**

- Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

#### Mastery check (MC-L058-S10.04)

Select and justify a suitable choice in a fresh scenario, explicitly using every target: one-dimensional / 1D; two-dimensional / 2D; select / suitable.

<details><summary>Answer criteria</summary>

- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.

</details>

**Supplementary concept map**

- **1D array:** One index selects an item
- **2D array:** Two indexes select a cell
- **Scenario:** Data shape determines dimensions
- **Bounds:** Valid index range
- **one-dimensional:** Select a suitable one-dimensional (1D) or two-dimensional (2D)…
- **two-dimensional:** Select one- or two-dimensional arrays for a scenario.

**Supplementary three-step recap**

1. **Translate the stated design** — One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use…
2. **Apply one complete operation** — A two-dimensional array uses two indexes, normally interpreted as row and column.
3. **Trace state and boundaries** — Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of…

**A one-dimensional array is a linear collection:** Array model Same identifier

#### A one-dimensional array is a linear collection

![A one-dimensional array is a linear collection](../web/assets/diagrams/stage10-infographics/stage10-lesson-116-model.jpg)

<details><summary>Text transcript</summary>

- Array model
- Same identifier
- All elements belong to one array name.
- Same type
- At AS level, an array stores elements of the same data type.
- ARRAY[1:5] OF INTEGER
- Indexed access
- An index selects one element.
- Scores[3]
- Scores[Index]

</details>

#### Rows and columns create coordinates

![Rows and columns create coordinates](../web/assets/diagrams/stage10-infographics/stage10-lesson-117-model.jpg)

<details><summary>Text transcript</summary>

- 2D model
- Same identifier
- The whole grid has one array name.
- Two indexes
- The first index usually selects the row; the second index selects the column.
- Marks[Row, Column]
- Same type
- Each cell stores the same data type.
- ARRAY[1:3, 1:4] OF INTEGER

</details>

<details><summary>Precise syllabus wording</summary>

Select one- or two-dimensional arrays for a scenario.

Select a suitable one-dimensional (1D) or two-dimensional (2D) array for a given task. One index suits a linear collection; two indexes suit data with a genuine row-column or equivalent two-coordinate relationship.

</details>

### 2. Pseudocode using one- and two-dimensional arrays: Selecting and using one-dimensional arrays (S10.05)

**Atomic learning targets**

- **S10.05.A01:** pseudocode
- **S10.05.A02:** one-dimensional / 1D
- **S10.05.A03:** two-dimensional / 2D
- **S10.05.A04:** ARRAY

**Core explanation**

- One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds. The number of elements is upper bound - lower bound + 1.
- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.

**Mechanism or method**

1. **Set up the required data and conditions** — One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds.
2. **Carry out the complete method** — The number of elements is upper bound - lower bound + 1.
3. **Trace or test the result** — Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.

#### Worked example: Pseudocode using one- and two-dimensional arrays: Selecting and using one-dimensional arrays: complete worked route

1. **Set up the required data and conditions**

One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds.

2. **Carry out the complete method**

The number of elements is upper bound - lower bound + 1.

3. **Trace or test the result**

Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.

4. **Complete example**

Choose and declare the dimension: Twenty daily temperatures need one position per day, so DECLARE Temperature : ARRAY[1:20] OF REAL is suitable and valid indexes are 1 to 20. Marks for 30 students in 4 tests need row and column positions, so a 2D array is suitable instead.

**Misconceptions to correct**

- Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

#### Mastery check (MC-L058-S10.05)

Complete a fresh example that demonstrates every target: pseudocode; one-dimensional / 1D; two-dimensional / 2D; ARRAY. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds. The number of elements is upper bound - lower bound + 1.
- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.

</details>

**Supplementary concept map**

- **ARRAY:** Pseudocode using one- and two-dimensional arrays.
- **pseudocode:** One-dimensional array pseudocode must declare explicit bounds and…
- **1D:** Select a suitable one-dimensional (1D) or two-dimensional (2D)…
- **2D:** Cambridge pseudocode for 1D and 2D arrays
- **dimensional:** A two-dimensional array uses two indexes, normally interpreted…

**Supplementary three-step recap**

1. **Translate the stated design** — Pseudocode using one- and two-dimensional arrays.
2. **Apply one complete operation** — One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use…
3. **Trace state and boundaries** — Cambridge pseudocode for 1D and 2D arrays

**Cambridge bounds and Java indexes are not the…:** Pseudocode vs Java Cambridge-style pseudocode

#### Cambridge bounds and Java indexes are not the same habit

![Cambridge bounds and Java indexes are not the same habit](../web/assets/diagrams/stage10-infographics/stage10-lesson-116-pseudocode.jpg)

<details><summary>Text transcript</summary>

- Pseudocode vs Java
- Cambridge-style pseudocode
- DECLARE Scores : ARRAY[1:5] OF INTEGER
- FOR Index <- 1 TO 5
- INPUT Scores[Index]
- NEXT Index
- Java support only
- int[] scores = new int[5];
- for (int index = 0; index < 5; index++) {
- scores[index] = input.nextInt();
- Paper 2 reminder: Cambridge pseudocode may use bounds such as ARRAY[1:5] . Do not import Java's zero-based indexing unless the question states it.

</details>

#### Do not import Java indexing into Cambridge answers

![Do not import Java indexing into Cambridge answers](../web/assets/diagrams/stage10-infographics/stage10-lesson-117-pseudocode.jpg)

<details><summary>Text transcript</summary>

- Traverse a 3 by 4 array with nested loops.
- Output the current cell inside the inner loop.
- A corresponding Java support version must also output every current cell.
- The two versions use explicitly stated indexing conventions.

</details>

<details><summary>Precise syllabus wording</summary>

Write pseudocode using one- and two-dimensional arrays.

Write Cambridge pseudocode for 1D and 2D arrays: declare explicit inclusive bounds and an element type, use the required number of indexes, and traverse only valid positions.

</details>

### Lesson technical reference

- Select a suitable one-dimensional (1D) or two-dimensional (2D) array for a given task. One index suits a linear collection; two indexes suit data with a genuine row-column or equivalent two-coordinate relationship.
- Write Cambridge pseudocode for 1D and 2D arrays: declare explicit inclusive bounds and an element type, use the required number of indexes, and traverse only valid positions.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds. The number of elements is upper bound - lower bound + 1.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.
- Select 2D when the scenario has two independent position dimensions, such as Student and Test, Row and Column, or Day and Period. A simple list, sequence or one category of positions remains 1D even when it contains many elements.
- Two-dimensional pseudocode declares both ranges, accesses one cell as Marks[Student, Test] and normally uses nested loops: one loop traverses rows and the inner loop traverses every column for the current row.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - write - 6 marks

Write Cambridge pseudocode to declare a 5 by 7 REAL temperature table and calculate the total of every cell.

**Answer:** declares ARRAY[1:5, 1:7] OF REAL or equivalent explicit five-by-seven bounds; initialises Total; outer loop covers all five rows; inner loop covers all seven columns; adds Temperature[Row, Column] inside the inner loop; closes both loops and outputs Total after traversal

**Marking guidance:** Do not reverse the declared bounds in the traversal or access a 2D cell with only one index.

**Common error:** For the command word write, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why is a seating grid normally 2D?

**Answer:** Each seat is identified by two independent positions: row and column.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

How many cells are in ARRAY[1:3, 1:4]?

**Answer:** 12 cells because 3 row indexes are paired with 4 column indexes.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/S/25 Q6(b) | 8 | complete | recall |
| 9618/21/W/25 Q4(a) | 6 | complete | recall |
| 9618/22/W/25 Q8(b) | 5 | complete | write |
| 9618/21/W/25 Q3(a)(i) | 4 | define | write |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S10.04: explain one-dimensional / 1D, two-dimensional / 2D, select / suitable.
- S10.04 method: Extract the constraints from the scenario → Match mechanisms to those constraints → Link the choice to a consequence.
- S10.05: explain pseudocode, one-dimensional / 1D, two-dimensional / 2D, ARRAY.
- S10.05 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For selecting and using one-dimensional arrays, use the exact technical term before applying it to the scenario.
