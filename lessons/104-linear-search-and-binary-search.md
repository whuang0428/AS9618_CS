# Lesson 104: Linear search and binary search

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Linear search and binary search** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Lesson-specific focus question: What would go wrong if a student confused **Linear search and binary search** with a neighbouring syllabus idea?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For Linear search and binary search, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Topic-specific teaching move: keep the explanation anchored to **Linear search and binary search**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace a linear search for `42` in `[13, 42, 56, 70]`, then explain why binary search requires sorted data. The worked example must explicitly use **Linear search and binary search**, not a generic example from the wider unit.

**Worked answer / marking focus:** Linear search checks 13 then 42 and stops when found. Binary search can discard half the data only when order is guaranteed.

```text
// Cambridge-style pseudocode
Found <- FALSE
Index <- 1
WHILE Found = FALSE AND Index <= Length DO
    IF Names[Index] = Target THEN
        Found <- TRUE
    ELSE
        Index <- Index + 1
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
Students trace both searches on paper cards, then write one sentence explaining when linear search is still acceptable. Their final answer must include the phrase **Linear search and binary search** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Linear search and binary search**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Linear search and binary search** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Linear search and binary search** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first. For this lesson, make students contrast that mistake with the exact idea of **linear search and binary search**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Binary search repeatedly halves a sorted list

- **Explains:** `binary`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-binary.jpg`

1. Knowledge explanation
2. 1 Set Low to first index and High to last index.
3. 2 Find Mid, the middle index.
4. 3 Compare List[Mid] with Target.
5. 4 If target is smaller, move High left; if larger, move Low right.
6. 5 Stop when found or Low is greater than High.

### Trace binary search on sorted data

- **Explains:** `binary-tool`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-binary-tool.jpg`

1. Interactive binary trace
2. Target in [13, 21, 42, 56, 70, 88, 91]
3. Choose a target to trace low, mid and high.

### Choosing the right search

- **Explains:** `compare`
- **Explanation type:** comparison
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-linear-tool.jpg`

1. Interactive linear trace
2. Target in [13, 42, 56, 70]
3. Choose a target to trace comparisons.

### Cambridge pseudocode is the exam format

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-104-pseudocode.jpg`

1. Pseudocode vs Java
2. Linear search pseudocode
3. Found <- FALSE
4. Index <- 1
5. WHILE Found = FALSE AND Index <= Length
6. IF List[Index] = Target THEN
7. Found <- TRUE
8. Index <- Index + 1
9. ENDWHILE
10. Java support only
11. boolean found = false;
12. int index = 0;
<!-- stage10-explanations:end -->
