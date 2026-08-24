# Lesson 115: One-dimensional arrays

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **One-dimensional arrays**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **One-dimensional arrays** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For One-dimensional arrays, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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

```text
// Cambridge-style pseudocode
FOR Index ← 1 TO NumberOfScores
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < scores.length; index++) {
    System.out.println(scores[index]);
}
```

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
- Answer one 4-mark question about **One-dimensional arrays**. Follow its command word and apply each point to the stated context.

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

### The index points to exactly one element

- **Explains:** `access`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-115-access.jpg`

1. Access and update
2. Read one element
3. OUTPUT Scores[3]
4. Outputs the element at index 3, not the whole array.
5. Update one element
6. Scores[3] <- Scores[3] + 5
7. Reads the old value at index 3, adds 5, and stores it back into the same element.

### Bounds say which indexes are valid

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-115-declare.jpg`

1. Declare arrays
2. Cambridge-style pseudocode
3. Valid indexes
4. Five integer scores
5. DECLARE Scores : ARRAY[1:5] OF INTEGER
6. 1, 2, 3, 4, 5
7. Ten names
8. DECLARE Names : ARRAY[1:10] OF STRING
9. 1 to 10 inclusive
10. Seven temperatures
11. DECLARE Temp : ARRAY[1:7] OF REAL
12. 1 to 7 inclusive

### Access one element

- **Explains:** `lookup`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-115-lookup.jpg`

1. Interactive index lookup
2. Array: Scores[1:5] = 42, 67, 55, 81, 49.

### A one-dimensional array is a linear collection

- **Explains:** `model`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-115-model.jpg`

1. Array model
2. Same identifier
3. All elements belong to one array name.
4. Same type
5. At AS level, an array stores elements of the same data type.
6. ARRAY[1:5] OF INTEGER
7. Indexed access
8. An index selects one element.
9. Scores[3]
10. Scores[Index]

### Cambridge bounds and Java indexes are not the same habit

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-115-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. DECLARE Scores : ARRAY[1:5] OF INTEGER
4. FOR Index <- 1 TO 5
5. INPUT Scores[Index]
6. NEXT Index
7. Java support only
8. int[] scores = new int[5];
9. for (int index = 0; index < 5; index++) {
10. scores[index] = input.nextInt();
11. Paper 2 reminder: Cambridge pseudocode may use bounds such as ARRAY[1:5] . Do not import Java's zero-based indexing unless the question states it.

### Use a loop to visit every element

- **Explains:** `traversal`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-115-traversal.jpg`

1. Traversal
2. Input all scores
3. FOR Index <- 1 TO 5
4. INPUT Scores[Index]
5. NEXT Index
6. Total all scores
7. Total <- 0
8. Total <- Total + Scores[Index]
9. OUTPUT Total
10. The loop bounds must match the declared array bounds. If the array is 1:5, index 0 and index 6 are out of range.
<!-- stage10-explanations:end -->
