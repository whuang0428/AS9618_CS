const fileLines = ["Ali,72", "Bea,64", "Chen,85"];

const examples = {
  read: {
    title: "Example 1: Read every line",
    problem: "Output every line stored in Scores.txt.",
    rows: [
      ["Open", "OPENFILE \"Scores.txt\" FOR READ", "existing contents are needed"],
      ["Loop", "WHILE NOT EOF(\"Scores.txt\")", "unknown number of lines"],
      ["Read", "READFILE \"Scores.txt\", Line", "file data moves into a variable"],
      ["Close", "CLOSEFILE \"Scores.txt\"", "file is released"],
    ],
    code: "OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"",
    points: ["Use READ for existing data.", "EOF stops the loop after the final line.", "Read into a variable before processing."],
  },
  write: {
    title: "Example 2: Write a new report",
    problem: "Create a fresh report containing a pass count.",
    rows: [
      ["Open", "FOR WRITE", "new output file or replacement contents"],
      ["Write", "WRITEFILE", "stores one output line"],
      ["Close", "CLOSEFILE", "finalises the file"],
    ],
    code: "OPENFILE \"Report.txt\" FOR WRITE\nWRITEFILE \"Report.txt\", \"Pass count: \" & Count\nCLOSEFILE \"Report.txt\"",
    points: ["WRITE is appropriate for a fresh result file.", "Mention the value being written.", "Do not use READ when the algorithm writes output."],
  },
  append: {
    title: "Example 3: Append a new line",
    problem: "Add a new score to the end of Scores.txt without deleting old scores.",
    rows: [
      ["Open", "FOR APPEND", "keeps existing lines"],
      ["Write", "WRITEFILE", "adds the new line"],
      ["Close", "CLOSEFILE", "saves and releases the file"],
    ],
    code: "OPENFILE \"Scores.txt\" FOR APPEND\nWRITEFILE \"Scores.txt\", \"Dina,91\"\nCLOSEFILE \"Scores.txt\"",
    points: ["APPEND is the key mark when old contents must remain.", "The new data is written after existing lines.", "Using WRITE here risks overwriting."],
  },
  count: {
    title: "Example 4: Count records in a file",
    problem: "Count how many lines are in Scores.txt.",
    rows: [
      ["Initialise", "Count <- 0", "before reading starts"],
      ["Read each line", "READFILE ... Line", "one line per loop"],
      ["Increment", "Count <- Count + 1", "after a successful read"],
      ["Output", "OUTPUT Count", "after the loop"],
    ],
    code: "Count <- 0\nOPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    Count <- Count + 1\nENDWHILE\nCLOSEFILE \"Scores.txt\"\nOUTPUT Count",
    points: ["Initialise Count before the loop.", "Increment once per line read.", "Output after the file is closed or after the loop."],
  },
};

const practice = [
  { id: "p1", prompt: "Which mode opens an existing text file so its contents can be read?", accepted: ["read", "for read"], answer: "FOR READ." },
  { id: "p2", prompt: "Which mode adds new data to the end without removing existing lines?", accepted: ["append", "for append"], answer: "FOR APPEND." },
  { id: "p3", prompt: "Which command reads a line from a file into a variable in Cambridge-style pseudocode?", accepted: ["readfile"], answer: "READFILE." },
  { id: "p4", prompt: "Which condition is commonly used to keep reading until the end of a file?", accepted: ["not eof", "while not eof", "eof"], answer: "WHILE NOT EOF(filename)." },
  { id: "p5", prompt: "Which command should be used after file processing is complete?", accepted: ["closefile"], answer: "CLOSEFILE." },
  { id: "p6", prompt: "If old contents must remain, should the file be opened FOR WRITE or FOR APPEND?", accepted: ["for append", "append"], answer: "FOR APPEND." },
  { id: "p7", prompt: "In READFILE \"Scores.txt\", Line, what is Line?", accepted: ["variable", "a variable"], answer: "Line is a variable that receives data read from the file." },
  { id: "p8", prompt: "What can happen if FOR WRITE is used on an existing file?", accepted: ["overwrite", "overwritten", "replace", "replaced"], answer: "Existing contents may be overwritten/replaced." },
  { id: "p9", prompt: "Is Java try-with-resources the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style OPENFILE, READFILE, WRITEFILE and CLOSEFILE." },
  { id: "p10", prompt: "Give the three-step file lifecycle in words.", accepted: ["open process close", "open read close", "open write close"], answer: "Open, process, close." },
];

const mistakes = [
  {
    wrong: "I used OPENFILE \"Scores.txt\" FOR WRITE to add one new score while keeping old scores.",
    fix: "Use FOR APPEND. WRITE is for creating or replacing contents; APPEND adds to the end.",
  },
  {
    wrong: "I processed Line before using READFILE.",
    fix: "Read first: READFILE \"Scores.txt\", Line. The variable only has the next file line after reading.",
  },
  {
    wrong: "I wrote a fixed FOR loop for a file with an unknown number of lines.",
    fix: "Use WHILE NOT EOF(\"Scores.txt\") when the number of lines is not known.",
  },
  {
    wrong: "I opened a file and never closed it.",
    fix: "Add CLOSEFILE after reading or writing. Mark schemes commonly reward closing the file.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write pseudocode to open Scores.txt for reading, output every line in the file, and close the file.",
    answer: "OPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    OUTPUT Line\nENDWHILE\nCLOSEFILE \"Scores.txt\"",
    marking: [
      { mark: "B1", text: "opens Scores.txt using FOR READ" },
      { mark: "M1", text: "uses a loop controlled by NOT EOF" },
      { mark: "M1", text: "reads a line using READFILE into a variable" },
      { mark: "A1", text: "outputs the variable read from the file" },
      { mark: "B1", text: "closes the file using CLOSEFILE" },
      { mark: "A1", text: "orders operations correctly: open before read, close after loop" },
    ],
    strict: [
      "Do not award READFILE mark if no receiving variable is shown.",
      "Allow equivalent variable names such as ThisLine.",
      "Do not accept FOR WRITE for a read-only task.",
      "FT: output mark can follow from candidate's chosen line variable.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A new score line \"Dina,91\" must be added to Scores.txt without removing existing data. Write suitable pseudocode.",
    answer: "OPENFILE \"Scores.txt\" FOR APPEND\nWRITEFILE \"Scores.txt\", \"Dina,91\"\nCLOSEFILE \"Scores.txt\"",
    marking: [
      { mark: "B1", text: "opens Scores.txt using FOR APPEND" },
      { mark: "M1", text: "uses WRITEFILE to write the new line" },
      { mark: "A1", text: "writes the correct line Dina,91 or equivalent new score data" },
      { mark: "B1", text: "closes the file" },
      { mark: "A1", text: "does not use WRITE mode when existing data must remain" },
    ],
    strict: [
      "Do not award mode mark for FOR WRITE.",
      "Allow NewLine variable if it is clearly assigned the new score before writing.",
      "Do not accept READFILE for adding the new line.",
      "FT: close-file mark can follow a candidate's file name.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Write pseudocode to count how many lines are stored in Scores.txt and output the count.",
    answer: "Count <- 0\nOPENFILE \"Scores.txt\" FOR READ\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    Count <- Count + 1\nENDWHILE\nCLOSEFILE \"Scores.txt\"\nOUTPUT Count",
    marking: [
      { mark: "B1", text: "initialises Count to 0 before the loop" },
      { mark: "B1", text: "opens the file for READ" },
      { mark: "M1", text: "uses NOT EOF loop to process all lines" },
      { mark: "M1", text: "reads each line inside the loop" },
      { mark: "A1", text: "increments Count once for each line read" },
      { mark: "B1", text: "outputs Count after processing" },
    ],
    strict: [
      "Do not award initialisation mark if Count is reset inside the loop.",
      "Allow output before CLOSEFILE if file processing is otherwise complete.",
      "Do not accept counting characters unless the question is reinterpreted explicitly and correctly.",
      "FT: increment mark can follow a candidate's equivalent counter variable.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A student writes OUTPUT Line before READFILE has been used in the loop. Explain the error and correct the order of statements.",
    answer: "The error is that Line does not yet contain the next file line. The program must read from the file into Line before Line is processed. Correct order inside the loop:\nREADFILE \"Scores.txt\", Line\nOUTPUT Line",
    marking: [
      { mark: "B1", text: "states Line is a variable used to hold file data" },
      { mark: "M1", text: "explains Line must be assigned by READFILE before processing" },
      { mark: "A1", text: "identifies OUTPUT before READFILE as the wrong order" },
      { mark: "B1", text: "gives READFILE before OUTPUT" },
      { mark: "A1", text: "uses a suitable file name and line variable" },
      { mark: "B1", text: "keeps the correction inside the file-reading loop or clearly implies it" },
    ],
    strict: [
      "Do not award explanation marks for only saying 'syntax error'.",
      "Allow display/print instead of output if pseudocode meaning is clear.",
      "Do not accept reading after output as a correction.",
      "FT: variable-name marks can follow the candidate's original variable.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "A program must read every line from Scores.txt and write only lines containing PASS to PassList.txt. Write suitable pseudocode.",
    answer: "OPENFILE \"Scores.txt\" FOR READ\nOPENFILE \"PassList.txt\" FOR WRITE\nWHILE NOT EOF(\"Scores.txt\")\n    READFILE \"Scores.txt\", Line\n    IF Line CONTAINS \"PASS\" THEN\n        WRITEFILE \"PassList.txt\", Line\n    ENDIF\nENDWHILE\nCLOSEFILE \"Scores.txt\"\nCLOSEFILE \"PassList.txt\"",
    marking: [
      { mark: "B1", text: "opens input file Scores.txt for READ" },
      { mark: "B1", text: "opens output file PassList.txt for WRITE" },
      { mark: "M1", text: "uses NOT EOF loop on the input file" },
      { mark: "M1", text: "reads each input line into a variable" },
      { mark: "A1", text: "tests whether the line contains PASS or equivalent pass condition" },
      { mark: "A1", text: "writes only matching lines to the output file" },
      { mark: "B1", text: "closes both files" },
    ],
    strict: [
      "Do not award output-file mark if WRITEFILE writes back to the input file only.",
      "Allow a parsed field comparison if PASS is stored as a status field.",
      "Do not accept opening PassList.txt for READ when writing output.",
      "FT: condition and write marks can follow a candidate's equivalent status value.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9_ -]/g, "");
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
    variable: "More variables forget things at shutdown just as confidently as the old variables.",
    array: "An array is useful while the program runs, but it is still in memory unless saved.",
    file: "Correct. A text file stores data persistently so the next run can read it.",
    print: "Screenshots are not a data storage strategy that Paper 2 wants to see.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupModeLab() {
  const scenario = document.querySelector("#modeScenario");
  const choice = document.querySelector("#modeChoice");
  const result = document.querySelector("#modeResult");
  const correctModes = { read: "READ", write: "WRITE", append: "APPEND" };
  const explanations = {
    read: "READ is needed because the program uses existing file contents.",
    write: "WRITE is suitable because a fresh summary report is being created.",
    append: "APPEND is needed because old scores must remain and the new score goes at the end.",
  };
  document.querySelector("#modeBtn").addEventListener("click", () => {
    const expected = correctModes[scenario.value];
    const correct = choice.value === expected;
    result.innerHTML = `<p><strong>${correct ? "Correct" : "Not quite"}.</strong> ${escapeHtml(explanations[scenario.value])}</p>`;
  });
}

function setupReadTrace() {
  let index = 0;
  const output = document.querySelector("#readTrace");
  document.querySelector("#readStepBtn").addEventListener("click", () => {
    if (index >= fileLines.length) {
      output.innerHTML = `<p><strong>EOF reached.</strong> The next step is CLOSEFILE "Scores.txt".</p>`;
      return;
    }
    const line = fileLines[index];
    output.innerHTML = `<p>READFILE "Scores.txt", Line</p><p>Line now contains <strong>${escapeHtml(line)}</strong>.</p><p>Line ${index + 1} of ${fileLines.length} has been processed.</p>`;
    index += 1;
  });
  document.querySelector("#resetReadBtn").addEventListener("click", () => {
    index = 0;
    output.textContent = "File is open. No line has been read yet.";
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      ${tableMarkup(["Step", "Pseudocode", "Reason"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("read");
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map((item, index) => `
      <article class="practice-card">
        <label for="${item.id}"><strong>${index + 1}. ${escapeHtml(item.prompt)}</strong></label>
        <div class="answer-row">
          <input id="${item.id}" type="text" autocomplete="off" />
          <button type="button" class="check-btn" data-practice="${item.id}">Check</button>
        </div>
        <p class="mark" id="${item.id}-mark" aria-live="polite"></p>
        <button type="button" class="answer-toggle" data-answer="${item.id}">Show answer</button>
        <div class="answer-panel" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.practice);
      const input = document.querySelector(`#${item.id}`);
      const mark = document.querySelector(`#${item.id}-mark`);
      const response = normalise(input.value);
      const correct = item.accepted.some((answer) => response === normalise(answer) || response.includes(normalise(answer)));
      mark.textContent = correct ? "Correct. The file-operation wording is precise." : "Not quite. Check the mode, command name, or file lifecycle step.";
      mark.className = `mark ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes
    .map((item, index) => `
      <article>
        <h3>Mistake ${index + 1}</h3>
        <p>${escapeHtml(item.wrong)}</p>
        <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
        <div class="answer-panel" id="fix-${index}">${escapeHtml(item.fix)}</div>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions
    .map((question, index) => `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${escapeHtml(question.title)}</h3>
          <span>${escapeHtml(question.marks)}</span>
        </div>
        <p>${escapeHtml(question.prompt)}</p>
        <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
        <div class="ms-panel" id="ms-${index}">
          <p><strong>Answer:</strong></p>
          <pre><code>${escapeHtml(question.answer)}</code></pre>
          <p><strong>Marking guidance:</strong></p>
          <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
          <p><strong>Strict notes:</strong></p>
          <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
        </div>
      </article>
    `)
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupModeLab();
setupReadTrace();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
