# Lesson 129: Condition-controlled loops

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Condition-controlled loops** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Condition-controlled loops** with a neighbouring syllabus idea?

## Guided Explanation
For Condition-controlled loops, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Condition-controlled loops**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: construct purpose. Middle: Cambridge pseudocode. Right: Java comparison and trace.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Condition-controlled loops**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct control flow, meaningful identifiers, correct parameter or variable use, and test data that actually exercises the construct.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Condition-controlled loops** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Condition-controlled loops**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Condition-controlled loops** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Condition-controlled loops** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **condition-controlled loops**.  
Correction prompt: "Show the mechanism, not just the label."

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

1. REPEAT...UNTIL loop
2. General pattern
3. // repeated statements
4. // update something used by Condition
5. UNTIL Condition
6. Input validation
7. INPUT Mark
8. UNTIL Mark >= 0 AND Mark <= 100
9. REPEAT...UNTIL is useful when the body must happen at least once, such as asking for the first input.

### A special value can stop the loop

- **Explains:** `sentinel`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-129-sentinel.jpg`

1. Sentinel values
2. Total until -1
3. Total <- 0
4. INPUT Number
5. WHILE Number <> -1
6. Total <- Total + Number
7. ENDWHILE
8. OUTPUT Total
9. Trace idea
10. Total after step
11. 11, stop
12. The sentinel value is used to stop the loop; it should not be included in the calculation.

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

1. WHILE loop
2. General pattern
3. WHILE Condition
4. // repeated statements
5. // update something used by Condition
6. ENDWHILE
7. Password example
8. INPUT Password
9. WHILE Password <> CorrectPassword
10. OUTPUT "Try again"
11. OUTPUT "Access granted"
12. A WHILE loop may run zero times if the condition is false before the first iteration.
<!-- stage10-explanations:end -->
