# Lesson 137: Testing with normal, abnormal, and extreme/boundary data

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 12.3
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Distinguish normal, abnormal and extreme/boundary test data using the official syllabus terms.
2. Select precise test values and state the expected result for each value.
3. Explain how the chosen tests expose faults in validation logic.

## Key Vocabulary
English first, Chinese support:

- normal data 正常数据, abnormal data 异常数据, extreme/boundary data 极限/边界数据, expected result 预期结果

## Warm-Up Hook
For a mark accepted from 0 to 100 inclusive, classify 50, 0, 100, -1, 101 and "cat". Require students to state whether each value is valid and the expected result.

Focus question: Why are 0 and 100 valid extreme/boundary values while -1 and 101 are abnormal values?

## Guided Explanation
Normal data is valid and typical, such as 50 within an accepted mark range of 0 to 100. Abnormal data violates the validation rule and should be rejected or handled, such as -1, 101 or a string when an integer is required. Extreme/boundary data is valid data at an accepted limit, such as 0 or 100.

Every test case needs a reason and an expected result. Values immediately outside a valid limit may be useful tests, but they are abnormal; they must not be labelled as valid extreme/boundary data. “Erroneous” may be encountered as a general synonym for incorrect input, but **abnormal** is the official syllabus category used in answers.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: validation rule. Middle: normal, abnormal and extreme/boundary values. Right: expected results and faults exposed.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A program accepts integer marks from 0 to 100 inclusive. Produce one normal test, two extreme/boundary tests and three abnormal tests.

**Worked answer / marking focus:** Use 50 → accepted as normal; 0 and 100 → accepted as valid extreme/boundary values; -1 and 101 → rejected as out-of-range abnormal values; and "cat" → rejected or handled as wrong-type abnormal data. Each value must be paired with its expected result.


## Student Task
Students create a test table for a password length rule of 8 to 20 characters inclusive. It must contain normal, abnormal and extreme/boundary data, a reason for each classification and the expected result. Students then reveal and compare the model classifications.

## Mini-Quiz
1. Define abnormal test data using the official category name.
2. For an inclusive range 11 to 18, classify 11, 18 and 19.
3. Explain why expected results are required in a test table.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: normal, abnormal and extreme/boundary test data.
- Answer one 4-mark question requiring precise test values and expected results for a stated validation rule.

## Marking Notes
Award credit for:
- Accurate use of normal, abnormal and extreme/boundary.
- Precise values that match the stated validation rule.
- Correct expected results and an explanation of the fault each group can expose.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: a value just outside the valid range is called boundary data. Correction: the valid limit is extreme/boundary data; a value outside the rule is abnormal.
Correction prompt: "State whether the value is valid, then use the official category and expected result."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Extreme or boundary data uses valid values at accepted limits

- **Explains:** `boundary`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-boundary.jpg`

1. Extreme/boundary data uses valid values at the accepted lower or upper limit.
2. For an accepted mark range of 0 to 100 inclusive, 0 and 100 are valid extreme/boundary values.
3. Values just outside the limits, such as -1 and 101, are abnormal and should be rejected.

### Abnormal data is invalid data that should be rejected

- **Explains:** `erroneous`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-erroneous.jpg`

1. Abnormal data is invalid data that should be rejected or handled.
2. For a mark from 0 to 100, -1 and 101 are out-of-range abnormal data.
3. The string "cat" is wrong-type abnormal data when an integer mark is required.

### Java can help you run examples, but Cambridge pseudocode is the exam answer format

- **Explains:** `java`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-java.jpg`

1. Java support only
2. Cambridge-style pseudocode
3. IF Mark >= 0 AND Mark <= 100 THEN
4. OUTPUT "Accepted"
5. ELSE
6. OUTPUT "Rejected"
7. ENDIF
8. Java support example only
9. if (mark >= 0 && mark <= 100) {
10. System.out.println("Accepted");
11. } else {
12. System.out.println("Rejected");
13. }
14. Do not write Java syntax as the final Cambridge pseudocode answer unless the question specifically asks for Java.

### Normal data is valid, typical data inside the allowed range

- **Explains:** `normal`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-normal.jpg`

1. Normal data
2. Normal test data
3. Expected result
4. Mark 0 to 100 inclusive
5. Accepted
6. Password length 8 to 20
7. 12 characters
8. Age 11 to 18 inclusive

### Testing compares actual results with expected results

- **Explains:** `purpose`
- **Explanation type:** comparison
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-purpose.jpg`

1. IF Mark >= 0 AND Mark <= 100 THEN
    OUTPUT "Valid"
ELSE
    OUTPUT "Invalid"
ENDIF
2. Normal, abnormal and extreme/boundary test data provide evidence for the selected cases.
3. Finite testing can expose faults but does not prove correctness for every possible input.

### A clear test table turns thinking into marks

- **Explains:** `table`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-table.jpg`

1. A test table records test data, its category and the expected result.
2. Use 50 as normal accepted data and 0 or 100 as valid extreme/boundary accepted data.
3. Use -1, 101 or a wrong-type input as abnormal data with a rejected or handled expected result.

### Testing checks validation against expected results

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-137-validation.jpg`

1. Testing checks whether validation behaves as expected for selected normal, abnormal and extreme/boundary cases.
2. Expected and actual results are compared for each test.
3. Passing a finite test set is evidence, not a proof of universal correctness.
<!-- stage10-explanations:end -->
