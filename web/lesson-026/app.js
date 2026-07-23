const scenarios = {
  dns: {
    result: "DNS / addressing",
    method: "DNS resolves a domain name to an IP address so the browser can contact the correct server. Do not answer with HTTP unless the question asks how the web page is requested after resolution.",
  },
  imap: {
    result: "IMAP / email protocol",
    method: "IMAP accesses and synchronises email stored on a mail server across devices. SMTP sends email; POP3 downloads email to a client.",
  },
  fibre: {
    result: "Transmission media",
    method: "Fibre-optic cable carries data as light pulses and is suitable for high bandwidth, long distance and low electromagnetic interference.",
  },
  router: {
    result: "Network hardware",
    method: "A router connects different networks and forwards packets using IP addresses and routing information.",
  },
  latency: {
    result: "Network performance",
    method: "Small data but late response suggests latency, not bandwidth. Explain delay before response and link it to the user symptom.",
  },
  mesh: {
    result: "Topology / resilience",
    method: "A mesh topology can provide alternative paths, so communication may continue if one link fails.",
  },
  cloud: {
    result: "Cloud services",
    method: "Cloud storage uses remote servers accessed over a network, supporting access from different locations but creating provider/security/dependence considerations.",
  },
};

const examples = {
  protocol: {
    title: "Example 1: HTTPS precision",
    problem: "Explain why HTTPS is used for an online payment page.",
    answer: "HTTPS encrypts communication between the browser and web server, helping protect sensitive payment details while they are transmitted.",
    annotations: [
      "HTTPS named correctly for secure web communication.",
      "Encrypts communication is the mechanism.",
      "Browser and web server gives the communication context.",
      "Payment details in transit links to the scenario and consequence.",
    ],
  },
  hardware: {
    title: "Example 2: switch vs router precision",
    problem: "Compare a switch and a router.",
    answer: "A switch forwards frames inside a LAN using MAC addresses, while a router forwards packets between different networks using IP addresses and routing information.",
    annotations: [
      "Switch boundary: inside a LAN.",
      "Switch mechanism: forwards frames using MAC addresses.",
      "Router boundary: between networks.",
      "Router mechanism: forwards packets using IP addresses/routing information.",
    ],
  },
  performance: {
    title: "Example 3: congestion precision",
    problem: "Explain why downloads become slow when many users stream video.",
    answer: "Many users share the same network capacity, causing congestion. Packets may be queued, delayed or lost, reducing throughput and causing slow downloads or buffering.",
    annotations: [
      "Many users share capacity gives the cause.",
      "Congestion names the concept.",
      "Queued, delayed or lost packets gives mechanism.",
      "Reduced throughput and buffering gives consequence.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which device forwards frames inside a LAN using MAC addresses?", accepted: ["switch"], answer: "Switch" },
  { id: "p2", prompt: "Which protocol sends email?", accepted: ["smtp"], answer: "SMTP" },
  { id: "p3", prompt: "Which protocol synchronises email across devices?", accepted: ["imap"], answer: "IMAP" },
  { id: "p4", prompt: "Which service resolves a domain name to an IP address?", accepted: ["dns"], answer: "DNS" },
  { id: "p5", prompt: "Which term means delay before a response is received?", accepted: ["latency"], answer: "Latency" },
  { id: "p6", prompt: "Which network gives controlled access to selected external users?", accepted: ["extranet"], answer: "Extranet" },
  { id: "p7", prompt: "Which transmission medium uses light pulses?", accepted: ["fibre", "fiber", "fibre optic", "fiber optic", "fibre-optic cable", "fiber-optic cable"], answer: "Fibre-optic cable" },
  { id: "p8", prompt: "Which topology has all devices connected to a central switch or hub?", accepted: ["star", "star topology"], answer: "Star topology" },
  { id: "p9", prompt: "Which protocol transfers web pages without the secure encryption distinction?", accepted: ["http"], answer: "HTTP" },
  { id: "p10", prompt: "Which term means actual successful data transfer rate?", accepted: ["throughput"], answer: "Throughput" },
  { id: "p11", prompt: "Which device connects different networks using IP addresses?", accepted: ["router"], answer: "Router" },
  { id: "p12", prompt: "Which addressing term identifies a network interface/device on a local network?", accepted: ["mac", "mac address", "mac addresses"], answer: "MAC address" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A student says: 'A switch and a router are the same because they both send data.' Improve this answer.",
    answer: "A switch and router both forward data, but they work at different network boundaries. A switch connects devices inside a LAN and forwards frames to the correct port using MAC addresses. A router connects different networks, such as a LAN and the internet, and forwards packets using IP addresses and routing information.",
    marking: [
      { mark: "B1", text: "states they are not the same / have different roles" },
      { mark: "B1", text: "switch works within a LAN/local network" },
      { mark: "B1", text: "switch uses MAC addresses/ports to forward frames/data" },
      { mark: "B1", text: "router connects different networks / LAN to internet" },
      { mark: "B1", text: "router uses IP addresses/routing information" },
      { mark: "B1", text: "clear scenario or boundary comparison" },
    ],
    strict: [
      "Do not award for only saying one is faster or more powerful.",
      "Allow frame/packet wording variation if address type and boundary are correct.",
      "Do not require OSI layer names.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A school wants students to access files from home and school using a cloud service. Discuss benefits and risks.",
    answer: "A cloud service stores or processes data on remote servers accessed over a network. Benefits include access from different locations/devices and easier collaboration or backup. Risks include dependence on the internet connection/provider, possible downtime, and security or privacy concerns for student data.",
    marking: [
      { mark: "B1", text: "cloud uses remote servers/resources accessed over a network" },
      { mark: "B1", text: "benefit: access from home and school/different devices" },
      { mark: "B1", text: "benefit: collaboration/backup/reduced local maintenance" },
      { mark: "B1", text: "risk: internet/provider dependence or downtime" },
      { mark: "B1", text: "risk: security/privacy/compliance concern" },
      { mark: "B1", text: "links points to school/student-file scenario" },
    ],
    strict: [
      "Do not accept 'stored in the cloud' without remote server/network mechanism.",
      "Do not accept only generic 'cheap/easy' without explanation.",
      "Award balanced answers that discuss both benefits and risks.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain the protocols involved when a user sends an email and then reads it on both a phone and laptop.",
    answer: "SMTP is used to send the email from the client to a mail server and may be used between mail servers. IMAP is suitable for reading email on both phone and laptop because it accesses and synchronises email stored on the server across devices. POP3 would normally download messages to a client and is less suitable for keeping devices synchronised.",
    marking: [
      { mark: "B1", text: "SMTP used to send email from client to mail server" },
      { mark: "B1", text: "SMTP may be used between mail servers" },
      { mark: "B1", text: "IMAP used to access/read email on server" },
      { mark: "B1", text: "IMAP synchronises across multiple devices" },
      { mark: "B1", text: "POP3 downloads messages to client / contrast with IMAP" },
      { mark: "B1", text: "clear separation between sending and receiving/accessing email" },
    ],
    strict: [
      "Do not award SMTP for retrieving or reading email.",
      "Do not award POP3 for sending email.",
      "Do not require both POP3 and IMAP in a real system, but contrast earns credit here.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A video conference has clear image quality but delayed conversation. Explain possible network causes.",
    answer: "Clear image quality suggests there may be enough bandwidth for the video stream. Delayed conversation suggests high latency or jitter, meaning responses take longer or delay varies. Causes may include long distance, route, congestion, wireless interference, overloaded servers or packet loss/retransmission. The result is pauses before people hear replies even if the image is not low quality.",
    marking: [
      { mark: "B1", text: "bandwidth linked to capacity/image quality" },
      { mark: "B1", text: "latency identified as delay/response time issue" },
      { mark: "B1", text: "jitter allowed as variation in delay" },
      { mark: "B1", text: "valid cause such as distance/route/congestion/interference/server load" },
      { mark: "B1", text: "packet loss/retransmission or congestion effect explained" },
      { mark: "B1", text: "links to delayed conversation scenario" },
    ],
    strict: [
      "Do not accept only 'not enough bandwidth' because the prompt states image quality is clear.",
      "Do not require advanced codec knowledge.",
      "Allow any valid performance factor if connected to delay.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A company lets selected suppliers view private stock data. Explain whether this is internet, intranet or extranet, and justify your answer.",
    answer: "This is an extranet because selected suppliers are external organisations but are given controlled access to private company information. It is not a normal intranet because access is not only internal staff. It is not simply the public internet because the stock data is restricted to authorised suppliers rather than available to everyone.",
    marking: [
      { mark: "B1", text: "identifies extranet" },
      { mark: "B1", text: "suppliers are external users/organisations" },
      { mark: "B1", text: "controlled/restricted/authorised access" },
      { mark: "B1", text: "private company information/stock data" },
      { mark: "B1", text: "contrasts with intranet as internal-only" },
      { mark: "B1", text: "contrasts with internet/public access" },
    ],
    strict: [
      "Do not accept only 'it is online'.",
      "No identification mark for intranet unless answer later clearly explains selected external access.",
      "Allow partner/customer portal examples as supporting context.",
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
  const responses = {
    latency: "Topic: network performance. Mark phrase: latency is delay before response/data arrival.",
    switch: "Topic: network hardware. Mark phrase: a switch forwards frames inside a LAN using MAC addresses/ports.",
    extranet: "Topic: network services. Mark phrase: controlled access for selected external users.",
    http: "Topic: application protocols. Mark phrase: HTTP transfers web pages/resources between browser and web server.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupTopicTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#topicResult");
  const method = document.querySelector("#topicMethod");
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
    <p><strong>Worked answer:</strong> ${example.answer}</p>
    <h4>Why it earns marks</h4>
    <ul>${example.annotations.map((item) => `<li>${item}</li>`).join("")}</ul>
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
  renderExample("protocol");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For missed items, write the topic and one mark-scheme phrase before retrying.`;
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
  setupTopicTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
