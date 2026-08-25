# Lesson 113: Data types: integer, real, Boolean, char, string, date, and user-defined types

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Data types: integer, real, Boolean, char, string, date, and user-defined types**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Data types: integer, real, Boolean, char, string, date, and user-defined types** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Data types: integer, real, Boolean, char, string, date, and user-defined types, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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
- Answer one 4-mark question about **Data types: integer, real, Boolean, char, string, date, and user-defined types**. Follow its command word and apply each point to the stated context.

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

1. INTEGER stores whole numbers and REAL stores values that may have a fractional part.
2. Both INTEGER and REAL values can be used in arithmetic.
3. First decide whether a value is numeric, then choose INTEGER for whole-only values or REAL when fractions are possible.

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

1. TYPE TStudent
    DECLARE Name : STRING
    DECLARE Mark : INTEGER
ENDTYPE
2. Fields of different data types are declared between TYPE and ENDTYPE.
3. DECLARE Student1 : TStudent
Declare variables of the record type only after ENDTYPE.

### A type controls meaning and valid operations

- **Explains:** `why-types`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-113-why-types.jpg`

1. A data type determines which operations are meaningful for a stored value.
2. A BOOLEAN can control a decision and a DATE can be compared with another date.
3. Close every structured IF example with ENDIF.
4. Choosing the correct type does not replace validation against the problem's allowed range.
<!-- stage10-explanations:end -->
