# Lesson 119: Arrays of records

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Arrays of records** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Arrays of records** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Arrays of records, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Arrays of records**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Arrays of records**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```


## Student Task
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Arrays of records** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Arrays of records**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Arrays of records** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Arrays of records** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **arrays of records**.  
Correction prompt: "Show the mechanism, not just the label."

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

1. Common operations
2. Operation
3. Typical condition
4. Typical action
5. Students[Index].Name = TargetName
6. output index or record details
7. Students[Index].Enrolled = TRUE
8. Count <- Count + 1
9. Students[Index].Mark < 40
10. change a status or mark field

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

1. Traversal
2. FOR Index <- 1 TO 30
3. IF Students[Index].Mark >= 70 THEN
4. OUTPUT Students[Index].Name
5. NEXT Index
6. The loop variable chooses the current record. The field name chooses which value to inspect.
<!-- stage10-explanations:end -->
