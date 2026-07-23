const diagnostics = {
  format: {
    result: "Likely issue: data format rule mismatch.",
    method: "A protocol must define how data is structured or encoded. If sender and receiver disagree, the receiver may not interpret the message correctly.",
  },
  timeout: {
    result: "Likely issue: timing or acknowledgement rule.",
    method: "Protocols can define how long to wait, when to acknowledge receipt and when to retry transmission.",
  },
  corrupt: {
    result: "Likely issue: missing error-control rule.",
    method: "Protocols can specify checksums, error detection, acknowledgements and retransmission so corrupt data is not silently accepted.",
  },
  layer: {
    result: "Layering is doing its job.",
    method: "If hardware changes but applications still work, lower-layer details are hidden behind defined interfaces, reducing impact on other layers.",
  },
};

const examples = {
  protocol: {
    title: "Example 1: protocol rule",
    problem: "Two devices exchange data, but one device cannot interpret the message.",
    steps: [
      "A protocol defines the agreed rules for communication.",
      "One rule may specify the data format or encoding.",
      "If the sender and receiver use different formats, the receiver may misinterpret the data.",
      "A strong answer names the rule and its effect.",
    ],
  },
  layers: {
    title: "Example 2: benefit of layers",
    problem: "A network adapter is replaced, but the web browser does not need to be rewritten.",
    steps: [
      "Layering separates network responsibilities.",
      "The application layer does not need to know the physical hardware details.",
      "Only the lower layer or driver may need to change.",
      "This reduces complexity and supports independent development.",
    ],
  },
  encapsulation: {
    title: "Example 3: encapsulation",
    problem: "A web request is sent across a network.",
    steps: [
      "As data moves down the layers, each layer may add its own header/control information.",
      "This added information supports tasks such as delivery, routing or checking.",
      "At the receiver, each layer removes and interprets the relevant control information.",
      "The original application data is delivered to the correct application.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "A protocol is a set of...", accepted: ["rules"], answer: "Rules" },
  { id: "p2", prompt: "Name one rule type a protocol may specify.", accepted: ["format", "data format", "timing", "addressing", "error control", "flow control", "acknowledgement", "acknowledgment"], answer: "Format / timing / addressing / error control / flow control" },
  { id: "p3", prompt: "Which rule type helps identify sender and receiver?", accepted: ["addressing", "addresses", "address"], answer: "Addressing" },
  { id: "p4", prompt: "Which rule type helps detect or recover from corrupt data?", accepted: ["error control", "error checking", "checksum", "error detection"], answer: "Error control / error checking" },
  { id: "p5", prompt: "What is the term for adding headers/control information as data moves down layers?", accepted: ["encapsulation"], answer: "Encapsulation" },
  { id: "p6", prompt: "What is the term for removing and interpreting headers at the receiver?", accepted: ["de-encapsulation", "deencapsulation", "decapsulation"], answer: "De-encapsulation" },
  { id: "p7", prompt: "Layering reduces complexity by separating network...", accepted: ["responsibilities", "tasks", "functions"], answer: "Responsibilities / tasks / functions" },
  { id: "p8", prompt: "Do protocols describe rules or physical cable layout?", accepted: ["rules"], answer: "Rules" },
  { id: "p9", prompt: "What type of rule stops a sender overwhelming a receiver?", accepted: ["flow control"], answer: "Flow control" },
  { id: "p10", prompt: "What can confirm that data was received?", accepted: ["acknowledgement", "acknowledgment", "ack"], answer: "Acknowledgement" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Define protocol and explain why protocols are needed in network communication.",
    answer: "A protocol is a set of rules that governs communication between devices. Protocols are needed so that sender and receiver agree on how data is formatted, addressed, transmitted, checked and interpreted. This allows different devices/software to communicate correctly.",
    marking: [
      { mark: "B1", text: "protocol is a set of rules" },
      { mark: "B1", text: "rules govern communication/data transmission between devices" },
      { mark: "B1", text: "valid rule example such as format/addressing/timing/error control" },
      { mark: "B1", text: "explains common agreement/interoperability/correct interpretation" },
    ],
    strict: [
      "Do not accept only 'a protocol connects devices'.",
      "Do not accept a protocol as a physical device.",
      "Examples alone do not replace a definition.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Describe three types of rules that may be specified by a communication protocol.",
    answer: "A protocol may specify data format, so the receiver knows how to interpret the data. It may specify addressing, so sender and receiver can be identified. It may specify error control, such as checksums and retransmission rules, so corrupted or missing data can be handled.",
    marking: [
      { mark: "B1", text: "data format/structure/encoding rule" },
      { mark: "B1", text: "purpose of data format rule" },
      { mark: "B1", text: "addressing rule" },
      { mark: "B1", text: "error control/checking/retransmission rule" },
      { mark: "B1", text: "purpose of addressing or error control rule" },
    ],
    strict: [
      "Do not award the same rule type twice.",
      "Allow timing, acknowledgement or flow control as valid alternatives.",
      "Do not accept vague 'security' unless a rule is clearly described.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain two benefits of using a layered model for network communication.",
    answer: "Layering reduces complexity by separating communication into smaller responsibilities. Each layer can be developed or changed independently if it keeps the same interface with adjacent layers. Layering also helps troubleshooting because faults can be associated with a particular layer.",
    marking: [
      { mark: "B1", text: "separates communication into smaller tasks/responsibilities" },
      { mark: "B1", text: "reduces complexity / makes design easier" },
      { mark: "B1", text: "layers can be developed/replaced independently using interfaces" },
      { mark: "B1", text: "helps troubleshooting/standardisation/interoperability" },
    ],
    strict: [
      "Do not accept only 'it is organised'.",
      "Do not require naming OSI or TCP/IP layers.",
      "Benefit must be explained, not only listed.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain encapsulation and de-encapsulation in layered communication.",
    answer: "Encapsulation occurs as data moves down the layers at the sender. Each layer may add its own header or control information needed for that layer's function, such as addressing, routing or error checking. De-encapsulation occurs at the receiver as layers remove and interpret the relevant control information in reverse order, leaving the original data for the application.",
    marking: [
      { mark: "B1", text: "encapsulation occurs as data moves down layers at sender" },
      { mark: "B1", text: "each layer adds header/control information" },
      { mark: "B1", text: "valid purpose/example such as addressing/routing/error checking" },
      { mark: "B1", text: "de-encapsulation occurs at receiver / reverse process" },
      { mark: "B1", text: "headers/control information are removed/interpreted to recover original data" },
    ],
    strict: [
      "Do not accept only 'data is wrapped' without layer/control detail.",
      "Do not say encryption unless clearly separated from encapsulation.",
      "Allow 'trailer' as control information where appropriate.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A student says a protocol is the same as a topology. Explain why this is incorrect.",
    answer: "A protocol is a set of rules for communication, such as how data is formatted, addressed or checked. A topology describes how devices or nodes are arranged or connected. They are different concepts: a star network can still use many different protocols.",
    marking: [
      { mark: "B1", text: "protocol is a set of communication rules" },
      { mark: "B1", text: "valid protocol rule example" },
      { mark: "B1", text: "topology is arrangement/connection of devices/nodes" },
      { mark: "B1", text: "clear distinction or scenario showing both can coexist" },
    ],
    strict: [
      "Do not accept only 'they are different'.",
      "Do not require named topologies.",
      "Award distinction even if the example differs, provided it is technically valid.",
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
      feedback.textContent = button.dataset.hook === "protocol"
        ? "Correct. A protocol defines the shared rules, including data format."
        : "Not the core issue. The devices first need agreed communication rules.";
    });
  });
}

function setupDiagnosticTool() {
  const select = document.querySelector("#symptomInput");
  const result = document.querySelector("#diagnoseResult");
  const method = document.querySelector("#diagnoseMethod");
  function diagnose() {
    const item = diagnostics[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", diagnose);
  document.querySelector("#diagnoseBtn").addEventListener("click", diagnose);
  diagnose();
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Add a rule and a reason for full explanation marks.`;
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
  setupDiagnosticTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
