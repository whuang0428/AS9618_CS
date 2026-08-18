# Lesson 114: Constants, variables, and assignment

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Constants, variables, and assignment** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Constants, variables, and assignment** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Constants, variables, and assignment, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Constants, variables, and assignment**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Constants, variables, and assignment**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Constants, variables, and assignment** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Constants, variables, and assignment**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Constants, variables, and assignment** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Constants, variables, and assignment** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **constants, variables, and assignment**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Right side first, left side second

- **Explains:** `assignment`
- **Explanation type:** mechanism
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

### The symbol changes, the update idea does not

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. CONSTANT PassMark = 50
4. DECLARE Mark : INTEGER
5. DECLARE Passed : BOOLEAN
6. INPUT Mark
7. Passed <- Mark >= PassMark
8. Java support only
9. final int PASS_MARK = 50;
10. int mark = input.nextInt();
11. boolean passed = mark >= PASS_MARK;
12. Paper 2 reminder: use Cambridge-style assignment <- in pseudocode. Java uses = for assignment.
<!-- stage10-explanations:end -->
