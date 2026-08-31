# Lesson 033: Authentication, encryption and network protection

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 6: Security, privacy and data integrity<br>
**Syllabus requirements:** S6.03, S6.06<br>
**Pacing:** Flexible. Select the material set and practice depth needed by the learner.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Use every knowledge-point material set, the worked method, the terminology check and all questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S6.05 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Describe methods that restrict the risks posed by threats to data and computer systems; evidence must match each control mechanism to the attack route and avoid claims of total prevention.
- Understand restriction of access to data and computer systems as a risk-reduction method.


## 2. Knowledge explanation

### 1. User account · Password · Digital signature · Biometric (S6.03)

**Concept map:** user account → password → digital signature → biometric → firewall → anti-virus → anti-spyware → encryption → security measure

**Three-part explanation:**

1. user accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence
2. Describe security measures for computer systems from a stand-alone PC to a network
3. Describe security methods designed to protect data, including encryption and access rights

**Concrete cue:** Describe security measures for computer systems from a stand-alone PC to a network: user accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence.

#### Compare methods by evidence, risk and context

![Compare methods by evidence, risk and context](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-compare.jpg)

<details><summary>Text transcript</summary>

- Evidence
- Strengths and limitations
- Password/PIN
- Something the user knows.
- Low cost and familiar; can be guessed, reused, shared, phished or forgotten.
- Biometric
- Something the user is.
- Convenient and hard to forget; needs sensors and may have false accepts/rejects or privacy concerns.

</details>

#### Controls reduce risk but have limits

![Controls reduce risk but have limits](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-limits.jpg)

<details><summary>Text transcript</summary>

- Firewall limit Allowed traffic can still carry attacks, and rules may be misconfigured.
- Proxy limit Encrypted traffic and unmanaged devices can reduce visibility if not configured properly.
- Monitoring limit Alerts need review and response; too many false positives can be ignored.
- Layering Use with authentication, permissions, patching, encryption and user training.

</details>

#### Why security methods cannot substitute

![Why security methods cannot substitute](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-core.jpg)

<details><summary>Text transcript</summary>

- Encryption hides readable content from unauthorised viewers.
- Hashing creates a comparison value for integrity checks.
- Certificates bind an identity to a public key through trust.

</details>

#### Biometrics: convenient identity evidence from physical or behavioural features

![Biometrics: convenient identity evidence from physical or behavioural features](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-biometrics.jpg)

<details><summary>Text transcript</summary>

- A biometric sensor captures a physical or behavioural feature and the system compares its template with a stored enrolled template.
- A match authenticates the identity claim; authorisation is a separate process that decides what an authenticated user may access or do.
- A false reject denies a valid enrolled user by mistake; a false accept authenticates an impostor by mistake.
- Biometrics require sensors and stored templates and may create privacy, false-accept and false-reject risks.

</details>

#### Authentication factors: know, have, are

![Authentication factors: know, have, are](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-factors.jpg)

<details><summary>Text transcript</summary>

- Something you know Password, passphrase or PIN. Risk: guessed, reused, shared or phished.
- Something you have Security token, smart card or one-time code device. Risk: lost, stolen or unavailable.
- Something you are Biometric characteristic such as fingerprint, face, iris or voice. Risk: false acceptance or privacy concerns.
- Factor type Two checks only become MFA when they come from different factor categories.

</details>

<details><summary>Precise syllabus wording</summary>

Understand user accounts/passwords, digital signatures, biometrics, firewall, antivirus, anti-spyware and encryption as security measures.

Describe security measures for computer systems from a stand-alone PC to a network: user accounts, passwords, digital signatures, biometrics, firewall, anti-virus, anti-spyware and encryption are all required named evidence.

</details>

### 2. Encryption · Access · Rights · Protect (S6.06)

**Concept map:** encryption → access → rights → protect

**Three-part explanation:**

1. Describe security methods designed to protect data, including encryption and access rights
2. evidence must explain their different mechanisms and limitations
3. Encryption therefore protects confidentiality, while access rights can protect confidentiality and integrity by preventing unauthorised viewing or alteration

**Concrete cue:** Describe security methods designed to protect data, including encryption and access rights; evidence must explain their different mechanisms and limitations.

#### Confidentiality protects data from unauthorised access

![Confidentiality protects data from unauthorised access](../web/assets/diagrams/stage10-infographics/stage10-lesson-063-confidentiality.jpg)

<details><summary>Text transcript</summary>

- Goal Only authorised users should be able to view or access the data.
- Risk Personal details, passwords or exam marks are viewed by unauthorised people.
- Controls Access rights, authentication, encryption and least privilege can support confidentiality.
- Exam wording Say who is prevented from reading what, and why they are unauthorised.

</details>

#### How encryption protects confidentiality

![How encryption protects confidentiality](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-encryption.jpg)

<details><summary>Text transcript</summary>

- An algorithm combines plaintext with a key.
- The output is ciphertext that lacks readable meaning without the key.
- An authorised key reverses the transformation for the recipient.

</details>

#### One control can support more than one goal, but not every goal

![One control can support more than one goal, but not every goal](../web/assets/diagrams/stage10-infographics/stage10-lesson-063-controls.jpg)

<details><summary>Text transcript</summary>

- Encryption makes data unreadable without the correct key and supports confidentiality.
- Access rights prevent unauthorised viewing and prevent unauthorised alteration; they support confidentiality and integrity but do not detect whether data changed.
- Backups allow recovery after data loss or corruption and support availability.
- Hash/checksum comparison can detect whether data changed and supports integrity, but it does not prevent unauthorised alteration.

</details>

#### Similar-looking controls: choose by mechanism

![Similar-looking controls: choose by mechanism](../web/assets/diagrams/stage10-infographics/stage10-lesson-072-compare.jpg)

<details><summary>Text transcript</summary>

- Difference
- Common error
- Validation vs verification
- Validation checks rule acceptability; verification checks accurate transfer/copying.
- A valid value can still be the wrong value.
- Authentication vs authorisation
- Authentication confirms identity; authorisation/access rights decide permitted actions.
- Logging in does not mean full access should be granted.

</details>

<details><summary>Precise syllabus wording</summary>

Explain how encryption and access rights protect data.

Describe security methods designed to protect data, including encryption and access rights; evidence must explain their different mechanisms and limitations.

</details>

### Supporting diagram library

#### Malware is malicious software; social engineering manipulates people

![Malware is malicious software; social engineering manipulates people](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-concept.jpg)

<details><summary>Text transcript</summary>

- Malware Software created to disrupt, damage, steal data or gain unauthorised access.
- Payload The harmful action, such as deleting files, encrypting data or stealing credentials.
- Propagation How it spreads, such as infected files, networks, removable media or deceptive downloads.
- Social engineering Manipulating a person into revealing information or performing an unsafe action.

</details>

#### Match controls to mechanism, not just the word "malware"

![Match controls to mechanism, not just the word "malware"](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-controls.jpg)

<details><summary>Text transcript</summary>

- Likely impact
- Suitable controls
- Virus/worm
- Corrupts data, spreads, slows systems, uses resources.
- Anti-malware, patching, scanning removable media, network monitoring.
- Disguised malicious installation or backdoor.
- Trusted sources, permissions review, user education, anti-malware.
- Secret monitoring, credential/data theft.

</details>

#### Ransomware denies access by encrypting or locking data

![Ransomware denies access by encrypting or locking data](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-ransomware.jpg)

<details><summary>Text transcript</summary>

- Mechanism Encrypts files or locks systems, then demands payment for restoration.
- Goal affected Mainly threatens availability; may also threaten confidentiality if data is stolen.
- Control Offline backups, patching, anti-malware, restricted permissions and user training.
- Common error Paying is not a reliable recovery strategy in an exam answer.

</details>

#### Social engineering exploits people rather than code

![Social engineering exploits people rather than code](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-social.jpg)

<details><summary>Text transcript</summary>

- Mechanism Uses trust, urgency, authority, curiosity or fear to influence a user.
- Action User may reveal passwords, approve access, install software or transfer data.
- Goal affected Often threatens confidentiality and authenticity through impersonation or credential theft.
- Control User training, verification procedures, MFA, reporting routes and least privilege.

</details>

#### Spyware secretly monitors activity or collects data

![Spyware secretly monitors activity or collects data](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-spyware.jpg)

<details><summary>Text transcript</summary>

- Mechanism Runs without clear user awareness and gathers information.
- Examples Keylogger, screen monitoring or browser tracking used to capture credentials.
- Goal affected Often threatens confidentiality and authenticity if credentials are stolen.
- Control Anti-malware, least privilege, patching, browser controls and caution with downloads.

</details>

#### Trojan: malicious code disguised as legitimate software

![Trojan: malicious code disguised as legitimate software](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-trojan.jpg)

<details><summary>Text transcript</summary>

- Mechanism Appears useful or harmless so a user installs or runs it.
- Impact May create a backdoor, steal data, install other malware or change settings.
- Control Download from trusted sources, check permissions, use anti-malware and user education.
- Common error A Trojan does not need to self-replicate to be harmful.

</details>

#### Virus and worm: both can spread, but not in the same way

![Virus and worm: both can spread, but not in the same way](../web/assets/diagrams/stage10-infographics/stage10-lesson-064-virus.jpg)

<details><summary>Text transcript</summary>

- Virus Attaches to a host file/program and often needs the host to be run or shared.
- Worm Self-replicates, often across networks, without needing to attach to a host file.
- Impact Can corrupt data, slow systems, consume bandwidth or install further malware.
- Common error Do not say every self-spreading threat is a virus.

</details>

#### Authentication is identity checking

![Authentication is identity checking](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-core.jpg)

<details><summary>Text transcript</summary>

- Authentication Verifies that a user, device or process is who it claims to be.
- Claim The identity presented, such as a username, account or device ID.
- Credential Evidence used to prove the claim, such as a password, biometric or token.
- Authorisation Decides what an authenticated user is allowed to access or change.

</details>

#### MFA combines different factor types

![MFA combines different factor types](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-mfa.jpg)

<details><summary>Text transcript</summary>

- Definition Multi-factor authentication requires evidence from two or more different factor categories.
- Example Password plus phone app code: something you know plus something you have.
- Benefit If a password is stolen, the attacker still needs the second factor.
- Cost More setup, recovery problems and user friction if a device is unavailable.

</details>

#### Estimate password quality without collecting real passwords

![Estimate password quality without collecting real passwords](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-password-tool.jpg)

<details><summary>Text transcript</summary>

- Interactive password check
- Use a practice string only. Never type a real password into lesson tools, screenshots or chat.
- Practice password

</details>

#### Passwords: cheap, familiar and often ruined by humans

![Passwords: cheap, familiar and often ruined by humans](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-passwords.jpg)

<details><summary>Text transcript</summary>

- Strength Longer passwords or passphrases with less predictable structure are harder to guess.
- Weakness Users may reuse, share, write down or choose predictable passwords.
- Storage Systems should not store plaintext passwords; hashes are commonly used for verification.
- Control Password policy, lockout/rate limiting, user education and MFA reduce risk.

</details>

#### Tokens: proof that the user has a specific device or object

![Tokens: proof that the user has a specific device or object](../web/assets/diagrams/stage10-infographics/stage10-lesson-066-tokens.jpg)

<details><summary>Text transcript</summary>

- Hardware token A physical device, card or key used during login.
- Software token An app or service that generates a one-time code.
- One-time code A code valid for a short time or single login attempt.
- Limitation Tokens can be lost, stolen, damaged, out of battery or unavailable without a phone/network.

</details>

#### Access control decides what authenticated users may do

![Access control decides what authenticated users may do](../web/assets/diagrams/stage10-infographics/stage10-lesson-067-core.jpg)

<details><summary>Text transcript</summary>

- Access right A permission to perform an action on a resource, such as read or write.
- Resource A file, database table, account, device, folder, application or network service.
- Authorisation The decision to allow or deny an action after identity has been checked.
- Policy The rule set that maps users, groups or roles to permitted actions.

</details>

#### Least privilege reduces unnecessary damage

![Least privilege reduces unnecessary damage](../web/assets/diagrams/stage10-infographics/stage10-lesson-067-least.jpg)

<details><summary>Text transcript</summary>

- Definition Give users only the minimum permissions needed to perform their role.
- Confidentiality Users cannot view data that is not needed for their work.
- Integrity Users cannot accidentally or deliberately change data outside their responsibility.
- Availability Fewer users can delete files, disable services or change critical settings.

</details>

#### A permission matrix makes access decisions visible

![A permission matrix makes access decisions visible](../web/assets/diagrams/stage10-infographics/stage10-lesson-067-matrix.jpg)

<details><summary>Text transcript</summary>

- Student records
- Exam marks
- System settings
- Read own record
- No access
- Read class records
- Write marks for own classes
- Exam officer

</details>

#### Permissions need review, not just setup day optimism

![Permissions need review, not just setup day optimism](../web/assets/diagrams/stage10-infographics/stage10-lesson-067-review.jpg)

<details><summary>Text transcript</summary>

- Joiner New user receives permissions based on role, not copied blindly from a friend.
- Mover User changes role; old permissions are removed and new ones are added.
- Leaver Account is disabled or removed when the user leaves.
- Review Regular checks remove excessive, stale or temporary permissions.

</details>

#### Common permission types

![Common permission types](../web/assets/diagrams/stage10-infographics/stage10-lesson-067-rights.jpg)

<details><summary>Text transcript</summary>

- Read View or open data without changing it. Protects confidentiality when restricted.
- Write/modify Create or change data. Protects integrity when restricted.
- Delete Remove data or accounts. Often high risk because loss may affect availability.
- Execute/admin Run programs, install software or manage settings. Usually limited to trusted roles.

</details>

#### Users, groups and roles keep permissions manageable

![Users, groups and roles keep permissions manageable](../web/assets/diagrams/stage10-infographics/stage10-lesson-067-users.jpg)

<details><summary>Text transcript</summary>

- User account Individual identity, useful for accountability and audit trails.
- Group A collection of accounts that share permissions, such as "Students" or "Finance".
- Role A job-based permission set, such as teacher, receptionist, technician or administrator.
- Audit log Records access attempts or changes, helping detect misuse and investigate incidents.

</details>

#### How a certificate supports trust

![How a certificate supports trust](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-certificates.jpg)

<details><summary>Text transcript</summary>

- A certificate contains an identity and its public key.
- A trusted authority digitally signs that binding.
- Software verifies the signature before trusting the presented key.

</details>

#### How the required property chooses the method

![How the required property chooses the method](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-compare.jpg)

<details><summary>Text transcript</summary>

- First identify confidentiality, integrity, authentication or several needs.
- Choose the mechanism whose operation creates that property.
- Combine methods when the communication needs multiple properties.

</details>

#### Why a hash supports comparison

![Why a hash supports comparison](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-hashing.jpg)

<details><summary>Text transcript</summary>

- A hash function maps input data to a fixed-length digest.
- A small input change should produce a substantially different digest.
- Matching digests provide evidence that the checked data is unchanged.

</details>

#### How HTTPS combines trust and privacy

![How HTTPS combines trust and privacy](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-https.jpg)

<details><summary>Text transcript</summary>

- The server presents its certificate and public-key information.
- The browser verifies the trust chain and agreed connection details.
- Both sides establish session keys for efficient encrypted transport.

</details>

#### Why key ownership changes capability

![Why key ownership changes capability](../web/assets/diagrams/stage10-infographics/stage10-lesson-068-keys.jpg)

<details><summary>Text transcript</summary>

- A symmetric key can both encrypt and decrypt shared data.
- An asymmetric key pair separates public and private operations.
- Protecting the private or shared secret preserves the security boundary.

</details>

#### Network controls sit between traffic and risk

![Network controls sit between traffic and risk](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-core.jpg)

<details><summary>Text transcript</summary>

- Traffic Data packets or requests moving across a network.
- Rule A condition that allows, blocks or logs traffic based on properties.
- Log A record of events, traffic, blocked attempts or user activity.
- Alert A warning generated when traffic or behaviour matches a suspicious pattern.

</details>

#### Which control is most relevant?

![Which control is most relevant?](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-event-tool.jpg)

<details><summary>Text transcript</summary>

- Interactive event classifier

</details>

#### Firewalls filter traffic using rules

![Firewalls filter traffic using rules](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-firewall.jpg)

<details><summary>Text transcript</summary>

- Purpose Control traffic entering or leaving a network/device.
- Checks Can inspect source/destination IP address, port number, protocol or connection state.
- Decision Allow, deny, reject or log traffic depending on rule match.
- Placement Can protect a network boundary or run on an individual host.

</details>

#### Network monitoring watches for patterns and evidence

![Network monitoring watches for patterns and evidence](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-monitoring.jpg)

<details><summary>Text transcript</summary>

- Traffic volume Unusual spikes may suggest DoS, malware activity or misconfiguration.
- Connection attempts Repeated failed access attempts may suggest probing or brute force activity.
- Alerts Monitoring systems can notify staff when thresholds or signatures are triggered.
- Investigation Logs help reconstruct what happened, when, and from where.

</details>

#### A proxy acts as an intermediary

![A proxy acts as an intermediary](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-proxy.jpg)

<details><summary>Text transcript</summary>

- Forward requests Client sends request to proxy; proxy requests the resource from the destination.
- Filtering Can block sites, content types, categories or requests that break policy.
- Caching Can store copies of frequently requested resources to reduce bandwidth and latency.
- Logging Can record user requests for audit, investigation or policy enforcement.

</details>

#### Firewall rules should be specific and ordered

![Firewall rules should be specific and ordered](../web/assets/diagrams/stage10-infographics/stage10-lesson-069-rules.jpg)

<details><summary>Text transcript</summary>

- Allow HTTPS from internal users to internet
- Permit web traffic on port 443.
- Needed for secure website access.
- Block inbound unknown traffic
- Deny unsolicited external connections.
- Reduces unauthorised access attempts.
- Allow admin only from management subnet
- Restrict sensitive admin ports by source.

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

### Worked example

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
