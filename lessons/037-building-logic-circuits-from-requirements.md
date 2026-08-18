# Lesson 037: Building logic circuits from requirements

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 3  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Building logic circuits from requirements** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- input 输入, output 输出, storage 存储, logic gate 逻辑门, embedded system 嵌入式系统

## Warm-Up Hook
Tell students the classroom door opens only if the teacher has a key AND the lesson is not an exam. Ask them to turn that sentence into a truth table before anyone tries to escape.

Lesson-specific focus question: What would go wrong if a student confused **Building logic circuits from requirements** with a neighbouring syllabus idea?

## Guided Explanation
Translate English conditions into Boolean variables, complete the truth table, then draw or simplify the logic circuit. Test the circuit with one row from the table and use mismatches as debugging evidence.

Topic-specific teaching move: keep the explanation anchored to **Building logic circuits from requirements**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: Boolean statement. Middle: truth table. Right: circuit or expression and test row.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Create a truth table for a two-input condition and identify when the output is 1. The worked example must explicitly use **Building logic circuits from requirements**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit every input combination and the correct output column. For circuits, the gate sequence must match the expression.



## Student Task
Pairs invent a school rule using AND, OR and NOT, then exchange it with another pair to produce a truth table. Their final answer must include the phrase **Building logic circuits from requirements** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Building logic circuits from requirements**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Building logic circuits from requirements** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Building logic circuits from requirements** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 3.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often use everyday 'or' instead of logical OR. Correction: OR is true when at least one input is true unless XOR is specified. For this lesson, make students contrast that mistake with the exact idea of **building logic circuits from requirements**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A circuit design method that examiners can follow

- **Explains:** `design`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-design.jpg`

1. 1. Name the output Use a clear output such as Alarm, Unlock, Fan or Light.
2. 2. Define variables Write what each input means, for example A = system armed.
3. 3. Write expression Translate the requirement with AND, OR, NOT, NAND, NOR or XOR.
4. 4. Draw in stages Draw inner gates first, then connect them to the final output gate.
5. A correct circuit is not just a pretty drawing. It must match the Boolean expression and produce the correct truth-table output.

### Gate sequence creates the circuit structure

- **Explains:** `diagram`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-037-parse.jpg`

1. Requirement phrase
2. Logic meaning
3. Gate / expression
4. Exam warning
5. both / all / only if X and Y
6. Every listed condition must be 1.
7. Do not replace AND with OR because one condition sounds important.
8. either / at least one
9. One or more conditions may be 1.
10. OR includes the row where both inputs are 1.
11. not / unless / inactive
12. Invert the condition.
<!-- stage10-explanations:end -->
