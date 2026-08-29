# Lesson 144: Design documentation: algorithms, data dictionaries, and interfaces

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

**Focus:** Structure charts and the purpose of state-transition diagrams

### Direct explanation

- A structure chart documents decomposition into modules, procedures and functions. Boxes name modules; hierarchy lines show which module calls another; labelled arrows show data or control parameters passed between them. Its purpose is to communicate modular structure and interfaces before coding.
- To construct a structure chart, place the controlling module at the top, split the problem into one-responsibility subtasks, connect each caller to its called modules, and label every value passed. To derive equivalent pseudocode, turn each box into a complete PROCEDURE or FUNCTION header with corresponding parameters, add calls in the parent body with matching arguments, and preserve the shown hierarchy.
- A state-transition diagram documents an algorithm by showing persistent states and the events that cause changes between them. Its syllabus requirement is to understand that purpose; constructing a state-transition diagram is retained only as Optional enrichment.

### Worked example

**Door controller: two design views:** A structure chart places ControlDoor above ReadCard(CardID), ValidateCard(CardID, IsValid) and SetLock(IsValid). Equivalent pseudocode declares those interfaces and calls them from ControlDoor with matching arguments. A provided state-transition diagram with Locked and Unlocked states serves a different purpose: it documents event-driven changes rather than module hierarchy or processing sequence.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What does a box represent in a structure chart?
   **Answer:** A module, procedure or function.
2. How are parameters represented and then derived into pseudocode?
   **Answer:** Labelled arrows show values passed; the same values appear as parameters in the called header and arguments in the caller's call.
3. What does a state-transition diagram document?
   **Answer:** The persistent states of an algorithm/system and the event-driven changes between them.
4. Why is a state-transition diagram not a flowchart?
   **Answer:** Its purpose is to document states and transitions, not every processing step in sequence.

### Exam-style question and MS

**Question (6 marks):** For a login system, construct a structure chart in which Main calls ReadCredentials(UserID, Password) and CheckLogin(UserID, Password, IsValid), then derive equivalent subprogram headers and calls. A separate diagram shows LoggedOut, LoggedIn and Locked states: explain the purpose of this state-transition diagram.

| Answer | Guidance | Marks |
|---|---|---:|
| structure chart places Main above the two called modules | Do not award construction marks for the state-transition diagram; the construction marks apply to the structure chart only. | 1 |
| parameter arrows label UserID, Password and IsValid coherently |  | 1 |
| derived pseudocode contains matching complete headers and calls with arguments |  | 1 |
| identifies persistent states in the provided state-transition diagram |  | 1 |
| explains that labelled transitions show event-driven changes |  | 1 |
| distinguishes this purpose from module hierarchy or a flowchart of processing steps |  | 1 |
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

### Structure charts, derived pseudocode and state transitions

- **Explains:** `algorithms`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-algorithms.jpg`

1. A structure chart shows module hierarchy, calling relationships and labelled parameters passed between modules, procedures or functions.
2. Derive pseudocode by turning each box into a complete subprogram header and each hierarchy connection into a matching call with arguments.
3. A separate state-transition diagram marks the start state and uses directed, event-labelled transitions between persistent states; it is not a flowchart of processing steps.

### A data dictionary defines each data item consistently

- **Explains:** `dictionary`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-dictionary.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-dictionary-tool.jpg`

1. Data dictionary checker
2. Data item

### Interface designs show how users will enter data and navigate the system

- **Explains:** `interfaces`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-interfaces.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-lifecycle.jpg`

1. Using design docs later
2. Implementation
3. Developers know which data fields, algorithms and interface behaviours to build.
4. Testers compare actual behaviour with the designed rules, validation and expected messages.
5. Maintenance
6. Future changes are safer because developers can see existing data rules and processing assumptions.

### Design documents translate requirements into a buildable plan

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-purpose.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-traceability.jpg`

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
