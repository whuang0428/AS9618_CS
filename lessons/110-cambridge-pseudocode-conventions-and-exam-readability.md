# Lesson 110: Cambridge pseudocode conventions and exam readability

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Cambridge pseudocode conventions and exam readability** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Cambridge pseudocode conventions and exam readability** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Cambridge pseudocode conventions and exam readability, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Cambridge pseudocode conventions and exam readability**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Cambridge pseudocode conventions and exam readability**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Cambridge pseudocode conventions and exam readability** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Cambridge pseudocode conventions and exam readability**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Cambridge pseudocode conventions and exam readability** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Cambridge pseudocode conventions and exam readability** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **cambridge pseudocode conventions and exam readability**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Convert Java-like syntax into Cambridge-style pseudocode

- **Explains:** `cleaner`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-110-cleaner.jpg`

1. Interactive Java cleaner
2. Java-like fragment
3. Choose a fragment to convert.

### Convert meaning first, syntax second

- **Explains:** `conversion`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-110-conversion.jpg`

1. Conversion routine
2. 1. State the goal Example: input five marks and count how many are at least 50.
3. 2. Choose variables Mark, Index, PassCount are clearer than m, i, pc in first drafts.
4. 3. Write Cambridge blocks Use FOR/NEXT, IF/ENDIF, <-, INPUT, OUTPUT.
5. 4. Trace once Check that each variable changes where the indentation says it changes.

### Keep Java syntax out of Paper 2 unless Java is explicitly requested

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-110-java.jpg`

1. Java traps
2. Java-like answer
3. for (int i = 0; i < 5; i++) {
4. if (marks[i] >= 50) {
5. passCount++;
6. Cambridge-style version
7. PassCount <- 0
8. FOR Index <- 1 TO 5
9. IF Mark[Index] >= 50 THEN
10. PassCount <- PassCount + 1
11. NEXT Index
12. Java arrays often use 0-based indexing. Cambridge-style course examples here use readable 1-based positions unless the question defines otherwise.

### Use the symbols that make algorithm intent visible

- **Explains:** `notation`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-110-notation.jpg`

1. Core notation
2. Cambridge-style pseudocode
3. Java support only
4. Exam note
5. Assignment
6. Total <- Total + 1
7. total = total + 1;
8. <- shows value is stored
9. INPUT Mark
10. scanner.nextInt()
11. name the value being read
12. OUTPUT Total

### A marker should not need detective training

- **Explains:** `readability`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-110-readability.jpg`

1. Readability
2. Weak answer
3. Improved answer
4. Why it helps
5. Identifier
6. x, y, z
7. Mark, Total, PassCount
8. purpose is visible
9. Indentation
10. all lines aligned
11. nested lines indented
12. block ownership is clear

### Every opening should have a visible ending

- **Explains:** `structure`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-110-structure.jpg`

1. Block structure
2. Readable selection
3. IF Mark >= 50 THEN
4. OUTPUT "Pass"
5. OUTPUT "Resit"
6. ENDIF makes the selection boundary clear.
7. Readable loop
8. FOR Index <- 1 TO 5
9. INPUT Mark
10. Total <- Total + Mark
11. NEXT Index
12. NEXT Index shows which loop is ending, useful when loops are nested.
<!-- stage10-explanations:end -->
