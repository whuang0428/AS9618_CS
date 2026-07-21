const classifierMap = {
  range: { title: "Range check", detail: "The value must be between a lower and upper limit." },
  presence: { title: "Presence check", detail: "The field must not be blank." },
  length: { title: "Length check", detail: "The input must have a required number of characters." },
  format: { title: "Format check", detail: "The input must match a required pattern such as DD/MM/YYYY." },
  digit: { title: "Check digit", detail: "A calculated digit helps detect many transcription errors." },
};

const builderMap = {
  mark: "REPEAT\n    INPUT Mark\n    IF Mark < 0 OR Mark > 100 THEN\n        OUTPUT \"Invalid mark\"\n    ENDIF\nUNTIL Mark >= 0 AND Mark <= 100",
  age: "REPEAT\n    INPUT Age\n    IF Age < 11 OR Age > 18 THEN\n        OUTPUT \"Invalid age\"\n    ENDIF\nUNTIL Age >= 11 AND Age <= 18",
  name: "REPEAT\n    INPUT Name\n    IF Name = \"\" THEN\n        OUTPUT \"Name required\"\n    ENDIF\nUNTIL Name <> \"\"",
  password: "REPEAT\n    INPUT Password\n    IF LENGTH(Password) < 8 THEN\n        OUTPUT \"Password too short\"\n    ENDIF\nUNTIL LENGTH(Password) >= 8",
};

const examples = {
  range: {
    title: "Example 1: Range check",
    problem: "A mark must be from 0 to 100 inclusive.",
    rule: "Valid when Mark >= 0 AND Mark <= 100.",
    code: builderMap.mark,
  },
  presence: {
    title: "Example 2: Presence check",
    problem: "A name field must not be blank.",
    rule: "Valid when Name <> \"\".",
    code: builderMap.name,
  },
  length: {
    title: "Example 3: Length check",
    problem: "A password must be at least 8 characters.",
    rule: "Valid when LENGTH(Password) >= 8.",
    code: builderMap.password,
  },
  format: {
    title: "Example 4: Format check",
    problem: "A date must use the pattern DD/MM/YYYY.",
    rule: "Valid when the string matches two digits, slash, two digits, slash, four digits.",
    code: "INPUT DateString\nIF DateString matches \"DD/MM/YYYY\" THEN\n    OUTPUT \"Valid format\"\nELSE\n    OUTPUT \"Invalid format\"\nENDIF",
  },
};

const practice = [
  { id: "p1", prompt: "Which validation check tests whether Mark is between 0 and 100?", accepted: ["range", "range check"], answer: "Range check" },
  { id: "p2", prompt: "Which validation check tests that Name is not blank?", accepted: ["presence", "presence check"], answer: "Presence check" },
  { id: "p3", prompt: "Which validation check tests that Password has at least 8 characters?", accepted: ["length", "length check"], answer: "Length check" },
  { id: "p4", prompt: "Which validation check tests a pattern such as DD/MM/YYYY?", accepted: ["format", "format check"], answer: "Format check" },
  { id: "p5", prompt: "Write the valid condition for Mark from 0 to 100 inclusive.", accepted: ["mark >= 0 and mark <= 100", "mark<=100 and mark>=0", "mark >=0 and mark <=100"], answer: "Mark >= 0 AND Mark <= 100" },
  { id: "p6", prompt: "For invalid Mark outside 0-100, should the condition use AND or OR: Mark < 0 ___ Mark > 100?", accepted: ["or"], answer: "OR" },
  { id: "p7", prompt: "Can validation prove that data is true? yes or no.", accepted: ["no"], answer: "No. It checks acceptability, not truth." },
  { id: "p8", prompt: "Which Cambridge loop can run at least once and stop when valid?", accepted: ["repeat until", "repeat", "repeat...until"], answer: "REPEAT...UNTIL" },
  { id: "p9", prompt: "Which keyword displays an invalid input message in Cambridge pseudocode?", accepted: ["output"], answer: "OUTPUT" },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  { wrong: "I used Mark >= 0 OR Mark <= 100 as the valid condition.", fix: "Use AND. The mark must satisfy both limits: Mark >= 0 AND Mark <= 100." },
  { wrong: "I accepted a blank name because the program did not crash.", fix: "Use a presence check. Acceptable input is not the same as no runtime error." },
  { wrong: "I wrote the invalid condition as Mark < 0 AND Mark > 100.", fix: "No value can be below 0 and above 100 at the same time. Use OR for invalid outside-range checks." },
  { wrong: "I validated age 11-18 and claimed it proves the user is 15.", fix: "Validation only checks the value follows the rule. It cannot prove the real-world truth of the data." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A program inputs a Mark. The mark must be from 0 to 100 inclusive. Name the validation check and write a valid condition.",
    answer: "Use a range check. The valid condition is Mark >= 0 AND Mark <= 100.",
    marking: [
      { mark: "B1", text: "identifies range check" },
      { mark: "B1", text: "uses lower limit 0" },
      { mark: "B1", text: "uses upper limit 100" },
      { mark: "M1", text: "combines valid limits using AND" },
      { mark: "A1", text: "condition is inclusive and logically correct" },
    ],
    strict: [
      "Do not accept OR for the valid condition.",
      "Allow equivalent comparisons such as Mark > -1 AND Mark < 101 if integer marks are clear.",
      "Do not require full pseudocode.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to repeatedly input Age until it is from 11 to 18 inclusive. Output an error message when the age is invalid.",
    answer: "REPEAT\n    INPUT Age\n    IF Age < 11 OR Age > 18 THEN\n        OUTPUT \"Invalid age\"\n    ENDIF\nUNTIL Age >= 11 AND Age <= 18",
    marking: [
      { mark: "B1", text: "uses repeated input loop" },
      { mark: "B1", text: "inputs Age inside the loop" },
      { mark: "M1", text: "tests invalid lower/upper range or equivalent valid range" },
      { mark: "A1", text: "outputs error message when invalid" },
      { mark: "M1", text: "loop terminates only when Age is valid" },
      { mark: "B1", text: "uses Cambridge-style keywords rather than Java-only syntax" },
    ],
    strict: [
      "Do not award termination mark if invalid ages are accepted.",
      "Allow WHILE version if it correctly repeats input until valid.",
      "Do not require exact wording of error message.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain the difference between validation and proving that data is true. Use an age example.",
    answer: "Validation checks whether data follows a rule or is acceptable for processing. It does not prove the data is true. For example, an age of 15 passes a range check for 11-18, but the user might not really be 15.",
    marking: [
      { mark: "B1", text: "states validation checks data against a rule" },
      { mark: "B1", text: "states validation does not prove truth/accuracy" },
      { mark: "B1", text: "gives valid age range example" },
      { mark: "B1", text: "explains the example clearly in context" },
    ],
    strict: [
      "Do not accept 'validation makes data correct'.",
      "Allow other realistic examples if acceptability vs truth is clear.",
      "Do not require discussion of verification.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "For each input, name a suitable validation check: surname must not be blank; password at least 8 characters; date in DD/MM/YYYY; barcode final digit detects errors; score 1 to 5.",
    answer: "Surname: presence check. Password: length check. Date: format check. Barcode final digit: check digit. Score 1 to 5: range check.",
    marking: [
      { mark: "B1", text: "surname identified as presence check" },
      { mark: "B1", text: "password identified as length check" },
      { mark: "B1", text: "date identified as format check" },
      { mark: "B1", text: "barcode identified as check digit" },
      { mark: "B1", text: "score identified as range check" },
    ],
    strict: [
      "Do not accept type check for DD/MM/YYYY unless format/pattern is also clear.",
      "Allow size check for length check if meaning is clear.",
      "Do not award check digit for simply checking a digit exists.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student writes Mark < 0 AND Mark > 100 to detect an invalid mark. Explain the error and correct it.",
    answer: "The condition can never be true because a mark cannot be less than 0 and greater than 100 at the same time. To detect an invalid mark outside the range, use Mark < 0 OR Mark > 100. The valid condition would be Mark >= 0 AND Mark <= 100.",
    marking: [
      { mark: "B1", text: "identifies AND condition can never be true" },
      { mark: "B1", text: "explains value cannot be below lower limit and above upper limit simultaneously" },
      { mark: "B1", text: "correct invalid condition uses OR" },
      { mark: "B1", text: "gives correct valid condition using AND" },
      { mark: "B1", text: "uses inclusive limits correctly" },
    ],
    strict: [
      "Do not accept Mark < 0 OR Mark < 100 as corrected invalid condition.",
      "Allow equivalent integer comparisons if limits remain 0 and 100 inclusive.",
      "Do not require full loop pseudocode.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9<>=, -]/g, "");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    presence: "Not enough. Presence checks that something was entered, but 900 is still present.",
    range: "Correct. A range check can reject values outside a sensible age interval.",
    length: "Not the best rule. 900 has a length, but the value is the problem.",
    format: "Not the best rule. 900 is numeric-looking, but the accepted range is the issue.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupTester() {
  const input = document.querySelector("#markInput");
  const result = document.querySelector("#testResult");
  document.querySelector("#testBtn").addEventListener("click", () => {
    const mark = Number(input.value);
    if (Number.isNaN(mark)) {
      result.innerHTML = "<strong>Invalid</strong><span>Input must be numeric for this test.</span>";
      return;
    }
    const valid = mark >= 0 && mark <= 100;
    result.innerHTML = `<strong>${valid ? "Valid" : "Invalid"}</strong><span>${mark} ${valid ? "is within" : "is outside"} the inclusive range 0-100.</span>`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    result.innerHTML = `<pre><code>${builderMap[input.value]}</code></pre>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <p><strong>Rule:</strong> ${example.rule}</p>
    <pre><code>${example.code}</code></pre>
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
  renderExample("range");
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
setupClassifier();
setupTester();
setupBuilder();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
