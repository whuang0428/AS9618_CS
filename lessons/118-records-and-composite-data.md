# Lesson 118: Records and composite data

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Records and composite data**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Records and composite data** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Records and composite data, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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
- Answer one 4-mark question about **Records and composite data**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Define, read and save record data

### Direct explanation

- A record structure groups a set of related fields, which may have different data types, under one identifier. Field names preserve the meaning of each value, so a record suits several facts about one entity better than an array of same-type indexed elements.
- Define a Cambridge record type with TYPE, field declarations and ENDTYPE. Declare record variables only after the type definition is complete. A complete definition states every field name and its type.
- Read data from a record by selecting a named field, for example OUTPUT Student1.Mark or CurrentMark <- Student1.Mark. Save data to the record by assigning to a named field, for example Student1.Mark <- 75. Reading or saving one field does not replace unrelated fields.

### Worked example

**Define and use one student record:** TYPE TStudent declares Name : STRING, DateOfBirth : DATE, Mark : INTEGER and Enrolled : BOOLEAN, then closes with ENDTYPE. DECLARE Student1 : TStudent creates one record. Student1.Mark <- 75 saves a value to the Mark field; OUTPUT Student1.Mark reads that field.

### Targeted practice and answers

1. Why can a record contain both STRING and DATE fields?
   **Answer:** Record fields may have different data types but belong to one entity under one identifier.
2. Which statement saves a mark of 80?
   **Answer:** Student1.Mark <- 80.
3. Which expression reads the stored name?
   **Answer:** Student1.Name, for example OUTPUT Student1.Name.

### Exam-style question and MS

**Question (6 marks):** Define TProduct with Code, Description, Price and InStock fields, declare Product1, save values to Price and InStock, then read both fields.

- **B1** opens TYPE TProduct and declares suitable named fields
- **B1** uses suitable STRING, REAL and BOOLEAN field types
- **B1** closes the definition with ENDTYPE
- **B1** declares Product1 : TProduct after ENDTYPE
- **B1** assigns/saves values through Product1.Price and Product1.InStock
- **B1** reads/outputs the two named fields without replacing other data

**Strict note:** Do not use numeric array indexing for record fields or omit ENDTYPE from the type definition.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Use the field name, not a numeric index

- **Explains:** `access`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-access.jpg`

1. Access and update
2. Pseudocode
3. Read field
4. OUTPUT Student1.Name
5. outputs the Name field
6. Update field
7. Student1.Mark <- 80
8. changes only the Mark field
9. Test field
10. IF Student1.Enrolled = TRUE THEN
11. uses Boolean field in selection

### Same type and index, or mixed fields and names?

- **Explains:** `array-vs-record`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-array-vs-record.jpg`

1. Array vs record
2. Elements / fields
3. usually same type
4. can be different types
5. index: Scores[3]
6. field name: Student1.Mark
7. Best for
8. many similar values
9. several facts about one entity

### Composite data groups fields into one type

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-concept.jpg`

1. a composite structure containing named fields
2. TStudent
3. one named item inside a record
4. Name , Mark
5. Composite data
6. data made from several components
7. student details grouped together
8. Dot notation
9. access to one field of a record variable
10. Student1.Mark

### Define a record, then save and read named fields

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-declare.jpg`

1. A record groups related named fields of different data types under one identifier.
2. Define the record between TYPE and ENDTYPE, then declare a variable of that record type.
3. Student1.Mark <- 75 saves a field value; OUTPUT Student1.Mark reads that named field.

### Read one field from a record

- **Explains:** `lookup`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-lookup.jpg`

1. Interactive field lookup
2. Student1 has Name, DateOfBirth, Mark and Enrolled fields.

### Same modelling idea, different syntax

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-pseudocode.jpg`

1. TYPE TBook
    DECLARE Title : STRING
    DECLARE Pages : INTEGER
ENDTYPE
2. Book fields are declared inside the TYPE block.
3. DECLARE Book1 : TBook
This declaration belongs after ENDTYPE.
<!-- stage10-explanations:end -->
