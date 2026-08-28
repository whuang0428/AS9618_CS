# Lesson 009: Vector graphics and drawing lists

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Vector graphics and drawing lists

### Direct explanation

- Vector encoding stores a graphic as a drawing list of drawing objects. Each object has properties such as type, coordinates, dimensions, line colour, fill colour and line thickness; software redraws the objects from these instructions.
- Vectors scale without pixelation and suit logos, diagrams and shapes. Bitmaps store individual pixels and suit photographs or detailed textures. For a given application, the choice must be justified using the source image and intended editing or scaling.
- For a given application, justify bitmap or vector storage by connecting the image content and required editing or scaling to the chosen representation.

### Worked example

**Store a red circle:** A drawing-list entry could record object = circle, centre = (80, 60), radius = 20, fill = red and outline = black. Enlarging it changes the geometry before redrawing, not a grid of stored pixels.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Identify two properties stored for a vector object.
   **Answer:** Any two of coordinates, dimensions, fill, line colour or line thickness.
2. Suggest vector or bitmap for a company logo that must appear on a pen and a billboard.
   **Answer:** Vector, because geometric objects can be scaled without pixelation.
3. Why is bitmap normally better for a photograph?
   **Answer:** A photograph contains complex per-pixel colour and texture that is inefficient to describe as drawing objects.

### Exam-style question and MS

**Question (4 marks):** A designer creates a simple icon from circles and rectangles. Explain how it is stored as a vector graphic and give one advantage over a bitmap when resized.

| Answer | Guidance | Marks |
|---|---|---:|
| stored as a drawing list / list of objects | Do not accept 'vector has better quality' unless scalability or object-based storage is explained. | 1 |
| stores object properties such as coordinates/dimensions/colour |  | 1 |
| software redraws objects from the descriptions |  | 1 |
| can be resized without pixelation / loss of shape quality |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe how data is represented in **Image file size calculations and metadata**.
2. Calculate a storage requirement from the stated parameters and units.
3. Explain how changing one parameter affects quality and storage requirements.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Focus question: Which feature distinguishes **Image file size calculations and metadata** from the most closely related syllabus concept?

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
- Answer one 4-mark question about **Image file size calculations and metadata**. Follow its command word and apply each point to the stated context.

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

### The calculation chain

- **Explains:** `chain`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-009-chain.jpg`

1. 1. Pixels
2. width × height
3. pixels × colour depth
4. 3. Bytes
5. bits ÷ 8
6. 4. Metadata
7. add only if the question includes it
8. 100 × 80 × 8 = 64 000 bits = 8000 bytes

### Metadata is data about the image, not the pixels themselves

- **Explains:** `metadata`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-009-metadata.jpg`

1. Examples
2. Width, height, colour depth, file type, date created, camera model, location data or thumbnail data.
3. Metadata helps software interpret, organise, search or display the image correctly.
4. Calculation rule
5. Add metadata size only when the question gives it and asks for total file size.
6. Exam wording matters: “ignore metadata” means pixel data only.

### Units: do not trip at the finish line

- **Explains:** `units`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-009-units.jpg`

1. When a formula gives a size in bits, divide by 8 to convert to bytes.
2. When binary units are required, divide bytes by 1024 for KiB and continue by factors of 1024.
3. A quantity may already be supplied in bytes or a larger unit; not every measurement starts as bits.
<!-- stage10-explanations:end -->
