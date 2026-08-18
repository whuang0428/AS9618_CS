# Lesson 117: Array algorithms: traversal, update, search, and count

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Array algorithms: traversal, update, search, and count** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: Would you store a class register as 28 separate variables? Let the class enjoy the horror for three seconds, then introduce structure.

Lesson-specific focus question: What would go wrong if a student confused **Array algorithms: traversal, update, search, and count** with a neighbouring syllabus idea?

## Guided Explanation
Move from single values to grouped data. For Array algorithms: traversal, update, search, and count, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Topic-specific teaching move: keep the explanation anchored to **Array algorithms: traversal, update, search, and count**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values. The worked example must explicitly use **Array algorithms: traversal, update, search, and count**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

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
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it. Their final answer must include the phrase **Array algorithms: traversal, update, search, and count** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Array algorithms: traversal, update, search, and count**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Array algorithms: traversal, update, search, and count** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Array algorithms: traversal, update, search, and count** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name. For this lesson, make students contrast that mistake with the exact idea of **array algorithms: traversal, update, search, and count**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Increment only when a condition is true

- **Explains:** `count`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-count.jpg`

1. PassCount <- 0
2. FOR Index <- 1 TO 5
3. IF Scores[Index] >= 50 THEN
4. PassCount <- PassCount + 1
5. NEXT Index
6. OUTPUT PassCount

### Four array algorithm patterns

- **Explains:** `patterns`
- **Explanation type:** process
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. PassCount <- 0
4. FOR Index <- 1 TO 5
5. IF Scores[Index] >= 50 THEN
6. PassCount <- PassCount + 1
7. NEXT Index
8. Java support only
9. int passCount = 0;
10. for (int index = 0; index < 5; index++) {
11. if (scores[index] >= 50) {
12. passCount++;

### Use a flag to remember whether the target appeared

- **Explains:** `search`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-search.jpg`

1. Found <- FALSE
2. FOR Index <- 1 TO 5
3. IF Names[Index] = TargetName THEN
4. Found <- TRUE
5. NEXT Index
6. OUTPUT Found

### Choose a scenario and inspect the matching template

- **Explains:** `selector`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-selector.jpg`

1. Interactive pattern selector
2. Scenario
3. Choose a scenario to see the algorithm pattern.

### Visit every element once

- **Explains:** `traversal`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-traversal.jpg`

1. Traversal
2. FOR Index <- 1 TO 5
3. OUTPUT Scores[Index]
4. NEXT Index
5. Traversal is the skeleton. Update, search and count usually add logic inside this skeleton.

### Change selected elements

- **Explains:** `update`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-117-update.jpg`

1. Update every element
2. FOR Index <- 1 TO 5
3. Scores[Index] <- Scores[Index] + 2
4. NEXT Index
5. Update only when condition is true
6. IF Scores[Index] < 50 THEN
7. Scores[Index] <- Scores[Index] + 5
<!-- stage10-explanations:end -->
