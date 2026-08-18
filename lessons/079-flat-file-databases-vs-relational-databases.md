# Lesson 079: Flat-file databases vs relational databases

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 8  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Flat-file databases vs relational databases** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Lesson-specific focus question: What would go wrong if a student confused **Flat-file databases vs relational databases** with a neighbouring syllabus idea?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Flat-file databases vs relational databases, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

Topic-specific teaching move: keep the explanation anchored to **Flat-file databases vs relational databases**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Design two related tables for students borrowing library books and identify suitable primary and foreign keys. The worked example must explicitly use **Flat-file databases vs relational databases**, not a generic example from the wider unit.

**Worked answer / marking focus:** A strong answer separates Student and Loan/Book data, gives each table a primary key, and uses a foreign key to link records.



## Student Task
Pairs convert a messy club list into relational tables, then mark one field as a primary key and one as a foreign key. Their final answer must include the phrase **Flat-file databases vs relational databases** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Flat-file databases vs relational databases**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Flat-file databases vs relational databases** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Flat-file databases vs relational databases** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record. For this lesson, make students contrast that mistake with the exact idea of **flat-file databases vs relational databases**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why repeated data causes anomalies

- **Explains:** `anomalies`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-079-anomalies.jpg`

1. An anomaly is a problem caused when data is inserted, updated or deleted in a structure that stores repeated facts poorly.
2. Update anomaly A parent email is changed in one row but not in another, so the same member has two different emails.
3. Insertion anomaly A new member cannot be recorded until they join a session, because member details only exist in lesson rows.
4. Deletion anomaly Deleting a cancelled session row may accidentally delete the only copy of a member's contact details.

### Flat-file vs relational comparison

- **Explains:** `compare`
- **Explanation type:** comparison
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
