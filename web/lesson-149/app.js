const timingPlans = {
  4: {
    plan: "30 sec read, 3 min write, 30 sec check.",
    advice: "Aim for one clear loop or one clear decision. Do not over-engineer.",
  },
  6: {
    plan: "60 sec read, 5 min write, 60 sec check.",
    advice: "List variables first, then write initialisation, loop, condition and output.",
  },
  8: {
    plan: "90 sec read, 7 min write, 90 sec check.",
    advice: "Expect two linked skills, such as file reading plus selection, or array processing plus validation.",
  },
  10: {
    plan: "2 min read, 9 min write, 2 min check.",
    advice: "Build a full skeleton first. Leave no file unclosed and no counter uninitialised.",
  },
};

const skeletons = {
  count: {
    title: "Count passing marks in an array",
    code: `SET PassCount TO 0
FOR Index TO 1 TO NumberOfMarks
    IF Marks[Index] >= 50 THEN
        SET PassCount TO PassCount + 1
    ENDIF
NEXT Index
OUTPUT PassCount`,
    check: "Boundary check: a mark of 50 should be counted if the condition is greater than or equal to 50.",
  },
  file: {
    title: "Read all records from a file",
    code: `OPENFILE "Scores.txt" FOR READ
WHILE NOT EOF("Scores.txt")
    READFILE "Scores.txt", ScoreRecord
    OUTPUT ScoreRecord
ENDWHILE
CLOSEFILE "Scores.txt"`,
    check: "File check: read inside the loop and close the file after the loop.",
  },
  validate: {
    title: "Validate mark input",
    code: `REPEAT
    INPUT Mark
    IF Mark < 0 OR Mark > 100 THEN
        OUTPUT "Invalid mark"
    ENDIF
UNTIL Mark >= 0 AND Mark <= 100`,
    check: "Boundary check: 0 and 100 are valid because the range is inclusive.",
  },
  largest: {
    title: "Find largest value in an array",
    code: `SET Largest TO Values[1]
FOR Index TO 2 TO NumberOfValues
    IF Values[Index] > Largest THEN
        SET Largest TO Values[Index]
    ENDIF
NEXT Index
OUTPUT Largest`,
    check: "Initialisation check: use the first value, not 0, unless the values are known non-negative.",
  },
};

const examples = {
  count: {
    title: "Example 1: Count with boundary condition",
    rows: [
      ["Task", "Count marks greater than or equal to 50."],
      ["Skeleton", "Initialise count, loop through marks, use IF, increment count, output after loop."],
      ["Fast check", "Marks 49, 50, 72 should give count 2."],
      ["Exam point", "The output belongs after the loop, not inside it, unless every step must be displayed."],
    ],
  },
  file: {
    title: "Example 2: File read answer",
    rows: [
      ["Task", "Read all records from Scores.txt."],
      ["Skeleton", "OPENFILE for READ, WHILE NOT EOF, READFILE, process record, CLOSEFILE."],
      ["Fast check", "The loop should stop at end of file and should not try to read after closing."],
      ["Exam point", "EOF logic and CLOSEFILE often earn separate marks."],
    ],
  },
  validate: {
    title: "Example 3: Validation answer",
    rows: [
      ["Task", "Input mark from 0 to 100 inclusive."],
      ["Skeleton", "REPEAT input and error message UNTIL mark is in range."],
      ["Fast check", "0 and 100 accepted; minus 1 and 101 rejected."],
      ["Exam point", "Inclusive boundaries must be handled exactly."],
    ],
  },
};

const practice = [
  { id: "p1", prompt: "In a timed pseudocode question, what should you identify before writing: inputs, outputs, variables or jokes?", accepted: ["inputs", "outputs", "variables"], answer: "Inputs, outputs and variables." },
  { id: "p2", prompt: "Which loop is usually best for processing exactly 20 items?", accepted: ["for"], answer: "FOR loop." },
  { id: "p3", prompt: "Which file condition is commonly used to read until the file ends?", accepted: ["eof", "end of file"], answer: "EOF / end of file condition." },
  { id: "p4", prompt: "Where should a final total usually be output: inside or after the loop?", accepted: ["after"], answer: "After the loop, unless the question asks for every intermediate value." },
  { id: "p5", prompt: "What should counters be given before use?", accepted: ["initial", "initialised", "initialized", "0"], answer: "They should be initialised, often to 0." },
  { id: "p6", prompt: "For range 0 to 100 inclusive, is 100 valid? yes or no", accepted: ["yes"], answer: "Yes. Inclusive means the endpoints are valid." },
  { id: "p7", prompt: "Which file statement should appear after processing is complete?", accepted: ["closefile", "close"], answer: "CLOSEFILE." },
  { id: "p8", prompt: "Should final Paper 2 algorithm answers normally use Java syntax? yes or no", accepted: ["no"], answer: "No. Cambridge-style pseudocode is the exam standard." },
  { id: "p9", prompt: "What quick method checks a pseudocode answer with sample data?", accepted: ["trace", "dry run"], answer: "Trace / dry run." },
  { id: "p10", prompt: "What kind of case catches many condition mistakes: normal or boundary?", accepted: ["boundary"], answer: "Boundary case." },
];

const mistakes = [
  {
    wrong: "A student starts writing pseudocode immediately and discovers halfway through that the input comes from a file.",
    fix: "Correction: spend the first minute identifying inputs, outputs, variables and file mode. This prevents a costly rewrite.",
  },
  {
    wrong: "A student outputs PassCount inside the loop when the question asks for the final number of passes.",
    fix: "Correction: update PassCount inside the loop, then output it after all items have been processed.",
  },
  {
    wrong: "A student validates 0 to 100 but rejects 0 and 100.",
    fix: "Correction: if the question says inclusive, both endpoints are valid. Use conditions such as Mark >= 0 AND Mark <= 100.",
  },
  {
    wrong: "A student writes Java braces and semicolons in the final answer.",
    fix: "Correction: write Cambridge-style pseudocode with IF/ENDIF, FOR/NEXT, OPENFILE/READFILE/WRITEFILE/CLOSEFILE. Java is support only.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Write pseudocode to count how many marks in an array Marks[1:30] are greater than or equal to 50.",
    answer: "Set PassCount to 0. Loop Index from 1 to 30. If Marks[Index] is greater than or equal to 50, add 1 to PassCount. After the loop, output PassCount.",
    marking: [
      { mark: "M1", text: "initialises PassCount or equivalent counter to 0" },
      { mark: "M1", text: "uses a loop that processes 30 array elements" },
      { mark: "M1", text: "accesses each mark using the loop index or equivalent" },
      { mark: "M1", text: "tests mark greater than or equal to 50" },
      { mark: "A1", text: "increments counter only for passing marks" },
      { mark: "A1", text: "outputs final count after loop" },
    ],
    strict: [
      "Do not award condition mark for greater than 50 only; 50 must be included.",
      "Allow clear Cambridge-style pseudocode or structured English.",
      "Do not require exact variable names.",
      "FT: if loop bounds have a minor error, credit valid counting method where clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "7 marks",
    prompt: "Write pseudocode to read all records from Scores.txt and output only scores greater than 80.",
    answer: "Open Scores.txt for READ. While not end of file, read a score record. If the score is greater than 80, output the score or record. End the IF and loop, then close the file.",
    marking: [
      { mark: "M1", text: "opens Scores.txt for READ" },
      { mark: "M1", text: "uses loop controlled by EOF or equivalent" },
      { mark: "M1", text: "reads each record inside the loop" },
      { mark: "M1", text: "uses selection to test score greater than 80" },
      { mark: "A1", text: "outputs only records/scores meeting the condition" },
      { mark: "M1", text: "continues until all records are processed" },
      { mark: "A1", text: "closes the file after processing" },
    ],
    strict: [
      "Do not award open-file mark if file is opened for WRITE or APPEND.",
      "Allow record field notation such as ScoreRecord.Score if consistent.",
      "Do not accept outputting every record without condition for the selection mark.",
      "FT: if EOF loop has a small syntax issue, credit read/condition/output steps if the intent is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "7 marks",
    prompt: "Write pseudocode to input a mark from 0 to 100 inclusive. The program should keep asking until a valid mark is entered.",
    answer: "Use a REPEAT loop. Input Mark. If Mark is less than 0 or greater than 100, output an invalid message. Repeat until Mark is greater than or equal to 0 and less than or equal to 100. Then process or output the valid Mark.",
    marking: [
      { mark: "M1", text: "uses a loop that repeats until valid input is entered" },
      { mark: "M1", text: "inputs Mark inside the loop" },
      { mark: "B1", text: "checks lower limit 0 correctly" },
      { mark: "B1", text: "checks upper limit 100 correctly" },
      { mark: "A1", text: "allows 0 and 100 as valid values" },
      { mark: "A1", text: "outputs error or rejects invalid values" },
      { mark: "A1", text: "loop stops only when Mark is valid" },
    ],
    strict: [
      "inclusive means both 0 and 100 are accepted.",
      "Allow WHILE loop if repeated input and stopping condition are correct.",
      "Do not award both boundary marks for vague 'check range' without limits.",
      "FT: if error message is missing, credit valid loop and boundary logic where present.",
    ],
  },
  {
    title: "Question 4",
    marks: "8 marks",
    prompt: "Write pseudocode to find the largest value in an array Values[1:20].",
    answer: "Set Largest to Values[1]. Loop Index from 2 to 20. If Values[Index] is greater than Largest, set Largest to Values[Index]. After all values have been checked, output Largest.",
    marking: [
      { mark: "M1", text: "initialises Largest to Values[1] or another valid array element" },
      { mark: "M1", text: "uses loop to process remaining array elements" },
      { mark: "M1", text: "uses correct range or avoids reprocessing problem safely" },
      { mark: "M1", text: "compares current value with Largest" },
      { mark: "A1", text: "updates Largest when current value is greater" },
      { mark: "M1", text: "continues until all 20 values have been considered" },
      { mark: "A1", text: "outputs Largest after loop" },
      { mark: "A1", text: "logic works for negative values as well as positive values" },
    ],
    strict: [
      "Do not award final robustness mark if Largest is initialised to 0 without evidence values are non-negative.",
      "Allow loop from 1 to 20 if initialisation and comparison still produce correct result.",
      "Do not require exact array notation if indexing is clear.",
      "FT: credit comparison/update logic even with minor loop-bound error.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "Explain how to check a timed pseudocode answer before moving to the next question.",
    answer: "Check that inputs, variables and outputs have been included. Trace a small normal case to see whether the loop and assignments work. Trace a boundary case to check conditions such as greater than or equal to. Check that final output occurs after processing and that any opened file is closed.",
    marking: [
      { mark: "B1", text: "checks inputs/variables/outputs or equivalent structure" },
      { mark: "M1", text: "uses a trace or dry run with sample data" },
      { mark: "A1", text: "uses normal case to check basic logic" },
      { mark: "A1", text: "uses boundary case to check conditions" },
      { mark: "M1", text: "checks output placement or final result" },
      { mark: "A1", text: "checks file handling such as close file where relevant" },
    ],
    strict: [
      "Do not award full marks for 'read it again' without a specific checking method.",
      "Allow checking loop bounds, initialisation or counters as equivalent structural checks.",
      "Do not require file handling point if question clearly has no file, but credit when included as a general timed checklist.",
      "FT: credit any valid checking step tied to preventing a specific pseudocode error.",
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
    code: { text: "Starting immediately feels fast, but it often creates a rewrite. Plan the file mode first.", correct: false },
    plan: { text: "Correct. Inputs, outputs, variables and file mode define the skeleton.", correct: true },
    java: { text: "Java is support only. The timed answer should be Cambridge-style pseudocode.", correct: false },
    essay: { text: "That answers a theory question, not a write-algorithm command.", correct: false },
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

function setupTimerTool() {
  const select = document.querySelector("#timerSelect");
  const output = document.querySelector("#timerOutput");
  const render = () => {
    const item = timingPlans[select.value];
    output.innerHTML = `
      <p><strong>Timing:</strong> ${escapeHtml(item.plan)}</p>
      <p><strong>Advice:</strong> ${escapeHtml(item.advice)}</p>
    `;
  };
  document.querySelector("#timerBtn").addEventListener("click", render);
  select.addEventListener("change", render);
  render();
}

function setupSkeletonTool() {
  const select = document.querySelector("#skeletonSelect");
  const output = document.querySelector("#skeletonOutput");
  const render = () => {
    const item = skeletons[select.value];
    output.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <pre><code>${escapeHtml(item.code)}</code></pre>
      <p><strong>Check:</strong> ${escapeHtml(item.check)}</p>
    `;
  };
  document.querySelector("#skeletonBtn").addEventListener("click", render);
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
  render("count");
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
      feedback.textContent = correct ? "Correct or close enough for this short check." : "Not quite. Use the timed pseudocode checklist keyword.";
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
  setupTimerTool();
  setupSkeletonTool();
  setupExamples();
  setupPractice();
  setupMistakes();
  setupExam();
}

document.addEventListener("DOMContentLoaded", init);
