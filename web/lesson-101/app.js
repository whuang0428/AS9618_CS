const predictSets = {
  a: { values: [4, 7, 9], output: 20 },
  b: { values: [10, 0, 5], output: 15 },
  c: { values: [-2, 8, 6], output: 12 },
  d: { values: [3, 3, 3], output: 9 },
};

const traceScenarios = {
  total: {
    title: "Running total for 4, 7, 9",
    headers: ["Count", "Number", "Total", "Output"],
    rows: [
      ["1", "4", "4", "-"],
      ["2", "7", "11", "-"],
      ["3", "9", "20", "20"],
    ],
    note: "Total is updated after each input. OUTPUT happens after the loop.",
  },
  max: {
    title: "Maximum of 6, 11, 8",
    headers: ["Step", "Value", "Highest", "Output"],
    rows: [
      ["initial", "6", "6", "-"],
      ["compare", "11", "11", "-"],
      ["compare", "8", "11", "11"],
    ],
    note: "Highest changes only when the new value is greater than the current Highest.",
  },
  sentinel: {
    title: "Sentinel total for 5, 2, -1",
    headers: ["Input", "Condition", "Total", "Output"],
    rows: [
      ["5", "5 <> -1 is TRUE", "5", "-"],
      ["2", "2 <> -1 is TRUE", "7", "-"],
      ["-1", "-1 <> -1 is FALSE", "7", "7"],
    ],
    note: "The sentinel -1 stops the loop and is not added to Total.",
  },
  valid: {
    title: "Validate ages 10 then 15",
    headers: ["Age", "Condition", "Output"],
    rows: [
      ["10", "Age >= 11 AND Age <= 18 is FALSE", "Invalid"],
      ["15", "Age >= 11 AND Age <= 18 is TRUE", "Valid"],
    ],
    note: "Boundary checks depend on both lower and upper limits.",
  },
};

const checkerMap = {
  "wrong-total": {
    verdict: "Incorrect trace",
    detail: "Those are the input values, not the running total. Total should be 4, then 11, then 20.",
  },
  "wrong-sentinel": {
    verdict: "Incorrect trace",
    detail: "The sentinel is a stopping value. It should not be added to Total unless the question explicitly says otherwise.",
  },
  "wrong-output": {
    verdict: "Incorrect trace",
    detail: "Record output only when an OUTPUT statement executes. If OUTPUT is after the loop, the output appears after the final iteration.",
  },
  correct: {
    verdict: "Correct trace",
    detail: "4, 11, 20 are the running totals after each input value is processed.",
  },
};

const examples = {
  total: {
    title: "Example 1: Running total",
    problem: "Trace Total <- 0; input 4, 7, 9; add each value to Total; output Total.",
    headers: ["Count", "Number", "Total", "Output"],
    rows: [["1", "4", "4", "-"], ["2", "7", "11", "-"], ["3", "9", "20", "20"]],
    notes: ["Initialise Total before the loop.", "Record Total after the assignment.", "The output appears once, after the loop."],
  },
  max: {
    title: "Example 2: Maximum value",
    problem: "Trace values 6, 11, 8 and output the highest.",
    headers: ["Step", "Value", "Highest", "Output"],
    rows: [["initial", "6", "6", "-"], ["compare", "11", "11", "-"], ["compare", "8", "11", "11"]],
    notes: ["The first value can initialise Highest.", "11 replaces 6 because it is larger.", "8 does not replace 11."],
  },
  sentinel: {
    title: "Example 3: Sentinel loop",
    problem: "Trace input values 5, 2, -1. Add values until -1 is entered.",
    headers: ["Input", "Condition", "Total", "Output"],
    rows: [["5", "TRUE", "5", "-"], ["2", "TRUE", "7", "-"], ["-1", "FALSE", "7", "7"]],
    notes: ["Check the condition before adding.", "-1 is not processed.", "Output Total after the loop stops."],
  },
  selection: {
    title: "Example 4: Selection trace",
    problem: "Input Mark and output Pass if Mark >= 50, otherwise Resit.",
    headers: ["Mark", "Condition", "Output"],
    rows: [["49", "FALSE", "Resit"], ["50", "TRUE", "Pass"], ["72", "TRUE", "Pass"]],
    notes: ["49 and 50 are useful boundary values.", "50 is included in Pass because the condition is >= 50."],
  },
};

const practice = [
  { id: "p1", prompt: "What is the purpose of a trace table?", accepted: ["record variable values", "record variables", "track variables", "trace variables", "record changes"], answer: "To record variable values and outputs as an algorithm is executed." },
  { id: "p2", prompt: "What does dry run mean?", accepted: ["execute by hand", "manual execution", "run by hand", "trace by hand"], answer: "Executing the algorithm manually using test data." },
  { id: "p3", prompt: "For inputs 4, 7, 9 with Total initially 0, what final Total is output?", accepted: ["20"], answer: "20" },
  { id: "p4", prompt: "For running totals after 4, 7, 9, write the three Total values separated by commas.", accepted: ["4,11,20", "4 11 20", "4, 11, 20"], answer: "4, 11, 20" },
  { id: "p5", prompt: "In a WHILE loop using -1 as a sentinel, should -1 be added to Total? yes or no.", accepted: ["no"], answer: "No. The sentinel stops the loop and is not processed." },
  { id: "p6", prompt: "Which column should record displayed values?", accepted: ["output", "output column"], answer: "Output / output column" },
  { id: "p7", prompt: "Values are 6, 11, 8. What final Highest is output?", accepted: ["11"], answer: "11" },
  { id: "p8", prompt: "If OUTPUT is after a FOR loop, does output happen every iteration or after the loop?", accepted: ["after the loop", "after loop"], answer: "After the loop." },
  { id: "p9", prompt: "Which value is the boundary for Pass when condition is Mark >= 50?", accepted: ["50"], answer: "50" },
  { id: "p10", prompt: "Is Java syntax the expected trace notation for Paper 2 pseudocode questions? yes or no.", accepted: ["no"], answer: "No. Trace Cambridge-style pseudocode." },
];

const mistakes = [
  {
    wrong: "I wrote the input values in the Total column: 4, 7, 9.",
    fix: "Total is a running value. After each update it should be 4, 11, 20.",
  },
  {
    wrong: "I added -1 to Total in a sentinel loop.",
    fix: "Check the sentinel before processing it. The sentinel stops the loop and should not be included in Total.",
  },
  {
    wrong: "I wrote output on every row even though OUTPUT is after the loop.",
    fix: "Only write output when the OUTPUT statement executes. If OUTPUT is after the loop, it appears once at the end.",
  },
  {
    wrong: "I changed Highest even when the new value was smaller.",
    fix: "Update Highest only when the condition Value > Highest is true.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "The following pseudocode is traced with input values 4, 7, 9. Complete the trace for Total and state the output.\n\nTotal <- 0\nFOR Count <- 1 TO 3\n    INPUT Number\n    Total <- Total + Number\nNEXT Count\nOUTPUT Total",
    answer: "Count 1: Number 4, Total 4. Count 2: Number 7, Total 11. Count 3: Number 9, Total 20. Output is 20.",
    marking: [
      { mark: "B1", text: "records Total as 4 after first input" },
      { mark: "B1", text: "records Total as 11 after second input" },
      { mark: "B1", text: "records Total as 20 after third input" },
      { mark: "B1", text: "states output occurs after the loop" },
      { mark: "A1", text: "states final output 20" },
    ],
    strict: [
      "Do not accept 4, 7, 9 as Total values.",
      "Allow Sum instead of Total if meaning is clear.",
      "Do not require a perfectly formatted table if values are ordered clearly.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A maximum algorithm inputs 6, 11, 8. Highest is set to the first value. Each next value is compared with Highest and replaces it only if larger. Complete the trace and output.",
    answer: "Initial Highest is 6. Compare 11: 11 > 6, so Highest becomes 11. Compare 8: 8 > 11 is false, so Highest remains 11. Output is 11.",
    marking: [
      { mark: "B1", text: "initialises Highest to first value 6" },
      { mark: "M1", text: "compares 11 with 6" },
      { mark: "A1", text: "updates Highest to 11" },
      { mark: "M1", text: "compares 8 with 11" },
      { mark: "A1", text: "keeps Highest as 11" },
      { mark: "A1", text: "states output 11" },
    ],
    strict: [
      "Do not award update mark if Highest changes to 8 at the end.",
      "Allow equivalent explanation without a table.",
      "Do not require array notation.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A loop inputs numbers until -1 is entered. It should output the total of values before -1. Trace inputs 5, 2, -1 and explain why -1 is not included.",
    answer: "Total starts at 0. Input 5 is not -1, so Total becomes 5. Input 2 is not -1, so Total becomes 7. Input -1 makes the loop condition false, so it is not added. The output is 7.",
    marking: [
      { mark: "B1", text: "initialises or implies Total starts at 0" },
      { mark: "B1", text: "updates Total to 5 after input 5" },
      { mark: "B1", text: "updates Total to 7 after input 2" },
      { mark: "M1", text: "identifies -1 as sentinel/stopping value" },
      { mark: "A1", text: "explains -1 is not added/processed" },
      { mark: "A1", text: "states output 7" },
    ],
    strict: [
      "Do not accept output 6 if -1 has been included.",
      "Allow 'terminating value' for sentinel.",
      "Do not require full WHILE syntax.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain how a trace table can help find a logic error in an algorithm. Refer to variables, expected output and one example error.",
    answer: "A trace table records variable values after each step, so the programmer can compare the actual values with expected values. If an output is wrong, the table can show where a variable first became incorrect. For example, Total may be initialised inside a loop or a sentinel value may be added when it should stop the loop.",
    marking: [
      { mark: "B1", text: "states trace table records variable values during execution" },
      { mark: "B1", text: "links trace to checking expected output" },
      { mark: "B1", text: "explains locating the first incorrect variable/value" },
      { mark: "B1", text: "gives a valid logic-error example" },
    ],
    strict: [
      "Do not accept only 'it makes it easier' without explanation.",
      "Allow examples such as wrong initialisation, missing update, off-by-one loop or sentinel included.",
      "Do not require code.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student traces a FOR loop but writes output on every row. The OUTPUT statement is after NEXT Count. Explain the mistake and state how the output column should be completed.",
    answer: "The mistake is recording output before the OUTPUT statement executes. In a FOR loop where OUTPUT is after NEXT Count, the loop must finish before output is displayed. The output column should be blank or dashed during the loop iterations and should contain the final output only on the final row after the loop.",
    marking: [
      { mark: "B1", text: "identifies output has been recorded too early" },
      { mark: "B1", text: "recognises OUTPUT is after the loop/NEXT Count" },
      { mark: "B1", text: "explains loop iterations must finish before output" },
      { mark: "B1", text: "blank/dash output during loop rows" },
      { mark: "B1", text: "final output recorded once after loop" },
    ],
    strict: [
      "Do not accept output every iteration unless OUTPUT is inside the loop.",
      "Allow 'no output until after loop' for blank/dash rows.",
      "Do not require a specific final numeric output if none is given.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9, -]/g, "");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    a: "Not quite. Those are the inputs, not the running totals.",
    b: "Correct. Total becomes 3, then 8, then 10.",
    c: "Close, but this misses the final update after adding 2.",
    d: "No. Trace values follow execution order, not dramatic countdown order.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupPredictor() {
  const input = document.querySelector("#predictInput");
  const result = document.querySelector("#predictResult");
  document.querySelector("#predictBtn").addEventListener("click", () => {
    const item = predictSets[input.value];
    result.innerHTML = `<strong>Output: ${item.output}</strong><span>${item.values.join(" + ")} = ${item.output}</span>`;
  });
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${head}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupTraceBuilder() {
  const input = document.querySelector("#traceInput");
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const item = traceScenarios[input.value];
    result.innerHTML = `<h3>${item.title}</h3>${tableMarkup(item.headers, item.rows)}<p>${item.note}</p>`;
  });
}

function setupChecker() {
  const input = document.querySelector("#checkerInput");
  const result = document.querySelector("#checkerResult");
  document.querySelector("#checkerBtn").addEventListener("click", () => {
    const item = checkerMap[input.value];
    result.innerHTML = `<strong>${item.verdict}</strong><span>${item.detail}</span>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    ${tableMarkup(example.headers, example.rows)}
    <ul>${example.notes.map((note) => `<li>${note}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
  renderExample("total");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}-mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer">${item.answer}</div>
    </article>
  `).join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const accepted = item.accepted.map(normalise);
      const isCorrect = accepted.includes(value);
      const mark = document.querySelector(`#${item.id}-mark`);
      mark.textContent = isCorrect ? "Correct" : "Try again, then use Show answer.";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
    });
  });

  list.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix-${index}">${item.fix}</div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function setupExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${question.answer}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupPredictor();
setupTraceBuilder();
setupChecker();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
