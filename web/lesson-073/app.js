const scenarioMap = {
  fitness: {
    result: "Main issue: over-collection of personal data.",
    risk: "The app's fitness purpose may justify step count or heart-rate data, but microphone and contacts are not clearly necessary. Extra data increases privacy risk if misused, shared or breached.",
    safeguard: "Safeguard: use data minimisation and permission choices. Explain each permission and allow the app to work without unnecessary access.",
  },
  school: {
    result: "Main issue: surveillance scope and transparency.",
    risk: "Monitoring can support safeguarding, but recording all browsing may include personal activity and reduce trust if students are not told what is recorded.",
    safeguard: "Safeguard: make monitoring transparent, limit it to school devices/accounts, restrict access to safeguarding staff and set retention limits.",
  },
  cctv: {
    result: "Main issue: public surveillance and identification.",
    risk: "CCTV analytics may improve safety, but can track people who have done nothing wrong and may cause unfair suspicion if identification is inaccurate.",
    safeguard: "Safeguard: use clear notices, limited retention, access logs, human review and strict purpose limitation.",
  },
  workplace: {
    result: "Main issue: intrusive workplace monitoring.",
    risk: "Keystroke and screenshot tracking may collect sensitive personal information and create pressure, even when workers are doing legitimate tasks.",
    safeguard: "Safeguard: monitor only necessary work metrics, explain the purpose, avoid private content and provide clear review/appeal routes.",
  },
  shop: {
    result: "Main issue: biometric data and possible misidentification.",
    risk: "Facial recognition processes biometric data. False matches may unfairly identify a customer as suspicious.",
    safeguard: "Safeguard: keep watchlists limited, use human confirmation, display clear notices and delete data when no longer needed.",
  },
};

const policyMap = {
  forever: {
    result: "Missing principle: retention limit.",
    reason: "Keeping logs forever increases risk if data is breached or misused. A defined retention period should match the purpose of collection.",
  },
  everyone: {
    result: "Missing principle: access control / least privilege.",
    reason: "Not all staff need full records. Access should be restricted to authorised roles, and downloads should be logged or limited.",
  },
  hidden: {
    result: "Missing principle: transparency and informed consent.",
    reason: "Users should be told that location data is collected, why it is needed and how it will be used or shared.",
  },
  extra: {
    result: "Missing principle: data minimisation.",
    reason: "A single-player fitness challenge does not normally need contacts. Collecting unnecessary data creates avoidable privacy risk.",
  },
};

const examples = {
  fitness: {
    title: "Example 1: Fitness app permissions",
    problem: "A fitness app asks for location, contacts and microphone access.",
    steps: [
      "Data: location may help route tracking, but contacts and microphone may be unnecessary for basic fitness tracking.",
      "Risk: unnecessary permissions increase the amount of personal data exposed if the app is misused or breached.",
      "Stakeholder impact: users may lose privacy or be tracked in ways they did not expect.",
      "Safeguard: explain each permission, collect only necessary data and allow users to opt out of optional features.",
    ],
  },
  school: {
    title: "Example 2: School monitoring",
    problem: "A school records website visits on student devices.",
    steps: [
      "Purpose: monitoring may help safeguarding and prevent misuse of school systems.",
      "Risk: broad monitoring can record personal activity and reduce student trust.",
      "Stakeholder impact: students, parents and school staff need clear rules about what is collected.",
      "Safeguard: publish the policy, limit monitoring to school accounts, restrict log access and delete logs after a defined period.",
    ],
  },
  city: {
    title: "Example 3: Public CCTV analytics",
    problem: "A city uses computer systems to analyse CCTV footage.",
    steps: [
      "Purpose: analytics may support public safety and faster incident response.",
      "Risk: people may be tracked in public without meaningful choice, including people not suspected of wrongdoing.",
      "Stakeholder impact: citizens benefit from safety but may object to continuous surveillance.",
      "Safeguard: use clear notices, limited retention, audit trails and human review before action is taken.",
    ],
  },
  workplace: {
    title: "Example 4: Workplace tracking",
    problem: "An employer records screenshots and keystrokes throughout the day.",
    steps: [
      "Purpose: the employer may want to manage productivity or investigate misuse of systems.",
      "Risk: constant tracking may capture personal messages or create unreasonable pressure.",
      "Stakeholder impact: employees may lose trust and feel watched even during legitimate work.",
      "Safeguard: use proportionate monitoring, explain the policy, avoid private content and allow workers to challenge errors.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term means control over how personal information is collected, used and shared?", accepted: ["privacy"], answer: "Privacy" },
  { id: "p2", prompt: "What type of data can identify a person directly or indirectly?", accepted: ["personal data"], answer: "Personal data" },
  { id: "p3", prompt: "What term describes collecting only the data needed for a stated purpose?", accepted: ["data minimisation", "data minimization", "minimisation", "minimization"], answer: "Data minimisation" },
  { id: "p4", prompt: "What term describes telling users what data is collected and why?", accepted: ["transparency", "transparent"], answer: "Transparency" },
  { id: "p5", prompt: "What term describes using data only for the reason stated?", accepted: ["purpose limitation", "limited purpose"], answer: "Purpose limitation" },
  { id: "p6", prompt: "What should happen when personal data is no longer needed?", accepted: ["delete", "deleted", "deletion", "erase", "erased", "remove", "removed"], answer: "It should be deleted/erased/removed" },
  { id: "p7", prompt: "Name one example of sensitive data.", accepted: ["health", "medical", "biometric", "location", "financial", "religion", "ethnicity"], answer: "Health / biometric / location / financial data" },
  { id: "p8", prompt: "Which safeguard limits who can view personal data?", accepted: ["access control", "access rights", "permissions"], answer: "Access control / access rights" },
  { id: "p9", prompt: "Is secret monitoring usually easy to justify ethically? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one possible harm from surveillance.", accepted: ["privacy", "loss of privacy", "pressure", "stress", "misidentification", "discrimination", "reduced trust", "tracking"], answer: "Loss of privacy / pressure / misidentification / reduced trust" },
];

const mistakes = [
  {
    wrong: "The app can collect the data because the user clicked agree.",
    fix: "Consent should be informed and specific. If the user was not told clearly what is collected and why, the agreement is ethically weak.",
  },
  {
    wrong: "Surveillance is always wrong because privacy is important.",
    fix: "Privacy is important, but surveillance may be justified for safety if it is proportionate, transparent, limited and accountable.",
  },
  {
    wrong: "Data protection means encrypting the database.",
    fix: "Encryption helps security, but data protection also includes minimisation, purpose limitation, access control, retention limits, accuracy and transparency.",
  },
  {
    wrong: "Keeping data forever is useful because it might help later.",
    fix: "Indefinite retention increases risk. Data should be kept only as long as needed for the stated purpose, unless there is a clear justified reason.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A mobile fitness app collects step count, location and contacts. Discuss privacy issues raised by this data collection.",
    answer: "Step count and location may help the app provide fitness tracking or route analysis, so some collection can benefit users. However, contacts may not be necessary for the main purpose and may expose information about people who have not used the app. Location data is sensitive because it can reveal routines and places visited. The app should explain what data is collected and why, collect only necessary data, make optional features separate, and allow users to control or delete data.",
    marking: [
      { mark: "B1", text: "valid data item identified, such as step count/location/contacts" },
      { mark: "B1", text: "purpose or benefit linked to fitness tracking/personalised service" },
      { mark: "B1", text: "privacy concern such as unnecessary contacts/location sensitivity" },
      { mark: "B1", text: "concern explained, such as routines revealed or third-party data exposed" },
      { mark: "B1", text: "safeguard such as transparency/consent/minimisation/user control/deletion" },
      { mark: "B1", text: "safeguard linked to reducing named privacy risk" },
    ],
    strict: [
      "Do not accept 'it is private' without explaining what data or harm.",
      "Do not award minimisation for collecting all requested data without justification.",
      "Allow opt-in/opt-out controls if linked to optional features.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain why data minimisation is important when designing a computer system.",
    answer: "Data minimisation means collecting only data that is necessary for the stated purpose. It reduces privacy risk because less personal data is exposed if there is a breach or misuse. It also makes it easier to justify collection to users because unnecessary information is not requested. For example, a step counter should not require microphone access unless there is a clear feature that needs it.",
    marking: [
      { mark: "B1", text: "data minimisation defined as collecting only necessary data" },
      { mark: "B1", text: "linked to stated purpose" },
      { mark: "B1", text: "reduced risk if data is breached/misused/shared" },
      { mark: "B1", text: "valid example of unnecessary data avoided" },
      { mark: "B1", text: "consequence linked to privacy/trust/ethical justification" },
    ],
    strict: [
      "Do not accept 'collect less data' alone without necessity or purpose.",
      "Do not award example mark for vague 'personal data' without a context.",
      "Allow data minimization spelling.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A school monitors students' use of school devices. Evaluate this decision from a privacy and data protection perspective.",
    answer: "Monitoring may be justified because it can help the school detect cyberbullying, unsafe websites or misuse of school devices. However, students are stakeholders with privacy interests, and broad monitoring may record personal activity or reduce trust if it is secret or continues outside school use. The school should be transparent about what is recorded, limit monitoring to school devices or accounts, restrict log access to authorised safeguarding staff and delete logs after a defined period. The decision is more defensible if monitoring is proportionate to safeguarding rather than blanket surveillance.",
    marking: [
      { mark: "B1", text: "benefit such as safeguarding/preventing misuse/unsafe website detection" },
      { mark: "B1", text: "benefit linked to school device context" },
      { mark: "B1", text: "privacy/trust/over-monitoring concern" },
      { mark: "B1", text: "concern explained using students/personal activity/secret monitoring" },
      { mark: "B1", text: "data protection safeguard such as transparency/access restriction/retention limit/scope limit" },
      { mark: "B1", text: "judges whether school monitoring is proportionate using its stated purpose, student privacy impact and limits on collection/access/retention" },
    ],
    strict: [
      "Do not award evaluation mark for only saying monitoring is good or bad.",
      "Do not accept 'ask permission' without explaining what users are told or agreeing to.",
      "Allow school safety or safeguarding as a benefit if scenario linked.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Describe safeguards that could protect personal data stored by an organisation.",
    answer: "Access control can restrict personal data to staff who need it for their role. Encryption can protect stored or transmitted data by making it unreadable without the key. Retention limits reduce risk by deleting data when it is no longer needed. Audit trails can record who accessed or changed data, supporting investigation and accountability. The organisation should also tell users what data is collected and why.",
    marking: [
      { mark: "B1", text: "access control/permissions described" },
      { mark: "B1", text: "encryption described" },
      { mark: "B1", text: "retention/deletion limit described" },
      { mark: "B1", text: "audit trail/accountability or transparency explained" },
      { mark: "B1", text: "at least one safeguard linked to reducing misuse/unauthorised access/privacy risk" },
    ],
    strict: [
      "Do not award multiple marks for repeated wording of 'keep it secure'.",
      "Do not accept encryption as the only data protection principle if question asks safeguards plural.",
      "Allow authentication if linked to controlling access.",
    ],
  },
  {
    title: "Question 5",
    marks: "8 marks",
    prompt: "A city plans to use computer systems to analyse CCTV footage in public spaces. Evaluate privacy and surveillance issues.",
    answer: "The system may help detect crime, manage emergencies and improve public safety, benefiting citizens, police and local businesses. However, it may also track people who have done nothing wrong, creating a feeling of constant surveillance and reducing privacy in public life. If facial recognition or automated identification is used, false matches could lead to unfair suspicion. The city should be transparent about the purpose, use clear notices, restrict access, keep footage for a defined period, audit use and require human review before action. The system may be justified for specific safety aims, but broad indefinite monitoring without safeguards would not be proportionate.",
    marking: [
      { mark: "B1", text: "benefit such as crime detection/emergency response/public safety" },
      { mark: "B1", text: "benefit linked to stakeholder such as citizens/police/businesses" },
      { mark: "B1", text: "privacy/surveillance concern" },
      { mark: "B1", text: "concern explained, such as tracking innocent people/constant monitoring" },
      { mark: "B1", text: "fairness/false match/misidentification concern if analytics used" },
      { mark: "B1", text: "safeguard such as notices/transparency/access restriction/retention/audit/human review" },
      { mark: "B1", text: "safeguard linked to reducing a named risk" },
      { mark: "B1", text: "judges whether CCTV analysis is proportionate using public-safety purpose, surveillance/fairness risk and operational limits" },
    ],
    strict: [
      "Do not accept 'CCTV is legal' as sufficient ethical evaluation.",
      "Do not award both concern marks for repeated privacy wording only.",
      "Allow answers without facial recognition if they explain CCTV analytics privacy risks.",
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
    microphone: "Correct. Microphone access is not clearly necessary for ordinary fitness tracking, so it raises data minimisation concerns.",
    steps: "No. Step count is directly relevant to fitness tracking; the issue is not all data, but unnecessary data.",
    heart: "No. Heart rate can be sensitive, but it may be relevant to fitness or health features.",
    contacts: "Contacts are suspicious too, but the explanation given is weak. Social convenience does not automatically justify collecting other people's data.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupScanner() {
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#scanResult");
  const risk = document.querySelector("#scanRisk");
  const safeguard = document.querySelector("#scanSafeguard");
  function scan() {
    const item = scenarioMap[scenario.value];
    result.textContent = item.result;
    risk.innerHTML = `<strong>Risk:</strong> ${item.risk}`;
    safeguard.innerHTML = `<strong>Safeguard:</strong> ${item.safeguard}`;
  }
  scenario.addEventListener("change", scan);
  document.querySelector("#scanBtn").addEventListener("click", scan);
  scan();
}

function setupPolicyChecker() {
  const policy = document.querySelector("#policyInput");
  const result = document.querySelector("#policyResult");
  const reason = document.querySelector("#policyReason");
  function check() {
    const item = policyMap[policy.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Why:</strong> ${item.reason}`;
  }
  policy.addEventListener("change", check);
  document.querySelector("#policyBtn").addEventListener("click", check);
  check();
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
  renderExample("fitness");
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
  setupScanner();
  setupPolicyChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
