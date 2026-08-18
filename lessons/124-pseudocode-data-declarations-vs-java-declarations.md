# Lesson 124: Pseudocode data declarations vs Java declarations

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Pseudocode data declarations vs Java declarations** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Pseudocode data declarations vs Java declarations** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Pseudocode data declarations vs Java declarations, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Pseudocode data declarations vs Java declarations**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Pseudocode data declarations vs Java declarations**, not a generic example from the wider unit.

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
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Pseudocode data declarations vs Java declarations** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Pseudocode data declarations vs Java declarations**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Pseudocode data declarations vs Java declarations** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Pseudocode data declarations vs Java declarations** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **pseudocode data declarations vs java declarations**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Cambridge array bounds are stated explicitly

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-arrays.jpg`

1. Cambridge-style pseudocode
2. DECLARE Scores : ARRAY[1:30] OF INTEGER
3. Scores[1] <- 72
4. Java support only
5. int[] scores = new int[30];
6. scores[0] = 72;
7. Index warning: if pseudocode declares ARRAY[1:30] , do not automatically use Java's index 0 in the exam answer.

### <- changes a value; = usually tests equality in conditions

- **Explains:** `assignment`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-assignment.jpg`

1. Assignment versus comparison
2. Pseudocode
3. Count <- Count + 1
4. store a new value in Count
5. IF Count = 10 THEN
6. test whether Count equals 10
7. Java warning
8. count == 10
9. Java equality syntax is not the expected pseudocode style

### Constants are named values that should not change

- **Explains:** `constants`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-constants.jpg`

1. Constants
2. Cambridge-style pseudocode
3. CONSTANT MaxSize = 100
4. CONSTANT PassMark = 40
5. Java support only
6. final int MAX_SIZE = 100;
7. final int PASS_MARK = 40;
8. Java naming conventions may use capitals for constants. Cambridge pseudocode credit comes from clear constant declaration and use.

### Do not mix the two languages inside one answer

- **Explains:** `principle`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-principle.jpg`

1. Core principle
2. Cambridge-style pseudocode
3. Java support only
4. Variable declaration
5. DECLARE Count : INTEGER
6. int count;
7. Assignment
8. Count <- 0
9. count = 0;
10. Array declaration
11. DECLARE Scores : ARRAY[1:30] OF INTEGER
12. int[] scores = new int[30];

### Record declarations use TYPE and ENDTYPE

- **Explains:** `records`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-records.jpg`

1. Cambridge-style pseudocode
2. TYPE TStudent
3. DECLARE Name : STRING
4. DECLARE Mark : INTEGER
5. DECLARE Student1 : TStudent
6. Java support only
7. class Student {
8. String name;
9. int mark;
10. Student student1 = new Student();

### Which syntax belongs to which answer style?

- **Explains:** `sorter`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-sorter.jpg`

1. Syntax sorter
2. Click a statement to identify whether it is pseudocode or Java-style.

### Map concepts, not spelling

- **Explains:** `types`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-types.jpg`

1. Data type mapping
2. Pseudocode type
3. Java support example
4. whole number
5. decimal number
6. single character
7. true/false

### Declare first; initialise separately when needed

- **Explains:** `variables`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-124-variables.jpg`

1. Variables
2. Cambridge-style pseudocode
3. DECLARE Count : INTEGER
4. Count <- 0
5. DECLARE Name : STRING
6. Name <- "Ali"
7. Java support only
8. int count = 0;
9. String name = "Ali";
<!-- stage10-explanations:end -->
