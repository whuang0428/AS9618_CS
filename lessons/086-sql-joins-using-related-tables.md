# Lesson 086: SQL joins using related tables

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the SQL clauses relevant to **SQL joins using related tables**.
2. Construct a query that returns or changes only the required data.
3. Identify and correct a syntax or logic error in a given statement.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Focus question: Which feature distinguishes **SQL joins using related tables** from the most closely related syllabus concept?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL joins using related tables, stress order of thinking over memorising line order. Test the query against two rows.

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
**Problem:** Write an SQL query to show `StudentName` and `DueDate` for current loans using `Student` and `Loan` tables.

**Worked answer / marking focus:** `SELECT Student.StudentName, Loan.DueDate FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID;` Credit the two requested fields, explicit `INNER JOIN`, and the matching-key condition after `ON`.



## Student Task
Students draw the join path first, then write the SQL. They must circle the foreign keys before writing `SELECT`.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **SQL joins using related tables**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Two-table INNER JOIN queries

### Direct explanation

- AS DML questions use at most two tables. Write an explicit INNER JOIN between those tables and place the matching key condition after ON; use table-qualified field names where the same field name could be ambiguous.
- For Student(StudentID, StudentName) and Loan(StudentID, DueDate), SELECT Student.StudentName FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID returns names only where matching rows exist. Add WHERE for a further row condition, not for the join relationship itself.

### Worked example

**List overdue borrowers:** SELECT Student.StudentName FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID WHERE Loan.DueDate < '2027-05-01'; uses two tables, one explicit join condition and one separate filter.

### Targeted practice and answers

1. Which clause states how two joined tables match?
   **Answer:** ON.
2. How many tables are required at most in the AS syllabus query?
   **Answer:** Two.
3. Why qualify Student.StudentID and Loan.StudentID?
   **Answer:** To identify which table supplies each otherwise identical field name.

### Exam-style question and MS

**Question (4 marks):** Write an INNER JOIN query listing DepartmentName and EmployeeName from Department and Employee, matching their DepartmentID fields.

- **B1** SELECT includes DepartmentName and EmployeeName
- **B1** FROM Department
- **B1** INNER JOIN Employee
- **B1** ON Department.DepartmentID = Employee.DepartmentID

**Strict note:** Do not use a three-table query or replace the required INNER JOIN with comma-style FROM and a WHERE join.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Table-qualified names and aliases prevent ambiguity

- **Explains:** `aliases`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-aliases.jpg`

1. If two tables have a field with the same name, write the table name or alias before the field.
2. Full name Student.StudentID clearly means the field from Student.
3. Alias Student AS S lets you write S.StudentID .
4. Exam caution Only use aliases if they make the query clear. Do not hide the join logic.

### Two-table INNER JOIN with ON

- **Explains:** `join`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-join.jpg`

1. AS DML questions use at most two tables.
2. SELECT Student.StudentName FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID uses an explicit two-table join.
3. ON states the matching key relationship between the tables.
4. WHERE adds a separate row filter after the join; it does not replace the required INNER JOIN syntax.

### Related tables use primary keys and foreign keys

- **Explains:** `relationships`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-relationships.jpg`

1. A join combines rows when matching key fields refer to the same real-world item.
2. StudentID primary key
3. StudentName , TutorGroup
4. 1 to many
5. StudentID
6. LoanID primary key
7. StudentID , BookID foreign keys
8. many to 1
9. BookID primary key
10. Title , Category
<!-- stage10-explanations:end -->
