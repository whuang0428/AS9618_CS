const scenarios = {
  greenhouse: {
    result: "Temperature sensor + fan motor / vent actuator",
    method: "The temperature sensor reads the greenhouse temperature. The controller compares it with a threshold. If it is too high, a fan motor or vent actuator is switched on, then readings continue so the output can change later.",
  },
  irrigation: {
    result: "Moisture sensor + pump / valve actuator",
    method: "A soil moisture sensor detects dryness. The controller compares the reading with a threshold. If the soil is too dry, it activates a pump or valve, then uses later readings as feedback.",
  },
  street: {
    result: "Light sensor + lamp output",
    method: "A light sensor detects light intensity. If the reading is below a threshold, the controller sends an output signal to switch the street lamp on.",
  },
  parking: {
    result: "Distance/proximity sensor + buzzer/display",
    method: "A distance sensor measures how close an obstacle is. The processor compares the distance with safe limits and triggers a buzzer, display or haptic output.",
  },
  freezer: {
    result: "Temperature sensor + alarm output",
    method: "A temperature sensor detects that the freezer is too warm. The controller compares the reading with a maximum threshold and switches on a buzzer or warning light.",
  },
  door: {
    result: "Motion/proximity sensor + door motor actuator",
    method: "A sensor detects a person approaching. The controller decides whether to open the door and sends an output signal to a motor actuator.",
  },
};

const examples = {
  greenhouse: {
    title: "Example 1: greenhouse cooling",
    problem: "Explain how a greenhouse fan can be controlled automatically.",
    steps: [
      "A temperature sensor reads the air temperature.",
      "The processor compares the reading with a stored threshold, for example 28 degrees Celsius.",
      "If the temperature is above the threshold, an output signal activates a fan motor or opens a vent.",
      "The system keeps taking readings so the fan can be turned off when the temperature falls.",
    ],
  },
  irrigation: {
    title: "Example 2: soil irrigation",
    problem: "Explain how a closed-loop irrigation system controls watering.",
    steps: [
      "A moisture sensor measures the water content of the soil.",
      "The controller compares the reading with a dryness threshold.",
      "If the soil is too dry, a pump or valve actuator starts water flow.",
      "New moisture readings provide feedback so watering can stop when the soil is wet enough.",
    ],
  },
  parking: {
    title: "Example 3: car parking warning",
    problem: "Explain how a parking sensor warning changes as the car approaches an obstacle.",
    steps: [
      "A distance or proximity sensor measures the distance to the obstacle.",
      "The processor compares the distance with stored ranges.",
      "If the obstacle is close, output such as a buzzer or display is triggered.",
      "As distance decreases, the warning may become faster or louder based on repeated readings.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which device detects a physical quantity?", accepted: ["sensor"], answer: "Sensor" },
  { id: "p2", prompt: "Which device causes physical action?", accepted: ["actuator"], answer: "Actuator" },
  { id: "p3", prompt: "Which sensor detects light intensity?", accepted: ["light sensor"], answer: "Light sensor" },
  { id: "p4", prompt: "Which sensor is suitable for greenhouse temperature control?", accepted: ["temperature sensor"], answer: "Temperature sensor" },
  { id: "p5", prompt: "Which actuator might move an automatic door?", accepted: ["motor", "door motor", "actuator"], answer: "Motor / actuator" },
  { id: "p6", prompt: "What value is used as a boundary for deciding an action?", accepted: ["threshold"], answer: "Threshold" },
  { id: "p7", prompt: "Open-loop or closed-loop: uses sensor feedback to adjust output?", accepted: ["closed loop", "closed-loop"], answer: "Closed-loop" },
  { id: "p8", prompt: "Open-loop or closed-loop: sprinkler runs for a fixed time without measuring soil?", accepted: ["open loop", "open-loop"], answer: "Open-loop" },
  { id: "p9", prompt: "Does a sensor itself perform the physical action? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one actuator used in a control system.", accepted: ["motor", "valve", "heater", "lamp", "light", "lock", "brake", "pump", "fan"], answer: "Motor / valve / heater / lamp / lock / pump" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe how a greenhouse cooling system can use a temperature sensor and actuator.",
    answer: "A temperature sensor captures the current greenhouse temperature. The processor/controller compares this reading with a stored threshold. If the temperature is above the threshold, it sends an output signal to an actuator such as a fan motor or vent motor. The sensor continues to take readings so the output can be changed or stopped when the temperature falls.",
    marking: [
      { mark: "B1", text: "temperature sensor captures/inputs temperature reading" },
      { mark: "B1", text: "processor/controller receives or processes reading" },
      { mark: "B1", text: "reading compared with threshold/rule" },
      { mark: "B1", text: "output sent to actuator such as fan/vent motor" },
      { mark: "B1", text: "feedback/repeated readings adjust or stop output" },
    ],
    strict: [
      "Do not award actuator mark if the answer says the sensor cools the greenhouse.",
      "Do not require a numeric threshold.",
      "Allow microcontroller in place of processor/controller.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the difference between a sensor and an actuator.",
    answer: "A sensor is an input device that detects a physical quantity such as temperature, light, pressure or distance. An actuator is an output device that converts an electrical signal into physical action, such as moving a motor, opening a valve or switching a heater.",
    marking: [
      { mark: "B1", text: "sensor identified as input device" },
      { mark: "B1", text: "sensor detects physical quantity/condition" },
      { mark: "B1", text: "actuator identified as output device" },
      { mark: "B1", text: "actuator causes physical action/movement/control" },
    ],
    strict: [
      "Do not accept 'sensor performs the action' for actuator credit.",
      "Do not accept 'actuator measures the environment' as its role.",
      "Allow examples such as motor, pump, valve, heater, lamp or brake.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A street light turns on automatically when it is dark. Describe the control system.",
    answer: "A light sensor detects the light intensity. The controller compares the reading with a stored threshold. If the light level is below the threshold, the controller sends an output signal to switch on the lamp. The sensor continues to take readings so the lamp can be switched off when the light level rises.",
    marking: [
      { mark: "B1", text: "light sensor detects light intensity" },
      { mark: "B1", text: "controller/processes reading" },
      { mark: "B1", text: "reading compared with threshold for darkness" },
      { mark: "B1", text: "lamp/light output switched on" },
      { mark: "B1", text: "continued readings/feedback allow switch off or adjustment" },
    ],
    strict: [
      "Do not accept an answer that identifies the light sensor as the lamp.",
      "Do not require analogue-to-digital conversion unless asked.",
      "Allow LED/street lamp as output device.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Compare open-loop and closed-loop control systems.",
    answer: "An open-loop system carries out an action without using feedback about the result, such as a timer that waters plants for a fixed time. A closed-loop system uses sensor feedback to adjust output, such as a moisture sensor controlling a pump until soil is wet enough.",
    marking: [
      { mark: "B1", text: "open-loop has no feedback/check of the result" },
      { mark: "B1", text: "open-loop output is not adjusted in response to the measured result" },
      { mark: "B1", text: "closed-loop uses sensor feedback about the result" },
      { mark: "B1", text: "closed-loop uses feedback to adjust or stop the output" },
    ],
    strict: [
      "Do not accept 'closed loop repeats forever' as the definition.",
      "Do not require advanced control theory.",
      "Allow thermostat or greenhouse examples for closed loop.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A car parking system warns the driver when the car is close to an obstacle. Describe how sensors, processing and output devices are used.",
    answer: "A distance or proximity sensor measures how close the obstacle is. The processor receives the sensor reading and compares it with stored distance limits. If the obstacle is within a warning range, it sends output to a buzzer, display or haptic device. As the car gets closer, repeated readings can make the warning more frequent, louder or more urgent.",
    marking: [
      { mark: "B1", text: "distance/proximity sensor measures obstacle distance" },
      { mark: "B1", text: "processor/controller receives/processes sensor reading" },
      { mark: "B1", text: "reading compared with stored limit/range" },
      { mark: "B1", text: "valid output device such as buzzer/display/haptic device" },
      { mark: "B1", text: "output changes or warning triggered when too close" },
      { mark: "B1", text: "repeated readings/feedback update warning as distance changes" },
    ],
    strict: [
      "Do not award sensor mark for camera unless distance/proximity detection is made clear.",
      "Do not accept output device alone without processing sequence for full credit.",
      "Allow visual/audio/haptic output if role is clear.",
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
    sensor: "Sensor: it reports the temperature reading. It does not physically cool anything.",
    compare: "Processor/controller: it compares the reading with a threshold or rule.",
    actuator: "Actuator: fan motor or vent motor creates the physical cooling action.",
    feedback: "Feedback: repeated readings show whether the action worked and whether output should change.",
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, check sensor, threshold, actuator and feedback roles.`;
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
