# Lesson 067: Encryption, hashing, and digital certificates

**Course:** Cambridge International AS Level Computer Science 9618, 2027-2029
**Paper:** Paper 1
**Syllabus reference:** Syllabus Section 6
**Duration:** 45 minutes
**Assessment rhythm:** informal questioning
## Learning Objectives
By the end of the lesson, students should be able to:
1. Describe the purpose of **Encryption, hashing, and digital certificates** using accurate Cambridge AS Computer Science vocabulary.
2. Apply the concept through a topic-specific calculation, trace, design choice or exam-style explanation.
3. Identify and correct a likely misconception about this knowledge point.

## Key Vocabulary
English first, Chinese support:

- confidentiality 机密性, integrity 完整性, authentication 认证, encryption 加密

## Warm-Up Hook
Ask: If the school password is `Password123`, is the threat the hacker or our optimism? Use the answer to separate threat, vulnerability and control.

Lesson-specific focus question: What would go wrong if a student confused **Encryption, hashing, and digital certificates** with a neighbouring syllabus idea?

## Guided Explanation
Build a risk chain: asset, threat, vulnerability, impact and control. For Encryption, hashing, and digital certificates, classify whether the control protects confidentiality, integrity, availability or authenticity. Finish with a short scenario so students choose a proportionate safeguard.

Topic-specific teaching move: keep the explanation anchored to **Encryption, hashing, and digital certificates**. Students must produce one clear sentence that names the mechanism, one example that uses it, and one exam trap connected to it.

Suggested timing:
- 0-5 min: warm-up and prediction.
- 5-18 min: teacher modelling with one visible worked example.
- 18-30 min: guided pair task.
- 30-38 min: exam-style question and correction.
- 38-45 min: mini-quiz and exit ticket.

## Board Plan / Teacher Talk Track
Left: asset and threat. Middle: risk chain. Right: control mapped to CIA/authenticity.

Teacher line to reuse: "A correct keyword starts the answer; the explanation earns the mark."

## Worked Example
**Problem:** A website stores passwords and sends payment data. Decide where hashing, encryption and a digital certificate are used. The worked example must explicitly use **Encryption, hashing, and digital certificates**, not a generic example from the wider unit.

**Worked answer / marking focus:** Hash stored passwords; encrypt payment data in transit; use a digital certificate to support authentication of the website and secure HTTPS communication.



## Student Task
Students create a three-column table: protection method, what it protects, what it does not protect. Their final answer must include the phrase **Encryption, hashing, and digital certificates** and one short Chinese support note explaining the hardest word.

## Mini-Quiz
1. State one precise definition connected to **Encryption, hashing, and digital certificates**.
2. Complete one calculation, trace, SQL clause, diagram label or scenario explanation from the lesson.
3. Write one sentence that uses "therefore" to link the concept to a consequence.

## Exit Ticket
Complete this sentence in English:
"The key point about **Encryption, hashing, and digital certificates** is..., and a common mistake is..."

## Homework
- Create three flashcards: one definition, one worked example, one common trap.
- Answer one 4-mark question about **Encryption, hashing, and digital certificates** using the structure: point, explanation, context, consequence.

## Marking Notes
Award credit for:
- Accurate terminology from Syllabus Section 6.
- A method, diagram, trace or example that matches the topic.
- Clear explanation of why the answer matters in the scenario.
Do not award vague claims such as "better", "easier", "secure" or "efficient" without a cause and consequence.

## Common Misconception and Correction Prompt
Misconception: Students often propose encryption for every problem. Correction: encryption protects confidentiality but does not fix poor permissions, phishing or missing backups. For this lesson, make students contrast that mistake with the exact idea of **encryption, hashing, and digital certificates**.
Correction prompt: "Show the mechanism, not just the label."

## Stage 2 syllabus completion

**Official audit rows:** S6.03
**Focus:** Digital signatures

### Direct explanation

- A sender hashes the message and encrypts the hash with the sender's private key to form a digital signature. The receiver uses the sender's public key to recover/verify the signed hash and independently hashes the received message.
- Matching hashes provide evidence of integrity and origin/authenticity; a valid signature does not keep the message confidential. Certificates help bind a public key to an identity.

### Worked example

**Verify a signed update:** The device verifies the signature using the publisher's public key, hashes the downloaded update and compares hashes. A mismatch means the file or signature is not valid.

### Targeted practice and answers

1. Which key creates a sender's digital signature?
   **Answer:** The sender's private key.
2. What does the receiver compare?
   **Answer:** The verified signed hash with a newly calculated message hash.
3. Does a digital signature encrypt the whole message for confidentiality?
   **Answer:** Not necessarily; its main purposes are integrity and authentication/non-repudiation evidence.

### Exam-style question and MS

**Question (4 marks):** Describe how a digital signature is created and checked.

- **B1** sender creates a hash of the message
- **B1** hash is signed/encrypted using sender's private key
- **B1** receiver uses sender's public key and hashes received message
- **B1** matching hashes verify integrity and provide evidence of sender authenticity

**Strict note:** Do not award confidentiality as the purpose of a signature unless separate message encryption is described.

<!-- stage10-explanations:start -->
## Stage 10 causal explanations

### Why security methods cannot substitute for one another

- **Explains:** `core`
- **Explanation type:** comparison

Security methods solve different questions. Encryption asks who can read captured data; hashing asks whether a value matches or has changed; a digital certificate helps establish whose public key is being presented. These questions can occur in the same connection, which is why the methods are often used together, but combining them does not erase their separate mechanisms. Encrypting a password for transmission does not provide a safe long-term comparison method by itself, and hashing a message does not keep the message secret. A certificate is also not an encrypted copy of a website. Choosing a method begins with the required property: confidentiality, integrity, authentication or non-repudiation. A precise explanation names the threat, describes how the method changes what an attacker can do and acknowledges what the method does not protect against.

### Why ciphertext protects confidentiality but not every security property

- **Explains:** `encryption`
- **Explanation type:** mechanism

Encryption transforms plaintext into ciphertext using an algorithm and a key. Without the appropriate decryption key, an intercepted ciphertext should not reveal the original data feasibly. This protects confidentiality while data are stored or transmitted because observing the bytes is no longer enough to understand their meaning. The mechanism depends on protecting keys and using a sound algorithm; weak keys or stolen keys remove the advantage. Encryption alone does not prove that the sender is genuine, prevent deletion or guarantee that decrypted data are accurate. Other controls are needed for identity, integrity and availability. The causal chain is therefore specific: a secret or controlled key makes captured data unreadable to unauthorised parties. Statements such as “encryption makes a system secure” are too broad because the system can still fail through compromised endpoints, poor permissions or unavailable services.

### Why key ownership determines who can perform each cryptographic action

- **Explains:** `keys`
- **Explanation type:** mechanism

A cryptographic algorithm is normally public; secrecy or authority comes from the key. In symmetric encryption, the same secret key encrypts and decrypts, so both parties need a secure way to obtain it. Anyone who gains that key can usually read and create protected messages. In asymmetric cryptography, a public key can be distributed while the related private key remains controlled by its owner. Data encrypted for confidentiality with the public key can be decrypted with the private key, while a digital signature created with the private key can be checked with the public key. The operations are related but have different purposes. A public key is not evidence of identity by itself, because an attacker could publish a replacement key. Certificates and trusted verification connect a public key to the claimed owner.

### Why hashing supports comparison without storing the original value

- **Explains:** `hashing`
- **Explanation type:** mechanism

A hash function maps an input of any practical length to a fixed-size digest. A small change to the input should produce a very different digest, while computing the original input from the digest should be infeasible. A system can therefore store a password hash and later hash the submitted password; matching digests provide evidence that the same password was entered without keeping the plaintext password. Secure password storage also uses a unique salt and a deliberately expensive password-hashing function so attackers cannot efficiently test large lists of guesses. Hashing is not encryption because there is no decryption key and no intended reversal step. It supports integrity or comparison, not confidentiality: anyone who sees an unhashed document can still read it, and a digest alone does not identify who created the document.

### Why a certificate makes a public key more trustworthy

- **Explains:** `certificates`
- **Explanation type:** mechanism

A secure connection needs the server's public key, but receiving a key does not prove who owns it. A digital certificate binds a public key to an identified subject and is signed by a certificate authority. The browser checks the authority's signature, the requested hostname, the validity period and other constraints. If those checks succeed and the authority is trusted, the browser has evidence that the key belongs to the named site rather than an interceptor. The certificate does not guarantee that the website is honest or free of malware; it authenticates the key-to-identity binding under the authority's rules. This mechanism blocks a simple substitution attack because an attacker cannot replace the site's key and also produce a valid authority signature for the same hostname without compromising the trust system.

### Why HTTPS needs both authentication and encrypted transport

- **Explains:** `https`
- **Explanation type:** process

HTTPS uses TLS to establish a protected channel before ordinary HTTP data are exchanged. The server presents a certificate, the client validates the server identity and the two sides establish session keys. Symmetric encryption is then normally used for the data because it is efficient for a long stream, while asymmetric operations support authentication and secure key establishment. Integrity checks allow altered traffic to be detected. These stages explain why HTTPS protects credentials and page contents from simple interception and modification on the network. It does not make every action on the website safe: the authenticated site may still contain insecure application code, collect unnecessary data or be controlled by a legitimate but malicious operator. HTTPS secures the connection to the identified endpoint; it is not a judgement about all content behind that endpoint.

### Why the required security property should choose the method

- **Explains:** `compare`
- **Explanation type:** tradeoff

A good security choice starts with the failure that must be prevented. If an eavesdropper must not understand captured data, encryption addresses confidentiality. If a receiver must detect changed data, a cryptographic hash or message-authentication mechanism addresses integrity. If a browser must know which organisation controls a public key, a certificate supports authentication. Digital signatures combine hashing with private-key operations to provide origin and integrity evidence. Real systems use layers because one threat can remain after another is controlled. Adding more methods without a threat model can waste effort or create false confidence. The exam technique follows the engineering logic: name the asset and threat, state the method's mechanism, then link that mechanism to the required property. Do not select a method because its name sounds more advanced.
<!-- stage10-explanations:end -->
