# Lesson 118: Records and composite data

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Records and composite data** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Records and composite data** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Records and composite data, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Records and composite data**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Records and composite data**, not a generic example from the wider unit.

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
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Records and composite data** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Records and composite data**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Records and composite data** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Records and composite data** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **records and composite data**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Use the field name, not a numeric index

- **Explains:** `access`
- **Explanation type:** mechanism
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

### Define the type, then declare variables that use it

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-declare.jpg`

1. Declare records
2. Record type
3. TYPE TStudent
4. DECLARE Name : STRING
5. DECLARE DateOfBirth : DATE
6. DECLARE Mark : INTEGER
7. DECLARE Enrolled : BOOLEAN
8. Record variable
9. DECLARE Student1 : TStudent
10. Student1.Name <- "Ali"
11. Student1.Mark <- 72

### Read one field from a record

- **Explains:** `lookup`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-lookup.jpg`

1. Interactive field lookup
2. Student1 has Name, DateOfBirth, Mark and Enrolled fields.

### Same modelling idea, different syntax

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-118-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. TYPE TBook
4. DECLARE Title : STRING
5. DECLARE Pages : INTEGER
6. DECLARE Available : BOOLEAN
7. DECLARE Book1 : TBook
8. Book1.Available <- TRUE
9. Java support only
10. class Book {
11. String title;
12. int pages;
<!-- stage10-explanations:end -->
