# Lesson 123: Stacks and queues as abstract data types

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** This lesson is Optional enrichment or review. It does not establish first use of a new syllabus requirement and is excluded from compulsory coverage and prerequisite statistics.
<!-- remediation-v2-stage3-scope:end -->

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Define the access rule and operations involved in **Stacks and queues as abstract data types**.
2. Trace the structure after a sequence of valid operations.
3. Explain how overflow and underflow are detected and handled.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask which student should be served first in a queue and which item is removed first from a stack. Use the contrast to introduce FIFO and LIFO access rules.

Focus question: Which feature distinguishes **Stacks and queues as abstract data types** from the most closely related syllabus concept?

## Guided Explanation
Introduce the rule of access before implementation. For Stacks and queues as abstract data types, model operations with cards: push/pop or enqueue/dequeue. Then write pseudocode that respects overflow and underflow checks.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: ADT rule. Middle: operation trace. Right: overflow/underflow checks.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** Trace a sequence of stack or queue operations and state the final contents.

**Worked answer / marking focus:** Credit operation order and pointer/front/rear updates where used. Answers must show when an operation is invalid because the structure is full or empty.

## Student Task
Students act out a stack or queue with paper cards, then convert the movement into pseudocode operations.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Stacks and queues as abstract data types**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe stacks and queues as just arrays. Correction: the defining feature is the access rule, not the storage implementation.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why boundary checks come first

- **Explains:** `errors`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-errors.jpg`

1. Underflow occurs when removal is requested from an empty structure.
2. Overflow occurs when fixed storage has no free position.
3. Checking first prevents invalid reads, writes and pointer changes.
- **Analogy:** Check whether a shelf is empty or full before moving an item.
- **Boundary:** Dynamic storage changes the capacity strategy but can still exhaust memory.

### Why operation names preserve meaning

- **Explains:** `operations`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-operations.jpg`

1. Push and pop describe changes at a stack's top.
2. Enqueue and dequeue describe changes at opposite queue ends.
3. Using the correct operation prevents accidental access-rule changes.
- **Analogy:** Door names matter when one room has one entrance and another has two.
- **Boundary:** Generic array insertion is not equivalent unless it preserves the ADT rule.

### Why pseudocode must expose state change

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-123-pseudocode.jpg`

1. Test the empty or full condition before accessing storage.
2. Read or write the element at the correct pointer.
3. Update the pointer so the invariant remains true.
- **Analogy:** A clear procedure shows the safety check, action and new boundary marker.
- **Boundary:** Hiding pointer updates makes correctness impossible to verify.
<!-- stage10-explanations:end -->
