const classifierMap = {
  fixedLoop: {
    title: "Count-controlled loop",
    detail: "The word exactly tells you the number of repetitions is known before the loop starts.",
    pattern: "FOR Index <- 1 TO 12",
  },
  sentinel: {
    title: "Condition-controlled loop with sentinel",
    detail: "-1 is a stopping value. It controls the loop and should not be processed as normal data.",
    pattern: "INPUT Value\nWHILE Value <> -1\n    // process Value\n    INPUT Value\nENDWHILE",
  },
  binarySearch: {
    title: "Binary search",
    detail: "Sorted data plus few comparisons signals binary search because half the remaining search area can be discarded.",
    pattern: "Compare target with middle item, then search only the relevant half.",
  },
  bubble: {
    title: "Bubble sort",
    detail: "Adjacent comparison and swapping is the signature wording for bubble sort.",
    pattern: "Compare neighbouring items and swap when they are in the wrong order.",
  },
  trace: {
    title: "Trace table",
    detail: "The task is asking for execution values, so update variables in the exact order that pseudocode runs.",
    pattern: "Create a row for each iteration and record variable changes.",
  },
};

const fixerMap = {
  binary: {
    weak: "Binary search is faster.",
    strong: "Binary search uses fewer comparisons because the list is sorted, so each comparison can discard half of the remaining search area.",
  },
  loop: {
    weak: "Use a loop.",
    strong: "Use a FOR loop when the number of repetitions is known; use a WHILE loop when the repetition depends on a condition or sentinel value.",
  },
  max: {
    weak: "Set Maximum to 0.",
    strong: "Initialise Maximum from the first input unless the question states all values are non-negative; otherwise negative data could incorrectly output 0.",
  },
  output: {
    weak: "Output the average inside the loop.",
    strong: "Output the final average after the loop because all valid values must be included before Total / Count is calculated.",
  },
};

const examples = {
  rainfall: {
    title: "Example 1: Rainfall IPOC to pseudocode",
    problem: "Input rainfall for 7 days. Output total rainfall and average rainfall.",
    table: [
      ["Input", "7 rainfall readings"],
      ["Process", "add each reading to Total; divide Total by 7"],
      ["Output", "Total and Average"],
      ["Constraint", "exactly 7 days, so use a FOR loop"],
    ],
    code: "Total <- 0\nFOR Day <- 1 TO 7\n    INPUT Rainfall\n    Total <- Total + Rainfall\nNEXT Day\nAverage <- Total / 7\nOUTPUT Total\nOUTPUT Average",
    points: ["Output requirements create Total and Average.", "The fixed count creates a FOR loop.", "Average is calculated after all readings are processed."],
  },
  sentinelTrace: {
    title: "Example 2: Sentinel trace",
    problem: "Inputs are 4, 6, 0. The sentinel 0 stops input. Output Total and Count.",
    table: [
      ["Start", "Total = 0, Count = 0"],
      ["Input 4", "Total = 4, Count = 1"],
      ["Input 6", "Total = 10, Count = 2"],
      ["Input 0", "stop; Total and Count do not change"],
    ],
    code: "Total <- 0\nCount <- 0\nINPUT Value\nWHILE Value <> 0\n    Total <- Total + Value\n    Count <- Count + 1\n    INPUT Value\nENDWHILE\nOUTPUT Total\nOUTPUT Count",
    points: ["The first input happens before the WHILE test.", "0 is checked before processing.", "Final output is after the loop."],
  },
  searchSort: {
    title: "Example 3: Search or sort?",
    problem: "A target must be found in a sorted list. Another task must arrange unsorted scores into ascending order.",
    table: [
      ["Find in sorted data", "binary search"],
      ["Find in unsorted data", "linear search"],
      ["Adjacent compare and swap", "bubble sort"],
      ["Insert each item into sorted section", "insertion sort"],
    ],
    code: "IF List is sorted THEN\n    use binary search for target\nELSE\n    use linear search for target\nENDIF\n\nIF task asks to arrange values THEN\n    choose a sorting algorithm\nENDIF",
    points: ["Search finds a value; sort changes order.", "Binary search requires sorted data.", "Bubble sort wording often mentions adjacent swaps."],
  },
  msUpgrade: {
    title: "Example 4: Upgrade answer to MS language",
    problem: "Weak answer: 'Use binary search because it is faster.'",
    table: [
      ["Missing", "why sorted data matters"],
      ["Missing", "what binary search does"],
      ["Mark-worthy version", "Binary search can be used because the list is sorted; each comparison with the middle value halves the remaining search range, so fewer comparisons are needed than a linear search."],
    ],
    code: "// Explanation structure\nName algorithm\nState required condition\nDescribe mechanism\nState consequence",
    points: ["A vague comparative word is not enough.", "Mechanism earns marks.", "Cause and consequence should both be present."],
  },
};

const practice = [
  { id: "p1", prompt: "The phrase 'exactly 8 values' suggests which loop type?", accepted: ["for", "for loop", "count controlled", "count-controlled", "count controlled loop"], answer: "FOR / count-controlled loop, because the number of repetitions is known." },
  { id: "p2", prompt: "The phrase 'until 0 is entered' suggests which loop type?", accepted: ["while", "while loop", "condition controlled", "condition-controlled", "condition controlled loop"], answer: "WHILE / condition-controlled loop, because repetition depends on a condition." },
  { id: "p3", prompt: "What condition must normally be true before binary search can be used?", accepted: ["sorted", "data sorted", "list sorted", "sorted data", "sorted list"], answer: "The data/list must be sorted." },
  { id: "p4", prompt: "For a final total, should OUTPUT usually be inside or after the loop?", accepted: ["after", "after loop", "after the loop"], answer: "After the loop, once all updates have happened." },
  { id: "p5", prompt: "For maximum values that may be negative, initialise Maximum to 0 or first input?", accepted: ["first input", "first value", "first data value", "input"], answer: "First input / first data value." },
  { id: "p6", prompt: "Which sort compares adjacent items and swaps them if they are in the wrong order?", accepted: ["bubble", "bubble sort"], answer: "Bubble sort." },
  { id: "p7", prompt: "Which sort inserts each new item into the correct place in a sorted section?", accepted: ["insertion", "insertion sort"], answer: "Insertion sort." },
  { id: "p8", prompt: "A nested loop has 3 outer iterations and 4 inner iterations. How many inner actions run?", accepted: ["12"], answer: "12 inner actions." },
  { id: "p9", prompt: "In IPOC, what does O stand for?", accepted: ["output"], answer: "Output." },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Java is support only; use Cambridge-style pseudocode." },
];

const mistakes = [
  {
    wrong: "I revised Section 9 by rereading notes only.",
    fix: "Use retrieval and timed practice. Section 9 is skill-heavy: classify the scenario, write pseudocode, trace it, then correct against marking points.",
  },
  {
    wrong: "I wrote 'binary search is better' and stopped.",
    fix: "Add mechanism: binary search works on sorted data and halves the remaining search range each comparison, so fewer comparisons are needed.",
  },
  {
    wrong: "I used the same loop for every scenario.",
    fix: "Match the loop to the wording. Use FOR for a known count and WHILE for a condition or sentinel.",
  },
  {
    wrong: "I wrote Java syntax in my Cambridge pseudocode answer.",
    fix: "Keep Paper 2 pseudocode readable: use <- for assignment, IF/ENDIF, FOR/NEXT and WHILE/ENDWHILE style blocks.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A program inputs six sensor readings and outputs the total and average reading. Identify the input, process, output and suitable loop type. Explain the loop choice.",
    answer: "Input: six sensor readings. Process: add each reading to Total, then calculate Average as Total / 6. Output: Total and Average. Loop: count-controlled / FOR loop because exactly six readings are processed.",
    marking: [
      { mark: "B1", text: "identifies input as six sensor readings" },
      { mark: "M1", text: "process includes adding readings to a running total" },
      { mark: "M1", text: "process includes calculating average from total divided by 6" },
      { mark: "B1", text: "identifies output as total and average" },
      { mark: "B1", text: "chooses count-controlled / FOR loop" },
      { mark: "A1", text: "justifies loop choice using exactly six readings" },
    ],
    strict: [
      "Award process marks only where the calculation is clear.",
      "Allow 'sum' for Total and 'mean' for Average.",
      "Do not accept 'process the readings' without calculation detail.",
      "FT: loop justification may follow from candidate's stated fixed number of readings.",
    ],
  },
  {
    title: "Question 2",
    marks: "8 marks",
    prompt: "Write Cambridge-style pseudocode to input numbers until -1 is entered. The -1 must not be counted. Output how many positive numbers were entered.",
    answer: "PositiveCount <- 0\nINPUT Number\nWHILE Number <> -1\n    IF Number > 0 THEN\n        PositiveCount <- PositiveCount + 1\n    ENDIF\n    INPUT Number\nENDWHILE\nOUTPUT PositiveCount",
    marking: [
      { mark: "B1", text: "initialises PositiveCount to 0" },
      { mark: "M1", text: "inputs first Number before testing loop condition or otherwise tests before processing" },
      { mark: "M1", text: "uses condition-controlled loop with Number <> -1" },
      { mark: "A1", text: "does not process/count the -1 sentinel" },
      { mark: "M1", text: "uses selection to test Number > 0" },
      { mark: "A1", text: "increments PositiveCount only for positive values" },
      { mark: "M1", text: "inputs next Number inside loop" },
      { mark: "B1", text: "outputs PositiveCount after the loop" },
    ],
    strict: [
      "the sentinel must not be counted as positive or valid data.",
      "Allow REPEAT UNTIL if the logic still excludes -1 from processing.",
      "Do not award output mark if the only output is inside the loop.",
      "FT: final output can follow from candidate's count variable.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "A student writes Maximum <- 0 before inputting five temperature readings. The readings may be negative. Explain the error and give a correction.",
    answer: "Initialising Maximum to 0 is wrong because all input temperatures might be negative, so the algorithm could output 0 even though 0 was never entered. A correction is to input the first temperature, assign Maximum <- Temperature, then compare the remaining four readings with Maximum.",
    marking: [
      { mark: "B1", text: "identifies that readings may be negative" },
      { mark: "M1", text: "explains Maximum <- 0 can produce an output not present in the data" },
      { mark: "A1", text: "states that 0 could incorrectly remain the maximum" },
      { mark: "M1", text: "corrects by inputting first reading before loop/comparison" },
      { mark: "A1", text: "assigns Maximum from first input" },
      { mark: "B1", text: "compares remaining readings and updates Maximum only when a higher value is found" },
    ],
    strict: [
      "Do not award correction for only saying 'use a smaller number'.",
      "Allow Minimum/Maximum naming variations if role is clear.",
      "Do not require full pseudocode for full credit if explanation is precise.",
      "FT: comparison/update mark can follow from candidate's corrected variable.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "A sorted list of 1000 customer IDs must be searched for one ID. Compare linear search and binary search for this scenario.",
    answer: "Linear search can check each item in order and may need up to 1000 comparisons if the ID is near the end or absent. Binary search is suitable because the list is sorted; it compares with the middle item and repeatedly halves the remaining search area. Therefore binary search usually uses fewer comparisons for this scenario.",
    marking: [
      { mark: "B1", text: "states linear search checks items sequentially" },
      { mark: "M1", text: "states linear search may require many/up to all comparisons" },
      { mark: "B1", text: "states binary search requires sorted data / sorted list is given" },
      { mark: "M1", text: "describes comparison with middle item or halving search area" },
      { mark: "A1", text: "links halving to fewer comparisons" },
      { mark: "A1", text: "conclusion is applied to 1000 sorted customer IDs" },
    ],
    strict: [
      "'faster' alone is not enough for a comparison mark.",
      "Allow 'discard half' or equivalent for halving mechanism.",
      "Do not accept binary search for unsorted data unless sorting is first stated.",
      "FT: comparison can follow from candidate's correctly stated sorted precondition.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A weak answer to a scenario says: 'Use a loop and output the answer.' Rewrite this into a precise algorithm-design response for a task that inputs marks until -1 and outputs the average of valid marks.",
    answer: "Use a condition-controlled WHILE loop because the number of marks is unknown and input stops when -1 is entered. Initialise Total and Count to 0. Input a mark before the loop test. While Mark <> -1, add Mark to Total, increment Count, then input the next Mark. After the loop, calculate Average <- Total / Count and output Average.",
    marking: [
      { mark: "B1", text: "chooses condition-controlled / WHILE loop" },
      { mark: "A1", text: "justifies loop choice using unknown count or sentinel -1" },
      { mark: "M1", text: "initialises Total and Count" },
      { mark: "M1", text: "uses input before loop test and/or prevents -1 being processed" },
      { mark: "A1", text: "updates Total and Count for valid marks only" },
      { mark: "A1", text: "calculates and outputs Average after the loop" },
    ],
    strict: [
      "Do not award full credit for generic 'use a loop' wording.",
      "Allow REPEAT UNTIL if sentinel is not included in total/count.",
      "Do not award average mark if Count is missing or sentinel is included.",
      "FT: Average calculation can follow from candidate's equivalent total/count variables.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9@ <>+=.-]/g, "");
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
    linear: "Linear search works, but the clue 'sorted' plus 'few comparisons' points to a stronger answer.",
    binary: "Correct. Binary search uses sorted order to halve the search area.",
    bubble: "Bubble sort arranges data into order; this question asks to find one target.",
    average: "Running average is for total/count problems, not searching a sorted list.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifierResult");
  document.querySelector("#classifierBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.detail)}</p>
      <pre><code>${escapeHtml(item.pattern)}</code></pre>
    `;
  });
}

function setupFixer() {
  const input = document.querySelector("#fixerInput");
  const result = document.querySelector("#fixerResult");
  document.querySelector("#fixerBtn").addEventListener("click", () => {
    const item = fixerMap[input.value];
    result.innerHTML = `
      <p><strong>Weak:</strong> ${escapeHtml(item.weak)}</p>
      <p><strong>Stronger:</strong> ${escapeHtml(item.strong)}</p>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${escapeHtml(example.title)}</h3>
    <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
    ${tableMarkup(["Focus", "Design decision"], example.table)}
    <p><strong>Cambridge-style pseudocode / answer structure:</strong></p>
    <pre><code>${escapeHtml(example.code)}</code></pre>
    <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
  `;
}

function setupExamples() {
  renderExample("rainfall");
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
      const mark = document.querySelector(`#${item.id}Mark`);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      mark.textContent = correct ? "Correct. The wording is mark-worthy." : "Not quite. Compare with the answer, then improve the wording.";
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
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((line) => `<li><strong>${escapeHtml(line.mark)}</strong> ${escapeHtml(line.text)}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
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
setupClassifier();
setupFixer();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
