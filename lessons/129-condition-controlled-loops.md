# Lesson 129: Condition-controlled loops

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

### The difference is when the condition is tested

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-compare.jpg`

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

### Java syntax is support, not Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-java.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-repeat.jpg`

1. A REPEAT...UNTIL loop checks its condition after executing the body.
2. Place INPUT Mark once inside REPEAT so each attempt obtains one value.
3. Do not add a duplicate INPUT before the loop.
4. Stop when Mark is between 0 and 100 inclusive.

### A special value can stop the loop

- **Explains:** `sentinel`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-sentinel.jpg`

1. Initialise Total and input the first Number before WHILE.
2. While Number is not -1, add Number to Total and input the next Number.
3. The repeated input changes the condition and allows the loop to terminate.
4. The sentinel -1 stops the loop and is not included in Total.

### Keep asking until the input is valid

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-validation.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-while.jpg`

1. A WHILE loop checks its condition before each iteration and may run zero times.
2. Input Password before testing whether it differs from CorrectPassword.
3. Inside the loop, output the retry message and input a replacement Password.
4. Output Access granted only after the WHILE condition becomes false.
<!-- stage10-explanations:end -->
