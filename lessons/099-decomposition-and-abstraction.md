# Lesson 099: Decomposition and abstraction

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> This lesson plans sub-problems and abstractions in natural language. Formal notation is introduced later.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Decomposition and abstraction**.
2. Give each sub-problem a clear responsibility, input and output.
3. Explain why a scenario detail is relevant or irrelevant to the required result.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, abstraction 抽象, sub-problem 子问题, responsibility 职责

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Decomposition and abstraction** from the most closely related syllabus concept?

## Guided Explanation
Split a large problem into meaningful sub-problems, then keep only the scenario details that affect required inputs, processing, constraints or outputs. State how the parts connect before choosing notation.

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

**Worked answer / marking focus:** Award clear sub-problems that collectively cover every required input, decision, calculation and output without unnecessary overlap.


## Student Task
Students build a responsibility map, then justify which details must be kept or ignored.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply decomposition or abstraction to one scenario.
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
- A responsibility map or abstraction example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Abstraction: keep the details that affect the algorithm

- **Explains:** `abstraction`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-abstraction.jpg`

1. Keep details that affect an input, rule, calculation, constraint or output.
2. Ignore decoration that does not change the required result.
3. Ask whether removing a detail would change the result.
4. Explain why a detail is relevant or irrelevant rather than only labelling it.

### Decomposition: split the problem into sub-problems

- **Explains:** `decomposition`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-decomposition.jpg`

1. Split the whole task into meaningful sub-problems with distinct responsibilities.
2. Separate receiving data, checking requirements, calculations and producing results when their responsibilities differ.
3. Use clear verb-based names instead of vague labels such as Part1 or ProcessData.
4. Confirm that the sub-problems connect into one complete solution.

### Keep or ignore details

- **Explains:** `filter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-filter.jpg`

1. Interactive abstraction filter

### From scenario to algorithm plan

- **Explains:** `pattern`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-pattern.jpg`

1. Underline the required output and keep only details that affect it.
2. Create verb-based sub-problems with distinct responsibilities.
3. State each sub-problem's input and output.
4. Check that the parts collectively meet every requirement without gaps or overlap.
5. The result is a natural-language responsibility plan ready for a later representation lesson.

### Classify the design move

- **Explains:** `sorter`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-099-sorter.jpg`

1. Interactive task sorter
2. Design statement
3. Choose a statement to see whether it demonstrates decomposition, abstraction or an error.
<!-- stage10-explanations:end -->
