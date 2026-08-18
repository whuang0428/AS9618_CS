# Lesson 100: Flowcharts and pseudocode notation

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Flowcharts and pseudocode notation** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Flowcharts and pseudocode notation** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Flowcharts and pseudocode notation, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Flowcharts and pseudocode notation**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Flowcharts and pseudocode notation**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Flowcharts and pseudocode notation** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Flowcharts and pseudocode notation**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Flowcharts and pseudocode notation** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Flowcharts and pseudocode notation** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **flowcharts and pseudocode notation**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S9.07
**Focus:** Structured English, flowcharts and pseudocode conversion

### Direct explanation

- Structured English expresses sequence, selection and repetition using controlled natural-language statements and indentation. A flowchart uses standard symbols and arrows; pseudocode uses Cambridge constructs. All three must preserve the same decisions and loop boundaries.
- Convert by identifying inputs, outputs, conditions and repeated actions before translating notation. Do not translate shapes or sentences word for word while losing control flow.

### Worked example

**Validate a mark:** Structured English: INPUT Mark; WHILE Mark < 0 OR Mark > 100, OUTPUT error and INPUT Mark; ENDWHILE. The flowchart returns from the invalid decision branch to input; pseudocode uses a pre-condition WHILE loop.

### Targeted practice and answers

1. Which flowchart symbol represents a decision?
   **Answer:** Diamond.
2. What must remain identical during conversion?
   **Answer:** The algorithm's control flow, conditions, inputs and outputs.
3. Why is indentation useful in structured English?
   **Answer:** It shows which steps belong inside a selection or loop.

### Exam-style question and MS

**Question (4 marks):** Convert this structured English to pseudocode: input Age; if Age is at least 18 output Adult, otherwise output Minor.

- **B1** INPUT Age
- **B1** IF Age >= 18 THEN
- **B1** OUTPUT Adult and ELSE OUTPUT Minor
- **B1** closes with ENDIF / coherent Cambridge syntax

**Strict note:** Do not accept two independent IF statements if they can produce contradictory paths; the description requires mutually exclusive alternatives.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A diamond becomes IF...THEN...ELSE

- **Explains:** `equivalence`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-equivalence.jpg`

1. Equivalent forms
2. Flowchart idea
3. INPUT Age
4. Age >= 11 AND Age <= 18?
5. Yes: OUTPUT "Valid" | No: OUTPUT "Invalid"
6. Pseudocode equivalent
7. IF Age >= 11 AND Age <= 18 THEN
8. OUTPUT "Valid"
9. OUTPUT "Invalid"

### Flowcharts use symbols to show control flow

- **Explains:** `flowcharts`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-flowcharts.jpg`

1. Knowledge explanation
2. START/END
3. terminator
4. start or stop the algorithm
5. INPUT/OUTPUT
6. data entering or leaving
7. INPUT Mark, OUTPUT Average
8. calculation or assignment
9. Total ← Total + Mark
10. Decision?
11. yes/no condition
12. Mark >= 50?

### Readable notation earns marks more easily

- **Explains:** `notation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-notation.jpg`

1. Notation rules
2. One entry Flowcharts should have a clear start and a clear direction of travel.
3. Decision labels Decision outputs should be labelled, usually Yes/No or True/False.
4. Indentation Indented pseudocode shows which statements belong inside a branch or loop.
5. Matching endings Use ENDIF, NEXT, ENDWHILE or equivalent to close a structure clearly.
6. Meaningful names Use Mark, Total, Count, Found instead of X1 unless the question gives X1.
7. No mixed syntax Do not mix Java braces with Cambridge pseudocode keywords in the same answer.

### Cambridge-style pseudocode uses structured keywords

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-pseudocode.jpg`

1. Knowledge explanation
2. Selection
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit"
7. Count-controlled iteration
8. Total <- 0
9. FOR Count <- 1 TO 5
10. Total <- Total + Mark
11. NEXT Count
12. OUTPUT Total

### Match scenario to pseudocode structure

- **Explains:** `structure-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-structure-tool.jpg`

1. Interactive structure tool
2. Scenario clue
3. Choose a clue to see the likely structure.

### Choose the correct flowchart symbol

- **Explains:** `symbol-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-symbol-tool.jpg`

1. Interactive symbol tool
2. Algorithm step
3. Choose a step to see the matching symbol and reason.
<!-- stage10-explanations:end -->
