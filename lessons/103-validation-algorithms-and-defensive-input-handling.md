# Lesson 103: Validation algorithms and defensive input handling

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Validation algorithms and defensive input handling** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Validation algorithms and defensive input handling** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Validation algorithms and defensive input handling, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Validation algorithms and defensive input handling**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Validation algorithms and defensive input handling**, not a generic example from the wider unit.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Validation algorithms and defensive input handling** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Validation algorithms and defensive input handling**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Validation algorithms and defensive input handling** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Validation algorithms and defensive input handling** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **validation algorithms and defensive input handling**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Match the rule to the risk

- **Explains:** `checks`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-checks.jpg`

1. Validation check types
2. Range check
3. value is within allowed limits
4. Mark >= 0 AND Mark <= 100
5. Presence check
6. field is not blank
7. Name <> ""
8. Length check
9. input has required number of characters
10. LENGTH(Postcode) <= 8
11. Type / format check
12. input matches expected type or pattern

### Reject bad input, then ask again

- **Explains:** `defensive`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-defensive.jpg`

1. Defensive input handling
2. 1 Input the value.
3. 2 Test the validation condition.
4. 3 If invalid, output a helpful message.
5. 4 Repeat input until valid.
6. 5 Process only the accepted value.

### Use Cambridge-style validation loops in the exam

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. INPUT Mark
4. IF Mark < 0 OR Mark > 100 THEN
5. OUTPUT "Invalid mark"
6. UNTIL Mark >= 0 AND Mark <= 100
7. Java support only
8. mark = input.nextInt();
9. if (mark < 0 || mark > 100) {
10. System.out.println("Invalid mark");
11. } while (mark < 0 || mark > 100);
12. Exam reminder: Cambridge pseudocode uses keywords such as REPEAT, UNTIL, IF, THEN, ENDIF, INPUT and OUTPUT. Java syntax is support only.

### Test a mark against 0-100

- **Explains:** `tester`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-tester.jpg`

1. Interactive input tester
2. Enter a mark and test whether it is valid.

### Validation checks whether input follows a rule

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-103-validation.jpg`

1. Knowledge explanation
2. What validation does
3. Validation rejects unacceptable input before processing. It can check range, presence, length, type, format, existence or check digit rules.
4. What validation does not do
5. Validation does not prove input is true. It checks whether input is reasonable or follows the expected pattern.
6. Example: age 15 passes a school-age range check, but it might still be a lie.
<!-- stage10-explanations:end -->
