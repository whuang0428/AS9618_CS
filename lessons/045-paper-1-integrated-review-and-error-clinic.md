# Lesson 045: Paper 1 integrated review and error clinic

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Paper 1 integrated review<br>
**Syllabus requirements:** S1.01, S1.02, S1.03, S1.04, S1.05, S1.06, S1.07, S1.08, S1.09, S1.10, S1.11, S2.01, S2.02, S2.03, S2.04, S2.05, S2.06, S2.07, S2.08, S2.09, S2.10, S2.11, S2.12, S2.13, S2.14, S2.15, S2.16, S3.01, S3.02, S3.03, S3.04, S3.05, S3.06, S3.07, S3.08, S3.09, S3.10, S4.01, S4.02, S4.03, S4.04, S4.05, S4.06, S4.07, S4.08, S4.09, S4.10, S4.11, S4.12, S4.13, S4.14, S4.15, S5.01, S5.02, S5.03, S5.04, S5.05, S5.06, S5.07, S6.01, S6.02, S6.03, S6.04, S6.05, S6.06, S6.07, S6.08, S7.01, S7.02, S7.03, S7.04, S7.05, S7.06, S8.01, S8.02, S8.03, S8.04, S8.05, S8.06, S8.07, S8.08, S8.09, S8.10, S8.11<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S1.02, S1.04, S1.01, S1.08, S1.09, S1.10, S2.02, S2.04, S2.01, S2.15, S3.01, S3.05, S3.08, S4.01, S4.07, S4.09, S4.12, S4.13, S5.01, S5.04, S6.02, S6.05, S6.01, S7.01, S7.04, S8.01, S8.02, S8.05, S8.08 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- The Version 2 row requires binary, denary, hexadecimal, Binary Coded Decimal (BCD), one's complement and two's complement; BCD and complements are representations rather than additional number bases.
- Show understanding of binary, denary and hexadecimal number systems, BCD, and one's- and two's-complement representations.
- Version 2 explicitly requires both addition and subtraction using positive and negative binary integers; fixed-width representation must be retained throughout a calculation.
- Perform binary addition and subtraction using positive and negative binary integers.
- Use and distinguish kibi/kilo, mebi/mega, gibi/giga and tebi/tera; binary prefixes use powers of 1024 and decimal prefixes use powers of 1000.
- Show understanding of binary magnitudes and the difference between binary prefixes and decimal prefixes.


## 2. Knowledge explanation

### Learning objectives

- Show understanding of binary magnitudes and the difference between binary prefixes and decimal prefixes.
- Show understanding of binary, denary and hexadecimal number systems, BCD, and one's- and two's-complement representations.
- Convert an integer value from one required number base or representation to another.

### Concept checklist for teacher choice

- binary prefixes
- decimal prefixes
- kibi / KiB
- kilo / kB
- mebi / MiB
- mega / MB
- gibi / GiB
- giga / GB
- tebi / TiB
- tera / TB
- binary
- denary
- hexadecimal
- BCD
- one's-complement / one's complement
- two's-complement / two's complement
- INTEGER
- convert / conversion
- binary addition
- binary subtraction
- positive
- negative
- overflow
- fixed-width / fixed width

### Detailed explanation

- Conversions apply to integer values and the binary, denary, hexadecimal, BCD, one's-complement and two's-complement representations named in the preceding Version 2 row.
- A LAN covers a limited area and is normally managed by one organisation; a WAN connects sites across a large area and commonly uses provider infrastructure. Benefits must identify a shared or centrally managed resource and its consequence.
- Use the standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR); all gates except NOT have two inputs. Construct circuits, truth tables and expressions from each of the other stated representations: problem statement, logic expression, logic circuit and truth table.
- Use the complete Version 2 instruction set with its specified operands and effects. In particular LDR n loads IX, CMI <address is indirect comparison, JPE follows a True comparison and JPN follows a False comparison.
- The operating system is required to provide a platform and manage memory, files, security, hardware input/output and peripherals, and processes.
- Describe security measures for computer systems from a stand-alone PC to a network: user accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence.
- Version 2 explicitly includes the Free Software Foundation, Open Source Initiative, shareware and commercial software. All four must be taught; a scenario answer must justify permissions, restrictions, cost or support rather than choose by label alone.
- Version 2 requires CREATE DATABASE, CREATE TABLE, ALTER TABLE, CHARACTER, VARCHAR(n), BOOLEAN, INTEGER, REAL, DATE, TIME, PRIMARY KEY(field) and FOREIGN KEY(field) REFERENCES Table(Field). Each named item remains core.

### Worked example

Use one fresh scenario to apply paper 1 integrated review and error clinic, showing each decision or calculation step and checking the result against the question context.

Beyond syllabus / 延伸知识（不要求背诵）: production databases also manage transactions and concurrent users; these ideas extend the syllabus model of integrity and access control.

### Retained visual explanation

![Extended-response topics across Paper 1](../web/assets/diagrams/stage10-infographics/stage10-lesson-097-map.jpg)

_Extended-response topics across Paper 1. The image and mobile text alternative come from one maintained fact source._

## 3. Practice by question type

### Question 1 - foundation - describe - 5 marks

Describe one verification method used during data entry and two methods used during data transfer.

**Answer:** visual check against source or double entry with comparison; byte parity uses an agreed odd/even parity bit and checks it at the receiver; block parity checks rows and columns / can locate many single-bit errors; checksum is recalculated from received block and compared; methods detect many errors but do not prove truth or automatically correct every error

**Marking guidance:** Do not substitute validation checks for verification, merge byte and block parity into one unexplained word, or claim that detection automatically corrects an error.

**Common error:** For the command word describe, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 3 marks

Explain one common error from Section 8: Databases, and give the corrected reasoning.

**Answer:** Version 2 requires CREATE DATABASE, CREATE TABLE, ALTER TABLE, CHARACTER, VARCHAR(n), BOOLEAN, INTEGER, REAL, DATE, TIME, PRIMARY KEY(field) and FOREIGN KEY(field) REFERENCES Table(Field). Each named item remains core.

**Marking guidance:** Credit distinct syllabus-accurate points that follow the command word.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - application - compare - 4 marks

Compare two closely related ideas from Section 3: Hardware.

**Answer:** Use the standard symbols and define the functions of NOT, AND, OR, NAND, NOR and XOR (EOR); all gates except NOT have two inputs. Construct circuits, truth tables and expressions from each of the other stated representations: problem statement, logic expression, logic circuit and truth table.

**Marking guidance:** Credit distinct syllabus-accurate points that follow the command word.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Question 4 - transfer - apply - 4 marks

Apply one method from Section 1: Information representation to a fresh exam context.

**Answer:** Conversions apply to integer values and the binary, denary, hexadecimal, BCD, one's-complement and two's-complement representations named in the preceding Version 2 row.

**Marking guidance:** Credit distinct syllabus-accurate points that follow the command word.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/S/25 Q6(c) | 6 | complete | recall |
| 9618/11/S/25 Q6(b) | 5 | complete | recall |
| 9618/11/S/25 Q7(b) | 5 | describe | explain |
| 9618/13/W/25 Q5(c) | 5 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define paper 1 integrated review and error clinic with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For paper 1 integrated review and error clinic, use the exact technical term before applying it to the scenario.

**Optional extra practice:** Correct one answer from a timed attempt and record the exact reason each lost mark was lost.
