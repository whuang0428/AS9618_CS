# Lesson 013: Run-length encoding and dictionary-style compression

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Run-length encoding and dictionary-style compression** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `AAAAAABBBBCCCCCCCC` and ask students to compress it faster than a tired messaging app. Then show a random-looking string and ask why the same trick struggles.

Lesson-specific focus question: What would go wrong if a student confused **Run-length encoding and dictionary-style compression** with a neighbouring syllabus idea?

## Guided Explanation
Begin with repeated data, then formalise why Run-length encoding and dictionary-style compression reduces storage. Compare the original and compressed forms, calculate a compression ratio, and discuss when the technique helps or harms. End by linking the choice to images, sound, backups or web transfer.

Topic-specific teaching move: keep the explanation anchored to **Run-length encoding and dictionary-style compression**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: original data. Middle: compressed representation and ratio. Right: lossless/lossy decision table.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Compress a short run of repeated characters and calculate the number of saved characters or bytes. The worked example must explicitly use **Run-length encoding and dictionary-style compression**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit the encoded form and the comparison with the original size. For lossy/lossless questions, the answer must state whether exact reconstruction is possible.



## Student Task
Groups receive three mini-files: repeated text, a photo description and a music clip. They choose lossless or lossy compression and defend the decision. Their final answer must include the phrase **Run-length encoding and dictionary-style compression** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Run-length encoding and dictionary-style compression**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Run-length encoding and dictionary-style compression** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Run-length encoding and dictionary-style compression** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often assume compression always makes a file smaller. Correction: compression has overhead and depends on patterns in the data. For this lesson, make students contrast that mistake with the exact idea of **run-length encoding and dictionary-style compression**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Dictionary-style compression

- **Explains:** `dictionary`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-dictionary.jpg`

1. Find repeated patterns and store them once in a dictionary.
2. Reference
3. Replace later occurrences with a shorter code or pointer to the dictionary entry.
4. COMPUTER COMPUTER COMPUTER can store COMPUTER once, then use references.
5. Dictionary #1 = COMPUTER
6. Compressed form #1 #1 #1
7. Decoded form COMPUTER COMPUTER COMPUTER

### When does it help?

- **Explains:** `effectiveness`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-effectiveness.jpg`

1. RLE helps
2. Long repeated runs, simple graphics, repeated pixels or repeated characters.
3. RLE struggles
4. Alternating or random-looking data with very short runs.
5. Dictionary helps
6. Repeated words, phrases, byte patterns or sequences across the file.
7. Both methods are lossless if the dictionary and encoded data allow exact reconstruction.

### Run-length encoding

- **Explains:** `rle`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-rle.jpg`

1. Encoding rule
2. Replace each consecutive run with count + value.
3. AAAAAABBBBCCCCCCCC → 6A4B8C
4. Decoding rule
5. Expand each count and value back into repeated data.
6. 3A2B1C → AAABBC
<!-- stage10-explanations:end -->
