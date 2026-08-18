# Lesson 059: Error types: syntax, logic, runtime, and translation diagnostics

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 5  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Error types: syntax, logic, runtime, and translation diagnostics** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Ask: When an app freezes, do you blame the app, the operating system, the user, or the chair? Use the laugh to separate application software from system software.

Lesson-specific focus question: What would go wrong if a student confused **Error types: syntax, logic, runtime, and translation diagnostics** with a neighbouring syllabus idea?

## Guided Explanation
Start with a user action, then identify which part of system software responds. Compare roles such as resource management, interface support and utility tasks. For Error types: syntax, logic, runtime, and translation diagnostics, keep asking: what service is being provided to hardware, software or the user?

Topic-specific teaching move: keep the explanation anchored to **Error types: syntax, logic, runtime, and translation diagnostics**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: user problem. Middle: OS or utility role. Right: benefit and limitation.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** A laptop is slow and storage is nearly full. Recommend two system software tools or OS actions and justify them. The worked example must explicitly use **Error types: syntax, logic, runtime, and translation diagnostics**, not a generic example from the wider unit.

**Worked answer / marking focus:** Answers must connect a tool to a job: backup protects data, antivirus detects malware, file management organises storage, process management allocates CPU time.



## Student Task
Students sort cards into OS roles, utility software and application software, then defend two difficult cards. Their final answer must include the phrase **Error types: syntax, logic, runtime, and translation diagnostics** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Error types: syntax, logic, runtime, and translation diagnostics**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Error types: syntax, logic, runtime, and translation diagnostics** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Error types: syntax, logic, runtime, and translation diagnostics** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often call every program an operating system. Correction: an OS manages resources and provides services; an app performs user tasks. For this lesson, make students contrast that mistake with the exact idea of **error types: syntax, logic, runtime, and translation diagnostics**.  
Correction prompt: "Show the mechanism, not just the label."

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
4. Trap A translator may not detect it because the instructions are legal.

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
