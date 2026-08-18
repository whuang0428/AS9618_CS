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
## Stage 10 visual explanations

### Why one structure causes three anomalies

- **Explains:** `anomalies`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-anomalies.jpg`

1. Insertion may require an unrelated fact that is not yet known.
2. Updating requires finding every repeated copy.
3. Deleting one event may accidentally remove the only descriptive fact.
- **Analogy:** A form that mixes customers, products and orders ties unrelated lifetimes together.
- **Boundary:** The anomaly comes from dependency structure, not simply from a large table.

### How normal forms remove dependency problems

- **Explains:** `normal-forms`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-normal-forms.jpg`

1. 1NF makes stored values atomic within each row and column.
2. 2NF removes partial dependency on part of a composite key.
3. 3NF removes dependency on another non-key attribute.
- **Analogy:** Separate mixed filing rules one dependency at a time.
- **Boundary:** A table with a single-attribute key cannot have a partial-key dependency.

### Why normalisation protects consistency

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-purpose.jpg`

1. Each fact is stored in a relation where its determinant is clear.
2. Other tables reference that fact instead of copying it repeatedly.
3. One update then changes the authoritative value once.
- **Analogy:** Keep one catalogue record and let many loans point to it.
- **Boundary:** Normalisation improves consistency but joins may make some queries more complex.

### How repeated facts become risky

- **Explains:** `redundancy`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-083-redundancy.jpg`

1. The same real-world fact appears in several rows.
2. A later update may change only some copies.
3. Queries then return conflicting versions of one fact.
- **Analogy:** Several photocopies agree only until someone edits one copy.
- **Boundary:** Repeated transactional events are valid; repeated descriptive facts cause the risk.
<!-- stage10-explanations:end -->
