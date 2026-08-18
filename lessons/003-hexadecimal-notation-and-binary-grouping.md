# Lesson 003: Hexadecimal notation and binary grouping

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Hexadecimal notation and binary grouping** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00010101` on the board and ask: Is this a number, a colour value, a character code, or just eight dramatic zeros and ones? Let students argue before revealing that representation gives the bits meaning.

Lesson-specific focus question: What would go wrong if a student confused **Hexadecimal notation and binary grouping** with a neighbouring syllabus idea?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Hexadecimal notation and binary grouping to file sizes, memory addresses, or exam calculation marks.

Topic-specific teaching move: keep the explanation anchored to **Hexadecimal notation and binary grouping**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Convert `1101 0110₂` to hexadecimal and explain why grouping into four bits works. The worked example must explicitly use **Hexadecimal notation and binary grouping**, not a generic example from the wider unit.

**Worked answer / marking focus:** `1101₂ = D₁₆` and `0110₂ = 6₁₆`, so the value is `D6₁₆`. Award marks for 4-bit grouping from the right.



## Student Task
Students match binary nibbles to hex digits, then decode a short memory-address style value. Their final answer must include the phrase **Hexadecimal notation and binary grouping** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Hexadecimal notation and binary grouping**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Hexadecimal notation and binary grouping** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Hexadecimal notation and binary grouping** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes. For this lesson, make students contrast that mistake with the exact idea of **hexadecimal notation and binary grouping**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Hexadecimal digits: 0-9 then A-F

- **Explains:** `digits`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-003-digits.jpg`

1. nibble 4-bit group

### One hex digit represents one nibble

- **Explains:** `grouping`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-003-grouping.jpg`

1. Why four bits?
2. Four bits can represent 16 patterns: from 0000₂ to 1111₂. Hexadecimal has exactly 16 digits: 0 to F.
3. Binary to hex
4. Group the binary value into nibbles from the right. Convert each nibble separately.
5. Hex to binary
6. Replace each hex digit with its 4-bit binary nibble. Keep all four bits for each digit.
7. 1101₂ = D₁₆ and 0110₂ = 6₁₆, so 1101 0110₂ = D6₁₆.

### Padding with leading zeros

- **Explains:** `padding`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-003-padding.jpg`

1. When padding is needed
2. If the leftmost group has fewer than four bits, add leading zeros to complete the nibble.
3. 101101₂ → 0010 1101₂ → 2D₁₆
4. The value does not change because leading zeros do not add active place values.
5. Base labels
6. 10 could mean denary ten or binary two. Use base labels when the notation could be ambiguous.
<!-- stage10-explanations:end -->
