const students = [
  { Name: "Ali", Mark: 72, Enrolled: "TRUE" },
  { Name: "Bea", Mark: 64, Enrolled: "TRUE" },
  { Name: "Chen", Mark: 85, Enrolled: "FALSE" },
];

const examples = {
  declare: {
    title: "Example 1: Declare an array of records",
    problem: "Store 30 students, each with Name, Mark and Enrolled fields.",
    rows: [
      ["Record type", "TStudent", "shape of one student record"],
      ["Array", "Students[1:30]", "30 student records"],
      ["Access", "Students[1].Name", "field inside one indexed record"],
    ],
    code: "TYPE TStudent\n    DECLARE Name : STRING\n    DECLARE Mark : INTEGER\n    DECLARE Enrolled : BOOLEAN\nENDTYPE\n\nDECLARE Students : ARRAY[1:30] OF TStudent",
    points: ["Define the record type before declaring the array.", "The array element type is TStudent.", "Each element has the same fields."],
  },
  search: {
    title: "Example 2: Search by name",
    problem: "Find and output the mark for a student whose name matches TargetName.",
    rows: [
      ["Initialise", "Found <- FALSE", "tracks search success"],
      ["Compare field", "Students[Index].Name = TargetName", "checks current record"],
      ["Output field", "Students[Index].Mark", "uses the matching record"],
    ],
    code: "Found <- FALSE\nFOR Index <- 1 TO 30\n    IF Students[Index].Name = TargetName THEN\n        OUTPUT Students[Index].Mark\n        Found <- TRUE\n    ENDIF\nNEXT Index",
    points: ["The loop visits records, not separate arrays.", "The condition tests a field.", "The output can use another field from the same record."],
  },
  count: {
    title: "Example 3: Count enrolled students",
    problem: "Count how many students are currently enrolled.",
    rows: [
      ["Counter", "Count <- 0", "must start before the loop"],
      ["Condition", "Students[Index].Enrolled = TRUE", "Boolean field test"],
      ["Update", "Count <- Count + 1", "only inside the IF"],
    ],
    code: "Count <- 0\nFOR Index <- 1 TO 30\n    IF Students[Index].Enrolled = TRUE THEN\n        Count <- Count + 1\n    ENDIF\nNEXT Index\nOUTPUT Count",
    points: ["Initialise the counter once.", "Increment only when the current record meets the condition.", "Output after the loop."],
  },
  update: {
    title: "Example 4: Update a field",
    problem: "Add 5 bonus marks to every enrolled student.",
    rows: [
      ["Traverse", "FOR Index <- 1 TO 30", "visits each record"],
      ["Test", "Students[Index].Enrolled = TRUE", "checks current record"],
      ["Update", "Students[Index].Mark <- Students[Index].Mark + 5", "changes one field"],
    ],
    code: "FOR Index <- 1 TO 30\n    IF Students[Index].Enrolled = TRUE THEN\n        Students[Index].Mark <- Students[Index].Mark + 5\n    ENDIF\nNEXT Index",
    points: ["The assignment reads and writes the same field.", "Only enrolled students are changed.", "Do not update the whole record when only one field changes."],
  },
};

const practice = [
  { id: "p1", prompt: "What structure stores many records of the same record type?", accepted: ["array of records", "arrays of records"], answer: "Array of records." },
  { id: "p2", prompt: "Which expression accesses the Mark field of the second student: Students[2].Mark or Students.Mark[2]?", accepted: ["students2.mark", "students[2].mark", "index then field"], answer: "Students[2].Mark." },
  { id: "p3", prompt: "What does the index select in Students[Index].Name?", accepted: ["record", "one record", "student record", "array element"], answer: "The index selects one record / array element." },
  { id: "p4", prompt: "What does .Name select in Students[Index].Name?", accepted: ["field", "name field"], answer: "The Name field inside the selected record." },
  { id: "p5", prompt: "Which declaration creates 30 student records: ARRAY[1:30] OF TStudent or TStudent[Name:Mark]?", accepted: ["array[1:30] of tstudent", "declare students array[1:30] of tstudent"], answer: "DECLARE Students : ARRAY[1:30] OF TStudent." },
  { id: "p6", prompt: "In a loop FOR Index <- 1 TO 30, should Students[30] be processed? yes or no.", accepted: ["yes"], answer: "Yes. The upper bound 30 is included." },
  { id: "p7", prompt: "What should be initialised before counting enrolled students?", accepted: ["count", "counter"], answer: "The counter, for example Count <- 0." },
  { id: "p8", prompt: "For searching by name, which field is normally compared with TargetName?", accepted: ["name", "students[index].name"], answer: "Students[Index].Name." },
  { id: "p9", prompt: "Is Java's zero-based index rule automatically used in Cambridge pseudocode? yes or no.", accepted: ["no"], answer: "No. Follow the pseudocode array bounds in the question." },
  { id: "p10", prompt: "Write the general access pattern in words.", accepted: ["array name index dot field", "array index dot field", "index then field"], answer: "Array name, index, dot, field." },
];

const mistakes = [
  {
    wrong: "I wrote Students.Mark[2] to get the second student's mark.",
    fix: "Use Students[2].Mark. The index selects a record first; the field name selects the value inside that record.",
  },
  {
    wrong: "I declared DECLARE Students : ARRAY[1:30] OF STRING because names are strings.",
    fix: "Use ARRAY[1:30] OF TStudent when each element must hold multiple fields such as Name, Mark and Enrolled.",
  },
  {
    wrong: "I put Count <- 0 inside the FOR loop.",
    fix: "Initialise Count before the loop. If it is inside the loop, the count resets every iteration.",
  },
  {
    wrong: "I used Java index 0 in pseudocode after declaring ARRAY[1:30].",
    fix: "Use the declared Cambridge pseudocode bounds. If the array is declared 1:30, loop from 1 to 30.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A school stores 30 students. Each student has Name, Mark and Enrolled fields. Define a suitable record type and declare an array to store all 30 students.",
    answer: "TYPE TStudent\n    DECLARE Name : STRING\n    DECLARE Mark : INTEGER\n    DECLARE Enrolled : BOOLEAN\nENDTYPE\n\nDECLARE Students : ARRAY[1:30] OF TStudent",
    marking: [
      { mark: "B1", text: "defines a record/type for one student" },
      { mark: "B1", text: "declares Name as STRING" },
      { mark: "B1", text: "declares Mark as INTEGER or suitable numeric type" },
      { mark: "B1", text: "declares Enrolled as BOOLEAN" },
      { mark: "B1", text: "declares an array with suitable bounds for 30 students" },
      { mark: "B1", text: "uses the record type as the array element type" },
    ],
    strict: [
      "Do not award the array-of-records mark for three separate arrays only.",
      "Allow equivalent field names if meaning is clear.",
      "Do not accept ARRAY[1:30] OF STRING as it cannot store all fields with suitable types.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Write pseudocode to output the names of all students whose Mark is 70 or more.",
    answer: "FOR Index <- 1 TO 30\n    IF Students[Index].Mark >= 70 THEN\n        OUTPUT Students[Index].Name\n    ENDIF\nNEXT Index",
    marking: [
      { mark: "M1", text: "uses a loop with suitable bounds for all 30 records" },
      { mark: "M1", text: "accesses the Mark field using index then dot notation" },
      { mark: "A1", text: "uses correct comparison with 70 or more" },
      { mark: "M1", text: "outputs the Name field from the same indexed record" },
      { mark: "A1", text: "places output inside the IF condition" },
    ],
    strict: [
      "Do not award field-access marks for Students.Mark[Index].",
      "Allow > 69 as equivalent to >= 70 for integer marks.",
      "Do not award full marks if the code outputs every name regardless of mark.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Write pseudocode to count the number of students where Enrolled is TRUE, then output the count.",
    answer: "Count <- 0\nFOR Index <- 1 TO 30\n    IF Students[Index].Enrolled = TRUE THEN\n        Count <- Count + 1\n    ENDIF\nNEXT Index\nOUTPUT Count",
    marking: [
      { mark: "B1", text: "initialises Count before the loop" },
      { mark: "M1", text: "uses a loop over the array of records" },
      { mark: "M1", text: "tests the Enrolled field of the current indexed record" },
      { mark: "A1", text: "increments Count only when the condition is met" },
      { mark: "B1", text: "outputs Count after the loop" },
    ],
    strict: [
      "Do not award initialisation mark if Count is reset inside the loop.",
      "Allow IF Students[Index].Enrolled THEN if Boolean syntax is otherwise clear.",
      "Do not accept counting Name or Mark field instead of Enrolled.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student writes Students.Name[Index] <- \"Ali\". Explain the error and give the corrected assignment for record 5.",
    answer: "The error is that the array index must select one record before a field is accessed. Students.Name[Index] treats Name like an array field. The corrected assignment is Students[5].Name <- \"Ali\".",
    marking: [
      { mark: "B1", text: "identifies Students is an array of records" },
      { mark: "B1", text: "explains the index must select an array element / record first" },
      { mark: "B1", text: "explains the field is accessed after the indexed record" },
      { mark: "B1", text: "gives corrected Students[5].Name access" },
      { mark: "B1", text: "assigns Ali to the Name field" },
    ],
    strict: [
      "Do not award correction mark for Students[Name].5 or Students.Name[5].",
      "Allow another valid record index only if the answer also explicitly addresses record 5.",
      "Do not accept only 'syntax is wrong' without explaining order of access.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "Write pseudocode to search for TargetName in Students. If found, increase that student's Mark by 5 and output Updated. If no matching student is found, output Not found.",
    answer: "Found <- FALSE\nFOR Index <- 1 TO 30\n    IF Students[Index].Name = TargetName THEN\n        Students[Index].Mark <- Students[Index].Mark + 5\n        Found <- TRUE\n        OUTPUT \"Updated\"\n    ENDIF\nNEXT Index\nIF Found = FALSE THEN\n    OUTPUT \"Not found\"\nENDIF",
    marking: [
      { mark: "B1", text: "initialises Found to FALSE before the loop" },
      { mark: "M1", text: "loops through the array of records using suitable bounds" },
      { mark: "M1", text: "compares Students[Index].Name with TargetName" },
      { mark: "A1", text: "updates Students[Index].Mark for the matching record" },
      { mark: "B1", text: "sets Found to TRUE when a match is found" },
      { mark: "B1", text: "outputs Updated for a match" },
      { mark: "A1", text: "outputs Not found only if no match was found" },
    ],
    strict: [
      "Do not award update mark for changing every student's mark.",
      "Allow early loop exit if logically correct and clearly shown.",
      "Do not accept searching Students[Index] without naming the Name field.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9.[\\]: -]/g, "");
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
    separate: "Possible in the same way carrying 30 cups of tea by hand is possible: technically yes, structurally terrible.",
    arrayOfString: "This stores many strings, but loses clear types for Mark and Enrolled.",
    arrayRecords: "Correct. Each element is a TStudent record, so the class register stays structured.",
    single: "One record is enough for one student, not for the whole class.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupExplorer() {
  const indexSelect = document.querySelector("#recordIndex");
  const fieldSelect = document.querySelector("#recordField");
  const result = document.querySelector("#fieldResult");
  document.querySelector("#readFieldBtn").addEventListener("click", () => {
    const index = Number(indexSelect.value);
    const field = fieldSelect.value;
    const record = students[index - 1];
    result.innerHTML = `<p><code>Students[${index}].${escapeHtml(field)}</code> = <strong>${escapeHtml(record[field])}</strong></p>`;
  });
}

function setupLoopTrace() {
  let position = 0;
  let count = 0;
  const output = document.querySelector("#loopTrace");
  const render = (message) => {
    const rows = students
      .map((student, index) => `${index + 1}. ${student.Name}: Mark ${student.Mark}${student.Mark >= 70 ? " -> count" : ""}`)
      .join("<br>");
    output.innerHTML = `<p>${message}</p><p>${rows}</p><p><strong>Current Count = ${count}</strong></p>`;
  };
  document.querySelector("#stepBtn").addEventListener("click", () => {
    if (position >= students.length) {
      render("Loop complete. All records have been processed.");
      return;
    }
    const student = students[position];
    if (student.Mark >= 70) {
      count += 1;
      render(`Index = ${position + 1}. ${student.Name}'s mark is ${student.Mark}, so Count increases.`);
    } else {
      render(`Index = ${position + 1}. ${student.Name}'s mark is ${student.Mark}, so Count does not change.`);
    }
    position += 1;
  });
  document.querySelector("#resetTraceBtn").addEventListener("click", () => {
    position = 0;
    count = 0;
    output.textContent = "Ready: Count = 0, Index has not started.";
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
  renderExample("declare");
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
      mark.textContent = correct ? "Correct. The access pattern is clear." : "Not quite. Check whether the answer needs the array index, field name, or loop bound.";
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
setupExplorer();
setupLoopTrace();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
