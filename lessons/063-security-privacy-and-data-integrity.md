# Lesson 063: Security, privacy and data integrity

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Security, privacy and data integrity

### Direct explanation

- Data security is protection against unauthorised access, loss or damage. Privacy concerns appropriate collection, use and disclosure of personal data. Integrity means data remains accurate, complete and unaltered except by authorised processes.
- The concepts overlap but are not synonyms: encrypted inaccurate data may be secure but lack integrity; authorised publication may preserve integrity while violating privacy.
- Both data security and computer-system security are necessary. Protecting only a data file is insufficient if an attacker can control the operating system, install malware, steal credentials or make the computer system unavailable; protecting only the device is insufficient if copied data is disclosed, altered or lost.

### Worked example

**Medical records on a compromised computer system:** Encryption restricts unauthorised reading of the record data. Access rights restrict who may view or alter it. Anti-virus and a firewall help protect the computer system that stores and processes the records. If malware controls the system, it may steal decrypted data, alter records or stop authorised access even though the stored file was encrypted.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Which concept is damaged when data is altered incorrectly?
   **Answer:** Integrity.
2. Which concept concerns how personal data is collected and disclosed?
   **Answer:** Privacy.
3. Can data be secure but inaccurate?
   **Answer:** Yes; access protection does not guarantee correctness.
4. Why must the computer system also be protected?
   **Answer:** A compromised or unavailable system can expose, alter, delete or prevent access to the data it processes, even when a stored file has a separate protection such as encryption.

### Exam-style question and MS

**Question (5 marks):** Compare data security, privacy and integrity, then explain why both data and its computer system require security.

| Answer | Guidance | Marks |
|---|---|---:|
| security protects against unauthorised access/loss/damage | Do not accept repeated versions of 'keeping data safe' or the claim that file encryption alone secures the computer system. | 1 |
| privacy controls appropriate personal-data use/disclosure |  | 1 |
| integrity concerns accuracy/completeness/authorised change |  | 1 |
| computer-system compromise can expose/alter/destroy data or prevent authorised access |  | 1 |
| data-specific and system controls are both required / one does not replace the other |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the threats, controls or security properties involved in **Security goals: confidentiality, integrity, availability, and authenticity**.
2. Explain how a named control reduces a stated risk.
3. Recommend controls for a scenario and state any relevant limitation.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Focus question: Which feature distinguishes **Security goals: confidentiality, integrity, availability, and authenticity** from the most closely related syllabus concept?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Security goals: confidentiality, integrity, availability, and authenticity, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

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
- Answer one 4-mark question about **Security goals: confidentiality, integrity, availability, and authenticity**. Follow its command word and apply each point to the stated context.

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

### Authenticity checks that identity or data origin is genuine

- **Explains:** `authenticity`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-063-authenticity.jpg`

1. Goal Users, devices, messages or files should be verified as genuine.
2. Risk An attacker pretends to be a valid user, sender or website.
3. Controls Authentication, digital certificates, digital signatures and multi-factor authentication can support authenticity.
4. Exam wording Say what identity or source is being verified, not just "make it secure".

### Availability keeps systems and data accessible when needed

- **Explains:** `availability`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-063-availability.jpg`

1. Goal Authorised users should be able to access data and services when required.
2. Risk Hardware failure, network failure or overload prevents legitimate use.
3. Controls Backups, redundancy, disaster recovery, UPS and monitoring can support availability.
4. Exam wording State what remains accessible or recoverable, and for whom.

### Confidentiality protects data from unauthorised access

- **Explains:** `confidentiality`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-063-confidentiality.jpg`

1. Goal Only authorised users should be able to view or access the data.
2. Risk Personal details, passwords or exam marks are viewed by unauthorised people.
3. Controls Access rights, authentication, encryption and least privilege can support confidentiality.
4. Exam wording Say who is prevented from reading what, and why they are unauthorised.

### Integrity protects data from unauthorised or accidental alteration

- **Explains:** `integrity`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-063-integrity.jpg`

1. Goal Data should remain accurate, complete and unaltered unless changed by an authorised process.
2. Risk Exam marks, bank balances or stock levels are changed incorrectly.
3. Validation and verification Validation checks stated rules; verification checks entered or transferred data against its source, not whether the source is true or complete.
4. Other controls Access rights, checksums, hashes and audit trails can prevent, detect or record some changes, but no control guarantees integrity.
5. Exam wording Explain exactly how the named control prevents, detects or records an incorrect change.

### Use the risk chain before naming a control

- **Explains:** `risk-chain`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-063-risk-chain.jpg`

1. Asset Something valuable that needs protection, such as exam marks, passwords or customer records.
2. Threat A possible cause of harm, such as unauthorised access, data corruption or service failure.
3. Vulnerability A weakness that a threat could exploit, such as weak passwords or poor permissions.
4. Control A safeguard that reduces likelihood or impact, such as access rights, backups or authentication.
<!-- stage10-explanations:end -->
