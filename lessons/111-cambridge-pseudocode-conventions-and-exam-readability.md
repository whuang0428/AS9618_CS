# Lesson 111: Cambridge pseudocode conventions and exam readability

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Cambridge pseudocode conventions and exam readability**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Cambridge pseudocode conventions and exam readability** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Cambridge pseudocode conventions and exam readability, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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
- Answer one 4-mark question about **Cambridge pseudocode conventions and exam readability**. Follow its command word and apply each point to the stated context.

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

### Convert Java-like syntax into Cambridge-style pseudocode

- **Explains:** `cleaner`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-cleaner.jpg`

1. Interactive Java cleaner
2. Java-like fragment
3. Choose a fragment to convert.

### Convert meaning first, syntax second

- **Explains:** `conversion`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-conversion.jpg`

1. Preserve the algorithm's meaning before converting notation or syntax.
2. Rename abbreviated draft variables toward clearer names: m to Mark, i to Index and pc to PassCount.
3. Use Cambridge blocks after the inputs, processing and outputs are defined.
4. Trace the completed algorithm once to verify where each value changes.

### Keep Java syntax out of Paper 2 unless Java is explicitly requested

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-java.jpg`

1. Java braces, semicolons and increment operators are support syntax, not Cambridge pseudocode.
2. In Cambridge pseudocode, initialise PassCount and iterate over explicitly defined array positions.
3. Increment PassCount only when the current mark is at least 50.
4. Close the conditional with ENDIF before NEXT Index.

### Use the symbols that make algorithm intent visible

- **Explains:** `notation`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-notation.jpg`

1. Core notation
2. Cambridge-style pseudocode
3. Java support only
4. Exam note
5. Assignment
6. Total <- Total + 1
7. total = total + 1;
8. <- shows value is stored
9. INPUT Mark
10. scanner.nextInt()
11. name the value being read
12. OUTPUT Total

### A marker should not need detective training

- **Explains:** `readability`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-readability.jpg`

1. Readability
2. Weak answer
3. Improved answer
4. Why it helps
5. Identifier
6. x, y, z
7. Mark, Total, PassCount
8. purpose is visible
9. Indentation
10. all lines aligned
11. nested lines indented
12. block ownership is clear

### Every opening should have a visible ending

- **Explains:** `structure`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-111-structure.jpg`

1. Block structure
2. Readable selection
3. IF Mark >= 50 THEN
4. OUTPUT "Pass"
5. OUTPUT "Resit"
6. ENDIF makes the selection boundary clear.
7. Readable loop
8. FOR Index <- 1 TO 5
9. INPUT Mark
10. Total <- Total + Mark
11. NEXT Index
12. NEXT Index shows which loop is ending, useful when loops are nested.
<!-- stage10-explanations:end -->
