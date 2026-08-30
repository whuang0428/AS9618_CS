# Lesson 057: Java translation and required IDE features

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Java translation and required IDE features

### Direct explanation

- Java in console mode is partly compiled and partly interpreted: the Java compiler translates source code into platform-independent bytecode, then a Java Virtual Machine (JVM) interprets that bytecode and may just-in-time compile parts for the host processor. Bytecode is not universal processor machine code.
- For coding, an IDE can provide context-sensitive prompts. For initial error detection it can perform dynamic syntax checks. For presentation it can prettyprint code and expand or collapse code blocks. These features help create and navigate source code but do not prove that its algorithm is correct.
- For debugging, an IDE can provide single stepping, breakpoints, inspection of variables and expressions, and a report window for diagnostic or output information. Single stepping executes one statement at a time; a breakpoint pauses at a chosen point; variable/expression inspection exposes changing values.
- The expand/collapse feature hides or reveals a code block in the editor without changing program execution.

### Worked example

**Trace Java and locate a loop fault:** First the Java compiler produces bytecode; the JVM then interprets the bytecode or JIT-compiles parts for the host. In the IDE, a breakpoint pauses before the faulty loop, single stepping advances one statement at a time, the variable/expression view exposes Index, and the report window records diagnostics. Dynamic syntax checking can flag malformed syntax but not a syntactically valid wrong boundary.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What does a Java compiler normally produce?
   **Answer:** Bytecode.
2. Why is Java described as partly compiled and partly interpreted?
   **Answer:** Source is compiled to bytecode, then a JVM interprets the bytecode and may JIT-compile parts for the host.
3. Which IDE feature pauses at a chosen line, and which advances one statement?
   **Answer:** A breakpoint pauses; single stepping advances one statement at a time.
4. Identify the two required presentation features.
   **Answer:** Prettyprint and expand/collapse code blocks.
5. What can a variables/expressions view and report window show?
   **Answer:** Current or evaluated values, plus diagnostic/output information in the report window.

### Exam-style question and MS

**Question (6 marks):** Explain why Java is partly compiled and partly interpreted, then describe four IDE features from coding, initial error detection, presentation and debugging.

| Answer | Guidance | Marks |
|---|---|---:|
| Java source is compiled to bytecode | Do not accept that Java source becomes one universal machine-code file or that IDE syntax checking proves logical correctness. | 1 |
| JVM interprets bytecode and may JIT-compile parts for the host |  | 1 |
| context-sensitive prompts or dynamic syntax checking described accurately |  | 1 |
| prettyprint or expand/collapse code blocks described accurately |  | 1 |
| single stepping or breakpoint described accurately |  | 1 |
| variable/expression inspection or report window described accurately |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** compiler phases from lexical analysis through optimisation and code generation. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S5.04-S5.05 purposes of translators and compiler/interpreter comparison.
<!-- remediation-v2-optional:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Distinguish the translation processes involved in **Compilers, interpreters, and assemblers**.
2. Describe the input, processing and output of each relevant translator or stage.
3. Select and justify a suitable translation approach for a stated use.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Focus question: Which feature distinguishes **Compilers, interpreters, and assemblers** from the most closely related syllabus concept?

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
**Problem:** Choose a translator for development and another for distributing a finished program. Justify both choices.

**Worked answer / marking focus:** Interpreter is useful for development due to line-by-line error feedback; compiler is suitable for distribution because object/executable code can run without source code.

## Student Task
Students sort scenarios into compiler, interpreter and assembler, then write one trade-off for each.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Compilers, interpreters, and assemblers**. Follow its command word and apply each point to the stated context.

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

### An assembler translates assembly language into machine code

- **Explains:** `assembler`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-assembler.jpg`

1. An assembler translates assembly-language mnemonics into machine code or an object-code module.
2. Machine code uses the instruction set and binary encodings of the target processor.
3. An object module may still need a linker to combine modules and resolve external library references before an executable can be produced.
4. An assembler does not translate high-level languages such as Java or Cambridge pseudocode.

### Comparison: same goal, different route

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-compare.jpg`

1. A compiler translates a whole high-level program before execution and produces target or object code; a linked executable can run repeatedly without the source.
2. An interpreter translates and executes high-level statements during execution and normally produces no separate permanent object-code file.
3. An assembler translates assembly-language mnemonics into target machine code or an object module for a specific processor instruction set.
4. If an assembler or compiler produces object modules, a linker may still be required before there is an executable program.
5. Choose the translator from the input language and the development or deployment need; do not claim that every assembler output is immediately executable.

### A compiler translates the whole high-level program before execution

- **Explains:** `compiler`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-compiler.jpg`

1. Input High-level language source code.
2. Output Object code or executable code after translation.
3. Advantages Executable can run without source code; repeated execution may be faster after compilation.
4. Limitations Errors are often reported after compilation, so debugging may involve checking a list of errors.

### Translator software converts program code into another form

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-concept.jpg`

1. A compiler translates high-level source into target machine or object code.
2. An assembler translates assembly mnemonics into target machine or object code.
3. A linker combines object modules and resolves references to form an executable.
4. A loader places executable code and data into memory; it is not a generic object-to-machine translation stage.

### An interpreter translates and executes statements as the program runs

- **Explains:** `interpreter`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-interpreter.jpg`

1. Input High-level language source code.
2. Output No separate permanent object code is normally produced.
3. Advantages Useful during development because errors can be found statement by statement.
4. Limitations Program may run more slowly because translation happens during execution; source code is needed.
<!-- stage10-explanations:end -->
