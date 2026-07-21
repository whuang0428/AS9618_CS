# Lesson 081: Primary keys, foreign keys, and relationships

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Primary keys, foreign keys, and relationships** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Lesson-specific focus question: What would go wrong if a student confused **Primary keys, foreign keys, and relationships** with a neighbouring syllabus idea?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Primary keys, foreign keys, and relationships, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

Topic-specific teaching move: keep the explanation anchored to **Primary keys, foreign keys, and relationships**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: messy flat data. Middle: table/entity design. Right: key or relationship rule.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** For `Student(StudentID, Name, TutorGroup)` and `Loan(LoanID, StudentID, BookID, DateBorrowed)`, identify primary and foreign keys. The worked example must explicitly use **Primary keys, foreign keys, and relationships**, not a generic example from the wider unit.

**Worked answer / marking focus:** `StudentID` is primary key in Student; `LoanID` is primary key in Loan; `StudentID` in Loan is a foreign key referencing Student.



## Student Task
Students design a two-table system for sports equipment loans and label each key. Their final answer must include the phrase **Primary keys, foreign keys, and relationships** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Primary keys, foreign keys, and relationships**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Primary keys, foreign keys, and relationships** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Primary keys, foreign keys, and relationships** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record. For this lesson, make students contrast that mistake with the exact idea of **primary keys, foreign keys, and relationships**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S8.02
**Focus:** Foreign keys and referential integrity

### Direct explanation

- A foreign key is an attribute in one table that refers to a primary/candidate key in another table. Referential integrity requires every non-null foreign-key value to match an existing referenced key.
- The rule prevents orphan records. Insert, update and delete operations may be rejected or handled by an explicit cascade/null policy; the DBMS must not silently leave an invalid reference.

### Worked example

**Delete a department:** If Employee.DepartmentID refers to Department.DepartmentID, deleting a department with employees would break referential integrity unless deletion is rejected or an authorised cascading policy handles dependent rows.

### Targeted practice and answers

1. Where is the referenced key stored?
   **Answer:** In the parent/referenced table.
2. What is an orphan record?
   **Answer:** A child record whose foreign key has no matching parent key.
3. Name one valid delete response.
   **Answer:** Reject the delete, cascade it, or set nullable foreign keys to null according to defined rules.

### Exam-style question and MS

**Question (4 marks):** Explain how a foreign key and referential integrity maintain a relationship between two tables.

- **B1** foreign key is stored in the related/child table
- **B1** references a key in the parent table
- **B1** each foreign-key value must match an existing referenced value (or valid null)
- **B1** prevents orphan/inconsistent relationships

**Strict note:** Do not accept that foreign-key values must be unique in the child table.
