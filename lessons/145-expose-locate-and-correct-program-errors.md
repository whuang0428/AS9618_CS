# Lesson 145: Expose, locate and correct program errors

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** constructing a state-transition diagram. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S12.03 only requires understanding the purpose of state-transition diagrams; S12.02 structure-chart construction remains CORE.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Expose, locate and correct program errors

### Direct explanation

- A syntax error breaks the language grammar and is normally exposed by a translator or an IDE's dynamic syntax check. A logic error uses valid syntax but follows the wrong algorithm, so a trace, dry run, walkthrough or deliberately selected test can expose an unexpected result. A run-time error occurs during execution, such as division by zero or opening a missing file, so exception messages and run-time diagnostics help locate it.
- After an error is exposed, locate the responsible statement and identify the error type before changing it. Correct the cause, not only the observed output, then rerun the failing test and relevant regression tests. Avoid faults by using clear identifiers, modular design, validation, desk checking, peer walkthroughs and a planned set of normal, abnormal and extreme/boundary tests.
- No single method proves that a program has no remaining faults. Translation can expose syntax faults but not every logic fault; testing can reveal failures for selected cases but cannot demonstrate correctness for every possible input.
- IDE presentation features include prettyprint and expand/collapse code blocks; expand/collapse changes the displayed view, not program execution.
- A runtime error occurs while the program is executing; runtime diagnostics help locate the statement that caused the failure.
- Program errors can be exposed by suitable test data and expected results, located with trace output or breakpoints, and corrected before the same tests are repeated to confirm the fix.

### Worked example

**Correct three different faults:** A missing ENDIF is a syntax error exposed during translation and corrected by closing the selection. Mark > 50 for a pass boundary of 50 is a logic error exposed by tracing Mark = 50 and corrected to Mark >= 50. Total / Count when Count may be 0 is a run-time risk exposed during execution and avoided by testing Count before division.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which method can expose a syntactically valid wrong boundary?
   **Answer:** A trace, dry run, walkthrough or selected boundary test can expose the wrong result.
2. Why is a translator insufficient for all logic errors?
   **Answer:** Logic errors can obey the language grammar, so translation may succeed even though the result is wrong.
3. What must happen after a correction?
   **Answer:** Rerun the failing test and relevant regression tests to check the correction and existing behaviour.

### Exam-style question and MS

**Question (6 marks):** For each fault, state its type, one way to expose or locate it, and the correction: a missing ENDIF; IF Mark > 50 when 50 should pass; Average <- Total / Count when Count can be zero.

| Answer | Guidance | Marks |
|---|---|---:|
| missing ENDIF identified as syntax error and translator/dynamic syntax check used | Do not accept changing the expected result to hide a program fault, or claim that successful translation proves the algorithm correct. | 1 |
| adds the required ENDIF |  | 1 |
| Mark > 50 identified as logic error and boundary trace/test at 50 used |  | 1 |
| changes the condition to Mark >= 50 or equivalent |  | 1 |
| division by zero identified as run-time error/risk and execution/test diagnostics used |  | 1 |
| guards the division by checking Count or handles the zero case |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 12
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the development activity involved in **Design documentation: algorithms, data dictionaries, and interfaces**.
2. Apply the activity to a stated client requirement or system.
3. Explain how its output supports a later development or testing activity.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask whether development should begin from the request 'make it user-friendly' or from questions that make the requirement measurable. Establish that requirements must be analysed before implementation.

Focus question: Which feature distinguishes **Design documentation: algorithms, data dictionaries, and interfaces** from the most closely related syllabus concept?

## Guided Explanation
Place Design documentation: algorithms, data dictionaries, and interfaces inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is incomplete. Connect the stage to testing and maintenance through explicit feedback paths.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: lifecycle stage. Middle: document or activity produced. Right: risk if skipped.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Given a small client scenario, identify suitable requirements, design evidence, tests or maintenance actions.

**Worked answer / marking focus:** Credit answers that are measurable and scenario-specific. Vague requirements such as 'easy to use' need success criteria to earn strong marks.

## Student Task
Students turn a vague client request into three testable requirements and one acceptance test.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Design documentation: algorithms, data dictionaries, and interfaces**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A data dictionary defines each data item consistently

- **Explains:** `dictionary`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-dictionary.jpg`

1. Data dictionary
2. Validation
3. letter plus digits
4. not blank; exists in room file
5. identifies the room
6. BookingDate
7. YYYY-MM-DD
8. school day; not in past
9. date of booking
10. StartTime
11. valid period start time
12. booking start

### Inspect a field definition

- **Explains:** `dictionary-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-dictionary-tool.jpg`

1. Data dictionary checker
2. Data item

### Interface designs show how users will enter data and navigate the system

- **Explains:** `interfaces`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-interfaces.jpg`

1. Interface designs
2. Create room booking
3. Date calendar control
4. Period drop-down list
5. Room searchable list
6. Error message area: “Room already booked for this time.”
7. Interface design is not just “make the screen pretty”. It specifies controls, navigation, prompts, validation messages and user feedback.

### Design documentation supports implementation, testing and maintenance

- **Explains:** `lifecycle`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-lifecycle.jpg`

1. Using design docs later
2. Implementation
3. Developers know which data fields, algorithms and interface behaviours to build.
4. Testers compare actual behaviour with the designed rules, validation and expected messages.
5. Maintenance
6. Future changes are safer because developers can see existing data rules and processing assumptions.

### Logic errors make the program do the wrong thing

- **Explains:** `logic`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-060-logic.jpg`

1. Meaning The code is syntactically valid and may run, but the algorithm or condition is wrong.
2. Examples Using < instead of <= , wrong formula, wrong loop condition or off-by-one error.
3. Detection Usually found by testing, tracing or comparing actual output with expected output.
4. Common error A translator may not detect it because the instructions are legal.

### Design documents translate requirements into a buildable plan

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-purpose.jpg`

1. Design documentation purpose
2. Before coding
3. They decide data structures, processing logic and user interaction before the implementation language takes over.
4. For testers
5. They provide expected rules and interface behaviour so tests can check more than “it seems fine”.
6. For maintenance
7. They help future developers understand why the system works in a particular way.
8. A useful design document is specific enough to guide construction, but not just a pasted block of final program code.

### Traceability keeps the design connected to the original need

- **Explains:** `traceability`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-traceability.jpg`

1. Linking requirements to design
2. Requirement
3. Algorithm design
4. Data dictionary
5. Interface design
6. Prevent double booking
7. compare requested time with existing bookings
8. RoomID, date, start and end times
9. availability check button and clash message
10. Only staff can book
11. check user role before saving
12. StaffID and Role fields
<!-- stage10-explanations:end -->
