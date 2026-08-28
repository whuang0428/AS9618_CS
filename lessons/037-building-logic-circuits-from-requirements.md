# Lesson 037: Building logic circuits from requirements

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the logic conventions relevant to **Building logic circuits from requirements**.
2. Construct or complete a Boolean expression, circuit or truth table.
3. Check intermediate values and correct an inaccurate result.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Tell students the classroom door opens only if the teacher has a key AND the lesson is not an exam. Ask them to turn that sentence into a truth table before anyone tries to escape.

Focus question: Which feature distinguishes **Building logic circuits from requirements** from the most closely related syllabus concept?

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
**Problem:** Create a truth table for a two-input condition and identify when the output is 1.

**Worked answer / marking focus:** Credit every input combination and the correct output column. For circuits, the gate sequence must match the expression.

## Student Task
Pairs invent a school rule using AND, OR and NOT, then exchange it with another pair to produce a truth table.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Building logic circuits from requirements**. Follow its command word and apply each point to the stated context.

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

### A circuit design method that examiners can follow

- **Explains:** `design`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-design.jpg`

1. 1. Name the output Use a clear output such as Alarm, Unlock, Fan or Light.
2. 2. Define variables Write what each input means, for example A = system armed.
3. 3. Write expression Translate the requirement with AND, OR, NOT, NAND, NOR or XOR.
4. 4. Draw in stages Draw inner gates first, then connect them to the final output gate.
5. A correct circuit is not just a pretty drawing. It must match the Boolean expression and produce the correct truth-table output.

### Gate sequence creates the circuit structure

- **Explains:** `diagram`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-diagram.jpg`

1. Door Input D
2. Window Input W
3. OR D OR W
4. Armed Input A
5. AND A AND (D OR W)
6. Alarm Final output Q
7. Draw the OR branch first, then feed it into AND with Armed. If the drawing order is unclear, label intermediate outputs.

### Parse requirement wording into logic

- **Explains:** `parse`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-parse.jpg`

1. AND means every listed condition must be true; OR means at least one condition is true.
2. NOT directly inverts a condition.
3. P unless Q means P when NOT Q; the full sentence determines which condition is negated.
4. Do not treat the word unless as a universal unary NOT operator.
<!-- stage10-explanations:end -->
