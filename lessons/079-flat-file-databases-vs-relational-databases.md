# Lesson 079: Flat-file databases vs relational databases

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** File-based limitations and relational solutions

### Direct explanation

- A file-based approach stores data in separate application files. The same fact may be repeated in several files or records, causing redundancy and wasted storage. Updating only some copies creates inconsistency; insertion and deletion can also lose or require unrelated facts. Separate files may use incompatible formats, isolate data, duplicate validation/security code and make shared querying, concurrent access, backup and recovery harder to manage.
- A relational database addresses these limitations by separating entities into linked tables, storing shared facts once, identifying records with keys and enforcing relationships and constraints centrally. A DBMS supplies shared query processing, integrity, security, access rights and backup. These mechanisms reduce particular file-based risks; a relational design is not automatically smaller, simpler or error-free.
- Relational databases address file-based duplication, inconsistency, isolation and access problems through related tables, keys, constraints and managed queries.

### Worked example

**Replace a repeated order file:** A flat Order file repeats CustomerName and Address in every order row. Split it into Customer(CustomerID, CustomerName, Address) and Order(OrderID, CustomerID, OrderDate). CustomerID links each order to one stored customer, so an address is updated once instead of in every order row.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why can repeated data create inconsistency?
   **Answer:** One copy may be changed while another remains out of date.
2. What is data isolation in a file-based system?
   **Answer:** Related data is kept in separate files or formats, making combined access and queries difficult.
3. Which relational feature connects an order to its customer?
   **Answer:** A foreign key in Order referring to the Customer primary key.
4. Why is 'relational databases are always simpler' not a valid benefit?
   **Answer:** Linked tables and DBMS administration add complexity; benefits must be tied to a file-based limitation.

### Exam-style question and MS

**Question (6 marks):** A clinic repeats patient details in separate appointment, billing and treatment files. Explain three file-based limitations and a relational-database feature that addresses each one.

| Answer | Guidance | Marks |
|---|---|---:|
| repeated patient facts cause redundancy or wasted storage | Do not award a generic claim such as 'relational is better' without a named limitation, mechanism and consequence. | 1 |
| linked tables store a shared patient fact once |  | 1 |
| separate copies can become inconsistent after partial updates |  | 1 |
| central keys/constraints and one stored fact improve consistency |  | 1 |
| isolated files/formats make combined retrieval or control difficult |  | 1 |
| DBMS query, integrity, access-right or backup service addresses the named difficulty |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and apply the database concepts involved in **Flat-file databases vs relational databases**.
2. Use precise relational terminology when describing data and relationships.
3. Identify and correct an unsuitable database design or explanation.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Focus question: Which feature distinguishes **Flat-file databases vs relational databases** from the most closely related syllabus concept?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Flat-file databases vs relational databases, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

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
- Answer one 4-mark question about **Flat-file databases vs relational databases**. Follow its command word and apply each point to the stated context.

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

### Why repeated data causes anomalies

- **Explains:** `anomalies`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-079-anomalies.jpg`

1. An anomaly is a problem caused when data is inserted, updated or deleted in a structure that stores repeated facts poorly.
2. Update anomaly A parent email is changed in one row but not in another, so the same member has two different emails.
3. Insertion anomaly A new member cannot be recorded until they join a session, because member details only exist in lesson rows.
4. Deletion anomaly Deleting a cancelled session row may accidentally delete the only copy of a member's contact details.

### Flat-file vs relational comparison

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-079-compare.jpg`

1. Flat-file
2. Relational
3. Structure
4. Single table
5. Multiple linked tables
6. Redundancy
7. More likely because related details are repeated
8. Reduced because shared data can be stored once
9. Consistency
10. Harder to maintain if repeated values are updated differently
11. Improved because updates can be made in one relevant table
12. Complexity

### Flat-file database

- **Explains:** `flat`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-079-flat.jpg`

1. A flat-file database stores data in a single table. It is simple, but related data may be repeated in many records.
2. MemberID
3. ParentEmail
4. Amira Chen
5. lee@example.com
6. Robotics
7. Leo Singh
8. patel@example.com

### Relational database

- **Explains:** `relational`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-079-relational.jpg`

1. A relational database stores data in multiple tables that are linked using shared fields. Shared facts can be stored once and referenced where needed.
2. MemberID | Name | ParentEmail
3. M104 | Amira Chen | lee@example.com
4. M211 | Leo Singh | patel@example.com
5. linked by MemberID
6. Enrolment
7. EnrolID | MemberID | Session | FeePaid
8. E501 | M104 | Python | TRUE
9. E502 | M104 | Robotics | FALSE
10. Exam sentence:
11. A relational database reduces redundancy by separating related data into linked tables, so a fact such as a parent email is stored once instead of repeated in every lesson record.
<!-- stage10-explanations:end -->
