const examples = {
  basic: {
    title: "Example 1: 8000 Hz, 16-bit, 10 seconds",
    problem: "Calculate the size of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sample resolution.",
    steps: [
      "Sampling rate: 8000 samples per second.",
      "Each sample uses 16 bits.",
      "Duration is 10 seconds.",
      "Size = 8000 × 16 × 10 = 1 280 000 bits = 160 000 bytes.",
    ],
  },
  rate: {
    title: "Example 2: increasing sampling rate",
    problem: "A clip changes from 8000 Hz to 16 000 Hz while sample resolution and duration stay the same.",
    steps: [
      "The sampling rate has doubled.",
      "Twice as many samples are stored each second.",
      "File size doubles if sample resolution and duration are unchanged.",
      "Quality may improve because the wave is measured more frequently.",
    ],
  },
  resolution: {
    title: "Example 3: increasing sample resolution",
    problem: "A clip changes from 8-bit samples to 16-bit samples while sampling rate and duration stay the same.",
    steps: [
      "The number of bits per sample has doubled.",
      "Each sample can represent more amplitude levels.",
      "File size doubles if sampling rate and duration are unchanged.",
      "Quality may improve because amplitudes can be stored more precisely.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What does sampling rate measure?", accepted: ["samples per second", "number of samples per second", "samples each second"], answer: "Samples per second." },
  { id: "p2", prompt: "What unit is commonly used for sampling rate?", accepted: ["hz", "hertz"], answer: "Hz / hertz" },
  { id: "p3", prompt: "What does sample resolution mean?", accepted: ["bits per sample", "number of bits per sample", "bits used per sample"], answer: "Bits per sample." },
  { id: "p4", prompt: "Calculate bits for 8000 Hz, 16-bit, 10 seconds mono sound.", accepted: ["1280000", "1280000 bits", "1 280 000 bits"], answer: "1 280 000 bits" },
  { id: "p5", prompt: "Convert 1 280 000 bits to bytes.", accepted: ["160000", "160000 bytes", "160 000 bytes"], answer: "160 000 bytes" },
  { id: "p6", prompt: "How many possible amplitude levels can 8-bit sample resolution represent?", accepted: ["256", "256 levels", "2^8", "2⁸"], answer: "256 levels" },
  { id: "p7", prompt: "If duration doubles and other parameters stay the same, what happens to file size?", accepted: ["doubles", "double", "it doubles"], answer: "It doubles." },
  { id: "p8", prompt: "Which parameter controls how often the wave is measured?", accepted: ["sampling rate", "sample rate"], answer: "Sampling rate" },
  { id: "p9", prompt: "State one precise exam keyword connected to Digital sound: sampling rate, sample resolution and duration.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Digital sound: sampling rate, sample resolution and duration include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Calculate the size in bytes of a 10-second mono sound clip sampled at 8000 Hz with 16-bit sample resolution.",
    answer: "8000 x 16 x 10 x 1 = 1 280 000 bits. 1 280 000 / 8 = 160 000 bytes.",
    marking: [
      { mark: "M1", text: "uses sampling rate 8000 samples per second" },
      { mark: "M1", text: "multiplies by sample resolution 16 bits" },
      { mark: "M1", text: "multiplies by duration 10 seconds" },
      { mark: "A1", text: "160 000 bytes" },
    ],
    strict: [
      "Do not award final A1 for 1 280 000 bytes.",
      "Allow 1 280 000 bits as working, but final answer must be bytes.",
      "Do not multiply by channels; this question states mono.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Explain the effect of increasing the sampling rate of a sound recording.",
    answer: "Increasing sampling rate takes more samples per second. This can make the digital recording more accurate, but increases file size because more sample values are stored.",
    marking: [
      { mark: "B1", text: "more samples are taken per second" },
      { mark: "B1", text: "sound may be represented more accurately / quality may improve" },
      { mark: "B1", text: "file size increases because more samples are stored" },
    ],
    strict: [
      "Do not accept only 'sound is better'.",
      "Do not confuse with sample resolution / bits per sample.",
      "Quality mark requires a link to more frequent measurement or accuracy.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "Explain the effect of increasing the sample resolution of a sound recording.",
    answer: "Increasing sample resolution uses more bits for each sample. This allows more possible amplitude values, which can improve accuracy, but it increases file size.",
    marking: [
      { mark: "B1", text: "more bits are used for each sample" },
      { mark: "B1", text: "more possible amplitude levels / more precise sample values" },
      { mark: "B1", text: "file size increases" },
    ],
    strict: [
      "Do not accept answers about pixels or image resolution.",
      "Do not accept only 'more samples'. That describes sampling rate.",
      "Accept bit depth as equivalent wording for sample resolution.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A 5-second mono sound clip is sampled at 4000 Hz using 8-bit sample resolution. Calculate its size in bytes.",
    answer: "4000 x 8 x 5 x 1 = 160 000 bits. 160 000 / 8 = 20 000 bytes.",
    marking: [
      { mark: "M1", text: "uses 4000 samples per second" },
      { mark: "M1", text: "multiplies by 8 bits per sample" },
      { mark: "M1", text: "multiplies by 5 seconds and converts bits to bytes" },
      { mark: "A1", text: "20 000 bytes" },
    ],
    strict: [
      "Allow 160 000 bits as intermediate working.",
      "Do not include compression or metadata.",
      "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "A candidate says that sampling rate and sample resolution are the same thing. Explain why this is incorrect.",
    answer: "Sampling rate is how many samples are taken each second. Sample resolution is how many bits are used to store each sample. They affect different parts of the calculation.",
    marking: [
      { mark: "B1", text: "sampling rate is samples per second / how often samples are taken" },
      { mark: "B1", text: "sample resolution is bits per sample" },
      { mark: "B1", text: "clear distinction or consequence in calculation / quality" },
    ],
    strict: [
      "Do not award full marks for only giving one definition.",
      "Do not accept image resolution examples as the main explanation.",
      "Accept bit depth as equivalent to sample resolution.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, " ");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function calculateSound(rate, resolution, duration) {
  const samples = rate * duration;
  const bits = samples * resolution;
  const bytes = bits / 8;
  return { samples, bits, bytes };
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
      if (button.dataset.hook === "rate") {
        feedback.textContent = "Correct. Sampling rate controls how many samples are taken every second.";
      } else if (button.dataset.hook === "resolution") {
        feedback.textContent = "Close but different. Sample resolution controls bits per sample, not samples per second.";
      } else {
        feedback.textContent = "Not this one. The phrase 'every second' points to sampling rate.";
      }
    });
  });
}

function setupSampleStrip() {
  const strip = document.querySelector("#sampleStrip");
  strip.innerHTML = Array.from({ length: 16 }, (_, index) => `
    <span class="${index % 2 === 0 ? "active" : ""}" style="--height:${30 + (index % 5) * 12}%"></span>
  `).join("");
}

function setupCalculator() {
  const rate = document.querySelector("#rateInput");
  const resolution = document.querySelector("#resolutionInput");
  const duration = document.querySelector("#durationInput");
  const result = document.querySelector("#calcResult");
  const method = document.querySelector("#calcMethod");

  function calculate() {
    const r = Number(rate.value);
    const b = Number(resolution.value);
    const d = Number(duration.value);
    if (!Number.isInteger(r) || !Number.isInteger(d) || r <= 0 || d <= 0) {
      result.textContent = "Enter positive whole-number sampling rate and duration.";
      method.textContent = "This calculator uses mono sound and ignores compression.";
      return;
    }
    const size = calculateSound(r, b, d);
    result.textContent = `${formatNumber(size.bits)} bits = ${formatNumber(size.bytes)} bytes`;
    method.textContent = `${r} samples/s × ${d} s = ${formatNumber(size.samples)} samples; ${formatNumber(size.samples)} × ${b} bits = ${formatNumber(size.bits)} bits; ${formatNumber(size.bits)} ÷ 8 = ${formatNumber(size.bytes)} bytes.`;
  }

  [rate, duration].forEach((control) => control.addEventListener("input", calculate));
  resolution.addEventListener("change", calculate);
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
  renderExample("basic");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check whether the wording asks for rate, resolution, bits or bytes.`;
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
  setupSampleStrip();
  setupCalculator();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
