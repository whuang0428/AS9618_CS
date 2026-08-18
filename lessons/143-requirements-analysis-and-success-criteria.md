# Lesson 143: Requirements analysis and success criteria

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 12  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Requirements analysis and success criteria** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask: If a client says 'make it user-friendly', should we start coding or start asking better questions? Requirements first; keyboard heroics later.

Lesson-specific focus question: What would go wrong if a student confused **Requirements analysis and success criteria** with a neighbouring syllabus idea?

## Guided Explanation
Place Requirements analysis and success criteria inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is weak. Connect the stage to testing and maintenance, not as a poster but as a feedback loop.

Topic-specific teaching move: keep the explanation anchored to **Requirements analysis and success criteria**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Given a small client scenario, identify suitable requirements, design evidence, tests or maintenance actions. The worked example must explicitly use **Requirements analysis and success criteria**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit answers that are measurable and scenario-specific. Vague requirements such as 'easy to use' need success criteria to earn strong marks.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students turn a vague client request into three testable requirements and one acceptance test. Their final answer must include the phrase **Requirements analysis and success criteria** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Requirements analysis and success criteria**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Requirements analysis and success criteria** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Requirements analysis and success criteria** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. For this lesson, make students contrast that mistake with the exact idea of **requirements analysis and success criteria**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Acceptance tests check whether requirements are met

- **Explains:** `acceptance`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-acceptance.jpg`

1. Acceptance tests
2. Requirement
3. Test data/action
4. Expected result
5. Evidence
6. reject double booking
7. try to book Room 12 at an occupied time
8. booking rejected with message
9. test result screenshot/log
10. search within 2 seconds
11. search all rooms for Monday period 3
12. results shown within 2 seconds

### Analysis turns user needs into a requirements specification

- **Explains:** `analysis`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-analysis.jpg`

1. Requirements analysis
2. Use interviews, questionnaires, observation or document analysis to find needs.
3. Remove ambiguity by asking about users, tasks, data, constraints and priorities.
4. Write requirements that can guide design and later testing.

### Is the criterion testable?

- **Explains:** `criteria-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-criteria-tool.jpg`

1. Criteria checker
2. Criterion

### Functional requirements describe what the system must do

- **Explains:** `functional`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-functional.jpg`

1. Functional requirements
2. Vague request
3. Functional requirement
4. Why stronger
5. manage bookings
6. allow teachers to create, edit and cancel room bookings
7. states actions and user
8. avoid clashes
9. reject a booking if the room is already booked for that time
10. states exact rule
11. show information
12. display a timetable for a selected room and date

### Non-functional requirements describe qualities or constraints

- **Explains:** `non-functional`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-non-functional.jpg`

1. Non-functional requirements
2. Measurable requirement
3. Possible evidence
4. performance
5. room search results display within 2 seconds
6. timed test
7. usability
8. a new teacher can create a booking in under 2 minutes after one demonstration
9. user trial
10. security
11. only staff with valid login credentials can create bookings
12. access test

### Turn vague requests into stronger requirements

- **Explains:** `rewriter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-rewriter.jpg`

1. Interactive rewriter
2. Vague request

### Different users reveal different requirements

- **Explains:** `stakeholders`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-stakeholders.jpg`

1. Stakeholders
2. Teachers
3. Need quick booking and clear room availability.
4. Admin staff
5. Need reports, conflict resolution and permission controls.
6. IT support
7. Need backup, user management and maintainable configuration.

### Success criteria make evaluation possible

- **Explains:** `success`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-143-success.jpg`

1. Success criteria
2. “The system should be easy to use.”
3. Stronger
4. “At least 8 out of 10 teachers can create a booking without help in under 2 minutes.”
5. A success criterion should be specific enough that two people can test it and reach the same conclusion.
<!-- stage10-explanations:end -->
