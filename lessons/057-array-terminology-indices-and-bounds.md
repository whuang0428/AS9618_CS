# Lesson 057: Array terminology, indices and bounds

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.03<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 056: Records: defining, reading and saving structured data.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Array, index, lower bound and upper bound terminology (S10.03)

**Concept relationships**

- **lower bound:** Array, index, lower bound and upper bound terminology.
- **upper bound:** One-dimensional array pseudocode must declare explicit bounds and…
- **array:** The technical terms associated with arrays, including index,…
- **index:** ARRAY[1:4] OF STRING, 1 is the lower bound,…
- **lower:** Cambridge array declarations state an explicit lower and…

**Mechanism**

1. **Translate the stated design** — Array, index, lower bound and upper bound terminology.
2. **Apply one complete operation** — One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use…
3. **Trace state and boundaries** — The technical terms associated with arrays, including index, lower bound and upper bound.

**The index points to exactly one element:** Cambridge array declarations state an explicit lower and upper bound. Valid indexes follow the declared bounds and are not universally zero-based.

#### The index points to exactly one element

![The index points to exactly one element](../web/assets/diagrams/stage10-infographics/stage10-lesson-116-access.jpg)

<details><summary>Text transcript</summary>

- Cambridge array declarations state an explicit lower and upper bound.
- Valid indexes follow the declared bounds and are not universally zero-based.
- Label 0 to n-1 as a chosen zero-based example, or use the lesson's declared bounds consistently.

</details>

<details><summary>Precise syllabus wording</summary>

Understand array, index, lower bound and upper bound terminology.

Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds. The number of elements is upper bound - lower bound + 1.
- Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element.
- Cambridge pseudocode declares explicit inclusive bounds. In DECLARE Names : ARRAY[1:4] OF STRING, 1 is the lower bound, 4 is the upper bound and the valid indexes are 1, 2, 3 and 4. A search must start and stop within those declared bounds.
- Linear search checks successive indexed elements until the target is found or every populated element has been checked. Binary search also uses indexes, but requires the array to be sorted so each comparison can discard one half of the remaining index range.

</details>

### Worked method

1. Declare the search data before tracing it
2. ARRAY[1:4] OF STRING defines four string elements.
3. For Names = ['Asha', 'Ben', 'Chen', 'Dina'], a one-based linear search compares Names[1], then Names[2], and stops when it finds 'Ben'.
4. Index 0 is invalid because it is below the declared lower bound.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - write - 6 marks

Write declarations for a one-dimensional array for 25 REAL measurements, input every element and explain why a two-dimensional array is not required.

**Answer:** DECLARE Measurements : ARRAY[1:25]; OF REAL; FOR loop uses the declared lower and upper bounds; INPUT Measurements[Index] and closes with NEXT Index; one index identifies each measurement; there is no row-column relationship requiring a second dimension

**Marking guidance:** Do not use index 0 when the declared lower bound is 1, and do not describe bounds as stored element values.

**Common error:** For the command word write, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why must binary search know the current Low and High indexes?

**Answer:** They delimit the remaining sorted portion of the array that may contain the target.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - define - 2 marks

Define index, lower bound and upper bound.

**Answer:** An index selects an element; the lower bound is the first valid index; the upper bound is the last valid index.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/24 Q5(a)(i) | 3 | identify | recall |
| 9618/22/S/24 Q5(ii) | 2 | explain | explain |
| 9618/23/W/24 Q5(i) | 2 | complete | recall |
| 9618/22/S/24 Q5(b) | 1 | identify | write |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define array terminology, indices and bounds with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For array terminology, indices and bounds, use the exact technical term before applying it to the scenario.
