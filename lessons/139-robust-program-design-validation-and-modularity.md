# Lesson 139: Robust program design: validation and modularity

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Robust program design: validation and modularity**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Robust program design: validation and modularity** from the most closely related syllabus concept?

## Guided Explanation
For Robust program design: validation and modularity, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: construct purpose. Middle: Cambridge pseudocode. Right: Java comparison and trace.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Robust program design: validation and modularity**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

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

1. IsValidMark returns TRUE only for marks from 0 to 100 inclusive.
2. Close the valid branch with ENDIF before the false return.
3. Close the reusable function with ENDFUNCTION.
4. Call the function instead of repeating the validation condition.

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

1. GetValidMark inputs and validates a mark, then returns a valid INTEGER.
2. CalculateGrade receives Mark and returns a grade character.
3. DisplayResult is a procedure that performs OUTPUT and returns no value.
4. Return values and screen-output effects must not be conflated.

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

1. Place INPUT Mark inside REPEAT so every retry reads a new value.
2. Set Valid to TRUE only when Mark is between 0 and 100 inclusive.
3. Otherwise output the valid range, set Valid to FALSE and repeat.
4. Close the selection with ENDIF and terminate with UNTIL Valid = TRUE.

### Check whether a mark input is robustly acceptable

- **Explains:** `validator`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-validator.jpg`

1. Interactive validator
<!-- stage10-explanations:end -->
