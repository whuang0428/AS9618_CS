# Lesson 005: Bitmap and vector graphics

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 1: Information representation<br>
**Syllabus requirements:** S1.08, S1.09<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S1.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.
- Show understanding of binary magnitudes and the difference between binary prefixes and decimal prefixes.


## 2. Knowledge explanation

### 1. A bitmap stores metadata plus a grid of pixels (S1.08)

**Concept relationships**

- **Header:** image metadata
- **Pixel:** one grid cell
- **Resolution:** width × height
- **Colour depth:** bits per pixel
- **Pixel bits:** width × height × depth
- **Screen:** display pixel grid

**Mechanism**

1. **Find the number of pixels** — Multiply image width by image height.
2. **Apply bits per pixel** — Multiply the pixel count by colour depth.
3. **Change bits to bytes** — Divide by 8 and add a header only when instructed.

**A mosaic with a label card:** The pixel grid is the mosaic; the header is the label card. A 100 × 80 image at 8 bits per pixel uses 64,000 pixel-data bits.

#### Colour depth: bits per pixel

![Colour depth: bits per pixel](../web/assets/diagrams/stage10-infographics/stage10-lesson-008-depth.jpg)

<details><summary>Text transcript</summary>

- 1-bit colour
- 2¹ = 2 possible colours. Useful for black/white examples.
- 4-bit colour
- 2⁴ = 16 possible colours.
- 8-bit colour
- 2⁸ = 256 possible colours.
- 24-bit colour
- 2²⁴ = 16 777 216 possible colours.
- Higher colour depth allows more possible colours, but it cannot add detail that is absent from the original image.

</details>

#### Bitmap file size formula

![Bitmap file size formula](../web/assets/diagrams/stage10-infographics/stage10-lesson-008-formula.jpg)

<details><summary>Text transcript</summary>

- file size in bits = width × height × colour depth
- file size in bytes = bits ÷ 8
- 100 × 80 × 8 = 64 000 bits = 8000 bytes

</details>

#### Bitmap file header and pixel data

![Bitmap file header and pixel data](../web/assets/diagrams/stage10-infographics/stage10-lesson-008-pixels.jpg)

<details><summary>Text transcript</summary>

- A bitmap file contains a file header and pixel data.
- The file header stores metadata needed to interpret the bitmap; it is not an image pixel.
- Pixel-data size is width x height x colour depth.
- When a question says to ignore the file header, do not add metadata bytes to the pixel-data calculation.

</details>

#### Resolution: width × height

![Resolution: width × height](../web/assets/diagrams/stage10-infographics/stage10-lesson-008-resolution.jpg)

<details><summary>Text transcript</summary>

- Pixel dimensions
- 100 × 80 means 100 pixels across and 80 pixels down.
- Total pixels: 100 × 80 = 8000.
- Quality effect
- Higher resolution can show more detail because more pixels are stored.
- It also increases file size if colour depth stays the same.
- Click pixels to toggle them. Each square is one stored picture element.

</details>

<details><summary>Precise syllabus wording</summary>

Show understanding of how data for a bitmapped image are encoded; perform calculations to estimate the file size for a bitmap image; show understanding of the effects of changing elements of a bitmap image on the image quality and file size.

Use and understand the terms pixel, file header, image resolution, screen resolution and colour depth/bit depth. Required effects concern image resolution and colour depth/bit depth.

</details>

### 2. A vector file stores drawing instructions (S1.09)

**Concept relationships**

- **Object:** shape or line
- **Properties:** size, colour, position
- **Drawing list:** ordered instructions
- **Redraw:** render at any scale
- **Bitmap:** fixed pixel grid

**Mechanism**

1. **Save objects and properties** — The file records how each object should be drawn.
2. **Follow the drawing list** — Software redraws the objects at the requested size.
3. **Match image to task** — Use vectors for scalable shapes and bitmaps for pixel-level detail.

**Recipe versus mosaic:** A vector logo is a recipe that can be cooked at any size; a bitmap photograph is a fixed mosaic of sampled colours.

#### Vector drawing list: objects, properties and redrawing

![Vector drawing list: objects, properties and redrawing](../web/assets/diagrams/stage10-infographics/stage10-lesson-010-drawing-list.jpg)

<details><summary>Text transcript</summary>

- A vector graphic stores a drawing list of drawing objects rather than a fixed grid of pixels.
- Each object stores properties such as type, coordinates, dimensions, line colour, fill colour and line thickness.
- Software follows the instructions to redraw the objects at the required size without pixelation.

</details>

<details><summary>Precise syllabus wording</summary>

Show understanding of vector-graphic encoding and justify bitmap or vector storage for a given task.

Use drawing object, property and drawing list; a justification must connect bitmap/vector characteristics to the stated application.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Use and understand the terms pixel, file header, image resolution, screen resolution and colour depth/bit depth. Required effects concern image resolution and colour depth/bit depth.
- Use drawing object, property and drawing list; a justification must connect bitmap/vector characteristics to the stated application.
- A bitmap file contains pixel data and a file header. The header stores metadata needed to interpret the file, such as its format and image properties; it is not one of the image pixels. When a calculation says to ignore the file header, calculate only width x height x colour depth.
- Image resolution is the number of pixels stored in the image, commonly width x height. Screen resolution is the number of physical display pixels available on the screen. They are independent: scaling an image on a screen does not create new captured detail.
- For an uncompressed bitmap, pixel-data size in bits is width in pixels x height in pixels x colour depth in bits per pixel. Divide by 8 to convert bits to bytes. Use the units requested by the question.
- Bitmap metadata is stored separately from pixel values, commonly in a file header. Add header or metadata bytes only when their size is supplied; when a question says to ignore the header, calculate pixel data only.
- Vector encoding stores a graphic as a drawing list of drawing objects. Each object has properties such as type, coordinates, dimensions, line colour, fill colour and line thickness; software redraws the objects from these instructions.
- Vectors scale without pixelation and suit logos, diagrams and shapes. Bitmaps store individual pixels and suit photographs or detailed textures. For a given application, the choice must be justified using the source image and intended editing or scaling.
- For a given application, justify bitmap or vector storage by connecting the image content and required editing or scaling to the chosen representation.

</details>

### Worked method

1. Calculate pixel data and then account for metadata
2. A 640 x 480 bitmap using 24-bit colour stores 640 x 480 x 24 = 7,372,800 bits = 921,600 bytes of pixel data.
3. With a supplied 54-byte header, the total is 921,654 bytes.

Beyond syllabus / 延伸知识（不要求背诵）: real file formats also store headers and metadata, so two files with the same visible content may still have different sizes.
## 3. Practice by question type

### Question 1 - foundation - explain - 4 marks

A designer creates a simple icon from circles and rectangles. Explain how it is stored as a vector graphic and give one advantage over a bitmap when resized.

**Answer:** stored as a drawing list / list of objects; stores object properties such as coordinates/dimensions/colour; software redraws objects from the descriptions; can be resized without pixelation / loss of shape quality

**Marking guidance:** Do not accept 'vector has better quality' unless scalability or object-based storage is explained.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - calculate - 4 marks

A 200 by 100 bitmap uses 24-bit colour. Calculate its pixel-data size in bytes, ignoring the file header, and explain what has been excluded.

**Answer:** 200 x 100 x 24 bits; 480,000 bits / 60,000 bytes; file header contains metadata used to interpret the bitmap; header data is excluded because the question requests pixel data only

**Marking guidance:** Do not treat the file header as a pixel or silently add an invented header size.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - identify - 2 marks

Identify two properties stored for a vector object.

**Answer:** Any two of coordinates, dimensions, fill, line colour or line thickness.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/13/S/25 Q1(ii) | 4 | calculate | calculate |
| 9618/13/W/25 Q7(d) | 4 | calculate | calculate |
| 9618/11/S/25 Q3(a) | 3 | complete | recall |
| 9618/13/W/25 Q7(c) | 3 | calculate | calculate |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define bitmap and vector graphics with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For bitmap and vector graphics, use the exact technical term before applying it to the scenario.
