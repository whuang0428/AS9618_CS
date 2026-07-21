const scenarioMap = {
  healthApp: {
    result: "Topic: privacy, data protection and ethical evaluation.",
    reason: "The key issue is personal/sensitive data, purpose, consent, transparency, retention and user control.",
    trap: "Do not answer only with encryption; the question is wider than security.",
  },
  repoCode: {
    result: "Topic: intellectual property, copyright and licensing.",
    reason: "The key issue is whether public code has a licence allowing copying, modification and commercial use.",
    trap: "Do not say public means ownerless or free to reuse.",
  },
  schoolTablets: {
    result: "Topic: environmental and social impacts.",
    reason: "The key issue is balancing paper reduction and learning access against manufacturing, e-waste and digital divide concerns.",
    trap: "Do not write only 'tablets are modern' without consequences.",
  },
  openSource: {
    result: "Topic: open-source/proprietary software trade-offs.",
    reason: "The key issue is source-code access, support, reliability, cost, security updates and licence obligations.",
    trap: "Do not choose open source only because it may have no licence fee.",
  },
  factoryAutomation: {
    result: "Topic: social impact of computing and automation.",
    reason: "The key issue is efficiency and safety balanced against job displacement, retraining and worker impact.",
    trap: "Do not claim automation is simply good or bad without stakeholders.",
  },
};

const builderText = {
  benefit: {
    safety: "improves safety or safeguarding",
    access: "improves access or convenience",
    cost: "reduces cost or increases efficiency",
  },
  concern: {
    privacy: "may reduce privacy or increase surveillance",
    fairness: "may treat some groups unfairly",
    environment: "may increase energy use or e-waste",
  },
  safeguard: {
    transparent: "clear information and consent are provided",
    limits: "use is limited to a clear purpose",
    review: "human review, appeal or support is available",
  },
};

const examples = {
  privacy: {
    title: "Example 1: Monitoring students",
    problem: "Evaluate whether a school should monitor student device use.",
    steps: [
      "Topic: privacy, surveillance and ethics.",
      "Benefit: monitoring may help safeguard students and identify unsafe behaviour.",
      "Concern: students may lose privacy if personal activity is recorded without clear limits.",
      "Judgement: monitoring is more justified if transparent, proportionate, limited to school use and access to logs is restricted.",
    ],
  },
  ip: {
    title: "Example 2: Public repository code",
    problem: "A company uses code from a public repository in a commercial product.",
    steps: [
      "Topic: intellectual property and licensing.",
      "Benefit: reuse may save development time if the licence permits it.",
      "Concern: public access does not remove copyright, and commercial use may breach licence terms.",
      "Judgement: use is acceptable only if the company checks and follows the licence, including attribution or redistribution conditions.",
    ],
  },
  software: {
    title: "Example 3: Hospital software choice",
    problem: "A hospital chooses between open-source and proprietary software.",
    steps: [
      "Topic: open-source/proprietary trade-offs.",
      "Benefit: open source may allow inspection and customisation; proprietary software may provide formal support.",
      "Concern: critical systems need reliable updates, accountability and maintenance.",
      "Judgement: the best option depends on support contracts, risk management and technical expertise, not the label alone.",
    ],
  },
  impact: {
    title: "Example 4: Online public services",
    problem: "A council moves services online only.",
    steps: [
      "Topic: social impact and digital divide.",
      "Benefit: many users can access services at any time without travelling.",
      "Concern: elderly, low-income or disabled users may be excluded without devices, internet, skills or accessibility.",
      "Judgement: online services are better only if assisted access, training and accessible design remain available.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term means a person or group affected by a computing decision?", accepted: ["stakeholder"], answer: "Stakeholder" },
  { id: "p2", prompt: "What term means control over how personal information is collected and used?", accepted: ["privacy"], answer: "Privacy" },
  { id: "p3", prompt: "What legal protection usually covers original software source code?", accepted: ["copyright"], answer: "Copyright" },
  { id: "p4", prompt: "What agreement grants permission to use software under conditions?", accepted: ["licence", "license"], answer: "Licence / license" },
  { id: "p5", prompt: "What type of software makes source code available under a licence?", accepted: ["open source", "open-source"], answer: "Open source" },
  { id: "p6", prompt: "What term describes discarded electronic devices?", accepted: ["e-waste", "ewaste", "electronic waste"], answer: "E-waste / electronic waste" },
  { id: "p7", prompt: "What term describes unequal access to devices, internet or digital skills?", accepted: ["digital divide"], answer: "Digital divide" },
  { id: "p8", prompt: "What word describes a condition or measure that reduces harm?", accepted: ["safeguard", "mitigation", "control"], answer: "Safeguard / mitigation / control" },
  { id: "p9", prompt: "What should an evaluate answer include before a judgement: one side or both sides?", accepted: ["both sides", "benefit and concern", "advantages and disadvantages", "for and against"], answer: "Both sides / benefit and concern" },
  { id: "p10", prompt: "Is 'it is good because it is useful' enough for a Section 7 explanation? yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "This is good because it is efficient.",
    fix: "Efficiency is only one point. Add who benefits, what harm or risk exists, and a condition that would make the decision acceptable.",
  },
  {
    wrong: "It is online, so copyright does not apply.",
    fix: "Online access does not remove copyright. Reuse depends on ownership, permission and licence terms.",
  },
  {
    wrong: "Monitoring is safe because the data is encrypted.",
    fix: "Encryption may protect stored data, but privacy questions also need purpose, consent, transparency, retention and who can access the data.",
  },
  {
    wrong: "Automation is bad because jobs are lost.",
    fix: "Job displacement is a valid concern, but balance it with efficiency or safety benefits and discuss retraining or redeployment.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "8 marks",
    prompt: "Evaluate the use of monitoring software on student devices in a school.",
    answer: "Monitoring may help the school safeguard students, detect cyberbullying, prevent access to unsafe websites and investigate misuse of school devices. However, students are stakeholders with privacy interests, and broad monitoring may record personal activity or reduce trust if students and parents are not told clearly. The school should make monitoring transparent, limit it to school accounts or school time, restrict access to logs and delete data after a defined period. The decision is justified only if the monitoring is proportionate to safeguarding and not blanket surveillance.",
    marking: [
      { mark: "B1", text: "benefit such as safeguarding/preventing unsafe use/cyberbullying detection" },
      { mark: "M1", text: "benefit linked to school/student-device context" },
      { mark: "B1", text: "privacy/trust/consent concern" },
      { mark: "M1", text: "concern explained with students/personal activity/unclear monitoring" },
      { mark: "B1", text: "safeguard such as transparency/scope limit/access restriction/retention limit" },
      { mark: "M1", text: "safeguard linked to reducing named privacy concern" },
      { mark: "B1", text: "stakeholder named, such as students/parents/teachers/school" },
      { mark: "A1", text: "balanced judgement about proportionality/conditions" },
    ],
    strict: [
      "Do not accept only 'it keeps students safe' without privacy balance.",
      "Do not award safeguard mark for vague 'make it secure' without mechanism.",
      "Allow data protection terms such as consent, retention, transparency and access control.",
      "FT: judgement may support or oppose monitoring if balanced and scenario-linked.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A company wants to use code from a public online repository. Discuss issues it should consider.",
    answer: "The company should consider intellectual property and copyright because public code can still be owned by its creator. It should check the licence to see whether commercial use, modification or redistribution is allowed. Some licences may require attribution or sharing modifications under similar terms. If the company ignores the licence, it may infringe copyright, lose permission to use the code or face legal and reputational consequences.",
    marking: [
      { mark: "B1", text: "copyright/IP ownership of code identified" },
      { mark: "M1", text: "public access is not equal to permission" },
      { mark: "B1", text: "licence should be checked" },
      { mark: "M1", text: "licence condition such as commercial use/modification/redistribution/attribution/share-alike" },
      { mark: "B1", text: "infringement/licence breach identified" },
      { mark: "A1", text: "consequence such as legal action/loss of permission/reputational damage" },
    ],
    strict: [
      "Do not accept 'public means free to use'.",
      "Do not award condition mark for only saying 'read the rules'.",
      "Allow license spelling.",
      "FT: award consequence if breach is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Evaluate whether a hospital should use open-source software for a critical system.",
    answer: "Open-source software may allow the hospital to inspect source code, customise features and avoid some licence fees. However, a critical hospital system needs reliable support, security updates and accountability because failure could affect patient care. Proprietary software may provide formal service agreements, but supported open-source software may also be acceptable if maintenance is guaranteed. The choice should depend on risk, support arrangements, technical expertise and licence compliance.",
    marking: [
      { mark: "B1", text: "open-source benefit such as source inspection/customisation/lower licence fee" },
      { mark: "M1", text: "benefit linked to hospital/system context" },
      { mark: "B1", text: "risk/concern such as support/security updates/maintenance/accountability" },
      { mark: "M1", text: "risk linked to critical patient-care consequence" },
      { mark: "B1", text: "comparison with proprietary or supported open-source option" },
      { mark: "A1", text: "balanced judgement based on support/risk/expertise/licence compliance" },
    ],
    strict: [
      "Do not accept 'open source is always free' as a benefit without qualification.",
      "Do not reject open source solely by label.",
      "Allow formal support contract as a valid condition.",
      "FT: judgement can choose either option if trade-offs are explained.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Discuss environmental and social impacts of replacing printed textbooks with tablets in a school.",
    answer: "Tablets may reduce paper use, printing and transport of textbooks, and can provide interactive resources, accessibility features and up-to-date materials. However, manufacturing tablets uses energy and raw materials, and frequent replacement can create e-waste. Socially, tablets may support learning but can disadvantage students without reliable home internet or create distraction. The school should repair and reuse devices, recycle responsibly, provide loan or offline access and train students to use devices effectively.",
    marking: [
      { mark: "B1", text: "environmental benefit such as reduced paper/printing/transport" },
      { mark: "B1", text: "environmental harm such as manufacturing energy/resources/e-waste" },
      { mark: "B1", text: "social/learning benefit such as accessibility/interactive/up-to-date resources" },
      { mark: "M1", text: "social harm such as digital divide/distraction/home internet issue" },
      { mark: "B1", text: "mitigation such as repair/reuse/recycling/loan scheme/offline access/training" },
      { mark: "A1", text: "balanced judgement or condition for positive impact" },
    ],
    strict: [
      "Do not accept 'tablets are better' without trade-off.",
      "Do not award both environmental marks for two paper-saving points only.",
      "Allow e-waste and resource extraction as environmental harms.",
      "FT: mitigation can follow any valid harm.",
    ],
  },
  {
    title: "Question 5",
    marks: "8 marks",
    prompt: "A city uses facial recognition cameras in public spaces. Evaluate ethical, privacy and social issues.",
    answer: "Facial recognition may help identify suspects, deter crime and improve emergency response, benefiting citizens, police and local businesses. However, it processes biometric data and may track people who have done nothing wrong, reducing privacy in public spaces. False matches may lead to unfair suspicion, and some groups may be affected more than others if the system is biased. The city should be transparent, limit the purpose, restrict data access and retention, require human review before action and provide accountability. It may be justified for clear safety aims, but broad or secret surveillance is not proportionate.",
    marking: [
      { mark: "B1", text: "benefit such as public safety/crime detection/emergency response" },
      { mark: "M1", text: "benefit linked to stakeholder such as citizens/police/businesses" },
      { mark: "B1", text: "privacy/surveillance/biometric data concern" },
      { mark: "M1", text: "concern explained, such as tracking innocent people or reducing privacy" },
      { mark: "B1", text: "fairness/false match/bias concern" },
      { mark: "B1", text: "safeguard such as transparency/purpose limit/access restriction/retention/human review" },
      { mark: "M1", text: "safeguard linked to reducing a named concern" },
      { mark: "A1", text: "balanced judgement about proportionality/conditions" },
    ],
    strict: [
      "Do not accept 'cameras are good' or 'cameras are bad' without stakeholder impact.",
      "Do not award privacy and fairness as the same mark unless distinct points are made.",
      "Allow surveillance wording if linked to privacy or tracking.",
      "FT: judgement mark can be awarded if consistent with earlier valid analysis.",
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
    privacy: "Correct. This is about privacy, surveillance, biometric data and ethical evaluation.",
    ip: "No. There is no protected work or licence condition in the scenario.",
    database: "No. Facial recognition might store data, but the question trigger is not relational database design.",
    binary: "No. Nothing here asks about representation or conversion.",
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
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#classifyResult");
  const reason = document.querySelector("#classifyReason");
  const trap = document.querySelector("#classifyTrap");
  function classify() {
    const item = scenarioMap[scenario.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  scenario.addEventListener("change", classify);
  document.querySelector("#classifyBtn").addEventListener("click", classify);
  classify();
}

function setupBuilder() {
  const benefit = document.querySelector("#benefitInput");
  const concern = document.querySelector("#concernInput");
  const safeguard = document.querySelector("#safeguardInput");
  const output = document.querySelector("#buildResult");
  function build() {
    output.textContent = `Although the system ${builderText.benefit[benefit.value]}, it ${builderText.concern[concern.value]}. Therefore, it is more acceptable if ${builderText.safeguard[safeguard.value]} and the decision is proportionate to the scenario.`;
  }
  benefit.addEventListener("change", build);
  concern.addEventListener("change", build);
  safeguard.addEventListener("change", build);
  document.querySelector("#buildBtn").addEventListener("click", build);
  build();
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
  renderExample("privacy");
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
  setupClassifier();
  setupBuilder();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
