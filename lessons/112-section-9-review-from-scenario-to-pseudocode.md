# Lesson 112: Section 9 review: from scenario to pseudocode

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 9  
**Duration:** 45 minutes  
**Assessment rhythm:** stage review

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Section 9 review: from scenario to pseudocode**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Section 9 review: from scenario to pseudocode** from the most closely related syllabus concept?

## Guided Explanation
Use Section 9 review: from scenario to pseudocode to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks.

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
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Section 9 review: from scenario to pseudocode**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Turn vague answers into mark-worthy answers

- **Explains:** `fixer`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-fixer.jpg`

1. Interactive answer fixer
2. Weak answer
3. Choose a weak answer to see a stricter version.

### Match the scenario to the correct algorithm pattern

- **Explains:** `patterns`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-patterns.jpg`

1. Pattern choice
2. Scenario clue
3. Core pseudocode feature
4. One precise explanation
5. exactly 10 readings
6. Count-controlled loop
7. FOR Index <- 1 TO 10
8. The number of repetitions is known before the loop starts.
9. until 0 is entered
10. Condition-controlled loop
11. WHILE Value <> 0
12. The number of repetitions depends on input values.

### Paper 2 wants readable Cambridge-style pseudocode

- **Explains:** `pseudocode`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-pseudocode.jpg`

1. Initialise Total and Count, then input the first Value.
2. While Value is not -1, add it to Total and increment Count.
3. Input the next Value inside the WHILE body before ENDWHILE.
4. If Count is greater than zero, calculate Average using real division and output it.
5. Java may support understanding but is not the Cambridge pseudocode answer format.

### Section 9 in one page

- **Explains:** `retrieval`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-retrieval.jpg`

1. Retrieval map
2. Signal words
3. Expected mechanism
4. Typical marking error
5. IPOC / decomposition
6. scenario, requirements, constraints
7. break problem into inputs, processing, outputs and rules
8. copying the story without design decisions
9. Trace tables
10. dry run, trace, values after each loop
11. update variables row by row in execution order
12. jumping to final answer and missing intermediate states

### Turn question wording into an algorithm plan

- **Explains:** `triage`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-112-triage.jpg`

1. Scenario triage
2. Step 1: Output first
3. Ask: what must be displayed, returned or stored at the end? The final output tells you which variables need to exist.
4. Output needed: average rainfall
5. Therefore:
6. Total is needed
7. Count is needed
8. Average <- Total / Count
9. Step 2: Stop condition
10. Ask: does the question state a fixed number of values, or does input continue until a condition is met?
11. Exactly 7 days -> FOR Day <- 1 TO 7
12. Until -1 entered -> WHILE Value <> -1
<!-- stage10-explanations:end -->
