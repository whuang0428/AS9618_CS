const scenarios = {
  greenhouse: { result: "Microwave oven: dedicated appliance computer", method: "Its embedded system performs cooking, timing and interface tasks for one appliance. A small set of controls and predictable repeated operation are more important than running unrelated applications." },
  door: { result: "Network printer: dedicated document-output system", method: "The processor, memory and interfaces are selected to receive, queue and print documents. The device does not need the flexibility or rich interface of a general-purpose computer." },
  traffic: { result: "Home router: dedicated network device", method: "Its embedded software and hardware are designed for network communication tasks. Low power, continuous operation and reliability matter more than supporting arbitrary desktop software." },
  washer: { result: "Washing machine: computer built into a larger device", method: "The embedded system is part of the appliance, has a dedicated set of wash-cycle tasks and uses only the controls and display required by those tasks." },
  car: { result: "Smartwatch: compact low-power embedded device", method: "A microcontroller or integrated processor supports a defined set of wearable functions within tight power, size and interface constraints." },
  heater: { result: "Laptop: general-purpose computer", method: "A laptop is designed to run many different user-selected applications and provide a rich interface. It is the comparison case, not the embedded-system example." },
};

const examples = {
  greenhouse: {
    title: "Example 1: microwave oven",
    problem: "Explain why a microwave oven contains an embedded system.",
    steps: [
      "The computer is built into the appliance.",
      "It performs a dedicated set of cooking, timing and display tasks.",
      "It needs only a limited interface for those tasks.",
      "Its hardware can be selected for low cost and predictable repeated operation.",
    ],
  },
  door: {
    title: "Example 2: home router",
    problem: "Explain two design priorities for a router's embedded system.",
    steps: [
      "The router performs dedicated network communication tasks.",
      "It is expected to operate continuously and reliably.",
      "Low power use reduces heat and running cost.",
      "Its processor, memory and interfaces are chosen for those tasks rather than general desktop software.",
    ],
  },
  washing: {
    title: "Example 3: washing machine",
    problem: "Compare the washing machine computer with a laptop.",
    steps: [
      "The washing machine computer is built into a larger device.",
      "It performs a dedicated set of appliance tasks.",
      "It has a limited interface and task-specific resources.",
      "The laptop is general purpose and runs many different applications.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Is an embedded system designed for a general or dedicated purpose?", accepted: ["dedicated", "specific", "dedicated purpose", "specific purpose"], answer: "A dedicated or specific purpose." },
  { id: "p2", prompt: "Is an embedded system normally part of a larger device? yes or no.", accepted: ["yes"], answer: "Yes." },
  { id: "p3", prompt: "Name the chip that can integrate CPU, memory and input/output interfaces.", accepted: ["microcontroller"], answer: "Microcontroller." },
  { id: "p4", prompt: "Which usually has the richer user interface: an embedded system or a general-purpose computer?", accepted: ["general purpose computer", "general-purpose computer"], answer: "General-purpose computer." },
  { id: "p5", prompt: "Name one valid embedded-system example.", accepted: ["washing machine", "microwave", "microwave oven", "router", "printer", "smartwatch"], answer: "For example: washing machine, microwave oven, router, printer or smartwatch." },
  { id: "p6", prompt: "Give one common embedded-system design priority.", accepted: ["low cost", "low power", "reliability", "reliable", "small size", "predictable", "real time", "real-time"], answer: "Low cost, low power, reliability, compact size or predictable response." },
  { id: "p7", prompt: "Does physical size alone define an embedded system? yes or no.", accepted: ["no"], answer: "No. Its dedicated role inside a larger device is the key distinction." },
  { id: "p8", prompt: "Which runs many unrelated applications: embedded or general-purpose computer?", accepted: ["general purpose", "general-purpose", "general purpose computer", "general-purpose computer"], answer: "General-purpose computer." },
  { id: "p9", prompt: "Name one component commonly integrated into a microcontroller besides the CPU.", accepted: ["memory", "input output", "input/output", "i/o", "io", "interface", "interfaces"], answer: "Memory or input/output interfaces." },
  { id: "p10", prompt: "Why can a limited interface suit an embedded system?", accepted: ["specific task", "dedicated task", "only required controls", "fewer controls", "limited task"], answer: "It needs only the controls and displays required for its dedicated task." },
];


function renderStudentMarkPoints(question) {
  const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const guidance = (question.strict || []).join(" ");
  return `<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>${question.marking.map((point, pointIndex) => `<div class="mark-scheme-row" role="row"><span role="cell">${escape(point.text)}</span><span role="cell">${pointIndex === 0 ? escape(guidance) : ""}</span><strong role="cell">1</strong></div>`).join("")}</div>`;
}
const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Define an embedded system and give one example.",
    answer: "An embedded system is a computer system built into a larger device and designed to perform a specific task or set of tasks. A washing machine or microwave oven is a valid example.",
    marking: [
      { mark: "B1", text: "computer system built into a larger device" },
      { mark: "B1", text: "designed for a specific/dedicated task" },
      { mark: "B1", text: "valid embedded-system example" },
    ],
    strict: [
      "Do not accept only 'a small computer' for full definition credit.",
      "Do not accept a laptop or desktop as the embedded example.",
      "Allow any clearly justified embedded device.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Describe four characteristics of an embedded system.",
    answer: "It is built into a larger device, performs a dedicated task, often has a limited interface and is designed around priorities such as low cost, low power and reliable repeated operation.",
    marking: [
      { mark: "B1", text: "built into a larger device" },
      { mark: "B1", text: "specific/dedicated purpose" },
      { mark: "B1", text: "limited interface or task-specific resources" },
      { mark: "B1", text: "valid priority such as low cost, low power or reliability" },
    ],
    strict: [
      "Do not award four repetitions of 'small'.",
      "Allow another valid characteristic linked to embedded use.",
      "Do not require a named device.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain what a microcontroller is and why it suits many embedded systems.",
    answer: "A microcontroller can integrate a CPU, memory and input/output interfaces on one chip. This can reduce size, cost and power use while providing the processing and connections needed for a dedicated task.",
    marking: [
      { mark: "B1", text: "identifies CPU/processor integration" },
      { mark: "B1", text: "identifies memory integration" },
      { mark: "B1", text: "identifies input/output interfaces" },
      { mark: "B1", text: "links integration to size, cost, power or dedicated use" },
    ],
    strict: [
      "Do not accept only 'a tiny CPU'.",
      "Award equivalent descriptions of integrated components.",
      "Do not require a particular manufacturer or architecture.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Compare an embedded system with a general-purpose computer, including one benefit and one drawback of embedded design.",
    answer: "An embedded system is built into a larger device for a specific task, often with a limited interface and task-specific resources. This can reduce cost, size and power use and provide predictable automatic operation. However, limited processing, storage or interfaces can make new functions difficult to add, and failure of the controller may stop the larger device. A general-purpose computer runs many different programs and provides greater flexibility and a richer interface.",
    marking: [
      { mark: "B1", text: "embedded system built into larger device" },
      { mark: "B1", text: "embedded system has specific purpose" },
      { mark: "B1", text: "benefit such as lower cost/power/size or predictable automatic operation" },
      { mark: "B1", text: "drawback such as limited resources/upgrading/interface or controller failure consequence" },
      { mark: "B1", text: "general-purpose computer runs many programs" },
      { mark: "B1", text: "general-purpose computer offers flexibility/richer interface" },
    ],
    strict: [
      "Do not accept only 'embedded is small'.",
      "The benefit and drawback must state a consequence rather than a bare adjective.",
      "Comparisons should use matched dimensions such as purpose, interface or flexibility.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A company is designing a battery-powered smartwatch. Justify three embedded-system design priorities.",
    answer: "Low power use extends battery life; compact integrated hardware fits the wearable device; reliable predictable operation supports continuous everyday use. Cost and a simple task-focused interface are also relevant.",
    marking: [
      { mark: "B1", text: "identifies low power" },
      { mark: "B1", text: "links low power to battery life" },
      { mark: "B1", text: "identifies compact/integrated hardware and links it to wearable size" },
      { mark: "B1", text: "identifies reliability or predictable operation" },
      { mark: "B1", text: "links the priority to continuous smartwatch use" },
    ],
    strict: [
      "Do not award a priority without a smartwatch consequence where a link is required.",
      "Allow cost or limited interface as an alternative developed priority.",
      "Do not require control-system component descriptions.",
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
    purpose: "Dedicated purpose: the appliance computer performs a defined set of washing tasks rather than arbitrary user programs.",
    integrated: "Integration: a microcontroller can combine CPU, memory and input/output interfaces on one chip.",
    interface: "Limited interface: the appliance needs only the buttons and display required for its dedicated task.",
    reliability: "Reliability: the embedded system is expected to repeat its task predictably over many cycles.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#componentResult");
  const method = document.querySelector("#componentMethod");
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
  renderExample("greenhouse");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check purpose, integration, interface and design priorities.`;
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index}`;
    return `
      <article class="exam-card">
        <div class="exam-head"><h3>${question.title}</h3><span>${question.marks}</span></div>
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
