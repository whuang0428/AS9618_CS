const scenarioMap = {
  startup: {
    result: "Likely suitable: open-source software, if the team can manage support and licence compliance.",
    reason: "The startup wants customisation and has skilled developers, so source access and modification rights are valuable.",
    trap: "Do not ignore licence obligations or the cost of maintaining customised code.",
  },
  hospital: {
    result: "Likely suitable: proprietary software with formal support, or supported open source if contracts exist.",
    reason: "A critical system needs reliable updates, accountability and support agreements. The key issue is risk, not brand loyalty.",
    trap: "Do not choose open source only because it may have no licence fee.",
  },
  school: {
    result: "Balanced choice: open source may reduce licence fees, but support and training must be planned.",
    reason: "Limited budget helps open source, but limited technical staff may make official support or hosted proprietary services attractive.",
    trap: "Do not treat download cost as total cost of ownership.",
  },
  research: {
    result: "Likely suitable: open source.",
    reason: "Researchers benefit from inspecting, modifying and reproducing algorithms, which source access supports.",
    trap: "Do not forget attribution or share-alike requirements when publishing modified work.",
  },
  office: {
    result: "Likely suitable: proprietary software if compatibility, familiar interface and training are priorities.",
    reason: "A small business may value standard file compatibility, vendor support and staff familiarity more than source-code control.",
    trap: "Do not assume proprietary software means no risk of lock-in or subscription cost.",
  },
};

const claimMap = {
  free: {
    result: "Improved claim: open source often has no licence fee, but may still have support, training, hosting or maintenance costs.",
    reason: "Exam answers should separate licence cost from total cost of ownership.",
  },
  secure: {
    result: "Improved claim: open source can be reviewed publicly, but security still depends on code quality, updates and responsible maintenance.",
    reason: "Visible code does not automatically mean vulnerabilities are found or fixed quickly.",
  },
  support: {
    result: "Improved claim: proprietary software may include official support, but support quality varies and open-source projects may also offer community or paid support.",
    reason: "A scenario should identify what type of support the user needs.",
  },
  own: {
    result: "Improved claim: buying proprietary software usually gives a licence to use it, not ownership of the source code.",
    reason: "Ownership and permission to use are different legal ideas.",
  },
};

const examples = {
  startup: {
    title: "Example 1: Startup customising server software",
    problem: "A startup has skilled developers and needs to adapt server software for a new product.",
    steps: [
      "Open source may be suitable because source code can be inspected and modified.",
      "Lower licence cost may help the startup's budget.",
      "However, the team must maintain custom changes and comply with licence terms.",
      "A strong recommendation mentions support, security updates and licence obligations, not only cost.",
    ],
  },
  hospital: {
    title: "Example 2: Hospital critical system",
    problem: "A hospital needs software for a critical patient system.",
    steps: [
      "Formal support and accountability are important because downtime may affect patient care.",
      "Proprietary software may offer service-level agreements, tested updates and vendor responsibility.",
      "Open source could still be used if paid support and reliable maintenance are available.",
      "The recommendation should focus on reliability and risk, not an automatic preference.",
    ],
  },
  school: {
    title: "Example 3: School learning platform",
    problem: "A school has limited budget and needs a learning platform.",
    steps: [
      "Open source may reduce licence fees and allow local customisation.",
      "The school may still need hosting, training, technical support and security updates.",
      "Proprietary software may be easier to deploy and support but can cause subscription cost and lock-in.",
      "The best answer compares total cost and available technical expertise.",
    ],
  },
  research: {
    title: "Example 4: Research reproducibility",
    problem: "A research group wants to publish experiments that others can reproduce.",
    steps: [
      "Open source supports inspection of algorithms and reproducibility of results.",
      "Other researchers can modify and test the code.",
      "The group must follow licences for any third-party libraries.",
      "The conclusion should mention transparency and licence compliance together.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What type of software makes source code available under a licence?", accepted: ["open source", "open-source"], answer: "Open source" },
  { id: "p2", prompt: "What type of software usually keeps source code controlled by the owner?", accepted: ["proprietary", "proprietary software", "closed source", "closed-source"], answer: "Proprietary / closed-source software" },
  { id: "p3", prompt: "What term describes dependence on one supplier, format or ecosystem?", accepted: ["vendor lock-in", "lock in", "lock-in", "vendor lockin"], answer: "Vendor lock-in" },
  { id: "p4", prompt: "Name one possible benefit of open-source software.", accepted: ["modify", "modifiable", "customisation", "customization", "inspect", "source code", "low cost", "no licence fee", "community"], answer: "Source access / modification / low licence cost / community review" },
  { id: "p5", prompt: "Name one possible benefit of proprietary software.", accepted: ["support", "vendor support", "official support", "warranty", "compatibility", "training", "service agreement"], answer: "Vendor support / compatibility / warranty / training" },
  { id: "p6", prompt: "Does open source mean no copyright? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p7", prompt: "Does no licence fee mean no total cost? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p8", prompt: "What must users follow when modifying or redistributing open-source software?", accepted: ["licence", "license", "licence terms", "license terms"], answer: "Licence terms" },
  { id: "p9", prompt: "Name one possible risk of proprietary software.", accepted: ["lock-in", "vendor lock-in", "cost", "subscription", "closed source", "less control", "dependency"], answer: "Vendor lock-in / cost / less control / dependency" },
  { id: "p10", prompt: "Name one possible risk of open-source software.", accepted: ["support", "maintenance", "updates", "licence compliance", "license compliance", "compatibility", "skills"], answer: "Support/maintenance burden / update responsibility / licence compliance" },
];

const mistakes = [
  {
    wrong: "Open source is always free.",
    fix: "Open source often has no licence fee, but there can still be costs for support, hosting, training, maintenance and staff expertise.",
  },
  {
    wrong: "Proprietary software is always more secure because professionals made it.",
    fix: "Security depends on design, testing, updates and response to vulnerabilities. Proprietary vendors may provide updates, but closed source also requires trust in the vendor.",
  },
  {
    wrong: "Open source has no owner.",
    fix: "Open-source software is still owned and copyrighted. The licence grants permissions under conditions.",
  },
  {
    wrong: "The best answer is always open source because users can edit it.",
    fix: "Editing code is useful only if the organisation has skills and time to maintain changes. Some scenarios value official support and compatibility more.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school is choosing between open-source and proprietary software for a learning platform. Discuss the trade-offs.",
    answer: "Open-source software may reduce licence costs and allow the school to customise the platform if it has staff with technical skills. However, the school may still need to pay for hosting, support, training and security updates. Proprietary software may provide official support, familiar interfaces and compatibility with existing systems, but it may involve subscription fees and vendor lock-in. The best choice depends on the school's budget, technical expertise and need for reliable support.",
    marking: [
      { mark: "B1", text: "open-source benefit such as low/no licence fee or customisation" },
      { mark: "B1", text: "open-source point linked to school scenario" },
      { mark: "B1", text: "open-source risk/cost such as support/training/maintenance/security updates" },
      { mark: "B1", text: "proprietary benefit such as official support/compatibility/familiarity" },
      { mark: "B1", text: "proprietary drawback such as subscription cost/vendor lock-in/less control" },
      { mark: "B1", text: "recommends open-source or proprietary software using the school's budget, technical skills and support requirements" },
    ],
    strict: [
      "Do not accept 'open source is free' without qualification.",
      "Do not award the recommendation mark unless it uses at least one school constraint and one licence trade-off.",
      "Allow hosted open-source support if the support arrangement is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain why open-source software does not mean there are no ownership or licensing issues.",
    answer: "Open-source software is still protected by copyright and has owners or rights holders. The licence gives users permission to use, modify or redistribute the software under conditions. These conditions may require attribution, keeping licence notices, sharing modified versions under the same terms, or limiting warranty. If a user ignores the licence, they may breach the licence or lose permission to use the software.",
    marking: [
      { mark: "B1", text: "open-source software still has copyright/ownership" },
      { mark: "B1", text: "licence grants permission to use/modify/redistribute" },
      { mark: "B1", text: "condition such as attribution/notices/share-alike/warranty limitation" },
      { mark: "B1", text: "licence breach/loss of permission if conditions ignored" },
    ],
    strict: [
      "Do not accept 'open source means no copyright'.",
      "Do not award condition mark for only saying 'rules'.",
      "Allow license spelling.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A hospital needs software for a critical patient system. Evaluate whether open-source or proprietary software would be more suitable.",
    answer: "Proprietary software may be suitable because the hospital can obtain formal vendor support, tested updates and service agreements, which are important for a critical patient system. However, it may be expensive and may create dependence on one supplier. Open-source software may allow inspection and customisation of code and avoid some licence fees, but the hospital must ensure reliable maintenance, security updates and support. A supported open-source solution could be acceptable, but the key factor is dependable support and risk management.",
    marking: [
      { mark: "B1", text: "proprietary benefit such as formal support/tested updates/service agreement" },
      { mark: "B1", text: "benefit linked to critical hospital/patient system" },
      { mark: "B1", text: "proprietary drawback such as cost/vendor lock-in" },
      { mark: "B1", text: "open-source benefit such as inspection/customisation/lower licence fee" },
      { mark: "B1", text: "open-source risk such as maintenance/support/security update responsibility" },
      { mark: "B1", text: "recommends a licence model using the hospital's reliability, security-update and accountable-support requirements" },
    ],
    strict: [
      "Do not accept 'proprietary is always safer' without support or update mechanism.",
      "Do not reject open source solely because it is open source.",
      "Allow supported open-source as a valid conclusion.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe two advantages and two disadvantages of proprietary software.",
    answer: "One advantage is official vendor support, which can help users resolve problems and receive updates. Another advantage is compatibility with widely used file formats or existing systems. One disadvantage is cost, such as licence fees or subscriptions. Another disadvantage is vendor lock-in, where users become dependent on one supplier or format and have less control over the source code.",
    marking: [
      { mark: "B1", text: "advantage such as vendor support/updates/warranty/training" },
      { mark: "B1", text: "second distinct advantage such as compatibility/familiar interface/integration" },
      { mark: "B1", text: "disadvantage such as licence/subscription cost" },
      { mark: "B1", text: "second distinct disadvantage such as lock-in/closed source/less customisation" },
    ],
    strict: [
      "Do not award two marks for the same advantage repeated.",
      "Do not accept 'better quality' without reason.",
      "Allow security updates as support if explained.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A research group wants other researchers to inspect and reproduce its algorithm. Discuss why open-source software may be suitable and what responsibilities remain.",
    answer: "Open-source software is suitable because it makes source code available, allowing other researchers to inspect the algorithm and reproduce results. It also allows modification and testing by other groups, improving transparency. However, the research group must choose and follow an appropriate licence. If it uses third-party libraries, it must keep required notices, give attribution where needed and comply with redistribution conditions. It also needs to maintain documentation and consider support or security updates if others rely on the software.",
    marking: [
      { mark: "B1", text: "source code availability supports inspection" },
      { mark: "B1", text: "inspection linked to reproducibility/transparency of research" },
      { mark: "B1", text: "modification/testing by others identified" },
      { mark: "B1", text: "licence choice/compliance responsibility" },
      { mark: "B1", text: "specific obligation such as attribution/notices/redistribution/share-alike" },
      { mark: "B1", text: "maintenance/documentation/support/security responsibility linked to users" },
    ],
    strict: [
      "Do not accept 'open source means anyone can do anything'.",
      "Do not award obligation mark for vague 'follow rules' only.",
      "Allow peer review as inspection/transparency if linked to source code.",
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
    depends: "Correct. A good answer weighs support, skills, security updates, compatibility and licence obligations.",
    always: "No. Open source can be excellent, but it is not automatically free of support, maintenance or security responsibilities.",
    never: "No. Proprietary software can be suitable, but not automatically more professional for every scenario.",
    owner: "No. Open source grants permissions under a licence; it does not mean every user owns the original code.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupAdvisor() {
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#adviseResult");
  const reason = document.querySelector("#adviseReason");
  const trap = document.querySelector("#adviseTrap");
  function advise() {
    const item = scenarioMap[scenario.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  scenario.addEventListener("change", advise);
  document.querySelector("#adviseBtn").addEventListener("click", advise);
  advise();
}

function setupClaimChecker() {
  const claim = document.querySelector("#claimInput");
  const result = document.querySelector("#claimResult");
  const reason = document.querySelector("#claimReason");
  function improve() {
    const item = claimMap[claim.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Why:</strong> ${item.reason}`;
  }
  claim.addEventListener("change", improve);
  document.querySelector("#claimBtn").addEventListener("click", improve);
  improve();
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
  renderExample("startup");
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
  setupAdvisor();
  setupClaimChecker();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
