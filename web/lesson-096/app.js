const hookResponses = {
  security: "Structure: three named measures, each with mechanism and scenario consequence. Avoid repeating 'protects data' three times.",
  compare: "Structure: paired contrasts. Each paragraph should mention both technologies and why the difference matters.",
  ethics: "Structure: stakeholder, benefit, concern, safeguard and justified judgement. Balance matters more than volume.",
  database: "Structure: repeated data problem, relational design improvement, keys/relationships and consequence.",
};

const plannerMap = {
  security: {
    plan: "Measure 1 + mechanism + consequence; measure 2 + mechanism + consequence; measure 3 + mechanism + consequence.",
  },
  compare: {
    plan: "Contrast 1, contrast 2, contrast 3. Each contrast must use both items and link to the scenario.",
  },
  evaluate: {
    plan: "Stakeholder + benefit; stakeholder + concern; safeguard/condition; final judgement with proportionality.",
  },
  database: {
    plan: "Problem with flat file; table separation; primary/foreign keys; reduced duplication/inconsistency.",
  },
};

const paragraphFacts = {
  encryption: {
    mechanism: "encodes the data so it cannot be read without the correct key",
    consequence: "reducing the impact if the data is intercepted or stolen",
  },
  cache: {
    mechanism: "stores frequently used data and instructions close to the CPU",
    consequence: "reducing slower RAM accesses when the same data or instructions are reused",
  },
  normalisation: {
    mechanism: "separates repeated data into related tables linked by keys",
    consequence: "reducing duplication and update inconsistencies",
  },
  mfa: {
    mechanism: "requires more than one authentication factor before access is granted",
    consequence: "making a stolen password alone less likely to allow unauthorised access",
  },
};

const checkerMap = {
  secure: {
    missing: "Mechanism and consequence",
    fix: "Encryption encodes data so it is unreadable without the key, protecting confidentiality if data is intercepted.",
  },
  compare: {
    missing: "A paired contrast",
    fix: "A compiler translates the whole program before execution, whereas an interpreter translates and executes one statement at a time.",
  },
  ethics: {
    missing: "Concern, safeguard and judgement",
    fix: "Facial recognition may speed attendance, but biometric data creates privacy risk; it is justified only with consent, limited retention and restricted access.",
  },
  database: {
    missing: "Specific relational mechanism",
    fix: "A relational design stores customer details once in a Customer table and links purchases using CustomerID, reducing duplication and update errors.",
  },
};

const examples = {
  security: {
    title: "Example 1: Explain three security measures",
    problem: "A school stores student records on a network. Explain three measures that can protect the records. [6]",
    steps: [
      "B1: Authentication checks user identity before access.",
      "A1: MFA means a stolen password alone is less likely to allow access to student records.",
      "B1: Access rights restrict which staff can view or edit records.",
      "A1: This reduces unauthorised viewing or accidental changes.",
      "B1/A1: Encryption encodes stored/transmitted records so intercepted data is unreadable without the key.",
    ],
  },
  compare: {
    title: "Example 2: Paired comparison",
    problem: "Compare cloud storage and local storage for a small business. [6]",
    steps: [
      "Cloud storage can be accessed from different locations, whereas local storage is usually tied to local devices/network.",
      "Cloud storage depends on internet access, whereas local storage may still be available when the internet connection fails.",
      "Cloud providers may manage backup and scalability, whereas local storage gives the business more direct control of hardware.",
      "Each point mentions both sides; that is why it compares rather than lists.",
    ],
  },
  ethics: {
    title: "Example 3: Evaluation answer",
    problem: "Evaluate facial recognition for school attendance. [8]",
    steps: [
      "Benefit: attendance can be recorded quickly and may improve safeguarding.",
      "Concern: biometric data is personal and misuse could reduce student privacy.",
      "Fairness: recognition may be less accurate for some groups, causing unfair treatment.",
      "Safeguard: consent, limited retention, secure storage, restricted access and an alternative method.",
      "Judgement: justified only if the safeguarding benefit is proportionate and safeguards are enforced.",
    ],
  },
  database: {
    title: "Example 4: Relational database explanation",
    problem: "A club stores member and booking details in one flat file. Explain benefits of relational design. [6]",
    steps: [
      "Repeated member details cause data duplication.",
      "If an address changes, every repeated copy must be updated or inconsistency occurs.",
      "A Member table can store member details once with MemberID as primary key.",
      "A Booking table can store MemberID as a foreign key, linking each booking to the correct member.",
      "This reduces duplication and makes updates more reliable.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What word describes a conclusion supported by evidence in an evaluate question?", accepted: ["judgement", "judgment"], answer: "Judgement / judgment" },
  { id: "p2", prompt: "What must a compare answer include between two items?", accepted: ["contrast", "paired contrast", "difference", "paired differences"], answer: "Paired contrast / difference" },
  { id: "p3", prompt: "What phrase describes the 'how it works' part of an explanation?", accepted: ["mechanism"], answer: "Mechanism" },
  { id: "p4", prompt: "What term means a person or group affected by a decision?", accepted: ["stakeholder"], answer: "Stakeholder" },
  { id: "p5", prompt: "Which word means a restriction or weakness of a solution?", accepted: ["limitation"], answer: "Limitation" },
  { id: "p6", prompt: "Which key links a record to a primary key in another table?", accepted: ["foreign key", "foreign"], answer: "Foreign key" },
  { id: "p7", prompt: "Which security control encodes data so it is unreadable without a key?", accepted: ["encryption"], answer: "Encryption" },
  { id: "p8", prompt: "Which command word often needs benefit, concern and judgement?", accepted: ["evaluate", "discuss"], answer: "Evaluate / discuss" },
  { id: "p9", prompt: "Which term means applying the answer to the scenario?", accepted: ["context", "application", "scenario link"], answer: "Context / application / scenario link" },
  { id: "p10", prompt: "Which type of mark often rewards method or mechanism?", accepted: ["m", "m mark", "method mark"], answer: "M mark / method mark" },
];

const mistakes = [
  {
    wrong: "Cloud is better because it is easier, faster and more modern.",
    fix: "Name specific differences: remote access, dependence on internet, provider-managed backup, scalability or control of local hardware.",
  },
  {
    wrong: "Facial recognition is good and bad, so it depends.",
    fix: "Say what it depends on: purpose, consent, accuracy, retention, access control and proportionality.",
  },
  {
    wrong: "Encryption, firewall and backup all protect the system because they are secure.",
    fix: "Develop each separately: encryption protects readability, firewall filters traffic, backup enables recovery after loss.",
  },
  {
    wrong: "Relational databases are better because they store data in tables.",
    fix: "Explain the benefit: related tables and keys reduce repeated data, update errors and inconsistency.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school stores student records on a network. Explain three measures that can protect the records.",
    answer: "Authentication such as MFA can check user identity before access, reducing unauthorised logins. Access rights can restrict student records to authorised staff, limiting unauthorised viewing or editing. Encryption can encode stored or transmitted records so intercepted or stolen data is unreadable without the correct key. Backups can also allow records to be restored after data loss or corruption.",
    marking: [
      { mark: "B1", text: "names first valid measure such as authentication/MFA/access rights/encryption/backup/firewall" },
      { mark: "A1", text: "explains mechanism/consequence of first measure in school records context" },
      { mark: "B1", text: "names second valid measure" },
      { mark: "A1", text: "explains mechanism/consequence of second measure" },
      { mark: "B1", text: "names third valid measure" },
      { mark: "A1", text: "explains mechanism/consequence of third measure" },
    ],
    strict: [
      "Do not award explanation marks for repeated generic 'keeps data safe'.",
      "Allow audit trails if linked to tracing unauthorised access/changes.",
      "Do not count the same measure twice.",
      "FT: explanation marks can follow from any valid named measure.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Compare using cloud storage and local storage for a small business.",
    answer: "Cloud storage can be accessed from different locations using the internet, whereas local storage is normally accessed from the business site or local network. Cloud storage depends on an internet connection, whereas local storage may still be available if internet access fails. Cloud providers may manage backup, scaling and hardware maintenance, whereas local storage gives the business more direct control but requires it to manage hardware and backup itself.",
    marking: [
      { mark: "B1", text: "paired contrast about remote access/location" },
      { mark: "A1", text: "applies access difference to small business use" },
      { mark: "B1", text: "paired contrast about internet dependence/availability" },
      { mark: "A1", text: "explains consequence of connection failure or local availability" },
      { mark: "B1", text: "paired contrast about provider management/scalability/control" },
      { mark: "A1", text: "applies management/control difference to business responsibility" },
    ],
    strict: [
      "Do not award comparison marks for separate descriptions with no contrast.",
      "Allow cost/subscription vs hardware purchase as a valid paired contrast.",
      "Do not accept cloud is always safer/faster without conditions.",
      "FT: application marks can follow from any valid paired contrast.",
    ],
  },
  {
    title: "Question 3",
    marks: "8 marks",
    prompt: "A school wants to use facial recognition to record attendance. Evaluate this decision.",
    answer: "Facial recognition may save time and reduce manual attendance work for teachers. It may also help safeguarding by identifying whether students are present. However, facial images are biometric personal data, so students may lose privacy if data is collected without informed consent or retained for too long. The system may also be unfair if it is less accurate for some students. It is justified only if the purpose is clear, data is stored securely, access is restricted, retention is limited and an alternative attendance method is available.",
    marking: [
      { mark: "B1", text: "identifies benefit such as speed/efficiency" },
      { mark: "A1", text: "applies benefit to attendance/teachers/school" },
      { mark: "B1", text: "identifies safeguarding/accuracy benefit or similar second benefit" },
      { mark: "B1", text: "identifies privacy/biometric data/consent concern" },
      { mark: "A1", text: "explains consequence such as misuse, monitoring or retention risk" },
      { mark: "B1", text: "identifies fairness/accuracy concern or similar limitation" },
      { mark: "M1", text: "gives suitable safeguard such as access control, consent, retention limit or alternative method" },
      { mark: "A1", text: "balanced judgement linked to proportionality/conditions" },
    ],
    strict: [
      "Do not award full credit for one-sided efficiency-only answers.",
      "Allow data protection wording without naming a law.",
      "Do not require a specific biometric algorithm.",
      "FT: judgement mark can follow from valid benefit and concern even if one safeguard is brief.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A club stores MemberName, Address, ActivityName and CoachName in one flat file for every booking. Explain how a relational database design could improve this.",
    answer: "Member details can be stored once in a Member table with MemberID as the primary key, reducing repeated names and addresses. Activity details can be stored once in an Activity table with ActivityID as the primary key. A Booking table can store MemberID and ActivityID as foreign keys to link each booking to the correct member and activity. This reduces duplication and reduces inconsistency when an address or coach changes because one record can be updated.",
    marking: [
      { mark: "B1", text: "identifies separate Member table / stores member details once" },
      { mark: "B1", text: "identifies separate Activity/Coach/Booking table as appropriate" },
      { mark: "M1", text: "uses suitable primary key such as MemberID/ActivityID" },
      { mark: "M1", text: "uses foreign key(s) in Booking to link tables" },
      { mark: "A1", text: "explains reduced duplication" },
      { mark: "A1", text: "explains reduced inconsistency/update errors" },
    ],
    strict: [
      "Do not award relationship marks for simply saying 'use more tables'.",
      "Allow alternative sensible table names if relationships are clear.",
      "Do not require full normal forms.",
      "FT: key marks can follow from reasonable entity choices.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain how increasing cache size and using multiple cores may affect processor performance.",
    answer: "A larger cache can store more frequently used data and instructions close to the CPU, reducing slower RAM accesses and improving performance when programs reuse data. Multiple cores allow different tasks or threads to be processed in parallel, which can improve performance for software designed to use more than one core. However, performance may not improve much for a single-threaded program or if the required data is not in cache.",
    marking: [
      { mark: "B1", text: "cache stores frequently used data/instructions" },
      { mark: "A1", text: "larger cache can reduce slower RAM accesses / improve performance when reused" },
      { mark: "B1", text: "multiple cores allow parallel processing / more than one task/thread" },
      { mark: "A1", text: "performance improves when software can use multiple cores" },
      { mark: "M1", text: "valid limitation about single-threaded programs/cache miss/not always faster" },
      { mark: "A1", text: "answer links performance effect to workload/program behaviour" },
    ],
    strict: [
      "Do not accept 'more cores always faster'.",
      "Do not accept cache as the same as RAM.",
      "Allow multitasking explanation if parallel processing is clear.",
      "FT: workload mark can follow from either cache or core limitation.",
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
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = hookResponses[button.dataset.hook];
    });
  });
}

function setupPlanner() {
  const input = document.querySelector("#plannerInput");
  const result = document.querySelector("#planResult");
  document.querySelector("#planBtn").addEventListener("click", () => {
    result.innerHTML = `<strong>Plan:</strong> ${plannerMap[input.value].plan}`;
  });
}

function setupBuilder() {
  const point = document.querySelector("#pointInput");
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    const fact = paragraphFacts[point.value];
    result.innerHTML = `<strong>Built paragraph:</strong> ${point.options[point.selectedIndex].text} because it ${fact.mechanism}, ${fact.consequence} for the ${scenario.value}.`;
  });
}

function setupChecker() {
  const input = document.querySelector("#checkerInput");
  const result = document.querySelector("#checkResult");
  document.querySelector("#checkBtn").addEventListener("click", () => {
    const item = checkerMap[input.value];
    result.innerHTML = `<strong>Missing focus:</strong> ${item.missing}<br /><strong>Repair:</strong> ${item.fix}`;
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
  renderExample("security");
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
  setupPlanner();
  setupBuilder();
  setupChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
