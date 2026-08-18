# Lesson 140: Converting Java habits into Cambridge pseudocode

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz, monthly assessment checkpoint

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Converting Java habits into Cambridge pseudocode** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Converting Java habits into Cambridge pseudocode** with a neighbouring syllabus idea?

## Guided Explanation
For Converting Java habits into Cambridge pseudocode, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Converting Java habits into Cambridge pseudocode**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: construct purpose. Middle: Cambridge pseudocode. Right: Java comparison and trace.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Converting Java habits into Cambridge pseudocode**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit correct control flow, meaningful identifiers, correct parameter or variable use, and test data that actually exercises the construct.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Converting Java habits into Cambridge pseudocode** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Converting Java habits into Cambridge pseudocode**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Converting Java habits into Cambridge pseudocode** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Converting Java habits into Cambridge pseudocode** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **converting java habits into cambridge pseudocode**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S11.01
**Focus:** Translate descriptions into Cambridge pseudocode

### Direct explanation

- To translate a flowchart, follow arrows from Start, convert input/output symbols directly, convert diamonds into IF/CASE or loop conditions, and preserve every branch and reconnection. To translate structured English, identify its controlled verbs and indentation before selecting Cambridge constructs.
- The answer must be Cambridge pseudocode, not Java: use assignment arrow, THEN/ENDIF, FOR...NEXT, WHILE...ENDWHILE or REPEAT...UNTIL as appropriate. Trace both versions with the same data to confirm equivalence.

### Worked example

**Flowchart sum loop:** A flowchart sets Total to 0 and repeats input/add until Value = -1. Pseudocode uses Total <- 0; REPEAT; INPUT Value; IF Value <> -1 THEN Total <- Total + Value; ENDIF; UNTIL Value = -1; OUTPUT Total.

### Targeted practice and answers

1. How is a flowchart decision normally translated?
   **Answer:** As a selection or loop condition, depending on where arrows reconnect.
2. What check confirms a translation is equivalent?
   **Answer:** Dry-run both with the same inputs and compare outputs/control path.
3. Should Java braces appear in a Cambridge pseudocode answer?
   **Answer:** No; use Cambridge keywords and terminators.

### Exam-style question and MS

**Question (4 marks):** Write Cambridge pseudocode for: input five temperatures, count those below zero, output the count.

- **B1** initialises count to 0
- **M1** uses a five-iteration count-controlled loop with INPUT
- **M1** tests Temperature < 0 and increments count
- **A1** outputs count after the loop with coherent Cambridge syntax

**Strict note:** Do not accept Java syntax such as int, braces or System.out as Cambridge pseudocode.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Use Cambridge array notation consistently

- **Explains:** `arrays`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-arrays.jpg`

1. Java support example only
2. scores[0] = 72;
3. System.out.println(scores[0]);
4. Cambridge-style pseudocode
5. Scores[1] <- 72
6. OUTPUT Scores[1]
7. Cambridge examples often use 1-based indexing unless a question defines otherwise. Follow the question's stated indexing.

### Use the assignment arrow for storing a value

- **Explains:** `assignment`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-assignment.jpg`

1. Assignment
2. Java support example only
3. total = total + mark;
4. Cambridge-style pseudocode
5. Total <- Total + Mark
6. A single equals sign can be read as assignment in Java, but Cambridge pseudocode normally uses the left arrow.

### 5-minute quiz focus

- **Explains:** `checkpoint`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-checkpoint.jpg`

1. Monthly checkpoint
2. Conversion
3. Translate one Java selection, one loop and one output statement.
4. Explanation
5. Explain why Java syntax is support only, not the Paper 2 answer format.
6. Accuracy
7. Check that the algorithm meaning is unchanged after conversion.

### Replace library calls with algorithm keywords

- **Explains:** `io`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-io.jpg`

1. Input and output
2. Java support example only
3. Scanner input = new Scanner(System.in);
4. mark = input.nextInt();
5. System.out.println(mark);
6. Cambridge-style pseudocode
7. INPUT Mark
8. OUTPUT Mark

### Choose the loop keyword that matches the logic

- **Explains:** `loops`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-loops.jpg`

1. Java habit
2. Pseudocode form
3. for (int i = 1; i <= 5; i++)
4. known count
5. FOR I <- 1 TO 5
6. do not keep Java brackets
7. while (valid == false)
8. repeat while condition true
9. WHILE Valid = FALSE
10. end with ENDWHILE
11. do { ... } while (...)
12. post-condition loop

### Use IF , THEN , ELSE , ENDIF

- **Explains:** `selection`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-selection.jpg`

1. Selection
2. Java support example only
3. if (mark >= 50) {
4. System.out.println("Pass");
5. } else {
6. System.out.println("Resit needed");
7. Cambridge-style pseudocode
8. IF Mark >= 50 THEN
9. OUTPUT "Pass"
10. OUTPUT "Resit needed"

### Spot the Java-only syntax in an exam answer

- **Explains:** `spotter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-spotter.jpg`

1. Java spotter
2. Suspicious answer fragment

### Cambridge pseudocode uses readable algorithm keywords

- **Explains:** `standard`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-standard.jpg`

1. Exam standard
2. It is not Java with the class declaration removed. It has its own conventions for assignment, input/output, loops, selection and subroutines.
3. Java habit
4. Cambridge-style pseudocode
5. Assignment
6. total = total + mark;
7. Total <- Total + Mark
8. System.out.println(total);
9. OUTPUT Total
10. Selection
11. if (...) { ... }
12. IF ... THEN ... ENDIF

### Use PROCEDURE and FUNCTION instead of Java method wrappers

- **Explains:** `subroutines`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-140-subroutines.jpg`

1. Subroutines
2. Java support example only
3. static boolean isValidMark(int mark) {
4. return mark >= 0 && mark <= 100;
5. Cambridge-style pseudocode
6. FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
7. RETURN Mark >= 0 AND Mark <= 100
8. ENDFUNCTION
<!-- stage10-explanations:end -->
