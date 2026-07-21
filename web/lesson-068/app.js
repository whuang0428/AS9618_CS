const scenarioMap = {
  https: {
    result: "Allow: normal outbound HTTPS.",
    method: "The rule can permit internal users to access secure websites using TCP port 443.",
    trap: "Do not assume allowed traffic is automatically safe; other controls may still inspect or log it.",
  },
  sshExternal: {
    result: "Block and log: unsolicited admin access attempt.",
    method: "Unknown external SSH traffic to a school server should normally be denied because it targets a sensitive admin service.",
    trap: "Do not leave admin ports open to the whole internet for convenience.",
  },
  mailServer: {
    result: "Allow: approved mail server SMTP.",
    method: "The mail server needs port 25 to send mail, so a specific rule can allow it.",
    trap: "Do not allow every device to send SMTP just because the mail server needs it.",
  },
  studentSmtp: {
    result: "Block or log: student laptop SMTP.",
    method: "A student laptop normally should not send direct SMTP traffic; blocking can reduce spam or malware misuse.",
    trap: "Do not block the entire network's email service when only unauthorised sources should be denied.",
  },
  adminSubnet: {
    result: "Allow if authenticated and from approved subnet.",
    method: "Admin access can be restricted to a management subnet so only expected sources reach the admin panel.",
    trap: "A firewall source rule is not a substitute for strong authentication and permissions.",
  },
};

const eventMap = {
  category: {
    result: "Most relevant: proxy filtering.",
    reason: "A proxy can inspect web requests and block categories or URLs according to policy.",
  },
  cache: {
    result: "Most relevant: proxy caching.",
    reason: "A proxy can store a copy of a frequently requested resource to reduce bandwidth and improve response time.",
  },
  spike: {
    result: "Most relevant: network monitoring.",
    reason: "Monitoring observes traffic volume and can alert staff when it crosses a threshold or pattern.",
  },
  logs: {
    result: "Most relevant: proxy or firewall logs.",
    reason: "Logs can show user, time, source, destination and whether a request was allowed or blocked.",
  },
};

const examples = {
  firewall: {
    title: "Example 1: Firewall blocking inbound access",
    problem: "A school server receives connection attempts from unknown external IP addresses.",
    steps: [
      "A firewall can inspect source address, destination address, protocol and port.",
      "Rules can block unsolicited inbound traffic that is not needed for the service.",
      "Denied attempts can be logged for investigation.",
      "Limitation: allowed traffic can still carry attacks, so patching and monitoring are still needed.",
    ],
  },
  proxy: {
    title: "Example 2: Proxy enforcing web policy",
    problem: "Students should not access gaming sites during lessons, but should still use approved learning sites.",
    steps: [
      "Client web requests are sent through the proxy.",
      "The proxy checks the URL or category against a policy.",
      "Blocked requests can be denied and logged; allowed pages are forwarded.",
      "The proxy may also cache frequently used learning resources.",
    ],
  },
  monitoring: {
    title: "Example 3: Monitoring suspicious traffic",
    problem: "The network shows a sudden spike in outgoing traffic at night.",
    steps: [
      "Monitoring tools can record traffic volume, source devices and destinations.",
      "An alert can be generated when traffic exceeds a threshold or matches a pattern.",
      "Logs help staff identify the device or account involved.",
      "Monitoring supports detection and response; it does not automatically remove the cause.",
    ],
  },
  layered: {
    title: "Example 4: Layering controls",
    problem: "A company wants to reduce risk from malware calling out to command servers.",
    steps: [
      "A firewall can block known unwanted ports or destinations.",
      "A proxy can filter suspicious web requests and log user activity.",
      "Monitoring can alert staff to unusual outbound traffic.",
      "Anti-malware, patching and user training are still needed because one control is not enough.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which control filters network traffic using rules?", accepted: ["firewall", "firewalls"], answer: "Firewall" },
  { id: "p2", prompt: "Name one property a firewall rule may inspect.", accepted: ["ip address", "source ip", "destination ip", "port", "port number", "protocol", "state"], answer: "Source/destination IP address, port number, protocol or connection state" },
  { id: "p3", prompt: "Which control acts as an intermediary between client and destination?", accepted: ["proxy", "proxy server"], answer: "Proxy / proxy server" },
  { id: "p4", prompt: "Which proxy feature stores frequently requested resources?", accepted: ["cache", "caching"], answer: "Caching" },
  { id: "p5", prompt: "Which process observes traffic and events to detect suspicious behaviour?", accepted: ["network monitoring", "monitoring"], answer: "Network monitoring" },
  { id: "p6", prompt: "What record can show allowed and blocked traffic events?", accepted: ["log", "logs", "audit log", "firewall log", "proxy log"], answer: "Log / firewall log / proxy log" },
  { id: "p7", prompt: "What should monitoring generate when suspicious thresholds are met?", accepted: ["alert", "alerts", "warning"], answer: "Alert / warning" },
  { id: "p8", prompt: "Does a firewall guarantee that all allowed traffic is safe? Answer yes or no.", accepted: ["no"], answer: "No" },
  { id: "p9", prompt: "Name one benefit of using a proxy server.", accepted: ["filtering", "filter", "caching", "cache", "logging", "anonymity", "policy enforcement", "block sites"], answer: "Filtering, caching, logging or policy enforcement" },
  { id: "p10", prompt: "Name one limitation of network monitoring.", accepted: ["false positives", "needs response", "needs review", "too many alerts", "does not prevent", "privacy"], answer: "False positives, needs human/automated response, too many alerts, privacy concerns or detection without prevention" },
];

const mistakes = [
  {
    wrong: "A firewall stops every attack.",
    fix: "A firewall filters traffic based on rules. Allowed traffic can still contain attacks, and incorrect rules can create gaps.",
  },
  {
    wrong: "A proxy and a firewall are exactly the same.",
    fix: "A firewall allows or blocks traffic using rules. A proxy acts as an intermediary that forwards, filters, caches or logs requests.",
  },
  {
    wrong: "Network monitoring prevents attacks automatically.",
    fix: "Monitoring detects and records suspicious activity. Prevention requires a response, such as blocking traffic, isolating a device or changing rules.",
  },
  {
    wrong: "Logs are useful only after an attack is over.",
    fix: "Logs support investigation after events, but they can also feed real-time alerts and help detect suspicious patterns early.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "4 marks",
    prompt: "Describe how a firewall can reduce security risks on a school network.",
    answer: "A firewall filters traffic entering or leaving the network using rules. The rules may inspect source or destination IP address, port number, protocol or connection state. Unwanted traffic, such as unsolicited inbound connections to admin services, can be blocked or logged. This reduces the risk of unauthorised access attempts and provides evidence for investigation, but allowed traffic may still need other controls.",
    marking: [
      { mark: "B1", text: "firewall filters/controls network traffic" },
      { mark: "B1", text: "rules inspect valid property such as IP/port/protocol/state" },
      { mark: "B1", text: "traffic can be allowed/blocked/rejected/logged" },
      { mark: "B1", text: "risk reduced linked to unauthorised access/unwanted traffic" },
    ],
    strict: [
      "Do not accept 'makes the network secure' without mechanism.",
      "Do not award rule mark for only saying 'checks data' without property.",
      "Allow host-based or network firewall if filtering role is clear.",
    ],
  },
  {
    title: "Question 2",
    marks: "5 marks",
    prompt: "Explain two functions of a proxy server.",
    answer: "A proxy server acts as an intermediary between a client and a destination server. It can filter web requests by checking URLs, categories or content against a policy and blocking unsuitable requests. It can cache frequently requested resources so later requests can be served faster and use less bandwidth. It can also log requests for audit and investigation.",
    marking: [
      { mark: "B1", text: "proxy described as intermediary between client and destination/server" },
      { mark: "B1", text: "filtering function described with URL/category/content/policy" },
      { mark: "B1", text: "filtering consequence such as blocking unsuitable sites/policy enforcement" },
      { mark: "B1", text: "caching or logging function described" },
      { mark: "B1", text: "valid consequence of caching/logging such as bandwidth reduction/audit/investigation" },
    ],
    strict: [
      "Do not accept proxy as only 'a firewall' without intermediary idea.",
      "Do not award caching mark for backing up files.",
      "Allow anonymity/masking internal addresses as an additional valid proxy function.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A company uses network monitoring. Explain what may be monitored and how the information can be used.",
    answer: "Network monitoring can observe traffic volumes, source and destination addresses, connection attempts, failed logins, blocked requests or unusual patterns. The information can be logged and compared with thresholds or signatures. Alerts can notify staff of possible attacks, misconfiguration or malware activity. Logs can then be used to investigate the time, source and nature of suspicious activity.",
    marking: [
      { mark: "B1", text: "valid monitored item such as traffic volume/source/destination/connections/failed attempts" },
      { mark: "B1", text: "second distinct monitored item" },
      { mark: "B1", text: "comparison with thresholds/patterns/signatures or unusual behaviour" },
      { mark: "B1", text: "alerts or notifications generated for staff/response" },
      { mark: "B1", text: "logs used for investigation/evidence/source/time identification" },
    ],
    strict: [
      "Do not accept only 'watch the network' without what is monitored.",
      "Do not say monitoring automatically fixes the attack unless response is described.",
      "Allow bandwidth usage, failed login attempts or denied connections as monitored items.",
    ],
  },
  {
    title: "Question 4",
    marks: "6 marks",
    prompt: "Compare firewalls and proxies as network security controls.",
    answer: "A firewall filters traffic based on rules, such as source or destination address, port number or protocol. It can allow, block or log traffic at a network boundary or host. A proxy acts as an intermediary between a client and destination server. It can forward requests, filter web access, cache resources and log user requests. Both can reduce risk and provide logs, but neither guarantees safety because misconfiguration or allowed traffic can still cause problems.",
    marking: [
      { mark: "B1", text: "firewall filters traffic using rules" },
      { mark: "B1", text: "valid firewall rule property or decision, e.g. IP/port/protocol/allow/block/log" },
      { mark: "B1", text: "proxy is intermediary between client and destination" },
      { mark: "B1", text: "valid proxy function such as forward/filter/cache/log" },
      { mark: "B1", text: "valid similarity such as both reduce risk/control access/log traffic" },
      { mark: "B1", text: "valid limitation such as misconfiguration/allowed traffic/need for layered controls" },
    ],
    strict: [
      "Do not make proxy and firewall identical for all marks.",
      "Do not award firewall property for proxy-only web category filtering unless firewall role is stated.",
      "Allow content filtering firewall as extra detail, but proxy intermediary mark must be separate.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "A school wants to block unsuitable websites, reduce repeated downloads and detect unusual traffic spikes. Recommend suitable controls.",
    answer: "A proxy server can block unsuitable websites by checking requested URLs or categories against the school's policy. The proxy can also cache frequently downloaded resources so repeated downloads use less bandwidth and load faster. Network monitoring can detect unusual traffic spikes by observing traffic volume and comparing it with normal behaviour or thresholds. Alerts and logs can help staff investigate the source and take action.",
    marking: [
      { mark: "B1", text: "proxy recommended for blocking unsuitable websites" },
      { mark: "B1", text: "proxy filtering mechanism linked to URL/category/policy" },
      { mark: "B1", text: "proxy caching recommended for repeated downloads" },
      { mark: "B1", text: "caching consequence linked to bandwidth/speed/reduced repeated external requests" },
      { mark: "B1", text: "network monitoring recommended for unusual traffic spikes" },
      { mark: "B1", text: "monitoring mechanism linked to thresholds/alerts/logs/investigation" },
    ],
    strict: [
      "Do not award caching marks for backup or file storage unrelated to repeated requests.",
      "Do not award monitoring mark for validation of user input.",
      "Allow firewall as additional control, but proxy and monitoring are required by the scenario.",
      "Award each scenario requirement independently.",
    ],
  },
];

function normalise(value) {
  return value.trim().toLowerCase().replace(/[-_\s/]+/g, " ");
}

function setupPrint() {
  document.querySelector("#printBtn").addEventListener("click", () => window.print());
}

function setupHook() {
  const feedback = document.querySelector("#hookFeedback");
  const responses = {
    firewall: "Correct. The rule filters traffic by source and port.",
    proxy: "No. A proxy is an intermediary for requests; the clue is port/source filtering.",
    hashing: "No. Hashing creates a digest for comparison; it does not block network ports.",
    validation: "No. Validation checks input data; this is a network traffic rule.",
  };
  document.querySelectorAll("[data-hook]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-hook]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      feedback.textContent = responses[button.dataset.hook];
    });
  });
}

function setupSimulator() {
  const select = document.querySelector("#scenarioInput");
  const result = document.querySelector("#simulateResult");
  const method = document.querySelector("#simulateMethod");
  const trap = document.querySelector("#simulateTrap");
  function simulate() {
    const item = scenarioMap[select.value];
    result.textContent = item.result;
    method.innerHTML = `<strong>Reasoning:</strong> ${item.method}`;
    trap.innerHTML = `<strong>Common trap:</strong> ${item.trap}`;
  }
  select.addEventListener("change", simulate);
  document.querySelector("#simulateBtn").addEventListener("click", simulate);
  simulate();
}

function setupEventTool() {
  const select = document.querySelector("#eventInput");
  const result = document.querySelector("#eventResult");
  const reason = document.querySelector("#eventReason");
  function classify() {
    const item = eventMap[select.value];
    result.textContent = item.result;
    reason.innerHTML = `<strong>Reasoning:</strong> ${item.reason}`;
  }
  select.addEventListener("change", classify);
  document.querySelector("#eventBtn").addEventListener("click", classify);
  classify();
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
  renderExample("firewall");
}

function renderPractice() {
  const list = document.querySelector("#practiceList");
  list.innerHTML = practice.map((item) => `
    <article class="practice-item">
      <p><strong>${item.id.toUpperCase()}.</strong> ${item.prompt}</p>
      <div class="practice-row">
        <input type="text" aria-label="Answer for ${item.id}" data-practice="${item.id}" />
        <span class="mark" id="${item.id}Mark">Not checked</span>
      </div>
      <button class="answer-toggle" type="button" data-answer="${item.id}">Show answer</button>
      <div class="answer-panel" id="${item.id}Answer"><strong>Answer:</strong> ${item.answer}</div>
    </article>
  `).join("");

  document.querySelectorAll("[data-practice]").forEach((input) => {
    input.addEventListener("input", () => {
      const item = practice.find((entry) => entry.id === input.dataset.practice);
      const mark = document.querySelector(`#${item.id}Mark`);
      const value = normalise(input.value);
      const correct = item.accepted.some((answer) => value === normalise(answer));
      if (!value) {
        mark.textContent = "Not checked";
        mark.className = "mark";
        return;
      }
      mark.textContent = correct ? "Correct" : "Try again";
      mark.className = correct ? "mark correct" : "mark incorrect";
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
  document.querySelector("#mistakeGrid").innerHTML = mistakes.map((item, index) => `
    <article>
      <p class="wrong"><strong>Wrong:</strong> ${item.wrong}</p>
      <button class="answer-toggle" type="button" data-fix="${index}">Show correction</button>
      <div class="answer-panel" id="fix${index}"><strong>Correction:</strong> ${item.fix}</div>
    </article>
  `).join("");
  document.querySelectorAll("[data-fix]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#fix${button.dataset.fix}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide correction" : "Show correction";
    });
  });
}

function renderExam() {
  document.querySelector("#examList").innerHTML = examQuestions.map((item, index) => `
    <article class="exam-card">
      <div class="exam-head">
        <h3>${item.title}</h3>
        <span>${item.marks}</span>
      </div>
      <p>${item.prompt}</p>
      <button class="ms-toggle" type="button" data-ms="${index}">Show MS</button>
      <div class="ms-panel" id="ms${index}">
        <h4>CIE-style mark scheme</h4>
        <p><strong>Model answer:</strong> ${item.answer}</p>
        <ul>${item.marking.map((mark) => `<li><strong>${mark.mark}</strong> ${mark.text}</li>`).join("")}</ul>
        <h4>Strict notes</h4>
        <ul>${item.strict.map((note) => `<li>${note}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
  document.querySelectorAll("[data-ms]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.querySelector(`#ms${button.dataset.ms}`);
      panel.classList.toggle("visible");
      button.textContent = panel.classList.contains("visible") ? "Hide MS" : "Show MS";
    });
  });
}

setupPrint();
setupHook();
setupSimulator();
setupEventTool();
setupExamples();
renderPractice();
renderMistakes();
renderExam();
