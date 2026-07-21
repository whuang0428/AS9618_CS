const recommendations = {
  school: {
    result: "Likely choice: star topology on a LAN.",
    method: "A school computer room is a local area. A star topology lets each device connect to a central switch, so individual cable/device faults are easier to isolate.",
  },
  temporary: {
    result: "Possible choice: bus topology, with clear limitations.",
    method: "A bus can be cheap and simple for a very small temporary network, but the shared backbone can become a bottleneck and a single point of failure.",
  },
  critical: {
    result: "Likely choice: mesh or redundant star design.",
    method: "Critical systems benefit from multiple paths or redundant central devices. The reason is fault tolerance, not because mesh sounds impressive.",
  },
  branches: {
    result: "Network type: WAN.",
    method: "Branches in different countries require communication over a large geographical area and may use telecommunications provider infrastructure.",
  },
};

const examples = {
  lan: {
    title: "Example 1: deciding LAN or WAN",
    problem: "A school connects computers in two classrooms and a local server.",
    steps: [
      "The devices are in a limited geographical area.",
      "The school can own and manage the network equipment.",
      "This is a LAN, not a WAN.",
      "Do not say LAN only because it is wireless or fast; use area and ownership.",
    ],
  },
  star: {
    title: "Example 2: choosing star topology",
    problem: "A computer room needs 30 PCs connected to a switch.",
    steps: [
      "Each PC has its own connection to the central switch.",
      "If one cable fails, usually only that device is affected.",
      "Adding or removing a device is straightforward.",
      "The central switch is a possible single point of failure.",
    ],
  },
  mesh: {
    title: "Example 3: choosing mesh topology",
    problem: "A hospital monitoring network needs high availability.",
    steps: [
      "A mesh network can provide multiple paths between devices.",
      "If one link fails, data may still travel by another path.",
      "This improves fault tolerance.",
      "The trade-off is higher cost and complexity.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What does LAN stand for?", accepted: ["local area network"], answer: "Local Area Network" },
  { id: "p2", prompt: "What does WAN stand for?", accepted: ["wide area network"], answer: "Wide Area Network" },
  { id: "p3", prompt: "Name one purpose of a network.", accepted: ["communication", "resource sharing", "sharing resources", "collaboration", "central management", "file sharing"], answer: "Communication / resource sharing / collaboration / central management" },
  { id: "p4", prompt: "A school network in one building is usually a LAN or WAN?", accepted: ["lan", "local area network"], answer: "LAN" },
  { id: "p5", prompt: "A bank connects branches in several countries. LAN or WAN?", accepted: ["wan", "wide area network"], answer: "WAN" },
  { id: "p6", prompt: "Which topology connects devices to a central switch or hub?", accepted: ["star", "star topology"], answer: "Star topology" },
  { id: "p7", prompt: "Which topology has many possible paths between nodes?", accepted: ["mesh", "mesh topology"], answer: "Mesh topology" },
  { id: "p8", prompt: "In a bus topology, what shared component can become a single point of failure?", accepted: ["backbone", "backbone cable", "bus", "main cable"], answer: "The backbone/main cable" },
  { id: "p9", prompt: "Name one disadvantage of mesh topology.", accepted: ["cost", "expensive", "complex", "complexity", "difficult to install", "lots of cabling"], answer: "High cost / complexity / more cabling" },
  { id: "p10", prompt: "Bandwidth means capacity or delay?", accepted: ["capacity"], answer: "Capacity" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A school connects computers, printers and a file server within one site. Explain two purposes of using a network in this situation.",
    answer: "The network allows resource sharing, such as several computers using the same printer or file server. It also supports communication/collaboration because users can exchange files or access shared services through the network.",
    marking: [
      { mark: "B1", text: "identifies resource sharing" },
      { mark: "B1", text: "links resource sharing to printer/server/files in the school" },
      { mark: "B1", text: "identifies communication/collaboration/central management" },
      { mark: "B1", text: "links second purpose to the school scenario" },
    ],
    strict: [
      "Do not accept only 'it is easier' without saying what is easier and why.",
      "Do not require internet access as a purpose.",
      "Award different purposes only; repeated resource-sharing examples cannot earn both purpose marks.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Compare a LAN and a WAN.",
    answer: "A LAN covers a limited area such as a building or school site and is usually owned or managed by one organisation. A WAN covers a large geographical area and often uses telecommunications provider infrastructure to connect separate sites.",
    marking: [
      { mark: "B1", text: "LAN covers a limited/local geographical area" },
      { mark: "B1", text: "LAN is usually privately owned/managed by one organisation" },
      { mark: "B1", text: "WAN covers a large geographical area" },
      { mark: "B1", text: "WAN may use telecommunications provider/public infrastructure" },
    ],
    strict: [
      "Do not accept only 'LAN is small, WAN is big' for full credit.",
      "Do not say LAN is always wired or WAN is always wireless.",
      "Examples may support but not replace a clear comparison.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A computer room uses a star topology. Explain two advantages and one disadvantage of this topology.",
    answer: "In a star topology, each computer is connected to a central switch or hub. One advantage is that a cable fault usually affects only one device. Another advantage is that devices can be added or removed more easily. A disadvantage is that if the central switch fails, communication through the network may fail.",
    marking: [
      { mark: "B1", text: "recognises devices connect to a central switch/hub" },
      { mark: "B1", text: "individual cable/device failure affects only that device" },
      { mark: "B1", text: "easy to add/remove devices or isolate faults" },
      { mark: "B1", text: "central switch/hub is a single point of failure" },
      { mark: "B1", text: "links disadvantage to loss of communication/network failure" },
    ],
    strict: [
      "Do not accept 'faster' without explaining why or compared with what.",
      "Do not award two marks for the same advantage repeated in different words.",
      "Allow 'hub' where older terminology is used, but switch is preferred.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why a mesh topology may be suitable for a critical hospital monitoring network.",
    answer: "A mesh topology can provide multiple paths between devices. If one link fails, data may still be sent by another route. This improves fault tolerance and availability, which is important because hospital monitoring data may be time-critical.",
    marking: [
      { mark: "B1", text: "mesh provides multiple paths/connections" },
      { mark: "B1", text: "communication can continue if one link/path fails" },
      { mark: "B1", text: "improves fault tolerance/reliability/availability" },
      { mark: "B1", text: "links reliability to critical hospital monitoring context" },
    ],
    strict: [
      "Do not accept only 'mesh is more secure'.",
      "Do not require a fully connected mesh unless the answer specifies it.",
      "Award scenario-linked consequence, not a generic definition alone.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A student says bandwidth and latency both mean the speed of a network. Explain why this is inaccurate.",
    answer: "Bandwidth is the capacity of a connection, often the amount of data that can be transferred per second. Latency is the delay before or during transfer. A network may have high bandwidth but still feel slow if latency is high.",
    marking: [
      { mark: "B1", text: "bandwidth is capacity / amount of data transferred per second" },
      { mark: "B1", text: "latency is delay" },
      { mark: "B1", text: "explains they affect performance differently" },
    ],
    strict: [
      "Do not accept only 'bandwidth is speed'.",
      "Do not require numerical units.",
      "Allow examples such as video call delay if clearly linked to latency.",
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
      feedback.textContent = button.dataset.hook === "resource"
        ? "Correct. Several computers using one printer is resource sharing."
        : "Not the main purpose here. The clue is that many computers use the same printer.";
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
  renderExample("lan");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For explanation questions, add a comparison basis and a consequence.`;
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
  setupRecommendationTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
