# Lesson 141: Section 11 review: writing complete program fragments

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** stage review

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Section 11 review: writing complete program fragments**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Section 11 review: writing complete program fragments** from the most closely related syllabus concept?

## Guided Explanation
Use Section 11 review: writing complete program fragments to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

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
- Answer one 4-mark question about **Section 11 review: writing complete program fragments**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Efficient pseudocode is purposeful, not merely short

### Direct explanation

- Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule. For example, total and count can be updated during one traversal instead of scanning the same array twice when both results are needed.
- Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced. A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.
- At AS Level, justify an improvement from the actual algorithm, such as fewer repeated passes or stopping a search once the target is found. Do not claim that shorter text alone proves a more efficient algorithm.

### Worked example

**Count passes and total in one traversal:** Set Total and PassCount to 0 before one FOR loop through Marks[1:30]. Add each mark to Total and increment PassCount only when the mark is at least 50. Output both values after NEXT Index. This preserves clear control flow while avoiding a second full traversal.

### Targeted practice and answers

1. Why is one combined traversal more efficient than two separate full traversals here?
   **Answer:** The same 30 elements are read once while both required results are updated, avoiding a redundant second pass.
2. Does fewer lines always mean greater efficiency?
   **Answer:** No. The control flow and amount of work matter; compressed but repeated or incorrect work is not an improvement.
3. When may a search stop early?
   **Answer:** When the target has been found, provided the algorithm no longer needs to inspect later elements for another stated result.

### Exam-style question and MS

**Question (5 marks):** Rewrite an algorithm that first totals Marks[1:30] and then makes a second pass to count passes, using one clear traversal. Explain the efficiency improvement.

- **B1** initialises Total and PassCount once before the loop
- **M1** uses one loop over valid indexes 1 to 30
- **M1** updates Total and conditionally updates PassCount inside that loop
- **A1** outputs both results after the loop
- **B1** explains that the rewrite removes a redundant second traversal without changing the result

**Strict note:** Do not award an efficiency claim based only on fewer written lines; the revised pseudocode must perform less repeated work and remain correct.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Arrays need consistent indexing and meaningful loop bounds

- **Explains:** `arrays`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-arrays.jpg`

1. Arrays and loops
2. Question wording
3. Good answer feature
4. Mark-risk
5. 10 marks
6. FOR Index <- 1 TO 10
7. looping 0 to 10 gives 11 iterations
8. highest score
9. initialise Highest before comparing
10. uninitialised comparison
11. total and average
12. update Total inside loop, divide after loop

### Use a checklist before calling a fragment finished

- **Explains:** `checklist`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-checklist.jpg`

1. Mark checklist

### Review answers should be traceable

- **Explains:** `debugging`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-debugging.jpg`

1. Debugging awareness
2. A well-written fragment can be traced: values change in clear places, conditions are testable, and outputs are easy to predict.
3. If you cannot trace your own fragment with a small example, the examiner probably cannot rescue it for you either.

### File fragments need open, process and close

- **Explains:** `files`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-files.jpg`

1. OPENFILE "Scores.txt" FOR READ
2. WHILE NOT EOF("Scores.txt")
3. READFILE "Scores.txt", Line
4. OUTPUT Line
5. ENDWHILE
6. CLOSEFILE "Scores.txt"

### A complete fragment has setup, logic and result

- **Explains:** `fragment`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-fragment.jpg`

1. Initialise PassCount before processing ten array positions.
2. Input the current element before testing it.
3. Close the passing-mark selection with ENDIF before NEXT Index.
4. Output PassCount once after the loop.

### Java can support practice; the review answer should be Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-java.jpg`

1. Java may support practice but the review answer uses Cambridge pseudocode.
2. Increment PassCount only when the current mark is at least 50.
3. Close the pseudocode selection with ENDIF before NEXT Index.
4. Keep Java and pseudocode indexing conventions explicit.

### Section 11 tools become stronger when combined

- **Explains:** `review-map`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-review-map.jpg`

1. Review map
2. Likely construct
3. Evidence in answer
4. Common slip
5. repeat known number of times
6. start, end and NEXT
7. wrong loop bounds
8. make a decision
9. condition, branches, ENDIF
10. missing ELSE when needed
11. store several values
12. index used consistently

### Use functions for returned values and procedures for actions

- **Explains:** `subroutines`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-subroutines.jpg`

1. A function returns a value; a procedure performs an action.
2. IsPass returns a BOOLEAN based on whether Mark is at least 50.
3. Close the function's IF with ENDIF before ENDFUNCTION.
4. DisplayResult outputs its parameters and returns no value.

### Review fragments often need input checks

- **Explains:** `validation`
- **Explanation type:** synthesis
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-141-validation.jpg`

1. A complete validation fragment prompts for and inputs Mark inside REPEAT.
2. Set Valid to TRUE when Mark is between 0 and 100 inclusive; otherwise set it to FALSE.
3. Close the selection with ENDIF and repeat until Valid is TRUE.
4. Every invalid retry must read a replacement Mark.
<!-- stage10-explanations:end -->
