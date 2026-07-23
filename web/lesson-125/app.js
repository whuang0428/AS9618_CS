const scenarios = [
  {
    id: "records",
    text: "A school stores 120 students. Each student has an ID, name and mark.",
    topic: "Array of records",
    reason: "There are many students, and each student has several fields that should stay together.",
    cue: "Look for: many items + different fields per item.",
  },
  {
    id: "stack",
    text: "A drawing app must undo the most recent action first.",
    topic: "Stack",
    reason: "The most recently added action is the first one removed, so the access rule is LIFO.",
    cue: "Look for: most recent first, undo, backtracking.",
  },
  {
    id: "queue",
    text: "Print jobs must be processed in the order they arrive.",
    topic: "Queue",
    reason: "The first job added should be the first job removed, so the access rule is FIFO.",
    cue: "Look for: arrival order, waiting line, service order.",
  },
  {
    id: "csv",
    text: "A program reads product data from Products.csv, one line at a time.",
    topic: "Text file / CSV file",
    reason: "The data is stored outside the program and each line must be read, split into fields and converted if needed.",
    cue: "Look for: .csv, line-based data, fields separated by commas.",
  },
  {
    id: "array",
    text: "A program stores 30 integer marks and loops through them to find the highest.",
    topic: "Array",
    reason: "The same type of value is stored repeatedly, and indexes allow iteration through all elements.",
    cue: "Look for: fixed collection of same-type values.",
  },
];

const weakAnswers = [
  {
    weak: "Use a record because it is better.",
    improved: "Use a record because all fields for one student, such as ID, name and mark, are stored together as one logical item.",
    why: "The improved answer names the structure, links it to the scenario and states the consequence.",
  },
  {
    weak: "Use a queue because it is ordered.",
    improved: "Use a queue because jobs are removed in the same order they arrive; this follows FIFO.",
    why: "The improved answer gives the exact removal rule and connects it to arrival order.",
  },
  {
    weak: "Use a file to save it.",
    improved: "Use a text file so the data remains available after the program stops running and can be read again later.",
    why: "The improved answer explains persistence instead of using a vague word.",
  },
  {
    weak: "Use Java: int[] mark = new int[30];",
    improved: "Use Cambridge-style pseudocode: DECLARE Mark : ARRAY[1:30] OF INTEGER.",
    why: "The improved answer uses the expected Paper 2 declaration style.",
  },
];

const examples = {
  records: {
    title: "Example 1: Choose an array of records",
    problem: "A school stores 120 students. Each student has StudentID, Name and Mark.",
    decision: "Use an array of records.",
    rows: [
      ["Clue", "many students", "array"],
      ["Clue", "each student has several fields", "record"],
      ["Combined model", "many records", "array of records"],
    ],
    code: "TYPE TStudent\n    DECLARE StudentID : STRING\n    DECLARE Name : STRING\n    DECLARE Mark : INTEGER\nENDTYPE\n\nDECLARE Students : ARRAY[1:120] OF TStudent",
    points: ["The array handles many students.", "The record keeps one student's fields together.", "This is more suitable than several unrelated parallel arrays."],
  },
  csv: {
    title: "Example 2: Read and process CSV data",
    problem: "A line from Scores.csv is S017,Ava,82. Extract the mark and add it to Total.",
    decision: "Read the line, split it into fields, convert the mark, then process it.",
    rows: [
      ["Read", "READFILE", "gets one line from the file"],
      ["Split", "SPLIT(Line, \",\")", "separates comma-delimited fields"],
      ["Convert", "STRING_TO_INTEGER", "allows arithmetic on the mark"],
    ],
    code: "READFILE \"Scores.csv\", Line\nFields <- SPLIT(Line, \",\")\nMark <- STRING_TO_INTEGER(Fields[3])\nTotal <- Total + Mark",
    points: ["CSV fields are initially text.", "Numeric fields need conversion before arithmetic.", "Close the file after processing."],
  },
  stack: {
    title: "Example 3: Identify stack behaviour",
    problem: "An editor stores actions so the newest action is undone first.",
    decision: "Use a stack.",
    rows: [
      ["Add action", "PUSH(Action)", "places the newest action on top"],
      ["Undo", "POP()", "removes the top item"],
      ["Rule", "LIFO", "last in, first out"],
    ],
    code: "PUSH(ActionStack, NewAction)\nLastAction <- POP(ActionStack)\nUndo(LastAction)",
    points: ["The newest item is removed first.", "That is LIFO behaviour.", "A queue would remove the oldest action first, which is wrong for undo."],
  },
  queue: {
    title: "Example 4: Identify queue behaviour",
    problem: "A printer processes jobs in the order they arrive.",
    decision: "Use a queue.",
    rows: [
      ["Add job", "ENQUEUE(Job)", "adds to the rear"],
      ["Process job", "DEQUEUE()", "removes from the front"],
      ["Rule", "FIFO", "first in, first out"],
    ],
    code: "ENQUEUE(PrintQueue, NewJob)\nNextJob <- DEQUEUE(PrintQueue)\nPrint(NextJob)",
    points: ["The oldest waiting job is processed first.", "That is FIFO behaviour.", "A stack would unfairly process the newest job first."],
  },
};

const practice = [
  { id: "p1", prompt: "Which data structure is best for 40 INTEGER marks of the same type?", accepted: ["array"], answer: "Array. It stores many values of the same type and can be processed using indexes." },
  { id: "p2", prompt: "Which structure keeps Name, ID and Mark together for one student?", accepted: ["record"], answer: "Record. It stores related fields for one logical item." },
  { id: "p3", prompt: "What combined model stores many students, each with several fields?", accepted: ["array of records", "array record", "records array"], answer: "Array of records." },
  { id: "p4", prompt: "Which ADT uses LIFO?", accepted: ["stack"], answer: "Stack. LIFO means Last In, First Out." },
  { id: "p5", prompt: "Which ADT uses FIFO?", accepted: ["queue"], answer: "Queue. FIFO means First In, First Out." },
  { id: "p6", prompt: "Name the operation that adds an item to a stack.", accepted: ["push"], answer: "PUSH." },
  { id: "p7", prompt: "Name the operation that removes an item from a queue.", accepted: ["dequeue"], answer: "DEQUEUE." },
  { id: "p8", prompt: "Why is a text file useful for stored program data? Use one keyword.", accepted: ["persistent", "persistence", "permanent", "after program", "stored"], answer: "It provides persistent storage, so data remains after the program stops." },
  { id: "p9", prompt: "In a CSV line, what usually separates fields?", accepted: ["comma", ","], answer: "A comma separates fields." },
  { id: "p10", prompt: "Write the Cambridge-style declaration for Scores as ARRAY[1:30] OF INTEGER.", accepted: ["declare scores : array[1:30] of integer", "declare scores array[1:30] of integer", "array[1:30] of integer"], answer: "DECLARE Scores : ARRAY[1:30] OF INTEGER." },
];

const mistakes = [
  {
    wrong: "A student chooses a stack for print jobs because both stacks and queues are ordered.",
    fix: "Use a queue. Print jobs should be removed in arrival order, which is FIFO. A stack would process the newest job first.",
  },
  {
    wrong: "A student says a record is useful because it is 'efficient'.",
    fix: "State the scenario consequence: a record keeps related fields for one item together, such as ID, name and mark for one student.",
  },
  {
    wrong: "A student reads Mark from a CSV file and adds it to Total without conversion.",
    fix: "CSV data is read as text. Convert Mark to INTEGER before arithmetic, for example Mark <- STRING_TO_INTEGER(Fields[3]).",
  },
  {
    wrong: "A student writes Java declarations in a Cambridge pseudocode answer.",
    fix: "Use Cambridge-style pseudocode unless the question asks for Java. For example: DECLARE Scores : ARRAY[1:30] OF INTEGER.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A school stores data for 200 students. Each student has StudentID, Name and Mark. State a suitable data model and justify your choice.",
    answer: "Use an array of records. The array stores many students, and each record keeps the fields StudentID, Name and Mark together for one student.",
    marking: [
      { mark: "B1", text: "identifies a record as suitable for one student's fields" },
      { mark: "B1", text: "identifies an array or equivalent collection for many students" },
      { mark: "B1", text: "combines the ideas as an array of records" },
      { mark: "B1", text: "explains that fields for one student are kept together" },
    ],
    strict: [
      "Do not award full marks for 'array' alone unless the need for fields is addressed.",
      "Allow table or list of records if the meaning is clearly equivalent.",
      "Do not accept vague claims such as 'more efficient' without a cause and consequence.",
    ],
  },
  {
    title: "Question 2",
    marks: "8 marks",
    prompt: "Write Cambridge-style pseudocode to define a record type TProduct with ProductID, Name, Price and InStock fields, then declare Products as an array of 50 TProduct records.",
    answer: "TYPE TProduct\n    DECLARE ProductID : STRING\n    DECLARE Name : STRING\n    DECLARE Price : REAL\n    DECLARE InStock : BOOLEAN\nENDTYPE\n\nDECLARE Products : ARRAY[1:50] OF TProduct",
    marking: [
      { mark: "B1", text: "starts record type using TYPE TProduct or equivalent" },
      { mark: "B1", text: "declares ProductID using a suitable text type" },
      { mark: "B1", text: "declares Name using STRING" },
      { mark: "B1", text: "declares Price using REAL or suitable numeric type" },
      { mark: "B1", text: "declares InStock using BOOLEAN" },
      { mark: "A1", text: "closes the record using ENDTYPE" },
      { mark: "M1", text: "declares Products as an array with 50 elements" },
      { mark: "A1", text: "uses TProduct as the element type" },
    ],
    strict: [
      "Do not award pseudocode syntax marks for Java class syntax alone.",
      "Allow INTEGER for Price only if prices are whole-number values in the candidate's answer.",
      "Do not accept CHAR for Name or ProductID unless only one character is stated.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A program reads a line from Sales.csv in the form ItemCode,Quantity,Price. Explain the processing needed before calculating Quantity * Price.",
    answer: "Read one line from the file, split the line using commas into fields, keep ItemCode as text, convert Quantity to INTEGER and Price to REAL, then calculate Quantity * Price using the converted numeric values.",
    marking: [
      { mark: "B1", text: "reads a line/record from the CSV file" },
      { mark: "B1", text: "splits or separates the line into fields using commas" },
      { mark: "B1", text: "identifies ItemCode as text/string data" },
      { mark: "B1", text: "converts Quantity to INTEGER or numeric form" },
      { mark: "B1", text: "converts Price to REAL or numeric form" },
      { mark: "B1", text: "uses the converted numeric fields in the calculation" },
    ],
    strict: [
      "Do not award conversion marks for merely saying 'process the data'.",
      "Allow parse, cast or convert if the numeric conversion is clear.",
      "Do not accept arithmetic directly on CSV text fields without conversion.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A browser keeps a history of pages so the Back button returns to the most recently visited previous page. Name a suitable ADT and explain the operations used.",
    answer: "Use a stack. When a page is visited, push it onto the stack. When Back is selected, pop the most recent page. This works because a stack is LIFO.",
    marking: [
      { mark: "B1", text: "identifies stack as the suitable ADT" },
      { mark: "B1", text: "states LIFO or Last In, First Out" },
      { mark: "B1", text: "uses PUSH/add operation for visited pages" },
      { mark: "B1", text: "uses POP/remove operation for the Back button" },
      { mark: "B1", text: "explains that the most recent page is returned first" },
    ],
    strict: [
      "Do not award ADT mark for queue in this scenario.",
      "Allow top/remove top if POP terminology is not used but stack behaviour is clear.",
      "Do not accept 'ordered list' without LIFO behaviour.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Compare a stack and a queue using an example for each. Your answer must include the removal rule for each ADT.",
    answer: "A stack uses LIFO, so the last item added is the first removed; an undo feature is an example. A queue uses FIFO, so the first item added is the first removed; print jobs or customer calls are examples.",
    marking: [
      { mark: "B1", text: "states stack uses LIFO" },
      { mark: "B1", text: "explains last item added is first removed" },
      { mark: "B1", text: "gives a suitable stack example such as undo/backtracking" },
      { mark: "B1", text: "states queue uses FIFO" },
      { mark: "B1", text: "explains first item added is first removed" },
      { mark: "B1", text: "gives a suitable queue example such as print jobs or calls" },
    ],
    strict: [
      "Examples must match the stated removal rule.",
      "Allow push/pop and enqueue/dequeue descriptions as evidence of the rules.",
      "Do not accept 'both store data' as a comparison mark.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9:<>\[\] _,.-]/g, "");
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
    array: "Likely array: same-type values, indexed and processed in a loop.",
    record: "Likely record: several fields belong to one logical item.",
    queue: "Likely queue: jobs leave in the same order they arrive, so FIFO.",
    file: "Likely file/CSV handling: line-based persistent data must be read and processed.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const select = document.querySelector("#scenarioSelect");
  const result = document.querySelector("#classifyResult");
  select.innerHTML = scenarios.map((item) => `<option value="${item.id}">${escapeHtml(item.text)}</option>`).join("");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = scenarios.find((entry) => entry.id === select.value);
    result.innerHTML = `
      <p><strong>Likely topic:</strong> ${escapeHtml(item.topic)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
      <p><strong>Exam cue:</strong> ${escapeHtml(item.cue)}</p>
    `;
  });
}

function setupImprover() {
  const select = document.querySelector("#weakSelect");
  const result = document.querySelector("#improveResult");
  select.innerHTML = weakAnswers.map((item, index) => `<option value="${index}">${escapeHtml(item.weak)}</option>`).join("");
  document.querySelector("#improveBtn").addEventListener("click", () => {
    const item = weakAnswers[Number(select.value)];
    result.innerHTML = `
      <p><strong>Improved answer:</strong> ${escapeHtml(item.improved)}</p>
      <p><strong>Why it is stronger:</strong> ${escapeHtml(item.why)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      <p><strong>Decision:</strong> ${escapeHtml(example.decision)}</p>
      ${tableMarkup(["Step", "Evidence", "Decision"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("records");
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
      mark.textContent = correct ? "Correct. That is the right Section 10 idea." : "Not quite. Identify the topic clue, then answer with the precise term.";
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
          <p><strong>Mark scheme:</strong></p>
          <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
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
setupClassifier();
setupImprover();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
