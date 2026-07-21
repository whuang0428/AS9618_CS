const errorTypes = {
  file: {
    type: "Knowledge and method error",
    diagnosis: "WRITE may replace existing contents. Adding a new record should use APPEND.",
    correction: 'Rule: use OPENFILE "FileName" FOR APPEND when preserving existing records and adding to the end.',
  },
  trace: {
    type: "Method evidence error",
    diagnosis: "The final output may be correct, but a trace question often awards marks for intermediate values.",
    correction: "Rule: show a trace table with variable values after each relevant step or loop iteration.",
  },
  stack: {
    type: "Precision error",
    diagnosis: "The answer names a structure but gives a generic reason. It must justify stack using LIFO.",
    correction: "Rule: justify data structures using access pattern, such as LIFO for stack or FIFO for queue.",
  },
  eval: {
    type: "Evaluation evidence error",
    diagnosis: "User opinion alone is weak unless linked to measurable criteria or evidence.",
    correction: "Rule: evaluation compares evidence with requirements or success criteria and makes a judgement.",
  },
};

const rewrites = {
  stack: {
    weak: "Use a stack because it stores data.",
    improved: "Use a stack because the most recent item must be removed first, so the access pattern is last-in, first-out.",
    mark: "Adds the missing LIFO justification.",
  },
  test: {
    weak: "Use boundary data because it is better.",
    improved: "Use boundary data because it tests values at or just outside the limit, which can reveal off-by-one errors in validation logic.",
    mark: "Explains why boundary data is useful.",
  },
  eval: {
    weak: "The system is good because users like it.",
    improved: "The system meets the usability criterion if user trial evidence shows at least 90% of users completed the task in under 2 minutes.",
    mark: "Links judgement to measurable evidence and success criteria.",
  },
};

const examples = {
  pseudocode: {
    title: "Example 1: Pseudocode correction",
    rows: [
      ["Original", "Loop through marks and count passes."],
      ["Lost mark", "No initialisation and no precise condition."],
      ["Correction rule", "Initialise counters before the loop and state the pass condition exactly."],
      ["Rewrite", "SET PassCount TO 0; IF Mark >= 50 THEN PassCount = PassCount + 1."],
    ],
  },
  structure: {
    title: "Example 2: Data structure correction",
    rows: [
      ["Original", "Use a queue because it stores jobs."],
      ["Lost mark", "No FIFO justification."],
      ["Correction rule", "Justify structures by operation pattern."],
      ["Rewrite", "Use a queue because the first print job submitted should be processed first, so FIFO matches the scenario."],
    ],
  },
  evaluation: {
    title: "Example 3: Evaluation correction",
    rows: [
      ["Original", "The system is successful because it works."],
      ["Lost mark", "No evidence or success criterion."],
      ["Correction rule", "Compare measured evidence with the criterion and make a judgement."],
      ["Rewrite", "The criterion is met because 94% of users completed sign-up within 2 minutes, exceeding the 90% target."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What file mode adds a record without deleting old records?", accepted: ["append"], answer: "APPEND." },
  { id: "p2", prompt: "What access pattern justifies a stack?", accepted: ["lifo", "last in", "last-in"], answer: "LIFO / last-in, first-out." },
  { id: "p3", prompt: "What access pattern justifies a queue?", accepted: ["fifo", "first in", "first-in"], answer: "FIFO / first-in, first-out." },
  { id: "p4", prompt: "What should be shown in a trace table?", accepted: ["variable", "values", "iteration"], answer: "Variable values after relevant steps or iterations." },
  { id: "p5", prompt: "What must test data include besides input data?", accepted: ["expected", "result", "output"], answer: "Expected result / expected output." },
  { id: "p6", prompt: "What should evaluation compare evidence against?", accepted: ["success criteria", "criteria", "requirements"], answer: "Requirements or success criteria." },
  { id: "p7", prompt: "What should a counter be given before it is used?", accepted: ["initial", "initialised", "initialized", "0"], answer: "An initial value, often 0." },
  { id: "p8", prompt: "Which Paper 2 section focuses on data structures?", accepted: ["10", "section 10"], answer: "Section 10." },
  { id: "p9", prompt: "Which Paper 2 section focuses on software development?", accepted: ["12", "section 12"], answer: "Section 12." },
  { id: "p10", prompt: "What language style should final algorithm answers use in Cambridge Paper 2?", accepted: ["pseudocode", "cambridge"], answer: "Cambridge-style pseudocode." },
];

const mistakes = [
  {
    wrong: "A correction says: 'I need to revise stacks.'",
    fix: "Correction: make it precise: 'A stack is LIFO, so it is suitable when the most recent item is removed first, such as undo.'",
  },
  {
    wrong: "A correction copies the model answer but does not say why the original lost marks.",
    fix: "Correction: identify the missing mark first, such as no expected result, no initialisation, or no scenario-specific consequence.",
  },
  {
    wrong: "A student marks every error as 'careless'.",
    fix: "Correction: classify errors into knowledge, method, precision or exam technique. 'Careless' is too vague to train.",
  },
  {
    wrong: "A student fixes one question but never tries a similar question.",
    fix: "Correction: add a retest. The correction is only reliable if it transfers to a new but similar prompt.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A student answered: 'Use a stack because it stores data.' Explain why this answer loses marks and rewrite it for a scenario where recent edits must be undone first.",
    answer: "The answer loses marks because 'stores data' is a generic reason and does not explain why a stack is suitable. A stronger answer is: use a stack because the most recent edit must be undone first, so the access pattern is last-in, first-out.",
    marking: [
      { mark: "B1", text: "identifies the original answer is too vague/generic" },
      { mark: "M1", text: "states that the justification must link to the scenario" },
      { mark: "B1", text: "names stack as suitable for undo/recent edits" },
      { mark: "A1", text: "uses LIFO or last-in, first-out correctly" },
      { mark: "A1", text: "links most recent edit to first item removed" },
      { mark: "A1", text: "rewritten answer is clear and scenario-specific" },
    ],
    strict: [
      "Do not award full marks for 'stack is better' without LIFO or recent-first reasoning.",
      "Allow equivalent undo/history examples.",
      "Do not accept FIFO as stack justification.",
      "FT: if candidate chooses queue, structure marks are lost but generic error diagnosis may still be credited.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "A mock answer opens Scores.txt for WRITE to add one new score at the end. Explain the error and give corrected file-handling steps.",
    answer: "The error is using WRITE when the existing scores need to be preserved. The file should be opened for APPEND. Correct steps: OPENFILE Scores.txt FOR APPEND, WRITEFILE the new score, then CLOSEFILE Scores.txt. APPEND adds the record to the end without deleting existing records.",
    marking: [
      { mark: "B1", text: "identifies WRITE as the error or unsuitable mode" },
      { mark: "M1", text: "explains existing records need to be preserved" },
      { mark: "M1", text: "opens file for APPEND" },
      { mark: "M1", text: "writes the new score/record" },
      { mark: "A1", text: "closes the file after writing" },
      { mark: "A1", text: "explains APPEND adds to the end" },
      { mark: "A1", text: "explains APPEND does not delete existing records" },
    ],
    strict: [
      "Do not accept READ as a corrected mode for adding a new record.",
      "Allow clear structured English or Cambridge-style pseudocode.",
      "Do not require exact filename quote marks.",
      "FT: if mode is wrong but write/close sequence is correct, credit independent method marks cautiously.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A student gives test data for a mark validation question but no expected results. Explain why this loses marks and improve the answer for range 0 to 100 inclusive.",
    answer: "Test data without expected results does not show what the program should do. Improved answer: normal data 75 should be accepted; boundary data 0 and 100 should be accepted; invalid boundary data minus 1 and 101 should be rejected; abnormal data such as text should be rejected with an error message.",
    marking: [
      { mark: "B1", text: "explains expected results are needed" },
      { mark: "M1", text: "normal valid data with expected accepted result" },
      { mark: "M1", text: "valid boundary data 0 or 100 with expected accepted result" },
      { mark: "A1", text: "shows inclusive endpoints are accepted" },
      { mark: "M1", text: "invalid boundary or abnormal data with expected rejected result" },
      { mark: "A1", text: "answer clearly links data to validation range 0 to 100" },
    ],
    strict: [
      "Do not accept 50 as boundary data.",
      "Allow equivalent normal and abnormal values.",
      "Do not award expected-result marks where only data values are listed.",
      "FT: if candidate uses another explicit range, credit consistent logic but not the 0/100-specific mark.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A student wrote: 'The system is successful because users like it.' Rewrite this as an evaluation answer using success criteria and evidence.",
    answer: "The system meets the usability success criterion if trial evidence shows at least 90% of users completed the task in under 2 minutes. If the evidence is 94%, the criterion is met because 94% is above the 90% target. A limitation is that feedback from the remaining users could still be used for perfective maintenance.",
    marking: [
      { mark: "B1", text: "identifies or uses a measurable success criterion" },
      { mark: "M1", text: "uses evidence from trial/user data" },
      { mark: "M1", text: "compares evidence with the criterion" },
      { mark: "A1", text: "makes a judgement about whether criterion is met" },
      { mark: "A1", text: "recognises limitation or remaining users" },
      { mark: "A1", text: "links follow-up to improvement/maintenance" },
    ],
    strict: [
      "Do not award full marks for user opinion alone.",
      "Allow different measurable thresholds if clearly compared with evidence.",
      "Do not require the exact 90% and 94% values unless chosen by candidate.",
      "FT: credit any evidence-based evaluation with a clear judgement.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Describe a useful correction plan after a Paper 2 mock paper.",
    answer: "First classify each lost mark as knowledge, method, precision or exam technique. Then write the missing mark or rule, such as 'counter must be initialised before the loop'. Rewrite the answer using accurate Cambridge-style pseudocode or precise explanation. Finally, answer a similar retest question to check that the correction transfers.",
    marking: [
      { mark: "B1", text: "classifies or groups errors by type" },
      { mark: "M1", text: "identifies missing mark/rule or reason for lost mark" },
      { mark: "M1", text: "rewrites answer accurately" },
      { mark: "A1", text: "uses Cambridge-style pseudocode or precise terminology where relevant" },
      { mark: "M1", text: "uses a similar retest question/practice task" },
      { mark: "A1", text: "explains retest checks transfer or prevents repeated error" },
    ],
    strict: [
      "Do not award full marks for 'revise more' without a concrete correction process.",
      "Allow different error categories if they are useful and specific.",
      "Do not require all four named categories if classification is clear.",
      "FT: credit any practical correction plan that includes diagnosis, rewrite and retest.",
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

function tableMarkup(rows) {
  return `
    <div class="data-table two-col">
      <div class="table-row table-head"><div>Focus</div><div>Detail</div></div>
      ${rows.map((row) => `<div class="table-row"><div>${escapeHtml(row[0])}</div><div>${escapeHtml(row[1])}</div></div>`).join("")}
    </div>
  `;
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    arithmetic: { text: "No calculation is involved. This diagnosis would not help the student fix the answer.", correct: false },
    justification: { text: "Correct. The answer names the structure but does not justify it with LIFO or scenario logic.", correct: true },
    syntax: { text: "There is no file statement here. The problem is explanation precision.", correct: false },
    timing: { text: "Timing may matter, but the visible error is missing justification.", correct: false },
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

function setupErrorTool() {
  const select = document.querySelector("#errorSelect");
  const output = document.querySelector("#errorOutput");
  const render = () => {
    const item = errorTypes[select.value];
    output.innerHTML = `
      <p><strong>Error type:</strong> ${escapeHtml(item.type)}</p>
      <p><strong>Diagnosis:</strong> ${escapeHtml(item.diagnosis)}</p>
      <p><strong>Correction:</strong> ${escapeHtml(item.correction)}</p>
    `;
  };
  document.querySelector("#errorBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupRewriteTool() {
  const select = document.querySelector("#rewriteSelect");
  const output = document.querySelector("#rewriteOutput");
  const render = () => {
    const item = rewrites[select.value];
    output.innerHTML = `
      <p><strong>Weak:</strong> ${escapeHtml(item.weak)}</p>
      <p><strong>Improved:</strong> ${escapeHtml(item.improved)}</p>
      <p><strong>Recovered mark:</strong> ${escapeHtml(item.mark)}</p>
    `;
  };
  document.querySelector("#rewriteBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupExamples() {
  const output = document.querySelector("#exampleOutput");
  const render = (key) => {
    const item = examples[key];
    output.innerHTML = `<h3>${escapeHtml(item.title)}</h3>${tableMarkup(item.rows)}`;
    document.querySelectorAll("[data-example]").forEach((button) => {
      button.classList.toggle("active", button.dataset.example === key);
    });
  };
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.example));
  });
  render("pseudocode");
}

function setupPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <article class="practice-card">
      <h3>Practice ${index + 1}</h3>
      <p>${escapeHtml(item.prompt)}</p>
      <div class="answer-row">
        <input id="${item.id}" type="text" autocomplete="off" aria-label="Answer for practice ${index + 1}" />
        <button class="check-btn" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="feedback" id="${item.id}-feedback" aria-live="polite">Enter an answer, then check.</div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel hidden" id="${item.id}-answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const input = document.querySelector(`#${item.id}`);
      const feedback = document.querySelector(`#${item.id}-feedback`);
      const response = normalise(input.value);
      const correct = item.accepted.some((accepted) => response.includes(accepted));
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Use the precise correction-clinic keyword.";
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
  const list = document.querySelector("#mistakeList");
  list.innerHTML = mistakes.map((item, index) => `
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
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(item.title)}</h3>
        <span>${escapeHtml(item.marks)}</span>
      </div>
      <p>${escapeHtml(item.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="q${index}">Show MS</button>
      <div class="ms-panel hidden" id="q${index}-ms">
        <h4>Indicative answer</h4>
        <p>${escapeHtml(item.answer)}</p>
        <h4>Mark scheme</h4>
        <ul>
          ${item.marking.map((mark) => `<li><strong>${escapeHtml(mark.mark)}</strong> ${escapeHtml(mark.text)}</li>`).join("")}
        </ul>
        <h4>Strict notes</h4>
        <ul>
          ${item.strict.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
        </ul>
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
  setupErrorTool();
  setupRewriteTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
