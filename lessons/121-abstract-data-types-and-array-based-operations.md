# Lesson 121: Abstract data types and array-based operations

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Abstract data types and array-based operations

### Direct explanation

- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- Justify a stack, queue or linked list from its operations and the scenario. Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.

### Worked example

**Add, edit and delete without changing the ADT rule:** Push D adds D at the stack top and pop deletes the current top. Enqueue D adds at the queue rear and dequeue deletes from the front. In an array-based linked list, edit Data[5] to change only the node value; insert or delete by changing Next indexes, Start and the free list rather than shifting every later array item.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Give the official definition of an ADT.
   **Answer:** A collection of data and a set of operations on those data.
2. How are stack and queue removal rules different?
   **Answer:** Stack removes the most recently added item (LIFO); queue removes the earliest added item (FIFO).
3. Which state is needed for an array-based linked list?
   **Answer:** Data and Next storage, a Start index and normally a free-list index.
4. Must candidates write pseudocode for stack, queue and linked-list operations?
   **Answer:** No. They must be able to add, edit and delete data and describe array implementations, but operation pseudocode is not required by the syllabus.

### Exam-style question and MS

**Question (6 marks):** For array implementations of a stack, queue and linked list, describe how data is added, edited and deleted while preserving each ADT's rule.

| Answer | Guidance | Marks |
|---|---|---:|
| stack push/pop uses the top position and stack pointer | Do not define an ADT as only an array, require ADT-operation pseudocode, or delete a linked-list node without repairing its links and free-list state. | 1 |
| queue enqueue/dequeue uses rear and front in FIFO order |  | 1 |
| linked-list add obtains a free index and changes links |  | 1 |
| edit changes a stored data field without corrupting order or links |  | 1 |
| linked-list delete bypasses the node and returns its index to the free list |  | 1 |
| distinguishes conceptual operations from the non-required task of writing their pseudocode |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the file organisation or operations involved in **Text files: reading, writing, and appending**.
2. Write Cambridge pseudocode that opens, processes and closes a file correctly.
3. Identify and correct an inappropriate file mode or processing step.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask what happens to data held only in variables when a program closes. Use the answer to introduce files as persistent storage.

Focus question: Which feature distinguishes **Text files: reading, writing, and appending** from the most closely related syllabus concept?

## Guided Explanation
Show the lifecycle of file data: open, read or write, process, close. For Text files: reading, writing, and appending, distinguish the stored text from the variables used while processing it. Include one failure case such as missing file or malformed line.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: file contents. Middle: read/write pseudocode. Right: validation and close-file reminders.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Read records from a text file, process a value, and write a result or updated line.

**Worked answer / marking focus:** Credit correct open mode, loop through records, parsing or assignment, and closing the file. For CSV-style data, fields must be separated consistently.

```text
// Cambridge-style pseudocode
OPENFILE "Scores.txt" FOR READ
WHILE NOT EOF("Scores.txt")
    READFILE "Scores.txt", Line
    OUTPUT Line
ENDWHILE
CLOSEFILE "Scores.txt"
```

```java
// Java support example only, not exam pseudocode
try (Scanner file = new Scanner(new File("Scores.txt"))) {
    while (file.hasNextLine()) {
        System.out.println(file.nextLine());
    }
}
```

## Student Task
Students design a small text file format for scores or stock items, then write pseudocode to read one record.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Text files: reading, writing, and appending**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A text file stores characters, usually processed one line at a time

- **Explains:** `concept`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-concept.jpg`

1. Exam clue
2. Text file
3. file containing character data
4. "Scores.txt"
5. get data from an existing file
6. FOR READ
7. store data to a file, often replacing previous contents
8. FOR WRITE
9. add data to the end of an existing file
10. FOR APPEND

### An ADT is data together with permitted operations

- **Explains:** `concept-123`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-concept.jpg`

1. An abstract data type is a collection of data and a set of operations on those data.
2. Stack, queue and linked list are examples whose permitted operations define their behaviour.
3. The implementation may use arrays and indexes without changing the ADT's observable rules.
- **Analogy:** A service counter defines allowed requests without exposing the storeroom layout.
- **Boundary:** Using an array does not automatically make a structure a stack or queue.

### Implement stack, queue and linked list using arrays

- **Explains:** `implementation`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-implementation.jpg`

1. An array stack uses Top; a queue uses Front and Rear; a linked list uses Data, Next, Start and a free list.
2. Add/delete preserve stack LIFO, queue FIFO and linked-list links; edit changes stored data without corrupting structure.
3. Candidates are not required to write pseudocode for these ADT operations; understand add, edit, delete and array implementation.
- **Analogy:** Markers turn a row of storage boxes into a controlled service structure.
- **Boundary:** Incorrect wrap-around or update order can overwrite live queue data.

### Open, process, close

- **Explains:** `lifecycle`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-lifecycle.jpg`

1. File lifecycle
2. 1. Open choose READ, WRITE or APPEND
3. 2. Process READFILE or WRITEFILE using variables
4. 3. Close release the file and finalise changes
5. A file algorithm without CLOSEFILE is like leaving the exam hall without submitting the answer booklet.

### Choose the correct file mode

- **Explains:** `mode-lab`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-mode-lab.jpg`

1. Interactive mode lab
2. Scenario
3. Choose a scenario and a mode.

### Choose the mode before touching the file

- **Explains:** `modes`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-modes.jpg`

1. File modes
2. Use when
3. Risk if wrong
4. existing file contents are needed
5. cannot write new lines
6. creating/replacing output contents
7. old contents may be overwritten
8. adding new data to the end
9. old lines remain, so duplicates are possible

### Why two ends create FIFO

- **Explains:** `queue`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-queue.jpg`

1. Enqueue adds a new item at the rear.
2. Dequeue removes the waiting item at the front.
3. Earlier arrivals remain ahead of later arrivals.
- **Analogy:** A single orderly waiting line serves the earliest arrival first.
- **Boundary:** A priority queue follows a different removal rule and is not ordinary FIFO.

### Use EOF so the loop stops at the end of the file

- **Explains:** `read`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-read.jpg`

1. Read loop
2. OPENFILE "Scores.txt" FOR READ
3. WHILE NOT EOF("Scores.txt")
4. READFILE "Scores.txt", Line
5. OUTPUT Line
6. ENDWHILE
7. CLOSEFILE "Scores.txt"
8. The file line is read into Line . Only after that can the program output, split or validate it.

### Step through a WHILE NOT EOF loop

- **Explains:** `reader`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-reader.jpg`

1. Open the file for reading before entering the loop.
2. Check NOT EOF before attempting READFILE.
3. When more data exists, read and process the next line.
4. When EOF is true, skip READFILE, leave the loop and close the file.

### A text line often represents one record

- **Explains:** `records`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-records.jpg`

1. Text records
2. In simple exam-style examples, one line may contain fields separated by a comma. The delimiter must be consistent.
3. Name = Ali
4. Mark = 72
5. Name = Bea
6. Mark = 64

### Why one open end creates LIFO

- **Explains:** `stack`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-stack.jpg`

1. Push adds the new item at the top position.
2. Only the current top item is available to pop.
3. The most recently pushed item therefore leaves first.
- **Analogy:** Only the top plate of a pile can be removed safely.
- **Boundary:** Accessing an older item requires removing items above it first.

### Write creates a new result; append adds to the existing story

- **Explains:** `write`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-write.jpg`

1. Write and append
2. Write a new report
3. OPENFILE "Report.txt" FOR WRITE
4. WRITEFILE "Report.txt", "Pass count: " & Count
5. CLOSEFILE "Report.txt"
6. Append a new score
7. OPENFILE "Scores.txt" FOR APPEND
8. WRITEFILE "Scores.txt", "Dina,91"
9. CLOSEFILE "Scores.txt"
<!-- stage10-explanations:end -->
