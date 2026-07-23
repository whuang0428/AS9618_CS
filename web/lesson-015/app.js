const triageData = {
  mib: {
    result: "Use binary prefix conversion.",
    method: "KiB and MiB use powers of 1024. Show each step and write the final unit.",
  },
  image: {
    result: "Use bitmap file-size calculation.",
    method: "File size in bits = width x height x colour depth. Convert to bytes only if asked.",
  },
  sound: {
    result: "Use sound file-size calculation.",
    method: "File size in bits = sampling rate x sample resolution x duration x channels.",
  },
  negative: {
    result: "Use signed representation reasoning.",
    method: "Check whether sign and magnitude or two's complement is being used before converting.",
  },
  exact: {
    result: "Use lossless compression reasoning.",
    method: "Exact reconstruction means the decompressed file must be identical to the original.",
  },
};

const examples = {
  units: {
    title: "Example 1: binary prefix calculation",
    problem: "Convert 3 MiB into bytes.",
    steps: [
      "MiB is a binary prefix, so use 1024.",
      "3 MiB = 3 x 1024 KiB.",
      "3 x 1024 x 1024 bytes = 3 145 728 bytes.",
      "Final answer must include bytes.",
    ],
  },
  image: {
    title: "Example 2: bitmap file size",
    problem: "A 640 x 480 image uses 16-bit colour depth. Calculate the file size in bytes.",
    steps: [
      "Pixels = 640 x 480 = 307 200.",
      "Bits = 307 200 x 16 = 4 915 200 bits.",
      "Bytes = 4 915 200 / 8 = 614 400 bytes.",
      "Metadata is ignored unless the question includes it.",
    ],
  },
  explain: {
    title: "Example 3: scenario explanation",
    problem: "A museum archive stores original scanned documents. Explain why lossless compression is suitable.",
    steps: [
      "Name the mechanism: lossless compression.",
      "Explain it: the original file can be reconstructed exactly after decompression.",
      "Link to context: archive documents must preserve the original content.",
      "Consequence: no data is permanently removed, so meaning/evidence is not changed.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "1 KiB = how many bytes?", accepted: ["1024", "1024 bytes"], answer: "1024 bytes" },
  { id: "p2", prompt: "6 MiB = how many bytes?", accepted: ["6291456", "6291456 bytes", "6,291,456", "6,291,456 bytes"], answer: "6 x 1024 x 1024 = 6 291 456 bytes" },
  { id: "p3", prompt: "Convert unsigned binary 11010110 to denary.", accepted: ["214"], answer: "214" },
  { id: "p4", prompt: "How many values can 8 bits represent?", accepted: ["256"], answer: "256 values" },
  { id: "p5", prompt: "A 200 x 150 bitmap uses 8-bit colour depth. File size in bits?", accepted: ["240000", "240000 bits", "240,000", "240,000 bits"], answer: "200 x 150 x 8 = 240 000 bits" },
  { id: "p6", prompt: "A mono sound file uses 8000 Hz, 8-bit samples, 10 seconds. Size in bits?", accepted: ["640000", "640000 bits", "640,000", "640,000 bits"], answer: "8000 x 8 x 10 x 1 = 640 000 bits" },
  { id: "p7", prompt: "Which compression type allows exact reconstruction?", accepted: ["lossless"], answer: "Lossless compression" },
  { id: "p8", prompt: "Which character set is normally more suitable for multilingual text: ASCII or Unicode?", accepted: ["unicode"], answer: "Unicode" },
  { id: "p9", prompt: "In a file-size answer, what should be written after the number?", accepted: ["unit", "units"], answer: "A unit, such as bits or bytes" },
  { id: "p10", prompt: "For an exam explanation, what should follow a correct keyword?", accepted: ["explanation", "reason", "consequence", "reason and consequence"], answer: "A reason/explanation and a consequence linked to the scenario" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A bitmap image is 300 pixels wide and 200 pixels high. It uses 16-bit colour depth. Calculate the file size in bytes. Show your working.",
    answer: "300 x 200 x 16 = 960 000 bits. 960 000 / 8 = 120 000 bytes.",
    marking: [
      { mark: "M1", text: "uses width x height x colour depth" },
      { mark: "A1", text: "300 x 200 x 16 = 960 000 bits" },
      { mark: "M1", text: "divides by 8 to convert bits to bytes" },
      { mark: "A1", text: "120 000 bytes" },
    ],
    strict: [
      "Do not award final A1 if the unit is missing or incorrect.",
      "Do not include metadata unless stated in the question.",
      "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A mono sound file is sampled at 44 100 Hz using 16-bit sample resolution for 10 seconds. Calculate the file size in bits.",
    answer: "44 100 x 16 x 10 x 1 = 7 056 000 bits.",
    marking: [
      { mark: "M1", text: "uses sampling rate x sample resolution x duration" },
      { mark: "B1", text: "recognises mono means one channel" },
      { mark: "A1", text: "44 100 x 16 x 10" },
      { mark: "A1", text: "7 056 000 bits" },
    ],
    strict: [
      "Do not divide by 8 because the question asks for bits.",
      "Do not confuse sample resolution with sampling rate.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "Convert the unsigned binary number 10110101 to denary. Show your working.",
    answer: "128 + 32 + 16 + 4 + 1 = 181.",
    marking: [
      { mark: "M1", text: "uses 8-bit place values correctly" },
      { mark: "M1", text: "selects active place values 128, 32, 16, 4 and 1" },
      { mark: "A1", text: "181" },
    ],
    strict: [
      "Do not accept 10110101 as denary.",
      "No sign bit is involved because the question says unsigned.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A school website stores pages in English, Chinese and Arabic. Explain why Unicode is more suitable than ASCII.",
    answer: "Unicode supports a much wider range of characters and can represent characters from many languages. ASCII is limited mainly to basic English characters, so it may not represent Chinese or Arabic text correctly. This makes Unicode more suitable for a multilingual website.",
    marking: [
      { mark: "B1", text: "Unicode supports a wider range of characters" },
      { mark: "B1", text: "Unicode supports many languages / multilingual text" },
      { mark: "B1", text: "ASCII is limited / mainly basic English characters" },
      { mark: "B1", text: "links to Chinese and Arabic characters" },
      { mark: "B1", text: "links choice to the website requirement" },
    ],
    strict: [
      "Do not accept only 'Unicode has more bits'.",
      "Do not accept only 'Unicode is better'.",
      "Answer must be linked to multilingual content.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A legal archive stores scanned contracts. Discuss whether lossless or lossy compression is more suitable.",
    answer: "Lossless compression is more suitable for original contracts because the file can be reconstructed exactly after decompression. This matters because legal documents must not have content altered or removed. Lossy compression permanently removes data and could change detail or meaning, although it may reduce file size more. Lossy compression may be suitable only for non-critical preview copies, not the original archive.",
    marking: [
      { mark: "B1", text: "identifies lossless as suitable for originals" },
      { mark: "B1", text: "explains exact reconstruction" },
      { mark: "B1", text: "links exact reconstruction to legal documents/contracts" },
      { mark: "B1", text: "explains lossy permanently removes data" },
      { mark: "B1", text: "gives a consequence such as changed detail/meaning/evidence" },
      { mark: "B1", text: "balanced point, e.g. lossy may be used only for preview/non-critical copies" },
    ],
    strict: [
      "Do not award for 'lossless is higher quality' without exact reconstruction.",
      "Do not recommend lossy for originals unless risk is clearly discussed.",
      "Award scenario-linked reasoning over generic definitions.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

let remainingSeconds = 360;
let timerId = null;

function normalise(value) {
  return value.trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = button.dataset.hook === "units"
        ? "Correct. A missing unit can block a final accuracy mark even when the arithmetic is fine."
        : "This answer may be good, but it is not the most dangerous one here because it already includes a clear method or scenario link.";
    });
  });
}

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secs}`;
}

function renderTimer() {
  document.querySelector("#timerDisplay").textContent = formatTime(remainingSeconds);
}

function setupTimer() {
  document.querySelector("#startTimer").addEventListener("click", () => {
    if (timerId) return;
    timerId = window.setInterval(() => {
      remainingSeconds = Math.max(0, remainingSeconds - 1);
      renderTimer();
      if (remainingSeconds === 0) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }, 1000);
  });

  document.querySelector("#pauseTimer").addEventListener("click", () => {
    window.clearInterval(timerId);
    timerId = null;
  });

  document.querySelector("#resetTimer").addEventListener("click", () => {
    window.clearInterval(timerId);
    timerId = null;
    remainingSeconds = 360;
    renderTimer();
  });

  renderTimer();
}

function setupTriageTool() {
  const select = document.querySelector("#clueInput");
  const result = document.querySelector("#triageResult");
  const method = document.querySelector("#triageMethod");
  function update() {
    const item = triageData[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", update);
  document.querySelector("#triageBtn").addEventListener("click", update);
  update();
}

function renderExample(key) {
  const example = examples[key];
  document.querySelector("#exampleBox").innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>${example.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
  `;
}

function setupExamples() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("units");
}

function setupAnswerToggles(scope = document) {
  scope.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>${index + 1}. ${item.prompt}</label>
      <div class="practice-row">
        <input type="text" aria-label="${item.prompt}" />
        <span class="mark" aria-live="polite"></span>
      </div>
      <button type="button" class="answer-toggle" data-answer="answer-${item.id}">Show answer</button>
      <div class="answer-panel" id="answer-${item.id}">${item.answer}</div>
    </div>
  `).join("");

  setupAnswerToggles(list);
}

function setupPractice() {
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const container = document.querySelector(`#${item.id}`);
      const input = container.querySelector("input");
      const mark = container.querySelector(".mark");
      const response = normalise(input.value);
      const isCorrect = item.accepted.some((answer) => {
        const expected = normalise(answer);
        return response === expected || response.includes(expected);
      });
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Review any missing method, unit or scenario link.`;
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index}`;
    return `
      <article class="exam-card">
        <div class="exam-head">
          <h3>${question.title}</h3>
          <span>${question.marks}</span>
        </div>
        <p>${question.prompt}</p>
        <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
        <div class="ms-panel" id="${msId}">
          <h4>CIE-style mark scheme</h4>
          <p><strong>Answer:</strong> ${question.answer}</p>
          <ul>${question.marking.map((point) => `<li><strong>${point.mark}</strong> ${point.text}</li>`).join("")}</ul>
        </div>
      </article>
    `;
  }).join("");

  document.querySelectorAll(".ms-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.ms}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupTimer();
  setupTriageTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
