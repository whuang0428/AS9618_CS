# Lesson 004: Binary addition, carries, and overflow

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Represent and convert values using the conventions relevant to **Binary addition, carries, and overflow**.
2. Show each stage of a calculation and give the result in the required representation and unit.
3. Identify an incorrect method and explain how it changes the result.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00011100` on the board. Ask whether it represents a number, colour value or character code. Establish that the representation rule gives the bit pattern its meaning.

Focus question: Which feature distinguishes **Binary addition, carries, and overflow** from the most closely related syllabus concept?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Binary addition, carries, and overflow to file sizes, memory addresses, or exam calculation marks.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: place-value columns. Middle: worked conversion or binary operation. Right: exam warnings: show working, label base, check range.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Add `11001010₂` and `01110101₂` using unsigned 8-bit binary addition and identify whether unsigned overflow occurs.

**Worked answer / marking focus:** Credit correct carries and the 9th carry-out. Unsigned overflow must be explained as the result exceeding the unsigned 8-bit range 0 to 255, not just 'there is a carry'.



## Student Task
Pairs solve two additions: one that fits in 8 bits and one that overflows. They annotate every carry.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Binary addition, carries, and overflow**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### 8-bit addition method

- **Explains:** `method`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-004-method.jpg`

1. Align the two 8-bit operands and start at the rightmost column.
2. Add both bits and any carry-in; write the result bit and carry 1 left when required.
3. For unsigned addition, a carry-out beyond bit 7 means the true sum needs more than 8 bits.
4. Without a carry-out, the stored 8-bit result remains within the unsigned range 0 to 255.
5. A leftmost result bit of 1 is not by itself evidence of unsigned overflow.

### Unsigned 8-bit overflow

- **Explains:** `overflow`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-004-overflow.jpg`

1. 00000000₂ to 11111111₂ = 0 to 255
2. An unsigned 8-bit result cannot store a value above 255.
3. Carry-out
4. 11110000₂ + 00010000₂ = 1 00000000₂
5. The ninth bit is a carry-out beyond the 8-bit storage width.
6. Boundary warning
7. 01111111₂ + 00000001₂ = 10000000₂
8. No unsigned overflow: the result is 128, which still fits in 8 bits.

### Single-bit addition rules

- **Explains:** `rules`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-004-rules.jpg`

1. A full-adder truth table has eight A, B and carry-in combinations.
2. 000 gives sum 0 carry 0; 001 and 010 give sum 1 carry 0; 011 gives sum 0 carry 1.
3. 100 gives sum 1 carry 0; 101 and 110 give sum 0 carry 1; 111 gives sum 1 carry 1.
<!-- stage10-explanations:end -->
