# Lesson 067: Encryption, hashing, and digital certificates

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Encryption, hashing, and digital certificates** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Encryption, hashing, and digital certificates** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Encryption, hashing, and digital certificates, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Encryption, hashing, and digital certificates**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A website stores passwords and sends payment data. Decide where hashing, encryption and a digital certificate are used. The worked example must explicitly use **Encryption, hashing, and digital certificates**, not a generic example from the wider unit.

**Worked answer / marking focus:** Hash stored passwords; encrypt payment data in transit; use a digital certificate to support authentication of the website and secure HTTPS communication.



## Student Task
Students create a three-column table: protection method, what it protects, what it does not protect. Their final answer must include the phrase **Encryption, hashing, and digital certificates** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Encryption, hashing, and digital certificates**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Encryption, hashing, and digital certificates** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Encryption, hashing, and digital certificates** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **encryption, hashing, and digital certificates**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S6.03
**Focus:** Digital signatures

### Direct explanation

- A sender hashes the message and encrypts the hash with the sender's private key to form a digital signature. The receiver uses the sender's public key to recover/verify the signed hash and independently hashes the received message.
- Matching hashes provide evidence of integrity and origin/authenticity; a valid signature does not keep the message confidential. Certificates help bind a public key to an identity.

### Worked example

**Verify a signed update:** The device verifies the signature using the publisher's public key, hashes the downloaded update and compares hashes. A mismatch means the file or signature is not valid.

### Targeted practice and answers

1. Which key creates a sender's digital signature?
   **Answer:** The sender's private key.
2. What does the receiver compare?
   **Answer:** The verified signed hash with a newly calculated message hash.
3. Does a digital signature encrypt the whole message for confidentiality?
   **Answer:** Not necessarily; its main purposes are integrity and authentication/non-repudiation evidence.

### Exam-style question and MS

**Question (4 marks):** Describe how a digital signature is created and checked.

- **B1** sender creates a hash of the message
- **B1** hash is signed/encrypted using sender's private key
- **B1** receiver uses sender's public key and hashes received message
- **B1** matching hashes verify integrity and provide evidence of sender authenticity

**Strict note:** Do not award confidentiality as the purpose of a signature unless separate message encryption is described.
