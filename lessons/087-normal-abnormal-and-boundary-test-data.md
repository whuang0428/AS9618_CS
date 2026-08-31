# Lesson 087: Normal, abnormal and boundary test data

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 12: Software development<br>
**Syllabus requirements:** S12.07<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 086: Test strategies and test plans.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Select normal, abnormal and extreme/boundary test data (S12.07)

**Concept relationships**

- **Normal:** Valid typical value
- **Abnormal:** Invalid value
- **Boundary:** At or around a limit
- **Expected result:** Predicted system response
- **extreme:** Select normal, abnormal and extreme/boundary test data.

**Mechanism**

1. **Name both alternatives precisely** — Choose suitable test data for a test plan, including normal, abnormal and extreme/boundary data.
2. **Connect structure to consequence** — Values immediately outside a limit are abnormal boundary checks.
3. **Justify against the scenario** — Extreme/boundary data uses valid values at the accepted lower or upper limit.

**Extreme or boundary data uses valid values at…:** Extreme/boundary data uses valid values at the accepted lower or upper limit. For an accepted mark range of 0 to 100 inclusive, 0 and 100 are valid extreme/boundary values.

#### Extreme or boundary data uses valid values at accepted limits

![Extreme or boundary data uses valid values at accepted limits](../web/assets/diagrams/stage10-infographics/stage10-lesson-138-boundary.jpg)

<details><summary>Text transcript</summary>

- Extreme/boundary data uses valid values at the accepted lower or upper limit.
- For an accepted mark range of 0 to 100 inclusive, 0 and 100 are valid extreme/boundary values.
- Values just outside the limits, such as -1 and 101, are abnormal and should be rejected.

</details>

<details><summary>Precise syllabus wording</summary>

Select normal, abnormal and extreme/boundary test data.

Choose suitable test data for a test plan, including normal, abnormal and extreme/boundary data.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Choose suitable test data for a test plan, including normal, abnormal and extreme/boundary data.
- Alpha testing is performed internally before release; beta testing uses selected external users in realistic settings; acceptance testing checks the delivered system against agreed requirements. A strategy states levels/methods/responsibility, while a test plan records test ID, purpose, data, expected result, actual result and pass/fail.
- Normal data are valid values within the accepted range. Abnormal data are invalid and should be rejected. Extreme or boundary data are valid values at the limits of the accepted range; values immediately outside a limit are abnormal boundary checks.
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

### Question 1 - foundation - give - 2 marks

Give one abnormal boundary value.

**Answer:** -1 or 101.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word give, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - give - 2 marks

Give one normal mark for 0 to 100 inclusive.

**Answer:** Any valid non-boundary value, for example 55.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how normal, abnormal and boundary test data would be applied in a suitable computing context.

**Answer:** Alpha testing is performed internally before release; beta testing uses selected external users in realistic settings; acceptance testing checks the delivered system against agreed requirements. A strategy states levels/methods/responsibility, while a test plan records test ID, purpose, data, expected result, actual result and pass/fail. Normal data are valid values within the accepted range. Abnormal data are invalid and should be rejected. Extreme or boundary data are valid values at the limits of the accepted range; values immediately outside a limit are abnormal boundary checks. Choose test data from the stated validation rule and give an expected result for each value. A label such as 'boundary' is insufficient unless the value really tests a stated limit.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

## 4. Summary and exam reminders

### Summary

- Define normal, abnormal and boundary test data with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For normal, abnormal and boundary test data, use the exact technical term before applying it to the scenario.
