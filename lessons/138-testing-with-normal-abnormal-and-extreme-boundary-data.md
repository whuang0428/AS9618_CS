# Lesson 138: Testing with normal, abnormal, and extreme/boundary data

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Course sequence Section 11; Optional enrichment preview of Section 12.3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Testing with normal, boundary, and erroneous data**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Testing with normal, boundary, and erroneous data** from the most closely related syllabus concept?

## Guided Explanation
For Testing with normal, boundary, and erroneous data, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
- Answer one 4-mark question about **Testing with normal, boundary, and erroneous data**. Follow its command word and apply each point to the stated context.

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

### Abnormal data is invalid data that should be rejected

- **Explains:** `erroneous`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-erroneous.jpg`

1. Abnormal data is invalid data that should be rejected or handled.
2. For a mark from 0 to 100, -1 and 101 are out-of-range abnormal data.
3. The string "cat" is wrong-type abnormal data when an integer mark is required.

### Java can help you run examples, but Cambridge pseudocode is the exam answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. IF Mark >= 0 AND Mark <= 100 THEN
4. OUTPUT "Accepted"
5. ELSE
6. OUTPUT "Rejected"
7. ENDIF
8. Java support example only
9. if (mark >= 0 && mark <= 100) {
10. System.out.println("Accepted");
11. } else {
12. System.out.println("Rejected");
13. }
14. Do not write Java syntax as the final Cambridge pseudocode answer unless the question specifically asks for Java.

### Normal data is valid, typical data inside the allowed range

- **Explains:** `normal`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-normal.jpg`

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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-purpose.jpg`

1. IF Mark >= 0 AND Mark <= 100 THEN
    OUTPUT "Valid"
ELSE
    OUTPUT "Invalid"
ENDIF
2. Normal, abnormal and extreme/boundary test data provide evidence for the selected cases.
3. Finite testing can expose faults but does not prove correctness for every possible input.

### A clear test table turns thinking into marks

- **Explains:** `table`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-table.jpg`

1. A test table records test data, its category and the expected result.
2. Use 50 as normal accepted data and 0 or 100 as valid extreme/boundary accepted data.
3. Use -1, 101 or a wrong-type input as abnormal data with a rejected or handled expected result.

### Testing checks validation against expected results

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-validation.jpg`

1. Testing checks whether validation behaves as expected for selected normal, abnormal and extreme/boundary cases.
2. Expected and actual results are compared for each test.
3. Passing a finite test set is evidence, not a proof of universal correctness.
<!-- stage10-explanations:end -->
