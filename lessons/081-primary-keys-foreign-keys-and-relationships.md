# Lesson 081: Primary keys, foreign keys and relationships

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Relationships, foreign keys and referential integrity

### Direct explanation

- A foreign key is an attribute in one table that refers to a primary/candidate key in another table. Referential integrity requires every non-null foreign-key value to match an existing referenced key.
- A one-to-one relationship links one record on each side. A one-to-many relationship links one parent record to many child records. A many-to-many relationship is normally implemented through a linking entity/table that creates two one-to-many relationships. Referential integrity prevents orphan records: insert, update and delete operations may be rejected or handled by a defined cascade/null policy, but must not silently leave an invalid reference.

### Worked example

**Delete a department:** If Employee.DepartmentID refers to Department.DepartmentID, deleting a department with employees would break referential integrity unless deletion is rejected or an authorised cascading policy handles dependent rows.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Where is the referenced key stored?
   **Answer:** In the parent/referenced table.
2. What is an orphan record?
   **Answer:** A child record whose foreign key has no matching parent key.
3. How is a many-to-many relationship represented relationally?
   **Answer:** Use a linking table/entity containing foreign keys to both original entities.
4. Identify one valid delete response.
   **Answer:** Reject the delete, cascade it, or set nullable foreign keys to null according to defined rules.

### Exam-style question and MS

**Question (5 marks):** Explain how a one-to-many relationship between Department and Employee is represented and protected.

| Answer | Guidance | Marks |
|---|---|---:|
| one Department record may relate to many Employee records | Do not accept that foreign-key values must be unique in the child table. | 1 |
| DepartmentID is the primary/candidate key in Department |  | 1 |
| DepartmentID is a foreign key in Employee and may repeat |  | 1 |
| each non-null foreign-key value must match an existing Department key |  | 1 |
| referential integrity prevents orphan Employee records |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and apply the database concepts involved in **Primary keys, foreign keys, and relationships**.
2. Use precise relational terminology when describing data and relationships.
3. Identify and correct an unsuitable database design or explanation.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Focus question: Which feature distinguishes **Primary keys, foreign keys, and relationships** from the most closely related syllabus concept?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Primary keys, foreign keys, and relationships, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

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
**Problem:** For `Student(StudentID, Name, TutorGroup)` and `Loan(LoanID, StudentID, BookID, DateBorrowed)`, identify primary and foreign keys.

**Worked answer / marking focus:** `StudentID` is primary key in Student; `LoanID` is primary key in Loan; `StudentID` in Loan is a foreign key referencing Student.

## Student Task
Students design a two-table system for sports equipment loans and label each key.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Primary keys, foreign keys, and relationships**. Follow its command word and apply each point to the stated context.

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

### Foreign keys link tables

- **Explains:** `foreign`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-foreign.jpg`

1. A foreign key is a field in one table that references the primary key in another table. It creates a link between related records.
2. StudentID | Name
3. S0234 | Alex Chen
4. S0318 | Maya Patel
5. StudentID links tables
6. LoanID | StudentID | BookID
7. L9001 | S0234 | B144
8. L9002 | S0234 | B102
9. Exam sentence:
10. StudentID is a primary key in Student and a foreign key in Loan , linking each loan to the student who borrowed the book.

### Choose the best primary key

- **Explains:** `key-picker`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-key-picker.jpg`

1. Interactive key picker
2. Choose a table to identify the strongest primary key.
3. A good primary key is unique, not null and stable.

### Primary keys uniquely identify records

- **Explains:** `primary`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-primary.jpg`

1. A primary key uniquely identifies each row and cannot be null.
2. Candidate keys are minimal sets of attributes that can uniquely identify a row.
3. Stability is a desirable design property when choosing a primary key, not a formal defining constraint of every primary key.

### Referential integrity

- **Explains:** `referential`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-referential.jpg`

1. Referential integrity means a foreign key value must match an existing primary key value in the referenced table.
2. Valid Loan.StudentID = S0234 is valid if Student.StudentID = S0234 exists.
3. Invalid Loan.StudentID = S9999 is invalid if no student with that ID exists.
4. Why It prevents orphan records, such as a loan assigned to a non-existent student.

### Classify the relationship

- **Explains:** `relationship-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-relationship-tool.jpg`

1. Interactive relationship classifier
2. Scenario
3. Choose a scenario to classify the relationship.
4. Use one-to-one, one-to-many or many-to-many with a scenario reason.

### Relationships describe how records connect

- **Explains:** `relationships`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-081-relationships.jpg`

1. A relationship describes how records in one table are associated with records in another table.
2. One-to-one One record in A relates to one record in B. Example: person and passport in a simplified system.
3. One-to-many One record in A relates to many records in B. Example: one student can have many loans.
4. Many-to-many Many records in A relate to many in B. Often resolved using a linking table. Example: students and clubs.
<!-- stage10-explanations:end -->
