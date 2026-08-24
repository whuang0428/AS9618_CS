# Lesson 149: Paper 2 timed pseudocode practice

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Paper 2 review: Sections 9-12  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Paper 2 timed pseudocode practice**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- dry run 手工运行, boundary test 边界测试, modularity 模块化, syntax 语法

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Paper 2 timed pseudocode practice** from the most closely related syllabus concept?

## Guided Explanation
Use Paper 2 timed pseudocode practice to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

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
- Answer one 4-mark question about **Paper 2 timed pseudocode practice**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Paper 2 review: Sections 9-12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Choose the smallest construct that fits the task

- **Explains:** `constructs`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-149-constructs.jpg`

1. Construct bank
2. Task signal
3. Likely construct
4. exactly N items
5. known repetition count
6. bounds include all items
7. until file ends
8. WHILE NOT EOF
9. unknown record count
10. read inside loop
11. validate input
12. REPEAT UNTIL

### The four-pass approach

- **Explains:** `method`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-149-method.jpg`

1. Timed method
2. 1. Decode
3. Underline inputs, outputs, constraints and any required data structure or file.
4. 2. Skeleton
5. Write the outer shape first: initialisation, loop, selection, output.
6. Add conditions, assignments, function calls and file statements.
7. 4. Check
8. Trace one normal and one boundary case; confirm the output happens once in the right place.

### Before moving on, ask six questions

- **Explains:** `quality`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-149-quality.jpg`

1. Quality checklist
2. Inputs Where does the data come from: user, array or file?
3. Initialisation Are counters, totals and flags set before use?
4. Loop Does the loop include the correct items and stop safely?
5. Selection Are boundary conditions correct, such as greater than or equal to?
6. Output Is the final result output once, after processing?
7. File handling Are OPENFILE, READFILE or WRITEFILE and CLOSEFILE used correctly?

### Build the outer shape before details

- **Explains:** `skeleton-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-149-skeleton-tool.jpg`

1. Skeleton builder

### Choose a mark value and plan the response

- **Explains:** `timer-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-149-timer-tool.jpg`

1. Interactive timing tool
2. Question size

### Spend time according to marks

- **Explains:** `timing`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-149-timing.jpg`

1. Use one declared mark-to-time rate consistently across timed pseudocode practice.
2. The example rate is one minute per mark: 2, 3, 5 and 10 marks receive 2, 3, 5 and 10 minutes.
3. The whole question budget includes reading, planning, writing and checking.
4. A proportional model always allocates more time to a higher-mark question.
<!-- stage10-explanations:end -->
