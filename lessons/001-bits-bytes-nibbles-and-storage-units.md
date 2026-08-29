# Lesson 001: Bits, bytes, nibbles and storage units

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Binary and decimal magnitude prefixes

### Direct explanation

- Binary prefixes use powers of 1024: kibi (Ki) means 2^10, mebi (Mi) means 2^20, gibi (Gi) means 2^30 and tebi (Ti) means 2^40. Therefore 1 KiB = 1024 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
- Decimal prefixes use powers of 1000: kilo (k) means 10^3, mega (M) means 10^6, giga (G) means 10^9 and tera (T) means 10^12. Therefore 1 kB = 1000 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning.

### Worked example

**2 TiB drive:** 2 TiB = 2 x 2^40 = 2,199,023,255,552 bytes. A 2 TB drive is 2,000,000,000,000 bytes, so the labels are not interchangeable.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. How many bytes are in 4 GiB?
   **Answer:** 4 x 2^30 = 4,294,967,296 bytes.
2. Which is larger, 1 TB or 1 TiB?
   **Answer:** 1 TiB, because 2^40 is greater than 10^12.
3. Draw lines to match kibi, mebi, gibi and tebi to Ki, Mi, Gi and Ti.
   **Answer:** kibi = Ki, mebi = Mi, gibi = Gi and tebi = Ti.
4. Convert 3,000,000 bytes to MB.
   **Answer:** 3 MB using the decimal prefix mega; kilo, mega, giga and tera use powers of 1000.

### Exam-style question and MS

**Question (4 marks):** State the number of bytes represented by 1 GiB and explain why 1 GB represents a different number of bytes.

| Answer | Guidance | Marks |
|---|---|---:|
| 1 GiB = 2^30 bytes / 1,073,741,824 bytes | Do not accept 'GiB is bigger' without both numerical definitions. | 1 |
| gibi uses a binary power / multiples of 1024 |  | 1 |
| 1 GB = 10^9 bytes / 1,000,000,000 bytes |  | 1 |
| giga uses a decimal power / multiples of 1000 |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Represent and convert values using the conventions relevant to **Bits, bytes, nibbles and storage units**.
2. Show each stage of a calculation and give the result in the required representation and unit.
3. Identify an incorrect method and explain how it changes the result.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00000111` on the board. Ask whether it represents a number, colour value or character code. Establish that the representation rule gives the bit pattern its meaning.

Focus question: Which feature distinguishes **Bits, bytes, nibbles and storage units** from the most closely related syllabus concept?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Bits, bytes, nibbles and storage units to file sizes, memory addresses, or exam calculation marks.

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
**Problem:** A small icon uses 2048 bits. Convert this into bytes, nibbles and KiB where appropriate. Then explain why confusing bit and byte would make a file-size answer eight times wrong.

**Worked answer / marking focus:** `2048 bits / 8 = 256 bytes`; `2048 bits / 4 = 512 nibbles`; `256 bytes = 0.25 KiB` if using 1024 bytes per KiB. Mark the unit conversion and the explanation that 1 byte = 8 bits.

## Student Task
Students build a storage ladder from bit to nibble, byte, KiB and MiB, then correct one example that uses decimal place-value thinking and one that confuses bits with bytes.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Bits, bytes, nibbles and storage units**. Follow its command word and apply each point to the stated context.

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

### The storage ladder

- **Explains:** `knowledge`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-001-knowledge.jpg`

1. bit 0 or 1
2. nibble 4 bits
3. byte 8 bits = 2 nibbles
4. KiB 1024 bytes
5. MiB 1024 KiB
6. GiB 1024 MiB
7. TiB 1024 GiB
<!-- stage10-explanations:end -->
