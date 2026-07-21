const routeStates = {
  normal: {
    result: "Packets arrive and can be reassembled.",
    method: "All packets are delivered. The receiver uses sequence numbers to rebuild the original message.",
    packets: [
      { id: "1", path: "A-B-D", state: "ok" },
      { id: "2", path: "A-C-D", state: "ok" },
      { id: "3", path: "A-B-D", state: "ok" },
    ],
  },
  congested: {
    result: "Packets may arrive out of order.",
    method: "Packet 2 takes a slower route because one path is congested. Sequence numbers allow correct reassembly.",
    packets: [
      { id: "1", path: "A-B-D", state: "ok" },
      { id: "3", path: "A-B-D", state: "ok" },
      { id: "2", path: "A-C-E-D", state: "slow" },
    ],
  },
  lost: {
    result: "A missing packet must be requested again.",
    method: "The receiver detects a missing sequence number and can request retransmission of the missing packet.",
    packets: [
      { id: "1", path: "A-B-D", state: "ok" },
      { id: "2", path: "A-C-D", state: "lost" },
      { id: "3", path: "A-B-D", state: "ok" },
    ],
  },
  corrupt: {
    result: "A corrupt packet is detected by an error check.",
    method: "Checksum or other error-checking data can show that a packet was corrupted, so retransmission can be requested.",
    packets: [
      { id: "1", path: "A-B-D", state: "ok" },
      { id: "2", path: "A-C-D", state: "corrupt" },
      { id: "3", path: "A-B-D", state: "ok" },
    ],
  },
};

const examples = {
  structure: {
    title: "Example 1: packet structure",
    problem: "A file is split into packets. Name three items each packet may need and explain one purpose.",
    steps: [
      "Destination address identifies where the packet should be sent.",
      "Source address identifies where the packet came from or where replies can be sent.",
      "Sequence number allows the receiver to put packets back in the correct order.",
      "Checksum/error check can help detect corruption during transmission.",
    ],
  },
  order: {
    title: "Example 2: out-of-order arrival",
    problem: "Packets 1, 3 and 2 arrive at a receiver.",
    steps: [
      "This can happen because packets may take different routes.",
      "Different routes may have different delays or congestion.",
      "The receiver uses sequence numbers to reorder the packets.",
      "The message is reassembled as 1, 2, 3.",
    ],
  },
  checksum: {
    title: "Example 3: checksum and retransmission",
    problem: "A packet arrives with a checksum that does not match.",
    steps: [
      "The packet may have been corrupted during transmission.",
      "The receiver should not silently use corrupt data.",
      "The receiver can request the packet to be resent.",
      "A strong answer names the error check and the consequence.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What is the actual data part of a packet called?", accepted: ["payload"], answer: "Payload" },
  { id: "p2", prompt: "Which packet part commonly contains source and destination addresses?", accepted: ["header"], answer: "Header" },
  { id: "p3", prompt: "What number helps reassemble packets in the correct order?", accepted: ["sequence number", "sequence"], answer: "Sequence number" },
  { id: "p4", prompt: "What can be used to detect whether a packet has been corrupted?", accepted: ["checksum", "error check", "error checking", "check sum"], answer: "Checksum / error checking data" },
  { id: "p5", prompt: "What device forwards packets between networks?", accepted: ["router"], answer: "Router" },
  { id: "p6", prompt: "Can packets from one message take different routes? Answer yes or no.", accepted: ["yes"], answer: "Yes" },
  { id: "p7", prompt: "What should happen if a packet is missing or corrupt?", accepted: ["retransmission", "retransmit", "resent", "resend", "request retransmission"], answer: "Request retransmission / resend the packet" },
  { id: "p8", prompt: "Destination address tells the network where the packet came from or where it is going?", accepted: ["where it is going", "going", "destination"], answer: "Where it is going" },
  { id: "p9", prompt: "Packet switching sends one large file as one block or splits it into packets?", accepted: ["splits it into packets", "splits", "packets"], answer: "Splits it into packets" },
  { id: "p10", prompt: "Name one reason packets may arrive out of order.", accepted: ["different routes", "congestion", "different delays", "routing"], answer: "Different routes / congestion / different delays" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "A file is split into packets before transmission. Explain why packet switching is used.",
    answer: "Packet switching splits data into smaller packets. Packets can share network links with packets from other users and may be routed independently. If a packet is lost or corrupt, only that packet needs to be resent rather than the whole file.",
    marking: [
      { mark: "B1", text: "data/file is split into smaller packets" },
      { mark: "B1", text: "packets can share network links / improve use of network capacity" },
      { mark: "B1", text: "packets can be routed independently / use different routes" },
      { mark: "B1", text: "only missing/corrupt packets need retransmission" },
    ],
    strict: [
      "Do not accept only 'it is faster'.",
      "Do not require circuit switching comparison.",
      "Award independent route point only if routing is clearly stated.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Describe three items of information that may be stored in a packet header and explain why two of them are needed.",
    answer: "A header may contain the source address, destination address and sequence number. The destination address is needed so routers know where to forward the packet. The sequence number is needed so the receiver can reassemble packets in the correct order.",
    marking: [
      { mark: "B1", text: "source address" },
      { mark: "B1", text: "destination address" },
      { mark: "B1", text: "sequence number / packet number" },
      { mark: "B1", text: "valid purpose of one named header item" },
      { mark: "B1", text: "second valid purpose or clear link to routing/reassembly" },
    ],
    strict: [
      "Do not award 'address' twice unless source and destination are distinguished.",
      "Do not accept payload as a header item.",
      "Allow protocol/control information if its purpose is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "Packets from the same message arrive in the order 1, 4, 2, 3. Explain how this can happen and how the receiver deals with it.",
    answer: "Packets may take different routes through the network, and those routes may have different delays or congestion. Therefore packets can arrive out of order. The receiver uses sequence numbers to reorder the packets and reassemble the original message.",
    marking: [
      { mark: "B1", text: "packets may take different routes" },
      { mark: "B1", text: "routes may have different delays/congestion" },
      { mark: "B1", text: "sequence numbers identify the correct order" },
      { mark: "B1", text: "receiver reassembles/reorders packets into original message" },
    ],
    strict: [
      "Do not accept only 'internet is busy'.",
      "Do not say packets must always arrive in order.",
      "Answer must include receiver action for final mark.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "A packet is corrupted during transmission. Explain how this may be detected and what may happen next.",
    answer: "Error-checking information such as a checksum can be stored with the packet. The receiver calculates/checks the value and compares it with the expected value. If the check fails, the packet is treated as corrupt and retransmission can be requested.",
    marking: [
      { mark: "B1", text: "checksum/error-checking information is used" },
      { mark: "B1", text: "receiver checks/calculates/compares the value" },
      { mark: "B1", text: "failed check indicates corruption/error" },
      { mark: "B1", text: "packet can be requested again/retransmitted" },
    ],
    strict: [
      "Do not accept only 'the computer knows'.",
      "Do not require a specific checksum algorithm.",
      "Allow equivalent error-detection terminology.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Explain the difference between payload and packet control information.",
    answer: "The payload is the actual data being transmitted, such as part of a file or message. Control information is metadata used to deliver or check the packet, such as source address, destination address, sequence number or checksum. Control information is needed for routing, reassembly and error detection, but it is not the user's actual message content.",
    marking: [
      { mark: "B1", text: "payload is actual data / part of file or message" },
      { mark: "B1", text: "control information is metadata about delivery/checking" },
      { mark: "B1", text: "valid example such as source/destination address" },
      { mark: "B1", text: "valid example such as sequence number/checksum" },
      { mark: "B1", text: "purpose such as routing/reassembly/error detection" },
    ],
    strict: [
      "Do not accept only 'payload is important data'.",
      "Do not treat checksum as payload.",
      "Award examples only if linked to packet control information.",
      "Allow equivalent wording if the technical meaning is clear.",
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
      feedback.textContent = button.dataset.hook === "routes"
        ? "Correct. Smaller packets can be routed independently, share links and be resent individually if needed."
        : "No. Packet switching still needs addresses and routes; it does not make the data magical.";
    });
  });
}

function setupRouteTool() {
  const select = document.querySelector("#routeInput");
  const visual = document.querySelector("#routeVisual");
  const result = document.querySelector("#routeResult");
  const method = document.querySelector("#routeMethod");
  function simulate() {
    const state = routeStates[select.value];
    visual.innerHTML = state.packets.map((packet) => `
      <div class="packet-chip ${packet.state}">
        <strong>Packet ${packet.id}</strong>
        <span>${packet.path}</span>
      </div>
    `).join("");
    result.textContent = state.result;
    method.textContent = state.method;
  }
  select.addEventListener("change", simulate);
  document.querySelector("#routeBtn").addEventListener("click", simulate);
  simulate();
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
  renderExample("structure");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Strong answers name the packet item and what it does.`;
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
  setupRouteTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
