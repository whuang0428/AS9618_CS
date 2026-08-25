# Lesson 114: Constants, variables, and assignment

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
