# Lesson 146: Section 12 review: software development case study

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 2  
**Syllabus reference:** Syllabus Section 12  
**Duration:** 45 minutes  
**Assessment rhythm:** stage review

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Section 12 review: software development case study** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- lifecycle 生命周期, requirements 需求, testing 测试, maintenance 维护

## Warm-Up Hook
Put three deliberately mixed questions on the board and ask students to identify the topic before answering. The first skill in a review lesson is knowing which mental toolbox to open.

Lesson-specific focus question: What would go wrong if a student confused **Section 12 review: software development case study** with a neighbouring syllabus idea?

## Guided Explanation
Use Section 12 review: software development case study to connect ideas across sections. Start with retrieval, then compare two similar concepts, then answer one timed question. Finish with correction: students rewrite a weak answer into a mark-worthy one.

Topic-specific teaching move: keep the explanation anchored to **Section 12 review: software development case study**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: retrieval grid. Middle: mixed exam question. Right: mark scheme phrases and correction targets.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Answer a mixed Cambridge-style question, then annotate which words in the answer earn marks. The worked example must explicitly use **Section 12 review: software development case study**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit topic recognition, precise terminology, and explanations that fit the scenario rather than generic memorised lines.

```text
// Cambridge-style pseudocode
INPUT Mark
IF Mark >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Resit needed"
ENDIF
```

```java
// Java support example only, not exam pseudocode
if (mark >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Resit needed");
}
```


## Student Task
Students complete a timed response, swap scripts, mark with a checklist, and write one improved version. Their final answer must include the phrase **Section 12 review: software development case study** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Section 12 review: software development case study**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **Section 12 review: software development case study** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Section 12 review: software development case study** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 12.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often revise by rereading notes only. Correction: review lessons require retrieval, timed practice and correction. For this lesson, make students contrast that mistake with the exact idea of **section 12 review: software development case study**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### From vague request to measurable criteria

- **Explains:** `analysis`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-analysis.jpg`

1. Analysis review
2. Weak wording
3. Stronger requirement
4. Success criterion
5. easy sign-up
6. students can reserve a place using activity list, confirm button and student ID
7. 90% of trial students reserve a place in under 2 minutes
8. avoid too many students
9. system prevents reservations above activity capacity
10. all tests at capacity plus one are rejected
11. staff need reports
12. staff can print or export a register for each activity

### Turn a weak line into a mark-worthy line

- **Explains:** `answer-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-answer-tool.jpg`

1. Answer improver
2. Weak answer

### School activity sign-up system

- **Explains:** `case`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-case.jpg`

1. Case study
2. A school wants a system for students to sign up for after-school activities. Students can view activities,
3. reserve a place, cancel a reservation and see a waiting list. Staff can create activities, set capacity,
4. view registers and close sign-ups. The school wants the system ready before the new term.
5. Every review task on this page uses this case. That forces answers to be specific instead of floating around as textbook fog.

### Identify the Section 12 concept

- **Explains:** `case-tool`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-case-tool.jpg`

1. Interactive case tool
2. Case detail

### Match response depth to the command

- **Explains:** `commands`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-commands.jpg`

1. Command words
2. What to do
3. Weak answer pattern
4. give a precise term or fact
5. writing a paragraph without the keyword
6. Describe
7. say what it is like or how it works
8. naming only
9. give cause and consequence in context
10. saying “it is better”
11. Evaluate
12. make a judgement using evidence

### Design answers must name the artefact

- **Explains:** `design`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-design.jpg`

1. Design review
2. Algorithm
3. Describe how the system checks capacity and places extra students on a waiting list.
4. Data dictionary
5. Define ActivityID, StudentID, Capacity, PlacesTaken and WaitingListPosition.
6. Interface
7. Show activity list, reserve/cancel controls, confirmation prompts and validation messages.
8. Cambridge-style pseudocode is suitable for algorithm design. Java can support implementation practice, but final code is not the whole design document.

### After release, classify changes and judge success with evidence

- **Explains:** `evaluation`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-evaluation.jpg`

1. Maintenance and evaluation review
2. Maintenance examples
3. Corrective: fix a crash when cancelling a reservation.
4. Adaptive: change the system for a new two-term activity structure.
5. Perfective: make the activity search faster or clearer.
6. Evaluation evidence
7. Timing logs from sign-up tasks.
8. User survey results linked to success criteria.
9. Test records showing capacity rules were met.

### One scenario, many stages

- **Explains:** `lifecycle`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-lifecycle.jpg`

1. Lifecycle map
2. Case study example
3. Risk if weak
4. Analysis
5. requirements and success criteria
6. reserve a place; prevent overbooking
7. wrong problem is solved
8. algorithms, data dictionary, interface plans
9. waiting-list algorithm and ActivityID field
10. developers make inconsistent choices
11. Implementation
12. working configured system

### Test cases need data, expected result and purpose

- **Explains:** `testing`
- **Explanation type:** synthesis
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-146-testing.jpg`

1. Testing review
2. Test data
3. Expected result
4. Data type
5. activity capacity is 20
6. 20th reservation
7. accepted
8. boundary valid
9. 21st reservation
10. added to waiting list or rejected by rule
11. boundary invalid
12. StudentID must be numeric
<!-- stage10-explanations:end -->
