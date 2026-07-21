const scenarios = {
  checkout: {
    result: "Barcode reader or QR scanner",
    method: "It captures encoded product IDs quickly and reduces errors compared with typing long product numbers repeatedly.",
  },
  exam: {
    result: "OMR scanner",
    method: "It detects the positions of shaded marks on multiple-choice answer sheets, so many scripts can be processed quickly.",
  },
  passport: {
    result: "OCR scanner",
    method: "It recognises printed characters from the passport text, reducing the need for manual typing.",
  },
  greenhouse: {
    result: "Temperature or humidity sensor",
    method: "A sensor captures physical measurements automatically at regular intervals without a person entering readings.",
  },
  warehouse: {
    result: "RFID reader",
    method: "RFID can read tag data without direct line of sight, which is useful when stock is boxed or moving through a gate.",
  },
  podcast: {
    result: "Microphone",
    method: "A microphone captures sound waves as input so they can be digitised and stored or edited.",
  },
};

const examples = {
  checkout: {
    title: "Example 1: supermarket checkout",
    problem: "Recommend an input method for entering product IDs at a busy checkout.",
    steps: [
      "Weak answer: use a barcode reader because it is easy.",
      "Better answer: use a barcode reader because it captures the product code directly from the label.",
      "Exam-ready answer: use a barcode reader because it captures product IDs faster than typing and reduces transcription errors during repeated checkout scanning.",
      "Boundary: a keyboard may still be needed for exceptions, but it is not the best main method for high-volume product IDs.",
    ],
  },
  exam: {
    title: "Example 2: multiple-choice exam sheets",
    problem: "An exam board must process thousands of shaded answer sheets.",
    steps: [
      "OMR is suitable because it detects the position of shaded marks on a prepared form.",
      "It is faster than manual marking and can reduce human data-entry errors.",
      "The form must be designed for OMR, and badly marked boxes may still need checking.",
      "Do not confuse OMR with OCR: printed candidate names would need OCR or manual entry, not OMR.",
    ],
  },
  greenhouse: {
    title: "Example 3: greenhouse monitoring",
    problem: "A greenhouse must record temperature and humidity every minute.",
    steps: [
      "A temperature sensor and humidity sensor capture measurements automatically.",
      "This is suitable because readings are needed frequently and at regular intervals.",
      "Automatic capture reduces the need for a person to repeatedly type readings.",
      "The sensor may need calibration so the captured data is reliable.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which device is best for capturing product codes at a checkout?", accepted: ["barcode reader", "barcode scanner", "qr scanner", "qr reader"], answer: "Barcode reader / QR scanner" },
  { id: "p2", prompt: "Which input device detects shaded marks on a form?", accepted: ["omr", "omr scanner", "optical mark recognition"], answer: "OMR scanner" },
  { id: "p3", prompt: "Which input method recognises printed characters?", accepted: ["ocr", "ocr scanner", "optical character recognition"], answer: "OCR" },
  { id: "p4", prompt: "Which input device captures physical measurements such as temperature?", accepted: ["sensor", "temperature sensor"], answer: "Sensor" },
  { id: "p5", prompt: "Manual keyboard entry is usually faster or slower than scanning repeated product codes?", accepted: ["slower"], answer: "Slower" },
  { id: "p6", prompt: "RFID usually needs direct line of sight. Answer true or false.", accepted: ["false", "no"], answer: "False" },
  { id: "p7", prompt: "Name one advantage of automatic data capture.", accepted: ["faster", "speed", "fewer errors", "less error", "reduces errors", "accuracy", "consistent"], answer: "Faster / fewer errors / more consistent" },
  { id: "p8", prompt: "Which device captures spoken audio?", accepted: ["microphone", "mic"], answer: "Microphone" },
  { id: "p9", prompt: "Which device captures an image or video scene?", accepted: ["camera", "digital camera", "webcam"], answer: "Camera / webcam" },
  { id: "p10", prompt: "In an exam answer, should you only name the device, or also justify it?", accepted: ["justify", "also justify it", "justify it", "give a reason"], answer: "Also justify it" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A supermarket currently uses keyboard entry for product codes. Explain why a barcode reader may be more suitable.",
    answer: "A barcode reader captures the product code directly from the barcode. It is faster than typing codes manually and reduces transcription errors. This is suitable at a checkout because many products are scanned repeatedly and customers should be served quickly.",
    marking: [
      { mark: "B1", text: "identifies barcode reader as an input device / captures barcode data" },
      { mark: "B1", text: "states speed advantage over manual keyboard entry" },
      { mark: "B1", text: "states reduced typing/transcription errors" },
      { mark: "B1", text: "links advantage to checkout/high-volume/repeated product entry context" },
    ],
    strict: [
      "Do not award a mark for vague 'it is easier' unless a cause is given.",
      "Do not accept that the barcode reader stores the product data by itself.",
      "Allow QR scanner if the answer describes encoded product data and the scenario supports QR codes.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Compare OCR and OMR as input methods.",
    answer: "OCR recognises printed or handwritten characters from a document and converts them into editable digital text. OMR detects the position of shaded marks or ticks on a prepared form. OCR is suitable for printed documents such as passports or forms. OMR is suitable for multiple-choice answer sheets where the possible mark positions are known.",
    marking: [
      { mark: "B1", text: "OCR recognises characters/text" },
      { mark: "B1", text: "OMR detects shaded marks/ticks/positions" },
      { mark: "B1", text: "OCR example linked to printed document/form/passport" },
      { mark: "B1", text: "OMR example linked to prepared form/multiple-choice sheet" },
      { mark: "B1", text: "contrasts OCR output as recognised character data with OMR output as detected predefined mark positions" },
    ],
    strict: [
      "Do not accept 'OCR scans pictures' without character recognition.",
      "Do not accept 'OMR reads words' because OMR detects marks.",
      "Allow handwritten text for OCR only if recognition of characters is clearly stated.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A greenhouse records temperature every minute. Recommend an input device and justify your choice.",
    answer: "A temperature sensor is suitable because it automatically captures temperature readings from the environment. This avoids a person manually reading and typing the value every minute. It provides regular data for monitoring or control, although the sensor may need calibration for reliability.",
    marking: [
      { mark: "B1", text: "names temperature sensor or suitable environmental sensor" },
      { mark: "B1", text: "captures temperature/physical measurement from environment" },
      { mark: "B1", text: "automatic/frequent/regular capture advantage" },
      { mark: "B1", text: "links reason to greenhouse monitoring/control context" },
    ],
    strict: [
      "Do not award full credit for only naming 'sensor'.",
      "Do not accept keyboard as the best device unless justified for manual occasional readings.",
      "Allow humidity sensor if the response adapts the measured data to greenhouse monitoring.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain two advantages of automatic data capture compared with manual keyboard entry.",
    answer: "Automatic data capture can be faster because a device scans or senses the data directly. It can reduce transcription errors because a person does not have to retype long codes or repeated readings. It is also suitable for high-volume or continuous data collection.",
    marking: [
      { mark: "B1", text: "advantage: faster data entry/capture" },
      { mark: "B1", text: "explanation linked to scanning/sensing/direct capture" },
      { mark: "B1", text: "advantage: fewer transcription/typing errors" },
      { mark: "B1", text: "explanation linked to reduced manual re-entry/repeated input" },
    ],
    strict: [
      "Do not accept two advantages with no explanation if the command word is explain.",
      "Do not accept 'more accurate' twice as separate points unless different causes are given.",
      "Allow reliability/consistency for one advantage if linked to a valid cause.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A school library wants to issue books quickly and track stock. Recommend two suitable input methods and explain why each is suitable.",
    answer: "A barcode reader is suitable for issuing books because it captures the book ID quickly from the label and reduces typing errors at the desk. An RFID reader is suitable for tracking stock because it can read tag data without direct contact or line of sight, allowing books to be identified quickly when moved past a reader.",
    marking: [
      { mark: "B1", text: "suitable first input method such as barcode reader" },
      { mark: "B1", text: "justification linked to quick/accurate book ID capture" },
      { mark: "B1", text: "suitable second input method such as RFID reader" },
      { mark: "B1", text: "justification linked to tag reading/no direct contact/stock tracking" },
      { mark: "B1", text: "both choices linked to the library scenario rather than generic device descriptions" },
    ],
    strict: [
      "Do not award both device marks for two names that perform the same unqualified role without distinction.",
      "Do not accept output devices such as printer or monitor as input methods.",
      "Allow QR reader or NFC reader where the explanation fits the library system.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-\s]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    barcode: "Barcode reader: captures the encoded product ID so the system can look up price and stock data.",
    scale: "Sensor: captures mass/weight as input. The computer can then calculate a price for loose items.",
    keyboard: "Keyboard: captures typed data such as a discount code or exception entry. Useful, but not ideal for every product code.",
    rfid: "RFID/card reader: captures customer or tag data from a card/tag, often without direct contact.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupChoiceTool() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#componentResult");
  const method = document.querySelector("#componentMethod");
  function choose() {
    const item = scenarios[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", choose);
  document.querySelector("#chooseBtn").addEventListener("click", choose);
  choose();
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
  renderExample("checkout");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For wrong answers, ask: what data is captured, and why is this device suitable?`;
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
  setupChoiceTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
