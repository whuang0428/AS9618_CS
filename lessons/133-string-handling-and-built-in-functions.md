# Lesson 133: Clear and efficient Cambridge pseudocode

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice are the assessed sequence for this lesson. The earlier lesson-body activities are Optional enrichment and do not establish syllabus first use.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Clear and efficient Cambridge pseudocode

### Direct explanation

- Efficient pseudocode avoids unnecessary repeated work and selects a structure suited to the data and stopping rule. For example, total and count can be updated during one traversal instead of scanning the same array twice when both results are needed.
- Efficiency does not justify incorrect bounds, hidden assumptions or compressed code that cannot be traced. A strong answer remains clear: initialise once, access only valid data, avoid redundant calculations and use meaningful identifiers and coherent constructs.
- At AS Level, justify an improvement from the actual algorithm, such as fewer repeated passes or stopping a search once the target is found. Do not claim that shorter text alone proves a more efficient algorithm.
- Clear Cambridge pseudocode uses meaningful identifiers, consistent indentation, complete Cambridge constructs and a traceable control path. Efficient pseudocode avoids unnecessary repeated work while preserving correctness.
- An improvement must be justified from the algorithm, such as combining repeated traversals or stopping a search when no later work is required. Fewer written lines alone do not prove efficiency.

### Worked example

**Count passes and total in one traversal / Combine two traversals:** Set Total and PassCount to 0 before one FOR loop through Marks[1:30]. Add each mark to Total and increment PassCount only when the mark is at least 50. Output both values after NEXT Index. This preserves clear control flow while avoiding a second full traversal. One traversal of Marks can update both Total and PassCount. The Cambridge pseudocode remains clear because initialisation, loop bounds, selection and outputs are explicit.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Why is one combined traversal more efficient than two separate full traversals here?
   **Answer:** The same 30 elements are read once while both required results are updated, avoiding a redundant second pass.
2. Does fewer lines always mean greater efficiency?
   **Answer:** No. The control flow and amount of work matter; compressed but repeated or incorrect work is not an improvement.
3. When may a search stop early?
   **Answer:** When the target has been found, provided the algorithm no longer needs to inspect later elements for another stated result.
4. Does shorter code always mean more efficient code?
   **Answer:** No; the amount of work and correctness matter.
5. Identify one clarity feature.
   **Answer:** Meaningful identifiers, indentation or complete constructs.

### Exam-style question and MS

**Question (9 marks):** Write an algorithm that first totals Marks[1:30] and then makes a second pass to count passes, using one clear traversal. Explain the efficiency improvement. Write two full traversals as one clear and efficient Cambridge pseudocode traversal and justify the change.

| Answer | Guidance | Marks |
|---|---|---:|
| initialises Total and PassCount once before the loop | Do not award an efficiency claim based only on fewer written lines; the revised pseudocode must perform less repeated work and remain correct. Do not credit an efficiency claim based only on line count. | 1 |
| uses one loop over valid indexes 1 to 30 |  | 1 |
| updates Total and conditionally updates PassCount inside that loop |  | 1 |
| outputs both results after the loop |  | 1 |
| explains that the rewrite removes a redundant second traversal without changing the result |  | 1 |
| clear Cambridge pseudocode |  | 1 |
| one correct traversal |  | 1 |
| avoids repeated work |  | 1 |
| valid efficiency justification |  | 1 |
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

### Java methods can model modularity, but Cambridge pseudocode remains the exam format

- **Explains:** `robust-java`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-139-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN
4. RETURN Mark >= 0 AND Mark <= 100
5. ENDFUNCTION
6. Java support example only
7. static boolean isValidMark(int mark) {
8. return mark >= 0 && mark <= 100;
9. Use Java to practise running code, but use Cambridge-style pseudocode when the exam asks for algorithm design.

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
