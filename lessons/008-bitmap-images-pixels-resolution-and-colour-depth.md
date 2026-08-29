# Lesson 008: Bitmap images: pixels, resolution and colour depth

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Bitmap file headers, image resolution and screen resolution

### Direct explanation

- A bitmap file contains pixel data and a file header. The header stores metadata needed to interpret the file, such as its format and image properties; it is not one of the image pixels. When a calculation says to ignore the file header, calculate only width x height x colour depth.
- Image resolution is the number of pixels stored in the image, commonly width x height. Screen resolution is the number of physical display pixels available on the screen. They are independent: scaling an image on a screen does not create new captured detail.

### Worked example

**100 x 80 bitmap with an ignored header:** The pixel data is 100 x 80 x 8 = 64,000 bits = 8,000 bytes. Because the question says to ignore the file header, no metadata bytes are added to that total.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What is the purpose of a bitmap file header?
   **Answer:** It stores metadata that tells software how to interpret the file; it is separate from the pixel data.
2. What does 3840 x 2160 describe for a monitor?
   **Answer:** Its screen resolution: the number of physical display pixels.
3. Does a higher screen resolution automatically increase an image file's size?
   **Answer:** No. File size depends on stored image data, not the screen used to view it.

### Exam-style question and MS

**Question (4 marks):** A 200 by 100 bitmap uses 24-bit colour. Calculate its pixel-data size in bytes, ignoring the file header, and explain what has been excluded.

| Answer | Guidance | Marks |
|---|---|---:|
| 200 x 100 x 24 bits | Do not treat the file header as a pixel or silently add an invented header size. | 1 |
| 480,000 bits / 60,000 bytes |  | 1 |
| file header contains metadata used to interpret the bitmap |  | 1 |
| header data is excluded because the question requests pixel data only |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe how data is represented in **Bitmap images: pixels, resolution, and colour depth**.
2. Calculate a storage requirement from the stated parameters and units.
3. Explain how changing one parameter affects quality and storage requirements.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Focus question: Which feature distinguishes **Bitmap images: pixels, resolution, and colour depth** from the most closely related syllabus concept?

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
**Problem:** Calculate the size of a 100 by 80 pixel bitmap using 8-bit colour depth, ignoring metadata.

**Worked answer / marking focus:** `100 * 80 * 8 = 64 000 bits = 8000 bytes`. Credit dimensions, colour depth and bit-to-byte conversion.

## Student Task
Students change one parameter at a time: width, height and colour depth. They predict which change doubles the file size.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Bitmap images: pixels, resolution, and colour depth**. Follow its command word and apply each point to the stated context.

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

### Colour depth: bits per pixel

- **Explains:** `depth`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-depth.jpg`

1. 1-bit colour
2. 2¹ = 2 possible colours. Useful for black/white examples.
3. 4-bit colour
4. 2⁴ = 16 possible colours.
5. 8-bit colour
6. 2⁸ = 256 possible colours.
7. 24-bit colour
8. 2²⁴ = 16 777 216 possible colours.
9. Higher colour depth allows more possible colours, but it cannot add detail that is absent from the original image.

### Bitmap file size formula

- **Explains:** `formula`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-formula.jpg`

1. file size in bits = width × height × colour depth
2. file size in bytes = bits ÷ 8
3. 100 × 80 × 8 = 64 000 bits = 8000 bytes

### Bitmap file header and pixel data

- **Explains:** `pixels`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-pixels.jpg`

1. A bitmap file contains a file header and pixel data.
2. The file header stores metadata needed to interpret the bitmap; it is not an image pixel.
3. Pixel-data size is width x height x colour depth.
4. When a question says to ignore the file header, do not add metadata bytes to the pixel-data calculation.

### Resolution: width × height

- **Explains:** `resolution`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-resolution.jpg`

1. Pixel dimensions
2. 100 × 80 means 100 pixels across and 80 pixels down.
3. Total pixels: 100 × 80 = 8000.
4. Quality effect
5. Higher resolution can show more detail because more pixels are stored.
6. It also increases file size if colour depth stays the same.
7. Click pixels to toggle them. Each square is one stored picture element.
<!-- stage10-explanations:end -->
