# Lesson 111: Designing algorithms from word problems

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Designing algorithms from word problems** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Designing algorithms from word problems** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Designing algorithms from word problems, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Designing algorithms from word problems**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Designing algorithms from word problems**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Designing algorithms from word problems** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Designing algorithms from word problems**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Designing algorithms from word problems** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Designing algorithms from word problems** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **designing algorithms from word problems**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S9.08
**Focus:** Stepwise refinement

### Direct explanation

- Stepwise refinement starts with a high-level task and repeatedly replaces each complex step with smaller, precise substeps. Refinement stops when each step can be implemented directly and its inputs/outputs are clear.
- It supports modularity, review and testing because each refinement level preserves the purpose of its parent step. It is not merely adding more prose; each level must reduce ambiguity.

### Worked example

**Process an order:** Level 1: Validate order, calculate total, produce receipt. Refine calculate total into: set Total to 0; for each item validate quantity, add Price * Quantity; apply discount; add tax.

### Targeted practice and answers

1. What is the starting point of stepwise refinement?
   **Answer:** A high-level solution/task.
2. When should refinement stop?
   **Answer:** When steps are precise enough to implement directly.
3. How does refinement support testing?
   **Answer:** Smaller modules/steps can be checked independently against defined inputs and outputs.

### Exam-style question and MS

**Question (4 marks):** Apply one level of stepwise refinement to the task 'register a new library member'.

- **B1** captures required member details
- **B1** validates details / checks existing member
- **B1** creates and stores a unique member record
- **B1** outputs confirmation/card or error; steps form a coherent sequence

**Strict note:** Do not award a list of unrelated features; substeps must collectively implement the parent task.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Extract the design before writing pseudocode

- **Explains:** `analyser`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-analyser.jpg`

1. Interactive scenario analyser
2. Scenario
3. Choose a scenario to see the IPOC breakdown.

### Turn paragraphs into a design table

- **Explains:** `ipoc`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-ipoc.jpg`

1. IPOC reading
2. Question to ask
3. Example evidence
4. Algorithm consequence
5. What data is provided?
6. mark, price, password, reading
7. use INPUT or given array/list item
8. What must be calculated or checked?
9. total, maximum, validation, search
10. choose assignment, IF, loop
11. What must be displayed or returned?
12. message, total, average, position

### Design in Cambridge pseudocode first; use Java only to support testing

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style answer
3. PassCount <- 0
4. FOR Index <- 1 TO 5
5. INPUT Mark
6. IF Mark >= 50 THEN
7. PassCount <- PassCount + 1
8. NEXT Index
9. OUTPUT PassCount
10. Java support only
11. int passCount = 0;
12. for (int index = 0; index < 5; index++) {

### Words in the question usually signal a control structure

- **Explains:** `requirements`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-requirements.jpg`

1. Requirements
2. Likely structure
3. Variables
4. exactly / for each / ten values
5. count-controlled loop
6. Index, Total, Count
7. input 10 marks
8. until / while / sentinel
9. condition-controlled loop
10. Number, Total, Count
11. input until -1
12. if / otherwise / valid

### Pick the structure before writing the pseudocode

- **Explains:** `structures`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-structures.jpg`

1. Control choice
2. Known count
3. Total <- 0
4. FOR Index <- 1 TO 5
5. INPUT Mark
6. Total <- Total + Mark
7. NEXT Index
8. OUTPUT Total
9. Use when the number of repetitions is given.
10. Unknown count with sentinel
11. WHILE Mark <> -1
12. ENDWHILE
<!-- stage10-explanations:end -->
