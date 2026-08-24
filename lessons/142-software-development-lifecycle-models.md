# Lesson 142: Software development lifecycle models

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 12  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the development activity involved in **Software development lifecycle models**.
2. Apply the activity to a stated client requirement or system.
3. Explain how its output supports a later development or testing activity.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask whether development should begin from the request 'make it user-friendly' or from questions that make the requirement measurable. Establish that requirements must be analysed before implementation.

Focus question: Which feature distinguishes **Software development lifecycle models** from the most closely related syllabus concept?

## Guided Explanation
Place Software development lifecycle models inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is incomplete. Connect the stage to testing and maintenance through explicit feedback paths.

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
**Problem:** A school wants a booking system. Place analysis, design, implementation, testing, evaluation and maintenance in a sensible lifecycle order.

**Worked answer / marking focus:** Credit lifecycle order and feedback loops; analysis should identify requirements before design and implementation.


## Student Task
Students turn a vague client request into two measurable requirements before any design is allowed.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Software development lifecycle models**. Follow its command word and apply each point to the stated context.

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

### Why short feedback cycles support change

- **Explains:** `agile`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-agile.jpg`

1. A small increment makes assumptions visible quickly.
2. Frequent stakeholder feedback reprioritises the next increment.
3. Less unreviewed work depends on a mistaken requirement.
- **Analogy:** Regular design reviews correct direction while only a small section is built.
- **Boundary:** Agile still requires architecture, testing and available informed stakeholders.

### Why artefacts make decisions traceable

- **Explains:** `artefacts`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-artefacts.jpg`

1. Requirements define what successful behaviour means.
2. Designs and tests link implementation choices to those requirements.
3. Traceability exposes every item affected by a later change.
- **Analogy:** A linked evidence trail shows which plans and checks depend on one decision.
- **Boundary:** An outdated artefact can mislead more than an absent one.

### How project conditions choose a model

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-compare.jpg`

1. Stable regulated work values traceability and formal approval.
2. Uncertain user-facing work values short feedback distance.
3. Dependencies, risk and stakeholder availability constrain the viable choice.
- **Analogy:** Choose a planning rhythm that matches how often reliable evidence arrives.
- **Boundary:** No lifecycle model is inherently fastest or best for every project.

### Why repeated cycles expose mistakes

- **Explains:** `iterative`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-iterative.jpg`

1. Build a limited version around a defined goal.
2. Review evidence from users, tests or prototypes.
3. Feed the findings into the next improved cycle.
- **Analogy:** A model is built, inspected and revised before the full structure is fixed.
- **Boundary:** Repeated work without a review goal is rework, not controlled iteration.

### Why a lifecycle reduces uncertainty

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-purpose.jpg`

1. Each stage asks a different question about need, design or evidence.
2. Its output makes assumptions visible for review.
3. Later work proceeds with clearer constraints and acceptance criteria.
- **Analogy:** Architectural plans turn assumptions into inspectable decisions before construction.
- **Boundary:** Documents help only when they stay accurate and influence decisions.

### How one stage supplies the next

- **Explains:** `stages`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-stages.jpg`

1. Analysis defines the problem and required outcomes.
2. Design translates requirements into components, data and interfaces.
3. Implementation and testing create and check the resulting system.
- **Analogy:** A specification becomes a plan, then a build, then evidence of fitness.
- **Boundary:** Feedback may return to an earlier stage when evidence exposes a bad assumption.

### Why sequence helps and resists change

- **Explains:** `waterfall`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-142-waterfall.jpg`

1. A stage is reviewed before the next major stage begins.
2. Early agreement supports budgets, contracts and traceable approvals.
3. Late change crosses completed boundaries and causes expensive rework.
- **Analogy:** Changing foundations after upper floors exist is harder than changing a drawing.
- **Boundary:** Waterfall suits stable requirements; sequence alone does not guarantee quality.
<!-- stage10-explanations:end -->
