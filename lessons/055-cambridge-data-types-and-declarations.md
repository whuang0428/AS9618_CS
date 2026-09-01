# Lesson 055: Cambridge data types and declarations

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.01<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 054: Integrated algorithm design from a word problem.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. Integer, real, char, string, Boolean and date types and Cambridge pseudocode type names (S10.01)

**Atomic learning targets**

- **S10.01.A01:** integer
- **S10.01.A02:** real
- **S10.01.A03:** char
- **S10.01.A04:** string
- **S10.01.A05:** Boolean
- **S10.01.A06:** date
- **S10.01.A07:** ARRAY
- **S10.01.A08:** FILE

**Core explanation**

- Select a type from the meaning and operations required by the problem. INTEGER stores whole numbers, REAL stores values that may contain a fractional part, CHAR stores one character, STRING stores a sequence of characters, BOOLEAN stores TRUE or FALSE, and DATE stores a calendar date.
- Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE. ARRAY and FILE describe structured or persistent data; their declarations also state an element type, bounds or file usage as required by the problem.
- An identifier that contains digits is not automatically INTEGER. Codes, telephone numbers and identifiers with leading zeroes normally use STRING because arithmetic is not required. Type selection does not replace validation of permitted values.
- Cambridge pseudocode uses INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE for scalar values. The syllabus also names ARRAY and FILE among the pseudocode data types.
- Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
- Integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.

**Mechanism or method**

1. **Identify the relevant condition or input** — Select a type from the meaning and operations required by the problem.
2. **Trace how the process works** — INTEGER stores whole numbers, REAL stores values that may contain a fractional part, CHAR stores one character, STRING stores a sequence of characters, BOOLEAN stores TRUE or FALSE, and DATE stores a calendar date.
3. **Connect the mechanism to its result** — Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.

#### Worked example: Integer, real, char, string, Boolean and date types and Cambridge pseudocode type names: complete worked route

1. **Identify the relevant condition or input**

Select a type from the meaning and operations required by the problem.

2. **Trace how the process works**

INTEGER stores whole numbers, REAL stores values that may contain a fractional part, CHAR stores one character, STRING stores a sequence of characters, BOOLEAN stores TRUE or FALSE, and DATE stores a calendar date.

3. **Connect the mechanism to its result**

Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.

4. **Complete example**

Choose types for a booking: Use STRING for BookingCode because it may contain letters or leading zeroes; ARRAY for a fixed indexed set of attendee names; and FILE when bookings must persist between program runs.

**Misconceptions to correct**

- Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

#### Mastery check (MC-L055-S10.01)

Explain the following targets in one connected answer, using a concrete example for each: integer; real; char; string; Boolean; date; ARRAY; FILE.

<details><summary>Answer criteria</summary>

- Select a type from the meaning and operations required by the problem. INTEGER stores whole numbers, REAL stores values that may contain a fractional part, CHAR stores one character, STRING stores a sequence of characters, BOOLEAN stores TRUE or FALSE, and DATE stores a calendar date.
- Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE. ARRAY and FILE describe structured or persistent data; their declarations also state an element type, bounds or file usage as required by the problem.
- An identifier that contains digits is not automatically INTEGER. Codes, telephone numbers and identifiers with leading zeroes normally use STRING because arithmetic is not required. Type selection does not replace validation of permitted values.
- Cambridge pseudocode uses INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE for scalar values. The syllabus also names ARRAY and FILE among the pseudocode data types.
- Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
- Integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.

</details>

**Supplementary concept map**

- **integer:** Cambridge pseudocode uses the type names INTEGER, REAL,…
- **real:** Integer, real, char, string, Boolean and date, and…
- **char:** Integer, real, char, string, Boolean and date types…
- **string:** Cambridge pseudocode uses INTEGER, REAL, CHAR, STRING, BOOLEAN…
- **Boolean:** INTEGER stores whole numbers, REAL stores values that…
- **date:** ARRAY and FILE among the pseudocode data types.

**Supplementary three-step recap**

1. **Translate the stated design** — Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
2. **Apply one complete operation** — Integer, real, char, string, Boolean and date, and require the Cambridge pseudocode type names INTEGER, REAL, CHAR, STRING,…
3. **Trace state and boundaries** — Integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.

**The eight Cambridge pseudocode type names:** Cambridge pseudocode uses INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE for scalar values. The syllabus also names ARRAY and FILE among the pseudocode data types.

#### The eight Cambridge pseudocode type names

![The eight Cambridge pseudocode type names](../web/assets/diagrams/stage10-infographics/stage10-lesson-114-pseudocode.jpg)

<details><summary>Text transcript</summary>

- Cambridge pseudocode uses INTEGER, REAL, CHAR, STRING, BOOLEAN and DATE for scalar values.
- The syllabus also names ARRAY and FILE among the pseudocode data types.
- Select a type from the value's meaning and required operations; numeric-looking identifiers may still require STRING.

</details>

<details><summary>Precise syllabus wording</summary>

Understand integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.

Select and use appropriate types for a problem solution. The syllabus names integer, real, char, string, Boolean and date, and require the Cambridge pseudocode type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.

</details>

### Lesson technical reference

- Select and use appropriate types for a problem solution. The syllabus names integer, real, char, string, Boolean and date, and require the Cambridge pseudocode type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
- Select a type from the meaning and operations required by the problem. INTEGER stores whole numbers, REAL stores values that may contain a fractional part, CHAR stores one character, STRING stores a sequence of characters, BOOLEAN stores TRUE or FALSE, and DATE stores a calendar date.
- Cambridge pseudocode uses the type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE. ARRAY and FILE describe structured or persistent data; their declarations also state an element type, bounds or file usage as required by the problem.
- An identifier that contains digits is not automatically INTEGER. Codes, telephone numbers and identifiers with leading zeroes normally use STRING because arithmetic is not required. Type selection does not replace validation of permitted values.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - justify - 8 marks

Select and justify suitable Cambridge types for CustomerName, MiddleInitial, DateJoined, ItemCount, MeanScore, IsActive, twenty marks and data that must remain after the program ends.

**Answer:** STRING for CustomerName; CHAR for MiddleInitial; DATE for DateJoined; INTEGER for ItemCount; REAL for MeanScore; BOOLEAN for IsActive; ARRAY with a numeric element type for twenty indexed marks; FILE for persistent data, with justifications linked to meaning or use

**Marking guidance:** Do not select a numeric type merely because an identifier contains digits, and do not use STRING as a generic replacement for DATE, CHAR or numeric values that require their defined operations.

**Common error:** For the command word justify, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - identify - 2 marks

Identify the eight type names listed in the syllabus Notes.

**Answer:** INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - suggest - 2 marks

Suggest a type for 18.75 used in arithmetic.

**Answer:** REAL, because the value has a fractional part.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/21/S/25 Q7(i) | 8 | write | calculate |
| 9618/21/W/25 Q8(b) | 8 | define | recall |
| 9618/23/S/25 Q7(i) | 8 | write | write |
| 9618/23/W/25 Q8(a) | 8 | define | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S10.01: explain integer, real, char, string, Boolean, date, ARRAY, FILE.
- S10.01 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For cambridge data types and declarations, use the exact technical term before applying it to the scenario.
