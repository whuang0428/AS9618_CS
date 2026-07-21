const scenarios = {
  weather: {
    risk: "Outdoor weather station: rain, humidity, heat, cold, dust and limited maintenance access can reduce reliability.",
    mitigation: "Use weatherproof casing, sealed connectors, temperature-rated sensors, low-power controller, battery or solar power, and wireless communication for remote readings.",
    rejection: "Reject an ordinary office desktop outdoors: it is not designed for weather exposure, low power use or remote sensor input.",
  },
  server: {
    risk: "School server room: heat, dust and power instability can cause downtime or data loss.",
    mitigation: "Use air conditioning, dust control, UPS, surge protection, RAID, backup and monitoring for temperature and disk health.",
    rejection: "Reject relying only on a single disk with no backup: one failure could lose data or interrupt service.",
  },
  delivery: {
    risk: "Delivery handheld device: drops, vibration, rain, battery drain and weak mobile signal can interrupt scanning and proof of delivery.",
    mitigation: "Use rugged casing, flash/SSD storage, long battery life, protective screen, offline cache and mobile data with later sync.",
    rejection: "Reject a fragile office tablet without protection: it may fail after knocks or wet outdoor use.",
  },
  factory: {
    risk: "Factory barcode scanner: dust, vibration, grease and repeated use can reduce scanning accuracy or damage connectors.",
    mitigation: "Use industrial-rated scanner, sealed casing, dust-resistant design, robust cable/wireless connection and regular cleaning.",
    rejection: "Reject a cheap consumer scanner if the environment is dusty and high-use; it may fail or misread more often.",
  },
  clinic: {
    risk: "Clinic reception system: downtime, power loss and storage failure can delay appointments and access to patient records.",
    mitigation: "Use UPS, regular backup, reliable network connection, spare input devices and maintenance schedule.",
    rejection: "Reject no backup strategy: storage failure could prevent staff from recovering appointment or patient data.",
  },
};

const examples = {
  weather: {
    title: "Example 1: remote weather station",
    problem: "Recommend environmental protections for hardware used outside.",
    steps: [
      "Use a weatherproof enclosure because rain and moisture can cause corrosion or short circuits.",
      "Use low-power components with battery or solar power because mains electricity may not be available.",
      "Use wireless communication so readings can be collected without frequent physical access.",
      "Reject ordinary office hardware because it is not designed for outdoor temperature, moisture or dust.",
    ],
  },
  server: {
    title: "Example 2: school server room",
    problem: "Explain how reliability can be improved for a server storing shared school files.",
    steps: [
      "Use cooling and dust control because heat and blocked airflow can cause shutdowns or hardware damage.",
      "Use a UPS so short power cuts do not immediately stop the server and files can be closed safely.",
      "Use RAID and backup so disk failure does not automatically mean permanent data loss.",
      "Use monitoring to warn staff about temperature, battery or disk problems before failure becomes an outage.",
    ],
  },
  delivery: {
    title: "Example 3: delivery handheld",
    problem: "Choose hardware features for a device used by a delivery driver.",
    steps: [
      "Use rugged casing because the device may be dropped or used in rain.",
      "Use long battery life because the device must last a full shift away from a charger.",
      "Use local offline storage or cache because mobile signal may be unavailable in some areas.",
      "Reject a fragile office tablet unless it has protective casing and suitable battery life.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which device protects against short power cuts: UPS or barcode scanner?", accepted: ["ups"], answer: "UPS" },
  { id: "p2", prompt: "Which environmental factor can cause overheating?", accepted: ["temperature", "heat", "high temperature"], answer: "Temperature / heat" },
  { id: "p3", prompt: "Which protection is suitable for rain or moisture?", accepted: ["waterproof casing", "weatherproof casing", "sealed casing", "sealed enclosure", "waterproof enclosure"], answer: "Weatherproof / sealed enclosure" },
  { id: "p4", prompt: "What does backup help recover after storage failure?", accepted: ["data", "files"], answer: "Data / files" },
  { id: "p5", prompt: "Which storage type is more shock-resistant: SSD or HDD?", accepted: ["ssd"], answer: "SSD" },
  { id: "p6", prompt: "What reliability term means extra hardware can take over after failure?", accepted: ["redundancy", "redundant"], answer: "Redundancy" },
  { id: "p7", prompt: "What does MTBF stand for?", accepted: ["mean time between failures", "mean time between failure"], answer: "Mean time between failures" },
  { id: "p8", prompt: "Name one risk for an outdoor sensor.", accepted: ["rain", "moisture", "water", "heat", "cold", "dust", "humidity"], answer: "Rain / moisture / heat / cold / dust / humidity" },
  { id: "p9", prompt: "Is a UPS a replacement for backup? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "Complete the chain: risk -> mitigation -> ____.", accepted: ["consequence"], answer: "Consequence" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "6 marks",
    prompt: "A remote weather station collects data outdoors. Explain three hardware considerations that improve reliability.",
    answer: "A weatherproof enclosure protects sensors and electronics from rain and moisture, reducing corrosion or short circuits. Low-power hardware with battery or solar power allows the system to operate where mains power is unavailable. Wireless communication allows readings to be sent remotely, reducing the need for frequent physical access. Temperature-rated sensors can continue to work in hot or cold conditions.",
    marking: [
      { mark: "B1", text: "weatherproof/sealed enclosure or protection named" },
      { mark: "B1", text: "linked to rain/moisture/corrosion/short circuit risk" },
      { mark: "B1", text: "low-power/battery/solar power consideration named" },
      { mark: "B1", text: "linked to remote operation or lack of mains power" },
      { mark: "B1", text: "wireless communication or temperature-rated sensor named" },
      { mark: "B1", text: "linked to remote access or continued operation in environment" },
    ],
    strict: [
      "Do not award both marks for a consideration unless a scenario-specific consequence is explained.",
      "Do not accept only 'use durable hardware' without naming the environmental risk.",
      "Allow equivalent outdoor protections such as sealed connectors or dust-resistant casing.",
    ],
  },
  {
    title: "Question 2",
    marks: "6 marks",
    prompt: "Explain how a UPS, backup and RAID can improve reliability for a server.",
    answer: "A UPS provides temporary power during a short power cut, allowing the server to continue running or shut down safely. Backup stores copies of data so files can be restored after loss or corruption. RAID can use multiple disks so the system may continue operating after a disk failure, depending on the RAID type.",
    marking: [
      { mark: "B1", text: "UPS identified as temporary power / protection from power loss" },
      { mark: "B1", text: "UPS linked to continued operation or safe shutdown" },
      { mark: "B1", text: "backup identified as separate copy of data" },
      { mark: "B1", text: "backup linked to recovery/restoration after failure" },
      { mark: "B1", text: "RAID uses multiple disks with redundancy, depending on RAID level" },
      { mark: "B1", text: "RAID linked to continued operation or data availability after a disk failure" },
    ],
    strict: [
      "Do not accept UPS as a data backup.",
      "Do not accept RAID as a complete replacement for backup.",
      "Allow 'mirroring' for RAID where disk failure tolerance is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A delivery driver uses a handheld device outdoors. Explain two environmental or reliability features that would be suitable.",
    answer: "A rugged or shock-resistant casing is suitable because the device may be dropped or exposed to vibration. Long battery life is suitable because the driver may use the device for a full shift away from a charger. Offline storage/cache is useful because mobile signal may be unavailable and delivery data can sync later.",
    marking: [
      { mark: "B1", text: "rugged/shock-resistant/water-resistant feature named" },
      { mark: "B1", text: "linked to outdoor/mobile/drop/rain/vibration risk" },
      { mark: "B1", text: "battery/offline cache/mobile data feature named" },
      { mark: "B1", text: "linked to full-shift use, weak signal or continued data capture" },
    ],
    strict: [
      "Do not accept 'portable' alone unless the environmental reliability issue is explained.",
      "Allow protective screen or sealed case if linked to field use.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Explain the difference between durability and reliability in a hardware context, and explain how they may be related.",
    answer: "Durability is the ability of hardware to resist physical damage, such as shock, dust or moisture. Reliability is the ability of the hardware or system to continue working correctly when required. Durable hardware can improve reliability, but reliability can also depend on backup, redundancy, power protection and maintenance.",
    marking: [
      { mark: "B1", text: "durability linked to resisting physical/environmental damage" },
      { mark: "B1", text: "reliability linked to continuing to work correctly when required" },
      { mark: "B1", text: "recognises durability can contribute to reliability" },
      { mark: "B1", text: "recognises reliability also depends on factors other than physical durability" },
    ],
    strict: [
      "Do not accept 'durable means reliable' as the full distinction.",
      "Allow examples instead of definitions if the distinction is clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A factory uses barcode scanners in a dusty environment. Recommend hardware or maintenance measures and justify them.",
    answer: "An industrial-rated barcode scanner with sealed casing is suitable because dust can interfere with scanning and damage moving or exposed parts. Regular cleaning or dust filters reduce build-up, helping maintain accuracy. A robust cable or reliable wireless connection reduces failure from vibration or repeated handling.",
    marking: [
      { mark: "B1", text: "industrial/dust-resistant/sealed scanner named" },
      { mark: "B1", text: "linked to dust affecting scanner accuracy or hardware" },
      { mark: "B1", text: "cleaning/filter/maintenance measure named" },
      { mark: "B1", text: "linked to reducing build-up or maintaining reliability" },
      { mark: "B1", text: "robust connection/cable/wireless or vibration consideration explained" },
    ],
    strict: [
      "Do not award full marks for naming a barcode scanner only; the dust environment must be addressed.",
      "Allow rugged scanner if linked to factory conditions.",
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
    env: "Correct. Outdoor conditions add risks such as moisture, heat, dust and power instability.",
    speed: "Not quite. Faster processing does not automatically protect against rain, dust or heat.",
    storage: "Not quite. More capacity does not solve corrosion, overheating or power cuts.",
    software: "Not quite. Software matters, but hardware can physically fail when the environment is unsuitable.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupRiskTool() {
  const select = document.querySelector("#scenarioInput");
  const risk = document.querySelector("#riskSummary");
  const mitigation = document.querySelector("#mitigationSummary");
  const rejection = document.querySelector("#rejectSummary");
  function render() {
    const scenario = scenarios[select.value];
    risk.textContent = scenario.risk;
    mitigation.innerHTML = `<strong>Mitigation:</strong> ${scenario.mitigation}`;
    rejection.innerHTML = `<strong>Reject:</strong> ${scenario.rejection}`;
  }
  select.addEventListener("change", render);
  document.querySelector("#evaluateBtn").addEventListener("click", render);
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
  renderExample("weather");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. For weak answers, add risk -> mitigation -> consequence.`;
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
  setupRiskTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
