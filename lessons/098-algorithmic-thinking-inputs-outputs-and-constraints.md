# Lesson 098: Algorithmic thinking: inputs, outputs, and constraints

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Algorithmic thinking: inputs, outputs, and constraints** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Algorithmic thinking: inputs, outputs, and constraints** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Algorithmic thinking: inputs, outputs, and constraints, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Algorithmic thinking: inputs, outputs, and constraints**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string. The worked example must explicitly use **Algorithmic thinking: inputs, outputs, and constraints**, not a generic example from the wider unit.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears. Their final answer must include the phrase **Algorithmic thinking: inputs, outputs, and constraints** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Algorithmic thinking: inputs, outputs, and constraints**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Algorithmic thinking: inputs, outputs, and constraints** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Algorithmic thinking: inputs, outputs, and constraints** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **algorithmic thinking: inputs, outputs, and constraints**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S9.04
**Focus:** Meaningful identifiers and identifier tables

### Direct explanation

- Identifiers should describe their data or role, be unambiguous and follow a consistent naming convention. Avoid unexplained single letters except conventional short counters.
- An identifier table records each identifier's name, data type and purpose; scope and initial value may be added when useful. It is a design artefact, so entries must match the algorithm that follows.

### Worked example

**Ticket calculation:** Use TicketCount: INTEGER, number of tickets requested; TicketPrice: REAL, price of one ticket; TotalCost: REAL, TicketCount * TicketPrice; IsMember: BOOLEAN, whether discount applies.

### Targeted practice and answers

1. Improve identifier x for the number of absent students.
   **Answer:** AbsentCount or NumberAbsent.
2. What three columns are essential here?
   **Answer:** Identifier, data type and purpose/description.
3. Why is Total misleading for several totals?
   **Answer:** It does not identify which quantity is totalled.

### Exam-style question and MS

**Question (4 marks):** Construct identifier-table entries for a program storing a student's name, three test marks and calculated mean.

- **B1** meaningful identifier and STRING type for name
- **B1** meaningful array identifier with INTEGER/REAL elements for marks
- **B1** meaningful REAL identifier for mean
- **B1** purposes clearly distinguish input values from calculated result

**Strict note:** Do not award data types without identifiers and purposes; this is an identifier table, not only declarations.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### An algorithm is a precise method for solving a problem

- **Explains:** `concept`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-concept.jpg`

1. Core idea
2. Question to ask
3. What data is supplied?
4. Mark, NumberOfItems, List[1:10]
5. What operations are performed?
6. compare, add, count, repeat, validate
7. What must be shown or returned?
8. "Pass", total, maximum, valid/invalid
9. Constraint
10. What rule or limit applies?
11. Mark must be 0-100; loop stops after 10 items

### Constraints stop algorithms from wandering off

- **Explains:** `constraints`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-constraints.jpg`

1. Constraints
2. Constraint type
3. Example clue
4. Design effect
5. mark is between 0 and 100
6. validate before processing
7. exactly 10 readings are entered
8. use count-controlled loop
9. Sentinel
10. enter -1 to finish
11. use condition-controlled loop
12. Output format

### Use IPOC before pseudocode

- **Explains:** `model`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-model.jpg`

1. Problem model
2. Input List each value the algorithm needs. Decide type and range when possible.
3. Process Write the transformation in English first: calculate, compare, count, search, repeat.
4. Output State exactly what the algorithm must display, return or store.
5. Constraints Record limits, valid ranges, maximum repetitions and stopping conditions.
6. Assumptions State what is guaranteed if the question implies it, such as exactly 10 values.
7. Test data Choose normal, boundary and invalid data when validation is involved.

### Cambridge pseudocode is the exam language

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. INPUT Mark
4. IF Mark >= 50 THEN
5. OUTPUT "Pass"
6. OUTPUT "Resit needed"
7. Java support only
8. if (mark >= 50) {
9. System.out.println("Pass");
10. } else {
11. System.out.println("Resit needed");
12. Exam reminder: write IF ... THEN, ELSE, ENDIF, INPUT, OUTPUT in Cambridge-style pseudocode. Java braces and semicolons are support examples only.
<!-- stage10-explanations:end -->
