# Lesson 079: Relational terminology, keys and relationships

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Relational terminology, keys and relationships

### Direct explanation

- An entity is a real-world thing about which data is stored and is commonly represented by a table. A table contains records (tuples); each record describes one entity occurrence. A field (attribute) is one named property or column. These paired terms are related but should not be collapsed into one definition.
- A candidate key is a minimal field or field set that uniquely identifies a record. One candidate key is selected as the primary key. A secondary key is a field used as an additional retrieval or ordering route and need not be unique; it is not another name for an unselected candidate key. A foreign key refers to a key in a related table. An index is a lookup structure built on one or more fields: it can speed retrieval but uses storage and must be maintained after changes.
- Record and tuple are corresponding relational terms for one row; field and attribute are corresponding terms for one column.
- A foreign key is an attribute in one table that refers to a primary/candidate key in another table. Referential integrity requires every non-null foreign-key value to match an existing referenced key.
- A one-to-one relationship links one record on each side. A one-to-many relationship links one parent record to many child records. A many-to-many relationship is normally implemented through a linking entity/table that creates two one-to-many relationships. Referential integrity prevents orphan records: insert, update and delete operations may be rejected or handled by a defined cascade/null policy, but must not silently leave an invalid reference.
- A relational database stores data in tables made of records and fields. A primary key uniquely identifies a record; a foreign key links to a primary key in another table and creates a relationship.
- Indexing creates an additional lookup structure for one or more fields so matching records can be located more quickly. The index consumes storage and must be updated when indexed data change.

### Worked example

**Keys for a student table / Delete a department / Use keys and an index:** In Student(StudentID, Email, TutorGroup), StudentID and Email may be candidate keys if both are unique and minimal; StudentID is selected as primary. TutorGroup can be a secondary key for retrieving all students in one group even though many records share the value. An index on TutorGroup can provide a faster lookup route. If Employee.DepartmentID refers to Department.DepartmentID, deleting a department with employees would break referential integrity unless deletion is rejected or an authorised cascading policy handles dependent rows. StudentID is the primary key of Student. DepartmentID is a foreign key linking to Department. An index on Surname can speed searches by surname without changing which field is the primary key.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare a record/tuple from a field/attribute.
   **Answer:** A record/tuple is one complete row for an entity occurrence; a field/attribute is one named property or column.
2. What makes a candidate key minimal?
   **Answer:** No field can be removed while retaining uniqueness.
3. Must a secondary key uniquely identify one record?
   **Answer:** No. It may retrieve a set of records sharing the same value.
4. Give one benefit and one cost of an index.
   **Answer:** It can speed lookup/ordering, but uses storage and must be updated when data changes.
5. Where is the referenced key stored?
   **Answer:** In the parent/referenced table.
6. What is an orphan record?
   **Answer:** A child record whose foreign key has no matching parent key.
7. How is a many-to-many relationship represented relationally?
   **Answer:** Use a linking table/entity containing foreign keys to both original entities.
8. Identify one valid delete response.
   **Answer:** Reject the delete, cascade it, or set nullable foreign keys to null according to defined rules.
9. What does a primary key do?
   **Answer:** Uniquely identifies each record.
10. What does indexing improve?
   **Answer:** The speed of locating records by indexed field values.

### Exam-style question and MS

**Question (15 marks):** For Student(StudentID, Email, TutorGroup), explain the roles of a candidate key, primary key, secondary key and index. Explain how a one-to-many relationship between Department and Employee is represented and protected. Explain primary key, foreign key and indexing for a Student table.

| Answer | Guidance | Marks |
|---|---|---:|
| candidate key is a minimal unique identifier, such as StudentID or unique Email | Do not describe a secondary key as an alternate candidate key or require it to be unique. Do not accept that foreign-key values must be unique in the child table. Do not describe an index as a replacement primary key. | 1 |
| primary key is the candidate selected to identify each record |  | 1 |
| secondary key is an additional retrieval field such as non-unique TutorGroup |  | 1 |
| secondary key need not be unique |  | 1 |
| index maps field values to record locations to speed access |  | 1 |
| index requires storage and update maintenance |  | 1 |
| one Department record may relate to many Employee records |  | 1 |
| DepartmentID is the primary/candidate key in Department |  | 1 |
| DepartmentID is a foreign key in Employee and may repeat |  | 1 |
| each non-null foreign-key value must match an existing Department key |  | 1 |
| referential integrity prevents orphan Employee records |  | 1 |
| primary key |  | 1 |
| foreign key/relationship |  | 1 |
| indexing lookup benefit |  | 1 |
| storage/update trade-off |  | 1 |
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

### Referential integrity

- **Explains:** `referential`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-referential.jpg`

1. Referential integrity means a foreign key value must match an existing primary key value in the referenced table.
2. Valid Loan.StudentID = S0234 is valid if Student.StudentID = S0234 exists.
3. Invalid Loan.StudentID = S9999 is invalid if no student with that ID exists.
4. Why It prevents orphan records, such as a loan assigned to a non-existent student.

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
