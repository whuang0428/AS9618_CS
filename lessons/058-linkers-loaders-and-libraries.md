# Lesson 058: Linkers, loaders and libraries

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** linker, loader, static-linking and extended dynamic-linking mechanics. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S5.03 program libraries and benefits of dynamically linked library files.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Libraries and dynamically linked library files

### Direct explanation

- Software under development is often constructed using existing code from program libraries. A program library is a collection of reusable routines or modules, so a developer can call tested implementations instead of rewriting common mathematical, input/output, graphics or string operations.
- Benefits to the developer include shorter development time, less duplicated source code, reuse of tested routines and more consistent maintenance. A dynamically linked library (DLL) is connected when a program loads or calls it rather than copying all library code into every executable.
- DLL files can reduce executable size and memory duplication, support reuse and allow one shared update. They also create dependency and version risks: a missing or incompatible DLL can stop a program loading or change behaviour.
- A developer benefit of a program library is reuse of existing tested routines, which can reduce development time and duplicated code.

### Worked example

**Three programs use one graphics DLL:** All three executables call the shared graphics code. One loaded copy may be shared in memory and a security fix can update the DLL once, but replacing it with an incompatible version can break all three programs.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. How do program libraries support software under development?
   **Answer:** They supply existing reusable routines or modules, avoiding the need to write common code again.
2. When is a dynamically linked library connected to a program?
   **Answer:** At load time or run time when required.
3. Give one storage benefit of dynamic linking.
   **Answer:** Library code need not be copied into every executable.
4. Give one DLL risk.
   **Answer:** A missing/incompatible version can prevent execution or cause faults.

### Exam-style question and MS

**Question (4 marks):** Explain two benefits and one drawback of using a dynamically linked library.

| Answer | Guidance | Marks |
|---|---|---:|
| shared reusable code / avoids rewriting | Do not accept 'saves space' unless duplication or executable size is explained. | 1 |
| smaller executables or reduced duplicate memory/storage |  | 1 |
| shared library can be updated once |  | 1 |
| missing/incompatible DLL can stop or alter programs |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Distinguish the translation processes involved in **Linkers, loaders, and libraries**.
2. Describe the input, processing and output of each relevant translator or stage.
3. Select and justify a suitable translation approach for a stated use.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Focus question: Which feature distinguishes **Linkers, loaders, and libraries** from the most closely related syllabus concept?

## Guided Explanation
Move from source code to executable behaviour. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show how translation diagnostics are produced.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: source code. Middle: translation pathway. Right: compiler/interpreter/assembler comparison.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Choose a suitable translator for distributing a finished program and justify the choice.

**Worked answer / marking focus:** Compiler is usually suitable for distribution because it produces object/executable code and can run without source code; interpreter is useful during development for line-by-line diagnostics.

## Student Task
Students receive development and deployment scenarios and choose compiler, interpreter or assembler with one reason and one trade-off.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Linkers, loaders, and libraries**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Compare the roles without blending them

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-compare.jpg`

1. Main role
2. Typical input
3. Typical output/result
4. Stores reusable routines/modules.
5. Calls from a program.
6. Routine code can be linked or used at run time.
7. Combines object modules and resolves external references.
8. Object files and library references.
9. Executable/linked object code.
10. Places executable program into main memory.
11. Executable file/program image.
12. Program ready for execution in memory.

### The post-compilation pathway connects code and prepares execution

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-concept.jpg`

1. Object code Translated output from compilation or assembly, not always a complete executable.
2. External reference A call to code or data defined in another module or library.
3. Executable file A program file with required code linked and arranged for execution.
4. In memory Code and data must be placed into main memory before the CPU can execute it.

### Libraries provide reusable routines and modules

- **Explains:** `libraries`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-libraries.jpg`

1. Purpose Provide pre-written, tested routines that programs can use.
2. Examples Mathematical functions, input/output routines, graphics or string-handling routines.
3. Benefits Saves development time, reduces duplication and may improve reliability.
4. Requirement Calls to library routines must be linked or made available at run time.

### Linkers combine object modules and resolve references

- **Explains:** `linkers`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-linkers.jpg`

1. Input Object code modules and required library routines or references.
2. Action Resolves external references between modules and libraries.
3. Output Produces executable code or a linked object file.
4. Error Can report unresolved external references if a required routine cannot be found.

### Loaders place executable code into memory

- **Explains:** `loaders`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-loaders.jpg`

1. Input An executable program or loadable program image.
2. Action Loads code and data into main memory and prepares it to run.
3. Addresses May allocate memory and adjust addresses depending on where the program is loaded.
4. Boundary A loader does not translate source code or combine object modules.

### Static and dynamic linking affect when library code is connected

- **Explains:** `static-dynamic`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-static-dynamic.jpg`

1. Static linking Library code is copied into the executable at link time.
2. Static trade-off Executable can be more self-contained but may be larger.
3. Dynamic linking Library code is linked at load time or run time from a shared library.
4. Dynamic trade-off Can reduce duplication, but the required shared library must be available and compatible.
<!-- stage10-explanations:end -->
