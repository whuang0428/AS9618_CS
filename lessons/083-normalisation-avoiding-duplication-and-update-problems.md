# Lesson 083: Normalisation: avoiding duplication and update problems

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 8
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Normalisation: avoiding duplication and update problems** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- database 数据库, primary key 主键, foreign key 外键, SQL 结构化查询语言

## Warm-Up Hook
Ask students to manage a school club using one giant spreadsheet. Then add duplicate names, changed phone numbers and missing payments. The spreadsheet will start sweating politely.

Lesson-specific focus question: What would go wrong if a student confused **Normalisation: avoiding duplication and update problems** with a neighbouring syllabus idea?

## Guided Explanation
Start with messy data, then organise it into entities, fields, records and relationships. For Normalisation: avoiding duplication and update problems, show how structure reduces duplication or improves integrity. End by connecting the design to queries and updates.

Topic-specific teaching move: keep the explanation anchored to **Normalisation: avoiding duplication and update problems**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Design two related tables for students borrowing library books and identify suitable primary and foreign keys. The worked example must explicitly use **Normalisation: avoiding duplication and update problems**, not a generic example from the wider unit.

**Worked answer / marking focus:** A strong answer separates Student and Loan/Book data, gives each table a primary key, and uses a foreign key to link records.



## Student Task
Pairs convert a messy club list into relational tables, then mark one field as a primary key and one as a foreign key. Their final answer must include the phrase **Normalisation: avoiding duplication and update problems** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Normalisation: avoiding duplication and update problems**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Normalisation: avoiding duplication and update problems** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Normalisation: avoiding duplication and update problems** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 8.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often choose names as primary keys. Correction: a primary key must uniquely and reliably identify a record. For this lesson, make students contrast that mistake with the exact idea of **normalisation: avoiding duplication and update problems**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S8.04
**Focus:** First, second and third normal form

### Direct explanation

- 1NF requires atomic values and no repeating groups. 2NF is 1NF with every non-key attribute dependent on the whole primary key, removing partial dependencies. 3NF is 2NF with no non-key attribute dependent on another non-key attribute, removing transitive dependencies.
- Normalisation decomposes tables while preserving keys and relationships. A 3NF design stores each fact once in the table identified by its determinant, reducing insertion, update and deletion anomalies.

### Worked example

**Order line data:** ORDER_LINE(OrderID, ProductID, ProductName, Quantity) has composite key OrderID+ProductID. ProductName depends only on ProductID, so split PRODUCT(ProductID, ProductName) and ORDER_LINE(OrderID, ProductID, Quantity) to reach 2NF for that dependency.

### Targeted practice and answers

1. What does 1NF remove?
   **Answer:** Repeating groups and non-atomic/multiple values in one field.
2. What dependency violates 2NF?
   **Answer:** A non-key attribute depending on only part of a composite key.
3. What dependency violates 3NF?
   **Answer:** A non-key attribute depending on another non-key attribute.

### Exam-style question and MS

**Question (4 marks):** Explain why CUSTOMER(CustomerID, Postcode, Town) may not be in 3NF when each postcode determines one town, and give a 3NF design.

- **B1** CustomerID determines Postcode and Postcode determines Town
- **B1** Town is transitively dependent on CustomerID / depends on non-key Postcode
- **A1** CUSTOMER(CustomerID, Postcode)
- **A1** POSTCODE(Postcode, Town), with Postcode linked as foreign key

**Strict note:** Do not award decomposition marks unless primary/foreign-key linkage can reconstruct the relationship.

<!-- stage10-explanations:start -->
## Stage 10 causal explanations

### Why normalisation protects consistency rather than merely making tables smaller

- **Explains:** `purpose`
- **Explanation type:** mechanism

Normalisation reorganises data so that each independent fact is stored in an appropriate relation and can be referenced through keys. The main goal is consistency, not simply reducing the number of characters stored. If a tutor's email is repeated in every enrolment row, changing one copy while missing another creates contradictory versions of the same fact. Moving tutor details to a Tutor table gives the email one authoritative row, while enrolments store a tutor key. Queries can reconstruct the combined view through that relationship. This design may require joins and can introduce more tables, so it is not automatically faster for every query. Its benefit comes from controlling dependencies: one fact has one intended place to be inserted, updated or deleted, reducing the opportunities for different copies to disagree.

### Why repeated facts create risk even when every copy starts correctly

- **Explains:** `redundancy`
- **Explanation type:** mechanism

Redundancy becomes harmful when the same real-world fact is stored independently in several rows. At the moment of entry, every copy may agree, so the table appears correct. The risk appears when the fact changes. Each copy must be found and updated, and one missed row creates inconsistency. Repetition also wastes storage and makes validation harder because the database cannot easily identify which copy is authoritative. Not every repeated value is unwanted redundancy: many students may legitimately share the same course code, and each enrolment needs that reference. The problem is repeating attributes that depend on a different entity, such as storing the course title and tutor email in every enrolment. Dependency analysis reveals where the fact belongs; keys then preserve the relationship without copying the full fact.

### Why one badly structured table produces three different anomalies

- **Explains:** `anomalies`
- **Explanation type:** tradeoff

Insertion, update and deletion anomalies are different symptoms of the same structural problem: unrelated facts have been forced into one row type. An insertion anomaly occurs when a new fact cannot be stored without inventing another fact, such as being unable to add a course until a student enrols. An update anomaly occurs when one real-world change requires several row changes, allowing copies to disagree. A deletion anomaly occurs when removing the last row for one fact accidentally removes the only stored copy of another, such as deleting the last enrolment and losing the course details. Splitting the table by entity and connecting rows with keys separates the lifecycles of those facts. The anomalies disappear because each entity can be inserted, changed or removed without performing an unrelated operation.

### Why each normal form removes a different dependency problem

- **Explains:** `normal-forms`
- **Explanation type:** process

Normal forms are checkpoints for dependencies, not a ritual of splitting tables. First normal form requires atomic values and a consistent row structure so that each field contains one value that can be addressed. Second normal form matters when a primary key has several attributes: every non-key attribute must depend on the whole key, otherwise facts about only part of the key belong elsewhere. Third normal form removes transitive dependency, where a non-key attribute determines another non-key attribute. At each step, the misplaced attributes move to a relation whose key actually determines them, and foreign keys preserve the connection. A design should not be split without examining dependencies, because unnecessary tables add joins without correcting a real anomaly. The reason for each decomposition is always the same question: what fact determines this attribute?
<!-- stage10-explanations:end -->
