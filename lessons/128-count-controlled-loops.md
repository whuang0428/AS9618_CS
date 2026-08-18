# Lesson 128: Count-controlled loops

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Count-controlled loops** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Count-controlled loops** with a neighbouring syllabus idea?

## Guided Explanation
For Count-controlled loops, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Count-controlled loops**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Count-controlled loops**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Count-controlled loops** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Count-controlled loops**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Count-controlled loops** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Count-controlled loops** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **count-controlled loops**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### FOR loops are natural for fixed array bounds

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-arrays.jpg`

1. Array processing
2. Output all marks
3. FOR Index <- 1 TO 30
4. OUTPUT Marks[Index]
5. NEXT Index
6. Total all marks
7. Total <- 0
8. Total <- Total + Marks[Index]
9. The loop bounds should match the declared array bounds unless the question gives a reason not to.

### One wrong bound can miss or invent an iteration

- **Explains:** `bounds`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-bounds.jpg`

1. Bounds and off-by-one errors
2. Counter values
3. Iterations
4. Common issue
5. 1, 2, 3, 4, 5
6. 0, 1, 2, 3, 4
7. only if array uses 0-based bounds
8. 1, 2, 3, 4
9. misses item 5 if five items are required

### Do not confuse the counter with the running total

- **Explains:** `counter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-counter.jpg`

1. Counter and accumulator
2. Variable
3. loop counter; controls the current iteration
4. 1, 2, 3, 4, 5
5. accumulator; stores a running total
6. 0, 1, 3, 6, 10, 15
7. bound; controls where the loop stops
8. 5 in 1 TO 5

### A FOR loop has a counter, a start value and an end value

- **Explains:** `for`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-for.jpg`

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

### Java for loops are useful, but not the exam answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. FOR Count <- 1 TO 5
4. OUTPUT Count
5. NEXT Count
6. Java support example only
7. for (int count = 1; count <= 5; count++) {
8. System.out.println(count);
<!-- stage10-explanations:end -->
