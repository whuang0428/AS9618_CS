const choices = {
  scores: {
    structure: "array",
    reason: "An array is suitable because there are many INTEGER/REAL scores of the same type, processed using an index.",
  },
  student: {
    structure: "record",
    reason: "A record is suitable because one student has named fields with different meanings and possibly different data types.",
  },
  class: {
    structure: "array-records",
    reason: "An array of records is suitable because there are many students and each student has the same set of mixed fields.",
  },
  log: {
    structure: "file",
    reason: "A text/CSV file is suitable because login events must persist after the program ends and new events can be appended.",
  },
  undo: {
    structure: "stack",
    reason: "A stack is suitable because the most recent edit must be undone first, which is LIFO.",
  },
  printer: {
    structure: "queue",
    reason: "A queue is suitable because print jobs should be processed in arrival order, which is FIFO.",
  },
};

const examples = {
  array: {
    title: "Example 1: Array for sensor readings",
    problem: "Store 60 temperature readings and calculate the average.",
    rows: [
      ["Data", "many readings", "same type: REAL"],
      ["Operation", "traverse and total", "indexed loop fits"],
      ["Choice", "ARRAY[1:60] OF REAL", "one structure for repeated values"],
    ],
    code: "DECLARE Readings : ARRAY[1:60] OF REAL\nTotal <- 0\nFOR Index <- 1 TO 60\n    Total <- Total + Readings[Index]\nNEXT Index",
    points: ["Same-type repeated values suggest an array.", "The index supports traversal.", "A record is unnecessary unless each reading has multiple fields."],
  },
  record: {
    title: "Example 2: Record for one product",
    problem: "Store one product's code, description, price and stock quantity.",
    rows: [
      ["Data", "one product", "several named fields"],
      ["Types", "STRING, REAL, INTEGER", "mixed data types"],
      ["Choice", "TProduct record", "field names are meaningful"],
    ],
    code: "TYPE TProduct\n    DECLARE ProductCode : STRING\n    DECLARE Description : STRING\n    DECLARE Price : REAL\n    DECLARE QuantityInStock : INTEGER\nENDTYPE",
    points: ["The fields describe one entity.", "A product code may be STRING even if it contains digits.", "An array of STRING would lose useful type information."],
  },
  file: {
    title: "Example 3: File for saved transactions",
    problem: "Store transaction records so they are available next time the program runs.",
    rows: [
      ["Need", "persistent storage", "must survive program end"],
      ["Operation", "append new transaction", "existing history remains"],
      ["Choice", "CSV text file", "structured lines can be read later"],
    ],
    code: "OPENFILE \"Transactions.csv\" FOR APPEND\nWRITEFILE \"Transactions.csv\", NewTransactionLine\nCLOSEFILE \"Transactions.csv\"",
    points: ["Arrays and records are memory structures during a run.", "Files support persistence.", "CSV-style lines can preserve fields in a simple text format."],
  },
  adt: {
    title: "Example 4: Stack or queue for order control",
    problem: "Choose for undo actions and for service requests.",
    rows: [
      ["Undo edits", "Stack", "most recent action undone first"],
      ["Service requests", "Queue", "first request served first"],
      ["Reason", "access rule", "LIFO or FIFO decides"],
    ],
    code: "Undo: PUSH(Edit), POP() returns most recent edit\nRequests: ENQUEUE(Request), DEQUEUE() returns earliest request",
    points: ["ADT choice depends on removal rule.", "Stack is LIFO.", "Queue is FIFO."],
  },
};

const practice = [
  { id: "p1", prompt: "Best structure for 40 integer marks of the same type?", accepted: ["array"], answer: "Array." },
  { id: "p2", prompt: "Best structure for one employee's name, salary and active status?", accepted: ["record"], answer: "Record." },
  { id: "p3", prompt: "Best structure for 200 employees, each with name, salary and active status?", accepted: ["array of records", "array records"], answer: "Array of records." },
  { id: "p4", prompt: "Best structure for data that must be available after the program closes?", accepted: ["file", "text file", "csv file"], answer: "Text file / CSV file." },
  { id: "p5", prompt: "Best ADT for undoing the most recent action first?", accepted: ["stack"], answer: "Stack." },
  { id: "p6", prompt: "Best ADT for customers served in arrival order?", accepted: ["queue"], answer: "Queue." },
  { id: "p7", prompt: "What rule justifies a stack?", accepted: ["lifo", "last in first out"], answer: "LIFO: last in, first out." },
  { id: "p8", prompt: "What rule justifies a queue?", accepted: ["fifo", "first in first out"], answer: "FIFO: first in, first out." },
  { id: "p9", prompt: "Which is stronger: 'easier' or 'same type values can be indexed'?", accepted: ["same type values can be indexed", "same type", "indexed"], answer: "Same type values can be indexed." },
  { id: "p10", prompt: "If a scenario needs named fields with different data types, choose array or record?", accepted: ["record"], answer: "Record." },
];

const mistakes = [
  {
    wrong: "Use an array for one student because arrays are efficient.",
    fix: "Use a record if one student has mixed named fields such as Name, Mark and Enrolled. Explain the field meanings and types.",
  },
  {
    wrong: "Use one record for a whole class of 28 students.",
    fix: "Use an array of records: each array element stores one TStudent record.",
  },
  {
    wrong: "Use a stack for print jobs because it stores many jobs.",
    fix: "Use a queue if jobs must be processed in the order they arrive. The key reason is FIFO.",
  },
  {
    wrong: "Use an array to save login events for tomorrow.",
    fix: "Use a file for persistence. An array in memory is lost when the program ends unless written to storage.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "A program stores 50 rainfall readings, all REAL values, and calculates the average. Choose a suitable data structure and justify your choice.",
    answer: "An array of REAL values is suitable, for example DECLARE Rainfall : ARRAY[1:50] OF REAL. There are many values of the same data type, and each value can be accessed using an index. The program can traverse the array with a loop to total the readings and calculate the average.",
    marking: [
      { mark: "B1", text: "chooses an array" },
      { mark: "B1", text: "uses suitable numeric type such as REAL" },
      { mark: "B1", text: "recognises there are many values of the same type" },
      { mark: "B1", text: "explains indexed access/traversal" },
      { mark: "B1", text: "links traversal to total/average calculation" },
    ],
    strict: [
      "Do not award full credit for only saying 'array is easier'.",
      "Allow INTEGER if scenario readings are described as whole numbers.",
      "Do not accept record as best choice unless each reading has multiple fields.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A library stores 1000 books. Each book has ISBN, Title, Author and NumberOfPages. Choose a suitable structure and explain why it is more suitable than four separate arrays.",
    answer: "An array of records is suitable. A record type can store the fields for one book, with field names such as ISBN, Title, Author and NumberOfPages. An array can then store 1000 book records. This keeps related fields for the same book together and avoids errors where separate arrays become unsynchronised.",
    marking: [
      { mark: "B1", text: "chooses array of records" },
      { mark: "B1", text: "states one record represents one book" },
      { mark: "B1", text: "states fields have names / meanings" },
      { mark: "B1", text: "recognises fields may have different data types" },
      { mark: "B1", text: "states array stores many book records" },
      { mark: "B1", text: "explains advantage over separate arrays: related data kept together / avoids mismatch" },
    ],
    strict: [
      "Do not award array-of-records mark for only saying 'array'.",
      "Allow list/table wording if record fields and repeated records are clear.",
      "Do not accept four separate arrays as equally suitable without addressing synchronisation risk.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A program needs to keep a log of all login events so that the data can be read next week. Choose a suitable data structure and justify the file mode used when adding one new event.",
    answer: "A text or CSV file is suitable because the login events must persist after the program finishes and be available next week. When adding one new event, the file should be opened FOR APPEND so the new event is added to the end without deleting existing log entries.",
    marking: [
      { mark: "B1", text: "chooses text file / CSV file" },
      { mark: "B1", text: "states data must persist after program ends" },
      { mark: "B1", text: "chooses APPEND mode for adding one new event" },
      { mark: "B1", text: "states existing log entries are not deleted / new entry added to end" },
    ],
    strict: [
      "Do not award persistence mark for an array only.",
      "Allow database only if the answer also clearly explains persistent storage, but file is expected here.",
      "Do not accept WRITE mode when existing log entries must remain.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A text editor stores actions so that the most recent action can be undone first. Choose a suitable abstract data type and explain the operations used.",
    answer: "A stack is suitable because undo requires LIFO behaviour: the last action added is the first action removed. Each new action is pushed onto the stack. When the user selects undo, the program pops the top action and reverses it. The stack should be checked for underflow before popping.",
    marking: [
      { mark: "B1", text: "chooses stack" },
      { mark: "B1", text: "states LIFO / most recent action undone first" },
      { mark: "B1", text: "uses PUSH for adding an action" },
      { mark: "B1", text: "uses POP for undo/removing most recent action" },
      { mark: "B1", text: "links popped action to reversal/undo" },
    ],
    strict: [
      "Do not accept queue for most recent first.",
      "Allow equivalent operation names if stack behaviour is clear.",
      "Do not award underflow mark for checking overflow before undo.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A print server stores print jobs and processes them in the order they arrive. Choose a suitable abstract data type and explain why a stack would be unsuitable.",
    answer: "A queue is suitable because print jobs should be processed in FIFO order: the first job submitted should be printed first. New jobs are enqueued at the rear and jobs are dequeued from the front. A stack would be unsuitable because it uses LIFO order, so the most recent job could be printed before earlier jobs, which would not match the arrival-order requirement.",
    marking: [
      { mark: "B1", text: "chooses queue" },
      { mark: "B1", text: "states FIFO / first submitted printed first" },
      { mark: "B1", text: "uses ENQUEUE at rear for new jobs" },
      { mark: "B1", text: "uses DEQUEUE from front for processing jobs" },
      { mark: "B1", text: "identifies stack as LIFO" },
      { mark: "B1", text: "explains stack would process most recent job before earlier jobs" },
    ],
    strict: [
      "Do not award queue choice without FIFO reason for full credit.",
      "Allow 'served' instead of 'printed' if print-job context remains clear.",
      "Do not accept stack as suitable unless scenario is changed to most-recent-first.",
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
  const messages = {
    separate: "This works only if the exam awards marks for making future-you suffer. It usually does not.",
    array: "A large string array loses useful field types and meanings.",
    records: "Correct. Many students, same record shape, mixed fields: array of records.",
    stack: "A stack controls last-in-first-out removal. It does not model a class register well.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupChooser() {
  const scenario = document.querySelector("#scenarioSelect");
  const structure = document.querySelector("#structureSelect");
  const result = document.querySelector("#choiceResult");
  document.querySelector("#chooseBtn").addEventListener("click", () => {
    const expected = choices[scenario.value];
    const correct = structure.value === expected.structure;
    result.innerHTML = `<p><strong>${correct ? "Correct" : "Not quite"}.</strong> ${escapeHtml(expected.reason)}</p>`;
  });
}

function setupReasonRanker() {
  const feedback = document.querySelector("#reasonFeedback");
  const messages = {
    vague: "Too vague. It names a structure but does not link to the scenario.",
    precise: "Correct. It names the feature and explains how it supports processing.",
    wrong: "Weak. A stack stores items, but the scenario needs same-type indexed processing.",
    generic: "Too generic. 'Data structure' is not a reason.",
  };
  document.querySelectorAll("[data-reason]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-reason]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.reason];
    });
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      ${tableMarkup(["Evidence", "Choice", "Reason"], example.rows)}
      <p><strong>Cambridge-style pseudocode / model:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("array");
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
      mark.textContent = correct ? "Correct. The choice matches the scenario clue." : "Not quite. Identify the data type, access pattern, persistence, or removal order.";
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
setupChooser();
setupReasonRanker();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
