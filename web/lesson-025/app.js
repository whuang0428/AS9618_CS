const examples = {
  download: {
    title: "Example 1: ideal download time",
    problem: "A 60 MB update is downloaded over a 30 Mbps connection.",
    steps: [
      "Convert file size to megabits: 60 MB x 8 = 480 Mb.",
      "Use transfer time = file size / bandwidth.",
      "480 Mb / 30 Mbps = 16 seconds.",
      "State that real time may be longer due to overheads, congestion or lower throughput.",
    ],
  },
  gaming: {
    title: "Example 2: online game delay",
    problem: "An online game has small data packets but feels delayed.",
    steps: [
      "The amount of data per packet may be small, so bandwidth may not be the main issue.",
      "High latency delays the response between player action and server reply.",
      "Distance, route, server load and wireless interference can increase latency.",
      "A good answer links delay to gameplay consequence, such as late movement updates.",
    ],
  },
  congestion: {
    title: "Example 3: shared school network",
    problem: "Downloads become slower when many students stream video at lunchtime.",
    steps: [
      "Many users share the same network capacity.",
      "Traffic can exceed the capacity of a link or device, causing congestion.",
      "Queues form, throughput per user falls, and packets may be delayed or lost.",
      "The symptom is slower downloads, buffering or lag.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which term means the maximum amount of data that can be transmitted per second?", accepted: ["bandwidth"], answer: "Bandwidth" },
  { id: "p2", prompt: "Which term means delay before a response or before data starts to arrive?", accepted: ["latency"], answer: "Latency" },
  { id: "p3", prompt: "Which term means too much traffic using part of the network?", accepted: ["congestion", "network congestion"], answer: "Congestion" },
  { id: "p4", prompt: "Which is normally measured in ms: bandwidth or latency?", accepted: ["latency"], answer: "Latency" },
  { id: "p5", prompt: "Which is normally measured in Mbps or Gbps: bandwidth or latency?", accepted: ["bandwidth"], answer: "Bandwidth" },
  { id: "p6", prompt: "Convert 10 MB to megabits.", accepted: ["80", "80 mb", "80 megabits"], answer: "80 Mb" },
  { id: "p7", prompt: "A 10 MB file over 8 Mbps takes how many seconds ideally?", accepted: ["10", "10 seconds", "10s"], answer: "10 seconds" },
  { id: "p8", prompt: "Name one effect of congestion.", accepted: ["delay", "latency", "packet loss", "lower throughput", "slower download", "buffering", "lag"], answer: "Delay / packet loss / lower throughput / buffering / lag" },
  { id: "p9", prompt: "Does high bandwidth always mean low latency? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p10", prompt: "What is the actual successful data transfer rate called?", accepted: ["throughput"], answer: "Throughput" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Distinguish between bandwidth and latency.",
    answer: "Bandwidth is the amount of data that can be transmitted per second, often measured in Mbps or Gbps. Latency is the delay before data starts to arrive or before a response is received, often measured in milliseconds. A connection can have high bandwidth but still have high latency.",
    marking: [
      { mark: "B1", text: "bandwidth is data capacity/rate per second" },
      { mark: "B1", text: "higher bandwidth allows more data to be transferred in a given time" },
      { mark: "B1", text: "latency is delay/response time" },
      { mark: "B1", text: "high latency causes a longer wait for a response even when bandwidth is high" },
    ],
    strict: [
      "Do not accept only 'bandwidth is speed' without data-rate idea.",
      "Do not accept latency as the amount of data sent.",
      "Allow 'time taken for data to travel' if delay is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "A 75 MB file is transferred over a 25 Mbps connection. Calculate the ideal transfer time.",
    answer: "75 MB = 75 x 8 = 600 Mb. Transfer time = 600 Mb / 25 Mbps = 24 seconds.",
    marking: [
      { mark: "M1", text: "converts MB to megabits by multiplying by 8" },
      { mark: "A1", text: "600 Mb" },
      { mark: "M1", text: "divides file size in bits by bandwidth in bits per second" },
      { mark: "A1", text: "24 seconds with suitable unit" },
    ],
    strict: [
      "Do not award final A1 if answer is 3 seconds from confusing MB with Mb.",
      "Ignore real-world overheads unless the question asks for actual transfer time.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "Explain how congestion can affect users on a school network at lunchtime.",
    answer: "At lunchtime many users may stream videos or download files at the same time. The traffic may exceed the capacity of a link, router, access point or internet connection, causing congestion. Packets may be queued, delayed or lost, so throughput per user falls and users experience buffering, lag or slow downloads.",
    marking: [
      { mark: "B1", text: "many users/devices generate high traffic at same time" },
      { mark: "B1", text: "traffic exceeds/shared capacity of link/device/connection" },
      { mark: "B1", text: "queues/delays occur" },
      { mark: "B1", text: "packet loss/retransmission or reduced throughput" },
      { mark: "B1", text: "valid user symptom such as buffering/lag/slow download linked to lunchtime scenario" },
    ],
    strict: [
      "Do not accept only 'more users make it slower' for full credit.",
      "Do not require a specific congestion-control algorithm.",
      "Allow access point/router/server as bottleneck if cause and effect are clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A video conference has clear picture quality but long pauses before people reply. Explain why this may happen.",
    answer: "The clear picture suggests there may be enough bandwidth for the video quality, but the long pauses suggest high latency or jitter. Data or responses take longer to travel between users, possibly due to distance, route, congestion, wireless interference or server load. This causes the conversation to feel delayed even if the video is not low resolution.",
    marking: [
      { mark: "B1", text: "identifies latency/delay as the likely issue" },
      { mark: "B1", text: "distinguishes latency from bandwidth/video quality" },
      { mark: "B1", text: "valid cause such as distance/route/congestion/interference/server load" },
      { mark: "B1", text: "links to pauses/delayed conversation scenario" },
    ],
    strict: [
      "Do not accept only 'not enough bandwidth' when the prompt says picture is clear.",
      "Allow jitter if described as variation in delay.",
      "Do not require advanced codec details.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Describe factors that could reduce the actual throughput of a network below its advertised bandwidth.",
    answer: "Actual throughput may be lower than advertised bandwidth because many users share the same connection, causing congestion. Wireless interference or weak signal can cause errors and retransmission. Protocol overheads such as headers, error checking and encryption use some capacity. Slow network hardware or overloaded servers can also become bottlenecks.",
    marking: [
      { mark: "B1", text: "many users/shared connection/congestion" },
      { mark: "B1", text: "wireless interference/weak signal/errors" },
      { mark: "B1", text: "packet loss/retransmission reduces effective rate" },
      { mark: "B1", text: "protocol overheads such as headers/encryption/error checking" },
      { mark: "B1", text: "hardware/server bottleneck or overloaded device" },
    ],
    strict: [
      "Do not accept a list of vague words without explaining effect.",
      "Do not require all factors; award any valid distinct factors up to the mark limit.",
      "Allow environmental obstacles if linked to wireless performance.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
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
      feedback.textContent = button.dataset.hook === "latency"
        ? "Correct. Long pauses are a delay problem, so latency is the first suspect."
        : "Not quite. The clue is delay between replies, not just how much data can be carried.";
    });
  });
}

function convertToMegabits(size, unit) {
  if (unit === "MB") return size * 8;
  if (unit === "MiB") return size * 8.388608;
  return size;
}

function setupCalculator() {
  const fileSize = document.querySelector("#fileSizeInput");
  const fileUnit = document.querySelector("#fileUnitInput");
  const bandwidth = document.querySelector("#bandwidthInput");
  const latency = document.querySelector("#latencyInput");
  const result = document.querySelector("#calcResult");
  const method = document.querySelector("#calcMethod");

  function calculate() {
    const size = Number(fileSize.value);
    const speed = Number(bandwidth.value);
    const latencyMs = Number(latency.value);
    if (!Number.isFinite(size) || !Number.isFinite(speed) || size < 0 || speed <= 0) {
      result.textContent = "Enter a non-negative file size and a bandwidth greater than 0.";
      method.textContent = "";
      return;
    }
    const megabits = convertToMegabits(size, fileUnit.value);
    const transferSeconds = megabits / speed;
    const latencySeconds = latencyMs / 1000;
    const roughTotal = transferSeconds + latencySeconds;
    result.textContent = `Ideal estimate: ${roughTotal.toFixed(2)} seconds`;
    method.textContent = `${size} ${fileUnit.value} = ${megabits.toFixed(2)} Mb. ${megabits.toFixed(2)} Mb / ${speed} Mbps = ${transferSeconds.toFixed(2)} s. Add one latency estimate of ${latencySeconds.toFixed(3)} s. Real throughput may be lower.`;
  }

  [fileSize, fileUnit, bandwidth, latency].forEach((control) => control.addEventListener("input", calculate));
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
  renderExample("download");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Check whether the question asks about capacity, delay, traffic load or actual throughput.`;
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
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
