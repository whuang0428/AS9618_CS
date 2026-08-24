# Lesson 059: Error types: syntax, logic, runtime, and translation diagnostics

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 5  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the system-software functions involved in **Error types: syntax, logic, runtime, and translation diagnostics**.
2. Explain how the software manages a stated resource or task.
3. Recommend and justify suitable software for a given scenario.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Ask: When an app freezes, do you blame the app, the operating system, the user, or the chair? Use the laugh to separate application software from system software.

Focus question: Which feature distinguishes **Error types: syntax, logic, runtime, and translation diagnostics** from the most closely related syllabus concept?

## Guided Explanation
Start with a user action, then identify which part of system software responds. Compare roles such as resource management, interface support and utility tasks. For Error types: syntax, logic, runtime, and translation diagnostics, keep asking: what service is being provided to hardware, software or the user?

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: user problem. Middle: OS or utility role. Right: benefit and limitation.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Classify three faults: a missing closing bracket, division by zero while the program runs, and a program that calculates the wrong average but completes.

**Worked answer / marking focus:** Missing bracket: syntax error; division by zero during execution: runtime error; wrong average with successful execution: logic error. Credit classification plus the stage or effect that distinguishes each type.



## Student Task
Students classify short faults as syntax, logic or runtime errors and state whether a translator diagnostic, test result or runtime failure would reveal each one.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Error types: syntax, logic, runtime, and translation diagnostics**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often call every program an operating system. Correction: an OS manages resources and provides services; an app performs user tasks.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Compare error types by evidence

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-compare.jpg`

1. Error type
2. When noticed
3. Evidence
4. Translation/parsing time
5. Invalid grammar or structure.
6. Missing bracket or malformed IF statement.
7. Testing/output checking
8. Program runs but result is incorrect.
9. Average calculated with wrong divisor.
10. While executing
11. Program fails due to operation or resource problem.
12. Division by zero or file not found.

### Error classification depends on when and how the fault appears

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-concept.jpg`

1. Before execution Syntax and translation errors may stop a program from being translated or run.
2. During execution Runtime errors occur while the program is running.
3. After execution Logic errors may allow completion but produce an incorrect result.
4. Diagnostics Error messages and locations help the programmer identify and correct faults.

### Translation diagnostics help locate and correct errors

- **Explains:** `diagnostics`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-diagnostics.jpg`

1. Compiler May report a list of errors after attempting translation.
2. Interpreter May stop at or near the statement being translated/executed.
3. Useful details Error type, line number, token, expected symbol or explanation of the fault.
4. Limitation The reported line may be near the cause, not always the exact cause.

### Logic errors make the program do the wrong thing

- **Explains:** `logic`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-logic.jpg`

1. Meaning The code is syntactically valid and may run, but the algorithm or condition is wrong.
2. Examples Using < instead of <= , wrong formula, wrong loop condition or off-by-one error.
3. Detection Usually found by testing, tracing or comparing actual output with expected output.
4. Common error A translator may not detect it because the instructions are legal.

### Runtime errors occur while the program is executing

- **Explains:** `runtime`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-runtime.jpg`

1. Meaning The program starts running but fails because of an event or invalid operation during execution.
2. Examples Division by zero, file not found, array index out of range or insufficient memory.
3. Result The program may crash, halt, raise an exception or display an error message.
4. Handling Robust programs may use validation and exception handling to reduce runtime failure.

### Syntax errors break the grammar rules of the language

- **Explains:** `syntax`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-syntax.jpg`

1. Meaning The code structure does not follow the language grammar.
2. Examples Missing brackets, missing keywords, invalid statement structure or misplaced punctuation.
3. Detection Detected by translator syntax analysis or parser before successful translation/execution.
4. Diagnostic Usually reports a line number or location near the invalid syntax.
<!-- stage10-explanations:end -->
