# Lesson 105: Bubble sort and insertion sort

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **Bubble sort and insertion sort**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **Bubble sort and insertion sort** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Bubble sort and insertion sort, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

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
**Problem:** Show the first pass of bubble sort on `[5, 1, 4, 2]` and compare it with the first insertion sort movement.

**Worked answer / marking focus:** Bubble sort compares adjacent items and moves the largest towards the end; insertion sort takes the next item and inserts it into the sorted left part.

```text
// Cambridge-style pseudocode: one bubble-sort pass
FOR Index ← 1 TO Length - 1
    IF Values[Index] > Values[Index + 1] THEN
        Temp ← Values[Index]
        Values[Index] ← Values[Index + 1]
        Values[Index + 1] ← Temp
    ENDIF
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < values.length - 1; index++) {
    if (values[index] > values[index + 1]) {
        int temp = values[index];
        values[index] = values[index + 1];
        values[index + 1] = temp;
    }
}
```

## Student Task
Students physically sort four cards twice, once using bubble sort rules and once using insertion sort rules.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Bubble sort and insertion sort**. Follow its command word and apply each point to the stated context.

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

### Why bubble sort repeats adjacent comparisons

- **Explains:** `bubble`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-105-bubble.jpg`

1. Bubble sort compares adjacent items and swaps an inverted pair.
2. For [1, 4, 2, 5, 8], pass 2 makes one swap: 4 and 2.
3. The resulting list is [1, 2, 4, 5, 8], and the next pass makes zero swaps.
- **Analogy:** Repeatedly exchange adjacent books until the largest reaches the shelf end.
- **Boundary:** One pass does not generally sort the entire list.

### Why the sorts move data differently

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-105-compare.jpg`

1. Bubble sort repairs local inversions through repeated neighbouring swaps.
2. Insertion sort moves one key through an existing sorted region.
3. Their movement patterns produce different trace states and operation counts.
- **Analogy:** One method swaps neighbours; the other opens a gap for one selected card.
- **Boundary:** Both remain quadratic in the typical worst-case school-level analysis.

### How insertion sort grows a sorted region

- **Explains:** `insertion`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-105-insertion.jpg`

1. Treat the first item as an already sorted region.
2. Remove the next key and shift larger sorted items right.
3. Insert the key into the gap, expanding the sorted region.
- **Analogy:** Insert each new card into the correct place in an ordered hand.
- **Boundary:** The left region is sorted, but the unprocessed right region is not.

### Why a trace follows state

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-105-pseudocode.jpg`

1. Record the variables and list at the agreed trace point.
2. Apply exactly one comparison, swap, shift or insertion step.
3. Write the new state before advancing the loop.
- **Analogy:** A laboratory log records each changed state, not the punctuation of instructions.
- **Boundary:** A trace must use the algorithm's actual update order.
<!-- stage10-explanations:end -->
