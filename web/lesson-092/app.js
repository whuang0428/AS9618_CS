const classifierMap = {
  memory: {
    topic: "Operating system: memory management",
    reason: "The OS allocates and manages RAM for programs and may use virtual memory when needed.",
  },
  debug: {
    topic: "Interpreter",
    reason: "An interpreter translates and executes code line by line, which can help testing and debugging.",
  },
  linker: {
    topic: "Linker",
    reason: "A linker combines object files and required library routines into an executable program.",
  },
  malware: {
    topic: "Ransomware",
    reason: "Ransomware encrypts or blocks access to data and demands payment.",
  },
  firewall: {
    topic: "Firewall",
    reason: "A firewall filters network traffic using rules such as IP address, port and protocol.",
  },
};

const riskMap = {
  phishing: {
    control: "User education plus MFA",
    detail: "Training helps users recognise fake emails; MFA reduces damage if a password is disclosed.",
  },
  lost: {
    control: "Regular tested backups",
    detail: "Backups allow data to be restored from a separate copy after hardware failure or corruption.",
  },
  sniffing: {
    control: "Encryption / HTTPS",
    detail: "Data is encoded during transmission so intercepted data cannot be read without the key.",
  },
  privilege: {
    control: "Access rights / least privilege",
    detail: "Users are given only the permissions needed for their role, limiting unauthorised changes.",
  },
  tamper: {
    control: "Hashing / digital signature",
    detail: "A digest or signature can be checked to detect whether a file has been altered.",
  },
};

const examples = {
  os: {
    title: "Example 1: OS role answer",
    problem: "Explain one role of the operating system when several programs are running.",
    steps: [
      "Name the role: process management.",
      "Mechanism: the OS schedules processes and allocates processor time.",
      "Consequence: this allows multitasking while sharing CPU resources.",
      "Scenario link: several programs can appear to run at the same time without one program permanently taking the CPU.",
    ],
  },
  translator: {
    title: "Example 2: Compiler vs interpreter",
    problem: "Compare a compiler and an interpreter.",
    steps: [
      "Compiler translates the whole source program into object code before execution.",
      "Interpreter translates and executes code line by line.",
      "Compiler can produce an executable that runs without translating each time.",
      "Interpreter is useful during development because errors can be found line by line.",
    ],
  },
  security: {
    title: "Example 3: Security control",
    problem: "A company wants to protect data sent over a public network.",
    steps: [
      "Threat: data could be intercepted.",
      "Control: encryption.",
      "Mechanism: data is encoded and can only be read with the correct key.",
      "Limitation: encryption does not authenticate the user by itself.",
    ],
  },
  backup: {
    title: "Example 4: Backup answer",
    problem: "Explain why backup strategy matters after a ransomware attack.",
    steps: [
      "Ransomware may encrypt files and prevent access.",
      "A recent backup allows data to be restored without paying the attacker.",
      "Backups should be stored separately so malware cannot encrypt the backup too.",
      "Restore testing checks that the backup can actually be used.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which system software manages hardware resources and provides services for programs?",
    accepted: ["operating system", "os"],
    answer: "Operating system / OS",
  },
  {
    id: "p2",
    prompt: "Which OS role allocates RAM to programs?",
    accepted: ["memory management", "memory"],
    answer: "Memory management",
  },
  {
    id: "p3",
    prompt: "Which OS role schedules processes and allocates CPU time?",
    accepted: ["process management", "processor management", "scheduling"],
    answer: "Process management",
  },
  {
    id: "p4",
    prompt: "Which translator converts assembly language into machine code?",
    accepted: ["assembler"],
    answer: "Assembler",
  },
  {
    id: "p5",
    prompt: "Which translator translates and executes code line by line?",
    accepted: ["interpreter"],
    answer: "Interpreter",
  },
  {
    id: "p6",
    prompt: "Which software combines object files and library routines?",
    accepted: ["linker"],
    answer: "Linker",
  },
  {
    id: "p7",
    prompt: "What does the C in CIA stand for?",
    accepted: ["confidentiality"],
    answer: "Confidentiality",
  },
  {
    id: "p8",
    prompt: "Which control checks a user's identity?",
    accepted: ["authentication", "authenticating"],
    answer: "Authentication",
  },
  {
    id: "p9",
    prompt: "Which control filters network traffic using rules?",
    accepted: ["firewall"],
    answer: "Firewall",
  },
  {
    id: "p10",
    prompt: "Which malware encrypts files and demands payment?",
    accepted: ["ransomware"],
    answer: "Ransomware",
  },
];

const mistakes = [
  {
    wrong: "A compiler runs a program one line at a time.",
    fix: "An interpreter translates and executes line by line. A compiler translates the whole program before execution.",
  },
  {
    wrong: "Encryption proves that the user is allowed to access the system.",
    fix: "Authentication checks user identity and access rights control permissions. Encryption protects data readability.",
  },
  {
    wrong: "A firewall removes all malware from a computer.",
    fix: "A firewall filters network traffic. Anti-malware software detects, quarantines or removes malware on a system.",
  },
  {
    wrong: "Backups prevent all data loss.",
    fix: "Backups allow recovery after loss or corruption. The amount recovered depends on backup frequency and whether restore works.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe two roles of an operating system when several applications are running.",
    answer: "The operating system performs process management by scheduling processes and allocating processor time so applications can share the CPU. It performs memory management by allocating RAM to programs and keeping program data separate so applications can run without overwriting each other.",
    marking: [
      { mark: "B1", text: "names process/processor management or scheduling" },
      { mark: "B1", text: "explains allocating CPU time / managing multitasking" },
      { mark: "B1", text: "names memory management" },
      { mark: "B1", text: "explains allocating/protecting memory for programs" },
    ],
    strict: [
      "Do not award role marks for vague 'runs the computer' without a named role.",
      "Allow file or device management as an alternative named OS role if explained.",
      "Do not count utility software as an OS role unless clearly part of OS service in context.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A developer is choosing a translator during testing. Compare the use of a compiler and an interpreter in this context.",
    answer: "A compiler translates the whole source program into object code before execution, while an interpreter translates and executes one statement at a time. A compiled program can be run without retranslation, while interpreted code normally needs the interpreter each time. Interpreters can help debugging because errors are found as lines are executed.",
    marking: [
      { mark: "B1", text: "compiler translates whole program/source before execution" },
      { mark: "B1", text: "interpreter translates/executes line by line" },
      { mark: "B1", text: "compiled program produces object/executable code" },
      { mark: "B1", text: "interpreted code needs interpreter at run time / useful for debugging" },
    ],
    strict: [
      "Do not accept assembler as either compiler or interpreter.",
      "Allow statement-by-statement for line-by-line.",
      "Do not award comparison mark if no explicit contrast is made.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A school stores student records on a network. Explain two security controls that could protect confidentiality.",
    answer: "Access rights can restrict student records to authorised staff only, reducing unauthorised viewing. Encryption can encode stored or transmitted records so intercepted or stolen data is unreadable without the correct key. Authentication such as MFA could also check user identity before access.",
    marking: [
      { mark: "B1", text: "names access rights / permissions / least privilege" },
      { mark: "B1", text: "links permissions to authorised staff / reducing unauthorised viewing" },
      { mark: "B1", text: "names encryption or authentication/MFA" },
      { mark: "B1", text: "explains mechanism of second control" },
    ],
    strict: [
      "Do not award full credit for generic 'use security'.",
      "Do not treat backup as protecting confidentiality unless the answer clearly discusses availability instead.",
      "Allow strong passwords if linked to authentication.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain how a firewall can help protect a network, and give one limitation.",
    answer: "A firewall monitors incoming and outgoing network traffic and filters it using rules such as IP address, port or protocol. This can block unauthorised or suspicious traffic from reaching the network. A limitation is that it cannot stop a user from giving away a password in a phishing attack or remove malware already installed on a device.",
    marking: [
      { mark: "B1", text: "monitors/filters incoming and outgoing traffic" },
      { mark: "B1", text: "uses rules such as IP address/port/protocol" },
      { mark: "B1", text: "blocks unauthorised/suspicious traffic" },
      { mark: "B1", text: "applies to protecting a network" },
      { mark: "B1", text: "valid limitation such as phishing/user action/malware already installed" },
    ],
    strict: [
      "Do not accept firewall as anti-malware removal software.",
      "Allow packet filtering/application filtering if rule-based filtering is clear.",
      "Do not award limitation for merely saying 'it is not perfect'.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says: 'Hashing and encryption are the same because both hide data.' Explain why this is weak.",
    answer: "Encryption is reversible with the correct key, so encrypted data can be decrypted and read by an authorised user. Hashing is one-way and produces a digest, commonly used to check passwords or file integrity without storing the original value. The statement is weak because encryption protects confidentiality, while hashing is mainly used for verification/integrity and cannot normally be reversed to recover the original data.",
    marking: [
      { mark: "B1", text: "explains encryption is reversible/decryptable with key" },
      { mark: "B1", text: "links encryption to confidentiality/readability protection" },
      { mark: "B1", text: "explains hashing is one-way / produces digest" },
      { mark: "B1", text: "gives valid hashing use such as password checking or file integrity" },
      { mark: "B1", text: "explicitly contrasts reversible encryption with one-way hashing" },
      { mark: "B1", text: "explains why the original statement is vague/incorrect" },
    ],
    strict: [
      "Do not accept hashing as encryption.",
      "Allow message digest/checksum wording if one-way/integrity is clear.",
      "Do not require a specific hashing algorithm.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    os: "Topic: OS memory management. First phrase: allocates and manages memory for running programs.",
    compiler: "Topic: compiler. First phrase: translates the whole source program before execution.",
    phishing: "Topic: social engineering / phishing. First phrase: tricks user into revealing credentials.",
    hash: "Topic: hashing. First phrase: one-way digest used for password checking or integrity.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.topic}</strong><br />${item.reason}`;
  });
}

function setupMatcher() {
  const input = document.querySelector("#riskInput");
  const result = document.querySelector("#matchResult");
  document.querySelector("#matchBtn").addEventListener("click", () => {
    const item = riskMap[input.value];
    result.innerHTML = `<div class="calc-card"><strong>${item.control}</strong><br />${item.detail}</div>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>
      ${example.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("os");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-item">
          <p><strong>${index + 1}.</strong> ${item.prompt}</p>
          <div class="practice-row">
            <input type="text" id="${item.id}" autocomplete="off" aria-label="Answer for question ${index + 1}" />
            <span class="mark" id="${item.id}Mark">Not checked</span>
          </div>
          <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
          <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
        </article>
      `
    )
    .join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}Mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => normalise(answer) === value);
      mark.textContent = value.length === 0 ? "Not checked" : correct ? "Correct" : "Try again";
      mark.classList.toggle("correct", correct);
      mark.classList.toggle("incorrect", value.length > 0 && !correct);
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
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <p class="wrong"><strong>Weak answer ${index + 1}:</strong> ${item.wrong}</p>
          <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
          <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${question.title}</h3>
            <span>${question.marks}</span>
          </div>
          <p>${question.prompt}</p>
          <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
          <div class="ms-panel" id="ms${index}">
            <p><strong>Indicative answer:</strong> ${question.answer}</p>
            <h4>CIE-style mark scheme</h4>
            <ul>
              ${question.marking.map((mark) => `<li><strong>${mark.mark}:</strong> ${mark.text}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupClassifier();
  setupMatcher();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
