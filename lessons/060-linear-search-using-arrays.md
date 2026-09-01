# Lesson 060: Linear search using arrays

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.06<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.03 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.
- Understand array, index, lower bound and upper bound terminology.


## 2. Knowledge explanation

### 1. Bubble sort and linear search algorithms: Linear search using arrays (S10.06)

**Atomic learning targets**

- **S10.06.A01:** bubble sort
- **S10.06.A02:** linear search
- **S10.06.A03:** write

**Core explanation**

- Linear search examines array elements in index order until the target is found or every populated element has been checked. It works on unsorted data.
- A complete algorithm initialises the index and found flag, keeps every array access within declared bounds, compares the current element, advances after a failed comparison and reports both found and not-found outcomes.
- Stopping the loop immediately after the last valid comparison prevents an out-of-bounds access. A trace of one search is useful evidence, but the syllabus also requires the learner to write the complete algorithm.
- Bubble sort repeatedly compares adjacent elements and swaps a pair when it is in the wrong order. Each ascending pass fixes the largest remaining value at the high end, so the next pass can use a shorter inner-loop bound.

**Mechanism or method**

1. **Set the first index and found state** — Start at the declared lower bound with Found set to FALSE before reading an array element.
2. **Compare within the valid bounds** — Test the current item against Target and advance the index only when the current item does not match.
3. **Report found or exhausted** — Stop on a match or after the upper populated bound and return an index or a clear not-found result.

#### Worked example: Write a bounded linear search

1. **Code**

```text
DECLARE Found : BOOLEAN
DECLARE Index : INTEGER
Found <- FALSE
Index <- 1
WHILE Index <= Count AND NOT Found
IF Code[Index] = Target THEN
Found <- TRUE
ELSE
Index <- Index + 1
ENDIF
ENDWHILE
```

2. **Found case**

Searching [K4, M2, P7] for M2 checks indexes 1 then 2 and stops with Found=TRUE and Index=2.

3. **Absent case**

Searching the same array for Z9 checks indexes 1, 2 and 3, then stops when Index=4 without accessing Code[4].

#### Worked example: Write and trace an ascending bubble sort

1. **Code**

```text
FOR Pass <- 1 TO Count - 1
FOR Index <- 1 TO Count - Pass
IF Value[Index] > Value[Index + 1] THEN
Temp <- Value[Index]
Value[Index] <- Value[Index + 1]
Value[Index + 1] <- Temp
ENDIF
NEXT Index
NEXT Pass
```

2. **Pass 1**

For [4, 1, 3], compare 4/1 and swap to [1,4,3]; compare 4/3 and swap to [1,3,4].

3. **Pass 2**

Compare 1/3; no swap is needed and the array remains [1,3,4].

**Misconceptions to correct**

- A linear search does not require sorted data, but it must still respect the declared array bounds.

#### Mastery check (MC-L060-S10.06)

Complete a fresh example that demonstrates every target: bubble sort; linear search; write. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Linear search examines array elements in index order until the target is found or every populated element has been checked. It works on unsorted data.
- A complete algorithm initialises the index and found flag, keeps every array access within declared bounds, compares the current element, advances after a failed comparison and reports both found and not-found outcomes.
- Stopping the loop immediately after the last valid comparison prevents an out-of-bounds access. A trace of one search is useful evidence, but the syllabus also requires the learner to write the complete algorithm.
- Bubble sort repeatedly compares adjacent elements and swaps a pair when it is in the wrong order. Each ascending pass fixes the largest remaining value at the high end, so the next pass can use a shorter inner-loop bound.

</details>

**Supplementary concept map**

- **Linear search:** Inspect items in order
- **Bubble sort:** Swap adjacent out-of-order items
- **Pass:** One traversal of the array
- **Complete algorithm:** Initialise loop and finish correctly
- **target:** Linear search examines array elements in index order…
- **found:** Linear search checks successive indexed elements until the…

**Supplementary three-step recap**

1. **Set the first index and found state** — Start at the declared lower bound with Found set to FALSE before reading an array element.
2. **Compare within the valid bounds** — Test the current item against Target and advance the index only when the current item does not match.
3. **Report found or exhausted** — Stop on a match or after the upper populated bound and return an index or a clear not-found result.

**Linear search checks each item in order:** Knowledge explanation How it works

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

#### Why bubble sort repeats adjacent comparisons

![Why bubble sort repeats adjacent comparisons](../web/assets/diagrams/stage10-infographics/stage10-lesson-106-bubble.jpg)

<details><summary>Text transcript</summary>

- Bubble sort compares adjacent items and swaps an inverted pair.
- For [1, 4, 2, 5, 8], pass 2 makes one swap: 4 and 2.
- The resulting list is [1, 2, 4, 5, 8], and the next pass makes zero swaps.

</details>

<details><summary>Precise syllabus wording</summary>

Write bubble sort and linear search algorithms.

When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm. A trace alone is not sufficient evidence of the ability to write each complete algorithm.

</details>

### Lesson technical reference

- When processing array data, candidates must write a bubble-sort algorithm and a linear-search algorithm. A trace alone is not sufficient evidence of the ability to write each complete algorithm.
- Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element.
- Cambridge pseudocode declares explicit inclusive bounds. In DECLARE Names : ARRAY[1:4] OF STRING, 1 is the lower bound, 4 is the upper bound and the valid indexes are 1, 2, 3 and 4. A search must start and stop within those declared bounds.
- Linear search checks successive indexed elements until the target is found or every populated element has been checked. Binary search also uses indexes, but requires the array to be sorted so each comparison can discard one half of the remaining index range.
- Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm.
- Linear search examines array elements in index order until the target is found or all populated elements have been checked. A complete algorithm initialises its index and found state, keeps every access within the declared bounds, compares the current element and advances only when another element remains to be checked.
- Bubble sort makes repeated passes through the unsorted part of an array. Each pass compares adjacent elements and swaps them when they are in the wrong order. After a complete ascending pass, the largest remaining value is at the high end; the algorithm repeats until the required passes are complete or a whole pass makes no swaps.
- A trace is evidence about one execution, but the syllabus requires candidates to write the algorithms. The answer must therefore include initialisation, loop bounds, comparison, update or swap, and a valid stopping condition rather than only showing one example pass.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - write - 8 marks

Write complete Cambridge pseudocode for a linear search of Code[1:Count] for Target. Initialise all state, stay within the bounds, and report both found and not-found outcomes.

**Answer:** initialises Found to FALSE and Index to 1; loops while Index <= Count and not Found; compares Code[Index] with Target; sets Found on match; otherwise increments Index; never accesses beyond Count; reports Index/found or a clear not-found result

**Marking guidance:** A trace or prose description alone earns no algorithm-construction marks.

**Common error:** Test the bound before every array access.

### Question 2 - application - trace - 5 marks

Trace the linear-search algorithm for [K4, M2, P7] with targets M2 and Z9. Show Index, current value and Found after each valid comparison.

**Answer:** M2: index1 K4 false, index2 M2 true and stop; Z9: indexes1 K4 false, 2 M2 false, 3 P7 false, then stop not found without reading index4

**Marking guidance:** The absent trace must demonstrate safe termination after the upper bound.

**Common error:** Do not read a fourth element from a three-element array.

### Question 3 - transfer - explain - 3 marks

Explain how linear search using arrays would be applied in a suitable computing context.

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

- S10.06: explain bubble sort, linear search, write.
- S10.06 method: Set the first index and found state → Compare within the valid bounds → Report found or exhausted.
- Correction to remember: A linear search does not require sorted data, but it must still respect the declared array bounds.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For linear search using arrays, use the exact technical term before applying it to the scenario.
