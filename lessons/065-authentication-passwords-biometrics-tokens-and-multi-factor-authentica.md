# Lesson 065: Authentication: passwords, biometrics, tokens, and multi-factor authentication

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the threats, controls or security properties involved in **Authentication: passwords, biometrics, tokens, and multi-factor authentication**.
2. Explain how a named control reduces a stated risk.
3. Recommend controls for a scenario and state any relevant limitation.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Focus question: Which feature distinguishes **Authentication: passwords, biometrics, tokens, and multi-factor authentication** from the most closely related syllabus concept?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Authentication: passwords, biometrics, tokens, and multi-factor authentication, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

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
- Answer one 4-mark question about **Authentication: passwords, biometrics, tokens, and multi-factor authentication**. Follow its command word and apply each point to the stated context.

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

### Biometrics: convenient identity evidence from physical or behavioural features

- **Explains:** `biometrics`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-biometrics.jpg`

1. Examples Fingerprint, face, iris, retina, voice or typing pattern.
2. Advantage Difficult to forget, lose or share casually; quick for users.
3. Limitation Requires sensors and stored biometric templates; may raise privacy concerns.
4. Error types False reject blocks a valid user; false accept allows an unauthorised user.

### Compare methods by evidence, risk and context

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-compare.jpg`

1. Evidence
2. Strengths and limitations
3. Password/PIN
4. Something the user knows.
5. Low cost and familiar; can be guessed, reused, shared, phished or forgotten.
6. Biometric
7. Something the user is.
8. Convenient and hard to forget; needs sensors and may have false accepts/rejects or privacy concerns.
9. Something the user has.
10. Useful second factor; can be lost, stolen, damaged or unavailable.
11. Two or more different factor categories.
12. Reduces account takeover risk; increases setup, support and recovery complexity.

### Authentication is identity checking

- **Explains:** `core`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-core.jpg`

1. Authentication Verifies that a user, device or process is who it claims to be.
2. Claim The identity presented, such as a username, account or device ID.
3. Credential Evidence used to prove the claim, such as a password, biometric or token.
4. Authorisation Decides what an authenticated user is allowed to access or change.

### Authentication factors: know, have, are

- **Explains:** `factors`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-factors.jpg`

1. Something you know Password, passphrase or PIN. Risk: guessed, reused, shared or phished.
2. Something you have Security token, smart card or one-time code device. Risk: lost, stolen or unavailable.
3. Something you are Biometric characteristic such as fingerprint, face, iris or voice. Risk: false acceptance or privacy concerns.
4. Factor type Two checks only become MFA when they come from different factor categories.

### MFA combines different factor types

- **Explains:** `mfa`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-mfa.jpg`

1. Definition Multi-factor authentication requires evidence from two or more different factor categories.
2. Example Password plus phone app code: something you know plus something you have.
3. Benefit If a password is stolen, the attacker still needs the second factor.
4. Cost More setup, recovery problems and user friction if a device is unavailable.

### Estimate password quality without collecting real passwords

- **Explains:** `password-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-password-tool.jpg`

1. Interactive password check
2. Use a practice string only. Never type a real password into lesson tools, screenshots or chat.
3. Practice password

### Passwords: cheap, familiar and often ruined by humans

- **Explains:** `passwords`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-passwords.jpg`

1. Strength Longer passwords or passphrases with less predictable structure are harder to guess.
2. Weakness Users may reuse, share, write down or choose predictable passwords.
3. Storage Systems should not store plaintext passwords; hashes are commonly used for verification.
4. Control Password policy, lockout/rate limiting, user education and MFA reduce risk.

### Tokens: proof that the user has a specific device or object

- **Explains:** `tokens`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-tokens.jpg`

1. Hardware token A physical device, card or key used during login.
2. Software token An app or service that generates a one-time code.
3. One-time code A code valid for a short time or single login attempt.
4. Limitation Tokens can be lost, stolen, damaged, out of battery or unavailable without a phone/network.
<!-- stage10-explanations:end -->
