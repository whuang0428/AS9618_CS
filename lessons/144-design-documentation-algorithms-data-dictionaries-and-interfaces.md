# Lesson 144: Design documentation: algorithms, data dictionaries, and interfaces

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

```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```


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

## Stage 2 syllabus completion

**Official audit rows:** S12.02, S12.03
**Focus:** Structure charts and state-transition diagrams

### Direct explanation

- A structure chart shows module hierarchy and calls. Boxes name modules; connecting lines show calling relationships; labelled arrows show data or control parameters passed between modules. Reading top-down supports derivation of procedure headers and calls.
- A state-transition diagram models states and event/condition-labelled transitions, with a marked start state. It describes how an event changes system state, not the sequence of every program statement.

### Worked example

**Door controller:** States are Locked and Unlocked. Start at Locked; validCard / unlock moves to Unlocked; timeout / lock returns to Locked. A structure chart could show ControlDoor calling ReadCard(CardID), ValidateCard(CardID, IsValid) and SetLock(IsValid).

### Targeted practice and answers

1. What does a box represent in a structure chart?
   **Answer:** A module/procedure/function.
2. What labels a state transition?
   **Answer:** The event and, where needed, a condition/action.
3. How can a structure chart guide pseudocode?
   **Answer:** Each module becomes a subprogram with shown parameters and calls.

### Exam-style question and MS

**Question (4 marks):** A system starts LoggedOut. A valid login moves it to LoggedIn; logout returns it to LoggedOut; three invalid attempts move it to Locked. Describe the state-transition diagram.

- **B1** states LoggedOut, LoggedIn and Locked
- **B1** start state points to LoggedOut
- **B1** valid login transition to LoggedIn and logout transition back
- **B1** three invalid attempts transition from LoggedOut to Locked

**Strict note:** Do not accept a flowchart of processing steps; marks require persistent states and event-labelled transitions.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Algorithm designs describe the processing steps

- **Explains:** `algorithms`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-algorithms.jpg`

1. Traverse each booking and first test whether room and date match.
2. Only then test whether the booking times overlap.
3. Close the inner overlap IF before closing the outer room-and-date IF.
4. Advance to the next booking only after both selections are closed.

### A data dictionary defines each data item consistently

- **Explains:** `dictionary`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-144-dictionary-tool.jpg`

1. Data dictionary checker
2. Data item

### Interface designs show how users will enter data and navigate the system

- **Explains:** `interfaces`
- **Explanation type:** mechanism
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
