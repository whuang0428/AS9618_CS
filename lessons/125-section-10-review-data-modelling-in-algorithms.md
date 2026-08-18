# Lesson 125: Section 10 review: data modelling in algorithms

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz, stage review

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Section 10 review: data modelling in algorithms** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Put three deliberately mixed questions on the board and ask students to identify the topic before answering. The first skill in a review lesson is knowing which mental toolbox to open.

Lesson-specific focus question: What would go wrong if a student confused **Section 10 review: data modelling in algorithms** with a neighbouring syllabus idea?

## Guided Explanation
Use Section 10 review: data modelling in algorithms to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Topic-specific teaching move: keep the explanation anchored to **Section 10 review: data modelling in algorithms**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks. The worked example must explicitly use **Section 10 review: data modelling in algorithms**, not a generic example from the wider unit.

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
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version. Their final answer must include the phrase **Section 10 review: data modelling in algorithms** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Section 10 review: data modelling in algorithms**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Section 10 review: data modelling in algorithms** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Section 10 review: data modelling in algorithms** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction. For this lesson, make students contrast that mistake with the exact idea of **section 10 review: data modelling in algorithms**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Order of removal is the key clue

- **Explains:** `adts`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-adts.jpg`

1. Stack and queue review
2. Typical operations
3. Scenario clue
4. LIFO: Last In, First Out
5. PUSH, POP, PEEK
6. undo, backtracking, nested calls
7. FIFO: First In, First Out
8. ENQUEUE, DEQUEUE
9. print jobs, calls, waiting line

### A good answer names the structure and the reason

- **Explains:** `decision`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-decision.jpg`

1. Data model decision
2. Scenario
3. A school stores 120 students. Each student has an ID, name, class group and average mark.
4. Strong choice
5. Use an array of records: the array stores many students; each record keeps fields for one student together.
6. Why not just an array?
7. A single array normally stores one type of value. A record is better when one logical item has different fields.
8. Mark-worthy pattern: structure + scenario clue + consequence .

### Cambridge pseudocode remains the exam standard

- **Explains:** `declare`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-declare.jpg`

1. Declaration review
2. Cambridge-style pseudocode
3. TYPE TStudent
4. DECLARE ID : STRING
5. DECLARE Name : STRING
6. DECLARE Mark : INTEGER
7. DECLARE Students : ARRAY[1:120] OF TStudent
8. Java support only
9. class Student {
10. String id;
11. String name;
12. int mark;

### Files preserve data beyond the running program

- **Explains:** `files`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-files.jpg`

1. File handling review
2. Line-based read pattern
3. OPENFILE "Scores.csv" FOR READ
4. WHILE NOT EOF("Scores.csv")
5. READFILE "Scores.csv", Line
6. // process Line
7. ENDWHILE
8. CLOSEFILE "Scores.csv"
9. CSV processing idea
10. Line <- "S017,Ava,82"
11. Fields <- SPLIT(Line, ",")
12. StudentID <- Fields[1]

### Turn a weak answer into a useful answer

- **Explains:** `improver`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-improver.jpg`

1. Mark improver
2. Weak answer
3. Pick a weak answer to see a mark-worthy rewrite.

### Section 10 in one review grid

- **Explains:** `map`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-map.jpg`

1. Retrieval map
2. Best clue
3. Exam action
4. Common weak answer
5. many values of the same type
6. declare bounds, loop over indexes
7. "list of data"
8. one item has several fields
9. declare TYPE, fields and variables
10. "array with different things"
11. Array of records
12. many items, each with fields

### Upgrade vague words into credit-bearing words

- **Explains:** `marks`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-125-marks.jpg`

1. Mark-scheme language
2. Weak wording
3. Stronger wording
4. Why it earns more
5. It is better.
6. It keeps all fields for one student together.
7. names the consequence
8. It is ordered.
9. A queue removes items in the same order they arrived.
10. states FIFO clearly
11. Use a file.
12. Use a text file so data remains after the program closes.
<!-- stage10-explanations:end -->
