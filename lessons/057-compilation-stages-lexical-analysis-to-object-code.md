# Lesson 057: Compilation stages: lexical analysis to object code

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 5  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Compilation stages: lexical analysis to object code** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Lesson-specific focus question: What would go wrong if a student confused **Compilation stages: lexical analysis to object code** with a neighbouring syllabus idea?

## Guided Explanation
Move from source code to executable behaviour. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show why translation is not magic.

Topic-specific teaching move: keep the explanation anchored to **Compilation stages: lexical analysis to object code**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: source code. Middle: translation pathway. Right: compiler/interpreter/assembler comparison.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Choose a suitable translator for distributing a finished program and justify the choice. The worked example must explicitly use **Compilation stages: lexical analysis to object code**, not a generic example from the wider unit.

**Worked answer / marking focus:** Compiler is usually suitable for distribution because it produces object/executable code and can run without source code; interpreter is useful during development for line-by-line diagnostics.



## Student Task
Students receive development and deployment scenarios and choose compiler, interpreter or assembler with one reason and one trade-off. Their final answer must include the phrase **Compilation stages: lexical analysis to object code** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Compilation stages: lexical analysis to object code**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Compilation stages: lexical analysis to object code** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Compilation stages: lexical analysis to object code** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases. For this lesson, make students contrast that mistake with the exact idea of **compilation stages: lexical analysis to object code**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Code generation produces object code

- **Explains:** `generation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-generation.jpg`

1. Input Checked intermediate representation or syntax tree.
2. Action Generates target low-level instructions for the processor or virtual machine.
3. Output Object code, often not yet a complete final executable.
4. Boundary Linking external modules and loading into memory belong to the next lesson.

### Lexical analysis converts character streams into tokens

- **Explains:** `lexical`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-lexical.jpg`

1. Input Source code as a stream of characters.
2. Action Groups characters into tokens such as identifiers, operators, constants and keywords.
3. Also May remove unnecessary whitespace and comments.
4. Errors Can detect invalid characters or unrecognised symbols.

### Optimisation improves code without changing what it does

- **Explains:** `optimisation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-optimisation.jpg`

1. Purpose Improve efficiency, such as speed or memory use.
2. Examples Remove unreachable code or avoid repeated calculations.
3. Rule The program's intended behaviour should remain the same.
4. Trap Optimisation does not mean fixing all logic errors in the programmer's algorithm.

### The compilation pipeline transforms source code into object code

- **Explains:** `pipeline`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-pipeline.jpg`

1. Source code The high-level program written by the programmer.
2. Tokens Meaningful units such as identifiers, keywords, operators and literals.
3. Checks The compiler checks structure and meaning before generating code.
4. Object code Translated low-level code output by the compiler before linking/loading details.

### Semantic analysis checks meaning and context

- **Explains:** `semantic`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-semantic.jpg`

1. Meaning Code can be grammatically correct but still not make valid sense.
2. Checks Type compatibility, variable declarations, scope and valid operations.
3. Symbol table Stores information about identifiers such as names, types and locations.
4. Errors Examples include using an undeclared variable or adding incompatible types.

### Syntax analysis checks grammar and program structure

- **Explains:** `syntax`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-057-syntax.jpg`

1. Input Tokens produced by lexical analysis.
2. Action Checks whether tokens follow the grammar rules of the language.
3. Output May build a parse tree or syntax tree to represent structure.
4. Errors Can detect missing brackets, invalid statement order or malformed expressions.
<!-- stage10-explanations:end -->
