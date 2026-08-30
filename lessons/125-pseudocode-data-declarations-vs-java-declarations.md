# Lesson 125: Pseudocode data declarations vs Java declarations

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Pseudocode data declarations vs Java declarations**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Pseudocode data declarations vs Java declarations** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Pseudocode data declarations vs Java declarations, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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
- Answer one 4-mark question about **Pseudocode data declarations vs Java declarations**. Follow its command word and apply each point to the stated context.

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

### Cambridge array bounds are stated explicitly

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-arrays.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-assignment.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-constants.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-principle.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-records.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-sorter.jpg`

1. Syntax sorter
2. Click a statement to identify whether it is pseudocode or Java-style.

### Map concepts, not spelling

- **Explains:** `types`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-types.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-variables.jpg`

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
