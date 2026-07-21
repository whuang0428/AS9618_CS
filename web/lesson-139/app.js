const moduleAdvice = {
  input: {
    module: "GetValidMark()",
    responsibility: "input a mark, apply validation, repeat until valid",
    reason: "Input validation is isolated, so the rest of the program receives only acceptable data.",
  },
  grade: {
    module: "CalculateGrade(Mark)",
    responsibility: "convert a valid mark into a grade",
    reason: "The function has one calculation responsibility and can be tested separately.",
  },
  output: {
    module: "DisplayResult(Grade)",
    responsibility: "format and output the result",
    reason: "Output formatting is kept separate from validation and calculation logic.",
  },
};

const examples = {
  validate: {
    title: "Example 1: Validation loop",
    problem: "Write pseudocode to keep asking for a mark until the value is from 0 to 100 inclusive.",
    code: "REPEAT\n    INPUT Mark\n    IF Mark >= 0 AND Mark <= 100 THEN\n        Valid <- TRUE\n    ELSE\n        OUTPUT \"Enter a mark from 0 to 100\"\n        Valid <- FALSE\n    ENDIF\nUNTIL Valid = TRUE",
    points: [
      "The range check prevents invalid marks from being processed.",
      "The loop continues until the data is acceptable.",
      "The error message states the valid range.",
    ],
  },
  module: {
    title: "Example 2: Module split",
    problem: "Split a grade program into focused modules.",
    code: "Mark <- GetValidMark()\nGrade <- CalculateGrade(Mark)\nDisplayResult(Grade)",
    points: [
      "GetValidMark handles input and validation.",
      "CalculateGrade handles processing only.",
      "DisplayResult handles output only.",
    ],
  },
  explain: {
    title: "Example 3: Explain benefits",
    problem: "Explain why validation and modularity improve robust design.",
    code: "Validation reduces the chance of invalid data being processed.\nModularity makes each part easier to test, debug, reuse and maintain.\nTogether, they reduce faults and make the program easier to adapt.",
    points: [
      "Use cause and consequence in exam answers.",
      "Avoid vague claims such as 'better' without saying why.",
      "Mention testing and maintenance when discussing modularity.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What term describes checking that data is acceptable before processing?", accepted: ["validation"], answer: "Validation." },
  { id: "p2", prompt: "Which validation check confirms a value is between minimum and maximum limits?", accepted: ["range", "range check"], answer: "Range check." },
  { id: "p3", prompt: "Which validation check confirms that required data is not blank?", accepted: ["presence", "presence check"], answer: "Presence check." },
  { id: "p4", prompt: "Which validation check confirms that a mark is an INTEGER?", accepted: ["type", "type check"], answer: "Type check." },
  { id: "p5", prompt: "What design approach splits a program into procedures/functions?", accepted: ["modularity", "modular", "modular design"], answer: "Modularity / modular design." },
  { id: "p6", prompt: "What should GetValidMark() return?", accepted: ["valid mark", "mark", "integer"], answer: "A valid integer mark." },
  { id: "p7", prompt: "Why should validation occur before calculating a grade?", accepted: ["invalid", "processed", "prevent", "reject"], answer: "It prevents invalid data from being processed." },
  { id: "p8", prompt: "Validation and verification mean the same thing. true or false?", accepted: ["false"], answer: "False." },
  { id: "p9", prompt: "Name one benefit of modularity.", accepted: ["test", "debug", "reuse", "maintain", "read"], answer: "It can make code easier to test, debug, reuse, read or maintain." },
  { id: "p10", prompt: "In Cambridge exams, Java method syntax should replace pseudocode function syntax. true or false?", accepted: ["false"], answer: "False." },
];

const mistakes = [
  {
    wrong: "The program calculates Grade before checking whether Mark is from 0 to 100.",
    fix: "Validate Mark first. Only pass a valid mark to CalculateGrade.",
  },
  {
    wrong: "A student says validation checks whether two people typed the same data.",
    fix: "That describes verification. Validation checks whether data is reasonable or allowed by the program rules.",
  },
  {
    wrong: "All input, validation, calculation and output are placed inside one long procedure.",
    fix: "Split responsibilities into modules such as GetValidMark, CalculateGrade and DisplayResult.",
  },
  {
    wrong: "A validation function outputs the grade, changes global variables and asks for another input.",
    fix: "Keep the function focused. A function such as IsValidMark should return TRUE or FALSE and avoid unrelated side effects.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Explain how validation can make a mark-processing program more robust. Use the range 0 to 100 inclusive in your answer.",
    answer: "Validation checks that the input is acceptable before it is processed. A range check can reject marks below 0 or above 100. A type check can reject non-integer input. This prevents invalid data being used to calculate a grade and allows an error message to ask the user for valid input.",
    marking: [
      { mark: "B1", text: "states validation checks data is acceptable/reasonable before processing" },
      { mark: "B1", text: "identifies a range check for 0 to 100 inclusive" },
      { mark: "B1", text: "states values below 0 or above 100 should be rejected" },
      { mark: "B1", text: "identifies type check or equivalent for integer input" },
      { mark: "B1", text: "explains invalid data is prevented from being processed" },
      { mark: "B1", text: "links validation to robustness, reliability or suitable user feedback" },
    ],
    strict: [
      "Do not award range mark for an exclusive 0 to 100 range unless the scenario states it.",
      "Allow length or presence checks only if used as additional relevant examples.",
      "Do not accept verification as a synonym for validation.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode for a function IsValidMark that returns TRUE if Mark is from 0 to 100 inclusive and FALSE otherwise.",
    answer: "FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN\n    IF Mark >= 0 AND Mark <= 100 THEN\n        RETURN TRUE\n    ELSE\n        RETURN FALSE\n    ENDIF\nENDFUNCTION",
    marking: [
      { mark: "B1", text: "uses a function header with a meaningful name" },
      { mark: "B1", text: "uses Mark as a parameter" },
      { mark: "B1", text: "specifies or implies a BOOLEAN return" },
      { mark: "M1", text: "checks Mark >= 0 or equivalent lower bound" },
      { mark: "M1", text: "checks Mark <= 100 or equivalent upper bound" },
      { mark: "A1", text: "returns TRUE when both bounds are satisfied" },
      { mark: "A1", text: "returns FALSE otherwise and ends the function correctly" },
    ],
    strict: [
      "Do not award both boundary method marks if OR is used incorrectly for the valid condition.",
      "Allow direct return of the Boolean expression if clear.",
      "Do not accept Java-only method syntax as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A quiz program contains one long block for input, validation, scoring and output. Explain how modularity could improve the design.",
    answer: "The program can be split into modules such as GetValidAnswer, CheckAnswer, UpdateScore and DisplayResult. Each module has one responsibility, making the program easier to read, test and debug. Modules can also be reused or changed without rewriting the whole program.",
    marking: [
      { mark: "B1", text: "states the program can be split into procedures/functions/modules" },
      { mark: "B1", text: "gives at least two suitable module examples" },
      { mark: "B1", text: "explains each module can have one clear responsibility" },
      { mark: "B1", text: "states modularity improves readability or understandability" },
      { mark: "B1", text: "states modularity makes testing/debugging easier" },
      { mark: "B1", text: "states modules can be reused or maintained/changed independently" },
    ],
    strict: [
      "Do not award module example mark for vague names such as DoStuff.",
      "Allow procedure, function, subroutine or module as equivalent terms.",
      "Do not accept 'shorter code' alone without a design benefit.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "State the difference between validation and verification, and give one example of each.",
    answer: "Validation checks whether data is acceptable or reasonable, for example checking a mark is from 0 to 100. Verification checks whether data has been copied or entered accurately, for example double entry of an email address or visual checking against a source document.",
    marking: [
      { mark: "B1", text: "defines validation as checking data is acceptable/reasonable" },
      { mark: "B1", text: "gives suitable validation example" },
      { mark: "B1", text: "defines verification as checking data has been accurately entered/copied" },
      { mark: "B1", text: "gives suitable verification example" },
    ],
    strict: [
      "Do not award full marks if validation and verification are treated as identical.",
      "Allow proofreading, double entry or parity with source document as verification examples where appropriate.",
      "Do not accept 'validation checks it is correct' without explaining acceptable/reasonable.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain why using a function such as IsValidMark(Mark) can improve robustness and maintainability.",
    answer: "The validation rule is stored in one function, so the same check can be reused wherever a mark is needed. The function can be tested separately using normal, boundary and erroneous data. If the valid range changes, the condition can be updated in one place, reducing inconsistent checks and maintenance errors.",
    marking: [
      { mark: "B1", text: "states the validation rule is placed in one named function" },
      { mark: "B1", text: "states the function can be reused" },
      { mark: "B1", text: "explains this avoids repeated or inconsistent validation code" },
      { mark: "B1", text: "states the function can be tested separately" },
      { mark: "B1", text: "links testing to normal/boundary/erroneous data or fault detection" },
      { mark: "B1", text: "explains a change to the rule can be made in one place" },
    ],
    strict: [
      "Do not award maintainability marks for saying only 'it is easier'.",
      "Allow procedure if the design clearly returns or reports a valid/invalid result.",
      "Do not accept global-variable side effects as a benefit unless controlled and explained.",
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
    calculate: { text: "Not robust. Calculation should happen only after input has passed validation.", correct: false },
    validate: { text: "Correct. Type and range validation prevents invalid data being processed.", correct: true },
    ignore: { text: "Tempting for tired software, but not a valid design. Output must be based on valid input.", correct: false },
    verify: { text: "Verification checks accurate entry. Here the first issue is whether the input is even acceptable.", correct: false },
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

function setupValidator() {
  const input = document.querySelector("#markInput");
  const output = document.querySelector("#validateOutput");
  const render = () => {
    const raw = input.value.trim();
    let rows;
    let verdict;
    if (raw === "") {
      rows = [["Presence check", "Fail", "input is blank"], ["Type check", "Not reached", "no value to check"], ["Range check", "Not reached", "no value to check"]];
      verdict = "Rejected: enter a mark from 0 to 100.";
    } else if (!/^-?\d+$/.test(raw)) {
      rows = [["Presence check", "Pass", "input exists"], ["Type check", "Fail", "not an integer"], ["Range check", "Not reached", "wrong data type"]];
      verdict = "Rejected: mark must be an integer.";
    } else {
      const value = Number.parseInt(raw, 10);
      const inRange = value >= 0 && value <= 100;
      rows = [["Presence check", "Pass", "input exists"], ["Type check", "Pass", "integer"], ["Range check", inRange ? "Pass" : "Fail", inRange ? "inside 0 to 100" : "outside 0 to 100"]];
      verdict = inRange ? "Accepted: safe to process." : "Rejected: enter a mark from 0 to 100.";
    }
    output.innerHTML = `${tableMarkup(["Check", "Result", "Reason"], rows)}<p><strong>Verdict:</strong> ${escapeHtml(verdict)}</p>`;
  };
  document.querySelector("#validateBtn").addEventListener("click", render);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") render();
  });
  render();
}

function setupModuleChooser() {
  const select = document.querySelector("#moduleSelect");
  const output = document.querySelector("#moduleOutput");
  const render = () => {
    const advice = moduleAdvice[select.value];
    output.innerHTML = `
      <p><strong>Module:</strong> ${escapeHtml(advice.module)}</p>
      <p><strong>Responsibility:</strong> ${escapeHtml(advice.responsibility)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(advice.reason)}</p>
    `;
  };
  document.querySelector("#moduleBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="example-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p>${escapeHtml(example.problem)}</p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
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
  renderExample("validate");
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
      feedback.textContent = correct ? "Correct." : "Not quite. Reveal the answer and tighten the term.";
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
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
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
  setupValidator();
  setupModuleChooser();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
