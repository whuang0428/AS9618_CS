const scenarios = {
  attendance: {
    recommendation: "Barcode/RFID reader, touchscreen display and networked computer with SSD storage",
    justification: "Fast automatic input reduces queues at registration. Network access lets records update centrally. SSD storage gives quick access to attendance software and local cached data.",
    rejection: "Reject manual paper forms as the main method: they are slower, easier to misread and require later data entry.",
  },
  library: {
    recommendation: "Barcode scanner, receipt printer/display, keyboard and reliable networked workstation",
    justification: "A barcode scanner captures book IDs faster and more accurately than typing. A small printer or screen gives immediate checkout feedback. Network access updates the catalogue for other users.",
    rejection: "Reject using only a touchscreen for book IDs: typing long codes by hand is slower and more error-prone.",
  },
  delivery: {
    recommendation: "Handheld scanner or smartphone with camera, GPS, mobile data and long battery life",
    justification: "Portable hardware lets the driver scan parcels at the door. GPS supports routing and proof of location. Mobile data uploads delivery status without returning to the depot.",
    rejection: "Reject a desktop PC: it may be powerful, but it is not portable and cannot easily capture proof at the delivery location.",
  },
  editor: {
    recommendation: "Multi-core CPU, suitable GPU, high-capacity SSD and colour-accurate monitor",
    justification: "Video editing needs fast processing and storage access for large media files. A colour-accurate monitor helps editing decisions match the final output.",
    rejection: "Reject only using a low-cost HDD as the working drive: it may have capacity but slower access can delay loading, scrubbing and exporting.",
  },
  weather: {
    recommendation: "Temperature, humidity and pressure sensors with low-power microcontroller, durable enclosure and wireless communication",
    justification: "Sensors capture environmental data automatically. Low power use supports long running time. A durable enclosure protects outdoor hardware and wireless communication sends readings remotely.",
    rejection: "Reject a standard office desktop outdoors: it is not designed for weather exposure, low power operation or remote sensor input.",
  },
};

const examples = {
  attendance: {
    title: "Example 1: school attendance system",
    problem: "Choose suitable hardware for a school attendance system and justify two choices.",
    steps: [
      "Use an RFID or barcode reader because it captures student ID quickly and reduces typing errors.",
      "Use a touchscreen or small monitor to show confirmation, so staff and students know the entry has been recorded.",
      "Use a networked computer or tablet so attendance data can be sent to the central school database.",
      "Reject paper registers as the main method because they require later data entry and can delay reporting.",
    ],
  },
  delivery: {
    title: "Example 2: delivery driver",
    problem: "Recommend hardware for a driver who scans parcels and records proof of delivery.",
    steps: [
      "Use a handheld scanner or smartphone camera because it can scan barcodes at each delivery location.",
      "Use GPS and mobile data so the system can update location and delivery status in real time.",
      "Choose a durable device with long battery life because it will be used outdoors for a full shift.",
      "Reject a desktop computer because it is not portable and cannot conveniently collect data at the door.",
    ],
  },
  editor: {
    title: "Example 3: video editor",
    problem: "Compare suitable storage and display hardware for a video editor.",
    steps: [
      "Choose an SSD as the working drive because fast access helps load large video files and preview edits.",
      "Use a larger HDD or external storage for archive copies because it can offer high capacity at lower cost per GB.",
      "Use a colour-accurate monitor because visual output must match editing decisions.",
      "Do not simply say 'best computer'; name the component and link it to the editing task.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which hardware category captures data?", accepted: ["input"], answer: "Input" },
  { id: "p2", prompt: "Which hardware category presents information to the user?", accepted: ["output"], answer: "Output" },
  { id: "p3", prompt: "Which storage device is usually faster: SSD or HDD?", accepted: ["ssd"], answer: "SSD" },
  { id: "p4", prompt: "Name one input device suitable for scanning library books.", accepted: ["barcode scanner", "barcode reader", "scanner"], answer: "Barcode scanner / barcode reader" },
  { id: "p5", prompt: "Name one criterion linked to outdoor hardware.", accepted: ["durability", "water resistance", "weather resistance", "reliability", "battery life"], answer: "Durability / weather resistance / battery life" },
  { id: "p6", prompt: "Which user needs portable hardware: delivery driver or video editor?", accepted: ["delivery driver", "driver"], answer: "Delivery driver" },
  { id: "p7", prompt: "Complete the chain: feature -> need -> ____.", accepted: ["consequence"], answer: "Consequence" },
  { id: "p8", prompt: "Name one communication hardware example.", accepted: ["nic", "network interface card", "wifi adapter", "wi fi adapter", "router", "bluetooth module"], answer: "NIC / Wi-Fi adapter / router / Bluetooth module" },
  { id: "p9", prompt: "Is 'better' enough as a justification? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Name one output device for a checkout desk.", accepted: ["monitor", "display", "screen", "printer", "receipt printer", "speaker"], answer: "Monitor / display / receipt printer" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A school wants a computer-based attendance system. Recommend two pieces of hardware and justify each choice.",
    answer: "An RFID/barcode reader can capture student IDs quickly and accurately, reducing queues and typing errors. A networked computer or tablet can send attendance records to the central database so staff can access updated records.",
    marking: [
      { mark: "B1", text: "suitable input device such as RFID/barcode reader named" },
      { mark: "B1", text: "justification linked to fast/accurate capture of student ID" },
      { mark: "B1", text: "suitable processing/storage/network device named" },
      { mark: "B1", text: "justification linked to storing/updating/accessing attendance records" },
    ],
    strict: [
      "Do not award justification marks for vague statements such as 'it is better' without a scenario link.",
      "Award one identification mark and one linked justification mark for each of two suitable choices.",
      "Allow biometric reader if privacy/security concerns are not being assessed in this question.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain why a handheld device is more suitable than a desktop computer for a delivery driver.",
    answer: "A handheld device is portable, so it can be carried to the delivery location. It can use a camera or scanner to capture parcel barcodes and signatures. Mobile data can upload delivery status immediately. A desktop computer is not suitable because it is not portable and cannot easily collect proof of delivery at the door.",
    marking: [
      { mark: "B1", text: "portable/handheld nature identified" },
      { mark: "B1", text: "linked to use at delivery location" },
      { mark: "B1", text: "barcode/signature/photo capture identified" },
      { mark: "B1", text: "wireless/mobile data/GPS benefit explained" },
      { mark: "B1", text: "desktop rejected with a relevant reason" },
    ],
    strict: [
      "Do not award rejection mark for saying desktop is 'bad' without explaining portability or data capture issue.",
      "Allow smartphone, tablet or handheld scanner if role is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Compare SSD and HDD storage for a video editor.",
    answer: "An SSD has faster access times, so it is suitable as a working drive for loading and editing large video files. An HDD can provide larger capacity at lower cost per GB, so it may be suitable for archive storage. SSDs are also more resistant to shock because they have no moving parts.",
    marking: [
      { mark: "B1", text: "SSD speed/access-time advantage identified" },
      { mark: "B1", text: "speed linked to video editing task" },
      { mark: "B1", text: "HDD capacity/cost advantage identified" },
      { mark: "B1", text: "HDD linked to archive/bulk storage or SSD durability advantage linked to use" },
    ],
    strict: [
      "Do not accept 'SSD is better' without a criterion.",
      "Allow discussion of reliability/durability if linked to lack of moving parts.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "A remote weather station records environmental data. Recommend suitable hardware and justify your choices.",
    answer: "It should use sensors such as temperature, humidity and pressure sensors to capture environmental data automatically. A low-power microcontroller can process readings while using little energy. A durable weatherproof enclosure protects components outdoors. Wireless communication can transmit readings without collecting the device manually.",
    marking: [
      { mark: "B1", text: "suitable environmental sensors named" },
      { mark: "B1", text: "sensor justification linked to automatic environmental data capture" },
      { mark: "B1", text: "low-power controller/processor named" },
      { mark: "B1", text: "durability/weatherproofing/power justification linked to remote outdoor use" },
      { mark: "B1", text: "communication hardware/method linked to remote data transfer" },
    ],
    strict: [
      "Do not award sensor mark for generic 'input device' unless environmental measurement is clear.",
      "Do not require brand names or exact model specifications.",
      "Allow solar power/battery discussion if linked to remote use.",
    ],
  },
  {
    title: "Question 5",
    marks: "4 marks",
    prompt: "Explain why hardware selection should depend on the user and task.",
    answer: "Different users have different priorities, such as portability for a delivery driver, accuracy for a library scanner or high processing speed for a video editor. Hardware should be selected by matching its features to the user's needs; otherwise the system may be too slow, too expensive, inaccurate or inconvenient.",
    marking: [
      { mark: "B1", text: "recognises different users/tasks have different needs" },
      { mark: "B1", text: "gives a valid user-specific example" },
      { mark: "B1", text: "links hardware feature to need" },
      { mark: "B1", text: "explains consequence of poor selection" },
    ],
    strict: [
      "Do not accept only a list of devices with no user/task link.",
      "Allow any valid user scenario from the syllabus-level hardware context.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    phone: "Phone camera as input: it captures image data. The same phone may also store/process, but here the camera role is input.",
    keyboard: "Keyboard as input: it captures text commands. It is not storage just because words appear later in a file.",
    usb: "USB flash drive as storage: it keeps files when power is removed.",
    trap: "Not quite. A monitor is output; it displays results but does not store the final data.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSelector() {
  const select = document.querySelector("#scenarioInput");
  const recommendation = document.querySelector("#recommendation");
  const justification = document.querySelector("#justification");
  const rejection = document.querySelector("#rejection");
  function render() {
    const scenario = scenarios[select.value];
    recommendation.textContent = scenario.recommendation;
    justification.innerHTML = `<strong>Justification:</strong> ${scenario.justification}`;
    rejection.innerHTML = `<strong>Reject:</strong> ${scenario.rejection}`;
  }
  select.addEventListener("change", render);
  document.querySelector("#recommendBtn").addEventListener("click", render);
  render();
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
  renderExample("attendance");
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
      const isCorrect = item.accepted.some((answer) => response === normalise(answer) || response.includes(normalise(answer)));
      mark.textContent = isCorrect ? "Correct" : "Try again";
      mark.className = `mark ${isCorrect ? "correct" : "incorrect"}`;
      if (isCorrect) correct += 1;
    });
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For weak answers, add feature -> need -> consequence.`;
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
  setupSelector();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
