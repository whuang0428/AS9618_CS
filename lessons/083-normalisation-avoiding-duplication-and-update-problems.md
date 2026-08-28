# Lesson 083: DDL, DML and SQL roles

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** DDL, DML and SQL roles

### Direct explanation

- DDL is used for the creation and modification of database structure. DML is used for queries and maintenance of stored data. SQL is an industry-standard language that includes both kinds of operation.
- Keep the schema and the records distinct: defining a table or constraint changes structure, while selecting, inserting, deleting or updating records works with stored data.

### Worked example

**Classify database operations:** CREATE TABLE is DDL because it creates database structure. SELECT and UPDATE are DML because they query or maintain stored data.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which language category creates structure?
   **Answer:** DDL.
2. Which category queries and maintains data?
   **Answer:** DML.
3. What is SQL?
   **Answer:** An industry-standard database language.

### Exam-style question and MS

**Question (3 marks):** Identify CREATE TABLE, SELECT and UPDATE as DDL or DML and explain the distinction.

| Answer | Guidance | Marks |
|---|---|---:|
| DDL creation/modification of structure | Do not describe every SQL statement as changing stored records. | 1 |
| DML queries/maintenance |  | 1 |
| SQL identified as industry-standard language |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and apply the database concepts involved in **Normalisation: avoiding duplication and update problems**.
2. Use precise relational terminology when describing data and relationships.
3. Identify and correct an unsuitable database design or explanation.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Focus question: Which feature distinguishes **Normalisation: avoiding duplication and update problems** from the most closely related syllabus concept?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Normalisation: avoiding duplication and update problems, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: messy flat data. Middle: table/entity design. Right: key or relationship rule.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Design two related tables for students borrowing library books and identify suitable primary and foreign keys.

**Worked answer / marking focus:** A strong answer separates Student and Loan/Book data, gives each table a primary key, and uses a foreign key to link records.

## Student Task
Pairs convert a messy club list into relational tables, then mark one field as a primary key and one as a foreign key.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Normalisation: avoiding duplication and update problems**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why one structure causes three anomalies

- **Explains:** `anomalies`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-anomalies.jpg`

1. Insertion may require an unrelated fact that is not yet known.
2. Updating requires finding every repeated copy.
3. Deleting one event may accidentally remove the only descriptive fact.
- **Analogy:** A form that mixes customers, products and orders ties unrelated lifetimes together.
- **Boundary:** The anomaly comes from dependency structure, not simply from a large table.

### How normal forms remove dependency problems

- **Explains:** `normal-forms`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-normal-forms.jpg`

1. First Normal Form (1NF) requires atomic values and no repeating groups.
2. Second Normal Form (2NF) is in 1NF and removes partial dependency: each non-key attribute depends on the whole primary key.
3. Third Normal Form (3NF) is in 2NF and removes transitive dependency: a non-key attribute must not depend on another non-key attribute.
4. A valid decomposition retains every original fact, preserves keys and relationships, and follows the stated functional dependencies.
- **Analogy:** Each dependency belongs in the relation whose key determines it.
- **Boundary:** Check the forms in order; satisfying a later normal form assumes the earlier requirements are already met.

### Why normalisation protects consistency

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-purpose.jpg`

1. Each fact is stored in a relation where its determinant is clear.
2. Other tables reference that fact instead of copying it repeatedly.
3. One update then changes the authoritative value once.
- **Analogy:** Keep one catalogue record and let many loans point to it.
- **Boundary:** Normalisation improves consistency but joins may make some queries more complex.

### How repeated facts become risky

- **Explains:** `redundancy`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-redundancy.jpg`

1. The same real-world fact appears in several rows.
2. A later update may change only some copies.
3. Queries then return conflicting versions of one fact.
- **Analogy:** Several photocopies agree only until someone edits one copy.
- **Boundary:** Repeated transactional events are valid; repeated descriptive facts cause the risk.
<!-- stage10-explanations:end -->
