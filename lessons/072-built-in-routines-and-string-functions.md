# Lesson 072: Built-in routines and string functions

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.03<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 071: Arithmetic and logical expressions.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Built-in/library and string functions (S11.03)

**Atomic learning targets**

- **S11.03.A01:** built-in / library
- **S11.03.A02:** string
- **S11.03.A03:** functions

**Core explanation**

- Read the supplied function name, parameter order, position convention and returned type before using it. LENGTH is a familiar built-in example; LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
- String manipulation functions are supplied in the question; use the stated name, parameter order and position convention. Trace the supplied routine exactly, then use its returned string in an assignment, comparison, output or expression.
- A function call returns a value, so it can be assigned, compared, output or combined in an expression. Do not import Java's zero-based substring convention unless the question explicitly specifies it.

**Mechanism or method**

1. **Set up the required data and conditions** — Read the supplied function name, parameter order, position convention and returned type before using it.
2. **Carry out the complete method** — LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
3. **Trace or test the result** — String manipulation functions are supplied in the question;

#### Worked example: Built-in/library and string functions: complete worked route

1. **Set up the required data and conditions**

Read the supplied function name, parameter order, position convention and returned type before using it.

2. **Carry out the complete method**

LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.

3. **Trace or test the result**

String manipulation functions are supplied in the question;

4. **Complete example**

Apply a supplied string routine: A question supplies FUNCTION EXTRACT(Text : STRING, Start : INTEGER, Count : INTEGER) RETURNS STRING and states that positions start at 1.

**Misconceptions to correct**

- Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

#### Mastery check (MC-L072-S11.03)

Complete a fresh example that demonstrates every target: built-in / library; string; functions. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Read the supplied function name, parameter order, position convention and returned type before using it. LENGTH is a familiar built-in example; LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
- String manipulation functions are supplied in the question; use the stated name, parameter order and position convention. Trace the supplied routine exactly, then use its returned string in an assignment, comparison, output or expression.
- A function call returns a value, so it can be assigned, compared, output or combined in an expression. Do not import Java's zero-based substring convention unless the question explicitly specifies it.

</details>

**Supplementary concept map**

- **Built-in:** Available without user definition
- **Library:** Reusable supplied routine
- **String function:** Question provides unfamiliar syntax
- **Return value:** Result used by the algorithm
- **string:** Built-in/library and string functions.
- **functions:** Built-in functions and library routines.

**Supplementary three-step recap**

1. **Translate the stated design** — Built-in/library and string functions.
2. **Apply one complete operation** — Built-in functions and library routines.
3. **Trace state and boundaries** — For built-in routines and string functions, identify the required concept before describing its mechanism or consequence.

**Use the string-function definition supplied in the question:** String manipulation functions are supplied in the question; use the stated name, parameter order and position convention. Trace the supplied routine exactly, then use its returned string in an assignment, comparison, output or expression.

#### Use the string-function definition supplied in the question

![Use the string-function definition supplied in the question](../web/assets/diagrams/stage10-infographics/stage10-lesson-134-substring.jpg)

<details><summary>Text transcript</summary>

- String manipulation functions are supplied in the question; use the stated name, parameter order and position convention.
- Trace the supplied routine exactly, then use its returned string in an assignment, comparison, output or expression.
- Do not import Java's zero-based substring convention or memorise an unstated course-specific signature.

</details>

<details><summary>Precise syllabus wording</summary>

Use built-in/library and string functions.

Use built-in functions and library routines. Any function not given in the pseudocode guide will be provided; string manipulation functions will always be given in the question.

</details>

### Lesson technical reference

- Use built-in functions and library routines. Any function not given in the pseudocode guide will be provided; string manipulation functions will always be given in the question.
- Read the supplied function name, parameter order, position convention and returned type before using it. LENGTH is a familiar built-in example; LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
- A function call returns a value, so it can be assigned, compared, output or combined in an expression. Do not import Java's zero-based substring convention unless the question explicitly specifies it.
- For built-in routines and string functions, identify the required concept before describing its mechanism or consequence.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

Will an unfamiliar string manipulation function be supplied?

**Answer:** Yes. The syllabus says string manipulation functions will always be given.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - state - 4 marks

A question supplies FUNCTION TAKE(Text : STRING, Start : INTEGER, Count : INTEGER) RETURNS STRING and FUNCTION TOUPPER(Text : STRING) RETURNS STRING, with positions starting at 1. State LENGTH("ALGORITHM"), state TAKE("ALGORITHM", 3, 4), and write an assignment that converts the extracted STRING to upper case.

**Answer:** LENGTH result is 9; TAKE result is GORI; uses the supplied Start/Count convention rather than Java indexing; assigns TOUPPER(TAKE("ALGORITHM", 3, 4)) or equivalent to a variable

**Marking guidance:** Do not use CHAR-only UCASE on a STRING, require memorisation of an unstated substring signature or import Java's zero-based indexes.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

May a returned string be assigned to a variable?

**Answer:** Yes; a function return can be used wherever a compatible value is needed.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/23/W/25 Q4 | 6 | complete | calculate |
| 9618/21/S/25 Q7(ii) | 4 | explain | explain |
| 9618/23/W/25 Q1(a) | 3 | design | recall |
| 9618/23/S/25 Q1(iii) | 2 | state | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S11.03: explain built-in / library, string, functions.
- S11.03 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For built-in routines and string functions, use the exact technical term before applying it to the scenario.
