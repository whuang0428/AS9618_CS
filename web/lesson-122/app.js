const capacity = 4;
let stackItems = [];
let queueItems = [];
let traceIndex = 0;
let traceStack = [];

const traceSteps = [
  { op: "PUSH", item: "A" },
  { op: "PUSH", item: "B" },
  { op: "POP" },
  { op: "PUSH", item: "C" },
  { op: "POP" },
];

const examples = {
  stackTrace: {
    title: "Example 1: Stack trace",
    problem: "Trace PUSH A, PUSH B, PUSH C, POP, POP.",
    rows: [
      ["PUSH A", "A", "top is A"],
      ["PUSH B", "A, B", "top is B"],
      ["PUSH C", "A, B, C", "top is C"],
      ["POP", "A, B", "returns C"],
      ["POP", "A", "returns B"],
    ],
    code: "PUSH A\nPUSH B\nPUSH C\nItem1 <- POP()\nItem2 <- POP()\n// Item1 = C, Item2 = B",
    points: ["The last pushed item is removed first.", "The bottom item A remains.", "LIFO controls the trace."],
  },
  queueTrace: {
    title: "Example 2: Queue trace",
    problem: "Trace ENQUEUE A, ENQUEUE B, ENQUEUE C, DEQUEUE, DEQUEUE.",
    rows: [
      ["ENQUEUE A", "A", "front and rear are A"],
      ["ENQUEUE B", "A, B", "A is still front"],
      ["ENQUEUE C", "A, B, C", "C is rear"],
      ["DEQUEUE", "B, C", "returns A"],
      ["DEQUEUE", "C", "returns B"],
    ],
    code: "ENQUEUE A\nENQUEUE B\nENQUEUE C\nItem1 <- DEQUEUE()\nItem2 <- DEQUEUE()\n// Item1 = A, Item2 = B",
    points: ["The earliest item is removed first.", "New items join the rear.", "FIFO controls the trace."],
  },
  underflow: {
    title: "Example 3: Underflow check",
    problem: "Avoid popping from an empty stack.",
    rows: [
      ["Check", "IF StackPointer = 0", "empty stack"],
      ["Reject", "OUTPUT \"Stack is empty\"", "no item can be removed"],
      ["Else", "Item <- POP()", "only valid when not empty"],
    ],
    code: "IF StackPointer = 0 THEN\n    OUTPUT \"Stack is empty\"\nELSE\n    Item <- POP(Stack)\nENDIF",
    points: ["Underflow happens when removing from an empty structure.", "The check must happen before POP or DEQUEUE.", "Do not invent an item to return."],
  },
  compare: {
    title: "Example 4: Same arrivals, different removals",
    problem: "Items arrive A, B, C. Compare the first removal.",
    rows: [
      ["Stack", "POP returns C", "last in, first out"],
      ["Queue", "DEQUEUE returns A", "first in, first out"],
      ["Reason", "access rule differs", "implementation is not the definition"],
    ],
    code: "Stack: PUSH A, PUSH B, PUSH C, POP returns C\nQueue: ENQUEUE A, ENQUEUE B, ENQUEUE C, DEQUEUE returns A",
    points: ["Same input order does not mean same output order.", "The operation rule defines the ADT.", "Arrays may implement both, but do not define either."],
  },
};

const practice = [
  { id: "p1", prompt: "What access rule defines a stack?", accepted: ["lifo", "last in first out", "last-in-first-out"], answer: "LIFO: last in, first out." },
  { id: "p2", prompt: "What access rule defines a queue?", accepted: ["fifo", "first in first out", "first-in-first-out"], answer: "FIFO: first in, first out." },
  { id: "p3", prompt: "Which stack operation adds an item?", accepted: ["push"], answer: "PUSH." },
  { id: "p4", prompt: "Which stack operation removes the top item?", accepted: ["pop"], answer: "POP." },
  { id: "p5", prompt: "Which queue operation adds an item at the rear?", accepted: ["enqueue"], answer: "ENQUEUE." },
  { id: "p6", prompt: "Which queue operation removes the front item?", accepted: ["dequeue"], answer: "DEQUEUE." },
  { id: "p7", prompt: "PUSH A, PUSH B, POP returns which item?", accepted: ["b"], answer: "B." },
  { id: "p8", prompt: "ENQUEUE A, ENQUEUE B, DEQUEUE returns which item?", accepted: ["a"], answer: "A." },
  { id: "p9", prompt: "What error occurs when removing from an empty stack or queue?", accepted: ["underflow"], answer: "Underflow." },
  { id: "p10", prompt: "What error occurs when adding to a full fixed-size stack or queue?", accepted: ["overflow"], answer: "Overflow." },
];

const mistakes = [
  {
    wrong: "I defined a stack as an array.",
    fix: "Define the behaviour: a stack is an ADT where the last item added is the first item removed. An array is only one implementation.",
  },
  {
    wrong: "I popped A after PUSH A, PUSH B, PUSH C.",
    fix: "POP returns C because C was pushed last and is at the top.",
  },
  {
    wrong: "I dequeued C after ENQUEUE A, ENQUEUE B, ENQUEUE C.",
    fix: "DEQUEUE returns A because A was first to enter the queue.",
  },
  {
    wrong: "I removed an item from an empty structure and continued the trace.",
    fix: "State underflow or reject the operation. Do not return a made-up item.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "Define stack, queue and abstract data type. Your answer should refer to the access rules.",
    answer: "A stack is an abstract data type where the last item added is the first item removed, known as LIFO. A queue is an abstract data type where the first item added is the first item removed, known as FIFO. An abstract data type is defined by its operations and behaviour rather than by a particular implementation.",
    marking: [
      { mark: "B1", text: "defines stack using last in, first out / LIFO" },
      { mark: "B1", text: "mentions stack operations such as push and pop" },
      { mark: "B1", text: "defines queue using first in, first out / FIFO" },
      { mark: "B1", text: "mentions queue operations such as enqueue and dequeue" },
      { mark: "B1", text: "states ADT is defined by operations/behaviour" },
      { mark: "B1", text: "states implementation is separate from the ADT definition" },
    ],
    strict: [
      "Do not award full stack definition for only saying 'an array'.",
      "Allow equivalent wording for LIFO and FIFO.",
      "Do not accept queue as 'last in first out'.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Trace the stack operations PUSH A, PUSH B, PUSH C, POP, PUSH D, POP. State the values returned by POP and the final stack contents from bottom to top.",
    answer: "After PUSH A, PUSH B, PUSH C the stack is A, B, C with C at the top. The first POP returns C, leaving A, B. PUSH D gives A, B, D. The second POP returns D. Final stack contents from bottom to top are A, B.",
    marking: [
      { mark: "M1", text: "shows A, B, C after three pushes with C on top" },
      { mark: "A1", text: "first POP returns C" },
      { mark: "M1", text: "shows stack A, B after first POP" },
      { mark: "M1", text: "pushes D to the top" },
      { mark: "A1", text: "second POP returns D" },
      { mark: "A1", text: "final stack contents are A, B from bottom to top" },
    ],
    strict: [
      "Do not award POP marks for FIFO removal order.",
      "Allow top-to-bottom final contents if clearly labelled.",
      "Do not accept final stack A, B, D because D has been popped.",
    ],
  },
  {
    title: "Question 3",
    marks: "6 marks",
    prompt: "Trace the queue operations ENQUEUE A, ENQUEUE B, ENQUEUE C, DEQUEUE, ENQUEUE D, DEQUEUE. State the values returned by DEQUEUE and the final queue from front to rear.",
    answer: "After ENQUEUE A, B, C the queue is A, B, C with A at the front. The first DEQUEUE returns A, leaving B, C. ENQUEUE D adds D at the rear, giving B, C, D. The second DEQUEUE returns B. Final queue from front to rear is C, D.",
    marking: [
      { mark: "M1", text: "shows A, B, C after three enqueues with A at front" },
      { mark: "A1", text: "first DEQUEUE returns A" },
      { mark: "M1", text: "shows queue B, C after first DEQUEUE" },
      { mark: "M1", text: "adds D at the rear" },
      { mark: "A1", text: "second DEQUEUE returns B" },
      { mark: "A1", text: "final queue is C, D from front to rear" },
    ],
    strict: [
      "Do not award DEQUEUE marks for LIFO removal order.",
      "Allow rear-to-front final contents if clearly labelled.",
      "Do not accept final queue A, C, D because A has been removed.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A stack has maximum size 3 and currently contains A, B, C with C at the top. Explain what should happen if PUSH D is attempted.",
    answer: "The stack is full because it already contains the maximum number of three items. Attempting PUSH D would cause overflow. The algorithm should check whether the stack is full before pushing and should reject the operation or output an error message. D should not be added unless space is available.",
    marking: [
      { mark: "B1", text: "identifies current stack size is maximum / full" },
      { mark: "B1", text: "names overflow" },
      { mark: "B1", text: "states full check should happen before push" },
      { mark: "B1", text: "rejects the PUSH or outputs suitable error" },
      { mark: "B1", text: "states D is not added" },
    ],
    strict: [
      "Do not award overflow mark for underflow.",
      "Allow 'stack full error' as equivalent to overflow.",
      "Do not accept overwriting A unless circular overwrite is explicitly specified, which it is not.",
    ],
  },
  {
    title: "Question 5",
    marks: "7 marks",
    prompt: "Write pseudocode for popping an item from a stack using StackPointer. If the stack is empty, output an error message.",
    answer: "IF StackPointer = 0 THEN\n    OUTPUT \"Stack is empty\"\nELSE\n    Item <- Stack[StackPointer]\n    StackPointer <- StackPointer - 1\nENDIF",
    marking: [
      { mark: "B1", text: "checks whether StackPointer indicates empty stack" },
      { mark: "A1", text: "outputs suitable empty-stack / underflow message when empty" },
      { mark: "M1", text: "uses ELSE or equivalent so pop occurs only when not empty" },
      { mark: "M1", text: "accesses item at StackPointer / top position" },
      { mark: "A1", text: "assigns removed item to a variable" },
      { mark: "M1", text: "updates StackPointer after pop" },
      { mark: "A1", text: "decrements StackPointer by 1" },
    ],
    strict: [
      "Do not award item-access mark if candidate removes from bottom of stack.",
      "Allow empty condition such as Top = -1 if indexing scheme is clear.",
      "Do not accept incrementing StackPointer after pop.",
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
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/[^a-z0-9 -]/g, "");
}

function tableMarkup(headers, rows) {
  return `
    <div class="result-table" style="--cols: ${headers.length}">
      <div class="table-row table-head">${headers.map((head) => `<div>${escapeHtml(head)}</div>`).join("")}</div>
      ${rows.map((row) => `<div class="table-row">${row.map((cell) => `<div>${escapeHtml(cell)}</div>`).join("")}</div>`).join("")}
    </div>
  `;
}

function renderState() {
  const stack = document.querySelector("#stackState");
  const queue = document.querySelector("#queueState");
  stack.innerHTML = stackItems.length
    ? stackItems.slice().reverse().map((item, index) => `<span>${escapeHtml(item)}${index === 0 ? " top" : ""}</span>`).join("")
    : "<em>empty</em>";
  queue.innerHTML = queueItems.length
    ? queueItems.map((item, index) => `<span>${escapeHtml(item)}${index === 0 ? " front" : index === queueItems.length - 1 ? " rear" : ""}</span>`).join("")
    : "<em>empty</em>";
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const messages = {
    a: "Correct. In a queue, A arrived first, so A leaves first.",
    b: "B is in the middle. Queues are not a popularity contest.",
    c: "C would leave first in a stack, not in a queue.",
    all: "One operation removes one item unless the question says otherwise.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = messages[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const input = document.querySelector("#itemInput");
  const result = document.querySelector("#simResult");
  renderState();
  document.querySelector("#stackPushBtn").addEventListener("click", () => {
    const item = input.value.trim() || "?";
    if (stackItems.length >= capacity) {
      result.textContent = "Stack overflow: capacity is 4, so PUSH is rejected.";
      return;
    }
    stackItems.push(item);
    result.textContent = `PUSH ${item}: added to the top of the stack.`;
    renderState();
  });
  document.querySelector("#stackPopBtn").addEventListener("click", () => {
    if (stackItems.length === 0) {
      result.textContent = "Stack underflow: POP from an empty stack is invalid.";
      return;
    }
    const item = stackItems.pop();
    result.textContent = `POP returns ${item}.`;
    renderState();
  });
  document.querySelector("#queueEnqBtn").addEventListener("click", () => {
    const item = input.value.trim() || "?";
    if (queueItems.length >= capacity) {
      result.textContent = "Queue overflow: capacity is 4, so ENQUEUE is rejected.";
      return;
    }
    queueItems.push(item);
    result.textContent = `ENQUEUE ${item}: added to the rear of the queue.`;
    renderState();
  });
  document.querySelector("#queueDeqBtn").addEventListener("click", () => {
    if (queueItems.length === 0) {
      result.textContent = "Queue underflow: DEQUEUE from an empty queue is invalid.";
      return;
    }
    const item = queueItems.shift();
    result.textContent = `DEQUEUE returns ${item}.`;
    renderState();
  });
}

function setupTrace() {
  const output = document.querySelector("#traceOutput");
  const render = (message) => {
    output.innerHTML = `<p>${escapeHtml(message)}</p><p>Stack bottom to top: <strong>${escapeHtml(traceStack.join(", ") || "empty")}</strong></p>`;
  };
  document.querySelector("#traceStepBtn").addEventListener("click", () => {
    if (traceIndex >= traceSteps.length) {
      render("Trace complete.");
      return;
    }
    const step = traceSteps[traceIndex];
    if (step.op === "PUSH") {
      traceStack.push(step.item);
      render(`PUSH ${step.item}: ${step.item} is now on top.`);
    } else {
      const item = traceStack.pop();
      render(`POP returns ${item}.`);
    }
    traceIndex += 1;
  });
  document.querySelector("#traceResetBtn").addEventListener("click", () => {
    traceIndex = 0;
    traceStack = [];
    output.textContent = "Ready: PUSH A, PUSH B, POP, PUSH C, POP.";
  });
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleOutput").innerHTML = `
    <article class="worked-card">
      <h3>${escapeHtml(example.title)}</h3>
      <p><strong>Problem:</strong> ${escapeHtml(example.problem)}</p>
      ${tableMarkup(["Operation", "Contents", "Reason/result"], example.rows)}
      <p><strong>Cambridge-style pseudocode / trace:</strong></p>
      <pre><code>${escapeHtml(example.code)}</code></pre>
      <ul>${example.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
    </article>
  `;
}

function setupExamples() {
  renderExample("stackTrace");
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
      mark.textContent = correct ? "Correct. The ADT rule is precise." : "Not quite. Check whether this is stack/LIFO or queue/FIFO.";
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
          <p><strong>Mark scheme:</strong></p>
          <ul>${question.marking.map((point) => `<li><strong>${escapeHtml(point.mark)}</strong> ${escapeHtml(point.text)}</li>`).join("")}</ul>
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
setupSimulator();
setupTrace();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
