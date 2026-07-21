const checkerMap = {
  assignment: { title: "Cambridge-style assignment", detail: "The arrow <- clearly stores the new value in Total." },
  output: { title: "Cambridge-style output", detail: "OUTPUT names what is displayed without Java method syntax." },
  selection: { title: "Cambridge-style selection", detail: "IF, THEN and ENDIF make the block boundary visible." },
  java: { title: "Java support syntax", detail: "This is useful when running Java, but Paper 2 pseudocode should use OUTPUT Total." },
};

const cleanerMap = {
  assign: {
    before: "total = total + mark;",
    after: "Total <- Total + Mark",
    note: "Replace Java assignment and semicolon with Cambridge-style assignment arrow.",
  },
  print: {
    before: "System.out.println(total);",
    after: "OUTPUT Total",
    note: "State the output directly.",
  },
  if: {
    before: "if (mark >= 50) { passCount++; }",
    after: "IF Mark >= 50 THEN\n    PassCount <- PassCount + 1\nENDIF",
    note: "Use IF/THEN/ENDIF and expand ++ into a clear assignment.",
  },
  for: {
    before: "for (int i = 1; i <= 5; i++) { input mark; }",
    after: "FOR Index <- 1 TO 5\n    INPUT Mark\nNEXT Index",
    note: "Use a readable loop variable and show the loop ending.",
  },
};

const examples = {
  assignment: {
    title: "Example 1: Assignment and output",
    problem: "Clean up Java-like assignment and output.",
    before: "total = total + mark;\nSystem.out.println(total);",
    after: "Total <- Total + Mark\nOUTPUT Total",
    points: ["Use <- for assignment.", "Remove semicolons.", "Use OUTPUT instead of System.out.println."],
  },
  selection: {
    title: "Example 2: Selection block",
    problem: "Rewrite a Java-style pass test as Cambridge pseudocode.",
    before: "if (mark >= 50) {\n    output pass;\n} else {\n    output resit;\n}",
    after: "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF",
    points: ["Use IF ... THEN.", "Indent both branches.", "Close the selection with ENDIF."],
  },
  loop: {
    title: "Example 3: Count-controlled loop",
    problem: "Write a readable loop to input five marks.",
    before: "for (int i = 0; i < 5; i++) {\n    mark = input.nextInt();\n}",
    after: "FOR Index <- 1 TO 5\n    INPUT Mark\nNEXT Index",
    points: ["Use FOR/NEXT.", "Use a meaningful loop variable.", "Avoid Java's 0-based loop habit unless specified."],
  },
  full: {
    title: "Example 4: Full clean-up",
    problem: "Convert a Java-like fragment that counts passing marks.",
    before: "int passCount = 0;\nfor (int i = 0; i < 5; i++) {\n    if (marks[i] >= 50) { passCount++; }\n}",
    after: "PassCount <- 0\nFOR Index <- 1 TO 5\n    IF Mark[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index",
    points: ["Initialise before the loop.", "Keep IF inside the loop.", "Use visible ENDIF and NEXT Index."],
  },
};

const practice = [
  { id: "p1", prompt: "Which symbol is used for Cambridge-style assignment in this course?", accepted: ["<-", "arrow", "left arrow"], answer: "<-" },
  { id: "p2", prompt: "What keyword is used to display a value in Cambridge-style pseudocode?", accepted: ["output"], answer: "OUTPUT" },
  { id: "p3", prompt: "What keyword closes an IF block?", accepted: ["endif", "end if"], answer: "ENDIF" },
  { id: "p4", prompt: "What keyword closes a FOR loop?", accepted: ["next", "next index", "next loop"], answer: "NEXT" },
  { id: "p5", prompt: "Convert `total = total + mark;` into Cambridge-style assignment.", accepted: ["total <- total + mark"], answer: "Total <- Total + Mark" },
  { id: "p6", prompt: "Convert `System.out.println(total);` into Cambridge-style output.", accepted: ["output total"], answer: "OUTPUT Total" },
  { id: "p7", prompt: "Is `passCount++` clear Cambridge-style pseudocode? yes or no.", accepted: ["no"], answer: "No. Write PassCount <- PassCount + 1." },
  { id: "p8", prompt: "Should nested statements usually be indented? yes or no.", accepted: ["yes"], answer: "Yes" },
  { id: "p9", prompt: "Which is clearer in an exam answer: `x` or `PassCount`?", accepted: ["passcount", "pass count"], answer: "PassCount" },
  { id: "p10", prompt: "Is Java the expected Paper 2 answer format unless explicitly requested? yes or no.", accepted: ["no"], answer: "No. Cambridge pseudocode is the exam answer format." },
];

const mistakes = [
  { wrong: "I used `total = total + mark;` throughout my Paper 2 answer.", fix: "Use `Total <- Total + Mark` so assignment is clear in Cambridge-style pseudocode." },
  { wrong: "I opened an IF but did not write ENDIF.", fix: "Close each selection block with ENDIF so the marker can see the block boundary." },
  { wrong: "I wrote all lines against the left margin.", fix: "Indent statements inside IF, FOR and WHILE blocks to show control structure." },
  { wrong: "I used `i`, `j`, `x`, `y` everywhere in a word problem.", fix: "Use meaningful identifiers such as Student, Mark, Total or PassCount unless short counters are clearly defined." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Convert this Java-like fragment into Cambridge-style pseudocode: `total = total + mark; System.out.println(total);`",
    answer: "Total <- Total + Mark\nOUTPUT Total",
    marking: [
      { mark: "B1", text: "uses meaningful variable names consistently" },
      { mark: "M1", text: "uses Cambridge-style assignment arrow <-" },
      { mark: "A1", text: "correct update Total <- Total + Mark" },
      { mark: "B1", text: "uses OUTPUT keyword" },
      { mark: "A1", text: "outputs Total after update" },
    ],
    strict: [
      "Do not award assignment notation mark for Java-only equals and semicolon.",
      "Allow lower-case variable names if consistent.",
      "Do not require a surrounding loop.",
      "FT: output mark can follow from candidate's total variable name.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Rewrite this logic as readable Cambridge-style pseudocode: if mark is at least 50 output Pass, otherwise output Resit.",
    answer: "IF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit\"\nENDIF",
    marking: [
      { mark: "B1", text: "uses IF with condition Mark >= 50 or equivalent" },
      { mark: "B1", text: "uses THEN / clear true branch" },
      { mark: "A1", text: "outputs Pass for true condition" },
      { mark: "B1", text: "uses ELSE / clear false branch" },
      { mark: "A1", text: "outputs Resit for false condition" },
      { mark: "B1", text: "closes selection with ENDIF / clear block boundary" },
    ],
    strict: [
      "Do not require quotation marks around Pass/Resit if output values are clear.",
      "Allow > 49 for integer marks.",
      "Do not award block-boundary mark for unmatched braces only.",
      "FT: branch output marks can follow from candidate's condition if logic is consistent.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode to input five marks and output their total.",
    answer: "Total <- 0\nFOR Index <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\nNEXT Index\nOUTPUT Total",
    marking: [
      { mark: "B1", text: "initialises Total to 0" },
      { mark: "M1", text: "uses count-controlled loop for five marks" },
      { mark: "M1", text: "inputs Mark inside loop" },
      { mark: "A1", text: "updates Total with Total <- Total + Mark" },
      { mark: "B1", text: "uses NEXT / clear loop ending" },
      { mark: "A1", text: "outputs final Total after the loop" },
      { mark: "B1", text: "uses readable Cambridge-style indentation / notation" },
    ],
    strict: [
      "Do not award final-output mark if OUTPUT Total is inside the loop and only final total is requested.",
      "Allow WHILE with correctly controlled counter.",
      "Do not award notation mark for Java-only for-loop syntax.",
      "FT: output mark can follow from candidate's chosen accumulator name.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Explain why indentation and meaningful identifiers improve pseudocode readability in an exam answer.",
    answer: "Indentation shows which statements belong inside a selection or loop, so the marker can see the control structure. Meaningful identifiers such as Total, Mark and PassCount show the purpose of each variable. This reduces ambiguity and makes it easier to award marks for initialisation, updates and outputs.",
    marking: [
      { mark: "B1", text: "states indentation shows block/control-structure ownership" },
      { mark: "M1", text: "explains this helps distinguish inside vs outside loop/IF" },
      { mark: "B1", text: "states meaningful identifiers show variable purpose" },
      { mark: "M1", text: "explains this reduces ambiguity / helps trace logic" },
      { mark: "A1", text: "links readability to exam marking / awarding marks" },
      { mark: "A1", text: "uses relevant pseudocode examples or terminology" },
    ],
    strict: [
      "Do not accept only 'it looks nicer'.",
      "Allow 'layout' for indentation if meaning is clear.",
      "Do not require specific variable names.",
      "FT: marking link can follow from any valid readability feature.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Identify and correct three Java features that should not appear in a Cambridge pseudocode answer unless Java is requested.",
    answer: "Examples include semicolons, braces, Java method calls such as System.out.println, ++ shorthand, Java for-loop headers and 0-based array habits. Corrections include using OUTPUT, IF/ENDIF, FOR/NEXT, explicit assignment such as Count <- Count + 1, and clearly defined pseudocode indexing.",
    marking: [
      { mark: "B1", text: "identifies one Java-only feature such as semicolon/braces/System.out.println/++" },
      { mark: "A1", text: "gives a suitable Cambridge-style correction for first feature" },
      { mark: "B1", text: "identifies second distinct Java-only feature" },
      { mark: "A1", text: "gives suitable correction for second feature" },
      { mark: "B1", text: "identifies third distinct Java-only feature" },
      { mark: "A1", text: "gives suitable correction for third feature" },
    ],
    strict: [
      "Do not award separate identification marks for repeated examples of the same feature.",
      "Allow charAt, scanner input or array index examples if corrected clearly.",
      "Do not say Java is never useful; it is support, not the default exam format.",
      "FT: correction marks can follow from candidate's identified Java features.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9\\[\\] <>+=.-]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${head}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${cell}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    arrow: "Correct. The assignment arrow is the clearest Cambridge-style notation here.",
    equals: "That is Java-style assignment with a semicolon. The logic is familiar, but the exam style should use <-.",
    plus: "That is not a clear assignment. Write the full update.",
    print: "That is output syntax, not assignment.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChecker() {
  const input = document.querySelector("#checkerInput");
  const result = document.querySelector("#checkerResult");
  document.querySelector("#checkerBtn").addEventListener("click", () => {
    const item = checkerMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupCleaner() {
  const input = document.querySelector("#cleanerInput");
  const result = document.querySelector("#cleanerResult");
  document.querySelector("#cleanerBtn").addEventListener("click", () => {
    const item = cleanerMap[input.value];
    result.innerHTML = `
      <p><strong>Before:</strong></p>
      <pre><code>${item.before}</code></pre>
      <p><strong>Cambridge-style:</strong></p>
      <pre><code>${item.after}</code></pre>
      <p>${item.note}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <div class="code-grid">
      <article><h3>Before</h3><pre><code>${example.before}</code></pre></article>
      <article><h3>After</h3><pre><code>${example.after}</code></pre></article>
    </div>
    <ul>${example.points.map((point) => `<li>${point}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
  renderExample("assignment");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input id="${item.id}" type="text" autocomplete="off" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}-mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}-answer">${item.answer}</div>
    </article>
  `).join("");

  list.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const accepted = item.accepted.map(normalise);
      const isCorrect = accepted.includes(value);
      const mark = document.querySelector(`#${item.id}-mark`);
      mark.textContent = isCorrect ? "Correct" : "Try again, then use Show answer.";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
    });
  });

  list.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}-answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Mistake ${index + 1}:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix-${index}">${item.fix}</div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix-${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function setupExam() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${question.title}</h3>
        <span>${question.marks}</span>
      </div>
      <p>${question.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms-${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${question.answer}</code></pre>
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms-${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupChecker();
setupCleaner();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
