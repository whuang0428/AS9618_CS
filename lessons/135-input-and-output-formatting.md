# Lesson 135: Input and output formatting

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 11  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Use the programming construct involved in **Input and output formatting**.
2. Write and trace Cambridge pseudocode for normal and boundary cases.
3. Identify and correct an error in control flow, data use or notation.

## Key Vocabulary
English first, Chinese support:

- procedure 过程, function 函数, parameter 参数, scope 作用域, debugging 调试

## Warm-Up Hook
Show a short code fragment containing one error and ask students to identify its effect on the program state. Emphasise reasoning about values and control flow.

Focus question: Which feature distinguishes **Input and output formatting** from the most closely related syllabus concept?

## Guided Explanation
For Input and output formatting, begin with the purpose of the construct, then show Cambridge pseudocode, then compare Java only as a runnable support example. Trace variable values after each key line and identify what test data would expose errors.

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
OUTPUT "Enter name"
INPUT Name
OUTPUT "Hello ", Name
```

```java
// Java support example only, not exam pseudocode
System.out.println("Enter name");
String name = input.nextLine();
System.out.println("Hello " + name);
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
- Answer one 4-mark question about **Input and output formatting**. Follow its command word and apply each point to the stated context.

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

### Build a readable result line

- **Explains:** `formatter`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-formatter.jpg`

1. Interactive output formatter
2. Enter values and choose a format. The goal is not decoration; it is clarity.
3. Choose values and format the output.

### Formatting means controlling how values are shown

- **Explains:** `formatting`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-formatting.jpg`

1. Formatting output
2. Unformatted
3. OUTPUT Name
4. OUTPUT Mark
5. OUTPUT Grade
6. Formatted
7. OUTPUT "Name: " & Name
8. OUTPUT "Mark: " & Mark
9. OUTPUT "Grade: " & Grade
10. Name: Ada
11. Mark: 72
12. Grade: B

### INPUT reads data and stores it in a variable

- **Explains:** `input`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-input.jpg`

1. Cambridge-style pseudocode
2. OUTPUT "Enter mark"
3. INPUT Mark
4. Prompt screen shows Enter mark
5. Input user enters a value such as 72
6. Storage Mark now stores 72

### Java I/O syntax is not Cambridge pseudocode

- **Explains:** `java`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. OUTPUT "Enter mark"
4. INPUT Mark
5. OUTPUT "Mark: " & Mark
6. Java support example only
7. Scanner input = new Scanner(System.in);
8. System.out.print("Enter mark: ");
9. int mark = input.nextInt();
10. System.out.println("Mark: " + mark);
11. Do not copy Scanner , semicolons or Java method calls into Paper 2 pseudocode unless Java is explicitly requested.

### OUTPUT displays text, values or expressions

- **Explains:** `output`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-output.jpg`

1. Display text and values
2. Name <- "Ada"
3. Mark <- 72
4. OUTPUT "Student: " & Name
5. OUTPUT "Mark: " & Mark
6. Displayed output
7. Student: Ada
8. Mark: 72
9. Labels make the output meaningful. A lonely 72 on a screen is not a user interface; it is a small mystery.

### A good prompt tells the user what to enter and the expected format

- **Explains:** `prompts`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-prompts.jpg`

1. OUTPUT "Input"
2. does not say what value is needed
3. OUTPUT "Enter mark"
4. states the required data item
5. OUTPUT "Enter mark 0 to 100"
6. states expected range and reduces invalid input

### Formatted output can make repeated records readable

- **Explains:** `tables`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-tables.jpg`

1. Table-like output
2. Pseudocode idea
3. OUTPUT "Name Mark"
4. OUTPUT "Ada 72"
5. OUTPUT "Lin 85"
6. Displayed output
7. Name Mark
8. Headings, spacing and row order make the values interpretable.

### Input data must be used with the correct data type

- **Explains:** `types`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-135-types.jpg`

1. Input type handling
2. Numeric calculation
3. OUTPUT "Enter price"
4. INPUT Price
5. Total <- Price * 1.20
6. OUTPUT "Total: " & Total
7. Reasoning
8. Price must be treated as numeric for multiplication. If a language reads all input as text, conversion may be needed.
9. Cambridge pseudocode usually focuses on the algorithm. If the question demands conversion, show it clearly.
<!-- stage10-explanations:end -->
