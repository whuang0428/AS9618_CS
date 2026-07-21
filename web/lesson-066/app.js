const scenarioMap = {
  studentOwn: {
    result: "Allow: read own timetable.",
    method: "The student needs this information for normal school work, and read-only access does not let them alter data.",
    trap: "Do not grant wider access to all student records just because the user is authenticated.",
  },
  studentMarks: {
    result: "Deny: no write permission for exam marks.",
    method: "Editing marks is not required for the student role and would threaten data integrity.",
    trap: "Do not confuse viewing a result with being allowed to modify the official record.",
  },
  teacherClass: {
    result: "Allow: write marks for own class only.",
    method: "The teacher role needs write access for assigned classes, but should not have unnecessary access to unrelated classes.",
    trap: "Do not give all teachers global admin access; least privilege still applies.",
  },
  teacherAll: {
    result: "Deny: excessive confidential access.",
    method: "Viewing all medical records is not needed for ordinary teaching and would risk confidentiality.",
    trap: "Do not solve this with encryption alone; permission rules still decide who may view the data.",
  },
  adminTemp: {
    result: "Deny permanent admin; allow time-limited specific rights if justified.",
    method: "Temporary work should receive only the permissions needed for the task and then be removed.",
    trap: "Do not leave temporary privileges active after the job is complete.",
  },
};

const examples = {
  grades: {
    title: "Example 1: Exam marks in a school database",
    problem: "Students can view final published results but cannot change marks.",
    steps: [
      "Students may receive read access to their own published result.",
      "They must not receive write access to marks because that would threaten integrity.",
      "Teachers may write marks only for their own classes.",
      "Audit logs can record who changed a mark and when.",
    ],
  },
  files: {
    title: "Example 2: Shared project files",
    problem: "A project team shares files with managers, editors and viewers.",
    steps: [
      "Viewers receive read permission so they can see the file but not edit it.",
      "Editors receive write permission because changing the file is part of their role.",
      "Only selected managers may delete archived files.",
      "This limits accidental deletion and protects availability.",
    ],
  },
  temporary: {
    title: "Example 3: Temporary technician",
    problem: "A technician needs to install software on ten computers for one afternoon.",
    steps: [
      "Grant the minimum admin rights needed for that task.",
      "Limit the permission by time, device or task where possible.",
      "Remove the permission after the installation is complete.",
      "Leaving admin rights active increases the damage if the account is misused.",
    ],
  },
  leaver: {
    title: "Example 4: Employee leaves the company",
    problem: "A staff member leaves but their account still has access to customer records.",
    steps: [
      "The account should be disabled or removed when the user leaves.",
      "Any shared credentials should be changed or revoked.",
      "This prevents later unauthorised viewing or changing of customer data.",
      "A leaver process supports confidentiality, integrity and accountability.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the term for a permission to perform an action on a resource?", accepted: ["access right", "access rights", "permission"], answer: "Access right / permission" },
  { id: "p2", prompt: "Which permission allows a user to view data but not change it?", accepted: ["read", "read access", "read permission"], answer: "Read permission" },
  { id: "p3", prompt: "Which permission allows a user to change data?", accepted: ["write", "modify", "write access", "write permission", "modify permission"], answer: "Write / modify permission" },
  { id: "p4", prompt: "What principle means users should receive only the permissions needed for their role?", accepted: ["least privilege", "principle of least privilege", "minimum privilege"], answer: "Principle of least privilege" },
  { id: "p5", prompt: "Does successful authentication automatically mean full access? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p6", prompt: "Name one security goal protected by restricting read access.", accepted: ["confidentiality"], answer: "Confidentiality" },
  { id: "p7", prompt: "Name one security goal protected by restricting write access.", accepted: ["integrity"], answer: "Integrity" },
  { id: "p8", prompt: "What is a job-based permission set called?", accepted: ["role", "role based access", "role-based access", "rbac"], answer: "Role / role-based access" },
  { id: "p9", prompt: "What record can show who accessed or changed data?", accepted: ["audit log", "log", "access log", "audit trail"], answer: "Audit log / access log / audit trail" },
  { id: "p10", prompt: "Name one action needed when a user leaves an organisation.", accepted: ["disable account", "remove account", "revoke access", "remove permissions", "delete account", "change password"], answer: "Disable/remove account, revoke permissions or change shared credentials" },
];

const mistakes = [
  {
    wrong: "If a user has logged in, they should be able to access all data.",
    fix: "Logging in authenticates identity. Access rights still limit what the user is authorised to view or change.",
  },
  {
    wrong: "Least privilege means no one should have administrator rights.",
    fix: "Least privilege means users get only the permissions needed for their role. Some administrators need admin rights, but not everyone and not permanently.",
  },
  {
    wrong: "Read and write permissions protect the same thing.",
    fix: "Restricting read access mainly protects confidentiality. Restricting write or delete access mainly protects integrity and availability.",
  },
  {
    wrong: "Temporary permissions can be left active in case they are useful later.",
    fix: "Temporary permissions should be removed when no longer needed; stale privileges increase risk if the account is misused.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Explain the difference between authentication and access rights.",
    answer: "Authentication verifies a user's identity, for example by checking a password or token. Access rights define what that authenticated user is allowed to do, such as read, write or delete a file. A user may log in successfully but still be denied permission to edit exam marks. This separation helps protect data by limiting actions to those required for the user's role.",
    marking: [
      { mark: "B1", text: "authentication verifies identity/claim of user" },
      { mark: "B1", text: "access rights define allowed actions/resources" },
      { mark: "M1", text: "valid permission example such as read/write/delete/execute" },
      { mark: "M1", text: "logged-in user may still be denied an action" },
      { mark: "A1", text: "security consequence linked to limiting role-based actions" },
    ],
    strict: [
      "Do not accept definitions that make authentication and access rights identical.",
      "Do not award permission example for only 'secure'.",
      "Allow authorisation as the process of checking access rights.",
      "FT: award consequence mark if the distinction is clear in a scenario.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A school database stores student records and exam marks. Describe how access rights should be used for students, teachers and administrators.",
    answer: "Students should have read access only to their own permitted information and no write access to exam marks. Teachers should have access to records and marks needed for their own classes, with write access only where entering or updating marks is part of their role. Administrators should manage accounts and system settings but should not automatically have unlimited access to all sensitive data unless required. This applies least privilege and protects confidentiality and integrity.",
    marking: [
      { mark: "B1", text: "students limited to own/read-only relevant information" },
      { mark: "M1", text: "students denied write access to marks or sensitive records" },
      { mark: "B1", text: "teachers given class/role-related access" },
      { mark: "M1", text: "teacher write access limited to relevant marks/data" },
      { mark: "B1", text: "administrator permissions described without assuming unlimited data access" },
      { mark: "A1", text: "least privilege/security goal linked to confidentiality/integrity" },
    ],
    strict: [
      "Do not award full marks for saying 'give each user a password' only.",
      "Do not accept unlimited administrator access without role justification.",
      "Allow groups or roles as a way to manage the access rights.",
      "FT: award each role independently.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain the principle of least privilege and give two benefits.",
    answer: "The principle of least privilege means giving users only the minimum permissions needed to perform their role or task. It reduces confidentiality risk because users cannot view unnecessary sensitive data. It reduces integrity risk because users cannot change data outside their responsibility. It can also reduce damage from compromised accounts because the attacker receives only the permissions of that account.",
    marking: [
      { mark: "B1", text: "least privilege means minimum permissions needed for role/task" },
      { mark: "M1", text: "benefit linked to confidentiality/read restriction" },
      { mark: "M1", text: "benefit linked to integrity/write/change restriction" },
      { mark: "B1", text: "damage from compromised/misused account is limited" },
      { mark: "A1", text: "clear scenario or consequence showing reduced risk" },
    ],
    strict: [
      "Do not accept 'no access for everyone' as least privilege.",
      "Do not award benefits for vague 'more secure' without mechanism.",
      "Allow availability benefit if delete/admin rights are restricted.",
      "FT: award benefit marks independently if definition is incomplete.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A temporary worker needs access to a folder for one week. Describe how the permissions should be managed.",
    answer: "The worker should be given only the permissions needed for the task, such as read or write access to the specific folder rather than wider system access. The permissions should be time-limited or reviewed at the end of the week. They should be removed when the task ends. Audit logs can record access or changes. This reduces the risk of later unauthorised access or accidental changes.",
    marking: [
      { mark: "B1", text: "permissions limited to required task/folder" },
      { mark: "M1", text: "specific access type stated, e.g. read/write rather than admin/all access" },
      { mark: "B1", text: "time-limited or reviewed after one week" },
      { mark: "M1", text: "permissions removed/revoked when no longer needed" },
      { mark: "A1", text: "risk reduction linked to unauthorised access/changes or audit logging" },
    ],
    strict: [
      "Do not accept permanent admin rights without justification.",
      "Do not award removal mark for only 'check it' without revoking/reducing access.",
      "Allow temporary group membership if removal is clear.",
      "FT: award risk mark if stale permission danger is explained.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each permission, state what it allows and one security risk if given too widely: read; write; delete.",
    answer: "Read permission allows a user to view or open data; if given too widely it can break confidentiality by exposing sensitive information. Write permission allows a user to create or change data; if given too widely it can damage integrity through unauthorised or accidental changes. Delete permission allows a user to remove data; if given too widely it can affect availability or integrity because important records may be removed.",
    marking: [
      { mark: "B1", text: "read permission allows viewing/opening data" },
      { mark: "M1", text: "read risk linked to confidentiality/exposure" },
      { mark: "B1", text: "write permission allows creating/changing/modifying data" },
      { mark: "M1", text: "write risk linked to integrity/unauthorised changes" },
      { mark: "B1", text: "delete permission allows removing data" },
      { mark: "A1", text: "delete risk linked to availability/integrity/loss of records" },
    ],
    strict: [
      "Do not award risk marks for repeating only 'it is dangerous'.",
      "Do not confuse read with write; viewing is not changing.",
      "Allow execute/admin only as extra detail, not a substitute for the three requested permissions.",
      "FT: award each permission independently.",
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
    permissions: "Correct. The student is authenticated, but access rights deny write access to exam grades.",
    authentication: "Not enough. Login proves identity; this question asks why the edit action is denied.",
    encryption: "No. Encryption may protect stored or transmitted data, but it is not the permission decision.",
    backup: "No. Backup helps recovery; it does not decide whether a student may edit marks.",
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
  renderExample("grades");
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
        <h4>Strict notes</h4>
        <ul>${item.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
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
setupExamples();
renderPractice();
renderMistakes();
renderExam();
