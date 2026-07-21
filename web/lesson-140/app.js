const conversions = {
  output: {
    java: "System.out.println(Total);",
    pseudo: "OUTPUT Total",
    note: "Replace Java's library output call with the OUTPUT keyword.",
  },
  assign: {
    java: "total = total + mark;",
    pseudo: "Total <- Total + Mark",
    note: "Use the assignment arrow in Cambridge-style pseudocode.",
  },
  if: {
    java: "if (mark >= 50) { ... }",
    pseudo: "IF Mark >= 50 THEN ... ENDIF",
    note: "Remove brackets and braces; use IF, THEN and ENDIF.",
  },
  for: {
    java: "for (int i = 1; i <= 5; i++)",
    pseudo: "FOR I <- 1 TO 5 ... NEXT I",
    note: "A count-controlled Java loop becomes a FOR ... TO ... NEXT loop.",
  },
  function: {
    java: "static boolean isValidMark(int mark)",
    pseudo: "FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN",
    note: "Use FUNCTION, parameter types and RETURNS instead of Java method modifiers.",
  },
};

const spotter = {
  semicolon: {
    issue: "The semicolon is a Java/C-style habit.",
    fix: "Use OUTPUT Total without the semicolon.",
  },
  brace: {
    issue: "The brace is Java-style block syntax.",
    fix: "Use IF Mark >= 50 THEN and close the block with ENDIF.",
  },
  main: {
    issue: "The main method wrapper is Java-specific.",
    fix: "Start directly with the algorithm steps unless the question asks for a procedure or function.",
  },
  scanner: {
    issue: "Scanner is a Java library class.",
    fix: "Use INPUT Variable in Cambridge-style pseudocode.",
  },
};

const examples = {
  if: {
    title: "Example 1: Convert a Java IF statement",
    java: "if (mark >= 50) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Resit needed\");\n}",
    pseudo: "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
    points: [
      "The condition is preserved.",
      "Java braces are replaced by THEN, ELSE and ENDIF.",
      "System.out.println becomes OUTPUT.",
    ],
  },
  loop: {
    title: "Example 2: Convert a count-controlled loop",
    java: "for (int i = 1; i <= 5; i++) {\n    total = total + scores[i];\n}",
    pseudo: "FOR I <- 1 TO 5\n    Total <- Total + Scores[I]\nNEXT I",
    points: [
      "The known count maps naturally to FOR ... TO ... NEXT.",
      "Assignment uses the left arrow.",
      "Follow the question's array indexing convention.",
    ],
  },
  function: {
    title: "Example 3: Convert a Java method",
    java: "static boolean isValidMark(int mark) {\n    return mark >= 0 && mark <= 100;\n}",
    pseudo: "FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN\n    RETURN Mark >= 0 AND Mark <= 100\nENDFUNCTION",
    points: [
      "Java modifiers such as static are removed.",
      "The parameter type is still clear.",
      "The Boolean expression keeps the same meaning.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Convert System.out.println(Total);", accepted: ["output total"], answer: "OUTPUT Total." },
  { id: "p2", prompt: "Convert total = total + mark;", accepted: ["total <- total + mark", "total ← total + mark"], answer: "Total <- Total + Mark." },
  { id: "p3", prompt: "Which pseudocode keyword replaces Java Scanner input?", accepted: ["input"], answer: "INPUT." },
  { id: "p4", prompt: "Which keyword closes an IF block in Cambridge-style pseudocode?", accepted: ["endif"], answer: "ENDIF." },
  { id: "p5", prompt: "Which keyword pair usually closes a WHILE loop?", accepted: ["endwhile"], answer: "ENDWHILE." },
  { id: "p6", prompt: "What does Java && usually become in pseudocode?", accepted: ["and"], answer: "AND." },
  { id: "p7", prompt: "What does Java || usually become in pseudocode?", accepted: ["or"], answer: "OR." },
  { id: "p8", prompt: "Convert static boolean isValidMark(int mark) as a Cambridge-style header keyword.", accepted: ["function"], answer: "FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN." },
  { id: "p9", prompt: "Should public static void main be included in a normal pseudocode answer? true or false", accepted: ["false"], answer: "False." },
  { id: "p10", prompt: "What should be preserved when converting Java into pseudocode: exact punctuation or algorithm meaning?", accepted: ["meaning", "algorithm", "logic"], answer: "Preserve the algorithm meaning / logic." },
];

const mistakes = [
  {
    wrong: "A student writes public static void main(String[] args) at the start of a pseudocode answer.",
    fix: "Remove the Java wrapper. Write the algorithm steps directly, or use PROCEDURE/FUNCTION only if appropriate.",
  },
  {
    wrong: "A student writes System.out.println(Result); throughout the answer.",
    fix: "Use OUTPUT Result in Cambridge-style pseudocode.",
  },
  {
    wrong: "A student keeps Java braces around an IF block.",
    fix: "Use IF condition THEN, ELSE if needed, and ENDIF to close the block.",
  },
  {
    wrong: "A student changes the loop bounds while translating from Java.",
    fix: "The syntax can change, but the algorithm meaning must not. Check start value, end value and whether the end is included.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Convert this Java fragment into Cambridge-style pseudocode: if (mark >= 50) { System.out.println(\"Pass\"); } else { System.out.println(\"Resit needed\"); }",
    answer: "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
    marking: [
      { mark: "B1", text: "uses IF with the correct condition Mark >= 50" },
      { mark: "A1", text: "uses THEN after the condition or clearly starts the true branch" },
      { mark: "B1", text: "outputs Pass in the true branch using OUTPUT or equivalent pseudocode" },
      { mark: "B1", text: "uses ELSE for the false branch" },
      { mark: "B1", text: "outputs Resit needed in the false branch" },
      { mark: "A1", text: "closes the selection with ENDIF or clear equivalent structure" },
    ],
    strict: [
      "Do not award full marks for Java code copied unchanged.",
      "Allow equivalent variable capitalisation if consistent.",
      "Do not require exact indentation, but the branches must be clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Convert this Java loop into Cambridge-style pseudocode: for (int i = 1; i <= 5; i++) { total = total + scores[i]; }",
    answer: "FOR I <- 1 TO 5\n    Total <- Total + Scores[I]\nNEXT I",
    marking: [
      { mark: "B1", text: "uses a FOR loop or equivalent count-controlled loop" },
      { mark: "B1", text: "initialises loop counter to 1" },
      { mark: "B1", text: "uses final value 5 inclusively" },
      { mark: "M1", text: "updates Total inside the loop" },
      { mark: "A1", text: "adds the correct array element Scores[I] or equivalent" },
      { mark: "B1", text: "uses pseudocode assignment rather than Java-only syntax" },
      { mark: "A1", text: "closes the loop with NEXT or clear equivalent" },
    ],
    strict: [
      "Do not award inclusive end mark if the answer loops only to 4.",
      "Allow Index instead of I if used consistently.",
      "Do not accept Java loop syntax alone as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Explain why Java support examples should not simply be copied as answers to Cambridge pseudocode questions.",
    answer: "Java is a programming language with language-specific syntax such as braces, semicolons, class wrappers and library calls. Cambridge pseudocode uses readable algorithm keywords such as INPUT, OUTPUT, IF, ENDIF and FUNCTION. Copying Java may obscure the algorithm and may not meet the expected pseudocode conventions.",
    marking: [
      { mark: "B1", text: "states Java has language-specific syntax" },
      { mark: "B1", text: "gives a suitable Java-specific example such as braces, semicolons, main method or System.out.println" },
      { mark: "B1", text: "states Cambridge pseudocode uses algorithmic keywords/conventions" },
      { mark: "B1", text: "gives a suitable pseudocode example such as INPUT, OUTPUT, IF/ENDIF or FUNCTION" },
      { mark: "B1", text: "explains copied Java may not match the required answer format" },
      { mark: "B1", text: "links clear pseudocode to communicating the algorithm rather than language syntax" },
    ],
    strict: [
      "Do not award full marks for saying only 'Java is wrong'.",
      "Allow 'exam standard' or 'Cambridge convention' as wording for required format.",
      "Do not accept claims that Java can never be used for learning; Java is support only here.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode for a function IsValidMark that returns TRUE if Mark is from 0 to 100 inclusive. Do not use Java method syntax.",
    answer: "FUNCTION IsValidMark(Mark : INTEGER) RETURNS BOOLEAN\n    IF Mark >= 0 AND Mark <= 100 THEN\n        RETURN TRUE\n    ELSE\n        RETURN FALSE\n    ENDIF\nENDFUNCTION",
    marking: [
      { mark: "B1", text: "uses FUNCTION header with meaningful name" },
      { mark: "B1", text: "includes Mark as a parameter with suitable type or clear meaning" },
      { mark: "B1", text: "states or implies BOOLEAN return type" },
      { mark: "M1", text: "checks lower bound Mark >= 0" },
      { mark: "M1", text: "checks upper bound Mark <= 100" },
      { mark: "A1", text: "returns TRUE for valid marks and FALSE otherwise" },
      { mark: "A1", text: "uses pseudocode structure and ends with ENDFUNCTION or clear equivalent" },
    ],
    strict: [
      "Do not award final structure mark for Java-only static boolean syntax.",
      "Allow direct RETURN Mark >= 0 AND Mark <= 100 if the function header is clear.",
      "Do not accept OR for the valid range condition.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A candidate writes OUTPUT Total; and IF Mark >= 50 { OUTPUT \"Pass\" }. Identify the Java habits and correct them.",
    answer: "The semicolon after OUTPUT Total is a Java/C-style habit and should be removed. The brace after the IF condition is Java-style block syntax. The corrected pseudocode should use IF Mark >= 50 THEN, then OUTPUT \"Pass\", and close with ENDIF.",
    marking: [
      { mark: "B1", text: "identifies semicolon as unnecessary Java/C-style punctuation" },
      { mark: "B1", text: "corrects output to OUTPUT Total" },
      { mark: "B1", text: "identifies brace as Java-style block syntax" },
      { mark: "B1", text: "uses THEN after IF condition" },
      { mark: "B1", text: "keeps OUTPUT Pass in the true branch" },
      { mark: "B1", text: "closes the IF block with ENDIF or clear equivalent" },
    ],
    strict: [
      "Do not penalise harmless capitalisation differences.",
      "Allow removal of semicolon without naming Java if the correction is clear.",
      "Do not award brace correction mark unless a pseudocode block ending is supplied.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    java: { text: "This is valid Java support syntax, but not the Cambridge-style pseudocode form.", correct: false },
    pseudo: { text: "Correct. OUTPUT Total is the Cambridge-style pseudocode form.", correct: true },
    console: { text: "That is JavaScript-style output, another language habit.", correct: false },
    print: { text: "This is language-like syntax, not the standard form used in these lessons.", correct: false },
  };

  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      const result = messages[button.dataset.hook];
      feedback.textContent = result.text;
      feedback.className = `feedback ${result.correct ? "correct" : "incorrect"}`;
    });
  });
}

function setupConverter() {
  const select = document.querySelector("#convertSelect");
  const output = document.querySelector("#convertOutput");
  const render = () => {
    const item = conversions[select.value];
    output.innerHTML = `
      <p><strong>Java habit:</strong> <code>${escapeHtml(item.java)}</code></p>
      <p><strong>Cambridge-style pseudocode:</strong> <code>${escapeHtml(item.pseudo)}</code></p>
      <p><strong>Reason:</strong> ${escapeHtml(item.note)}</p>
    `;
  };
  document.querySelector("#convertBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupSpotter() {
  const select = document.querySelector("#spotSelect");
  const output = document.querySelector("#spotOutput");
  const render = () => {
    const item = spotter[select.value];
    output.innerHTML = `
      <p><strong>Issue:</strong> ${escapeHtml(item.issue)}</p>
      <p><strong>Correction:</strong> ${escapeHtml(item.fix)}</p>
    `;
  };
  document.querySelector("#spotBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="example-card">
      <h3>${escapeHtml(example.title)}</h3>
      <div class="code-grid">
        <div>
          <h4>Java support example only</h4>
          <pre><code>${escapeHtml(example.java)}</code></pre>
        </div>
        <div>
          <h4>Cambridge-style pseudocode</h4>
          <pre><code>${escapeHtml(example.pseudo)}</code></pre>
        </div>
      </div>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
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
  renderExample("if");
}

function setupPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <label for="${item.id}"><strong>${index + 1}.</strong> ${escapeHtml(item.prompt)}</label>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
        <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite"></div>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value.includes(answer));
      feedback.textContent = correct ? "Correct." : "Not quite. Reveal the answer and compare the convention.";
      feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show answer" : "Hide answer";
    });
  });
}

function setupMistakes() {
  const container = document.querySelector("#mistakeList");
  container.innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p>${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="m${index}">Show correction</button>
      <div class="answer-panel hidden" id="m${index}-fix">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}-fix`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show correction" : "Hide correction";
    });
  });
}

function setupExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Answer</h4>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <h4>Mark scheme</h4>
        <ul>${question.marking.map((row) => `<li><strong>${escapeHtml(row.mark)}</strong> ${escapeHtml(row.text)}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${question.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}-ms`);
      const hidden = panel.classList.toggle("hidden");
      button.textContent = hidden ? "Show MS" : "Hide MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupConverter();
  setupSpotter();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

init();
