# Lesson 105: Bubble sort and insertion sort

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Bubble sort and insertion sort** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Bubble sort and insertion sort** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Bubble sort and insertion sort, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Bubble sort and insertion sort**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Show the first pass of bubble sort on `[5, 1, 4, 2]` and compare it with the first insertion sort movement. The worked example must explicitly use **Bubble sort and insertion sort**, not a generic example from the wider unit.

**Worked answer / marking focus:** Bubble sort compares adjacent items and moves the largest towards the end; insertion sort takes the next item and inserts it into the sorted left part.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students physically sort four cards twice, once using bubble sort rules and once using insertion sort rules. Their final answer must include the phrase **Bubble sort and insertion sort** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Bubble sort and insertion sort**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Bubble sort and insertion sort** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Bubble sort and insertion sort** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **bubble sort and insertion sort**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why bubble sort repeats adjacent comparisons

- **Explains:** `bubble`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-105-bubble.jpg`

1. Compare neighbouring values and swap an inverted pair.
2. A pass moves one extreme value toward its final end position.
3. Repeat until a pass makes no swaps or the unsorted region ends.
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
