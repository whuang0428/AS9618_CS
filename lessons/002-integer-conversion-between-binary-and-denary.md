# Lesson 002: Integer conversion between binary and denary

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Integer conversion between binary and denary

### Direct explanation

- Binary is base 2 and uses place values that are powers of 2. Denary is base 10 and uses place values that are powers of 10. A base label identifies the representation; it does not change the integer value.
- To convert a binary integer to denary, add the binary place values whose bits are 1. To convert a denary integer to binary, select powers of 2 that sum to the value and write every required bit position, including zeros.
- Representation overview: the required integer representations are binary, denary, hexadecimal, BCD, one's-complement and two's-complement. Conversion means preserving the integer value while changing its base or signed representation.

### Worked example

**Convert the same integer in both directions:** 10110110 binary = 128 + 32 + 16 + 4 + 2 = 182 denary. Reversing the process, 182 = 128 + 32 + 16 + 4 + 2, so the 8-bit binary representation is 10110110.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Convert the binary integer 01001101 to denary.
   **Answer:** 77.
2. Convert the denary integer 129 to 8-bit binary.
   **Answer:** 10000001.
3. Why must a base or representation be stated?
   **Answer:** The same digit string can represent different integer values in different number bases.

### Exam-style question and MS

**Question (4 marks):** Convert 156 denary to 8-bit binary, then convert your binary answer back to denary as a check.

| Answer | Guidance | Marks |
|---|---|---:|
| selects 128 + 16 + 8 + 4 | Do not award an unlabelled digit string when the base is ambiguous. | 1 |
| 10011100 |  | 1 |
| re-expands the binary place values |  | 1 |
| returns to 156 denary |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Represent and convert values using the conventions relevant to **Binary place value and denary conversion**.
2. Show each stage of a calculation and give the result in the required representation and unit.
3. Identify an incorrect method and explain how it changes the result.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00001110` on the board. Ask whether it represents a number, colour value or character code. Establish that the representation rule gives the bit pattern its meaning.

Focus question: Which feature distinguishes **Binary place value and denary conversion** from the most closely related syllabus concept?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Binary place value and denary conversion to file sizes, memory addresses, or exam calculation marks.

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
**Problem:** Convert `10110110₂` to denary and explain which place values are used.

**Worked answer / marking focus:** `128 + 32 + 16 + 4 + 2 = 182`; credit visible columns `128 64 32 16 8 4 2 1` and correct base labelling.

## Student Task
Students convert three 8-bit values to denary, then write one deliberately wrong solution where a zero bit is accidentally counted.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Binary place value and denary conversion**. Follow its command word and apply each point to the stated context.

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

### 8-bit binary place values

- **Explains:** `knowledge`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-002-knowledge.jpg`

1. Bit position 7 6 5 4 3 2 1 0
2. Place value 128 64 32 16 8 4 2 1
3. Example bits 1 0 1 1 0 1 1 0
4. Count? yes no yes yes no yes yes no
5. 10110110₂ = 128 + 32 + 16 + 4 + 2 = 182₁₀

### Two conversion directions, two reliable methods

- **Explains:** `methods`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
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
- **Delivery:** OPTIONAL / EXTEND
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

### Three ways to represent negative binary values

- **Explains:** `systems`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-005-systems.jpg`

1. Positive 23 in 8 bits is 00010111.
2. The 8-bit sign-and-magnitude representation of -23 is 10010111.
3. The 8-bit one's-complement representation of -23 is 11101000.
4. The 8-bit two's-complement representation of -23 is 11101001.
5. Every input, intermediate state and result must contain exactly 8 bits.
<!-- stage10-explanations:end -->
