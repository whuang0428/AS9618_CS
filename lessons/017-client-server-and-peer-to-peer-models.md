# Lesson 017: Client-server and peer-to-peer models

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Define and distinguish the network concepts in **Client-server and peer-to-peer models**.
2. Explain how the relevant devices, addressing or protocols support communication.
3. Apply the concepts to a network scenario and justify a suitable choice.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Client-server and peer-to-peer models, not as a vocabulary list but as a journey.

Focus question: Which feature distinguishes **Client-server and peer-to-peer models** from the most closely related syllabus concept?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Require students to state the relevant term, describe the mechanism or process, and apply it to the example under discussion.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: sender and receiver. Middle: packet path with devices/protocols. Right: cause -> symptom -> fix table.

Teacher guidance: require the technical term and the explanation, method or application specified by the command word.

## Worked Example
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect.

## Mini-Quiz
1. State one precise definition from this lesson.
2. Apply the relevant method to one calculation, trace, query, diagram or scenario.
3. Explain one result or consequence using a complete cause-and-effect statement.

## Exit Ticket
Complete this sentence in English:
"One important point from this lesson is ... . One common error is ... because ... ."

## Homework
- Create three flashcards: one definition, one worked example and one common error.
- Answer one 4-mark question about **Client-server and peer-to-peer models**. Follow its command word and apply each point to the stated context.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance.
Correction prompt: "State the correct term, then explain the relevant process or distinction."

<!-- stage2-completion:start -->
## Stage 2 syllabus completion

**Official audit rows:** S2.03
**Focus:** Thin clients and thick clients

### Direct explanation

- A thin client relies mainly on a server for processing and/or storage. A thick client performs more processing locally and normally stores more software or data on the client device.
- Thin clients simplify central updates and can use lower-specification hardware, but depend heavily on the server and network. Thick clients can continue more work when disconnected, but local installation, security and maintenance are distributed.

### Worked example

**School computer room:** Thin clients suit centrally managed exam accounts because software and files can be controlled on servers. A network outage, however, can stop the room working; a thick client may retain local applications.

### Targeted practice and answers

1. Where is most processing performed for a thin client?
   **Answer:** On the server.
2. Give one thick-client advantage during a network outage.
   **Answer:** Local applications/data may remain usable.
3. Give one thin-client management advantage.
   **Answer:** Software and updates can be managed centrally.

### Exam-style question and MS

**Question (4 marks):** A company is choosing thin clients for a call centre. Explain two benefits and one drawback.

- **B1** centralised software/update management
- **B1** lower client hardware/storage requirement or centralised security/data
- **B1** depends on network/server availability or performance
- **B1** develops one point in the call-centre context

**Strict note:** Do not award a mark for 'cheaper' unless the lower client specification or central administration explains why.
<!-- stage2-completion:end -->

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Client-server vs peer-to-peer

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-017-compare.jpg`

1. Client-server
2. Peer-to-peer
3. Centralised management, security, backups and permissions.
4. Decentralised control; each peer may manage its own resources.
5. May need dedicated server hardware, software and administration.
6. Can be cheaper for small networks because no dedicated server is required.
7. Reliability
8. Server failure may affect many clients unless redundancy is used.
9. No single central server, but availability depends on peers being online.
10. Typical use
11. School login, file server, web server, email server.
12. Small file sharing, local collaboration, distributed sharing.

### One model has equal peers; the other has dedicated service roles

- **Explains:** `model-visual`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-017-model-visual.jpg`

1. Visual explanation
2. Follow the arrows and identify which devices can provide a resource.
3. Peer-to-peer: every device can request and provide
4. The lines show possible direct sharing between peers. They do not define a physical topology: peer-to-peer describes device roles.
5. No dedicated central server is required.
6. Each peer can request a file and provide one.
7. A peer going offline can make its shared resource unavailable.
8. Client-server: clients request a managed service
9. Requests go to the server and responses return to clients. The server role may be performed by hardware or software.
10. Accounts, permissions and backups can be managed centrally.
11. Dedicated server resources and administration add cost.
12. Server failure can affect many clients unless redundancy is used.

### Core roles

- **Explains:** `roles`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-017-roles.jpg`

1. A client requests a service or resource, such as a web page, file, login or print job.
2. A server provides a service or resource to clients, often with central control over data and access.
3. A peer can request and provide resources directly, so devices share responsibility instead of relying on one central server.
4. A service is the function provided, such as file storage, authentication, email, printing or web hosting.

### Scenario choices

- **Explains:** `usecases`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-017-usecases.jpg`

1. School accounts
2. Client-server fits because logins, permissions and backups can be centrally managed.
3. Small home sharing
4. Peer-to-peer may fit when a few devices share files directly without a dedicated server.
5. Public web app
6. Client-server fits because many clients request data from managed servers.
7. Distributed file sharing
8. Peer-to-peer can spread sharing across peers, reducing reliance on one central source.
<!-- stage10-explanations:end -->
