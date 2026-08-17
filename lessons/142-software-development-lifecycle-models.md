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
## Stage 10 causal explanations

### Why a lifecycle reduces uncertainty instead of merely adding documents

- **Explains:** `purpose`
- **Explanation type:** mechanism

Software projects fail when important questions are discovered after expensive decisions have already been made. A development lifecycle gives those questions an organised place: requirements clarify the problem, design decides a solution structure, implementation builds it, testing checks behaviour and evaluation compares the result with the original need. The stages create evidence that can be reviewed before the project commits further time and money. Documentation is useful only when it records decisions, constraints and results that later work depends on; producing documents without using them does not control risk. Different lifecycle models arrange feedback differently, but all try to make uncertainty visible and manageable. The benefit therefore comes from earlier detection, traceable decisions and controlled change, not from following stage names as a ceremonial checklist.

### Why each lifecycle stage must produce information for the next

- **Explains:** `stages`
- **Explanation type:** process

Lifecycle stages form a chain of decisions. Analysis turns stakeholder needs into requirements and constraints. Design converts those requirements into data structures, interfaces, algorithms and testable components. Implementation produces the executable system from that design. Testing compares observed behaviour with expected results, while evaluation asks whether the delivered system actually meets the original requirements. Maintenance responds to defects and changed needs after deployment. A stage is incomplete if its output cannot guide or check the next activity; for example, vague requirements make it impossible to decide whether a test has passed. Projects may revisit stages, but the dependency remains: later decisions need reliable earlier information. Explaining this flow is more useful than memorising an order because it shows why missing or weak outputs create rework.

### Why sequential planning helps stable projects but resists late change

- **Explains:** `waterfall`
- **Explanation type:** tradeoff

Waterfall development establishes major requirements and plans stages before moving through them in sequence. This can make budgets, responsibilities and approval points easier to define because each stage has expected outputs. It works best when requirements are well understood and unlikely to change, or when formal documentation and sign-off are required. The same structure creates its main weakness: users may not interact with a working system until late, so a misunderstood requirement can survive through design and implementation before it becomes visible. Returning to earlier decisions then affects many completed artefacts and becomes expensive. Waterfall is therefore not automatically outdated or safe. Its suitability depends on whether early certainty and formal control are more valuable than frequent feedback and adaptation.

### Why repeated cycles expose mistakes earlier

- **Explains:** `iterative`
- **Explanation type:** process

Iterative development builds a version, reviews the result and uses the feedback to improve the next version. A working or testable increment turns assumptions into something stakeholders can inspect, so unclear requirements and usability problems can be discovered before the whole system is complete. Each cycle should have a defined goal and feed evidence back into requirements or design; simply rewriting code repeatedly is not a lifecycle method. Iteration reduces the cost of some changes because less unreviewed work depends on the current decision. It can also create scope drift, repeated rework or architectural inconsistency if priorities and quality controls are weak. The advantage comes from short feedback distance, while the management challenge is keeping those cycles aligned with the overall system and budget.

### Why short feedback cycles help changing requirements

- **Explains:** `agile`
- **Explanation type:** tradeoff

Agile approaches organise work into short increments and involve users or product representatives frequently. Regular feedback helps the team detect when a feature solves the wrong problem and reprioritise before a large amount of dependent work is built. Small increments can deliver useful value earlier and make progress visible to stakeholders. This flexibility requires active stakeholder participation, disciplined testing and a shared understanding of the overall product. Without them, frequent change can become uncontrolled scope growth or fragmented design. Agile does not mean no planning or documentation; it favours enough planning and documentation to support the next decisions and maintain the system. It is most suitable when learning and change are expected and when stakeholders can provide timely, informed feedback.

### Why project conditions should choose the lifecycle model

- **Explains:** `compare`
- **Explanation type:** comparison

Lifecycle choice is a trade-off between certainty, feedback, regulation, risk and cost of change. Stable requirements, contractual milestones or safety documentation may favour a more sequential model because decisions and approvals must be traceable before construction continues. Uncertain requirements and user-interface work may favour iterative or agile approaches because prototypes and increments generate information that cannot be obtained from documents alone. Team distribution, stakeholder availability and technical dependencies also matter. A model cannot provide feedback if users are unavailable, and rapid iteration cannot safely ignore a hardware component with a long manufacturing lead time. Strong evaluation therefore names a project condition, explains how the model's feedback and planning mechanism responds to it, and states the resulting benefit or limitation. Calling one model simply faster or better is not a justified choice.

### Why lifecycle outputs make decisions testable and traceable

- **Explains:** `artefacts`
- **Explanation type:** mechanism

Lifecycle artefacts preserve information that later stages need. A requirements specification defines what success means; design documents show how components and data should satisfy those requirements; a test plan connects inputs and expected results to the behaviour being checked; test records show what actually happened. Traceability links these artefacts so a changed requirement can be followed into affected designs, code and tests. This reduces the chance that one document changes while the implemented system remains inconsistent. Artefacts also support maintenance because a future developer can recover the reasoning behind a decision. Their value depends on accuracy and use: an outdated document can mislead more than no document. The purpose is not paperwork itself but a shared, reviewable record of decisions and evidence.
<!-- stage10-explanations:end -->
