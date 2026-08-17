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
## Stage 10 causal explanations

### Why an ADT is defined by permitted behaviour

- **Explains:** `concept`
- **Explanation type:** mechanism

An abstract data type describes what operations are available and what behaviour those operations guarantee. It deliberately separates that contract from the storage used to implement it. A stack may use an array or linked structure, but users of the stack still push and pop at the same end. This separation allows the implementation to change without changing code that relies on the ADT operations. It also prevents accidental access patterns that would break the intended behaviour. Calling an array a stack merely because it stores stack items is therefore incomplete; the code must enforce stack operations and state rules. Abstraction is useful because programmers can reason about a small set of guarantees instead of every memory detail, while implementers remain free to choose a representation that fits capacity and performance requirements.

### Why one accessible end produces LIFO behaviour

- **Explains:** `stack`
- **Explanation type:** process

A stack adds and removes items at the same end, called the top. When a new item is pushed, it becomes the only item that pop may remove next. Older items remain underneath it until every newer item above them has been removed. This restriction produces last-in, first-out behaviour without requiring timestamps or a search for the newest value. A top pointer or index records the current accessible position, so push changes it in one direction and pop reverses that change. The mechanism suits nested tasks such as function calls or undo operations because the most recently started action must normally finish first. If code removes an item from the bottom, it has stopped behaving as a stack even if the data are still stored in the same array.

### Why separate front and rear positions produce FIFO behaviour

- **Explains:** `queue`
- **Explanation type:** process

A queue adds new items at the rear and removes existing items from the front. Because new arrivals cannot jump ahead of items already waiting, removal follows first-in, first-out order. Front and rear pointers let these operations occur without searching for the oldest item. In an array implementation, moving every item after a dequeue would be wasteful, so a circular queue often lets the pointers wrap to the beginning and reuse free positions. The logical queue order is then determined by the pointers, not by the visual left-to-right order of the array. This mechanism suits print jobs and service requests where earlier arrivals should normally be handled first. Priority queues follow different removal rules and should not be used as evidence that an ordinary queue is not FIFO.

### Why operation names protect the meaning of the structure

- **Explains:** `operations`
- **Explanation type:** comparison

ADT operation names communicate both an action and the rule under which it occurs. Push and pop imply access at the top of a stack; enqueue and dequeue imply addition at the rear and removal at the front of a queue. Replacing these with a vague word such as add or remove hides the position and makes it impossible to verify LIFO or FIFO behaviour. Peek returns the next accessible item without changing the structure, which is different from pop or dequeue. Clear, isEmpty and isFull describe state rather than moving data. In an implementation, these operations may use ordinary array assignments, but callers should use the ADT interface so they cannot bypass its restrictions. The vocabulary matters because it preserves the behavioural contract even when the internal representation changes.

### Why overflow and underflow must be checked before changing state

- **Explains:** `errors`
- **Explanation type:** tradeoff

Underflow occurs when a removal operation is requested from an empty structure; overflow occurs when an insertion is requested but a fixed-capacity implementation has no free space. The check must happen before pointers or stored values are changed. Otherwise a pop might move the top pointer outside the valid range, or a push might overwrite unrelated memory or an existing item. A dynamic implementation may grow rather than report overflow, but it still needs to handle allocation failure and defined capacity limits. The ADT's public behaviour should specify what happens, such as returning an error value or rejecting the operation. These errors are not properties of the abstract ordering rule itself: they arise from current state and implementation limits. Correct code separates the state check from the successful operation so a failed request leaves the structure unchanged.

### Why array storage needs pointers to enforce ADT behaviour

- **Explains:** `implementation`
- **Explanation type:** mechanism

An array provides indexed storage but does not know which index is the top of a stack or the front of a queue. Additional state variables give those positions meaning. A stack top index identifies the most recently occupied position. A queue normally needs front and rear positions, and often an item count, especially when the array is circular. The operations update these variables in a controlled order and then read or write the corresponding element. Directly accessing an arbitrary array index would bypass the ADT rule even though the underlying data remain valid. Fixed arrays make capacity checks necessary, while linked implementations replace indexes with references. The representation changes the code and performance characteristics, but the observable push, pop, enqueue and dequeue behaviour must remain the same.

### Why exam pseudocode should expose the state change clearly

- **Explains:** `pseudocode`
- **Explanation type:** comparison

Pseudocode for an ADT operation should make its precondition and state change visible. Before pushing to a fixed stack, it checks capacity; before popping, it checks whether the stack is empty. It then updates the top position and reads or writes the array in the order required by the chosen convention. Queue code similarly shows which pointer identifies the removal position and how wrap-around is handled. Java collection methods may hide these details, so copying a library call does not demonstrate the requested algorithm. Conversely, if a question asks only for the use of an ADT, the named operations may be enough and reimplementing the structure wastes time. The required abstraction level comes from the question: trace the interface when behaviour is tested, and expose pointers and checks when implementation is tested.
<!-- stage10-explanations:end -->
