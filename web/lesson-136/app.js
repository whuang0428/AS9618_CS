const scenarios = [
  {
    id: "display",
    text: "Display every line already stored in Scores.txt.",
    recommendation: "FOR READ",
    reason: "The program needs existing records, so it should open the file for reading.",
  },
  {
    id: "new",
    text: "Create a new Report.txt with a fresh heading and two rows.",
    recommendation: "FOR WRITE",
    reason: "The program is writing new contents. Existing contents are not intended to be preserved.",
  },
  {
    id: "add",
    text: "Add one new score to the end of an existing Scores.txt file.",
    recommendation: "FOR APPEND",
    reason: "APPEND preserves previous records and adds the new record at the end.",
  },
  {
    id: "count",
    text: "Count how many records are in Orders.txt.",
    recommendation: "FOR READ with WHILE NOT EOF",
    reason: "The file must be read line by line until the end of file is reached.",
  },
];

const examples = {
  read: {
    title: "Example 1: Read and output every line",
    problem: "Open Scores.txt, read each line, output it, then close the file.",
    rows: [
      ["Open", "OPENFILE \"Scores.txt\" FOR READ", "prepare existing file for reading"],
      ["Loop", "WHILE NOT EOF(\"Scores.txt\")", "continue while records remain"],
      ["Read", "READFILE \"Scores.txt\", Line", "store the current line in Line"],
      ["Close", "CLOSEFILE \"Scores.txt\"", "finish the file operation"],
    ],
    code: "OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"",
    points: [
      "Use FOR READ for existing data.",
      "Use EOF to stop at the end of the file.",
      "Close the file after the loop.",
    ],
  },
  count: {
    title: "Example 2: Count records",
    problem: "Orders.txt has three lines. Trace the final value of Count.",
    rows: [
      ["Start", "Count = 0", "before reading"],
      ["Line 1", "Count = 1", "one record read"],
      ["Line 2", "Count = 2", "second record read"],
      ["Line 3", "Count = 3", "third record read"],
      ["EOF", "loop stops", "final Count is 3"],
    ],
    code: "Count <- 0\nOPENFILE \"Orders.txt\" FOR READ\nWHILE NOT EOF(\"Orders.txt\")\n    READFILE \"Orders.txt\", OrderLine\n    Count <- Count + 1\nENDWHILE\nCLOSEFILE \"Orders.txt\"\nOUTPUT Count",
    points: [
      "Increment Count after each successful READFILE.",
      "The loop runs once per line.",
      "Do not read after EOF is reached.",
    ],
  },
  write: {
    title: "Example 3: Write new file contents",
    problem: "Create a new report file with a heading and one row.",
    rows: [
      ["Open", "FOR WRITE", "new or replacement contents"],
      ["Write 1", "\"Name,Mark\"", "heading row"],
      ["Write 2", "\"Ada,72\"", "record row"],
      ["Close", "CLOSEFILE", "complete the operation"],
    ],
    code: "OPENFILE \"Report.txt\" FOR WRITE\nWRITEFILE \"Report.txt\", \"Name,Mark\"\nWRITEFILE \"Report.txt\", \"Ada,72\"\nCLOSEFILE \"Report.txt\"",
    points: [
      "WRITE is suitable when existing content does not need to be kept.",
      "Each WRITEFILE writes data to the file.",
      "Clear record formatting matters.",
    ],
  },
  append: {
    title: "Example 4: Append a new record",
    problem: "Add Lin,85 to an existing score file without deleting old records.",
    rows: [
      ["Open", "FOR APPEND", "preserve existing records"],
      ["Write", "\"Lin,85\"", "new record added at end"],
      ["Close", "CLOSEFILE", "finish safely"],
    ],
    code: "OPENFILE \"Scores.txt\" FOR APPEND\nWRITEFILE \"Scores.txt\", \"Lin,85\"\nCLOSEFILE \"Scores.txt\"",
    points: [
      "APPEND is the key mode when old data must remain.",
      "WRITEFILE is still used to add the new record.",
      "The new line goes after existing records.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which command opens Scores.txt for reading?", accepted: ["openfile"], answer: "OPENFILE \"Scores.txt\" FOR READ." },
  { id: "p2", prompt: "Which mode is used to read existing file contents: READ, WRITE or APPEND?", accepted: ["read"], answer: "READ." },
  { id: "p3", prompt: "Which mode adds new data to the end without deleting old records?", accepted: ["append"], answer: "APPEND." },
  { id: "p4", prompt: "Which mode may overwrite existing file contents?", accepted: ["write"], answer: "WRITE." },
  { id: "p5", prompt: "Which command reads one line/record from an open file?", accepted: ["readfile"], answer: "READFILE." },
  { id: "p6", prompt: "Which command writes one line/record to an open file?", accepted: ["writefile"], answer: "WRITEFILE." },
  { id: "p7", prompt: "Which function/test is used to stop reading at the end of a file?", accepted: ["eof"], answer: "EOF." },
  { id: "p8", prompt: "Which command should finish a file handling sequence?", accepted: ["closefile"], answer: "CLOSEFILE." },
  { id: "p9", prompt: "Orders.txt has 3 lines. Count starts at 0 and increments after each READFILE. Final Count?", accepted: ["3"], answer: "3." },
  { id: "p10", prompt: "Java Scanner syntax should replace Cambridge pseudocode in Paper 2. true or false?", accepted: ["false"], answer: "False." },
];

const mistakes = [
  {
    wrong: "A student opens Scores.txt FOR WRITE to add one new score to the existing file.",
    fix: "Use FOR APPEND if existing scores must remain. FOR WRITE may overwrite the file contents.",
  },
  {
    wrong: "A student writes a READFILE loop without checking EOF.",
    fix: "Use WHILE NOT EOF(\"FileName\") before READFILE when reading all records.",
  },
  {
    wrong: "A student forgets CLOSEFILE after reading and writing.",
    fix: "Add CLOSEFILE \"FileName\" after the loop or after the write sequence to complete the file operation.",
  },
  {
    wrong: "A student writes Java try-with-resources code as the Cambridge pseudocode answer.",
    fix: "Use OPENFILE, READFILE or WRITEFILE, EOF and CLOSEFILE in Cambridge-style pseudocode. Java is support only.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to open Scores.txt, read every line and output each line.",
    answer: "OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"",
    marking: [
      { mark: "B1", text: "opens Scores.txt using OPENFILE" },
      { mark: "A1", text: "uses FOR READ mode" },
      { mark: "M1", text: "uses WHILE NOT EOF or equivalent end-of-file loop" },
      { mark: "M1", text: "uses READFILE to read a line/record into a variable" },
      { mark: "B1", text: "outputs the line/record read" },
      { mark: "A1", text: "closes the file with CLOSEFILE after reading" },
    ],
    strict: [
      "Do not award READ mode mark for WRITE or APPEND.",
      "Allow equivalent file and variable names if consistent.",
      "Do not accept Java Scanner code alone as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Write pseudocode to count the number of records in Orders.txt and output the count.",
    answer: "Count <- 0\nOPENFILE \"Orders.txt\" FOR READ\nWHILE NOT EOF(\"Orders.txt\")\n    READFILE \"Orders.txt\", OrderLine\n    Count <- Count + 1\nENDWHILE\nCLOSEFILE \"Orders.txt\"\nOUTPUT Count",
    marking: [
      { mark: "B1", text: "initialises Count to 0" },
      { mark: "B1", text: "opens Orders.txt FOR READ" },
      { mark: "M1", text: "uses WHILE NOT EOF or equivalent file-reading loop" },
      { mark: "M1", text: "reads each record/line with READFILE" },
      { mark: "A1", text: "increments Count once per record read" },
      { mark: "B1", text: "closes the file after the loop" },
      { mark: "A1", text: "outputs Count" },
    ],
    strict: [
      "Do not award increment mark if Count is incremented outside the loop only once.",
      "Allow REPEAT/UNTIL only if the EOF logic is safe and clear.",
      "Do not accept counting characters as records unless the question states character records.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A program must add the record \"Lin,85\" to the end of Scores.txt without deleting existing scores. Write the pseudocode.",
    answer: "OPENFILE \"Scores.txt\" FOR APPEND\nWRITEFILE \"Scores.txt\", \"Lin,85\"\nCLOSEFILE \"Scores.txt\"",
    marking: [
      { mark: "B1", text: "opens Scores.txt using OPENFILE" },
      { mark: "A1", text: "uses FOR APPEND mode" },
      { mark: "M1", text: "uses WRITEFILE to write a record" },
      { mark: "A1", text: "writes Lin,85 or equivalent required record" },
      { mark: "B1", text: "closes the file with CLOSEFILE" },
    ],
    strict: [
      "Do not award APPEND mark for FOR WRITE.",
      "Allow variable-based record construction if it clearly writes Lin and 85.",
      "Do not require EOF for a single append operation.",
      "Allow an equivalent file if it is used consistently.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Explain the difference between opening a file FOR WRITE and opening it FOR APPEND. Give one suitable use of each.",
    answer: "FOR WRITE is used when writing new file contents and may replace existing contents, for example creating a new report file. FOR APPEND is used to add new data to the end of an existing file while keeping old records, for example adding a new score to Scores.txt.",
    marking: [
      { mark: "B1", text: "states FOR WRITE is used to write new/replacement contents" },
      { mark: "M1", text: "explains WRITE may overwrite or not preserve existing contents" },
      { mark: "A1", text: "gives suitable WRITE example" },
      { mark: "B1", text: "states FOR APPEND adds data to the end of a file" },
      { mark: "M1", text: "explains APPEND preserves existing contents" },
      { mark: "A1", text: "gives suitable APPEND example" },
    ],
    strict: [
      "Do not award full marks for saying only 'both write'.",
      "Allow 'adds to existing file' for append if preservation is clear.",
      "Do not accept READ as either write-mode example.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A candidate writes Java Scanner code for a file-reading question that asks for pseudocode. Explain the problem and name the Cambridge-style commands that should be used.",
    answer: "The problem is that Java Scanner syntax is language-specific and is not Cambridge-style pseudocode. The answer should use OPENFILE for READ, WHILE NOT EOF, READFILE to read each line/record, and CLOSEFILE when finished.",
    marking: [
      { mark: "B1", text: "identifies Scanner as Java/language-specific syntax" },
      { mark: "B1", text: "names OPENFILE with FOR READ" },
      { mark: "B1", text: "names EOF / WHILE NOT EOF for loop control" },
      { mark: "B1", text: "names READFILE for reading records" },
      { mark: "B1", text: "names CLOSEFILE for finishing the file operation" },
    ],
    strict: [
      "Do not award command marks for Java hasNextLine or nextLine alone.",
      "Allow equivalent explanation of language-specific syntax.",
      "Do not require WRITEFILE because this is a file-reading scenario.",
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
    read: "READ is for existing data. It will not add a new line.",
    write: "WRITE may replace file contents. That is risky when old scores must remain.",
    append: "Correct. APPEND adds the new score to the end while keeping old records.",
    close: "CLOSEFILE finishes a file operation. It does not choose how new data is added.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function cleanFileName(name) {
  const trimmed = name.trim();
  return trimmed.length > 0 ? trimmed : "Data.txt";
}

function setupBuilder() {
  const result = document.querySelector("#builderResult");
  document.querySelector("#buildBtn").addEventListener("click", () => {
    const file = cleanFileName(document.querySelector("#fileInput").value);
    const task = document.querySelector("#taskInput").value;
    const patterns = {
      read: `OPENFILE "${file}" FOR READ\nWHILE NOT EOF("${file}")\n    READFILE "${file}", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE "${file}"`,
      count: `Count <- 0\nOPENFILE "${file}" FOR READ\nWHILE NOT EOF("${file}")\n    READFILE "${file}", Line\n    Count <- Count + 1\nENDWHILE\nCLOSEFILE "${file}"\nOUTPUT Count`,
      write: `OPENFILE "${file}" FOR WRITE\nWRITEFILE "${file}", "Heading"\nWRITEFILE "${file}", "First record"\nCLOSEFILE "${file}"`,
      append: `OPENFILE "${file}" FOR APPEND\nWRITEFILE "${file}", "New record"\nCLOSEFILE "${file}"`,
    };
    result.innerHTML = `<pre><code>${escapeHtml(patterns[task])}</code></pre>`;
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
        ${tableMarkup(["Step", "Command / value", "Purpose"], example.rows)}
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
      feedback.textContent = correct ? "Correct." : "Not quite. Use Show answer and compare the exact file command or mode.";
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
setupBuilder();
setupScenarioChooser();
setupExamples();
setupPractice();
setupMistakes();
setupExamQuestions();
