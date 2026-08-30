# Lesson 119: Write linear-search and bubble-sort algorithms

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Write linear-search and bubble-sort algorithms

### Direct explanation

- Linear search examines array elements in index order until the target is found or all populated elements have been checked. A complete algorithm initialises its index and found state, keeps every access within the declared bounds, compares the current element and advances only when another element remains to be checked.
- Bubble sort makes repeated passes through the unsorted part of an array. Each pass compares adjacent elements and swaps them when they are in the wrong order. After a complete ascending pass, the largest remaining value is at the high end; the algorithm repeats until the required passes are complete or a whole pass makes no swaps.
- A trace is evidence about one execution, but the syllabus requires candidates to write the algorithms. The answer must therefore include initialisation, loop bounds, comparison, update or swap, and a valid stopping condition rather than only showing one example pass.
- Candidates must be able to write a bubble sort and a linear search algorithm, not only describe or trace an existing algorithm.

### Worked example

**Two complete array algorithms:** A linear search of Code[1:Count] sets Found to FALSE and Index to 1, then compares Code[Index] with Target while Found is FALSE and Index is within Count. A bubble sort of Value[1:Count] uses nested passes, compares Value[Index] with Value[Index + 1], swaps an inverted pair through Temp and may stop early when a pass makes no swaps.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. When must a linear search stop?
   **Answer:** When the target has been found or every populated element within the declared bounds has been checked.
2. What comparison is made by an ascending bubble sort?
   **Answer:** Compare adjacent elements and swap when the left element is greater than the right element.
3. What does a no-swap pass prove?
   **Answer:** No adjacent pair is out of ascending order, so the array is sorted and the algorithm may stop.

### Exam-style question and MS

**Question (8 marks):** Write Cambridge pseudocode for a linear search of Name[1:20] and an ascending bubble sort of Score[1:20].

| Answer | Guidance | Marks |
|---|---|---:|
| linear search initialises Found and Index | Do not award only a trace or a description; both requested algorithms must be written and must not access Index + 1 beyond the upper bound. | 1 |
| linear search loops within indexes 1 to 20 until found or exhausted |  | 1 |
| linear search compares Name[Index] with the target and records a match |  | 1 |
| bubble sort uses repeated passes |  | 1 |
| compares adjacent Score[Index] and Score[Index + 1] within valid bounds |  | 1 |
| uses Temp or an equivalent safe three-step swap |  | 1 |
| reduces the unsorted range or uses a valid no-swap stopping condition |  | 1 |
| all constructs close coherently in Cambridge pseudocode |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Select and declare a suitable structure for **Records and composite data**.
2. Access, update or traverse the structure using Cambridge pseudocode.
3. Justify the structure using the requirements of the stated data.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask students to compare storing a class register in 28 separate variables with storing the values in a suitable data structure. Use the comparison to introduce organisation and access.

Focus question: Which feature distinguishes **Records and composite data** from the most closely related syllabus concept?

## Guided Explanation
Move from single values to grouped data. For Records and composite data, show declaration, access, update and traversal. Then connect the structure to a realistic problem where separate variables would be fragile.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: data model. Middle: declaration/access pattern. Right: common boundary or indexing error.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Declare an appropriate data structure and write pseudocode to read, update, search or count values.

**Worked answer / marking focus:** Credit suitable structure choice, correct indexing or field access, and a loop that covers the required data without missing or exceeding bounds.

## Student Task
Students model a small school dataset using arrays, records or arrays of records, then write one operation on it.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Records and composite data**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Use the field name, not a numeric index

- **Explains:** `access`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-access.jpg`

1. Access and update
2. Pseudocode
3. Read field
4. OUTPUT Student1.Name
5. outputs the Name field
6. Update field
7. Student1.Mark <- 80
8. changes only the Mark field
9. Test field
10. IF Student1.Enrolled = TRUE THEN
11. uses Boolean field in selection

### Same type and index, or mixed fields and names?

- **Explains:** `array-vs-record`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-array-vs-record.jpg`

1. Array vs record
2. Elements / fields
3. usually same type
4. can be different types
5. index: Scores[3]
6. field name: Student1.Mark
7. Best for
8. many similar values
9. several facts about one entity

### Composite data groups fields into one type

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-concept.jpg`

1. a composite structure containing named fields
2. TStudent
3. one named item inside a record
4. Name , Mark
5. Composite data
6. data made from several components
7. student details grouped together
8. Dot notation
9. access to one field of a record variable
10. Student1.Mark

### Read one field from a record

- **Explains:** `lookup`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-lookup.jpg`

1. Interactive field lookup
2. Student1 has Name, DateOfBirth, Mark and Enrolled fields.

### Same modelling idea, different syntax

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-119-pseudocode.jpg`

1. TYPE TBook
    DECLARE Title : STRING
    DECLARE Pages : INTEGER
ENDTYPE
2. Book fields are declared inside the TYPE block.
3. DECLARE Book1 : TBook
This declaration belongs after ENDTYPE.
<!-- stage10-explanations:end -->
