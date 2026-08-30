# Lesson 013: Compression methods for text, bitmap, vector and sound files

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Compression methods for text, bitmap, vector and sound files

### Direct explanation

- Compression represents a file using fewer bits. Lossless compression must reconstruct every original bit, so it is required where any change would alter meaning, such as program source or exact text. Lossy compression permanently discards selected detail and is suitable only when the resulting quality remains acceptable for the purpose.
- Text can be compressed losslessly by run-length encoding repeated characters or by replacing repeated words/strings with shorter dictionary references. Bitmap data can use run-length encoding when adjacent pixels repeat; lossy bitmap compression may reduce colour precision or discard fine spatial detail. RLE is effective only when the runs save more space than their symbol-count representation.
- A vector file stores drawing objects rather than pixels. It can be compressed losslessly by storing repeated shapes or properties once and referring to them, and by removing redundant object descriptions. Sound can use lossless pattern coding when exact samples are required, or lossy perceptual coding that removes less-audible sound information; reducing sample rate or sampling resolution also reduces data but changes the recording.
- Method choice depends on file type, repetition, required fidelity and use. A valid justification must connect the chosen method to what may or may not be discarded; naming 'lossy' or 'lossless' alone is not enough.

### Worked example

**Choose methods for four files:** Compress repeated spaces in a text log with RLE or a dictionary without changing the characters; compress a flat-colour bitmap logo with pixel-value RLE; store one repeated vector shape once and reference it; use lossless sound compression for an evidential recording, but perceptual lossy coding may suit streamed music when smaller size is worth a controlled quality loss.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why must program source code use lossless compression?
   **Answer:** Every character must be reconstructed exactly; a discarded or changed character can alter syntax or behaviour.
2. When is RLE effective for a bitmap?
   **Answer:** When many adjacent pixels have the same value, so symbol-count pairs use fewer bits than storing each pixel separately.
3. How can repeated objects in a vector file be compressed?
   **Answer:** Store the repeated shape/properties once and use shorter references for each occurrence.
4. Give one lossy method for sound and its trade-off.
   **Answer:** Remove less-audible frequency/detail information, or reduce sample rate/resolution; the file is smaller but the discarded detail cannot be recovered.

### Exam-style question and MS

**Question (6 marks):** For each of text, bitmap, vector and sound data, describe one suitable compression method and state whether it preserves the original data exactly.

| Answer | Guidance | Marks |
|---|---|---:|
| text: lossless RLE or dictionary/token substitution with exact reconstruction | Do not award generic 'make the file smaller' statements without a method tied to the named media type. | 1 |
| bitmap: RLE for repeated adjacent pixel values, or a valid lossy image method identified as non-exact |  | 1 |
| vector: stores repeated objects/properties once and uses references / removes redundant descriptions, losslessly |  | 1 |
| sound: lossless pattern coding for exact samples or perceptual lossy coding that removes less-audible detail |  | 1 |
| distinguishes exact lossless reconstruction from irreversible lossy removal |  | 1 |
| links at least one method to repetition, fidelity or intended use |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the method or choice involved in **Compression: lossless vs lossy**.
2. Apply the method to a given data set and show each stage of the result.
3. Explain a limitation or suitability decision using the stated context.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `AAAAAABBBBCCCCCCCC` and ask students to suggest a shorter representation. Then show a string with few repeated characters and ask why the same method is less effective.

Focus question: Which feature distinguishes **Compression: lossless vs lossy** from the most closely related syllabus concept?

## Guided Explanation
Begin with repeated data, then formalise why Compression: lossless vs lossy reduces storage. Compare the original and compressed forms, calculate a compression ratio, and discuss when the technique helps or harms. End by linking the choice to images, sound, backups or web transfer.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: original data. Middle: compressed representation and ratio. Right: lossless/lossy decision table.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Compress a short run of repeated characters and calculate the number of saved characters or bytes.

**Worked answer / marking focus:** Credit the encoded form and the comparison with the original size. For lossy/lossless questions, the answer must state whether exact reconstruction is possible.

## Student Task
Groups receive three mini-files: repeated text, a photo description and a music clip. They choose lossless or lossy compression and defend the decision.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Compression: lossless vs lossy**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often assume compression always makes a file smaller. Correction: compression has overhead and depends on patterns in the data.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Lossless compression: exact reconstruction

- **Explains:** `lossless`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-lossless.jpg`

1. Definition
2. Lossless compression reduces file size while allowing the original data to be restored exactly.
3. Suitable uses
4. Text files, program files, spreadsheets, databases, medical records and backups.
5. If one changed bit could change meaning or break the file, lossless is the safer answer.

### Lossy compression: smaller, but not exact

- **Explains:** `lossy`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-lossy.jpg`

1. Definition
2. Lossy compression reduces file size by permanently removing some data.
3. Suitable uses
4. Images, video and sound where small quality loss may be acceptable.
5. Lossy is not suitable when exact reconstruction is required.

### Why compress data?

- **Explains:** `purpose`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-purpose.jpg`

1. Less storage
2. Smaller files use less disk or memory space.
3. Faster transfer
4. Smaller files need less bandwidth and may download or upload faster.
5. Trade-off
6. Compression and decompression may require processing time.

### Compression ratio and saved space

- **Explains:** `ratio`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-013-ratio.jpg`

1. compression ratio = original size : compressed size
2. percentage saved = ((original - compressed) ÷ original) × 100
3. Example: 1000 KB → 250 KB gives ratio 4:1 and 75% saved.
<!-- stage10-explanations:end -->
