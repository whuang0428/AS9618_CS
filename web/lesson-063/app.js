const scenarioMap = {
  host: {
    result: "Most likely: virus.",
    method: "A virus attaches to a host file or program and spreads when the host is run or shared.",
    trap: "Do not call it a worm if it depends on a host file being opened.",
  },
  network: {
    result: "Most likely: worm.",
    method: "A worm self-replicates and spreads across networks without needing to attach to a host file.",
    trap: "Do not say all self-replicating malware is a virus.",
  },
  disguise: {
    result: "Most likely: Trojan.",
    method: "A Trojan is disguised as legitimate or useful software but performs a malicious action.",
    trap: "Do not require a Trojan to self-replicate.",
  },
  keys: {
    result: "Most likely: spyware / keylogger.",
    method: "Spyware secretly monitors user activity or collects data such as keystrokes and credentials.",
    trap: "Do not describe only availability; the main risk is confidential data or credentials being stolen.",
  },
  locked: {
    result: "Most likely: ransomware.",
    method: "Ransomware encrypts or locks files/systems and demands payment for restoration.",
    trap: "Do not treat payment as a reliable recovery control; backups and prevention are better exam answers.",
  },
  urgent: {
    result: "Most likely: social engineering.",
    method: "The attacker manipulates the person using urgency or authority to obtain information or action.",
    trap: "Do not focus only on technical controls; training and verification procedures matter.",
  },
};

const examples = {
  worm: {
    title: "Example 1: Worm spreading across a school network",
    problem: "Several computers become slow after one unpatched machine connects to the network.",
    steps: [
      "A worm is likely if the malware self-replicates across the network.",
      "It can consume bandwidth and processing resources, affecting availability.",
      "Controls include patching, anti-malware, network monitoring and segmenting the network.",
      "The answer should mention self-replication, not just 'virus'.",
    ],
  },
  trojan: {
    title: "Example 2: Trojan disguised as a useful app",
    problem: "A student installs a free tool that secretly opens remote access.",
    steps: [
      "A Trojan is disguised as legitimate software.",
      "The user may install it because it appears useful.",
      "It may open a backdoor, steal data or install further malware.",
      "Controls include trusted download sources, permissions review, anti-malware and user education.",
    ],
  },
  ransomware: {
    title: "Example 3: Ransomware locking files",
    problem: "A department cannot access shared work because files have been encrypted and a payment is demanded.",
    steps: [
      "This is ransomware because data is locked/encrypted and payment is demanded.",
      "The main security goal affected is availability because authorised users cannot access files.",
      "Offline backups and disaster recovery can restore data without relying on the attacker.",
      "Patching, least privilege and anti-malware can reduce infection risk.",
    ],
  },
  social: {
    title: "Example 4: Social engineering call",
    problem: "A caller claims to be IT support and asks urgently for a staff password.",
    steps: [
      "This is social engineering because the attacker manipulates a person rather than exploiting only code.",
      "Urgency and authority are used to pressure the user.",
      "The risk is credential theft, threatening confidentiality and authenticity.",
      "Controls include training, identity verification procedures, MFA and a clear reporting route.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which malware attaches to a host file or program?", accepted: ["virus"], answer: "Virus" },
  { id: "p2", prompt: "Which malware self-replicates across a network without a host file?", accepted: ["worm"], answer: "Worm" },
  { id: "p3", prompt: "Which malware is disguised as legitimate software?", accepted: ["trojan", "trojan horse"], answer: "Trojan / Trojan horse" },
  { id: "p4", prompt: "Which malware secretly monitors activity or records keystrokes?", accepted: ["spyware", "keylogger", "key logger"], answer: "Spyware / keylogger" },
  { id: "p5", prompt: "Which malware encrypts or locks files and demands payment?", accepted: ["ransomware"], answer: "Ransomware" },
  { id: "p6", prompt: "What attack method manipulates people into revealing information or taking unsafe action?", accepted: ["social engineering"], answer: "Social engineering" },
  { id: "p7", prompt: "Which security goal is mainly threatened when spyware steals passwords?", accepted: ["confidentiality", "authenticity"], answer: "Confidentiality; also authenticity if credentials are used to impersonate the user" },
  { id: "p8", prompt: "Name one control against ransomware.", accepted: ["backup", "backups", "offline backups", "patching", "anti malware", "antimalware", "least privilege", "training"], answer: "Offline backups, patching, anti-malware, least privilege or user training" },
  { id: "p9", prompt: "Name one control against social engineering.", accepted: ["training", "verification", "mfa", "multi factor", "reporting", "least privilege"], answer: "User training, verification procedures, MFA, reporting routes or least privilege" },
  { id: "p10", prompt: "Does encryption remove malware from a device? Answer yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "A worm and a virus are the same because both spread.",
    fix: "A virus attaches to a host file/program and often needs it to run. A worm self-replicates across networks without needing a host file.",
  },
  {
    wrong: "A Trojan is malware that spreads by copying itself.",
    fix: "A Trojan is defined by disguise as legitimate software. It may install other malware or open a backdoor, but self-replication is not required.",
  },
  {
    wrong: "Ransomware mainly threatens confidentiality because it encrypts files.",
    fix: "Ransomware mainly threatens availability because authorised users cannot access their files. Confidentiality may also be threatened if data is stolen.",
  },
  {
    wrong: "Social engineering is fixed by antivirus software only.",
    fix: "Anti-malware may help if a file is involved, but social engineering targets human behaviour, so training, verification, MFA and reporting procedures are important.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Compare a virus and a worm.",
    answer: "A virus is malware that attaches to a host file or program and often spreads when that host is run, copied or shared. A worm is malware that self-replicates, often across a network, without needing to attach to a host file. Both can damage data, consume resources or install further malware, but the key difference is the method of propagation.",
    marking: [
      { mark: "B1", text: "virus described as malware attached to host file/program" },
      { mark: "B1", text: "virus spread linked to running/copying/sharing infected host" },
      { mark: "B1", text: "worm described as self-replicating malware" },
      { mark: "B1", text: "worm spread linked to network or no host file required" },
      { mark: "B1", text: "valid shared impact or clear propagation comparison" },
    ],
    strict: [
      "Do not accept 'both are viruses' as comparison.",
      "Do not award worm mark for host-file attachment only.",
      "Allow 'replicates itself' for self-replicating.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain how a Trojan can lead to unauthorised access.",
    answer: "A Trojan is malware disguised as legitimate or useful software. A user may install or run it because they believe it is safe. Once installed, it may open a backdoor, change permissions, download further malware or send credentials to an attacker. This can allow unauthorised access to the device or data.",
    marking: [
      { mark: "B1", text: "Trojan disguised as legitimate/useful software" },
      { mark: "B1", text: "user is tricked into installing/running it" },
      { mark: "B1", text: "valid malicious action such as backdoor/credential theft/further malware" },
      { mark: "B1", text: "consequence linked to unauthorised access to device/data/account" },
    ],
    strict: [
      "Do not require self-replication for Trojan.",
      "Do not accept 'Trojan is a virus' without disguise mechanism.",
      "Allow remote access tool/backdoor if malicious context is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Describe ransomware and recommend two controls to reduce its impact.",
    answer: "Ransomware is malware that encrypts or locks files or systems and demands payment for restoring access. It mainly threatens availability because authorised users cannot access their data. Offline or isolated backups can reduce impact because data can be restored without relying on the attacker. Patching, anti-malware, restricted permissions and user training can reduce the chance of infection or limit what files can be encrypted.",
    marking: [
      { mark: "B1", text: "ransomware encrypts/locks files or systems" },
      { mark: "B1", text: "payment/ransom demanded for access/restoration" },
      { mark: "B1", text: "availability impact described" },
      { mark: "B1", text: "valid control such as offline backups with recovery explanation" },
      { mark: "B1", text: "second valid control with mechanism, e.g. patching/anti-malware/least privilege/training" },
    ],
    strict: [
      "Do not accept paying ransom as a reliable control.",
      "Do not award backup mark without recovery idea.",
      "Allow confidentiality impact only as an additional point, not the main ransomware definition.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain social engineering and give two controls that reduce the risk.",
    answer: "Social engineering is a method of manipulating people into revealing confidential information or performing an unsafe action. It may use trust, urgency, authority, curiosity or fear. Controls include user training so users recognise suspicious requests, verification procedures such as calling a known number before sharing information, multi-factor authentication to reduce damage from stolen passwords, and reporting routes for suspicious contact.",
    marking: [
      { mark: "B1", text: "manipulates/tricks people rather than only exploiting software" },
      { mark: "B1", text: "user reveals information or performs unsafe action" },
      { mark: "B1", text: "valid persuasion method such as urgency/authority/trust/fear/curiosity" },
      { mark: "B1", text: "first valid control with mechanism, e.g. training/verification/MFA/reporting" },
      { mark: "B1", text: "second distinct valid control with mechanism" },
    ],
    strict: [
      "Do not accept only 'hacking people' without manipulation/action idea.",
      "Do not award both control marks for repeated wording of training only.",
      "Allow security awareness training as user training.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Classify each threat and justify it: malicious code records keystrokes; files are locked and a payment is demanded; an urgent caller asks for a password.",
    answer: "Malicious code that records keystrokes is spyware or a keylogger because it secretly monitors user input and can steal credentials. Files locked with a payment demand is ransomware because access is denied until a ransom is demanded, mainly affecting availability. An urgent caller asking for a password is social engineering because the attacker uses pressure or authority to manipulate a person into revealing confidential information.",
    marking: [
      { mark: "B1", text: "keystroke recording classified as spyware/keylogger" },
      { mark: "B1", text: "justification linked to secret monitoring or credential capture" },
      { mark: "B1", text: "locked files/payment demand classified as ransomware" },
      { mark: "B1", text: "justification linked to files locked/encrypted and ransom/payment demand" },
      { mark: "B1", text: "urgent caller/password request classified as social engineering" },
      { mark: "B1", text: "justification linked to manipulating person using urgency/authority to reveal information" },
    ],
    strict: [
      "Do not award justification marks for repeating only the threat name.",
      "Do not classify urgent caller as malware unless software is involved.",
      "Allow keylogger as a type/example of spyware.",
      "Award each classification independently.",
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
    "trojan-spyware": "Correct. The game update disguise suggests a Trojan; recording keystrokes is spyware/keylogger behaviour.",
    worm: "No. A worm self-replicates, often across a network. The clue is disguise plus monitoring.",
    availability: "No. Keystroke recording mainly threatens confidentiality and authenticity.",
    backup: "No. Backups help recovery, but they do not stop credentials being recorded.",
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
  renderExample("worm");
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
