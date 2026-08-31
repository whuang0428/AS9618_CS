# Lesson 077: Procedures and parameter passing

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.06<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 076: Selecting and justifying a loop structure.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. And use procedures with parameters passed by reference and by value: Procedures and parameter passing (S11.06)

**Concept relationships**

- **pass:** And use procedures with parameters passed by reference…
- **procedure:** BYVAL passes a value that the procedure can…
- **parameter:** Parameters with none, one or more values passed…
- **parameters:** A procedure may have no parameters, one parameter…
- **reference:** A reference to the caller's variable
- **value:** Its name, parameter list and types, and any…

**Mechanism**

1. **Translate the stated design** — And use procedures with parameters passed by reference and by value.
2. **Apply one complete operation** — Parameters with none, one or more values passed by reference or by value.
3. **Trace state and boundaries** — BYVAL passes a value that the procedure can use without changing the caller's variable

**Same procedure body, different final result:** Side-by-side comparison By value

#### Same procedure body, different final result

![Same procedure body, different final result](../web/assets/diagrams/stage10-infographics/stage10-lesson-132-compare.jpg)

<details><summary>Text transcript</summary>

- Side-by-side comparison
- By value
- By reference
- Header clue
- Number : INTEGER
- BYREF Number : INTEGER
- What is passed
- a copy of the value
- a reference to the caller's variable
- Change inside subroutine
- affects local parameter only
- can affect original variable

</details>

<details><summary>Precise syllabus wording</summary>

Understand and use procedures with parameters passed by reference and by value.

Define and use a procedure; explain when the use of a procedure is appropriate; use parameters with none, one or more values passed by reference or by value.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Define and use a procedure; explain when the use of a procedure is appropriate; use parameters with none, one or more values passed by reference or by value.
- Define and use a procedure when an algorithm needs a named action. A procedure may have no parameters, one parameter or several parameters. BYVAL passes a value that the procedure can use without changing the caller's variable; BYREF gives access to the caller's variable so an assignment can persist after the call.
- Define and use a function when the caller needs one returned value. A function has a return type and RETURN statement; the call can appear in an expression, for example Total <- Price + CalculateVAT(Price). Use procedures for actions and functions for calculated, searched or checked values.
- A procedure header or function header names the subprogram and declares its parameters; a function header also declares its return type. The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.
- A parameter is the named variable in the header, while an argument is the actual value or variable supplied at a call. RETURN sends a function value back to the caller; output displayed by a procedure is an effect, not a return value.

</details>

### Worked method

1. Use a procedure and a function
2. PROCEDURE Increase(BYREF Number
3. INTEGER, BYVAL Amount
4. INTEGER) changes the caller's Number by Amount.
5. REAL) RETURNS REAL returns Price 0.20, so Total <- Price + CalculateVAT(Price) uses the returned value in an expression.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - define - 6 marks

Define a procedure AddBonus(BYREF Mark : INTEGER, BYVAL Bonus : INTEGER), define a function IsPass(Mark : INTEGER) returning BOOLEAN, and use both from a caller with IsPass(Score) inside an IF expression. Identify headers, parameters, arguments and return value.

**Answer:** procedure header and coherent BYREF/BYVAL parameters; procedure changes Mark using Bonus and closes correctly; function header declares BOOLEAN return type; function returns the result of the pass comparison; caller supplies arguments and uses IsPass(Score) in an expression/condition; correctly identifies parameter, argument and returned value terminology

**Marking guidance:** Do not use parameter and argument as synonyms, describe procedure output as a function return, or claim BYVAL changes the caller variable.

**Common error:** For the command word define, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

How does a function return differ from procedure output?

**Answer:** RETURN supplies a value to the caller; OUTPUT displays data as an action.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State two precise facts about procedures and parameter passing.

**Answer:** Define and use a procedure; explain when the use of a procedure is appropriate; use parameters with none, one or more values passed by reference or by value. Define and use a procedure when an algorithm needs a named action. A procedure may have no parameters, one parameter or several parameters. BYVAL passes a value that the procedure can use without changing the caller's variable; BYREF gives access to the caller's variable so an assignment can persist after the call.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q10(b) | 7 | complete | trace |
| 9618/23/W/25 Q5(a) | 5 | complete | trace |
| 9618/22/S/25 Q10(ii) | 3 | complete | trace |
| 9618/22/W/25 Q1(b) | 3 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define procedures and parameter passing with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For procedures and parameter passing, use the exact technical term before applying it to the scenario.
