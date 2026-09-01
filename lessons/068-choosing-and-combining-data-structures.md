# Lesson 068: Choosing and combining data structures

**Course:** Cambridge International AS Level Computer Science 9618, syllabus for examination in 2027-2029<br>
**Paper:** Paper 2<br>
**Syllabus:** Section 10: Data types and structures<br>
**Syllabus requirements:** S10.04, S10.09<br>
**Pacing:** Flexible. Select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every knowledge-point material set, the worked method and all lesson questions.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S10.03, S10.08 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Use the technical terms associated with arrays, including index, lower bound and upper bound. Bounds define the inclusive valid index range and an index selects one element.
- Understand array, index, lower bound and upper bound terminology.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. Its behaviour is defined independently of a particular storage implementation.
- Understand the definition and purpose of an abstract data type.


## 2. Knowledge explanation

### 1. Select one- or two-dimensional arrays for a scenario: Choosing and combining data structures (S10.04)

**Atomic learning targets**

- **S10.04.A01:** one-dimensional / 1D
- **S10.04.A02:** two-dimensional / 2D
- **S10.04.A03:** select / suitable

**Core explanation**

- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.

**Mechanism or method**

1. **Extract the constraints from the scenario** — Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.
2. **Match mechanisms to those constraints** — Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests.
3. **Link the choice to a consequence** — Do not choose 2D merely because there are many values.

#### Worked example: Select one- or two-dimensional arrays for a scenario: Choosing and combining data structures: complete worked route

1. **Extract the constraints from the scenario**

Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.

2. **Match mechanisms to those constraints**

Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests.

3. **Link the choice to a consequence**

Do not choose 2D merely because there are many values.

4. **Complete example**

Choose structures: Undo history uses a stack because the most recent action is undone first. Print jobs use a queue because the earliest accepted job prints first. A changing ordered playlist can use a linked list for link-based insertion/deletion.

**Misconceptions to correct**

- Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

#### Mastery check (MC-L068-S10.04)

Select and justify a suitable choice in a fresh scenario, explicitly using every target: one-dimensional / 1D; two-dimensional / 2D; select / suitable.

<details><summary>Answer criteria</summary>

- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.

</details>

**Supplementary concept map**

- **1D array:** One index selects an item
- **2D array:** Two indexes select a cell
- **Scenario:** Data shape determines dimensions
- **Bounds:** Valid index range
- **select:** Select one- or two-dimensional arrays for a scenario.
- **dimensions:** Select 2D when the scenario has two independent…

**Supplementary three-step recap**

1. **Translate the stated design** — Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of…
2. **Apply one complete operation** — A two-dimensional array uses two indexes, normally interpreted as row and column.
3. **Trace state and boundaries** — Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for…

**Concrete case: 1D array:** Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names.



<details><summary>Precise syllabus wording</summary>

Select one- or two-dimensional arrays for a scenario.

Select a suitable one-dimensional (1D) or two-dimensional (2D) array for a given task. One index suits a linear collection; two indexes suit data with a genuine row-column or equivalent two-coordinate relationship.

</details>

### 2. Stack, queue and linked-list features; justify a structure: Choosing and combining data structures (S10.09)

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
- Their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- Stack, queue and linked list are examples of ADTs.

**Mechanism or method**

1. **Identify the relevant condition or input** — All three can be implemented using arrays and state variables or indexes.
2. **Trace how the process works** — Stack uses an array with a top/stack pointer;
3. **Connect the mechanism to its result** — queue uses an array with front and rear;

#### Worked example: Stack, queue and linked-list features; justify a structure: Choosing and combining data structures: complete worked route

1. **Identify the relevant condition or input**

All three can be implemented using arrays and state variables or indexes.

2. **Trace how the process works**

Stack uses an array with a top/stack pointer;

3. **Connect the mechanism to its result**

queue uses an array with front and rear;

4. **Complete example**

Choose structures: Undo history uses a stack because the most recent action is undone first. Print jobs use a queue because the earliest accepted job prints first. A changing ordered playlist can use a linked list for link-based insertion/deletion.

**Misconceptions to correct**

- Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

#### Mastery check (MC-L068-S10.09)

Explain the following targets in one connected answer, using a concrete example for each: stack; queue; linked list; LIFO; FIFO; justify.

<details><summary>Answer criteria</summary>

- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- Their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- Stack, queue and linked list are examples of ADTs.

</details>

**Supplementary concept map**

- **linked list:** Stack, queue and linked-list features
- **justify:** Their key features and justify which structure suits…
- **LIFO:** A stack is LIFO
- **FIFO:** A queue is FIFO
- **stack:** Stack, queue and linked list are examples of…
- **queue:** Queue uses an array with front and rear

**Supplementary three-step recap**

1. **Translate the stated design** — Their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
2. **Apply one complete operation** — Stack, queue and linked-list features
3. **Trace state and boundaries** — Stack, queue and linked list are examples of ADTs.

**Concrete case: linked list:** Their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.



<details><summary>Precise syllabus wording</summary>

Understand stack, queue and linked-list features; justify a structure.

Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.

</details>

### Lesson technical reference

- Select a suitable one-dimensional (1D) or two-dimensional (2D) array for a given task. One index suits a linear collection; two indexes suit data with a genuine row-column or equivalent two-coordinate relationship.
- Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.
- An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER.
- Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.
- One-dimensional array pseudocode must declare explicit bounds and an element type, access elements with one index and use loop bounds that match the declared lower and upper bounds. The number of elements is upper bound - lower bound + 1.
- A two-dimensional array uses two indexes, normally interpreted as row and column. In DECLARE Marks : ARRAY[1:30, 1:4] OF INTEGER, the first range gives 30 valid row indexes and the second gives 4 valid column indexes, for 120 cells.
- Select 2D when the scenario has two independent position dimensions, such as Student and Test, Row and Column, or Day and Period. A simple list, sequence or one category of positions remains 1D even when it contains many elements.
- Two-dimensional pseudocode declares both ranges, accesses one cell as Marks[Student, Test] and normally uses nested loops: one loop traverses rows and the inner loop traverses every column for the current row.
- An abstract data type (ADT) is a collection of data and a set of operations on those data. The permitted operations and their effects define the ADT; its internal storage can change without changing that behaviour. Stack, queue and linked list are examples of ADTs.
- A stack is LIFO: add with push and delete with pop at the top. A queue is FIFO: add with enqueue at the rear and delete with dequeue at the front. A linked list stores data plus a next pointer/index in each node; start identifies the first node and null ends the chain.
- All three can be implemented using arrays and state variables or indexes. Stack uses an array with a top/stack pointer; queue uses an array with front and rear; linked list uses Data and Next arrays (or an array of node records), start and a free list. Candidates must be able to add, edit and delete data conceptually, but the syllabus does not require pseudocode for these ADT operations.
- Editing changes the stored data without breaking the access rule or links. Deleting from a linked list reconnects the predecessor to the removed node's successor and returns the freed array slot to the free list; physical array positions need not follow logical list order.

Beyond syllabus / 延伸知识（不要求背诵）: programming libraries often provide tested ADT implementations, but the exam expects you to understand their behaviour and selection.
## 3. Practice by question type

### Question 1 - foundation - apply - 2 marks

What is wrong with Marks[Row] for a 2D array?

**Answer:** It supplies only one index and therefore does not identify a column or one complete cell.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** For the command word apply, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - state - 2 marks

State two precise facts about choosing and combining data structures.

**Answer:** Select a suitable one-dimensional (1D) or two-dimensional (2D) array for a given task. One index suits a linear collection; two indexes suit data with a genuine row-column or equivalent two-coordinate relationship. Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence.

**Marking guidance:** Award one mark for each distinct fact; do not credit a repeated point.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - explain - 3 marks

Explain how choosing and combining data structures would be applied in a suitable computing context.

**Answer:** Stack, queue and linked list are examples of ADTs. Describe their key features and justify which structure suits a given situation using LIFO, FIFO or link-based traversal/insertion/deletion evidence. An array is a collection of elements stored under one identifier. An index selects one element. The lower bound is the first valid index and the upper bound is the last valid index; both bounds are inclusive in a Cambridge declaration such as ARRAY[1:20] OF INTEGER. Choose a one-dimensional array when each element needs one position, such as twenty marks or a list of names. Choose a two-dimensional array when each value naturally needs a row and a column, such as marks for several students across several tests. Do not choose 2D merely because there are many values.

**Marking guidance:** Each mark needs a relevant point linked to the stated context.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/23/S/25 Q5(b) | 3 | describe | explain |
| 9618/23/S/25 Q5(c) | 2 | describe | explain |
| 9618/23/S/25 Q5(ii) | 1 | state | recall |
| 9618/22/W/23 Q4(b) | 4 | complete | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- S10.04: explain one-dimensional / 1D, two-dimensional / 2D, select / suitable.
- S10.04 method: Extract the constraints from the scenario → Match mechanisms to those constraints → Link the choice to a consequence.
- S10.09: explain stack, queue, linked list, LIFO, FIFO, justify.
- S10.09 method: Identify the relevant condition or input → Trace how the process works → Connect the mechanism to its result.
- Correction to remember: Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Common error to correct

Students often confuse the identifier of the whole structure with one element. Correction: access requires an index or field name.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For choosing and combining data structures, use the exact technical term before applying it to the scenario.
