# Lesson 066: Access rights, permissions, and least privilege

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 6  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Access rights, permissions, and least privilege** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Access rights, permissions, and least privilege** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Access rights, permissions, and least privilege, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Access rights, permissions, and least privilege**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** A school stores exam marks online. Identify two risks and one control for each. The worked example must explicitly use **Access rights, permissions, and least privilege**, not a generic example from the wider unit.

**Worked answer / marking focus:** Good answers pair the control with the risk: access rights limit unauthorised viewing, hashing protects stored passwords, backups support recovery.



## Student Task
Groups create a risk-control table for a school database, online shop or hospital system. They must include one human weakness, not only technical attacks. Their final answer must include the phrase **Access rights, permissions, and least privilege** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Access rights, permissions, and least privilege**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Access rights, permissions, and least privilege** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Access rights, permissions, and least privilege** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **access rights, permissions, and least privilege**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Access control decides what authenticated users may do

- **Explains:** `core`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-066-core.jpg`

1. Access right A permission to perform an action on a resource, such as read or write.
2. Resource A file, database table, account, device, folder, application or network service.
3. Authorisation The decision to allow or deny an action after identity has been checked.
4. Policy The rule set that maps users, groups or roles to permitted actions.

### Least privilege reduces unnecessary damage

- **Explains:** `least`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-066-least.jpg`

1. Definition Give users only the minimum permissions needed to perform their role.
2. Confidentiality Users cannot view data that is not needed for their work.
3. Integrity Users cannot accidentally or deliberately change data outside their responsibility.
4. Availability Fewer users can delete files, disable services or change critical settings.

### A permission matrix makes access decisions visible

- **Explains:** `matrix`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-066-matrix.jpg`

1. Student records
2. Exam marks
3. System settings
4. Read own record
5. No access
6. Read class records
7. Write marks for own classes
8. Exam officer
9. Read relevant records
10. Read/write exam data
11. Administrator
12. Manage accounts

### Permissions need review, not just setup day optimism

- **Explains:** `review`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-066-review.jpg`

1. Joiner New user receives permissions based on role, not copied blindly from a friend.
2. Mover User changes role; old permissions are removed and new ones are added.
3. Leaver Account is disabled or removed when the user leaves.
4. Review Regular checks remove excessive, stale or temporary permissions.

### Common permission types

- **Explains:** `rights`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-066-rights.jpg`

1. Read View or open data without changing it. Protects confidentiality when restricted.
2. Write/modify Create or change data. Protects integrity when restricted.
3. Delete Remove data or accounts. Often high risk because loss may affect availability.
4. Execute/admin Run programs, install software or manage settings. Usually limited to trusted roles.

### Users, groups and roles keep permissions manageable

- **Explains:** `users`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-066-users.jpg`

1. User account Individual identity, useful for accountability and audit trails.
2. Group A collection of accounts that share permissions, such as "Students" or "Finance".
3. Role A job-based permission set, such as teacher, receptionist, technician or administrator.
4. Audit log Records access attempts or changes, helping detect misuse and investigate incidents.
<!-- stage10-explanations:end -->
