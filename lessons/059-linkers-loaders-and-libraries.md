# Lesson 059: Linkers, loaders and libraries

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** linker, loader, static-linking and extended dynamic-linking mechanics. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S5.03 program libraries and benefits of dynamically linked library files.
<!-- remediation-v2-optional:end -->

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-compare.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-concept.jpg`

1. Object code Translated output from compilation or assembly, not always a complete executable.
2. External reference A call to code or data defined in another module or library.
3. Executable file A program file with required code linked and arranged for execution.
4. In memory Code and data must be placed into main memory before the CPU can execute it.

### Linkers combine object modules and resolve references

- **Explains:** `linkers`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-linkers.jpg`

1. Input Object code modules and required library routines or references.
2. Action Resolves external references between modules and libraries.
3. Output Produces executable code or a linked object file.
4. Error Can report unresolved external references if a required routine cannot be found.

### Loaders place executable code into memory

- **Explains:** `loaders`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-loaders.jpg`

1. Input An executable program or loadable program image.
2. Action Loads code and data into main memory and prepares it to run.
3. Addresses May allocate memory and adjust addresses depending on where the program is loaded.
4. Boundary A loader does not translate source code or combine object modules.

### Static and dynamic linking affect when library code is connected

- **Explains:** `static-dynamic`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-059-static-dynamic.jpg`

1. Static linking Library code is copied into the executable at link time.
2. Static trade-off Executable can be more self-contained but may be larger.
3. Dynamic linking Library code is linked at load time or run time from a shared library.
4. Dynamic trade-off Can reduce duplication, but the required shared library must be available and compatible.
<!-- stage10-explanations:end -->
