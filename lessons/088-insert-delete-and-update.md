# Lesson 088: INSERT, DELETE and UPDATE

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** INSERT, DELETE and UPDATE

### Direct explanation

- INSERT adds a new row, DELETE removes matching rows, and UPDATE changes values in matching rows. These DML statements maintain stored data.
- Use a WHERE condition for DELETE and UPDATE when only specified rows should change. Check field order, value types and conditions against the supplied schema.

### Worked example

**Maintain one student row:** INSERT adds StudentID 104. UPDATE changes only that row when WHERE StudentID = 104 is used. DELETE removes it with the same key condition.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which statement adds a row?
   **Answer:** INSERT.
2. Which statement removes rows?
   **Answer:** DELETE.
3. Which statement changes existing values?
   **Answer:** UPDATE.

### Exam-style question and MS

**Question (3 marks):** Write INSERT, UPDATE and DELETE statements for StudentID 104.

| Answer | Guidance | Marks |
|---|---|---:|
| valid INSERT | Do not credit an UPDATE or DELETE that unintentionally affects every row. | 1 |
| valid UPDATE with condition |  | 1 |
| valid DELETE with condition |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the SQL clauses relevant to **SQL INSERT, UPDATE, and DELETE**.
2. Construct a query that returns or changes only the required data.
3. Identify and correct a syntax or logic error in a given statement.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Focus question: Which feature distinguishes **SQL INSERT, UPDATE, and DELETE** from the most closely related syllabus concept?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL INSERT, UPDATE, and DELETE, stress order of thinking over memorising line order. Test the query against two rows.

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
- Answer one 4-mark question about **SQL INSERT, UPDATE, and DELETE**. Follow its command word and apply each point to the stated context.

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

### DELETE FROM removes records

- **Explains:** `delete`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-088-delete.jpg`

1. Use DELETE only when the whole record should be removed. A missing condition can remove all records.
2. Pattern:
3. DELETE FROM Student WHERE StudentID = 'S03';
4. Exam caution: DELETE FROM Student; has no WHERE , so it targets every record in the table.

### INSERT INTO adds a record

- **Explains:** `insert`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-088-insert.jpg`

1. List the fields, then list matching values in the same order. Text values use quotes.
2. Pattern:
3. INSERT INTO Student (StudentID, StudentName, TutorGroup) VALUES ('S04', 'Nina', '12C');

### UPDATE changes existing records

- **Explains:** `update`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-088-update.jpg`

1. SET names the field and new value. WHERE restricts which rows are changed.
2. Pattern:
3. UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';
4. Table UPDATE Student chooses the table.
5. New value SET TutorGroup = '12C' changes the field.
6. Target rows WHERE StudentID = 'S01' prevents changing every student.
<!-- stage10-explanations:end -->
