# Lesson 024: Internet, intranet, extranet, and cloud services

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 2
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Internet, intranet, extranet, and cloud services** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce Internet, intranet, extranet, and cloud services, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **Internet, intranet, extranet, and cloud services** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **Internet, intranet, extranet, and cloud services**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: sender and receiver. Middle: packet path with devices/protocols. Right: cause -> symptom -> fix table.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** A student cannot access a secure web page on the school network. Identify two possible network-related causes and one suitable check for each. The worked example must explicitly use **Internet, intranet, extranet, and cloud services**, not a generic example from the wider unit.

**Worked answer / marking focus:** Strong answers connect a named component or protocol to a symptom, for example DNS failure prevents name resolution, or HTTPS certificate problems affect secure communication.



## Student Task
Students draw a packet journey for a web request and label where addressing, routing and protocols are used. They then add one bottleneck and explain its effect. Their final answer must include the phrase **Internet, intranet, extranet, and cloud services** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Internet, intranet, extranet, and cloud services**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Internet, intranet, extranet, and cloud services** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Internet, intranet, extranet, and cloud services** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **internet, intranet, extranet, and cloud services**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S2.06, S2.13
**Focus:** Public/private cloud and WWW/internet distinction

### Direct explanation

- The internet is the global network infrastructure and protocols connecting networks. The World Wide Web is one service using that infrastructure: linked web resources accessed using browsers and HTTP/HTTPS.
- A public cloud offers shared provider infrastructure to customers; a private cloud is dedicated to one organisation. Public cloud can scale with lower capital cost but gives less direct control; private cloud offers more control/customisation but costs more to operate.

### Worked example

**Company document system:** A small company may choose public cloud storage for rapid scaling and outsourced maintenance. A regulated organisation may choose a private cloud for control over configuration and data location, accepting higher cost.

### Targeted practice and answers

1. Is email part of the WWW?
   **Answer:** No. It uses the internet but is a separate internet service.
2. Who uses the infrastructure in a private cloud?
   **Answer:** One organisation.
3. Give one public-cloud drawback.
   **Answer:** Less direct control, provider dependence, privacy/location concerns or internet dependence.

### Exam-style question and MS

**Question (4 marks):** Distinguish the internet from the World Wide Web, then explain one benefit of a private cloud for an organisation.

- **B1** internet is the network infrastructure / interconnected networks
- **B1** WWW is a service of linked web resources using the internet
- **B1** private cloud infrastructure is dedicated to one organisation
- **B1** greater control/security configuration/customisation developed

**Strict note:** Do not accept 'the internet is WiFi' or 'the WWW is the internet'.

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Cloud services

- **Explains:** `cloud`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-024-cloud.jpg`

1. Cloud services provide storage, software or computing resources from remote servers over a network. The user does not need to own all the local infrastructure.
2. Cloud storage
3. Files are stored on remote servers and accessed from different devices over a network.
4. Example: a student saves project files online and opens them at home and school.
5. Cloud software
6. Applications run through a browser or client while data and updates are managed by the provider.
7. Example: collaborative documents or email systems.
8. Cloud infrastructure
9. Servers, processing power or databases are rented from a provider instead of bought and maintained locally.
10. Example: hosting a school portal on remote servers.
11. Common trap
12. Cloud advantages are not automatic. A strong answer links the benefit or risk to a scenario: remote access, collaboration, backup, scalability, provider dependence, security, privacy or internet connection.

### Compare by access, not by buzzword

- **Explains:** `compare`
- **Explanation type:** comparison
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-024-compare.jpg`

1. Access / control
2. Exam distinction
3. Internet
4. Global public network; services may be public or login-protected.
5. Do not call every online service an intranet.
6. Intranet
7. Private internal network controlled by one organisation.
8. Restricted to authorised internal users.
9. Extranet
10. Private controlled access extended to selected external users.
11. Not fully public; access is still controlled.
12. Cloud service

### Internet, intranet and extranet

- **Explains:** `networks`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-024-networks.jpg`

1. These terms describe access scope and purpose. The spelling difference is small; the exam difference is not.
2. Internet
3. A global public network of interconnected networks. It allows public services such as websites, email and online platforms.
4. Access: public, though individual services may still require login.
5. Use case: public website, online search, public cloud service access.
6. Intranet
7. A private network used within an organisation, often using web technologies but restricted to authorised users.
8. Access: internal staff or members only.
9. Use case: staff policies, internal forms, private school resources.
10. Extranet
11. A private network that allows controlled access to selected external users or organisations.
12. Access: authorised internal users plus selected partners/customers/suppliers.
<!-- stage10-explanations:end -->
