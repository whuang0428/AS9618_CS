const examples = {
  lossless: {
    title: "Example 1: choosing lossless compression",
    problem: "A database backup must be compressed before storage. Choose a compression type.",
    steps: [
      "A backup must be restored exactly.",
      "Lossy compression permanently removes data.",
      "Therefore lossy compression is unsuitable.",
      "Choose lossless compression because it allows exact reconstruction.",
    ],
  },
  lossy: {
    title: "Example 2: choosing lossy compression",
    problem: "A photo is being prepared for a web page where a small quality loss is acceptable.",
    steps: [
      "The exact original pixel data is not essential for this use.",
      "A smaller file will reduce download time and bandwidth use.",
      "Lossy compression can remove less noticeable detail.",
      "Choose lossy compression if the quality remains acceptable.",
    ],
  },
  ratio: {
    title: "Example 3: compression ratio",
    problem: "A file is compressed from 1000 KB to 250 KB. Calculate the ratio and percentage saved.",
    steps: [
      "Compression ratio is original size : compressed size.",
      "1000:250 simplifies to 4:1.",
      "Saved size is 1000 - 250 = 750 KB.",
      "Percentage saved is 750 ÷ 1000 × 100 = 75%.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which compression type allows exact reconstruction?", accepted: ["lossless"], answer: "Lossless" },
  { id: "p2", prompt: "Which compression type permanently removes some data?", accepted: ["lossy"], answer: "Lossy" },
  { id: "p3", prompt: "Choose compression for a database backup: lossless or lossy?", accepted: ["lossless"], answer: "Lossless" },
  { id: "p4", prompt: "Choose compression for a website photo where small quality loss is acceptable.", accepted: ["lossy"], answer: "Lossy" },
  { id: "p5", prompt: "A file reduces from 1000 KB to 250 KB. What is the compression ratio?", accepted: ["4:1", "4 to 1"], answer: "4:1" },
  { id: "p6", prompt: "A file reduces from 1000 KB to 250 KB. What percentage is saved?", accepted: ["75", "75%", "75 percent"], answer: "75%" },
  { id: "p7", prompt: "Give one reason to compress a file.", accepted: ["less storage", "save storage", "faster transfer", "less bandwidth", "faster download"], answer: "Less storage or faster transfer." },
  { id: "p8", prompt: "Is compression guaranteed to reduce every file size?", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "State one precise exam keyword connected to Compression: lossless vs lossy.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Compression: lossless vs lossy include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Compare lossless and lossy compression.",
    answer: "Lossless compression reduces file size while allowing the original data to be reconstructed exactly. Lossy compression reduces file size by permanently removing some data, so the original cannot be reconstructed exactly.",
    marking: [
      { mark: "B1", text: "lossless reduces file size" },
      { mark: "B1", text: "lossless allows exact reconstruction / no data is lost" },
      { mark: "B1", text: "lossy reduces file size by removing data" },
      { mark: "B1", text: "lossy does not allow exact reconstruction / some quality or data is lost" },
    ],
    strict: [
      "Do not accept only 'lossless is better'.",
      "Do not accept 'lossy loses the whole file'.",
      "Exact reconstruction wording is required for full credit.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "A source code file must be compressed before being sent to another developer. Explain why lossless compression should be used.",
    answer: "The source code must be recovered exactly. Lossless compression allows exact reconstruction, while lossy compression could remove or alter characters and break the program.",
    marking: [
      { mark: "B1", text: "source code must be restored exactly / cannot tolerate changes" },
      { mark: "B1", text: "lossless allows exact reconstruction" },
      { mark: "B1", text: "lossy could remove or alter data / make the program incorrect" },
    ],
    strict: [
      "Do not accept only 'lossless is higher quality'.",
      "Allow equivalent examples such as syntax errors caused by changed characters.",
      "The answer must link the choice to source code requirements.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A file is compressed from 2400 KB to 600 KB. Calculate the compression ratio and the percentage saved.",
    answer: "The compression ratio is 2400:600 = 4:1. The amount saved is 2400 - 600 = 1800 KB, so the percentage saved is 1800 / 2400 x 100 = 75%.",
    marking: [
      { mark: "M1", text: "uses original:compressed as 2400:600" },
      { mark: "A1", text: "simplifies ratio to 4:1" },
      { mark: "M1", text: "calculates saved amount as 1800 KB or uses (2400 - 600) / 2400 × 100" },
      { mark: "A1", text: "75%" },
    ],
    strict: [
      "Do not accept 1:4 for compression ratio in this wording.",
      "Unit KB is not needed in the ratio.",
      "Allow FT for the percentage saved from the candidate's earlier compressed-size value only when the percentage method is otherwise correct.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "Explain why lossy compression may be suitable for streaming music.",
    answer: "Streaming benefits from smaller files because less bandwidth is required. Lossy compression can remove less noticeable sound data, reducing file size, while the quality may still be acceptable for listeners.",
    marking: [
      { mark: "B1", text: "smaller files require less bandwidth / transfer faster" },
      { mark: "B1", text: "lossy removes some data / less noticeable sound data" },
      { mark: "B1", text: "quality loss may be acceptable for the context" },
    ],
    strict: [
      "Do not accept only 'lossy is smaller'.",
      "Do not claim the original can be exactly restored.",
      "Answer must be linked to streaming or transfer context.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A candidate says compression always makes a file smaller. Explain why this is incorrect.",
    answer: "Compression depends on patterns or redundancy in the data. Some files have little redundancy or may already be compressed, and compression may add overhead, so the file may not become smaller.",
    marking: [
      { mark: "B1", text: "compression depends on patterns / redundancy" },
      { mark: "B1", text: "some files may have little redundancy or already be compressed" },
      { mark: "B1", text: "compression overhead may reduce or remove the saving" },
    ],
    strict: [
      "Do not accept only 'it depends' without explanation.",
      "Do not require naming a specific compression algorithm.",
      "Accept a clear example of random data or already-compressed data.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1;
}

function calculateCompression(original, compressed) {
  const divisor = gcd(original, compressed);
  const ratioLeft = original / divisor;
  const ratioRight = compressed / divisor;
  const saved = original - compressed;
  const savedPercent = (saved / original) * 100;
  return { ratioLeft, ratioRight, saved, savedPercent };
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 }).format(value);
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
      if (button.dataset.hook === "backup") {
        feedback.textContent = "Correct. A backup must be restored exactly, so lossless compression is required.";
      } else {
        feedback.textContent = "This may use lossy in some contexts, but the file that must be exact is the database backup.";
      }
    });
  });
}

function setupCalculator() {
  const original = document.querySelector("#originalInput");
  const compressed = document.querySelector("#compressedInput");
  const unit = document.querySelector("#unitInput");
  const result = document.querySelector("#calcResult");
  const method = document.querySelector("#calcMethod");

  function calculate() {
    const o = Number(original.value);
    const c = Number(compressed.value);
    if (!Number.isFinite(o) || !Number.isFinite(c) || o <= 0 || c <= 0) {
      result.textContent = "Enter positive sizes.";
      method.textContent = "Original and compressed sizes must be greater than 0.";
      return;
    }
    const data = calculateCompression(o, c);
    const warning = c >= o ? " This is not smaller than the original." : "";
    result.textContent = `Ratio ${formatNumber(data.ratioLeft)}:${formatNumber(data.ratioRight)}; saved ${formatNumber(data.saved)} ${unit.value}; ${formatNumber(data.savedPercent)}% saved.${warning}`;
    method.textContent = `Ratio uses ${o}:${c}. Saved size = ${o} - ${c} = ${formatNumber(data.saved)} ${unit.value}. Percentage saved = ${formatNumber(data.saved)} ÷ ${o} × 100 = ${formatNumber(data.savedPercent)}%.`;
  }

  [original, compressed].forEach((control) => control.addEventListener("input", calculate));
  unit.addEventListener("change", calculate);
  document.querySelector("#calculateBtn").addEventListener("click", calculate);
  calculate();
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
  renderExample("lossless");
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

  document.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible")
        ? button.textContent.replace("Show", "Hide")
        : button.textContent.replace("Hide", "Show");
    });
  });
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check exact reconstruction and whether the scenario can accept data loss.`;
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
          <h4>Strict notes</h4>
          <ul>${question.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
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
  setupCalculator();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
