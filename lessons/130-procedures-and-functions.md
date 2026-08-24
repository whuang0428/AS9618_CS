# Lesson 130: Procedures and functions

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Procedures and functions**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Procedures and functions** from the most closely related syllabus concept?

## Guided Explanation
For Procedures and functions, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
**Problem:** Write a procedure `DisplayMenu()` and a function `CalculateVAT(Price)`; explain the difference in return value.

**Worked answer / marking focus:** The procedure performs output and does not have to return a value. The function returns a calculated value, for example `Price * 0.2`.

```text
// Cambridge-style pseudocode
PROCEDURE DisplayMenu()
    OUTPUT "1. Add score"
    OUTPUT "2. Quit"
ENDPROCEDURE

FUNCTION CalculateVAT(Price : REAL) RETURNS REAL
    RETURN Price * 0.20
ENDFUNCTION
```

```java
// Java support example only, not exam pseudocode
static void displayMenu() {
    System.out.println("1. Add score");
    System.out.println("2. Quit");
}

static double calculateVAT(double price) {
    return price * 0.20;
}
```

## Student Task
Students convert two repeated code blocks into one procedure and one function, then label call, parameter and return value.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:  
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Procedures and functions**. Follow its command word and apply each point to the stated context.

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

### Function calls can appear where a value is needed

- **Explains:** `calls`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-calls.jpg`

1. Calls and returned values
2. CALL DisplayMenu()
3. procedure call performs an action
4. VAT <- CalculateVAT(Price)
5. function return value is stored
6. Total <- DisplayMenu()
7. procedure does not return a value
8. OUTPUT CalculateVAT(Price)
9. function return value can be output

### The mark-winning difference is the returned value

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-compare.jpg`

1. Procedure vs function
2. Procedure
3. Function
4. Main purpose
5. perform an action
6. return a value
7. PROCEDURE Name(...)
8. FUNCTION Name(...) RETURNS Type
9. End keyword
10. ENDPROCEDURE
11. ENDFUNCTION
12. Typical call

### A function returns a value to the caller

- **Explains:** `function`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-function.jpg`

1. Function
2. Cambridge-style pseudocode
3. FUNCTION CalculateVAT(Price : REAL) RETURNS REAL
4. RETURN Price * 0.20
5. ENDFUNCTION
6. VAT <- CalculateVAT(120.00)
7. When it fits
8. Use a function when a calculated, searched or checked result must be used later in the algorithm.
9. A function should have a return type and a RETURN statement that matches that type.

### Java method syntax is not Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. FUNCTION CalculateVAT(Price : REAL) RETURNS REAL
4. RETURN Price * 0.20
5. ENDFUNCTION
6. Java support example only
7. static double calculateVAT(double price) {
8. return price * 0.20;

### Parameters receive values passed into a subroutine

- **Explains:** `parameters`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-parameters.jpg`

1. A parameter is named in a subroutine header and receives an argument supplied at a call.
2. IsPass returns TRUE for marks at least 50 and FALSE otherwise.
3. Close each IF with ENDIF independently of ENDFUNCTION.

### A procedure performs actions and does not have to return a value

- **Explains:** `procedure`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-procedure.jpg`

1. Procedure
2. Cambridge-style pseudocode
3. PROCEDURE DisplayMenu()
4. OUTPUT "1. Add score"
5. OUTPUT "2. Quit"
6. ENDPROCEDURE
7. CALL DisplayMenu()
8. When it fits
9. Use a procedure when the algorithm needs an action such as output, input, updating a structure or repeated commands.
10. A procedure may change data, but it is not used as an expression like Total <- DisplayMenu() .

### Calculate a function return value

- **Explains:** `returner`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-130-returner.jpg`

1. Interactive return simulator
2. Use CalculateVAT(Price) to return Price * 0.20 .
<!-- stage10-explanations:end -->
