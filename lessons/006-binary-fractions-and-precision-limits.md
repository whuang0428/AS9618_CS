# Lesson 006: BCD and hexadecimal in practical systems

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- remediation-v2-optional:start -->
> **Optional enrichment:** binary fractions and precision limits. This material is excluded from compulsory syllabus coverage, first-use and assessment statistics.
>
> **Formal AS prerequisite:** S1.02-S1.03 integer number systems and conversions.
<!-- remediation-v2-optional:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** BCD and hexadecimal in practical systems

### Direct explanation

- BCD encodes each denary digit separately in four bits. For example, 59 becomes 0101 1001, not the pure-binary value 00111011.
- Only 0000 to 1001 are valid BCD digit groups. BCD is used where decimal digits must be displayed or processed exactly, such as digital clocks, calculators and financial displays, although it usually uses more bits than pure binary.
- Hexadecimal is used as a compact human-readable form of binary. One hex digit represents four bits, so hexadecimal is practical for memory addresses, machine-code/debug displays and colour values.
- A digital clock is a practical BCD application because each displayed denary digit maps directly to one four-bit BCD group.

### Worked example

**Choose representations for a clock and an address:** A clock can encode 407 as BCD 0100 0000 0111 so each displayed denary digit maps to one four-bit group. A binary memory address can be written compactly in hexadecimal because each hexadecimal digit maps exactly to one nibble.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Write denary 82 in BCD.
   **Answer:** 1000 0010.
2. Give the decoded form of BCD 0011 1001.
   **Answer:** 39.
3. Why is BCD suitable for a digital clock?
   **Answer:** Each displayed denary digit maps directly to one four-bit group.
4. Why is hexadecimal suitable for a memory address?
   **Answer:** It is a compact form of binary with one digit per four-bit nibble.

### Exam-style question and MS

**Question (4 marks):** Explain one practical application of BCD and one practical application of hexadecimal.

| Answer | Guidance | Marks |
|---|---|---:|
| BCD application such as a digital clock, calculator or financial display | Do not award a named application without explaining why the representation suits it. | 1 |
| links BCD to separate exact denary digits |  | 1 |
| hexadecimal application such as memory addresses, machine-code/debug output or colour values |  | 1 |
| links hexadecimal to compact four-bit grouping |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Converting simple binary fractions

- **Explains:** `convert`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-006-convert.jpg`

1. Binary fractional place values are 1/2, 1/4, 1/8 and 1/16 from left to right.
2. 0.1010 binary equals 1/2 + 1/8 = 0.625 denary.
3. 0.1100 binary equals 1/2 + 1/4 = 0.75 denary.

### Binary fractional place value

- **Explains:** `point`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-006-point.jpg`

1. Example 10.101₂
2. 10.101₂ = 2 + 1/2 + 1/8 = 2.625₁₀

### Precision limits: why computers sometimes approximate

- **Explains:** `precision`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-006-precision.jpg`

1. 0.75 denary equals 0.1100 binary exactly.
2. With four fractional bits, truncating 0.1 gives 0.0001 binary, which equals 0.0625 denary.
3. The truncation error is 0.0375.
4. Rounding 0.1 to the nearest four-bit fractional value gives 0.0010 binary, which equals 0.125 denary.
5. The rounding error is 0.025, so 0.125 is nearer to 0.1 than 0.0625.
<!-- stage10-explanations:end -->
