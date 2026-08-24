# Lesson 148: Paper 2 review: programming constructs and file handling

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Paper 2 review: Sections 9-12  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Paper 2 review: programming constructs and file handling**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- dry run 手工运行, boundary test 边界测试, modularity 模块化, syntax 语法

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Paper 2 review: programming constructs and file handling** from the most closely related syllabus concept?

## Guided Explanation
Use Paper 2 review: programming constructs and file handling to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

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
- Answer one 4-mark question about **Paper 2 review: programming constructs and file handling**. Follow its command word and apply each point to the stated context.

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

### Identify the construct from the scenario

- **Explains:** `construct-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-construct-tool.jpg`

1. Interactive construct tool
2. Scenario

### Constructs control the order in which statements run

- **Explains:** `constructs`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-constructs.jpg`

1. Programming constructs
2. Construct
3. Cambridge-style signal
4. Common error
5. Sequence
6. statements run in order
7. one statement after another
8. assuming hidden jumps
9. Selection
10. choose a branch
11. IF / ELSE / CASE
12. missing ELSE or ENDIF

### Choose READ, WRITE or APPEND

- **Explains:** `file-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-file-tool.jpg`

1. File mode chooser

### Open the file in the correct mode, process records, then close it

- **Explains:** `files`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-files.jpg`

1. File handling review
2. Read pattern
3. OPENFILE "Scores.txt" FOR READ
4. WHILE NOT EOF("Scores.txt")
5. READFILE "Scores.txt", Line
6. OUTPUT Line
7. ENDWHILE
8. CLOSEFILE "Scores.txt"
9. Append pattern
10. OPENFILE "Scores.txt" FOR APPEND
11. WRITEFILE "Scores.txt", NewScore
12. APPEND preserves existing records. WRITE is usually for creating or replacing file contents.

### Choose the loop by what is known before the loop starts

- **Explains:** `iteration`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-iteration.jpg`

1. Iteration review
2. Use when
3. number of repetitions is known
4. process 30 scores
5. condition is checked before each repetition
6. read until end of file
7. REPEAT UNTIL
8. body must run at least once
9. keep asking until valid input
10. Boundary warning: if a loop says 1 to 5, there are five iterations. The loop counter is not just decorative furniture.

### Use IF for decisions, CASE for clean multi-way choices

- **Explains:** `selection`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-selection.jpg`

1. Selection review
2. IF example
3. IF Mark >= 50 THEN
4. OUTPUT "Pass"
5. OUTPUT "Resit needed"
6. CASE example
7. CASE MenuChoice OF
8. 1 : CALL AddScore()
9. 2 : CALL DisplayScores()
10. 3 : CALL SaveScores()
11. OTHERWISE : OUTPUT "Invalid choice"

### Subprograms reduce repetition and make code testable

- **Explains:** `subprograms`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-subprograms.jpg`

1. Procedures and functions
2. Procedure
3. PROCEDURE DisplayMessage(Message : STRING)
4. OUTPUT Message
5. ENDPROCEDURE
6. A procedure performs an action and does not have to return a value.
7. Function
8. FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
9. IF Mark >= 0 AND Mark <= 100 THEN
10. RETURN TRUE
11. RETURN FALSE
12. ENDFUNCTION

### Validation rejects unsuitable input before it damages the logic

- **Explains:** `validation`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-148-validation.jpg`

1. Validation review
2. Range check
3. value is between limits
4. mark from 0 to 100 inclusive
5. Type check
6. value has expected data type
7. mark must be integer
8. Presence check
9. value is not blank
10. student name required
11. Length check
12. value has correct number of characters
<!-- stage10-explanations:end -->
