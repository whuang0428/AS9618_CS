const breakpointAdvice = {
  condition: {
    title: "Pause at the decision line",
    breakpoint: "Line 2: IF Mark > 50 THEN",
    watch: "Mark and the evaluated condition",
    reason: "The fault is likely in whether 50 is treated as passing, so inspect the condition before the branch is taken.",
  },
  total: {
    title: "Pause inside the loop",
    breakpoint: "The line that updates Total",
    watch: "Total, current item value and loop counter",
    reason: "A wrong total is often caused by an update in the wrong place, a reset inside the loop, or a missed item.",
  },
  procedure: {
    title: "Step into the procedure",
    breakpoint: "The call to CalculateGrade, then step into it",
    watch: "Parameter values, return value and any local variables",
    reason: "If the procedure output is wrong, inspect the data passed in and the decision logic inside the procedure.",
  },
};

const examples = {
  trace: {
    title: "Example 1: Trace the boundary mark",
    problem: "The intended rule is 50 or more passes, but the code uses IF Mark > 50. Trace Mark = 50.",
    table: [
      ["1", "INPUT Mark", "50", "-", "-"],
      ["2", "IF Mark > 50", "50", "False", "-"],
      ["3", "ELSE branch", "50", "-", "Resit needed"],
    ],
    points: [
      "The trace records the actual path through the algorithm.",
      "For Mark = 50, the actual output is wrong.",
      "The likely fix is to use greater than or equal to.",
    ],
  },
  breakpoint: {
    title: "Example 2: Place a breakpoint",
    problem: "A program gives the wrong message when Mark is 50. Where should the breakpoint go?",
    table: [
      ["Best line", "IF Mark > 50 THEN", "pause before the decision is applied"],
      ["Watch", "Mark", "confirm the value is 50"],
      ["Inspect", "condition result", "shows False when it should allow a pass"],
    ],
    points: [
      "Place breakpoints near the suspected fault.",
      "Watch the relevant variables, not every variable in the program.",
      "Use the paused state to compare actual and expected behaviour.",
    ],
  },
  step: {
    title: "Example 3: Step into a subroutine",
    problem: "The displayed grade is wrong after Grade <- CalculateGrade(Mark). What should be inspected?",
    table: [
      ["Before call", "Mark", "check the parameter value being passed"],
      ["Step into", "CalculateGrade", "inspect the grade decision logic"],
      ["After return", "Grade", "compare returned value with expected grade"],
    ],
    points: [
      "Step over if the subroutine is trusted.",
      "Step into if the subroutine may contain the fault.",
      "A trace can record parameter and return values.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the process of finding and correcting faults in a program called?", accepted: ["debugging"], answer: "Debugging." },
  { id: "p2", prompt: "What debugging tool pauses execution at a chosen line?", accepted: ["breakpoint", "break point"], answer: "A breakpoint." },
  { id: "p3", prompt: "What table records variable values after each important step?", accepted: ["trace", "trace table"], answer: "A trace table." },
  { id: "p4", prompt: "Which kind of error can make a program run but produce the wrong output?", accepted: ["logic", "logical"], answer: "A logic error." },
  { id: "p5", prompt: "For IF Mark > 50, what is the condition result when Mark is 50?", accepted: ["false"], answer: "False." },
  { id: "p6", prompt: "For IF Mark > 50, what output occurs when Mark is 50 in the lesson example?", accepted: ["resit", "resit needed"], answer: "Resit needed." },
  { id: "p7", prompt: "What should the faulty condition IF Mark > 50 become if 50 should pass?", accepted: [">= 50", "mark >= 50", "greater than or equal"], answer: "IF Mark >= 50 THEN." },
  { id: "p8", prompt: "Which command action enters a called procedure during debugging: step over or step into?", accepted: ["step into"], answer: "Step into." },
  { id: "p9", prompt: "Name one variable worth watching when debugging a total-calculation loop.", accepted: ["total", "counter", "index", "item", "price"], answer: "Total, loop counter/index, or the current item value." },
  { id: "p10", prompt: "Why is a prediction useful before stepping through code?", accepted: ["compare", "expected", "actual", "fault"], answer: "It lets you compare expected behaviour with actual behaviour and spot the fault." },
];

const mistakes = [
  {
    wrong: "A student places a breakpoint at the last line only, after the wrong output has already appeared.",
    fix: "Place the breakpoint before or on the suspected decision or calculation line so the state can be inspected before the fault affects the result.",
  },
  {
    wrong: "A trace table lists the code lines but no variable values.",
    fix: "A useful trace table records the changing values of relevant variables and any output after each important step.",
  },
  {
    wrong: "A student says the code has a syntax error because 50 gets the wrong message.",
    fix: "The program runs, so this is a logic error. The condition is syntactically valid but does not match the intended rule.",
  },
  {
    wrong: "A student writes Java debugger screenshots as the whole answer to a Cambridge pseudocode trace question.",
    fix: "Use screenshots only for practice. In the exam, provide the requested trace table, explanation, or Cambridge-style pseudocode.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A program should output Pass when Mark is 50 or more. It uses IF Mark > 50 THEN. Complete a trace for Mark = 50 and identify the fault.",
    answer: "Mark is 50. The condition Mark > 50 is False, so the ELSE branch runs and outputs Resit needed. The fault is that the comparison excludes 50; it should use Mark >= 50.",
    marking: [
      { mark: "B1", text: "records Mark as 50 in the trace" },
      { mark: "B1", text: "evaluates Mark > 50 as False" },
      { mark: "A1", text: "states that the ELSE branch is executed" },
      { mark: "A1", text: "states the actual output is Resit needed" },
      { mark: "M1", text: "identifies the comparison operator as the fault" },
      { mark: "A1", text: "gives a correct fix using >= 50 or equivalent" },
    ],
    strict: [
      "Do not award condition mark if candidate says 50 > 50 is True.",
      "Allow equivalent output wording if it matches the supplied code.",
      "Do not accept 'syntax error' as the identified fault.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Explain how a breakpoint and watched variables can help debug a program that calculates a total in a loop.",
    answer: "A breakpoint can pause execution inside the loop at the line where Total is updated. Watched variables such as Total, the current item value and the loop counter can be inspected after each iteration. This helps show whether Total is reset, updated with the wrong value or updated the wrong number of times.",
    marking: [
      { mark: "B1", text: "states that a breakpoint pauses execution at a chosen line" },
      { mark: "B1", text: "places the breakpoint at or near the Total update inside the loop" },
      { mark: "B1", text: "names Total as a variable to watch" },
      { mark: "B1", text: "names another relevant variable such as current item value or loop counter" },
      { mark: "B1", text: "explains that values can be inspected after each iteration" },
      { mark: "B1", text: "links inspection to finding a specific fault such as reset, wrong value or missed iteration" },
    ],
    strict: [
      "Do not award full marks for saying only 'it finds the bug'.",
      "Allow 'stop the program' for breakpoint if pause/inspect meaning is clear.",
      "Do not require a named IDE.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Describe the difference between step over and step into when debugging a program that calls a procedure.",
    answer: "Step over executes the next line without entering the called procedure, so it treats the procedure call as one step. Step into enters the procedure so its internal statements can be inspected. Step into is useful when the fault may be inside the procedure.",
    marking: [
      { mark: "B1", text: "states step over executes the call without entering the procedure" },
      { mark: "B1", text: "explains step over treats the call as one step or returns to the next line" },
      { mark: "B1", text: "states step into enters the called procedure" },
      { mark: "B1", text: "explains step into allows internal statements/variables to be inspected" },
      { mark: "B1", text: "gives a suitable reason for choosing one method in context" },
    ],
    strict: [
      "Do not award both definition marks if the two terms are swapped.",
      "Allow function or subroutine instead of procedure.",
      "Do not accept vague answers about 'going faster' without reference to entering a call.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Create a trace table for the pseudocode: Count <- 0; FOR Index <- 1 TO 3; Count <- Count + Index; NEXT Index; OUTPUT Count.",
    answer: "The trace should show Count starts at 0. At Index 1, Count becomes 1. At Index 2, Count becomes 3. At Index 3, Count becomes 6. The final output is 6.",
    marking: [
      { mark: "B1", text: "initialises Count to 0" },
      { mark: "B1", text: "shows Index = 1" },
      { mark: "A1", text: "shows Count = 1 after first iteration" },
      { mark: "B1", text: "shows Index = 2" },
      { mark: "A1", text: "shows Count = 3 after second iteration" },
      { mark: "A1", text: "shows Count = 6 after third iteration" },
      { mark: "A1", text: "states final output is 6" },
    ],
    strict: [
      "Do not award final output mark for 3 or 7.",
      "Allow table, structured list or clear sequence of variable values.",
      "Do not require every unchanged value to be repeated if the trace is unambiguous.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A candidate says breakpoints are only useful for syntax errors. Explain why this is incorrect and describe one suitable use of a breakpoint.",
    answer: "Syntax errors are usually found before execution because the program cannot run correctly. Breakpoints are especially useful for logic errors because the program can pause while it is running, allowing values and conditions to be inspected. For example, a breakpoint at an IF statement can show whether a boundary value takes the wrong branch.",
    marking: [
      { mark: "B1", text: "states syntax errors are detected before or when attempting execution" },
      { mark: "B1", text: "states breakpoints pause a running program" },
      { mark: "B1", text: "explains that variable values or conditions can be inspected" },
      { mark: "B1", text: "identifies logic errors as a suitable target for breakpoints" },
      { mark: "B1", text: "gives a suitable breakpoint location such as an IF statement or calculation" },
      { mark: "B1", text: "links the breakpoint to finding a wrong branch/value/result" },
    ],
    strict: [
      "Do not accept 'breakpoints fix syntax errors automatically'.",
      "Allow runtime fault examples if pause and inspect are explained.",
      "Do not award context marks for random breakpoint placement.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ");
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
    input: { text: "Input is useful, but the suspected fault is the branch condition. Pause closer to the decision.", correct: false },
    if: { text: "Correct. The IF line is where the wrong branch is chosen.", correct: true },
    pass: { text: "This is after the decision. It may be too late to inspect why the branch was chosen.", correct: false },
    end: { text: "ENDIF is after the branch has finished. It is not the best place to inspect the condition.", correct: false },
  };

  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const result = messages[button.dataset.hook];
      feedback.textContent = result.text;
      feedback.className = `feedback ${result.correct ? "correct" : "incorrect"}`;
    });
  });
}

function setupTraceSimulator() {
  const input = document.querySelector("#markInput");
  const output = document.querySelector("#traceOutput");
  const render = () => {
    const value = Number.parseInt(input.value, 10);
    if (Number.isNaN(value)) {
      output.innerHTML = "<p><strong>Input error:</strong> enter an integer mark to trace.</p>";
      return;
    }
    const condition = value > 50;
    const actualOutput = condition ? "Pass" : "Resit needed";
    const expectedOutput = value >= 50 ? "Pass" : "Resit needed";
    const verdict = actualOutput === expectedOutput ? "The faulty condition happens to match the expected output for this value." : "Fault exposed: actual output differs from expected output.";
    output.innerHTML = `
      ${tableMarkup(["Step", "Mark", "Condition Mark > 50", "Actual output"], [
        ["Input", value, "-", "-"],
        ["IF line", value, condition ? "True" : "False", "-"],
        ["Branch", value, "-", actualOutput],
      ])}
      <p><strong>Expected output:</strong> ${escapeHtml(expectedOutput)}</p>
      <p><strong>Verdict:</strong> ${escapeHtml(verdict)}</p>
    `;
  };
  document.querySelector("#traceBtn").addEventListener("click", render);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") render();
  });
  render();
}

function setupBreakpointChooser() {
  const select = document.querySelector("#bugSelect");
  const output = document.querySelector("#breakpointOutput");
  const render = () => {
    const advice = breakpointAdvice[select.value];
    output.innerHTML = `
      <p><strong>${escapeHtml(advice.title)}</strong></p>
      <p><strong>Breakpoint:</strong> ${escapeHtml(advice.breakpoint)}</p>
      <p><strong>Watch:</strong> ${escapeHtml(advice.watch)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(advice.reason)}</p>
    `;
  };
  document.querySelector("#chooseBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function renderExample(key) {
  const example = examples[key];
  const headers = example.table[0].length === 5
    ? ["Line", "Statement", "Variable", "Condition", "Output"]
    : ["Focus", "Action", "Reason"];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="example-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p>${escapeHtml(example.problem)}</p>
      ${tableMarkup(headers, example.table)}
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("trace");
}

function setupPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <label for="${item.id}"><strong>${index + 1}.</strong> ${escapeHtml(item.prompt)}</label>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
        <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite"></div>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value.includes(answer));
      feedback.textContent = correct ? "Correct." : "Not quite. Reveal the answer and compare the exact wording.";
      feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show answer" : "Hide answer";
    });
  });
}

function setupMistakes() {
  const container = document.querySelector("#mistakeList");
  container.innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p>${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="m${index}">Show correction</button>
      <div class="answer-panel hidden" id="m${index}-fix">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}-fix`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show correction" : "Hide correction";
    });
  });
}

function setupExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Answer</h4>
        <p>${escapeHtml(question.answer)}</p>
        <h4>Mark scheme</h4>
        <ul>${question.marking.map((row) => `<li><strong>${escapeHtml(row.mark)}</strong> ${escapeHtml(row.text)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}-ms`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show MS" : "Hide MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupTraceSimulator();
  setupBreakpointChooser();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
