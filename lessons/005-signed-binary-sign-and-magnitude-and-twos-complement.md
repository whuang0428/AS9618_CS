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

1. Sign-and-magnitude uses one sign bit and seven magnitude bits; its range is -127 to +127 and it has two zero patterns.
2. One's complement forms a negative value by inverting all eight bits; its range is -127 to +127 and it has two zero patterns.
3. Two's complement uses all eight bits as one weighted value with MSB place value -128.
4. The 8-bit two's-complement range is -128 to +127 and it has one zero pattern.
5. One's complement and two's complement do not store a separate magnitude field.

### Three ways to represent negative binary values

- **Explains:** `systems`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-005-systems.jpg`

1. Positive 23 in 8 bits is 00010111.
2. The 8-bit sign-and-magnitude representation of -23 is 10010111.
3. The 8-bit one's-complement representation of -23 is 11101000.
4. The 8-bit two's-complement representation of -23 is 11101001.
5. Every input, intermediate state and result must contain exactly 8 bits.

### Two’s complement method

- **Explains:** `twos`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-005-twos.jpg`

1. Write the positive magnitude using exactly 8 bits.
2. Invert every bit, then add 1 to form the negative two's-complement value.
3. For +45: 00101101 becomes 11010010 after inversion, then 11010011 after adding 1.
4. The 8-bit value 11010011 represents -45 in two's complement.
5. When the MSB is 1, quick decode uses unsigned value minus 256.
<!-- stage10-explanations:end -->
