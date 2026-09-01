# Lesson 078: Functions, interfaces and return values

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.07, S11.08<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S11.02, S11.06, S11.07 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Write pseudocode for declaration and initialisation of constants; declaration of variables; assignment of values; expressions using arithmetic or logical operators; input from the keyboard; and output to the console.
- Use declarations, constants, variables, assignment, arithmetic/logical operations and input/output.
- Define and use a procedure; explain when the use of a procedure is appropriate; use parameters with none, one or more values passed by reference or by value.
- Understand and use procedures with parameters passed by reference and by value.
- Define and use a function; explain when the use of a function is appropriate. A function is used in an expression and its return value replaces the function call.
- Understand and use functions, including return values in expressions.


## 2. Knowledge explanation

### 1. And use functions, including return values in expressions: Functions, interfaces and return values (S11.07)

**Atomic learning targets**

- **S11.07.A01:** functions
- **S11.07.A02:** return
- **S11.07.A03:** values
- **S11.07.A04:** expression / expressions

**Core explanation**

- Define and use a function when the caller needs one returned value. A function has a return type and RETURN statement; the call can appear in an expression, for example Total <- Price + CalculateVAT(Price). Use procedures for actions and functions for calculated, searched or checked values.
- A parameter is the named variable in the header, while an argument is the actual value or variable supplied at a call. RETURN sends a function value back to the caller; output displayed by a procedure is an effect, not a return value.
- A procedure header or function header names the subprogram and declares its parameters; a function header also declares its return type. The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.
- Use the terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.

**Mechanism or method**

1. **Identify the relevant condition or input** — Define and use a function when the caller needs one returned value.
2. **Trace how the process works** — A function has a return type and RETURN statement;
3. **Connect the mechanism to its result** — the call can appear in an expression, for example Total <- Price + CalculateVAT(Price).

#### Worked example: And use functions, including return values in expressions: Functions, interfaces and return values: complete worked route

1. **Identify the relevant condition or input**

Define and use a function when the caller needs one returned value.

2. **Trace how the process works**

A function has a return type and RETURN statement;

3. **Connect the mechanism to its result**

the call can appear in an expression, for example Total <- Price + CalculateVAT(Price).

4. **Complete example**

FUNCTION CalculateVAT(Price : REAL) RETURNS REAL returns Price 0.20, so Total <- Price + CalculateVAT(Price) uses the returned value in an expression.

**Misconceptions to correct**

- Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

#### Mastery check (MC-L078-S11.07)

Explain the following targets in one connected answer, using a concrete example for each: functions; return; values; expression / expressions.

<details><summary>Answer criteria</summary>

- Define and use a function when the caller needs one returned value. A function has a return type and RETURN statement; the call can appear in an expression, for example Total <- Price + CalculateVAT(Price). Use procedures for actions and functions for calculated, searched or checked values.
- A parameter is the named variable in the header, while an argument is the actual value or variable supplied at a call. RETURN sends a function value back to the caller; output displayed by a procedure is an effect, not a return value.
- A procedure header or function header names the subprogram and declares its parameters; a function header also declares its return type. The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.
- Use the terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.

</details>

**Supplementary concept map**

- **return value:** A function is used in an expression and…
- **function:** And use functions, including return values in expressions.
- **expression:** The call can appear in an expression, for…
- **functions:** Procedures for actions and functions for calculated, searched…
- **return:** RETURN sends a function value back to the…
- **call:** Define and use a function when the caller…

**Supplementary three-step recap**

1. **Translate the stated design** — A function is used in an expression and its return value replaces the function call.
2. **Apply one complete operation** — And use functions, including return values in expressions.
3. **Trace state and boundaries** — RETURN sends a function value back to the caller

**Function calls can appear where a value is…:** Calls and returned values CALL DisplayMenu()

#### Function calls can appear where a value is needed

![Function calls can appear where a value is needed](../web/assets/diagrams/stage10-infographics/stage10-lesson-131-calls.jpg)

<details><summary>Text transcript</summary>

- Calls and returned values
- CALL DisplayMenu()
- procedure call performs an action
- VAT <- CalculateVAT(Price)
- function return value is stored
- Total <- DisplayMenu()
- procedure does not return a value
- OUTPUT CalculateVAT(Price)
- function return value can be output

</details>

<details><summary>Precise syllabus wording</summary>

Understand and use functions, including return values in expressions.

Define and use a function; explain when the use of a function is appropriate. A function is used in an expression and its return value replaces the function call.

</details>

### 2. Precise terminology: procedure/function header, interface, parameter, argument and return value (S11.08)

**Atomic learning targets**

- **S11.08.A01:** procedure header
- **S11.08.A02:** function header
- **S11.08.A03:** interface
- **S11.08.A04:** parameter
- **S11.08.A05:** argument
- **S11.08.A06:** return value

**Core explanation**

- A procedure header or function header names the subprogram and declares its parameters; a function header also declares its return type. The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.
- Define and use a procedure when an algorithm needs a named action. A procedure may have no parameters, one parameter or several parameters. BYVAL passes a value that the procedure can use without changing the caller's variable; BYREF gives access to the caller's variable so an assignment can persist after the call.
- A parameter is the named variable in the header, while an argument is the actual value or variable supplied at a call. RETURN sends a function value back to the caller; output displayed by a procedure is an effect, not a return value.
- Define and use a function; explain when the use of a function is appropriate. A function is used in an expression and its return value replaces the function call.
- A subprogram interface gives the caller the name, parameter list and types, and any return value/type. A procedure header or function header declares that interface; a function header also declares its return type.
- The terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.

**Mechanism or method**

1. **Set up the required data and conditions** — A procedure header or function header names the subprogram and declares its parameters;
2. **Carry out the complete method** — a function header also declares its return type.
3. **Trace or test the result** — The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.

#### Worked example: Precise terminology: procedure/function header, interface, parameter, argument and return value: complete worked route

1. **Set up the required data and conditions**

A procedure header or function header names the subprogram and declares its parameters;

2. **Carry out the complete method**

a function header also declares its return type.

3. **Trace or test the result**

The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.

4. **Complete example**

In Increase(Score, 5), Number and Amount are parameters while Score and 5 are arguments.

**Misconceptions to correct**

- Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

#### Mastery check (MC-L078-S11.08)

Complete a fresh example that demonstrates every target: procedure header; function header; interface; parameter; argument; return value. Show all intermediate steps and check the result.

<details><summary>Answer criteria</summary>

- A procedure header or function header names the subprogram and declares its parameters; a function header also declares its return type. The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.
- Define and use a procedure when an algorithm needs a named action. A procedure may have no parameters, one parameter or several parameters. BYVAL passes a value that the procedure can use without changing the caller's variable; BYREF gives access to the caller's variable so an assignment can persist after the call.
- A parameter is the named variable in the header, while an argument is the actual value or variable supplied at a call. RETURN sends a function value back to the caller; output displayed by a procedure is an effect, not a return value.
- Define and use a function; explain when the use of a function is appropriate. A function is used in an expression and its return value replaces the function call.
- A subprogram interface gives the caller the name, parameter list and types, and any return value/type. A procedure header or function header declares that interface; a function header also declares its return type.
- The terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.

</details>

**Supplementary concept map**

- **procedure header:** A procedure header or function header declares that…
- **function header:** Procedure/function header, interface, parameter, argument and return value.
- **return value:** The terminology procedure/function interface, header, parameter, argument and…
- **interface:** A subprogram interface gives the caller the name,…
- **parameter:** A parameter is the named variable in the…
- **argument:** An argument is the actual value or variable…

**Supplementary three-step recap**

1. **Translate the stated design** — The terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.
2. **Apply one complete operation** — Procedure/function header, interface, parameter, argument and return value.
3. **Trace state and boundaries** — A procedure header or function header declares that interface

**A subprogram interface connects caller and header:** A subprogram interface gives the caller the name, parameter list and types, and any return value/type. A procedure header or function header declares that interface; a function header also declares its return type.

#### A subprogram interface connects caller and header

![A subprogram interface connects caller and header](../web/assets/diagrams/stage10-infographics/stage10-lesson-131-parameters.jpg)

<details><summary>Text transcript</summary>

- A subprogram interface gives the caller the name, parameter list and types, and any return value/type.
- A procedure header or function header declares that interface; a function header also declares its return type.
- A parameter is named in the header; an argument is the actual value or variable supplied at a call.
- RETURN sends a function value to the caller; displayed output is an effect, not a return value.

</details>

<details><summary>Precise syllabus wording</summary>

Use precise terminology: procedure/function header, interface, parameter, argument and return value.

Use the terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.

</details>

### Lesson technical reference

- Define and use a function; explain when the use of a function is appropriate. A function is used in an expression and its return value replaces the function call.
- Use the terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms.
- Define and use a procedure when an algorithm needs a named action. A procedure may have no parameters, one parameter or several parameters. BYVAL passes a value that the procedure can use without changing the caller's variable; BYREF gives access to the caller's variable so an assignment can persist after the call.
- Define and use a function when the caller needs one returned value. A function has a return type and RETURN statement; the call can appear in an expression, for example Total <- Price + CalculateVAT(Price). Use procedures for actions and functions for calculated, searched or checked values.
- A procedure header or function header names the subprogram and declares its parameters; a function header also declares its return type. The procedure/function interface is the information a caller needs to use the subprogram: its name, parameter list and types, and any returned value/type.
- A parameter is the named variable in the header, while an argument is the actual value or variable supplied at a call. RETURN sends a function value back to the caller; output displayed by a procedure is an effect, not a return value.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What is included in a subprogram interface?

**Answer:** Its name, parameters/types and any return value/type needed by a caller.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - apply - 2 marks

When is a procedure appropriate?

**Answer:** When the algorithm needs a named action rather than a returned value used in an expression.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how functions, interfaces and return values would be applied in a suitable computing context.

**Answer:** Use the terminology procedure/function interface, header, parameter, argument and return value, and explain the relationship between these terms. Define and use a procedure when an algorithm needs a named action. A procedure may have no parameters, one parameter or several parameters. BYVAL passes a value that the procedure can use without changing the caller's variable; BYREF gives access to the caller's variable so an assignment can persist after the call. Define and use a function when the caller needs one returned value. A function has a return type and RETURN statement; the call can appear in an expression, for example Total <- Price + CalculateVAT(Price). Use procedures for actions and functions for calculated, searched or checked values.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/W/25 Q6(b) | 7 | calculate | calculate |
| 9618/23/W/25 Q6(b) | 7 | calculate | calculate |
| 9618/23/S/25 Q1(b) | 5 | complete | recall |
| 9618/21/S/25 Q2(c) | 4 | calculate | calculate |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S11.07: explain functions, return, values, expression / expressions.
- S11.07 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S11.08: explain procedure header, function header, interface, parameter, argument, return value.
- S11.08 method: Set up the required data and conditions → Carry out the complete method → Trace or test the result.
- Correction to remember: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For functions, interfaces and return values, use the exact technical term before applying it to the scenario.
