const subroutineScenarios = [
  {
    id: "menu",
    text: "Display three menu options on screen.",
    recommendation: "Procedure",
    reason: "The subroutine performs output and does not need to return a value.",
  },
  {
    id: "vat",
    text: "Calculate VAT and allow the caller to store the value.",
    recommendation: "Function",
    reason: "The calculated value must be returned to the caller.",
  },
  {
    id: "valid",
    text: "Check whether a mark is between 0 and 100 and use the TRUE/FALSE result.",
    recommendation: "Function",
    reason: "The caller needs a BOOLEAN result for selection or validation logic.",
  },
  {
    id: "print",
    text: "Output a formatted receipt line.",
    recommendation: "Procedure",
    reason: "The subroutine is mainly performing an action, not returning a value.",
  },
];

const examples = {
  menu: {
    title: "Example 1: Procedure to display a menu",
    problem: "Create a reusable subroutine that outputs menu options.",
    rows: [
      ["Header", "PROCEDURE DisplayMenu()", "procedure declaration"],
      ["Body", "OUTPUT menu lines", "performs an action"],
      ["Call", "CALL DisplayMenu()", "runs the procedure"],
    ],
    code: "PROCEDURE DisplayMenu()\n    OUTPUT \"1. Add score\"\n    OUTPUT \"2. View scores\"\n    OUTPUT \"3. Quit\"\nENDPROCEDURE\n\nCALL DisplayMenu()",
    points: ["No return type is needed.", "The procedure performs output.", "CALL is used to run it."],
  },
  vat: {
    title: "Example 2: Function to calculate VAT",
    problem: "Return VAT as 20% of a price.",
    rows: [
      ["Parameter", "Price : REAL", "value passed into the function"],
      ["Return type", "RETURNS REAL", "function returns a real number"],
      ["Return value", "Price * 0.20", "value sent back"],
    ],
    code: "FUNCTION CalculateVAT(Price : REAL) RETURNS REAL\n    RETURN Price * 0.20\nENDFUNCTION\n\nVAT <- CalculateVAT(120.00)",
    points: ["A function header includes RETURNS.", "RETURN sends a value back to the caller.", "The returned value can be assigned to VAT."],
  },
  pass: {
    title: "Example 3: Boolean function",
    problem: "Return TRUE if a mark is at least 50, otherwise FALSE.",
    rows: [
      ["Input", "Mark : INTEGER", "parameter"],
      ["Decision", "Mark >= 50", "condition"],
      ["Result", "TRUE or FALSE", "BOOLEAN return value"],
    ],
    code: "FUNCTION IsPass(Mark : INTEGER) RETURNS BOOLEAN\n    IF Mark >= 50 THEN\n        RETURN TRUE\n    ELSE\n        RETURN FALSE\n    ENDIF\nENDFUNCTION",
    points: ["The return type is BOOLEAN.", "Every path should return a value.", "The caller can use IsPass(Mark) in an IF condition."],
  },
  refactor: {
    title: "Example 4: Remove repeated code",
    problem: "The same three header lines are output in several parts of a program.",
    rows: [
      ["Problem", "repeated OUTPUT lines", "harder to maintain"],
      ["Subroutine", "PROCEDURE DisplayHeader()", "write once"],
      ["Call", "CALL DisplayHeader()", "reuse where needed"],
    ],
    code: "PROCEDURE DisplayHeader()\n    OUTPUT \"School score system\"\n    OUTPUT \"-------------------\"\nENDPROCEDURE\n\nCALL DisplayHeader()",
    points: ["Subroutines reduce duplication.", "A procedure fits repeated output.", "Changing the header later requires one edit."],
  },
};

const practice = [
  { id: "p1", prompt: "Which subroutine type returns a value?", accepted: ["function"], answer: "Function." },
  { id: "p2", prompt: "Which subroutine type performs actions and does not have to return a value?", accepted: ["procedure"], answer: "Procedure." },
  { id: "p3", prompt: "What keyword returns a value from a function?", accepted: ["return"], answer: "RETURN." },
  { id: "p4", prompt: "What keyword closes a Cambridge-style procedure?", accepted: ["endprocedure"], answer: "ENDPROCEDURE." },
  { id: "p5", prompt: "What keyword closes a Cambridge-style function?", accepted: ["endfunction"], answer: "ENDFUNCTION." },
  { id: "p6", prompt: "What keyword is commonly used to run a procedure?", accepted: ["call"], answer: "CALL." },
  { id: "p7", prompt: "In FUNCTION CalculateVAT(Price : REAL), what is Price called?", accepted: ["parameter"], answer: "Price is a parameter." },
  { id: "p8", prompt: "If a subroutine must calculate an average and the caller stores it, procedure or function?", accepted: ["function"], answer: "Function, because the average must be returned." },
  { id: "p9", prompt: "Can a procedure be used as Total <- DisplayMenu()? yes or no.", accepted: ["no"], answer: "No. A procedure does not return a value for assignment." },
  { id: "p10", prompt: "What Cambridge keyword states the data type returned by a function?", accepted: ["returns"], answer: "RETURNS." },
];

const mistakes = [
  {
    wrong: "A student writes FUNCTION CalculateVAT(Price : REAL) RETURNS REAL but never uses RETURN.",
    fix: "Add a RETURN statement such as RETURN Price * 0.20 so a REAL value is sent back to the caller.",
  },
  {
    wrong: "A student uses a procedure call in an assignment: Total <- DisplayMenu().",
    fix: "Use CALL DisplayMenu() for a procedure. Use a function only when a returned value is needed.",
  },
  {
    wrong: "A student says OUTPUT and RETURN are the same.",
    fix: "OUTPUT displays a value to the user. RETURN sends a value back to the calling algorithm.",
  },
  {
    wrong: "A student writes Java static double syntax in a Cambridge pseudocode answer.",
    fix: "Use FUNCTION Name(Parameter : Type) RETURNS Type ... ENDFUNCTION. Java is support only.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Write Cambridge-style pseudocode for a procedure DisplayMenu that outputs Add score and Quit. Show how the procedure is called.",
    answer: "PROCEDURE DisplayMenu()\n    OUTPUT \"Add score\"\n    OUTPUT \"Quit\"\nENDPROCEDURE\n\nCALL DisplayMenu()",
    marking: [
      { mark: "B1", text: "uses PROCEDURE DisplayMenu or equivalent procedure header" },
      { mark: "B1", text: "outputs Add score or equivalent menu option" },
      { mark: "B1", text: "outputs Quit or equivalent menu option" },
      { mark: "A1", text: "closes the procedure using ENDPROCEDURE" },
      { mark: "B1", text: "calls the procedure using CALL DisplayMenu() or equivalent" },
    ],
    strict: [
      "Do not award function return marks for this procedure-only task.",
      "Allow different menu wording if the two required choices are clear.",
      "Do not accept Java method syntax alone as Cambridge pseudocode.",
      "Allow an equivalent procedure if it is used consistently.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Write a function CalculateVAT that takes Price as a REAL parameter and returns Price * 0.20 as a REAL. Show a call that stores the returned value in VAT.",
    answer: "FUNCTION CalculateVAT(Price : REAL) RETURNS REAL\n    RETURN Price * 0.20\nENDFUNCTION\n\nVAT <- CalculateVAT(Price)",
    marking: [
      { mark: "B1", text: "uses FUNCTION CalculateVAT or equivalent function header" },
      { mark: "B1", text: "declares Price as a REAL parameter or equivalent" },
      { mark: "A1", text: "states RETURNS REAL" },
      { mark: "M1", text: "calculates Price * 0.20 or equivalent VAT calculation" },
      { mark: "A1", text: "uses RETURN with the calculated value" },
      { mark: "B1", text: "closes function using ENDFUNCTION" },
      { mark: "A1", text: "shows returned value stored in VAT" },
    ],
    strict: [
      "Do not award return mark for OUTPUT Price * 0.20 alone.",
      "Allow Price * 20 / 100 as equivalent calculation.",
      "Do not accept PROCEDURE if the value must be returned and stored.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain two differences between a procedure and a function. Use an example of each.",
    answer: "A procedure performs an action and does not have to return a value, for example DisplayMenu outputs menu lines. A function returns a value to the caller, for example CalculateVAT returns Price * 0.20, which can be assigned to VAT.",
    marking: [
      { mark: "B1", text: "states procedure performs an action / does not have to return a value" },
      { mark: "B1", text: "gives suitable procedure example" },
      { mark: "B1", text: "states function returns a value" },
      { mark: "B1", text: "gives suitable function example" },
      { mark: "B1", text: "explains returned value can be used by the caller" },
    ],
    strict: [
      "Do not award difference marks for vague claims such as 'functions are better'.",
      "Allow method/subroutine wording if procedure/function distinction is clear.",
      "Do not accept OUTPUT as equivalent to RETURN.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Write a BOOLEAN function IsValidMark that takes Mark as an INTEGER and returns TRUE if Mark is between 0 and 100 inclusive, otherwise FALSE.",
    answer: "FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN\n    IF Mark >= 0 AND Mark <= 100 THEN\n        RETURN TRUE\n    ELSE\n        RETURN FALSE\n    ENDIF\nENDFUNCTION",
    marking: [
      { mark: "B1", text: "uses FUNCTION IsValidMark or equivalent function header" },
      { mark: "B1", text: "declares Mark as INTEGER parameter" },
      { mark: "A1", text: "states RETURNS BOOLEAN" },
      { mark: "M1", text: "tests lower bound Mark >= 0" },
      { mark: "M1", text: "tests upper bound Mark <= 100" },
      { mark: "A1", text: "combines bounds correctly and returns TRUE for valid marks" },
      { mark: "A1", text: "returns FALSE for invalid marks and closes the function" },
    ],
    strict: [
      "Do not award valid-range logic mark for OR between the two valid bounds.",
      "Allow 0 <= Mark <= 100 if written clearly.",
      "Do not accept a procedure because a BOOLEAN result is required.",
      "Allow an equivalent Boolean labels if it is used consistently.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student writes a function with RETURNS INTEGER but only outputs the calculated value. Explain the error and give the correction.",
    answer: "The error is that OUTPUT displays the value but does not send it back to the caller. A function with RETURNS INTEGER must use RETURN with an INTEGER expression, for example RETURN Total.",
    marking: [
      { mark: "B1", text: "explains OUTPUT displays to the user" },
      { mark: "B1", text: "explains RETURN sends a value back to the caller" },
      { mark: "B1", text: "states the function must use RETURN" },
      { mark: "B1", text: "states returned expression should match INTEGER return type" },
      { mark: "B1", text: "gives a suitable correction such as RETURN Total" },
    ],
    strict: [
      "Do not award full correction for adding OUTPUT only.",
      "Allow any suitable INTEGER expression in the RETURN statement.",
      "Do not accept changing it to a procedure unless the question no longer requires a returned value.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9:<>=\[\] %_.-]/g, "");
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
  const messages = {
    procedure: "Not best. A procedure can calculate or output, but it does not return a value for the caller to store.",
    function: "Correct. The caller needs a returned REAL value, so a function is appropriate.",
    output: "This may display VAT, but it does not return VAT to the main program.",
    java: "Java support only. In Cambridge pseudocode, use FUNCTION ... RETURNS ...",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupReturnSimulator() {
  const result = document.querySelector("#returnResult");
  document.querySelector("#returnBtn").addEventListener("click", () => {
    const price = Number(document.querySelector("#priceInput").value);
    if (!Number.isFinite(price) || price < 0) {
      result.textContent = "Enter a non-negative numeric price.";
      return;
    }
    const vat = price * 0.2;
    result.innerHTML = `
      <p><strong>Function call:</strong> VAT &lt;- CalculateVAT(${price.toFixed(2)})</p>
      <p><strong>Returned value:</strong> ${vat.toFixed(2)}</p>
      <p><strong>Why function?</strong> The value is returned and can be assigned to VAT.</p>
    `;
  });
}

function setupChooser() {
  const select = document.querySelector("#scenarioSelect");
  const result = document.querySelector("#chooseResult");
  select.innerHTML = subroutineScenarios.map((item) => `<option value="${item.id}">${escapeHtml(item.text)}</option>`).join("");
  document.querySelector("#chooseBtn").addEventListener("click", () => {
    const item = subroutineScenarios.find((entry) => entry.id === select.value);
    result.innerHTML = `
      <p><strong>Recommendation:</strong> ${escapeHtml(item.recommendation)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      ${tableMarkup(["Part", "Pseudocode feature", "Reason"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("menu");
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map((item, index) => `
      <article class="practice-card">
        <label for="${item.id}"><strong>${index + 1}. ${escapeHtml(item.prompt)}</strong></label>
        <div class="answer-row">
          <input id="${item.id}" type="text" autocomplete="off" />
          <button type="button" class="check-btn" data-practice="${item.id}">Check</button>
        </div>
        <p class="mark" id="${item.id}-mark" aria-live="polite"></p>
        <button type="button" class="answer-toggle" data-answer="${item.id}">Show answer</button>
        <div class="answer-panel" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.practice);
      const input = document.querySelector(`#${item.id}`);
      const mark = document.querySelector(`#${item.id}-mark`);
      const response = normalise(input.value);
      const correct = item.accepted.some((answer) => response === normalise(answer) || response.includes(normalise(answer)));
      mark.textContent = correct ? "Correct. The subroutine concept is precise." : "Not quite. Check whether the subroutine returns a value, takes parameters or is being called.";
      mark.className = `mark ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes
    .map((item, index) => `
      <article>
        <h3>Mistake ${index + 1}</h3>
        <p>${escapeHtml(item.wrong)}</p>
        <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
        <div class="answer-panel" id="fix-${index}">${escapeHtml(item.fix)}</div>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions
    .map((question, index) => `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${escapeHtml(question.title)}</h3>
          <span>${escapeHtml(question.marks)}</span>
        </div>
        <p>${escapeHtml(question.prompt)}</p>
        <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
        <div class="ms-panel" id="ms-${index}">
          <p><strong>Answer:</strong></p>
          <pre><code>${escapeHtml(question.answer)}</code></pre>
          <p><strong>Mark scheme:</strong></p>
          <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
        </div>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupReturnSimulator();
setupChooser();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
