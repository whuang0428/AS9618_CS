const scores = [42, 67, 55, 81, 49];

const patternMap = {
  output: {
    title: "Traversal",
    code: "FOR Index <- 1 TO 5\n    OUTPUT Scores[Index]\nNEXT Index",
    reason: "Every element is visited once and output.",
  },
  bonus: {
    title: "Conditional update",
    code: "FOR Index <- 1 TO 5\n    IF Scores[Index] < 50 THEN\n        Scores[Index] <- Scores[Index] + 5\n    ENDIF\nNEXT Index",
    reason: "Only elements below 50 are changed.",
  },
  find: {
    title: "Linear search",
    code: "Found <- FALSE\nFOR Index <- 1 TO 5\n    IF Names[Index] = TargetName THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nOUTPUT Found",
    reason: "Each element is compared with the target and a flag records the result.",
  },
  count: {
    title: "Conditional count",
    code: "PassCount <- 0\nFOR Index <- 1 TO 5\n    IF Scores[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
    reason: "The counter increases only when the condition is true.",
  },
  total: {
    title: "Running total",
    code: "Total <- 0\nFOR Index <- 1 TO 5\n    Total <- Total + Scores[Index]\nNEXT Index\nOUTPUT Total",
    reason: "The running total includes every array element.",
  },
};

const examples = {
  traversal: {
    title: "Example 1: Traversal",
    problem: "Output all values in Scores[1:5].",
    rows: [
      ["Initialise", "not needed", "no running variable"],
      ["Loop", "FOR Index <- 1 TO 5", "all valid indexes"],
      ["Action", "OUTPUT Scores[Index]", "one element each iteration"],
    ],
    code: patternMap.output.code,
    points: ["The loop bounds match the array.", "The array is accessed with an index.", "No element is skipped."],
  },
  update: {
    title: "Example 2: Conditional update",
    problem: "Add 5 bonus marks to scores below 50.",
    rows: [
      ["Condition", "Scores[Index] < 50", "only low scores change"],
      ["Assignment", "Scores[Index] <- Scores[Index] + 5", "same element updated"],
      ["Unchanged values", ">= 50", "do not enter IF body"],
    ],
    code: patternMap.bonus.code,
    points: ["The update is inside the IF.", "Only the selected element changes.", "Use the old element value on the right side."],
  },
  search: {
    title: "Example 3: Linear search",
    problem: "Check whether a target name is in Names[1:5].",
    rows: [
      ["Flag", "Found <- FALSE", "target not seen yet"],
      ["Compare", "Names[Index] = TargetName", "one element at a time"],
      ["Update", "Found <- TRUE", "target appears"],
    ],
    code: patternMap.find.code,
    points: ["Found is initialised before the loop.", "The comparison uses indexed access.", "Output after the loop reports the result."],
  },
  count: {
    title: "Example 4: Conditional count",
    problem: "Count how many scores are at least 50.",
    rows: [
      ["Initialise", "PassCount <- 0", "before loop"],
      ["Condition", "Scores[Index] >= 50", "pass threshold"],
      ["Increment", "PassCount <- PassCount + 1", "only when true"],
    ],
    code: patternMap.count.code,
    points: ["Counter starts at 0.", "Counter changes only inside the IF.", "Final output is after traversal."],
  },
};

const practice = [
  { id: "p1", prompt: "Which pattern visits every element once?", accepted: ["traversal", "traverse"], answer: "Traversal." },
  { id: "p2", prompt: "Which pattern uses a Found flag?", accepted: ["search", "linear search"], answer: "Search / linear search." },
  { id: "p3", prompt: "Which pattern increments Count only when a condition is true?", accepted: ["count", "conditional count", "counting"], answer: "Conditional count." },
  { id: "p4", prompt: "Where should Total <- Total + Scores[Index] be placed to include every element?", accepted: ["inside loop", "inside the loop"], answer: "Inside the loop." },
  { id: "p5", prompt: "For Scores[1:5], should the loop be Index <- 1 TO 5 or 0 TO 4 in Cambridge pseudocode?", accepted: ["1 to 5", "index <- 1 to 5", "1"], answer: "Index <- 1 TO 5, unless different bounds are declared." },
  { id: "p6", prompt: "If scores are 42, 67, 55, 81, 49, how many are >= 50?", accepted: ["3"], answer: "3." },
  { id: "p7", prompt: "If Total starts at 0, what is the total of 42, 67 and 55?", accepted: ["164"], answer: "164." },
  { id: "p8", prompt: "In Scores[Index] <- Scores[Index] + 5, does the whole array change or one element?", accepted: ["one element", "element", "one"], answer: "One element at the current index." },
  { id: "p9", prompt: "Should Found usually be initialised before or after the search loop?", accepted: ["before", "before loop", "before the loop"], answer: "Before the loop." },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 answer format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  {
    wrong: "I wrote IF Scores >= 50 THEN instead of using an element.",
    fix: "Use indexed access: IF Scores[Index] >= 50 THEN. The whole array cannot be compared as one mark.",
  },
  {
    wrong: "I initialised PassCount inside the loop.",
    fix: "Initialise PassCount before the loop. If it is set to 0 each iteration, the previous count is lost.",
  },
  {
    wrong: "I output the final count inside the loop.",
    fix: "Output the final count after the loop unless the question asks for a running count.",
  },
  {
    wrong: "I copied Java indexes into Cambridge pseudocode.",
    fix: "Use the bounds declared in the question, for example ARRAY[1:5] means FOR Index <- 1 TO 5.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write pseudocode to count how many values in Scores[1:20] are greater than or equal to 50.",
    answer: "PassCount <- 0\nFOR Index <- 1 TO 20\n    IF Scores[Index] >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT PassCount",
    marking: [
      { mark: "B1", text: "initialises PassCount/count to 0" },
      { mark: "M1", text: "uses loop covering indexes 1 to 20" },
      { mark: "M1", text: "accesses Scores[Index] or equivalent indexed element" },
      { mark: "A1", text: "tests element >= 50" },
      { mark: "A1", text: "increments count only when condition is true" },
      { mark: "B1", text: "outputs final count after loop" },
    ],
    strict: [
      "Do not award condition mark for IF Scores >= 50 without index.",
      "Allow > 49 as equivalent condition.",
      "Do not award final output mark if only running counts are output inside the loop.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Scores[1:5] stores 42, 67, 55, 81, 49. Trace PassCount after counting scores >= 50.",
    answer: "PassCount starts at 0. Index 1, 42 is not >= 50 so PassCount remains 0. Index 2, 67 is >= 50 so PassCount becomes 1. Index 3, 55 is >= 50 so PassCount becomes 2. Index 4, 81 is >= 50 so PassCount becomes 3. Index 5, 49 is not >= 50 so final PassCount is 3.",
    marking: [
      { mark: "B1", text: "PassCount starts at 0" },
      { mark: "A1", text: "PassCount remains 0 after 42" },
      { mark: "A1", text: "PassCount becomes 1 after 67" },
      { mark: "A1", text: "PassCount becomes 2 after 55" },
      { mark: "A1", text: "PassCount becomes 3 after 81" },
      { mark: "A1", text: "PassCount remains 3 after 49" },
      { mark: "B1", text: "final PassCount = 3 clearly stated" },
    ],
    strict: [
      "Award values in iteration order.",
      "Allow trace table format.",
      "Do not award final mark if 49 is counted as passing.",
    ],
  },
  {
    title: "Question 3",
    marks: "8 marks",
    prompt: "Write pseudocode to search Codes[1:30] for TargetCode and output Found or Not found.",
    answer: "Found <- FALSE\nFOR Index <- 1 TO 30\n    IF Codes[Index] = TargetCode THEN\n        Found <- TRUE\n    ENDIF\nNEXT Index\nIF Found = TRUE THEN\n    OUTPUT \"Found\"\nELSE\n    OUTPUT \"Not found\"\nENDIF",
    marking: [
      { mark: "B1", text: "initialises Found to FALSE" },
      { mark: "M1", text: "uses loop covering indexes 1 to 30" },
      { mark: "M1", text: "accesses Codes[Index] or equivalent" },
      { mark: "A1", text: "compares element with TargetCode" },
      { mark: "A1", text: "sets Found to TRUE when match found" },
      { mark: "B1", text: "outputs Found when Found is TRUE" },
      { mark: "B1", text: "outputs Not found when Found is FALSE" },
      { mark: "B1", text: "uses clear Cambridge-style block structure" },
    ],
    strict: [
      "Do not award comparison mark for comparing Codes without an index.",
      "Allow early exit if logic remains correct.",
      "Do not require exact output strings if meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Write pseudocode to add 5 to every value in Marks[1:10] that is below 40.",
    answer: "FOR Index <- 1 TO 10\n    IF Marks[Index] < 40 THEN\n        Marks[Index] <- Marks[Index] + 5\n    ENDIF\nNEXT Index",
    marking: [
      { mark: "M1", text: "uses loop covering indexes 1 to 10" },
      { mark: "M1", text: "accesses Marks[Index] or equivalent indexed element" },
      { mark: "A1", text: "tests element < 40" },
      { mark: "A1", text: "updates the same indexed element" },
      { mark: "A1", text: "adds 5 to existing value, not replaces with 5" },
      { mark: "B1", text: "does not change values that are 40 or above" },
    ],
    strict: [
      "Do not award update mark if assignment is Marks[Index] <- 5.",
      "Allow <= 39 for integer marks.",
      "Do not award condition mark if the whole array is compared.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student initialises Count <- 0 inside the loop used to count negative values in Data[1:50]. Explain the error and correct it.",
    answer: "The error is that Count is reset to 0 on every iteration, so previous negative values that were counted are lost. Count should be initialised once before the loop. Inside the loop, the algorithm should test Data[Index] < 0 and increment Count only when that condition is true.",
    marking: [
      { mark: "B1", text: "identifies Count is reset each iteration" },
      { mark: "B1", text: "explains previous count is lost" },
      { mark: "B1", text: "states Count should be initialised before the loop" },
      { mark: "B1", text: "uses indexed condition Data[Index] < 0" },
      { mark: "B1", text: "increments Count only when condition is true" },
    ],
    strict: [
      "Do not accept only 'it is in the wrong place' without explaining reset/loss.",
      "Allow negative test phrased as less than zero.",
      "Do not award indexed condition mark for testing Data without index.",
      "Allow an equivalent counter if it is used consistently.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 <>=+-]/g, "");
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
  const responses = {
    traversal: "Traversal is part of it, but the task also counts selected elements.",
    update: "No element is changed here; only a counter changes.",
    search: "Search asks whether a target exists. This asks how many scores satisfy a condition.",
    count: "Correct. The array is traversed and the counter increases only for scores at least 50.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupPatternSelector() {
  const input = document.querySelector("#patternInput");
  const result = document.querySelector("#patternResult");
  document.querySelector("#patternBtn").addEventListener("click", () => {
    const item = patternMap[input.value];
    result.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
      <p>${escapeHtml(item.reason)}</p>
    `;
  });
}

function setupTraceRunner() {
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const threshold = Number(document.querySelector("#thresholdInput").value);
    let count = 0;
    const rows = scores.map((score, index) => {
      const passed = score >= threshold;
      if (passed) count += 1;
      return [String(index + 1), String(score), passed ? "TRUE" : "FALSE", String(count)];
    });
    result.innerHTML = `
      <p>Counting scores greater than or equal to ${threshold}.</p>
      ${tableMarkup(["Index", "Score", "Condition", "Count"], rows)}
      <p><strong>Final count: ${count}</strong></p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Step", "Code / value", "Reason"], example.rows)}
    <p><strong>Cambridge-style pseudocode:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("traversal");
  document.querySelectorAll("[data-example]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderExample(tab.dataset.example);
    });
  });
}

function renderPractice() {
  const container = document.querySelector("#practiceList");
  container.innerHTML = practice.map((item, index) => `
    <article class="practice-item">
      <h3>${index + 1}. ${escapeHtml(item.prompt)}</h3>
      <div class="practice-row">
        <input type="text" id="${item.id}" aria-label="Answer for practice question ${index + 1}" />
        <button class="primary-button" type="button" data-check="${item.id}">Check</button>
      </div>
      <div class="mark" id="${item.id}Mark" aria-live="polite"></div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer">${escapeHtml(item.answer)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = practice.find((entry) => entry.id === button.dataset.check);
      const value = normalise(document.querySelector(`#${item.id}`).value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      const mark = document.querySelector(`#${item.id}Mark`);
      mark.textContent = correct ? "Correct. The algorithm pattern is clear." : "Not quite. Check the pattern, index or update placement.";
      mark.className = correct ? "mark correct" : "mark incorrect";
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <h3>Mistake ${index + 1}</h3>
      <p class="wrong">${escapeHtml(item.wrong)}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}">${escapeHtml(item.fix)}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  const container = document.querySelector("#examList");
  container.innerHTML = examQuestions.map((question, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${escapeHtml(question.title)}</h3>
        <span>${escapeHtml(question.marks)}</span>
      </div>
      <p>${escapeHtml(question.prompt)}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <p><strong>Indicative answer:</strong></p>
        <pre><code>${escapeHtml(question.answer)}</code></pre>
        <p><strong>Mark scheme:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupPatternSelector();
setupTraceRunner();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
