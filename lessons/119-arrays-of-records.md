# Lesson 119: Arrays of records

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Arrays of records**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Arrays of records** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Arrays of records, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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
- Answer one 4-mark question about **Arrays of records**. Follow its command word and apply each point to the stated context.

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

### Index first, then field name

- **Explains:** `access`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-access.jpg`

1. Access pattern
2. Pseudocode
3. Read one field
4. OUTPUT Students[3].Name
5. name field of record 3
6. Update one field
7. Students[3].Mark <- 80
8. mark field of record 3
9. Test one field
10. IF Students[Index].Enrolled = TRUE THEN
11. Boolean field in current record

### One array, many records, same record shape

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-concept.jpg`

1. Array of records
2. array where each element is a record
3. Students[1:30]
4. selects one record from the array
5. Students[5]
6. selects one named value inside that record
7. Combined access
8. index first, field second
9. Students[5].Mark

### Define the record type, then declare the array

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-declare.jpg`

1. Record type
2. TYPE TStudent
3. DECLARE Name : STRING
4. DECLARE Mark : INTEGER
5. DECLARE Enrolled : BOOLEAN
6. Array of records
7. DECLARE Students : ARRAY[1:30] OF TStudent
8. Students[1].Name <- "Ali"
9. Students[1].Mark <- 72
10. The record type describes one element. The array declaration creates many elements of that type.

### Read a field from a selected record

- **Explains:** `explorer`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-explorer.jpg`

1. Interactive record explorer
2. Record index
3. Choose an index and a field to read from the array of records.

### Search, count and update fields

- **Explains:** `operations`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-operations.jpg`

1. Search, count and update are alternative record operations, not mandatory consecutive stages.
2. A search condition locates a matching record and outputs its position or details.
3. A count condition increments a counter for qualifying records.
4. An update condition changes the required field of qualifying records.

### Same structure, different syntax

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. DECLARE Students : ARRAY[1:30] OF TStudent
4. FOR Index <- 1 TO 30
5. OUTPUT Students[Index].Name
6. NEXT Index
7. Java support only
8. Student[] students = new Student[30];
9. for (int index = 0; index < 30; index++) {
10. System.out.println(students[index].name);
11. Paper 2 reminder: Java arrays are often zero-based. Cambridge pseudocode ranges follow the declaration shown in the question.

### A loop visits each record; field access uses the loop index

- **Explains:** `traversal`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-traversal.jpg`

1. Use Index to select each Students record in turn.
2. Test the Mark field of the current record.
3. Output the Name field only when Mark is at least 70.
4. Close the selection with ENDIF before NEXT Index.
<!-- stage10-explanations:end -->
