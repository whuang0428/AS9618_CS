# Lesson 081: Program-development lifecycle models

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 12: Software development<br>
**Syllabus requirements:** S12.01<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 080: Writing complete program fragments.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. RAD · Rapid prototyping · Time-box · User involvement (S12.01)

**Concept map:** RAD → rapid prototyping → time-box → user involvement → waterfall → iterative → limitation

**Three-part explanation:**

1. Compare the principles, benefits and drawbacks of waterfall, iterative and Rapid Application Development (RAD)
2. Candidates should understand the purpose of a program-development lifecycle and the need for different lifecycles depending on the program being developed
3. Rapid application development (RAD) uses rapid prototyping, time-boxed development and frequent user involvement to obtain feedback quickly

**Concrete cue:** Candidates should understand the purpose of a program-development lifecycle and the need for different lifecycles depending on the program being developed. Compare the principles, benefits and drawbacks of waterfall, iterative…

#### Rapid application development (RAD)

![Rapid application development (RAD)](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-rad.jpg)

<details><summary>Text transcript</summary>

- RAD builds rapid prototypes inside short time boxes.
- Users review prototypes frequently and their feedback changes the next version.
- RAD can respond quickly, but may not suit work requiring exhaustive assurance and stable architecture.

</details>

<details><summary>Precise syllabus wording</summary>

Understand why a program-development lifecycle is used; compare waterfall, iterative and RAD models and their stages.

Candidates should understand the purpose of a program-development lifecycle and the need for different lifecycles depending on the program being developed. Compare the principles, benefits and drawbacks of waterfall, iterative and Rapid Application Development (RAD). Lifecycle stages are analysis, design, coding, testing and maintenance.

</details>

### Supporting diagram library

#### Why short feedback cycles support change

![Why short feedback cycles support change](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-agile.jpg)

<details><summary>Text transcript</summary>

- A small increment makes assumptions visible quickly.
- Frequent stakeholder feedback reprioritises the next increment.
- Less unreviewed work depends on a mistaken requirement.

</details>

#### Why artefacts make decisions traceable

![Why artefacts make decisions traceable](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-artefacts.jpg)

<details><summary>Text transcript</summary>

- Requirements define what successful behaviour means.
- Designs and tests link implementation choices to those requirements.
- Traceability exposes every item affected by a later change.

</details>

#### How project conditions choose a model

![How project conditions choose a model](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-compare.jpg)

<details><summary>Text transcript</summary>

- Stable regulated work values traceability and formal approval.
- Uncertain user-facing work values short feedback distance.
- Dependencies, risk and stakeholder availability constrain the viable choice.

</details>

#### Why repeated cycles expose mistakes

![Why repeated cycles expose mistakes](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-iterative.jpg)

<details><summary>Text transcript</summary>

- Build a limited version around a defined goal.
- Review evidence from users, tests or prototypes.
- Feed the findings into the next improved cycle.

</details>

#### Why a lifecycle reduces uncertainty

![Why a lifecycle reduces uncertainty](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-purpose.jpg)

<details><summary>Text transcript</summary>

- Each stage asks a different question about need, design or evidence.
- Its output makes assumptions visible for review.
- Later work proceeds with clearer constraints and acceptance criteria.

</details>

#### How one stage supplies the next

![How one stage supplies the next](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-stages.jpg)

<details><summary>Text transcript</summary>

- Analysis defines the problem and required outcomes.
- Design translates requirements into components, data and interfaces.
- Implementation and testing create and check the resulting system.

</details>

#### Why sequence helps and resists change

![Why sequence helps and resists change](../web/assets/diagrams/stage10-infographics/stage10-lesson-143-waterfall.jpg)

<details><summary>Text transcript</summary>

- A stage is reviewed before the next major stage begins.
- Early agreement supports budgets, contracts and traceable approvals.
- Late change crosses completed boundaries and causes expensive rework.

</details>

#### From vague request to measurable criteria

![From vague request to measurable criteria](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-analysis.jpg)

<details><summary>Text transcript</summary>

- Analysis review
- Weak wording
- Stronger requirement
- Success criterion
- easy sign-up
- students can reserve a place using activity list, confirm button and student ID
- 90% of trial students reserve a place in under 2 minutes
- avoid too many students

</details>

#### Turn a weak line into a mark-worthy line

![Turn a weak line into a mark-worthy line](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-answer-tool.jpg)

<details><summary>Text transcript</summary>

- Answer improver
- Weak answer

</details>

#### School activity sign-up system

![School activity sign-up system](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-case.jpg)

<details><summary>Text transcript</summary>

- Case study
- A school wants a system for students to sign up for after-school activities. Students can view activities,
- reserve a place, cancel a reservation and see a waiting list. Staff can create activities, set capacity,
- view registers and close sign-ups. The school wants the system ready before the new term.
- Every review task on this page uses this case. That forces answers to be specific instead of floating around as textbook fog.

</details>

#### Identify the Section 12 concept

![Identify the Section 12 concept](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-case-tool.jpg)

<details><summary>Text transcript</summary>

- Interactive case tool
- Case detail

</details>

#### Match response depth to the command

![Match response depth to the command](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-commands.jpg)

<details><summary>Text transcript</summary>

- Explain sets out reasons or relationships and says why or how.
- Evaluate makes a judgement about quality, importance, amount or value using evidence.
- Cause and consequence support an explanation; they do not replace the judgement required by evaluate.

</details>

#### Design answers must name the artefact

![Design answers must name the artefact](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-design.jpg)

<details><summary>Text transcript</summary>

- Design review
- Algorithm
- Describe how the system checks capacity and places extra students on a waiting list.
- Data dictionary
- Define ActivityID, StudentID, Capacity, PlacesTaken and WaitingListPosition.
- Interface
- Show activity list, reserve/cancel controls, confirmation prompts and validation messages.
- Cambridge-style pseudocode is suitable for algorithm design. Java can support implementation practice, but final code is not the whole design document.

</details>

#### After release, classify changes and judge success with evidence

![After release, classify changes and judge success with evidence](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-evaluation.jpg)

<details><summary>Text transcript</summary>

- Maintenance and evaluation review
- Maintenance examples
- Corrective: fix a crash when cancelling a reservation.
- Adaptive: change the system for a new two-term activity structure.
- Perfective: make the activity search faster or clearer.
- Evaluation evidence
- Timing logs from sign-up tasks.
- User survey results linked to success criteria.

</details>

#### One scenario, many stages

![One scenario, many stages](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-lifecycle.jpg)

<details><summary>Text transcript</summary>

- The syllabus names analysis, design, coding, testing and maintenance as the program development lifecycle stages.
- Implementation may be used only as an explanation of coding, not as a replacement stage that removes testing or maintenance.
- Operation and evaluation are not substitutes for the five named syllabus stages.

</details>

#### Test cases need data, expected result and purpose

![Test cases need data, expected result and purpose](../web/assets/diagrams/stage10-infographics/stage10-lesson-147-testing.jpg)

<details><summary>Text transcript</summary>

- Normal data is valid and typical; boundary data is at an accepted limit; abnormal data violates the stated validation rule.
- A 21st valid reservation at a capacity boundary requires the defined business outcome, such as waiting list or rejection due to capacity.
- Do not call a request invalid unless it violates a stated input-validity rule.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Candidates should understand the purpose of a program-development lifecycle and the need for different lifecycles depending on the program being developed. Compare the principles, benefits and drawbacks of waterfall, iterative and Rapid Application Development (RAD). Lifecycle stages are analysis, design, coding, testing and maintenance.
- Waterfall completes planned stages largely in sequence and supports documentation and traceability, but late change can cause substantial rework. Iterative development builds and reviews repeated versions so evidence can refine later cycles.
- Rapid application development (RAD) uses rapid prototyping, time-boxed development and frequent user involvement to obtain feedback quickly. It can suit an interactive system with available users, but speed and repeated prototypes can conflict with exhaustive assurance or stable architecture. Agile is related extension context, not a replacement for the named RAD model.
- A program-development lifecycle gives an organised sequence for analysis, design, implementation, testing and maintenance, with review and documentation linking decisions to evidence.
- Waterfall supports planned sequential stages and traceability but its limitation is costly late change. Iterative development reviews repeated versions but can need careful scope control. RAD uses rapid prototyping, time-boxing and user involvement; it may be less suitable or unsuitable where exhaustive assurance and stable architecture are required.

</details>

### Worked example

1. Choose a lifecycle model
2. Choose a lifecycle model
3. For a small booking interface with available users and changing requirements, RAD can use a time-boxed prototype and immediate user feedback.
4. For safety-critical stable requirements, waterfall's formal traceability may be more suitable than rapid prototyping.
5. RAD suits a small interface whose users can review frequent prototypes.
6. Waterfall may suit stable, safety-critical requirements where formal traceability matters, although late change remains a limitation.

Beyond syllabus / 延伸知识（不要求背诵）: modern teams often use continuous integration to repeat building and testing whenever a program changes.
## 3. Practice by question type

### Question 1 - foundation - compare - 8 marks

Compare waterfall, iterative and RAD for a system whose users can review frequent prototypes. Compare waterfall, iterative and RAD, including one limitation of each model.

**Answer:** waterfall uses planned sequential stages and formal documentation; iterative development reviews repeated versions; RAD uses rapid prototypes/time-boxing; RAD uses frequent user involvement and is linked to the scenario; waterfall and limitation; iterative and limitation; RAD features; RAD limitation/less suitable context

**Marking guidance:** Do not substitute Agile for RAD or describe all repeated development as the same model. Do not describe all lifecycle models as the same repeated process.

**Common error:** For the command word compare, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - identify - 2 marks

Identify three defining features of RAD.

**Answer:** Rapid prototyping, time-boxing and frequent user involvement/feedback.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

Why might RAD be unsuitable for a safety-critical system?

**Answer:** Rapid cycles may not provide the exhaustive assurance and traceability required.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q1(c) | 4 | complete | recall |
| 9618/22/S/25 Q1(i) | 3 | explain | explain |
| 9618/22/S/25 Q1(iii) | 2 | explain | explain |
| 9618/22/S/25 Q1(i) | 1 | explain | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define program-development lifecycle models with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For program-development lifecycle models, use the exact technical term before applying it to the scenario.
