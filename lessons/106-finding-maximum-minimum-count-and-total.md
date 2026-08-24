# Lesson 106: Finding maximum, minimum, count, and total

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Finding maximum, minimum, count, and total**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Finding maximum, minimum, count, and total** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Finding maximum, minimum, count, and total, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.

```text
// Cambridge-style pseudocode
Maximum ← Values[1]
Total ← 0
FOR Index ← 1 TO Length
    Total ← Total + Values[Index]
    IF Values[Index] > Maximum THEN
        Maximum ← Values[Index]
    ENDIF
NEXT Index
```

```java
// Java support example only, not exam pseudocode
int maximum = values[0];
int total = 0;
for (int value : values) {
    total += value;
    if (value > maximum) maximum = value;
}
```

## Student Task
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Finding maximum, minimum, count, and total**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

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

1. Initialise totals and counters to zero before processing values.
2. Initialise Maximum and Minimum from the first real input value or from proven safe bounds.
3. Compare each remaining value with Maximum and Minimum.
4. Replace Maximum only when a larger value is found and Minimum only when a smaller value is found.

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

1. Initialise Total and PassCount to zero before processing five marks.
2. Every input mark is added to Total.
3. Increment PassCount only when Mark is at least 50 and close that selection with ENDIF.
4. Output Total and PassCount after NEXT Index.

### When input stops on a special value, do not process the sentinel

- **Explains:** `sentinel`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-sentinel.jpg`

1. Initialise Total and Count, then input the first Number.
2. While Number is not -1, add it to Total and increment Count.
3. Input the next Number at the end of the WHILE body before ENDWHILE.
4. The sentinel -1 stops the loop and is not added or counted.

### Watch running variables change

- **Explains:** `trace-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-106-trace-tool.jpg`

1. Interactive trace simulator
2. Data set
3. Choose a data set and goal, then trace the algorithm.
<!-- stage10-explanations:end -->
