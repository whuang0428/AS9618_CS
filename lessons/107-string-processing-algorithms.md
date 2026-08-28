# Lesson 107: String-processing algorithms

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 9
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Apply the algorithmic technique involved in **String-processing algorithms**.
2. Write or trace Cambridge pseudocode using appropriate constructs and identifiers.
3. Explain how the algorithm meets the stated inputs, outputs and constraints.

## Key Vocabulary
English first, Chinese support:

- algorithm 算法, decomposition 分解, trace table 跟踪表, pseudocode 伪代码

## Warm-Up Hook
Give instructions for making tea but remove one step. Ask where the algorithm fails. The kettle is not being difficult; the instructions are.

Focus question: Which feature distinguishes **String-processing algorithms** from the most closely related syllabus concept?

## Guided Explanation
Define the inputs, outputs and stopping condition before writing any pseudocode. For String-processing algorithms, model the algorithm with a trace or dry run. Then improve readability using indentation, meaningful identifiers and Cambridge pseudocode conventions.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: problem statement with inputs/outputs. Middle: pseudocode or flowchart. Right: trace table and test case.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Write or trace pseudocode for a small problem such as finding a maximum, validating input, searching a list or processing a string.

**Worked answer / marking focus:** Award marks for correct control structure, initialisation, update step and termination. For traces, every changed variable must be shown accurately.

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
Students solve the same problem twice: first as numbered English steps, then as Cambridge-style pseudocode. They annotate where selection or iteration appears.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **String-processing algorithms**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 9.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often start coding before defining the output. Correction: an algorithm is easier to design when the required result is known first.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Some algorithms construct a new string one character at a time

- **Explains:** `build`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-build.jpg`

1. Building output
2. Remove spaces from a string
3. NewString <- ""
4. FOR Index <- 1 TO LENGTH(Text)
5. Character <- character at position Index
6. IF Character <> " " THEN
7. NewString <- NewString & Character
8. NEXT Index
9. OUTPUT NewString
10. Why concatenation matters
11. For "A S", the algorithm appends A, skips the space, then appends S. The result is "AS".

### A string algorithm needs position, character and stopping point

- **Explains:** `model`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-model.jpg`

1. Knowledge explanation
2. Concrete model
3. In Cambridge-style reasoning, text is processed by taking one character at a time from a known position.
4. Word <- "DATA"
5. FOR Index <- 1 TO LENGTH(Word)
6. Character <- character at position Index
7. OUTPUT Character
8. NEXT Index
9. Trace for "DATA"
10. Character

### Most AS string algorithms are four familiar patterns

- **Explains:** `patterns`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-patterns.jpg`

1. Core patterns
2. State variable
3. Typical condition
4. Character = Target
5. number of matches
6. Found flag
7. Character = Target
8. true/false or position
9. Validate
10. Valid flag
11. character is allowed / not allowed
12. valid or invalid

### Count vowels with a closed selection

- **Explains:** `pseudocode`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-pseudocode.jpg`

1. MID(Word, Index, 1) returns a one-character STRING, so compare it with both upper-case and lower-case vowel strings.
2. Increment VowelCount only when the current one-character STRING is A, E, I, O, U, a, e, i, o or u.
3. Close the vowel selection with ENDIF before NEXT Index.
4. Do not pass the STRING returned by MID directly to CHAR-only UCASE or LCASE.

### Trace character processing

- **Explains:** `scanner`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-107-scanner.jpg`

1. Interactive string scanner
2. Operation
3. Choose text and operation, then trace the string.
<!-- stage10-explanations:end -->
