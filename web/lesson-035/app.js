const gateRules = {
  NOT: {
    inputs: ["A"],
    rule: "Q = NOT A. The output is the inverse of the input.",
    rows: [
      [0, 1],
      [1, 0],
    ],
  },
  AND: {
    inputs: ["A", "B"],
    rule: "Q = A AND B. The output is 1 only when both inputs are 1.",
    rows: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  OR: {
    inputs: ["A", "B"],
    rule: "Q = A OR B. The output is 1 when at least one input is 1.",
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  },
  NAND: {
    inputs: ["A", "B"],
    rule: "Q = A NAND B. It is the inverse of AND.",
    rows: [
      [0, 0, 1],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
  },
  NOR: {
    inputs: ["A", "B"],
    rule: "Q = A NOR B. It is the inverse of OR.",
    rows: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
  },
  XOR: {
    inputs: ["A", "B"],
    rule: "Q = A XOR B. The output is 1 when exactly one input is 1.",
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
  },
};

const examples = {
  compound: {
    title: "Example 1: Q = (A AND B) OR NOT C",
    problem: "Complete the row A = 1, B = 0, C = 0.",
    steps: [
      "Find A AND B: 1 AND 0 = 0.",
      "Find NOT C: NOT 0 = 1.",
      "Combine the intermediate values: 0 OR 1 = 1.",
      "Final output Q = 1. The intermediate columns prove the method.",
    ],
  },
  xor: {
    title: "Example 2: OR vs XOR",
    problem: "Compare A OR B and A XOR B for A = 1, B = 1.",
    steps: [
      "A OR B = 1 because at least one input is 1.",
      "A XOR B = 0 because XOR requires exactly one input to be 1.",
      "This is the row that exposes the common mistake.",
    ],
  },
  nand: {
    title: "Example 3: NAND from AND",
    problem: "Find A NAND B for A = 1, B = 1.",
    steps: [
      "First find A AND B: 1 AND 1 = 1.",
      "NAND means NOT AND, so invert the AND result.",
      "Final output Q = 0.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which gate inverts a single input?", accepted: ["not"], answer: "NOT" },
  { id: "p2", prompt: "For A AND B, what is Q when A = 1 and B = 0?", accepted: ["0", "false"], answer: "0" },
  { id: "p3", prompt: "For A OR B, what is Q when A = 0 and B = 1?", accepted: ["1", "true"], answer: "1" },
  { id: "p4", prompt: "For A XOR B, what is Q when A = 1 and B = 1?", accepted: ["0", "false"], answer: "0" },
  { id: "p5", prompt: "Which two-input gate is 1 only when both inputs are 0?", accepted: ["nor"], answer: "NOR" },
  { id: "p6", prompt: "Which gate is the inverse of AND?", accepted: ["nand"], answer: "NAND" },
  { id: "p7", prompt: "Which gate is true when exactly one input is 1?", accepted: ["xor", "exclusive or"], answer: "XOR" },
  { id: "p8", prompt: "For A NAND B, what is Q when A = 1 and B = 1?", accepted: ["0", "false"], answer: "0" },
  { id: "p9", prompt: "For NOT A, what is Q when A = 0?", accepted: ["1", "true"], answer: "1" },
  { id: "p10", prompt: "What is the usual output label used in this lesson?", accepted: ["q"], answer: "Q" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Complete the truth table for A AND B.",
    answer: "00 -> 0, 01 -> 0, 10 -> 0, 11 -> 1.",
    marking: [
      { mark: "B1", text: "row A=0, B=0 gives Q=0" },
      { mark: "B1", text: "row A=0, B=1 gives Q=0" },
      { mark: "B1", text: "row A=1, B=0 gives Q=0" },
      { mark: "B1", text: "row A=1, B=1 gives Q=1" },
    ],
    strict: [
      "Do not award a row mark if the input row is missing or ambiguous.",
      "Allow True/False if used consistently and mapped correctly to 1/0.",
      "Award marks for correct outputs if row order is different but clearly labelled.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the difference between OR and XOR.",
    answer: "OR outputs 1 when at least one input is 1, including the case where both inputs are 1. XOR outputs 1 only when exactly one input is 1; if both inputs are 1, XOR outputs 0.",
    marking: [
      { mark: "B1", text: "OR identified as true when at least one input is 1" },
      { mark: "B1", text: "OR includes the 1,1 row as output 1" },
      { mark: "B1", text: "XOR identified as true when exactly one input is 1" },
      { mark: "B1", text: "XOR gives 0 for the 1,1 row" },
    ],
    strict: [
      "Do not accept vague everyday wording such as 'one or the other' unless the 1,1 case is made clear.",
      "Allow 'inputs are different' for XOR.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "For Q = (A AND B) OR NOT C, find Q when A = 1, B = 0 and C = 0. Show your working.",
    answer: "A AND B = 0. NOT C = 1. Q = 0 OR 1 = 1.",
    marking: [
      { mark: "B1", text: "A AND B = 0" },
      { mark: "B1", text: "NOT C = 1" },
      { mark: "B1", text: "final output Q = 1" },
    ],
    strict: [
      "Do not award final answer mark from unsupported guessing if intermediate work contradicts it.",
      "Allow equivalent True/False notation if clearly mapped.",
      "Allow FT from the candidate's earlier intermediate logic value only when the final operation is applied correctly.",
    ],
  },
  {
    title: "Question 4",
    marks: "2 marks",
    prompt: "State the output rule for NAND and complete the row A = 1, B = 1.",
    answer: "NAND is NOT AND / inverse of AND. For A = 1 and B = 1, AND gives 1, so NAND gives Q = 0.",
    marking: [
      { mark: "B1", text: "NAND described as NOT AND or inverse of AND" },
      { mark: "B1", text: "for A=1 and B=1, the NAND output is 0" },
    ],
    strict: [
      "Do not accept 'same as AND' for the rule mark.",
      "Allow direct statement 'NAND is 0 only when both inputs are 1'.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A door unlocks only if a card is valid and the emergency stop is not active. Define variables and write a Boolean expression for the output Unlock.",
    answer: "Let C represent card valid and E represent emergency stop active. Unlock = C AND NOT E. The output is 1 only when C = 1 and E = 0.",
    marking: [
      { mark: "B1", text: "defines a variable for card valid" },
      { mark: "B1", text: "defines a variable for emergency stop active" },
      { mark: "M1", text: "uses AND to require the card condition and emergency condition together" },
      { mark: "M1", text: "uses NOT on the emergency stop condition" },
      { mark: "A1", text: "correct expression such as Unlock = C AND NOT E" },
    ],
    strict: [
      "Do not award expression mark if NOT is applied to the card instead of the emergency stop.",
      "Allow alternative variable letters if defined clearly.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    open: "Correct. Key = 1 and NOT Exam = 1, so 1 AND 1 gives output 1.",
    locked1: "Locked. The exam condition is fine, but the key input is 0, so AND cannot output 1.",
    locked2: "Locked. The key is present, but NOT Exam becomes 0 because Exam = 1.",
    locked3: "Locked. Both required parts fail: no key and NOT Exam is 0.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function renderTruthTable() {
  const gate = document.querySelector("#gateInput").value;
  const rule = gateRules[gate];
  const headers = [...rule.inputs, "Q"];
  document.querySelector("#gateRule").textContent = rule.rule;
  document.querySelector("#truthTable").innerHTML = `
    <table class="truth-table">
      <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
      <tbody>
        ${rule.rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

function setupTruthTool() {
  document.querySelector("#gateInput").addEventListener("change", renderTruthTable);
  document.querySelector("#truthBtn").addEventListener("click", renderTruthTable);
  renderTruthTable();
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
  renderExample("compound");
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
      const isCorrect = item.accepted.some((answer) => response === normalise(answer));
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check exact gate rules before checking the answer panel.`;
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
  setupTruthTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
