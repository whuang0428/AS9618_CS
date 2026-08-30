# Lesson 114: Select and use the official Cambridge data types

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** user-defined record types before the formal records requirement. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S10.01 official data types; S10.02 records must precede this extension.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Select and use the official Cambridge data types

### Direct explanation

- Select a type from the meaning and operations required by the problem. INTEGER stores whole numbers, REAL stores values that may contain a fractional part, CHAR stores one character, STRING stores a sequence of characters, BOOLEAN stores TRUE or FALSE, and DATE stores a calendar date.
- Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE. ARRAY and FILE describe structured or persistent data; their declarations also state an element type, bounds or file usage as required by the problem.
- An identifier that contains digits is not automatically INTEGER. Codes, telephone numbers and identifiers with leading zeroes normally use STRING because arithmetic is not required. Type selection does not replace validation of permitted values.

### Worked example

**Choose types for a booking:** Use STRING for BookingCode because it may contain letters or leading zeroes; DATE for VisitDate; INTEGER for TicketCount; REAL for TotalCost; CHAR for a one-letter Zone; BOOLEAN for HasPaid; ARRAY for a fixed indexed set of attendee names; and FILE when bookings must persist between program runs.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Suggest a type for the initial M.
   **Answer:** CHAR, because exactly one character is stored.
2. Suggest a type for 18.75 used in arithmetic.
   **Answer:** REAL, because the value has a fractional part.
3. Why is 0045A a STRING?
   **Answer:** It is an identifier containing a letter and significant leading zeroes, and arithmetic is not required.
4. Identify the eight type names listed in the syllabus Notes.
   **Answer:** INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.

### Exam-style question and MS

**Question (8 marks):** Select and justify suitable Cambridge types for CustomerName, MiddleInitial, DateJoined, ItemCount, MeanScore, IsActive, twenty marks and data that must remain after the program ends.

| Answer | Guidance | Marks |
|---|---|---:|
| STRING for CustomerName | Do not select a numeric type merely because an identifier contains digits, and do not use STRING as a generic replacement for DATE, CHAR or numeric values that require their defined operations. | 1 |
| CHAR for MiddleInitial |  | 1 |
| DATE for DateJoined |  | 1 |
| INTEGER for ItemCount |  | 1 |
| REAL for MeanScore |  | 1 |
| BOOLEAN for IsActive |  | 1 |
| ARRAY with a numeric element type for twenty indexed marks |  | 1 |
| FILE for persistent data, with justifications linked to meaning or use |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-built-in.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-choose.jpg`

1. INTEGER stores whole numbers and REAL stores values that may have a fractional part.
2. Both INTEGER and REAL values can be used in arithmetic.
3. First decide whether a value is numeric, then choose INTEGER for whole-only values or REAL when fractions are possible.

### The eight Cambridge pseudocode type names

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-pseudocode.jpg`

1. Cambridge pseudocode uses INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE for scalar values.
2. The Version 2 Notes also name ARRAY and FILE among the pseudocode data types.
3. Select a type from the value's meaning and required operations; numeric-looking identifiers may still require STRING.

### When built-in types are not descriptive enough

- **Explains:** `user-defined`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-user-defined.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-114-why-types.jpg`

1. A data type determines which operations are meaningful for a stored value.
2. A BOOLEAN can control a decision and a DATE can be compared with another date.
3. Close every structured IF example with ENDIF.
4. Choosing the correct type does not replace validation against the problem's allowed range.
<!-- stage10-explanations:end -->
