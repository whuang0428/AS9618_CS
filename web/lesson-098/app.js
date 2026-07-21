const classifierMap = {
  pass: {
    topic: "Selection",
    detail: "The algorithm chooses between two outputs using a condition such as Mark >= 50.",
  },
  total: {
    topic: "Count-controlled iteration",
    detail: "Exactly ten values are processed, so a fixed loop and running total are appropriate.",
  },
  sentinel: {
    topic: "Condition-controlled iteration",
    detail: "The sentinel value -1 is the stopping condition; it should not be processed as data.",
  },
  highest: {
    topic: "Maximum-tracking algorithm",
    detail: "Track the current highest value while each new score is checked.",
  },
  validate: {
    topic: "Validation constraint",
    detail: "The range -20 to 50 must be checked before accepting or processing the value.",
  },
};

const ipocMap = {
  pass: {
    input: "Mark",
    process: "Compare Mark with 50",
    output: '"Pass" if Mark >= 50, otherwise "Resit needed"',
    constraint: "Mark should be a valid mark; 50 is the boundary between outputs",
  },
  average: {
    input: "Five numeric values",
    process: "Add values to Total, then divide Total by 5",
    output: "Average",
    constraint: "Exactly 5 values are entered; Total must be initialised to 0",
  },
  valid: {
    input: "Age",
    process: "Check Age >= 11 AND Age <= 18",
    output: '"Valid" or "Invalid"',
    constraint: "Accepted range is 11 to 18 inclusive",
  },
  maximum: {
    input: "Six scores",
    process: "Set first score as current maximum, then compare remaining scores",
    output: "Highest score",
    constraint: "At least one score must be available before setting the initial maximum",
  },
};

const examples = {
  pass: {
    title: "Example 1: Pass/resit",
    problem: "Input a mark and output Pass if it is at least 50, otherwise Resit needed.",
    steps: [
      "Input: Mark.",
      "Output: Pass or Resit needed.",
      "Constraint: 50 is included in Pass because the condition is at least 50.",
      "Pseudocode: INPUT Mark; IF Mark >= 50 THEN OUTPUT \"Pass\" ELSE OUTPUT \"Resit needed\" ENDIF.",
      "Trace: Mark 50 follows the true branch and outputs Pass.",
    ],
  },
  average: {
    title: "Example 2: Average of 5 values",
    problem: "Input five values and output their average.",
    steps: [
      "Input: five values, one at a time.",
      "Output: Average.",
      "Constraint: exactly 5 values means a count-controlled loop is suitable.",
      "Initialise Total to 0 before the loop.",
      "After the loop, Average <- Total / 5 and output Average.",
    ],
  },
  validate: {
    title: "Example 3: Validate age",
    problem: "Accept an age only if it is between 11 and 18 inclusive.",
    steps: [
      "Input: Age.",
      "Constraint: Age >= 11 AND Age <= 18.",
      "Output: Valid if the condition is true, otherwise Invalid.",
      "Boundary tests: 10, 11, 18, 19.",
      "Trap: OR would incorrectly accept nearly every age.",
    ],
  },
  max: {
    title: "Example 4: Highest score",
    problem: "Input six scores and output the highest.",
    steps: [
      "Input: six scores.",
      "Output: Highest.",
      "Constraint: at least one score is needed to initialise Highest.",
      "Set Highest to the first score, then compare each remaining score with Highest.",
      "If Score > Highest then update Highest.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What does IPOC stand for?", accepted: ["input process output constraints", "input process output constraint"], answer: "Input, Process, Output, Constraints" },
  { id: "p2", prompt: "Which term describes data supplied to an algorithm?", accepted: ["input", "inputs"], answer: "Input" },
  { id: "p3", prompt: "Which term describes the result produced by an algorithm?", accepted: ["output", "outputs"], answer: "Output" },
  { id: "p4", prompt: "Which term describes a rule or limit such as 0 to 100?", accepted: ["constraint", "constraints"], answer: "Constraint" },
  { id: "p5", prompt: "Which control structure chooses between branches?", accepted: ["selection", "if", "if statement"], answer: "Selection / IF" },
  { id: "p6", prompt: "Which control structure repeats steps?", accepted: ["iteration", "loop", "repetition"], answer: "Iteration / loop" },
  { id: "p7", prompt: "What value tells a condition-controlled loop to stop?", accepted: ["sentinel", "sentinel value"], answer: "Sentinel value" },
  { id: "p8", prompt: "Which test type checks values at the edge of a range?", accepted: ["boundary", "boundary test", "boundary data"], answer: "Boundary test" },
  { id: "p9", prompt: "In Cambridge pseudocode, which keyword is used to display a result?", accepted: ["output"], answer: "OUTPUT" },
  { id: "p10", prompt: "Is Java syntax the expected exam format for Paper 2 pseudocode? yes or no.", accepted: ["no"], answer: "No" },
];

const mistakes = [
  {
    wrong: "I started writing pseudocode before deciding what the output should be.",
    fix: "Define the required output first. The process is easier to design when the target result is known.",
  },
  {
    wrong: "I used Java braces and semicolons in my exam pseudocode.",
    fix: "Use Cambridge-style pseudocode keywords such as IF, THEN, ELSE, ENDIF, INPUT and OUTPUT.",
  },
  {
    wrong: "My loop reads values until -1, but it adds -1 to the total.",
    fix: "Check for the sentinel before processing the value, or ensure the sentinel is excluded from the total/count.",
  },
  {
    wrong: "To validate Age 11-18, I used Age >= 11 OR Age <= 18.",
    fix: "Use AND. The age must satisfy both lower and upper limits: Age >= 11 AND Age <= 18.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A program inputs a Mark and outputs 'Pass' if the mark is 50 or more, otherwise 'Resit needed'. Identify the input, output, process and one boundary test.",
    answer: "Input: Mark. Output: either 'Pass' or 'Resit needed'. Process: compare Mark with 50 using Mark >= 50 and choose the correct output. A boundary test is 50 because it is the lowest mark that should output Pass; 49 is also useful because it should output Resit needed.",
    marking: [
      { mark: "B1", text: "identifies Mark as input" },
      { mark: "B1", text: "identifies correct possible outputs" },
      { mark: "M1", text: "describes comparison/selection using 50" },
      { mark: "B1", text: "identifies 50 or 49/50 as boundary test data" },
      { mark: "A1", text: "explains expected boundary outcome" },
    ],
    strict: [
      "Do not accept vague 'number' as input unless linked to Mark.",
      "Allow pass/fail wording if Resit needed meaning is clear.",
      "Do not award boundary explanation for random values such as 70 only.",
      "FT: boundary outcome can follow from candidate's stated threshold.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to input a Mark and output 'Pass' if Mark is at least 50, otherwise output 'Resit needed'.",
    answer: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
    marking: [
      { mark: "B1", text: "INPUT Mark" },
      { mark: "M1", text: "uses IF with condition Mark >= 50 or equivalent" },
      { mark: "A1", text: "outputs Pass on true branch" },
      { mark: "A1", text: "outputs Resit needed on false/ELSE branch" },
      { mark: "B1", text: "uses Cambridge-style structure with THEN/ELSE/ENDIF or clear equivalent" },
      { mark: "A1", text: "logic correctly includes 50 as Pass" },
    ],
    strict: [
      "Do not require exact indentation, but structure must be clear.",
      "Do not accept Java-only syntax as Cambridge pseudocode for the structure mark.",
      "Allow Mark > 49 if integer mark assumption is clear.",
      "FT: branch output marks can follow from candidate's stated condition.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A problem requires five numbers to be input and their average output. Describe the inputs, output, constraints and outline the algorithm.",
    answer: "The inputs are five numeric values. The output is the average. A constraint is that exactly five values are entered, so a count-controlled loop can be used; Total should be initialised to 0. The algorithm repeats five times: input a value and add it to Total. After the loop, Average is calculated as Total / 5 and output.",
    marking: [
      { mark: "B1", text: "identifies five numeric values as input" },
      { mark: "B1", text: "identifies average as output" },
      { mark: "B1", text: "states constraint exactly five values / count-controlled loop" },
      { mark: "M1", text: "initialises and updates running total" },
      { mark: "M1", text: "calculates average by dividing total by 5" },
      { mark: "A1", text: "orders steps logically and outputs the result" },
    ],
    strict: [
      "Do not award full algorithm credit if Total is not initialised.",
      "Allow Sum instead of Total.",
      "Do not accept dividing by an unspecified count unless count is correctly maintained.",
      "FT: average calculation can follow from candidate's chosen count if loop design is consistent.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A loop inputs numbers until -1 is entered. The total of the entered numbers must be output, but -1 must not be included. Explain the key input, output, constraint and common algorithm trap.",
    answer: "The input is a sequence of numbers. The output is the total of the numbers entered before -1. The constraint/stopping condition is that -1 ends the input and is a sentinel value. The common trap is adding -1 to the total before checking whether it is the sentinel; the algorithm should check for -1 before including the value in the total.",
    marking: [
      { mark: "B1", text: "identifies sequence of numbers as input" },
      { mark: "B1", text: "identifies total before sentinel as output" },
      { mark: "B1", text: "identifies -1 as sentinel/stopping condition" },
      { mark: "M1", text: "explains -1 must not be processed/added" },
      { mark: "A1", text: "describes checking sentinel before adding or equivalent safe logic" },
    ],
    strict: [
      "Do not accept adding all values including -1.",
      "Allow flag/condition-controlled loop explanation.",
      "Do not require full pseudocode.",
      "FT: safe logic mark can follow from any clearly identified sentinel value.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes Java syntax for a Paper 2 pseudocode answer. Explain why this can lose marks and give two examples of Cambridge-style pseudocode conventions.",
    answer: "Paper 2 expects Cambridge-style pseudocode, so Java-only syntax such as braces, semicolons and System.out.println may not match the required conventions. Cambridge-style pseudocode uses keywords such as INPUT and OUTPUT for data entry and display. It also uses structures such as IF condition THEN, ELSE and ENDIF rather than Java braces. Meaningful identifiers and indentation help make the algorithm readable.",
    marking: [
      { mark: "B1", text: "states Cambridge-style pseudocode is expected for exam answers" },
      { mark: "B1", text: "identifies Java-only syntax such as braces/semicolons/System.out.println as unsuitable" },
      { mark: "B1", text: "gives INPUT as convention" },
      { mark: "B1", text: "gives OUTPUT as convention" },
      { mark: "M1", text: "gives IF...THEN...ELSE...ENDIF or similar Cambridge structure" },
      { mark: "A1", text: "explains readability/clarity or mark-scheme alignment" },
    ],
    strict: [
      "Do not award convention marks for Java syntax examples.",
      "Allow assignment arrow if described as Cambridge-style assignment.",
      "Do not say Java is never useful; Java may support implementation but is not the exam pseudocode format.",
      "FT: readability mark can follow from any valid Cambridge convention examples.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    input: "Fault: input/assumption. The algorithm uses data without checking it is available.",
    output: "Fault: output. The algorithm has activity but no defined result.",
    constraint: "Fault: constraint/stopping condition. A loop must know when to stop.",
    process: "Fault: process. The task needs ordered steps, not a vague command.",
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
    result.innerHTML = `<strong>${item.topic}</strong><br />${item.detail}`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#problemInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    const item = ipocMap[input.value];
    result.innerHTML = `
      <strong>Input:</strong> ${item.input}<br />
      <strong>Process:</strong> ${item.process}<br />
      <strong>Output:</strong> ${item.output}<br />
      <strong>Constraint:</strong> ${item.constraint}
    `;
  });
}

function setupTrace() {
  const input = document.querySelector("#traceInput");
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const mark = Number(input.value);
    const condition = mark >= 50;
    const output = condition ? "Pass" : "Resit needed";
    result.innerHTML = `
      <div class="mini-result" style="--cols: 3">
        <div class="table-row table-head"><div>Mark</div><div>Mark >= 50?</div><div>Output</div></div>
        <div class="table-row"><div>${mark}</div><div>${condition ? "TRUE" : "FALSE"}</div><div>${output}</div></div>
      </div>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>
      ${example.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
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
  renderExample("pass");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-item">
          <p><strong>${index + 1}.</strong> ${item.prompt}</p>
          <div class="practice-row">
            <input type="text" id="${item.id}" autocomplete="off" aria-label="Answer for question ${index + 1}" />
            <span class="mark" id="${item.id}Mark">Not checked</span>
          </div>
          <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
          <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
        </article>
      `
    )
    .join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}Mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => normalise(answer) === value);
      mark.textContent = value.length === 0 ? "Not checked" : correct ? "Correct" : "Try again";
      mark.classList.toggle("correct", correct);
      mark.classList.toggle("incorrect", value.length > 0 && !correct);
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
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <p class="wrong"><strong>Weak design ${index + 1}:</strong> ${item.wrong}</p>
          <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
          <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${question.title}</h3>
            <span>${question.marks}</span>
          </div>
          <p>${question.prompt}</p>
          <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
          <div class="ms-panel" id="ms${index}">
            <p><strong>Indicative answer:</strong></p>
            <pre><code>${question.answer}</code></pre>
            <h4>CIE-style mark scheme</h4>
            <ul>
              ${question.marking.map((mark) => `<li><strong>${mark.mark}:</strong> ${mark.text}</li>`).join("")}
            </ul>
            <h4>Strict notes</h4>
            <ul>
              ${question.strict.map((note) => `<li>${note}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupClassifier();
  setupBuilder();
  setupTrace();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
