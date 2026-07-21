const scenarios = {
  receipt: {
    result: "Printer",
    method: "A printer produces a hard copy receipt that the customer can keep as a permanent transaction record.",
  },
  driver: {
    result: "Screen plus speaker",
    method: "A screen shows visual route information, while a speaker gives spoken directions without requiring the driver to keep looking away from the road.",
  },
  alarm: {
    result: "Speaker / buzzer plus warning light",
    method: "Audio output attracts attention quickly, while a visual warning can show location or remain visible after the sound starts.",
  },
  classroom: {
    result: "Projector or large display",
    method: "A large visual display is suitable because many students need to see the same diagram at once.",
  },
  greenhouse: {
    result: "Actuator",
    method: "An actuator converts the output signal into physical action, such as opening a vent when temperature is too high.",
  },
  exam: {
    result: "Monitor / display screen",
    method: "A display can show seat numbers and updates clearly without printing new lists each time a detail changes.",
  },
};

const examples = {
  receipt: {
    title: "Example 1: receipt at a checkout",
    problem: "Recommend an output device for giving a customer proof of purchase.",
    steps: [
      "Weak answer: use a printer because it is useful.",
      "Better answer: use a printer because it produces hard copy.",
      "Exam-ready answer: use a printer because it produces a permanent hard copy receipt that the customer can keep as evidence of the transaction.",
      "Boundary: a screen can show the total, but it does not give the customer a physical record.",
    ],
  },
  alarm: {
    title: "Example 2: factory warning system",
    problem: "A worker must notice an urgent machine fault immediately.",
    steps: [
      "A speaker or buzzer is suitable because audio output can attract attention without the worker looking at a screen.",
      "A warning light or display can show which machine has the fault.",
      "Using both can improve feedback because one handles urgency and the other gives detail.",
      "Do not claim a printer is best for urgent warnings; printed output is too slow for immediate reaction.",
    ],
  },
  greenhouse: {
    title: "Example 3: automatic greenhouse vent",
    problem: "A computer system must open a vent when temperature is too high.",
    steps: [
      "A sensor captures temperature as input, but it does not open the vent.",
      "The processor decides whether the vent should open.",
      "An actuator is the output device because it causes the physical movement.",
      "The suitability reason is control: it changes the environment automatically without manual action.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which output device produces hard copy?", accepted: ["printer"], answer: "Printer" },
  { id: "p2", prompt: "Which output device produces audio warnings?", accepted: ["speaker", "buzzer"], answer: "Speaker / buzzer" },
  { id: "p3", prompt: "Which output device causes physical movement or action?", accepted: ["actuator"], answer: "Actuator" },
  { id: "p4", prompt: "Which output device is suitable for showing a live dashboard?", accepted: ["monitor", "screen", "display"], answer: "Monitor / screen" },
  { id: "p5", prompt: "A projector is most suitable for one user or a large audience?", accepted: ["large audience", "audience", "many users", "class"], answer: "Large audience" },
  { id: "p6", prompt: "Is a sensor normally input or output?", accepted: ["input"], answer: "Input" },
  { id: "p7", prompt: "Name one reason audio output may be suitable.", accepted: ["warning", "urgent", "does not need looking", "no need to look", "accessibility", "attention"], answer: "Warning / urgent / no need to look" },
  { id: "p8", prompt: "Name one limitation of printed output.", accepted: ["slow", "uses paper", "uses ink", "not live", "not suitable for changing data", "cost"], answer: "Slow / uses consumables / not live" },
  { id: "p9", prompt: "What term means output shown on a screen rather than printed?", accepted: ["soft copy", "softcopy"], answer: "Soft copy" },
  { id: "p10", prompt: "In an exam answer, should an output choice be linked to the scenario?", accepted: ["yes", "linked", "justify", "justified"], answer: "Yes" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A shop needs to give customers proof of purchase. Explain why a printer is a suitable output device.",
    answer: "A printer is suitable because it produces a hard copy receipt. The receipt can be kept by the customer as permanent evidence of the transaction. This is more suitable than only displaying the total on a screen because the screen output disappears or changes after the sale.",
    marking: [
      { mark: "B1", text: "identifies printer as output device / produces printed output" },
      { mark: "B1", text: "states hard copy/permanent physical record" },
      { mark: "B1", text: "links record to receipt/proof of purchase/customer evidence" },
      { mark: "B1", text: "valid comparison or reason why screen-only output is insufficient" },
    ],
    strict: [
      "Do not award a mark for vague 'printer is better' without a cause.",
      "Do not accept that a printer stores the transaction.",
      "Allow label printer where the output purpose is a physical label or record.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A factory machine fault must be noticed quickly by workers. Recommend two output methods and justify each.",
    answer: "A speaker or buzzer is suitable because an audio warning can attract attention quickly even when a worker is not looking at a display. A warning light or screen is also suitable because it can show which machine has the fault or keep the warning visible. Together they provide urgent alerting and useful detail.",
    marking: [
      { mark: "B1", text: "suitable first output such as speaker/buzzer" },
      { mark: "B1", text: "audio justification linked to urgent attention/no need to look" },
      { mark: "B1", text: "suitable second output such as warning light/screen" },
      { mark: "B1", text: "visual justification linked to location/detail/persistent warning" },
      { mark: "B1", text: "both choices linked to factory fault scenario" },
    ],
    strict: [
      "Do not award input devices such as sensor as output methods.",
      "Do not accept two output names with no justification for an explain/recommend question.",
      "Allow haptic output if linked to workers carrying wearable devices.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain the difference between a sensor and an actuator in a control system.",
    answer: "A sensor is an input device because it captures data from the environment, such as temperature. An actuator is an output device because it converts the computer's output signal into physical action, such as opening a vent or starting a motor.",
    marking: [
      { mark: "B1", text: "sensor identified as input device" },
      { mark: "B1", text: "sensor captures environmental/physical data" },
      { mark: "B1", text: "actuator identified as output device" },
      { mark: "B1", text: "actuator causes physical movement/action/control" },
    ],
    strict: [
      "Do not accept 'sensor outputs temperature' unless input role is clear.",
      "Do not accept 'actuator displays data' as the main role.",
      "Allow examples such as motor, valve, heater, brake if linked to physical action.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Compare using a screen and a printer for outputting travel directions.",
    answer: "A screen is suitable for live travel directions because it can update as the route changes and can show maps. A printer produces a hard copy that can be kept, but it is less suitable for live navigation because the printed route may become out of date if conditions change.",
    marking: [
      { mark: "B1", text: "screen provides visual soft copy/live display" },
      { mark: "B1", text: "screen advantage linked to updates/maps/changing route" },
      { mark: "B1", text: "printer provides hard copy/permanent output" },
      { mark: "B1", text: "printer limitation linked to route changes/out-of-date output" },
    ],
    strict: [
      "Do not accept 'screen is easier' without explanation.",
      "Do not award both marks for printer if answer only says it uses paper.",
      "Allow audio as an additional method, but the comparison must still address screen and printer.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A school hall presentation must be seen and heard by 200 people. Recommend suitable output devices and explain your choices.",
    answer: "A projector or large display is suitable because it shows visual output large enough for the audience to see. Speakers are suitable because they output sound at enough volume for the hall. The choices fit the large audience and presentation context better than a small monitor or headphones.",
    marking: [
      { mark: "B1", text: "suitable visual output such as projector/large display" },
      { mark: "B1", text: "visual justification linked to large audience/visibility" },
      { mark: "B1", text: "suitable audio output such as speakers" },
      { mark: "B1", text: "audio justification linked to volume/hearing across hall" },
    ],
    strict: [
      "Do not award headphones as a suitable main output for the whole hall unless individually issued and justified.",
      "Do not accept monitor alone unless large display visibility is clear.",
      "Allow interactive whiteboard if described as a large shared visual display.",
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
    speaker: "Speaker: audio output is useful because the driver can hear a warning without reading text.",
    screen: "Display: visual output can show detail such as distance, icons or warning messages.",
    haptic: "Haptic motor: physical feedback can warn the driver through vibration.",
    actuator: "Actuator: output becomes action when the system applies brakes or moves a mechanism.",
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
  renderExample("receipt");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, ask: what output is produced, who receives it, and why is it suitable?`;
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
