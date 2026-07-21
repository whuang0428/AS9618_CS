const scenarioMap = {
  schoolMonitor: {
    result: "Ethical tension: safeguarding and discipline vs student privacy and trust.",
    benefit: "Benefit: the school may identify bullying, unsafe websites or exam malpractice more quickly, protecting students and the learning environment.",
    concern: "Concern: recording all browsing may be disproportionate if students are not told clearly, if data is kept too long, or if monitoring continues outside school use.",
  },
  facial: {
    result: "Ethical tension: crime prevention vs privacy, consent and possible misidentification.",
    benefit: "Benefit: the shop may deter theft and identify banned individuals, protecting staff and customers.",
    concern: "Concern: customers may not reasonably expect biometric analysis, and false matches could lead to unfair suspicion.",
  },
  aiMarking: {
    result: "Ethical tension: efficiency and consistency vs fairness, transparency and appeal.",
    benefit: "Benefit: automated support may reduce marking time and help detect patterns across many scripts.",
    concern: "Concern: students may be treated unfairly if the system misunderstands unusual but valid answers or if there is no human review.",
  },
  healthApp: {
    result: "Ethical tension: personalised health advice vs sensitive data collection.",
    benefit: "Benefit: the app may give useful warnings or advice by analysing sleep, movement and location patterns.",
    concern: "Concern: health and location data are sensitive; collecting more than necessary or sharing it without clear consent is ethically weak.",
  },
  workTracker: {
    result: "Ethical tension: productivity management vs worker autonomy and pressure.",
    benefit: "Benefit: managers may identify bottlenecks and support workload planning.",
    concern: "Concern: constant tracking may reduce trust, create stress and measure quantity rather than quality of work.",
  },
};

const builderText = {
  benefit: {
    safety: "improves safety and safeguarding",
    efficiency: "saves time and reduces manual workload",
    access: "improves access to a useful service",
  },
  concern: {
    privacy: "may collect more personal data than users expect",
    bias: "may treat some users unfairly if data or rules are biased",
    pressure: "may create pressure or reduce trust",
  },
  safeguard: {
    transparent: "users are told clearly what is collected and why",
    limited: "data collection is limited to what is necessary",
    appeal: "there is a human review or appeal process",
  },
};

const examples = {
  monitoring: {
    title: "Example 1: School monitoring software",
    problem: "Evaluate whether a school should monitor student laptop activity.",
    steps: [
      "For: monitoring can help protect students from unsafe websites, bullying or misuse of school devices.",
      "Against: students have privacy interests, especially if monitoring records personal browsing outside school tasks.",
      "Safeguard: monitoring should be transparent, limited to school devices/accounts and have clear retention rules.",
      "Judgement: it may be justified for safeguarding if it is proportionate and explained clearly, but blanket secret monitoring is ethically weak.",
    ],
  },
  facial: {
    title: "Example 2: Facial recognition in a shop",
    problem: "A shop wants to use facial recognition to identify known shoplifters.",
    steps: [
      "For: it may protect staff, customers and property by reducing theft or threatening behaviour.",
      "Against: customers may not consent to biometric processing and false matches could cause unfair treatment.",
      "Safeguard: clear notices, limited watchlists, human confirmation and data minimisation reduce ethical risk.",
      "Judgement: the system is more defensible if narrowly targeted and checked by humans, not used for general customer profiling.",
    ],
  },
  automation: {
    title: "Example 3: Automated decision support",
    problem: "An organisation uses an algorithm to rank applicants for interviews.",
    steps: [
      "For: automation can process applications consistently and reduce workload.",
      "Against: biased training data or poorly chosen criteria may unfairly exclude suitable applicants.",
      "Safeguard: the organisation should audit outcomes, explain criteria and allow human review.",
      "Judgement: decision support may be acceptable, but fully automatic rejection without transparency or appeal is hard to justify.",
    ],
  },
  data: {
    title: "Example 4: Health app data collection",
    problem: "A health app collects location, sleep and activity data.",
    steps: [
      "For: detailed data can produce useful advice and detect health patterns.",
      "Against: location and health data are sensitive and may reveal private habits.",
      "Safeguard: collect only necessary data, ask for informed consent and state how long data is kept.",
      "Judgement: collection is more ethical when users understand the purpose and can control or delete their data.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What word means a person or group affected by a computing decision?", accepted: ["stakeholder"], answer: "Stakeholder" },
  { id: "p2", prompt: "What term describes principles about right and wrong behaviour?", accepted: ["ethics"], answer: "Ethics" },
  { id: "p3", prompt: "What word means that a response should not be more intrusive than needed?", accepted: ["proportionality", "proportionate"], answer: "Proportionality / proportionate" },
  { id: "p4", prompt: "Name one stakeholder in a school monitoring scenario.", accepted: ["student", "students", "teacher", "teachers", "parents", "school", "staff"], answer: "Students / teachers / parents / school staff" },
  { id: "p5", prompt: "Should an ethics answer include only one side? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p6", prompt: "What word describes telling users clearly what data is collected and why?", accepted: ["transparency", "transparent"], answer: "Transparency" },
  { id: "p7", prompt: "Name one safeguard for an automated decision system.", accepted: ["human review", "appeal", "audit", "testing", "transparency", "explanation"], answer: "Human review / appeal / audit / transparency" },
  { id: "p8", prompt: "What type of answer should finish with a reasoned conclusion?", accepted: ["evaluation", "evaluate", "balanced evaluation"], answer: "Evaluation / balanced evaluation" },
  { id: "p9", prompt: "Is 'because I dislike it' enough for a Cambridge-style ethics mark? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one possible ethical concern about collecting location data.", accepted: ["privacy", "surveillance", "tracking", "consent", "misuse", "data sharing"], answer: "Privacy / surveillance / tracking / consent / misuse" },
];

const mistakes = [
  {
    wrong: "The system is ethical because it is legal.",
    fix: "Legal compliance may help, but ethics also considers fairness, harm, consent, transparency and proportionality. A legal action can still raise ethical concerns.",
  },
  {
    wrong: "It is wrong because privacy is always more important than safety.",
    fix: "A balanced answer weighs privacy against safety. The judgement should depend on purpose, proportionality, transparency, data limits and safeguards.",
  },
  {
    wrong: "The company benefits, so the system should be used.",
    fix: "Ethics requires more than organisational benefit. Consider users, workers, customers and wider society, including possible harms or unfair treatment.",
  },
  {
    wrong: "AI decisions are fair because computers do not have feelings.",
    fix: "Automated systems can still be unfair if their data, rules or design reflect bias. Human review, audit and appeal processes may be needed.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school wants to monitor activity on student laptops. Discuss ethical issues raised by this decision.",
    answer: "Monitoring may help the school protect students from unsafe websites, cyberbullying or misuse of school devices, so it can support safeguarding and responsible use. However, students are stakeholders with privacy interests, and recording all activity may be intrusive if it includes personal browsing or happens without clear notice. Parents and teachers may also be affected because they expect safety and trust. The decision is more justified if monitoring is transparent, limited to school accounts or school time, and data is retained only for a clear purpose.",
    marking: [
      { mark: "B1", text: "valid stakeholder identified, such as students/school/parents/teachers" },
      { mark: "B1", text: "benefit explained, such as safeguarding/security/preventing misuse" },
      { mark: "B1", text: "privacy/trust/consent concern identified" },
      { mark: "B1", text: "concern explained in scenario, such as intrusive monitoring or unclear collection" },
      { mark: "B1", text: "safeguard/condition such as transparency/limited monitoring/retention rules" },
      { mark: "B1", text: "judges whether laptop monitoring is proportionate by weighing safeguarding benefit against student privacy/trust and the stated safeguards" },
    ],
    strict: [
      "Do not accept a one-word answer such as 'privacy' without explanation.",
      "Do not award both sides for two benefits only; there must be a concern or counterargument.",
      "Allow safety, safeguarding or preventing cyberbullying as benefits if linked to monitoring.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain why stakeholders should be considered when introducing a new computer system.",
    answer: "Stakeholders are people or groups affected by the system. Considering them helps identify benefits and harms for different groups, such as users, employees, customers or the organisation. It can reveal privacy, fairness, accessibility or workload concerns that designers might miss. This supports more responsible decisions because safeguards can be added before harm occurs.",
    marking: [
      { mark: "B1", text: "stakeholder defined as person/group affected by decision/system" },
      { mark: "B1", text: "example stakeholder given" },
      { mark: "B1", text: "benefits and harms may differ between stakeholders" },
      { mark: "B1", text: "ethical issue identified such as privacy/fairness/accessibility/workload" },
      { mark: "B1", text: "consequence linked to responsible design/safeguards/reduced harm" },
    ],
    strict: [
      "Do not accept 'people who use it' as the only definition if wider affected groups are ignored in a broad question.",
      "Do not award issue mark for vague 'problems' without naming a concern.",
      "Allow indirect stakeholders such as parents, society or regulators.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A company uses an algorithm to shortlist job applicants. Evaluate this decision.",
    answer: "The algorithm may make shortlisting faster and more consistent, reducing workload for staff and giving applicants quicker responses. However, applicants may be treated unfairly if the algorithm uses biased data or unsuitable criteria. The company also has a responsibility to make decisions transparent enough that unfair exclusion can be challenged. The system may be acceptable as decision support if outcomes are audited and human review or appeal is available, but fully automatic rejection without explanation is ethically weak.",
    marking: [
      { mark: "B1", text: "benefit such as speed/consistency/reduced workload" },
      { mark: "B1", text: "benefit linked to company/staff/applicants" },
      { mark: "B1", text: "fairness/bias/transparency concern" },
      { mark: "B1", text: "concern explained using applicant/job context" },
      { mark: "B1", text: "safeguard such as audit/human review/appeal/explanation" },
      { mark: "B1", text: "judges whether algorithmic shortlisting is acceptable using efficiency/consistency evidence and bias/transparency safeguards" },
    ],
    strict: [
      "Do not accept 'AI is unbiased' as a valid point without evidence.",
      "Do not award evaluation mark for only listing advantages.",
      "Allow consistency as a benefit if linked to same criteria being applied.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A health app collects location and activity data to give personalised advice. Describe ethical issues and possible safeguards.",
    answer: "The app may benefit users by giving more accurate health advice from activity and location patterns. However, health and location data are sensitive because they can reveal private routines, habits or places visited. Users should give informed consent and be told clearly what data is collected, why it is needed and who it may be shared with. Data collection should be limited to what is necessary and users should be able to delete or control their data.",
    marking: [
      { mark: "B1", text: "benefit of personalised/accurate health advice" },
      { mark: "B1", text: "sensitive/private nature of health or location data identified" },
      { mark: "B1", text: "harm explained, such as revealing routines/misuse/sharing without expectation" },
      { mark: "B1", text: "safeguard such as informed consent/transparency/data minimisation/user control" },
      { mark: "B1", text: "safeguard linked to reducing ethical concern" },
    ],
    strict: [
      "Do not accept 'collect less data' unless linked to necessity or privacy.",
      "Do not award consent mark for vague 'ask users' without what they are agreeing to.",
      "Allow data retention limits or deletion rights as safeguards.",
    ],
  },
  {
    title: "Question 5",
    marks: "8 marks",
    prompt: "A city plans to use cameras and computer systems to monitor public spaces. Evaluate the ethical implications.",
    answer: "Monitoring public spaces may improve public safety, help detect crime and support emergency response, benefiting citizens, police and local businesses. However, citizens may feel constantly watched, and the system may collect data about people who have done nothing wrong. There may also be fairness concerns if some groups are monitored more heavily or if automated identification produces false matches. The city should be transparent about the purpose, limit data retention, restrict access, audit use and provide accountability. The system may be justified for clear safety purposes, but broad or secret surveillance without safeguards is not proportionate.",
    marking: [
      { mark: "B1", text: "benefit such as public safety/crime detection/emergency response" },
      { mark: "B1", text: "benefit linked to stakeholder such as citizens/police/businesses" },
      { mark: "B1", text: "privacy/surveillance concern" },
      { mark: "B1", text: "concern explained, such as constant watching/data about innocent people" },
      { mark: "B1", text: "fairness/misidentification/discrimination concern" },
      { mark: "B1", text: "safeguard such as transparency/access restriction/retention limit/audit/accountability" },
      { mark: "B1", text: "safeguard linked to reducing a named concern" },
      { mark: "B1", text: "judges whether public-space monitoring is proportionate using safety benefit, privacy/fairness risk and limits on access or retention" },
    ],
    strict: [
      "Do not accept 'cameras are good' or 'cameras are bad' without stakeholder impact.",
      "Do not award both concern marks for repeated wording of privacy only.",
      "Allow examples involving facial recognition if the monitoring system is computer-based.",
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
    balanced: "Correct. Ethics usually needs purpose, affected stakeholders, safeguards and proportionality.",
    can: "No. Capability is not the same as ethical justification.",
    privacy: "Too absolute. Privacy matters, but the answer should weigh it against safety and purpose.",
    security: "No. Monitoring has security aspects, but it also raises ethical questions about privacy, trust and consent.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupMapper() {
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#mapResult");
  const benefit = document.querySelector("#mapBenefit");
  const concern = document.querySelector("#mapConcern");
  function mapScenario() {
    const item = scenarioMap[scenario.value];
    result.textContent = item.result;
    benefit.innerHTML = `<strong>Benefit:</strong> ${item.benefit}`;
    concern.innerHTML = `<strong>Concern:</strong> ${item.concern}`;
  }
  scenario.addEventListener("change", mapScenario);
  document.querySelector("#mapBtn").addEventListener("click", mapScenario);
  mapScenario();
}

function setupBuilder() {
  const benefit = document.querySelector("#benefitInput");
  const concern = document.querySelector("#concernInput");
  const safeguard = document.querySelector("#safeguardInput");
  const output = document.querySelector("#judgementResult");
  function build() {
    output.textContent = `Although the system ${builderText.benefit[benefit.value]}, it ${builderText.concern[concern.value]}. Therefore, it is more ethically justified if ${builderText.safeguard[safeguard.value]}.`;
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
  renderExample("monitoring");
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
  setupMapper();
  setupBuilder();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
