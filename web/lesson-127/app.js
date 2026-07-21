const chooserScenarios = [
  {
    id: "pass",
    text: "Output Pass if Mark is at least 50, otherwise output Resit needed.",
    construct: "IF...ELSE",
    reason: "A relational condition, Mark >= 50, creates two possible paths.",
  },
  {
    id: "menu",
    text: "A menu has choices 1, 2, 3 and an invalid option.",
    construct: "CASE",
    reason: "One expression, Choice, is matched against several discrete values.",
  },
  {
    id: "discount",
    text: "Adults get one discount if they are members and another if they are not.",
    construct: "Nested IF",
    reason: "Membership is checked only after the age decision has been made.",
  },
  {
    id: "grade",
    text: "Output A for marks 80 or above, B for 70 or above, otherwise C.",
    construct: "Nested IF or clear IF chain",
    reason: "Ranges use comparisons rather than simple discrete values.",
  },
];

const examples = {
  ifPass: {
    title: "Example 1: IF pass mark",
    problem: "Output Pass when Mark is at least 50.",
    rows: [
      ["49", "false", "Resit needed"],
      ["50", "true", "Pass"],
      ["51", "true", "Pass"],
    ],
    code: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
    points: ["Use >= because 50 is included.", "ELSE handles the false path.", "Boundary testing checks the condition."],
  },
  caseMenu: {
    title: "Example 2: CASE menu",
    problem: "Output an action for menu choices 1, 2 or 3.",
    rows: [
      ["1", "Add record", "matched case"],
      ["2", "Delete record", "matched case"],
      ["9", "Invalid choice", "OTHERWISE"],
    ],
    code: "INPUT Choice\nCASE Choice OF\n    1 : OUTPUT \"Add record\"\n    2 : OUTPUT \"Delete record\"\n    3 : OUTPUT \"Search\"\n    OTHERWISE OUTPUT \"Invalid choice\"\nENDCASE",
    points: ["CASE compares one expression with clear values.", "OTHERWISE handles invalid or unexpected values.", "ENDCASE closes the structure."],
  },
  nestedDiscount: {
    title: "Example 3: Nested discount",
    problem: "Adults get different discounts depending on membership; non-adults get a child discount.",
    rows: [
      ["Age 20, Member TRUE", "outer true, inner true", "0.20"],
      ["Age 20, Member FALSE", "outer true, inner false", "0.10"],
      ["Age 17, Member TRUE", "outer false", "0.05"],
    ],
    code: "IF Age >= 18 THEN\n    IF Member = TRUE THEN\n        Discount <- 0.20\n    ELSE\n        Discount <- 0.10\n    ENDIF\nELSE\n    Discount <- 0.05\nENDIF",
    points: ["The inner IF only runs for adults.", "Each IF needs its own ENDIF.", "Indentation makes the branch structure readable."],
  },
  rangeGrade: {
    title: "Example 4: Grade ranges",
    problem: "Assign A for marks >= 80, B for marks >= 70, otherwise C.",
    rows: [
      ["85", "first condition true", "A"],
      ["75", "first false, nested true", "B"],
      ["62", "both false", "C"],
    ],
    code: "IF Mark >= 80 THEN\n    Grade <- \"A\"\nELSE\n    IF Mark >= 70 THEN\n        Grade <- \"B\"\n    ELSE\n        Grade <- \"C\"\n    ENDIF\nENDIF",
    points: ["Check the highest boundary first.", "A mark of 85 should not fall through to B.", "Nested IF handles range comparisons."],
  },
};

const practice = [
  { id: "p1", prompt: "Which selection structure is best for menu choices 1, 2, 3 and OTHERWISE?", accepted: ["case"], answer: "CASE is best because one expression has several discrete values." },
  { id: "p2", prompt: "What keyword closes an IF in Cambridge-style pseudocode?", accepted: ["endif"], answer: "ENDIF." },
  { id: "p3", prompt: "What keyword handles unmatched CASE values?", accepted: ["otherwise"], answer: "OTHERWISE." },
  { id: "p4", prompt: "What keyword closes a CASE structure?", accepted: ["endcase"], answer: "ENDCASE." },
  { id: "p5", prompt: "For a pass mark of 50, should the condition use > 50 or >= 50?", accepted: [">=", ">= 50", "mark >= 50", "greater than or equal"], answer: "Use >= 50 because 50 is included." },
  { id: "p6", prompt: "A decision inside another decision is called what?", accepted: ["nested", "nested selection", "nested if"], answer: "Nested selection, often a nested IF." },
  { id: "p7", prompt: "Trace: Choice = 9 in a CASE with 1, 2, 3 and OTHERWISE. Which branch runs?", accepted: ["otherwise"], answer: "OTHERWISE runs." },
  { id: "p8", prompt: "Trace: Age = 17 in the discount nested IF. What discount is assigned?", accepted: ["0.05", "5%", "0.05 discount"], answer: "0.05, because the outer Age >= 18 condition is false." },
  { id: "p9", prompt: "Why is CASE less suitable for Mark >= 80, Mark >= 70 ranges? Use one word.", accepted: ["range", "ranges", "comparison", "comparisons"], answer: "Ranges need comparisons; IF is clearer." },
  { id: "p10", prompt: "Name one test type especially useful for selection conditions.", accepted: ["boundary", "normal", "invalid"], answer: "Boundary, normal or invalid test data. Boundary is especially useful for conditions such as >= 50." },
];

const mistakes = [
  {
    wrong: "A student writes IF Mark > 50 THEN for a pass mark of 50.",
    fix: "Use IF Mark >= 50 THEN. The boundary value 50 must take the Pass branch.",
  },
  {
    wrong: "A student uses CASE for mark ranges such as >= 80 and >= 70.",
    fix: "Use IF or nested IF for ranges because each branch needs a relational comparison.",
  },
  {
    wrong: "A nested IF has only one ENDIF.",
    fix: "Each IF must be closed. A nested IF normally needs one ENDIF for the inner IF and one for the outer IF.",
  },
  {
    wrong: "A CASE menu has no OTHERWISE branch.",
    fix: "Add OTHERWISE to handle invalid or unexpected values, especially in exam scenarios involving menu input.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "7 marks",
    prompt: "Write Cambridge-style pseudocode to input Mark and output Distinction if Mark is 80 or more, Pass if Mark is 50 or more, otherwise Fail.",
    answer: "INPUT Mark\nIF Mark >= 80 THEN\n    OUTPUT \"Distinction\"\nELSE\n    IF Mark >= 50 THEN\n        OUTPUT \"Pass\"\n    ELSE\n        OUTPUT \"Fail\"\n    ENDIF\nENDIF",
    marking: [
      { mark: "B1", text: "inputs Mark" },
      { mark: "M1", text: "uses selection structure with conditions" },
      { mark: "A1", text: "tests Mark >= 80 before Mark >= 50" },
      { mark: "B1", text: "outputs Distinction for Mark >= 80" },
      { mark: "A1", text: "outputs Pass for 50 <= Mark < 80" },
      { mark: "A1", text: "outputs Fail for Mark < 50" },
      { mark: "B1", text: "closes IF structures appropriately" },
    ],
    strict: [
      "Do not award Pass range accuracy if Mark >= 50 is tested before Mark >= 80 without excluding 80 or more.",
      "Allow ELSE IF style if logic and closure are clear.",
      "Do not accept Mark > 50 for the pass boundary.",
      "FT: output marks can follow candidate's equivalent grade labels if ranges are clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "A menu uses choices 1, 2 and 3 for Add, Delete and Search. Write a CASE statement that also handles invalid choices.",
    answer: "INPUT Choice\nCASE Choice OF\n    1 : OUTPUT \"Add\"\n    2 : OUTPUT \"Delete\"\n    3 : OUTPUT \"Search\"\n    OTHERWISE OUTPUT \"Invalid choice\"\nENDCASE",
    marking: [
      { mark: "B1", text: "inputs or uses Choice as the CASE expression" },
      { mark: "M1", text: "uses CASE Choice OF or equivalent CASE structure" },
      { mark: "B1", text: "handles choice 1 as Add" },
      { mark: "B1", text: "handles choice 2 as Delete" },
      { mark: "B1", text: "handles choice 3 as Search" },
      { mark: "A1", text: "uses OTHERWISE/default and closes with ENDCASE" },
    ],
    strict: [
      "Do not award invalid-choice mark if no OTHERWISE/default branch is present.",
      "Allow DISPLAY or PRINT instead of OUTPUT.",
      "Do not accept Java switch syntax alone as Cambridge pseudocode.",
      "FT: action marks can follow candidate's chosen menu labels if mapped consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Trace the nested selection: IF Age >= 18 THEN IF Member = TRUE THEN Discount <- 0.20 ELSE Discount <- 0.10 ENDIF ELSE Discount <- 0.05 ENDIF. State Discount for Age = 18, Member = FALSE and for Age = 16, Member = TRUE.",
    answer: "For Age = 18 and Member = FALSE, the outer condition is true and the inner condition is false, so Discount is 0.10. For Age = 16 and Member = TRUE, the outer condition is false, so Discount is 0.05.",
    marking: [
      { mark: "M1", text: "recognises Age = 18 satisfies Age >= 18" },
      { mark: "M1", text: "uses Member = FALSE to take the inner ELSE branch" },
      { mark: "A1", text: "states Discount = 0.10 for Age = 18, Member = FALSE" },
      { mark: "M1", text: "recognises Age = 16 does not satisfy Age >= 18" },
      { mark: "A1", text: "states inner membership test is not reached for Age = 16" },
      { mark: "A1", text: "states Discount = 0.05 for Age = 16, Member = TRUE" },
    ],
    strict: [
      "Do not award inner-test mark for the Age = 16 case if the candidate still applies Member.",
      "Allow percentages 10% and 5% instead of decimals.",
      "Do not accept 0.20 for Age = 18, Member = FALSE.",
      "FT: final discount marks can follow a clearly traced equivalent nested structure.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain when CASE is more suitable than nested IF, and when nested IF is more suitable than CASE.",
    answer: "CASE is more suitable when one expression has several discrete values, such as a menu choice. Nested IF is more suitable when decisions depend on earlier decisions or when ranges and different conditions must be tested.",
    marking: [
      { mark: "B1", text: "states CASE is based on one expression or variable" },
      { mark: "A1", text: "states CASE suits discrete values such as menu choices" },
      { mark: "B1", text: "states nested IF can test different conditions or dependent decisions" },
      { mark: "A1", text: "states nested IF suits ranges or decisions inside decisions" },
      { mark: "B1", text: "uses a relevant example for at least one structure" },
    ],
    strict: [
      "Do not award comparison marks for simply saying one is easier.",
      "Allow switch-style description only if CASE idea is clear and pseudocode context is maintained.",
      "Do not accept that CASE is always better for many branches.",
      "FT: examples may differ if they match the stated suitability.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes pseudocode for two nested IF statements but uses only one ENDIF. Explain the error and give the correction.",
    answer: "Each IF statement must be closed. In nested selection, the inner IF needs its own ENDIF and the outer IF also needs an ENDIF, so two ENDIF statements are required unless an equivalent clear structure is used.",
    marking: [
      { mark: "B1", text: "identifies that there are two IF statements" },
      { mark: "M1", text: "explains the inner IF must be closed" },
      { mark: "M1", text: "explains the outer IF must be closed" },
      { mark: "A1", text: "states two ENDIF statements are required" },
      { mark: "B1", text: "links the issue to nested selection structure" },
      { mark: "A1", text: "explains that missing closure can change or obscure control flow" },
    ],
    strict: [
      "Do not award full correction for 'add ENDIF' without identifying inner and outer IF closure.",
      "Allow a corrected pseudocode fragment if it clearly closes both IF blocks.",
      "Do not accept Java braces as the correction in a Cambridge pseudocode answer.",
      "FT: closure marks can follow candidate's equivalent nested block labels.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9:<>=\[\] %_.-]/g, "");
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
    pass: "Correct. Mark = 50 satisfies Mark >= 50, so the true branch outputs Pass.",
    resit: "Not this time. The ELSE branch would run only when Mark < 50.",
    both: "Only one branch runs in a normal IF...ELSE selection.",
    none: "One branch must run because IF...ELSE covers both true and false outcomes.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupPathTracer() {
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const age = Number(document.querySelector("#ageInput").value);
    const member = document.querySelector("#memberSelect").value === "true";
    let path = "";
    let discount = 0;

    if (age >= 18) {
      if (member) {
        path = "outer IF true, inner IF true";
        discount = 0.2;
      } else {
        path = "outer IF true, inner IF false";
        discount = 0.1;
      }
    } else {
      path = "outer IF false; inner IF is not reached";
      discount = 0.05;
    }

    result.innerHTML = `
      <p><strong>Path:</strong> ${escapeHtml(path)}</p>
      <p><strong>Discount:</strong> ${discount.toFixed(2)}</p>
      <p><strong>Trace note:</strong> ${age >= 18 ? "Age meets the adult condition." : "Age fails the adult condition, so membership is irrelevant."}</p>
    `;
  });
}

function setupChooser() {
  const select = document.querySelector("#scenarioSelect");
  const result = document.querySelector("#chooseResult");
  select.innerHTML = chooserScenarios.map((item) => `<option value="${item.id}">${escapeHtml(item.text)}</option>`).join("");
  document.querySelector("#chooseBtn").addEventListener("click", () => {
    const item = chooserScenarios.find((entry) => entry.id === select.value);
    result.innerHTML = `
      <p><strong>Recommended structure:</strong> ${escapeHtml(item.construct)}</p>
      <p><strong>Reason:</strong> ${escapeHtml(item.reason)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      ${tableMarkup(["Input", "Path", "Output / value"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("ifPass");
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
      mark.textContent = correct ? "Correct. The selection concept is precise." : "Not quite. Check whether the question is about IF, CASE, boundary or nested structure.";
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
setupPathTracer();
setupChooser();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
