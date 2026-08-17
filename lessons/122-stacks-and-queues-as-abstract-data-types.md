# Lesson 122: Stacks and queues as abstract data types

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 2
**Syllabus reference:** Syllabus Section 10
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning

> Java is used only as a supporting implementation language. Cambridge pseudocode remains the exam answer format.

## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Stacks and queues as abstract data types** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- array 数组, record 记录, file 文件, stack 栈, queue 队列

## Warm-Up Hook
Ask who should be served first: the last student who joined the queue or the first. If anyone says last, quietly move them to the stack lesson.

Lesson-specific focus question: What would go wrong if a student confused **Stacks and queues as abstract data types** with a neighbouring syllabus idea?

## Guided Explanation
Introduce the rule of access before implementation. For Stacks and queues as abstract data types, model operations with cards: push/pop or enqueue/dequeue. Then write pseudocode that respects overflow and underflow checks.

Topic-specific teaching move: keep the explanation anchored to **Stacks and queues as abstract data types**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: ADT rule. Middle: operation trace. Right: overflow/underflow checks.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** Trace a sequence of stack or queue operations and state the final contents. The worked example must explicitly use **Stacks and queues as abstract data types**, not a generic example from the wider unit.

**Worked answer / marking focus:** Credit operation order and pointer/front/rear updates where used. Answers must show when an operation is invalid because the structure is full or empty.

```text
// Cambridge-style pseudocode
FOR Index <- 1 TO 5
    OUTPUT Scores[Index]
NEXT Index
```

```java
// Java support example only, not exam pseudocode
for (int index = 0; index < 5; index++) {
    System.out.println(scores[index]);
}
```


## Student Task
Students act out a stack or queue with paper cards, then convert the movement into pseudocode operations. Their final answer must include the phrase **Stacks and queues as abstract data types** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Stacks and queues as abstract data types**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Stacks and queues as abstract data types** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Stacks and queues as abstract data types** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 10.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often describe stacks and queues as just arrays. Correction: the defining feature is the access rule, not the storage implementation. For this lesson, make students contrast that mistake with the exact idea of **stacks and queues as abstract data types**.
Correction prompt: "Show the mechanism, not just the label."

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

1. The ADT specifies permitted operations and their observable effects.
2. Client code uses those operations without accessing internal storage directly.
3. The implementation can change while the behaviour contract remains stable.

- **Analogy:** A service counter defines allowed requests without exposing the storeroom layout.
- **Boundary:** Using an array does not automatically make a structure a stack or queue.

### Why one open end creates LIFO

- **Explains:** `stack`
- **Explanation type:** process

1. Push adds the new item at the top position.
2. Only the current top item is available to pop.
3. The most recently pushed item therefore leaves first.

- **Analogy:** Only the top plate of a pile can be removed safely.
- **Boundary:** Accessing an older item requires removing items above it first.

### Why two ends create FIFO

- **Explains:** `queue`
- **Explanation type:** process

1. Enqueue adds a new item at the rear.
2. Dequeue removes the waiting item at the front.
3. Earlier arrivals remain ahead of later arrivals.

- **Analogy:** A single orderly waiting line serves the earliest arrival first.
- **Boundary:** A priority queue follows a different removal rule and is not ordinary FIFO.

### Why operation names preserve meaning

- **Explains:** `operations`
- **Explanation type:** comparison

1. Push and pop describe changes at a stack's top.
2. Enqueue and dequeue describe changes at opposite queue ends.
3. Using the correct operation prevents accidental access-rule changes.

- **Analogy:** Door names matter when one room has one entrance and another has two.
- **Boundary:** Generic array insertion is not equivalent unless it preserves the ADT rule.

### Why boundary checks come first

- **Explains:** `errors`
- **Explanation type:** tradeoff

1. Underflow occurs when removal is requested from an empty structure.
2. Overflow occurs when fixed storage has no free position.
3. Checking first prevents invalid reads, writes and pointer changes.

- **Analogy:** Check whether a shelf is empty or full before moving an item.
- **Boundary:** Dynamic storage changes the capacity strategy but can still exhaust memory.

### How pointers enforce ADT behaviour

- **Explains:** `implementation`
- **Explanation type:** mechanism

1. A stack pointer identifies the current top or next free slot.
2. Queue front and rear pointers identify removal and insertion positions.
3. Each valid operation updates data and pointers in a fixed order.

- **Analogy:** Markers turn a row of storage boxes into a controlled service structure.
- **Boundary:** Incorrect wrap-around or update order can overwrite live queue data.

### Why pseudocode must expose state change

- **Explains:** `pseudocode`
- **Explanation type:** comparison

1. Test the empty or full condition before accessing storage.
2. Read or write the element at the correct pointer.
3. Update the pointer so the invariant remains true.

- **Analogy:** A clear procedure shows the safety check, action and new boundary marker.
- **Boundary:** Hiding pointer updates makes correctness impossible to verify.
<!-- stage10-explanations:end -->
