# Lesson 010: Vector graphics and drawing lists

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
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
**Syllabus reference:** S1.09 Vector-graphic encoding and bitmap/vector choice
**Duration:** 45 minutes

## Learning objectives

1. Describe a vector graphic as a drawing list of drawing objects and properties.
2. Explain how software redraws vector objects and why scaling does not create pixelation.
3. Justify bitmap or vector storage for a stated task.

## Drawing-list model

A vector file stores instructions such as object type, coordinates, dimensions, line colour, fill colour and line thickness. The renderer follows this drawing list to reconstruct the image.

## Bitmap or vector

- Choose vector for logos, diagrams and geometric artwork that must be edited or scaled.
- Choose bitmap for photographs and detailed textures represented by individual pixels.
- A valid justification connects the image content and intended editing or scaling to the representation.

## Lesson summary

Vector graphics store objects and their properties rather than a fixed grid of pixels. Scaling changes the geometry before the objects are redrawn.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Vector drawing list: objects, properties and redrawing

- **Explains:** `drawing-list`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-010-drawing-list.jpg`

1. A vector graphic stores a drawing list of drawing objects rather than a fixed grid of pixels.
2. Each object stores properties such as type, coordinates, dimensions, line colour, fill colour and line thickness.
3. Software follows the instructions to redraw the objects at the required size without pixelation.
<!-- stage10-explanations:end -->
