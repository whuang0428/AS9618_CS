const scenarios = [
  {
    id: "temp",
    text: "A temporary value used only while calculating a bonus inside one procedure.",
    recommendation: "Local variable",
    reason: "It is needed only inside the procedure, so limiting its scope avoids unnecessary access elsewhere.",
  },
  {
    id: "count",
    text: "A running total used by several procedures throughout the program.",
    recommendation: "Global variable, if carefully managed",
    reason: "Several parts of the program need the same value, but updates must be traced carefully.",
  },
  {
    id: "loop",
    text: "A loop counter used only inside a procedure that prints 10 lines.",
    recommendation: "Local variable",
    reason: "The counter has no useful purpose outside that procedure call.",
  },
  {
    id: "config",
    text: "A constant maximum mark used by many validation routines.",
    recommendation: "Global constant",
    reason: "A shared constant is clearer than repeated literal values, and it should not be changed accidentally.",
  },
];

const examples = {
  local: {
    title: "Example 1: Local variable lifetime",
    problem: "Trace whether Bonus can be used after the procedure call.",
    rows: [
      ["Procedure starts", "Mark = 78", "parameter is available inside the call"],
      ["Inside procedure", "Bonus = 7", "Bonus is local"],
      ["Procedure ends", "Bonus unavailable", "local variable lifetime ends"],
      ["Main program", "cannot OUTPUT Bonus directly", "Bonus is outside scope"],
    ],
    code: "PROCEDURE ShowBonus(Mark : INTEGER)\n    Bonus <- Mark DIV 10\n    OUTPUT Bonus\nENDPROCEDURE\n\nCALL ShowBonus(78)",
    points: [
      "Bonus is declared inside the procedure.",
      "Its scope is limited to the procedure.",
      "Its lifetime ends when the procedure call finishes.",
    ],
  },
  global: {
    title: "Example 2: Global variable update",
    problem: "Trace a global total that is updated by a procedure.",
    rows: [
      ["Before call", "Total = 10", "Total is declared outside subroutines"],
      ["Call", "CALL AddScore(5)", "Score is local parameter"],
      ["Inside procedure", "Total = 15", "global Total is updated"],
      ["After call", "Total = 15", "global value remains changed"],
    ],
    code: "Total <- 10\n\nPROCEDURE AddScore(Score : INTEGER)\n    Total <- Total + Score\nENDPROCEDURE\n\nCALL AddScore(5)\nOUTPUT Total",
    points: [
      "Total is global because it is declared outside the procedure.",
      "Score is local to the procedure call.",
      "The final output is 15.",
    ],
  },
  shadow: {
    title: "Example 3: Same name, different scope",
    problem: "Trace a local Score that hides a global Score.",
    rows: [
      ["Global declaration", "Score = 50", "main program variable"],
      ["Inside procedure", "Score = 80", "local variable with same name"],
      ["Procedure output", "80", "local value"],
      ["Main output", "50", "global value unchanged"],
    ],
    code: "Score <- 50\n\nPROCEDURE ChangeScore()\n    Score <- 80\n    OUTPUT Score\nENDPROCEDURE\n\nCALL ChangeScore()\nOUTPUT Score",
    points: [
      "The same identifier can refer to different variables in different scopes.",
      "State which scope each output uses.",
      "Do not assume the global value changed unless the code clearly updates it.",
    ],
  },
  design: {
    title: "Example 4: Prefer local variables for temporary work",
    problem: "Explain why Temp should be local in a calculation procedure.",
    rows: [
      ["Variable", "Temp", "temporary calculation result"],
      ["Best scope", "local", "used only inside one procedure"],
      ["Benefit", "reduced accidental changes", "other code cannot depend on it"],
    ],
    code: "PROCEDURE PrintAverage(A : INTEGER, B : INTEGER)\n    Temp <- (A + B) / 2\n    OUTPUT Temp\nENDPROCEDURE",
    points: [
      "Temporary calculation variables should usually be local.",
      "This improves readability and reduces unexpected side effects.",
      "The variable name can be reused safely in another subroutine.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What term means where a variable can be accessed?",
    accepted: ["scope"],
    answer: "Scope.",
  },
  {
    id: "p2",
    prompt: "What term means how long a variable exists during program execution?",
    accepted: ["lifetime", "life time"],
    answer: "Lifetime.",
  },
  {
    id: "p3",
    prompt: "A variable declared inside a procedure is normally local or global?",
    accepted: ["local", "local variable"],
    answer: "Local variable.",
  },
  {
    id: "p4",
    prompt: "A variable declared outside all subroutines and used by several subroutines is normally local or global?",
    accepted: ["global", "global variable"],
    answer: "Global variable.",
  },
  {
    id: "p5",
    prompt: "If X is local to a procedure, can the main program directly access X after the procedure ends? yes or no.",
    accepted: ["no"],
    answer: "No. X is outside scope after the procedure ends.",
  },
  {
    id: "p6",
    prompt: "Global Count starts at 10. Procedure creates local Count <- 3. Final global Count?",
    accepted: ["10"],
    answer: "10. The local Count does not change the global Count.",
  },
  {
    id: "p7",
    prompt: "Global Total starts at 10. A procedure updates the global Total <- Total + 5. Final Total?",
    accepted: ["15"],
    answer: "15. The global variable has been changed.",
  },
  {
    id: "p8",
    prompt: "A loop counter used only inside one procedure should usually be local or global?",
    accepted: ["local", "local variable"],
    answer: "Local variable.",
  },
  {
    id: "p9",
    prompt: "Same variable name in two scopes always means the same storage location. true or false?",
    accepted: ["false"],
    answer: "False. The same name may refer to different variables in different scopes.",
  },
  {
    id: "p10",
    prompt: "Which kind of variable can make debugging harder because many subroutines may change it?",
    accepted: ["global", "global variable"],
    answer: "Global variable.",
  },
];

const mistakes = [
  {
    wrong: "A student says a local variable can always be output by the main program after the procedure ends.",
    fix: "Local variables are only accessible within their scope. After the procedure ends, the main program cannot directly use that local variable.",
  },
  {
    wrong: "A student sees Score used in two places and assumes it must be the same variable.",
    fix: "Check declarations and scope. A local Score can hide a global Score, so the same name may refer to different storage locations.",
  },
  {
    wrong: "A student makes every variable global because it is 'easier'.",
    fix: "Use local variables when the data is only needed inside one subroutine. Too many globals increase accidental changes and make tracing harder.",
  },
  {
    wrong: "A student describes lifetime as 'where the variable can be used'.",
    fix: "That is scope. Lifetime is how long the variable exists during execution.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "Define scope and lifetime of a variable. Explain the difference between them.",
    answer: "Scope is the part of a program where a variable or identifier can be accessed. Lifetime is the period during execution for which the variable exists. Scope is about where the variable can be used; lifetime is about when or how long it exists.",
    marking: [
      { mark: "B1", text: "defines scope as where an identifier/variable can be accessed or used" },
      { mark: "B1", text: "defines lifetime as how long a variable exists during program execution" },
      { mark: "B1", text: "distinguishes where/access from when/duration" },
    ],
    strict: [
      "Do not award lifetime definition for merely repeating 'scope'.",
      "Allow 'visibility' for scope if access/use is clear.",
      "Do not accept 'global variables are better' as an example without mechanism.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Trace the output from this pseudocode, assuming the Count inside the procedure is local.\n\nCount <- 10\n\nPROCEDURE ShowCount()\n    Count <- 3\n    OUTPUT Count\nENDPROCEDURE\n\nCALL ShowCount()\nOUTPUT Count",
    answer: "The first output is 3 from the local Count inside ShowCount. The second output is 10 from the global Count in the main program.",
    marking: [
      { mark: "B1", text: "states first output is 3" },
      { mark: "B1", text: "states second output is 10" },
      { mark: "M1", text: "identifies Count inside ShowCount as local" },
      { mark: "M1", text: "explains local Count does not change the global Count" },
      { mark: "A1", text: "identifies the final Count as the global/main-program variable" },
    ],
    strict: [
      "Do not award both output marks for 3 then 3.",
      "Allow 'main Count remains unchanged' for the global explanation.",
      "Do not accept 'because procedure returns 3'; no return value is shown.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain two reasons why unnecessary global variables can make a program harder to debug.",
    answer: "A global variable can be changed by several parts of the program, so it may be difficult to find which subroutine caused an incorrect value. A global variable also increases coupling between subroutines because they depend on shared state, so changing one part of the program can affect another unexpectedly.",
    marking: [
      { mark: "B1", text: "states global variables can be accessed/changed by multiple program parts" },
      { mark: "B1", text: "explains this makes the source of an incorrect value harder to find" },
      { mark: "B1", text: "states global variables create shared state/dependence between subroutines" },
      { mark: "B1", text: "explains changes in one part may affect another unexpectedly" },
    ],
    strict: [
      "Do not award marks for vague statements such as 'globals are bad' without cause and consequence.",
      "Allow 'side effects' if explained as unexpected changes to shared data.",
      "Do not accept security or speed claims unless linked to the scenario.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode for a procedure PrintAverage that takes A and B as INTEGER parameters, stores the average in a local variable Average, and outputs it. Explain why Average should be local.",
    answer: "PROCEDURE PrintAverage(A : INTEGER, B : INTEGER)\n    Average <- (A + B) / 2\n    OUTPUT Average\nENDPROCEDURE\n\nAverage should be local because it is only needed inside the procedure. Limiting its scope prevents other parts of the program from accessing or changing a temporary calculation value.",
    marking: [
      { mark: "B1", text: "uses PROCEDURE PrintAverage or equivalent procedure header" },
      { mark: "B1", text: "declares A and B as INTEGER parameters or equivalent" },
      { mark: "M1", text: "calculates the average using A and B" },
      { mark: "A1", text: "stores the result in a variable named Average or equivalent" },
      { mark: "B1", text: "outputs Average" },
      { mark: "M1", text: "explains Average is only needed inside the procedure" },
      { mark: "A1", text: "explains limited scope reduces accidental access/change or improves traceability" },
    ],
    strict: [
      "Do not require DECLARE syntax if the pseudocode clearly uses a local variable.",
      "Allow DIV or / if the calculation method is consistent with the expected data type.",
      "Do not accept a Java method alone as Cambridge-style pseudocode.",
      "Allow an equivalent temporary variable if it is used consistently.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A student writes OUTPUT Temp in the main program after calling a procedure where Temp was created inside the procedure. Identify the error and correct the design.",
    answer: "The error is that Temp is a local variable, so it is outside scope in the main program after the procedure call. The design should either output Temp inside the procedure, return the value from a function, or pass a variable by reference if the caller must receive an updated value.",
    marking: [
      { mark: "B1", text: "identifies Temp as local to the procedure" },
      { mark: "B1", text: "explains Temp is outside scope in the main program" },
      { mark: "B1", text: "gives one valid correction: output inside the procedure, return from a function, or update a caller variable BYREF" },
      { mark: "B1", text: "explains how the correction makes the value available at the required point" },
    ],
    strict: [
      "Award either correction mark for a valid design correction; both are not required unless two corrections are given.",
      "Allow BYREF as an alternative correction only if the caller variable must be updated.",
      "Do not accept 'make every variable global' as a good correction.",
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
    "3-3": "Not under the stated assumption. The local Count is 3 inside the procedure, but the global Count remains 10.",
    "3-10": "Correct. The procedure outputs its local Count, then the main program outputs the unchanged global Count.",
    "10-3": "The order is reversed. The first output happens inside the procedure.",
    error: "Not always. The warm-up explicitly assumes the procedure Count is local, so the trace can be completed.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupTraceSimulator() {
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const globalBefore = Number(document.querySelector("#globalInput").value);
    const procedureValue = Number(document.querySelector("#localInput").value);
    const mode = document.querySelector("#scopeMode").value;

    if (!Number.isInteger(globalBefore) || !Number.isInteger(procedureValue)) {
      result.textContent = "Enter integer values for both fields.";
      return;
    }

    const globalAfter = mode === "global" ? procedureValue : globalBefore;
    const insideOutput = procedureValue;
    const reason =
      mode === "global"
        ? "The procedure updates the global Count, so the global value changes."
        : "The procedure uses a local Count, so the global Count remains unchanged.";

    result.innerHTML = `
      <p><strong>Before call:</strong> global Count = ${globalBefore}</p>
      <p><strong>Inside procedure:</strong> Count = ${insideOutput}</p>
      <p><strong>After call:</strong> global Count = ${globalAfter}</p>
      <p>${escapeHtml(reason)}</p>
    `;
  });
}

function setupScenarioChooser() {
  const grid = document.querySelector("#scenarioGrid");
  const feedback = document.querySelector("#scenarioFeedback");
  grid.innerHTML = scenarios
    .map((scenario) => `<button class="choice-card" type="button" data-scenario="${scenario.id}">${escapeHtml(scenario.text)}</button>`)
    .join("");

  grid.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      grid.querySelectorAll("[data-scenario]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const scenario = scenarios.find((item) => item.id === button.dataset.scenario);
      feedback.innerHTML = `<strong>${escapeHtml(scenario.recommendation)}</strong>: ${escapeHtml(scenario.reason)}`;
    });
  });
}

function setupExamples() {
  const tabs = document.querySelector("#exampleTabs");
  const output = document.querySelector("#exampleOutput");
  const keys = Object.keys(examples);

  function render(key) {
    const example = examples[key];
    tabs.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.example === key));
    output.innerHTML = `
      <article class="worked-card">
        <h3>${escapeHtml(example.title)}</h3>
        <p>${escapeHtml(example.problem)}</p>
        ${tableMarkup(["Step", "Value / state", "Reason"], example.rows)}
        <pre><code>${escapeHtml(example.code)}</code></pre>
        <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      </article>
    `;
  }

  tabs.innerHTML = keys
    .map((key, index) => `<button class="tab${index === 0 ? " active" : ""}" type="button" data-example="${key}">${escapeHtml(examples[key].title)}</button>`)
    .join("");
  tabs.querySelectorAll("[data-example]").forEach((tab) => tab.addEventListener("click", () => render(tab.dataset.example)));
  render(keys[0]);
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-card">
          <h3>Practice ${index + 1}</h3>
          <p>${escapeHtml(item.prompt)}</p>
          <div class="practice-controls">
            <input type="text" aria-label="Answer for practice ${index + 1}" data-practice-input="${item.id}" />
            <button class="check-btn" type="button" data-check="${item.id}">Check</button>
          </div>
          <div class="feedback" data-feedback="${item.id}">Type your answer, then check.</div>
          <button class="answer-toggle" type="button" data-answer-toggle="${item.id}">Show answer</button>
          <div class="answer-panel" data-answer="${item.id}" hidden>${escapeHtml(item.answer)}</div>
        </article>
      `,
    )
    .join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = list.querySelector(`[data-practice-input="${item.id}"]`);
      const feedback = list.querySelector(`[data-feedback="${item.id}"]`);
      const answer = normalise(input.value);
      const correct = item.accepted.some((accepted) => normalise(accepted) === answer);
      feedback.textContent = correct ? "Correct." : "Not quite. Use Show answer and compare the exact term or final value.";
      feedback.classList.toggle("correct", correct);
      feedback.classList.toggle("incorrect", !correct);
    });
  });

  list.querySelectorAll("[data-answer-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = list.querySelector(`[data-answer="${button.dataset.answerToggle}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.textContent = isHidden ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <h3>Mistake ${index + 1}</h3>
          <p>${escapeHtml(item.wrong)}</p>
          <button class="answer-toggle" type="button" data-correction-toggle="${index}">Show correction</button>
          <div class="answer-panel" data-correction="${index}" hidden>${escapeHtml(item.fix)}</div>
        </article>
      `,
    )
    .join("");

  grid.querySelectorAll("[data-correction-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = grid.querySelector(`[data-correction="${button.dataset.correctionToggle}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.textContent = isHidden ? "Hide correction" : "Show correction";
    });
  });
}

function setupExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${escapeHtml(question.title)}</h3>
            <span>${escapeHtml(question.marks)}</span>
          </div>
          <pre><code>${escapeHtml(question.prompt)}</code></pre>
          <button class="ms-toggle" type="button" data-ms-toggle="${index}">Show MS</button>
          <div class="ms-panel" data-ms="${index}" hidden>
            <h4>Indicative answer</h4>
            <pre><code>${escapeHtml(question.answer)}</code></pre>
            <h4>Marking guidance</h4>
            <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
            <h4>Strict notes</h4>
            <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
          </div>
        </article>
      `,
    )
    .join("");

  list.querySelectorAll("[data-ms-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = list.querySelector(`[data-ms="${button.dataset.msToggle}"]`);
      const isHidden = panel.hidden;
      panel.hidden = !isHidden;
      button.textContent = isHidden ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupTraceSimulator();
setupScenarioChooser();
setupExamples();
setupPractice();
setupMistakes();
setupExamQuestions();
