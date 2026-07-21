# Lesson 062: Security goals: confidentiality, integrity, availability, and authenticity

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Security goals: confidentiality, integrity, availability, and authenticity** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Security goals: confidentiality, integrity, availability, and authenticity** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Security goals: confidentiality, integrity, availability, and authenticity, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Security goals: confidentiality, integrity, availability, and authenticity**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A school stores exam marks online. Identify two risks and one control for each. The worked example must explicitly use **Security goals: confidentiality, integrity, availability, and authenticity**, not a generic example from the wider unit.

**Worked answer / marking focus:** Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.



## Student Task
Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks. Their final answer must include the phrase **Security goals: confidentiality, integrity, availability, and authenticity** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Security goals: confidentiality, integrity, availability, and authenticity**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Security goals: confidentiality, integrity, availability, and authenticity** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Security goals: confidentiality, integrity, availability, and authenticity** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **security goals: confidentiality, integrity, availability, and authenticity**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S6.01
**Focus:** Security, privacy and data integrity

### Direct explanation

- Data security is protection against unauthorised access, loss or damage. Privacy concerns appropriate collection, use and disclosure of personal data. Integrity means data remains accurate, complete and unaltered except by authorised processes.
- The concepts overlap but are not synonyms: encrypted inaccurate data may be secure but lack integrity; authorised publication may preserve integrity while violating privacy.

### Worked example

**Incorrect medical record:** A record encrypted from attackers has security, but an accidental dosage change damages integrity. Sending the accurate record to an unauthorised advertiser violates privacy.

### Targeted practice and answers

1. Which concept is damaged when data is altered incorrectly?
   **Answer:** Integrity.
2. Which concept concerns how personal data is collected and disclosed?
   **Answer:** Privacy.
3. Can data be secure but inaccurate?
   **Answer:** Yes; access protection does not guarantee correctness.

### Exam-style question and MS

**Question (4 marks):** Distinguish data security, privacy and integrity using one data-record scenario.

- **B1** security protects against unauthorised access/loss/damage
- **B1** privacy controls appropriate personal-data use/disclosure
- **B1** integrity concerns accuracy/completeness/authorised change
- **B1** scenario correctly distinguishes at least two consequences

**Strict note:** Do not accept three repetitions of 'keeping data safe'.
