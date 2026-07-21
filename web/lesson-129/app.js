const loopScenarios = [
  {
    id: "password",
    text: "Keep asking for a password while it is incorrect.",
    recommendation: "WHILE",
    reason: "The number of attempts is not known and the condition can be checked before repeating.",
  },
  {
    id: "mark",
    text: "Ask for a mark at least once and repeat until it is between 0 and 100.",
    recommendation: "REPEAT...UNTIL",
    reason: "The input must be requested once before it can be tested.",
  },
  {
    id: "array",
    text: "Process exactly 30 array elements.",
    recommendation: "FOR",
    reason: "The number of repetitions is known from the fixed array bounds.",
  },
  {
    id: "sentinel",
    text: "Keep adding numbers until the user enters -1.",
    recommendation: "WHILE with a sentinel value",
    reason: "The number of inputs is not known and -1 marks the stopping point.",
  },
];

const examples = {
  password: {
    title: "Example 1: Password WHILE loop",
    problem: "Keep asking while the password is incorrect.",
    rows: [
      ["open", "false", "body skipped"],
      ["wrong, then open", "true then false", "one retry"],
      ["wrong, wrong, open", "true, true, false", "two retries"],
    ],
    code: "INPUT Password\nWHILE Password <> CorrectPassword\n    OUTPUT \"Try again\"\n    INPUT Password\nENDWHILE\nOUTPUT \"Access granted\"",
    points: ["WHILE checks before the body.", "Password must be updated inside the loop.", "If the first input is correct, the loop runs zero times."],
  },
  mark: {
    title: "Example 2: Mark validation with REPEAT",
    problem: "Input Mark until it is between 0 and 100 inclusive.",
    rows: [
      ["-5", "condition false", "repeat"],
      ["120", "condition false", "repeat"],
      ["85", "condition true", "stop"],
    ],
    code: "REPEAT\n    INPUT Mark\nUNTIL Mark >= 0 AND Mark <= 100",
    points: ["REPEAT runs at least once.", "The UNTIL condition is the valid condition.", "Use AND because both limits must be satisfied."],
  },
  sentinel: {
    title: "Example 3: Sentinel total",
    problem: "Add numbers until -1 is entered.",
    rows: [
      ["4", "4", "accepted"],
      ["7", "11", "accepted"],
      ["-1", "11", "sentinel, not added"],
    ],
    code: "Total <- 0\nINPUT Number\nWHILE Number <> -1\n    Total <- Total + Number\n    INPUT Number\nENDWHILE\nOUTPUT Total",
    points: ["The sentinel stops the loop.", "-1 is not added to Total.", "The next input must be inside the loop."],
  },
  infinite: {
    title: "Example 4: Infinite loop fix",
    problem: "A WHILE loop tests Number but never changes Number.",
    rows: [
      ["Problem", "Number is not updated", "condition may stay true forever"],
      ["Fix", "INPUT Number inside loop", "condition can change"],
      ["Test", "eventually enter -1", "loop stops"],
    ],
    code: "INPUT Number\nWHILE Number <> -1\n    OUTPUT Number\n    INPUT Number\nENDWHILE",
    points: ["A condition-controlled loop needs a route to termination.", "Update the variable used in the condition.", "Trace two iterations to check the update."],
  },
};

const practice = [
  { id: "p1", prompt: "Which loop checks the condition before the body may run?", accepted: ["while", "while loop"], answer: "WHILE loop." },
  { id: "p2", prompt: "Which loop runs at least once before checking the condition?", accepted: ["repeat", "repeat until", "repeat...until"], answer: "REPEAT...UNTIL." },
  { id: "p3", prompt: "Can a WHILE loop run zero times? yes or no.", accepted: ["yes"], answer: "Yes. If the condition is false before the first iteration, the body is skipped." },
  { id: "p4", prompt: "Can a REPEAT...UNTIL loop run zero times? yes or no.", accepted: ["no"], answer: "No. It runs the body once before checking the UNTIL condition." },
  { id: "p5", prompt: "What is the sentinel value in a loop that stops when Number = -1?", accepted: ["-1"], answer: "-1." },
  { id: "p6", prompt: "Should a sentinel such as -1 be added to the total? yes or no.", accepted: ["no"], answer: "No. It is used only to stop the loop." },
  { id: "p7", prompt: "What keyword closes a WHILE loop in Cambridge-style pseudocode?", accepted: ["endwhile"], answer: "ENDWHILE." },
  { id: "p8", prompt: "What keyword pair is used for a post-condition loop?", accepted: ["repeat until", "repeat...until"], answer: "REPEAT...UNTIL." },
  { id: "p9", prompt: "For valid mark 0 to 100, should the UNTIL condition use AND or OR?", accepted: ["and"], answer: "AND, because Mark must be >= 0 and <= 100." },
  { id: "p10", prompt: "What common error happens when the condition variable is never updated?", accepted: ["infinite loop", "infinite", "endless loop"], answer: "An infinite loop." },
];

const mistakes = [
  {
    wrong: "A student writes WHILE Password <> CorrectPassword but never inputs Password inside the loop.",
    fix: "Input or otherwise update Password inside the loop so the condition can eventually become false.",
  },
  {
    wrong: "A student writes UNTIL Mark >= 0 OR Mark <= 100 for validation.",
    fix: "Use AND for the valid range: UNTIL Mark >= 0 AND Mark <= 100. With OR, almost every value becomes valid.",
  },
  {
    wrong: "A student adds the sentinel value -1 to Total before stopping.",
    fix: "Check the sentinel before adding. -1 is the stopping marker, not part of the data.",
  },
  {
    wrong: "A student uses Java while (condition) { } syntax as the Cambridge pseudocode answer.",
    fix: "Use WHILE Condition ... ENDWHILE or REPEAT ... UNTIL Condition. Java is support only.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode that repeatedly inputs Password while it is not equal to CorrectPassword. Output Access granted when the loop ends.",
    answer: "INPUT Password\nWHILE Password <> CorrectPassword\n    OUTPUT \"Try again\"\n    INPUT Password\nENDWHILE\nOUTPUT \"Access granted\"",
    marking: [
      { mark: "B1", text: "inputs Password before the loop condition is tested" },
      { mark: "M1", text: "uses a WHILE loop with Password <> CorrectPassword or equivalent" },
      { mark: "B1", text: "outputs a retry message inside the loop" },
      { mark: "A1", text: "updates/re-inputs Password inside the loop" },
      { mark: "B1", text: "closes loop using ENDWHILE or equivalent" },
      { mark: "A1", text: "outputs Access granted after the loop, not inside the retry-only path" },
    ],
    strict: [
      "Do not award update mark if Password cannot change inside the loop.",
      "Allow NOT Password = CorrectPassword as equivalent condition.",
      "Do not accept Java braces and while syntax alone as Cambridge pseudocode.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write pseudocode to input Mark until it is in the range 0 to 100 inclusive. Use REPEAT...UNTIL.",
    answer: "REPEAT\n    INPUT Mark\nUNTIL Mark >= 0 AND Mark <= 100",
    marking: [
      { mark: "B1", text: "uses REPEAT" },
      { mark: "B1", text: "inputs Mark inside the loop body" },
      { mark: "M1", text: "uses UNTIL condition" },
      { mark: "A1", text: "tests Mark >= 0 or equivalent lower bound" },
      { mark: "A1", text: "tests Mark <= 100 or equivalent upper bound" },
      { mark: "A1", text: "combines valid-range conditions using AND" },
    ],
    strict: [
      "Do not award final logic mark for OR between the valid lower and upper bound tests.",
      "Allow 0 <= Mark <= 100 if written clearly.",
      "Do not accept WHILE if the question specifically requires REPEAT...UNTIL.",
      "Allow an equivalent variable if it is used consistently.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "Trace this sentinel loop for inputs 4, 7, -1: Total <- 0; INPUT Number; WHILE Number <> -1; Total <- Total + Number; INPUT Number; ENDWHILE; OUTPUT Total.",
    answer: "Input 4 is added so Total becomes 4. Input 7 is added so Total becomes 11. Input -1 stops the loop and is not added. The final output is 11.",
    marking: [
      { mark: "M1", text: "initialises Total to 0" },
      { mark: "B1", text: "adds 4 to give Total = 4" },
      { mark: "B1", text: "continues loop because 4 <> -1" },
      { mark: "B1", text: "adds 7 to give Total = 11" },
      { mark: "M1", text: "recognises -1 is the sentinel that stops the loop" },
      { mark: "A1", text: "does not add -1 to Total" },
      { mark: "A1", text: "states final output 11" },
    ],
    strict: [
      "Do not award final output mark for 10 if -1 has been added.",
      "Allow a clear trace table instead of prose.",
      "Do not accept only 'it stops' without showing Total values where trace is requested.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Compare WHILE and REPEAT...UNTIL loops. Include when the condition is checked and the minimum number of iterations.",
    answer: "A WHILE loop checks the condition before the loop body and may run zero times. A REPEAT...UNTIL loop runs the body first, checks the condition after the body, and therefore runs at least once.",
    marking: [
      { mark: "B1", text: "states WHILE checks condition before the body" },
      { mark: "B1", text: "states WHILE may run zero times" },
      { mark: "B1", text: "states REPEAT...UNTIL body runs before condition is checked" },
      { mark: "B1", text: "states REPEAT...UNTIL runs at least once" },
    ],
    strict: [
      "Do not award comparison marks for only saying one is easier.",
      "Allow pre-test/post-test terminology.",
      "Do not accept that both always run once.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A loop is intended to repeat until the user enters 0, but the variable tested by the WHILE condition is never changed inside the loop. Explain the error and give a correction.",
    answer: "The loop may be infinite because the condition can stay true forever. The variable tested in the condition must be updated inside the loop, for example by inputting the value again before ENDWHILE.",
    marking: [
      { mark: "B1", text: "explains the variable is not changed/updated in the loop body" },
      { mark: "B1", text: "states this can cause an infinite loop" },
      { mark: "B1", text: "gives a correction that updates or re-inputs the variable inside the loop" },
      { mark: "B1", text: "places the update before the next condition check / before ENDWHILE" },
    ],
    strict: [
      "Do not award correction mark for merely saying 'fix the condition' without an update.",
      "Allow changing another state variable if it is the variable tested by the condition.",
      "Do not accept switching to FOR without explaining a fixed repetition count.",
      "Allow an equivalent variable if it is used consistently.",
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
    zero: "Correct. The WHILE condition is false before the first pass, so the loop body is skipped.",
    one: "Not here. A WHILE loop checks before running, so it can run zero times.",
    forever: "No. It would only risk running forever if the condition were true and never changed.",
    unknown: "We can tell: both values are already equal, so the condition is false.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupSentinelTrace() {
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const values = document.querySelector("#sequenceInput").value
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      result.textContent = "Enter at least one numeric value.";
      return;
    }

    let total = 0;
    const rows = [];
    let stopped = false;
    for (const value of values) {
      if (value === -1) {
        rows.push([String(value), String(total), "sentinel reached; stop"]);
        stopped = true;
        break;
      }
      total += value;
      rows.push([String(value), String(total), "accepted and added"]);
    }

    result.innerHTML = `
      ${tableMarkup(["Input", "Total", "Action"], rows)}
      <p><strong>Final output:</strong> ${total}</p>
      <p><strong>Sentinel found:</strong> ${stopped ? "yes" : "no; this input sequence would need another input"}</p>
    `;
  });
}

function setupChooser() {
  const select = document.querySelector("#scenarioSelect");
  const result = document.querySelector("#chooseResult");
  select.innerHTML = loopScenarios.map((item) => `<option value="${item.id}">${escapeHtml(item.text)}</option>`).join("");
  document.querySelector("#chooseBtn").addEventListener("click", () => {
    const item = loopScenarios.find((entry) => entry.id === select.value);
    result.innerHTML = `
      <p><strong>Recommendation:</strong> ${escapeHtml(item.recommendation)}</p>
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
      ${tableMarkup(["Input / case", "Condition / total", "Result"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("password");
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
      mark.textContent = correct ? "Correct. The condition-controlled loop idea is precise." : "Not quite. Check the condition timing, update or stopping value.";
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
setupSentinelTrace();
setupChooser();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
