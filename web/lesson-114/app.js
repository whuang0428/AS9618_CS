const builderMap = {
  declareCounter: {
    statement: "DECLARE Count : INTEGER",
    reason: "A counter is a whole-number variable.",
  },
  constantPass: {
    statement: "CONSTANT PassMark = 50",
    reason: "The pass mark is a fixed named value.",
  },
  initialiseTotal: {
    statement: "Total <- 0",
    reason: "Initialisation gives Total a known starting value before accumulation.",
  },
  incrementCount: {
    statement: "Count <- Count + 1",
    reason: "The right side uses the old Count, then stores the increased value.",
  },
  setFlag: {
    statement: "Found <- TRUE",
    reason: "A Boolean flag can be set when the required condition is found.",
  },
  calculateAverage: {
    statement: "Average <- Total / Count",
    reason: "The expression is evaluated first, then stored in Average.",
  },
};

const examples = {
  score: {
    title: "Example 1: Running total and count",
    problem: "Trace Total and Count for marks 20, 35 and 45.",
    rows: [
      ["Start", "-", "0", "0"],
      ["After 20", "20", "20", "1"],
      ["After 35", "35", "55", "2"],
      ["After 45", "45", "100", "3"],
    ],
    code: "Total <- 0\nCount <- 0\nINPUT Mark\nTotal <- Total + Mark\nCount <- Count + 1",
    points: ["Initialise before updating.", "The old Total is used on the right side.", "Count increases by exactly 1 per valid input."],
  },
  passmark: {
    title: "Example 2: Constant for a pass mark",
    problem: "Use a named constant instead of repeating the literal value 50.",
    rows: [
      ["Fixed value", "PassMark", "50", "constant"],
      ["Input value", "Mark", "student mark", "variable"],
      ["Decision", "Mark >= PassMark", "pass test", "comparison"],
    ],
    code: "CONSTANT PassMark = 50\nDECLARE Mark : INTEGER\n\nINPUT Mark\nIF Mark >= PassMark THEN\n    OUTPUT \"Pass\"\nENDIF",
    points: ["PassMark explains what 50 means.", "The constant is not reassigned.", "Comparison uses = or >=; assignment uses <-."],
  },
  swap: {
    title: "Example 3: Swapping two values needs a temporary variable",
    problem: "Swap A and B when A = 4 and B = 9.",
    rows: [
      ["Start", "A = 4", "B = 9", "Temp empty"],
      ["Temp <- A", "A = 4", "B = 9", "Temp = 4"],
      ["A <- B", "A = 9", "B = 9", "Temp = 4"],
      ["B <- Temp", "A = 9", "B = 4", "Temp = 4"],
    ],
    code: "Temp <- A\nA <- B\nB <- Temp",
    points: ["Assignment overwrites the left-hand variable.", "A temporary variable preserves the old value.", "Order matters."],
  },
  flag: {
    title: "Example 4: Boolean flag assignment",
    problem: "Use Found to record whether the target has appeared.",
    rows: [
      ["Initial state", "Found", "FALSE", "target not seen yet"],
      ["Target found", "Found", "TRUE", "state is updated"],
      ["After search", "Found", "TRUE/FALSE", "output depends on flag"],
    ],
    code: "Found <- FALSE\nIF Item = Target THEN\n    Found <- TRUE\nENDIF",
    points: ["A flag is normally initialised before search.", "Set it when the condition becomes true.", "Do not use STRING values such as \"yes\" when BOOLEAN is suitable."],
  },
};

const practice = [
  { id: "p1", prompt: "Which Cambridge symbol is used for assignment?", accepted: ["<-", "←"], answer: "<-" },
  { id: "p2", prompt: "Read Count <- Count + 1 as Count is set to what?", accepted: ["count plus 1", "old count plus 1", "count + 1", "one more than count"], answer: "The old Count plus 1." },
  { id: "p3", prompt: "Should a constant be changed later in the algorithm? yes or no.", accepted: ["no"], answer: "No. If it changes, it should be a variable." },
  { id: "p4", prompt: "What keyword declares a variable in Cambridge-style pseudocode?", accepted: ["declare"], answer: "DECLARE" },
  { id: "p5", prompt: "Write the keyword for a fixed named value.", accepted: ["constant"], answer: "CONSTANT" },
  { id: "p6", prompt: "If Total starts at 10 and Mark is 5, what is Total after Total <- Total + Mark?", accepted: ["15"], answer: "15" },
  { id: "p7", prompt: "If Count starts at 3, what is Count after Count <- Count + 1?", accepted: ["4"], answer: "4" },
  { id: "p8", prompt: "In A <- B, which variable changes: A or B?", accepted: ["a"], answer: "A changes. B is read from." },
  { id: "p9", prompt: "In IF Mark = PassMark THEN, is = assignment or comparison?", accepted: ["comparison", "compare"], answer: "Comparison." },
  { id: "p10", prompt: "Is Java '=' the preferred Paper 2 pseudocode assignment symbol? yes or no.", accepted: ["no"], answer: "No. Use <- in Cambridge-style pseudocode." },
];

const mistakes = [
  {
    wrong: "I read Count <- Count + 1 as a mathematical equation.",
    fix: "Read it as assignment: calculate the old Count + 1, then store that value back into Count.",
  },
  {
    wrong: "I changed PassMark after declaring it as a constant.",
    fix: "A constant should not be reassigned. Use a variable if the value must change during execution.",
  },
  {
    wrong: "I wrote Total + Mark <- Total.",
    fix: "The variable being updated goes on the left. The expression being calculated goes on the right: Total <- Total + Mark.",
  },
  {
    wrong: "I used Java syntax in a Cambridge pseudocode trace question.",
    fix: "Use Cambridge-style symbols and keywords: DECLARE, CONSTANT, <-, IF/ENDIF. Java is only supporting syntax.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Declare variables for Total, Count and Average. Then initialise Total and Count to zero using Cambridge-style pseudocode.",
    answer: "DECLARE Total : INTEGER\nDECLARE Count : INTEGER\nDECLARE Average : REAL\n\nTotal <- 0\nCount <- 0",
    marking: [
      { mark: "B1", text: "declares Total with a suitable numeric type" },
      { mark: "B1", text: "declares Count as INTEGER" },
      { mark: "B1", text: "declares Average as REAL or suitable numeric type allowing decimals" },
      { mark: "M1", text: "uses clear Cambridge-style DECLARE syntax" },
      { mark: "A1", text: "initialises Total to 0 using assignment" },
      { mark: "A1", text: "initialises Count to 0 using assignment" },
    ],
    strict: [
      "Java declarations alone should not receive the Cambridge syntax mark.",
      "Allow Total as REAL if later values may be decimal.",
      "Do not award initialisation marks for only declaring the variables.",
      "FT: initialisation marks can follow from candidate's equivalent variable names.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain the difference between a variable and a constant, using PassMark as an example.",
    answer: "A variable is a named storage location whose value can change while the program runs. A constant is a named value that should not change after it is defined. PassMark is suitable as a constant if the pass mark is fixed, for example CONSTANT PassMark = 50, because the same value can be used clearly without repeating 50.",
    marking: [
      { mark: "B1", text: "defines variable as named storage / value can change" },
      { mark: "B1", text: "defines constant as named value / value should not change" },
      { mark: "M1", text: "applies constant idea to fixed PassMark" },
      { mark: "A1", text: "gives suitable constant example or declaration" },
      { mark: "A1", text: "explains benefit such as readability, maintainability or avoiding repeated literals" },
    ],
    strict: [
      "Do not accept 'constant is a variable' without stating it should not change.",
      "Allow PassMark <- 50 only if the answer clearly treats it as a fixed named value, but prefer CONSTANT syntax.",
      "Do not award benefit mark for vague 'better' without cause.",
      "FT: example mark can follow from any sensible fixed value.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Trace the following pseudocode: X <- 4, Y <- 9, X <- X + Y, Y <- X - Y. State final X and Y.",
    answer: "After X <- 4, X = 4. After Y <- 9, Y = 9. After X <- X + Y, X = 13 and Y = 9. After Y <- X - Y, Y = 4. Final X = 13 and Y = 4.",
    marking: [
      { mark: "B1", text: "sets X to 4" },
      { mark: "B1", text: "sets Y to 9" },
      { mark: "M1", text: "correctly evaluates X <- X + Y using old X and Y" },
      { mark: "A1", text: "gets X = 13 after third assignment" },
      { mark: "M1", text: "correctly evaluates Y <- X - Y using current X" },
      { mark: "A1", text: "final Y = 4 with final X = 13" },
    ],
    strict: [
      "assignment statements must be traced in order.",
      "Allow a trace table instead of prose.",
      "Do not use original X = 4 when evaluating the final statement if X has already changed.",
      "FT: final Y may follow from candidate's previous X if arithmetic is consistent.",
      "Do not award a mark for a vague answer that does not identify the required technical point.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A student writes Total + Mark <- Total. Explain the error and correct it.",
    answer: "The error is that the left-hand side of assignment must be a variable that can store a value. Total + Mark is an expression, not a storage location. The corrected statement is Total <- Total + Mark, which evaluates old Total plus Mark and stores the result in Total.",
    marking: [
      { mark: "B1", text: "identifies left side must be a variable/storage location" },
      { mark: "M1", text: "identifies Total + Mark is an expression" },
      { mark: "A1", text: "states expression cannot receive/store the assignment result" },
      { mark: "B1", text: "gives corrected statement Total <- Total + Mark" },
      { mark: "M1", text: "explains right-hand side is evaluated first" },
      { mark: "A1", text: "explains result is stored in Total" },
    ],
    strict: [
      "Do not award correction mark for reversing to Mark <- Total + Mark.",
      "Allow 'identifier' for variable/storage location.",
      "Do not accept 'syntax is wrong' without explaining direction or expression.",
      "FT: explanation marks can follow from a logically equivalent running total correction.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Write pseudocode that defines a constant MaxStudents as 30, declares StudentCount as an INTEGER, inputs StudentCount, and outputs 'Full' if StudentCount equals MaxStudents.",
    answer: "CONSTANT MaxStudents = 30\nDECLARE StudentCount : INTEGER\n\nINPUT StudentCount\nIF StudentCount = MaxStudents THEN\n    OUTPUT \"Full\"\nENDIF",
    marking: [
      { mark: "B1", text: "defines constant MaxStudents with value 30" },
      { mark: "B1", text: "declares StudentCount as INTEGER" },
      { mark: "M1", text: "inputs StudentCount" },
      { mark: "M1", text: "uses comparison StudentCount = MaxStudents" },
      { mark: "A1", text: "outputs Full when comparison is true" },
      { mark: "B1", text: "uses clear Cambridge-style block structure" },
    ],
    strict: [
      "comparison in IF may use =; assignment should use <-.",
      "Allow equivalent identifier case.",
      "Do not award comparison mark if MaxStudents is assigned a new value inside the IF.",
      "FT: output mark can follow from candidate's equivalent full-condition variable.",
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9<+\- =←]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${escapeHtml(head)}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${escapeHtml(cell)}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    impossible: "In mathematics it looks impossible; in pseudocode it is assignment, so it updates the stored value.",
    update: "Correct. The old Score is read, 10 is added, and the result is stored back in Score.",
    compare: "Comparison normally appears inside a condition such as IF Score = 10 THEN.",
    constant: "A constant is declared with CONSTANT and should not be updated.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const result = document.querySelector("#simulateResult");
  document.querySelector("#simulateBtn").addEventListener("click", () => {
    const oldTotal = Number(document.querySelector("#oldTotal").value);
    const mark = Number(document.querySelector("#markValue").value);
    if (!Number.isFinite(oldTotal) || !Number.isFinite(mark)) {
      result.textContent = "Enter numeric values before running the assignment.";
      return;
    }
    const updated = oldTotal + mark;
    result.innerHTML = `
      <p>Right side first: old Total + Mark = ${oldTotal} + ${mark} = ${updated}</p>
      <p>Then store the result: <strong>Total is now ${updated}</strong>.</p>
    `;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.innerHTML = `
      <pre><code>${escapeHtml(item.statement)}</code></pre>
      <p>${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Step", "Value 1", "Value 2", "Note"], example.rows)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("score");
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
}

function renderPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <h3>${index + 1}. ${escapeHtml(item.prompt)}</h3>
      <div class="practice-row">
        <input type="text" id="${item.id}" aria-label="Answer for practice question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct. The statement meaning is clear." : "Not quite. Check direction, keyword or current value.";
      mark.className = correct ? "mark correct" : "mark incorrect";
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p class="wrong">${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupBuilder();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
