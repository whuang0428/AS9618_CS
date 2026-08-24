# Lesson 126: Programming constructs: sequence, selection, and iteration

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-constructs.jpg`

1. Core constructs
2. Construct
3. Question it answers
4. Pseudocode clue
5. Typical error
6. Sequence
7. What happens next?
8. statements listed one after another
9. wrong order of assignment
10. Selection
11. Which path is taken?
12. IF...THEN...ELSE...ENDIF, CASE

### Loops repeat with control

- **Explains:** `iteration`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-iteration.jpg`

1. Iteration
2. Use when
3. Condition checked
4. number of repetitions is known
5. by counter range
6. wrong start/end value
7. may repeat zero or more times
8. before each iteration
9. condition never changes
10. REPEAT...UNTIL
11. must run at least once
12. after each iteration

### Same logic, different exam language

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. IF Mark >= 50 THEN
4. OUTPUT "Pass"
5. OUTPUT "Resit needed"
6. Java support example only
7. if (mark >= 50) {
8. System.out.println("Pass");
9. } else {
10. System.out.println("Resit needed");

### Conditions decide the path

- **Explains:** `selection`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-selection.jpg`

1. Selection
2. IF selection
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit needed"
7. CASE selection
8. CASE Grade OF
9. "A" : OUTPUT "Excellent"
10. "B" : OUTPUT "Good"
11. OTHERWISE OUTPUT "Check grade"
12. Boundary tests matter: Mark = 49, 50 and 51 reveal whether the condition is correct.

### Order changes meaning

- **Explains:** `sequence`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-126-tracer.jpg`

1. Interactive trace
2. FOR Count <- 1 TO
3. Choose a loop limit to build a trace table.
<!-- stage10-explanations:end -->
