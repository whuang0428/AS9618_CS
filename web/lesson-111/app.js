const scenarioMap = {
  passes: {
    title: "Count passes from five marks",
    ipoc: [
      ["Input", "Five marks"],
      ["Process", "Check each mark against 50 and increment PassCount when true"],
      ["Output", "PassCount"],
      ["Constraints", "Exactly five marks, so use a count-controlled loop"],
    ],
    pseudocode: "PassCount <- 0\nFOR Index <- 1 TO 5\n    INPUT Mark\n    IF Mark >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
  },
  sentinel: {
    title: "Total prices until 0",
    ipoc: [
      ["Input", "Prices entered one at a time"],
      ["Process", "Add each non-zero price to Total"],
      ["Output", "Total"],
      ["Constraints", "0 is a sentinel and must not be added"],
    ],
    pseudocode: "Total <- 0\nINPUT Price\nWHILE Price <> 0\n    Total <- Total + Price\n    INPUT Price\nENDWHILE\nOUTPUT Total",
  },
  highest: {
    title: "Highest of eight temperatures",
    ipoc: [
      ["Input", "Eight temperatures"],
      ["Process", "Keep the highest temperature seen so far"],
      ["Output", "Highest"],
      ["Constraints", "Known count; initialise Highest from first temperature"],
    ],
    pseudocode: "INPUT Temperature\nHighest <- Temperature\nFOR Index <- 2 TO 8\n    INPUT Temperature\n    IF Temperature > Highest THEN\n        Highest <- Temperature\n    ENDIF\nNEXT Index\nOUTPUT Highest",
  },
  password: {
    title: "Search for @ in password",
    ipoc: [
      ["Input", "Password string"],
      ["Process", "Inspect each character and set Found when @ appears"],
      ["Output", "Found / Not found message"],
      ["Constraints", "Search all characters unless already found"],
    ],
    pseudocode: "Found <- FALSE\nFOR Index <- 1 TO LENGTH(Password)\n    Character <- character at position Index\n    IF Character = \"@\" THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nIF Found = TRUE THEN\n    OUTPUT \"Found\"\nELSE\n    OUTPUT \"Not found\"\nENDIF",
  },
};

const examples = {
  passes: {
    title: "Example 1: Count passes",
    problem: "Input five marks and output how many are at least 50.",
    ipoc: scenarioMap.passes.ipoc,
    code: scenarioMap.passes.pseudocode,
    points: ["Known count means FOR loop.", "PassCount starts at 0.", "Increment only when Mark >= 50."],
  },
  sentinel: {
    title: "Example 2: Sentinel total",
    problem: "Input prices until 0 is entered and output the total.",
    ipoc: scenarioMap.sentinel.ipoc,
    code: scenarioMap.sentinel.pseudocode,
    points: ["0 is not data.", "Input before the WHILE test.", "Read the next price inside the loop."],
  },
  highest: {
    title: "Example 3: Find highest",
    problem: "Input eight temperatures and output the highest.",
    ipoc: scenarioMap.highest.ipoc,
    code: scenarioMap.highest.pseudocode,
    points: ["Initialise from the first real input.", "Compare each later value.", "Update only when a higher value appears."],
  },
  password: {
    title: "Example 4: Character search",
    problem: "Input a password and output whether it contains @.",
    ipoc: scenarioMap.password.ipoc,
    code: scenarioMap.password.pseudocode,
    points: ["Use a Found flag.", "Inspect each character.", "Output after the search."],
  },
};

const practice = [
  { id: "p1", prompt: "In IPOC, what does I stand for?", accepted: ["input"], answer: "Input" },
  { id: "p2", prompt: "In IPOC, what does O stand for?", accepted: ["output"], answer: "Output" },
  { id: "p3", prompt: "The phrase 'exactly 10 values' suggests which loop type?", accepted: ["for", "for loop", "count controlled", "count-controlled", "count controlled loop"], answer: "A FOR / count-controlled loop" },
  { id: "p4", prompt: "The phrase 'until -1 is entered' suggests which loop type?", accepted: ["while", "while loop", "condition controlled", "condition-controlled", "condition controlled loop"], answer: "A WHILE / condition-controlled loop" },
  { id: "p5", prompt: "If -1 is a sentinel, should it be added to the total? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p6", prompt: "For finding a maximum when values may be negative, initialise Maximum to 0 or first input?", accepted: ["first input", "first value", "first data value"], answer: "First input / first data value" },
  { id: "p7", prompt: "Which control structure handles 'if mark is at least 50'?", accepted: ["selection", "if", "if statement"], answer: "Selection / IF" },
  { id: "p8", prompt: "Should OUTPUT final average usually be inside or after the loop?", accepted: ["after", "after loop", "after the loop"], answer: "After the loop" },
  { id: "p9", prompt: "Which test type checks a limit such as mark 0 or 100?", accepted: ["boundary", "boundary test", "boundary data"], answer: "Boundary test data" },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  { wrong: "I started writing pseudocode without identifying the required output.", fix: "Start with the output, then decide what inputs and processing are needed to produce it." },
  { wrong: "I used a FOR loop for input until -1 is entered.", fix: "Use a condition-controlled loop because the number of inputs is not known in advance." },
  { wrong: "I added the sentinel value to Total before stopping.", fix: "Test the sentinel before processing it. The sentinel controls the loop and is not data." },
  { wrong: "I output the final average inside the loop.", fix: "Output the final average after all values have been processed unless a running average is requested." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A program must input five marks and output how many marks are at least 50. Identify the input, process, output and suitable loop type.",
    answer: "Input: five marks. Process: compare each mark with 50 and increment a pass count when Mark >= 50. Output: the pass count. Loop type: count-controlled / FOR loop because exactly five marks are input.",
    marking: [
      { mark: "B1", text: "identifies input as five marks" },
      { mark: "B1", text: "identifies output as count of marks at least 50" },
      { mark: "B1", text: "process compares each mark with 50" },
      { mark: "B1", text: "process increments count when condition is true" },
      { mark: "B1", text: "chooses count-controlled / FOR loop" },
      { mark: "B1", text: "justifies loop choice using exactly five marks" },
    ],
    strict: [
      "Do not accept 'calculate marks' as a process without comparison or count.",
      "Allow PassCount or Count as variable wording.",
      "Do not award loop justification mark for only naming FOR.",
    ],
  },
  {
    title: "Question 2",
    marks: "8 marks",
    prompt: "Write Cambridge-style pseudocode to input prices until 0 is entered, then output the total price. The 0 must not be included.",
    answer: "Total <- 0\nINPUT Price\nWHILE Price <> 0\n    Total <- Total + Price\n    INPUT Price\nENDWHILE\nOUTPUT Total",
    marking: [
      { mark: "B1", text: "initialises Total to 0" },
      { mark: "M1", text: "inputs first Price before loop test or otherwise tests before processing" },
      { mark: "M1", text: "uses condition-controlled loop with Price <> 0" },
      { mark: "A1", text: "adds Price to Total only inside valid-input loop" },
      { mark: "M1", text: "inputs next Price inside loop" },
      { mark: "B1", text: "does not add sentinel 0 to Total" },
      { mark: "A1", text: "outputs Total after loop" },
      { mark: "B1", text: "uses clear Cambridge-style pseudocode structure" },
    ],
    strict: [
      "Do not award sentinel mark if 0 is added before stopping.",
      "Allow REPEAT UNTIL if the 0 is not processed.",
      "Do not award final-output mark if output is only inside the loop.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "A program must input eight temperatures and output the highest. Explain the design before writing pseudocode.",
    answer: "The input is eight temperature values and the output is the highest temperature. A count-controlled loop is suitable because there are exactly eight values. Highest should be initialised from the first input, not 0, because temperatures may be negative. Each later temperature is compared with Highest and replaces it only if it is larger.",
    marking: [
      { mark: "B1", text: "identifies input as eight temperatures" },
      { mark: "B1", text: "identifies output as highest temperature" },
      { mark: "B1", text: "chooses count-controlled loop due to exactly eight values" },
      { mark: "M1", text: "initialises Highest from first input" },
      { mark: "M1", text: "explains why 0 may be unsuitable / negative temperatures possible" },
      { mark: "A1", text: "compares each later temperature with Highest" },
      { mark: "A1", text: "updates Highest only when a larger value is found" },
    ],
    strict: [
      "Do not accept initialising Highest to 0 if no non-negative range is stated.",
      "Allow Maximum for Highest.",
      "Do not require full pseudocode if question asks for design explanation.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Write pseudocode to input a password and output whether it contains the character @.",
    answer: "Found <- FALSE\nFOR Index <- 1 TO LENGTH(Password)\n    Character <- character at position Index\n    IF Character = \"@\" THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nIF Found = TRUE THEN\n    OUTPUT \"Found\"\nELSE\n    OUTPUT \"Not found\"\nENDIF",
    marking: [
      { mark: "B1", text: "initialises Found to FALSE" },
      { mark: "M1", text: "loops through each character of Password" },
      { mark: "M1", text: "extracts or refers clearly to current character" },
      { mark: "A1", text: "compares current character with @" },
      { mark: "A1", text: "sets Found to TRUE when @ is found" },
      { mark: "B1", text: "outputs result after search based on Found" },
      { mark: "B1", text: "uses clear Cambridge-style block structure" },
    ],
    strict: [
      "Do not award comparison mark for checking whether the whole password equals @.",
      "Allow early exit if logically correct.",
      "Do not require exact phrase 'character at position' if current character is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student says: 'I can solve any word problem by writing code immediately.' Evaluate this approach.",
    answer: "This is a weak approach because the student may miss the required output, constraints or stopping condition. A better approach is to identify inputs, processing, outputs and constraints first, then choose sequence, selection and iteration. The algorithm should be traced with suitable test data to check that variables update correctly and that outputs are in the correct position.",
    marking: [
      { mark: "B1", text: "recognises immediate coding can miss requirements" },
      { mark: "B1", text: "mentions required output or constraints/stopping condition" },
      { mark: "B1", text: "recommends IPOC / identifying inputs, processing, outputs and constraints" },
      { mark: "B1", text: "recommends choosing control structures before coding" },
      { mark: "B1", text: "mentions trace or test data to verify design" },
    ],
    strict: [
      "Do not accept only 'planning is better' without mechanism.",
      "Allow decomposition language instead of IPOC.",
      "Do not require Java discussion.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9@\\[\\] <>+=.-]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${head}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    five: "Five is the number of inputs, not the required output.",
    all: "The question asks for one value, not every score.",
    highest: "Correct. The output is the highest score.",
    average: "Average is a common output, but it is not requested here.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupScenario() {
  const input = document.querySelector("#scenarioInput");
  const result = document.querySelector("#scenarioResult");
  document.querySelector("#scenarioBtn").addEventListener("click", () => {
    const item = scenarioMap[input.value];
    result.innerHTML = `<h3>${item.title}</h3>${tableMarkup(["IPOC", "Design decision"], item.ipoc)}`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = scenarioMap[input.value];
    result.innerHTML = `<h3>${item.title}</h3><pre><code>${item.pseudocode}</code></pre>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    ${tableMarkup(["IPOC", "Design decision"], example.ipoc)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${example.code}</code></pre>
    <ul>${example.points.map((point) => `<li>${point}</li>`).join("")}</ul>
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
  renderExample("passes");
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
setupScenario();
setupBuilder();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
