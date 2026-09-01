# Lesson 062: Why files are needed and text-file pseudocode

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.07<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Select and use appropriate types for a problem solution. The syllabus names integer, real, char, string, Boolean and date, and require the Cambridge pseudocode type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
- Understand integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.


## 2. Knowledge explanation

### 1. The need for files and use text-file pseudocode (S10.07)

**Atomic learning targets**

- **S10.07.A01:** files
- **S10.07.A02:** persistent
- **S10.07.A03:** text file
- **S10.07.A04:** pseudocode

**Core explanation**

- Variables, arrays and records in main memory normally lose their contents when a program ends or power is removed. Files provide persistent storage so data can be reloaded by a later run, transferred or shared as required. A file is not merely a larger array.
- For a text file containing one or more lines, select the mode before processing: READ obtains existing data, WRITE creates or replaces output content, and APPEND adds after existing content. Every opened file must be closed after processing.
- The need for files and use text-file pseudocode.
- For a text file containing one or more lines, select the mode before processing

**Mechanism or method**

1. **Identify the relevant condition or input** — Variables, arrays and records in main memory normally lose their contents when a program ends or power is removed.
2. **Trace how the process works** — Files provide persistent storage so data can be reloaded by a later run, transferred or shared as required.
3. **Connect the mechanism to its result** — A file is not merely a larger array.

#### Worked example: The need for files and use text-file pseudocode: complete worked route

1. **Identify the relevant condition or input**

Variables, arrays and records in main memory normally lose their contents when a program ends or power is removed.

2. **Trace how the process works**

Files provide persistent storage so data can be reloaded by a later run, transferred or shared as required.

3. **Connect the mechanism to its result**

A file is not merely a larger array.

4. **Complete example**

Copy selected lines between text files: Open Results.txt FOR READ and Pass.txt FOR WRITE.

**Misconceptions to correct**

- Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

#### Mastery check (MC-L062-S10.07)

Explain the following targets in one connected answer, using a concrete example for each: files; persistent; text file; pseudocode.

<details><summary>Answer criteria</summary>

- Variables, arrays and records in main memory normally lose their contents when a program ends or power is removed. Files provide persistent storage so data can be reloaded by a later run, transferred or shared as required. A file is not merely a larger array.
- For a text file containing one or more lines, select the mode before processing: READ obtains existing data, WRITE creates or replaces output content, and APPEND adds after existing content. Every opened file must be closed after processing.
- The need for files and use text-file pseudocode.
- For a text file containing one or more lines, select the mode before processing

</details>

**Supplementary concept map**

- **text file:** The need for files and use text-file pseudocode.
- **files:** Show why files are needed for persistent data…
- **persistent:** Files provide persistent storage so data can be…
- **pseudocode:** Pseudocode vs Java
- **need:** For a text file containing one or more…

**Supplementary three-step recap**

1. **Translate the stated design** — The need for files and use text-file pseudocode.
2. **Apply one complete operation** — Show why files are needed for persistent data beyond one program run, and write Cambridge pseudocode to handle…
3. **Trace state and boundaries** — For a text file containing one or more lines, select the mode before processing

**Cambridge pseudocode is the exam answer format:** Pseudocode vs Java Cambridge-style pseudocode

#### Cambridge pseudocode is the exam answer format

![Cambridge pseudocode is the exam answer format](../web/assets/diagrams/stage10-infographics/stage10-lesson-121-pseudocode.jpg)

<details><summary>Text transcript</summary>

- Pseudocode vs Java
- Cambridge-style pseudocode
- OPENFILE "Scores.txt" FOR READ
- WHILE NOT EOF("Scores.txt")
- READFILE "Scores.txt", Line
- OUTPUT Line
- ENDWHILE
- CLOSEFILE "Scores.txt"
- Java support only
- try (Scanner file = new Scanner(new File("Scores.txt"))) {
- while (file.hasNextLine()) {
- String line = file.nextLine();

</details>

<details><summary>Precise syllabus wording</summary>

Explain the need for files and use text-file pseudocode.

Show why files are needed for persistent data beyond one program run, and write Cambridge pseudocode to handle text files consisting of one or more lines, including opening, processing and closing in the correct mode.

</details>

### Lesson technical reference

- Show why files are needed for persistent data beyond one program run, and write Cambridge pseudocode to handle text files consisting of one or more lines, including opening, processing and closing in the correct mode.
- Variables, arrays and records in main memory normally lose their contents when a program ends or power is removed. Files provide persistent storage so data can be reloaded by a later run, transferred or shared as required. A file is not merely a larger array.
- For a text file containing one or more lines, select the mode before processing: READ obtains existing data, WRITE creates or replaces output content, and APPEND adds after existing content. Every opened file must be closed after processing.
- A complete read algorithm uses OPENFILE for READ, checks NOT EOF before READFILE, processes each line and then CLOSEFILE. WRITEFILE stores a line in a file opened for WRITE or APPEND. Reading after EOF or using WRITE when old content must remain are boundary errors.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - write - 6 marks

Write Cambridge pseudocode to read every line from Input.txt, copy non-blank lines to Output.txt and close both files. Explain why the input data is stored in a file.

**Answer:** persistent/later-use need for the input file; opens Input.txt FOR READ; opens Output.txt FOR WRITE; loops WHILE NOT EOF before READFILE; writes only non-blank lines inside a coherent IF; closes both files after the loop

**Marking guidance:** Do not test EOF after an invalid read or claim that WRITE preserves existing output-file contents.

**Common error:** For the command word write, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why use a file instead of only an array?

**Answer:** A file persists after the program ends and can be reloaded in a later run.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

Why test NOT EOF before READFILE?

**Answer:** It prevents an attempt to read beyond the final available line.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q5(b) | 8 | complete | recall |
| 9618/22/S/24 Q8(c) | 8 | give | write |
| 9618/23/S/24 Q2(a) | 5 | outline | explain |
| 9618/21/W/24 Q3(a) | 4 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S10.07: explain files, persistent, text file, pseudocode.
- S10.07 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For why files are needed and text-file pseudocode, use the exact technical term before applying it to the scenario.
