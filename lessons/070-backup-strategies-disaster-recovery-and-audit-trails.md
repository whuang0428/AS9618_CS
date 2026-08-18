# Lesson 070: Backup strategies, disaster recovery, and audit trails

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 6  
**Duration:** 45 minutes  
**Assessment rhythm:** 5-minute quiz
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Backup strategies, disaster recovery, and audit trails** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Backup strategies, disaster recovery, and audit trails** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Backup strategies, disaster recovery, and audit trails, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Backup strategies, disaster recovery, and audit trails**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A school stores exam marks online. Identify two risks and one control for each. The worked example must explicitly use **Backup strategies, disaster recovery, and audit trails**, not a generic example from the wider unit.

**Worked answer / marking focus:** Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.



## Student Task
Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks. Their final answer must include the phrase **Backup strategies, disaster recovery, and audit trails** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Backup strategies, disaster recovery, and audit trails**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Backup strategies, disaster recovery, and audit trails** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Backup strategies, disaster recovery, and audit trails** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **backup strategies, disaster recovery, and audit trails**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Audit trails support accountability and investigation

- **Explains:** `audit-trails`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-audit-trails.jpg`

1. Who User ID, account, device or process involved.
2. What Action such as login, read, edit, delete, approve or restore.
3. When/where Timestamp, location, device or IP address.
4. Use Trace errors, detect misuse, investigate incidents and prove compliance.

### Backup type affects speed, storage and recovery complexity

- **Explains:** `backups`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-backups.jpg`

1. Full backup Copies all selected data. Simple to restore, but uses more time and storage.
2. Incremental backup Copies only data changed since the last backup. Faster and smaller, but restore may need a chain.
3. Differential idea Copies changes since last full backup. Useful comparison, though full/incremental is the main contrast here.
4. Testing Backups must be tested by restoring sample data, not only by checking that a file exists.

### Compare by purpose, not by "security word"

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-compare.jpg`

1. Main purpose
2. Limitation
3. Restore data after deletion, corruption, hardware failure or ransomware.
4. May be too old, corrupted, inaccessible or affected by same incident.
5. Disaster recovery plan
6. Restore systems and services in a planned order after major disruption.
7. Needs testing, clear roles and updated documentation.
8. Audit trail
9. Record actions for accountability, investigation and evidence.
10. Does not restore data by itself and must be protected from tampering.

### Recovery planning is about availability, integrity and accountability

- **Explains:** `core`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-core.jpg`

1. Backup A separate copy of data that can be used to restore the original after loss or corruption.
2. Restore The process of recovering data or systems from a backup.
3. Disaster recovery Planned actions to restore systems and services after a major incident.
4. Audit trail A chronological record of actions, changes and access events.

### Disaster recovery is more than data copying

- **Explains:** `recovery`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-recovery.jpg`

1. 1. Identify incident Detect failure, confirm scope and prevent further damage.
2. 2. Communicate Notify staff/users and assign responsibilities.
3. 3. Restore systems Recover data, applications, hardware/network access and configuration.
4. 4. Test and review Check service works, document lessons and improve the plan.
5. Useful exam language: RPO = how much data loss is acceptable; RTO = how quickly service must be restored.

### Match backup frequency to acceptable data loss

- **Explains:** `rpo-tool`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-rpo-tool.jpg`

1. Interactive recovery objective tool
2. Maximum acceptable data loss

### A strategy defines location, frequency, retention and security

- **Explains:** `strategy`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-070-strategy.jpg`

1. Onsite Fast to access, but vulnerable to the same fire, flood, theft or ransomware incident.
2. Offsite Stored in a different physical location, reducing site-wide disaster risk.
3. Cloud Remote provider storage; useful for offsite copies but needs network access and access control.
4. Retention How long versions are kept, so accidental deletion or corruption can be rolled back.
<!-- stage10-explanations:end -->
