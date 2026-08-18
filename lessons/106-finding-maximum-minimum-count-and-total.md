# Lesson 106: Finding maximum, minimum, count, and total

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Finding maximum, minimum, count, and total** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Finding maximum, minimum, count, and total** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Finding maximum, minimum, count, and total, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Finding maximum, minimum, count, and total**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Finding maximum, minimum, count, and total**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Finding maximum, minimum, count, and total** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Finding maximum, minimum, count, and total**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Finding maximum, minimum, count, and total** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Finding maximum, minimum, count, and total** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **finding maximum, minimum, count, and total**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### When the number of values is known, use a count-controlled loop

- **Explains:** `fixed`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-fixed.jpg`

1. Fixed-count input
2. Example: total and average of 4 scores
3. Total <- 0
4. FOR Index <- 1 TO 4
5. INPUT Score
6. Total <- Total + Score
7. NEXT Index
8. Average <- Total / 4
9. OUTPUT Average
10. Trace focus
11. For scores 72, 55, 91, 64, the total becomes 72, 127, 218, 282. The average is 70.5.
12. Do not output the average inside the loop unless the question asks for a running average.

### The starting value decides whether the algorithm is honest

- **Explains:** `initialise`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-initialise.jpg`

1. Initialisation
2. Total and count
3. Total <- 0
4. Count <- 0
5. FOR Index <- 1 TO 4
6. INPUT Score
7. Total <- Total + Score
8. Count <- Count + 1
9. NEXT Index
10. Zero is safe because nothing has been added or counted yet.
11. Maximum and minimum
12. INPUT Value

### Four running-value patterns

- **Explains:** `patterns`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-patterns.jpg`

1. Knowledge explanation
2. Start with a concrete list, then name the algorithm pattern.
3. Variable
4. Update rule
5. Total <- Total + Value
6. running sum of values
7. Count <- Count + 1 when a value is processed or meets a condition
8. number of items
9. Maximum
10. replace when Value > Maximum
11. largest value seen so far
12. Minimum

### Use Cambridge assignment and loop keywords in exam answers

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. Total <- 0
4. PassCount <- 0
5. FOR Index <- 1 TO 5
6. INPUT Mark
7. Total <- Total + Mark
8. IF Mark >= 50 THEN
9. PassCount <- PassCount + 1
10. NEXT Index
11. OUTPUT Total
12. OUTPUT PassCount

### When input stops on a special value, do not process the sentinel

- **Explains:** `sentinel`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-sentinel.jpg`

1. Sentinel input
2. Example: enter numbers until -1
3. Total <- 0
4. Count <- 0
5. INPUT Number
6. WHILE Number <> -1
7. Total <- Total + Number
8. Count <- Count + 1
9. ENDWHILE
10. OUTPUT Total
11. OUTPUT Count
12. Exam wording

### Watch running variables change

- **Explains:** `trace-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-trace-tool.jpg`

1. Interactive trace simulator
2. Data set
3. Choose a data set and goal, then trace the algorithm.
<!-- stage10-explanations:end -->
