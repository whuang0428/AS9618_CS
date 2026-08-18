# Lesson 113: Data types: integer, real, Boolean, char, string, date, and user-defined types

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Data types: integer, real, Boolean, char, string, date, and user-defined types** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Data types: integer, real, Boolean, char, string, date, and user-defined types** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Data types: integer, real, Boolean, char, string, date, and user-defined types, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Data types: integer, real, Boolean, char, string, date, and user-defined types**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Data types: integer, real, Boolean, char, string, date, and user-defined types**, not a generic example from the wider unit.

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
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Data types: integer, real, Boolean, char, string, date, and user-defined types** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Data types: integer, real, Boolean, char, string, date, and user-defined types**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Data types: integer, real, Boolean, char, string, date, and user-defined types** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Data types: integer, real, Boolean, char, string, date, and user-defined types** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **data types: integer, real, boolean, char, string, date, and user-defined types**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Core AS-level data types

- **Explains:** `built-in`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-113-built-in.jpg`

1. Built-in types
2. Good example
3. Do not use for
4. whole numbers
5. Score, Count, Quantity
6. values needing decimals
7. numbers with fractional parts
8. Temperature, Mass, Average
9. exact counters or indexes
10. TRUE or FALSE
11. Found, IsValid, HasPaid
12. more than two possible states

### Use the scenario, not the surface appearance

- **Explains:** `choose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-113-choose.jpg`

1. Choosing types
2. Question
3. Type direction
4. Will arithmetic be performed?
5. INTEGER or REAL
6. Can the value contain decimals?
7. Is the answer only true/false?
8. Is exactly one character stored?
9. Must leading zeros or letters be preserved?
10. Is the value a calendar date?
11. Exam wording tip: "suitable type" answers usually need both the type and a reason linked to the data.

### Same idea, different syntax

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-113-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style declarations
3. DECLARE Count : INTEGER
4. DECLARE Average : REAL
5. DECLARE Found : BOOLEAN
6. DECLARE Initial : CHAR
7. DECLARE Name : STRING
8. DECLARE BirthDate : DATE
9. Java support only
10. int count;
11. double average;
12. boolean found;

### When built-in types are not descriptive enough

- **Explains:** `user-defined`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-113-user-defined.jpg`

1. User-defined types
2. Enumerated type
3. Use an enumerated type when a value must be one of a named set of options.
4. TYPE TDay = (Monday, Tuesday, Wednesday, Thursday, Friday)
5. DECLARE Day : TDay
6. Composite type preview
7. A record groups fields of different types. Records are developed later, but the idea starts with type choice.
8. TYPE TStudent
9. DECLARE Name : STRING
10. DECLARE DateOfBirth : DATE
11. DECLARE Enrolled : BOOLEAN
12. Boundary: this lesson introduces user-defined type choice. Arrays and records get their own full lessons later.

### A type controls meaning and valid operations

- **Explains:** `why-types`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-113-why-types.jpg`

1. Why data types exist
2. 23 could be an age, a day of month, a count or part of an ID. The variable name and type make the intention explicit.
3. DECLARE Age : INTEGER
4. DECLARE StudentID : STRING
5. Operations
6. You can add two INTEGER values, compare DATE values, test a BOOLEAN, and join STRING values. The type narrows what is sensible.
7. IF IsValid = TRUE THEN
8. OUTPUT "Accepted"
9. Validation
10. Choosing a type does not replace validation. A DATE type stores a date; validation still checks whether a date is in an allowed range.
11. IF BirthDate > Today THEN
12. OUTPUT "Invalid"
<!-- stage10-explanations:end -->
