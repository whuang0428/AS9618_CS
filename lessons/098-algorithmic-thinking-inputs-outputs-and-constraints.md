# Lesson 098: Algorithmic thinking: inputs, outputs, and constraints

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Algorithms, IPO solutions and identifier tables

### Direct explanation

- An algorithm is a solution to a problem expressed as a sequence of defined steps. Each step must be unambiguous, ordered where order matters and capable of being carried out; a vague instruction such as 'process the data' is not a defined step.
- Before writing pseudocode, identify the input data, the processing that transforms it and the required output. This input-process-output design must describe a complete solution rather than three unrelated lists.
- Choose meaningful identifier names that describe each value's role. An identifier table records at least the identifier name, data type and purpose; its entries must match the pseudocode solution.

### Worked example

**Define and plan a ticket algorithm:** Problem: input TicketCount and TicketPrice, then output TotalCost. The algorithm is the defined sequence INPUT TicketCount; INPUT TicketPrice; TotalCost <- TicketCount * TicketPrice; OUTPUT TotalCost. The identifier table records TicketCount: INTEGER, number requested; TicketPrice: REAL, price of one ticket; TotalCost: REAL, calculated cost.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What is an algorithm?
   **Answer:** A solution to a problem expressed as a sequence of defined steps.
2. State the input, process and output for rectangle area.
   **Answer:** Inputs Length and Width; process multiply Length by Width; output Area.
3. Develop identifier x for the number of absent students and state its type.
   **Answer:** AbsentCount or NumberAbsent, with type INTEGER.

### Exam-style question and MS

**Question (6 marks):** Complete an identifier table and an input-process-output pseudocode solution that inputs a student's name and three marks, then outputs the calculated mean.

| Answer | Guidance | Marks |
|---|---|---:|
| meaningful STRING identifier and purpose for the student's name | Do not award an identifier list without types and purposes, or IPO headings without a complete sequence of defined steps. | 1 |
| three clearly identified numeric mark inputs or a clearly bounded mark collection |  | 1 |
| meaningful REAL identifier and purpose for the mean |  | 1 |
| pseudocode inputs the required values |  | 1 |
| processing calculates the total and mean in a defined sequence |  | 1 |
| outputs the calculated mean and matches the identifier table |  | 1 |
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

### An algorithm is a solution expressed as defined steps

- **Explains:** `concept`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-concept.jpg`

1. An algorithm is a solution to a problem expressed as a sequence of defined steps.
2. Each step must be unambiguous, ordered where order matters and capable of being carried out.
3. Identify what data is supplied, state the required transformation and state the exact result.
4. Record limits, quantity requirements and supported assumptions.
5. Check that every requirement maps to an input, process, output, constraint or assumption.

### Constraints stop algorithms from wandering off

- **Explains:** `constraints`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-constraints.jpg`

1. A range of 0 to 100 requires both limits to be checked.
2. Exactly 10 supplied readings means the plan must process all 10 readings.
3. A capacity of 30 bookings means a request beyond the remaining capacity must be rejected.
4. Each stated constraint must have a specific consequence in the plan.

### Use IPOC before choosing a representation

- **Explains:** `model`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-model.jpg`

1. List each input and record its type or range when the problem supplies them.
2. Write the required processing in ordered natural-language steps.
3. State the exact required output.
4. Record constraints and supported assumptions.
5. Confirm completeness before choosing a representation.
<!-- stage10-explanations:end -->
