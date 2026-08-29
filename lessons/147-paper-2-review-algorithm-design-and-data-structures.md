# Lesson 147: Paper 2 review: algorithm design and data structures

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Paper 2 review: Sections 9-12
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Paper 2 review: algorithm design and data structures**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- dry run 手工运行, boundary test 边界测试, modularity 模块化, syntax 语法

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Paper 2 review: algorithm design and data structures** from the most closely related syllabus concept?

## Guided Explanation
Use Paper 2 review: algorithm design and data structures to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

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
- Answer one 4-mark question about **Paper 2 review: algorithm design and data structures**. Follow its command word and apply each point to the stated context.

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

### Good pseudocode is precise enough to trace

- **Explains:** `algorithms`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-algorithms.jpg`

1. Algorithm design review
2. State the data being read, such as target name, score list or file record.
3. Use sequence, selection and iteration with clear variable updates.
4. State exactly what is displayed, returned or stored.

### Persistent data needs clear read/write logic

- **Explains:** `files`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-files.jpg`

1. Files and records
2. Pseudocode pattern
3. OPENFILE "Scores.txt" FOR READ
4. WHILE NOT EOF("Scores.txt")
5. READFILE "Scores.txt", StudentRecord
6. OUTPUT StudentRecord.Name
7. ENDWHILE
8. CLOSEFILE "Scores.txt"
9. Review note
10. File questions often test the sequence: open, read or write, loop until end of file, then close. Keep the file mode clear.

### The reason matters more than the name

- **Explains:** `selection`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-selection.jpg`

1. Structure choice
2. Scenario
3. Likely structure
4. store 30 daily temperatures
5. 1D array
6. same type, indexed by day
7. store student name, ID and mark
8. related fields of different types
9. undo recent edits
10. most recent action is undone first
11. print jobs waiting
12. first job added should print first

### Choose the tool before writing the answer

- **Explains:** `strategy`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-strategy.jpg`

1. Review strategy
2. Question signal
3. Evidence
4. Common loss
5. trace / dry run
6. trace table
7. variable values after each step
8. skipping loop iterations
9. design an algorithm
10. pseudocode
11. inputs, process, output
12. writing vague English only

### Choose the structure and explain why

- **Explains:** `structure-tool`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-structure-tool.jpg`

1. Data structure chooser
2. Scenario

### Choose structures by how the data is used

- **Explains:** `structures`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-structures.jpg`

1. Cambridge arrays have explicitly declared lower and upper bounds.
2. An array may be zero-based or one-based according to its declaration.
3. Label 0 to n-1 as one chosen convention rather than a universal rule.

### Calculate Total for the selected score list

- **Explains:** `trace-tool`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-trace-tool.jpg`

1. Interactive trace tool
<!-- stage10-explanations:end -->
