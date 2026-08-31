# Lesson 073: IF, ELSE and CASE selection

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 11: Programming<br>
**Syllabus requirements:** S11.04<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S9.06 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- The three basic algorithm constructs are sequence, selection and iteration (repetition); students must recognise and use each construct, including combinations of constructs.
- Understand and use sequence, selection and iteration.


## 2. Knowledge explanation

### 1. IF · ELSE · Nested · Selection (S11.04)

**Concept map:** IF → ELSE → nested → selection → CASE → count-controlled → loop → post-condition → pre-condition

**Three-part explanation:**

1. it is well suited when the count or bounds are known, but a pre-condition or post-condition loop is better when the number of repetitions depends on…
2. Use IF statements, including the ELSE clause and nested IF statements
3. A FOR...NEXT loop is count-controlled

**Concrete cue:** Use IF statements, including the ELSE clause and nested IF statements; CASE statements; count-controlled loops; post-condition loops; and pre-condition loops.

#### Use IF when a Boolean condition decides the route

![Use IF when a Boolean condition decides the route](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-if.jpg)

<details><summary>Text transcript</summary>

- IF selection
- Use when
- Cambridge-style pattern
- action is needed only when condition is true
- IF Found THEN ... ENDIF
- IF...ELSE
- two paths are needed
- IF Mark = 50 THEN ... ELSE ... ENDIF

</details>

#### Pre-condition loop: check before running

![Pre-condition loop: check before running](../web/assets/diagrams/stage10-infographics/stage10-lesson-130-while.jpg)

<details><summary>Text transcript</summary>

- A WHILE loop checks its condition before each iteration and may run zero times.
- Input Password before testing whether it differs from CorrectPassword.
- Inside the loop, output the retry message and input a replacement Password.
- Output Access granted only after the WHILE condition becomes false.

</details>

#### Post-condition loop: run once, then check

![Post-condition loop: run once, then check](../web/assets/diagrams/stage10-infographics/stage10-lesson-130-repeat.jpg)

<details><summary>Text transcript</summary>

- A REPEAT...UNTIL loop checks its condition after executing the body.
- Place INPUT Mark once inside REPEAT so each attempt obtains one value.
- Do not add a duplicate INPUT before the loop.
- Stop when Mark is between 0 and 100 inclusive.

</details>

#### Conditions decide the path

![Conditions decide the path](../web/assets/diagrams/stage10-infographics/stage10-lesson-127-selection.jpg)

<details><summary>Text transcript</summary>

- Use IF for a Boolean condition or range and close it with ENDIF.
- Use CASE for several discrete values of one expression and close it with ENDCASE.
- Test marks 49, 50 and 51 to verify the pass boundary.

</details>

#### A decision inside another decision

![A decision inside another decision](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-nested.jpg)

<details><summary>Text transcript</summary>

- Nested selection
- Discount example
- IF Age = 18 THEN
- IF Member = TRUE THEN
- Discount <- 0.20
- Discount <- 0.10
- Discount <- 0.05
- Trace the paths

</details>

<details><summary>Precise syllabus wording</summary>

Use IF/ELSE/nested selection, CASE, count-controlled loops, post-condition and pre-condition loops.

Use IF statements, including the ELSE clause and nested IF statements; CASE statements; count-controlled loops; post-condition loops; and pre-condition loops.

</details>

### Supporting diagram library

#### Use CASE for clear values of one expression

![Use CASE for clear values of one expression](../web/assets/diagrams/stage10-infographics/stage10-lesson-128-case.jpg)

<details><summary>Text transcript</summary>

- CASE compares one expression with several discrete values.
- Each listed value has its own action and OTHERWISE handles unlisted values.
- Close the complete multi-way selection with ENDCASE.

</details>

#### The difference is when the condition is tested

![The difference is when the condition is tested](../web/assets/diagrams/stage10-infographics/stage10-lesson-130-compare.jpg)

<details><summary>Text transcript</summary>

- WHILE vs REPEAT
- REPEAT...UNTIL
- Condition checked
- before the loop body
- after the loop body
- Minimum iterations
- Continues when
- condition is TRUE

</details>

#### A FOR loop has a counter, a start value and an end value

![A FOR loop has a counter, a start value and an end value](../web/assets/diagrams/stage10-infographics/stage10-lesson-129-for.jpg)

<details><summary>Text transcript</summary>

- FOR loop structure
- General pattern
- FOR Counter <- StartValue TO EndValue
- // repeated statements
- NEXT Counter
- Concrete example
- Total <- 0
- FOR Count <- 1 TO 5

</details>

#### Java syntax is support, not Cambridge pseudocode

![Java syntax is support, not Cambridge pseudocode](../web/assets/diagrams/stage10-infographics/stage10-lesson-130-java.jpg)

<details><summary>Text transcript</summary>

- Java support only
- Cambridge-style pseudocode
- WHILE Mark < 0 OR Mark 100
- INPUT Mark
- ENDWHILE
- Java support example only
- while (mark < 0 \|\| mark 100) {
- mark = scanner.nextInt();

</details>

#### A special value can stop the loop

![A special value can stop the loop](../web/assets/diagrams/stage10-infographics/stage10-lesson-130-sentinel.jpg)

<details><summary>Text transcript</summary>

- Initialise Total and input the first Number before WHILE.
- While Number is not -1, add Number to Total and input the next Number.
- The repeated input changes the condition and allows the loop to terminate.
- The sentinel -1 stops the loop and is not included in Total.

</details>

#### Keep asking until the input is valid

![Keep asking until the input is valid](../web/assets/diagrams/stage10-infographics/stage10-lesson-130-validation.jpg)

<details><summary>Text transcript</summary>

- Validation pattern
- REPEAT version
- OUTPUT "Enter mark 0 to 100"
- INPUT Mark
- UNTIL Mark = 0 AND Mark <= 100
- WHILE version
- WHILE Mark < 0 OR Mark 100
- OUTPUT "Invalid"

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Use IF statements, including the ELSE clause and nested IF statements; CASE statements; count-controlled loops; post-condition loops; and pre-condition loops.
- Use IF...THEN...ELSE...ENDIF when a Boolean condition selects between paths. An ELSE clause supplies the false path. In nested IF statements, every inner and outer IF must be closed and the indentation must show which ELSE belongs to which IF.
- Use CASE...OF...OTHERWISE...ENDCASE when one expression is compared with several discrete values. CASE is not a replacement for range or compound-condition decisions unless the stated values cover the requirement correctly.
- A count-controlled loop uses FOR...TO...NEXT when the repetition count or inclusive counter range is known before the loop starts. The counter, start value and end value define the iterations; NEXT closes the loop.
- Justify FOR from the problem: it is well suited when the count or bounds are known, but a pre-condition or post-condition loop is better when the number of repetitions depends on input or a stopping condition.
- A WHILE...ENDWHILE loop is a pre-condition loop: it tests before the body and may run zero times. A REPEAT...UNTIL loop is a post-condition loop: it executes the body before testing and therefore runs at least once. A FOR...NEXT loop is count-controlled.
- Select and justify the loop structure from the problem: use FOR when the count is known, WHILE when execution may be unnecessary and continuation is tested first, and REPEAT when the body must run once before a stopping condition can be tested. The justification must use the scenario, not only say that one loop is easier.

</details>

### Worked example

1. Nested IF and CASE
2. Total a fixed array
3. Choose the loop from the stopping rule
4. For a grade, an outer IF tests Mark = 80; its ELSE contains an inner IF testing Mark = 50; each IF closes with ENDIF.
5. For a menu, CASE Choice OF maps 1, 2 and 3 to actions and OTHERWISE handles every unlisted value before ENDCASE.
6. For Marks[1:30], set Total <- 0, use FOR Index <- 1 TO 30, add Marks[Index] to Total, close with NEXT Index and output Total after all thirty elements have been processed.

Beyond syllabus / 延伸知识（不要求背诵）: consistent style, modularity and automated tests reduce maintenance errors in larger programs.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

When is CASE suitable?

**Answer:** When one expression has several discrete values that map to separate branches.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

How many ENDIF statements close two nested IF statements?

**Answer:** Two: one closes the inner IF and one closes the outer IF.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

Which structure may execute zero times?

**Answer:** WHILE, because it tests its condition before the body.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/W/25 Q1(a) | 4 | complete | recall |
| 9618/23/W/24 Q1(a) | 4 | complete | recall |
| 9618/22/W/24 Q5(c) | 2 | construct | diagram |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define if, else and case selection with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For if, else and case selection, use the exact technical term before applying it to the scenario.
