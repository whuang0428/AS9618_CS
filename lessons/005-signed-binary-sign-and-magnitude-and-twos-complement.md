# Lesson 005: Signed binary: sign-and-magnitude and two's complement

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Represent and convert values using the conventions relevant to **Signed binary: sign-and-magnitude and two's complement**.
2. Show each stage of a calculation and give the result in the required representation and unit.
3. Identify an incorrect method and explain how it changes the result.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00100011` on the board. Ask whether it represents a number, colour value or character code. Establish that the representation rule gives the bit pattern its meaning.

Focus question: Which feature distinguishes **Signed binary: sign-and-magnitude and two's complement** from the most closely related syllabus concept?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Signed binary: sign-and-magnitude and two's complement to file sizes, memory addresses, or exam calculation marks.

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
**Problem:** Represent `-23` in 8-bit two's complement and explain how the sign bit is interpreted.

**Worked answer / marking focus:** `23 = 00010111`; invert -> `11101000`; add 1 -> `11101001`. Credit method and explanation that the leading 1 indicates a negative value in two's complement.



## Student Task
Students convert two positive and two negative values, then explain why sign-and-magnitude and two's complement are not interchangeable.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Signed binary: sign-and-magnitude and two's complement**. Follow its command word and apply each point to the stated context.

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

### 8-bit signed ranges and zero

- **Explains:** `range`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-005-range.jpg`

1. Sign-and-magnitude
2. -127 to +127
3. Has two zeros: 00000000₂ and 10000000₂.
4. One’s complement
5. Also has two zeros: 00000000₂ and 11111111₂.
6. Two’s complement
7. -128 to +127
8. Has one zero and one extra negative value.

### Three ways to represent negative binary values

- **Explains:** `systems`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-005-systems.jpg`

1. Sign-and-magnitude
2. The leftmost bit is the sign: 0 positive, 1 negative. The remaining bits store the magnitude.
3. Example: 10010111₂ = -23
4. One’s complement
5. Start with the positive binary value and invert every bit to make the negative value.
6. 00010111₂ → 11101000₂ = -23
7. Two’s complement
8. Invert every bit, then add 1. This gives one zero and a range from -128 to +127.
9. 11101000₂ + 1 = 11101001₂ = -23

### Two’s complement method

- **Explains:** `twos`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-005-twos.jpg`

1. Positive denary to negative two’s complement
2. Write the positive magnitude in 8-bit binary.
3. Invert every bit.
4. Label the result as two’s complement.
5. Two’s complement binary to denary
6. If the leftmost bit is 0, convert as normal positive binary.
7. If the leftmost bit is 1, subtract 256 from the unsigned value.
8. Alternatively: invert, add 1, then add a negative sign.
9. State the representation in the answer.
10. For 8-bit two’s complement, a quick decode is: unsigned value - 256 when the MSB is 1.
<!-- stage10-explanations:end -->
