# Lesson 004: Binary addition, carries, and overflow

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Binary addition, carries, and overflow** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00011100` on the board and ask: Is this a number, a colour value, a character code, or just eight dramatic zeros and ones? Let students argue before revealing that representation gives the bits meaning.

Lesson-specific focus question: What would go wrong if a student confused **Binary addition, carries, and overflow** with a neighbouring syllabus idea?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Binary addition, carries, and overflow to file sizes, memory addresses, or exam calculation marks.

Topic-specific teaching move: keep the explanation anchored to **Binary addition, carries, and overflow**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: place-value columns. Middle: worked conversion or binary operation. Right: exam warnings: show working, label base, check range.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Add `11001010₂` and `01110101₂` using 8-bit binary addition and identify whether overflow occurs. The worked example must explicitly use **Binary addition, carries, and overflow**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct carries and the 9th carry-out. Overflow must be explained as the result exceeding the available 8-bit range, not just 'there is a carry'.



## Student Task
Pairs solve two additions: one that fits in 8 bits and one that overflows. They annotate every carry. Their final answer must include the phrase **Binary addition, carries, and overflow** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Binary addition, carries, and overflow**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Binary addition, carries, and overflow** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Binary addition, carries, and overflow** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes. For this lesson, make students contrast that mistake with the exact idea of **binary addition, carries, and overflow**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S1.04
**Focus:** Binary subtraction with signed and unsigned values

### Direct explanation

- Unsigned subtraction can be performed column by column using borrowing, or by adding the two's complement of the subtrahend. The fixed bit width must be retained throughout.
- For signed two's-complement subtraction A - B, form the two's complement of B and add it to A. Discard a carry beyond the fixed width, then interpret the remaining sign bit and check the representable range.

### Worked example

**8-bit 23 - 9:** 00010111 - 00001001 becomes 00010111 + 11110111 = 1 00001110. Discard the ninth carry: 00001110 is 14.

### Targeted practice and answers

1. Calculate 00110110 - 00010100.
   **Answer:** 00100010, which is 34.
2. In 8-bit two's complement, calculate 7 - 12.
   **Answer:** 00000111 + 11110100 = 11111011, which is -5.
3. Why is a carry beyond bit 8 discarded?
   **Answer:** The operation has a fixed 8-bit width; the ninth bit lies outside that representation.

### Exam-style question and MS

**Question (4 marks):** Using 8-bit two's complement, calculate 18 - 27. Show how subtraction is converted to addition.

- **M1** 27 is 00011011 and its two's complement is 11100101
- **M1** adds 00010010 + 11100101
- **A1** obtains 11110111
- **A1** interprets the result as -9

**Strict note:** Do not award the final mark for 247; the result must be interpreted as signed two's complement.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### 8-bit addition method

- **Explains:** `method`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-004-method.jpg`

1. Column method
2. Align the two 8-bit values.
3. Start at the rightmost bit.
4. Add the two bits and any carry-in.
5. Write the result bit; carry 1 left if the column total is 2 or 3.
6. After the leftmost bit, check whether there is a carry-out.
7. Exam discipline
8. Show the carry row or annotate carried bits.
9. Give the 8-bit result if the question asks for 8-bit addition.
10. State whether overflow occurs.
11. Explain overflow using range or carry-out, not vague "too big".

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

1. 0 + 0 sum 0, carry 0
2. 0 + 1 sum 1, carry 0
3. 1 + 0 sum 1, carry 0
4. 1 + 1 sum 0, carry 1
5. 1 + 1 + carry 1 sum 1, carry 1
6. In binary, 1 + 1 = 10₂: write 0 in the current column and carry 1 left.
<!-- stage10-explanations:end -->
