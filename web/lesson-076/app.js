const scenarioMap = {
  remoteWork: {
    result: "Impact type: mixed environmental and social impact.",
    benefit: "Benefit: fewer commutes can reduce travel emissions and give workers more flexibility.",
    mitigation: "Harm and mitigation: workers may feel isolated or always available, so employers should set communication boundaries and provide support.",
  },
  dataCentre: {
    result: "Impact type: environmental impact from energy and cooling.",
    benefit: "Benefit: cloud storage can centralise resources and improve access to services.",
    mitigation: "Harm and mitigation: data centres use electricity and cooling, so efficient hardware, renewable energy and data retention limits reduce impact.",
  },
  newDevices: {
    result: "Impact type: e-waste and resource consumption.",
    benefit: "Benefit: newer tablets may improve performance, security and access to learning tools.",
    mitigation: "Harm and mitigation: frequent replacement increases manufacturing impact and e-waste, so schools should repair, reuse, donate or recycle devices responsibly.",
  },
  automation: {
    result: "Impact type: social impact on work.",
    benefit: "Benefit: automation can improve efficiency and remove workers from repetitive or dangerous tasks.",
    mitigation: "Harm and mitigation: workers may lose jobs or need new skills, so retraining and redeployment should be planned.",
  },
  onlineBanking: {
    result: "Impact type: access and digital divide.",
    benefit: "Benefit: online banking can be convenient and available outside branch opening hours.",
    mitigation: "Harm and mitigation: users without internet, devices or digital skills may be excluded, so alternative access and training should remain available.",
  },
};

const builderText = {
  tech: {
    automation: "automation",
    remote: "remote work",
    online: "online public services",
  },
  benefit: {
    efficiency: "improves efficiency and reduces repetitive work",
    travel: "reduces travel and commuting",
    access: "improves access for some users",
  },
  harm: {
    jobs: "may displace workers who need retraining",
    isolation: "may increase isolation or blur work-life boundaries",
    divide: "may exclude users without devices, internet or skills",
  },
};

const examples = {
  remote: {
    title: "Example 1: Remote work",
    problem: "A company moves most office work online.",
    steps: [
      "Benefit: fewer commutes may reduce travel emissions and save workers time.",
      "Benefit: flexible work can help employees who live far away or have caring responsibilities.",
      "Harm: workers may feel isolated or struggle to separate work and home life.",
      "Mitigation: clear communication hours, office days and support for home equipment make the change more balanced.",
    ],
  },
  ewaste: {
    title: "Example 2: Frequent device replacement",
    problem: "A school replaces tablets every two years.",
    steps: [
      "Benefit: newer devices may be faster, more secure and compatible with current software.",
      "Environmental harm: manufacturing uses energy and materials, and old devices create e-waste.",
      "Social concern: discarded devices may be processed unsafely if sent to poorly managed recycling.",
      "Mitigation: repair, extend lifespan, donate usable devices and use certified recycling.",
    ],
  },
  automation: {
    title: "Example 3: Factory automation",
    problem: "A factory automates repetitive assembly tasks.",
    steps: [
      "Benefit: production may become faster and more consistent.",
      "Benefit: dangerous tasks can be moved away from human workers.",
      "Harm: some workers may lose jobs or need retraining.",
      "Mitigation: offer training, redeploy workers and phase changes so people can adapt.",
    ],
  },
  divide: {
    title: "Example 4: Online-only public services",
    problem: "A public service moves applications online only.",
    steps: [
      "Benefit: many users can apply faster and at any time.",
      "Harm: people without internet, devices, accessibility support or digital skills may be excluded.",
      "Stakeholders: elderly users, low-income households and people with disabilities may be affected differently.",
      "Mitigation: keep assisted channels, provide training and design accessible interfaces.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term describes discarded electronic devices and components?", accepted: ["e-waste", "ewaste", "electronic waste"], answer: "E-waste / electronic waste" },
  { id: "p2", prompt: "Name one environmental cost of data centres.", accepted: ["energy", "electricity", "cooling", "carbon", "emissions", "water"], answer: "Energy/electricity use, cooling, emissions or water use" },
  { id: "p3", prompt: "Name one way to reduce e-waste.", accepted: ["recycle", "recycling", "repair", "reuse", "donate", "extend lifespan", "refurbish"], answer: "Repair / reuse / donate / recycle / extend lifespan" },
  { id: "p4", prompt: "What term describes unequal access to devices, internet or digital skills?", accepted: ["digital divide"], answer: "Digital divide" },
  { id: "p5", prompt: "Name one possible social benefit of remote work.", accepted: ["flexibility", "less commuting", "reduced travel", "access to jobs", "work life balance"], answer: "Flexibility / less commuting / wider access to jobs" },
  { id: "p6", prompt: "Name one possible social harm of automation.", accepted: ["job loss", "unemployment", "retraining", "deskilling", "displacement"], answer: "Job loss / displacement / retraining need / deskilling" },
  { id: "p7", prompt: "Name one group that may be excluded by online-only services.", accepted: ["elderly", "low income", "disabled", "rural", "people without internet", "people without devices"], answer: "Elderly users / low-income users / disabled users / users without internet or devices" },
  { id: "p8", prompt: "Does computing have only positive environmental effects? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "What design idea helps users with disabilities use systems?", accepted: ["accessibility", "accessible design"], answer: "Accessibility / accessible design" },
  { id: "p10", prompt: "Name one mitigation for workers affected by automation.", accepted: ["training", "retraining", "reskilling", "redeployment", "support"], answer: "Retraining / reskilling / redeployment / support" },
];

const mistakes = [
  {
    wrong: "Online meetings are always green because nobody travels.",
    fix: "Reduced travel can help, but devices, networks and data centres still use energy. A balanced answer considers both travel reduction and computing energy use.",
  },
  {
    wrong: "Automation is bad because it removes jobs.",
    fix: "Automation may displace some jobs, but it can also improve safety and efficiency. Strong answers mention retraining or redeployment as mitigation.",
  },
  {
    wrong: "E-waste is solved by throwing old devices into recycling.",
    fix: "Recycling must be responsible and safe. Repair, reuse and longer lifespans may reduce waste before recycling is needed.",
  },
  {
    wrong: "Online services help everyone equally.",
    fix: "Online services can improve access for some users but exclude others without devices, internet, skills or accessible design.",
  },
];


function renderStudentMarkPoints(question) {
  const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const guidance = (question.strict || []).join(" ");
  return `<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>${question.marking.map((point, pointIndex) => `<div class="mark-scheme-row" role="row"><span role="cell">${escape(point.text)}</span><span role="cell">${pointIndex === 0 ? escape(guidance) : ""}</span><strong role="cell">1</strong></div>`).join("")}</div>`;
}
const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A company replaces most face-to-face meetings with online meetings. Discuss environmental and social impacts.",
    answer: "Online meetings may reduce commuting and business travel, which can lower fuel use and emissions. They may also give workers more flexibility and allow meetings with people in different locations. However, online meetings still require devices, networks and data centres that use electricity. Socially, workers may feel isolated or have blurred boundaries between work and home. The company can reduce harm by using efficient devices, setting communication expectations and keeping some in-person contact where useful.",
    marking: [
      { mark: "B1", text: "environmental benefit such as reduced travel/fuel/emissions" },
      { mark: "B1", text: "benefit linked to meetings/commuting/business travel" },
      { mark: "B1", text: "environmental cost such as device/network/data-centre energy use" },
      { mark: "B1", text: "social benefit such as flexibility/wider participation" },
      { mark: "B1", text: "social harm such as isolation/work-life boundary issue" },
      { mark: "B1", text: "judges the overall impact using avoided travel, digital energy use and one workforce mitigation" },
    ],
    strict: [
      "Do not accept 'online has no environmental cost'.",
      "Do not award both social marks for two wordings of convenience only.",
      "Allow carbon footprint wording if linked to travel or energy use.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain why e-waste is an environmental issue and describe ways to reduce it.",
    answer: "E-waste is discarded electronic equipment such as old computers, phones or tablets. It is an environmental issue because manufacturing replacement devices uses energy and raw materials, and discarded devices may contain toxic materials that can pollute soil or water if processed badly. It can be reduced by repairing devices, extending their lifespan, reusing or donating working devices, and recycling components through responsible schemes.",
    marking: [
      { mark: "B1", text: "e-waste defined as discarded electronic equipment/components" },
      { mark: "B1", text: "environmental harm from toxic materials/pollution" },
      { mark: "B1", text: "environmental harm from manufacturing/resource/energy demand" },
      { mark: "B1", text: "reduction method such as repair/reuse/donation/longer lifespan" },
      { mark: "B1", text: "responsible recycling or reduction method linked to reduced harm" },
    ],
    strict: [
      "Do not accept 'throw it away safely' without method.",
      "Do not award both harm marks for repeated pollution wording only.",
      "Allow refurbishment as reuse/repair.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A factory introduces automation for repetitive tasks. Evaluate social impacts on workers.",
    answer: "Automation may improve safety by removing workers from repetitive or dangerous tasks, and it may increase efficiency and consistency. This can benefit the company and some workers if new skilled roles are created. However, some workers may lose jobs, need retraining or become deskilled if their previous work is replaced. The impact is more acceptable if the factory provides retraining, redeployment and support rather than replacing workers without transition planning.",
    marking: [
      { mark: "B1", text: "benefit such as efficiency/consistency/safety" },
      { mark: "B1", text: "benefit linked to workers or factory context" },
      { mark: "B1", text: "harm such as job loss/displacement" },
      { mark: "B1", text: "harm explained through retraining/deskilling/income impact" },
      { mark: "B1", text: "mitigation such as retraining/redeployment/support" },
      { mark: "B1", text: "judges whether automation is acceptable using productivity/safety benefit, worker displacement and a retraining or redeployment plan" },
    ],
    strict: [
      "Do not accept 'robots are bad' without worker impact.",
      "Do not award the judgement mark unless it uses both a worker benefit and a worker harm or mitigation.",
      "Allow dangerous task reduction as a worker benefit.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain how moving services online can widen the digital divide.",
    answer: "The digital divide is unequal access to digital technology, internet connection or digital skills. If services move online only, people without suitable devices or reliable internet may be unable to use them. Users with low digital skills, some elderly users or users with disabilities may also struggle if systems are not accessible. This can reduce access to banking, healthcare, education or public services. Organisations can reduce the divide by providing assisted channels, training and accessible design.",
    marking: [
      { mark: "B1", text: "digital divide defined as unequal access to devices/internet/skills" },
      { mark: "B1", text: "affected group identified such as elderly/low-income/rural/disabled users" },
      { mark: "B1", text: "exclusion from online service explained" },
      { mark: "B1", text: "consequence such as reduced access to banking/healthcare/education/public services" },
    ],
    strict: [
      "Do not accept 'some people cannot use computers' without access or skill reason.",
      "Do not award affected-group mark for vague 'people' only.",
      "Allow affordability as part of access.",
    ],
  },
  {
    title: "Question 5",
    marks: "8 marks",
    prompt: "A delivery company uses AI to predict demand and optimise delivery routes. Evaluate the social, economic and environmental impacts of this AI application.",
    answer: "The AI system can analyse previous orders and traffic data to predict demand and select shorter routes. Socially, customers may receive more reliable deliveries and drivers may avoid some congestion, but continuous worker tracking or automated targets may reduce privacy and increase pressure. Economically, fewer empty journeys can reduce fuel and staffing costs, although the system is expensive to develop and maintain and may redesign or remove some jobs. Environmentally, shorter routes may reduce fuel use and emissions, but model training, data centres and replacement hardware consume electricity and materials. The company should minimise collected data, involve drivers in reviewing unsafe routes, monitor bias and errors, use efficient infrastructure and retrain affected staff. The application is justified only when measured route savings outweigh its computing footprint and worker harms are controlled.",
    marking: [
      { mark: "B1", text: "identifies the AI application or mechanism, such as demand prediction or route optimisation using data" },
      { mark: "B1", text: "developed social benefit or harm for customers or drivers" },
      { mark: "B1", text: "developed economic benefit such as lower fuel/delivery cost or improved productivity" },
      { mark: "B1", text: "developed economic harm such as development cost, job redesign or displacement" },
      { mark: "B1", text: "environmental benefit such as fewer journey miles, lower fuel use or reduced emissions" },
      { mark: "B1", text: "environmental cost such as data-centre electricity, cooling or hardware/material demand" },
      { mark: "B1", text: "matching mitigation such as data minimisation, human review, efficient infrastructure, monitoring or retraining" },
      { mark: "B1", text: "judges whether measured route savings outweigh the computing footprint and named worker/customer harms" },
    ],
    strict: [
      "Do not award generic AI advantages or disadvantages without linking the model's decision to this delivery scenario.",
      "Do not count an economic saving as an environmental benefit unless reduced resource or energy use is explained.",
      "The final evaluation must balance social, economic and environmental evidence.",
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
    balanced: "Correct. Reduced travel is a benefit, but manufacture, energy use and disposal still matter.",
    alwaysGood: "No. Online meetings still use devices, networks and data centres.",
    alwaysBad: "Too absolute. Computing can reduce some impacts while creating others.",
    onlyCost: "No. Financial cost is not the same as environmental and social impact.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupAnalyser() {
  const scenario = document.querySelector("#scenarioInput");
  const result = document.querySelector("#analyseResult");
  const benefit = document.querySelector("#analyseBenefit");
  const mitigation = document.querySelector("#analyseMitigation");
  function analyse() {
    const item = scenarioMap[scenario.value];
    result.textContent = item.result;
    benefit.innerHTML = `<strong>Benefit:</strong> ${item.benefit}`;
    mitigation.innerHTML = `<strong>Harm and mitigation:</strong> ${item.mitigation}`;
  }
  scenario.addEventListener("change", analyse);
  document.querySelector("#analyseBtn").addEventListener("click", analyse);
  analyse();
}

function setupBuilder() {
  const tech = document.querySelector("#techInput");
  const benefit = document.querySelector("#benefitInput");
  const harm = document.querySelector("#harmInput");
  const output = document.querySelector("#buildResult");
  function build() {
    output.textContent = `${builderText.tech[tech.value]} ${builderText.benefit[benefit.value]}, but it ${builderText.harm[harm.value]}. A balanced answer should name the affected stakeholders and propose a realistic mitigation.`;
  }
  tech.addEventListener("change", build);
  benefit.addEventListener("change", build);
  harm.addEventListener("change", build);
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
  renderExample("remote");
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
        <h4>Mark scheme</h4>
        <p><strong>Answer:</strong> ${item.answer}</p>
        ${renderStudentMarkPoints(item)}
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
  setupAnalyser();
  setupBuilder();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExam();
}

init();
