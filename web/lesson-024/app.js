const scenarios = {
  lan: {
    result: "Switch",
    method: "A switch connects devices inside a LAN and forwards frames to the correct port using MAC address information.",
  },
  internet: {
    result: "Router",
    method: "A router connects different networks, such as a school LAN and the internet, and forwards packets using IP addresses/routing information.",
  },
  wifi: {
    result: "Wireless access point",
    method: "A wireless access point allows wireless devices to connect to the network using radio waves. It is not the same job as routing between networks.",
  },
  different: {
    result: "Gateway",
    method: "A gateway connects networks that use different protocols, data formats or standards and may translate between them.",
  },
  mac: {
    result: "Switch",
    method: "MAC address tables are associated with switches forwarding traffic within a LAN.",
  },
  default: {
    result: "Default gateway / router",
    method: "Traffic leaving the local subnet is sent to the default gateway, often a router, so it can be forwarded to another network.",
  },
};

const examples = {
  school: {
    title: "Example 1: school internet path",
    problem: "A desktop PC opens a website outside the school network.",
    steps: [
      "Inside the LAN, a switch can forward frames between local devices using MAC addresses.",
      "To reach a different network, traffic is sent to a router/default gateway.",
      "The router forwards packets using IP addresses and routing information.",
      "A complete answer separates local switching from routing between networks.",
    ],
  },
  wifi: {
    title: "Example 2: adding tablets to a classroom",
    problem: "A classroom already has a wired LAN, but students need tablet access.",
    steps: [
      "The tablets need wireless access rather than a cable connection.",
      "A wireless access point allows wireless devices to connect to the network using radio waves.",
      "The LAN may still use switches for wired devices.",
      "Internet access may still require a router; the access point does not automatically perform every network role.",
    ],
  },
  gateway: {
    title: "Example 3: two systems with different rules",
    problem: "A company system needs to exchange data with another network that uses a different protocol.",
    steps: [
      "The issue is not simply distance or wireless access.",
      "The two networks use different communication rules or formats.",
      "A gateway may be needed to connect the networks and translate between protocols/formats.",
      "Do not use gateway as a generic replacement for switch or router.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which device forwards frames inside a LAN using MAC addresses?", accepted: ["switch"], answer: "Switch" },
  { id: "p2", prompt: "Which device connects different networks and forwards packets using IP addresses?", accepted: ["router"], answer: "Router" },
  { id: "p3", prompt: "Which device allows wireless devices to connect to a network?", accepted: ["wireless access point", "access point", "wap", "ap"], answer: "Wireless access point" },
  { id: "p4", prompt: "Which device may translate between different network protocols or formats?", accepted: ["gateway"], answer: "Gateway" },
  { id: "p5", prompt: "Switches mainly use MAC addresses or IP addresses?", accepted: ["mac", "mac addresses", "mac address"], answer: "MAC addresses" },
  { id: "p6", prompt: "Routers mainly use MAC addresses or IP addresses for routing between networks?", accepted: ["ip", "ip addresses", "ip address"], answer: "IP addresses" },
  { id: "p7", prompt: "A tablet joins a school network using WiFi. Which hardware gives wireless access?", accepted: ["wireless access point", "access point", "wap", "ap"], answer: "Wireless access point" },
  { id: "p8", prompt: "A LAN sends traffic outside its local subnet to a default ____.", accepted: ["gateway", "default gateway"], answer: "Default gateway" },
  { id: "p9", prompt: "Does a switch normally perform protocol translation between different networks? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one boundary handled by a router.", accepted: ["between networks", "different networks", "lan to internet", "lan and internet", "network to network", "wan"], answer: "Between networks / LAN to internet" },
];


function renderStudentMarkPoints(question) {
  const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const guidance = (question.strict || []).join(" ");
  return `<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>${question.marking.map((point, pointIndex) => `<div class="mark-scheme-row" role="row"><span role="cell">${escape(point.text)}</span><span role="cell">${pointIndex === 0 ? escape(guidance) : ""}</span><strong role="cell">1</strong></div>`).join("")}</div>`;
}
const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Explain the role of a switch in a local area network.",
    answer: "A switch connects devices in a LAN and forwards frames only to the appropriate port/device. It uses MAC address information to decide where to send the frame, reducing unnecessary traffic compared with sending the frame to every device.",
    marking: [
      { mark: "B1", text: "connects devices within a LAN" },
      { mark: "B1", text: "forwards frames/data to correct device/port" },
      { mark: "B1", text: "uses MAC addresses / MAC address table" },
      { mark: "B1", text: "reduces unnecessary traffic / avoids sending to all devices where possible" },
    ],
    strict: [
      "Do not award for saying a switch routes packets across the internet.",
      "Do not require detailed frame format.",
      "Allow 'data packets' only if the LAN/MAC forwarding idea is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A school LAN needs to connect to the internet. Explain why a router is required.",
    answer: "A router is used to connect different networks, such as the school LAN and the internet. It forwards packets towards their destination using IP addresses and routing information. Traffic leaving the local network may be sent to the router/default gateway.",
    marking: [
      { mark: "B1", text: "router connects different networks / LAN to internet" },
      { mark: "B1", text: "forwards/routes packets" },
      { mark: "B1", text: "uses IP addresses/routing table/routing information" },
      { mark: "B1", text: "links to traffic leaving local network/default gateway scenario" },
    ],
    strict: [
      "Do not accept only 'router gives WiFi'.",
      "Do not award switch as the main device for connecting to the internet.",
      "Allow default gateway reference if it is linked to forwarding outside the local network.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A classroom has tablets, desktop PCs and a shared file server. Describe the roles of a NIC, WNIC, wireless access point, switch and server.",
    answer: "A NIC provides each desktop with a wired network interface, while a WNIC provides each tablet with a wireless network interface. The wireless access point connects the wireless tablets to the LAN. The switch connects LAN devices and forwards local frames to the appropriate port. The server provides a shared service such as file storage or authentication.",
    marking: [
      { mark: "B1", text: "NIC provides the desktop's wired network interface" },
      { mark: "B1", text: "WNIC provides the tablet's wireless network interface" },
      { mark: "B1", text: "wireless access point connects wireless devices to the LAN" },
      { mark: "B1", text: "switch connects LAN devices / forwards local frames to the appropriate port" },
      { mark: "B1", text: "server provides shared files, authentication or another valid shared service" },
    ],
    strict: [
      "Do not merge NIC/WNIC, access point, switch and server into 'they connect to the internet'.",
      "Do not award router functions because a router is not one of the five requested LAN hardware roles.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A business is choosing between the PSTN, a dedicated line and a cell phone network for internet access. State the role of a modem and compare two of these connection methods.",
    answer: "A modem converts between the data representation used by the computer or network and the signalling required by the access link. The PSTN uses the public telephone network and may provide a temporary or lower-capacity access link. A dedicated line supplies a permanent connection with more predictable availability or capacity but normally costs more. A cell phone network supplies wireless access through cellular infrastructure and supports mobility or places without a fixed line, but signal strength and shared coverage can vary.",
    marking: [
      { mark: "B1", text: "modem converts data/signals for the access link" },
      { mark: "B1", text: "identifies a valid characteristic of PSTN, dedicated line or cell phone/cellular network" },
      { mark: "B1", text: "identifies a valid contrasting characteristic of a second named method" },
      { mark: "B1", text: "develops the comparison using permanence, mobility, capacity, availability, signal or cost" },
    ],
    strict: [
      "Do not accept that a modem is simply a wireless access point or router.",
      "Do not award two unconnected method names without a comparison.",
      "Allow cellular network as equivalent to cell phone network.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Compare a switch and a router.",
    answer: "A switch is mainly used within a LAN to connect local devices and forward frames to the correct port using MAC addresses. A router connects different networks and forwards packets using IP addresses and routing information. For example, a switch may connect computers in a classroom, while a router connects that LAN to the internet.",
    marking: [
      { mark: "B1", text: "switch works within a LAN/local network" },
      { mark: "B1", text: "switch uses MAC addresses/ports to forward frames" },
      { mark: "B1", text: "router connects different networks" },
      { mark: "B1", text: "router uses IP addresses/routing information" },
      { mark: "B1", text: "valid scenario comparison such as classroom LAN vs internet connection" },
    ],
    strict: [
      "Do not award marks for only saying one is wired and one is wireless.",
      "Do not accept 'router is faster' as a comparison.",
      "Allow packet/frame wording variation if device boundary and address type are correct.",
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
      feedback.textContent = button.dataset.hook === "aprouter"
        ? "Correct. The access point handles wireless access; the router handles traffic to another network."
        : "Not quite. Separate local/wireless access from routing to an outside network.";
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#hardwareResult");
  const method = document.querySelector("#hardwareMethod");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Add the device role and the network boundary to earn explanation marks.`;
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
          <h4>Mark scheme</h4>
          <p><strong>Answer:</strong> ${question.answer}</p>
          ${renderStudentMarkPoints(question)}
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
