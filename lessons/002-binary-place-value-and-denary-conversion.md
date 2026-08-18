# Lesson 002: Binary place value and denary conversion

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Binary place value and denary conversion** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00001110` on the board and ask: Is this a number, a colour value, a character code, or just eight dramatic zeros and ones? Let students argue before revealing that representation gives the bits meaning.

Lesson-specific focus question: What would go wrong if a student confused **Binary place value and denary conversion** with a neighbouring syllabus idea?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Binary place value and denary conversion to file sizes, memory addresses, or exam calculation marks.

Topic-specific teaching move: keep the explanation anchored to **Binary place value and denary conversion**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Convert `10110110₂` to denary and explain which place values are used. The worked example must explicitly use **Binary place value and denary conversion**, not a generic example from the wider unit.

**Worked answer / marking focus:** `128 + 32 + 16 + 4 + 2 = 182`; credit visible columns `128 64 32 16 8 4 2 1` and correct base labelling.



## Student Task
Students convert three 8-bit values to denary, then write one deliberately wrong solution where a zero bit is accidentally counted. Their final answer must include the phrase **Binary place value and denary conversion** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Binary place value and denary conversion**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Binary place value and denary conversion** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Binary place value and denary conversion** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes. For this lesson, make students contrast that mistake with the exact idea of **binary place value and denary conversion**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### 8-bit binary place values

- **Explains:** `knowledge`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-002-knowledge.jpg`

1. Bit position 7 6 5 4 3 2 1 0
2. Place value 128 64 32 16 8 4 2 1
3. Example bits 1 0 1 1 0 1 1 0
4. Count? yes no yes yes no yes yes no
5. 10110110₂ = 128 + 32 + 16 + 4 + 2 = 182₁₀

### Two conversion directions, two reliable methods

- **Explains:** `methods`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-002-methods.jpg`

1. Binary to denary
2. Write the place-value row: 128, 64, 32, 16, 8, 4, 2, 1.
3. Place the binary digits under the row.
4. Add only the values with a 1 above them.
5. Label the answer as denary.
6. Denary to binary
7. Start at 128 and move right.
8. Write 1 if the place value fits into the remaining number.
9. Subtract that place value when a 1 is used.
10. Write 0 when it does not fit.

### Range and leading zeros

- **Explains:** `range`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-002-range.jpg`

1. Smallest 8-bit value
2. 00000000₂ = 0₁₀
3. All place values are off.
4. Largest 8-bit value
5. 11111111₂ = 255₁₀
6. All place values are on: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1.
7. Leading zeros
8. 00000111₂ = 111₂ = 7₁₀
9. Leading zeros preserve fixed bit width; they do not change the value.
<!-- stage10-explanations:end -->
