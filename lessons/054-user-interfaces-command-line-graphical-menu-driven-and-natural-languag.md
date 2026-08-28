# Lesson 054: Libraries and dynamically linked library files

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** command-line, graphical, menu-driven and natural-language user-interface taxonomy. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S5.01 operating-system purpose and management roles.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Libraries and dynamically linked library files

### Direct explanation

- Software under development is often constructed using existing code from program libraries. A program library is a collection of reusable routines or modules, so a developer can call tested implementations instead of rewriting common mathematical, input/output, graphics or string operations.
- Benefits to the developer include shorter development time, less duplicated source code, reuse of tested routines and more consistent maintenance. A dynamically linked library (DLL) is connected when a program loads or calls it rather than copying all library code into every executable.
- DLL files can reduce executable size and memory duplication, support reuse and allow one shared update. They also create dependency and version risks: a missing or incompatible DLL can stop a program loading or change behaviour.
- A developer benefit of a program library is reuse of existing tested routines, which can reduce development time and duplicated code.

### Worked example

**Three programs use one graphics DLL:** All three executables call the shared graphics code. One loaded copy may be shared in memory and a security fix can update the DLL once, but replacing it with an incompatible version can break all three programs.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. How do program libraries support software under development?
   **Answer:** They supply existing reusable routines or modules, avoiding the need to write common code again.
2. When is a dynamically linked library connected to a program?
   **Answer:** At load time or run time when required.
3. Give one storage benefit of dynamic linking.
   **Answer:** Library code need not be copied into every executable.
4. Give one DLL risk.
   **Answer:** A missing/incompatible version can prevent execution or cause faults.

### Exam-style question and MS

**Question (4 marks):** Explain two benefits and one drawback of using a dynamically linked library.

| Answer | Guidance | Marks |
|---|---|---:|
| shared reusable code / avoids rewriting | Do not accept 'saves space' unless duplication or executable size is explained. | 1 |
| smaller executables or reduced duplicate memory/storage |  | 1 |
| shared library can be updated once |  | 1 |
| missing/incompatible DLL can stop or alter programs |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 5
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the system-software functions involved in **User interfaces: command line, graphical, menu-driven, and natural language**.
2. Explain how the software manages a stated resource or task.
3. Recommend and justify suitable software for a given scenario.

## Key Vocabulary
English first, Chinese support:

- operating system 操作系统, compiler 编译器, interpreter 解释器, utility software 实用程序

## Warm-Up Hook
Ask: When an app freezes, do you blame the app, the operating system, the user, or the chair? Use the laugh to separate application software from system software.

Focus question: Which feature distinguishes **User interfaces: command line, graphical, menu-driven, and natural language** from the most closely related syllabus concept?

## Guided Explanation
Start with a user action, then identify which part of system software responds. Compare roles such as resource management, interface support and utility tasks. For User interfaces: command line, graphical, menu-driven, and natural language, keep asking: what service is being provided to hardware, software or the user?

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
**Problem:** Choose a suitable interface for an experienced network administrator entering repeated commands and for a visitor selecting a ticket at a kiosk. Justify each choice.

**Worked answer / marking focus:** A command-line interface suits the administrator because precise commands can be entered quickly and automated, while a menu-driven or graphical interface suits the visitor because visible choices reduce the need to remember commands. Credit suitability linked to each user and task.

## Student Task
Students match command-line, graphical, menu-driven and natural-language interfaces to users and tasks, then justify one advantage and one limitation in context.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **User interfaces: command line, graphical, menu-driven, and natural language**. Follow its command word and apply each point to the stated context.

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

### Command line interface: precise text commands

- **Explains:** `cli`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-054-cli.jpg`

1. How it works The user types commands and parameters at a prompt.
2. Advantages Fast for experts, supports automation/scripts, can use fewer system resources.
3. Limitations Users must know exact commands; errors can occur from mistyped syntax.
4. Good fit System administration, batch operations, remote servers and repeatable tasks.

### Compare interface suitability by scenario

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-054-compare.jpg`

1. Scenario
2. Likely suitable interface
3. Expert admin repeats a file operation
4. Commands/scripts are efficient for repeatable precise tasks.
5. Novice edits photos
6. Visual feedback and direct manipulation support the task.
7. Customer buys a train ticket
8. Menu-driven
9. Fixed choices guide the user and reduce input errors.
10. Driver asks for directions hands-free
11. Natural language
12. Speech input can be used without touching the device.

### A user interface allows interaction with a computer system

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-054-concept.jpg`

1. User interface The method by which a user communicates with a computer system.
2. Usability How easy and effective an interface is for a specific user and task.
3. Accessibility How well an interface can be used by people with different needs or abilities.
4. Context The environment, user skill level and task determine suitability.

### Graphical user interface: visual objects and pointer actions

- **Explains:** `gui`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-054-gui.jpg`

1. How it works Uses windows, icons, menus and a pointer/touch input.
2. Advantages Intuitive for many users, easy to learn, supports visual feedback and direct manipulation.
3. Limitations Can use more memory/processing power; repetitive actions may be slower than commands.
4. Good fit General desktop use, creative work, browsing files and visual tasks.

### Libraries provide reusable routines and modules

- **Explains:** `libraries`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-058-libraries.jpg`

1. Purpose Provide pre-written, tested routines that programs can use.
2. Examples Mathematical functions, input/output routines, graphics or string-handling routines.
3. Benefits Saves development time, reduces duplication and may improve reliability.
4. Requirement Calls to library routines must be linked or made available at run time.

### Menu-driven interface: choose from fixed options

- **Explains:** `menu`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-054-menu.jpg`

1. How it works The user selects from displayed options, often step by step.
2. Advantages Reduces memorisation, restricts invalid choices, useful for simple repeated tasks.
3. Limitations Can be slow for expert users; limited to available options; nested menus can frustrate users.
4. Good fit ATMs, ticket machines, phone menus and kiosks.

### Natural language interface: ordinary language input

- **Explains:** `natural`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-054-natural.jpg`

1. How it works The user speaks or types instructions in ordinary human language.
2. Advantages Can be accessible, hands-free and intuitive for simple requests.
3. Limitations May misinterpret ambiguous wording, accents, noise or context.
4. Good fit Voice assistants, search queries, smart speakers and accessibility support.
<!-- stage10-explanations:end -->
