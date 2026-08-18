# Lesson 085: SQL ORDER BY, aggregate functions, and GROUP BY

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 8  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **SQL ORDER BY, aggregate functions, and GROUP BY** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Show a small table and ask: Can you find all overdue books without scrolling like a detective in a low-budget movie? SQL is the precise question we ask the database.

Lesson-specific focus question: What would go wrong if a student confused **SQL ORDER BY, aggregate functions, and GROUP BY** with a neighbouring syllabus idea?

## Guided Explanation
Begin with the English question, underline the required fields, table and condition, then translate into SQL. For SQL ORDER BY, aggregate functions, and GROUP BY, stress order of thinking over memorising line order. Test the query against two rows.

Topic-specific teaching move: keep the explanation anchored to **SQL ORDER BY, aggregate functions, and GROUP BY**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a query to return selected fields from a table using a condition, ordering, aggregate or join as appropriate. The worked example must explicitly use **SQL ORDER BY, aggregate functions, and GROUP BY**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct SELECT fields, FROM table, WHERE/JOIN condition and any ORDER BY or aggregate clause required by the question.



## Student Task
Students write three natural-language questions for a database, then swap and write SQL for another pair's questions. Their final answer must include the phrase **SQL ORDER BY, aggregate functions, and GROUP BY** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **SQL ORDER BY, aggregate functions, and GROUP BY**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **SQL ORDER BY, aggregate functions, and GROUP BY** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **SQL ORDER BY, aggregate functions, and GROUP BY** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often select every field with `*`. Correction: exam questions usually specify exactly which fields are required. For this lesson, make students contrast that mistake with the exact idea of **sql order by, aggregate functions, and group by**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Aggregate functions calculate one summary value

- **Explains:** `aggregates`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-085-aggregates.jpg`

1. Function
2. Counts records or non-null values
3. SELECT COUNT(*) FROM Book
4. Adds numeric values
5. SELECT SUM(Price) FROM Book
6. Calculates the mean
7. SELECT AVG(Price) FROM Book
8. MIN , MAX
9. Finds smallest or largest value
10. SELECT MAX(Price) FROM Book

### GROUP BY calculates summaries per group

- **Explains:** `groupby`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-085-groupby.jpg`

1. Use GROUP BY when the question asks for a summary for each category, each borrower, each course or each group.
2. Pattern:
3. SELECT Category, COUNT(*) FROM Book GROUP BY Category;

### ORDER BY sorts output rows

- **Explains:** `orderby`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-085-orderby.jpg`

1. ORDER BY controls the order of the result rows. ASC means ascending; DESC means descending.
2. Ascending ORDER BY Price ASC : low to high, A to Z, oldest to newest.
3. Descending ORDER BY Price DESC : high to low, Z to A, newest to oldest.
4. Default Many SQL systems default to ascending, but exams may expect explicit ASC if asked.
<!-- stage10-explanations:end -->
