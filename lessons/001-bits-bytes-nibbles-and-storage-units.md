# Lesson 001: Bits, bytes, nibbles and storage units

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Bits, bytes, nibbles and storage units** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `00000111` on the board and ask: Is this a number, a colour value, a character code, or just eight dramatic zeros and ones? Let students argue before revealing that representation gives the bits meaning.

Lesson-specific focus question: What would go wrong if a student confused **Bits, bytes, nibbles and storage units** with a neighbouring syllabus idea?

## Guided Explanation
Start with place value in denary, then rebuild the same idea in base 2 or base 16. Model one conversion slowly, annotate every carry/grouping step, then remove the scaffolding and let students predict the next step. Finish by connecting Bits, bytes, nibbles and storage units to file sizes, memory addresses, or exam calculation marks.

Topic-specific teaching move: keep the explanation anchored to **Bits, bytes, nibbles and storage units**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A small icon uses 2048 bits. Convert this into bytes, nibbles and KiB where appropriate. Then explain why confusing bit and byte would make a file-size answer eight times wrong. The worked example must explicitly use **Bits, bytes, nibbles and storage units**, not a generic example from the wider unit.

**Worked answer / marking focus:** `2048 bits / 8 = 256 bytes`; `2048 bits / 4 = 512 nibbles`; `256 bytes = 0.25 KiB` if using 1024 bytes per KiB. Mark the unit conversion and the explanation that 1 byte = 8 bits.



## Student Task
Students build a storage ladder from bit -> nibble -> byte -> KiB -> MiB, then create two exam traps: one using decimal place-value thinking and one confusing bits with bytes. Their final answer must include the phrase **Bits, bytes, nibbles and storage units** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Bits, bytes, nibbles and storage units**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Bits, bytes, nibbles and storage units** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Bits, bytes, nibbles and storage units** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat binary digits as decoration. Correction: every bit position has a value; if the position changes, the value changes. For this lesson, make students contrast that mistake with the exact idea of **bits, bytes, nibbles and storage units**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S1.01
**Focus:** Binary and decimal magnitude prefixes

### Direct explanation

- Binary prefixes use powers of 1024: 1 KiB = 2^10 bytes, 1 MiB = 2^20 bytes, 1 GiB = 2^30 bytes and 1 TiB = 2^40 bytes.
- Decimal prefixes use powers of 1000: 1 kB = 10^3 bytes, 1 MB = 10^6 bytes, 1 GB = 10^9 bytes and 1 TB = 10^12 bytes. Case and the i in KiB/MiB/GiB/TiB carry meaning.

### Worked example

**2 TiB drive:** 2 TiB = 2 x 2^40 = 2,199,023,255,552 bytes. A 2 TB drive is 2,000,000,000,000 bytes, so the labels are not interchangeable.

### Targeted practice and answers

1. How many bytes are in 4 GiB?
   **Answer:** 4 x 2^30 = 4,294,967,296 bytes.
2. Which is larger, 1 TB or 1 TiB?
   **Answer:** 1 TiB, because 2^40 is greater than 10^12.
3. Convert 3,000,000 bytes to MB.
   **Answer:** 3 MB using the decimal prefix mega.

### Exam-style question and MS

**Question (4 marks):** State the number of bytes represented by 1 GiB and explain why 1 GB represents a different number of bytes.

- **B1** 1 GiB = 2^30 bytes / 1,073,741,824 bytes
- **B1** gibi uses a binary power / multiples of 1024
- **B1** 1 GB = 10^9 bytes / 1,000,000,000 bytes
- **B1** giga uses a decimal power / multiples of 1000

**Strict note:** Do not accept 'GiB is bigger' without both numerical definitions.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### The storage ladder

- **Explains:** `knowledge`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-001-knowledge.jpg`

1. bit 0 or 1
2. nibble 4 bits
3. byte 8 bits = 2 nibbles
4. KiB 1024 bytes
5. MiB 1024 KiB
6. GiB 1024 MiB
7. TiB 1024 GiB
<!-- stage10-explanations:end -->
