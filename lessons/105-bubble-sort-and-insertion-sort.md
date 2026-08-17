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
## Stage 10 causal explanations

### Why bubble sort needs repeated adjacent comparisons

- **Explains:** `bubble`
- **Explanation type:** process

Bubble sort compares neighbouring items because a swap can correct a local inversion without losing any data. During one left-to-right pass in ascending order, whenever the left item is larger, the pair is swapped. The largest remaining item therefore moves one position at a time toward the right until it reaches its final position at the end of that pass. One pass cannot usually sort the whole list because smaller misplaced values may need to move left across several later comparisons. Repeating passes shrinks the unsorted region. If a complete pass makes no swaps, every adjacent pair is already ordered, so the algorithm can stop early. The name “bubble” describes this gradual movement of an extreme value; it does not mean the algorithm compares every possible pair directly.

### Why insertion sort maintains a sorted left section

- **Explains:** `insertion`
- **Explanation type:** process

Insertion sort treats the left part of the list as already sorted. It takes the next item, saves it, and shifts larger items in the sorted section one position to the right until the correct gap appears. The saved item is then inserted into that gap. Shifting is necessary because writing the item immediately would overwrite a value that still has to be kept. After the insertion, the sorted section has grown by one item and remains ordered, which is the invariant that makes the next step valid. The algorithm can perform well on nearly sorted data because an item that is already close to its position requires few shifts. It still may require many comparisons and movements when small items begin near the end. The mechanism is insertion into a maintained ordered prefix, not repeated swapping of arbitrary pairs.

### Why two correct sorting methods move data differently

- **Explains:** `compare`
- **Explanation type:** comparison

Bubble and insertion sort can produce the same ordered result while following different invariants. Bubble sort uses adjacent comparisons across passes and places an extreme item at the end of the unsorted region. Insertion sort preserves a sorted prefix and places the next item inside it. This difference changes the trace: bubble sort records swaps between neighbours, while insertion sort may save one item and shift several larger values. Both can take a quadratic number of comparisons in difficult cases, so neither is universally efficient for large data sets. On nearly sorted data, insertion sort often performs little movement, and an optimised bubble sort can stop after a pass with no swaps. A comparison is meaningful only when it names the movement, stopping condition or data state that causes the performance difference.

### Why a trace should follow algorithm state rather than language punctuation

- **Explains:** `pseudocode`
- **Explanation type:** comparison

Cambridge pseudocode expresses the intended algorithm without depending on Java syntax. A trace should therefore follow variable values, comparisons, swaps, loop boundaries and the changing list, not semicolons or type declarations. Java may use zero-based array indexes and library methods, while a pseudocode question may specify different bounds and require the movement to be written explicitly. Copying a remembered Java loop can introduce an off-by-one error even when the sorting idea is correct. Begin with the stated lower and upper bounds, identify which part of the list is already in its final or sorted state, and update that state after each pass or insertion. The language notation is a representation; the algorithm is the sequence of state changes. A correct trace remains correct when rewritten in another language because those state changes are preserved.
<!-- stage10-explanations:end -->
