# Lesson 056: Assembler, compiler and interpreter choices

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Assembler, compiler and interpreter choices

### Direct explanation

- An assembler is needed to translate a processor-specific assembly-language program into machine code or object code. A compiler is needed to translate a whole high-level language program before execution, normally producing target/object code. An interpreter translates and executes a high-level language program statement by statement during execution, normally without producing a separate permanent object-code file.
- Compiler advantages include faster repeated execution after translation, distribution without the source code and translation checks across the whole program. Disadvantages include a separate compilation step and an error list that may need several corrections before execution. Interpreter advantages include immediate statement-level feedback and convenient incremental testing. Disadvantages include repeated translation overhead, slower execution and needing the interpreter and usually the source program at run time.
- A justified choice must connect the mechanism to the scenario: an interpreter can suit development and debugging; a compiler can suit repeated use or distribution; an assembler is required for assembly source. These are advantages and disadvantages of the translation approaches, not universal claims that one tool is always better.

### Worked example

**Choose tools across development and deployment:** During development, an interpreter can execute each statement and stop near a fault, giving quick feedback. For final distribution, a compiler can translate the whole high-level program before execution and provide target/object or executable code without distributing the source. A processor-specific assembly routine requires an assembler because its mnemonic instructions must become the target processor's machine code.

<!-- stage2-practice:start -->
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

| Answer | Guidance | Marks |
|---|---|---:|
| compiler translates the whole high-level program before execution and produces target/object code | Do not award vague claims such as 'compiler is faster' or 'interpreter is easier' without the mechanism and scenario. | 1 |
| compiler advantage linked to repeated execution or distribution without source |  | 1 |
| compiler disadvantage linked to separate translation or error-list workflow |  | 1 |
| interpreter translates/executes statements during execution and gives immediate feedback |  | 1 |
| interpreter disadvantage linked to repeated translation, slower execution or run-time dependency |  | 1 |
| assembler selected and justified for assembly-language-to-machine/object-code translation |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the system-software functions involved in **Utility software: backup, compression, encryption, defragmentation, and antivirus**.
2. Explain how the software manages a stated resource or task.
3. Recommend and justify suitable software for a given scenario.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Ask: When an app freezes, do you blame the app, the operating system, the user, or the chair? Use the laugh to separate application software from system software.

Focus question: Which feature distinguishes **Utility software: backup, compression, encryption, defragmentation, and antivirus** from the most closely related syllabus concept?

## Guided Explanation
Start with a user action, then identify which part of system software responds. Compare roles such as resource management, interface support and utility tasks. For Utility software: backup, compression, encryption, defragmentation, and antivirus, keep asking: what service is being provided to hardware, software or the user?

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: user problem. Middle: OS or utility role. Right: benefit and limitation.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A laptop is slow and storage is nearly full. Recommend two system software tools or OS actions and justify them.

**Worked answer / marking focus:** Answers must connect a tool to a job: backup protects data, antivirus detects malware, file management organises storage, process management allocates CPU time.

## Student Task
Students sort cards into OS roles, utility software and application software, then defend two difficult cards.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Utility software: backup, compression, encryption, defragmentation, and antivirus**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 5.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often call every program an operating system. Correction: an OS manages resources and provides services; an app performs user tasks.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Antivirus utilities detect, quarantine and remove malware

- **Explains:** `antivirus`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-antivirus.jpg`

1. Purpose Scan files, memory or downloads for malware signatures or suspicious behaviour.
2. Actions Warn the user, quarantine infected files, delete malware or block malicious activity.
3. Updates Definitions and detection rules should be updated to recognise newer threats.
4. Limitation Antivirus reduces risk but cannot guarantee protection against every new or disguised threat.

### Backup utilities create copies so data can be restored

- **Explains:** `backup`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-backup.jpg`

1. Purpose Create copies of files or systems in another location or storage medium.
2. Benefit Data can be restored after accidental deletion, hardware failure, corruption or ransomware.
3. Good practice Use automatic scheduling, versioning and off-site/cloud copies where appropriate.
4. Limitation A backup is only useful if it is recent, complete and can actually be restored.

### Compression utilities reduce file size

- **Explains:** `compression`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-compression.jpg`

1. Purpose Encode data so it takes up fewer bits than the original file.
2. Uses Save storage space, reduce upload/download time and fit within attachment limits.
3. Lossless Original data can be reconstructed exactly, suitable for text, programs and archives.
4. Lossy Some detail is discarded, often suitable for media where small quality loss is acceptable.

### Utility software performs maintenance and support tasks

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-concept.jpg`

1. System software Software that supports the operation and management of the computer system.
2. Utility software System software designed for a specific maintenance, protection or management task.
3. Not application software It supports the system rather than directly producing user documents, games or media.
4. Scenario link The correct utility depends on whether the problem is loss, size, confidentiality, fragmentation or malware.

### Defragmentation rearranges fragmented files on magnetic disks

- **Explains:** `defrag`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-defrag.jpg`

1. Fragmentation Parts of a file are stored in non-contiguous blocks across a disk.
2. Purpose Rearrange file blocks so related parts are stored closer together.
3. Benefit Can reduce mechanical disk head movement and improve hard disk access time.
4. Boundary Do not apply the same benefit to SSDs; they have no moving disk head.

### Encryption utilities protect confidentiality

- **Explains:** `encryption`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-056-encryption.jpg`

1. Purpose Scramble plaintext into ciphertext using an algorithm and a key.
2. Benefit Unauthorised users cannot read the data without the correct key.
3. Examples Encrypting a laptop drive, a backup archive or files sent over a network.
4. Limitation Encryption does not stop deletion or malware; losing the key can make data unrecoverable.
<!-- stage10-explanations:end -->
