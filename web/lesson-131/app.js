const scenarios = [
  {
    id: "display",
    text: "A procedure displays a student's mark but does not change it.",
    recommendation: "by value",
    reason: "The value is only read for output, so a copy is enough and avoids accidental changes.",
  },
  {
    id: "increase",
    text: "A procedure must increase the stored score in the main algorithm.",
    recommendation: "BYREF",
    reason: "The caller's variable must be updated by the procedure.",
  },
  {
    id: "swap",
    text: "A procedure swaps the values of A and B in the calling algorithm.",
    recommendation: "BYREF",
    reason: "Both original variables must change; local copies would be swapped and then lost.",
  },
  {
    id: "check",
    text: "A function checks whether a value is valid and returns TRUE or FALSE.",
    recommendation: "by value",
    reason: "The input value is tested, not changed. The Boolean result is returned separately.",
  },
];

const examples = {
  value: {
    title: "Example 1: Passing by value",
    problem: "Trace the final value of X after calling a procedure that increments its parameter.",
    rows: [
      ["Before call", "X = 5", "caller variable is 5"],
      ["Call", "CALL AddOne(X)", "Number receives a copy of 5"],
      ["Inside procedure", "Number = 6", "local copy changes"],
      ["After call", "X = 5", "original caller variable is unchanged"],
    ],
    code: "PROCEDURE AddOne(Number : INTEGER)\n    Number <- Number + 1\nENDPROCEDURE\n\nX <- 5\nCALL AddOne(X)\nOUTPUT X",
    points: [
      "There is no BYREF in the header.",
      "Number is a local parameter holding a copied value.",
      "The final output is 5, not 6.",
    ],
  },
  ref: {
    title: "Example 2: Passing by reference",
    problem: "Trace the final value of X when the parameter is declared with BYREF.",
    rows: [
      ["Before call", "X = 5", "caller variable is 5"],
      ["Call", "CALL AddOne(X)", "Number is linked to X"],
      ["Inside procedure", "Number becomes 6", "linked caller value changes"],
      ["After call", "X = 6", "original variable has been updated"],
    ],
    code: "PROCEDURE AddOne(BYREF Number : INTEGER)\n    Number <- Number + 1\nENDPROCEDURE\n\nX <- 5\nCALL AddOne(X)\nOUTPUT X",
    points: [
      "BYREF is the header clue.",
      "The procedure changes the variable passed by the caller.",
      "The final output is 6.",
    ],
  },
  swap: {
    title: "Example 3: Swap needs BYREF",
    problem: "Write a procedure that swaps two original integer variables.",
    rows: [
      ["Header", "PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)", "both arguments must change"],
      ["Temporary variable", "Temp <- A", "stores one value safely"],
      ["Swap steps", "A <- B, B <- Temp", "updates original variables"],
    ],
    code: "PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)\n    Temp <- A\n    A <- B\n    B <- Temp\nENDPROCEDURE",
    points: [
      "A and B must both be BYREF.",
      "A temporary variable prevents one value from being overwritten.",
      "A by-value swap would only swap local copies.",
    ],
  },
  mixed: {
    title: "Example 4: Mixed parameters",
    problem: "One parameter is read; another parameter is updated.",
    rows: [
      ["Amount", "Amount : INTEGER", "read-only amount passed by value"],
      ["Total", "BYREF Total : INTEGER", "running total updated in caller"],
      ["After call", "Total changes", "Amount remains a normal input value"],
    ],
    code: "PROCEDURE AddToTotal(Amount : INTEGER, BYREF Total : INTEGER)\n    Total <- Total + Amount\nENDPROCEDURE\n\nRunningTotal <- 20\nCALL AddToTotal(7, RunningTotal)",
    points: [
      "Not every parameter needs BYREF.",
      "Use BYREF only for the caller value that must be updated.",
      "Final RunningTotal is 27.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "What Cambridge keyword is used to pass a parameter by reference?",
    accepted: ["byref"],
    answer: "BYREF.",
  },
  {
    id: "p2",
    prompt: "In PROCEDURE AddOne(Number : INTEGER), is Number passed by value or BYREF?",
    accepted: ["by value", "value"],
    answer: "By value, because BYREF is not used.",
  },
  {
    id: "p3",
    prompt: "X <- 5; CALL AddOne(X), where AddOne(Number : INTEGER) sets Number <- Number + 1. Final X?",
    accepted: ["5"],
    answer: "5. The procedure changes only the copied parameter.",
  },
  {
    id: "p4",
    prompt: "X <- 5; CALL AddOne(X), where AddOne(BYREF Number : INTEGER) sets Number <- Number + 1. Final X?",
    accepted: ["6"],
    answer: "6. BYREF links Number to the caller's X.",
  },
  {
    id: "p5",
    prompt: "In CALL DisplayMessage(Text), what is Text called: parameter or argument?",
    accepted: ["argument"],
    answer: "Argument. It is the value/variable supplied in the call.",
  },
  {
    id: "p6",
    prompt: "In PROCEDURE DisplayMessage(Message : STRING), what is Message called?",
    accepted: ["parameter"],
    answer: "Parameter. It is declared in the procedure header.",
  },
  {
    id: "p7",
    prompt: "A procedure Reset must set the caller's Count to 0. Should Count be by value or BYREF?",
    accepted: ["byref", "by reference"],
    answer: "BYREF / by reference, because the caller's variable must change.",
  },
  {
    id: "p8",
    prompt: "A function only checks if Mark is valid and returns TRUE/FALSE. Should Mark normally be by value or BYREF?",
    accepted: ["by value", "value"],
    answer: "By value. The mark is read, not changed.",
  },
  {
    id: "p9",
    prompt: "A swap procedure without BYREF swaps local copies only. Does the caller's A and B change? yes or no.",
    accepted: ["no"],
    answer: "No. Without BYREF, only local copies are changed.",
  },
  {
    id: "p10",
    prompt: "Complete the header: PROCEDURE Increase(_____ Score : INTEGER)",
    accepted: ["byref"],
    answer: "BYREF, giving PROCEDURE Increase(BYREF Score : INTEGER).",
  },
];

const mistakes = [
  {
    wrong: "A student says any parameter assignment changes the argument in the main algorithm.",
    fix: "Only a BYREF parameter can update the caller's variable. A normal parameter receives a copy.",
  },
  {
    wrong: "A student writes PROCEDURE Reset(Count : INTEGER) and expects Count in the main program to become 0.",
    fix: "Use PROCEDURE Reset(BYREF Count : INTEGER). The caller value must be linked to the parameter.",
  },
  {
    wrong: "A student swaps A and B inside a procedure but leaves both parameters by value.",
    fix: "Use BYREF for both A and B, otherwise the procedure swaps local copies and the caller variables stay unchanged.",
  },
  {
    wrong: "A student explains BYREF using Java primitive parameter syntax as the exam answer.",
    fix: "Write Cambridge pseudocode with BYREF. Java can support understanding, but it is not the required exam format.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Trace the final value output by this pseudocode. Explain why.\n\nPROCEDURE AddTwo(Number : INTEGER)\n    Number <- Number + 2\nENDPROCEDURE\n\nX <- 10\nCALL AddTwo(X)\nOUTPUT X",
    answer: "The output is 10. Number is passed by value because BYREF is not used, so AddTwo changes only a local copy of X.",
    marking: [
      { mark: "B1", text: "states that the final output/value of X is 10" },
      { mark: "M1", text: "identifies that the parameter is passed by value / no BYREF is used" },
      { mark: "M1", text: "explains that Number receives a copy of X" },
      { mark: "A1", text: "explains that the assignment Number <- Number + 2 changes only the local parameter" },
      { mark: "B1", text: "uses accurate terminology such as parameter, argument, caller variable or local copy" },
    ],
    strict: [
      "Do not award the final value mark for 12.",
      "Allow 'X is unchanged' for the explanation if linked to by-value passing.",
      "Do not accept vague wording such as 'it does not work' without mechanism.",
      "FT: explanation marks can follow a candidate's consistent trace only if the passing mode is correctly identified.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Trace the final value output by this pseudocode. Explain why.\n\nPROCEDURE AddTwo(BYREF Number : INTEGER)\n    Number <- Number + 2\nENDPROCEDURE\n\nX <- 10\nCALL AddTwo(X)\nOUTPUT X",
    answer: "The output is 12. Number is passed by reference using BYREF, so Number is linked to X and the assignment updates the caller variable.",
    marking: [
      { mark: "B1", text: "states that the final output/value of X is 12" },
      { mark: "M1", text: "identifies BYREF / passing by reference" },
      { mark: "M1", text: "explains that Number is linked to the caller's X" },
      { mark: "A1", text: "explains that Number <- Number + 2 updates X" },
      { mark: "B1", text: "uses accurate Cambridge terminology and not Java-only syntax" },
    ],
    strict: [
      "Do not award the final value mark for 10.",
      "Allow 'original variable changes' if it clearly refers to X in the caller.",
      "Do not accept 'BYREF returns a value'; procedures do not return values merely because BYREF is used.",
      "FT: calculation mark can follow an arithmetic slip if the reference mechanism is clearly correct.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode for a procedure Swap that swaps two INTEGER variables A and B in the calling algorithm.",
    answer: "PROCEDURE Swap(BYREF A : INTEGER, BYREF B : INTEGER)\n    Temp <- A\n    A <- B\n    B <- Temp\nENDPROCEDURE",
    marking: [
      { mark: "B1", text: "uses PROCEDURE Swap or equivalent procedure header" },
      { mark: "B1", text: "declares A as an INTEGER parameter" },
      { mark: "B1", text: "declares B as an INTEGER parameter" },
      { mark: "A1", text: "uses BYREF for A and B so caller variables are changed" },
      { mark: "M1", text: "stores one value in a temporary variable before overwriting it" },
      { mark: "M1", text: "assigns A <- B and B <- Temp or equivalent correct swap sequence" },
      { mark: "A1", text: "closes the procedure with ENDPROCEDURE" },
    ],
    strict: [
      "Do not award the BYREF mark if only one of A or B is passed by reference.",
      "Allow different variable names if roles are clear and typed.",
      "Do not accept a swap that overwrites one value before saving it.",
      "FT: swap sequence marks can follow candidate's temporary variable name if used consistently.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Compare passing by value with passing by reference. Include one suitable example of when BYREF is needed.",
    answer: "Passing by value sends a copy of the argument to the parameter, so changes inside the subroutine do not alter the caller's variable. Passing by reference uses BYREF to link the parameter to the caller's variable, so changes inside the subroutine can alter the original. BYREF is needed for a procedure such as Swap or Reset that must change caller variables.",
    marking: [
      { mark: "B1", text: "states that by value passes a copy of the value" },
      { mark: "A1", text: "states that by-value changes do not alter the caller variable" },
      { mark: "B1", text: "states that by reference / BYREF links to the caller variable" },
      { mark: "A1", text: "states that BYREF changes can alter the original caller variable" },
      { mark: "M1", text: "gives a suitable BYREF example such as Swap, Reset or IncrementScore" },
      { mark: "B1", text: "uses accurate terms such as parameter, argument, caller and BYREF" },
    ],
    strict: [
      "Do not award full comparison for saying only 'one changes and one does not' without identifying copy/link mechanism.",
      "Allow 'reference to original variable' for linked caller variable.",
      "Do not accept 'BYREF returns a value' as the definition.",
      "FT: example mark can follow any scenario where a caller variable must be updated.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes this procedure and says it resets Count in the main algorithm. Identify the error and correct it.\n\nPROCEDURE Reset(Count : INTEGER)\n    Count <- 0\nENDPROCEDURE",
    answer: "The error is that Count is passed by value, so only a local copy is set to 0. The header should use BYREF: PROCEDURE Reset(BYREF Count : INTEGER).",
    marking: [
      { mark: "B1", text: "identifies that Count is currently passed by value / no BYREF is used" },
      { mark: "M1", text: "explains that the procedure changes only a local copy" },
      { mark: "M1", text: "explains that the caller's Count will not be reset" },
      { mark: "A1", text: "states that BYREF is required" },
      { mark: "A1", text: "gives corrected header PROCEDURE Reset(BYREF Count : INTEGER) or equivalent" },
      { mark: "B1", text: "keeps the Cambridge pseudocode procedure structure clear" },
    ],
    strict: [
      "Do not award correction for adding OUTPUT Count only.",
      "Allow wording 'pass Count by reference' if the corrected header includes or clearly implies BYREF.",
      "Do not accept Java object/wrapper syntax alone as a Cambridge pseudocode correction.",
      "FT: corrected header mark can follow an equivalent procedure name if the parameter and BYREF are clear.",
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
    a9: "Correct for Version A. Score is passed by value, so the procedure changes a copy and the caller's Score stays 9.",
    a10: "Not for Version A. There is no BYREF, so the caller's Score is not updated.",
    b9: "Not for Version B. BYREF links the parameter to the caller's Score.",
    b10: "Correct for Version B. BYREF means the increment updates the caller's Score to 10.",
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
    const start = Number(document.querySelector("#startValue").value);
    const mode = document.querySelector("#passMode").value;

    if (!Number.isInteger(start)) {
      result.textContent = "Enter an integer starting value.";
      return;
    }

    const local = start + 1;
    const finalCaller = mode === "ref" ? local : start;
    const label = mode === "ref" ? "BYREF" : "by value";
    const reason =
      mode === "ref"
        ? "Number is linked to X, so changing Number also changes X."
        : "Number receives a copy, so changing Number does not change X.";

    result.innerHTML = `
      <p><strong>Mode:</strong> ${escapeHtml(label)}</p>
      <p><strong>Before call:</strong> X = ${start}</p>
      <p><strong>Inside procedure:</strong> Number becomes ${local}</p>
      <p><strong>After call:</strong> caller X = ${finalCaller}</p>
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
        ${tableMarkup(["Point", "Value / code", "Reason"], example.rows)}
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
      feedback.textContent = correct ? "Correct." : "Not quite. Use Show answer, then compare the exact term/value.";
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
