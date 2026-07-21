const samples = {
  good: "S001,Ali,72",
  missing: "S002,Bea",
  textmark: "S003,Chen,Ninety",
  wrongdelimiter: "S004;Dina;88",
};

const examples = {
  parse: {
    title: "Example 1: Parse one CSV-style line",
    problem: "Extract StudentID, Name and Mark from S001,Ali,72.",
    rows: [
      ["Read", "READFILE \"Scores.csv\", Line", "line enters a variable"],
      ["Split", "Fields <- SPLIT(Line, \",\")", "comma separates fields"],
      ["Assign", "StudentID <- Fields[1]", "position 1 is ID"],
      ["Convert", "Mark <- STRING_TO_INTEGER(Fields[3])", "mark becomes numeric"],
    ],
    code: "READFILE \"Scores.csv\", Line\nFields <- SPLIT(Line, \",\")\nStudentID <- Fields[1]\nName <- Fields[2]\nMark <- STRING_TO_INTEGER(Fields[3])",
    points: ["Read before parsing.", "Use the agreed delimiter.", "Convert numeric text before numeric comparisons."],
  },
  validate: {
    title: "Example 2: Validate before using fields",
    problem: "Reject a line if it does not contain exactly three fields.",
    rows: [
      ["Split", "Fields <- SPLIT(Line, \",\")", "creates field list"],
      ["Check count", "LENGTH(Fields) = 3", "prevents missing-field access"],
      ["Check mark", "IS_NUMERIC(Fields[3])", "prevents failed conversion"],
    ],
    code: "Fields <- SPLIT(Line, \",\")\nIF LENGTH(Fields) = 3 AND IS_NUMERIC(Fields[3]) THEN\n    Mark <- STRING_TO_INTEGER(Fields[3])\nELSE\n    OUTPUT \"Invalid line\"\nENDIF",
    points: ["Malformed lines still exist in structured files.", "Check field count before using Fields[3].", "Check numeric text before conversion."],
  },
  count: {
    title: "Example 3: Count marks over 70",
    problem: "Read Scores.csv and count students with Mark greater than 70.",
    rows: [
      ["Open", "FOR READ", "existing file"],
      ["Loop", "WHILE NOT EOF", "all lines"],
      ["Parse", "SPLIT(Line, \",\")", "get fields"],
      ["Count", "IF Mark > 70", "numeric comparison"],
    ],
    code: "Count <- 0\nOPENFILE \"Scores.csv\" FOR READ\nWHILE NOT EOF(\"Scores.csv\")\n    READFILE \"Scores.csv\", Line\n    Fields <- SPLIT(Line, \",\")\n    Mark <- STRING_TO_INTEGER(Fields[3])\n    IF Mark > 70 THEN\n        Count <- Count + 1\n    ENDIF\nENDWHILE\nCLOSEFILE \"Scores.csv\"\nOUTPUT Count",
    points: ["The file loop is from Lesson 120.", "CSV parsing happens inside the loop.", "The mark must be converted before comparison."],
  },
  write: {
    title: "Example 4: Write a CSV-style line",
    problem: "Write one new student record in the agreed field order.",
    rows: [
      ["Format", "StudentID,Name,Mark", "fixed order"],
      ["Build line", "StudentID & \",\" & Name & \",\" & Mark", "delimiter between fields"],
      ["Write", "WRITEFILE", "store the structured line"],
    ],
    code: "Line <- StudentID & \",\" & Name & \",\" & Mark\nOPENFILE \"Scores.csv\" FOR APPEND\nWRITEFILE \"Scores.csv\", Line\nCLOSEFILE \"Scores.csv\"",
    points: ["Use the same delimiter when writing.", "Preserve the field order.", "APPEND is suitable for adding a new record."],
  },
};

const practice = [
  { id: "p1", prompt: "In S001,Ali,72, what is the delimiter?", accepted: ["comma", ","], answer: "Comma (,)." },
  { id: "p2", prompt: "In the format StudentID,Name,Mark, which field position is Name?", accepted: ["2", "second", "field 2"], answer: "Field 2." },
  { id: "p3", prompt: "What command-like operation can separate Line into fields using a comma?", accepted: ["split", "split line", "split(line, comma)"], answer: "SPLIT(Line, \",\")." },
  { id: "p4", prompt: "Before using Fields[3], what should be checked?", accepted: ["field count", "length", "length(fields)", "3 fields"], answer: "Check that the line has exactly three fields." },
  { id: "p5", prompt: "If Mark is read from a text file, is it text first? yes or no.", accepted: ["yes"], answer: "Yes. Convert it before numeric comparison." },
  { id: "p6", prompt: "Which conversion is needed before comparing Fields[3] > 70?", accepted: ["string to integer", "string_to_integer", "integer"], answer: "STRING_TO_INTEGER(Fields[3])." },
  { id: "p7", prompt: "Is S002,Bea valid for expected fields StudentID,Name,Mark? yes or no.", accepted: ["no"], answer: "No. It is missing the Mark field." },
  { id: "p8", prompt: "What does one line usually represent in a CSV-style file?", accepted: ["record", "one record"], answer: "One record." },
  { id: "p9", prompt: "Is Java's fields[2] the same index style as Cambridge Fields[3] in this page? yes or no.", accepted: ["no"], answer: "No. Java is zero-based; the Cambridge-style examples here use 1-based field positions." },
  { id: "p10", prompt: "When writing CSV, what must be kept consistent between fields?", accepted: ["delimiter", "comma", "field order"], answer: "The delimiter and field order must be consistent." },
];

const mistakes = [
  {
    wrong: "I compared Fields[3] > 70 immediately after splitting the line.",
    fix: "Convert first: Mark <- STRING_TO_INTEGER(Fields[3]); then compare Mark > 70.",
  },
  {
    wrong: "I used Fields[3] even when the line was S002,Bea.",
    fix: "Check LENGTH(Fields) = 3 before accessing Fields[3].",
  },
  {
    wrong: "I wrote new records as Name,Mark,StudentID even though the format says StudentID,Name,Mark.",
    fix: "Preserve the agreed field order. A structured file is only useful if every line follows the same structure.",
  },
  {
    wrong: "I used Java split syntax as the full Paper 2 answer.",
    fix: "Java can support understanding, but Paper 2 answers should use clear Cambridge-style pseudocode such as SPLIT(Line, \",\").",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A file Scores.csv stores lines in the format StudentID,Name,Mark. Write pseudocode to read one line and assign the three fields to StudentID, Name and Mark. Mark must be stored as an integer.",
    answer: "READFILE \"Scores.csv\", Line\nFields <- SPLIT(Line, \",\")\nStudentID <- Fields[1]\nName <- Fields[2]\nMark <- STRING_TO_INTEGER(Fields[3])",
    marking: [
      { mark: "B1", text: "reads a line from Scores.csv into a variable" },
      { mark: "M1", text: "splits the line using comma delimiter" },
      { mark: "A1", text: "assigns StudentID from field 1" },
      { mark: "A1", text: "assigns Name from field 2" },
      { mark: "M1", text: "uses field 3 for Mark" },
      { mark: "A1", text: "converts Mark to INTEGER or equivalent numeric type" },
    ],
    strict: [
      "Do not award conversion mark if Mark remains only as text.",
      "Allow equivalent clear parse operation instead of SPLIT.",
      "Do not accept parsing before READFILE unless Line is already stated as read.",
      "FT: field-position marks can follow candidate's named field array.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write pseudocode to read all lines from Scores.csv and output the Name field for every student with Mark greater than 70.",
    answer: "OPENFILE \"Scores.csv\" FOR READ\nWHILE NOT EOF(\"Scores.csv\")\n    READFILE \"Scores.csv\", Line\n    Fields <- SPLIT(Line, \",\")\n    Name <- Fields[2]\n    Mark <- STRING_TO_INTEGER(Fields[3])\n    IF Mark > 70 THEN\n        OUTPUT Name\n    ENDIF\nENDWHILE\nCLOSEFILE \"Scores.csv\"",
    marking: [
      { mark: "B1", text: "opens Scores.csv for READ" },
      { mark: "M1", text: "uses NOT EOF loop" },
      { mark: "M1", text: "reads each line inside the loop" },
      { mark: "M1", text: "splits line into fields using comma delimiter" },
      { mark: "A1", text: "converts Mark from field 3 before numeric comparison" },
      { mark: "A1", text: "outputs Name from field 2 only when Mark > 70" },
    ],
    strict: [
      "Do not award comparison mark for text comparison of Fields[3] unless conversion is clear.",
      "Allow >= 71 for integer marks as equivalent to > 70.",
      "Do not accept outputting the whole line when Name is specifically required.",
      "FT: name-output mark can follow candidate's equivalent field positions.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain why the line S002,Bea is malformed for the expected format StudentID,Name,Mark, and describe one suitable action.",
    answer: "The line is malformed because it has only two fields after splitting by comma: StudentID and Name. The expected format requires three fields, with Mark in field 3. The program should reject the line, output an error message, or skip it rather than trying to access Fields[3].",
    marking: [
      { mark: "B1", text: "states the expected format has three fields" },
      { mark: "M1", text: "identifies S002,Bea has only two fields" },
      { mark: "A1", text: "states Mark / field 3 is missing" },
      { mark: "M1", text: "explains accessing Fields[3] would be invalid or unsafe" },
      { mark: "A1", text: "gives suitable action such as reject, skip, or report error" },
    ],
    strict: [
      "Do not award full credit for only saying 'it is wrong'.",
      "Allow 'invalid line' for malformed if field-count reason is clear.",
      "Do not accept filling Mark with a guessed value as a suitable action.",
      "FT: action mark can follow candidate's equivalent validation check.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A student writes Mark <- Fields[3] then IF Mark > 70. Explain the weakness and correct it.",
    answer: "Fields[3] is text because it has been read from a text file. A numeric comparison should use an integer value. Corrected pseudocode:\nMark <- STRING_TO_INTEGER(Fields[3])\nIF Mark > 70 THEN\n    OUTPUT Name\nENDIF",
    marking: [
      { mark: "B1", text: "states fields read from CSV/text file are text initially" },
      { mark: "M1", text: "explains Mark should be converted before numeric comparison" },
      { mark: "A1", text: "uses a suitable string-to-integer conversion" },
      { mark: "B1", text: "uses converted Mark in comparison with 70" },
      { mark: "A1", text: "keeps the output dependent on the condition" },
      { mark: "B1", text: "uses clear Cambridge-style pseudocode" },
    ],
    strict: [
      "Do not award conversion mark for simply renaming Fields[3] as Mark.",
      "Allow INTEGER(Fields[3]) or equivalent conversion notation.",
      "Do not accept Java parseInt alone as a Cambridge pseudocode answer.",
      "FT: comparison mark can follow candidate's converted numeric variable.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "Write pseudocode to append a new record to Scores.csv. The variables StudentID, Name and Mark already contain valid values. The file format is StudentID,Name,Mark.",
    answer: "Line <- StudentID & \",\" & Name & \",\" & Mark\nOPENFILE \"Scores.csv\" FOR APPEND\nWRITEFILE \"Scores.csv\", Line\nCLOSEFILE \"Scores.csv\"",
    marking: [
      { mark: "M1", text: "builds a line using StudentID, Name and Mark" },
      { mark: "A1", text: "uses comma delimiter between fields" },
      { mark: "A1", text: "uses correct field order StudentID,Name,Mark" },
      { mark: "B1", text: "opens Scores.csv FOR APPEND" },
      { mark: "M1", text: "writes the constructed line using WRITEFILE" },
      { mark: "B1", text: "closes the file" },
      { mark: "A1", text: "does not use WRITE mode when adding to existing file" },
    ],
    strict: [
      "Do not award field-order mark if values are written as Name,Mark,StudentID.",
      "Allow writing expression directly in WRITEFILE if delimiters and order are clear.",
      "Do not accept FOR READ for appending a new record.",
      "FT: write mark can follow candidate's constructed line variable.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9_, -]/g, "");
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
    sentence: "A human understands it; a program must work much harder to find each field.",
    csv: "Correct. The comma clearly separates StudentID, Name and Mark.",
    random: "The order is unclear. Computers prefer less interpretive theatre.",
    onefield: "This has no visible field boundaries, so parsing becomes unreliable.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupParser() {
  const input = document.querySelector("#csvInput");
  const delimiter = document.querySelector("#delimiterInput");
  const result = document.querySelector("#parseResult");
  document.querySelector("#parseBtn").addEventListener("click", () => {
    const fields = input.value.split(delimiter.value);
    result.innerHTML = `
      <p><strong>${fields.length} field(s)</strong> found using delimiter <code>${escapeHtml(delimiter.value)}</code>.</p>
      ${tableMarkup(["Position", "Field value"], fields.map((field, index) => [String(index + 1), field.trim()]))}
    `;
  });
}

function validateLine(line) {
  const fields = line.split(",");
  if (fields.length !== 3) {
    return { ok: false, message: `${line} has ${fields.length} field(s), expected 3.` };
  }
  const mark = Number(fields[2]);
  if (!Number.isInteger(mark)) {
    return { ok: false, message: `${fields[2]} is not an integer mark.` };
  }
  return { ok: true, message: `${line} is valid: ID=${fields[0]}, Name=${fields[1]}, Mark=${mark}.` };
}

function setupValidator() {
  const output = document.querySelector("#validationResult");
  document.querySelectorAll("[data-sample]").forEach((button) => {
    button.addEventListener("click", () => {
      const line = samples[button.dataset.sample];
      const result = validateLine(line);
      output.innerHTML = `<p><code>${escapeHtml(line)}</code></p><p><strong>${result.ok ? "Valid" : "Invalid"}.</strong> ${escapeHtml(result.message)}</p>`;
    });
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
  renderExample("parse");
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
      mark.textContent = correct ? "Correct. The CSV structure is being treated precisely." : "Not quite. Check delimiter, field position, validation or conversion.";
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
setupParser();
setupValidator();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
