const recommendations = {
  school: {
    result: "Choose client-server.",
    method: "The school needs central management of users, permissions, data and backups. Clients request services from managed servers.",
  },
  home: {
    result: "Peer-to-peer may be suitable.",
    method: "A few trusted devices can share files directly without buying or maintaining a dedicated server.",
  },
  web: {
    result: "Choose client-server.",
    method: "Many clients request web pages or data from one or more managed servers. Centralised hosting supports control, security and maintenance.",
  },
  distributed: {
    result: "Peer-to-peer may be suitable.",
    method: "Peers can both request and provide file parts, so sharing is distributed instead of relying on one central source.",
  },
};

const examples = {
  school: {
    title: "Example 1: school network",
    problem: "A school wants controlled logins, shared storage and regular backups.",
    steps: [
      "Students' computers act as clients because they request services.",
      "The file/authentication server provides storage, login and permission services.",
      "Client-server is suitable because management is centralised.",
      "The trade-off is dependence on server availability unless redundancy is used.",
    ],
  },
  home: {
    title: "Example 2: home file sharing",
    problem: "Three home computers share photos directly with each other.",
    steps: [
      "Each computer may request files from another computer.",
      "Each computer may also provide files to others.",
      "This is peer-to-peer because devices can act as both client and server.",
      "It is simple and low cost, but permissions/backups may be inconsistent.",
    ],
  },
  failure: {
    title: "Example 3: failure analysis",
    problem: "A client-server file server fails during the school day.",
    steps: [
      "Clients may still run local software, but cannot access the server service.",
      "Shared files, logins or printing may fail if those services depend on the server.",
      "The issue is service availability, not the definition of LAN or WAN.",
      "A strong answer links the failure to the affected service.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "A device that requests a service is called a...", accepted: ["client"], answer: "Client" },
  { id: "p2", prompt: "A device or software that provides a service is called a...", accepted: ["server"], answer: "Server" },
  { id: "p3", prompt: "In which model can devices act as both client and server?", accepted: ["peer-to-peer", "p2p", "peer to peer"], answer: "Peer-to-peer" },
  { id: "p4", prompt: "Which model is usually better for central user account management?", accepted: ["client-server", "client server"], answer: "Client-server" },
  { id: "p5", prompt: "Which model may avoid buying a dedicated server for a small trusted network?", accepted: ["peer-to-peer", "p2p", "peer to peer"], answer: "Peer-to-peer" },
  { id: "p6", prompt: "Name one advantage of client-server.", accepted: ["central management", "centralised management", "centralized management", "security", "backup", "backups", "permissions"], answer: "Central management / security / backups / permissions" },
  { id: "p7", prompt: "Name one disadvantage of client-server.", accepted: ["server failure", "single point of failure", "expensive", "cost", "maintenance", "administrator"], answer: "Server failure can affect many clients / higher cost / maintenance" },
  { id: "p8", prompt: "Name one disadvantage of peer-to-peer.", accepted: ["harder to manage", "security", "backup", "backups", "inconsistent", "availability", "peers offline"], answer: "Harder management/security/backups; resources depend on peers being online" },
  { id: "p9", prompt: "Client-server and peer-to-peer are network models or topologies?", accepted: ["models", "network models"], answer: "Network models" },
  { id: "p10", prompt: "A public website serving many users is usually which model?", accepted: ["client-server", "client server"], answer: "Client-server" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe the roles of a client and a server in a network.",
    answer: "A client requests a service or resource, such as a web page or file. A server provides a service or resource to clients, such as file storage, authentication or web hosting.",
    marking: [
      { mark: "B1", text: "client requests a service/resource" },
      { mark: "B1", text: "valid example of a client request" },
      { mark: "B1", text: "server provides a service/resource" },
      { mark: "B1", text: "valid example of a server service" },
    ],
    strict: [
      "Do not accept only 'client is a computer' or 'server is a big computer'.",
      "Do not require server to be a separate physical machine.",
      "Award software role descriptions where clearly correct.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A school network has 600 users, shared storage and managed user accounts. Explain why a client-server model is suitable.",
    answer: "A client-server model is suitable because the school can centrally manage accounts, permissions and shared files on servers. Backups and updates can also be controlled centrally. This helps maintain security and consistency for many users, although the school must manage server cost and availability.",
    marking: [
      { mark: "B1", text: "central management of accounts/permissions" },
      { mark: "B1", text: "central shared storage/backups/updates" },
      { mark: "B1", text: "consistent access-control or security policies can be applied centrally" },
      { mark: "B1", text: "links to many users / school scenario" },
      { mark: "B1", text: "balanced point such as server cost or server availability" },
    ],
    strict: [
      "Do not accept only 'it is faster'.",
      "Do not award generic security claims unless linked to central control/permissions.",
      "Allow equivalent wording for centralised/centralized management.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Compare peer-to-peer networking with client-server networking.",
    answer: "In peer-to-peer networking, devices can act as both clients and servers and share resources directly. This may reduce cost because no dedicated server is needed, but it can be harder to manage security, backups and availability. In client-server networking, clients request services from servers, giving central management but requiring server hardware/maintenance and making server failure significant.",
    marking: [
      { mark: "B1", text: "peer devices can act as both client and server / share directly" },
      { mark: "B1", text: "peer-to-peer may reduce cost / no dedicated server needed" },
      { mark: "B1", text: "peer-to-peer harder to manage security/backups/availability" },
      { mark: "B1", text: "client-server uses clients requesting services from servers / central management" },
      { mark: "B1", text: "client-server has cost/maintenance/server failure issue" },
    ],
    strict: [
      "Do not compare by topology shape.",
      "Do not say peer-to-peer is always insecure.",
      "Award points only where linked to the correct model.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A small office of four trusted users shares files directly between laptops. Explain one advantage and one disadvantage of a peer-to-peer model for this office.",
    answer: "An advantage is that it can be low cost and simple because the office does not need a dedicated server. A disadvantage is that file availability, backups and access control may be inconsistent because each laptop manages its own shared resources and may be offline.",
    marking: [
      { mark: "B1", text: "advantage: no dedicated server / lower cost / simpler setup" },
      { mark: "B1", text: "links advantage to small office/trusted users" },
      { mark: "B1", text: "disadvantage: harder backup/security/access control or peer availability" },
      { mark: "B1", text: "links disadvantage to peers managing resources or being offline" },
    ],
    strict: [
      "Do not accept only 'cheap' without reason.",
      "Do not award client-server advantages as peer-to-peer advantages.",
      "Allow 'files unavailable if host laptop is off' as availability explanation.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A student says peer-to-peer is the same as mesh topology. Explain why this is incorrect.",
    answer: "Peer-to-peer is a network model describing device roles: peers can request and provide resources. Mesh is a topology describing how devices or nodes are connected with multiple paths. A peer-to-peer network does not have to be physically arranged as a mesh.",
    marking: [
      { mark: "B1", text: "peer-to-peer describes roles/resource sharing" },
      { mark: "B1", text: "mesh describes connections/topology/multiple paths" },
      { mark: "B1", text: "states that model and topology are different concepts" },
    ],
    strict: [
      "Do not accept only 'they are different'.",
      "Do not require a diagram.",
      "Award equivalent explanation using logical/physical organisation if clear.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
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
      feedback.textContent = button.dataset.hook === "client"
        ? "Correct. The student computer is requesting a file service, so it is acting as a client."
        : "Not this time. Focus on the role in this transaction: the computer is asking for a service.";
    });
  });
}

function setupRecommendationTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#recommendResult");
  const method = document.querySelector("#recommendMethod");
  function recommend() {
    const item = recommendations[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", recommend);
  document.querySelector("#recommendBtn").addEventListener("click", recommend);
  recommend();
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Strong model answers name roles, management and consequences.`;
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
  setupRecommendationTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
