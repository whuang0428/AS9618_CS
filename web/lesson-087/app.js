const originalRows = [
  { StudentID: "S01", StudentName: "Amira", TutorGroup: "12A", Active: "TRUE" },
  { StudentID: "S02", StudentName: "Leo", TutorGroup: "12B", Active: "TRUE" },
  { StudentID: "S03", StudentName: "Maya", TutorGroup: "12A", Active: "FALSE" },
];

const builderMap = {
  insertNina: {
    sql: "INSERT INTO Student (StudentID, StudentName, TutorGroup, Active)\nVALUES ('S04', 'Nina', '12C', TRUE);",
    reason: "A new record is required, so use INSERT INTO with fields and matching values.",
  },
  updateAmira: {
    sql: "UPDATE Student\nSET TutorGroup = '12C'\nWHERE StudentID = 'S01';",
    reason: "An existing record is being changed. WHERE restricts the change to S01.",
  },
  updateInactive: {
    sql: "UPDATE Student\nSET Active = FALSE\nWHERE StudentID = 'S02';",
    reason: "The statement changes Leo's Active value without removing the record.",
  },
  deleteMaya: {
    sql: "DELETE FROM Student\nWHERE StudentID = 'S03';",
    reason: "The whole record for S03 is removed, so DELETE FROM is appropriate.",
  },
  deleteInactive: {
    sql: "DELETE FROM Student\nWHERE Active = FALSE;",
    reason: "This removes all records matching the condition, not just one named student.",
  },
};

const simulations = {
  s1: {
    note: "INSERT adds one new row. Existing rows are unchanged.",
    rows: [...originalRows, { StudentID: "S04", StudentName: "Nina", TutorGroup: "12C", Active: "TRUE" }],
  },
  s2: {
    note: "UPDATE with WHERE changes only S01.",
    rows: originalRows.map((row) => (row.StudentID === "S01" ? { ...row, TutorGroup: "12C" } : row)),
  },
  s3: {
    note: "No WHERE condition: every row is updated. This is usually the disaster version.",
    rows: originalRows.map((row) => ({ ...row, TutorGroup: "12C" })),
  },
  s4: {
    note: "DELETE with WHERE removes only S03.",
    rows: originalRows.filter((row) => row.StudentID !== "S03"),
  },
  s5: {
    note: "DELETE without WHERE removes every row from the table.",
    rows: [],
  },
};

const examples = {
  insert: {
    title: "Example 1: INSERT a new record",
    problem: "Add student S04, Nina, in tutor group 12C.",
    steps: [
      "The request adds a new record, so use INSERT INTO.",
      "List the fields being supplied: StudentID, StudentName, TutorGroup.",
      "List values in the same order.",
      "SQL: INSERT INTO Student (StudentID, StudentName, TutorGroup) VALUES ('S04', 'Nina', '12C');",
    ],
  },
  update: {
    title: "Example 2: UPDATE one existing record",
    problem: "Change Amira's tutor group to 12C. Her StudentID is S01.",
    steps: [
      "The record already exists, so use UPDATE, not INSERT.",
      "SET gives the field and new value: SET TutorGroup = '12C'.",
      "WHERE targets the specific record: WHERE StudentID = 'S01'.",
      "SQL: UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';",
    ],
  },
  delete: {
    title: "Example 3: DELETE one record",
    problem: "Remove the record for student S03.",
    steps: [
      "The whole record is being removed, so use DELETE FROM.",
      "Name the table: Student.",
      "Use WHERE StudentID = 'S03' so only one record is removed.",
      "SQL: DELETE FROM Student WHERE StudentID = 'S03';",
    ],
  },
  unsafe: {
    title: "Example 4: Spot the unsafe statement",
    problem: "A student writes UPDATE Student SET TutorGroup = '12C';",
    steps: [
      "The syntax changes TutorGroup, but there is no WHERE clause.",
      "Without WHERE, every row in Student is affected.",
      "If only one student should change, add a condition using a key field.",
      "Safer: UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Which SQL command adds a new record?",
    accepted: ["insert", "insert into"],
    answer: "INSERT / INSERT INTO",
  },
  {
    id: "p2",
    prompt: "Which SQL command changes existing records?",
    accepted: ["update"],
    answer: "UPDATE",
  },
  {
    id: "p3",
    prompt: "Which SQL command removes records?",
    accepted: ["delete", "delete from"],
    answer: "DELETE / DELETE FROM",
  },
  {
    id: "p4",
    prompt: "Which keyword gives the new value in an UPDATE statement?",
    accepted: ["set"],
    answer: "SET",
  },
  {
    id: "p5",
    prompt: "Which keyword introduces values for an INSERT statement?",
    accepted: ["values"],
    answer: "VALUES",
  },
  {
    id: "p6",
    prompt: "Which clause restricts UPDATE or DELETE to selected records?",
    accepted: ["where"],
    answer: "WHERE",
  },
  {
    id: "p7",
    prompt: "What happens if UPDATE Student SET Active = FALSE has no WHERE?",
    accepted: ["all records updated", "every record updated", "all rows updated", "every row updated"],
    answer: "All records / rows are updated.",
  },
  {
    id: "p8",
    prompt: "Write the condition for targeting student S01 by primary key.",
    accepted: ["studentid = 's01'", "studentid='s01'", "studentid = \"s01\"", "studentid=\"s01\""],
    answer: "StudentID = 'S01'",
  },
  {
    id: "p9",
    prompt: "Should DELETE be used to change TutorGroup from 12A to 12C? yes or no.",
    accepted: ["no", "n"],
    answer: "No. Use UPDATE for changing a field value.",
  },
  {
    id: "p10",
    prompt: "In INSERT, must field order match value order? yes or no.",
    accepted: ["yes", "y"],
    answer: "Yes.",
  },
];

const mistakes = [
  {
    wrong: "UPDATE Student TutorGroup = '12C' WHERE StudentID = 'S01';",
    fix: "The SET keyword is missing. Use UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';",
  },
  {
    wrong: "UPDATE Student SET TutorGroup = '12C'; when only S01 should change.",
    fix: "The statement has no WHERE clause, so every row is changed. Add WHERE StudentID = 'S01'.",
  },
  {
    wrong: "DELETE TutorGroup FROM Student WHERE StudentID = 'S01';",
    fix: "DELETE removes records, not individual field values. To change a field, use UPDATE Student SET TutorGroup = ...",
  },
  {
    wrong: "INSERT INTO Student (StudentID, StudentName) VALUES ('S04', 'Nina', '12C');",
    fix: "The field list has two fields but the VALUES list has three values. The counts and order must match.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Write an SQL statement to add a new student with StudentID S04, StudentName Nina and TutorGroup 12C to the Student table.",
    answer: "INSERT INTO Student (StudentID, StudentName, TutorGroup) VALUES ('S04', 'Nina', '12C');",
    marking: [
      { mark: "B1", text: "uses INSERT INTO Student" },
      { mark: "B1", text: "identifies the three fields StudentID, StudentName and TutorGroup" },
      { mark: "M1", text: "uses VALUES with three corresponding values" },
      { mark: "A1", text: "values S04, Nina and 12C are in the correct order and text values are shown as strings" },
    ],
    strict: [
      "Do not award A1 if the order of values does not match the field list.",
      "Allow omission of field list only if all table fields are supplied in a plausible table order.",
      "Do not require a semicolon.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Write an SQL statement to change the TutorGroup of student S01 to 12C.",
    answer: "UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';",
    marking: [
      { mark: "B1", text: "uses UPDATE Student" },
      { mark: "B1", text: "uses SET TutorGroup = '12C'" },
      { mark: "M1", text: "uses WHERE to target a record" },
      { mark: "A1", text: "correct condition StudentID = 'S01'" },
    ],
    strict: [
      "Do not award WHERE mark if no condition is given.",
      "Do not accept INSERT because the record already exists.",
      "Allow double quotes for text values if used consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Write an SQL statement to remove the record for student S03 from the Student table.",
    answer: "DELETE FROM Student WHERE StudentID = 'S03';",
    marking: [
      { mark: "B1", text: "uses DELETE FROM" },
      { mark: "B1", text: "identifies Student table" },
      { mark: "M1", text: "uses WHERE to restrict records removed" },
      { mark: "A1", text: "correct condition StudentID = 'S03'" },
    ],
    strict: [
      "Do not accept UPDATE for removing the whole record.",
      "Do not award method mark for DELETE FROM Student with no WHERE when a specific student is requested.",
      "Allow StudentID = S03 only if S03 is clearly treated as a string value in the answer style.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student writes UPDATE Student SET TutorGroup = '12C'; when only student S01 should be changed. Explain the error and write a corrected statement.",
    answer: "The statement has no WHERE clause, so every record in Student would have TutorGroup changed to 12C. Corrected: UPDATE Student SET TutorGroup = '12C' WHERE StudentID = 'S01';",
    marking: [
      { mark: "B1", text: "identifies that the WHERE clause is missing" },
      { mark: "B1", text: "explains all records / every row would be affected" },
      { mark: "B1", text: "retains UPDATE Student" },
      { mark: "B1", text: "retains SET TutorGroup = '12C'" },
      { mark: "A1", text: "adds correct WHERE StudentID = 'S01'" },
    ],
    strict: [
      "Do not award explanation mark for vague 'it is wrong' without saying every row is affected.",
      "Allow equivalent primary-key condition if S01 is clearly identified.",
      "Do not require semicolon.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A student writes INSERT INTO Student (StudentID, StudentName) VALUES ('S04', 'Nina', '12C'); Explain the error and write a corrected statement.",
    answer: "The field list contains two fields but the VALUES list contains three values. The TutorGroup field is missing from the field list. Corrected: INSERT INTO Student (StudentID, StudentName, TutorGroup) VALUES ('S04', 'Nina', '12C');",
    marking: [
      { mark: "B1", text: "identifies the number of fields and values does not match" },
      { mark: "B1", text: "identifies TutorGroup is missing from field list or extra value has no matching field" },
      { mark: "B1", text: "adds TutorGroup to the field list" },
      { mark: "B1", text: "complete corrected statement with matching fields and values" },
    ],
    strict: [
      "Do not award complete statement mark if field count and value count still differ.",
      "Allow alternative correction that removes '12C' only if the task did not require TutorGroup; here TutorGroup is required, so prefer adding the field.",
      "Do not penalise missing semicolon.",
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
    correct: "Correct. UPDATE changes the existing row and WHERE targets S01 only.",
    all: "Dangerous. Without WHERE, every student's TutorGroup becomes 12C.",
    insert: "No. INSERT adds a new row; it does not change the existing S01 row.",
    delete: "No. DELETE removes Amira's record rather than changing her tutor group.",
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

function renderTable(rows) {
  const fields = ["StudentID", "StudentName", "TutorGroup", "Active"];
  if (rows.length === 0) {
    return `<div class="empty-table">No rows remain in the table.</div>`;
  }
  const head = `<div class="table-row table-head">${fields.map((field) => `<div>${field}</div>`).join("")}</div>`;
  const body = rows
    .map((row) => `<div class="table-row">${fields.map((field) => `<div>${row[field]}</div>`).join("")}</div>`)
    .join("");
  return `<div class="mini-result" style="--cols:${fields.length}">${head}${body}</div>`;
}

function setupSimulator() {
  const input = document.querySelector("#statementInput");
  const note = document.querySelector("#simulationNote");
  const result = document.querySelector("#simulationResult");
  document.querySelector("#simulateBtn").addEventListener("click", () => {
    const simulation = simulations[input.value];
    note.textContent = simulation.note;
    result.innerHTML = renderTable(simulation.rows);
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
  renderExample("insert");
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
            <p><strong>Indicative answer:</strong> <code>${question.answer}</code></p>
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
  setupBuilder();
  setupSimulator();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
