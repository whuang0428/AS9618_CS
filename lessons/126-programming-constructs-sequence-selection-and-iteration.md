# Lesson 126: Programming constructs: sequence, selection and iteration

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Cambridge pseudocode statements, selection and loop constructs

### Direct explanation

- Section 11.1 requires pseudocode for the declaration and initialisation of constants, declaration of variables, assignment of values, arithmetic or logical expressions entered from the keyboard, and input to or output from the console. These are connected statements, not isolated vocabulary.
- CONSTANT defines and initialises a fixed named value. DECLARE gives a variable a name and data type. Assignment evaluates the expression on the right of <- and stores the result in the variable on the left. INPUT obtains a value from the keyboard; OUTPUT sends a value to the console.
- Arithmetic expressions use operators such as +, -, *, /, DIV and MOD. Logical expressions combine comparisons with AND, OR or NOT and produce BOOLEAN results. Use = for comparison and <- for assignment.
- Use IF...THEN...ELSE...ENDIF when a Boolean condition selects between paths. An ELSE clause supplies the false path. In nested IF statements, every inner and outer IF must be closed and the indentation must show which ELSE belongs to which IF.
- Use CASE...OF...OTHERWISE...ENDCASE when one expression is compared with several discrete values. CASE is not a replacement for range or compound-condition decisions unless the stated values cover the requirement correctly.
- A count-controlled loop uses FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop starts. The counter, start value and end value define the iterations; NEXT closes the loop.
- Match the loop bounds to the declared data. Initialise accumulators before the loop, update them inside it and output a final result after the loop unless intermediate output is explicitly required.
- Justify FOR from the problem: it is well suited when the count or bounds are known, but a pre-condition or post-condition loop is better when the number of repetitions depends on input or a stopping condition.
- A WHILE...ENDWHILE loop is a pre-condition loop: it tests before the body and may run zero times. A REPEAT...UNTIL loop is a post-condition loop: it executes the body before testing and therefore runs at least once. A FOR...NEXT loop is count-controlled.
- Select and justify the loop structure from the problem: use FOR when the count is known, WHILE when execution may be unnecessary and continuation is tested first, and REPEAT when the body must run once before a stopping condition can be tested. The justification must use the scenario, not only say that one loop is easier.

### Worked example

**Declare, input, calculate and output / Nested IF and CASE / Total a fixed array / Choose the loop from the stopping rule:** CONSTANT PassMark = 50 defines and initialises a constant. DECLARE Mark : INTEGER and DECLARE Passed : BOOLEAN declare variables. INPUT Mark obtains keyboard input; Passed <- Mark >= PassMark assigns the result of a logical expression; OUTPUT Mark * 2 and OUTPUT Passed send arithmetic and Boolean results to the console. For a grade, an outer IF tests Mark >= 80; its ELSE contains an inner IF testing Mark >= 50; each IF closes with ENDIF. For a menu, CASE Choice OF maps 1, 2 and 3 to actions and OTHERWISE handles every unlisted value before ENDCASE. For Marks[1:30], set Total <- 0, use FOR Index <- 1 TO 30, add Marks[Index] to Total, close with NEXT Index and output Total after all thirty elements have been processed. Input validation must request a value at least once, so REPEAT; INPUT Mark; UNTIL Mark >= 0 AND Mark <= 100 is suitable. Processing records while a file is not at EOF can use WHILE because an empty file may require zero iterations. Processing twelve months uses FOR because the count is fixed.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What is the difference between = and <-?
   **Answer:** = compares values; <- assigns the evaluated right-hand value to a variable.
2. Which statement obtains keyboard input?
   **Answer:** INPUT followed by the target variable.
3. What type of result does Mark >= PassMark produce?
   **Answer:** A BOOLEAN result, TRUE or FALSE.
4. How many ENDIF statements close two nested IF statements?
   **Answer:** Two: one closes the inner IF and one closes the outer IF.
5. When is CASE suitable?
   **Answer:** When one expression has several discrete values that map to separate branches.
6. What handles an unlisted CASE value?
   **Answer:** OTHERWISE, followed by ENDCASE for the complete structure.
7. Why is FOR suitable for Marks[1:30]?
   **Answer:** The 30 iterations and valid index bounds are known before the loop starts.
8. Where is Total initialised?
   **Answer:** Once before the loop.
9. Which keyword closes the count-controlled loop?
   **Answer:** NEXT followed by the counter name.
10. Which structure may execute zero times?
   **Answer:** WHILE, because it tests its condition before the body.
11. Which structure must execute at least once?
   **Answer:** REPEAT...UNTIL, because it tests after the body.
12. Why is FOR suitable for twelve months?
   **Answer:** The twelve repetitions are known before execution.

### Exam-style question and MS

**Question (21 marks):** Write Cambridge pseudocode that defines and initialises constant TaxRate as 0.20, declares Price and Tax as REAL, inputs Price, assigns Price * TaxRate to Tax, and outputs Tax. Write Cambridge pseudocode that inputs Age and Member, outputs Adult member when Age is at least 18 and Member is TRUE, Adult non-member for other adults, and Child otherwise. Then state why nested IF is appropriate. Write Cambridge pseudocode to input and total exactly 12 monthly values, then output the total. Explain why the selected loop is count-controlled. Suggest and justify FOR, WHILE or REPEAT...UNTIL for (a) processing 50 array elements, (b) reading while a file is not at EOF, and (c) requesting a password at least once until correct.

| Answer | Guidance | Marks |
|---|---|---:|
| CONSTANT TaxRate = 0.20 | Do not use = for assignment, omit the constant initial value, or replace INPUT/OUTPUT with Java library calls. Do not use CASE for overlapping ranges without a complete mapping or close two IF statements with only one ENDIF. Do not use an eleven- or thirteen-iteration bound or reset the accumulator inside the loop. Do not select a loop only by its spelling or claim that WHILE always executes once. | 1 |
| declares Price and Tax as REAL |  | 1 |
| INPUT Price before the calculation |  | 1 |
| Tax <- Price * TaxRate |  | 1 |
| OUTPUT Tax after assignment |  | 1 |
| inputs/uses both Age and Member |  | 1 |
| outer IF tests Age >= 18 |  | 1 |
| inner IF tests Member only on the adult path |  | 1 |
| three outputs are attached to the correct branches |  | 1 |
| closes both IF statements coherently |  | 1 |
| justifies nested selection because the membership decision depends on the age decision |  | 1 |
| initialises Total before repetition |  | 1 |
| uses FOR Month <- 1 TO 12 or an equivalent twelve-iteration range |  | 1 |
| inputs a value and adds it inside the loop |  | 1 |
| closes with NEXT and outputs Total after the loop |  | 1 |
| justifies FOR because the repetition count is known in advance |  | 1 |
| FOR for 50 known elements |  | 1 |
| justifies fixed count/bounds |  | 1 |
| WHILE for the pre-tested EOF condition and possible empty file |  | 1 |
| REPEAT...UNTIL for password input that must occur once |  | 1 |
| distinguishes pre-condition, post-condition and count-controlled structures |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Programming constructs: sequence, selection, and iteration**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Programming constructs: sequence, selection, and iteration** from the most closely related syllabus concept?

## Guided Explanation
For Programming constructs: sequence, selection, and iteration, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: construct purpose. Middle: Cambridge pseudocode. Right: Java comparison and trace.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case.

**Worked answer / marking focus:** Credit correct control flow, meaningful identifiers, correct parameter or variable use, and test data that actually exercises the construct.

## Student Task
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Programming constructs: sequence, selection, and iteration**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Three control-flow ideas

- **Explains:** `constructs`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-constructs.jpg`

1. Sequence answers what happens next and depends on statement order.
2. Selection answers which path is taken and uses IF or CASE structures.
3. Iteration answers what repeats and when repetition stops.
4. FOR, WHILE and REPEAT are iteration forms with different controls.

### Loops repeat with control

- **Explains:** `iteration`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-iteration.jpg`

1. A FOR loop uses a counter range and checks whether the next iteration is within its bounds.
2. A FOR loop may execute zero times when its bounds are incompatible.
3. A WHILE loop checks its condition before each iteration and may execute zero times.
4. A REPEAT loop checks after the body and therefore runs at least once.

### Same logic, different exam language

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-java.jpg`

1. Cambridge pseudocode uses IF, THEN, ELSE and ENDIF for a two-way selection.
2. Mark 50 follows the pass branch when the condition uses greater than or equal to 50.
3. Java braces may support understanding but are not Cambridge pseudocode.

### The symbol changes, the update idea does not

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
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

### Conditions decide the path

- **Explains:** `selection`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-selection.jpg`

1. Use IF for a Boolean condition or range and close it with ENDIF.
2. Use CASE for several discrete values of one expression and close it with ENDCASE.
3. Test marks 49, 50 and 51 to verify the pass boundary.

### Order changes meaning

- **Explains:** `sequence`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-sequence.jpg`

1. Sequence
2. Correct order
3. INPUT Price
4. INPUT Quantity
5. Total <- Price * Quantity
6. OUTPUT Total
7. Wrong order
8. A sequence is simple, but not optional. Using a value before it has been input is algorithmic optimism, not a method.

### Run a small loop by hand

- **Explains:** `tracer`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-tracer.jpg`

1. Interactive trace
2. FOR Count <- 1 TO
3. Choose a loop limit to build a trace table.
<!-- stage10-explanations:end -->
