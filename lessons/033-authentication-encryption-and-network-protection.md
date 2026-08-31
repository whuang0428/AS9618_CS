# Lesson 033: Authentication, encryption and network protection

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 6: Security, privacy and data integrity<br>
**Syllabus requirements:** S6.03, S6.06<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S6.05 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Describe methods that restrict the risks posed by threats to data and computer systems; evidence must match each control mechanism to the attack route and avoid claims of total prevention.
- Understand restriction of access to data and computer systems as a risk-reduction method.


## 2. Knowledge explanation

### 1. User accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware and encryption as security measures (S6.03)

**Concept relationships**

- **user account:** User accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware…
- **digital signature:** User accounts, passwords, digital signatures, biometrics, firewall, anti-virus,…
- **anti-spyware:** Anti-virus and anti-spyware detect known malicious software
- **security measure:** Security measures for computer systems from a stand-alone…
- **antivirus:** Anti-virus software scans files, memory and activity for…
- **password:** Biometrics can be convenient and cannot be casually…

**Mechanism**

1. **Identify what needs protection** — User accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware and encryption as security measures.
2. **Trace the attack or error route** — User accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence.
3. **Match a safeguard and limitation** — Anti-virus software scans files, memory and activity for virus signatures or suspicious behaviour, then blocks, quarantines or removes…

**Biometrics: convenient identity evidence from physical or behavioural…:** A biometric sensor captures a physical or behavioural feature and the system compares its template with a stored enrolled template. A match authenticates the identity claim; authorisation is a separate process that decides what…

#### Biometrics: convenient identity evidence from physical or behavioural features

![Biometrics: convenient identity evidence from physical or behavioural features](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-biometrics.jpg)

<details><summary>Text transcript</summary>

- A biometric sensor captures a physical or behavioural feature and the system compares its template with a stored enrolled template.
- A match authenticates the identity claim; authorisation is a separate process that decides what an authenticated user may access or do.
- A false reject denies a valid enrolled user by mistake; a false accept authenticates an impostor by mistake.
- Biometrics require sensors and stored templates and may create privacy, false-accept and false-reject risks.

</details>

<details><summary>Precise syllabus wording</summary>

Understand user accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware and encryption as security measures.

Describe security measures for computer systems from a stand-alone PC to a network: user accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence.

</details>

### 2. How encryption and access rights protect data (S6.06)

**Concept relationships**

- **encryption:** Security methods designed to protect data, including encryption…
- **access:** How encryption and access rights protect data.
- **rights:** Encryption therefore protects confidentiality, while access rights can…
- **protect:** Encryption protects readable data.
- **user account:** Encryption does not decide which logged-in user may…

**Mechanism**

1. **Identify what needs protection** — Security methods designed to protect data, including encryption and access rights
2. **Trace the attack or error route** — How encryption and access rights protect data.
3. **Match a safeguard and limitation** — Encryption therefore protects confidentiality, while access rights can protect confidentiality and integrity by preventing unauthorised viewing or alteration.

**One control can support more than one goal,…:** Encryption makes data unreadable without the correct key and supports confidentiality. Access rights prevent unauthorised viewing and prevent unauthorised alteration; they support confidentiality and integrity but do not detect whether data changed.

#### One control can support more than one goal, but not every goal

![One control can support more than one goal, but not every goal](../web/assets/diagrams/stage10-infographics/stage10-lesson-063-controls.jpg)

<details><summary>Text transcript</summary>

- Encryption makes data unreadable without the correct key and supports confidentiality.
- Access rights prevent unauthorised viewing and prevent unauthorised alteration; they support confidentiality and integrity but do not detect whether data changed.
- Backups allow recovery after data loss or corruption and support availability.
- Hash/checksum comparison can detect whether data changed and supports integrity, but it does not prevent unauthorised alteration.

</details>

<details><summary>Precise syllabus wording</summary>

Explain how encryption and access rights protect data.

Describe security methods designed to protect data, including encryption and access rights; evidence must explain their different mechanisms and limitations.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- Describe security measures for computer systems from a stand-alone PC to a network: user accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence.
- Describe security methods designed to protect data, including encryption and access rights; evidence must explain their different mechanisms and limitations.
- A virus is malware that attaches to a host file or program and spreads when the infected host is run or shared. Spyware secretly monitors activity or collects data, such as keystrokes, credentials or browsing behaviour. These threats can damage the security of both data and the computer system.
- Anti-virus software scans files, memory and activity for virus signatures or suspicious behaviour, then blocks, quarantines or removes detected malicious code. Anti-spyware performs corresponding detection and removal for spyware; the categories may be combined in one security product, but their syllabus roles must still be stated accurately.
- Anti-virus and anti-spyware definitions and detection rules must be updated because new threats appear. Both measures reduce risk but cannot guarantee detection of every new, modified or concealed threat.
- Each security measure has a distinct mechanism: a user account identifies a user; a password authenticates knowledge; a digital signature supports integrity and origin checks; a biometric compares a captured feature; a firewall filters traffic; anti-virus and anti-spyware detect known malicious software; encryption protects readable data. The threats include a virus, spyware, a hacker, phishing and pharming; each threat must be matched to a control whose mechanism reduces that risk.
- A user account gives an individual or role a distinct system identity and supports accountability. A password is secret knowledge used to authenticate an identity claim. Accounts should not be shared; passwords should be difficult to guess, stored as salted hashes, protected by attempt limits and changed if compromised.
- Biometrics use a physical or behavioural characteristic such as fingerprint, face, iris, retina, voice or typing pattern. A captured feature is converted to a template and compared with an enrolled template. A match authenticates the identity claim; authorisation is the separate decision about what that user may access or do.
- False rejection denies a valid enrolled user by mistake; false acceptance authenticates an impostor by mistake. Biometrics can be convenient and cannot be casually shared like a password, but require sensors/templates, may raise privacy concerns and cannot normally be replaced as easily as a compromised password.
- Access rights restrict authorised actions on resources. Read permission controls viewing; write/modify controls alteration; delete controls removal; execute or administrative rights control running software or changing system settings. Least privilege grants only the permissions needed for a role and removes temporary rights when no longer required.
- Encryption transforms plaintext into ciphertext using an algorithm and key. Without the correct decryption key, intercepted or stolen ciphertext should not reveal readable content. Encryption therefore protects confidentiality, while access rights can protect confidentiality and integrity by preventing unauthorised viewing or alteration.
- The methods do different jobs: encryption does not decide which logged-in user may edit a record, and access rights do not make a stolen unencrypted copy unreadable. Neither method guarantees availability, data truth or protection after an authorised account is misused.

</details>

### Worked method

1. Protect a home laptop and a school network
2. The laptop's host firewall blocks unsolicited inbound connections except an explicitly required service.
3. The school's boundary firewall denies unrequested external traffic, permits web traffic under ordered rules and logs repeated blocked attempts.
4. Anti-virus still scans downloaded files, and account/access controls still decide who may use data after traffic is allowed.

Beyond syllabus / 延伸知识（不要求背诵）: real security uses defence in depth, combining controls so that one failed control does not expose the whole system.
## 3. Practice by question type

### Question 1 - foundation - describe - 6 marks

Describe how a firewall can protect both a stand-alone PC and a network, then explain two limitations that require other security measures.

**Answer:** firewall compares traffic/connection information with configured rules; allows/blocks/rejects/logs according to a rule; host firewall protects one PC; network firewall protects a network boundary; allowed traffic or misconfiguration limitation; matching additional measure such as anti-virus, authentication, access rights or user training

**Marking guidance:** Do not claim that a firewall removes viruses, detects every malicious payload or makes a computer system completely secure.

**Common error:** For the command word describe, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - apply - 2 marks

What is the purpose of a user account?

**Answer:** It provides a distinct identity for authentication, access control and accountability.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - apply - 2 marks

Does successful authentication decide every permitted action?

**Answer:** No. Authorisation/access rights separately decide what the authenticated user may access or do.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/S/24 Q3(b) | 4 | complete | recall |
| 9618/12/S/24 Q3(i) | 3 | describe | explain |
| 9618/12/S/24 Q3(ii) | 3 | describe | explain |
| 9618/13/S/23 Q6(a) | 5 | explain | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define authentication, encryption and network protection with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For authentication, encryption and network protection, use the exact technical term before applying it to the scenario.
