# Lesson 069: Data validation and verification

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Data validation and verification** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Data validation and verification** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Data validation and verification, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Data validation and verification**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: asset and threat. Middle: risk chain. Right: control mapped to CIA/authenticity.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** A school stores exam marks online. Identify two risks and one control for each. The worked example must explicitly use **Data validation and verification**, not a generic example from the wider unit.

**Worked answer / marking focus:** Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.



## Student Task
Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks. Their final answer must include the phrase **Data validation and verification** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Data validation and verification**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Data validation and verification** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Data validation and verification** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **data validation and verification**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S6.07, S6.08
**Focus:** Complete validation and verification methods

### Direct explanation

- Validation checks whether data is reasonable and follows rules: range, format, length, presence, existence, limit and check digit. It cannot prove truth. Verification checks whether data was copied accurately, using visual checking or double entry.
- Error detection includes parity: a parity byte checks one group and block parity adds row/column checks; a checksum is calculated from a data block and compared after transmission. These detect many errors but do not correct every error.

### Worked example

**New product code:** A presence check rejects blank input, length and format checks enforce the pattern, an existence check confirms the code is in the product file, and a check digit detects many keying errors. None proves the label was attached to the correct product.

### Targeted practice and answers

1. Which check confirms a foreign code is already stored in a lookup file?
   **Answer:** Existence check.
2. How does double-entry verification work?
   **Answer:** Data is entered twice and the two entries are compared.
3. What happens to a checksum at the receiver?
   **Answer:** It is recalculated and compared with the transmitted checksum.

### Exam-style question and MS

**Question (4 marks):** For an eight-digit account number, describe two suitable validation checks and one verification method.

- **B1** length check requires eight characters/digits
- **B1** format/type/check-digit or existence check accurately described
- **B1** visual check against source or double entry described
- **B1** distinguishes validation reasonableness from verification accuracy of copying

**Strict note:** Do not accept 'validation proves the account number is correct'.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Common validation checks

- **Explains:** `checks`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-checks.jpg`

1. What it tests
2. Range check
3. Value is within allowed limits.
4. Exam mark must be 0 to 75.
5. Length check
6. Number of characters is correct or acceptable.
7. Student ID must be 8 characters.
8. Type check
9. Data uses the expected data type.
10. Quantity must be an integer.
11. Format check
12. Data follows a required pattern.

### Validation and verification are partners, not synonyms

- **Explains:** `compare`
- **Explanation type:** comparison
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
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-core.jpg`

1. Validation Checks input data against rules before it is accepted.
2. Verification Checks that data has been copied, entered or transferred accurately.
3. Input error A mistake made while entering or transferring data.
4. Data integrity Data remains accurate, consistent and not accidentally corrupted.

### Neither method guarantees truth

- **Explains:** `limits`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-limits.jpg`

1. Validation limit A valid value can still be wrong, such as a valid but incorrect postcode.
2. Verification limit Data can be copied accurately from a source that was already wrong.
3. Human factor Visual checks can be skipped or performed carelessly.
4. Security link Better input quality supports integrity but does not replace access control or backup.

### Validation checks whether data obeys a rule

- **Explains:** `validation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-validation.jpg`

1. Before acceptance Invalid input can be rejected or a warning can be shown.
2. Rule-based The rule may test type, range, length, format, presence or check digit.
3. Benefit Reduces obvious errors and prevents unsuitable data entering the system.
4. Limit Valid data can still be factually wrong, such as an incorrect but possible date.

### Verification checks accuracy against the source

- **Explains:** `verification`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-verification.jpg`

1. Double entry Data is entered twice and the two entries are compared.
2. Visual check A person compares entered data with the original document or screen.
3. Proofreading Entered text is checked against the source for typing errors.
4. Transfer check Data copied or transmitted is compared with the original or expected value.

### Which verification method fits?

- **Explains:** `verify-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-verify-tool.jpg`

1. Interactive verification selector
2. Scenario
<!-- stage10-explanations:end -->
