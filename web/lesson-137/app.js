const scenarios = {
  mark: {
    label: "Mark: integer 0 to 100 inclusive",
    unit: "mark",
    tests: [
      ["50", "Normal", "typical valid mark", "Accepted"],
      ["0", "Boundary", "lowest valid mark", "Accepted"],
      ["100", "Boundary", "highest valid mark", "Accepted"],
      ["-1", "Erroneous", "just below valid range", "Rejected"],
      ["101", "Erroneous", "just above valid range", "Rejected"],
      ['"cat"', "Erroneous", "wrong data type for an integer mark", "Rejected or handled"],
    ],
  },
  password: {
    label: "Password length: 8 to 20 characters inclusive",
    unit: "characters",
    tests: [
      ["12", "Normal", "typical valid length", "Accepted"],
      ["8", "Boundary", "minimum valid length", "Accepted"],
      ["20", "Boundary", "maximum valid length", "Accepted"],
      ["7", "Erroneous", "too short", "Rejected"],
      ["21", "Erroneous", "too long", "Rejected"],
      ["blank password", "Erroneous", "missing required data", "Rejected"],
    ],
  },
  age: {
    label: "Competition age: integer 11 to 18 inclusive",
    unit: "years",
    tests: [
      ["15", "Normal", "typical valid age", "Accepted"],
      ["11", "Boundary", "lowest valid age", "Accepted"],
      ["18", "Boundary", "highest valid age", "Accepted"],
      ["10", "Erroneous", "below minimum age", "Rejected"],
      ["19", "Erroneous", "above maximum age", "Rejected"],
      ['"sixteen"', "Erroneous", "wrong data type for an integer age", "Rejected or handled"],
    ],
  },
};

const examples = {
  classify: {
    title: "Example 1: Classify test data",
    problem: "A mark must be an integer from 0 to 100 inclusive. Classify 50, 0, 100, -1 and \"cat\".",
    table: [
      ["50", "Normal", "valid and typical"],
      ["0", "Boundary", "lowest valid value"],
      ["100", "Boundary", "highest valid value"],
      ["-1", "Erroneous", "outside the valid range"],
      ['"cat"', "Erroneous", "wrong data type"],
    ],
    points: [
      "Normal data is valid and ordinary.",
      "Boundary data sits at the accepted edge.",
      "Erroneous data should be rejected or handled.",
    ],
  },
  design: {
    title: "Example 2: Design a test table",
    problem: "Design tests for password length from 8 to 20 characters inclusive.",
    table: [
      ["12 characters", "Normal", "typical valid length", "Accepted"],
      ["8 characters", "Boundary", "minimum valid length", "Accepted"],
      ["20 characters", "Boundary", "maximum valid length", "Accepted"],
      ["7 characters", "Erroneous", "too short", "Rejected"],
      ["21 characters", "Erroneous", "too long", "Rejected"],
    ],
    points: [
      "Include expected results; otherwise the test table is incomplete.",
      "Use exact edge values, not vague phrases such as 'near 8'.",
      "Add just-outside values when testing validation.",
    ],
  },
  explain: {
    title: "Example 3: Explain why boundary data is useful",
    problem: "A condition is written as IF Mark > 0 AND Mark < 100. The intended valid range is 0 to 100 inclusive. Which tests expose the fault?",
    table: [
      ["0", "Boundary", "should be accepted, but this code rejects it"],
      ["100", "Boundary", "should be accepted, but this code rejects it"],
      ["50", "Normal", "accepted, so it does not reveal this edge error"],
      ["-1", "Erroneous", "correctly rejected"],
      ["101", "Erroneous", "correctly rejected"],
    ],
    points: [
      "Boundary tests reveal incorrect inclusive/exclusive comparisons.",
      "Normal data can pass even when edge values fail.",
      "Expected results make the fault visible.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the term for valid, typical data inside the allowed range?", accepted: ["normal", "normal data"], answer: "Normal data." },
  { id: "p2", prompt: "What is the term for data at the edge of a valid range?", accepted: ["boundary", "boundary data"], answer: "Boundary data." },
  { id: "p3", prompt: "What is the term for invalid data that should be rejected?", accepted: ["erroneous", "erroneous data", "invalid data"], answer: "Erroneous data." },
  { id: "p4", prompt: "For a mark range 0 to 100 inclusive, classify 50.", accepted: ["normal", "normal data"], answer: "50 is normal data because it is valid and typical." },
  { id: "p5", prompt: "For a mark range 0 to 100 inclusive, classify 0.", accepted: ["boundary", "boundary data"], answer: "0 is boundary data because it is the lowest valid value." },
  { id: "p6", prompt: "For a mark range 0 to 100 inclusive, classify 100.", accepted: ["boundary", "boundary data"], answer: "100 is boundary data because it is the highest valid value." },
  { id: "p7", prompt: "For a mark range 0 to 100 inclusive, what expected result should -1 have?", accepted: ["rejected", "reject", "not accepted", "invalid"], answer: "-1 should be rejected because it is below the valid range." },
  { id: "p8", prompt: "For a mark range 0 to 100 inclusive, classify 101.", accepted: ["erroneous", "erroneous data", "invalid", "rejected"], answer: "101 is erroneous data and should be rejected." },
  { id: "p9", prompt: "A mark must be an integer. Classify \"abc\".", accepted: ["erroneous", "erroneous data", "invalid", "wrong type"], answer: "\"abc\" is erroneous data because it is the wrong data type." },
  { id: "p10", prompt: "Why should a test table include expected results?", accepted: ["compare", "actual", "detect", "fault", "correct"], answer: "Expected results let the tester compare actual output with intended output and detect faults." },
];

const mistakes = [
  {
    wrong: "A test table for marks 0 to 100 uses only 40, 50 and 60.",
    fix: "Those are normal values only. Add boundaries 0 and 100, plus erroneous values such as -1, 101 and a wrong-type input.",
  },
  {
    wrong: "A student calls 101 boundary data for the inclusive range 0 to 100.",
    fix: "101 is just outside the upper boundary and is erroneous for this rule. The upper valid boundary is 100.",
  },
  {
    wrong: "The table lists inputs but leaves expected result blank.",
    fix: "Add an expected result for each test, such as Accepted, Rejected, or a specific output message.",
  },
  {
    wrong: "A student writes a Java JUnit assertion as the whole Cambridge pseudocode answer.",
    fix: "Java can support checking, but Paper 2 pseudocode answers should use clear Cambridge-style logic and test data descriptions.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A mark must be an integer from 0 to 100 inclusive. Define normal, boundary and erroneous test data and give one suitable example of each.",
    answer: "Normal data is valid, typical data, for example 50. Boundary data is data at the edge of the valid range, for example 0 or 100. Erroneous data is invalid data that should be rejected, for example -1, 101 or \"cat\".",
    marking: [
      { mark: "B1", text: "defines normal data as valid and typical" },
      { mark: "B1", text: "gives a suitable normal example such as 50" },
      { mark: "B1", text: "defines boundary data as at the edge of the valid range" },
      { mark: "B1", text: "gives a suitable boundary example such as 0 or 100" },
      { mark: "B1", text: "defines erroneous data as invalid data that should be rejected" },
      { mark: "B1", text: "gives a suitable erroneous example such as -1, 101 or wrong type data" },
    ],
    strict: [
      "Do not award boundary example mark for 50.",
      "Allow 0 or 100 as boundary because the range is inclusive.",
      "Do not accept vague examples such as 'a big number' without a value.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Produce a test table for a mark validation check where valid marks are integers from 0 to 100 inclusive. Include normal, boundary and erroneous data.",
    answer: "A suitable table includes 50 normal accepted, 0 boundary accepted, 100 boundary accepted, -1 erroneous rejected, 101 erroneous rejected, and \"abc\" erroneous rejected or handled.",
    marking: [
      { mark: "M1", text: "provides a clear test table or structured list" },
      { mark: "B1", text: "includes at least one normal valid value" },
      { mark: "B1", text: "includes lower boundary 0" },
      { mark: "B1", text: "includes upper boundary 100" },
      { mark: "B1", text: "includes at least one out-of-range erroneous value" },
      { mark: "B1", text: "includes a wrong-type or otherwise invalid erroneous value" },
      { mark: "A1", text: "states expected results accurately for the tests" },
    ],
    strict: [
      "Do not award expected result mark if outcomes are missing.",
      "Allow alternative normal values from 1 to 99.",
      "Do not accept -1 or 101 as valid boundary data for this inclusive range.",
      "Allow an equivalent stated validation rule if it is used consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain why testing 0, 100, -1 and 101 is useful for a validation rule that should accept marks from 0 to 100 inclusive.",
    answer: "0 and 100 test the valid lower and upper boundaries and should be accepted. -1 and 101 are just outside the valid range and should be rejected. These values help reveal incorrect comparison operators, such as using greater than instead of greater than or equal to.",
    marking: [
      { mark: "B1", text: "identifies 0 as the lower boundary" },
      { mark: "B1", text: "identifies 100 as the upper boundary" },
      { mark: "B1", text: "states 0 and 100 should be accepted" },
      { mark: "B1", text: "identifies -1 and/or 101 as just outside the range" },
      { mark: "B1", text: "states -1 and 101 should be rejected" },
      { mark: "B1", text: "explains that boundary testing can reveal incorrect comparison logic" },
    ],
    strict: [
      "Do not award accepted mark if candidate says 0 or 100 should be rejected.",
      "Allow equivalent wording for inclusive edge values.",
      "Do not require code, but credit a correct comparison-operator explanation.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A program uses the condition IF Mark >= 0 AND Mark <= 100 THEN OUTPUT \"Accepted\" ELSE OUTPUT \"Rejected\". Give four test values and expected outputs.",
    answer: "One suitable set is: 50 gives Accepted; 0 gives Accepted; 100 gives Accepted; and -1 gives Rejected.",
    marking: [
      { mark: "B1", text: "gives one normal valid value with expected output Accepted" },
      { mark: "B1", text: "gives lower boundary 0 with expected output Accepted" },
      { mark: "B1", text: "gives upper boundary 100 with expected output Accepted" },
      { mark: "B1", text: "gives one out-of-range value with expected output Rejected" },
    ],
    strict: [
      "Award a mark only when a test value is paired with the correct expected output.",
      "Allow any valid normal value from 1 to 99.",
      "Do not accept 0 as rejected for the given condition.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A candidate tests a mark validation program using only 50, 60 and 75. Identify two weaknesses and improve the test set.",
    answer: "The set only uses normal valid data and does not test the boundaries or invalid data. Improve it by adding 0 and 100 as boundary values, -1 and 101 as just outside the range, and a wrong-type value such as \"abc\" if input type validation is required.",
    marking: [
      { mark: "B1", text: "identifies missing boundary data" },
      { mark: "B1", text: "identifies missing erroneous/invalid data" },
      { mark: "B1", text: "adds valid boundary examples 0 and/or 100" },
      { mark: "B1", text: "adds erroneous out-of-range examples such as -1 and/or 101" },
    ],
    strict: [
      "Do not award improvement marks for adding more normal values only.",
      "Allow equivalent valid range examples if the candidate states a different scenario.",
      "Do not accept 'test more' without naming values or data types.",
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
    50: { text: "50 is valid and typical, so it is normal data, not boundary data.", correct: false },
    0: { text: "Correct. 0 is the lower valid boundary for an inclusive 0 to 100 range.", correct: true },
    101: { text: "101 is just outside the range, so it is erroneous for this rule.", correct: false },
    cat: { text: "\"cat\" is wrong-type erroneous data when an integer mark is required.", correct: false },
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

function classifyValue(rawValue) {
  const trimmed = rawValue.trim();
  if (trimmed === "") {
    return {
      type: "Erroneous",
      expected: "Rejected",
      reason: "blank input is missing required integer data",
    };
  }
  if (!/^-?\d+$/.test(trimmed)) {
    return {
      type: "Erroneous",
      expected: "Rejected or handled",
      reason: "the value is not an integer",
    };
  }

  const value = Number.parseInt(trimmed, 10);
  if (value === 0) {
    return { type: "Boundary", expected: "Accepted", reason: "0 is the lower valid boundary" };
  }
  if (value === 100) {
    return { type: "Boundary", expected: "Accepted", reason: "100 is the upper valid boundary" };
  }
  if (value > 0 && value < 100) {
    return { type: "Normal", expected: "Accepted", reason: `${value} is inside the valid range` };
  }
  if (value === -1 || value === 101) {
    return { type: "Erroneous", expected: "Rejected", reason: `${value} is just outside the boundary` };
  }
  return { type: "Erroneous", expected: "Rejected", reason: `${value} is outside the valid range` };
}

function setupClassifier() {
  const input = document.querySelector("#testValue");
  const output = document.querySelector("#classifierOutput");
  const render = () => {
    const result = classifyValue(input.value);
    output.innerHTML = `
      <p><strong>Classification:</strong> ${escapeHtml(result.type)}</p>
      <p><strong>Expected result:</strong> ${escapeHtml(result.expected)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(result.reason)}</p>
    `;
  };
  document.querySelector("#classifyBtn").addEventListener("click", render);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") render();
  });
  render();
}

function setupBuilder() {
  const select = document.querySelector("#scenarioSelect");
  const output = document.querySelector("#builderOutput");
  const render = () => {
    const scenario = scenarios[select.value];
    output.innerHTML = `
      <h3>${escapeHtml(scenario.label)}</h3>
      ${tableMarkup(["Test data", "Type", "Reason", "Expected result"], scenario.tests)}
    `;
  };
  document.querySelector("#buildBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function renderExample(key) {
  const example = examples[key];
  const headers = example.table[0].length === 4
    ? ["Test data", "Type", "Reason", "Expected result"]
    : ["Test data", "Type", "Reason"];
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
  renderExample("classify");
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
      feedback.textContent = correct ? "Correct." : "Not quite. Use the answer button, then tighten the wording.";
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
  setupClassifier();
  setupBuilder();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
