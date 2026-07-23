const dataSets = {
  scores: [72, 55, 91, 64],
  temps: [-3, -8, 2, -1],
  sales: [12, 0, 7, 5],
};

const chooserMap = {
  total: { title: "Running total", detail: "Use Total <- Total + Value for every value that must be included." },
  count: { title: "Conditional count", detail: "Use Count <- Count + 1 only when the value meets the condition." },
  maximum: { title: "Finding maximum", detail: "Keep the largest value seen so far and replace it when a larger value appears." },
  minimum: { title: "Finding minimum", detail: "Keep the smallest value seen so far and replace it when a smaller value appears." },
};

function formatList(values) {
  return values.join(", ");
}

function traceValues(values, goal) {
  let total = 0;
  let count = 0;
  let maximum = values[0];
  let minimum = values[0];
  const rows = [];

  values.forEach((value, index) => {
    const notes = [];
    if (goal === "total" || goal === "all") {
      total += value;
      notes.push(`Total updated to ${total}`);
    }
    if (goal === "countPositive" || goal === "all") {
      if (goal === "all" || value > 0) {
        if (goal === "all") {
          count += 1;
          notes.push(`Count updated to ${count}`);
        } else if (value > 0) {
          count += 1;
          notes.push(`Value > 0, Count updated to ${count}`);
        }
      } else {
        notes.push("Value is not > 0, Count unchanged");
      }
    }
    if ((goal === "maximum" || goal === "all") && index > 0 && value > maximum) {
      maximum = value;
      notes.push(`New maximum ${maximum}`);
    } else if ((goal === "maximum" || goal === "all") && index === 0) {
      notes.push(`Maximum initialised to ${maximum}`);
    }
    if ((goal === "minimum" || goal === "all") && index > 0 && value < minimum) {
      minimum = value;
      notes.push(`New minimum ${minimum}`);
    } else if ((goal === "minimum" || goal === "all") && index === 0) {
      notes.push(`Minimum initialised to ${minimum}`);
    }

    rows.push([
      String(index + 1),
      String(value),
      goal === "total" || goal === "all" ? String(total) : "-",
      goal === "countPositive" || goal === "all" ? String(count) : "-",
      goal === "maximum" || goal === "all" ? String(maximum) : "-",
      goal === "minimum" || goal === "all" ? String(minimum) : "-",
      notes.join("; "),
    ]);
  });

  const label = goal === "countPositive" ? "count of values greater than 0" : goal;
  return {
    headers: ["Step", "Value", "Total", "Count", "Maximum", "Minimum", "Note"],
    rows,
    note: `Final ${label}: ${goal === "total" ? total : goal === "countPositive" ? count : goal === "maximum" ? maximum : goal === "minimum" ? minimum : `Total ${total}, Count ${count}, Maximum ${maximum}, Minimum ${minimum}`}.`,
  };
}

const examples = {
  "total-average": {
    title: "Example 1: Total and average",
    problem: "Four scores are 72, 55, 91 and 64. Find the total and average.",
    trace: {
      headers: ["Score", "Total after update"],
      rows: [["72", "72"], ["55", "127"], ["91", "218"], ["64", "282"]],
      note: "Average <- 282 / 4 = 70.5.",
    },
    points: ["Initialise Total to 0.", "Add each score exactly once.", "Calculate the average after the loop."],
  },
  "count-pass": {
    title: "Example 2: Conditional count",
    problem: "Count how many of 72, 55, 91 and 64 are at least 60.",
    trace: {
      headers: ["Score", "Condition", "PassCount"],
      rows: [["72", "true", "1"], ["55", "false", "1"], ["91", "true", "2"], ["64", "true", "3"]],
      note: "Three scores are at least 60.",
    },
    points: ["Initialise Count to 0.", "Only increment when the condition is true.", "Do not add the score to Count."],
  },
  "max-min": {
    title: "Example 3: Maximum and minimum",
    problem: "Find the maximum and minimum of -3, -8, 2 and -1.",
    trace: traceValues([-3, -8, 2, -1], "all"),
    points: ["Use the first value to initialise Maximum and Minimum.", "Update Maximum when a larger value appears.", "Update Minimum when a smaller value appears."],
  },
  sentinel: {
    title: "Example 4: Sentinel input",
    problem: "Numbers are entered until -1: 4, 6, 2, -1. Find the total and count of valid numbers.",
    trace: {
      headers: ["Input", "Action", "Total", "Count"],
      rows: [["4", "process", "4", "1"], ["6", "process", "10", "2"], ["2", "process", "12", "3"], ["-1", "stop, do not process", "12", "3"]],
      note: "The sentinel -1 stops the loop and is not included in the total.",
    },
    points: ["Input once before the WHILE test.", "Process only while Number <> -1.", "Read the next number at the end of the loop."],
  },
};

const practice = [
  { id: "p1", prompt: "What value should Total usually be initialised to before adding values?", accepted: ["0", "zero"], answer: "0" },
  { id: "p2", prompt: "What value should Count usually be initialised to before counting items?", accepted: ["0", "zero"], answer: "0" },
  { id: "p3", prompt: "For unknown numeric ranges, what should Maximum usually be initialised from?", accepted: ["first value", "first input", "the first value", "first item", "first data value"], answer: "The first input / first data value" },
  { id: "p4", prompt: "After processing 5, 8, 2 with Total <- Total + Value, what is Total?", accepted: ["15"], answer: "15" },
  { id: "p5", prompt: "How many values in 5, 8, 2 are greater than 4?", accepted: ["2", "two"], answer: "2" },
  { id: "p6", prompt: "What is the maximum of -3, -8, 2, -1?", accepted: ["2"], answer: "2" },
  { id: "p7", prompt: "What is the minimum of -3, -8, 2, -1?", accepted: ["-8"], answer: "-8" },
  { id: "p8", prompt: "In inputs 4, 6, 2, -1 with -1 as sentinel, should -1 be added to Total? yes or no.", accepted: ["no"], answer: "No. The sentinel is not data." },
  { id: "p9", prompt: "Which loop is most suitable when exactly 6 values must be processed?", accepted: ["for", "for loop", "count controlled", "count-controlled", "count controlled loop"], answer: "A FOR / count-controlled loop" },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  { wrong: "Maximum <- 0, then the data values are -3, -8, -1.", fix: "Maximum would wrongly stay 0 even though 0 is not in the data. Initialise Maximum from the first input value." },
  { wrong: "Count <- Count + Value when counting how many values are positive.", fix: "A count increases by 1 for each matching item. Use Count <- Count + 1 inside the condition." },
  { wrong: "The sentinel -1 is added to the total before stopping.", fix: "Test the sentinel before processing it, or input before the loop and process only while Number <> -1." },
  { wrong: "Average is output after every input when the question asks for one final average.", fix: "Calculate and output the average after the loop has processed all required values." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "8 marks",
    prompt: "Trace the values of Total, Count, Maximum and Minimum after each value in the list 6, 3, 8, 2 is processed.",
    answer: "After 6: Total 6, Count 1, Maximum 6, Minimum 6.\nAfter 3: Total 9, Count 2, Maximum 6, Minimum 3.\nAfter 8: Total 17, Count 3, Maximum 8, Minimum 3.\nAfter 2: Total 19, Count 4, Maximum 8, Minimum 2.",
    marking: [
      { mark: "B1", text: "initialises / shows first row correctly for all variables" },
      { mark: "M1", text: "updates Total by adding each value" },
      { mark: "A1", text: "final Total is 19" },
      { mark: "M1", text: "updates Count once per processed value" },
      { mark: "A1", text: "final Count is 4" },
      { mark: "M1", text: "updates Maximum only when a larger value is found" },
      { mark: "M1", text: "updates Minimum only when a smaller value is found" },
      { mark: "A1", text: "final Maximum 8 and Minimum 2" },
    ],
    strict: [
      "Do not award full marks for final values only if trace rows are required.",
      "Allow equivalent table format.",
      "Do not accept Count as sum of the values.",
      "Allow FT from the candidate's earlier trace value only when every subsequent step applies the stated algorithm correctly.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Write Cambridge-style pseudocode to input 5 marks, output the total, and count how many marks are at least 50.",
    answer: "Total <- 0\nPassCount <- 0\nFOR Index <- 1 TO 5\n    INPUT Mark\n    Total <- Total + Mark\n    IF Mark >= 50 THEN\n        PassCount <- PassCount + 1\n    ENDIF\nNEXT Index\nOUTPUT Total\nOUTPUT PassCount",
    marking: [
      { mark: "B1", text: "initialises Total to 0" },
      { mark: "B1", text: "initialises PassCount / Count to 0" },
      { mark: "M1", text: "uses a loop to process exactly 5 marks" },
      { mark: "M1", text: "inputs Mark inside the loop" },
      { mark: "A1", text: "updates Total with Total <- Total + Mark" },
      { mark: "A1", text: "uses IF Mark >= 50 THEN Count <- Count + 1 and outputs both results" },
    ],
    strict: [
      "Do not accept Count <- Count + Mark for counting passes.",
      "Allow WHILE with a correctly controlled counter for five marks.",
      "Do not award Cambridge notation mark for Java-only braces and semicolons.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Write an algorithm to input 4 temperatures and output the highest and lowest temperature.",
    answer: "INPUT Temperature\nHighest <- Temperature\nLowest <- Temperature\nFOR Index <- 2 TO 4\n    INPUT Temperature\n    IF Temperature > Highest THEN\n        Highest <- Temperature\n    ENDIF\n    IF Temperature < Lowest THEN\n        Lowest <- Temperature\n    ENDIF\nNEXT Index\nOUTPUT Highest\nOUTPUT Lowest",
    marking: [
      { mark: "B1", text: "inputs first temperature before main comparison loop" },
      { mark: "B1", text: "initialises Highest from first input value" },
      { mark: "B1", text: "initialises Lowest from first input value" },
      { mark: "M1", text: "processes the remaining three temperatures using a loop" },
      { mark: "A1", text: "correct greater-than comparison and update for Highest" },
      { mark: "A1", text: "correct less-than comparison and update for Lowest" },
    ],
    strict: [
      "Do not require variable names Highest/Lowest if meanings are clear.",
      "Do not accept initialising Highest to 0 where temperatures may be negative.",
      "Allow loop from 1 to 4 if the first iteration has a valid special case.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A program reads numbers until -1 is entered and should output the total of entered numbers. Explain why this pseudocode is wrong: INPUT Number; WHILE Number <> -1; Total <- Total + Number; ENDWHILE.",
    answer: "Total is not initialised, so the first addition may use an undefined value. There is no new INPUT Number inside the loop, so if the first number is not -1 the loop may never stop. The sentinel -1 must be tested before it is processed, and the next number must be read before the next test.",
    marking: [
      { mark: "B1", text: "identifies Total is not initialised" },
      { mark: "B1", text: "explains undefined/unknown starting total consequence" },
      { mark: "B1", text: "identifies missing input inside loop" },
      { mark: "B1", text: "explains loop may not terminate / same Number repeatedly tested" },
      { mark: "B1", text: "states sentinel should not be processed and next input is needed before retesting" },
    ],
    strict: [
      "Do not award both mechanism marks for only saying 'it will not work'.",
      "Allow 'infinite loop' for non-termination.",
      "Do not require rewritten pseudocode, but a valid correction can earn explanation marks.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Compare finding a total, a count and a maximum. Refer to initialisation and update conditions.",
    answer: "A total is usually initialised to 0 and updated by adding each value. A count is usually initialised to 0 and updated by adding 1 for each processed or matching item. A maximum should be initialised from a real data value when the possible range is unknown, then updated only when a larger value is found. The total and count usually update every relevant iteration, while maximum updates only when the comparison is true.",
    marking: [
      { mark: "B1", text: "states total initialised to 0" },
      { mark: "B1", text: "states total updated by adding value" },
      { mark: "B1", text: "states count initialised to 0" },
      { mark: "B1", text: "states count updated by adding 1" },
      { mark: "B1", text: "states maximum should be initialised from a real value when range is unknown" },
      { mark: "B1", text: "states maximum is updated only when the current value is greater than Maximum" },
    ],
    strict: [
      "Do not accept vague 'they store numbers' for comparison marks.",
      "Allow minimum discussion as an extension, but question requires maximum.",
      "Do not require Big O notation.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9,\\[\\] <>+=.-]/g, "");
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
    count: "Correct. Count <- Count + 1 records that one more score has been processed.",
    total: "That updates the running total, not the number of values.",
    max: "That updates the maximum only when a new high score appears.",
    output: "Output before the loop would show an initial or old value, not the processed count.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChooser() {
  const input = document.querySelector("#chooserInput");
  const result = document.querySelector("#chooserResult");
  document.querySelector("#chooserBtn").addEventListener("click", () => {
    const item = chooserMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupTraceTool() {
  const dataInput = document.querySelector("#dataInput");
  const goalInput = document.querySelector("#goalInput");
  const result = document.querySelector("#traceResult");
  document.querySelector("#traceBtn").addEventListener("click", () => {
    const values = dataSets[dataInput.value];
    const trace = traceValues(values, goalInput.value);
    result.innerHTML = `<p><strong>Data:</strong> ${formatList(values)}</p>${tableMarkup(trace.headers, trace.rows)}<p>${trace.note}</p>`;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    ${tableMarkup(example.trace.headers, example.trace.rows)}
    <p>${example.trace.note}</p>
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
  renderExample("total-average");
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
        <p><strong>Mark scheme:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
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
setupChooser();
setupTraceTool();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
