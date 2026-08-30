# Lesson 141: Converting Java habits into Cambridge pseudocode

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Converting Java habits into Cambridge pseudocode**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Converting Java habits into Cambridge pseudocode** from the most closely related syllabus concept?

## Guided Explanation
For Converting Java habits into Cambridge pseudocode, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
- Answer one 4-mark question about **Converting Java habits into Cambridge pseudocode**. Follow its command word and apply each point to the stated context.

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

### Use Cambridge array notation consistently

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-arrays.jpg`

1. Java support example only
2. scores[0] = 72;
3. System.out.println(scores[0]);
4. Cambridge-style pseudocode
5. Scores[1] <- 72
6. OUTPUT Scores[1]
7. Cambridge examples often use 1-based indexing unless a question defines otherwise. Follow the question's stated indexing.

### Use the assignment arrow for storing a value

- **Explains:** `assignment`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-assignment.jpg`

1. Assignment
2. Java support example only
3. total = total + mark;
4. Cambridge-style pseudocode
5. Total <- Total + Mark
6. A single equals sign can be read as assignment in Java, but Cambridge pseudocode normally uses the left arrow.

### 5-minute quiz focus

- **Explains:** `checkpoint`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-checkpoint.jpg`

1. Monthly checkpoint
2. Conversion
3. Translate one Java selection, one loop and one output statement.
4. Explanation
5. Explain why Java syntax is support only, not the Paper 2 answer format.
6. Accuracy
7. Check that the algorithm meaning is unchanged after conversion.

### Replace library calls with algorithm keywords

- **Explains:** `io`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-io.jpg`

1. Input and output
2. Java support example only
3. Scanner input = new Scanner(System.in);
4. mark = input.nextInt();
5. System.out.println(mark);
6. Cambridge-style pseudocode
7. INPUT Mark
8. OUTPUT Mark

### Choose the loop keyword that matches the logic

- **Explains:** `loops`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-loops.jpg`

1. Use FOR when a counter range determines the number of iterations.
2. Use WHILE when the condition is checked before each iteration.
3. Use REPEAT, then the body, then UNTIL Condition for a post-condition loop.
4. Do not use DO...ENDWHILE as the Cambridge post-condition form.

### Use IF , THEN , ELSE , ENDIF

- **Explains:** `selection`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-selection.jpg`

1. Selection
2. Java support example only
3. if (mark >= 50) {
4. System.out.println("Pass");
5. } else {
6. System.out.println("Resit needed");
7. Cambridge-style pseudocode
8. IF Mark >= 50 THEN
9. OUTPUT "Pass"
10. OUTPUT "Resit needed"

### Spot the Java-only syntax in an exam answer

- **Explains:** `spotter`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-spotter.jpg`

1. Java spotter
2. Suspicious answer fragment

### Use PROCEDURE and FUNCTION instead of Java method wrappers

- **Explains:** `subroutines`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-subroutines.jpg`

1. Subroutines
2. Java support example only
3. static boolean isValidMark(int mark) {
4. return mark >= 0 && mark <= 100;
5. Cambridge-style pseudocode
6. FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
7. RETURN Mark >= 0 AND Mark <= 100
8. ENDFUNCTION
<!-- stage10-explanations:end -->
