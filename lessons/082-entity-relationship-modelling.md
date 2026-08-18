# Lesson 082: Entity-relationship modelling

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 8  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Entity-relationship modelling** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Lesson-specific focus question: What would go wrong if a student confused **Entity-relationship modelling** with a neighbouring syllabus idea?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Entity-relationship modelling, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

Topic-specific teaching move: keep the explanation anchored to **Entity-relationship modelling**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Design two related tables for students borrowing library books and identify suitable primary and foreign keys. The worked example must explicitly use **Entity-relationship modelling**, not a generic example from the wider unit.

**Worked answer / marking focus:** A strong answer separates Student and Loan/Book data, gives each table a primary key, and uses a foreign key to link records.



## Student Task
Pairs convert a messy club list into relational tables, then mark one field as a primary key and one as a foreign key. Their final answer must include the phrase **Entity-relationship modelling** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Entity-relationship modelling**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Entity-relationship modelling** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Entity-relationship modelling** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record. For this lesson, make students contrast that mistake with the exact idea of **entity-relationship modelling**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Attributes describe an entity

- **Explains:** `attributes`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-082-attributes.jpg`

1. An attribute is a property stored about an entity. It often becomes a field in the table for that entity.
2. Possible attributes
3. Not usually an attribute here
4. StudentID, Name, DateOfBirth, TutorGroup
5. BookTitle, LoanDate
6. BookID, ISBN, Title, Author
7. StudentName, ReturnDate
8. LoanID, StudentID, BookID, DateBorrowed, DateReturned
9. StudentDateOfBirth, BookAuthor if already stored in Book

### Cardinality describes how many records may be linked

- **Explains:** `cardinality`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-082-cardinality.jpg`

1. Cardinality states how many records in one entity can be associated with records in another entity.
2. One-to-one One record in A links to one record in B. Example: one person has one passport in a simplified model.
3. One-to-many One record in A links to many records in B. Example: one customer can place many orders.
4. Many-to-many Many records in A link to many records in B. Usually resolved by a linking entity.
5. 1 -> many

### Entities are things the database stores data about

- **Explains:** `entities`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-082-entities.jpg`

1. An entity is a person, object, event or concept about which data is stored. In a relational design, an entity often becomes a table.
2. Person Student, Customer, Doctor, Teacher.
3. Object Book, Product, Vehicle, Equipment.
4. Event Loan, Appointment, Order, Booking.
5. Concept Course, Club, Department, Module.
6. Exam wording: say why it is an entity. "Student is an entity because the system stores multiple facts about each student."

### Identify entities and attributes

- **Explains:** `parser`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-082-parser.jpg`

1. Interactive scenario parser
2. Scenario
3. Choose a scenario to identify likely entities.
4. The answer will separate entities from attributes and relationship events.

### Optional and mandatory participation

- **Explains:** `participation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-082-participation.jpg`

1. Participation describes whether a record must be linked. This is often written using minimum and maximum values such as 0..* or 1..1.
2. 0..* Optional many: a student may have no loans, or many loans.
3. 1..* Mandatory many: an order must have at least one order line.
4. 0..1 Optional one: a member may have zero or one parking permit.
5. 1..1 Mandatory one: each loan must refer to exactly one student.
<!-- stage10-explanations:end -->
