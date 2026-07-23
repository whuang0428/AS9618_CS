const scenarios = [
  {
    id: "prompt",
    text: "Tell the user what value they should type next.",
    recommendation: "OUTPUT prompt text",
    reason: "A prompt is displayed text, for example OUTPUT \"Enter mark\".",
  },
  {
    id: "read",
    text: "Read the mark typed by the user and store it.",
    recommendation: "INPUT Mark",
    reason: "INPUT receives data from the user and stores it in a variable.",
  },
  {
    id: "label",
    text: "Display a mark with a clear label.",
    recommendation: "OUTPUT \"Mark: \" & Mark",
    reason: "A label makes the displayed value meaningful.",
  },
  {
    id: "table",
    text: "Display many records in a readable list.",
    recommendation: "formatted OUTPUT lines with headings",
    reason: "Headings and consistent spacing make repeated values easier to interpret.",
  },
];

const examples = {
  promptInput: {
    title: "Example 1: Prompt then input",
    problem: "Ask for a student's mark and store it.",
    rows: [
      ["Line 1", "OUTPUT \"Enter mark 0 to 100\"", "prompt displayed to user"],
      ["Line 2", "INPUT Mark", "user value is stored in Mark"],
      ["If user enters", "72", "Mark now stores 72"],
    ],
    code: "OUTPUT \"Enter mark 0 to 100\"\nINPUT Mark",
    points: [
      "OUTPUT alone does not read data.",
      "INPUT stores the user's value.",
      "A clear prompt states what is expected.",
    ],
  },
  formatted: {
    title: "Example 2: Format a result line",
    problem: "Display a student's name and mark clearly.",
    rows: [
      ["Name", "Ada", "stored string"],
      ["Mark", "72", "stored integer"],
      ["Formatted output", "\"Name: Ada, Mark: 72\"", "labels and punctuation added"],
    ],
    code: "Name <- \"Ada\"\nMark <- 72\nOUTPUT \"Name: \" & Name & \", Mark: \" & Mark",
    points: [
      "Concatenation joins labels and stored values.",
      "Punctuation and spaces make output easier to read.",
      "The value is not changed by being displayed.",
    ],
  },
  calculation: {
    title: "Example 3: Output a calculated value",
    problem: "Input a price, calculate VAT, and display a labelled total.",
    rows: [
      ["Input", "Price = 20.00", "numeric value"],
      ["Calculation", "Total = Price * 1.20", "24.00"],
      ["Output", "\"Total price: 24\"", "label plus calculated value"],
    ],
    code: "OUTPUT \"Enter price\"\nINPUT Price\nTotal <- Price * 1.20\nOUTPUT \"Total price: \" & Total",
    points: [
      "Use INPUT before using a value entered by the user.",
      "Output can include expression results or calculated variables.",
      "If a paper requires decimal places, state or show the required formatting.",
    ],
  },
  table: {
    title: "Example 4: Table-like output",
    problem: "Display two names and marks in a readable format.",
    rows: [
      ["Heading", "Name    Mark", "explains columns"],
      ["Row 1", "Ada     72", "first record"],
      ["Row 2", "Lin     85", "second record"],
    ],
    code: "OUTPUT \"Name    Mark\"\nOUTPUT \"Ada     72\"\nOUTPUT \"Lin     85\"",
    points: [
      "Headings reduce ambiguity.",
      "Consistent spacing or labels help repeated output.",
      "In pseudocode, clarity is more important than Java-specific formatting syntax.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which command reads and stores data entered by the user?", accepted: ["input"], answer: "INPUT." },
  { id: "p2", prompt: "Which command displays text or a value to the user?", accepted: ["output"], answer: "OUTPUT." },
  { id: "p3", prompt: "Does OUTPUT \"Enter mark\" store the mark? yes or no.", accepted: ["no"], answer: "No. It only displays a prompt." },
  { id: "p4", prompt: "Complete the missing line: OUTPUT \"Enter name\"; _____ Name", accepted: ["input"], answer: "INPUT Name." },
  { id: "p5", prompt: "Name <- \"Ada\"; OUTPUT \"Name: \" & Name. What is displayed?", accepted: ["Name: Ada", "name: ada"], answer: "Name: Ada." },
  { id: "p6", prompt: "Mark <- 72; OUTPUT \"Mark: \" & Mark. What is displayed?", accepted: ["Mark: 72", "mark: 72"], answer: "Mark: 72." },
  { id: "p7", prompt: "Should a good prompt say what data is expected? yes or no.", accepted: ["yes"], answer: "Yes." },
  { id: "p8", prompt: "Which is clearer output: 72 or Mark: 72?", accepted: ["Mark: 72", "mark: 72"], answer: "Mark: 72." },
  { id: "p9", prompt: "In OUTPUT \"Total: \" & Total, what operator joins the label and value?", accepted: ["&", "ampersand"], answer: "&." },
  { id: "p10", prompt: "Java Scanner syntax should be copied into Cambridge pseudocode. true or false?", accepted: ["false"], answer: "False." },
];

const mistakes = [
  {
    wrong: "A student writes OUTPUT \"Enter mark\" and then uses Mark in a calculation without INPUT Mark.",
    fix: "Add INPUT Mark after the prompt. The prompt displays text; INPUT stores the user's value.",
  },
  {
    wrong: "A student outputs only 72 when the user needs to know what the value means.",
    fix: "Use a label such as OUTPUT \"Mark: \" & Mark so the value is meaningful.",
  },
  {
    wrong: "A student copies Java Scanner and System.out.println syntax into a pseudocode answer.",
    fix: "Use Cambridge-style INPUT and OUTPUT unless the question specifically asks for Java.",
  },
  {
    wrong: "A student concatenates values without spaces: OUTPUT \"Name:\" & Name & \"Mark:\" & Mark.",
    fix: "Include spaces or punctuation, for example OUTPUT \"Name: \" & Name & \", Mark: \" & Mark.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Write Cambridge-style pseudocode that prompts the user to enter a name, inputs the name, and displays Hello followed by the name.",
    answer: "OUTPUT \"Enter name\"\nINPUT Name\nOUTPUT \"Hello \" & Name",
    marking: [
      { mark: "B1", text: "outputs a suitable prompt asking for the name" },
      { mark: "B1", text: "uses INPUT to read/store Name" },
      { mark: "M1", text: "constructs an output message using fixed text and the variable" },
      { mark: "A1", text: "outputs Hello followed by the entered name" },
    ],
    strict: [
      "Do not award input mark for OUTPUT \"Enter name\" alone.",
      "Allow different prompt wording if it clearly asks for a name.",
      "Do not accept Scanner-only Java code as Cambridge pseudocode.",
      "Allow an equivalent variable if it is used consistently.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A program stores Name as \"Ada\" and Mark as 72. Write pseudocode to display Name: Ada, Mark: 72 using the stored variables.",
    answer: "Name <- \"Ada\"\nMark <- 72\nOUTPUT \"Name: \" & Name & \", Mark: \" & Mark",
    marking: [
      { mark: "B1", text: "uses or refers to stored Name value" },
      { mark: "B1", text: "uses or refers to stored Mark value" },
      { mark: "M1", text: "concatenates fixed labels with variable values" },
      { mark: "A1", text: "includes a clear Name label" },
      { mark: "A1", text: "includes a clear Mark label" },
      { mark: "B1", text: "outputs the completed formatted line" },
    ],
    strict: [
      "Do not require exactly one OUTPUT statement if the displayed information is clear.",
      "Allow semantically equivalent punctuation or spacing.",
      "Do not award label marks for outputting only Ada and 72 without context.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "Identify and correct the error in this fragment.\n\nOUTPUT \"Enter price\"\nTotal <- Price * 1.20\nOUTPUT Total",
    answer: "The error is that Price is used without being input or assigned. OUTPUT only displays the prompt; it does not store a value. Add INPUT Price after the prompt and before the calculation.",
    marking: [
      { mark: "B1", text: "identifies that Price has not been input/assigned before use" },
      { mark: "B1", text: "explains OUTPUT prompt does not store Price" },
      { mark: "B1", text: "adds INPUT Price after the prompt" },
    ],
    strict: [
      "Do not award correction mark for assigning Price to the string \"Enter price\".",
      "Allow INPUT Price before the prompt only if the final algorithm clearly reads Price before use, but prompt ordering should be credited cautiously.",
      "Do not accept only Java Scanner syntax as correction.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain two features of clear output formatting for a list of student marks.",
    answer: "Clear output should include headings or labels so each value has meaning, for example Name and Mark. It should also use consistent order and spacing so repeated records can be compared easily.",
    marking: [
      { mark: "B1", text: "states headings or labels should be included" },
      { mark: "B1", text: "explains labels give meaning/context to displayed values" },
      { mark: "B1", text: "gives a relevant example such as Name and Mark" },
      { mark: "B1", text: "states consistent order, spacing or alignment should be used" },
      { mark: "B1", text: "explains this makes repeated records easier to read/compare" },
    ],
    strict: [
      "Do not award full marks for vague claims such as 'make it neat' without explaining how.",
      "Allow table-style layout, line breaks or punctuation as formatting features if explained.",
      "Do not accept colour or font features unless the question context supports them.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "Write pseudocode to input Product, Quantity and Price. Calculate Cost as Quantity * Price and output a readable receipt line.",
    answer: "OUTPUT \"Enter product\"\nINPUT Product\nOUTPUT \"Enter quantity\"\nINPUT Quantity\nOUTPUT \"Enter price\"\nINPUT Price\nCost <- Quantity * Price\nOUTPUT \"Product: \" & Product & \", Quantity: \" & Quantity & \", Cost: \" & Cost",
    marking: [
      { mark: "B1", text: "inputs Product" },
      { mark: "B1", text: "inputs Quantity" },
      { mark: "B1", text: "inputs Price" },
      { mark: "M1", text: "calculates Cost using Quantity * Price" },
      { mark: "A1", text: "assigns the calculation result to Cost or equivalent" },
      { mark: "M1", text: "outputs a receipt line containing product, quantity and cost" },
      { mark: "A1", text: "uses clear labels/formatting for the output values" },
    ],
    strict: [
      "Do not award input marks for prompts alone.",
      "Allow prompts but do not require them for all input marks if INPUT statements are clear.",
      "Do not accept adding Quantity and Price for Cost.",
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
  return value.trim().toLowerCase().replace(/^["']|["']$/g, "").replace(/\s+/g, " ").replace(/[^a-z0-9&:, %_.-]/g, "");
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
    output: "Not quite. This displays a prompt but does not read a value.",
    input: "Correct. INPUT Name reads user data and stores it in Name.",
    assign: "This stores the literal text Enter name, not what the user types.",
    display: "This displays the current value of Name. It does not read a new value.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupFormatter() {
  const result = document.querySelector("#formatResult");
  document.querySelector("#formatBtn").addEventListener("click", () => {
    const name = document.querySelector("#nameInput").value.trim() || "Unnamed";
    const mark = Number(document.querySelector("#markInput").value);
    const format = document.querySelector("#formatInput").value;

    if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
      result.textContent = "Enter an integer mark from 0 to 100.";
      return;
    }

    const outputs = {
      plain: `${name}\n${mark}`,
      labels: `Name: ${name}\nMark: ${mark}`,
      sentence: `${name} scored ${mark} marks.`,
      table: `Name    Mark\n${name.padEnd(7, " ")} ${mark}`,
    };
    result.innerHTML = `<pre><code>${escapeHtml(outputs[format])}</code></pre>`;
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
        ${tableMarkup(["Step", "Value / line", "Purpose"], example.rows)}
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
      feedback.textContent = correct ? "Correct." : "Not quite. Use Show answer and compare the command or displayed text.";
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
            <h4>Mark scheme</h4>
            <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
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
setupFormatter();
setupScenarioChooser();
setupExamples();
setupPractice();
setupMistakes();
setupExamQuestions();
