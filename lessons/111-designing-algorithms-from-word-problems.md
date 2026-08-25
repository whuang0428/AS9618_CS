# Lesson 111: Designing algorithms from word problems

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Designing algorithms from word problems**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Designing algorithms from word problems** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Designing algorithms from word problems, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.


## Student Task
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Designing algorithms from word problems**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Stage 2 syllabus completion

**Official audit rows:** S9.08
**Focus:** Stepwise refinement

### Direct explanation

- Stepwise refinement starts with a high-level task and repeatedly replaces each complex step with smaller, precise substeps. Refinement stops when each step can be implemented directly and its inputs/outputs are clear.
- It supports modularity, review and testing because each refinement level preserves the purpose of its parent step. It is not merely adding more prose; each level must reduce ambiguity.

### Worked example

**Process an order:** Level 1: Validate order, calculate total, produce receipt. Refine calculate total into: set Total to 0; for each item validate quantity, add Price * Quantity; apply discount; add tax.

### Targeted practice and answers

1. What is the starting point of stepwise refinement?
   **Answer:** A high-level solution/task.
2. When should refinement stop?
   **Answer:** When steps are precise enough to implement directly.
3. How does refinement support testing?
   **Answer:** Smaller modules/steps can be checked independently against defined inputs and outputs.

### Exam-style question and MS

**Question (4 marks):** Apply one level of stepwise refinement to the task 'register a new library member'.

- **B1** captures required member details
- **B1** validates details / checks existing member
- **B1** creates and stores a unique member record
- **B1** outputs confirmation/card or error; steps form a coherent sequence

**Strict note:** Do not award a list of unrelated features; substeps must collectively implement the parent task.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Extract the design before writing pseudocode

- **Explains:** `analyser`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-analyser.jpg`

1. Interactive scenario analyser
2. Scenario
3. Choose a scenario to see the IPOC breakdown.

### Turn paragraphs into a design table

- **Explains:** `ipoc`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-ipoc.jpg`

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

### Design in Cambridge pseudocode first; use Java only to support testing

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-pseudocode.jpg`

1. Initialise PassCount before processing five marks.
2. Input one Mark per iteration and increment PassCount only when Mark is at least 50.
3. Close the conditional with ENDIF before NEXT Index.
4. Output the final PassCount after the loop in both equivalent forms.

### Words in the question usually signal a control structure

- **Explains:** `requirements`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-requirements.jpg`

1. Requirements
2. Likely structure
3. Variables
4. exactly / for each / ten values
5. count-controlled loop
6. Index, Total, Count
7. input 10 marks
8. until / while / sentinel
9. condition-controlled loop
10. Number, Total, Count
11. input until -1
12. if / otherwise / valid

### Pick the structure before writing the pseudocode

- **Explains:** `structures`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-structures.jpg`

1. Control choice
2. Known count
3. Total <- 0
4. FOR Index <- 1 TO 5
5. INPUT Mark
6. Total <- Total + Mark
7. NEXT Index
8. OUTPUT Total
9. Use when the number of repetitions is given.
10. Unknown count with sentinel
11. WHILE Mark <> -1
12. ENDWHILE
<!-- stage10-explanations:end -->
