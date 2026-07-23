const chooserMap = {
  sortedSearch: {
    title: "Binary search can be suitable",
    detail: "Because the list is sorted, binary search can discard about half the remaining values after each comparison.",
  },
  unsortedSearch: {
    title: "Linear search is safer unless sorted first",
    detail: "Binary search is not valid on unsorted data. Linear search can check each item without a sorted precondition.",
  },
  table: {
    title: "Nested-loop work",
    detail: "Every row-column combination is processed, so 20 x 20 = 400 cell visits.",
  },
  copy: {
    title: "Space cost",
    detail: "Copying the list uses extra memory proportional to the number of items, even if the later processing is simple.",
  },
};

function binaryWorstChecks(size) {
  return Math.ceil(Math.log2(size)) + 1;
}

function estimateWork(size, pattern) {
  if (pattern === "linear") {
    return {
      title: "Linear search worst case",
      rows: [["Input size", String(size)], ["Maximum comparisons", String(size)], ["Reason", "may check every item if target is last or absent"]],
    };
  }
  if (pattern === "binary") {
    return {
      title: "Binary search worst case",
      rows: [["Input size", String(size)], ["Approx. comparisons", String(binaryWorstChecks(size))], ["Reason", "remaining search area is repeatedly halved"]],
    };
  }
  if (pattern === "nested") {
    return {
      title: "n by n nested loop",
      rows: [["Rows", String(size)], ["Columns", String(size)], ["Cell visits", String(size * size)]],
    };
  }
  return {
    title: "Bubble sort rough comparison count",
    rows: [["Input size", String(size)], ["Rough comparisons", String((size * (size - 1)) / 2)], ["Reason", "several passes compare adjacent items"]],
  };
}

function binaryTrace(values, target) {
  let low = 0;
  let high = values.length - 1;
  const rows = [];
  let step = 0;
  while (low <= high) {
    step += 1;
    const mid = Math.floor((low + high) / 2);
    const value = values[mid];
    let action = "found";
    if (value < target) {
      action = "search right half";
      low = mid + 1;
    } else if (value > target) {
      action = "search left half";
      high = mid - 1;
    }
    rows.push([String(step), String(low + 1), String(high + 1), String(mid + 1), String(value), action]);
    if (value === target) break;
  }
  return {
    headers: ["Step", "Low", "High", "Mid position", "Compared value", "Action"],
    rows,
    note: `Target ${target} found in ${rows.length} comparison(s) if present in this trace.`,
  };
}

const examples = {
  linear: {
    title: "Example 1: Linear search cases",
    problem: "A list has 8 items. Compare best and worst case for linear search.",
    trace: {
      headers: ["Case", "Target position", "Comparisons", "Explanation"],
      rows: [
        ["Best", "first item", "1", "target is found immediately"],
        ["Worst", "last item or absent", "8", "each item may be checked"],
      ],
      note: "Linear search does not need sorted data, but the worst case grows with the number of items.",
    },
    points: ["Use best/worst case language.", "Count comparisons.", "Avoid saying 'always slow'."],
  },
  binary: {
    title: "Example 2: Binary search trace",
    problem: "Trace binary search for 52 in [3, 8, 11, 18, 25, 31, 40, 52].",
    trace: binaryTrace([3, 8, 11, 18, 25, 31, 40, 52], 52),
    points: ["Data must be sorted.", "Each comparison discards part of the list.", "Efficiency comes from halving the search area."],
  },
  nested: {
    title: "Example 3: Nested loop count",
    problem: "A 10 by 10 grid is processed cell by cell. Estimate the number of visits.",
    trace: {
      headers: ["Rows", "Columns", "Visits", "Reason"],
      rows: [["10", "10", "100", "inner column loop runs for every row"]],
      note: "Nested-loop work multiplies when every inner repetition occurs for every outer repetition.",
    },
    points: ["Count structure, not lines of code only.", "Rows x columns gives cell visits.", "This is more work than a single loop over 10 values."],
  },
  space: {
    title: "Example 4: Space trade-off",
    problem: "An algorithm copies a 500-item list before processing it.",
    trace: {
      headers: ["Resource", "Effect", "Explanation"],
      rows: [
        ["Time", "extra copying step", "each item must be copied before processing"],
        ["Space", "extra list stored", "memory is needed for another 500 items"],
      ],
      note: "Efficiency can refer to memory as well as time.",
    },
    points: ["Mention extra storage.", "Mention extra processing if copied item by item.", "Do not discuss only speed when memory is relevant."],
  },
};

const practice = [
  { id: "p1", prompt: "In worst-case linear search of 10 items, how many comparisons may be needed?", accepted: ["10", "ten"], answer: "10" },
  { id: "p2", prompt: "What condition must be true before binary search can be used?", accepted: ["sorted", "sorted data", "list sorted", "the list is sorted", "data sorted"], answer: "The data/list must be sorted." },
  { id: "p3", prompt: "A 5 by 6 nested loop processes every cell. How many cell visits?", accepted: ["30", "thirty"], answer: "30" },
  { id: "p4", prompt: "For linear search, target at first item is best case or worst case?", accepted: ["best", "best case"], answer: "Best case" },
  { id: "p5", prompt: "For linear search, target absent is usually best case or worst case?", accepted: ["worst", "worst case"], answer: "Worst case" },
  { id: "p6", prompt: "Does copying a list use extra memory? yes or no.", accepted: ["yes"], answer: "Yes" },
  { id: "p7", prompt: "Which search repeatedly halves the search area?", accepted: ["binary", "binary search"], answer: "Binary search" },
  { id: "p8", prompt: "One loop over n items does about n or n x n visits?", accepted: ["n"], answer: "n" },
  { id: "p9", prompt: "Two nested loops each running n times do about n or n x n visits?", accepted: ["n x n", "n*n", "n squared", "n^2", "nxn"], answer: "n x n" },
  { id: "p10", prompt: "Is 'it is faster' enough for a full efficiency explanation? yes or no.", accepted: ["no"], answer: "No. Give a measurable reason such as fewer comparisons." },
];

const mistakes = [
  { wrong: "Binary search is always better.", fix: "Binary search is only suitable when the data is sorted. Linear search may be needed for unsorted data." },
  { wrong: "This algorithm is efficient because it is faster.", fix: "State what is reduced: comparisons, loop iterations, passes or memory use." },
  { wrong: "A nested loop with 5 rows and 5 columns runs 10 times.", fix: "If every column is processed for every row, it runs 5 x 5 = 25 times." },
  { wrong: "Only time matters when comparing algorithms.", fix: "Space can also matter, especially when an algorithm copies lists or stores extra structures." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Compare linear search and binary search for finding a value in a sorted list of 100 items.",
    answer: "Linear search may compare the target with each item one by one, so in the worst case it may require up to 100 comparisons. Binary search can be used because the list is sorted; it compares with a middle value and discards about half of the remaining values each time. Therefore binary search usually requires fewer comparisons for a large sorted list.",
    marking: [
      { mark: "B1", text: "linear search checks items one by one" },
      { mark: "B1", text: "linear worst case may check all 100 items" },
      { mark: "B1", text: "binary search requires sorted data / sorted list condition recognised" },
      { mark: "B1", text: "binary search compares with middle value / halves search area" },
      { mark: "B1", text: "explains binary search usually uses fewer comparisons for this sorted large list" },
    ],
    strict: [
      "Do not accept 'binary search is faster' without reason.",
      "Allow approximate comparison counts for binary search if halving is explained.",
      "Do not award binary suitability mark if sorted precondition is ignored.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "A nested loop processes every cell in a table with 12 rows and 5 columns. Explain how many times the inner statement executes.",
    answer: "The inner statement executes once for each column in each row. There are 5 column executions for each of the 12 rows, so the total number of executions is 12 x 5 = 60.",
    marking: [
      { mark: "B1", text: "identifies rows and columns as two loop dimensions" },
      { mark: "B1", text: "explains inner loop runs for each row" },
      { mark: "B1", text: "uses multiplication rather than addition" },
      { mark: "B1", text: "calculates 12 x 5" },
      { mark: "B1", text: "final answer 60 executions" },
    ],
    strict: [
      "Do not accept 17 from adding rows and columns.",
      "Allow columns and rows reversed if calculation is consistent.",
      "Do not require Big O notation.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain best case and worst case for linear search.",
    answer: "In the best case, the target value is the first item checked, so only one comparison is needed. In the worst case, the target is the last item or is not in the list, so every item may need to be checked. This means the amount of work in the worst case grows with the number of items in the list.",
    marking: [
      { mark: "B1", text: "best case identified as target first / found immediately" },
      { mark: "B1", text: "best case uses one comparison" },
      { mark: "B1", text: "worst case identified as target last or absent" },
      { mark: "B1", text: "worst case may check every item" },
      { mark: "B1", text: "links work to number of items / input size" },
    ],
    strict: [
      "Do not accept best/worst labels without a search scenario.",
      "Allow 'not found' for absent target.",
      "Do not require average case.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "An algorithm copies a list into a new list before searching it. Discuss one time efficiency issue and one space efficiency issue.",
    answer: "Copying the list takes extra time because each item has to be copied before the search begins. It also uses extra memory because a second list must be stored. If the copied list has the same number of items as the original, the additional memory needed grows as the list size grows. This may be unnecessary if the original list could be searched directly.",
    marking: [
      { mark: "B1", text: "identifies copying adds extra processing/time" },
      { mark: "B1", text: "explains items must be copied before or in addition to searching" },
      { mark: "B1", text: "identifies extra memory/space use" },
      { mark: "B1", text: "explains second list / copied data must be stored" },
    ],
    strict: [
      "Do not award both time and space marks for only saying 'inefficient'.",
      "Allow 'storage' for memory.",
      "Do not require exact memory units.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says: 'Bubble sort and linear search are equally efficient because both use loops.' Evaluate this statement.",
    answer: "The statement is not valid. Both algorithms use loops, but the amount of work is different. Linear search checks items until the target is found or the list ends, so in the worst case it may check each item once. Bubble sort uses repeated passes and compares adjacent items many times to sort the whole list. Therefore the number of comparisons and the purpose of the algorithms are different.",
    marking: [
      { mark: "B1", text: "recognises both use loops but that is not enough to judge efficiency" },
      { mark: "B1", text: "linear search checks items for a target" },
      { mark: "B1", text: "linear search worst case may check each item once" },
      { mark: "B1", text: "bubble sort uses repeated passes / adjacent comparisons" },
      { mark: "B1", text: "explains bubble sort performs many comparisons to sort the whole list" },
      { mark: "B1", text: "clear evaluative conclusion that they are not equally efficient for that reason" },
    ],
    strict: [
      "Do not accept 'bubble sort is slower' without mechanism.",
      "Allow insertion sort comparison only if bubble sort is still addressed.",
      "Do not require formal Big O notation.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9\\[\\] <>+=.*^-]/g, "");
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
    linear: "That works, but it may take hundreds of checks if you start at page 1.",
    binary: "Correct. Halving the search area is the useful efficiency idea.",
    random: "Random pages may work by luck, but the worst case is not controlled.",
    sort: "The pages are already ordered by number; sorting is unnecessary extra work.",
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

function setupEstimator() {
  const sizeInput = document.querySelector("#sizeInput");
  const patternInput = document.querySelector("#patternInput");
  const result = document.querySelector("#estimateResult");
  document.querySelector("#estimateBtn").addEventListener("click", () => {
    const estimate = estimateWork(Number(sizeInput.value), patternInput.value);
    result.innerHTML = `<h3>${estimate.title}</h3>${tableMarkup(["Measure", "Value"], estimate.rows)}`;
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
  renderExample("linear");
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
setupEstimator();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
