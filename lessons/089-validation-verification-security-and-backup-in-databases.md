# Lesson 089: Validation, verification, security and backup in databases

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and apply the database concepts involved in **Validation, verification, security, and backup in databases**.
2. Use precise relational terminology when describing data and relationships.
3. Identify and correct an unsuitable database design or explanation.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Focus question: Which feature distinguishes **Validation, verification, security, and backup in databases** from the most closely related syllabus concept?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Validation, verification, security, and backup in databases, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

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
- Answer one 4-mark question about **Validation, verification, security, and backup in databases**. Follow its command word and apply each point to the stated context.

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

### Backups allow data recovery after loss or corruption

- **Explains:** `backup`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-backup.jpg`

1. A backup is a separate copy of data kept so the database can be restored after failure, deletion or corruption.
2. Frequency How often backups are made, such as daily or hourly.
3. Location Copies should be stored separately, often off-site or in secure cloud storage.
4. Testing A backup is only useful if restoration is tested. Untested backup plans are optimistic fiction.

### Database security restricts access and protects confidentiality

- **Explains:** `security`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-security.jpg`

1. Security controls reduce unauthorised access, accidental damage and inappropriate disclosure of data.
2. Access rights Different users can view or edit only the data they need.
3. Authentication Usernames, passwords and multi-factor methods check user identity.
4. Encryption Data is encoded so it is unreadable without the correct key.

### Validation checks whether input is sensible or acceptable

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-validation.jpg`

1. Validation applies rules before data is accepted into the database. It reduces errors but cannot prove truth.
2. Range check
3. Checks a value is within limits
4. Age must be 11 to 19
5. Type check
6. Checks data has the correct data type
7. PaymentAmount must be numeric
8. Presence check
9. Checks required data is not blank
10. StudentID must be entered
11. Format check
12. Checks data follows a pattern

### Verification checks data has been copied accurately

- **Explains:** `verification`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-089-verification.jpg`

1. Verification compares entered data with the source or repeats entry to reduce transcription errors.
2. Double entry The same data is entered twice and compared. Useful for passwords or email addresses.
3. Proofreading A person checks entered data against the original source document.
4. Key distinction Verification checks copying accuracy; it does not decide whether the original source was true.
<!-- stage10-explanations:end -->
