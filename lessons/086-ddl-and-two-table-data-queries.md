# Lesson 086: DDL and two-table data queries

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** DDL and two-table data queries

### Direct explanation

- Required DDL includes CREATE DATABASE, CREATE TABLE and ALTER TABLE. Field types include CHARACTER, VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME.
- A PRIMARY KEY uniquely identifies a row. A FOREIGN KEY with REFERENCES links a field to a key in another table and supports referential integrity.
- AS DML questions use at most two tables. Write an explicit INNER JOIN between those tables and place the matching key condition after ON; use table-qualified field names where the same field name could be ambiguous.
- For Student(StudentID, StudentName) and Loan(StudentID, DueDate), SELECT Student.StudentName FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID returns names only where matching rows exist. Add WHERE for a further row condition, not for the join relationship itself.
- A query uses SELECT fields FROM a table, may filter rows with WHERE, sort with ORDER BY and form aggregate groups with GROUP BY. SUM totals values, COUNT counts rows or values, and AVG calculates a mean. An INNER JOIN uses ON to match at most two tables in the required AS queries.

### Worked example

**Define two related tables / List overdue borrowers:** CREATE DATABASE College; then CREATE TABLE Department and CREATE TABLE Student. Student uses INTEGER for StudentID, VARCHAR for Name, DATE for DateOfBirth, BOOLEAN for Active and a DepartmentID foreign key REFERENCES Department(DepartmentID). ALTER TABLE can modify the structure later. SELECT Student.StudentName FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID WHERE Loan.DueDate < '2027-05-01'; uses two tables, one explicit join condition and one separate filter.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Identify four required SQL field types.
   **Answer:** Any four of CHARACTER, VARCHAR, BOOLEAN, INTEGER, REAL, DATE and TIME.
2. Which clause declares the referenced table?
   **Answer:** REFERENCES.
3. Which clause states how two joined tables match?
   **Answer:** ON.
4. How many tables are required at most in the AS syllabus query?
   **Answer:** Two.
5. Why qualify Student.StudentID and Loan.StudentID?
   **Answer:** To identify which table supplies each otherwise identical field name.

### Exam-style question and MS

**Question (8 marks):** Write DDL to create a Student table with suitable data types, a primary key and one foreign key. Write an INNER JOIN query listing DepartmentName and EmployeeName from Department and Employee, matching their DepartmentID fields.

| Answer | Guidance | Marks |
|---|---|---:|
| CREATE TABLE and named fields | Do not award DML statements for a schema-definition task. Do not use a three-table query or replace the required INNER JOIN with comma-style FROM and a WHERE join. | 1 |
| suitable required data types |  | 1 |
| PRIMARY KEY |  | 1 |
| FOREIGN KEY with REFERENCES |  | 1 |
| SELECT includes DepartmentName and EmployeeName |  | 1 |
| FROM Department |  | 1 |
| INNER JOIN Employee |  | 1 |
| ON Department.DepartmentID = Employee.DepartmentID |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the SQL clauses relevant to **SQL ORDER BY, aggregate functions, and GROUP BY**.
2. Construct a query that returns or changes only the required data.
3. Identify and correct a syntax or logic error in a given statement.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Focus question: Which feature distinguishes **SQL ORDER BY, aggregate functions, and GROUP BY** from the most closely related syllabus concept?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL ORDER BY, aggregate functions, and GROUP BY, stress order of thinking over memorising line order. Test the query against two rows.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: English request. Middle: SQL clauses. Right: expected result rows.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write a query to return selected fields from a table using a condition, ordering, aggregate or join as appropriate.

**Worked answer / marking focus:** Credit correct SELECT fields, FROM table, WHERE/JOIN condition and any ORDER BY or aggregate clause required by the question.

## Student Task
Students write three natural-language questions for a database, then swap and write SQL for another pair's questions.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **SQL ORDER BY, aggregate functions, and GROUP BY**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Aggregate functions calculate one summary value

- **Explains:** `aggregates`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-aggregates.jpg`

1. COUNT(*) counts all rows in the result, including rows containing null values.
2. COUNT(column) counts only non-null values in the named column.
3. SUM, AVG and COUNT operate on the rows remaining after filtering and grouping rules are applied.

### GROUP BY calculates summaries per group

- **Explains:** `groupby`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-groupby.jpg`

1. Use GROUP BY when the question asks for a summary for each category, each borrower, each course or each group.
2. Pattern:
3. SELECT Category, COUNT(*) FROM Book GROUP BY Category;

### Two-table INNER JOIN with ON

- **Explains:** `join`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-087-join.jpg`

1. AS DML questions use at most two tables.
2. SELECT Student.StudentName FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID uses an explicit two-table join.
3. ON states the matching key relationship between the tables.
4. WHERE adds a separate row filter after the join; it does not replace the required INNER JOIN syntax.

### ORDER BY sorts output rows

- **Explains:** `orderby`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-orderby.jpg`

1. ORDER BY controls the order of the result rows. ASC means ascending; DESC means descending.
2. Ascending ORDER BY Price ASC : low to high, A to Z, oldest to newest.
3. Descending ORDER BY Price DESC : high to low, Z to A, newest to oldest.
4. Default Many SQL systems default to ascending, but exams may expect explicit ASC if asked.
<!-- stage10-explanations:end -->
