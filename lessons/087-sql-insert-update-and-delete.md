# Lesson 087: SQL INSERT, UPDATE, and DELETE

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **SQL INSERT, UPDATE, and DELETE** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Lesson-specific focus question: What would go wrong if a student confused **SQL INSERT, UPDATE, and DELETE** with a neighbouring syllabus idea?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL INSERT, UPDATE, and DELETE, stress order of thinking over memorising line order. Test the query against two rows.

Topic-specific teaching move: keep the explanation anchored to **SQL INSERT, UPDATE, and DELETE**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: English request. Middle: SQL clauses. Right: expected result rows.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Write a query to return selected fields from a table using a condition, ordering, aggregate or join as appropriate. The worked example must explicitly use **SQL INSERT, UPDATE, and DELETE**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct SELECT fields, FROM table, WHERE/JOIN condition and any ORDER BY or aggregate clause required by the question.



## Student Task
Students write three natural-language questions for a database, then swap and write SQL for another pair's questions. Their final answer must include the phrase **SQL INSERT, UPDATE, and DELETE** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **SQL INSERT, UPDATE, and DELETE**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **SQL INSERT, UPDATE, and DELETE** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **SQL INSERT, UPDATE, and DELETE** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required. For this lesson, make students contrast that mistake with the exact idea of **sql insert, update, and delete**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S8.07, S8.09
**Focus:** DDL, DML and required SQL data types

### Direct explanation

- DDL defines or changes database structure: CREATE DATABASE, CREATE TABLE and ALTER TABLE. DML queries or changes records: SELECT, INSERT, UPDATE and DELETE. SQL is the industry-standard language used for these operations.
- Required column types include CHARACTER/VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME. CREATE TABLE can declare PRIMARY KEY and FOREIGN KEY references; ALTER TABLE changes an existing definition.

### Worked example

**Create related tables:** CREATE TABLE Department (DepartmentID INTEGER PRIMARY KEY, Name VARCHAR(40)); then CREATE TABLE Employee (EmployeeID INTEGER PRIMARY KEY, Active BOOLEAN, DepartmentID INTEGER, FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID));

### Targeted practice and answers

1. Classify CREATE TABLE as DDL or DML.
   **Answer:** DDL.
2. Choose a type for 12.75.
   **Answer:** REAL.
3. Which statement changes an existing table structure?
   **Answer:** ALTER TABLE.

### Exam-style question and MS

**Question (4 marks):** Write SQL DDL to create Event(EventID integer primary key, EventDate date, StartTime time, Open boolean).

- **B1** CREATE TABLE Event
- **B1** EventID INTEGER PRIMARY KEY
- **B1** EventDate DATE and StartTime TIME
- **B1** Open BOOLEAN with valid punctuation/structure

**Strict note:** Do not award INSERT/UPDATE statements: the question asks for structure, not record data.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### DELETE FROM removes records

- **Explains:** `delete`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-087-delete.jpg`

1. Use DELETE only when the whole record should be removed. A missing condition can remove all records.
2. Pattern:
3. DELETE FROM Student WHERE StudentID = 'S03';
4. Exam caution: DELETE FROM Student; has no WHERE , so it targets every record in the table.

### INSERT, UPDATE and DELETE are data manipulation commands

- **Explains:** `dml`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-087-dml.jpg`

1. They change stored data. In exam answers, be precise about command keywords and affected records.
2. INSERT Adds a new record to a table.
3. UPDATE Changes values in existing records.
4. DELETE Removes existing records from a table.

### INSERT INTO adds a record

- **Explains:** `insert`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-087-insert.jpg`

1. List the fields, then list matching values in the same order. Text values use quotes.
2. Pattern:
3. INSERT INTO Student (StudentID, StudentName, TutorGroup) VALUES ('S04', 'Nina', '12C');

### UPDATE changes existing records

- **Explains:** `update`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-087-update.jpg`

1. SET names the field and new value. WHERE restricts which rows are changed.
2. Pattern:
3. UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';
4. Table UPDATE Student chooses the table.
5. New value SET TutorGroup = '12C' changes the field.
6. Target rows WHERE StudentID = 'S01' prevents changing every student.
<!-- stage10-explanations:end -->
