# Lesson 037: Building logic circuits from requirements

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

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Logic-gate symbols, functions and representation conversions

### Direct explanation

- Use the standard symbols and exact functions of NOT, AND, OR, NAND, NOR and XOR (EOR). NOT has one input; each of the other five gates has two inputs for this syllabus. A truth table lists every input combination and the resulting output according to the gate or circuit function.
- You must be able to construct a logic circuit from a problem statement, logic expression or truth table; construct a truth table from a problem statement, logic circuit or logic expression; and construct a logic expression from a problem statement, logic circuit or truth table. Move through variables and conditions first, then intermediate gate outputs, then the final output so every representation can be checked against the same rows.

### Worked example

**Convert one rule among four representations:** Rule: an alarm sounds when the system is armed and either the door or window is open. Define A, D and W; write Alarm = A AND (D OR W); draw an OR gate for D and W feeding an AND gate with A; then list all eight input combinations and evaluate the intermediate OR column before Alarm.

### Targeted practice and answers

1. What distinguishes the XOR symbol from the OR symbol?
   **Answer:** XOR has an additional curved line on the input side.
2. How many inputs does NOT have, and how many do the other specified gates have in this syllabus?
   **Answer:** NOT has one input; AND, OR, NAND, NOR and XOR each have two inputs.
3. Name the three possible sources from which a logic circuit may be constructed.
   **Answer:** A problem statement, a logic expression or a truth table.
4. How do intermediate columns help convert a circuit into a truth table?
   **Answer:** Each intermediate column records one gate output, allowing the final result to be calculated and checked row by row.

### Exam-style question and MS

**Question (4 marks):** A truth table gives output 1 only when input A is 1 and input B is 0. Construct a logic expression and describe the corresponding circuit.

- **B1** identifies that B must be inverted
- **M1** constructs expression Q = A AND NOT B
- **B1** B is connected to a NOT gate
- **A1** A and the NOT-gate output are connected to an AND gate whose output is Q

**Strict note:** Do not accept XOR: XOR is also 1 for A=0, B=1, which contradicts the given truth table.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A circuit design method that examiners can follow

- **Explains:** `design`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-design.jpg`

1. 1. Name the output Use a clear output such as Alarm, Unlock, Fan or Light.
2. 2. Define variables Write what each input means, for example A = system armed.
3. 3. Write expression Translate the requirement with AND, OR, NOT, NAND, NOR or XOR.
4. 4. Draw in stages Draw inner gates first, then connect them to the final output gate.
5. A correct circuit is not just a pretty drawing. It must match the Boolean expression and produce the correct truth-table output.

### Gate sequence creates the circuit structure

- **Explains:** `diagram`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
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
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-parse.jpg`

1. AND means every listed condition must be true; OR means at least one condition is true.
2. NOT directly inverts a condition.
3. P unless Q means P when NOT Q; the full sentence determines which condition is negated.
4. Do not treat the word unless as a universal unary NOT operator.
<!-- stage10-explanations:end -->
