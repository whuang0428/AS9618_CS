# Lesson 078: Data, information, databases and DBMS roles

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Data, databases, relational solutions and DBMS features

### Direct explanation

- A file-based approach can repeat facts in separate files, create inconsistent copies and isolate related data. A Database Management System (DBMS) addresses these file-based limitations by providing data management, including a data dictionary of metadata; data modelling; a logical schema; data integrity; and data security. Security includes backup procedures and access rights assigned to individual users or groups.
- A developer interface provides tools used to define structures and build database applications, forms or reports. A query processor interprets and checks a query, chooses how to carry it out, accesses the stored data and returns or modifies the specified records while the DBMS applies access and integrity rules.
- A file-based approach stores data in separate application files. The same fact may be repeated in several files or records, causing redundancy and wasted storage. Updating only some copies creates inconsistency; insertion and deletion can also lose or require unrelated facts. Separate files may use incompatible formats, isolate data, duplicate validation/security code and make shared querying, concurrent access, backup and recovery harder to manage.
- A relational database addresses these limitations by separating entities into linked tables, storing shared facts once, identifying records with keys and enforcing relationships and constraints centrally. A DBMS supplies shared query processing, integrity, security, access rights and backup. These mechanisms reduce particular file-based risks; a relational design is not automatically smaller, simpler or error-free.
- Relational databases address file-based duplication, inconsistency, isolation and access problems through related tables, keys, constraints and managed queries.

### Worked example

**Run a restricted query / Replace a repeated order file:** A developer enters a SELECT statement through the developer interface. The query processor checks the statement and the user's access rights, works out an execution plan, retrieves the permitted rows and returns the result. The data dictionary supplies definitions such as field types, keys and constraints; it does not hold the ordinary user records. A flat Order file repeats CustomerName and Address in every order row. Split it into Customer(CustomerID, CustomerName, Address) and Order(OrderID, CustomerID, OrderDate). CustomerID links each order to one stored customer, so an address is updated once instead of in every order row.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What five broad DBMS feature areas are required?
   **Answer:** Data management including a data dictionary, data modelling, logical schema, data integrity, and data security including backup and access rights.
2. What does a data dictionary store?
   **Answer:** Metadata such as table, field, type, key and constraint definitions.
3. What is the purpose of a developer interface?
   **Answer:** To provide tools for defining structures or building database applications, forms and reports.
4. What is the role of the query processor?
   **Answer:** To interpret/check, plan and carry out database queries or data-maintenance statements.
5. Which DBMS feature limits users or groups to permitted operations?
   **Answer:** Access rights within data security.
6. Why can repeated data create inconsistency?
   **Answer:** One copy may be changed while another remains out of date.
7. What is data isolation in a file-based system?
   **Answer:** Related data is kept in separate files or formats, making combined access and queries difficult.
8. Which relational feature connects an order to its customer?
   **Answer:** A foreign key in Order referring to the Customer primary key.
9. Why is 'relational databases are always simpler' not a valid benefit?
   **Answer:** Linked tables and DBMS administration add complexity; benefits must be tied to a file-based limitation.

### Exam-style question and MS

**Question (12 marks):** A school is introducing a relational DBMS. Explain four DBMS features and the distinct purposes of the developer interface and query processor. A clinic repeats patient details in separate appointment, billing and treatment files. Explain three file-based limitations and a relational-database feature that addresses each one.

| Answer | Guidance | Marks |
|---|---|---:|
| data management/data dictionary stores metadata about structure | Do not treat the database, data dictionary, developer interface and query processor as interchangeable names. Do not award a generic claim such as 'relational is better' without a named limitation, mechanism and consequence. | 1 |
| data modelling or logical schema represents the database design |  | 1 |
| integrity rules maintain valid and consistent data |  | 1 |
| security uses access rights and backup procedures |  | 1 |
| developer interface supports defining structures or building database applications/forms/reports |  | 1 |
| query processor interprets/checks and carries out queries or maintenance statements |  | 1 |
| repeated patient facts cause redundancy or wasted storage |  | 1 |
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
1. Define and apply the database concepts involved in **Data, information, databases, and DBMS roles**.
2. Use precise relational terminology when describing data and relationships.
3. Identify and correct an unsuitable database design or explanation.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Focus question: Which feature distinguishes **Data, information, databases, and DBMS roles** from the most closely related syllabus concept?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Data, information, databases, and DBMS roles, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

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
- Answer one 4-mark question about **Data, information, databases, and DBMS roles**. Follow its command word and apply each point to the stated context.

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

### Data vs information

- **Explains:** `data-info`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-078-data-info.jpg`

1. Data is raw facts and values. Information is data that has been processed, organised or interpreted so it has meaning.
2. Raw data
3. BookID=B144 , DueDate=2026-06-20 , Returned=FALSE
4. Processing
5. compare due date, filter not returned, group by student
6. Information
7. "Amira has two overdue books and needs a reminder."
8. Loan dates, student IDs, book IDs
9. Which students have overdue loans
10. Temperatures, appointment times, patient IDs
11. Patients needing urgent triage
12. Online shop

### What is a database?

- **Explains:** `database`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-078-database.jpg`

1. A database is an organised collection of related data that can be stored, retrieved and updated.
2. Organised Data is arranged using defined structures, not random notes in one giant document.
3. Related Records are connected by a shared context, such as students, books and loans.
4. Retrievable Users can search, filter and query the data to produce information.
5. Maintainable Data can be updated while rules help reduce invalid or inconsistent values.
6. StudentID | Name | Form
7. S0234 | Amira Chen | 12A
8. S0318 | Leo Singh | 12B
9. linked by ID
10. LoanID | StudentID | BookID | Returned
11. L9001 | S0234 | B144 | FALSE
12. L9002 | S0318 | B102 | TRUE

### What does a DBMS provide?

- **Explains:** `dbms`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-078-dbms.jpg`

1. A DBMS is software used to create, manage and control access to a database. It sits between users/applications and stored data.
2. Data management stores, organises, retrieves and updates data; maintains metadata in a data dictionary.
3. Data modelling helps define entities, tables, fields and the logical schema of the database.
4. Data integrity enforces rules so values are valid and relationships remain consistent.
5. Data security uses access rights for individuals or groups; supports backup and recovery procedures.
6. Developer interface provides tools for creating structures, forms, reports or database applications.
7. Query processor interprets and carries out queries so users can retrieve or change data.
8. Exam sentence:
9. The DBMS manages the database by controlling data definition, access, integrity, security and queries; the database is the organised data itself.

### Which DBMS feature solves the problem?

- **Explains:** `scenario`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-078-scenario.jpg`

1. Interactive DBMS selector
2. Choose a problem, then select the DBMS feature.
3. The answer should name a feature and explain its purpose.

### Is it data, information, database, or DBMS?

- **Explains:** `sorter`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-078-sorter.jpg`

1. Interactive concept sorter
2. Scenario item
3. Choose an item, then classify it.
4. Reasoning will appear here.

### Core relational words for this lesson

- **Explains:** `terms`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-078-terms.jpg`

1. This is the vocabulary doorway. Later lessons will go deeper into keys, relationships, E-R diagrams, normalisation and SQL.
2. A thing about which data is stored
3. Student, Book, Loan
4. A set of records about one entity
5. Student table
6. Record / tuple
7. One row in a table
8. S0234, Amira Chen, 12A
9. Field / attribute
10. One column or property
11. StudentID, Name, Form
<!-- stage10-explanations:end -->
