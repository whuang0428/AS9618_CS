# Lesson 006: Binary fractions and precision limits

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Represent and convert values using the conventions relevant to **Binary fractions and precision limits**.
2. Show each stage of a calculation and give the result in the required representation and unit.
3. Identify an incorrect method and explain how it changes the result.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00101010` on the board. Ask whether it represents a number, colour value or character code. Establish that the representation rule gives the bit pattern its meaning.

Focus question: Which feature distinguishes **Binary fractions and precision limits** from the most closely related syllabus concept?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Binary fractions and precision limits to file sizes, memory addresses, or exam calculation marks.

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
**Problem:** Convert a small value between denary, binary and hexadecimal, then state whether the answer fits in 8 bits.

**Worked answer / marking focus:** Award the method before the final number: place values or 4-bit hex groups must be visible. The final line must include the base, for example `10110110₂ = B6₁₆`.



## Student Task
Give each pair three cards: a denary value, a binary value and a hexadecimal value. Students match the equivalent values, explain the conversion method, then correct one plausible but inaccurate conversion.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Binary fractions and precision limits**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

## Stage 2 syllabus completion

**Official audit rows:** S1.02, S1.03, S1.06
**Focus:** Binary-coded decimal (BCD)

### Direct explanation

- BCD encodes each denary digit separately in four bits. For example, 59 becomes 0101 1001, not the pure-binary value 00111011.
- Only 0000 to 1001 are valid BCD digit groups. BCD is useful when decimal digits must be displayed exactly, such as clocks and calculators, but it usually uses more bits than pure binary.

### Worked example

**Encode 407:** Treat 4, 0 and 7 separately: 4 = 0100, 0 = 0000, 7 = 0111, so 407 in BCD is 0100 0000 0111.

### Targeted practice and answers

1. Write denary 82 in BCD.
   **Answer:** 1000 0010.
2. Decode BCD 0011 1001.
   **Answer:** 39.
3. Why is 1010 invalid as one BCD digit?
   **Answer:** BCD digit groups represent only denary 0 to 9; 1010 represents 10.

### Exam-style question and MS

**Question (4 marks):** The bit pattern 0010 0101 is stored as BCD. State the denary value and explain one reason BCD may be chosen for a digital clock.

- **B1** identifies separate groups 0010 and 0101
- **A1** states 25
- **B1** each displayed denary digit maps directly to one four-bit group
- **B1** reduces conversion work / preserves exact decimal digits for display

**Strict note:** Do not accept 37, which is the pure-binary interpretation of the whole eight-bit pattern.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Converting simple binary fractions

- **Explains:** `convert`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-006-convert.jpg`

1. Binary fraction to denary
2. Write the place values above and below the point.
3. Add the values for every 1 bit.
4. Keep the base label until the final answer.
5. State whether the answer is exact.
6. Denary fraction to binary
7. Use 1/2, 1/4, 1/8, 1/16 as target values.
8. Subtract a target value when it fits.
9. Write 1 for a used value and 0 for a skipped value.
10. Stop when the remainder is zero or the bit limit is reached.
11. Example: 0.625₁₀ = 0.101₂ because 0.5 + 0.125 = 0.625.

### Binary fractional place value

- **Explains:** `point`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-006-point.jpg`

1. Example 10.101₂
2. 10.101₂ = 2 + 1/2 + 1/8 = 2.625₁₀

### Precision limits: why computers sometimes approximate

- **Explains:** `precision`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-006-precision.jpg`

1. 0.75₁₀ = 0.11₂ exactly because 1/2 + 1/4 = 3/4.
2. Limited precision
3. With four fractional bits, 0.1₁₀ becomes approximately 0.0001₂, which is 0.0625₁₀.
4. Representation error is the difference between the intended value and the stored approximation.
5. This lesson uses fixed fractional places only. Mantissa, exponent and floating-point normalisation belong to later A Level content.
<!-- stage10-explanations:end -->
