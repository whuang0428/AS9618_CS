const examples = {
  ignore: {
    title: "Example 1: ignore metadata",
    problem: "Calculate the size of a 100 by 80 pixel image using 8-bit colour depth. Ignore metadata.",
    steps: [
      "Pixels: 100 × 80 = 8000 pixels.",
      "Bits: 8000 × 8 = 64 000 bits.",
      "Bytes: 64 000 ÷ 8 = 8000 bytes.",
      "Metadata is ignored because the question says to ignore it.",
    ],
  },
  include: {
    title: "Example 2: include metadata",
    problem: "The pixel data is 8000 bytes and metadata is 512 bytes. Calculate total file size.",
    steps: [
      "Pixel data: 8000 bytes.",
      "Metadata: 512 bytes.",
      "Total file size: 8000 + 512 = 8512 bytes.",
      "Metadata is included because the question asks for total file size and gives metadata size.",
    ],
  },
  kib: {
    title: "Example 3: convert bytes to KiB",
    problem: "Convert 8192 bytes to KiB.",
    steps: [
      "Use 1 KiB = 1024 bytes.",
      "8192 ÷ 1024 = 8.",
      "So 8192 bytes = 8 KiB.",
      "Do not divide by 1000 when the unit is KiB.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Calculate pixel data in bits for 100 × 80 image using 8-bit colour depth.", accepted: ["64000", "64000 bits", "64 000 bits"], answer: "64 000 bits" },
  { id: "p2", prompt: "Convert 64 000 bits to bytes.", accepted: ["8000", "8000 bytes", "8 000 bytes"], answer: "8000 bytes" },
  { id: "p3", prompt: "If pixel data is 8000 bytes and metadata is 512 bytes, what is total size?", accepted: ["8512", "8512 bytes", "8 512 bytes"], answer: "8512 bytes" },
  { id: "p4", prompt: "If a question says ignore metadata, should 512 bytes of metadata be added?", accepted: ["no"], answer: "No" },
  { id: "p5", prompt: "Convert 8192 bytes to KiB.", accepted: ["8", "8 kib"], answer: "8 KiB" },
  { id: "p6", prompt: "What is metadata?", accepted: ["data about data", "data about the image", "data about a file", "data about the file"], answer: "Data about the image/file." },
  { id: "p7", prompt: "Give one example of image metadata.", accepted: ["width", "height", "colour depth", "color depth", "file type", "date created", "camera model", "gps", "location"], answer: "Width, height, colour depth, file type, date, camera model or location." },
  { id: "p8", prompt: "What unit is produced by width × height × colour depth?", accepted: ["bits", "bit"], answer: "Bits" },
  { id: "p9", prompt: "State one precise exam keyword connected to Image file size calculations and metadata.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Image file size calculations and metadata include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "An image is 100 pixels wide and 80 pixels high. It uses 8-bit colour depth. Calculate the file size in bytes, ignoring metadata.",
    answer: "100 x 80 = 8000 pixels. 8000 x 8 = 64 000 bits. 64 000 / 8 = 8000 bytes.",
    marking: [
      { mark: "M1", text: "calculates number of pixels as 100 × 80" },
      { mark: "M1", text: "multiplies by 8 bits per pixel" },
      { mark: "A1", text: "64 000 bits" },
      { mark: "A1", text: "8000 bytes" },
    ],
    strict: [
      "Do not award final A1 for 64 000 bytes.",
      "Do not add metadata because the question says ignoring metadata.",
      "Allow FT from the candidate's earlier bit total only when it is subsequently divided by 8 to obtain bytes.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "The image in Question 1 has 512 bytes of metadata. Calculate the total file size in bytes if metadata is included.",
    answer: "Use the 8000-byte pixel data from Question 1 and add the 512-byte metadata: 8000 + 512 = 8512 bytes.",
    marking: [
      { mark: "M1", text: "uses or calculates pixel data size as 8000 bytes" },
      { mark: "M1", text: "identifies metadata size as 512 bytes" },
      { mark: "M1", text: "adds metadata to pixel data" },
      { mark: "A1", text: "8512 bytes" },
    ],
    strict: [
      "Do not multiply metadata by colour depth.",
      "Metadata is already given in bytes.",
      "Allow FT from the candidate's answer to Question 1 only when 512 bytes of metadata is subsequently added.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "State three examples of metadata that may be stored with an image file.",
    answer: "Width, height, colour depth, file type, date created, camera model or location data.",
    marking: [
      { mark: "B1", text: "valid image metadata example" },
      { mark: "B1", text: "second valid image metadata example" },
      { mark: "B1", text: "third valid image metadata example" },
    ],
    strict: [
      "Do not accept pixel colour values as metadata.",
      "Do not accept 'the picture' as metadata.",
      "Accept GPS / geolocation / location as one example.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain why metadata may be useful in an image file.",
    answer: "Metadata stores data about the image, such as dimensions, file type or date. Software can use it to display, organise, search or interpret the image correctly.",
    marking: [
      { mark: "B1", text: "states metadata is data about the image/file" },
      { mark: "B1", text: "gives a valid image metadata example" },
      { mark: "B1", text: "states a valid use such as display / organise / search / interpret" },
      { mark: "B1", text: "links the use to image handling or file management" },
    ],
    strict: [
      "Do not accept only 'it is useful'.",
      "Do not award the use mark for vague 'makes it better'.",
      "Privacy risk comments are valid context but not required here.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "A bitmap image is 128 × 128 pixels and uses 8-bit colour depth. It also stores 1024 bytes of metadata. Calculate the total file size in KiB.",
    answer: "128 x 128 x 8 = 131 072 bits. 131 072 / 8 = 16 384 bytes of pixel data. Add 1024 bytes of metadata to obtain 17 408 bytes. 17 408 / 1024 = 17 KiB.",
    marking: [
      { mark: "M1", text: "calculates pixel data bits as 128 × 128 × 8" },
      { mark: "A1", text: "16 384 bytes for pixel data" },
      { mark: "M1", text: "adds 1024 bytes metadata and converts using 1024 bytes per KiB" },
      { mark: "A1", text: "17 KiB" },
    ],
    strict: [
      "Do not accept 17.408 KiB from division by 1000.",
      "Do not ignore metadata because the question says it is stored and asks for total file size.",
      "Allow FT from the candidate's earlier pixel-data total only when metadata is added and the resulting bytes are subsequently converted to KiB.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, " ");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function calculateImage(width, height, depth, metadataBytes, includeMetadata) {
  const pixels = width * height;
  const pixelBits = pixels * depth;
  const pixelBytes = pixelBits / 8;
  const metadata = includeMetadata ? metadataBytes : 0;
  const totalBytes = pixelBytes + metadata;
  const totalKiB = totalBytes / 1024;
  return { pixels, pixelBits, pixelBytes, metadata, totalBytes, totalKiB };
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
      if (button.dataset.hook === "divide") {
        feedback.textContent = "Correct. 64 000 bits ÷ 8 = 8000 bytes.";
      } else {
        feedback.textContent = "No. Convert bits to bytes by dividing by 8; metadata is a separate decision.";
      }
    });
  });
}

function setupCalculator() {
  const width = document.querySelector("#widthInput");
  const height = document.querySelector("#heightInput");
  const depth = document.querySelector("#depthInput");
  const metadata = document.querySelector("#metadataInput");
  const includeMetadata = document.querySelector("#includeMetadata");
  const result = document.querySelector("#calcResult");
  const method = document.querySelector("#calcMethod");

  function calculate() {
    const w = Number(width.value);
    const h = Number(height.value);
    const d = Number(depth.value);
    const m = Number(metadata.value);
    if (!Number.isInteger(w) || !Number.isInteger(h) || !Number.isFinite(m) || w <= 0 || h <= 0 || m < 0) {
      result.textContent = "Enter positive whole-number dimensions and non-negative metadata.";
      method.textContent = "Metadata is given in bytes in this calculator.";
      return;
    }
    const size = calculateImage(w, h, d, m, includeMetadata.checked);
    result.textContent = `${formatNumber(size.totalBytes)} bytes = ${Number(size.totalKiB.toFixed(4))} KiB`;
    method.textContent = `${w} × ${h} = ${formatNumber(size.pixels)} pixels; ${formatNumber(size.pixels)} × ${d} = ${formatNumber(size.pixelBits)} bits; ${formatNumber(size.pixelBits)} ÷ 8 = ${formatNumber(size.pixelBytes)} bytes; metadata ${includeMetadata.checked ? "included" : "ignored"} = ${formatNumber(size.metadata)} bytes.`;
  }

  [width, height, metadata].forEach((control) => control.addEventListener("input", calculate));
  [depth, includeMetadata].forEach((control) => control.addEventListener("change", calculate));
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
  renderExample("ignore");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Re-read the requested unit and metadata wording.`;
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
