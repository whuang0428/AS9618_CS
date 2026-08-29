# Lesson 133: String handling and built-in functions

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Use supplied built-in and library routines

### Direct explanation

- Use built-in functions and library routines exactly as defined. The syllabus states that any function not given in the Cambridge pseudocode guide will be provided, and string manipulation functions will always be given in the question. Students are not expected to memorise one unofficial substring API.
- Read the supplied function name, parameter order, position convention and returned type before using it. LENGTH is a familiar built-in example; LEFT, RIGHT, MID or SUBSTRING examples in this course illustrate a mechanism only when their definition and indexing convention are stated.
- A function call returns a value, so it can be assigned, compared, output or combined in an expression. Do not import Java's zero-based substring convention unless the question explicitly specifies it.

### Worked example

**Apply a supplied string routine:** A question supplies FUNCTION EXTRACT(Text : STRING, Start : INTEGER, Count : INTEGER) RETURNS STRING and states that positions start at 1. LENGTH("NETWORK") returns 7; EXTRACT("NETWORK", 4, 2) returns "WO". Code <- EXTRACT(Name, 1, 3) uses the supplied routine in an assignment without importing Java indexing.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Will an unfamiliar string manipulation function be supplied?
   **Answer:** Yes. The syllabus says string manipulation functions will always be given.
2. What must be checked before tracing EXTRACT?
   **Answer:** Its supplied parameter order, position/index convention and return definition.
3. May a returned string be assigned to a variable?
   **Answer:** Yes; a function return can be used wherever a compatible value is needed.

### Exam-style question and MS

**Question (4 marks):** A question supplies FUNCTION TAKE(Text : STRING, Start : INTEGER, Count : INTEGER) RETURNS STRING and FUNCTION TO_UPPER(Text : STRING) RETURNS STRING, with positions starting at 1. State LENGTH("ALGORITHM"), state TAKE("ALGORITHM", 3, 4), and write an assignment that converts the extracted STRING to upper case.

| Answer | Guidance | Marks |
|---|---|---:|
| LENGTH result is 9 | Do not use CHAR-only UCASE on a STRING, require memorisation of an unstated substring signature or import Java's zero-based indexes. | 1 |
| TAKE result is GORI |  | 1 |
| uses the supplied Start/Count convention rather than Java indexing |  | 1 |
| assigns TO_UPPER(TAKE("ALGORITHM", 3, 4)) or equivalent to a variable |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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
    CharacterString ← MID(Text, Index, 1)
    IF CharacterString = "a" OR CharacterString = "e" OR CharacterString = "i" OR CharacterString = "o" OR CharacterString = "u"
       OR CharacterString = "A" OR CharacterString = "E" OR CharacterString = "I" OR CharacterString = "O" OR CharacterString = "U" THEN
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

### LCASE and UCASE convert one CHAR

- **Explains:** `case`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-case.jpg`

1. Declare Answer as CHAR, input one character and normalise it with UCASE before comparison.
2. UCASE(Answer) returns CHAR, so compare the result with the CHAR literal 'Y'.
3. Close the selection with ENDIF.
4. LCASE and UCASE accept CHAR, not STRING; case conversion does not remove spaces or correct spelling.

### Concatenation joins STRING values

- **Explains:** `concat`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-concat.jpg`

1. Concatenation joins STRING values with the & operator.
2. FirstName is "Lin" and YearText is "2029"; Username <- FirstName & YearText returns "Lin2029".
3. Do not pass the STRING FirstName to LCASE; that function accepts CHAR.

### MID and Java substring use different positions

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-java.jpg`

1. Cambridge guide example: MID(Name, 1, 3) returns the first three characters as a STRING.
2. Java support example: name.substring(0, 3) uses start index 0 inclusive and end index 3 exclusive.
3. LEFT is not listed in the Cambridge pseudocode guide; a question may use it only when the signature and position convention are supplied.
4. Do not add UCASE around a STRING expression because UCASE accepts CHAR.

### Test a built-in function

- **Explains:** `lab`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-lab.jpg`

1. Interactive string lab
2. Use a short string and compare the returned value. For MID , positions start at 1.
3. Function
4. Choose a function and run it.

### LENGTH(String) returns the number of characters

- **Explains:** `length`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-length.jpg`

1. Word <- "ALGORITHM"
2. Size <- LENGTH(Word)
3. OUTPUT Size
4. Word "ALGORITHM"
5. LENGTH(Word) 9

### Exam traces must follow the position convention stated or implied

- **Explains:** `position`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
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
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-strings.jpg`

1. Cambridge-style assignment
2. Name <- "Ada"
3. Message <- "Hello, " & Name
4. OUTPUT Message
5. Reasoning
6. "Ada" is a string of three characters. & is used here for concatenation.
7. If a question uses a different concatenation operator, follow the question. The mark is for clear string construction.

### Use the string-function definition supplied in the question

- **Explains:** `substring`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-133-substring.jpg`

1. String manipulation functions are supplied in the question; use the stated name, parameter order and position convention.
2. Trace the supplied routine exactly, then use its returned string in an assignment, comparison, output or expression.
3. Do not import Java's zero-based substring convention or memorise an unstated course-specific signature.
<!-- stage10-explanations:end -->
