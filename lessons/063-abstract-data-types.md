# Lesson 063: Abstract data types

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.08<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall the main conclusion from Lesson 062: Why files are needed and text-file pseudocode.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.



## 2. Knowledge explanation

### 1. The definition and purpose of an abstract data type (S10.08)

**Concept relationships**

- **set of operations:** An abstract data type is a collection of…
- **abstract:** An abstract data type (ADT) is a collection…
- **type:** The definition and purpose of an abstract data…
- **collection of data:** The permitted operations and their effects define the…
- **definition:** Pseudocode for the ADT operations is not required…

**Mechanism**

1. **Identify incoming data or signal** — An abstract data type is a collection of data and a set of operations on those data.
2. **Follow the physical or logical path** — An abstract data type (ADT) is a collection of data and a set of operations on those data.
3. **Connect output to its use** — The definition and purpose of an abstract data type.

**An ADT is data together with permitted operations:** An abstract data type is a collection of data and a set of operations on those data. Stack, queue and linked list are examples whose permitted operations define their behaviour.

#### An ADT is data together with permitted operations

![An ADT is data together with permitted operations](../web/assets/diagrams/stage10-infographics/stage10-lesson-123-concept.jpg)

<details><summary>Text transcript</summary>

- An abstract data type is a collection of data and a set of operations on those data.
- Stack, queue and linked list are examples whose permitted operations define their behaviour.
- The implementation may use arrays and indexes without changing the ADT's observable rules.

</details>

<details><summary>Precise syllabus wording</summary>

Understand the definition and purpose of an abstract data type.

An abstract data type (ADT) is a collection of data and a set of operations on those data. Its behaviour is defined independently of a particular storage implementation.

</details>

<details><summary>Open precise terminology and exam facts</summary>

- An abstract data type (ADT) is a collection of data and a set of operations on those data. Its behaviour is defined independently of a particular storage implementation.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Justify a stack, queue or linked list from its operations and the scenario. Candidates are not required to write pseudocode for these ADT operations, but must be able to add, edit and delete data and describe array implementations.
- Choose and justify a stack, queue or linked list from its LIFO, FIFO or linkage features. Add, edit and delete data in these ADTs and implement them using arrays; pseudocode for the ADT operations is not required by the syllabus.

</details>

### Worked method

1. Add, edit and delete without changing the ADT rule
2. Push D adds D at the stack top and pop deletes the current top.
3. Enqueue D adds at the queue rear and dequeue deletes from the front.
4. In an array-based linked list, edit Data[5] to change only the node value; insert or delete by changing Next indexes, Start and the free list rather than shifting every later…

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - give - 2 marks

Give the official definition of an ADT.

**Answer:** A collection of data and a set of operations on those data.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word give, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - describe - 6 marks

For array implementations of a stack, queue and linked list, describe how data is added, edited and deleted while preserving each ADT's rule.

**Answer:** stack push/pop uses the top position and stack pointer; queue enqueue/dequeue uses rear and front in FIFO order; linked-list add obtains a free index and changes links; edit changes a stored data field without corrupting order or links; linked-list delete bypasses the node and returns its index to the free list; distinguishes conceptual operations from the non-required task of writing their pseudocode

**Marking guidance:** Do not define an ADT as only an array, require ADT-operation pseudocode, or delete a linked-list node without repairing its links and free-list state.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - write - 2 marks

Must candidates write pseudocode for stack, queue and linked-list operations?

**Answer:** No. They must be able to add, edit and delete data and describe array implementations, but operation pseudocode is not required by the syllabus.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/22/S/25 Q10(b) | 2 | complete | trace |
| 9618/21/S/24 Q3(a) | 3 | describe | explain |
| 9618/22/S/23 Q3(i) | 4 | describe | explain |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define abstract data types with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often describe stacks and queues as just arrays. Correction: the defining feature is the access rule, not the storage implementation.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For abstract data types, use the exact technical term before applying it to the scenario.
