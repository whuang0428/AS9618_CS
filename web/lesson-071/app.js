const riskMatches = {
  lostLaptop: {
    best: "encryption",
    result: "Best match: encryption, ideally with strong device login and remote wipe as extra controls.",
    reason: "The main risk is disclosure of sensitive data if the laptop is found or stolen. Encryption makes the stored data unreadable without the key.",
    trap: "Do not choose backups as the main answer here. Backups help recovery, but the privacy breach is caused by unauthorised reading.",
  },
  wrongEmail: {
    best: "verification",
    result: "Best match: verification before sending.",
    reason: "The risk is inaccurate transfer of data to the wrong recipient. Verification checks that the entered email address matches the intended source.",
    trap: "Validation may only check that the email has a valid format. A valid email address can still be the wrong address.",
  },
  sharedAdmin: {
    best: "uniqueAccounts",
    result: "Best match: unique accounts and access rights.",
    reason: "Unique accounts identify who performed actions. Access rights reduce unnecessary privileges for each user.",
    trap: "An audit trail is much weaker if several people share one account, because accountability is lost.",
  },
  deletedMarks: {
    best: "backups",
    result: "Best match: tested backups.",
    reason: "The main risk is data loss. A recent tested backup allows the deleted marks to be restored accurately.",
    trap: "Authentication may reduce unauthorised deletion, but it does not recover data already lost.",
  },
  suspiciousEdit: {
    best: "auditTrail",
    result: "Best match: audit trail.",
    reason: "The problem is investigation and accountability. An audit trail records user ID, timestamp and action so the edit can be traced.",
    trap: "A backup may restore an earlier value, but it does not explain who changed the record.",
  },
  fakeLogin: {
    best: "training2fa",
    result: "Best match: user training plus two-factor authentication.",
    reason: "The risk is phishing and credential misuse. Training helps users recognise fake pages; 2FA reduces the damage if a password is revealed.",
    trap: "Hashing stored passwords does not stop a user typing their real password into a fake website.",
  },
};

const diagnostics = {
  cannotAccess: {
    result: "Risk family: loss of availability.",
    reason: "Suitable route: disaster recovery, backups, redundancy and restore testing. The issue is service access after failure, so the answer should link to reduced downtime.",
  },
  viewPrivate: {
    result: "Risk family: unauthorised access / confidentiality breach.",
    reason: "Suitable route: authentication plus role-based access rights. The answer must say which users should be allowed to view which records.",
  },
  badInput: {
    result: "Risk family: invalid input affecting data integrity.",
    reason: "Suitable route: validation such as range or presence checks. The control rejects values that do not meet acceptable rules.",
  },
  copiedWrong: {
    result: "Risk family: inaccurate data transfer.",
    reason: "Suitable route: verification, for example double entry or visual check against the source. The original value may be valid but copied wrongly.",
  },
  passwordFile: {
    result: "Risk family: credential disclosure.",
    reason: "Suitable route: password hashing with salt, access restriction and incident response. Do not describe hashes as being decrypted.",
  },
};

const examples = {
  hospital: {
    title: "Example 1: Hospital records and role-based access",
    problem: "A hospital stores patient records. Reception staff need contact details, but not full clinical notes.",
    steps: [
      "Risk: unauthorised viewing of sensitive medical data.",
      "Control: authentication plus role-based access rights.",
      "Mechanism: users log in, and their role limits which fields or records they can open.",
      "Consequence: confidentiality and privacy are protected because staff only access data needed for their job.",
    ],
  },
  email: {
    title: "Example 2: Wrong email address",
    problem: "A clerk enters a parent's email address before sending a report.",
    steps: [
      "Risk: personal data may be sent to the wrong recipient.",
      "Control: verification, such as checking against the original form or asking the parent to confirm.",
      "Mechanism: the entered value is compared with the intended source.",
      "Consequence: this reduces inaccurate transfer; validation alone may only check the email format.",
    ],
  },
  password: {
    title: "Example 3: Stolen password file",
    problem: "An attacker copies a server file containing stored password data.",
    steps: [
      "Risk: attacker may use stored credentials to access accounts.",
      "Control: salted password hashing.",
      "Mechanism: the system stores hash values, not plaintext passwords, and a salt reduces lookup-table attacks.",
      "Consequence: stolen data is less useful, though accounts may still need resets after the breach.",
    ],
  },
  outage: {
    title: "Example 4: Service outage after server failure",
    problem: "An online booking system is unavailable after a server failure.",
    steps: [
      "Risk: loss of availability and possible data loss.",
      "Control: disaster recovery plan and tested backups.",
      "Mechanism: staff follow known steps to restore systems and recover recent data.",
      "Consequence: downtime and lost transactions are reduced because recovery is planned, not improvised.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which control checks that a user is who they claim to be?", accepted: ["authentication"], answer: "Authentication" },
  { id: "p2", prompt: "Which control limits what an authenticated user can read, edit or delete?", accepted: ["access rights", "access levels", "permissions", "authorisation", "authorization"], answer: "Access rights / permissions" },
  { id: "p3", prompt: "Which control protects confidentiality by making data unreadable without a key?", accepted: ["encryption"], answer: "Encryption" },
  { id: "p4", prompt: "Which control checks input follows rules such as range or format?", accepted: ["validation"], answer: "Validation" },
  { id: "p5", prompt: "Which control checks data has been copied or entered accurately?", accepted: ["verification"], answer: "Verification" },
  { id: "p6", prompt: "Which control restores data after deletion or corruption?", accepted: ["backup", "backups", "tested backup", "tested backups"], answer: "Backup / tested backups" },
  { id: "p7", prompt: "Which record helps identify who changed a file and when?", accepted: ["audit trail", "audit log", "log"], answer: "Audit trail / audit log" },
  { id: "p8", prompt: "What security property is mainly affected when a service cannot be accessed?", accepted: ["availability"], answer: "Availability" },
  { id: "p9", prompt: "A value can be valid but still copied from the source incorrectly. Which check is needed?", accepted: ["verification"], answer: "Verification" },
  { id: "p10", prompt: "A password hash is one-way. Should an answer say it is decrypted? yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "Use encryption so only authorised users can log in.",
    fix: "Encryption protects confidentiality of data by making it unreadable without a key. Logging in is authentication; deciding what a logged-in user can do is authorisation/access rights.",
  },
  {
    wrong: "Use validation to check the email address is the correct parent's email.",
    fix: "Validation may check that the email address has an acceptable format. Verification is needed to compare the typed email with the intended source or confirm it with the parent.",
  },
  {
    wrong: "An audit trail will bring back deleted data.",
    fix: "An audit trail records who did what and when. A backup is needed to restore deleted data; the audit trail may explain how the deletion happened.",
  },
  {
    wrong: "Hashing encrypts passwords and the system decrypts them during login.",
    fix: "Hashing is one-way. During login, the entered password is hashed and compared with the stored hash. Do not describe hash values as being decrypted.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school stores pupil records online. Explain three controls that could reduce risks to this data.",
    answer: "Authentication can require users to prove their identity before accessing the system, reducing unauthorised access. Access rights can limit each user's permissions so staff only see or edit records needed for their role, protecting confidentiality and integrity. Encryption can protect data if it is intercepted or a device is stolen because the data is unreadable without the key. Tested backups can also restore records after deletion or corruption.",
    marking: [
      { mark: "B1", text: "valid control named, such as authentication/access rights/encryption/backup/audit trail" },
      { mark: "M1", text: "mechanism of first control explained" },
      { mark: "B1", text: "second valid control named" },
      { mark: "M1", text: "mechanism of second control explained" },
      { mark: "B1", text: "third valid control named" },
      { mark: "A1", text: "scenario consequence linked to pupil records/confidentiality/integrity/availability" },
    ],
    strict: [
      "Do not award repeated controls stated in different words as separate B marks.",
      "Do not accept vague 'make it secure' without mechanism.",
      "Allow any relevant Section 6 control if linked to a risk.",
      "FT: award mechanism marks for valid controls even if the final consequence is weak.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A company asks staff to verify customer email addresses before sending invoices. Explain why verification is more suitable than validation for this task.",
    answer: "Validation can check that an email address has an acceptable format, such as containing an @ symbol, but a correctly formatted email may still belong to the wrong customer. Verification compares the entered email address with the source document or confirms it with the customer. This reduces the risk that an invoice is sent to the wrong person, protecting confidentiality and reducing errors.",
    marking: [
      { mark: "B1", text: "validation checks against rules/range/format/type/presence" },
      { mark: "M1", text: "valid formatted value can still be wrong in this scenario" },
      { mark: "B1", text: "verification checks accuracy against source or by confirmation" },
      { mark: "M1", text: "verification linked to correct customer/email recipient" },
      { mark: "A1", text: "consequence such as reduced disclosure/error/confidentiality risk" },
    ],
    strict: [
      "Do not accept 'validation is checking' without saying rules or acceptability.",
      "Do not accept 'verification is better' without comparison.",
      "Allow double entry or visual check as verification if source comparison is clear.",
      "FT: if validation is poorly defined, still award verification and scenario marks where correct.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "An attacker obtains a copy of a stored password file. Describe how hashing and salting help protect users.",
    answer: "A hash is a one-way value calculated from a password, so the system should store the hash rather than the plaintext password. During login, the entered password is hashed and compared with the stored hash. A salt is a random value added before hashing, so identical passwords have different stored hashes and precomputed lookup tables are less useful. This reduces the usefulness of the stolen file, although passwords may still need to be reset.",
    marking: [
      { mark: "B1", text: "hashing is one-way / not reversible" },
      { mark: "M1", text: "stored hash rather than plaintext password" },
      { mark: "M1", text: "entered password is hashed and compared at login" },
      { mark: "B1", text: "salt is additional/random value added before hashing" },
      { mark: "M1", text: "salt makes identical passwords have different hashes or reduces lookup/rainbow table usefulness" },
      { mark: "A1", text: "consequence linked to stolen file being less useful / reduced credential disclosure" },
    ],
    strict: [
      "Do not accept that hashes are decrypted.",
      "Do not award salt mark for simply saying 'extra security' without mechanism.",
      "Allow 'lookup table' or 'rainbow table' wording.",
      "FT: award login comparison mark if one-way idea is implied.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A database shows suspicious edits to customer addresses. Explain how audit trails and access rights could help.",
    answer: "An audit trail records details such as user ID, action performed, timestamp and affected record. This helps identify which account changed the customer addresses and supports investigation or accountability. Access rights can limit who is allowed to edit address fields, so users without a suitable role cannot make those changes. Together they reduce unauthorised changes and help preserve data integrity.",
    marking: [
      { mark: "B1", text: "audit trail records valid item such as user/action/time/record/device/IP" },
      { mark: "M1", text: "audit trail used to identify/investigate/account for suspicious edit" },
      { mark: "B1", text: "access rights/permissions/authorisation named" },
      { mark: "M1", text: "access rights restrict editing to permitted users/roles" },
      { mark: "B1", text: "link to integrity or preventing unauthorised changes" },
      { mark: "A1", text: "combined scenario consequence for customer address data" },
    ],
    strict: [
      "Do not accept audit trail as a backup.",
      "Do not award access-rights mechanism for authentication alone.",
      "Allow audit log as audit trail.",
      "FT: award investigation marks even if the recorded items are not exhaustive.",
    ],
  },
  {
    title: "Question 5",
    marks: "8 marks",
    prompt: "A small business suffers a ransomware attack. Discuss suitable Section 6 controls before, during and after the incident.",
    answer: "Before the incident, staff training can reduce phishing risk and two-factor authentication can limit account misuse if a password is revealed. Access rights can reduce the damage by limiting user permissions. The business should keep isolated or offsite backups so ransomware cannot encrypt every copy, and retain versions so a clean copy can be restored. During the incident, infected systems should be isolated. Afterward, a disaster recovery plan should guide restoration to clean systems, the restored data should be checked, and audit trails can help investigate which accounts or systems were affected.",
    marking: [
      { mark: "B1", text: "training/phishing awareness or 2FA control before incident" },
      { mark: "M1", text: "mechanism linked to reducing credential misuse/phishing impact" },
      { mark: "B1", text: "access rights/least privilege control" },
      { mark: "M1", text: "mechanism linked to limiting ransomware damage/spread" },
      { mark: "B1", text: "isolated/offsite/offline backups or version retention" },
      { mark: "M1", text: "mechanism linked to clean restore because ransomware cannot reach every copy" },
      { mark: "B1", text: "DR action such as isolate systems/restore to clean systems/check restored data" },
      { mark: "A1", text: "audit trail/investigation or overall consequence linked to recovery and reduced disruption" },
    ],
    strict: [
      "Do not accept paying the ransom as a suitable Section 6 control.",
      "Do not award backup isolation mark for a permanently connected drive.",
      "Allow other relevant Section 6 controls if mechanism and ransomware context are clear.",
      "FT: award each phase independently; an answer does not need the words before/during/after if the sequence is clear.",
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
    backup: "Correct. The main risk is data loss after drive failure, so tested backups address recovery.",
    password: "No. Strong passwords may reduce unauthorised access, but they do not restore lost coursework.",
    hashing: "No. Hashing is useful for password storage, not recovering coursework files.",
    ethics: "No. Ethics matters in the next section, but this scenario asks for a Section 6 recovery control.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupMatcher() {
  const scenario = document.querySelector("#scenarioInput");
  const control = document.querySelector("#controlInput");
  const result = document.querySelector("#matchResult");
  const reason = document.querySelector("#matchReason");
  const trap = document.querySelector("#matchTrap");
  function check() {
    const item = riskMatches[scenario.value];
    const isCorrect = control.value === item.best;
    result.textContent = isCorrect ? `Correct. ${item.result}` : `Not the best match. ${item.result}`;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  scenario.addEventListener("change", check);
  control.addEventListener("change", check);
  document.querySelector("#matchBtn").addEventListener("click", check);
  check();
}

function setupDiagnostic() {
  const select = document.querySelector("#diagnosticInput");
  const result = document.querySelector("#diagnosticResult");
  const reason = document.querySelector("#diagnosticReason");
  function diagnose() {
    const item = diagnostics[select.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Control route:</strong> ${item.reason}`;
  }
  select.addEventListener("change", diagnose);
  document.querySelector("#diagnosticBtn").addEventListener("click", diagnose);
  diagnose();
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
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
  renderExample("hospital");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" id="${item.id}" autocomplete="off" placeholder="Type your answer" aria-label="${item.prompt}" />
        <span class="mark" id="${item.id}-mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}-mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer) || value.includes(normalise(answer)));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
      } else if (correct) {
        mark.textContent = "Correct";
        mark.className = "mark correct";
      } else {
        mark.textContent = "Try again";
        mark.className = "mark incorrect";
      }
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Weak answer:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-correction="${index}">Show correction</button>
      <div class="answer-panel" id="correction-${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-correction]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#correction-${button.dataset.correction}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Indicative answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${item.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupMatcher();
  setupDiagnostic();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
