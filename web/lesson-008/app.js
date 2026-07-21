const examples = {
  basic: {
    title: "Example 1: 100 × 80 image using 8-bit colour",
    problem: "Calculate the file size of a 100 by 80 pixel bitmap using 8-bit colour depth. Ignore metadata.",
    steps: [
      "Find the number of pixels: 100 × 80 = 8000 pixels.",
      "Each pixel uses 8 bits.",
      "File size = 8000 × 8 = 64 000 bits.",
      "Convert to bytes: 64 000 ÷ 8 = 8000 bytes.",
    ],
  },
  depth: {
    title: "Example 2: changing colour depth",
    problem: "A 100 × 80 image changes from 8-bit colour to 16-bit colour. What happens to the file size?",
    steps: [
      "Resolution is unchanged, so the number of pixels stays 8000.",
      "Bits per pixel doubles from 8 to 16.",
      "File size doubles from 64 000 bits to 128 000 bits.",
      "The image can represent more colours, but it needs more storage.",
    ],
  },
  resolution: {
    title: "Example 3: changing resolution",
    problem: "A 100 × 80 image changes to 200 × 160 with the same colour depth.",
    steps: [
      "Original pixels: 100 × 80 = 8000.",
      "New pixels: 200 × 160 = 32 000.",
      "The pixel count is four times larger.",
      "With the same colour depth, the bitmap file size is four times larger.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "How many pixels are in a 100 × 80 image?", accepted: ["8000", "8,000"], answer: "8000 pixels" },
  { id: "p2", prompt: "Calculate bits for 100 × 80 image with 8-bit colour depth.", accepted: ["64000", "64,000", "64000 bits", "64,000 bits"], answer: "64 000 bits" },
  { id: "p3", prompt: "Convert 64 000 bits to bytes.", accepted: ["8000", "8,000", "8000 bytes", "8,000 bytes"], answer: "8000 bytes" },
  { id: "p4", prompt: "How many colours can 4-bit colour depth represent?", accepted: ["16", "16 colours", "2^4", "2⁴"], answer: "16 colours" },
  { id: "p5", prompt: "How many colours can 8-bit colour depth represent?", accepted: ["256", "256 colours", "2^8", "2⁸"], answer: "256 colours" },
  { id: "p6", prompt: "What happens to file size if colour depth doubles and resolution is unchanged?", accepted: ["doubles", "double", "it doubles"], answer: "It doubles." },
  { id: "p7", prompt: "What term describes width × height in pixels?", accepted: ["resolution", "image resolution"], answer: "Resolution" },
  { id: "p8", prompt: "What should be ignored if a question says 'ignore metadata'?", accepted: ["metadata", "extra data", "file header", "headers"], answer: "Metadata / file header data" },
  { id: "p9", prompt: "State one precise exam keyword connected to Bitmap images: pixels, resolution and colour depth.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Bitmap images: pixels, resolution and colour depth include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Calculate the file size in bytes of a 100 by 80 pixel bitmap image using 8-bit colour depth. Ignore metadata.",
    answer: "8000 bytes",
    marking: [
      { mark: "M1", text: "calculates number of pixels as 100 × 80" },
      { mark: "M1", text: "multiplies by colour depth 8 bits per pixel" },
      { mark: "A1", text: "64 000 bits" },
      { mark: "A1", text: "8000 bytes" },
    ],
    strict: [
      "Do not award final A1 for 64 000 bytes.",
      "Allow FT for byte conversion if the candidate's bit total follows a correct method.",
      "Ignore metadata because the question explicitly says to ignore it.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "Explain how increasing the resolution of a bitmap image affects the file size and image quality.",
    answer: "Increasing resolution increases the number of pixels. More pixels require more stored colour values, so file size increases. It may improve detail or sharpness because more picture elements are used.",
    marking: [
      { mark: "B1", text: "increasing resolution increases the number of pixels" },
      { mark: "B1", text: "more pixels increase file size / storage required" },
      { mark: "B1", text: "may improve detail / quality / sharpness" },
    ],
    strict: [
      "Do not accept only 'it gets better'.",
      "Do not require the word 'sharpness' if the quality effect is clearly described.",
      "Award quality mark only if linked to more pixels/detail.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A bitmap image has 16-bit colour depth. Explain what colour depth means and calculate the number of possible colours.",
    answer: "Colour depth is the number of bits used to represent the colour of each pixel. 16-bit colour gives 2¹⁶ = 65 536 possible colours.",
    marking: [
      { mark: "B1", text: "colour depth is the number of bits per pixel" },
      { mark: "B1", text: "bits represent the colour of a pixel" },
      { mark: "M1", text: "uses 2^16" },
      { mark: "A1", text: "65 536 possible colours" },
    ],
    strict: [
      "Do not accept '16 colours'.",
      "Do not accept a file size answer unless colour count is also given.",
      "Allow 65536 without spaces or comma.",
    ],
  },
  {
    title: "Question 4",
    marks: "3 marks",
    prompt: "A student says that a 200 × 100 image is always better than a 100 × 100 image. Explain why this statement is incomplete.",
    answer: "The 200 × 100 image has more pixels, which may allow more detail, but image quality also depends on other factors such as colour depth and the original image. It will also require more storage if colour depth is unchanged.",
    marking: [
      { mark: "B1", text: "200 × 100 has more pixels / higher pixel count" },
      { mark: "B1", text: "quality depends on other factors such as colour depth / source image" },
      { mark: "B1", text: "more pixels increase storage if colour depth is unchanged" },
    ],
    strict: [
      "Do not accept only 'yes because it is bigger'.",
      "Allow bandwidth/download-time consequence instead of storage consequence.",
      "The answer must address why 'always better' is too absolute.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "Calculate the uncompressed size in bits of a 320 × 240 bitmap using 4-bit colour depth, ignoring metadata.",
    answer: "307 200 bits",
    marking: [
      { mark: "M1", text: "calculates 320 × 240 pixels" },
      { mark: "A1", text: "76 800 pixels" },
      { mark: "M1", text: "multiplies by 4 bits per pixel" },
      { mark: "A1", text: "307 200 bits" },
    ],
    strict: [
      "Do not divide by 8 because the question asks for bits.",
      "Allow FT from an incorrect pixel count if multiplied by 4.",
      "Do not include metadata or compression.",
      "Do not award a mark for a vague answer that does not identify the required technical point.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/,/g, "").replace(/\s+/g, " ");
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-GB").format(value);
}

function calculateSize(width, height, depth) {
  const pixels = width * height;
  const bits = pixels * depth;
  const bytes = bits / 8;
  return { pixels, bits, bytes };
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
      if (button.dataset.hook === "colour") {
        feedback.textContent = "Correct. A bitmap stores a colour value for each pixel.";
      } else {
        feedback.textContent = "Not quite. The pixel is represented by a stored colour code, not a tiny physical image.";
      }
    });
  });
}

function setupPixelDemo() {
  const demo = document.querySelector("#pixelDemo");
  const text = document.querySelector("#pixelDemoText");
  demo.innerHTML = Array.from({ length: 64 }, (_, index) => `
    <button type="button" class="pixel-cell ${index % 3 === 0 ? "on" : ""}" aria-label="pixel ${index + 1}"></button>
  `).join("");

  function updateCount() {
    const active = demo.querySelectorAll(".pixel-cell.on").length;
    text.textContent = `${active}/64 pixels currently use the highlighted colour. In a real bitmap, every pixel stores a colour code.`;
  }

  demo.querySelectorAll(".pixel-cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.classList.toggle("on");
      updateCount();
    });
  });
  updateCount();
}

function setupCalculator() {
  const width = document.querySelector("#widthInput");
  const height = document.querySelector("#heightInput");
  const depth = document.querySelector("#depthInput");
  const result = document.querySelector("#calcResult");
  const method = document.querySelector("#calcMethod");

  function calculate() {
    const w = Number(width.value);
    const h = Number(height.value);
    const d = Number(depth.value);
    if (!Number.isInteger(w) || !Number.isInteger(h) || w <= 0 || h <= 0) {
      result.textContent = "Enter positive whole-number pixel dimensions.";
      method.textContent = "Width and height are pixel counts, so they cannot be 0 or negative.";
      return;
    }
    const size = calculateSize(w, h, d);
    result.textContent = `${formatNumber(size.bits)} bits = ${formatNumber(size.bytes)} bytes`;
    method.textContent = `${w} × ${h} = ${formatNumber(size.pixels)} pixels; ${formatNumber(size.pixels)} × ${d} = ${formatNumber(size.bits)} bits; ${formatNumber(size.bits)} ÷ 8 = ${formatNumber(size.bytes)} bytes.`;
  }

  [width, height, depth].forEach((control) => control.addEventListener("input", calculate));
  depth.addEventListener("change", calculate);
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
      const isCorrect = item.accepted.some((answer) => normalise(answer) === response || response.includes(normalise(answer)));
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check whether the question asks for bits, bytes or colours.`;
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
  setupPixelDemo();
  setupCalculator();
  setupExamples();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
