# Lesson 057: Compilation stages: lexical analysis to object code

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Distinguish the translation processes involved in **Compilation stages: lexical analysis to object code**.
2. Describe the input, processing and output of each relevant translator or stage.
3. Select and justify a suitable translation approach for a stated use.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Focus question: Which feature distinguishes **Compilation stages: lexical analysis to object code** from the most closely related syllabus concept?

## Guided Explanation
Move from source code through lexical analysis, syntax analysis, semantic analysis, code generation and optimisation to object code. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show how translation diagnostics are produced.

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

**Worked answer / marking focus:** A compiler is usually suitable because it produces object code before execution; a linker can then combine object modules and libraries into an executable that can be distributed without source code. An interpreter is useful during development for statement-by-statement diagnostics.



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
- Answer one 4-mark question about **Compilation stages: lexical analysis to object code**. Follow its command word and apply each point to the stated context.

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

### Code generation produces object code

- **Explains:** `generation`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-generation.jpg`

1. Input Checked intermediate representation or syntax tree.
2. Action Generates target low-level instructions for the processor or virtual machine.
3. Output Object code, often not yet a complete final executable.
4. Boundary Linking external modules and loading into memory belong to the next lesson.

### Lexical analysis converts character streams into tokens

- **Explains:** `lexical`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-lexical.jpg`

1. Lexical analysis converts source characters into tokens.
2. Keywords, identifiers, literals and operators are distinct token categories.
3. Semicolons, parentheses and braces are delimiters or punctuation, not all operators.

### Optimisation improves code without changing what it does

- **Explains:** `optimisation`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-optimisation.jpg`

1. Purpose Improve efficiency, such as speed or memory use.
2. Examples Remove unreachable code or avoid repeated calculations.
3. Rule The program's intended behaviour should remain the same.
4. Common error Optimisation does not mean fixing all logic errors in the programmer's algorithm.

### The compilation pipeline transforms source code into object code

- **Explains:** `pipeline`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-pipeline.jpg`

1. Source code The high-level program written by the programmer.
2. Tokens Meaningful units such as identifiers, keywords, operators and literals.
3. Checks The compiler checks structure and meaning before generating code.
4. Object code Translated low-level code output by the compiler before linking/loading details.

### Semantic analysis checks meaning and context

- **Explains:** `semantic`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-semantic.jpg`

1. Meaning Code can be grammatically correct but still not make valid sense.
2. Checks Type compatibility, variable declarations, scope and valid operations.
3. Symbol table Stores information about identifiers such as names, types and locations.
4. Errors Examples include using an undeclared variable or adding incompatible types.

### Syntax analysis checks grammar and program structure

- **Explains:** `syntax`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-syntax.jpg`

1. Input Tokens produced by lexical analysis.
2. Action Checks whether tokens follow the grammar rules of the language.
3. Output May build a parse tree or syntax tree to represent structure.
4. Errors Can detect missing brackets, invalid statement order or malformed expressions.
<!-- stage10-explanations:end -->
