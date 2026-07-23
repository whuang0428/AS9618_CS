const student = {
  Name: "Ali",
  DateOfBirth: "12/04/2010",
  Mark: "72",
  Enrolled: "TRUE",
};

const builderMap = {
  student: {
    title: "Student details",
    code: "TYPE TStudent\n    DECLARE Name : STRING\n    DECLARE DateOfBirth : DATE\n    DECLARE Mark : INTEGER\n    DECLARE Enrolled : BOOLEAN\nENDTYPE",
    reason: "The record groups different fields about one student.",
  },
  book: {
    title: "Library book",
    code: "TYPE TBook\n    DECLARE ISBN : STRING\n    DECLARE Title : STRING\n    DECLARE Pages : INTEGER\n    DECLARE Available : BOOLEAN\nENDTYPE",
    reason: "ISBN is a STRING because it is an identifier; Pages is an INTEGER count.",
  },
  booking: {
    title: "Booking details",
    code: "TYPE TBooking\n    DECLARE BookingID : STRING\n    DECLARE BookingDate : DATE\n    DECLARE NumberOfGuests : INTEGER\n    DECLARE Paid : BOOLEAN\nENDTYPE",
    reason: "The fields describe one booking but use different data types.",
  },
  product: {
    title: "Product stock item",
    code: "TYPE TProduct\n    DECLARE ProductCode : STRING\n    DECLARE Description : STRING\n    DECLARE Price : REAL\n    DECLARE QuantityInStock : INTEGER\nENDTYPE",
    reason: "A product record keeps identifying, descriptive and numeric fields together.",
  },
};

const examples = {
  student: {
    title: "Example 1: Student record",
    problem: "Model one student's details.",
    rows: [
      ["Name", "STRING", "text value"],
      ["DateOfBirth", "DATE", "calendar date"],
      ["Mark", "INTEGER", "whole-number mark"],
      ["Enrolled", "BOOLEAN", "TRUE/FALSE state"],
    ],
    code: builderMap.student.code,
    points: ["Fields can have different types.", "The type describes the shape of the record.", "A variable must still be declared using the record type."],
  },
  book: {
    title: "Example 2: Book record",
    problem: "Model one library book.",
    rows: [
      ["ISBN", "STRING", "preserves digits and hyphens"],
      ["Title", "STRING", "text"],
      ["Pages", "INTEGER", "whole-number count"],
      ["Available", "BOOLEAN", "available or not"],
    ],
    code: builderMap.book.code,
    points: ["A record suits mixed-type fields.", "ISBN is not an INTEGER just because it contains digits.", "Available is a Boolean flag."],
  },
  update: {
    title: "Example 3: Update a field",
    problem: "Change a student's mark and output the name.",
    rows: [
      ["Declare", "DECLARE Student1 : TStudent", "creates one record variable"],
      ["Update", "Student1.Mark <- 80", "changes one field"],
      ["Output", "OUTPUT Student1.Name", "reads one field"],
    ],
    code: "DECLARE Student1 : TStudent\nStudent1.Mark <- 80\nOUTPUT Student1.Name",
    points: ["Dot notation selects a field.", "Updating Mark does not change Name.", "Use the variable name and field name together."],
  },
  compare: {
    title: "Example 4: Array or record?",
    problem: "Choose between Scores[1:5] and a Student record.",
    rows: [
      ["Scores[1:5]", "Array", "five similar INTEGER values"],
      ["Student details", "Record", "Name, DateOfBirth, Mark, Enrolled"],
      ["Reason", "different types", "field names are clearer than numeric indexes"],
    ],
    code: "DECLARE Scores : ARRAY[1:5] OF INTEGER\nDECLARE Student1 : TStudent",
    points: ["Arrays are for many similar values.", "Records are for related mixed fields.", "Lesson 119 combines these ideas as arrays of records."],
  },
};

const practice = [
  { id: "p1", prompt: "What structure groups named fields that may have different types?", accepted: ["record"], answer: "Record." },
  { id: "p2", prompt: "What is one named item inside a record called?", accepted: ["field"], answer: "Field." },
  { id: "p3", prompt: "Which notation accesses a student's mark: Student1.Mark or Student1[Mark]?", accepted: ["student1.mark", "dot notation"], answer: "Student1.Mark." },
  { id: "p4", prompt: "Can fields in a record have different data types? yes or no.", accepted: ["yes"], answer: "Yes." },
  { id: "p5", prompt: "Which keyword begins a record type definition in the examples?", accepted: ["type"], answer: "TYPE." },
  { id: "p6", prompt: "Which keyword ends a record type definition?", accepted: ["endtype"], answer: "ENDTYPE." },
  { id: "p7", prompt: "For a phone number field inside a record, INTEGER or STRING is usually better?", accepted: ["string"], answer: "STRING, because arithmetic is not needed and leading zeroes may matter." },
  { id: "p8", prompt: "Use array or record for five test scores of the same type?", accepted: ["array"], answer: "Array." },
  { id: "p9", prompt: "Use array or record for one customer's name, balance and active status?", accepted: ["record"], answer: "Record." },
  { id: "p10", prompt: "Is Java class syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  {
    wrong: "I used Student1[1] to access the name field.",
    fix: "Use the field name with dot notation, for example Student1.Name.",
  },
  {
    wrong: "I put every record field into an ARRAY OF STRING.",
    fix: "Use a record when fields need different types, such as DATE, INTEGER and BOOLEAN.",
  },
  {
    wrong: "I declared a TYPE but never declared a variable of that type.",
    fix: "After defining TYPE TStudent, declare a variable such as DECLARE Student1 : TStudent.",
  },
  {
    wrong: "I wrote Java class syntax in a Cambridge pseudocode answer.",
    fix: "Use clear TYPE, field declarations and ENDTYPE-style pseudocode unless Java is explicitly requested.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Define a record type TStudent with fields Name, DateOfBirth, Mark and Enrolled. Choose suitable data types.",
    answer: "TYPE TStudent\n    DECLARE Name : STRING\n    DECLARE DateOfBirth : DATE\n    DECLARE Mark : INTEGER\n    DECLARE Enrolled : BOOLEAN\nENDTYPE",
    marking: [
      { mark: "B1", text: "uses a record/type definition for TStudent" },
      { mark: "B1", text: "declares Name as STRING" },
      { mark: "B1", text: "declares DateOfBirth as DATE" },
      { mark: "B1", text: "declares Mark as INTEGER or suitable numeric type" },
      { mark: "B1", text: "declares Enrolled as BOOLEAN" },
      { mark: "B1", text: "closes the record definition clearly, e.g. ENDTYPE" },
    ],
    strict: [
      "Do not award record-definition mark for four unrelated variables only.",
      "Allow equivalent field names if meaning is clear.",
      "Do not accept STRING for all fields without justification.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Declare a variable Student1 of type TStudent. Assign Ali to the Name field and 72 to the Mark field, then output the Mark field.",
    answer: "DECLARE Student1 : TStudent\nStudent1.Name <- \"Ali\"\nStudent1.Mark <- 72\nOUTPUT Student1.Mark",
    marking: [
      { mark: "B1", text: "declares Student1 as TStudent" },
      { mark: "B1", text: "uses dot notation for Name field" },
      { mark: "B1", text: "assigns Ali to Student1.Name" },
      { mark: "B1", text: "uses dot notation for Mark field" },
      { mark: "B1", text: "assigns 72 to Student1.Mark" },
      { mark: "B1", text: "outputs Student1.Mark" },
    ],
    strict: [
      "Do not award field access marks for Student1[Name].",
      "Allow different valid string quotation style.",
      "Do not award output mark for OUTPUT Student1 without field if Mark is required.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain why a record is more suitable than an array for storing one patient's name, date of birth, height and registered status.",
    answer: "A record is more suitable because the fields describe one patient but have different meanings and data types. Name is a STRING, date of birth is a DATE, height may be REAL, and registered status is BOOLEAN. A record gives each field a meaningful name, whereas an array is better for many similar values of the same type accessed by index.",
    marking: [
      { mark: "B1", text: "states fields describe one patient/entity" },
      { mark: "B1", text: "recognises fields have different meanings" },
      { mark: "B1", text: "recognises fields may have different data types" },
      { mark: "B1", text: "gives suitable example types for at least two fields" },
      { mark: "B1", text: "states record fields have meaningful names" },
      { mark: "B1", text: "contrasts with array as same-type/indexed structure" },
    ],
    strict: [
      "Do not award full credit for only saying 'record is better'.",
      "Allow composite data language.",
      "Do not claim arrays cannot store any related data; the key contrast is same-type indexed elements.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student writes Student1[1] <- \"Ali\" for a record variable Student1. Explain the error and correct it.",
    answer: "The error is that record fields are accessed by field name, not by numeric index. Student1[1] is array-style access and does not identify the Name field. The corrected statement is Student1.Name <- \"Ali\".",
    marking: [
      { mark: "B1", text: "identifies Student1 is a record variable" },
      { mark: "B1", text: "states records use field names/dot notation" },
      { mark: "B1", text: "explains numeric index is array-style access" },
      { mark: "B1", text: "gives corrected Student1.Name access" },
      { mark: "B1", text: "assigns Ali to the Name field" },
    ],
    strict: [
      "Do not award correction for Student1[Name].",
      "Allow equivalent field name if scenario clearly names it.",
      "Do not accept only 'syntax is wrong' without explaining field access.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Define a record type TProduct with ProductCode, Description, Price and QuantityInStock fields. Give suitable data types and one reason for ProductCode.",
    answer: "TYPE TProduct\n    DECLARE ProductCode : STRING\n    DECLARE Description : STRING\n    DECLARE Price : REAL\n    DECLARE QuantityInStock : INTEGER\nENDTYPE\nProductCode is STRING because it is an identifier and may contain leading zeroes or letters; arithmetic is not performed on it.",
    marking: [
      { mark: "B1", text: "defines TProduct as a record/type" },
      { mark: "B1", text: "declares ProductCode as STRING" },
      { mark: "B1", text: "declares Description as STRING" },
      { mark: "B1", text: "declares Price as REAL or suitable numeric currency type" },
      { mark: "B1", text: "declares QuantityInStock as INTEGER" },
      { mark: "B1", text: "gives one valid reason for ProductCode as STRING: identifier/not arithmetic or preserves letters/leading zeroes" },
    ],
    strict: [
      "Do not accept INTEGER for ProductCode when reason involves leading zeroes/letters.",
      "Allow ProductID for ProductCode if meaning is clear.",
      "Do not award reason marks for only saying 'it is code'.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9. -]/g, "");
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
    array: "An ARRAY OF STRING would force all fields into text and lose useful types such as DATE and BOOLEAN.",
    record: "Correct. A record groups related fields with different types.",
    integer: "INTEGER can store one whole number, not a full set of mixed student details.",
    constant: "A constant is fixed and cannot model several fields.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupFieldLookup() {
  const input = document.querySelector("#fieldInput");
  const result = document.querySelector("#fieldResult");
  document.querySelector("#fieldBtn").addEventListener("click", () => {
    const field = input.value;
    result.innerHTML = `<p>Student1.${escapeHtml(field)} = <strong>${escapeHtml(student[field])}</strong></p>`;
  });
}

function setupBuilder() {
  const input = document.querySelector("#builderInput");
  const result = document.querySelector("#builderResult");
  document.querySelector("#builderBtn").addEventListener("click", () => {
    const item = builderMap[input.value];
    result.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
      <p>${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Field / focus", "Type / code", "Reason"], example.rows)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("student");
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
      const correct = item.accepted.some((answer) => value === normalise(answer));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct. The record vocabulary is precise." : "Not quite. Check whether this needs a field name, type, or record variable.";
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
        <p><strong>Mark scheme:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
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
setupFieldLookup();
setupBuilder();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
