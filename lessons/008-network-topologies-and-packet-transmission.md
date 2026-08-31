# Lesson 008: Network topologies and packet transmission

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 2: Communication<br>
**Syllabus requirements:** S2.04, S2.05<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S2.04 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- All four named topologies are required. A hybrid combines two or more topology patterns; it is not merely a large network.
- Show understanding of bus, star, mesh and hybrid network topologies.


## 2. Knowledge explanation

### Learning objectives

- Show understanding of bus, star, mesh and hybrid network topologies.
- Explain how packets are transmitted between two hosts for a given topology and justify topology choice for a given situation.

### Concept checklist for teacher choice

- bus topology
- star topology
- mesh topology
- hybrid topology
- between two hosts
- bus
- central switch
- alternative routes
- hybrid
- justify

### Detailed explanation

- All four named topologies are required. A hybrid combines two or more topology patterns; it is not merely a large network.
- Packet or signal paths must be explicit for bus, star, mesh and hybrid. A justification must link the path and failure behaviour to the scenario.
- A topology describes the pattern of links between devices. In a bus topology devices share one backbone; in a star topology each device has a separate link to a central switch; in a mesh topology nodes have multiple interconnections; a hybrid topology combines two or more topology patterns.
- Compare topologies using packet path, single points of failure, alternative routes, cabling, expansion and traffic. A topology name without a path or failure consequence is not a developed explanation.
- To describe transmission between two hosts, identify the physical or logical path used. In a bus, the signal travels along the shared backbone and attached devices inspect it. In a star, the source sends a frame to the central switch, which forwards it towards the destination device. In a mesh, packets can be forwarded through one of several alternative routes. In a hybrid, the path follows each component topology, for example source to local switch, across a connecting backbone, then through the destination switch.
- Topology justification must connect the packet path to the scenario: central-device failure, backbone failure, individual cable failure, congestion, expansion, redundancy and cabling cost are consequences of the structure.
- To justify a topology choice, connect its packet path and failure behaviour to the stated scenario.

### Worked example

Send a patient record across a hybrid hospital network: The source sends the frame to its ward switch as in a star. The packet crosses the link between ward segments, then the destination switch forwards the local frame to the receiving host. A redundant inter-switch route can keep packets moving after one link fails, but adds cost and management.

Beyond syllabus / 延伸知识（不要求背诵）: real networks organise communication in layers so that hardware, addressing and application protocols can change independently.

### Retained visual explanation

![One model has equal peers; the other has dedicated service roles](../web/assets/diagrams/stage10-infographics/stage10-lesson-018-model-visual.jpg)

_One model has equal peers; the other has dedicated service roles. The image and mobile text alternative come from one maintained fact source._

## 3. Practice by question type

### Question 1 - foundation - compare - 4 marks

Compare star and mesh topologies for a hospital network and justify one choice.

**Answer:** accurate star path; accurate mesh path; developed failure or cost comparison; scenario-linked justification

**Marking guidance:** Do not credit a topology name without an accurate connection pattern and consequence.

**Common error:** For the command word compare, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - explain - 2 marks

How is a transmission carried between two hosts in a bus topology?

**Answer:** The signal travels along the shared backbone and the attached hosts inspect it.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - describe - 2 marks

Describe one possible packet path through a hybrid made from two stars.

**Answer:** Source to its switch, across the link between star segments, then through the destination switch to the receiving host.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/W/25 Q5(c) | 3 | complete | recall |
| 9618/12/W/25 Q5(d) | 3 | complete | recall |
| 9618/12/W/25 Q5(e) | 3 | complete | recall |
| 9618/11/S/24 Q8(a) | 5 | identify | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define network topologies and packet transmission with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For network topologies and packet transmission, use the exact technical term before applying it to the scenario.
