# Lesson 137: Testing with normal, boundary, and erroneous data

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Testing with normal, boundary, and erroneous data** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Testing with normal, boundary, and erroneous data** with a neighbouring syllabus idea?

## Guided Explanation
For Testing with normal, boundary, and erroneous data, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Testing with normal, boundary, and erroneous data**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Testing with normal, boundary, and erroneous data**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct control flow, meaningful identifiers, correct parameter or variable use, and test data that actually exercises the construct.

```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```


## Student Task
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Testing with normal, boundary, and erroneous data** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Testing with normal, boundary, and erroneous data**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Testing with normal, boundary, and erroneous data** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Testing with normal, boundary, and erroneous data** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **testing with normal, boundary, and erroneous data**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Boundary data tests the edge of a valid range

- **Explains:** `boundary`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-boundary.jpg`

1. Boundary data
2. Use exact edges and, where helpful, values just outside the edges. Be explicit about which values are valid and invalid.
3. just outside
4. lower boundary
5. upper boundary
6. Cambridge marking usually rewards precise edge values. “Near the edge” is a direction, not a test case.

### Erroneous data is invalid data that should be rejected

- **Explains:** `erroneous`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-erroneous.jpg`

1. Erroneous data
2. Out of range
3. -1 or 101 for a mark from 0 to 100. Expected result: rejected.
4. Wrong type
5. "cat" where an integer mark is required. Expected result: rejected or error handled.
6. Missing required data
7. An empty name when a name must be entered. Expected result: rejected with a suitable message.

### Java can help you run examples, but Cambridge pseudocode is the exam answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. IF Mark >= 0 AND Mark <= 100 THEN
4. OUTPUT "Accepted"
5. OUTPUT "Rejected"
6. Java support example only
7. if (mark >= 0 && mark <= 100) {
8. System.out.println("Accepted");
9. } else {
10. System.out.println("Rejected");
11. Do not write Java syntax as the final Cambridge pseudocode answer unless the question specifically asks for Java.

### Normal data is valid, typical data inside the allowed range

- **Explains:** `normal`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-normal.jpg`

1. Normal data
2. Normal test data
3. Expected result
4. Mark 0 to 100 inclusive
5. Accepted
6. Password length 8 to 20
7. 12 characters
8. Age 11 to 18 inclusive

### Testing compares actual results with expected results

- **Explains:** `purpose`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-purpose.jpg`

1. Why testing
2. A test is useful only if it can reveal whether the program behaves correctly. A strong test case has input data,
3. a reason for choosing it, and a clear expected result.
4. Validation rule
5. IF Mark >= 0 AND Mark <= 100 THEN
6. OUTPUT "Accepted"
7. OUTPUT "Rejected"
8. Testing question
9. Which values prove that the rule accepts valid marks and rejects invalid marks?
10. Normal data checks ordinary use. Boundary data checks the edges. Erroneous data checks rejection.

### A clear test table turns thinking into marks

- **Explains:** `table`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-table.jpg`

1. Test table
2. Test data
3. Expected result
4. typical valid mark
5. Accepted
6. Boundary
7. lowest valid mark
8. highest valid mark
9. Erroneous
10. below valid range
11. Rejected
12. wrong data type

### Validation is the check. Testing proves whether the check works.

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-validation.jpg`

1. Validation vs testing
2. Validation
3. A program rule, such as “Mark must be from 0 to 100 inclusive”.
4. A planned set of inputs, such as 50 , 0 , 100 , -1 , 101 and "cat" .
<!-- stage10-explanations:end -->
