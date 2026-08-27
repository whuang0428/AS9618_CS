# Lesson 056: Compilers, interpreters, and assemblers

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

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Assembler, compiler and interpreter choices

### Direct explanation

- An assembler is needed to translate a processor-specific assembly-language program into machine code or object code. A compiler is needed to translate a whole high-level language program before execution, normally producing target/object code. An interpreter translates and executes a high-level language program statement by statement during execution, normally without producing a separate permanent object-code file.
- Compiler advantages include faster repeated execution after translation, distribution without the source code and translation checks across the whole program. Disadvantages include a separate compilation step and an error list that may need several corrections before execution. Interpreter advantages include immediate statement-level feedback and convenient incremental testing. Disadvantages include repeated translation overhead, slower execution and needing the interpreter and usually the source program at run time.
- A justified choice must connect the mechanism to the scenario: an interpreter can suit development and debugging; a compiler can suit repeated use or distribution; an assembler is required for assembly source. These are advantages and disadvantages of the translation approaches, not universal claims that one tool is always better.

### Worked example

**Choose tools across development and deployment:** During development, an interpreter can execute each statement and stop near a fault, giving quick feedback. For final distribution, a compiler can translate the whole high-level program before execution and provide target/object or executable code without distributing the source. A processor-specific assembly routine requires an assembler because its mnemonic instructions must become the target processor's machine code.

### Targeted practice and answers

1. Why is an assembler needed?
   **Answer:** It translates assembly-language mnemonics and operands into machine or object code for the target processor.
2. Give one compiler advantage and its mechanism.
   **Answer:** A compiled program can run repeatedly without translating the source each time because translation occurred before execution.
3. Give one compiler disadvantage.
   **Answer:** Compilation must complete before execution and the programmer may need to correct a list of reported errors.
4. Give one interpreter advantage and one disadvantage.
   **Answer:** It provides immediate statement-level feedback, but repeated translation can make execution slower and requires the interpreter/source at run time.
5. Which translator is required for assembly language?
   **Answer:** An assembler.

### Exam-style question and MS

**Question (6 marks):** Compare a compiler and an interpreter using two advantages and two disadvantages, then justify the translator used for an assembly-language routine.

- **B1** compiler translates the whole high-level program before execution and produces target/object code
- **B1** compiler advantage linked to repeated execution or distribution without source
- **B1** compiler disadvantage linked to separate translation or error-list workflow
- **B1** interpreter translates/executes statements during execution and gives immediate feedback
- **B1** interpreter disadvantage linked to repeated translation, slower execution or run-time dependency
- **B1** assembler selected and justified for assembly-language-to-machine/object-code translation

**Strict note:** Do not award vague claims such as 'compiler is faster' or 'interpreter is easier' without the mechanism and scenario.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### An assembler translates assembly language into machine code

- **Explains:** `assembler`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-assembler.jpg`

1. An assembler translates assembly-language mnemonics into machine code or an object-code module.
2. Machine code uses the instruction set and binary encodings of the target processor.
3. An object module may still need a linker to combine modules and resolve external library references before an executable can be produced.
4. An assembler does not translate high-level languages such as Java or Cambridge pseudocode.

### Comparison: same goal, different route

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-compare.jpg`

1. A compiler translates a whole high-level program before execution and produces target or object code; a linked executable can run repeatedly without the source.
2. An interpreter translates and executes high-level statements during execution and normally produces no separate permanent object-code file.
3. An assembler translates assembly-language mnemonics into target machine code or an object module for a specific processor instruction set.
4. If an assembler or compiler produces object modules, a linker may still be required before there is an executable program.
5. Choose the translator from the input language and the development or deployment need; do not claim that every assembler output is immediately executable.

### A compiler translates the whole high-level program before execution

- **Explains:** `compiler`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-compiler.jpg`

1. Input High-level language source code.
2. Output Object code or executable code after translation.
3. Advantages Executable can run without source code; repeated execution may be faster after compilation.
4. Limitations Errors are often reported after compilation, so debugging may involve checking a list of errors.

### Translator software converts program code into another form

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-concept.jpg`

1. A compiler translates high-level source into target machine or object code.
2. An assembler translates assembly mnemonics into target machine or object code.
3. A linker combines object modules and resolves references to form an executable.
4. A loader places executable code and data into memory; it is not a generic object-to-machine translation stage.

### An interpreter translates and executes statements as the program runs

- **Explains:** `interpreter`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-interpreter.jpg`

1. Input High-level language source code.
2. Output No separate permanent object code is normally produced.
3. Advantages Useful during development because errors can be found statement by statement.
4. Limitations Program may run more slowly because translation happens during execution; source code is needed.
<!-- stage10-explanations:end -->
