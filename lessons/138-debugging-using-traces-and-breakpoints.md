# Lesson 138: Debugging using traces and breakpoints

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Debugging using traces and breakpoints**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Debugging using traces and breakpoints** from the most closely related syllabus concept?

## Guided Explanation
For Debugging using traces and breakpoints, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
- Answer one 4-mark question about **Debugging using traces and breakpoints**. Follow its command word and apply each point to the stated context.

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

### A breakpoint pauses execution at a chosen line

- **Explains:** `breakpoint`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-breakpoint.jpg`

1. Breakpoint
2. Best place
3. Place a breakpoint before or on the line where the suspected decision or calculation happens.
4. What to inspect
5. Check variable values, the next line to execute, and whether the condition is true or false.
6. What not to do
7. Do not scatter breakpoints randomly. Random pausing is just procrastination wearing a technical hat.

### Trace the boundary case to expose a logic error

- **Explains:** `bug`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-bug.jpg`

1. Fault example
2. Buggy condition
3. IF Mark > 50 THEN
4. OUTPUT "Pass"
5. OUTPUT "Resit needed"
6. Corrected condition
7. IF Mark >= 50 THEN

### Java debugging tools help practice, but Cambridge pseudocode remains the exam format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit needed"
7. Java support example only
8. int mark = 50;
9. if (mark >= 50) {
10. System.out.println("Pass");
11. } else {
12. System.out.println("Resit needed");

### Debugging locates and corrects faults

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-purpose.jpg`

1. IF Mark > 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"
ENDIF
2. The example is syntactically valid but still contains the deliberate logic error Mark > 50 at the boundary.
3. Cambridge pseudocode closes the selection with ENDIF, not END IF.

### Step through code one instruction at a time

- **Explains:** `stepping`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-stepping.jpg`

1. Stepping
2. Step over
3. Run the next line without entering a called procedure or function. Useful when the call itself is not suspicious.
4. Step into
5. Enter a called procedure or function. Useful when the fault may be inside that subroutine.

### Watching variables shows state changes while stepping

- **Explains:** `watch`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-watch.jpg`

1. Watch variables
2. Variable
3. Expected
4. Suspicious result
5. increases by each item price
6. resets to 0 inside loop
7. moves through every array element
8. skips first or last element
9. 50 passes
10. 50 goes to ELSE branch
<!-- stage10-explanations:end -->
