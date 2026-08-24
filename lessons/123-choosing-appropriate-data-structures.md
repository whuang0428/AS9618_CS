# Lesson 123: Choosing appropriate data structures

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Choosing appropriate data structures**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Choosing appropriate data structures** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Choosing appropriate data structures, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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
- Answer one 4-mark question about **Choosing appropriate data structures**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

## Stage 2 syllabus completion

**Official audit rows:** S10.09, S10.10
**Focus:** Choosing stack, queue or linked list

### Direct explanation

- A stack is LIFO with push/pop at the top; a queue is FIFO with enqueue at the rear and dequeue at the front; a linked list supports traversal and insertion/deletion through links.
- Justification must name the required access order or update behaviour. Array implementations have fixed capacity unless resized and require overflow/underflow checks; linked structures require pointer management.

### Worked example

**Choose structures:** Undo history uses a stack because the most recent action is undone first. Print jobs use a queue because the earliest accepted job prints first. A changing ordered playlist can use a linked list for link-based insertion/deletion.

### Targeted practice and answers

1. Choose an ADT for breadth-first waiting jobs.
   **Answer:** Queue, because first in is first out.
2. Choose an ADT for nested function return addresses.
   **Answer:** Stack, because the most recent call returns first.
3. What must be checked before pushing to a full array stack?
   **Answer:** Overflow/capacity.

### Exam-style question and MS

**Question (4 marks):** Justify a suitable ADT for browser Back history and contrast it with a queue.

- **B1** selects stack
- **B1** most recently visited page is returned to first / LIFO
- **B1** queue removes earliest item first / FIFO
- **B1** explains why FIFO gives the wrong access order

**Strict note:** Do not award the structure name without its access-order consequence.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Use ADTs when the removal rule matters

- **Explains:** `adt`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-adt.jpg`

1. Stack and queue
2. Scenario clue
3. Structure
4. undo last action
5. most recent action is reversed first
6. print jobs in arrival order
7. first job submitted should print first
8. customer service line
9. fair FIFO order

### Use arrays for many similar values accessed by index

- **Explains:** `array`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-array.jpg`

1. DECLARE Scores : ARRAY[1:30] OF INTEGER
2. FOR Index <- 1 TO 30
3. Total <- Total + Scores[Index]
4. NEXT Index
5. Good reason: all elements are INTEGER scores and can be traversed using an index.

### Start with the data and operations, not the keyword

- **Explains:** `criteria`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-criteria.jpg`

1. Selection criteria
2. Question to ask
3. Why it matters
4. Likely structure
5. Are there many values of the same type?
6. indexed traversal/search
7. Does one item have several named fields?
8. mixed types and meaningful field names
9. Are there many entities with the same fields?
10. repeat a record shape
11. Array of records
12. Must the data survive after the program ends?

### Match scenario evidence to structure features

- **Explains:** `decision`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-decision.jpg`

1. Decision table
2. Do not choose just because...
3. calculate average of 50 readings
4. array of REAL
5. records sound more advanced
6. store one book's ISBN, title and pages
7. ISBN has digits
8. store 200 books with same fields
9. array of records
10. one record is not enough
11. save transactions for next run
12. text/CSV file

### Use files when data must persist or be exchanged

- **Explains:** `file`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-file.jpg`

1. OPENFILE "Scores.csv" FOR APPEND
2. WRITEFILE "Scores.csv", NewLine
3. CLOSEFILE "Scores.csv"
4. Good reason: the data must be stored after the program has finished, so memory-only structures are not enough.

### Cambridge answers should justify the structure, not advertise a Java class

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style modelling
3. TYPE TBook
4. DECLARE ISBN : STRING
5. DECLARE Title : STRING
6. DECLARE Pages : INTEGER
7. DECLARE Books : ARRAY[1:200] OF TBook
8. Java support only
9. class Book {
10. String isbn;
11. String title;
12. int pages;

### Spot the answer that would earn marks

- **Explains:** `ranker`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-ranker.jpg`

1. Reason ranker
2. Choose the answer with scenario evidence and consequence.

### Use records when named fields belong to one entity

- **Explains:** `record`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-record.jpg`

1. Record / array of records
2. One student
3. TYPE TStudent
4. DECLARE Name : STRING
5. DECLARE Mark : INTEGER
6. DECLARE Present : BOOLEAN
7. Many students
8. DECLARE Students : ARRAY[1:28] OF TStudent
9. OUTPUT Students[1].Name
<!-- stage10-explanations:end -->
