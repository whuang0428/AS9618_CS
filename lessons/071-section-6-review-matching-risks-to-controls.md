# Lesson 071: Section 6 review: matching risks to controls

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** stage review
## Learning Objectives
By the end of the lesson, students should be able to:
1. Select the relevant concepts and command words for **Section 6 review: matching risks to controls**.
2. Complete a timed response using the required calculation, notation or explanation structure.
3. Use a mark scheme to identify omissions and produce an improved answer.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Put three mixed questions on the board and ask students to identify the relevant syllabus topic, command word and required response form before answering.

Focus question: Which feature distinguishes **Section 6 review: matching risks to controls** from the most closely related syllabus concept?

## Guided Explanation
Use Section 6 review: matching risks to controls to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.

## Student Task
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Section 6 review: matching risks to controls**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Similar-looking controls: choose by mechanism

- **Explains:** `compare`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-071-compare.jpg`

1. Difference
2. Common error
3. Validation vs verification
4. Validation checks rule acceptability; verification checks accurate transfer/copying.
5. A valid value can still be the wrong value.
6. Authentication vs authorisation
7. Authentication confirms identity; authorisation/access rights decide permitted actions.
8. Logging in does not mean full access should be granted.
9. Encryption vs hashing
10. Encryption is reversible with a key; hashing is one-way and often used for password storage.
11. Do not say hashed data can be decrypted.
12. Backup vs audit trail

### Controls have different jobs

- **Explains:** `controls`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-071-controls.jpg`

1. Verification checks that copied, entered or transferred data agrees with the source or repeated entry.
2. Double entry and visual checking can reduce copying errors.
3. Matching values may still be false, so verification does not guarantee accuracy or truth.

### Identify the risk family first

- **Explains:** `diagnostic`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-071-diagnostic.jpg`

1. Interactive diagnostic
2. Choose the broad risk family. Then compare the suggested control route.

### Select the best control for the scenario

- **Explains:** `matcher`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-071-matcher.jpg`

1. Interactive risk matcher
2. The best answer is the one whose mechanism directly addresses the named risk.
3. Scenario

### Use the four-part answer chain

- **Explains:** `method`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-071-method.jpg`

1. 1. Name the risk Example: unauthorised users may view medical records.
2. 2. Choose a control Example: role-based access levels and authentication.
3. 3. Explain mechanism Example: only authenticated staff with the correct role can open the record.
4. 4. Link consequence Example: this protects confidentiality and reduces privacy breaches.
5. Answer frame:
6. [Control] reduces [risk] because [mechanism]. In this scenario, this matters because [impact/consequence].

### Section 6 review map: risk families and likely controls

- **Explains:** `review-map`
- **Explanation type:** synthesis
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-071-review-map.jpg`

1. Risk family
2. Typical problem
3. Useful controls
4. Unauthorised access
5. A user enters a system or data they should not access.
6. Authentication, access levels, strong passwords, two-factor authentication.
7. Disclosure
8. Sensitive data is read or intercepted by an unauthorised party.
9. Encryption in transit/at rest, access rights, staff training.
10. Corruption / inaccurate data
11. Data is changed incorrectly, accidentally or maliciously.
12. Validation, verification, permissions, audit trails, backups.
<!-- stage10-explanations:end -->
