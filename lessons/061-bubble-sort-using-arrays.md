# Lesson 061: Bubble sort using arrays

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

### 1. Bubble sort and linear search algorithms: Bubble sort using arrays (S10.06)

**Atomic learning targets**

- **S10.06.A01:** bubble sort
- **S10.06.A02:** linear search
- **S10.06.A03:** write

**Core explanation**

- Bubble sort makes repeated passes through the unsorted part of an array. It compares adjacent elements and swaps them when they are in the wrong order.
- After each ascending pass, the largest remaining value has moved to the high end, so the next inner loop can stop one position earlier.
- A complete algorithm requires nested loop bounds, an adjacent comparison, a three-assignment swap and a valid stopping rule. Showing one swap or one pass is not the same as writing the algorithm.
- Linear search checks successive array elements until it finds the target or exhausts the populated bounds. It works on unsorted data and must include both the found and not-found outcomes.

**Mechanism or method**

1. **Choose the unsorted range** — Run Count−1 passes and shorten the compared range because the high end becomes sorted after each pass.
2. **Inspect adjacent values** — For ascending order, swap when Value[Index] is greater than Value[Index+1].
3. **Use a temporary variable safely** — Store one value in Temp before overwriting it, then complete all three assignments.

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

For [4, 1, 3], compare 4/1 and swap → [1,4,3]; compare 4/3 and swap → [1,3,4]. The largest value is now fixed at the end.

3. **Pass 2**

Compare 1/3; no swap is needed, so the final array is [1,3,4].

#### Worked example: Write and test a bounded linear search

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

Searching for Z9 checks all three valid indexes and stops with Index=4 without reading beyond the array.

**Misconceptions to correct**

- Bubble sort compares adjacent values. It does not select the smallest value from the whole remaining array in one step.

#### Mastery check (MC-L061-S10.06)

Complete a fresh example that demonstrates every target: bubble sort; linear search; write. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- Bubble sort makes repeated passes through the unsorted part of an array. It compares adjacent elements and swaps them when they are in the wrong order.
- After each ascending pass, the largest remaining value has moved to the high end, so the next inner loop can stop one position earlier.
- A complete algorithm requires nested loop bounds, an adjacent comparison, a three-assignment swap and a valid stopping rule. Showing one swap or one pass is not the same as writing the algorithm.
- Linear search checks successive array elements until it finds the target or exhausts the populated bounds. It works on unsorted data and must include both the found and not-found outcomes.

</details>

**Supplementary concept map**

- **Linear search:** Inspect items in order
- **Bubble sort:** Swap adjacent out-of-order items
- **Pass:** One traversal of the array
- **Complete algorithm:** Initialise loop and finish correctly
- **adjacent:** Each pass compares adjacent elements and swaps them…
- **swap:** The answer must therefore include initialisation, loop bounds,…

**Supplementary three-step recap**

1. **Choose the unsorted range** — Run Count−1 passes and shorten the compared range because the high end becomes sorted after each pass.
2. **Inspect adjacent values** — For ascending order, swap when Value[Index] is greater than Value[Index+1].
3. **Use a temporary variable safely** — Store one value in Temp before overwriting it, then complete all three assignments.

**Concrete case: Linear search:** Bubble sort and linear search algorithms.



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

### Question 1 - foundation - write - 9 marks

Write complete Cambridge pseudocode for an ascending bubble sort of Value[1:Count]. Include both loop bounds, the adjacent comparison and a safe swap.

**Answer:** outer loop Pass 1 to Count-1; inner loop Index 1 to Count-Pass; compares Value[Index] > Value[Index+1]; uses Temp and three assignments to swap; closes IF and both loops

**Marking guidance:** A single pass or verbal description is not a complete algorithm.

**Common error:** The inner bound must keep Index+1 inside the array.

### Question 2 - application - trace - 6 marks

Trace every adjacent comparison and swap when bubble sorting [4, 1, 3] into ascending order. Show the array after each comparison and identify the value fixed after the first pass.

**Answer:** 4/1 swap -> [1,4,3]; 4/3 swap -> [1,3,4], fixing 4 at the high end; pass 2 compares 1/3 with no swap; final [1,3,4]

**Marking guidance:** Require the state after each comparison, not only the final array.

**Common error:** Do not skip the no-swap comparison in the trace.

### Question 3 - transfer - explain - 4 marks

Explain why the inner loop of an ascending bubble sort can end at Count - Pass and why Index + 1 remains within bounds.

**Answer:** each completed pass fixes the largest remaining item at the high end; those fixed items need not be compared again; ending at Count-Pass makes the last right-hand access Index+1 no greater than Count

**Marking guidance:** Connect both the optimisation and the array-bound consequence.

**Common error:** Count-Pass is not an arbitrary speed trick; it follows from the sorted high-end invariant.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/S/23 Q4(ii) | 1 | write | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S10.06: explain bubble sort, linear search, write.
- S10.06 method: Choose the unsorted range → Inspect adjacent values → Use a temporary variable safely.
- Correction to remember: Bubble sort compares adjacent values. It does not select the smallest value from the whole remaining array in one step.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For bubble sort using arrays, use the exact technical term before applying it to the scenario.
