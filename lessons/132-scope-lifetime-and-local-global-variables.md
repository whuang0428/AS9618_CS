# Lesson 132: Scope, lifetime, and local/global variables

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Scope, lifetime, and local/global variables** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Scope, lifetime, and local/global variables** with a neighbouring syllabus idea?

## Guided Explanation
For Scope, lifetime, and local/global variables, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Scope, lifetime, and local/global variables**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **Scope, lifetime, and local/global variables**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **Scope, lifetime, and local/global variables** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Scope, lifetime, and local/global variables**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Scope, lifetime, and local/global variables** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Scope, lifetime, and local/global variables** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **scope, lifetime, and local/global variables**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Local and global variables differ by accessibility and lifetime

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-compare.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-global.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-java.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-lifetime.jpg`

1. Lifetime
2. Main program starts global variables may be created and keep their values
3. Procedure is called local variables are created for that call
4. Procedure ends local variables are destroyed or become inaccessible
5. Main continues global variables still exist unless the program ends
6. A local variable's lifetime is usually one subroutine call. It is not a tiny global variable in disguise.

### Local variables are declared inside a subroutine or block

- **Explains:** `local`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-local.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-scope.jpg`

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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-132-shadowing.jpg`

1. Same name trap
2. Trace this carefully
3. Score <- 50
4. PROCEDURE ChangeScore()
5. Score <- 80
6. OUTPUT Score
7. ENDPROCEDURE
8. CALL ChangeScore()
9. Exam explanation
10. If the procedure's Score is local, the procedure outputs 80 , but the main program still outputs the global 50 .
11. The name is the same; the storage location is not. Same label, different locker.
<!-- stage10-explanations:end -->
