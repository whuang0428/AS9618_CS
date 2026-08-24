# Lesson 104: Linear search and binary search

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

1. Initialise Found to FALSE and Index to the first valid position.
2. While the target is not found and Index remains valid, compare the current item.
3. Close the match selection with ENDIF, then increment Index.
4. ENDWHILE closes the surrounding search loop.
<!-- stage10-explanations:end -->
