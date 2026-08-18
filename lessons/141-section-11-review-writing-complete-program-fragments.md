# Lesson 141: Section 11 review: writing complete program fragments

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** stage review

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Section 11 review: writing complete program fragments** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Put three deliberately mixed questions on the board and ask students to identify the topic before answering. The first skill in a review lesson is knowing which mental toolbox to open.

Lesson-specific focus question: What would go wrong if a student confused **Section 11 review: writing complete program fragments** with a neighbouring syllabus idea?

## Guided Explanation
Use Section 11 review: writing complete program fragments to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Topic-specific teaching move: keep the explanation anchored to **Section 11 review: writing complete program fragments**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks. The worked example must explicitly use **Section 11 review: writing complete program fragments**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.

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
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version. Their final answer must include the phrase **Section 11 review: writing complete program fragments** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Section 11 review: writing complete program fragments**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Section 11 review: writing complete program fragments** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Section 11 review: writing complete program fragments** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction. For this lesson, make students contrast that mistake with the exact idea of **section 11 review: writing complete program fragments**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Arrays need consistent indexing and meaningful loop bounds

- **Explains:** `arrays`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-arrays.jpg`

1. Arrays and loops
2. Question wording
3. Good answer feature
4. Mark-risk
5. 10 marks
6. FOR Index <- 1 TO 10
7. looping 0 to 10 gives 11 iterations
8. highest score
9. initialise Highest before comparing
10. uninitialised comparison
11. total and average
12. update Total inside loop, divide after loop

### Use a checklist before calling a fragment finished

- **Explains:** `checklist`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-checklist.jpg`

1. Mark checklist

### Review answers should be traceable

- **Explains:** `debugging`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-debugging.jpg`

1. Debugging awareness
2. A well-written fragment can be traced: values change in clear places, conditions are testable, and outputs are easy to predict.
3. If you cannot trace your own fragment with a small example, the examiner probably cannot rescue it for you either.

### File fragments need open, process and close

- **Explains:** `files`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-files.jpg`

1. OPENFILE "Scores.txt" FOR READ
2. WHILE NOT EOF("Scores.txt")
3. READFILE "Scores.txt", Line
4. OUTPUT Line
5. ENDWHILE
6. CLOSEFILE "Scores.txt"

### A complete fragment has setup, logic and result

- **Explains:** `fragment`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-fragment.jpg`

1. Fragment anatomy
2. Pass-count fragment
3. PassCount <- 0
4. FOR Index <- 1 TO 10
5. INPUT Marks[Index]
6. IF Marks[Index] >= 50 THEN
7. PassCount <- PassCount + 1
8. NEXT Index
9. OUTPUT PassCount
10. Why it is complete
11. counter is initialised before the loop
12. array element is input before it is tested

### Java can support practice; the review answer should be Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-java.jpg`

1. Java support only
2. Java support example only
3. for (int index = 0; index < 10; index++) {
4. if (marks[index] >= 50) {
5. passCount++;
6. Cambridge-style pseudocode
7. FOR Index <- 1 TO 10
8. IF Marks[Index] >= 50 THEN
9. PassCount <- PassCount + 1
10. NEXT Index

### Section 11 tools become stronger when combined

- **Explains:** `review-map`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-review-map.jpg`

1. Review map
2. Likely construct
3. Evidence in answer
4. Common slip
5. repeat known number of times
6. start, end and NEXT
7. wrong loop bounds
8. make a decision
9. condition, branches, ENDIF
10. missing ELSE when needed
11. store several values
12. index used consistently

### Use functions for returned values and procedures for actions

- **Explains:** `subroutines`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-subroutines.jpg`

1. Subroutines
2. Function
3. FUNCTION IsPass(Mark : INTEGER) RETURNS BOOLEAN
4. RETURN Mark >= 50
5. ENDFUNCTION
6. Procedure
7. PROCEDURE DisplayResult(Name : STRING, Passed : BOOLEAN)
8. OUTPUT Name
9. OUTPUT Passed
10. ENDPROCEDURE

### Review fragments often need input checks

- **Explains:** `validation`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-validation.jpg`

1. Validation
2. INPUT Mark
3. IF Mark >= 0 AND Mark <= 100 THEN
4. Valid <- TRUE
5. OUTPUT "Enter a mark from 0 to 100"
6. Valid <- FALSE
7. UNTIL Valid = TRUE
<!-- stage10-explanations:end -->
