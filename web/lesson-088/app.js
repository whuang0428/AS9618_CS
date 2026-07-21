const scenarioMap = {
  age: {
    label: "Validation: range check",
    detail: "Age = 216 should be rejected because it is outside the allowed range for a student.",
  },
  emailCopy: {
    label: "Verification: proofreading",
    detail: "The typed email is compared with the source form to check it was copied accurately.",
  },
  rights: {
    label: "Security: access rights",
    detail: "Only authorised users can edit the payment field, reducing unauthorised changes.",
  },
  lost: {
    label: "Backup and recovery",
    detail: "A backup copy allows the database to be restored after storage failure.",
  },
  encrypt: {
    label: "Security: encryption",
    detail: "Encryption makes copied database files unreadable without the correct key.",
  },
};

const examples = {
  validation: {
    title: "Example 1: Validation",
    problem: "The Age field must store a school club member's age.",
    steps: [
      "Choose a validation rule that checks the value before it is stored.",
      "A range check can require Age to be from 11 to 19.",
      "This rejects values such as 216 or -4.",
      "Limitation: Age 16 is valid, but it could still be the wrong age for that student.",
    ],
  },
  verification: {
    title: "Example 2: Verification",
    problem: "A secretary types emergency contact details from a paper form.",
    steps: [
      "The issue is copying accuracy, so use verification.",
      "Proofread the typed data against the form, or use double entry for critical fields.",
      "This reduces transcription errors such as typing 07701 instead of 07710.",
      "Limitation: verification cannot prove the original paper form was correct.",
    ],
  },
  security: {
    title: "Example 3: Security",
    problem: "Only office staff should edit payment status in the database.",
    steps: [
      "Use access rights so users have only the permissions they need.",
      "Require authentication so the system knows who is using the database.",
      "Log changes so inappropriate edits can be investigated.",
      "The exam answer should link the control to preventing unauthorised viewing or editing.",
    ],
  },
  backup: {
    title: "Example 4: Backup",
    problem: "The club database is corrupted after a server failure.",
    steps: [
      "A backup is a separate copy of data.",
      "Backups should be made regularly so recent data can be recovered.",
      "A copy should be kept separately from the main system.",
      "The restore process should be tested; a backup that cannot restore is just a hopeful file.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which term means checking input is sensible before it is accepted?",
    accepted: ["validation"],
    answer: "Validation",
  },
  {
    id: "p2",
    prompt: "Which term means checking entered data matches the source?",
    accepted: ["verification"],
    answer: "Verification",
  },
  {
    id: "p3",
    prompt: "Which validation check would reject Age = 216?",
    accepted: ["range check", "range"],
    answer: "Range check",
  },
  {
    id: "p4",
    prompt: "Which validation check ensures StudentID is not left blank?",
    accepted: ["presence check", "presence"],
    answer: "Presence check",
  },
  {
    id: "p5",
    prompt: "Which validation check ensures PaymentAmount is numeric?",
    accepted: ["type check", "type"],
    answer: "Type check",
  },
  {
    id: "p6",
    prompt: "Which verification method asks for the same data twice and compares it?",
    accepted: ["double entry", "double-entry"],
    answer: "Double entry",
  },
  {
    id: "p7",
    prompt: "Which security control limits what different users can view or edit?",
    accepted: ["access rights", "access controls", "permissions", "user permissions"],
    answer: "Access rights / permissions",
  },
  {
    id: "p8",
    prompt: "Which security control encodes data so it is unreadable without a key?",
    accepted: ["encryption", "encrypt"],
    answer: "Encryption",
  },
  {
    id: "p9",
    prompt: "What allows a database to be restored after data loss?",
    accepted: ["backup", "backups", "backup copy"],
    answer: "Backup",
  },
  {
    id: "p10",
    prompt: "Can validation prove entered data is true? yes or no.",
    accepted: ["no", "n"],
    answer: "No. It only checks whether data follows rules.",
  },
];

const mistakes = [
  {
    wrong: "Validation checks that the data copied from the paper form is definitely accurate.",
    fix: "That describes verification. Validation checks whether input obeys rules such as range, type or presence.",
  },
  {
    wrong: "A range check proves the age entered is the student's real age.",
    fix: "A range check only proves the age is within allowed limits. A plausible value can still be wrong.",
  },
  {
    wrong: "A backup stops unauthorised users from reading the database.",
    fix: "A backup helps recovery after loss or corruption. Security controls such as access rights or encryption restrict access.",
  },
  {
    wrong: "Everyone can share the administrator account because it is faster.",
    fix: "Use individual user accounts and access rights so permissions and accountability are controlled.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A database stores the age of students in a school club. Explain how validation could reduce errors in the Age field.",
    answer: "A range check could be used so Age must be within a sensible range, for example 11 to 19. This would reject values such as 216 before they are stored. Validation reduces invalid input but does not prove the age belongs to the correct student.",
    marking: [
      { mark: "B1", text: "names a suitable validation check, e.g. range check" },
      { mark: "B1", text: "states a sensible allowed range or limit for Age" },
      { mark: "M1", text: "explains invalid values are rejected before storage" },
      { mark: "A1", text: "states limitation: validation does not prove the data is true/accurate" },
    ],
    strict: [
      "Do not award validation check mark for verification methods such as proofreading.",
      "Allow any sensible age range for school students.",
      "Do not accept vague 'checks it is correct' without describing a rule.",
      "FT: limitation mark can be awarded if a valid validation example is given.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Describe two methods of verification that could be used when entering contact details from a paper form.",
    answer: "Proofreading can be used by comparing the entered contact details with the paper form. Double entry can be used by entering the same contact details twice and comparing the two entries.",
    marking: [
      { mark: "B1", text: "identifies proofreading / visual check against source" },
      { mark: "A1", text: "explains comparison with the original paper form" },
      { mark: "B1", text: "identifies double entry" },
      { mark: "A1", text: "explains two entries are compared for a match" },
    ],
    strict: [
      "Do not award marks for validation checks such as range or type check.",
      "Allow equivalent wording such as checking against source document.",
      "Do not require both methods if question only asks for one; here two are required.",
      "FT: explanation mark follows the named verification method.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A school database stores medical details. Explain two security measures that could protect the data.",
    answer: "Access rights can restrict medical details to authorised staff only, reducing unauthorised viewing or editing. Encryption can make stored or transmitted data unreadable without the correct key if files are copied or intercepted.",
    marking: [
      { mark: "B1", text: "names access rights / permissions / user privileges" },
      { mark: "A1", text: "explains restriction to authorised users or required role" },
      { mark: "B1", text: "names encryption or authentication as a security measure" },
      { mark: "A1", text: "explains how the second measure protects confidentiality/access" },
      { mark: "M1", text: "applies answer to sensitive medical details" },
    ],
    strict: [
      "Do not award full credit for generic 'make it secure' without mechanism.",
      "Allow strong passwords or multi-factor authentication if linked to authorised access.",
      "Do not accept backup as a security measure unless linked only to availability/recovery, not confidentiality.",
      "FT: application mark can follow from any two valid security measures.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why a database backup is needed and give two features of a good backup plan.",
    answer: "A backup is needed so data can be restored after loss, corruption or hardware failure. A good backup plan makes backups regularly and stores copies separately from the main system. The restore process should also be tested.",
    marking: [
      { mark: "B1", text: "states backup is a separate copy / used for recovery" },
      { mark: "A1", text: "explains recovery after loss, corruption, deletion or failure" },
      { mark: "B1", text: "gives suitable feature such as regular frequency" },
      { mark: "B1", text: "gives second feature such as off-site storage or restore testing" },
    ],
    strict: [
      "Do not accept backup as preventing the original failure.",
      "Allow cloud or off-site storage if separation from main system is clear.",
      "Do not require the terms full/incremental unless taught in the local course.",
      "FT: feature marks can be awarded even if recovery explanation is weak.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says: 'Validation and verification are the same because both check data.' Explain why this is wrong, using one example of each.",
    answer: "Validation checks whether input follows rules before it is accepted, for example a range check rejecting Age = 216. Verification checks whether entered data matches a source, for example proofreading an email address against a paper form. They are different because validation checks reasonableness or format, while verification checks copying accuracy.",
    marking: [
      { mark: "B1", text: "defines validation as checking input against rules / acceptable form" },
      { mark: "B1", text: "gives valid validation example" },
      { mark: "B1", text: "defines verification as checking against source or repeated entry" },
      { mark: "B1", text: "gives valid verification example" },
      { mark: "M1", text: "explicitly contrasts rule checking with copying/source accuracy" },
      { mark: "A1", text: "answer is applied to database data and avoids saying either method proves truth" },
    ],
    strict: [
      "Do not award contrast mark if both examples are validation checks.",
      "Allow double entry as the verification example.",
      "Do not accept 'verification is more secure' without explanation.",
      "FT: example marks can follow from correct definitions even if terminology order is reversed.",
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
    range: "Correct. A range check is a validation rule that rejects values outside sensible limits.",
    double: "Not first. Double entry verifies copied data; it does not define the allowed age range.",
    password: "No. A password controls access, but it will not reject Age = 216.",
    backup: "No. A backup helps recovery later; it does not prevent this bad input.",
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
  const input = document.querySelector("#scenarioInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = scenarioMap[input.value];
    result.innerHTML = `<strong>${item.label}</strong><br />${item.detail}`;
  });
}

function setupInputChecker() {
  const result = document.querySelector("#checkResult");
  document.querySelector("#checkBtn").addEventListener("click", () => {
    const age = Number(document.querySelector("#ageInput").value);
    const email = document.querySelector("#emailInput").value.trim();
    const memberId = document.querySelector("#memberInput").value.trim();
    const checks = [
      {
        check: "Age range check",
        outcome: Number.isInteger(age) && age >= 11 && age <= 19 ? "Pass" : "Fail",
        reason: "Age must be a whole number from 11 to 19.",
      },
      {
        check: "Email format check",
        outcome: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "Pass" : "Fail",
        reason: "Email should contain suitable @ and domain structure.",
      },
      {
        check: "MemberID presence check",
        outcome: memberId.length > 0 ? "Pass" : "Fail",
        reason: "MemberID must not be blank.",
      },
    ];
    result.innerHTML = renderResultTable(["Check", "Outcome", "Reason"], checks);
  });
}

function renderResultTable(fields, rows) {
  const head = `<div class="table-row table-head">${fields.map((field) => `<div>${field}</div>`).join("")}</div>`;
  const body = rows
    .map((row) => `<div class="table-row">${fields.map((field) => `<div>${row[field.toLowerCase()] ?? row[field]}</div>`).join("")}</div>`)
    .join("");
  return `<div class="mini-result" style="--cols:${fields.length}">${head}${body}</div>`;
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
  renderExample("validation");
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
            <h4>Strict notes</h4>
            <ul>
              ${question.strict.map((note) => `<li>${note}</li>`).join("")}
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
  setupInputChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
