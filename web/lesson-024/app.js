const scenarios = {
  public: {
    result: "Internet",
    method: "The product pages are intended for public access on the global network. Individual services may require login, but the public-facing network context is the internet.",
  },
  staff: {
    result: "Intranet",
    method: "The resources are private to the organisation and restricted to authorised internal users such as staff.",
  },
  supplier: {
    result: "Extranet",
    method: "A selected external organisation is given controlled access to private data, so this is an extranet scenario rather than fully public access.",
  },
  files: {
    result: "Cloud storage",
    method: "Files are stored on remote servers and accessed over a network from different locations/devices.",
  },
  scale: {
    result: "Cloud infrastructure",
    method: "The startup rents remote computing resources and can scale capacity without buying and maintaining all hardware locally.",
  },
  risk: {
    result: "Cloud service risk evaluation",
    method: "Remote provider storage may help access and backup, but patient records require careful security, privacy, compliance and provider-dependence analysis.",
  },
};

const examples = {
  school: {
    title: "Example 1: school staff portal",
    problem: "A school wants staff to access internal policies, forms and notices.",
    steps: [
      "The information is for internal users, not the public.",
      "The organisation controls access to the resources.",
      "An intranet is suitable because it is a private network for authorised users inside the organisation.",
      "A strong answer mentions restricted access, not just 'it is online'.",
    ],
  },
  supplier: {
    title: "Example 2: supplier stock portal",
    problem: "A shop lets selected suppliers log in to view stock levels and delivery schedules.",
    steps: [
      "The supplier is external to the organisation.",
      "The access is controlled and limited to selected information.",
      "This is an extranet because authorised external users are given access to private resources.",
      "It is not the public internet because not everyone can access the data.",
    ],
  },
  cloud: {
    title: "Example 3: moving files to cloud storage",
    problem: "A school considers storing student work on a cloud service.",
    steps: [
      "Cloud storage uses remote servers accessed over a network.",
      "Benefits may include remote access, collaboration, backups and less local storage management.",
      "Risks may include dependence on internet connection, provider availability, privacy and security.",
      "A balanced answer gives both benefits and drawbacks linked to the school scenario.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which term means a global public network of interconnected networks?", accepted: ["internet"], answer: "Internet" },
  { id: "p2", prompt: "Which term means a private internal network for an organisation?", accepted: ["intranet"], answer: "Intranet" },
  { id: "p3", prompt: "Which term means a private network with controlled access for selected external users?", accepted: ["extranet"], answer: "Extranet" },
  { id: "p4", prompt: "Cloud storage keeps files on local-only drives or remote servers?", accepted: ["remote servers", "remote", "servers"], answer: "Remote servers" },
  { id: "p5", prompt: "A supplier logs in to see selected stock data. Internet, intranet or extranet?", accepted: ["extranet"], answer: "Extranet" },
  { id: "p6", prompt: "Staff-only HR policies are likely on an internet, intranet or extranet?", accepted: ["intranet"], answer: "Intranet" },
  { id: "p7", prompt: "Name one benefit of cloud services.", accepted: ["remote access", "collaboration", "backup", "backups", "scalability", "scale", "less maintenance", "lower local maintenance", "cost"], answer: "Remote access / collaboration / backup / scalability / less local maintenance" },
  { id: "p8", prompt: "Name one risk or drawback of cloud services.", accepted: ["security", "privacy", "internet connection", "connection", "provider", "downtime", "latency", "cost", "compliance"], answer: "Security / privacy / dependence on connection or provider / downtime / cost" },
  { id: "p9", prompt: "Does an extranet allow everyone on the public internet to access all data? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "A startup rents remote servers instead of buying local hardware. Which service idea is this?", accepted: ["cloud", "cloud infrastructure", "iaas", "infrastructure as a service"], answer: "Cloud infrastructure" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Distinguish between the internet and an intranet.",
    answer: "The internet is a global public network of interconnected networks. An intranet is a private network used within an organisation and restricted to authorised internal users. Both may use web technologies, but the access scope and control are different.",
    marking: [
      { mark: "B1", text: "internet is global/public/interconnected networks" },
      { mark: "B1", text: "intranet is private/internal to an organisation" },
      { mark: "B1", text: "intranet access restricted to authorised users/staff" },
      { mark: "B1", text: "contrasts internet access across public interconnected networks with organisation-controlled intranet access" },
    ],
    strict: [
      "Do not accept 'intranet is a small internet' for full credit.",
      "Do not require discussion of physical hardware.",
      "Allow reference to web technologies if access distinction is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A company gives selected suppliers access to stock levels and delivery information. Explain why this is an extranet.",
    answer: "This is an extranet because it gives selected external users, the suppliers, controlled access to private company information. The data is not available to the general public, and the company can restrict what each supplier can access.",
    marking: [
      { mark: "B1", text: "identifies selected suppliers as external users/organisations" },
      { mark: "B1", text: "controlled/restricted access" },
      { mark: "B1", text: "access to private/internal company information" },
      { mark: "B1", text: "not available to the general public / differs from public internet" },
    ],
    strict: [
      "Do not accept only 'it is online'.",
      "Do not call it an intranet unless external controlled access is still explained; no identification mark for wrong term.",
      "Allow partner/customer portal examples if access is controlled.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A school is considering cloud storage for student work. Discuss two benefits and one drawback.",
    answer: "Cloud storage can allow students and staff to access files from different locations and devices. It can also support collaboration and backup because files are stored on remote servers managed by a provider. A drawback is dependence on internet connection/provider availability, or concerns about security and privacy of student data.",
    marking: [
      { mark: "B1", text: "files stored/accessed on remote servers over a network" },
      { mark: "B1", text: "benefit: access from different locations/devices" },
      { mark: "B1", text: "benefit: collaboration/backup/reduced local maintenance" },
      { mark: "B1", text: "drawback: dependence on internet/provider/downtime" },
      { mark: "B1", text: "drawback or benefit linked to school/student data context such as security/privacy" },
    ],
    strict: [
      "Do not accept only 'it is cheaper' without a reason or context.",
      "Do not say data is stored 'in the air'.",
      "Award a maximum of 3 marks if no cloud-service mechanism is described.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why an organisation may use an intranet instead of publishing documents on the internet.",
    answer: "An intranet restricts access to authorised internal users, so confidential or staff-only documents are not publicly available. The organisation can control the content and access permissions. This is suitable for internal policies, forms and notices that should not be exposed on the public internet.",
    marking: [
      { mark: "B1", text: "restricted to authorised/internal users" },
      { mark: "B1", text: "protects confidential/staff-only information from public access" },
      { mark: "B1", text: "organisation controls content/permissions" },
      { mark: "B1", text: "valid internal document example or scenario link" },
    ],
    strict: [
      "Do not accept vague 'more secure' unless access restriction/control is explained.",
      "Do not require encryption details.",
      "Allow 'private network' if internal organisation use is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Evaluate the use of cloud infrastructure for a startup website with unpredictable demand.",
    answer: "Cloud infrastructure may allow the startup to rent servers or processing resources and scale them when demand increases, avoiding the need to buy and maintain all hardware locally. It may reduce setup time and support availability if managed well. Drawbacks include ongoing costs, dependence on the provider and internet connection, possible downtime, and security/privacy responsibilities.",
    marking: [
      { mark: "B1", text: "cloud infrastructure provides remote servers/processing resources" },
      { mark: "B1", text: "scalability for unpredictable demand" },
      { mark: "B1", text: "reduced need to buy/maintain local hardware or faster setup" },
      { mark: "B1", text: "valid drawback such as ongoing cost/provider dependence/downtime/security" },
      { mark: "B1", text: "evaluative link to startup website scenario" },
    ],
    strict: [
      "Do not accept 'cloud is always cheaper' without explanation.",
      "Do not require SaaS/PaaS/IaaS labels for credit.",
      "Allow IaaS wording if remote infrastructure is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-\s]+/g, " ");
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
      feedback.textContent = button.dataset.hook === "extranet"
        ? "Correct. Internal-only access is intranet; controlled access for an external partner is extranet."
        : "Not quite. Focus on who is authorised to access the private information.";
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#choiceResult");
  const method = document.querySelector("#choiceMethod");
  function choose() {
    const item = scenarios[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", choose);
  document.querySelector("#chooseBtn").addEventListener("click", choose);
  choose();
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
  renderExample("school");
}

function setupAnswerToggles(scope = document) {
  scope.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>${index + 1}. ${item.prompt}</label>
      <div class="practice-row">
        <input type="text" aria-label="${item.prompt}" />
        <span class="mark" aria-live="polite"></span>
      </div>
      <button type="button" class="answer-toggle" data-answer="answer-${item.id}">Show answer</button>
      <div class="answer-panel" id="answer-${item.id}">${item.answer}</div>
    </div>
  `).join("");

  setupAnswerToggles(list);
}

function setupPractice() {
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const container = document.querySelector(`#${item.id}`);
      const input = container.querySelector("input");
      const mark = container.querySelector(".mark");
      const response = normalise(input.value);
      const isCorrect = item.accepted.some((answer) => {
        const expected = normalise(answer);
        return response === expected || response.includes(expected);
      });
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Use access scope and scenario consequences, not vague online/offline labels.`;
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index}`;
    return `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${question.title}</h3>
          <span>${question.marks}</span>
        </div>
        <p>${question.prompt}</p>
        <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
        <div class="ms-panel" id="${msId}">
          <h4>CIE-style mark scheme</h4>
          <p><strong>Answer:</strong> ${question.answer}</p>
          <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
          <h4>Strict notes</h4>
          <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".ms-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.ms}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupChoiceTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
