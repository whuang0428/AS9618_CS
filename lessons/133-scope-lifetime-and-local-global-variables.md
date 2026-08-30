# Lesson 133: Scope, lifetime, and local/global variables

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Scope, lifetime, and local/global variables**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Scope, lifetime, and local/global variables** from the most closely related syllabus concept?

## Guided Explanation
For Scope, lifetime, and local/global variables, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
- Answer one 4-mark question about **Scope, lifetime, and local/global variables**. Follow its command word and apply each point to the stated context.

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

### Local and global variables differ by accessibility and lifetime

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-compare.jpg`

1. Local variable
2. Global variable
3. Declared
4. inside a subroutine or block
5. outside subroutines
6. limited to that subroutine or block
7. available more widely in the program
8. Lifetime
9. usually while the subroutine call is active
10. usually while the program is running
11. Main risk
12. using it outside scope

### Global variables are declared outside subroutines and can be accessed widely

- **Explains:** `global`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-global.jpg`

1. Global variables
2. Cambridge-style pseudocode
3. Total <- 0
4. PROCEDURE AddScore(Score : INTEGER)
5. Total <- Total + Score
6. ENDPROCEDURE
7. Reasoning
8. Total is declared outside the procedure, so it is global in this fragment.
9. Global variables can make updates convenient, but they can also make tracing harder because many parts of a program may change the value.

### Java helps illustrate scope, but Cambridge pseudocode remains the answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. PROCEDURE PrintLocal()
4. Value <- 7
5. OUTPUT Value
6. ENDPROCEDURE
7. Java support example only
8. static void printLocal() {
9. int value = 7;
10. System.out.println(value);
11. Do not answer Paper 2 with Java braces, semicolons or access modifiers unless the question specifically asks for Java.

### Lifetime means how long a variable exists during execution

- **Explains:** `lifetime`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-lifetime.jpg`

1. Lifetime
2. Main program starts global variables may be created and keep their values
3. Procedure is called local variables are created for that call
4. Procedure ends local variables are destroyed or become inaccessible
5. Main continues global variables still exist unless the program ends
6. A local variable's lifetime is usually one subroutine call. It is not a tiny global variable in disguise.

### Local variables are declared inside a subroutine or block

- **Explains:** `local`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-local.jpg`

1. Local variables
2. Cambridge-style pseudocode
3. PROCEDURE CalculateBonus(Mark : INTEGER)
4. Bonus <- Mark DIV 10
5. OUTPUT Bonus
6. ENDPROCEDURE
7. Reasoning
8. Mark parameter local to this procedure call
9. Bonus local variable used only inside the procedure
10. After call Bonus is not directly available in the main algorithm

### Scope means where a variable or identifier can be accessed

- **Explains:** `scope`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-scope.jpg`

1. Inside scope
2. PROCEDURE DisplayTotal()
3. Total <- 25
4. OUTPUT Total
5. ENDPROCEDURE
6. Total is accessible inside DisplayTotal .
7. Outside scope
8. CALL DisplayTotal()
9. If Total was local to the procedure, the main algorithm cannot use it directly.

### A local variable can hide a global variable with the same name

- **Explains:** `shadowing`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-shadowing.jpg`

1. Declare a global Score and set it to 50.
2. Inside ChangeScore, explicitly declare a separate local Score and set it to 80.
3. The local Score hides the global Score only inside the procedure.
4. The procedure outputs 80, while the main program later outputs the unchanged global 50.
<!-- stage10-explanations:end -->
