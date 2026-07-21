# Lesson 131: Parameters: by value and by reference in pseudocode

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Parameters: by value and by reference in pseudocode** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **Parameters: by value and by reference in pseudocode** with a neighbouring syllabus idea?

## Guided Explanation
For Parameters: by value and by reference in pseudocode, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **Parameters: by value and by reference in pseudocode**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Trace a procedure call where one parameter is passed by value and another by reference. The worked example must explicitly use **Parameters: by value and by reference in pseudocode**, not a generic example from the wider unit.

**Worked answer / marking focus:** Changes to the by-value parameter do not affect the original variable; changes to the by-reference parameter do. Credit clear before/after values.

```text
// Cambridge-style pseudocode
PROCEDURE Increase(BYREF Score : INTEGER)
    Score <- Score + 1
ENDPROCEDURE
```

```java
// Java support example only, not exam pseudocode
// Java primitives are passed by value; wrapper/state objects are needed to mimic BYREF-style changes.
```


## Student Task
Students annotate two calls with arrows showing whether data is copied or linked back to the caller. Their final answer must include the phrase **Parameters: by value and by reference in pseudocode** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Parameters: by value and by reference in pseudocode**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Parameters: by value and by reference in pseudocode** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Parameters: by value and by reference in pseudocode** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **parameters: by value and by reference in pseudocode**.  
Correction prompt: "Show the mechanism, not just the label."
