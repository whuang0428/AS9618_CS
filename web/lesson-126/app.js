const scenarios = [
  {
    id: "sequence",
    text: "Input Price, input Quantity, calculate Total, output Total.",
    construct: "Sequence",
    reason: "The statements must run in a fixed order so the calculation uses values that already exist.",
  },
  {
    id: "selection",
    text: "Output Pass if Mark is at least 50, otherwise output Resit needed.",
    construct: "Selection",
    reason: "A condition decides which path is taken.",
  },
  {
    id: "forLoop",
    text: "Output every element from index 1 to index 30.",
    construct: "Iteration using FOR",
    reason: "The number of repetitions is known from the index range.",
  },
  {
    id: "whileLoop",
    text: "Keep asking for a password while the password is not correct.",
    construct: "Iteration using WHILE",
    reason: "The number of attempts is not known in advance and the condition is checked before repeating.",
  },
  {
    id: "repeatLoop",
    text: "Ask for a menu choice at least once and repeat until it is valid.",
    construct: "Iteration using REPEAT UNTIL",
    reason: "The prompt must run once before the stopping condition is checked.",
  },
];

const examples = {
  sequence: {
    title: "Example 1: Sequence",
    problem: "Calculate and output the total cost from Price and Quantity.",
    rows: [
      ["1", "INPUT Price", "value must exist before use"],
      ["2", "INPUT Quantity", "second input value"],
      ["3", "Total <- Price * Quantity", "calculation after inputs"],
      ["4", "OUTPUT Total", "output after calculation"],
    ],
    code: "INPUT Price\nINPUT Quantity\nTotal <- Price * Quantity\nOUTPUT Total",
    points: ["Order matters.", "Assignment stores the result.", "Output should happen after the value is calculated."],
  },
  selection: {
    title: "Example 2: Selection with a boundary",
    problem: "Output Pass when Mark is at least 50.",
    rows: [
      ["Mark = 49", "condition false", "Resit needed"],
      ["Mark = 50", "condition true", "Pass"],
      ["Mark = 51", "condition true", "Pass"],
    ],
    code: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF",
    points: [">= is needed because 50 is included.", "ELSE handles the false path.", "ENDIF closes the selection."],
  },
  forLoop: {
    title: "Example 3: Count-controlled iteration",
    problem: "Add the numbers 1 to 4.",
    rows: [
      ["Count = 1", "Total = 1", "first iteration"],
      ["Count = 2", "Total = 3", "second iteration"],
      ["Count = 3", "Total = 6", "third iteration"],
      ["Count = 4", "Total = 10", "fourth iteration"],
    ],
    code: "Total <- 0\nFOR Count <- 1 TO 4\n    Total <- Total + Count\nNEXT Count\nOUTPUT Total",
    points: ["FOR is suitable because the number of repeats is known.", "Total must be initialised before the loop.", "The final output is 10."],
  },
  whileLoop: {
    title: "Example 4: Condition-controlled iteration",
    problem: "Keep asking while Password is not correct.",
    rows: [
      ["Before loop", "condition checked", "may run zero times"],
      ["Inside loop", "INPUT Password", "state changes"],
      ["After input", "condition checked again", "loop may stop"],
    ],
    code: "INPUT Password\nWHILE Password <> CorrectPassword\n    OUTPUT \"Try again\"\n    INPUT Password\nENDWHILE\nOUTPUT \"Access granted\"",
    points: ["The condition is checked before each iteration.", "The variable in the condition must be updated.", "Missing the second input can cause an infinite loop."],
  },
};

const practice = [
  { id: "p1", prompt: "What construct runs statements one after another in order?", accepted: ["sequence"], answer: "Sequence." },
  { id: "p2", prompt: "What construct chooses between paths using a condition?", accepted: ["selection"], answer: "Selection." },
  { id: "p3", prompt: "What construct repeats a block of statements?", accepted: ["iteration", "loop"], answer: "Iteration, also called looping." },
  { id: "p4", prompt: "Which loop is best when the number of repetitions is known?", accepted: ["for", "for loop"], answer: "FOR loop." },
  { id: "p5", prompt: "Which loop checks the condition before the body may run?", accepted: ["while", "while loop"], answer: "WHILE loop." },
  { id: "p6", prompt: "Which loop runs at least once before checking the stopping condition?", accepted: ["repeat", "repeat until", "repeat...until"], answer: "REPEAT...UNTIL." },
  { id: "p7", prompt: "For pass mark 50, should the condition be Mark > 50 or Mark >= 50?", accepted: [">=", "mark >= 50", "greater than or equal"], answer: "Mark >= 50, because 50 is a pass." },
  { id: "p8", prompt: "Trace: Total <- 0; FOR Count <- 1 TO 3; Total <- Total + Count. Final Total?", accepted: ["6"], answer: "6." },
  { id: "p9", prompt: "What keyword closes an IF selection in Cambridge-style pseudocode?", accepted: ["endif"], answer: "ENDIF." },
  { id: "p10", prompt: "What keyword closes a FOR loop in Cambridge-style pseudocode?", accepted: ["next", "next count"], answer: "NEXT, often written as NEXT Count." },
];

const mistakes = [
  {
    wrong: "The condition is IF Mark > 50 THEN, but 50 should pass.",
    fix: "Use IF Mark >= 50 THEN. Boundary values such as 49, 50 and 51 expose this error.",
  },
  {
    wrong: "The WHILE loop condition uses Password, but Password is never input again inside the loop.",
    fix: "Update the variable tested by the condition inside the loop, otherwise the loop may never terminate.",
  },
  {
    wrong: "The answer uses Java braces and semicolons in a Cambridge pseudocode question.",
    fix: "Write Cambridge-style pseudocode with THEN, ELSE, ENDIF, NEXT or ENDWHILE. Java is support only.",
  },
  {
    wrong: "The program calculates Total before inputting Price and Quantity.",
    fix: "Use sequence correctly: input values first, then calculate, then output.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode that inputs Price and Quantity, calculates TotalCost, then outputs TotalCost. Identify the construct mainly used.",
    answer: "INPUT Price\nINPUT Quantity\nTotalCost <- Price * Quantity\nOUTPUT TotalCost\n\nThe main construct is sequence.",
    marking: [
      { mark: "B1", text: "inputs Price" },
      { mark: "B1", text: "inputs Quantity" },
      { mark: "M1", text: "calculates TotalCost using Price * Quantity after the inputs" },
      { mark: "A1", text: "uses correct assignment to store the calculated value" },
      { mark: "B1", text: "outputs TotalCost" },
      { mark: "A1", text: "identifies sequence as the main construct" },
    ],
    strict: [
      "Do not award calculation method mark if TotalCost is calculated before inputs are available.",
      "Allow different sensible variable names if used consistently.",
      "Do not accept Java-only syntax as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "A pass mark is 50. Write pseudocode to input Mark and output Pass or Resit needed. Explain one boundary test.",
    answer: "INPUT Mark\nIF Mark >= 50 THEN\n    OUTPUT \"Pass\"\nELSE\n    OUTPUT \"Resit needed\"\nENDIF\n\nBoundary test: Mark = 50 should output Pass because the pass mark is included.",
    marking: [
      { mark: "B1", text: "inputs Mark" },
      { mark: "M1", text: "uses IF selection with a condition" },
      { mark: "A1", text: "uses Mark >= 50 or equivalent including the boundary value" },
      { mark: "B1", text: "outputs Pass on the true path" },
      { mark: "B1", text: "outputs Resit needed on the false/ELSE path" },
      { mark: "B1", text: "closes the selection appropriately" },
      { mark: "A1", text: "explains Mark = 50 as a boundary test with expected output Pass" },
    ],
    strict: [
      "Do not award boundary condition mark for Mark > 50.",
      "Allow >= PassMark if PassMark is defined as 50.",
      "Do not accept an unexplained test value as the boundary explanation.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Trace this pseudocode and state the final output: Total <- 0; FOR Count <- 1 TO 4; Total <- Total + Count; NEXT Count; OUTPUT Total.",
    answer: "The values of Total after each iteration are 1, 3, 6 and 10. The final output is 10.",
    marking: [
      { mark: "M1", text: "initialises Total to 0 before tracing" },
      { mark: "B1", text: "traces Count = 1 and Total = 1" },
      { mark: "B1", text: "traces Count = 2 and Total = 3" },
      { mark: "B1", text: "traces Count = 3 and Total = 6" },
      { mark: "B1", text: "traces Count = 4 and Total = 10" },
      { mark: "A1", text: "states final output 10" },
    ],
    strict: [
      "Do not award final output mark for 6 or 15.",
      "Allow a clear trace table instead of prose.",
      "Do not accept only 'adds numbers' without values for trace marks.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 4",
    marks: "7 marks",
    prompt: "A program should keep asking for a password while the password is incorrect. Write pseudocode and explain why a WHILE loop is suitable.",
    answer: "INPUT Password\nWHILE Password <> CorrectPassword\n    OUTPUT \"Try again\"\n    INPUT Password\nENDWHILE\nOUTPUT \"Access granted\"\n\nA WHILE loop is suitable because the number of attempts is not known and the condition is checked before each repeat.",
    marking: [
      { mark: "B1", text: "inputs Password before the loop condition" },
      { mark: "M1", text: "uses a WHILE loop with condition Password <> CorrectPassword or equivalent" },
      { mark: "A1", text: "re-inputs or updates Password inside the loop" },
      { mark: "B1", text: "outputs a retry message or equivalent inside the loop" },
      { mark: "B1", text: "closes the loop using ENDWHILE" },
      { mark: "A1", text: "explains number of attempts is not known in advance" },
      { mark: "A1", text: "explains condition is checked before repeating" },
    ],
    strict: [
      "Do not award update mark if Password cannot change inside the loop.",
      "Allow UNTIL-style alternative only if the question is interpreted as at-least-once input and the logic is correct.",
      "Do not accept a FOR loop unless a fixed maximum number of attempts is stated.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Compare sequence, selection and iteration. Include one pseudocode keyword or structure for each.",
    answer: "Sequence executes statements in order. Selection chooses a path using a condition, for example IF...THEN...ELSE...ENDIF. Iteration repeats a block, for example FOR...NEXT or WHILE...ENDWHILE.",
    marking: [
      { mark: "B1", text: "defines sequence as statements executed in order" },
      { mark: "B1", text: "defines selection as choosing a path using a condition" },
      { mark: "A1", text: "gives IF/THEN/ELSE/ENDIF or CASE as selection evidence" },
      { mark: "B1", text: "defines iteration as repetition of a block" },
      { mark: "A1", text: "gives FOR/NEXT, WHILE/ENDWHILE or REPEAT/UNTIL as iteration evidence" },
    ],
    strict: [
      "Do not award iteration definition mark for a single repeated word without a loop idea.",
      "Allow control structure instead of construct.",
      "Do not accept Java braces alone as pseudocode evidence.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9:<>=\[\] _,.-]/g, "");
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
    input: "The input line is fine. The bug appears when the boundary value 50 is tested.",
    condition: "Correct. It should be Mark >= 50, because 50 is included in 'at least 50'.",
    output: "The output is fine; the wrong path is caused by the condition.",
    endif: "ENDIF is needed to close the selection. The boundary bug is earlier.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupTraceTool() {
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const limit = Number(document.querySelector("#loopLimit").value);
    let total = 0;
    const rows = [];
    for (let count = 1; count <= limit; count += 1) {
      total += count;
      rows.push([String(count), String(total)]);
    }
    result.innerHTML = `
      <p><strong>Pseudocode:</strong> Total &lt;- 0; FOR Count &lt;- 1 TO ${limit}; Total &lt;- Total + Count</p>
      ${tableMarkup(["Count", "Total after update"], rows)}
      <p><strong>Final output:</strong> ${total}</p>
    `;
  });
}

function setupClassifier() {
  const select = document.querySelector("#constructSelect");
  const result = document.querySelector("#classifyResult");
  select.innerHTML = scenarios.map((item) => `<option value="${item.id}">${escapeHtml(item.text)}</option>`).join("");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = scenarios.find((entry) => entry.id === select.value);
    result.innerHTML = `
      <p><strong>Construct:</strong> ${escapeHtml(item.construct)}</p>
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
      ${tableMarkup(["Step", "Value / action", "Reason"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("sequence");
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
      mark.textContent = correct ? "Correct. The construct or trace result is accurate." : "Not quite. Check the control structure and any boundary value.";
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
setupTraceTool();
setupClassifier();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
