const scenarios = {
  alarm: {
    expression: "Alarm = A AND (D OR W)",
    variables: ["A = system armed", "D = door open", "W = window open"],
    sequence: ["Create D OR W", "Feed that result into AND with A", "Output is Alarm"],
    headers: ["A", "D", "W", "D OR W", "Alarm"],
    calculate: (a, d, w) => {
      const doorOrWindow = d || w ? 1 : 0;
      const alarm = a && doorOrWindow ? 1 : 0;
      return [a, d, w, doorOrWindow, alarm];
    },
  },
  unlock: {
    expression: "Unlock = C AND NOT E",
    variables: ["C = card valid", "E = emergency stop active"],
    sequence: ["Invert E using NOT", "Feed C and NOT E into AND", "Output is Unlock"],
    headers: ["C", "E", "NOT E", "Unlock"],
    calculate: (c, e) => {
      const notE = e ? 0 : 1;
      const unlock = c && notE ? 1 : 0;
      return [c, e, notE, unlock];
    },
  },
  fan: {
    expression: "Fan = H AND NOT O",
    variables: ["H = room is hot", "O = override active"],
    sequence: ["Invert O using NOT", "Feed H and NOT O into AND", "Output is Fan"],
    headers: ["H", "O", "NOT O", "Fan"],
    calculate: (h, o) => {
      const notO = o ? 0 : 1;
      const fan = h && notO ? 1 : 0;
      return [h, o, notO, fan];
    },
  },
  light: {
    expression: "Light = M OR T",
    variables: ["M = motion detected", "T = test mode active"],
    sequence: ["Feed M and T into OR", "Output is Light"],
    headers: ["M", "T", "Light"],
    calculate: (m, t) => [m, t, m || t ? 1 : 0],
  },
  selector: {
    expression: "Select = B1 XOR B2",
    variables: ["B1 = first button pressed", "B2 = second button pressed"],
    sequence: ["Feed B1 and B2 into XOR", "Output is Select"],
    headers: ["B1", "B2", "Select"],
    calculate: (b1, b2) => [b1, b2, b1 !== b2 ? 1 : 0],
  },
};

const examples = {
  alarm: {
    title: "Example 1: alarm circuit",
    problem: "A warning alarm sounds if the system is armed and either a door or a window is open.",
    steps: [
      "Define variables: A = armed, D = door open, W = window open.",
      "Translate 'either door or window' as D OR W.",
      "Translate 'system is armed and ...' as A AND (D OR W).",
      "Circuit sequence: OR gate for D and W; its output feeds an AND gate with A.",
    ],
  },
  unlock: {
    title: "Example 2: unlock circuit",
    problem: "A door unlocks only if a card is valid and the emergency stop is not active.",
    steps: [
      "Define C = card valid and E = emergency stop active.",
      "The phrase 'not active' applies to E, so create NOT E.",
      "The phrase 'only if ... and ...' gives AND.",
      "Expression: Unlock = C AND NOT E.",
    ],
  },
  xor: {
    title: "Example 3: exactly one condition",
    problem: "A selector turns on if exactly one of two buttons is pressed.",
    steps: [
      "Define B1 = first button pressed and B2 = second button pressed.",
      "The phrase 'exactly one' is the key phrase for XOR.",
      "Expression: Select = B1 XOR B2.",
      "OR would be wrong because OR outputs 1 when both buttons are pressed.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which gate matches the word 'both'?", accepted: ["and"], answer: "AND" },
  { id: "p2", prompt: "Which gate matches 'at least one'?", accepted: ["or"], answer: "OR" },
  { id: "p3", prompt: "Which gate matches 'exactly one'?", accepted: ["xor", "exclusive or"], answer: "XOR" },
  { id: "p4", prompt: "In Unlock = C AND NOT E, which variable is inverted?", accepted: ["e", "emergency", "emergency stop"], answer: "E / emergency stop" },
  { id: "p5", prompt: "Write the expression for Alarm if armed A and door D are both required.", accepted: ["a and d", "alarm = a and d"], answer: "Alarm = A AND D" },
  { id: "p6", prompt: "Write the inner expression for 'door or window'.", accepted: ["d or w", "door or window"], answer: "D OR W" },
  { id: "p7", prompt: "For Alarm = A AND (D OR W), find Alarm when A=1, D=0, W=1.", accepted: ["1", "true"], answer: "1" },
  { id: "p8", prompt: "For Fan = H AND NOT O, find Fan when H=1, O=1.", accepted: ["0", "false"], answer: "0" },
  { id: "p9", prompt: "Should variables be defined before or after drawing the circuit?", accepted: ["before"], answer: "Before" },
  { id: "p10", prompt: "What should be used to check a circuit row-by-row?", accepted: ["truth table", "truth tables"], answer: "Truth table" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A warning alarm sounds if the system is armed and either a door or window is open. Define variables and write a Boolean expression.",
    answer: "Let A = system armed, D = door open and W = window open. Alarm = A AND (D OR W).",
    marking: [
      { mark: "B1", text: "defines variable for system armed" },
      { mark: "B1", text: "defines variable for door open" },
      { mark: "B1", text: "defines variable for window open" },
      { mark: "M1", text: "uses OR for door or window" },
      { mark: "A1", text: "correct expression such as Alarm = A AND (D OR W)" },
    ],
    strict: [
      "Do not award expression mark if armed is omitted from the expression.",
      "Do not accept A AND D OR W without brackets unless the intended order is made clear.",
      "Allow alternative variable letters if clearly defined.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Describe the gate sequence needed for Alarm = A AND (D OR W).",
    answer: "Inputs D and W are connected to an OR gate. The output of the OR gate is connected to an AND gate with input A. The output of the AND gate is Alarm.",
    marking: [
      { mark: "B1", text: "identifies D and W as inputs to OR" },
      { mark: "B1", text: "OR gate output represents D OR W" },
      { mark: "B1", text: "A is used as another input to AND" },
      { mark: "B1", text: "OR output feeds into AND gate" },
      { mark: "B1", text: "final AND output is Alarm" },
    ],
    strict: [
      "Do not award full credit for listing gates without showing how they connect.",
      "Do not accept a final OR gate for this expression.",
      "Allow labelled intermediate output if the sequence is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A fan starts if the room is hot and manual override is not active. Define variables and write the expression.",
    answer: "Let H = room is hot and O = manual override active. Fan = H AND NOT O.",
    marking: [
      { mark: "B1", text: "defines variable for room hot" },
      { mark: "B1", text: "defines variable for override active" },
      { mark: "M1", text: "uses NOT on override condition" },
      { mark: "M1", text: "uses AND to require hot condition and not override" },
      { mark: "A1", text: "correct expression such as Fan = H AND NOT O" },
    ],
    strict: [
      "Do not award expression mark if NOT is applied to the hot condition.",
      "Allow 'override inactive' as a variable only if the expression remains logically clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why XOR is more appropriate than OR for a selector that turns on when exactly one of two buttons is pressed.",
    answer: "XOR outputs 1 only when the two inputs are different, so it is 1 for 01 and 10 but 0 for 11. OR would also output 1 when both buttons are pressed, which does not match 'exactly one'.",
    marking: [
      { mark: "B1", text: "XOR identified as true when exactly one input is 1 / inputs differ" },
      { mark: "B1", text: "XOR gives 0 when both inputs are 1" },
      { mark: "B1", text: "OR gives 1 when both inputs are 1" },
      { mark: "B1", text: "links the distinction to the phrase 'exactly one'" },
    ],
    strict: [
      "Do not accept 'XOR is better' without a logical reason.",
      "Allow truth-table row examples instead of prose.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "For Unlock = C AND NOT E, verify the output when C = 1 and E = 1, and explain what this means in the original scenario.",
    answer: "E = 1, so NOT E = 0. C AND NOT E = 1 AND 0 = 0. Unlock is 0, meaning the door remains locked because the emergency stop is active even though the card is valid.",
    marking: [
      { mark: "B1", text: "NOT E = 0" },
      { mark: "B1", text: "applies AND between C and NOT E" },
      { mark: "B1", text: "final Unlock output is 0" },
      { mark: "B1", text: "explains the door remains locked because the emergency stop is active" },
    ],
    strict: [
      "Do not award final output mark if NOT is ignored.",
      "Allow 'false' for 0 if notation is consistent.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_=()\s]+/g, " ");
}

function inputRows(inputCount) {
  const total = 2 ** inputCount;
  return Array.from({ length: total }, (_, index) => {
    const bits = index.toString(2).padStart(inputCount, "0");
    return bits.split("").map((bit) => Number(bit));
  });
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    wrong1: "Not quite. OR would unlock when Card = 0 and Emergency = 0, which breaks the 'card is valid' requirement.",
    correct: "Correct. Card must be 1, and Emergency must be inverted because it must not be active.",
    wrong2: "Not quite. This denies the card and requires the emergency stop, the exact opposite of a calm door.",
    wrong3: "Not quite. XOR means exactly one condition is true. That is not what this requirement says.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function renderScenario() {
  const key = document.querySelector("#scenarioInput").value;
  const scenario = scenarios[key];
  const inputCount = scenario.headers.filter((header) => !header.includes(" ") && header !== scenario.headers.at(-1)).length;
  const rows = inputRows(inputCount).map((row) => scenario.calculate(...row));
  document.querySelector("#scenarioExpression").textContent = scenario.expression;
  document.querySelector("#scenarioVariables").innerHTML = `<strong>Variables:</strong> ${scenario.variables.join("; ")}`;
  document.querySelector("#scenarioSequence").innerHTML = `
    <strong>Gate sequence:</strong>
    <ol>${scenario.sequence.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
  document.querySelector("#truthTable").innerHTML = `
    <table class="truth-table">
      <thead><tr>${scenario.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

function setupScenarioTool() {
  document.querySelector("#scenarioInput").addEventListener("change", renderScenario);
  document.querySelector("#buildBtn").addEventListener("click", renderScenario);
  renderScenario();
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
  renderExample("alarm");
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
      const isCorrect = item.accepted.some((answer) => response === normalise(answer) || response.includes(normalise(answer)));
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, go back to variables -> expression -> gates.`;
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
  setupScenarioTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
