# Lesson 035: Logic gates: NOT, AND, OR, NAND, NOR, XOR

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 3  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the logic conventions relevant to **Logic gates: NOT, AND, OR, NAND, NOR, XOR**.
2. Construct or complete a Boolean expression, circuit or truth table.
3. Check intermediate values and correct an inaccurate result.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Tell students the classroom door opens only if the teacher has a key AND the lesson is not an exam. Ask them to turn that sentence into a truth table before anyone tries to escape.

Focus question: Which feature distinguishes **Logic gates: NOT, AND, OR, NAND, NOR, XOR** from the most closely related syllabus concept?

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
**Problem:** Complete the truth table for `Output = (A AND B) OR NOT C`.

**Worked answer / marking focus:** Credit all eight input combinations and correct intermediate columns for `A AND B` and `NOT C` before the final OR.



## Student Task
Students turn a classroom access rule into a Boolean expression, then draw the gate circuit.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Logic gates: NOT, AND, OR, NAND, NOR, XOR**. Follow its command word and apply each point to the stated context.

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

### Six symbols, six exact output rules

- **Explains:** `gate-visual`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-035-gate-visual.jpg`

1. Visual explanation
2. Read each symbol from left to right. A small circle on the output means “invert”; the extra curved input line distinguishes XOR from OR.
3. NOT One input; output is the opposite value.
4. AND / NAND AND tests whether both are 1; NAND inverts that result.
5. OR / NOR OR tests whether at least one is 1; NOR inverts that result.
6. XOR Output is 1 only when the two inputs are different.
7. Check the diagram: what two visual clues separate NOR from XOR?
8. NOR has an output bubble. XOR has no output bubble, but it has an extra curved line on the input side.

### The six gate rules

- **Explains:** `gates`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-035-gates.jpg`

1. The six gates are NOT, AND, OR, NAND, NOR and XOR.
2. NAND is the negation of AND and NOR is the negation of OR.
3. XOR outputs 1 when exactly one of its two inputs is 1.
4. Ordinary OR also outputs 1 when both inputs are 1, so OR and XOR are different.

### Logic gates use binary signals

- **Explains:** `signals`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-035-signals.jpg`

1. False, off, no signal, condition not met
2. True, on, signal present, condition met
3. A value entering the gate, usually labelled A, B or C.
4. The result produced by the gate, often labelled Q or X.

### Recognise gate symbols and the inversion bubble

- **Explains:** `symbols`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-035-symbols.jpg`

1. NOT Triangle + bubble One input. Bubble means inversion.
2. AND Flat left, curved right Output 1 only when all inputs are 1.
3. OR Curved input side Output 1 when at least one input is 1.
4. NAND AND + bubble Complete AND first, then invert.
5. NOR OR + bubble Complete OR first, then invert.
6. XOR OR with extra curved line Output 1 when inputs differ.
7. Exam habit: if a symbol has a small bubble at the output, say "then invert the result" before writing the final column.
<!-- stage10-explanations:end -->
