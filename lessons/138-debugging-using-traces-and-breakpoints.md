# Lesson 138: Debugging using traces and breakpoints

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Debugging, error correction and program enhancement

### Direct explanation

- A syntax error breaks the language grammar and is normally exposed by a translator or an IDE's dynamic syntax check. A logic error uses valid syntax but follows the wrong algorithm, so a trace, dry run, walkthrough or deliberately selected test can expose an unexpected result. A run-time error occurs during execution, such as division by zero or opening a missing file, so exception messages and run-time diagnostics help locate it.
- After an error is exposed, locate the responsible statement and identify the error type before changing it. Correct the cause, not only the observed output, then rerun the failing test and relevant regression tests. Avoid faults by using clear identifiers, modular design, validation, desk checking, peer walkthroughs and a planned set of normal, abnormal and extreme/boundary tests.
- No single method proves that a program has no remaining faults. Translation can expose syntax faults but not every logic fault; testing can reveal failures for selected cases but cannot demonstrate correctness for every possible input.
- A runtime error (run-time error) occurs during execution; identify its cause, use runtime diagnostics to locate it and correct the responsible code.
- Analyse the supplied program before editing it: state its current purpose, inputs, outputs, data structures, control flow and assumptions. Trace representative data to identify where a new requirement belongs and record behaviour that must remain unchanged.
- Amend the existing program with the smallest coherent change that enhances functionality. Update related declarations, initialisation, processing and output together; preserve established interfaces unless the requirement needs an interface change; and keep Cambridge pseudocode constructs complete.
- Test the enhancement with data that exercises the new path and rerun regression tests for existing paths. Correcting a fault is corrective maintenance; adding or improving requested functionality is an enhancement and may be perfective maintenance.
- Program errors can be exposed by suitable test data and expected results, located with trace output or breakpoints, and corrected before the same tests are repeated to confirm the fix.

### Worked example

**Correct three different faults / Add a Merit count without breaking PassCount:** A missing ENDIF is a syntax error exposed during translation and corrected by closing the selection. Mark > 50 for a pass boundary of 50 is a logic error exposed by tracing Mark = 50 and corrected to Mark >= 50. Total / Count when Count may be 0 is a run-time risk exposed during execution and avoided by testing Count before division. The existing program counts marks at least 50 in PassCount. Analysis shows one traversal already reads every mark, so declare and initialise MeritCount, add IF Marks[Index] >= 70 THEN MeritCount <- MeritCount + 1 ENDIF inside the same loop, and output both counters after the loop. Test 49, 50, 69 and 70 to cover unchanged pass behaviour and the new merit boundary.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which method can expose a syntactically valid wrong boundary?
   **Answer:** A trace, dry run, walkthrough or selected boundary test can expose the wrong result.
2. Why is a translator insufficient for all logic errors?
   **Answer:** Logic errors can obey the language grammar, so translation may succeed even though the result is wrong.
3. What must happen after a correction?
   **Answer:** Rerun the failing test and relevant regression tests to check the correction and existing behaviour.
4. What should be recorded before changing existing code?
   **Answer:** Its purpose, inputs, outputs, relevant control/data flow, assumptions and behaviour that must remain unchanged.
5. Why rerun old tests after adding a feature?
   **Answer:** Regression tests check that the amendment has not broken existing behaviour.
6. How is an enhancement different from merely correcting a fault?
   **Answer:** An enhancement adds or improves required functionality; a correction restores behaviour that was already required.

### Exam-style question and MS

**Question (12 marks):** For each fault, state its type, one way to expose or locate it, and the correction: a missing ENDIF; IF Mark > 50 when 50 should pass; Average <- Total / Count when Count can be zero. An existing program counts PassCount for Marks[1:30] where each mark is at least 50. Analyse where a new MeritCount for marks at least 70 should be added, write the amended declarations, initialisation, loop update and output, and name four boundary-focused test values.

| Answer | Guidance | Marks |
|---|---|---:|
| missing ENDIF identified as syntax error and translator/dynamic syntax check used | Do not accept changing the expected result to hide a program fault, or claim that successful translation proves the algorithm correct. Do not accept a rewrite that removes the existing pass count, changes its boundary, or tests only the new feature. | 1 |
| adds the required ENDIF |  | 1 |
| Mark > 50 identified as logic error and boundary trace/test at 50 used |  | 1 |
| changes the condition to Mark >= 50 or equivalent |  | 1 |
| division by zero identified as run-time error/risk and execution/test diagnostics used |  | 1 |
| guards the division by checking Count or handles the zero case |  | 1 |
| analysis identifies the existing traversal and output that must remain |  | 1 |
| declares and initialises MeritCount without removing PassCount |  | 1 |
| increments MeritCount inside the existing traversal when mark is at least 70 |  | 1 |
| preserves the existing pass condition at 50 and outputs both results after the loop |  | 1 |
| uses 49 and 50 to regression-test the pass boundary |  | 1 |
| uses 69 and 70 to test the new merit boundary |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Course sequence Section 11; Optional enrichment preview of Section 12.3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Debugging using traces and breakpoints**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Debugging using traces and breakpoints** from the most closely related syllabus concept?

## Guided Explanation
For Debugging using traces and breakpoints, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
- Answer one 4-mark question about **Debugging using traces and breakpoints**. Follow its command word and apply each point to the stated context.

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

### A breakpoint pauses execution at a chosen line

- **Explains:** `breakpoint`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-breakpoint.jpg`

1. Breakpoint
2. Best place
3. Place a breakpoint before or on the line where the suspected decision or calculation happens.
4. What to inspect
5. Check variable values, the next line to execute, and whether the condition is true or false.
6. What not to do
7. Do not scatter breakpoints randomly. Random pausing is just procrastination wearing a technical hat.

### Analyse and amend an existing program

- **Explains:** `bug`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-bug.jpg`

1. Analyse the existing program's purpose, inputs, outputs, control flow and behaviour that must remain unchanged before editing it.
2. Amend declarations, initialisation, processing and output coherently to add the requested functionality rather than rewriting unrelated code.
3. Test the new path and rerun regression tests for the existing path; adding functionality is an enhancement, not merely correcting a fault.

### Java debugging tools help practice, but Cambridge pseudocode remains the exam format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit needed"
7. Java support example only
8. int mark = 50;
9. if (mark >= 50) {
10. System.out.println("Pass");
11. } else {
12. System.out.println("Resit needed");

### Logic errors make the program do the wrong thing

- **Explains:** `logic`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-logic.jpg`

1. Meaning The code is syntactically valid and may run, but the algorithm or condition is wrong.
2. Examples Using < instead of <= , wrong formula, wrong loop condition or off-by-one error.
3. Detection Usually found by testing, tracing or comparing actual output with expected output.
4. Common error A translator may not detect it because the instructions are legal.

### Debugging locates and corrects faults

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-purpose.jpg`

1. IF Mark > 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"
ENDIF
2. The example is syntactically valid but still contains the deliberate logic error Mark > 50 at the boundary.
3. Cambridge pseudocode closes the selection with ENDIF, not END IF.

### Step through code one instruction at a time

- **Explains:** `stepping`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-stepping.jpg`

1. Stepping
2. Step over
3. Run the next line without entering a called procedure or function. Useful when the call itself is not suspicious.
4. Step into
5. Enter a called procedure or function. Useful when the fault may be inside that subroutine.

### Watching variables shows state changes while stepping

- **Explains:** `watch`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-138-watch.jpg`

1. Watch variables
2. Variable
3. Expected
4. Suspicious result
5. increases by each item price
6. resets to 0 inside loop
7. moves through every array element
8. skips first or last element
9. 50 passes
10. 50 goes to ELSE branch
<!-- stage10-explanations:end -->
