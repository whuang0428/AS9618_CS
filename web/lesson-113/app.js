const typeMap = {
  score: {
    type: "INTEGER",
    reason: "A score out of 75 is a whole number and arithmetic such as total or comparison may be performed.",
    declaration: "DECLARE Score : INTEGER",
  },
  average: {
    type: "REAL",
    reason: "18.7 contains a fractional part, so an integer would lose precision.",
    declaration: "DECLARE AverageTemperature : REAL",
  },
  paid: {
    type: "BOOLEAN",
    reason: "The value has two states: paid or not paid.",
    declaration: "DECLARE HasPaid : BOOLEAN",
  },
  grade: {
    type: "CHAR",
    reason: "A single grade such as A is one character.",
    declaration: "DECLARE Grade : CHAR",
  },
  phone: {
    type: "STRING",
    reason: "A phone number may contain leading zeroes and spacing, and arithmetic is not performed on it.",
    declaration: "DECLARE PhoneNumber : STRING",
  },
  booking: {
    type: "DATE",
    reason: "A booking date should be stored as a calendar date so date comparison and validation are meaningful.",
    declaration: "DECLARE BookingDate : DATE",
  },
};

const builderMap = {
  count: {
    declaration: "DECLARE ValidCount : INTEGER",
    reason: "A count is a whole number and is normally incremented.",
  },
  mass: {
    declaration: "DECLARE MassKg : REAL",
    reason: "Measured mass may contain decimals.",
  },
  valid: {
    declaration: "DECLARE PasswordIsValid : BOOLEAN",
    reason: "The value is either TRUE or FALSE.",
  },
  initial: {
    declaration: "DECLARE Initial : CHAR",
    reason: "Only one character is stored.",
  },
  postcode: {
    declaration: "DECLARE Postcode : STRING",
    reason: "A postcode is text and may contain letters, spaces and digits.",
  },
  birth: {
    declaration: "DECLARE DateOfBirth : DATE",
    reason: "The value is a calendar date.",
  },
};

const examples = {
  school: {
    title: "Example 1: School data fields",
    problem: "Choose data types for a school registration form.",
    rows: [
      ["StudentName", "STRING", "stores a sequence of characters"],
      ["DateOfBirth", "DATE", "stores a calendar date"],
      ["AttendanceCount", "INTEGER", "whole-number count"],
      ["AverageMark", "REAL", "may include decimal places"],
      ["IsEnrolled", "BOOLEAN", "true/false state"],
    ],
    code: "DECLARE StudentName : STRING\nDECLARE DateOfBirth : DATE\nDECLARE AttendanceCount : INTEGER\nDECLARE AverageMark : REAL\nDECLARE IsEnrolled : BOOLEAN",
    points: ["The type matches how each value is used.", "A reason is linked to the field, not copied from a generic definition.", "Date is not treated as ordinary text."],
  },
  id: {
    title: "Example 2: ID and phone fields",
    problem: "A student ID is 003572 and a phone number starts with 07.",
    rows: [
      ["StudentID", "STRING", "leading zeroes must be preserved"],
      ["PhoneNumber", "STRING", "not used in arithmetic"],
      ["Wrong answer", "INTEGER", "would remove leading zeroes or imply arithmetic"],
    ],
    code: "DECLARE StudentID : STRING\nDECLARE PhoneNumber : STRING",
    points: ["Digits do not automatically mean INTEGER.", "Ask whether arithmetic is needed.", "Preserving the exact characters matters."],
  },
  enum: {
    title: "Example 3: User-defined membership type",
    problem: "A membership level must be Basic, Standard or Premium.",
    rows: [
      ["Built-in option", "STRING", "possible but allows invalid text such as 'Goldish'"],
      ["User-defined option", "TMembership", "restricts values to named allowed levels"],
      ["Reason", "clarity", "the named type documents the permitted states"],
    ],
    code: "TYPE TMembership = (Basic, Standard, Premium)\n\nDECLARE Level : TMembership",
    points: ["An enumerated type gives a named set of allowed values.", "The variable declaration uses the new type name.", "Do not confuse this with an array."],
  },
  declaration: {
    title: "Example 4: Declaration syntax",
    problem: "Write Cambridge-style declarations for common variables.",
    rows: [
      ["Count", "INTEGER", "DECLARE Count : INTEGER"],
      ["Temperature", "REAL", "DECLARE Temperature : REAL"],
      ["Found", "BOOLEAN", "DECLARE Found : BOOLEAN"],
      ["Initial", "CHAR", "DECLARE Initial : CHAR"],
    ],
    code: "DECLARE Count : INTEGER\nDECLARE Temperature : REAL\nDECLARE Found : BOOLEAN\nDECLARE Initial : CHAR",
    points: ["Use DECLARE, identifier, colon, type.", "Type names should be clear and consistent.", "Java declarations are not the Paper 2 format."],
  },
};

const practice = [
  { id: "p1", prompt: "Best type for a whole-number count?", accepted: ["integer", "int"], answer: "INTEGER" },
  { id: "p2", prompt: "Best type for an average that may be 72.5?", accepted: ["real", "float", "double"], answer: "REAL" },
  { id: "p3", prompt: "Best type for Found when it is TRUE or FALSE?", accepted: ["boolean", "bool"], answer: "BOOLEAN" },
  { id: "p4", prompt: "Best type for a single menu choice such as Y?", accepted: ["char", "character"], answer: "CHAR" },
  { id: "p5", prompt: "Best type for a surname?", accepted: ["string"], answer: "STRING" },
  { id: "p6", prompt: "Best type for a date of birth?", accepted: ["date"], answer: "DATE" },
  { id: "p7", prompt: "Should phone number 07123456789 usually be INTEGER or STRING?", accepted: ["string"], answer: "STRING, because the leading zero must be preserved and arithmetic is not needed." },
  { id: "p8", prompt: "Write the Cambridge keyword used to declare a variable.", accepted: ["declare"], answer: "DECLARE" },
  { id: "p9", prompt: "A type with named values such as Red, Amber, Green is called user-defined or built-in?", accepted: ["user-defined", "user defined", "userdefined"], answer: "User-defined, often as an enumerated type." },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 declaration format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode declarations." },
];

const mistakes = [
  {
    wrong: "I chose INTEGER for every field that contains digits.",
    fix: "Check whether arithmetic is needed. IDs, phone numbers and postcodes are usually STRING because exact characters and leading zeroes matter.",
  },
  {
    wrong: "I used REAL for a counter because it is a number.",
    fix: "Use INTEGER for counts and indexes because they are whole numbers. REAL is for values that may contain fractional parts.",
  },
  {
    wrong: "I used STRING for a true/false field.",
    fix: "Use BOOLEAN when there are exactly two logical states such as TRUE/FALSE, valid/invalid or found/not found.",
  },
  {
    wrong: "I wrote Java declarations in a Cambridge pseudocode answer.",
    fix: "Use Cambridge-style declarations such as DECLARE Count : INTEGER. Java can support testing but is not the exam pseudocode format.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Choose suitable data types for Score, AverageScore and Passed. Give a reason for each choice.",
    answer: "Score: INTEGER because it is a whole-number mark. AverageScore: REAL because an average may contain a decimal part. Passed: BOOLEAN because it has two states, TRUE or FALSE.",
    marking: [
      { mark: "B1", text: "chooses INTEGER for Score" },
      { mark: "B1", text: "reason states Score is whole number / used as whole-number mark" },
      { mark: "B1", text: "chooses REAL for AverageScore" },
      { mark: "B1", text: "reason states average may include decimal/fractional part" },
      { mark: "B1", text: "chooses BOOLEAN for Passed" },
      { mark: "B1", text: "reason states only two states such as TRUE/FALSE or pass/fail" },
    ],
    strict: [
      "Award reason marks only when linked to the named field.",
      "Allow integer if a specific exam system states marks are whole numbers.",
      "Do not accept 'number' as a reason for REAL without decimal/fractional idea.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A product code is 0045A. Explain why STRING is more suitable than INTEGER.",
    answer: "STRING is more suitable because the product code contains a letter and leading zeroes. It is an identifier rather than a value used for arithmetic, so storing it as INTEGER would lose the leading zeroes and could not store A.",
    marking: [
      { mark: "B1", text: "states STRING is suitable" },
      { mark: "B1", text: "identifies product code contains a letter" },
      { mark: "B1", text: "identifies leading zeroes must be preserved" },
      { mark: "B1", text: "states arithmetic is not required / it is an identifier" },
      { mark: "B1", text: "explains INTEGER would be unsuitable due to losing zeroes or not storing A" },
    ],
    strict: [
      "Do not award full credit for only saying 'it has digits and letters'.",
      "Allow 'alphanumeric' for contains letters and digits.",
      "Do not accept INTEGER for this field.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Write Cambridge-style declarations for variables storing a customer name, balance, active account flag and date joined.",
    answer: "DECLARE CustomerName : STRING\nDECLARE Balance : REAL\nDECLARE IsActive : BOOLEAN\nDECLARE DateJoined : DATE",
    marking: [
      { mark: "B1", text: "declares CustomerName as STRING" },
      { mark: "B1", text: "declares Balance as REAL" },
      { mark: "B1", text: "declares active account flag as BOOLEAN" },
      { mark: "B1", text: "declares DateJoined as DATE" },
      { mark: "M1", text: "uses clear Cambridge-style DECLARE syntax with colon/type" },
    ],
    strict: [
      "Do not award the Cambridge-style syntax mark for Java syntax alone.",
      "Allow Currency/REAL for Balance if syllabus context accepts numeric balance.",
      "Do not require exact identifier names if purpose is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A traffic light state can only be Red, Amber or Green. Define a suitable user-defined type and declare a variable that uses it.",
    answer: "TYPE TLightState = (Red, Amber, Green)\n\nDECLARE CurrentLight : TLightState",
    marking: [
      { mark: "B1", text: "creates a user-defined / enumerated type" },
      { mark: "B1", text: "includes Red as an allowed value" },
      { mark: "B1", text: "includes Amber as an allowed value" },
      { mark: "B1", text: "includes Green as an allowed value" },
      { mark: "B1", text: "declares a variable using the new type" },
    ],
    strict: [
      "Do not award the declaration mark if the variable is declared as STRING only.",
      "Allow equivalent enumerated type notation if clear.",
      "Do not require the exact name TLightState.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student says: 'DATE should be stored as STRING because dates contain digits and slashes.' Evaluate this statement.",
    answer: "The statement is weak. A STRING may store the characters of a date, but it does not by itself give date meaning. DATE is more suitable when the value is used as a calendar date because comparisons and validation such as checking whether one date is before another are clearer and less error-prone.",
    marking: [
      { mark: "B1", text: "recognises STRING can store date characters but is not ideal for date meaning" },
      { mark: "B1", text: "states DATE is more suitable for calendar dates" },
      { mark: "B1", text: "links DATE to comparison of dates" },
      { mark: "B1", text: "links DATE to validation or range checking" },
      { mark: "B1", text: "explains reduced ambiguity/error compared with free text" },
    ],
    strict: [
      "Do not award evaluation marks for only saying 'DATE is better'.",
      "Allow examples such as checking age, expiry or booking order.",
      "Do not accept STRING as equally suitable where date operations are required.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 -]/g, "");
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
  const responses = {
    integer: "INTEGER would treat 007 as a number and usually lose the leading zero.",
    real: "REAL is for decimal values. A spy ID does not need fractional arithmetic, despite the dramatic branding.",
    string: "Correct. STRING preserves the exact characters, including leading zeroes.",
    boolean: "BOOLEAN can only store TRUE/FALSE, so it cannot store 007.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupTypeClassifier() {
  const input = document.querySelector("#typeInput");
  const result = document.querySelector("#typeResult");
  document.querySelector("#typeBtn").addEventListener("click", () => {
    const item = typeMap[input.value];
    result.innerHTML = `
      <h3>${escapeHtml(item.type)}</h3>
      <p>${escapeHtml(item.reason)}</p>
      <pre><code>${escapeHtml(item.declaration)}</code></pre>
    `;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.innerHTML = `
      <pre><code>${escapeHtml(item.declaration)}</code></pre>
      <p>${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Field / focus", "Type", "Reason"], example.rows)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("school");
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
}

function renderPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <h3>${index + 1}. ${escapeHtml(item.prompt)}</h3>
      <div class="practice-row">
        <input type="text" id="${item.id}" aria-label="Answer for practice question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const mark = document.querySelector(`#${item.id}Mark`);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      mark.textContent = correct ? "Correct. Type choice is appropriate." : "Not quite. Check the field purpose and compare with the answer.";
      mark.className = correct ? "mark correct" : "mark incorrect";
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
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p class="wrong">${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupTypeClassifier();
setupBuilder();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
