# Lesson 009: Image file size calculations and metadata

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 1
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Image file size calculations and metadata** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- binary 二进制, denary 十进制, hexadecimal 十六进制, overflow 溢出, compression 压缩

## Warm-Up Hook
Show a pixelated icon or describe a 3-second audio clip and ask: If the computer cannot see or hear, what exactly is it storing? The useful answer is not 'the picture'; it is numbers with rules.

Lesson-specific focus question: What would go wrong if a student confused **Image file size calculations and metadata** with a neighbouring syllabus idea?

## Guided Explanation
Move from human perception to stored data: identify the sample, pixel or character; define the metadata that describes it; calculate the storage requirement; then ask what quality is lost or gained when one parameter changes. Keep returning to the chain: representation rule -> stored bits -> user experience.

Topic-specific teaching move: keep the explanation anchored to **Image file size calculations and metadata**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: physical media idea. Middle: formula or encoding table. Right: quality/storage trade-off sentence frames.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Calculate the size of a 100 by 80 pixel bitmap using 8-bit colour depth, ignoring metadata. The worked example must explicitly use **Image file size calculations and metadata**, not a generic example from the wider unit.

**Worked answer / marking focus:** `100 * 80 * 8 = 64 000 bits = 8000 bytes`. Credit dimensions, colour depth and bit-to-byte conversion.



## Student Task
Students change one parameter at a time: width, height and colour depth. They predict which change doubles the file size. Their final answer must include the phrase **Image file size calculations and metadata** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Image file size calculations and metadata**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Image file size calculations and metadata** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Image file size calculations and metadata** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 1.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often say 'higher quality is always better'. Correction: higher quality can be wasteful if storage, bandwidth or purpose does not justify it. For this lesson, make students contrast that mistake with the exact idea of **image file size calculations and metadata**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S1.09
**Focus:** Vector graphics and drawing lists

### Direct explanation

- A vector graphic is stored as a drawing list of objects. Each object has properties such as type, coordinates, dimensions, line colour, fill colour and line thickness; software redraws the objects from these instructions.
- Vectors scale without pixelation and suit logos, diagrams and shapes. Bitmaps store individual pixels and suit photographs or detailed textures. Choice must be justified using the source image and intended editing/scaling.

### Worked example

**Store a red circle:** A drawing-list entry could record object = circle, centre = (80, 60), radius = 20, fill = red and outline = black. Enlarging it changes the geometry before redrawing, not a grid of stored pixels.

### Targeted practice and answers

1. Name two properties stored for a vector object.
   **Answer:** Any two of coordinates, dimensions, fill, line colour or line thickness.
2. Choose vector or bitmap for a company logo that must appear on a pen and a billboard.
   **Answer:** Vector, because geometric objects can be scaled without pixelation.
3. Why is bitmap normally better for a photograph?
   **Answer:** A photograph contains complex per-pixel colour and texture that is inefficient to describe as drawing objects.

### Exam-style question and MS

**Question (4 marks):** A designer creates a simple icon from circles and rectangles. Explain how it is stored as a vector graphic and give one advantage over a bitmap when resized.

- **B1** stored as a drawing list / list of objects
- **B1** stores object properties such as coordinates/dimensions/colour
- **B1** software redraws objects from the descriptions
- **B1** can be resized without pixelation / loss of shape quality

**Strict note:** Do not accept 'vector has better quality' unless scalability or object-based storage is explained.
