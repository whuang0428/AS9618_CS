const loopScenarios = [
  {
    id: "fixedArray",
    text: "Output every value in Marks[1:30].",
    recommendation: "Use FOR",
    reason: "The loop must run once for each known index from 1 to 30.",
  },
  {
    id: "password",
    text: "Keep asking for a password until it is correct.",
    recommendation: "Use WHILE or REPEAT UNTIL, not usually FOR",
    reason: "The number of attempts is not known before the loop starts.",
  },
  {
    id: "sumTen",
    text: "Add the integers from 1 to 10.",
    recommendation: "Use FOR",
    reason: "The counter range is known exactly.",
  },
  {
    id: "readUntilEOF",
    text: "Read records until the end of a file is reached.",
    recommendation: "Use WHILE, not usually FOR",
    reason: "The number of records may not be known in advance.",
  },
];

const examples = {
  sum: {
    title: "Example 1: Sum 1 to 5",
    problem: "Use a FOR loop to calculate 1 + 2 + 3 + 4 + 5.",
    rows: [
      ["1", "1", "first update"],
      ["2", "3", "1 + 2"],
      ["3", "6", "3 + 3"],
      ["4", "10", "6 + 4"],
      ["5", "15", "10 + 5"],
    ],
    code: "Total <- 0\nFOR Count <- 1 TO 5\n    Total <- Total + Count\nNEXT Count\nOUTPUT Total",
    points: ["Total is initialised before the loop.", "Count controls the loop.", "The final output is 15."],
  },
  array: {
    title: "Example 2: Total an array",
    problem: "Find the total of 30 marks stored in Marks[1:30].",
    rows: [
      ["Initialise", "Total <- 0", "sets accumulator"],
      ["Loop", "FOR Index <- 1 TO 30", "matches array bounds"],
      ["Update", "Total <- Total + Marks[Index]", "adds one element per iteration"],
    ],
    code: "Total <- 0\nFOR Index <- 1 TO 30\n    Total <- Total + Marks[Index]\nNEXT Index\nOUTPUT Total",
    points: ["Use Index to access each element.", "The bounds should match Marks[1:30].", "Do not use Java's index 0 unless the pseudocode array is declared that way."],
  },
  count: {
    title: "Example 3: Count matching values",
    problem: "Count how many of 20 temperatures are above 30.",
    rows: [
      ["Initialise", "HotDays <- 0", "sets counter for matches"],
      ["Loop", "FOR Day <- 1 TO 20", "known 20 readings"],
      ["Selection", "IF Temperatures[Day] > 30", "checks each item"],
    ],
    code: "HotDays <- 0\nFOR Day <- 1 TO 20\n    IF Temperatures[Day] > 30 THEN\n        HotDays <- HotDays + 1\n    ENDIF\nNEXT Day\nOUTPUT HotDays",
    points: ["The FOR loop controls the fixed number of readings.", "The IF decides whether to increment HotDays.", "HotDays is a match counter, not the loop counter."],
  },
  offByOne: {
    title: "Example 4: Off-by-one error",
    problem: "A student must process 50 records but writes 1 TO 49.",
    rows: [
      ["Required", "50 records", "indexes 1 to 50"],
      ["Student loop", "1 TO 49", "only 49 iterations"],
      ["Correction", "1 TO 50", "processes all records"],
    ],
    code: "FOR Index <- 1 TO 50\n    PROCESS Record[Index]\nNEXT Index",
    points: ["Check whether the end bound is included.", "1 TO 49 misses item 50.", "A trace of counter values exposes the error."],
  },
};

const practice = [
  { id: "p1", prompt: "Which loop is normally used when the number of repetitions is known?", accepted: ["for", "for loop"], answer: "FOR loop." },
  { id: "p2", prompt: "What keyword closes a Cambridge-style FOR loop?", accepted: ["next", "next count", "next index"], answer: "NEXT, often written as NEXT Count or NEXT Index." },
  { id: "p3", prompt: "How many iterations are there in FOR Count <- 1 TO 5?", accepted: ["5", "five"], answer: "5 iterations." },
  { id: "p4", prompt: "Trace: Total <- 0; FOR Count <- 1 TO 4; Total <- Total + Count. Final Total?", accepted: ["10"], answer: "10." },
  { id: "p5", prompt: "What is the loop counter in FOR Index <- 1 TO 30?", accepted: ["index"], answer: "Index." },
  { id: "p6", prompt: "What variable role is Total in Total <- Total + Count?", accepted: ["accumulator", "running total"], answer: "Total is an accumulator or running total." },
  { id: "p7", prompt: "To process Marks[1:30], should the loop normally use 1 TO 30 or 0 TO 29?", accepted: ["1 to 30", "1 TO 30", "1"], answer: "1 TO 30, matching the pseudocode array bounds." },
  { id: "p8", prompt: "What common error means a loop runs one too many or one too few times?", accepted: ["off-by-one", "off by one", "offbyone"], answer: "Off-by-one error." },
  { id: "p9", prompt: "Should you use FOR to keep asking for input until it is valid? yes or no.", accepted: ["no"], answer: "No, usually use WHILE or REPEAT UNTIL because the number of attempts is not known." },
  { id: "p10", prompt: "What should be initialised before a loop that calculates a total?", accepted: ["total", "accumulator"], answer: "The accumulator, for example Total <- 0." },
];

const mistakes = [
  {
    wrong: "A student writes FOR Index <- 1 TO 29 to process Marks[1:30].",
    fix: "Use FOR Index <- 1 TO 30. The end bound should include the last declared element.",
  },
  {
    wrong: "A student uses a FOR loop to repeat until a password is correct.",
    fix: "Use WHILE or REPEAT UNTIL unless a fixed maximum number of attempts is stated.",
  },
  {
    wrong: "A student updates Total but never initialises it before the loop.",
    fix: "Set Total <- 0 before the loop so the accumulator has a known starting value.",
  },
  {
    wrong: "A student writes Java syntax for (int i = 0; i < 30; i++) in a Cambridge pseudocode answer.",
    fix: "Use Cambridge-style pseudocode such as FOR Index <- 1 TO 30 ... NEXT Index. Java is support only.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to output the numbers 1 to 10 using a count-controlled loop.",
    answer: "FOR Count <- 1 TO 10\n    OUTPUT Count\nNEXT Count",
    marking: [
      { mark: "B1", text: "uses a FOR/count-controlled loop" },
      { mark: "B1", text: "uses Count or equivalent loop counter" },
      { mark: "M1", text: "sets start value to 1" },
      { mark: "A1", text: "sets end value to 10" },
      { mark: "B1", text: "outputs the counter inside the loop" },
      { mark: "A1", text: "closes the loop with NEXT or equivalent" },
    ],
    strict: [
      "Do not award pseudocode style marks for Java-only for-loop syntax.",
      "Allow another meaningful counter identifier if used consistently.",
      "Do not accept a loop that outputs 0 to 9 unless the question has been reinterpreted and explained.",
      "FT: output mark can follow candidate's counter identifier.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Trace this pseudocode: Total <- 0; FOR Count <- 1 TO 5; Total <- Total + Count; NEXT Count; OUTPUT Total. Give the values of Total after each iteration and the final output.",
    answer: "Total after each iteration: 1, 3, 6, 10, 15. Final output: 15.",
    marking: [
      { mark: "M1", text: "initialises Total to 0" },
      { mark: "B1", text: "traces Count = 1 giving Total = 1" },
      { mark: "B1", text: "traces Count = 2 giving Total = 3" },
      { mark: "B1", text: "traces Count = 3 giving Total = 6" },
      { mark: "B1", text: "traces Count = 4 giving Total = 10" },
      { mark: "B1", text: "traces Count = 5 giving Total = 15" },
      { mark: "A1", text: "states final output 15" },
    ],
    strict: [
      "Do not award final output mark for 10 unless the candidate incorrectly stops at 4.",
      "Allow a clear trace table instead of prose.",
      "Do not accept only the final answer without trace values where trace is requested.",
      "FT: final output can follow a consistent trace with one arithmetic slip.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "An array Marks is declared as ARRAY[1:30] OF INTEGER. Write pseudocode to calculate and output the total of all marks.",
    answer: "Total <- 0\nFOR Index <- 1 TO 30\n    Total <- Total + Marks[Index]\nNEXT Index\nOUTPUT Total",
    marking: [
      { mark: "B1", text: "initialises Total or equivalent accumulator" },
      { mark: "M1", text: "uses a FOR loop to process a known number of elements" },
      { mark: "A1", text: "uses bounds 1 TO 30 matching the declared array" },
      { mark: "B1", text: "uses an index to access Marks[Index]" },
      { mark: "M1", text: "adds each array element to the accumulator" },
      { mark: "A1", text: "closes loop after processing each element" },
      { mark: "B1", text: "outputs the total after the loop" },
    ],
    strict: [
      "Do not award bounds mark for 0 TO 29 unless array bounds are explicitly changed.",
      "Allow Sum instead of Total.",
      "Do not accept output inside the loop as the final total unless a final output is also given.",
      "FT: accumulator marks can follow candidate's chosen variable name.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Explain why a FOR loop is suitable for processing 100 sensor readings stored in an array, and why it may not be suitable for reading input until a valid value is entered.",
    answer: "A FOR loop is suitable for 100 sensor readings because the number of repetitions is known and each array index can be processed once. It may not be suitable for input until valid because the number of attempts is not known before the loop starts.",
    marking: [
      { mark: "B1", text: "states FOR loop is suitable when repetition count is known" },
      { mark: "A1", text: "applies known count to 100 readings" },
      { mark: "B1", text: "states array indexes can be processed systematically" },
      { mark: "B1", text: "states validation attempts are not known in advance" },
      { mark: "M1", text: "contrasts count-controlled and condition-controlled repetition" },
      { mark: "A1", text: "suggests WHILE or REPEAT UNTIL as more suitable for unknown attempts" },
    ],
    strict: [
      "Do not award contrast mark for vague 'FOR is easier'.",
      "Allow fixed maximum attempts as a reason FOR could be used if explicitly stated.",
      "Do not accept that FOR is never suitable for validation without explanation.",
      "FT: alternative loop suggestions can earn credit if reasoned correctly.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student writes FOR Index <- 1 TO 49 to process an array Data[1:50]. Identify the error and give a corrected loop header. Explain the effect of the error.",
    answer: "The loop has an off-by-one error. It should be FOR Index <- 1 TO 50. The original loop processes only 49 elements and misses Data[50].",
    marking: [
      { mark: "B1", text: "identifies an off-by-one or incorrect end-bound error" },
      { mark: "A1", text: "gives corrected loop header FOR Index <- 1 TO 50 or equivalent" },
      { mark: "B1", text: "states the original loop runs 49 times" },
      { mark: "A1", text: "states Data[50] is missed" },
      { mark: "M1", text: "links correction to declared array bounds 1:50" },
      { mark: "B1", text: "uses accurate loop terminology such as counter, bound or iteration" },
    ],
    strict: [
      "Do not award correction mark for 0 TO 49 unless bounds are changed and explained.",
      "Allow 'last element is not processed' for Data[50] missed.",
      "Do not accept 'syntax error' alone.",
      "FT: effect marks can follow candidate's stated loop range if internally consistent.",
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
    four: "Not quite. The end value 5 is included, so 1, 2, 3, 4 and 5 all run.",
    five: "Correct. The loop runs for Count values 1 through 5 inclusive.",
    six: "No. That would count 0 through 5 or 1 through 6, not 1 through 5.",
    unknown: "The count is known because both the start and end bounds are given.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupTraceBuilder() {
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const start = Number(document.querySelector("#startInput").value);
    const end = Number(document.querySelector("#endInput").value);
    if (!Number.isInteger(start) || !Number.isInteger(end)) {
      result.textContent = "Use integer bounds for this trace.";
      return;
    }
    if (end < start) {
      result.textContent = "This simple builder expects the end bound to be greater than or equal to the start bound.";
      return;
    }
    if (end - start > 30) {
      result.textContent = "Use a smaller range for the classroom trace table.";
      return;
    }

    let total = 0;
    const rows = [];
    for (let count = start; count <= end; count += 1) {
      total += count;
      rows.push([String(count), String(total)]);
    }

    result.innerHTML = `
      <p><strong>Loop:</strong> FOR Count &lt;- ${start} TO ${end}</p>
      ${tableMarkup(["Count", "Total after update"], rows)}
      <p><strong>Iterations:</strong> ${rows.length}</p>
      <p><strong>Final Total:</strong> ${total}</p>
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
      ${tableMarkup(["Count / step", "Value", "Reason"], example.rows)}
      <p><strong>Cambridge-style pseudocode:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("sum");
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
      mark.textContent = correct ? "Correct. The loop concept or trace value is accurate." : "Not quite. Check the counter, bounds or accumulator.";
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
setupTraceBuilder();
setupChooser();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
