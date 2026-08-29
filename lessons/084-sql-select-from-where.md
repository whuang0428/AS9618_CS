# Lesson 084: SQL SELECT, FROM, WHERE

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Read and write SQL statements by their semantics

### Direct explanation

- Structured Query Language (SQL) is the industry-standard language used by a DBMS for DDL and DML. To understand a statement, read each clause by its effect: SELECT chooses output fields, FROM identifies the source table, and WHERE filters records using a condition. Keywords, field names, table names, operators, literal values and punctuation have different roles.
- A valid answer must preserve the requested semantics, not merely contain familiar keywords. Text and date values are normally quoted in this course's standard SQL style; numeric and Boolean values are not quoted. Clause order, comparison operators and requested output fields determine which records and columns appear.

### Worked example

**Interpret a query:** SELECT Title, DueDate FROM Loan WHERE Returned = FALSE; reads records from Loan, keeps only records whose Returned field is false, and outputs Title and DueDate. It does not update the table and it does not output every field.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What does SELECT control?
   **Answer:** The fields or expressions shown in the result.
2. What does FROM control?
   **Answer:** The table supplying the records.
3. What does WHERE control?
   **Answer:** Which records satisfy the filter condition.
4. Why is SELECT * not equivalent to SELECT Title?
   **Answer:** The asterisk outputs all fields; SELECT Title outputs only the requested field.

### Exam-style question and MS

**Question (5 marks):** Explain the effect of SELECT StudentID, Name FROM Student WHERE TutorGroup = '12A'; and identify one change that would alter its result.

| Answer | Guidance | Marks |
|---|---|---:|
| reads records from Student | Do not award a clause-name list unless its effect on this statement is explained. | 1 |
| filters to TutorGroup 12A |  | 1 |
| outputs StudentID and Name only |  | 1 |
| identifies a valid semantic change such as field list, condition, operator or literal |  | 1 |
| explains how the named change alters rows or columns returned |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the SQL clauses relevant to **SQL SELECT, FROM, WHERE**.
2. Construct a query that returns or changes only the required data.
3. Identify and correct a syntax or logic error in a given statement.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Focus question: Which feature distinguishes **SQL SELECT, FROM, WHERE** from the most closely related syllabus concept?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL SELECT, FROM, WHERE, stress order of thinking over memorising line order. Test the query against two rows.

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
- Answer one 4-mark question about **SQL SELECT, FROM, WHERE**. Follow its command word and apply each point to the stated context.

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

### The three foundation clauses

- **Explains:** `clauses`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-084-clauses.jpg`

1. SELECT Names the fields to output, such as Title, DueDate .
2. FROM Names the table to use, such as Loan .
3. WHERE Filters records using a condition, such as Returned = FALSE .
4. Thinking order:
5. What fields do I need? Which table contains them? Which records should be included?

### WHERE conditions and comparison operators

- **Explains:** `conditions`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-084-conditions.jpg`

1. A WHERE clause tests each record and returns only records where the condition is true.
2. Operator
3. equal to
4. Category = 'Fiction'
5. not equal to
6. Status <> 'Returned'
7. greater than, less than
8. Price < 10.00
9. greater/less than or equal to
10. ExamMark >= 80

### Text values need quotes; numbers usually do not

- **Explains:** `strings`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-084-strings.jpg`

1. Text/string Category = 'Fiction' . The text value is quoted.
2. Number Price < 10.00 . Numeric values are not quoted in basic exam SQL.
3. Boolean Returned = FALSE . Use the Boolean value expected by the question/table.
4. Field names Usually not quoted: SELECT Title , not SELECT 'Title' .
<!-- stage10-explanations:end -->
