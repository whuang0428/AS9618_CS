# Lesson 036: Truth tables and Boolean expressions

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the logic conventions relevant to **Truth tables and Boolean expressions**.
2. Construct or complete a Boolean expression, circuit or truth table.
3. Check intermediate values and correct an inaccurate result.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Tell students the classroom door opens only if the teacher has a key AND the lesson is not an exam. Ask them to turn that sentence into a truth table before anyone tries to escape.

Focus question: Which feature distinguishes **Truth tables and Boolean expressions** from the most closely related syllabus concept?

## Guided Explanation
Translate English conditions into Boolean variables, complete the truth table, then draw or simplify the logic circuit. Test the circuit with one row from the table and use mismatches as debugging evidence.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: Boolean statement. Middle: truth table. Right: circuit or expression and test row.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Given a two-gate circuit, derive the Boolean expression and complete its truth table.

**Worked answer / marking focus:** Credit systematic input combinations, intermediate gate outputs and final output. The expression must match the circuit order.



## Student Task
Pairs swap circuits and truth tables; each pair checks whether the other representation matches.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Truth tables and Boolean expressions**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Boolean expressions describe gate behaviour

- **Explains:** `expressions`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-036-expressions.jpg`

1. Variables
2. A, B and C represent input signals. Each row assigns them 0 or 1.
3. Operators
4. NOT, AND, OR, NAND, NOR and XOR describe the logic applied.
5. Intermediate columns
6. Each bracketed part or gate output should get its own column.
7. Final output
8. Q is the final result after all intermediate columns have been combined.

### Brackets and NOT usually come before the final combination

- **Explains:** `precedence`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-036-precedence.jpg`

1. Brackets first For (A OR B) AND C, complete A OR B before the AND with C.
2. NOT next For A AND NOT B, invert B before applying AND.
3. Then combine Use AND, OR or XOR to combine the prepared columns.
4. Check one row Pick one row and explain it in words to catch swapped columns.
5. Do not assume a hidden priority when the expression is unclear. In exam answers, use brackets or intermediate columns to remove ambiguity.

### A reliable truth-table method

- **Explains:** `table-method`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-036-table-method.jpg`

1. 1. Count inputs n inputs produce 2^n rows. Two inputs give 4 rows; three inputs give 8 rows.
2. 2. List input combinations Use a systematic order such as 000, 001, 010, 011, 100, 101, 110, 111.
3. 3. Add intermediate columns One column for each gate result, such as A AND B or NOT C.
4. 4. Fill final Q Use the intermediate columns to avoid guessing the final output.
5. Row number
<!-- stage10-explanations:end -->
