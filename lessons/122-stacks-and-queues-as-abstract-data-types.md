# Lesson 122: Stacks and queues as abstract data types

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

## Stage 2 syllabus completion

**Official audit rows:** S10.09, S10.10
**Focus:** Linked lists and array-based ADT state

### Direct explanation

- A linked list stores nodes containing data and a pointer/index to the next node; a start pointer identifies the first node and a null value ends the chain. Logical order can differ from physical array order.
- In an array implementation, parallel Data and Next arrays store nodes and a free-list pointer tracks unused locations. Insert/delete changes links and the free list; items need not be shifted as in a contiguous array.

### Worked example

**Insert after node 2:** Take node 5 from the free list, set Data[5] to the new value, set Next[5] to old Next[2], then set Next[2] to 5. The logical chain now includes node 5 after node 2.

### Targeted practice and answers

1. What marks the end of a linked list?
   **Answer:** A null/sentinel next pointer.
2. What does the start pointer store?
   **Answer:** The index/address of the first logical node.
3. Why need a free list in an array implementation?
   **Answer:** To track unused node positions available for insertion.

### Exam-style question and MS

**Question (4 marks):** An array-based linked list uses Data and Next arrays. Explain how a new node is inserted at the front.

- **B1** obtains an unused index from the free list
- **B1** stores the new data at that index
- **B1** sets its Next to the old start index
- **B1** updates start to the new index / updates free-list head

**Strict note:** Do not accept shifting every array element as the defining linked-list insertion method.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Why an ADT is defined by behaviour

- **Explains:** `concept`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-concept.jpg`

1. The ADT specifies permitted operations and their observable effects.
2. Client code uses those operations without accessing internal storage directly.
3. The implementation can change while the behaviour contract remains stable.
- **Analogy:** A service counter defines allowed requests without exposing the storeroom layout.
- **Boundary:** Using an array does not automatically make a structure a stack or queue.

### Why boundary checks come first

- **Explains:** `errors`
- **Explanation type:** tradeoff
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-errors.jpg`

1. Underflow occurs when removal is requested from an empty structure.
2. Overflow occurs when fixed storage has no free position.
3. Checking first prevents invalid reads, writes and pointer changes.
- **Analogy:** Check whether a shelf is empty or full before moving an item.
- **Boundary:** Dynamic storage changes the capacity strategy but can still exhaust memory.

### How pointers enforce ADT behaviour

- **Explains:** `implementation`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-implementation.jpg`

1. A stack pointer identifies the current top or next free slot.
2. Queue front and rear pointers identify removal and insertion positions.
3. Each valid operation updates data and pointers in a fixed order.
- **Analogy:** Markers turn a row of storage boxes into a controlled service structure.
- **Boundary:** Incorrect wrap-around or update order can overwrite live queue data.

### Why operation names preserve meaning

- **Explains:** `operations`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-operations.jpg`

1. Push and pop describe changes at a stack's top.
2. Enqueue and dequeue describe changes at opposite queue ends.
3. Using the correct operation prevents accidental access-rule changes.
- **Analogy:** Door names matter when one room has one entrance and another has two.
- **Boundary:** Generic array insertion is not equivalent unless it preserves the ADT rule.

### Why pseudocode must expose state change

- **Explains:** `pseudocode`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-pseudocode.jpg`

1. Test the empty or full condition before accessing storage.
2. Read or write the element at the correct pointer.
3. Update the pointer so the invariant remains true.
- **Analogy:** A clear procedure shows the safety check, action and new boundary marker.
- **Boundary:** Hiding pointer updates makes correctness impossible to verify.

### Why two ends create FIFO

- **Explains:** `queue`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-queue.jpg`

1. Enqueue adds a new item at the rear.
2. Dequeue removes the waiting item at the front.
3. Earlier arrivals remain ahead of later arrivals.
- **Analogy:** A single orderly waiting line serves the earliest arrival first.
- **Boundary:** A priority queue follows a different removal rule and is not ordinary FIFO.

### Why one open end creates LIFO

- **Explains:** `stack`
- **Explanation type:** process
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-122-stack.jpg`

1. Push adds the new item at the top position.
2. Only the current top item is available to pop.
3. The most recently pushed item therefore leaves first.
- **Analogy:** Only the top plate of a pile can be removed safely.
- **Boundary:** Accessing an older item requires removing items above it first.
<!-- stage10-explanations:end -->
