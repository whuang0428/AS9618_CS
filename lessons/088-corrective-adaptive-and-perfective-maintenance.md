# Lesson 088: Corrective, adaptive and perfective maintenance

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 12: Software development<br>
**Syllabus requirements:** S12.08<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S12.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Candidates should understand the purpose of a program-development lifecycle and the need for different lifecycles depending on the program being developed. Compare the principles, benefits and drawbacks of waterfall, iterative and Rapid Application Development (RAD). Lifecycle stages are analysis, design, coding, testing and maintenance.
- Understand why a program-development lifecycle is used; compare waterfall, iterative and RAD models and their stages.


## 2. Knowledge explanation

### 1. Perfective, adaptive and corrective maintenance (S12.08)

**Atomic learning targets**

- **S12.08.A01:** perfective
- **S12.08.A02:** adaptive
- **S12.08.A03:** corrective
- **S12.08.A04:** maintenance

**Core explanation**

- Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements. Corrective maintenance fixes faults in required behaviour; adaptive maintenance changes software for a new environment, platform, law or external rule; perfective maintenance improves functionality, usability, performance or maintainability.
- Classify the reason for the change, not the code edited. The same module could receive a corrective change for a crash, an adaptive change for a new operating-system interface, or a perfective change for faster search and a clearer result display.
- Test the enhancement with data that exercises the new path and rerun regression tests for existing paths. Correcting a fault is corrective maintenance; adding or improving requested functionality is an enhancement and may be perfective maintenance.
- Every maintenance change requires impact analysis, controlled amendment, tests for the changed behaviour and regression tests for unaffected behaviour. Records should link the request, code change and test evidence.

**Mechanism or method**

1. **Identify the relevant condition or input** — Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements.
2. **Trace how the process works** — Corrective maintenance fixes faults in required behaviour;
3. **Connect the mechanism to its result** — adaptive maintenance changes software for a new environment, platform, law or external rule;

#### Worked example: Perfective, adaptive and corrective maintenance: complete worked route

1. **Identify the relevant condition or input**

Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements.

2. **Trace how the process works**

Corrective maintenance fixes faults in required behaviour;

3. **Connect the mechanism to its result**

adaptive maintenance changes software for a new environment, platform, law or external rule;

4. **Complete example**

Fixing a crash when saving is corrective.

**Misconceptions to correct**

- Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

#### Mastery check (MC-L088-S12.08)

Explain the following targets in one connected answer, using a concrete example for each: perfective; adaptive; corrective; maintenance.

<details><summary>Answer criteria</summary>

- Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements. Corrective maintenance fixes faults in required behaviour; adaptive maintenance changes software for a new environment, platform, law or external rule; perfective maintenance improves functionality, usability, performance or maintainability.
- Classify the reason for the change, not the code edited. The same module could receive a corrective change for a crash, an adaptive change for a new operating-system interface, or a perfective change for faster search and a clearer result display.
- Test the enhancement with data that exercises the new path and rerun regression tests for existing paths. Correcting a fault is corrective maintenance; adding or improving requested functionality is an enhancement and may be perfective maintenance.
- Every maintenance change requires impact analysis, controlled amendment, tests for the changed behaviour and regression tests for unaffected behaviour. Records should link the request, code change and test evidence.

</details>

**Supplementary concept map**

- **Corrective:** Repairs a discovered fault
- **Adaptive:** Responds to an environment change
- **Perfective:** Improves performance or usability
- **Maintenance:** Changes a delivered program
- **Regression test:** Checks existing behaviour still works

**Supplementary three-step recap**

1. **Name both alternatives precisely** — Perfective, adaptive and corrective maintenance.
2. **Connect structure to consequence** — The need for continuing maintenance of a program and the differences between perfective, adaptive and corrective maintenance.
3. **Justify against the scenario** — The same module could receive a corrective change for a crash, an adaptive change for a new operating-system…

**Maintenance changes a system after it has been…:** Maintenance Corrective

#### Maintenance changes a system after it has been delivered

![Maintenance changes a system after it has been delivered](../web/assets/diagrams/stage10-infographics/stage10-lesson-146-maintenance.jpg)

<details><summary>Text transcript</summary>

- Maintenance
- Corrective
- Fixing faults found after release, such as a booking clash that was not rejected.
- Adaptive
- Changing the system because the environment changes, such as a new timetable structure.
- Perfective
- Improving performance, usability or features, such as faster room search.

</details>

<details><summary>Precise syllabus wording</summary>

Understand perfective, adaptive and corrective maintenance.

Understand the need for continuing maintenance of a program and the differences between perfective, adaptive and corrective maintenance.

</details>

### Lesson technical reference

- Understand the need for continuing maintenance of a program and the differences between perfective, adaptive and corrective maintenance.
- Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements. Corrective maintenance fixes faults in required behaviour; adaptive maintenance changes software for a new environment, platform, law or external rule; perfective maintenance improves functionality, usability, performance or maintainability.
- Classify the reason for the change, not the code edited. The same module could receive a corrective change for a crash, an adaptive change for a new operating-system interface, or a perfective change for faster search and a clearer result display.
- Every maintenance change requires impact analysis, controlled amendment, tests for the changed behaviour and regression tests for unaffected behaviour. Records should link the request, code change and test evidence.
- Analyse the supplied program before editing it: state its current purpose, inputs, outputs, data structures, control flow and assumptions. Trace representative data to identify where a new requirement belongs and record behaviour that must remain unchanged.
- Amend the existing program with the smallest coherent change that enhances functionality. Update related declarations, initialisation, processing and output together; preserve established interfaces unless the requirement needs an interface change; and keep Cambridge pseudocode constructs complete.
- Test the enhancement with data that exercises the new path and rerun regression tests for existing paths. Correcting a fault is corrective maintenance; adding or improving requested functionality is an enhancement and may be perfective maintenance.

Beyond syllabus / 延伸知识（不要求背诵）: modern teams often use continuous integration to repeat building and testing whenever a program changes.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

Which type changes software for a new external rule?

**Answer:** Adaptive maintenance.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why does maintenance continue after acceptance?

**Answer:** Faults, environmental changes and requested improvements continue after delivery.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State two precise facts about corrective, adaptive and perfective maintenance.

**Answer:** Understand the need for continuing maintenance of a program and the differences between perfective, adaptive and corrective maintenance. Maintenance continues after delivery because faults are discovered, operating environments and rules change, and users request improvements. Corrective maintenance fixes faults in required behaviour; adaptive maintenance changes software for a new environment, platform, law or external rule; perfective maintenance improves functionality, usability, performance or maintainability.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

## 4. Summary and exam reminders

### Summary

- S12.08: explain perfective, adaptive, corrective, maintenance.
- S12.08 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Common error to correct

Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For corrective, adaptive and perfective maintenance, use the exact technical term before applying it to the scenario.
