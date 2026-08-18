# Lesson 120: Text files: reading, writing, and appending

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 10  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Text files: reading, writing, and appending** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask: If the program forgets everything when it closes, is it a program or a very confident goldfish? Then introduce files as persistent storage.

Lesson-specific focus question: What would go wrong if a student confused **Text files: reading, writing, and appending** with a neighbouring syllabus idea?

## Guided Explanation
Show the lifecycle of file data: open, read or write, process, close. For Text files: reading, writing, and appending, distinguish the stored text from the variables used while processing it. Include one failure case such as missing file or malformed line.

Topic-specific teaching move: keep the explanation anchored to **Text files: reading, writing, and appending**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Read records from a text file, process a value, and write a result or updated line. The worked example must explicitly use **Text files: reading, writing, and appending**, not a generic example from the wider unit.

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
Students design a small text file format for scores or stock items, then write pseudocode to read one record. Their final answer must include the phrase **Text files: reading, writing, and appending** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Text files: reading, writing, and appending**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Text files: reading, writing, and appending** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Text files: reading, writing, and appending** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing. For this lesson, make students contrast that mistake with the exact idea of **text files: reading, writing, and appending**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### A text file stores characters, usually processed one line at a time

- **Explains:** `concept`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-concept.jpg`

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

### Open, process, close

- **Explains:** `lifecycle`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-lifecycle.jpg`

1. File lifecycle
2. 1. Open choose READ, WRITE or APPEND
3. 2. Process READFILE or WRITEFILE using variables
4. 3. Close release the file and finalise changes
5. A file algorithm without CLOSEFILE is like leaving the exam hall without submitting the answer booklet.

### Choose the correct file mode

- **Explains:** `mode-lab`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-mode-lab.jpg`

1. Interactive mode lab
2. Scenario
3. Choose a scenario and a mode.

### Choose the mode before touching the file

- **Explains:** `modes`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-modes.jpg`

1. File modes
2. Use when
3. Risk if wrong
4. existing file contents are needed
5. cannot write new lines
6. creating/replacing output contents
7. old contents may be overwritten
8. adding new data to the end
9. old lines remain, so duplicates are possible

### Cambridge pseudocode is the exam answer format

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-pseudocode.jpg`

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

### Use EOF so the loop stops at the end of the file

- **Explains:** `read`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-read.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-reader.jpg`

1. Interactive read trace
2. File is open. No line has been read yet.

### A text line often represents one record

- **Explains:** `records`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-records.jpg`

1. Text records
2. In simple exam-style examples, one line may contain fields separated by a comma. The delimiter must be consistent.
3. Name = Ali
4. Mark = 72
5. Name = Bea
6. Mark = 64

### Write creates a new result; append adds to the existing story

- **Explains:** `write`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-120-write.jpg`

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
