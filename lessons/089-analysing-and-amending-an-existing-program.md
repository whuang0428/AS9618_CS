# Lesson 089: Analysing and amending an existing program

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 12: Software development<br>
**Syllabus requirements:** S12.09<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S12.04 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Understand different ways of exposing and avoiding faults in a program. Locate and identify syntax, logic and run-time errors in a program and correct identified errors.
- Identify and correct syntax, logic and runtime errors.


## 2. Knowledge explanation

### 1. Analysing and amending an existing program (S12.09)

**Concept map:** analyse → amend → existing → program

**Three-part explanation:**

1. Analyse an existing program and make amendments to enhance functionality
2. Amend the existing program with the smallest coherent change that enhances functionality
3. Analyse the supplied program before editing it

**Concrete cue:** Analyse an existing program and make amendments to enhance functionality.

#### Analyse and amend an existing program

![Analyse and amend an existing program](../web/assets/diagrams/stage10-infographics/stage10-lesson-139-bug.jpg)

<details><summary>Text transcript</summary>

- Analyse the existing program's purpose, inputs, outputs, control flow and behaviour that must remain unchanged before editing it.
- Amend declarations, initialisation, processing and output coherently to add the requested functionality rather than rewriting unrelated code.
- Test the new path and rerun regression tests for the existing path; adding functionality is an enhancement, not merely correcting a fault.

</details>

#### Logic errors make the program do the wrong thing

![Logic errors make the program do the wrong thing](../web/assets/diagrams/stage10-infographics/stage10-lesson-060-logic.jpg)

<details><summary>Text transcript</summary>

- Meaning The code is syntactically valid and may run, but the algorithm or condition is wrong.
- Examples Using < instead of <= , wrong formula, wrong loop condition or off-by-one error.
- Detection Usually found by testing, tracing or comparing actual output with expected output.
- Common error A translator may not detect it because the instructions are legal.

</details>

<details><summary>Precise syllabus wording</summary>

Analyse and amend an existing program.

Analyse an existing program and make amendments to enhance functionality.

</details>

### Supporting diagram library

#### Maintenance changes a system after it has been delivered

![Maintenance changes a system after it has been delivered](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-maintenance.jpg)

<details><summary>Text transcript</summary>

- Corrective maintenance fixes faults found after release.
- Adaptive maintenance changes the system because its environment or external rules changed.
- Perfective maintenance improves performance, usability or functionality.

</details>

#### Testing is planned evidence that the system behaves as expected

![Testing is planned evidence that the system behaves as expected](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-testing.jpg)

<details><summary>Text transcript</summary>

- A test records input, expected output and actual output so behaviour can be judged.
- The amended path needs a targeted test and unchanged paths need regression tests.
- Unit testing checks one module and integration testing checks modules working together.

</details>

#### Extreme or boundary data uses valid values at accepted limits

![Extreme or boundary data uses valid values at accepted limits](../web/assets/diagrams/stage10-infographics/stage10-lesson-138-boundary.jpg)

<details><summary>Text transcript</summary>

- Extreme/boundary data uses valid values at the accepted lower or upper limit.
- For an accepted mark range of 0 to 100 inclusive, 0 and 100 are valid extreme/boundary values.
- Values just outside the limits, such as -1 and 101, are abnormal and should be rejected.

</details>

#### Test strategy and test plan are different documents

![Test strategy and test plan are different documents](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-changeover.jpg)

<details><summary>Text transcript</summary>

- A test strategy states the testing levels, methods, responsibilities, sequence and resources for the project.
- A test plan records individual cases with a test ID, purpose, data, expected result, actual result and pass/fail outcome.
- Normal, abnormal and extreme/boundary values are test-data categories; a list of values alone is neither a complete strategy nor a complete test plan.

</details>

#### Classify input for NumberOfStudents, valid range 1 to 30

![Classify input for NumberOfStudents, valid range 1 to 30](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-data-tool.jpg)

<details><summary>Text transcript</summary>

- Test data classifier
- Test value

</details>

#### Evaluation uses requirements and measurable success criteria

![Evaluation uses requirements and measurable success criteria](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-evaluation.jpg)

<details><summary>Text transcript</summary>

- A success criterion must state a measurable threshold before evidence can be judged against it.
- If 8 of 10 users or 95 of 100 searches is sufficient, state that threshold explicitly.
- Without a threshold, do not label partial evidence as an unqualified criterion met.

</details>

#### Implementation turns the design into a working system

![Implementation turns the design into a working system](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-implementation.jpg)

<details><summary>Text transcript</summary>

- Implementation
- Program modules, create files or databases, implement interfaces and connect components.
- Put the system into the user environment, configure hardware, accounts, permissions and data.
- Document
- Prepare user instructions and technical notes so the system can be used and supported.
- Implementation should follow the design documentation. If implementation silently changes the design, testing may no longer match the intended system.

</details>

#### Which lifecycle stage is being described?

![Which lifecycle stage is being described?](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-stage-tool.jpg)

<details><summary>Text transcript</summary>

- Interactive stage chooser
- Scenario

</details>

#### Good testing uses different categories of data

![Good testing uses different categories of data](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-test-data.jpg)

<details><summary>Text transcript</summary>

- Test data
- Category
- Room capacity example
- Expected result
- valid typical data
- 24 students for capacity 30
- accepted
- Boundary

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Analyse an existing program and make amendments to enhance functionality.
- Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements. Corrective maintenance fixes faults in required behaviour; adaptive maintenance changes software for a new environment, platform, law or external rule; perfective maintenance improves functionality, usability, performance or maintainability.
- Analyse the supplied program before editing it: state its current purpose, inputs, outputs, data structures, control flow and assumptions. Trace representative data to identify where a new requirement belongs and record behaviour that must remain unchanged.
- Amend the existing program with the smallest coherent change that enhances functionality. Update related declarations, initialisation, processing and output together; preserve established interfaces unless the requirement needs an interface change; and keep Cambridge pseudocode constructs complete.
- Test the enhancement with data that exercises the new path and rerun regression tests for existing paths. Correcting a fault is corrective maintenance; adding or improving requested functionality is an enhancement and may be perfective maintenance.

</details>

### Worked example

1. Test login through review, construction, integration and release
2. Test an inclusive mark range
3. Three changes to one booking system
4. Add a Merit count without breaking PassCount
5. First dry-run the lockout counter and conduct a walkthrough in which peers inspect the algorithm.
6. White-box tests cover true/false paths; black-box tests valid, invalid and boundary inputs from requirements.

Beyond syllabus / 延伸知识（不要求背诵）: modern teams often use continuous integration to repeat building and testing whenever a program changes.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What should be recorded before changing existing code?

**Answer:** Its purpose, inputs, outputs, relevant control/data flow, assumptions and behaviour that must remain unchanged.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why rerun old tests after adding a feature?

**Answer:** Regression tests check that the amendment has not broken existing behaviour.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

Which type adds useful functionality or improves performance?

**Answer:** Perfective maintenance.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

## 4. Summary and exam reminders

### Summary

- Define analysing and amending an existing program with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For analysing and amending an existing program, use the exact technical term before applying it to the scenario.
