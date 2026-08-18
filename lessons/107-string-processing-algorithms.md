# Lesson 107: String-processing algorithms

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **String-processing algorithms** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **String-processing algorithms** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For String-processing algorithms, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **String-processing algorithms**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **String-processing algorithms**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **String-processing algorithms** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **String-processing algorithms**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **String-processing algorithms** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **String-processing algorithms** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **string-processing algorithms**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Some algorithms construct a new string one character at a time

- **Explains:** `build`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-build.jpg`

1. Building output
2. Remove spaces from a string
3. NewString <- ""
4. FOR Index <- 1 TO LENGTH(Text)
5. Character <- character at position Index
6. IF Character <> " " THEN
7. NewString <- NewString & Character
8. NEXT Index
9. OUTPUT NewString
10. Why concatenation matters
11. For "A S", the algorithm appends A, skips the space, then appends S. The result is "AS".

### A string algorithm needs position, character and stopping point

- **Explains:** `model`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-model.jpg`

1. Knowledge explanation
2. Concrete model
3. In Cambridge-style reasoning, text is processed by taking one character at a time from a known position.
4. Word <- "DATA"
5. FOR Index <- 1 TO LENGTH(Word)
6. Character <- character at position Index
7. OUTPUT Character
8. NEXT Index
9. Trace for "DATA"
10. Character

### Most AS string algorithms are four familiar patterns

- **Explains:** `patterns`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-patterns.jpg`

1. Core patterns
2. State variable
3. Typical condition
4. Character = Target
5. number of matches
6. Found flag
7. Character = Target
8. true/false or position
9. Validate
10. Valid flag
11. character is allowed / not allowed
12. valid or invalid

### Keep exam pseudocode readable and avoid Java indexing leakage

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. VowelCount <- 0
4. FOR Index <- 1 TO LENGTH(Word)
5. Character <- character at position Index
6. IF Character = "A" OR Character = "E" OR Character = "I" OR Character = "O" OR Character = "U" THEN
7. VowelCount <- VowelCount + 1
8. NEXT Index
9. OUTPUT VowelCount
10. Java support only
11. int vowelCount = 0;
12. for (int index = 0; index < word.length(); index++) {

### Trace character processing

- **Explains:** `scanner`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-scanner.jpg`

1. Interactive string scanner
2. Operation
3. Choose text and operation, then trace the string.
<!-- stage10-explanations:end -->
