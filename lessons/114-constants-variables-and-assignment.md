# Lesson 114: Define, read and save record data

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Define, read and save record data

### Direct explanation

- A record structure groups a set of related fields, which may have different data types, under one identifier. Field names preserve the meaning of each value, so a record suits several facts about one entity better than an array of same-type indexed elements.
- Define a Cambridge record type with TYPE, field declarations and ENDTYPE. Declare record variables only after the type definition is complete. A complete definition states every field name and its type.
- Read data from a record by selecting a named field, for example OUTPUT Student1.Mark or CurrentMark <- Student1.Mark. Save data to the record by assigning to a named field, for example Student1.Mark <- 75. Reading or saving one field does not replace unrelated fields.

### Worked example

**Define and use one student record:** TYPE TStudent declares Name : STRING, DateOfBirth : DATE, Mark : INTEGER and Enrolled : BOOLEAN, then closes with ENDTYPE. DECLARE Student1 : TStudent creates one record. Student1.Mark <- 75 saves a value to the Mark field; OUTPUT Student1.Mark reads that field.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why can a record contain both STRING and DATE fields?
   **Answer:** Record fields may have different data types but belong to one entity under one identifier.
2. Which statement saves a mark of 80?
   **Answer:** Student1.Mark <- 80.
3. Which expression reads the stored name?
   **Answer:** Student1.Name, for example OUTPUT Student1.Name.

### Exam-style question and MS

**Question (6 marks):** Define TProduct with Code, Description, Price and InStock fields, Write declarations for Product1, save values to Price and InStock, then read both fields.

| Answer | Guidance | Marks |
|---|---|---:|
| opens TYPE TProduct and declares suitable named fields | Do not use numeric array indexing for record fields or omit ENDTYPE from the type definition. | 1 |
| uses suitable STRING, REAL and BOOLEAN field types |  | 1 |
| closes the definition with ENDTYPE |  | 1 |
| declares Product1 : TProduct after ENDTYPE |  | 1 |
| assigns/saves values through Product1.Price and Product1.InStock |  | 1 |
| reads/outputs the two named fields without replacing other data |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Constants, variables, and assignment**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Constants, variables, and assignment** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Constants, variables, and assignment, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

## Student Task
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Constants, variables, and assignment**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Right side first, left side second

- **Explains:** `assignment`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-assignment.jpg`

1. Assignment
2. Statement
3. Total <- 0
4. Total is set to 0
5. initialises Total
6. Total <- Total + Mark
7. Total becomes old Total plus Mark
8. running total update
9. Count <- Count + 1
10. Count is incremented
11. counter update
12. Found <- TRUE

### Name fixed values so the algorithm explains itself

- **Explains:** `constants`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-constants.jpg`

1. Constants
2. Without a constant
3. IF Mark >= 50 THEN
4. OUTPUT "Pass"
5. The value 50 appears without explaining its role.
6. With a constant
7. CONSTANT PassMark = 50
8. IF Mark >= PassMark THEN
9. The identifier documents the meaning of the fixed value.
10. Exam point: changing a constant later is a contradiction. If it must change during execution, it should be a variable.

### Declaration gives a name and a type before use

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-declare.jpg`

1. Declare variables
2. Cambridge-style pseudocode
3. Whole-number counter
4. DECLARE Count : INTEGER
5. Count can store whole numbers
6. Decimal total
7. DECLARE Price : REAL
8. Price can store decimal values
9. True/false state
10. DECLARE Found : BOOLEAN
11. Found can store TRUE or FALSE
12. Text value

### Identifiers name storage locations

- **Explains:** `model`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-model.jpg`

1. Memory model
2. Variable
3. A named storage location whose value can change while the algorithm runs.
4. DECLARE Count : INTEGER
5. Count <- 0
6. Count <- Count + 1
7. Constant
8. A named value that should remain fixed. Use it when the same fixed value is used in several places.
9. CONSTANT MaxMark = 100
10. CONSTANT VATRate = 0.2
11. Assignment
12. Assignment evaluates the right-hand expression first, then stores the result in the left-hand variable.
<!-- stage10-explanations:end -->
