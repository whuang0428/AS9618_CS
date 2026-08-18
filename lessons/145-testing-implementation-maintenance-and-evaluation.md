# Lesson 145: Testing, implementation, maintenance, and evaluation

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 12
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Testing, implementation, maintenance, and evaluation** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask: If a client says 'make it user-friendly', should we start coding or start asking better questions? Requirements first; keyboard heroics later.

Lesson-specific focus question: What would go wrong if a student confused **Testing, implementation, maintenance, and evaluation** with a neighbouring syllabus idea?

## Guided Explanation
Place Testing, implementation, maintenance, and evaluation inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is weak. Connect the stage to testing and maintenance, not as a poster but as a feedback loop.

Topic-specific teaching move: keep the explanation anchored to **Testing, implementation, maintenance, and evaluation**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Given a small client scenario, identify suitable requirements, design evidence, tests or maintenance actions. The worked example must explicitly use **Testing, implementation, maintenance, and evaluation**, not a generic example from the wider unit.

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
Students turn a vague client request into three testable requirements and one acceptance test. Their final answer must include the phrase **Testing, implementation, maintenance, and evaluation** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Testing, implementation, maintenance, and evaluation**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Testing, implementation, maintenance, and evaluation** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Testing, implementation, maintenance, and evaluation** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. For this lesson, make students contrast that mistake with the exact idea of **testing, implementation, maintenance, and evaluation**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S12.05, S12.06
**Focus:** Testing methods, strategy and test plan

### Direct explanation

- Dry run manually traces code; walkthrough is a structured peer review; white-box derives tests from internal paths; black-box derives tests from specifications. Integration tests combined modules, using a stub to imitate an unavailable called module.
- Alpha testing is performed internally before release; beta testing uses selected external users in realistic settings; acceptance testing checks the delivered system against agreed requirements. A strategy states levels/methods/responsibility, while a test plan records test ID, purpose, data, expected result, actual result and pass/fail.

### Worked example

**Test login:** White-box tests cover true/false paths and lockout count; black-box tests valid, invalid and boundary inputs from requirements; a stub returns simulated account results before the database is ready; acceptance confirms the agreed lockout behaviour.

### Targeted practice and answers

1. Which method derives tests from source-code paths?
   **Answer:** White-box testing.
2. Who normally performs beta testing?
   **Answer:** Selected external/end users in realistic use.
3. What does a stub replace?
   **Answer:** A called module/component not yet available.

### Exam-style question and MS

**Question (4 marks):** Describe four fields that should appear in a test plan and explain why expected and actual results are both recorded.

- **B1** test identifier/purpose or feature
- **B1** test data/input and expected result
- **B1** actual result and pass/fail outcome
- **B1** comparison shows whether observed behaviour meets the predicted requirement

**Strict note:** Do not accept a list containing only normal/abnormal/boundary; those are test-data categories, not a complete test plan.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Changeover methods balance risk, cost and speed

- **Explains:** `changeover`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-changeover.jpg`

1. Implementation strategies
2. Advantage
3. Risk or cost
4. old system stops; new system starts immediately
5. fast and cheaper
6. high risk if new system fails
7. Parallel
8. old and new run together for a time
9. outputs can be compared
10. expensive and more work
11. new system introduced one part at a time
12. faults are contained

### Classify input for NumberOfStudents, valid range 1 to 30

- **Explains:** `data-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-data-tool.jpg`

1. Test data classifier
2. Test value

### Evaluation judges the final system against requirements and success criteria

- **Explains:** `evaluation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-evaluation.jpg`

1. Evaluation
2. Success criterion
3. Evidence
4. Evaluation judgement
5. teachers create booking in under 2 minutes
6. 8 out of 10 trial users met the target
7. criterion met, but training may help remaining users
8. reject double bookings
9. all clash test cases rejected invalid bookings
10. criterion met for tested cases
11. search within 2 seconds
12. 95 of 100 searches completed within target

### Implementation turns the design into a working system

- **Explains:** `implementation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-implementation.jpg`

1. Implementation
2. Program modules, create files or databases, implement interfaces and connect components.
3. Put the system into the user environment, configure hardware, accounts, permissions and data.
4. Document
5. Prepare user instructions and technical notes so the system can be used and supported.
6. Implementation should follow the design documentation. If implementation silently changes the design, testing may no longer match the intended system.

### Maintenance changes a system after it has been delivered

- **Explains:** `maintenance`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-maintenance.jpg`

1. Maintenance
2. Corrective
3. Fixing faults found after release, such as a booking clash that was not rejected.
4. Adaptive
5. Changing the system because the environment changes, such as a new timetable structure.
6. Perfective
7. Improving performance, usability or features, such as faster room search.

### Which lifecycle stage is being described?

- **Explains:** `stage-tool`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-stage-tool.jpg`

1. Interactive stage chooser
2. Scenario

### Good testing uses different categories of data

- **Explains:** `test-data`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-test-data.jpg`

1. Test data
2. Category
3. Room capacity example
4. Expected result
5. valid typical data
6. 24 students for capacity 30
7. accepted
8. Boundary
9. valid or invalid data at the edge
10. 30 and 31 for capacity 30
11. 30 accepted; 31 rejected
12. Abnormal

### Testing is planned evidence that the system behaves as expected

- **Explains:** `testing`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-testing.jpg`

1. Evidence
2. Unit testing
3. one module or subroutine
4. check clash detection function
5. actual output compared with expected output
6. Integration testing
7. modules working together
8. booking form sends data to save module
9. data passes correctly between parts
10. System testing
11. whole system
12. complete booking workflow
<!-- stage10-explanations:end -->
