# Lesson 120: Why files are needed and how text-file pseudocode works

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Why files are needed and how text-file pseudocode works

### Direct explanation

- Variables, arrays and records in main memory normally lose their contents when a program ends or power is removed. Files provide persistent storage so data can be reloaded by a later run, transferred or shared as required. A file is not merely a larger array.
- For a text file containing one or more lines, select the mode before processing: READ obtains existing data, WRITE creates or replaces output content, and APPEND adds after existing content. Every opened file must be closed after processing.
- A complete read algorithm uses OPENFILE for READ, checks NOT EOF before READFILE, processes each line and then CLOSEFILE. WRITEFILE stores a line in a file opened for WRITE or APPEND. Reading after EOF or using WRITE when old content must remain are boundary errors.

### Worked example

**Copy selected lines between text files:** Open Results.txt FOR READ and Pass.txt FOR WRITE. While NOT EOF(Results.txt), READFILE the next Line; if it contains PASS, WRITEFILE it to Pass.txt. Close both files after the loop. Results remain available from storage, while Pass.txt is deliberately created as a new output file.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why use a file instead of only an array?
   **Answer:** A file persists after the program ends and can be reloaded in a later run.
2. Which mode adds without replacing old lines?
   **Answer:** APPEND.
3. Why test NOT EOF before READFILE?
   **Answer:** It prevents an attempt to read beyond the final available line.

### Exam-style question and MS

**Question (6 marks):** Write Cambridge pseudocode to read every line from Input.txt, copy non-blank lines to Output.txt and close both files. Explain why the input data is stored in a file.

| Answer | Guidance | Marks |
|---|---|---:|
| persistent/later-use need for the input file | Do not test EOF after an invalid read or claim that WRITE preserves existing output-file contents. | 1 |
| opens Input.txt FOR READ |  | 1 |
| opens Output.txt FOR WRITE |  | 1 |
| loops WHILE NOT EOF before READFILE |  | 1 |
| writes only non-blank lines inside a coherent IF |  | 1 |
| closes both files after the loop |  | 1 |
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
1. Select and declare a suitable structure for **Arrays of records**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Arrays of records** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Arrays of records, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

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
- Answer one 4-mark question about **Arrays of records**. Follow its command word and apply each point to the stated context.

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

### Index first, then field name

- **Explains:** `access`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-access.jpg`

1. Access pattern
2. Pseudocode
3. Read one field
4. OUTPUT Students[3].Name
5. name field of record 3
6. Update one field
7. Students[3].Mark <- 80
8. mark field of record 3
9. Test one field
10. IF Students[Index].Enrolled = TRUE THEN
11. Boolean field in current record

### One array, many records, same record shape

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-concept.jpg`

1. Students[5] selects the complete record at array position 5.
2. Students[5].Mark selects the Mark field in that record.
3. Array indexing and record field selection are separate operations.

### Define the record type, then declare the array

- **Explains:** `declare`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-declare.jpg`

1. TYPE TStudent
    DECLARE Name : STRING
    DECLARE Mark : INTEGER
ENDTYPE
2. DECLARE Students : ARRAY[1:30] OF TStudent
This declaration follows ENDTYPE.
3. The record type and the array declaration are separate declarations.

### Read a field from a selected record

- **Explains:** `explorer`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-explorer.jpg`

1. Interactive record explorer
2. Record index
3. Choose an index and a field to read from the array of records.

### Search, count and update fields

- **Explains:** `operations`
- **Explanation type:** process
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-operations.jpg`

1. Search, count and update are alternative record operations, not mandatory consecutive stages.
2. A search condition locates a matching record and outputs its position or details.
3. A count condition increments a counter for qualifying records.
4. An update condition changes the required field of qualifying records.

### Same structure, different syntax

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. DECLARE Students : ARRAY[1:30] OF TStudent
4. FOR Index <- 1 TO 30
5. OUTPUT Students[Index].Name
6. NEXT Index
7. Java support only
8. Student[] students = new Student[30];
9. for (int index = 0; index < 30; index++) {
10. System.out.println(students[index].name);
11. Paper 2 reminder: Java arrays are often zero-based. Cambridge pseudocode ranges follow the declaration shown in the question.

### Cambridge pseudocode is the exam answer format

- **Explains:** `pseudocode-121`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. OPENFILE "Scores.txt" FOR READ
4. WHILE NOT EOF("Scores.txt")
5. READFILE "Scores.txt", Line
6. OUTPUT Line
7. ENDWHILE
8. CLOSEFILE "Scores.txt"
9. Java support only
10. try (Scanner file = new Scanner(new File("Scores.txt"))) {
11. while (file.hasNextLine()) {
12. String line = file.nextLine();

### A loop visits each record; field access uses the loop index

- **Explains:** `traversal`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-traversal.jpg`

1. Use Index to select each Students record in turn.
2. Test the Mark field of the current record.
3. Output the Name field only when Mark is at least 70.
4. Close the selection with ENDIF before NEXT Index.
<!-- stage10-explanations:end -->
