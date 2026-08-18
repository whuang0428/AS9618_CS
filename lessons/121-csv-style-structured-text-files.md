# Lesson 121: CSV-style structured text files

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **CSV-style structured text files** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: If the program forgets everything when it closes, is it a program or a very confident goldfish? Then introduce files as persistent storage.

Lesson-specific focus question: What would go wrong if a student confused **CSV-style structured text files** with a neighbouring syllabus idea?

## Guided Explanation
Show the lifecycle of file data: open, read or write, process, close. For CSV-style structured text files, distinguish the stored text from the variables used while processing it. Include one failure case such as missing file or malformed line.

Topic-specific teaching move: keep the explanation anchored to **CSV-style structured text files**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: file contents. Middle: read/write pseudocode. Right: validation and close-file reminders.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Read records from a text file, process a value, and write a result or updated line. The worked example must explicitly use **CSV-style structured text files**, not a generic example from the wider unit.

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
Students design a small text file format for scores or stock items, then write pseudocode to read one record. Their final answer must include the phrase **CSV-style structured text files** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **CSV-style structured text files**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **CSV-style structured text files** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **CSV-style structured text files** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing. For this lesson, make students contrast that mistake with the exact idea of **csv-style structured text files**.  
Correction prompt: "Show the mechanism, not just the label."

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

1. Text vs data types
2. Incorrect comparison
3. IF Fields[3] > 70 THEN
4. OUTPUT Name
5. This compares text unless conversion has happened.
6. Correct pattern
7. Mark <- STRING_TO_INTEGER(Fields[3])
8. IF Mark > 70 THEN
9. The numeric comparison now has a numeric value.

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
