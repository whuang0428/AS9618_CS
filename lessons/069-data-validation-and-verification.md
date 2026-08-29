# Lesson 069: Data validation and verification

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Complete validation and verification methods

### Direct explanation

- Validation checks whether data is reasonable and follows rules: range, format, length, presence, existence, limit and check digit. It cannot prove truth. A range check applies both a lower and an upper bound, such as 0 to 75. A limit check applies one stated upper or lower limit, such as file size no greater than 10 MiB or temperature at least -20 degrees Celsius.
- A format check tests a required pattern; a length check tests the number of characters; a presence check rejects a blank required field; an existence check confirms a value is stored in a specified lookup file; and a check digit is calculated from the other digits and compared. Verification checks whether data was copied accurately, using visual checking or double entry.
- Error detection includes parity: a parity byte checks one group and block parity adds row/column checks; a checksum is calculated from a data block and compared after transmission. These detect many errors but do not correct every error.
- During transfer, a parity check can be applied to a byte or a block, while a checksum provides a separate calculated verification value.
- Data validation and data verification help protect data integrity by detecting or preventing many input, copying and transfer errors before inaccurate or corrupted data are accepted. They reduce these risks but do not prove that the original source is true or replace access control and backup.

### Worked example

**Validate input, then verify a transferred record:** A 10 MiB maximum uses an upper limit check because it has one permitted limit; a mark from 0 to 75 uses a range check because it has both lower and upper bounds. A product code uses presence, length, format, existence and check-digit rules. During entry, visual checking or double entry compares values. During transfer, byte parity detects many single-bit errors, block parity adds row/column evidence and a checksum is recalculated from the received data block.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. How do validation and verification help protect data integrity?
   **Answer:** They detect or prevent many input, copying and transfer errors, reducing the chance that inaccurate or corrupted data are accepted; they do not prove that the source is true.
2. Which check enforces a file size of no more than 10 MiB?
   **Answer:** An upper limit check.
3. How does a range check differ from a limit check?
   **Answer:** A range check applies both lower and upper bounds; a limit check applies one stated upper or lower limit.
4. Which check confirms a foreign code is already stored in a lookup file?
   **Answer:** Existence check.
5. Draw lines to match each rule to its validation check: AA1234 follows two letters then four digits; a code has exactly six characters; a required name is not blank; a barcode includes a digit calculated from the other digits.
   **Answer:** Format check; length check; presence check; check digit, respectively.
6. How does double-entry verification work?
   **Answer:** Data is entered twice and the two entries are compared.
7. Compare byte parity from block parity.
   **Answer:** Byte parity checks the agreed odd/even parity for one byte; block parity applies parity across rows and columns of a block and can locate many single-bit errors.
8. What happens to a checksum at the receiver?
   **Answer:** It is recalculated and compared with the transmitted checksum.

### Exam-style question and MS

**Question (5 marks):** Describe one verification method used during data entry and two methods used during data transfer.

| Answer | Guidance | Marks |
|---|---|---:|
| visual check against source or double entry with comparison | Do not substitute validation checks for verification, merge byte and block parity into one unexplained word, or claim that detection automatically corrects an error. | 1 |
| byte parity uses an agreed odd/even parity bit and checks it at the receiver |  | 1 |
| block parity checks rows and columns / can locate many single-bit errors |  | 1 |
| checksum is recalculated from received block and compared |  | 1 |
| methods detect many errors but do not prove truth or automatically correct every error |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the threats, controls or security properties involved in **Data validation and verification**.
2. Explain how a named control reduces a stated risk.
3. Recommend controls for a scenario and state any relevant limitation.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Focus question: Which feature distinguishes **Data validation and verification** from the most closely related syllabus concept?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Data validation and verification, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: asset and threat. Middle: risk chain. Right: control mapped to CIA/authenticity.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A school stores exam marks online. Identify two risks and one control for each.

**Worked answer / marking focus:** Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.

## Student Task
Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Data validation and verification**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Common validation checks

- **Explains:** `checks`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-checks.jpg`

1. The seven required validation methods are range, format, length, presence, existence, limit and check digit.
2. A range check applies both a lower and an upper bound; a limit check applies one stated upper or lower limit.
3. An existence check confirms that a value is present in a specified stored lookup or file.
4. A check digit is calculated from the other digits and compared to detect many entry or scanning errors.
5. Validation checks rules and reasonableness; it does not prove that data is true.

### Validation and verification are partners, not synonyms

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-compare.jpg`

1. Question answered
2. Validation
3. Does this data obey the rule?
4. Reject mark 91 when maximum mark is 75.
5. Verification
6. Was this copied or entered correctly?
7. Compare typed name with the paper form.
8. Both together
9. Does it follow rules, and does it match the source?
10. Check date format, then compare with original application form.

### Validation and verification protect data quality in different ways

- **Explains:** `core`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-core.jpg`

1. Validation Checks input data against rules before it is accepted.
2. Verification Checks that data has been copied, entered or transferred accurately.
3. Input error A mistake made while entering or transferring data.
4. Data integrity Data remains accurate, consistent and not accidentally corrupted.

### Neither method guarantees truth

- **Explains:** `limits`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-limits.jpg`

1. Validation limit A valid value can still be wrong, such as a valid but incorrect postcode.
2. Verification limit Data can be copied accurately from a source that was already wrong.
3. Human factor Visual checks can be skipped or performed carelessly.
4. Security link Better input quality supports integrity but does not replace access control or backup.

### Validation checks whether data obeys a rule

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-validation.jpg`

1. Before acceptance Invalid input can be rejected or a warning can be shown.
2. Rule-based The rule may test type, range, length, format, presence or check digit.
3. Benefit Reduces obvious errors and prevents unsuitable data entering the system.
4. Limit Valid data can still be factually wrong, such as an incorrect but possible date.

### Verification checks accuracy against the source

- **Explains:** `verification`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-verification.jpg`

1. During data entry, visual checking compares entered data with its source and double entry compares two independently entered values.
2. During transfer, a parity check on a byte tests the agreed odd or even parity; block parity applies parity across rows and columns of a data block.
3. For a checksum, the sender calculates and transmits a value for the data block; the receiver recalculates and compares it.
4. These methods detect many errors but do not prove truth or automatically correct every error.
5. A validation check digit belongs to an identifier; a transfer checksum belongs to a transmitted data block.

### Which verification method fits?

- **Explains:** `verify-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-verify-tool.jpg`

1. Interactive verification selector
2. Scenario
<!-- stage10-explanations:end -->
