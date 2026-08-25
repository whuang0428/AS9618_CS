# Lesson 098: Algorithmic thinking: inputs, outputs, and constraints

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> This lesson plans algorithms in natural language. Control structures, notation and tracing are introduced in Lessons 100-102.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Algorithmic thinking: inputs, outputs, and constraints**.
2. Build an IPOC plan using clear natural-language processing steps.
3. Check that the plan represents every stated requirement and supported assumption.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, input 输入, process 处理, output 输出, constraint 约束, assumption 假设

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Algorithmic thinking: inputs, outputs, and constraints** from the most closely related syllabus concept?

## Guided Explanation
Define inputs, outputs, constraints and assumptions before choosing a representation. Write the required processing in ordered natural-language steps, then check every requirement against the plan.

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
2. Apply IPOC to one short scenario.
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
- A complete IPOC plan or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
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

**Question (4 marks):** Construct identifier-table entries for a program storing a student's name, three separate test marks and calculated mean.

- **B1** meaningful identifier and STRING type for name
- **B1** three clearly distinguished INTEGER/REAL identifiers for the separate marks
- **B1** meaningful REAL identifier for mean
- **B1** purposes clearly distinguish input values from calculated result

**Strict note:** Do not award data types without identifiers and purposes; this is an identifier table, not only declarations.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### An algorithm is a precise method for solving a problem

- **Explains:** `concept`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-concept.jpg`

1. Identify what data is supplied and do not invent missing data.
2. State the required transformation in clear natural language.
3. State the exact result that must be displayed, returned or stored.
4. Record limits, quantity requirements and supported assumptions.
5. Check that every requirement maps to an input, process, output, constraint or assumption.

### Constraints stop algorithms from wandering off

- **Explains:** `constraints`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-constraints.jpg`

1. A range of 0 to 100 requires both limits to be checked.
2. Exactly 10 supplied readings means the plan must process all 10 readings.
3. A capacity of 30 bookings means a request beyond the remaining capacity must be rejected.
4. Each stated constraint must have a specific consequence in the plan.

### Use IPOC before choosing a representation

- **Explains:** `model`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-098-model.jpg`

1. List each input and record its type or range when the problem supplies them.
2. Write the required processing in ordered natural-language steps.
3. State the exact required output.
4. Record constraints and supported assumptions.
5. Confirm completeness before choosing a representation.
<!-- stage10-explanations:end -->
