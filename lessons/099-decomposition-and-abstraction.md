# Lesson 099: Decomposition and abstraction

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Decomposition and abstraction** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Decomposition and abstraction** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Decomposition and abstraction, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Decomposition and abstraction**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Decomposition and abstraction**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Decomposition and abstraction** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Decomposition and abstraction**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Decomposition and abstraction** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Decomposition and abstraction** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **decomposition and abstraction**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Abstraction: keep the details that affect the algorithm

- **Explains:** `abstraction`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-abstraction.jpg`

1. Knowledge explanation
2. Keep inputs, ranges, counts, limits, required outputs and stopping conditions.
3. Ignore visual style, real-world decoration and details that do not change the logic.
4. Name use meaningful identifiers such as Mark, TotalCost, PlacesLeft and IsValid.
5. Model represent the real situation using variables, constants, arrays and records when needed.
6. Check ask whether removing a detail would change the algorithm's result.
7. Explain state why a detail is relevant or irrelevant, not just that it is "important".

### Decomposition: split the problem into sub-problems

- **Explains:** `decomposition`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-decomposition.jpg`

1. Knowledge explanation
2. Possible sub-problems
3. Why this helps
4. Calculate class average
5. Input marks, validate marks, total marks, calculate average, output average
6. Each part has a clear variable and test case
7. Login check
8. Input username/password, check blank input, compare stored details, output access decision
9. Selection and validation are easier to locate
10. Process ticket sales
11. Input ticket type, validate type, calculate price, update places, output confirmation
12. Business rules are separated from input/output

### Keep or ignore details

- **Explains:** `filter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-filter.jpg`

1. Interactive abstraction filter

### From scenario to algorithm plan

- **Explains:** `pattern`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-pattern.jpg`

1. Design pattern
2. 1 Read the scenario and underline the required output.
3. 2 List inputs and constraints.
4. 3 Decompose into sub-problems with verb-based names.
5. 4 Abstract away details that do not affect logic.
6. 5 Write Cambridge-style pseudocode for each part.

### Modules can be planned in pseudocode without Java syntax

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. PROCEDURE ValidateMark(Mark)
4. IF Mark >= 0 AND Mark <= 100 THEN
5. OUTPUT "Valid"
6. OUTPUT "Invalid"
7. ENDPROCEDURE
8. Java support only
9. static void validateMark(int mark) {
10. if (mark >= 0 && mark <= 100) {
11. System.out.println("Valid");
12. } else {

### Classify the design move

- **Explains:** `sorter`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-sorter.jpg`

1. Interactive task sorter
2. Design statement
3. Choose a statement to see whether it is decomposition, abstraction or a trap.
<!-- stage10-explanations:end -->
