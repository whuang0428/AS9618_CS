# Lesson 008: Bitmap images: pixels, resolution, and colour depth

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

<!-- stage2-completion:start -->
## Stage 2 syllabus completion

**Official audit rows:** S1.08
**Focus:** Image resolution and screen resolution

### Direct explanation

- Image resolution is the number of pixels stored in the image, commonly width x height. Screen resolution is the number of physical display pixels available on the screen.
- They are independent. A high-resolution image shown in a small area may be scaled down; a low-resolution image enlarged across a high-resolution screen may appear pixelated. More image pixels increase uncompressed bitmap size when colour depth is unchanged.

### Worked example

**800 x 600 image on a 1920 x 1080 screen:** The file stores 480,000 image pixels. The screen contains 2,073,600 display pixels. Showing the image at 1600 x 1200 requires scaling; it does not create new captured detail.

### Targeted practice and answers

1. What does 3840 x 2160 describe for a monitor?
   **Answer:** Its screen resolution: the number of physical display pixels.
2. Does a higher screen resolution automatically increase an image file's size?
   **Answer:** No. File size depends on stored image data, not the screen used to view it.
3. Why can a 200 x 100 image look pixelated when enlarged?
   **Answer:** The same limited image pixels are spread over more screen pixels; no extra detail is stored.

### Exam-style question and MS

**Question (4 marks):** Distinguish image resolution from screen resolution and explain why increasing image resolution can increase bitmap file size.

- **B1** image resolution is the number/dimensions of pixels stored in the image
- **B1** screen resolution is the number/dimensions of physical pixels on the display
- **B1** more image pixels must be stored
- **B1** therefore more bits are required when colour depth is unchanged

**Strict note:** Do not accept 'resolution means quality' without identifying which pixels are being counted.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Colour depth: bits per pixel

- **Explains:** `depth`
- **Explanation type:** mechanism
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-formula.jpg`

1. file size in bits = width × height × colour depth
2. file size in bytes = bits ÷ 8
3. 100 × 80 × 8 = 64 000 bits = 8000 bytes

### Bitmap images are pixel grids

- **Explains:** `pixels`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-pixels.jpg`

1. An image represented as a grid of pixels, where each pixel has a stored colour value.
2. The smallest addressable picture element in a bitmap image.
3. Metadata
4. Extra data about the file, such as dimensions or format. Exam calculations often say to ignore it.

### Resolution: width × height

- **Explains:** `resolution`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-008-resolution.jpg`

1. Pixel dimensions
2. 100 × 80 means 100 pixels across and 80 pixels down.
3. Total pixels: 100 × 80 = 8000.
4. Quality effect
5. Higher resolution can show more detail because more pixels are stored.
6. It also increases file size if colour depth stays the same.
7. Click pixels to toggle them. Each square is one stored picture element.
<!-- stage10-explanations:end -->
