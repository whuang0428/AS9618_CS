# Lesson 101: Flowcharts and pseudocode notation

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Flowcharts and pseudocode notation**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Flowcharts and pseudocode notation** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Flowcharts and pseudocode notation, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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
- Answer one 4-mark question about **Flowcharts and pseudocode notation**. Follow its command word and apply each point to the stated context.

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
## Core syllabus content

**Focus:** Structured English, flowcharts and pseudocode conversion

### Direct explanation

- Structured English expresses sequence, selection and repetition using controlled natural-language statements and indentation. A flowchart uses standard symbols and arrows; pseudocode uses Cambridge constructs. All three must preserve the same decisions and loop boundaries.
- Convert by identifying inputs, outputs, conditions and repeated actions before translating notation. Do not translate shapes or sentences word for word while losing control flow.

### Worked example

**Validate a mark:** Structured English: INPUT Mark; WHILE Mark < 0 OR Mark > 100, OUTPUT error and INPUT Mark; ENDWHILE. The flowchart returns from the invalid decision branch to input; pseudocode uses a pre-condition WHILE loop.

### Targeted practice and answers

1. Which flowchart symbol represents a decision?
   **Answer:** Diamond.
2. What must remain identical during conversion?
   **Answer:** The algorithm's control flow, conditions, inputs and outputs.
3. Why is indentation useful in structured English?
   **Answer:** It shows which steps belong inside a selection or loop.

### Exam-style question and MS

**Question (4 marks):** Convert this structured English to pseudocode: input Age; if Age is at least 18 output Adult, otherwise output Minor.

- **B1** INPUT Age
- **B1** IF Age >= 18 THEN
- **B1** OUTPUT Adult and ELSE OUTPUT Minor
- **B1** closes with ENDIF / coherent Cambridge syntax

**Strict note:** Do not accept two independent IF statements if they can produce contradictory paths; the description requires mutually exclusive alternatives.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A diamond becomes IF...THEN...ELSE

- **Explains:** `equivalence`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-equivalence.jpg`

1. A flowchart decision diamond becomes an IF condition in pseudocode.
2. The labelled Yes and No branches become THEN and ELSE branches.
3. Close the selection with ENDIF after the two branches rejoin.
4. Input Age before testing whether it is between 11 and 18 inclusive.

### Flowcharts use symbols to show control flow

- **Explains:** `flowcharts`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-flowcharts.jpg`

1. A terminator marks START or END; a parallelogram marks INPUT or OUTPUT.
2. A rectangle marks a calculation or assignment; a diamond marks a yes/no decision.
3. Flow lines show the next step and decision branches must be labelled.
4. Every output value must first be assigned or input.
5. A loop must contain a route that can change its condition.

### Readable notation earns marks more easily

- **Explains:** `notation`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-notation.jpg`

1. Notation rules
2. One entry Flowcharts should have a clear start and a clear direction of travel.
3. Decision labels Decision outputs should be labelled, usually Yes/No or True/False.
4. Indentation Indented pseudocode shows which statements belong inside a branch or loop.
5. Matching endings Use ENDIF, NEXT, ENDWHILE or equivalent to close a structure clearly.
6. Meaningful names Use Mark, Total, Count, Found instead of X1 unless the question gives X1.
7. No mixed syntax Do not mix Java braces with Cambridge pseudocode keywords in the same answer.

### Cambridge-style pseudocode uses structured keywords

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-pseudocode.jpg`

1. Knowledge explanation
2. Selection
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit"
7. Count-controlled iteration
8. Total <- 0
9. FOR Count <- 1 TO 5
10. Total <- Total + Mark
11. NEXT Count
12. OUTPUT Total

### Match scenario to pseudocode structure

- **Explains:** `structure-tool`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-structure-tool.jpg`

1. Interactive structure tool
2. Scenario clue
3. Choose a clue to see the likely structure.

### Choose the correct flowchart symbol

- **Explains:** `symbol-tool`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-symbol-tool.jpg`

1. Interactive symbol tool
2. Algorithm step
3. Choose a step to see the matching symbol and reason.
<!-- stage10-explanations:end -->
