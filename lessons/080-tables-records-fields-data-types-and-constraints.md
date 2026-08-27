# Lesson 080: Tables, records, fields, data types, and constraints

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

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Relational terminology, keys and indexing

### Direct explanation

- An entity is a real-world thing about which data is stored and is commonly represented by a table. A table contains records (tuples); each record describes one entity occurrence. A field (attribute) is one named property or column. These paired terms are related but should not be collapsed into one definition.
- A candidate key is a minimal field or field set that uniquely identifies a record. One candidate key is selected as the primary key. A secondary key is a field used as an additional retrieval or ordering route and need not be unique; it is not another name for an unselected candidate key. A foreign key refers to a key in a related table. An index is a lookup structure built on one or more fields: it can speed retrieval but uses storage and must be maintained after changes.

### Worked example

**Keys for a student table:** In Student(StudentID, Email, TutorGroup), StudentID and Email may be candidate keys if both are unique and minimal; StudentID is selected as primary. TutorGroup can be a secondary key for retrieving all students in one group even though many records share the value. An index on TutorGroup can provide a faster lookup route.

### Targeted practice and answers

1. Distinguish a record/tuple from a field/attribute.
   **Answer:** A record/tuple is one complete row for an entity occurrence; a field/attribute is one named property or column.
2. What makes a candidate key minimal?
   **Answer:** No field can be removed while retaining uniqueness.
3. Must a secondary key uniquely identify one record?
   **Answer:** No. It may retrieve a set of records sharing the same value.
4. Give one benefit and one cost of an index.
   **Answer:** It can speed lookup/ordering, but uses storage and must be updated when data changes.

### Exam-style question and MS

**Question (6 marks):** For Student(StudentID, Email, TutorGroup), explain the roles of a candidate key, primary key, secondary key and index.

- **B1** candidate key is a minimal unique identifier, such as StudentID or unique Email
- **B1** primary key is the candidate selected to identify each record
- **B1** secondary key is an additional retrieval field such as non-unique TutorGroup
- **B1** secondary key need not be unique
- **B1** index maps field values to record locations to speed access
- **B1** index requires storage and update maintenance

**Strict note:** Do not describe a secondary key as an alternate candidate key or require it to be unique.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Section 8 basics so far

- **Explains:** `checkpoint`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-checkpoint.jpg`

1. Monthly checkpoint
2. This checkpoint connects Lessons 078-080 without becoming a full exam.
3. 1. Define data, information, database, DBMS, flat-file, relational database.
4. 2. Compare one-table repeated data vs linked tables with reduced redundancy.
5. 3. Design choose data types and constraints for five fields in a small scenario.

### Which rule rejects the bad value?

- **Explains:** `constraint-tool`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-constraint-tool.jpg`

1. Interactive constraint checker
2. Bad value
3. Choose a bad value to identify the check.
4. Name the rule and explain what it prevents.

### Constraints and validation rules

- **Explains:** `constraints`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-constraints.jpg`

1. A constraint limits accepted values to help maintain data integrity. It does not prove the data is true; it helps reject impossible or invalid data.
2. Presence check Value must not be blank. Example: Name is required.
3. Range check Value must be within limits. Example: Mark is 0 to 100.
4. Type check Value must match the data type. Example: Quantity must be Integer.
5. Length check Value must have a permitted length. Example: StudentID has 5 characters.
6. Format check Value must match a pattern. Example: postcode or email pattern.
7. Lookup check Value must be from an allowed list. Example: Grade is A, B, C, D, E or U.
8. Exam sentence:
9. A constraint improves data integrity by preventing values that do not meet a rule, such as rejecting a mark outside 0 to 100.

### Designing fields properly

- **Explains:** `fields`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-fields.jpg`

1. Each field should have a name, data type, possible field size and constraints. Good design reduces invalid data at entry.
2. Field name Clear and specific: DateOfBirth , not date .
3. Data type Controls the kind of data: text, integer, real, date/time, Boolean.
4. Field size Maximum storage length where relevant, such as 8 characters for StudentID.
5. Constraint A rule that a value must satisfy before it is accepted.

### Tables, records and fields

- **Explains:** `terms`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-terms.jpg`

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
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-type-tool.jpg`

1. Interactive data type chooser
2. Choose a field, then decide the data type.
3. The best answer depends on how the value is used, not how numeric it looks.

### Common database data types

- **Explains:** `types`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-080-types.jpg`

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
