# Lesson 052: System software overview: operating systems, utility software and translators

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** System software: operating-system and utility roles

### Direct explanation

- An operating system is required to provide a controlled interface between applications, users and hardware, and to coordinate shared resources. Without it, each application would need its own incompatible routines for processor time, memory, files, security and devices.
- Process management schedules CPU time and tracks running processes. Memory management allocates and protects RAM. File management organises files, folders, metadata and file operations. Security management authenticates users and enforces permissions or access rights.
- Hardware management coordinates devices through drivers, interrupts, buffers and queues. These roles cooperate: security management decides whether a request is authorised, while file or hardware management performs the permitted operation. Antivirus remains a utility and must not replace the OS security-management role.
- A disk formatter prepares a storage medium with file-system structures. A virus checker scans for, quarantines and removes malware. A disk defragmenter rearranges fragmented file blocks on a magnetic disk; it is not a speed treatment for SSDs.
- A disk contents analysis/repair utility examines file-system structures, reports faults and attempts defined repairs. Compression reduces file size and backup creates a separate recoverable copy. Encryption may be useful additional protection, but it does not replace any of the six named syllabus utilities.
- Required utilities include defragmentation software and disk contents analysis/disk repair software; defragmentation rearranges file blocks, while analysis/repair checks and attempts to repair file-system faults.

### Worked example

**Open a protected file and print it / Choose the utility from the fault:** The OS authenticates the user and security management checks access rights. File management locates and opens the file; memory management allocates RAM; process management schedules the application; hardware management uses a printer driver, buffer and queue to send permitted output to the printer. Use a formatter to prepare a new storage medium, disk analysis/repair for file-system errors, a backup to recover a deleted file, and compression to reduce transfer size. Choose by the operation required, not by calling every tool 'maintenance'.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which OS role authenticates a user and enforces access rights?
   **Answer:** Security management.
2. Which role allocates RAM to a running process?
   **Answer:** Memory management.
3. Which role uses drivers, buffers and queues?
   **Answer:** Hardware management/device management.
4. Why is an operating system required?
   **Answer:** It provides a controlled interface and coordinates shared hardware and software resources for applications and users.
5. Which utility prepares file-system structures on a storage medium?
   **Answer:** A disk formatter.
6. Which utility checks file-system structures and attempts repairs?
   **Answer:** A disk contents analysis/repair utility.
7. Why is compression not a backup?
   **Answer:** Compression reduces size; a backup creates a separate copy that can be restored.

### Exam-style question and MS

**Question (10 marks):** Explain why an operating system is required and describe its process, memory, file, security and hardware management roles. A computer has a new storage medium and another disk reports file-system errors. Identify the utility for each task and explain its purpose.

| Answer | Guidance | Marks |
|---|---|---:|
| required interface/control layer between applications, users and hardware | Do not substitute antivirus utility software for OS security management, and do not treat stored files as RAM. Do not accept defragmentation as formatting or as a general file-system repair operation. | 1 |
| process management schedules CPU time or tracks processes |  | 1 |
| memory management allocates/protects RAM |  | 1 |
| file management organises stored files and operations |  | 1 |
| security management authenticates users or enforces permissions/access rights |  | 1 |
| hardware management uses drivers/interrupts/buffers/queues to coordinate devices |  | 1 |
| disk formatter for the new medium |  | 1 |
| formatter creates/prepares file-system structures |  | 1 |
| disk contents analysis/repair utility for the faulty disk |  | 1 |
| it examines structures and reports/attempts repair of faults |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Distinguish the translation processes involved in **System software overview: operating systems, utility software, and translators**.
2. Describe the input, processing and output of each relevant translator or stage.
3. Select and justify a suitable translation approach for a stated use.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Write a tiny high-level statement and a made-up machine-code-looking line. Ask: Which one would a human prefer, and which one would the processor accept without complaining?

Focus question: Which feature distinguishes **System software overview: operating systems, utility software, and translators** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **System software overview: operating systems, utility software, and translators**. Follow its command word and apply each point to the stated context.

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

### System software versus application software

- **Explains:** `categories`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** CORE / TEACH
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-pathway.jpg`

1. High-level source code Human-readable instructions such as Python, Java or pseudocode-like code.
2. Translator Compiler/interpreter converts or executes the source language.
3. Object / executable / machine code Low-level code that the processor can execute directly or as part of a build process.
4. Error feedback Syntax and translation errors must be reported so the programmer can correct them.

### Language translators: source code to executable behaviour

- **Explains:** `translators`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-052-translators.jpg`

1. Compiler
2. Translates the whole source program before execution, often producing object or executable code.
3. Interpreter
4. Translates and executes source code statement by statement, often useful during development and debugging.
5. Assembler
6. Translates assembly language mnemonics into machine code for a specific processor.
7. Common error
8. An interpreter is not a "bad compiler". It is a different translation approach with different trade-offs.

### Utility software: maintenance and protection tools

- **Explains:** `utility`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
