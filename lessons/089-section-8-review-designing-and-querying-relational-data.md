# Lesson 089: Section 8 required-content checkpoint

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Section 8 required-content checkpoint

### Direct explanation

- Database design review: connect each file-based limitation to a relational or DBMS mechanism; use entity/table, record/tuple and field/attribute precisely; distinguish candidate, primary, secondary and foreign keys; classify one-to-one, one-to-many and many-to-many relationships; apply referential integrity and indexing; document the design with an E-R diagram; and explain or produce 1NF, 2NF and 3NF designs.
- DBMS and SQL review: identify data management/data dictionary, data modelling, logical schema, integrity, security/backup/access rights, developer interface and query processor. Distinguish DDL structure commands from DML query/maintenance commands, use every required data type and key clause, and keep SELECT queries to at most two tables with explicit INNER JOIN ... ON when two tables are needed.
- A complete answer follows the scenario through design, statement and result. It does not claim that a primary key prevents every duplicate fact, that a secondary key must be unique, that normalisation guarantees correctness, or that a three-table/comma-style query is within the AS core boundary.

### Worked example

**Design and query a library database:** Separate Student and Loan tables, identify StudentID as primary key in Student and foreign key in Loan, state the one-to-many relationship and referential-integrity rule, then write SELECT Student.StudentName, Loan.DueDate FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID WHERE Loan.Returned = FALSE; using exactly two tables.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which key may retrieve several records sharing a value?
   **Answer:** A secondary key; it need not be unique.
2. Which normal form removes partial dependency on part of a composite key?
   **Answer:** Second Normal Form (2NF).
3. Which two DBMS tools are named separately in the syllabus?
   **Answer:** Developer interface and query processor.
4. Which SQL language category changes table structure?
   **Answer:** DDL.
5. What is the AS table-count boundary for a DML query?
   **Answer:** At most two tables.

### Exam-style question and MS

**Question (7 marks):** A school currently repeats student details in a loan file. Propose a relational design and write a two-table query listing StudentName and DueDate for unreturned loans.

| Answer | Guidance | Marks |
|---|---|---:|
| identifies redundancy/inconsistency in the repeated file | Do not accept a three-table query, comma-style join, unexplained table split or unsupported claim that normalisation alone validates every value. | 1 |
| separates Student and Loan with suitable primary keys |  | 1 |
| uses StudentID as a foreign key in Loan and preserves referential integrity |  | 1 |
| SELECT contains StudentName and DueDate |  | 1 |
| uses Student INNER JOIN Loan |  | 1 |
| ON matches Student.StudentID to Loan.StudentID |  | 1 |
| WHERE Loan.Returned = FALSE |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** stage review
## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Section 8 review: designing and querying relational data**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Section 8 review: designing and querying relational data** from the most closely related syllabus concept?

## Guided Explanation
Use Section 8 review: designing and querying relational data to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.

## Student Task
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Section 8 review: designing and querying relational data**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Relational design: what earns marks?

- **Explains:** `design`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-design.jpg`

1. Design review
2. Primary key Uniquely identifies a record in one table. It must be unique and reliable.
3. Foreign key Stores a value that matches a primary key in another table, creating a relationship.
4. Normalisation Separates repeated data into related tables to reduce duplication and update errors.

### Section 8 knowledge map

- **Explains:** `map`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-map.jpg`

1. Retrieval map
2. Data and DBMS data vs information; DBMS roles; avoiding flat-file limitations
3. Tables and keys records, fields, data types, constraints, primary keys and foreign keys
4. Design entity-relationship modelling and normalisation to reduce duplication
5. SQL retrieval SELECT , FROM , WHERE , ORDER BY , aggregates and joins
6. SQL modification INSERT , UPDATE , DELETE , field/value matching and safe WHERE
7. Protection validation, verification, security controls, backups and restore testing

### Do not swap the security vocabulary

- **Explains:** `protection`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-protection.jpg`

1. Protection review
2. Validation Checks data follows rules, such as range, type, format or presence.
3. Verification Checks entered data matches a source, using proofreading or double entry.
4. Security and backup Security restricts access; backup enables recovery after loss or corruption.

### SQL clauses: choose the clause that matches the request

- **Explains:** `sql`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-sql.jpg`

1. For the clauses shown, written syntax order is SELECT, FROM, WHERE, GROUP BY, ORDER BY.
2. A simplified logical processing order is FROM, WHERE, GROUP BY, SELECT, ORDER BY.
3. GROUP BY forms groups and ORDER BY sorts the final rows.
4. Written syntax order and logical processing order are different.

### Trace one mixed SQL result

- **Explains:** `tracer`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-tracer.jpg`

1. Interactive SQL tracer
2. Category
3. Networks
4. Computing
5. Literature
6. Databases
7. Choose a query to see the result.
<!-- stage10-explanations:end -->
