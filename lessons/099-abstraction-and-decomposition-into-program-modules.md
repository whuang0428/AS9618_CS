# Lesson 099: Abstraction and decomposition into program modules

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Abstraction and decomposition into program modules

### Direct explanation

- Abstraction removes each irrelevant detail that does not affect the required inputs, rules, constraints or outputs. Producing an abstract model means recording the essential details that remain: the data, relationships and processes needed to solve the problem, not merely listing what was ignored.
- Decomposition breaks a problem into smaller sub-problems with distinct responsibilities. Express the resulting design as program modules with clear inputs, processing and outputs; a module may later be implemented as a procedure that performs an action or a function that returns a value.
- Abstraction decides what belongs in the model; decomposition decides how the retained problem is divided. The modules must connect into one complete solution and must not omit a requirement.

### Worked example

**Model and decompose a car-park charge:** Keep entry time, exit time and tariff; omit car colour because it cannot change the charge. Express the solution as modules InputTimes, CalculateDuration, CalculateCharge and OutputCharge. CalculateCharge can become a function returning the charge, while OutputCharge can become a procedure that displays it.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What must an abstract model contain?
   **Answer:** The essential details and relationships/processes needed to solve the problem.
2. What does decomposition produce here?
   **Answer:** Smaller sub-problems expressed as connected program modules with clear responsibilities.
3. Compare a procedure module from a function module at this design stage.
   **Answer:** A procedure performs an action; a function returns a value to its caller.

### Exam-style question and MS

**Question (6 marks):** Write an abstract model for a school meal bill, then decompose it into named program modules and identify one likely procedure and one likely function.

| Answer | Guidance | Marks |
|---|---|---:|
| retains meal choice, quantity and price as essential details | Do not award only a list of omitted details, vague Part1/Part2 labels or modules that do not collectively solve the problem. | 1 |
| states the calculation and total output in the abstract model |  | 1 |
| excludes a justified irrelevant detail such as tray colour |  | 1 |
| expresses the problem as connected modules with distinct responsibilities |  | 1 |
| identifies a suitable procedure module that performs an action |  | 1 |
| identifies a suitable function module that returns a value |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify inputs, processing, outputs, constraints and assumptions in a problem statement.
2. Build a complete IPOC plan using ordered natural-language steps.
3. Check that every stated requirement is represented before choosing notation.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Algorithmic thinking: inputs, outputs, and constraints** from the most closely related syllabus concept?

## Guided Explanation
Define inputs, outputs, constraints and assumptions before choosing a representation. Write required processing in ordered natural-language steps, then check every requirement against the plan.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement. Middle: IPOC plan. Right: requirements and assumptions check.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Plan how five supplied values will be used to produce their average.

**Worked answer / marking focus:** Inputs are five numeric values; output is Average; exactly five values are supplied; processing adds all five values and divides the total by 5.

## Student Task
Students create IPOC plans for two problems and highlight the source requirement supporting each entry.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Algorithmic thinking: inputs, outputs, and constraints**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often choose notation before defining the output. Correction: complete the IPOC meaning first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Constraints stop algorithms from wandering off

- **Explains:** `constraints`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-constraints.jpg`

1. A range of 0 to 100 requires both limits to be checked.
2. Exactly 10 supplied readings means the plan must process all 10 readings.
3. A capacity of 30 bookings means a request beyond the remaining capacity must be rejected.
4. Each stated constraint must have a specific consequence in the plan.

### Use IPOC before choosing a representation

- **Explains:** `model`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-model.jpg`

1. List each input and record its type or range when the problem supplies them.
2. Write the required processing in ordered natural-language steps.
3. State the exact required output.
4. Record constraints and supported assumptions.
5. Confirm completeness before choosing a representation.
<!-- stage10-explanations:end -->
