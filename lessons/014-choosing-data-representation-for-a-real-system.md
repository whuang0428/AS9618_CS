# Lesson 014: Choosing data representation for a real system

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the method or choice involved in **Choosing data representation for a real system**.
2. Apply the method to a given data set and show each stage of the result.
3. Explain a limitation or suitability decision using the stated context.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Write `AAAAAABBBBCCCCCCCC` and ask students to suggest a shorter representation. Then show a string with few repeated characters and ask why the same method is less effective.

Focus question: Which feature distinguishes **Choosing data representation for a real system** from the most closely related syllabus concept?

## Guided Explanation
Begin with repeated data, then formalise why Choosing data representation for a real system reduces storage. Compare the original and compressed forms, calculate a compression ratio, and discuss when the technique helps or harms. End by linking the choice to images, sound, backups or web transfer.

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
- Answer one 4-mark question about **Choosing data representation for a real system**. Follow its command word and apply each point to the stated context.

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

### System cases

- **Explains:** `cases`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-014-cases.jpg`

1. Multilingual chat app
2. Use Unicode so messages can include characters from many languages.
3. Sensor logger
4. Use enough bits and signed representation if values may be negative.
5. Website thumbnail
6. Lower resolution and lossy compression may be acceptable to reduce transfer time.
7. Legal archive
8. Use lossless compression because exact reconstruction is required.

### A decision framework

- **Explains:** `framework`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-014-framework.jpg`

1. 1. What data?
2. Integer, signed value, text, image, sound or repeated data.
3. 2. What range?
4. Check minimum, maximum, precision and whether negative values are possible.
5. 3. What quality?
6. Choose resolution, colour depth, sample rate or sampling resolution only as high as needed.
7. 4. What constraints?
8. Storage, bandwidth, compatibility, exact reconstruction and processing cost.

### Useful trade-off sentences

- **Explains:** `tradeoffs`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-014-tradeoffs.jpg`

1. Higher image resolution or colour depth can improve image quality and increases image file size.
2. Higher sample rate or sample resolution can improve sound accuracy and increases audio file size.
3. Use an audio or neutral data-file symbol for sound data, not an image-file thumbnail.
<!-- stage10-explanations:end -->
