# Lesson 007: Character sets and internal binary character data

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Character sets and internal binary character data

### Direct explanation

- A character set defines a collection of characters and assigns a numeric character code to each one. The code is stored internally in binary; the bit pattern is meaningful only when software interprets it using the agreed character set.
- Standard ASCII uses 7-bit codes, extended ASCII uses 8-bit codes, and Unicode provides code points for a much wider range of languages and symbols. Candidates are not expected to memorise particular character codes; a question must provide any code value needed for a conversion.

### Worked example

**Choose a character set for worldwide text:** A messaging system containing English, Chinese and Arabic text needs Unicode because its character repertoire is much wider than ASCII or extended ASCII. The chosen Unicode encoding stores the character codes as binary data.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What does a character set assign to each character?
   **Answer:** A numeric character code that can be stored in binary.
2. Compare standard ASCII from extended ASCII.
   **Answer:** Standard ASCII uses 7 bits/128 codes; extended ASCII uses 8 bits/256 codes.
3. Why is Unicode suitable for multilingual text?
   **Answer:** It defines codes for characters from far more languages and symbol systems.
4. Must candidates memorise particular ASCII codes?
   **Answer:** No; any required code value should be provided.

### Exam-style question and MS

**Question (4 marks):** Explain how the character 'A' is represented internally and why Unicode is preferred to ASCII for a multilingual website.

| Answer | Guidance | Marks |
|---|---|---:|
| character set assigns A a numeric code | Do not accept that changing a font changes the stored character code. | 1 |
| numeric code is stored as a binary bit pattern |  | 1 |
| Unicode represents a much wider range of characters/languages |  | 1 |
| applies the wider repertoire to the multilingual website |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe how data is represented in **Character sets: ASCII, Unicode and emoji representation**.
2. Calculate a storage requirement from the stated parameters and units.
3. Explain how changing one parameter affects quality and storage requirements.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Focus question: Which feature distinguishes **Character sets: ASCII, Unicode and emoji representation** from the most closely related syllabus concept?

## Guided Explanation
Move from human perception to stored data: identify the sample, pixel or character; define the metadata that describes it; calculate the storage requirement; then ask what quality is lost or gained when one parameter changes. Keep returning to the chain: representation rule -> stored bits -> user experience.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: physical media idea. Middle: formula or encoding table. Right: quality/storage trade-off sentence frames.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A worldwide messaging app must store English, Chinese and emoji characters. Explain why Unicode is more suitable than ASCII.

**Worked answer / marking focus:** Unicode provides code points for a much larger repertoire of scripts and symbols, whereas ASCII represents only a small character set. Credit the wider character repertoire; do not claim that every Unicode character always uses the same number of bits.

## Student Task
Students compare the characters available in ASCII with a small set of multilingual and emoji examples, then explain why an agreed encoding is needed to interpret stored bit patterns.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Character sets: ASCII, Unicode and emoji representation**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### ASCII and extended ASCII

- **Explains:** `ascii`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-007-ascii.jpg`

1. Standard ASCII
2. Uses 7 bits, so it can represent 2⁷ = 128 possible codes.
3. It covers common English letters, digits, punctuation and control characters.
4. Extended ASCII
5. Uses 8 bits, so it can represent 2⁸ = 256 possible codes.
6. It adds extra characters, but still cannot cover the world’s writing systems.
7. Character
8. Denary code
9. 8-bit binary
10. Exam note
11. 01000001
12. Example only; no need to memorise.

### What a character set actually does

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-007-concept.jpg`

1. Character
2. Character set
3. A defined collection of characters and the code assigned to each character.
4. Character code
5. The numeric value used to represent a character inside the computer.
6. Binary storage
7. The numeric code is stored using bits, for example 65₁₀ = 01000001₂.

### Character set vs encoding

- **Explains:** `encoding`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-007-encoding.jpg`

1. Character set
2. Defines the characters and their code points or code values.
3. Example idea: A has a defined code in ASCII and Unicode.
4. Encoding
5. Defines how those codes are stored as bytes.
6. For AS exam answers, keep this distinction simple unless the question gives a specific encoding.
7. A good exam sentence: “Unicode can represent a wider range of characters, so it is more suitable for multilingual text.”

### Unicode: more characters, more global use

- **Explains:** `unicode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-007-unicode.jpg`

1. Unicode is designed to represent characters from many languages and symbol systems.
2. Unicode supports far more characters than ASCII, including Chinese characters and many symbols.
3. Trade-off
4. More possible characters may require more bits per character, depending on the encoding used.
5. Emoji are characters assigned Unicode code points and rendered by software using available fonts or graphics.
<!-- stage10-explanations:end -->
