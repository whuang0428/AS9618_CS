const scenarioMap = {
  readmarks: {
    result: "Main goal: confidentiality.",
    method: "The risk is unauthorised viewing of exam marks. Controls such as access rights and authentication can restrict who can read the data.",
    trap: "Do not say availability; the issue is not whether authorised users can access the system.",
  },
  editmarks: {
    result: "Main goal: integrity.",
    method: "The risk is unauthorised alteration of data. Controls such as access rights, audit trails and validation can reduce or detect incorrect changes.",
    trap: "Do not say confidentiality if the main harm is changed marks rather than viewed marks.",
  },
  serverdown: {
    result: "Main goal: availability.",
    method: "The risk is that authorised users cannot access a service when required. Redundancy, backups or recovery planning can help.",
    trap: "Do not use encryption as the main control for a service outage.",
  },
  fakebank: {
    result: "Main goal: authenticity.",
    method: "The user needs evidence that the website identity or origin is genuine, for example through a digital certificate.",
    trap: "Do not describe only confidentiality; the first issue is verifying identity.",
  },
  backup: {
    result: "Main goal: availability.",
    method: "Backups support recovery after failure, helping data remain accessible to authorised users.",
    trap: "Do not claim backups stop unauthorised reading of the original data.",
  },
  weakpass: {
    result: "Goals affected: confidentiality and authenticity.",
    method: "A weak password may allow an attacker to access private data and impersonate a genuine user.",
    trap: "Do not call the password the threat; it is a vulnerability.",
  },
};

const examples = {
  confidentiality: {
    title: "Example 1: Confidentiality",
    problem: "A school stores students' addresses and exam marks online.",
    steps: [
      "Asset: personal student data and exam records.",
      "Risk: unauthorised users could view private data.",
      "Control: access rights and authentication restrict data to authorised staff.",
      "Goal protected: confidentiality, because unauthorised viewing is prevented or reduced.",
    ],
  },
  integrity: {
    title: "Example 2: Integrity",
    problem: "A teacher accidentally enters a mark of 900 instead of 90.",
    steps: [
      "Asset: accuracy of exam mark records.",
      "Risk: data is incorrect or has been altered incorrectly.",
      "Control: validation range check can reject marks outside 0-100; audit trails can record changes.",
      "Goal protected: integrity, because the data remains accurate and trustworthy.",
    ],
  },
  availability: {
    title: "Example 3: Availability",
    problem: "The learning platform fails before a homework deadline.",
    steps: [
      "Asset: access to the learning platform and submitted work.",
      "Risk: authorised users cannot access the service when needed.",
      "Control: backups, redundancy and disaster recovery can restore service or data.",
      "Goal protected: availability, because legitimate access can continue or be recovered.",
    ],
  },
  authenticity: {
    title: "Example 4: Authenticity",
    problem: "A student receives a link claiming to be the school's payment page.",
    steps: [
      "Asset: trust in the identity of the website and transaction.",
      "Risk: the website may be fake and impersonating the school.",
      "Control: digital certificates and secure authentication help verify identity or origin.",
      "Goal protected: authenticity, because the source is checked as genuine.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which security goal prevents unauthorised viewing of data?", accepted: ["confidentiality"], answer: "Confidentiality" },
  { id: "p2", prompt: "Which security goal protects data from unauthorised or accidental alteration?", accepted: ["integrity"], answer: "Integrity" },
  { id: "p3", prompt: "Which security goal ensures authorised users can access systems when required?", accepted: ["availability"], answer: "Availability" },
  { id: "p4", prompt: "Which security goal verifies identity or origin is genuine?", accepted: ["authenticity", "authentication"], answer: "Authenticity" },
  { id: "p5", prompt: "In the risk chain, what is a weakness that can be exploited?", accepted: ["vulnerability", "weakness"], answer: "Vulnerability" },
  { id: "p6", prompt: "In the risk chain, what is something valuable that needs protection?", accepted: ["asset"], answer: "Asset" },
  { id: "p7", prompt: "Which goal does encryption mainly support when used on a stolen laptop?", accepted: ["confidentiality"], answer: "Confidentiality" },
  { id: "p8", prompt: "Which goal do backups mainly support after disk failure?", accepted: ["availability"], answer: "Availability" },
  { id: "p9", prompt: "Which goal can a hash/checksum help check?", accepted: ["integrity"], answer: "Integrity" },
  { id: "p10", prompt: "Which goal can a digital certificate help support for a website?", accepted: ["authenticity"], answer: "Authenticity" },
];

const mistakes = [
  {
    wrong: "Encryption fixes every security problem.",
    fix: "Encryption mainly protects confidentiality by making data unreadable without the key. It does not by itself restore lost data, stop weak permissions or guarantee availability.",
  },
  {
    wrong: "Backups protect confidentiality because they make another copy.",
    fix: "Backups mainly support availability and recovery. They may increase confidentiality risk if the copy is not protected.",
  },
  {
    wrong: "Integrity means the data is secret.",
    fix: "Integrity means data remains accurate, complete and unaltered except by authorised processes. Confidentiality is about keeping data from unauthorised access.",
  },
  {
    wrong: "Authentication and authenticity are exactly the same word in every answer.",
    fix: "Authentication is a process for verifying identity. Authenticity is the goal that an identity, message or source is genuine.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Define confidentiality, integrity and availability.",
    answer: "Confidentiality means data is only accessible to authorised users and is protected from unauthorised viewing. Integrity means data remains accurate, complete and protected from unauthorised or accidental alteration. Availability means data or services are accessible to authorised users when required. These goals protect different aspects of a system, so the control must match the risk.",
    marking: [
      { mark: "B1", text: "confidentiality linked to authorised access / preventing unauthorised viewing" },
      { mark: "B1", text: "integrity linked to accuracy/completeness/no unauthorised alteration" },
      { mark: "B1", text: "availability linked to authorised users accessing data/services when needed" },
    ],
    strict: [
      "Do not accept 'confidentiality means secure' without access/viewing idea.",
      "Do not accept integrity as secrecy.",
      "Allow accessible/usable when needed for availability.",
      "Award each definition independently.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A school stores exam marks online. Identify two risks and recommend a suitable control for each. Link each control to a security goal.",
    answer: "One risk is that an unauthorised user views exam marks. A suitable control is access rights with strong authentication, so only authorised staff can view the records; this protects confidentiality. Another risk is that marks are changed accidentally or without permission. A suitable control is validation, restricted edit permissions or an audit trail; this protects integrity because it prevents, detects or records incorrect changes.",
    marking: [
      { mark: "B1", text: "valid risk to exam marks such as unauthorised viewing" },
      { mark: "B1", text: "suitable control for first risk such as access rights/authentication/encryption" },
      { mark: "B1", text: "first control linked to confidentiality with reason" },
      { mark: "B1", text: "second distinct valid risk such as unauthorised/incorrect alteration or loss of access" },
      { mark: "B1", text: "suitable control for second risk such as validation/audit trail/backup/restricted permissions" },
      { mark: "B1", text: "second control linked to correct goal such as integrity or availability with reason" },
    ],
    strict: [
      "Do not award both risk marks for repeated wording of the same risk.",
      "Do not accept a control without linking it to the stated risk.",
      "Allow backups for availability if the second risk is data loss or service failure.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why encryption is not a suitable control for every security risk.",
    answer: "Encryption converts plaintext into ciphertext so unauthorised users cannot read the data without the key, so it mainly protects confidentiality. It does not by itself ensure that data is available after a disk failure, so backups or redundancy may be needed. It also does not prove that data has not been changed unless combined with other checks such as hashes or digital signatures. Therefore the control must match the security goal in the scenario.",
    marking: [
      { mark: "B1", text: "encryption described as plaintext to ciphertext / unreadable without key" },
      { mark: "B1", text: "confidentiality identified as main goal protected" },
      { mark: "B1", text: "valid risk not solved by encryption such as availability after failure or weak permissions" },
      { mark: "B1", text: "suitable alternative goal/control or conclusion that control must match risk" },
    ],
    strict: [
      "Do not accept 'encryption is bad' as a limitation.",
      "Do not require technical encryption algorithm detail.",
      "Allow 'does not restore data' for availability limitation.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe authenticity and explain one control that can support it.",
    answer: "Authenticity means that the identity of a user, device, message, website or file origin can be verified as genuine. A digital certificate can support authenticity by helping a browser verify that a website is associated with the claimed organisation. Multi-factor authentication can also support authenticity by requiring more than one form of evidence before accepting a user's identity. This reduces impersonation risk.",
    marking: [
      { mark: "B1", text: "authenticity linked to identity/origin being genuine" },
      { mark: "B1", text: "valid control such as digital certificate/digital signature/MFA/authentication" },
      { mark: "B1", text: "mechanism of control explained, e.g. verifies claimed identity/source or uses multiple factors" },
      { mark: "B1", text: "consequence such as reducing impersonation/spoofing/fake-source risk" },
    ],
    strict: [
      "Do not accept 'authenticity means password' without verification idea.",
      "Do not require both certificate and MFA; one valid control is enough.",
      "Allow authentication process if linked to authenticity goal.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Classify each scenario by the main security goal and justify it: customer records are read by an unauthorised employee; stock values are altered incorrectly; a website is offline during a sale.",
    answer: "Customer records read by an unauthorised employee is a confidentiality issue because private data is accessed by someone who should not view it. Stock values altered incorrectly is an integrity issue because the accuracy and correctness of the data has been damaged. A website offline during a sale is an availability issue because authorised customers or staff cannot access the service when required.",
    marking: [
      { mark: "B1", text: "unauthorised reading classified as confidentiality" },
      { mark: "B1", text: "confidentiality justification linked to unauthorised access/viewing of private data" },
      { mark: "B1", text: "incorrect stock alteration classified as integrity" },
      { mark: "B1", text: "integrity justification linked to accuracy/correctness/unauthorised alteration" },
      { mark: "B1", text: "offline website classified as availability" },
      { mark: "B1", text: "availability justification linked to authorised users unable to access service when needed" },
    ],
    strict: [
      "Do not award justification mark for repeating only the goal name.",
      "Do not classify altered stock as confidentiality unless viewing is the stated harm.",
      "Allow service unavailable for offline website.",
      "Award each scenario independently.",
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
    vulnerability: "Correct. A weak password is a vulnerability that can allow impersonation or unauthorised access.",
    threat: "No. A threat is a possible cause of harm, such as an attacker trying to log in.",
    availability: "No. Weak passwords mainly threaten confidentiality and authenticity; the system may still be online.",
    encryption: "No. Encryption can protect stored/transmitted data, but password policy and authentication controls are also needed.",
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
  renderExample("confidentiality");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <p><strong>${index + 1}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" aria-label="Answer for question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value.includes(normalise(answer)));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct." : "Not quite. Reveal the answer, then improve the wording.";
      mark.className = `mark ${correct ? "correct" : "incorrect"}`;
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
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${item.fix}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>Indicative answer</h4>
        <p>${question.answer}</p>
        <h4>CIE-style mark scheme</h4>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
