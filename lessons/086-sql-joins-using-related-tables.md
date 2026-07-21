# Lesson 086: SQL joins using related tables

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 8  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **SQL joins using related tables** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Lesson-specific focus question: What would go wrong if a student confused **SQL joins using related tables** with a neighbouring syllabus idea?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL joins using related tables, stress order of thinking over memorising line order. Test the query against two rows.

Topic-specific teaching move: keep the explanation anchored to **SQL joins using related tables**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write an SQL query to show `StudentName` and `BookTitle` for current loans using `Student`, `Loan` and `Book` tables. The worked example must explicitly use **SQL joins using related tables**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit a valid join path such as `Student.StudentID = Loan.StudentID` and `Loan.BookID = Book.BookID`, plus only the requested fields in SELECT.



## Student Task
Students draw the join path first, then write the SQL. They must circle the foreign keys before writing `SELECT`. Their final answer must include the phrase **SQL joins using related tables** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **SQL joins using related tables**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **SQL joins using related tables** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **SQL joins using related tables** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required. For this lesson, make students contrast that mistake with the exact idea of **sql joins using related tables**.  
Correction prompt: "Show the mechanism, not just the label."
