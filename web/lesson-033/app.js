const scenarios = {
  greenhouse: {
    result: "Temperature sensor -> microcontroller -> fan actuator",
    method: "The temperature sensor captures the current temperature. The microcontroller compares it with a threshold. If the temperature is too high, it sends an output signal to the fan actuator/motor, then keeps checking the sensor reading.",
  },
  door: {
    result: "Proximity sensor -> microcontroller -> door motor",
    method: "The sensor detects a person approaching. The microcontroller checks the rule for opening. The motor actuator opens the door, and the system continues checking so it can close safely later.",
  },
  traffic: {
    result: "Vehicle sensor -> controller -> traffic lights",
    method: "A sensor detects vehicles. The controller applies a timing or priority rule. Output signals change the lights, then sensor readings continue to update the sequence.",
  },
  washer: {
    result: "Door/water sensors -> microcontroller -> lock, valve or motor",
    method: "Sensors check conditions such as door locked and water level. The microcontroller only starts the motor when conditions meet stored rules.",
  },
  car: {
    result: "Distance sensor -> controller -> warning output",
    method: "A distance sensor measures how close the obstacle is. The controller compares it with a safe distance and triggers a buzzer, display or haptic output if needed.",
  },
  heater: {
    result: "Temperature sensor -> microcontroller -> heater actuator",
    method: "The sensor reads room temperature. The microcontroller compares it with the target. It switches the heater off when the target is reached and back on if temperature falls.",
  },
};

const examples = {
  greenhouse: {
    title: "Example 1: greenhouse fan",
    problem: "Explain how an embedded system controls a fan when temperature is too high.",
    steps: [
      "A temperature sensor reads the current greenhouse temperature.",
      "The microcontroller compares the reading with a stored threshold, such as 28°C.",
      "If the reading is above the threshold, the microcontroller sends a signal to a fan motor/actuator.",
      "The sensor continues to take readings, so the fan can be switched off when the temperature falls.",
    ],
  },
  door: {
    title: "Example 2: automatic door",
    problem: "Explain how an automatic door opens when a person approaches.",
    steps: [
      "A proximity or motion sensor detects a person near the door.",
      "The microcontroller receives the input and checks whether the door should open.",
      "It sends an output signal to a motor actuator to open the door.",
      "The system keeps checking sensors so the door can close when the person has passed safely.",
    ],
  },
  washing: {
    title: "Example 3: washing machine safety",
    problem: "Explain why the motor should not start unless the door is locked.",
    steps: [
      "A door sensor detects whether the door is closed and locked.",
      "The microcontroller checks the door sensor before starting the wash program.",
      "If the condition is true, it can activate the motor and water valve actuators.",
      "If the condition is false, it prevents the motor from starting and may output an error message.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What device detects a physical condition such as temperature?", accepted: ["sensor"], answer: "Sensor" },
  { id: "p2", prompt: "What device causes physical action such as opening a valve?", accepted: ["actuator"], answer: "Actuator" },
  { id: "p3", prompt: "An embedded system is designed for a general or specific task?", accepted: ["specific", "specific task"], answer: "Specific task" },
  { id: "p4", prompt: "Which component compares sensor data with a stored rule?", accepted: ["microcontroller", "processor", "controller"], answer: "Microcontroller / processor" },
  { id: "p5", prompt: "Name one example of an embedded system.", accepted: ["washing machine", "traffic light", "automatic door", "greenhouse", "car", "microwave", "thermostat"], answer: "Washing machine / traffic light / automatic door / thermostat" },
  { id: "p6", prompt: "In a greenhouse fan system, which sensor is likely used?", accepted: ["temperature sensor"], answer: "Temperature sensor" },
  { id: "p7", prompt: "In an automatic door, what actuator might open the door?", accepted: ["motor", "door motor", "actuator"], answer: "Motor / actuator" },
  { id: "p8", prompt: "Does the sensor itself turn on the fan? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "What word describes repeated sensor reading and response?", accepted: ["loop", "control loop", "feedback loop"], answer: "Control loop / feedback loop" },
  { id: "p10", prompt: "Name one reason embedded systems often use microcontrollers.", accepted: ["low cost", "low power", "small", "reliable", "specific task", "integrated", "i/o"], answer: "Low cost / low power / integrated I/O / reliable for a specific task" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Define an embedded system and give one example.",
    answer: "An embedded system is a computer system built into a larger device and designed to perform a specific task or set of tasks. An example is the control system inside a washing machine, traffic light controller, microwave oven or automatic door.",
    marking: [
      { mark: "B1", text: "computer/control system built into a larger device" },
      { mark: "B1", text: "designed for a specific/dedicated task" },
      { mark: "B1", text: "valid embedded-system example" },
    ],
    strict: [
      "Do not accept only 'a small computer' for full definition credit.",
      "Do not accept a general-purpose laptop/desktop as the example unless embedded in a larger control system.",
      "Allow examples such as car engine control, washing machine, microwave, traffic lights or thermostat.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Describe how a microcontroller can control a greenhouse fan using temperature readings.",
    answer: "A temperature sensor captures the current temperature in the greenhouse. The microcontroller receives the reading and compares it with a stored threshold. If the temperature is above the threshold, it sends an output signal to the fan motor or actuator to turn the fan on. The sensor continues to take readings so the fan can be turned off when the temperature falls.",
    marking: [
      { mark: "B1", text: "temperature sensor captures/inputs temperature reading" },
      { mark: "B1", text: "microcontroller receives/processes the reading" },
      { mark: "B1", text: "reading compared with threshold/rule" },
      { mark: "B1", text: "output signal sent to actuator/fan motor" },
      { mark: "B1", text: "repeated readings/feedback loop adjusts fan state" },
    ],
    strict: [
      "Do not award actuator mark if answer says the sensor turns the fan on by itself.",
      "Do not require actual code or a numeric threshold.",
      "Allow processor/controller in place of microcontroller if role is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain the difference between a sensor and an actuator in an embedded control system.",
    answer: "A sensor is an input device that detects a physical condition, such as temperature, light or distance, and sends data to the controller. An actuator is an output device that carries out a physical action, such as moving a motor, opening a valve or switching a heater.",
    marking: [
      { mark: "B1", text: "sensor identified as input device" },
      { mark: "B1", text: "sensor detects physical condition/provides reading" },
      { mark: "B1", text: "actuator identified as output device" },
      { mark: "B1", text: "actuator performs physical action/movement/control" },
    ],
    strict: [
      "Do not accept 'sensor acts' unless action role is assigned to an actuator.",
      "Do not accept 'actuator measures' as its main role.",
      "Allow examples such as motor, valve, fan, heater, lock or brake.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A door opens automatically when a person approaches. Describe the embedded system operation.",
    answer: "A proximity or motion sensor detects a person approaching the door. The microcontroller receives this input and checks a rule to decide whether the door should open. It sends a signal to a motor actuator to open the door. The system continues monitoring sensors so the door can remain open while needed and close safely afterwards.",
    marking: [
      { mark: "B1", text: "proximity/motion sensor detects person" },
      { mark: "B1", text: "microcontroller/controller receives/processes sensor input" },
      { mark: "B1", text: "decision/rule about opening is applied" },
      { mark: "B1", text: "motor/actuator opens the door" },
      { mark: "B1", text: "continued monitoring/feedback for safe closing" },
    ],
    strict: [
      "Do not award full credit for only listing sensor and motor.",
      "Do not say the sensor opens the door without controller/actuator roles.",
      "Allow safety sensor/light beam if linked to safe closing.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Compare an embedded system with a general-purpose computer.",
    answer: "An embedded system is built into a larger device and designed for a specific task, such as controlling a washing machine. It often has limited user interface and may use a microcontroller with CPU, memory and I/O on one chip. A general-purpose computer is designed to run many different programs, usually has richer input/output and is built for flexibility and user interaction.",
    marking: [
      { mark: "B1", text: "embedded system built into larger device" },
      { mark: "B1", text: "embedded system has specific/dedicated purpose" },
      { mark: "B1", text: "microcontroller/limited interface/low power/reliability point" },
      { mark: "B1", text: "general-purpose computer runs many different programs" },
      { mark: "B1", text: "general-purpose computer has flexible/richer interface or user interaction" },
    ],
    strict: [
      "Do not accept only size comparison such as 'embedded is smaller'.",
      "Do not require all microcontroller details for the hardware mark.",
      "Allow named examples if they support the comparison.",
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
    sensor: "Sensor: detects physical conditions such as door closed, water level or temperature.",
    process: "Microcontroller: receives readings and checks stored rules before allowing the next action.",
    actuator: "Actuator: performs the physical action, such as locking the door, opening a valve or turning the motor.",
    repeat: "Repeat: the system keeps reading sensors so it can respond when conditions change.",
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, check whether you confused sensing, processing and acting.`;
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
  setupChoiceTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
