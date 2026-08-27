# Lesson 128: Count-controlled loops

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Count-controlled loops**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Count-controlled loops** from the most closely related syllabus concept?

## Guided Explanation
For Count-controlled loops, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: construct purpose. Middle: Cambridge pseudocode. Right: Java comparison and trace.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case.

**Worked answer / marking focus:** Credit correct control flow, meaningful identifiers, correct parameter or variable use, and test data that actually exercises the construct.

```text
// Cambridge-style pseudocode
FOR Count ← 1 TO 10
    OUTPUT Count
NEXT Count
```

```java
// Java support example only, not exam pseudocode
for (int count = 1; count <= 10; count++) {
    System.out.println(count);
}
```

## Student Task
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Count-controlled loops**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Write and justify a count-controlled loop

### Direct explanation

- A count-controlled loop uses FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop starts. The counter, start value and end value define the iterations; NEXT closes the loop.
- Match the loop bounds to the declared data. Initialise accumulators before the loop, update them inside it and output a final result after the loop unless intermediate output is explicitly required.
- Justify FOR from the problem: it is well suited when the count or bounds are known, but a pre-condition or post-condition loop is better when the number of repetitions depends on input or a stopping condition.

### Worked example

**Total a fixed array:** For Marks[1:30], set Total <- 0, use FOR Index <- 1 TO 30, add Marks[Index] to Total, close with NEXT Index and output Total after all thirty elements have been processed.

### Targeted practice and answers

1. Why is FOR suitable for Marks[1:30]?
   **Answer:** The 30 iterations and valid index bounds are known before the loop starts.
2. Where is Total initialised?
   **Answer:** Once before the loop.
3. Which keyword closes the count-controlled loop?
   **Answer:** NEXT followed by the counter name.

### Exam-style question and MS

**Question (5 marks):** Write Cambridge pseudocode to input and total exactly 12 monthly values, then output the total. Explain why the selected loop is count-controlled.

- **B1** initialises Total before repetition
- **M1** uses FOR Month <- 1 TO 12 or an equivalent twelve-iteration range
- **M1** inputs a value and adds it inside the loop
- **A1** closes with NEXT and outputs Total after the loop
- **B1** justifies FOR because the repetition count is known in advance

**Strict note:** Do not use an eleven- or thirteen-iteration bound or reset the accumulator inside the loop.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### FOR loops are natural for fixed array bounds

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-arrays.jpg`

1. Array processing
2. Output all marks
3. FOR Index <- 1 TO 30
4. OUTPUT Marks[Index]
5. NEXT Index
6. Total all marks
7. Total <- 0
8. Total <- Total + Marks[Index]
9. The loop bounds should match the declared array bounds unless the question gives a reason not to.

### One wrong bound can miss or invent an iteration

- **Explains:** `bounds`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-bounds.jpg`

1. Bounds and off-by-one errors
2. Counter values
3. Iterations
4. Common issue
5. 1, 2, 3, 4, 5
6. 0, 1, 2, 3, 4
7. only if array uses 0-based bounds
8. 1, 2, 3, 4
9. misses item 5 if five items are required

### Do not confuse the counter with the running total

- **Explains:** `counter`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-counter.jpg`

1. Counter and accumulator
2. Variable
3. loop counter; controls the current iteration
4. 1, 2, 3, 4, 5
5. accumulator; stores a running total
6. 0, 1, 3, 6, 10, 15
7. bound; controls where the loop stops
8. 5 in 1 TO 5

### A FOR loop has a counter, a start value and an end value

- **Explains:** `for`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-for.jpg`

1. FOR loop structure
2. General pattern
3. FOR Counter <- StartValue TO EndValue
4. // repeated statements
5. NEXT Counter
6. Concrete example
7. Total <- 0
8. FOR Count <- 1 TO 5
9. Total <- Total + Count
10. NEXT Count
11. OUTPUT Total
12. Use a FOR loop when the number of repetitions is known before the loop starts.

### Java for loops are useful, but not the exam answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. FOR Count <- 1 TO 5
4. OUTPUT Count
5. NEXT Count
6. Java support example only
7. for (int count = 1; count <= 5; count++) {
8. System.out.println(count);
<!-- stage10-explanations:end -->
