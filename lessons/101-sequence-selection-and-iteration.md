# Lesson 101: Sequence, selection and iteration

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Sequence, selection and iteration

### Direct explanation

- Sequence executes defined steps once in order. Selection chooses one of two or more paths using a condition. Iteration repeats one or more steps using a count or a condition.
- A complete algorithm often combines the three constructs: use sequence to initialise and input, iteration to process repeated items, and selection inside the loop when each item needs a decision.
- Choose the construct from the required behaviour. A known number of repetitions suggests count-controlled iteration; a stopping rule based on data suggests condition-controlled iteration.

### Worked example

**Count five passing marks:** Sequence sets PassCount to 0. A FOR loop iterates through five marks. Inside the loop, selection tests Mark >= 50 and increments PassCount only on the true path. Sequence after the loop outputs PassCount.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which construct executes steps once in a fixed order?
   **Answer:** Sequence.
2. Which construct chooses between Pass and Resit?
   **Answer:** Selection.
3. Which construct processes ten supplied readings?
   **Answer:** Iteration, normally a count-controlled loop because the number is known.

### Exam-style question and MS

**Question (4 marks):** Develop a short algorithm that inputs ten marks and outputs how many are passes, labelling where sequence, selection and iteration are used.

| Answer | Guidance | Marks |
|---|---|---:|
| sequence initialises the pass count | Do not award a construct name unless the stated algorithm uses it for the correct behaviour. | 1 |
| iteration processes exactly ten marks |  | 1 |
| selection tests each mark against the pass condition |  | 1 |
| sequence outputs the final count after the loop |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Sequence, selection, and iteration in algorithms**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Sequence, selection, and iteration in algorithms** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Sequence, selection, and iteration in algorithms, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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
- Answer one 4-mark question about **Sequence, selection, and iteration in algorithms**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Real algorithms usually combine the three structures

- **Explains:** `combining`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-combining.jpg`

1. Combining structures
2. 1 Use sequence to initialise variables and read inputs.
3. 2 Use iteration when the same action happens repeatedly.
4. 3 Use selection inside the loop when each item needs a decision.
5. 4 Use sequence after the loop to calculate or output final results.
6. 5 Indent nested structures so the examiner can see the logic.

### Iteration: repeat steps

- **Explains:** `iteration`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-iteration.jpg`

1. Knowledge explanation
2. Use when
3. Cambridge-style pattern
4. Count-controlled
5. the number of repeats is known
6. FOR Count <- 1 TO 10 ... NEXT Count
7. Condition-controlled
8. repeat until a condition changes
9. WHILE Number <> -1 ... ENDWHILE
10. Repeat-until style
11. the body must run at least once
12. REPEAT ... UNTIL Valid = TRUE

### Cambridge pseudocode is the exam form; Java is support only

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-pseudocode.jpg`

1. Initialise PassCount to zero before processing five marks.
2. Input Mark inside the FOR loop and increment PassCount only when Mark is at least 50.
3. Close the conditional with ENDIF before NEXT Count.
4. Output PassCount after the loop.

### Selection: choose a path using a condition

- **Explains:** `selection`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-selection.jpg`

1. Knowledge explanation
2. Selection is used when the algorithm must decide between different actions.
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit"

### Sequence: steps run in a fixed order

- **Explains:** `sequence`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-101-sequence.jpg`

1. Knowledge explanation
2. Sequence is used when every step must happen once, in order, with no branch and no repetition.
3. INPUT Length
4. INPUT Width
5. Area <- Length * Width
6. OUTPUT Area
<!-- stage10-explanations:end -->
