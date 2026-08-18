# Lesson 138: Debugging using traces and breakpoints

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Debugging using traces and breakpoints** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Debugging using traces and breakpoints** with a neighbouring syllabus idea?

## Guided Explanation
For Debugging using traces and breakpoints, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Debugging using traces and breakpoints**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Debugging using traces and breakpoints**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Debugging using traces and breakpoints** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Debugging using traces and breakpoints**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Debugging using traces and breakpoints** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Debugging using traces and breakpoints** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **debugging using traces and breakpoints**.  
Correction prompt: "Show the mechanism, not just the label."

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

1. Debugging
2. A program can be syntactically valid and still wrong. Debugging checks the actual behaviour against the intended
3. behaviour, then narrows down where the fault occurs.
4. Faulty pseudocode
5. INPUT Mark
6. IF Mark > 50 THEN
7. OUTPUT "Pass"
8. OUTPUT "Resit needed"
9. Intended rule
10. A mark of 50 should pass. The code uses > , so 50 incorrectly goes to the ELSE branch.
11. The bug is small. Its exam mark consequences are not.

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
