# Lesson 012: Compression: lossless vs lossy

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 1  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Compression: lossless vs lossy** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `AAAAAABBBBCCCCCCCC` and ask students to compress it faster than a tired messaging app. Then show a random-looking string and ask why the same trick struggles.

Lesson-specific focus question: What would go wrong if a student confused **Compression: lossless vs lossy** with a neighbouring syllabus idea?

## Guided Explanation
Begin with repeated data, then formalise why Compression: lossless vs lossy reduces storage. Compare the original and compressed forms, calculate a compression ratio, and discuss when the technique helps or harms. End by linking the choice to images, sound, backups or web transfer.

Topic-specific teaching move: keep the explanation anchored to **Compression: lossless vs lossy**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Compress a short run of repeated characters and calculate the number of saved characters or bytes. The worked example must explicitly use **Compression: lossless vs lossy**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit the encoded form and the comparison with the original size. For lossy/lossless questions, the answer must state whether exact reconstruction is possible.



## Student Task
Groups receive three mini-files: repeated text, a photo description and a music clip. They choose lossless or lossy compression and defend the decision. Their final answer must include the phrase **Compression: lossless vs lossy** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Compression: lossless vs lossy**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Compression: lossless vs lossy** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Compression: lossless vs lossy** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often assume compression always makes a file smaller. Correction: compression has overhead and depends on patterns in the data. For this lesson, make students contrast that mistake with the exact idea of **compression: lossless vs lossy**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Lossless compression: exact reconstruction

- **Explains:** `lossless`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-012-lossless.jpg`

1. Definition
2. Lossless compression reduces file size while allowing the original data to be restored exactly.
3. Suitable uses
4. Text files, program files, spreadsheets, databases, medical records and backups.
5. If one changed bit could change meaning or break the file, lossless is the safer answer.

### Lossy compression: smaller, but not exact

- **Explains:** `lossy`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-012-lossy.jpg`

1. Definition
2. Lossy compression reduces file size by permanently removing some data.
3. Suitable uses
4. Images, video and sound where small quality loss may be acceptable.
5. Lossy is not suitable when exact reconstruction is required.

### Why compress data?

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-012-purpose.jpg`

1. Less storage
2. Smaller files use less disk or memory space.
3. Faster transfer
4. Smaller files need less bandwidth and may download or upload faster.
5. Trade-off
6. Compression and decompression may require processing time.

### Compression ratio and saved space

- **Explains:** `ratio`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-012-ratio.jpg`

1. compression ratio = original size : compressed size
2. percentage saved = ((original - compressed) ÷ original) × 100
3. Example: 1000 KB → 250 KB gives ratio 4:1 and 75% saved.
<!-- stage10-explanations:end -->
