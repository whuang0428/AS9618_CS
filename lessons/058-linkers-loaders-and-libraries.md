# Lesson 058: Linkers, loaders, and libraries

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Linkers, loaders, and libraries** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Lesson-specific focus question: What would go wrong if a student confused **Linkers, loaders, and libraries** with a neighbouring syllabus idea?

## Guided Explanation
Move from source code to executable behaviour. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show why translation is not magic.

Topic-specific teaching move: keep the explanation anchored to **Linkers, loaders, and libraries**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Choose a suitable translator for distributing a finished program and justify the choice. The worked example must explicitly use **Linkers, loaders, and libraries**, not a generic example from the wider unit.

**Worked answer / marking focus:** Compiler is usually suitable for distribution because it produces object/executable code and can run without source code; interpreter is useful during development for line-by-line diagnostics.



## Student Task
Students receive development and deployment scenarios and choose compiler, interpreter or assembler with one reason and one trade-off. Their final answer must include the phrase **Linkers, loaders, and libraries** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Linkers, loaders, and libraries**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Linkers, loaders, and libraries** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Linkers, loaders, and libraries** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases. For this lesson, make students contrast that mistake with the exact idea of **linkers, loaders, and libraries**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S5.03
**Focus:** Libraries and dynamically linked library files

### Direct explanation

- A library is a tested collection of reusable code. A dynamically linked library is linked when a program loads or calls it, rather than copying all library code into every executable.
- DLLs can reduce executable size and memory duplication, support reuse and allow one shared update. They also create dependency and version risks: a missing or incompatible DLL can stop a program loading or change behaviour.

### Worked example

**Three programs use one graphics DLL:** All three executables call the shared graphics code. One loaded copy may be shared in memory and a security fix can update the DLL once, but replacing it with an incompatible version can break all three programs.

### Targeted practice and answers

1. When is a dynamically linked library connected to a program?
   **Answer:** At load time or run time when required.
2. Give one storage benefit of dynamic linking.
   **Answer:** Library code need not be copied into every executable.
3. Give one DLL risk.
   **Answer:** A missing/incompatible version can prevent execution or cause faults.

### Exam-style question and MS

**Question (4 marks):** Explain two benefits and one drawback of using a dynamically linked library.

- **B1** shared reusable code / avoids rewriting
- **B1** smaller executables or reduced duplicate memory/storage
- **B1** shared library can be updated once
- **B1** missing/incompatible DLL can stop or alter programs

**Strict note:** Do not accept 'saves space' unless duplication or executable size is explained.
