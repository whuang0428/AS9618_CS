# Lesson 133: String handling and built-in functions

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **String handling and built-in functions** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment with one tiny bug and ask students to find it before the program develops confidence. The point is not syntax hunting; it is reasoning about state.

Lesson-specific focus question: What would go wrong if a student confused **String handling and built-in functions** with a neighbouring syllabus idea?

## Guided Explanation
For String handling and built-in functions, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

Topic-specific teaching move: keep the explanation anchored to **String handling and built-in functions**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Write a program fragment using the construct from the lesson and trace it with one normal and one boundary test case. The worked example must explicitly use **String handling and built-in functions**, not a generic example from the wider unit.

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
Students write Cambridge pseudocode first, then produce a Java support version. They circle every place where Java syntax must not leak into the exam answer. Their final answer must include the phrase **String handling and built-in functions** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **String handling and built-in functions**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **String handling and built-in functions** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **String handling and built-in functions** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 11.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often think working Java automatically means good pseudocode. Correction: Paper 2 rewards clear Cambridge-style algorithm expression. For this lesson, make students contrast that mistake with the exact idea of **string handling and built-in functions**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### UCASE and LCASE normalise text before comparison

- **Explains:** `case`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-case.jpg`

1. Case conversion
2. Cambridge-style pseudocode
3. INPUT Answer
4. Answer <- UCASE(Answer)
5. IF Answer = "Y" THEN
6. OUTPUT "Continue"
7. Why it helps
8. If the user enters "y" , converting to upper case lets the algorithm compare it with "Y" .
9. Case conversion changes letter case; it does not remove spaces or fix spelling.

### Concatenation joins strings to form a new string

- **Explains:** `concat`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-concat.jpg`

1. Concatenation
2. Build a username
3. FirstName <- "Lin"
4. Year <- "2029"
5. Username <- LCASE(FirstName) & Year
6. OUTPUT Username
7. LCASE(FirstName) "lin"
8. Username "lin2029"
9. Common error treating Year as arithmetic instead of text

### Java method syntax is not Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. Code <- LEFT(UCASE(Name), 3)
4. Java support example only
5. String code = name.toUpperCase().substring(0, 3);
6. Java's substring(0, 3) uses indexes 0 to 2. That is not the same notation as LEFT(Name, 3) .

### Test a built-in function

- **Explains:** `lab`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-lab.jpg`

1. Interactive string lab
2. Use a short string and compare the returned value. For MID , positions start at 1.
3. Function
4. Choose a function and run it.

### LENGTH(String) returns the number of characters

- **Explains:** `length`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-length.jpg`

1. Word <- "ALGORITHM"
2. Size <- LENGTH(Word)
3. OUTPUT Size
4. Word "ALGORITHM"
5. LENGTH(Word) 9

### Exam traces must follow the position convention stated or implied

- **Explains:** `position`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-position.jpg`

1. Positions and indexing
2. Cambridge-style trace
3. Word <- "DATA"
4. Part <- MID(Word, 2, 2)
5. OUTPUT Part
6. Using 1-based positions, the output is "AT" .
7. Common trap
8. Do not import Java's zero-based indexing into a pseudocode trace unless the question explicitly tells you to.

### A string is a sequence of characters

- **Explains:** `strings`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-strings.jpg`

1. Cambridge-style assignment
2. Name <- "Ada"
3. Message <- "Hello, " & Name
4. OUTPUT Message
5. Reasoning
6. "Ada" is a string of three characters. & is used here for concatenation.
7. If a question uses a different concatenation operator, follow the question. The mark is for clear string construction.

### Use substring functions to extract part of a string

- **Explains:** `substring`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-substring.jpg`

1. Substring functions
2. Function
3. LEFT(Text, n)
4. first n characters
5. LEFT("NETWORK", 3) returns "NET"
6. RIGHT(Text, n)
7. last n characters
8. RIGHT("NETWORK", 4) returns "WORK"
9. MID(Text, start, n)
10. n characters from a start position
11. MID("NETWORK", 4, 2) returns "WO"
12. This course uses MID(Text, start, count) . If a paper specifies SUBSTRING or a different convention, follow the convention given in the question.
<!-- stage10-explanations:end -->
