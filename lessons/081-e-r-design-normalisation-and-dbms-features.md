# Lesson 081: E-R design, normalisation and DBMS features

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** E-R design, normalisation and DBMS features

### Direct explanation

- An entity-relationship (E-R) diagram documents a database design by showing the entities, their relevant attributes or keys, the relationships between entities and the relationship cardinality. Entity names should describe things about which the system stores multiple facts; attributes belong to the entity they describe.
- To produce an E-R diagram, extract entity candidates from the scenario, assign identifiers, connect only supported relationships and label cardinality as one-to-one, one-to-many or many-to-many. Resolve a many-to-many relationship with a linking entity when converting the design to relational tables. A diagram must preserve the stated business rules rather than inventing links from similar field names.
- 1NF requires atomic values and no repeating groups. 2NF is 1NF with every non-key attribute dependent on the whole primary key, removing partial dependencies. 3NF is 2NF with no non-key attribute dependent on another non-key attribute, removing transitive dependencies.
- Normalisation decomposes tables while preserving keys and relationships. A normalised 3NF design stores each fact once in the table identified by its determinant, reducing insertion, update and deletion anomalies.
- A file-based approach can repeat facts in separate files, create inconsistent copies and isolate related data. A Database Management System (DBMS) addresses these file-based limitations by providing data management, including a data dictionary of metadata; data modelling; a logical schema; data integrity; and data security. Security includes backup procedures and access rights assigned to individual users or groups.
- A developer interface provides tools used to define structures and build database applications, forms or reports. A query processor interprets and checks a query, chooses how to carry it out, accesses the stored data and returns or modifies the specified records while the DBMS applies access and integrity rules.
- Relational databases address file-based duplication, inconsistency, isolation and access problems through related tables, keys, constraints and managed queries.

### Worked example

**Model students joining clubs / Order line data / Run a restricted query:** Draw Student(StudentID, Name) and Club(ClubID, ClubName). Because each student may join many clubs and each club may contain many students, add Membership(StudentID, ClubID, JoinDate) as a linking entity. The completed design has Student 1:M Membership and Club 1:M Membership. ORDER_LINE(OrderID, ProductID, ProductName, Quantity) has composite key OrderID+ProductID. ProductName depends only on ProductID, so split PRODUCT(ProductID, ProductName) and ORDER_LINE(OrderID, ProductID, Quantity) to reach 2NF for that dependency. A developer enters a SELECT statement through the developer interface. The query processor checks the statement and the user's access rights, works out an execution plan, retrieves the permitted rows and returns the result. The data dictionary supplies definitions such as field types, keys and constraints; it does not hold the ordinary user records.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What four kinds of information should an E-R diagram communicate here?
   **Answer:** Entities, relevant attributes/keys, relationships and cardinality.
2. What relationship exists between one Customer and many Orders?
   **Answer:** One-to-many from Customer to Order.
3. Why add Membership between Student and Club?
   **Answer:** It resolves the many-to-many relationship into two one-to-many relationships.
4. Why is matching field spelling not enough to draw a relationship?
   **Answer:** The scenario/business rule must state or imply that the records are associated.
5. What does 1NF remove?
   **Answer:** Repeating groups and non-atomic/multiple values in one field.
6. What dependency violates 2NF?
   **Answer:** A non-key attribute depending on only part of a composite key.
7. What dependency violates 3NF?
   **Answer:** A non-key attribute depending on another non-key attribute.
8. What five broad DBMS feature areas are required?
   **Answer:** Data management including a data dictionary, data modelling, logical schema, data integrity, and data security including backup and access rights.
9. What does a data dictionary store?
   **Answer:** Metadata such as table, field, type, key and constraint definitions.
10. What is the purpose of a developer interface?
   **Answer:** To provide tools for defining structures or building database applications, forms and reports.
11. What is the role of the query processor?
   **Answer:** To interpret/check, plan and carry out database queries or data-maintenance statements.
12. Which DBMS feature limits users or groups to permitted operations?
   **Answer:** Access rights within data security.

### Exam-style question and MS

**Question (16 marks):** A clinic stores Patients, Doctors and Appointments. Write an E-R design in words or a labelled diagram and state the two relationship cardinalities. Explain why CUSTOMER(CustomerID, Postcode, Town) may not be in 3NF when each postcode determines one town, and give a 3NF design. A school is introducing a relational DBMS. Explain four DBMS features and the distinct purposes of the developer interface and query processor.

| Answer | Guidance | Marks |
|---|---|---:|
| identifies Patient, Doctor and Appointment as entities | Do not award a collection of unconnected entity boxes as a complete E-R design. Do not award decomposition marks unless primary/foreign-key linkage can reconstruct the relationship. Do not treat the database, data dictionary, developer interface and query processor as interchangeable names. | 1 |
| gives a suitable identifier/key for each entity |  | 1 |
| Patient has a one-to-many relationship with Appointment |  | 1 |
| Doctor has a one-to-many relationship with Appointment |  | 1 |
| Appointment carries the linking foreign keys / resolves the patient-doctor many-to-many history |  | 1 |
| attributes and relationship directions are consistent with the scenario |  | 1 |
| CustomerID determines Postcode and Postcode determines Town |  | 1 |
| Town is transitively dependent on CustomerID / depends on non-key Postcode |  | 1 |
| CUSTOMER(CustomerID, Postcode) |  | 1 |
| POSTCODE(Postcode, Town), with Postcode linked as foreign key |  | 1 |
| data management/data dictionary stores metadata about structure |  | 1 |
| data modelling or logical schema represents the database design |  | 1 |
| integrity rules maintain valid and consistent data |  | 1 |
| security uses access rights and backup procedures |  | 1 |
| developer interface supports defining structures or building database applications/forms/reports |  | 1 |
| query processor interprets/checks and carries out queries or maintenance statements |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and apply the database concepts involved in **Tables, records, fields, data types, and constraints**.
2. Use precise relational terminology when describing data and relationships.
3. Identify and correct an unsuitable database design or explanation.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Focus question: Which feature distinguishes **Tables, records, fields, data types, and constraints** from the most closely related syllabus concept?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Tables, records, fields, data types, and constraints, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

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
- Answer one 4-mark question about **Tables, records, fields, data types, and constraints**. Follow its command word and apply each point to the stated context.

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

### Section 8 basics so far

- **Explains:** `checkpoint`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-checkpoint.jpg`

1. Monthly checkpoint
2. This checkpoint connects Lessons 079-080 without becoming a full exam.
3. 1. Define data, information, database, DBMS, flat-file, relational database.
4. 2. Compare one-table repeated data vs linked tables with reduced redundancy.
5. 3. Design choose data types and constraints for five fields in a small scenario.

### Which rule rejects the bad value?

- **Explains:** `constraint-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-constraint-tool.jpg`

1. Interactive constraint checker
2. Bad value
3. Choose a bad value to identify the check.
4. Name the rule and explain what it prevents.

### Constraints and validation rules

- **Explains:** `constraints`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-constraints.jpg`

1. A constraint limits accepted values to help maintain data integrity. It does not prove the data is true; it helps reject impossible or invalid data.
2. Presence check Value must not be blank. Example: Name is required.
3. Range check Value must be within limits. Example: Mark is 0 to 100.
4. Type check Value must match the data type. Example: Quantity must be Integer.
5. Length check Value must have a permitted length. Example: StudentID has 5 characters.
6. Format check Value must match a pattern. Example: postcode or email pattern.
7. Lookup check Value must be from an allowed list. Example: Grade is A, B, C, D, E or U.
8. Exam sentence:
9. A constraint improves data integrity by preventing values that do not meet a rule, such as rejecting a mark outside 0 to 100.

### What does a DBMS provide?

- **Explains:** `dbms`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-079-dbms.jpg`

1. A DBMS is software used to create, manage and control access to a database. It sits between users/applications and stored data.
2. Data management stores, organises, retrieves and updates data; maintains metadata in a data dictionary.
3. Data modelling helps define entities, tables, fields and the logical schema of the database.
4. Data integrity enforces rules so values are valid and relationships remain consistent.
5. Data security uses access rights for individuals or groups; supports backup and recovery procedures.
6. Developer interface provides tools for creating structures, forms, reports or database applications.
7. Query processor interprets and carries out queries so users can retrieve or change data.
8. Exam sentence:
9. The DBMS manages the database by controlling data definition, access, integrity, security and queries; the database is the organised data itself.

### Designing fields properly

- **Explains:** `fields`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-fields.jpg`

1. Each field should have a name, data type, possible field size and constraints. Good design reduces invalid data at entry.
2. Field name Clear and specific: DateOfBirth , not date .
3. Data type Controls the kind of data: text, integer, real, date/time, Boolean.
4. Field size Maximum storage length where relevant, such as 8 characters for StudentID.
5. Constraint A rule that a value must satisfy before it is accepted.

### How normal forms remove dependency problems

- **Explains:** `normal-forms`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-084-normal-forms.jpg`

1. First Normal Form (1NF) requires atomic values and no repeating groups.
2. Second Normal Form (2NF) is in 1NF and removes partial dependency: each non-key attribute depends on the whole primary key.
3. Third Normal Form (3NF) is in 2NF and removes transitive dependency: a non-key attribute must not depend on another non-key attribute.
4. A valid decomposition retains every original fact, preserves keys and relationships, and follows the stated functional dependencies.
- **Analogy:** Each dependency belongs in the relation whose key determines it.
- **Boundary:** Check the forms in order; satisfying a later normal form assumes the earlier requirements are already met.

### Tables, records and fields

- **Explains:** `terms`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-terms.jpg`

1. A table stores records about one entity. A record is one complete row. A field is one column or attribute.
2. A collection of records for one entity
3. Student table
4. Record / tuple
5. One complete row in a table
6. S0234, Amira Chen, 2009-04-18, TRUE
7. Field / attribute
8. One column or property stored for each record
9. StudentID, Name, DateOfBirth, FeePaid
10. One item of data in a field for a record
11. TRUE in the FeePaid field

### Choose the best data type

- **Explains:** `type-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-type-tool.jpg`

1. Interactive data type chooser
2. Choose a field, then decide the data type.
3. The best answer depends on how the value is used, not how numeric it looks.

### Common database data types

- **Explains:** `types`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-types.jpg`

1. Data type
2. Use when
3. Text / string
4. The value may contain letters, spaces, symbols or leading zeroes
5. PhoneNumber = "02071234567"
6. Whole number used for counting or arithmetic
7. Quantity = 24
8. Real / decimal
9. Number may include fractional part
10. MassKg = 62.5
11. Only two logical states are needed
12. FeePaid = TRUE
<!-- stage10-explanations:end -->
