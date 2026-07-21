const units = [
  { id: "bit", label: "bit", bits: 1, note: "smallest binary digit" },
  { id: "nibble", label: "nibble", bits: 4, note: "4 bits" },
  { id: "B", label: "byte (B)", bits: 8, note: "8 bits" },
  { id: "kB", label: "kB", bits: 8 * 1000, note: "1000 bytes" },
  { id: "KiB", label: "KiB", bits: 8 * 1024, note: "1024 bytes" },
  { id: "MB", label: "MB", bits: 8 * 1000 ** 2, note: "1000 kB" },
  { id: "MiB", label: "MiB", bits: 8 * 1024 ** 2, note: "1024 KiB" },
  { id: "GB", label: "GB", bits: 8 * 1000 ** 3, note: "1000 MB" },
  { id: "GiB", label: "GiB", bits: 8 * 1024 ** 3, note: "1024 MiB" },
  { id: "TB", label: "TB", bits: 8 * 1000 ** 4, note: "1000 GB" },
  { id: "TiB", label: "TiB", bits: 8 * 1024 ** 4, note: "1024 GiB" },
];

const examples = {
  icon: {
    title: "Example 1: 2048-bit icon",
    problem: "A small icon uses 2048 bits. Convert this into bytes, nibbles and KiB.",
    steps: [
      "2048 bits / 8 = 256 bytes",
      "2048 bits / 4 = 512 nibbles",
      "256 bytes / 1024 = 0.25 KiB",
      "Explanation: confusing bit and byte makes the answer eight times wrong.",
    ],
  },
  file: {
    title: "Example 2: 5 MiB file",
    problem: "A file is 5 MiB. Convert it into KiB, bytes and bits.",
    steps: [
      "5 MiB x 1024 = 5120 KiB",
      "5120 KiB x 1024 = 5,242,880 bytes",
      "5,242,880 bytes x 8 = 41,943,040 bits",
      "Reason: MiB and KiB are binary prefixes, so the multiplier is 1024.",
    ],
  },
  drive: {
    title: "Example 3: 32 GB drive display",
    problem: "A memory card is sold as 32 GB. Estimate its size in GiB.",
    steps: [
      "32 GB = 32,000,000,000 bytes",
      "1 GiB = 1024 x 1024 x 1024 bytes = 1,073,741,824 bytes",
      "32,000,000,000 / 1,073,741,824 = about 29.8 GiB",
      "The space did not disappear. The measuring scale changed.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "Convert 3 bytes into bits.",
    accepted: ["24", "24 bits"],
    answer: "24 bits",
  },
  {
    id: "p2",
    prompt: "Convert 4096 bytes into KiB.",
    accepted: ["4", "4 kib"],
    answer: "4 KiB",
  },
  {
    id: "p3",
    prompt: "Convert 2 GiB into MiB.",
    accepted: ["2048", "2048 mib"],
    answer: "2048 MiB",
  },
  {
    id: "p4",
    prompt: "Which is larger: 1 MB or 1 MiB?",
    accepted: ["1 mib", "mib", "1mib"],
    answer: "1 MiB",
  },
  {
    id: "p5",
    prompt: "Convert 1 TiB into GiB.",
    accepted: ["1024", "1024 gib"],
    answer: "1024 GiB",
  },
  {
    id: "p6",
    prompt: "State the number of bytes in 1 MB.",
    accepted: ["1000000", "1,000,000", "1000000 bytes", "1,000,000 bytes"],
    answer: "1,000,000 bytes",
  },
  { id: "p7", prompt: "State one precise exam keyword connected to Bits, bytes, nibbles and storage units.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p8", prompt: "What should an exam answer about Bits, bytes, nibbles and storage units include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." },
  { id: "p9", prompt: "State one precise exam keyword connected to Bits, bytes, nibbles and storage units.", accepted: ["keyword","definition","concept","method"], answer: "Use a precise syllabus keyword, then define or apply it in context." },
  { id: "p10", prompt: "What should an exam answer about Bits, bytes, nibbles and storage units include besides a keyword?", accepted: ["context","reason","evidence","consequence","example"], answer: "It should include context, reason/evidence, and a clear consequence where relevant." }
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "3 marks",
    prompt: "A file header has a size of 16 KiB. Calculate the number of bits used to store the file header. Show your working.",
    answer: "131,072 bits",
    marking: [
      { mark: "M1", text: "uses 1 KiB = 1024 bytes, e.g. 16 x 1024 or 16,384 bytes" },
      { mark: "M1", text: "uses 1 byte = 8 bits, e.g. multiplies byte value by 8" },
      { mark: "A1", text: "131,072 bits" },
    ],
    strict: [
      "Do not award the first M1 for using 1000 instead of 1024.",
      "Final A1 requires the correct unit, or clear working that unambiguously shows bits.",
      "Allow FT for the second M1 if an incorrect byte value is multiplied by 8.",
    ],
  },
  {
    title: "Question 2",
    marks: "3 marks",
    prompt: "A student writes: '1 MB and 1 MiB mean the same thing.' Explain why this statement is incorrect.",
    answer: "They use different prefix systems; 1 MB = 1,000,000 bytes and 1 MiB = 1,048,576 bytes.",
    marking: [
      { mark: "B1", text: "states that MB is a decimal prefix / based on powers of 1000" },
      { mark: "B1", text: "states that MiB is a binary prefix / based on powers of 1024" },
      { mark: "B1", text: "gives a valid consequence, e.g. 1 MiB is larger than 1 MB or gives both byte values" },
    ],
    strict: [
      "Do not accept only 'they are different units' without explaining how they differ.",
      "Do not accept 'MiB is memory and MB is storage' as a valid distinction.",
      "Byte values may be written as 10^6 and 2^20 if the comparison is clear.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "3 marks",
    prompt: "A backup contains 2400 files. Each file is 2 MiB. Calculate the total backup size in GiB.",
    answer: "4.6875 GiB, approximately 4.69 GiB",
    marking: [
      { mark: "M1", text: "calculates total size in MiB: 2400 x 2 = 4800 MiB" },
      { mark: "M1", text: "converts MiB to GiB by dividing by 1024" },
      { mark: "A1", text: "4.6875 GiB, or a correctly rounded value such as 4.69 GiB" },
    ],
    strict: [
      "Do not award the second M1 for dividing by 1000.",
      "Final answer must be in GiB.",
      "Allow FT from an incorrect total MiB value if the conversion method is correct.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A download page says a file is 700 MB. An operating system reports size using MiB. Explain why the displayed number may be different.",
    answer: "MB uses decimal powers of 1000, while MiB uses binary powers of 1024, so the same byte count is expressed with different numerical values.",
    marking: [
      { mark: "B1", text: "MB is a decimal prefix / uses powers of 1000" },
      { mark: "B1", text: "MiB is a binary prefix / uses powers of 1024" },
      { mark: "B1", text: "explains that the same number of bytes can be expressed using different scales" },
      { mark: "B1", text: "applies this to the context, e.g. the operating system value may be lower; data has not disappeared" },
    ],
    strict: [
      "Do not accept vague answers such as 'the computer rounds it' unless linked to decimal/binary prefixes.",
      "Accept a numerical illustration, e.g. 700 MB is about 667.6 MiB.",
      "Accept 'base 10' for decimal and 'base 2' for binary when the prefix link is clear.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "3 marks",
    prompt: "State the difference between a bit, a nibble and a byte.",
    answer: "A bit is one binary digit; a nibble is 4 bits; a byte is 8 bits.",
    marking: [
      { mark: "B1", text: "bit is one binary digit / 0 or 1" },
      { mark: "B1", text: "nibble is 4 bits" },
      { mark: "B1", text: "byte is 8 bits / 2 nibbles" },
    ],
    strict: [
      "Do not accept 'a byte is a character' as a definition.",
      "Do not accept descriptions that confuse bit and byte.",
      "Allow 'binary digit' for bit without explicitly writing 0 or 1.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function formatNumber(value) {
  if (!Number.isFinite(value)) return "Invalid value";
  if (value === 0) return "0";
  if (Math.abs(value) >= 1000000) return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
  if (Math.abs(value) >= 1) return value.toLocaleString(undefined, { maximumFractionDigits: 6 });
  return value.toPrecision(6);
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
      if (button.dataset.hook === "context") {
        feedback.textContent = "Correct. The same bits can be interpreted differently depending on representation and context.";
      } else {
        feedback.textContent = "Possible in one context, but not always. The safer exam answer is: it depends on representation.";
      }
    });
  });
}

function setupConverter() {
  const from = document.querySelector("#fromUnit");
  const to = document.querySelector("#toUnit");
  units.forEach((unit) => {
    from.add(new Option(`${unit.label} - ${unit.note}`, unit.id));
    to.add(new Option(`${unit.label} - ${unit.note}`, unit.id));
  });
  from.value = "bit";
  to.value = "B";

  function convert() {
    const value = Number(document.querySelector("#convertValue").value);
    const fromUnit = units.find((unit) => unit.id === from.value);
    const toUnit = units.find((unit) => unit.id === to.value);
    const bits = value * fromUnit.bits;
    const result = bits / toUnit.bits;
    document.querySelector("#convertResult").textContent = `${formatNumber(value)} ${fromUnit.label} = ${formatNumber(result)} ${toUnit.label}`;
    document.querySelector("#convertMethod").textContent = `Method: convert to bits first (${formatNumber(value)} x ${formatNumber(fromUnit.bits)}), then divide by ${formatNumber(toUnit.bits)}.`;
  }

  document.querySelector("#convertBtn").addEventListener("click", convert);
  document.querySelector("#convertValue").addEventListener("input", convert);
  from.addEventListener("change", convert);
  to.addEventListener("change", convert);
  convert();
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
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
  renderExample("icon");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item, index) => `
    <div class="practice-item" id="${item.id}">
      <label>
        ${index + 1}. ${item.prompt}
      </label>
      <input type="text" aria-label="${item.prompt}" />
      <button
        type="button"
        class="answer-toggle"
        data-answer="answer-${item.id}"
      >
        Show answer
      </button>
      <div class="answer-panel" id="answer-${item.id}">
        <strong>Answer:</strong> ${item.answer}
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".answer-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.answer}`);
      target.classList.toggle("visible");
      button.textContent = target.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function setupPractice() {
  renderPractice();
  document.querySelector("#checkPractice").addEventListener("click", () => {
    let correct = 0;
    practice.forEach((item) => {
      const row = document.querySelector(`#${item.id}`);
      const input = row.querySelector("input");
      const student = normalise(input.value);
      const ok = item.accepted.some((answer) => normalise(answer) === student);
      row.classList.toggle("correct", ok);
      row.classList.toggle("incorrect", !ok);
      if (ok) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check units before checking arithmetic.`;
  });
}

function setupRevealButtons() {
  document.querySelectorAll(".reveal").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(`#${button.dataset.reveal}`);
      target.classList.toggle("visible");
      const openLabel = button.dataset.openLabel || "Show correction";
      const closeLabel = button.dataset.closeLabel || "Hide correction";
      button.textContent = target.classList.contains("visible") ? closeLabel : openLabel;
    });
  });
}

function renderExamQuestions() {
  const grid = document.querySelector("#examGrid");
  grid.innerHTML = examQuestions.map((question, index) => {
    const msId = `ms-${index + 1}`;
    return `
    <article class="exam-card">
      <h3>${question.title}</h3>
      <p>${question.prompt}</p>
      <p class="marks">[${question.marks}]</p>
      <button type="button" class="ms-toggle" data-ms="${msId}">Show MS</button>
      <div class="marking" id="${msId}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Expected answer:</strong> ${question.answer}</p>
        <ul class="ms-list">
          ${question.marking.map((point) => `<li><b>${point.mark}</b> ${point.text}</li>`).join("")}
        </ul>
        <p class="strict-title">Strict marking notes</p>
        <ul class="strict-list">
          ${question.strict.map((note) => `<li>${note}</li>`).join("")}
        </ul>
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

setupPrint();
setupHook();
setupConverter();
setupExamples();
setupPractice();
setupRevealButtons();
renderExamQuestions();
