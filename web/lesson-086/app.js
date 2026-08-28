const students = [
  { StudentID: "S01", StudentName: "Amira", TutorGroup: "12A" },
  { StudentID: "S02", StudentName: "Leo", TutorGroup: "12B" },
  { StudentID: "S03", StudentName: "Maya", TutorGroup: "12A" },
];

const loans = [
  { LoanID: "L01", StudentID: "S01", Returned: false },
  { LoanID: "L02", StudentID: "S02", Returned: true },
  { LoanID: "L03", StudentID: "S03", Returned: false },
  { LoanID: "L04", StudentID: "S01", Returned: true },
];

const joinedRows = loans.map((loan) => {
  const student = students.find((item) => item.StudentID === loan.StudentID);
  return { ...loan, ...student, ReturnedText: loan.Returned ? "TRUE" : "FALSE" };
});

const builderMap = {
  studentLoans: {
    sql: "SELECT Student.StudentName, Loan.LoanID\nFROM Student INNER JOIN Loan\nON Student.StudentID = Loan.StudentID;",
    reason: "Use the two named tables and put the matching key fields in an explicit INNER JOIN ... ON clause.",
  },
  loanTitles: {
    sql: "SELECT Loan.LoanID, Student.StudentName\nFROM Loan INNER JOIN Student\nON Loan.StudentID = Student.StudentID;",
    reason: "The table order may be reversed, but the ON condition must still match StudentID to StudentID.",
  },
  currentBooks: {
    sql: "SELECT Student.StudentName, Loan.LoanID\nFROM Student INNER JOIN Loan\nON Student.StudentID = Loan.StudentID\nWHERE Loan.Returned = FALSE;",
    reason: "ON matches related records; WHERE then filters the joined result.",
  },
  computingBorrowers: {
    sql: "SELECT Student.StudentName\nFROM Student INNER JOIN Loan\nON Student.StudentID = Loan.StudentID\nWHERE Student.TutorGroup = '12A';",
    reason: "This remains a two-table join; the filter uses a field from Student.",
  },
  aliasCurrent: {
    sql: "SELECT S.StudentName, L.LoanID\nFROM Student AS S INNER JOIN Loan AS L\nON S.StudentID = L.StudentID\nWHERE L.Returned = FALSE;",
    reason: "Aliases shorten names without changing the explicit two-table INNER JOIN relationship.",
  },
};

const queryMap = {
  q1: { fields: ["StudentName", "LoanID"], rows: joinedRows.map(({ StudentName, LoanID }) => ({ StudentName, LoanID })) },
  q2: { fields: ["LoanID", "StudentName"], rows: joinedRows.map(({ LoanID, StudentName }) => ({ LoanID, StudentName })) },
  q3: { fields: ["StudentName", "LoanID"], rows: joinedRows.filter((row) => !row.Returned).map(({ StudentName, LoanID }) => ({ StudentName, LoanID })) },
  q4: { fields: ["StudentName"], rows: joinedRows.filter((row) => row.TutorGroup === "12A").map(({ StudentName }) => ({ StudentName })) },
  q5: { fields: ["StudentName", "LoanID", "TutorGroup"], rows: joinedRows.filter((row) => row.Returned).map(({ StudentName, LoanID, TutorGroup }) => ({ StudentName, LoanID, TutorGroup })) },
};

const examples = {
  twoTable: {
    title: "Example 1: basic two-table INNER JOIN",
    problem: "Show StudentName and LoanID for every matched loan.",
    steps: ["Select the requested fields.", "Name Student INNER JOIN Loan.", "Write ON Student.StudentID = Loan.StudentID.", "The ON clause prevents unrelated row combinations."],
  },
  threeTable: {
    title: "Example 2: reverse the table order",
    problem: "Start from Loan and show LoanID with StudentName.",
    steps: ["Use Loan INNER JOIN Student.", "The same key relationship is required.", "Write ON Loan.StudentID = Student.StudentID.", "Only two tables are used."],
  },
  filter: {
    title: "Example 3: INNER JOIN plus WHERE",
    problem: "Show current loans only.",
    steps: ["Write the INNER JOIN and ON relationship first.", "Add WHERE Loan.Returned = FALSE.", "ON defines the relationship; WHERE filters the result.", "Keep the query to two tables."],
  },
  alias: {
    title: "Example 4: two-table aliases",
    problem: "Rewrite the current-loan query using S and L.",
    steps: ["Declare Student AS S and Loan AS L.", "Use INNER JOIN and ON S.StudentID = L.StudentID.", "Use aliases consistently in SELECT, ON and WHERE.", "Aliases do not replace the relationship condition."],
  },
};

const practice = [
  { id: "p1", prompt: "Which key uniquely identifies a Student record?", accepted: ["primary key", "primary"], answer: "Primary key" },
  { id: "p2", prompt: "Which key in Loan references Student?", accepted: ["foreign key", "studentid", "loan.studentid"], answer: "Loan.StudentID is a foreign key." },
  { id: "p3", prompt: "Write the ON condition linking Student to Loan.", accepted: ["student.studentid = loan.studentid", "loan.studentid = student.studentid"], answer: "Student.StudentID = Loan.StudentID" },
  { id: "p4", prompt: "Which SQL join keyword is required for this AS core example?", accepted: ["inner join"], answer: "INNER JOIN" },
  { id: "p5", prompt: "How many tables may the AS core join use?", accepted: ["two", "2", "at most two"], answer: "At most two tables." },
  { id: "p6", prompt: "How can StudentID be made unambiguous?", accepted: ["table name", "qualify it", "table-qualified field", "student.studentid"], answer: "Qualify it, for example Student.StudentID." },
  { id: "p7", prompt: "Which clause defines how the two tables match?", accepted: ["on", "on clause"], answer: "The ON clause." },
  { id: "p8", prompt: "Which clause filters current loans?", accepted: ["where", "where clause"], answer: "WHERE Loan.Returned = FALSE" },
  { id: "p9", prompt: "In Student AS S, what is S?", accepted: ["alias", "table alias"], answer: "A table alias." },
  { id: "p10", prompt: "Should SELECT * be used when only two named fields are requested?", accepted: ["no", "n"], answer: "No. Select only the requested fields." },
];

const mistakes = [
  { wrong: "SELECT StudentName, LoanID FROM Student, Loan;", fix: "Use explicit INNER JOIN and an ON condition." },
  { wrong: "ON Student.StudentID = Loan.LoanID", fix: "Match like identifiers: Student.StudentID = Loan.StudentID." },
  { wrong: "SELECT * FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID;", fix: "The join is valid, but select only the fields requested." },
  { wrong: "FROM Student AS S INNER JOIN Loan AS L ON Student.StudentID = Loan.StudentID", fix: "Use declared aliases consistently: ON S.StudentID = L.StudentID." },
];


function renderStudentMarkPoints(question) {
  const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
  const guidance = (question.strict || []).join(" ");
  return `<div class="mark-scheme-table" role="table" aria-label="Mark scheme"><div class="mark-scheme-row mark-scheme-head" role="row"><strong role="columnheader">Answer</strong><strong role="columnheader">Guidance</strong><strong role="columnheader">Marks</strong></div>${question.marking.map((point, pointIndex) => `<div class="mark-scheme-row" role="row"><span role="cell">${escape(point.text)}</span><span role="cell">${pointIndex === 0 ? escape(guidance) : ""}</span><strong role="cell">1</strong></div>`).join("")}</div>`;
}
const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Write SQL using Student and Loan to output StudentName and LoanID for every matched loan.",
    answer: "SELECT Student.StudentName, Loan.LoanID FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID;",
    marking: [
      { mark: "B1", text: "SELECTs the two requested fields" },
      { mark: "B1", text: "names Student INNER JOIN Loan" },
      { mark: "M1", text: "uses an ON condition" },
      { mark: "A1", text: "matches StudentID to StudentID" },
    ],
    strict: [
      "Require explicit INNER JOIN ... ON.",
      "Do not accept a comma-style FROM list.",
      "Do not accept Student.StudentID = Loan.LoanID.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Write a two-table INNER JOIN that outputs StudentName and LoanID for current loans only.",
    answer: "SELECT Student.StudentName, Loan.LoanID FROM Student INNER JOIN Loan ON Student.StudentID = Loan.StudentID WHERE Loan.Returned = FALSE;",
    marking: [
      { mark: "B1", text: "SELECTs StudentName and LoanID" },
      { mark: "B1", text: "uses Student INNER JOIN Loan" },
      { mark: "M1", text: "correct ON relationship" },
      { mark: "M1", text: "filters Returned" },
      { mark: "A1", text: "complete WHERE Returned = FALSE" },
    ],
    strict: [
      "Maximum two tables.",
      "Require INNER JOIN ... ON.",
      "Do not accept Returned = TRUE.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain and correct: SELECT * FROM Student, Loan WHERE Student.StudentID = Loan.LoanID;",
    answer: "Use only the requested fields, explicit INNER JOIN ... ON, and match Student.StudentID to Loan.StudentID.",
    marking: [
      { mark: "B1", text: "identifies SELECT * issue" },
      { mark: "B1", text: "selects named fields" },
      { mark: "B1", text: "identifies comma join issue" },
      { mark: "B1", text: "uses INNER JOIN" },
      { mark: "B1", text: "identifies wrong key match" },
      { mark: "B1", text: "correct ON condition" },
    ],
    strict: [
      "All corrections must preserve two-table scope.",
      "Do not accept a three-table solution.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "Using aliases S and L, write the ON condition and explain its purpose.",
    answer: "ON S.StudentID = L.StudentID; it matches each loan to its related student.",
    marking: [
      { mark: "A1", text: "correct alias condition" },
      { mark: "M1", text: "matches related records" },
      { mark: "A1", text: "explains prevention of unrelated combinations" },
    ],
    strict: [
      "Use the declared aliases.",
      "Allow reversed equality.",
      "Do not award vague speed claims.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Write and annotate a complete two-table INNER JOIN ... ON query of your own.",
    answer: "Example: SELECT S.StudentName, L.LoanID FROM Student AS S INNER JOIN Loan AS L ON S.StudentID = L.StudentID;",
    marking: [
      { mark: "B1", text: "two related tables" },
      { mark: "B1", text: "requested fields" },
      { mark: "B1", text: "INNER JOIN" },
      { mark: "B1", text: "ON clause" },
      { mark: "B1", text: "matching key fields" },
      { mark: "B1", text: "accurate annotation" },
    ],
    strict: [
      "Maximum two tables.",
      "Require explicit INNER JOIN ... ON.",
      "Aliases must be used consistently.",
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
    studentLoan: "Correct. Both fields store a student identifier, so the Loan row can be matched to the right Student row.",
    studentBook: "No. StudentID identifies a student; BookID identifies a book. Matching them is not logical.",
    title: "No. A student name and a book title are different facts, not matching keys.",
    category: "No. StudentID and Category store different kinds of value.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  const reason = document.querySelector("#builderReason");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.textContent = item.sql;
    reason.textContent = item.reason;
  });
}

function renderResultTable(fields, rows) {
  if (rows.length === 0) {
    return "<p>No matching rows.</p>";
  }
  const head = `<div class="table-row table-head">${fields.map((field) => `<div>${field}</div>`).join("")}</div>`;
  const body = rows
    .map((row) => `<div class="table-row">${fields.map((field) => `<div>${row[field]}</div>`).join("")}</div>`)
    .join("");
  return `<div class="mini-result" style="--cols:${fields.length}">${head}${body}</div>`;
}

function setupQueryRunner() {
  const input = document.querySelector("#queryInput");
  const result = document.querySelector("#queryResult");
  document.querySelector("#queryBtn").addEventListener("click", () => {
    const query = queryMap[input.value];
    result.innerHTML = renderResultTable(query.fields, query.rows);
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
  renderExample("twoTable");
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
          <p class="wrong"><strong>Weak SQL ${index + 1}:</strong> ${item.wrong}</p>
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
            <p><strong>Answer:</strong> <code>${question.answer}</code></p>
            <h4>Mark scheme</h4>
            ${renderStudentMarkPoints(question)}
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
  setupBuilder();
  setupQueryRunner();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
