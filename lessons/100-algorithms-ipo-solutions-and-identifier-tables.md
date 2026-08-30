# Lesson 100: Algorithms, IPO solutions and identifier tables

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
1. Split a problem into meaningful sub-problems with distinct responsibilities.
2. Give each sub-problem a clear input, responsibility and output.
3. Justify which scenario details are relevant or irrelevant to the required result.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Decomposition and abstraction** from the most closely related syllabus concept?

## Guided Explanation
Split a large problem into meaningful sub-problems, then keep only details that affect required inputs, processing, constraints or outputs. State how the responsibilities connect before choosing notation.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement. Middle: verb-based sub-problems. Right: kept and ignored details with reasons.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Split an event-booking problem into request, checking, cost and confirmation responsibilities.

**Worked answer / marking focus:** Credit clear sub-problems that collectively cover every required input, decision, calculation and output without unnecessary overlap.

## Student Task
Students build a responsibility map, then justify which details must be kept or ignored.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Decomposition and abstraction**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often create one sub-problem per tiny action. Correction: each sub-problem needs a meaningful responsibility.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Abstraction: keep the details that affect the algorithm

- **Explains:** `abstraction`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-abstraction.jpg`

1. Keep details that affect an input, rule, calculation, constraint or output.
2. Ignore decoration that does not change the required result.
3. Ask whether removing a detail would change the result.
4. Explain why a detail is relevant or irrelevant rather than only labelling it.

### An algorithm is a solution expressed as defined steps

- **Explains:** `concept`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-concept.jpg`

1. An algorithm is a solution to a problem expressed as a sequence of defined steps.
2. Each step must be unambiguous, ordered where order matters and capable of being carried out.
3. Identify what data is supplied, state the required transformation and state the exact result.
4. Record limits, quantity requirements and supported assumptions.
5. Check that every requirement maps to an input, process, output, constraint or assumption.

### Decomposition: split the problem into sub-problems

- **Explains:** `decomposition`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-decomposition.jpg`

1. Split the whole task into meaningful sub-problems with distinct responsibilities.
2. Express the resulting design as program modules with clear inputs, processing and outputs.
3. A module may become a procedure that performs an action or a function that returns a value.
4. Confirm that all modules connect into one complete solution.

### Keep or ignore details

- **Explains:** `filter`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-filter.jpg`

1. Interactive abstraction filter

### Turn paragraphs into a design table

- **Explains:** `ipoc`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-ipoc.jpg`

1. IPOC reading
2. Question to ask
3. Example evidence
4. Algorithm consequence
5. What data is provided?
6. mark, price, password, reading
7. use INPUT or given array/list item
8. What must be calculated or checked?
9. total, maximum, validation, search
10. choose assignment, IF, loop
11. What must be displayed or returned?
12. message, total, average, position

### Produce an abstract model

- **Explains:** `pattern`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-pattern.jpg`

1. Underline the required output and keep only details that affect it.
2. Create verb-based sub-problems with distinct responsibilities.
3. State each sub-problem's input and output.
4. Check that the parts collectively meet every requirement without gaps or overlap.
5. The result is a natural-language responsibility plan ready for a later representation lesson.

### Classify the design move

- **Explains:** `sorter`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-100-sorter.jpg`

1. Interactive task sorter
2. Design statement
3. Choose a statement to see whether it demonstrates decomposition, abstraction or an error.
<!-- stage10-explanations:end -->
