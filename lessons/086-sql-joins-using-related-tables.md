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
**Problem:** Write an SQL query to show `StudentName` and `BookTitle` for current loans using `Student`, `Loan` and `Book` tables.

**Worked answer / marking focus:** Credit a valid join path such as `Student.StudentID = Loan.StudentID` and `Loan.BookID = Book.BookID`, plus only the requested fields in SELECT.



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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Table-qualified names and aliases prevent ambiguity

- **Explains:** `aliases`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-aliases.jpg`

1. If two tables have a field with the same name, write the table name or alias before the field.
2. Full name Student.StudentID clearly means the field from Student.
3. Alias Student AS S lets you write S.StudentID .
4. Exam caution Only use aliases if they make the query clear. Do not hide the join logic.

### Join conditions say which fields match

- **Explains:** `join`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-086-join.jpg`

1. For this lesson, use explicit join conditions. The key idea is not the exact SQL flavour; it is the matching relationship.
2. Three-table pattern:
3. FROM Student, Loan, Book WHERE Student.StudentID = Loan.StudentID AND Loan.BookID = Book.BookID
4. Correct match Student.StudentID = Loan.StudentID because both values identify the same student.
5. Correct match Loan.BookID = Book.BookID because both values identify the same book.
6. Extra filter Use another AND condition for a filter, such as Loan.Returned = FALSE .

### Related tables use primary keys and foreign keys

- **Explains:** `relationships`
- **Explanation type:** mechanism
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
