# Lesson 056: Records: defining, reading and saving structured data

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.02<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Select and use appropriate types for a problem solution. The Version 2 Notes name integer, real, char, string, Boolean and date, and require the Cambridge pseudocode type names INTEGER, REAL, CHAR, STRING, BOOLEAN, DATE, ARRAY and FILE.
- Understand integer, real, char, string, Boolean and date types and Cambridge pseudocode type names.


## 2. Knowledge explanation

### Learning objectives

- Understand record purpose and define, read and save record data.

### Concept checklist for teacher choice

- record
- different data types
- one identifier
- define
- read
- save

### Detailed explanation

- A record holds a set of related data of different data types under one identifier. Candidates must write pseudocode to define a record structure, read data from its named fields and save data to its named fields.
- A record structure groups a set of related fields, which may have different data types, under one identifier. Field names preserve the meaning of each value, so a record suits several facts about one entity better than an array of same-type indexed elements.
- Define a Cambridge record type with TYPE, field declarations and ENDTYPE. Declare record variables only after the type definition is complete. A complete definition states every field name and its type.
- Read data from a record by selecting a named field, for example OUTPUT Student1.Mark or CurrentMark <- Student1.Mark. Save data to the record by assigning to a named field, for example Student1.Mark <- 75. Reading or saving one field does not replace unrelated fields.

### Worked example

Define and use one student record: TYPE TStudent declares Name : STRING, DateOfBirth : DATE, Mark : INTEGER and Enrolled : BOOLEAN, then closes with ENDTYPE. DECLARE Student1 : TStudent creates one record. Student1.Mark <- 75 saves a value to the Mark field; OUTPUT Student1.Mark reads that field.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.

### Retained visual explanation

![Define a record, then save and read named fields](../web/assets/diagrams/stage10-infographics/stage10-lesson-119-declare.jpg)

_Define a record, then save and read named fields. The image and mobile text alternative come from one maintained fact source._

## 3. Practice by question type

### Question 1 - foundation - define - 6 marks

Define TProduct with Code, Description, Price and InStock fields, Write declarations for Product1, save values to Price and InStock, then read both fields.

**Answer:** opens TYPE TProduct and declares suitable named fields; uses suitable STRING, REAL and BOOLEAN field types; closes the definition with ENDTYPE; declares Product1 : TProduct after ENDTYPE; assigns/saves values through Product1.Price and Product1.InStock; reads/outputs the two named fields without replacing other data

**Marking guidance:** Do not use numeric array indexing for record fields or omit ENDTYPE from the type definition.

**Common error:** For the command word define, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

Why can a record contain both STRING and DATE fields?

**Answer:** Record fields may have different data types but belong to one entity under one identifier.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State two precise facts about records: defining, reading and saving structured data.

**Answer:** A record holds a set of related data of different data types under one identifier. Candidates must write pseudocode to define a record structure, read data from its named fields and save data to its named fields. A record structure groups a set of related fields, which may have different data types, under one identifier. Field names preserve the meaning of each value, so a record suits several facts about one entity better than an array of same-type indexed elements.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

## 4. Summary and exam reminders

### Summary

- Define records: defining, reading and saving structured data with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For records: defining, reading and saving structured data, use the exact technical term before applying it to the scenario.
