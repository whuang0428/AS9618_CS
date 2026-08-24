# Lesson 127: IF, CASE, and nested selection

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **IF, CASE, and nested selection**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **IF, CASE, and nested selection** from the most closely related syllabus concept?

## Guided Explanation
For IF, CASE, and nested selection, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
- Answer one 4-mark question about **IF, CASE, and nested selection**. Follow its command word and apply each point to the stated context.

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-127-case.jpg`

1. CASE selection
2. Menu choice
3. INPUT Choice
4. CASE Choice OF
5. 1 : OUTPUT "Add record"
6. 2 : OUTPUT "Delete record"
7. 3 : OUTPUT "Search"
8. OTHERWISE OUTPUT "Invalid choice"
9. Why CASE fits
10. One variable, Choice , is compared with several discrete values. OTHERWISE handles unexpected input.
11. If each branch needs a different complex condition, IF is usually clearer than CASE.

### Start with the shape of the decision

- **Explains:** `choice`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-127-choice.jpg`

1. Choosing IF or CASE
2. Situation
3. Usually better
4. Pass if mark is at least 50
5. uses a relational comparison
6. Menu option 1, 2, 3 or invalid
7. one variable has discrete values
8. Adult members get one discount; adult non-members another
9. Nested IF
10. second decision depends on the first
11. Grade A/B/C/D with ranges of marks
12. IF or nested IF

### Use IF when a Boolean condition decides the route

- **Explains:** `if`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-127-if.jpg`

1. IF selection
2. Use when
3. Cambridge-style pattern
4. action is needed only when condition is true
5. IF Found THEN ... ENDIF
6. IF...ELSE
7. two paths are needed
8. IF Mark >= 50 THEN ... ELSE ... ENDIF
9. Nested IF
10. a second decision depends on the first decision
11. IF Age >= 18 THEN IF Member THEN ... ENDIF ENDIF

### Same idea, different syntax

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-127-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. CASE Choice OF
4. 1 : OUTPUT "Add"
5. 2 : OUTPUT "Delete"
6. OTHERWISE OUTPUT "Invalid"
7. Java support example only
8. switch (choice) {
9. case 1 -> System.out.println("Add");
10. case 2 -> System.out.println("Delete");
11. default -> System.out.println("Invalid");

### A decision inside another decision

- **Explains:** `nested`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-127-nested.jpg`

1. Nested selection
2. Discount example
3. IF Age >= 18 THEN
4. IF Member = TRUE THEN
5. Discount <- 0.20
6. Discount <- 0.10
7. Discount <- 0.05
8. Trace the paths
9. Discount

### Trace a nested IF

- **Explains:** `path`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-127-path.jpg`

1. Interactive path tracer
2. Enter values to trace which branch runs.
<!-- stage10-explanations:end -->
