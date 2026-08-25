# Lesson 133: String handling and built-in functions

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 11
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **String handling and built-in functions**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **String handling and built-in functions** from the most closely related syllabus concept?

## Guided Explanation
For String handling and built-in functions, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
VowelCount ← 0
FOR Index ← 1 TO LENGTH(Text)
    Character ← LCASE(MID(Text, Index, 1))
    IF Character = "a" OR Character = "e" OR Character = "i" OR Character = "o" OR Character = "u" THEN
        VowelCount ← VowelCount + 1
    ENDIF
NEXT Index
```

```java
// Java support example only, not exam pseudocode
int vowelCount = 0;
for (int index = 0; index < text.length(); index++) {
    if ("aeiou".indexOf(Character.toLowerCase(text.charAt(index))) >= 0) vowelCount++;
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
- Answer one 4-mark question about **String handling and built-in functions**. Follow its command word and apply each point to the stated context.

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

### UCASE and LCASE normalise text before comparison

- **Explains:** `case`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-case.jpg`

1. Input Answer and normalise it with UCASE before comparison.
2. If the normalised answer equals Y, output Continue.
3. Close the selection with ENDIF.
4. Case conversion changes letter case but does not remove spaces or correct spelling.

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
7. Common error
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
