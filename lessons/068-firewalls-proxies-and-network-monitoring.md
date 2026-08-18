# Lesson 068: Firewalls, proxies, and network monitoring

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 6  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Firewalls, proxies, and network monitoring** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Firewalls, proxies, and network monitoring** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Firewalls, proxies, and network monitoring, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Firewalls, proxies, and network monitoring**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A school stores exam marks online. Identify two risks and one control for each. The worked example must explicitly use **Firewalls, proxies, and network monitoring**, not a generic example from the wider unit.

**Worked answer / marking focus:** Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.



## Student Task
Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks. Their final answer must include the phrase **Firewalls, proxies, and network monitoring** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Firewalls, proxies, and network monitoring**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Firewalls, proxies, and network monitoring** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Firewalls, proxies, and network monitoring** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **firewalls, proxies, and network monitoring**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Network controls sit between traffic and risk

- **Explains:** `core`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-core.jpg`

1. Traffic Data packets or requests moving across a network.
2. Rule A condition that allows, blocks or logs traffic based on properties.
3. Log A record of events, traffic, blocked attempts or user activity.
4. Alert A warning generated when traffic or behaviour matches a suspicious pattern.

### Which control is most relevant?

- **Explains:** `event-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-event-tool.jpg`

1. Interactive event classifier

### Firewalls filter traffic using rules

- **Explains:** `firewall`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-firewall.jpg`

1. Purpose Control traffic entering or leaving a network/device.
2. Checks Can inspect source/destination IP address, port number, protocol or connection state.
3. Decision Allow, deny, reject or log traffic depending on rule match.
4. Placement Can protect a network boundary or run on an individual host.

### Controls reduce risk but have limits

- **Explains:** `limits`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-limits.jpg`

1. Firewall limit Allowed traffic can still carry attacks, and rules may be misconfigured.
2. Proxy limit Encrypted traffic and unmanaged devices can reduce visibility if not configured properly.
3. Monitoring limit Alerts need review and response; too many false positives can be ignored.
4. Layering Use with authentication, permissions, patching, encryption and user training.

### Network monitoring watches for patterns and evidence

- **Explains:** `monitoring`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-monitoring.jpg`

1. Traffic volume Unusual spikes may suggest DoS, malware activity or misconfiguration.
2. Connection attempts Repeated failed access attempts may suggest probing or brute force activity.
3. Alerts Monitoring systems can notify staff when thresholds or signatures are triggered.
4. Investigation Logs help reconstruct what happened, when, and from where.

### A proxy acts as an intermediary

- **Explains:** `proxy`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-proxy.jpg`

1. Forward requests Client sends request to proxy; proxy requests the resource from the destination.
2. Filtering Can block sites, content types, categories or requests that break policy.
3. Caching Can store copies of frequently requested resources to reduce bandwidth and latency.
4. Logging Can record user requests for audit, investigation or policy enforcement.

### Firewall rules should be specific and ordered

- **Explains:** `rules`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-068-rules.jpg`

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
