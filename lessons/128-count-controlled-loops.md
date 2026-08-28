# Lesson 128: Use supplied built-in and library routines

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Use supplied built-in and library routines

### Direct explanation

- Use built-in functions and library routines exactly as defined. The syllabus states that any function not given in the Cambridge pseudocode guide will be provided, and string manipulation functions will always be given in the question. Students are not expected to memorise one unofficial substring API.
- Read the supplied function name, parameter order, position convention and returned type before using it. LENGTH is a familiar built-in example; LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
- A function call returns a value, so it can be assigned, compared, output or combined in an expression. Do not import Java's zero-based substring convention unless the question explicitly specifies it.

### Worked example

**Apply a supplied string routine:** A question defines EXTRACT(Text, Start, Count) using positions starting at 1. LENGTH("NETWORK") returns 7; EXTRACT("NETWORK", 4, 2) returns "WO". Code <- EXTRACT(UCASE(Name), 1, 3) nests a supplied library routine inside an expression.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Will an unfamiliar string manipulation function be supplied?
   **Answer:** Yes. The syllabus says string manipulation functions will always be given.
2. What must be checked before tracing EXTRACT?
   **Answer:** Its supplied parameter order, position/index convention and return definition.
3. May a returned string be assigned to a variable?
   **Answer:** Yes; a function return can be used wherever a compatible value is needed.

### Exam-style question and MS

**Question (4 marks):** A question defines TAKE(Text, Start, Count), with positions starting at 1. State LENGTH("ALGORITHM"), state TAKE("ALGORITHM", 3, 4), and write an assignment that converts the extracted text to upper case using supplied routine UCASE.

| Answer | Guidance | Marks |
|---|---|---:|
| LENGTH result is 9 | Do not require memorisation of an unstated substring signature or import Java's zero-based indexes. | 1 |
| TAKE result is GORI |  | 1 |
| uses the supplied Start/Count convention rather than Java indexing |  | 1 |
| assigns UCASE(TAKE("ALGORITHM", 3, 4)) or equivalent to a variable |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### FOR loops are natural for fixed array bounds

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-128-counter.jpg`

1. Counter and accumulator
2. Variable
3. loop counter; controls the current iteration
4. 1, 2, 3, 4, 5
5. accumulator; stores a running total
6. 0, 1, 3, 6, 10, 15
7. bound; controls where the loop stops
8. 5 in 1 TO 5

### Java for loops are useful, but not the exam answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
