const linearList = [13, 42, 56, 70];
const binaryList = [13, 21, 42, 56, 70, 88, 91];

const classifierMap = {
  unsorted: { title: "Linear search", detail: "The data is unsorted, so binary search cannot safely discard half the list." },
  "sorted-large": { title: "Binary search", detail: "The data is sorted and large, so binary search is efficient." },
  small: { title: "Linear search is acceptable", detail: "With only four values, checking sequentially is simple and low cost." },
  unknown: { title: "Linear search unless sorted is confirmed", detail: "Binary search requires sorted data; if order is not stated, do not assume it." },
};

function linearTrace(target) {
  const rows = [];
  let found = false;
  for (let index = 0; index < linearList.length; index += 1) {
    const value = linearList[index];
    found = value === target;
    rows.push([String(index + 1), String(value), value === target ? "match" : "no match", found ? "TRUE" : "FALSE"]);
    if (found) break;
  }
  return { headers: ["Index", "Value", "Comparison", "Found"], rows, note: found ? `Target ${target} found.` : `Target ${target} not found after checking all items.` };
}

function binaryTrace(target) {
  const rows = [];
  let low = 1;
  let high = binaryList.length;
  let found = false;
  while (low <= high && !found) {
    const mid = Math.floor((low + high) / 2);
    const value = binaryList[mid - 1];
    let action = "found";
    if (value === target) {
      found = true;
    } else if (target < value) {
      action = "target smaller: High <- Mid - 1";
      high = mid - 1;
    } else {
      action = "target larger: Low <- Mid + 1";
      low = mid + 1;
    }
    rows.push([String(low), String(mid), String(high), String(value), action]);
  }
  return { headers: ["Low", "Mid", "High", "List[Mid]", "Action"], rows, note: found ? `Target ${target} found.` : `Target ${target} not found when Low > High.` };
}

const examples = {
  "linear-found": {
    title: "Example 1: Linear search found",
    problem: "Find 42 in [13, 42, 56, 70].",
    trace: linearTrace(42),
    points: ["Check 13 first.", "42 is the second item, so stop when found.", "Two comparisons are made."],
  },
  "linear-absent": {
    title: "Example 2: Linear search absent",
    problem: "Find 99 in [13, 42, 56, 70].",
    trace: linearTrace(99),
    points: ["Every item must be checked.", "Found remains FALSE.", "The final result is not found."],
  },
  "binary-found": {
    title: "Example 3: Binary search found",
    problem: "Find 42 in sorted list [13, 21, 42, 56, 70, 88, 91].",
    trace: binaryTrace(42),
    points: ["Start at the middle.", "Discard the half that cannot contain the target.", "The data must be sorted for this to be valid."],
  },
  "binary-absent": {
    title: "Example 4: Binary search absent",
    problem: "Find 15 in sorted list [13, 21, 42, 56, 70, 88, 91].",
    trace: binaryTrace(15),
    points: ["Check middle values and update bounds.", "Stop when Low > High.", "Result is not found."],
  },
};

const practice = [
  { id: "p1", prompt: "Which search checks each item one by one?", accepted: ["linear", "linear search"], answer: "Linear search" },
  { id: "p2", prompt: "Which search requires sorted data?", accepted: ["binary", "binary search"], answer: "Binary search" },
  { id: "p3", prompt: "Linear search for 42 in [13, 42, 56, 70]: how many comparisons?", accepted: ["2", "two"], answer: "2 comparisons" },
  { id: "p4", prompt: "Linear search for 99 in [13, 42, 56, 70]: final result?", accepted: ["not found", "false", "found false"], answer: "Not found / Found = FALSE" },
  { id: "p5", prompt: "Binary search first checks which position in a sorted list of 7 items?", accepted: ["4", "position 4", "index 4", "middle", "mid"], answer: "Position/index 4, the middle item" },
  { id: "p6", prompt: "If target is smaller than List[Mid], which bound changes: Low or High?", accepted: ["high"], answer: "High changes to Mid - 1" },
  { id: "p7", prompt: "If target is larger than List[Mid], which bound changes: Low or High?", accepted: ["low"], answer: "Low changes to Mid + 1" },
  { id: "p8", prompt: "When does unsuccessful binary search stop?", accepted: ["low > high", "low greater than high", "low is greater than high"], answer: "When Low > High" },
  { id: "p9", prompt: "Can binary search safely be used on unsorted data? yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  { wrong: "I used binary search on an unsorted list because it is faster.", fix: "Binary search is only valid on sorted data. Speed does not help if the method is logically invalid." },
  { wrong: "My linear search continued after the target was found.", fix: "Once the target is found, set Found to TRUE and stop or ensure the loop condition stops further checking." },
  { wrong: "When the target was smaller than the middle value, I increased Low.", fix: "If target is smaller, discard the right half by setting High <- Mid - 1." },
  { wrong: "I said binary search sorts the list.", fix: "Binary search does not sort. It requires the list to already be sorted." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Trace a linear search for 42 in [13, 42, 56, 70]. State the comparisons and final result.",
    answer: "Compare 42 with 13: no match. Compare 42 with 42: match. Found becomes TRUE and the search stops. The target is found at position 2.",
    marking: [
      { mark: "B1", text: "first comparison with 13 shown as no match" },
      { mark: "B1", text: "second comparison with 42 shown as match" },
      { mark: "B1", text: "sets/states Found becomes TRUE" },
      { mark: "B1", text: "states search stops when found" },
      { mark: "A1", text: "states correct position/index 2 using 1-based pseudocode indexing" },
    ],
    strict: [
      "Do not require a formal trace table if comparisons are ordered clearly.",
      "Allow index 1 if candidate explicitly uses Java-style 0-based indexing.",
      "Do not award comparisons after 42 if candidate claims the algorithm stops when found.",
      "FT: position mark can follow from candidate's stated indexing scheme.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Explain why binary search requires sorted data and why linear search can be used on unsorted data.",
    answer: "Binary search compares the target with the middle item and then discards one half of the list. This is only valid if the data is sorted, because order tells the algorithm which half cannot contain the target. Linear search can be used on unsorted data because it checks each item one by one and does not rely on order.",
    marking: [
      { mark: "B1", text: "states binary search checks middle item" },
      { mark: "M1", text: "states binary search discards half / adjusts search bounds" },
      { mark: "A1", text: "explains discarding half depends on sorted order" },
      { mark: "B1", text: "states linear search checks items sequentially" },
      { mark: "M1", text: "explains linear search does not rely on order" },
      { mark: "A1", text: "clear contrast between the two methods" },
    ],
    strict: [
      "Do not accept 'binary is faster' as the reason sorted data is required.",
      "Allow ascending or descending order if the bound updates match the order.",
      "Do not say linear search requires sorted data.",
      "FT: contrast mark can follow from candidate's valid explanation of each method.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Trace binary search for 88 in sorted list [13, 21, 42, 56, 70, 88, 91] using 1-based indexing.",
    answer: "Low = 1, High = 7, Mid = 4, List[4] = 56. Target 88 is larger, so Low becomes 5. Low = 5, High = 7, Mid = 6, List[6] = 88. Target found at position 6.",
    marking: [
      { mark: "B1", text: "initial Low 1 and High 7" },
      { mark: "B1", text: "first Mid calculated as 4" },
      { mark: "M1", text: "compares target with List[4] = 56" },
      { mark: "A1", text: "updates Low to 5 because target is larger" },
      { mark: "B1", text: "second Mid calculated as 6" },
      { mark: "A1", text: "identifies 88 found at position 6" },
    ],
    strict: [
      "Do not accept discarding the right half after comparing with 56.",
      "Allow equivalent trace if candidate uses 0-based indexing consistently.",
      "Do not require formula for Mid if values are correct.",
      "FT: later bounds can follow from candidate's first Mid if logic is consistent.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Write Cambridge-style pseudocode outline for linear search using variables Found, Index, Target and List.",
    answer: "Found <- FALSE\nIndex <- 1\nWHILE Found = FALSE AND Index <= Length\n    IF List[Index] = Target THEN\n        Found <- TRUE\n    ELSE\n        Index <- Index + 1\n    ENDIF\nENDWHILE",
    marking: [
      { mark: "B1", text: "initialises Found to FALSE" },
      { mark: "B1", text: "initialises Index/start position" },
      { mark: "M1", text: "loop continues while not found and items remain" },
      { mark: "M1", text: "compares List[Index] with Target" },
      { mark: "A1", text: "sets Found TRUE when target matches" },
    ],
    strict: [
      "Do not require exact variable name Length if list bound is clear.",
      "Allow loop with RETURN position if logic is equivalent.",
      "Do not award full credit if Index is never changed when no match occurs.",
      "FT: Found update can follow from candidate's stated comparison.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says: 'Binary search is always better than linear search because it is faster.' Evaluate this statement.",
    answer: "Binary search is usually faster for large sorted lists because it repeatedly halves the search area. However, it is not always better because it requires sorted data. If the data is unsorted, linear search can be used immediately, while binary search would need the data to be sorted first. For small lists, linear search may also be simple enough.",
    marking: [
      { mark: "B1", text: "states binary search can be faster / halves search area" },
      { mark: "B1", text: "states binary search requires sorted data" },
      { mark: "M1", text: "explains unsorted data may make linear search more suitable" },
      { mark: "B1", text: "mentions small data sets or simplicity as a valid factor" },
      { mark: "M1", text: "evaluates rather than gives one-sided claim" },
      { mark: "A1", text: "clear conclusion that 'always better' is incorrect" },
    ],
    strict: [
      "Do not award full marks for 'binary is faster' only.",
      "Allow discussion of cost of sorting before binary search.",
      "Do not require Big O notation at AS level.",
      "FT: conclusion can follow from candidate's valid stated limitation.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9> -]/g, "");
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
    linear: "Correct. If the pile is unsorted, checking one by one is safe.",
    binary: "Not safe. Binary search only works when order lets you discard half.",
    sort: "Possible, but this is a sorting step first. If you need one quick search, linear may be simpler.",
    guess: "Tempting during revision week, but not an algorithm.",
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
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.title}</strong><span>${item.detail}</span>`;
  });
}

function setupLinearTool() {
  const input = document.querySelector("#linearInput");
  const result = document.querySelector("#linearResult");
  document.querySelector("#linearBtn").addEventListener("click", () => {
    const trace = linearTrace(Number(input.value));
    result.innerHTML = `${tableMarkup(trace.headers, trace.rows)}<p>${trace.note}</p>`;
  });
}

function setupBinaryTool() {
  const input = document.querySelector("#binaryInput");
  const result = document.querySelector("#binaryResult");
  document.querySelector("#binaryBtn").addEventListener("click", () => {
    const trace = binaryTrace(Number(input.value));
    result.innerHTML = `${tableMarkup(trace.headers, trace.rows)}<p>${trace.note}</p>`;
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
  renderExample("linear-found");
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
        <p><strong>Marking points:</strong></p>
        <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        <p><strong>Strict notes:</strong></p>
        <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
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
setupClassifier();
setupLinearTool();
setupBinaryTool();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
