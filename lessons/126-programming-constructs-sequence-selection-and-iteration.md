# Lesson 126: Programming constructs: sequence, selection, and iteration

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Programming constructs: sequence, selection, and iteration** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Programming constructs: sequence, selection, and iteration** with a neighbouring syllabus idea?

## Guided Explanation
For Programming constructs: sequence, selection, and iteration, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Programming constructs: sequence, selection, and iteration**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Programming constructs: sequence, selection, and iteration**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Programming constructs: sequence, selection, and iteration** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Programming constructs: sequence, selection, and iteration**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Programming constructs: sequence, selection, and iteration** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Programming constructs: sequence, selection, and iteration** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **programming constructs: sequence, selection, and iteration**.  
Correction prompt: "Show the mechanism, not just the label."

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
