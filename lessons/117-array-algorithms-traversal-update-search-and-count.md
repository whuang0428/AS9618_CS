# Lesson 117: Array model required by search algorithms

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Array model required by search algorithms

### Direct explanation

- Before tracing a search, define the data structure it traverses. An array is a fixed-size indexed collection whose elements have one declared data type. The index selects one element; it is not the value stored in that element.
- Cambridge pseudocode declares explicit inclusive bounds. In DECLARE Names : ARRAY[1:4] OF STRING, 1 is the lower bound, 4 is the upper bound and the valid indexes are 1, 2, 3 and 4. A search must start and stop within those declared bounds.
- Linear search checks successive indexed elements until the target is found or every populated element has been checked. Binary search also uses indexes, but requires the array to be sorted so each comparison can discard one half of the remaining index range.
- Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm.

### Worked example

**Declare the search data before tracing it:** DECLARE Names : ARRAY[1:4] OF STRING defines four string elements. For Names = ['Asha', 'Ben', 'Chen', 'Dina'], a one-based linear search compares Names[1], then Names[2], and stops when it finds 'Ben'. Index 0 is invalid because it is below the declared lower bound.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What are the lower and upper bounds of ARRAY[1:4]?
   **Answer:** The lower bound is 1 and the upper bound is 4.
2. What does Names[Index] mean?
   **Answer:** The single array element selected by the current value of Index.
3. Why must binary search know the current Low and High indexes?
   **Answer:** They delimit the remaining sorted portion of the array that may contain the target.

### Exam-style question and MS

**Question (4 marks):** Write declarations for an array called Code that stores 20 STRING values, then state the first and last valid indexes used by a search.

| Answer | Guidance | Marks |
|---|---|---:|
| DECLARE Code : ARRAY[1:20] or another explicit 20-element bound range | Do not assume zero-based indexing when the declaration gives different bounds. | 1 |
| OF STRING |  | 1 |
| first valid index matches the declared lower bound |  | 1 |
| last valid index matches the declared upper bound |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Array algorithms: traversal, update, search, and count**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Array algorithms: traversal, update, search, and count** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Array algorithms: traversal, update, search, and count, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

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
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Array algorithms: traversal, update, search, and count**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Increment only when a condition is true

- **Explains:** `count`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-count.jpg`

1. Initialise PassCount to zero before traversing five scores.
2. Increment PassCount only when the current score is at least 50.
3. Close the selection with ENDIF before NEXT Index.
4. Output PassCount after the loop.

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

### Four array algorithm patterns

- **Explains:** `patterns`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-patterns.jpg`

1. Pattern map
2. Question wording
3. Core idea
4. Key variable
5. Traversal
6. output all, process each
7. visit every valid index
8. increase, replace, apply discount
9. assign a new value to selected elements
10. Scores[Index]
11. find, present, target
12. compare each element with target

### Same algorithm, different array syntax

- **Explains:** `pseudocode`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-pseudocode.jpg`

1. Both pseudocode and Java versions visit five score positions.
2. Increment the pass counter only when the current score is at least 50.
3. Close the conditional before advancing the loop.
4. Both complete versions output the final pass count after the loop.

### Use a flag to remember whether the target appeared

- **Explains:** `search`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-search.jpg`

1. Initialise Found to FALSE before traversing the names.
2. Set Found to TRUE only when the current name equals TargetName.
3. Close the match selection with ENDIF before NEXT Index.
4. Output Found after the traversal.

### Choose a scenario and inspect the matching template

- **Explains:** `selector`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-selector.jpg`

1. Interactive pattern selector
2. Scenario
3. Choose a scenario to see the algorithm pattern.

### Visit every element once

- **Explains:** `traversal`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-traversal.jpg`

1. Traversal
2. FOR Index <- 1 TO 5
3. OUTPUT Scores[Index]
4. NEXT Index
5. Traversal is the skeleton. Update, search and count usually add logic inside this skeleton.

### Change selected elements

- **Explains:** `update`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-update.jpg`

1. Traverse the array with a FOR loop so Index is defined for every access.
2. Place the conditional update inside the traversal.
3. FOR Index <- 1 TO 10
    IF Scores[Index] < 50 THEN
        Scores[Index] <- Scores[Index] + 5
    ENDIF
NEXT Index
<!-- stage10-explanations:end -->
