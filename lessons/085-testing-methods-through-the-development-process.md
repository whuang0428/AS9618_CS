# Lesson 085: Testing methods through the development process

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 12: Software development<br>
**Syllabus requirements:** S12.05<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S12.04 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Understand different ways of exposing and avoiding faults in a program. Locate and identify syntax, logic and run-time errors in a program and correct identified errors.
- Identify and correct syntax, logic and runtime errors.


## 2. Knowledge explanation

### 1. Dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub testing (S12.05)

**Concept relationships**

- **white-box:** Dry run, walkthrough, white-box, black-box, integration, alpha, beta,…
- **black-box:** Black-box derives tests from specifications.
- **walkthrough:** Walkthrough is a structured peer review
- **integration:** Integration tests combined modules, using a stub to…
- **alpha:** Alpha testing is performed internally before release
- **beta:** Beta testing uses selected external users in realistic…

**Mechanism**

1. **Name both alternatives precisely** — Dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub testing.
2. **Connect structure to consequence** — Dry run, walkthrough, white-box, black-box, integration, alpha, beta and acceptance testing, and use of a stub.
3. **Justify against the scenario** — White-box derives tests from internal paths

**Good testing uses different categories of data:** Test data Category

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
- valid or invalid data at the edge
- 30 and 31 for capacity 30
- 30 accepted; 31 rejected
- Abnormal

</details>

<details><summary>Precise syllabus wording</summary>

Understand dry run, walkthrough, white-box, black-box, integration, alpha, beta, acceptance and stub testing.

Describe testing methods and select suitable test data: dry run, walkthrough, white-box, black-box, integration, alpha, beta and acceptance testing, and use of a stub.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Describe testing methods and select suitable test data: dry run, walkthrough, white-box, black-box, integration, alpha, beta and acceptance testing, and use of a stub.
- Dry run manually traces code; walkthrough is a structured peer review; white-box derives tests from internal paths; black-box derives tests from specifications. Integration tests combined modules, using a stub to imitate an unavailable called module.
- Alpha testing is performed internally before release; beta testing uses selected external users in realistic settings; acceptance testing checks the delivered system against agreed requirements. A strategy states levels/methods/responsibility, while a test plan records test ID, purpose, data, expected result, actual result and pass/fail.
- Choose test data from the stated validation rule and give an expected result for each value. A label such as 'boundary' is insufficient unless the value really tests a stated limit.
- Every maintenance change requires impact analysis, controlled amendment, tests for the changed behaviour and regression tests for unaffected behaviour. Records should link the request, code change and test evidence.
- Test the enhancement with data that exercises the new path and rerun regression tests for existing paths. Correcting a fault is corrective maintenance; adding or improving requested functionality is an enhancement and may be perfective maintenance.

</details>

### Worked method

1. Test login through review, construction, integration and release
2. Test an inclusive mark range
3. Three changes to one booking system
4. Add a Merit count without breaking PassCount
5. First dry-run the lockout counter and conduct a walkthrough in which peers inspect the algorithm.

Beyond syllabus / 延伸知识（不要求背诵）: modern teams often use continuous integration to repeat building and testing whenever a program changes.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

Which method derives tests from source-code paths?

**Answer:** White-box testing.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 8 marks

Explain why a login-system project needs both a test strategy and a test plan. State three likely contents of each document. Suggest normal, abnormal and extreme/boundary data for an integer age accepted from 12 to 18 inclusive, and state each expected result. Identify and justify these changes: fix a save crash; support a new operating-system API; add an export feature. For one change, state the impact-analysis and regression evidence required. An existing program counts PassCount for Marks[1:30] where each mark is at least 50. Analyse where a new MeritCount for marks at least 70 should be added, write the amended declarations, initialisation, loop update and output, and name four boundary-focused test values.

**Answer:** strategy coordinates the overall approach, levels/methods or responsibilities; strategy content such as methods, sequence, responsibility or resources; a second distinct strategy content; plan records individual tests and their evidence; plan content such as test ID, purpose, data or expected result; a second distinct plan content such as actual result or pass/fail; valid normal value; 12 and/or 18 as valid extremes; 11 and/or 19 as abnormal boundary; coherent expected results; save-crash fix classified as corrective with fault reason; new operating-system API classified as adaptive with environment reason; new export feature classified as perfective with enhancement reason; identifies affected interfaces/modules or behaviour before amendment; tests the changed path; reruns relevant existing tests to detect regression; analysis identifies the existing traversal and output that must remain; declares and initialises MeritCount without removing PassCount; increments MeritCount inside the existing traversal when mark is at least 70; preserves the existing pass condition at 50 and outputs both results after the loop; uses 49 and 50 to regression-test the pass boundary; uses 69 and 70 to test the new merit boundary

**Marking guidance:** Do not require candidates to produce either document as a syllabus obligation; assess the need and likely contents. Do not credit a value whose classification contradicts the stated inclusive range. Do not classify every post-release change as adaptive or describe perfective maintenance as fault correction only. Do not accept a rewrite that removes the existing pass count, changes its boundary, or tests only the new feature.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

Who normally performs beta testing?

**Answer:** Selected external/end users in realistic use.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/W/24 Q5(a) | 5 | complete | recall |
| 9618/21/W/24 Q5(ii) | 1 | complete | recall |
| 9618/23/S/23 Q5(a) | 3 | explain | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define testing methods through the development process with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For testing methods through the development process, use the exact technical term before applying it to the scenario.
