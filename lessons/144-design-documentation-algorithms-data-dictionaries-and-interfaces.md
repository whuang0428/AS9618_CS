# Lesson 144: Design documentation: algorithms, data dictionaries, and interfaces

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 12
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Design documentation: algorithms, data dictionaries, and interfaces** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask: If a client says 'make it user-friendly', should we start coding or start asking better questions? Requirements first; keyboard heroics later.

Lesson-specific focus question: What would go wrong if a student confused **Design documentation: algorithms, data dictionaries, and interfaces** with a neighbouring syllabus idea?

## Guided Explanation
Place Design documentation: algorithms, data dictionaries, and interfaces inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is weak. Connect the stage to testing and maintenance, not as a poster but as a feedback loop.

Topic-specific teaching move: keep the explanation anchored to **Design documentation: algorithms, data dictionaries, and interfaces**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: lifecycle stage. Middle: document or activity produced. Right: risk if skipped.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Given a small client scenario, identify suitable requirements, design evidence, tests or maintenance actions. The worked example must explicitly use **Design documentation: algorithms, data dictionaries, and interfaces**, not a generic example from the wider unit.

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
Students turn a vague client request into three testable requirements and one acceptance test. Their final answer must include the phrase **Design documentation: algorithms, data dictionaries, and interfaces** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Design documentation: algorithms, data dictionaries, and interfaces**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Design documentation: algorithms, data dictionaries, and interfaces** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Design documentation: algorithms, data dictionaries, and interfaces** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. For this lesson, make students contrast that mistake with the exact idea of **design documentation: algorithms, data dictionaries, and interfaces**.
Correction prompt: "Show the mechanism, not just the label."

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
