# Lesson 122: Stacks and queues as abstract data types

<!-- remediation-v2-stage3-scope:start -->
> **Lesson sequence scope:** The sections labelled Core syllabus content and Core syllabus practice contain the assessed syllabus points added for this lesson. Other activities remain part of this lesson unless they are individually labelled Optional.
<!-- remediation-v2-stage3-scope:end -->

<!-- stage2-completion:start -->
## Core syllabus content

**Focus:** Abstract data types, operations and justified selection

### Direct explanation

- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- A stack is LIFO with push/pop at the top; a queue is FIFO with enqueue at the rear and dequeue at the front; a linked list supports traversal and insertion/deletion through links.
- Justification must name the required access order or update behaviour. Array implementations have fixed capacity unless resized and require overflow/underflow checks; linked structures require pointer management.
- Justify a stack, queue or linked list from its operations and the scenario. Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.

### Worked example

**Add, edit and delete without changing the ADT rule / Choose structures:** Push D adds D at the stack top and pop deletes the current top. Enqueue D adds at the queue rear and dequeue deletes from the front. In an array-based linked list, edit Data[5] to change only the node value; insert or delete by changing Next indexes, Start and the free list rather than shifting every later array item. Undo history uses a stack because the most recent action is undone first. Print jobs use a queue because the earliest accepted job prints first. A changing ordered playlist can use a linked list for link-based insertion/deletion.

<!-- stage2-practice:start -->
### Targeted practice and answers

1. Give the official definition of an ADT.
   **Answer:** A collection of data and a set of operations on those data.
2. How are stack and queue removal rules different?
   **Answer:** Stack removes the most recently added item (LIFO); queue removes the earliest added item (FIFO).
3. Which state is needed for an array-based linked list?
   **Answer:** Data and Next storage, a Start index and normally a free-list index.
4. Must candidates write pseudocode for stack, queue and linked-list operations?
   **Answer:** No. They must be able to add, edit and delete data and describe array implementations, but operation pseudocode is not required by the syllabus.
5. Suggest an ADT for breadth-first waiting jobs.
   **Answer:** Queue, because first in is first out.
6. Suggest an ADT for nested function return addresses.
   **Answer:** Stack, because the most recent call returns first.
7. What must be checked before pushing to a full array stack?
   **Answer:** Overflow/capacity.

### Exam-style question and MS

**Question (10 marks):** For array implementations of a stack, queue and linked list, describe how data is added, edited and deleted while preserving each ADT's rule. Justify a suitable ADT for browser Back history and contrast it with a queue.

| Answer | Guidance | Marks |
|---|---|---:|
| stack push/pop uses the top position and stack pointer | Do not define an ADT as only an array, require ADT-operation pseudocode, or delete a linked-list node without repairing its links and free-list state. Do not award the structure name without its access-order consequence. | 1 |
| queue enqueue/dequeue uses rear and front in FIFO order |  | 1 |
| linked-list add obtains a free index and changes links |  | 1 |
| edit changes a stored data field without corrupting order or links |  | 1 |
| linked-list delete bypasses the node and returns its index to the free list |  | 1 |
| distinguishes conceptual operations from the non-required task of writing their pseudocode |  | 1 |
| selects stack |  | 1 |
| most recently visited page is returned to first / LIFO |  | 1 |
| queue removes earliest item first / FIFO |  | 1 |
| explains why FIFO gives the wrong access order |  | 1 |
<!-- stage2-practice:end -->
<!-- stage2-completion:end -->

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

### An ADT is data together with permitted operations

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-concept.jpg`

1. An abstract data type is a collection of data and a set of operations on those data.
2. Stack, queue and linked list are examples whose permitted operations define their behaviour.
3. The implementation may use arrays and indexes without changing the ADT's observable rules.
- **Analogy:** A service counter defines allowed requests without exposing the storeroom layout.
- **Boundary:** Using an array does not automatically make a structure a stack or queue.

### Why boundary checks come first

- **Explains:** `errors`
- **Explanation type:** tradeoff
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-errors.jpg`

1. Underflow occurs when removal is requested from an empty structure.
2. Overflow occurs when fixed storage has no free position.
3. Checking first prevents invalid reads, writes and pointer changes.
- **Analogy:** Check whether a shelf is empty or full before moving an item.
- **Boundary:** Dynamic storage changes the capacity strategy but can still exhaust memory.

### Implement stack, queue and linked list using arrays

- **Explains:** `implementation`
- **Explanation type:** mechanism
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-implementation.jpg`

1. An array stack uses Top; a queue uses Front and Rear; a linked list uses Data, Next, Start and a free list.
2. Add/delete preserve stack LIFO, queue FIFO and linked-list links; edit changes stored data without corrupting structure.
3. Candidates are not required to write pseudocode for these ADT operations; understand add, edit, delete and array implementation.
- **Analogy:** Markers turn a row of storage boxes into a controlled service structure.
- **Boundary:** Incorrect wrap-around or update order can overwrite live queue data.

### Why operation names preserve meaning

- **Explains:** `operations`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-operations.jpg`

1. Push and pop describe changes at a stack's top.
2. Enqueue and dequeue describe changes at opposite queue ends.
3. Using the correct operation prevents accidental access-rule changes.
- **Analogy:** Door names matter when one room has one entrance and another has two.
- **Boundary:** Generic array insertion is not equivalent unless it preserves the ADT rule.

### Why pseudocode must expose state change

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Delivery:** OPTIONAL / EXTEND
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-pseudocode.jpg`

1. Test the empty or full condition before accessing storage.
2. Read or write the element at the correct pointer.
3. Update the pointer so the invariant remains true.
- **Analogy:** A clear procedure shows the safety check, action and new boundary marker.
- **Boundary:** Hiding pointer updates makes correctness impossible to verify.

### Why two ends create FIFO

- **Explains:** `queue`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-queue.jpg`

1. Enqueue adds a new item at the rear.
2. Dequeue removes the waiting item at the front.
3. Earlier arrivals remain ahead of later arrivals.
- **Analogy:** A single orderly waiting line serves the earliest arrival first.
- **Boundary:** A priority queue follows a different removal rule and is not ordinary FIFO.

### Why one open end creates LIFO

- **Explains:** `stack`
- **Explanation type:** process
- **Delivery:** CORE / TEACH
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-stack.jpg`

1. Push adds the new item at the top position.
2. Only the current top item is available to pop.
3. The most recently pushed item therefore leaves first.
- **Analogy:** Only the top plate of a pile can be removed safely.
- **Boundary:** Accessing an older item requires removing items above it first.
<!-- stage10-explanations:end -->
