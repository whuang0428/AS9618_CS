# Lesson 021: HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029  
**Paper:** Paper 1  
**Syllabus reference:** Syllabus Section 2  
**Duration:** 45 minutes  
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- protocol 协议, packet 数据包, routing 路由, bandwidth 带宽, latency 延迟

## Warm-Up Hook
Ask: If your message to a friend had to travel through several classrooms as tiny envelopes, what address would each envelope need? Use that to introduce HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context, not as a vocabulary list but as a journey.

Lesson-specific focus question: What would go wrong if a student confused **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context** with a neighbouring syllabus idea?

## Guided Explanation
Trace one message from sender to receiver. At each step, name the device, address, protocol or performance factor involved. Then deliberately break one part of the path and ask students to predict the symptom: delay, failed lookup, wrong destination or insecure transfer.

Topic-specific teaching move: keep the explanation anchored to **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

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
**Problem:** Match HTTP, HTTPS, FTP, SMTP, POP3 and IMAP to six actions: viewing a webpage securely, transferring a file, sending email, downloading email, synchronising mailbox folders and viewing a normal webpage. The worked example must explicitly use **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context**, not a generic example from the wider unit.

**Worked answer / marking focus:** HTTP: webpage; HTTPS: secure webpage; FTP: file transfer; SMTP: sending email; POP3: downloading email; IMAP: synchronised email access. Credit context, not just expansion of abbreviations.



## Student Task
Students write a protocol diary for a student submitting homework by email and downloading a file from a school server. Their final answer must include the phrase **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:  
"The key point about **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **HTTP, HTTPS, FTP, SMTP, POP3, and IMAP in context** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 2.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often confuse bandwidth with speed in every sense. Correction: bandwidth is capacity; latency and congestion also affect perceived performance. For this lesson, make students contrast that mistake with the exact idea of **http, https, ftp, smtp, pop3, and imap in context**.  
Correction prompt: "Show the mechanism, not just the label."

<!-- stage10-explanations:start -->
## Stage 10 visual explanations

### Email protocols: SMTP, POP3 and IMAP

- **Explains:** `email`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-021-email.jpg`

1. Used to send email from a client to a mail server and between mail servers.
2. Used to download email from a mail server to a client, often removing it from the server depending on settings.
3. Used to access and synchronise email stored on a mail server across multiple devices.
4. Common trap
5. IMAP is usually better for multiple devices because messages and folders stay on the server and remain synchronised.

### FTP for file transfer

- **Explains:** `file`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-021-file.jpg`

1. FTP: File Transfer Protocol
2. FTP is used to transfer files between a client and a server, such as uploading website files or downloading files from a file server.
3. Do not use FTP as a generic answer for “anything on the internet”. It is specifically about file transfer.

### HTTP and HTTPS

- **Explains:** `web`
- **Explanation type:** mechanism
- **Infographic:** `../assets/diagrams/stage10-infographics/stage10-lesson-021-web.jpg`

1. Protocol
2. Exam distinction
3. Transfers web pages and web resources between browser and web server.
4. Does not provide the same secure encrypted connection as HTTPS.
5. Secure version of HTTP used for encrypted web communication.
6. Helps protect data such as logins, payments and form submissions in transit.
<!-- stage10-explanations:end -->
