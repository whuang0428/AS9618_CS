const scenarioMap = {
  payment: {
    result: "Best fit: encryption.",
    method: "Payment data needs confidentiality while transmitted, so it should be converted into ciphertext that eavesdroppers cannot read.",
    trap: "Do not use hashing if the shop must read the payment details at the other end.",
  },
  password: {
    result: "Best fit: hashing.",
    method: "The stored value should be a digest. During login, the entered password is hashed and compared with the stored hash.",
    trap: "Do not store decryptable passwords if only verification is needed.",
  },
  download: {
    result: "Best fit: hashing.",
    method: "A hash of the downloaded file can be compared with the expected hash to detect whether the file has changed.",
    trap: "A hash does not hide the file contents; it helps detect change.",
  },
  bank: {
    result: "Best fit: digital certificate.",
    method: "The certificate links the bank's identity to its public key and is checked by the browser.",
    trap: "The certificate supports trust and authentication; it is not the same thing as the encrypted payment data.",
  },
  lostLaptop: {
    result: "Best fit: encryption.",
    method: "Local file or disk encryption can keep files unreadable to someone without the key or login credentials.",
    trap: "A digital certificate does not protect local files by itself.",
  },
};

const examples = {
  password: {
    title: "Example 1: Password verification using a hash",
    problem: "A website needs to check passwords without storing the actual passwords.",
    steps: [
      "When the account is created, the password is processed by a hash algorithm.",
      "The resulting digest is stored instead of the plaintext password.",
      "At login, the entered password is hashed again.",
      "If the new hash matches the stored hash, the password is accepted.",
    ],
  },
  payment: {
    title: "Example 2: Encrypting payment data in transit",
    problem: "A customer sends card details to an online shop.",
    steps: [
      "The data must remain confidential while travelling across the network.",
      "Encryption converts the readable card details into ciphertext.",
      "Only the intended recipient with the correct key should be able to recover the plaintext.",
      "This does not remove the need for correct access rights and secure storage.",
    ],
  },
  certificate: {
    title: "Example 3: Browser checks a certificate",
    problem: "A user visits an online banking site over HTTPS.",
    steps: [
      "The site sends a digital certificate to the browser.",
      "The certificate contains the site's public key and identity information.",
      "The browser checks the issuer, expiry date, domain name and trust chain.",
      "If trusted, the public key can be used as part of establishing secure communication.",
    ],
  },
  integrity: {
    title: "Example 4: File integrity using a hash",
    problem: "A software download page publishes a hash for an installer file.",
    steps: [
      "The user calculates the hash of the downloaded file.",
      "The calculated hash is compared with the published hash.",
      "If the hashes match, the file is likely unchanged from the published version.",
      "If they differ, the file may be corrupted or tampered with.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which method converts plaintext into ciphertext?", accepted: ["encryption", "encrypt"], answer: "Encryption" },
  { id: "p2", prompt: "Which method converts ciphertext back into readable plaintext?", accepted: ["decryption", "decrypt"], answer: "Decryption" },
  { id: "p3", prompt: "Which method creates a one-way fixed digest?", accepted: ["hashing", "hash"], answer: "Hashing" },
  { id: "p4", prompt: "Which security goal is mainly protected by encrypting data?", accepted: ["confidentiality"], answer: "Confidentiality" },
  { id: "p5", prompt: "Should stored passwords normally be encrypted or hashed for verification?", accepted: ["hashed", "hashing", "hash"], answer: "Hashed" },
  { id: "p6", prompt: "What document links a website identity to a public key?", accepted: ["digital certificate", "certificate", "ssl certificate", "tls certificate"], answer: "Digital certificate" },
  { id: "p7", prompt: "What trusted organisation issues or signs digital certificates?", accepted: ["certificate authority", "ca", "certification authority"], answer: "Certificate authority" },
  { id: "p8", prompt: "What key must be kept secret by its owner?", accepted: ["private key"], answer: "Private key" },
  { id: "p9", prompt: "Can a hash normally be decrypted to recover the original password? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one certificate problem that can trigger a browser warning.", accepted: ["expired", "wrong domain", "mismatched domain", "untrusted", "revoked", "invalid signature", "not trusted"], answer: "Expired, wrong domain, untrusted issuer, revoked or invalid signature" },
];

const mistakes = [
  {
    wrong: "Passwords should be encrypted so the website can decrypt them during login.",
    fix: "For password verification, store a hash. At login, hash the entered password and compare the digests; the original password should not need to be recovered.",
  },
  {
    wrong: "Hashing protects confidentiality because it hides the file contents.",
    fix: "Hashing is mainly used for comparison or integrity checking. It does not encrypt the file contents for later reading.",
  },
  {
    wrong: "A digital certificate encrypts all the data on a website by itself.",
    fix: "A certificate helps authenticate the website and bind its identity to a public key. Encryption is then used for the secure communication.",
  },
  {
    wrong: "Encryption proves that data has not changed.",
    fix: "Encryption protects confidentiality. Integrity needs a suitable check, such as a hash or other integrity mechanism.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Explain the difference between encryption and hashing.",
    answer: "Encryption converts plaintext into ciphertext using an algorithm and key so that the data is unreadable without the correct key. It is reversible by decryption if the correct key is available. Hashing creates a fixed digest from data and is designed to be one-way. It is used for comparison, such as password verification or checking whether data has changed, not for recovering the original data.",
    marking: [
      { mark: "B1", text: "encryption converts plaintext/readable data into ciphertext/unreadable data" },
      { mark: "B1", text: "encryption uses key/algorithm and can be decrypted with correct key" },
      { mark: "B1", text: "hashing creates a digest/hash value from input data" },
      { mark: "B1", text: "hashing is one-way/not intended to recover original data" },
      { mark: "B1", text: "valid use comparison, e.g. encryption for confidentiality; hashing for password verification/integrity" },
    ],
    strict: [
      "Do not accept 'hashing is encryption' as a distinction.",
      "Do not award hash reversibility; hashes are not normally decrypted.",
      "Allow ciphertext described as scrambled/unreadable form.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Describe how hashing can be used to verify a password without storing the plaintext password.",
    answer: "When a password is first set, a hash algorithm is applied to the password and the resulting hash is stored. At login, the password entered by the user is hashed using the same process. The new hash is compared with the stored hash. If they match, the password is accepted. This avoids storing the plaintext password and reduces the damage if the password file is accessed.",
    marking: [
      { mark: "B1", text: "password is processed by hash algorithm when set/registered" },
      { mark: "B1", text: "hash/digest rather than plaintext password is stored" },
      { mark: "B1", text: "entered password is hashed at login" },
      { mark: "B1", text: "new hash compared with stored hash" },
      { mark: "B1", text: "security benefit linked to not storing plaintext/reduced exposure" },
    ],
    strict: [
      "Do not accept decrypting the stored hash to check the password.",
      "Do not award storage mark for storing the actual password.",
      "Allow digest/checksum wording if one-way comparison is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain the role of a digital certificate when a browser connects to a banking website.",
    answer: "A digital certificate links the website identity to a public key. It contains information such as the domain/owner, public key, issuer and expiry date. The browser checks that the certificate is issued by a trusted certificate authority, matches the domain and is valid. This helps authenticate the website and supports setting up encrypted HTTPS communication.",
    marking: [
      { mark: "B1", text: "certificate links website/domain identity to public key" },
      { mark: "B1", text: "valid certificate content, e.g. public key/domain/owner/issuer/expiry/signature" },
      { mark: "B1", text: "browser checks trusted issuer/certificate authority" },
      { mark: "B1", text: "browser checks validity such as domain match/expiry/signature" },
      { mark: "B1", text: "consequence: authenticates site and/or supports encrypted HTTPS communication" },
    ],
    strict: [
      "Do not accept certificate as simply 'a password for a website'.",
      "Do not say the certificate alone encrypts all data.",
      "Allow CA for certificate authority.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "An online shop stores passwords and sends payment data over the internet. State which security method should be used for each and justify your choices.",
    answer: "Stored passwords should be hashed because the shop only needs to verify an entered password by comparing hashes and should not need to recover the plaintext password. Payment data sent over the internet should be encrypted because the data must remain confidential while in transit and must be recoverable by the intended recipient.",
    marking: [
      { mark: "B1", text: "stored passwords use hashing" },
      { mark: "B1", text: "justification linked to one-way comparison/no plaintext recovery needed" },
      { mark: "B1", text: "payment data in transit uses encryption" },
      { mark: "B1", text: "justification linked to confidentiality and intended recipient can decrypt/read" },
    ],
    strict: [
      "Do not award password mark for encrypting passwords unless hashing is also clearly stated as the storage method.",
      "Do not award payment mark for hashing payment data if the recipient must read the details.",
      "Allow SSL/TLS certificate as digital certificate.",
      "Award each method independently.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A download website publishes a hash value for a software installer. Explain how this helps users detect tampering.",
    answer: "The user can calculate the hash of the downloaded installer and compare it with the published hash value. If the values match, the file is likely unchanged from the published version. If they differ, the file may have been altered, corrupted or tampered with. This works because a change to the file should produce a different hash value.",
    marking: [
      { mark: "B1", text: "user calculates hash of downloaded file" },
      { mark: "B1", text: "calculated hash compared with published/expected hash" },
      { mark: "B1", text: "matching hashes indicate file likely unchanged" },
      { mark: "B1", text: "different hashes indicate changed/corrupted/tampered file" },
      { mark: "B1", text: "reason linked to changed input producing different hash value" },
    ],
    strict: [
      "Do not accept hash as hiding the installer contents.",
      "Do not award comparison mark for only saying 'look at the file size'.",
      "Allow digest/checksum if the comparison idea is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s/]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    hashing: "Correct. A digest is stored and later compared; it is not meant to be reversed.",
    encryption: "No. Encryption is reversible with a key. Password storage normally uses hashing for verification.",
    certificate: "No. A certificate helps prove website identity and public key trust, not store a password digest.",
    backup: "No. Backup is recovery; a hash is for verification/comparison.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = scenarioMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Reasoning:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", simulate);
  document.querySelector("#simulateBtn").addEventListener("click", simulate);
  simulate();
}

function toyDigest(value) {
  let total = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    total ^= value.charCodeAt(index);
    total = Math.imul(total, 16777619) >>> 0;
  }
  return total.toString(16).padStart(8, "0");
}

function setupHashDemo() {
  const input = document.querySelector("#hashInput");
  const result = document.querySelector("#hashResult");
  const advice = document.querySelector("#hashAdvice");
  function update() {
    const digest = toyDigest(input.value);
    result.textContent = `Toy digest: ${digest}`;
    advice.innerHTML = "<strong>Exam point:</strong> a real cryptographic hash is designed for one-way comparison; this classroom digest is only a visual model.";
  }
  input.addEventListener("input", update);
  document.querySelector("#hashBtn").addEventListener("click", update);
  update();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function setupExamples() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("password");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" aria-label="Answer for ${item.id}" data-practice="${item.id}" />
        <span class="mark" id="${item.id}Mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-practice]").forEach((input) => {
    input.addEventListener("input", () => {
      const item = practice.find((entry) => entry.id === input.dataset.practice);
      const mark = document.querySelector(`#${item.id}Mark`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
        return;
      }
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Wrong:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");
  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Model answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupHashDemo();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
