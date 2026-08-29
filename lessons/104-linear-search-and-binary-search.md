# Lesson 104: Linear search and binary search

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Array-based linear search and bubble sort

### Direct explanation

- Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element.
- Cambridge pseudocode declares explicit inclusive bounds. In DECLARE Names : ARRAY[1:4] OF STRING, 1 is the lower bound, 4 is the upper bound and the valid indexes are 1, 2, 3 and 4. A search must start and stop within those declared bounds.
- Linear search checks successive indexed elements until the target is found or every populated element has been checked. Binary search also uses indexes, but requires the array to be sorted so each comparison can discard one half of the remaining index range.
- Linear search examines array elements in index order until the target is found or all populated elements have been checked. A complete algorithm initialises its index and found state, keeps every access within the declared bounds, compares the current element and advances only when another element remains to be checked.
- Bubble sort makes repeated passes through the unsorted part of an array. Each pass compares adjacent elements and swaps them when they are in the wrong order. After a complete ascending pass, the largest remaining value is at the high end; the algorithm repeats until the required passes are complete or a whole pass makes no swaps.
- A trace is evidence about one execution, but the syllabus requires candidates to write the algorithms. The answer must therefore include initialisation, loop bounds, comparison, update or swap, and a valid stopping condition rather than only showing one example pass.
- Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm.

### Worked example

**Declare the search data before tracing it / Two complete array algorithms:** DECLARE Names : ARRAY[1:4] OF STRING defines four string elements. For Names = ['Asha', 'Ben', 'Chen', 'Dina'], a one-based linear search compares Names[1], then Names[2], and stops when it finds 'Ben'. Index 0 is invalid because it is below the declared lower bound. A linear search of Code[1:Count] sets Found to FALSE and Index to 1, then compares Code[Index] with Target while Found is FALSE and Index is within Count. A bubble sort of Value[1:Count] uses nested passes, compares Value[Index] with Value[Index + 1], swaps an inverted pair through Temp and may stop early when a pass makes no swaps.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What are the lower and upper bounds of ARRAY[1:4]?
   **Answer:** The lower bound is 1 and the upper bound is 4.
2. What does Names[Index] mean?
   **Answer:** The single array element selected by the current value of Index.
3. Why must binary search know the current Low and High indexes?
   **Answer:** They delimit the remaining sorted portion of the array that may contain the target.
4. When must a linear search stop?
   **Answer:** When the target has been found or every populated element within the declared bounds has been checked.
5. What comparison is made by an ascending bubble sort?
   **Answer:** Compare adjacent elements and swap when the left element is greater than the right element.
6. What does a no-swap pass prove?
   **Answer:** No adjacent pair is out of ascending order, so the array is sorted and the algorithm may stop.

### Exam-style question and MS

**Question (12 marks):** Write declarations for an array called Code that stores 20 STRING values, then state the first and last valid indexes used by a search. Write Cambridge pseudocode for a linear search of Name[1:20] and an ascending bubble sort of Score[1:20].

| Answer | Guidance | Marks |
|---|---|---:|
| DECLARE Code : ARRAY[1:20] or another explicit 20-element bound range | Do not assume zero-based indexing when the declaration gives different bounds. Do not award only a trace or a description; both requested algorithms must be written and must not access Index + 1 beyond the upper bound. | 1 |
| OF STRING |  | 1 |
| first valid index matches the declared lower bound |  | 1 |
| last valid index matches the declared upper bound |  | 1 |
| linear search initialises Found and Index |  | 1 |
| linear search loops within indexes 1 to 20 until found or exhausted |  | 1 |
| linear search compares Name[Index] with the target and records a match |  | 1 |
| bubble sort uses repeated passes |  | 1 |
| compares adjacent Score[Index] and Score[Index + 1] within valid bounds |  | 1 |
| uses Temp or an equivalent safe three-step swap |  | 1 |
| reduces the unsorted range or uses a valid no-swap stopping condition |  | 1 |
| all constructs close coherently in Cambridge pseudocode |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Linear search and binary search**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Linear search and binary search** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Linear search and binary search, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Trace a linear search for `42` in `[13, 42, 56, 70]`, then explain why binary search requires sorted data.

**Worked answer / marking focus:** Linear search checks 13 then 42 and stops when found. Binary search can discard half the data only when order is guaranteed.

```text
// Cambridge-style pseudocode
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= Length
    IF Names[Index] = Target THEN
        Found ← TRUE
    ELSE
        Index ← Index + 1
    ENDIF
ENDWHILE
```

```java
// Java support example only, not exam pseudocode
boolean found = false;
int index = 0;
while (!found && index < names.length) {
    if (names[index].equals(target)) {
        found = true;
    } else {
        index++;
    }
}
```

## Student Task
Students trace both searches on paper cards, then write one sentence explaining when linear search is still acceptable.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Linear search and binary search**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Binary search repeatedly halves a sorted list

- **Explains:** `binary`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-binary.jpg`

1. Binary search requires sorted data and repeatedly narrows the search interval.
2. In Cambridge pseudocode, / performs real division and DIV performs integer division.
3. Mid <- (Low + High) DIV 2
This produces an integer array index.

### Trace binary search on sorted data

- **Explains:** `binary-tool`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-binary-tool.jpg`

1. Interactive binary trace
2. Target in [13, 21, 42, 56, 70, 88, 91]
3. Choose a target to trace low, mid and high.

### Choosing the right search

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-compare.jpg`

1. Comparison
2. Linear search
3. Binary search
4. Data order
5. works on unsorted or sorted data
6. requires sorted data
7. checks each item one by one
8. checks middle and discards half
9. Worst case
10. may check every item
11. checks far fewer items for large sorted lists
12. Exam phrase

### Linear search checks each item in order

- **Explains:** `linear`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-linear.jpg`

1. Knowledge explanation
2. How it works
3. Start at the first item. Compare it with the target. If it matches, stop. If not, move to the next item until found or the list ends.
4. When it is suitable
5. Use it when data is unsorted, the list is small, or simplicity matters more than speed.
6. Worst case: the target is last or absent, so every item may be checked.

### Trace linear search

- **Explains:** `linear-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-linear-tool.jpg`

1. Interactive linear trace
2. Target in [13, 42, 56, 70]
3. Choose a target to trace comparisons.

### Cambridge pseudocode is the exam format

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-pseudocode.jpg`

1. Initialise Found to FALSE and Index to the first valid position.
2. While the target is not found and Index remains valid, compare the current item.
3. Close the match selection with ENDIF, then increment Index.
4. ENDWHILE closes the surrounding search loop.
<!-- stage10-explanations:end -->
