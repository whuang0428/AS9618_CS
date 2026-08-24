# Lesson 121: CSV-style structured text files

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the file organisation or operations involved in **CSV-style structured text files**.
2. Write Cambridge pseudocode that opens, processes and closes a file correctly.
3. Identify and correct an inappropriate file mode or processing step.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask what happens to data held only in variables when a program closes. Use the answer to introduce files as persistent storage.

Focus question: Which feature distinguishes **CSV-style structured text files** from the most closely related syllabus concept?

## Guided Explanation
Show the lifecycle of file data: open, read or write, process, close. For CSV-style structured text files, distinguish the stored text from the variables used while processing it. Include one failure case such as missing file or malformed line.

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
- Answer one 4-mark question about **CSV-style structured text files**. Follow its command word and apply each point to the stated context.

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

### CSV-style means separated fields in a fixed order

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-concept.jpg`

1. one complete line of data
2. S001,Ali,72
3. one item inside the record
4. Delimiter
5. character that separates fields
6. Fixed order
7. each position has agreed meaning
8. ID, Name, Mark

### Design the format before writing code

- **Explains:** `format`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-format.jpg`

1. CSV format
2. Position
3. Field name
4. Data type after conversion
5. StudentID
6. The file stores all fields as text. The program gives each position meaning.

### Read the line before splitting it

- **Explains:** `parse`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-parse.jpg`

1. Parse fields
2. READFILE "Scores.csv", Line
3. Fields <- SPLIT(Line, ",")
4. StudentID <- Fields[1]
5. Name <- Fields[2]
6. Mark <- STRING_TO_INTEGER(Fields[3])
7. SPLIT is used here as clear Cambridge-style pseudocode for separating a line by a delimiter.

### Split a line into fields

- **Explains:** `parser`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-parser.jpg`

1. Interactive CSV parser
2. CSV line
3. Delimiter
4. Enter a line and split it into fields.

### Java split helps understanding, but Cambridge pseudocode remains the answer format

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-pseudocode.jpg`

1. Pseudocode vs Java
2. Cambridge-style pseudocode
3. READFILE "Scores.csv", Line
4. Fields <- SPLIT(Line, ",")
5. Mark <- STRING_TO_INTEGER(Fields[3])
6. Java support only
7. String[] fields = line.split(",");
8. int mark = Integer.parseInt(fields[2]);
9. Notice the index difference: Cambridge-style examples here use Fields[1] ; Java arrays are zero-based.

### CSV fields arrive as text, then become useful values

- **Explains:** `types`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-types.jpg`

1. CSV fields arrive as text.
2. Close every IF example with ENDIF.
3. Convert the mark field to INTEGER before comparing it numerically with 70.
4. Structural closure and type conversion solve different problems.

### A structured file can still contain bad lines

- **Explains:** `validate`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-validate.jpg`

1. Validation
2. Correction prompt
3. S003,Chen
4. missing Mark field
5. check field count before using Fields[3]
6. S004,Dina,Ninety
7. mark is not numeric
8. validate before converting to INTEGER
9. S005;Eli;88
10. wrong delimiter
11. use the delimiter specified by the format

### Check field count and mark type

- **Explains:** `validator`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-121-validator.jpg`

1. Interactive validator
2. Choose a sample line to validate.
<!-- stage10-explanations:end -->
