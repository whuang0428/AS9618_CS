# Lesson 147: Paper 2 review: algorithm design and data structures

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Paper 2 review: Sections 9-12  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Paper 2 review: algorithm design and data structures** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- dry run 手工运行, boundary test 边界测试, modularity 模块化, syntax 语法

## Warm-Up Hook
Put three deliberately mixed questions on the board and ask students to identify the topic before answering. The first skill in a review lesson is knowing which mental toolbox to open.

Lesson-specific focus question: What would go wrong if a student confused **Paper 2 review: algorithm design and data structures** with a neighbouring syllabus idea?

## Guided Explanation
Use Paper 2 review: algorithm design and data structures to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Topic-specific teaching move: keep the explanation anchored to **Paper 2 review: algorithm design and data structures**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks. The worked example must explicitly use **Paper 2 review: algorithm design and data structures**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.

```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```


## Student Task
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version. Their final answer must include the phrase **Paper 2 review: algorithm design and data structures** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Paper 2 review: algorithm design and data structures**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Paper 2 review: algorithm design and data structures** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Paper 2 review: algorithm design and data structures** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Paper 2 review: Sections 9-12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction. For this lesson, make students contrast that mistake with the exact idea of **paper 2 review: algorithm design and data structures**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Good pseudocode is precise enough to trace

- **Explains:** `algorithms`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-algorithms.jpg`

1. Algorithm design review
2. State the data being read, such as target name, score list or file record.
3. Use sequence, selection and iteration with clear variable updates.
4. State exactly what is displayed, returned or stored.

### Persistent data needs clear read/write logic

- **Explains:** `files`
- **Explanation type:** synthesis
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-structure-tool.jpg`

1. Data structure chooser
2. Scenario

### Choose structures by how the data is used

- **Explains:** `structures`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-structures.jpg`

1. Data structures review
2. Structure
3. Use when
4. Core operation
5. 1D array
6. fixed list of same-type items
7. index access
8. forgetting bounds
9. 2D array
10. table/grid data
11. row and column access
12. mixing row and column

### Calculate Total for the selected score list

- **Explains:** `trace-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-147-trace-tool.jpg`

1. Interactive trace tool
<!-- stage10-explanations:end -->
