# Lesson 145: Testing, implementation, maintenance, and evaluation

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** producing a complete test strategy or test plan. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S12.06 requires understanding their need and likely contents; S12.05 testing methods remain CORE.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Testing, implementation and maintenance

### Direct explanation

- Dry run manually traces code; walkthrough is a structured peer review; white-box derives tests from internal paths; black-box derives tests from specifications. Integration tests combined modules, using a stub to imitate an unavailable called module.
- Alpha testing is performed internally before release; beta testing uses selected external users in realistic settings; acceptance testing checks the delivered system against agreed requirements. A strategy states levels/methods/responsibility, while a test plan records test ID, purpose, data, expected result, actual result and pass/fail.
- Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements. Corrective maintenance fixes faults in required behaviour; adaptive maintenance changes software for a new environment, platform, law or external rule; perfective maintenance improves functionality, usability, performance or maintainability.
- Classify the reason for the change, not the code edited. The same module could receive a corrective change for a crash, an adaptive change for a new operating-system interface, or a perfective change for faster search and a clearer result display.
- Every maintenance change requires impact analysis, controlled amendment, tests for the changed behaviour and regression tests for unaffected behaviour. Records should link the request, code change and test evidence.

### Worked example

**Test login through review, construction, integration and release / Three changes to one booking system:** First dry-run the lockout counter and conduct a walkthrough in which peers inspect the algorithm. White-box tests cover true/false paths; black-box tests valid, invalid and boundary inputs from requirements. During integration, a stub returns simulated account results before the database is ready. Internal staff perform alpha testing, selected external users perform beta testing, and the customer performs acceptance testing against the agreed lockout behaviour. Fixing a crash when saving is corrective. Updating tax or term-date rules imposed externally is adaptive. Adding a wait-list search and making results faster is perfective. Each change is traced to a request and followed by targeted and regression tests.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which method derives tests from source-code paths?
   **Answer:** White-box testing.
2. Who normally performs beta testing?
   **Answer:** Selected external/end users in realistic use.
3. What does a stub replace?
   **Answer:** A called module/component not yet available.
4. How does a walkthrough differ from a dry run?
   **Answer:** A walkthrough is a structured peer review of the algorithm or code; a dry run manually traces values and control flow for selected data.
5. Why does maintenance continue after acceptance?
   **Answer:** Faults, environmental changes and requested improvements continue after delivery.
6. Which type changes software for a new external rule?
   **Answer:** Adaptive maintenance.
7. Which type adds useful functionality or improves performance?
   **Answer:** Perfective maintenance.

### Exam-style question and MS

**Question (12 marks):** Explain why a login-system project needs both a test strategy and a test plan. State three likely contents of each document. Identify and justify these changes: fix a save crash; support a new operating-system API; add an export feature. For one change, state the impact-analysis and regression evidence required.

| Answer | Guidance | Marks |
|---|---|---:|
| strategy coordinates the overall approach, levels/methods or responsibilities | Do not require candidates to produce either document as a syllabus obligation; assess the need and likely contents. Do not classify every post-release change as adaptive or describe perfective maintenance as fault correction only. | 1 |
| strategy content such as methods, sequence, responsibility or resources |  | 1 |
| a second distinct strategy content |  | 1 |
| plan records individual tests and their evidence |  | 1 |
| plan content such as test ID, purpose, data or expected result |  | 1 |
| a second distinct plan content such as actual result or pass/fail |  | 1 |
| save-crash fix classified as corrective with fault reason |  | 1 |
| new operating-system API classified as adaptive with environment reason |  | 1 |
| new export feature classified as perfective with enhancement reason |  | 1 |
| identifies affected interfaces/modules or behaviour before amendment |  | 1 |
| tests the changed path |  | 1 |
| reruns relevant existing tests to detect regression |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 12
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the development activity involved in **Testing, implementation, maintenance, and evaluation**.
2. Apply the activity to a stated client requirement or system.
3. Explain how its output supports a later development or testing activity.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask whether development should begin from the request 'make it user-friendly' or from questions that make the requirement measurable. Establish that requirements must be analysed before implementation.

Focus question: Which feature distinguishes **Testing, implementation, maintenance, and evaluation** from the most closely related syllabus concept?

## Guided Explanation
Place Testing, implementation, maintenance, and evaluation inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is incomplete. Connect the stage to testing and maintenance through explicit feedback paths.

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
- Answer one 4-mark question about **Testing, implementation, maintenance, and evaluation**. Follow its command word and apply each point to the stated context.

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

### Test strategy and test plan are different documents

- **Explains:** `changeover`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-changeover.jpg`

1. A test strategy states the testing levels, methods, responsibilities, sequence and resources for the project.
2. A test plan records individual cases with a test ID, purpose, data, expected result, actual result and pass/fail outcome.
3. Normal, abnormal and extreme/boundary values are test-data categories; a list of values alone is neither a complete strategy nor a complete test plan.

### Classify input for NumberOfStudents, valid range 1 to 30

- **Explains:** `data-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-data-tool.jpg`

1. Test data classifier
2. Test value

### Evaluation uses requirements and measurable success criteria

- **Explains:** `evaluation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-evaluation.jpg`

1. A success criterion must state a measurable threshold before evidence can be judged against it.
2. If 8 of 10 users or 95 of 100 searches is sufficient, state that threshold explicitly.
3. Without a threshold, do not label partial evidence as an unqualified criterion met.

### Implementation turns the design into a working system

- **Explains:** `implementation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** CORE / TEACH
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-145-stage-tool.jpg`

1. Interactive stage chooser
2. Scenario

### Good testing uses different categories of data

- **Explains:** `test-data`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
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
- **Delivery:** OPTIONAL / EXTEND
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
