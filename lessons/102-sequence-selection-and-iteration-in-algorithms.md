# Lesson 102: Sequence, selection, and iteration in algorithms

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Sequence, selection, and iteration in algorithms** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Sequence, selection, and iteration in algorithms** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Sequence, selection, and iteration in algorithms, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Sequence, selection, and iteration in algorithms**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Sequence, selection, and iteration in algorithms**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Sequence, selection, and iteration in algorithms** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Sequence, selection, and iteration in algorithms**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Sequence, selection, and iteration in algorithms** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Sequence, selection, and iteration in algorithms** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **sequence, selection, and iteration in algorithms**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Real algorithms usually combine the three structures

- **Explains:** `combining`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-combining.jpg`

1. Combining structures
2. 1 Use sequence to initialise variables and read inputs.
3. 2 Use iteration when the same action happens repeatedly.
4. 3 Use selection inside the loop when each item needs a decision.
5. 4 Use sequence after the loop to calculate or output final results.
6. 5 Indent nested structures so the examiner can see the logic.

### Iteration: repeat steps

- **Explains:** `iteration`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-iteration.jpg`

1. Knowledge explanation
2. Use when
3. Cambridge-style pattern
4. Count-controlled
5. the number of repeats is known
6. FOR Count <- 1 TO 10 ... NEXT Count
7. Condition-controlled
8. repeat until a condition changes
9. WHILE Number <> -1 ... ENDWHILE
10. Repeat-until style
11. the body must run at least once
12. REPEAT ... UNTIL Valid = TRUE

### Cambridge pseudocode is the exam form; Java is support only

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. PassCount <- 0
4. FOR Count <- 1 TO 5
5. INPUT Mark
6. IF Mark >= 50 THEN
7. PassCount <- PassCount + 1
8. NEXT Count
9. OUTPUT PassCount
10. Java support only
11. int passCount = 0;
12. for (int count = 1; count <= 5; count++) {

### Selection: choose a path using a condition

- **Explains:** `selection`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-selection.jpg`

1. Knowledge explanation
2. Selection is used when the algorithm must decide between different actions.
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit"

### Sequence: steps run in a fixed order

- **Explains:** `sequence`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-102-sequence.jpg`

1. Knowledge explanation
2. Sequence is used when every step must happen once, in order, with no branch and no repetition.
3. INPUT Length
4. INPUT Width
5. Area <- Length * Width
6. OUTPUT Area
<!-- stage10-explanations:end -->
