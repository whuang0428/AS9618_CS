const examples = {
  stereo: {
    title: "Example 1: stereo calculation",
    problem: "Calculate the size of a 10-second stereo clip sampled at 8000 Hz with 16-bit sample resolution.",
    steps: [
      "Stereo has 2 channels.",
      "Size in bits = 8000 × 16 × 10 × 2.",
      "This gives 2 560 000 bits.",
      "Bytes = 2 560 000 ÷ 8 = 320 000 bytes.",
    ],
  },
  kib: {
    title: "Example 2: convert bytes to KiB",
    problem: "Convert 160 000 bytes to KiB.",
    steps: [
      "Use 1 KiB = 1024 bytes.",
      "160 000 ÷ 1024 = 156.25.",
      "So 160 000 bytes = 156.25 KiB.",
      "Do not divide by 1000 when the unit is KiB.",
    ],
  },
  compare: {
    title: "Example 3: compare mono and stereo",
    problem: "A mono clip and a stereo clip have the same sampling rate, sample resolution and duration. Compare their file sizes.",
    steps: [
      "Mono has 1 channel.",
      "Stereo has 2 channels.",
      "Stereo stores twice as many sample values.",
      "Therefore the stereo file size is twice the mono file size if all other factors match.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "How many channels are used in mono sound?", accepted: ["1", "one", "1 channel"], answer: "1 channel" },
  { id: "p2", prompt: "How many channels are used in stereo sound?", accepted: ["2", "two", "2 channels"], answer: "2 channels" },
  { id: "p3", prompt: "Calculate bits for 8000 Hz, 16-bit, 10 seconds, stereo.", accepted: ["2560000", "2560000 bits", "2 560 000 bits"], answer: "2 560 000 bits" },
  { id: "p4", prompt: "Convert 2 560 000 bits to bytes.", accepted: ["320000", "320000 bytes", "320 000 bytes"], answer: "320 000 bytes" },
  { id: "p5", prompt: "Convert 160 000 bytes to KiB.", accepted: ["156.25", "156.25 kib"], answer: "156.25 KiB" },
  { id: "p6", prompt: "What happens to file size if channels double and all other factors stay the same?", accepted: ["doubles", "double", "it doubles"], answer: "It doubles." },
  { id: "p7", prompt: "What is the full sound file size formula in bits?", accepted: ["sampling rate × sample resolution × duration × channels", "rate × resolution × duration × channels"], answer: "sampling rate × sample resolution × duration × channels" },
  { id: "p8", prompt: "Which unit conversion uses 1024 bytes?", accepted: ["kib", "kibibyte", "bytes to kib"], answer: "Bytes to KiB" },
  { id: "p9", prompt: "State one precise exam keyword connected to Sound file size calculations.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Sound file size calculations include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Calculate the size in bytes of a 10-second stereo sound clip sampled at 8000 Hz with 16-bit sample resolution.",
    answer: "8000 x 16 x 10 x 2 = 2 560 000 bits. 2 560 000 / 8 = 320 000 bytes.",
    marking: [
      { mark: "M1", text: "uses sampling rate 8000 and duration 10 seconds" },
      { mark: "M1", text: "multiplies by 16 bits per sample" },
      { mark: "M1", text: "multiplies by 2 channels for stereo" },
      { mark: "A1", text: "320 000 bytes" },
    ],
    strict: [
      "Do not award final A1 for 2 560 000 bytes.",
      "Allow 2 560 000 bits as working.",
      "Do not omit the stereo channel factor.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Convert 160 000 bytes to KiB.",
    answer: "1 KiB = 1024 bytes, so 160 000 / 1024 = 156.25 KiB.",
    marking: [
      { mark: "M1", text: "uses 1024 bytes per KiB" },
      { mark: "M1", text: "divides 160 000 by 1024" },
      { mark: "A1", text: "156.25 KiB" },
    ],
    strict: [
      "Do not accept 160 KiB from division by 1000.",
      "Allow 156.3 KiB only if the question permits rounding.",
      "Unit must be KiB or clearly equivalent.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why a stereo sound file is larger than a matching mono sound file.",
    answer: "Stereo has two channels while mono has one. If sampling rate, sample resolution and duration are the same, stereo stores twice as many sample values, so the file size is doubled.",
    marking: [
      { mark: "B1", text: "mono has 1 channel" },
      { mark: "B1", text: "stereo has 2 channels" },
      { mark: "B1", text: "same rate / resolution / duration means only channel factor changes" },
      { mark: "B1", text: "stereo file size is twice mono size / larger because more sample values are stored" },
    ],
    strict: [
      "Do not accept only 'stereo is better'.",
      "Do not award full marks unless channels are explicitly discussed.",
      "Accept left and right channel explanation.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A 60-second stereo clip is sampled at 44 100 Hz using 16-bit sample resolution. Calculate the uncompressed size in MiB.",
    answer: "44 100 x 16 x 60 x 2 = 84 672 000 bits. Divide by 8 to obtain 10 584 000 bytes, then divide by 1 048 576 to obtain approximately 10.09 MiB.",
    marking: [
      { mark: "M1", text: "uses 44 100 × 16 × 60 × 2" },
      { mark: "A1", text: "84 672 000 bits / 10 584 000 bytes" },
      { mark: "M1", text: "converts bytes to MiB using 1024 × 1024" },
      { mark: "A1", text: "approximately 10.09 MiB" },
    ],
    strict: [
      "Do not divide by 1000 × 1000 for MiB.",
      "Answer may be rounded sensibly if working is shown.",
      "Allow FT from the candidate's earlier byte total only when it is subsequently divided by 1 048 576 to obtain MiB.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "State two changes that would reduce the file size of an uncompressed sound recording and explain one effect of each.",
    answer: "Reducing sampling rate stores fewer samples per second, reducing file size but may reduce accuracy. Reducing sample resolution uses fewer bits per sample, reducing file size but may reduce amplitude precision.",
    marking: [
      { mark: "B1", text: "valid size-reducing change, e.g. lower sampling rate / lower sample resolution / shorter duration / fewer channels" },
      { mark: "B1", text: "valid effect of that change" },
      { mark: "B1", text: "second valid size-reducing change" },
      { mark: "B1", text: "valid effect of second change" },
    ],
    strict: [
      "Do not accept compression as the main answer for this uncompressed calculation question.",
      "Do not accept only 'make quality worse' without naming the parameter.",
      "Effects may include reduced quality, reduced accuracy, fewer amplitude levels or shorter recording.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, " ");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB", { maximumFractionDigits: 4 }).format(value);
}

function calculateSound(rate, resolution, duration, channels) {
  const samplesPerChannel = rate * duration;
  const totalSamples = samplesPerChannel * channels;
  const bits = totalSamples * resolution;
  const bytes = bits / 8;
  const kib = bytes / 1024;
  const mib = kib / 1024;
  return { samplesPerChannel, totalSamples, bits, bytes, kib, mib };
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
      feedback.textContent = button.dataset.hook === "double"
        ? "Correct. Stereo uses two channels, so it doubles the mono size when everything else matches."
        : "Not quite. If only the channel count changes from mono to stereo, the size doubles.";
    });
  });
}

function setupCalculator() {
  const rate = document.querySelector("#rateInput");
  const resolution = document.querySelector("#resolutionInput");
  const duration = document.querySelector("#durationInput");
  const channels = document.querySelector("#channelInput");
  const result = document.querySelector("#calcResult");
  const method = document.querySelector("#calcMethod");

  function calculate() {
    const r = Number(rate.value);
    const b = Number(resolution.value);
    const d = Number(duration.value);
    const c = Number(channels.value);
    if (!Number.isInteger(r) || !Number.isInteger(d) || r <= 0 || d <= 0) {
      result.textContent = "Enter positive whole-number sampling rate and duration.";
      method.textContent = "This calculator assumes uncompressed sound.";
      return;
    }
    const size = calculateSound(r, b, d, c);
    result.textContent = `${formatNumber(size.bits)} bits = ${formatNumber(size.bytes)} bytes = ${formatNumber(size.kib)} KiB = ${formatNumber(size.mib)} MiB`;
    method.textContent = `${r} × ${b} × ${d} × ${c} = ${formatNumber(size.bits)} bits; ÷8 = ${formatNumber(size.bytes)} bytes; ÷1024 = ${formatNumber(size.kib)} KiB; ÷1024 = ${formatNumber(size.mib)} MiB.`;
  }

  [rate, duration].forEach((control) => control.addEventListener("input", calculate));
  [resolution, channels].forEach((control) => control.addEventListener("change", calculate));
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
  renderExample("stereo");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check channels and unit conversions before the final answer.`;
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
  setupCalculator();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
