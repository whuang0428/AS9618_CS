# Lesson 052: System software overview: operating systems, utility software, and translators

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 5  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **System software overview: operating systems, utility software, and translators** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Lesson-specific focus question: What would go wrong if a student confused **System software overview: operating systems, utility software, and translators** with a neighbouring syllabus idea?

## Guided Explanation
Move from source code to executable behaviour. Compare compiler, interpreter and assembler by when translation happens, what output is produced, and how errors are reported. Use one syntax error to show why translation is not magic.

Topic-specific teaching move: keep the explanation anchored to **System software overview: operating systems, utility software, and translators**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Choose a suitable translator for distributing a finished program and justify the choice. The worked example must explicitly use **System software overview: operating systems, utility software, and translators**, not a generic example from the wider unit.

**Worked answer / marking focus:** Compiler is usually suitable for distribution because it produces object/executable code and can run without source code; interpreter is useful during development for line-by-line diagnostics.



## Student Task
Students receive development and deployment scenarios and choose compiler, interpreter or assembler with one reason and one trade-off. Their final answer must include the phrase **System software overview: operating systems, utility software, and translators** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **System software overview: operating systems, utility software, and translators**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **System software overview: operating systems, utility software, and translators** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **System software overview: operating systems, utility software, and translators** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say interpreters are 'bad compilers'. Correction: they are different translation approaches with different use cases. For this lesson, make students contrast that mistake with the exact idea of **system software overview: operating systems, utility software, and translators**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### System software versus application software

- **Explains:** `categories`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-categories.jpg`

1. System software
2. Runs, manages or maintains the computer system. It provides services that applications depend on.
3. Operating system
4. Utility software
5. Language translators
6. Application software
7. Helps the user perform a specific task, such as writing a document, editing a video or browsing the web.
8. Word processor
9. Spreadsheet
10. Web browser

### System software supports the running and maintenance of the computer

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-concept.jpg`

1. System software
2. Software that manages hardware, supports applications and helps maintain the computer system.
3. Operating system
4. System software that manages resources and provides an interface and services for users and applications.
5. Utility software
6. System software that performs maintenance, protection or optimisation tasks.
7. Translator
8. System software that converts source code into code that can be executed or further processed.

### Operating system: the main coordinator

- **Explains:** `os`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-os.jpg`

1. User interface Provides a way for users to interact with the computer, such as GUI or command line.
2. Resource management Allocates and controls hardware resources such as processor time, memory and devices.
3. File services Provides file organisation, storage access and permission support.
4. Application services Provides services and APIs that application software can use.
5. Boundary
6. Detailed process, memory, file and device management are developed in Lesson 053. Here the OS is introduced as the main system coordinator.

### Translation pathway

- **Explains:** `pathway`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-pathway.jpg`

1. High-level source code Human-readable instructions such as Python, Java or pseudocode-like code.
2. Translator Compiler/interpreter converts or executes the source language.
3. Object / executable / machine code Low-level code that the processor can execute directly or as part of a build process.
4. Error feedback Syntax and translation errors must be reported so the programmer can correct them.

### Language translators: source code to executable behaviour

- **Explains:** `translators`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-translators.jpg`

1. Compiler
2. Translates the whole source program before execution, often producing object or executable code.
3. Interpreter
4. Translates and executes source code statement by statement, often useful during development and debugging.
5. Assembler
6. Translates assembly language mnemonics into machine code for a specific processor.
7. Common trap
8. An interpreter is not a "bad compiler". It is a different translation approach with different trade-offs.

### Utility software: maintenance and protection tools

- **Explains:** `utility`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-utility.jpg`

1. Exam-safe wording
2. Antivirus
3. Detects, quarantines or removes malware.
4. Protects the system from malicious software.
5. Creates copies of files/data.
6. Allows recovery after data loss, corruption or hardware failure.
7. Compression
8. Reduces file size.
9. Saves storage space or reduces transmission time.
10. Disk/file tools
11. Manage storage, clean temporary files or check disks.
12. Maintains storage organisation and may improve usability.
<!-- stage10-explanations:end -->
