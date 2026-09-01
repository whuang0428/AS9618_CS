# Lesson 065: Queues and FIFO operations

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.09, S10.10<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.08, S10.03, S10.09 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- An abstract data type (ADT) is a collection of data and a set of operations on those data. Its behaviour is defined independently of a particular storage implementation.
- Understand the definition and purpose of an abstract data type.
- Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.
- Understand array, index, lower bound and upper bound terminology.
- Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
- Understand stack, queue and linked-list features; justify a structure.


## 2. Knowledge explanation

### 1. Stack, queue and linked-list features; justify a structure: Queues and FIFO operations (S10.09)

**Atomic learning targets**

- **S10.09.A01:** stack
- **S10.09.A02:** queue
- **S10.09.A03:** linked list
- **S10.09.A04:** LIFO
- **S10.09.A05:** FIFO
- **S10.09.A06:** justify

**Core explanation**

- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.
- Use stack, queue and linked list to store data; add, edit and delete data while preserving each ADT rule. Describe array implementations for all three. Candidates are not required to write pseudocode for these ADT operations.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.

**Mechanism or method**

1. **Identify the relevant condition or input** — All three can be implemented using arrays and state variables or indexes.
2. **Trace how the process works** — Stack uses an array with a top/stack pointer;
3. **Connect the mechanism to its result** — queue uses an array with front and rear;

#### Worked example: Stack, queue and linked-list features; justify a structure: Queues and FIFO operations: complete worked route

1. **Identify the relevant condition or input**

All three can be implemented using arrays and state variables or indexes.

2. **Trace how the process works**

Stack uses an array with a top/stack pointer;

3. **Connect the mechanism to its result**

queue uses an array with front and rear;

4. **Complete example**

Add, edit and delete without changing the ADT rule: Push D adds D at the stack top and pop deletes the current top. Enqueue D adds at the queue rear and dequeue deletes from the front. In an array-based linked list, edit Data[5] to change only the node value;

**Misconceptions to correct**

- Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing.

#### Mastery check (MC-L065-S10.09)

Explain the following targets in one connected answer, using a concrete example for each: stack; queue; linked list; LIFO; FIFO; justify.

<details><summary>Answer criteria</summary>

- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.
- Use stack, queue and linked list to store data; add, edit and delete data while preserving each ADT rule. Describe array implementations for all three. Candidates are not required to write pseudocode for these ADT operations.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.

</details>

**Supplementary concept map**

- **linked list:** Choose and justify a stack, queue or linked…
- **queue:** Justify a stack, queue or linked list from…
- **FIFO:** Their key features and justify which structure suits…
- **front:** A queue is FIFO with enqueue at the…
- **rear:** Queue uses an array with front and rear
- **stack:** Stack, queue and linked-list features

**Supplementary three-step recap**

1. **Translate the stated design** — Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features.
2. **Apply one complete operation** — Their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
3. **Trace state and boundaries** — Justify a stack, queue or linked list from its operations and the scenario.

**Concrete case: linked list:** Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features.



<details><summary>Precise syllabus wording</summary>

Understand stack, queue and linked-list features; justify a structure.

Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.

</details>

### 2. Add, edit and delete data in the ADTs and implement them using arrays; pseudocode for operations… (S10.10)

**Atomic learning targets**

- **S10.10.A01:** Add
- **S10.10.A02:** edit
- **S10.10.A03:** delete
- **S10.10.A04:** stack
- **S10.10.A05:** queue
- **S10.10.A06:** linked list
- **S10.10.A07:** array
- **S10.10.A08:** not required
- **S10.10.A09:** pseudocode

**Core explanation**

- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- Justify a stack, queue or linked list from its operations and the scenario. Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.

**Mechanism or method**

1. **Identify the relevant condition or input** — All three can be implemented using arrays and state variables or indexes.
2. **Trace how the process works** — Stack uses an array with a top/stack pointer;
3. **Connect the mechanism to its result** — queue uses an array with front and rear;

#### Worked example: Add, edit and delete data in the ADTs and implement them using arrays; pseudocode for operations: complete worked route

1. **Identify the relevant condition or input**

All three can be implemented using arrays and state variables or indexes.

2. **Trace how the process works**

Stack uses an array with a top/stack pointer;

3. **Connect the mechanism to its result**

queue uses an array with front and rear;

4. **Complete example**

Add, edit and delete without changing the ADT rule: Push D adds D at the stack top and pop deletes the current top. Enqueue D adds at the queue rear and dequeue deletes from the front. In an array-based linked list, edit Data[5] to change only the node value; insert or delete by changing Next indexes, Start and the free list rather than shifting every later array item.

**Misconceptions to correct**

- Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing.

#### Mastery check (MC-L065-S10.10)

Explain the following targets in one connected answer, using a concrete example for each: Add; edit; delete; stack; queue; linked list; array; not required; pseudocode.

<details><summary>Answer criteria</summary>

- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- Justify a stack, queue or linked list from its operations and the scenario. Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.

</details>

**Supplementary concept map**

- **linked list:** Justify a stack, queue or linked list from…
- **not required:** Candidates are not required to write pseudocode for…
- **array:** Add, edit and delete data in the ADTs…
- **queue:** Stack, queue and linked list are examples of…
- **front:** Queue uses an array with front and rear
- **rear:** Add with enqueue at the rear and delete…

**Supplementary three-step recap**

1. **Translate the stated design** — Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit…
2. **Apply one complete operation** — Be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these…
3. **Trace state and boundaries** — Add, edit and delete data in the ADTs and implement them using arrays

**Concrete case: linked list:** Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.



<details><summary>Precise syllabus wording</summary>

Add, edit and delete data in the ADTs and implement them using arrays; pseudocode for operations is not required by the syllabus.

Use stack, queue and linked list to store data; add, edit and delete data while preserving each ADT rule. Describe array implementations for all three. Candidates are not required to write pseudocode for these ADT operations.

</details>

### Lesson technical reference

- Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
- Use stack, queue and linked list to store data; add, edit and delete data while preserving each ADT rule. Describe array implementations for all three. Candidates are not required to write pseudocode for these ADT operations.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- Justify a stack, queue or linked list from its operations and the scenario. Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.
- A stack is LIFO with push/pop at the top; a queue is FIFO with enqueue at the rear and dequeue at the front; a linked list supports traversal and insertion/deletion through links.
- Justification must name the required access order or update behaviour. Array implementations have fixed capacity unless resized and require overflow/underflow checks; linked structures require pointer management.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - justify - 4 marks

Justify a suitable ADT for browser Back history and contrast it with a queue.

**Answer:** selects stack; most recently visited page is returned to first / LIFO; queue removes earliest item first / FIFO; explains why FIFO gives the wrong access order

**Marking guidance:** Do not award the structure name without its access-order consequence.

**Common error:** For the command word justify, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - suggest - 2 marks

Suggest an ADT for nested function return addresses.

**Answer:** Stack, because the most recent call returns first.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State two precise facts about queues and fifo operations.

**Answer:** Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence. Use stack, queue and linked list to store data; add, edit and delete data while preserving each ADT rule. Describe array implementations for all three. Candidates are not required to write pseudocode for these ADT operations.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/23/S/25 Q5(b) | 8 | describe | write |
| 9618/21/S/25 Q5 | 7 | describe | explain |
| 9618/23/S/25 Q5(c) | 7 | calculate | calculate |
| 9618/23/S/25 Q5(a) | 5 | describe | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S10.09: explain stack, queue, linked list, LIFO, FIFO, justify.
- S10.09 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- S10.10: explain Add, edit, delete, stack, queue, linked list, array, not required, pseudocode.
- S10.10 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing.

### Common error to correct

Students often treat files like arrays already in memory. Correction: file data must be read into variables before processing.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For queues and fifo operations, use the exact technical term before applying it to the scenario.
