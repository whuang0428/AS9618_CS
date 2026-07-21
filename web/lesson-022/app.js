const scenarios = {
  server: {
    result: "Fibre-optic cable",
    method: "A fixed server-room link usually needs high bandwidth, stable performance and low electromagnetic interference. Fibre carries data as light pulses and is suitable for high-capacity links.",
  },
  classroom: {
    result: "Radio waves / WiFi",
    method: "Tablets move around the room, so mobility matters. Radio waves allow wireless access, but performance may be affected by walls, distance, interference and shared bandwidth.",
  },
  remote: {
    result: "Satellite",
    method: "A remote island may not have cable infrastructure. Satellite communication can cover large geographical areas, but latency and cost may be higher.",
  },
  desktop: {
    result: "Copper cable",
    method: "A fixed desktop PC can use a wired copper connection that is relatively cheap and easy to install for a local network. It may be less suitable over very long distances or near strong electromagnetic interference.",
  },
  buildings: {
    result: "Microwave link",
    method: "Two buildings with clear line of sight can use a directional microwave link. Alignment, obstacles and weather must be considered.",
  },
  factory: {
    result: "Fibre-optic cable",
    method: "Fibre is less affected by electromagnetic interference than copper, so it can be suitable in an electrically noisy environment.",
  },
};

const examples = {
  fibre: {
    title: "Example 1: fibre link between buildings",
    problem: "A school connects two server rooms in separate buildings and wants high bandwidth.",
    steps: [
      "The devices are fixed, so mobility is not the main requirement.",
      "The link needs high bandwidth and stable performance.",
      "Fibre-optic cable is suitable because it transmits data as light pulses and can support high data rates.",
      "A strong answer may also mention long distance or reduced electromagnetic interference.",
    ],
  },
  wifi: {
    title: "Example 2: wireless classroom",
    problem: "Students use tablets while moving around a classroom.",
    steps: [
      "A physical cable would reduce mobility and create a practical problem.",
      "Radio waves used by WiFi allow devices to connect wirelessly.",
      "The answer should include one limitation, such as interference, walls, shared bandwidth or security configuration.",
      "Do not say WiFi is always faster; the scenario is about mobility.",
    ],
  },
  satellite: {
    title: "Example 3: remote research station",
    problem: "A research station needs internet access in a remote area with no cable infrastructure.",
    steps: [
      "The location is remote, so laying cable may be impractical or too expensive.",
      "Satellite communication can cover large geographical areas.",
      "A limitation is higher latency because signals travel a long distance.",
      "A complete answer balances suitability with a drawback.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which wired medium transmits data as electrical signals?", accepted: ["copper", "copper cable"], answer: "Copper cable" },
  { id: "p2", prompt: "Which wired medium transmits data as pulses of light?", accepted: ["fibre", "fiber", "fibre optic", "fiber optic", "fibre-optic cable", "fiber-optic cable"], answer: "Fibre-optic cable" },
  { id: "p3", prompt: "Which wireless medium is used by WiFi?", accepted: ["radio", "radio waves", "radiowaves"], answer: "Radio waves" },
  { id: "p4", prompt: "Which wireless medium is useful for large geographical coverage in remote areas?", accepted: ["satellite", "satellites"], answer: "Satellite" },
  { id: "p5", prompt: "Name one factor that may reduce wireless performance.", accepted: ["interference", "walls", "obstacles", "distance", "weather", "congestion", "shared bandwidth"], answer: "Interference / obstacles / distance / weather / congestion" },
  { id: "p6", prompt: "Name one advantage of fibre optic over copper.", accepted: ["bandwidth", "high bandwidth", "less interference", "low interference", "long distance", "faster", "higher data rate"], answer: "High bandwidth / less electromagnetic interference / longer distance" },
  { id: "p7", prompt: "What does line of sight mean for a microwave link?", accepted: ["clear path", "unobstructed path", "no obstacle", "no obstacles", "direct path", "visible"], answer: "A clear unobstructed path between transmitter and receiver" },
  { id: "p8", prompt: "For tablets moving around a classroom, wired or wireless?", accepted: ["wireless", "radio waves", "wifi", "wi-fi"], answer: "Wireless / radio waves / WiFi" },
  { id: "p9", prompt: "Does fibre optic use electrical signals? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one disadvantage of satellite communication.", accepted: ["latency", "delay", "high latency", "cost", "expensive", "weather", "limited bandwidth"], answer: "High latency / cost / weather effects / limited capacity" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A school connects two server rooms that require a high-bandwidth fixed link. Explain why fibre-optic cable may be suitable.",
    answer: "Fibre-optic cable is suitable because it can provide high bandwidth for a fixed link between server rooms. It transmits data as pulses of light and is less affected by electromagnetic interference than copper cable. It can also be suitable over longer distances between buildings.",
    marking: [
      { mark: "B1", text: "states high bandwidth / high data rate" },
      { mark: "B1", text: "states data is transmitted using light pulses" },
      { mark: "B1", text: "not affected by electromagnetic interference" },
      { mark: "B1", text: "low attenuation / suitable over the fixed distance between server rooms or buildings" },
    ],
    strict: [
      "Do not accept only 'fibre is faster' without a feature or scenario link.",
      "Do not accept fibre uses electrical signals.",
      "Allow 'fiber' spelling.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Compare wired and wireless networks for a classroom that uses desktop PCs and tablets.",
    answer: "Wired connections such as copper cable are suitable for desktop PCs because the devices are fixed and can have a stable connection. Wireless connections using radio waves are suitable for tablets because the tablets can move around without cables. Wireless may be affected by interference, walls or shared bandwidth, while wired connections may be less convenient for mobile devices.",
    marking: [
      { mark: "B1", text: "wired connection suitable for fixed desktop PCs" },
      { mark: "B1", text: "wireless/radio waves suitable for mobile tablets" },
      { mark: "B1", text: "wired can provide stable/reliable connection" },
      { mark: "B1", text: "wireless can be affected by interference/obstacles/shared bandwidth" },
      { mark: "B1", text: "recommends wired links for fixed desktops and wireless links for tablets, linked to stability and mobility" },
    ],
    strict: [
      "Do not award marks for vague 'wired is better' or 'wireless is modern'.",
      "Do not confuse WiFi/radio waves with email or web protocols.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A remote weather station needs a network connection but has no cable infrastructure nearby. Explain why satellite communication may be used and give one drawback.",
    answer: "Satellite communication may be used because it can cover large geographical areas and can connect remote locations where cable infrastructure is not available. A drawback is that it may have higher latency because signals travel a long distance to and from the satellite. It may also be expensive or affected by weather.",
    marking: [
      { mark: "B1", text: "satellite suitable for remote location / large coverage" },
      { mark: "B1", text: "does not require nearby cable infrastructure" },
      { mark: "B1", text: "identifies a valid drawback such as high latency/cost/weather" },
      { mark: "B1", text: "explains latency as delay due to long signal distance or links drawback to scenario" },
    ],
    strict: [
      "Do not accept only 'satellite is wireless' without coverage/remote context.",
      "Do not require technical orbital details.",
      "Allow cost or weather as drawback if explained.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Describe two differences between copper cable and fibre-optic cable as transmission media.",
    answer: "Copper cable transmits data using electrical signals, whereas fibre-optic cable transmits data using pulses of light. Fibre-optic cable can support higher bandwidth and is less affected by electromagnetic interference, while copper cable is often cheaper and easier to install for short local links.",
    marking: [
      { mark: "B1", text: "copper uses electrical signals" },
      { mark: "B1", text: "fibre optic uses light pulses" },
      { mark: "B1", text: "fibre has higher bandwidth/longer distance/less electromagnetic interference" },
      { mark: "B1", text: "copper may be cheaper/easier for short local links" },
    ],
    strict: [
      "Do not award a mark for saying both use electricity.",
      "Do not award only for naming the two media.",
      "Allow a valid paired comparison even if wording differs.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A company considers a microwave link between two buildings. Describe conditions that make this suitable and issues that may affect it.",
    answer: "A microwave link may be suitable for a point-to-point connection between two buildings when there is a clear line of sight between directional antennas. It avoids laying a physical cable between the buildings. The link can be affected by obstacles, poor alignment or weather, and may have variable performance compared with a wired link.",
    marking: [
      { mark: "B1", text: "microwave link suitable for point-to-point communication" },
      { mark: "B1", text: "requires/benefits from clear line of sight" },
      { mark: "B1", text: "avoids laying cable or is useful between buildings" },
      { mark: "B1", text: "identifies issue such as obstacles/alignment/weather" },
      { mark: "B1", text: "links issue to reduced signal quality/performance/reliability" },
    ],
    strict: [
      "Do not accept satellite unless the answer is specifically about a satellite link.",
      "Do not accept only 'microwaves are fast'.",
      "Allow 'unobstructed path' for line of sight.",
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
      feedback.textContent = button.dataset.hook === "fibre"
        ? "Correct. Fibre is a transmission medium and the justification names high bandwidth and low interference."
        : "Not quite. Check whether the answer names a transmission medium and matches the fixed high-bandwidth scenario.";
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#mediumResult");
  const method = document.querySelector("#mediumMethod");
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
  renderExample("fibre");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Strong answers connect the medium to a real factor such as bandwidth, range, latency or interference.`;
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
