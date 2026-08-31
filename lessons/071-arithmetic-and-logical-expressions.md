# Lesson 071: Arithmetic and logical expressions

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.02<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.01, S9.06 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Select and use appropriate types for a problem solution. The Version 2 Notes name integer, real, char, string, Boolean and date, and require the Cambridge pseudocode type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
- Understand integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.
- The three basic algorithm constructs are sequence, selection and iteration (repetition); students must recognise and use each construct, including combinations of constructs.
- Understand and use sequence, selection and iteration.


## 2. Knowledge explanation

### 1. Declaration · Constants · Variables · Assignment (S11.02)

**Concept map:** declaration → constants → variables → assignment → arithmetic → logical → input → output

**Three-part explanation:**

1. Write pseudocode for declaration and initialisation of constants
2. expressions using arithmetic or logical operators
3. Arithmetic expressions use operators such as +, -, , /, DIV and MOD

**Concrete cue:** Write pseudocode for declaration and initialisation of constants; declaration of variables; assignment of values; expressions using arithmetic or logical operators; input from the keyboard; and output to the console.

#### Translate a flowchart or structured English into pseudocode

![Translate a flowchart or structured English into pseudocode](../web/assets/diagrams/stage10-infographics/stage10-lesson-141-standard.jpg)

<details><summary>Text transcript</summary>

- Follow a flowchart from Start: translate input/output symbols, decisions, branches and loop-back arrows without losing a path.
- From structured English, preserve the controlled verbs, conditions and indentation when selecting Cambridge pseudocode constructs.
- Dry-run the source description and pseudocode with the same data; matching paths and outputs confirm equivalence.

</details>

#### Operators combine values to calculate a result

![Operators combine values to calculate a result](../web/assets/diagrams/stage10-infographics/stage10-lesson-135-operators.jpg)

<details><summary>Text transcript</summary>

- Arithmetic operators
- Operator
- addition
- 7 + 3 = 10
- subtraction
- 7 - 3 = 4
- multiplication
- 7 3 = 21

</details>

#### OUTPUT displays text, values or expressions

![OUTPUT displays text, values or expressions](../web/assets/diagrams/stage10-infographics/stage10-lesson-136-output.jpg)

<details><summary>Text transcript</summary>

- Display text and values
- Name <- "Ada"
- Mark <- 72
- OUTPUT "Student: " & Name
- OUTPUT "Mark: " & Mark
- Displayed output
- Student: Ada
- Mark: 72

</details>

#### A string is a sequence of characters

![A string is a sequence of characters](../web/assets/diagrams/stage10-infographics/stage10-lesson-134-strings.jpg)

<details><summary>Text transcript</summary>

- Cambridge-style assignment
- Name <- "Ada"
- Message <- "Hello, " & Name
- OUTPUT Message
- Reasoning
- "Ada" is a string of three characters. & is used here for concatenation.
- If a question uses a different concatenation operator, follow the question. The mark is for clear string construction.

</details>

#### Local variables are declared inside a subroutine or block

![Local variables are declared inside a subroutine or block](../web/assets/diagrams/stage10-infographics/stage10-lesson-133-local.jpg)

<details><summary>Text transcript</summary>

- Local variables
- Cambridge-style pseudocode
- PROCEDURE CalculateBonus(Mark : INTEGER)
- Bonus <- Mark DIV 10
- OUTPUT Bonus
- ENDPROCEDURE
- Reasoning
- Mark parameter local to this procedure call

</details>

<details><summary>Precise syllabus wording</summary>

Use declarations, constants, variables, assignment, arithmetic/logical operations and input/output.

Write pseudocode for declaration and initialisation of constants; declaration of variables; assignment of values; expressions using arithmetic or logical operators; input from the keyboard; and output to the console.

</details>

### Supporting diagram library

#### Start with the shape of the decision

![Start with the shape of the decision](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-choice.jpg)

<details><summary>Text transcript</summary>

- Choosing IF or CASE
- Situation
- Usually better
- Pass if mark is at least 50
- uses a relational comparison
- Menu option 1, 2, 3 or invalid
- one variable has discrete values
- Adult members get one discount; adult non-members another

</details>

#### Use IF when a Boolean condition decides the route

![Use IF when a Boolean condition decides the route](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-if.jpg)

<details><summary>Text transcript</summary>

- IF selection
- Use when
- Cambridge-style pattern
- action is needed only when condition is true
- IF Found THEN ... ENDIF
- IF...ELSE
- two paths are needed
- IF Mark = 50 THEN ... ELSE ... ENDIF

</details>

#### Same idea, different syntax

![Same idea, different syntax](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-java.jpg)

<details><summary>Text transcript</summary>

- Cambridge pseudocode uses CASE...OF, OTHERWISE and ENDCASE.
- Java switch syntax may support understanding but is not Cambridge pseudocode.
- Both forms must preserve the same branch meanings.

</details>

#### A decision inside another decision

![A decision inside another decision](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-nested.jpg)

<details><summary>Text transcript</summary>

- Nested selection
- Discount example
- IF Age = 18 THEN
- IF Member = TRUE THEN
- Discount <- 0.20
- Discount <- 0.10
- Discount <- 0.05
- Trace the paths

</details>

#### Trace a nested IF

![Trace a nested IF](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-path.jpg)

<details><summary>Text transcript</summary>

- Interactive path tracer
- Enter values to trace which branch runs.

</details>

#### The symbol changes, the update idea does not

![The symbol changes, the update idea does not](../web/assets/diagrams/stage10-infographics/stage10-lesson-115-pseudocode.jpg)

<details><summary>Text transcript</summary>

- Pseudocode vs Java
- Cambridge-style pseudocode
- CONSTANT PassMark = 50
- DECLARE Mark : INTEGER
- DECLARE Passed : BOOLEAN
- INPUT Mark
- Passed <- Mark = PassMark
- Java support only

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Write pseudocode for declaration and initialisation of constants; declaration of variables; assignment of values; expressions using arithmetic or logical operators; input from the keyboard; and output to the console.
- CONSTANT defines and initialises a fixed named value. DECLARE gives a variable a name and data type. Assignment evaluates the expression on the right of <- and stores the result in the variable on the left. INPUT obtains a value from the keyboard; OUTPUT sends a value to the console.
- Arithmetic expressions use operators such as +, -, , /, DIV and MOD. Logical expressions combine comparisons with AND, OR or NOT and produce BOOLEAN results. Use = for comparison and <- for assignment.
- For arithmetic and logical expressions, identify the required concept before describing its mechanism or consequence.

</details>

### Worked example

1. Declare, input, calculate and output
2. CONSTANT PassMark = 50 defines and initialises a constant.
3. INTEGER and DECLARE Passed
4. BOOLEAN declare variables.
5. INPUT Mark obtains keyboard input; Passed <- Mark = PassMark assigns the result of a logical expression; OUTPUT Mark 2 and OUTPUT Passed send arithmetic and Boolean results to the console.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - state - 2 marks

State two precise facts about arithmetic and logical expressions.

**Answer:** Write pseudocode for declaration and initialisation of constants; declaration of variables; assignment of values; expressions using arithmetic or logical operators; input from the keyboard; and output to the console. CONSTANT defines and initialises a fixed named value. DECLARE gives a variable a name and data type. Assignment evaluates the expression on the right of <- and stores the result in the variable on the left. INPUT obtains a value from the keyboard; OUTPUT sends a value to the console.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** For the command word state, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 3 marks

Explain how arithmetic and logical expressions would be applied in a suitable computing context.

**Answer:** CONSTANT defines and initialises a fixed named value. DECLARE gives a variable a name and data type. Assignment evaluates the expression on the right of <- and stores the result in the variable on the left. INPUT obtains a value from the keyboard; OUTPUT sends a value to the console. Arithmetic expressions use operators such as +, -, , /, DIV and MOD. Logical expressions combine comparisons with AND, OR or NOT and produce BOOLEAN results. Use = for comparison and <- for assignment. For arithmetic and logical expressions, identify the required concept before describing its mechanism or consequence.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 4 marks

A student gives an incomplete answer about arithmetic and logical expressions. Correct it by giving the key distinction and one justified example.

**Answer:** Write pseudocode for declaration and initialisation of constants; declaration of variables; assignment of values; expressions using arithmetic or logical operators; input from the keyboard; and output to the console. CONSTANT defines and initialises a fixed named value. DECLARE gives a variable a name and data type. Assignment evaluates the expression on the right of <- and stores the result in the variable on the left. INPUT obtains a value from the keyboard; OUTPUT sends a value to the console. Arithmetic expressions use operators such as +, -, , /, DIV and MOD. Logical expressions combine comparisons with AND, OR or NOT and produce BOOLEAN results. Use = for comparison and <- for assignment. For arithmetic and logical expressions, identify the required concept before describing its mechanism or consequence.

**Marking guidance:** Credit the correction, the distinction, the example and its justification.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q3 | 8 | write | write |
| 9618/22/S/25 Q4 | 6 | complete | recall |
| 9618/21/S/25 Q1(b) | 5 | complete | calculate |
| 9618/23/S/25 Q1(i) | 2 | state | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define arithmetic and logical expressions with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For arithmetic and logical expressions, use the exact technical term before applying it to the scenario.
