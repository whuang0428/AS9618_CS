# Lesson 142: Software development lifecycle models

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 12  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Software development lifecycle models** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Ask: If a client says 'make it user-friendly', should we start coding or start asking better questions? Requirements first; keyboard heroics later.

Lesson-specific focus question: What would go wrong if a student confused **Software development lifecycle models** with a neighbouring syllabus idea?

## Guided Explanation
Place Software development lifecycle models inside the development lifecycle. Identify the artefact produced at this stage, who uses it, and what can go wrong if it is weak. Connect the stage to testing and maintenance, not as a poster but as a feedback loop.

Topic-specific teaching move: keep the explanation anchored to **Software development lifecycle models**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A school wants a booking system. Place analysis, design, implementation, testing, evaluation and maintenance in a sensible lifecycle order. The worked example must explicitly use **Software development lifecycle models**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit lifecycle order and feedback loops; analysis should identify requirements before design and implementation.

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
Students turn a vague client request into two measurable requirements before any design is allowed. Their final answer must include the phrase **Software development lifecycle models** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Software development lifecycle models**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Software development lifecycle models** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Software development lifecycle models** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe the lifecycle as a fixed checklist. Correction: development is iterative; findings can send a project back to earlier stages. For this lesson, make students contrast that mistake with the exact idea of **software development lifecycle models**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why a lifecycle reduces uncertainty

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Visual:** `../assets/diagrams/stage10-lifecycle-models-analogy.jpg` — Different project conditions favour different distances between building, review and change.

1. Each stage asks a different question about need, design or evidence.
2. Its output makes assumptions visible for review.
3. Later work proceeds with clearer constraints and acceptance criteria.

- **Analogy:** Architectural plans turn assumptions into inspectable decisions before construction.
- **Boundary:** Documents help only when they stay accurate and influence decisions.

### How one stage supplies the next

- **Explains:** `stages`
- **Explanation type:** process

1. Analysis defines the problem and required outcomes.
2. Design translates requirements into components, data and interfaces.
3. Implementation and testing create and check the resulting system.

- **Analogy:** A specification becomes a plan, then a build, then evidence of fitness.
- **Boundary:** Feedback may return to an earlier stage when evidence exposes a bad assumption.

### Why sequence helps and resists change

- **Explains:** `waterfall`
- **Explanation type:** tradeoff

1. A stage is reviewed before the next major stage begins.
2. Early agreement supports budgets, contracts and traceable approvals.
3. Late change crosses completed boundaries and causes expensive rework.

- **Analogy:** Changing foundations after upper floors exist is harder than changing a drawing.
- **Boundary:** Waterfall suits stable requirements; sequence alone does not guarantee quality.

### Why repeated cycles expose mistakes

- **Explains:** `iterative`
- **Explanation type:** process

1. Build a limited version around a defined goal.
2. Review evidence from users, tests or prototypes.
3. Feed the findings into the next improved cycle.

- **Analogy:** A model is built, inspected and revised before the full structure is fixed.
- **Boundary:** Repeated work without a review goal is rework, not controlled iteration.

### Why short feedback cycles support change

- **Explains:** `agile`
- **Explanation type:** tradeoff

1. A small increment makes assumptions visible quickly.
2. Frequent stakeholder feedback reprioritises the next increment.
3. Less unreviewed work depends on a mistaken requirement.

- **Analogy:** Regular design reviews correct direction while only a small section is built.
- **Boundary:** Agile still requires architecture, testing and available informed stakeholders.

### How project conditions choose a model

- **Explains:** `compare`
- **Explanation type:** comparison

1. Stable regulated work values traceability and formal approval.
2. Uncertain user-facing work values short feedback distance.
3. Dependencies, risk and stakeholder availability constrain the viable choice.

- **Analogy:** Choose a planning rhythm that matches how often reliable evidence arrives.
- **Boundary:** No lifecycle model is inherently fastest or best for every project.

### Why artefacts make decisions traceable

- **Explains:** `artefacts`
- **Explanation type:** mechanism

1. Requirements define what successful behaviour means.
2. Designs and tests link implementation choices to those requirements.
3. Traceability exposes every item affected by a later change.

- **Analogy:** A linked evidence trail shows which plans and checks depend on one decision.
- **Boundary:** An outdated artefact can mislead more than an absent one.
<!-- stage10-explanations:end -->
