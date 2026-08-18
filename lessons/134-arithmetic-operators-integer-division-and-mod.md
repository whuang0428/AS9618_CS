# Lesson 134: Arithmetic operators, integer division, and MOD

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Arithmetic operators, integer division, and MOD** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Arithmetic operators, integer division, and MOD** with a neighbouring syllabus idea?

## Guided Explanation
For Arithmetic operators, integer division, and MOD, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Arithmetic operators, integer division, and MOD**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Arithmetic operators, integer division, and MOD**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Arithmetic operators, integer division, and MOD** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Arithmetic operators, integer division, and MOD**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Arithmetic operators, integer division, and MOD** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Arithmetic operators, integer division, and MOD** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **arithmetic operators, integer division, and mod**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Compare / , DIV and MOD

- **Explains:** `calculator`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-calculator.jpg`

1. Interactive arithmetic calculator
2. Use positive integers for this lesson's calculator.
3. Operation
4. Enter values and calculate.

### DIV returns the whole-number quotient

- **Explains:** `division`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-division.jpg`

1. Integer division
2. Cambridge-style pseudocode
3. Students <- 17
4. SeatsPerRow <- 5
5. FullRows <- Students DIV SeatsPerRow
6. OUTPUT FullRows
7. 17 / 5 3.4
8. 17 DIV 5 3
9. Meaning three complete groups of five

### Java can support the idea, but Cambridge pseudocode remains the answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. Quotient <- Number DIV Divisor
4. Remainder <- Number MOD Divisor
5. Java support example only
6. int quotient = number / divisor;
7. int remainder = number % divisor;
8. Do not write Java % as the exam pseudocode operator when the question expects MOD .

### MOD returns the remainder

- **Explains:** `mod`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-mod.jpg`

1. Cambridge-style pseudocode
2. Students <- 17
3. SeatsPerRow <- 5
4. LeftOver <- Students MOD SeatsPerRow
5. OUTPUT LeftOver
6. 17 DIV 5 3 full groups
7. 3 * 5 15 used
8. 17 MOD 5 2 left over

### Operators combine values to calculate a result

- **Explains:** `operators`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-operators.jpg`

1. Arithmetic operators
2. Operator
3. addition
4. 7 + 3 = 10
5. subtraction
6. 7 - 3 = 4
7. multiplication
8. 7 * 3 = 21
9. real division
10. 7 / 2 = 3.5
11. integer quotient
12. 7 DIV 2 = 3

### DIV and MOD often appear in practical algorithm tasks

- **Explains:** `patterns`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-patterns.jpg`

1. Common patterns
2. Even / odd Number MOD 2 = 0 means even.
3. Digit extraction Number MOD 10 gives the last digit of a positive integer.
4. Time conversion Minutes DIV 60 gives hours; Minutes MOD 60 gives remaining minutes.

### Use brackets when the intended order matters

- **Explains:** `precedence`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-precedence.jpg`

1. Precedence
2. Without brackets
3. Result <- 2 + 3 * 4
4. OUTPUT Result
5. Multiplication is evaluated before addition, so the result is 14 .
6. With brackets
7. Result <- (2 + 3) * 4
8. Brackets force the addition first, so the result is 20 .

### Use the identity to check your answer

- **Explains:** `relationship`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-134-relationship.jpg`

1. Quotient and remainder relationship
2. Number = Divisor * (Number DIV Divisor) + (Number MOD Divisor)
3. Example: 17 = 5 * (17 DIV 5) + (17 MOD 5) = 5 * 3 + 2
4. For positive integers, the remainder is smaller than the divisor. If 17 MOD 5 becomes 5 , the remainder has become too enthusiastic.
<!-- stage10-explanations:end -->
