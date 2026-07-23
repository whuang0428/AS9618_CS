const classifierMap = {
  image: {
    topic: "Image file size",
    reason: "Use width x height x colour depth to get bits, then convert to bytes and larger units.",
  },
  sound: {
    topic: "Sound file size",
    reason: "Use sample rate x sample resolution x duration. Include channels only if stated.",
  },
  rle: {
    topic: "Run-length encoding",
    reason: "Count consecutive repeated characters and store each run as a count plus value.",
  },
  packet: {
    topic: "Packet switching",
    reason: "Large data is split into packets so packets can be routed, checked and reassembled.",
  },
  dns: {
    topic: "DNS",
    reason: "DNS translates a domain name into the IP address needed to locate a server.",
  },
};

const examples = {
  image: {
    title: "Example 1: Image file size",
    problem: "Calculate the size of a 640 x 480 bitmap image using 24-bit colour depth.",
    steps: [
      "Pixels = 640 x 480 = 307200 pixels.",
      "Bits = 307200 x 24 = 7372800 bits.",
      "Bytes = 7372800 / 8 = 921600 bytes.",
      "KiB = 921600 / 1024 = 900 KiB. Include the unit for the final mark.",
    ],
  },
  sound: {
    title: "Example 2: Sound file size",
    problem: "Calculate the size of 30 seconds of mono sound sampled at 44 100 Hz with 16-bit sample resolution.",
    steps: [
      "Samples = 44100 x 30 = 1323000 samples.",
      "Bits = 1323000 x 16 = 21168000 bits.",
      "Bytes = 21168000 / 8 = 2646000 bytes.",
      "MiB = 2646000 / 1024 / 1024 = about 2.52 MiB.",
    ],
  },
  packet: {
    title: "Example 3: Packet switching explanation",
    problem: "Explain why a large file is divided into packets before transmission.",
    steps: [
      "Data is split into smaller packets.",
      "Each packet contains address/control information and a sequence number.",
      "Packets may travel by different routes through the network.",
      "At the destination, packets are checked and reassembled in the correct order.",
    ],
  },
  dns: {
    title: "Example 4: DNS explanation",
    problem: "Explain the role of DNS when a user enters a URL.",
    steps: [
      "The user enters a human-readable domain name.",
      "DNS looks up the matching IP address.",
      "The browser uses the IP address to contact the correct server.",
      "This avoids users needing to remember numeric IP addresses.",
    ],
  },
};

const practice = [
  {
    id: "p1",
    prompt: "How many bits are in one byte?",
    accepted: ["8", "eight"],
    answer: "8",
  },
  {
    id: "p2",
    prompt: "What is the formula for bitmap image size in bits?",
    accepted: ["width x height x colour depth", "width * height * colour depth", "width x height x color depth", "pixels x colour depth"],
    answer: "width x height x colour depth",
  },
  {
    id: "p3",
    prompt: "What is the formula for mono sound size in bits?",
    accepted: ["sample rate x sample resolution x duration", "sample rate * sample resolution * duration", "sample rate x duration x sample resolution"],
    answer: "sample rate x sample resolution x duration",
  },
  {
    id: "p4",
    prompt: "Which character set can represent many more characters than ASCII?",
    accepted: ["unicode"],
    answer: "Unicode",
  },
  {
    id: "p5",
    prompt: "Which compression type allows the original file to be reconstructed exactly?",
    accepted: ["lossless"],
    answer: "Lossless",
  },
  {
    id: "p6",
    prompt: "Which address identifies a device on a network at the network layer?",
    accepted: ["ip address", "ip"],
    answer: "IP address",
  },
  {
    id: "p7",
    prompt: "Which address is usually associated with a network interface card?",
    accepted: ["mac address", "mac"],
    answer: "MAC address",
  },
  {
    id: "p8",
    prompt: "Which service translates domain names to IP addresses?",
    accepted: ["dns", "domain name system"],
    answer: "DNS",
  },
  {
    id: "p9",
    prompt: "Which term means data transfer capacity per second?",
    accepted: ["bandwidth"],
    answer: "Bandwidth",
  },
  {
    id: "p10",
    prompt: "Which term means delay before data begins or continues to transfer?",
    accepted: ["latency"],
    answer: "Latency",
  },
];

const mistakes = [
  {
    wrong: "640 x 480 x 24 = 7372800 bytes.",
    fix: "That product gives bits, not bytes. Divide by 8 to convert bits to bytes.",
  },
  {
    wrong: "Lossy compression is best when the file must be restored exactly.",
    fix: "Use lossless compression when the original data must be reconstructed exactly.",
  },
  {
    wrong: "DNS makes a website secure.",
    fix: "DNS translates domain names to IP addresses. HTTPS/TLS is used for encrypted secure communication.",
  },
  {
    wrong: "Higher bandwidth always means lower latency.",
    fix: "Bandwidth is capacity per second. Latency is delay. They affect performance differently.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Calculate the file size in KiB of a 640 by 480 bitmap image using 24-bit colour depth. Show your working.",
    answer: "640 x 480 x 24 = 7372800 bits. 7372800 / 8 = 921600 bytes. 921600 / 1024 = 900 KiB.",
    marking: [
      { mark: "M1", text: "multiplies width by height to find number of pixels" },
      { mark: "M1", text: "multiplies by colour depth 24" },
      { mark: "A1", text: "7372800 bits" },
      { mark: "M1", text: "divides by 8 and 1024 to convert to KiB" },
      { mark: "A1", text: "900 KiB with correct unit" },
    ],
    strict: [
      "Do not award final A1 if answer is labelled bytes instead of KiB.",
      "Allow colour spelling as color.",
      "Do not require metadata to be included unless specified.",
      "Allow FT from the candidate's earlier bit total only when the subsequent conversions to bytes and KiB are correct.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Calculate the file size in MiB of 30 seconds of mono sound sampled at 44 100 Hz with 16-bit sample resolution. Show your working.",
    answer: "44100 x 30 x 16 = 21168000 bits. 21168000 / 8 = 2646000 bytes. 2646000 / 1024 / 1024 = about 2.52 MiB.",
    marking: [
      { mark: "M1", text: "multiplies sample rate by duration" },
      { mark: "M1", text: "multiplies by sample resolution 16" },
      { mark: "A1", text: "21168000 bits" },
      { mark: "M1", text: "converts bits to bytes and then MiB" },
      { mark: "A1", text: "approximately 2.52 MiB with correct unit" },
    ],
    strict: [
      "Do not multiply by 2 channels because mono is stated.",
      "Allow 2.5 MiB if rounding is clear.",
      "Do not accept MB if binary conversion to MiB was requested.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Explain why Unicode can represent more characters than ASCII.",
    answer: "Unicode uses more bits / more possible code points than ASCII, so it can assign codes to many more characters. This allows characters from many languages and symbols to be represented, whereas ASCII has a much smaller character set.",
    marking: [
      { mark: "B1", text: "states characters are represented by character codes / bit patterns" },
      { mark: "B1", text: "states Unicode has more possible codes / uses more bits than ASCII" },
      { mark: "B1", text: "links more codes to more representable characters" },
      { mark: "B1", text: "applies to many languages/symbols or wider character set" },
    ],
    strict: [
      "Do not accept 'Unicode is newer' without explaining code capacity.",
      "Allow reference to ASCII being 7-bit or limited if accurate.",
      "Do not require exact bit lengths for Unicode.",
    ],
  },
  {
    title: "Question 4",
    marks: "5 marks",
    prompt: "Explain how packet switching can be used to send a file across a network.",
    answer: "The file is divided into packets. Each packet contains data plus address/control information such as sequence number. Packets may be routed independently through the network. At the destination, packets are checked and reassembled in the correct order; missing or corrupted packets can be requested again.",
    marking: [
      { mark: "B1", text: "file/data is split into packets" },
      { mark: "B1", text: "packets include address/control/sequence information" },
      { mark: "B1", text: "packets are routed independently / may take different routes" },
      { mark: "B1", text: "destination reassembles packets in order" },
      { mark: "B1", text: "mentions error checking/retransmission or handling missing/corrupt packets" },
    ],
    strict: [
      "Do not award routing mark for only saying 'sent through wires'.",
      "Allow header/trailer wording for control information.",
      "Do not require all packets to take different routes.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "A student says: 'Bandwidth and latency both mean the network is fast.' Explain why this is weak, using a video call as an example.",
    answer: "Bandwidth is the amount of data that can be transferred per second, while latency is the delay before data is received. A video call needs enough bandwidth to carry audio and video data without reducing quality. It also needs low latency so speech and video arrive with little delay. The answer is weak because the two terms affect performance in different ways.",
    marking: [
      { mark: "B1", text: "defines bandwidth as data transfer capacity/rate" },
      { mark: "B1", text: "defines latency as delay" },
      { mark: "B1", text: "applies bandwidth to amount/quality of audio-video data" },
      { mark: "B1", text: "applies latency to delay in conversation/video" },
      { mark: "B1", text: "explicitly contrasts the two terms" },
    ],
    strict: [
      "Do not accept 'bandwidth is speed' as a full definition without data per second.",
      "Do not accept latency as amount of data.",
      "Allow lag as explanation of latency if delay is clear.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ").replace(/ ;$/, ";");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    image: "Topic: bitmap image size. First move: width x height x colour depth.",
    packet: "Topic: packet switching. First move: explain splitting, addressing and reassembly.",
    unicode: "Topic: character sets. First move: link bit patterns/code points to characters.",
    dns: "Topic: DNS. First move: domain name is translated into an IP address.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupClassifier() {
  const input = document.querySelector("#classifierInput");
  const result = document.querySelector("#classifyResult");
  document.querySelector("#classifyBtn").addEventListener("click", () => {
    const item = classifierMap[input.value];
    result.innerHTML = `<strong>${item.topic}</strong><br />${item.reason}`;
  });
}

function setupCalculator() {
  const result = document.querySelector("#calcResult");
  document.querySelector("#calcBtn").addEventListener("click", () => {
    const type = document.querySelector("#calcType").value;
    const a = Number(document.querySelector("#valueA").value);
    const b = Number(document.querySelector("#valueB").value);
    const c = Number(document.querySelector("#valueC").value);
    if (![a, b, c].every((value) => Number.isFinite(value) && value > 0)) {
      result.textContent = "Enter positive numeric values before calculating.";
      return;
    }
    const bits = a * b * c;
    const bytes = bits / 8;
    const kib = bytes / 1024;
    const mib = kib / 1024;
    const label = type === "image" ? "width x height x colour depth" : "sample rate x duration x sample resolution";
    result.innerHTML = `
      <div class="calc-card">
        <strong>${type === "image" ? "Image" : "Sound"} method:</strong> ${label}<br />
        Bits: ${bits.toLocaleString()}<br />
        Bytes: ${bytes.toLocaleString(undefined, { maximumFractionDigits: 2 })}<br />
        KiB: ${kib.toLocaleString(undefined, { maximumFractionDigits: 2 })}<br />
        MiB: ${mib.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
    `;
  });
}

function renderExample(key) {
  const example = examples[key];
  const box = document.querySelector("#exampleBox");
  box.innerHTML = `
    <h3>${example.title}</h3>
    <p><strong>Problem:</strong> ${example.problem}</p>
    <ol>
      ${example.steps.map((step) => `<li>${step}</li>`).join("")}
    </ol>
  `;
}

function setupExamples() {
  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderExample(button.dataset.example);
    });
  });
  renderExample("image");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice
    .map(
      (item, index) => `
        <article class="practice-item">
          <p><strong>${index + 1}.</strong> ${item.prompt}</p>
          <div class="practice-row">
            <input type="text" id="${item.id}" autocomplete="off" aria-label="Answer for question ${index + 1}" />
            <span class="mark" id="${item.id}Mark">Not checked</span>
          </div>
          <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
          <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
        </article>
      `
    )
    .join("");

  practice.forEach((item) => {
    const input = document.querySelector(`#${item.id}`);
    const mark = document.querySelector(`#${item.id}Mark`);
    input.addEventListener("input", () => {
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => normalise(answer) === value);
      mark.textContent = value.length === 0 ? "Not checked" : correct ? "Correct" : "Try again";
      mark.classList.toggle("correct", correct);
      mark.classList.toggle("incorrect", value.length > 0 && !correct);
    });
  });

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.answer}Answer`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide answer" : "Show answer";
    });
  });
}

function renderMistakes() {
  const grid = document.querySelector("#mistakeGrid");
  grid.innerHTML = mistakes
    .map(
      (item, index) => `
        <article>
          <p class="wrong"><strong>Weak answer ${index + 1}:</strong> ${item.wrong}</p>
          <button class="answer-toggle" type="button" data-fix="fix${index}">Show correction</button>
          <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExamQuestions() {
  const list = document.querySelector("#examList");
  list.innerHTML = examQuestions
    .map(
      (question, index) => `
        <article class="exam-card">
          <div class="exam-head">
            <h3>${question.title}</h3>
            <span>${question.marks}</span>
          </div>
          <p>${question.prompt}</p>
          <button class="ms-toggle" type="button" data-ms="ms${index}">Show MS</button>
          <div class="ms-panel" id="ms${index}">
            <p><strong>Indicative answer:</strong> ${question.answer}</p>
            <h4>CIE-style mark scheme</h4>
            <ul>
              ${question.marking.map((mark) => `<li><strong>${mark.mark}:</strong> ${mark.text}</li>`).join("")}
            </ul>
          </div>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

function init() {
  setupPrint();
  setupHook();
  setupClassifier();
  setupCalculator();
  setupExamples();
  renderPractice();
  renderMistakes();
  renderExamQuestions();
}

init();
