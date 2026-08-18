# Lesson 139: Robust program design: validation and modularity

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Robust program design: validation and modularity** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Robust program design: validation and modularity** with a neighbouring syllabus idea?

## Guided Explanation
For Robust program design: validation and modularity, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Robust program design: validation and modularity**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Robust program design: validation and modularity**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Robust program design: validation and modularity** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Robust program design: validation and modularity**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Robust program design: validation and modularity** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Robust program design: validation and modularity** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **robust program design: validation and modularity**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Pick the check that matches the rule

- **Explains:** `checks`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-checks.jpg`

1. Validation check types
2. Range check
3. value inside limits
4. 0 to 100
5. Type check
6. correct data type
7. INTEGER mark
8. "banana"
9. Length check
10. correct number of characters
11. password 8 to 20
12. short or very long password

### Validation and modularity support each other

- **Explains:** `integration`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-integration.jpg`

1. Combine ideas
2. Function example
3. FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
4. IF Mark >= 0 AND Mark <= 100 THEN
5. RETURN TRUE
6. RETURN FALSE
7. ENDFUNCTION
8. Why this is robust
9. The validation rule is written once and can be tested separately. Other code can call the function instead of repeating the condition.

### Java methods can model modularity, but Cambridge pseudocode remains the exam format

- **Explains:** `java`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
4. RETURN Mark >= 0 AND Mark <= 100
5. ENDFUNCTION
6. Java support example only
7. static boolean isValidMark(int mark) {
8. return mark >= 0 && mark <= 100;
9. Use Java to practise running code, but use Cambridge-style pseudocode when the exam asks for algorithm design.

### Modular design splits a solution into smaller named parts

- **Explains:** `modularity`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-modularity.jpg`

1. Modularity
2. Less robust structure
3. All input, validation, calculation and output in one long block. Harder to test, reuse and debug.
4. More robust structure
5. Mark <- GetValidMark()
6. Grade <- CalculateGrade(Mark)
7. OUTPUT Grade

### Choose a module for each responsibility

- **Explains:** `module-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-module-tool.jpg`

1. Module chooser
2. Responsibility

### Pass data into a module and return only what is needed

- **Explains:** `parameters`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-parameters.jpg`

1. Parameters and return values
2. Responsibility
3. Returns / effect
4. GetValidMark()
5. input and validate mark
6. valid integer mark
7. CalculateGrade(Mark)
8. turn mark into grade
9. grade character/string
10. DisplayResult(Grade)
11. format output
12. output to screen

### A robust program handles expected misuse without collapsing

- **Explains:** `robust`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-robust.jpg`

1. Robust design
2. Input checks
3. Reject or handle invalid values before they affect processing.
4. Clear modules
5. Give each procedure or function one focused responsibility.
6. Useful messages
7. Tell the user what is wrong and what valid input is expected.

### Validation checks whether data is acceptable for the program

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-validation.jpg`

1. Validation
2. Cambridge-style pseudocode
3. INPUT Mark
4. IF Mark >= 0 AND Mark <= 100 THEN
5. Valid <- TRUE
6. OUTPUT "Enter a mark from 0 to 100"
7. Valid <- FALSE
8. UNTIL Valid = TRUE
9. Reasoning
10. The loop repeats until acceptable data is entered. The program does not calculate a grade from invalid data.
11. Robustness is not guessing what the user meant. It is refusing bad data with a calm face.

### Check whether a mark input is robustly acceptable

- **Explains:** `validator`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-validator.jpg`

1. Interactive validator
<!-- stage10-explanations:end -->
