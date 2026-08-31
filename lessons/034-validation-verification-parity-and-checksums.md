# Lesson 034: Validation, verification, parity and checksums

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 6: Security, privacy and data integrity<br>
**Syllabus requirements:** S6.07, S6.08<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S6.01 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Distinguish data security, data privacy and data integrity as separate concepts; evidence must not treat confidentiality, lawful/appropriate use and correctness/consistency as interchangeable.
- Distinguish data security, privacy and integrity.


## 2. Knowledge explanation

### 1. How data validation and data verification help protect the integrity of data; describe and use methods… (S6.07)

**Concept relationships**

- **range check:** A range check applies both a lower and…
- **format check:** A format check tests a required pattern
- **length check:** A length check tests the number of characters
- **presence check:** A presence check rejects a blank required field
- **existence check:** An existence check confirms a value is stored…
- **limit check:** Validation methods include range, format, length, presence, existence…

**Mechanism**

1. **Identify what needs protection** — Validation methods include range, format, length, presence, existence and limit checks, plus a check digit.
2. **Trace the attack or error route** — The seven required validation methods are range, format, length, presence, existence, limit and check digit.
3. **Match a safeguard and limitation** — Range, format, length, presence, existence, limit and check digit.

**Common validation checks:** The seven required validation methods are range, format, length, presence, existence, limit and check digit. A range check applies both a lower and an upper bound; a limit check applies one stated upper or…

#### Common validation checks

![Common validation checks](../web/assets/diagrams/stage10-infographics/stage10-lesson-070-checks.jpg)

<details><summary>Text transcript</summary>

- The seven required validation methods are range, format, length, presence, existence, limit and check digit.
- A range check applies both a lower and an upper bound; a limit check applies one stated upper or lower limit.
- An existence check confirms that a value is present in a specified stored lookup or file.
- A check digit is calculated from the other digits and compared to detect many entry or scanning errors.
- Validation checks rules and reasonableness; it does not prove that data is true.

</details>

<details><summary>Precise syllabus wording</summary>

Describe how data validation and data verification help protect the integrity of data; describe and use methods of data validation.

Validation and verification reduce input, copying and transfer errors and therefore help protect data integrity. Validation methods include range, format, length, presence, existence and limit checks, plus a check digit.

</details>

### 2. Verification: visual and double entry; parity byte/block and checksum (S6.08)

**Concept relationships**

- **visual check:** And use verification during data entry (visual check…
- **parity check:** A parity check compares the expected odd or…
- **double entry:** Verification checks whether data was copied accurately, using…
- **block parity:** A parity byte checks one group and block…
- **checksum:** Parity byte/block and checksum.
- **verification:** Validation and verification reduce input, copying and transfer…

**Mechanism**

1. **Name the exact concept** — And use verification during data entry (visual check and double entry) and during data transfer (parity check on…
2. **Explain how its parts connect** — Verification checks whether data was copied accurately, using visual checking or double entry.
3. **Use it in a concrete context** — Parity byte/block and checksum.

**Verification checks accuracy against the source:** During data entry, visual checking compares entered data with its source and double entry compares two independently entered values. During transfer, a parity check on a byte tests the agreed odd or even parity;…

#### Verification checks accuracy against the source

![Verification checks accuracy against the source](../web/assets/diagrams/stage10-infographics/stage10-lesson-070-verification.jpg)

<details><summary>Text transcript</summary>

- During data entry, visual checking compares entered data with its source and double entry compares two independently entered values.
- During transfer, a parity check on a byte tests the agreed odd or even parity; block parity applies parity across rows and columns of a data block.
- For a checksum, the sender calculates and transmits a value for the data block; the receiver recalculates and compares it.
- These methods detect many errors but do not prove truth or automatically correct every error.
- A validation check digit belongs to an identifier; a transfer checksum belongs to a transmitted data block.

</details>

<details><summary>Precise syllabus wording</summary>

Understand verification: visual and double entry; parity byte/block and checksum.

Describe and use verification during data entry (visual check and double entry) and during data transfer (parity check on a byte, block parity and checksum).

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Validation and verification reduce input, copying and transfer errors and therefore help protect data integrity. Validation methods include range, format, length, presence, existence and limit checks, plus a check digit.
- Describe and use verification during data entry (visual check and double entry) and during data transfer (parity check on a byte, block parity and checksum).
- Validation checks whether data is reasonable and follows rules: range, format, length, presence, existence, limit and check digit. It cannot prove truth. A range check applies both a lower and an upper bound, such as 0 to 75. A limit check applies one stated upper or lower limit, such as file size no greater than 10 MiB or temperature at least -20 degrees Celsius.
- A format check tests a required pattern; a length check tests the number of characters; a presence check rejects a blank required field; an existence check confirms a value is stored in a specified lookup file; and a check digit is calculated from the other digits and compared. Verification checks whether data was copied accurately, using visual checking or double entry.
- Error detection includes parity: a parity byte checks one group and block parity adds row/column checks; a checksum is calculated from a data block and compared after transmission. These detect many errors but do not correct every error.
- A parity check compares the expected odd or even parity of a byte; block parity adds row and column evidence.
- Data validation and data verification help protect data integrity by detecting or preventing many input, copying and transfer errors before inaccurate or corrupted data are accepted. They reduce these risks but do not prove that the original source is true or replace access control and backup.

</details>

### Worked method

1. Validate input, then verify a transferred record
2. A 10 MiB maximum uses an upper limit check because it has one permitted limit; a mark from 0 to 75 uses a range check because it has both lower…
3. A product code uses presence, length, format, existence and check-digit rules.
4. During entry, visual checking or double entry compares values.
5. During transfer, byte parity detects many single-bit errors, block parity adds row/column evidence and a checksum is recalculated from the received data block.

Beyond syllabus / 延伸知识（不要求背诵）: real security uses defence in depth, combining controls so that one failed control does not expose the whole system.
## 3. Practice by question type

### Question 1 - foundation - explain - 2 marks

How do validation and verification help protect data integrity?

**Answer:** They detect or prevent many input, copying and transfer errors, reducing the chance that inaccurate or corrupted data are accepted; they do not prove that the source is true.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - draw - 2 marks

Draw lines to match each rule to its validation check: AA1234 follows two letters then four digits; a code has exactly six characters; a required name is not blank; a barcode includes a digit calculated from the other digits.

**Answer:** Format check; length check; presence check; check digit, respectively.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 2 marks

How does double-entry verification work?

**Answer:** Data is entered twice and the two entries are compared.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/W/25 Q1 | 2 | draw | diagram |
| 9618/11/S/24 Q5(b) | 5 | complete | recall |
| 9618/11/S/24 Q5(ii) | 4 | complete | recall |
| 9618/11/S/24 Q5(i) | 3 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define validation, verification, parity and checksums with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For validation, verification, parity and checksums, use the exact technical term before applying it to the scenario.
