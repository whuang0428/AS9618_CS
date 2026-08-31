# Lesson 061: Bubble sort using arrays

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.06<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.03 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.
- Understand array, index, lower bound and upper bound terminology.


## 2. Knowledge explanation

### 1. Bubble sort · Linear search · Write (S10.06)

**Concept map:** bubble sort → linear search → write

**Three-part explanation:**

1. A trace alone is not sufficient evidence of the ability to write each complete algorithm
2. When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm
3. Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm

**Concrete cue:** When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm. A trace alone is not sufficient evidence of the ability to write each complete algorithm.

#### Why bubble sort repeats adjacent comparisons

![Why bubble sort repeats adjacent comparisons](../web/assets/diagrams/stage10-infographics/stage10-lesson-106-bubble.jpg)

<details><summary>Text transcript</summary>

- Bubble sort compares adjacent items and swaps an inverted pair.
- For [1, 4, 2, 5, 8], pass 2 makes one swap: 4 and 2.
- The resulting list is [1, 2, 4, 5, 8], and the next pass makes zero swaps.

</details>

#### Implement stack, queue and linked list using arrays

![Implement stack, queue and linked list using arrays](../web/assets/diagrams/stage10-infographics/stage10-lesson-123-implementation.jpg)

<details><summary>Text transcript</summary>

- An array stack uses Top; a queue uses Front and Rear; a linked list uses Data, Next, Start and a free list.
- Add/delete preserve stack LIFO, queue FIFO and linked-list links; edit changes stored data without corrupting structure.
- Candidates are not required to write pseudocode for these ADT operations; understand add, edit, delete and array implementation.

</details>

#### Linear search checks each item in order

![Linear search checks each item in order](../web/assets/diagrams/stage10-infographics/stage10-lesson-105-linear.jpg)

<details><summary>Text transcript</summary>

- Knowledge explanation
- How it works
- Start at the first item. Compare it with the target. If it matches, stop. If not, move to the next item until found or the list ends.
- When it is suitable
- Use it when data is unsorted, the list is small, or simplicity matters more than speed.
- Worst case: the target is last or absent, so every item may be checked.

</details>

<details><summary>Precise syllabus wording</summary>

Write bubble sort and linear search algorithms.

When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm. A trace alone is not sufficient evidence of the ability to write each complete algorithm.

</details>

### Supporting diagram library

#### Increment only when a condition is true

![Increment only when a condition is true](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-count.jpg)

<details><summary>Text transcript</summary>

- Initialise PassCount to zero before traversing five scores.
- Increment PassCount only when the current score is at least 50.
- Close the selection with ENDIF before NEXT Index.
- Output PassCount after the loop.

</details>

#### Four array algorithm patterns

![Four array algorithm patterns](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-patterns.jpg)

<details><summary>Text transcript</summary>

- Pattern map
- Question wording
- Core idea
- Key variable
- Traversal
- output all, process each
- visit every valid index
- increase, replace, apply discount

</details>

#### Same algorithm, different array syntax

![Same algorithm, different array syntax](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-pseudocode.jpg)

<details><summary>Text transcript</summary>

- Both pseudocode and Java versions visit five score positions.
- Increment the pass counter only when the current score is at least 50.
- Close the conditional before advancing the loop.
- Both complete versions output the final pass count after the loop.

</details>

#### Use a flag to remember whether the target appeared

![Use a flag to remember whether the target appeared](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-search.jpg)

<details><summary>Text transcript</summary>

- Initialise Found to FALSE before traversing the names.
- Set Found to TRUE only when the current name equals TargetName.
- Close the match selection with ENDIF before NEXT Index.
- Output Found after the traversal.

</details>

#### Choose a scenario and inspect the matching template

![Choose a scenario and inspect the matching template](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-selector.jpg)

<details><summary>Text transcript</summary>

- Interactive pattern selector
- Scenario
- Choose a scenario to see the algorithm pattern.

</details>

#### Visit every element once

![Visit every element once](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-traversal.jpg)

<details><summary>Text transcript</summary>

- Traversal
- FOR Index <- 1 TO 5
- OUTPUT Scores[Index]
- NEXT Index
- Traversal is the skeleton. Update, search and count usually add logic inside this skeleton.

</details>

#### Change selected elements

![Change selected elements](../web/assets/diagrams/stage10-infographics/stage10-lesson-118-update.jpg)

<details><summary>Text transcript</summary>

- Traverse the array with a FOR loop so Index is defined for every access.
- Place the conditional update inside the traversal.
- FOR Index <- 1 TO 10

</details>

#### Use the field name, not a numeric index

![Use the field name, not a numeric index](../web/assets/diagrams/stage10-infographics/stage10-lesson-119-access.jpg)

<details><summary>Text transcript</summary>

- Access and update
- Pseudocode
- Read field
- OUTPUT Student1.Name
- outputs the Name field
- Update field
- Student1.Mark <- 80
- changes only the Mark field

</details>

#### Same type and index, or mixed fields and names?

![Same type and index, or mixed fields and names?](../web/assets/diagrams/stage10-infographics/stage10-lesson-119-array-vs-record.jpg)

<details><summary>Text transcript</summary>

- Array vs record
- Elements / fields
- usually same type
- can be different types
- index: Scores[3]
- field name: Student1.Mark
- Best for
- many similar values

</details>

#### Composite data groups fields into one type

![Composite data groups fields into one type](../web/assets/diagrams/stage10-infographics/stage10-lesson-119-concept.jpg)

<details><summary>Text transcript</summary>

- a composite structure containing named fields
- TStudent
- one named item inside a record
- Name , Mark
- Composite data
- data made from several components
- student details grouped together
- Dot notation

</details>

#### Read one field from a record

![Read one field from a record](../web/assets/diagrams/stage10-infographics/stage10-lesson-119-lookup.jpg)

<details><summary>Text transcript</summary>

- Interactive field lookup
- Student1 has Name, DateOfBirth, Mark and Enrolled fields.

</details>

#### Same modelling idea, different syntax

![Same modelling idea, different syntax](../web/assets/diagrams/stage10-infographics/stage10-lesson-119-pseudocode.jpg)

<details><summary>Text transcript</summary>

- TYPE TBook
- Book fields are declared inside the TYPE block.
- DECLARE Book1 : TBook

</details>

<details><summary>Open precise terminology and exam facts</summary>

- When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm. A trace alone is not sufficient evidence of the ability to write each complete algorithm.
- Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element.
- Cambridge pseudocode declares explicit inclusive bounds. In DECLARE Names : ARRAY[1:4] OF STRING, 1 is the lower bound, 4 is the upper bound and the valid indexes are 1, 2, 3 and 4. A search must start and stop within those declared bounds.
- Linear search checks successive indexed elements until the target is found or every populated element has been checked. Binary search also uses indexes, but requires the array to be sorted so each comparison can discard one half of the remaining index range.
- Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm.
- Linear search examines array elements in index order until the target is found or all populated elements have been checked. A complete algorithm initialises its index and found state, keeps every access within the declared bounds, compares the current element and advances only when another element remains to be checked.
- Bubble sort makes repeated passes through the unsorted part of an array. Each pass compares adjacent elements and swaps them when they are in the wrong order. After a complete ascending pass, the largest remaining value is at the high end; the algorithm repeats until the required passes are complete or a whole pass makes no swaps.
- A trace is evidence about one execution, but the syllabus requires candidates to write the algorithms. The answer must therefore include initialisation, loop bounds, comparison, update or swap, and a valid stopping condition rather than only showing one example pass.

</details>

### Worked example

1. Two complete array algorithms
2. A linear search of Code[1:Count] sets Found to FALSE and Index to 1, then compares Code[Index] with Target while Found is FALSE and Index is within Count.
3. A bubble sort of Value[1:Count] uses nested passes, compares Value[Index] with Value[Index + 1], swaps an inverted pair through Temp and may stop early when a pass makes no swaps.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What comparison is made by an ascending bubble sort?

**Answer:** Compare adjacent elements and swap when the left element is greater than the right element.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - state - 2 marks

State two precise facts about bubble sort using arrays.

**Answer:** When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm. A trace alone is not sufficient evidence of the ability to write each complete algorithm. Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how bubble sort using arrays would be applied in a suitable computing context.

**Answer:** Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element. Cambridge pseudocode declares explicit inclusive bounds. In DECLARE Names : ARRAY[1:4] OF STRING, 1 is the lower bound, 4 is the upper bound and the valid indexes are 1, 2, 3 and 4. A search must start and stop within those declared bounds. Linear search checks successive indexed elements until the target is found or every populated element has been checked. Binary search also uses indexes, but requires the array to be sorted so each comparison can discard one half of the remaining index range.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/S/23 Q4(ii) | 1 | write | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define bubble sort using arrays with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For bubble sort using arrays, use the exact technical term before applying it to the scenario.
