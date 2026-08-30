# Lesson 130: Selection and loop structures

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Selection and loop structures

### Direct explanation

- Use IF...THEN...ELSE...ENDIF when a Boolean condition selects between paths. An ELSE clause supplies the false path. In nested IF statements, every inner and outer IF must be closed and the indentation must show which ELSE belongs to which IF.
- Use CASE...OF...OTHERWISE...ENDCASE when one expression is compared with several discrete values. CASE is not a replacement for range or compound-condition decisions unless the stated values cover the requirement correctly.
- A count-controlled loop uses FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop starts. The counter, start value and end value define the iterations; NEXT closes the loop.
- Match the loop bounds to the declared data. Initialise accumulators before the loop, update them inside it and output a final result after the loop unless intermediate output is explicitly required.
- Justify FOR from the problem: it is well suited when the count or bounds are known, but a pre-condition or post-condition loop is better when the number of repetitions depends on input or a stopping condition.
- A WHILE...ENDWHILE loop is a pre-condition loop: it tests before the body and may run zero times. A REPEAT...UNTIL loop is a post-condition loop: it executes the body before testing and therefore runs at least once. A FOR...NEXT loop is count-controlled.
- Select and justify the loop structure from the problem: use FOR when the count is known, WHILE when execution may be unnecessary and continuation is tested first, and REPEAT when the body must run once before a stopping condition can be tested. The justification must use the scenario, not only say that one loop is easier.

### Worked example

**Nested IF and CASE / Total a fixed array / Choose the loop from the stopping rule:** For a grade, an outer IF tests Mark >= 80; its ELSE contains an inner IF testing Mark >= 50; each IF closes with ENDIF. For a menu, CASE Choice OF maps 1, 2 and 3 to actions and OTHERWISE handles every unlisted value before ENDCASE. For Marks[1:30], set Total <- 0, use FOR Index <- 1 TO 30, add Marks[Index] to Total, close with NEXT Index and output Total after all thirty elements have been processed. Input validation must request a value at least once, so REPEAT; INPUT Mark; UNTIL Mark >= 0 AND Mark <= 100 is suitable. Processing records while a file is not at EOF can use WHILE because an empty file may require zero iterations. Processing twelve months uses FOR because the count is fixed.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. How many ENDIF statements close two nested IF statements?
   **Answer:** Two: one closes the inner IF and one closes the outer IF.
2. When is CASE suitable?
   **Answer:** When one expression has several discrete values that map to separate branches.
3. What handles an unlisted CASE value?
   **Answer:** OTHERWISE, followed by ENDCASE for the complete structure.
4. Why is FOR suitable for Marks[1:30]?
   **Answer:** The 30 iterations and valid index bounds are known before the loop starts.
5. Where is Total initialised?
   **Answer:** Once before the loop.
6. Which keyword closes the count-controlled loop?
   **Answer:** NEXT followed by the counter name.
7. Which structure may execute zero times?
   **Answer:** WHILE, because it tests its condition before the body.
8. Which structure must execute at least once?
   **Answer:** REPEAT...UNTIL, because it tests after the body.
9. Why is FOR suitable for twelve months?
   **Answer:** The twelve repetitions are known before execution.

### Exam-style question and MS

**Question (16 marks):** Write Cambridge pseudocode that inputs Age and Member, outputs Adult member when Age is at least 18 and Member is TRUE, Adult non-member for other adults, and Child otherwise. Then state why nested IF is appropriate. Write Cambridge pseudocode to input and total exactly 12 monthly values, then output the total. Explain why the selected loop is count-controlled. Suggest and justify FOR, WHILE or REPEAT...UNTIL for (a) processing 50 array elements, (b) reading while a file is not at EOF, and (c) requesting a password at least once until correct.

| Answer | Guidance | Marks |
|---|---|---:|
| inputs/uses both Age and Member | Do not use CASE for overlapping ranges without a complete mapping or close two IF statements with only one ENDIF. Do not use an eleven- or thirteen-iteration bound or reset the accumulator inside the loop. Do not select a loop only by its spelling or claim that WHILE always executes once. | 1 |
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
1. Use the programming construct involved in **Condition-controlled loops**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Condition-controlled loops** from the most closely related syllabus concept?

## Guided Explanation
For Condition-controlled loops, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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

```text
// Cambridge-style pseudocode
INPUT Value
WHILE Value < 1 OR Value > 10
    OUTPUT "Enter a value from 1 to 10"
    INPUT Value
ENDWHILE
```

```java
// Java support example only, not exam pseudocode
while (value < 1 || value > 10) {
    System.out.println("Enter a value from 1 to 10");
    value = input.nextInt();
}
```

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
- Answer one 4-mark question about **Condition-controlled loops**. Follow its command word and apply each point to the stated context.

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

### Use CASE for clear values of one expression

- **Explains:** `case`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-case.jpg`

1. CASE compares one expression with several discrete values.
2. Each listed value has its own action and OTHERWISE handles unlisted values.
3. Close the complete multi-way selection with ENDCASE.

### The difference is when the condition is tested

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-compare.jpg`

1. WHILE vs REPEAT
2. REPEAT...UNTIL
3. Condition checked
4. before the loop body
5. after the loop body
6. Minimum iterations
7. Continues when
8. condition is TRUE
9. UNTIL condition becomes TRUE
10. Typical use
11. read while not EOF, repeat while invalid
12. input validation where input must be requested once

### A FOR loop has a counter, a start value and an end value

- **Explains:** `for`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-for.jpg`

1. FOR loop structure
2. General pattern
3. FOR Counter <- StartValue TO EndValue
4. // repeated statements
5. NEXT Counter
6. Concrete example
7. Total <- 0
8. FOR Count <- 1 TO 5
9. Total <- Total + Count
10. NEXT Count
11. OUTPUT Total
12. Use a FOR loop when the number of repetitions is known before the loop starts.

### Java syntax is support, not Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. WHILE Mark < 0 OR Mark > 100
4. INPUT Mark
5. ENDWHILE
6. Java support example only
7. while (mark < 0 || mark > 100) {
8. mark = scanner.nextInt();

### Post-condition loop: run once, then check

- **Explains:** `repeat`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-repeat.jpg`

1. A REPEAT...UNTIL loop checks its condition after executing the body.
2. Place INPUT Mark once inside REPEAT so each attempt obtains one value.
3. Do not add a duplicate INPUT before the loop.
4. Stop when Mark is between 0 and 100 inclusive.

### A special value can stop the loop

- **Explains:** `sentinel`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-sentinel.jpg`

1. Initialise Total and input the first Number before WHILE.
2. While Number is not -1, add Number to Total and input the next Number.
3. The repeated input changes the condition and allows the loop to terminate.
4. The sentinel -1 stops the loop and is not included in Total.

### Keep asking until the input is valid

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-validation.jpg`

1. Validation pattern
2. REPEAT version
3. OUTPUT "Enter mark 0 to 100"
4. INPUT Mark
5. UNTIL Mark >= 0 AND Mark <= 100
6. WHILE version
7. WHILE Mark < 0 OR Mark > 100
8. OUTPUT "Invalid"
9. ENDWHILE

### Pre-condition loop: check before running

- **Explains:** `while`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-while.jpg`

1. A WHILE loop checks its condition before each iteration and may run zero times.
2. Input Password before testing whether it differs from CorrectPassword.
3. Inside the loop, output the retry message and input a replacement Password.
4. Output Access granted only after the WHILE condition becomes false.
<!-- stage10-explanations:end -->
