# Lesson 007: Network purposes, LANs, WANs and computer roles

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029 Version 2<br>
**Paper:** Paper 1<br>
**Syllabus:** Section 2: Communication<br>
**Syllabus requirements:** S2.01, S2.02, S2.03<br>
**Pacing:** Flexible. This lesson is deliberately over-complete; select a quick, full or deep route for the learners in front of you.

## Teaching-depth menu

- **Quick route:** Use the diagnostic, learning objectives, first worked example and foundation question. Stop once the learner can explain the central distinction accurately.
- **Full route:** Teach every core explanation point, the worked example and all lesson questions. Use the visual only when it adds a different representation.
- **Deep route:** Add the prerequisite refresher, ask learners to connect the concept checklist, discuss the labelled extension and complete a transfer question without a model answer.

## 1. Prerequisite knowledge and quick diagnostic

Recall S2.02 before starting this lesson.

Ask the learner to give one accurate definition or method step before continuing. If they cannot, briefly revisit the named prerequisite rather than repeating the whole previous lesson.

### Optional prerequisite refresher

- Evidence must cover the different computer roles in each model, balanced benefits and drawbacks, and a scenario-linked choice; a topology cannot substitute for a network model.
- Explain client-server and peer-to-peer models, their computer roles, benefits and drawbacks, and justify a model for a given situation.


## 2. Knowledge explanation

### Learning objectives

- Show understanding of the purpose and benefits of networking devices and the characteristics of LANs and WANs.
- Explain client-server and peer-to-peer models, their computer roles, benefits and drawbacks, and justify a model for a given situation.
- Show understanding of thin-client and thick-client computers and the differences between them.

### Concept checklist for teacher choice

- networking devices
- benefits
- LAN
- WAN
- limited geographical area
- large geographical area
- client-server
- peer-to-peer
- clients request
- servers provide
- drawbacks
- justified
- thin client
- thick client
- server processing / server for processing
- local processing / processing locally

### Detailed explanation

- A LAN covers a limited area and is normally managed by one organisation; a WAN connects sites across a large area and commonly uses provider infrastructure. Benefits must identify a shared or centrally managed resource and its consequence.
- Evidence must cover the different computer roles in each model, balanced benefits and drawbacks, and a scenario-linked choice; a topology cannot substitute for a network model.
- Thin/thick describes where processing, software and storage reside; it must not be treated as a synonym for client-server/peer-to-peer.
- Networking devices allow computers and users to share resources such as files, printers, storage and an internet connection. A network can also support communication, collaboration, central account management, central backup and access to shared services. A benefit must identify what is shared or managed and explain the consequence; 'it is easier' is not enough.
- A LAN covers a limited geographical area such as one building or site and is normally owned or managed by one organisation. A WAN covers a large geographical area, connects separate LANs or sites and commonly uses telecommunications-provider infrastructure. LAN and WAN describe scope and management, not a guaranteed speed.
- In a bus topology, devices attach to one shared backbone cable and a transmitted signal travels along that shared medium. In a star topology, every device has a separate link to a central switch and each frame passes through that switch. In a mesh topology, nodes have multiple interconnections so packets may use alternative routes. A hybrid topology combines two or more topology patterns, for example two star segments connected by a backbone.
- Topology choice must be justified from packet path, failure effect, redundancy, cabling cost, expansion and traffic. A star isolates most individual cable faults but the central switch is a single point of failure; a mesh offers alternative paths but needs more links and management; a bus uses less cable but the shared backbone and shared traffic are weaknesses.
- In a client-server model, clients request services or resources and one or more servers provide them. Dedicated server roles can include authentication, file storage, web hosting and backup. Central management, consistent access control and central backup are benefits; server cost, specialist administration, dependence on the server and a possible central failure are drawbacks.
- In a peer-to-peer model, each peer may request and provide resources directly. It can be inexpensive and simple for a small trusted group because no dedicated server is required, but distributed accounts, backups, security and availability become harder to control. A model choice must be justified from number of users, trust, management, availability, cost and the required shared services.
- A thin client relies mainly on a server for processing and/or storage. A thick client performs more processing locally and normally stores more software or data on the client device. Thin clients simplify central updates and can use lower-specification hardware, but depend heavily on the server and network. Thick clients can continue more work when disconnected, but local installation, security and maintenance are distributed.
- To justify a topology, link the packet path, dependence on central hardware, alternative routes and failure behaviour to the given situation.

### Worked example

Choose a topology for a two-building clinic / Choose a model and client type for a school examination room: Use a star LAN inside each building so individual devices have independent links to a central switch. Connect the two stars to form a hybrid network. If the inter-building link is safety-critical, add a second path: packets can use the alternative route after one link fails, at extra cost. Use a client-server model so accounts, permissions, exam files and backups are controlled by servers. Thin clients support central software management and reduce local storage, but the school must provide resilient servers and networking because a failure can stop the room. Thick clients would reduce that dependence but distribute software and security maintenance.

Beyond syllabus / 延伸知识（不要求背诵）: real networks organise communication in layers so that hardware, addressing and application protocols can change independently.

### Retained visual explanation

![Why LAN and WAN management differs](../web/assets/diagrams/stage10-infographics/stage10-lesson-017-lanwan.jpg)

_Why LAN and WAN management differs. The image and mobile text alternative come from one maintained fact source._

## 3. Practice by question type

### Question 1 - foundation - explain - 8 marks

A college is replacing one shared bus network with star LANs connected into a hybrid topology. Explain two networking benefits and justify the topology change. A call centre is choosing a client-server model with thin clients. Explain two benefits and two drawbacks of this combined choice.

**Answer:** one developed resource-sharing, communication or central-management benefit; a second distinct developed networking benefit; star frames pass through a central switch and an individual cable failure normally affects one device; hybrid combines topology patterns / connects the star segments; justification links reliability, expansion, traffic or cost to the college; centralised accounts/software/update or data management; lower client hardware/storage requirement; depends on network/server availability or performance; server infrastructure, administration or central-failure cost; develops at least one point in the call-centre context

**Marking guidance:** Do not award generic benefits or a topology name without a path/failure consequence. Do not award 'cheaper' unless the lower client specification or central administration explains why; do not confuse network model with topology.

**Common error:** For the command word explain, perform that exact action; do not replace it with an unrelated fact.

### Question 2 - application - compare - 2 marks

Compare a LAN from a WAN using geographical scope and management.

**Answer:** A LAN covers a limited site and is normally managed by one organisation; a WAN connects sites over a large area and often uses provider infrastructure.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not repeat the same point in different words; each mark needs a separate idea or method step.

### Question 3 - transfer - state - 2 marks

State the roles of a client and server.

**Answer:** A client requests a service or resource; a server provides and manages the service or resource.

**Marking guidance:** Award one mark for each distinct, technically accurate point or method step.

**Common error:** Do not copy the worked example unchanged; transfer the method and check it against the new context.

### Related past-paper indexes

| Reference | Marks | Command word | Question type |
|---|---:|---|---|
| 9618/12/S/25 Q6(c) | 6 | complete | recall |
| 9618/12/S/25 Q6(b) | 4 | explain | explain |
| 9618/12/S/25 Q6(e) | 3 | complete | recall |
| 9618/12/S/25 Q6(a) | 2 | state | recall |

These are indexes only. Cambridge question and mark-scheme wording is not reproduced.

## 4. Summary and exam reminders

### Summary

- Define network purposes, lans, wans and computer roles with the exact technical vocabulary expected by the syllabus.
- Use the lesson method on a fresh context and show the intermediate decision, representation or calculation.
- Match the shape of the answer to the command word and the available marks.
- Check the final answer against the scenario instead of repeating a memorised sentence.

### Common error to correct

Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.

### Exam technique

- Follow the command word: state gives a fact; explain links a cause to a consequence; compare covers both sides.
- Match the number of independent points or method steps to the available marks.
- For network purposes, lans, wans and computer roles, use the exact technical term before applying it to the scenario.
