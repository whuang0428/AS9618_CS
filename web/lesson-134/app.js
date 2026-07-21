const scenarios = [
  {
    id: "rows",
    text: "Find how many complete boxes are needed when each full box contains 12 items.",
    recommendation: "DIV for full boxes, with MOD to check leftovers",
    reason: "DIV gives the number of complete groups. MOD tells whether there are items left over.",
  },
  {
    id: "even",
    text: "Check whether a number is even.",
    recommendation: "Number MOD 2",
    reason: "If Number MOD 2 = 0, there is no remainder after division by 2, so the number is even.",
  },
  {
    id: "average",
    text: "Calculate a mean that may contain a decimal part.",
    recommendation: "/",
    reason: "Real division keeps the fractional part; DIV would discard it.",
  },
  {
    id: "minutes",
    text: "Convert 145 minutes into hours and remaining minutes.",
    recommendation: "DIV and MOD",
    reason: "145 DIV 60 gives whole hours; 145 MOD 60 gives the leftover minutes.",
  },
];

const examples = {
  rows: {
    title: "Example 1: Full rows and leftovers",
    problem: "17 students sit in rows of 5. Find full rows and leftovers.",
    rows: [
      ["Real division", "17 / 5 = 3.4", "not a whole number of full rows"],
      ["Integer division", "17 DIV 5 = 3", "three complete rows"],
      ["Remainder", "17 MOD 5 = 2", "two students left over"],
      ["Check", "5 * 3 + 2 = 17", "identity confirms the result"],
    ],
    code: "Students <- 17\nSeatsPerRow <- 5\nFullRows <- Students DIV SeatsPerRow\nLeftOver <- Students MOD SeatsPerRow\nOUTPUT FullRows\nOUTPUT LeftOver",
    points: [
      "DIV returns the whole-number quotient.",
      "MOD returns the remainder.",
      "Use both when the scenario needs complete groups and leftovers.",
    ],
  },
  even: {
    title: "Example 2: Even or odd",
    problem: "Use MOD to test whether a number is even.",
    rows: [
      ["Number", "24", "input value"],
      ["Operation", "24 MOD 2", "divide by 2 and keep the remainder"],
      ["Result", "0", "no remainder"],
      ["Conclusion", "even", "remainder 0 means divisible by 2"],
    ],
    code: "INPUT Number\nIF Number MOD 2 = 0 THEN\n    OUTPUT \"Even\"\nELSE\n    OUTPUT \"Odd\"\nENDIF",
    points: [
      "MOD 2 is a common parity check.",
      "A remainder of 0 means exactly divisible.",
      "A remainder of 1 means odd for positive integers.",
    ],
  },
  time: {
    title: "Example 3: Convert minutes",
    problem: "Convert 145 minutes into hours and minutes.",
    rows: [
      ["Hours", "145 DIV 60 = 2", "two complete hours"],
      ["Minutes", "145 MOD 60 = 25", "twenty-five minutes left"],
      ["Output", "2 hours 25 minutes", "combined result"],
    ],
    code: "TotalMinutes <- 145\nHours <- TotalMinutes DIV 60\nMinutes <- TotalMinutes MOD 60\nOUTPUT Hours\nOUTPUT Minutes",
    points: [
      "DIV gives the larger unit.",
      "MOD gives the leftover smaller unit.",
      "This pattern also works for seconds, pages and grouped items.",
    ],
  },
  precedence: {
    title: "Example 4: Operator precedence",
    problem: "Trace 4 + 18 MOD 5 * 2.",
    rows: [
      ["First", "18 MOD 5 = 3", "MOD evaluated before addition"],
      ["Second", "3 * 2 = 6", "multiplication before addition"],
      ["Third", "4 + 6 = 10", "final result"],
    ],
    code: "Result <- 4 + 18 MOD 5 * 2\nOUTPUT Result",
    points: [
      "If the intended order is unclear, use brackets.",
      "Trace one operation at a time.",
      "Never treat MOD as the same as real division.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is 17 DIV 5?", accepted: ["3"], answer: "3." },
  { id: "p2", prompt: "What is 17 MOD 5?", accepted: ["2"], answer: "2." },
  { id: "p3", prompt: "What is 17 / 5?", accepted: ["3.4"], answer: "3.4." },
  { id: "p4", prompt: "What is 23 DIV 6?", accepted: ["3"], answer: "3." },
  { id: "p5", prompt: "What is 23 MOD 6?", accepted: ["5"], answer: "5." },
  { id: "p6", prompt: "What is 24 MOD 2?", accepted: ["0"], answer: "0, so 24 is even." },
  { id: "p7", prompt: "What is 145 DIV 60?", accepted: ["2"], answer: "2." },
  { id: "p8", prompt: "What is 145 MOD 60?", accepted: ["25"], answer: "25." },
  { id: "p9", prompt: "Which operator returns a remainder: DIV or MOD?", accepted: ["mod"], answer: "MOD." },
  { id: "p10", prompt: "Evaluate 2 + 3 * 4.", accepted: ["14"], answer: "14, because multiplication is evaluated before addition." },
];

const mistakes = [
  {
    wrong: "A student says 17 DIV 5 is 3.4.",
    fix: "17 / 5 is 3.4. 17 DIV 5 is the whole-number quotient, so it is 3.",
  },
  {
    wrong: "A student says 17 MOD 5 is 3 because 5 goes into 17 three times.",
    fix: "That value is the quotient. MOD returns the remainder: 17 - 15 = 2.",
  },
  {
    wrong: "A student uses Java % in a Cambridge pseudocode answer.",
    fix: "Use MOD in Cambridge-style pseudocode. Java % is a support-language equivalent, not the exam operator.",
  },
  {
    wrong: "A student evaluates 2 + 3 * 4 as 20 without brackets.",
    fix: "Multiplication is evaluated before addition, so 2 + 12 = 14. Use (2 + 3) * 4 if 20 is intended.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Trace the values assigned by this pseudocode.\n\nNumber <- 23\nDivisor <- 6\nQ <- Number DIV Divisor\nR <- Number MOD Divisor\nOUTPUT Q\nOUTPUT R",
    answer: "23 DIV 6 gives 3 because there are three complete groups of 6. 23 MOD 6 gives 5 because 23 - 18 = 5. The outputs are 3 then 5.",
    marking: [
      { mark: "B1", text: "states Q is 3" },
      { mark: "B1", text: "states R is 5" },
      { mark: "M1", text: "explains DIV gives the whole-number quotient" },
      { mark: "M1", text: "explains MOD gives the remainder" },
      { mark: "A1", text: "outputs values in the correct order" },
    ],
    strict: [
      "Do not award Q mark for 3.833 or other real division result.",
      "Allow remainder explanation using 23 = 6 * 3 + 5.",
      "Do not accept MOD as another name for division.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode that inputs TotalMinutes and outputs whole hours and remaining minutes.",
    answer: "INPUT TotalMinutes\nHours <- TotalMinutes DIV 60\nMinutes <- TotalMinutes MOD 60\nOUTPUT Hours\nOUTPUT Minutes",
    marking: [
      { mark: "B1", text: "inputs or obtains TotalMinutes" },
      { mark: "M1", text: "uses DIV 60 to calculate whole hours" },
      { mark: "A1", text: "assigns the quotient to Hours or equivalent" },
      { mark: "M1", text: "uses MOD 60 to calculate remaining minutes" },
      { mark: "A1", text: "assigns the remainder to Minutes or equivalent" },
      { mark: "B1", text: "outputs both calculated values" },
    ],
    strict: [
      "Do not award hours calculation mark for real division only.",
      "Allow variable names such as WholeHours and RemainingMinutes.",
      "Do not accept Java % alone as Cambridge pseudocode for MOD.",
      "Allow an equivalent variable if it is used consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain how MOD can be used to check whether a positive integer is even. Include pseudocode.",
    answer: "A number is even if it divides exactly by 2. MOD returns the remainder after division, so if Number MOD 2 = 0 then there is no remainder and the number is even.\n\nIF Number MOD 2 = 0 THEN\n    OUTPUT \"Even\"\nELSE\n    OUTPUT \"Odd\"\nENDIF",
    marking: [
      { mark: "B1", text: "states MOD returns a remainder" },
      { mark: "M1", text: "explains even numbers have no remainder when divided by 2" },
      { mark: "A1", text: "uses condition Number MOD 2 = 0 or equivalent" },
      { mark: "B1", text: "outputs or identifies Even for the true branch" },
      { mark: "B1", text: "outputs or identifies Odd for the false branch" },
      { mark: "A1", text: "uses clear IF/ELSE/ENDIF Cambridge-style structure" },
    ],
    strict: [
      "Do not award condition mark for Number DIV 2 = 0.",
      "Allow TRUE/FALSE assignment instead of output if logic is clear.",
      "Do not accept testing only the last digit unless the MOD method is also explained.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Trace the expression Result <- 4 + 18 MOD 5 * 2. Show the working.",
    answer: "18 MOD 5 = 3. Then 3 * 2 = 6. Then 4 + 6 = 10. Result is 10.",
    marking: [
      { mark: "M1", text: "evaluates 18 MOD 5" },
      { mark: "A1", text: "states 18 MOD 5 = 3" },
      { mark: "M1", text: "multiplies the MOD result by 2 before addition" },
      { mark: "A1", text: "states 3 * 2 = 6" },
      { mark: "M1", text: "adds 4 to the intermediate result" },
      { mark: "A1", text: "states final Result is 10" },
    ],
    strict: [
      "Do not award final mark for 12 or 4 if caused by ignoring precedence.",
      "Allow use of brackets in working if it preserves the original order of operations.",
      "Do not accept a final answer with no working for full marks.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "A positive integer Number has three digits. Write pseudocode to output the last digit and the first two digits. For example, 384 should output 4 and 38.",
    answer: "INPUT Number\nLastDigit <- Number MOD 10\nFirstTwo <- Number DIV 10\nOUTPUT LastDigit\nOUTPUT FirstTwo",
    marking: [
      { mark: "B1", text: "inputs or obtains Number" },
      { mark: "M1", text: "uses MOD 10 to find the last digit" },
      { mark: "A1", text: "assigns Number MOD 10 to LastDigit or equivalent" },
      { mark: "M1", text: "uses DIV 10 to remove the last digit" },
      { mark: "A1", text: "assigns Number DIV 10 to FirstTwo or equivalent" },
      { mark: "B1", text: "outputs the last digit" },
      { mark: "B1", text: "outputs the first two digits" },
    ],
    strict: [
      "Do not award last digit mark for DIV 10.",
      "Allow any clear variable names.",
      "Do not accept string slicing as the intended arithmetic-operator solution unless question allows it.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9.+\-*/:<>=\[\] %_.-]/g, "");
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
    "3-2": "Correct. 17 DIV 5 = 3 and 17 MOD 5 = 2.",
    "2-3": "Not quite. Two rows use only 10 seats; there is room for another full row.",
    "3-5": "A remainder must be smaller than the divisor. Five left over would make another full row.",
    "3.4": "That is real division. DIV and MOD split the result into full groups and leftover.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupCalculator() {
  const result = document.querySelector("#calcResult");
  document.querySelector("#calcBtn").addEventListener("click", () => {
    const number = Number(document.querySelector("#numberInput").value);
    const divisor = Number(document.querySelector("#divisorInput").value);
    const operation = document.querySelector("#operationInput").value;

    if (!Number.isInteger(number) || !Number.isInteger(divisor) || number < 0 || divisor <= 0) {
      result.textContent = "Enter a non-negative integer Number and a positive integer Divisor.";
      return;
    }

    const real = number / divisor;
    const quotient = Math.floor(number / divisor);
    const remainder = number % divisor;
    const identity = divisor * quotient + remainder;
    const rows = {
      all: [
        `<p><strong>${number} / ${divisor}</strong> = ${real}</p>`,
        `<p><strong>${number} DIV ${divisor}</strong> = ${quotient}</p>`,
        `<p><strong>${number} MOD ${divisor}</strong> = ${remainder}</p>`,
      ],
      div: [`<p><strong>${number} DIV ${divisor}</strong> = ${quotient}</p><p>Whole groups only.</p>`],
      mod: [`<p><strong>${number} MOD ${divisor}</strong> = ${remainder}</p><p>Left over after complete groups.</p>`],
      identity: [`<p><strong>${number}</strong> = ${divisor} * ${quotient} + ${remainder} = ${identity}</p>`],
    };
    result.innerHTML = rows[operation].join("");
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
        ${tableMarkup(["Step", "Value", "Reason"], example.rows)}
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
      feedback.textContent = correct ? "Correct." : "Not quite. Use Show answer and compare the exact operator/result.";
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
setupCalculator();
setupScenarioChooser();
setupExamples();
setupPractice();
setupMistakes();
setupExamQuestions();
