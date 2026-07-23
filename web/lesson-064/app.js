const scenarioMap = {
  access: {
    result: "Most likely: hacking.",
    method: "The attacker has gained unauthorised access to an account or system and can alter records.",
    trap: "Do not call every unauthorised login phishing. Phishing may be how credentials were obtained, but the access itself is hacking.",
  },
  email: {
    result: "Most likely: phishing.",
    method: "A deceptive message appears trustworthy and persuades the user to enter account details.",
    trap: "Do not define phishing as only 'a virus'. The key point is tricking the user into revealing information or using a fake link/page.",
  },
  redirect: {
    result: "Most likely: pharming.",
    method: "The user is redirected to a fraudulent website even though the intended URL may be correct.",
    trap: "Do not describe this as only phishing unless the clue is a deceptive message or link.",
  },
  flood: {
    result: "Most likely: denial-of-service attack.",
    method: "The service is overwhelmed by requests/traffic so legitimate users cannot access it.",
    trap: "Do not focus on stolen data unless the scenario says data was accessed. The main security goal is availability.",
  },
  botnet: {
    result: "Most likely: distributed denial-of-service attack.",
    method: "Many devices or sources generate traffic against one target, making the service unavailable.",
    trap: "Do not require the attacker to log into the target system for DDoS; overwhelming traffic is enough.",
  },
};

const examples = {
  hacking: {
    title: "Example 1: Hacking a student records system",
    problem: "A former employee uses an old account to access and change student records.",
    steps: [
      "This is hacking because the account is used for unauthorised access.",
      "The impact includes loss of integrity because records are changed without permission.",
      "Confidentiality may also be affected if records are viewed or copied.",
      "Suitable controls include disabling old accounts, access rights, audit logs and strong authentication.",
    ],
  },
  phishing: {
    title: "Example 2: Phishing message from 'IT support'",
    problem: "A message asks staff to click a link and confirm their password before the end of the day.",
    steps: [
      "This is phishing because a deceptive message tries to obtain confidential information.",
      "Urgency is used to pressure the user into entering credentials.",
      "If credentials are stolen, the attacker may later gain unauthorised access.",
      "Controls include user training, checking sender/URL, reporting suspicious messages, email filtering and MFA.",
    ],
  },
  pharming: {
    title: "Example 3: Pharming through fake redirection",
    problem: "A user types the correct shop address but is taken to a fake login page.",
    steps: [
      "This is pharming because traffic is redirected to a fraudulent website.",
      "The user may trust the page because the typed address was correct.",
      "The impact can be stolen usernames, passwords or payment details.",
      "Controls include secure DNS, certificate/HTTPS checks, browser updates and anti-malware.",
    ],
  },
  dos: {
    title: "Example 4: Denial-of-service against an online booking system",
    problem: "A ticket website receives many automated requests and real customers cannot load the page.",
    steps: [
      "This is a denial-of-service attack because the service is overwhelmed.",
      "The main security goal affected is availability.",
      "A distributed attack uses many devices or sources, making blocking harder.",
      "Controls include rate limiting, traffic filtering, firewalls, load balancing and DDoS mitigation.",
    ],
  },
};

const practice = [
  { id: "p1", prompt: "Which attack means gaining unauthorised access to a computer system or data?", accepted: ["hacking", "hack"], answer: "Hacking" },
  { id: "p2", prompt: "Which attack uses deceptive messages or fake pages to trick a user into revealing information?", accepted: ["phishing"], answer: "Phishing" },
  { id: "p3", prompt: "Which attack redirects a user to a fake website, even if the intended address seems correct?", accepted: ["pharming"], answer: "Pharming" },
  { id: "p4", prompt: "Which attack overwhelms a service so legitimate users cannot access it?", accepted: ["dos", "denial of service", "denial-of-service", "denial of service attack", "denial of service attacks"], answer: "Denial-of-service / DoS" },
  { id: "p5", prompt: "What does the first D in DDoS stand for?", accepted: ["distributed"], answer: "Distributed" },
  { id: "p6", prompt: "Which security goal is mainly affected by a DoS attack?", accepted: ["availability"], answer: "Availability" },
  { id: "p7", prompt: "A fake bank email asks for a password. Is this phishing or pharming?", accepted: ["phishing"], answer: "Phishing" },
  { id: "p8", prompt: "A user types the correct URL but reaches a fake site. Is this phishing or pharming?", accepted: ["pharming"], answer: "Pharming" },
  { id: "p9", prompt: "Name one control that helps reduce phishing risk.", accepted: ["training", "user training", "checking url", "check url", "checking sender", "email filtering", "mfa", "multi factor", "reporting"], answer: "User training, checking sender/URL, email filtering, reporting procedures or MFA" },
  { id: "p10", prompt: "Name one control that helps reduce DoS impact.", accepted: ["rate limiting", "traffic filtering", "firewall", "firewalls", "load balancing", "ddos mitigation", "monitoring"], answer: "Rate limiting, traffic filtering, firewalls, load balancing, monitoring or DDoS mitigation" },
];

const mistakes = [
  {
    wrong: "Pharming is when a fake email asks a user to click a link.",
    fix: "That is phishing. Pharming redirects users to a fake website, possibly even when they type the correct URL.",
  },
  {
    wrong: "A DoS attack steals usernames and passwords.",
    fix: "A DoS attack mainly affects availability by overwhelming a service so legitimate users cannot access it. Stolen credentials are not the defining feature.",
  },
  {
    wrong: "Hacking means any attack on a computer.",
    fix: "Hacking means unauthorised access to a system, account or data. Other attacks have different mechanisms.",
  },
  {
    wrong: "MFA completely prevents phishing.",
    fix: "MFA reduces the damage from stolen passwords and makes account takeover harder, but user training and verification are still needed.",
  },
];

const examQuestions = [
  {
    title: "Question 1",
    marks: "5 marks",
    prompt: "Describe phishing and explain how it can lead to unauthorised access.",
    answer: "Phishing uses deceptive emails, messages or websites that appear to be from a trusted source. The attacker tricks the user into entering confidential information such as a password or payment details. If the password is stolen, the attacker can use it to log in as the user. This leads to unauthorised access and may allow data to be viewed, changed or copied.",
    marking: [
      { mark: "B1", text: "phishing described as deceptive message/email/site appearing trustworthy" },
      { mark: "B1", text: "user tricked into revealing confidential information/credentials" },
      { mark: "B1", text: "stolen credentials/password used by attacker" },
      { mark: "B1", text: "attacker gains unauthorised access or impersonates user" },
      { mark: "B1", text: "valid consequence such as data viewed/changed/copied or financial loss" },
    ],
    strict: [
      "Do not accept 'a virus' as a definition of phishing.",
      "Do not award both mechanism marks for only saying 'fake website' unless deception and user information are clear.",
      "Allow fake text message or fake login page.",
    ],
  },
  {
    title: "Question 2",
    marks: "4 marks",
    prompt: "Explain the difference between phishing and pharming.",
    answer: "Phishing tricks a user using a deceptive message, link or website so the user reveals confidential information. Pharming redirects a user to a fake website, possibly after the user enters the correct URL. Both may result in credentials being entered into a fraudulent site, but phishing relies on persuading the user while pharming relies on redirection.",
    marking: [
      { mark: "B1", text: "phishing involves deceptive message/link/site or trusted-looking communication" },
      { mark: "B1", text: "phishing user reveals confidential information/credentials" },
      { mark: "B1", text: "pharming redirects user/traffic to a fake website" },
      { mark: "B1", text: "clear contrast: persuasion by message vs redirection, or correct URL clue" },
    ],
    strict: [
      "Do not accept definitions that make phishing and pharming identical.",
      "Do not award pharming mark for only 'fake email'.",
      "Allow DNS/name-resolution redirection as pharming mechanism.",
    ],
  },
  {
    title: "Question 3",
    marks: "5 marks",
    prompt: "A school website becomes unavailable after receiving a very large number of automated requests. Identify the attack and explain two controls.",
    answer: "The attack is a denial-of-service attack because the website is flooded with requests and legitimate users cannot access it. The main security goal affected is availability. Rate limiting or traffic filtering can block or slow excessive requests. Load balancing or DDoS mitigation can distribute/filter traffic so the website remains available to legitimate users.",
    marking: [
      { mark: "B1", text: "attack identified as DoS/denial-of-service" },
      { mark: "B1", text: "flooding/large number of requests overwhelms service" },
      { mark: "B1", text: "availability impact explained" },
      { mark: "B1", text: "first valid control with mechanism, e.g. rate limiting/traffic filtering/firewall" },
      { mark: "B1", text: "second distinct valid control with mechanism, e.g. load balancing/DDoS mitigation/monitoring" },
    ],
    strict: [
      "Do not accept hacking as the attack unless unauthorised access is described.",
      "Do not accept backup as a main DoS prevention control without service-availability explanation.",
      "Allow DDoS if many sources/devices are implied.",
    ],
  },
  {
    title: "Question 4",
    marks: "4 marks",
    prompt: "Define hacking and describe two possible impacts on a company's data.",
    answer: "Hacking is gaining unauthorised access to a computer system, account, network or data. One impact is loss of confidentiality because sensitive data may be viewed or copied. Another impact is loss of integrity because data may be changed or deleted without permission. It may also lead to further unauthorised actions if accounts or permissions are misused.",
    marking: [
      { mark: "B1", text: "hacking defined as unauthorised access" },
      { mark: "B1", text: "target is system/account/network/data" },
      { mark: "B1", text: "confidentiality impact: data viewed/copied/disclosed" },
      { mark: "B1", text: "integrity impact: data changed/deleted/corrupted" },
    ],
    strict: [
      "Do not accept only 'breaking a computer' without unauthorised access.",
      "Do not award both impact marks for two vague phrases such as 'bad security' and 'data problem'.",
      "Allow availability impact if system is disrupted, but data impact must be explicit for full credit.",
    ],
  },
  {
    title: "Question 5",
    marks: "6 marks",
    prompt: "For each scenario, identify the attack and justify it: a fake invoice email asks for login details; a correct URL opens a fake page; many devices flood a server.",
    answer: "The fake invoice email is phishing because it uses a deceptive message to persuade the user to reveal login details. The correct URL opening a fake page is pharming because the user is redirected to a fraudulent site. Many devices flooding a server is a distributed denial-of-service attack because traffic from multiple sources overwhelms the server and prevents legitimate access.",
    marking: [
      { mark: "B1", text: "fake invoice email classified as phishing" },
      { mark: "B1", text: "justification linked to deceptive message and revealing login details" },
      { mark: "B1", text: "correct URL/fake page classified as pharming" },
      { mark: "B1", text: "justification linked to redirection to fraudulent site" },
      { mark: "B1", text: "many devices flooding server classified as DDoS/DoS" },
      { mark: "B1", text: "justification linked to multiple sources overwhelming service/preventing legitimate access" },
    ],
    strict: [
      "Do not award justification marks for repeating only the attack name.",
      "Do not classify correct URL redirection as phishing unless deceptive message evidence is added.",
      "Allow DoS for final scenario; award DDoS if distributed/many devices is stated.",
      "Award each classification independently.",
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
    pharming: "Correct. Pharming redirects the user to a fake website; the correct URL clue is important.",
    phishing: "Not quite. A fake site can be used in phishing, but this clue says the correct URL was redirected.",
    dos: "No. DoS makes a service unavailable; here the service loads, but it is fraudulent.",
    hacking: "No. Hacking is unauthorised access. The given clue is redirection to a fake website.",
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
  renderExample("hacking");
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
setupExamples();
renderPractice();
renderMistakes();
renderExam();
