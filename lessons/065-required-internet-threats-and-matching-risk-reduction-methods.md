# Lesson 065: Required internet threats and matching risk-reduction methods

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Required internet threats and matching risk-reduction methods

### Direct explanation

- The required threats are malware (virus and spyware), hackers, phishing and pharming. A hacker gains unauthorised access to a computer system or data. Phishing uses a deceptive message, link or site to persuade a user to disclose information. Pharming redirects traffic to a fake website, possibly even after the user enters the correct address.
- Methods restrict risk only when their mechanism matches the threat: updated anti-virus and anti-spyware can detect known malware; user training and independent contact checks reduce phishing; secure DNS, certificate/HTTPS checks and patched software reduce pharming risk; strong authentication, access rights, patching, firewalls and monitoring reduce unauthorised access by hackers.
- A control reduces likelihood or impact; it rarely makes an attack impossible. Layered controls are needed because people, software, credentials and network traffic provide different attack routes.

### Worked example

**Protect an online payroll service:** Staff receive a phishing email while a hacker probes the server and pharming redirects one user towards a fake site. Training and an independent sender check reduce phishing risk; multi-factor authentication reduces the value of a stolen password; a firewall filters unwanted traffic; access rights limit what an authenticated account may change; updated anti-virus and anti-spyware detect known virus or spyware signatures; secure DNS and certificate warnings reduce pharming risk.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Compare phishing from pharming.
   **Answer:** Phishing persuades through a deceptive message/link/site; pharming redirects traffic to a fake site, potentially after the correct address is entered.
2. What is the syllabus meaning of a hacker threat?
   **Answer:** A person gaining or attempting unauthorised access to a computer system or data.
3. Draw lines to match virus, spyware, phishing and pharming to one suitable risk-reduction method each.
   **Answer:** Updated anti-virus; updated anti-spyware; training/independent verification; secure DNS plus certificate/HTTPS checks, respectively.
4. Why are layered controls required?
   **Answer:** Different controls address different attack routes, so failure or bypass of one control need not expose the whole system.

### Exam-style question and MS

**Question (6 marks):** For each of virus, spyware, hacking, phishing and pharming, describe the threat route and one matching method that restricts its risk.

| Answer | Guidance | Marks |
|---|---|---:|
| virus route plus anti-virus mechanism | Do not define phishing and pharming identically or award a control that is unrelated to the stated attack route. | 1 |
| spyware route plus anti-spyware mechanism |  | 1 |
| hacker/unauthorised-access route plus a matching access/network control |  | 1 |
| phishing/deception route plus training or independent verification |  | 1 |
| pharming/redirection route plus secure DNS/certificate/HTTPS or patched-software control |  | 1 |
| states that controls reduce rather than eliminate risk |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the threats, controls or security properties involved in **Hacking, phishing, pharming, and denial-of-service attacks**.
2. Explain how a named control reduces a stated risk.
3. Recommend controls for a scenario and state any relevant limitation.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Focus question: Which feature distinguishes **Hacking, phishing, pharming, and denial-of-service attacks** from the most closely related syllabus concept?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Hacking, phishing, pharming, and denial-of-service attacks, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

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
- Answer one 4-mark question about **Hacking, phishing, pharming, and denial-of-service attacks**. Follow its command word and apply each point to the stated context.

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

### Compare by route and result

- **Explains:** `compare`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-compare.jpg`

1. Route or mechanism
2. Direct result
3. Access controls are bypassed or abused.
4. Unauthorised access; data may then be viewed, copied, changed or deleted.
5. Phishing
6. A deceptive message, link or site persuades the user to reveal information.
7. Credentials or personal data are disclosed; later unauthorised access is possible but not guaranteed.
8. Pharming
9. Traffic is redirected to a fake site, possibly after the correct URL is entered.
10. The user may submit data to the fake site; later credential theft or misuse is possible but not guaranteed.
11. DoS/DDoS
12. A server or network is overwhelmed by requests or traffic.

### Controls must fit the attack route

- **Explains:** `controls`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-controls.jpg`

1. Against hacking Strong authentication, access rights, patching, audit logs and monitoring.
2. Against phishing User training, checking URLs/senders, email filtering, reporting routes and MFA.
3. Against pharming Secure DNS, certificate checks, HTTPS warnings, anti-malware and browser updates.
4. Against DoS Traffic filtering, rate limiting, firewalls, load balancing and DDoS mitigation services.
5. Do not overclaim. A control reduces risk; it rarely makes the attack impossible.

### Start from mechanism, then discuss impact

- **Explains:** `core`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-core.jpg`

1. Asset Data, account, system or service being protected.
2. Attack vector The route used by the attacker: access, deception, redirection or flooding.
3. Impact Loss of confidentiality, integrity, availability or authenticity.
4. Control A safeguard that reduces risk, detects attack or supports recovery.

### Denial-of-service: making a service unavailable

- **Explains:** `dos`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-dos.jpg`

1. Mechanism Floods a server, network or service with traffic or requests so legitimate users cannot access it.
2. DDoS Distributed DoS uses many devices/sources, making filtering harder.
3. Impact Loss of availability, lost sales, disrupted lessons or inability to access online services.
4. Common error DoS does not primarily mean data is stolen; the main issue is service availability.

### Hacking: gaining unauthorised access to a system or data

- **Explains:** `hacking`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-hacking.jpg`

1. Mechanism Bypasses or abuses access controls to enter an account, device or system.
2. Examples Using stolen credentials, exploiting a vulnerability or accessing an account without permission.
3. Impact Data may be viewed, copied, changed or deleted; system settings may be altered.
4. Common error Do not use "hacking" as a label for every cyber attack. It specifically involves unauthorised access.

### Pharming: redirecting users to a fake website

- **Explains:** `pharming`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-pharming.jpg`

1. Mechanism Redirects traffic from a legitimate website to a fake one, often by attacking name resolution.
2. User clue The user may type the correct URL but still arrive at a fraudulent page.
3. Impact Users may submit credentials or payment details to the attacker.
4. Common error Do not define pharming as just "sending a fake email"; that is phishing.

### Phishing: tricking users into revealing information or visiting a fake page

- **Explains:** `phishing`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-065-phishing.jpg`

1. Mechanism Uses deceptive emails, messages or websites that appear to come from a trusted source.
2. User action The user may enter credentials, personal data or payment details.
3. Clues Urgent language, suspicious sender, unexpected link, spelling issues or mismatched URL.
4. Impact Credential theft can lead to unauthorised access and impersonation.
<!-- stage10-explanations:end -->
