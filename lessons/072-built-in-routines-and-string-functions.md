# Lesson 072: Built-in routines and string functions

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.03<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 071: Arithmetic and logical expressions.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Built-in and string functions (S11.03)

**Concept map:** built-in → string → functions

**Three-part explanation:**

1. Any function not given in the pseudocode guide will be provided
2. string manipulation functions will always be given in the question
3. Use built-in functions and library routines

**Concrete cue:** Use built-in functions and library routines. Any function not given in the pseudocode guide will be provided; string manipulation functions will always be given in the question.

#### Use the string-function definition supplied in the question

![Use the string-function definition supplied in the question](../web/assets/diagrams/stage10-infographics/stage10-lesson-134-substring.jpg)

<details><summary>Text transcript</summary>

- String manipulation functions are supplied in the question; use the stated name, parameter order and position convention.
- Trace the supplied routine exactly, then use its returned string in an assignment, comparison, output or expression.
- Do not import Java's zero-based substring convention or memorise an unstated course-specific signature.

</details>

#### Test a built-in function

![Test a built-in function](../web/assets/diagrams/stage10-infographics/stage10-lesson-134-lab.jpg)

<details><summary>Text transcript</summary>

- Interactive string lab
- Use a short string and compare the returned value. For MID , positions start at 1.
- Function
- Choose a function and run it.

</details>

#### Use functions for returned values and procedures for actions

![Use functions for returned values and procedures for actions](../web/assets/diagrams/stage10-infographics/stage10-lesson-142-subroutines.jpg)

<details><summary>Text transcript</summary>

- A function returns a value; a procedure performs an action.
- IsPass returns a BOOLEAN based on whether Mark is at least 50.
- Close the function's IF with ENDIF before ENDFUNCTION.
- DisplayResult outputs its parameters and returns no value.

</details>

<details><summary>Precise syllabus wording</summary>

Use built-in/library and string functions.

Use built-in functions and library routines. Any function not given in the pseudocode guide will be provided; string manipulation functions will always be given in the question.

</details>

### Supporting diagram library

#### FOR loops are natural for fixed array bounds

![FOR loops are natural for fixed array bounds](../web/assets/diagrams/stage10-infographics/stage10-lesson-129-arrays.jpg)

<details><summary>Text transcript</summary>

- Array processing
- Output all marks
- FOR Index <- 1 TO 30
- OUTPUT Marks[Index]
- NEXT Index
- Total all marks
- Total <- 0
- Total <- Total + Marks[Index]

</details>

#### One wrong bound can miss or invent an iteration

![One wrong bound can miss or invent an iteration](../web/assets/diagrams/stage10-infographics/stage10-lesson-129-bounds.jpg)

<details><summary>Text transcript</summary>

- Bounds and off-by-one errors
- Counter values
- Iterations
- Common issue
- 1, 2, 3, 4, 5
- 0, 1, 2, 3, 4
- only if array uses 0-based bounds
- 1, 2, 3, 4

</details>

#### Do not confuse the counter with the running total

![Do not confuse the counter with the running total](../web/assets/diagrams/stage10-infographics/stage10-lesson-129-counter.jpg)

<details><summary>Text transcript</summary>

- Counter and accumulator
- Variable
- loop counter; controls the current iteration
- 1, 2, 3, 4, 5
- accumulator; stores a running total
- 0, 1, 3, 6, 10, 15
- bound; controls where the loop stops
- 5 in 1 TO 5

</details>

#### Java for loops are useful, but not the exam answer format

![Java for loops are useful, but not the exam answer format](../web/assets/diagrams/stage10-infographics/stage10-lesson-129-java.jpg)

<details><summary>Text transcript</summary>

- Java support only
- Cambridge-style pseudocode
- FOR Count <- 1 TO 5
- OUTPUT Count
- NEXT Count
- Java support example only
- for (int count = 1; count <= 5; count++) {
- System.out.println(count);

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Use built-in functions and library routines. Any function not given in the pseudocode guide will be provided; string manipulation functions will always be given in the question.
- Read the supplied function name, parameter order, position convention and returned type before using it. LENGTH is a familiar built-in example; LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
- A function call returns a value, so it can be assigned, compared, output or combined in an expression. Do not import Java's zero-based substring convention unless the question explicitly specifies it.
- For built-in routines and string functions, identify the required concept before describing its mechanism or consequence.

</details>

### Worked example

1. Apply a supplied string routine
2. A question supplies FUNCTION EXTRACT(Text
3. INTEGER) RETURNS STRING and states that positions start at 1.
4. LENGTH("NETWORK") returns 7; EXTRACT("NETWORK", 4, 2) returns "WO".
5. Code <- EXTRACT(Name, 1, 3) uses the supplied routine in an assignment without importing Java indexing.

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

- Define built-in routines and string functions with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For built-in routines and string functions, use the exact technical term before applying it to the scenario.
