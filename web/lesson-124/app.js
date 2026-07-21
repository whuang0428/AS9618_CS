const conversions = {
  "int count;": "DECLARE Count : INTEGER",
  "double price;": "DECLARE Price : REAL",
  "String name;": "DECLARE Name : STRING",
  "boolean enrolled;": "DECLARE Enrolled : BOOLEAN",
  "int[] scores = new int[30];": "DECLARE Scores : ARRAY[1:30] OF INTEGER",
};

const examples = {
  variable: {
    title: "Example 1: Variable declaration",
    problem: "Declare and initialise an integer counter.",
    rows: [
      ["Declare", "DECLARE Count : INTEGER", "states identifier and type"],
      ["Assign", "Count <- 0", "stores the initial value"],
      ["Java support", "int count = 0;", "same idea, different syntax"],
    ],
    code: "DECLARE Count : INTEGER\nCount <- 0",
    points: ["Pseudocode uses DECLARE.", "The type appears after the colon.", "Assignment uses <-."],
  },
  constant: {
    title: "Example 2: Constant declaration",
    problem: "Declare a maximum class size that should not change.",
    rows: [
      ["Pseudocode", "CONSTANT MaxClassSize = 30", "named fixed value"],
      ["Use", "IF Count = MaxClassSize THEN", "readable condition"],
      ["Java support", "final int MAX_CLASS_SIZE = 30;", "supporting comparison only"],
    ],
    code: "CONSTANT MaxClassSize = 30\nIF Count = MaxClassSize THEN\n    OUTPUT \"Full\"\nENDIF",
    points: ["A constant should not be assigned a new value later.", "Use a meaningful identifier.", "Java final is not the pseudocode keyword."],
  },
  array: {
    title: "Example 3: Array declaration",
    problem: "Declare 30 integer scores.",
    rows: [
      ["Pseudocode", "ARRAY[1:30] OF INTEGER", "explicit bounds and element type"],
      ["Access", "Scores[1]", "first element because lower bound is 1"],
      ["Java support", "new int[30]", "indexes are 0 to 29 in Java"],
    ],
    code: "DECLARE Scores : ARRAY[1:30] OF INTEGER\nScores[1] <- 72",
    points: ["Bounds are part of the pseudocode declaration.", "Do not import Java's zero-based indexing automatically.", "Element type comes after OF."],
  },
  record: {
    title: "Example 4: Record declaration",
    problem: "Declare a record type for a student.",
    rows: [
      ["Start", "TYPE TStudent", "record type name"],
      ["Fields", "DECLARE Name : STRING", "field declaration"],
      ["End", "ENDTYPE", "closes the record type"],
    ],
    code: "TYPE TStudent\n    DECLARE Name : STRING\n    DECLARE Mark : INTEGER\nENDTYPE\n\nDECLARE Student1 : TStudent",
    points: ["Use TYPE and ENDTYPE in pseudocode.", "Fields use DECLARE.", "A variable of that type must still be declared."],
  },
};

const practice = [
  { id: "p1", prompt: "Write Cambridge-style pseudocode to declare an INTEGER variable Count.", accepted: ["declare count integer", "declare count : integer"], answer: "DECLARE Count : INTEGER." },
  { id: "p2", prompt: "What pseudocode type matches Java int?", accepted: ["integer"], answer: "INTEGER." },
  { id: "p3", prompt: "What pseudocode type matches Java double for decimal values?", accepted: ["real"], answer: "REAL." },
  { id: "p4", prompt: "Which symbol assigns a value in Cambridge-style pseudocode?", accepted: ["<-", "left arrow", "arrow"], answer: "<-." },
  { id: "p5", prompt: "Write pseudocode to assign 0 to Count.", accepted: ["count <- 0", "count 0"], answer: "Count <- 0." },
  { id: "p6", prompt: "Write pseudocode to declare Scores as an array of 30 INTEGER values, indexed 1 to 30.", accepted: ["declare scores array[1:30] of integer", "array[1:30] of integer"], answer: "DECLARE Scores : ARRAY[1:30] OF INTEGER." },
  { id: "p7", prompt: "Which pseudocode keyword starts a record type definition?", accepted: ["type"], answer: "TYPE." },
  { id: "p8", prompt: "Which pseudocode keyword ends a record type definition?", accepted: ["endtype"], answer: "ENDTYPE." },
  { id: "p9", prompt: "Is int count; the expected Paper 2 pseudocode declaration? yes or no.", accepted: ["no"], answer: "No. It is Java-style." },
  { id: "p10", prompt: "What pseudocode keyword declares a fixed value such as MaxSize = 100?", accepted: ["constant"], answer: "CONSTANT." },
];

const mistakes = [
  {
    wrong: "I wrote int count; in a Cambridge pseudocode answer.",
    fix: "Use DECLARE Count : INTEGER. Java type-first declarations are support only unless the question asks for Java.",
  },
  {
    wrong: "I wrote Count = 0 to assign a value.",
    fix: "Use Count <- 0 for assignment. Use = mainly for equality checks in conditions.",
  },
  {
    wrong: "I declared int[] Scores = new int[30]; and then used Scores[0] in pseudocode.",
    fix: "Use DECLARE Scores : ARRAY[1:30] OF INTEGER and follow the declared pseudocode bounds.",
  },
  {
    wrong: "I used class Student { ... } as the Paper 2 record definition.",
    fix: "Use TYPE TStudent ... ENDTYPE for Cambridge-style record declarations. Java class syntax is support only.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode declarations for the variables Count, Name and Enrolled. Count is an integer, Name is text, and Enrolled is TRUE/FALSE.",
    answer: "DECLARE Count : INTEGER\nDECLARE Name : STRING\nDECLARE Enrolled : BOOLEAN",
    marking: [
      { mark: "B1", text: "declares Count" },
      { mark: "A1", text: "uses INTEGER for Count" },
      { mark: "B1", text: "declares Name" },
      { mark: "A1", text: "uses STRING for Name" },
      { mark: "B1", text: "declares Enrolled" },
      { mark: "A1", text: "uses BOOLEAN for Enrolled" },
    ],
    strict: [
      "Do not award pseudocode style mark for Java-only declarations such as int Count;.",
      "Allow equivalent variable capitalisation if identifiers are clear.",
      "Do not accept CHAR for Name unless only one character is required.",
      "FT: type marks can follow candidate's equivalent identifiers.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A Java-support example is int[] scores = new int[30]; Write the equivalent Cambridge-style pseudocode declaration using indexes 1 to 30. Then assign 72 to the first element.",
    answer: "DECLARE Scores : ARRAY[1:30] OF INTEGER\nScores[1] <- 72",
    marking: [
      { mark: "B1", text: "uses DECLARE with array identifier Scores" },
      { mark: "M1", text: "uses ARRAY with explicit bounds 1:30" },
      { mark: "A1", text: "uses INTEGER as element type" },
      { mark: "B1", text: "assigns a value to an array element" },
      { mark: "A1", text: "uses Scores[1] as first element for bounds 1:30" },
      { mark: "A1", text: "uses <- for assignment" },
    ],
    strict: [
      "Do not award first-element mark for Scores[0] when bounds are 1:30.",
      "Allow another clear array name if consistent.",
      "Do not accept Java new int[30] as the pseudocode declaration.",
      "FT: assignment mark can follow candidate's declared lower bound.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "Define a Cambridge-style record type TBook with fields ISBN, Title and Pages. Choose suitable data types and declare Book1 as TBook.",
    answer: "TYPE TBook\n    DECLARE ISBN : STRING\n    DECLARE Title : STRING\n    DECLARE Pages : INTEGER\nENDTYPE\n\nDECLARE Book1 : TBook",
    marking: [
      { mark: "B1", text: "starts record type using TYPE TBook or equivalent" },
      { mark: "B1", text: "declares ISBN as STRING" },
      { mark: "B1", text: "declares Title as STRING" },
      { mark: "B1", text: "declares Pages as INTEGER" },
      { mark: "M1", text: "uses field declarations inside the record" },
      { mark: "A1", text: "closes record using ENDTYPE" },
      { mark: "A1", text: "declares Book1 as TBook" },
    ],
    strict: [
      "Do not award record syntax marks for Java class syntax alone.",
      "Allow BookID instead of ISBN only if field meaning remains clear.",
      "Do not accept INTEGER for ISBN if explanation depends on preserving leading zeroes or hyphens.",
      "FT: Book1 declaration can follow candidate's valid record type name.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A student writes the pseudocode statement Total = Total + Score to update Total. Explain the weakness and give a corrected statement.",
    answer: "The weakness is that = is normally used for equality checks in pseudocode conditions, so the assignment is unclear. The corrected assignment statement is Total <- Total + Score.",
    marking: [
      { mark: "B1", text: "identifies the statement is intended as assignment/update" },
      { mark: "M1", text: "explains = can be confused with equality testing in pseudocode" },
      { mark: "A1", text: "uses <- as assignment operator" },
      { mark: "A1", text: "gives corrected Total <- Total + Score" },
      { mark: "B1", text: "uses clear pseudocode wording" },
    ],
    strict: [
      "Do not award correction mark for Java-style Total += Score;.",
      "Allow explanation that <- stores the new value in Total.",
      "Do not accept only 'syntax is wrong' without stating the assignment issue.",
      "FT: corrected statement can follow candidate's equivalent variable names.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "Convert the following Java-support declarations to Cambridge-style pseudocode: final int MAX_SIZE = 100; double price; boolean found; String[] names = new String[20];",
    answer: "CONSTANT MaxSize = 100\nDECLARE Price : REAL\nDECLARE Found : BOOLEAN\nDECLARE Names : ARRAY[1:20] OF STRING",
    marking: [
      { mark: "B1", text: "declares MAX_SIZE as a constant with value 100" },
      { mark: "A1", text: "uses suitable pseudocode constant syntax" },
      { mark: "B1", text: "declares Price as REAL" },
      { mark: "B1", text: "declares Found as BOOLEAN" },
      { mark: "M1", text: "declares Names as an array" },
      { mark: "A1", text: "uses suitable bounds for 20 elements" },
      { mark: "A1", text: "uses STRING as the array element type" },
    ],
    strict: [
      "Do not require exact identifier capitalisation if meaning is clear.",
      "Allow ARRAY[0:19] only if candidate explicitly chooses zero-based pseudocode bounds consistently.",
      "Do not accept final, double, boolean or String[] as pseudocode type syntax without conversion.",
      "FT: array type mark can follow candidate's chosen array identifier and bounds.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9:<>\[\] _-]/g, "");
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
    java: "Java-style. Useful for implementation, but not the expected Paper 2 pseudocode declaration.",
    pseudo: "Correct. This is Cambridge-style pseudocode: DECLARE identifier : type.",
    mixed: "This is a mixed style. Cambridge pseudocode expects DECLARE and a colon before the type.",
    assign: "This is not a declaration. It looks like an assignment with a type name in the value position.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupConverter() {
  const select = document.querySelector("#declarationSelect");
  const result = document.querySelector("#convertResult");
  document.querySelector("#convertBtn").addEventListener("click", () => {
    result.innerHTML = `<p><strong>Pseudocode:</strong> <code>${escapeHtml(conversions[select.value])}</code></p>`;
  });
}

function setupSorter() {
  const feedback = document.querySelector("#sortFeedback");
  document.querySelectorAll("[data-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-sort]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = button.dataset.sort === "pseudo"
        ? "Pseudocode style: suitable for Paper 2 unless the question asks for Java."
        : "Java-style support: useful for implementation, but not the pseudocode declaration style.";
    });
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      ${tableMarkup(["Step", "Syntax", "Reason"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("variable");
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
      const response = normalise(input.value).replace(/\s+/g, " ");
      const correct = item.accepted.some((answer) => response === normalise(answer) || response.includes(normalise(answer)));
      mark.textContent = correct ? "Correct. The declaration style is exam-safe." : "Not quite. Check whether this should be pseudocode or Java-style syntax.";
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
setupConverter();
setupSorter();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
