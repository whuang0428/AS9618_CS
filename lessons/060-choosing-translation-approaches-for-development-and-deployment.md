# Lesson 060: Choosing translation approaches for development and deployment

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the system-software functions involved in **Choosing translation approaches for development and deployment**.
2. Explain how the software manages a stated resource or task.
3. Recommend and justify suitable software for a given scenario.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Ask: When an app freezes, do you blame the app, the operating system, the user, or the chair? Use the laugh to separate application software from system software.

Focus question: Which feature distinguishes **Choosing translation approaches for development and deployment** from the most closely related syllabus concept?

## Guided Explanation
Start with a user action, then identify which part of system software responds. Compare roles such as resource management, interface support and utility tasks. For Choosing translation approaches for development and deployment, keep asking: what service is being provided to hardware, software or the user?

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
**Problem:** A team wants rapid line-by-line feedback during development, then wants to distribute a finished program without its source code. Choose a suitable translation approach for each stage.

**Worked answer / marking focus:** Use an interpreter during development for immediate statement-by-statement feedback. A compiler translates the finished high-level program into object code; a linker combines object modules and libraries into an executable for distribution. Credit that translation occurs before execution and the linked executable can run without retranslating the source each time.



## Student Task
Students compare compiler, interpreter and virtual-machine approaches for development, portability and deployment, keeping translation method separate from source-language quality.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Choosing translation approaches for development and deployment**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often call every program an operating system. Correction: an OS manages resources and provides services; an app performs user tasks.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Stage 2 syllabus completion

**Official audit rows:** S5.06, S5.07
**Focus:** Java translation and required IDE features

### Direct explanation

- Java source is compiled into platform-independent bytecode. A Java Virtual Machine then interprets and/or just-in-time compiles bytecode for the host processor, supporting portability across systems with a suitable JVM.
- An IDE may provide context-sensitive prompts, dynamic syntax checking, prettyprinting, code expand/collapse, single-step execution, breakpoints, variable/expression inspection and a report/output window. Each feature supports writing, navigating or debugging code; it does not prove logical correctness.

### Worked example

**Locate a loop fault:** A breakpoint pauses before the loop, single-step advances one statement at a time, and the variable window shows Index changing. Dynamic syntax checking would flag malformed syntax, but not a valid loop with the wrong boundary.

### Targeted practice and answers

1. What does a Java compiler normally produce?
   **Answer:** Bytecode.
2. What executes Java bytecode on a host system?
   **Answer:** A Java Virtual Machine (JVM), using interpretation and/or JIT compilation.
3. Which IDE feature pauses at a chosen line?
   **Answer:** A breakpoint.

### Exam-style question and MS

**Question (4 marks):** Explain how Java source is translated and executed, and describe one IDE feature useful for debugging.

- **B1** Java source is compiled
- **B1** compiler produces bytecode
- **B1** JVM interprets/JIT-compiles bytecode for the host
- **B1** valid debugging feature described with its effect

**Strict note:** Do not accept that Java source is compiled directly into one universal machine-code file.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A good translator choice starts with four questions

- **Explains:** `decision`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-decision.jpg`

1. What code? High-level source code, assembly language, object modules or executable code?
2. What stage? Development, testing, deployment, linking or running?
3. What output? Immediate execution, object code, executable code or program loaded in memory?
4. What feedback? Line-by-line diagnostics, a compiler error list, linker errors or runtime messages?

### For deployment, a compiler often produces a distributable executable

- **Explains:** `deployment`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-deployment.jpg`

1. Useful when A finished program will be distributed to users or run many times.
2. Mechanism Translates the whole high-level program before execution.
3. Benefit Executable/object code can run without giving users the source code.
4. Trade-off Compilation must complete before running; errors may be reported as a list.

### During development, an interpreter can support rapid testing

- **Explains:** `development`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-development.jpg`

1. Useful when The programmer wants immediate feedback while writing and testing code.
2. Mechanism Translates and executes statements as the program runs.
3. Benefit Can stop at or near the statement with an error, helping debugging.
4. Trade-off Execution may be slower and source code/interpreter may be needed.

### Error feedback affects the best choice during development

- **Explains:** `diagnostics`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-diagnostics.jpg`

1. Compiler May provide a list of syntax/translation errors after trying to compile.
2. Interpreter May stop at the current statement, useful for step-by-step testing.
3. Linker May report unresolved external references after object code exists.
4. Testing Logic errors may still need test data and tracing regardless of translator.

### For assembly language, use an assembler

- **Explains:** `lowlevel`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-lowlevel.jpg`

1. Input Assembly language mnemonics for a specific processor.
2. Output Machine code/object code.
3. Use case Low-level code close to hardware or processor instructions.
4. Boundary Assembler is not the correct tool for Java, Python or Cambridge pseudocode.

### After translation, linking and loading may still be needed

- **Explains:** `pipeline`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-pipeline.jpg`

1. A compiler translates a whole high-level program before execution.
2. An interpreter translates and executes high-level source statement by statement during execution.
3. An interpreter normally does not create a separate permanent executable file.
4. An assembler translates assembly mnemonics into machine or object code.
5. A linker combines object modules and resolves references; a loader places executable code and data into memory.
<!-- stage10-explanations:end -->
