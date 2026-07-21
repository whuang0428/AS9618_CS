const diagnostics = {
  dns: {
    result: "Likely issue: DNS/name resolution.",
    method: "If the IP address works but the domain name does not, the web server may be reachable but the domain name is not being resolved to its IP address.",
  },
  local: {
    result: "Likely issue: local delivery / MAC address.",
    method: "On a local network, devices need hardware interface addresses for local frame delivery. A MAC address identifies the network interface.",
  },
  route: {
    result: "Likely issue: IP addressing/routing.",
    method: "IP addresses are used to identify devices on networks and route packets between networks.",
  },
  url: {
    result: "Likely issue: incomplete or incorrect URL.",
    method: "A URL can include a protocol/scheme, domain name and path. Missing or incorrect parts can lead to the wrong request.",
  },
};

const examples = {
  dns: {
    title: "Example 1: DNS lookup",
    problem: "A user enters https://www.example.org/index.html.",
    steps: [
      "The browser identifies the domain name: www.example.org.",
      "The device asks DNS to resolve the domain name.",
      "DNS returns an IP address for the web server.",
      "Packets can then be sent towards that IP address.",
    ],
  },
  address: {
    title: "Example 2: IP vs MAC",
    problem: "A laptop joins a new Wi-Fi network.",
    steps: [
      "The laptop may be given a new IP address on that network.",
      "The laptop's network interface still has a MAC address.",
      "The IP address is used for logical addressing and routing.",
      "The MAC address is used for local network interface identification.",
    ],
  },
  url: {
    title: "Example 3: URL parts",
    problem: "Break down https://shop.example.com/products/item3.",
    steps: [
      "Protocol/scheme: https.",
      "Domain name: shop.example.com.",
      "Path: /products/item3.",
      "DNS resolves the domain name, not the full path.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "What service resolves domain names to IP addresses?", accepted: ["dns", "domain name system"], answer: "DNS / Domain Name System" },
  { id: "p2", prompt: "Which address is used for routing between networks: IP or MAC?", accepted: ["ip", "ip address"], answer: "IP address" },
  { id: "p3", prompt: "Which address identifies a network interface on a local network?", accepted: ["mac", "mac address"], answer: "MAC address" },
  { id: "p4", prompt: "In https://www.example.org/page, what is the domain name?", accepted: ["www.example.org"], answer: "www.example.org" },
  { id: "p5", prompt: "In https://www.example.org/page, what is the protocol/scheme?", accepted: ["https"], answer: "https" },
  { id: "p6", prompt: "In https://www.example.org/page, what is the path?", accepted: ["/page", "page"], answer: "/page" },
  { id: "p7", prompt: "Does DNS store the web page itself? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p8", prompt: "Which address may change when a device joins a different network: IP or MAC?", accepted: ["ip", "ip address"], answer: "IP address" },
  { id: "p9", prompt: "A MAC address is normally associated with hardware or a domain name?", accepted: ["hardware", "network interface", "interface"], answer: "Hardware / network interface" },
  { id: "p10", prompt: "What does URL stand for?", accepted: ["uniform resource locator"], answer: "Uniform Resource Locator" },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Explain the purpose of DNS when a user enters a URL into a browser.",
    answer: "The URL contains a domain name that is easier for users to remember. DNS resolves the domain name to the corresponding IP address. The IP address can then be used to send packets to the correct web server.",
    marking: [
      { mark: "B1", text: "URL contains / may contain a domain name" },
      { mark: "B1", text: "DNS resolves/translates domain name to IP address" },
      { mark: "B1", text: "IP address is used to locate/identify the server on the network" },
      { mark: "B1", text: "packets/request can then be sent/routed to the server" },
    ],
    strict: [
      "Do not accept 'DNS stores websites'.",
      "Do not accept only 'DNS finds the website' without name-to-IP detail.",
      "Do not require a specific DNS server hierarchy.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Compare an IP address with a MAC address.",
    answer: "An IP address is a logical address used to identify a device on a network and route packets between networks. It can change, for example when joining a different network. A MAC address is a hardware address used to identify a network interface on a local network and is normally fixed to the interface.",
    marking: [
      { mark: "B1", text: "IP address is logical/network address" },
      { mark: "B1", text: "IP address used for routing/identifying devices between networks" },
      { mark: "B1", text: "IP address can change / may be assigned by network" },
      { mark: "B1", text: "MAC address is hardware/physical/interface address" },
      { mark: "B1", text: "MAC address used on local network / normally fixed to interface" },
    ],
    strict: [
      "Do not accept only 'IP is software and MAC is hardware' for full credit.",
      "Do not say MAC address is used to route across the internet.",
      "Allow mention of MAC spoofing only if normal role is clear.",
    ],
  },
  {
    title: "Question 3",
    marks: "4 marks",
    prompt: "A user can access a website by entering its IP address, but not by entering its domain name. Explain a likely cause.",
    answer: "The server may still be reachable because the IP address works. The problem is likely with DNS or name resolution, because the domain name is not being resolved to the correct IP address. This may be due to a DNS server failure, incorrect DNS record or local DNS configuration problem.",
    marking: [
      { mark: "B1", text: "server/IP route may still be working" },
      { mark: "B1", text: "domain name requires DNS/name resolution" },
      { mark: "B1", text: "domain may not resolve to correct IP address" },
      { mark: "B1", text: "valid cause such as DNS server failure / wrong DNS record / DNS configuration" },
    ],
    strict: [
      "Do not accept only 'the internet is down'.",
      "Do not blame MAC address unless local-network context is explained.",
      "Answer must distinguish domain-name failure from IP reachability.",
      "Allow equivalent wording if the technical meaning is clear.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Identify the protocol/scheme, domain name and path in the URL https://store.example.com/products/item7.",
    answer: "Protocol/scheme: https. Domain name: store.example.com. Path: /products/item7.",
    marking: [
      { mark: "B1", text: "identifies https as protocol/scheme" },
      { mark: "B1", text: "identifies store.example.com as domain name" },
      { mark: "B1", text: "identifies /products/item7 as path" },
      { mark: "B1", text: "does not include protocol or path as part of domain name" },
    ],
    strict: [
      "Do not require explanation of HTTPS operation.",
      "Do not accept example.com alone as the full domain for this URL.",
      "Allow path without leading slash if otherwise clear.",
    ],
  },
  {
    title: "Question 5",
    marks: "5 marks",
    prompt: "Describe the steps from entering a URL to sending packets towards the web server.",
    answer: "The browser reads the URL and identifies the domain name. DNS is used to resolve the domain name to an IP address. The IP address is used as the destination for packets so they can be routed across networks. On a local network, MAC addresses may be used to deliver frames to the next local device or gateway.",
    marking: [
      { mark: "B1", text: "browser/user enters URL and domain name is identified" },
      { mark: "B1", text: "DNS lookup/resolution is performed" },
      { mark: "B1", text: "DNS returns / obtains IP address" },
      { mark: "B1", text: "IP address used for packet addressing/routing to server" },
      { mark: "B1", text: "MAC address used for local delivery / next hop on local network" },
    ],
    strict: [
      "Do not accept that DNS converts the full URL, including its path, into an IP address.",
      "Do not require ARP by name at AS level unless taught locally.",
      "Award local MAC point only when local delivery is described correctly.",
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
      feedback.textContent = button.dataset.hook === "dns"
        ? "Correct. DNS resolves the domain name to an IP address so packets can be routed."
        : "Not the key step. A URL/domain name needs name resolution before network routing can use an IP address.";
    });
  });
}

function setupDiagnosticTool() {
  const select = document.querySelector("#symptomInput");
  const result = document.querySelector("#diagnoseResult");
  const method = document.querySelector("#diagnoseMethod");
  function diagnose() {
    const item = diagnostics[select.value];
    result.textContent = item.result;
    method.textContent = item.method;
  }
  select.addEventListener("change", diagnose);
  document.querySelector("#diagnoseBtn").addEventListener("click", diagnose);
  diagnose();
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
  renderExample("dns");
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
    document.querySelector("#practiceFeedback").textContent = `${correct}/${practice.length} correct. Keep DNS, IP, MAC and URL roles separate.`;
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
  setupDiagnosticTool();
  setupExamples();
  setupAnswerToggles();
  renderPractice();
  setupPractice();
  renderExamQuestions();
}

init();
