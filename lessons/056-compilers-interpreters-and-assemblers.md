# Lesson 056: Compilers, interpreters, and assemblers

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 5  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Compilers, interpreters, and assemblers** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Lesson-specific focus question: What would go wrong if a student confused **Compilers, interpreters, and assemblers** with a neighbouring syllabus idea?

## Guided Explanation
Move from source code to executable behaviour. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show why translation is not magic.

Topic-specific teaching move: keep the explanation anchored to **Compilers, interpreters, and assemblers**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Choose a translator for development and another for distributing a finished program. Justify both choices. The worked example must explicitly use **Compilers, interpreters, and assemblers**, not a generic example from the wider unit.

**Worked answer / marking focus:** Interpreter is useful for development due to line-by-line error feedback; compiler is suitable for distribution because object/executable code can run without source code.



## Student Task
Students sort scenarios into compiler, interpreter and assembler, then write one trade-off for each. Their final answer must include the phrase **Compilers, interpreters, and assemblers** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Compilers, interpreters, and assemblers**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Compilers, interpreters, and assemblers** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Compilers, interpreters, and assemblers** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases. For this lesson, make students contrast that mistake with the exact idea of **compilers, interpreters, and assemblers**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### An assembler translates assembly language into machine code

- **Explains:** `assembler`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-assembler.jpg`

1. Input Assembly language mnemonics such as LDA , ADD or STA .
2. Output Machine code/object code that the processor can execute.
3. Purpose Allows low-level programming using mnemonic instructions instead of raw binary.
4. Boundary It does not translate high-level languages such as Python, Java or pseudocode.

### Comparison: same goal, different route

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-compare.jpg`

1. Translator
2. Output / execution behaviour
3. Typical use
4. Compiler
5. High-level source code
6. Produces object/executable code before the program is run.
7. Distribution, repeated execution, protecting source code.
8. Interpreter
9. Translates and executes statement by statement; normally no separate object code.
10. Development, testing, learning and rapid debugging.
11. Assembler
12. Assembly language

### A compiler translates the whole high-level program before execution

- **Explains:** `compiler`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-compiler.jpg`

1. Input High-level language source code.
2. Output Object code or executable code after translation.
3. Advantages Executable can run without source code; repeated execution may be faster after compilation.
4. Limitations Errors are often reported after compilation, so debugging may involve checking a list of errors.

### Translator software converts program code into another form

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-concept.jpg`

1. Source code The program as written by the programmer, usually in a high-level or assembly language.
2. Object code Translated code produced by a compiler or assembler, often close to machine code.
3. Machine code Binary instructions that can be executed directly by the processor.
4. Translator System software that converts code from one language level to another.

### An interpreter translates and executes statements as the program runs

- **Explains:** `interpreter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-interpreter.jpg`

1. Input High-level language source code.
2. Output No separate permanent object code is normally produced.
3. Advantages Useful during development because errors can be found statement by statement.
4. Limitations Program may run more slowly because translation happens during execution; source code is needed.
<!-- stage10-explanations:end -->
