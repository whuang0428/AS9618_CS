const listMap = {
  "5142": [5, 1, 4, 2],
  "3124": [3, 1, 2, 4],
  "4312": [4, 3, 1, 2],
};

const chooserMap = {
  bubble: { title: "Bubble sort", detail: "Bubble sort compares adjacent items and swaps when they are in the wrong order." },
  insert: { title: "Insertion sort", detail: "Insertion sort takes the next item and inserts it into the sorted left section." },
  "bubble-end": { title: "Bubble sort", detail: "After each full pass, the largest remaining item has moved to the right end." },
  "insert-left": { title: "Insertion sort", detail: "Insertion sort grows a sorted left-hand section one item at a time." },
};

function formatList(values) {
  return `[${values.join(", ")}]`;
}

function bubblePass(values) {
  const list = [...values];
  const rows = [];
  for (let index = 0; index < list.length - 1; index += 1) {
    const left = list[index];
    const right = list[index + 1];
    let action = "no swap";
    if (left > right) {
      list[index] = right;
      list[index + 1] = left;
      action = "swap";
    }
    rows.push([String(index + 1), `${left} and ${right}`, action, formatList(list)]);
  }
  return { headers: ["Step", "Compare", "Action", "List after step"], rows, note: `After one pass: ${formatList(list)}.` };
}

function bubbleFull(values) {
  const list = [...values];
  const rows = [];
  for (let pass = 1; pass < list.length; pass += 1) {
    for (let index = 0; index < list.length - pass; index += 1) {
      if (list[index] > list[index + 1]) {
        const temp = list[index];
        list[index] = list[index + 1];
        list[index + 1] = temp;
      }
    }
    rows.push([String(pass), formatList(list)]);
  }
  return { headers: ["Pass", "List after pass"], rows, note: `Final sorted list: ${formatList(list)}.` };
}

function insertionTrace(values) {
  const list = [...values];
  const rows = [["start", "first item treated as sorted", formatList(list)]];
  for (let index = 1; index < list.length; index += 1) {
    const key = list[index];
    let position = index - 1;
    while (position >= 0 && list[position] > key) {
      list[position + 1] = list[position];
      position -= 1;
    }
    list[position + 1] = key;
    rows.push([String(index + 1), `insert ${key}`, formatList(list)]);
  }
  return { headers: ["Item position", "Action", "List after insertion"], rows, note: `Final sorted list: ${formatList(list)}.` };
}

const examples = {
  "bubble-pass": {
    title: "Example 1: Bubble first pass",
    problem: "Show the first pass of bubble sort on [5, 1, 4, 2].",
    trace: bubblePass([5, 1, 4, 2]),
    points: ["Compare adjacent pairs only.", "Swap when the left item is larger.", "The largest value 5 reaches the right end."],
  },
  "bubble-full": {
    title: "Example 2: Bubble full trace",
    problem: "Show bubble sort passes on [5, 1, 4, 2].",
    trace: bubbleFull([5, 1, 4, 2]),
    points: ["Each pass has fewer comparisons.", "Do not jump straight to the final list.", "Intermediate states are the evidence."],
  },
  "insert-first": {
    title: "Example 3: Insertion first movement",
    problem: "Show the first insertion movement on [5, 1, 4, 2].",
    trace: { headers: ["Action", "List"], rows: [["take 1", "[5, 1, 4, 2]"], ["insert before 5", "[1, 5, 4, 2]"]], note: "The sorted left section becomes [1, 5]." },
    points: ["Treat 5 as the sorted left section.", "1 is inserted before 5.", "This is not an adjacent pass across the whole list."],
  },
  "insert-full": {
    title: "Example 4: Insertion full trace",
    problem: "Trace insertion sort on [5, 1, 4, 2].",
    trace: insertionTrace([5, 1, 4, 2]),
    points: ["The sorted left section grows after each insertion.", "Larger items are shifted right.", "The key is inserted into the gap."],
  },
};

const practice = [
  { id: "p1", prompt: "Which sort compares adjacent items and swaps them?", accepted: ["bubble", "bubble sort"], answer: "Bubble sort" },
  { id: "p2", prompt: "Which sort inserts the next item into the sorted left section?", accepted: ["insertion", "insertion sort"], answer: "Insertion sort" },
  { id: "p3", prompt: "After first bubble comparison in [5,1,4,2], what is the list?", accepted: ["[1,5,4,2]", "1,5,4,2", "1 5 4 2"], answer: "[1, 5, 4, 2]" },
  { id: "p4", prompt: "After one full bubble pass on [5,1,4,2], what is the list?", accepted: ["[1,4,2,5]", "1,4,2,5", "1 4 2 5"], answer: "[1, 4, 2, 5]" },
  { id: "p5", prompt: "After inserting 1 in insertion sort on [5,1,4,2], what is the list?", accepted: ["[1,5,4,2]", "1,5,4,2", "1 5 4 2"], answer: "[1, 5, 4, 2]" },
  { id: "p6", prompt: "In bubble sort ascending order, swap when left item is greater or smaller?", accepted: ["greater", "greater than", "left greater"], answer: "Greater than" },
  { id: "p7", prompt: "In insertion sort, which part of the list is kept sorted?", accepted: ["left", "left section", "sorted left section", "left hand section"], answer: "The left-hand section" },
  { id: "p8", prompt: "Does bubble sort search for a target value? yes or no.", accepted: ["no"], answer: "No. It sorts the whole list." },
  { id: "p9", prompt: "What temporary variable name is commonly used during a swap?", accepted: ["temp", "temporary"], answer: "Temp" },
  { id: "p10", prompt: "Is Java syntax the expected Paper 2 pseudocode format? yes or no.", accepted: ["no"], answer: "No. Use Cambridge-style pseudocode." },
];

const mistakes = [
  { wrong: "I jumped directly from [5, 1, 4, 2] to [1, 2, 4, 5].", fix: "Show the intermediate states. Sorting trace marks depend on comparisons, swaps or insertions." },
  { wrong: "I used binary search steps to sort the list.", fix: "Searching and sorting are different. Bubble and insertion sort rearrange data; binary search finds a target in sorted data." },
  { wrong: "In bubble sort I swapped items that were not adjacent.", fix: "Bubble sort compares adjacent pairs only." },
  { wrong: "In insertion sort I ignored the sorted left section.", fix: "Insertion sort inserts each next item into the correct position in the already sorted left part." },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Show the first pass of bubble sort in ascending order on [5, 1, 4, 2].",
    answer: "Compare 5 and 1, swap -> [1, 5, 4, 2]. Compare 5 and 4, swap -> [1, 4, 5, 2]. Compare 5 and 2, swap -> [1, 4, 2, 5].",
    marking: [
      { mark: "B1", text: "compares first adjacent pair 5 and 1" },
      { mark: "A1", text: "correct list after first swap [1, 5, 4, 2]" },
      { mark: "A1", text: "correct list after second swap [1, 4, 5, 2]" },
      { mark: "A1", text: "correct list after third swap [1, 4, 2, 5]" },
      { mark: "B1", text: "shows this is one full pass / largest item at end" },
    ],
    strict: [
      "Do not award full marks for final sorted list only.",
      "Allow equivalent row/table format.",
      "Do not accept swapping non-adjacent 5 and 2 directly.",
      "FT: later list states can follow from candidate's previous adjacent swap.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Trace insertion sort on [5, 1, 4, 2] by showing the list after each insertion.",
    answer: "Treat [5] as sorted. Insert 1 before 5 -> [1, 5, 4, 2]. Insert 4 between 1 and 5 -> [1, 4, 5, 2]. Insert 2 between 1 and 4 -> [1, 2, 4, 5].",
    marking: [
      { mark: "B1", text: "states first item / left section is initially sorted" },
      { mark: "A1", text: "correct state after inserting 1" },
      { mark: "A1", text: "correct state after inserting 4" },
      { mark: "A1", text: "correct state after inserting 2" },
      { mark: "M1", text: "explains larger items are shifted/moved right" },
      { mark: "B1", text: "uses insertion sort terminology accurately" },
    ],
    strict: [
      "Do not award insertion method marks for a bubble-sort pass trace.",
      "Allow final state if all intermediate insertion states are shown.",
      "Do not require exact wording 'key'.",
      "FT: later states can follow from candidate's earlier insertion state.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Compare bubble sort and insertion sort. Refer to how items are moved and what should be shown in a trace.",
    answer: "Bubble sort compares adjacent items and swaps them if they are in the wrong order, so a trace should show adjacent comparisons and swaps in each pass. Insertion sort takes the next item and inserts it into the correct position in the sorted left section, so a trace should show the item being inserted and the list after each insertion.",
    marking: [
      { mark: "B1", text: "states bubble sort compares adjacent items" },
      { mark: "B1", text: "states bubble sort swaps when needed" },
      { mark: "B1", text: "states insertion sort inserts next item" },
      { mark: "B1", text: "states insertion sort uses sorted left section" },
      { mark: "M1", text: "explains different trace evidence for the two methods" },
      { mark: "A1", text: "clear comparison rather than two unrelated definitions" },
    ],
    strict: [
      "Do not accept only 'both sort lists' for comparison.",
      "Allow 'sorted portion' for sorted left section.",
      "Do not require efficiency discussion.",
      "FT: trace evidence mark can follow from candidate's valid method descriptions.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Write Cambridge-style pseudocode statements to swap List[Index] and List[Index + 1] using Temp.",
    answer: "Temp <- List[Index]\nList[Index] <- List[Index + 1]\nList[Index + 1] <- Temp",
    marking: [
      { mark: "B1", text: "stores List[Index] in Temp first" },
      { mark: "M1", text: "copies List[Index + 1] into List[Index]" },
      { mark: "A1", text: "copies Temp into List[Index + 1]" },
      { mark: "B1", text: "uses assignment notation consistently" },
      { mark: "A1", text: "swap preserves both original values correctly" },
    ],
    strict: [
      "Do not accept overwriting one value without using Temp or equivalent.",
      "Allow Swap(List[Index], List[Index + 1]) only if question permits a built-in swap operation.",
      "Do not award Java-only syntax for Cambridge notation mark.",
      "FT: final preservation mark can follow from any correct temporary variable name.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A student says insertion sort and bubble sort are the same because they both produce a sorted list. Evaluate this statement.",
    answer: "The statement is incorrect. Both algorithms can produce a sorted list, but they use different methods. Bubble sort repeatedly compares adjacent pairs and swaps them, moving large items towards the end. Insertion sort builds a sorted left section by inserting the next item into its correct position. Therefore their traces and intermediate states are different.",
    marking: [
      { mark: "B1", text: "recognises both can produce sorted output" },
      { mark: "B1", text: "states bubble uses adjacent comparisons/swaps" },
      { mark: "B1", text: "states insertion builds sorted left section" },
      { mark: "M1", text: "explains intermediate states/traces differ" },
      { mark: "M1", text: "evaluates the claim rather than only defining terms" },
      { mark: "A1", text: "clear conclusion that the algorithms are not the same" },
    ],
    strict: [
      "Do not award full marks for only saying one is faster.",
      "Allow sorted portion for sorted left section.",
      "Do not require Big O notation at AS level.",
      "FT: conclusion can follow from candidate's valid difference.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9,\\[\\] -]/g, "");
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
    swap: "Correct. Bubble sort starts by comparing adjacent items 5 and 1, then swapping because 5 > 1.",
    insert: "That is insertion sort language, not bubble sort's first comparison.",
    middle: "That sounds like binary search, not sorting.",
    search: "Sorting rearranges the whole list; it does not find a single target first.",
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

function setupBubbleTool() {
  const input = document.querySelector("#bubbleInput");
  const result = document.querySelector("#bubbleResult");
  document.querySelector("#bubbleBtn").addEventListener("click", () => {
    const trace = bubblePass(listMap[input.value]);
    result.innerHTML = `${tableMarkup(trace.headers, trace.rows)}<p>${trace.note}</p>`;
  });
}

function setupInsertionTool() {
  const input = document.querySelector("#insertInput");
  const result = document.querySelector("#insertResult");
  document.querySelector("#insertBtn").addEventListener("click", () => {
    const trace = insertionTrace(listMap[input.value]);
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
  renderExample("bubble-pass");
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
setupChooser();
setupBubbleTool();
setupInsertionTool();
setupExamples();
setupPractice();
setupMistakes();
setupExam();
