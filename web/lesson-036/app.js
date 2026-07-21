const expressions = {
  expr1: {
    label: "Q = (A AND B) OR NOT C",
    headers: ["A", "B", "C", "A AND B", "NOT C", "Q"],
    calculate: (a, b, c) => {
      const andAB = a && b ? 1 : 0;
      const notC = c ? 0 : 1;
      const q = andAB || notC ? 1 : 0;
      return [a, b, c, andAB, notC, q];
    },
    note: "Column plan: calculate A AND B, calculate NOT C, then OR those two intermediate columns.",
  },
  expr2: {
    label: "Q = (A OR B) AND C",
    headers: ["A", "B", "C", "A OR B", "Q"],
    calculate: (a, b, c) => {
      const orAB = a || b ? 1 : 0;
      const q = orAB && c ? 1 : 0;
      return [a, b, c, orAB, q];
    },
    note: "Column plan: complete the bracket A OR B before applying AND with C.",
  },
  expr3: {
    label: "Q = (A XOR B) AND NOT C",
    headers: ["A", "B", "C", "A XOR B", "NOT C", "Q"],
    calculate: (a, b, c) => {
      const xorAB = a !== b ? 1 : 0;
      const notC = c ? 0 : 1;
      const q = xorAB && notC ? 1 : 0;
      return [a, b, c, xorAB, notC, q];
    },
    note: "Column plan: XOR is 1 when A and B differ, then combine with NOT C.",
  },
  expr4: {
    label: "Q = NOT (A OR B)",
    headers: ["A", "B", "A OR B", "Q"],
    calculate: (a, b) => {
      const orAB = a || b ? 1 : 0;
      const q = orAB ? 0 : 1;
      return [a, b, orAB, q];
    },
    note: "Column plan: complete OR first, then invert the result. This is NOR.",
  },
  expr5: {
    label: "Q = (A NAND B) OR C",
    headers: ["A", "B", "C", "A AND B", "A NAND B", "Q"],
    calculate: (a, b, c) => {
      const andAB = a && b ? 1 : 0;
      const nandAB = andAB ? 0 : 1;
      const q = nandAB || c ? 1 : 0;
      return [a, b, c, andAB, nandAB, q];
    },
    note: "Column plan: calculate AND, invert it for NAND, then OR the NAND result with C.",
  },
};

const examples = {
  three: {
    title: "Example 1: Q = (A AND B) OR NOT C",
    problem: "Find Q for A = 1, B = 0 and C = 0.",
    steps: [
      "A AND B = 1 AND 0 = 0.",
      "NOT C = NOT 0 = 1.",
      "Q = 0 OR 1 = 1.",
      "The final answer is 1 because the NOT C column is enough to make the OR true.",
    ],
  },
  brackets: {
    title: "Example 2: Q = (A OR B) AND C",
    problem: "Find Q for A = 1, B = 0 and C = 0.",
    steps: [
      "Complete the bracket first: A OR B = 1 OR 0 = 1.",
      "Now combine with C: 1 AND 0 = 0.",
      "Final output Q = 0. A true bracket cannot survive an AND with 0.",
    ],
  },
  derive: {
    title: "Example 3: derive an expression from a rule",
    problem: "A fan turns on if the room is hot and the override is not active.",
    steps: [
      "Define H = room is hot and O = override is active.",
      "The phrase 'and' gives an AND gate.",
      "The phrase 'override is not active' gives NOT O.",
      "Expression: Fan = H AND NOT O.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "How many rows are needed for a truth table with 3 inputs?", accepted: ["8", "eight"], answer: "8" },
  { id: "p2", prompt: "How many rows are needed for a truth table with 2 inputs?", accepted: ["4", "four"], answer: "4" },
  { id: "p3", prompt: "For Q = A AND NOT B, find Q when A = 1 and B = 0.", accepted: ["1", "true"], answer: "1" },
  { id: "p4", prompt: "For Q = (A OR B) AND C, find Q when A = 1, B = 0, C = 0.", accepted: ["0", "false"], answer: "0" },
  { id: "p5", prompt: "For Q = A XOR B, find Q when A = 1 and B = 1.", accepted: ["0", "false"], answer: "0" },
  { id: "p6", prompt: "What column should be added before Q for Q = NOT (A OR B)?", accepted: ["a or b", "or", "aorb"], answer: "A OR B" },
  { id: "p7", prompt: "Which operator means invert the value?", accepted: ["not"], answer: "NOT" },
  { id: "p8", prompt: "For Q = (A AND B) OR C, find Q when A = 0, B = 1, C = 1.", accepted: ["1", "true"], answer: "1" },
  { id: "p9", prompt: "For Q = (A NAND B), find Q when A = 1 and B = 1.", accepted: ["0", "false"], answer: "0" },
  { id: "p10", prompt: "What final output label is used throughout the truth tables?", accepted: ["q"], answer: "Q" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Complete the truth table for Q = A AND NOT B.",
    answer: "Rows: A B NOT B Q. 00 1 0; 01 0 0; 10 1 1; 11 0 0.",
    marking: [
      { mark: "B1", text: "includes all four input combinations for A and B" },
      { mark: "M1", text: "adds or implies NOT B column" },
      { mark: "A1", text: "NOT B values are 1,0,1,0 for B values 0,1,0,1" },
      { mark: "M1", text: "applies AND between A and NOT B" },
      { mark: "A1", text: "final Q values are 0,0,1,0 in matching row order" },
    ],
    strict: [
      "Do not award final A1 if row order is unclear and Q values cannot be matched to inputs.",
      "Allow True/False if consistently mapped to 1/0.",
      "FT: award method mark for AND if candidate uses their NOT B column consistently.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Complete the truth table for Q = (A OR B) AND C.",
    answer: "Using rows 000,001,010,011,100,101,110,111: A OR B values are 0,0,1,1,1,1,1,1 and Q values are 0,0,0,1,0,1,0,1.",
    marking: [
      { mark: "B1", text: "all eight input rows for A, B and C are present" },
      { mark: "M1", text: "adds or uses intermediate column A OR B" },
      { mark: "A1", text: "A OR B column correct" },
      { mark: "M1", text: "combines A OR B with C using AND" },
      { mark: "A1", text: "final Q values correct for at least four rows" },
      { mark: "A1", text: "all final Q values correct and matched to rows" },
    ],
    strict: [
      "Do not accept six rows for a three-input table.",
      "Do not award both final A marks if intermediate column contradicts final Q.",
      "FT: award final method marks when Q follows candidate's A OR B column with C correctly.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why intermediate columns are useful when completing a truth table.",
    answer: "Intermediate columns show the result of each gate or bracketed part of the Boolean expression. They make the working systematic, reduce mistakes, and provide evidence for method marks even if a later final output is wrong.",
    marking: [
      { mark: "B1", text: "intermediate columns represent gate outputs or bracketed parts" },
      { mark: "B1", text: "they support systematic row-by-row working" },
      { mark: "B1", text: "they reduce errors or make checking easier" },
      { mark: "B1", text: "they can gain method credit / show evidence for the final output" },
    ],
    strict: [
      "Do not accept only 'it is easier' without explaining why.",
      "Allow examples such as A AND B or NOT C as intermediate columns.",
      "FT: award explanation marks even if no specific expression is named.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "For Q = (A XOR B) AND NOT C, find Q when A = 0, B = 1 and C = 0. Show working.",
    answer: "A XOR B = 1 because the inputs differ. NOT C = 1. Q = 1 AND 1 = 1.",
    marking: [
      { mark: "M1", text: "attempts A XOR B using A=0 and B=1" },
      { mark: "A1", text: "A XOR B = 1" },
      { mark: "M1", text: "attempts NOT C using C=0" },
      { mark: "A1", text: "NOT C = 1" },
      { mark: "A1", text: "final Q = 1" },
    ],
    strict: [
      "Do not award XOR A1 if answer treats XOR as OR without considering exactly-one behaviour.",
      "Allow 'inputs are different' for the XOR explanation.",
      "FT: award final A1 if candidate correctly ANDs their two intermediate values.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A warning light turns on if a sensor is active and either the alarm is armed or the test mode is active. Define variables and write a Boolean expression.",
    answer: "Let S = sensor active, A = alarm armed and T = test mode active. Warning = S AND (A OR T). The output is 1 only when S is 1 and at least one of A or T is 1.",
    marking: [
      { mark: "B1", text: "defines variable for sensor active" },
      { mark: "B1", text: "defines variable for alarm armed" },
      { mark: "B1", text: "defines variable for test mode active" },
      { mark: "M1", text: "uses OR for alarm armed or test mode active" },
      { mark: "M1", text: "uses AND with the sensor condition" },
      { mark: "A1", text: "correct expression such as Warning = S AND (A OR T)" },
    ],
    strict: [
      "Do not award expression mark if brackets are omitted and meaning becomes ambiguous.",
      "Allow alternative variable letters if clearly defined.",
      "FT: award variable-definition marks even if expression contains a logic error.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, " ");
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
    open: "Correct. PIN OR Override = 1, then Card AND 1 = 1.",
    closed1: "Closed. The bracket is true, but Card = 0, so the final AND outputs 0.",
    closed2: "Closed. Card = 1, but PIN OR Override = 0, so the final AND outputs 0.",
    open2: "Correct. PIN is enough to make the bracket true, then Card AND 1 = 1.",
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
  const key = document.querySelector("#expressionInput").value;
  const expression = expressions[key];
  const inputCount = expression.headers.includes("C") ? 3 : 2;
  const rows = inputRows(inputCount).map((row) => expression.calculate(...row));
  document.querySelector("#expressionRule").textContent = `${expression.label}. ${expression.note}`;
  document.querySelector("#truthTable").innerHTML = `
    <table class="truth-table">
      <thead><tr>${expression.headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
      <tbody>
        ${rows.map((row) => `<tr>${row.map((value) => `<td>${value}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>
  `;
}

function setupTruthTool() {
  document.querySelector("#expressionInput").addEventListener("change", renderTruthTable);
  document.querySelector("#buildBtn").addEventListener("click", renderTruthTable);
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
  renderExample("three");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Wrong rows usually mean a missing intermediate column.`;
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
