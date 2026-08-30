# Lesson 069: Firewall protection from a stand-alone PC to a network

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Firewall protection from a stand-alone PC to a network

### Direct explanation

- A firewall filters traffic entering or leaving a computer or network by comparing packet or connection information with configured rules. Rules may use source/destination address, port, protocol or connection state and then allow, block, reject or log the traffic.
- A host firewall can protect a stand-alone PC; a network firewall can protect a boundary between networks. This satisfies different scales of computer-system protection, but neither placement makes a firewall an anti-virus scanner or guarantees that allowed traffic is harmless.
- Firewalls restrict risk from unwanted connections and some unauthorised-access routes. They should be combined with accounts/passwords, authentication, access rights, anti-virus, anti-spyware, encryption, patching, user training and monitoring because those controls address different threats.
- During transfer, a parity check can be applied to a byte or a block, while a checksum provides a separate calculated verification value.
- Each security measure has a distinct mechanism: a user account identifies a user; a password authenticates knowledge; a digital signature supports integrity and origin checks; a biometric compares a captured feature; a firewall filters traffic; anti-virus and anti-spyware detect known malicious software; encryption protects readable data. The threats include a virus, spyware, a hacker, phishing and pharming; each threat must be matched to a control whose mechanism reduces that risk.

### Worked example

**Protect a home laptop and a school network:** The laptop's host firewall blocks unsolicited inbound connections except an explicitly required service. The school's boundary firewall denies unrequested external traffic, permits web traffic under ordered rules and logs repeated blocked attempts. Anti-virus still scans downloaded files, and account/access controls still decide who may use data after traffic is allowed.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. What information may a firewall rule inspect?
   **Answer:** Source/destination address, port, protocol or connection state.
2. Compare a host firewall from a network firewall.
   **Answer:** A host firewall runs on and protects one computer; a network firewall filters traffic at a boundary for multiple connected systems.
3. Can a firewall replace anti-virus software?
   **Answer:** No. A firewall controls traffic; anti-virus scans for detected malicious code.
4. Why may allowed traffic still be dangerous?
   **Answer:** A permitted connection can carry phishing content, stolen credentials or malware that the rule does not recognise.

### Exam-style question and MS

**Question (6 marks):** Describe how a firewall can protect both a stand-alone PC and a network, then explain two limitations that require other security measures.

| Answer | Guidance | Marks |
|---|---|---:|
| firewall compares traffic/connection information with configured rules | Do not claim that a firewall removes viruses, detects every malicious payload or makes a computer system completely secure. | 1 |
| allows/blocks/rejects/logs according to a rule |  | 1 |
| host firewall protects one PC |  | 1 |
| network firewall protects a network boundary |  | 1 |
| allowed traffic or misconfiguration limitation |  | 1 |
| matching additional measure such as anti-virus, authentication, access rights or user training |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Identify the threats, controls or security properties involved in **Firewalls, proxies, and network monitoring**.
2. Explain how a named control reduces a stated risk.
3. Recommend controls for a scenario and state any relevant limitation.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Focus question: Which feature distinguishes **Firewalls, proxies, and network monitoring** from the most closely related syllabus concept?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Firewalls, proxies, and network monitoring, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

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
- Answer one 4-mark question about **Firewalls, proxies, and network monitoring**. Follow its command word and apply each point to the stated context.

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

### Network controls sit between traffic and risk

- **Explains:** `core`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-core.jpg`

1. Traffic Data packets or requests moving across a network.
2. Rule A condition that allows, blocks or logs traffic based on properties.
3. Log A record of events, traffic, blocked attempts or user activity.
4. Alert A warning generated when traffic or behaviour matches a suspicious pattern.

### Which control is most relevant?

- **Explains:** `event-tool`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-event-tool.jpg`

1. Interactive event classifier

### Firewalls filter traffic using rules

- **Explains:** `firewall`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-firewall.jpg`

1. Purpose Control traffic entering or leaving a network/device.
2. Checks Can inspect source/destination IP address, port number, protocol or connection state.
3. Decision Allow, deny, reject or log traffic depending on rule match.
4. Placement Can protect a network boundary or run on an individual host.

### Controls reduce risk but have limits

- **Explains:** `limits`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-limits.jpg`

1. Firewall limit Allowed traffic can still carry attacks, and rules may be misconfigured.
2. Proxy limit Encrypted traffic and unmanaged devices can reduce visibility if not configured properly.
3. Monitoring limit Alerts need review and response; too many false positives can be ignored.
4. Layering Use with authentication, permissions, patching, encryption and user training.

### Network monitoring watches for patterns and evidence

- **Explains:** `monitoring`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-monitoring.jpg`

1. Traffic volume Unusual spikes may suggest DoS, malware activity or misconfiguration.
2. Connection attempts Repeated failed access attempts may suggest probing or brute force activity.
3. Alerts Monitoring systems can notify staff when thresholds or signatures are triggered.
4. Investigation Logs help reconstruct what happened, when, and from where.

### A proxy acts as an intermediary

- **Explains:** `proxy`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-proxy.jpg`

1. Forward requests Client sends request to proxy; proxy requests the resource from the destination.
2. Filtering Can block sites, content types, categories or requests that break policy.
3. Caching Can store copies of frequently requested resources to reduce bandwidth and latency.
4. Logging Can record user requests for audit, investigation or policy enforcement.

### Firewall rules should be specific and ordered

- **Explains:** `rules`
- **Explanation type:** mechanism
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-069-rules.jpg`

1. Allow HTTPS from internal users to internet
2. Permit web traffic on port 443.
3. Needed for secure website access.
4. Block inbound unknown traffic
5. Deny unsolicited external connections.
6. Reduces unauthorised access attempts.
7. Allow admin only from management subnet
8. Restrict sensitive admin ports by source.
9. Limits attack surface and misuse.
10. Log repeated denied connections
11. Record unusual or repeated blocked attempts.
12. Supports monitoring and investigation.
<!-- stage10-explanations:end -->
