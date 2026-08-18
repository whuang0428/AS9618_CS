# Lesson 084: SQL SELECT, FROM, WHERE

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 8  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **SQL SELECT, FROM, WHERE** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Lesson-specific focus question: What would go wrong if a student confused **SQL SELECT, FROM, WHERE** with a neighbouring syllabus idea?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL SELECT, FROM, WHERE, stress order of thinking over memorising line order. Test the query against two rows.

Topic-specific teaching move: keep the explanation anchored to **SQL SELECT, FROM, WHERE**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a query to return selected fields from a table using a condition, ordering, aggregate or join as appropriate. The worked example must explicitly use **SQL SELECT, FROM, WHERE**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct SELECT fields, FROM table, WHERE/JOIN condition and any ORDER BY or aggregate clause required by the question.



## Student Task
Students write three natural-language questions for a database, then swap and write SQL for another pair's questions. Their final answer must include the phrase **SQL SELECT, FROM, WHERE** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **SQL SELECT, FROM, WHERE**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **SQL SELECT, FROM, WHERE** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **SQL SELECT, FROM, WHERE** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required. For this lesson, make students contrast that mistake with the exact idea of **sql select, from, where**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### The three foundation clauses

- **Explains:** `clauses`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-084-clauses.jpg`

1. SELECT Names the fields to output, such as Title, DueDate .
2. FROM Names the table to use, such as Loan .
3. WHERE Filters records using a condition, such as Returned = FALSE .
4. Thinking order:
5. What fields do I need? Which table contains them? Which records should be included?

### WHERE conditions and comparison operators

- **Explains:** `conditions`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-084-strings.jpg`

1. Text/string Category = 'Fiction' . The text value is quoted.
2. Number Price < 10.00 . Numeric values are not quoted in basic exam SQL.
3. Boolean Returned = FALSE . Use the Boolean value expected by the question/table.
4. Field names Usually not quoted: SELECT Title , not SELECT 'Title' .
<!-- stage10-explanations:end -->
